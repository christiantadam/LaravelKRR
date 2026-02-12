<?php

namespace App\Http\Controllers\EDP;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Log;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class MaintenanceLokasiController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('EDP');
        $teknisi = DB::connection('ConnEDP')
            ->table('UserMaster')
            ->orderBy('NamaUser')
            ->where('IsActive', true)
            ->whereNotNull('Password')
            ->get(); //get all user in UserMaster that has registered login page
        $lokasi = DB::connection('ConnUtility')->table('Lokasi')->get();
        return view('EDP.Master.MaintenanceLokasi', compact('access', 'teknisi', 'lokasi'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        try {
            $idUser = $request->input('idUser');
            $lokasi = $request->input('lokasi');
            // dd($idUser, $lokasi);
            DB::connection('ConnEDP')
                ->statement('EXEC SP_4451_EDP_MaintenanceLokasi @kode = ?, @idUser = ?, @idLokasi = ?', [1, $idUser, $lokasi]);

            return response()->json(['message' => 'Data berhasil diupdate!']);
        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ]);
        }

    }

    public function show(Request $request, $id)
    {
        if ($id == 'getData') {
            $results = DB::connection('ConnEDP')
                ->select('EXEC SP_4451_EDP_MaintenanceLokasi @kode = ?', [2]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    // 'tanggal' => Carbon::parse($row->tanggal)->format('m/d/Y'),
                    // 'tanggal_raw' => Carbon::parse($row->tanggal)->format('Y-m-d'),
                    'IDUser' => trim($row->IDUser),
                    'NomorUser' => trim($row->NomorUser),
                    'NamaUser' => trim($row->NamaUser),
                    'Lokasi' => trim($row->Lokasi) ?? '',

                ];
            }
            // dd($response);
            return datatables($response)->make(true);

        } else if ($id == 'getDataNamaUser') {
            $idUser = $request->input('idUser');
            $results = DB::connection('ConnEDP')
                ->select('EXEC SP_4451_EDP_MaintenanceLokasi @kode = ?, @idUser = ?', [3, $idUser]);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'NomorUser' => trim($row->NomorUser) . ' - ' . trim($row->NamaUser),
                ];
            }
            // dd($response);
            return datatables($response)->make(true);

        } else if ($id == 'getDataLokasiUser') {
            $idUser = $request->input('idUser');
            $results = DB::connection('ConnEDP')
                ->select('EXEC SP_4451_EDP_MaintenanceLokasi @kode = ?, @idUser = ?', [4, $idUser]);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Id_Lokasi' => trim($row->Id_Lokasi),
                ];
            }
            // dd($response);
            return datatables($response)->make(true);
        }
    }

    public function edit(Request $request, $id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
