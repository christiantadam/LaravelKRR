<?php

namespace App\Http\Controllers\MultipleProgram;

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
        $id_divisi = $request->input('asalKonversiInputValues')['id_divisi'];
        $nama_divisi = $request->input('asalKonversiInputValues')['nama_divisi'];
        $id_objek = $request->input('asalKonversiInputValues')['id_objek'];
        $nama_objek = $request->input('asalKonversiInputValues')['nama_objek'];
        $id_kelompokUtama = $request->input('asalKonversiInputValues')['id_kelompokUtama'];
        $nama_kelompokUtama = $request->input('asalKonversiInputValues')['nama_kelompokUtama'];
        $id_kelompok = $request->input('asalKonversiInputValues')['id_kelompok'];
        $nama_kelompok = $request->input('asalKonversiInputValues')['nama_kelompok'];
        $id_subKelompok = $request->input('asalKonversiInputValues')['id_subKelompok'];
        $nama_subKelompok = $request->input('asalKonversiInputValues')['nama_subKelompok'];
        $PIB_asal = $request->input('asalKonversiInputValues')['PIB_asal'];
        $id_typeAsal = $request->input('asalKonversiInputValues')['id_typeAsal'];
        $nama_typeAsal = $request->input('asalKonversiInputValues')['nama_typeAsal'];
        $saldo_terakhirAsalPrimer = $request->input('asalKonversiInputValues')['saldo_terakhirAsalPrimer'];
        $satuan_saldoTerakhirAsalPrimer = $request->input('asalKonversiInputValues')['satuan_saldoTerakhirAsalPrimer'];
        $saldo_terakhirAsalSekunder = $request->input('asalKonversiInputValues')['saldo_terakhirAsalSekunder'];
        $satuan_saldoTerakhirAsalSekunder = $request->input('asalKonversiInputValues')['satuan_saldoTerakhirAsalSekunder'];
        $saldo_terakhirAsalTritier = $request->input('asalKonversiInputValues')['saldo_terakhirAsalTritier'];
        $satuan_saldoTerakhirAsalTritier = $request->input('asalKonversiInputValues')['satuan_saldoTerakhirAsalTritier'];
        $pemakaian_primerAsal = $request->input('asalKonversiInputValues')['pemakaian_primerAsal'];
        $satuan_primerAsal = $request->input('asalKonversiInputValues')['satuan_primerAsal'];
        $pemakaian_sekunderAsal = $request->input('asalKonversiInputValues')['pemakaian_sekunderAsal'];
        $satuan_sekunderAsal = $request->input('asalKonversiInputValues')['satuan_sekunderAsal'];
        $pemakaian_tritierAsal = $request->input('asalKonversiInputValues')['pemakaian_tritierAsal'];
        $satuan_tritierAsal = $request->input('asalKonversiInputValues')['satuan_tritierAsal'];

        $table_daftarTujuanKonversi = $request->input('table_daftarTujuanKonversi');
        // Initialize an array to store concatenated results for each index
        $concatenatedResults = [];

        // Get the number of sub-arrays
        $numberOfSubArrays = count($table_daftarTujuanKonversi);

        // Get the number of elements in each sub-array (assuming all sub-arrays have the same length)
        $numberOfElements = count($table_daftarTujuanKonversi[0]);

        // Loop through each index in the sub-arrays
        for ($i = 0; $i < $numberOfElements; $i++) {
            $tempArray = [];

            // Loop through each sub-array and collect the values at the current index
            for ($j = 0; $j < $numberOfSubArrays; $j++) {
                $tempArray[] = $table_daftarTujuanKonversi[$j][$i];
            }

            // Concatenate the collected values with a pipe separator
            $concatenatedResults[$i] = implode(' , ', $tempArray);
        }

        // Accessing specific variables
        $IdTypeTujuan = $concatenatedResults[0];
        $NamaTypeTujuan = $concatenatedResults[1];
        $SaldoPrimer = $concatenatedResults[2];
        $SaldoSekunder = $concatenatedResults[3];
        $SaldoTritier = $concatenatedResults[4];
        $IdDivisi = $concatenatedResults[5];
        $IdObjek = $concatenatedResults[6];
        $IdKelompokUtama = $concatenatedResults[7];
        $IdKelompok = $concatenatedResults[8];
        $IdSubKelompok = $concatenatedResults[9];
        $NamaDivisiTujuan = $concatenatedResults[10];
        $NamaObjekTujuan = $concatenatedResults[11];
        $NamaKelompokUtamaTujuan = $concatenatedResults[12];
        $NamaKelompokTujuan = $concatenatedResults[13];
        $NamaSubKelompokTujuan = $concatenatedResults[14];
        $SaldoTerakhirTujuanPrimer = $concatenatedResults[15];
        $SaldoTerakhirTujuanSekunder = $concatenatedResults[16];
        $SaldoTerakhirTujuanTritier = $concatenatedResults[17];
        $SatuanPrimerTujuan = $concatenatedResults[18];
        $SatuanSekunderTujuan = $concatenatedResults[19];
        $SatuanTritierTujuan = $concatenatedResults[20];
        $SatuanSaldoTerakhirTujuanPrimer = $concatenatedResults[21];
        $SatuanSaldoTerakhirTujuanSekunder = $concatenatedResults[22];
        $SatuanSaldoTerakhirTujuanTritier = $concatenatedResults[23];
        $IdTmpTransaksi = $concatenatedResults[24];
        dd($IdTypeTujuan);

    }

    public function show($id, Request $request)
    {
        if ($id == 'JBBPotong') {
            $access = (new HakAksesController)->HakAksesFiturMaster('Jumbo Bag');
            return view('MultipleProgram.PermohonanKonversiPotong', compact('access', 'id'));
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
