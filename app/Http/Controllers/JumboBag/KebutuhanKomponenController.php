<?php

namespace App\Http\Controllers\JumboBag;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use DB;
use Illuminate\Support\Facades\Auth;
use Exception;

class KebutuhanKomponenController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Jumbo Bag');
        $listKodeBarangJBB = DB::connection('ConnJumboBag')->select('EXEC SP_4384_Maintenance_Kebutuhan_Komponen @XKode = ?', [3]);
        return view('JumboBag.KebutuhanKomponen.KebutuhanKomponen', compact('access', 'listKodeBarangJBB'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $jenis = $request->input('jenis');
        if ($jenis == 'tambahKebutuhanKomponen') {
            $kodeBarang = $request->input('kodeBarang');
            $jumlahKebutuhan = $request->input('jumlahKebutuhan');
            $tanggalKebutuhan = $request->input('tanggalKebutuhan');
            $tanggalDeadlineKebutuhan = $request->input('tanggalDeadlineKebutuhan');
            try {
                DB::connection('ConnJumboBag')->statement(
                    'EXEC SP_4384_Maintenance_Kebutuhan_Komponen @XKode = ?, @XKodeBarang = ?, @XJumlahKebutuhan = ?, @XTanggalKebutuhan = ?, @XTanggalDeadlineKebutuhan = ?'
                    ,
                    [
                        4,
                        $kodeBarang,
                        $jumlahKebutuhan,
                        $tanggalKebutuhan,
                        $tanggalDeadlineKebutuhan,
                    ]
                );

                return response()->json(['success' => true]);
            } catch (Exception $e) {
                return response()->json(['error' => 'Failed to insert data: ' . $e->getMessage()], 500);
            }
        } else if ($jenis == 'editKebutuhanKomponen') {
            # code...
        } else if ($jenis == 'hapusKebutuhanKomponen') {
            $idKebutuhanKomponen = $request->input('idKebutuhanKomponen');
            try {
                DB::connection('ConnJumboBag')->statement(
                    'EXEC SP_4384_Maintenance_Kebutuhan_Komponen @XKode = ?, @XIdKebutuhanKomponen = ?'
                    ,
                    [
                        7,
                        $idKebutuhanKomponen
                    ]
                );

                return response()->json(['success' => true]);
            } catch (Exception $e) {
                return response()->json(['error' => 'Failed to insert data: ' . $e->getMessage()], 500);
            }
        } else {
            return response()->json(['error' => 'Invalid request type'], 400);
        }
    }

    public function show($id, Request $request)
    {
        if ($id == 'getDataKebutuhan') {
            try {
                $listKebutuhan = DB::connection('ConnJumboBag')->select('EXEC SP_4384_Maintenance_Kebutuhan_Komponen @XKode = ?', [0]);

                return response()->json($listKebutuhan);
            } catch (Exception $e) {
                return response()->json(['error' => 'Failed to fetch data: ' . $e->getMessage()], 500);
            }
        } else if ($id == 'getDataKebutuhanDetail') {
            try {
                $idKebutuhanKomponen = $request->input('IdKebutuhanKomponen');
                $listDetailKebutuhan = DB::connection('ConnJumboBag')->select('EXEC SP_4384_Maintenance_Kebutuhan_Komponen @XKode = ?, @XIdKebutuhanKomponen = ?', [5, $idKebutuhanKomponen]);

                return response()->json($listDetailKebutuhan);
            } catch (Exception $e) {
                return response()->json(['error' => 'Failed to fetch data: ' . $e->getMessage()], 500);
            }
        } else if ($id == 'getDataCetakKebutuhanDetail') {
            try {
                $TanggalDeadlineKebutuhan = $request->input('TanggalDeadlineKebutuhan');
                $listDetailKebutuhan = DB::connection('ConnJumboBag')->select('EXEC SP_4384_Maintenance_Kebutuhan_Komponen @XKode = ?, @XTanggalDeadlineKebutuhan = ?', [6, $TanggalDeadlineKebutuhan]);

                return response()->json($listDetailKebutuhan);
            } catch (Exception $e) {
                return response()->json(['error' => 'Failed to fetch data: ' . $e->getMessage()], 500);
            }
        } else {
            return response()->json(['error' => 'Invalid ID'], 400);
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
