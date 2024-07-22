<?php

namespace App\Http\Controllers\WORKSHOP\Workshop\Transaksi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;
use Auth;

class MaintenanceOrderGambarController extends Controller
{

    public function index()
    {
        $nomoruser = trim(Auth::user()->NomorUser);
        $access = (new HakAksesController)->HakAksesFiturMaster('Workshop');
        $divisi = DB::connection('Connworkshop')->select('exec [SP_5298_WRK_USER-DIVISI] @user = ?', [Auth::user()->NomorUser]);
        $satuan = DB::connection('Connworkshop')->select('exec [SP_5298_WRK_SATUAN]');

        //dd($satuan);
        return view('WORKSHOP.Workshop.Transaksi.MaintenanceOrderGambar', compact(['divisi', 'satuan'], 'access', 'nomoruser'));
    }
    public function GetDataAll($tgl_awal, $tgl_akhir, $divisi)
    {
        $all = DB::connection('Connworkshop')->select('[SP_5298_WRK_LIST-ORDER-GBR] @kode = ?, @tgl1 = ?, @tgl2 = ?, @div = ?', [1, $tgl_awal, $tgl_akhir, $divisi]);
        return response()->json($all);
    }
    public function GatDataForUserOrder($tgl_awal, $tgl_akhir, $iduserOrder, $divisi)
    {
        $all = DB::connection('Connworkshop')->select('[SP_5298_WRK_LIST-ORDER-GBR] @kode = ?, @tgl1 = ?, @tgl2 = ?, @user = ?, @div = ?', [2, $tgl_awal, $tgl_akhir, $iduserOrder, $divisi]);
        return response()->json($all);
    }
    public function mesin($idDivisi)
    {
        $mesin = DB::connection('Connworkshop')->select('exec [SP_5298_WRK_LIST-MESIN] @Id_divisi = ?', [$idDivisi]);
        return response()->json($mesin);
    }

    public function GetBarang($KdBrg, $IdDiv)
    {
        $Barang = DB::connection('Connworkshop')->select('exec [SP_5298_WRK_LIST-NO-GBR] @kode = ?, @KdBrg = ?, @IdDiv = ?', [2, $KdBrg, $IdDiv]);
        return response()->json($Barang);
    }

    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        //dd($request->all());
        $pembeda = $request->lblKdDivisi;
        if ($pembeda == 1) {
            $tgl = $request->TglMaintenanceGambarBaru;
            $iddiv = $request->iddivisimodif;
            $namaBarang = $request->NamaBarang;
            $userod = $request->PengorderBaru;
            $ketod = $request->KeteranganModif;
            $nosat = $request->Satuan;
            $nomesin = $request->Mesin;
            $noGbr = $request->GambarRev;
            $kdBrg = $request->KodeBarang;
            DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_INSERT-ORDER-GBR-MODIF] @kode = ?, @tgl = ?, @IdDiv = ?, @namaBrg = ?, @userOd = ?, @ketOd = ?, @noSat = ?, @noGbr = ?, @kdBrg = ?, @noMesin = ?', [1, $tgl, $iddiv, $namaBarang, $userod, $ketod, $nosat, $noGbr, $kdBrg, $nomesin]);
        } else {
            $tgl = $request->TglMaintenanceGambarBaru;
            $iddiv = $request->iddivisibaru;
            $namaBarang = $request->NamaBarang;
            $userod = $request->PengorderBaru;
            $ketod = $request->Keterangan;
            $nosat = $request->Satuan;
            $nomesin = $request->Mesin;
            DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_INSERT-ORDER-GBR-BARU] @kode = ?, @tgl = ?, @IdDiv = ?, @namaBrg = ?, @userOd = ?, @ketOd = ?, @noSat = ?, @noMesin = ?', [1, $tgl, $iddiv, $namaBarang, $userod, $ketod, $nosat, $nomesin]);
        }
        //ini buat kasih pesan sukses
        //echo "wdawda";
        return redirect()->back()->with('success', 'Data TerSIMPAN');
    }


    public function show($id)
    {
        // $nomoruser = trim(Auth::user()->NomorUser);
        // return view('Beli.Transaksi.Approve.List', compact('data', 'access'));
    }


    public function edit($id)
    {
        //
    }


    public function update(Request $request, $id)
    {
        //dd($request->all());
        $pembeda = $request->lblKdDivisi;
        if ($pembeda == 1) {
            $noOrder = $request->TNoD;
            $nama = $request->NamaBarang;
            $ket = $request->Keterangan;
            $nosat = $request->Satuan;
            $nomesin = $request->Mesin;
            $GambarRev = $request->GambarRev;
            $KodeBarang = $request->KodeBarang;
            DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_UPDATE-ORDER-GBR-MODIF] @noOrder = ?, @namaBrg = ?, @ketOd = ?, @noSat = ?, @noGbr = ?, @kdBrg = ?,  @noMesin = ?', [$noOrder, $nama, $ket, $nosat, $GambarRev, $KodeBarang, $nomesin]);
        } else {
            $noOrder = $request->TNoD;
            $nama = $request->NamaBarang;
            $ket = $request->Keterangan;
            $nosat = $request->Satuan;
            $nomesin = $request->Mesin;
            DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_UPDATE-ORDER-GBR-BARU] @noOrder = ?, @namaBrg = ?, @ketOd = ?, @noSat = ?, @noMesin = ?', [$noOrder, $nama, $ket, $nosat, $nomesin]);
        }
        return redirect()->back()->with('success', 'Data TerKOREKSI');
    }


    public function destroy($id)
    {
        //dd("masuk");
        DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_DELETE-ORDER-GBR] @noOrder = ?', [$id]);
        return redirect()->back()->with('success', 'Data TerHAPUS');
    }
}
