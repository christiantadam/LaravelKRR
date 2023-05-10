<?php

namespace App\Http\Controllers\Sales\Penjualan;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ScanBarcodeController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        // dd(date('Y-m-d'));
        $date = '2023-04-19'; //date('Y-m-d');
        $jumlah = db::connection('ConnInventory')->select('exec SP_1273_INV_jumlah_tmpgudang @Tanggal = ?', [$date]);
        // dd($jumlah);
        $data_kodeBarang = db::connection('ConnInventory')->select('exec SP_1273_INV_REKAP_YANG_DITEMBAK_DENI @Tanggal = ?', [$date]);
        // dd($data_kodeBarang);
        return view('Sales.Penjualan.ScanBarcode', compact('jumlah', 'data_kodeBarang'));
    }

    public function getInputBarcode($kodeBarang, $nomorindeks)
    {

    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    // Store a newly created resource in storage.
    public function store(Request $request)
    {
        $indeks = $request->nomor_indeks;
        $kodeBarang = $request->kode_barang;
        $data = db::connection('ConnInventory')->select('exec SP_1273_INV_cek_tmpgudang @indeks = ?, @kdbrg = ?', [$indeks, $kodeBarang]);
        $status = db::connection('ConnInventory')->select('SP_1273_INV_cek_status_tmpgudang @indeks = ?, @kdbrg = ?', [$indeks, $kodeBarang]);
        if ($status[0]->Status == null) {
            $status = "3";
        }
        if (empty($data)) {
            if ($status != "3") {
                return redirect()->back()->with('error', 'Barang Belum Diterima Gudang!');
            }
            db::connection('ConnInventory')->statement('exec SP_1273_INV_insert_tmpgudang @indeks = ?, @kdbrg = ?', [$indeks, $kodeBarang]);
            return redirect()->back()->with('success', 'Barcode Berhasil Diproses!');
        } else {
            return redirect()->back()->with('success', 'Barang Sudah Masuk!');
        }
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
