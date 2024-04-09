<?php

namespace App\Http\Controllers\Beli\Master;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use App\Http\Controllers\HakAksesController;
use Illuminate\Support\Facades\Auth;
class SupplierController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {
        $supplier = DB::connection('ConnPurchase')->select('exec SP_5409_PBL_SUPPLIER @kd = ?', [1]);
        $matauang = DB::connection('ConnPurchase')->select('exec SP_7775_PBL_LIST_MATA_UANG');
        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        // dd($matauang);
        return view('Beli.Master.Supplier', compact('supplier', 'matauang', 'access'));
    }

    public function getSupplier($id)
    {
        $data = DB::connection('ConnPurchase')->select('exec SP_1273_PBL_LIST_SUPPLIER @kd = ?, @idSup = ?',[1,$id]);
        return response()->json($data);
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        $supplier_id = $request->supplier_id ?? NULL;
        $supplier_text = $request->supplier_text ?? NULL;
        $contact_person1 = $request->contact_person1 ?? NULL;
        $phone1 = $request->phone1 ?? NULL;
        $mobile_phone1 = $request->mobile_phone1 ?? NULL;
        $email1 = $request->email1 ?? NULL;
        $fax1 = $request->fax1 ?? NULL;
        $alamat1 = $request->alamat1 ?? NULL;
        $kota1 = $request->kota1 ?? NULL;
        $negara1 = $request->negara1 ?? NULL;
        $contact_person2 = $request->contact_person2 ?? NULL;
        $phone2 = $request->phone2 ?? NULL;
        $mobile_phone2 = $request->mobile_phone2 ?? NULL;
        $email2 = $request->email2 ?? NULL;
        $fax2 = $request->fax2 ?? NULL;
        $alamat2 = $request->alamat2 ?? NULL;
        $kota2 = $request->kota2 ?? NULL;
        $negara2 = $request->negara2 ?? NULL;
        $mata_uang = $request->mata_uang ?? NULL;
        $kd = $request->kode ?? NULL;
        $jnSup = 0;

        if ($mata_uang == 1) {
            $jnSup = '01';
        } else {
            $jnSup = '02';
        }
        // dd($request->all());
        DB::connection('ConnPurchase')->statement('exec SP_5409_PBL_SUPPLIER
        @kd = '.$kd.',
        @Xno_sup = \''.$supplier_id.'\',
        @Xnm_sup = \''.$supplier_text.'\',
        @Xperson1 = \''.$contact_person1.'\',
        @Xperson2 = \''.$contact_person2.'\',
        @Xtlp1 = \''.$phone1.'\',
        @Xtlp2 = \''.$phone2.'\',
        @Xhphone1 = \''.$mobile_phone1.'\',
        @Xhphone2 = \''.$mobile_phone2.'\',
        @Xtelex1 = \''.$email1.'\',
        @Xtelex2 = \''.$email2.'\',
        @Xalamat1 = \''.$alamat1.'\',
        @Xalamat2 = \''.$alamat2.'\',
        @Xkota1 = \''.$kota1.'\',
        @Xkota2 = \''.$kota2.'\',
        @Xfax1 = \''.$fax1.'\',
        @Xfax2 = \''.$fax2.'\',
        @Xnegara1 = \''.$negara1.'\',
        @Xnegara2 = \''.$negara2.'\',
        @IdUang = '.$mata_uang.',
        @jnSup = \''.$jnSup.'\'');

        if ($kd == 2) {
            return redirect()->back()->with('success', 'Data sudah tersimpan.');
        } else if ($kd == 3) {
            return redirect()->back()->with('success', 'Data Id Supplier ' . $supplier_id . ' sudah disimpan.');
        } else{
            return redirect()->back()->with('success', 'Data Id Supplier ' . $supplier_id . ' sudah dihapus.');
        }
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

    }
}
