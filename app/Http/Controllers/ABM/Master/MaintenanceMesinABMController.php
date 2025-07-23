<?php

namespace App\Http\Controllers\ABM\Master;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use Exception;
use DB;
use Auth;

class MaintenanceMesinABMController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('ABM');
        $lokasi = DB::connection('ConnABM')->select('EXEC SP_4384_ABM_Maintenance_Mesin @XKode = ?', [5]);
        return view('ABM.Master.MaintenanceMesin.MaintenanceMesinABM', compact('access', 'lokasi'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $idMesin = $request->input('idMesin');
        $namaMesin = $request->input('namaMesin');
        $lokasi = $request->input('select_lokasiMesin');
        $speedMesin = $request->input('speedMesin');
        if ($idMesin == null) {
            // Tambah Mesin
            try {
                DB::connection('ConnABM')->statement('EXEC SP_4384_ABM_Maintenance_Mesin
                    @XKode = ?,
                    @XNamaMesin = ?,
                    @XLokasi = ?,
                    @XSpeed = ?',
                    [
                        2,
                        $namaMesin,
                        $lokasi,
                        $speedMesin
                    ]
                );
                return response()->json(['success' => 'Data mesin berhasil ditambahkan.']);
            } catch (Exception $e) {
                return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
            }
        } else {
            // Edit Mesin
            try {
                DB::connection('ConnABM')->statement('EXEC SP_4384_ABM_Maintenance_Mesin
                    @XKode = ?,
                    @XNamaMesin = ?,
                    @XLokasi = ?,
                    @XSpeed = ?,
                    @XIdMesin = ?,
                    @XIdOrder = ?',
                    [
                        3,
                        $namaMesin,
                        $lokasi,
                        $speedMesin,
                        $idMesin,
                        null
                    ]
                );
                return response()->json(['success' => 'Data mesin berhasil diubah.']);
            } catch (Exception $e) {
                return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
            }
        }
    }

    public function show($id, Request $request)
    {
        if ($id == 'getDataMesin') {
            $listMesin = DB::connection('ConnABM')->select('EXEC SP_4384_ABM_Maintenance_Mesin @XKode = ?', [0]);
            return datatables($listMesin)->make(true);
        } else if ($id == 'getDetailMesin') {
            $idMesin = $request->input('idMesin');
            $detailMesin = DB::connection('ConnABM')->select('EXEC SP_4384_ABM_Maintenance_Mesin @XKode = ?, @XIdMesin = ?', [1, $idMesin]);
            return response()->json($detailMesin);
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

    public function destroy($id, Request $request)
    {
        $aktif = $request->input('aktif') ? 1 : 0;
        try {
            DB::connection('ConnABM')->statement('EXEC SP_4384_ABM_Maintenance_Mesin
                @XKode = ?,
                @XAktif = ?,
                @XIdMesin = ?',
                [
                    4,
                    $aktif,
                    $id
                ]
            );
            return response()->json(['success' => 'Status mesin berhasil diubah.']);
        } catch (Exception $e) {
            return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
        }
    }
}
