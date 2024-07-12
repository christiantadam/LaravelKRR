<?php

namespace App\Http\Controllers\Accounting\Piutang\MaintenanceNotaKredit;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class KelebihanBayarJualTunaiController extends Controller
{
    public function index()
    {
        $data = 'Accounting';
        return view('Accounting.Piutang.MaintenanceNotaKredit.KelebihanBayarJualTunai', compact('data'));
    }

    public function getCustKelebihanBayar()
    {
        $tabel =  DB::connection('ConnAccounting')->select('exec [sp_list_customer] @Kode = ?', [4]);
        return response()->json($tabel);
    }

    public function getListNotaKreditKelebihanBayar($idCustomer)
    {
        $tabel =  DB::connection('ConnAccounting')->select('exec [SP_LIST_NOTA_KREDIT] @Kode = ?, @IdCust = ?, @JnsNotaKredit = ?',
        [7, $idCustomer, 4]);
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
    public function show(cr $cr)
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
