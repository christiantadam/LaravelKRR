<?php

namespace App\Http\Controllers\ABM\Transaksi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use Exception;
use DB;
use Auth;
use DateTime;
use DateTimeZone;

class MaintenanceOrderKerjaABMController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('ABM');
        return view('ABM.Transaksi.OrderKerja.MaintenanceOrderKerja', compact('access'));
    }

    public function create()
    {
        dd('MaintenanceOrderKerjaController Create');
    }

    public function store(Request $request)
    {
        $jenisStore = $request->jenisStore;
        if ($jenisStore == 'storeOrderKerja') {
            $NomorOrderKerja = $request->NomorOrderKerja;
            $TanggalRencanaMulaiKerja = $request->TanggalRencanaMulaiKerja;
            $TanggalRencanaSelesaiKerja = $request->TanggalRencanaSelesaiKerja;
            $SisaSaldoInventory = $request->SisaSaldoInventory;
            $IDPesanan = $request->IDPesanan;
            $JenisOK = $request->JenisOK;
            $KBPrintingWoven = $request->KBPrintingWoven;
            $JumlahKBStghJadi = $request->JumlahKBStghJadi;
            $KBSetengahJadiWovenArray = json_decode($request->KBSetengahJadiWovenArray, true) ?? [];
            $WarnaPrinting = $request->WarnaPrinting;
            $CorakPrinting = $request->CorakPrinting;
            $KBPrintingStarpak = $request->KBPrintingStarpak;
            $KBPrintingStarpakPatchAtas = $request->KBPrintingStarpakPatchAtas;
            $KBPrintingStarpakPatchBawah = $request->KBPrintingStarpakPatchBawah;
            $Ukuran = $request->Ukuran;
            $Rajutan = $request->Rajutan;
            $Denier = $request->Denier;
            $Packing = $request->Packing;
            $WarnaKarungWoven = $request->WarnaKarungWoven;
            $InnerWoven = $request->InnerWoven;
            $PotongWoven = $request->PotongWoven;
            $JahitAtasWoven = $request->JahitAtasWoven;
            $JahitBawahWoven = $request->JahitBawahWoven;
            $DrumKliseStarpak = $request->DrumKliseStarpak;
            $PanjangPotongStarpak = $request->PanjangPotongStarpak;
            $CoronaStarpak = $request->CoronaStarpak;
            $AirPermeabilityStarpak = $request->AirPermeabilityStarpak;
            $PrintMaxStarpak = $request->PrintMaxStarpak;
            $RollStarpak = $request->RollStarpak;
            $KertasStarpak = $request->KertasStarpak;
            $InnerStarpak = $request->InnerStarpak;
            $SpoonBondStarpak = $request->SpoonBondStarpak;
            $RollPatchAtas = $request->RollPatchAtas;
            $DrumKliseStarpakPatchAtas = $request->DrumKliseStarpakPatchAtas;
            $CorakPrintingPatchAtas = $request->corakPrintingPatchAtas;
            $WarnaPrintingPatchAtas = $request->WarnaPrintingPatchAtas ?? null;
            $JumlahPatchAtas = $request->JumlahPatchAtas;
            $CoronaPatchAtas = $request->CoronaPatchAtas;
            $RollPatchBawah = $request->RollPatchBawah;
            $DrumKliseStarpakPatchBawah = $request->DrumKliseStarpakPatchBawah;
            $CorakPrintingPatchBawah = $request->corakPrintingPatchBawah;
            $WarnaPrintingPatchBawah = $request->WarnaPrintingPatchBawah ?? null;
            $JumlahPatchBawah = $request->JumlahPatchBawah;
            $CoronaPatchBawah = $request->CoronaPatchBawah;
            $Keterangan = $request->Keterangan;
            $ContohPacking = $request->file('gambar_contohPacking');
            try {
                DB::connection('ConnABM')->statement('EXEC SP_4384_Maintenance_Nomor_Order_Kerja
                @XKode = ?,
                @XJenisOK = ?,
                @XTanggalRencanaMulaiKerja = ?,
                @XTanggalRencanaSelesaiKerja = ?,
                @XNomorOrderKerja = ?,
                @XSisaSaldoInventory = ?,
                @XIdPesanan = ?,
                @XNomorUser = ?,
                @XKBPrintingWoven = ?,
                @JumlahKBStghJadi = ?,
                @XKBSetengahJadiWoven = ?,
                @XKBSetengahJadiWoven1 = ?,
                @XKBSetengahJadiWoven2 = ?,
                @XWarnaPrinting = ?,
                @XCorakPrinting = ?,
                @XKBPrintingStarpak = ?,
                @XKBPrintingStarpakPatchAtas = ?,
                @XKBPrintingStarpakPatchBawah = ?,
                @XUkuran = ?,
                @XRajutan = ?,
                @XDenier = ?,
                @XPacking = ?,
                @XWarnaKarungWoven = ?,
                @XPotongWoven = ?,
                @XInnerWoven = ?,
                @XJahitAtasWoven = ?,
                @XJahitBawahWoven = ?,
                @XDrumKliseStarpak = ?,
                @XPanjangPotongStarpak = ?,
                @XCoronaStarpak = ?,
                @XAirPermeabilityStarpak = ?,
				@XPrintMaxStarpak = ?,
                @XRollStarpak = ?,
                @XKertasStarpak = ?,
                @XInnerStarpak = ?,
                @XSpoonBondStarpak = ?,
                @XRollPatchAtas = ?,
                @XDrumKliseStarpakPatchAtas = ?,
                @XCorakPrintingPatchAtas = ?,
                @XWarnaPrintingPatchAtas = ?,
                @XJumlahPatchAtas = ?,
                @XCoronaPatchAtas = ?,
                @XRollPatchBawah = ?,
                @XDrumKliseStarpakPatchBawah = ?,
                @XCorakPrintingPatchBawah = ?,
                @XWarnaPrintingPatchBawah = ?,
                @XJumlahPatchBawah = ?,
                @XCoronaPatchBawah = ?,
                @XKeterangan = ?,
                @XContohPacking = ?',
                    [
                        3,
                        $JenisOK,
                        $TanggalRencanaMulaiKerja,
                        $TanggalRencanaSelesaiKerja,
                        $NomorOrderKerja,
                        $SisaSaldoInventory,
                        $IDPesanan,
                        trim(Auth::user()->NomorUser),
                        $KBPrintingWoven,
                        $JumlahKBStghJadi,
                        $KBSetengahJadiWovenArray[0] ?? NULL,
                        $KBSetengahJadiWovenArray[1] ?? NULL,
                        $KBSetengahJadiWovenArray[2] ?? NULL,
                        $WarnaPrinting,
                        $CorakPrinting,
                        $KBPrintingStarpak,
                        $KBPrintingStarpakPatchAtas,
                        $KBPrintingStarpakPatchBawah,
                        $Ukuran,
                        $Rajutan,
                        $Denier,
                        $Packing,
                        $WarnaKarungWoven,
                        $PotongWoven,
                        $InnerWoven,
                        $JahitAtasWoven,
                        $JahitBawahWoven,
                        $DrumKliseStarpak,
                        $PanjangPotongStarpak,
                        $CoronaStarpak,
                        $AirPermeabilityStarpak,
                        $PrintMaxStarpak,
                        $RollStarpak,
                        $KertasStarpak,
                        $InnerStarpak,
                        $SpoonBondStarpak,
                        $RollPatchAtas,
                        $DrumKliseStarpakPatchAtas,
                        $CorakPrintingPatchAtas,
                        $WarnaPrintingPatchAtas,
                        $JumlahPatchAtas,
                        $CoronaPatchAtas,
                        $RollPatchBawah,
                        $DrumKliseStarpakPatchBawah,
                        $CorakPrintingPatchBawah,
                        $WarnaPrintingPatchBawah,
                        $JumlahPatchBawah,
                        $CoronaPatchBawah,
                        $Keterangan,
                        $ContohPacking ? base64_encode(file_get_contents($ContohPacking->getRealPath())) : null,
                    ]
                );
                return response()->json(['success' => 'Data Order Kerja berhasil disimpan.']);
            } catch (Exception $e) {
                return response()->json([
                    'error' => 'Terjadi Kesalahan! ' . $e->getMessage()
                ], 500, [], JSON_PARTIAL_OUTPUT_ON_ERROR);
            }
        } else if ($jenisStore == 'editOrderKerja') {
            $idOrder = $request->idOrder;
            $TanggalRencanaMulaiKerja = $request->TanggalRencanaMulaiKerja;
            $TanggalRencanaSelesaiKerja = $request->TanggalRencanaSelesaiKerja;
            $SisaSaldoInventory = $request->SisaSaldoInventory;
            $WarnaPrinting = $request->WarnaPrinting;
            $CorakPrinting = $request->CorakPrinting;
            $Ukuran = $request->Ukuran;
            $Rajutan = $request->Rajutan;
            $Denier = $request->Denier;
            $Packing = $request->Packing;
            $WarnaKarungWoven = $request->WarnaKarungWoven;
            $PotongWoven = $request->PotongWoven;
            $InnerWoven = $request->InnerWoven;
            $JahitAtasWoven = $request->JahitAtasWoven;
            $JahitBawahWoven = $request->JahitBawahWoven;
            $DrumKliseStarpak = $request->DrumKliseStarpak;
            $PanjangPotongStarpak = $request->PanjangPotongStarpak;
            $CoronaStarpak = $request->CoronaStarpak;
            $AirPermeabilityStarpak = $request->AirPermeabilityStarpak;
            $PrintMaxStarpak = $request->PrintMaxStarpak;
            $RollStarpak = $request->RollStarpak;
            $KertasStarpak = $request->KertasStarpak;
            $InnerStarpak = $request->InnerStarpak;
            $SpoonBondStarpak = $request->SpoonBondStarpak;
            $RollPatchAtas = $request->RollPatchAtas;
            $DrumKliseStarpakPatchAtas = $request->DrumKliseStarpakPatchAtas;
            $CorakPrintingPatchAtas = $request->corakPrintingPatchAtas;
            $WarnaPrintingPatchAtas = $request->WarnaPrintingPatchAtas;
            $JumlahPatchAtas = $request->JumlahPatchAtas;
            $CoronaPatchAtas = $request->CoronaPatchAtas;
            $RollPatchBawah = $request->RollPatchBawah;
            $DrumKliseStarpakPatchBawah = $request->DrumKliseStarpakPatchBawah;
            $CorakPrintingPatchBawah = $request->corakPrintingPatchBawah;
            $WarnaPrintingPatchBawah = $request->WarnaPrintingPatchBawah;
            $JumlahPatchBawah = $request->JumlahPatchBawah;
            $CoronaPatchBawah = $request->CoronaPatchBawah;
            $Keterangan = $request->Keterangan;
            if ($request->hasFile('gambar_contohPacking')) {
                $file = $request->file('gambar_contohPacking');
                $binaryData = base64_encode(file_get_contents($file->getRealPath()));
            } else {
                $binaryData = $request->input('gambar_contohPacking_existing');
            }

            try {
                DB::connection('ConnABM')->statement('EXEC SP_4384_Maintenance_Nomor_Order_Kerja
                @XKode = ?,
                @XIdOrderKerja = ?,
                @XTanggalRencanaMulaiKerja = ?,
                @XTanggalRencanaSelesaiKerja = ?,
                @XSisaSaldoInventory = ?,
                @XNomorUser = ?,
                @XWarnaPrinting = ?,
                @XCorakPrinting = ?,
                @XUkuran = ?,
                @XRajutan = ?,
                @XDenier = ?,
                @XPacking = ?,
                @XWarnaKarungWoven = ?,
                @XInnerWoven = ?,
                @XPotongWoven = ?,
                @XJahitAtasWoven = ?,
                @XJahitBawahWoven = ?,
                @XDrumKliseStarpak = ?,
                @XPanjangPotongStarpak = ?,
                @XCoronaStarpak = ?,
                @XAirPermeabilityStarpak = ?,
				@XPrintMaxStarpak = ?,
                @XRollStarpak = ?,
                @XKertasStarpak = ?,
                @XInnerStarpak = ?,
                @XSpoonBondStarpak = ?,
                @XRollPatchAtas = ?,
                @XDrumKliseStarpakPatchAtas = ?,
                @XCorakPrintingPatchAtas = ?,
                @XWarnaPrintingPatchAtas = ?,
                @XJumlahPatchAtas = ?,
                @XCoronaPatchAtas = ?,
                @XRollPatchBawah = ?,
                @XDrumKliseStarpakPatchBawah = ?,
                @XCorakPrintingPatchBawah = ?,
                @XWarnaPrintingPatchBawah = ?,
                @XJumlahPatchBawah = ?,
                @XCoronaPatchBawah = ?,
                @XKeterangan = ?,
                @XContohPacking = ?',
                    [
                        10,
                        $idOrder,
                        $TanggalRencanaMulaiKerja,
                        $TanggalRencanaSelesaiKerja,
                        $SisaSaldoInventory,
                        trim(Auth::user()->NomorUser),
                        $WarnaPrinting,
                        $CorakPrinting,
                        $Ukuran,
                        $Rajutan,
                        $Denier,
                        $Packing,
                        $WarnaKarungWoven,
                        $InnerWoven,
                        $PotongWoven,
                        $JahitAtasWoven,
                        $JahitBawahWoven,
                        $DrumKliseStarpak,
                        $PanjangPotongStarpak,
                        $CoronaStarpak,
                        $AirPermeabilityStarpak,
                        $PrintMaxStarpak,
                        $RollStarpak,
                        $KertasStarpak,
                        $InnerStarpak,
                        $SpoonBondStarpak,
                        $RollPatchAtas,
                        $DrumKliseStarpakPatchAtas,
                        $CorakPrintingPatchAtas,
                        $WarnaPrintingPatchAtas,
                        $JumlahPatchAtas,
                        $CoronaPatchAtas,
                        $RollPatchBawah,
                        $DrumKliseStarpakPatchBawah,
                        $CorakPrintingPatchBawah,
                        $WarnaPrintingPatchBawah,
                        $JumlahPatchBawah,
                        $CoronaPatchBawah,
                        $Keterangan,
                        $binaryData,
                    ]
                );
                return response()->json(['success' => 'Data Order Kerja berhasil diedit.']);
            } catch (Exception $e) {
                return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
            }
        } else if ($jenisStore == 'editHighlightKeteranganOrderKerja') {
            $idOrder = $request->idOrder;
            $KeteranganHighlight = $request->KeteranganHighlight;
            try {
                DB::connection('ConnABM')->statement('EXEC SP_4384_Maintenance_Nomor_Order_Kerja
                @XKode = ?,
                @XIdOrderKerja = ?,
                @XKeteranganHighlight = ?',
                    [
                        11,
                        $idOrder,
                        implode(',', $KeteranganHighlight ?? []),
                    ]
                );
                return response()->json(['success' => 'Data Order Kerja berhasil diedit.']);
            } catch (Exception $e) {
                return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
            }
        } else {
            return response()->json(['error' => (string) "Undefined jenisStore: " . $jenisStore]);
        }
    }

    public function show($id, Request $request)
    {
        if ($id == 'getDataPermohonanOrderKerja') {
            $listOrderKerja = DB::connection('ConnABM')->select('EXEC SP_4384_Maintenance_Nomor_Order_Kerja @XKode = ?', [0]);
            // Convert the data into an array that DataTables can consume
            $dataOrderKerja = [];
            foreach ($listOrderKerja as $OrderKerja) {
                $dataOrderKerja[] = [
                    'IdOrder' => $OrderKerja->IdOrder,
                    'NomorOrderKerja' => $OrderKerja->No_OK,
                    'NomorSP' => $OrderKerja->IDSuratPesanan,
                    'JenisOK' => $OrderKerja->JenisOK,
                    'KodeBarang' => $OrderKerja->KodeBarang
                ];
            }

            return datatables($dataOrderKerja)->make(true);
        } else if ($id == 'getDataInputPermohonanOrderKerja') {
            $dataNomorOrderKerja = DB::connection('ConnABM')->select('EXEC SP_4384_Maintenance_Nomor_Order_Kerja @XKode = ?', [1]);
            $dataSuratPesanan = DB::connection('ConnABM')->select('EXEC SP_4384_Maintenance_Nomor_Order_Kerja @XKode = ?', [2]);
            return response()->json([
                'success' => true,
                'NomorOrderKerja' => $dataNomorOrderKerja,
                'dataSuratPesanan' => $dataSuratPesanan
            ]);
        } else if ($id == 'getDataJenisOrderKerja') {
            $dataJenisOrderKerja = DB::connection('ConnABM')->select('EXEC SP_4384_Maintenance_Nomor_Order_Kerja @XKode = ?', [8]);
            return response()->json([
                'success' => true,
                'dataJenisOrderKerja' => $dataJenisOrderKerja
            ]);
        } else if ($id == 'getDataSPBerdasarkanNomorOrderKerja') {
            $NomorOrderKerja = $request->input('NomorOrderKerja');
            $JenisOK = $request->input('JenisOK');
            $cekNomorOrderKerja = DB::connection('ConnABM')->select('EXEC SP_4384_Maintenance_Nomor_Order_Kerja @XKode = ?, @XNomorOrderKerja = ?, @XJenisOK = ?', [6, $NomorOrderKerja, $JenisOK]);
            if ($cekNomorOrderKerja[0]->JumlahNomorOrderKerja > 0) {
                $dataSuratPesanan = DB::connection('ConnABM')->select('EXEC SP_4384_Maintenance_Nomor_Order_Kerja @XKode = ?, @XNomorOrderKerja = ?, @XJenisOK= ?', [7, $NomorOrderKerja, $JenisOK]);
            } else {
                $dataSuratPesanan = DB::connection('ConnABM')->select('EXEC SP_4384_Maintenance_Nomor_Order_Kerja @XKode = ?', [2]);
            }
            return response()->json([
                'success' => true,
                'dataSuratPesanan' => $dataSuratPesanan,
                'cekNomorOrderKerja' => $cekNomorOrderKerja
            ]);
        } else if ($id == 'getDataBarangByKodeBarang') {
            $kodeBarang = $request->input('kodeBarang');
            $namaSubKategori = $request->input('namaSubKategori');
            $dataBarang = DB::connection('ConnABM')->select('EXEC SP_4384_Maintenance_Nomor_Order_Kerja @XKode = ?, @XKdBarang = ?, @XNamaSubKategori = ?', [9, $kodeBarang, $namaSubKategori]);
            return response()->json([
                'success' => true,
                'dataBarang' => $dataBarang
            ]);
        } else if ($id == 'getDetailOrderKerja') {
            $IdOrderKerja = $request->input('IdOrderKerja');
            $JenisOK = $request->input('JenisOK');
            $dataDetailOrderKerja = DB::connection('ConnABM')->select('EXEC SP_4384_Maintenance_Nomor_Order_Kerja @XKode = ?, @XIdOrderKerja = ?, @XJenisOK = ?', [5, $IdOrderKerja, $JenisOK]);
            return response()->json([
                'success' => true,
                'dataDetailOrderKerja' => $dataDetailOrderKerja
            ]);
        } else if ($id == 'printOrderKerja') {
            $IdOrderKerja = $request->idOrder;
            $JenisOrderKerja = $request->jenisOK;
            $dataDetailOrderKerja = DB::connection('ConnABM')
                ->select('EXEC SP_4384_Maintenance_Nomor_Order_Kerja @XKode = ?, @XIdOrderKerja = ?, @XJenisOK = ?', [5, $IdOrderKerja, $JenisOrderKerja]);
            if (!$dataDetailOrderKerja) {
                abort(404);
            }

            // Load Blade view with data
            if ($JenisOrderKerja == 1) {
                # get data and then open new tab ABM.Transaksi.OrderKerja.Print.Woven
                return view('ABM.Transaksi.OrderKerja.Print.Woven', compact('dataDetailOrderKerja'));
            } else if ($JenisOrderKerja == 2) {
                # get data and then open new tab ABM.Transaksi.OrderKerja.Print.Starpak
                return view('ABM.Transaksi.OrderKerja.Print.Starpak', compact('dataDetailOrderKerja'));
            }
        } else {
            return response()->json(['error' => (string) "Undefined request: " . $id]);
        }
    }

    public function edit($id)
    {
        dd('MaintenanceOrderKerjaController Edit');
    }

    public function update(Request $request, $id)
    {
        dd('MaintenanceOrderKerjaController Update');
    }

    public function destroy($id)
    {
        try {
            DB::connection('ConnABM')->statement('EXEC SP_4384_Maintenance_Nomor_Order_Kerja
                @XKode = ?,
                @XIdOrderKerja = ?,
                @XNomorUser = ?',
                [
                    4,
                    $id,
                    trim(Auth::user()->NomorUser),
                ]
            );
            return response()->json(['success' => 'Data Order Kerja berhasil dinonaktifkan.']);
        } catch (Exception $e) {
            return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
        }
    }
}
