<?php

namespace App\Http\Controllers\JumboBag;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Auth;

class CopyTabelOrder extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Jumbo Bag');
        return view('JumboBag.CopyTabelOrder', compact('access'));
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
        } else if ($id == 'getNoSP') {
            $kodeBarang = trim($request->input('KodeBrgAsal'));
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
                    ->select('exec SP_1273_JBB_LIST_KDBRG_HEADTO @KodeBarang =?, @NoSP = ?', [$kodeBarang, $noSP]);
                // dd($orderDetails);
                $dataSuratPesanan = [];
                foreach ($items as $SuratPesanan) {
                    $dataSuratPesanan[] = [
                        'NoSP' => $SuratPesanan->No_SuratPesanan,
                        'Delivery' => $SuratPesanan->Waktu_Delivery,
                        'Jumlah' => $SuratPesanan->Jumlah_Order,
                    ];
                }
                return datatables($dataSuratPesanan)->make(true);
            }

            return response()->json(['status' => 'error', 'message' => 'Tidak ada data ditemukan']);
        } else if ($id == 'btnKdBrg2') {
            $kodeBarangAsal = trim($request->input('KodeBrgAsal'));
            $ada = false;

            // Execute first stored procedure
            $items = DB::connection('ConnJumboBag')
                ->select('exec SP_1273_JBB_LIST_SALES @Kode = ?, @Kodebarangjbb = ?', [4, substr($kodeBarangAsal, 2)]);

            if (count($items) > 0 && $items[0]->Ada > 0) {
                $ada = true;
            }

            if (!$ada) {
                return response()->json(['status' => 'error', 'message' => 'TIDAK ADA No.Surat Pesanan untuk kodebarang: ' . $kodeBarangAsal]);
            } else {
                $lookupItems = DB::connection('ConnJumboBag')
                    ->select('exec SP_1273_JBB_LIST_SALES @Kode = ?, @Kodebarangjbb = ?', [1, substr($kodeBarangAsal, 2)]);
                $dataLookup = [];
                foreach ($lookupItems as $item) {
                    $dataLookup[] = [
                        'NamaType' => $item->NamaType,
                        'KodeBarang' => $item->KodeBarang,
                    ];
                }
                return datatables($dataLookup)->make(true);
            }
        }else if ($id == 'btnNoSP2') {
            $kodeBarangSLS = $request->input('KodeBrgNew');
            $jenisBarang = $request->input('JenisBarang');
            $jnsBrg = '';

            // dd($kodeBarangSLS, $jenisBarang);

            if (substr($jenisBarang, -1) === 'E') {
                $jnsBrg = 'JBE';
            } else if (substr($jenisBarang, -1) === 'F') {
                $jnsBrg = 'JBF';
            } else if (substr($jenisBarang, -1) === 'N') {
                $jnsBrg = 'JBN';
            }

            $lookupItems = DB::connection('ConnJumboBag')
                ->select('exec SP_1273_JBB_LIST_SALES @Kode = ?, @KodeBarangSLS = ?, @JnsBrg = ?', [9, $kodeBarangSLS, $jnsBrg]);
            dd($lookupItems);
            if (count($lookupItems) > 0) {
                $firstItem = $lookupItems[0];
                $idSuratPesanan = $firstItem->IdSuratPesanan;
                $qty = $firstItem->Qty;

                // If txtNoSP2 is not empty
                if (!empty($idSuratPesanan)) {
                    if (substr($jenisBarang, -1) === 'L') {
                        $idSuratPesanan .= 'A';
                    }

                    $orderDetails = DB::connection('ConnJumboBag')
                        ->select('exec SP_1273_JBB_LIST_SALES @Kode = ?, @KodeBarangSLS = ?, @IdSuratPesanan = ?', [3, $kodeBarangSLS, $idSuratPesanan]);

                        if (count($orderDetails) > 0) {
                            $dataOrderDetails = [];
                            foreach ($orderDetails as $orderDetail) {
                                $dataOrderDetails[] = [
                                    'IdPesanan' => $orderDetail->IdPesanan,
                                    'Satuan' => $orderDetail->Satuan,
                                    'TglRencanaKirim' => \Carbon\Carbon::parse($orderDetail->TglRencanaKirim)->format('m/d/Y')
                                ];
                            }
                        }
                }
            }

            return datatables($orderDetails)->make(true);
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
