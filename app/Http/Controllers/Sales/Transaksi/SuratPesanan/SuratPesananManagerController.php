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
        $list_customer = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_ALL_CUSTOMER');
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
    public function updatePenyesuaian(Request $request)
    {
        // dd($request->all());
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
