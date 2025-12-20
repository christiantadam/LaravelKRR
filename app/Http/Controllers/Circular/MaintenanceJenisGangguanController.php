<?php

namespace App\Http\Controllers\Circular;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Log;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class MaintenanceJenisGangguanController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Circular');
        return view('Circular.master.MaintenanceJenisGangguan', compact('access'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show(Request $request, $id)
    {
        if ($id == 'getListJenisGangguan') {

            $results = DB::connection('ConnCircular')
                ->select('EXEC Sp_List_JenisGangguan @Kode = ?', [1]);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Jenis_Gangguan' => trim($row->Jenis_Gangguan),
                    'Id_Jenis_Gangguan' => trim($row->Id_Jenis_Gangguan),
                    'Status_Gangguan' => trim($row->Status_Gangguan),
                ];
            }

            return datatables($response)->make(true);

        } else if ($id == 'getStatusJenisGangguan') {

            $idJenisGangguan = $request->input('id_typeMesin');

            $result = DB::connection('ConnCircular')
                ->select(
                    'EXEC Sp_List_JenisGangguan @Kode = ?, @IdJenisGangguan = ?',
                    [2, $idJenisGangguan]
                );

            $status = null;
            if (!empty($result)) {
                $status = $result[0]->status_Gangguan;
            }

            return response()->json([
                'status' => $status,
                'is_internal' => $status === 'I',
                'is_external' => $status === 'E',
            ]);

        } elseif ($id == 'ProsesJenisGangguan') {
            // dd($request->all());
            $adaerr = false;
            $status = null;

            // Status Gangguan
            if ($request->input('status_gangguan') == 'I') {
                $status = 'I';
            } elseif ($request->input('status_gangguan') == 'E') {
                $status = 'E';
            }

            $proses = $request->input('proses'); // 1 = insert, 2 = update, 3 = delete

            try {

                switch ($proses) {
                    case 1:
                        if (!$status) {
                            return response()->json(['error' => 'Pilih dulu Status Gangguan (Interen / Eksteren)']);
                        }

                        // Cek apakah jenis gangguan sudah ada
                        $cek = DB::connection('ConnCircular')
                            ->select(
                                'EXEC sp_jenis_gangguan @jenis = ?',
                                [trim($request->input('jenisGangguan'))]
                            );

                        if (count($cek) > 0) {
                            return response()->json(['error' => 'Jenis Gangguan Sudah ADA!']);
                        }

                        // Simpan
                        DB::connection('ConnCircular')
                            ->statement(
                                'EXEC Sp_Maint_JenisGangguan 
                        @Kode = ?, 
                        @JenisGangguan = ?, 
                        @StatusGangguan = ?',
                                [
                                    1,
                                    $request->input('jenisGangguan'),
                                    $status
                                ]
                            );
                        return response()->json(['message' => 'Data sudah diSIMPAN!']);

                    case 2:
                        if (!$status) {
                            return response()->json(['error' => 'Pilih dulu Status Gangguan (Interen / Eksteren)']);
                        }

                        DB::connection('ConnCircular')
                            ->statement(
                                'EXEC Sp_Maint_JenisGangguan 
                        @Kode = ?, 
                        @IdJenisGangguan = ?, 
                        @JenisGangguan = ?, 
                        @StatusGangguan = ?',
                                [
                                    2,
                                    $request->input('id_gangguan'),
                                    $request->input('jenisGangguan'),
                                    $status
                                ]
                            );
                        return response()->json(['message' => 'Data sudah diKOREKSI!']);

                    case 3:
                        DB::connection('ConnCircular')
                            ->statement(
                                'EXEC Sp_Maint_JenisGangguan 
                        @Kode = ?, 
                        @IdJenisGangguan = ?',
                                [
                                    3,
                                    $request->input('id_gangguan')
                                ]
                            );
                        return response()->json(['message' => 'Data sudah diHAPUS!']);

                    default:
                        return response()->json(['error', 'Proses tidak valid']);
                }

            } catch (Exception $e) {
                return response()->json([
                    'error' => $e->getMessage()
                ]);
            }
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
