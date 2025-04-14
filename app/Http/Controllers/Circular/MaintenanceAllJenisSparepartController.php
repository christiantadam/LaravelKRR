<?php

namespace App\Http\Controllers\Circular;

use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use DB;
use Auth;

class MaintenanceAllJenisSparepartController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Circular');
        $nomorUser = trim(Auth::user()->NomorUser);
        return view('Circular.mesin.formMaintenanceAllJenisSparepart', compact('access', 'nomorUser'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $idStore = $request->input('idStore');
        if ($idStore == 'tambahJenisSparepart') {
            $namaSparepart = $request->input('namaSparepart');
            $identificationNumber = $request->input('identificationNumber');
            $keterangan = $request->input('keterangan');
            try {
                DB::connection('ConnCircular')
                    ->statement('EXEC SP_4384_CIR_Maintenance_Sparepart @XKode = ?, @XNamaSparepart = ?, @XIdentificationNumber = ?, @XKeterangan = ?', [1, $namaSparepart, $identificationNumber, $keterangan]);
                return response()->json(['success' => 'Data berhasil disimpan']);
            } catch (Exception $e) {
                return response()->json(['error' => 'Terjadi kesalahan saat menyimpan data: ' . $e->getMessage()], 500);
            }
        } else if ($idStore == 'editJenisSparepart') {
            $idsparepart = $request->input('idJenisSparepart');
            $namaSparepart = $request->input('namaSparepart');
            $identificationNumber = $request->input('identificationNumber');
            $keterangan = $request->input('keterangan');
            try {
                DB::connection('ConnCircular')
                    ->statement('EXEC SP_4384_CIR_Maintenance_Sparepart @XKode = ?, @XNamaSparepart = ?, @XIdentificationNumber = ?, @XKeterangan = ?, @XIdSparepart = ?', [2, $namaSparepart, $identificationNumber, $keterangan, $idsparepart]);
                return response()->json(['success' => 'Data berhasil diubah']);
            } catch (Exception $e) {
                return response()->json(['error' => 'Terjadi kesalahan saat mengubah data: ' . $e->getMessage()], 500);
            }
        } else if ($idStore == 'deleteJenisSparepart') {
            $idsparepart = $request->input('idJenisSparepart');
            try {
                DB::connection('ConnCircular')
                    ->statement('EXEC SP_4384_CIR_Maintenance_Sparepart @XKode = ?, @XIdSparepart = ?', [3, $idsparepart]);
                return response()->json(['success' => 'Data berhasil dihapus']);
            } catch (Exception $e) {
                return response()->json(['error' => 'Terjadi kesalahan saat menghapus data: ' . $e->getMessage()], 500);
            }
        }
    }

    public function show($id, Request $request)
    {
        if ($id == 'selectAllJenisSparepart') {
            $listSparepart = DB::connection('ConnCircular')->select('EXEC SP_4384_CIR_Maintenance_Sparepart @XKode = ?', [0]);
            // Convert the data into an array that DataTables can consume
            $dataSparepart = [];
            foreach ($listSparepart as $Sparepart) {
                $dataSparepart[] = [
                    'IdSparepart' => $Sparepart->IdSparepart,
                    'NamaSparepart' => $Sparepart->NamaSparepart,
                    'IdentificationNumber' => $Sparepart->IdentificationNumber,
                    'Keterangan' => $Sparepart->Keterangan,
                ];
            }
            return datatables($dataSparepart)->make(true);
        } else if ($id == 'selectJenisSparepart') {
            $idSparepart = $request->input('idJenisSparepart');
            try {
                $sparepart = DB::connection('ConnCircular')->select('EXEC SP_4384_CIR_Maintenance_Sparepart @XKode = ?, @XIdSparepart = ?', [0, $idSparepart]);
                return response()->json(['success' => 'Data berhasil disimpan', 'data' => $sparepart]);
            } catch (exception $e) {
                return response()->json(['error' => 'Terjadi kesalahan saat load data: ' . $e->getMessage()], 500);
            }
        } else {
            return response()->json(['error' => 'Invalid ID'], 400);
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
