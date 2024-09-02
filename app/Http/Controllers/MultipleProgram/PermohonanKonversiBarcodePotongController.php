<?php

namespace App\Http\Controllers\MultipleProgram;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use DB;
use Auth;
use Carbon\Carbon;

class PermohonanKonversiBarcodePotongController extends Controller
{
    public function index()
    {
        //
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show($id, Request $request)
    {
        if ($id == 'JBBPotong') {
            $access = (new HakAksesController)->HakAksesFiturMaster('Jumbo Bag');
            $nomorUser = trim(Auth::user()->NomorUser);
            return view('MultipleProgram.PermohonanKonversiPotongBarcode', compact('access', 'id', 'nomorUser'));
        } else if ($id == 'ABMPotong') {
            $access = (new HakAksesController)->HakAksesFiturMaster('ABM');
            return view('MultipleProgram.PermohonanKonversiPotongBarcode', compact('access', 'id'));
        } else if ($id == 'ADSPotong') {
            $access = (new HakAksesController)->HakAksesFiturMaster('ADStar');
            return view('MultipleProgram.PermohonanKonversiPotongBarcode', compact('access', 'id'));
        } else if ($id == 'getDataAsalKonversi') {
            $nomorIndeksBarangAsal = $request->input('nomorIndeksBarangAsal');
            $kodeBarangAsal = $request->input('kodeBarangAsal');
            // 000000001-000140864
            // 000000002-000140864
            // 000000003-000140864
            // 000000004-000140864
            try {
                $dataBarcode = DB::connection('ConnInventory')->select('EXEC SP_4384_Konversi_Barcode_Potong @XKode = ?, @XKodeBarang = ?, @XNomorIndeks = ?', [8, $kodeBarangAsal, $nomorIndeksBarangAsal]);
                if (!str_contains($dataBarcode[0]->NamaDivisi, 'Jumbo Bag')) {
                    return response()->json(['error' => (string) "Barcode yang dimasukkan milik divisi " . $dataBarcode[0]->NamaDivisi]);
                }
                return response()->json(['success' => $dataBarcode]);
            } catch (Exception $e) {
                return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e]);
            }
        } else if ($id == 'getDivisi') {
            $UserInput = trim(Auth::user()->NomorUser);

            $divisiConn = DB::connection('ConnInventory')
                ->select('exec SP_4384_Konversi_Barcode_Potong @XKdUser = ?, @XKode = ?', [$UserInput, 1]);

            $divisiArr = array_map(function ($divisiList) {
                return [
                    'NamaDivisi' => $divisiList->NamaDivisi,
                    'IdDivisi' => $divisiList->IdDivisi,
                ];
            }, $divisiConn);

            return datatables($divisiArr)->make(true);
        } else if ($id == 'getObjek') {
            $UserInput = trim(Auth::user()->NomorUser);
            $idDivisi = $request->input('idDivisi');
            $objekConn = DB::connection('ConnInventory')
                ->select('exec SP_4384_Konversi_Barcode_Potong @XKdUser = ?, @XKode = ?, @XIdDivisi = ?', [$UserInput, 2, $idDivisi]);

            $objekArr = array_map(function ($objekList) {
                return [
                    'Namaobjek' => $objekList->NamaObjek,
                    'Idobjek' => $objekList->IdObjek,
                ];
            }, $objekConn);

            return datatables($objekArr)->make(true);
        } else if ($id == 'getKelompokUtama') {
            $UserInput = trim(Auth::user()->NomorUser);
            $idObjek = $request->input('idObjek');
            $KelompokUtamaConn = DB::connection('ConnInventory')
                ->select('exec SP_4384_Konversi_Barcode_Potong @XKode = ?, @XIdObjek = ?', [3, $idObjek]);

            $KelompokUtamaArr = array_map(function ($KelompokUtamaList) {
                return [
                    'NamaKelompokUtama' => $KelompokUtamaList->NamaKelompokUtama,
                    'IdKelompokUtama' => $KelompokUtamaList->IdKelompokUtama,
                ];
            }, $KelompokUtamaConn);

            return datatables($KelompokUtamaArr)->make(true);
        } else if ($id == 'getKelompok') {
            $UserInput = trim(Auth::user()->NomorUser);
            $idKelompokUtama = $request->input('idKelompokUtama');
            $KelompokConn = DB::connection('ConnInventory')
                ->select('exec SP_4384_Konversi_Barcode_Potong @XKode = ?, @XIdKelompokUtama = ?', [4, $idKelompokUtama]);

            $KelompokArr = array_map(function ($KelompokList) {
                return [
                    'NamaKelompok' => $KelompokList->namakelompok,
                    'IdKelompok' => $KelompokList->idkelompok,
                ];
            }, $KelompokConn);

            return datatables($KelompokArr)->make(true);
        } else if ($id == 'getSubKelompok') {
            $UserInput = trim(Auth::user()->NomorUser);
            $idKelompok = $request->input('idKelompok');
            $SubKelompokConn = DB::connection('ConnInventory')
                ->select('exec SP_4384_Konversi_Barcode_Potong @XKode = ?, @XIdKelompok = ?', [5, $idKelompok]);

            $SubKelompokArr = array_map(function ($SubKelompokList) {
                return [
                    'NamaSubKelompok' => $SubKelompokList->NamaSubKelompok,
                    'IdSubKelompok' => $SubKelompokList->IdSubkelompok,
                ];
            }, $SubKelompokConn);

            return datatables($SubKelompokArr)->make(true);
        } else if ($id == 'getType') {
            $UserInput = trim(Auth::user()->NomorUser);
            $IdSubKelompok = $request->input('IdSubKelompok');
            $TypeConn = DB::connection('ConnInventory')
                ->select('exec SP_4384_Konversi_Barcode_Potong @XKode = ?, @XIdSubKelompok = ?', [6, $IdSubKelompok]);

            $TypeArr = array_map(function ($TypeList) {
                return [
                    'NamaType' => $TypeList->NamaType,
                    'IdType' => $TypeList->IdType,
                ];
            }, $TypeConn);

            return datatables($TypeArr)->make(true);
        } else if ($id == 'getDataType') {
            $UserInput = trim(Auth::user()->NomorUser);
            $IdType = $request->input('IdType');
            $TypeConn = DB::connection('ConnInventory')
                ->select('exec SP_4384_Konversi_Barcode_Potong @XKode = ?, @XIdType = ?', [7, (string) $IdType]);

            return response()->json($TypeConn);
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
