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

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $currentIdKonvPotongJBB = DB::connection('ConnInventory')
            ->table('Counter')->value('IdKonvPotongJBB');
        $newIdKonvPotongJBB = $currentIdKonvPotongJBB + 1;
        DB::connection('ConnInventory')
            ->table('Counter')->update(['IdKonvPotongJBB' => $newIdKonvPotongJBB]);
        $idkonversi = "JBB" . str_pad($newIdKonvPotongJBB, 6, "0", STR_PAD_LEFT);
        $date = new DateTime("now", new DateTimeZone('Asia/Jakarta'));
        // $id_divisi = $request->input('asalKonversiInputValues')['id_divisi'];
        // $nama_divisi = $request->input('asalKonversiInputValues')['nama_divisi'];
        // $id_objek = $request->input('asalKonversiInputValues')['id_objek'];
        // $nama_objek = $request->input('asalKonversiInputValues')['nama_objek'];
        // $id_kelompokUtama = $request->input('asalKonversiInputValues')['id_kelompokUtama'];
        // $nama_kelompokUtama = $request->input('asalKonversiInputValues')['nama_kelompokUtama'];
        // $id_kelompok = $request->input('asalKonversiInputValues')['id_kelompok'];
        // $nama_kelompok = $request->input('asalKonversiInputValues')['nama_kelompok'];
        $id_subKelompok = $request->input('asalKonversiInputValues')['id_subKelompok'];
        // $nama_subKelompok = $request->input('asalKonversiInputValues')['nama_subKelompok'];
        // $PIB_asal = $request->input('asalKonversiInputValues')['PIB_asal'];
        $id_typeAsal = $request->input('asalKonversiInputValues')['id_typeAsal'];
        // $nama_typeAsal = $request->input('asalKonversiInputValues')['nama_typeAsal'];
        // $saldo_terakhirAsalPrimer = $request->input('asalKonversiInputValues')['saldo_terakhirAsalPrimer'];
        // $satuan_saldoTerakhirAsalPrimer = $request->input('asalKonversiInputValues')['satuan_saldoTerakhirAsalPrimer'];
        // $saldo_terakhirAsalSekunder = $request->input('asalKonversiInputValues')['saldo_terakhirAsalSekunder'];
        // $satuan_saldoTerakhirAsalSekunder = $request->input('asalKonversiInputValues')['satuan_saldoTerakhirAsalSekunder'];
        // $saldo_terakhirAsalTritier = $request->input('asalKonversiInputValues')['saldo_terakhirAsalTritier'];
        // $satuan_saldoTerakhirAsalTritier = $request->input('asalKonversiInputValues')['satuan_saldoTerakhirAsalTritier'];
        $pemakaian_primerAsal = $request->input('asalKonversiInputValues')['pemakaian_primerAsal'];
        // $satuan_primerAsal = $request->input('asalKonversiInputValues')['satuan_primerAsal'];
        $pemakaian_sekunderAsal = $request->input('asalKonversiInputValues')['pemakaian_sekunderAsal'];
        // $satuan_sekunderAsal = $request->input('asalKonversiInputValues')['satuan_sekunderAsal'];
        $pemakaian_tritierAsal = $request->input('asalKonversiInputValues')['pemakaian_tritierAsal'];
        // $satuan_tritierAsal = $request->input('asalKonversiInputValues')['satuan_tritierAsal'];
        $uraian_asal = "Asal Konversi Potongan JBB";
        $proses = $request->input('proses');
        // dd($proses);

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

            // Concatenate the collected values with a pipe separator
            // $concatenatedResults[$i] = implode(' , ', $tempArray);
            $concatenatedResults[$i] = $tempArray;
        }

        // Accessing specific variables
        $IdTypeTujuan = $concatenatedResults[0];
        // $NamaTypeTujuan = $concatenatedResults[1];
        $SaldoPrimer = $concatenatedResults[2];
        $SaldoSekunder = $concatenatedResults[3];
        $SaldoTritier = $concatenatedResults[4];
        // $IdDivisi = $concatenatedResults[5];
        // $IdObjek = $concatenatedResults[6];
        // $IdKelompokUtama = $concatenatedResults[7];
        // $IdKelompok = $concatenatedResults[8];
        $IdSubKelompok = $concatenatedResults[9];
        // $NamaDivisiTujuan = $concatenatedResults[10];
        // $NamaObjekTujuan = $concatenatedResults[11];
        // $NamaKelompokUtamaTujuan = $concatenatedResults[12];
        // $NamaKelompokTujuan = $concatenatedResults[13];
        // $NamaSubKelompokTujuan = $concatenatedResults[14];
        // $SaldoTerakhirTujuanPrimer = $concatenatedResults[15];
        // $SaldoTerakhirTujuanSekunder = $concatenatedResults[16];
        // $SaldoTerakhirTujuanTritier = $concatenatedResults[17];
        // $SatuanPrimerTujuan = $concatenatedResults[18];
        // $SatuanSekunderTujuan = $concatenatedResults[19];
        // $SatuanTritierTujuan = $concatenatedResults[20];
        // $SatuanSaldoTerakhirTujuanPrimer = $concatenatedResults[21];
        // $SatuanSaldoTerakhirTujuanSekunder = $concatenatedResults[22];
        // $SatuanSaldoTerakhirTujuanTritier = $concatenatedResults[23];
        // $IdTmpTransaksi = $concatenatedResults[24];
        $uraian_tujuan = "Tujuan Konversi Potongan JBB";

        switch ($proses) {
            case 1:
                // Asal
                DB::connection('ConnInventory')
                    ->statement('EXEC SP_4384_JBB_Konversi_Potong
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
                        8,
                        "04",
                        $uraian_asal,
                        $id_typeAsal,
                        trim(Auth::user()->NomorUser),
                        trim(Auth::user()->NomorUser),
                        Carbon::now()->format('Y-m-d'),
                        $date,
                        $pemakaian_primerAsal,
                        $pemakaian_sekunderAsal,
                        $pemakaian_tritierAsal,
                        $id_subKelompok,
                        $idkonversi,
                        $date,
                        0,
                    ]);

                // Tujuan
                for ($k = 0; $k < count($IdTypeTujuan); $k++) {
                    DB::connection('ConnInventory')
                        ->statement('EXEC SP_4384_JBB_Konversi_Potong
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
                            8,
                            "04",
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
                return response()->json(['message' => 'Data sudah diSIMPAN !!..']);
        }
    }

    public function show($id, Request $request)
    {
        $nomorUser = trim(Auth::user()->NomorUser);
        if ($id == 'JBBPotong') {
            $access = (new HakAksesController)->HakAksesFiturMaster('Jumbo Bag');
            $divisi = DB::connection('ConnInventory')
                ->select('exec SP_4384_Konversi_Roll_Barcode_Potong @XKdUser = ?, @XKode = ?', [$nomorUser, 1]);
            return view('MultipleProgram.KonversiSetengahJadi', compact('access', 'id', 'nomorUser', 'divisi'));
        } else if ($id == 'selectCustomerTH') {
            $customer_list = DB::connection('ConnJumboBag')->select('exec SP_1273_JBB_LIST_CUSTOMER');
            return response()->json($customer_list, 200);
        } else if ($id == 'selectKodeBarangTH') {
            $kode_barangList = DB::connection('ConnJumboBag')->select('exec SP_1273_JBB_LIST_KDCUST_KDBRG @KodeCustomer = ?', [$request->input('Kode_Customer')]);
            return response()->json($kode_barangList, 200);
        } else if ($id == 'selectKomponenBarangTH') {
            $dataRincianTH = DB::connection('ConnJumboBag')->table('VW_PRG_1273_JBB_LIST_KDBRG_RINCIANTH')->where('Kode_Barang', $request->input('Kode_Barang'))->where('Kode_Customer', $request->input('Kode_Customer'))->orderBy('Kode_Komponen', 'asc')->orderBy('Kounter_Komponen', 'asc')->get();
            return response()->json($dataRincianTH, 200);
        } else if ($id == 'getObjek') {
            $divisi = $request->input('divisi');
            $dataObjek = DB::connection('ConnInventory')->select('exec SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XKdUser = ?, @XIdDivisi = ?', [2, $nomorUser, $divisi]);
            return response()->json($dataObjek, 200);
        } else if ($id == 'getKelompokUtama') {
            $objek = $request->input('objek');
            $dataKelompokUtama = DB::connection('ConnInventory')->select('exec SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XIdObjek = ?', [3, $objek]);
            return response()->json($dataKelompokUtama, 200);
        } else if ($id == 'getKelompok') {
            $kelompokUtama = $request->input('kelompokUtama');
            $dataKelompok = DB::connection('ConnInventory')->select('exec SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XIdKelompokUtama = ?', [4, $kelompokUtama]);
            return response()->json($dataKelompok, 200);
        } else if ($id == 'getSubKelompok') {
            $kelompok = $request->input('kelompok');
            $dataSubKelompok = DB::connection('ConnInventory')->select('exec SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XIdKelompok = ?', [5, $kelompok]);
            return response()->json($dataSubKelompok, 200);
        } else if ($id == 'getType') {
            $subKelompok = $request->input('subKelompok');
            $dataType = DB::connection('ConnInventory')->select('exec SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XIdSubKelompok = ?', [6, $subKelompok]);
            return response()->json($dataType, 200);
        } else if ($id == 'getInventoryTypes') {
            $panjang = (float) explode('X', $request->input('panjangLebar'))[0];
            $lebar = (float) explode('X', $request->input('panjangLebar'))[1];
            $namaKomponen = $request->input('namaKomponen');
            $divisi = $request->input('divisi');

            $dataInventory = DB::connection('ConnInventory')->select('exec SP_4384_Konversi_Setengah_Jadi @XKode = ?, @XPanjang = ?, @XLebar = ?, @XNamaKomponen = ?, @XIdDivisi = ?', [1, (float) $panjang, (float) $lebar, $namaKomponen, $divisi]);
            return response()->json($dataInventory, 200);
        } else if ($id == 'getDivisi') {
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
        } else if ($id == 'getObjek') {
            $UserInput = trim(Auth::user()->NomorUser);
            $idDivisi = $request->input('idDivisi');
            $objekConn = DB::connection('ConnInventory')
                ->select('exec SP_4384_JBB_Konversi_Potong @XKdUser = ?, @XKode = ?, @XIdDivisi = ?', [$UserInput, 2, $idDivisi]);

            $objekArr = array_map(function ($objekList) {
                return [
                    'Namaobjek' => $objekList->NamaObjek,
                    'Idobjek' => $objekList->IdObjek,
                ];
            }, $objekConn);

            return datatables($objekArr)->make(true);
        } else if ($id == 'getKelompokUtama') {
            $UserInput = trim(Auth::user()->NomorUser);
            $idObjek = $request->input('idObjek');
            $KelompokUtamaConn = DB::connection('ConnInventory')
                ->select('exec SP_4384_JBB_Konversi_Potong @XKode = ?, @XIdObjek = ?', [3, $idObjek]);

            $KelompokUtamaArr = array_map(function ($KelompokUtamaList) {
                return [
                    'NamaKelompokUtama' => $KelompokUtamaList->NamaKelompokUtama,
                    'IdKelompokUtama' => $KelompokUtamaList->IdKelompokUtama,
                ];
            }, $KelompokUtamaConn);

            return datatables($KelompokUtamaArr)->make(true);
        } else if ($id == 'getKelompok') {
            $UserInput = trim(Auth::user()->NomorUser);
            $idKelompokUtama = $request->input('idKelompokUtama');
            $KelompokConn = DB::connection('ConnInventory')
                ->select('exec SP_4384_JBB_Konversi_Potong @XKode = ?, @XIdKelompokUtama = ?', [4, $idKelompokUtama]);

            $KelompokArr = array_map(function ($KelompokList) {
                return [
                    'NamaKelompok' => $KelompokList->namakelompok,
                    'IdKelompok' => $KelompokList->idkelompok,
                ];
            }, $KelompokConn);

            return datatables($KelompokArr)->make(true);
        } else if ($id == 'getSubKelompok') {
            $UserInput = trim(Auth::user()->NomorUser);
            $idKelompok = $request->input('idKelompok');
            $SubKelompokConn = DB::connection('ConnInventory')
                ->select('exec SP_4384_JBB_Konversi_Potong @XKode = ?, @XIdKelompok = ?', [5, $idKelompok]);

            $SubKelompokArr = array_map(function ($SubKelompokList) {
                return [
                    'NamaSubKelompok' => $SubKelompokList->NamaSubKelompok,
                    'IdSubKelompok' => $SubKelompokList->IdSubkelompok,
                ];
            }, $SubKelompokConn);

            return datatables($SubKelompokArr)->make(true);
        } else if ($id == 'getType') {
            $UserInput = trim(Auth::user()->NomorUser);
            $IdSubKelompok = $request->input('IdSubKelompok');
            $TypeConn = DB::connection('ConnInventory')
                ->select('exec SP_4384_JBB_Konversi_Potong @XKode = ?, @XIdSubKelompok = ?', [6, $IdSubKelompok]);

            $TypeArr = array_map(function ($TypeList) {
                return [
                    'NamaType' => $TypeList->NamaType,
                    'IdType' => $TypeList->IdType,
                ];
            }, $TypeConn);

            return datatables($TypeArr)->make(true);
        } else if ($id == 'getDataType') {
            $UserInput = trim(Auth::user()->NomorUser);
            $IdType = $request->input('IdType');
            $TypeConn = DB::connection('ConnInventory')
                ->select('exec SP_4384_JBB_Konversi_Potong @XKode = ?, @XIdType = ?', [7, (string) $IdType]);

            // $TypeArr = array_map(function ($TypeList) {
            //     return [
            //         'SaldoPrimer' => $TypeList->SaldoPrimer,
            //         'SaldoSekunder' => $TypeList->SaldoSekunder,
            //         'SaldoTritier' => $TypeList->SaldoTritier,
            //         'UnitPrimer' => $TypeList->UnitPrimer,
            //         'UnitSekunder' => $TypeList->UnitSekunder,
            //         'UnitTritier' => $TypeList->UnitTritier,
            //     ];
            // }, $TypeConn);

            return response()->json($TypeConn);
        } else if ($id == 'getDataKonversi') {
            return response()->json($request->input('idKonversi'), 200);
        } else if ($id == 'getDataKoreksi') {
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
