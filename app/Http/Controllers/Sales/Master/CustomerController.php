<?php

namespace App\Http\Controllers\Sales\Master;

use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\Auth;
use App\Models\Sales\Customer;
use App\Models\JnsCust;
use App\Http\Controllers\HakAksesController;
use App\Http\Controllers\Controller;

class CustomerController extends Controller
{

    // Display a listing of the resource.
    public function index()
    {
        //get all customer from models
        $data = Customer::get()->where('IsActive', 1);
        $access = (new HakAksesController)->HakAksesFiturMaster();
        // dd($data->all());
        //return data to view
        return view('Sales.Master.Customer.Index', compact('data','access'));
    }

    // Show the form for creating a new resource.
    public function create()
    {
        $model = new Customer;
        $jnscust = db::connection('ConnSales')->select('select * from T_JnsCust');
        $access = (new HakAksesController)->HakAksesFiturMaster();
        // dd($jnscust);
        return view('Sales.Master.Customer.Create', compact('model', 'jnscust','access'));
    }

    // Store a newly created resource in storage.
    public function store(Request $request)
    {
        $request->validate([
            'KodeCust' => 'required',
            'NamaCust' => 'required',
        ]);
        $User = Auth::user()->NomorUser;
        $KodeCust = $request->KodeCust ?? NULL;
        $JnsCust = $request->JnsCust ?? NULL;
        $NamaCust = $request->NaaCus;
        $NPWP = $request->NPWP ?? NULL;
        $LimitBeli = $request->LimitBeli ?? 0;
        $ContactPerson = $request->ContactPerson ?? NULL;
        $AlamatKirim = $request->AlamatKirim ?? NULL;
        $Alamat = $request->Alamat ?? NULL;
        $Kota = $request->Kota ?? NULL;
        $Propinsi = $request->Propinsi ?? NULL;
        $Negara = $request->Negara ?? NULL;
        $KodePos = $request->KodePos ?? NULL;
        $NoTelp1 = $request->NoTelp1 ?? NULL;
        $NoTelp2 = $request->NoTelp2 ?? NULL;
        $NoFax1 = $request->NoFax1 ?? NULL;
        $NoFax2 = $request->NoFax2 ?? NULL;
        $NoHp1 = $request->NoHp1 ?? NULL;
        $NoHp2 = $request->NoHp2 ?? NULL;
        $NoTelex = $request->NoTelex ?? NULL;
        $Email = $request->Email ?? NULL;
        $NamaNPWP = $request->NamaNPWP ?? NULL;
        $AlamatNPWP = $request->AlamatNPWP ?? NULL;
        $KotaKirim = $request->KotaKirim ?? NULL;

        DB::connection('ConnSales')->statement('exec SP_1486_SLS_PROSES_INS_CUSTOMER @KodeCust = ?,
        @JnsCust = ? ,
        @NamaCust = ? ,
        @NPWP = ? ,
        @LimitBeli = ?,
        @ContactPerson = ?,
        @AlamatKirim = ?,
        @Alamat = ?,
        @Kota = ?,
        @Propinsi = ?,
        @Negara = ?,
        @KodePos = ?,
        @NoTelp1 = ?,
        @NoTelp2 = ?,
        @NoFax1 = ?,
        @NoFax2 = ?,
        @NoHp1 = ?,
        @NoHp2 = ?,
        @NoTelex = ?,
        @Email = ?,
        @NamaNPWP = ?,
        @AlamatNPWP = ?,
        @KotaKirim = ?,
        @User_id = ?',
            [
                $KodeCust,
                $JnsCust,
                $NamaCust,
                $NPWP,
                $LimitBeli,
                $ContactPerson,
                $AlamatKirim,
                $Alamat,
                $Kota,
                $Propinsi,
                $Negara,
                $KodePos,
                $NoTelp1,
                $NoTelp2,
                $NoFax1,
                $NoFax2,
                $NoHp1,
                $NoHp2,
                $NoTelex,
                $Email,
                $NamaNPWP,
                $AlamatNPWP,
                $KotaKirim,
                $User
            ]
        );

        echo "<script type='text/javascript'>alert('Data Berhasil disimpan') ;</script>";
        echo "<script type='text/javascript'>window.close();</script>";
        //return view('Sales.Master.Customer.Index')->with(['success' => 'Data berhasil disimpan!']);
    }

    //Show the form for editing the specified resource.
    public function edit($id)
    {
        $model = Customer::find($id);
        // $jnscust = JnsCust::get();
        // dd($model);
        $jnscust = db::connection('ConnSales')->select('select * from T_JnsCust');
        $access = (new HakAksesController)->HakAksesFiturMaster();
        return view('Sales.Master.Customer.edit', compact('model', 'jnscust','access'));
    }

    // Update the specified resource in storage.
    public function update(Request $request, $id)
    {
        $request->validate([
            'KodeCust' => 'required',
            'NamaCust' => 'required',
        ]);
        $User = Auth::user()->NomorUser;
        $JnsCust = $request->JnsCust ?? "NULL";
        $NamaCust = $request->NamaCust;
        $NPWP = $request->NPWP ?? NULL;
        $LimitBeli = $request->LimitBeli ?? 0;
        $ContactPerson = $request->ContactPerson ?? NULL;
        $AlamatKirim = $request->AlamatKirim ?? NULL;
        $Alamat = $request->Alamat ?? NULL;
        $Kota = $request->Kota ?? NULL;
        $Propinsi = $request->Propinsi ?? NULL;
        $Negara = $request->Negara ?? NULL;
        $KodePos = $request->KodePos ?? NULL;
        $NoTelp1 = $request->NoTelp1 ?? NULL;
        $NoTelp2 = $request->NoTelp2 ?? NULL;
        $NoFax1 = $request->NoFax1 ?? NULL;
        $NoFax2 = $request->NoFax2 ?? NULL;
        $NoHp1 = $request->NoHp1 ?? NULL;
        $NoHp2 = $request->NoHp2 ?? NULL;
        $NoTelex = $request->NoTelex ?? NULL;
        $Email = $request->Email ?? NULL;
        $NamaNPWP = $request->NamaNPWP ?? NULL;
        $AlamatNPWP = $request->AlamatNPWP ?? NULL;
        $KotaKirim = $request->KotaKirim ?? " ";
        //dd($request->all());

        //kurang parameter di sql server tentang inisial cust
        DB::connection('ConnSales')->statement('exec SP_1486_SLS_UDT_CUSTOMER @IdCust = ?,
        @NamaCust = ?,
        @NPWP = ?,
        @LimitBeli = ?,
        @ContactPerson = ?,
        @AlamatKirim = ?,
        @Alamat = ?,
        @Kota = ?,
        @Propinsi = ?,
        @Negara = ?,
        @KodePos = ?,
        @NoTelp1 = ?,
        @NoTelp2 = ?,
        @NoFax1 = ?,
        @NoFax2 = ?,
        @NoHp1 = ?,
        @NoHp2 = ?,
        @NoTelex = ?,
        @Email = ?,
        @NamaNPWP = ?,
        @AlamatNPWP = ?,
        @KotaKirim = ?,
        @User_id = ?',
            [
                $id,
                $NamaCust,
                $NPWP,
                $LimitBeli,
                $ContactPerson,
                $AlamatKirim,
                $Alamat,
                $Kota,
                $Propinsi,
                $Negara,
                $KodePos,
                $NoTelp1,
                $NoTelp2,
                $NoFax1,
                $NoFax2,
                $NoHp1,
                $NoHp2,
                $NoTelex,
                $Email,
                $NamaNPWP,
                $AlamatNPWP,
                $KotaKirim,
                $User
            ]
        );

        echo "<script type='text/javascript'>alert('Data Berhasil diubah') ;</script>";
        echo "<script type='text/javascript'>window.close() ;</script>";
        //return view('Sales.Master.Customer.Index')->with(['success' => 'Data berhasil diubah!']);
    }

    // Display the specified resource.
    public function show($id)
    {
        $data = Customer::select('*')->join('T_JnsCust', 'IDJnsCust', 'JnsCust')->where('IDCust', $id)->first();
        // $jnsCust = JnsCust::select('*')->where('IDJnsCust', $data->JnsCust);
        return compact('data');
    }

    // Remove the specified resource from storage.
    public function destroy($id)
    {
        //Update data IsActive
        DB::connection('ConnSales')->statement('exec SP_4384_SLS_MASTER @XKode = ?,
        @XIDCust = ?', [1, $id]);
        return redirect()->route('Customer.index'); //->with(['success' => 'Data berhasil dihapus!']);
    }
}
