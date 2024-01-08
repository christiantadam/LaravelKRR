<?php

namespace App\Http\Controllers\WORKSHOP\Workshop\Transaksi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ACCManagerKerjaController extends Controller
{

    public function index()
    {
        $divisi = DB::connection('Connworkshop')->select('exec [SP_5298_WRK_USER-DIVISI] @user = ?', [4384]);
        return view('WORKSHOP.Workshop.Transaksi.ACCManagerKerja', compact(['divisi']));
    }
    public function GetDataAll($divisi)
    {
        $all = DB::connection('Connworkshop')->select('[SP_5298_WRK_LIST-ORDER-KRJ] @kode = ?, @div = ?', [4, $divisi]);
        return response()->json($all);
    }
    public function Loaddata($id) {
        $data = DB::connection('Connworkshop')->select('[SP_5298_WRK_LIST-ORDER-KRJ] @kode = ?, @noOrder = ?', [3, $id]);
        return response()->json($data);
    }
    public function getsaldo($kodebarang) {
        $data = DB::connection('Connworkshop')->select('[SP_5298_WRK_SALDO-BARANG] @kdBarang = ?', [$kodebarang]);
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
        $radiobox = $request->radiobox;
        if ($radiobox == "acc") {
            # code...
            $data = $request->semuacentang;
            $iduser = $request->UserACC;
            $idorder = explode(",", $data);
            for ($i=0; $i < count($idorder); $i++) {
                DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_ACC-MNG-ORDER-KRJ] @user = ?, @noOrder = ?', [$iduser, $idorder[$i]]);
            }
            return redirect()->back()->with('success', 'Order Sudah DiACC.');
        }
        else if($radiobox == "batal_acc"){
            $data = $request->semuacentang;
            $idorder = explode(",", $data);
            for ($i=0; $i < count($idorder); $i++) {
                DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_BATAL-ACC-MNG-ORDER-KRJ] @noOrder = ?', [ $idorder[$i]]);
            }
            return redirect()->back()->with('success', 'ACC Order sdh dibatalkan.');
        }
        else if ($radiobox == "tidak_setuju") {
            # code...
            $user = $request->UserACC;
            $data = $request->semuacentang;
            $idorder = explode(",", $data);
            $dataket = $request->KetTdkS;
            $ket = explode(",", $dataket);
            for ($i=0; $i < count($idorder); $i++) {
                DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_TDKSTJ-MNG-ORDER-KRJ] @user = ?, @noOrder = ?, @ket = ?', [$user ,$idorder[$i],$ket[$i]]);
            }
            return redirect()->back()->with('success', 'Order Sudah Diproses.');
        }
    }


    public function destroy($id)
    {
        //
    }
}
