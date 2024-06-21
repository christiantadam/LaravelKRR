<?php

namespace App\Http\Controllers\JumboBag;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Auth;

class UbahKodeBarang extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Jumbo Bag');
        return view('JumboBag.UbahKodeBarang', compact('access'));
    }

    public function create(Request $request)
    {
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

    public function proses(Request $request)
    {
        // Validasi input

        if (empty($request->input('kodeBarangTuj'))) {
            return response()->json(['message' => 'Kode Barang Pengganti Harus Diisi'], 400);
        }

        try {
            $kodeBrgAsal = trim($request->input('kodeBrgAsal'));
            $kodeBarangTuj = trim($request->input('kodeBarangTuj'));
            $kodeCust = trim($request->input('idCustomer'));
            $tanggal = $request->input('tanggal');
            $operator = trim(Auth::user()->NomorUser);

            // Langkah 1: Cek apakah kode barang asal sudah ada di database
            $result = DB::connection('ConnJumboBag')
                ->select('exec SP_1273_JBB_CHECKKD_HEADTO @KodeBarang = ?', [$kodeBrgAsal]);

            $ada = $result[0]->Ada ?? 0;

            if ($ada == 0) {
                // Langkah 2: Cek apakah kode barang pengganti sudah ada
                $result2 = DB::connection('ConnJumboBag')
                    ->select('exec SP_1273_JBB_CHECKKD_KDBRG @KodeBarang = ?', [$kodeBarangTuj]);

                $ada2 = $result2[0]->Ada ?? 0;

                if ($ada2 > 0) {
                    return response()->json(['message' => 'Kode Barang pengganti SUDAH ADA !!...'], 400);
                } else {
                    // Langkah 3: Update tabel head, rincian tabel hitungan, kode barang dan hapus data yang lama
                    DB::connection('ConnJumboBag')->statement(
                        'exec SP_1273_JBB_UBAH_KDBRG @KodeCust = ?, @OldKodeBrg = ?, @NewKodeBrg = ?, @Tgl = ?, @TglUpdate = ?, @UserLgn =?',
                        [$kodeCust, $kodeBrgAsal, $kodeBarangTuj, $tanggal, now()->format('Y-m-d'), $operator]
                    );
                    return response()->json(['success' => 'Data Tersimpan']);
                    // return response()->json(['message' => 'Data Tersimpan'], 200);
                }
            } else {
                return response()->json(['error' => 'Kode barang tidak dapat diubah, sebab sudah Cetak Tabel Order'], 400);
            }

        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }



    public function store(Request $request)
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Jumbo Bag');
        // dd($request->all());
        if (empty($request->input('kodeBarangDirubah'))) {
            return response()->json(['message' => 'Kode Barang Pengganti Harus Diisi'], 400);
        }

        try {
            $kodeBrgAsal = trim($request->input('kodeBarangAsal'));
            $kodeBarangTuj = trim($request->input('kodeBarangDirubah'));
            $kodeCust = trim($request->input('id_customer'));
            $tanggal = $request->input('tanggal');
            $operator = trim(Auth::user()->NomorUser);

            // Langkah 1: Cek apakah kode barang asal sudah ada di database
            $result = DB::connection('ConnJumboBag')
                ->select('exec SP_1273_JBB_CHECKKD_HEADTO @KodeBarang = ?', [$kodeBrgAsal]);

            $ada = $result[0]->Ada ?? 0;
            if ($ada == 0) {
                // Langkah 2: Cek apakah kode barang pengganti sudah ada
                $result2 = DB::connection('ConnJumboBag')
                    ->select('exec SP_1273_JBB_CHECKKD_KDBRG @KodeBarang = ?', [$kodeBarangTuj]);

                $ada2 = $result2[0]->Ada ?? 0;

                if ($ada2 > 0) {
                    // return response()->json(['error' => 'Kode Barang pengganti SUDAH ADA !!...'], 400);
                    return redirect()->back()->with('error', 'Kode Barang pengganti SUDAH ADA !!...');
                } else {
                    // Langkah 3: Update tabel head, rincian tabel hitungan, kode barang dan hapus data yang lama
                    DB::connection('ConnJumboBag')->statement(
                        'exec SP_1273_JBB_UBAH_KDBRG @KodeCust = ?, @OldKodeBrg = ?, @NewKodeBrg = ?, @Tgl = ?, @TglUpdate = ?, @UserLgn =?',
                        [$kodeCust, $kodeBrgAsal, $kodeBarangTuj, $tanggal, now()->format('Y-m-d'), $operator]
                    );

                    // return response()->view('JumboBag.UbahKodeBarang', compact('access',  ['message' => 'Data Terupdate']));
                    return redirect()->back()->with('success', 'Data sudah terupdate.');
                }
            } else {
                return redirect()->back()->with('error', 'Kode barang tidak dapat diubah, sebab sudah Cetak Tabel Order');
            }

        } catch (Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function show($id)
    {
        //
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
