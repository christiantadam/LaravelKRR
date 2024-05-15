<?php

namespace App\Http\Controllers\JumboBag;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;

class TabelHitunganJumboBag extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Jumbo Bag');
        return view('JumboBag.TabelHitungan', compact('access'));

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
        dd('Masuk Show');

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
