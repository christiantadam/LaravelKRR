<?php

namespace App\Http\Controllers\JumboBag;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class TabelHitunganInformasi extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Jumbo Bag');
        return view('JumboBag.TabelHitunganInformasi', compact('access'));
    }
    public function create(Request $request)
    {
        try {
            // Fetch the customer data
            $kodeCustomer = $request->input('kodeCustomer');
            $ukuran = $request->input('ukuran');

            // Step 1: Check if there are items for the customer
            $checkResult = DB::connection('ConnJumboBag')
                ->select('exec SP_1273_JBB_CHECK_CUST_KDBRG @KodeCustomer = ?', [$kodeCustomer]);

            $ada = 0;
            if ($checkResult && count($checkResult) > 0) {
                $ada = $checkResult[0]->Ada;
            }

            if ($ada > 0) {
                // Step 2: Fetch the list of items for the customer
                if (empty($ukuran)) {
                    $listKodebarang = DB::connection('ConnJumboBag')
                        ->select('exec SP_1273_JBB_LIST_KDCUST_KDBRG @KodeCustomer = ?', [$kodeCustomer]);

                    // Prepare data for DataTables
                    $dataKodebarang = [];
                    foreach ($listKodebarang as $Kd) {
                        $dataKodebarang[] = [
                            'Tanggal' => $Kd->tanggal,
                            'Kode_Barang' => $Kd->kode_barang,
                        ];
                    }
                } else {
                    $listKodebarang = DB::connection('ConnJumboBag')
                        ->select('exec SP_1273_JBB_LIST_KDCUST_KDBRG_wewe @KodeCustomer = ?, @ukuran = ?', [$kodeCustomer, $ukuran]);

                    // Prepare data for DataTables
                    $dataKodebarang = [];
                    foreach ($listKodebarang as $Kd) {
                        $dataKodebarang[] = [
                            // 'Tanggal' => $Kd->Tanggal,
                            'Tanggal' => \Carbon\Carbon::parse($Kd->Tanggal)->format('m/d/Y'),
                            'Kode_Barang' => $Kd->Kode_Barang,
                        ];
                    }
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
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
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
        } else if ($id == 'getUkuran') {
            try {
                // Memeriksa apakah ada kode barang untuk pelanggan tersebut
                $kodeCustomer = trim($request->input('id_customer'));
                // dd($kodeCustomer);
                $result = DB::connection('ConnJumboBag')
                    ->select('exec SP_1273_JBB_CHECK_CUST_KDBRG @KodeCustomer = ?', [$kodeCustomer]);

                if (!empty($result) && $result[0]->Ada > 0) {
                    $listUkuran = DB::connection('ConnJumboBag')
                        ->select('exec SP_1003_JBB_LIST_UKURAN_TBL_HITUNGAN @Kode_customer = ?', [$kodeCustomer]);
                    // dd($listUkuran);
                    $dataUkuran = [];
                    foreach ($listUkuran as $ukuran) {
                        $dataUkuran[] = [
                            'Ukuran' => $ukuran->ukuran,
                        ];
                    }

                    return datatables($dataUkuran)->make(true);
                } else {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Tidak ada kode barang untuk customer ' . $kodeCustomer,
                    ]);
                }
            } catch (Exception $e) {
                return response()->json([
                    'status' => 'error',
                    'message' => $e->getMessage(),
                ]);
            }
        } else if ($id == 'updateUser') {
            try {
                $kodeBarang = trim($request->input('kodeBarangAsal'));
                // dd($kodeBarang);
                $result = DB::connection('ConnJumboBag')
                    ->select('exec SP_1273_JBB_LIST_KDBRG_KDBRG @Kodebarang = ?', [$kodeBarang]);
                // dd($result);
                if (!empty($result)) {
                    $dataUpdate = [];
                    foreach ($result as $row) {
                        $dataUpdate[] = [
                            'Tgl_Update' => \Carbon\Carbon::parse($row->Tgl_Update)->format('Y-m-d'),
                            'Nama_User' => $row->Nama_User,
                            'Panjang_BB' => $row->Panjang_BB,
                            'Lebar_BB' => $row->Lebar_BB,
                            'Diameter_BB' => $row->Diameter_BB,
                            'Tinggi_BB' => $row->Tinggi_BB,
                            'Bentuk_BB' => $row->Bentuk_BB,
                        ];
                    }

                    return datatables($dataUpdate)->make(true);
                } else {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Tidak ada data untuk kode barang ' . $kodeBarang,
                    ]);
                }
            } catch (Exception $e) {
                return response()->json([
                    'status' => 'error',
                    'message' => $e->getMessage(),
                ]);
            }
        } else if ($id == 'getDetailTabel') {
            $kode = $request->input('kodeBarangAsal');
            $bentuk_ca = $request->input('bentuk_ca');
            $bentuk_cb = $request->input('bentuk_cb');
            $swl = $request->input('swl');
            $sf1 = $request->input('sf1');
            $sf2 = $request->input('sf2');

            // Ambil data
            $dataHitungan = DB::connection('ConnJumboBag')
                ->select('exec SP_5409_JBB_INFO_TABEL_HITUNGAN');
            // Filter data
            $dataTable = array_filter($dataHitungan, function ($item) use ($kode, $bentuk_ca, $bentuk_cb, $swl, $sf1, $sf2) {
                $valid = true;
                if ($kode && trim($item->Kode_Barang) !== $kode) {
                    $valid = false;
                }
                if ($bentuk_ca && trim($item->Bentuk_CA) !== $bentuk_ca) {
                    $valid = false;
                }
                if ($bentuk_cb && trim($item->Bentuk_CB) !== $bentuk_cb) {
                    $valid = false;
                }
                if ($swl && trim($item->SWL) != $swl) { // Assuming SWL is numeric
                    $valid = false;
                }
                if ($sf1 && trim($item->SF1) != $sf1) { // Assuming SF1 is numeric
                    $valid = false;
                }
                if ($sf2 && trim($item->SF2) != $sf2) { // Assuming SF2 is numeric
                    $valid = false;
                }
                return $valid;
            });
            // Konversi data ke format array yang bisa dikonsumsi oleh DataTables
            $dataTable = array_map(function ($row) {
                return [
                    'Nama_Customer' => $row->Nama_Customer,
                    'Kode_Barang' => $row->Kode_Barang,
                    'Panjang_BB' => $row->Panjang_BB,
                    'Lebar_BB' => $row->Lebar_BB,
                    'Tinggi_BB' => $row->Tinggi_BB,
                    'Diameter_BB' => $row->Diameter_BB,
                    'ModelBB' => $row->ModelBB,
                    'ModelCA' => $row->ModelCA,
                    'ModelCB' => $row->ModelCB,
                    'Warna' => $row->Warna,
                    'SWL' => $row->SWL,
                    'SF1' => $row->SF1,
                    'SF2' => $row->SF2,
                ];
            }, $dataTable);

            return response()->json($dataTable);
        } else if ($id == 'printReport') {
            // Retrieve kdbarang from request or fallback to some default value
            // $kdbarang = $request->input('kodeBarangAsal') ?: $request->input('datagrid_item');
            $kdbarang = $request->input('kodeBarangAsal');
            // dd($kdbarang);
            // Set up the criteria for the report
            // $criteria = "{VW_PRG_1273_JBB_CETAK_THITUNGAN.Kode_Barang} = '" . $kdbarang . "'";
            // dd($criteria);
            $criteria = DB::connection('ConnJumboBag')
            ->table('VW_PRG_1273_JBB_CETAK_THITUNGAN')
            ->where('Kode_Barang', $kdbarang)
            ->get();
            // dd($criteria);
            // Assuming you have a view for the report
            return view('report', [
                'namaLaporan' => 'InfoTabelHitungan',
                'kriteria' => $criteria
            ]);
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
