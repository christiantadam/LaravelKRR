<?php

namespace App\Http\Controllers\ABM\Transaksi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use Yajra\DataTables\Facades\DataTables;
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
        $jenisLog = $request->input('jenisLog');
        $idLog = $request->input('idLog');
        if ($jenisLog == 1) { // PRINTING
            $namaMesinRTR = $request->input('namaMesinRTR');
            $Tgl_LogRTR = $request->input('Tgl_LogRTR');
            $hasilLBRRTR = $request->input('hasilLBRRTR');
            $hasilKgRTR = $request->input('hasilKgRTR');
            $shiftRTR = $request->input('shiftRTR');
            $kodeBarangPrinting = $request->input('kodeBarangPrinting');
            $afalanSettingLembar = $request->input('afalanSettingLembar');
            $user = Auth::user()->NomorUser;
            $alasan = $request->input('alasanEdit');
            $date = date('Y-m-d H:i:s');
            $edited = (string) 'Edited by: ' . $user . ' | On: ' . $date . ' | Reason: ' . $alasan;
            $inputed = (string) 'Inputed by: ' . $user . ' | On: ' . $date;
            if ($jenisStore == 'store') {
                // Tambah Log Mesin Printing
                try {
                    DB::connection('ConnABM')->statement('EXEC SP_4384_ABM_Maintenance_Log_Mesin_ABM
                    @XKode = ?,
                    @XTglLog = ?,
                    @XJenisLog = ?,
                    @XShift = ?,
                    @XIdMesin = ?,
                    @XHasilLembar = ?,
                    @XHasilKg = ?,
                    @XAfalan_Setting_Lembar = ?,
                    @XKodeBarangHasil = ?,
                    @XInputed = ?',
                        [
                            3,
                            $Tgl_LogRTR,
                            $jenisLog,
                            $shiftRTR,
                            $namaMesinRTR,
                            $hasilLBRRTR,
                            $hasilKgRTR,
                            $afalanSettingLembar,
                            $kodeBarangPrinting,
                            $inputed
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
                    @XJenisLog = ?,
                    @XShift = ?,
                    @XIdMesin = ?,
                    @XHasilLembar = ?,
                    @XHasilKg = ?,
                    @XAfalan_Setting_Lembar = ?,
                    @XKodeBarangHasil = ?,
                    @XEdited = ?,
                    @XIdLog = ?',
                        [
                            4,
                            $Tgl_LogRTR,
                            $jenisLog,
                            $shiftRTR,
                            $namaMesinRTR,
                            $hasilLBRRTR,
                            $hasilKgRTR,
                            $afalanSettingLembar,
                            $kodeBarangPrinting,
                            $edited,
                            $idLog
                        ]
                    );
                    return response()->json(['success' => 'Data kegiatan mesin berhasil diupdate.']);
                } catch (Exception $e) {
                    return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
                }
            } else {
                return response()->json(['error' => (string) "Undefined request: " . $jenisStore]);
            }
        } else if ($jenisLog == 2) { // MAINTENANCE

        }
    }

    public function show($id, Request $request)
    {
        if ($id == 'getLogMesin') {
            $listLogMesin = DB::connection('ConnABM')->select('EXEC SP_4384_ABM_Maintenance_Log_Mesin_ABM @XKode = ?', [2]);
            // return datatables($listLogMesin)->make(true);
            // calculate grand totals
            $totalLembar = collect($listLogMesin)->sum('Hasil_Lembar');
            $totalKg = collect($listLogMesin)->sum('Hasil_Kg');

            return DataTables::of($listLogMesin)
                ->with([
                    'totalLembar' => $totalLembar,
                    'totalKg' => $totalKg,
                ])
                ->make(true);
        } else if ($id == 'getMesin') {
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
        $alasan = $request->input('alasanHapus');
        $date = date('Y-m-d H:i:s');
        $deleted = (string) 'Deleted by: ' . $user . ' | On: ' . $date . ' | Reason: ' . $alasan;
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
