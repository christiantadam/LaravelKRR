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
        if ($request->input('typeForm') == 'printReport') {
            // dd($request->input('cat'));
            $noSP = trim($request->input('no_suratpesanan'));
            $kodeBarang = $request->input('kodeBarangAsal');
            $waktuDelivery = $request->input('delivery');
            $referensi = $request->input('no_referensi');
            $warna = trim($request->input('warna'));
            $packing = $request->input('packing');
            $hal = $request->input('halaman');
            $binaryData = null;

            if ($request->has('foto')) {
                try {
                    $base64Data = $request->input('foto');
                    $binaryData = base64_decode($base64Data);
                } catch (Exception $e) {
                    return response()->json(['error' => 'Invalid image data'], 400);
                }
            }

            try {
                // Update the HEAD_TABEL_ORDER table
                DB::connection('ConnJumboBag')
                    ->table('HEAD_TABEL_ORDER')
                    ->where('Kode_Barang', $kodeBarang)
                    ->where('No_SuratPesanan', $noSP)
                    ->whereDate('Waktu_Delivery', date('Y-m-d', strtotime($waktuDelivery)))
                    ->update([
                        'Warna' => $warna,
                        'Packing' => $packing,
                        'Referensi_Press' => $referensi,
                        // 'Hal' => $hal,
                        'Keterangan' => $request->input('cat', null), // Optional 'cat' parameter
                        'Foto' => $binaryData ? DB::raw('0x' . bin2hex($binaryData)) : null,
                    ]);
                // Set the criteria based on 'iner' value
                $tableName = $request->input('iner') == 'Y' ? 'VW_PRG_1273_JBB_CETAK_ORDPRESS1' : 'VW_PRG_1273_JBB_CETAK_ORDPRESS';
                // $tableName = 'VW_PRG_1273_JBB_CETAK_ORDPRESS';
                // dd($tableName);
                $criteriaQuery = DB::connection('ConnJumboBag')
                    ->table($tableName)
                    ->where('Kode_Barang', 'like', "{$kodeBarang}%")
                    ->where('No_SuratPesanan', $noSP)
                    ->whereDate('Waktu_Delivery', date('Y-m-d', strtotime($waktuDelivery)));

                // Execute the query
                $criteria = $criteriaQuery->get();

                // Check if criteria is empty
                if ($criteria->isEmpty()) {
                    return response()->json(['error' => 'No data found'], 404);
                }

                // Prepare data for DataTables response
                $data = [];
                foreach ($criteria as $row) {
                    $data[] = [
                        'Kode_Barang' => $row->Kode_Barang ?? "",
                        'Panjang_BB' => $row->Panjang_BB ?? "",
                        'Lebar_BB' => $row->Lebar_BB ?? "",
                        'Tinggi_BB' => $row->Tinggi_BB ?? "",
                        'Diameter_BB' => $row->Diameter_BB ?? "",
                        'ModelBB' => $row->ModelBB ?? "",
                        'ModelCA' => $row->ModelCA ?? "",
                        'ModelCB' => $row->ModelCB ?? "",
                        'No_SuratPesanan' => $row->No_SuratPesanan ?? "",
                        'Tanggal' => $row->Tanggal ?? "",
                        'Waktu_Delivery' => \Carbon\Carbon::parse($row->Waktu_Delivery)->format('m/d/Y'),
                        'Jumlah_Order' => $row->Jumlah_Order ?? "",
                        'Bentuk_BB' => $row->Bentuk_BB ?? "",
                        'Keterangan' => $row->Keterangan ?? "",
                        'Jumlah_Jahit' => $row->Jumlah_Jahit ?? "",
                        'Referensi_Press' => $row->Referensi_Press ?? "",
                        'Warna' => $row->Warna ?? "",
                        'Packing' => $row->Packing ?? "",
                        'Standart_Komponen' => $row->Standart_Komponen ?? "",
                        'BufferStok' => $row->BufferStok ?? "",
                        'WA_Rajutan' => $row->WA_Rajutan ?? "",
                        'WE_Rajutan' => $row->WE_Rajutan ?? "",
                        'Denier' => $row->Denier ?? "",
                        'Hal' => $row->Hal ?? "",
                        'A_Jml_Order' => $row->A_Jml_Order ?? "",
                        'A_Tgl_Start' => $row->A_Tgl_Start ?? "",
                        'A_Tgl_Finish' => $row->A_Tgl_Finish ?? "",
                        'Iner' => $row->Iner ?? "",
                        'Catatan' => $row->Catatan ?? "",
                        'IdBarang' => $row->IdBarang ?? "",
                        'Foto' => $row->Foto ? 'data:image/jpeg;base64,' . base64_encode($row->Foto) : null,
                        'StdWaktu' => $row->StdWaktu  ?? "",
                        'Panjang_Potongan' => $row->Panjang_Potongan ?? "",
                        'Lebar_Potongan' => $row->Lebar_Potongan ?? "",
                        'Tebal_Iner' => $row->Tebal_Iner ?? "",
                        'Seal' => $row->Seal ?? "",
                    ];
                }

                // Return the data in a format that DataTables can consume
                return datatables()->of($data)->make(true);
            } catch (Exception $e) {
                \Log::error("Error: " . $e->getMessage());
                return response()->json(['error' => 'An error occurred'], 500);
            }
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
        } else if ($id == 'getDeliveryList') {
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
                    // 'IdBarang' => $delivery->IdBarang,
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
                    $item['iner'] = trim($row->Iner);
                    $item['idBarang'] = trim($row->IdBarang);
                    if ($row->Foto) {
                        $item['foto'] = 'data:image/jpeg;base64,' . base64_encode($row->Foto);
                    } else {
                        $item['foto'] = null;
                    }
                    $formattedResult[] = $item;
                    // dd($formattedResult);
                }
                // dd($formattedResult);
                return datatables($formattedResult)->make(true);
            } else {
                return response()->json(['message' => 'No data found'], 404);
            }
        } else if ($id == 'getWarna') {
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
        // else if ($id == 'printReport') {
        //     // dd($request->all());
        //     // Fetch the necessary parameters from the request
        //     $noSP = trim($request->input('no_suratpesanan'));
        //     $kodeBarang = $request->input('kodeBarangAsal');
        //     $waktuDelivery = $request->input('delivery');
        //     $referensi = $request->input('no_referensi');
        //     $warna = trim($request->input('warna'));
        //     $packing = $request->input('packing');
        //     $hal = $request->input('halaman');
        //     if ($request->has('foto')) {
        //         $base64Image = $request->input('foto');
        //     }
        //     dd($base64Image);

        //     try {
        //         // Update no ref, warna, packing hal in the head order table
        //         DB::connection('ConnJumboBag')->statement('exec SP_1273_JBB_UDT_PRESS_HEADTO @NoSP = ?, @KodeBarang = ?, @Waktu_Delivery = ?, @Referensi = ?, @warna = ?, @packing = ?, @hal = ?, @Foto = ?', [$noSP, $kodeBarang, $waktuDelivery, $referensi, $warna, $packing, $hal, $base64Image]);

        //         // Set the criteria based on 'iner' value
        //         $tableName = $request->input('iner') === 'Y' ? 'VW_PRG_1273_JBB_CETAK_ORDPRESS1' : 'VW_PRG_1273_JBB_CETAK_ORDPRESS';
        //         $criteriaQuery = DB::connection('ConnJumboBag')
        //             ->table($tableName)
        //             ->where('Kode_Barang', 'like', "{$kodeBarang}%")
        //             ->where('No_SuratPesanan', $noSP)
        //             ->whereDate('Waktu_Delivery', date('Y-m-d', strtotime($waktuDelivery)));

        //         // Execute the query
        //         $criteria = $criteriaQuery->get();
        //         // dd($criteria);
        //         // Check if criteria is empty
        //         if ($criteria->isEmpty()) {
        //             return response()->json(['error' => 'No data found']);
        //         }

        //         // Prepare data for DataTables response
        //         $data = [];
        //         foreach ($criteria as $row) {
        //             $data[] = [
        //                 'Kode_Barang' => $row->Kode_Barang,
        //                 'Panjang_BB' => $row->Panjang_BB,
        //                 'Lebar_BB' => $row->Lebar_BB,
        //                 'Tinggi_BB' => $row->Tinggi_BB,
        //                 'Diameter_BB' => $row->Diameter_BB,
        //                 'ModelBB' => $row->ModelBB,
        //                 'ModelCA' => $row->ModelCA,
        //                 'ModelCB' => $row->ModelCB,
        //                 'No_SuratPesanan' => $row->No_SuratPesanan,
        //                 'Tanggal' => $row->Tanggal,
        //                 'Waktu_Delivery' => \Carbon\Carbon::parse($row->Waktu_Delivery)->format('m/d/Y'),
        //                 'Jumlah_Order' => $row->Jumlah_Order,
        //                 'Bentuk_BB' => $row->Bentuk_BB,
        //                 'Keterangan' => $row->Keterangan,
        //                 'Jumlah_Jahit' => $row->Jumlah_Jahit,
        //                 'Referensi_Press' => $row->Referensi_Press,
        //                 'Warna' => $row->Warna,
        //                 'Packing' => $row->Packing,
        //                 'Standart_Komponen' => $row->Standart_Komponen,
        //                 'BufferStok' => $row->BufferStok,
        //                 'WA_Rajutan' => $row->WA_Rajutan,
        //                 'WE_Rajutan' => $row->WE_Rajutan,
        //                 'Denier' => $row->Denier,
        //                 'Hal' => $row->Hal,
        //                 'A_Jml_Order' => $row->A_Jml_Order,
        //                 'A_Tgl_Start' => $row->A_Tgl_Start,
        //                 'A_Tgl_Finish' => $row->A_Tgl_Finish,
        //                 'Tebal_Iner' => $row->Tebal_Iner,
        //                 'Iner' => $row->Iner,
        //                 'Catatan' => $row->Catatan,
        //                 'IdBarang' => $row->IdBarang,
        //                 'Foto' => $row->Foto,
        //                 'StdWaktu' => $row->StdWaktu,
        //             ];
        //         }

        //         // Return the data in a format that DataTables can consume
        //         return datatables($data)->make(true);
        //     } catch (Exception $e) {
        //         \Log::error("Error: " . $e->getMessage());
        //         return response()->json(['error' => $e->getMessage()]);
        //     }
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
    public function destroy($id)
    {
        //
    }
}
