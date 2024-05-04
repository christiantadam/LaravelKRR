<?php

namespace App\Http\Controllers\Utility\Genzet;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;


class InputOperasionalController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {

        $mesin = DB::connection('ConnUtility')->select('exec SP_LIST_MESIN_GENZET');
        $status = DB::connection('ConnUtility')->select('exec SP_LIST_STATUSLOG');
        $IDUser = auth::user()->IDUser;
        $lokasiResult = DB::connection('ConnUtility')->table('Utility_Teknisi')
            ->select('Lokasi')
            ->where('IdUserMaster', $IDUser)
            ->first();

        $lokasi = $lokasiResult ? $lokasiResult->Lokasi : null;

        $teknisi = DB::connection('ConnUtility')
            ->select("exec SP_LIST_UTILITY_TEKNISI @lokasi = ?", [$lokasi]);
        $access = (new HakAksesController)->HakAksesFiturMaster('Utility');
        return view('Utility.Genzet.InputOperasional', compact('mesin', 'status', 'teknisi', 'access'));
    }


    public function getGenzet(Request $request)
    {
        $date1 = $request->input('date1');
        $date2 = $request->input('date2');
        $NoMesin = $request->input('NoMesin');

        $listPerawatan = ($NoMesin == 0)
            ? DB::connection('ConnUtility')->select('exec SP_DT_LIST_OPERASIONAL_GENZET2 @date1 = ?, @date2 = ?, @NoMesin = 0', [$date1, $date2])
            : DB::connection('ConnUtility')->select('exec SP_DT_LIST_OPERASIONAL_GENZET2 @date1 = ?, @date2 = ?, @NoMesin = ?', [$date1, $date2, $NoMesin]);

        return datatables($listPerawatan)->make(true);
    }

    public function getById(Request $request)
    {
        $id = $request->input('nomorGenzet');
        $data = DB::connection('ConnUtility')->table('OPERASIONAL_GENZET')->where('NoTransaksi', $id)->first();

        if (!$data) {
            return response()->json(['message' => 'Data not found'], 404);
        }

        return response()->json($data, 200);
    }

    public function statusLog(Request $request)
    {
        $status = DB::connection('ConnUtility')->table('STATUSLOG_GENZET')->get();

        return response()->json($status, 200);
    }


    public function createGenzet(Request $request)
    {
        try {
            $tanggal = $request->input('Tanggal');
            $mesingenzet = $request->input('MesinGenzet');
            $jamawal = $request->input('JamAwal');
            $jamakhir = $request->input('JamAkhir');
            $operationhours = $request->input('OperationHours');
            $lubeoil = $request->input('LubeOil');
            $coolwater = $request->input('CoolWater');
            $volt = $request->input('Volt');
            $hz = $request->input('Hz');
            $amp = $request->input('Amp');
            $tambahbbm = $request->input('TambahBBM');
            $tambahoil = $request->input('TambahOil');
            $statuslog = $request->input('StatusLog');
            $teknisi = $request->input('Teknisi');
            $keterangan = $request->input('Keterangan');
            $UserInput = Auth::user()->NomorUser;

            $datetimeNow = now();
            $datetimeJamAwal = $datetimeNow->toDateString() . ' ' . $jamawal;
            $datetimeJamAkhir = $datetimeNow->toDateString() . ' ' . $jamakhir;

            $data = DB::connection('ConnUtility')->statement('exec SP_INSERT_OPERASIONAL_GENZET ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?', [$tanggal, $mesingenzet, $datetimeJamAwal, $datetimeJamAkhir, $operationhours, $lubeoil, $coolwater, $volt, $hz, $amp, $tambahbbm, $tambahoil, $statuslog, $keterangan, $teknisi, $UserInput]);

            return response()->json($data);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'An error occurred while saving the data. Please try again.');
        }
    }

    public function updateGenzet(Request $request)
    {
        try {
            $id = $request->input('NomorGenzet');
            $tanggal = $request->input('Tanggal');
            $mesingenzet = $request->input('MesinGenzet');
            $jamawal = $request->input('JamAwal');
            $jamakhir = $request->input('JamAkhir');
            $operationhours = $request->input('OperationHours');
            $lubeoil = $request->input('LubeOil');
            $coolwater = $request->input('CoolWater');
            $volt = $request->input('Volt');
            $hz = $request->input('Hz');
            $amp = $request->input('Amp');
            $tambahbbm = $request->input('TambahBBM');
            $tambahoil = $request->input('TambahOil');
            $statuslog = $request->input('StatusLog');
            $teknisi = $request->input('Teknisi');
            $keterangan = $request->input('Keterangan');
            $UserInput = Auth::user()->NomorUser;
            $data = DB::connection('ConnUtility')->statement('exec SP_KOREKSI_OPERASIONAL_GENZET ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?', [$id, $tanggal, $mesingenzet, $jamawal, $jamakhir, $operationhours, $lubeoil, $coolwater, $volt, $hz, $amp, $tambahbbm, $tambahoil, $statuslog, $keterangan, $teknisi, $UserInput]);
            return response()->json($data);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'An error occurred while saving the data. Please try again.');
        }
    }

    public function deleteGenzet(Request $request)
    {
        try {
            $nomor = $request->input('Nomor');

            foreach ($nomor as $nomor) {
                DB::connection('ConnUtility')->statement('exec SP_HAPUS_OPERASIONAL_GENZET  @NoTrans = ?', [$nomor]);
            }

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while deleting the data. Please try again.']);
        }
    }
}
