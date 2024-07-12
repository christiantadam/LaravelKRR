<?php

namespace App\Http\Controllers\Accounting\Hutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BatalPenagihanController extends Controller
{

    public function index()
    {
        $bulan = now()->format('m');
        $tahun = now()->format('y');
        // $date = '2023-04-03';
        $penagihan = db::connection('ConnAccounting')->select('exec [SP_1273_ACC_LIST_IDTT_BTLTT] @Bln = ?, @Thn = ?', [$bulan, $tahun]);
        // dd($nosp);
        return view('Accounting.Hutang.BatalPenagihan', compact(['penagihan']));
    }

    // function getDataPenagihan($bulan, $tahun)
    // {
    //     $penagihan =  DB::connection('ConnAccounting')->select('exec [SP_1273_ACC_LIST_IDTT_BTLTT] @Bln = ?, @Thn = ?', [$bulan, $tahun]);
    //     return response()->json($penagihan);
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
