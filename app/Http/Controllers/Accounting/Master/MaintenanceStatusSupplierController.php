<?php

namespace App\Http\Controllers\Accounting\Master;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MaintenanceStatusSupplierController extends Controller
{
    //
    //Display a listing of the resource.
    public function index()
    {
        $data = 'Accounting';
        return view('Accounting.Master.MaintenanceStatusSupplier', compact('data'));
    }

    public function getTabel()
    {
        // dd("masuk");
        $tabel =  DB::connection('ConnAccounting')->select('exec [Sp_1273_ACC_LIST_SUPP_NOSTATUS]');
        return response()->json($tabel);
    }

    public function getDataMataUang($idSupplier)
    {
        $detailstatussupplier =  DB::connection('ConnAccounting')->select('exec [Sp_1273_ACC_LIST_IDSUPP_NOSTATUS] @IDSupplier = ?', [$idSupplier]);
        return response()->json($detailstatussupplier);
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
    public function show($cr)
    {
        //
    }

    // Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request)
    {
        // $idSupplier = $request->idSupplier;
        // $status = $request->status;
        // $data =  DB::connection('ConnAccounting')->select('exec [Sp_1273_ACC_UDT_STATUS_YSUPPLIER] @IDSupplier = ?, @Status = ?', [$idSupplier, $status]);
        // return response()->json($data);
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
