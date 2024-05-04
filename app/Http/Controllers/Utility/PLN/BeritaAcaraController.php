<?php

namespace App\Http\Controllers\Utility\PLN;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;


class BeritaAcaraController extends Controller
{
    public function createBA(Request $request)
    {
        try {
            $nomorBA = $request->input('nomorBA');
            $TanggalBA = $request->input('TanggalBA');
            $lwbpBA = $request->input('lwbpBA');
            $wbpBA = $request->input('wbpBA');
            $kvarhBA = $request->input('kvarhBA');
            $kvaBA = $request->input('kvaBA');
            $posisiJamBA = $request->input('posisiJamBA');
            $timeswitchBA = $request->input('timeswitchBA');
            $pelangganBA = $request->input('pelangganBA');
            $pembacaBA = $request->input('pembacaBA');
            $UserInput = Auth::user()->NomorUser;

            $data = DB::connection('ConnUtility')->statement('exec SP_INSERT_PLN_BERITA ?,?,?,?,?,?,?,?,?,?,?', [$nomorBA, $TanggalBA, $lwbpBA, $wbpBA, $kvarhBA, $kvaBA, $posisiJamBA, $timeswitchBA, $pelangganBA, $pembacaBA, $UserInput]);
            return response()->json($data);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'An error occurred while saving the data. Please try again.');
        }
    }
    public function updateBA(Request $request)
    {
        try {
            $nomorBA = $request->input('nomorBA');
            $TanggalBA = $request->input('TanggalBA');
            $lwbpBA = $request->input('lwbpBA');
            $wbpBA = $request->input('wbpBA');
            $kvarhBA = $request->input('kvarhBA');
            $kvaBA = $request->input('kvaBA');
            $posisiJamBA = $request->input('posisiJamBA');
            $timeswitchBA = $request->input('timeswitchBA');
            $pelangganBA = $request->input('pelangganBA');
            $pembacaBA = $request->input('pembacaBA');
            $UserInput = Auth::user()->NomorUser;

            $data = DB::connection('ConnUtility')->statement('exec SP_KOREKSI_PLN_BERITA ?,?,?,?,?,?,?,?,?,?,?', [$nomorBA, $TanggalBA, $lwbpBA, $wbpBA, $kvarhBA, $kvaBA, $posisiJamBA, $timeswitchBA, $pelangganBA, $pembacaBA, $UserInput]);
            return response()->json($data);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'An error occurred while saving the data. Please try again.');
        }
    }

    //Display the specified resource.
    public function getBA(Request $request)
    {
        try {
            $tahun = $request->input('tahun');

            $data = DB::connection('ConnUtility')->select('exec SP_LIST_PLN_BERITA_TAHUN @tahun = ?', [$tahun]);
            return datatables($data)->make(true);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function getBAById(Request $request)
    {
        $id = $request->input('idSDP');
        $data = DB::connection('ConnUtility')->table('PANEL_SPD')->where('NoTransaksi', $id)->first();

        if (!$data) {
            return response()->json(['message' => 'Data not found'], 404);
        }

        return response()->json($data, 200);
    }



    public function deleteBA(Request $request)
    {
        try {
            $nomor = $request->input('Nomor');

            foreach ($nomor as $nomor) {
                DB::connection('ConnUtility')->statement('exec SP_HAPUS_PLN_BERITA @nomor = ?', [$nomor]);
            }

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while deleting the data. Please try again.']);
        }
    }
}
