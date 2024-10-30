<?php

namespace App\Http\Controllers\Accounting\Piutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;


class MaintenanceBKMPenagihanController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Piutang.MaintenanceBKMPenagihan', compact('access'));
    }

    public function getTabelDetailPelunasan($idPelunasan)
    {
        //dd($bulan, $tahun);
        $tabel = DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_DETAIL_PELUNASAN] @idPelunasan = ?', [$idPelunasan]);
        return response()->json($tabel);
    }

    public function getTabelKurangLebih($idPelunasan)
    {
        $tabel = DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_DETAIL_KRGLBH] @idPelunasan = ?', [$idPelunasan]);
        return response()->json($tabel);
    }

    public function getTabelTampilBKMPenagihan($tanggalInputTampil, $tanggalInputTampil2)
    {
        $tabel = DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_BKM_TAGIH_PERTGL] @tgl1 = ?, @tgl2 = ?', [$tanggalInputTampil, $tanggalInputTampil2]);
        return response()->json($tabel);
    }

    public function getTabelBiaya($idPelunasan)
    {

        $tabel = DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_DETAIL_BIAYA] @idPelunasan = ?', [$idPelunasan]);
        return response()->json($tabel);
    }

    function getKodePerkiraan()
    {
        $kode = DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_KODE_PERKIRAAN] @Kode = ?', [1]);
        return response()->json($kode);
    }

    function cekNoPelunasanBKMPenagihan($idPelunasan, $idCustomer)
    {
        $kode = DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_CEK_NO_PELUNASAN]
        @idpelunasan = ?,
        @idcust = ?',
            [
                $idPelunasan,
                $idCustomer
            ]
        );
        return response()->json($kode);
    }


    public function cekJumlahRincianBKMPenagihan($idPelunasan)
    {
        $kode = DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_CEK_JML_RINCIAN]
        @idpelunasan = ?',
            [
                $idPelunasan
            ]
        );
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
        $kode = DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_GET_IDPENAGIHAN_PIUTANG]
        @idpelunasan = ?',
            [
                $idPelunasan
            ]
        );
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
        $bulan = (int) $bulan;
        $tahun = (int) $tahun;
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
    public function show($id, Request $request)
    {
        if ($id == 'cekPelunasan') {
            $bulan = $request->input('bulan');
            $tahun = $request->input('tahun');

            if (empty($bulan) || empty($tahun)) {
                return response()->json([
                    'error' => 'Isi Dulu Bulan & Tahun!!'
                ]);
            }

            // Calculate `bln` and `thn`
            if ((int) $bulan == 1) {
                $bln = 12;
                $thn = (int) $tahun - 1;
            } else {
                $bln = (int) $bulan - 1;
                $thn = (int) $tahun;
            }

            // Execute the stored procedure
            $results = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_CEK_PELUNASAN @bln = ?, @thn = ?', [$bln, $thn]);
            // dd($results);
            // Check if 'ada' field in the result is greater than 0
            if (count($results) > 0 && $results[0]->ada > 0) {
                return response()->json([
                    'error' => "TIDAK BOLEH CREATE BKM U/ BLN INI!!!\nCREATE BKM U/ BLN SBLMNYA DULU. SAMPAI TUNTAS... KHUSUS TUNAI & TRANSFER"
                ], 400);
            } else {
                return response()->json([
                    'message' => "Tampil Pelunasan"
                ]);
            }
        } else if ($id == 'getPelunasan') {
            // dd($request->all());
            $bulan = $request->input('bulan');
            $tahun = $request->input('tahun');

            if (empty($bulan) || empty($tahun)) {
                return response()->json(['error' => 'Isi Dulu Bulan & Tahun!!']);
            }

            // Main Pelunasan list query
            $pelunasanResults = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_LIST_PELUNASAN_TAGIHAN @bln = ?, @thn = ?', [$bulan, $tahun]);
            // dd($pelunasanResults);
            $pelunasanList = [];
            $j = 0;

            foreach ($pelunasanResults as $pelunasan) {
                $j++;
                $biaya = 0;
                $krglbh = 0;

                // Get `biaya` using SP_5298_ACC_CEK_BIAYA if 'ada' > 0
                $biayaResults = DB::connection('ConnAccounting')
                    ->select('exec SP_5298_ACC_CEK_BIAYA @idPelunasan = ?', [$pelunasan->Id_Pelunasan]);

                if (isset($biayaResults[0]) && $biayaResults[0]->ada > 0) {
                    $biayaItems = DB::connection('ConnAccounting')
                        ->select('exec SP_5298_ACC_CEK_BIAYA_1 @idPelunasan = ?', [$pelunasan->Id_Pelunasan]);

                    foreach ($biayaItems as $item) {
                        $biaya += $item->Biaya;
                    }
                }

                // Get `krglbh` using SP_5298_ACC_CEK_KRGLBH if 'ada' > 0
                $krglbhResults = DB::connection('ConnAccounting')
                    ->select('exec SP_5298_ACC_CEK_KRGLBH @idPelunasan = ?', [$pelunasan->Id_Pelunasan]);

                if (isset($krglbhResults[0]) && $krglbhResults[0]->ada > 0) {
                    $krglbhItems = DB::connection('ConnAccounting')
                        ->select('exec SP_5298_ACC_CEK_KRGLBH_1 @idPelunasan = ?', [$pelunasan->Id_Pelunasan]);

                    foreach ($krglbhItems as $item) {
                        $krglbh += $item->KurangLebih;
                    }
                }

                // Calculate final `nilai` for each pelunasan entry
                $nilai = (float) $pelunasan->Nilai_Pelunasan - $biaya + $krglbh;

                $pelunasanList[] = [
                    'Tgl_Pelunasan' => \Carbon\Carbon::parse($pelunasan->Tgl_Pelunasan)->format('m/d/Y'),
                    'Id_Pelunasan' => $pelunasan->Id_Pelunasan,
                    'Id_Bank' => $pelunasan->Id_Bank ?? '',
                    'Jenis_Pembayaran' => $pelunasan->Jenis_Pembayaran,
                    'Nama_MataUang' => $pelunasan->Nama_MataUang,
                    'Nilai' => number_format($nilai, 2, '.', ','),
                    'No_Bukti' => $pelunasan->No_Bukti ?? '',
                    'ID_Cust' => $pelunasan->ID_Cust,
                    'Id_Jenis_Bayar' => $pelunasan->Id_Jenis_Bayar,
                ];
            }

            if ($j == 0) {
                return response()->json(['error' => 'Tidak Ada Pelunasan']);
            }

            return response()->json($pelunasanList);

        } else if ($id == 'getDetailPelunasan') {
            $idPelunasan = $request->input('idPelunasan');

            $pelunasanDetails = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_DETAIL_PELUNASAN @idPelunasan = ?', [$idPelunasan]);
            // dd($pelunasanDetails);
            $listPelunasan = [];
            $j = 0;
            foreach ($pelunasanDetails as $pelunasan) {
                $j++;
                $listPelunasan[] = [
                    'ID_Penagihan' => $pelunasan->ID_Penagihan,
                    'Nilai_Pelunasan' => number_format($pelunasan->Nilai_Pelunasan, 2, '.', ','),
                    'Pelunasan_Rupiah' => number_format($pelunasan->Pelunasan_Rupiah, 2, '.', ','),
                    'Kode_Perkiraan' => $pelunasan->Kode_Perkiraan ?? '0.00.00',
                    'NamaCust' => $pelunasan->NamaCust,
                    'ID_Detail_Pelunasan' => $pelunasan->ID_Detail_Pelunasan,
                    'Tgl_Penagihan' => \Carbon\Carbon::parse($pelunasan->Tgl_Penagihan)->format('m/d/Y'),
                ];
            }

            return datatables($listPelunasan)->make(true);

        } else if ($id == 'getDetailBiaya') {
            $idPelunasan = $request->input('idPelunasan');

            $biayaDetails = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_DETAIL_BIAYA @idPelunasan = ?', [$idPelunasan]);
            // dd($biayaDetails);
            $listBiaya = [];
            $k = 0;
            foreach ($biayaDetails as $biaya) {
                if ($biaya->Biaya != 0) {
                    $k++;
                    $listBiaya[] = [
                        'Keterangan' => $biaya->Keterangan ?? '',
                        'Biaya' => number_format($biaya->Biaya, 2, '.', ','),
                        'Kode_Perkiraan' => $biaya->Kode_Perkiraan ?? '0.00.00',
                        'Id_Detail_Pelunasan' => $biaya->Id_Detail_Pelunasan,
                    ];
                }
            }

            return datatables($listBiaya)->make(true);

        } else if ($id == 'getDetailKrgLbh') {
            $idPelunasan = $request->input('idPelunasan');

            $krglbhDetails = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_DETAIL_KRGLBH @idPelunasan = ?', [$idPelunasan]);
            // dd($krglbhDetails);
            $listKrgLbh = [];
            $l = 0;
            foreach ($krglbhDetails as $krglbh) {
                if ($krglbh->KurangLebih != 0) {
                    $l++;
                    $listKrgLbh[] = [
                        'Keterangan' => $krglbh->Keterangan ?? '',
                        'KurangLebih' => number_format($krglbh->KurangLebih, 2, '.', ','),
                        'Kode_Perkiraan' => $krglbh->Kode_Perkiraan ?? '0.00.00',
                        'Id_Detail_Pelunasan' => $krglbh->Id_Detail_Pelunasan,
                    ];
                }
            }

            return datatables($listKrgLbh)->make(true);

        } else if ($id == 'getBank') {
            // Eksekusi prosedur tersimpan SP_5298_ACC_LIST_BANK untuk mengambil data bank
            $banks = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_LIST_BANK');
            // dd($banks);
            // Respons pertama dari stored procedure untuk `TBank` dan `TNamaBank`
            $response = [];
            foreach ($banks as $bank) {
                $response[] = [
                    'Id_Bank' => $bank->Id_Bank,
                    'Nama_Bank' => $bank->Nama_Bank,
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getBankDetails') {
            $bankId = $request->input('idBankM');
            // Eksekusi prosedur tersimpan SP_5298_ACC_LIST_BANK untuk mengambil data bank
            $bankDetails = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_LIST_BANK_1 ?', [$bankId]);
            // dd($bankDetails);
            // Respons pertama dari stored procedure untuk `TBank` dan `TNamaBank`
            $response = [];
            foreach ($bankDetails as $bank) {
                $response[] = [
                    'Id_Bank' => $bank->jenis,
                ];
            }

            return response()->json($response);
        } else if ($id == 'getBankAda') {
            $idBank = $request->input('idBankM');

            $results = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_LIST_BANK_2 ?', [trim($idBank)]);
            // dd($results);
            $bankDetails = [];
            foreach ($results as $row) {
                $bankDetails = [
                    'jenis' => trim($row->jenis),
                    'Nama' => trim($row->Nama),
                ];
            }
            return response()->json($bankDetails);

        } else if ($id == 'getPerkiraanDetails') {
            $idPerkiraan = $request->input('id_perkiraanMP');

            $results = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_LIST_KODE_PERKIRAAN ?, ?', [2, trim($idPerkiraan)]);
            // dd($results);
            $perkiraanDetails = [];
            foreach ($results as $row) {
                $perkiraanDetails = [
                    'Keterangan' => trim($row->Keterangan),
                ];
            }
            return response()->json($perkiraanDetails);

        } else if ($id == 'getKodePerkiraan') {
            // Menjalankan prosedur `SP_5298_ACC_LIST_KODE_PERKIRAAN` dengan parameter Kode = 1
            $results = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_LIST_KODE_PERKIRAAN ?', [1]);

            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'NoKodePerkiraan' => $row->NoKodePerkiraan,
                    'Keterangan' => $row->Keterangan,
                ];
            }

            return datatables($response)->make(true);

        } else if ($id == 'updateDetailPelunasan') {
            // Memastikan `iddetail` dan `kode` diterima dalam request
            $iddetail = (int) $request->input('ID_Detail_Pelunasan');
            $kode = $request->input('id_perkiraanMP');
            // dd($iddetail, $kode);

            if ($iddetail && $kode) {
                // Menjalankan prosedur `SP_5298_ACC_UPDATE_DETAIL_PELUNASAN`
                DB::connection('ConnAccounting')->statement('exec SP_5298_ACC_UPDATE_DETAIL_PELUNASAN @iddetail = ?, @kode = ?', [
                    $iddetail,
                    $kode,
                ]);

                // Respons sukses
                return response()->json(['message' => 'Detail sudah terkoreksi']);
            } else {
                // Jika parameter tidak valid
                return response()->json(['error' => 'Parameter tidak valid']);
            }
        } else if ($id == 'updateDetailBiaya') {
            // Retrieve parameters from request
            $iddetail = $request->input('ID_Detail_Pelunasan');
            $keterangan = $request->input('keterangan_MBia');
            $kode = $request->input('id_perkiraanMBia');

            // Execute stored procedure with parameters
            DB::connection('ConnAccounting')->statement('exec SP_5298_ACC_UPDATE_DETAIL_BIAYA @iddetail = ?, @keterangan = ?, @kode = ?', [
                $iddetail,
                $keterangan,
                $kode
            ]);

            // Update ListBiaya in the response or session data as needed
            $response = [
                'message' => 'Detail Sudah TerKoreksi',
                'uraian' => $keterangan,
                'idPerkiraan' => $kode
            ];

            return response()->json($response);

        } else if ($id == 'updateDetailKrgLbh') {
            // Retrieve parameters from request
            $iddetail = $request->input('id_detailMK');
            $keterangan = $request->input('keterangan_MK');
            $kode = $request->input('id_perkiraanMK');

            // Execute stored procedure with parameters
            DB::connection('ConnAccounting')->statement('exec SP_5298_ACC_UPDATE_DETAIL_KRGLBH @iddetail = ?, @keterangan = ?, @kode = ?', [
                $iddetail,
                $keterangan,
                $kode
            ]);

            // Respond with success message
            $response = [
                'message' => 'Detail Sudah TerKoreksi',
                'uraian' => $keterangan,
                'idPerkiraan' => $kode
            ];

            return response()->json($response);

        } else if ($id == 'getBKMTagih') {
            // Execute the stored procedure to fetch BKM Tagih records
            $results = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_LIST_BKM_TAGIH');
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Tgl_Input' => \Carbon\Carbon::parse($row->Tgl_Input)->format('m/d/Y'),
                    'Id_BKM' => $row->Id_BKM,
                    'Nilai_Pelunasan' => number_format($row->Nilai_Pelunasan, 2, '.', ','),
                    'Terjemahan' => $row->Terjemahan,
                ];
            }

            return datatables($response)->make(true);

        } else if ($id == 'getBKMTagihByDate') {
            // Retrieve date parameters from the request
            $tgl1 = $request->input('tgl_awalbkk');
            $tgl2 = $request->input('tgl_akhirbkk');

            // Execute the stored procedure with date parameters
            $results = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_LIST_BKM_TAGIH_PERTGL @tgl1 = ?, @tgl2 = ?', [$tgl1, $tgl2]);

            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Tgl_Input' => \Carbon\Carbon::parse($row->Tgl_Input)->format('m/d/Y'),
                    'Id_BKM' => $row->Id_BKM,
                    'Nilai_Pelunasan' => number_format($row->Nilai_Pelunasan, 2, '.', ','),
                    'Terjemahan' => $row->Terjemahan,
                ];
            }

            return response()->json($response);

        } else if ($id == 'cetakBKM') {
            // dd($request->all());
            $selectedIdBKM = $request->input('bkm');
            $jml = (float) $request->input('Nilai_Pelunasan');

            // Retrieve the total `Pelunasan` amount using stored procedure
            $results = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_JML_PELUNASAN @IdBKM = ?', [trim($selectedIdBKM)]);
            // dd($results);
            $pelunasan = !empty($results) ? (float) $results[0]->Pelunasan : 0;

            // Compare jml to pelunasan and set status
            $status = ($jml !== $pelunasan) ? '1' : '2';

            // Define criteria for the report selection
            $sno = "WHERE Id_BKM = '" . trim($selectedIdBKM) . "'";
            $reportType = 3; // Specific report type in the VB code

            // Fetch the report data
            $reportData = DB::connection('ConnAccounting')
                ->select("SELECT * FROM VW_PRG_5298_ACC_CETAK_BKM_TAGIH $sno");
            // dd($reportData);
            // Update the print date
            DB::connection('ConnAccounting')
                ->statement('exec SP_5298_ACC_UPDATE_TGLCETAK_BKM @idBKM = ?', [trim($selectedIdBKM)]);

            return response()->json([
                'data' => $reportData,
                'status' => $status,
                'message' => 'Laporan telah dicetak dengan sukses',
                'reportType' => $reportType
            ]);

        } else {
            return response()->json(['message' => 'ID tidak valid!']);
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
        $proses = $request->all();
        //dd("masuk");
        // if ($proses['detpelunasan'] == "datpelunasan") {
        //     $idBank = $request->idBank;
        //     DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_LIST_BANK_1]
        //     @idBank = ?', [$idBank]);
        //     return redirect()->back()->with('success', 'Data sudah diKOREKSI');

        // } else if ($proses['detpelunasan'] == "detpelunasan") {
        //     //dd("masuk else if");
        //     $idDetail = $request->iddetail;
        //     $kode = $request->idKodePerkiraan;
        //     DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_DETAIL_PELUNASAN] @iddetail = ?, @kode = ?', [
        //         $idDetail,
        //         $kode
        //     ]);
        //     return redirect()->back()->with('success', 'Detail Sudah Terkoreksi');

        // } else if ($proses['detpelunasan'] == "detkuranglebih") {
        //     //dd($request->all());
        //     $idcoba = $request->idcoba;
        //     $kode = $request->idKodePerkiraanKrgLbh;
        //     $keterangan = $request->keterangan;
        //     DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_DETAIL_KRGLBH] @iddetail = ?, @keterangan = ?, @kode = ?', [
        //         $idcoba,
        //         $keterangan,
        //         $kode
        //     ]);
        //     return redirect()->back()->with('success', 'Detail Sudah Terkoreksi');
        // } else if ($proses['detpelunasan'] == "detbiaya") {
        //     //dd($request->all());
        //     $idDetailBiaya = $request->idDetailBiaya;
        //     $kode = $request->idKodePerkiraanBiaya;
        //     $keterangan = $request->keteranganBiaya;
        //     DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_DETAIL_BIAYA] @iddetail = ?, @keterangan = ?, @kode = ?', [
        //         $idDetailBiaya,
        //         $keterangan,
        //         $kode
        //     ]);
        //     return redirect()->back()->with('success', 'Detail Sudah Terkoreksi');
        // }
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
