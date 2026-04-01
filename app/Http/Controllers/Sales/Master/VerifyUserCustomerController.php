<?php

namespace App\Http\Controllers\Sales\Master;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;

class VerifyUserCustomerController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Sales');
        return view('Sales.Master.VerifyUserCustomer.Index', compact('access'));
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
        if ($id == 'getDataUser') {
            $dataUser = DB::connection('ConnSales')
                ->select('exec SP_4384_SLS_VERIFY_USER @XKode = ?', [0]);
            // dd($dataUser);
            return datatables($dataUser)->make(true);
        } else if ($id == 'getDetailUser') {
            # code...
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
