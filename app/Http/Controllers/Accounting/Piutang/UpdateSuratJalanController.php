<?php

namespace App\Http\Controllers\Accounting\Piutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UpdateSuratJalanController extends Controller
{
    public function index()
    {
        $data = 'Accounting';
        return view('Accounting.Piutang.UpdateSuratJalan', compact('data'));
    }

    public function getTabelSuratJalan()
    {
        //dd("masuk");
        $data =  DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_PENAGIHAN_SJ]
        @Kode = ?', [21]);
        return response()->json($data);
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        $suratJalan = $request->suratJalan;
        $idPenagihan = $request->idPenagihan;
        $jatuhTempo = $request->jatuhTempo;
        $idCustomer = $request->idCustomer;
        DB::connection('ConnAccounting')->statement('exec [SP_1486_ACC_LIST_PENAGIHAN_SJ]
        @Kode = ?,
        @Surat_jalan = ?'
        , [
            17,
            $suratJalan
        ]);

        $idSuratPesanan = DB::connection('ConnSales')->table('VW_PRG_1486_ACC_ID_DETAILPENGIRIMAN')
        ->where('IDPengiriman', $suratJalan)
        ->value('IDSuratPesanan');
        //return response()->json($idSuratPesanan);

        // dd($idSuratPesanan);

        DB::connection('ConnAccounting')->statement('exec [SP_1486_ACC_MAINT_PENAGIHAN_SJ]
        @Kode = ?,
        @Id_Penagihan = ?,
        @SuratJalan = ?,
        @JatuhTempo = ?,
        @Id_customer = ?,
        @SuratPesanan = ?'
        , [
            2,
            $idPenagihan,
            $suratJalan,
            $jatuhTempo,
            $idCustomer,
            $idSuratPesanan
        ]);

        return redirect()->back()->with('success', 'Data Sudah Tersimpan');
    }

    //Display the specified resource.
    public function show($cr)
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
        //
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
