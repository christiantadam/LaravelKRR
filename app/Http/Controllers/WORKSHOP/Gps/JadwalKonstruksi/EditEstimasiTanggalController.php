<?php

namespace App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class EditEstimasiTanggalController extends Controller
{

    public function index()
    {
        $data = DB::connection('Connworkshop')->select('[SP_5298_PJW_LIST-WORKSTATION]');
        // dd($data);
        return view('workshop.GPS.Jadwal_konstruksi.EditEstimasiTanggal', compact(['data']));
    }
    public function NOFINISH($worksts, $date1)
    {
        $data = DB::connection('Connworkshop')->select('[SP_5298_PJW_NOANTRI-KONSTRUKSI-NOFINISH] @worksts = ?, @date1 = ?', [$worksts, $date1]);
        $array = [];
        for ($i = 0; $i < count($data); $i++) {
            if ($data[$i]->Cancel == 0) {
                array_push($array, DB::connection('Connworkshop')->select('[SP_5298_PJW_JADWAL-KONSTRUKSI] @kode = ?, @noAntri = ?, @date = ?, @worksts = ?', [1, $data[$i]->NoAntrian, $date1, $worksts]));
                // array_push($array, $this->getdatatable($data[$i]->NoAntrian, $date1, $worksts));
                // $array[] = $this->getdatatable($data[$i]->NoAntrian,$date1,$worksts);
            }
        }
        $result = array();
        foreach ($array as $sub_array) {
            foreach ($sub_array as $element) {
                $result[] = $element;
            }
        }

        return response()->json($result);
    }
    // public function getdatatable($noAntri, $date, $worksts)
    // {
    //     $data = DB::connection('Connworkshop')->select('[SP_5298_PJW_JADWAL-KONSTRUKSI] @kode = ?, @noAntri = ?, @date = ?, @worksts = ?', [1, $noAntri, $date, $worksts]);
    //     return $data;
    // }
    // public function cekestimasi($noOd)
    // {
    //     $data = DB::connection('Connworkshop')->select('[SP_5298_PJW_CEK-ESTIMASI-KONSTRUKSI] @noOd = ?', [$noOd]);
    //     return response()->json($data);
    // }
    public function cekestimasikonstruksi($noOd, $newTgl)
    {
        $data1 = DB::connection('Connworkshop')->select('[SP_5298_PJW_CEK-ESTIMASI-KONSTRUKSI] @noOd = ?', [$noOd]);
        if (count($data1) > 0) {
            $tglF = $data1[0]->TglF;
            $tglS = $data1[0]->TglS;
        }
        if ($newTgl < $tglS || $newTgl > $tglF) {
            if ($newTgl < $tglS) {
                // return("Tidak boleh. Karena tgl yg diinput < estimasi tgl start(" +
                // $tglS +
                // ") yg dijadwalkan oleh PPIC.");
                return redirect()->route('EditEstimasiTanggal.index')->with('alert', 'Tidak boleh. Karena tgl yg diinput < estimasi tgl start(' .
                $tglS->format('Y-m-d') .
                ') yg dijadwalkan oleh PPIC.');
            }
            else if($newTgl > $tglF){
                return("Tidak boleh. Karena tgl yg diinput > estimasi tgl finish(" +
                $tglF +
                ") yg dijadwalkan oleh PPIC.");
            }
            return(
                        "Untuk nomer order: " +
                        $noOd +
                        ", tdk bisa diproses."
            );
        }
        else {
            return true;
        }
        // $data = DB::connection('Connworkshop')->select('[SP_5298_PJW_CEK-ESTDATE-KONSTRUKSI] @estDate = ?, @worksts = ?', [$estDate, $worksts]);
        // return response()->json($data1);
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
        // dd($request->all());
        Log::info('cek :' . json_encode($request->all()));

        $estDate = $request->estDate;
        $noAntri = $request->noAntri;
        $idBag = $request->idBag;
        $estHour = $request->estHour;
        $estMinute = $request->estMinute;
        $worksts = $request->worksts;
        $oldDate =  $request->oldDate;
        $jamKrj = $request->jamKrj;
        $user = 4384;
        $keterangan = $request->keterangan;
        return DB::connection('Connworkshop')->statement(
            'exec [SP_5298_PJW_EDIT-ESTDATE-KONSTRUKSI-NEW] @estDate = ?, @noAntri = ?, @idBag = ?, @estHour = ?, @estMinute = ?, @worksts = ?, @oldDate = ?, @jamKrj = ?, @user = ?, @keterangan = ?',
            [$estDate, $noAntri, $idBag, $estHour, $estMinute, $worksts, $oldDate, $jamKrj, $user, $keterangan]
        );
    }


    public function destroy($id)
    {
        //
    }
}
