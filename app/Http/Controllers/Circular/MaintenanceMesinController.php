<?php

namespace App\Http\Controllers\Circular;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use DB;
use Auth;
use Exception;

class MaintenanceMesinController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Circular');
        $nomorUser = trim(Auth::user()->NomorUser);
        $listMesin = DB::connection('ConnCircular')
            ->select('exec Sp_List_Mesin @Kode = ?', [10]);
        return view('Circular.master.formMaintenancePartMesin', compact('access', 'nomorUser', 'listMesin'));
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
        if ($id == 'StatusPartMesinOverall') {
            $listMesin = DB::connection('ConnCircular')->select('SELECT Nama_mesin, SparepartCount, DurabilityPercentage FROM VW_CIR_4384_STATUS_PART_MESIN_OVERALL');
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
        } else if($id == 'selectNamaSparepart'){
            $idMesin = $request->input('IdMesin');
            $listSparepart = DB::connection('ConnCircular')->select('SP_4384_CIR_Maintenance_Sparepart @XKode = ?, @XIdMesin =?',[1,$idMesin]);
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
