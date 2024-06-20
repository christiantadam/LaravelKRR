<?php

namespace App\Http\Controllers\JumboBag;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;

class UbahKodeBarang extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Jumbo Bag');
        return view('JumboBag.UbahKodeBarang', compact('access'));
    }

    public function create(Request $request)
    {
        // Fetch the customer data
        // dd($request->all(), $request->input('kodeCustomer'));
        $listKodebarang = DB::connection('ConnJumboBag')
            ->select('exec SP_1273_JBB_LIST_KDCUST_KDBRG @KodeCustomer = ?', [$request->input('kodeCustomer')]);
        // Convert the data into an array that DataTables can consume
        $dataKodebarang = [];
        foreach ($listKodebarang as $Kd) {
            // dd($Kd);
            $dataKodebarang[] = [
                'tanggal' => $Kd->tanggal,
                'Kode_Barang' => $Kd->kode_barang,
            ];
        }
        return datatables($dataKodebarang)->make(true);
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
