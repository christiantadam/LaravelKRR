<?php

namespace App\Http\Controllers\AdStarController;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;
use Auth;
use Carbon\Carbon;
use Exception;

class CopyTableHitunganAdStarController extends Controller
{
    public function index()
    {
        $result = (new HakAksesController)->HakAksesFitur('Copy Tabel');
        $access = (new HakAksesController)->HakAksesFiturMaster('AD Star');

        if ($result) {
            return view('AdStar.TabelHitungan.CopyTabel', compact('access'));
        } else {
            return redirect()->route('AdStar.Home')->with('status', 'Anda Tidak Memiliki Hak Akses Fitur Copy Tabel Hitungan!');
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
            DB::connection('ConnAdStar')->statement('exec SP_1486_ADSTAR_COPY_TABEL @ID = ?, @ID_CUST = ?, @NAMA_BRG = ?, @UserInput = ?', [$idProduct, $idCust, $namaBarang, $user]);
            return response()->json(['success' => 'Copy Data Completed']);
        } catch (Exception $ex) {
            return response()->json(['error' => $ex->getMessage()]);
        }
    }

    public function show($id, Request $request)
    {
        if ($id == 'getListCustomerCloseTop') {
            $dataCustomer = DB::connection('ConnAdStar')->select('exec SP_1486_ADSTAR_LIST_TABEL_HITUNGAN @Kode = 6');
            return datatables($dataCustomer)->make(true);
        } elseif ($id == 'getListCustomerOpenTop') {
            $dataCustomer = DB::connection('ConnAdStar')->select('exec SP_1486_ADSTAR_LIST_TABEL_HITUNGAN @Kode = 3');
            return datatables($dataCustomer)->make(true);
        } elseif ($id == 'getListProductCloseTop') {
            $idCust = $request->idCust;
            $dataProduct = DB::connection('ConnAdStar')->select('exec SP_1486_ADSTAR_LIST_TABEL_HITUNGAN @Kode = ?, @idCust = ?', [7, $idCust]);
            return datatables($dataProduct)->make(true);
        } elseif ($id == 'getListProductOpenTop') {
            $idCust = $request->idCust;
            $dataProduct = DB::connection('ConnAdStar')->select('exec SP_1486_ADSTAR_LIST_TABEL_HITUNGAN @Kode = ?, @idCust = ?', [1, $idCust]);
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
