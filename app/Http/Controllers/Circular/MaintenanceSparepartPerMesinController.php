<?php

namespace App\Http\Controllers\Circular;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use DB;
use Auth;
use Exception;

class MaintenanceSparepartPerMesinController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Circular');
        $nomorUser = trim(Auth::user()->NomorUser);
        $listMesin = DB::connection('ConnCircular')
            ->select('exec Sp_List_Mesin @Kode = ?', [10]);
        return view('Circular.mesin.formMaintenanceSparepartPerMesin', compact('access', 'nomorUser', 'listMesin'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $idStore = $request->input('idStore');
        if ($idStore == 'tambahSparepartPerMesin') {
            $kodeBarang = $request->input('kodeBarang');
            $idJenisSparepart = $request->input('idJenisSparepart');
            $idmesin = $request->input('idmesin');
            $lifetimeInHour = $request->input('lifetimeInHour');
            try {
                DB::connection('ConnCircular')
                    ->statement('EXEC SP_4384_CIR_Maintenance_Sparepart @XKode = ?, @XKodeBarang = ?, @XIdMesin = ?, @XIdSparepart = ?, @XLifetimeInHour = ?', [9, $kodeBarang, $idmesin, $idJenisSparepart, $lifetimeInHour]);
                return response()->json(['success' => 'Data berhasil disimpan']);
            } catch (Exception $e) {
                return response()->json(['error' => 'Terjadi kesalahan saat menyimpan data: ' . $e->getMessage()], 500);
            }
        } elseif ($idStore == 'editSparepartPerMesin') {
            $Id_Sparepart_Mesin_KodeBarang = $request->input('Id_Sparepart_Mesin_KodeBarang');
            $kodeBarang = $request->input('kodeBarang');
            $idmesin = $request->input('idmesin');
            $idJenisSparepart = $request->input('idJenisSparepart');
            $lifetimeInHour = $request->input('lifetimeInHour');
            try {
                DB::connection('ConnCircular')
                    ->statement('EXEC SP_4384_CIR_Maintenance_Sparepart @XKode = ?, @XKodeBarang = ?, @XIdMesin = ?, @XIdSparepart = ?, @XLifetimeInHour = ?, @XIdSparepartMesinKodeBarang = ?', [10, $kodeBarang, $idmesin, $idJenisSparepart, $lifetimeInHour, $Id_Sparepart_Mesin_KodeBarang]);
                return response()->json(['success' => 'Data berhasil diubah']);
            } catch (Exception $e) {
                return response()->json(['error' => 'Terjadi kesalahan saat mengubah data: ' . $e->getMessage()], 500);
            }
        } elseif ($idStore == 'deleteSparepartPerMesin') {
            $idSparepartMesin = $request->input('idSparepartMesin');
            try {
                DB::connection('ConnCircular')
                    ->statement('EXEC SP_4384_CIR_Maintenance_Sparepart @XKode = ?, @XIdSparepartMesinKodeBarang = ?', [11, $idSparepartMesin]);
                return response()->json(['success' => 'Data berhasil dinonaktifkan']);
            } catch (Exception $e) {
                return response()->json(['error' => 'Terjadi kesalahan saat mengnonaktifkan data: ' . $e->getMessage()], 500);
            }
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid request'
            ]);
        }
    }

    public function show($id, Request $request)
    {
        if ($id == 'selectAllSparepartPerMesin') {
            $listSparepartPerMesin = DB::connection('ConnCircular')
                ->select('exec SP_4384_CIR_Maintenance_Sparepart @XKode = ?', [4]);
            $dataSparepartPerMesin = [];
            foreach ($listSparepartPerMesin as $SparepartPerMesin) {
                $dataSparepartPerMesin[] = [
                    'Id_Sparepart_Mesin_KodeBarang' => $SparepartPerMesin->Id_Sparepart_Mesin_KodeBarang,
                    'Nama_mesin' => $SparepartPerMesin->Nama_mesin,
                    'NamaSparepart' => $SparepartPerMesin->NamaSparepart,
                    'KodeBarang' => $SparepartPerMesin->KodeBarang,
                    'LifeTimeInHour' => $SparepartPerMesin->LifeTimeInHour,
                ];
            }
            return datatables($dataSparepartPerMesin)->make(true);
        } elseif ($id == 'selectKodeBarangSparepartPerMesin') {
            $kodeBarang = $request->input('kodeBarang');
            $namaSubKelompok = $request->input('namaSubKelompok');
            $dataKodeBarang = DB::connection('ConnCircular')
                ->select('exec SP_4384_CIR_Maintenance_Sparepart @XKode = ?, @XKodeBarang = ?, @XNamaSubKelompok = ?', [5, $kodeBarang, $namaSubKelompok]);
            return response()->json($dataKodeBarang);
        } elseif ($id == 'getSparepartUnownedByMesin') {
            $idmesin = $request->input('idmesin');
            $listSparepart = DB::connection('ConnCircular')
                ->select('exec SP_4384_CIR_Maintenance_Sparepart @XKode = ?, @XIdMesin = ?', [6, $idmesin]);
            return response()->json($listSparepart);
        } elseif ($id == 'getNamaBarang') {
            $kodeBarang = $request->input('kodeBarang');
            $listSparepart = DB::connection('ConnCircular')
                ->select('exec SP_4384_CIR_Maintenance_Sparepart @XKode = ?, @XKodeBarang = ?', [7, $kodeBarang]);
            return response()->json($listSparepart);
        } elseif ($id == 'getSparepartPerMesinById') {
            $Id_Sparepart_Mesin_KodeBarang = $request->input('Id_Sparepart_Mesin_KodeBarang');
            $selectedSparepart = DB::connection('ConnCircular')
                ->select('exec SP_4384_CIR_Maintenance_Sparepart @XKode = ?, @XIdSparepartMesinKodeBarang = ?', [8, $Id_Sparepart_Mesin_KodeBarang]);

            $idmesin = $selectedSparepart[0]->Id_Mesin;
            $listSparepart = DB::connection('ConnCircular')
                ->select('exec SP_4384_CIR_Maintenance_Sparepart @XKode = ?, @XIdMesin = ?', [6, $idmesin]);
            $response = ['selectedSparepart' => $selectedSparepart, 'listSparepart' => $listSparepart];
            return response()->json($response);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid request'
            ]);
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

    public function destroy($id)
    {
        //
    }
}
