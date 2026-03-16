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

class GantiIdOrderController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Circular');
        return view('Circular.koreksi.GantiIdOrder', compact('access'));
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
        $tanggal = $request->input('tanggal')
            ? date('Y-m-d', strtotime($request->input('tanggal')))
            : null;
        $mesin = $request->input('nama_mesin');
        $id_mesin = $dataList[0]['Id_mesin'] ?? null;
        $id_max = $dataList[0]['idMax'] ?? 0;

        if (empty($order_lama) || empty($mesin) || empty($order_baru) || count($dataList) == 0) {
            return response()->json([
                'error' => 'Mohon Lengkapi Dulu Datanya'
            ]);
        }

        try {
            DB::connection('ConnCircular')->beginTransaction();

            $counter = 0;

            if ((int) $id_max === 0) {
                $resultCounter = DB::connection('ConnCircular')->select(
                    "EXEC SP_1273_CIR_GANTI_ORDER @Kode = ?, @Tanggal = ?, @Mesin = ?, @IdOrder = ?",
                    [
                        '3',
                        $tanggal,
                        $mesin,
                        $order_lama
                    ]
                );
            } else {
                $resultCounter = DB::connection('ConnCircular')->select(
                    "EXEC SP_1273_CIR_GANTI_ORDER @Kode = ?, @Tanggal = ?, @Mesin = ?, @IdOrder = ?, @IdMax = ?",
                    [
                        '4',
                        $tanggal,
                        $mesin,
                        $order_lama,
                        $id_max
                    ]
                );
            }

            if (!empty($resultCounter)) {
                foreach ($resultCounter as $row) {
                    $counter = $row->Counter ?? 0;
                }
            }

            DB::connection('ConnCircular')->statement(
                "EXEC SP_1273_CIR_GANTI_ORDER @Kode = ?, @IdOrder = ?, @JmlOrder = ?",
                [
                    '5',
                    $order_lama,
                    $counter
                ]
            );

            DB::connection('ConnCircular')->statement(
                "EXEC SP_1273_CIR_GANTI_ORDER @Kode = ?, @OrderBaru = ?, @JmlOrder = ?",
                [
                    '6',
                    $order_baru,
                    $counter
                ]
            );
            // dd($id_max, $order_lama);
            if ((int) $id_max === 0) {
                DB::connection('ConnCircular')->statement(
                    "EXEC SP_1273_CIR_GANTI_ORDER @Kode = ?, @Tanggal = ?, @IdMesin = ?, @IdOrder = ?, @OrderBaru = ?",
                    [
                        '7',
                        $tanggal,
                        $id_mesin,
                        $order_lama,
                        $order_baru
                    ]
                );
            } else {
                DB::connection('ConnCircular')->statement(
                    "EXEC SP_1273_CIR_GANTI_ORDER @Kode = ?, @Tanggal = ?, @IdMesin = ?, @IdOrder = ?, @OrderBaru = ?, @IdMax = ?",
                    [
                        '8',
                        $tanggal,
                        $id_mesin,
                        $order_lama,
                        $order_baru,
                        $id_max
                    ]
                );
            }

            DB::connection('ConnCircular')->commit();

            return response()->json([
                'message' => 'Data berhasil diproses'
            ]);
        } catch (\Throwable $e) {
            DB::connection('ConnCircular')->rollBack();
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
            $resultErrorCir = DB::connection('ConnCircular')
                ->select(
                    'EXEC SP_1273_CIR_ERROR_CIR @Kode = ?, @Tanggal = ?, @Mesin = ?',
                    [6, $tanggal, $mesin]
                );
            // dd($resultErrorCir);
            $idMax = 0;
            if (!empty($resultErrorCir)) {
                foreach ($resultErrorCir as $row) {
                    if (!is_null($row->IdLog ?? null)) {
                        $idMax = $row->IdLog;
                    }
                }
            }

            if ($idMax == 0) {
                // Jika tidak ada IdLog
                $results = DB::connection('ConnCircular')->select(
                    'EXEC SP_1273_CIR_GANTI_ORDER @Kode = ?, @Tanggal = ?, @Mesin = ?, @IdOrder = ?',
                    [1, $tanggal, $mesin, $idOrder]
                );
            } else {
                // Jika ada IdLog
                $results = DB::connection('ConnCircular')->select(
                    'EXEC SP_1273_CIR_GANTI_ORDER @Kode = ?, @Tanggal = ?, @Mesin = ?, @IdMax = ?, @IdOrder = ?',
                    [2, $tanggal, $mesin, $idMax, $idOrder]
                );
            }
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'idMax' => $idMax,
                    'Id_mesin' => $row->Id_mesin ?? '',
                    'Id_Log' => $row->Id_Log ?? '',
                    'Status_log' => $row->Status_log ?? '',
                    'Shift' => $row->Shift ?? '',
                    'A_rpm' => $row->A_rpm ?? '',
                    'Id_order' => $row->Id_order ?? '',
                    'Id_karyawan' => $row->Id_karyawan ?? '',
                    'Counter_mesin_awal' => $row->Counter_mesin_awal ?? '',
                    'Counter_mesin_akhir' => $row->Counter_mesin_akhir ?? '',
                    'Awal_jam_kerja' => isset($row->Awal_jam_kerja) ? Carbon::parse($row->Awal_jam_kerja)->format('m/d/Y') : null,
                    'Akhir_jam_kerja' => isset($row->Akhir_jam_kerja) ? Carbon::parse($row->Akhir_jam_kerja)->format('m/d/Y') : null,
                    'Id_User' => $row->Id_User ?? '',
                    'A_n_shutle' => $row->A_n_shutle ?? '',
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
