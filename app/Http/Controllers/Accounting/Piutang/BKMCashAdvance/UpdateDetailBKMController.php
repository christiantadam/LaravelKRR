<?php

namespace App\Http\Controllers\Accounting\Piutang\BKMCashAdvance;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class UpdateDetailBKMController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Piutang.BKMCashAdvance.UpdateDetailBKM', compact('access'));
    }

    // public function getTabelPelunasan($bulan, $tahun)
    // {
    //     //dd($bulan, $tahun);
    //     $tabel = DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_PELUNASAN_TAGIHAN_1] @kode = ?, @bln = ?, @thn = ?', [1, $bulan, $tahun]);
    //     return response()->json($tabel);
    // }

    // public function cekTabelPelunasan($idPelunasan)
    // {
    //     //dd($idPelunasan);
    //     $tabel = DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_PELUNASAN_TAGIHAN_1] @kode = ?, @idP = ?', [2, $idPelunasan]);
    //     return response()->json($tabel);
    // }

    // public function getTabelDetailPelunasan($idPelunasan)
    // {
    //     //dd($bulan, $tahun);
    //     $tabel = DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_DETAIL_PELUNASAN] @idPelunasan = ?', [$idPelunasan]);
    //     return response()->json($tabel);
    // }

    // public function getTabelKurangLebih($idPelunasan)
    // {
    //     $tabel = DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_DETAIL_KRGLBH] @idPelunasan = ?', [$idPelunasan]);
    //     return response()->json($tabel);
    // }

    // public function getTabelBiaya($idPelunasan)
    // {
    //     $tabel = DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_DETAIL_BIAYA] @idPelunasan = ?', [$idPelunasan]);
    //     return response()->json($tabel);
    // }

    // public function getTabelTampilBKM($tanggalInputTampil, $tanggalInputTampil2)
    // {
    //     $tabel = DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_BKM_CASHADV_PERTGL] @tgl1 = ?, @tgl2 = ?', [$tanggalInputTampil, $tanggalInputTampil2]);
    //     return response()->json($tabel);
    // }

    // public function getCetakUpdateDetailBKM($idBKMInput)
    // {
    //     //dd($idBKM);
    //     $data = DB::connection('ConnAccounting')->table('VW_PRG_5298_ACC_CETAK_BKM_CASHADV')
    //         ->where('Id_BKM', $idBKMInput)
    //         ->get();
    //     return $data;
    // }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {

    }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        if ($id == 'getPelunasan') {

            // Execute the first stored procedure
            $firstResults = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_LIST_PELUNASAN_TAGIHAN_1 @kode = 1, @bln = ?, @thn = ?', [
                    $request->input('bulan'),
                    $request->input('tahun')
                ]);

            // dd($firstResults);
            $response = [];
            $j = 0;

            foreach ($firstResults as $row) {
                // Execute the second stored procedure for each row in firstResults
                $secondResults = DB::connection('ConnAccounting')
                    ->select('exec SP_5298_ACC_LIST_PELUNASAN_TAGIHAN_1 @kode = 2, @idP = ?', [$row->Id_Pelunasan]);
                // dd($secondResults);
                if ($secondResults && $secondResults[0]->ada > 0) {
                    $j++;
                    $response[] = [
                        'Tgl_Input' => \Carbon\Carbon::parse($row->Tgl_Input)->format('m/d/Y'),
                        'Id_BKM' => $row->Id_BKM,
                        'Tgl_Pelunasan' => \Carbon\Carbon::parse($row->Tgl_Pelunasan)->format('m/d/Y'),
                        'Id_Pelunasan' => $row->Id_Pelunasan,
                        'Id_bank' => $row->Id_bank ?? '',
                        'Jenis_Pembayaran' => $row->Jenis_Pembayaran,
                        'Nama_MataUang' => $row->Nama_MataUang,
                        'Nilai_Pelunasan' => number_format($row->Nilai_Pelunasan, 2, '.', ','),
                        'No_Bukti' => $row->No_Bukti ?? ''
                    ];
                }
            }

            if ($j == 0) {
                return response()->json(['message' => 'Tidak Ada Cash Advance'], 200);
            }

            return datatables($response)->make(true);
        } else if ($id == 'getDetailPelunasan') {
            // Clear any existing lists equivalent logic
            $idPelunasan = $request->input('idPelunasan');

            // First stored procedure: SP_5298_ACC_DETAIL_PELUNASAN
            $pelunasanResults = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_DETAIL_PELUNASAN @idPelunasan = ?', [$idPelunasan]);
            // dd($pelunasanResults);
            $responsePelunasan = [];
            $j = 0;
            foreach ($pelunasanResults as $row) {
                $j++;
                $responsePelunasan[] = [
                    'ID_Penagihan' => $row->ID_Penagihan,
                    'Nilai_Pelunasan' => number_format($row->Nilai_Pelunasan, 2, '.', ','),
                    'Pelunasan_Rupiah' => number_format($row->Pelunasan_Rupiah, 2, '.', ','),
                    'Kode_Perkiraan' => $row->Kode_Perkiraan ?? '0.00.00',
                    'NamaCust' => $row->NamaCust,
                    'ID_Detail_Pelunasan' => $row->ID_Detail_Pelunasan
                ];
            }
            return datatables($responsePelunasan)->make(true);
        } else if ($id == 'getDetailBiaya') {
            $idPelunasan = $request->input('idPelunasan');

            // Second stored procedure: SP_5298_ACC_DETAIL_BIAYA
            $biayaResults = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_DETAIL_BIAYA @idPelunasan = ?', [$idPelunasan]);
            // dd($biayaResults);
            $responseBiaya = [];
            $k = 0;
            foreach ($biayaResults as $row) {
                if ($row->biaya != 0) {
                    $k++;
                    $responseBiaya[] = [
                        'Keterangan' => $row->Keterangan ?? '',
                        'Biaya' => number_format($row->Biaya, 2, '.', ','),
                        'Kode_Perkiraan' => $row->Kode_Perkiraan ?? '0.00.00',
                        'Id_Detail_Pelunasan' => $row->Id_Detail_Pelunasan
                    ];
                }
            }

            return datatables($responseBiaya)->make(true);
        } else if ($id == 'getDetailKurang') {
            $idPelunasan = $request->input('idPelunasan');
            // Third stored procedure: SP_5298_ACC_DETAIL_KRGLBH
            $krgLbhResults = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_DETAIL_KRGLBH @idPelunasan = ?', [$idPelunasan]);
            // dd($krgLbhResults);
            $responseKrgLbh = [];
            $l = 0;
            foreach ($krgLbhResults as $row) {
                if ($row->KurangLebih != 0) {
                    $l++;
                    $responseKrgLbh[] = [
                        'Keterangan' => $row->Keterangan ?? '',
                        'KurangLebih' => number_format($row->KurangLebih, 2, '.', ','),
                        'Kode_Perkiraan' => $row->Kode_Perkiraan ?? '0.00.00',
                        'Id_Detail_Pelunasan' => $row->Id_Detail_Pelunasan
                    ];
                }
            }

            return datatables($responseKrgLbh)->make(true);
        }
    }
    // Show the form for editing the specified resource.
    public function edit($id)
    {

    }

    //Update the specified resource in storage.
    public function update(Request $request)
    {

    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
