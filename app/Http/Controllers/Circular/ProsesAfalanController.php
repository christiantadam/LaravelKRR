<?php

namespace App\Http\Controllers\Circular;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Log;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class ProsesAfalanController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Circular');
        return view('Circular.transaksi.ProsesAfalan', compact('access'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $lstData = $request->input('allRowsDataAtas', []);
        $tanggal = $request->input('tanggal');
        $tonase = $request->input('tonase');
        $perMesin = $request->input('kg_mesin');
        $jmlMesin = $request->input('jumlah_mesin');
        $cek = $request->input('cek');
        $userId = trim(Auth::user()->NomorUser);

        // DB::connection('ConnCircular')->beginTransaction();
        // DB::connection('ConnInventory')->beginTransaction();

        try {
            // INSERT TONASE
            if ($cek != 1) {

                DB::connection('ConnCircular')->statement(
                    "EXEC SP_1273_CIR_Insert_Tonase 
                @kode = ?, 
                @Tgl = ?, 
                @Tonase = ?, 
                @KG = ?, 
                @Mesin = ?",
                    [
                        1,
                        $tanggal,
                        $tonase,
                        $perMesin,
                        $jmlMesin
                    ]
                );
            }

            foreach ($lstData as $row) {

                $mesin = $row['Nama_mesin'];
                $kodeBarangWA = $row['Spek_BenangWA'];
                $kodeBarangWE = $row['Spek_BenangWE'];

                $kgWA = $row['Brt_WA'];
                $kgWE = $row['Brt_WE'];

                // CEK SALDO WA
                $saldoWA = 0;
                $IdTypeWA = "";
                $IdSubKelWA = "";
                $KBWA = "";

                $cekWA = DB::connection('ConnInventory')->select(
                    "EXEC SP_1273_INV_Cek_Saldo_Benang 
                @Kode = ?, 
                @KodeBarang = ?, 
                @Mesin = ?",
                    [
                        1,
                        $kodeBarangWA,
                        $mesin
                    ]
                );

                if (count($cekWA) > 0) {

                    $saldoWA = $cekWA[0]->SaldoTritier;
                    $IdTypeWA = $cekWA[0]->IdType;
                    $IdSubKelWA = $cekWA[0]->IdSubkelompok_Type;
                    $KBWA = trim($cekWA[0]->KodeBarang);
                }

                if ($IdTypeWA == "") {
                    return response()->json([
                        'error' => "Benang WA belum di maintenance type pada mesin $mesin"
                    ]);
                }

                $saldoWA = $saldoWA - $kgWA;

                if ($saldoWA < 0) {
                    return response()->json([
                        'error' => "Saldo Benang WA kosong pada mesin $mesin"
                    ]);
                }

                // CEK SALDO WE
                $saldoWE = 0;
                $IdTypeWE = "";
                $IdSubKelWE = "";
                $KBWE = "";

                $cekWE = DB::connection('ConnInventory')->select(
                    "EXEC SP_1273_INV_Cek_Saldo_Benang 
                @Kode = ?, 
                @KodeBarang = ?, 
                @Mesin = ?",
                    [
                        1,
                        $kodeBarangWE,
                        $mesin
                    ]
                );

                if (count($cekWE) > 0) {

                    $saldoWE = $cekWE[0]->SaldoTritier;
                    $IdTypeWE = $cekWE[0]->IdType;
                    $IdSubKelWE = $cekWE[0]->IdSubkelompok_Type;
                    $KBWE = trim($cekWE[0]->KodeBarang);
                }

                if ($IdTypeWE == "") {
                    return response()->json([
                        'error' => "Benang WE belum di maintenance type pada mesin $mesin"
                    ]);
                }

                if ($IdTypeWA == $IdTypeWE) {
                    $saldoWE = $saldoWE - ($kgWA + $kgWE);
                } else {
                    $saldoWE = $saldoWE - $kgWE;
                }

                if ($saldoWE < 0) {
                    return response()->json([
                        'error' => "Saldo Benang WE kosong pada mesin $mesin"
                    ]);
                }

                // LOGIKA AFALAN BENANG
                $suffixWA = substr($kodeBarangWA, -2);
                $suffixWE = substr($kodeBarangWE, -2);
                $denier = (float) $row['Denier'];

                // AFALAN WA
                $IdTypeAfalanWA = "";
                $IdSubKelAfalanWA = "";
                $KBAfalanWA = "";
                $BenangWA = "";

                if ($suffixWA == "NT") {

                    $BenangWA = "BENANG PUTIH TRANSPARANT";
                    $IdTypeAfalanWA = "00000000000000291217";
                    $IdSubKelAfalanWA = "002169";
                    $KBAfalanWA = "000063931";

                } elseif ($suffixWA == "PE" && $denier < 1000) {

                    $BenangWA = "BENANG PUTIH";
                    $IdTypeAfalanWA = "00000000000001050669";
                    $IdSubKelAfalanWA = "002169";
                    $KBAfalanWA = "000127604";

                } elseif ($suffixWA == "MW" && $denier < 1000) {

                    $BenangWA = "BENANG PUTIH";
                    $IdTypeAfalanWA = "00000000000001050669";
                    $IdSubKelAfalanWA = "002169";
                    $KBAfalanWA = "000127604";

                } elseif ($suffixWA == "PE" && $denier >= 1000) {

                    $BenangWA = "BENANG PUTIH";
                    $IdTypeAfalanWA = "00000000000001050670";
                    $IdSubKelAfalanWA = "002169";
                    $KBAfalanWA = "000127603";

                } elseif ($suffixWA == "MW" && $denier >= 1000) {

                    $BenangWA = "BENANG PUTIH";
                    $IdTypeAfalanWA = "00000000000001050670";
                    $IdSubKelAfalanWA = "002169";
                    $KBAfalanWA = "000127603";

                } elseif ($suffixWA == "BR" || $suffixWA == "BL") {

                    $BenangWA = "BENANG BRK";
                    $IdTypeAfalanWA = "00000000000001050672";
                    $IdSubKelAfalanWA = "002175";
                    $KBAfalanWA = "000127602";

                } elseif ($suffixWA == "BK") {

                    $BenangWA = "BENANG HITAM";
                    $IdTypeAfalanWA = "00000000000000007170";
                    $IdSubKelAfalanWA = "002174";
                    $KBAfalanWA = "000043256";

                } elseif ($suffixWA == "BG") {

                    $BenangWA = "BENANG GADING";
                    $IdTypeAfalanWA = "00000000000001050671";
                    $IdSubKelAfalanWA = "002175";
                    $KBAfalanWA = "000127601";

                } elseif ($suffixWA == "YE") {

                    $BenangWA = "BENANG KUNING";
                    $IdTypeAfalanWA = "00000000000000294511";
                    $IdSubKelAfalanWA = "002175";
                    $KBAfalanWA = "000082018";

                } elseif ($suffixWA == "LR" || $suffixWA == "DR") {

                    $BenangWA = "BENANG MERAH";
                    $IdTypeAfalanWA = "00000000000000303241";
                    $IdSubKelAfalanWA = "002175";
                    $KBAfalanWA = "000072190";

                } elseif ($suffixWA == "LB" || $suffixWA == "DB") {

                    $BenangWA = "BENANG BIRU";
                    $IdTypeAfalanWA = "00000000000000303798";
                    $IdSubKelAfalanWA = "002175";
                    $KBAfalanWA = "000072697";

                } elseif ($suffixWA == "LG" || $suffixWA == "DG") {

                    $BenangWA = "BENANG HIJAU";
                    $IdTypeAfalanWA = "00000000000000305055";
                    $IdSubKelAfalanWA = "002175";
                    $KBAfalanWA = "000072191";

                } else {

                    return response()->json([
                        'error' => 'Spek Benang WA Tidak Dikenali, Hubungi EDP !'
                    ]);
                }

                // AFALAN WE
                $IdTypeAfalanWE = "";
                $IdSubKelAfalanWE = "";
                $KBAfalanWE = "";
                $BenangWE = "";

                if ($suffixWE == "NT") {

                    $BenangWE = "BENANG PUTIH TRANSPARANT";
                    $IdTypeAfalanWE = "00000000000000291217";
                    $IdSubKelAfalanWE = "002169";
                    $KBAfalanWE = "000063931";

                } elseif ($suffixWE == "PE" && $denier < 1000) {

                    $BenangWE = "BENANG PUTIH";
                    $IdTypeAfalanWE = "00000000000001050669";
                    $IdSubKelAfalanWE = "002169";
                    $KBAfalanWE = "000127604";

                } elseif ($suffixWE == "MW" && $denier < 1000) {

                    $BenangWE = "BENANG PUTIH";
                    $IdTypeAfalanWE = "00000000000001050669";
                    $IdSubKelAfalanWE = "002169";
                    $KBAfalanWE = "000127604";

                } elseif ($suffixWE == "PE" && $denier >= 1000) {

                    $BenangWE = "BENANG PUTIH";
                    $IdTypeAfalanWE = "00000000000001050670";
                    $IdSubKelAfalanWE = "002169";
                    $KBAfalanWE = "000127603";

                } elseif ($suffixWE == "MW" && $denier >= 1000) {

                    $BenangWE = "BENANG PUTIH";
                    $IdTypeAfalanWE = "00000000000001050670";
                    $IdSubKelAfalanWE = "002169";
                    $KBAfalanWE = "000127603";

                } elseif ($suffixWE == "BR" || $suffixWE == "BL") {

                    $BenangWE = "BENANG BRK";
                    $IdTypeAfalanWE = "00000000000001050672";
                    $IdSubKelAfalanWE = "002175";
                    $KBAfalanWE = "000127602";

                } elseif ($suffixWE == "BK") {

                    $BenangWE = "BENANG HITAM";
                    $IdTypeAfalanWE = "00000000000000007170";
                    $IdSubKelAfalanWE = "002174";
                    $KBAfalanWE = "000043256";

                } elseif ($suffixWE == "BG") {

                    $BenangWE = "BENANG GADING";
                    $IdTypeAfalanWE = "00000000000001050671";
                    $IdSubKelAfalanWE = "002175";
                    $KBAfalanWE = "000127601";

                } elseif ($suffixWE == "YE") {

                    $BenangWE = "BENANG KUNING";
                    $IdTypeAfalanWE = "00000000000000294511";
                    $IdSubKelAfalanWE = "002175";
                    $KBAfalanWE = "000082018";

                } elseif ($suffixWE == "LR" || $suffixWE == "DR") {

                    $BenangWE = "BENANG MERAH";
                    $IdTypeAfalanWE = "00000000000000303241";
                    $IdSubKelAfalanWE = "002175";
                    $KBAfalanWE = "000072190";

                } elseif ($suffixWE == "LB" || $suffixWE == "DB") {

                    $BenangWE = "BENANG BIRU";
                    $IdTypeAfalanWE = "00000000000000303798";
                    $IdSubKelAfalanWE = "002175";
                    $KBAfalanWE = "000072697";

                } elseif ($suffixWE == "LG" || $suffixWE == "DG") {

                    $BenangWE = "BENANG HIJAU";
                    $IdTypeAfalanWE = "00000000000000305055";
                    $IdSubKelAfalanWE = "002175";
                    $KBAfalanWE = "000072191";

                } else {

                    return response()->json([
                        'error' => 'Spek Benang WE Tidak Dikenali, Hubungi EDP !'
                    ]);
                }
                // PROSES AFALAN
                DB::connection('ConnInventory')->statement(
                    "EXEC SP_1273_CIR_Proses_Pemberi_Afalan
                @kode = ?, 
                @Mesin = ?, 
                @IdTypeBenangWA = ?, 
                @IdTypeBenangWE = ?, 
                @IdTypeAfalanWA = ?, 
                @IdTypeAfalanWE = ?, 
                @UserId = ?, 
                @TglAwal = ?, 
                @KGBenangWA = ?, 
                @KGBenangWE = ?, 
                @IdSubKelBenangWA = ?, 
                @IdSubKelBenangWE = ?, 
                @IdSubKelAfalanWA = ?, 
                @IdSubKelAfalanWE = ?, 
                @KBBenangWA = ?, 
                @KBBenangWE = ?, 
                @KBAfalanWA = ?, 
                @KBAfalanWE = ?, 
                @IdOrder = ?, 
                @IdMesin = ?",
                    [
                        1,
                        $mesin,
                        $IdTypeWA,
                        $IdTypeWE,
                        $IdTypeAfalanWA,
                        $IdTypeAfalanWA,
                        $userId,
                        $tanggal,
                        $kgWA,
                        $kgWE,
                        $IdSubKelWA,
                        $IdSubKelWE,
                        $IdSubKelAfalanWA,
                        $IdSubKelAfalanWA,
                        trim($KBWA),
                        trim($KBWE),
                        trim($KBAfalanWA),
                        trim($KBAfalanWA),
                        $row['Id_order'],
                        $row['Id_Mesin']
                    ]
                );
            }

            // DB::connection('ConnCircular')->commit();
            // DB::connection('ConnInventory')->commit();
            return response()->json(['message' => 'Data Tersimpan !']);

        } catch (Exception $e) {
            // DB::connection('ConnCircular')->rollBack();
            // DB::connection('ConnInventory')->rollBack();
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function show(Request $request, $id)
    {
        if ($id == 'getMesinAktif') {

            $tanggal = $request->input('tanggal');

            $lookup = DB::connection('ConnCircular')
                ->select(
                    'EXEC SP_1273_CIR_CEK_MesinAktif @Kode = ?',
                    [3]
                );

            $mesin = DB::connection('ConnCircular')
                ->select(
                    'EXEC SP_1273_CIR_CEK_MesinAktif @Kode = ?, @Tgl = ?',
                    [1, $tanggal]
                );

            $jmlMesin = 0;
            if (!empty($mesin)) {
                $jmlMesin = $mesin[0]->JmlMesin;
            }

            $dataMesin = DB::connection('ConnCircular')
                ->select(
                    'EXEC SP_1273_CIR_CEK_MesinAktif @Kode = ?, @Tgl = ?',
                    [2, $tanggal]
                );
            // dd($dataMesin);
            $response = [];

            foreach ($dataMesin as $row) {

                $jumlahOrder = $row->JumlahOrder ?? 0;

                $response[] = [
                    'Nama_mesin' => trim($row->Nama_mesin),
                    'Id_order' => trim($row->Id_order),
                    'KB_BarangJadi' => trim($row->KB_BarangJadi),
                    'NAMA_BRG' => trim($row->NAMA_BRG),
                    'KB_BenangWA' => trim($row->KB_BenangWA),
                    'KB_BenangWE' => trim($row->KB_BenangWE),
                    'Spek_BenangWA' => trim($row->Spek_BenangWA),
                    'Spek_BenangWE' => trim($row->Spek_BenangWE),
                    'JumlahOrder' => $jumlahOrder,
                    'Denier' => $row->Denier,
                    'Id_Mesin' => $row->Id_Mesin,
                ];
            }
            return datatables($lookup)->make(true);

        } else if ($id == 'getDetailAfalan') {
            $tanggal = $request->input('tanggal');
            $tonase = (float) $request->input('tonase');
            // dd($tanggal, $tonase);
            $kg = ($tonase * 2) / 100;
            $mesin = DB::connection('ConnCircular')
                ->select(
                    'EXEC SP_1273_CIR_CEK_MesinAktif @Kode = ?, @Tgl = ?',
                    [1, $tanggal]
                );
            // dd($mesin);
            $jmlMesin = 0;

            if (!empty($mesin)) {
                $jmlMesin = $mesin[0]->JmlMesin;
            }

            $perMesin = 0;

            if ($jmlMesin > 0) {
                $perMesin = $kg / $jmlMesin;
            }

            $perMesin = round($perMesin, 2);

            $dataMesin = DB::connection('ConnCircular')
                ->select(
                    'EXEC SP_1273_CIR_CEK_MesinAktif @Kode = ?, @Tgl = ?',
                    [2, $tanggal]
                );

            $response = [];

            foreach ($dataMesin as $row) {

                $jumlahOrder = $row->JumlahOrder ?? 0;

                $perOrder = 0;

                if ($jumlahOrder > 0) {
                    $perOrder = $perMesin / $jumlahOrder;
                }

                $Lebar = $row->Lebar ?? 0;
                $RWa = $row->RWa ?? 0;
                $DWA = $row->DWA ?? 0;
                $RWe = $row->RWe ?? 0;
                $DWe = $row->DWe ?? 0;
                $JRein = $row->JRein ?? 0;
                $LRein = $row->LRein ?? 0;
                $Ket = $row->Ket ?? '';

                $BrtStrip = 0;

                $P1 = $perOrder * 1143000;

                $P2 =
                    $Lebar * (($RWa * $DWA) + ($RWe * $DWe)) +
                    0.5 * $JRein * $LRein * $RWa * $DWA;

                $P = 0;

                if ($P2 != 0) {
                    $P = $P1 / $P2;
                }

                $xReinf = ($JRein * $LRein * $RWa * $DWA * $P) / 2286000;

                $xBrt_WA = ($Lebar * $P * $RWa * $DWA) / 1143000;

                if (str_starts_with($Ket, 'BELAH LAYAR') || str_starts_with($Ket, 'FLAT')) {
                    $Brt_WA = $xBrt_WA + $xReinf - $BrtStrip;
                } else {
                    $Brt_WA = $xBrt_WA + $xReinf - $BrtStrip;
                }

                $xBrt_WE = ($Lebar * $P * $RWe * $DWe) / 1143000;

                if (str_starts_with($Ket, 'BELAH LAYAR') || str_starts_with($Ket, 'FLAT')) {
                    $Brt_WE = $xBrt_WE;
                } else {
                    $Brt_WE = $xBrt_WE;
                }

                $response[] = [

                    'Nama_mesin' => trim($row->Nama_mesin),
                    'Id_order' => trim($row->Id_order),

                    'KB_BarangJadi' => trim($row->KB_BarangJadi),
                    'NAMA_BRG' => trim($row->NAMA_BRG),

                    'KB_BenangWA' => trim($row->KB_BenangWA),
                    'KB_BenangWE' => trim($row->KB_BenangWE),

                    'Spek_BenangWA' => trim($row->Spek_BenangWA),
                    'Spek_BenangWE' => trim($row->Spek_BenangWE),

                    'JumlahOrder' => $jumlahOrder,

                    'PerOrder' => round($perOrder, 2),

                    'Brt_WA' => round($Brt_WA, 2),
                    'Brt_WE' => round($Brt_WE, 2),

                    'Denier' => $row->Denier,
                    'Id_Mesin' => $row->Id_Mesin
                ];
            }
            // dd($tonase, $kg, $jmlMesin, $perMesin, $response);
            return response()->json([
                'tonase' => $tonase,
                'kg' => $kg,
                'jumlah_mesin' => $jmlMesin,
                'per_mesin' => $perMesin,
                'data' => $response
            ]);

        } else if ($id == 'getDatatable') {
            $tanggal = $request->input('tanggal');
            $tonase = (float) $request->input('tonase');
            // dd($tanggal, $tonase);
            $kg = ($tonase * 2) / 100;
            $mesin = DB::connection('ConnCircular')
                ->select(
                    'EXEC SP_1273_CIR_CEK_MesinAktif @Kode = ?, @Tgl = ?',
                    [1, $tanggal]
                );
            // dd($mesin);
            $jmlMesin = 0;

            if (!empty($mesin)) {
                $jmlMesin = $mesin[0]->JmlMesin;
            }

            $perMesin = 0;

            if ($jmlMesin > 0) {
                $perMesin = $kg / $jmlMesin;
            }

            $perMesin = round($perMesin, 2);

            $dataMesin = DB::connection('ConnCircular')
                ->select(
                    'EXEC SP_1273_CIR_CEK_MesinAktif @Kode = ?, @Tgl = ?',
                    [2, $tanggal]
                );

            $response = [];
            foreach ($dataMesin as $row) {
                $jumlahOrder = $row->JumlahOrder ?? 0;

                $perOrder = 0;

                if ($jumlahOrder > 0) {
                    $perOrder = $perMesin / $jumlahOrder;
                }

                $listType = DB::connection('ConnCircular')
                    ->select(
                        'EXEC sp_List_Type @kode = ?, @IdORder = ?, @Kd_Brg = ?',
                        [1, $row->Id_order, $row->KB_BarangJadi]
                    );

                $Lebar = $listType[0]->Lebar ?? 0;
                $RWa = $listType[0]->Rwa ?? 0;
                $DWA = $listType[0]->Dwa ?? 0;
                $RWe = $listType[0]->Rwe ?? 0;
                $DWe = $listType[0]->Dwe ?? 0;
                $JRein = $listType[0]->JmlReinf ?? 0;
                $LRein = $listType[0]->LReinf ?? 0;
                $Ket = $listType[0]->Ket ?? '';

                $BrtStrip = 0;

                $P1 = $perOrder * 1143000;

                $P2 =
                    $Lebar * (($RWa * $DWA) + ($RWe * $DWe)) +
                    0.5 * $JRein * $LRein * $RWa * $DWA;

                $P = 0;

                if ($P2 != 0) {
                    $P = $P1 / $P2;
                }

                $xReinf = ($JRein * $LRein * $RWa * $DWA * $P) / 2286000;

                $xBrt_WA = ($Lebar * $P * $RWa * $DWA) / 1143000;

                if (str_starts_with($Ket, 'BELAH LAYAR') || str_starts_with($Ket, 'FLAT')) {
                    $Brt_WA = $xBrt_WA + $xReinf - $BrtStrip;
                } else {
                    $Brt_WA = $xBrt_WA + $xReinf - $BrtStrip;
                }

                $xBrt_WE = ($Lebar * $P * $RWe * $DWe) / 1143000;

                if (str_starts_with($Ket, 'BELAH LAYAR') || str_starts_with($Ket, 'FLAT')) {
                    $Brt_WE = $xBrt_WE;
                } else {
                    $Brt_WE = $xBrt_WE;
                }

                $response[] = [

                    'Nama_mesin' => trim($row->Nama_mesin),
                    'Id_order' => trim($row->Id_order),

                    'KB_BarangJadi' => trim($row->KB_BarangJadi),
                    'NAMA_BRG' => trim($row->NAMA_BRG),

                    'KB_BenangWA' => trim($row->KB_BenangWA),
                    'KB_BenangWE' => trim($row->KB_BenangWE),

                    'Spek_BenangWA' => trim($row->Spek_BenangWA),
                    'Spek_BenangWE' => trim($row->Spek_BenangWE),

                    'JumlahOrder' => $jumlahOrder,

                    'PerOrder' => round($perOrder, 2),

                    'Brt_WA' => round($Brt_WA, 2),
                    'Brt_WE' => round($Brt_WE, 2),

                    'Denier' => $row->Denier,
                    'Id_Mesin' => $row->Id_Mesin
                ];
            }
            // dd($response);
            return datatables($response)->make(true);

        } else if ($id == 'getTonaseEnter') {
            $tanggal = $request->input('tanggal');
            $tonase = (float) $request->input('tonase');

            $cek = DB::connection('ConnCircular')
                ->select(
                    'EXEC SP_1273_CIR_CEK_MesinAktif @kode = ?, @Tgl = ?',
                    [4, $tanggal]
                );

            $ada = 0;
            if (!empty($cek)) {
                $ada = $cek[0]->Ada;
            }

            if ($ada > 0) {
                return response()->json(['error' => 'Cek Afalan, Sudah Pernah Proses di Tanggal Tersebut !']);
            }
            // dd($tanggal, $tonase);
            $kg = ($tonase * 2) / 100;
            $mesin = DB::connection('ConnCircular')
                ->select(
                    'EXEC SP_1273_CIR_CEK_MesinAktif @Kode = ?, @Tgl = ?',
                    [1, $tanggal]
                );
            // dd($mesin);
            $jmlMesin = 0;

            if (!empty($mesin)) {
                $jmlMesin = $mesin[0]->JmlMesin;
            }

            $perMesin = 0;

            if ($jmlMesin > 0) {
                $perMesin = $kg / $jmlMesin;
            }

            $perMesin = round($perMesin, 2);

            $dataMesin = DB::connection('ConnCircular')
                ->select(
                    'EXEC SP_1273_CIR_CEK_MesinAktif @Kode = ?, @Tgl = ?',
                    [2, $tanggal]
                );

            $response = [];
            foreach ($dataMesin as $row) {
                $jumlahOrder = $row->JumlahOrder ?? 0;

                $perOrder = 0;

                if ($jumlahOrder > 0) {
                    $perOrder = $perMesin / $jumlahOrder;
                }

                $listType = DB::connection('ConnCircular')
                    ->select(
                        'EXEC sp_List_Type @kode = ?, @IdORder = ?, @Kd_Brg = ?',
                        [1, $row->Id_order, $row->KB_BarangJadi]
                    );

                $Lebar = $listType[0]->Lebar ?? 0;
                $RWa = $listType[0]->Rwa ?? 0;
                $DWA = $listType[0]->Dwa ?? 0;
                $RWe = $listType[0]->Rwe ?? 0;
                $DWe = $listType[0]->Dwe ?? 0;
                $JRein = $listType[0]->JmlReinf ?? 0;
                $LRein = $listType[0]->LReinf ?? 0;
                $Ket = $listType[0]->Ket ?? '';

                $BrtStrip = 0;

                $P1 = $perOrder * 1143000;

                $P2 =
                    $Lebar * (($RWa * $DWA) + ($RWe * $DWe)) +
                    0.5 * $JRein * $LRein * $RWa * $DWA;

                $P = 0;

                if ($P2 != 0) {
                    $P = $P1 / $P2;
                }

                $xReinf = ($JRein * $LRein * $RWa * $DWA * $P) / 2286000;

                $xBrt_WA = ($Lebar * $P * $RWa * $DWA) / 1143000;

                if (str_starts_with($Ket, 'BELAH LAYAR') || str_starts_with($Ket, 'FLAT')) {
                    $Brt_WA = $xBrt_WA + $xReinf - $BrtStrip;
                } else {
                    $Brt_WA = $xBrt_WA + $xReinf - $BrtStrip;
                }

                $xBrt_WE = ($Lebar * $P * $RWe * $DWe) / 1143000;

                if (str_starts_with($Ket, 'BELAH LAYAR') || str_starts_with($Ket, 'FLAT')) {
                    $Brt_WE = $xBrt_WE;
                } else {
                    $Brt_WE = $xBrt_WE;
                }

                $response[] = [

                    'Nama_mesin' => trim($row->Nama_mesin),
                    'Id_order' => trim($row->Id_order),

                    'KB_BarangJadi' => trim($row->KB_BarangJadi),
                    'NAMA_BRG' => trim($row->NAMA_BRG),

                    'KB_BenangWA' => trim($row->KB_BenangWA),
                    'KB_BenangWE' => trim($row->KB_BenangWE),

                    'Spek_BenangWA' => trim($row->Spek_BenangWA),
                    'Spek_BenangWE' => trim($row->Spek_BenangWE),

                    'JumlahOrder' => $jumlahOrder,

                    'PerOrder' => round($perOrder, 2),

                    'Brt_WA' => round($Brt_WA, 2),
                    'Brt_WE' => round($Brt_WE, 2),

                    'Denier' => $row->Denier,
                    'Id_Mesin' => $row->Id_Mesin
                ];
            }
            // dd($response);
            return datatables($response)->make(true);

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
