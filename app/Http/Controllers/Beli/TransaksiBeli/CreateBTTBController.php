<?php

namespace App\Http\Controllers\Beli\TransaksiBeli;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Log;


class CreateBTTBController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {

        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        $result = (new HakAksesController)->HakAksesFitur('Create BTTB');
        if ($result > 0) {
            $nosup = DB::connection('ConnPurchase')->select('exec SP_5409_PBL_SUPPLIER @kd=1');
            $po = DB::connection('ConnPurchase')->select('exec SP_5409_PBL_SUPPLIER @kd=1');
            $ppn = DB::connection('ConnPurchase')->select('exec SP_5409_LIST_PPN');
            return view('Beli.TransaksiBeli.CreateBTTB', compact('nosup', 'po', 'ppn', 'access'));
        } else {
            abort(403);
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

    public function createbttb(Request $request)
    {
        $noPO = $request->input('noPO');
        $kd = 16;

        $createbttb = DB::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @kd=?, @noPO=?', [$kd, $noPO]);

        return response()->json($createbttb);
    }

    public function drop1(Request $request)
    {
        $idSup = $request->input('idSup');
        $kd = 15;

        $purchaseorder = DB::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @kd =?, @idSup =?', [$kd, $idSup]);

        return response()->json($purchaseorder);
    }


    public function dropdown(Request $request)
    {
        $NM_SUP = $request->input('NM_SUP');
        $kd = 1;

        $purchaseorder = DB::connection('ConnPurchase')->select('exec SP_5409_PBL_SUPPLIER @kd =?, @NM_SUP =?', [$kd, $NM_SUP]);
        return response()->json($purchaseorder);
    }
    public function createNoBTTB()
    {
        $kd = 7;
        try {
            $tahun = date('y');
            $value = DB::connection('ConnPurchase')->table('YCounter')->value('NO_BTTB');
            $NoBTTB = '0000000000000' . $value;
            $NoBTTB = 'BTTB-' . $tahun . substr($NoBTTB, -6);
            $update = DB::connection('ConnPurchase')->statement('exec SP_5409_MAINT_PO @kd = ?', [$kd]);
            return Response()->json(['data' => $NoBTTB, 'status' => $update]);
        } catch (\Throwable $Error) {
            return Response()->json($Error);
        }
    }

    public function setStatusPO(Request $request)
    {
        $kd = 9;
        $NoPO = $request->input('NoPO');
        try {
            $data = DB::connection('ConnPurchase')->statement('exec SP_5409_MAINT_PO @kd = ? , @NoPO = ?', [$kd, $NoPO]);
            return Response()->json($data);
        } catch (\Throwable $Error) {
            return Response()->json($Error);
        }
    }
    public function post(Request $request)
    {
        $kd = 8;
        $tglDatang = Carbon::parse($request->input('tglDatang'));
        $Qty = $request->input('Qty');
        $qtyShip = $request->input('qtyShip');
        $qtyRcv = $request->input('qtyRcv');
        $qtyremain = $request->input('qtyremain');
        $NoSatuan = $request->input('NoSatuan');
        $SJ = $request->input('SJ');
        $idSup = $request->input('idSup');
        $pUnit = $request->input('pUnit');
        $pPPN = $request->input('pPPN');
        $noTrans = $request->input('noTrans');
        $Kd_div = 'PBL';
        $kurs = $request->input('kurs');
        $Operator = trim(Auth::user()->NomorUser);
        $pIDRUnit = $request->input('pIDRUnit');
        $pIDRPPN = $request->input('pIDRPPN');
        $NoPIB = $request->input('NoPIB');
        $NoPO = $request->input('NoPO');
        $BTTB = $request->input('BTTB');
        $pSub = $request->input('pSub');
        $pIDRSub = $request->input('pIDRSub');
        $pTot = $request->input('pTot');
        $pIDRTot = $request->input('pIDRTot');
        $NoPIBExt = $request->input('NoPIBExt');
        $TglPIB = Carbon::parse($request->input('TglPIB'));
        $NoSPPBBC = $request->input('NoSPPBBC');
        $TglSPPBBC = Carbon::parse($request->input('TglSPPBBC'));
        $NoSKBM = $request->input('NoSKBM');
        $TglSKBM = Carbon::parse($request->input('TglSKBM'));
        $NoReg = $request->input('NoReg');
        $TglReg = Carbon::parse($request->input('TglReg'));
        $idPPN = $request->input('idPPN');
        $jumPPN = $request->input('jumPPN');
        $persen = $request->input('persen');
        $disc = $request->input('disc');
        $discIDR = $request->input('discIDR');
        $mtUang = $request->input('mtUang');
        $KodeHS = $request->input('KodeHS');
        $noTrTmp = $request->input('noTrTmp');
        if (($BTTB !== null)) {
            try {
                $post = DB::connection('ConnPurchase')->statement('exec SP_5409_MAINT_PO @kd = ?,@tglDatang = ?,@Qty = ?,@qtyShip = ?,@qtyRcv = ?,@qtyremain = ?,@NoSatuan = ?,@SJ = ?,@idSup = ?,@pUnit = ?,@pPPN = ?,@noTrans = ?,@Kd_div = ?,@kurs = ?,@Operator = ?,@pIDRUnit = ?,@pIDRPPN = ?,@NoPIB = ?,@NoPO = ?,@BTTB = ?,@pSub = ?,@pIDRSub = ?,@pTot = ?,@pIDRTot = ?,@NoPIBExt = ?,@TglPIB = ?,@NoSPPBBC = ?,@TglSPPBBC = ?,@NoSKBM = ?,@TglSKBM = ?,@NoReg = ?,@TglReg = ?,@idPPN = ?,@jumPPN = ?,@persen = ?,@disc = ?,@discIDR = ?,@mtUang = ?,@KodeHS = ?,@noTrTmp = ?', [
                    $kd,
                    $tglDatang,
                    $Qty,
                    $qtyShip,
                    $qtyRcv,
                    $qtyremain,
                    $NoSatuan,
                    $SJ,
                    $idSup,
                    $pUnit,
                    $pPPN,
                    $noTrans,
                    $Kd_div,
                    $kurs,
                    $Operator,
                    $pIDRUnit,
                    $pIDRPPN,
                    $NoPIB,
                    $NoPO,
                    $BTTB,
                    $pSub,
                    $pIDRSub,
                    $pTot,
                    $pIDRTot,
                    $NoPIBExt,
                    $TglPIB,
                    $NoSPPBBC,
                    $TglSPPBBC,
                    $NoSKBM,
                    $TglSKBM,
                    $NoReg,
                    $TglReg,
                    $idPPN,
                    $jumPPN,
                    $persen,
                    $disc,
                    $discIDR,
                    $mtUang,
                    $KodeHS,
                    $noTrTmp
                ]);
                Log::info(json_encode($request->all()) . ' | ' . $post);
                return Response()->json(['message' => 'Data Berhasil Post', 'Status' => $post]);
            } catch (\Throwable $Error) {
                Log::error($Error->getMessage());
                return response()->json(['error' => $Error->getMessage()], 500);
            }
        } else {
            return response()->json(['error' => 'Parameter BTTB harus di isi'], 400);
        }
    }

    public function print(Request $request)
    {
        $No_BTTB = $request->input('No_BTTB');
        if (($No_BTTB !== null)) {
            try {
                $print = DB::connection('ConnPurchase')->table('VW_5409_PRINT_BTTB')->where('VW_5409_PRINT_BTTB.No_BTTB', $No_BTTB)->get();
                $printHeader = DB::connection('ConnPurchase')->table('VW_5409_PRINT_HEADER_BTTB')->where('VW_5409_PRINT_HEADER_BTTB.No_BTTB', $No_BTTB)->get();

                return Response()->json(["print" => $print, "printHeader" => $printHeader]);
            } catch (\Throwable $Error) {
                return Response()->json($Error);
            }
        } else {
            return Response()->json('Parameter harus di isi');
        }
    }
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
