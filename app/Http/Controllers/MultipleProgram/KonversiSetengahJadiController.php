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

class KonversiSetengahJadiController extends Controller
{
    public function index()
    {

    }

    public function create($id)
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
        if ($jenisStore == 'permohonan') {
            $date = new DateTime("now", new DateTimeZone('Asia/Jakarta'));
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
            $jumlah_pemasukanPrimer = $request->input('jumlah_pemasukanPrimer');
            $jumlah_pemasukanSekunder = $request->input('jumlah_pemasukanSekunder');
            $jumlah_pemasukanTritier = $request->input('jumlah_pemasukanTritier');
            $idSubkelompokTujuan = $request->input('idSubkelompokTujuan');
            $uraianAsal = (string) $shift . ", Asal Konversi Setengah Jadi " . $divisi;
            $uraianTujuan = (string) $shift . ", Tujuan Konversi Setengah Jadi " . $divisi;
            if ($divisi == 'JBB') {
                try {
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
                    $jumlah_pemakaianPrimer = $concatenatedResults[6];
                    $jumlah_pemakaianSekunder = $concatenatedResults[8];
                    $jumlah_pemakaianTritier = $concatenatedResults[10];
                    $IdSubKelompokAsal = $concatenatedResults[12]; // masih belum dikirim lewat table di javascript
                    // id konversi
                    $currentIdKonvStghJdJBB = DB::connection('ConnInventory')
                        ->table('Counter')->value('IdKonvStghJdJBB');
                    $newIdKonvStghJdJBB = $currentIdKonvStghJdJBB + 1;
                    DB::connection('ConnInventory')
                        ->table('Counter')->update(['IdKonvStghJdJBB' => $newIdKonvStghJdJBB]);
                    $idkonversi = "JBJ" . str_pad($newIdKonvStghJdJBB, 6, "0", STR_PAD_LEFT);

                    // Asal Konversi
                    for ($k = 0; $k < count($IdTypeAsal); $k++) {
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
                                $jumlah_pemakaianPrimer[$k],
                                $jumlah_pemakaianSekunder[$k],
                                $jumlah_pemakaianTritier[$k],
                                $IdSubKelompokAsal[$k],
                                $idkonversi,
                                $date,
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
                            $jumlah_pemasukanPrimer,
                            $jumlah_pemasukanSekunder,
                            $jumlah_pemasukanTritier,
                            $idSubkelompokTujuan,
                            $idkonversi,
                            $date,
                            0,
                        ]);
                    return response()->json(['success' => 'Data sudah diSIMPAN !!..']);
                } catch (Exception $e) {
                    return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
                }
            } elseif ($divisi == 'ABM') {
                $id_typeAsal = $request->input('id_typeAsal');
                $pemakaian_primerAsal = $request->input('pemakaian_primerAsal');
                $pemakaian_sekunderAsal = $request->input('pemakaian_sekunderAsal');
                $pemakaian_tritierAsal = $request->input('pemakaian_tritierAsal');
                $idSubKelompokAsal = $request->input('idSubKelompokAsal');

                // id konversi
                $currentIdKonvStghJdJBB = DB::connection('ConnInventory')
                    ->table('Counter')->value('IdKonvStghJdJBB');
                $newIdKonvStghJdJBB = $currentIdKonvStghJdJBB + 1;
                DB::connection('ConnInventory')
                    ->table('Counter')->update(['IdKonvStghJdJBB' => $newIdKonvStghJdJBB]);
                $idkonversi = "ABJ" . str_pad($newIdKonvStghJdJBB, 6, "0", STR_PAD_LEFT);

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
                        $pemakaian_primerAsal,
                        $pemakaian_sekunderAsal,
                        $pemakaian_tritierAsal,
                        $idSubKelompokAsal,
                        $idkonversi,
                        $date,
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
                        $jumlah_pemasukanPrimer,
                        $jumlah_pemasukanSekunder,
                        $jumlah_pemasukanTritier,
                        $idSubkelompokTujuan,
                        $idkonversi,
                        $date,
                        0,
                    ]);
            }
        } else if ($jenisStore == 'accPermohonan') {
            try {
                $idkonversi = $request->input('idkonversi');
                $nomorUser = trim(Auth::user()->NomorUser);
                DB::connection('ConnInventory')
                    ->statement('EXEC SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XIdKonversi = ?, @XKdUser = ?', [10, $idkonversi, $nomorUser]);

                $barcode = DB::connection('ConnInventory')->select('EXEC SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XIdKonversi = ?', [14, $idkonversi]);

                return response()->json([
                    'success' => (string) 'Permohonan konversi dengan Id Konversi: ' . $idkonversi . ' berhasil disetujui!',
                    'barcode' => $barcode
                ]);
            } catch (Exception $e) {
                return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
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
                    ->select('exec SP_4384_Konversi_Roll_Barcode_Potong @XKdUser = ?, @XKode = ?, @XIdDivisi = ?', [$nomorUser, 1, 'JBB']);
                return view('MultipleProgram.KonversiSetengahJadi', compact('access', 'id', 'nomorUser', 'divisi'));
            case 'ABMBrgJd':
                $access = (new HakAksesController)->HakAksesFiturMaster('ABM');
                $divisi = DB::connection('ConnInventory')
                    ->select('exec SP_4384_Konversi_Roll_Barcode_Potong @XKdUser = ?, @XKode = ?, @XIdDivisi = ?', [$nomorUser, 1, 'ABM']);
                return view('MultipleProgram.KonversiSetengahJadi', compact('access', 'id', 'nomorUser', 'divisi'));
            case 'ADSBrgJd':
                $access = (new HakAksesController)->HakAksesFiturMaster('AD Star');
                $divisi = DB::connection('ConnInventory')
                    ->select('exec SP_4384_Konversi_Roll_Barcode_Potong @XKdUser = ?, @XKode = ?, @XIdDivisi = ?', [$nomorUser, 1, 'ADS']);
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
                $dataType = DB::connection('ConnInventory')->select('exec SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XIdType = ?', [7, $idType]);
                return response()->json($dataType, 200);
            case 'getInventoryTypes':
                $panjang = (float) explode('X', $request->input('panjangLebar'))[0];
                $lebar = (float) explode('X', $request->input('panjangLebar'))[1];
                $namaKomponen = $request->input('namaKomponen');
                $divisi = $request->input('divisi');

                $dataInventory = DB::connection('ConnInventory')->select('exec SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XPanjang = ?, @XLebar = ?, @XNamaKomponen = ?, @XIdDivisi = ?', [1, (float) $panjang, (float) $lebar, $namaKomponen, $divisi]);
                return response()->json($dataInventory, 200);
            case 'getDivisi':
                $UserInput = trim(Auth::user()->NomorUser);

                $divisiConn = DB::connection('ConnInventory')
                    ->select('exec SP_4384_JBB_Konversi_Potong @XKdUser = ?, @XKode = ?', [$UserInput, 1]);

                $divisiArr = array_map(function ($divisiList) {
                    return [
                        'NamaDivisi' => $divisiList->NamaDivisi,
                        'IdDivisi' => $divisiList->IdDivisi,
                    ];
                }, $divisiConn);

                return datatables($divisiArr)->make(true);
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
                $data = DB::connection('ConnInventory')->select('exec SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XIdKonversi = ?, @XIdDivisi = ?', [11, (string) $idKonversi, $idDivisi]);
                return response()->json($data);
            default:
                return response()->json(['error' => (string) "Undefined request \$id: " . $id]);
        }
        // if ($id == 'JBBStghJd') {
        //     $access = (new HakAksesController)->HakAksesFiturMaster('Jumbo Bag');
        //     $divisi = DB::connection('ConnInventory')
        //         ->select('exec SP_4384_Konversi_Roll_Barcode_Potong @XKdUser = ?, @XKode = ?, @XIdDivisi = ?', [$nomorUser, 1, 'JBB']);
        //     return view('MultipleProgram.KonversiSetengahJadi', compact('access', 'id', 'nomorUser', 'divisi'));
        // } else if ($id == 'ABMBrgJd') {
        //     $access = (new HakAksesController)->HakAksesFiturMaster('Jumbo Bag');
        //     $divisi = DB::connection('ConnInventory')
        //         ->select('exec SP_4384_Konversi_Roll_Barcode_Potong @XKdUser = ?, @XKode = ?, @XIdDivisi = ?', [$nomorUser, 1, 'JBB']);
        //     return view('MultipleProgram.KonversiSetengahJadi', compact('access', 'id', 'nomorUser', 'divisi'));
        // } else if ($id == 'selectCustomerTH') {
        //     $customer_list = DB::connection('ConnJumboBag')->select('exec SP_1273_JBB_LIST_CUSTOMER');
        //     return response()->json($customer_list, 200);
        // } else if ($id == 'selectKodeBarangTH') {
        //     $kode_barangList = DB::connection('ConnJumboBag')->select('exec SP_1273_JBB_LIST_KDCUST_KDBRG @KodeCustomer = ?', [$request->input('Kode_Customer')]);
        //     return response()->json($kode_barangList, 200);
        // } else if ($id == 'selectKomponenBarangTH') {
        //     $dataRincianTH = DB::connection('ConnJumboBag')->table('VW_PRG_1273_JBB_LIST_KDBRG_RINCIANTH')->where('Kode_Barang', $request->input('Kode_Barang'))->where('Kode_Customer', $request->input('Kode_Customer'))->orderBy('Kode_Komponen', 'asc')->orderBy('Kounter_Komponen', 'asc')->get();
        //     return response()->json($dataRincianTH, 200);
        // } else if ($id == 'getObjek') {
        //     $divisi = $request->input('divisi');
        //     $dataObjek = DB::connection('ConnInventory')->select('exec SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XKdUser = ?, @XIdDivisi = ?', [2, $nomorUser, $divisi]);
        //     return response()->json($dataObjek, 200);
        // } else if ($id == 'getKelompokUtama') {
        //     $objek = $request->input('objek');
        //     $dataKelompokUtama = DB::connection('ConnInventory')->select('exec SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XIdObjek = ?', [3, $objek]);
        //     return response()->json($dataKelompokUtama, 200);
        // } else if ($id == 'getKelompok') {
        //     $kelompokUtama = $request->input('kelompokUtama');
        //     $dataKelompok = DB::connection('ConnInventory')->select('exec SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XIdKelompokUtama = ?', [4, $kelompokUtama]);
        //     return response()->json($dataKelompok, 200);
        // } else if ($id == 'getSubKelompok') {
        //     $kelompok = $request->input('kelompok');
        //     $dataSubKelompok = DB::connection('ConnInventory')->select('exec SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XIdKelompok = ?', [5, $kelompok]);
        //     return response()->json($dataSubKelompok, 200);
        // } else if ($id == 'getType') {
        //     $subKelompok = $request->input('subKelompok');
        //     $dataType = DB::connection('ConnInventory')->select('exec SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XIdSubKelompok = ?', [6, $subKelompok]);
        //     return response()->json($dataType, 200);
        // } else if ($id == 'getTypeSaldo') {
        //     $idType = $request->input('idType');
        //     $dataType = DB::connection('ConnInventory')->select('exec SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XIdType = ?', [7, $idType]);
        //     return response()->json($dataType, 200);
        // } else if ($id == 'getInventoryTypes') {
        //     $panjang = (float) explode('X', $request->input('panjangLebar'))[0];
        //     $lebar = (float) explode('X', $request->input('panjangLebar'))[1];
        //     $namaKomponen = $request->input('namaKomponen');
        //     $divisi = $request->input('divisi');

        //     $dataInventory = DB::connection('ConnInventory')->select('exec SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XPanjang = ?, @XLebar = ?, @XNamaKomponen = ?, @XIdDivisi = ?', [1, (float) $panjang, (float) $lebar, $namaKomponen, $divisi]);
        //     return response()->json($dataInventory, 200);
        // } else if ($id == 'getDivisi') {
        //     $UserInput = trim(Auth::user()->NomorUser);

        //     $divisiConn = DB::connection('ConnInventory')
        //         ->select('exec SP_4384_JBB_Konversi_Potong @XKdUser = ?, @XKode = ?', [$UserInput, 1]);

        //     $divisiArr = array_map(function ($divisiList) {
        //         return [
        //             'NamaDivisi' => $divisiList->NamaDivisi,
        //             'IdDivisi' => $divisiList->IdDivisi,
        //         ];
        //     }, $divisiConn);

        //     return datatables($divisiArr)->make(true);
        // } else if ($id == 'getObjek') {
        //     $UserInput = trim(Auth::user()->NomorUser);
        //     $idDivisi = $request->input('idDivisi');
        //     $objekConn = DB::connection('ConnInventory')
        //         ->select('exec SP_4384_JBB_Konversi_Potong @XKdUser = ?, @XKode = ?, @XIdDivisi = ?', [$UserInput, 2, $idDivisi]);

        //     $objekArr = array_map(function ($objekList) {
        //         return [
        //             'Namaobjek' => $objekList->NamaObjek,
        //             'Idobjek' => $objekList->IdObjek,
        //         ];
        //     }, $objekConn);

        //     return datatables($objekArr)->make(true);
        // } else if ($id == 'getKelompokUtama') {
        //     $UserInput = trim(Auth::user()->NomorUser);
        //     $idObjek = $request->input('idObjek');
        //     $KelompokUtamaConn = DB::connection('ConnInventory')
        //         ->select('exec SP_4384_JBB_Konversi_Potong @XKode = ?, @XIdObjek = ?', [3, $idObjek]);

        //     $KelompokUtamaArr = array_map(function ($KelompokUtamaList) {
        //         return [
        //             'NamaKelompokUtama' => $KelompokUtamaList->NamaKelompokUtama,
        //             'IdKelompokUtama' => $KelompokUtamaList->IdKelompokUtama,
        //         ];
        //     }, $KelompokUtamaConn);

        //     return datatables($KelompokUtamaArr)->make(true);
        // } else if ($id == 'getKelompok') {
        //     $UserInput = trim(Auth::user()->NomorUser);
        //     $idKelompokUtama = $request->input('idKelompokUtama');
        //     $KelompokConn = DB::connection('ConnInventory')
        //         ->select('exec SP_4384_JBB_Konversi_Potong @XKode = ?, @XIdKelompokUtama = ?', [4, $idKelompokUtama]);

        //     $KelompokArr = array_map(function ($KelompokList) {
        //         return [
        //             'NamaKelompok' => $KelompokList->namakelompok,
        //             'IdKelompok' => $KelompokList->idkelompok,
        //         ];
        //     }, $KelompokConn);

        //     return datatables($KelompokArr)->make(true);
        // } else if ($id == 'getSubKelompok') {
        //     $UserInput = trim(Auth::user()->NomorUser);
        //     $idKelompok = $request->input('idKelompok');
        //     $SubKelompokConn = DB::connection('ConnInventory')
        //         ->select('exec SP_4384_JBB_Konversi_Potong @XKode = ?, @XIdKelompok = ?', [5, $idKelompok]);

        //     $SubKelompokArr = array_map(function ($SubKelompokList) {
        //         return [
        //             'NamaSubKelompok' => $SubKelompokList->NamaSubKelompok,
        //             'IdSubKelompok' => $SubKelompokList->IdSubkelompok,
        //         ];
        //     }, $SubKelompokConn);

        //     return datatables($SubKelompokArr)->make(true);
        // } else if ($id == 'getType') {
        //     $UserInput = trim(Auth::user()->NomorUser);
        //     $IdSubKelompok = $request->input('IdSubKelompok');
        //     $TypeConn = DB::connection('ConnInventory')
        //         ->select('exec SP_4384_JBB_Konversi_Potong @XKode = ?, @XIdSubKelompok = ?', [6, $IdSubKelompok]);

        //     $TypeArr = array_map(function ($TypeList) {
        //         return [
        //             'NamaType' => $TypeList->NamaType,
        //             'IdType' => $TypeList->IdType,
        //         ];
        //     }, $TypeConn);

        //     return datatables($TypeArr)->make(true);
        // } else if ($id == 'getDataType') {
        //     $UserInput = trim(Auth::user()->NomorUser);
        //     $IdType = $request->input('IdType');
        //     $TypeConn = DB::connection('ConnInventory')
        //         ->select('exec SP_4384_JBB_Konversi_Potong @XKode = ?, @XIdType = ?', [7, (string) $IdType]);

        //     return response()->json($TypeConn);
        // } else if ($id == 'getDataKoreksi') {
        //     $idKonversi = $request->input('id_konversi');
        //     $results = DB::connection('ConnInventory')
        //         ->select('exec SP_4384_JBB_Konversi_Potong @XKode = ?, @XIdKonversi = ?', [9, $idKonversi]);
        //     $response = [];

        //     if (!empty($results)) {
        //         foreach ($results as $row) {
        //             $response[] = [
        //                 'IdTransaksi' => $row->IdTransaksi,
        //                 'IdTypeTransaksi' => $row->IdTypeTransaksi,
        //                 'UraianDetailTransaksi' => $row->UraianDetailTransaksi,
        //                 'IdType' => $row->IdType,
        //                 'IdPenerima' => $row->IdPenerima,
        //                 'IdPemberi' => $row->IdPemberi,
        //                 'SaatAwalTransaksi' => $row->SaatAwalTransaksi,
        //                 'SaatAkhirTransaksi' => $row->SaatAkhirTransaksi,
        //                 'SaatLog' => $row->SaatLog,
        //                 'KomfirmasiPenerima' => $row->KomfirmasiPenerima,
        //                 'KomfirmasiPemberi' => $row->KomfirmasiPemberi,
        //                 'SaatAwalKomfirmasi' => $row->SaatAwalKomfirmasi,
        //                 'SaatAkhirKomfirmasi' => $row->SaatAkhirKomfirmasi,
        //                 'JumlahPemasukanPrimer' => $row->JumlahPemasukanPrimer,
        //                 'JumlahPemasukanSekunder' => $row->JumlahPemasukanSekunder,
        //                 'JumlahPemasukanTritier' => $row->JumlahPemasukanTritier,
        //                 'JumlahPengeluaranPrimer' => $row->JumlahPengeluaranPrimer,
        //                 'JumlahPengeluaranSekunder' => $row->JumlahPengeluaranSekunder,
        //                 'JumlahPengeluaranTritier' => $row->JumlahPengeluaranTritier,
        //                 'AsalIdSubkelompok' => $row->AsalIdSubkelompok,
        //                 'TujuanIdSubkelompok' => $row->TujuanIdSubkelompok,
        //                 'Posisi' => $row->Posisi,
        //                 'idkonversi' => $row->idkonversi,
        //                 'IdSubkontraktor' => $row->IdSubkontraktor,
        //                 'TimeInput' => $row->TimeInput,
        //                 'Status' => $row->Status,
        //                 'idtrans' => $row->idtrans,
        //                 'HargaSatuan' => $row->HargaSatuan,
        //                 'Rack' => $row->Rack,
        //                 'IdTypeTujuan' => $row->IdTypeTujuan,
        //                 'NamaType' => $row->NamaType,
        //                 'KodeBarang' => $row->KodeBarang,
        //                 'nama_satuan' => $row->nama_satuan,
        //                 'NamaSubKelompok' => $row->NamaSubKelompok,
        //                 'NamaKelompok' => $row->NamaKelompok,
        //                 'NamaKelompokUtama' => $row->NamaKelompokUtama,
        //                 'NamaObjek' => $row->NamaObjek,
        //                 'NamaDivisi' => $row->NamaDivisi,
        //                 'IdDivisi' => $row->IdDivisi,
        //                 'MinimumStock' => $row->MinimumStock,
        //                 'SaldoPrimer' => $row->SaldoPrimer,
        //                 'SaldoSekunder' => $row->SaldoSekunder,
        //                 'SaldoTritier' => $row->SaldoTritier,
        //                 'IdObjek' => $row->IdObjek,
        //                 'IdKelompokUtama' => $row->IdKelompokUtama,
        //                 'IdKelompok' => $row->IdKelompok,
        //                 'IdSubkelompok' => $row->IdSubkelompok,
        //                 'satPrimer' => $row->satPrimer,
        //                 'satSekunder' => $row->satSekunder,
        //                 'UnitPrimer' => $row->UnitPrimer,
        //                 'UnitSekunder' => $row->UnitSekunder,
        //                 'UnitTritier' => $row->UnitTritier,
        //                 'Nonaktif' => $row->Nonaktif,
        //                 'MaximumStock' => $row->MaximumStock,
        //                 'SaatStockAwal' => $row->SaatStockAwal,
        //                 'SatuanUmum' => $row->SatuanUmum,
        //                 'SatUmum' => $row->SatUmum,
        //                 'TotalPemasukanPrimer' => $row->TotalPemasukanPrimer,
        //                 'TotalPengeluaranPrimer' => $row->TotalPengeluaranPrimer,
        //                 'TotalPemasukanSekunder' => $row->TotalPemasukanSekunder,
        //                 'TotalPengeluaranSekunder' => $row->TotalPengeluaranSekunder,
        //                 'TotalPemasukanTritier' => $row->TotalPemasukanTritier,
        //                 'TotalPengeluaranTritier' => $row->TotalPengeluaranTritier,
        //                 'PakaiAturanKonversi' => $row->PakaiAturanKonversi,
        //                 'KonvSekunderKePrimer' => $row->KonvSekunderKePrimer,
        //                 'KonvTritierKeSekunder' => $row->KonvTritierKeSekunder,
        //                 'PIB' => $row->PIB,
        //             ];
        //         }
        //         return response()->json($response);
        //     } else {
        //         return response()->json(['error' => (string) "Tidak ada data untuk Id Konversi " . $idKonversi]);
        //     }
        // } else if ($id == 'getDataTypeAsalKonversiKoreksi') {
        //     $UserInput = trim(Auth::user()->NomorUser);
        //     $IdType = $request->input('IdType');
        //     $DataBarang = DB::connection('ConnInventory')
        //         ->select('exec SP_4384_JBB_Konversi_Potong @XKode = ?, @XIdType = ?', [7, (string) $IdType]);
        //     $DataObjek = DB::connection('ConnInventory')
        //         ->select('exec SP_4384_JBB_Konversi_Potong @XKdUser = ?, @XKode = ?, @XIdDivisi = ?', [$UserInput, 2, $DataBarang[0]->IdDivisi]);
        //     $DataKelompokUtama = DB::connection('ConnInventory')
        //         ->select('exec SP_4384_JBB_Konversi_Potong @XKode = ?, @XIdObjek = ?', [3, $DataBarang[0]->IdObjek]);
        //     $DataKelompok = DB::connection('ConnInventory')
        //         ->select('exec SP_4384_JBB_Konversi_Potong @XKode = ?, @XIdKelompokUtama = ?', [4, $DataBarang[0]->IdKelompokUtama]);
        //     $DataSubKelompok = DB::connection('ConnInventory')
        //         ->select('exec SP_4384_JBB_Konversi_Potong @XKode = ?, @XIdKelompok = ?', [5, $DataBarang[0]->IdKelompok]);
        //     $DataType = DB::connection('ConnInventory')
        //         ->select('exec SP_4384_JBB_Konversi_Potong @XKode = ?, @XIdSubKelompok = ?', [6, $DataBarang[0]->IdSubkelompok]);
        //     if (
        //         !empty($DataBarang) &&
        //         !empty($DataObjek) &&
        //         !empty($DataKelompokUtama) &&
        //         !empty($DataKelompok) &&
        //         !empty($DataSubKelompok) &&
        //         !empty($DataType)
        //     ) {
        //         $RequestedData = [
        //             $DataBarang,
        //             $DataObjek,
        //             $DataKelompokUtama,
        //             $DataKelompok,
        //             $DataSubKelompok,
        //             $DataType,
        //         ];
        //         return response()->json($RequestedData);
        //     } else {
        //         return response()->json(['error' => (string) "Tidak ada data untuk Id type " . $IdType]);
        //     }

        // } else if ($id == 'getDetailKonversi') {
        //     $idKonversi = $request->input('idKonversi');
        //     $data = DB::connection('ConnInventory')->select('exec SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XIdKonversi = ?', [11, (string) $idKonversi]);
        //     return response()->json($data);
        // } else {
        //     return response()->json(['error' => (string) "Undefined request \$id: " . $id]);
        // }
    }


    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
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
