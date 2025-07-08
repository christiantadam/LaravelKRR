<?php

namespace App\Http\Controllers\MultipleProgram;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use DB;
use Auth;
use DateTime;
use DateTimeZone;
use Log;
use Carbon\Carbon;
use function PHPUnit\Framework\isEmpty;

class KonversiRollBarcodeController extends Controller
{
    public function index()
    {
        //
    }

    public function create($id)
    {

    }

    public function getDataPermohonan($id)
    {
        if ($id == 'JBBPotong') {
            $idDivisi = 'JBB';
        } else if ($id == 'ABMStghJadi') {
            $idDivisi = 'ABM';
        } else if ($id == 'ADSStghJadi') {
            $idDivisi = 'ADS';
        }
        $listPotong = DB::connection('ConnInventory')->select('exec SP_4384_Konversi_Roll_Barcode_Potong @XKode = ?, @XIdDivisi = ?', [0, $idDivisi]);
        // Convert the data into an array that DataTables can consume
        $dataPotong = [];
        foreach ($listPotong as $Potong) {
            if (is_null($Potong->Kode_barang) || is_null($Potong->NoIndeks)) {
                $barcode = "Tidak pakai barcode";
            } else {
                $nomorIndeks9digit = sprintf('%09d', $Potong->NoIndeks);
                $barcode = (string) $nomorIndeks9digit . '-' . $Potong->Kode_barang;
            }

            $dataPotong[] = [
                'idType' => $Potong->IdType,
                'NamaType' => $Potong->NamaType,
                'JumlahPengeluaranPrimer' => (string) (number_format($Potong->JumlahPengeluaranPrimer, 2)) . ' ' . $Potong->satPrimer,
                'JumlahPengeluaranSekunder' => (string) (number_format($Potong->JumlahPengeluaranSekunder, 2)) . ' ' . $Potong->satSekunder,
                'JumlahPengeluaranTritier' => (string) (number_format($Potong->JumlahPengeluaranTritier, 2)) . ' ' . $Potong->satTritier,
                'idkonversi' => $Potong->idkonversi,
                'Barcode' => $barcode,
            ];
        }

        return datatables($dataPotong)->make(true);
    }

    public function store(Request $request)
    {
        $jenisStore = $request->input('jenisStore');
        $divisi = $request->input('divisi');
        $dateTime = new DateTime("now", new DateTimeZone('Asia/Jakarta'));
        $date = $dateTime->format('Y-m-d');
        if ($jenisStore == 'permohonan') {
            $asalKonversiInputValues = $request->input('asalKonversiInputValues');
            $idSubKelompokAsal = $asalKonversiInputValues[0][6];
            $id_typeAsal = $asalKonversiInputValues[0][0];
            $pemakaian_primerAsal = $asalKonversiInputValues[0][2];
            $pemakaian_sekunderAsal = $asalKonversiInputValues[0][3];
            $pemakaian_tritierAsal = $asalKonversiInputValues[0][4];
            $tanggalKonversi = $request->input('tanggalKonversi');
            $shift = $request->input('shift');

            $shift = match ($shift) {
                'P' => 'Pagi',
                'S' => 'Siang',
                'M' => 'Malam',
                default => $shift, // Keep the original value if no match is found
            };
            if ($divisi == 'JBB' || $divisi == 'ADS') {
                $uraian_asal = (string) $shift . ', ' . "Asal Konversi Setengah Jadi " . $divisi;
                $uraian_tujuan = (string) $shift . ', ' . "Tujuan Konversi Setengah Jadi " . $divisi;
            } else if ($divisi == 'ABM') {
                $grup = $request->input('grup');
                $sisaAsalKonversiPersen = $request->input('sisaAsalKonversiPersen');
                $nomorOrderKerja = $request->input('nomorOrderKerja');
                $uraian_asal = (string) 'Group ' . $grup . ' ' . $shift . ", Asal Konversi Setengah Jadi ABM | Sisa: " . $sisaAsalKonversiPersen . "% | Id Order Kerja: " . $nomorOrderKerja;
                $uraian_tujuan = (string) 'Group ' . $grup . ' ' . $shift . ",  Tujuan Konversi Setengah Jadi ABM | Sisa: " . $sisaAsalKonversiPersen . "% | Id Order Kerja: " . $nomorOrderKerja;
            }
            $table_daftarTujuanKonversi = $request->input('table_daftarTujuanKonversi');
            // dd($table_daftarTujuanKonversi);
            // Initialize an array to store concatenated results for each index
            $concatenatedResults = [];

            // Get the number of sub-arrays
            $numberOfSubArrays = count($table_daftarTujuanKonversi);

            // Get the number of elements in each sub-array (assuming all sub-arrays have the same length)
            $numberOfElements = count($table_daftarTujuanKonversi[0]);

            // Loop through each index in the sub-arrays
            for ($i = 0; $i < $numberOfElements; $i++) {
                $tempArray = [];
                // Loop through each sub-array and collect the values at the current index
                for ($j = 0; $j < $numberOfSubArrays; $j++) {
                    $tempArray[] = $table_daftarTujuanKonversi[$j][$i];
                }
                $concatenatedResults[$i] = $tempArray;
            }
            // Accessing specific variables
            $IdTypeTujuan = $concatenatedResults[0];
            $SaldoPrimer = $concatenatedResults[2];
            $SaldoSekunder = $concatenatedResults[3];
            $SaldoTritier = $concatenatedResults[4];
            $IdSubKelompok = $concatenatedResults[5];

            try {
                // Asal Konversi
                if ($divisi == 'JBB') {
                    $currentIdKonvPotongJBB = DB::connection('ConnInventory')
                        ->table('Counter')->value('IdKonvPotongJBB');
                    $newIdKonvPotongJBB = $currentIdKonvPotongJBB + 1;
                    DB::connection('ConnInventory')
                        ->table('Counter')->update(['IdKonvPotongJBB' => $newIdKonvPotongJBB]);
                    $idkonversi = "JBP" . str_pad($newIdKonvPotongJBB, 6, "0", STR_PAD_LEFT);
                } else if ($divisi == 'ABM') {
                    $currentIdKonvPotongABM = DB::connection('ConnInventory')
                        ->table('Counter')->value('IdKonvPotongABM');
                    $newIdKonvPotongABM = $currentIdKonvPotongABM + 1;
                    DB::connection('ConnInventory')
                        ->table('Counter')->update(['IdKonvPotongABM' => $newIdKonvPotongABM]);
                    $idkonversi = "ABP" . str_pad($newIdKonvPotongABM, 6, "0", STR_PAD_LEFT);
                } else if ($divisi == 'ADS') {
                    $currentIdKonvPotongADS = DB::connection('ConnInventory')
                        ->table('Counter')->value('IdKonvPotongADS');
                    $newIdKonvPotongADS = $currentIdKonvPotongADS + 1;
                    DB::connection('ConnInventory')
                        ->table('Counter')->update(['IdKonvPotongADS' => $newIdKonvPotongADS]);
                    $idkonversi = "ADP" . str_pad($newIdKonvPotongADS, 6, "0", STR_PAD_LEFT);
                }
                // Asal konversi
                for ($i = 0; $i < count($asalKonversiInputValues); $i++) {
                    DB::connection('ConnInventory')
                        ->statement('EXEC SP_4384_Konversi_Roll_Barcode_Potong
                        @XKode = ?,
                        @XIdTypeTransaksi = ?,
                        @XUraianDetailTransaksi = ?,
                        @XIdType = ?,
                        @XIdPenerima = ?,
                        @XIdPemberi = ?,
                        @XSaatAwalTransaksi = ?,
                        @XSaatLog = ?,
                        @XJumlahPengeluaranPrimer = ?,
                        @XJumlahPengeluaranSekunder = ?,
                        @XJumlahPengeluaranTritier = ?,
                        @XAsalIdSubkelompok = ?,
                        @XIdKonversi = ?,
                        @XTimeInput = ?,
                        @XStatus = ?,
                        @XNomorIndeks = ?,
                        @XKodeBarang = ?',
                            [
                                9,
                                "28",
                                $uraian_asal,
                                $asalKonversiInputValues[$i][0],
                                trim(Auth::user()->NomorUser),
                                trim(Auth::user()->NomorUser),
                                $tanggalKonversi,
                                $date,
                                $asalKonversiInputValues[$i][2],
                                $asalKonversiInputValues[$i][3],
                                $asalKonversiInputValues[$i][4],
                                $asalKonversiInputValues[$i][6],
                                $idkonversi,
                                $dateTime,
                                0,
                                isset($asalKonversiInputValues[$i][5]) && $asalKonversiInputValues[$i][5] !== null
                                ? explode('-', $asalKonversiInputValues[$i][5])[0]
                                : null,
                                isset($asalKonversiInputValues[$i][5]) && $asalKonversiInputValues[$i][5] !== null
                                ? explode('-', $asalKonversiInputValues[$i][5])[1]
                                : null
                            ]
                        );
                }
                // Tujuan Konversi
                for ($k = 0; $k < count($IdTypeTujuan); $k++) {
                    DB::connection('ConnInventory')
                        ->statement('EXEC SP_4384_Konversi_Roll_Barcode_Potong
                            @XKode = ?,
                            @XIdTypeTransaksi = ?,
                            @XUraianDetailTransaksi = ?,
                            @XIdType = ?,
                            @XIdPenerima = ?,
                            @XIdPemberi = ?,
                            @XSaatAwalTransaksi = ?,
                            @XSaatLog = ?,
                            @XJumlahMasukPrimer = ?,
                            @XJumlahMasukSekunder = ?,
                            @XJumlahMasukTritier = ?,
                            @XTujuanIdSubKel = ?,
                            @XIdKonversi = ?,
                            @XTimeInput = ?,
                            @XStatus = ?',
                            [
                                9,
                                "28",
                                $uraian_tujuan,
                                $IdTypeTujuan[$k],
                                trim(Auth::user()->NomorUser),
                                trim(Auth::user()->NomorUser),
                                $tanggalKonversi,
                                $date,
                                $SaldoPrimer[$k],
                                $SaldoSekunder[$k],
                                $SaldoTritier[$k],
                                $IdSubKelompok[$k],
                                $idkonversi,
                                $dateTime,
                                0
                            ]
                        );
                }
                return response()->json(['success' => 'Data sudah diSIMPAN !!..']);
            } catch (Exception $e) {
                return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
            }
        } elseif ($jenisStore == 'accPermohonan') {
            try {
                $idkonversi = $request->input('idkonversi');
                $nomorUser = trim(Auth::user()->NomorUser);
                DB::connection('ConnInventory')
                    ->statement('EXEC SP_4384_Konversi_Roll_Barcode_Potong @XKode = ?, @XIdKonversi = ?, @XKdUser = ?', [10, $idkonversi, $nomorUser]);
                $adaSisa = DB::connection('ConnInventory')->select('EXEC SP_4384_Konversi_Roll_Barcode_Potong @XKode = ?, @XIdKonversi = ?', [13, $idkonversi]);

                // Filter for "Asal Konversi"
                $asalKonversi = array_filter($adaSisa, function ($item) {
                    return str_contains($item->UraianDetailTransaksi, 'Asal Konversi');
                });
                // Get the IdType for "Asal Konversi"
                $idtypeAsalKonversi = array_map(function ($item) {
                    return $item->IdType;
                }, $asalKonversi);

                // Filter for "Tujuan Konversi"
                $tujuanKonversi = array_filter($adaSisa, function ($item) {
                    return str_contains($item->UraianDetailTransaksi, 'Tujuan Konversi');
                });

                // Get the IdType for "Tujuan Konversi"
                $idtypeTujuanKonversi = array_map(function ($item) {
                    return $item->IdType;
                }, $tujuanKonversi);

                // Find matching IdType in both lists
                $matchingIdType = array_filter($idtypeAsalKonversi, function ($idtype) use ($idtypeTujuanKonversi) {
                    return in_array($idtype, $idtypeTujuanKonversi);
                });

                if (!empty($matchingIdType)) {
                    $idtransTujuanKonversi = array_map(function ($item) use ($matchingIdType) {
                        if (in_array($item->IdType, $matchingIdType) && str_contains($item->UraianDetailTransaksi, 'Tujuan Konversi')) {
                            return $item->idtrans;
                        }
                    }, $adaSisa);

                    // Remove null values
                    $idtransTujuanKonversi = array_values(array_filter($idtransTujuanKonversi));

                    $barcode = DB::connection('ConnInventory')->select('EXEC SP_4384_Konversi_Roll_Barcode_Potong @XKode = ?, @XIdTrans = ?', [14, $idtransTujuanKonversi[0]]);
                }

                // dd($barcode);
                return response()->json([
                    'success' => (string) 'Permohonan konversi dengan Id Konversi: ' . $idkonversi . ' berhasil disetujui!',
                    'barcode' => $barcode ?? NULL
                ]);
            } catch (Exception $e) {
                return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
            }
        } elseif ($jenisStore == 'permohonanTanpaBarcode') {
            $shift = $request->input('shift');
            $tanggalKonversi = $request->input('tanggalKonversi');
            $shift = match ($shift) {
                'P' => 'Pagi',
                'S' => 'Siang',
                'M' => 'Malam',
                default => $shift, // Keep the original value if no match is found
            };

            if ($divisi == 'JBB') {
                $uraian_asal = (string) $shift . ', ' . "Asal Konversi Setengah Jadi Tanpa Barcode " . $divisi;
                $uraian_tujuan = (string) $shift . ', ' . "Tujuan Konversi Setengah Jadi Tanpa Barcode " . $divisi;
            } else if ($divisi == 'ADS') {
                $grup = $request->input('grup');
                $idCust = $request->input('idCust');
                $kbTabelHitungan = $request->input('kbTabelHitungan');
                $uraian_asal = (string) 'Group ' . $grup . ', ' . $shift . ', ' . "Asal Konversi Setengah Jadi " . $divisi . ', IdCust: ' . $idCust . ', KB Tabel Hitungan: ' . $kbTabelHitungan;
                $uraian_tujuan = (string) 'Group ' . $grup . ', ' . $shift . ', ' . "Tujuan Konversi Setengah Jadi " . $divisi . ', IdCust: ' . $idCust . ', KB Tabel Hitungan: ' . $kbTabelHitungan;
            } else if ($divisi == 'ABM') {
                $grup = $request->input('grup');
                $sisaAsalKonversiPersen = $request->input('sisaAsalKonversiPersen');
                $nomorOrderKerja = $request->input('nomorOrderKerja');
                $uraian_asal = (string) 'Group ' . $grup . ' ' . $shift . ", Asal Konversi Setengah Jadi Tanpa Barcode ABM | Sisa: " . $sisaAsalKonversiPersen . "% | Id Order Kerja: " . $nomorOrderKerja;
                $uraian_tujuan = (string) 'Group ' . $grup . ' ' . $shift . ",  Tujuan Konversi Setengah Jadi Tanpa Barcode ABM | Sisa: " . $sisaAsalKonversiPersen . "% | Id Order Kerja: " . $nomorOrderKerja;
            }

            $table_daftarTujuanKonversi = $request->input('table_daftarTujuanKonversi');
            $table_daftarAsalKonversi = $request->input('table_daftarAsalKonversi');

            // Initialize an array to store concatenated results for each index
            $concatenatedResultsTujuan = [];

            // Get the number of sub-arrays
            $numberOfSubArraysTujuan = count($table_daftarTujuanKonversi);

            // Get the number of elements in each sub-array (assuming all sub-arrays have the same length)
            $numberOfElementsTujuan = count($table_daftarTujuanKonversi[0]);

            // Loop through each index in the sub-arrays
            for ($i = 0; $i < $numberOfElementsTujuan; $i++) {
                $tempArrayTujuan = [];
                // Loop through each sub-array and collect the values at the current index
                for ($j = 0; $j < $numberOfSubArraysTujuan; $j++) {
                    $tempArrayTujuan[] = $table_daftarTujuanKonversi[$j][$i];
                }
                $concatenatedResultsTujuan[$i] = $tempArrayTujuan;
            }
            // Accessing specific variables
            $IdTypeTujuan = $concatenatedResultsTujuan[0];
            $SaldoPrimerTujuan = $concatenatedResultsTujuan[2];
            $SaldoSekunderTujuan = $concatenatedResultsTujuan[4];
            $SaldoTritierTujuan = $concatenatedResultsTujuan[6];
            $IdSubKelompokTujuan = $concatenatedResultsTujuan[8];


            // Initialize an array to store concatenated results for each index
            $concatenatedResultsAsal = [];

            // Get the number of sub-arrays
            $numberOfSubArraysAsal = count($table_daftarAsalKonversi);

            // Get the number of elements in each sub-array (assuming all sub-arrays have the same length)
            $numberOfElementsAsal = count($table_daftarAsalKonversi[0]);

            // Loop through each index in the sub-arrays
            for ($i = 0; $i < $numberOfElementsAsal; $i++) {
                $tempArrayAsal = [];
                // Loop through each sub-array and collect the values at the current index
                for ($j = 0; $j < $numberOfSubArraysAsal; $j++) {
                    $tempArrayAsal[] = $table_daftarAsalKonversi[$j][$i];
                }
                $concatenatedResultsAsal[$i] = $tempArrayAsal;
            }
            // Accessing specific variables
            $IdTypeAsal = $concatenatedResultsAsal[0];
            $SaldoPrimerAsal = $concatenatedResultsAsal[2];
            $SaldoSekunderAsal = $concatenatedResultsAsal[4];
            $SaldoTritierAsal = $concatenatedResultsAsal[6];
            $IdSubKelompokAsal = $concatenatedResultsAsal[8];

            try {
                // Asal Konversi
                if ($divisi == 'JBB') {
                    $currentIdKonvPotongJBB = DB::connection('ConnInventory')
                        ->table('Counter')->value('IdKonvPotongJBB');
                    $newIdKonvPotongJBB = $currentIdKonvPotongJBB + 1;
                    DB::connection('ConnInventory')
                        ->table('Counter')->update(['IdKonvPotongJBB' => $newIdKonvPotongJBB]);
                    $idkonversi = "JBP" . str_pad($newIdKonvPotongJBB, 6, "0", STR_PAD_LEFT);
                } else if ($divisi == 'ABM') {
                    $currentIdKonvPotongABM = DB::connection('ConnInventory')
                        ->table('Counter')->value('IdKonvPotongABM');
                    $newIdKonvPotongABM = $currentIdKonvPotongABM + 1;
                    DB::connection('ConnInventory')
                        ->table('Counter')->update(['IdKonvPotongABM' => $newIdKonvPotongABM]);
                    $idkonversi = "ABP" . str_pad($newIdKonvPotongABM, 6, "0", STR_PAD_LEFT);
                } else if ($divisi == 'ADS') {
                    $currentIdKonvPotongADS = DB::connection('ConnInventory')
                        ->table('Counter')->value('IdKonvPotongADS');
                    $newIdKonvPotongADS = $currentIdKonvPotongADS + 1;
                    DB::connection('ConnInventory')
                        ->table('Counter')->update(['IdKonvPotongADS' => $newIdKonvPotongADS]);
                    $idkonversi = "ADP" . str_pad($newIdKonvPotongADS, 6, "0", STR_PAD_LEFT);
                }
                // Asal konversi
                for ($k = 0; $k < count($IdTypeAsal); $k++) {
                    DB::connection('ConnInventory')
                        ->statement('EXEC SP_4384_Konversi_Roll_Barcode_Potong
                        @XKode = ?,
                        @XIdTypeTransaksi = ?,
                        @XUraianDetailTransaksi = ?,
                        @XIdType = ?,
                        @XIdPenerima = ?,
                        @XIdPemberi = ?,
                        @XSaatAwalTransaksi = ?,
                        @XSaatLog = ?,
                        @XJumlahPengeluaranPrimer = ?,
                        @XJumlahPengeluaranSekunder = ?,
                        @XJumlahPengeluaranTritier = ?,
                        @XAsalIdSubkelompok = ?,
                        @XIdKonversi = ?,
                        @XTimeInput = ?,
                        @XStatus = ?',
                            [
                                9,
                                "28",
                                (string) $uraian_asal,
                                $IdTypeAsal[$k],
                                trim(Auth::user()->NomorUser),
                                trim(Auth::user()->NomorUser),
                                $tanggalKonversi,
                                $date,
                                $SaldoPrimerAsal[$k],
                                $SaldoSekunderAsal[$k],
                                $SaldoTritierAsal[$k],
                                $IdSubKelompokAsal[$k],
                                $idkonversi,
                                $dateTime,
                                0,
                            ]
                        );
                }
                // Tujuan Konversi
                for ($k = 0; $k < count($IdTypeTujuan); $k++) {
                    DB::connection('ConnInventory')
                        ->statement('EXEC SP_4384_Konversi_Roll_Barcode_Potong
                            @XKode = ?,
                            @XIdTypeTransaksi = ?,
                            @XUraianDetailTransaksi = ?,
                            @XIdType = ?,
                            @XIdPenerima = ?,
                            @XIdPemberi = ?,
                            @XSaatAwalTransaksi = ?,
                            @XSaatLog = ?,
                            @XJumlahMasukPrimer = ?,
                            @XJumlahMasukSekunder = ?,
                            @XJumlahMasukTritier = ?,
                            @XTujuanIdSubKel = ?,
                            @XIdKonversi = ?,
                            @XTimeInput = ?,
                            @XStatus = ?',
                            [
                                9,
                                "28",
                                (string) $uraian_tujuan,
                                $IdTypeTujuan[$k],
                                trim(Auth::user()->NomorUser),
                                trim(Auth::user()->NomorUser),
                                $tanggalKonversi,
                                $date,
                                $SaldoPrimerTujuan[$k],
                                $SaldoSekunderTujuan[$k],
                                $SaldoTritierTujuan[$k],
                                $IdSubKelompokTujuan[$k],
                                $idkonversi,
                                $dateTime,
                                0
                            ]
                        );
                }
                return response()->json(['success' => 'Data sudah diSIMPAN !!..']);
            } catch (Exception $e) {
                return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
            }
        }

    }

    public function show($id, Request $request)
    {
        $nomorUser = trim(Auth::user()->NomorUser);
        if ($id == 'JBBPotong') {
            $access = (new HakAksesController)->HakAksesFiturMaster('Jumbo Bag');
            $divisi = DB::connection('ConnInventory')
                ->select('exec SP_4384_Konversi_Roll_Barcode_Potong @XKdUser = ?, @XKode = ?, @XIdDivisi = ?', [$nomorUser, 1, 'JBB']);
            return view('MultipleProgram.KonversiRollBarcode', compact('access', 'id', 'nomorUser', 'divisi'));
        } elseif ($id == 'ABMStghJadi') {
            $access = (new HakAksesController)->HakAksesFiturMaster('ABM');
            $divisi = DB::connection('ConnInventory')
                ->select('exec SP_4384_Konversi_Roll_Barcode_Potong @XKdUser = ?, @XKode = ?, @XIdDivisi = ?', [$nomorUser, 1, 'ABM']);
            return view('MultipleProgram.KonversiRollBarcode', compact('access', 'id', 'nomorUser', 'divisi'));
        } elseif ($id == 'ADSStghJadi') {
            $access = (new HakAksesController)->HakAksesFiturMaster('AD Star');
            $divisi = DB::connection('ConnInventory')
                ->select('exec SP_4384_Konversi_Roll_Barcode_Potong @XKdUser = ?, @XKode = ?, @XIdDivisi = ?', [$nomorUser, 1, 'ADS']);
            $customer = DB::connection('ConnInventory')->select('exec SP_4384_Konversi_Roll_Barcode_Potong @XKode = ?', [16]);
            return view('MultipleProgram.KonversiRollBarcode', compact('access', 'id', 'nomorUser', 'divisi', 'customer'));
        } elseif ($id == 'getDataAsalKonversi') {
            $nomorIndeksBarangAsal = $request->input('nomorIndeksBarangAsal');
            $kodeBarangAsal = $request->input('kodeBarangAsal');
            $idDivisi = $request->input('idDivisi');
            if ($idDivisi == 'JBB') {
                try {
                    $dataBarcode = DB::connection('ConnInventory')
                        ->select(
                            'EXEC SP_4384_Konversi_Roll_Barcode_Potong @XKode = ?, @XKodeBarang = ?, @XNomorIndeks = ?, @XIdDivisi = ?',
                            [8, $kodeBarangAsal, $nomorIndeksBarangAsal, $idDivisi]
                        );
                    return response()->json(['success' => $dataBarcode]);
                } catch (Exception $e) {
                    if ($e->getMessage() == 'Undefined array key 0') {
                        return response()->json(['error' => (string) "Terjadi Kesalahan, Data Barcode Tidak Ditemukan!"]);
                    }
                    return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
                }
            } else if ($idDivisi == 'ABM') {
                try {
                    $dataBarcode = DB::connection('ConnInventory')
                        ->select(
                            'EXEC SP_4384_Konversi_Roll_Barcode_Potong @XKode = ?, @XKodeBarang = ?, @XNomorIndeks = ?, @XIdDivisi = ?',
                            [8, $kodeBarangAsal, $nomorIndeksBarangAsal, $idDivisi]
                        );
                    return response()->json(['success' => $dataBarcode]);
                } catch (Exception $e) {
                    if ($e->getMessage() == 'Undefined array key 0') {
                        return response()->json(['error' => (string) "Terjadi Kesalahan, Data Barcode Tidak Ditemukan!"]);
                    }
                    return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
                }
            } else if ($idDivisi == 'ADS') {
                try {
                    $dataBarcode = DB::connection('ConnInventory')
                        ->select(
                            'EXEC SP_4384_Konversi_Roll_Barcode_Potong @XKode = ?, @XKodeBarang = ?, @XNomorIndeks = ?, @XIdDivisi = ?',
                            [8, $kodeBarangAsal, $nomorIndeksBarangAsal, $idDivisi]
                        );
                    return response()->json(['success' => $dataBarcode]);
                } catch (Exception $e) {
                    if ($e->getMessage() == 'Undefined array key 0') {
                        return response()->json(['error' => (string) "Terjadi Kesalahan, Data Barcode Tidak Ditemukan!"]);
                    }
                    return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
                }
            }

        } elseif ($id == 'getNomorOK') {
            $NomorOk = DB::connection('ConnInventory')
                ->select('exec SP_4384_Konversi_Roll_Barcode_Potong @XKode = ?', [15]);

            return response()->json($NomorOk);
        } elseif ($id == 'getObjek') {
            $UserInput = trim(Auth::user()->NomorUser);
            $idDivisi = $request->input('idDivisi');
            $objekConn = DB::connection('ConnInventory')
                ->select('exec SP_4384_Konversi_Roll_Barcode_Potong @XKdUser = ?, @XKode = ?, @XIdDivisi = ?', [$UserInput, 2, $idDivisi]);

            return response()->json($objekConn);
        } elseif ($id == 'getKodeBarangTabelHitungan') {
            $idCust = $request->input('idCust');
            $kodeBarang = DB::connection('ConnInventory')
                ->select('exec SP_4384_Konversi_Roll_Barcode_Potong @XKode = ?, @XIdCust = ?', [17, $idCust]);

            return response()->json($kodeBarang);
        } elseif ($id == 'getDetailKodeBarangTabelHitunganADS') {
            //Untuk ambil data panjang patch dari tabel hitungan ADS
            $idTabelHitungan = $request->input('idTabelHitungan');
            $detailKodeBarang = DB::connection('ConnInventory')
                ->select('exec SP_4384_Konversi_Roll_Barcode_Potong @XKode = ?, @XIdTabelHitungan = ?', [18, $idTabelHitungan]);

            return response()->json($detailKodeBarang);
        } elseif ($id == 'getKelompokUtama') {
            $idObjek = $request->input('idObjek');
            $KelompokUtamaConn = DB::connection('ConnInventory')
                ->select('exec SP_4384_Konversi_Roll_Barcode_Potong @XKode = ?, @XIdObjek = ?', [3, $idObjek]);

            return response()->json($KelompokUtamaConn);
        } elseif ($id == 'getKelompok') {
            $idKelompokUtama = $request->input('idKelompokUtama');
            $KelompokConn = DB::connection('ConnInventory')
                ->select('exec SP_4384_Konversi_Roll_Barcode_Potong @XKode = ?, @XIdKelompokUtama = ?', [4, $idKelompokUtama]);

            return response()->json($KelompokConn);
        } elseif ($id == 'getSubKelompok') {
            $idKelompok = $request->input('idKelompok');
            $SubKelompokConn = DB::connection('ConnInventory')
                ->select('exec SP_4384_Konversi_Roll_Barcode_Potong @XKode = ?, @XIdKelompok = ?', [5, $idKelompok]);

            return response()->json($SubKelompokConn);
        } elseif ($id == 'getType') {
            $idSubKelompok = $request->input('idSubKelompok');
            $TypeConn = DB::connection('ConnInventory')
                ->select('exec SP_4384_Konversi_Roll_Barcode_Potong @XKode = ?, @XIdSubKelompok = ?', [6, $idSubKelompok]);
            return response()->json($TypeConn);
        } elseif ($id == 'getDataType') {
            $IdType = $request->input('IdType');
            $TypeConn = DB::connection('ConnInventory')
                ->select('exec SP_4384_Konversi_Roll_Barcode_Potong @XKode = ?, @XIdType = ?', [7, (string) $IdType]);

            return response()->json($TypeConn);
        } else if ($id == 'getDetailKonversi') {
            $idKonversi = $request->input('idKonversi');
            $data = DB::connection('ConnInventory')->select('exec SP_4384_Konversi_Roll_Barcode_Potong @XKode = ?, @XIdKonversi = ?', [11, (string) $idKonversi]);
            return response()->json($data);
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

    public function destroy(Request $request, $id)
    {
        if ($id == 'BatalACCDataKonversi') {
            try {
                $idKonversi = $request->input('idKonversi');
                $nomorUser = trim(Auth::user()->NomorUser);
                DB::connection('ConnInventory')->statement('exec SP_4384_Konversi_Roll_Barcode_Potong @XKode = ?, @XIdKonversi = ?, @XKdUser = ?', [12, $idKonversi, $nomorUser]);
                return response()->json(['success' => (string) 'Data Konversi ' . $idKonversi . ' Berhasil Dihapus'], 200);
            } catch (Exception $e) {
                return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
            }
        }
    }
}
