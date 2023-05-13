<?php

namespace App\Http\Controllers\Sales\Penjualan;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AccPenjualanController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $user = Auth::user()->NomorUser;
        $data = db::connection('ConnInventory')->select('exec SP_1273_INV_ListJual_TmpTransaksi @User = ?', [$user]);
        // dd($data);
        return view('Sales.Penjualan.AccPenjualan', compact('data'));
    }

    public function accPenjualanTampilData($idtransaksi)
    {
        $user = Auth::user()->NomorUser;
        $data = db::connection('ConnInventory')->select('exec SP_1273_INV_ListJual_TmpTransaksi @User = ?, @IDTransaksi = ?', [$user, $idtransaksi]);
        return response()->json($data);
    }

    public function accPenjualanTampilBarcode($idtype, $kodebarang)
    {
        $data = db::connection('ConnInventory')->select('exec SP_1273_INV_AMBIL_TMPGUDANG_ACCKELUAR @idtype = ?, @kode_barang = ?', [$idtype, $kodebarang]);
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
    public function destroy($kodebarang, $noindeks)
    {
        dd('masuk destroy');
        db::connection('ConnIventory')->statement('exec SP_1273_INV_Hapus_Barcode_Tmp_Gudang @kode_barang = ?, @item_number = ?', [$kodebarang, $noindeks]);
        return redirect()->back()->with('success', 'Kode Barang ' . $kodebarang . 'dengan Nomor Indeks ' . $noindeks . 'Sudah Dihapus!');
    }
}
