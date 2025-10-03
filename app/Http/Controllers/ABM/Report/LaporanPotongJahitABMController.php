<?php

namespace App\Http\Controllers\ABM\Report;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use Yajra\DataTables\Facades\DataTables;
use Exception;
use DB;
use Auth;

class LaporanPotongJahitABMController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('ABM');
        return view('ABM.Report.LaporanPotongJahitABM.Index', compact('access'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show($id, Request $request)
    {
        if ($id == 'cekDataLogMPJ') {
            $tanggalLaporan = $request->input('tanggalLaporan');
            $dataLaporanMPJ = DB::connection('ConnABM')->select('EXEC SP_4384_ABM_Cetak_Laporan_MPJ @XKode = ?, @XTgl_Log = ?', [0, $tanggalLaporan]);
            return response()->json($dataLaporanMPJ, 200);
        } else if ($id == 'printLaporan') {
            $tanggalLaporan = $request->tanggal;
            $data = DB::connection('ConnABM')->select('EXEC SP_4384_ABM_Cetak_Laporan_MPJ @XKode = ?, @XTgl_Log = ?', [1, $tanggalLaporan]);
            return view('ABM.Report.LaporanPotongJahitABM.CetakLaporanMPJABM', compact('data'));
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

    public function destroy($id)
    {
        //
    }
}
