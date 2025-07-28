<?php

namespace App\Http\Controllers\ABM\Transaksi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use Exception;
use DB;
use Auth;

class OrderKerjaYangAktifPadaMesinABMController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('ABM');
        $listTypeMesin = DB::connection('ConnABM')->select('EXEC SP_4384_Maintenance_Order_Kerja_Aktif_Mesin @XKode = ?', [0]);
        $listOrderKerjaAktif = DB::connection('ConnABM')->select('EXEC SP_4384_Maintenance_Order_Kerja_Aktif_Mesin @XKode = ?', [2]);
        return view('ABM.Transaksi.OrderKerjaYangAktifPadaMesin.OrderKerjaYangAktifPadaMesin', compact('access', 'listTypeMesin', 'listOrderKerjaAktif'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $idMesin = $request->input('idMesin');
        $idOrder = $request->input('idOrder');
        try {
            DB::connection('ConnABM')->statement('EXEC SP_4384_Maintenance_Order_Kerja_Aktif_Mesin @XKode = ?, @XIdMesin = ?, @XIdOrder = ?', [5, $idMesin, $idOrder]);
            return response()->json(['success' => 'Order Kerja berhasil ditambahkan pada mesin.'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
        }
    }

    public function show($id, Request $request)
    {
        if ($id == 'getDataMesinAktif') {
            $listMesinAktif = DB::connection('ConnABM')->select('EXEC SP_4384_Maintenance_Order_Kerja_Aktif_Mesin @XKode = ?', [1]);
            return datatables($listMesinAktif)->make(true);
        } else if ($id == 'getMesinByType') {
            $typeMesin = $request->input('typeMesin');
            $listMesin = DB::connection('ConnABM')->select('EXEC SP_4384_Maintenance_Order_Kerja_Aktif_Mesin @XKode = ?, @XIdTypeMesin = ?', [3, $typeMesin]);
            return response()->json($listMesin, 200);
        } else if ($id == 'getMesinByType') {
            $typeMesin = $request->input('typeMesin');
            $listMesin = DB::connection('ConnABM')->select('EXEC SP_4384_Maintenance_Order_Kerja_Aktif_Mesin @XKode = ?, @XIdTypeMesin = ?', [3, $typeMesin]);
            return response()->json($listMesin, 200);
        } else if ($id == 'getDataOrderKerjaByMesin') {
            $idMesin = $request->input('idMesin');
            $listOrderKerja = DB::connection('ConnABM')->select('EXEC SP_4384_Maintenance_Order_Kerja_Aktif_Mesin @XKode = ?, @XIdMesin = ?', [4, $idMesin]);
            return response()->json($listOrderKerja, 200);
        } else {
            return response()->json(['error' => (string) "Undefined request: " . $id]);
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
