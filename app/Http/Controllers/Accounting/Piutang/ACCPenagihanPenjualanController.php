<?php

namespace App\Http\Controllers\Accounting\Piutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ACCPenagihanPenjualanController extends Controller
{
    public function index()
    {
        $data = 'Accounting';
        return view('Accounting.Piutang.ACCPenagihanPenjualan', compact('data'));
    }

    public function getDisplayHeader()
    {
        $jenis =  DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_PENAGIHAN_SJ] @Kode = ?',[1]);
        return response()->json($jenis);
    }

    public function getDisplayDetail($id_Penagihan)
    {
        //dd("mask");
        $idPenagihan = str_replace('.', '/', $id_Penagihan);
        $jenis =  DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_PENAGIHAN_SJ] @Kode = ?, @ID_Penagihan = ?', [2, $idPenagihan]);
        return response()->json($jenis);
    }

    public function getDisplaySuratJalan($id_Penagihan)
    {
        $idPenagihan = str_replace('.', '/', $id_Penagihan);
        $jenis =  DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_PENAGIHAN_SJ] @Kode = ?, @ID_PENAGIHAN = ?',[11, $idPenagihan]);
        return response()->json($jenis);
    }

    public function accCheckCtkSJ($id_Penagihan)
    {

        $idPenagihan = str_replace('.', '/', $id_Penagihan);
        $jenis =  DB::connection('ConnAccounting')->select('exec [SP_1273_ACC_CHECK_CTK_SJ] @IdPenagihan = ?',[$idPenagihan]);
        return response()->json($jenis);
    }

    public function accCheckCtkSP($id_Penagihan)
    {

        $idPenagihan = str_replace('.', '/', $id_Penagihan);
        $jenis =  DB::connection('ConnAccounting')->select('exec [SP_1273_ACC_CHECK_CTK_SP] @IdPenagihan = ?',[$idPenagihan]);
        return response()->json($jenis);
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        $id_Penagihan = $request->id_Penagihan;
        $idCustomer = $request->idCustomer;
        $idMataUang = $request->idMataUang;
        $nilaiTagihan = $request->nilaiTagihan;
        $kurs = $request->kurs;

        $idPenagihan = str_replace('.', '/', $id_Penagihan);

        DB::connection('ConnAccounting')->statement('exec [SP_1486_ACC_PENAGIHAN_SJ]
        @UserAcc = ?,
        @Id_Penagihan = ?,
        @IdCust = ?,
        @IdMtUang = ?,
        @debet = ?,
        @kurs = ?', [
            1,
            $idPenagihan,
            $idCustomer,
            $idMataUang,
            $nilaiTagihan,
            $kurs
        ]);
        return redirect()->back()->with('success', 'Proses Acc Penagihan Surat Jalan Selesai !!');
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
