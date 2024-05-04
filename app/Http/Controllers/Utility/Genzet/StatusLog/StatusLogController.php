<?php

namespace App\Http\Controllers\Utility\Genzet\StatusLog;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class StatusLogController extends Controller
{

    public function saveStatusLog(Request $request)
    {
        try {
            $Status = $request->input('StatusLog');

            $data = DB::connection('ConnUtility')->statement('exec SP_INSERT_STATUSLOG_GENZET ? ', [$Status]);
            return response()->json($data);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'An error occurred while saving the data. Please try again.');
        }
    }

    public function updateStatusLog(Request $request)
    {
        try {
            $id = $request->input('NomorId');
            $Status = $request->input('StatusLog');

            $data = DB::connection('ConnUtility')->statement('exec SP_KOREKSI_STATUSLOG_GENZET ? , ? ', [$id, $Status]);
            return response()->json($data);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'An error occurred while saving the data. Please try again.');
        }
    }

    public function getStatusLog()
    {
        $listStatus =
            DB::connection('ConnUtility')->select('exec SP_LIST_STATUSLOG_GENZET');
        return datatables($listStatus)->make(true);
    }

    public function reloadStatus()
    {
        $listStatus =
            DB::connection('ConnUtility')->select('exec SP_LIST_STATUSLOG_GENZET');
            return response()->json($listStatus);
    }

    public function deleteStatusLog(Request $request)
    {
        try {
            $Id = $request->input('Nomor');

            foreach ($Id as $id) {
                DB::connection('ConnUtility')->statement('exec SP_HAPUS_STATUSLOG_GENZET @NoStatusLog = ?', [$id]);
            }

            return response()->json(['success' => true, 'message' =>'Data Berhasil dihapus!']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while deleting the data. Please try again.']);
        }
    }
}
