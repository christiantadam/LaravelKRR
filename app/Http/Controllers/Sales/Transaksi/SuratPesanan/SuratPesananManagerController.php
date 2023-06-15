<?php

namespace App\Http\Controllers\Sales\Transaksi\SuratPesanan;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class SuratPesananManagerController extends Controller
{

    //Display a listing of the resource.
    public function index()
    {
        $data = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_HEADER_PESANAN_BLMACC @Kode = ?', [2]);
        // dd($data);
        return view('Sales.Transaksi.SuratPesanan.AccManager', compact('data'));
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
    public function show()
    {
        //
    }

    // Show the form for editing the specified resource.
    public function edit($id)
    {

    }

    //Update the specified resource in storage.
    public function update($id)
    {
        $idManager = Auth::user()->NomorUser;
        // dd($id);

        // Call the stored procedure
        DB::connection('ConnSales')->statement('exec SP_1486_SLS_ACC_SURATPESANAN @AccManager = ?, @IDSuratPesanan = ?', [$idManager, $id]);

        // Redirect to the index page
        return redirect()->back()->with('success', 'Surat Pesanan Sudah Disetujui!');
        // return redirect()->route('SuratPesananManager.index');
    }

    public function updateAll(Request $request)
    {
        // dd($request->all());
        $nosp = $request->nomorSPs;
        $idManager = Auth::user()->NomorUser;
        for ($i = 0; $i < count($nosp); $i++) {
            DB::connection('ConnSales')->statement('exec SP_1486_SLS_ACC_SURATPESANAN @AccManager = ?, @IDSuratPesanan = ?', [$idManager, $nosp[$i]]);
        }
        return redirect()->back()->with('success', 'Surat Pesanan yang Dipilih Sudah Disetujui!');
    }
    public function penyesuaian()
    {
        $jenis_sp = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SP @Kode = ?', [1]);
        $list_customer = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_ALL_CUSTOMER @Kode = ?', [1]);
        $list_sales = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SALES');
        $jenis_bayar = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_JNSBAYAR');
        $jenis_brg = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_JNSBRG');
        $kategori_utama = DB::connection('ConnPurchase')->select('exec SP_1273_PRG_KATEGORI_UTAMA');
        $list_satuan = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SATUAN');
        // $header_pesanan = DB::connection('sqlsrv2')->select('exec SP_1486_SLS_LIST_SP_SDH_ACC @IDSURATPESANAN = ?, @Kode = ?', [$suratPesanan, 1]);
        // $detail_pesanan = DB::connection('sqlsrv2')->select('exec SP_1486_SLS_LIST_SESUAI_SP @IDSURATPESANAN = ?, @Kode = ?', [$suratPesanan, 2]);
        $data_array = [
            $jenis_sp,
            $list_customer,
            $list_sales,
            $jenis_bayar,
            $jenis_brg,
            $kategori_utama,
            $list_satuan
        ];
        // dd($data_array);
        return view('Sales.Transaksi.SuratPesanan.Penyesuaian', compact('jenis_sp', 'list_customer', 'list_sales', 'jenis_bayar', 'jenis_brg', 'kategori_utama', 'list_satuan'));
    }

    public function getPenyesuaianSP($suratPesanan)
    {
        $header_pesanan = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SP_SDH_ACC @IDSURATPESANAN = ?, @Kode = ?', [$suratPesanan, 1]);
        $detail_pesanan = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SESUAI_SP @IDSURATPESANAN = ?, @Kode = ?', [$suratPesanan, 2]);
        $data_array = [$header_pesanan, $detail_pesanan];
        return response()->json($data_array);
    }

    public function koreksiPenyesuaianSP(Request $request)
    {
        // dd($request->all());
        $UraianPesanan = null;
        $Lunas = $request->barang6 ?? null;
        $user = Auth::user()->NomorUser;
        $tgl_pesan = $request->tgl_pesan;
        $jenis_sp = $request->jenis_sp;
        $IdCust = $request->list_customer;
        $no_po = $request->no_po;
        $no_sp = $request->no_spText;
        $tgl_po = $request->tgl_po;
        $no_pi = $request->no_pi;
        $list_sales = $request->list_sales;
        $mata_uang = $request->mata_uang;
        $jenis_bayar = $request->jenis_bayar;
        $syarat_bayar = $request->syarat_bayar;
        $faktur_pjk = $request->faktur_pjk ?? null;
        $keterangan = $request->keterangan ?? null;
        $barang0 = $request->barang0; //nama barang
        $KodeBarang = $request->barang1; //kode barang
        $IdJnsBarang = $request->barang28; //jenis barang
        $Qty = $request->barang3; //qty pesan
        $Satuan = $request->barang4; //satuan
        $HargaSatuan = $request->barang2; //harga satuan
        $TglRencanaKirim = $request->barang5; //rencana kirim
        // $statusLunas = $request->barang6; //status lunas
        $ppn = $request->barang7; //ppn
        $bkarung = $request->barang8; //berat karung
        $ikarung = $request->barang9; //index karung
        $hkarung = $request->barang10; //berat index karung
        $binner = $request->barang11; //berat inner
        $iinner = $request->barang12; //index inner
        $hinner = $request->barang13; //berat index inner
        $blami = $request->barang14; //berat lami
        $ilami = $request->barang15; //index lami
        $hlami = $request->barang16; //berat index lami
        $bkertas = $request->barang17; //berat kertas
        $ikertas = $request->barang18; //index kertas
        $hkertas = $request->barang19; //berat index kertas
        $hlain = $request->barang20; //biaya lain2
        $BeratStandart = $request->barang21; //berat standard total
        $htotal = $request->barang22; //total cost
        $bkarung2 = $request->barang23; //berat karung MTR
        $binner2 = $request->barang24; //berat inner MTR
        $blami2 = $request->barang25; //berat lami MTR
        $bkertas2 = $request->barang26; //berat kertas MTR
        $bs2 = $request->barang27; //berat standard total MTR
        $id_pesanan = $request->barang29; //id pesanan untuk di tabel detail pesanan
        $informasiTambahan = $request->barang30; //informasi tambahan
        $kode = 2;
        // dd($kode, $no_sp, $jenis_sp, $tgl_pesan, $IdCust, $no_po, $tgl_po, $no_pi, $jenis_bayar, $list_sales, $mata_uang, $syarat_bayar, $user, $keterangan, $faktur_pjk);
        // dd($BeratStandart, $bs2);
        //update header dulu yaa..

        DB::connection('ConnSales')->statement(
            'exec SP_5409_SLS_MAINT_HEADERPESANAN
        @Kode = ?,
        @IdSuratPesanan = ?,
        @IdJnsSuratPesanan = ?,
        @Tgl_Pesan = ?,
        @IdCust = ?,
        @No_PO = ?,
        @Tgl_PO = ?,
        @No_PI = ?,
        @IdPembayaran = ?,
        @IdSales = ?,
        @IdMataUang = ?,
        @SyaratBayar = ?,
        @User_id = ?,
        @Ket = ?,
        @JnsFakturPjk = ?',
            [$kode, $no_sp, $jenis_sp, $tgl_pesan, $IdCust, $no_po, $tgl_po, $no_pi, $jenis_bayar, $list_sales, $mata_uang, $syarat_bayar, $user, $keterangan, $faktur_pjk],
        );
        // dd($no_sp);
        for ($i = 0; $i < count($id_pesanan); $i++) {
            // dd($id_pesanan);
            if (is_null($id_pesanan[$i])) {
                // dd($id_pesanan[$i]);
                DB::connection('ConnSales')->statement(
                    'exec SP_1486_SLS_MAINT_DETAILPESANAN1 @Kode = ?,
                @IDSuratPesanan = ?,
                @KodeBarang = ?,
                @IdJnsBarang = ?,
                @Qty = ?,
                @Satuan = ?,
                @HargaSatuan = ?,
                @Discount = ?,
                @UraianPesanan = ?,
                @TglRencanaKirim = ?,
                @Lunas = ?,
                @PPN = ?,
                @ikarung = ?,
                @hkarung = ?,
                @iinner = ?,
                @hinner = ?,
                @ilami = ?,
                @hlami = ?,
                @ikertas = ?,
                @hkertas = ?,
                @hlain = ?,
                @htotal = ?',
                    [1, $no_sp, $KodeBarang[$i], $IdJnsBarang[$i], $Qty[$i], $Satuan[$i], $HargaSatuan[$i], 0.0, $UraianPesanan ?? null, $TglRencanaKirim[$i], $Lunas[$i] ?? null, $ppn[$i], $ikarung[$i], $hkarung[$i], $iinner[$i], $hinner[$i], $ilami[$i], $hlami[$i], $ikertas[$i], $hkertas[$i], $hlain[$i], $htotal[$i]],
                );
            } else {
                // dd($id_pesanan[$i]);
                DB::connection('ConnSales')->statement(
                    'exec SP_1486_SLS_MAINT_DETAILPESANAN1
                @Kode = ?,
                @IDPesanan = ?,
                @IDSuratPesanan = ?,
                @KodeBarang = ?,
                @IdJnsBarang = ?,
                @Qty = ?,
                @Satuan = ?,
                @HargaSatuan = ?,
                @Discount = ?,
                @UraianPesanan = ?,
                @TglRencanaKirim = ?,
                @Lunas = ?,
                @PPN = ?,
                @ikarung = ?,
                @hkarung = ?,
                @iinner = ?,
                @hinner = ?,
                @ilami = ?,
                @hlami = ?,
                @ikertas = ?,
                @hkertas = ?,
                @hlain = ?,
                @htotal = ?,
                @info = ?',
                    [4, $id_pesanan[$i], $no_sp, $KodeBarang[$i], $IdJnsBarang[$i], $Qty[$i], $Satuan[$i], $HargaSatuan[$i], 0.0, $UraianPesanan ?? null, $TglRencanaKirim[$i], $Lunas[$i] ?? null, $ppn[$i], $ikarung[$i], $hkarung[$i], $iinner[$i], $hinner[$i], $ilami[$i], $hlami[$i], $ikertas[$i], $hkertas[$i], $hlain[$i], $htotal[$i], $informasiTambahan[$i]],
                );
            }
            // dd(count($bkarung));
            //     //Simpan BS (Berat Standard)
            DB::connection('ConnPurchase')->statement(
                'exec SP_5409_SLS_UPDATE_BS
            @KodeBarang = ?,
            @bkarung = ?,
            @binner = ?,
            @blami = ?,
            @bkertas = ?,
            @BeratStandart = ?,
            @bkarung2 = ?,
            @binner2 = ?,
            @blami2 = ?,
            @bkertas2 = ?,
            @bs2 = ?,
            @UserId = ?',
                [$KodeBarang[$i], $bkarung2[$i], $binner2[$i], $blami2[$i], $bkertas2[$i], $bs2[$i], $bkarung[$i], $binner[$i], $blami[$i], $bkertas[$i], $BeratStandart[$i], $user],
            );
        }
        return redirect()->back()->with('success', 'Surat Pesanan ' . $no_sp . ' Sudah Disesuaikan!');
        //SP_1486_SLS_MAINT_HEADERPESANAN @kode = 2
        //SP_1486_SLS_MAINT_DETAILPESANAN1 @kode = 4
        //SP_5409_SLS_UPDATE_BS
    }

    public function batalspPenyesuaianSP(Request $request)
    {
        // dd($request->all());
        $date = date('m/d/Y', strtotime('now'));
        $do1 = db::connection('ConnSales')->select('SELECT COUNT(dbo.T_DeliveryOrder.IDDO)
					                                FROM         dbo.T_DeliveryOrder INNER JOIN
					                                                      dbo.T_DetailPesanan ON dbo.T_DeliveryOrder.IDPesanan = dbo.T_DetailPesanan.IDPesanan INNER JOIN
					                                                      dbo.vw_prg_barang ON dbo.T_DetailPesanan.IDBarang = dbo.vw_prg_barang.IDBarang
					                                WHERE     (dbo.T_DeliveryOrder.Dikeluarkan IS NOT NULL OR
					                                                dbo.T_DeliveryOrder.Dikeluarkan IS NULL) AND (dbo.T_DetailPesanan.IDSuratPesanan = \'' . $request->no_spText . '\')
						                                    AND (dbo.T_DeliveryOrder.KetBatal IS NULL)');

        $do2 = db::connection('ConnSales')->select('SELECT COUNT(T_DeliveryOrder.IDDO)
                                                    FROM         T_DeliveryOrder INNER JOIN
                                                                          T_DetailPesanan ON T_DeliveryOrder.IDPesanan = T_DetailPesanan.IDPesanan INNER JOIN
                                                                          VW_PRG_BARANG ON T_DetailPesanan.IDBarang = VW_PRG_BARANG.KodeBarang AND T_DeliveryOrder.IdType = VW_PRG_BARANG.IDBarang
                                                    WHERE     (T_DeliveryOrder.Dikeluarkan IS NOT NULL OR
                              T_DeliveryOrder.Dikeluarkan IS NULL) AND (LEN(T_DetailPesanan.IDBarang) = \'9\') AND (T_DeliveryOrder.KetBatal IS NULL)  AND (dbo.T_DetailPesanan.IDSuratPesanan = \'' . $request->no_spText . '\')');
        $formula = db::connection('ConnSales')->select('SELECT COUNT(*)
                                    FROM   T_FormulaSP_KITE
                                    GROUP BY NoSP
                                    HAVING (NoSP = \'' . $request->no_spText . '\')');
        // dd($do1[0]->{""}, $do2[0]->{""}, $formula);
        if ($do1[0]->{""} == 0 || $do2[0]->{""} == 0) {
            db::connection('ConnSales')->statement('UPDATE 	T_HEADERPESANAN
                                                            SET deleted = \'' . trim(Auth::user()->NomorUser) . '\' +\' - \'+ \'' . $date . '\'
                                                            WHERE IdSuratPesanan = \'' . $request->no_spText . '\'');
            if (!empty($formula)) {
                $pp = db::connection('ConnSales')->select('SELECT SUM(BahanPP) + SUM(AfalanPP)
                                                            FROM         T_FormulaSP_KITE
                                                            WHERE     (NoSP = \'' . $request->no_spText . '\')');
                $pe = db::connection('ConnSales')->select('SELECT SUM(BahanPE) + SUM(AfalanPE)
                                                            FROM         T_FormulaSP_KITE
                                                            WHERE     (NoSP = \'' . $request->no_spText . '\')');
                $mb = db::connection('ConnSales')->select('SELECT SUM(BahanMB) + SUM(AfalanMB)
                                                            FROM         T_FormulaSP_KITE
                                                            WHERE     (NoSP = \'' . $request->no_spText . '\')');
                db::connection('ConnInventory')->statement('UPDATE SaldoKITE
                                                            set SaldoPP = SaldoPP + ' . $pp . ',
                                                                SaldoPE = SaldoPE + ' . $pe . ',
                                                                SaldoMB = SaldoMB + ' . $mb . '');
                db::connection('ConnInventory')->statement('DELETE FROM T_FormulaSP_KITE
                                                            WHERE     (NoSP = \'' . $request->no_spText . '\')');
            }
            return redirect()->back()->with('success', 'Surat Pesanan ' . $request->no_spText . ' Sudah Dibatalkan!');
        } else {
            return redirect()->back()->with('error', 'Tidak Bisa Di Batalkan Karena Sudah Ada DO Yang Di ACC Maupun Permohonan DO!');
        }
    }
    public function updatePenyesuaian(Request $request)
    {
        dd($request->all());
        $UraianPesanan = null;
        $Lunas = null;
        $tgl_pesan = $request->tgl_pesan;
        $jenis_sp = $request->jenis_sp;
        $no_sp = $request->no_sp;
        $list_customer = $request->list_customer;
        $no_po = $request->no_po;
        $tgl_po = $request->tgl_po;
        $no_pi = $request->no_pi;
        $list_sales = $request->list_sales;
        $mata_uang = $request->mata_uang;
        $jenis_bayar = $request->jenis_bayar;
        $syarat_bayar = $request->syarat_bayar;
        $faktur_pjk = $request->faktur_pjk;
        $keterangan = $request->keterangan;
        $barang0 = $request->barang0;
        $KodeBarang = $request->barang1;
        $IdJnsBarang = $request->barang2;
        $Qty = $request->barang3;
        $Satuan = $request->barang4;
        $HargaSatuan = $request->barang5;
        $TglRencanaKirim = $request->barang6;
        $id_pesanan = $request->barang7;
        $ppn = $request->barang8;
        $bkarung = $request->barang9;
        $ikarung = $request->barang10;
        $hkarung = $request->barang11;
        $binner = $request->barang12;
        $iinner = $request->barang13;
        $hinner = $request->barang14;
        $blami = $request->barang15;
        $ilami = $request->barang16;
        $hlami = $request->barang17;
        $bkertas = $request->barang18;
        $ikertas = $request->barang19;
        $hkertas = $request->barang20;
        $hlain = $request->barang21;
        $BeratStandart = $request->barang22;
        $htotal = $request->barang23;
        $bkarung2 = $request->barang24;
        $binner2 = $request->barang25;
        $blami2 = $request->barang26;
        $bkertas2 = $request->barang27;
        $bs2 = $request->barang28;
        // dd($htotal);
        //maintenance header
        db::connection('ConnSales')->statement('exec SP_1486_SLS_MAINT_HEADERPESANAN @Kode = ?,
        @IdJnsSuratPesanan = ?,
        @IdSuratPesanan = ?,
        @Tgl_Pesan = ?,
        @IdCust = ?,
        @No_Po = ?,
        @Tgl_Po = ?,
        @No_PI = ?,
        @IDPembayaran = ?,
        @IDSales = ?,
        @IDMataUang = ?,
        @SyaratBayar = ?,
        @User_id = ?,
        @Ket = ?',
            [
                2,
                $jenis_sp,
                $no_sp,
                $tgl_pesan,
                $list_customer,
                $no_po,
                $tgl_po,
                $no_pi,
                $jenis_bayar,
                $list_sales,
                $mata_uang,
                $syarat_bayar,
                Auth::user()->NomorUser,
                $keterangan
            ]
        );

        //maintenance detail
        for ($i = 0; $i < count($barang0); $i++) {
            db::connection('ConnSales')->statement('exec SP_1486_SLS_MAINT_DETAILPESANAN1 @Kode = ?,
        @IDPesanan = ?,
        @IDSuratPesanan = ?,
        @KodeBarang = ?,
        @IdJnsBarang = ?,
        @Qty = ?,
        @Satuan = ?,
        @HargaSatuan = ?,
        @Discount = ?,
        @UraianPesanan = ?,
        @TglRencanaKirim = ?,
        @Lunas = ?,
        @Tawal = ?,
        @PPN = ?,
        @ikarung = ?,
        @hkarung = ?,
        @iinner = ?,
        @hinner = ?,
        @ilami = ?,
        @hlami = ?,
        @ikertas = ?,
        @hkertas = ?,
        @hlain = ?,
        @htotal = ?',
                [
                    4,
                    $id_pesanan[$i],
                    $no_sp,
                    $KodeBarang[$i],
                    $IdJnsBarang[$i],
                    $Qty[$i],
                    $Satuan[$i],
                    $HargaSatuan[$i],
                    0.0,
                    $UraianPesanan ?? null,
                    $TglRencanaKirim[$i],
                    $Lunas ?? null,
                    0,
                    $ppn[$i],
                    $ikarung[$i],
                    $hkarung[$i],
                    $iinner[$i],
                    $hinner[$i],
                    $ilami[$i],
                    $hlami[$i],
                    $ikertas[$i],
                    $hkertas[$i],
                    $hlain[$i],
                    $htotal[$i]
                ]
            );
        }
        return redirect()->back()->with('success', 'Surat Pesanan Sudah Disesuaikan!');
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
