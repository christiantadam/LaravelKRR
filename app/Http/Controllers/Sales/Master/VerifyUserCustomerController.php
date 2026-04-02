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

            return datatables($dataUser)->make(true);
        }

        else if ($id == 'updateVerification') {
            $npwp = preg_replace('/[^0-9]/', '', $request->npwp);
            $idUser = $request->idUser;

            // ✅ cek NPWP di T_Customer
            $exists = DB::connection('ConnSales')
                ->table('T_Customer')
                ->whereRaw("
                    REPLACE(REPLACE(REPLACE(NPWP,'.',''),'-',''),' ','') = ?
                ", [$npwp])
                ->exists();

            // ❌ jika tidak ditemukan
            if (!$exists) {
                return response()->json([
                    'error' => 'NPWP tidak terdaftar di data customer'
                ]);
            }

            // ✅ update verification
            DB::connection('ConnPublicWeb')
                ->table('UserPublic')
                ->where('IdUser', $idUser)
                ->update([
                    'Verification' => 1
                ]);

            return response()->json([
                'success' => 'User berhasil diverifikasi'
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
