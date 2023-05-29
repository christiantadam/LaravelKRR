<?php

namespace App\Http\Controllers\Beli\TransaksiBeli;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Illuminate\Support\Facades\Auth;

class PurchaseOrderController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {

        return view('Beli.TransaksiBeli.PurchaseOrder.List');

    }

    //Show the form for creating a new resource.
    public function create()
    {
        $divisi = db::connection('ConnPurchase')->select('exec spSelect_UserDivisi_dotNet @kd = ?, @Operator = ?', [1, Auth::user()->kd_user]);
        // dd($divisi);
        return view('Beli.TransaksiBeli.PurchaseOrder.Create', compact('divisi'));
    }

    public function getPermohonanDivisi($stBeli, $Kd_Div)
    {
        $data = db::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @kd = ?, @stBeli = ?, @Kd_Div = ?', [12, $stBeli, $Kd_Div]);
        return response()->json($data);
    }

    public function getPermohonanUser($requester)
    {
        $data = db::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @kd = ?, @requester = ?', [12, $requester]);
        return response()->json($data);
    }

    public function getPermohonanOrder($noTrans)
    {
        $data = db::connection('ConnPurchase')->select('exec SP_5409_LIST_ORDER @kd = ?, @noTrans = ?', [12, $noTrans]);
        return response()->json($data);
    }

    public function openFormCreateSPPB($noTrans)
    {
        dd($noTrans);
        $getNoPO = db::connection('ConnPurchase')->select('exec SP_5409_MAINT_PO @kd = ?', [1]);

        for ($i = 0; $i < count($noTrans); $i++) {
            db::connection('ConnPurchase')->statement('exec SP_5409_MAINT_PO
            @kd = ?,
            @noTrans = ?,
            @noPO = ?,
            @Operator = ?',
                [
                    2,
                    $noTrans[$i],
                    $getNoPO,
                    Auth::user()->kd_user,
                ]
            );
        }

        return view('Beli.TransaksiBeli.PurchaseOrder.CreateSPPB');
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
