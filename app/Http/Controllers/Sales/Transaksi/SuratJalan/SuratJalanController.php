<?php

namespace App\Http\Controllers\Sales\Transaksi\SuratJalan;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class SuratJalanController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $data = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_KIRIM_BLM_ACC');
        // dd($data);
        return view('Sales.Transaksi.SuratJalan.Index', compact('data'));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        $jenisPengiriman = db::connection('ConnSales')->select('exec SP_1486_SLS_LIST_JENIS_SJ');
        $customer = db::connection('ConnSales')->select('exec SP_1486_SLS_LIST_CUSTOMER_KIRIM');
        $expeditor = db::connection('ConnSales')->select('exec SP_1486_SLS_LIST_EXPEDITOR @Kode = ?', [1]);
        // dd($customer);
        return view('Sales.Transaksi.SuratJalan.Create', compact('jenisPengiriman', 'customer', 'expeditor'));
    }

    public function getSuratPesanan($customer)
    {
        $suratPesanan = db::connection('ConnSales')->select('exec SP_1486_SLS_LIST_SP_KIRIM @IdCust = ?', [$customer]);
        return response()->json($suratPesanan);
    }

    public function getDeliveryOrder($suratPesanan)
    {
        $deliveryOrder = db::connection('ConnSales')->select('exec SP_1486_SLS_LIST_DO_KIRIM @IdSP = ?', [$suratPesanan]);
        return response()->json($deliveryOrder);
    }
    public function getNomorSuratJalan(Request $request)
    {
        $suratJalan = db::connection('ConnSales')->select('exec SP_1486_SLS_LIST_KIRIM_BLM_ACC');
        return response()->json($suratJalan);
    }
    // Store a newly created resource in storage.
    public function store(Request $request)
    {
        // $data = $request->all();
        // dd($data);
        $Mytype = 1;
        $JnsIdPengiriman = $request->jenis_pengiriman;
        $IDPengiriman1 = $request->surat_jalan;
        $IDPengiriman = str_pad($IDPengiriman1, 10, '0', STR_PAD_LEFT);
        // dd($IDPengiriman);
        $IDExpeditor = $request->expeditor;
        $IdCust = $request->customer;
        $TrukNopol = $request->truk_nopol;
        $Tanggal = $request->tanggal;
        $Biaya = $request->biaya ?? 0;
        $StatusBiaya = 'N';
        $Keterangan = $request->keterangan;
        $NoContainer = NULL;
        $NoSeal = NULL;
        $TglActual = $request->tanggal_actual;
        $IdDO = $request->barang0;
        $IDSuratPesanan = $request->barang3;
        $AccMgr = Auth::user()->NomorUser;
        // dd($IdDO[0]);
        //save data header duluu
        db::connection('ConnSales')->statement(
            'exec SP_1486_SLS_MAINT_HEADERPENGIRIMAN @Mytype = ?,
        @JnsIdPengiriman = ?,
        @IDPengiriman = ?,
        @IDExpeditor = ?,
        @IdCust = ?,
        @TrukNopol = ?,
        @Tanggal = ?,
        @Biaya = ?,
        @StatusBiaya = ?,
        @Keterangan = ?,
        @NoContainer = ?,
        @NoSeal = ?,
        @TglActual = ?',
            [$Mytype, $JnsIdPengiriman, $IDPengiriman, $IDExpeditor, $IdCust, $TrukNopol, $Tanggal, $Biaya, $StatusBiaya, $Keterangan, $NoContainer, $NoSeal, $TglActual],
        );

        //kita cari Header kirim yang baru saja dibuat..
        $IDHeaderKirim = DB::connection('ConnSales')->select(
            'Select IdHeaderKirim
            from T_HeaderPengiriman
            where JnsIdPengiriman = ? and
            IDPengiriman = ? and
            IDExpeditor = ? and
            IDCust = ? and
            TrukNopol = ? and
            Tanggal = ? and
            Biaya = ? and
            StatusBiaya = ? and
            Ket = ? and
            TanggalActual = ?',
            [
                $JnsIdPengiriman,
                $IDPengiriman,
                $IDExpeditor,
                $IdCust,
                $TrukNopol,
                $Tanggal,
                $Biaya,
                $StatusBiaya,
                $Keterangan,
                $TglActual
            ]
        );
        dd($IDHeaderKirim, $IdDO, $IDSuratPesanan);
        //save data detail duluu

        for ($i = 0; $i < count($request->barang0); $i++) {
            db::connection('ConnSales')->statement(
                'exec SP_1486_SLS_MAINT_DETAILPENGIRIMAN @Mytype = ?,
            @IDHeaderKirim = ?,
            @IdDO = ?,
            @IDSuratPesanan = ?,
            @AccMgr = ?',
                [$Mytype, $IDHeaderKirim[0]->IdHeaderKirim , $IdDO[$i], $IDSuratPesanan[$i], $AccMgr],
            );
        }
        return redirect()->back()->with('success', 'Surat Jalan Sudah Dibuat!');
    }

    //Display the specified resource.
    public function show($id)
    {
        //
    }

    //Show the form for editing the specified resource.
    public function edit($id)
    {
        $jenisPengiriman = db::connection('ConnSales')->select('exec SP_1486_SLS_LIST_JENIS_SJ');
        $customer = db::connection('ConnSales')->select('exec SP_1486_SLS_LIST_CUSTOMER_KIRIM');
        $expeditor = db::connection('ConnSales')->select('exec SP_1486_SLS_LIST_EXPEDITOR @Kode = ?', [1]);
        $DisplayDataHeader = db::connection('ConnSales')->select('exec SP_1486_SLS_LIST_HEADER_PENGIRIMAN @IdPengiriman = ?', [$id]);
        // dd($DisplayDataHeader[0]->IdHeaderKirim);
        for ($i = 0; $i < count($DisplayDataHeader); $i++) {
            $IdHeaderKirim = $DisplayDataHeader[$i]->IdHeaderKirim;
            $DisplayDataDetail = db::connection('ConnSales')->select('exec SP_1486_SLS_LIST_DETAIL_PENGIRIMAN @IDHeaderKirim = ?', [$IdHeaderKirim]);
        }
        // dd($DisplayDataHeader);
        return view('Sales.Transaksi.SuratJalan.Edit', compact('jenisPengiriman', 'customer', 'expeditor', 'DisplayDataHeader', 'DisplayDataDetail'));
    }

    public function getCustomer($id)
    {
        $customer = db::connection('ConnSales')->select('Select * from T_Customer where IDCust = ?', [$id]);
        return response()->json($customer);
    }

    //Update the specified resource in storage.
    public function update(Request $request)
    {
        // dd($request->all());
        $Mytype = 1;
        $JnsIdPengiriman = $request->jenis_pengiriman;
        $IDPengiriman1 = $request->surat_jalan;
        $IDPengiriman = str_pad($IDPengiriman1, 10, '0', STR_PAD_LEFT);
        // dd($IDPengiriman);
        $IDExpeditor = $request->expeditor;
        $IdCust = $request->customer;
        $TrukNopol = $request->truk_nopol;
        $Tanggal = $request->tanggal;
        $Biaya = $request->biaya;
        $StatusBiaya = 'N';
        $Keterangan = $request->keterangan;
        $NoContainer = NULL;
        $NoSeal = NULL;
        $TglActual = $request->tanggal_actual;
        $IdDO = $request->barang0;
        $IDSuratPesanan = $request->barang3;
        $AccMgr = Auth::user()->NomorUser;
        //save data header duluu
        db::connection('ConnSales')->statement(
            'exec SP_1486_SLS_MAINT_HEADERPENGIRIMAN @Mytype = ?,
        @JnsIdPengiriman = ?,
        @IDPengiriman = ?,
        @IDExpeditor = ?,
        @IdCust = ?,
        @TrukNopol = ?,
        @Tanggal = ?,
        @Biaya = ?,
        @StatusBiaya = ?,
        @Keterangan = ?,
        @NoContainer = ?,
        @NoSeal = ?,
        @TglActual = ?',
            [$Mytype, $JnsIdPengiriman, $IDPengiriman, $IDExpeditor, $IdCust, $TrukNopol, $Tanggal, $Biaya, $StatusBiaya, $Keterangan, $NoContainer, $NoSeal, $TglActual],
        );

        //kita cari Header kirim yang baru saja dibuat..
        $IDHeaderKirim = DB::connection('ConnSales')->select(
            'Select IdHeaderKirim
            from T_HeaderPengiriman
            where JnsIdPengiriman = ? and
            IDPengiriman = ? and
            IDExpeditor = ? and
            IDCust = ? and
            TrukNopol = ? and
            Tanggal = ? and
            Biaya = ? and
            StatusBiaya = ? and
            Ket = ? and
            NoContainer = ? and
            NoSeal = ? and
            TanggalActual = ?',
            [
                $JnsIdPengiriman,
                $IDPengiriman,
                $IDExpeditor,
                $IdCust,
                $TrukNopol,
                $Tanggal,
                $Biaya,
                $StatusBiaya,
                $Keterangan,
                $NoContainer,
                $NoSeal,
                $TglActual
            ]
        );
        // dd($IDHeaderKirim);
        //save data detail duluu

        for ($i = 0; $i < count($request->barang0); $i++) {
            db::connection('ConnSales')->statement(
                'exec SP_1486_SLS_MAINT_DETAILPENGIRIMAN @Mytype = ?,
            @IDHeaderKirim = ?,
            @IdDO = ?,
            @IDSuratPesanan = ?,
            @AccMgr = ?',
                [$Mytype, $IDHeaderKirim[0]->IdHeaderKirim , $IdDO[$i], $IDSuratPesanan[$i], $AccMgr],
            );
        }
        return redirect()->back()->with('success', 'Surat Jalan Sudah Dikoreksi!');
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        // dd($id);
        db::connection('ConnSales')->statement('exec SP_1486_SLS_DEL_PENGIRIMAN @Mytype = ?, @IDHeaderKirim = ?', [1, $id]);
        return redirect()->back()->with('success', 'Surat Jalan ' + $id + ' Sudah Dihapus!');
    }
}
