<?php

namespace App\Http\Controllers\ABM\Transaksi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use Yajra\DataTables\Facades\DataTables;
use Exception;
use DB;
use Auth;

class KegiatanMesinMPJPerHariABMController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('ABM');
        $listTypeMesin = DB::connection('ConnABM')->select('EXEC SP_4384_Maintenance_Order_Kerja_Aktif_Mesin @XKode = ?', [0]);
        $listStatusLog = DB::connection('ConnABM')->select('EXEC SP_4384_ABM_Maintenance_Log_MesinRTR_ABM @XKode = ?', [0]);
        return view('ABM.Transaksi.KegiatanMesinMPJPerHari.MaintenanceKegiatanMesinMPJ', compact('access', 'listTypeMesin', 'listStatusLog'));
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
        $namaMesinMPJ = $request->input('namaMesinMPJ');
        $kodeBarangHasilTanpaOK = $request->input('kodeBarangHasilTanpaOK');
        $Tgl_LogMPJ = $request->input('Tgl_LogMPJ');
        $shiftMPJ = $request->input('shiftMPJ');
        $stdWaktu = $request->input('stdWaktu');
        $bahanBakuKgMPJ = $request->input('bahanBakuKgMPJ');
        $hasilLBRMPJ = $request->input('hasilLBRMPJ');
        $afalanWAKG = $request->input('afalanWAKG');
        $afalanWALBR = $request->input('afalanWALBR');
        $afalanWEKG = $request->input('afalanWEKG');
        $afalanWELBR = $request->input('afalanWELBR');
        $afalanPotongKG = $request->input('afalanPotongKG');
        $afalanPotongLBR = $request->input('afalanPotongLBR');
        $afalanCutterKG = $request->input('afalanCutterKG');
        $afalanCutterLBR = $request->input('afalanCutterLBR');
        $ukuranKain = $request->input('ukuranKain');
        $rajutanKain = $request->input('rajutanKain');
        $denierKain = $request->input('denierKain');
        $totalAfalan = $request->input('totalAfalan');
        $hasilKotor = $request->input('hasilKotor');
        $jamKerja = $request->input('jamKerja');
        $jamIstirahat = $request->input('jamIstirahat');
        $jamGangguanMesin = $request->input('jamGangguanMesin');
        $jamGangguanLain = $request->input('jamGangguanLain');
        $user = trim(Auth::user()->NomorUser);
        $alasan = $request->input('alasanEdit');
        date_default_timezone_set('Asia/Jakarta');
        $date = date('Y-m-d H:i:s');
        $edited = (string) 'Edited by: ' . $user . ' | On: ' . $date . ' | Reason: ' . $alasan;
        $inputed = (string) 'Inputed by: ' . $user . ' | On: ' . $date;
        if ($jenisStore == 'store') {
            // Tambah Log Mesin Printing
            try {
                DB::connection('ConnABM')->statement('EXEC SP_4384_ABM_Maintenance_Log_MesinMPJ_ABM
                    @XKode = ?,
                    @XTgl_Log = ?,
                    @XJenis_Log = ?,
                    @XShift = ?,
                    @XId_Mesin = ?,
                    @XKodeBarangHasil = ?,
                    @XHasil_Lembar = ?,
                    @XBahanBaku_Kg = ?,
                    @XAfalanWA_KG = ?,
                    @XAfalanWA_LBR = ?,
                    @XAfalanWE_KG = ?,
                    @XAfalanWE_LBR = ?,
                    @XAfalanPotong_KG = ?,
                    @XAfalanPotong_LBR = ?,
                    @XAfalanCutter_KG = ?,
                    @XAfalanCutter_LBR = ?,
                    @XUkuran = ?,
                    @XRajutan = ?,
                    @XDenier = ?,
                    @XTotal_Afalan = ?,
                    @XHasil_Kotor = ?,
                    @XJam_Kerja = ?,
                    @XJam_Istirahat = ?,
                    @XJam_Gangguan_Mesin = ?,
                    @XJam_Gangguan_Lain = ?,
                    @XStandard_Waktu = ?,
                    @XInputed = ?',
                    [
                        3,
                        $Tgl_LogMPJ,
                        $jenisLog,
                        $shiftMPJ,
                        $namaMesinMPJ,
                        $kodeBarangHasilTanpaOK,
                        $hasilLBRMPJ,
                        $bahanBakuKgMPJ,
                        $afalanWAKG,
                        $afalanWALBR,
                        $afalanWEKG,
                        $afalanWELBR,
                        $afalanPotongKG,
                        $afalanPotongLBR,
                        $afalanCutterKG,
                        $afalanCutterLBR,
                        $ukuranKain,
                        $rajutanKain,
                        $denierKain,
                        $totalAfalan,
                        $hasilKotor,
                        $jamKerja,
                        $jamIstirahat,
                        $jamGangguanMesin,
                        $jamGangguanLain,
                        $stdWaktu,
                        $inputed
                    ]
                );
                return response()->json(['success' => 'Data mesin berhasil ditambahkan.']);
            } catch (Exception $e) {
                return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
            }
        } else if ($jenisStore == 'update') {
            try {
                DB::connection('ConnABM')->statement('EXEC SP_4384_ABM_Maintenance_Log_MesinMPJ_ABM
                    @XKode = ?,
                    @XTgl_Log = ?,
                    @XJenis_Log = ?,
                    @XShift = ?,
                    @XId_Mesin = ?,
                    @XKodeBarangHasil = ?,
                    @XHasil_Lembar = ?,
                    @XBahanBaku_Kg = ?,
                    @XAfalanWA_KG = ?,
                    @XAfalanWA_LBR = ?,
                    @XAfalanWE_KG = ?,
                    @XAfalanWE_LBR = ?,
                    @XAfalanPotong_KG = ?,
                    @XAfalanPotong_LBR = ?,
                    @XAfalanCutter_KG = ?,
                    @XAfalanCutter_LBR = ?,
                    @XUkuran = ?,
                    @XRajutan = ?,
                    @XDenier = ?,
                    @XTotal_Afalan = ?,
                    @XHasil_Kotor = ?,
                    @XJam_Kerja = ?,
                    @XJam_Istirahat = ?,
                    @XJam_Gangguan_Mesin = ?,
                    @XJam_Gangguan_Lain = ?,
                    @XStandard_Waktu = ?,
                    @XEdited = ?,
                    @XId_Log = ?',
                    [
                        4,
                        $Tgl_LogMPJ,
                        $jenisLog,
                        $shiftMPJ,
                        $namaMesinMPJ,
                        $kodeBarangHasilTanpaOK,
                        $hasilLBRMPJ,
                        $bahanBakuKgMPJ,
                        $afalanWAKG,
                        $afalanWALBR,
                        $afalanWEKG,
                        $afalanWELBR,
                        $afalanPotongKG,
                        $afalanPotongLBR,
                        $afalanCutterKG,
                        $afalanCutterLBR,
                        $ukuranKain,
                        $rajutanKain,
                        $denierKain,
                        $totalAfalan,
                        $hasilKotor,
                        $jamKerja,
                        $jamIstirahat,
                        $jamGangguanMesin,
                        $jamGangguanLain,
                        $stdWaktu,
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
    }

    public function show($id, Request $request)
    {
        if ($id == 'getLogMesin') {
            $listLogMesin = DB::connection('ConnABM')->select('EXEC SP_4384_ABM_Maintenance_Log_MesinMPJ_ABM @XKode = ?', [2]);
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
        } else if ($id == 'getOrderByMesin') {
            $idMesin = $request->input('idMesin');
            $Tgl_LogMPJ = $request->input('Tgl_LogMPJ');
            $dataMesin = DB::connection('ConnABM')->select('EXEC SP_4384_Maintenance_Order_Kerja_Aktif_Mesin @XKode = ?, @XIdMesin = ?', [4, $idMesin]);
            $dataLog = DB::connection('ConnABM')->select('EXEC SP_4384_ABM_Maintenance_Log_MesinMPJ_ABM @XKode = ?, @XId_Mesin = ?, @XTgl_Log = ?', [1, $idMesin, $Tgl_LogMPJ]);
            $data = [
                'log' => $dataLog,
                'mesin' => $dataMesin
            ];
            return response()->json($data, 200);
        } else if ($id == 'getMesin') {
            $idTypeMesin = $request->input('idTypeMesin');
            $dataMesin = DB::connection('ConnABM')->select('EXEC SP_4384_Maintenance_Order_Kerja_Aktif_Mesin @XKode = ?, @XIdTypeMesin = ?', [3, $idTypeMesin]);
            return response()->json($dataMesin, 200);
        } else if ($id == 'getLogMesinByIdLog') {
            $idLog = $request->input('idLog');
            $dataLog = DB::connection('ConnABM')->select('EXEC SP_4384_ABM_Maintenance_Log_MesinMPJ_ABM @XKode = ?, @XId_Log = ?', [6, $idLog]);
            $idTypeMesin = $dataLog[0]->TypeMesin ?? null;
            $dataMesin = DB::connection('ConnABM')->select('EXEC SP_4384_Maintenance_Order_Kerja_Aktif_Mesin @XKode = ?, @XIdTypeMesin = ?', [3, $idTypeMesin]);
            $data = [
                'log' => $dataLog,
                'mesin' => $dataMesin,
            ];
            return response()->json($data, 200);
        } else if ($id == 'getKodeBarangHasilTanpaOK') {
            $kodeBarangHasilTanpaOK = $request->input('kodeBarangHasilTanpaOK');
            $dataBarang = DB::connection('ConnABM')->select('EXEC SP_4384_ABM_Maintenance_Log_MesinMPJ_ABM @XKode = ?, @XKodeBarangHasil = ?', [7, $kodeBarangHasilTanpaOK]);
            return response()->json($dataBarang, 200);
        } else if ($id == 'getDataLogMesinTanpaOK') {
            $idMesin = $request->input('idMesin');
            $kodeBarangHasilTanpaOK = $request->input('kodeBarangHasilTanpaOK');
            $Tgl_LogMPJ = $request->input('Tgl_LogMPJ');
            $dataLog = DB::connection('ConnABM')->select('EXEC SP_4384_ABM_Maintenance_Log_MesinMPJ_ABM @XKode = ?, @XId_Mesin = ?, @XTgl_Log = ?, @XKodeBarangHasil = ?', [8, $idMesin, $Tgl_LogMPJ, $kodeBarangHasilTanpaOK]);
            return response()->json($dataLog, 200);
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
        $user = trim(Auth::user()->NomorUser);
        $alasan = $request->input('alasanDelete');
        date_default_timezone_set('Asia/Jakarta');
        $date = date('Y-m-d H:i:s');
        $deleted = (string) 'Deleted by: ' . $user . ' | On: ' . $date . ' | Reason: ' . $alasan;
        try {
            DB::connection('ConnABM')->statement('EXEC SP_4384_ABM_Maintenance_Log_MesinMPJ_ABM
                    @XKode = ?,
                    @XDeleted = ?,
                    @XId_Log = ?',
                [
                    5,
                    $deleted,
                    $id
                ]
            );
            return response()->json(['success' => 'Data kegiatan mesin berhasil diupdate.']);
        } catch (Exception $e) {
            return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
        }
    }
}
