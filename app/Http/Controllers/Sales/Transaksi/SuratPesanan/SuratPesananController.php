<?php

namespace App\Http\Controllers\Sales\Transaksi\SuratPesanan;

use App\Models\Sales\SuratPesanan;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Collection;
use Yajra\Datatables\Datatables;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\HakAksesController;

class SuratPesananController extends Controller
{
    //Display data SP dengan parameter Belum ACC manager, AKTIF dan Belum LUNAS.
    public function index(Request $request)
    {
        // $search = $request->get('search');
        // $sort = $request->get('sort');
        // $order = $request->get('order') ?? 'desc';
        // $per_page = $request->get('per_page', 100);
        // $data = SuratPesanan::when($search, function ($query) use ($search) {
        //     return $query->where('IDSuratPesanan', 'like', "%$search%")
        //         ->orWhere('NamaCust', 'like', "%$search%")
        //         ->orWhere('JnsSuratPesanan', 'like', "%$search%")
        //         ->orWhere('Tgl_Pesan', 'like', "%$search%");
        //     })->when($sort, function ($query) use ($sort, $order) {
        //     return $query->orderBy($sort, 'desc');
        //     })->paginate($per_page)->withQueryString();

        // return view('Sales.Transaksi.SuratPesanan.Index', compact('data'));

        // $data = DB::connection('sqlsrv2')->select('exec SP_4384_WEB_LIST_SP_AKTIF_BELUM_LUNAS');
        // if ($request->ajax()) {
        //     $data = SuratPesanan::select('IDSuratPesanan', 'NamaCust', 'JnsSuratPesanan', 'Tgl_Pesan')->get();
        //     // return DataTables::of(DB::connection('sqlsrv2')->select('exec SP_4384_WEB_LIST_SP_AKTIF_BELUM_LUNAS'))->make(true);
        //     // return DataTables::of(SuratPesanan::get())->make(true);
        //     return Datatables::of($data)->addIndexColumn()
        //         ->addColumn('action', function($row){
        //             $btn = '<a href="javascript:void(0)" class="btn btn-primary btn-sm">View</a>';
        //             return $btn;
        //         })
        //         ->rawColumns(['action'])
        //         ->make(true);
        // }
        // return view('Sales.Transaksi.SuratPesanan.Index');

        $data = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SP_BLM_ACC');
        // $data = DB::connection('sqlsrv')->select('exec SP_1273_PRG_BARANG @NoSubKategori = \'?\', @Eksport = \'?\'', ['0391','N']);
        return view('Sales.Transaksi.SuratPesanan.Index', compact('data'));
    }
    // public function json(){
    //     $data = SuratPesanan::select('IDSuratPesanan', 'NamaCust', 'JnsSuratPesanan', 'Tgl_Pesan');
    //     return DataTables::of($data)->addIndexColumn()
    //     // return DataTables::of(DB::connection('sqlsrv2')->select('exec SP_4384_WEB_LIST_SP_AKTIF_BELUM_LUNAS'))->make(true);
    //     ->addColumn('action', function($row){
    //         $btn = '<a href="javascript:void(0)" class="btn btn-primary btn-sm">View</a>';
    //         return $btn;
    //     })
    //     ->rawColumns(['action'])
    //     ->make(true);
    // }

    //Show the form for creating a new resource.
    public function create(Request $request)
    {
        //
        // $header_pesanan = DB::connection('sqlsrv2')->select('exec SP_1486_SLS_LIST_SP_BLM_ACC @Kode = ?,
        //                                                     @IDSURATPESANAN = ?', [1, $id]);
        // $detail_pesanan = DB::connection('sqlsrv2')->select('exec SP_1486_SLS_LIST_DETAIL_SP @Kode = ?,
        //                                                     @IDSURATPESANAN = ?', [5, $id]);
        $jenis_sp = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SP @Kode = ?', [1]);
        $list_customer = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_ALL_CUSTOMER @Kode = ?', [1]);
        // dd($list_customer);
        $list_sales = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SALES');
        $jenis_bayar = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_JNSBAYAR');
        $jenis_brg = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_JNSBRG');
        $kategori_utama = DB::connection('ConnPurchase')->select('exec SP_1273_PRG_KATEGORI_UTAMA');
        $list_satuan = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SATUAN');
        $list_sp = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SP_BLM_ACC');
        $access = (new HakAksesController)->HakAksesFiturMaster('Sales');
        // dd($list_sp);
        return view('Sales.Transaksi.SuratPesanan.Create', compact('access', 'jenis_sp', 'list_customer', 'list_sales', 'jenis_bayar', 'jenis_brg', 'kategori_utama', 'list_satuan', 'list_sp'));
    }

    public function getKategori($kategoriUtama)
    {
        $secondOptions = DB::connection('ConnPurchase')->select('exec SP_1273_PRG_KATEGORI @NoKatUtama = ?', [$kategoriUtama]);
        // Return the options as JSON data
        return response()->json($secondOptions);
    }

    public function getSubKategori($kategori)
    {
        $thirdOptions = DB::connection('ConnPurchase')->select('exec SP_1273_PRG_SUB_KATEGORI @NoKategori = ?', [$kategori]);
        // dd($thirdOptions);
        // Return the options as JSON data
        return response()->json($thirdOptions);
    }

    public function getNamaBarang($subKategori)
    {
        // dd($subKategori);
        $fourthOptions = DB::connection('ConnPurchase')->select('exec SP_1273_PRG_BARANG @NoSubKategori = ?, @Eksport = ?', [$subKategori, 'N']);
        // dd($fourthOptions);
        return response()->json($fourthOptions);
    }

    public function getNamaBarangExport($subKategori)
    {
        // dd($subKategori);
        $fourthOptions = DB::connection('ConnPurchase')->select('exec SP_1273_PRG_BARANG @NoSubKategori = ?, @Eksport = ?', [$subKategori, 'Y']);
        // dd($fourthOptions);
        return response()->json($fourthOptions);
    }

    public function getSatuanBarang($kode_barang)
    {
        // dd($kode_barang);
        $data = DB::connection('ConnPurchase')->select('exec SP_1273_PRG_SATUAN_BARANG @KodeBarang = ?', [$kode_barang]);
        // dd($data);
        return response()->json($data);
    }

    public function getSatuanBarang1($kode_barang)
    {
        // dd($kode_barang);
        $data = DB::connection('ConnPurchase')->select('exec SP_1273_PRG_SATUAN_BARANG1 @KodeBarang = ?', [$kode_barang]);
        // dd($data);
        return response()->json($data);
    }

    public function getBeratStandard($kode_barang)
    {
        // dd($kode_barang);
        $data = DB::connection('ConnPurchase')->select('exec SP_1273_SLS_CEK_BERAT_STANDART @kd = ?, @KodeBarang = ?', [1, $kode_barang]);
        // dd($data);
        return response()->json($data);
    }

    public function getListSatuan()
    {
        $list_satuan = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SATUAN');

        return response($list_satuan);
    }

    public function getDisplayBarang($kode_barang)
    {
        $data = DB::connection('ConnPurchase')->select('exec SP_1273_PRG_DETAIL_BARANG @KodeBarang = ?', [$kode_barang]);

        return response()->json($data);
    }

    public function getSaldoInventory($kode_barang)
    {
        $data = db::connection('ConnInventory')->select('exec SP_1003_INV_LIST_TYPE @KodeBarang = ?, @Kode = ?', [$kode_barang, 10]);

        return response()->json($data);
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        //SP_5409_SLS_MAINT_HEADERPESANAN
        //SP_1486_SLS_MAINT_DETAILPESANAN1
        // $data = $request->all();
        // dd($data);
        $UraianPesanan = null;
        $Lunas = null;
        $user = Auth::user()->NomorUser;
        $tgl_pesan = $request->tgl_pesan;
        $jenis_sp = $request->jenis_sp;
        $IdCust = $request->list_customer;
        $no_po = $request->no_po ?? "";
        // $no_sp = $request->no_sp;
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
        //kita cari nomor SP yang baru saja dibuat..
        // dd($no_pi == null);
        // if ($no_pi == null) {
        //     $no_sp = DB::connection('ConnSales')->select(
        //         'Select IDSuratPesanan
        //                                                 from T_HeaderPesanan
        //                                                 where IDJnsSuratPesanan = ? and
        //                                                 Tgl_Pesan = ? and
        //                                                 IDCust = ? and
        //                                                 NO_PI IS NULL and
        //                                                 NO_PO = ? and
        //                                                 Tgl_PO = ? and
        //                                                 IDSales = ? and
        //                                                 Ket = ?',
        //         [$jenis_sp, $tgl_pesan, $IdCust, $no_po, $tgl_po, $list_sales, $keterangan],
        //     );
        // }
        // elseif ($no_pi !== null ) {
        // dd($jenis_sp, $tgl_pesan, $IdCust, $no_pi, $no_po, $tgl_po, $list_sales, $keterangan);
        $no_sp = DB::connection('ConnSales')->table('T_HeaderPesanan')
        ->select('IDSuratPesanan')
        ->where('IDJnsSuratPesanan', '=', $jenis_sp)
        ->where('Tgl_Pesan', '=', $tgl_pesan)
        ->where('IDCust', '=', $IdCust)
        ->where('NO_PI', '=', $no_pi)
        ->where('NO_PO', '=', $no_po)
        ->where('Tgl_PO', '=', $tgl_po)
        ->where('IDSales', '=', $list_sales)
        ->where('Ket', '=', $keterangan)
        ->get();

        // $no_sp = DB::connection('ConnSales')->select(
        //     'Select IDSuratPesanan
        //                                                 from T_HeaderPesanan
        //                                                 where IDJnsSuratPesanan = ? and
        //                                                 Tgl_Pesan = ? and
        //                                                 IDCust = ? and
        //                                                 NO_PI = ? and
        //                                                 NO_PO = ? and
        //                                                 Tgl_PO = ? and
        //                                                 IDSales = ? and
        //                                                 Ket = ?',
        //     [$jenis_sp, $tgl_pesan, $IdCust, $no_pi, $no_po, $tgl_po, $list_sales, $keterangan],
        // );
        // }

        // dd($no_sp);
        // dd($kode, $no_sp, $KodeBarang, $IdJnsBarang, $Qty, $Satuan, $HargaSatuan, 0.0, $UraianPesanan ?? null, $TglRencanaKirim, $Lunas ?? null, $ppn, $ikarung, $hkarung, $iinner, $hinner, $ilami, $hlami, $ikertas, $hkertas, $hlain, $htotal);

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
                [$kode, $no_sp[0]->IDSuratPesanan, $KodeBarang[$i], $IdJnsBarang[$i], $Qty[$i], $Satuan[$i], $HargaSatuan[$i], 0.0, $UraianPesanan ?? null, $TglRencanaKirim[$i], $Lunas ?? null, $ppn[$i], $ikarung[$i], $hkarung[$i], $iinner[$i], $hinner[$i], $ilami[$i], $hlami[$i], $ikertas[$i], $hkertas[$i], $hlain[$i], $htotal[$i]],
            );
            //Simpan BS Berat Standard
            // dd($KodeBarang[$i], $bkarung[$i], $binner[$i], $blami[$i], $bkertas[$i], $BeratStandart[$i], $user);
            DB::connection('ConnPurchase')->statement(
                'exec SP_5409_SLS_UPDATE_BS
            @KodeBarang = ?,
            @bkarung2 = ?,
            @binner2 = ?,
            @blami2 = ?,
            @bkertas2 = ?,
            @bs2 = ?,
            @UserId = ?',
                [$KodeBarang[$i], $bkarung[$i], $binner[$i], $blami[$i], $bkertas[$i], $BeratStandart[$i], $user],
            );
        }
        return redirect()->back()->with('success', 'Surat Pesanan ' . $no_sp[0]->IDSuratPesanan . ' Sudah Dibuat!');
        // echo "<script type='text/javascript'>alert('Data Berhasil disimpan') ;</script>";
        // echo "<script type='text/javascript'>window.close();</script>";
    }
    //Display the specified resource.
    public function show(SuratPesanan $suratPesanan)
    {
        //
    }

    //Show the form for editing the specified resource.
    public function edit($id)
    {
        $header_pesanan = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SP_BLM_ACC @IDSURATPESANAN = ?, @Kode = ?', [$id, 1]);
        $detail_pesanan = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_DETAIL_SP @IDSURATPESANAN = ?, @Kode = ?', [$id, 5]);

        $data = [$header_pesanan, $detail_pesanan];
        return response()->json($data);
        // return view('Sales.Transaksi.SuratPesanan.Edit', compact('header_pesanan', 'detail_pesanan', 'id', 'jenis_sp', 'list_customer', 'list_sales', 'jenis_bayar', 'jenis_brg', 'kategori_utama', 'list_satuan'));
    }

    public function deleteDetailPesanan($idPesanan)
    {
        DB::connection('ConnSales')->statement('exec SP_1486_SLS_MAINT_DETAILPESANAN @Kode = ?, @IDPesanan = ?', [3, $idPesanan]);

        return response()->json("Data sudah terhapus dari database!");
    }

    //Update the specified resource in storage.
    public function update(Request $request)
    {
        // $data = $request->all();
        // dd($request->all());

        $UraianPesanan = null;
        $Lunas = null;
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
        $syarat_bayar = $request->syarat_bayar ?? 0;
        $faktur_pjk = $request->faktur_pjk ?? null;
        $keterangan = $request->keterangan ?? "";
        $barang0 = $request->barang0; //nama barang
        $KodeBarang = $request->barang1; //kode barang
        $IdJnsBarang = $request->barang27; //jenis barang
        $Qty = $request->barang3; //qty pesan
        $Satuan = $request->barang4; //satuan
        $HargaSatuan = $request->barang2; //harga satuan
        $TglRencanaKirim = $request->barang5; //rencana kirim
        $id_pesanan = $request->barang28; //idsuratpesanan
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
        // $id_pesanan = $request->barang29; //id pesanan untuk di tabel detail pesanan
        $kode = 2;
        // dd($kode, $no_sp, $jenis_sp, $tgl_pesan, $IdCust, $no_po, $tgl_po, $no_pi, $jenis_bayar, $list_sales, $mata_uang, $syarat_bayar, $user, $keterangan, $faktur_pjk);
        // dd($no_sp);
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
                    [1, $no_sp, $KodeBarang[$i], $IdJnsBarang[$i], $Qty[$i], $Satuan[$i], $HargaSatuan[$i], 0.0, $UraianPesanan ?? null, $TglRencanaKirim[$i], $Lunas ?? null, $ppn[$i], $ikarung[$i], $hkarung[$i], $iinner[$i], $hinner[$i], $ilami[$i], $hlami[$i], $ikertas[$i], $hkertas[$i], $hlain[$i], $htotal[$i]],
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
                @htotal = ?',
                    [$kode, $id_pesanan[$i], $no_sp, $KodeBarang[$i], $IdJnsBarang[$i], $Qty[$i], $Satuan[$i], $HargaSatuan[$i], 0.0, $UraianPesanan ?? null, $TglRencanaKirim[$i], $Lunas ?? null, $ppn[$i], $ikarung[$i], $hkarung[$i], $iinner[$i], $hinner[$i], $ilami[$i], $hlami[$i], $ikertas[$i], $hkertas[$i], $hlain[$i], $htotal[$i]],
                );
            }
            // dd(count($bkarung));
            //     //Simpan BS (Berat Standard)

            DB::connection('ConnPurchase')->statement(
                'exec SP_5409_SLS_UPDATE_BS
            @KodeBarang = ?,
            @bkarung2 = ?,
            @binner2 = ?,
            @blami2 = ?,
            @bkertas2 = ?,
            @bs2 = ?,
            @UserId = ?',
                [$KodeBarang[$i], $bkarung[$i], $binner[$i], $blami[$i], $bkertas[$i], $BeratStandart[$i], $user],
            );
        }
        return redirect()->back()->with('success', 'Surat Pesanan ' . $no_sp . ' Sudah Diubah!');
        // echo "<script type='text/javascript'>alert('Data Berhasil diubah') ;</script>";
        // echo "<script type='text/javascript'>window.close();</script>";
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        // dd($id);
        DB::connection('ConnSales')->statement('exec SP_1486_SLS_DEL_HEADER_DETAIL_PESANAN @IdSuratPesanan = ?', [$id]);
        return redirect()->back()->with('success', 'Surat Pesanan ' . $id . ' Sudah Dihapus!'); //->with(['success' => 'Data berhasil dihapus!']);
    }

    // public function accdirektur($id)
// {
//     DB::connection('ConnPurchase2')->statement('exec SP_1486_SLS_ACC_SURATPESANAN @AccManager = ?, @IdSuratPesanan = ?', [Auth::user()->NomorUser, $id]);
//     return redirect()->route('SuratPesanan.index');
// }
}
