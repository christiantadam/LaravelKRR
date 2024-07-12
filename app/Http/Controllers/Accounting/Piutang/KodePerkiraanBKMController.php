<?php

namespace App\Http\Controllers\Accounting\Piutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class KodePerkiraanBKMController extends Controller
{
    public function index()
    {
        $data = 'Accounting';
        return view('Accounting.Piutang.KodePerkiraanBKM', compact('data'));
    }

    public function getIdBKM5($BlnThn)
    {
        $tabel =  DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_TPELUNASAN] @Kode = ?, @BlnThn = ?', [5, $BlnThn]);
        return response()->json($tabel);
    }
    public function getIdBKM6($BlnThn)
    {
        $tabel =  DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_TPELUNASAN] @Kode = ?, @BlnThn = ?', [6, $BlnThn]);
        return response()->json($tabel);
    }

    public function getTabelRincian($idBKM)
    {
        $tabel =  DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_TPELUNASAN] @Kode = ?, @IdBKM = ?', [7, $idBKM]);
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
        //dd($request->all());
        $idDetail = $request->idDetail;
        $idBayar = $request->idBayar;
        $idKodePerkiraan = $request ->idKodePerkiraan;

        if ($idDetail == 0) {
            DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_KDPERKIRAAN_BKM]
            @Kode = ?,
            @IdPelunasan = ?,
            @KodePerkiraan = ?', [
                1,
                $idBayar,
                $idKodePerkiraan]);
        } else {
            DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_KDPERKIRAAN_BKM]
            @Kode = ?,
            @IdDetail = ?,
            @KodePerkiraan = ?', [
                2,
                $idDetail,
                $idKodePerkiraan]);
        }
        return redirect()->back()->with('success', 'Data sudah diKOREKSI');

    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
