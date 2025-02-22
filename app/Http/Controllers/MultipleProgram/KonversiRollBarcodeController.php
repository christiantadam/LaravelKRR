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
        if ($id == 'JBBPotong') {
            $idDivisi = 'JBB';
        } else if ($id == 'ABMStghJadi') {
            $idDivisi = 'ABM';
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
        if ($jenisStore == 'permohonan') {
            $date = new DateTime("now", new DateTimeZone('Asia/Jakarta'));
            $nomorIndeksAsal = explode('-', $request->input('asalKonversiInputValues')[0][5])[0];
            $kodeBarangAsal = explode('-', $request->input('asalKonversiInputValues')[0][5])[1];
            $idSubKelompokAsal = $request->input('asalKonversiInputValues')[0][6];
            $id_typeAsal = $request->input('asalKonversiInputValues')[0][0];
            $pemakaian_primerAsal = $request->input('asalKonversiInputValues')[0][2];
            $pemakaian_sekunderAsal = $request->input('asalKonversiInputValues')[0][3];
            $pemakaian_tritierAsal = $request->input('asalKonversiInputValues')[0][4];
            $tanggalKonversi = $request->input('tanggalKonversi');
            $shift = $request->input('shift');

            switch ($shift) {
                case 'P':
                    $shift = 'Pagi';
                    break;
                case 'S':
                    $shift = 'Siang';
                    break;
                case 'M':
                    $shift = 'Malam';
                    break;
            }
            if ($divisi == 'JBB') {
                $uraian_asal = (string) "Asal Konversi Potongan JBB";
                $uraian_tujuan = (string) "Tujuan Konversi Potongan JBB";
            } else if ($divisi == 'ABM') {
                $asalKonversi = $request->input('asalKonversi');
                $uraian_asal = (string) "Asal Konversi Setengah Jadi ABM";
                $uraian_tujuan = (string) "Tujuan Konversi Setengah Jadi ABM";
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
                }
                // Asal konversi
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
                            (string) $shift . ', ' . $uraian_asal,
                            $id_typeAsal,
                            trim(Auth::user()->NomorUser),
                            trim(Auth::user()->NomorUser),
                            $tanggalKonversi,
                            $date,
                            $pemakaian_primerAsal,
                            $pemakaian_sekunderAsal,
                            $pemakaian_tritierAsal,
                            $idSubKelompokAsal,
                            $idkonversi,
                            $date,
                            0,
                            $nomorIndeksAsal,
                            $kodeBarangAsal,
                        ]
                    );

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
                                (string) $shift . ', ' . $uraian_tujuan,
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
                                $date,
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

            switch ($shift) {
                case 'P':
                    $shift = 'Pagi';
                    break;
                case 'S':
                    $shift = 'Siang';
                    break;
                case 'M':
                    $shift = 'Malam';
                    break;
            }
            if ($divisi == 'JBB') {
                $uraian_asal = (string) "Asal Konversi Potongan JBB";
                $uraian_tujuan = (string) "Tujuan Konversi Potongan JBB";
            } else if ($divisi == 'ABM') {
                $asalKonversi = $request->input('asalKonversi');
                $uraian_asal = (string) "Asal Konversi Setengah Jadi ABM";
                $uraian_tujuan = (string) "Tujuan Konversi Setengah Jadi ABM";
            }
            $date = new DateTime("now", new DateTimeZone('Asia/Jakarta'));
            $idSubKelompokAsal = $request->input('idSubKelompokAsal');
            $id_typeAsal = $request->input('id_typeAsal');
            $pemakaian_primerAsal = $request->input('pemakaian_primerAsal');
            $pemakaian_sekunderAsal = $request->input('pemakaian_sekunderAsal');
            $pemakaian_tritierAsal = $request->input('pemakaian_tritierAsal');
            $tanggalKonversi = $request->input('tanggalKonversi');
            $table_daftarTujuanKonversi = $request->input('table_daftarTujuanKonversi');

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
            $SaldoSekunder = $concatenatedResults[4];
            $SaldoTritier = $concatenatedResults[6];
            $IdSubKelompok = $concatenatedResults[8];

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
                }
                // Asal konversi
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
                            (string) $shift . ', ' . $uraian_asal,
                            $id_typeAsal,
                            trim(Auth::user()->NomorUser),
                            trim(Auth::user()->NomorUser),
                            $tanggalKonversi,
                            $date,
                            $pemakaian_primerAsal,
                            $pemakaian_sekunderAsal,
                            $pemakaian_tritierAsal,
                            $idSubKelompokAsal,
                            $idkonversi,
                            $date,
                            0,
                        ]
                    );

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
                                (string) $shift . ', ' . $uraian_tujuan,
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
                                $date,
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
        } elseif ($id == 'ADSPotong') {
            $access = (new HakAksesController)->HakAksesFiturMaster('ADStar');
            return view('MultipleProgram.PermohonanKonversiPotongBarcode', compact('access', 'id'));
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
            }

        } elseif ($id == 'getObjek') {
            $UserInput = trim(Auth::user()->NomorUser);
            $idDivisi = $request->input('idDivisi');
            $objekConn = DB::connection('ConnInventory')
                ->select('exec SP_4384_Konversi_Roll_Barcode_Potong @XKdUser = ?, @XKode = ?, @XIdDivisi = ?', [$UserInput, 2, $idDivisi]);

            return response()->json($objekConn);
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
            return response()->json(['error' => (string) "Undefined request \$id: " . $id]);
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
