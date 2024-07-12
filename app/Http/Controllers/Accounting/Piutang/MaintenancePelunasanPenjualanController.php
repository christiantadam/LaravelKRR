<?php

namespace App\Http\Controllers\Accounting\Piutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MaintenancePelunasanPenjualanController extends Controller
{
    public function index()
    {
        $data = 'Accounting';
        return view('Accounting.Piutang.MaintenancePelunasanPenjualan', compact('data'));
    }

    public function getCustIsi()
    {
        $tabel =  DB::connection('ConnSales')->select('exec [SP_1486_ACC_LIST_ALL_CUSTOMER] @Kode = ?', [1]);
        return response()->json($tabel);
    }

    public function getCustKoreksi()
    {
        $tabel =  DB::connection('ConnSales')->select('exec [SP_1486_ACC_LIST_ALL_CUSTOMER] @Kode = ?', [5]);
        return response()->json($tabel);
    }

    public function getJenisPembayaran()
    {
        $tabel =  DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_TJENISPEMBAYARAN] @Kode = ?', [1]);
        return response()->json($tabel);
    }

    public function getReferensiBank($idCustomer)
    {
        $tabel =  DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_REFERENSI_BANK] @Kode = ?, @Id_Cust = ?', [4, $idCustomer]);
        return response()->json($tabel);
    }

    public function getDataRefBank($idReferensi)
    {
        $tabel =  DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_REFERENSI_BANK] @Kode = ?, @IdReferensi = ?', [2, $idReferensi]);
        return response()->json($tabel);
    }

    public function getListPenagihanSJ($idCustomer)
    {
        $tabel =  DB::connection('ConnAccounting')->select('exec [SP_LIST_PENAGIHAN_SJ] @Kode = ?, @IdCustomer = ?', [3, $idCustomer]);
        return response()->json($tabel);
    }

    public function getLihatDetailPelunasan($no_Pen)
    {
        $noPen = str_replace('.', '/', $no_Pen);
        $tabel =  DB::connection('ConnAccounting')->select('exec [SP_LIST_PELUNASAN_TAGIHAN] @Kode = ?, @Id_Penagihan = ?', [4, $noPen]);
        return response()->json($tabel);
    }

    public function getListPelunasanTagihan($no_Pen)
    {
        $noPen = str_replace('.', '/', $no_Pen);
        $tabel =  DB::connection('ConnAccounting')->select('exec [SP_LIST_PELUNASAN_TAGIHAN] @Kode = ?, @Id_Penagihan = ?', [4, $noPen]);
        return response()->json($tabel);
    }

    public function getKdPerkiraan()
    {
        $tabel =  DB::connection('ConnAccounting')->select('exec [Sp_List_KodePerkiraan] @Kode = ?', [1]);
        return response()->json($tabel);
    }

    public function getListPelunasan($idCustomer)
    {
        $tabel =  DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_PELUNASANTAGIHAN] @Kode = ?, @Id_Customer = ?', [1, $idCustomer]);
        return response()->json($tabel);
    }

    public function getDataPelunasanTagihan($Id_Pelunasan)
    {
        $IdPelunasan = str_replace('.', '/', $Id_Pelunasan);
        $tabel =  DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_PELUNASAN_TAGIHAN] @Kode = ?, @Id_Pelunasan = ?', [2, $IdPelunasan]);
        return response()->json($tabel);
    }

    public function LihatDetailPelunasan($Id_Pelunasan)
    {
        $IdPelunasan = str_replace('.', '/', $Id_Pelunasan);
        $tabel =  DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_PELUNASAN_TAGIHAN] @Kode = 3, @Id_Pelunasan = ?', [3, $IdPelunasan]);
        return response()->json($tabel);
    }

    public function getCekReferensiPelunasan($Id_Pelunasan)
    {
        $IdPelunasan = str_replace('.', '/', $Id_Pelunasan);
        $tabel =  DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_REFERENSI_BANK] @Kode = ?, @Id_pelunasan = ?', [5, $IdPelunasan]);
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
        $tanggalInput = $request->tanggalInput;
        $idJenisPembayaran = $request->idJenisPembayaran;
        $nilaiPiutang = $request->nilaiPiutang;
        $idMataUang = $request->idMataUang;
        $buktiPelunasan = $request->buktiPelunasan;
        $idCustomer = $request->idCustomer;
        $sisa = $request->sisa;
        $idReferensi = $request->idReferensi;
        $statusBayar = $request->statusBayar;
        $IdPelunasan = $request->IdPelunasan;

        $tabelIdPenagihan = $request->tabelIdPenagihan;
        $tabelNilaiPelunasan = $request->tabelNilaiPelunasan;
        $tabelPelunasanRupiah = $request->tabelPelunasanRupiah;
        $tabelBiaya = $request->tabelBiaya;
        $tabelLunas = $request->tabelLunas;
        $tabelPelunasanCurrency = $request->tabelPelunasanCurrency;
        $tabelKurangLebih = $request->tabelKurangLebih;
        $tabelKodePerkiraan = $request->tabelKodePerkiraan;
        $tabelIdDetail = $request->tabelIdDetail;

        DB::connection('ConnAccounting')->statement('exec [SP_1486_ACC_MAINT_PELUNASAN_TAGIHAN]
        @Kode = ?,
        @Tgl_Pelunasan = ?,
        @id_Jenis_Bayar = ?,
        @Nilai_Pelunasan = ?,
        @Id_MataUang = ?,
        @No_Bukti = ?,
        @Status_Penagihan = ?,
        @Id_Cust = ?,
        @SaldoPelunasan = ?,
        @UserInput = ?,
        @Status_Bayar = ?,
        @IdReferensi = ?
        ', [
            1,
            $tanggalInput,
            $idJenisPembayaran,
            $nilaiPiutang,
            $idMataUang,
            $buktiPelunasan,
            "Y",
            $idCustomer,
            $sisa,
            1,
            $statusBayar,
            $idReferensi
        ]);

        // Lakukan operasi UPDATE
        $IdPelunasan = DB::connection('ConnAccounting')->table('T_Referensi_Bank')
            ->where('IdReferensi', '=', $idReferensi)
            ->value('Id_Pelunasan');

        //dd($IdPelunasan);
        DB::connection('ConnAccounting')->statement('exec [SP_1486_ACC_MAINT_PELUNASAN_TAGIHAN]
        @Kode = ?,
        @Id_Pelunasan = ?,
        @Id_Penagihan = ?,
        @Nilai_Pelunasan = ?,
        @Pelunasan_Rupiah = ?,
        @Biaya = ?,
        @Lunas = ?,
        @Pelunasan_Curency = ?,
        @KurangLebih = ?,
        @Kode_Perkiraan = ?,
        @ID_Penagihan_Pembulatan = ?',
        [
            2,
            $IdPelunasan,
            $tabelIdPenagihan,
            $tabelNilaiPelunasan,
            $tabelPelunasanRupiah,
            $tabelBiaya,
            $tabelLunas,
            $tabelPelunasanCurrency,
            $tabelKurangLebih,
            $tabelKodePerkiraan,
            $tabelIdDetail
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
        $Id_Pelunasan = $request->Id_Pelunasan;
        $IdPelunasan = str_replace('.', '/', $Id_Pelunasan);

        $tabelIdDetailPelunasan = $request->tabelIdDetailPelunasan;
        $tabelIdPenagihan = $request->tabelIdPenagihan;
        $tabelNilaiPelunasan = $request->tabelNilaiPelunasan;
        $tabelPelunasanRupiah = $request->tabelPelunasanRupiah;
        $tabelBiaya = $request->tabelBiaya;
        $tabelLunas = $request->tabelLunas;
        $tabelPelunasanCurrency = $request->tabelPelunasanCurrency;
        $tabelKurangLebih = $request->tabelKurangLebih;
        $tabelKodePerkiraan = $request->tabelKodePerkiraan;

        $nilaiPiutang = $request->nilaiPiutang;
        $tanggalInput = $request->tanggalInput;
        $idJenisPembayaran = $request->idJenisPembayaran;
        $buktiPelunasan = $request->buktiPelunasan;
        $sisa = $request->sisa;

        $arrayDetail = $request->arrayDetail;
        $arrayNew = explode(",", $arrayDetail);

        $arrayPenagihan = $request->arrayPenagihan;
        $arrayNewPenagihan = explode(",", $arrayPenagihan);

        for ($i=0; $i < count($arrayNew); $i++) {
        DB::connection('ConnAccounting')->statement('exec [SP_1486_ACC_MAINT_PELUNASAN_TAGIHAN]
        @Kode = ?,
        @Id_Pelunasan = ?,
        @Id_Detail_Pelunasan = ?,
        @Id_Penagihan = ?',
        [
            4,
            $IdPelunasan,
            $arrayNew[$i],
            $arrayNewPenagihan[$i]
        ]);
        }

        DB::connection('ConnAccounting')->statement('exec [SP_1486_ACC_MAINT_PELUNASAN_TAGIHAN]
        @Kode = ?,
        @Id_Pelunasan = ?,
        @Id_Detail_Pelunasan = ?,
        @Id_Penagihan = ?,
        @Nilai_Pelunasan = ?,
        @Pelunasan_Rupiah = ?,
        @Biaya = ?,
        @Lunas = ?,
        @Pelunasan_Curency = ?,
        @KurangLebih = ?,
        @Kode_Perkiraan = ?',
        [
            5,
            $IdPelunasan,
            $tabelIdDetailPelunasan,
            $tabelIdPenagihan,
            $tabelNilaiPelunasan,
            $tabelPelunasanRupiah,
            $tabelBiaya,
            $tabelLunas,
            $tabelPelunasanCurrency,
            $tabelKurangLebih,
            $tabelKodePerkiraan
        ]);

        DB::connection('ConnAccounting')->statement('exec [SP_1486_ACC_MAINT_PELUNASAN_TAGIHAN]
        @Kode = ?,
        @Id_Pelunasan = ?,
        @Nilai_Pelunasan = ?,
        @Tgl_Pelunasan = ?,
        @id_Jenis_Bayar = ?,
        @No_Bukti = ?,
        @SaldoPelunasan = ?',
        [
            3,
            $IdPelunasan,
            $nilaiPiutang,
            $tanggalInput,
            $idJenisPembayaran,
            $buktiPelunasan,
            $tabelBiaya,
            $tabelLunas,
            $tabelPelunasanCurrency,
            $tabelKurangLebih,
            $sisa
        ]);
        return redirect()->back()->with('success', 'Detail Sudah Terkoreksi');
    }

    //Remove the specified resource from storage.
    public function destroy(Request $request, $id)
    {
        $hAtauB = $request->hAtauB;
        $Id_Pelunasan = $request->Id_Pelunasan;
        $IdPelunasan = str_replace('.', '/', $Id_Pelunasan);
        $tabelIdDetailPelunasan = $request->tabelIdDetailPelunasan;
        $tabelIdPenagihan = $request->tabelIdPenagihan;

        if ($hAtauB == 'H') {
            DB::connection('ConnAccounting')->statement('exec [SP_1486_ACC_MAINT_PELUNASAN_TAGIHAN]
            @Kode = ?,
            @Id_Pelunasan = ?',
            [
                3,
                $IdPelunasan
            ]);
        } elseif ($hAtauB == 'B') {
            DB::connection('ConnAccounting')->statement('exec [SP_1486_ACC_MAINT_PELUNASAN_TAGIHAN]
            @Kode = ?,
            @Id_Pelunasan = ?,
            @Id_Detail_Pelunasan = ?',
            [
                8,
                $IdPelunasan,
                $tabelIdDetailPelunasan
            ]);

            DB::connection('ConnAccounting')->statement('exec [SP_1486_ACC_MAINT_PELUNASAN_TAGIHAN]
            @Kode = ?,
            @Id_Pelunasan = ?,
            @Id_Detail_Pelunasan = ?,
            @Id_Penagihan = ?',
            [
                4,
                $IdPelunasan,
                $tabelIdDetailPelunasan,
                $tabelIdPenagihan
            ]);
        }

        return redirect()->back()->with('success', 'Data Sudah Terhapus');
    }
}
