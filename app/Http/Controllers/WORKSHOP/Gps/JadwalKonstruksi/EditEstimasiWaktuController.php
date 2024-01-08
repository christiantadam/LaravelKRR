<?php

namespace App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EditEstimasiWaktuController extends Controller
{
    public function index()
    {
        //
        $data = DB::connection('Connworkshop')->select('[SP_5298_PJW_LIST-WORKSTATION]');
        return view('workshop.GPS.Jadwal_konstruksi.EditEstimasiWaktu', compact(['data']));
    }

    public function Loaddata($worksts, $date1)
    {
        $data = DB::connection('Connworkshop')->select('[SP_5298_PJW_NOANTRI-KONSTRUKSI-NOFINISH] @worksts = ?, @date1 = ? ', [$worksts, $date1]);
        // dd($data);
        $no_Antri = [];
        $idk = 0;
        // dd($worksts,$date1,$data);
        for ($i = 0; $i < count($data); $i++) {
            # code...
            // dd(count($data));
            if ($data[$i]->Cancel == 0) {
                # code...
                $no_Antri[] = $data[$i]->NoAntrian;
                $idk += 1;
            }
        }
        // dd($no_Antri,$data);
        $arraydata = [];
        // dd($idk);
        for ($k = 0; $k < $idk; $k++) {
            # code...
            $table = DB::connection('Connworkshop')->select('[SP_5298_PJW_JADWAL-KONSTRUKSI] @kode = ?, @noAntri = ?, @date = ?, @worksts = ? ', [1, $no_Antri[$k], $date1, $worksts]);
            $arraydata[] = $table;
        }
        $result = array();
        foreach ($table as $sub_array) {
            foreach ($sub_array as $element) {
                $result[] = $element;
            }
        }
        // dd($arraydata, $no_Antri,$date1, $worksts, $data, $result);
        return response()->json($result);
    }
    public function hitungjam($EstDate, $worksts, $noQue)
    {
        $data = DB::connection('Connworkshop')->select('[SP_5298_PJW_HITUNG-JAM-KONSTRUKSI] @EstDate = ?, @worksts = ?, @noQue = ?', [$EstDate, $worksts, $noQue]);
        return response()->json($data);
    }
    public function EditJamKerjaKonstruksi(Request $request) {
        $worksts = $request->WorkStation;
        $jmljam = $request->JlmJamKerja;
        $EstDate = $request->Tanggal;
        DB::connection('Connworkshop')->statement('exec [SP_5298_PJW_EDIT-JAM-KERJA-KONSTRUKSI] @worksts = ?, @jmljam = ?, @EstDate = ?', [$worksts, $jmljam, $EstDate]);
        return redirect()->back()->with('success', "Data sudah diSimpan.");
    }
    public function HitungJamSisa($EstDate, $worksts) {
        $data = DB::connection('Connworkshop')->select('[SP_5298_PJW_HITUNG-SISA-JAM-KRJ-KONSTRUKSI] @EstDate = ?, @worksts = ?', [$EstDate, $worksts]);
        return response()->json($data);
    }

    public function GetJamKerja($worksts,$EstDate) {
        $data = DB::connection('Connworkshop')->select('[SP_5298_PJW_GET-JAM-KERJA-KONSTRUKSI] @worksts = ?, @estDate = ?', [ $worksts, $EstDate]);
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
    }

    public function destroy($id)
    {
        //
    }
}
