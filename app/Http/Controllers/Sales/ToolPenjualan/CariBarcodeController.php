<?php

namespace App\Http\Controllers\Sales\ToolPenjualan;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CariBarcodeController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        return view('Sales.ToolPenjualan.CariBarcode');
    }

    public function getIdTypeDispresiasi($kodeBarang)
    {
        $data = db::connection('ConnInventory')->select('select id_type_tujuan, count(noindeks) from dispresiasi where kode_barang = '.$kodeBarang.' group by id_type_tujuan having count(noindeks) > 0');
        return response()->json($data);
    }

    public function getIdTypeTmpGudang($kodeBarang)
    {
        $data = db::connection('ConnInventory')->select('select idtype, count(noindeks) from tmp_gudang where kode_barang = '.$kodeBarang.' and aktif = \'Y\' and typetransaksi = \'09\' group by idtype having count(noindeks) > 0');
        return response()->json($data);
    }
    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    // Store a newly created resource in storage.
    public function store(Request $request)
    {

    }

    //Display the specified resource.
    public function show($id)
    {
        //
    }

    //Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update($id)
    {

    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
