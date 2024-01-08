<?php

namespace App\Http\Controllers\WORKSHOP\Gps\InformasiKonstruksi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class JadwalPerWorkStationController extends Controller
{

    public function index()
    {
        //
        $data = DB::connection('Connworkshop')->select('[SP_5298_PJW_LIST-WORKSTATION]');
        return view('workshop.GPS.Informasi_Konstruksi.JadwalPerWorkStation', compact(['data']));
    }
    public function LoadData($worksts, $date1, $date2)
    {
        $idk = 0;
        $no_Antri = [];
        $estDate = [];
        $alldata = [];
        $data = DB::connection('Connworkshop')->select('[SP_5298_PJW_NOANTRI-KONSTRUKSI-NOFINISH] @kode = ?, @worksts = ?, @date1 = ?, @date2 = ?', [1, $worksts, $date1, $date2]);

        if (count($data) > 0) {
            for ($i = 0; $i < count($data); $i++) {
                $no_Antri[] = $data[$i]->NoAntrian;
                $estDate[] = $data[$i]->EstDate;
                $idk += 1;
            }
        }
        else {
            return response()->json($data);
        }

        for ($k = 0; $k < $idk; $k++) {
            # code...
            $jadwal = DB::connection('Connworkshop')->select('[SP_5298_PJW_JADWAL-KONSTRUKSI] @kode = ?, @noAntri = ?, @date = ?, @worksts = ?', [2, $no_Antri[$k], $estDate[$k], $worksts]);
            $alldata[] = $jadwal;
        }
        $result = array();
        foreach ($alldata as $sub_array) {
            foreach ($sub_array as $element) {
                $result[] = $element;
            }
        }
        return response()->json($result);
        // return response()->json($data);
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
