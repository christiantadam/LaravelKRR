<?php

namespace App\Http\Controllers\ABM\Master;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use Exception;
use DB;
use Auth;
use DateTime;
use DateTimeZone;

class MaintenanceOrderKerjaABMController extends Controller
{
    public function index()
    {
        // dd('MaintenanceOrderKerjaController Index');
        $access = (new HakAksesController)->HakAksesFiturMaster('ABM');
        return view('ABM.Master.OrderKerja.MaintenanceOrderKerja', compact('access'));
    }

    public function create()
    {
        dd('MaintenanceOrderKerjaController Create');
    }

    public function store(Request $request)
    {
        dd('MaintenanceOrderKerjaController Store');
    }

    public function show($id)
    {
        if ($id == 'getNomorOrderKerja') {
            $dataNomorOrderKerja = DB::connection('ConnABM')->select('EXEC SP_4384_Maintenance_Nomor_Order_Kerja @XKode = ?', [0]);
            return response()->json(['success' => $dataNomorOrderKerja]);
        } else {
            return response()->json(['error' => (string) "Undefined request: " . $id]);
        }
    }

    public function edit($id)
    {
        dd('MaintenanceOrderKerjaController Edit');
    }

    public function update(Request $request, $id)
    {
        dd('MaintenanceOrderKerjaController Update');
    }

    public function destroy($id)
    {
        dd('MaintenanceOrderKerjaController Destroy');
    }
}
