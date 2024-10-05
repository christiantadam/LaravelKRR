<?php

namespace App\Http\Controllers\Accounting\Piutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;


class BatalBKMTransistorisController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Piutang.BatalBKMTransistoris', compact('access'));
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
        $proses =  $request->all();
        if ($proses['cetak'] == "tampilBKK") {
            //dd($request->all());
            $idBKK = $request ->idTampilBKK;
            DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_TGLCETAK_BKK] @idBKK = ?', [
                $idBKK]);
            return redirect()->back()->with('success', 'Tanggal cetak sudah terupdate');

        }
        else if ($proses['cetak'] == "tampilBKM") {
            //dd('masuk');
            $idBKM = $request ->idTampilBKM;
            DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_TGLCETAK_BKM] @idBKM = ?', [
                $idBKM]);
            return redirect()->back()->with('success', 'Detail Sudah Terkoreksi');
        }

        //dd($request->all());
    }



    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
