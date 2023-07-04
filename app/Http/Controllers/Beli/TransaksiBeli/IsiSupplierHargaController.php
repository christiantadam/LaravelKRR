<?php

namespace App\Http\Controllers\Beli\TransaksiBeli;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;

class IsiSupplierHargaController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {
        dd("masuk index");
    }

    //Show the form for creating a new resource.
    public function create()
    {
        dd("masuk create");
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        dd("masuk store");
    }

    //Display the specified resource.
    public function show($id)
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        return view('Beli.TransaksiBeli.IsiSupplierHarga', compact('id','access'));
    }

    //Show the form for editing the specified resource.
    public function edit($id)
    {
        dd("masuk edit");
    }

    //Update the specified resource in storage.
    public function update(Request $request, $id)
    {
        dd("masuk update");
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        dd("masuk destroy");
    }
}
