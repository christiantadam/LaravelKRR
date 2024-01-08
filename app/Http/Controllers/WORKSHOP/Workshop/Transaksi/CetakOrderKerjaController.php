<?php

namespace App\Http\Controllers\WORKSHOP\Workshop\Transaksi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class CetakOrderKerjaController extends Controller
{

    public function index()
    {
        return view('WORKSHOP.Workshop.Transaksi.CetakSuratOrderKerja');

    }

    public function GetAllData($tgl_awal, $tgl_akhir)
    {
        $all = DB::connection('Connworkshop')->select('[SP_5298_WRK_LIST-ORDER-KRJ] @kode = ?, @tgl1 = ?, @tgl2 = ?', [12, $tgl_awal, $tgl_akhir]);
        return response()->json($all);
    }
    public function getdataprint($idorder) {
        $data = DB::connection('Connworkshop')->table('VW_PRG_5298_WRK_CETAK-ORDER-KRJ')
        ->where('Id_Order', $idorder)
        ->get();
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
        dd($request->all());

    }
    public function updatedatacetak(Request $request) {
        // dd($request->all());
        $noOd = $request->noOd;
        DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_TGL-CETAK-ORDER_KRJ] @noOd = ?', [$noOd]);
        return redirect()->back();
    }

    public function destroy($id)
    {
        //
    }
}
