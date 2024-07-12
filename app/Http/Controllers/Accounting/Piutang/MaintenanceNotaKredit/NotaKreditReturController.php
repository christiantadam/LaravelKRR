<?php

namespace App\Http\Controllers\Accounting\Piutang\MaintenanceNotaKredit;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NotaKreditReturController extends Controller
{
    public function index()
    {
        $data = 'Accounting';
        return view('Accounting.Piutang.MaintenanceNotaKredit.NotaKreditRetur', compact('data'));
    }

    public function getCustNotaKredit()
    {
        $tabel =  DB::connection('ConnSales')->select('exec [sp_list_all_customer] @Kode = ?', [2]);
        return response()->json($tabel);
    }

    public function getListSJNotaKredit($idCustomer)
    {
        $tabel =  DB::connection('ConnSales')->select('exec [SP_LIST_SJ_NOTAKREDIT] @IdCust = ?', [$idCustomer]);
        return response()->json($tabel);
    }

    public function getLihat_PenagihanNotaKredit($idCustomer, $MIdRetur)
    {
        //dd($idCustomer, $MIdRetur);
        $tabel =  DB::connection('ConnSales')->select('exec [SP_LIST_RETUR_NOTAKREDIT] @IdCust = ?, @IdRetur = ?', [$idCustomer, $MIdRetur]);
        return response()->json($tabel);
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
