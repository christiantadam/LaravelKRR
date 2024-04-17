<?php

namespace App\Http\Controllers\WORKSHOP\Workshop\Transaksi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Auth;
use App\Http\Controllers\HakAksesController;

class ProsesPembeliGambarController extends Controller
{

    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Workshop');
        return view('WORKSHOP.Workshop.Transaksi.ProsesPemberiGambar', compact('access'));
    }
    public function GetAllData($tgl_awal, $tgl_akhir)
    {
        $all = DB::connection('Connworkshop')->select('[SP_5298_WRK_LIST-ORDER-GBR] @kode = ?, @tgl1 = ?, @tgl2 = ?', [12, $tgl_awal, $tgl_akhir]);
        return response()->json($all);
    }
    public function GetDataModal($tgl_awal, $tgl_akhir)
    {
        $all = DB::connection('Connworkshop')->select('[SP_5298_WRK_LIST-ORDER-GBR] @kode = ?, @tgl1 = ?, @tgl2 = ?', [13, $tgl_awal, $tgl_akhir]);
        return response()->json($all);
    }
    public function getdataprint($idorder)
    {
        $data = DB::connection('Connworkshop')->table('VW_PRG_5298_WRK_CETAK-ORDER-GBR')
            ->where('Id_Order', $idorder)
            ->get();
        return response()->json($data);
    }
    public function updatedatacetak(Request $request)
    {
        // dd($request->all());
        $noOd = $request->noOd;
        DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_TGL-CETAK-ORDER_GBR] @noOd = ?', [$noOd]);
        return redirect()->back();
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
        $idorder = $request->idorder;
        $gambar = $request->gambar;
        $idorderarray = explode(",", $idorder);
        $arraygambar = explode(",", $gambar);
        for ($i = 0; $i < count($idorderarray); $i++) {
            DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_UPDATE-TGL-BERI-GBR] @noOd = ?, @noGbr = ?', [$idorderarray[$i], $arraygambar[$i]]);
        }
        return redirect()->back()->with('success', 'Data TerSIMPAN');
    }


    public function destroy($id)
    {
        //
    }
}
