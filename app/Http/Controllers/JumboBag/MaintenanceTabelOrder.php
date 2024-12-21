<?php

namespace App\Http\Controllers\JumboBag;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class MaintenanceTabelOrder extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Jumbo Bag');
        return view('JumboBag.MaintenanceTabelOrder', compact('access'));
    }
    public function create(Request $request)
    { {
            // Fetch the customer data
            $kodeCustomer = trim($request->input('kodeCustomer'));
            $proses = $request->input('proses');
            // dd($proses);
            // Step 1: Check if there are items for the customer
            $checkResult = DB::connection('ConnJumboBag')
                ->select('exec SP_1273_JBB_CHECK_CUST_KDBRG @KodeCustomer = ?', [$kodeCustomer]);

            $ada = 0;
            if ($checkResult && count($checkResult) > 0) {
                $ada = $checkResult[0]->Ada;
            }

            if ($ada > 0) {
                // Step 2: Fetch the list of items for the customer
                $listKodebarang = DB::connection('ConnJumboBag')
                    ->select('exec SP_1273_JBB_LIST_KDCUST_KDBRG @KodeCustomer = ?', [$kodeCustomer]);

                // Prepare data for DataTables
                $dataKodebarang = [];
                foreach ($listKodebarang as $Kd) {
                    $dataKodebarang[] = [
                        'tanggal' => $Kd->tanggal,
                        'Kode_Barang' => $Kd->kode_barang,
                    ];
                }

                // Check if `kodeBrgAsal` is not empty
                $kodeBrgAsal = $request->input('kodeBrgAsal');
                if (!empty($kodeBrgAsal)) {
                    // Get first 6 characters of `kodeBrgAsal`
                    $kodeBarangDirubah = substr($kodeBrgAsal, 0, 6);
                }

                // Return the data in a DataTables-compatible format
                return datatables($dataKodebarang)->make(true);
            } else {
                // Handle the case where there are no items for the customer
                return response()->json(['message' => 'Tidak ada kode barang untuk customer ' . $kodeCustomer], 404);
            }
        }
    }
    public function store(Request $request)
    {
        try {
            $proses = $request->input('proses');
            // dd($proses);
            switch ($proses) {
                case 1:
                    DB::connection('ConnJumboBag')->beginTransaction();
                    try {
                        DB::connection('ConnJumboBag')->statement('EXEC SP_1273_JBB_UDT_KDBRG_IDBRG ?, ?, ?', [
                            $request->input('kodeBarangAsal'),
                            $request->input('kodebarangs'),
                            $request->input('id_customer'),
                        ]);
                        // dd($request->all());
                        DB::connection('ConnJumboBag')->statement('EXEC SP_1273_JBB_INS_HEADTO ?, ?, ?, ?, ?, ?, ?, ?, ?', [
                            $request->input('no_pesanan'),
                            $request->input('kodeBarangAsal'),
                            now()->format('Y-m-d'),
                            $request->input('time_deliv'),
                            $request->input('jumlah_order'),
                            $request->input('idpesanan'),
                            $request->input('kodebarangs'),
                            $request->input('tanggal_dikerjakan'),
                            $request->input('tanggal_selesai'),
                        ]);

                        DB::connection('ConnJumboBag')->statement('EXEC SP_1273_JBB_INS_RINCIANTO ?, ?, ?, ?', [
                            $request->input('no_pesanan'),
                            $request->input('kodeBarangAsal'),
                            $request->input('time_deliv'),
                            $request->input('jumlah_order'),
                        ]);

                        DB::connection('ConnJumboBag')->commit();
                        return response()->json(['success' => 'Data sudah disimpan!']);
                    } catch (Exception $e) {
                        DB::connection('ConnJumboBag')->rollback();
                        return response()->json(['error' => 'Gagal menyimpan data: ' . $e->getMessage()]);
                    }
                // break;

                case 2:
                    DB::connection('ConnJumboBag')->beginTransaction();
                    try {
                        DB::connection('ConnJumboBag')->statement('EXEC SP_5409_JBB_UDT_HEADTO ?, ?, ?, ?, ?', [
                            $request->input('kodeBarangAsal'),
                            $request->input('no_pesanan'),
                            $request->input('jumlah_order'),
                            $request->input('time_deliv'),
                            $request->input('time_deliv'),
                        ]);

                        DB::connection('ConnJumboBag')->statement('EXEC SP_1273_JBB_INS_RINCIANTO ?, ?, ?, ?', [
                            $request->input('no_pesanan'),
                            $request->input('kodeBarangAsal'),
                            $request->input('time_deliv'),
                            $request->input('jumlah_order'),
                        ]);

                        DB::connection('ConnJumboBag')->commit();
                        return response()->json(['success' => 'Data sudah dikoreksi!']);
                        // return response()->json(['success' => $request->all()]);
                    } catch (Exception $e) {
                        DB::connection('ConnJumboBag')->rollback();
                        return response()->json(['error' => 'Gagal mengoreksi data: ' . $e->getMessage()]);
                    }
                // break;

                case 3:
                    DB::connection('ConnJumboBag')->beginTransaction();
                    try {
                        DB::connection('ConnJumboBag')->statement('EXEC SP_1273_JBB_DLT_HEADTO ?, ?, ?', [
                            $request->input('kodeBarangAsal'),
                            $request->input('no_pesanan'),
                            $request->input('time_deliv'),
                        ]);

                        DB::connection('ConnJumboBag')->commit();
                        return response()->json(['success' => 'Data sudah dihapus!']);
                    } catch (Exception $e) {
                        DB::connection('ConnJumboBag')->rollback();
                        return response()->json(['error' => 'Gagal menghapus data: ' . $e->getMessage()]);
                    }
                // break;

                case 4:
                    DB::connection('ConnJumboBag')->beginTransaction();
                    try {
                        DB::connection('ConnJumboBag')->statement('EXEC SP_1273_JBB_STOPORDER_HEADTO ?, ?, ?, ?, ?', [
                            $request->input('kodeBarangAsal'),
                            $request->input('no_pesanan'),
                            $request->input('time_deliv'),
                            $request->input('tanggal_j'),
                            $request->input('txtAlasan'),
                        ]);

                        DB::connection('ConnJumboBag')->commit();
                        return response()->json(['success' => 'Data sudah diproses!']);
                    } catch (Exception $e) {
                        DB::connection('ConnJumboBag')->rollback();
                        return response()->json(['error' => 'Gagal memproses data: ' . $e->getMessage()]);
                    }
                // break;

                default:
                    return response()->json(['error' => 'Proses tidak dikenal!']);
            }
        } catch (Exception $ex) {
            return response()->json(['error' => $ex->getMessage()]);
        }
    }

    public function show(Request $request, $id)
    {
        if ($id == 'getListCustomer') {
            // Fetch the customer data
            $listCustomer = DB::connection('ConnJumboBag')
                ->select('exec SP_1273_JBB_LIST_CUSTOMER');
            // Convert the data into an array that DataTables can consume
            $dataCustomer = [];
            foreach ($listCustomer as $Customer) {
                $dataCustomer[] = [
                    'Kode_Customer' => $Customer->Kode_Customer,
                    'Nama_Customer' => $Customer->Nama_Customer,
                ];
            }
            return datatables($dataCustomer)->make(true);
        } else if ($id == 'getPesanan') {
            // Fetch the NoSP data
            $kodeBarang = $request->input('kodeBarangAsal');
            $listNoSP = DB::connection('ConnJumboBag')
                ->select('exec SP_1273_JBB_LIST_NOSP_HEADTO @KodeBarang = ?', [$kodeBarang]);

            // Process the data for the lookup
            $dataNoSP = [];
            foreach ($listNoSP as $noSP) {
                $dataNoSP[] = [
                    'No_SuratPesanan' => $noSP->No_SuratPesanan,
                    'Waktu_Delivery' => \Carbon\Carbon::parse($noSP->Waktu_Delivery)->format('Y-m-d'),
                ];
            }

            return datatables($dataNoSP)->make(true);
        } else if ($id == 'getOrder') {
            $kodeBarang = $request->input('kodeBarangAsal');
            $noSP = $request->input('no_pesanan');

            $details = DB::connection('ConnJumboBag')
                ->select('exec SP_1273_JBB_LIST_KDBRG_HEADTO @KodeBarang = ?, @NoSP = ?', [$kodeBarang, $noSP]);
            // dd($details);
            if (!empty($details)) {
                $detail = $details[0];
                return response()->json([
                    'Jumlah_Order' => $detail->Jumlah_Order,
                    'Waktu_Delivery' => \Carbon\Carbon::parse($detail->Waktu_Delivery)->format('Y-m-d'),
                    'Tgl_Start' => $detail->A_Tgl_Start,
                    'Tgl_Finish' => $detail->A_Tgl_Finish,
                ]);
            } else {
                return response()->json(['error' => 'No data found'], 404);
            }
        } else if ($id == 'getCustomerDetails') {
            // Fetch the customer details
            $listCustomer = DB::connection('ConnJumboBag')
                ->select('exec SP_1273_JBB_LIST_SALES @Kode = ?', [6]);

            // Process the data for the lookup
            $dataCustomer = [];
            foreach ($listCustomer as $customer) {
                $dataCustomer[] = [
                    'NamaCust' => $customer->NamaCust,
                    'KodeCust' => $customer->KodeCust,
                ];
            }

            return datatables($dataCustomer)->make(true);
        } else if ($id == 'getBarangDetails') {
            // Fetch the barang details
            $idCustomers = $request->input('id_customers');
            // dd($idCustomers);
            $listBarang = DB::connection('ConnJumboBag')
                ->select('exec SP_1273_JBB_LIST_SALES @Kode = ?, @IdCustSLS = ?', [7, $idCustomers]);
            // dd($listBarang);
            // Process the data for the lookup
            $dataBarang = [];
            foreach ($listBarang as $barang) {
                $dataBarang[] = [
                    'NamaType' => $barang->NamaType,
                    'IdBarang' => $barang->IdBarang,
                ];
            }

            return datatables($dataBarang)->make(true);
        } else if ($id == 'getSuratPesananDetails') {
            // Fetch the NoSP data
            $kodeBarangSLS = $request->input('kodebarangs');
            $jenisBarang = $request->input('jenis_barang');
            // dd($kodeBarangSLS, $jenisBarang);
            $queryParams = [
                $kodeBarangSLS,
            ];

            if (substr($jenisBarang, -1) === 'E') {
                $jnsBrg = 'JBE';
                $queryParams[] = 9;
                $queryParams[] = $jnsBrg;
            } else if (substr($jenisBarang, -1) === 'F') {
                $jnsBrg = 'JBF';
                $queryParams[] = 9;
                $queryParams[] = $jnsBrg;
            } else if (substr($jenisBarang, -1) === 'N') {
                $jnsBrg = 'JBN';
                $queryParams[] = 9;
                $queryParams[] = $jnsBrg;
            } else {
                $jnsBrg = '';
                $queryParams[] = 2;
                $queryParams[] = $jnsBrg;
            }

            // dd($queryParams);
            $listSuratPesanan = DB::connection('ConnJumboBag')
                ->select('exec SP_1273_JBB_LIST_SALES @KodeBarangSLS = ?, @Kode = ?, @JnsBrg = ?', $queryParams);
            // dd($listSuratPesanan);
            // Process the data for the lookup
            $dataSuratPesanan = [];
            foreach ($listSuratPesanan as $suratPesanan) {
                $dataSuratPesanan[] = [
                    'IDSuratPesanan' => $suratPesanan->IDSuratPesanan,
                    'Qty' => $suratPesanan->Qty,
                    'IDPesanan' => $suratPesanan->IDPesanan ?? null,
                ];
            }

            return datatables($dataSuratPesanan)->make(true);
        } else if ($id == 'getTransfer') {
            $kodeBarangSLS = $request->input('kodebarangs');
            $jenisBarang = $request->input('jenis_barang');
            $noSP = $request->input('IDSuratPesanan');
            // dd($kodeBarangSLS, $jenisBarang, $noSP);
            $queryParams = [
                $kodeBarangSLS,
                3,
                $noSP . (in_array(substr($jenisBarang, -1), ['E', 'F', 'N']) ? '' : 'A'),
            ];
            // dd($queryParams);
            $details = DB::connection('ConnJumboBag')
                ->select('exec SP_1273_JBB_LIST_SALES @KodeBarangSLS = ?, @Kode = ?, @IdSuratPesanan = ?', $queryParams);
            // dd($details);
            if (!empty($details)) {
                $detail = $details[0];
                return response()->json([
                    'IDSuratPesanan' => $detail->IDSuratPesanan ?? '',
                    'Qty' => $detail->Qty ?? '',
                    'TglRencanaKirim' => \Carbon\Carbon::parse($detail->TglRencanaKirim)->format('Y-m-d') ?? '',
                ]);
            }
            // else {
            //     return response()->json(['error' => 'No data found'], 404);
            // }
        } else if ($id == 'getSuratPesananDetailsExtra') {
            $kodeBarangSLS = $request->input('kodebarangs');
            $jenisBarang = $request->input('jenis_barang');
            $noSP = $request->input('IDSuratPesanan');
            // dd($kodeBarangSLS, $jenisBarang, $noSP);
            $queryParams = [
                $kodeBarangSLS,
                3,
                $noSP . (in_array(substr($jenisBarang, -1), ['E', 'F', 'N']) ? '' : 'A'),
            ];

            $details = DB::connection('ConnJumboBag')
                ->select('exec SP_1273_JBB_LIST_SALES @KodeBarangSLS = ?, @Kode = ?, @IdSuratPesanan = ?', $queryParams);
            // dd($details);
            if (!empty($details)) {
                $detail = $details[0];
                return response()->json([
                    'IDPesanan' => $detail->IDPesanan ?? '',
                    'Satuan' => $detail->Satuan ?? '',
                    'TglRencanaKirim' => $detail->TglRencanaKirim ?? '',
                ]);
            }
            // else {
            //     return response()->json(['error' => 'No data found'], 404);
            // }
        } else if ($id == 'checkSisaOrder') {
            $kodeBarang = $request->input('kodebarangs');
            $noSP = $request->input('IDSuratPesanan');
            // dd($kodeBarang, $noSP);
            $sisaOrder = DB::connection('ConnJumboBag')
                ->select('exec SP_1273_JBB_LIST_SISAORDER @KodeBarang = ?, @Kode = ?, @IdSP = ?', [$kodeBarang, 1, $noSP]);
            // dd($sisaOrder);
            $ada = false;
            if (!empty($sisaOrder)) {
                foreach ($sisaOrder as $order) {
                    if ($order->Ada > 0) {
                        $ada = true;
                        break;
                    }
                }
            }

            if ($ada) {
                $sisaDetails = DB::connection('ConnJumboBag')
                    ->select('exec SP_1273_JBB_LIST_SISAORDER @KodeBarang = ?, @Kode = ?, @IdSP = ?', [$kodeBarang, 2, $noSP]);
                // dd($sisaDetails);
                if (!empty($sisaDetails)) {
                    $sisaDetail = $sisaDetails[0];
                    return response()->json([
                        'SisaOrder' => $sisaDetail->SisaOrder ?? 0,
                    ]);
                } else {
                    return response()->json(['error' => 'No data found'], 404);
                }
            } else {
                return response()->json(['ada' => false]);
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
