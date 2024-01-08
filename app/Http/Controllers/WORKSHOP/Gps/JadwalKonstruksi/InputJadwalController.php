<?php

namespace App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InputJadwalController extends Controller
{

    public function index()
    {
        //
        $data = DB::connection('Connworkshop')->select('[SP_5298_PJW_LIST-WORKSTATION]');
        return view('workshop.GPS.Jadwal_konstruksi.InputJadwal', compact(['data']));
    }
    public function LoadData($noOd)
    {
        $data = DB::connection('Connworkshop')->select('[SP_5298_PJW_LIST-ORDER-GAMBAR] @kode = ?, @noOd = ?', [1, $noOd]);
        return response()->json($data);
    }
    public function cekdataestimasi($noOd)
    {
        $data = DB::connection('Connworkshop')->select('[SP_5298_PJW_CEK-ESTIMASI-KONSTRUKSI] @noOd = ?', [$noOd]);
        return response()->json($data);
    }
    public function Getdatabagian($noOd)
    {
        $data = DB::connection('Connworkshop')->select('[SP_5298_PJW_LIST-BAGIAN-GAMBAR] @noOd = ?', [$noOd]);
        return response()->json($data);
    }
    public function GetJamKerja($worksts, $estDate)
    {
        $data = DB::connection('Connworkshop')->select('[SP_5298_PJW_GET-JAM-KERJA-KONSTRUKSI] @worksts = ?, @estDate = ?', [$worksts, $estDate]);
        return response()->json($data);
    }
    public function Cekdatasudahada($idBagian, $estDate, $worksts)
    {
        $data = DB::connection('Connworkshop')->select('[SP_5298_PJW_CEK-PROSES-KONSTRUKSI] @idBagian = ?, @estDate = ?, @worksts = ?', [$idBagian, $estDate, $worksts]);
        return response()->json($data);
    }
    public function Cekestimasidatekonstruksi($EstDate, $worksts)
    {
        $data = DB::connection('Connworkshop')->select('[SP_5298_PJW_CEK-ESTDATE-KONSTRUKSI] @EstDate = ?, @worksts = ?', [$EstDate,  $worksts]);
        return response()->json($data);
    }
    public function HitungSisaJam($EstDate, $worksts)
    {
        $data = DB::connection('Connworkshop')->select('[SP_5298_PJW_HITUNG-SISA-JAM-KRJ-KONSTRUKSI] @EstDate = ?, @worksts = ?', [$EstDate,  $worksts]);
        return response()->json($data);
    }
    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
        // dd($request->all());
        $estDate = $request->tglStart;
        $estHour = $request->jam;
        $estMinute = $request->menit;
        $worksts = $request->WorkStation;
        $jamKrj = $request->jam_kerja;
        $status = $request->status;
        $user = 4384;
        $idBag = $request->NamaBagian;
        $hari = $request->hariKe;
        DB::connection('Connworkshop')->statement('exec [SP_5298_PJW_INSERT-NEWQUE-KONSTRUKSI] @estDate = ?, @estHour = ?, @estMinute = ?, @worksts = ?, @jamKrj = ?, @status = ?, @user = ?, @idBag = ?, @hari = ?', [$estDate, $estHour, $estMinute, $worksts, $jamKrj, $status, $user, $idBag, $hari]);
        return redirect()->back()->with('success', "Data telah diSimpan.");
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

    }


    public function destroy($id)
    {
        //
    }
}
