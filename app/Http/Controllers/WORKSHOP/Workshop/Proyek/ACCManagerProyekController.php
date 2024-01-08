<?php

namespace App\Http\Controllers\WORKSHOP\Workshop\Proyek;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ACCManagerProyekController extends Controller
{

    public function index()
    {
        $divisi = DB::connection('Connworkshop')->select('exec [SP_5298_WRK_USER-DIVISI] @user = ?', [4384]);
        return view('WORKSHOP.Workshop.Proyek.ACCManagerProyek', compact(['divisi']));
    }
    public function GetDataAll($divisi)
    {
        $all = DB::connection('Connworkshop')->select('[SP_5298_WRK_LIST-ORDER-PRY] @kode = ?, @div = ?', [4, $divisi]);
        return response()->json($all);
    }
    public function GetDataTable($idOrder) {
        $all = DB::connection('Connworkshop')->select('[SP_5298_WRK_LIST-ORDER-PRY] @kode = ?, @noOrder = ?', [3, $idOrder]);
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
            $iduser = $request->iduser;
            $idorder = explode(",", $data);
            for ($i=0; $i < count($idorder); $i++) {
                DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_ACC-MNG-ORDER-PRY] @user = ?, @noOrder = ?', [$iduser, $idorder[$i]]);
            }
            return redirect()->back()->with('success', 'Order Sudah DiACC.');
        }
        else if($radiobox == "batal_acc"){
            $data = $request->semuacentang;
            $idorder = explode(",", $data);
            for ($i=0; $i < count($idorder); $i++) {
                DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_BATAL-ACC-MNG-ORDER-PRY] @noOrder = ?', [ $idorder[$i]]);
            }
            return redirect()->back()->with('success', 'ACC Order dibatalkan.');
        }
        else if ($radiobox == "tidak_setuju") {
            # code...
            $user = $request->iduser;
            $data = $request->semuacentang;
            $idorder = explode(",", $data);
            $dataket = $request->KetTdkS;
            $ket = explode(",", $dataket);
            for ($i=0; $i < count($idorder); $i++) {
                DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_TDKSTJ-MNG-ORDER-PRY] @user = ?, @noOrder = ?, @ket = ?', [$user ,$idorder[$i],$ket[$i]]);
            }
            return redirect()->back()->with('success', 'Order Sudah Diproses.');
        }
    }


    public function destroy($id)
    {
        //
    }
}
