<?php

namespace App\Http\Controllers\Accounting\Piutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatusDokumenTagihanController extends Controller
{
    public function index()
    {
        $data = 'Accounting';
        return view('Accounting.Piutang.StatusDokumenTagihan', compact('data'));
    }

    public function getCust()
    {
        $data =  DB::connection('ConnAccounting')->select('exec [SP_1486_SLS_LIST_ALL_CUSTOMER]
        @Kode = ?', [1]);
        return response()->json($data);
    }

    public function getTabelStatusDokumen($idCustomer)
    {
        $data =  DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_MAINT_STATUS_DOKUMEN]
        @Kode = ?, @ID_Customer = ?', [1, $idCustomer]);
        return response()->json($data);
    }

    public function getDataStatusDokumen()
    {
        $data =  DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_MAINT_STATUS_DOKUMEN]
        @Kode = ?', [3]);
        return response()->json($data);
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
        // dd($request->all());
        $idStatus = $request->idStatus;
        $id_Penagihan = $request->id_Penagihan;
        $idPenagihan = str_replace('.', '/', $id_Penagihan);


        DB::connection('ConnAccounting')->statement('exec [SP_1486_ACC_MAINT_STATUS_DOKUMEN]
        @Kode = ?,
        @IdStatus = ?,
        @Id_Penagihan = ?',
        [
            4,
            $idStatus,
            $idPenagihan
        ]);

        return redirect()->back()->with('success', 'Detail Sudah Terkoreksi');
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
