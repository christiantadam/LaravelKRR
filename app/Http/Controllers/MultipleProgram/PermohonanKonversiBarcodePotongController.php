<?php

namespace App\Http\Controllers\MultipleProgram;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use DB;
use Auth;
use DateTime;
use DateTimeZone;
use Carbon\Carbon;

class PermohonanKonversiBarcodePotongController extends Controller
{
    public function index()
    {
        //
    }

    public function create()
    {
        $listPotong = DB::connection('ConnInventory')->select('exec SP_4384_Konversi_Barcode_Potong @XKode = ?', [0]);
        // Convert the data into an array that DataTables can consume
        $dataPotong = [];
        foreach ($listPotong as $Potong) {
            $nomorIndeks = 1; // or any number
            $nomorIndeks9digit = sprintf('%09d', $Potong->NoIndeks);
            $dataPotong[] = [
                'idType' => $Potong->IdType,
                'NamaType' => $Potong->NamaType,
                'JumlahPengeluaranPrimer' => (string) $Potong->JumlahPengeluaranPrimer . ' ' . $Potong->satPrimer,
                'JumlahPengeluaranSekunder' => (string) $Potong->JumlahPengeluaranSekunder . ' ' . $Potong->satSekunder,
                'JumlahPengeluaranTritier' => (string) $Potong->JumlahPengeluaranTritier . ' ' . $Potong->satTritier,
                'idkonversi' => $Potong->idkonversi,
                'Barcode' => (string) $nomorIndeks9digit . '-' . $Potong->Kode_barang,
            ];
        }
        return datatables($dataPotong)->make(true);
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $jenisStore = $request->input('jenisStore');
        if ($jenisStore == 'permohonan') {
            $date = new DateTime("now", new DateTimeZone('Asia/Jakarta'));
            $nomorIndeksAsal = explode('-', $request->input('asalKonversiInputValues')[0][5])[0];
            $kodeBarangAsal = explode('-', $request->input('asalKonversiInputValues')[0][5])[1];
            $idSubKelompokAsal = $request->input('asalKonversiInputValues')[0][6];
            $id_typeAsal = $request->input('asalKonversiInputValues')[0][0];
            $pemakaian_primerAsal = $request->input('asalKonversiInputValues')[0][2];
            $pemakaian_sekunderAsal = $request->input('asalKonversiInputValues')[0][3];
            $pemakaian_tritierAsal = $request->input('asalKonversiInputValues')[0][4];
            $uraian_asal = "Asal Konversi Potongan JBB";
            $proses = $request->input('proses');

            $table_daftarTujuanKonversi = $request->input('table_daftarTujuanKonversi');
            // Initialize an array to store concatenated results for each index
            $concatenatedResults = [];

            // Get the number of sub-arrays
            $numberOfSubArrays = count($table_daftarTujuanKonversi);

            // Get the number of elements in each sub-array (assuming all sub-arrays have the same length)
            $numberOfElements = count($table_daftarTujuanKonversi[0]);

            // Loop through each index in the sub-arrays
            for ($i = 0; $i < $numberOfElements; $i++) {
                $tempArray = [];
                // Loop through each sub-array and collect the values at the current index
                for ($j = 0; $j < $numberOfSubArrays; $j++) {
                    $tempArray[] = $table_daftarTujuanKonversi[$j][$i];
                }
                $concatenatedResults[$i] = $tempArray;
            }
            // Accessing specific variables
            $IdTypeTujuan = $concatenatedResults[0];
            $SaldoPrimer = $concatenatedResults[2];
            $SaldoSekunder = $concatenatedResults[3];
            $SaldoTritier = $concatenatedResults[4];
            $IdSubKelompok = $concatenatedResults[5];
            $uraian_tujuan = "Tujuan Konversi Potongan JBB";

            switch ($proses) {
                case 1:
                    try {
                        // Asal
                        $currentIdKonvPotongJBB = DB::connection('ConnInventory')
                            ->table('Counter')->value('IdKonvPotongJBB');
                        $newIdKonvPotongJBB = $currentIdKonvPotongJBB + 1;
                        DB::connection('ConnInventory')
                            ->table('Counter')->update(['IdKonvPotongJBB' => $newIdKonvPotongJBB]);
                        $idkonversi = "JBB" . str_pad($newIdKonvPotongJBB, 6, "0", STR_PAD_LEFT);
                        DB::connection('ConnInventory')
                            ->statement('EXEC SP_4384_Konversi_Barcode_Potong
                    @XKode = ?,
                    @XIdTypeTransaksi = ?,
                    @XUraianDetailTransaksi = ?,
                    @XIdType = ?,
                    @XIdPenerima = ?,
                    @XIdPemberi = ?,
                    @XSaatAwalTransaksi = ?,
                    @XSaatLog = ?,
                    @XJumlahPengeluaranPrimer = ?,
                    @XJumlahPengeluaranSekunder = ?,
                    @XJumlahPengeluaranTritier = ?,
                    @XAsalIdSubkelompok = ?,
                    @XIdKonversi = ?,
                    @XTimeInput = ?,
                    @XStatus = ?,
                    @XNomorIndeks = ?,
                    @XKodeBarang = ?', [
                                9,
                                "28",
                                $uraian_asal,
                                $id_typeAsal,
                                trim(Auth::user()->NomorUser),
                                trim(Auth::user()->NomorUser),
                                Carbon::now()->format('Y-m-d'),
                                $date,
                                $pemakaian_primerAsal,
                                $pemakaian_sekunderAsal,
                                $pemakaian_tritierAsal,
                                $idSubKelompokAsal,
                                $idkonversi,
                                $date,
                                0,
                                $nomorIndeksAsal,
                                $kodeBarangAsal
                            ]);

                        // Tujuan
                        for ($k = 0; $k < count($IdTypeTujuan); $k++) {
                            DB::connection('ConnInventory')
                                ->statement('EXEC SP_4384_Konversi_Barcode_Potong
                        @XKode = ?,
                        @XIdTypeTransaksi = ?,
                        @XUraianDetailTransaksi = ?,
                        @XIdType = ?,
                        @XIdPenerima = ?,
                        @XIdPemberi = ?,
                        @XSaatAwalTransaksi = ?,
                        @XSaatLog = ?,
                        @XJumlahMasukPrimer = ?,
                        @XJumlahMasukSekunder = ?,
                        @XJumlahMasukTritier = ?,
                        @XTujuanIdSubKel = ?,
                        @XIdKonversi = ?,
                        @XTimeInput = ?,
                        @XStatus = ?', [
                                    9,
                                    "28",
                                    $uraian_tujuan,
                                    $id_typeAsal,
                                    trim(Auth::user()->NomorUser),
                                    trim(Auth::user()->NomorUser),
                                    Carbon::now()->format('Y-m-d'),
                                    $date,
                                    $SaldoPrimer[$k],
                                    $SaldoSekunder[$k],
                                    $SaldoTritier[$k],
                                    $IdSubKelompok[$k],
                                    $idkonversi,
                                    $date,
                                    0,
                                ]);
                        }
                        return response()->json(['success' => 'Data sudah diSIMPAN !!..']);
                    } catch (Exception $e) {
                        return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
                    }
            }
        } elseif ($jenisStore == 'accPermohonan') {
            try {
                $idkonversi = $request->input('idkonversi');
                $nomorUser = trim(Auth::user()->NomorUser);
                DB::connection('ConnInventory')
                    ->statement('EXEC SP_4384_Konversi_Barcode_Potong @XKode = ?, @XIdKonversi = ?, @XKdUser = ?', [10, $idkonversi, $nomorUser]);
                return response()->json(['success' => (string)'Permohonan konversi dengan Id Konversi: '.$idkonversi.' berhasil disetujui!']);
            } catch (Exception $e) {
                return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
            }
        }
    }

    public function show($id, Request $request)
    {
        if ($id == 'JBBPotong') {
            $access = (new HakAksesController)->HakAksesFiturMaster('Jumbo Bag');
            $nomorUser = trim(Auth::user()->NomorUser);
            $divisi = DB::connection('ConnInventory')
                ->select('exec SP_4384_Konversi_Barcode_Potong @XKdUser = ?, @XKode = ?', [$nomorUser, 1]);
            return view('MultipleProgram.PermohonanKonversiPotongBarcode', compact('access', 'id', 'nomorUser', 'divisi'));
        } else if ($id == 'ABMPotong') {
            $access = (new HakAksesController)->HakAksesFiturMaster('ABM');
            return view('MultipleProgram.PermohonanKonversiPotongBarcode', compact('access', 'id'));
        } else if ($id == 'ADSPotong') {
            $access = (new HakAksesController)->HakAksesFiturMaster('ADStar');
            return view('MultipleProgram.PermohonanKonversiPotongBarcode', compact('access', 'id'));
        } else if ($id == 'getDataAsalKonversi') {
            $nomorIndeksBarangAsal = $request->input('nomorIndeksBarangAsal');
            $kodeBarangAsal = $request->input('kodeBarangAsal');
            // 000000001-000140864
            // 000000002-000140864
            // 000000003-000140864
            // 000000004-000140864
            try {
                $dataBarcode = DB::connection('ConnInventory')->select('EXEC SP_4384_Konversi_Barcode_Potong @XKode = ?, @XKodeBarang = ?, @XNomorIndeks = ?', [8, $kodeBarangAsal, $nomorIndeksBarangAsal]);
                if (!str_contains($dataBarcode[0]->NamaDivisi, 'Jumbo Bag')) {
                    return response()->json(['error' => (string) "Barcode yang dimasukkan milik divisi " . $dataBarcode[0]->NamaDivisi]);
                }
                return response()->json(['success' => $dataBarcode]);
            } catch (Exception $e) {
                if ($e->getMessage() == 'Undefined array key 0') {
                    return response()->json(['error' => (string) "Terjadi Kesalahan, Data Barcode Tidak Ditemukan!"]);
                }
                return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
            }
        } else if ($id == 'getObjek') {
            $UserInput = trim(Auth::user()->NomorUser);
            $idDivisi = $request->input('idDivisi');
            $objekConn = DB::connection('ConnInventory')
                ->select('exec SP_4384_Konversi_Barcode_Potong @XKdUser = ?, @XKode = ?, @XIdDivisi = ?', [$UserInput, 2, $idDivisi]);

            return response()->json($objekConn);
        } else if ($id == 'getKelompokUtama') {
            $UserInput = trim(Auth::user()->NomorUser);
            $idObjek = $request->input('idObjek');
            $KelompokUtamaConn = DB::connection('ConnInventory')
                ->select('exec SP_4384_Konversi_Barcode_Potong @XKode = ?, @XIdObjek = ?', [3, $idObjek]);

            return response()->json($KelompokUtamaConn);
        } else if ($id == 'getKelompok') {
            $UserInput = trim(Auth::user()->NomorUser);
            $idKelompokUtama = $request->input('idKelompokUtama');
            $KelompokConn = DB::connection('ConnInventory')
                ->select('exec SP_4384_Konversi_Barcode_Potong @XKode = ?, @XIdKelompokUtama = ?', [4, $idKelompokUtama]);

            return response()->json($KelompokConn);
        } else if ($id == 'getSubKelompok') {
            $UserInput = trim(Auth::user()->NomorUser);
            $idKelompok = $request->input('idKelompok');
            $SubKelompokConn = DB::connection('ConnInventory')
                ->select('exec SP_4384_Konversi_Barcode_Potong @XKode = ?, @XIdKelompok = ?', [5, $idKelompok]);

            return response()->json($SubKelompokConn);
        } else if ($id == 'getType') {
            $UserInput = trim(Auth::user()->NomorUser);
            $idSubKelompok = $request->input('idSubKelompok');
            $TypeConn = DB::connection('ConnInventory')
                ->select('exec SP_4384_Konversi_Barcode_Potong @XKode = ?, @XIdSubKelompok = ?', [6, $idSubKelompok]);

            return response()->json($TypeConn);
        } else if ($id == 'getDataType') {
            $UserInput = trim(Auth::user()->NomorUser);
            $IdType = $request->input('IdType');
            $TypeConn = DB::connection('ConnInventory')
                ->select('exec SP_4384_Konversi_Barcode_Potong @XKode = ?, @XIdType = ?', [7, (string) $IdType]);

            return response()->json($TypeConn);
        }
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
