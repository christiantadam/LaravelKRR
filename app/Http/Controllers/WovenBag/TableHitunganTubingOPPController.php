<?php

namespace App\Http\Controllers\WovenBag;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;
use Auth;
use Exception;

class TableHitunganTubingOPPController extends Controller
{
    public function index()
    {
        $result = (new HakAksesController)->HakAksesFitur('Tubing OPP');
        $access = (new HakAksesController)->HakAksesFiturMaster('Woven Bag');
        if ($result) {
            return view('WovenBag.TabelHitungan.TubingOPP', compact('access'));
        } else {
            return redirect()->route('WovenBag.Home')->with('status', 'Anda Tidak Memiliki Hak Akses Fitur Tabel Hitungan Tubing OPP!');
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
        $kode = 4;
        if ($jenisStore == 'Update') {
            $kode = 5;
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
        $Tinggi = $request->Tinggi;
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
        $OPPBodyJadiCM = $request->OPPBodyJadiCM;
        $OPPBodyJadiMIK = $request->OPPBodyJadiMIK;
        $BeratOPPBodyJadi = $request->BeratOPPBodyJadi;
        $OPPBodyPakaiCM = $request->OPPBodyPakaiCM;
        $OPPBodyPakaiMIK = $request->OPPBodyPakaiMIK;
        $BeratOPPBodyPakai = $request->BeratOPPBodyPakai;
        $LebarPatchJadi = $request->LebarPatchJadi;
        $PanjangPatchJadi = $request->PanjangPatchJadi;
        $BeratPatchJadi = $request->BeratPatchJadi;
        $OPPPatchJadi = $request->OPPPatchJadi;
        $OPPPatchPakai = $request->OPPPatchPakai;
        $BeratOPPPatchJadi = $request->BeratOPPPatchJadi;
        $BeratOPPPatchPakai = $request->BeratOPPPatchPakai;
        $LamiPatchJadi = $request->LamiPatchJadi;
        $LamiPatchPakai = $request->LamiPatchPakai;
        $BeratLamiPatchJadi = $request->BeratLamiPatchJadi;
        $BeratLamiPatchPakai = $request->BeratLamiPatchPakai;
        $PanjangValve = $request->PanjangValve;
        $LebarValveJadi = $request->LebarValveJadi;
        $LebarValvePakai = $request->LebarValvePakai;
        $BeratValveJadi = $request->BeratValveJadi;
        $BeratValvePakai = $request->BeratValvePakai;
        $LamiValveJadi = $request->LamiValveJadi;
        $LamiValvePakai = $request->LamiValvePakai;
        $BeratLamiValveJadi = $request->BeratLamiValveJadi;
        $BeratLamiValvePakai = $request->BeratLamiValvePakai;
        $TotalJadi = $request->TotalJadi;
        $TotalPakai = $request->TotalPakai;
        // dd($request->all());

        try {
            DB::connection('ConnABM')->
                statement('exec SP_1273_ABM_MAINT_TABEL_HITUNGAN
                            @kode = ?, @id = ?, @UserInput = ?, @UserKoreksi = ?, @Tanggal = ?,
                            @IdJenis = ?, @KodeCust = ?, @TypeBarang = ?, @Lebar = ?, @Tinggi = ?,
                            @Panjang = ?, @Warp = ?, @Weft = ?, @Denier = ?, @Colour = ?,
                            @PrintingSisi1 = ?, @PrintingSisi2 = ?, @LemEVA = ?, @BeratLemEVA = ?, @LemOverlap = ?,
                            @BeratLemOverlap = ?, @LebarClothJadi = ?, @PanjangClothJadi = ?, @BeratClothJadi = ?, @LebarClothPakai = ?,
                            @PanjangClothPakai = ?, @BeratClothPakai = ?, @LamiJadi = ?, @BeratLamiJadi = ?, @LamiPakai = ?,
                            @BeratLamiPakai = ?, @KertasJadiCM = ?, @KertasJadiGSM = ?, @BeratKertasJadi = ?, @KertasPakaiCM = ?,
                            @KertasPakaiGSM = ?, @BeratKertasPakai = ?, @OPPBodyJadiCM = ?, @OPPBodyJadiMIK = ?, @BeratOPPBodyJadi = ?,
                            @OPPBodyPakaiCM = ?, @OPPBodyPakaiMIK = ?, @BeratOPPBodyPakai = ?,@LebarPatchJadi = ?, @PanjangPatchJadi = ?,
                            @BeratPatchJadi = ?, @OPPPatchJadi = ?, @OPPPatchPakai = ?, @BeratOPPPatchJadi = ?, @BeratOPPPatchPakai = ?,
                            @LamiPatchJadi = ?, @LamiPatchPakai = ?, @BeratLamiPatchJadi = ?, @BeratLamiPatchPakai = ?, @PanjangValve = ?,
                            @LebarValveJadi = ?, @LebarValvePakai = ?, @BeratValveJadi = ?, @BeratValvePakai = ?, @LamiValveJadi = ?,
                            @LamiValvePakai = ?, @BeratLamiValveJadi = ?, @BeratLamiValvePakai = ?, @TotalJadi = ?, @TotalPakai = ?', [
                    $kode, $idProduct, $user, $user, $tanggalPembuatan,
                    $typeProduct, $idCustomer, $namaBarang, $Lebar, $Tinggi,
                    $Panjang, $meshWA, $meshWE, $denier, $colour,
                    $PrintingSisi1, $PrintingSisi2, $LemEVA, $BeratLemEVA, $LemOverlap,
                    $BeratLemOverlap, $LebarClothJadi, $PanjangClothJadi, $BeratClothJadi, $LebarClothPakai,
                    $PanjangClothPakai, $BeratClothPakai, $LamiJadi, $BeratLamiJadi, $LamiPakai,
                    $BeratLamiPakai, $KertasJadiCM, $KertasJadiGSM, $BeratKertasJadi, $KertasPakaiCM,
                    $KertasPakaiGSM, $BeratKertasPakai, $OPPBodyJadiCM, $OPPBodyJadiMIK, $BeratOPPBodyJadi,
                    $OPPBodyPakaiCM, $OPPBodyPakaiMIK, $BeratOPPBodyPakai, $LebarPatchJadi, $PanjangPatchJadi,
                    $BeratPatchJadi, $OPPPatchJadi, $OPPPatchPakai, $BeratOPPPatchJadi, $BeratOPPPatchPakai,
                    $LamiPatchJadi, $LamiPatchPakai, $BeratLamiPatchJadi, $BeratLamiPatchPakai, $PanjangValve,
                    $LebarValveJadi, $LebarValvePakai, $BeratValveJadi, $BeratValvePakai, $LamiValveJadi,
                    $LamiValvePakai, $BeratLamiValveJadi, $BeratLamiValvePakai, $TotalJadi, $TotalPakai,
                ]);
            if ($kode == 4) {
                return response()->json(['success' => 'Data Tabel Hitungan Tubing OPP berhasil ditambahkan!']);
            } else if ($kode == 5) {
                return response()->json(['success' => 'Data Tabel Hitungan Tubing OPP berhasil diupdate!']);
            } else if ($kode == 3) {
                return response()->json(['success' => 'Data Tabel Hitungan Tubing OPP berhasil dihapus!']);
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
            $dataCustomerUpdate = DB::connection('ConnABM')->select('exec SP_1273_ABM_LIST_TABEL_HITUNGAN @Kode = 3, @IdJenis = 2');
            return datatables($dataCustomerUpdate)->make(true);
        } elseif ($id == 'getListProduct') {
            $idCustomer = $request->idCustomer;
            $dataProduct = DB::connection('ConnABM')->select('exec SP_1273_ABM_LIST_TABEL_HITUNGAN @Kode = 1, @idCust = ?, @IdJenis = 2', [$idCustomer]);
            return datatables($dataProduct)->make(true);
        } elseif ($id == 'getDataTabelHitungan') {
            $idProduct = $request->idProduct;
            try {
                $dataDetailProduct = DB::connection('ConnABM')->select('exec SP_1273_ABM_LIST_TABEL_HITUNGAN @Kode = 7, @id = ?', [$idProduct]);
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
