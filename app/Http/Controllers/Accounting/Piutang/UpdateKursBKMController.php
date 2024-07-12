<?php

namespace App\Http\Controllers\Accounting\Piutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UpdateKursBKMController extends Controller
{
    public function index()
    {
        $data = 'Accounting';
        return view('Accounting.Piutang.UpdateKursBKM', compact('data'));
    }

    public function getTabelPelunasan($bulan, $tahun)
    {
        //dd($bulan, $tahun);
        $tabel =  DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_BKM_TUNAI] @bln = ?, @thn = ?', [$bulan, $tahun]);
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
        $IdPelunasan = $request->IdPelunasan;
        $idbkm = $request->idbkm;
        $kursRupiah = $request->kursRupiah;

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_KURS_BKM]
        @idPel = ?,
        @idBKM = ?,
        @kurs = ?',
        [
            $IdPelunasan,
            $idbkm,
            $kursRupiah
        ]);

        return redirect()->back()->with('success', 'Data Tersimpan');
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
