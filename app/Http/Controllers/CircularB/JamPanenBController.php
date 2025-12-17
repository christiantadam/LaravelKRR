<?php

namespace App\Http\Controllers\CircularB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Log;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class JamPanenBController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Circular B');
        return view('CircularB.informasi.JamPanen', compact('access'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        // return response()->json([
        //     'debug' => $request->all()
        // ]);
        // return response()->json($request->all());
        // dd($request->all());
        // try {
        //     // Panggil stored procedure dengan parameter
        //     DB::connection('ConnCircular')->statement("EXEC SP_1273_CIR_METERPANEN @Kode = :kode, @Tanggal = :tanggal", [
        //         'kode' => 1,
        //         'tanggal' => now()->toDateString(), // sama dengan Now.Date di VB
        //     ]);

        //     return response()->json(['message' => 'Proses Jam Panen Selesai, silakan refresh Excel Anda.']);
        // } catch (Exception $e) {
        //     return response()->json([
        //         'error' => 'Terjadi kesalahan: ' . $e->getMessage()
        //     ]);
        // }
        try {
            $tanggal = now()->toDateString();
            // return response()->json($tanggal);
            DB::connection('ConnCircularMojosari')->transaction(function () use ($tanggal) {

                // step 1: hapus isi tabel laporan
                DB::connection('ConnCircularMojosari')->table('T_Laporan_MeterPanen')->delete();

                // step 2: ambil semua mesin aktif yang sedang jalan
                $mesins = DB::connection('ConnCircularMojosari')
                    ->table('T_Log_Mesin as lm')
                    ->join('T_Mesin as m', function ($join) {
                        $join->on('lm.Id_mesin', '=', 'm.Id_mesin')
                            ->on('lm.Id_order', '=', 'm.Id_order');
                    })
                    ->join('T_Order as o', 'lm.Id_order', '=', 'o.Id_order')
                    ->join('VW_PRG_1273_CIR_TYPE_BARANG as b', 'o.Kode_barang', '=', 'b.KD_BRG')
                    ->where('m.Active', 'Y')
                    ->whereNull('o.A_tgl_Akhir')
                    ->where('m.Id_Lokasi', '<>', '4')
                    ->select(
                        'lm.Id_mesin',
                        'lm.Id_order',
                        'm.Nama_mesin',
                        'o.Kode_barang',
                        'b.NAMA_BRG',
                        'b.D_TEK3 as RajutanWE'
                    )
                    ->groupBy('lm.Id_mesin', 'lm.Id_order', 'm.Nama_mesin', 'o.Kode_barang', 'b.NAMA_BRG', 'b.D_TEK3')
                    ->orderBy('m.Nama_mesin')
                    ->get();
                // return response()->json($mesins);
                // dd($mesins);
                foreach ($mesins as $row) {
                    $idMesin = $row->Id_mesin;
                    $idOrder = $row->Id_order;
                    $nmMesin = $row->Nama_mesin;
                    $nmBarang = $row->NAMA_BRG;
                    $rajutanWE = $row->RajutanWE;

                    // step 3: hitung order & actual
                    $orderData = DB::connection('ConnCircularMojosari')
                        ->table('T_Log_Mesin as lm')
                        ->join('VW_CIR_1273_JumlahMesin as jm', 'lm.Id_order', '=', 'jm.IdOrder')
                        ->join('T_Order as o', 'lm.Id_order', '=', 'o.Id_order')
                        ->where('lm.Id_mesin', $idMesin)
                        ->where('lm.Id_order', $idOrder)
                        ->selectRaw('o.R_jumlah_Order / jm.JumlahMesin as JumlahOrder')
                        ->selectRaw('SUM(lm.Counter_mesin_akhir) - SUM(lm.Counter_mesin_awal) as ActualOrder')
                        ->selectRaw('SUM(lm.Afalan_Wa) as AfalanWA')
                        ->selectRaw('SUM(lm.Afalan_We) as AfalanWE')
                        ->selectRaw('(o.R_jumlah_Order / jm.JumlahMesin) - ((SUM(lm.Counter_mesin_akhir) - SUM(lm.Counter_mesin_awal)) - (SUM(lm.Afalan_Wa)+SUM(lm.Afalan_We))) as SisaOrder')
                        ->groupBy('o.R_jumlah_Order', 'jm.JumlahMesin')
                        ->first();

                    if (!$orderData)
                        continue;

                    $jumlahOrder = $orderData->JumlahOrder;
                    $actualOrder = $orderData->ActualOrder;
                    $afalanWA = $orderData->AfalanWA;
                    $afalanWE = $orderData->AfalanWE;
                    $sisaOrder = $orderData->SisaOrder;

                    // step 4: cari log terakhir sebelum tanggal
                    $idLog = DB::connection('ConnCircularMojosari')
                        ->table('T_Log_Mesin')
                        ->where('Id_mesin', $idMesin)
                        ->where('Id_order', $idOrder)
                        ->where('Status_log', '03')
                        ->where('Tgl_Log', '<', $tanggal)
                        ->max('Id_Log');

                    if (!$idLog)
                        continue;

                    $logData = DB::connection('ConnCircularMojosari')
                        ->table('T_Log_Mesin as lm')
                        ->join('T_Premi as p', 'lm.Id_Premi', '=', 'p.Id_premi')
                        ->where('lm.Id_Log', $idLog)
                        ->where('lm.Id_mesin', $idMesin)
                        ->where('lm.Id_order', $idOrder)
                        ->select('lm.A_rpm as RPM', 'lm.A_n_shutle as Shutle', 'p.Effisiensi as Eff')
                        ->first();

                    if (!$logData)
                        continue;

                    $rpm = $logData->RPM;
                    $shutle = $logData->Shutle;
                    $eff = $logData->Eff;

                    // step 5: hitung meter saat ini
                    $meterData = DB::connection('ConnCircularMojosari')
                        ->table('T_Log_Mesin')
                        ->where('Id_Log', '>', $idLog)
                        ->where('Id_mesin', $idMesin)
                        ->where('Id_order', $idOrder)
                        ->selectRaw('SUM(Counter_mesin_akhir) - SUM(Counter_mesin_awal) as MeterSaatIni')
                        ->selectRaw('SUM(Afalan_Wa) as AfalanWASaatIni')
                        ->selectRaw('SUM(Afalan_We) as AfalanWESaatIni')
                        ->first();

                    $meterSaatIni = $meterData->MeterSaatIni ?? 0;
                    $afalanWASaatIni = $meterData->AfalanWASaatIni ?? 0;
                    $afalanWESaatIni = $meterData->AfalanWESaatIni ?? 0;

                    // step 6: hitung meter per jam
                    $meterPerJam = ($rpm * $shutle * 2.54 * 0.6) * ($eff / 100) / $rajutanWE;

                    // step 7: ambil meter panen
                    $meterPanen = DB::connection('ConnCircularMojosari')
                        ->table('T_Order')
                        ->where('Id_Order', $idOrder)
                        ->value('MeterPanen');

                    // default nilai
                    $sisaPanen = 0;
                    $waktuSelesai = 'Siap Panen';
                    $jamSelesai = 'Siap Panen';
                    $tanggalSelesai = Carbon::now();

                    if ($meterPanen <= $meterSaatIni) {
                        $sisaPanen = 0;
                        $waktuSelesai = 'Siap Panen';
                        $jamSelesai = 'Siap Panen';
                        $tanggalSelesai = Carbon::now();
                    } else {
                        $sisaPanen = $meterPanen - ($meterSaatIni + $afalanWASaatIni + $afalanWESaatIni);

                        if ($sisaPanen <= 0) {
                            $sisaPanen = 0;
                            $waktuSelesai = 'Siap Panen';
                            $jamSelesai = 'Siap Panen';
                            $tanggalSelesai = Carbon::now();
                        } else {
                            $hari = floor(($sisaPanen / $meterPerJam) / 24);
                            $jam = floor(round($sisaPanen / $meterPerJam, 0) - ($hari * 24));

                            $waktuSelesai = $hari . ' hari ' . $jam . ' jam';

                            $currentHour = (int) date('H');
                            $jamHitung = (round($sisaPanen / $meterPerJam, 0) - $hari * 24 + $currentHour);
                            $jamSelesai = (($jamHitung - floor($jamHitung / 24) * 24)) . ':00';

                            $tanggalSelesai = Carbon::now()->addDays($hari);

                            $jamSekarang = (int) date('H');
                            $jamTambahan = (24 - $jamSekarang) + 7;

                            $meter = floor(round($sisaPanen / $meterPerJam, 0) - ($hari * 24));
                            $meterJam = floor(($sisaPanen / $meterPerJam) / 24);

                            if ($meter > $jamTambahan && $meterJam == 0) {
                                $tanggalSelesai = $tanggalSelesai->addDay();
                            }
                        }
                    }

                    // step 8: insert ke laporan
                    DB::connection('ConnCircularMojosari')->table('T_Laporan_MeterPanen')->insert([
                        'Tanggal' => $tanggal,
                        'NamaMesin' => $nmMesin,
                        'NamaBarang' => $nmBarang,
                        'JumlahOrder' => $jumlahOrder,
                        'ActualOrder' => $actualOrder,
                        'AfalanWA' => $afalanWA,
                        'AfalanWE' => $afalanWE,
                        'SisaOrder' => $sisaOrder,
                        'RPM' => $rpm,
                        'Shutle' => $shutle,
                        'Effisiensi' => $eff,
                        'RajutanWE' => $rajutanWE,
                        'MeterperJam' => $meterPerJam,
                        'MeterSaatIni' => $meterSaatIni,
                        'MeterPanen' => $meterPanen,
                        'WaktuSelesai' => $waktuSelesai,
                        'JamSelesai' => $jamSelesai,
                        'IdOrder' => $idOrder,
                        'SisaPanen' => $sisaPanen,
                        'AfalanWA_SaatIni' => $afalanWASaatIni,
                        'AfalanWE_SaatIni' => $afalanWESaatIni,
                        'TanggalSelesai' => $tanggalSelesai,
                    ]);
                }
            });

            return response()->json(['message' => 'Proses Jam Panen Selesai, silakan refresh Excel Anda.']);

        } catch (Exception $e) {
            return response()->json([
                'error' => 'Terjadi kesalahan: ' . $e->getMessage()
            ]);
        }
    }

    public function show($id)
    {
        //
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
