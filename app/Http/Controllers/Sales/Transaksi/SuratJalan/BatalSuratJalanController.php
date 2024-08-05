<?php

namespace App\Http\Controllers\Sales\Transaksi\SuratJalan;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use DB;

class BatalSuratJalanController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Sales');
        // dd($data);
        return view('Sales.Transaksi.SuratJalan.BatalSJ', compact('access'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show($id, Request $request)
    {
        try {
            if ($id == 'getAllCustomer') {
                $data = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_ALL_CUSTOMER @Kode = ?', [1]);
                return datatables($data)->make(true);
            }
        } catch (Exception $ex) {
            return response()->json(['error' => $ex->getMessage()]);
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
