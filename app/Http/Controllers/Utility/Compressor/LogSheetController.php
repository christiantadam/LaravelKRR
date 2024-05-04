<?php

namespace App\Http\Controllers\Utility\Compressor;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;


class LogSheetController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {

        $mesin = DB::connection('ConnUtility')->select('exec SP_LIST_MESIN_COMPRESSOR');
        // dd($teknisi);

        $access = (new HakAksesController)->HakAksesFiturMaster('Utility');
        // dd($supplier);
        return view('Utility.Compressor.LogSheet.index', compact('mesin', 'access'));
    }

    //Display the specified resource.
    public function saveDataLogSheet(Request $request)
    {
        try {
            $Tanggal = $request->input('Tanggal');
            $Mesin = $request->input('Mesin');
            $Jam = $request->input('Jam');
            $Temp = $request->input('Temp');
            $Bar = $request->input('Bar');
            $RM_Hours = $request->input('RM_Hours');
            $LM_Hours = $request->input('LM_Hours');
            $R_Hours = $request->input('R_Hours');
            $L_Hours = $request->input('L_Hours');
            $Efs = $request->input('Efs');
            $Tech = $request->input('Tech');
            $Keterangan = $request->input('Keterangan');
            $UserInput = Auth::user()->NomorUser;

            $datetimeNow = now();
            $datetimeJam = $datetimeNow->toDateString() . ' ' . $Jam;


            $data = DB::connection('ConnUtility')->statement('exec SP_INSERT_LOG_SHEET_COMPRESSOR ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?', [$Tanggal, $Mesin, $datetimeJam, $Temp, $Bar, $RM_Hours, $LM_Hours, $R_Hours, $L_Hours, $Efs, $Tech, $Keterangan, $UserInput]);
            return response()->json($data);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'An error occurred while saving the data. Please try again.');
        }
    }
    public function updateDataLogSheet(Request $request)
    {
        try {
            $id = $request->input('id');
            $Tanggal = $request->input('Tanggal');
            $Mesin = $request->input('Mesin');
            $Jam = $request->input('Jam');
            $Temp = $request->input('Temp');
            $Bar = $request->input('Bar');
            $RM_Hours = $request->input('RM_Hours');
            $LM_Hours = $request->input('LM_Hours');
            $R_Hours = $request->input('R_Hours');
            $L_Hours = $request->input('L_Hours');
            $Efs = $request->input('Efs');
            $Tech = $request->input('Tech');
            $Keterangan = $request->input('Keterangan');
            $UserInput = Auth::user()->NomorUser;

            $data = DB::connection('ConnUtility')->statement('exec SP_KOREKSI_LOG_SHEET_COMPRESSOR ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?', [$id, $Tanggal, $Mesin, $Jam, $Temp, $Bar, $RM_Hours, $LM_Hours, $R_Hours, $L_Hours, $Efs, $Tech, $Keterangan, $UserInput]);
            return response()->json($data);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'An error occurred while saving the data. Please try again.');
        }
    }

    //Display the specified resource.
    public function getDataLogSheet(Request $request)
    {
        $date1 = $request->input('date1');
        $date2 = $request->input('date2');
        $NoMesin = $request->input('NoMesin');

        $listLogSheet = ($NoMesin == 0)
            ? DB::connection('ConnUtility')->select('exec SP_LIST_LOG_SHEET_BLN_TAHUN @date1 = ?, @date2 = ?, @NoMesin = 0', [$date1, $date2])
            : DB::connection('ConnUtility')->select('exec SP_LIST_LOG_SHEET_BLN_TAHUN @date1 = ?, @date2 = ?, @NoMesin = ?', [$date1, $date2, $NoMesin]);

        return datatables($listLogSheet)->make(true);
    }
    public function getDataLogSheetById(Request $request)
    {
        $id = $request->input('id');
        $data = DB::connection('ConnUtility')->table('LOG_SHEET_COMPRESSOR')->where('NoLogSheet', $id)->first();

        if (!$data) {
            return response()->json(['message' => 'Data not found'], 404);
        }

        return response()->json($data, 200);
    }

    public function deleteDataLogSheet(Request $request)
    {
        try {
            $NoLogSheet = $request->input('NoLogSheet');

            foreach ($NoLogSheet as $nomorlog) {
                DB::connection('ConnUtility')->statement('exec SP_HAPUS_LOG_SHEET_COMPRESSOR  @NoLogSheet = ?', [$nomorlog]);
            }

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while deleting the data. Please try again.']);
        }
    }

    //Display the specified resource.
    public function show($id)
    {
        //
    }

    //Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request, $id)
    {
        //
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
