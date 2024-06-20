<?php

namespace App\Http\Controllers\JumboBag;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;

class MaintenanceCustomerJBB extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Jumbo Bag');
        return view('JumboBag.MaintenanceCustomer', compact('access'));
    }

    public function create()
    {
        // Fetch the customer data
        $listCustomer = DB::connection('ConnJumboBag')
            ->table('CUSTOMER')
            ->orderBy('Kode_Customer', 'asc')
            ->get();
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

    public function store(Request $request)
    {
        try {
            DB::connection('ConnJumboBag')
                ->table('CUSTOMER')
                ->insert([
                    'Kode_Customer' => $request->input('kode_customer'),
                    'Nama_Customer' => $request->input('nama_customer'),
                ]);
            return response()->json(['success' => 'Customer berhasil ditambahkan!']);
        } catch (Exception $ex) {
            return response()->json(['error' => $ex->getMessage()]);
        }
    }

    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        $cust = DB::connection('ConnJumboBag')
            ->table('CUSTOMER')
            ->where('Kode_Customer', $id)
            ->orderBy('Kode_Customer', 'asc')
            ->get();
        return response()->json($cust);
    }

    public function update(Request $request, $id)
    {
        // dd($request->all(), $id);
        try {
            DB::connection('ConnJumboBag')
                ->table('CUSTOMER')
                ->where('Kode_Customer', $id)
                ->update([
                    'Kode_Customer' => $request->input('kode_customer'),
                    'Nama_Customer' => $request->input('nama_customer')
                ]);
            return response()->json(['success' => 'Data dengan Kode Customer: ' . $id . ' sudah Diupdate!']);
        } catch (Exception $ex) {
            return response()->json(['error' => $ex->getMessage()]);
        }
    }
    public function destroy($id)
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
