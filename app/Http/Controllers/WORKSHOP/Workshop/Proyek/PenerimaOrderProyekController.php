<?php

namespace App\Http\Controllers\WORKSHOP\Workshop\Proyek;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;
use Auth;
use Exception;

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
        if ($id == "acc") {
            $data = $request->semuacentang;
            $iduser = $request->iduser;
            $idorder = explode(",", $data);
            try {
                for ($i = 0; $i < count($idorder); $i++) {
                    DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_ACC-RCV-ORDER-PRY] @user = ?, @noOrder = ?', [$iduser, $idorder[$i]]);
                }
                return response()->json(['success' => 'Order DiACC']);
            } catch (Exception $ex) {
                return response()->json(['error' => 'Order DiACC gagal : ' + $ex->getMessage()]);
            }
        } else if ($id == "batal_acc") {
            $data = $request->semuacentang;
            $idorder = explode(",", $data);
            try {
                for ($i = 0; $i < count($idorder); $i++) {
                    DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_BATAL-ACC-RCV-ORDER-PRY] @noOrder = ?', [$idorder[$i]]);
                }
                return response()->json(['success' => 'Batal ACC Order']);
            } catch (Exception $ex) {
                return response()->json(['error' => 'Batal ACC Order gagal : ' + $ex->getMessage()]);
            }
        } else if ($id == "tolak_setuju") {
            $data = $request->semuacentang;
            $idorder = explode(",", $data);
            $dataket = $request->KetTdkS;
            $ket = explode(",", $dataket);
            try {
                for ($i = 0; $i < count($idorder); $i++) {
                    DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_TOLAK-ORDER-PRY]  @noOrder = ?, @ket = ?', [$idorder[$i], $ket[$i]]);
                }
                return response()->json(['success' => 'Order diTolak']);
            } catch (Exception $ex) {
                return response()->json(['error' => 'Order gagal diTolak: ' + $ex->getMessage()]);
            }
        } else if ($id == "tunda") {
            $data = $request->idorderModalTunda;
            $idorder = explode(",", $data);
            $alasan = $request->Alasan;
            try {
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
                return response()->json(['success' => (string) 'Order diTunda']);
            } catch (Exception $ex) {
                return response()->json(['error' => (string) 'Order gagal diTunda: ' + $ex->getMessage()]);
            }

        } else if ($id == "order_batal") {
            $no_order = $request->no_order;
            $ket = $request->ketbatal;
            try {
                DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_BATAL-KERJA-ORDER-PRY]  @noOrder = ?, @ket = ?', [$no_order, $ket]);
                return response()->json(['success' => (string) "Order Gambar Batal Dikerjakan"]);
            } catch (Exception $ex) {
                return response()->json(['error' => (string) "Gagal Membatalkan Order: " . $ex->getMessage()]);
            }
        }
        if ($id == 'order_kerja') {
            $noOd = $request->no_order;
            $tglSt = $request->TanggalStart;
            $user = $request->Usermodalkoreksi;
            try {
                DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_PROSES-ORDER-PRY] @kode = ?, @noOd = ?,  @tglSt = ?, @user = ?', [1, $noOd, $tglSt, $user]);
                return response()->json(['success' => (string) "Data TerSIMPAN"]);
            } catch (Exception $ex) {
                return response()->json(['error' => (string) "Gagal Membatalkan Order: " . $ex->getMessage()]);
            }
        }
        if ($id == 'order_selesai') {
            $noOd = $request->no_order;
            $tglSt = $request->TanggalStart;
            $tglFh = $request->TanggalFinish;
            $jml = intval($request->JumlahOrderSelesai);
            try {
                DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_PROSES-ORDER-PRY] @kode = ?, @noOd = ?, @tglSt = ?, @tglFh = ?, @jml = ?', [2, $noOd, $tglSt, $tglFh, $jml]);
                return response()->json(['success' => (string) "Data TerSIMPAN"]);
            } catch (Exception $ex) {
                return response()->json(['error' => (string) "Gagal Membatalkan Order: " . $ex->getMessage()]);
            }
        }
    }


    public function destroy($id)
    {
        //
    }
}
