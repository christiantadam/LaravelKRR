<?php

namespace App\Http\Controllers\MultipleProgram;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class ACCPermohonanKonversiPotongController extends Controller
{
    public function index()
    {

    }
    public function create()
    {
        // Fetch the Potong data
        $listPotong = DB::connection('ConnInventory')
            ->select('exec SP_4384_JBB_Konversi_Potong1 @XKode = 1');
        // Convert the data into an array that DataTables can consume
        $dataPotong = [];
        foreach ($listPotong as $Potong) {
            $dataPotong[] = [
                'idkonversi' => $Potong->idkonversi,
                'NamaUser' => $Potong->NamaUser,
                'TimeInput' => $Potong->SaatAwalTransaksi,
            ];
        }
        return datatables($dataPotong)->make(true);
    }
    public function store(Request $request)
    {
        //
    }
    public function show($id, Request $request)
    {
        if ($id == 'AccJBBPotong') {
            $access = (new HakAksesController)->HakAksesFiturMaster('Jumbo Bag');
            return view('MultipleProgram.ACCPermohonanKonversiPotong', compact('access'));
        } else if ($id == 'getDataKonversi') {
            $data = DB::connection('ConnInventory')->select('exec SP_4384_JBB_Konversi_Potong1 @XKode = ?, @XIdKonversi = ?', [2, (string) $request->input('idKonversi')]);
            return response()->json($data);
        }
    }
    public function edit($id)
    {
        //
    }
    public function update(Request $request, $id)
    {
        // untuk ACC perlu pengecekan transaksi penyesuaian, kemudian cek saldo apakah cukup atau tidak
        if ($id == 'ACCDataKonversi') {
            try {
                $idType = '';
                $idKonversi = implode(',', $request->input('idKonversi'));
                $cekPenyesuaian = DB::connection('ConnInventory')->select('exec SP_4384_JBB_Konversi_Potong1 @XKode = ?, @XIdKonversi = ?', [3, $idKonversi]);
                if (!empty($cekPenyesuaian)) {
                    foreach ($cekPenyesuaian as $itemcekPenyesuaian) {
                        $idType .= $itemcekPenyesuaian['IdType'] . ', '; // Concatenate IdType with a comma
                    }

                    // Remove the trailing comma and space
                    $idType = rtrim($idType, ', ');
                    return response()->json(['error' => (string) 'Terdapat transaksi penyesuaian untuk Id Type berikut: ' . $idType]);
                }

                $cekSaldo = DB::connection('ConnInventory')->select('exec SP_4384_JBB_Konversi_Potong1 @XKode = ?, @XIdKonversi = ?', [4, $idKonversi]);

                // Initialize an empty array to store grouped results by IdType
                $groupedResults = [];

                // Iterate through each item in the $cekSaldo array
                foreach ($cekSaldo as $item) {
                    $idTypecekSaldo = $item->IdType;

                    // Initialize the IdType in the groupedResults array if it doesn't exist
                    if (!isset($groupedResults[$idTypecekSaldo])) {
                        $groupedResults[$idTypecekSaldo] = [
                            'JumlahPengeluaranPrimer' => 0,
                            'JumlahPengeluaranSekunder' => 0,
                            'JumlahPengeluaranTritier' => 0,
                            'SaldoPrimer' => 0,
                            'SaldoSekunder' => 0,
                            'SaldoTritier' => 0,
                        ];
                    }

                    // Convert values to float and accumulate them
                    $groupedResults[$idTypecekSaldo]['JumlahPengeluaranPrimer'] += (float) $item->JumlahPengeluaranPrimer;
                    $groupedResults[$idTypecekSaldo]['JumlahPengeluaranSekunder'] += (float) $item->JumlahPengeluaranSekunder;
                    $groupedResults[$idTypecekSaldo]['JumlahPengeluaranTritier'] += (float) $item->JumlahPengeluaranTritier;
                }

                // Compare grouped results with Saldo values and collect IdType and IdTransaksi
                $exceedingEntries = [];
                foreach ($cekSaldo as $item) {
                    $idTypecekSaldo = $item->IdType;

                    // Convert Saldo values to float for comparison
                    $saldoPrimer = (float) $item->SaldoPrimer;
                    $saldoSekunder = (float) $item->SaldoSekunder;
                    $saldoTritier = (float) $item->SaldoTritier;

                    // Check if any grouped JumlahPengeluaran is greater than its corresponding Saldo
                    if (
                        $groupedResults[$idTypecekSaldo]['JumlahPengeluaranPrimer'] > $saldoPrimer ||
                        $groupedResults[$idTypecekSaldo]['JumlahPengeluaranSekunder'] > $saldoSekunder ||
                        $groupedResults[$idTypecekSaldo]['JumlahPengeluaranTritier'] > $saldoTritier
                    ) {
                        // Add the IdType and IdTransaksi to the result array
                        $exceedingEntries[] = [
                            'IdType' => $idTypecekSaldo,
                            'IdKonversi' => $item->idkonversi
                        ];
                    }
                }
                if (!empty($exceedingEntries)) {
                    foreach ($exceedingEntries as $itemExceedingEntries) {
                        $idType .= $itemExceedingEntries['IdType'] . ', '; // Concatenate IdType with a comma
                    }

                    // Remove the trailing comma and space
                    $idType = rtrim($idType, ', ');
                    return response()->json(['error' => (string) 'Saldo tidak cukup untuk Id Type berikut: ' . $idType]);
                }

                $dataTmpTransaksi = DB::connection('ConnInventory')->select('exec SP_4384_JBB_Konversi_Potong1 @XKode = ?, @XIdKonversi = ?', [5, $idKonversi]);

                //foreach $dataTmpTransaksi
                foreach ($dataTmpTransaksi as $item) {
                    DB::connection('ConnInventory')->statement('exec SP_1273_INV_PROSES_ACC_KONVERSI @XIdTransaksi = ?,
                        @XIdType = ?,
                        @XUserACC = ?,
                        @XWaktuACC = ?,
                        @XKeluarPrimer = ?,
                        @XKeluarSekunder = ?,
                        @XKeluarTritier = ?,
                        @XMasukPrimer = ?,
                        @XMasukSekunder = ?,
                        @XMasukTritier = ?',
                        [
                            $item->IdTransaksi,
                            $item->IdType,
                            trim(Auth::user()->NomorUser),
                            Carbon::now()->format('Y-m-d'),
                            (float) $item->JumlahPengeluaranPrimer,
                            (float) $item->JumlahPengeluaranSekunder,
                            (float) $item->JumlahPengeluaranTritier,
                            (float) $item->JumlahPemasukanPrimer,
                            (float) $item->JumlahPemasukanSekunder,
                            (float) $item->JumlahPemasukanTritier
                        ]
                    );
                }

                return response()->json(['success' => (string) 'Data Konversi ' . $idKonversi . ' Berhasil DiACC'], 200);
            } catch (Exception $e) {
                return response()->json(['error' => (string) 'Proses ACC Konversi Gagal', 'data' => $e]);
            }
        }
    }
    public function destroy($id, Request $request)
    {
        if ($id == 'BatalACCDataKonversi') {
            try {
                $idKonversi = $request->input('idKonversi');
                DB::connection('ConnInventory')->statement('exec SP_4384_JBB_Konversi_Potong1 @XKode = ?, @XIdKonversi = ?', [6, $idKonversi]);
                return response()->json(['success' => (string) 'Data Konversi ' . $idKonversi . ' Berhasil Dihapus'], 200);
            } catch (Exception $e) {
                return response()->json(['error' => (string) 'Proses ACC Konversi Gagal', 'data' => $e]);
            }
        }
    }
}
