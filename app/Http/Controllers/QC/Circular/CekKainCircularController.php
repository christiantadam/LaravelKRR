<?php

namespace App\Http\Controllers\QC\Circular;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Log;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class CekKainCircularController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('QC');
        $listTypeMesin = DB::connection('ConnCircular')
            ->select('EXEC Sp_List_TypeMesin @Kode = ?', [1]);

        $listTypeMesin = collect($listTypeMesin)
            ->whereIn('IdType_Mesin', [13, 17])
            ->values();
        return view('QC.Circular.CekKainCircular', compact('access', 'listTypeMesin'));
    }

    public function getMesinSelect($idTypeMesin)
    {
        // dd($idTypeMesin);
        $mesin = DB::connection('ConnCircular')->select('EXEC SP_LIST_MESIN @Kode = ?, @IdType_Mesin = ?', ['11', $idTypeMesin]);
        // dd($mesin);
        return response()->json($mesin);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $proses = $request->input('proses'); // 1 = insert, 2 = update, 3 = delete
        $tanggal = $request->input('tanggal');
        $shift = $request->input('shift');
        $jam_kerja_awal = $request->input('jam_kerja_awal');
        $jam_kerja_akhir = $request->input('jam_kerja_akhir');
        $user_input = trim(Auth::user()->NomorUser);
        $idType_mesin = $request->input('idType_mesin');
        $idNama_mesin = $request->input('idNama_mesin');
        $lbr_st = $request->input('lbr_st');
        $rajutan_wa = $request->input('rajutan_wa');
        $rajutan_we = $request->input('rajutan_we');
        $denier = $request->input('denier');
        $jml_bng_wa_st = $request->input('jml_bng_wa_st');
        $jml_bng_wa_pm = $request->input('jml_bng_wa_pm');
        $wrn = $request->input('wrn');
        $lbr = $request->input('lbr');
        $lpt = $request->input('lpt');
        $gbs = $request->input('gbs');
        $wndr_gld = $request->input('wndr_gld');
        $bulu = $request->input('bulu');
        $jam_bulu = $request->input('jam_bulu');
        $tanda = $request->input('tanda');
        $ping_bergerigi = $request->input('ping_bergerigi');
        $sensor_wa = $request->input('sensor_wa');
        $sensor_we = $request->input('sensor_we');
        $stang_arm = $request->input('stang_arm');
        $keterangan = $request->input('keterangan');
        $idDetail = $request->input('idDetail');
        try {

            switch ($proses) {
                case 1:
                    // Simpan
                    DB::connection('ConnTestQC')
                        ->statement(
                            'EXEC SP_4451_CekKainCL 
                        @Kode = ?,
                        @tanggal = ?,
                        @shift = ?,
                        @jam_kerja_awal = ?,
                        @jam_kerja_akhir = ?,
                        @user_input = ?,
                        @idType_mesin = ?,
                        @idNama_mesin = ?,
                        @lbr_st = ?,
                        @rajutan_wa = ?,
                        @rajutan_we = ?,
                        @denier = ?,
                        @jml_bng_wa_st = ?,
                        @jml_bng_wa_pm = ?,
                        @wrn = ?,
                        @lbr = ?,
                        @lpt = ?,
                        @gbs = ?,
                        @wndr_gld = ?,
                        @bulu = ?,
                        @jam_bulu = ?,
                        @tanda = ?,
                        @ping_bergerigi = ?,
                        @sensor_wa = ?,
                        @sensor_we = ?,
                        @stang_arm = ?,
                        @keterangan = ?',
                            [
                                1,
                                $tanggal,
                                $shift,
                                $jam_kerja_awal,
                                $jam_kerja_akhir,
                                $user_input,
                                $idType_mesin,
                                $idNama_mesin,
                                $lbr_st,
                                $rajutan_wa,
                                $rajutan_we,
                                $denier,
                                $jml_bng_wa_st,
                                $jml_bng_wa_pm,
                                $wrn,
                                $lbr,
                                $lpt,
                                $gbs,
                                $wndr_gld,
                                $bulu,
                                $jam_bulu,
                                $tanda,
                                $ping_bergerigi,
                                $sensor_wa,
                                $sensor_we,
                                $stang_arm,
                                $keterangan,
                            ]
                        );
                    return response()->json(['message' => 'Data berhasil disimpan!']);

                case 2:
                    // Update
                    DB::connection('ConnTestQC')
                        ->statement(
                            'EXEC SP_4451_CekKainCL 
                        @Kode = ?,
                        @jam_kerja_awal = ?,
                        @jam_kerja_akhir = ?,
                        @user_input = ?,
                        @idType_mesin = ?,
                        @idNama_mesin = ?,
                        @lbr_st = ?,
                        @rajutan_wa = ?,
                        @rajutan_we = ?,
                        @denier = ?,
                        @jml_bng_wa_st = ?,
                        @jml_bng_wa_pm = ?,
                        @wrn = ?,
                        @lbr = ?,
                        @lpt = ?,
                        @gbs = ?,
                        @wndr_gld = ?,
                        @bulu = ?,
                        @jam_bulu = ?,
                        @tanda = ?,
                        @ping_bergerigi = ?,
                        @sensor_wa = ?,
                        @sensor_we = ?,
                        @stang_arm = ?,
                        @keterangan = ?,
                        @idDetail = ?',
                            [
                                2,
                                $jam_kerja_awal,
                                $jam_kerja_akhir,
                                $user_input,
                                $idType_mesin,
                                $idNama_mesin,
                                $lbr_st,
                                $rajutan_wa,
                                $rajutan_we,
                                $denier,
                                $jml_bng_wa_st,
                                $jml_bng_wa_pm,
                                $wrn,
                                $lbr,
                                $lpt,
                                $gbs,
                                $wndr_gld,
                                $bulu,
                                $jam_bulu,
                                $tanda,
                                $ping_bergerigi,
                                $sensor_wa,
                                $sensor_we,
                                $stang_arm,
                                $keterangan,
                                $idDetail,
                            ]
                        );
                    return response()->json(['message' => 'Data berhasil dikoreksi!']);

                case 3:
                    // Delete
                    DB::connection('ConnTestQC')
                        ->statement(
                            'EXEC SP_4451_CekKainCL @Kode = ?, @user_input = ?, @idDetail = ?',
                            [3, $user_input, $idDetail]
                        );
                    return response()->json(['message' => 'Data berhasil dihapus!']);

                default:
                    return response()->json(['error', 'Proses tidak valid']);
            }

        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ]);
        }
    }

    public function show(Request $request, $id)
    {
        if ($id == 'getDataDetail') {
            $tgl_awal = $request->input('tgl_awal');
            $tgl_akhir = $request->input('tgl_akhir');
            $results = DB::connection('ConnTestQC')
                ->select('EXEC SP_4451_CekKainCL @Kode = ?, @tgl_awal = ?, @tgl_akhir = ?', [4, $tgl_awal, $tgl_akhir]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'tanggal' => Carbon::parse($row->tanggal)->format('m/d/Y'),
                    'tanggal_raw' => Carbon::parse($row->tanggal)->format('Y-m-d'),
                    'idDetail' => trim($row->idDetail),
                    'shift' => trim($row->shift),
                    'Nama_mesin' => trim($row->Nama_mesin),
                    'lbr_st' => trim($row->lbr_st),
                    'rajutan_wa' => trim($row->rajutan_wa),
                    'rajutan_we' => trim($row->rajutan_we),
                    'denier' => trim($row->denier),
                    'wrn' => trim($row->wrn),
                    'user_input' => trim($row->user_input),

                ];
            }
            // dd($response);
            return datatables($response)->make(true);
        } else if ($id == 'getDataKoreksi') {
            $idDetail = $request->input('idDetail');
            $results = DB::connection('ConnTestQC')
                ->select('EXEC SP_4451_CekKainCL @Kode = ?, @idDetail = ?', [5, $idDetail]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'idDetail' => trim($row->idDetail),
                    'tanggal' => Carbon::parse($row->tanggal)->format('Y-m-d'),
                    'shift' => trim($row->shift),
                    'jam_kerja_awal' => trim($row->jam_kerja_awal),
                    'jam_kerja_akhir' => trim($row->jam_kerja_akhir),
                    'idType_mesin' => trim($row->idType_mesin),
                    'idNama_mesin' => trim($row->idNama_mesin),
                    'lbr_st' => trim($row->lbr_st),
                    'rajutan_wa' => trim($row->rajutan_wa),
                    'rajutan_we' => trim($row->rajutan_we),
                    'denier' => trim($row->denier),
                    'jml_bng_wa_st' => trim($row->jml_bng_wa_st),
                    'jml_bng_wa_pm' => trim($row->jml_bng_wa_pm),
                    'wrn' => trim($row->wrn),
                    'lbr' => trim($row->lbr),
                    'lpt' => trim($row->lpt),
                    'gbs' => trim($row->gbs),
                    'wndr_gld' => trim($row->wndr_gld),
                    'bulu' => trim($row->bulu),
                    'jam_bulu' => trim($row->jam_bulu),
                    'tanda' => trim($row->tanda),
                    'ping_bergerigi' => trim($row->ping_bergerigi),
                    'sensor_wa' => trim($row->sensor_wa),
                    'sensor_we' => trim($row->sensor_we),
                    'stang_arm' => trim($row->stang_arm),
                    'keterangan' => trim($row->keterangan),

                ];
            }
            // dd($response);
            return datatables($response)->make(true);
        } else if ($id == 'getDataLaporan') {
            $tgl_awal = $request->input('tgl_awalModal');
            $tgl_akhir = $request->input('tgl_akhirModal');
            $results = DB::connection('ConnTestQC')
                ->select('EXEC SP_4451_CekKainCL @Kode = ?, @tgl_awal = ?, @tgl_akhir = ?', [6, $tgl_awal, $tgl_akhir]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'idHeader' => trim($row->idHeader),
                    'tanggal' => Carbon::parse($row->tanggal)->format('m/d/Y'),
                    'tanggal_raw' => Carbon::parse($row->tanggal)->format('Y-m-d'),
                    'shift' => trim($row->shift),
                    'status_panen' => trim($row->status_panen),
                    'user_panen' => trim($row->user_panen),

                ];
            }
            // dd($response);
            return datatables($response)->make(true);
        } else if ($id == 'prosesStatusPanen') {
            // dd($request->all());
            $idHeader = $request->input('idHeader');
            $user_input = trim(Auth::user()->NomorUser);
            $rowDataArray = $request->input('rowDataArray', []);
            if ($rowDataArray == []) {
                return response()->json([
                    'error' => 'Centang dulu data yang mau diproses PANEN'
                ]);
            }
            try {
                foreach ($rowDataArray as $row) {
                    $idHeader = $row['idHeader'] ?? null;
                    // if ($idHeader == null) {
                    //     return response()->json([
                    //         'error' => 'Centang dulu data yang mau diproses PANEN'
                    //     ]);
                    // }
                    DB::connection('ConnTestQC')->statement(
                        'EXEC SP_4451_CekKainCL 
                    @Kode = ?, 
                    @user_input = ?, 
                    @idHeader = ?',
                        [
                            7,
                            $user_input,
                            $idHeader
                        ]
                    );
                }

                return response()->json([
                    'message' => 'Status PANEN berhasil diproses'
                ]);
            } catch (Exception $e) {
                return response()->json([
                    'error' => $e->getMessage()
                ]);
            }
        }
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        $idHeader = $request->input('idHeader');
        $user_input = trim(Auth::user()->NomorUser);
        $rowDataArray = $request->input('rowDataArray', []);
        try {
            DB::connection('ConnTestQC')
                ->statement(
                    'EXEC SP_4451_CekKainCL @Kode = ?, @user_input = ?, @idHeader = ?',
                    [7, $user_input, $idHeader]
                );
            return response()->json(['message' => 'Status berhasil diubah PANEN!']);
        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ]);
        }
    }

    public function destroy($id)
    {
        //
    }
}
