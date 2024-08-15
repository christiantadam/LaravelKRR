<?php

namespace App\Http\Controllers\Accounting\Hutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class ACCSerahTerimaPenagihanController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Hutang.ACCSerahTerimaPenagihan', compact('access'));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        $data = $request->input('checkedRows', []);

        $adaProses = false;
        $jmlData = count($data);
        $ada = $jmlData > 0;

        if ($ada) {
            $adaProses = true;
        }

        if ($adaProses) {
            if ($request->input('batal') == 0) {
                foreach ($data as $item) {
                    if (!empty($item['Id_Penagihan'])) {
                        if (empty($item['Nilai_Penagihan'])) {
                            return response()->json([
                                'message' => "Tolong diproses cetak dulu !!.. Untuk TT No=" . trim($item['Id_Penagihan']) . ". Krn Nilai Penagihan masih kosong!",
                                'status' => 'error'
                            ], 400);
                        } else {
                            $result = DB::connection('ConnAccounting')
                                ->select('exec SP_1273_ACC_CHECK_TT_TERIMAGDG ?', [$item['Id_Penagihan']]);

                            if ($result[0]->ada > 0) {
                                $result = DB::connection('ConnAccounting')
                                    ->select('exec SP_1273_ACC_LIST_TT_MASUKGDG ?', [$item['Id_Penagihan']]);

                                $tmpTrans = $result[0]->NoTransaksiTmp ?? '0';
                                if ($tmpTrans == '0') {
                                    return response()->json([
                                        'message' => "NmBrg: " . trim($result[0]->NAMA_BRG) . " ''BELUM DITRANSFER PBL & DITERIMA GUDANG'', Kategori: " . trim($result[0]->Nama),
                                        'status' => 'error'
                                    ], 400);
                                } else {
                                    return response()->json([
                                        'message' => "NmBrg: " . trim($result[0]->NAMA_BRG) . " ''BELUM DITERIMA GUDANG'', Kategori: " . trim($result[0]->Nama) . ", IdTrans: " . trim($tmpTrans),
                                        'status' => 'error'
                                    ], 400);
                                }
                            } else {
                                DB::connection('ConnAccounting')
                                    ->statement('exec SP_1273_ACC_UDT_TT_SERAHTRM ?', [$item['Id_Penagihan']]);

                                DB::connection('ConnAccounting')
                                    ->statement('exec SP_1273_ACC_INS_TT_IDBAYAR ?, ?, ?, ?', [
                                        trim($item['Id_Penagihan']),
                                        trim($item['Id_MataUang']),
                                        trim(Auth::user()->NomorUser),
                                        $item['Nilai_Penagihan']
                                    ]);
                            }
                        }
                    }
                }
            } else {
                foreach ($data as $item) {
                    if (!empty($item['Id_Penagihan'])) {
                        DB::connection('ConnAccounting')
                            ->statement('exec SP_1273_ACC_TT_BATAL_SERAHTRM ?, ?', [
                                $item['Id_Pembayaran'],
                                $item['Id_Penagihan']
                            ]);
                    }
                }
            }
            return response()->json(['message' => 'Data sudah diPROSES !!..']);
        } else {
            return response()->json(['error' => 'Tidak Ada Data yang diPROSES !!..']);
        }
    }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        if ($id == 'getSerahTerima') {
            $data = DB::connection('ConnAccounting')
                ->select('exec SP_1273_ACC_LIST_TT_SERAHTRM');
            // dd($data);
            $response = [];
            foreach ($data as $row) {
                $statusPpn = $row->Status_PPN == 'N' ? 'Tidak Ada' : 'Ada Pajak';
                $response[] = [
                    'Waktu_Penagihan' => \Carbon\Carbon::parse($row->Waktu_Penagihan)->format('m/d/Y'),
                    'Id_Penagihan' => trim($row->Id_Penagihan),
                    'NM_SUP' => trim($row->NM_SUP),
                    'Nama_Dokumen' => trim($row->Nama_Dokumen),
                    'Status_PPN' => $statusPpn,
                    'Nama_MataUang' => trim($row->Nama_MataUang),
                    'Nilai_Penagihan' => number_format($row->Nilai_Penagihan, 4, '.', ','),
                    'Id_MataUang' => $row->Id_MataUang,
                ];
            }
            return datatables($response)->make(true);
        } else if ($id == 'getBatalSerahTerima') {
            // $listPengajuan = $request->input('checkedRows', []);
            // dd($listPengajuan);
            $data = DB::connection('ConnAccounting')
                ->select('exec SP_1273_ACC_TT_BATAL_SERAHTERIMA');
            // dd($data);
            $response = [];
            foreach ($data as $row) {
                $statusPpn = $row->Status_PPN == 'N' ? 'Tidak Ada' : 'Ada Pajak';
                $response[] = [
                    'Waktu_Penagihan' => \Carbon\Carbon::parse($row->Waktu_Penagihan)->format('m/d/Y'),
                    'Id_Penagihan' => trim($row->Id_Penagihan),
                    'NM_SUP' => trim($row->NM_SUP),
                    'Nama_Dokumen' => trim($row->Nama_Dokumen),
                    'Status_PPN' => $statusPpn,
                    'Nama_MataUang' => trim($row->Nama_MataUang),
                    'Nilai_Penagihan' => number_format($row->Nilai_Penagihan, 4, '.', ','),
                    'Id_MataUang' => $row->Id_MataUang,
                    'Id_Pembayaran' => $row->Id_Pembayaran,
                ];
            }
            return datatables($response)->make(true);
        }
    }

    // Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request)
    {
        //
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
