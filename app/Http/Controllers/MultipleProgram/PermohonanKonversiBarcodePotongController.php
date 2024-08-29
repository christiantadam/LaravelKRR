<?php

namespace App\Http\Controllers\MultipleProgram;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use DB;
use Auth;
use Carbon\Carbon;

class PermohonanKonversiBarcodePotongController extends Controller
{
    public function index()
    {
        //
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
        if ($id == 'JBBPotong') {
            $access = (new HakAksesController)->HakAksesFiturMaster('Jumbo Bag');
            return view('MultipleProgram.PermohonanKonversiPotongBarcode', compact('access', 'id'));
        } else if ($id == 'ABMPotong') {
            $access = (new HakAksesController)->HakAksesFiturMaster('ABM');
            return view('MultipleProgram.PermohonanKonversiPotongBarcode', compact('access', 'id'));
        } else if ($id == 'ADSPotong') {
            $access = (new HakAksesController)->HakAksesFiturMaster('ADStar');
            return view('MultipleProgram.PermohonanKonversiPotongBarcode', compact('access', 'id'));
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
