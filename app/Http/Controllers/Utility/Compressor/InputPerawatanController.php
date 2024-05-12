<?php

namespace App\Http\Controllers\Utility\Compressor;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class InputPerawatanController extends Controller
{
    public function index()
    {
        $mesin = DB::connection('ConnUtility')->select('exec SP_LIST_MESIN_COMPRESSOR');
        $part = DB::connection('ConnUtility')->select('exec SP_LIST_PART_COMPRESSOR');
        $IDUser = auth::user()->IDUser;
        // dd($IDUser);

        $teknisi = DB::connection('ConnUtility')
            ->select("exec SP_LIST_UTILITY_TEKNISI @IdUserMaster = ?", [$IDUser]);
        $access = (new HakAksesController)->HakAksesFiturMaster('Utility');

        return view('Utility.Compressor.InputPerawatan.index', compact('mesin', 'part', 'teknisi', 'access'));
    }


    public function getKeterangan(Request $request)
    {
        $idPart = $request->input('idPart');
        $keterangan = DB::connection('ConnUtility')->select('exec SP_LIST_KETERANGAN_PART_COMPRESSOR @NoPart = ?', [$idPart]);

        return response()->json($keterangan);
    }

    public function getPerawatan(Request $request)
    {
        $date1 = $request->input('date1');
        $date2 = $request->input('date2');
        $NoMesin = $request->input('NoMesin');

        $listPerawatan = ($NoMesin == 0)
            ? DB::connection('ConnUtility')->select('exec SP_DT_LIST_COMPRESSOR_BLN_TAHUN2 @date1 = ?, @date2 = ?, @NoMesin = 0', [$date1, $date2])
            : DB::connection('ConnUtility')->select('exec SP_DT_LIST_COMPRESSOR_BLN_TAHUN2 @date1 = ?, @date2 = ?, @NoMesin = ?', [$date1, $date2, $NoMesin]);

        return datatables($listPerawatan)->make(true);
    }

    public function getPerawatanById(Request $request)
    {
        $id = $request->input('id');
        $data = DB::connection('ConnUtility')->table('PERAWATAN_COMPRESSOR')->where('NoPerawatan', $id)->first();

        if (!$data) {
            return response()->json(['message' => 'Data not found'], 404);
        }

        return response()->json($data, 200);
    }


    public function savePerawatan(Request $request)
{
    try {
        $tanggal = $request->input('Tanggal');
        $noMesin = $request->input('NoMesin');
        $jamOperasi = $request->input('JamOperasi');
        $idPart = $request->input('IdPart');
        $keterangan = $request->input('Keterangan');
        $teknisi = $request->input('Teknisi');
        $UserInput = Auth::user()->NomorUser;

        // Lakukan pengecekan apakah ada data dengan tanggal, nomor mesin, dan id part yang sama tetapi keterangan yang berbeda
        $existingData = DB::connection('ConnUtility')
            ->table('PERAWATAN_COMPRESSOR')
            ->where('Tanggal', $tanggal)
            ->where('NoMesin', $noMesin)
            ->where('IdPart', $idPart)
            ->where('NoKeteranganPart', $keterangan)
            ->first();

        if ($existingData) {
            return response()->json(['Error' => 'Data dengan tanggal, mesin, dan keterangan yang sama sudah tersimpan.']);
        } else {
            DB::connection('ConnUtility')->statement('exec SP_INSERT_PERAWATAN_COMPRESSOR ?, ?, ?, ?, ?, ?, ?', [
                $tanggal, $noMesin, $jamOperasi, $idPart, $keterangan, $teknisi, $UserInput
            ]);
            return response()->json('save success', 200);
        }
    } catch (\Exception $e) {
        return response()->json(['Error' => 'Data dengan tanggal, mesin, dan keterangan yang sama sudah tersimpan 2.']);
    }
}



    public function updatePerawatan(Request $request)
    {
        try {
            $id = $request->input('id');
            $tanggal = $request->input('Tanggal');
            $noMesin = $request->input('NoMesin');
            $jamOperasi = $request->input('JamOperasi');
            $idPart = $request->input('IdPart');
            $keterangan = $request->input('Keterangan');
            $teknisi = $request->input('Teknisi');
            $UserInput = Auth::user()->NomorUser;

            $data = DB::connection('ConnUtility')->statement('exec SP_KOREKSI_PERAWATAN_COMPRESSOR ?, ?, ?, ?, ?, ?, ?, ?', [
                $id, $tanggal, $noMesin, $jamOperasi, $idPart, $keterangan, $teknisi, $UserInput
            ]);

            return response('hehe'); //->json($data);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'An error occurred while saving the data. Please try again.');
        }
    }


    // public function updatePerawatan2(Request $request)
    // {
    //     try {
    //         $id = $request->input('id');
    //         $tanggal = $request->input('Tanggal');
    //         $noMesin = $request->input('NoMesin');
    //         $jamOperasi = $request->input('JamOperasi');
    //         $idPart = $request->input('IdPart');
    //         $keterangan = $request->input('Keterangan');
    //         $teknisi = $request->input('Teknisi');
    //         $UserInput = Auth::user()->NomorUser;

    //         $data = DB::connection('ConnUtility')->table('PERAWATAN_COMPRESSOR')->where('NoPerawatan',$id)->update([
    //             'Tanggal'=>$tanggal,
    //             'NoMesin'=>$noMesin,
    //             'JamOperasi'=>$jamOperasi,
    //             'IdPart'=>$idPart,
    //             'NoKeteranganPart'=>$keterangan,
    //             'Teknisi'=>$teknisi,
    //             'UserInput'=>$UserInput,

    //         ]);

    //         return response()->json($data);
    //     } catch (\Exception $e) {
    //         return redirect()->back()->with('error', 'An error occurred while saving the data. Please try again.');
    //     }
    // }





    public function hapusPerawatan(Request $request)
    {
        try {
            $NomorPerawatan = $request->input('NoPerawatan');

            foreach ($NomorPerawatan as $nomor) {
                DB::connection('ConnUtility')->statement('exec SP_HAPUS_PERAWATAN_COMPRESSOR  @NoPerawatan = ?', [$nomor]);
            }

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while deleting the data. Please try again.']);
        }
    }


    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        //
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
        // Your implementation for destroy method
    }
}
