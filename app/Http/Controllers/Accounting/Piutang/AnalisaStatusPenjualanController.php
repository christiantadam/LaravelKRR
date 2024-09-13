<?php

namespace App\Http\Controllers\Accounting\Piutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class AnalisaStatusPenjualanController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Piutang.AnalisaStatusPenjualan', compact('access'));
    }

    // public function getDisplaySuratJalan($tanggal, $tanggal2)
    // {
    //     // dd("masuk");
    //     $tabel =  DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_STATUS_PENAGIHAN_PENJUALAN] @Kode = ?, @Tgl1 = ?, @Tgl2 = ?', [1, $tanggal, $tanggal2]);
    //     return response()->json($tabel);
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
        if ($id == 'displayData') {
            // Get the dates from the request, default to current date if not provided
            $sTanggal1 = $request->input('tanggal', now());
            $sTanggal2 = $request->input('tanggal2', now());

            // Execute the stored procedure
            $results = DB::connection('ConnAccounting')
                ->select('exec SP_1486_ACC_LIST_STATUS_PENAGIHAN_PENJUALAN @Kode = ?, @Tgl1 = ?, @Tgl2 = ?', [1, $sTanggal1, $sTanggal2]);

            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Tgl_Pelunasan' => \Carbon\Carbon::parse($row->Tgl_Pelunasan)->format('m/d/Y'),
                    'NamaCust' => $row->NamaCust,
                    'Id_Penagihan' => $row->Id_Penagihan,
                    'Jenis_Pembayaran' => $row->Jenis_Pembayaran,
                    'NilaiPelunasan' => number_format($row->NilaiPelunasan, 2, '.', ','), // Format as "#,##0.00"
                    'Nilai_Penagihan' => number_format($row->Nilai_Penagihan, 2, '.', ','), // Format as "#,##0.00"
                    'Terbayar' => number_format($row->Terbayar, 2, '.', ','), // Format as "#,##0.00"
                    'Lunas' => $row->Lunas,
                    'Id_BKM' => $row->Id_BKM,
                    // Add other fields if necessary
                    // 'Status_tagihan' => $row->Status_tagihan ?? '', // Uncomment and add if needed
                    // 'Id_Cust' => $row->Id_Cust ?? '', // Uncomment and add if needed
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

    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
