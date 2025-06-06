<?php

namespace App\Http\Controllers\WORKSHOP\Workshop\Informasi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;
use Auth;

class OrderKerja extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Workshop');
        $divisi = DB::connection('Connworkshop')->select('exec [SP_5298_WRK_USER-DIVISI] @user = ?', [Auth::user()->NomorUser]);
        return view('WORKSHOP.Workshop.Informasi.OrderKerja', compact(['divisi'], 'access'));
    }
    public function GetAllDataPengorder($tgl_awal, $tgl_akhir, $divisi)
    {
        $all = DB::connection('Connworkshop')->select('exec [SP_5298_WRK_LIST-ORDER-KRJ] @kode = ?, @tgl1 = ?, @tgl2 = ?, @div = ?', [14, $tgl_awal, $tgl_akhir, $divisi]);
        return response()->json($all);
    }
    public function GetAllDataPenerima($tgl_awal, $tgl_akhir)
    {
        // dd($tgl_awal, $tgl_akhir);
        $all = DB::connection('Connworkshop')->select('exec [SP_5298_WRK_LIST-ORDER-KRJ] @kode = ?, @tgl1 = ?, @tgl2 = ?', [15, $tgl_awal, $tgl_akhir]);
        // dd($all, $tgl_awal, $tgl_akhir);
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

    public function show($id, Request $request)
    {
        if ($id == 'GetAllDataPenerimaKerja') {
            $tgl_awal = $request->input('tglawal');
            $tgl_akhir = $request->input('tglakhir');
            $div = $request->input('divisi');
            $all = DB::connection('Connworkshop')->select('exec [SP_5298_WRK_LIST-ORDER-KRJ] @kode = ?, @tgl1 = ?, @tgl2 = ?, @div = ?', [15, $tgl_awal, $tgl_akhir, $div]);

            return response()->json($all);
        } else {
            return response()->json(['error' => (string) "Undefined request: " . $id]);
        }
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
