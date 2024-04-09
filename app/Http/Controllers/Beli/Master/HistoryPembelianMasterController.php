<?php
namespace APP\Http\Controllers\Beli\Master;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use DB;

class HistoryPembelianMasterController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        $result = (new HakAksesController)->HakAksesFitur('History Pembelian Master');
        if ($result > 0) {
            return view('Beli.Master.HistoryPembelian', compact('access'));
        } else {
            abort(404);
        }
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }
    public function redisplay(Request $request)
    {
        $nm_brg = $request->input('nm_brg');
        $kd = 1;
        $req = $request->input('req');
        $sup = $request->input('sup');
        $kdbrg = $request->input('kdbrg');
        if (($nm_brg != null) || ($req != null) || ($sup != null) || ($kdbrg != null)) {
            try {
                if ($nm_brg != null) {
                    $redisplay = DB::connection('ConnPurchase')->table('YTRANSBL')->select(
                        'STATUS_ORDER.Status',
                        'YTRANSBL.NO_PO',
                        'YTRANSBL.Tgl_sppb',
                        'YTRANSBL.Kd_div',
                        'YTRANSBL.Kd_brg',
                        'YTRANSBL.Tgl_order',
                        'YTRANSBL.PriceUnit',
                        'YTRANSBL.Qty',
                        'Y_BARANG.NAMA_BRG',
                        'YSATUAN.Nama_satuan',
                        'YSUPPLIER.NM_SUP',
                        'YSUPPLIER.KOTA1',
                        'YSUPPLIER.NEGARA1',
                        'YTERIMA.Hrg_trm',
                        'ACCOUNTING.dbo.T_MATAUANG.Id_MataUang_BC',
                        'YUSER.Nama',
                        'YTERIMA.No_trans',
                    )
                        ->join('Y_BARANG', 'YTRANSBL.Kd_brg', '=', 'Y_BARANG.KD_BRG')
                        ->join('YTERIMA', 'YTRANSBL.No_trans', '=', 'YTERIMA.No_trans')
                        ->join('YSATUAN', 'YTRANSBL.NoSatuan', '=', 'YSATUAN.No_satuan')
                        ->join('ACCOUNTING.dbo.T_MATAUANG', 'YTERIMA.IdMataUang', '=', 'ACCOUNTING.dbo.T_MATAUANG.Id_MataUang')
                        ->join('YUSER', 'YTRANSBL.Operator', '=', 'YUSER.kd_user')
                        ->join('YSUPPLIER', 'YTERIMA.No_sup', '=', 'YSUPPLIER.NO_SUP')
                        ->join('STATUS_ORDER', 'YTRANSBL.StatusOrder', '=', 'STATUS_ORDER.KdStatus')
                        ->where('Y_BARANG.NAMA_BRG', 'like', '%' . $nm_brg . '%')
                        ->orderBy('YTRANSBL.Tgl_order')
                        ->get();
                } else if ($req != null) {
                    $redisplay = DB::connection('ConnPurchase')->table('YTRANSBL')->select(
                        'STATUS_ORDER.Status',
                        'YTRANSBL.NO_PO',
                        'YTRANSBL.Tgl_sppb',
                        'YTRANSBL.Kd_div',
                        'YTRANSBL.Kd_brg',
                        'YTRANSBL.Tgl_order',
                        'YTRANSBL.PriceUnit',
                        'YTRANSBL.Qty',
                        'Y_BARANG.NAMA_BRG',
                        'YSATUAN.Nama_satuan',
                        'YSUPPLIER.NM_SUP',
                        'YSUPPLIER.KOTA1',
                        'YSUPPLIER.NEGARA1',
                        'YTERIMA.Hrg_trm',
                        'ACCOUNTING.dbo.T_MATAUANG.Id_MataUang_BC',
                        'YUSER.Nama',
                        'YTERIMA.No_trans',
                    )
                        ->join('Y_BARANG', 'YTRANSBL.Kd_brg', '=', 'Y_BARANG.KD_BRG')
                        ->join('YTERIMA', 'YTRANSBL.No_trans', '=', 'YTERIMA.No_trans')
                        ->join('YSATUAN', 'YTRANSBL.NoSatuan', '=', 'YSATUAN.No_satuan')
                        ->join('ACCOUNTING.dbo.T_MATAUANG', 'YTERIMA.IdMataUang', '=', 'ACCOUNTING.dbo.T_MATAUANG.Id_MataUang')
                        ->join('YUSER', 'YTRANSBL.Operator', '=', 'YUSER.kd_user')
                        ->join('YSUPPLIER', 'YTERIMA.No_sup', '=', 'YSUPPLIER.NO_SUP')
                        ->join('STATUS_ORDER', 'YTRANSBL.StatusOrder', '=', 'STATUS_ORDER.KdStatus')
                        ->where('YUSER.Nama', 'like', '%' . $req . '%')
                        ->orderBy('YTRANSBL.Tgl_order')
                        ->get();
                } else if ($sup != null) {
                    $redisplay = DB::connection('ConnPurchase')->table('YTRANSBL')->select(
                        'STATUS_ORDER.Status',
                        'YTRANSBL.NO_PO',
                        'YTRANSBL.Tgl_sppb',
                        'YTRANSBL.Kd_div',
                        'YTRANSBL.Kd_brg',
                        'YTRANSBL.Tgl_order',
                        'YTRANSBL.PriceUnit',
                        'YTRANSBL.Qty',
                        'Y_BARANG.NAMA_BRG',
                        'YSATUAN.Nama_satuan',
                        'YSUPPLIER.NM_SUP',
                        'YSUPPLIER.KOTA1',
                        'YSUPPLIER.NEGARA1',
                        'YTERIMA.Hrg_trm',
                        'ACCOUNTING.dbo.T_MATAUANG.Id_MataUang_BC',
                        'YUSER.Nama',
                        'YTERIMA.No_trans',
                    )
                        ->join('Y_BARANG', 'YTRANSBL.Kd_brg', '=', 'Y_BARANG.KD_BRG')
                        ->join('YTERIMA', 'YTRANSBL.No_trans', '=', 'YTERIMA.No_trans')
                        ->join('YSATUAN', 'YTRANSBL.NoSatuan', '=', 'YSATUAN.No_satuan')
                        ->join('ACCOUNTING.dbo.T_MATAUANG', 'YTERIMA.IdMataUang', '=', 'ACCOUNTING.dbo.T_MATAUANG.Id_MataUang')
                        ->join('YUSER', 'YTRANSBL.Operator', '=', 'YUSER.kd_user')
                        ->join('YSUPPLIER', 'YTERIMA.No_sup', '=', 'YSUPPLIER.NO_SUP')
                        ->join('STATUS_ORDER', 'YTRANSBL.StatusOrder', '=', 'STATUS_ORDER.KdStatus')
                        ->where('YSUPPLIER.NM_SUP', 'like', '%' . $sup . '%')
                        ->orderBy('YTRANSBL.Tgl_order')
                        ->get();
                } else if ($kdbrg != null) {
                    $redisplay = DB::connection('ConnPurchase')->table('YTRANSBL')->select(
                        'STATUS_ORDER.Status',
                        'YTRANSBL.NO_PO',
                        'YTRANSBL.Tgl_sppb',
                        'YTRANSBL.Kd_div',
                        'YTRANSBL.Kd_brg',
                        'YTRANSBL.Tgl_order',
                        'YTRANSBL.PriceUnit',
                        'YTRANSBL.Qty',
                        'Y_BARANG.NAMA_BRG',
                        'YSATUAN.Nama_satuan',
                        'YSUPPLIER.NM_SUP',
                        'YSUPPLIER.KOTA1',
                        'YSUPPLIER.NEGARA1',
                        'YTERIMA.Hrg_trm',
                        'ACCOUNTING.dbo.T_MATAUANG.Id_MataUang_BC',
                        'YUSER.Nama',
                        'YTERIMA.No_trans',
                    )
                        ->join('Y_BARANG', 'YTRANSBL.Kd_brg', '=', 'Y_BARANG.KD_BRG')
                        ->join('YTERIMA', 'YTRANSBL.No_trans', '=', 'YTERIMA.No_trans')
                        ->join('YSATUAN', 'YTRANSBL.NoSatuan', '=', 'YSATUAN.No_satuan')
                        ->join('ACCOUNTING.dbo.T_MATAUANG', 'YTERIMA.IdMataUang', '=', 'ACCOUNTING.dbo.T_MATAUANG.Id_MataUang')
                        ->join('YUSER', 'YTRANSBL.Operator', '=', 'YUSER.kd_user')
                        ->join('YSUPPLIER', 'YTERIMA.No_sup', '=', 'YSUPPLIER.NO_SUP')
                        ->join('STATUS_ORDER', 'YTRANSBL.StatusOrder', '=', 'STATUS_ORDER.KdStatus')
                        ->where('YTRANSBL.Kd_brg', $kdbrg)
                        ->orderBy('YTRANSBL.Tgl_order')
                        ->get();
                }


                // $redisplay = DB::connection('ConnPurchase')->select('exec spSelect_CariTypeBarang_dotNet @nm_brg = ?, @kd = ?, @req = ?, @sup = ?, @kdbrg = ?', [$nm_brg, $kd, $req, $sup, $kdbrg]);
                return datatables($redisplay)->make(true);
            } catch (\Throwable $Error) {
                return Response()->json($Error);
            }
        } else {
            return Response()->json('Parameter harus di isi');
        }
    }
    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        //
    }

    //Display the specified resource.
    public function show($id)
    {
        //
    }

    //Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request, $id)
    {
        //
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
