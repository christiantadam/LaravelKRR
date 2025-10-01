<?php

namespace App\Http\Controllers\ABM\Report;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use Yajra\DataTables\Facades\DataTables;
use Exception;
use DB;
use Auth;

class RekapHarianABMController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('ABM');
        return view('ABM.Report.RekapHarian.Index', compact('access'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $jenisStore = $request->input('jenisStore');
        $tanggalRekapan = $request->input('tanggalRekapan');
        $hasilJahitMulut = $request->input('hasilJahitMulut');
        $pasangInner = $request->input('pasangInner');
        $barangRepair = $request->input('barangRepair');
        $hasilPressStarpakKG = $request->input('hasilPressStarpakKG');
        $hasilPressStarpakLBR = $request->input('hasilPressStarpakLBR');
        $hasilPressWovenKG = $request->input('hasilPressWovenKG');
        $hasilPressWovenLBR = $request->input('hasilPressWovenLBR');
        $hasilPressNganjukKG = $request->input('hasilPressNganjukKG');
        $hasilPressNganjukLBR = $request->input('hasilPressNganjukLBR');
        $user = trim(Auth::user()->NomorUser);
        $alasan = $request->input('alasanEdit');
        date_default_timezone_set('Asia/Jakarta');
        $date = date('Y-m-d H:i:s');
        $edited = (string) 'Edited by: ' . $user . ' | On: ' . $date . ' | Reason: ' . $alasan;
        $inputed = (string) 'Inputed by: ' . $user . ' | On: ' . $date;
        if ($jenisStore == 'store') {
            // Tambah Log Mesin Printing
            try {
                DB::connection('ConnABM')->statement('EXEC SP_4384_ABM_Cetak_Rekap_Harian_ABM
                    @XKode = ?,
                    @XTanggalRekapan = ?,
                    @XHasilJahitMulut = ?,
                    @XPasangInner = ?,
                    @XBarangRepair = ?,
                    @XHasilPressStarpak_KG = ?,
                    @XHasilPressStarpak_LBR = ?,
                    @XHasilPressWoven_KG = ?,
                    @XHasilPressWoven_LBR = ?,
                    @XHasilPressNganjuk_KG = ?,
                    @XHasilPressNganjuk_LBR = ?,
                    @XInputed = ?',
                    [
                        1,
                        $tanggalRekapan,
                        $hasilJahitMulut,
                        $pasangInner,
                        $barangRepair,
                        $hasilPressStarpakKG,
                        $hasilPressStarpakLBR,
                        $hasilPressWovenKG,
                        $hasilPressWovenLBR,
                        $hasilPressNganjukKG,
                        $hasilPressNganjukLBR,
                        $inputed
                    ]
                );
                return response()->json(['success' => 'Data mesin berhasil ditambahkan.']);
            } catch (Exception $e) {
                return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
            }
        } else if ($jenisStore == 'update') {
            try {
                DB::connection('ConnABM')->statement('EXEC SP_4384_ABM_Cetak_Rekap_Harian_ABM
                    @XKode = ?,
                    @XTanggalRekapan = ?,
                    @XHasilJahitMulut = ?,
                    @XPasangInner = ?,
                    @XBarangRepair = ?,
                    @XHasilPressStarpak_KG = ?,
                    @XHasilPressStarpak_LBR = ?,
                    @XHasilPressWoven_KG = ?,
                    @XHasilPressWoven_LBR = ?,
                    @XHasilPressNganjuk_KG = ?,
                    @XHasilPressNganjuk_LBR = ?,
                    @XEdited = ?',
                    [
                        2,
                        $tanggalRekapan,
                        $hasilJahitMulut,
                        $pasangInner,
                        $barangRepair,
                        $hasilPressStarpakKG,
                        $hasilPressStarpakLBR,
                        $hasilPressWovenKG,
                        $hasilPressWovenLBR,
                        $hasilPressNganjukKG,
                        $hasilPressNganjukLBR,
                        $edited
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
        if ($id == 'cekRekapHarian') {
            $tanggalRekapan = $request->input('tanggalRekapan');
            $dataRekapHarian = DB::connection('ConnABM')->select('EXEC SP_4384_ABM_Cetak_Rekap_Harian_ABM @XKode = ?, @XTanggalRekapan = ?', [0, $tanggalRekapan]);
            return response()->json($dataRekapHarian, 200);
        } else if ($id == 'printRekapan') {
            $TanggalRekapan = $request->tanggal;
            $dataRekapHarian = DB::connection('ConnABM')
                ->select('EXEC SP_4384_ABM_Cetak_Rekap_Harian_ABM @XKode = ?, @XTanggalRekapan = ?', [0, $TanggalRekapan]);
            $dataLogRTR = DB::connection('ConnABM')
                ->select('EXEC SP_4384_ABM_Cetak_Rekap_Harian_ABM @XKode = ?, @XTanggalRekapan = ?', [3, $TanggalRekapan]);
            $dataLogMPJ = DB::connection('ConnABM')
                ->select('EXEC SP_4384_ABM_Cetak_Rekap_Harian_ABM @XKode = ?, @XTanggalRekapan = ?', [4, $TanggalRekapan]);
            $dataDetailLogMPJ = DB::connection('ConnABM')
                ->select('EXEC SP_4384_ABM_Cetak_Rekap_Harian_ABM @XKode = ?, @XTanggalRekapan = ?', [5, $TanggalRekapan]);
            $dataHasilPrintingBodyStarpak = DB::connection('ConnABM')
                ->select('EXEC SP_4384_ABM_Cetak_Rekap_Harian_ABM @XKode = ?, @XTanggalRekapan = ?', [6, $TanggalRekapan]);
            $dataHasilPrintingPatchStarpak = DB::connection('ConnABM')
                ->select('EXEC SP_4384_ABM_Cetak_Rekap_Harian_ABM @XKode = ?, @XTanggalRekapan = ?', [7, $TanggalRekapan]);
            if (!$dataRekapHarian) {
                abort(404);
            }
            $data = [
                'dataRekapHarian' => $dataRekapHarian,
                'dataLogRTR' => $dataLogRTR,
                'dataLogMPJ' => $dataLogMPJ,
                'dataDetailLogMPJ' => $dataDetailLogMPJ,
                'dataHasilPrintingBodyStarpak' => $dataHasilPrintingBodyStarpak,
                'dataHasilPrintingPatchStarpak' => $dataHasilPrintingPatchStarpak,
            ];
            // dd($data);
            return view('ABM.Report.RekapHarian.CetakRekapHarian', compact('data'));
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
