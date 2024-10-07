<?php

namespace App\Http\Controllers\Accounting\Piutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Auth;

class BKMBKKPembulatanController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Piutang.BKMBKKPembulatan', compact('access'));
    }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        if ($id == 'getBank') {
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
        } else if ($id == 'getBKM') {
            $kode = 1;
            $bulan = $request->input('bulan');
            $tahun = $request->input('tahun');

            $bkmResults = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_LIST_BKM_PEMBULATAN @kode = ?, @bln = ?, @thn = ?', [$kode, $bulan, $tahun]);
            // dd($bkmResults);
            $response = [];
            $index = 0;

            if (!empty($bkmResults)) {
                foreach ($bkmResults as $bkm) {
                    $index++;
                    $response[] = [
                        'Tgl_Input' => \Carbon\Carbon::parse($bkm->Tgl_Input)->format('m/d/Y'),
                        'Id_BKM' => $bkm->Id_BKM,
                        'Total' => number_format($bkm->Total, 2, '.', ','),
                    ];
                }
            }

            return datatables($response)->make(true);
        } else if ($id == 'getBKMDetails') {
            $kode = 2;
            $idBKM = trim($request->input('idBKM'));
            // dd($idBKM);
            // Execute the stored procedure
            $bkmDetails = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_LIST_BKM_PEMBULATAN @kode = ?, @idBKM = ?', [$kode, $idBKM]);
            // dd($bkmDetails);
            // Prepare the response array for DataTables
            $response = [];
            foreach ($bkmDetails as $detail) {
                $response[] = [
                    'NamaCust' => $detail->NamaCust,
                    'No_Bukti' => $detail->No_Bukti,
                    'ID_Penagihan' => $detail->ID_Penagihan,
                    'MataUang' => $detail->MataUang,
                    'Rincian' => number_format($detail->Rincian, 2, '.', ','), // Format as ###,###,##0.00
                    'Id_bank' => $detail->Id_bank,
                    'Jenis_Bank' => $detail->Jenis_Bank,
                    'Id_MataUang' => $detail->Id_MataUang,
                ];
            }

            // dd($response);

            return datatables($response)->make(true);
        } else if ($id == 'getPembulatan') {
            $results = DB::connection('ConnAccounting')->select('exec SP_5298_ACC_LIST_BKK_DP');
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
        } else if ($id == 'getOkBKM') {
            // Extract the parameters from the request
            $tgl1 = $request->input('tgl_awalbkk');
            $tgl2 = $request->input('tgl_akhirbkk');
            // dd($tgl1, $tgl2);
            $results = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_LIST_BKK_DP_PERTGL ?, ?', [$tgl1, $tgl2]);
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
            $cetak = true;
            $brs = 0;
            $idArray = [];
            // $tes = trim($request->input('bkm'));
            // dd($tes);


            $results = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_GET_FIELD_IDPELUNASAN @idBKM = ?', [trim($request->input('bkm'))]);

            foreach ($results as $row) {
                $brs++;
                $idArray[$brs] = $row->Id_Pelunasan;
            }

            // $idP = $idArray[1];
            // dd($idP);

            $ada = false;

            if ($brs != 0) {
                foreach ($idArray as $idPelunasan) {
                    $resultCount = DB::connection('ConnAccounting')
                        ->select('exec SP_5298_ACC_COUNT_IDPELUNASAN @idpelunasan = ?', [$idPelunasan]);

                    if (!empty($resultCount) && $resultCount[0]->ada > 0) {
                        $ada = true;
                        break;
                    }
                }
            }

            $sno = $ada
                ? DB::connection('ConnAccounting')
                ->select("SELECT * FROM VW_PRG_5298_ACC_CETAK_BKM_TUNAI WHERE Id_BKM = ?", [trim($request->input('bkm'))])
                : DB::connection('ConnAccounting')
                ->select("SELECT * FROM VW_PRG_5298_ACC_CETAK_BKM_TUNAI_1 WHERE Id_BKM = ?", [trim($request->input('bkm'))]);

            // dd($sno);

            // $reportType = $ada ? 5 : 4;

            // Tampilkan laporan sesuai kriteria yang ditentukan
            // Disesuaikan dengan mekanisme pencetakan laporan di Laravel
            // Misalnya menggunakan library reporting atau mencetak langsung

            DB::connection('ConnAccounting')
                ->statement('exec SP_5298_ACC_UPDATE_TGLCETAK_BKM @idBKM = ?', [trim($request->input('bkm'))]);
            // dd($sno);
            return response()->json([
                'data' => $sno,
                'message' => 'Laporan telah dicetak dengan sukses'
            ]);
            // return response()->json(['message' => 'Laporan telah dicetak dengan sukses']);
            // return response()->json(['message' => 'Laporan telah dicetak dengan sukses', 'reportType' => $reportType, 'kriteria' => $sno]);

        } else if ($id === 'getUraian') {
            $bank = $request->input('id_bank1');
            $tanggal = $request->input('tanggal');

            $tahun = date('Y', strtotime($tanggal));
            $noUrut = 0;
            $ada = 0;
            $idBKM = '';
            $id_BKK = '';

            $ada = DB::connection('ConnAccounting')->table('T_COUNTER_BKK')
                ->where('Periode', $tahun)
                ->count();

            if ($ada === 1) {
                // Logic if record exists
                $noUrut = DB::connection('ConnAccounting')->table('T_COUNTER_BKK')
                    ->where('Periode', $tahun)
                    ->value('Id_BKK_E_Rp');
            } elseif ($ada === 0) {
                // Logic if no record exists
                $noUrut = 1;

                DB::connection('ConnAccounting')->table('T_COUNTER_BKK')->insert([
                    'Periode' => $tahun,
                    'Id_BKK_E_Rp' => $noUrut,
                ]);
            }

            // Generate the IdBKK
            $id_BKK = '00000' . (string) $noUrut; // pad with leading zeros
            $id_BKK = $bank . '-P' . substr($tahun, -2) . substr($id_BKK, -5); // format IdBKK

            // Update T_COUNTER_BKK to increment Id_BKK_E_Rp
            DB::connection('ConnAccounting')->table('T_COUNTER_BKK')
                ->where('Periode', $tahun)
                ->update(['Id_BKK_E_Rp' => $noUrut + 1]);

            // Return IdBKK
            // dd($id_BKK);
            return response()->json(['IdBKK' => $id_BKK]);
        }
    }

    // Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request) {}

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
