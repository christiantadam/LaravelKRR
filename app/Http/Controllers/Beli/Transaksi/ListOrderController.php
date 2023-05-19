<?php

namespace App\Http\Controllers\Beli\Transaksi;

use Illuminate\Http\Request;
use App\Models\Beli\TransBL;
use App\User;
use App\UserDiv;
use Auth;
use Carbon\Carbon;
use DB;
use App\Http\Controllers\Controller;

class ListOrderController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $date = Carbon::now()->format('Y-m-d');
        $idUser=Auth::user()->NomorUser;
        $dataDiv=DB::select('exec spSelect_UserDivisi_dotNet @Operator = '. rtrim($idUser) .'');

        $firstDivisi=UserDiv::select()->where('Kd_user',rtrim($idUser))->first();

        $data = TransBL::select()->leftjoin('Y_BARANG','Y_BARANG.KD_BRG','YTRANSBL.Kd_brg')->leftjoin('YSATUAN','YSATUAN.No_satuan','YTRANSBL.NoSatuan')->leftjoin('STATUS_ORDER','STATUS_ORDER.KdStatus','YTRANSBL.StatusOrder')->where('YTRANSBL.Kd_div',$firstDivisi['Kd_div'])->where('YTRANSBL.Tgl_order','=',$date)->get();

        return view('Beli.Transaksi.ListOrder.List',compact('data','dataDiv'));
    }

    public function show($id)
    {
        $data = TransBL::select('Y_KATEGORI_UTAMA.nama as KatUtama','Y_KATEGORY.nama_kategori as kategori','Y_KATEGORI_SUB.nama_sub_kategori as SubKat','Y_BARANG.NAMA_BRG as NamaBarang','Qty','Nama_satuan','Pemesan','YUSER.Nama as User','StatusBeli','Tgl_Dibutuhkan','Ket_Internal','keterangan','YSUPPLIER.NM_SUP as supplier','YSUPPLIER.KOTA1 as kota','YSUPPLIER.NEGARA1 as negara','PriceUnit','PriceSub','PriceExt','Currency','PPN','YUSER_ACC.Nama as Manager','Tgl_acc','offered.Nama as Offered','Tgl_PBL_Acc','Kd_div')->leftjoin('Y_BARANG','Y_BARANG.KD_BRG','YTRANSBL.Kd_brg')->leftjoin('YUSER','YUSER.kd_user','YTRANSBL.Operator')->leftjoin('YSATUAN','YSATUAN.No_satuan','YTRANSBL.NoSatuan')->leftjoin('STATUS_ORDER','STATUS_ORDER.KdStatus','YTRANSBL.StatusOrder')->leftjoin('Y_KATEGORI_SUB','Y_KATEGORI_SUB.no_sub_kategori','Y_BARANG.NO_SUB_KATEGORI')->leftjoin('Y_KATEGORY','Y_KATEGORY.no_kategori','Y_KATEGORI_SUB.no_kategori')->leftjoin('Y_KATEGORI_UTAMA','Y_KATEGORI_UTAMA.no_kat_utama','Y_KATEGORY.no_kat_utama')->leftjoin('YSUPPLIER','YSUPPLIER.NO_SUP','YTRANSBL.supplier')->leftjoin('YUSER_ACC','YUSER_ACC.Kd_user','YTRANSBL.Manager')->leftjoin('YUSER as offered','offered.kd_user','YTRANSBL.PBL_Acc')->where('No_trans',$id)->first();
        $getKD_Barang=TransBL::select('Kd_brg')->where('No_trans',$id)->first();
        $dataBeliTerakhir=TransBL::select()->leftjoin('YSUPPLIER','YSUPPLIER.NO_SUP','YTRANSBL.supplier')->where('Kd_brg',$getKD_Barang->Kd_brg)->wherein('StatusOrder',[4, 5, 8, 10, 11])->orderBy('No_trans', 'desc')->offset(0)->limit(1)->get();

        return compact('data','dataBeliTerakhir','getKD_Barang');
    }

    public function filter($divisi,$tglAwal,$tglAkhir,$Me)
    {
        if ($Me=="true") {
            $data = TransBL::select()->leftjoin('Y_BARANG','Y_BARANG.KD_BRG','YTRANSBL.Kd_brg')->leftjoin('YUSER','YUSER.kd_user','YTRANSBL.Operator')->leftjoin('YSATUAN','YSATUAN.No_satuan','YTRANSBL.NoSatuan')->leftjoin('STATUS_ORDER','STATUS_ORDER.KdStatus','YTRANSBL.StatusOrder')->where('YTRANSBL.Kd_div',$divisi)->where('YTRANSBL.Tgl_order','>=',$tglAwal)->where('YTRANSBL.Tgl_order','<=',$tglAkhir)->where('YTRANSBL.Operator',Auth::user()->kd_user)->get();
        }
        else
        {
            $data = TransBL::select()->leftjoin('Y_BARANG','Y_BARANG.KD_BRG','YTRANSBL.Kd_brg')->leftjoin('YUSER','YUSER.kd_user','YTRANSBL.Operator')->leftjoin('YSATUAN','YSATUAN.No_satuan','YTRANSBL.NoSatuan')->leftjoin('STATUS_ORDER','STATUS_ORDER.KdStatus','YTRANSBL.StatusOrder')->where('YTRANSBL.Kd_div',$divisi)->where('YTRANSBL.Tgl_order','>=',$tglAwal)->where('YTRANSBL.Tgl_order','<=',$tglAkhir)->get();
        }

        return compact('data');
    }
}
