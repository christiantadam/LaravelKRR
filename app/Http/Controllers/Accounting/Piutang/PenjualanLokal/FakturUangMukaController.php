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
        } else if ($id == 'getJenisCustomer') {
            $TIdCustomer = $request->input('idCustomer');

            $customerResults = DB::connection('ConnSales')
                ->select('exec SP_1486_ACC_LIST_CUSTOMER @IDCUST = ?', [trim($TIdCustomer)]);
            // dd($customerResults);
            if (!empty($customerResults)) {
                $customer = $customerResults[0];
                $TIdJnsCust = $customer->JnsCust;

                if ($TIdJnsCust == 'PNX') {
                    $TNamaCust = $customer->NamaCust;
                    $TAlamat = trim((string) $customer->Alamat . ' ' . $customer->Kota);
                } else {
                    $TNamaCust = $customer->NamaNPWP ?? '';
                    $TAlamat = $customer->AlamatNPWP ?? '';
                }

                $jenisCustResults = DB::connection('ConnSales')
                    ->select('exec SP_1486_ACC_LIST_JNSCUST @IDJNSCUST = ?', [trim($TIdJnsCust)]);
                // dd($jenisCustResults);
                if (!empty($jenisCustResults)) {
                    $TJenisCust = $jenisCustResults[0]->NamaJnsCust;
                }

                return response()->json([
                    'TIdJnsCust' => $TIdJnsCust,
                    'TNamaCust' => $TNamaCust,
                    'TAlamat' => $TAlamat,
                    'TJenisCust' => $TJenisCust,
                ]);
            } else {
                return response()->json(['error' => 'Customer not found',]);
            }
        } else if ($id == 'getPenagihan') {
            // Call the stored procedure with the customer ID
            $customerId = $request->input('TidCustomer');
            $results = DB::connection('ConnAccounting')
                ->select('exec SP_1486_ACC_LIST_TAGIHAN_DP @IDCustomer = ?', [$customerId]);
            // dd($results);
            // Processing the results for the lookup
            $mLook = [];
            foreach ($results as $row) {
                $mLook[] = [
                    'Tgl_Penagihan' => $row->Tgl_Penagihan,
                    'Id_Penagihan' => $row->Id_Penagihan
                ];
            }

            return datatables($mLook)->make(true);
            // Assuming there's some way to return the selected `ID_PENAGIHAN`
            // if (!empty($mLook)) {
            //     $selectedPenagihan = $mLook[0]['ID_PENAGIHAN']; // Mock selecting the first row for now
            //     // Continue with logic similar to VB.NET code
            //     if (!empty($selectedPenagihan)) {
            //         $this->lihatPenagihan($selectedPenagihan); // Assuming this is a method for viewing the invoice

            //         if ($request->input('EditMode') == true) {
            //             // Set focus on TglFakturPajak input
            //             return response()->json(['focus' => 'TglFakturPajak']);
            //         } elseif ($request->input('DelMode') == true) {
            //             // Set focus on CmdISI button
            //             return response()->json(['focus' => 'CmdISI']);
            //         }
            //     }
            // }
        } else if ($id == 'getPesanan') {
            if (empty($request->input('IdPenagihan'))) {

                $customerId = $request->input('idCustomer');
                $results = DB::connection('ConnSales')
                    ->select('exec SP_1486_ACC_LIST_HEADER_PESANAN @KODE = ?, @IdCust = ?', [4, $customerId]);
                // dd($results);
                $mLook = [];
                foreach ($results as $row) {
                    $mLook[] = [
                        'IDSuratPesanan' => $row->IDSuratPesanan,
                        'Tgl_Pesan' => \Carbon\Carbon::parse($row->Tgl_Pesan)->format('m/d/Y'),
                    ];
                }
                return datatables($mLook)->make(true);

            }
        } else if ($id == 'getPesananDetails') {
            // Initialize variables
            $TPO = '';
            $TIdMataUang = '';
            $TMataUang = '';
            $sNoSP = $request->input('no_sp');
            // dd($sNoSP);
            try {
                // Fetch order details using SP_1486_ACC_LIST_HEADER_PESANAN
                $orderResults = DB::connection('ConnSales')
                    ->select('exec SP_1486_ACC_LIST_HEADER_PESANAN @Kode = ?, @IDSURATPESANAN = ?', [3, $sNoSP]);
                // dd($orderResults);
                if (count($orderResults) > 0) {
                    $order = $orderResults[0];
                    $TIdMataUang = $order->IDMataUang;
                    $TsyaratPembayaran = $order->SyaratBayar ?? 0;
                    $TPO = $order->NO_PO ?? '';

                    // Map currency code to a numeric value
                    if ($TIdMataUang == 'IDR') {
                        $TIdMataUang = 1;
                    } elseif ($TIdMataUang == 'USD') {
                        $TIdMataUang = 2;
                    }
                }

                // Fetch currency details using SP_1486_ACC_LIST_MATAUANG
                $currencyResults = DB::connection('ConnAccounting')
                    ->select('exec SP_1486_ACC_LIST_MATAUANG @Kode = ?, @IdMataUang = ?', [2, $TIdMataUang]);
                // dd($currencyResults);
                if (count($currencyResults) > 0) {
                    $TMataUang = $currencyResults[0]->Nama_MataUang;
                }

                // Determine if 'TKurs' field should be enabled
                // $TKursEnabled = ($TIdMataUang != 1);

                return response()->json([
                    'TPO' => $TPO,
                    'TIdMataUang' => $TIdMataUang,
                    'TMataUang' => $TMataUang,
                    // 'TKursEnabled' => $TKursEnabled,
                ]);
            } catch (Exception $e) {
                return response()->json(['error' => $e->getMessage()]);
            }
        } else if ($id == 'getPenagih') {
            $results = DB::connection('ConnAccounting')
                ->select('exec SP_1486_ACC_LIST_USER_PENAGIH @KODE = ?', [1]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Nama' => trim($row->Nama),
                    'IdUser' => trim($row->IdUser),
                ];
            }

            // Return as a datatable
            return datatables($response)->make(true);

        } else if ($id == 'getPajak') {
            // Execute the stored procedure to list jenis pajak
            $results = DB::connection('ConnAccounting')
                ->select('exec SP_1486_ACC_LIST_JENIS_PAJAK');
            // dd($results);
            // Prepare the response array
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Nama_Jns_PPN' => trim($row->Nama_Jns_PPN),
                    'Jns_PPN' => trim($row->Jns_PPN),
                ];
            }

            // Return the result as a datatable
            return datatables($response)->make(true);
        } else if ($id == 'getDokumen') {
            $kode = trim($request->input('id_cust')) == 'NPX' ? 3 : 2;

            $results = DB::connection('ConnAccounting')
                ->select('exec SP_1486_ACC_LIST_JENIS_DOKUMEN @KODE = ?', [$kode]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Nama_Dokumen' => trim($row->Nama_Dokumen),
                    'Id_Jenis_Dokumen' => trim($row->Id_Jenis_Dokumen),
                ];
            }

            // Return the response as a datatable
            return datatables($response)->make(true);
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
