<?php

namespace App\Http\Controllers\Accounting\Piutang\PenjualanLokal;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Log;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class FakturUangMukaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Piutang.PenjualanLokal.FakturUangMuka', compact('access'));
        // $data = 'Accounting';
        // return view('Accounting.Piutang.PenjualanLokal.FakturUangMuka', compact('data'));
    }

    // public function getNoPenagihan($idCustomer)
    // {
    //     $data =  DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_TAGIHAN_DP]
    //     @IDCustomer = ?', [$idCustomer]);
    //     return response()->json($data);
    // }

    // public function getDataPenagihan($id_Penagihan)
    // {
    //     $IdPenagihan = str_replace('.', '/', $id_Penagihan);
    //     //dd($IdPenagihan);
    //     $data =  DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_PENAGIHAN_SJ]
    //     @Kode = ?, @Id_Penagihan = ?', [8, $IdPenagihan]);
    //     return response()->json($data);
    // }

    // public function getJenisCustomer($idJenisCustomer)
    // {
    //     $data =  DB::connection('ConnSales')->select('exec [SP_1486_ACC_LIST_JNSCUST]
    //     @IDJNSCUST = ?', [$idJenisCustomer]);
    //     return response()->json($data);
    // }

    // public function getAlamatCust($idCustomer)
    // {
    //     $data =  DB::connection('ConnSales')->select('exec [SP_1486_ACC_LIST_CUSTOMER]
    //     @IDCUST = ?', [$idCustomer]);
    //     return response()->json($data);
    // }

    // public function getNomorSP($idCustomer)
    // {
    //     $data =  DB::connection('ConnSales')->select('exec [SP_1486_ACC_LIST_HEADER_PESANAN]
    //     @KODE = ?, @IdCust = ?', [4, $idCustomer]);
    //     return response()->json($data);
    // }

    // public function getNomorPO($noSP)
    // {
    //     $data =  DB::connection('ConnSales')->select('exec [SP_1486_ACC_LIST_HEADER_PESANAN]
    //     @Kode = ?, @IDSURATPESANAN = ?', [3, $noSP]);
    //     return response()->json($data);
    // }

    // public function getUserPenagih()
    // {
    //     $user =  DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_USER_PENAGIH]
    //     @KODE = ?', [1]);
    //     return response()->json($user);
    // }

    // public function getJenisPajak()
    // {
    //     $jenis =  DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_JENIS_PAJAK]');
    //     return response()->json($jenis);
    // }

    // public function getDokumen($kode)
    // {
    //     $jenis =  DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_JENIS_DOKUMEN] @KODE = ?',[$kode]);
    //     return response()->json($jenis);
    // }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {

    }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        if ($id == 'getCustomer') {
            // Call stored procedure to get customer list
            $results = DB::connection('ConnSales')
                ->select('exec SP_1486_ACC_LIST_ALL_CUSTOMER ?', ['1']);
            // dd($results);
            // Instance to handle lookup (similar to mLook class in VB)
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'NAMACUST' => trim($row->NAMACUST),
                    'IDCust' => trim($row->IDCust),
                ];
            }

            return datatables($response)->make(true);
            // Extracting right and left parts from IDCUST
            // $TIdCustomer = substr($response[0]['IDCUST'], -5);
            // $TIdJnsCust = substr($response[0]['IDCUST'], 0, 3);

            // Call a method (similar to Lihat_Customer in VB)
            // $this->lihatCustomer($TIdCustomer);

            // Optionally handle CmdPajak (uncomment if needed)
            // if ($TIdJnsCust == "PNX") {
            //     $CmdPajakEnabled = false;
            // } else {
            //     $CmdPajakEnabled = true;
            // }
        }elseif ($id == 'getJenisCustomer') {
            $TIdCustomer = $request->input('idCustomer');

            // Eksekusi SP untuk mengambil data customer
            $customerResults = DB::connection('ConnSales')
                ->select('exec SP_1486_ACC_LIST_CUSTOMER @IDCUST = ?', [trim($TIdCustomer)]);
            // dd($customerResults);
            if (!empty($customerResults)) {
                $customer = $customerResults[0]; // Ambil record pertama
                $TIdJnsCust = $customer->JnsCust;

                // Tentukan TNamaCust dan TAlamat berdasarkan TIdJnsCust
                if ($TIdJnsCust == 'PNX') {
                    $TNamaCust = $customer->NamaCust;
                    $TAlamat = trim($customer->Alamat . ' ' . $customer->Kota);
                } else {
                    $TNamaCust = $customer->NamaNPWP ?? '';
                    $TAlamat = $customer->AlamatNPWP ?? '';
                }

                // Eksekusi SP untuk mengambil jenis customer
                $jenisCustResults = DB::connection('ConnSales')
                    ->select('exec SP_1486_ACC_LIST_JNSCUST @IDJNSCUST = ?', [trim($TIdJnsCust)]);
                dd($jenisCustResults);
                if (!empty($jenisCustResults)) {
                    $TJenisCust = $jenisCustResults[0]->namajnscust;
                }

                // Return data sebagai response (sesuaikan sesuai kebutuhan Anda)
                return response()->json([
                    'TIdJnsCust' => $TIdJnsCust,
                    'TNamaCust' => $TNamaCust,
                    'TAlamat' => $TAlamat,
                    'TJenisCust' => $TJenisCust,
                ]);
            } else {
                // Jika tidak ada hasil ditemukan
                return response()->json([
                    'error' => 'Customer not found',
                ], 404);
            }
        }
    }

    // Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request)
    {

    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {

    }
}
