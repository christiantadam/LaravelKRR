<?php

namespace App\Http\Controllers\Utility\PanelInduk\KetGangguan;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class InputKeteranganGangguanController extends Controller
{

    public function saveKeteranganGangguan(Request $request)
    {
        try {
            $Keterangan = $request->input('Keterangan');

            $data = DB::connection('ConnUtility')->statement('exec SP_INSERT_KET_GANGGUAN_PANEL_INDUK ? ', [$Keterangan]);
            return response()->json($data);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'An error occurred while saving the data. Please try again.');
        }
    }

    public function updateKeteranganGangguan(Request $request)
    {
        try {
            $id = $request->input('NomorId');
            $Keterangan = $request->input('Keterangan');


            $data = DB::connection('ConnUtility')->statement('exec SP_KOREKSI_KET_GANGGUAN_PANEL_INDUK ? , ? ', [$id, $Keterangan]);
            return response()->json($data);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'An error occurred while saving the data. Please try again.');
        }
    }

    public function getKeteranganGangguan()
    {
        $listKeterangan =
            DB::connection('ConnUtility')->select('exec SP_LIST_KET_GANGGUANG_PANEL_INDUK');
        return datatables($listKeterangan)->make(true);
    }

    public function deleteKeteranganGangguan(Request $request)
    {
        try {
            $Id = $request->input('id');

            foreach ($Id as $id) {
                DB::connection('ConnUtility')->statement('exec SP_HAPUS_KET_GANGGUAN_PANEL_INDUK @id_gangguan = ?', [$id]);
            }

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while deleting the data. Please try again.']);
        }
    }
}
