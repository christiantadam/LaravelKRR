<?php

namespace App\Http\Controllers\JumboBag;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use DB;
use Exception;
use Illuminate\Http\Request;

class MaintenanceCustomerJBB extends Controller
{
    public function index()
    {
        dd();
        $access = (new HakAksesController)->HakAksesFiturMaster('Jumbo Bag');
        $cust = DB::connection('ConnJumboBag')->table('CUSTOMER')
            ->orderBy('Kode_Customer')
            ->get();
        return view('JumboBag.MaintenanceCustomer', compact('access'));
    }

    public function getCustomers()
    {
        dd();
        $cust = DB::connection('ConnJumboBag')
            ->table('CUSTOMER')
            ->orderBy('Kode_Customer', 'asc')
            ->get();
        return response()->json($cust);
    }

    public function updateCustomer(Request $request, $id)
    {
        $kodeCustomer = $request->input('Kode_Customer');
        $namaCustomer = $request->input('Nama_Customer');

        try {
            DB::connection('ConnJumboBag')
                ->table('CUSTOMER')
                ->where('Kode_Customer', $id)
                ->update([
                    'Kode_Customer' => $kodeCustomer,
                    'Nama_Customer' => $namaCustomer,
                    // Tambahkan kolom lain yang perlu diupdate jika ada
                ]);

            return response()->json(['success' => true, 'message' => 'Data customer berhasil diupdate']);
        } catch (Exception $e) {
            return response()->json(['success' => false, 'message' => 'Gagal melakukan update data customer: ' . $e->getMessage()], 2000);
        }
    }

    public function deleteCustomer($id)
    {
        try {
            $checkBisaDelete = DB::connection('ConnJumboBag')
                ->table('KODE_BARANG')
                ->where('Kode_Customer', '=', $id)->get();
            if (count($checkBisaDelete) > 0) {
                return response()->json(['info' => 'Data dengan Kode Customer: ' . $id . ' tidak bisa dihapus karena memiliki Kode Barang!']);
            } else {
                DB::connection('ConnJumboBag')
                    ->table('CUSTOMER')
                    ->where('Kode_Customer', '=', $id)
                    ->delete();
                return response()->json(['success' => 'Data dengan Kode Customer: ' . $id . ' sudah terhapus!']);
            }
        } catch (Exception $ex) {
            return response()->json(['error' => $ex->getMessage()]);
        }

    }

}
