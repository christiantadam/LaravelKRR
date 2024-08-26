<?php

namespace App\Http\Controllers\Accounting\Hutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class MaintenanceBKKKRR1Controller extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Hutang.MaintenanceBKKKRR1', compact('access'));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        // Define variables
        $proses = $request->input('proses');
        $tt = (bool) $request->input('TT');
        $tNilaiRincian = $request->input('nilairincian_rp');
        $tIdBayar = $request->input('id_bayar');
        $tIdPenagihan = $request->input('id_TT');
        $tRincian = $request->input('rincinan_bayar');
        $tKdKira = $request->input('kode_kira');
        $user_id = trim(Auth::user()->NomorUser);
        $bulatan = (bool) $request->input('bulatan');
        // dd($request->all());
        // dd($tIdBayar);
        // dd(substr(trim($tIdPenagihan), 0, 1));

        switch ($proses) {
            case 1:
                // DATA PENAGIHAN
                if ($tt) {
                    if ($tNilaiRincian !== "") {
                        if ($tIdBayar == null) {
                            $result = DB::connection('ConnAccounting')
                                ->statement('EXEC SP_1273_ACC_INS_BKK1_IDBAYAR_TT ?, ?, ?, ?, ?', [
                                    $tIdPenagihan,
                                    $tRincian,
                                    $tNilaiRincian,
                                    $user_id,
                                    $tKdKira,
                                ]);

                            $latestPayment = DB::connection('ConnAccounting')
                                ->table('T_Pembayaran_Tagihan')
                                ->select('Id_Pembayaran')
                                ->orderBy('Tgl_Input', 'desc')
                                ->first();

                            // dd($latestPayment);
                            if ($latestPayment) {
                                $tIdBayar = $latestPayment->Id_Pembayaran;
                                // dd($tIdBayar);
                            }
                        } else {
                            DB::connection('ConnAccounting')
                                ->statement('EXEC SP_1273_ACC_INS_BKK1_DETAILBYR ?, ?, ?, ?', [
                                    $tIdBayar,
                                    $tRincian,
                                    $tNilaiRincian,
                                    $tKdKira
                                ]);
                        }
                        return response()->json(['message' => 'Data Penagihan sudah diSIMPAN !!..']);
                    } else {
                        return response()->json(['message' => 'Data PENAGIHAN TIDAK DAPAT diPROSES, Nilai Rincian = 0(Nol) !!..'], 400);
                    }

                    // if ($request->input('pajak') === "Y" || $bulatan) {
                    //     $this->tampilDetailPembayaran();
                    //     return response()->json(['message' => 'Tambah']);
                    // } else {
                    //     return response()->json(['message' => 'Proses Data Penagihan lagi??..']);
                    // }
                } else {
                    // DATA NO PENAGIHAN
                    if ($tIdBayar == null && $tIdPenagihan == null) {
                        if ($tNilaiRincian == 0) {
                            return response()->json(['message' => 'Data tidak dapat diSIMPAN !!.. Nilai Rincian=0(nol)'], 400);
                        }
                        $result = DB::connection('ConnAccounting')
                            ->statement('EXEC SP_1273_ACC_INS_BKK1_IDBAYAR_NOTT ?, ?, ?, ?', [
                                $tRincian,
                                $tNilaiRincian,
                                $user_id,
                                $tKdKira,

                            ]);
                        // $tIdPenagihan = $result[0]->IDtt;
                        // $tIdBayar = $result[0]->IDBYR;
                    } else {
                        if ($tNilaiRincian == 0) {
                            return response()->json(['message' => 'Data tidak dapat diSIMPAN !!.. Nilai Rincian=0(nol)'], 400);
                        }
                        DB::connection('ConnAccounting')
                            ->statement('EXEC SP_1273_ACC_INS_BKK1_DETAILBYR ?, ?, ?, ?', [
                                $tIdBayar,
                                $tRincian,
                                $tNilaiRincian,
                                $tKdKira
                            ]);
                    }
                    return response()->json(['message' => 'Data NON Penagihan sudah diSIMPAN !!..']);
                }

            case 2:
                // DATA PENAGIHAN
                if (substr(trim($tIdPenagihan), 0, 1) !== "Y") {
                    // Only update the code of Perkiraan
                    DB::connection('ConnAccounting')
                        ->statement('EXEC SP_1273_ACC_UDT_BKK1_TT ?, ?, ?, ?, ?', [
                            (int) $request->input('id_detail'),
                            (int) $tIdBayar,
                            $tNilaiRincian,
                            $tKdKira,
                            $tRincian,
                        ]);
                    // dd($tes);
                    return response()->json(['message' => 'Data BKK berdasarkan data PENAGIHAN sudah diKOREKSI !!..']);
                } else {
                    // DATA NO PENAGIHAN
                    DB::connection('ConnAccounting')
                        ->statement('EXEC SP_1273_ACC_UDT_BKK1_NOTT ?, ?, ?, ?, ?, ?', [
                            $tIdBayar,
                            $request->input('id_detail'),
                            $tRincian,
                            $tNilaiRincian,
                            $tKdKira,
                            $tIdPenagihan
                        ]);
                    return response()->json(['message' => 'Data BKK berdasarkan NON PENAGIHAN sudah diKOREKSI !!..']);
                }

            case 3:
                if (!$tt) {
                    // DATA NO PENAGIHAN
                    DB::connection('ConnAccounting')
                        ->statement('EXEC SP_1273_ACC_DLT_BKK1_NOTT ?, ?, ?', [
                            (int) $request->input('id_detail'),
                            (int) $tIdBayar,
                            $tIdPenagihan
                        ]);
                    // dd($tes);
                    return response()->json(['message' => 'Data BKK berdasarkan NON PENAGIHAN sudah diHAPUS !!..']);
                } else {
                    // DATA PENAGIHAN
                    DB::connection('ConnAccounting')
                        ->statement('EXEC SP_1273_ACC_DLT_BKK1_TT ?', [$tIdBayar]);
                    return response()->json(['message' => 'Data BKK berdasarkan data PENAGIHAN sudah diHAPUS !!..']);
                }
        }

        if ($tIdBayar !== "") {
            $result = DB::connection('ConnAccounting')
                ->select('EXEC SP_1273_ACC_LIST_BKK1_NILAIBYR ?', [$tIdBayar]);
            $tTotal = number_format($result[0]->Nilai_Pembayaran, 2, ',', '.');
            return response()->json(['total' => $tTotal]);
        }
    }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        if ($id == 'getDataAwalAtas') {
            $response = [];

            $results1 = DB::connection('ConnAccounting')
                ->select('exec SP_1273_ACC_LIST_BKK1_NOBKK_TT');
            // dd($results1);
            foreach ($results1 as $row) {
                $response[] = [
                    'Id_Pembayaran' => trim($row->Id_Pembayaran),
                    'Id_Penagihan' => trim($row->Id_Penagihan),
                    'NM_SUP' => trim($row->NM_SUP),
                    'Rincian_Bayar' => trim($row->Rincian_Bayar),
                    'Nilai_Rincian' => number_format($row->Nilai_Rincian, 2, '.', ','),
                    'Id_Supplier' => $row->Id_Supplier,
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getDataAwalBawah') {
            $response = [];

            $results2 = DB::connection('ConnAccounting')
                ->select('exec SP_1273_ACC_LIST_BKK1_NOBKK_NOTT');
            // dd($results2);
            foreach ($results2 as $row) {
                $response[] = [
                    'Id_Pembayaran' => trim($row->Id_Pembayaran),
                    'Id_Penagihan' => trim($row->Id_Penagihan),
                    'NM_SUP' => trim($row->NM_SUP),
                    'Rincian_Bayar' => trim($row->Rincian_Bayar),
                    'Nilai_Rincian' => number_format($row->Nilai_Rincian, 2, '.', ','),
                    'Id_Supplier' => $row->Id_Supplier,
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getKira') {
            // Execute the stored procedure
            $results = DB::connection('ConnAccounting')
                ->select('exec SP_1273_ACC_LIST_BKK1_KODEPERKIRAAN');
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'NoKodePerkiraan' => trim($row->NoKodePerkiraan),
                    'Keterangan' => trim($row->Keterangan),
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getPenagihan') {
            $response = [];

            $results = DB::connection('ConnAccounting')
                ->select('exec SP_1273_ACC_LIST_BKK1_TTRINC');
            // dd($results);
            foreach ($results as $row) {
                $response[] = [
                    'Waktu_Penagihan' => \Carbon\Carbon::parse($row->Waktu_Penagihan)->format('m/d/Y'),
                    'Id_Penagihan' => trim($row->Id_Penagihan),
                    'NM_SUP' => trim($row->NM_SUP),
                    'Nama_MataUang' => trim($row->Nama_MataUang),
                    'Nilai_Penagihan' => number_format($row->Nilai_Penagihan, 2, '.', ','),
                    'Lunas' => trim($row->Lunas),
                    'Status_PPN' => trim($row->Status_PPN),
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getTampilBKK') {
            $response = [];

            $month = $request->input('month');
            $year = $request->input('year');

            if (intval($month) > 0 && intval($month) < 13) {
                $BlnThn = str_pad($month, 2, '0', STR_PAD_LEFT) . substr($year, -2);

                $results = DB::connection('ConnAccounting')
                    ->select('exec SP_1273_ACC_LIST_BKK1_BKK @BlnThn = ?', [$BlnThn]);

                foreach ($results as $row) {
                    $response[] = [
                        'Id_BKK' => trim($row->Id_BKK),
                        'NilaiBKK' => number_format($row->NilaiBKK, 2, '.', ','),
                        'NM_SUP' => $row->NM_SUP ? trim($row->NM_SUP) : 'NO Penagihan',
                    ];
                }
            }

            return datatables($response)->make(true);
        } else if ($id == 'getDetailPembayaran') {
            $response = [];

            $IdPembayaran = $request->input('id_bayar');

            $results = DB::connection('ConnAccounting')
                ->select('exec SP_1273_ACC_LIST_BKK1_DETAILBYR @IdPembayaran = ?', [$IdPembayaran]);
            // dd($results);
            // Process the results
            foreach ($results as $row) {
                $response[] = [
                    'Id_Detail_Bayar' => trim($row->Id_Detail_Bayar),
                    'Rincian_Bayar' => trim($row->Rincian_Bayar),
                    'Nilai_Rincian' => number_format($row->Nilai_Rincian, 2, '.', ','),
                    'Kode_Perkiraan' => trim($row->Kode_Perkiraan),
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getGroup') {
            $listPengajuan = $request->input('rowDataArray', []);
            $tanggal = $request->input('tanggalgrup', now()->toDateString());
            $user_id = trim(Auth::user()->NomorUser);
            $jmlData = count($listPengajuan);
            $adaBKK = $jmlData > 0;
            $periode = date('Y');
            // dd($periode);
            // dd($request->all());
            if (!$adaBKK) {
                return response()->json(['error' => 'Tidak ada data yang diGROUP !!...']);
            }

            $firstItem = $listPengajuan[0];
            $idSupp = trim($firstItem['Id_Supplier']);
            // dd($idSupp);
            $suppSama = true;

            // Check if all suppliers are the same
            foreach ($listPengajuan as $item) {
                if (trim($item['Id_Supplier']) !== $idSupp) {
                    $suppSama = false;
                    break;
                }
            }

            if (!$suppSama) {
                return response()->json(['error' => 'Supplier harus sama, untuk proses Group data lebih dari 1(satu)!!..']);
            }

            // Check supplier balance if Id_Supplier is not '00000'
            if ($idSupp !== '00000') {
                $saldoSuppResult = DB::connection('ConnAccounting')->select('exec SP_1273_ACC_CHECK_BKK1_SALDO @IdSupplier = ?', [$idSupp]);
                // dd($saldoSuppResult);
                if (empty($saldoSuppResult) || $saldoSuppResult[0]->aDA == 0) {
                    return response()->json(['error' => 'Silahkan masuk ke menu Hutang --> Penyesuaian Saldo Supplier untuk proses penyesuaian Saldo Supplier tsb.']);
                }
            }

            // Create BKK record
            $idbkk = null;
            foreach ($listPengajuan as $index => $item) {
                if ($index == 0) {
                    // Call the stored procedure to create the initial BKK entry
                    $createBKKResult = DB::connection('ConnAccounting')
                        ->statement('exec SP_5409_ACC_INS_BKK1_IDBKK @UserId = ?, @IdPembayaran = ?, @StatusPenagihan = ?, @TglNow = ?', [
                            $user_id,
                            $item['Id_Pembayaran'],
                            substr($item['Id_Penagihan'], 0, 1) !== 'Y' ? 'Y' : 'N',
                            $tanggal,
                        ]);

                    if (!empty($createBKKResult)) {
                        // Extract the year from the current date
                        $periode = date('Y');

                        // Retrieve the current value of Id_BKK_E_Rp
                        $idBKK_E_Rp = DB::connection('ConnAccounting')
                            ->table('T_COUNTER_BKK')
                            ->where('Periode', $periode)
                            ->value('Id_BKK_E_Rp');

                        if ($idBKK_E_Rp !== null) {
                            // Subtract 1 from the retrieved Id_BKK_E_Rp
                            $idBKK_E_RpMinusOne = $idBKK_E_Rp - 1;

                            // Format the idBKK as 'KKK-PYYxxxxx'
                            $formattedIdBKK = 'KKK-P' . substr($periode, -2) . str_pad($idBKK_E_RpMinusOne, 5, '0', STR_PAD_LEFT);

                            // Retrieve the IdBKK from the T_Pembayaran table
                            $tPembayaranRecord = DB::connection('ConnAccounting')
                                ->table('T_Pembayaran')
                                ->where('Id_BKK', $formattedIdBKK)
                                ->first();
                            // dd($tPembayaranRecord);
                            if ($tPembayaranRecord) {
                                $idbkk = $tPembayaranRecord->Id_BKK;

                                $tNilaiBKK = DB::connection('ConnAccounting')->select('exec SP_1273_ACC_LIST_BKK1_NILAIBKK @BKK = ?', [$idbkk]);
                                // dd($tNilaiBKK);
                                if (!empty($tNilaiBKK)) {
                                    $totalBayar = $tNilaiBKK[0]->NilaiBayar;
                                    DB::connection('ConnAccounting')->statement('exec SP_1273_ACC_UPDATE_BKK1_NILAIBKK_WEWE @BKK = ?, @nilaibulat = ?', [
                                        $idbkk,
                                        $totalBayar,
                                    ]);
                                }
                            }
                        }
                    }
                } else {
                    DB::connection('ConnAccounting')->statement('exec SP_1273_ACC_INS_BKK1_RINCBKK @IdBKK = ?, @IdPembayaran = ?, @TglNow = ?', [
                        $idbkk,
                        $item['Id_Pembayaran'],
                        $tanggal,
                    ]);
                }
            }

            if ($idbkk) {
                $currencyCheck = DB::connection('ConnAccounting')->select('exec SP_1273_ACC_LIST_BKK1_SUPPLIER_UANG @IdSupp = ?', [$idSupp]);
                // dd($currencyCheck);
                if (!empty($currencyCheck) && $currencyCheck[0]->ID_MATAUANG == 1) {
                    DB::connection('ConnAccounting')->statement('exec Sp_1273_ACC_INS_HUTANG_BKK1 @BKK = ?, @UserInput = ?', [
                        $idbkk,
                        $user_id,
                    ]);
                } else {
                    return response()->json(['error' => 'BKK ini melunasi Supplier NON RUPIAH, Proses sudah selesai!! Hubungi EDP!!..']);
                }

                $finalResult = DB::connection('ConnAccounting')->select('exec SP_1273_ACC_LIST_BKK1_NILAIBKK @BKK = ?', [$idbkk]);
                // dd($finalResult);
                $tNilaiBKK = $finalResult[0]->NilaiBayar;

                return response()->json(['message' => 'Proses Group BKK Selesai', 'idbkk' => $idbkk, 'totalBayar' => $tNilaiBKK]);
            } else {
                return response()->json(['error' => 'Failed to create BKK record.']);
            }
        } else if ($id == 'cetakBKK') {
            $selectedBKK = $request->input('rowDataBKKArray');

            if (empty($selectedBKK)) {
                return response()->json(['message' => 'Tidak Ada BKK yang diCETAK!!..'], 422);
            }

            $bkkItem = collect($selectedBKK)->first();
            if (!$bkkItem) {
                return response()->json(['message' => 'Tidak ada BKK yang diCETAK!!..'], 422);
            }

            $idBKK = $bkkItem['Id_BKK'];
            $nilaiBKK = $bkkItem['NilaiBKK'];

            $nilaiBKKFloat = (float) str_replace(',', '', $nilaiBKK);

            if ($request->input('confirmPembulatan') == 'yes') {
                $nilaiPembulatan = $request->input('nilaiPembulatan');
            } else {
                $nilaiPembulatan = number_format($nilaiBKKFloat, 2, '.', ',');
            }

            // First stored procedure call: update nilai BKK
            DB::connection('ConnAccounting')->statement('exec SP_1273_ACC_UDT_BKK1_NILAIBKK ?, ?', [
                $idBKK,
                $nilaiPembulatan,
            ]);

            // Convert to words
            $konversi = $request->input('terbilang');

            // Second stored procedure call: update Terbilang
            DB::connection('ConnAccounting')->statement('exec SP_1273_ACC_UDT_BKK1_TERBILANG_BKK ?, ?', [
                $idBKK,
                $konversi,
            ]);

            // Assuming you're using a reporting tool to generate and display the report
            $data = DB::connection('ConnAccounting')
                        ->select("SELECT * FROM VW_PRG_1273_ACC_Cetak_BAYAR_BKK1 WHERE Id_BKK = ?", [$idBKK]);
            return response()->json([
                'data' => $data,
                'message' => 'Data sudah diSIMPAN!'
            ]);

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
