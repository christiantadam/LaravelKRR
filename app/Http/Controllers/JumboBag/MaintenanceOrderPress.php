<?php

namespace App\Http\Controllers\JumboBag;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Auth;

class MaintenanceOrderPress extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Jumbo Bag');
        return view('JumboBag.MaintenanceOrderPress', compact('access'));
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
        }else if ($id == 'getNoSP') {
            $kodeBarang = trim($request->input('kodeBarangAsal'));
            $noSP = '';
            $deliveryTime = '';
            // dd($kodeBarang);

            // Eksekusi prosedur tersimpan pertama
            $items = DB::connection('ConnJumboBag')
                ->select('exec SP_1273_JBB_LIST_NOSP_HEADTO @KodeBarang= ?', [$kodeBarang]);
            // dd($items);
            if (count($items) > 0) {
                $noSP = $items[0]->No_SuratPesanan;
                $deliveryTime = $items[0]->Waktu_Delivery;
            }

            if ($noSP !== '') {
                // Eksekusi prosedur tersimpan kedua
                $orderDetails = DB::connection('ConnJumboBag')
                    ->select('exec SP_1273_JBB_LIST_CETAK_HEADTO @KodeBarang =?, @NoSP = ?, @Waktu_Delivery =?', [$kodeBarang, $noSP, $deliveryTime]);
                // dd($orderDetails);
                $dataSuratPesanan = [];
                foreach ($items as $SuratPesanan) {
                    $dataSuratPesanan[] = [
                        'NoSP' => $SuratPesanan->No_SuratPesanan,
                        'Delivery' => $SuratPesanan->Waktu_Delivery,
                        'JumlahOrder' => $SuratPesanan->Jumlah_Order,
                        'JumlahPress' => $SuratPesanan->A_Jml_Order,
                        'start' => \Carbon\Carbon::parse($SuratPesanan->A_Tgl_Start)->format('Y-m-d'),
                        'finish' => \Carbon\Carbon::parse($SuratPesanan->A_Tgl_Finish)->format('Y-m-d'),
                    ];
                }

                return datatables($dataSuratPesanan)->make(true);
            }

            return response()->json(['status' => 'error', 'message' => 'Tidak ada data ditemukan']);
        }else if ($id == 'getBuffer') {
            try {
                $kodeBarang = $request->input('kodeBarangAsal');
                $noSP = '';
                $deliveryTime = '';
                $dataBufferStock = [];

                // Execute first stored procedure to get buffer stock
                $bufferStockItems = DB::connection('ConnJumboBag')
                    ->select('exec SP_5409_JBB_CEK_BUFFERSTOK @KodeBarang = ?', [$kodeBarang]);

                foreach ($bufferStockItems as $bufferStockItem) {
                    $dataBufferStock[] = [
                        'noSP' => $bufferStockItem->No_SuratPesanan,
                        'deliveryTime' => $bufferStockItem->Waktu_Delivery,
                    ];
                    $noSP = $bufferStockItem->No_SuratPesanan;
                    $deliveryTime = $bufferStockItem->Waktu_Delivery;
                }

                if ($noSP !== '') {
                    // Execute second stored procedure to get stock details
                    $stockDetails = DB::connection('ConnJumboBag')
                        ->select('exec SP_5409_JBB_SLC_BUFFERSTOK @kodebarang = ?, @nosp = ?, @delivery = ?', [$kodeBarang, $noSP, $deliveryTime]);

                    foreach ($stockDetails as $stockDetail) {
                        $dataBufferStock[] = [
                            'sisaStok' => $stockDetail->bufferstok,
                        ];
                    }

                    return response()->json([
                        'dataBufferStock' => $dataBufferStock,
                    ]);
                }
            } catch (Exception $ex) {
                return response()->json(['status' => 'error', 'message' => $ex->getMessage()]);
            }
        }

        return response()->json(['status' => 'error', 'message' => 'Invalid request']);
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
