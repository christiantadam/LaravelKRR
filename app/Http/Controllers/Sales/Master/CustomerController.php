<?php

namespace App\Http\Controllers\Sales\Master;

use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\Auth;
use App\Models\Sales\Customer;
use App\Models\JnsCust;
use App\Http\Controllers\HakAksesController;
use App\Http\Controllers\Controller;
use Session;

class CustomerController extends Controller
{

    // Display a listing of the resource.
    public function index()
    {
        $model = new Customer;
        $jnscust = db::connection('ConnSales')->select('select * from T_JnsCust');
        $access = (new HakAksesController)->HakAksesFiturMaster('Sales');
        // dd($model);
        //return data to view
        return view('Sales.Master.Customer.Index', compact('access', 'model', 'jnscust'));
    }

    function getallcustomer(Request $request)
    {
        if (!$request->isMethod('post')) {
            // Handle invalid method, e.g., return an error response
            return response()->json(['error' => 'Invalid request method'], 405);
        }
        $columns = array(
            0 => 'IdCustomer',
            1 => 'Nama Customer',
            2 => 'Kota Kirim',
            3 => 'Negara',
            4 => 'Action',
        );

        $totalData = DB::connection('ConnSales')->table('T_Customer')
            ->where('IsActive', 1)
            ->count();

        $totalFiltered = $totalData;

        $limit = $request->input('length');
        $start = $request->input('start');
        $order = $columns[$request->input('order.0.column')];
        $dir = $request->input('order.0.dir');

        $query = DB::connection('ConnSales')->table('T_Customer')
            ->select(
                DB::connection('ConnSales')->table('T_Customer')->raw("IDCust + ' - ' + JnsCust AS IDCustomer"),
                DB::connection('ConnSales')->table('T_Customer')->raw("NamaCust + ' (' + ISNULL(AlamatKirim, '') + ') ' AS NamaCustomer"),
                'KotaKirim',
                'Negara'
            )
            // ->select('IDCust', 'Kota')
            ->where('IsActive', 1);

        if (!empty($request->input('search.value'))) {
            $search = $request->input('search.value');
            $query->where('IDCust', 'LIKE', "%{$search}%")
                ->orWhere('JnsCust', 'LIKE', "%{$search}%")
                ->orWhere('NamaCust', 'LIKE', "%{$search}%")
                ->orWhere('AlamatKirim', 'LIKE', "%{$search}%")
                ->orWhere('KotaKirim', 'LIKE', "%{$search}%")
                ->orWhere('Negara', 'LIKE', "%{$search}%");

            $totalFiltered = $query->count();
        }

        $customer = $query->offset($start)
            ->limit($limit)
            ->orderBy($order, $dir)
            ->get();

        $data = array();
        if (!empty($customer)) {
            foreach ($customer as $datacustomer) {
                $nestedData['IDCustomer'] = $datacustomer->IDCustomer;
                $nestedData['NamaCustomer'] = $datacustomer->NamaCustomer;
                $nestedData['KotaKirim'] = $datacustomer->KotaKirim;
                $nestedData['Negara'] = $datacustomer->Negara;
                $idcust = explode(' - ', $datacustomer->IDCustomer);
                $csrfToken = $request->_token;
                // $nestedData['Actions'] = "<button class=\"btn btn-sm btn-info\" onclick=\"openEditModal('" . $idcust[0] . "')\">&#x270E; Edit</button>
                //           <br>
                //           <form onsubmit=\"return confirm('Apakah Anda Yakin ?');\" action=\"/Customer/" . $idcust[0] . "\" method=\"POST\" enctype=\"multipart/form-data\">
                //               <button type=\"submit\" class=\"btn btn-sm btn-danger\"><span>&#x1F5D1;</span> Hapus</button>
                //               <input type=\"hidden\" name=\"_token\" value=\"" . $csrfToken . "\">
                //           </form>";
                $nestedData['Actions'] = "<button class=\"btn btn-sm btn-info\" data-bs-toggle=\"modal\" data-bs-target=\"#modalCustomer\"
                                            data-typeForm=\"edit\" data-idcustomer=\"" . $idcust[0] . "\">&#x270E; Edit</button>
                                            <br>
                                            <form onsubmit=\"return confirm('Apakah Anda Yakin ?');\" action=\"/Customer/" . $idcust[0] . "\" method=\"POST\" enctype=\"multipart/form-data\">
                                                <button type=\"submit\" class=\"btn btn-sm btn-danger\"><span>&#x1F5D1;</span> Hapus</button>
                                                <input type=\"hidden\" name=\"_token\" value=\"" . $csrfToken . "\">
                                            </form>";
                $data[] = $nestedData;

            }
        }

        $json_data = array(
            "draw" => intval($request->input('draw')),
            "recordsTotal" => intval($totalData),
            "recordsFiltered" => intval($totalFiltered),
            "data" => $data
        );

        return response()->json($json_data);
    }

    // Show the form for creating a new resource.
    public function create()
    {
        $model = new Customer;
        $jnscust = db::connection('ConnSales')->select('select * from T_JnsCust');
        $access = (new HakAksesController)->HakAksesFiturMaster('Sales');
        // dd($jnscust);
        return view('Sales.Master.Customer.Create', compact('model', 'jnscust', 'access'));
    }

    // Store a newly created resource in storage.
    public function store(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'KodeCust' => 'required',
            'NamaCust' => 'required',
        ]);
        $User = Auth::user()->NomorUser;
        $KodeCust = $request->KodeCust ?? NULL;
        $JnsCust = $request->JnsCust ?? NULL;
        $NamaCust = $request->NamaCust;
        $NPWP = $request->NPWP ?? NULL;
        $LimitBeli = $request->LimitBeli ?? 0;
        $ContactPerson = $request->ContactPerson ?? NULL;
        $AlamatKirim = $request->AlamatKirim ?? NULL;
        $Alamat = $request->Alamat ?? NULL;
        $Kota = $request->Kota ?? NULL;
        $Propinsi = $request->Province ?? NULL;
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

        // dd($request->all());

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
        $jnscust = JnsCust::get();
        // dd($model, $jnscust);
        $jnscust = db::connection('ConnSales')->select('select * from T_JnsCust');
        $access = (new HakAksesController)->HakAksesFiturMaster('Sales');
        return view('Sales.Master.Customer.ModalCustomer', compact('model', 'jnscust', 'access'));
    }

    // Update the specified resource in storage.
    public function update(Request $request, $id)
    {
        // Validasi input
        $request->validate([
            'KodeCust' => 'required',
            'NamaCust' => 'required',
        ]);

        // Mendapatkan data dari request dan memberikan nilai default jika null
        $User = Auth::user()->NomorUser;
        $JnsCust = $request->JnsCust ?? NULL;
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

        // Eksekusi stored procedure dengan parameter yang diberikan
        DB::connection('ConnSales')->statement('exec SP_1486_SLS_UDT_CUSTOMER
        @IdCust = ?,
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

        // Redirect kembali ke halaman sebelumnya dengan pesan sukses
        return response()->json($User);
    }

    // Display the specified resource.
    public function show(Request $request, $id)
    {
        // dd($id);
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
