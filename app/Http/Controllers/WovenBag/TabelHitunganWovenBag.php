<?php

namespace App\Http\Controllers\WovenBag;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;

class TabelHitunganWovenBag extends Controller
{
    public function index()
    {
        dd('Masuk Index');
    }

    public function create()
    {
        dd('Masuk Create');

    }

    public function store(Request $request)
    {
        dd('Masuk Store');

    }

    public function show($id)
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Woven Bag');
        if ($id == 'Sandwich') {
            return view('WovenBag.TabelHitungan.Sandwich', compact('access'));
        }
        else if ($id == 'TubingOPP') {
            return view('WovenBag.TabelHitungan.TubingOPP', compact('access'));
        }
    }

    public function edit($id)
    {
        dd('Masuk Edit');

    }

    public function update(Request $request, $id)
    {
        dd('Masuk Update');

    }

    public function destroy($id)
    {
        dd('Masuk Destroy');

    }
}
