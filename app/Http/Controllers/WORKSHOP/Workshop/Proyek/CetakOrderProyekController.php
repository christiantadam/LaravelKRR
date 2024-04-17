<?php

namespace App\Http\Controllers\WORKSHOP\Workshop\Proyek;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;

class CetakOrderProyekController extends Controller
{

    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Workshop');
        return view('WORKSHOP.Workshop.Proyek.CetakSuratOrderProyek', compact('access'));
    }
    public function GetAllData($tgl_awal, $tgl_akhir)
    {
        $all = DB::connection('Connworkshop')->select('[SP_5298_WRK_LIST-ORDER-PRY] @kode = ?, @tgl1 = ?, @tgl2 = ?', [12, $tgl_awal, $tgl_akhir]);
        return response()->json($all);
    }
    public function getdataprint($idorder)
    {
        $data = DB::connection('Connworkshop')->table('VW_PRG_5298_WRK_CETAK-ORDER-PRY')
            ->where('Id_Order', $idorder)
            ->get();
        return response()->json($data);
    }
    public function updatedatacetak(Request $request)
    {
        // dd($request->all());
        $noOd = $request->noOd;
        DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_TGL-CETAK-ORDER_PRY] @noOd = ?', [$noOd]);
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
        //
    }


    public function destroy($id)
    {
        //
    }
}
