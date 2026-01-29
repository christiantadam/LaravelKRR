<?php

namespace App\Http\Controllers\CircularB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;
use Log;
use App\Http\Controllers\HakAksesController;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class OrderCircularGedungBController extends Controller
{
    public function index($form_name)
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Circular B');
        $form_data = [];
        // dd($form_name);
        switch ($form_name) {
            case 'formOrderMaster':
                $form_data = ['listSubKategori' => $this->spOrder('SP_1273_CIR_LIST_SUBKATEGORI')];
                break;

            // case 'formKodePegawai':
            //     $form_data = ['listSubKategori' => $this->spOrder('SP_1273_CIR_LIST_SUBKATEGORI')];
            //     break;

            case 'formOrderAktif':
                $list_type_mesin = $this->spOrder('SP_1273_CIR_List_TypeMesin~1');
                usort($list_type_mesin, function ($a, $b) {
                    return intval($a->IdType_Mesin) - intval($b->IdType_Mesin);
                });

                $form_data = ['listTypeMesin' => $list_type_mesin];
                break;

            case 'formKegiatanMesin':
                $list_status_log = $this->spOrder('SP_1273_CIR_List_Status_Log~1');
                // dd($list_status_log);
                usort($list_status_log, function ($a, $b) {
                    return strcmp($a->id_status, $b->id_status);
                });

                $list_type_mesin = $this->spOrder('SP_1273_CIR_List_TypeMesin~1');
                $filtered = array_values(array_filter($list_type_mesin, function ($item) {
                    return in_array($item->IdType_Mesin, ['1']);
                }));
                // $filtered = array_values(array_filter($list_type_mesin, function ($item) {
                //     return $item->IdType_Mesin;
                // }));
                // dd($filtered);
                usort($filtered, function ($a, $b) {
                    return intval($a->IdType_Mesin) - intval($b->IdType_Mesin);
                });

                $form_data = [
                    'listStatusLog' => $list_status_log,
                    'listTypeMesin' => $filtered
                ];
                break;

            case 'formCounterMesin':
                $form_data = [
                    'listMesin' => $this->spOrder('SP_1273_CIR_List_Mesin~1'),
                ];
                break;

            default:
                return view('CircularB.transaksi.' . $form_name, compact('access'));
        }

        return view('CircularB.transaksi.' . $form_name, $form_data, compact('access'));
    }

    public function getOrderBaruSelect()
    {
        $data = DB::connection('ConnCircular')->select('exec Sp_List_Order @Kode = 14');
        // dd($data);
        return response()->json($data);
    }

    public function store(Request $request)
    {
        // dd($request->all());
        switch ($request->kodeProses) {
            case 'ProsesPerhitunganEffisiensi':
                // dd($request->all());
                $tanggal = Carbon::parse($request->input('tanggal'))->format('m/d/Y');
                $shift = $request->input('shift');
                $kode = $request->input('kode');
                // $prosesPertama = $request->input('prosesPertama');
                // $updateProses = $request->input('updateProses');
                // dd($request->all());
                if (!$tanggal || !$shift) {
                    return response()->json(['error' => 'Tanggal dan Shift wajib diisi']);
                }

                if ($kode == 1) {
                    // Cek apakah data sudah ada
                    $cek = DB::connection('ConnCircularMojosari')->select(
                        'exec SP_1273_CIR_List_ProsesMeter @Kode = ?, @Tanggal = ?, @Shift = ?',
                        [4, $tanggal, $shift]
                    );
                    // dd($cek);
                    $ada = 0;
                    foreach ($cek as $row) {
                        $ada = $row->Ada ?? 0;
                    }
                    // dd($ada);
                    if ($ada == 0) {
                        DB::connection('ConnCircularMojosari')->beginTransaction();
                        try {
                            $tanggal = Carbon::parse($tanggal)->format('Y-m-d');
                            $logMesinData = DB::connection('ConnCircularMojosari')->table('T_Log_Mesin')
                                ->join('T_Mesin', 'T_Log_Mesin.Id_mesin', '=', 'T_Mesin.Id_mesin')
                                ->select('T_Log_Mesin.Id_order', 'T_Log_Mesin.Id_mesin')
                                ->where('T_Log_Mesin.Tgl_Log', $tanggal)
                                ->where('T_Log_Mesin.Shift', $shift)
                                ->whereNull('T_Log_Mesin.Id_Premi')
                                ->where('T_Mesin.Id_Lokasi', '!=', 4)
                                ->groupBy('T_Log_Mesin.Id_order', 'T_Log_Mesin.Id_mesin')
                                ->orderBy('T_Log_Mesin.Id_mesin')
                                ->get();
                            // dd($logMesinData);
                            foreach ($logMesinData as $group) {
                                $idOrder = $group->Id_order;
                                $idMesin = $group->Id_mesin;
                                $idPremi = null;
                                $hitMtr = 1;
                                // dd($idMesin);
                                $logList = DB::connection('ConnCircularMojosari')->table('T_Log_Mesin')
                                    ->where('Tgl_Log', $tanggal)
                                    ->where('Shift', $shift)
                                    ->whereNull('Id_Premi')
                                    ->where('Id_order', $idOrder)
                                    ->where('Id_mesin', $idMesin)
                                    ->get();
                                // dd($logList);
                                foreach ($logList as $log) {
                                    $stLog = $log->Status_log;
                                    if (in_array($stLog, ['01', '02', '03', '04'])) {
                                        $hslMeter = $log->Counter_mesin_akhir - $log->Counter_mesin_awal;

                                        if ($hitMtr == 1) {
                                            $idPremi = DB::connection('ConnCircularMojosari')->table('T_Premi')->max('Id_premi') + 1;
                                            DB::connection('ConnCircularMojosari')->table('T_Premi')->insert([
                                                'Id_Premi' => $idPremi,
                                                'Hasil_Meter' => $hslMeter,
                                            ]);
                                        } else {
                                            DB::connection('ConnCircularMojosari')->table('T_Premi')
                                                ->where('Id_Premi', $idPremi)
                                                ->increment('Hasil_Meter', $hslMeter);
                                        }

                                        DB::connection('ConnCircularMojosari')->table('T_Log_Mesin')
                                            ->where('Id_Log', $log->Id_Log)
                                            ->update(['Id_Premi' => $idPremi]);

                                        $hitMtr++;
                                    }
                                }

                                // Ambil data VW_Type_Barang
                                $kdBrg = DB::connection('ConnCircularMojosari')->table('T_Order')->where('Id_Order', $idOrder)->value('Kode_Barang');
                                $vw = DB::connection('ConnCircularMojosari')->table('VW_Type_Barang')->where('Kd_Brg', $kdBrg)->first();
                                // dd($vw, $kdBrg);
                                $ukuran = floatval($vw->D_TEK1 ?? 0);
                                $waft = floatval($vw->D_TEK2 ?? 0);
                                $weft = floatval($vw->D_TEK3 ?? 0);
                                $denier = intval($vw->D_TEK4 ?? 0);
                                $ket = $vw->D_TEK7 ?? '';
                                $lReinf = intval($vw->D_TEK8 ?? 0);
                                $jReinf = intval($vw->D_TEK9 ?? 0);

                                // Penyesuaian denier WA dan WE
                                $dwa = $denier;
                                $dwe = $denier;
                                if ($denier == 1800) {
                                    $dwa = 2000;
                                    $dwe = 1600;
                                } elseif ($denier == 1750) {
                                    $dwa = 2000;
                                    $dwe = 1500;
                                } elseif ($denier == 1500) {
                                    $dwa = 1500;
                                    $dwe = 1500;
                                } elseif ($denier == 950) {
                                    $dwa = 1000;
                                    $dwe = 900;
                                } elseif ($denier == 850) {
                                    $dwa = 900;
                                    $dwe = 800;
                                }

                                // Hitung Jam Kerja dari Log
                                // $logs = DB::connection('ConnCircularMojosari')->table('T_Log_Mesin')
                                //     ->select('Awal_jam_kerja', 'Akhir_jam_kerja')
                                //     ->where('Tgl_Log', $tanggal)
                                //     ->where('Shift', $shift)
                                //     ->where('Id_mesin', $idMesin)
                                //     ->whereNotNull('Awal_jam_kerja')
                                //     ->whereNotNull('Akhir_jam_kerja')
                                //     ->whereIn('Status_log', ['01', '02', '03', '04']) // penting
                                //     ->when($idOrder ?? null, fn($q) => $q->where('Id_order', $idOrder)) // jika tersedia
                                //     ->get();

                                $totalMenit = 0;
                                foreach ($logList as $log) {
                                    try {
                                        $awal = Carbon::parse($log->Awal_jam_kerja);
                                        $akhir = Carbon::parse($log->Akhir_jam_kerja);
                                        $selisihMenit = $awal->diffInMinutes($akhir);
                                        $totalMenit += $selisihMenit;
                                        $aRpm = $log->A_rpm ?? 0;
                                        $aShutle = $log->A_n_shutle ?? 0;
                                    } catch (\Exception $e) {
                                        // Abaikan jika parsing waktu gagal
                                        continue;
                                    }
                                }

                                $jamKerja = round($totalMenit / 60, 2) / 2;

                                // Jika tidak ada log, fallback ke T_Jam_Kerja
                                if ($jamKerja === 0) {
                                    $jamKerja = DB::connection('ConnCircularMojosari')->table('T_Jam_Kerja')
                                        ->where('Tanggal', $tanggal)
                                        ->where('Shift', $shift)
                                        ->where('IdMesin', $idMesin)
                                        ->value('JamKerja');

                                    if ($jamKerja === null) {
                                        $idTypeMesin = DB::connection('ConnCircularMojosari')->table('T_Mesin')->where('Id_Mesin', $idMesin)->value('IdType_mesin');
                                        $jamKerja = DB::connection('ConnCircularMojosari')->table('T_Jam_Kerja')
                                            ->where('Tanggal', $tanggal)
                                            ->where('Shift', $shift)
                                            ->where('IdTypeMesin', $idTypeMesin)
                                            ->whereNull('IdMesin')
                                            ->value('JamKerja');
                                    }
                                }
                                // dd($jamKerja);
                                $hari = Carbon::parse($tanggal)->dayOfWeekIso; // 1 = Monday ... 7 = Sunday

                                if ($jamKerja >= 5) {
                                    $jamKerja = $jamKerja;
                                }
                                // dd($jamKerja);
                                $hasilMeter = DB::connection('ConnCircularMojosari')->table('T_Premi')->where('Id_Premi', $idPremi)->value('Hasil_Meter');
                                // $aRpm = $logList[0]->A_rpm ?? 0;
                                // $aShutle = $logList[0]->A_n_shutle ?? 0;
                                // dd($hasilMeter, $aRpm, $aShutle, $jamKerja);
                                // Perhitungan circle dan efisiensi
                                $circle = ((($aRpm * $aShutle * 2.54) / $weft) / 100) * 60 * $jamKerja;
                                $effisiensi = $circle > 0 ? ($hasilMeter / $circle) * 100 : 0;
                                // dd($effisiensi, $circle);
                                // Validasi efisiensi
                                // if ($effisiensi >= 99 || $effisiensi <= 10) {
                                //     throw new \Exception("Effisiensi tidak valid ($effisiensi%) pada mesin $idMesin.");
                                // }

                                // Update efisiensi
                                DB::connection('ConnCircularMojosari')->table('T_Premi')
                                    ->where('Id_Premi', $idPremi)
                                    ->update(['Effisiensi' => $effisiensi, 'Hasil_Circle' => $circle]);

                                // Perhitungan berat (Kg)
                                $berat = ($ukuran * $hasilMeter * 100 * (($waft * $dwa) + ($weft * $dwe))) / 1143000 / 1000;
                                $reinforc = ($lReinf * $jReinf * $waft * $dwa) / (1143000 * 2) / 1000;
                                $kg = 0;

                                if (stripos($ket, 'BELAH') !== false || stripos($ket, 'FLAT') !== false) {
                                    if ($hasilMeter > 0) {
                                        $kg = ($berat / 2) + $reinforc;
                                    }
                                } else {
                                    if ($hasilMeter > 0) {
                                        $kg = $berat + $reinforc;
                                    }
                                }

                                // Jika diperlukan: update ke T_Premi
                                // DB::connection('ConnCircularMojosari')->table('T_Premi')->where('Id_Premi', $idPremi)->update(['Berat' => $kg]);
                            }

                            DB::connection('ConnCircularMojosari')->commit();
                            return response()->json(['message' => 'Proses meter berhasil.']);
                        } catch (\Exception $e) {
                            DB::connection('ConnCircularMojosari')->rollBack();
                            return response()->json(['error' => $e->getMessage()]);
                        }
                    } else {
                        return response()->json([
                            'error' => 'Tidak bisa diproses dengan PROSES PERTAMA, harus dengan UPDATE PROSES !!..'
                        ]);
                    }
                } else if ($kode == 2) {
                    DB::connection('ConnCircularMojosari')->beginTransaction();
                    try {
                        $logMesinData = DB::connection('ConnCircularMojosari')->table('T_Log_Mesin as lm')
                            ->join('T_Mesin as m', 'lm.Id_mesin', '=', 'm.Id_mesin')
                            ->select('lm.Id_order', 'lm.Id_mesin')
                            ->whereDate('lm.Tgl_Log', $tanggal)
                            ->where('lm.Shift', $shift)
                            ->where('m.Id_Lokasi', '<>', 4)
                            ->groupBy('lm.Id_order', 'lm.Id_mesin')
                            ->orderBy('lm.Id_mesin')
                            ->get();

                        foreach ($logMesinData as $log) {
                            $idOrder = $log->Id_order;
                            $idMesin = $log->Id_mesin;

                            $hasilMeter = 0;
                            $adaPremi = 0;

                            $detailLogs = DB::connection('ConnCircularMojosari')->table('T_Log_Mesin')
                                ->select('Id_Log', 'Counter_mesin_awal', 'Counter_mesin_akhir', 'A_rpm', 'A_n_shutle', 'Awal_jam_kerja', 'Akhir_jam_kerja', 'Status_log', 'Id_Premi')
                                ->whereDate('Tgl_Log', $tanggal)
                                ->where('Shift', $shift)
                                ->where('Id_mesin', $idMesin)
                                ->where('Id_order', $idOrder)
                                ->get();

                            foreach ($detailLogs as $logDetail) {
                                if (in_array($logDetail->Status_log, ['01', '02', '03', '04'])) {
                                    $hasilMeter += ($logDetail->Counter_mesin_akhir - $logDetail->Counter_mesin_awal);
                                    if (!is_null($logDetail->Id_Premi)) {
                                        $adaPremi = $logDetail->Id_Premi;
                                    }
                                }
                            }

                            if ($adaPremi > 0) {
                                DB::connection('ConnCircularMojosari')->table('T_Premi')
                                    ->where('Id_Premi', $adaPremi)
                                    ->update(['Hasil_Meter' => $hasilMeter]);

                                DB::connection('ConnCircularMojosari')->table('T_Log_Mesin')
                                    ->whereDate('Tgl_Log', $tanggal)
                                    ->where('Shift', $shift)
                                    ->where('Id_mesin', $idMesin)
                                    ->where('Id_order', $idOrder)
                                    ->update(['Id_Premi' => $adaPremi]);
                            } else {
                                $maxIdPremi = DB::connection('ConnCircularMojosari')->table('T_Premi')->max('Id_Premi') ?? 0;
                                $newIdPremi = $maxIdPremi + 1;

                                DB::connection('ConnCircularMojosari')->table('T_Premi')->insert([
                                    'Id_Premi' => $newIdPremi,
                                    'Hasil_Meter' => $hasilMeter
                                ]);

                                DB::connection('ConnCircularMojosari')->table('T_Log_Mesin')
                                    ->whereDate('Tgl_Log', $tanggal)
                                    ->where('Shift', $shift)
                                    ->where('Id_mesin', $idMesin)
                                    ->where('Id_order', $idOrder)
                                    ->whereNull('Id_Premi')
                                    ->update(['Id_Premi' => $newIdPremi]);

                                $adaPremi = $newIdPremi;
                            }

                            $kdBrg = DB::connection('ConnCircularMojosari')->table('T_Order')->where('Id_Order', $idOrder)->value('Kode_Barang');
                            $vw = DB::connection('ConnCircularMojosari')->table('VW_Type_Barang')->where('Kd_Brg', $kdBrg)->first();

                            $ukuran = floatval($vw->D_TEK1 ?? 0);
                            $waft = floatval($vw->D_TEK2 ?? 0);
                            $weft = floatval($vw->D_TEK3 ?? 0);
                            $denier = intval($vw->D_TEK4 ?? 0);
                            $ket = $vw->D_TEK7 ?? '';
                            $lReinf = intval($vw->D_TEK8 ?? 0);
                            $jReinf = intval($vw->D_TEK9 ?? 0);

                            // Penyesuaian denier WA dan WE
                            $dwa = $denier;
                            $dwe = $denier;
                            // dd($dwa);
                            // Mapping Denier Khusus
                            switch ($denier) {
                                case 1800:
                                    $dwa = 2000;
                                    $dwe = 1600;
                                    break;
                                case 1750:
                                    $dwa = 2000;
                                    $dwe = 1500;
                                    break;
                                case 1500:
                                    $dwa = 1500;
                                    $dwe = 1500;
                                    break;
                                case 950:
                                    $dwa = 1000;
                                    $dwe = 900;
                                    break;
                                case 850:
                                    $dwa = 900;
                                    $dwe = 800;
                                    break;
                            }

                            $totalMenit = 0;
                            foreach ($detailLogs as $log) {
                                try {
                                    $awal = Carbon::parse($log->Awal_jam_kerja);
                                    $akhir = Carbon::parse($log->Akhir_jam_kerja);
                                    $selisihMenit = $awal->diffInMinutes($akhir);
                                    $totalMenit += $selisihMenit;
                                    $aRpm = $log->A_rpm ?? 0;
                                    $aShutle = $log->A_n_shutle ?? 0;
                                } catch (\Exception $e) {
                                    // Abaikan jika parsing waktu gagal
                                    continue;
                                }
                            }
                            // dd($aRpm, $aShutle); 
                            $jamKerja = round($totalMenit / 60, 2);
                            // dd($jamKerja);

                            $tanggal = Carbon::parse($tanggal)->format('Y-m-d');
                            $hari = Carbon::parse($tanggal)->dayOfWeekIso; // 1 (Senin) - 7 (Minggu)
                            // $jmlKerja = 0;
                            $idTypeMesin = null;

                            // Cek apakah ada data jam kerja untuk tanggal tersebut
                            $ada = DB::connection('ConnCircularMojosari')->table('T_Jam_Kerja')
                                ->where('Tanggal', $tanggal)
                                ->count();
                            // dd($ada);
                            if ($ada > 0) {
                                // Hitung jumlah data untuk Tanggal + Shift + IdMesin
                                $dataCount = DB::connection('ConnCircularMojosari')->table('T_Jam_Kerja')
                                    ->where('Tanggal', $tanggal)
                                    ->where('Shift', $shift)
                                    ->where('IdMesin', $idMesin)
                                    ->count();
                                // dd($dataCount);
                                if ($dataCount > 0) {
                                    // Ambil detail datanya
                                    $data = DB::connection('ConnCircularMojosari')->table('T_Jam_Kerja')
                                        ->where('Tanggal', $tanggal)
                                        ->where('Shift', $shift)
                                        ->where('IdMesin', $idMesin)
                                        ->first();

                                    $idTypeMesin = $data->IdTypeMesin;
                                    $jmlKerja = $data->JamKerja;
                                } else {
                                    // Fallback jika IdMesin tidak ditemukan
                                    $fallback = DB::connection('ConnCircularMojosari')->table('T_Mesin')
                                        ->join('T_Jam_Kerja', 'T_Mesin.IdType_mesin', '=', 'T_Jam_Kerja.IdTypeMesin')
                                        ->where('T_Jam_Kerja.Tanggal', $tanggal)
                                        ->where('T_Jam_Kerja.Shift', $shift)
                                        ->where('T_Mesin.Id_mesin', $idMesin)
                                        ->whereNull('T_Jam_Kerja.IdMesin')
                                        ->select(
                                            'T_Jam_Kerja.Tanggal',
                                            'T_Jam_Kerja.Shift',
                                            'T_Jam_Kerja.IdTypeMesin',
                                            'T_Mesin.Id_mesin as IdMesin',
                                            'T_Jam_Kerja.JamKerja'
                                        )
                                        ->first();

                                    if ($fallback) {
                                        $idTypeMesin = $fallback->IdTypeMesin;
                                        $jmlKerja = $fallback->JamKerja;
                                    }
                                }

                                // Validasi hari kerja: tetap masukkan jika >= 5 jam
                                if (!($jmlKerja >= 5 && $hari >= 1 && $hari <= 7)) {
                                    $jmlKerja = $jmlKerja; // Reset jika tidak memenuhi
                                }
                            }
                            $hasilMeter = DB::connection('ConnCircularMojosari')->table('T_Premi')->where('Id_Premi', $adaPremi)->value('Hasil_Meter');
                            // Perhitungan circle dan efisiensi
                            $circle = ((($aRpm * $aShutle * 2.54) / $weft) / 100) * 60 * $jamKerja;
                            // dd($hasilMeter, $aRpm, $aShutle, $jamKerja, $circle);
                            $effisiensi = $circle > 0 ? ($hasilMeter / $circle) * 100 : 0;
                            // dd($effisiensi);
                            // Update efisiensi
                            DB::connection('ConnCircularMojosari')->table('T_Premi')
                                ->where('Id_Premi', $adaPremi)
                                ->update(['Effisiensi' => $effisiensi, 'Hasil_Circle' => $circle]);

                            // Perhitungan berat (Kg)
                            $berat = ($ukuran * $hasilMeter * 100 * (($waft * $dwa) + ($weft * $dwe))) / 1143000 / 1000;
                            $reinforc = ($lReinf * $jReinf * $waft * $dwa) / (1143000 * 2) / 1000;
                            $kg = 0;

                            if (stripos($ket, 'BELAH') !== false || stripos($ket, 'FLAT') !== false) {
                                if ($hasilMeter > 0) {
                                    $kg = ($berat / 2) + $reinforc;
                                }
                            } else {
                                if ($hasilMeter > 0) {
                                    $kg = $berat + $reinforc;
                                }
                            }

                            // → Lanjutkan: perhitungan ukuran, denier, jam kerja, efisiensi, berat, dan update ke T_Premi
                        }

                        DB::connection('ConnCircularMojosari')->commit();
                        return response()->json(['message' => 'Proses meter berhasil.']);
                    } catch (\Exception $e) {
                        DB::connection('ConnCircularMojosari')->rollBack();
                        return response()->json(['status' => 'error', 'message' => $e->getMessage()]);
                    }
                }
                break;

            case 'ProsesLapHistoryCIR':
                $tanggal = $request->input('tanggal');
                // dd($tanggal);
                try {
                    // Panggil SP pertama: Sp_Check_LapOrderAktif
                    $result = DB::connection('ConnCircularMojosari')->select('EXEC SP_1273_CIR_CHECK_LAPORDERAKTIF @Tanggal = ?', [$tanggal]);
                    // dd($result);
                    if (count($result) > 0 && isset($result[0]->Ada) && $result[0]->Ada > 0) {
                        // Jika data sudah ada
                        return response()->json([
                            'error' => 'Untuk ULANG Proses History!!..Hubungi EDP'
                        ]);
                    } else {
                        // Panggil SP kedua: Sp_Laporan_OrderAktif
                        DB::connection('ConnCircularMojosari')->statement('EXEC SP_1273_CIR_Laporan_OrderAktif @Tanggal = ?', [$tanggal]);

                        return response()->json([
                            'message' => 'Anda dapat Memulai Proses Cetak Laporan History Circular !!'
                        ]);
                    }
                } catch (\Exception $e) {
                    return response()->json([
                        'error' => 'Terjadi kesalahan: ' . $e->getMessage()
                    ]);
                }
                break;

            case 'ProsesCetakHistoryCIR':
                $tgl = $request->input('tanggal');
                $messages = [];
                // dd($tgl);
                try {
                    // Jalankan stored procedure pertama
                    // DB::connection('ConnCircularMojosari')->statement("EXEC Sp_Cetak_Laporan_new @Tgl = ?", [$tgl]);
                    // $messages[] = "PROSES SUDAH SELESAI";

                    // 1. Hapus data lama
                    DB::connection('ConnCircularMojosari')->table('T_LAPORAN')->delete();

                    // 2. Ambil data order aktif
                    $orders = DB::connection('ConnCircularMojosari')->table('T_Laporan_OrderAktif')
                        ->where('tgl_log', $tgl)
                        ->orderBy('nama_brg')
                        ->get();

                    $TotalPanjangPotong = 0;
                    $TotalActualPc = 0;

                    foreach ($orders as $order) {
                        // --- Inisialisasi variabel
                        $Mtr_P = $Kg_P = $Eff_P = $Mtr_S = $Kg_S = $Eff_S = $Mtr_M = $Kg_M = $Eff_M = 0;
                        $JmlMesin_P = $JmlMesin_S = $JmlMesin_M = 0;
                        $Z = 0;
                        $mesin = '';
                        $TotMesin = 0;
                        $Sisa = 0;
                        $ActualpC = 0;
                        $ActualPcPerHari = 0;
                        $TAf_WA = $TAf_WE = 0;
                        $PanjangPotongan = 0;
                        $TglFinish = null;
                        // --- Ambil data tambahan dari T_Order
                        $orderData = DB::connection('ConnCircularMojosari')->table('T_Order')
                            ->where('Id_order', $order->Id_Order)
                            ->first();
                        // dd($orderData);
                        // dd($order);
                        if ($orderData) {
                            $PanjangPotongan = $orderData->PanjangPotong ?? 0;
                        }
                        // dd($PanjangPotongan);
                        // --- Ambil data tambahan dari VW_PRG_1273_CIR_GELONDONGAN
                        $vw = DB::connection('ConnCircularMojosari')->table('VW_PRG_1273_CIR_GELONDONGAN')
                            ->where('kd_brg', $order->Kd_Brg)
                            ->first();
                        // dd($vw);
                        if ($vw) {
                            $noOrder = $vw->D_TEK0;
                            $ukuran = (float) $vw->D_TEK1;
                            $Rajutan = $vw->D_TEK2 . ' X ' . $vw->D_TEK3;
                            $Wa = (float) $vw->D_TEK2;
                            $We = (float) $vw->D_TEK3;
                            $Denier = (float) $vw->D_TEK4;
                            $Warna = trim($vw->D_TEK5) . '/' . trim($vw->D_TEK7) . '/' . $vw->D_TEK8 . '/' . $vw->D_TEK9 . '/' . $vw->D_TEK10 . '/' . $vw->D_TEK11 . '/' . $vw->D_TEK12 . '/' . $vw->D_TEK13;
                            $Bahan = $vw->D_TEK6;
                            $ket = $vw->D_TEK7;
                            $LReinf = (int) $vw->D_TEK8;
                            $JReinf = (int) $vw->D_TEK9;
                        } else {
                            $noOrder = $ukuran = $Rajutan = $Wa = $We = $Denier = $Warna = $Bahan = $ket = $LReinf = $JReinf = null;
                        }
                        // dd($noOrder, $ukuran, $Rajutan, $Wa, $We, $Denier, $Warna, $Bahan, $ket, $LReinf, $JReinf);
                        if (preg_match('/^E-/', $order->BenangWarp)) {
                            if (substr($order->BenangWarp, 2, 1) == '-') {
                                $JnsBngWa = floatval(substr($order->BenangWarp, 3, 3)) / 100;
                            } else {
                                $JnsBngWa = floatval(substr($order->BenangWarp, 2, 3)) / 100;
                            }
                        }

                        if (preg_match('/^E-/', $order->BenangWeft)) {
                            if (substr($order->BenangWeft, 2, 1) == '-') {
                                $JnsBngWe = floatval(substr($order->BenangWeft, 3, 3)) / 100;
                            } else {
                                $JnsBngWe = floatval(substr($order->BenangWeft, 2, 3)) / 100;
                            }
                        }

                        if (preg_match('/^E35-/', $order->BenangWarp)) {
                            if (substr($order->BenangWarp, 4, 1) == '-') {
                                $JnsBngWa = floatval(substr($order->BenangWarp, 5, 3)) / 100;
                            } else {
                                $JnsBngWa = floatval(substr($order->BenangWarp, 4, 3)) / 100;
                            }
                        }

                        if (preg_match('/^E35-/', $order->BenangWeft)) {
                            if (substr($order->BenangWeft, 4, 1) == '-') {
                                $JnsBngWe = floatval(substr($order->BenangWeft, 5, 3)) / 100;
                            } else {
                                $JnsBngWe = floatval(substr($order->BenangWeft, 4, 3)) / 100;
                            }
                        }

                        if (preg_match('/^E10-/', $order->BenangWarp)) {
                            if (substr($order->BenangWarp, 4, 1) == '-') {
                                $JnsBngWa = floatval(substr($order->BenangWarp, 5, 3)) / 100;
                            } else {
                                $JnsBngWa = floatval(substr($order->BenangWarp, 4, 3)) / 100;
                            }
                        }

                        if (preg_match('/^E10-/', $order->BenangWeft)) {
                            if (substr($order->BenangWeft, 4, 1) == '-') {
                                $JnsBngWe = floatval(substr($order->BenangWeft, 5, 3)) / 100;
                            } else {
                                $JnsBngWe = floatval(substr($order->BenangWeft, 4, 3)) / 100;
                            }
                        }

                        if (preg_match('/^MEX-/', $order->BenangWarp)) {
                            if (substr($order->BenangWarp, 4, 1) == '-') {
                                $JnsBngWa = floatval(substr($order->BenangWarp, 5, 3)) / 100;
                            } else {
                                $JnsBngWa = floatval(substr($order->BenangWarp, 4, 3)) / 100;
                            }
                        }

                        if (preg_match('/^MEX-/', $order->BenangWeft)) {
                            if (substr($order->BenangWeft, 4, 1) == '-') {
                                $JnsBngWe = floatval(substr($order->BenangWeft, 5, 3)) / 100;
                            } else {
                                $JnsBngWe = floatval(substr($order->BenangWeft, 4, 3)) / 100;
                            }
                        }

                        if (preg_match('/^MED-/', $order->BenangWarp)) {
                            if (substr($order->BenangWarp, 4, 1) == '-') {
                                $JnsBngWa = floatval(substr($order->BenangWarp, 5, 3)) / 100;
                            } else {
                                $JnsBngWa = floatval(substr($order->BenangWarp, 4, 3)) / 100;
                            }
                        }

                        if (preg_match('/^MED-/', $order->BenangWeft)) {
                            if (substr($order->BenangWeft, 4, 1) == '-') {
                                $JnsBngWe = floatval(substr($order->BenangWeft, 5, 3)) / 100;
                            } else {
                                $JnsBngWe = floatval(substr($order->BenangWeft, 4, 3)) / 100;
                            }
                        }

                        if (preg_match('/^E9-/', $order->BenangWarp)) {
                            if (substr($order->BenangWarp, 3, 1) == '-') {
                                $JnsBngWa = floatval(substr($order->BenangWarp, 4, 3)) / 100;
                            } else {
                                $JnsBngWa = floatval(substr($order->BenangWarp, 3, 3)) / 100;
                            }
                        }

                        if (preg_match('/^E9-/', $order->BenangWeft)) {
                            if (substr($order->BenangWeft, 4, 1) == '-') {
                                $JnsBngWe = floatval(substr($order->BenangWeft, 5, 3)) / 100;
                            } else {
                                $JnsBngWe = floatval(substr($order->BenangWeft, 4, 3)) / 100;
                            }
                        }
                        // dd($JnsBngWe, $JnsBngWa);
                        // --- Hitung data produksi per shift
                        foreach (['P', 'S', 'M'] as $shift) {
                            $history = DB::connection('ConnCircularMojosari')->table('VW_PRG_1273_CIR_HITUNG_HISTORY')
                                ->selectRaw('SUM(Hasil_Meter) as mtr, SUM(Effisiensi) as eff, SUM(Hasil_Kg) as kg, COUNT(Id_mesin) as mesin')
                                ->where('Tgl_Log', $order->Tgl_Log)
                                ->where('Shift', $shift)
                                ->where('Id_order', $order->Id_Order)
                                ->first();
                            // dd($history);
                            if ($shift == 'P') {
                                $Mtr_P = $history->mtr ?? 0;
                                $Eff_P = ($history->mesin ?? 0) > 0 ? ($history->eff ?? 0) / $history->mesin : 0;
                                $Kg_P = $history->kg ?? 0;
                                $JmlMesin_P = $history->mesin ?? 0;
                                if ($Eff_P > 0)
                                    $Z++;
                            }
                            if ($shift == 'S') {
                                $Mtr_S = $history->mtr ?? 0;
                                $Eff_S = ($history->mesin ?? 0) > 0 ? ($history->eff ?? 0) / $history->mesin : 0;
                                $Kg_S = $history->kg ?? 0;
                                $JmlMesin_S = $history->mesin ?? 0;
                                if ($Eff_S > 0)
                                    $Z++;
                            }
                            if ($shift == 'M') {
                                $Mtr_M = $history->mtr ?? 0;
                                $Eff_M = ($history->mesin ?? 0) > 0 ? ($history->eff ?? 0) / $history->mesin : 0;
                                $Kg_M = $history->kg ?? 0;
                                $JmlMesin_M = $history->mesin ?? 0;
                                if ($Eff_M > 0)
                                    $Z++;
                            }
                            // dd($Mtr_P, $Mtr_S, $Mtr_M);
                        }

                        // --- Mesin
                        $mesinList = DB::connection('ConnCircularMojosari')->table('VW_PRG_1273_CIR_Effisiensi')
                            ->select('Nama_mesin')
                            ->where('TGL_LOG', $order->Tgl_Log)
                            ->where('id_order', $order->Id_Order)
                            ->where('Id_Lokasi', '<>', 4)
                            ->groupBy('Nama_mesin')
                            ->orderBy('Nama_mesin')
                            ->pluck('Nama_mesin')
                            ->toArray();
                        // dd($mesinList);
                        $mesin = implode(' ', $mesinList);
                        $TotMesin = count($mesinList);
                        // dd($TotMesin, $mesin);
                        // --- Afalan WA & WE
                        $afalan = DB::connection('ConnCircularMojosari')->table('t_log_mesin')
                            ->selectRaw('SUM(Afalan_WA) as wa, SUM(Afalan_WE) as we')
                            ->where('Id_order', $order->Id_Order)
                            ->whereBetween('tgl_log', ['2004-07-02', $order->Tgl_Log])
                            ->first();
                        // dd($afalan);
                        $TAf_WA = $afalan->wa ?? 0;
                        $TAf_WE = $afalan->we ?? 0;
                        // dd($TAf_WA, $TAf_WE);
                        // dd($order);
                        // --- Sisa
                        $Sisa = $order->R_Jumlah_Order - ($order->A_Jumlah_Order - ($TAf_WA + $TAf_WE));
                        // dd($Sisa);

                        // dd($PanjangPotongan);
                        // --- Panjang Potongan dan ActualPc
                        if ($PanjangPotongan > 0) {
                            $PanjangPotong = $PanjangPotongan / 100;
                            $Sisa = round($order->R_Jumlah_Order - ($order->A_Jumlah_Order - (($TAf_WA * $PanjangPotong) + ($TAf_WE * $PanjangPotong))));
                            // dd($Sisa, $order->R_Jumlah_Order, $order->A_Jumlah_Order);
                            // dd($Sisa);
                            $PanjangPotongan = $PanjangPotong;
                            if ($order->A_Jumlah_Order > 0 && $PanjangPotong > 0) {
                                $ActualpC = $order->A_Jumlah_Order / $PanjangPotong;
                                $ActualPcPerHari = ($Mtr_P + $Mtr_S + $Mtr_M) / $PanjangPotong;
                            }
                        }

                        // --- Warna + PanjangPotongan
                        $Warna = $Warna . '/' . (string) $PanjangPotongan;
                        // dd($Warna);
                        // --- Rata-rata Effisiensi
                        $Rata_Eff = $Z > 0 ? ($Eff_P + $Eff_S + $Eff_M) / $Z : 0;
                        // dd($Rata_Eff);
                        // --- Estimasi TglFinish
                        if (($Mtr_P + $Mtr_S + $Mtr_M) > 0) {
                            $Mtr = round($Sisa / ($Mtr_P + $Mtr_S + $Mtr_M), 0);
                            if ($Mtr > -2190) {
                                $TglFinish = date('Y-m-d', strtotime($order->Tgl_Log . " +$Mtr days"));
                            }
                        }
                        // dd($TglFinish);
                        // --- Update T_Order
                        DB::connection('ConnCircularMojosari')->table('T_Order')
                            ->where('Id_Order', $order->Id_Order)
                            ->update(['R_Tgl_Selesai' => $TglFinish]);
                        // dd($order);
                        // dd((float)$ActualpC, (float)$ActualPcPerHari);
                        // --- Insert ke T_Laporan
                        if ($Rata_Eff > 0) {
                            DB::connection('ConnCircularMojosari')->table('T_Laporan')->insert([
                                'Tanggal' => $order->Tgl_Log,
                                'noOrder' => $noOrder,
                                'TglStart' => $order->A_Tgl_Start,
                                'Ukuran' => $ukuran,
                                'WA' => $Wa,
                                'WE' => $We,
                                'JnsBngWa' => $JnsBngWa, // Anda bisa isi sesuai logika
                                'JnsBngWe' => $JnsBngWe, // Anda bisa isi sesuai logika
                                'JmlBngWA' => 0,
                                'JmlBngWe' => 0,
                                'Denier' => $Denier,
                                'Warna' => $Warna,
                                'bahan' => $Bahan,
                                'Mesin' => $mesin,
                                'QtyORder' => $order->R_Jumlah_Order,
                                'ActualOrder' => $order->A_Jumlah_Order,
                                'JmlMesin' => $TotMesin,
                                'Mtr_P' => $Mtr_P,
                                'Kg_P' => $Kg_P,
                                'Eff_P' => $Eff_P,
                                'Mtr_S' => $Mtr_S,
                                'Kg_S' => $Kg_S,
                                'Eff_S' => $Eff_S,
                                'Mtr_M' => $Mtr_M,
                                'Kg_M' => $Kg_M,
                                'Eff_M' => $Eff_M,
                                'Sisa' => $Sisa,
                                'TglFinish' => $TglFinish,
                                'Afalan_WA' => (int) $TAf_WA,
                                'Afalan_WE' => (int) $TAf_WE,
                                'total_mtr' => $Mtr_P + $Mtr_S + $Mtr_M,
                                'total_kg' => $Kg_P + $Kg_S + $Kg_M,
                                'Rata_Eff' => $Rata_Eff,
                                'PanjangPotongan' => $PanjangPotongan,
                                'ActualPc' => (int) $ActualpC,
                                'ActualPcPerHari' => (int) $ActualPcPerHari,
                            ]);
                            $TotalPanjangPotong += $PanjangPotongan;
                            $TotalActualPc += $ActualpC;
                        }
                    }

                    // Inisialisasi variabel
                    $TEff_P = $TEff_S = $TEff_M = 0;
                    $JmlMesin_P = $JmlMesin_S = $JmlMesin_M = 0;
                    $Rata_P = $Rata_S = $Rata_M = 0;
                    $Z = 0;
                    $Rata_Eff = 0;

                    // Shift P
                    $dataP = DB::connection('ConnCircularMojosari')
                        ->table('VW_PRG_1273_CIR_HITUNG_HISTORY')
                        ->selectRaw('SUM(Effisiensi) as total_eff, COUNT(Id_mesin) as total_mesin')
                        ->where('Tgl_Log', $tgl)
                        ->where('Shift', 'P')
                        ->where('Effisiensi', '<>', 0)
                        ->first();

                    $TEff_P = $dataP->total_eff ?? 0;
                    $JmlMesin_P = $dataP->total_mesin ?? 0;
                    if ($TEff_P > 0) {
                        $Rata_P = $TEff_P / $JmlMesin_P;
                    }

                    // Shift S
                    $dataS = DB::connection('ConnCircularMojosari')
                        ->table('VW_PRG_1273_CIR_HITUNG_HISTORY')
                        ->selectRaw('SUM(Effisiensi) as total_eff, COUNT(Id_mesin) as total_mesin')
                        ->where('Tgl_Log', $tgl)
                        ->where('Shift', 'S')
                        ->where('Effisiensi', '<>', 0)
                        ->first();

                    $TEff_S = $dataS->total_eff ?? 0;
                    $JmlMesin_S = $dataS->total_mesin ?? 0;
                    if ($TEff_S > 0) {
                        $Rata_S = $TEff_S / $JmlMesin_S;
                    }

                    // Shift M
                    $dataM = DB::connection('ConnCircularMojosari')
                        ->table('VW_PRG_1273_CIR_HITUNG_HISTORY')
                        ->selectRaw('SUM(Effisiensi) as total_eff, COUNT(Id_mesin) as total_mesin')
                        ->where('Tgl_Log', $tgl)
                        ->where('Shift', 'M')
                        ->where('Effisiensi', '<>', 0)
                        ->first();

                    $TEff_M = $dataM->total_eff ?? 0;
                    $JmlMesin_M = $dataM->total_mesin ?? 0;
                    if ($TEff_M > 0) {
                        $Rata_M = $TEff_M / $JmlMesin_M;
                    }
                    // dd($TEff_P, $TEff_S, $TEff_M, $JmlMesin_P, $JmlMesin_S, $JmlMesin_M, $Rata_P, $Rata_S, $Rata_M);

                    // Hitung jumlah shift yang aktif
                    if ($JmlMesin_P > 0)
                        $Z++;
                    if ($JmlMesin_S > 0)
                        $Z++;
                    if ($JmlMesin_M > 0)
                        $Z++;

                    // Hitung rata-rata efisiensi
                    // dd($Rata_P, $Rata_S, $Rata_M, $Z);
                    $Rata_Eff = ($Rata_P + $Rata_S + $Rata_M) / $Z;
                    // dd($Rata_Eff, $Z);
                    $TotalActualPc = DB::connection('ConnCircularMojosari')
                        ->table('T_Laporan')
                        ->selectRaw('SUM(ActualPc) as TotalActualPc')
                        ->first();

                    $TotalActualPc = $TotalActualPc->TotalActualPc ?? 0;
                    // --- Hitung total summary
                    $summary = DB::connection('ConnCircularMojosari')->table('T_Laporan')
                        ->selectRaw('SUM(Total_Mtr) as SumTotalMtr, SUM(Total_kg) as SumTotalKg, SUM(Sisa) as SumSisa, SUM(ActualPcPerHari) as SumActualPcPerHari, SUM(QtyOrder) as SumQtyOrder, SUM(ActualOrder) as SumActualOrder')
                        ->first();
                    // dd($summary);
                    // --- Insert summary ke T_Laporan
                    DB::connection('ConnCircularMojosari')->table('T_Laporan')->insert([
                        'Tanggal' => $tgl,
                        'Mesin' => 'T O T A L : ',
                        'Eff_P' => $Rata_P,
                        'Eff_S' => $Rata_S,
                        'Eff_M' => $Rata_M,
                        'Rata_Eff' => $Rata_Eff,
                        'PanjangPotongan' => $TotalPanjangPotong,
                        'ActualPc' => (int) $TotalActualPc,
                        'Total_kg' => $summary->SumTotalKg ?? 0,
                        'Total_Mtr' => $summary->SumTotalMtr ?? 0,
                        'Sisa' => $summary->SumSisa ?? 0,
                        'ActualPcPerHari' => $summary->SumActualPcPerHari ?? 0,
                        'QtyOrder' => $summary->SumQtyOrder ?? 0,
                        'ActualOrder' => $summary->SumActualOrder ?? 0,
                    ]);

                    // --- Hapus dan proses T_Pemakaian_Benang
                    $ada = DB::connection('ConnCircularMojosari')->table('T_Pemakaian_Benang')
                        ->join('T_Mesin', 'T_Pemakaian_Benang.Mesin', '=', 'T_Mesin.Nama_mesin')
                        ->where('T_Mesin.Id_Lokasi', '<>', 4)
                        ->where('Tanggal', $tgl)
                        ->count();

                    $delData = false;
                    // dd($ada);
                    if ($ada > 0) {
                        $delData = DB::connection('ConnCircularMojosari')->table('T_Pemakaian_Benang')
                            ->where('Id_Lokasi', '<>', 4)
                            ->where('Tanggal', $tgl)
                            ->delete();
                        // dd($delData);
                        if ($delData) {
                            // dd($delData);
                            DB::connection('ConnCircularMojosari')->statement("EXEC SP_1273_CIR_PROSES_PAKAIBENANG_1 ?, ?", [(float) $Rata_Eff, $tgl]);
                            DB::connection('ConnCircularMojosari')->statement("EXEC SP_1273_CIR_PROSES_PAKAIBENANG_2 ?, ?", [(float) $Rata_Eff, $tgl]);
                            DB::connection('ConnCircularMojosari')->statement("EXEC SP_1273_CIR_PROSES_PAKAIBENANG_3 ?, ?", [(float) $Rata_Eff, $tgl]);
                        }
                    }


                    $messages[] = "PROSES SUDAH SELESAI";

                    // Jalankan stored procedure kedua
                    DB::connection('ConnCircularMojosari')->statement("EXEC SP_1273_CIR_CEK_HISTORY @Tanggal = ?", [$tgl]);

                    $result = DB::connection('ConnCircularMojosari')->select("EXEC SP_1273_CIR_CEK_HISTORY1 @Tanggal = ?", [$tgl]);
                    // dd($result);
                    if (!empty($result)) {
                        $status = $result[0]->Status ?? null;
                        // dd($status);
                        if ($status === 'B ') {
                            $messages[] = ' PROSES SUDAH BENAR, Meter dan Kg sudah sama dengan Effisiensi';
                        } elseif ($status === 'H ') {
                            $messages[] = ' PROSES salah Meternya tidak sama dengan Effisiensi !!..';
                        } elseif ($status === 'T ') {
                            $messages[] = ' PROSES salah Kg nya tidak sama dengan Effisiensi !!..';
                        } elseif ($status === 'HT') {
                            $messages[] = ' PROSES salah Meter dan Kg tidak sama dengan Effisiensi !!..';
                        }
                    } else {
                        $messages[] = 'Tidak ada data status ditemukan.';
                    }

                    return response()->json(['message' => $messages,]);
                } catch (\Exception $e) {
                    return response()->json(['error' => ['Terjadi kesalahan saat proses', $e->getMessage()],]);
                }
                break;

            case 'ProsesPerhitunganBerat':
                // $tanggal = $request->input('tanggal');
                // $shift = $request->input('shift');
                // dd($request->all());
                // try {
                //     // Eksekusi stored procedure
                //     DB::connection('ConnCircular')->statement('EXEC Sp_Proses_Berat @Tgl = ?, @Shift = ?', [
                //         $tanggal,
                //         $shift
                //     ]);

                //     // Setelah eksekusi
                //     // Tampilkan pesan sukses (misalnya menggunakan session flash message)
                //     return response()->json(['message' => 'Data sudah diproses!']);
                // } catch (\Exception $e) {
                //     // Tangani error
                //     return response()->json(['error' => 'Gagal memproses data: ' . $e->getMessage()]);
                // }
                $tanggal = $request->input('tanggal');
                $shift = $request->input('shift');

                try {
                    // Step 1: Ambil data utama untuk KCursor
                    $kursorData = DB::connection('ConnCircularMojosari')
                        ->table('T_Log_Mesin as log')
                        ->join('T_Premi as premi', 'log.Id_Premi', '=', 'premi.Id_premi')
                        ->join('T_Order as ord', 'log.Id_order', '=', 'ord.Id_order')
                        ->join('T_Mesin as mesin', 'log.Id_mesin', '=', 'mesin.Id_mesin')
                        ->select(
                            'premi.Id_premi',
                            'premi.Hasil_Meter',
                            'ord.Id_order',
                            'ord.A_n_warp',
                            'ord.A_n_weft',
                            'ord.JmlBngStrip'
                        )
                        ->whereDate('log.Tgl_Log', $tanggal)
                        ->where('log.Shift', $shift)
                        ->where('mesin.Id_Lokasi', '<>', 4)
                        ->groupBy('premi.Id_premi', 'premi.Hasil_Meter', 'ord.Id_order', 'ord.A_n_warp', 'ord.A_n_weft', 'ord.JmlBngStrip')
                        ->orderBy('premi.Id_premi')
                        ->get();

                    foreach ($kursorData as $row) {
                        $A = 0;
                        $Strip = 0;

                        // Step 2: Ambil properti barang
                        $barang = DB::connection('ConnCircularMojosari')->table('T_Order as o')
                            ->join('PURCHASE.dbo.Y_BARANG as b', DB::raw('isnull(b.KD_BRG, b.KD_BRG)'), '=', 'o.Kode_barang')
                            ->select('b.D_TEK1', 'b.D_TEK2', 'b.D_TEK3', 'b.D_TEK7', 'b.D_TEK8', 'b.D_TEK9')
                            ->where('b.NO_SUB_KATEGORI', '1097')
                            ->where('o.Id_order', $row->Id_order)
                            ->first();

                        if (!$barang)
                            continue;

                        // Step 3: Konversi dan kalkulasi
                        $Lbr = (float) $barang->D_TEK1;
                        $RWa = (float) $barang->D_TEK2;
                        $RWe = (float) $barang->D_TEK3;
                        $Jenis = strtoupper($barang->D_TEK7 ?? '');
                        $LRf = (float) $barang->D_TEK8;
                        $JRf = (float) $barang->D_TEK9;

                        $Mtr = (float) $row->Hasil_Meter;
                        $DWa = (float) $row->A_n_warp;
                        $DWe = (float) $row->A_n_weft;
                        $JStrip = (float) $row->JmlBngStrip;

                        $Brt = ($Lbr * $Mtr * 100 * (($RWa * $DWa) + ($RWe * $DWe))) / 1143000 / 1000;
                        $Reinf = ($JRf * $LRf * $RWa * $DWa * $Mtr) / 22860 / 1000;

                        // Step 4: Hitung Strip jika ada
                        if ($JStrip > 0) {
                            // $benangList = DB::connection('ConnCircularMojosari')->table('T_Benang_Strip as bs')
                            //     ->join('VW_TYPE_BENANG as vb', 'bs.Kd_Brg', '=', 'vb.KD_BRG')
                            //     ->where('bs.Id_Order', $row->Id_order)
                            //     ->select('bs.JmlBng', 'vb.D_TEK2')
                            //     ->get();
                            $benangList = DB::connection('ConnCircularMojosari')
                                ->table('T_Benang_Strip as bs')
                                ->join('PURCHASE.dbo.Y_BARANG as yb', 'bs.Kd_Brg', '=', 'yb.KD_BRG')
                                ->where('yb.NO_SUB_KATEGORI', '1474')
                                ->where('bs.Id_Order', $row->Id_order)
                                ->select('bs.JmlBng', 'yb.D_TEK2')
                                ->get();

                            foreach ($benangList as $benang) {
                                $VDBng = $benang->D_TEK2;
                                $JBng = (float) $benang->JmlBng;

                                $DBngMap = [
                                    '60' => 600,
                                    '65' => 650,
                                    '70' => 700,
                                    '75' => 750,
                                    '80' => 800,
                                    '85' => 850,
                                    '90' => 900,
                                    'A0' => 1000,
                                    'F0' => 1500,
                                    'IO' => 1800,
                                    'K0' => 200,
                                    'L0' => 2100
                                ];

                                $DBng = $DBngMap[$VDBng] ?? 0;
                                $XStrip = ($JBng * $DBng * $Mtr) / 9000 / 1000;
                                $Strip += $XStrip;
                            }

                            $A = (($JStrip * $DWa * $Mtr) / 9000) / 1000;
                        }

                        // Step 5: Final hitung berat
                        if (str_starts_with($Jenis, 'BELAH') || str_starts_with($Jenis, 'FLAT')) {
                            $Kg = (($Brt / 2) - $A) + $Reinf + $Strip;
                        } else {
                            $Kg = ($Brt - $A) + $Reinf + $Strip;
                        }

                        // Step 6: Update ke T_Premi
                        DB::connection('ConnCircularMojosari')->table('T_Premi')
                            ->where('Id_Premi', $row->Id_premi)
                            ->update([
                                'Hasil_Kg' => $Kg,
                                'Kalkulasi_Kg' => Carbon::now()
                            ]);
                    }

                    return response()->json(['message' => 'Data sudah diproses!']);
                } catch (\Exception $e) {
                    return response()->json(['error' => 'Gagal memproses data: ' . $e->getMessage()]);
                }
                break;

            case 'ProsesMaintenanceKodePegawai':
                $rowDataArray = $request->input('rowDataArray', []);
                $kode_pegawaiNew = $request->input('kode_pegawaiNew');
                // dd($request->all());
                try {
                    foreach ($rowDataArray as $item) {
                        // dd($item);
                        DB::connection('ConnCircularMojosari')->statement('EXEC SP_1273_CIR_UPDATE_PEGAWAI @IdLog = ?, @IdKaryawanOld = ?, @IdKaryawanNew = ?', [
                            $item['Id_Log'],
                            $item['Id_karyawan'],
                            $kode_pegawaiNew,
                        ]);

                    }
                    return response()->json(['message' => 'Kode pegawai berhasil diupdate']);

                } catch (\Exception $e) {
                    return response()->json(['error' => 'Gagal memproses data: ' . $e->getMessage()]);
                }

                break;

            case 'ProsesMaintenanceOrderAktif':

                try {
                    $namaBarang = $request->input('orderBaru');
                    $meterPanen = $request->input('meterPanen');
                    $idMesin = $request->input('id_mesin');
                    $idOrder = $request->input('id_orderBaru');
                    $userId = trim(Auth::user()->NomorUser);
                    // dd($request->all());

                    // Jika meter panen kosong, set 0
                    if ($meterPanen === null || $meterPanen === '') {
                        $meterPanen = 0;
                    }

                    // Eksekusi stored procedure
                    DB::connection('ConnCircularMojosari')
                        ->statement(
                            'exec SP_1273_CIR_Maint_Mesin @Kode = ?, @IdMesin = ?, @IdOrder = ?, @MeterPanen = ?, @IdUser = ?',
                            [4, $idMesin, $idOrder, $meterPanen, $userId]
                        );

                    // Setelah berhasil, kembalikan respon sukses
                    return response()->json(['message' => 'Data berhasil diproses.']);

                } catch (\Exception $e) {
                    return response()->json(['error' => 'Gagal memproses data: ' . $e->getMessage()]);
                }

                break;

            default:
                return response()->json([
                    'message' => 'Tidak ada jenis proses yang sesuai.',
                ]);
        }

        return response()->json([
            'message' => 'Transaksi berhasil disimpan'
        ]);
    }

    public function show(Request $request, $id)
    {
        if ($id == 'getTanggal') {
            $kode = $request->input('kode');
            // dd($kode);
            if (!in_array($kode, [1, 2])) {
                return response()->json(['error' => 'Kode tidak valid']);
            }
            // dd($kode);
            $results = DB::connection('ConnCircularMojosari')
                ->select('exec SP_1273_CIR_List_ProsesMeter @Kode = ?', [trim($kode)]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $shift = trim($row->Shift);
                $ketShift = '';

                if ($shift == 'P') {
                    $ketShift = 'agi';
                } else if ($shift == 'S') {
                    $ketShift = 'ore';
                } else if ($shift == 'M') {
                    $ketShift = 'alam';
                }

                $response[] = [
                    'Tgl_Log' => Carbon::parse($row->Tgl_Log)->format('m/d/Y'),
                    'Tgl_Log_raw' => Carbon::parse($row->Tgl_Log)->format('Y-m-d'),
                    // 'Tgl_Log' => $row->Tgl_Log,
                    'Shift' => $shift,
                    'KetShift' => $ketShift,
                ];
            }
            // dd($response);

            return datatables($response)->make(true);

        } else if ($id == 'tampilData') {
            $tanggal = $request->input('tanggal');
            $shift = $request->input('shift');
            // dd($tanggal, $shift);

            if (!$tanggal || !$shift) {
                return response()->json(['error' => 'Parameter tanggal dan shift wajib diisi.']);
            }

            $results = DB::connection('ConnCircularMojosari')->select(
                'EXEC SP_1273_CIR_List_ProsesMeter @Kode = ?, @Tanggal = ?, @Shift = ?',
                [3, $tanggal, $shift]
            );

            // dd($results);
            $response = [];
            $lastIdPremi = '';
            $i = 0;

            foreach ($results as $row) {
                $namaBrg = trim($row->NAMA_BRG);
                $ukuran = '';
                $rajutan = '';
                $we = '';
                $jum = 0;

                for ($j = 0; $j < strlen($namaBrg); $j++) {
                    if ($namaBrg[$j] == '/') {
                        $jum++;
                        if ($jum == 1) {
                            $ukuran = substr($namaBrg, $j + 1, 6);
                        } elseif ($jum == 2) {
                            $we = substr($namaBrg, $j + 9, 5);
                            $rajutan = substr($namaBrg, $j + 1, 13);
                            break;
                        }
                    }
                }

                $rowData = [
                    'Id_Log' => $row->Id_Log,
                    'Nama_Mesin' => $row->Nama_mesin,
                    'Ukuran' => $ukuran,
                    'Rajutan' => $rajutan,
                    'A_rpm' => $row->A_rpm,
                    'A_n_shutle' => $row->A_n_shutle,
                    'Keterangan' => $row->Keterangan,
                    'Counter_Mesin_Awal' => number_format($row->Counter_mesin_awal, 0),
                    'Counter_Mesin_Akhir' => number_format($row->Counter_mesin_akhir, 0),
                    'Awal_Jam_Kerja' => Carbon::parse($row->Awal_jam_kerja)->format('H:i'),
                    'Akhir_Jam_Kerja' => Carbon::parse($row->Akhir_jam_kerja)->format('H:i'),
                    'Hasil_Kg' => trim($row->Hasil_Kg) ?? "",
                ];

                if ($lastIdPremi != $row->Id_Premi) {
                    $rowData['Hasil_meter'] = number_format($row->Hasil_Meter, 0);
                    $rowData['Effisiensi'] = number_format($row->Effisiensi, 2) . ' %';
                    // dd($row->Effisiensi);
                } else {
                    $rowData['Hasil_meter'] = '';
                    $rowData['Effisiensi'] = '';
                }

                // Penandaan warna merah jika effisiensi <= 10 atau >= 99
                $rowData['Highlight'] = ($row->Effisiensi <= 10 || $row->Effisiensi >= 99);

                $lastIdPremi = $row->Id_Premi;
                $response[] = $rowData;
                $i++;
            }
            // dd($response);

            return datatables($response)->make(true);
        } else if ($id == 'getBulan') {
            $tahun = $request->input('tahun');
            if (empty($tahun)) {
                return response()->json(['error' => 'Tahun harus diisi']);
            }

            $results = DB::connection('ConnCircularMojosari')->select(
                'exec SP_1273_CIR_List_Bulan @Kode = ?, @Tahun = ?',
                [2, trim($tahun)]
            );

            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Nama_Bulan' => $row->Nama_Bulan ?? '',
                    'Id_Bulan' => $row->Id_Bulan ?? '',
                ];
            }
            // dd($response);
            return datatables($response)->make(true);

        } else if ($id == 'getTanggalProsesBerat') {
            $bulan = $request->input('id_bulan');
            $tahun = $request->input('tahun');

            if (empty($bulan) || empty($tahun)) {
                return response()->json(['error' => 'Bulan dan Tahun harus diisi']);
            }

            $results = DB::connection('ConnCircularMojosari')->select(
                'exec SP_1273_CIR_LIST_BERAT @Kode = ?, @Bln = ?, @Thn = ?',
                [1, trim($bulan), trim($tahun)]
            );

            $response = collect($results)->map(function ($row) {
                return [
                    'Shift' => $row->Shift ?? '',
                    'Tgl_Log' => Carbon::parse($row->Tgl_Log)->format('m/d/Y'),
                    'Tgl_Log_raw' => Carbon::parse($row->Tgl_Log)->format('Y-m-d'),
                ];
            });

            if ($response->isEmpty()) {
                return response()->json(['error' => 'Data tidak ditemukan']);
            }
            // dd($response);
            return datatables($response)->make(true);
        } else if ($id == 'getListBerat') {
            $tanggal = $request->input('tanggal');
            $shift = $request->input('shift');

            if (!$tanggal || !$shift) {
                return response()->json(['error' => 'Tanggal dan Shift wajib diisi']);
            }

            try {
                $results = DB::connection('ConnCircularMojosari')
                    ->select('exec SP_1273_CIR_LIST_BERAT @Kode = ?, @Tanggal = ?, @Shift = ?', [
                        2,
                        $tanggal,
                        $shift
                    ]);
                // dd($results);

                $response = [];
                foreach ($results as $row) {
                    $response[] = [
                        'Id_Premi' => $row->Id_premi ?? '',
                        'Nama_Mesin' => $row->Nama_mesin ?? '',
                        'Nama_Brg' => $row->NAMA_BRG ?? '',
                        'Hasil_meter' => $row->Hasil_Meter ?? '',
                        'Hasil_Kg' => $row->Hasil_Kg ?? ''
                    ];
                }

                return datatables($response)->make(true);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Gagal mengambil data: ' . $e->getMessage()]);
            }
        } else if ($id == 'getPegawaiOld') {
            // dd('masuk');
            $shift = trim($request->input('shift'));
            $tanggal = $request->input('tanggal');

            // if (!$shift || !$tanggal) {
            //     return response()->json(['error' => 'Shift dan Tanggal wajib diisi']);
            // }

            $results = DB::connection('ConnCircularMojosari')->select(
                'exec SP_1273_CIR_List_LogPegawai_Shift @Kode = ?, @Shift = ?, @Tanggal = ?',
                [1, $shift, $tanggal]
            );
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Nama_Peg' => $row->Nama_Peg,
                    'Id_karyawan' => $row->Id_karyawan,
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getLogPegawai') {
            $tanggal = $request->input('tanggal');
            $shift = $request->input('shift');
            $kdPegawai = trim($request->input('kode_pegawai'));
            // dd($tanggal, $shift, $kdPegawai);
            // if (!$tanggal || !$shift || !$kdPegawai) {
            //     return response()->json(['error' => 'Tanggal, Shift, dan Kode Pegawai wajib diisi']);
            // }

            $results = DB::connection('ConnCircularMojosari')->select(
                'exec SP_1273_CIR_LIST_LOG_PEGAWAI @Tanggal = ?, @Shift = ?, @KdPegawai = ?',
                [$tanggal, $shift, $kdPegawai]
            );
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Id_Log' => $row->Id_Log,
                    'Nama_mesin' => $row->Nama_mesin,
                    'Keterangan' => $row->Keterangan,
                    'Id_karyawan' => $row->Id_karyawan,
                    'Nama_Peg' => $row->Nama_Peg,
                ];
            }

            return datatables($response)->make(true);

        } else if ($id == 'getPegawaiNew') {
            // $shift = trim($request->input('shift'));
            // $tanggal = $request->input('tanggal');

            // if (!$shift || !$tanggal) {
            //     return response()->json(['error' => 'Shift dan Tanggal wajib diisi']);
            // }

            $results = DB::connection('ConnCircularMojosari')->select(
                'exec SP_1273_CIR_List_LogPegawai_Shift @Kode = ?',
                [2]
            );
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Nama_Peg' => $row->Nama_Peg,
                    'Kd_Pegawai' => $row->Kd_Pegawai,
                ];
            }

            return datatables($response)->make(true);

        } else if ($id == 'getTypeMesin') {
            $kode = 1;

            $results = DB::connection('ConnCircularMojosari')
                ->select('exec SP_1273_CIR_List_TypeMesin @Kode = ?', [$kode]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Type_Mesin' => trim($row->Type_Mesin),
                    'IdType_Mesin' => trim($row->IdType_Mesin)
                ];
            }

            return datatables($response)->make(true);

        } else if ($id == 'getListMesin') {
            $idTypeMesin = $request->input('id_typeMesin');

            $results = DB::connection('ConnCircularMojosari')
                ->select('exec SP_1273_CIR_List_Mesin @Kode = ?, @IdType_Mesin = ?', [8, $idTypeMesin]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Id_mesin' => trim($row->Id_mesin),
                    'Nama_mesin' => trim($row->Nama_mesin),
                    'Id_order' => $row->Id_order ?? '',
                    'Nama_Barang' => !empty($row->Id_order) ? trim($row->Nama_Barang) : 'Tidak Ada Order',
                    'MeterPanen' => $row->MeterPanen ?? 0
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getMesin') {
            // Pertama ambil list mesin berdasarkan IdType_Mesin
            $idTypeMesin = $request->input('id_typeMesin');

            $listMesin = DB::connection('ConnCircularMojosari')
                ->select('exec SP_1273_CIR_List_Mesin @Kode = ?, @IdType_Mesin = ?', [3, $idTypeMesin]);
            // dd($listMesin);
            $response = [];
            foreach ($listMesin as $row) {
                $response[] = [
                    'Nama_mesin' => trim($row->Nama_mesin),
                    'Id_mesin' => trim($row->Id_mesin)
                ];
            }

            return datatables($response)->make(true);

        } else if ($id == 'getDetailMesin') {
            // Ambil detail mesin berdasarkan IdMesin
            $idMesin = $request->input('id_mesin');

            $detailMesin = DB::connection('ConnCircularMojosari')
                ->select('exec SP_1273_CIR_List_Mesin @Kode = ?, @IdMesin = ?', [4, $idMesin]);
            // dd($detailMesin);
            $response = [];
            foreach ($detailMesin as $row) {
                $response[] = [
                    'Id_Order' => $row->Id_Order,
                    'nama_order' => $row->nama_order,
                    'MeterPanen' => $row->MeterPanen ?? 0
                ];
            }

            return response()->json($response);

        } else if ($id == 'getOrder') {
            // Ambil list order untuk lookup
            $results = DB::connection('ConnCircularMojosari')
                ->select('exec SP_1273_CIR_List_Order @Kode = ?', [4]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Nama_Barang' => trim($row->Nama_Barang),
                    'Id_order' => trim($row->Id_order)
                ];
            }

            return datatables($response)->make(true);

        } else if ($id == 'getDetailOrder') {
            // Ambil detail order berdasarkan IdOrder
            $idOrder = $request->input('id_orderBaru');

            $results = DB::connection('ConnCircularMojosari')
                ->select('exec SP_1273_CIR_List_Order @Kode = ?, @IdOrder = ?', [13, $idOrder]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'MeterPanen' => $row->MeterPanen ?? 0
                ];
            }

            return response()->json($response);
        } elseif ($id == 'getOrder1') {
            $results = DB::connection('ConnCircularMojosari')->select(
                "SELECT DISTINCT TOP 100 v.KD_BRG as Kode_Barang,
                        v.NAMA_BRG as Nama_Barang, v.Id_order as Id_Order
                    FROM VW_CIR_4384_Select_Torder_Ybarang AS v
                    WHERE v.id_lokasi <> 4
                    ORDER BY v.Id_order DESC",
                []
            );

            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Nama_Barang' => trim($row->Nama_Barang),
                    'Id_Order' => trim($row->Id_Order),
                    'Kode_Barang' => trim($row->Kode_Barang),
                ];
            }

            return datatables($response)->make(true);

        } else if ($id == 'getOrder2') {
            $results = DB::connection('ConnCircularMojosari')->select(
                'EXEC SP_4384_CIR_Check_GudangOrder1 @XKode = ?',
                [6]
            );
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'idsuratpesanan' => trim($row->idsuratpesanan),
                    'id_order' => trim($row->id_order),
                    'Kode_barang_asal' => trim($row->Kode_barang_asal),
                    'kode_barang_tujuan' => trim($row->kode_barang_tujuan),
                    'Roll_order' => trim($row->Roll_order),
                    'Meter_order' => trim($row->Meter_order),
                    'Meter_produksi' => trim($row->Meter_produksi),
                    'Roll_produksi' => trim($row->Roll_produksi),
                    'Nama_brg_asal' => trim($row->Nama_brg_asal),
                    'Nama_brg_tujuan' => trim($row->Nama_brg_tujuan),
                    'Status' => trim($row->Status)
                ];
            }

            return datatables($response)->make(true);

        } else if ($id == 'getOrder2Details') {
            $noSp = trim($request->input('txtNoSP'));
            $response = DB::connection('ConnCircularMojosari')->select(
                'EXEC SP_4384_CIR_Check_GudangOrder1 @XKode = ?, @XNo_Sp = ?',
                [7, $noSp]
            );
            // dd($response);
            return response()->json($response);

        } else if ($id == 'getOrder3') {
            $results = DB::connection('ConnCircularMojosari')->select(
                'EXEC SP_4384_CIR_Check_GudangOrder1 @XKode = ?',
                [10]
            );
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'idsuratpesanan' => trim($row->idsuratpesanan),
                    'id_order' => trim($row->id_order),
                ];
            }

            return datatables($response)->make(true);

        } else if ($id == 'getKodeTujuanSP') {
            $results = DB::connection('ConnCircularMojosari')->select(
                "SELECT DISTINCT TOP 100 v.kodebarang as Kode_Barang,
                        v.nama_brg as Nama_Barang, v.IDSuratPesanan as Id_Sp
                    FROM VW_CIR_4384_SELECT_TDETAILPESANAN_YBARANG AS v
                    ORDER BY v.IDSuratPesanan DESC",
                []
            );

            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Kode_Barang' => trim($row->Kode_Barang),
                    'Nama_Barang' => trim($row->Nama_Barang),
                    'Id_Sp' => trim($row->Id_Sp),
                ];
            }

            return datatables($response)->make(true);

        } else if ($id == 'getNoSp') {
            $kodeBarangTujuan = trim($request->input('txtKodeTujuan'));

            $results = DB::connection('ConnCircularMojosari')
                ->select('EXEC SP_4384_CIR_Check_GudangOrder1 @XKode = ?, @XKodeBrgTujuan = ?', [9, $kodeBarangTujuan]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Id_sp' => trim($row->Id_sp ?? ''),
                    'Nama_Barang' => trim($row->Nama_Barang ?? ''),
                ];
            }

            return datatables($response)->make(true);

        } else if ($id == 'getLaporanExcel') {
            $results = DB::connection('ConnCircularMojosari')
                ->table('T_Laporan')
                ->select('*')
                ->get();

            return response()->json($results);
            // return datatables($results)->make(true);
        } else if ($id == 'HasilKgLogMesin') {
            // dd($request->all());
            $idOrder = $request->input('txtIdOrder');
            $txtCounterAwal = floatval($request->input('txtCounterAwal', 0));
            $txtCounterAkhir = floatval($request->input('txtCounterAkhir', 0));
            $hasilMeter = floatval($txtCounterAkhir - $txtCounterAwal);
            $user = trim(Auth::user()->NomorUser);
            $idLog = $request->input('slcIdLog');
            // dd($idOrder, $txtCounterAwal, $txtCounterAkhir, $hasilMeter);
            $kdBrg = DB::connection('ConnCircularMojosari')->table('T_Order')->where('Id_Order', $idOrder)->value('Kode_Barang');
            $vw = DB::connection('ConnCircularMojosari')->table('VW_Type_Barang')->where('Kd_Brg', $kdBrg)->first();
            $ukuran = floatval($vw->D_TEK1 ?? 0);
            $waft = floatval($vw->D_TEK2 ?? 0);
            $weft = floatval($vw->D_TEK3 ?? 0);
            $denier = intval($vw->D_TEK4 ?? 0);
            $ket = $vw->D_TEK7 ?? '';
            $lReinf = intval($vw->D_TEK8 ?? 0);
            $jReinf = intval($vw->D_TEK9 ?? 0);

            // Penyesuaian denier WA dan WE
            $dwa = $denier;
            $dwe = $denier;
            // dd($dwa);
            // Mapping Denier Khusus
            switch ($denier) {
                case 1800:
                    $dwa = 2000;
                    $dwe = 1600;
                    break;
                case 1750:
                    $dwa = 2000;
                    $dwe = 1500;
                    break;
                case 1500:
                    $dwa = 1500;
                    $dwe = 1500;
                    break;
                case 950:
                    $dwa = 1000;
                    $dwe = 900;
                    break;
                case 850:
                    $dwa = 900;
                    $dwe = 800;
                    break;
            }
            // Perhitungan berat (Kg)
            $berat = ($ukuran * $hasilMeter * 100 * (($waft * $dwa) + ($weft * $dwe))) / 1143000 / 1000;
            // dd($berat);
            $reinforc = ($lReinf * $jReinf * $waft * $dwa) / (1143000 * 2) / 1000;
            $kg = 0;

            if (stripos($ket, 'BELAH') !== false || stripos($ket, 'FLAT') !== false) {
                if ($hasilMeter > 0) {
                    $kg = ($berat / 2) + $reinforc;
                }
            } else {
                if ($hasilMeter > 0) {
                    $kg = $berat + $reinforc;
                }
            }

            $idLogMesin = DB::connection('ConnCircularMojosari')
                ->table('T_Log_Mesin')
                ->where('Id_User', $user)
                ->orderBy('Id_Log', 'desc')
                ->value('Id_Log');

            if ($idLog == null || $idLog == '') {
                DB::connection('ConnCircularMojosari')->table('T_Log_Mesin')
                    ->where('Id_Log', $idLogMesin)
                    ->update([
                        'Hasil_Kg' => $kg
                    ]);
            } else {
                DB::connection('ConnCircularMojosari')->table('T_Log_Mesin')
                    ->where('Id_Log', $idLog)
                    ->update([
                        'Hasil_Kg' => $kg
                    ]);
            }

        } else if ($id == 'getDataHasilKg') {
            $tgl_awal = $request->input('tgl_awal');
            $tgl_akhir = $request->input('tgl_akhir');
            // dd($request->all());
            // $type_kain = $request->input('type_kain');
            $results = DB::connection('ConnCircularMojosari')
                ->select('EXEC SP_4451_KegiatanMesin @Kode = ?, @tgl_awal = ?, @tgl_akhir = ?, @shift = ?', [1, $tgl_awal, $tgl_akhir, $request->input('shift')]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Tgl_Log' => Carbon::parse($row->Tgl_Log)->format('m/d/Y'),
                    'tanggal_raw' => Carbon::parse($row->Tgl_Log)->format('Y-m-d'),
                    'Id_Log' => trim($row->Id_Log),
                    'Keterangan' => trim($row->Keterangan),
                    'Shift' => match (trim($row->Shift)) {
                        'S' => 'Sore',
                        'P' => 'Pagi',
                        'M' => 'Malam',
                        default => ''
                    },
                    'Nama_mesin' => trim($row->Nama_mesin) ?? "",
                    'Id_order' => trim($row->Id_order) ?? "",
                    'Kode_barang' => trim($row->Kode_barang),
                    'Hasil_Meter' => floatval($row->Counter_mesin_akhir-$row->Counter_mesin_awal) ?? "",
                    'Hasil_Kg' => trim($row->Hasil_Kg) ?? "",
                ];
            }
            // dd($response);
            return datatables($response)->make(true);

        }
    }

    public function spOrder($sp_str, $sp_data = null)
    {
        if ($sp_data != null) {
            $sp_data = explode('~', $sp_data);
        } else
            $sp_data = [];

        if (strpos($sp_str, 'SP_4384_CIR_Check_GudangOrder1') !== false)
            $sp_param = '@XKode = ' . explode('~', $sp_str)[1];

        $user = trim(Auth::user()->NomorUser);
        switch ($sp_str) {

            #region formOrderMaster

            case 'SP_1273_CIR_List_Order~2':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @IdOrder = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircularMojosari');

            case 'SP_1273_CIR_List_Order~5':
            case 'SP_1273_CIR_List_Order~6':
            case 'SP_1273_CIR_List_Order~7':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @KdOrder = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircularMojosari');

            case 'SP_1273_CIR_List_Order~8':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1];
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircularMojosari');

            case 'SP_1273_CIR_MAINT_ORDER~1':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @KodeBarang = ?, @RTglStart = ?, @RTglSelesai = ?, @RJumlahOrder = ?, @AWarp = ?, @AWeft = ?, @AKdBrgWarp = ?, @AKdBrgWeft = ?, @JmlBngStrip = ?, @Effisiensi = ?, @PanjangPotong = ?';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircularMojosari');

            case 'SP_1273_CIR_MAINT_ORDER~2':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @IdOrder = ?, @RTglStart = ?, @RTglSelesai = ?, @RJumlahOrder = ?, @AWarp = ?, @AWeft = ?, @AKdBrgWarp = ?, @AKdBrgWeft = ?, @JmlBngStrip = ?, @Effisiensi = ?, @PanjangPotong = ?';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircularMojosari');

            case 'SP_1273_CIR_MAINT_ORDER~3':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @IdOrder = ?';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircularMojosari');

            case 'SP_1273_CIR_MAINT_ORDER~4':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @Id_Order = ?, @IDDetail = ?';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircularMojosari');

            #endregion

            #region formOrderGudang

            case 'SP_4384_CIR_Check_GudangOrder1~1':
                $sp_param .= ', @XIdOrder = ?, @XIdLokasi = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircularMojosari');

            case 'GET_ORDER_DAN_BARANG_ASAL':
                return DB::connection('ConnCircularMojosari')->select(
                    "SELECT DISTINCT TOP 100 v.KD_BRG as Kode_Barang,
                        v.NAMA_BRG as Nama_Barang, v.Id_order as Id_Order
                    FROM VW_CIR_4384_Select_Torder_Ybarang AS v
                    WHERE v.id_lokasi <> 4
                    ORDER BY v.Id_order DESC",
                    []
                );

            case 'GET_PESANAN_DAN_BARANG_TUJUAN':
                return DB::connection('ConnCircularMojosari')->select(
                    "SELECT DISTINCT TOP 100 v.kodebarang as Kode_Barang,
                        v.nama_brg as Nama_Barang, v.IDSuratPesanan as Id_Sp
                    FROM VW_CIR_4384_SELECT_TDETAILPESANAN_YBARANG AS v
                    ORDER BY v.IDSuratPesanan DESC",
                    []
                );

            case 'SP_4384_CIR_Check_GudangOrder1~2':
                $sp_param .= ', @XKodeBrgAsal = ?, @XIdLokasi = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircularMojosari');

            case 'SP_4384_CIR_Check_GudangOrder1~3':
                $sp_data[1] = str_replace("|", "/", $sp_data[1]);
                $sp_param .= ', @XIdOrder = ?, @XNo_Sp = ?, @XKodeBrgAsal = ?, @XKodeBrgTujuan = ?, @XRollOrder = ?, @XMeterOrder = ?, @XRollProduksi = ?, @XMeterProduksi = ?, @XTimeinput = ?, @XLokasi = ?';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircularMojosari');

            case 'SP_4384_CIR_Check_GudangOrder1~4':
                $sp_data[1] = str_replace("|", "/", $sp_data[1]);
                $sp_param .= ', @XIdOrder = ?, @XNo_Sp = ?, @XRollOrder = ?, @XMeterOrder = ?, @XRollproduksi = ?, @XMeterproduksi = ?, @XStatus = ?, @XTimekoreksi = ?, ';
                if (count($sp_data) >= 9)
                    $sp_param .= '@XTimenonaktif = ?';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircularMojosari');

            case 'SP_4384_CIR_Check_GudangOrder1~5':
                $sp_data[1] = str_replace("|", "/", $sp_data[1]);
                $sp_param .= ', @XIdOrder = ?, @XNo_Sp = ?';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircularMojosari');

            case 'SP_4384_CIR_Check_GudangOrder1~6':
            case 'SP_4384_CIR_Check_GudangOrder1~10':
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircularMojosari');

            case 'SP_4384_CIR_Check_GudangOrder1~7':
                $sp_param .= ', @XIdOrder = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircularMojosari');

            case 'SP_4384_CIR_Check_GudangOrder1~8':
                $sp_data[1] = str_replace("|", "/", $sp_data[0]);
                $sp_param .= ', @XNo_Sp = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircularMojosari');

            case 'SP_4384_CIR_Check_GudangOrder1~9':
                $sp_param .= ', @XKodeBrgTujuan = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircularMojosari');

            #endregion

            #region modalBenang

            case 'SP_1273_CIR_List_Benang~1':
            case 'SP_1273_CIR_List_Benang~2':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @Id_Order = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircularMojosari');
            case 'SP_1273_CIR_MAINT_BENANG~1':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @Kd_Brg = ?, @Ket = ?, @jml = ?';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircularMojosari');

            case 'SP_1273_CIR_MAINT_BENANG~2':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @Kd_Brg = ?, @IdDetail = ?, @jml = ?';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircularMojosari');

            case 'SP_1273_CIR_MAINT_BENANG~3':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @IdDetail = ?';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircularMojosari');

            case 'GET_ID_DETAIL_BENANG':
                return DB::connection('ConnCircularMojosari')->select(
                    'SELECT TOP 1 IdDetail FROM T_Benang_Strip ORDER BY IdDetail DESC'
                );

            case 'SP_1273_CIR_LIST_SUBKATEGORI':
                $sp_param = '';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircularMojosari');

            #endregion

            #region formOrderAktif

            case 'SP_1273_CIR_List_TypeMesin~1':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1];
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircularMojosari');

            case 'Sp_List_Mesin~3':
            case 'Sp_List_Mesin~8':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @IdType_Mesin = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'SP_1273_CIR_List_Mesin~2':
            case 'SP_1273_CIR_List_Mesin~4':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @IdMesin = ?';
                // dd($sp_param, $sp_data);
                // dd($this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircularMojosari'));
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircularMojosari');

            case 'SP_1273_CIR_LIST_LogMesin~6':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @IdMesin = ?, @IdOrder = ?, @Shift = ?';
                // dd($sp_param);
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircularMojosari');

            case 'Sp_List_Order~13':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @IdOrder = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'Sp_List_Order~14':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1];
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'Sp_Maint_Mesin~4':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @IdMesin = ?, @IdOrder = ?, @MeterPanen = ?, @IdUser = 4384';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            #endregion

            #region formOrderStop

            case 'SP_1273_CIR_Akhir_Order':
                $sp_param = '@TglSelesai = ?, @IdOrder = ?';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircularMojosari');

            #endregion

            #region formKegiatanMesin

            case 'SP_1273_CIR_Transfer_Pegawai':
                try {
                    // Define your date parameters
                    $tanggal1 = $sp_data[0];
                    $tanggal2 = $sp_data[1];

                    // Start a transaction
                    DB::connection('ConnCircularMojosari')->beginTransaction();

                    // Step 1: Delete existing records from T_PEGAWAI
                    DB::connection('ConnCircularMojosari')->table('T_PEGAWAI')->delete();

                    // Step 2: Fetch data from the view
                    $data = DB::connection('ConnCircularMojosari')
                        ->table('PAY_MOJOSARI.dbo.VW_PRG_1273_CIR_SHIFT_PEGAWAI_MOJOSARI')
                        ->select('Tanggal', 'Nama_Div', 'Kd_Pegawai', 'nama_peg', 'shift')
                        ->whereBetween('Tanggal', [$tanggal1, $tanggal2])
                        ->orderBy('Tanggal')
                        ->orderBy('Kd_Pegawai')
                        ->get();

                    // Step 3: Insert data into T_PEGAWAI and count the number of affected rows
                    $affectedRows = 0;
                    foreach ($data as $row) {
                        $inserted = DB::connection('ConnCircularMojosari')->table('T_PEGAWAI')->insert([
                            'Tanggal' => $row->Tanggal,
                            'Nama_Div' => $row->Nama_Div,
                            'Kd_Pegawai' => $row->Kd_Pegawai,
                            'nama_peg' => $row->nama_peg,
                            'shift' => $row->shift
                        ]);
                        if ($inserted) {
                            $affectedRows++;
                        }
                    }

                    // Commit the transaction
                    DB::connection('ConnCircularMojosari')->commit();

                    // Return the number of affected rows
                    return $affectedRows;
                } catch (QueryException $e) {
                    // Rollback the transaction in case of an error
                    DB::connection('ConnCircular')->rollBack();

                    // Log the error
                    Log::error('Data transfer failed: ' . $e->getMessage());

                    // Return an error message or perform other error handling actions
                    return 'Data transfer failed: ' . $e->getMessage();
                }

            case 'SP_1273_CIR_List_Log_Mesin_PerLog':
                $query = "
                    SELECT KARYAWAN.nama_peg,
                        dbo.VW_PRG_1273_CIR_Log_Mesin_Blm_Selesai.Id_Log,
                        dbo.VW_PRG_1273_CIR_Log_Mesin_Blm_Selesai.Tgl_Log,
                        dbo.VW_PRG_1273_CIR_Log_Mesin_Blm_Selesai.Shift,
                        dbo.VW_PRG_1273_CIR_Log_Mesin_Blm_Selesai.Id_mesin,
                        dbo.VW_PRG_1273_CIR_Log_Mesin_Blm_Selesai.Id_order,
                        dbo.VW_PRG_1273_CIR_Log_Mesin_Blm_Selesai.Id_karyawan,
                        dbo.VW_PRG_1273_CIR_Log_Mesin_Blm_Selesai.Counter_mesin_awal,
                        dbo.VW_PRG_1273_CIR_Log_Mesin_Blm_Selesai.Counter_mesin_akhir,
                        dbo.VW_PRG_1273_CIR_Log_Mesin_Blm_Selesai.Time_Catat,
                        dbo.VW_PRG_1273_CIR_Log_Mesin_Blm_Selesai.A_rpm,
                        dbo.VW_PRG_1273_CIR_Log_Mesin_Blm_Selesai.A_n_shutle,
                        dbo.VW_PRG_1273_CIR_Log_Mesin_Blm_Selesai.Afalan_Wa,
                        dbo.VW_PRG_1273_CIR_Log_Mesin_Blm_Selesai.Afalan_We,
                        dbo.VW_PRG_1273_CIR_Log_Mesin_Blm_Selesai.Status_log,
                        dbo.VW_PRG_1273_CIR_Log_Mesin_Blm_Selesai.Kalkulasi_Meter,
                        dbo.VW_PRG_1273_CIR_Log_Mesin_Blm_Selesai.Kalkulasi_Premi,
                        dbo.VW_PRG_1273_CIR_Log_Mesin_Blm_Selesai.Id_User,
                        dbo.VW_PRG_1273_CIR_Log_Mesin_Blm_Selesai.Kode_barang,
                        dbo.VW_PRG_1273_CIR_Log_Mesin_Blm_Selesai.NAMA_BRG,
                        dbo.VW_PRG_1273_CIR_Log_Mesin_Blm_Selesai.Nama_mesin,
                        dbo.VW_PRG_1273_CIR_Log_Mesin_Blm_Selesai.IdType_Mesin,
                        dbo.VW_PRG_1273_CIR_Log_Mesin_Blm_Selesai.Type_Mesin,
                        dbo.VW_PRG_1273_CIR_Log_Mesin_Blm_Selesai.Keterangan,
                        dbo.VW_PRG_1273_CIR_Log_Mesin_Blm_Selesai.Awal_jam_kerja,
                        dbo.VW_PRG_1273_CIR_Log_Mesin_Blm_Selesai.Kalkulasi_Meter,
                        dbo.VW_PRG_1273_CIR_Log_Mesin_Blm_Selesai.Akhir_jam_kerja,
                        dbo.VW_PRG_1273_CIR_Log_Mesin_Blm_Selesai.MeterManual
                    FROM T_Pegawai KARYAWAN
                    INNER JOIN dbo.VW_PRG_1273_CIR_Log_Mesin_Blm_Selesai
                    ON KARYAWAN.Kd_pegawai = dbo.VW_PRG_1273_CIR_Log_Mesin_Blm_Selesai.Id_karyawan
                    WHERE dbo.VW_PRG_1273_CIR_Log_Mesin_Blm_Selesai.id_log = ?
                ";

                $logDetails = DB::connection('ConnCircularMojosari')->select($query, $sp_data);
                return $logDetails;

            case 'sp_List_Pegawai~1':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @Shift = ?, @Tanggal = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'SP_1273_CIR_List_Status_Log~1':
            case 'Sp_List_PLC_Mesin~1';
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1];
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircularMojosari');

            case 'SP_1273_CIR_Check_Order':
                $sp_param = '@IdOrder = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircularMojosari');

            case 'SP_1273_CIR_Cek_Pegawai':
                // dd($sp_data);
                $sp_param = '@tanggal = ?, @Id_Mesin = ?, @Id_Order = ?, @Shift = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircularMojosari');

            case 'SP_1273_CIR_Insert_Log_Mesin':
                $sp_data[10] = str_replace('_', ':', $sp_data[10]); // @jam1
                $sp_data[11] = str_replace('_', ':', $sp_data[11]); // @jam2
                // gabungkan dengan tanggal
                $jamAwalFull = $sp_data[0] . ' ' . $sp_data[10] . ':00.000';
                $jamAkhirFull = $sp_data[0] . ' ' . $sp_data[11] . ':00.000';

                // assign balik ke sp_data
                $sp_data[10] = $jamAwalFull;  // @jam1
                $sp_data[11] = $jamAkhirFull; // @jam2
                // sisipkan @id_user di index 10
                array_splice($sp_data, 10, 0, [$user]);

                $sp_param = '@tgl_log = ?, @id_mesin = ?, @shift = ?, @id_order = ?, @id_karyawan = ?, @Counter_Mesin_awal = ?, @Counter_Mesin_Akhir = ?, @A_Rpm = ?, @A_N_Shutle = ?, @status_log = ?, @id_user = ?, @jam1 = ?, @jam2 = ?, @MeterManual = ?';

                return $this->executeSP(
                    'statement',
                    explode('~', $sp_str)[0],
                    $sp_param,
                    $sp_data,
                    'ConnCircularMojosari'
                );

            case 'SP_1273_CIR_Update_Log_Mesin':
                $sp_data[11] = str_replace('_', ':', $sp_data[11]); // @jam1
                $sp_data[12] = str_replace('_', ':', $sp_data[12]); // @jam2

                // gabungkan dengan tanggal
                $jamAwalFull = $sp_data[1] . ' ' . $sp_data[11] . ':00.000';
                $jamAkhirFull = $sp_data[1] . ' ' . $sp_data[12] . ':00.000';

                // assign balik ke sp_data
                $sp_data[11] = $jamAwalFull;  // @jam1
                $sp_data[12] = $jamAkhirFull; // @jam2
                array_splice($sp_data, 11, 0, [$user]);
                // dd($sp_data);
                $results = DB::connection('ConnCircularMojosari')->statement(
                    'exec sp_Update_Log_Mesin @Id_Log = ?, @tgl_log = ?, @id_mesin = ?, @shift = ?, @id_order = ?, @id_karyawan = ?, @Counter_Mesin_awal = ?, @Counter_Mesin_Akhir = ?, @A_Rpm = ?, @A_N_Shutle = ?, @status_log = ?, @id_user = ?, @jam1 = ?, @jam2 = ?, @MeterManual = ?',
                    [$sp_data[0], $sp_data[1], $sp_data[2], $sp_data[3], $sp_data[4], $sp_data[5], $sp_data[6], $sp_data[7], $sp_data[8], $sp_data[9], $sp_data[10], $sp_data[11], $sp_data[12], $sp_data[13], $sp_data[14]]
                );
                return $results;
            // $sp_data[11] = str_replace('_', ':', $sp_data[11]); // @jam1
            // $sp_data[12] = str_replace('_', ':', $sp_data[12]); // @jam2

            // // gabungkan dengan tanggal
            // $jamAwalFull = $sp_data[1] . ' ' . $sp_data[11] . ':00.000';
            // $jamAkhirFull = $sp_data[1] . ' ' . $sp_data[12] . ':00.000';

            // // assign balik ke sp_data
            // $sp_data[11] = $jamAwalFull;  // @jam1
            // $sp_data[12] = $jamAkhirFull; // @jam2
            // array_splice($sp_data, 11, 0, [$user]);

            // $sp_param = '@Id_Log = ?, @tgl_log = ?, @id_mesin = ?, @shift = ?, @id_order = ?, @id_karyawan = ?, @Counter_Mesin_awal = ?, @Counter_Mesin_Akhir = ?, @A_Rpm = ?, @A_N_Shutle = ?, @status_log = ?, @id_user = 4384, @jam1 = ?, @jam2 = ?, @MeterManual = ?, @Kalkulasi_Meter = ?';

            // if ($sp_data[14] == 'null') {
            //     $sp_param = '@Id_Log = ?, @tgl_log = ?, @id_mesin = ?, @shift = ?, @id_order = ?, @id_karyawan = ?, @Counter_Mesin_awal = ?, @Counter_Mesin_Akhir = ?, @A_Rpm = ?, @A_N_Shutle = ?, @status_log = ?, @id_user = 4384, @jam1 = ?, @jam2 = ?, @MeterManual = ?';
            // }

            // // debug statement penuh
            // $sp_name = explode('~', $sp_str)[0];
            // $statement = "EXEC {$sp_name} {$sp_param}";

            // // dd([
            // //     'statement' => $statement,
            // //     'bindings' => $sp_data,
            // // ]);

            // return $this->executeSP('statement', $sp_name, $sp_param, $sp_data, 'ConnCircular');


            case 'SP_1273_CIR_Delete_Log_Mesin':
                $sp_param = '@Id_Log = ?, @UserDlt = ?';
                // tambahkan $user ke sp_data
                $sp_data[] = $user;
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircularMojosari');

            case 'SP_1273_CIR_Delete_Log_Mesin~ERROR':
                $sp_param = '@Id_Log = ?, @UserDlt = ?';
                $sp_data[] = $user;
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircularMojosari');

            case 'Sp_4JAM_CHECK':
                $sp_param = '@IdMesin = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            #endregion

            #region formCounterMesin

            case 'SP_1273_CIR_List_Mesin~1':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1];

                $list_type_mesin = $this->executeSP(
                    'select',
                    explode('~', $sp_str)[0],
                    $sp_param,
                    $sp_data,
                    'ConnCircularMojosari'
                );
                // dd($list_type_mesin);
                // $filtered = array_values(array_filter($list_type_mesin, function ($item) {
                //     return in_array($item->IdType_mesin, ['13', '17']);
                // }));
                $filtered = array_values(array_filter($list_type_mesin, function ($item) {
                    return $item->IdType_mesin;
                }));

                return $filtered;

            // case 'Sp_List_Mesin~1':
            //     $sp_param = '@Kode = ' . explode('~', $sp_str)[1];
            //     // dd($sp_param);
            //     return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'SP_1273_CIR_MAINT_MESIN~5':
                // dd($sp_str, $sp_data);
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @IdMesin = ?, @CounterPagi = ?, @CounterSore = ?, @Countermalam = ?, @IdUser = 4384';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircularMojosari');

            #endregion

            default:
                break;
        }
    }

    public function prosesOrder(Request $request)
    {
        // dd($request->all());
        $str_info = '';

        $proses = $request->input('mode_proses');
        $sp_data = $request->input('form_data');
        $sp_str = $request->input('form_sp');
        if ($request->input('form_sp2') == 'SP_1273_CIR_MAINT_BENANG') {
            $data_benang = explode('~', $request->input('form_data2'));
            $this->prosesBenang($data_benang[0], $data_benang[1]);
        }

        $row_info = $this->spOrder($sp_str . '~' . $proses, $sp_data);
        // dd($row_info);

        if ($proses === null)
            $row_info = $this->spOrder($sp_str, $sp_data);

        if (is_int($row_info) && $row_info > 0) {
            $koreksi = 2;
            $hapus = 3;

            if ($sp_str == 'SP_4384_CIR_Check_GudangOrder1') {
                $koreksi = 4;
                $hapus = 5;
            }

            switch ($proses) {
                case $koreksi:
                    $str_info .= 'Data Berhasil Dikoreksi!';
                    break;

                case $hapus:
                    $str_info .= 'Data Berhasil Dihapus!';
                    break;

                default:
                    $str_info .= 'Data Berhasil Disimpan!';
                    break;
            }

            return redirect()->back()->with(
                'success',
                $str_info
            );
        } else {
            return redirect()->back()->with('error', $row_info);
        }
    }

    private function executeSP($action, $sp_str, $sp_param, $sp_data, $conn)
    {
        if ($action == 'statement') {
            try {
                return DB::connection($conn)->affectingStatement(
                    'exec ' . $sp_str . ' ' . $sp_param,
                    $sp_data
                );
            } catch (QueryException $e) {
                if ($e->getCode() == '23000' && $sp_str == 'SP_4384_CIR_Check_GudangOrder1') {
                    return 'Data order gudang sudah ada. <br>Silahkan lihat pada bagian Koreksi.';
                } else if ($sp_str == 'Sp_Transfer_Pegawai') {
                    return 'error';
                } else if ($e->getCode() == '23000' && $sp_str == 'Sp_Maint_Order') {
                    return 'Data order telah dikerjakan oleh mesin dan tercatat dalam sistem. Data tidak dapat dihapus.';
                } else if ($e->getCode() == '23000') {
                    return 'Data telah terhubung dengan data lain. Data tidak dapat dihapus.';
                } else {
                    dd(DB::connection($conn)->select(
                        'exec ' . $sp_str . ' ' . $sp_param,
                        $sp_data
                    ));
                }
            }
        } else if ($action == 'select') {
            try {
                return DB::connection($conn)->select(
                    'exec ' . $sp_str . ' ' . $sp_param,
                    $sp_data
                );
            } catch (QueryException $e) {
                dd(DB::connection($conn)->select(
                    'exec ' . $sp_str . ' ' . $sp_param,
                    $sp_data
                ));
            }
        }
    }

    private function prosesBenang($id_order, $id_detail)
    {
        $list_order = explode(',', $id_detail);
        for ($i = 0; $i < count($list_order); $i++) {
            $affected_rows = $this->spOrder('Sp_Maint_Benang~4', $id_order . '~' . $list_order[$i]);
            if ($affected_rows <= 0) {
                return redirect()->back()->with(
                    'error',
                    'Terdapat kendala dalam memproses data. <br>Mohon segera hubungi EDP.'
                );
            }
        }
    }

    #region Select2 Pagination Form Order Meisn Aktif
    public function getMesinAktif(Request $request)
    {
        $search_item = $request->input('searchItem', '');
        $id_type_mesin = $request->input('idTypeMesin');

        // Sp_List_Mesin | @Kode = 3
        $data = DB::connection('ConnCircular')->select(
            "SELECT dbo.T_Mesin.*
            FROM dbo.T_Mesin
            WHERE (dbo.T_Mesin.Active = 'Y')
                AND dbo.T_Mesin.idtype_mesin = ?
                AND (Id_mesin LIKE ? OR Nama_mesin LIKE ?)
            ORDER BY nama_mesin",
            [$id_type_mesin, "%$search_item%", "%$search_item%"]
        );

        // Sebelumnya INNER JOIN dengan T_Order, sehingga jika mesin belum pernah mengerjakan order tidak akan tampil.
        // Perubahan dilakukan agar formOrderMesinAktif bisa jalan untuk mesin yang masih kosong

        return $this->createPaginator($data, $request->url(), $request->query(), $request->query('page', 1));
    }

    public function getOrderBaru(Request $request)
    {
        $search_item = $request->input('searchItem', '');

        // Sp_List_Order | @Kode = 14
        $data = DB::connection('ConnCircular')->select(
            "SELECT TOP 100 PERCENT dbo.T_Order.*, PURCHASE.dbo.Y_BARANG.NAMA_BRG AS Nama_Barang,
                Y_BARANG_1.NAMA_BRG AS BenangWarp, Y_BARANG_2.NAMA_BRG AS BenangWeft
            FROM dbo.T_Order INNER JOIN
                PURCHASE.dbo.Y_BARANG ON dbo.T_Order.Kode_barang = PURCHASE.dbo.Y_BARANG.KD_BRG INNER JOIN
                PURCHASE.dbo.Y_BARANG Y_BARANG_1 ON dbo.T_Order.A_kodebarang_warp = Y_BARANG_1.KD_BRG INNER JOIN
                PURCHASE.dbo.Y_BARANG Y_BARANG_2 ON dbo.T_Order.A_kodebarang_weft = Y_BARANG_2.KD_BRG
            WHERE (dbo.T_Order.A_tgl_Akhir IS NULL)
                AND dbo.T_Order.Lokasi LIKE 'Tropodo'
                AND (Id_order LIKE ? OR PURCHASE.dbo.Y_BARANG.NAMA_BRG LIKE ?)
            ORDER BY dbo.T_Order.Id_Order",
            ["%$search_item%", "%$search_item%"]
        );

        return $this->createPaginator($data, $request->url(), $request->query(), $request->query('page', 1));
    }
    #endregion

    #region Select2 Pagination Form Order Master
    public function getIdOrder(Request $request)
    {
        $search_item = $request->input('searchItem', '');

        // Sp_List_Order | @Kode = 3
        $data = DB::connection('ConnCircularMojosari')->select(
            "SELECT dbo.T_Order.*,
            PURCHASE.dbo.Y_BARANG.NAMA_BRG AS Nama_Barang,
            Y_BARANG_1.NAMA_BRG AS BenangWarp,
            Y_BARANG_2.NAMA_BRG AS BenangWeft
            FROM dbo.T_Order INNER JOIN
                PURCHASE.dbo.Y_BARANG ON dbo.T_Order.Kode_barang = PURCHASE.dbo.Y_BARANG.KD_BRG
                INNER JOIN PURCHASE.dbo.Y_BARANG Y_BARANG_1 ON dbo.T_Order.A_kodebarang_warp = Y_BARANG_1.KD_BRG
                INNER JOIN PURCHASE.dbo.Y_BARANG Y_BARANG_2 ON dbo.T_Order.A_kodebarang_weft = Y_BARANG_2.KD_BRG
            WHERE dbo.T_Order.A_tgl_Akhir IS NULL
                AND (dbo.T_Order.Id_order LIKE ? OR PURCHASE.dbo.Y_BARANG.NAMA_BRG LIKE ?)
            ORDER BY dbo.T_Order.Id_Order DESC",
            ["%$search_item%", "%$search_item%"]
        );

        return $this->createPaginator($data, $request->url(), $request->query(), $request->query('page', 1));
    }

    public function getBarang(Request $request)
    {
        $search_item = $request->input('searchItem', '');

        $data = DB::connection('ConnPurchase')->select(
            "SELECT KD_BRG, NAMA_BRG, D_TEK0, D_TEK1, D_TEK1 + ' / ' + NAMA_BRG AS NmBrg
         FROM dbo.Y_BARANG
         WHERE (NO_SUB_KATEGORI = '1097') 
           AND (NOT (NAMA_BRG LIKE 'Sama%'))
           AND (NOT (NAMA_BRG LIKE 'LAMT-%')) 
           AND (NOT (NAMA_BRG LIKE 'RTR-%'))
           AND (ASCII(LEFT(NAMA_BRG, 1)) <= 87) 
           AND (ASCII(LEFT(NAMA_BRG, 1)) >= 65)
           AND D_TEK0 IS NOT NULL
           AND (KD_BRG LIKE ? OR NAMA_BRG LIKE ?)
         ORDER BY D_TEK1, KD_BRG",
            ["%$search_item%", "%$search_item%"]
        );
        // dd($data);
        // langsung return semua data, tidak pake paginator
        return response()->json($data);
    }

    public function getBenangWarp(Request $request)
    {
        $search_item = $request->input('searchItem', '');

        // Sp_List_Order | @Kode = 9
        $data = DB::connection('ConnCircularMojosari')->select(
            "SELECT TOP 100 PERCENT KD_BRG, NAMA_BRG
            FROM dbo.vw_type_benang
            WHERE (NAMA_BRG <> '-')
                AND (KD_BRG LIKE ? OR NAMA_BRG LIKE ?)
            ORDER BY NAMA_BRG",
            ["%$search_item%", "%$search_item%"]
        );

        return $this->createPaginator($data, $request->url(), $request->query(), $request->query('page', 1));
    }

    public function getBenangStrip(Request $request)
    {
        $search_item = $request->input('searchItem', '');
        $sub_kategori = $request->input('subKategori');

        // Sp_Mohon_Beli | @MyType = 5
        $data = DB::connection('ConnPurchase')->select(
            "SELECT NAMA_BRG,KD_BRG
            FROM Y_BARANG
            WHERE NO_SUB_KATEGORI = ?
                AND (NAMA_BRG <> '-'   AND NAMA_BRG NOT LIKE 'Tidak%')
                AND (KD_BRG LIKE ? OR NAMA_BRG LIKE ?)
            ORDER BY NAMA_BRG",
            [$sub_kategori, "%$search_item%", "%$search_item%"]
        );

        return $this->createPaginator($data, $request->url(), $request->query(), $request->query('page', 1));
    }
    #endregion

    #region Select2 Pagination Form Kegiatan Mesin
    public function getMesinOrder(Request $request)
    {
        $search_item = $request->input('searchItem', '');
        $id_type_mesin = $request->input('idTypeMesin');

        // Sp_List_Mesin | @Kode = 3
        $data = DB::connection('ConnCircularMojosari')->select(
            "SELECT dbo.T_Mesin.*
            FROM dbo.T_Mesin
            INNER JOIN dbo.T_Order ON dbo.T_Mesin.Id_Order = dbo.T_Order.Id_order
            WHERE dbo.T_Mesin.Active = 'Y'
                AND dbo.T_Mesin.idtype_mesin = ?
                AND (dbo.T_Mesin.Id_mesin LIKE ? OR dbo.T_Mesin.Nama_mesin LIKE ?)
            ORDER BY  nama_mesin",
            [$id_type_mesin, "%$search_item%", "%$search_item%"]
        );

        return $this->createPaginator($data, $request->url(), $request->query(), $request->query('page', 1));
    }

    public function getDaftarPegawai(Request $request)
    {
        $search_item = $request->input('searchItem', '');
        $shift = $request->input('shift');
        $tanggal = $request->input('tanggal');
        $shifts = [
            'P' => [0, 1, 7, 10, 4, 9, 14],
            'S' => [2, 8, 13, 5, 15],
            'M' => [11, 3, 6, 16, 19]
        ];

        $data = array();
        $shift_conditions = isset($shifts[$shift]) ? $shifts[$shift] : null;
        if ($shift_conditions) {
            $placeholders = implode(',', array_fill(0, count($shift_conditions), '?'));
            $sql = "SELECT T_PEGAWAI.Nama_Div, T_PEGAWAI.nama_peg, T_PEGAWAI.shift, T_PEGAWAI.Kd_pegawai
                    FROM T_PEGAWAI
                    WHERE T_PEGAWAI.tanggal = ?
                        AND T_PEGAWAI.Shift IN ($placeholders)
                        AND (T_PEGAWAI.Kd_pegawai LIKE ? OR T_PEGAWAI.nama_peg LIKE ?)
                    ORDER BY T_PEGAWAI.nama_peg";
            $params = array_merge([$tanggal], $shift_conditions, ["%$search_item%", "%$search_item%"]);

            $data = DB::connection('ConnCircularMojosari')->select($sql, $params);
        }

        return $this->createPaginator($data, $request->url(), $request->query(), $request->query('page', 1));
    }

    public function getLogMesin(Request $request)
    {
        $search_item = $request->input('searchItem', '');
        $tanggal = $request->input('tanggal');

        // SP_1273_CIR_LIST_ALL_LOG_MESIN
        $data = DB::connection('ConnCircularMojosari')->select(
            "SELECT TOP (100) PERCENT dbo.T_Log_Mesin.Id_Log,
                CONVERT(char(10), dbo.T_Log_Mesin.Tgl_Log, 101) + ' - ' + dbo.T_Mesin.Nama_mesin + ' - ' + PURCHASE.dbo.Y_BARANG.NAMA_BRG AS nama
            FROM dbo.T_Mesin RIGHT OUTER JOIN
                dbo.T_Log_Mesin ON dbo.T_Mesin.Id_mesin = dbo.T_Log_Mesin.Id_mesin LEFT OUTER JOIN
                dbo.T_Order ON dbo.T_Log_Mesin.Id_order = dbo.T_Order.Id_order LEFT OUTER JOIN
                PURCHASE.dbo.Y_BARANG ON dbo.T_Order.Kode_barang = PURCHASE.dbo.Y_BARANG.KD_BRG
            WHERE (dbo.T_Log_Mesin.Kalkulasi_Premi IS NULL)
                AND (dbo.T_Log_Mesin.Kalkulasi_Meter IS NULL)
                AND dbo.T_Log_Mesin.Tgl_Log = ?
                AND (dbo.T_Log_Mesin.Id_Log LIKE ?
                    OR CONVERT(char(10), dbo.T_Log_Mesin.Tgl_Log, 101) + ' - ' + dbo.T_Mesin.Nama_mesin + ' - ' + PURCHASE.dbo.Y_BARANG.NAMA_BRG LIKE ?)
            ORDER BY dbo.T_Log_Mesin.Tgl_Log DESC, dbo.T_Mesin.Nama_mesin",
            [$tanggal, "%$search_item%", "%$search_item%"]
        );

        return $this->createPaginator($data, $request->url(), $request->query(), $request->query('page', 1));
    }
    #endregion

    private function createPaginator($data, $url, $query, $page)
    {
        $perPage = 10; // Number of items per page
        $total = count($data); // Total number of items
        $offset = ($page - 1) * $perPage; // Calculate the offset
        $paginator = new LengthAwarePaginator(
            array_slice($data, $offset, $perPage),
            $total,
            $perPage,
            $page,
            ['path' => $url, 'query' => $query]
        );

        // array slice untuk mengambil data berdaarkan jumlah awal dan akhir dari data

        return $paginator;
    }
    #endregion

    #region DataTables Pagination
    public function getOrderBarang(Request $request)
    {
        /**
         * SELECT   T_Mesin.*, T_Order.*, PURCHASE.dbo.Y_BARANG.NAMA_BRG AS Nama_Barang,
         *          Y_BARANG_1.NAMA_BRG AS BenangWarp, Y_BARANG_2.NAMA_BRG AS BenangWeft,
         *          PURCHASE.dbo.Y_BARANG.D_TEK0 AS D_Tek0
         * FROM     T_Mesin INNER JOIN
         *          T_Order ON T_Mesin.Id_Order = T_Order.Id_order INNER JOIN
         *          PURCHASE.dbo.Y_BARANG ON T_Order.Kode_barang = PURCHASE.dbo.Y_BARANG.KD_BRG INNER JOIN
         *          PURCHASE.dbo.Y_BARANG Y_BARANG_1 ON T_Order.A_kodebarang_warp = Y_BARANG_1.KD_BRG INNER JOIN
         *          PURCHASE.dbo.Y_BARANG Y_BARANG_2 ON T_Order.A_kodebarang_weft = Y_BARANG_2.KD_BRG
         * WHERE    (T_Mesin.Active = 'Y') AND (T_Mesin.IdType_mesin = @IdType_Mesin)
         * ORDER BY T_Mesin.Nama_mesin
         */

        $columns = array(
            0 => 'Id_mesin',
            1 => 'Nama_mesin',
            2 => 'Id_Order',
            3 => 'Nama_Barang',
            4 => 'MeterPanen'
        );

        $totalData = DB::connection('ConnCircular')
            ->table('T_Mesin')
            ->join('T_Order', 'T_Mesin.Id_Order', '=', 'T_Order.Id_order')
            ->join('PURCHASE.dbo.Y_BARANG', 'T_Order.Kode_barang', '=', 'PURCHASE.dbo.Y_BARANG.KD_BRG')
            ->join('PURCHASE.dbo.Y_BARANG AS Y_BARANG_1', 'T_Order.A_kodebarang_warp', '=', 'Y_BARANG_1.KD_BRG')
            ->join('PURCHASE.dbo.Y_BARANG AS Y_BARANG_2', 'T_Order.A_kodebarang_weft', '=', 'Y_BARANG_2.KD_BRG')
            ->where('T_Mesin.Active', 'Y')
            ->where('T_Mesin.IdType_mesin', $request->input('idTypeMesin'))
            ->count();

        $totalFiltered = $totalData;

        $idTypeMesin = $request->input('idTypeMesin');
        $limit = $request->input('length');
        $start = $request->input('start');
        $orderColumnIndex = $request->input('order.0.column');
        $order = $columns[$orderColumnIndex];
        $dir = $request->input('order.0.dir');

        if (empty($request->input('search.value'))) {
            $sp = DB::connection('ConnCircular')
                ->table('T_Mesin')
                ->join('T_Order', 'T_Mesin.Id_Order', '=', 'T_Order.Id_order')
                ->join('PURCHASE.dbo.Y_BARANG', 'T_Order.Kode_barang', '=', 'PURCHASE.dbo.Y_BARANG.KD_BRG')
                ->join('PURCHASE.dbo.Y_BARANG AS Y_BARANG_1', 'T_Order.A_kodebarang_warp', '=', 'Y_BARANG_1.KD_BRG')
                ->join('PURCHASE.dbo.Y_BARANG AS Y_BARANG_2', 'T_Order.A_kodebarang_weft', '=', 'Y_BARANG_2.KD_BRG')
                ->select(
                    'T_Mesin.Id_mesin',
                    'T_Mesin.Nama_mesin',
                    'T_Order.Id_order',
                    'PURCHASE.dbo.Y_BARANG.NAMA_BRG AS Nama_Barang',
                    'MeterPanen'
                )
                ->where('T_Mesin.Active', 'Y')
                ->where('T_Mesin.IdType_mesin', $idTypeMesin)
                ->offset($start)
                ->limit($limit)
                ->orderBy($order, $dir)
                ->get();
        } else {
            $search = $request->input('search.value');
            $sp = DB::connection('ConnCircular')
                ->table('T_Mesin')
                ->join('T_Order', 'T_Mesin.Id_Order', '=', 'T_Order.Id_order')
                ->join('PURCHASE.dbo.Y_BARANG', 'T_Order.Kode_barang', '=', 'PURCHASE.dbo.Y_BARANG.KD_BRG')
                ->join('PURCHASE.dbo.Y_BARANG AS Y_BARANG_1', 'T_Order.A_kodebarang_warp', '=', 'Y_BARANG_1.KD_BRG')
                ->join('PURCHASE.dbo.Y_BARANG AS Y_BARANG_2', 'T_Order.A_kodebarang_weft', '=', 'Y_BARANG_2.KD_BRG')
                ->select(
                    'T_Mesin.Id_mesin',
                    'T_Mesin.Nama_mesin',
                    'T_Order.Id_order',
                    'PURCHASE.dbo.Y_BARANG.NAMA_BRG AS Nama_Barang',
                    'MeterPanen'
                )
                ->where('T_Mesin.Active', 'Y')
                ->where('T_Mesin.IdType_mesin', $idTypeMesin)
                ->where(function ($query) use ($search, $columns) {
                    foreach ($columns as $column) {
                        $query->orWhere($column, 'LIKE', "%{$search}%");
                    }
                })
                ->offset($start)
                ->limit($limit)
                ->orderBy($order, $dir)
                ->get();

            $totalFiltered = DB::connection('ConnCircular')
                ->table('T_Mesin')
                ->join('T_Order', 'T_Mesin.Id_Order', '=', 'T_Order.Id_order')
                ->join('PURCHASE.dbo.Y_BARANG', 'T_Order.Kode_barang', '=', 'PURCHASE.dbo.Y_BARANG.KD_BRG')
                ->join('PURCHASE.dbo.Y_BARANG AS Y_BARANG_1', 'T_Order.A_kodebarang_warp', '=', 'Y_BARANG_1.KD_BRG')
                ->join('PURCHASE.dbo.Y_BARANG AS Y_BARANG_2', 'T_Order.A_kodebarang_weft', '=', 'Y_BARANG_2.KD_BRG')
                ->where('T_Mesin.Active', 'Y')
                ->where('T_Mesin.IdType_mesin', $idTypeMesin)
                ->where(function ($query) use ($search, $columns) {
                    foreach ($columns as $column) {
                        $query->orWhere($column, 'LIKE', "%{$search}%");
                    }
                })
                ->count();
        }

        $data = array();
        if (!empty($sp)) {
            foreach ($sp as $index => $datasp) {
                $nestedData['NomorKu'] = $index;

                $nestedData['IdMesin'] = $datasp->Id_mesin;
                $nestedData['NamaMesin'] = $datasp->Nama_mesin;
                $nestedData['IdOrder'] = $datasp->Id_order;
                $nestedData['NamaBarang'] = $datasp->Nama_Barang;
                $nestedData['MeterPanen'] = $datasp->MeterPanen;

                $data[] = $nestedData;
            }
        }

        $json_data = array(
            "draw" => intval($request->input('draw')),
            "recordsTotal" => intval($totalData),
            "recordsFiltered" => intval($totalFiltered),
            "data" => $data
        );

        echo json_encode($json_data);
    }

    public function get_Mesin_Order_Barang(Request $request)
    {
        /**
         * SELECT   T_Mesin.*, T_Order.*, PURCHASE.dbo.Y_BARANG.NAMA_BRG AS Nama_Barang
         *          PURCHASE.dbo.Y_BARANG.D_TEK0 AS D_Tek0
         * FROM     T_Mesin INNER JOIN
         *          T_Order ON T_Mesin.Id_Order = T_Order.Id_order INNER JOIN
         *          PURCHASE.dbo.Y_BARANG ON T_Order.Kode_barang = PURCHASE.dbo.Y_BARANG.KD_BRG
         * WHERE    (T_Mesin.Active = 'Y') AND (T_Mesin.IdType_mesin = @IdType_Mesin)
         * ORDER BY T_Mesin.Nama_mesin
         */

        $columns = array(
            0 => 'Id_mesin',
            1 => 'Nama_mesin',
            2 => 'Id_Order',
            3 => 'Nama_Barang',
            4 => 'MeterPanen'
        );

        $totalData = DB::connection('ConnCircular')
            ->table('T_Mesin')
            ->join('T_Order', 'T_Mesin.Id_Order', '=', 'T_Order.Id_order')
            ->join('PURCHASE.dbo.Y_BARANG', 'T_Order.Kode_barang', '=', 'PURCHASE.dbo.Y_BARANG.KD_BRG')
            ->where('T_Mesin.Active', 'Y')
            ->where('T_Mesin.IdType_mesin', $request->input('idTypeMesin'))
            ->count();

        $totalFiltered = $totalData;

        $idTypeMesin = $request->input('idTypeMesin');
        $limit = $request->input('length');
        $start = $request->input('start');
        $orderColumnIndex = $request->input('order.0.column');
        $order = $columns[$orderColumnIndex];
        $dir = $request->input('order.0.dir');

        if (empty($request->input('search.value'))) {
            $sp = DB::connection('ConnCircular')
                ->table('T_Mesin')
                ->join('T_Order', 'T_Mesin.Id_Order', '=', 'T_Order.Id_order')
                ->join('PURCHASE.dbo.Y_BARANG', 'T_Order.Kode_barang', '=', 'PURCHASE.dbo.Y_BARANG.KD_BRG')
                ->select(
                    'T_Mesin.Id_mesin',
                    'T_Mesin.Nama_mesin',
                    'T_Order.Id_order',
                    'PURCHASE.dbo.Y_BARANG.NAMA_BRG AS Nama_Barang',
                    'MeterPanen'
                )
                ->where('T_Mesin.Active', 'Y')
                ->where('T_Mesin.IdType_mesin', $idTypeMesin)
                ->offset($start)
                ->limit($limit)
                ->orderBy($order, $dir)
                ->get();
        } else {
            $search = $request->input('search.value');
            $sp = DB::connection('ConnCircular')
                ->table('T_Mesin')
                ->join('T_Order', 'T_Mesin.Id_Order', '=', 'T_Order.Id_order')
                ->join('PURCHASE.dbo.Y_BARANG', 'T_Order.Kode_barang', '=', 'PURCHASE.dbo.Y_BARANG.KD_BRG')
                ->select(
                    'T_Mesin.Id_mesin',
                    'T_Mesin.Nama_mesin',
                    'T_Order.Id_order',
                    'PURCHASE.dbo.Y_BARANG.NAMA_BRG AS Nama_Barang',
                    'MeterPanen'
                )
                ->where('T_Mesin.Active', 'Y')
                ->where('T_Mesin.IdType_mesin', $idTypeMesin)
                ->where(function ($query) use ($search, $columns) {
                    foreach ($columns as $column) {
                        $query->orWhere($column, 'LIKE', "%{$search}%");
                    }
                })
                ->offset($start)
                ->limit($limit)
                ->orderBy($order, $dir)
                ->get();

            $totalFiltered = DB::connection('ConnCircular')
                ->table('T_Mesin')
                ->join('T_Order', 'T_Mesin.Id_Order', '=', 'T_Order.Id_order')
                ->join('PURCHASE.dbo.Y_BARANG', 'T_Order.Kode_barang', '=', 'PURCHASE.dbo.Y_BARANG.KD_BRG')
                ->where('T_Mesin.Active', 'Y')
                ->where('T_Mesin.IdType_mesin', $idTypeMesin)
                ->where(function ($query) use ($search, $columns) {
                    foreach ($columns as $column) {
                        $query->orWhere($column, 'LIKE', "%{$search}%");
                    }
                })
                ->count();
        }

        $data = array();
        if (!empty($sp)) {
            foreach ($sp as $index => $datasp) {
                $nestedData['NomorKu'] = $index;

                $nestedData['IdMesin'] = $datasp->Id_mesin;
                $nestedData['NamaMesin'] = $datasp->Nama_mesin;
                $nestedData['IdOrder'] = $datasp->Id_order;
                $nestedData['NamaBarang'] = $datasp->Nama_Barang;
                $nestedData['MeterPanen'] = $datasp->MeterPanen;

                $data[] = $nestedData;
            }
        }

        $json_data = array(
            "draw" => intval($request->input('draw')),
            "recordsTotal" => intval($totalData),
            "recordsFiltered" => intval($totalFiltered),
            "data" => $data
        );

        echo json_encode($json_data);
    }
    #endregion
}
