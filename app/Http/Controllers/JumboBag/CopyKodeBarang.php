<?php

namespace App\Http\Controllers\JumboBag;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Auth;

class CopyKodeBarang extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Jumbo Bag');
        return view('JumboBag.CopyKodeBarang', compact('access'));
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
        $access = (new HakAksesController)->HakAksesFiturMaster('Jumbo Bag');

        // Check if the new product code is provided
        if (empty($request->input('kodeBarangDirubah'))) {
            return response()->json(['message' => 'Kode Barang Pengganti Harus Diisi'], 400);
        }

        try {
            $kodeBrgAsal = trim($request->input('kodeBarangAsal'));
            $kodeBarangTuj = trim($request->input('kodeBarangDirubah'));
            $kodeCust = trim($request->input('id_customers'));
            $operator = trim(Auth::user()->NomorUser);

            // Step 1: Check if the new product code already exists
            $result = DB::connection('ConnJumboBag')
                ->select('exec SP_1273_JBB_CHECKKD_KDBRG @KodeBarang = ?', [$kodeBarangTuj]);

            $ada2 = $result[0]->Ada ?? 0;

            if ($ada2 > 0) {
                // New product code already exists
                return redirect()->back()->with('error', 'Kode Barang pengganti SUDAH ADA !!...');
            } else {
                // Step 2: Insert into the tables using the provided stored procedure
                DB::connection('ConnJumboBag')->statement(
                    'exec SP_5409_JBB_COPY_KODEBARANG @KdBrgOld = ?, @KdBrgNew = ?, @UserId = ?, @kodeCustomer = ?',
                    [$kodeBrgAsal, $kodeBarangTuj, $operator, $kodeCust]
                );
                return redirect()->back()->with('success', 'Data berhasil dicopy.');
            }
        } catch (Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function show(Request $request, $id)
    {
        if ($id == 'getTableHitungan') {
            $namaCustomer = trim($request->input('NamaCustomer'));
            $kodeBarang = trim($request->input('KodeBarang'));

            // Fetch the item details
            $itemDetails = DB::connection('ConnJumboBag')
                ->select('exec SP_1273_JBB_LIST_KDBRG_RINCIANTH @NamaCustomer = ?, @KodeBarang = ?', [$namaCustomer, $kodeBarang]);

            // Prepare data for DataTables
            $dataItemDetails = [];
            foreach ($itemDetails as $detail) {
                $dataItemDetails[] = [
                    'Kode_Komponen' => $detail->Kode_Komponen,
                    'Nama_Komponen' => $detail->Nama_Komponen,
                    'Panjang_Potongan' => number_format($detail->Panjang_Potongan, 0, ',', '.'),
                    'Lebar_Potongan' => number_format($detail->Lebar_Potongan, 0, ',', '.'),
                    'WA_Rajutan' => number_format($detail->WA_Rajutan, 0, ',', '.'),
                    'WE_Rajutan' => number_format($detail->WE_Rajutan, 0, ',', '.'),
                    'Denier' => number_format($detail->Denier, 2, ',', '.'),
                    'Quantity' => number_format($detail->Quantity, 2, ',', '.'),
                    'Berat' => number_format($detail->Berat, 2, ',', '.'),
                    'Harga' => number_format($detail->Harga, 2, ',', '.'),
                    'SubTotal' => number_format($detail->SubTotal, 2, ',', '.'),
                    'Kounter_Komponen' => number_format($detail->Kounter_Komponen, 0, ',', '.'),
                ];
            }

            // Return the data in a DataTables-compatible format
            return datatables($dataItemDetails)->make(true);
        } else if ($id == 'getListCustomer') {
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
