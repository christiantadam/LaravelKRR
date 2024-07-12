<?php

namespace App\Http\Controllers\Accounting\Piutang\InformasiBank;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;


class MaintenanceInformasiBankController extends Controller
{
    public function index()
    {
        $data = 'Accounting';
        return view('Accounting.Piutang.InformasiBank.MaintenanceInformasiBank', compact('data'));
    }

    public function getTabelInfoBank($tanggal)
    {
        //dd($tanggal);
        $tabel =  DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_REFERENSI_BANK] @Kode = ?, @Tanggal = ?', [1, $tanggal]);
        return response()->json($tabel);
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
        $tanggal = $request->tanggal;
        $idBank = $request->idBank;
        $idMataUang = $request->idMataUang;
        $totalNilai = $request->totalNilai;
        $radiogrup1 = $request->radiogrup1;
        $keterangan = $request->keterangan;
        $idJenisPembayaran = $request->idJenisPembayaran;
        $noBukti = $request->noBukti;

        DB::connection('ConnAccounting')->statement('exec [SP_1486_ACC_MAINT_REFERENSI_BANK]
        @Kode = ?,
        @Tanggal = ?,
        @Id_Bank = ?,
        @Id_MataUang = ?,
        @Nilai = ?,
        @TypeTransaksi = ?,
        @Keterangan = ?,
        @Userid = ?,
        @Id_Jenis_Bayar = ?,
        @No_Bukti = ?', [
            1,
            $tanggal,
            $idBank,
            $idMataUang,
            $totalNilai,
            $radiogrup1,
            $keterangan,
            1,
            $idJenisPembayaran,
            $noBukti
        ]);

        // return redirect()->back()->with('success', 'Data sudah diSimpan');
        return response()->json('Data sudah TerSimpan');
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
    public function update(Request $request, $id)
    {
        //Log::info('Request Data: ' .json_encode($request->all()));
        //dd($request->all());
        $idReferensi = $request->idReferensi;
        $idBank = $request->idBank;
        $idMataUang = $request->idMataUang;
        $totalNilai = $request->totalNilai;
        $radiogrup1 = $request->radiogrup1;
        $keterangan = $request->keterangan;
        $idJenisPembayaran = $request->idJenisPembayaran;
        $noBukti = $request->noBukti;

        DB::connection('ConnAccounting')->statement('exec [SP_1486_ACC_LIST_REFERENSI_BANK]
        @Kode = ?,
        @IdReferensi = ?', [
            2,
            $idReferensi
        ]);

        DB::connection('ConnAccounting')->statement('exec [SP_1486_ACC_MAINT_REFERENSI_BANK]
        @Kode = ?,
        @IdReferensi = ?,
        @Id_Bank = ?,
        @Id_MataUang = ?,
        @Nilai = ?,
        @TypeTransaksi = ?,
        @Keterangan = ?,
        @Id_Jenis_Bayar = ?,
        @No_Bukti = ?', [
            2,
            $idReferensi,
            $idBank,
            $idMataUang,
            $totalNilai,
            $radiogrup1,
            $keterangan,
            $idJenisPembayaran,
            $noBukti
        ]);
        return response()->json('Data Telah Terupdate');
        // return redirect()->back()->with('success', 'Detail Sudah Terkoreksi');
    }

    //Remove the specified resource from storage.
    public function destroy($idReferensi)
    {
        DB::connection('ConnAccounting')->statement('exec [SP_1486_ACC_MAINT_REFERENSI_BANK]
        @Kode = ?,
        @IdReferensi = ?', [
            3,
            $idReferensi
        ]);
        return redirect()->back()->with('success', 'Data sudah diHAPUS');
    }
}
