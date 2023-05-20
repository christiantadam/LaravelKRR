<?php

namespace App\Http\Controllers\Beli\Master;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;

class SupplierController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {
        $supplier = db::connection('ConnPurchase')->select('exec SP_5409_PBL_SUPPLIER @kd = ?', [1]);
        $matauang = db::connection('ConnPurchase')->select('exec SP_7775_PBL_LIST_MATA_UANG');
        return view('Beli.Master.Supplier', compact('supplier', 'matauang'));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        $supplier_id = $request->supplier_id;
        $supplier_text = $request->supplier_text;
        $contact_person1 = $request->contact_person1;
        $phone1 = $request->phone1;
        $mobile_phone1 = $request->mobile_phone1;
        $email1 = $request->email1;
        $fax1 = $request->fax1;
        $alamat1 = $request->alamat1;
        $kota1 = $request->kota1;
        $negara1 = $request->negara1;
        $contact_person2 = $request->contact_person2;
        $phone2 = $request->phone2;
        $mobile_phone2 = $request->mobile_phone2;
        $email2 = $request->email2;
        $fax2 = $request->fax2;
        $alamat2 = $request->alamat2;
        $kota2 = $request->kota2;
        $negara2 = $request->negara2;
        $mata_uang = $request->mata_uang;
        $kd = 0;
        $jnSup = 0;
        if ($supplier_id == "") {
            $kd = 2;
        } else {
            $kd = 3;
        }

        if ($mata_uang == 1) {
            $jnSup = '01';
        } else {
            $jnSup = '02';
        }
        db::connection('ConnPurchase')->statement('exec SP_5409_PBL_SUPPLIER
        @kd = ?,
        @Xno_sup = ?,
        @Xnm_sup = ?,
        @Xperson1 = ?,
        @Xperson2 = ?,
        @Xtlp1 = ?,
        @Xtlp2 = ?,
        @Xhphone1 = ?,
        @Xhphone2 = ?,
        @Xtelex1 = ?,
        @Xtelex2 = ?,
        @Xalamat1 = ?,
        @Xalamat2 = ?,
        @Xkota1 = ?,
        @Xkota2 = ?,
        @Xfax1 = ?,
        @Xfax2 = ?,
        @Xnegara1 = ?,
        @Xnegara2 = ?,
        @IdUang = ?,
        @jnSup = ?', [
                $kd,
                $supplier_id,
                $supplier_text,
                $contact_person1,
                $contact_person2,
                $phone1,
                $phone2,
                $mobile_phone1,
                $mobile_phone2,
                $fax1,
                $fax2,
                $alamat1,
                $alamat2,
                $kota1,
                $kota2,
                $negara1,
                $negara2,
                $mata_uang,
                $jnSup
            ]);
        dd($request->all());
        // return redirect()->back()->with('error', 'Tidak Bisa DiAcc !!!. Karena Ada Transaksi Penyesuaian yang Belum Diacc untuk Type' . $idtype);
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
        $kd = 4;
    }
}
