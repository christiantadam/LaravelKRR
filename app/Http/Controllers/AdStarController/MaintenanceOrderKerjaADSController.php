<?php

namespace App\Http\Controllers\AdStarController;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use Yajra\DataTables\DataTables;
use Exception;
use DB;
use Auth;
use DateTime;
use DateTimeZone;

class MaintenanceOrderKerjaADSController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('AD Star');
        return view('AdStar.Transaksi.OrderKerja.MaintenanceOrderKerja', compact('access'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $jenisStore = $request->jenisStore;
        if ($jenisStore == 'storeOrderKerja') {
            $No_Ok = $request->No_Ok;
            $IdOrderPrinting = $request->IdOrderPrinting;
            $No_OkPrinting = $request->No_OkPrinting;
            $KBTabelHitungan = $request->KBTabelHitungan;
            $IdTabelHitungan = $request->IdTabelHitungan;
            $Ukuran = $request->Ukuran;
            $Rajutan = $request->Rajutan;
            $Denier = $request->Denier;
            $WarnaKarung = $request->WarnaKarung;
            $InnerStarpak = $request->InnerStarpak;
            $Lami = $request->Lami;
            $Kertas = $request->Kertas;
            $SpoonBond = $request->SpoonBond;
            $OPP = $request->OPP;
            $LebarBlockBottom = $request->LebarBlockBottom;
            $AirPermeability = $request->AirPermeability;
            $IdPesanan = $request->IdPesanan;
            $SisaSaldoInventory = $request->SisaSaldoInventory;
            $KBBody = $request->KBBody;
            $RollBody = $request->RollBody;
            $CorakBody = $request->CorakBody;
            $DrumKliseBody = $request->DrumKliseBody;
            $KBTopPatch = $request->KBTopPatch;
            $RollTopPatch = $request->RollTopPatch;
            $CorakTopPatch = $request->CorakTopPatch;
            $LebarTopPatch = $request->LebarTopPatch;
            $PanjangTopPatch = $request->PanjangTopPatch;
            $KBBottomPatch = $request->KBBottomPatch;
            $RollBottomPatch = $request->RollBottomPatch;
            $CorakBottomPatch = $request->CorakBottomPatch;
            $LebarBottomPatch = $request->LebarBottomPatch;
            $PanjangBottomPatch = $request->PanjangBottomPatch;
            $KBValve = $request->KBValve;
            $RollValve = $request->RollValve;
            $LebarValve = $request->LebarValve;
            $PanjangValve = $request->PanjangValve;
            $Packing = $request->Packing;
            $Keterangan = $request->Keterangan;
            $GambarHolePuncher = $request->file('GambarHolePuncher');

            try {
                DB::connection('ConnAdStar')->statement('EXEC SP_4384_ADSTAR_MAINTENANCE_ORDER_KERJA
                @XKode = ?,
                @XNo_Ok = ?,
                @XIdOrderPrinting = ?,
                @XNo_OkPrinting = ?,
                @XKBTabelHitungan = ?,
                @XIdTabelHitungan = ?,
                @XUkuran = ?,
                @XRajutan = ?,
                @XDenier = ?,
                @XWarnaKarung = ?,
                @XInnerStarpak = ?,
                @XLami = ?,
                @XKertas = ?,
                @XSpoonBond = ?,
                @XOPP = ?,
                @XLebarBlockBottom = ?,
                @XAirPermeability = ?,
                @XIdPesanan = ?,
                @XSisaSaldoInventory = ?,
                @XKBBody = ?,
                @XRollBody = ?,
                @XCorakBody = ?,
                @XDrumKliseBody = ?,
                @XKBTopPatch = ?,
                @XRollTopPatch = ?,
                @XCorakTopPatch = ?,
                @XLebarTopPatch = ?,
                @XPanjangTopPatch = ?,
                @XKBBottomPatch = ?,
                @XRollBottomPatch = ?,
                @XCorakBottomPatch = ?,
                @XLebarBottomPatch = ?,
                @XPanjangBottomPatch = ?,
                @XKBValve = ?,
                @XRollValve = ?,
                @XLebarValve = ?,
                @XPanjangValve = ?,
                @XPacking = ?,
                @XKeterangan = ?,
                @XGambarHolePuncher = ?,
                @XNomorUser = ?',
                    [
                        5,
                        $No_Ok,
                        $IdOrderPrinting,
                        $No_OkPrinting,
                        $KBTabelHitungan,
                        $IdTabelHitungan,
                        $Ukuran,
                        $Rajutan,
                        $Denier,
                        $WarnaKarung,
                        $InnerStarpak,
                        $Lami,
                        $Kertas,
                        $SpoonBond,
                        $OPP,
                        $LebarBlockBottom,
                        $AirPermeability,
                        $IdPesanan,
                        $SisaSaldoInventory,
                        $KBBody,
                        $RollBody,
                        $CorakBody,
                        $DrumKliseBody,
                        $KBTopPatch,
                        $RollTopPatch,
                        $CorakTopPatch,
                        $LebarTopPatch,
                        $PanjangTopPatch,
                        $KBBottomPatch,
                        $RollBottomPatch,
                        $CorakBottomPatch,
                        $LebarBottomPatch,
                        $PanjangBottomPatch,
                        $KBValve,
                        $RollValve,
                        $LebarValve,
                        $PanjangValve,
                        $Packing,
                        $Keterangan,
                        $GambarHolePuncher ? base64_encode(file_get_contents($GambarHolePuncher->getRealPath())) : null,
                        trim(Auth::user()->NomorUser),
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
            $KertasWoven = $request->KertasWoven;
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
                @XKertasWoven = ?,
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
                        $KertasWoven,
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
        } else {
            return response()->json(['error' => (string) "Undefined value in variable jenisStore: " . $jenisStore]);
        }
    }

    public function show($id, Request $request)
    {
        if ($id == 'getDataPermohonanOrderKerja') {
            $listOrderKerja = DB::connection('ConnAdStar')->select('EXEC SP_4384_ADSTAR_MAINTENANCE_ORDER_KERJA @XKode = ?', [0]);
            // Convert the data into an array that DataTables can consume
            $dataOrderKerja = [];
            foreach ($listOrderKerja as $OrderKerja) {
                $dataOrderKerja[] = [
                    'IdOrder' => $OrderKerja->IdOrder,
                    'NomorOrderKerja' => $OrderKerja->No_Ok,
                    'NomorSP' => $OrderKerja->IDSuratPesanan,
                    'Aktif' => $OrderKerja->Aktif,
                    'KodeBarang' => $OrderKerja->KodeBarang
                ];
            }
            return DataTables::of($dataOrderKerja)->make(true);
        } else if ($id == 'getDataOrderKerja') {
            $dataNomorOrderKerja = DB::connection('ConnAdStar')->select('EXEC SP_4384_ADSTAR_MAINTENANCE_ORDER_KERJA @XKode = ?', [1]);
            // dd($dataNomorOrderKerja);
            $dataSuratPesanan = DB::connection('ConnAdStar')->select('EXEC SP_4384_ADSTAR_MAINTENANCE_ORDER_KERJA @XKode = ?', [2]);
            $dataTabelHitungan = DB::connection('ConnAdStar')->select('EXEC SP_4384_ADSTAR_MAINTENANCE_ORDER_KERJA @XKode = ?', [4]);
            return response()->json([
                'success' => true,
                'NomorOrderKerja' => $dataNomorOrderKerja,
                'dataSuratPesanan' => $dataSuratPesanan,
                'dataTabelHitungan' => $dataTabelHitungan
            ]);
        } else if ($id == 'checkNomorOrderKerja') {
            $cekNomorOrderKerja = DB::connection('ConnAdStar')->select('EXEC SP_4384_ADSTAR_MAINTENANCE_ORDER_KERJA @XKode = ?', [3]);
            return response()->json([
                'success' => true,
                'cekNomorOrderKerja' => $cekNomorOrderKerja
            ]);
            // } else if ($id == 'getDataJenisOrderKerja') {
            //     $dataJenisOrderKerja = DB::connection('ConnABM')->select('EXEC SP_4384_Maintenance_Nomor_Order_Kerja @XKode = ?', [8]);
            //     return response()->json([
            //         'success' => true,
            //         'dataJenisOrderKerja' => $dataJenisOrderKerja
            //     ]);
            // } else if ($id == 'getDataSPBerdasarkanNomorOrderKerja') {
            //     $NomorOrderKerja = $request->input('NomorOrderKerja');
            //     $JenisOK = $request->input('JenisOK');
            //     $cekNomorOrderKerja = DB::connection('ConnABM')->select('EXEC SP_4384_Maintenance_Nomor_Order_Kerja @XKode = ?, @XNomorOrderKerja = ?, @XJenisOK = ?', [6, $NomorOrderKerja, $JenisOK]);
            //     if ($cekNomorOrderKerja[0]->JumlahNomorOrderKerja > 0) {
            //         $dataSuratPesanan = DB::connection('ConnABM')->select('EXEC SP_4384_Maintenance_Nomor_Order_Kerja @XKode = ?, @XNomorOrderKerja = ?, @XJenisOK= ?', [7, $NomorOrderKerja, $JenisOK]);
            //     } else {
            //         $dataSuratPesanan = DB::connection('ConnABM')->select('EXEC SP_4384_Maintenance_Nomor_Order_Kerja @XKode = ?', [2]);
            //     }
            //     return response()->json([
            //         'success' => true,
            //         'dataSuratPesanan' => $dataSuratPesanan,
            //         'cekNomorOrderKerja' => $cekNomorOrderKerja
            //     ]);
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
            $dataDetailOrderKerja = DB::connection('ConnAdStar')->select('EXEC SP_4384_ADSTAR_MAINTENANCE_ORDER_KERJA @XKode = ?, @XIdOrder = ?', [8, $IdOrderKerja]);
            return response()->json([
                'success' => true,
                'dataDetailOrderKerja' => $dataDetailOrderKerja
            ]);
        } else if ($id == 'printOrderKerja') {
            $IdOrderKerja = $request->idOrder;
            $dataDetailOrderKerja = DB::connection('ConnAdStar')
                ->select('EXEC SP_4384_ADSTAR_MAINTENANCE_ORDER_KERJA @XKode = ?, @XIdOrder = ?', [6, $IdOrderKerja]);
            if (!$dataDetailOrderKerja) {
                abort(404);
            }
            // dd($dataDetailOrderKerja);
            return view('AdStar.Transaksi.OrderKerja.Print.CetakOrderKerja', compact('dataDetailOrderKerja'));
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
        try {
            DB::connection('ConnAdStar')->statement('EXEC SP_4384_ADSTAR_MAINTENANCE_ORDER_KERJA
                @XKode = ?,
                @XIdOrder = ?,
                @XNomorUser = ?',
                [
                    7,
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
