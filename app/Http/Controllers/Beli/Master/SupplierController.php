<?php

namespace App\Http\Controllers\Beli\Master;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Session;
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
        return view('Beli.Master.Supplier.Index', compact('access'));
    }

    function getallsupplier(Request $request)
    {
        if (!$request->isMethod('post')) {
            // Handle invalid method, e.g., return an error response
            return response()->json(['error' => 'Invalid request method'], 405);
        }
        $columns = array(
            0 => 'NO_SUP',
            1 => 'NM_SUP',
            2 => 'ALAMAT1',
            3 => 'KOTA1',
            4 => 'NEGARA1',
        );

        $totalData = DB::connection('ConnPurchase')->table('YSUPPLIER')
            ->where('IsActive', 1)
            ->count();

        $totalFiltered = $totalData;

        $limit = $request->input('length');
        $start = $request->input('start');
        $order = $columns[$request->input('order.0.column')];
        $dir = $request->input('order.0.dir');

        $query = DB::connection('ConnPurchase')->table('YSUPPLIER')
            ->select(
                'NO_SUP',
                'NM_SUP',
                'ALAMAT1',
                'KOTA1',
                'NEGARA1',
            )
            ->where('IsActive', 1);

        if (!empty($request->input('search.value'))) {
            $search = $request->input('search.value');
            $query->where('NO_SUP', 'LIKE', "%{$search}%")
                ->orWhere('NM_SUP', 'LIKE', "%{$search}%")
                ->orWhere('NEGARA1', 'LIKE', "%{$search}%")
                ->orWhere('KOTA1', 'LIKE', "%{$search}%")
                ->orWhere('ALAMAT1', 'LIKE', "%{$search}%");

            $totalFiltered = $query->count();
        }

        $supplier = $query->offset($start)
            ->limit($limit)
            ->orderBy($order, $dir)
            ->get();

        $data = array();
        if (!empty($supplier)) {
            foreach ($supplier as $datasupplier) {
                $nestedData['NO_SUP'] = $datasupplier->NO_SUP;
                $nestedData['NM_SUP'] = $datasupplier->NM_SUP;
                $nestedData['NEGARA1'] = $datasupplier->NEGARA1;
                $nestedData['KOTA1'] = $datasupplier->KOTA1;
                $nestedData['ALAMAT1'] = $datasupplier->ALAMAT1;
                // $idcust = explode(' - ', $datasupplier->IDCustomer);
                $csrfToken = Session::get('_token');
                $nestedData['Actions'] = "
                                        <div style='display: flex'>
                                            <button class=\"btn btn-sm btn-info\" onclick=\"openNewWindow('/Supplier/" . $datasupplier->NO_SUP . "/edit')\">
                                                &#x270E; Edit
                                            </button>
                                            <br>
                                            <form onsubmit=\"return confirm('Apakah Anda Yakin ?');\"action=\"/Supplier/\" method=\"POST\" enctype=\"multipart/form-data\">
                                                <button type=\"submit\" class=\"btn btn-sm btn-danger\">
                                                    <span>&#x1F5D1;</span>Hapus
                                                </button>
                                                <input type=\"hidden\" name=\"_token\" value=\"" . $csrfToken . "\">
                                                <input type=\"hidden\" name=\"kode\" value=\"4\">
                                                <input type=\"hidden\" name=\"supplier_id\" value=\"" . $datasupplier->NO_SUP . "\">
                                            </form>
                                        </div>";
                // $nestedData['Actions'] = "<button class=\"btn btn-info\" onclick=\"openNewWindow('/Customer/" . $idcust[0] . "/edit')\">&#x270E; EDIT</button>";
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

    public function getSupplier($id)
    {
        $data = DB::connection('ConnPurchase')->select('exec SP_1273_PBL_LIST_SUPPLIER @kd = ?, @idSup = ?', [1, $id]);
        return response()->json($data);
    }

    //Show the form for creating a new resource.
    public function create()
    {
        $supplier = DB::connection('ConnPurchase')->select('exec SP_5409_PBL_SUPPLIER @kd = ?', [1]);
        $matauang = DB::connection('ConnPurchase')->select('exec SP_7775_PBL_LIST_MATA_UANG');
        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        return view('Beli.Master.Supplier.Create', compact('supplier', 'matauang', 'access'));
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        $data = [
            'kd' => $request->kode ?? NULL,
            'Xno_sup' => $request->supplier_id ?? NULL,
            'Xnm_sup' => $request->supplier_text ?? NULL,
            'Xperson1' => $request->contact_person1 ?? NULL,
            'Xperson2' => $request->contact_person2 ?? NULL,
            'Xtlp1' => $request->phone1 ?? NULL,
            'Xtlp2' => $request->phone2 ?? NULL,
            'Xhphone1' => $request->mobile_phone1 ?? NULL,
            'Xhphone2' => $request->mobile_phone2 ?? NULL,
            'Xtelex1' => $request->email1 ?? NULL,
            'Xtelex2' => $request->email2 ?? NULL,
            'Xalamat1' => $request->alamat1 ?? NULL,
            'Xalamat2' => $request->alamat2 ?? NULL,
            'Xkota1' => $request->kota1 ?? NULL,
            'Xkota2' => $request->kota2 ?? NULL,
            'Xfax1' => $request->fax1 ?? NULL,
            'Xfax2' => $request->fax2 ?? NULL,
            'Xnegara1' => $request->negara1 ?? NULL,
            'Xnegara2' => $request->negara2 ?? NULL,
            'IdUang' => $request->mata_uang ?? 0,
            'jnSup' => ($request->mata_uang ?? 0) == 1 ? '01' : '02',
        ];

        DB::connection('ConnPurchase')->statement("
        EXEC SP_5409_PBL_SUPPLIER
            @kd = :kd,
            @Xno_sup = :Xno_sup,
            @Xnm_sup = :Xnm_sup,
            @Xperson1 = :Xperson1,
            @Xperson2 = :Xperson2,
            @Xtlp1 = :Xtlp1,
            @Xtlp2 = :Xtlp2,
            @Xhphone1 = :Xhphone1,
            @Xhphone2 = :Xhphone2,
            @Xtelex1 = :Xtelex1,
            @Xtelex2 = :Xtelex2,
            @Xalamat1 = :Xalamat1,
            @Xalamat2 = :Xalamat2,
            @Xkota1 = :Xkota1,
            @Xkota2 = :Xkota2,
            @Xfax1 = :Xfax1,
            @Xfax2 = :Xfax2,
            @Xnegara1 = :Xnegara1,
            @Xnegara2 = :Xnegara2,
            @IdUang = :IdUang,
            @jnSup = :jnSup
    ", $data);

        $kd = $data['kd'];
        $supplier_id = $data['Xno_sup'];

        if ($kd == 2) {
            return redirect()->back()->with('success', 'Data sudah tersimpan.');
        } else if ($kd == 3) {
            return redirect()->back()->with('success', 'Data Id Supplier ' . $supplier_id . ' sudah disimpan.');
        } else {
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
        $data = DB::connection('ConnPurchase')->select('exec SP_1273_PBL_LIST_SUPPLIER @kd = ?, @idSup = ?', [1, $id]);
        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        $matauang = DB::connection('ConnPurchase')->select('exec SP_7775_PBL_LIST_MATA_UANG');
        // dd($data, $matauang);
        return view('Beli.Master.Supplier.Edit', compact('data', 'access', 'matauang'));
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
