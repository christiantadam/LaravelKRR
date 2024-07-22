<?php

namespace App\Http\Controllers\WORKSHOP\Workshop\Proyek;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;
use Auth;

class PenerimaOrderProyekController extends Controller
{

    public function index()
    {
        $nomoruser = trim(Auth::user()->NomorUser);
        $access = (new HakAksesController)->HakAksesFiturMaster('Workshop');
        return view('WORKSHOP.Workshop.Proyek.PenerimaOrderProyek', compact('access', 'nomoruser'));
    }
    public function GetAllData($tgl_awal, $tgl_akhir)
    {
        $all = DB::connection('Connworkshop')->select('[SP_5298_WRK_LIST-ORDER-PRY] @kode = ?, @tgl1 = ?, @tgl2 = ?', [13, $tgl_awal, $tgl_akhir]);
        return response()->json($all);
    }
    public function cekuser($user)
    {
        $data = DB::connection('Connworkshop')->select('[SP_5298_WRK_USER-WRK] @kode = ?, @user = ?', [1, $user]);
        return response()->json($data);
    }
    public function namauserPenerimaOrderProyek($user)
    {
        $data = DB::connection('Connworkshop')->select('[SP_5298_WRK_USER-LOGIN-1] @user = ?', [$user]);
        return response()->json($data);
    }
    public function cekuserkoreksi($user)
    {
        $data = DB::connection('Connworkshop')->select('[SP_5298_WRK_USER-WRK] @kode = ?, @user = ?', [2, $user]);
        return response()->json($data);
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
        //
        // dd($request->all());
        $pembeda = $request->pembeda;
        $radiobox = $request->radiobox;
        $Tsts = $request->Tsts;
        if ($radiobox == "acc") {
            # code...
            $data = $request->semuacentang;
            $iduser = $request->iduser;
            $idorder = explode(",", $data);
            for ($i = 0; $i < count($idorder); $i++) {
                DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_ACC-RCV-ORDER-PRY] @user = ?, @noOrder = ?', [$iduser, $idorder[$i]]);
            }
            return redirect()->back()->with('success', 'Order DiACC');
        } else if ($radiobox == "batal_acc") {
            $data = $request->semuacentang;
            $idorder = explode(",", $data);
            for ($i = 0; $i < count($idorder); $i++) {
                DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_BATAL-ACC-RCV-ORDER-PRY] @noOrder = ?', [$idorder[$i]]);
            }
            return redirect()->back()->with('success', 'Batal ACC Order');
        } else if ($radiobox == "tolak_setuju") {
            # code...
            $data = $request->semuacentang;
            $idorder = explode(",", $data);
            $dataket = $request->KetTdkS;
            $ket = explode(",", $dataket);
            for ($i = 0; $i < count($idorder); $i++) {
                DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_TOLAK-ORDER-PRY]  @noOrder = ?, @ket = ?', [$idorder[$i], $ket[$i]]);
            }
            return redirect()->back()->with('success', 'Order diTolak');
        } else if ($pembeda == "tunda") {
            # code...
            $data = $request->idorderModalTunda;
            $idorder = explode(",", $data);
            $alasan = $request->Alasan;
            if ($alasan == "Lain_Lain") {
                $alasanlain = $request->alasanlainlain;
                for ($i = 0; $i < count($idorder); $i++) {
                    DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_PENDING-ORDER-PRY]  @noOrder = ?, @ket = ?', [$idorder[$i], $alasanlain]);
                }
            } else {
                for ($i = 0; $i < count($idorder); $i++) {
                    DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_PENDING-ORDER-PRY]  @noOrder = ?, @ket = ?', [$idorder[$i], $alasan]);
                }
            }
            return redirect()->back()->with('success', 'Order diTunda');
        } else if ($radiobox == "order_batal") {
            $no_order = $request->no_order;
            $ket = $request->ketbatal;
            DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_BATAL-KERJA-ORDER-PRY]  @noOrder = ?, @ket = ?', [$no_order, $ket]);
            return redirect()->back()->with('success', 'Order Gambar Batal Dikerjakan');
        }
        if ($Tsts == 1) {
            $noOd = $request->NoOrder;
            $tglSt = $request->TanggalStart;
            $user = $request->Usermodalkoreksi;
            DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_PROSES-ORDER-PRY] @kode = ?, @noOd = ?,  @tglSt = ?, @user = ?', [1, $noOd, $tglSt, $user]);
            return redirect()->back()->with('success', 'Data TerSIMPAN');
        }
        if ($Tsts == 2) {
            $noOd = $request->NoOrder;
            $tglSt = $request->TanggalStart;
            $tglFh = $request->TanggalFinish;
            $jml = $request->JumlahOrderSelesai;
            DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_PROSES-ORDER-PRY] @kode = ?, @noOd = ?, @tglSt = ?, @tglFh = ?, @jml = ?', [2, $noOd, $tglSt, $tglFh, $jml]);
            return redirect()->back()->with('success', 'Data TerSIMPAN');
        }
    }


    public function destroy($id)
    {
        //
    }
}
