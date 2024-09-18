<?php

namespace App\Http\Controllers\Accounting\Piutang\BKMCashAdvance;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class CreateBKMController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Piutang.BKMCashAdvance.CreateBKM', compact('access'));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {

    }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        if ($id == 'getPelunasan') {

            // Execute the stored procedure
            $pelunasanResults = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_LIST_CASH_ADV @bln = ?, @thn = ?', [
                    $request->input('bulan'),
                    $request->input('tahun')
                ]);

            // dd($pelunasanResults);

            $response = [];
            $j = 0;

            foreach ($pelunasanResults as $row) {
                $j++;
                $response[] = [
                    'Tgl_Pelunasan' => \Carbon\Carbon::parse($row->Tgl_Pelunasan)->format('m/d/Y'),
                    'Id_Pelunasan' => $row->Id_Pelunasan,
                    'Id_bank' => $row->Id_bank ?? '',
                    'Jenis_Pembayaran' => $row->Jenis_Pembayaran ?? '',
                    'Nama_MataUang' => $row->Nama_MataUang,
                    'Nilai_Pelunasan' => number_format($row->Nilai_Pelunasan, 2, '.', ','),
                    'No_Bukti' => $row->No_Bukti ?? '',
                    // 'TglInput' => \Carbon\Carbon::parse($row->TglInput)->format('m/d/Y'),
                    // 'KodePerkiraan' => $row->KodePerkiraan ?? '',
                    'TglInput' => "",
                    'KodePerkiraan' => '',
                    'Uraian' => $row->Uraian ?? ''
                ];
            }

            if ($j == 0) {
                return response()->json(['message' => 'Tidak Ada Uang Muka'], 200);
            }

            return datatables($response)->make(true);
        } else if ($id == 'getBankDetails') {
            if ($request->input('idBank') !== null) {
                // Execute the stored procedure to get bank details
                $bankResults = DB::connection('ConnAccounting')
                    ->select('exec SP_5298_ACC_LIST_BANK_2 @idBank = ?', [
                        trim($request->input('idBank'))
                    ]);
                // dd($bankResults);
                if (count($bankResults) > 0) {
                    $bankData = $bankResults[0];

                    $response = [
                        'Jenis' => trim($bankData->jenis),
                        'Nama' => trim($bankData->Nama)
                    ];

                    return response()->json($response, 200);
                } else {
                    return response()->json(['message' => 'Bank not found'], 404);
                }
            } else {
                return response()->json(['message' => 'Invalid Bank ID'], 400);
            }
        } else if ($id == 'getPerkiraan') {
            // dd($request->all());
            if ($request->has('IdPerkiraan')) {
                $perkiraanResults = DB::connection('ConnAccounting')
                    ->select('exec SP_5298_ACC_LIST_KODE_PERKIRAAN @Kode = 2, @IdPerkiraan = ?', [
                        $request->input('IdPerkiraan')
                    ]);

                if ($perkiraanResults && count($perkiraanResults) > 0) {
                    $result = $perkiraanResults[0];
                    $response = [
                        'Keterangan' => $result->Keterangan
                    ];

                    return response()->json($response);
                } else {
                    return response()->json(['message' => 'Data not found']);
                }
            } else {
                return response()->json(['message' => 'IdPerkiraan is required']);
            }
        } else if ($id == 'getBank') {
            // Retrieve list of banks (SP_5298_ACC_LIST_BANK)
            $bankResults = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_LIST_BANK');
            // dd($bankResults);
            $response = [];
            foreach ($bankResults as $bank) {
                $response[] = [
                    'Id_Bank' => $bank->Id_Bank,
                    'Nama_Bank' => $bank->Nama_Bank,
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getKodePerkiraan') {
            $kodePerkiraanResults = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_LIST_KODE_PERKIRAAN @Kode = ?', [1]);
            // dd($kodePerkiraanResults);
            // Prepare response data
            $response = [];
            foreach ($kodePerkiraanResults as $kodePerkiraan) {
                $response[] = [
                    'NoKodePerkiraan' => $kodePerkiraan->NoKodePerkiraan,
                    'Keterangan' => $kodePerkiraan->Keterangan,
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getListBKM') {
            // Eksekusi stored procedure SP_5298_ACC_LIST_BKM_CASHADV
            // dd($request->all());
            $results = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_LIST_BKM_CASHADV');
            // dd($results);
            // Inisialisasi variabel response dan indeks
            $response = [];
            $j = 0;

            // Proses hasil stored procedure
            foreach ($results as $row) {
                $j++;
                $response[] = [
                    'Tgl_Input' => \Carbon\Carbon::parse($row->Tgl_Input)->format('m/d/Y'),
                    'Id_BKM' => $row->Id_BKM,
                    'Nilai_Pelunasan' => number_format($row->Nilai_Pelunasan, 2, '.', ','),
                    'Terjemahan' => $row->Terjemahan,
                ];
            }

            // Kembalikan data dalam format yang dapat diproses oleh datatables
            return datatables($response)->make(true);
        } else if ($id == 'getOkBKM') {
            $tgl1 = $request->input('tgl_awalbkm');
            $tgl2 = $request->input('tgl_akhirbkm');

            $results = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_LIST_BKM_CASHADV_PERTGL @tgl1 = ?, @tgl2 = ?', [
                    $tgl1,
                    $tgl2
                ]);

            $response = [];
            $j = 0;

            foreach ($results as $row) {
                $j++;
                $response[] = [
                    'Tgl_Input' => \Carbon\Carbon::parse($row->Tgl_Input)->format('m/d/Y'),
                    'Id_BKM' => $row->Id_BKM,
                    'Nilai_Pelunasan' => number_format($row->Nilai_Pelunasan, 2, '.', ','),
                    'Terjemahan' => $row->Terjemahan
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getGroup') {
            // Migrated logic from CmdGroup_Click

            // Fetch and process selected records
            $selectedRows = $request->input('rowDataArray', []);
            dd($selectedRows);
            if (!empty($selectedRows)) {
                $brs = 1;
                $total = 0;
                $a = 0;

                foreach ($selectedRows as $index => $row) {
                    // Ensure required fields are not empty
                    if (!empty($row['SubItem8']) && !empty($row['SubItem7']) && !empty($row['SubItem2'])) {
                        // Processing logic, e.g. updating Tgl, bank, etc.
                        // $row['SubItem7'] is the date, $row['SubItem2'] is the bank, etc.

                        $idBank = $row['SubItem2']; // Logic to set IdBank depending on conditions
                        if ($idBank == 'KRR1') {
                            $idBank = 'KKM';
                        } elseif ($idBank == 'KRR2') {
                            $idBank = 'KI';
                        }

                        $total = (float) str_replace(',', '', $row['SubItem5']);
                        $uang = $row['SubItem4'];
                        $totalFormatted = number_format($total, 2, '.', ',');
                        $konversi = ($uang == 'RUPIAH') ? $this->convertToRupiah($totalFormatted) : $this->convertToDollar($totalFormatted);

                        // Call to stored procedure SP_5298_ACC_LIST_BANK_1
                        $bankResult = DB::connection('ConnAccounting')->select('exec SP_5298_ACC_LIST_BANK_1 @idBank = ?', [
                            trim($idBank)
                        ]);

                        if (!empty($bankResult)) {
                            $jenis = trim($bankResult[0]->jenis);
                        }

                        // Call to stored procedure SP_5409_ACC_COUNTER_BKM_BKK
                        $bkmResult = DB::connection('ConnAccounting')->select('exec SP_5409_ACC_COUNTER_BKM_BKK @bank = ?, @jenis = ?, @tgl = ?', [
                            $idBank,
                            'R', // Assuming the type is 'R'
                            \Carbon\Carbon::parse($row['SubItem7'])->format('Y-m-d')
                        ]);

                        $id = $bkmResult[0]->id ?? null;
                        $id1 = substr($id, 0, 3);
                        $idbkm = (int) $id1;

                        // Insert into T_Pelunasan via SP_5298_ACC_INSERT_BKM_TPELUNASAN
                        DB::connection('ConnAccounting')->statement('exec SP_5298_ACC_INSERT_BKM_TPELUNASAN @idBKM = ?, @tglinput = ?, @userinput = ?, @terjemahan = ?, @nilaipelunasan = ?, @IdBank = ?', [
                            $id,
                            \Carbon\Carbon::parse($row['SubItem7'])->format('Y-m-d'),
                            auth()->user()->id, // Assuming you are using Laravel's Auth for user
                            $konversi,
                            $total,
                            $idBank
                        ]);

                        // Update T_Pelunasan_Tagihan via SP_5298_ACC_UPDATE_IDBKM_1
                        DB::connection('ConnAccounting')->statement('exec SP_5298_ACC_UPDATE_IDBKM_1 @idpelunasan = ?, @idBKM = ?, @idBank = ?, @kode = ?', [
                            $row['SubItem1'],
                            $id,
                            $idBank,
                            $row['SubItem8']
                        ]);

                        // Optionally update status for BG or CEK
                        if (in_array($row['SubItem3'], ['BG', 'CEK'])) {
                            DB::connection('ConnAccounting')->statement('exec SP_5298_ACC_UPDATE_STATUSBAYAR @idpelunasan = ?', [
                                $row['SubItem1']
                            ]);
                        }

                        // Return success message after processing
                        return response()->json(['message' => 'Data BKM With No.' . $id . ' Saved Successfully']);
                    } else {
                        return response()->json(['message' => 'Please fill in the Tgl Pembuatan BKM and Id.Bank'], 400);
                    }
                }
            } else {
                return response()->json(['message' => 'Please select pelunasan data to group'], 400);
            }
        }
    }

    // Show the form for editing the specified resource.
    public function edit($id)
    {

    }

    //Update the specified resource in storage.
    public function update(Request $request)
    {

    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
