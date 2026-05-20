<?php

namespace App\Http\Controllers\WovenBag;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;
use Auth;
use Exception;

class TableHitunganSandwichController extends Controller
{
    public function index()
    {
        $result = (new HakAksesController)->HakAksesFitur('Sandwich');
        $access = (new HakAksesController)->HakAksesFiturMaster('Woven Bag');
        if ($result) {
            return view('WovenBag.TabelHitungan.Sandwich', compact('access'));
        } else {
            return redirect()->route('WovenBag.Home')->with('status', 'Anda Tidak Memiliki Hak Akses Fitur Tabel Hitungan Sandwich!');
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
        $Lebar = $request->Lebar;
        $Gusset = $request->Gusset;
        $Panjang = $request->Panjang;
        $meshWA = $request->meshWA;
        $meshWE = $request->meshWE;
        $denier = $request->denier;
        $colour = $request->colour;
        $PrintingSisi1 = $request->PrintingSisi1;
        $PrintingSisi2 = $request->PrintingSisi2;
        $LemEVA = $request->LemEVA;
        $BeratLemEVA = $request->BeratLemEVA;
        $LemOverlap = $request->LemOverlap;
        $BeratLemOverlap = $request->BeratLemOverlap;
        $LebarClothJadi = $request->LebarClothJadi;
        $PanjangClothJadi = $request->PanjangClothJadi;
        $BeratClothJadi = $request->BeratClothJadi;
        $LebarClothPakai = $request->LebarClothPakai;
        $PanjangClothPakai = $request->PanjangClothPakai;
        $BeratClothPakai = $request->BeratClothPakai;
        $LamiJadi = $request->LamiJadi;
        $BeratLamiJadi = $request->BeratLamiJadi;
        $LamiPakai = $request->LamiPakai;
        $BeratLamiPakai = $request->BeratLamiPakai;
        $KertasJadiCM = $request->KertasJadiCM;
        $KertasJadiGSM = $request->KertasJadiGSM;
        $BeratKertasJadi = $request->BeratKertasJadi;
        $KertasPakaiCM = $request->KertasPakaiCM;
        $KertasPakaiGSM = $request->KertasPakaiGSM;
        $BeratKertasPakai = $request->BeratKertasPakai;
        $LebarClothBawahJadi = $request->LebarClothBawahJadi;
        $PanjangClothBawahJadi = $request->PanjangClothBawahJadi;
        $BeratClothBawahJadi = $request->BeratClothBawahJadi;
        $LebarClothBawahPakai = $request->LebarClothBawahPakai;
        $PanjangClothBawahPakai = $request->PanjangClothBawahPakai;
        $BeratClothBawahPakai = $request->BeratClothBawahPakai;
        $LamiBawahJadi = $request->LamiBawahJadi;
        $BeratLamiBawahJadi = $request->BeratLamiBawahJadi;
        $LamiBawahPakai = $request->LamiBawahPakai;
        $BeratLamiBawahPakai = $request->BeratLamiBawahPakai;
        $LebarKertasBawahJadi = $request->LebarKertasBawahJadi;
        $PanjangKertasBawahJadi = $request->PanjangKertasBawahJadi;
        $BeratKertasBawahJadi = $request->BeratKertasBawahJadi;
        $LebarKertasBawahPakai = $request->LebarKertasBawahPakai;
        $PanjangKertasBawahPakai = $request->PanjangKertasBawahPakai;
        $BeratKertasBawahPakai = $request->BeratKertasBawahPakai;
        $PanjangInnerJadi = $request->PanjangInnerJadi;
        $LebarInnerJadi = $request->LebarInnerJadi;
        $TebalInnerJadi = $request->TebalInnerJadi;
        $BeratInnerJadi = $request->BeratInnerJadi;
        $PanjangInnerPakai = $request->PanjangInnerPakai;
        $LebarInnerPakai = $request->LebarInnerPakai;
        $TebalInnerPakai = $request->TebalInnerPakai;
        $BeratInnerPakai = $request->BeratInnerPakai;
        $BenangJahitJadi = $request->BenangJahitJadi;
        $BeratBenangJahitJadi = $request->BeratBenangJahitJadi;
        $BenangJahitPakai = $request->BenangJahitPakai;
        $BeratBenangJahitPakai = $request->BeratBenangJahitPakai;
        $TotalJadi = $request->TotalJadi;
        $TotalPakai = $request->TotalPakai;
        try {
            DB::connection('ConnABM')->
                statement('exec SP_1273_ABM_MAINT_TABEL_HITUNGAN
                            @kode = ?, @id = ?, @UserInput = ?, @UserKoreksi = ?, @Tanggal = ?,
                            @IdJenis = ?, @KodeCust = ?, @TypeBarang = ?, @Lebar = ?, @Gusset = ?,
                            @Panjang = ?, @Warp = ?, @Weft = ?, @Denier = ?, @Colour = ?,
                            @PrintingSisi1 = ?, @PrintingSisi2 = ?, @LemEVA = ?, @BeratLemEVA = ?, @LemOverlap = ?,
                            @BeratLemOverlap = ?, @LebarClothJadi = ?, @PanjangClothJadi = ?, @BeratClothJadi = ?, @LebarClothPakai = ?,
                            @PanjangClothPakai = ?, @BeratClothPakai = ?, @LamiJadi = ?, @BeratLamiJadi = ?, @LamiPakai = ?,
                            @BeratLamiPakai = ?, @KertasJadiCM = ?, @KertasJadiGSM = ?, @BeratKertasJadi = ?, @KertasPakaiCM = ?,
                            @KertasPakaiGSM = ?, @BeratKertasPakai = ?, @LebarClothBawahJadi = ?, @PanjangClothBawahJadi = ?, @BeratClothBawahJadi = ?,
                            @LebarClothBawahPakai = ?, @PanjangClothBawahPakai = ?, @BeratClothBawahPakai = ?, @LamiBawahJadi = ?, @BeratLamiBawahJadi = ?,
                            @LamiBawahPakai = ?, @BeratLamiBawahPakai = ?, @LebarKertasBawahJadi = ?, @PanjangKertasBawahJadi = ?, @BeratKertasBawahJadi = ?,
                            @LebarKertasBawahPakai = ?, @PanjangKertasBawahPakai = ?, @BeratKertasBawahPakai = ?, @PanjangInnerJadi = ?, @LebarInnerJadi = ?,
                            @TebalInnerJadi = ?, @BeratInnerJadi = ?, @PanjangInnerPakai = ?, @LebarInnerPakai = ?, @TebalInnerPakai = ?,
                            @BeratInnerPakai = ?, @BenangJahitJadi = ?, @BeratBenangJahitJadi = ?, @BenangJahitPakai = ?, @BeratBenangJahitPakai = ?,
                            @TotalJadi = ?, @TotalPakai = ?', [
                    $kode,
                    $idProduct,
                    $user,
                    $user,
                    $tanggalPembuatan,
                    $typeProduct,
                    $idCustomer,
                    $namaBarang,
                    $Lebar,
                    $Gusset,
                    $Panjang,
                    $meshWA,
                    $meshWE,
                    $denier,
                    $colour,
                    $PrintingSisi1,
                    $PrintingSisi2,
                    $LemEVA,
                    $BeratLemEVA,
                    $LemOverlap,
                    $BeratLemOverlap,
                    $LebarClothJadi,
                    $PanjangClothJadi,
                    $BeratClothJadi,
                    $LebarClothPakai,
                    $PanjangClothPakai,
                    $BeratClothPakai,
                    $LamiJadi,
                    $BeratLamiJadi,
                    $LamiPakai,
                    $BeratLamiPakai,
                    $KertasJadiCM,
                    $KertasJadiGSM,
                    $BeratKertasJadi,
                    $KertasPakaiCM,
                    $KertasPakaiGSM,
                    $BeratKertasPakai,
                    $LebarClothBawahJadi,
                    $PanjangClothBawahJadi,
                    $BeratClothBawahJadi,
                    $LebarClothBawahPakai,
                    $PanjangClothBawahPakai,
                    $BeratClothBawahPakai,
                    $LamiBawahJadi,
                    $BeratLamiBawahJadi,
                    $LamiBawahPakai,
                    $BeratLamiBawahPakai,
                    $LebarKertasBawahJadi,
                    $PanjangKertasBawahJadi,
                    $BeratKertasBawahJadi,
                    $LebarKertasBawahPakai,
                    $PanjangKertasBawahPakai,
                    $BeratKertasBawahPakai,
                    $PanjangInnerJadi,
                    $LebarInnerJadi,
                    $TebalInnerJadi,
                    $BeratInnerJadi,
                    $PanjangInnerPakai,
                    $LebarInnerPakai,
                    $TebalInnerPakai,
                    $BeratInnerPakai,
                    $BenangJahitJadi,
                    $BeratBenangJahitJadi,
                    $BenangJahitPakai,
                    $BeratBenangJahitPakai,
                    $TotalJadi,
                    $TotalPakai
                ]);
            if ($kode == 1) {
                return response()->json(['success' => 'Data Tabel Hitungan Sandwich berhasil ditambahkan!']);
            } else if ($kode == 2) {
                return response()->json(['success' => 'Data Tabel Hitungan Sandwich berhasil diupdate!']);
            } else if ($kode == 3) {
                return response()->json(['success' => 'Data Tabel Hitungan Sandwich berhasil dihapus!']);
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
        } elseif ($id == 'getListCustomerUpdate') {
            $dataCustomerUpdate = DB::connection('ConnABM')->select('exec SP_1273_ABM_LIST_TABEL_HITUNGAN @Kode = 3, @IdJenis = 1');
            return datatables($dataCustomerUpdate)->make(true);
        } elseif ($id == 'getListProduct') {
            $idCustomer = $request->idCustomer;
            $dataProduct = DB::connection('ConnABM')->select('exec SP_1273_ABM_LIST_TABEL_HITUNGAN @Kode = 1, @idCust = ?, @IdJenis = 1', [$idCustomer]);
            return datatables($dataProduct)->make(true);
        } elseif ($id == 'getDataTabelHitungan') {
            $idProduct = $request->idProduct;
            try {
                $dataDetailProduct = DB::connection('ConnABM')->select('exec SP_1273_ABM_LIST_TABEL_HITUNGAN @Kode = 2, @id = ?', [$idProduct]);
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
