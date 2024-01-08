<?php

namespace App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class EditJadwalPerWorkStationController extends Controller
{

    public function index()
    {
        //
        $data = DB::connection('Connworkshop')->select('[SP_5298_PJW_LIST-WORKSTATION]');
        return view('workshop.GPS.Jadwal_konstruksi.EditPerWorkStation', compact(['data']));

    }
    public function NoAntri($worksts, $date1) {
        $data = DB::connection('Connworkshop')->select('[SP_5298_PJW_NOANTRI-KONSTRUKSI-NOFINISH] @worksts = ?, @date1 = ?', [$worksts, $date1]);
        return response()->json($data);
    }
    public function getdatatable($noAntri, $date , $worksts) {
        $data = DB::connection('Connworkshop')->select('[SP_5298_PJW_JADWAL-KONSTRUKSI] @kode = ?, @noAntri = ?, @date = ?, @worksts = ?', [1,$noAntri,$date, $worksts]);
        return response()->json($data);
    }


    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        //
    }

    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
        // dd($request->all());
         //
        // $worksts  = $request->WorkStationModalEdit;
        // $jmljam = $request->TJam;
        // $EstDate = $request->Tanggal;
        $noAntri = $request->noAntri;
        $noBantu = $request->noBantu;
        $worksts = $request->worksts;
        $tgl = $request->tgl;
        DB::connection('Connworkshop')->statement('exec [SP_5298_PJW_UPDATE-NOANTRI-KONSTRUKSI] @noAntri = ?, @noBantu = ?, @worksts = ?, @tgl = ?', [$noAntri,$noBantu,$worksts,$tgl]);
        // return redirect()->back()->with('success', "Data sudah diSimpan.");
        return response()->json(['message' => 'Data telah diperbarui.']);
    }

    public function destroy($id)
    {
        //
    }
}
