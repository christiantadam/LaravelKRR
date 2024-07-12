<?php

namespace App\Http\Controllers\Accounting\Piutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BKMDPPelunasanController extends Controller
{
    public function index()
    {
        $data = 'Accounting';
        return view('Accounting.Piutang.BKMDPPelunasan', compact('data'));
    }

    public function getNamaCustomer()
    {
        $cust =  DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_CUSTOMER]');
        return response()->json($cust);
    }

    public function getTabelDataPelunasan($idCustomer)
    {
        $tabel =  DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_SALDO_PELUNASAN] @Kode = ?, @idCust = ?', [3, $idCustomer]);
        return response()->json($tabel);
    }

    function getUraianEnterBKM($id, $tanggal)
    {
        $idBank = $id;
        $tanggal = $tanggal;
        $jenis = 'R';

        $result = DB::statement("EXEC [dbo].[SP_5409_ACC_COUNTER_BKM_BKK] ?, ?, ?, ?", [
            $jenis,
            $tanggal,
            $idBank,
            null
            // Pass by reference for output parameter
        ]);

        $tahun = substr($tanggal, -10, 4);
        $x = DB::connection('ConnAccounting')->table('T_COUNTER_BKM')->where('Periode', '=', $tahun)->first();
        $nomorIdBKM = '00000' . str_pad($x->Id_BKM_E_Rp, 5, '0', STR_PAD_LEFT);
        $idBKM = $idBank . '-R' . substr($tahun, -2) . substr($nomorIdBKM, -5);

        return response()->json($idBKM);
    }

    function getUraianEnterBKK($id, $tanggal)
    {
        $idBank = $id;
        $tanggal = $tanggal;
        $jenis = 'P';

        $result = DB::statement("EXEC [dbo].[SP_5409_ACC_COUNTER_BKM_BKK] ?, ?, ?, ?", [
            $jenis,
            $tanggal,
            $idBank,
            null
            // Pass by reference for output parameter
        ]);

        $tahun = substr($tanggal, -10, 4);
        $x = DB::connection('ConnAccounting')->table('T_COUNTER_BKK')->where('Periode', '=', $tahun)->first();
        $nomorIdBKK = '00000' . str_pad($x->Id_BKK_E_Rp, 5, '0', STR_PAD_LEFT);
        $idBKK = $idBank . '-P' . substr($tahun, -2) . substr($nomorIdBKK, -5);

        return response()->json($idBKK);
    }

    public function getTabelTampilBKM($tanggalTampilBKM, $tanggalTampilBKM2)
    {
        // dd("masuk");
        $tabel =  DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_BKM_DP_PERTGL] @tgl1 = ?, @tgl2 = ?', [$tanggalTampilBKM, $tanggalTampilBKM2]);
        return response()->json($tabel);
    }

    public function getTabelTampilBKK($tanggalTampilBKK, $tanggalTampilBKK2)
    {
        // dd("masuk");
        $tabel =  DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_BKK_DP_PERTGL] @tgl1 = ?, @tgl2 = ?', [$tanggalTampilBKK, $tanggalTampilBKK2]);
        return response()->json($tabel);
    }

    public function getIdPembayaran()
    {
        // dd("masuk");
        $idPembayaran = DB::connection('ConnAccounting')
            ->table('T_Pembayaran_Tagihan')
            ->max('Id_Pembayaran');

        return response()->json(['id_pembayaran' => $idPembayaran]);
    }

    public function getIdPelunasan()
    {
        $idPelunasan = DB::connection('ConnAccounting')
            ->table('T_Pelunasan_Tagihan')
            ->max('Id_Pelunasan');
        // dd($idPelunasan);

        return response()->json(['Id_Pelunasan' => $idPelunasan]);
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        //dd($request->all());
        $idCustomer = $request->idCustomer;
        $idBKK = $request->idBKK;
        $tanggal = $request->tanggal;
        $konversi = $request->konversi;
        $konversi1 = $request->konversi1;
        $nilai = $request->nilai;
        $idBankBKK = $request->idBankBKK;
        $idMataUang = $request->idMataUang;
        $kursRupiah = $request->kursRupiah;
        $idBKM = $request->idBKM;
        $idPembayaran = $request->idPembayaran;
        $uraian = $request->uraian;
        $nilai = $request->nilai;
        $nilai1 = $request->nilai1;
        $idKodePerkiraanBKK = $request->idKodePerkiraanBKK;
        $jenisBankBKK = $request->jenisBankBKK;
        $id_bkk = $request->id_bkk;
        $idBankBKM = $request->idBankBKM;
        $idKodePerkiraanBKM = $request->idKodePerkiraanBKM;
        $uraianBKM = $request->uraianBKM;
        $jenisBankBKM = $request->jenisBankBKM;
        $bulan = $request->bulan;
        $tahun = $request->tahun;
        $idPelunasan = $request->idPelunasan;

        $tgl = $tahun . '-' . $bulan . '-01';

        $id_bkm = $request->id_bkm;

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_INSERT_BKK_TPEMBAYARAN]
        @idBKK = ?,
        @tgl = ?,
        @userinput = ?,
        @terjemahan = ?,
        @nilai = ?,
        @IdBank= ?', [
            $idBKK,
            $tanggal,
            null,
            $konversi,
            $nilai,
            $idBankBKK
        ]);

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_INSERT_BKK_TPEMBAYARAN_TAG]
        @idBKK = ?,
        @idUang = ?,
        @idJenis = ?,
        @idBank = ?,
        @nilai = ?,
        @user = ?,
        @Kurs = ?,
        @idBKM_acuan = ?', [
            $idBKK,
            $idMataUang,
            1,
            $idBankBKK,
            $nilai,
            null,
            $kursRupiah,
            $idBKM
        ]);

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_INSERT_BKK_TDETAILPEMB]
        @idpembayaran = ?,
        @keterangan = ?,
        @biaya = ?,
        @kodeperkiraan = ?', [
            $idPembayaran,
            $uraian,
            $nilai,
            $idKodePerkiraanBKK,
        ]);

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_COUNTER_IDBKK]
        @idbkk = ?,
        @idBank = ?,
        @jenis = ?,
        @tgl = ?', [
            $id_bkk,
            $idBankBKK,
            $jenisBankBKK,
            $tanggal,
        ]);

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_INSERT_BKM_TPELUNASAN]
        @idBKM = ?,
        @tglinput = ?,
        @userinput = ?,
        @terjemahan = ?,
        @nilaipelunasan = ?,
        @IdBank = ?', [
            $idBKM,
            $tanggal,
            1,
            $nilai1,
            $konversi1,
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
        @idBKKAcuan = ?,
        @saldo = ?,
        @idCust = ?,
        @kurs = ?', [
            $idBKM,
            $tanggal,
            $idMataUang,
            1,
            $idBankBKM,
            $idKodePerkiraanBKM,
            $uraianBKM,
            $nilai1,
            1,
            $idBKK,
            $nilai1,
            $idCustomer,
            $kursRupiah
        ]);

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_COUNTER_IDBKM]
        @idbkm = ?,
        @idBank = ?,
        @jenis = ?,
        @tgl = ?', [
            $id_bkm,
            $idBankBKM,
            $jenisBankBKM,
            $tgl
        ]);

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_SALDO_PELUNASAN]
        @idBKM = ?,
        @idPelunasan = ?,
        @nilai = ?', [
            $idBKM,
            $idPelunasan,
            $nilai
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
