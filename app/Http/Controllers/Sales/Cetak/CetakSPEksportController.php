<?php

namespace App\Http\Controllers\Sales\Cetak;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use DB;

class CetakSPEksportController extends Controller
{
    public function index()
    {
        $date = now()->format('Y-m-d');
        $nosp = db::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SP_CETAK @Kode = ?, @Tanggal = ?', [4, $date]);
        // dd($nosp);
        $access = (new HakAksesController)->HakAksesFiturMaster('Sales');
        return view('Sales.Report.CetakSPEkspor', compact('access', 'nosp'));
    }
    public function getSuratPesananSelect($tanggal)
    {
        $nosp = db::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SP_CETAK @Kode =?, @Tanggal =?', [4, $tanggal]);
        return response()->json($nosp);
    }

    public function getSuratPesananText($no_spValue)
    {
        $no_sp = str_replace('.', '/', $no_spValue);
        $data = db::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SP_CETAK @Kode = ?, @IdSuratPesanan = ?', [2, $no_sp]);
        return response()->json($data);
    }
    public function getViewPrint($no_spValue)
    {
        $no_sp = str_replace('.', '/', $no_spValue);
        $data = DB::connection('ConnSales')->table('VW_SLS_4384_CETAK_SP_EKSPORT_LARAVEL')->select('*')->where('NO_SP', '=', $no_sp)->orderBy('IDPesanan', 'asc')->get();

        // $data = db::connection('ConnSales')->select('Select * from VW_PRG_1486_SLS_CETAK_SP1 where NO_SP = ?', [$no_sp]);
        return response()->json($data);
    }
    public function create()
    {
        //
    }
    public function store(Request $request)
    {
        //
    }
    public function show($id)
    {
        //
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
