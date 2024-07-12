<?php

namespace App\Http\Controllers\Accounting\Piutang\InformasiBank;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AnalisaInformasiBankController extends Controller
{
    public function index()
    {
        $data = 'Accounting';
        return view('Accounting.Piutang.InformasiBank.AnalisaInformasiBank', compact('data'));
    }

    public function getTabelAnalisis($tanggal, $tanggal2, $radiogrup)
    {
        if ($radiogrup == 0) {
            // Handle ketika radio button "Belum Analisa" dipilih
            $tabel = DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_REFERENSI_BANK] @Kode = ?, @Tanggal = ?, @Tanggal1 = ?, @analisa = ?',
            [
                8,
                $tanggal,
                $tanggal2,
                0 // Menggunakan nilai "belum"
            ]);
            return response()->json($tabel);
        } elseif ($radiogrup == 1) {
            // Handle ketika radio button "Sudah Analisa" dipilih
            $tabel = DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_REFERENSI_BANK] @Kode = ?, @Tanggal = ?, @Tanggal1 = ?, @analisa = ?',
            [
                8,
                $tanggal,
                $tanggal2,
                1 // Menggunakan nilai "sudah"
            ]);
            return response()->json($tabel);
        };
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        //dd($request->all());

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
        //dd($request->all());
        $noReferensi = $request->noReferensi;
        $idCustomer = $request->idCustomer;
        $radiogrup2 = $request->radiogrup2;
        $ketDariBank = $request->ketDariBank;
        $statusPenagihan = $request->statusPenagihan;

        $selectedValue = $request->input('radiogrup2');

        if ($selectedValue == 'T') {
            $statusPenagihan = $statusPenagihan;
        } elseif ($selectedValue == 'U') {
            $ketDariBank = 'Uang Titipan'; // Atau nilai yang sesuai untuk 'U'
        };

        DB::connection('ConnAccounting')->statement('exec [SP_1486_ACC_LIST_REFERENSI_BANK]
        @Kode = ?,
        @IdReferensi = ?', [
            2,
            $noReferensi
        ]);
        // Log::info('Request Data: ' .json_encode($ketDariBank));
        DB::connection('ConnAccounting')->statement('exec [SP_1486_ACC_UPDATE_REFERENSI_BANK]
        @Kode = ?,
        @Id_Cust = ?,
        @Status_tagihan = ?,
        @IdReferensi = ?,
        @UserId = ?,
        @Ket = ?', [
            1,
            $idCustomer,
            $statusPenagihan,
            $noReferensi,
            1,
            $ketDariBank
            // Log::info('Request Data: ' .json_encode($ketDariBank));
        ]);
        return response()->json('Data Telah Terupdate');
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
