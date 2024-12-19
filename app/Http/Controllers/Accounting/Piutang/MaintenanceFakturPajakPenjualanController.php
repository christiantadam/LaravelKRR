<?php

namespace App\Http\Controllers\Accounting\Piutang;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class MaintenanceFakturPajakPenjualanController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Piutang.MaintenanceFakturPajakPenjualan', compact('access'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        try {
            // Update data
            DB::connection('ConnAccounting')
                ->table('T_PENAGIHAN_SJ')
                ->where('Id_Penagihan', $request->id_penagihan)
                ->update(['IdFakturPajak' => $request->id_fakturPajak]);

            // Kembalikan respons sukses
            return response()->json(['message' => 'IdFakturPajak berhasil diperbarui!']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function show(Request $request, $id)
    {
        if ($id == 'getData') {
            // dd($request->tgl_awal, $request->tgl_akhir);
            $dataAccounting = DB::connection('ConnAccounting')
                ->table('T_PENAGIHAN_SJ')
                ->select([
                    'Id_Penagihan',
                    'Tgl_Penagihan',
                    'Id_Customer',
                    'Nilai_Penagihan',
                    'IdFakturPajak',
                ])
                ->whereBetween('Tgl_Penagihan', [$request->tgl_awal, $request->tgl_akhir])
                ->get();

            // Ambil data customer dari database ConnSales
            $dataCustomer = DB::connection('ConnSales')
                ->table('T_Customer')
                ->select(['IDCust', 'NamaCust'])
                ->get()
                ->keyBy('IDCust'); // Index data customer berdasarkan IDCust untuk pencarian cepat

            // Gabungkan data secara manual
            $data = $dataAccounting->map(function ($item) use ($dataCustomer) {
                // Format tanggal
                $item->Tgl_Penagihan = \Carbon\Carbon::parse($item->Tgl_Penagihan)->format('m/d/Y');
                // Tambahkan NamaCust berdasarkan Id_Customer
                $item->NamaCust = $dataCustomer->get($item->Id_Customer)->NamaCust ?? '';
                return $item;
            });
            // dd($data);
            // Kembalikan response data ke datatables
            return datatables($data)->make(true);
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
