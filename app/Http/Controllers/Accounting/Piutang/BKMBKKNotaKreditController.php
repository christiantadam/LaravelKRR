<?php

namespace App\Http\Controllers\Accounting\Piutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

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
        $tanggal = trim($request->input('tanggal'));
        $jenis = trim($request->input('jenis'));
        $idBankBKK = trim($request->input('idBankBKK'));
        $idBankBKKtemp = trim($request->input('idBankBKKtemp'));

        if ($id === 'getbank') {
            $data = DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_BANK]');
            // dd($data);
            $data_isi = [];
            foreach ($data as $detail_isi) {
                $data_isi[] = [
                    'Id_Bank' => $detail_isi->Id_Bank,
                    'Nama_Bank' => $detail_isi->Nama_Bank
                ];
            }
            return datatables($data_isi)->make(true);
        } else if ($id === 'detailjenisbank') {
            $idBank = trim($request->input('idBank'));

            $data =  DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_BANK_1] @idBank = ?', [$idBank]);
            // dd($data, $request->all());
            return response()->json($data);
        } else if ($id === 'getkodeperkiraan') {
            $data = DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_KODE_PERKIRAAN] @Kode = 1');
            // dd($data);
            $data_isi = [];
            foreach ($data as $detail_isi) {
                $data_isi[] = [
                    'NoKodePerkiraan' => $detail_isi->NoKodePerkiraan,
                    'Keterangan' => $detail_isi->Keterangan
                ];
            }
            return datatables($data_isi)->make(true);
        } else if ($id === 'getidNota') {
            $tanggal = trim($request->input('tanggal'));
            $jenis = trim($request->input('jenis'));

            // dd($request->all());
            $tgl = Carbon::parse($tanggal);

            $tahun = $tgl->year;
            $noUrut = 0;
            $ada = 0;

            if ($jenis === 'R') {
                $ada = DB::connection('ConnAccounting')->table('T_Counter_BKM')->where('Periode', $tahun)->count();

                if ($ada == 1) {
                    $noUrut = DB::connection('ConnAccounting')->table('T_Counter_BKM')->where('Periode', $tahun)->value('Id_BKM_E_Rp');
                } else {
                    $noUrut = 1;

                    DB::connection('ConnAccounting')->table('T_Counter_BKM')->insert([
                        'Periode' => $tahun,
                        'Id_BKM_E_Rp' => $noUrut,
                    ]);
                }

                $idBKM = '00000' . (string)$noUrut;
                $finalIdBKM = $idBankBKM . '-R' . substr($tahun, -2) . substr($idBKM, -5);

                DB::connection('ConnAccounting')->table('T_Counter_BKM')->where('Periode', $tahun)->update([
                    'Id_BKM_E_Rp' => $noUrut + 1,
                ]);

                return response()->json(['IdBKM' => $finalIdBKM]);
            } else {
                $ada = DB::connection('ConnAccounting')->table('T_Counter_BKK')->where('Periode', $tahun)->count();

                if ($ada == 1) {
                    $noUrut = DB::connection('ConnAccounting')->table('T_Counter_BKK')->where('Periode', $tahun)->value('Id_BKK_E_Rp');
                } else {
                    $noUrut = 1;

                    DB::connection('ConnAccounting')->table('T_Counter_BKK')->insert([
                        'Periode' => $tahun,
                        'Id_BKK_E_Rp' => $noUrut,
                    ]);
                }

                $idBKK = '00000' . (string)$noUrut;
                $finalIdBKK = $idBankBKK . '-R' . substr($tahun, -2) . substr($idBKK, -5);

                DB::connection('ConnAccounting')->table('T_Counter_BKK')->where('Periode', $tahun)->update([
                    'Id_BKK_E_Rp' => $noUrut + 1,
                ]);

                return response()->json(['IdBKK' => $finalIdBKK]);
            }
        } else if ($id == 'cetakBKK') {
            $bkk = trim($request->input('bkk'));

            $sno = DB::connection('ConnAccounting')
                ->select("SELECT * FROM VW_PRG_5298_ACC_CETAK_BKK_NOTA_KREDIT WHERE Id_BKK = ?", [$bkk]);
            // dd($sno);

            DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_TGLCETAK_BKK] @idBKK = ?', [$bkk]);

            return response()->json([
                'data' => $sno,
                'message' => 'Laporan telah dicetak dengan sukses'
            ]);
        } else if ($id == 'getPembulatanBKK') {
            $results = DB::connection('ConnAccounting')->select('exec SP_5298_ACC_LIST_BKK_NOTA_KREDIT');
            // dd($results);
            $response = [];
            $j = 0;

            foreach ($results as $row) {
                $j++;
                $response[] = [
                    'Tgl_Input' => \Carbon\Carbon::parse($row->Tgl_Input)->format('m/d/Y'),
                    'Id_BKK' => $row->Id_BKK,
                    'Nilai_Pembulatan' => number_format($row->Nilai_Pembulatan, 2, '.', ','),
                    'Terjemahan' => $row->Terjemahan,
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getOkBKK') {
            $tgl1 = $request->input('tgl_awalbkk');
            $tgl2 = $request->input('tgl_akhirbkk');
            // dd($tgl1, $tgl2);

            $results = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_LIST_BKK_NOTA_KREDIT_PERTGL ?, ?', [$tgl1, $tgl2]);
            // dd($results);

            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Tgl_Input' => \Carbon\Carbon::parse($row->Tgl_Input)->format('m/d/Y'),
                    'Id_BKK' => $row->Id_BKK,
                    'Nilai_Pembulatan' => number_format($row->Nilai_Pembulatan, 2, '.', ','),
                    'Terjemahan' => $row->Terjemahan ?? "",
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'cetakBKM') {
            $bkm = trim($request->input('bkm'));

            $sno = DB::connection('ConnAccounting')
                ->select("SELECT * FROM VW_PRG_5298_ACC_CETAK_BKM_NOTA_KREDIT WHERE Id_BKM = ?", [$bkm]);
            // dd($sno);

            DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_TGLCETAK_BKM] @idBKm = ?', [$bkm]);

            return response()->json([
                'data' => $sno,
                'message' => 'Laporan telah dicetak dengan sukses'
            ]);
        } else if ($id == 'getPembulatanBKM') {
            $results = DB::connection('ConnAccounting')->select('exec SP_5298_ACC_LIST_BKM_NOTA_KREDIT');
            // dd($results);
            $response = [];
            $j = 0;

            foreach ($results as $row) {
                $j++;
                $response[] = [
                    'Tgl_Input' => \Carbon\Carbon::parse($row->Tgl_Input)->format('m/d/Y'),
                    'Id_BKM' => $row->Id_BKM,
                    'Nilai_Pelunasan' => number_format($row->Nilai_Pelunasan, 2, '.', ','),
                    'Terjemahan' => $row->Terjemahan,
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getOkBKM') {
            $tgl1 = $request->input('tgl_awalbBKM');
            $tgl2 = $request->input('tgl_akhirbBKM');
            // dd($tgl1, $tgl2);

            $results = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_LIST_BKM_NOTA_KREDIT_PERTGL ?, ?', [$tgl1, $tgl2]);
            // dd($results);

            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Tgl_Input' => \Carbon\Carbon::parse($row->Tgl_Input)->format('m/d/Y'),
                    'Id_BKM' => $row->Id_BKM,
                    'Nilai_Pembulatan' => number_format($row->Nilai_Pembulatan, 2, '.', ','),
                    'Terjemahan' => $row->Terjemahan ?? "",
                ];
            }

            return datatables($response)->make(true);
        }
    }

    // Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request, $id)
    {



        if ($id === 'insertTLunas') {
            $user = Auth::user()->NomorUser;
            $idBKM = $request->input('idBKM');
            $tgl = $request->input('tgl');
            $terjemahan = $request->input('terjemahan');
            $nilai = $request->input('nilai');
            $IdBank = $request->input('IdBank');

            // dd($request->all());

            try {
                // insert pada T_Pelunasan
                DB::connection('ConnAccounting')
                    ->statement('exec [SP_5298_ACC_INSERT_BKM_TPELUNASAN]
                    @idBKM = ?,
                    @tglinput = ?,
                    @userinput = ?,
                    @terjemahan = ?,
                    @nilaipelunasan = ?,
                    @IdBank = ?,
                    @kode = 1', [
                        $idBKM,
                        $tgl,
                        $terjemahan,
                        $nilai,
                        $IdBank,
                        $user,
                    ]);

                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        } else if ($id === 'insertTLunasTagihan') {
            $user = Auth::user()->NomorUser;
            $idBKK = $request->input('idBKK');
            $idBKM = $request->input('idBKM');
            $tgl = $request->input('tgl');
            $IdBank = $request->input('IdBank');
            $noMtUang = $request->input('noMtUang');
            $nilai1 = $request->input('nilai1');
            $idCust = $request->input('idCust');
            $idBKK = $request->input('idBKK');
            $kursRupiah = $request->input('kursRupiah');

            // dd($request->all());

            try {
                // Insert into T_Pelunasan_Tagihan
                $data = [
                    'Id_BKM' => $idBKM,
                    'Tgl_Pelunasan' => $tgl,
                    'Id_Bank' => $IdBank,
                    'Id_MataUang' => $noMtUang,
                    'Id_Jenis_Bayar' => 1,
                    'Nilai_Pelunasan' => $nilai1,
                    'TglInput' => now(),
                    'UserInput' => $user,
                    'Id_BKK_Acuan' => $idBKK,
                    'Id_Cust' => $idCust,
                    'Status_Penagihan' => "Y",
                ];

                // Check if kurs value is greater than 0 and set it if true
                if ($kursRupiah > 0) {
                    $data['Kurs_RPH'] = $kursRupiah;
                }

                // Insert into T_Pelunasan_Tagihan and retrieve the inserted ID
                $insertedId = DB::connection('ConnAccounting')->table('T_Pelunasan_Tagihan')->insertGetId($data);

                // Retrieve the maximum Id_Pelunasan
                $maxIdPelunasan = DB::connection('ConnAccounting')->table('T_Pelunasan_Tagihan')
                    ->max('Id_Pelunasan');

                return response()->json(['id_pelunasan' => $maxIdPelunasan], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        } else if ($id === 'insertTDetilLunasTagihan') {
            $user = Auth::user()->NomorUser;
            $idBKK = $request->input('idBKK');
            $idBKM = $request->input('idBKM');
            $tgl = $request->input('tgl');
            $IdBank = $request->input('IdBank');
            $noMtUang = $request->input('noMtUang');
            $nilai1 = $request->input('nilai1');
            $idCust = $request->input('idCust');
            $idBKK = $request->input('idBKK');

            // dd($request->all());

            try {
                // insert pada T_Detail_Pelunasan_Tagihan

                DB::connection('ConnAccounting')
                    ->statement('exec [SP_5298_ACC_INSERT_BKM_TDETAILPEL]
                @idBKM = ?,
                @tgl = ?,
                @idUang = ?,
                @idJenis = ?,
                @idBank = ?,
                @nilaipelunasan = ?,
                @user = ?,
                @idCust = ?,
                @idBKKAcuan = ?,
                @status = ?', [
                        $idBKM,
                        $tgl,
                        $noMtUang,
                        1,
                        $IdBank,
                        $nilai1,
                        $user,
                        $idCust,
                        $idBKK,
                        "Y"
                    ]);

                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }


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
