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

class GantiNamaKaryawanBController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Circular B');
        return view('CircularB.koreksi.GantiNamaKaryawan', compact('access'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $dataList = $request->input('data', []);
        $shift = $request->input('shift');
        $tanggal = $request->input('tanggal');
        $ganti_karyawan = $request->input('ganti_karyawan');
        $kode = '3';

        try {
            DB::connection('ConnCircularMojosari')->statement('exec SP_1273_CIR_ERROR_CIR @Kode = ?, @Tanggal = ?, @IdMesin = ?, @Karyawan = ?, @Shift = ?', [$kode, $tanggal, $dataList[0]['Id_mesin'], $ganti_karyawan, $shift]);
            return response()->json(['message' => 'Data berhasil diproses']);

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
            $shift = $request->input('shift');
            $kode = empty($shift) ? '1' : '2';
            // dd($kode);
            $parameters = [
                ['name' => 'Kode', 'value' => $kode],
                ['name' => 'Tanggal', 'value' => $tanggal],
                ['name' => 'Mesin', 'value' => $mesin],
            ];

            if ($kode == '2') {
                $parameters[] = ['name' => 'Shift', 'value' => $shift];
            }

            // Bangun parameter binding
            $bindings = [];
            $sqlParams = [];
            foreach ($parameters as $p) {
                $bindings[] = $p['value'];
                $sqlParams[] = '?';
            }

            $sql = 'exec SP_1273_CIR_ERROR_CIR ' . implode(',', $sqlParams);
            $results = DB::connection('ConnCircularMojosari')->select($sql, $bindings);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Id_mesin' => $row->Id_mesin ?? '',
                    'Id_Log' => $row->Id_Log ?? '',
                    'Status_log' => $row->Status_log ?? '',
                    'Shift' => $row->Shift ?? '',
                    'A_rpm' => $row->A_rpm ?? '',
                    'A_n_shutle' => $row->A_n_shutle ?? '',
                    'Id_order' => $row->Id_order ?? '',
                    'Id_karyawan' => $row->Id_karyawan ?? '',
                    'Counter_mesin_awal' => $row->Counter_mesin_awal ?? '',
                    'Counter_mesin_akhir' => $row->Counter_mesin_akhir ?? '',
                    // Carbon::parse($row->Tgl_Log)->format('m/d/Y')
                    // date('Y-m-d H:i:s', strtotime($row->Awal_jam_kerja)
                    'Awal_jam_kerja' => isset($row->Awal_jam_kerja) ? Carbon::parse($row->Awal_jam_kerja)->format('m/d/Y') : null,
                    'Akhir_jam_kerja' => isset($row->Akhir_jam_kerja) ? Carbon::parse($row->Akhir_jam_kerja)->format('m/d/Y') : null,
                    'Id_User' => $row->Id_User ?? '',
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
