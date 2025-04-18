<?php

namespace App\Http\Controllers\Accounting\Informasi;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;


class SoplangController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Informasi.Soplang', compact('access'));
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
        $tglAkhir = $request->input('tglAkhir');
        $date = Carbon::parse($tglAkhir);

        if ($id === 'lihat') {
            $results = DB::connection('ConnAccounting')->select('exec [SP_PROSES_SALDOPIUTANG2] @TglAkhir = ?', [$date]);

            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Id_Customer'      => $row->Id_Customer,    // Map @idcust
                    'NamaCust'         => $row->NamaCust,       // Map @NamaCust
                    'Id_Penagihan'     => $row->Id_Penagihan,   // Map @IdPenagihan
                    'Tgl_Penagihan'    => $row->Tgl_Penagihan,  // Map @TglPenagihan
                    'Nama_MataUang'    => $row->Nama_MataUang,  // Map @Nama_MataUang
                    'NilaiKurs'        => $row->NilaiKurs,      // Map @NilaiKurs
                    'Nilai_Penagihan'  => $row->Nilai_Penagihan, // Map @Nilai_Penagihan
                    'Dokumen'          => $row->Nama_Dokumen,   // Map @Dokumen
                    'Id_Detail_Pelunasan' => $row->Id_Detail_Pelunasan,  // Map @IdDetail
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
        $tglAkhirLaporan = $request->input('tglAkhirLaporan');
        $date = Carbon::parse($tglAkhirLaporan);
        $bln = $date->format('m');
        $thn = $date->format('Y');
        $periode = $bln . $thn;

        // dd($request->all(), $bln, $thn, $periode, $date);

        if ($id === 'proses1') {
            $results = DB::connection('ConnAccounting')->select('exec [SP_PROSES_SALDOPIUTANG2] @TglAkhir = ?', [$date]);

            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Id_Customer'      => $row->Id_Customer,    // Map @idcust
                    'NamaCust'         => $row->NamaCust,       // Map @NamaCust
                    'Id_Penagihan'     => $row->Id_Penagihan,   // Map @IdPenagihan
                    'Tgl_Penagihan'    => $row->Tgl_Penagihan,  // Map @TglPenagihan
                    'Nama_MataUang'    => $row->Nama_MataUang,  // Map @Nama_MataUang
                    'NilaiKurs'        => $row->NilaiKurs,      // Map @NilaiKurs
                    'Nilai_Penagihan'  => $row->Nilai_Penagihan, // Map @Nilai_Penagihan
                    'Dokumen'          => $row->Dokumen,   // Map @Dokumen
                    'Id_Detail_Pelunasan' => $row->Id_Detail_Pelunasan,  // Map @IdDetail
                ];
            }

            dd($response);

            $sw = 0;

            foreach ($response as $detail) {
                $sw++;

                $pelunasanData = DB::connection('ConnAccounting')->select(
                    'SELECT Pelunasan_Curency, Sisa_Nilai_Tagihan, Id_BKM, TglCair, Id_Pelunasan
                    FROM dbo.vw_prg_t_detail_pelunasan_tagihan1
                    WHERE ID_Detail_Pelunasan = ?',
                    [$response[0]['Id_Detail_Pelunasan']]
                );
                dd($pelunasanData);
            }
        }


        if ($id === 'proses2') {
            try {
                DB::connection('ConnAccounting')->table('T_Saldo_Piutang')->delete();

                $penagihanRecords = DB::connection('ConnAccounting')->select(
                    'SELECT Id_Customer, NamaCust, Id_Penagihan, Tgl_Penagihan, Nama_MataUang, NilaiKurs, Nilai_Penagihan, Nama_Dokumen
                    FROM dbo.vw_prg_Penagihan_SJ
                    WHERE ((MONTH(Tgl_lunas) = ?) AND (YEAR(Tgl_lunas) = ?)
                    OR (Lunas = \'N\' AND Tgl_Penagihan <= ?)
                    OR (Lunas = \'Y\' AND Tgl_Penagihan <= ? AND Tgl_Lunas > ?))
                    ORDER BY NamaCust, Tgl_Penagihan',
                    [$bln, $thn, $date, $date, $date]
                );

                // dd($penagihanRecords);

                foreach ($penagihanRecords as $penagihan) {
                    // Initialize variables for each record
                    $idCust = trim($penagihan->Id_Customer);
                    $namaCust = trim($penagihan->NamaCust);
                    $idPenagihan = trim($penagihan->Id_Penagihan);
                    $tglPenagihan = trim($penagihan->Tgl_Penagihan);
                    $namaMataUang = trim($penagihan->Nama_MataUang);
                    $nilaiKurs = trim($penagihan->NilaiKurs);
                    $nilaiPenagihan = trim($penagihan->Nilai_Penagihan);
                    $dokumen = trim($penagihan->Nama_Dokumen);

                    // dd($idPenagihan);


                    // Check if $syarat is not empty
                    $syarat = DB::connection('ConnSales')->select(
                        'SELECT SyaratBayar
                        FROM dbo.vw_prg_penagihan
                        WHERE idPenagihan = ?',
                        [$idPenagihan]
                    );


                    if (empty($syarat)) {
                        continue;
                    } else {
                        // dd($syarat, $idPenagihan);

                        // Extract the SyaratBayar value from the first result
                        $syaratValue = $syarat[0]->SyaratBayar;

                        // Use $syaratValue in the next query
                        $jatuhTempo = DB::connection('ConnAccounting')->select(
                            'SELECT CONVERT(datetime, DATEADD(day, CAST(? AS int), ?), 101) AS JatuhTempo',
                            [$syaratValue, $tglPenagihan]
                        );


                        // Fetch related details for the inner cursor logic
                        $detailRecords = DB::connection('ConnAccounting')->select(
                            'SELECT ID_Detail_Pelunasan
                            FROM VW_PRG_1486_ACC_BAYAR_TAGIHAN
                            WHERE (Bulan = ?) AND (Tahun = ?) AND (ID_Penagihan = ?)
                            ORDER BY ID_Detail_Pelunasan',
                            [$bln, $thn, $idPenagihan]
                        );


                        // dd($detailRecords, $idPenagihan);

                        if (empty($detailRecords)) {
                            dd('ggagal');
                            // continue;
                        } else {
                            $detailRecordsValue = $detailRecords[0]->ID_Detail_Pelunasan;
                            dd($detailRecordsValue);

                            $sw = 0;

                            foreach ($detailRecordsValue as $detail) {
                                $sw++;
                                Log::info("Processing DetailRecord: ID_Detail_Pelunasan = $detail->ID_Detail_Pelunasan, SW = $sw");

                                $pelunasanData = DB::connection('ConnAccounting')->select(
                                    'SELECT Pelunasan_Curency, Sisa_Nilai_Tagihan, Id_BKM, TglCair, Id_Pelunasan
                                    FROM dbo.vw_prg_t_detail_pelunasan_tagihan1
                                    WHERE ID_Detail_Pelunasan = ?',
                                    [$detailRecords]
                                );
                                dd($pelunasanData);

                                $pelunasan = $pelunasanData[0]->Pelunasan_Curency;
                                $sisa = $pelunasanData[0]->Sisa_Nilai_Tagihan;
                                $idBKM = $pelunasanData[0]->Id_BKM;
                                $tglCair = $pelunasanData[0]->TglCair;
                                $idPelunasan = $pelunasanData[0]->Id_Pelunasan;

                                $bayarData = DB::connection('ConnAccounting')->select(
                                    'SELECT Id_Jenis_Bayar, No_Bukti, Tgl_Pelunasan
                                    FROM dbo.vw_prg_t_pelunasan_tagihan
                                    WHERE Id_Pelunasan = ?',
                                    [$idPelunasan]
                                );

                                $idBayar = $bayarData[0]->Id_Jenis_Bayar;
                                $noBukti = $bayarData[0]->No_Bukti;
                                $tglPelunasan = $bayarData[0]->Tgl_Pelunasan;


                                // Log conditions for further debugging
                                if (($idBayar === 1 || $idBayar === 4) && (date('Y', strtotime($tglCair)) === $thn && date('m', strtotime($tglCair)) === $bln)) {
                                    $tunai = $pelunasan;
                                } else {
                                    if (($idBayar === 2 || $idBayar === 3) && (date('Y', strtotime($tglCair)) === $thn && date('m', strtotime($tglCair)) === $bln)) {
                                        $bgCair = $pelunasan;
                                    } else {
                                        $bgMundur = $pelunasan;
                                        $tglCair = null;
                                        $idBkm = null;
                                    }
                                }

                                if ($namaMataUang !== 'RUPIAH') {
                                    $sisa /= $nilaiKurs;
                                }

                                // cek saldo penagihan
                                if ($sisa >= 0) {
                                    $saldoPenagihan = $sisa + $pelunasan;
                                } else {
                                    $saldoPenagihan = $nilaiPenagihan;
                                }

                                // jika dibyr lbh dr satu
                                if ($sw > 1) {
                                    $nilaiPenagihan = 0;
                                }

                                // Insertion logs
                                DB::connection('ConnAccounting')->table('T_SALDO_PIUTANG')->insert([
                                    'Periode' => $periode,
                                    'Customer' => $namaCust,
                                    'Dokumen' => $dokumen,
                                    'IdPenagihan' => $idPenagihan,
                                    'TglPenagihan' => $tglPenagihan,
                                    'Syarat' => $syarat,
                                    'JatuhTempo' => $jatuhTempo,
                                    'MataUang' => $namaMataUang,
                                    'NilaiPenagihan' => $nilaiPenagihan,
                                    'TglCair' => $tglCair,
                                    'Tunai' => $tunai,
                                    'BGCair' => $bgCair,
                                    'BGMundur' => $bgMundur,
                                    'BClaim' => null,
                                    'Pembulatan' => null,
                                    'NilaiSisa' => $sisa,
                                    'IDBKM' => $idBKM,
                                    'TglPelunasan' => $tglPelunasan,
                                    'SaldoPenagihan' => $saldoPenagihan,
                                    'NilaiKurs' => $nilaiKurs,
                                    'Id_Customer' => $idCust,
                                ]);

                                Log::info("Inserted record into T_SALDO_PIUTANG for IdPenagihan");

                                // Jika Inv. Dibyr Lbh Dr Satu
                                if ($sw > 1) {
                                    $results = DB::connection('ConnAccounting')->select(
                                        'SELECT Id
                                        FROM dbo.T_SALDO_PIUTANG
                                        WHERE IdPenagihan = ?',
                                        [$idPenagihan]
                                    );


                                    foreach ($results as $row) {
                                        $id = $row->Id;

                                        // Update SaldoPenagihan
                                        DB::connection('ConnAccounting')->update(
                                            'UPDATE T_SALDO_PIUTANG
                                            SET SaldoPenagihan = ISNULL(Tunai, 0) + ISNULL(BGCair, 0)
                                            WHERE Id = ?',
                                            [$id]
                                        );
                                        Log::info("update record into T_SALDO_PIUTANG for SaldoPenagihan");


                                        // Update NilaiSisa
                                        DB::connection('ConnAccounting')->update(
                                            'UPDATE T_SALDO_PIUTANG
                                            SET NilaiSisa = SaldoPenagihan - (ISNULL(Tunai, 0) + ISNULL(BGCair, 0))
                                            WHERE Id = ?',
                                            [$id]
                                        );
                                        Log::info("update record into T_SALDO_PIUTANG for NilaiSisa");
                                    }

                                    if ($sisa > 0) {
                                        DB::connection('ConnAccounting')->table('T_SALDO_PIUTANG')->insert([
                                            'Periode' => $periode,
                                            'Customer' => $namaCust,
                                            'Dokumen' => $dokumen,
                                            'IdPenagihan' => $idPenagihan,
                                            'TglPenagihan' => $tglPenagihan,
                                            'Syarat' => $syarat,
                                            'JatuhTempo' => $jatuhTempo,
                                            'MataUang' => $namaMataUang,
                                            'NilaiPenagihan' => 0,
                                            'TglCair' => null,
                                            'Tunai' => 0,
                                            'BGCair' => 0,
                                            'BGMundur' => 0,
                                            'BClaim' => null,
                                            'Pembulatan' => null,
                                            'NilaiSisa' => $sisa,
                                            'IDBKM' => null,
                                            'TglPelunasan' => $tglPelunasan,
                                            'SaldoPenagihan' => $sisa,
                                            'NilaiKurs' => $nilaiKurs,
                                            'Id_Customer' => $idCust
                                        ]);
                                    }
                                    Log::info("Inserted record into T_SALDO_PIUTANG for periode: $periode");
                                }

                                // untuk yg tidak ada pelunasan
                                if ($sw == 0) {
                                    $sisa = DB::connection('ConnAccounting')->selectOne(
                                        'SELECT MIN(dbo.T_DETAIL_PELUNASAN_TAGIHAN.Sisa_Nilai_Tagihan) AS Sisa
                                        FROM dbo.T_DETAIL_PELUNASAN_TAGIHAN
                                        INNER JOIN dbo.T_PELUNASAN_TAGIHAN ON dbo.T_DETAIL_PELUNASAN_TAGIHAN.ID_Pelunasan = dbo.T_PELUNASAN_TAGIHAN.Id_Pelunasan
                                        INNER JOIN dbo.T_PELUNASAN ON dbo.T_PELUNASAN_TAGIHAN.Id_BKM = dbo.T_PELUNASAN.Id_BKM
                                        WHERE dbo.T_DETAIL_PELUNASAN_TAGIHAN.ID_Penagihan = ?
                                        AND dbo.T_PELUNASAN.Tgl_Input < ?',
                                        [$idPenagihan, $tglAkhir]
                                    )->Sisa;

                                    // Adjust for currency
                                    if (trim($namaMataUang) !== 'RUPIAH') {
                                        $sisa = $sisa / $nilaiKurs;
                                    }

                                    // cek saldo penagihan
                                    if ($sisa >= 0) {
                                        $saldoPenagihan = $sisa;
                                    } else {
                                        $saldoPenagihan = $nilaiPenagihan;
                                    }

                                    DB::connection('ConnAccounting')->table('T_SALDO_PIUTANG')->insert([
                                        'Periode' => $periode,
                                        'Customer' => $namaCust,
                                        'Dokumen' => $dokumen,
                                        'IdPenagihan' => $idPenagihan,
                                        'TglPenagihan' => $tglPenagihan,
                                        'Syarat' => $syarat,
                                        'JatuhTempo' => $jatuhTempo,
                                        'MataUang' => $namaMataUang,
                                        'NilaiPenagihan' => $nilaiPenagihan,
                                        'TglCair' => $tglCair,
                                        'Tunai' => $tunai,
                                        'BGCair' => $bgCair,
                                        'BGMundur' => $bgMundur,
                                        'BClaim' => null,
                                        'Pembulatan' => null,
                                        'NilaiSisa' => $saldoPenagihan,
                                        'IDBKM' => $idBKM,
                                        'TglPelunasan' => $tglPelunasan,
                                        'SaldoPenagihan' => $saldoPenagihan,
                                        'NilaiKurs' => $nilaiKurs,
                                        'Id_Customer' => $idCust
                                    ]);
                                }

                                // cek nota retur/pot/klaim
                                $pembulatan = DB::connection('ConnAccounting')->selectOne(
                                    'SELECT SUM(KurangLebih) AS Pembulatan
                                    FROM dbo.VW_PRG_1486_ACC_PEMBULATAN_KRG
                                    WHERE ID_Penagihan_Pembulatan = ? AND Bulan = ? AND Tahun = ?',
                                    [$idPenagihan, $bln, $thn]
                                )->Pembulatan;

                                $retur = DB::connection('ConnAccounting')->selectOne(
                                    'SELECT SUM(Pelunasan_Curency) AS Retur
                                    FROM dbo.VW_PRG_1486_ACC_BAYAR_NOTA_KREDIT
                                    WHERE ID_Penagihan = ? AND Bulan = ? AND Tahun = ? AND JnsNotaKredit = 1',
                                    [$idPenagihan, $bln, $thn]
                                )->Retur;

                                $pot = DB::connection('ConnAccounting')->selectOne(
                                    'SELECT SUM(Pelunasan_Curency) AS Pot
                                    FROM dbo.VW_PRG_1486_ACC_BAYAR_NOTA_KREDIT
                                    WHERE ID_Penagihan = ? AND Bulan = ? AND Tahun = ? AND JnsNotaKredit = 2',
                                    [$idPenagihan, $bln, $thn]
                                )->Pot;

                                // update ke tabel T_SALDO_PIUTANG
                                $IDS = DB::connection('ConnAccounting')->table('T_SALDO_PIUTANG')
                                    ->where('IdPenagihan', $idPenagihan)
                                    ->orderBy('Id', 'DESC')
                                    ->value('Id');

                                DB::connection('ConnAccounting')->table('T_SALDO_PIUTANG')->where('ID', $id)->update([
                                    'Retur' => $retur,
                                    'Pembulatan' => $pembulatan,
                                    'BCLaim' => $pot,
                                    'NilaiSisa' => DB::raw('NilaiSisa - (COALESCE(' . $retur . ', 0) + COALESCE(' . $pembulatan . ', 0) + COALESCE(' . $pot . ', 0))')
                                ]);


                                // Handle additional logic for rounding or returns/claims when no settlement exists
                                if ($pembulatan > 0 && $sw === 0) {
                                    $result = DB::connection('ConnAccounting')->table('VW_PRG_1486_ACC_PEMBULATAN_KRG')
                                        ->select('Tgl_Input', 'Id_BKM')
                                        ->where('ID_Penagihan_Pembulatan', $idPenagihan)
                                        ->where('Bulan', $bln)
                                        ->where('Tahun', $thn)
                                        ->first();

                                    if ($result) {
                                        $tglPelunasan = $result->Tgl_Input;
                                        $idBKM = $result->Id_BKM;

                                        DB::connection('ConnAccounting')->table('T_SALDO_PIUTANG')->where('ID', $id)->update([
                                            'IDBKM' => $idBKM,
                                            'TglPelunasan' => $tglPelunasan
                                        ]);
                                    }
                                }


                                if (($pot > 0 || $retur > 0) && $sw === 0) {
                                    $result = DB::connection('ConnAccounting')->table('VW_PRG_1486_ACC_BAYAR_NOTA_KREDIT')
                                        ->select('Tgl_Input', 'Id_BKM')
                                        ->where('ID_Penagihan', $idPenagihan)
                                        ->where('Bulan', $bln)
                                        ->where('Tahun', $thn)
                                        ->first();

                                    if ($result) {
                                        $tglPelunasan = $result->Tgl_Input;
                                        $idBKM = $result->Id_BKM;

                                        DB::connection('ConnAccounting')->table('T_SALDO_PIUTANG')->where('ID', $id)->update([
                                            'IDBKM' => $idBKM,
                                            'TglPelunasan' => $tglPelunasan
                                        ]);
                                    }
                                }
                            }
                        }
                        return response()->json(['success' => 'Data Selesai Diproses. Silakan Lihat Di Excell'], 200);
                    }
                }


                return response()->json(['success' => 'Data Selesai Diproses. Silakan Lihat Di Excell'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }

        // $startTime = microtime(true);

        // set_time_limit(300); // Increase execution time limit to 300 seconds

        // $endTime = microtime(true);
        // $elapsedTime = $endTime - $startTime;
        // Log::info((string) 'Elapsed Time for post BTTB: ' . $elapsedTime . ' | NoTrans: ');

        if ($id === 'proses') {
            try {
                DB::connection('ConnAccounting')
                    ->statement('exec [SP_PROSES_SALDOPIUTANG] @TglAkhir = ?', [$tglAkhirLaporan]);

                return response()->json(['success' => 'Data Selesai Diproses. Silakan Lihat Di Excell'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }
    }


    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
