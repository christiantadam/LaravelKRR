<?php

namespace App\Http\Controllers\Accounting\Piutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Auth;

class ACCNotaKreditController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Piutang.ACCNotaKredit', compact('access'));
    }

    public function getTabelHeaderACCNotaKredit()
    {
        $tabel = DB::connection('ConnAccounting')->select('exec [SP_LIST_NOTA_KREDIT] @Kode = ?', [3]);
        return response()->json($tabel);
    }

    public function getDetailHeaderACCNotaKredit($idnotakredit)
    {

        $idNotaKredit = str_replace('.', '/', $idnotakredit);
        $tabel = DB::connection('ConnAccounting')->select('exec [SP_LIST_NOTA_KREDIT] @Kode = ?, @ID_NotaKredit = ?', [4, $idNotaKredit]);
        return response()->json($tabel);
    }

    public function getDetailHeaderACCNotaKredit2($idNotaKredit)
    {
        $tabel = DB::connection('ConnAccounting')->select('exec [SP_LIST_NOTA_KREDIT] @Kode = ?, @ID_NotaKredit = ?', [10, $idNotaKredit]);
        return response()->json($tabel);
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        $idNotaKredit = $request->idNotaKredit;
        $idCustomer = $request->idCustomer;
        $idMataUang = $request->idMataUang;
        $kredit = $request->kredit;
        $kurs = $request->kurs;
        $statusP = $request->statusP;

        DB::connection('ConnAccounting')->statement('exec [SP_ACC_NOTA_KREDIT]
        @UserAcc = ?,
        @Id_NotaKredit = ?,
        @IdCust = ?,
        @IdMtUang = ?,
        @kredit = ?,
        @kurs = ?,
        @status = ?', [
            trim(Auth::user()->NomorUser),
            $idNotaKredit,
            $idCustomer,
            $idMataUang,
            $kredit,
            $kurs,
            $statusP
        ]);
    }

    //Display the specified resource.
    public function show($id, Request $request)
    {
        try {
            if ($id == 'getTabelHeaderACCNotaKredit') {
                $tabel = DB::connection('ConnAccounting')->select('exec [SP_LIST_NOTA_KREDIT] @Kode = ?', [3]);
                return response()->json($tabel);
            } else if ($id == 'getDetailHeaderACCNotaKredit') {
                $idNotaKredit = str_replace('.', '/', $request->input('idnotakredit'));
                $tabel = DB::connection('ConnAccounting')->select('exec [SP_LIST_NOTA_KREDIT] @Kode = ?, @ID_NotaKredit = ?', [4, $idNotaKredit]);
                return response()->json($tabel);
            } else {
                return response()->json(['error' => 'Invalid Show $id']);
            }
        } catch (Exception $ex) {
            return response()->json(['error' => $ex->getMessage()]);
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
