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
        $access = (new HakAksesController)->HakAksesFiturMaster('Sales');
        return view('Sales.Transaksi.SuratPesanan.IndexEkspor', compact('access'));
    }
    function spekspor(Request $request)
    {
        $columns = array(
            0 => 'IDSuratPesanan',
            1 => 'NamaCust',
            2 => 'Tgl_Pesan'
        );

        $totalData = DB::connection('ConnSales')
            ->table('T_HeaderPesanan')
            ->select('IDSuratPesanan', 'Tgl_Pesan', 'NamaCust')
            ->leftJoin('T_Customer', 'T_HeaderPesanan.IDCust', '=', 'T_Customer.IDCust')
            ->where('IDJnsSuratPesanan', '=', 3)
            ->whereNull('Deleted')
            ->orderBy('Tgl_Pesan', 'Desc')
            ->count();

        $totalFiltered = $totalData;

        $limit = $request->input('length');
        $start = $request->input('start');
        $order = $columns[$request->input('order.0.column')];
        $dir = $request->input('order.0.dir');

        if (empty($request->input('search.value'))) {
            $sp = DB::connection('ConnSales')
                ->table('T_HeaderPesanan')
                ->select('IDSuratPesanan', 'Tgl_Pesan', 'NamaCust')
                ->leftJoin('T_Customer', 'T_HeaderPesanan.IDCust', '=', 'T_Customer.IDCust')
                ->where('IDJnsSuratPesanan', '=', 3)
                ->whereNull('Deleted')
                ->offset($start)
                ->limit($limit)
                ->orderBy($order, $dir)
                ->get();
            // $posts = Post::offset($start)
            //     ->limit($limit)
            //     ->orderBy($order, $dir)
            //     ->get();
        } else {
            $search = $request->input('search.value');
            $sp = DB::connection('ConnSales')
                ->table('T_HeaderPesanan')
                ->select('IDSuratPesanan', 'Tgl_Pesan', 'NamaCust')
                ->leftJoin('T_Customer', 'T_HeaderPesanan.IDCust', '=', 'T_Customer.IDCust')
                ->where('IDJnsSuratPesanan', '=', 3)
                ->whereNull('Deleted')
                ->where('IDSuratPesanan', 'LIKE', "%{$search}%")
                ->orWhere('Tgl_Pesan', 'LIKE', "%{$search}%")
                ->orWhere('NamaCust', 'LIKE', "%{$search}%")
                ->offset($start)
                ->limit($limit)
                ->orderBy($order, $dir)
                ->get();

            $totalFiltered = DB::connection('ConnSales')
                ->table('T_HeaderPesanan')
                ->select('IDSuratPesanan', 'Tgl_Pesan', 'NamaCust')
                ->leftJoin('T_Customer', 'T_HeaderPesanan.IDCust', '=', 'T_Customer.IDCust')
                ->where('IDJnsSuratPesanan', '=', 3)
                ->whereNull('Deleted')
                ->where('IDSuratPesanan', 'LIKE', "%{$search}%")
                ->orWhere('Tgl_Pesan', 'LIKE', "%{$search}%")
                ->orWhere('NamaCust', 'LIKE', "%{$search}%")
                ->count();
        }

        $data = array();
        if (!empty($sp)) {
            foreach ($sp as $datasp) {
                $nestedData['IDSuratPesanan'] = $datasp->IDSuratPesanan;
                $nestedData['NamaCust'] = $datasp->NamaCust;
                $nestedData['Tgl_Pesan'] = $datasp->Tgl_Pesan;
                ;
                $data[] = $nestedData;

            }
        }

        $json_data = array(
            "draw" => intval($request->input('draw')),
            "recordsTotal" => intval($totalData),
            "recordsFiltered" => intval($totalFiltered),
            "data" => $data
        );
        // dd($sp);
        echo json_encode($json_data);
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
    function getDisplayBarangEkspor($idtype)
    {
        // $data = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_DETAIL_SP @IDBarang = ?, @Kode = ?', [$idtype, 2]);
        $data = DB::connection('ConnInventory')->table('VW_TYPE')->select('*')->where('IdType', '=', $idtype)->get();
        return response()->json($data);
    }
    function deleteDetailBarangEksport($idPesanan)
    {
        DB::connection('ConnSales')->statement('exec SP_1486_SLS_MAINT_DETAILPESANAN @Kode = ?, @IDPesanan = ?', [3, $idPesanan]);
        return response()->json("Id Pesanan " . $idPesanan . " sudah dihapus dari database!");
    }
    public function store(Request $request)
    {
        // dd($request->all(), "Masuk Store");
        $user = Auth::user()->NomorUser;
        $jenis_sp = 3;
        $tgl_pesan = $request->tgl_pesan;
        $no_sp = $request->no_spText;
        $no_po = $request->no_po ?? "";
        $tgl_po = $request->tgl_po;
        $no_pi = $request->no_pi ?? "";
        $jenis_hargaBarang = $request->jenis_harga;
        $mata_uang = $request->mata_uang;
        $id_customer = explode(" -", $request->customer);
        $id_sales = $request->sales;
        $id_billing = $request->billing;
        $cargo_ready = $request->cargo_ready ?? "";
        $destination_port = $request->destination_port ?? "";
        $payment_terms = $request->payment_terms ?? "";
        $remarks_quantity = $request->remarks_quantity ?? "";
        $remarks_packing = $request->remarks_packing ?? "";
        $remarks_price = $request->remarks_price ?? "";
        $keterangan =
            $cargo_ready . " | " .
            $payment_terms . " | " .
            $remarks_quantity . " | " .
            $remarks_packing . " | " .
            $remarks_price . " | " .
            $destination_port;
        $nama_barang = $request->barang0;
        $nama_jenisPesanan = $request->barang1;
        $harga_satuan = $request->barang2;
        $qty_pesan = $request->barang3;
        $satuan_jual = $request->barang4;
        $general_specification = $request->barang5;
        $keterangan_barang = $request->barang6;
        $size_code = $request->barang7;
        $rencana_kirim = $request->barang8;
        $ppn = $request->barang9;
        $id_jenisPesanan = $request->barang10;
        $kode_barang = $request->barang11;
        $id_type = $request->barang12;
        $id_pesanan = $request->barang13;
        $rencana_kirimCargoReady = $request->barang14;
        // Combine the individual arrays into a single array
        $combinedArray = [$general_specification, $keterangan_barang, $size_code, $rencana_kirimCargoReady];
        $uraian_pesanan = [];

        foreach ($combinedArray as $values) {
            foreach ($values as $index => $value) {
                if (!isset($uraian_pesanan[$index])) {
                    $uraian_pesanan[$index] = '';
                }
                $uraian_pesanan[$index] .= ($uraian_pesanan[$index] === '' ? '' : ' | ') . $value;
            }
        }

        $uraian_pesanan = array_values($uraian_pesanan); // Reindex the array to start from 0

        // dd($rencana_kirim);
        $Lunas = null;
        $jenis_bayar = 2;
        $syarat_bayar = 0;
        $faktur_pjk = null;
        $kode = 1;

        //maintenance header dulu yaw..
        DB::connection('ConnSales')->statement(
            'exec SP_1486_SLS_MAINT_HEADERPESANAN
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
        @IdBill = ?,
        @IdMataUang = ?,
        @SyaratBayar = ?,
        @User_id = ?,
        @Ket = ?,
        @JnsFakturPjk = ?,
        @JenisHargaBarang = ?',
            [$kode, $no_sp, 3, $tgl_pesan, $id_customer[1], $no_po, $tgl_po, $no_pi, $jenis_bayar, $id_sales, $id_billing, $mata_uang, $syarat_bayar, $user, $keterangan, $faktur_pjk, $jenis_hargaBarang],
        );

        // kemudian beralih ke maintenance detail pesanan nich...
        for ($i = 0; $i < count($kode_barang); $i++) {
            DB::connection('ConnSales')->statement(
                'exec SP_1486_SLS_MAINT_DETAILPESANAN @Kode = ?,
            @IDSuratPesanan = ?,
            @KodeBarang = ?,
            @IdBarang = ?,
            @IdJnsBarang = ?,
            @Qty = ?,
            @Satuan = ?,
            @HargaSatuan = ?,
            @Discount = ?,
            @UraianPesanan = ?,
            @TglRencanaKirim = ?,
            @Lunas = ?,
            @PPN = ?,
            @indek = ?',
                [$kode, $no_sp, $kode_barang[$i], $id_type[$i], $id_jenisPesanan[$i], $qty_pesan[$i], $satuan_jual[$i], $harga_satuan[$i], 0.0, $uraian_pesanan[$i], $rencana_kirim[$i], $Lunas ?? null, $ppn[$i], 0.00],
            );
        }
        return redirect()->back()->with('success', 'Surat Pesanan ' . $no_sp . ' Sudah Dibuat!');
    }

    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        $no_spValue = str_replace('.', '/', $id);
        $header_suratPesanan = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SP_BLM_ACC @IDSURATPESANAN = ?, @Kode = ?', [$no_spValue, 1]);
        $detail_suratPesanan = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_DETAIL_SP @IDSURATPESANAN = ?, @Kode = ?', [$no_spValue, 1]);
        $data = [$header_suratPesanan, $detail_suratPesanan];
        return response()->json($data);
    }

    public function update(Request $request, $id)
    {
        // dd($request->all(), $id, "Masuk Update");
        $no_spValue = str_replace('.', '/', $id);
        $user = Auth::user()->NomorUser;
        $jenis_sp = 3;
        $tgl_pesan = $request->tgl_pesan;
        $no_sp = $request->no_spText;
        $no_po = $request->no_po ?? "";
        $tgl_po = $request->tgl_po;
        $no_pi = $request->no_pi ?? "";
        $jenis_hargaBarang = $request->jenis_harga;
        $mata_uang = $request->mata_uang;
        $id_customer = explode(" -", $request->customer);
        $id_sales = $request->sales;
        $id_billing = $request->billing;
        $cargo_ready = $request->cargo_ready ?? "";
        $destination_port = $request->destination_port ?? "";
        $payment_terms = $request->payment_terms ?? "";
        $remarks_quantity = $request->remarks_quantity ?? "";
        $remarks_packing = $request->remarks_packing ?? "";
        $remarks_price = $request->remarks_price ?? "";
        $keterangan =
            $cargo_ready . " | " .
            $payment_terms . " | " .
            $remarks_quantity . " | " .
            $remarks_packing . " | " .
            $remarks_price . " | " .
            $destination_port;
        $nama_barang = $request->barang0;
        $nama_jenisPesanan = $request->barang1;
        $harga_satuan = $request->barang2;
        $qty_pesan = $request->barang3;
        $satuan_jual = $request->barang4;
        $general_specification = $request->barang5;
        $keterangan_barang = $request->barang6;
        $size_code = $request->barang7;
        $rencana_kirim = $request->barang8;
        $ppn = $request->barang9;
        $id_jenisPesanan = $request->barang10;
        $kode_barang = $request->barang11;
        $id_type = $request->barang12;
        $id_pesanan = $request->barang13;
        $rencana_kirimCargoReady = $request->barang14;
        // Combine the individual arrays into a single array
        $combinedArray = [$general_specification, $keterangan_barang, $size_code, $rencana_kirimCargoReady];
        $uraian_pesanan = [];

        foreach ($combinedArray as $values) {
            foreach ($values as $index => $value) {
                if (!isset($uraian_pesanan[$index])) {
                    $uraian_pesanan[$index] = '';
                }
                $uraian_pesanan[$index] .= ($uraian_pesanan[$index] === '' ? '' : ' | ') . $value;
            }
        }

        $uraian_pesanan = array_values($uraian_pesanan); // Reindex the array to start from 0

        // dd($rencana_kirim);
        $Lunas = null;
        $jenis_bayar = 2;
        $syarat_bayar = 0;
        $faktur_pjk = null;
        $kode = 2;

        //maintenance header dulu yaw..
        DB::connection('ConnSales')->statement(
            'exec SP_1486_SLS_MAINT_HEADERPESANAN
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
        @IdBill = ?,
        @IdMataUang = ?,
        @SyaratBayar = ?,
        @User_id = ?,
        @Ket = ?,
        @JnsFakturPjk = ?,
        @JenisHargaBarang = ?',
            [$kode, $no_sp, 3, $tgl_pesan, $id_customer[1], $no_po, $tgl_po, $no_pi, $jenis_bayar, $id_sales, $id_billing, $mata_uang, $syarat_bayar, $user, $keterangan, $faktur_pjk, $jenis_hargaBarang],
        );

        // kemudian beralih ke maintenance detail pesanan nich...
        for ($i = 0; $i < count($kode_barang); $i++) {
            if (is_null($id_pesanan[$i])) {
                DB::connection('ConnSales')->statement(
                    'exec SP_1486_SLS_MAINT_DETAILPESANAN @Kode = ?,
                @IDSuratPesanan = ?,
                @KodeBarang = ?,
                @IdBarang = ?,
                @IdJnsBarang = ?,
                @Qty = ?,
                @Satuan = ?,
                @HargaSatuan = ?,
                @Discount = ?,
                @UraianPesanan = ?,
                @TglRencanaKirim = ?,
                @Lunas = ?,
                @PPN = ?,
                @indek = ?',
                    [1, $no_sp, $kode_barang[$i], $id_type[$i], $id_jenisPesanan[$i], $qty_pesan[$i], $satuan_jual[$i], $harga_satuan[$i], 0.0, $uraian_pesanan[$i], $rencana_kirim[$i], $Lunas ?? null, $ppn[$i], 0.00],
                );
            } else {
                DB::connection('ConnSales')->statement(
                    'exec SP_1486_SLS_MAINT_DETAILPESANAN @Kode = ?,
                @IDSuratPesanan = ?,
                @IDPesanan = ?,
                @KodeBarang = ?,
                @IdBarang = ?,
                @IdJnsBarang = ?,
                @Qty = ?,
                @Satuan = ?,
                @HargaSatuan = ?,
                @Discount = ?,
                @UraianPesanan = ?,
                @TglRencanaKirim = ?,
                @Lunas = ?,
                @PPN = ?,
                @indek = ?',
                    [$kode, $no_sp, $id_pesanan[$i], $kode_barang[$i], $id_type[$i], $id_jenisPesanan[$i], $qty_pesan[$i], $satuan_jual[$i], $harga_satuan[$i], 0.0, $uraian_pesanan[$i], $rencana_kirim[$i], $Lunas ?? null, $ppn[$i], 0.00],
                );
            }

        }
        return redirect()->back()->with('success', 'Surat Pesanan ' . $no_sp . ' Sudah Diubah!');
    }

    public function destroy($id)
    {
        // dd($id, "Masuk Destroy");
        $no_spValue = str_replace('.', '/', $id);
        DB::connection('ConnSales')->statement('exec SP_1486_SLS_DEL_HEADER_DETAIL_PESANAN @IdSuratPesanan = ?', [$no_spValue]);
        return redirect()->back()->with('success', 'Surat Pesanan ' . $id . ' Sudah Dihapus!'); //->with(['success' => 'Data berhasil dihapus!']);
    }
}
