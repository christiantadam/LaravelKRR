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
        $listTypeMesin = DB::connection('ConnTestQC')
            ->select('EXEC SP_4451_List_Mesin_CL @Kode = ?', [1]);

        // $listTypeMesin = collect($listTypeMesin)
        //     ->whereIn('IdType_Mesin', [13, 17])
        //     ->values();
        return view('QC.Circular.CekKainCircular', compact('access', 'listTypeMesin'));
    }

    public function getMesinSelect($idTypeMesin)
    {
        // dd($idTypeMesin);
        $mesin = DB::connection('ConnTestQC')->select('EXEC SP_4451_List_Mesin_CL @Kode = ?, @IdType_Mesin = ?', ['2', $idTypeMesin]);
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
        $type_kain = $request->input('type_kain');
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
        $counter_mesin = $request->input('counter_mesin');
        $status_mesin = $request->input('status_mesin');
        $jam_mati = $request->input('jam_mati');
        $lbr_reinf = $request->input('lbr_reinf');
        $jarak_strip1 = $request->input('jarak_strip1');
        $jarak_strip2 = $request->input('jarak_strip2');
        $jarak_strip3 = $request->input('jarak_strip3');
        $jarak_strip4 = $request->input('jarak_strip4');
        $jarak_strip5 = $request->input('jarak_strip5');
        $jarak_strip6 = $request->input('jarak_strip6');
        $jarak_strip7 = $request->input('jarak_strip7');
        $jarak_strip8 = $request->input('jarak_strip8');
        $jarak_strip9 = $request->input('jarak_strip9');
        $jarak_strip10 = $request->input('jarak_strip10');
        $jarak_strip11 = $request->input('jarak_strip11');
        try {
            switch ($proses) {
                case 1:
                    // Simpan
                    DB::connection('ConnTestQC')
                        ->statement(
                            'EXEC SP_4451_CekKainCL 
                        @Kode = ?,
                        @type_kain = ?,
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
                        @keterangan = ?,
                        @counter_mesin = ?,
                        @status_mesin = ?,
                        @jam_mati = ?,
                        @lbr_reinf = ?,
                        @jarak_strip1 = ?,
                        @jarak_strip2 = ?,
                        @jarak_strip3 = ?,
                        @jarak_strip4 = ?,
                        @jarak_strip5 = ?,
                        @jarak_strip6 = ?,
                        @jarak_strip7 = ?,
                        @jarak_strip8 = ?,
                        @jarak_strip9 = ?,
                        @jarak_strip10 = ?,
                        @jarak_strip11 = ?',
                            [
                                1,
                                $type_kain,
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
                                $counter_mesin,
                                $status_mesin,
                                $jam_mati,
                                $lbr_reinf,
                                $jarak_strip1,
                                $jarak_strip2,
                                $jarak_strip3,
                                $jarak_strip4,
                                $jarak_strip5,
                                $jarak_strip6,
                                $jarak_strip7,
                                $jarak_strip8,
                                $jarak_strip9,
                                $jarak_strip10,
                                $jarak_strip11,
                            ]
                        );
                    return response()->json(['message' => 'Data berhasil disimpan!']);

                case 2:
                    // dd($request->all());
                    // dd($jam_bulu);
                    // Update
                    $tes = DB::connection('ConnTestQC')
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
                        @idDetail = ?,
                        @counter_mesin = ?,
                        @status_mesin = ?,
                        @jam_mati = ?,
                        @lbr_reinf = ?,
                        @jarak_strip1 = ?,
                        @jarak_strip2 = ?,
                        @jarak_strip3 = ?,
                        @jarak_strip4 = ?,
                        @jarak_strip5 = ?,
                        @jarak_strip6 = ?,
                        @jarak_strip7 = ?,
                        @jarak_strip8 = ?,
                        @jarak_strip9 = ?,
                        @jarak_strip10 = ?,
                        @jarak_strip11 = ?',
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
                                $counter_mesin,
                                $status_mesin,
                                $jam_mati,
                                $lbr_reinf,
                                $jarak_strip1,
                                $jarak_strip2,
                                $jarak_strip3,
                                $jarak_strip4,
                                $jarak_strip5,
                                $jarak_strip6,
                                $jarak_strip7,
                                $jarak_strip8,
                                $jarak_strip9,
                                $jarak_strip10,
                                $jarak_strip11,
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
            $type_kain = $request->input('type_kain');
            $results = DB::connection('ConnTestQC')
                ->select('EXEC SP_4451_CekKainCL @Kode = ?, @tgl_awal = ?, @tgl_akhir = ?, @type_kain = ?', [4, $tgl_awal, $tgl_akhir, $type_kain]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'tanggal' => Carbon::parse($row->tanggal)->format('m/d/Y'),
                    'tanggal_raw' => Carbon::parse($row->tanggal)->format('Y-m-d'),
                    'idDetail' => trim($row->idDetail),
                    'nama_typeKain' => trim($row->nama_typeKain),
                    'shift' => trim($row->shift),
                    'Nama_mesin' => trim($row->Nama_mesin),
                    'counter_mesin' => trim($row->counter_mesin),
                    'status_mesin' => trim($row->status_mesin),
                    'jam_mati' => trim($row->jam_mati),
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
                    'type_kain' => trim($row->type_kain),
                    'tanggal' => Carbon::parse($row->tanggal)->format('Y-m-d'),
                    'shift' => trim($row->shift),
                    'jam_kerja_awal' => trim($row->jam_kerja_awal),
                    'jam_kerja_akhir' => trim($row->jam_kerja_akhir),
                    'idType_mesin' => trim($row->idType_mesin),
                    'idNama_mesin' => trim($row->idNama_mesin),
                    'counter_mesin' => trim($row->counter_mesin),
                    'status_mesin' => trim($row->status_mesin),
                    'jam_mati' => trim($row->jam_mati),
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
                    'jam_temuan' => trim($row->jam_temuan),
                    'tanda' => trim($row->tanda),
                    'ping_bergerigi' => trim($row->ping_bergerigi),
                    'sensor_wa' => trim($row->sensor_wa),
                    'sensor_we' => trim($row->sensor_we),
                    'stang_arm' => trim($row->stang_arm),
                    'keterangan' => trim($row->keterangan),
                    'lbr_reinf' => trim($row->lbr_reinf),
                    'strip1' => trim($row->strip1),
                    'strip2' => trim($row->strip2),
                    'strip3' => trim($row->strip3),
                    'strip4' => trim($row->strip4),
                    'strip5' => trim($row->strip5),
                    'strip6' => trim($row->strip6),
                    'strip7' => trim($row->strip7),
                    'strip8' => trim($row->strip8),
                    'strip9' => trim($row->strip9),
                    'strip10' => trim($row->strip10),
                    'strip11' => trim($row->strip11),
                ];
            }
            // dd($response);
            return datatables($response)->make(true);
        } else if ($id == 'getDataLaporan') {
            $tgl_awal = $request->input('tgl_awalModal');
            $tgl_akhir = $request->input('tgl_akhirModal');
            $type_kain = $request->input('type_kain');
            $results = DB::connection('ConnTestQC')
                ->select('EXEC SP_4451_CekKainCL @Kode = ?, @tgl_awal = ?, @tgl_akhir = ?, @type_kain = ?', [6, $tgl_awal, $tgl_akhir, $type_kain]);
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
