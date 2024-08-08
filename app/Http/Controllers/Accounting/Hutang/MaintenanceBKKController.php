<?php

namespace App\Http\Controllers\Accounting\Hutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class MaintenanceBKKController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Hutang.MaintenanceBKK', compact('access'));
        // $data = 'Accounting';
        // return view('Accounting.Hutang.MaintenanceBKK', compact('data'));
    }

    public function print()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Hutang.PrintTampilBKK', compact('access'));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        $detailBG = (bool) $request->input('bg');
        $proses = $request->input('proses');
        $idBayar = (int) $request->input('id_pembayaran');
        $noBG = $request->input('noJnsByr');
        $tempo = $request->input('jatuhTempo');
        $cetak = $request->input('statusCetak');
        $jumlah = $request->input('jumlahJnsByr');
        $detailBGText = (int) $request->input('id_detailkiri');
        $rincian = $request->input('rincian');
        $nilaiRincianTanpaKoma = str_replace(',', '', $request->input('nilaiRincian'));
        $nilaiRincian = (float) str_replace('.', ',', $nilaiRincianTanpaKoma);
        $idKira = $request->input('kdPerkiraan1');
        $idDetailBG_B = (int) $request->input('bg_b');
        $detailByr = $request->input('id_detailkanan');
        $dp = $request->input('dp');
        // dd($detailBG);
        // dd($nilaiRincian);

        if ($detailBG) {
            switch ($proses) {
                case 1:
                    DB::connection('ConnAccounting')->statement('EXEC SP_1273_ACC_INS_BKK2_BGCEK ?, ?, ?, ?, ? ', [
                        $idBayar,
                        $noBG,
                        $tempo,
                        $cetak,
                        $jumlah
                    ]);
                    return response()->json(['message' => 'Data sudah diSIMPAN !!..']);
                case 2:
                    DB::connection('ConnAccounting')->statement('EXEC SP_1273_ACC_UDT_BKK2_BGCEK @IdDetailBGCek= ?, @NoBGCek = ?, @JatuhTempo = ?, @StatusCetak = ?, @Jumlah = ?', [
                        $detailBGText,
                        $noBG,
                        $tempo,
                        $cetak,
                        $jumlah
                    ]);
                    return response()->json(['message' => 'Data sudah diKOREKSI !!..']);
                case 3:
                    DB::connection('ConnAccounting')->statement('EXEC SP_1273_ACC_DLT_BKK2_BGCEK ?', [
                        $detailBGText
                    ]);
                    return response()->json(['message' => 'Data sudah diHAPUS !!..']);
            }
            // $this->clearTextBG();
        }

        if (!$detailBG) {
            switch ($proses) {
                case 1:
                    DB::connection('ConnAccounting')->statement('EXEC SP_1273_ACC_INS_BKK2_DETAILBAYAR @IdPembayaran = ?, @Rincian = ?, @Nilai = ?, @Perkiraan = ?, @IdDetailBGCek = ? ', [
                        $idBayar,
                        $rincian,
                        $nilaiRincian,
                        $idKira,
                        $idDetailBG_B ?: null
                    ]);
                    return response()->json(['message' => 'Data sudah diSIMPAN !!..']);
                case 2:
                    DB::connection('ConnAccounting')->statement('EXEC SP_1273_ACC_UDT_BKK2_DETAILBAYAR @IdDetailBayar = ?, @IdPembayaran = ?, @Rincian = ?, @Nilai = ?, @Perkiraan = ?, @IdDetailBGCek = ? ', [
                        $detailByr,
                        $idBayar,
                        $rincian,
                        $nilaiRincian,
                        $idKira,
                        $idDetailBG_B ?: null
                    ]);
                    return response()->json(['message' => 'Data sudah diKOREKSI !!..']);
                case 3:
                    DB::connection('ConnAccounting')->statement('EXEC SP_1273_ACC_DLT_BKK2_DETAILBAYAR @IdDetailBayar = ?, @IdPembayaran = ? ', [
                        $detailByr,
                        $idBayar
                    ]);
                    return response()->json(['message' => 'Data sudah diHAPUS !!..']);
            }

            if ($dp == 1) {
                DB::connection('ConnAccounting')->statement('EXEC SP_1273_ACC_UDT_BKK2_SALDO ? ', [
                    $idBayar
                ]);
                return response()->json(['message' => 'Data sudah diSIMPAN !!..']);
            }
        }

    }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        // dd($id);
        if ($id == 'getPengajuan') {
            $result = DB::connection('ConnAccounting')->select('exec SP_BKK2_TAMPIL_NOBKK');
            // dd($result);
            if ($result) {
                $response = [];
                foreach ($result as $row) {
                    $item = [
                        'Id_Pembayaran' => trim($row->Id_Pembayaran),
                        'Id_Penagihan' => trim($row->Id_Penagihan),
                        'Id_Bank' => trim($row->Id_Bank),
                        'NM_SUP' => trim($row->NM_SUP),
                        'Rincian_Bayar' => !is_null($row->Rincian_Bayar) ? $row->Rincian_Bayar : '',
                        'Nilai_Pembayaran' => number_format($row->Nilai_Pembayaran, 2, '.', ','),
                        'Id_Jenis_Bayar' => trim($row->Id_Jenis_Bayar),
                        'Jenis_Pembayaran' => trim($row->Jenis_Pembayaran),
                        'Id_MataUang' => trim($row->Id_MataUang),
                        'Nama_MataUang' => trim($row->Nama_MataUang),
                        'Jml_JenisBayar' => $row->Jml_JenisBayar,
                        'Id_Supplier' => $row->Id_Supplier,
                        'Jenis_Bank' => $row->Jenis_Bank,
                        'IdMataUang_PO' => !is_null($row->IdMataUang_PO) ? $row->IdMataUang_PO : ''
                    ];
                    $response[] = $item;
                }
                return datatables($response)->make(true);
            } else {
                return response()->json(['message' => 'No records found']);
            }
        } else if ($id == 'getPembayaran') {
            $idPembayaran = $request->input('id_pembayaran');
            // dd($idPembayaran);
            $result = DB::connection('ConnAccounting')->select('exec SP_1273_ACC_CHECK_BKK2_DETAILBAYAR ?', [$idPembayaran]);
            // dd($result);
            if ($result && $result[0]->Ada == 0) {
                return response()->json(['message' => 'No records found']);
            } else {
                $details = DB::connection('ConnAccounting')->select('exec SP_1273_ACC_LIST_BKK2_DETAILBAYAR ?', [$idPembayaran]);
                // dd($details);
                $response = [];
                foreach ($details as $detail) {
                    $item = [
                        'Id_Detail_Bayar' => trim($detail->Id_Detail_Bayar),
                        'Rincian_Bayar' => trim($detail->Rincian_Bayar),
                        'Nilai_Rincian' => number_format($detail->Nilai_Rincian, 2, '.', ','),
                        'Kode_Perkiraan' => trim($detail->Kode_Perkiraan),
                        'Id_Pembayaran' => trim($detail->Id_Pembayaran),
                        'Id_Detail_BGCek' => !is_null($detail->Id_Detail_BGCek) ? trim($detail->Id_Detail_BGCek) : '',
                        'Keterangan' => !is_null($detail->Keterangan) ? trim($detail->Keterangan) : ''
                    ];

                    if ($item['Id_Detail_BGCek'] != '') {
                        $bgcek = DB::connection('ConnAccounting')->select('exec SP_1273_ACC_LIST_BKK2_IDBGCEK ?', [$item['Id_Detail_BGCek']]);
                        $item['No_BGCek'] = $bgcek ? $bgcek[0]->No_BGCek : '';
                    } else {
                        $item['No_BGCek'] = '';
                    }

                    $response[] = $item;
                }

                return datatables($response)->make(true);
            }
        } else if ($id == 'getBKK') {
            $month = $request->input('month');
            $year = $request->input('year');
            // dd($request->all());

            if (is_numeric($month) && $month > 0 && $month < 13) {
                $formattedMonthYear = str_pad($month, 2, '0', STR_PAD_LEFT) . substr($year, -2);

                $result = DB::connection('ConnAccounting')->select('exec Sp_1273_ACC_LIST_BKK2_BKK @BlnThn = ?', [$formattedMonthYear]);
                // dd($result);
                if ($result) {
                    $response = [];
                    foreach ($result as $row) {
                        $item = [
                            'Id_BKK' => trim($row->Id_BKK),
                            'NilaiBKK' => number_format($row->NilaiBKK, 2, '.', ','),
                            'NM_SUP' => !is_null($row->NM_SUP) ? trim($row->NM_SUP) : 'NO Penagihan',
                            'Id_MataUang' => trim($row->Id_MataUang),
                            'Id_Jenis_Bayar' => trim($row->Id_Jenis_Bayar),
                        ];
                        $response[] = $item;
                    }
                    return datatables($response)->make(true);
                } else {
                    return response()->json(['message' => 'No records found']);
                }
            } else {
                return response()->json(['message' => 'Invalid month']);
            }
        } else if ($id == 'getBGCek') {
            $idPembayaran = $request->input('id_pembayaran');
            // dd($idPembayaran);
            $result = DB::connection('ConnAccounting')->select('exec SP_1273_ACC_CHECK_BKK2_BGCEK @IdPembayaran = ?', [$idPembayaran]);
            // dd($result);
            if (!empty($result) && $result[0]->Ada == 0) {
                return response()->json(['message' => 'No records found']);
            } else {
                $result = DB::connection('ConnAccounting')->select('exec SP_1273_ACC_LIST_BKK2_IDBAYAR_BGCEK @IdPembayaran = ?', [$idPembayaran]);
                $response = [];
                if ($result) {
                    foreach ($result as $row) {
                        $item = [
                            'Id_Detail_BGCek' => trim($row->Id_Detail_BGCek),
                            'No_BGCek' => trim($row->No_BGCek),
                            'Jatuh_Tempo' => date('m/d/Y', strtotime($row->Jatuh_Tempo)),
                            'Status_Cetak' => trim($row->Status_Cetak),
                            'Id_Pembayaran' => trim($row->Id_Pembayaran),
                            'Nilai_BGCek' => number_format($row->Nilai_BGCek, 2, '.', ',')
                        ];
                        $response[] = $item;
                    }
                }
                return datatables($response)->make(true);
            }
        } else if ($id == 'getKodePerkiraan') {
            $response = [];

            $kodePerkiraan = DB::connection('ConnAccounting')->select('exec SP_1273_ACC_LIST_BKK1_KODEPERKIRAAN');
            // dd($kodePerkiraan);
            foreach ($kodePerkiraan as $kp) {
                $response[] = [
                    'Keterangan' => $kp->Keterangan,
                    'NoKodePerkiraan' => $kp->NoKodePerkiraan,
                ];
            }

            if (empty($response)) {
                return response()->json(['error' => 'No records found']);
            }

            return datatables($response)->make(true);
        } else if ($id == 'getDetailBG') {
            $response = [];
            $IdPembayaran = $request->input('id_pembayaran');
            // dd($IdPembayaran);
            $checkBG = DB::connection('ConnAccounting')->select('exec SP_1273_ACC_CHECK_BKK2_BGCEK @IdPembayaran = ?', [$IdPembayaran]);
            // dd($checkBG);
            if (!empty($checkBG) && $checkBG[0]->Ada == 0) {
                return response()->json(['error' => 'Isi dulu Detail BG/Cek/Transfernya !!..']);
            } else {
                $detailBG = DB::connection('ConnAccounting')->select('exec SP_1273_ACC_LIST_BKK2_IDBAYAR_BGCEK @IdPembayaran = ?', [$IdPembayaran]);

                foreach ($detailBG as $bg) {
                    $response[] = [
                        'No_BGCek' => $bg->No_BGCek,
                        'Id_Detail_BGCek' => $bg->Id_Detail_BGCek,
                    ];
                }

                if (empty($response)) {
                    return response()->json(['error' => 'Pilih dulu No BG/CEK/TRANSFERnya !!..']);
                }

                return datatables($response)->make(true);
            }
        } else if ($id == 'getGroup') {
            $listPengajuan = $request->input('rowDataArray', []);
            $tanggal = $request->input('tanggalgrup', now()->toDateString());
            $user_id = trim(Auth::user()->NomorUser);
            // dd($listPengajuan);
            $jmlData = count($listPengajuan);
            $adaBKK = $jmlData > 0;

            if (!$adaBKK) {
                return response()->json(['error' => 'Tidak ada data yang diGROUP !!...']);
            }

            if ($jmlData == 1) {
                $brs = $listPengajuan[0];
                $result = DB::connection('ConnAccounting')->select('exec SP_1273_ACC_LIST_BKK2_TOTALBYR @IdPembayaran = ?', [$brs['Id_Pembayaran']]);

                if (count($result) > 0) {
                    $totalPembayaran = $result[0]->Nilai_Pembayaran;
                    $tNilaiBulat = number_format($totalPembayaran, 2, '.', '');

                    if ($brs['Id_Supplier'] != '00000') {
                        $saldoSuppResult = DB::connection('ConnAccounting')->select('exec SP_1273_ACC_CHECK_TT_SALDOSUPP @IdSupplier = ?', [$brs['Id_Supplier']]);
                        if (count($saldoSuppResult) == 0 || $saldoSuppResult[0]->ada == 0) {
                            return response()->json(['error' => 'Saldo Supplier disesuaikan dulu ya...!!..']);
                        }
                    }

                    $createBKKResult = DB::connection('ConnAccounting')->select('exec SP_5409_ACC_INS_BKK2_IDBKK @IdBank = ?, @IdMataUang = ?, @IdJenisBayar = ?, @UserId = ?, @IdPembayaran = ?, @TglNow = ?, @nilaibulat = ?, @idsup = ?, @StatusPenagihan = ?', [
                        $brs['Id_Bank'],
                        $brs['Id_MataUang'],
                        $brs['Id_Jenis_Bayar'],
                        $user_id,
                        $brs['Id_Pembayaran'],
                        $tanggal,
                        $tNilaiBulat,
                        $brs['Id_Supplier'],
                        substr($brs['Id_Penagihan'], 0, 1) != 'X' ? 'Y' : 'N'
                    ]);

                    if (count($createBKKResult) > 0) {
                        $idbkk = trim($createBKKResult[0]->idbkk);
                        return response()->json(['message' => 'Proses Group BKK Selesai', 'idbkk' => $idbkk]);
                    } else {
                        return response()->json(['error' => 'Failed to create BKK record.']);
                    }
                } else {
                    return response()->json(['error' => 'Cek kembali Detail Pembayarannya !!..']);
                }
            } else {
                $cawangKe = 1;
                $tBayar = 0;
                $firstItem = $listPengajuan[0];
                $isGroupable = true;
                $idBKKTerbaru = [];

                foreach ($listPengajuan as $item) {
                    if ($item['Id_Supplier'] != $firstItem['Id_Supplier'] || $item['Id_Bank'] != $firstItem['Id_Bank'] || $item['Id_MataUang'] != $firstItem['Id_MataUang']) {
                        $isGroupable = false;
                        break;
                    }
                    $result = DB::connection('ConnAccounting')->select('exec SP_1273_ACC_LIST_BKK2_TOTALBYR @IdPembayaran = ?', [$item['Id_Pembayaran']]);
                    if (count($result) == 0) {
                        $isGroupable = false;
                        break;
                    }
                    $tBayar += $result[0]->Nilai_Pembayaran;
                }

                if (!$isGroupable) {
                    return response()->json(['error' => 'Data TIDAK DAPAT di-Groupkan menjadi 1(satu) BKK']);
                }

                if ($tBayar > 0) {
                    $tNilaiBulat = number_format($tBayar, 2, '.', '');

                    if ($firstItem['Id_Supplier'] != '00000') {
                        $saldoSuppResult = DB::connection('ConnAccounting')->select('exec SP_1273_ACC_CHECK_TT_SALDOSUPP @IdSupplier = ?', [$firstItem['Id_Supplier']]);
                        if (count($saldoSuppResult) == 0 || $saldoSuppResult[0]->aDA == 0) {
                            return response()->json(['error' => 'Silahkan masuk ke menu Hutang --> Penyesuaian Hutang Supplier untuk melakukan penyesuaian saldo supplier tsb']);
                        }
                    }
                    foreach ($listPengajuan as $itemPengajuan) {
                        $createBKKResult = DB::connection('ConnAccounting')->statement('exec SP_5409_ACC_INS_BKK2_IDBKK @IdBank = ?, @IdMataUang = ?, @IdJenisBayar = ?, @UserId = ?, @IdPembayaran = ?, @TglNow = ?, @nilaibulat = ?, @idsup = ?, @StatusPenagihan = ?', [
                            $itemPengajuan['Id_Bank'],
                            $itemPengajuan['Id_MataUang'],
                            $itemPengajuan['Id_Jenis_Bayar'],
                            $user_id,
                            $itemPengajuan['Id_Pembayaran'],
                            $tanggal,
                            $tNilaiBulat,
                            $itemPengajuan['Id_Supplier'],
                            substr($itemPengajuan['Id_Penagihan'], 0, 1) != 'X' ? 'Y' : 'N'
                        ]);
                        if ($createBKKResult) {
                            $idBKKTerbaru[] = DB::connection('ConnAccounting')->table('T_Pembayaran')->select('Id_BKK')->orderBy('Time_Update', 'desc')->first();
                        }
                    }
                    if (count($idBKKTerbaru) > 0) {
                        $idbkk = trim($idBKKTerbaru[0]->Id_BKK);

                        foreach ($listPengajuan as $item) {
                            if ($item['Id_Pembayaran'] != $firstItem['Id_Pembayaran']) {
                                DB::connection('ConnAccounting')->statement('exec SP_1273_ACC_INS_BKK2_RINCBKK @IdBKK = ?, @IdPembayaran = ?, @TglNow = ?', [
                                    $idbkk,
                                    $item['Id_Pembayaran'],
                                    $tanggal
                                ]);
                            }
                        }

                        return response()->json(['message' => 'Proses Group BKK Selesai', 'idbkk' => $idbkk]);
                    } else {
                        return response()->json(['error' => 'Failed to create BKK record.']);
                    }
                } else {
                    return response()->json(['error' => 'Cek kembali Detail Pembayarannya !!..']);
                }
            }
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
        //
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
