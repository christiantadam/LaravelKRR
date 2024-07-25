<?php

namespace App\Http\Controllers\Accounting\Hutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class PenyesuaianSaldoSupplierController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Hutang.PenyesuaianSaldoSupplier', compact('access'));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        //
    }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        if ($id == 'getData') {
            $hutang = $request->input('hutang', false);
            $tunai = $request->input('tunai', false);

            $results = [];

            if ($hutang && !$tunai) {
                $results = DB::select('EXEC SP_1273_ACC_LIST_TT_SALDOSUPP_HUTANG');
            } elseif (!$hutang && $tunai) {
                $results = DB::select('EXEC SP_1273_ACC_LIST_TT_SALDOSUPP_TUNAI');
            }

            $response = [];

            foreach ($results as $row) {
                $response[] = [
                    'Id_Supplier' => trim($row->Id_Supplier),
                    'nm_sup' => trim($row->nm_sup),
                    'saldo' => number_format($row->saldo, 4, '.', ','),
                    'saldo_rp' => number_format($row->saldo_rp, 4, '.', ','),
                    'Nama_MataUang' => $row->Nama_MataUang,
                    'Saldo_Hutang' => number_format($row->Saldo_Hutang, 4, '.', ','),
                    'Saldo_Hutang_Rp' => number_format($row->Saldo_Hutang_Rp, 4, '.', ','),
                    'IdTrans' => $row->IdTrans
                ];
            }

            return datatables($response)->make(true);
        }
    }

    // Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request)
    {
        //
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
