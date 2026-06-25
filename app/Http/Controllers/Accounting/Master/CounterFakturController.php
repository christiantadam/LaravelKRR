<?php

namespace App\Http\Controllers\Accounting\Master;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;
use Exception;

class CounterFakturController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Master.CounterFaktur', compact('access'));
    }

    //Show the form for creating a new resource.
    public function create()
    {

    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        $request->validate([
            'tahun' => 'required|integer',
            'counter' => 'required|integer',
            // 'faktur' => 'required|integer'
        ]);

        try {
            DB::connection('ConnAccounting')->statement(
                'EXEC SP_5409_ACC_UDT_COUNTERFAKTUR @periode = ?,
                @nomer = ?,
                @idcounter = ?',
                [
                    $request->tahun,
                    $request->counter,
                    // $request->faktur
                    0
                ]
            );

            return response()->json([
                'success' => true,
                'message' => 'Data berhasil disimpan'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    //Display the specified resource.
    public function show($id)
    {
        try {
            $counter = DB::connection('ConnAccounting')
                ->select('EXEC SP_5409_ACC_SLC_COUNTERFAKTUR @periode = ?', [$id]);
            $faktur = DB::connection('ConnAccounting')
                ->select("EXEC SP_5409_ACC_SLC_FAKTURPAJAK");

            return response()->json([
                'success' => true,
                'counter' => $counter[0]->Nomer ?? '',
                'faktur' => $faktur[0]->Id_Faktur_Pajak ?? ''
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }


    // Show the form for editing the specified resource.
    public function edit($id)
    {

    }

    //Update the specified resource in storage.
    public function update($id, Request $request)
    {

    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {

    }
}
