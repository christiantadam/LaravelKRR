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

class GantiIdOrderBController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Circular B');
        return view('CircularB.koreksi.GantiIdOrder', compact('access'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $dataList = $request->input('data', []);
        $order_lama = $request->input('order_lama');
        $order_baru = $request->input('ganti_order');
        $tanggal = $request->input('tanggal'); // pastikan dalam format Y-m-d
        $mesin = $request->input('nama_mesin');
        $id_mesin = $dataList[0]['Id_mesin'] ?? null; // Ambil Id_mesin dari dataList
        $id_max = $dataList[0]['Id_Log'] ?? 0;

        // Validasi awal seperti VB
        if (empty($order_lama) || empty($mesin) || empty($order_baru) || count($dataList) == 0) {
            return response()->json(['error' => 'Mohon Lengkapi Dulu Datanya']);
        }

        try {
            $counter = 0;

            if ($id_max == 0) {
                // Step 1: Ambil counter
                $result1 = DB::connection('ConnCircularMojosari')->select("EXEC SP_1273_CIR_GANTI_ORDER @Kode = ?, @Tanggal = ?, @Mesin = ?, @IdOrder = ?", [
                    '3',
                    $tanggal,
                    $mesin,
                    $order_lama
                ]);
                if (!empty($result1)) {
                    $counter = $result1[0]->Counter ?? 0;
                }

                // Step 2: Kode = 5
                DB::connection('ConnCircularMojosari')->select("EXEC SP_1273_CIR_GANTI_ORDER @Kode = ?, @IdOrder = ?, @JmlOrder = ?", [
                    '5',
                    $order_lama,
                    $counter
                ]);

                // Step 3: Kode = 6
                DB::connection('ConnCircularMojosari')->select("EXEC SP_1273_CIR_GANTI_ORDER @Kode = ?, @OrderBaru = ?, @JmlOrder = ?", [
                    '6',
                    $order_baru,
                    $counter
                ]);

                // Step 4: Kode = 7
                DB::connection('ConnCircularMojosari')->select("EXEC SP_1273_CIR_GANTI_ORDER @Kode = ?, @Tanggal = ?, @IdMesin = ?, @IdOrder = ?, @OrderBaru = ?", [
                    '7',
                    $tanggal,
                    $id_mesin,
                    $order_lama,
                    $order_baru
                ]);
            } else {
                // Step 1: Ambil counter dengan IdMax
                $result2 = DB::connection('ConnCircularMojosari')->select("EXEC SP_1273_CIR_GANTI_ORDER @Kode = ?, @Tanggal = ?, @Mesin = ?, @IdOrder = ?, @IdMax = ?", [
                    '4',
                    $tanggal,
                    $mesin,
                    $order_lama,
                    $id_max
                ]);
                if (!empty($result2)) {
                    $counter = $result2[0]->Counter ?? 0;
                }

                // Step 2: Kode = 5
                DB::connection('ConnCircularMojosari')->select("EXEC SP_1273_CIR_GANTI_ORDER @Kode = ?, @IdOrder = ?, @JmlOrder = ?", [
                    '5',
                    $order_lama,
                    $counter
                ]);

                // Step 3: Kode = 6
                DB::connection('ConnCircularMojosari')->select("EXEC SP_1273_CIR_GANTI_ORDER @Kode = ?, @OrderBaru = ?, @JmlOrder = ?", [
                    '6',
                    $order_baru,
                    $counter
                ]);

                // Step 4: Kode = 8
                DB::connection('ConnCircularMojosari')->select("EXEC SP_1273_CIR_GANTI_ORDER @Kode = ?, @Tanggal = ?, @IdMesin = ?, @IdOrder = ?, @OrderBaru = ?, @IdMax = ?", [
                    '8',
                    $tanggal,
                    $id_mesin,
                    $order_lama,
                    $order_baru,
                    $id_max
                ]);
            }

            return response()->json([
                'message' => 'Id Order Sudah Diganti'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show(Request $request, $id)
    {
        if ($id == 'getData') {
            $mesin = $request->input('nama_mesin');
            $tanggal = $request->input('tanggal');
            $idOrder = $request->input('order_lama');
            // dd($mesin, $tanggal, $idOrder);
            // Langkah 1: Panggil SP_1273_CIR_ERROR_CIR dengan Kode = 6
            $parameters = [
                $kode = '6',
                $tanggal,
                $mesin,
            ];
            // dd($parameters);
            $sql = 'EXEC SP_1273_CIR_ERROR_CIR ?, ?, ?';
            $resultErrorCir = DB::connection('ConnCircularMojosari')->select($sql, $parameters);
            // dd($resultErrorCir);
            // Ambil IdMax jika ada
            $idMax = 0;
            if (!empty($resultErrorCir)) {
                foreach ($resultErrorCir as $row) {
                    if (!is_null($row->IdLog ?? null)) {
                        $idMax = $row->IdLog;
                    }
                }
            }
            // dd($idMax);
            // Langkah 2: Panggil SP_1273_CIR_GANTI_ORDER dengan Kode 1 atau 2
            if ($idMax == 0) {
                // Jika tidak ada IdLog
                $kodeGanti = '1';
                $paramsGantiOrder = [
                    $kodeGanti,
                    $tanggal,
                    $mesin,
                    $idOrder,
                ];
            } else {
                // Jika ada IdLog
                $kodeGanti = '2';
                $paramsGantiOrder = [
                    $kodeGanti,
                    $tanggal,
                    $mesin,
                    $idMax,
                    $idOrder,
                ];
            }

            // Susun query SQL
            $placeholders = implode(',', array_fill(0, count($paramsGantiOrder), '?'));
            $sqlGantiOrder = "EXEC SP_1273_CIR_GANTI_ORDER $placeholders";

            // Eksekusi stored procedure
            $results = DB::connection('ConnCircularMojosari')->select($sqlGantiOrder, $paramsGantiOrder);
            // dd($results);
            // Format responsenya
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Id_mesin' => $row->Id_Mesin ?? '',
                    'Id_Log' => $row->Id_log ?? '',
                    'Status_log' => $row->Status_Log ?? '',
                    'Shift' => $row->Shift ?? '',
                    'A_rpm' => $row->A_rpm ?? '',
                    'Id_order' => $row->Id_order ?? '',
                    'Id_karyawan' => $row->Id_Karyawan ?? '',
                    'Counter_mesin_awal' => $row->Counter_mesin_awal ?? '',
                    'Counter_mesin_akhir' => $row->Counter_mesin_akhir ?? '',
                    'Awal_jam_kerja' => isset($row->Awal_jam_kerja) ? Carbon::parse($row->Awal_jam_kerja)->format('m/d/Y') : null,
                    'Akhir_jam_kerja' => isset($row->Akhir_jam_kerja) ? Carbon::parse($row->Akhir_jam_kerja)->format('m/d/Y') : null,
                    'Id_User' => $row->Id_user ?? '',
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
