<?php

namespace App\Http\Controllers\JumboBag;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Auth;

class PermohonanKonversiPotongController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Jumbo Bag');
        return view('MultipleProgram.PermohonanKonversiPotong', compact('access'));
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
            return view('MultipleProgram.PermohonanKonversiPotong', compact('access'));
        } else if ($id == 'getDivisi') {
            $UserInput = trim(Auth::user()->NomorUser);

            $divisiConn = DB::connection('ConnInventory')
                ->select('exec SP_4384_JBB_Konversi_Potong @XKdUser = ?, @XKode = ?', [$UserInput, 1]);

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
                ->select('exec SP_4384_JBB_Konversi_Potong @XKdUser = ?, @XKode = ?, @XIdDivisi = ?', [$UserInput, 2, $idDivisi]);

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
                ->select('exec SP_4384_JBB_Konversi_Potong @XKode = ?, @XIdObjek = ?', [3, $idObjek]);

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
                ->select('exec SP_4384_JBB_Konversi_Potong @XKode = ?, @XIdKelompokUtama = ?', [4, $idKelompokUtama]);

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
                ->select('exec SP_4384_JBB_Konversi_Potong @XKode = ?, @XIdKelompok = ?', [5, $idKelompok]);

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
                ->select('exec SP_4384_JBB_Konversi_Potong @XKode = ?, @XIdSubKelompok = ?', [6, $IdSubKelompok]);

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
                ->select('exec SP_4384_JBB_Konversi_Potong @XKode = ?, @XIdType = ?', [7, (string) $IdType]);

            // $TypeArr = array_map(function ($TypeList) {
            //     return [
            //         'SaldoPrimer' => $TypeList->SaldoPrimer,
            //         'SaldoSekunder' => $TypeList->SaldoSekunder,
            //         'SaldoTritier' => $TypeList->SaldoTritier,
            //         'UnitPrimer' => $TypeList->UnitPrimer,
            //         'UnitSekunder' => $TypeList->UnitSekunder,
            //         'UnitTritier' => $TypeList->UnitTritier,
            //     ];
            // }, $TypeConn);

            return response()->json($TypeConn);
        } else if ($id == 'getDataKonversi') {
            return response()->json($request->input('idKonversi'), 200);
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
