<?php

namespace App\Http\Controllers\WovenBag;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;
use Auth;
use Exception;

class CopyTableHitunganWovenController extends Controller
{
    public function index()
    {
        $result = (new HakAksesController)->HakAksesFitur('Sandwich');
        $access = (new HakAksesController)->HakAksesFiturMaster('Woven Bag');
        if ($result) {
            return view('WovenBag.TabelHitungan.CopyTabelHitunganWoven', compact('access'));
        } else {
            return redirect()->route('WovenBag.Home')->with('status', 'Anda Tidak Memiliki Hak Akses Fitur Copy Tabel Hitungan Woven!');
        }
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $idProduct = $request->idProduct;
        $idCust = $request->idCust;
        $namaBarang = $request->namaBarang;
        $user = Auth::user()->NomorUser;
        try {
            DB::connection('ConnABM')->statement('exec SP_1273_ABM_COPY_TABEL @ID = ?, @ID_CUST = ?, @NAMA_BRG = ?, @UserInput = ?', [$idProduct, $idCust, $namaBarang, $user]);
            return response()->json(['success' => 'Copy Data Completed']);
        } catch (Exception $ex) {
            return response()->json(['error' => $ex->getMessage()]);
        }
    }

    public function show($id, Request $request)
    {
        if ($id == 'getListCustomer') {
            $jenisProduct = $request->jenisProduct;
            $dataCustomer = DB::connection('ConnABM')->select('exec SP_1273_ABM_LIST_TABEL_HITUNGAN @Kode = ?, @IdJenis = ?', [3, $jenisProduct]);
            return datatables($dataCustomer)->make(true);
        } elseif ($id == 'getListProduct') {
            $idCust = $request->idCust;
            $idJenis = $request->idJenis;
            $dataProduct = DB::connection('ConnABM')->select('exec SP_1273_ABM_LIST_TABEL_HITUNGAN @Kode = ?, @idCust = ?, @idjenis = ?', [1, $idCust, $idJenis]);
            return datatables($dataProduct)->make(true);
        } elseif ($id == 'getListCustomerTujuan') {
            $dataCustomer = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_CUSTOMER @Kode = 2');
            return datatables($dataCustomer)->make(true);
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
