<?php

namespace App\Http\Controllers\MultipleProgram;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Carbon\Carbon;
use Log;
use Auth;
use DateTime;
use DateTimeZone;
use Illuminate\Support\Str;

class KonversiSetengahJadiController extends Controller
{
    public function index()
    {

    }

    public function create($id)
    {

    }

    public function getDataPermohonan($id)
    {
        if ($id == 'JBBPotong') {
            $idDivisi = 'JBB';
        } else if ($id == 'ABMStghJadi') {
            $idDivisi = 'ABM';
        } else if ($id == 'ADSStghJadi') {
            $idDivisi = 'ADS';
        }
        $listPotong = DB::connection('ConnInventory')->select('exec SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XIdDivisi = ?', [0, $idDivisi]);
        // Convert the data into an array that DataTables can consume

        $dataPotong = [];
        foreach ($listPotong as $Potong) {
            $dataPotong[] = [
                'IdTypeTujuan' => $Potong->IdType,
                'NamaTypeTujuan' => $Potong->NamaType,
                'HasilPrimer' => (string) (number_format($Potong->JumlahPemasukanPrimer, 2)) . ' ' . $Potong->satPrimer,
                'HasilSekunder' => (string) (number_format($Potong->JumlahPemasukanSekunder, 2)) . ' ' . $Potong->satSekunder,
                'HasilTritier' => (string) (number_format($Potong->JumlahPemasukanTritier, 2)) . ' ' . $Potong->satTritier,
                'idkonversi' => $Potong->idkonversi,
            ];
        }
        return datatables($dataPotong)->make(true);
    }

    public function store(Request $request)
    {
        $jenisStore = $request->input('jenisStore');
        $divisi = $request->input('divisi');
        $dateTime = new DateTime("now", new DateTimeZone('Asia/Jakarta'));
        $date = $dateTime->format('Y-m-d');
        if ($jenisStore == 'permohonan') {

            $tanggalKonversi = $request->input('tanggalKonversi');
            $shift = $request->input('shift');

            switch ($shift) {
                case 'P':
                    $shift = 'Pagi';
                    break;
                case 'S':
                    $shift = 'Siang';
                    break;
                case 'M':
                    $shift = 'Malam';
                    break;
            }
            $idTypeTujuan = $request->input('idTypeTujuan');
            $jumlah_pemasukanPrimer = $request->input('jumlah_pemasukanPrimer') ?? 0;
            $jumlah_pemasukanSekunder = $request->input('jumlah_pemasukanSekunder') ?? 0;
            $jumlah_pemasukanTritier = $request->input('jumlah_pemasukanTritier') ?? 0;
            $idSubkelompokTujuan = $request->input('idSubkelompokTujuan');
            if ($divisi == 'JBB') {
                try {
                    $kodeBarangSelect = $request->input('kodeBarangSelect');
                    $customerJBB = $request->input('customerJBB');
                    $uraianTujuan = (string) $shift . ", Tujuan Konversi Setengah Jadi " . $divisi . ' | ' . $customerJBB . ' | ' . $kodeBarangSelect . ' | | Inserted by: ' . trim(Auth::user()->NomorUser);
                    $table_daftarAsalKonversi = $request->input('table_daftarAsalKonversi');

                    // Initialize an array to store concatenated results for each index
                    $concatenatedResults = [];

                    // Get the number of sub-arrays
                    $numberOfSubArrays = count($table_daftarAsalKonversi);

                    // Get the number of elements in each sub-array (assuming all sub-arrays have the same length)
                    $numberOfElements = count($table_daftarAsalKonversi[0]);

                    // Loop through each index in the sub-arrays
                    for ($i = 0; $i < $numberOfElements; $i++) {
                        $tempArray = [];
                        // Loop through each sub-array and collect the values at the current index
                        for ($j = 0; $j < $numberOfSubArrays; $j++) {
                            $tempArray[] = $table_daftarAsalKonversi[$j][$i];
                        }
                        $concatenatedResults[$i] = $tempArray;
                    }
                    // Accessing specific variables
                    $IdTypeAsal = $concatenatedResults[5];
                    $kodeKomponen = $concatenatedResults[0];
                    $namaKomponen = $concatenatedResults[1];
                    $jumlah_pemakaianPrimer = $concatenatedResults[6];
                    $jumlah_pemakaianSekunder = $concatenatedResults[8];
                    $jumlah_pemakaianTritier = $concatenatedResults[10];
                    $IdSubKelompokAsal = $concatenatedResults[12]; // masih belum dikirim lewat table di javascript
                    // id konversi
                    // dd($table_daftarAsalKonversi, $concatenatedResults);
                    $currentIdKonvStghJdJBB = DB::connection('ConnInventory')
                        ->table('Counter')->value('IdKonvStghJdJBB');
                    $newIdKonvStghJdJBB = $currentIdKonvStghJdJBB + 1;
                    DB::connection('ConnInventory')
                        ->table('Counter')->update(['IdKonvStghJdJBB' => $newIdKonvStghJdJBB]);
                    $idkonversi = "JBJ" . str_pad($newIdKonvStghJdJBB, 6, "0", STR_PAD_LEFT);

                    // Asal Konversi
                    for ($k = 0; $k < count($IdTypeAsal); $k++) {
                        $uraianAsal = (string) $shift . ", Asal Konversi Setengah Jadi " . $divisi . ' | ' . $customerJBB . " | " . $kodeBarangSelect . ' | ' . $kodeKomponen[$k] . ' | Inserted by: ' . trim(Auth::user()->NomorUser);
                        DB::connection('ConnInventory')
                            ->statement('EXEC SP_4384_Konversi_Setengah_Jadi
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
                        @XStatus = ?', [
                                9,
                                "28",
                                $uraianAsal,
                                $IdTypeAsal[$k],
                                trim(Auth::user()->NomorUser),
                                trim(Auth::user()->NomorUser),
                                $tanggalKonversi,
                                $date,
                                $jumlah_pemakaianPrimer[$k] ?? 0,
                                $jumlah_pemakaianSekunder[$k] ?? 0,
                                $jumlah_pemakaianTritier[$k] ?? 0,
                                $IdSubKelompokAsal[$k],
                                $idkonversi,
                                $dateTime,
                                0
                            ]);
                    }
                    // Tujuan Konversi
                    DB::connection('ConnInventory')
                        ->statement('EXEC SP_4384_Konversi_Setengah_Jadi
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
                            $uraianTujuan,
                            $idTypeTujuan,
                            trim(Auth::user()->NomorUser),
                            trim(Auth::user()->NomorUser),
                            $tanggalKonversi,
                            $date,
                            $jumlah_pemasukanPrimer ?? 0,
                            $jumlah_pemasukanSekunder ?? 0,
                            $jumlah_pemasukanTritier ?? 0,
                            $idSubkelompokTujuan,
                            $idkonversi,
                            $dateTime,
                            0,
                        ]);
                    return response()->json(['success' => 'Data berhasil disimpan!']);
                } catch (Exception $e) {
                    return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
                }
            } elseif ($divisi == 'ABM') {
                $group = $request->input('group');
                $nomorOrderKerja = $request->input('nomorOrderKerja');
                $uraianAsal = (string) "Group " . $group . " " . $shift . ", Asal Konversi Setengah Jadi " . $divisi . ' | Id Order Kerja: ' . $nomorOrderKerja;
                $uraianTujuan = (string) "Group " . $group . " " . $shift . ", Tujuan Konversi Setengah Jadi " . $divisi . ' | Id Order Kerja: ' . $nomorOrderKerja;
                $id_typeAsal = $request->input('id_typeAsal');
                $pemakaian_primerAsal = $request->input('pemakaian_primerAsal') ?? 0;
                $pemakaian_sekunderAsal = $request->input('pemakaian_sekunderAsal') ?? 0;
                $pemakaian_tritierAsal = $request->input('pemakaian_tritierAsal') ?? 0;
                $idSubKelompokAsal = $request->input('idSubKelompokAsal');

                // id konversi
                $currentIdKonvStghJdABM = DB::connection('ConnInventory')
                    ->table('Counter')->value('IdKonvStghJdABM');
                $newIdKonvStghJdABM = $currentIdKonvStghJdABM + 1;
                DB::connection('ConnInventory')
                    ->table('Counter')->update(['IdKonvStghJdABM' => $newIdKonvStghJdABM]);
                $idkonversi = "ABJ" . str_pad($newIdKonvStghJdABM, 6, "0", STR_PAD_LEFT);

                // Asal Konversi
                DB::connection('ConnInventory')
                    ->statement('EXEC SP_4384_Konversi_Setengah_Jadi
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
                        @XStatus = ?', [
                        9,
                        "28",
                        $uraianAsal,
                        $id_typeAsal,
                        trim(Auth::user()->NomorUser),
                        trim(Auth::user()->NomorUser),
                        $tanggalKonversi,
                        $date,
                        $pemakaian_primerAsal ?? 0,
                        $pemakaian_sekunderAsal ?? 0,
                        $pemakaian_tritierAsal ?? 0,
                        $idSubKelompokAsal,
                        $idkonversi,
                        $dateTime,
                        0
                    ]);
                // Tujuan Konversi
                DB::connection('ConnInventory')
                    ->statement('EXEC SP_4384_Konversi_Setengah_Jadi
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
                        $uraianTujuan,
                        $idTypeTujuan,
                        trim(Auth::user()->NomorUser),
                        trim(Auth::user()->NomorUser),
                        $tanggalKonversi,
                        $date,
                        $jumlah_pemasukanPrimer ?? 0,
                        $jumlah_pemasukanSekunder ?? 0,
                        $jumlah_pemasukanTritier ?? 0,
                        $idSubkelompokTujuan,
                        $idkonversi,
                        $dateTime,
                        0,
                    ]);
            } elseif ($divisi == 'ADS') {
                $uraianAsal = (string) $shift . ", Asal Konversi Setengah Jadi " . $divisi;
                $uraianTujuan = (string) $shift . ", Tujuan Konversi Setengah Jadi " . $divisi;
                $id_typeAsal = $request->input('id_typeAsal');
                $pemakaian_primerAsal = $request->input('pemakaian_primerAsal') ?? 0;
                $pemakaian_sekunderAsal = $request->input('pemakaian_sekunderAsal') ?? 0;
                $pemakaian_tritierAsal = $request->input('pemakaian_tritierAsal') ?? 0;
                $idSubKelompokAsal = $request->input('idSubKelompokAsal');

                // id konversi
                $currentIdKonvStghJdADS = DB::connection('ConnInventory')
                    ->table('Counter')->value('IdKonvStghJdADS');
                $newIdKonvStghJdADS = $currentIdKonvStghJdADS + 1;
                DB::connection('ConnInventory')
                    ->table('Counter')->update(['IdKonvStghJdADS' => $newIdKonvStghJdADS]);
                $idkonversi = "ADJ" . str_pad($newIdKonvStghJdADS, 6, "0", STR_PAD_LEFT);

                // Asal Konversi
                DB::connection('ConnInventory')
                    ->statement('EXEC SP_4384_Konversi_Setengah_Jadi
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
                        @XStatus = ?', [
                        9,
                        "28",
                        $uraianAsal,
                        $id_typeAsal,
                        trim(Auth::user()->NomorUser),
                        trim(Auth::user()->NomorUser),
                        $tanggalKonversi,
                        $date,
                        $pemakaian_primerAsal ?? 0,
                        $pemakaian_sekunderAsal ?? 0,
                        $pemakaian_tritierAsal ?? 0,
                        $idSubKelompokAsal,
                        $idkonversi,
                        $dateTime,
                        0
                    ]);
                // Tujuan Konversi
                DB::connection('ConnInventory')
                    ->statement('EXEC SP_4384_Konversi_Setengah_Jadi
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
                        $uraianTujuan,
                        $idTypeTujuan,
                        trim(Auth::user()->NomorUser),
                        trim(Auth::user()->NomorUser),
                        $tanggalKonversi,
                        $date,
                        $jumlah_pemasukanPrimer ?? 0,
                        $jumlah_pemasukanSekunder ?? 0,
                        $jumlah_pemasukanTritier ?? 0,
                        $idSubkelompokTujuan,
                        $idkonversi,
                        $dateTime,
                        0,
                    ]);
            }
        } else if ($jenisStore == 'accPermohonan') {
            try {
                $idkonversi = $request->input('idkonversi');
                $nomorUser = trim(Auth::user()->NomorUser);
                $divisi = $request->input('divisi');
                DB::connection('ConnInventory')
                    ->statement('EXEC SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XIdKonversi = ?, @XKdUser = ?, @XIdDivisi = ?', [10, $idkonversi, $nomorUser, $divisi]);

                $barcode = DB::connection('ConnInventory')->select('EXEC SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XIdKonversi = ?', [14, $idkonversi]);

                return response()->json([
                    'success' => (string) 'Permohonan konversi dengan Id Konversi: ' . $idkonversi . ' berhasil disetujui!',
                    'barcode' => $barcode
                ]);
            } catch (Exception $e) {
                return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
            }
        } else if ($jenisStore == 'koreksiKonversi') {
            $tanggalKonversi = $request->input('tanggalKonversi');
            $shift = $request->input('shift');

            switch ($shift) {
                case 'P':
                    $shift = 'Pagi';
                    break;
                case 'S':
                    $shift = 'Siang';
                    break;
                case 'M':
                    $shift = 'Malam';
                    break;
            }
            $idTypeTujuan = $request->input('idTypeTujuan');
            $jumlah_pemasukanPrimer = $request->input('jumlah_pemasukanPrimer') ?? 0;
            $jumlah_pemasukanSekunder = $request->input('jumlah_pemasukanSekunder') ?? 0;
            $jumlah_pemasukanTritier = $request->input('jumlah_pemasukanTritier') ?? 0;
            $idSubkelompokTujuan = $request->input('idSubkelompokTujuan');
            $idTransaksiAsalKoreksi = $request->input('idTransaksiAsalKoreksi');
            $idTransaksiTujuanKoreksi = $request->input('idTransaksiTujuanKoreksi');
            if ($divisi == 'ABM') {
                $group = $request->input('group');
                $nomorOrderKerja = $request->input('nomorOrderKerja');
                $uraianAsal = (string) "Group " . $group . " " . $shift . ", Asal Konversi Setengah Jadi " . $divisi . ' | Id Order Kerja: ' . $nomorOrderKerja;
                $uraianTujuan = (string) "Group " . $group . " " . $shift . ", Tujuan Konversi Setengah Jadi " . $divisi . ' | Id Order Kerja: ' . $nomorOrderKerja;
                $id_typeAsal = $request->input('id_typeAsal');
                $pemakaian_primerAsal = $request->input('pemakaian_primerAsal') ?? 0;
                $pemakaian_sekunderAsal = $request->input('pemakaian_sekunderAsal') ?? 0;
                $pemakaian_tritierAsal = $request->input('pemakaian_tritierAsal') ?? 0;
                $idSubKelompokAsal = $request->input('idSubKelompokAsal');

                // id konversi
                $currentIdKonvStghJdABM = DB::connection('ConnInventory')
                    ->table('Counter')->value('IdKonvStghJdABM');
                $newIdKonvStghJdABM = $currentIdKonvStghJdABM + 1;
                DB::connection('ConnInventory')
                    ->table('Counter')->update(['IdKonvStghJdABM' => $newIdKonvStghJdABM]);
                $idkonversi = "ABJ" . str_pad($newIdKonvStghJdABM, 6, "0", STR_PAD_LEFT);

                // Asal Konversi
                DB::connection('ConnInventory')
                    ->statement('EXEC SP_4384_Konversi_Setengah_Jadi
                        @XKode = ?,
                        @XIdTransaksiTmp = ?,
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
                        @XStatus = ?', [
                        18,
                        $idTransaksiAsalKoreksi,
                        "28",
                        $uraianAsal,
                        $id_typeAsal,
                        trim(Auth::user()->NomorUser),
                        trim(Auth::user()->NomorUser),
                        $tanggalKonversi,
                        $date,
                        $pemakaian_primerAsal ?? 0,
                        $pemakaian_sekunderAsal ?? 0,
                        $pemakaian_tritierAsal ?? 0,
                        $idSubKelompokAsal,
                        $idkonversi,
                        $dateTime,
                        0
                    ]);
                // Tujuan Konversi
                DB::connection('ConnInventory')
                    ->statement('EXEC SP_4384_Konversi_Setengah_Jadi
                        @XKode = ?,
                        @XIdTransaksiTmp = ?,
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
                        18,
                        $idTransaksiTujuanKoreksi,
                        "28",
                        $uraianTujuan,
                        $idTypeTujuan,
                        trim(Auth::user()->NomorUser),
                        trim(Auth::user()->NomorUser),
                        $tanggalKonversi,
                        $date,
                        $jumlah_pemasukanPrimer ?? 0,
                        $jumlah_pemasukanSekunder ?? 0,
                        $jumlah_pemasukanTritier ?? 0,
                        $idSubkelompokTujuan,
                        $idkonversi,
                        $dateTime,
                        0,
                    ]);
            }
        }
    }

    public function show($id, Request $request)
    {
        $nomorUser = trim(Auth::user()->NomorUser);
        switch ($id) {
            case 'JBBStghJd':
                $access = (new HakAksesController)->HakAksesFiturMaster('Jumbo Bag');
                $divisi = DB::connection('ConnInventory')
                    ->select('exec SP_4384_Konversi_Setengah_Jadi @XKdUser = ?, @XKode = ?, @XIdDivisi = ?', [$nomorUser, 1, 'JBB']);
                return view('MultipleProgram.KonversiSetengahJadi', compact('access', 'id', 'nomorUser', 'divisi'));
            case 'ABMBrgJd':
                $access = (new HakAksesController)->HakAksesFiturMaster('ABM');
                $divisi = DB::connection('ConnInventory')
                    ->select('exec SP_4384_Konversi_Setengah_Jadi @XKdUser = ?, @XKode = ?, @XIdDivisi = ?', [$nomorUser, 1, 'ABM']);
                $NomorOk = DB::connection('ConnInventory')
                    ->select('exec SP_4384_Konversi_Setengah_Jadi @XKode = ?', [16]);
                return view('MultipleProgram.KonversiSetengahJadi', compact('access', 'id', 'nomorUser', 'divisi', 'NomorOk'));
            case 'ADSBrgJd':
                $access = (new HakAksesController)->HakAksesFiturMaster('AD Star');
                $divisi = DB::connection('ConnInventory')
                    ->select('exec SP_4384_Konversi_Setengah_Jadi @XKdUser = ?, @XKode = ?, @XIdDivisi = ?', [$nomorUser, 1, 'ADS']);
                return view('MultipleProgram.KonversiSetengahJadi', compact('access', 'id', 'nomorUser', 'divisi'));
            case 'selectCustomerTH':
                $customer_list = DB::connection('ConnJumboBag')->select('exec SP_1273_JBB_LIST_CUSTOMER');
                return response()->json($customer_list, 200);
            case 'selectKodeBarangTH':
                $kode_barangList = DB::connection('ConnJumboBag')->select('exec SP_1273_JBB_LIST_KDCUST_KDBRG @KodeCustomer = ?', [$request->input('Kode_Customer')]);
                return response()->json($kode_barangList, 200);
            case 'selectKomponenBarangTH':
                $dataRincianTH = DB::connection('ConnJumboBag')->table('VW_PRG_1273_JBB_LIST_KDBRG_RINCIANTH')->where('Kode_Barang', $request->input('Kode_Barang'))->where('Kode_Customer', $request->input('Kode_Customer'))->orderBy('Kode_Komponen', 'asc')->orderBy('Kounter_Komponen', 'asc')->get();
                return response()->json($dataRincianTH, 200);
            case 'getObjek':
                $divisi = $request->input('divisi');
                $dataObjek = DB::connection('ConnInventory')->select('exec SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XKdUser = ?, @XIdDivisi = ?', [2, $nomorUser, $divisi]);
                return response()->json($dataObjek, 200);
            case 'getKelompokUtama':
                $objek = $request->input('objek');
                $dataKelompokUtama = DB::connection('ConnInventory')->select('exec SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XIdObjek = ?', [3, $objek]);
                return response()->json($dataKelompokUtama, 200);
            case 'getKelompok':
                $kelompokUtama = $request->input('kelompokUtama');
                $dataKelompok = DB::connection('ConnInventory')->select('exec SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XIdKelompokUtama = ?', [4, $kelompokUtama]);
                return response()->json($dataKelompok, 200);
            case 'getSubKelompok':
                $kelompok = $request->input('kelompok');
                $dataSubKelompok = DB::connection('ConnInventory')->select('exec SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XIdKelompok = ?', [5, $kelompok]);
                return response()->json($dataSubKelompok, 200);
            case 'getType':
                $subKelompok = $request->input('subKelompok');
                $dataType = DB::connection('ConnInventory')->select('exec SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XIdSubKelompok = ?', [6, $subKelompok]);
                return response()->json($dataType, 200);
            case 'getTypeSaldo':
                $idType = $request->input('idType');
                $dataSaldo = DB::connection('ConnInventory')->select('exec SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XIdType = ?', [7, $idType]);
                return response()->json($dataSaldo, 200);
            case 'getInventoryTypes':
                $panjang = (float) explode('X', $request->input('panjangLebar'))[0];
                $lebar = (float) explode('X', $request->input('panjangLebar'))[1];
                $namaKomponen = $request->input('namaKomponen');
                $divisi = $request->input('divisi');
                $dataInventory = DB::connection('ConnInventory')
                    ->select(
                        'exec SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XPanjang = ?, @XLebar = ?, @XNamaKomponen = ?, @XIdDivisi = ?',
                        [8, (float) $panjang, (float) $lebar, $namaKomponen, $divisi]
                    );
                return response()->json($dataInventory, 200);
            case 'getDataType':
                $UserInput = trim(Auth::user()->NomorUser);
                $IdType = $request->input('IdType');
                $TypeConn = DB::connection('ConnInventory')
                    ->select('exec SP_4384_JBB_Konversi_Potong @XKode = ?, @XIdType = ?', [7, (string) $IdType]);

                return response()->json($TypeConn);
            case 'getDataKoreksi':
                $idKonversi = $request->input('id_konversi');
                $results = DB::connection('ConnInventory')
                    ->select('exec SP_4384_JBB_Konversi_Potong @XKode = ?, @XIdKonversi = ?', [9, $idKonversi]);
                $response = [];

                if (!empty($results)) {
                    foreach ($results as $row) {
                        $response[] = [
                            'IdTransaksi' => $row->IdTransaksi,
                            'IdTypeTransaksi' => $row->IdTypeTransaksi,
                            'UraianDetailTransaksi' => $row->UraianDetailTransaksi,
                            'IdType' => $row->IdType,
                            'IdPenerima' => $row->IdPenerima,
                            'IdPemberi' => $row->IdPemberi,
                            'SaatAwalTransaksi' => $row->SaatAwalTransaksi,
                            'SaatAkhirTransaksi' => $row->SaatAkhirTransaksi,
                            'SaatLog' => $row->SaatLog,
                            'KomfirmasiPenerima' => $row->KomfirmasiPenerima,
                            'KomfirmasiPemberi' => $row->KomfirmasiPemberi,
                            'SaatAwalKomfirmasi' => $row->SaatAwalKomfirmasi,
                            'SaatAkhirKomfirmasi' => $row->SaatAkhirKomfirmasi,
                            'JumlahPemasukanPrimer' => $row->JumlahPemasukanPrimer,
                            'JumlahPemasukanSekunder' => $row->JumlahPemasukanSekunder,
                            'JumlahPemasukanTritier' => $row->JumlahPemasukanTritier,
                            'JumlahPengeluaranPrimer' => $row->JumlahPengeluaranPrimer,
                            'JumlahPengeluaranSekunder' => $row->JumlahPengeluaranSekunder,
                            'JumlahPengeluaranTritier' => $row->JumlahPengeluaranTritier,
                            'AsalIdSubkelompok' => $row->AsalIdSubkelompok,
                            'TujuanIdSubkelompok' => $row->TujuanIdSubkelompok,
                            'Posisi' => $row->Posisi,
                            'idkonversi' => $row->idkonversi,
                            'IdSubkontraktor' => $row->IdSubkontraktor,
                            'TimeInput' => $row->TimeInput,
                            'Status' => $row->Status,
                            'idtrans' => $row->idtrans,
                            'HargaSatuan' => $row->HargaSatuan,
                            'Rack' => $row->Rack,
                            'IdTypeTujuan' => $row->IdTypeTujuan,
                            'NamaType' => $row->NamaType,
                            'KodeBarang' => $row->KodeBarang,
                            'nama_satuan' => $row->nama_satuan,
                            'NamaSubKelompok' => $row->NamaSubKelompok,
                            'NamaKelompok' => $row->NamaKelompok,
                            'NamaKelompokUtama' => $row->NamaKelompokUtama,
                            'NamaObjek' => $row->NamaObjek,
                            'NamaDivisi' => $row->NamaDivisi,
                            'IdDivisi' => $row->IdDivisi,
                            'MinimumStock' => $row->MinimumStock,
                            'SaldoPrimer' => $row->SaldoPrimer,
                            'SaldoSekunder' => $row->SaldoSekunder,
                            'SaldoTritier' => $row->SaldoTritier,
                            'IdObjek' => $row->IdObjek,
                            'IdKelompokUtama' => $row->IdKelompokUtama,
                            'IdKelompok' => $row->IdKelompok,
                            'IdSubkelompok' => $row->IdSubkelompok,
                            'satPrimer' => $row->satPrimer,
                            'satSekunder' => $row->satSekunder,
                            'UnitPrimer' => $row->UnitPrimer,
                            'UnitSekunder' => $row->UnitSekunder,
                            'UnitTritier' => $row->UnitTritier,
                            'Nonaktif' => $row->Nonaktif,
                            'MaximumStock' => $row->MaximumStock,
                            'SaatStockAwal' => $row->SaatStockAwal,
                            'SatuanUmum' => $row->SatuanUmum,
                            'SatUmum' => $row->SatUmum,
                            'TotalPemasukanPrimer' => $row->TotalPemasukanPrimer,
                            'TotalPengeluaranPrimer' => $row->TotalPengeluaranPrimer,
                            'TotalPemasukanSekunder' => $row->TotalPemasukanSekunder,
                            'TotalPengeluaranSekunder' => $row->TotalPengeluaranSekunder,
                            'TotalPemasukanTritier' => $row->TotalPemasukanTritier,
                            'TotalPengeluaranTritier' => $row->TotalPengeluaranTritier,
                            'PakaiAturanKonversi' => $row->PakaiAturanKonversi,
                            'KonvSekunderKePrimer' => $row->KonvSekunderKePrimer,
                            'KonvTritierKeSekunder' => $row->KonvTritierKeSekunder,
                            'PIB' => $row->PIB,
                        ];
                    }
                    return response()->json($response);
                } else {
                    return response()->json(['error' => (string) "Tidak ada data untuk Id Konversi " . $idKonversi]);
                }
            case 'getDataTypeAsalKonversiKoreksi':
                $UserInput = trim(Auth::user()->NomorUser);
                $IdType = $request->input('IdType');
                $DataBarang = DB::connection('ConnInventory')
                    ->select('exec SP_4384_JBB_Konversi_Potong @XKode = ?, @XIdType = ?', [7, (string) $IdType]);
                $DataObjek = DB::connection('ConnInventory')
                    ->select('exec SP_4384_JBB_Konversi_Potong @XKdUser = ?, @XKode = ?, @XIdDivisi = ?', [$UserInput, 2, $DataBarang[0]->IdDivisi]);
                $DataKelompokUtama = DB::connection('ConnInventory')
                    ->select('exec SP_4384_JBB_Konversi_Potong @XKode = ?, @XIdObjek = ?', [3, $DataBarang[0]->IdObjek]);
                $DataKelompok = DB::connection('ConnInventory')
                    ->select('exec SP_4384_JBB_Konversi_Potong @XKode = ?, @XIdKelompokUtama = ?', [4, $DataBarang[0]->IdKelompokUtama]);
                $DataSubKelompok = DB::connection('ConnInventory')
                    ->select('exec SP_4384_JBB_Konversi_Potong @XKode = ?, @XIdKelompok = ?', [5, $DataBarang[0]->IdKelompok]);
                $DataType = DB::connection('ConnInventory')
                    ->select('exec SP_4384_JBB_Konversi_Potong @XKode = ?, @XIdSubKelompok = ?', [6, $DataBarang[0]->IdSubkelompok]);
                if (
                    !empty($DataBarang) &&
                    !empty($DataObjek) &&
                    !empty($DataKelompokUtama) &&
                    !empty($DataKelompok) &&
                    !empty($DataSubKelompok) &&
                    !empty($DataType)
                ) {
                    $RequestedData = [
                        $DataBarang,
                        $DataObjek,
                        $DataKelompokUtama,
                        $DataKelompok,
                        $DataSubKelompok,
                        $DataType,
                    ];
                    return response()->json($RequestedData);
                } else {
                    return response()->json(['error' => (string) "Tidak ada data untuk Id type " . $IdType]);
                }
            case 'getDetailKonversi':
                $idKonversi = $request->input('idKonversi');
                $idDivisi = $request->input('idDivisi');
                $data = DB::connection('ConnInventory')
                    ->select(
                        'exec SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XIdKonversi = ?, @XIdDivisi = ?',
                        [11, (string) $idKonversi, $idDivisi]
                    );
                return response()->json($data);
            case 'getKoreksiKonversi':
                $idDivisi = $request->input('idDivisi');
                $idKonversi = $request->input('idKonversi');
                if ($idDivisi == 'JBB') {
                    $datakoreksi = DB::connection('ConnInventory')
                        ->select(
                            'exec SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XIdKonversi = ?',
                            [15, (string) $idKonversi]
                        );
                } else if ($idDivisi == 'ABM' || $idDivisi == 'ADS') {
                    $dataTransaksi = DB::connection('ConnInventory')
                        ->select(
                            'exec SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XIdKonversi = ?, @XIdDivisi = ?',
                            [11, (string) $idKonversi, $idDivisi]
                        );

                    foreach ($dataTransaksi as $item) {
                        $uraian = $item->UraianDetailTransaksi;

                        if (Str::contains(Str::lower($uraian), 'asal konversi')) {
                            $dataTransaksiAsal[] = $item;
                        } elseif (Str::contains(Str::lower($uraian), 'tujuan konversi')) {
                            $dataTransaksiTujuan[] = $item;
                        }
                    }
                    $nomorUser = $dataTransaksi[0]->IdPenerima;
                    $dataObjek = DB::connection('ConnInventory')
                        ->select(
                            'exec SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XKdUser = ?, @XIdDivisi = ?',
                            [2, $nomorUser, $dataTransaksiAsal[0]->IdDivisi]
                        );
                    $dataKelompokUtamaAsal = DB::connection('ConnInventory')
                        ->select(
                            'exec SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XIdObjek = ?',
                            [3, $dataTransaksiAsal[0]->IdObjek]
                        );
                    $dataKelompokAsal = DB::connection('ConnInventory')
                        ->select(
                            'exec SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XIdKelompokUtama = ?',
                            [4, $dataTransaksiAsal[0]->IdKelompokUtama]
                        );
                    $dataSubKelompokAsal = DB::connection('ConnInventory')
                        ->select(
                            'exec SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XIdKelompok = ?',
                            [5, $dataTransaksiAsal[0]->IdKelompok]
                        );
                    $dataTypeAsal = DB::connection('ConnInventory')
                        ->select(
                            'exec SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XIdSubKelompok = ?',
                            [6, $dataTransaksiAsal[0]->IdSubkelompok]
                        );
                    $dataKelompokUtamaTujuan = DB::connection('ConnInventory')
                        ->select(
                            'exec SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XIdObjek = ?',
                            [3, $dataTransaksiTujuan[0]->IdObjek]
                        );
                    $dataKelompokTujuan = DB::connection('ConnInventory')
                        ->select(
                            'exec SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XIdKelompokUtama = ?',
                            [4, $dataTransaksiTujuan[0]->IdKelompokUtama]
                        );
                    $dataSubKelompokTujuan = DB::connection('ConnInventory')
                        ->select(
                            'exec SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XIdKelompok = ?',
                            [5, $dataTransaksiTujuan[0]->IdKelompok]
                        );
                    $dataTypeTujuan = DB::connection('ConnInventory')
                        ->select(
                            'exec SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XIdSubKelompok = ?',
                            [6, $dataTransaksiTujuan[0]->IdSubkelompok]
                        );

                    $datakoreksi = [$dataTransaksi, $dataObjek, $dataKelompokUtamaAsal, $dataKelompokAsal, $dataSubKelompokAsal, $dataTypeAsal, $dataKelompokUtamaTujuan, $dataKelompokTujuan, $dataSubKelompokTujuan, $dataTypeTujuan];
                }
                return response()->json($datakoreksi);

            default:
                return response()->json(['error' => (string) "Undefined request \$id: " . $id]);
        }
    }


    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        if ($id == 'KoreksiJBB') {
            // koreksi ini hanya digunakan untuk menambah data yang sudah ada, tidak bisa mengubah data yang sudah ada

            // proses filtering data yang sudah diinput
            $idKonversi = $request->input('idKonversi');
            $table_daftarAsalKonversi = $request->input('table_daftarAsalKonversi');
            $datakoreksi = DB::connection('ConnInventory')
                ->select(
                    'exec SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XIdKonversi = ?',
                    [15, (string) $idKonversi]
                );
            // Extract IdType values from the second array
            $idTypes = array_map(fn($item) => $item->IdType, $datakoreksi);

            // Filter out items where index [5] (IdType) is in the $idTypes array
            $filteredArray = array_filter($table_daftarAsalKonversi, fn($item) => !in_array($item[5], $idTypes));

            // proses insert data baru
            $kodeBarangSelect = $request->input('kodeBarangSelect');
            $customerJBB = $request->input('customerJBB');
            $nomorUser = trim(Auth::user()->NomorUser);
            $divisi = $request->input('divisi');
            $tanggalKonversi = $request->input('tanggalKonversi');
            $date = new DateTime("now", new DateTimeZone('Asia/Jakarta'));
            $shift = $request->input('shift');
            switch ($shift) {
                case 'P':
                    $shift = 'Pagi';
                    break;
                case 'S':
                    $shift = 'Siang';
                    break;
                case 'M':
                    $shift = 'Malam';
                    break;
            }
            $table_daftarAsalKonversiFiltered = array_values($filteredArray);

            // Initialize an array to store concatenated results for each index
            $concatenatedResults = [];

            // Get the number of sub-arrays
            $numberOfSubArrays = count($table_daftarAsalKonversiFiltered);

            // Get the number of elements in each sub-array (assuming all sub-arrays have the same length)
            $numberOfElements = count($table_daftarAsalKonversiFiltered[0]);

            // Loop through each index in the sub-arrays
            for ($i = 0; $i < $numberOfElements; $i++) {
                $tempArray = [];
                // Loop through each sub-array and collect the values at the current index
                for ($j = 0; $j < $numberOfSubArrays; $j++) {
                    $tempArray[] = $table_daftarAsalKonversiFiltered[$j][$i];
                }
                $concatenatedResults[$i] = $tempArray;
            }
            // Accessing specific variables
            $IdTypeAsal = $concatenatedResults[5];
            $kodeKomponen = $concatenatedResults[0];
            $namaKomponen = $concatenatedResults[1];
            $jumlah_pemakaianPrimer = $concatenatedResults[6];
            $jumlah_pemakaianSekunder = $concatenatedResults[8];
            $jumlah_pemakaianTritier = $concatenatedResults[10];
            $IdSubKelompokAsal = $concatenatedResults[12];

            for ($k = 0; $k < count($IdTypeAsal); $k++) {

                $uraianAsal = (string) $shift . ", Asal Konversi Setengah Jadi " . $divisi . ' | ' . $customerJBB . " | " . $kodeBarangSelect . ' | ' . $kodeKomponen[$k] . ' | Inserted by: ' . $nomorUser;
                DB::connection('ConnInventory')
                    ->statement('EXEC SP_4384_Konversi_Setengah_Jadi
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
                @XidKonversi = ?,
                @XTimeInput = ?,
                @XStatus = ?', [
                        9,
                        "28",
                        $uraianAsal,
                        $IdTypeAsal[$k],
                        trim(Auth::user()->NomorUser),
                        trim(Auth::user()->NomorUser),
                        $tanggalKonversi,
                        $date,
                        $jumlah_pemakaianPrimer[$k],
                        $jumlah_pemakaianSekunder[$k],
                        $jumlah_pemakaianTritier[$k],
                        $IdSubKelompokAsal[$k],
                        $idKonversi,
                        $date,
                        0
                    ]);
            }
            return response()->json(['success' => 'Data sudah diupdate!']);
        }
    }

    public function destroy(Request $request, $id)
    {
        if ($id == 'BatalACCDataKonversi') {
            try {
                $idKonversi = $request->input('idKonversi');
                $nomorUser = trim(Auth::user()->NomorUser);
                DB::connection('ConnInventory')->statement('exec SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XIdKonversi = ?, @XKdUser = ?', [12, $idKonversi, $nomorUser]);
                return response()->json(['success' => (string) 'Data Konversi ' . $idKonversi . ' Berhasil Dihapus'], 200);
            } catch (Exception $e) {
                return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
            }
        }
    }
}
