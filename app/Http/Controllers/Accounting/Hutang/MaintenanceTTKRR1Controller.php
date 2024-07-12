<?php

namespace App\Http\Controllers\Accounting\Hutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MaintenanceTTKRR1Controller extends Controller
{
    public function index()
    {
        $data = 'Accounting';
        return view('Accounting.Hutang.MaintenanceTTKRR1', compact('data'));
    }

    public function getSupplierTTKRR1()
    {
        $supplier =  DB::connection('ConnAccounting')->select('exec [SP_1273_ACC_LIST_SUPPLIER]');
        return response()->json($supplier);
    }

    public function getTabelListDetailBrg($idSupplier)
    {
        $supplier =  DB::connection('ConnAccounting')->select('exec [SP_1273_ACC_LIST_BKK1_DETAILBRG] @IdSupplier = ?', [$idSupplier]);
        return response()->json($supplier);
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
        //
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
