<?php

namespace App\Http\Controllers\Accounting\Hutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class PelunasanHutangController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Hutang.PelunasanHutang', compact('access'));
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
    public function show(Request $request, $id)
    {
        if ($id == 'getDataAtas') {
            $response = [];

            $results = DB::connection('ConnAccounting')
                ->select('exec SP_1273_ACC_TT_LIST_PELUNASANHUTANG');
            // dd($results);
            foreach ($results as $row) {
                $response[] = [
                    'NM_SUP' => trim($row->NM_SUP),
                    'Tgl_Input' => \Carbon\Carbon::parse($row->Tgl_Input)->format('m/d/Y'),
                    'Id_BKK' => trim($row->Id_BKK),
                    'Symbol' => trim($row->Symbol),
                    'NilaiRincian' => number_format($row->NilaiRincian, 4, '.', ','),
                    'Id_MataUang' => $row->Id_MataUang,
                    'Id_Supplier' => $row->Id_Supplier,
                    'IdUangTagih' => $row->IdUangTagih,
                    'IdUang_Supp' => $row->IdUang_Supp,
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'proses') {
            $adaProses = false;
            $jmlDt = 0;

            $listLunas = $request->input('rowDataArray');
            // dd($listLunas);

            foreach ($listLunas as $index => $item) {
                if (!empty($item['Id_BKK'])) {
                    $adaProses = true;
                    $jmlDt++;

                    $brsLns = $index;
                    $supplier = $item['Id_Supplier'];   // Corresponds to SubItems[6]
                    $idUangSupp = $item['IdUang_Supp']; // Corresponds to SubItems[9]
                    $idUangByr = $item['IdUangTagih'];  // Corresponds to SubItems[7]
                    $bkk = $item['Id_BKK'];             // Corresponds to SubItems[2]
                }
            }

            if ($adaProses) {
                if ($jmlDt > 1) {
                    return response()->json(['message' => 'Hanya 1(satu) data yang dapat diPROSES PELUNASAN !!...'], 200);
                }

                $kursCheck = DB::connection('ConnAccounting')
                    ->select('exec SP_1273_ACC_CHECK_TT_JURNAL_KURS @IdSupplier = ?', [$supplier]);

                if ($kursCheck[0]->adakurs > 0) {
                    if ($idUangSupp == 1) {
                        return response()->json(['question' => "Kode Supplier : $supplier MataUangnya harus $ !!... Ganti Dollar ????...."]);
                    } else {
                        return response()->json(['error' => "Kode Supplier : $supplier MataUangnya harus Rp, Hubungi EDP!!.."]);
                    }
                }

                $saldoCheck = DB::connection('ConnAccounting')
                    ->select('exec SP_1273_ACC_CHECK_TT_SALDOSUPP @IdSupplier = ?', [$supplier]);

                if ($saldoCheck[0]->aDA > 0) {
                    // Insert transaction and update balances based on the conditions

                    if ($idUangSupp == 1) { // Supplier = Rp
                        if ($idUangByr == 1) { // Bayar = Rp
                            DB::connection('ConnAccounting')->statement('exec SP_1273_ACC_INS_TT_TRANSAKSI_SUPPLIER @Id_TypeTransaksi = ?, @Tanggal = ?, @Id_Supplier = ?, @Detail = ?, @Id_Mata_Uang = ?, @Nilai_Debet = ?, @Nilai_Kredit = ?, @Kurs = ?, @Referensi = ?, @User_Input = ?', [
                                2,
                                $item['Tgl_Input'],  // Corresponds to SubItems[1]
                                $supplier,
                                $bkk,
                                $item['Id_MataUang'], // Corresponds to SubItems[5]
                                0,
                                floatval(str_replace(',', '', $item['NilaiRincian'])), // Remove commas
                                1,
                                $bkk,
                                trim(Auth::user()->NomorUser),
                            ]);

                            DB::connection('ConnAccounting')->statement('exec SP_1273_ACC_TT_HITUNGSALDO_RP_SUPPLIER @IdBKK = ?', [$bkk]);
                        } else {
                            // Add logic if Bayar = $
                        }
                    } else { // Supplier = $
                        $kursIsiCheck = DB::connection('ConnAccounting')
                            ->select('exec SP_1273_ACC_CHECK_TT_TRANS_SUPP_RP @IdBKK = ?', [$bkk]);

                        if ($kursIsiCheck[0]->Ada > 0) {
                            // Proceed with further checks and inserts for suppliers with currency $
                            DB::connection('ConnAccounting')->statement('exec SP_1273_ACC_INS_TT_TRANS_SUPP_BKK2 @Id_TypeTransaksi = ?, @Tanggal = ?, @Id_Supplier = ?, @Detail = ?, @Id_Mata_Uang = ?, @Nilai_Debet = ?, @Nilai_Kredit = ?, @Kurs = ?, @Referensi = ?, @User_Input = ?, @Uang_Bayar = ?', [
                                2,
                                $item['Tgl_Input'],  // Corresponds to SubItems[1]
                                $supplier,
                                $bkk,
                                $item['Id_MataUang'], // Corresponds to SubItems[5]
                                0,
                                floatval(str_replace(',', '', $item['NilaiRincian'])), // Remove commas
                                5,
                                $bkk,
                                trim(Auth::user()->NomorUser),
                                $idUangByr
                            ]);

                            DB::connection('ConnAccounting')->statement('exec SP_1273_ACC_TT_HITUNGSALDO_DOLLAR_SUPPLIER @InIdBKK = ?', [$bkk]);
                        } else {
                            // Further logic based on $ currency checks
                        }
                    }

                    return response()->json(['message' => 'Data sudah diPROSES !!..untuk BKK = ' . trim($bkk)]);
                } else {
                    return response()->json(['error' => 'Hubungi Edp untuk Saldo Hutang Supplier = ' . trim($supplier)]);
                }
            } else {
                return response()->json(['error' => 'Tidak Ada Data yang diPROSES !!..'], 200);
            }
        } else if ($id == 'prosesDollar') {
            $adaProses = false;
            $jmlDt = 0;

            $listLunas = $request->input('rowDataArray');
            // dd($listLunas);

            foreach ($listLunas as $index => $item) {
                if (!empty($item['Id_BKK'])) {
                    $adaProses = true;
                    $jmlDt++;

                    $brsLns = $index;
                    $supplier = $item['Id_Supplier'];   // Corresponds to SubItems[6]
                    $idUangSupp = $item['IdUang_Supp']; // Corresponds to SubItems[9]
                    $idUangByr = $item['IdUangTagih'];  // Corresponds to SubItems[7]
                    $bkk = $item['Id_BKK'];             // Corresponds to SubItems[2]
                }
            }
            $saldoCheck = DB::connection('ConnAccounting')
                ->select('exec SP_1273_ACC_CHECK_TT_SALDOSUPP @IdSupplier = ?', [$supplier]);

            if ($saldoCheck[0]->aDA > 0) {
                // Insert transaction and update balances based on the conditions

                if ($idUangSupp == 1) { // Supplier = Rp
                    if ($idUangByr == 1) { // Bayar = Rp
                        DB::connection('ConnAccounting')->statement('exec SP_1273_ACC_INS_TT_TRANSAKSI_SUPPLIER @Id_TypeTransaksi = ?, @Tanggal = ?, @Id_Supplier = ?, @Detail = ?, @Id_Mata_Uang = ?, @Nilai_Debet = ?, @Nilai_Kredit = ?, @Kurs = ?, @Referensi = ?, @User_Input = ?', [
                            2,
                            $item['Tgl_Input'],  // Corresponds to SubItems[1]
                            $supplier,
                            $bkk,
                            $item['Id_MataUang'], // Corresponds to SubItems[5]
                            0,
                            floatval(str_replace(',', '', $item['NilaiRincian'])), // Remove commas
                            1,
                            $bkk,
                            trim(Auth::user()->NomorUser),
                        ]);

                        DB::connection('ConnAccounting')->statement('exec SP_1273_ACC_TT_HITUNGSALDO_RP_SUPPLIER @IdBKK = ?', [$bkk]);
                    } else {
                        // Add logic if Bayar = $
                    }
                } else { // Supplier = $
                    $kursIsiCheck = DB::connection('ConnAccounting')
                        ->select('exec SP_1273_ACC_CHECK_TT_TRANS_SUPP_RP @IdBKK = ?', [$bkk]);

                    if ($kursIsiCheck[0]->Ada > 0) {
                        // Proceed with further checks and inserts for suppliers with currency $
                        DB::connection('ConnAccounting')->statement('exec SP_1273_ACC_INS_TT_TRANS_SUPP_BKK2 @Id_TypeTransaksi = ?, @Tanggal = ?, @Id_Supplier = ?, @Detail = ?, @Id_Mata_Uang = ?, @Nilai_Debet = ?, @Nilai_Kredit = ?, @Kurs = ?, @Referensi = ?, @User_Input = ?, @Uang_Bayar = ?', [
                            2,
                            $item['Tgl_Input'],  // Corresponds to SubItems[1]
                            $supplier,
                            $bkk,
                            $item['Id_MataUang'], // Corresponds to SubItems[5]
                            0,
                            floatval(str_replace(',', '', $item['NilaiRincian'])), // Remove commas
                            5,
                            $bkk,
                            trim(Auth::user()->NomorUser),
                            $idUangByr
                        ]);

                        DB::connection('ConnAccounting')->statement('exec SP_1273_ACC_TT_HITUNGSALDO_DOLLAR_SUPPLIER @InIdBKK = ?', [$bkk]);
                    } else {
                        // Further logic based on $ currency checks
                    }
                }

                return response()->json(['message' => 'Data sudah diPROSES !!..untuk BKK = ' . trim($bkk)]);
            } else {
                return response()->json(['error' => 'Hubungi Edp untuk Saldo Hutang Supplier = ' . trim($supplier)]);
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
