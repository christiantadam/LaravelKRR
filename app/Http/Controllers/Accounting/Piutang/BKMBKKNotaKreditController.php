<?php

namespace App\Http\Controllers\Accounting\Piutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Auth;

class BKMBKKNotaKreditController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Piutang.BKMBKKNotaKredit', compact('access'));
        // $data = 'Accounting';
        // return view('Accounting.Piutang.BKMBKKNotaKredit', compact('data'));
    }

    public function getDataNotaKredit()
    {
        $tabel =  DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_NOTA_KREDIT]');
        // dd($tabel);
        return response()->json($tabel);
    }

    public function getMataUang()
    {
        $data = DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_MATA_UANG] @Kode = ?', [1]);
        $data_Uang = [];
        foreach ($data as $detail_Uang) {
            $data_Uang[] = [
                'Id_MataUang' => $detail_Uang->Id_MataUang,
                'Nama_MataUang' => $detail_Uang->Nama_MataUang
            ];
        }
        return datatables()->of($data_Uang)->make(true);
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
        $idBKK = $idBank . '-R' . substr($tahun, -2) . substr($nomorIdBKK, -5);

        return response()->json($idBKK);
    }

    public function getTabelTampilBKM($tanggalTampilBKM, $tanggalTampilBKM2)
    {
        // dd("masuk");
        $tabel =  DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_BKM_NOTA_KREDIT_PERTGL] @tgl1 = ?, @tgl2 = ?', [$tanggalTampilBKM, $tanggalTampilBKM2]);
        return response()->json($tabel);
    }

    public function getTabelTampilBKK($tanggalTampilBKK, $tanggalTampilBKK2)
    {
        // dd("masuk");
        $tabel =  DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_BKK_NOTA_KREDIT_PERTGL] @tgl1 = ?, @tgl2 = ?', [$tanggalTampilBKK, $tanggalTampilBKK2]);
        return response()->json($tabel);
    }

    public function getIdPelunasan()
    {
        $idPelunasan = DB::connection('ConnAccounting')
            ->table('T_Pelunasan_Tagihan')
            ->max('Id_Pelunasan');
        // dd($idPelunasan);

        return response()->json(['Id_Pelunasan' => $idPelunasan]);
    }

    public function getIdPembayaran()
    {
        $idPembayaran = DB::connection('ConnAccounting')
            ->table('T_Pembayaran_Tagihan')
            ->max('Id_Pembayaran');
        // dd($idPelunasan);

        return response()->json(['Id_Pembayaran' => $idPembayaran]);
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
        $idBKM = $request->idBKM;
        $tanggal = $request->tanggal;
        $konversi = $request->konversi;
        $konversi1 = $request->konversi1;
        $nilai1 = $request->nilai1;
        $nilai = $request->nilai;
        $idBankBKM = $request->idBankBKM;
        $idBankBKK = $request->idBankBKK;
        $idMataUang = $request->idMataUangBKM;
        $idBKK = $request->idBKK;
        $idCustomer = $request->idCustomer;
        $kursRupiah = $request->kursRupiah;
        $jenisBankBKM = $request->jenisBankBKM;
        $bulan = $request->bulan;
        $tahun = $request->tahun;

        $tgl = $tahun . '-' . $bulan . '-01';
        $id_bkm = $request->id_bkm;
        $id_bkk = $request->id_bkk;
        $jumlahUangBKM = $request->jumlahUangBKM;
        $idPelunasan = $request->idPelunasan;
        $idPenagihan = $request->idPenagihan;
        $idKodePerkiraanBKM = $request->idKodePerkiraanBKM;
        $idPembayaran = $request->idPembayaran;
        $noNotaKredit = $request->noNotaKredit;
        $jumlah = $request->jumlah;
        $idKodePerkiraanBKK = $request->idKodePerkiraanBKK;
        $jenisBankBKK = $request->jenisBankBKK;

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_INSERT_BKM_TPELUNASAN]
        @idBKM = ?,
        @tglinput = ?,
        @userinput = ?,
        @terjemahan = ?,
        @nilaipelunasan = ?,
        @IdBank= ?,
        @kode = ?', [
            $idBKM,
            $tanggal,
            null,
            $konversi,
            $nilai1,
            $idBankBKM,
            1
        ]);

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_INSERT_BKM_TPELUNASAN_TAG]
        @idBKM = ?,
        @tgl = ?,
        @idBKKAcuan = ?,
        @idUang = ?,
        @idJenis = ?,
        @idBank = ?,
        @nilaipelunasan = ?,
        @user = ?,
        @idCust = ?,
        @Kurs = ?,
        @status = ?', [
            $idBKM,
            $tanggal,
            $idBKK,
            $idMataUang,
            1,
            $idBankBKM,
            $nilai1,
            1,
            $idCustomer,
            $kursRupiah,
            'Y'
        ]);

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_INSERT_BKM_TDETAILPEL]
        @idpelunasan = ?,
        @idpenagihan = ?,
        @sisa = ?,
        @kodePerk = ?,
        @kode = ?', [
            $idPelunasan,
            $idPenagihan,
            $jumlahUangBKM,
            $idKodePerkiraanBKM,
            1
        ]);

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_COUNTER_IDBKM]
        @idbkm = ?,
        @idbank = ?,
        @jenis = ?,
        @tgl = ?', [
            $id_bkm,
            $idBankBKK,
            $jenisBankBKM,
            $tgl
        ]);

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_INSERT_BKK_TPEMBAYARAN]
        @idBKK = ?,
        @tgl = ?,
        @userinput = ?,
        @terjemahan = ?,
        @nilai = ?,
        @IdBank =  ?,
        @kode = ?', [
            $idBKK,
            $tanggal,
            null,
            $konversi1,
            $nilai,
            $idBankBKK,
            1
        ]);

        DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_INSERT_BKK_TPEMBAYARAN_TAG]
        @idBKK = ?,
        @idUang = ?,
        @idJenis = ?,
        @idBank = ?,
        @nilai = ?,
        @idBKM_acuan =  ?,
        @kurs = ?,
        @user = ?', [
            $idBKK,
            $idMataUang,
            1,
            $idBankBKK,
            $nilai,
            $idBKM,
            $kursRupiah,
            1
        ]);

        DB::connection('ConnAccounting')->statement(
            'exec [SP_5298_ACC_INSERT_BKK_TDETAILPEMB]
        @idpembayaran = ?,
        @keterangan = ?,
        @biaya = ?,
        @kodeperkiraan = ?',
            [
                $idPembayaran,
                $noNotaKredit,
                $jumlah,
                $idKodePerkiraanBKK
            ]
        );

        DB::connection('ConnAccounting')->statement(
            'exec [SP_5298_ACC_UPDATE_COUNTER_IDBKK]
        @idbkk = ?,
        @idBank = ?,
        @jenis = ?,
        @tgl = ?',
            [
                $id_bkk,
                $idBankBKK,
                $jenisBankBKK,
                $tgl
            ]
        );

        DB::connection('ConnAccounting')->statement(
            'exec [SP_5298_ACC_UPDATE_FIELD_IDBKK]
        @idNotaKredit = ?,
        @idPenagihan = ?,
        @idBKK = ?,
        @idBKM = ?',
            [
                $noNotaKredit,
                $idPenagihan,
                $idBKK,
                $idBKM
            ]
        );

        return redirect()->back()->with('success', 'BKM No. ' . $idBKM . ' & BKK No. ' . $idBKK . ' Tersimpan');
    }


    //Display the specified resource.
    public function show($id, Request $request)
    {
        $idBankBKM = trim($request->input('idBankBKM'));

        if ($id === 'getbank') {
            $data = DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_BANK]');
            $data_isi = [];
            foreach ($data as $detail_isi) {
                $data_isi[] = [
                    'Id_Bank' => $detail_isi->Id_Bank,
                    'Nama_Bank' => $detail_isi->Nama_Bank
                ];
            }
            return datatables()->of($data_isi)->make(true);
        }

        else if ($id === 'detailjenisbank') {
            $data =  DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_BANK_1] @idBank = ?', [$idBankBKM]);
            return response()->json($data);
        }
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
            $idBKMTampil = $request->idBKMTampil;
            DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_TGLCETAK_BKM] @idBKM = ?', [
                $idBKMTampil
            ]);
            return redirect()->back()->with('success', 'Detail Sudah Terkoreksi');
        } else if ($proses['cetak'] == "cetakBKK") {
            //dd($request->all());
            $idBKKTampil = $request->idBKKTampil;
            DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_TGLCETAK_BKK] @idBKK = ?', [
                $idBKKTampil
            ]);
            return redirect()->back()->with('success', 'Detail Sudah Terkoreksi');
        }
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
