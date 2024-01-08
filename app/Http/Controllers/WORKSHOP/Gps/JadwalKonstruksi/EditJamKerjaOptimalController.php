<?php

namespace App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class EditJamKerjaOptimalController extends Controller
{
    public function index()
    {
        //
        $data = DB::connection('Connworkshop')->select('[SP_5298_PJW_LIST-WORKSTATION]');
        return view('workshop.GPS.Jadwal_konstruksi.EditJamkerja', compact(['data']));
    }
    public function HitungSisaJam($EstDate , $worksts) {
        $data = DB::connection('Connworkshop')->select('[SP_5298_PJW_HITUNG-SISA-JAM-KRJ-KONSTRUKSI] @EstDate = ?, @worksts = ?', [$EstDate,  $worksts]);
        return response()->json($data);
    }
    public function GetJamKerja($worksts, $estDate)
    {
        $data = DB::connection('Connworkshop')->select('[SP_5298_PJW_GET-JAM-KERJA-KONSTRUKSI] @worksts = ?, @estDate = ?', [$worksts, $estDate]);
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
        //dd($request->all());
        $worksts = $request->WorkStation;
        $jmljam = $request->JlmJamKerja;
        $EstDate = $request->Tanggal;
        DB::connection('Connworkshop')->statement('exec [SP_5298_PJW_EDIT-JAM-KERJA-KONSTRUKSI] @worksts = ?, @jmljam = ?, @EstDate = ?', [$worksts, $jmljam, $EstDate]);
        return redirect()->back()->with('success', "Data sudah diSimpan.");
        //
    }

    public function destroy($id)
    {
        //
    }
}
