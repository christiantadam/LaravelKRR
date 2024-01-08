<?php

namespace App\Http\Controllers\WORKSHOP\Workshop\Transaksi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PenerimaOrderGambarController extends Controller
{

    public function index()
    {
        $drafter = DB::connection('Connworkshop')->select('[SP_5298_WRK_USER-DRAFTER]');
        return view('WORKSHOP.Workshop.Transaksi.PenerimaOrderGambar', compact(['drafter']));
    }
    public function GetAllData($tgl_awal, $tgl_akhir)
    {
        $all = DB::connection('Connworkshop')->select('[SP_5298_WRK_LIST-ORDER-GBR] @kode = ?, @tgl1 = ?, @tgl2 = ?', [14, $tgl_awal, $tgl_akhir]);
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
    public function cekuserprosesmodal($user, $kode)
    {
        $data = DB::connection('Connworkshop')->select('[SP_5298_WRK_USER-WRK] @kode = ?, @user = ?', [$kode, $user]);
        return response()->json($data);
    }
    public function ceknomorGambar($nogambar)
    {
        $data = DB::connection('Connworkshop')->select('[SP_5298_WRK_CEK-NO-GBR] @noGbr = ?', [$nogambar]);
        return response()->json($data);
    }
    public function GetUserDrafter($noOd) {
        $data = DB::connection('Connworkshop')->select('[SP_5298_WRK_LOAD-DRAFTER] @noOd = ?', [$noOd]);
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
        //dd($request->all());
        $radiobox = $request->radiobox;
        $Tsts = $request->Tsts;
        if ($radiobox == "acc") {
            # code...
            $data = $request->semuacentang;
            $iduser = $request->iduser;
            $idorder = explode(",", $data);
            for ($i = 0; $i < count($idorder); $i++) {
                DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_ACC-RCV-ORDER-GBR] @user = ?, @noOrder = ?', [$iduser, $idorder[$i]]);
            }
            return redirect()->back()->with('success', 'Order DiACC');
        } else if ($radiobox == "batal_acc") {
            $data = $request->semuacentang;
            $idorder = explode(",", $data);
            for ($i = 0; $i < count($idorder); $i++) {
                DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_BATAL-ACC-RCV-ORDER-GBR] @noOrder = ?', [$idorder[$i]]);
            }
            return redirect()->back()->with('success', 'Batal ACC Order');
        } else if ($radiobox == "tolak_setuju") {
            # code...
            $data = $request->semuacentang;
            $idorder = explode(",", $data);
            $dataket = $request->KetTdkS;
            $ket = explode(",", $dataket);
            for ($i = 0; $i < count($idorder); $i++) {
                DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_TOLAK-ORDER-GBR]  @noOrder = ?, @ket = ?', [$idorder[$i], $ket[$i]]);
            }
            return redirect()->back()->with('success', 'Order diTolak');
        } else if ($radiobox == "order_batal") {
            $no_order = $request->no_order;
            $ket = $request->ketbatal;
            DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_BATAL-KERJA-ORDER-GBR]  @noOrder = ?, @ket = ?', [$no_order, $ket]);
            return redirect()->back()->with('success', 'Order Gambar Batal Dikerjakan');
        }
        if ($Tsts == 1) {
            $noOd = $request->noOrder;
            $userDraf = $request->DrafterModal;
            $tglSt = $request->tgl_start;
            $user = $request->IdUser;
            DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_PROSES-ORDER-GBR] @kode = ?, @noOd = ?, @userDraf = ?, @tglSt = ?, @user = ?', [1, $noOd, $userDraf, $tglSt, $user]);
            return redirect()->back()->with('success', 'Data TerSIMPAN');
        }
        if ($Tsts == 2) {
            $noOd = $request->noOrder;
            $userDraf = $request->DrafterModal;
            $tglSt = $request->tgl_start;
            $tglFh = $request->tgl_finish;

            $arraynogambar = $request->arraynomorgambar;
            $arraynamagambar = $request->arraynamagambar;
            $arraytglapp = $request->arraytglapprove;

            $nomorgambar = explode(",", $arraynogambar);
            $namagambar = explode(",", $arraynamagambar);
            $tglapprove = explode(",", $arraytglapp);
            DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_PROSES-ORDER-GBR] @kode = ?, @noOd = ?, @userDraf = ?, @tglSt = ?, @tglFh = ?', [2, $noOd, $userDraf, $tglSt, $tglFh]);

            for ($i=0; $i < count($nomorgambar); $i++) {
                DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_PROSES-DETAIL-ORDER-GBR]  @noOd = ?, @noGbr = ?, @nmBrg = ?, @tglAppv = ?', [$noOd, $nomorgambar[$i],$namagambar[$i],$tglapprove[$i]]);
            }
            return redirect()->back()->with('success', 'Data TerSIMPAN');
        }
    }


    public function destroy($id)
    {
        //
    }
}
