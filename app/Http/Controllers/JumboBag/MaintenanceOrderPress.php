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
        // Mengambil dan memotong (trim) input dari request
        $kodeBarang = trim($request->input('kodeBarangAsal'));
        $jumlah = intval($request->input('jumlah'));
        $jmlPress = intval($request->input('jumlah_press'));
        $jmlOrder = intval($request->input('jumlah_order'));
        $noSP = trim($request->input('no_suratpesanan'));
        $delivery = $request->input('delivery');
        $noSP2 = trim($request->input('stok2'));
        $delivery2 = $request->input('stok1');
        $tglMulai = $request->input('tanggals');
        $tglSelesai = $request->input('tanggalf');

        try {
            // Menghitung sisa
            $sisa = $jumlah + $jmlPress - $jmlOrder;
            if ($sisa < 0) {
                $sisa = 0;
            }

            // Menentukan status finish
            $finish = 0;
            if ($jmlOrder <= $jmlPress + $jumlah) {
                $finish = 1;
            }

            // Memanggil stored procedure
            DB::connection('ConnJumboBag')->statement(
                'exec SP_5409_JBB_UDT_STOK_PRESS @kodebarang = ?, @nosp = ?, @jumlah = ?, @sisa = ?, @nosp2 = ?, @delivery = ?, @Delivery2 = ?, @tglmulai = ?, @tglselesai = ?',
                [
                    $kodeBarang,
                    $noSP,
                    $jumlah,
                    $sisa,
                    $noSP2,
                    $delivery,
                    $delivery2,
                    $tglMulai,
                    $tglSelesai
                ]
            );

            // Menampilkan pesan sukses
            if ($finish == 1) {
                return redirect()->back()->with(['success' => 'Data tersimpan, ada kelebihan stok sebesar ' . $sisa]);
            } else {
                return redirect()->back()->with(['success' => 'Data tersimpan, jumlah yang sudah terlunasi sebesar ' . ($jmlPress + $jumlah)]);
            }

        } catch (Exception $ex) {
            return redirect()->back()->with('error', 'Terjadi kesalahan: ' . $ex->getMessage());
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
        } else if ($id == 'getNoSP') {
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
        } else if ($id == 'getBuffer') {
            // Assuming the KodeBarang parameter is passed through the request
            $kodeBarang = $request->input('kodeBarangAsal');

            // Fetch the delivery data
            $listDelivery = DB::connection('ConnJumboBag')
                ->select('exec SP_5409_JBB_CEK_BUFFERSTOK  @KodeBarang = ?', [$kodeBarang]);
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
        } else if ($id == 'getData') {
            // Fetch the necessary parameters from the request
            $noSP = $request->input('No_SuratPesanan');
            $kodeBarang = $request->input('kodeBarangAsal');
            $waktuDelivery = $request->input('Waktu_Delivery');
            // dd($noSP, $kodeBarang, $waktuDelivery);
            // Fetch the data
            $result = DB::connection('ConnJumboBag')
                ->select('exec SP_5409_JBB_SLC_BUFFERSTOK @kodebarang = ?, @delivery = ?, @nosp = ?', [$kodeBarang, $waktuDelivery, $noSP]);
            // dd(
            //     $result,
            //     $noSP,
            //     $kodeBarang,
            //     $waktuDelivery
            // );
            // Check if any data is returned
            if (!empty($result)) {
                // Initialize an array to store the formatted result
                $formattedResult = [];
                foreach ($result as $row) {
                    $formattedResult[] = [
                        'Buffer' => $row->BufferStok,
                    ];
                }
                // $formattedResult = [];
                // foreach ($result as $row) {
                //     $item = [];
                //     $item['jumlah_order'] = number_format($row->Jumlah_Order, 2);
                //     if ($row->Bentuk_BB === 'S') {
                //         $item['ukuran'] = trim($row->Bentuk_BB) . ' X ' . trim($row->Lebar_BB) . ' X ' . trim($row->Tinggi_BB);
                //     } else {
                //         $item['ukuran'] = trim($row->Diameter_BB) . ' X ' . trim($row->Tinggi_BB);
                //     }
                //     $item['rajutan'] = trim($row->WA_Rajutan) . ' X ' . trim($row->WE_Rajutan);
                //     $item['denier'] = trim($row->Denier);
                //     $item['type'] = trim($row->ModelBB) . ' TOP ' . trim($row->ModelCA) . ' BOTTOM ' . trim($row->ModelCB);
                //     $formattedResult[] = $item;
                // }
                return datatables($formattedResult)->make(true);
            } else {
                return response()->json(['message' => 'No data found'], 404);
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
