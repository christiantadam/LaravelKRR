<?php

namespace App\Http\Controllers\Beli\TransaksiBeli;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class PurchaseOrderController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        return view('Beli.TransaksiBeli.PurchaseOrder.List', compact('access'));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        $divisi = db::connection('ConnPurchase')->select('exec spSelect_UserDivisi_dotNet @kd = ?, @Operator = ?', [1, Auth::user()->kd_user]);
        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        // dd($divisi);
        return view('Beli.TransaksiBeli.PurchaseOrder.Create', compact('divisi', 'access'));
    }

    public function getPermohonanDivisi($stBeli, $Kd_Div)
    {
        $data = db::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @kd = ?, @stBeli = ?, @Kd_Div = ?', [12, $stBeli, $Kd_Div]);
        return response()->json($data);
    }

    public function getPermohonanUser($requester)
    {
        $data = db::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @kd = ?, @requester = ?', [29, $requester]);
        return response()->json($data);
    }

    public function getPermohonanOrder($noTrans)
    {
        $data = db::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @kd = ?, @noTrans = ?', [30, $noTrans]);
        return response()->json($data);
    }

    public function openFormCreateSPPB(Request $request)
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        $noTrans = explode(',', $request->noTrans);
        $tahun = date('y', time());
        $mValue = DB::connection('ConnPurchase')->select('SELECT NO_SPPB FROM YCounter');
        $No_PO = '000000' . strval($mValue[0]->NO_SPPB);
        $No_PO = 'PO-' . $tahun . substr($No_PO, -6);
        DB::connection('ConnPurchase')->statement('update ycounter set NO_SPPB =' . $mValue[0]->NO_SPPB . '+ 1');
        // dd($No_PO);


        for ($i = 0; $i < count($noTrans); $i++) {
            db::connection('ConnPurchase')->statement('exec SP_5409_MAINT_PO
            @kd = ?,
            @noTrans = ?,
            @noPO = ?,
            @Operator = ?',
                [
                    2,
                    $noTrans[$i],
                    $No_PO,
                    Auth::user()->kd_user,
                ]
            );
        }

        $loadHeader = db::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @kd = ?, @noPO = ?', [14, $No_PO]);
        $loadPermohonan = db::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @kd = ?, @noPO = ?', [13, $No_PO]);
        $supplier = db::connection('ConnPurchase')->select('exec SP_5409_PBL_SUPPLIER @kd = ?', [1]);
        $listPayment = db::connection('ConnPurchase')->select('exec SP_5409_LIST_PAYMENT');
        $mataUang = db::connection('ConnPurchase')->select('exec SP_7775_PBL_LIST_MATA_UANG');
        $ppn = db::connection('ConnPurchase')->select('exec SP_5409_LIST_PPN');
        // dd($loadHeader, $loadPermohonan);
        return view('Beli.TransaksiBeli.PurchaseOrder.CreateSPPB', compact('access', 'supplier', 'listPayment', 'mataUang', 'ppn', 'No_PO', 'loadPermohonan', 'loadHeader'));
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
