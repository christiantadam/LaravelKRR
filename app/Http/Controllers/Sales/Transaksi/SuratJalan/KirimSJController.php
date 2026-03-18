<?php

namespace App\Http\Controllers\Sales\Transaksi\SuratJalan;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;
use Exception;

class KirimSJController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Sales');
        return view('Sales.Transaksi.SuratJalan.KirimSJ', compact('access'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $jenisProses = $request->jenisProses;
        if ($jenisProses == 'kirimSJ') {
            try {
                $idHeader = $request->idHeader;
                DB::connection('ConnSales')
                    ->statement(
                        'exec SP_4384_SLS_KIRIM_SJ @XKode = ?, @XIdHeaderKirim = ?',
                        [2, $idHeader]
                    ); // proses update kolom kirim customer, proses insert into database public web
                $emailCustomer = 'adamchristianto@gmail.com'; // email select from publicweb.UserPublic inner join CustomerUserPublic where CustomerUserPublic IDCust = @XIDCust
                // proses send email permintaan acc customer
                return response()->json(['success' => (string) 'SJ sudah dikirim ke email customer: ' . $emailCustomer], 200);
            } catch (Exception $e) {
                return response()->json(['error' => $e->getMessage()], 500);
            }
        }
    }

    public function show($id)
    {
        if ($id == 'getDataSJ') {
            $dataSuratJalan = DB::connection('ConnSales')
                ->select('exec SP_4384_SLS_KIRIM_SJ @XKode = ?', [1]);
            // dd($dataSuratJalan);
            return datatables($dataSuratJalan)->make(true);
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
