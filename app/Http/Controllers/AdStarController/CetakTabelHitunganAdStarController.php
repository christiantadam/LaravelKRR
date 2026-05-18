<?php

namespace App\Http\Controllers\AdStarController;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;
use Auth;
use Carbon\Carbon;
use Exception;

class CetakTabelHitunganAdStarController extends Controller
{
    public function index()
    {
        $result = (new HakAksesController)->HakAksesFitur('Cetak Tabel Hit. AD Star');
        $access = (new HakAksesController)->HakAksesFiturMaster('AD Star');
        $user = Auth::user()->NomorUser;

        if ($result) {
            return view('AdStar.TabelHitungan.CetakTabelHitunganAdStar.Cetak', compact('user', 'access'));
        } else {
            return redirect()->route('AdStar.Home')->with('status', 'Anda Tidak Memiliki Hak Akses Fitur Cetak Tabel Hitungan AdStar!');
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
            $idJenis = $request->IdJenis;
            $dataCustomer = DB::connection('ConnAdStar')->select('EXEC SP_1486_ADSTAR_LIST_TABEL_HITUNGAN @Kode = ?, @idjenis = ?', [4, $idJenis]);
            return datatables($dataCustomer)->make(true);
        } else if ($id == 'getListUkuran') {
            $idcust = $request->idcust;
            $dataUkuran = DB::connection('ConnAdStar')->select('EXEC SP_1486_ADSTAR_LIST_ORDER @Kode = ?, @idcust = ?', [8, $idcust]);
            return datatables($dataUkuran)->make(true);
        } else if ($id == 'getListProduct') {
            $idJenis = $request->IdJenis;
            $idcust = $request->idcust;
            $ukuran = $request->ukuran;
            $frontPrinting = $request->frontPrinting;
            if ($ukuran) {
                $dataProduct = DB::connection('ConnAdStar')->select('EXEC SP_1486_ADSTAR_LIST_TABEL_HITUNGAN @Kode = ?, @Ukuran = ?, @Front = ?, @IdCust = ?, @idjenis = ?', [9, $ukuran, $frontPrinting, $idcust, $idJenis]);
            } else {
                $dataProduct = DB::connection('ConnAdStar')->select('EXEC SP_1486_ADSTAR_LIST_TABEL_HITUNGAN @Kode = ?, @IdCust = ?, @idjenis = ?', [5, $idcust, $idJenis]);
            }
            $dataProduct = collect($dataProduct)->map(function ($item) {
                $item->tanggal = \Carbon\Carbon::createFromFormat('m/d/Y', $item->tanggal)->format('Y-m-d');
                return $item;
            });
            return datatables($dataProduct)->make(true);
        } else if ($id == 'cekModel') {
            $productId = $request->productId;
            $model = DB::connection('ConnAdStar')->select('EXEC SP_1486_ADSTAR_LIST_TABEL_HITUNGAN @Kode = ?, @id = ?', [8, $productId]);

            return response()->json($model);
        } else if ($id == 'printCloseTop') {
            $productId = $request->productId;
            $dataCetak = DB::connection('ConnAdStar')->select('SELECT * FROM VW_PRG_1486_ADSTAR_CETAK_TABEL_HITUNGAN WHERE id = ?', [$productId]);
            return view('AdStar.TabelHitungan.CetakTabelHitunganAdStar.HasilCetakCloseTop', compact('dataCetak'));
        } else if ($id == 'printOpenTop') {
            $productId = $request->productId;
            $dataCetak = DB::connection('ConnAdStar')->select('SELECT * FROM VW_PRG_1486_ADSTAR_CETAK_TABEL_HITUNGAN WHERE id = ?', [$productId]);
            return view('AdStar.TabelHitungan.CetakTabelHitunganAdStar.HasilCetakOpenTop', compact('dataCetak'));
        } else if ($id == 'printOpenTopTBI') {
            $productId = $request->productId;
            $dataCetak = DB::connection('ConnAdStar')->select('SELECT * FROM VW_PRG_1486_ADSTAR_CETAK_TABEL_HITUNGAN WHERE id = ?', [$productId]);
            return view('AdStar.TabelHitungan.CetakTabelHitunganAdStar.HasilCetakOpenTopTBI', compact('dataCetak'));
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
