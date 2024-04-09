<?php

namespace App\Http\Controllers\Beli\TransaksiBeli;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class TransferBarangController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        $result = (new HakAksesController)->HakAksesFitur('Transfer Barang');
        if ($result > 0) {
            return view('Beli.TransaksiBeli.TransferBarang.TransferBarang', compact('access'));
        } else {
            abort(404);
        }
    }

    public function redisplay(Request $request)
    {
        $Kd_Div = $request->input('Kd_Div');
        $kd = $request->input('kd');
        $noBTTB = $request->input('noBTTB');
        if (($Kd_Div != null) || ($kd != null) || ($noBTTB != null)) {
            try {
                if ($kd == 32) {
                    $redisplay = DB::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @Kd_Div = ?, @kd = ?', [$Kd_Div, $kd]);
                } else if ($kd == 33) {
                    $redisplay = DB::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @noBTTB = ?, @kd = ?', [$noBTTB, $kd]);
                } else if ($kd == 18) {
                    $redisplay = DB::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @Kd_Div = ?, @kd = ?', [$Kd_Div, $kd]);
                } else if ($kd == 27) {
                    $redisplay = DB::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @noBTTB = ?, @kd = ?', [$noBTTB, $kd]);
                }
                return datatables($redisplay)->make(true);
            } catch (\Throwable $Error) {
                return Response()->json($Error);
            }
        } else {
            return Response()->json('Parameter harus di isi');
        }
    }
    public function divisi()
    {
        $Operator = trim(Auth::user()->NomorUser);
        try {
            $data = DB::connection('ConnPurchase')->select('exec spSelect_UserDivisi_dotNet @Operator = ?, @kd = ?', [$Operator, 1]);

            return Response()->json($data);
        } catch (\Throwable $Error) {
            return Response()->json($Error);
        }
    }
    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        //
    }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        $No_PO = $request->query('No_PO');
        $No_BTTB = $request->query('No_BTTB');
        $koreksi = $request->query('koreksi');
        // dd($No_BTTB,$No_PO,$koreksi);
        return view('Beli.TransaksiBeli.TransferBarang.TransferBTTB', compact('access', 'No_PO', 'No_BTTB', 'koreksi'));
    }

    public function loadData(Request $request)
    {
        $noBTTB = $request->input('noBTTB');
        $koreksi = $request->input('koreksi');
        if (($noBTTB != null) && ($koreksi != null)) {
            try {
                if ($koreksi == 1) {
                    $data = DB::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @noBTTB = ?, @kd = ?', [$noBTTB, 34]);
                } else if ($koreksi == 0) {
                    // $data = DB::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @noBTTB = ?, @kd = ?', [$noBTTB, 19]);
                    $data = DB::connection('ConnPurchase')
                        ->table('YTERIMA')
                        ->join('YTRANSBL', 'YTERIMA.No_trans', '=', 'YTRANSBL.No_trans')
                        ->join('Y_BARANG', 'YTRANSBL.Kd_brg', '=', 'Y_BARANG.KD_BRG')
                        ->join('Y_KATEGORI_SUB', 'Y_BARANG.NO_SUB_KATEGORI', '=', 'Y_KATEGORI_SUB.no_sub_kategori')
                        ->join('Y_KATEGORY', 'Y_KATEGORI_SUB.no_kategori', '=', 'Y_KATEGORY.no_kategori')
                        ->join('Y_KATEGORI_UTAMA', 'Y_KATEGORY.no_kat_utama', '=', 'Y_KATEGORI_UTAMA.no_kat_utama')
                        ->join('YSATUAN', 'YTRANSBL.NoSatuan', '=', 'YSATUAN.No_satuan')
                        ->select('YTERIMA.No_terima', 'Y_KATEGORY.nama_kategori', 'Y_KATEGORI_SUB.nama_sub_kategori', 'YTRANSBL.Kd_brg', 'Y_BARANG.NAMA_BRG', 'YTERIMA.Qty_Terima', 'YSATUAN.Nama_satuan', 'YTERIMA.No_BTTB','YTERIMA.No_PIB')
                        ->whereNull('YTERIMA.NoTransaksiTmp')
                        ->where('YTERIMA.No_BTTB', '=', $noBTTB)
                        ->where('YTERIMA.Qty_Terima', '>', 0)
                        ->get();
                }

                return datatables($data)->make(true);
            } catch (\Throwable $Error) {
                return Response()->json($Error);
            }
        } else {
            return Response()->json('Parameter harus di isi');
        }
    }
    public function loadSatuan(Request $request)
    {
        $kd = 20;
        $kdbrg = $request->input('kdbrg');
        if ($kdbrg != null) {
            try {
                $data = DB::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @kdbrg = ?, @kd = ?', [$kdbrg, $kd]);
                return Response()->json($data);
            } catch (\Throwable $Error) {
                return Response()->json($Error);
            }
        } else {
            return Response()->json('Parameter harus di isi');
        }
    }
    public function divisiBTTB(Request $request)
    {
        $Type = 12;
        $KodeBarang = $request->input('KodeBarang');
        if ($KodeBarang != null) {
            try {
                $data = DB::connection('ConnInventory')->select('exec SP_1003_INV_UserDivisi @KodeBarang = ?, @Type = ?', [$KodeBarang, $Type]);
                return Response()->json($data);
            } catch (\Throwable $Error) {
                return Response()->json($Error);
            }
        } else {
            return Response()->json('Parameter harus di isi');
        }
    }
    public function objek(Request $request)
    {
        $Type = 6;
        $KodeBarang = $request->input('KodeBarang');
        $XIdDivisi = $request->input('XIdDivisi');
        if (($KodeBarang != null) && ($XIdDivisi != null)) {
            try {
                $data = DB::connection('ConnInventory')->select('exec SP_1003_INV_User_Objek @KodeBarang = ?, @Type = ?,@XIdDivisi=?', [$KodeBarang, $Type, $XIdDivisi]);
                return Response()->json($data);
            } catch (\Throwable $Error) {
                return Response()->json($Error);
            }
        } else {
            return Response()->json('Parameter harus di isi');
        }
    }
    public function loadKelomDLL(Request $request)
    {
        $Type = 11;
        $KodeBarang = $request->input('KodeBarang');
        $idObjek = $request->input('idObjek');
        if (($KodeBarang != null) && ($idObjek != null)) {
            try {
                $data = DB::connection('ConnInventory')->select('exec SP_1003_INV_UserDivisi @KodeBarang = ?, @Type = ?,@idObjek=?', [$KodeBarang, $Type, $idObjek]);
                return Response()->json($data);
            } catch (\Throwable $Error) {
                return Response()->json($Error);
            }
        } else {
            return Response()->json('Parameter harus di isi');
        }
    }

    public function koreksi(Request $request)
    {

        $IdType = $request->input('IdType');
        $MasukPrimer = $request->input('MasukPrimer');
        $MasukSekunder = $request->input('MasukSekunder');
        $MasukTritier = $request->input('MasukTritier');
        $User_id = trim(Auth::user()->NomorUser);
        $SubKel = $request->input('SubKel');
        $NoTransTmp = $request->input('NoTransTmp');
        $ket = $request->input('ket');
        if (
            $IdType !== null &&
            $MasukPrimer !== null &&
            $MasukSekunder !== null &&
            $MasukTritier !== null &&
            $SubKel !== null &&
            $NoTransTmp !== null
        ) {
            try {
                $data = DB::connection('ConnPurchase')->statement('exec SP_1273_PBL_KOREKSI_TRANSFER_TMPTRANSAKSI @IdType = ?, @MasukPrimer = ?,@MasukSekunder = ?, @MasukTritier = ?, @User_id = ?,@SubKel = ?,@NoTransTmp = ?, @ket = ?', [
                    $IdType,
                    $MasukPrimer,
                    $MasukSekunder,
                    $MasukTritier,
                    $User_id,
                    $SubKel,
                    $NoTransTmp,
                    $ket
                ]);
                return Response()->json(['message' => 'Data Berhasil Di Koreksi']);
            } catch (\Throwable $Error) {
                return Response()->json($Error);
            }
        } else {
            return Response()->json('Parameter harus di isi');
        }
    }
    public function transfer(Request $request)
    {
        $kd = 1;
        $IdType = $request->input('IdType');
        $MasukPrimer = $request->input('MasukPrimer');
        $MasukSekunder = $request->input('MasukSekunder');
        $MasukTritier = $request->input('MasukTritier');
        $User_id = trim(Auth::user()->NomorUser);
        $SubKel = $request->input('SubKel');
        $NoTerima = $request->input('NoTerima');
        $ket = $request->input('ket');
        $YTanggal = Carbon::parse($request->input('YTanggal'));
        if (
            $IdType !== null &&
            $MasukPrimer !== null &&
            $MasukSekunder !== null &&
            $MasukTritier !== null &&
            $SubKel !== null &&
            $NoTerima !== null &&
            $YTanggal !== null
        ) {
            try {
                $data = DB::connection('ConnPurchase')->statement('exec SP_7775_PBL_TRANSFER_TMPTRANSAKSI @kd = ?, @IdType = ?, @MasukPrimer = ?,@MasukSekunder = ?, @MasukTritier = ?, @User_id = ?,@SubKel = ?,@NoTerima = ?, @ket = ? , @YTanggal = ?', [
                    $kd,
                    $IdType,
                    $MasukPrimer,
                    $MasukSekunder,
                    $MasukTritier,
                    $User_id,
                    $SubKel,
                    $NoTerima,
                    $ket,
                    $YTanggal
                ]);
                return Response()->json(['message' => 'Data Berhasil Di Transfer']);
            } catch (\Throwable $Error) {
                return Response()->json($Error);
            }
        } else {
            return Response()->json('Parameter harus di isi');
        }
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
