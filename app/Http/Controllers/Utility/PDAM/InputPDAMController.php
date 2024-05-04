<?php

namespace App\Http\Controllers\Utility\PDAM;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;


class InputPDAMController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {

        $mesin = DB::connection('ConnUtility')->select('exec SP_LIST_MESIN_GENZET');
        $access = (new HakAksesController)->HakAksesFiturMaster('Utility');
        return view('Utility.PDAM.InputPDAM', compact('mesin', 'access'));
    }

    //Show the form for creating a new resource.
    public function createPDAM(Request $request)
    {
        try {
            $tanggal = $request->input('Tanggal');
            $jam = $request->input('Jam');
            $nometer = $request->input('Meter');
            $counter = $request->input('Counter');
            $teknisi = $request->input('Teknisi');
            $UserInput = Auth::user()->NomorUser;
            $data = DB::connection('ConnUtility')->statement('exec SP_INSERT_PDAM ? , ? , ? , ? , ? , ?', [$tanggal, $jam, $nometer, $counter, $teknisi, $UserInput]);
            return response()->json($data);
                } catch (\Exception $e) {
            return redirect()->back()->with('error', 'An error occurred while saving the data. Please try again.');
        }
    }
    public function updatePDAM(Request $request)
    {
        try {
            $id = $request->input('Nomorpdam');
            $tanggal = $request->input('Tanggal');
            $jam = $request->input('Jam');
            $nometer = $request->input('Meter');
            $counter = $request->input('Counter');
            $teknisi = $request->input('Teknisi');
            $UserInput = Auth::user()->NomorUser;

            $data = DB::connection('ConnUtility')->statement('exec SP_KOREKSI_PDAM ? , ? , ? , ? , ? , ? , ?', [$id, $tanggal, $jam, $nometer, $counter, $teknisi, $UserInput]);
            return response()->json($data);
                } catch (\Exception $e) {
            return redirect()->back()->with('error', 'An error occurred while saving the data. Please try again.');
        }
    }

    public function getPDAM(Request $request)
    {
        $date1 = $request->input('date1');
        $date2 = $request->input('date2');
        $NoMeter = $request->input('NoMeter');

        $listPerawatan = ($NoMeter == 0)
            ? DB::connection('ConnUtility')->select('exec SP_DT_LIST_PDAM_BLN_TAHUN2 @date1 = ?, @date2 = ?, @NoMeter = 0', [$date1, $date2])
            : DB::connection('ConnUtility')->select('exec SP_DT_LIST_PDAM_BLN_TAHUN2 @date1 = ?, @date2 = ?, @NoMeter = ?', [$date1, $date2, $NoMeter]);

        return datatables($listPerawatan)->make(true);
    }

    public function deletePDAM(Request $request)
    {
        try {
            $nomor = $request->input('Nomor');

            foreach ($nomor as $nomor) {
                DB::connection('ConnUtility')->statement('exec SP_HAPUS_PDAM  @nomor = ?', [$nomor]);
            }

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while deleting the data. Please try again.']);
        }
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        //
    }

    //Display the specified resource.
    public function show(Request $request)
    {
        // $date1 = $request->input('date1');
        // $date2 = $request->input('date2');
        // $NoMesin = $request->input('NoMesin');


        // $data = DB::connection('ConnUtility')->select('exec SP_DT_LIST_COMPRESSOR_BLN_TAHUN2 @date1 = ?, @date2 = ?, @NoMesin=?', [$date1,$date2, $NoMesin]);
        // dd($data);
        // return response()->json($data);
        // return view('Utility.Compressor.InputPerawatan.index', compact('mesin','part','keterangan','teknisi','data','access'));
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
