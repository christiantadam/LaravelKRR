<?php

namespace App\Http\Controllers\Accounting\Piutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NotaPenjualanTunaiController extends Controller
{
    public function index()
    {
        $data = 'Accounting';
        return view('Accounting.Piutang.NotaPenjualanTunai', compact('data'));
    }

    public function getLihatPesanan($noSP)
    {
        $data =  DB::connection('ConnSales')->select('exec [SP_1486_ACC_LIST_HEADER_PESANAN]
        @Kode = ?, @IDSURATPESANAN = ?', [3, $noSP]);
        return response()->json($data);
    }

    public function getNotaJualTunai($noSP)
    {
        $data =  DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_PENAGIHAN_SJ]
        @KODE = ?, @SURATPESANAN = ?', [22, $noSP]);
        return response()->json($data);
    }

    public function getNotaJualTunai2($noSP)
    {
        $data =  DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_PENAGIHAN_SJ]
        @KODE = ?, @SURATPESANAN = ?', [13, $noSP]);
        return response()->json($data);
    }

    public function getUserPenagihNota()
    {
        $data =  DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_USER_PENAGIH]
        @KODE = ?', [1]);
        return response()->json($data);
    }

    public function getDokumenNota($kode)
    {
        $jenis =  DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_JENIS_DOKUMEN] @KODE = ?',[$kode]);
        return response()->json($jenis);
    }

    public function getJenisPajakNota()
    {
        $jenis =  DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_JENIS_PAJAK]');
        return response()->json($jenis);
    }

    public function getNoPenagihanUMNota($noSP)
    {
        $jenis =  DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_TAGIHAN_DP_1] @SuratPesanan = ?',[$noSP]);
        return response()->json($jenis);
    }

    public function getNoPenagihan()
    {
        $jenis =  DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_PENAGIHAN_SJ] @KODE = ?',[14]);
        return response()->json($jenis);
    }

    public function getJenisCust($idCustomer)
    {
        $jenis =  DB::connection('ConnSales')->select('exec [SP_1486_ACC_LIST_CUSTOMER] @IDCUST = ?',[$idCustomer]);
        return response()->json($jenis);
    }

    public function getJnsCust($idJenisCustomer)
    {
        $jenis =  DB::connection('ConnSales')->select('exec [SP_1486_ACC_LIST_JNSCUST] @IDJNSCUST = ?',[$idJenisCustomer]);
        return response()->json($jenis);
    }

    public function getLihatSP($id_Penagihan)
    {
        $idNoPenagihan = str_replace('.', '/', $id_Penagihan);

        $jenis =  DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_PENAGIHAN_SJ] @KODE = 15, @ID_PENAGIHAN = ?',[$idNoPenagihan]);
        return response()->json($jenis);
    }

    public function getDataSP($noSP)
    {
        $jenis =  DB::connection('ConnSales')->select('exec [SP_1486_ACC_LIST_HEADER_PESANAN] @KODE = 3, @IDSURATPESANAN = ?',[$noSP]);
        return response()->json($jenis);
    }

    public function getLihatPenagihan($id_Penagihan)
    {
        $idNoPenagihan = str_replace('.', '/', $id_Penagihan);
        $jenis =  DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_PENAGIHAN_SJ] @KODE = 7, @ID_PENAGIHAN = ?',[$idNoPenagihan]);
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
        $tanggalInput = $request->tanggalInput;
        $penagihanPajak = $request->penagihanPajak;
        $idCustomer = $request->idCustomer;
        $nomorPO = $request->nomorPO;
        $idJenisDokumen = $request->idJenisDokumen;
        $totalPenagihan = $request->totalPenagihan;
        $discount = $request->discount;
        $idMataUang = $request->idMataUang;
        $terbilang = $request->idMataUang;
        $idUserPenagih = $request->idUserPenagih;
        $nilaiKurs = $request->nilaiKurs;
        $idJenisPajak = $request->idJenisPajak;
        $Ppn = $request->Ppn;
        $idPenagihanUM = $request->idPenagihanUM;
        $id_PenagihanUM = $request->id_PenagihanUM;
        $noSP = $request->noSP;
        $jenisdok = $request->jenisdok;

        $idPenagihanUM = str_replace('.', '/', $id_PenagihanUM);

        DB::connection('ConnAccounting')->statement('exec [SP_1486_ACC_MAINT_PENAGIHAN_SJ]
        @Kode = ?,
        @Tgl_Penagihan = ?,
        @Id_Customer = ?,
        @PO = ?,
        @id_Jenis_Dokumen = ?,
        @Nilai_Penagihan = ?,
        @Discount = ?,
        @Id_MataUang = ?,
        @Terbilang = ?,
        @UserInput = ?,
        @IdPenagih = ?,
        @TglFakturPajak = ?,
        @NilaiKurs = ?,
        @Jns_PPN = ?,
        @persenPPN = ?,
        @Id_Penagihan_Acuan = ?', [
            1,
            $tanggalInput,
            $idCustomer,
            $nomorPO,
            $idJenisDokumen,
            $totalPenagihan,
            $discount,
            $idMataUang,
            $terbilang,
            1,
            $idUserPenagih,
            $penagihanPajak,
            $nilaiKurs,
            $idJenisPajak,
            $Ppn,
            $idPenagihanUM
        ]);

        //$Id_Penagihan = str_pad($Id, 3, '0', STR_PAD_LEFT) . '/' . $Jns . '/' . str_pad(date('m', strtotime($Tgl_Penagihan)), 2, '0', STR_PAD_LEFT) . '/' . date('Y', strtotime($Tgl_Penagihan));
        $Jns = substr($jenisdok, -2);
        $tahun = substr($tanggalInput, -10, 4);
        $x = DB::connection('ConnAccounting')->table('T_Counter_Faktur')->where('Periode', '=', $tahun)->get('Nomer');
        $x = preg_replace('/[^0-9]/', '', $x);
        $x = intval($x) + 1;
        $Nomer = str_pad($x, 3, '0', STR_PAD_LEFT);
        $Id_Penagihan = $Nomer . '/' . $Jns . '/' . str_pad(date('m', strtotime($tanggalInput)), 2, '0', STR_PAD_LEFT) . '/' . date('Y', strtotime($tanggalInput));

        //dd($Id_Penagihan);

        DB::connection('ConnAccounting')->statement('exec [SP_1486_ACC_MAINT_DETAIL_TAGIHAN_DP]
        @Kode = ?,
        @Id_Penagihan = ?,
        @SuratPesanan = ?', [
            1,
            $Id_Penagihan,
            $noSP
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
        //dd($request->all());
        $id_Penagihan = $request->id_Penagihan;
        $idNoPenagihan = str_replace('.', '/', $id_Penagihan);
        $totalPenagihan = $request->totalPenagihan;
        $discount = $request->discount;
        $idMataUang = $request->idMataUang;
        $terbilang = $request->terbilang;
        $idUserPenagih = $request->idUserPenagih;
        $nilaiKurs = $request->nilaiKurs;
        $idJenisPajak = $request->idJenisPajak;
        $Ppn = $request->Ppn;

        DB::connection('ConnAccounting')->statement('exec [SP_1486_ACC_MAINT_PENAGIHAN_SJ]
        @Kode = ?,
        @Id_Penagihan = ?,
        @Nilai_Penagihan = ?,
        @Discount = ?,
        @Id_MataUang = ?,
        @Terbilang = ?,
        @IdPenagih = ?,
        @NilaiKurs = ?,
        @Jns_PPN = ?,
        @persenPPN = ?',
        [
            4,
            $idNoPenagihan,
            $totalPenagihan,
            $discount,
            $idMataUang,
            $terbilang,
            $idUserPenagih,
            $nilaiKurs,
            $idJenisPajak,
            $Ppn
        ]);
        return redirect()->back()->with('success', 'Detail Sudah Terkoreksi');
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
