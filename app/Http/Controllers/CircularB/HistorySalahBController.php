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

class HistorySalahBController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Circular B');
        return view('CircularB.koreksi.HistorySalah', compact('access'));
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
        if ($id == 'cekHistoryLapsalah') {
            $data = DB::connection('ConnCircularMojosari')
                ->select('EXEC SP_1273_CIR_CEKHISTORY_LAPSALAH');
            // dd($data);
            $response = [];
            foreach ($data as $row) {
                $response[] = [
                    'NoOrder' => $row->NoOrder ?? '0',
                    'TotalMtr' => $row->TotalMtr ?? 0,
                    'TotalKg' => $row->TotalKg ?? 0,
                ];
            }

            return datatables($response)->make(true);

        } else if ($id == 'cekHistorySalah') {
            $tanggal = $request->input('tanggal');

            $data = DB::connection('ConnCircularMojosari')
                ->select('EXEC SP_1273_CIR_CEK_HISTORYSALAH @Tgl = ?', [$tanggal]);
            // dd($data);
            $response = [];
            foreach ($data as $row) {
                $response[] = [
                    'Nama_Brg' => $row->Nama_Brg ?? '0',
                    'HasilMeter' => $row->HasilMeter ?? 0,
                    'HasilKg' => $row->HasilKg ?? 0,
                ];
            }

            return datatables($response)->make(true);

        } else if ($id == 'cekCekHistory') {
            $tanggal = $request->input('tanggal');

            // Ambil kedua data dulu
            $lstHistory = DB::connection('ConnCircularMojosari')
                ->select('EXEC SP_1273_CIR_CEKHISTORY_LAPSALAH');

            $lstHistory1 = DB::connection('ConnCircularMojosari')
                ->select('EXEC SP_1273_CIR_CEK_HISTORYSALAH @Tgl = ?', [$tanggal]);

            $cekHistory = [];

            foreach ($lstHistory1 as $j => $row) {
                $hasilMeter = $row->HasilMeter ?? 0;
                $hasilKg = $row->HasilKg ?? 0;

                $compareIndex = $j + 1;

                $cekNoOrder = $lstHistory[$compareIndex]->NoOrder ?? '0';
                $cekMeterSelisih = ($lstHistory[$compareIndex]->TotalMtr ?? 0) - $hasilMeter;
                $cekKgSelisih = ($lstHistory[$compareIndex]->TotalKg ?? 0) - $hasilKg;

                $cekHistory[] = [
                    'NoOrder' => $cekNoOrder,
                    'SelisihMeter' => $cekMeterSelisih,
                    'SelisihKg' => $cekKgSelisih,
                    'IsError' => $cekMeterSelisih != 0 || $cekKgSelisih != 0,
                ];
            }
            // dd($cekHistory);
            return datatables($cekHistory)->make(true);
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
