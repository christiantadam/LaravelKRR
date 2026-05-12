<?php

namespace App\Http\Controllers\AdStarController;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;
use Auth;
use Exception;

class CLoseTop extends Controller
{
    public function index()
    {
        $result = (new HakAksesController)->HakAksesFitur('Close Top');
        $access = (new HakAksesController)->HakAksesFiturMaster('AD Star');
        $user = Auth::user()->NomorUser;

        if ($result) {
            return view('AdStar.TabelHitungan.CloseTop', compact('user', 'access'));
        } else {
            return redirect()->route('AdStar.AdStarHome')->with('status', 'Anda Tidak Memiliki Hak Akses Fitur Tabel Hitungan - Close Top!');
        }
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $jenisStore = $request->jenisStore;
        $user = Auth::user()->NomorUser;
        $kode = 1;
        if ($jenisStore == 'Update') {
            $kode = 2;
        } else if ($jenisStore == 'Delete') {
            $kode = 3;
        }
        $idProduct = $request->idProduct;
        $idCustomer = $request->idCustomer;
        $namaCustomer = $request->namaCustomer;
        $typeProduct = $request->typeProduct;
        $namaBarang = $request->namaBarang;
        $tanggalPembuatan = $request->tanggalPembuatan;
        $keterangan = $request->keterangan;
        $gambarWidth = $request->gambarWidth;
        $gambarHeight = $request->gambarHeight;
        $gambarBB = $request->gambarBB;
        $gambarBC = $request->gambarBC;
        $gambarVS = $request->gambarVS;
        $gambarVL = $request->gambarVL;
        $gambarFA = $request->gambarFA;
        $valveSeal = $request->valveSeal;
        $valveLength = $request->valveLength;
        $meshWA = $request->meshWA;
        $meshWE = $request->meshWE;
        $yarnWidth = $request->yarnWidth;
        $denier = $request->denier;
        $colour = $request->colour;
        $lamination = $request->lamination;
        $OPP = $request->OPP;
        $kertas = $request->kertas;
        $inner = $request->inner;
        $spoonbond = $request->spoonbond;
        $printingFront = $request->printingFront;
        $printingBack = $request->printingBack;
        $printingTopPatch = $request->printingTopPatch;
        $printingBottomPatch = $request->printingBottomPatch;
        $airPermeability = $request->airPermeability;
        $tinggiBagBerdiri = $request->tinggiBagBerdiri;
        $tableHitungan_StdTW = $request->tableHitungan_StdTW;
        $tableHitungan_StdTL = $request->tableHitungan_StdTL;
        $tableHitungan_StdBW = $request->tableHitungan_StdBW;
        $tableHitungan_StdBL = $request->tableHitungan_StdBL;
        $tableHitungan_StdTO = $request->tableHitungan_StdTO;
        $tableHitungan_StdBO = $request->tableHitungan_StdBO;
        $tableHitungan_S1 = $request->tableHitungan_S1;
        $tableHitungan_S2 = $request->tableHitungan_S2;
        $tableHitungan_S3 = $request->tableHitungan_S3;
        $tableHitungan_S4 = $request->tableHitungan_S4;
        $tableHitungan_S5 = $request->tableHitungan_S5;
        $tableHitungan_S6 = $request->tableHitungan_S6;
        $tableHitungan_S7 = $request->tableHitungan_S7;
        $tableHitungan_S8 = $request->tableHitungan_S8;
        $tableHitungan_yarn1 = $request->tableHitungan_yarn1;
        $tableHitungan_yarn2 = $request->tableHitungan_yarn2;
        $tableHitungan_yarn3 = $request->tableHitungan_yarn3;
        $tableHitungan_yarn4 = $request->tableHitungan_yarn4;
        $tableHitungan_yarn5 = $request->tableHitungan_yarn5;
        $tableHitungan_yarn6 = $request->tableHitungan_yarn6;
        $tableHitungan_yarn7 = $request->tableHitungan_yarn7;
        $tableHitungan_yarn8 = $request->tableHitungan_yarn8;
        $tableHitungan_WA1 = $request->tableHitungan_WA1;
        $tableHitungan_WE1 = $request->tableHitungan_WE1;
        $tableHitungan_WA2 = $request->tableHitungan_WA2;
        $tableHitungan_WE2 = $request->tableHitungan_WE2;
        $tableHitungan_WA3 = $request->tableHitungan_WA3;
        $tableHitungan_WE3 = $request->tableHitungan_WE3;
        $tableHitungan_WA4 = $request->tableHitungan_WA4;
        $tableHitungan_WE4 = $request->tableHitungan_WE4;
        $tableHitungan_Denier1 = $request->tableHitungan_Denier1;
        $tableHitungan_Denier2 = $request->tableHitungan_Denier2;
        $tableHitungan_Denier3 = $request->tableHitungan_Denier3;
        $tableHitungan_Denier4 = $request->tableHitungan_Denier4;
        $tableHitungan_Denier5 = $request->tableHitungan_Denier5;
        $tableHitungan_Denier6 = $request->tableHitungan_Denier6;
        $tableHitungan_Denier7 = $request->tableHitungan_Denier7;
        $tableHitungan_Denier8 = $request->tableHitungan_Denier8;
        $tableHitungan_C1 = $request->tableHitungan_C1;
        $tableHitungan_C2 = $request->tableHitungan_C2;
        $tableHitungan_C3 = $request->tableHitungan_C3;
        $tableHitungan_C4 = $request->tableHitungan_C4;
        $tableHitungan_C5 = $request->tableHitungan_C5;
        $tableHitungan_C6 = $request->tableHitungan_C6;
        $tableHitungan_C7 = $request->tableHitungan_C7;
        $tableHitungan_C8 = $request->tableHitungan_C8;
        $tableHitungan_S9 = $request->tableHitungan_S9;
        $tableHitungan_S10 = $request->tableHitungan_S10;
        $tableHitungan_S11 = $request->tableHitungan_S11;
        $tableHitungan_S12 = $request->tableHitungan_S12;
        $tableHitungan_S13 = $request->tableHitungan_S13;
        $tableHitungan_S14 = $request->tableHitungan_S14;
        $tableHitungan_CW1 = $request->tableHitungan_CW1;
        $tableHitungan_CW2 = $request->tableHitungan_CW2;
        $tableHitungan_CW3 = $request->tableHitungan_CW3;
        $tableHitungan_CW4 = $request->tableHitungan_CW4;
        $tableHitungan_CWTotal = $request->tableHitungan_CWTotal;
        $tableHitungan_LW1 = $request->tableHitungan_LW1;
        $tableHitungan_LW2 = $request->tableHitungan_LW2;
        $tableHitungan_LW3 = $request->tableHitungan_LW3;
        $tableHitungan_LW4 = $request->tableHitungan_LW4;
        $tableHitungan_LWTotal = $request->tableHitungan_LWTotal;
        $tableHitungan_OPP1 = $request->tableHitungan_OPP1;
        $tableHitungan_OPP2 = $request->tableHitungan_OPP2;
        $tableHitungan_OPP3 = $request->tableHitungan_OPP3;
        $tableHitungan_OPP4 = $request->tableHitungan_OPP4;
        $tableHitungan_OPPTotal = $request->tableHitungan_OPPTotal;
        $tableHitungan_ST1 = $request->tableHitungan_ST1;
        $tableHitungan_ST2 = $request->tableHitungan_ST2;
        $tableHitungan_ST3 = $request->tableHitungan_ST3;
        $tableHitungan_ST4 = $request->tableHitungan_ST4;
        $tableHitungan_ST5 = $request->tableHitungan_ST5;
        $tableHitungan_ST6 = $request->tableHitungan_ST6;
        $tableHitungan_ST7 = $request->tableHitungan_ST7;
        $tableHitungan_STTotal = $request->tableHitungan_STTotal;
        try {
            DB::connection('ConnAdStar')->
                statement('exec SP_1486_ADSTAR_MAINT_TABEL_HITUNGAN
                            @kode = ?, @id = ?, @UserInput = ?, @model = ?, @kd_brg = ?, @IdJenis = ?,
                            @Nama_brg = ?, @id_cust = ?, @Tanggal = ?, @Width = ?, @Height = ?,
                            @BlockBottom = ?, @ValveSeal = ?, @ValveLength = ?, @Warp = ?, @Weft = ?,
                            @Yarn = ?, @Denier = ?, @Lami = ?, @OPP = ?, @Colour = ?,
                            @PrintFront = ?, @PrintBack = ?, @PrintTop = ?, @PrintBottom = ?, @Air = ?,
                            @TopWidth = ?, @TopLength = ?, @BotWidth = ?, @BotLength = ?, @TopOverlap = ?,
                            @BotOverLap = ?, @BodyWidth = ?, @BodyHeight = ?, @ValveWidth = ?, @ValveHeight = ?,
                            @WeightBodyCloth = ?, @WeightBodyLami = ?, @WeightBodyOPP = ?, @WeightTopCloth = ?, @WeightTopLami = ?,
                            @WeightTopOPP = ?, @WeightBotCloth = ?, @WeightBotLami = ?, @WeightBotOPP = ?, @WeightValveCloth = ?,
                            @WeightvalveLami = ?, @WeightValveOPP = ?, @FrontArea = ?, @Keterangan = ?, @ValveSealYarn = ?,
                            @ValveSealDenier = ?, @ValveSealColour = ?, @ValveLengthYarn = ?, @ValveLengthDenier = ?, @ValveLengthColour = ?,
                            @Warp2 = ?, @Weft2 = ?, @Warp3 = ?, @Weft3 = ?, @Warp4 = ?,
                            @Weft4 = ?, @Yarn_TW = ?, @Yarn_TL = ?, @Yarn_BW = ?, @Yarn_BL = ?,
                            @Yarn_VS = ?, @Yarn_VL = ?, @Denier_TW = ?, @Denier_TL = ?, @Denier_BW = ?,
                            @Denier_BL = ?, @Denier_VS = ?, @Denier_VL = ?, @Colour_TW = ?, @Colour_TL = ?,
                            @Colour_BW = ?, @Colour_BL = ?, @Colour_VS = ?, @Colour_VL = ?, @BlockCover = ?,
                            @Inner = ?, @PanjangInner = ?, @LebarInner = ?, @Kertas = ?, @PanjangKertas = ?,
                            @LebarKertas = ?, @SpoonBond = ?, @PanjangSpoonBond = ?, @LebarSpoonBond = ?', [
                    $kode, $idProduct, $user, 2, null,
                    $typeProduct, $namaBarang, $idCustomer, $tanggalPembuatan, $gambarWidth,
                    $gambarHeight, $gambarBB, $gambarVS ?? 0, $gambarVL ?? 0, $meshWA,
                    $meshWE, $yarnWidth, $denier, $lamination, $OPP,
                    $colour, $printingFront, $printingBack, $printingTopPatch, $printingBottomPatch,
                    $airPermeability, $tableHitungan_StdTW, $tableHitungan_StdTL, $tableHitungan_StdBW, $tableHitungan_StdBL,
                    $tableHitungan_StdTO, $tableHitungan_StdBO, $tableHitungan_S1, $tableHitungan_S2, $tableHitungan_S7,
                    $tableHitungan_S8, $tableHitungan_CW1, $tableHitungan_LW1, $tableHitungan_OPP1, $tableHitungan_CW2,
                    $tableHitungan_LW2, $tableHitungan_OPP2, $tableHitungan_CW3, $tableHitungan_LW3, $tableHitungan_OPP3,
                    $tableHitungan_CW4, $tableHitungan_LW4, $tableHitungan_OPP4, $gambarFA, $keterangan,
                    $tableHitungan_WA4, $tableHitungan_Denier7, $tableHitungan_C7, $tableHitungan_WE4, $tableHitungan_Denier8,
                    $tableHitungan_C8, $tableHitungan_WA2, $tableHitungan_WE2, $tableHitungan_WA3, $tableHitungan_WE3,
                    $tableHitungan_WA4, $tableHitungan_WE4, $tableHitungan_yarn3, $tableHitungan_yarn4, $tableHitungan_yarn5,
                    $tableHitungan_yarn6, $tableHitungan_yarn7, $tableHitungan_yarn8, $tableHitungan_Denier3, $tableHitungan_Denier4,
                    $tableHitungan_Denier5, $tableHitungan_Denier6, $tableHitungan_Denier7, $tableHitungan_Denier8, $tableHitungan_C3,
                    $tableHitungan_C4, $tableHitungan_C5, $tableHitungan_C6, $tableHitungan_C7, $tableHitungan_C8,
                    $gambarBC, $inner, $tableHitungan_S11, $tableHitungan_S12, $kertas,
                    $tableHitungan_S9, $tableHitungan_S10, $spoonbond, $tableHitungan_S13, $tableHitungan_S14
                ]);
            if ($kode == 1) {
                return response()->json(['success' => 'Data Tabel Hitungan Close Top berhasil ditambahkan!']);
            } else if ($kode == 2) {
                return response()->json(['success' => 'Data Tabel Hitungan Close Top berhasil diupdate!']);
            } else if ($kode == 3) {
                return response()->json(['success' => 'Data Tabel Hitungan Close Top berhasil dihapus!']);
            }
        } catch (Exception $ex) {
            return response()->json(['error' => $ex->getMessage()]);
        }
    }

    public function show($id, Request $request)
    {
        if ($id == 'getListCustomerAdd') {
            $dataCustomerAdd = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_CUSTOMER @Kode = 2');
            return datatables($dataCustomerAdd)->make(true);
        } else if ($id == 'getListCustomerUpdate') {
            $dataCustomerUpdate = DB::connection('ConnAdStar')->select('exec SP_1486_ADSTAR_LIST_TABEL_HITUNGAN @Kode = 6');
            return datatables($dataCustomerUpdate)->make(true);
        } else if ($id == 'getListJenisBag') {
            $dataJenisBag = DB::connection('ConnAdStar')->select('exec SP_4384_AdStar_Maintenance_Tabel_Hitungan @Kode = 0');
            return datatables($dataJenisBag)->make(true);
        } else if ($id == 'getListProduct') {
            $idCustomer = $request->idCustomer;
            $dataProduct = DB::connection('ConnAdStar')->select('exec SP_1486_ADSTAR_LIST_TABEL_HITUNGAN @Kode = 7, @idCust = ?', [$idCustomer]);
            return datatables($dataProduct)->make(true);
        } else if ($id == 'getDataTabelHitungan') {
            $idProduct = $request->idProduct;
            try {
                $dataDetailProduct = DB::connection('ConnAdStar')->select('exec SP_1486_ADSTAR_LIST_TABEL_HITUNGAN @Kode = 2, @id = ?', [$idProduct]);
                return response()->json(['data' => $dataDetailProduct]);
            } catch (Exception $e) {
                return response()->json(['error' => $e->getMessage()]);
            }
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
