<?php

namespace App\Http\Controllers\WORKSHOP\Workshop\Proyek;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;

class ACCDirekturProyekController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Workshop');
        return view('WORKSHOP.Workshop.Proyek.ACCDirekturProyek', compact('access'));
    }
    public function GetAllData($tgl_awal, $tgl_akhir)
    {
        $all = DB::connection('Connworkshop')->select('[SP_5298_WRK_LIST-ORDER-PRY] @kode = ?, @tgl1 = ?, @tgl2 = ?', [6, $tgl_awal, $tgl_akhir]);
        return response()->json($all);
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
        //dd($request->all());
        $radiobox = $request->radiobox;
        if ($radiobox == "acc") {
            # code...
            $data = $request->semuacentang;
            $idorder = explode(",", $data);
            for ($i = 0; $i < count($idorder); $i++) {
                DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_ACC-DIR-ORDER-PRY]  @noOrder = ?', [$idorder[$i]]);
            }
            return redirect()->back()->with('success', 'Order Sudah DiACC.');
        } else if ($radiobox == "batal_acc") {
            $data = $request->semuacentang;
            $idorder = explode(",", $data);
            for ($i = 0; $i < count($idorder); $i++) {
                DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_BATAL-ACC-DIR-ORDER-PRY] @noOrder = ?', [$idorder[$i]]);
            }
            return redirect()->back()->with('success', 'ACC Order sdh dibatalkan.');
        } else if ($radiobox == "tidak_setuju") {
            # code...

            $data = $request->semuacentang;
            $idorder = explode(",", $data);
            $dataket = $request->KetTdkS;
            $ket = explode(",", $dataket);
            for ($i = 0; $i < count($idorder); $i++) {
                DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_TDKSTJ-DIR-ORDER-PRY] @noOrder = ?, @ket = ?', [$idorder[$i], $ket[$i]]);
            }
            return redirect()->back()->with('success', 'Order Sudah Diproses.');
        }
    }


    public function destroy($id)
    {
        //
    }
}
