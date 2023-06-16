<?php

namespace App\Http\Controllers\Sales\Cetak;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use PDF;

class CetakSPController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        // dd(now()->format('Y-m-d'));
        $date = now()->format('Y-m-d');
        // $date = '2023-04-03';
        $nosp = db::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SP_CETAK @Kode = ?, @Tanggal = ?', [3, $date]);
        // dd($nosp);
        return view('Sales.Report.CetakSP', compact('nosp'));
    }

    public function getSuratPesananSelect($tanggal)
    {
        $nosp = db::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SP_CETAK @Kode =?, @Tanggal =?', [3,$tanggal]);
        return response()->json($nosp);
    }

    public function getSuratPesananText($nosp)
    {
        $data = db::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SP_CETAK @Kode = ?, @IdSuratPesanan = ?', [2, $nosp]);
        return response()->json($data);
    }

    public function getJenisSp($nosp)
    {
        $jnssp = db::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SP_CETAK @Kode = ?, @IdSuratPesanan = ?', [2, $nosp]);
        return response()->json($jnssp);
    }

    public function getViewPrint($nosp)
    {
        $data = db::connection('ConnSales')->select('Select * from VW_PRG_1486_SLS_CETAK_SP1 where NO_SP = ?', [$nosp]);
        return response()->json($data);
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    // Store a newly created resource in storage.
    public function store(Request $request)
    {

    }

    //Display the specified resource.
    public function show($id)
    {
        //
    }

    //Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update($id)
    {

    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
