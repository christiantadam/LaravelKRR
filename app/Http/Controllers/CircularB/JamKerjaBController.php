<?php

namespace App\Http\Controllers\CircularB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Log;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class JamKerjaBController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Circular B');
        return view('CircularB.koreksi.JamKerja', compact('access'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $idType_mesin = $request->input('idType_mesin');
        $id_mesin = $request->input('id_mesin');
        $jam_kerja = $request->input('jam_kerja');
        $tanggal = $request->input('tanggal');
        $shift = $request->input('shift');

        // Validasi awal
        if (empty($jam_kerja) || empty($idType_mesin)) {
            return response()->json(['error' => 'Mohon lengkapi dulu datanya']);
        }

        try {
            if (empty($shift)) {
                if (empty($id_mesin)) {
                    // Kode = 1
                    DB::connection('ConnCircularMojosari')->statement('EXEC SP_1273_CIR_Insert_JamKerja @Kode = ?, @Tanggal = ?, @IdTypeMesin = ?, @JamKerja = ?', [
                        '1',
                        $tanggal,
                        $idType_mesin,
                        $jam_kerja
                    ]);
                } else {
                    // Kode = 2
                    DB::connection('ConnCircularMojosari')->statement('EXEC SP_1273_CIR_Insert_JamKerja @Kode = ?, @Tanggal = ?, @IdTypeMesin = ?, @IdMesin = ?, @JamKerja = ?', [
                        '2',
                        $tanggal,
                        $idType_mesin,
                        $id_mesin,
                        $jam_kerja
                    ]);
                }
            } else {
                if (empty($id_mesin)) {
                    // Kode = 3
                    DB::connection('ConnCircularMojosari')->statement('EXEC SP_1273_CIR_Insert_JamKerja @Kode = ?, @Tanggal = ?, @Shift = ?, @IdTypeMesin = ?, @JamKerja = ?', [
                        '3',
                        $tanggal,
                        $shift,
                        $idType_mesin,
                        $jam_kerja
                    ]);
                } else {
                    // Kode = 4
                    DB::connection('ConnCircularMojosari')->statement('EXEC SP_1273_CIR_Insert_JamKerja @Kode = ?, @Tanggal = ?, @Shift = ?, @IdTypeMesin = ?, @IdMesin = ?, @JamKerja = ?', [
                        '4',
                        $tanggal,
                        $shift,
                        $idType_mesin,
                        $id_mesin,
                        $jam_kerja
                    ]);
                }
            }

            return response()->json(['message' => 'Data sudah tersimpan']);

        } catch (Exception $e) {
            return response()->json(['error' => 'Terjadi kesalahan saat memproses data: ' . $e->getMessage()]);
        }
    }

    public function show(Request $request, $id)
    {
        if ($id == 'getTypeMesin') {
            $results = DB::connection('ConnCircularMojosari')
                ->select('EXEC SP_1273_CIR_LIST_ALL_TYPEMSN');
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Type_Mesin' => trim($row->Type_Mesin),
                    'IdType_Mesin' => trim($row->IdType_Mesin),
                ];
            }

            return datatables($response)->make(true);

        } else if ($id == 'getMesin') {
            $idTypeMesin = $request->input('idType_mesin');
            // dd($idTypeMesin);
            $results = DB::connection('ConnCircularMojosari')
                ->select('EXEC SP_1273_CIR_LIST_IDTYPE_MESIN @IdType_Mesin = ?', [trim($idTypeMesin)]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Nama_mesin' => trim($row->Nama_mesin),
                    'Id_mesin' => trim($row->Id_mesin),
                ];
            }

            return datatables($response)->make(true);
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
