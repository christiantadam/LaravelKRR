<?php

namespace App\Http\Controllers\ABM\Konversi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use Auth;
use DB;
use Exception;
use DateTime;
use DateTimeZone;

class KonversiPotongJahitABMController extends Controller
{
    public function index()
    {
        $nomorUser = trim(Auth::user()->NomorUser);
        $access = (new HakAksesController)->HakAksesFiturMaster('ABM');
        $result = (new HakAksesController)->HakAksesFitur('Konversi Potong Jahit ABM');

        if ($result) {
            return view('ABM.Konversi.PotongJahit.KonversiPotongJahitABM', compact('access', 'nomorUser'));
        } else {
            return redirect()->route('ABM.Home')->with('status', 'Anda Tidak Memiliki Hak Akses Fitur Konversi Potong Jahit ABM!');
        }
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $dateTime = new DateTime("now", new DateTimeZone('Asia/Jakarta'));
        $date = $dateTime->format('Y-m-d');
        $Tgl_konversiMPJ = $request->input('Tgl_konversiMPJ');
        $shiftMPJ = $request->input('shiftMPJ');
        $idMesinMPJ = $request->input('idMesinMPJ');
        $hasilPCSMPJ = (float) $request->input('hasilPCSMPJ');
        $hasilKgMPJ = (float) $request->input('hasilKgMPJ');
        $pemakaian_TritierAsal = (float) $request->input('pemakaian_TritierAsal');
        $pemakaian_typeSekunderAsal = (float) $request->input('pemakaian_typeSekunderAsal');
        $kodeBarangHasil = $request->input('kodeBarangHasil');
        $nomorIndeksBarangAsal = $request->input('nomorIndeksBarangAsal');
        $kodeBarangAsal = $request->input('kodeBarangAsal');
        $barcodeAsal = $nomorIndeksBarangAsal . '-' . $kodeBarangAsal;
        $idOrderKerja = $request->input('idOrderKerja');
        $nomorOrderKerja = $request->input('nomorOrderKerja');
        $uraian_asal = (string) 'Group ' . $shiftMPJ . ", Asal Konversi ABM Potong Jahit | Id Order Kerja: " . $nomorOrderKerja;
        $uraian_tujuan = (string) 'Group ' . $shiftMPJ . ",  Tujuan Konversi ABM Potong Jahit | Id Order Kerja: " . $nomorOrderKerja;
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
            $idkonversi = "ABJ" . str_pad($newIdKonvPotongABM, 6, "0", STR_PAD_LEFT);

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
                        $Tgl_konversiMPJ,
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
                    [5, $kodeBarangHasil, $idMesinMPJ, $idOrderKerja]
                );

            if (count($DataTypeTujuan) < 1) {
                return response()->json([
                    'error' => (string) 'Belum ada id type tujuan untuk kode barang ' . $kodeBarangHasil . '. Dipersilahkan cek type tujuannya dulu.',
                ]);
            }

            if ($sisaTritier !== 0 && $sisaSekunder !== 0) {
                $jumlahHasilKonversi = 2;
                $IdTypeTujuan = [$DataTypeTujuan[0]->IdType, $idTypeAsal];
                $JumlahMasukSekunder = [$hasilPCSMPJ, $sisaSekunder];
                $JumlahMasukTritier = [$hasilKgMPJ, $sisaTritier];
                $idSubkelompokTujuan = [$DataTypeTujuan[0]->IdSubkelompok, $idSubKelompokAsal];
            } else {
                $IdTypeTujuan = [$DataTypeTujuan[0]->IdType];
                $JumlahMasukSekunder = [$hasilPCSMPJ];
                $JumlahMasukTritier = [$hasilKgMPJ];
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
                            $Tgl_konversiMPJ,
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
        if ($id == 'getDataKonversiPotongJahit') {
            $nomorIndeksBarangAsal = (int) $request->input('nomorIndeksBarangAsal');
            $kodeBarangAsal = $request->input('kodeBarangAsal');
            try {
                $dataBarcode = DB::connection('ConnABM')
                    ->select(
                        'EXEC SP_4384_ABM_Konversi_Potong_Jahit @XKode = ?, @XKodeBarang = ?, @XNomorIndeks = ?',
                        [0, $kodeBarangAsal, $nomorIndeksBarangAsal]
                    );

                $dataMesin = DB::connection('ConnABM')->select('EXEC SP_4384_ABM_Konversi_Potong_Jahit @XKode = ?', [1]);

                if (str_contains($dataBarcode[0]->idkonversi_barcode, 'ABJ')) {
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
