<?php

namespace App\Http\Controllers\ABM\Transaksi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use Exception;
use DB;
use Auth;

class KegiatanMesinPerHariABMController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('ABM');
        $listTypeMesin = DB::connection('ConnABM')->select('EXEC SP_4384_Maintenance_Order_Kerja_Aktif_Mesin @XKode = ?', [0]);
        $listStatusLog = DB::connection('ConnABM')->select('EXEC SP_4384_ABM_Maintenance_Log_Mesin_ABM @XKode = ?', [0]);
        return view('ABM.Transaksi.KegiatanMesinPerHari.MaintenanceKegiatanMesin', compact('access', 'listTypeMesin', 'listStatusLog'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $jenisStore = $request->input('jenisStore');
        $namaMesin = $request->input('namaMesin');
        $Tgl_Log = $request->input('Tgl_Log');
        $kecepatan = $request->input('kecepatan');
        $hasil = $request->input('hasil');
        $statusLog = $request->input('statusLog');
        $shift = $request->input('shift');
        $jamKerjaAwal = $request->input('jamKerjaAwal');
        $jamKerjaAkhir = $request->input('jamKerjaAkhir');
        $idLog = $request->input('idLog');
        if ($jenisStore == 'store') {
            // Tambah Log Mesin
            try {
                DB::connection('ConnABM')->statement('EXEC SP_4384_ABM_Maintenance_Log_Mesin_ABM
                    @XKode = ?,
                    @XTglLog = ?,
                    @XStatusLog = ?,
                    @XShift = ?,
                    @XIdMesin = ?,
                    @XAwalJam = ?,
                    @XAkhirJam = ?,
                    @XKecepatan = ?,
                    @XHasil = ?',
                    [
                        3,
                        $Tgl_Log,
                        $statusLog,
                        $shift,
                        $namaMesin,
                        $jamKerjaAwal,
                        $jamKerjaAkhir,
                        $kecepatan,
                        $hasil
                    ]
                );
                return response()->json(['success' => 'Data mesin berhasil ditambahkan.']);
            } catch (Exception $e) {
                return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
            }
        } else if ($jenisStore == 'update') {
            try {
                DB::connection('ConnABM')->statement('EXEC SP_4384_ABM_Maintenance_Log_Mesin_ABM
                    @XKode = ?,
                    @XTglLog = ?,
                    @XStatusLog = ?,
                    @XShift = ?,
                    @XIdMesin = ?,
                    @XAwalJam = ?,
                    @XAkhirJam = ?,
                    @XKecepatan = ?,
                    @XHasil = ?,
                    @XIdLog = ?',
                    [
                        4,
                        $Tgl_Log,
                        $statusLog,
                        $shift,
                        $namaMesin,
                        $jamKerjaAwal,
                        $jamKerjaAkhir,
                        $kecepatan,
                        $hasil,
                        $idLog
                    ]
                );
                return response()->json(['success' => 'Data mesin berhasil ditambahkan.']);
            } catch (Exception $e) {
                return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
            }
        } else {
            return response()->json(['error' => (string) "Undefined request: " . $jenisStore]);
        }
    }

    public function show($id, Request $request)
    {
        if ($id == 'getLogMesin') {
            $listLogMesin = DB::connection('ConnABM')->select('EXEC SP_4384_ABM_Maintenance_Log_Mesin_ABM @XKode = ?', [2]);
            return datatables($listLogMesin)->make(true);
        } else if ($id == 'getMesinByType') {
            $idTypeMesin = $request->input('idTypeMesin');
            $dataMesin = DB::connection('ConnABM')->select('EXEC SP_4384_Maintenance_Order_Kerja_Aktif_Mesin @XKode = ?, @XIdTypeMesin = ?', [3, $idTypeMesin]);
            return response()->json($dataMesin, 200);
        } else if ($id == 'getOrderByMesin') {
            $idMesin = $request->input('idMesin');
            $dataMesin = DB::connection('ConnABM')->select('EXEC SP_4384_Maintenance_Order_Kerja_Aktif_Mesin @XKode = ?, @XIdMesin = ?', [4, $idMesin]);
            return response()->json($dataMesin, 200);
        } else if ($id == 'getLogMesinByIdLog') {
            $idLog = $request->input('idLog');
            $dataLog = DB::connection('ConnABM')->select('EXEC SP_4384_ABM_Maintenance_Log_Mesin_ABM @XKode = ?, @XIdLog = ?', [1, $idLog]);
            $idTypeMesin = $dataLog[0]->TypeMesin ?? null;
            $dataMesin = DB::connection('ConnABM')->select('EXEC SP_4384_Maintenance_Order_Kerja_Aktif_Mesin @XKode = ?, @XIdTypeMesin = ?', [3, $idTypeMesin]);
            $data = [
                'log' => $dataLog,
                'mesin' => $dataMesin,
            ];
            return response()->json($data, 200);
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
        $user = Auth::user()->NomorUser;
        $date = date('Y-m-d H:i:s');
        $deleted = (string) 'Deleted by: ' . $user . ' | On: ' . $date;
        try {
            DB::connection('ConnABM')->statement('EXEC SP_4384_ABM_Maintenance_Log_Mesin_ABM
                @XKode = ?,
                @XDeleted = ?,
                @XIdLog = ?',
                [
                    5,
                    $deleted,
                    $id
                ]
            );
            return response()->json(['success' => 'Id Log ' . $id . ' berhasil dihapus.']);
        } catch (Exception $e) {
            return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
        }
    }
}
