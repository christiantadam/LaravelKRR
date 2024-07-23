<?php

namespace App\Http\Controllers\Accounting\Master;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;
use Exception;

class MaintenanceMataUangController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        $maintenanceMataUang = DB::connection('ConnAccounting')->select('exec [SP_1273_ACC_LIST_UANG_ALL_TMATAUANG]');
        // dd($maintenanceMataUang);
        return view('Accounting.Master.MaintenanceMataUang', compact(['maintenanceMataUang', 'access']));
    }
    function getDataMataUang($idMataUang)
    {
        $data = DB::connection('ConnAccounting')->select('exec [SP_1273_ACC_LIST_UANG_ID_TMATAUANG]
        @IdMataUang = ?', [$idMataUang]);
        return response()->json($data);
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        //$IdMataUang = $request->idMataUang;
        $NamaMataUang = $request->namaMataUang;
        $Symbol = $request->symbol;

        DB::connection('ConnAccounting')->statement('exec [SP_1273_ACC_UDT_UANG_TMATAUANG]
        @Kode = ?,
        @Nama_MataUang = ?,
        @Symbol = ?', [
            1,
            $NamaMataUang,
            $Symbol
        ]);
        return redirect()->back()->with('success', 'Data sudah diSIMPAN');
    }

    //Display the specified resource.
    public function show($id)
    {
        try {
            if ($id == 'getAllMataUang') {
                $listMataUang = DB::connection('ConnAccounting')->select('exec [SP_1273_ACC_LIST_UANG_ALL_TMATAUANG]'); //Get All data Bank where aktif == 'Y'
                return datatables($listMataUang)->make(true);
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
        // dd($request->all());
        $IdMataUang = $request->nama_select;
        $NamaMataUang = $request->namaMataUang;
        $Symbol = $request->symbol;

        DB::connection('ConnAccounting')->statement('exec [SP_1273_ACC_UDT_UANG_TMATAUANG]
        @Kode = ?,
        @IdMataUang = ?,
        @Nama_MataUang = ?,
        @Symbol = ?', [
            2,
            $IdMataUang,
            $NamaMataUang,
            $Symbol
        ]);
        return redirect()->back()->with('success', 'Data sudah diKOREKSI');
    }

    //Remove the specified resource from storage.
    public function destroy($idMataUang)
    {

        DB::connection('ConnAccounting')->statement('exec [SP_1273_ACC_UDT_UANG_TMATAUANG]
        @Kode = ?,
        @IdMataUang = ?', [
            3,
            $idMataUang
        ]);
        return redirect()->back()->with('success', 'Data sudah diHAPUS');
    }
}
