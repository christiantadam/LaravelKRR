<?php

namespace App\Http\Controllers\Utility\Elektrik\TipeGangguan;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class TipeGangguanElektrikController extends Controller
{

    public function saveTipeGangguan(Request $request)
    {
        try {
            $Keterangan = $request->input('Keterangan');

            $data = DB::connection('ConnUtility')->statement('exec SP_INSERT_TYPE_GANGGUAN_ELEKTRIK ? ', [$Keterangan]);
            return response()->json($data);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'An error occurred while saving the data. Please try again.');
        }
    }

    public function updateTipeGangguan(Request $request)
    {
        try {
            $id = $request->input('NomorId');
            $Keterangan = $request->input('Keterangan');


            $data = DB::connection('ConnUtility')->statement('exec SP_KOREKSI_TYPE_GANGGUAN_ELEKTRIK ? , ? ', [$id, $Keterangan]);
            return response()->json($data);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'An error occurred while saving the data. Please try again.');
        }
    }

    public function getTipeGangguan()
    {
        $TipeGangguan =
            DB::connection('ConnUtility')->select('exec SP_LIST_TYPE_GANGGUAN_ELEKTRIK');
        return datatables($TipeGangguan)->make(true);
    }

    public function reloadTipeGangguan()
    {
        $TipeGangguan =
            DB::connection('ConnUtility')->table('E_Type_gangguan_elektrik')->get();
        return response()->json($TipeGangguan);
    }

    public function deleteTipeGangguan(Request $request)
    {
        try {
            $Id = $request->input('id');

            foreach ($Id as $id) {
                DB::connection('ConnUtility')->statement('exec SP_HAPUS_TYPE_GANGGUAN_ELEKTRIK @id_type = ?', [$id]);
            }

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while deleting the data. Please try again.']);
        }
    }
}
