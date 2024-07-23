<?php

namespace App\Http\Controllers\Accounting\Hutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class UpdatePIBController extends Controller
{

    public function UpdatePIB()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Hutang.UpdatePIB', compact('access'));
        // $data = 'Accounting';
        // return view('Accounting.Hutang.UpdatePIB', compact('data'));
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
        if ($id == 'getListSupplier') {
            // Fetch the customer data
            $listCustomer = DB::connection('ConnAccounting')
                ->select('SP_1273_ACC_LIST_SUPPLIER');
            // Convert the data into an array that DataTables can consume
            // dd($listCustomer);
            $dataCustomer = [];
            foreach ($listCustomer as $Customer) {
                $dataCustomer[] = [
                    'Supplier' => $Customer->NM_SUP,
                    'No_Supplier' => $Customer->NO_SUP,
                ];
            }
            return datatables($dataCustomer)->make(true);
        } else if ($id == 'getPenagihan') {
            $idSupplier = $request->input('sp2');

            // Fetch the penagihan data
            $penagihanData = DB::connection('ConnAccounting')
                ->select('EXEC SP_1273_ACC_LIST_TT_IDTT ?', [$idSupplier]);
            // dd($penagihanData    );
            // Convert the data into an array that DataTables can consume
            $dataPenagihan = [];
            foreach ($penagihanData as $item) {
                $dataPenagihan[] = [
                    'Id_Penagihan' => $item->Id_Penagihan,
                    'Waktu_Penagihan' => \Carbon\Carbon::parse($item->Waktu_Penagihan)->format('Y-m-d'),
                ];
            }
            return datatables()->of($dataPenagihan)->make(true);
        } elseif ($id == 'getListPIB') {
            $TIdTT = trim($request->input('idpenagihan'));
            // dd($TIdTT);

            // Fetch the PIB data
            $results = DB::connection('ConnAccounting')
                ->select('exec Sp_1273_ACC_LIST_PIB ?', [$TIdTT]);
            // dd($results);
            // Initialize an empty array to hold the data
            $listPIB = [];

            // Check if the results are not empty
            if (!empty($results)) {
                foreach ($results as $row) {
                    $listPIB[] = [
                        'No_Pengajuan' => $row->No_Pengajuan,
                        'Nilai_PIB' => number_format($row->Nilai_PIB, 4, '.', ','),
                        'No_Pajak' => $row->No_Pajak,
                        'Id_PIB' => $row->Id_PIB,
                        'Tgl_PIB' => $row->Tgl_PIB ? $row->Tgl_PIB : '',
                        'No_Kontrak' => $row->No_Kontrak ? $row->No_Kontrak : '',
                        'Tgl_Kontrak' => $row->Tgl_Kontrak ? $row->Tgl_Kontrak : '',
                        'No_Invoice' => $row->No_Invoice ? $row->No_Invoice : '',
                        'Tgl_Invoice' => $row->Tgl_Invoice ? $row->Tgl_Invoice : '',
                        'No_SKBM' => $row->No_SKBM ? $row->No_SKBM : '',
                        'Tgl_SKBM' => $row->Tgl_SKBM ? $row->Tgl_SKBM : '',
                        'No_SKPPH' => $row->No_SKPPH ? $row->No_SKPPH : '',
                        'Tgl_SKPPH' => $row->Tgl_SKPPH ? $row->Tgl_SKPPH : '',
                        'No_SPPB_BC' => $row->No_SPPB_BC ? $row->No_SPPB_BC : '',
                        'Tgl_SPPB_BC' => $row->Tgl_SPPB_BC ? $row->Tgl_SPPB_BC : '',
                    ];
                }
            }
            return datatables()->of($listPIB)->make(true);
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
