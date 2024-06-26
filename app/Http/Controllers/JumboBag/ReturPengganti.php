<?php

namespace App\Http\Controllers\JumboBag;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Auth;

class ReturPengganti extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Jumbo Bag');
        return view('JumboBag.ReturPengganti', compact('access'));
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
        try {
            // Ambil input dari request
            $kodeBarang = $request->input('kodeBarangAsal');
            $jumlah = (int) $request->input('jumlah');
            $noSP = $request->input('no_suratpesanan');
            $delivery = \Carbon\Carbon::parse($request->input('delivery'));
            $jmlPress = (int) $request->input('jumlah_press');
            $jmlRetur = (int) $request->input('jumlah_retur');
            // dd($request->all());
            // Hitung sisa stok
            $sisa = $jumlah + $jmlPress - $jmlRetur;
            if ($sisa < 0) {
                $sisa = 0;
            }

            // Tentukan apakah retur sudah selesai
            $finish = 0;
            if ($jmlRetur <= $jmlPress + $jumlah) {
                $finish = 1;
            }
            // dd($sisa, $finish);
            // Buka koneksi dan eksekusi prosedur tersimpan
            DB::connection('ConnJumboBag')->statement('exec SP_5409_JBB_UDT_SALDO_RETUR ?, ?, ?, ?, ?', [
                $kodeBarang,
                $noSP,
                $jumlah,
                $delivery,
                $finish ? now()->format('m/d/Y') : null,
            ]);

            // Tentukan pesan yang akan dikembalikan berdasarkan kondisi finish
            if ($finish == 1) {
                $message = "data tersimpan, ada kelebihan stok sebesar " . $sisa;
            } else {
                $message = "data tersimpan, jumlah yang sudah terlunasi sebesar " . ($jmlPress + $jumlah);
            }

            // Mengembalikan respons JSON
            return redirect()->back()->with(['success' => $message,]);
            // return response()->json(['message' => $message, ]);

        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
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
        } elseif ($id == 'getnoSP') {
            $kodeBarang = $request->input('kodeBarangAsal');
            $lookupData = DB::connection('ConnJumboBag')->select('exec SP_5409_JBB_LIST_RETUR ?', [$kodeBarang]);

            $data = [];
            foreach ($lookupData as $item) {
                $data[] = [
                    'No_SuratPesanan' => $item->No_SuratPesanan,
                    'Waktu_Delivery' => $item->Waktu_Delivery,
                ];
            }
            return datatables($data)->make(true);

        } elseif ($id == 'getRetur') {
            $noSuratPesanan = $request->input('No_SuratPesanan');
            $waktuDelivery = $request->input('Waktu_Delivery');
            $kodeBarang = $request->input('kodeBarangAsal');
            // dd($noSuratPesanan, $waktuDelivery, $kodeBarang);
            $details = DB::connection('ConnJumboBag')->select('exec SP_5409_JBB_SLC_RETUR ?, ?, ?', [
                $noSuratPesanan,
                $kodeBarang,
                $waktuDelivery,
            ]);
            // dd($details);

            $result = [];
            foreach ($details as $detail) {
                $result[] = [
                    'jumlah_retur' => $detail->Jumlah_Retur,
                    'referensi' => $detail->Referensi,
                    'Jumlah_Produksi' => $detail->Jumlah_Produksi,
                ];
            }
            // Mengembalikan data dalam format JSON
            return datatables($result)->make(true);
            // return response()->json($result);
        }

        return response()->json(['message' => 'Invalid request'], 400);
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
