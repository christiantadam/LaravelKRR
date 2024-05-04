<?php

namespace App\Http\Controllers\Utility\PLN;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;


class PanelSDPController extends Controller
{
    public function createSDP(Request $request)
    {
        try {
            $produksi = $request->input('Produksi');
            $tanggal = $request->input('Tanggal');
            $jam = $request->input('Jam');
            $kwh = $request->input('KWH');
            $teknisi = $request->input('Teknisi');
            // $teknisi = $request->input('CT_Faktor');
            $UserInput = Auth::user()->NomorUser;

            $data = DB::connection('ConnUtility')->statement('exec SP_INSERT_SPD ? , ? , ? , ? , ? , ?', [$produksi, $tanggal, $jam, $kwh, $teknisi, $UserInput]);
            return response()->json($data);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'An error occurred while saving the data. Please try again.');
        }
    }
    public function updateSDP(Request $request)
    {
        try {
            $id = $request->input('NomorSDP');
            $produksi = $request->input('Produksi');
            $tanggal = $request->input('Tanggal');
            $jam = $request->input('Jam');
            $kwh = $request->input('KWH');
            $teknisi = $request->input('Teknisi');
            // $teknisi = $request->input('CT_Faktor');
            $UserInput = Auth::user()->NomorUser;

            $data = DB::connection('ConnUtility')->statement('exec SP_KOREKSI_SPD ? , ? , ? , ? , ? , ? , ? ', [$id, $produksi, $tanggal, $jam, $kwh, $teknisi, $UserInput]);
            return response()->json($data);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'An error occurred while saving the data. Please try again.');
        }
    }

    //Display the specified resource.
    public function getSDP(Request $request)
    {
        try {
            $bulan = $request->input('bulan');
            $tahun = $request->input('tahun');
            $produksi = $request->input('produksi');

            $data = ($produksi == 0 || $produksi == null)
                ? DB::connection('ConnUtility')->select('exec SP_LIST_SPD_BLN_TAHUN @bulan = ?, @tahun = ?, @NoProduksi = 0', [$bulan, $tahun])
                : DB::connection('ConnUtility')->select('exec SP_LIST_SPD_BLN_TAHUN @bulan = ?, @tahun = ?, @NoProduksi = ?', [$bulan, $tahun, $produksi]);

            return datatables($data)->make(true);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function getSDPById(Request $request)
    {
        $id = $request->input('idsdp');
        $data = DB::connection('ConnUtility')->table('PANEL_SPD')->where('NoTransaksi', $id)->first();

        if (!$data) {
            return response()->json(['message' => 'Data not found'], 404);
        }

        return response()->json($data, 200);
    }



    public function deleteSDP(Request $request)
    {
        try {
            $nomor = $request->input('NomorSDP');

            foreach ($nomor as $nomor) {
                DB::connection('ConnUtility')->statement('exec SP_HAPUS_SPD @NoTransaksi = ?', [$nomor]);
            }

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while deleting the data. Please try again.']);
        }
    }
}
