<?php

namespace App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
class EditJadwalPerOrderController extends Controller
{

    public function index()
    {
        //
        return view('workshop.GPS.Jadwal_konstruksi.EditPerOrder');
    }
    public function LoadData($noOd) {
        $data = DB::connection('Connworkshop')->select('[SP_5298_PJW_LIST-ORDER-GAMBAR] @kode = ?, @noOd = ?', [1,$noOd]);
        return response()->json($data);
    }
    public function cekEstimasiKonstruksi($noOd) {
        $data = DB::connection('Connworkshop')->select('[SP_5298_PJW_CEK-ESTIMASI-KONSTRUKSI] @noOd = ?', [$noOd]);
        return response()->json($data);
    }
    public function getDataTable($noOd, $idBag) {
        $data = DB::connection('Connworkshop')->select('[SP_5298_PJW_INF-KONSTRUKSI-PER-ORDER] @kode = ?, @noOd = ?, @idBag = ?', [4,$noOd,$idBag]);
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
        // Log::info('wdawdw :' .json_encode($request->all()));
        // dd($request);
        $noAntri = $request->noAntri;
        $idTrans = $request->idTrans;
        $estDate = $request->estDate;
        $worksts = $request->worksts;
        $idBag = $request->idBag;
        $Time = $request->Time;
        DB::connection('Connworkshop')->statement('exec [SP_5298_PJW_UPDATE-POSISIKRJ-KONSTRUKSI] @noAntri = ?, @idTrans = ?, @estDate = ?, @worksts = ?, @idBag = ?, @Time = ?', [$noAntri,$idTrans,$estDate,$worksts,$idBag,$Time]);
        // return redirect()->back()->with('success', "Data sudah diSimpan.");
        return response()->json(['message' => 'Data telah diperbarui.']);

    }

    public function destroy($id)
    {
        //
    }
}
