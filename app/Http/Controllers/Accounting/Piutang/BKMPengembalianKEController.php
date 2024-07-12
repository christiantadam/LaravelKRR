<?php

namespace App\Http\Controllers\Accounting\Piutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BKMPengembalianKEController extends Controller
{
    public function index()
    {
        $data = 'Accounting';
        return view('Accounting.Piutang.BKMPengembalianKE', compact('data'));
    }

    public function getNamaCustomer()
    {
        $cust =  DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_CUSTOMER]');
        return response()->json($cust);
    }

    public function getJenisPembayaran()
    {
        $jenis =  DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_JENIS_DOK]');
        return response()->json($jenis);
    }

    public function getTabelTampilBKM($tanggalTampilBKM, $tanggalTampilBKM2)
    {
        // dd("masuk");
        $tabel =  DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_BKM_KE_PERTGL] @tgl1 = ?, @tgl2 = ?', [$tanggalTampilBKM, $tanggalTampilBKM2]);
        return response()->json($tabel);
    }

    public function getTabelTampilBKK($tanggalTampilBKK, $tanggalTampilBKK2)
    {
        // dd("masuk");
        $tabel =  DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_BKK_KE_PERTGL] @tgl1 = ?, @tgl2 = ?', [$tanggalTampilBKK, $tanggalTampilBKK2]);
        return response()->json($tabel);
    }

    function getUraianBKMEnter($id, $tanggal)
    {
        $idBank = $id;
        $tanggal = $tanggal;
        $jenis = 'R';

        // $result = DB::statement("EXEC [dbo].[SP_5409_ACC_COUNTER_BKM_BKK] ?, ?, ?, ?", [
        //     $jenis,
        //     $tanggal,
        //     $idBank,
        //     null
        //     // Pass by reference for output parameter
        // ]);

        $tahun = substr($tanggal, -10, 4);
        $x = DB::connection('ConnAccounting')->table('T_COUNTER_BKM')->where('Periode', '=', $tahun)->first();
        $nomorIdBKM = '00000' . str_pad($x->Id_BKM_E_Rp, 5, '0', STR_PAD_LEFT);
        $idBKM = $idBank . '-R' . substr($tahun, -2) . substr($nomorIdBKM, -5);

        return response()->json($idBKM);
    }

    function getUraianBKKEnter($id, $tanggal)
    {
        $idBank = $id;
        $tanggal = $tanggal;
        $jenis = 'P';

        // $result = DB::statement("EXEC [dbo].[SP_5409_ACC_COUNTER_BKM_BKK] ?, ?, ?, ?", [
        //     $jenis,
        //     $tanggal,
        //     $idBank,
        //     null
        //     // Pass by reference for output parameter
        // ]);

        $tahun = substr($tanggal, -10, 4);
        $x = DB::connection('ConnAccounting')->table('T_COUNTER_BKK')->where('Periode', '=', $tahun)->first();
        $nomorIdBKK = '00000' . str_pad($x->Id_BKK_E_Rp, 5, '0', STR_PAD_LEFT);
        $idBKK = $idBank . '-P' . substr($tahun, -2) . substr($nomorIdBKK, -5);

        return response()->json($idBKK);
    }

    public function getIdPembayaran()
    {
        $idPembayaran = DB::connection('ConnAccounting')
            ->table('T_Pembayaran_Tagihan')
            ->max('Id_Pembayaran');
        // dd($idPelunasan);

        return response()->json(['Id_Pembayaran' => $idPembayaran]);
    }

    public function getCetakPengembalianKE($idBKMTampil)
    {
        //dd($idBKM);
        $data = DB::connection('ConnAccounting')->table('VW_PRG_5298_ACC_CETAK_BKM_NOTAGIH_1')
        ->where('Id_BKM', $idBKMTampil)
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
        dd($request->all());
        $idBKK = $request->idBKK;
        $idBKM = $request->idBKM;
        $tanggal = $request->tanggal;
        $konversi = $request->konversi;
        $nilai1 = $request->nilai1;
        $nilai= $request->nilai;
        $idBankBKM = $request->idBankBKM;
        $idMataUangBKM = $request->idMataUangBKM;
        $idJenisPembayaranBKM = $request->idJenisPembayaranBKM;
        $idKodePerkiraanBKM = $request->idKodePerkiraanBKM;
        $uraianBKM = $request->uraianBKM;
        $kurs = $request->kurs;
        $idCustomer = $request->idCustomer;
        $jenisBankBKM = $request->jenisBankBKM;
        $bulan = $request->bulan;
        $tahun = $request->tahun;
        $idBankBKK = $request->idBankBKK;
        $idPembayaran = $request->idPembayaran;
        $uraianBKK = $request->uraianBKK;
        $idKodePerkiraanBKK = $request->idKodePerkiraanBKK;
        $jenisBankBKK = $request->jenisBankBKK;

        $tgl = $tahun . '-' . $bulan . '-01';

        $id_bkm = $request->id_bkm;
        $id_bkk = $request->id_bkk;
        $konversi1 = $request->konversi1;

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_INSERT_BKM_TPELUNASAN]
        @idBKM = ?,
        @tglinput = ?,
        @userinput = ?,
        @terjemahan = ?,
        @nilaipelunasan = ?,
        @IdBank= ?',
        [
            $idBKM,
            $tanggal,
            1,
            $konversi,
            $nilai1,
            $idBankBKM
        ]);

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_INSERT_BKM_TPELUNASAN_TAG]
        @idBKM = ?,
        @tgl = ?,
        @idUang = ?,
        @idJenis = ?,
        @idBank = ?,
        @kodeperkiraan = ?,
        @uraian = ?,
        @nilaipelunasan = ?,
        @user = ?,
        @Kurs = ?,
        @idCust = ?',
        [
            $idBKM,
            $tanggal,
            $idMataUangBKM,
            $idJenisPembayaranBKM,
            $idBankBKM,
            $idKodePerkiraanBKM,
            $uraianBKM,
            $nilai1,
            1,
            $kurs,
            $idCustomer
        ]);

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_COUNTER_IDBKM]
        @idbkm = ?,
        @idBank = ?,
        @jenis = ?,
        @tgl = ?',
        [
            $id_bkm,
            $idBankBKM,
            $jenisBankBKM,
            $tgl
        ]);

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_INSERT_BKK_TPEMBAYARAN]
        @idBKk = ?,
        @tgl = ?,
        @userinput = ?,
        @terjemahan = ?,
        @nilai = ?,
        @IdBank = ?',
        [
            $idBKK,
            $tanggal,
            1,
            $konversi1,
            $nilai,
            $idBankBKM
        ]);

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_INSERT_BKK_TPEMBAYARAN_TAG]
        @idBKk = ?,
        @idUang = ?,
        @idJenis = ?,
        @idBank = ?,
        @nilai = ?,
        @user = ?,
        @kurs = ?,
        @idBKM_acuan = ?',
        [
            $idBKK,
            $idMataUangBKM,
            $idJenisPembayaranBKM,
            $idBankBKK,
            $nilai,
            1,
            $kurs,
            $idBKM
        ]);

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_INSERT_BKK_TDETAILPEMB]
        @idpembayaran = ?,
        @keterangan = ?,
        @biaya = ?,
        @kodeperkiraan = ?',
        [
            $idPembayaran,
            $uraianBKK,
            $nilai,
            $idKodePerkiraanBKK
        ]);

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_COUNTER_IDBKK]
        @idbkk = ?,
        @idBank = ?,
        @jenis = ?,
        @tgl = ?',
        [
            $id_bkk,
            $idBankBKK,
            $jenisBankBKK,
            $tgl
        ]);

        return redirect()->back()->with('success', 'BKK No. '. $idBKK . ' & BKM No. ' . $idBKM . ' Tersimpan');
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
        if ($proses['cetak'] == "cetakBKM") {
            //dd($request->all());
            $idBKMTampil = $request ->idBKMTampil;
            DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_TGLCETAK_BKM] @idBKM = ?', [
                $idBKMTampil]);
            return redirect()->back()->with('success', 'Detail Sudah Terkoreksi');
        }
        else if ($proses['cetak'] == "cetakBKK") {
            //dd($request->all());
            $idBKKTampil = $request ->idBKKTampil;
            DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_TGLCETAK_BKK] @idBKK = ?', [
                $idBKKTampil]);
            return redirect()->back()->with('success', 'Detail Sudah Terkoreksi');
        }
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
