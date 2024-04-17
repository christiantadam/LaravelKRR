<?php

namespace App\Http\Controllers\WORKSHOP\Workshop\Transaksi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Auth;
use App\Http\Controllers\HakAksesController;

class MaintenanceKodeBarangController extends Controller
{

    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Workshop');
        return view('WORKSHOP.Workshop.Transaksi.MaintenanceNomorGambar', compact('access'));
    }
    public function getbarang($noOd)
    {
        $all = DB::connection('Connworkshop')->select('[SP_5298_WRK_LOAD-DATA-GBR] @kode = ?, @noOd = ?', [1, $noOd]);
        return response()->json($all);
    }
    public function selectnoGambar($noOd, $kode)
    {
        $all = DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_LOAD-NO-GBR]  @noOd = ?, @kode = ?', [$noOd, $kode]);
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
    }


    public function destroy($id)
    {
        //
    }
}
