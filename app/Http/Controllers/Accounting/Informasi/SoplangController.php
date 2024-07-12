<?php

namespace App\Http\Controllers\Accounting\Informasi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SoplangController extends Controller
{
    public function index()
    {
        $data = 'Accounting';
        return view('Accounting.Informasi.Soplang', compact('data'));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        //
    }

    //Display the specified resource.
    public function show(cr $cr)
    {
        //
    }

    // Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request)
    {
        $tglAkhirLaporan = $request->tglAkhirLaporan;
        DB::connection('ConnAccounting')->statement('exec [SP_PROSES_SALDOPIUTANG]
        @TglAkhir = ?', [
            $tglAkhirLaporan
            // Log::info('Request Data: ' .json_encode($ketDariBank));
        ]);
        return redirect()->back()->with('success', 'Detail Sudah Terkoreksi');
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
