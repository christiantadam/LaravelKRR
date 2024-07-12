<?php

namespace App\Http\Controllers\Accounting\Hutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MaintenancePenagihanController extends Controller
{
    public function index()
    {
        $maintenancePenagihan = DB::connection('ConnAccounting')->select('exec [SP_1273_ACC_LIST_SUPPLIER]');
        // dd($maintenanceMataUang);
        return view('Accounting.Hutang.MaintenancePenagihan', compact(['maintenancePenagihan']));
    }

    // function getDataSupplier($namaSupplier)
    // {
    //     $data = DB::connection('ConnAccounting')
    //            ->select("SELECT * FROM PURCHASE.dbo.YSUPPLIER WHERE NM_SUP = ?", [$namaSupplier]);

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
