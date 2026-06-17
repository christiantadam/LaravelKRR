<?php

namespace App\Http\Controllers\PDAM;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Exception;

class InputSumberAirController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('PDAM');
        $idUser = Auth::user()->IDUser;
        $lokasi = DB::connection('ConnEDP')->select('EXEC SP_4451_EDP_MaintenanceLokasi @kode = ?, @idUser = ?', [4, $idUser]);
        return view('PDAM.Master.InputSumberAir.IndexSumberAir', compact('access', 'lokasi'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $jenisStore = $request->input('jenisStore');
        $idSumberAir = $request->input('idSumberAir');
        $namaSumberAir = $request->input('namaSumberAir');
        $lokasi = $request->input('select_lokasiSumberAir');
        if ($jenisStore == 'store') {
            // Tambah Mesin
            try {
                DB::connection('ConnUtility')->statement('EXEC SP_4384_PDAM_Maintenance_Sumber_Air
                    @XKode = ?,
                    @XNamaSumberAir = ?,
                    @XLokasi = ?',
                    [
                        2,
                        $namaSumberAir,
                        $lokasi,
                    ]
                );
                return response()->json(['success' => 'Data sumber air berhasil ditambahkan.']);
            } catch (Exception $e) {
                return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
            }
        } else if ($jenisStore == 'update') {
            // Edit Mesin
            try {
                DB::connection('ConnUtility')->statement('EXEC SP_4384_PDAM_Maintenance_Sumber_Air
                    @XKode = ?,
                    @XNamaSumberAir = ?,
                    @XLokasi = ?,
                    @XIdSumberAir = ?',
                    [
                        3,
                        $namaSumberAir,
                        $lokasi,
                        $idSumberAir,
                    ]
                );
                return response()->json(['success' => 'Data sumber air berhasil diubah.']);
            } catch (Exception $e) {
                return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
            }
        }
    }

    public function show($id, Request $request)
    {
        if ($id == 'getDataSumberAir') {
            $idUser = Auth::user()->IDUser;
            $listSumberAir = DB::connection('ConnUtility')->select('EXEC SP_4384_PDAM_Maintenance_Sumber_Air @XKode = ?, @XIdUser = ?', [0, $idUser]);
            return datatables($listSumberAir)->make(true);
        } else if ($id == 'getDetailSumberAir') {
            $idSumberAir = $request->idSumberAir;
            $detailSumberAir = DB::connection('ConnUtility')->select('EXEC SP_4384_PDAM_Maintenance_Sumber_Air @XKode = ?, @XIdSumberAir = ?', [1, $idSumberAir]);
            return datatables($detailSumberAir)->make(true);
        } else {
            return response()->json(['error' => (string) "Undefined request: " . $id]);
        }
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id, Request $request)
    {
        $aktif = $request->input('aktif') ? 1 : 0;
        try {
            DB::connection('ConnUtility')->statement('EXEC SP_4384_PDAM_Maintenance_Sumber_Air
                @XKode = ?,
                @XAktif = ?,
                @XIdSumberAir = ?',
                [
                    4,
                    $aktif,
                    $id
                ]
            );
            return response()->json(['success' => 'Status sumber air berhasil diubah.']);
        } catch (Exception $e) {
            return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
        }
    }
}
