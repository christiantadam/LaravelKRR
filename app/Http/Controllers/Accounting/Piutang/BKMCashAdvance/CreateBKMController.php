<?php

namespace App\Http\Controllers\Accounting\Piutang\BKMCashAdvance;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CreateBKMController extends Controller
{
    public function index()
    {
        $data = 'Accounting';
        return view('Accounting.Piutang.BKMCashAdvance.CreateBKM', compact('data'));
    }

    public function getTabelPelunasan($bulan, $tahun)
    {
        //dd($bulan, $tahun);[SP_5298_ACC_LIST_CASH_ADV]
        $tabel =  DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_CASH_ADV] @bln = ?, @thn = ?', [$bulan, $tahun]);
        return response()->json($tabel);
    }

    function getDataBank()
    {
        $bank =  DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_BANK]');
        return response()->json($bank);
    }

    function getJenisBankCreateBKM($idBank)
    {
        $bank =  DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_BANK_1] @idBank = ?', [$idBank] );
        return response()->json($bank);
    }

    function getKodePerkiraan()
    {
        $kode =  DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_KODE_PERKIRAAN] @Kode = ?', 1);
        return response()->json($kode);
    }

    public function getTabelTampilBKM($tanggalInputTampil, $tanggalInputTampil2)
    {
        $tabel =  DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_BKM_CASHADV_1_PERTGL] @tgl1 = ?, @tgl2 = ?', [$tanggalInputTampil, $tanggalInputTampil2]);
        return response()->json($tabel);
    }

    public function getCetak($idBKMInput)
    {
        //dd($idBKM);
        $data = DB::connection('ConnAccounting')->table('VW_PRG_5298_ACC_CETAK_BKM_NOTAGIH_1')
        ->where('Id_BKM', $idBKMInput)
        ->get();
        return $data;
    }

    function getIDBKM($id, $tanggal)
    {
        $idBank = $id;
        $tanggalInput = $tanggal;
        $jenis = 'R';

        // $result = DB::statement("EXEC [dbo].[SP_5409_ACC_COUNTER_BKM_BKK] ?, ?, ?, ?", [
        //     $jenis,
        //     $tanggalInput,
        //     $idBank,
        //     null
        //     // Pass by reference for output parameter
        // ]);

        $tahun = substr($tanggalInput, -10, 4);
        $x = DB::connection('ConnAccounting')->table('T_Counter_BKM')->where('Periode', '=', $tahun)->first();
        $nomorIdBKM = '00000' . str_pad($x->Id_BKM_E_Rp, 5, '0', STR_PAD_LEFT);
        $idBKM = $idBank . '-R' . substr($tahun, -2) . substr($nomorIdBKM, -5);

        return response()->json($idBKM);
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    public function insertUpdateCreateBKM(Request $request)
    {
        Log::info('Request Data: ' .json_encode($request->all()));
        //dd($request->all());
        $idBKMNew = $request->idBKMNew;
        $tglInputNew = $request->tglInputNew;
        $tanggal = $request->tanggal;
        $konversi = $request->konversi;
        $total1 = $request->total1;

        $idbkm = $request->idbkm;
        $idBank = $request->idBank;
        $idBank2 = $request->idBank2;
        $jenisBank = $request->jenisBank;
        $idKodePerkiraan = $request->idKodePerkiraan;
        $idPelunasan = $request->idPelunasan;

        list($tahun, $bulan, $hari) = explode('-', $tglInputNew);

        // Mengambil bulan dan tahun sebagai integer
        $bulan = (int)$bulan;
        $tahun = (int)substr($tahun, -2); // Mengambil 2 digit terakhir dari tahun

        $tgl = sprintf("%02d%02d", $bulan, $tahun); // Format MMYY

        Log::info('Request Data: ' .json_encode($tgl));

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_IDBKM]
        @month = ?,
        @year = ?,
        @IdBank = ?,
        @jenis = ?,
        @tgl = ?', [
            $bulan,
            $tahun,
            $idBank,
            $jenisBank,
            $tgl,
        ]);

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_INSERT_BKM_TPELUNASAN]
        @idBKM = ?,
        @tglinput = ?,
        @userinput = ?,
        @terjemahan = ?,
        @nilaipelunasan = ?', [
            $idBKMNew,
            $tanggal,
            1,
            $konversi,
            $total1,
        ]);

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_IDBKM_1]
        @idpelunasan = ?,
        @idBKM = ?,
        @idBank = ?,
        @kode = ?', [
            $idPelunasan,
            $idBKMNew,
            $idBank2,
            $idKodePerkiraan,
        ]);

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_COUNTER_IDBKM]
        @idbkm = ?,
        @idBank = ?,
        @jenis = ?,
        @tgl = ?', [
            $idbkm,
            $idBank,
            $jenisBank,
            $tgl
        ]);

        return redirect()->back()->with('Success', 'Data BKM Dengan No. ' .$idBKMNew. ' TerSimpan');
    }

    public function insertUpdateCreateBKM2(Request $request)
    {
        //dd($request->all());
        $idBKMNew = $request->idBKMNew;
        $tglInputNew = $request->tglInputNew;
        $tanggal = $request->tanggal;
        $konversi = $request->konversi;
        $total1 = $request->total1;

        $idbkm = $request->idbkm;
        $idBank = $request->idBank;
        $jenisBank = $request->jenisBank;
        $idKodePerkiraan = $request->idKodePerkiraan;
        $idPelunasan = $request->idPelunasan;

        list($hari, $bulan, $tahun) = explode('-', $tglInputNew);

        // Mengambil bulan dan tahun sebagai integer
        $bulan = (int)$bulan;
        $tahun = (int)$tahun;
        $tgl = $bulan . $tahun;

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_IDBKM]
        @month = ?,
        @year = ?,
        @IdBank = ?,
        @jenis = ?,
        @tgl = ?', [
            $bulan,
            $tahun,
            $idBank,
            $jenisBank,
            $tgl,
        ]);

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_INSERT_BKM_TPELUNASAN]
        @idBKM = ?,
        @tglinput = ?,
        @userinput = ?,
        @terjemahan = ?,
        @nilaipelunasan = ?', [
            $idBKMNew,
            $tanggal,
            1,
            $konversi,
            $total1,
        ]);

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_IDBKM_1]
        @idpelunasan = ?,
        @idBKM = ?,
        @idBank = ?,
        @kode = ?', [
            $idPelunasan,
            $idBKMNew,
            $idBank,
            $idKodePerkiraan,
        ]);

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_COUNTER_IDBKM]
        @idbkm = ?,
        @idBank = ?,
        @jenis = ?,
        @tgl = ?', [
            $idbkm,
            $idBank,
            $jenisBank,
            $tgl
        ]);

        return redirect()->back()->with('Success', 'Data BKM Dengan No. ' .$idBKMNew. ' TerSimpan');
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {

    }

    //Display the specified resource.
    public function show($cr)
    {
        //
    }

    // Show the form for editing the specified resource.
    public function edit($id)
    {

    }

    //Update the specified resource in storage.
    public function update(Request $request)
    {
        $idBKM = $request ->idBKM;
        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_TGLCETAK_BKM] @idBKM = ?', [
            $idBKM]);
        return redirect()->back()->with('success', 'Detail Sudah Terkoreksi');
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
