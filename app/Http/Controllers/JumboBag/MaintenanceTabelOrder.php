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
        //
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
                    'Waktu_Delivery' => $noSP->Waktu_Delivery,
                ];
            }

            return datatables($dataNoSP)->make(true);
        } else if ($id == 'getJumlahOrder') {
            $kodeBarang = $request->input('kodeBarangAsal');
            $noSP = $request->input('NoSP');

            $details = DB::connection('ConnJumboBag')
                ->select('exec SP_1273_JBB_LIST_KDBRG_HEADTO @KodeBarang = ?, @NoSP = ?', [$kodeBarang, $noSP]);

            if (!empty($details)) {
                $detail = $details[0];
                return response()->json([
                    'jumlah_order' => $detail->jumlah_order,
                    'waktu_delivery' => \Carbon\Carbon::parse($detail->waktu_delivery)->format('m/d/Y'),
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
            dd($kodeBarangSLS, $jenisBarang);
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
            }

            $listSuratPesanan = DB::connection('ConnJumboBag')
                ->select('exec SP_1273_JBB_LIST_SALES @KodeBarangSLS = ?, @Kode = ?, @JnsBrg = ?', $queryParams);
            // dd($listSuratPesanan);
            // Process the data for the lookup
            $dataSuratPesanan = [];
            foreach ($listSuratPesanan as $suratPesanan) {
                $dataSuratPesanan[] = [
                    'IdSuratPesanan' => $suratPesanan->IdSuratPesanan,
                    'Qty' => $suratPesanan->Qty,
                ];
            }

            return datatables($dataSuratPesanan)->make(true);
        } else if ($id == 'getSuratPesananDetailsExtra') {
            $kodeBarangSLS = $request->input('kodeBarangSLS');
            $jenisBarang = $request->input('jenisBarang');
            $noSP = $request->input('NoSP');

            $queryParams = [
                $kodeBarangSLS,
                3,
                $noSP . (in_array(substr($jenisBarang, -1), ['E', 'F', 'N']) ? '' : 'A'),
            ];

            $details = DB::connection('ConnJumboBag')
                ->select('exec SP_1273_JBB_LIST_SALES @KodeBarangSLS = ?, @Kode = ?, @IdSuratPesanan = ?', $queryParams);

            if (!empty($details)) {
                $detail = $details[0];
                return response()->json([
                    'IdPesanan' => $detail->IdPesanan,
                    'Satuan' => $detail->Satuan,
                    'TglRencanaKirim' => $detail->TglRencanaKirim,
                ]);
            } else {
                return response()->json(['error' => 'No data found'], 404);
            }
        } else if ($id == 'checkSisaOrder') {
            $kodeBarang = $request->input('kodeBarang');
            $noSP = $request->input('NoSP');

            $sisaOrder = DB::connection('ConnJumboBag')
                ->select('exec SP_1273_JBB_LIST_SISAORDER @KodeBarang = ?, @Kode = ?, @IdSP = ?', [$kodeBarang, 1, $noSP]);

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

                if (!empty($sisaDetails)) {
                    $sisaDetail = $sisaDetails[0];
                    return response()->json([
                        'SisaOrder' => $sisaDetail->SisaOrder,
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
