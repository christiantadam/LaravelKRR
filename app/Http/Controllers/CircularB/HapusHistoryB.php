<?php

namespace App\Http\Controllers\CircularB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Log;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class HapusHistoryB extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Circular B');
        return view('CircularB.koreksi.HapusHistory', compact('access'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show($id)
    {
        //
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
        if ($id == 'delete') {
            try {
                // Eksekusi Stored Procedure
                DB::connection('ConnCircular')->statement('EXEC SP_1273_CIR_DELETE_HISTORY');

                return response()->json(['message' => 'History Sudah Terhapus']);
            } catch (Exception $e) {
                return response()->json(['message' => $e->getMessage()]);
            }
        }
    }
}
