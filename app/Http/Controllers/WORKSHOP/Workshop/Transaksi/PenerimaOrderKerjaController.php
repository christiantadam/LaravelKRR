<?php

namespace App\Http\Controllers\WORKSHOP\Workshop\Transaksi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;
use Auth;

class PenerimaOrderKerjaController extends Controller
{
    public function index()
    {
        $nomoruser = trim(Auth::user()->NomorUser);
        $access = (new HakAksesController)->HakAksesFiturMaster('Workshop');
        return view('WORKSHOP.Workshop.Transaksi.PenerimaOrderKerja', compact('access','nomoruser'));
    }
    public function GetAllData($tgl_awal, $tgl_akhir)
    {
        $all = DB::connection('Connworkshop')->select('[SP_5298_WRK_LIST-ORDER-KRJ] @kode = ?, @tgl1 = ?, @tgl2 = ?', [8, $tgl_awal, $tgl_akhir]);
        return response()->json($all);
    }
    public function cekuser($user)
    {
        $data = DB::connection('Connworkshop')->select('[SP_5298_WRK_USER-WRK] @kode = ?, @user = ?', [1, $user]);
        return response()->json($data);
    }
    public function cekuserkoreksi($user)
    {
        $data = DB::connection('Connworkshop')->select('[SP_5298_WRK_USER-WRK] @kode = ?, @user = ?', [2, $user]);
        return response()->json($data);
    }
    public function namauserPenerimaOrderKerja($user)
    {
        $data = DB::connection('Connworkshop')->select('[SP_5298_WRK_USER-LOGIN-1] @user = ?', [$user]);
        return response()->json($data);
    }
    public function LoadStok($kdbarang)
    {
        $data = DB::connection('Connworkshop')->select('[SP_5298_WRK_SALDO-BARANG] @kdBarang = ?', [$kdbarang]);
        return response()->json($data);
    }
    public function cekusermodalkoreksi()
    {

    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
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
        // dd($request->all());
        $tanggalAwal = $request->tgl_awal;
        $pembeda = $request->pembeda;
        $radiobox = $request->radiobox;
        $Tsts = $request->Tsts;
        if ($radiobox == "acc") {
            # code...
            $data = $request->semuacentang;
            $iduser = $request->iduser;
            $idorder = explode(",", $data);
            for ($i = 0; $i < count($idorder); $i++) {
                DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_ACC-RCV-ORDER-KRJ] @user = ?, @noOrder = ?', [$iduser, $idorder[$i]]);
            }
            return redirect()->back()->with('success', 'Order DiACC')->with('tanggalAwal', $tanggalAwal);
        } else if ($radiobox == "batal_acc") {
            $data = $request->semuacentang;
            $idorder = explode(",", $data);
            for ($i = 0; $i < count($idorder); $i++) {
                DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_BATAL-ACC-RCV-ORDER-KRJ] @noOrder = ?', [$idorder[$i]]);
            }
            return redirect()->back()->with('success', 'Batal ACC Order')->with('tanggalAwal', $tanggalAwal);
        } else if ($radiobox == "tolak_setuju") {
            # code...
            $data = $request->semuacentang;
            $idorder = explode(",", $data);
            $dataket = $request->KetTdkS;
            $ket = explode(",", $dataket);
            for ($i = 0; $i < count($idorder); $i++) {
                DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_TOLAK-ORDER-KRJ]  @noOrder = ?, @ket = ?', [$idorder[$i], $ket[$i]]);
            }
            return redirect()->back()->with('success', 'Order diTolak')->with('tanggalAwal', $tanggalAwal);
        } else if ($pembeda == "tunda") {
            # code...
            $data = $request->idorderModalTunda;
            $idorder = explode(",", $data);
            $alasan = $request->Alasan;
            if ($alasan == "Lain_Lain") {
                $alasanlain = $request->alasanlainlain;
                for ($i = 0; $i < count($idorder); $i++) {
                    DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_PENDING-ORDER-KRJ]  @noOrder = ?, @ket = ?', [$idorder[$i], $alasanlain]);
                }
            } else {
                for ($i = 0; $i < count($idorder); $i++) {
                    DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_PENDING-ORDER-KRJ]  @noOrder = ?, @ket = ?', [$idorder[$i], $alasan]);
                }
            }
            return redirect()->back()->with('success', 'Order diTunda')->with('tanggalAwal', $tanggalAwal);
        } else if ($radiobox == "order_batal") {
            $no_order = $request->no_order;
            $ket = $request->ketbatal;
            DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_BATAL-KERJA-ORDER-KRJ]  @noOrder = ?, @ket = ?', [$no_order, $ket]);
            return redirect()->back()->with('success', 'Order Gambar Batal Dikerjakan')->with('tanggalAwal', $tanggalAwal);
        }
        if ($Tsts == 1) {
            $noOd = $request->NoOrder;
            $tglSt = $request->TanggalStart;
            $user = $request->Usermodalkoreksi;
            DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_PROSES-ORDER-KRJ] @kode = ?, @noOd = ?,  @tglSt = ?, @user = ?', [1, $noOd, $tglSt, $user]);
            return redirect()->back()->with('success', 'Data TerSIMPAN')->with('tanggalAwal', $tanggalAwal);
        }
        if ($Tsts == 2) {
            $noOd = $request->NoOrder;
            $tglSt = $request->TanggalStart;
            $tglFh = $request->TanggalFinish;
            $jml = intval($request->JumlahOrderSelesai);
            // dd($jml);
            DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_PROSES-ORDER-KRJ] @kode = ?, @noOd = ?, @tglSt = ?, @tglFh = ?, @jml = ?', [2, $noOd, $tglSt, $tglFh, $jml]);
            return redirect()->back()->with('success', 'Data TerSIMPAN')->with('tanggalAwal', $tanggalAwal);
        }
    }

    public function destroy($id)
    {
        //
    }
}
