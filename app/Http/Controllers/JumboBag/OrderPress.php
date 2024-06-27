<?php

namespace App\Http\Controllers\JumboBag;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Auth;

class OrderPress extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Jumbo Bag');
        return view('JumboBag.OrderPress', compact('access'));
    }
    public function create(Request $request)
    { {
            // Fetch the customer data
            $kodeCustomer = trim($request->input('kodeCustomer'));

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
        }else if ($id == 'getDeliveryList') {
            // Assuming the KodeBarang parameter is passed through the request
            $kodeBarang = $request->input('kodeBarangAsal');

            // Fetch the delivery data
            $listDelivery = DB::connection('ConnJumboBag')
                ->select('exec SP_1273_JBB_LIST_NOSP_HEADTO @KodeBarang = ?', [$kodeBarang]);
            // dd($listDelivery);
            // Convert the data into an array that DataTables can consume
            $dataDelivery = [];
            foreach ($listDelivery as $delivery) {
                $dataDelivery[] = [
                    'No_SuratPesanan' => $delivery->No_SuratPesanan,
                    'Waktu_Delivery' => $delivery->Waktu_Delivery,
                ];
            }
            return datatables($dataDelivery)->make(true);
        }else if ($id == 'getData') {
            // Fetch the necessary parameters from the request
            $noSP = $request->input('No_SuratPesanan');
            $kodeBarang = $request->input('kodeBarangAsal');
            $waktuDelivery = $request->input('Waktu_Delivery');
            // dd($noSP, $kodeBarang, $waktuDelivery);
            // Fetch the data
            $result = DB::connection('ConnJumboBag')
                ->select('exec SP_1273_JBB_LIST_CETAK_HEADTO @KodeBarang = ?, @NoSP = ?, @Waktu_Delivery = ?', [$kodeBarang, $noSP, $waktuDelivery]);
            // dd($result);
            // Check if any data is returned
            if (!empty($result)) {
                // Initialize an array to store the formatted result
                $formattedResult = [];
                foreach ($result as $row) {
                    $item = [];
                    $item['jumlah_order'] = number_format($row->Jumlah_Order, 2);
                    if ($row->Bentuk_BB === 'S') {
                        $item['ukuran'] = trim($row->Bentuk_BB) . ' X ' . trim($row->Lebar_BB) . ' X ' . trim($row->Tinggi_BB);
                    } else {
                        $item['ukuran'] = trim($row->Diameter_BB) . ' X ' . trim($row->Tinggi_BB);
                    }
                    $item['rajutan'] = trim($row->WA_Rajutan) . ' X ' . trim($row->WE_Rajutan);
                    $item['denier'] = trim($row->Denier);
                    $item['type'] = trim($row->ModelBB) . ' TOP ' . trim($row->ModelCA) . ' BOTTOM ' . trim($row->ModelCB);
                    $formattedResult[] = $item;
                }
                return datatables($formattedResult)->make(true);
            } else {
                return response()->json(['message' => 'No data found'], 404);
            }
        }else if ($id == 'getWarna') {
            // Fetch the color data
            $listColors = DB::connection('ConnJumboBag')
                ->select('exec SP_1273_JBB_LIST_WARNA');

            // Convert the data into an array that DataTables can consume
            $dataColors = [];
            foreach ($listColors as $color) {
                $dataColors[] = [
                    'Nama_Warna' => $color->Nama_Warna,
                    'Kode_Warna' => $color->Kode_Warna,
                ];
            }
            return datatables($dataColors)->make(true);
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
