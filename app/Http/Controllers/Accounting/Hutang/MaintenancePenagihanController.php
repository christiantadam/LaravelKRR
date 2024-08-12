<?php

namespace App\Http\Controllers\Accounting\Hutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class MaintenancePenagihanController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Hutang.MaintenancePenagihan', compact('access'));
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
        if ($id == 'getSupplier') {
            $supplierDetails = DB::connection('ConnAccounting')
                ->select('exec SP_1273_ACC_LIST_SUPPLIER');
            $response = [];
            foreach ($supplierDetails as $row) {
                $response[] = [
                    'NM_SUP' => trim($row->NM_SUP),
                    'NO_SUP' => trim($row->NO_SUP),
                ];
            }
            return datatables($response)->make(true);
        }else if ($id == 'getDisplay') {
            try {
                $no_sup = trim($request->input('supplier_2'));
                $query = DB::connection('ConnAccounting')
                    ->select('exec SP_5409_ACC_PENAGIHAN_PEMBELIAN ?, ?', [1, $no_sup]);

                $response = [];
                foreach ($query as $row) {
                    $response[] = [
                        'No_BTTB' => $row->No_BTTB,
                        'No_SuratJalan' => $row->No_SuratJalan ?? '',
                        'No_PO' => $row->No_PO,
                        'SubTotal' => $this->formatDecimal($row->SubTotal),
                        'JumPPN' => $row->JumPPN,
                        'PPN_Price' => $this->formatDecimal($row->PPN_Price),
                        'TotalPrice' => $this->formatDecimal($row->TotalPrice),
                        'IdMataUang' => $row->IdMataUang,
                        'Nama_MataUang' => $row->Nama_MataUang,
                        'Kurs_Rp' => $this->formatDecimal($row->Kurs_Rp),
                    ];
                }
                return datatables($response)->make(true);
            } catch (Exception $e) {
                return response()->json(['error' => $e->getMessage()]);
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
