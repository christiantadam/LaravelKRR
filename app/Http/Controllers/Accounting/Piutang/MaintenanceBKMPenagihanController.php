<?php

namespace App\Http\Controllers\Accounting\Piutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class MaintenanceBKMPenagihanController extends Controller
{
    public function index()
    {
        $data = 'Accounting';
        return view('Accounting.Piutang.MaintenanceBKMPenagihan', compact('data'));
    }

    public function getTabelPelunasan($bulan, $tahun)
    {
        //dd($bulan, $tahun);
        $tabel =  DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_PELUNASAN_TAGIHAN] @bln = ?, @thn = ?', [$bulan, $tahun]);
        return response()->json($tabel);
    }

    public function getTabelDetailPelunasan($idPelunasan)
    {
        //dd($bulan, $tahun);
        $tabel =  DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_DETAIL_PELUNASAN] @idPelunasan = ?', [$idPelunasan]);
        return response()->json($tabel);
    }

    public function getTabelKurangLebih($idPelunasan)
    {
        $tabel =  DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_DETAIL_KRGLBH] @idPelunasan = ?', [$idPelunasan]);
        return response()->json($tabel);
    }

    public function getTabelTampilBKMPenagihan($tanggalInputTampil, $tanggalInputTampil2)
    {
        $tabel =  DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_BKM_TAGIH_PERTGL] @tgl1 = ?, @tgl2 = ?', [$tanggalInputTampil, $tanggalInputTampil2]);
        return response()->json($tabel);
    }

    public function getTabelBiaya($idPelunasan)
    {

        $tabel =  DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_DETAIL_BIAYA] @idPelunasan = ?', [$idPelunasan]);
        return response()->json($tabel);
    }

    function getDataBank()
    {
        $bank =  DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_BANK]');
        return response()->json($bank);
    }

    function getKodePerkiraan()
    {
        $kode =  DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_KODE_PERKIRAAN] @Kode = ?', 1);
        return response()->json($kode);
    }

    function cekNoPelunasanBKMPenagihan($idPelunasan, $idCustomer)
    {
        $kode =  DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_CEK_NO_PELUNASAN]
        @idpelunasan = ?,
        @idcust = ?',
        [
            $idPelunasan,
            $idCustomer
        ]);
        return response()->json($kode);
    }


    public function cekJumlahRincianBKMPenagihan($idPelunasan)
    {
        $kode =  DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_CEK_JML_RINCIAN]
        @idpelunasan = ?',
        [
            $idPelunasan
        ]);
        return response()->json($kode);
    }

    function getIDBKMPenagihan($id, $tanggal)
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

    public function prosesSisaPiutang($idPelunasan)
    {
        $kode =  DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_GET_IDPENAGIHAN_PIUTANG]
        @idpelunasan = ?',
        [
            $idPelunasan
        ]);
        return response()->json($kode);
    }

    function insertUpdateBKMPenagihan(Request $request)
    {
        dd('masuk');
        $idPelunasan = $request->idPelunasan;
        $sisa = $request->sisa;
        $jenisBayar = $request->jenisBayar;
        $tanggalTagih = $request->tanggalTagih;

        $idBKMNew = $request->idBKMNew;
        $tglInputNew = $request->tglInputNew;
        $konversi = $request->konversi;
        $total = $request->total;

        $idBank = $request->idBank;
        $jenisBank = $request->jenisBank;
        $idPelunasan = $request->idPelunasan;

        list($hari, $bulan, $tahun) = explode('-', $tglInputNew);

        // Mengambil bulan dan tahun sebagai integer
        $bulan = (int)$bulan;
        $tahun = (int)$tahun;
        $tgl = $bulan . $tahun;

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_INSERT_BKM_TDETAILPEL]
        @idpelunasan = ?,
        @sisa = ?,
        @jenisBayar = ?', [
            $idPelunasan,
            $sisa,
            $jenisBayar
        ]);

        DB::connection('ConnAccounting')->statement('exec [SP_5409_ACC_COUNTER_BKM_BKK]
        @bank = ?,
        @jenis = ?,
        @tgl = ?,
        @id = ?', [
            $idBank,
            'R',
            $tgl,
            $idBKMNew
        ]);

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_INSERT_BKM_TPELUNASAN]
        @idBKM = ?,
        @tglinput = ?,
        @userinput = ?,
        @terjemahan = ?,
        @nilaipelunasan = ?,
        @IdBank = ?', [
            $idBKMNew,
            $tanggalTagih,
            1,
            $konversi,
            $total,
            $idBank,
        ]);

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_IDBKM_1]
        @idpelunasan = ?,
        @idBKM = ?,
        @idBank = ?', [
            $idPelunasan,
            $idBKMNew,
            $idBank
        ]);

        return response()->json('ok');
        // return redirect()->back()->with('Success', 'Data BKM Dengan No. ' .$idBKMNew. ' TerSimpan');
    }

    public function getCetakBKMNoPenagihan($idBKMInput)
    {
        //dd($idBKM);
        $data = DB::connection('ConnAccounting')->table('VW_PRG_5298_ACC_CETAK_BKM_TAGIH')
        ->where('Id_BKM', $idBKMInput)
        ->get();
        return $data;
    }

    public function getCetakBKMJumlahPelunasan($idBKMInput)
    {
        //dd($idBKM);
        $data = DB::connection('ConnAccounting')->table('VW_PRG_5298_ACC_JML_PELUNASAN_TAGIH')
        ->where('Id_BKM', $idBKMInput)
        ->get();
        return $data;
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        //
    }

    //Display the specified resource.
    public function show($cr)
    {
        //
    }

    // Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request)
    {
        $proses =  $request->all();
        //dd("masuk");
        if ($proses['detpelunasan'] == "datpelunasan") {
            $idBank = $request->idBank;
            DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_LIST_BANK_1]
            @idBank = ?', [$idBank]);
            return redirect()->back()->with('success', 'Data sudah diKOREKSI');

        } else if ($proses['detpelunasan'] == "detpelunasan") {
            //dd("masuk else if");
            $idDetail = $request->iddetail;
            $kode = $request->idKodePerkiraan;
            DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_DETAIL_PELUNASAN] @iddetail = ?, @kode = ?', [
                $idDetail, $kode]);
            return redirect()->back()->with('success', 'Detail Sudah Terkoreksi');

        } else if ($proses['detpelunasan'] == "detkuranglebih") {
            //dd($request->all());
            $idcoba = $request->idcoba;
            $kode = $request ->idKodePerkiraanKrgLbh;
            $keterangan = $request ->keterangan;
            DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_DETAIL_KRGLBH] @iddetail = ?, @keterangan = ?, @kode = ?', [
                $idcoba, $keterangan, $kode]);
            return redirect()->back()->with('success', 'Detail Sudah Terkoreksi');
        }
        else if ($proses['detpelunasan'] == "detbiaya") {
            //dd($request->all());
            $idDetailBiaya = $request->idDetailBiaya;
            $kode = $request ->idKodePerkiraanBiaya;
            $keterangan = $request ->keteranganBiaya;
            DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_DETAIL_BIAYA] @iddetail = ?, @keterangan = ?, @kode = ?', [
                $idDetailBiaya, $keterangan, $kode]);
            return redirect()->back()->with('success', 'Detail Sudah Terkoreksi');
        }
        // else if ($proses['detpelunasan'] == "dettampilbkm") {
        //     //dd($request->all());
        //     $idcoba = $request->idcoba;
        //     $kode = $request ->idKodePerkiraanKrgLbh;
        //     $keterangan = $request ->keterangan;
        //     DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_LIST_BKM_TAGIH] @iddetail = ?, @keterangan = ?, @kode = ?', [
        //         $idcoba, $keterangan, $kode]);
        //     return redirect()->back()->with('success', 'Detail Sudah Terkoreksi');
        // }
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
