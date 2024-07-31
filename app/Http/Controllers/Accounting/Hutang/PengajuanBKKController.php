<?php

namespace App\Http\Controllers\Accounting\Hutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class PengajuanBKKController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Hutang.PengajuanBKK', compact('access'));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        $Pjk = false;
        $proses = $request->input('Proses');
        $TT = $request->input('TT');
        $TdkDP = $request->input('TdkDP');
        $AdaDP = $request->input('AdaDP');
        $TPajak = trim($request->input('TPajak'));
        $TIDPembayaran = $request->input('TIDPembayaran');
        $TBank = $request->input('TBank');
        $TIdJnsByr = $request->input('TIdJnsByr');
        $TJmlByr = $request->input('TJmlByr');
        $TNilaiBayar = $request->input('TNilaiBayar');
        $TIdTT = trim($request->input('TIdTT'));
        $TRincian_DP = $request->input('TRincian_DP');
        $TNilaiByrSbl = $request->input('TNilaiByrSbl');
        $TIDBKK_DP = $request->input('TIDBKK_DP');
        $TBKK_DP = $request->input('TBKK_DP');
        $TIDByr_DP = $request->input('TIDByr_DP');
        $TSisaByr = $request->input('TSisaByr');
        $Bayar = $request->input('Bayar');
        $DP = $request->input('DP');
        $TIDSupplier = $request->input('TIDSupplier');
        $txtKurs = $request->input('txtKurs');
        $TBKM = $request->input('TBKM');
        $DP_lagi = 0;

        switch ($proses) {
            case 1:
                if ($TT) {
                    if (!$TdkDP && !$AdaDP) {
                        return response()->json(['message' => 'Pilih dulu!!..ADA DP atau TIDAK ada DP ..'], 400);
                    }

                    if ($TPajak == "Ada Pajak") {
                        if ($this->confirm('Pembayaran Pajak di pisah ? ')) {
                            $Pjk = true;
                        }
                    } else {
                        if (!$this->confirm('Dibayar Penuh ? ')) {
                            $Pjk = true;
                        }
                    }

                    if ($Pjk) {
                        DB::connection('ConnAccounting')
                            ->statement('EXEC SP_1273_ACC_INS_BKK2_ACUAN_TDKPENUH ?, ?', [
                                $TIDPembayaran,
                                auth()->id()
                            ]);
                    }

                    if ($TNilaiBayar && $TdkDP) {
                        DB::connection('ConnAccounting')
                            ->statement('EXEC SP_1273_ACC_UDT_BKK2_ACUAN_TTNODP ?, ?, ?, ?, ?, ?', [
                                $TIDPembayaran,
                                $TBank,
                                $TIdJnsByr,
                                $TJmlByr,
                                $TNilaiBayar,
                                $TIdTT
                            ]);
                        return response()->json(['message' => 'Data Pengajuan Penagihan sudah diSIMPAN !!..'], 200);
                    } elseif ($TNilaiBayar && $AdaDP) {
                        if ($DP_lagi == 0) {
                            DB::connection('ConnAccounting')
                                ->statement('EXEC SP_1273_ACC_INS_BKK2_ACUAN_TTDP_1 ?, ?, ?, ?, ?, ?, ?, ?, ?', [
                                    $TIDPembayaran,
                                    $TIdTT,
                                    $TBank,
                                    $TIdJnsByr,
                                    $request->input('TIdUang'),
                                    $TJmlByr,
                                    $TRincian_DP,
                                    $TNilaiByrSbl,
                                    auth()->id()
                                ]);
                        } else {
                            DB::connection('ConnAccounting')
                                ->statement('EXEC SP_1273_ACC_INS_BKK2_ACUAN_TTDP_2 ?, ?, ?, ?, ?, ?', [
                                    $TIDPembayaran,
                                    $TIdTT,
                                    $TRincian_DP,
                                    $TNilaiByrSbl,
                                    auth()->id(),
                                    $TBKK_DP
                                ]);
                        }
                        DB::connection('ConnAccounting')
                            ->statement('EXEC SP_1273_ACC_UDT_BKK2_ACUAN_SALDO ?, ?', [
                                $TIDByr_DP,
                                floatval(number_format($TSisaByr, 2))
                            ]);
                        return response()->json(['message' => 'Data Pengajuan Penagihan sudah diSIMPAN !!..'], 200);
                    } else {
                        return response()->json(['message' => 'Data Pengajuan TIDAK DAPAT diPROSES, Nilai Rincian = 0(Nol) !!..'], 400);
                    }
                } else {
                    if ($Bayar) {
                        $recTrans = DB::connection('ConnAccounting')
                            ->statement('EXEC SP_1273_ACC_INS_BKK2_ACUAN_NOTT_BAYAR ?, ?, ?, ?, ?, ?, ?, ?', [
                                $TBank,
                                $TIdJnsByr,
                                $request->input('TIdUang'),
                                $TJmlByr,
                                $request->input('TRincian'),
                                $TNilaiBayar,
                                auth()->id(),
                                $TIDSupplier
                            ]);
                        $TIdTT = $recTrans->nmError;
                    } elseif ($DP) {
                        $recTrans = DB::connection('ConnAccounting')
                            ->statement('EXEC SP_1273_ACC_INS_BKK2_ACUAN_NOTT_DP ?, ?, ?, ?, ?, ?, ?, ?, ?', [
                                $TBank,
                                $TIdJnsByr,
                                $request->input('TIdUang'),
                                $TJmlByr,
                                $request->input('TRincian'),
                                $TNilaiBayar,
                                $TIDSupplier,
                                auth()->id(),
                                $txtKurs
                            ]);
                        $TIdTT = $recTrans->nmError;
                    }
                    if ($TBKM) {
                        DB::connection('ConnAccounting')
                            ->statement('EXEC SP_1273_ACC_UDT_BKM_DIBAYAR ?, ?', [
                                $TBKM,
                                $TNilaiBayar
                            ]);
                        $TBKM = "";
                    }
                    return response()->json(['message' => 'Data Pengajuan NON Penagihan sudah diSIMPAN !!..'], 200);
                }
                break;

            case 2:
                DB::connection('ConnAccounting')
                    ->statement('EXEC SP_1273_ACC_UDT_BKK2_ACUAN ?, ?, ?, ?, ?', [
                        $TIDPembayaran,
                        $TBank,
                        $TIdJnsByr,
                        $request->input('TIdUang'),
                        $TJmlByr
                    ]);
                return response()->json(['message' => 'Data Pengajuan sudah diKOREKSI !!..'], 200);
                break;

            case 3:
                if ($TT) {
                    DB::connection('ConnAccounting')
                        ->statement('EXEC SP_1273_ACC_DLT_BKK2_ACUAN_TT ?', [$TIDPembayaran]);
                    return response()->json(['message' => 'Data Pengajuan Penagihan sudah diHAPUS !!..'], 200);
                } else {
                    DB::connection('ConnAccounting')
                        ->statement('EXEC SP_1273_ACC_DLT_BKK2_ACUAN_NOTT ?, ?', [
                            $TIDPembayaran,
                            $TIdTT
                        ]);
                    return response()->json(['message' => 'Data Pengajuan NO Penagihan sudah diHAPUS !!..'], 200);
                }
                break;
        }
    }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        if ($id == 'getSupplier') {
            $supplierDetails = DB::connection('ConnAccounting')
                ->select('exec SP_1273_ACC_LIST_SUPPLIER');
            $response = [];
            foreach ($supplierDetails as $row) {
                $response[] = [
                    'NM_SUP' => trim($row->NM_SUP),
                    'NO_SUP' => trim($row->NO_SUP),
                ];
            }
            return datatables($response)->make(true);
        } else if ($id == 'getPengajuan') {
            $pengajuanDetails = DB::connection('ConnAccounting')
                ->select('exec SP_1273_ACC_LIST_BKK2_PENGAJUAN');
            // dd($pengajuanDetails);
            $response = [];
            foreach ($pengajuanDetails as $row) {
                $item = [];
                $item['Id_Pembayaran'] = trim($row->Id_Pembayaran);
                $item['Id_Penagihan'] = (substr(trim($row->Id_Penagihan), 0, 1) != 'X') ? trim($row->Id_Penagihan) : trim($row->Id_Penagihan);
                $item['Id_Bank'] = trim($row->Id_Bank);
                $item['Rincian_Bayar'] = trim($row->Rincian_Bayar);
                $item['Nilai_Pembayaran'] = number_format($row->Nilai_Pembayaran, 2, ',', '.');
                $item['Id_Jenis_Bayar'] = trim($row->Id_Jenis_Bayar);
                $item['Jenis_Pembayaran'] = trim($row->Jenis_Pembayaran);
                $item['Id_MataUang'] = trim($row->Id_MataUang);
                $item['Nama_MataUang'] = trim($row->Nama_MataUang);
                $item['Jml_JenisBayar'] = $row->Jml_JenisBayar;
                $item['Kurs_Bayar'] = $row->Kurs_Bayar;
                $response[] = $item;
            }
            return datatables($response)->make(true);
        } else if ($id == 'getTT') {
            $supplierId = $request->input('supplier1');
            // dd($supplierId);
            $ttDetails = DB::connection('ConnAccounting')
                ->select('exec SP_1273_ACC_LIST_BKK2_TT @IDSupplier = ?', [$supplierId]);
            // dd($ttDetails);
            $response = [];
            foreach ($ttDetails as $row) {
                $item = [];
                $item['Waktu_Penagihan'] = \Carbon\Carbon::parse($row->Waktu_Penagihan)->format('m/d/Y');
                $item['Id_Penagihan'] = trim($row->Id_Penagihan);
                $item['Status_PPN'] = ($row->Status_PPN == 'N') ? 'Tidak Ada' : 'Ada Pajak';
                $item['UangTT'] = trim($row->UangTT);
                $item['Nilai_Penagihan'] = number_format($row->Nilai_Penagihan, 2, ',', '.');
                $item['Lunas'] = trim($row->Lunas);
                $item['IdUangTT'] = trim($row->IdUangTT);
                $item['Id_Pembayaran'] = $row->Id_Pembayaran;
                $item['TT_NoLunas'] = "";
                $response[] = $item;
            }

            $ttNoLunasDetails = DB::connection('ConnAccounting')
                ->select('exec Sp_1273_ACC_LIST_BKK2_TT_NOLUNAS @IDSupplier = ?', [$supplierId]);
            foreach ($ttNoLunasDetails as $row) {
                $item = [];
                $item['Waktu_Penagihan'] = \Carbon\Carbon::parse($row->Waktu_Penagihan)->format('m/d/Y');
                $item['Id_Penagihan'] = trim($row->Id_Penagihan);
                $item['Status_PPN'] = ($row->Status_PPN == 'N') ? 'Tidak Ada' : 'Ada Pajak';
                $item['UangTT'] = trim($row->UangTT);
                $item['Nilai_Penagihan'] = number_format($row->Nilai_Penagihan, 2, ',', '.');
                $item['Lunas'] = trim($row->Lunas);
                $item['IdUangTT'] = trim($row->IdUangTT);
                $item['Id_Pembayaran'] = $row->Id_Pembayaran;
                $item['TT_NoLunas'] = $row->TT_NoLunas;
                $item['isRed'] = true;
                $response[] = $item;
            }
            // dd($ttDetails, $ttNoLunasDetails);
            return datatables($response)->make(true);
        } else if ($id == 'getBKK_DP') {
            $BKM_Pot = $request->input('BKM_Pot');
            $supplierId = $request->input('supplier1');
            // dd($request->all());
            $response = [];

            if (!$BKM_Pot) {
                $results = DB::connection('ConnAccounting')
                    ->select('exec SP_1273_ACC_LIST_BKK2_BKKDP @IDSUPP = ?', [$supplierId]);

                foreach ($results as $result) {
                    $bkk = $result->BKK;
                    $rincian = $result->Rincian;

                    $resultRincian = DB::connection('ConnAccounting')
                        ->select('exec SP_1273_ACC_LIST_BKK2_BKKDP_RINCIAN @BKK = ?, @Rincian = ?', [$bkk, $rincian]);

                    if ($resultRincian) {
                        $nilaiPembayaran = $resultRincian[0]->Nilai_Pembayaran;
                        $idPembayaran = $resultRincian[0]->Id_Pembayaran;

                        $response[] = [
                            'TBKK_DP' => $bkk,
                            'TRincian_DP' => $rincian,
                            'TNilaiByrSbl' => number_format($nilaiPembayaran, 2, ',', '.'),
                            'TIDByr_DP' => $idPembayaran,
                            'TSisaByr' => number_format(($request->input('TNilaiBayar') - $nilaiPembayaran), 2, ',', '.')
                        ];
                    } else {
                        $response['error'] = "Pilih BKK Uang Mukanya dulu !!..";
                    }
                }
            } else {
                $results = DB::connection('ConnAccounting')
                    ->select('exec SP_1273_ACC_LIST_BKK2_DP_PEMBAYARAN @idSup = ?', [$supplierId]);

                foreach ($results as $result) {
                    $bkk = $result->Id_BKM;
                    $custNilai = $result->CustNilai;

                    $resultPembayaran = DB::connection('ConnAccounting')
                        ->select('exec SP_1273_ACC_LIST_BKK2_BKMDP_PEMBAYARAN @bkk = ?', [$bkk]);

                    if ($resultPembayaran) {
                        $nilaiPelunasan = $resultPembayaran[0]->Nilai_Pelunasan;

                        $response[] = [
                            'TBKK_DP' => $bkk,
                            'TIDBKK_DP' => $custNilai,
                            'TNilaiBayarS' => number_format($nilaiPelunasan, 2, ',', '.'),
                            'TSelisih' => number_format(($request->input('TNilaiRincian') - $nilaiPelunasan), 2, ',', '.')
                        ];
                    } else {
                        $response['error'] = "Pilih BKM Potong Tagihannya dulu !!..";
                    }
                }
            }
            return datatables($response)->make(true);
        } else if ($id == 'getBank') {
            $response = [];

            $banks = DB::connection('ConnAccounting')
                ->select('exec SP_1273_ACC_LIST_BKK2_BANK');
            // dd($banks);
            foreach ($banks as $bank) {
                $response[] = [
                    'Id_Bank' => $bank->Id_Bank,
                    'Nama_Bank' => $bank->Nama_Bank,
                ];
            }

            if (empty($response)) {
                return response()->json(['error' => 'Pilih dulu Banknya !!..']);
            }
            return datatables($response)->make(true);
        } else if ($id == 'getBankDetails') {
            $selectedBank = $request->input('id_bank');
            $response = [];

            if ($request->has('TT') || $request->input('Proses') == 2) {
                $idBankDetails = DB::connection('ConnAccounting')
                    ->select('exec SP_1273_ACC_LIST_BKK2_IDBANK @IdBank = ?', [$selectedBank]);

                if (!empty($idBankDetails)) {
                    $idMataUang = $idBankDetails[0]->Id_MataUang;
                    $namaMataUang = $idBankDetails[0]->Nama_MataUang;

                    if ($request->input('TIdUang') == 1) {
                        if ($idMataUang != 1) {
                            return response()->json(['error' => "Bank = $selectedBank  Untuk MataUang : $namaMataUang"]);
                        }
                    } else {
                        if ($idMataUang == 1) {
                            return response()->json(['error' => "Bank = $selectedBank  Untuk MataUang : $namaMataUang"]);
                        }
                    }
                }
            }

            return response()->json(['success' => true, 'data' => $response]);
        } else if ($id == 'getJnsByr') {
            // Execute the stored procedure to get payment types
            $paymentTypes = DB::connection('ConnAccounting')
                ->select('exec SP_1273_ACC_LIST_BKK2_JENISBAYAR');

            // Prepare the response array
            $response = [];
            foreach ($paymentTypes as $paymentType) {
                $response[] = [
                    'Jenis_Pembayaran' => trim($paymentType->Jenis_Pembayaran),
                    'Id_Jenis_Bayar' => trim($paymentType->Id_Jenis_Bayar),
                ];
            }
            // dd($response);
            // Check if there are any results
            if (empty($response)) {
                return response()->json([
                    'message' => 'No payment types found. Please select a payment type!',
                    'status' => 'error'
                ], 400);
            }

            // Assuming the response should be returned as a DataTable
            $TIdJnsByr = $response[0]['Id_Jenis_Bayar'];
            $TJnsByr = $response[0]['Jenis_Pembayaran'];

            if ($TIdJnsByr == "") {
                return response()->json([
                    'message' => 'Please select a payment type first!',
                    'status' => 'error'
                ], 400);
            } else {
                $TBank = $request->input('id_bank');

                if ($TBank == "KRR2" && $TIdJnsByr != 1) {
                    return response()->json([
                        'message' => 'Bank = KRR2, Payment type must be CASH!',
                        'status' => 'error'
                    ], 400);
                }

                return datatables($response)->make(true);
            }
        } else if ($id == 'GetMataUang') {
            if ($request->input('mata_uang') != "") {
                return response()->json([
                    'enable' => 'TNilaiBayar',
                    'focus' => 'TNilaiBayar',
                    'status' => 'success'
                ]);
            }
            // dd($request->all());

            $currencies = DB::connection('ConnAccounting')
                ->select('exec SP_1273_ACC_LIST_BKK2_MATAUANG');
            // dd($currencies);
            $response = [];
            foreach ($currencies as $currency) {
                $response[] = [
                    'Nama_MataUang' => trim($currency->Nama_MataUang),
                    'Id_MataUang' => trim($currency->Id_MataUang),
                ];
            }

            if (empty($response)) {
                return response()->json([
                    'message' => 'No currencies found. Please select a currency!',
                    'status' => 'error'
                ], 400);
            }

            $TUang = $response[0]['Nama_MataUang'];
            $TIdUang = $response[0]['Id_MataUang'];

            if ($TIdUang == "") {
                return response()->json([
                    'message' => 'Please select a currency first!',
                    'status' => 'error'
                ], 400);
            } else {
                $TBank = $request->input('id_bank');

                $bankCurrency = DB::connection('ConnAccounting')
                    ->select('exec SP_1273_ACC_LIST_BKK2_IDBANK ?', [$TBank]);

                if (empty($bankCurrency)) {
                    return response()->json([
                        'message' => 'No bank currency found. Please select a currency!',
                        'status' => 'error'
                    ], 400);
                }

                $bankCurrency = $bankCurrency[0];

                if ($TIdUang != $bankCurrency->Id_MataUang) {
                    return response()->json([
                        'message' => 'Bank = ' . trim($TBank) . '  For Currency : ' . trim($bankCurrency->Nama_MataUang),
                        'status' => 'error'
                    ], 400);
                }

                return datatables($response)
                    ->with('enable', 'TNilaiBayar')
                    ->with('focus', 'TNilaiBayar')
                    ->make(true);
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
