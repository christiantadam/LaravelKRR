<?php

namespace App\Http\Controllers\WovenBag;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;
use Auth;
use Exception;

class CetakTabelHitunganWovenBagController extends Controller
{
    public function index()
    {
        $result = (new HakAksesController)->HakAksesFitur('Cetak Table Hit. Woven');
        $access = (new HakAksesController)->HakAksesFiturMaster('Woven Bag');
        if ($result) {
            return view('WovenBag.CetakTabelHitungan.CetakTHWoven', compact('access'));
        } else {
            return redirect()->route('WovenBag.Home')->with('status', 'Anda Tidak Memiliki Hak Akses Fitur Tabel Hitungan Tubing OPP!');
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

    public function show($id, Request $request)
    {
        if ($id == 'getListCustomer') {
            $jenisProduct = $request->jenisProduct;
            $dataCustomer = DB::connection('ConnABM')->select('exec SP_1273_ABM_LIST_TABEL_HITUNGAN @Kode = ?, @IdJenis = ?', [3, $jenisProduct]);
            return datatables($dataCustomer)->make(true);
        } elseif ($id == 'getListUkuran') {
            $idCust = $request->idCust;
            $idJenis = $request->idJenis;
            if ($idJenis == 1) {
                $kode = 6;
            } else {
                $kode = 10;
            }
            $dataUkuran = DB::connection('ConnABM')->select('exec SP_1273_ABM_LIST_TABEL_HITUNGAN @Kode = ?, @idCust = ?, @idjenis = ?', [$kode, $idCust, $idJenis]);
            return datatables($dataUkuran)->make(true);
        } elseif ($id == 'getListProduct') {
            $idCust = $request->idCust;
            $idJenis = $request->idJenis;
            $dataProduct = DB::connection('ConnABM')->select('exec SP_1273_ABM_LIST_TABEL_HITUNGAN @Kode = ?, @idCust = ?, @idjenis = ?', [1, $idCust, $idJenis]);
            return datatables($dataProduct)->make(true);
        }
        if ($id == 'cetak') {
            $productId = $request->productId;
            $productName = $request->productName;
            $jenisProduct = explode('-', $productName)[0];
            $dataCetak = DB::connection('ConnABM')->select('SELECT * FROM VW_ABM_1001_CETAK_TABEL_HITUNGAN WHERE Id = ?', [$productId]);
            if ($jenisProduct == 'SW') {
                return view('WovenBag.CetakTabelHitungan.HasilCetakSandwich', compact('dataCetak'));
            } elseif ($jenisProduct == 'TB') {
                return view('WovenBag.CetakTabelHitungan.HasilCetakTubing', compact('dataCetak'));
            } elseif ($jenisProduct == 'TBO') {
                return view('WovenBag.CetakTabelHitungan.HasilCetakTubingOPP', compact('dataCetak'));
            }
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
