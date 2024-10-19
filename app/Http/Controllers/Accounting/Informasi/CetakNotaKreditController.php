<?php

namespace App\Http\Controllers\Accounting\Informasi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;


class CetakNotaKreditController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Piutang.CetakNotaKredit', compact('access'));
    }

    public function getListCetakNotaKredit($tanggal)
    {
        $tabel =  DB::connection('ConnAccounting')->select('exec [SP_LIST_CETAK_NotaKredit] @Kode = ?, @Tanggal = ?', [5, $tanggal]);
        return response()->json($tabel);
    }

    public function getIdSuratJalanNotaKredit($notaKredit)
    {
        $tabel =  DB::connection('ConnAccounting')->select('exec [SP_LIST_CETAK_NotaKredit] @Kode = ?, @ID_NOTAKREDIT = ?', [6, $notaKredit]);
        return response()->json($tabel);
    }

    public function getDisplayDetailNotaKredit($notaKredit)
    {
        $tabel =  DB::connection('ConnAccounting')->select('exec [SP_LIST_CETAK_NOTAKREDIT] @Kode = ?, @ID_NOTAKREDIT = ?', [12, $notaKredit]);
        return response()->json($tabel);
    }

    public function getSFilter1($notaKredit)
    {
        //dd($idBKM);
        $data = DB::connection('ConnAccounting')->table('vw_prg_cetak_nota_kredit')
        ->where('Id_NotaKredit', $notaKredit)
        ->get();
        return $data;
    }

    public function getSFilter2($notaKredit)
    {
        //dd($idBKM);
        $data = DB::connection('ConnAccounting')->table('vw_Prg_Cetak_Pot_Harga')
        ->where('Id_NotaKredit', $notaKredit)
        ->get();
        return $data;
    }

    public function getSFilter3($notaKredit)
    {
        //dd($idBKM);
        $data = DB::connection('ConnAccounting')->table('vw_prg_Cetak_Nota_Kredit_Free')
        ->where('Id_NotaKredit', $notaKredit)
        ->get();
        return $data;
    }

    public function getSFilter4($notaKredit)
    {
        //dd($idBKM);
        $data = DB::connection('ConnAccounting')->table('vw_prg_Cetak_Selisih_Timbang')
        ->where('Id_NotaKredit', $notaKredit)
        ->get();
        return $data;
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
