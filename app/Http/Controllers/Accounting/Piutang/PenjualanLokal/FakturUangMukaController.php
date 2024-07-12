<?php

namespace App\Http\Controllers\Accounting\Piutang\PenjualanLokal;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FakturUangMukaController extends Controller
{
    public function index()
    {
        $data = 'Accounting';
        return view('Accounting.Piutang.PenjualanLokal.FakturUangMuka', compact('data'));
    }

    public function getNoPenagihan($idCustomer)
    {
        $data =  DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_TAGIHAN_DP]
        @IDCustomer = ?', [$idCustomer]);
        return response()->json($data);
    }

    public function getDataPenagihan($id_Penagihan)
    {
        $IdPenagihan = str_replace('.', '/', $id_Penagihan);
        //dd($IdPenagihan);
        $data =  DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_PENAGIHAN_SJ]
        @Kode = ?, @Id_Penagihan = ?', [8, $IdPenagihan]);
        return response()->json($data);
    }

    public function getJenisCustomer($idJenisCustomer)
    {
        $data =  DB::connection('ConnSales')->select('exec [SP_1486_ACC_LIST_JNSCUST]
        @IDJNSCUST = ?', [$idJenisCustomer]);
        return response()->json($data);
    }

    public function getAlamatCust($idCustomer)
    {
        $data =  DB::connection('ConnSales')->select('exec [SP_1486_ACC_LIST_CUSTOMER]
        @IDCUST = ?', [$idCustomer]);
        return response()->json($data);
    }

    public function getNomorSP($idCustomer)
    {
        $data =  DB::connection('ConnSales')->select('exec [SP_1486_ACC_LIST_HEADER_PESANAN]
        @KODE = ?, @IdCust = ?', [4, $idCustomer]);
        return response()->json($data);
    }

    public function getNomorPO($noSP)
    {
        $data =  DB::connection('ConnSales')->select('exec [SP_1486_ACC_LIST_HEADER_PESANAN]
        @Kode = ?, @IDSURATPESANAN = ?', [3, $noSP]);
        return response()->json($data);
    }

    public function getUserPenagih()
    {
        $user =  DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_USER_PENAGIH]
        @KODE = ?', [1]);
        return response()->json($user);
    }

    public function getJenisPajak()
    {
        $jenis =  DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_JENIS_PAJAK]');
        return response()->json($jenis);
    }

    public function getDokumen($kode)
    {
        $jenis =  DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_JENIS_DOKUMEN] @KODE = ?',[$kode]);
        return response()->json($jenis);
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
        $idCustomer = $request->idCustomer;
        $noPO = $request->noPO;
        $idJenisDokumen = $request->idJenisDokumen;
        $total = $request->total;
        $idMataUang = $request->idMataUang;
        $terbilang = $request->terbilang;
        $idUserPenagih = $request->idUserPenagih;
        $penagihanPajak = $request->penagihanPajak;
        $nilaiKurs = $request->nilaiKurs;
        $idJenisPajak = $request->idJenisPajak;
        $Ppn = $request->Ppn;
        $noSP = $request->noSP;
        $nomorSPSelect = $request->nomorSPSelect;

        //echo gettype($noSP);

        DB::connection('ConnAccounting')->statement('exec [SP_1486_ACC_MAINT_PENAGIHAN_SJ]
        @Kode = ?,
        @Tgl_Penagihan = ?,
        @Id_Customer = ?,
        @PO = ?,
        @id_Jenis_Dokumen = ?,
        @Nilai_Penagihan = ?,
        @Id_MataUang = ?,
        @Terbilang = ?,
        @UserInput = ?,
        @IdPenagih = ?,
        @TglFakturPajak = ?,
        @NilaiKurs = ?,
        @Jns_PPN = ?,
        @persenPPN = ?', [
            1,
            $tanggal,
            $idCustomer,
            $noPO,
            $idJenisDokumen,
            $total,
            $idMataUang,
            $terbilang,
            1,
            $idUserPenagih,
            $penagihanPajak,
            $nilaiKurs,
            $idJenisPajak,
            $Ppn
        ]);

        $idPenagihan = DB::connection('ConnAccounting')->table('T_PENAGIHAN_SJ')
        ->orderBy('Id_Penagihan', 'asc')
        ->value('Id_Penagihan');
        //dd($idPenagihan);

        DB::connection('ConnAccounting')->statement('exec [SP_1486_ACC_MAINT_DETAIL_TAGIHAN_DP]
        @Kode = ?,
        @Id_Penagihan = ?,
        @SuratPesanan = ?', [
            1,
            $idPenagihan,
            $nomorSPSelect
        ]);

        return redirect()->back()->with('success', 'Sudah TerSimpan');
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
        $IdPenagihan = $request->IdPenagihan;
        $total = $request->total;
        $idMataUang = $request->idMataUang;
        $terbilang = $request->terbilang;
        $idUserPenagih = $request->idUserPenagih;
        $nilaiKurs = $request->nilaiKurs;
        $idJenisPajak = $request->idJenisPajak;


        DB::connection('ConnAccounting')->statement('exec [SP_1486_ACC_MAINT_PENAGIHAN_SJ]
        @Kode = ?,
        @Id_Penagihan = ?,
        @Nilai_Penagihan = ?,
        @Discount = ?,
        @Id_MataUang = ?,
        @Terbilang = ?,
        @IdPenagih = ?,
        @NilaiKurs = ?,
        @Jns_PPN = ?', [
            4,
            $IdPenagihan,
            $total,
            0,
            $idMataUang,
            $terbilang,
            $idUserPenagih,
            $nilaiKurs,
            $idJenisPajak
        ]);

        return redirect()->back()->with('success', 'Sudah Terkoreksi');
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        DB::connection('ConnAccounting')->statement('exec [SP_1486_ACC_MAINT_PENAGIHAN_SJ]
        @Kode = ?,
        @IdBank = ?', [
            3,
            $id
        ]);
        return redirect()->back()->with('success', 'Data sudah diHAPUS');
    }
}
