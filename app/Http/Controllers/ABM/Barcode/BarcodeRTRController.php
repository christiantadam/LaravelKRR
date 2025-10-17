<?php

namespace App\Http\Controllers\ABM\Barcode;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use Exception;
use DB;
use Auth;
use DateTime;
use DateTimeZone;

class BarcodeRTRController extends Controller
{
    public function index()
    {
        $nomorUser = trim(Auth::user()->NomorUser);
        $access = (new HakAksesController)->HakAksesFiturMaster('ABM');
        $objek = DB::connection('ConnInventory')
            ->select('exec SP_4384_ABM_Konversi_Balik_Lami @XKdUser = ?, @XKode = ?', [$nomorUser, 0]); // get all objek from divisi ABM
        return view('ABM.Barcode.Printing.BarcodePrinting', compact('access', 'nomorUser', 'objek'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $dateTime = new DateTime("now", new DateTimeZone('Asia/Jakarta'));
        $date = $dateTime->format('Y-m-d');
        $Tgl_konversiRTR = $request->input('Tgl_konversiRTR');
        $shiftRTR = $request->input('shiftRTR');
        $idMesinRTR = $request->input('idMesinRTR');
        $hasilPCSRTR = (float) $request->input('hasilPCSRTR');
        $hasilKgRTR = (float) $request->input('hasilKgRTR');
        $pemakaian_TritierAsal = (float) $request->input('pemakaian_TritierAsal');
        $pemakaian_typeSekunderAsal = (float) $request->input('pemakaian_typeSekunderAsal');
        $kodeBarangHasil = $request->input('kodeBarangHasil');
        $nomorIndeksBarangAsal = $request->input('nomorIndeksBarangAsal');
        $kodeBarangAsal = $request->input('kodeBarangAsal');
        $barcodeAsal = $nomorIndeksBarangAsal . '-' . $kodeBarangAsal;
        $idOrderKerja = $request->input('idOrderKerja');
        $nomorOrderKerja = $request->input('nomorOrderKerja');
        $uraian_asal = (string) 'Group ' . $shiftRTR . ", Asal Konversi Setengah Jadi ABM Printing | Id Order Kerja: " . $nomorOrderKerja;
        $uraian_tujuan = (string) 'Group ' . $shiftRTR . ",  Tujuan Konversi Setengah Jadi ABM Printing | Id Order Kerja: " . $nomorOrderKerja;
        $nomorUser = trim(Auth::user()->NomorUser);
        $sisaTritier = 0;
        $sisaSekunder = 0;
        $jumlahHasilKonversi = 1;

        try {
            // Cek saldo Asal (tidak boleh minus)
            $dataBarcode = DB::connection('ConnABM')
                ->select(
                    'EXEC SP_4384_ABM_Konversi_Printing @XKode = ?, @XKdBrg = ?, @XNomorIndeks = ?',
                    [2, $kodeBarangAsal, $nomorIndeksBarangAsal]
                );
            $idTypeAsal = $dataBarcode[0]->IdType;
            $idSubKelompokAsal = $dataBarcode[0]->IdSubkelompok;
            $saldoTritier = (float) $dataBarcode[0]->Qty;
            $saldoSekunder = (float) $dataBarcode[0]->Qty_sekunder;
            if ($dataBarcode) {
                $cekSaldo = $dataBarcode[0]->SaldoSekunder < $pemakaian_typeSekunderAsal
                    || $dataBarcode[0]->SaldoTritier < $pemakaian_TritierAsal;


                if ($cekSaldo) {
                    return response()->json([
                        'error' => (string) "Saldo tidak mencukupi untuk type {$dataBarcode[0]->NamaType} ",
                        'detail' => [
                            'IdType' => $dataBarcode[0]->IdType,
                            'NamaType' => $dataBarcode[0]->NamaType,
                            'SaldoPrimer' => $dataBarcode[0]->SaldoPrimer,
                            'SaldoSekunder' => $dataBarcode[0]->SaldoSekunder,
                            'SaldoTritier' => $dataBarcode[0]->SaldoTritier,
                            'JumlahPengeluaranSekunder' => $pemakaian_typeSekunderAsal,
                            'JumlahPengeluaranTritier' => $pemakaian_TritierAsal,
                        ],
                    ], 400);
                }
            } else {
                return response()->json([
                    'error' => (string) "Proses cek saldo gagal untuk barcode {$barcodeAsal} ",
                ], 400);
            }

            // cek sisa saldo barang dari barcode asal
            if ($saldoTritier !== $pemakaian_TritierAsal || $saldoSekunder !== $pemakaian_typeSekunderAsal) {
                $sisaTritier = $saldoTritier - $pemakaian_TritierAsal;
                $sisaSekunder = $saldoSekunder - $pemakaian_typeSekunderAsal;
            }
            // Generate Id Konversi
            $currentIdKonvPotongABM = DB::connection('ConnInventory')
                ->table('Counter')->value('IdKonvPotongABM');
            $newIdKonvPotongABM = $currentIdKonvPotongABM + 1;
            DB::connection('ConnInventory')
                ->table('Counter')->update(['IdKonvPotongABM' => $newIdKonvPotongABM]);
            $idkonversi = "ABP" . str_pad($newIdKonvPotongABM, 6, "0", STR_PAD_LEFT);

            //Insert permohonan into tmp_transaksi
            //Insert Asal Konversi
            DB::connection('ConnABM')
                ->statement('EXEC SP_4384_ABM_Konversi_Printing
                        @XKode = ?,
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
                        @XKdBrg = ?',
                    [
                        3,
                        $uraian_asal,
                        $idTypeAsal,
                        trim(Auth::user()->NomorUser),
                        trim(Auth::user()->NomorUser),
                        $Tgl_konversiRTR,
                        $date,
                        1,
                        $pemakaian_typeSekunderAsal,
                        $pemakaian_TritierAsal,
                        $idSubKelompokAsal,
                        $idkonversi,
                        $dateTime,
                        0,
                        $nomorIndeksBarangAsal,
                        $kodeBarangAsal
                    ]
                );

            //Insert Tujuan Konversi

            //prepare variables for insert tujuan konversi
            //get IdTypeTujuan
            $DataTypeTujuan = DB::connection('ConnABM')
                ->select(
                    'EXEC SP_4384_ABM_Konversi_Printing @XKode = ?, @XKdBrg = ?, @XIdMesin = ?, @XIdOrder = ?',
                    [5, $kodeBarangHasil, $idMesinRTR, $idOrderKerja]
                );

            if (count($DataTypeTujuan) < 1) {
                return response()->json([
                    'error' => (string) 'Belum ada id type tujuan untuk kode barang ' . $kodeBarangHasil . '. Dipersilahkan cek type tujuannya dulu.',
                ]);
            }

            if ($sisaTritier !== 0 && $sisaSekunder !== 0) {
                $jumlahHasilKonversi = 2;
                $IdTypeTujuan = [$DataTypeTujuan[0]->IdType, $idTypeAsal];
                $JumlahMasukSekunder = [$hasilPCSRTR, $sisaSekunder];
                $JumlahMasukTritier = [$hasilKgRTR, $sisaTritier];
                $idSubkelompokTujuan = [$DataTypeTujuan[0]->IdSubkelompok, $idSubKelompokAsal];
            } else {
                $IdTypeTujuan = [$DataTypeTujuan[0]->IdType];
                $JumlahMasukSekunder = [$hasilPCSRTR];
                $JumlahMasukTritier = [$hasilKgRTR];
                $idSubkelompokTujuan = [$DataTypeTujuan[0]->IdSubkelompok];
            }

            for ($k = 0; $k < $jumlahHasilKonversi; $k++) {
                DB::connection('ConnABM')
                    ->statement('EXEC SP_4384_ABM_Konversi_Printing
                            @XKode = ?,
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
                            3,
                            $uraian_tujuan,
                            $IdTypeTujuan[$k],
                            trim(Auth::user()->NomorUser),
                            trim(Auth::user()->NomorUser),
                            $Tgl_konversiRTR,
                            $date,
                            1,
                            $JumlahMasukSekunder[$k],
                            $JumlahMasukTritier[$k],
                            $idSubkelompokTujuan[$k],
                            $idkonversi,
                            $dateTime,
                            0
                        ]
                    );
            }

            // ACC Konversi
            DB::connection('ConnABM')
                ->statement('EXEC SP_4384_ABM_Konversi_Printing @XKode = ?, @XIdKonversi = ?, @XKdUser = ?', [6, $idkonversi, $nomorUser]);

            // SELECT BARCODE AFTER ACC
            $barcodeHasil = DB::connection('ConnABM')
                ->select('EXEC SP_4384_ABM_Konversi_Printing @XKode = ?, @XIdKonversi = ?', [7, $idkonversi]);

            $barcode = [];

            foreach ($barcodeHasil as $item) {
                $formattedCode = str_pad($item->NoIndeks, 9, '0', STR_PAD_LEFT) . '-' . $item->Kode_barang;

                $barcode[] = [
                    'code' => $formattedCode,
                    'NAMA_BRG' => trim($item->NAMA_BRG),
                    'Qty_Primer' => (float) $item->Qty_Primer,
                    'Qty_sekunder' => $item->Qty_sekunder,
                    'Qty' => $item->Qty,
                    'Satuan_Primer' => $item->Satuan_Primer,
                    'Satuan_sekunder' => $item->Satuan_sekunder,
                    'Satuan' => $item->Satuan,
                    'Tgl_mutasi' => $item->Tgl_mutasi
                ];
            }

            return response()->json([
                'success' => 'Permohonan konversi dengan Id Konversi: ' . $idkonversi . ' berhasil disetujui!',
                'barcode' => $barcode
            ]);
        } catch (Exception $e) {
            return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage(), 'errorDetail' => $e]);
        }
    }

    public function show($id, Request $request)
    {
        if ($id == 'getDataKonversiRTR') {
            $nomorIndeksBarangAsal = (int) $request->input('nomorIndeksBarangAsal');
            $kodeBarangAsal = $request->input('kodeBarangAsal');
            try {
                $dataBarcode = DB::connection('ConnABM')
                    ->select(
                        'EXEC SP_4384_ABM_Konversi_Printing @XKode = ?, @XKdBrg = ?, @XNomorIndeks = ?',
                        [2, $kodeBarangAsal, $nomorIndeksBarangAsal]
                    );

                $dataMesin = DB::connection('ConnABM')->select('EXEC SP_4384_ABM_Konversi_Printing @XKode = ?', [4]);

                if (str_contains($dataBarcode[0]->idkonversi_barcode, 'ABP')) {
                    return response()->json(['error' => (string) "Barcode sudah pernah discan dengan id konversi: " . $dataBarcode[0]->idkonversi_barcode]);
                } else {
                    return response()->json(['success' => true, 'dataBarcode' => $dataBarcode, 'dataMesin' => $dataMesin]);
                }
            } catch (Exception $e) {
                if ($e->getMessage() == 'Undefined array key 0') {
                    return response()->json(['error' => (string) "Terjadi Kesalahan, Data Barcode Tidak Ditemukan!"]);
                } else {
                    return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
                }
            }
        } else if ($id == 'getBarcodeAktif') {
            try {
                $dataBarcode = DB::connection('ConnABM')
                    ->select('EXEC SP_4384_ABM_Konversi_Printing @XKode = ?', [8]);

                return datatables($dataBarcode)->make(true);
            } catch (Exception $e) {
                return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
            }
        } else if ($id == 'getDataBarcodeKonversiRTR') {
            try {
                $idTransaksi = $request->input('idTransaksi');
                $barcodeHasil = DB::connection('ConnABM')
                    ->select('EXEC SP_4384_ABM_Konversi_Printing @XKode = ?, @XIdTrans = ?', [9, $idTransaksi]);

                $barcode = [];

                foreach ($barcodeHasil as $item) {
                    $formattedCode = str_pad($item->NoIndeks, 9, '0', STR_PAD_LEFT) . '-' . $item->Kode_barang;

                    $barcode[] = [
                        'code' => $formattedCode,
                        'NAMA_BRG' => trim($item->NAMA_BRG),
                        'Qty_Primer' => (float) $item->Qty_Primer,
                        'Qty_sekunder' => $item->Qty_sekunder,
                        'Qty' => $item->Qty,
                        'Satuan_Primer' => $item->Satuan_Primer,
                        'Satuan_sekunder' => $item->Satuan_sekunder,
                        'Satuan' => $item->Satuan,
                        'Tgl_mutasi' => $item->Tgl_mutasi
                    ];
                }
                if (count($barcode) > 0) {
                    return response()->json([
                        'success' => 'Barcode bisa dicetak!',
                        'barcode' => $barcode
                    ]);
                } else {
                    return response()->json([
                        'error' => 'Barcode tidak ditemukan!',
                    ]);
                }
            } catch (Exception $e) {
                return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
            }
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
