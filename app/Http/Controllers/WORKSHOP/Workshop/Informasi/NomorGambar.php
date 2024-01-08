<?php

namespace App\Http\Controllers\WORKSHOP\Workshop\Informasi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class NomorGambar extends Controller
{
    public function index()
    {
        //
        return view('WORKSHOP.Workshop.Informasi.NomorGambar');

    }
    public function getdata($kdbarang) {
        $all = DB::connection('ConnPurchase')->select('[SP_5298_WRK_LOAD-BARANG] @kdBarang = ?', [$kdbarang]);
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
