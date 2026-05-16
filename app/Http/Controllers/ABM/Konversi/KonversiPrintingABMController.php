<?php

namespace App\Http\Controllers\ABM\Konversi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use Auth;
use DB;
use Exception;

class KonversiPrintingABMController extends Controller
{
    public function index()
    {
        $nomorUser = trim(Auth::user()->NomorUser);
        $access = (new HakAksesController)->HakAksesFiturMaster('ABM');
        $result = (new HakAksesController)->HakAksesFitur('Konversi Potong Jahit ABM');

        if ($result) {
            return view('ABM.Konversi.KonversiPrintingABM', compact('access', 'nomorUser'));
        } else {
            return redirect()->route('ABM.Home')->with('status', 'Anda Tidak Memiliki Hak Akses Fitur Konversi Potong Jahit ABM!');
        }
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
