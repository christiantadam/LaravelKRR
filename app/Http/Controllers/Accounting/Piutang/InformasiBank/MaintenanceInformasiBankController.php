<?php

namespace App\Http\Controllers\Accounting\Piutang\InformasiBank;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Log;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class MaintenanceInformasiBankController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Piutang.InformasiBank.MaintenanceInformasiBank', compact('access'));
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
        if ($id == 'displayData') {
            // Call the stored procedure SP_1486_ACC_LIST_REFERENSI_BANK
            $sTanggal = $request->input('tanggal');
            $results = DB::connection('ConnAccounting')
                ->select('exec SP_1486_ACC_LIST_REFERENSI_BANK @Kode = 1, @Tanggal = ?', [$sTanggal]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'IdReferensi' => $row->IdReferensi,
                    'Nama_Bank' => $row->Nama_Bank,
                    'Nama_MataUang' => $row->Nama_MataUang,
                    'Nilai' => number_format($row->Nilai, 2),
                    'Keterangan' => $row->Keterangan,
                    'NamaCust' => $row->NamaCust ?? '', // Handle null values
                    'Id_Bank' => $row->Id_Bank,
                    'Id_MataUang' => $row->Id_MataUang,
                    'TypeTransaksi' => $row->TypeTransaksi,
                    'Id_Jenis_Bayar' => $row->Id_Jenis_Bayar,
                    'Jenis_Pembayaran' => $row->Jenis_Pembayaran,
                    'No_Bukti' => $row->No_Bukti ?? '' // Handle null values
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getBank') {
            // Call the stored procedure SP_1486_ACC_LIST_TBANK
            $results = DB::connection('ConnAccounting')
                ->select('exec SP_1486_ACC_LIST_TBANK @Kode = 4');

            // Prepare response for the front-end
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Nama_Bank' => $row->Nama_Bank,
                    'Id_Bank' => $row->Id_Bank,
                ];
            }

            // Return the response as JSON
            return datatables($response)->make(true);
        }
    }

    // Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request, $id)
    {
        //
    }

    //Remove the specified resource from storage.
    public function destroy($idReferensi)
    {
        //
    }
}
