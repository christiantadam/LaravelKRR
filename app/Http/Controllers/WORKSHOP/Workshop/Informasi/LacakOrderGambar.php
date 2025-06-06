<?php

namespace App\Http\Controllers\WORKSHOP\Workshop\Informasi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Auth;
use App\Http\Controllers\HakAksesController;

class LacakOrderGambar extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Workshop');
        $divisi = DB::connection('Connworkshop')->select('exec [SP_5298_WRK_USER-DIVISI] @user = ?', [Auth::user()->NomorUser]);
        return view('WORKSHOP.Workshop.Informasi.OrderGambarSelesai', compact(['divisi'], 'access'));
    }
    public function GetAllDataPengorder($tgl_awal, $tgl_akhir, $divisi)
    {
        $all = DB::connection('Connworkshop')->select('[SP_5298_WRK_LIST-ORDER-GBR] @kode = ?, @tgl1 = ?, @tgl2 = ?, @div = ?', [10, $tgl_awal, $tgl_akhir, $divisi]);
        return response()->json($all);
    }
    public function GetAllDataPenerima($tgl_awal, $tgl_akhir)
    {
        $all = DB::connection('Connworkshop')->select('[SP_5298_WRK_LIST-ORDER-GBR] @kode = ?, @tgl1 = ?, @tgl2 = ?', [11, $tgl_awal, $tgl_akhir]);
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
