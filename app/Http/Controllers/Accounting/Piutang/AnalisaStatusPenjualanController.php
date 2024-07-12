<?php

namespace App\Http\Controllers\Accounting\Piutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AnalisaStatusPenjualanController extends Controller
{
    public function index()
    {
        $data = 'Accounting';
        return view('Accounting.Piutang.AnalisaStatusPenjualan', compact('data'));
    }

    public function getDisplaySuratJalan($tanggal, $tanggal2)
    {
        // dd("masuk");
        $tabel =  DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_STATUS_PENAGIHAN_PENJUALAN] @Kode = ?, @Tgl1 = ?, @Tgl2 = ?', [1, $tanggal, $tanggal2]);
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
        $no_Faktur = $request->no_Faktur;
        $lunas = $request->lunas;
        $idBKM = $request->idBKM;
        $noFaktur = str_replace('.', '/', $no_Faktur);
        DB::connection('ConnAccounting')->statement('exec [SP_1486_ACC_UPDATE_LUNAS]
        @id_Penagihan = ?,
        @Lunas = ?,
        @Id_BKM = ?
        ', [
            $noFaktur,
            $lunas,
            $idBKM
        ]);
        return response()->json('Data Telah TerSimpan');;
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
