<?php

namespace App\Http\Controllers\Accounting\Hutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class MaintenanceBKKController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Hutang.MaintenanceBKK', compact('access'));
        // $data = 'Accounting';
        // return view('Accounting.Hutang.MaintenanceBKK', compact('data'));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        //
    }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        if ($id == 'getPengajuan') {
            $result = DB::connection('ConnAccounting')->select('exec SP_BKK2_TAMPIL_NOBKK');
            // dd($result);
            if ($result) {
                $response = [];
                foreach ($result as $row) {
                    $item = [
                        'Id_Pembayaran' => trim($row->Id_Pembayaran),
                        'Id_Penagihan' => trim($row->Id_Penagihan),
                        'Id_Bank' => trim($row->Id_Bank),
                        'NM_SUP' => trim($row->NM_SUP),
                        'Rincian_Bayar' => !is_null($row->Rincian_Bayar) ? $row->Rincian_Bayar : '',
                        'Nilai_Pembayaran' => number_format($row->Nilai_Pembayaran, 2, '.', ','),
                        'Id_Jenis_Bayar' => trim($row->Id_Jenis_Bayar),
                        'Jenis_Pembayaran' => trim($row->Jenis_Pembayaran),
                        'Id_MataUang' => trim($row->Id_MataUang),
                        'Nama_MataUang' => trim($row->Nama_MataUang),
                        'Jml_JenisBayar' => $row->Jml_JenisBayar,
                        'Id_Supplier' => $row->Id_Supplier,
                        'Jenis_Bank' => $row->Jenis_Bank,
                        'IdMataUang_PO' => !is_null($row->IdMataUang_PO) ? $row->IdMataUang_PO : ''
                    ];
                    $response[] = $item;
                }
                return datatables($response)->make(true);
            } else {
                return response()->json(['message' => 'No records found']);
            }
        } else if ($id == 'getPembayaran') {
            $idPembayaran = $request->input('IdPembayaran');

            $result = DB::connection('ConnAccounting')->select('exec SP_1273_ACC_CHECK_BKK2_DETAILBAYAR ?', [$idPembayaran]);

            if ($result && $result[0]->ada == 0) {
                return response()->json(['message' => 'No records found']);
            } else {
                $details = DB::connection('ConnAccounting')->select('exec SP_1273_ACC_LIST_BKK2_DETAILBAYAR ?', [$idPembayaran]);

                $response = [];
                foreach ($details as $detail) {
                    $item = [
                        'Id_Detail_Bayar' => trim($detail->Id_Detail_Bayar),
                        'Rincian_Bayar' => trim($detail->Rincian_Bayar),
                        'Nilai_Rincian' => number_format($detail->Nilai_Rincian, 2, '.', ','),
                        'Kode_Perkiraan' => trim($detail->Kode_Perkiraan),
                        'Id_Pembayaran' => trim($detail->Id_Pembayaran),
                        'Id_Detail_BGCek' => !is_null($detail->Id_Detail_BGCek) ? trim($detail->Id_Detail_BGCek) : '',
                        'Keterangan' => !is_null($detail->Keterangan) ? trim($detail->Keterangan) : ''
                    ];

                    if ($item['Id_Detail_BGCek'] != '') {
                        $bgcek = DB::connection('ConnAccounting')->select('exec SP_1273_ACC_LIST_BKK2_IDBGCEK ?', [$item['Id_Detail_BGCek']]);
                        $item['No_BGCek'] = $bgcek ? $bgcek[0]->No_BGCek : '';
                    } else {
                        $item['No_BGCek'] = '';
                    }

                    $response[] = $item;
                }

                return datatables($response)->make(true);
            }
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
