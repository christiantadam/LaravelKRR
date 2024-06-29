<?php

namespace App\Http\Controllers\JumboBag;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Auth;

class PermohonanaRetur extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Jumbo Bag');
        return view('JumboBag.PermohonanRetur', compact('access'));
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
        $proses = $request->input('proses');
        dd($proses);
        switch ($proses) {
            case 1:
                $tanggal = now()->format('Y-m-d');
                $waktu_delivery = \Carbon\Carbon::parse($request->input('time_deliv'))->format('Y-m-d');
                // dd($tanggal, $waktu_delivery);
                DB::connection('ConnJumboBag')->beginTransaction();
                try {
                    DB::connection('ConnJumboBag')->insert('exec SP_5409_JBB_INS_RETUR ?, ?, ?, ?, ?, ?', [
                        $request->input('txtNoSP'),
                        $request->input('txtKdBrg'),
                        $tanggal,
                        $waktu_delivery,
                        $request->input('txtJmlRetur'),
                        $request->input('txtNoRef'),
                    ]);
                    DB::connection('ConnJumboBag')->commit();
                    // Menghitung kelebihan stok (misalnya sederhana, sesuaikan dengan logika bisnis yang sesuai)
                    return redirect()->back()->with(['success' => 'Data tersimpan']);
                } catch (Exception $e) {
                    DB::connection('ConnJumboBag')->rollback();
                    return redirect()->back()->with(['error' => 'Gagal menyimpan data: ' . $e->getMessage()]);
                }
                break;

            case 2:
                $tanggal = now()->format('Y-m-d');
                $waktu_delivery = \Carbon\Carbon::parse($request->input('dtDelivery'))->format('Y-m-d');

                DB::connection('ConnJumboBag')->beginTransaction();
                try {
                    DB::connection('ConnJumboBag')->insert('exec SP_5409_JBB_UDT_RETUR ?, ?, ?, ?, ?, ?', [
                        $request->input('txtNoSP'),
                        $request->input('txtKdBrg'),
                        $tanggal,
                        $waktu_delivery,
                        $request->input('txtJmlRetur'),
                        $request->input('txtNoRef'),
                    ]);
                    DB::connection('ConnJumboBag')->commit();
                    return redirect()->back()->with(['success' => 'Data berhasil dikoreksi!!...']);
                } catch (Exception $e) {
                    DB::connection('ConnJumboBag')->rollback();
                    return redirect()->back()->with(['error' => 'Gagal melakukan koreksi data: ' . $e->getMessage()]);
                }
                break;

            case 3:
                $tanggal = now()->format('Y-m-d');
                $waktu_delivery = \Carbon\Carbon::parse($request->input('dtDelivery'))->format('Y-m-d');

                $jumlah = 0;
                $dr = DB::connection('ConnJumboBag')->select('exec SP_5409_JBB_SLC_RETUR ?, ?, ?', [
                    $request->input('txtNoSP'),
                    $request->input('txtKdBrg'),
                    $waktu_delivery,
                ]);
                foreach ($dr as $row) {
                    $jumlah = $row->Jumlah_Retur;
                }

                if ($jumlah > 0) {
                    return redirect()->back()->with(['error' => 'Data tidak dapat dihapus karena sudah ada hasil produksi']);
                } else {
                    DB::connection('ConnJumboBag')->beginTransaction();
                    try {
                        DB::connection('ConnJumboBag')->insert('exec SP_5409_JBB_DLT_RETUR ?, ?, ?', [
                            $request->input('txtNoSP'),
                            $request->input('txtKdBrg'),
                            $waktu_delivery,
                        ]);
                        DB::connection('ConnJumboBag')->commit();
                        return redirect()->back()->with(['success' => 'Data dihapus!!...']);
                    } catch (Exception $e) {
                        DB::connection('ConnJumboBag')->rollback();
                        return redirect()->back()->with(['error' => 'Gagal menghapus data: ' . $e->getMessage()]);
                    }
                }
                break;
        }

        // Reset proses dan membersihkan input
        $proses = 0;
        foreach ($request->input() as $key => $value) {
            if (is_string($value)) {
                $request->merge([$key => '']);
            }
        }

        return redirect()->back()->withInput();
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
        } elseif ($id == 'getNoSP') {
            // Logika untuk mendapatkan No_SuratPesanan dan Waktu_Delivery
            $kodeBarang = $request->input('kodeBarangAsal');
            $proses = $request->input('proses');
            // dd($kodeBarang, $proses);
            if ($proses == 2 || $proses == 3) {
                $commandText = "SP_5409_JBB_LIST_RETUR";
            } else {
                $commandText = "SP_5409_JBB_LIST_NOSP_HEADTO";
            }

            $noSPList = DB::connection('ConnJumboBag')
                ->select("exec $commandText @KodeBarang = ?", [$kodeBarang]);
            // dd($noSPList);
            $dataSP = [];
            foreach ($noSPList as $noSP) {
                $dataSP[] = [
                    'NoSP' => $noSP->No_SuratPesanan,
                    'Delivery' => \Carbon\Carbon::parse($noSP->Waktu_Delivery)->format('Y-m-d'),
                ];
            }

            return datatables($dataSP)->make(true);
        } elseif ($id == 'processNoSP') {
            $kodeBarang = $request->input('kodeBarangAsal');
            $noSP = $request->input('No_SuratPesanan');
            $proses = $request->input('proses');
            // dd($kodeBarang, $noSP, $proses);
            if (!empty($noSP)) {
                if ($proses == 1) {
                    $orderData = DB::connection('ConnJumboBag')
                        ->select('exec SP_1273_JBB_LIST_KDBRG_HEADTO @KodeBarang = ?, @NoSP = ?', [
                            $kodeBarang,
                            $noSP
                        ]);
                    // dd($orderData);
                    $dataOrder = [];
                    foreach ($orderData as $order) {
                        $dataOrder[] = [
                            'jumlah_order' => $order->Jumlah_Order,
                            'waktu_delivery' => $order->Waktu_Delivery,
                        ];
                    }

                    return datatables($dataOrder)->make(true);
                } elseif ($proses == 2 || $proses == 3) {
                    $returData = DB::connection('ConnJumboBag')
                        ->select('exec SP_5409_JBB_SLC_RETUR @No_SuratPesanan = ?, @KodeBarang = ?, @Waktu_Delivery = ?', [
                            $noSP,
                            $kodeBarang,
                            $request->input('Waktu_Delivery')
                        ]);
                    // dd($returData);
                    $dataRetur = [];
                    foreach ($returData as $retur) {
                        $dataRetur[] = [
                            'jumlah_retur' => $retur->Jumlah_Retur,
                            'referensi' => $retur->Referensi,
                        ];
                    }

                    return datatables($dataRetur)->make(true);
                }
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
