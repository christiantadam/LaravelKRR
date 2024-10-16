<?php

namespace App\Http\Controllers\Accounting\Piutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Log;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class PenagihanPenjualanExportController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Piutang.PenagihanPenjualanExport', compact('access'));
    }

    // public function getCustomerEx()
    // {
    //     $data =  DB::connection('ConnSales')->select('exec [SP_1486_ACC_LIST_CUSTOMER_EXPORT]
    //     @Kode = ?', [1]);
    //     return response()->json($data);
    // }

    // public function getSuratJalanEx($idCustomer)
    // {
    //     $data =  DB::connection('ConnSales')->select('exec [SP_1486_SLS_LIST_PENGIRIMAN_EXPORT]
    //     @Kode = ?, @IdCust = ?', [1, $idCustomer]);
    //     return response()->json($data);
    // }

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
        if ($id == 'getPenagihan') {
            $results = DB::connection('ConnAccounting')
                ->select('exec SP_1486_ACC_LIST_PENAGIHAN_SJ ?', [1]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Tgl_Penagihan' => \Carbon\Carbon::parse($row->Tgl_Penagihan)->format('m/d/Y'),
                    'Id_Penagihan' => $row->Id_Penagihan,
                    'NamaCust' => $row->NamaCust,
                    'PO' => $row->PO ?? '',
                    'Nilai_Penagihan' => number_format($row->Nilai_Penagihan, 2, '.', ','),
                    'Nama_MataUang' => $row->Nama_MataUang,
                    'Id_Customer' => $row->Id_Customer,
                    'Id_MataUang' => $row->Id_MataUang,
                    'NilaiKurs' => $row->NilaiKurs,
                    'NamaNPWP' => $row->NamaNPWP ?? '',
                    'JnsCust' => $row->JnsCust ?? '',
                    'IdFakturPajak' => $row->IdFakturPajak ?? '',
                    'Nama_Jns_PPN' => $row->Nama_Jns_PPN ?? '',
                ];
            }
            return datatables($response)->make(true);

        } else if ($id == 'getCustomer') {
            try {
                $results = DB::connection('ConnSales')
                    ->select('exec SP_1486_ACC_LIST_CUSTOMER_EXPORT ?', ['1']);
                // dd($results);
                $response = [];
                foreach ($results as $row) {
                    // Simulating logic in VB: extracting last 5 characters for TIdCustomer and first 3 for TIdJnsCust
                    $kode = trim($row->Kode);
                    $TIdCustomer = substr($kode, -5); // Last 5 characters
                    $TIdJnsCust = substr($kode, 0, 3); // First 3 characters

                    $response[] = [
                        'NamaCust' => trim($row->NamaCust),
                        'Kode' => $kode,
                        'TIdCustomer' => $TIdCustomer,
                        'TIdJnsCust' => $TIdJnsCust,
                    ];
                }

                return datatables($response)->make(true);
            } catch (Exception $e) {
                return response()->json(['error' => $e->getMessage()], 500);
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

    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
