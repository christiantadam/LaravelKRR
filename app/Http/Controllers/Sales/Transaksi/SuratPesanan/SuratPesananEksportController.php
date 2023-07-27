<?php

namespace App\Http\Controllers\Sales\Transaksi\SuratPesanan;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Auth;
use App\Http\Controllers\HakAksesController;


class SuratPesananEksportController extends Controller
{
    public function index()
    {
        //
    }

    public function create()
    {
        //ga dipake
        // $jenis_sp = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SP @Kode = ?', [1]);
        // $jenis_bayar = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_JNSBAYAR');

        //dipake
        $list_sp = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SP_BLM_ACC');
        $mata_uang = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_MATAUANG');
        $jenis_harga = DB::connection('ConnSales')->table('T_JenisHargaBarangEksport')->select('*')->get();
        $list_billing = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_BILLING');
        $list_customer = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_ALL_CUSTOMER @Kode = ?', [1]);
        $list_sales = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SALES');
        $jenis_brg = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_JNSBRG');
        $kelompok_utama = DB::connection('ConnInventory')->select('exec SP_1486_SLS_LIST_TYPEBARANG');
        $list_satuan = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SATUAN');
        $access = (new HakAksesController)->HakAksesFiturMaster('Sales');
        // dd($kelompok_utama);
        return view('Sales.Transaksi.SuratPesanan.CreateEkspor', compact('access', 'mata_uang', 'list_customer', 'list_sales', 'jenis_brg', 'kelompok_utama', 'list_satuan', 'list_sp', 'jenis_harga', 'list_billing'));
    }
    public function getKelompok($kelompokUtama)
    {
        $secondOptions = DB::connection('ConnInventory')->select('exec SP_1486_SLS_LIST_KELOMPOK @idKelUt = ?', [$kelompokUtama]);
        // Return the options as JSON data
        return response()->json($secondOptions);
    }
    public function getSubKelompok($kelompok)
    {
        $thirdOptions = DB::connection('ConnInventory')->select('exec SP_1486_SLS_LIST_SUBKEL @idKel = ?', [$kelompok]);
        // dd($thirdOptions);
        // Return the options as JSON data
        return response()->json($thirdOptions);
    }
    public function getNamaBarang($subKelompok)
    {
        // dd($subKategori);
        $fourthOptions = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_BARANG @idCorak = ?', [$subKelompok]);
        // dd($fourthOptions);
        return response()->json($fourthOptions);
    }
    function cekNoSP($no_sp)
    {
        $no_spValue = str_replace('.', '/', $no_sp);
        $cek_sp = DB::connection('ConnSales')->select('exec SP_1486_SLS_CEK_NO_SP @IdSuratPesanan = ?', [$no_spValue]);
        return response()->json($cek_sp);
    }
    function isiSatuanInv($idtype)
    {
        $satuan = DB::connection('ConnInventory')->select('exec SP_1486_SLS_LIST_TYPE @Kode = ?, @IdType = ?', [1, $idtype]);
        return response()->json($satuan);
    }
    public function store(Request $request)
    {
        dd($request->all(), "Masuk Store");
        $UraianPesanan = null;
        $Lunas = null;
        $user = Auth::user()->NomorUser;
        $tgl_pesan = $request->tgl_pesan;
        $jenis_sp = $request->jenis_sp;
        $IdCust = $request->list_customer;
        $no_po = $request->no_po ?? "";
        $no_sp = $request->no_sp;
        $tgl_po = $request->tgl_po;
        $no_pi = $request->no_pi ?? "";
        $list_sales = $request->list_sales;
        $mata_uang = $request->mata_uang;
        $jenis_bayar = $request->jenis_bayar;
        $syarat_bayar = $request->syarat_bayar ?? 0;
        $faktur_pjk = $request->faktur_pjk ?? null;
        $keterangan = $request->keterangan ?? null;
        $barang0 = $request->barang0; //nama barang
        $KodeBarang = $request->barang1; //kode barang
        $IdJnsBarang = $request->barang27; //jenis barang
        $Qty = $request->barang3; //qty pesan
        $Satuan = $request->barang4; //satuan
        $HargaSatuan = $request->barang2; //harga satuan
        $TglRencanaKirim = $request->barang5; //rencana kirim
        $IdSuratPesanan = $request->barang28; //idsuratpesanan
        $ppn = $request->barang6; //ppn
        $bkarung = $request->barang7; //berat karung
        $ikarung = $request->barang8; //index karung
        $hkarung = $request->barang9; //berat index karung
        $binner = $request->barang10; //berat inner
        $iinner = $request->barang11; //index inner
        $hinner = $request->barang12; //berat index inner
        $blami = $request->barang13; //berat lami
        $ilami = $request->barang14; //index lami
        $hlami = $request->barang15; //berat index lami
        $bkertas = $request->barang16; //berat kertas
        $ikertas = $request->barang17; //index kertas
        $hkertas = $request->barang18; //berat index kertas
        $hlain = $request->barang19; //biaya lain2
        $BeratStandart = $request->barang20; //berat standard total
        $htotal = $request->barang21; //total cost
        $bkarung2 = $request->barang22; //berat karung MTR
        $binner2 = $request->barang23; //berat inner MTR
        $blami2 = $request->barang24; //berat lami MTR
        $bkertas2 = $request->barang25; //berat kertas MTR
        $bs2 = $request->barang26; //berat standard total MTR
        $kode = 1;

        //maintenance header dulu yaw..
        DB::connection('ConnSales')->statement(
            'exec SP_5409_SLS_MAINT_HEADERPESANAN
        @Kode = ?,
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
            [$kode, $jenis_sp, $tgl_pesan, $IdCust, $no_po, $tgl_po, $no_pi, $jenis_bayar, $list_sales, $mata_uang, $syarat_bayar, $user, $keterangan, $faktur_pjk],
        );

        // kemudian beralih ke maintenance detail pesanan nich...
        for ($i = 0; $i < count($bkarung); $i++) {
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
            @indek = ?,
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
                [$kode, $no_sp, $KodeBarang[$i], $IdJnsBarang[$i], $Qty[$i], $Satuan[$i], $HargaSatuan[$i], 0.0, $UraianPesanan ?? null, $TglRencanaKirim[$i], $Lunas ?? null, $ppn[$i], 0.00, $ikarung[$i], $hkarung[$i], $iinner[$i], $hinner[$i], $ilami[$i], $hlami[$i], $ikertas[$i], $hkertas[$i], $hlain[$i], $htotal[$i]],
            );
            //Simpan BS Berat Standard
            // dd($KodeBarang[$i], $bkarung[$i], $binner[$i], $blami[$i], $bkertas[$i], $BeratStandart[$i], $user);
            DB::connection('ConnPurchase')->statement(
                'exec SP_5409_SLS_UPDATE_BS
            @KodeBarang = ?,
            @bkarung = ?,
            @binner = ?,
            @blami = ?,
            @bkertas = ?,
            @BeratStandart= ?,
            @UserId = ?',
                [$KodeBarang[$i], $bkarung[$i], $binner[$i], $blami[$i], $bkertas[$i], $BeratStandart[$i], $user],
            );
        }
        return redirect()->back()->with('success', 'Surat Pesanan ' . $no_sp->IDSuratPesanan . ' Sudah Dibuat!');
    }

    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        dd("Masuk Update");
    }

    public function destroy($id)
    {
        dd("Masuk Destroy");
    }
}
