<?php

namespace App\Http\Controllers\Sales\Master;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Sales\Expeditor;
use DB;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Yajra\DataTables\Facades\DataTables;

class ExpeditorController extends Controller
{

    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Sales');
        return view('Sales.Master.Expeditor.Index', compact('access'));
    }

    //Show the form for creating a new resource.
    public function create()
    {

    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        $jenis = $request->jenis;
        $IDExpeditor = $request->IDExpeditor;
        $NamaExpeditor = $request->NamaExpeditor;
        $ContactPerson = $request->ContactPerson;
        $Alamat = $request->Alamat;
        $KodePos = $request->KodePos;
        $Kota = $request->Kota;
        $Propinsi = $request->Propinsi;
        $Negara = $request->Negara;
        $NoTelp1 = $request->NoTelp1;
        $NoTelp2 = $request->NoTelp2;
        $NoHp1 = $request->NoHp1;
        $NoHp2 = $request->NoHp2;
        $NoTelex = $request->NoTelex;
        $NoFax1 = $request->NoFax1;
        $NoFax2 = $request->NoFax2;
        $Email = $request->Email;
        if ($jenis == 'tambahExpeditor') {
            try {
                DB::connection('ConnSales')->statement('EXEC SP_4384_SLS_MASTER @XKode = ?,
                @XNamaExpeditor = ?,
                @XContactPerson = ?,
                @XAlamat = ?,
                @XKota = ?,
                @XPropinsi = ?,
                @XNegara = ?,
                @XKodePos = ?,
                @XNoTelp1 = ?,
                @XNoTelp2 = ?,
                @XNoFax1 = ?,
                @XNoFax2 = ?,
                @XNoHp1 = ?,
                @XNoHp2 = ?,
                @XNoTelex = ?,
                @XEmail = ?,
                @XIDExpeditor = ?',
                    [
                        10,
                        $NamaExpeditor,
                        $ContactPerson,
                        $Alamat,
                        $Kota,
                        $Propinsi,
                        $Negara,
                        $KodePos,
                        $NoTelp1,
                        $NoTelp2,
                        $NoFax1,
                        $NoFax2,
                        $NoHp1,
                        $NoHp2,
                        $NoTelex,
                        $Email,
                        $IDExpeditor
                    ]
                );
                return response()->json(['success' => 'Data Expeditor berhasil ditambahkan'], 200);
            } catch (Exception $ex) {
                return response()->json(['error' => $ex->getMessage()], 500);
            }
        } else if ($jenis == 'hapusExpeditor') {
            try {
                DB::connection('ConnSales')->statement('EXEC SP_4384_SLS_MASTER @XKode = ?, @XIDExpeditor = ?', [5, $IDExpeditor]);
                return response()->json(['success' => 'Data Expeditor berhasil dinonaktifkan'], 200);
            } catch (Exception $ex) {
                return response()->json(['error' => $ex->getMessage()], 500);
            }
        } else if ($jenis == 'editExpeditor') {
            try {
                DB::connection('ConnSales')->statement('EXEC SP_4384_SLS_MASTER @XKode = ?,
                @XNamaExpeditor = ?,
                @XContactPerson = ?,
                @XAlamat = ?,
                @XKota = ?,
                @XPropinsi = ?,
                @XNegara = ?,
                @XKodePos = ?,
                @XNoTelp1 = ?,
                @XNoTelp2 = ?,
                @XNoFax1 = ?,
                @XNoFax2 = ?,
                @XNoHp1 = ?,
                @XNoHp2 = ?,
                @XNoTelex = ?,
                @XEmail = ?,
                @XIDExpeditor = ?',
                    [
                        11,
                        $NamaExpeditor,
                        $ContactPerson,
                        $Alamat,
                        $Kota,
                        $Propinsi,
                        $Negara,
                        $KodePos,
                        $NoTelp1,
                        $NoTelp2,
                        $NoFax1,
                        $NoFax2,
                        $NoHp1,
                        $NoHp2,
                        $NoTelex,
                        $Email,
                        $IDExpeditor
                    ]
                );
                return response()->json(['success' => 'Data Expeditor berhasil diubah'], 200);
            } catch (Exception $ex) {
                return response()->json(['error' => $ex->getMessage()], 500);
            }
        }
    }

    //Display the specified resource.
    public function show($id, Request $request)
    {
        if ($id == 'getAllExpeditor') {
            $listExpeditor = DB::connection('ConnSales')->select('EXEC SP_4384_SLS_MASTER @XKode = ?', [8]);
            return DataTables::of($listExpeditor)->make(true);
        } else if ($id == 'getExpeditorById') {
            $idExpeditor = $request->idExpeditor;
            $data = DB::connection('ConnSales')->select('exec SP_4384_SLS_MASTER @XKode = ?, @XIDExpeditor = ?', [9, $idExpeditor]);
            return response()->json($data);
        }
    }

    //Show the form for editing the specified resource.
    public function edit($id)
    {

    }

    //Update the specified resource in storage.
    public function update(Request $request, $id)
    {

    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {

    }
}
