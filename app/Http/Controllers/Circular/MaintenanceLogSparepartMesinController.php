<?php

namespace App\Http\Controllers\Circular;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use DB;
use Auth;
use Exception;
use Response;

class MaintenanceLogSparepartMesinController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Circular');
        $nomorUser = trim(Auth::user()->NomorUser);
        $listMesin = DB::connection('ConnCircular')
            ->select('exec Sp_List_Mesin @Kode = ?', [10]);
        return view('Circular.mesin.formMaintenanceLogSparepartMesin', compact('access', 'nomorUser', 'listMesin'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $jenisStore = $request->input('jenisStore');
        if ($jenisStore == 'insertLogMaintenance') {
            dd($request->all());
        } else {
            return response()->json(['error' => (string) "Undefined request: " . $jenisStore]);
        }
    }

    public function show($id, Request $request)
    {
        if ($id == 'StatusPartMesinOverall') {
            $listMesin = DB::connection('ConnCircular')->select('EXEC SP_4384_CIR_Maintenance_Sparepart @XKode = ?', [20]);
            // Convert the data into an array that DataTables can consume
            $dataMesin = [];
            foreach ($listMesin as $mesin) {
                $dataMesin[] = [
                    'Nama_mesin' => $mesin->Nama_mesin,
                    'SparepartCount' => $mesin->SparepartCount,
                    'DurabilityPercentage' => $mesin->DurabilityPercentage,
                ];
            }
            return datatables($dataMesin)->make(true);
        } else if ($id == 'selectNamaSparepart') {
            $idMesin = $request->input('idMesin');
            $listSparepart = DB::connection('ConnCircular')->select('EXEC SP_4384_CIR_Maintenance_Sparepart @XKode = ?, @XIdMesin =?', [21, $idMesin]);
            return response()->json($listSparepart);
        } else if ($id == 'selectKodeBarang') {
            $idSparepart = $request->input('idSparepart');
            $idMesin = $request->input('idMesin');
            $listBarang = DB::connection('ConnCircular')->select('EXEC SP_4384_CIR_Maintenance_Sparepart @XKode = ?, @XIdSparepart =?, @XIdMesin = ?', [22, $idSparepart, $idMesin]);
            return response()->json($listBarang);
        } else {
            return response()->json(['error' => (string) "Undefined request: " . $id]);
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
