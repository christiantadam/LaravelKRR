<?php

namespace App\Http\Controllers\Accounting\Piutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Log;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class NotaPenjualanTunaiController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Piutang.NotaPenjualanTunai', compact('access'));
    }

    // public function getLihatPesanan($noSP)
    // {
    //     $data = DB::connection('ConnSales')->select('exec [SP_1486_ACC_LIST_HEADER_PESANAN]
    //     @Kode = ?, @IDSURATPESANAN = ?', [3, $noSP]);
    //     return response()->json($data);
    // }

    // public function getNotaJualTunai($noSP)
    // {
    //     $data = DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_PENAGIHAN_SJ]
    //     @KODE = ?, @SURATPESANAN = ?', [22, $noSP]);
    //     return response()->json($data);
    // }

    // public function getNotaJualTunai2($noSP)
    // {
    //     $data = DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_PENAGIHAN_SJ]
    //     @KODE = ?, @SURATPESANAN = ?', [13, $noSP]);
    //     return response()->json($data);
    // }

    // public function getUserPenagihNota()
    // {
    //     $data = DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_USER_PENAGIH]
    //     @KODE = ?', [1]);
    //     return response()->json($data);
    // }

    // public function getDokumenNota($kode)
    // {
    //     $jenis = DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_JENIS_DOKUMEN] @KODE = ?', [$kode]);
    //     return response()->json($jenis);
    // }

    // public function getJenisPajakNota()
    // {
    //     $jenis = DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_JENIS_PAJAK]');
    //     return response()->json($jenis);
    // }

    // public function getNoPenagihanUMNota($noSP)
    // {
    //     $jenis = DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_TAGIHAN_DP_1] @SuratPesanan = ?', [$noSP]);
    //     return response()->json($jenis);
    // }

    // public function getNoPenagihan()
    // {
    //     $jenis = DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_PENAGIHAN_SJ] @KODE = ?', [14]);
    //     return response()->json($jenis);
    // }

    // public function getJenisCust($idCustomer)
    // {
    //     $jenis = DB::connection('ConnSales')->select('exec [SP_1486_ACC_LIST_CUSTOMER] @IDCUST = ?', [$idCustomer]);
    //     return response()->json($jenis);
    // }

    // public function getJnsCust($idJenisCustomer)
    // {
    //     $jenis = DB::connection('ConnSales')->select('exec [SP_1486_ACC_LIST_JNSCUST] @IDJNSCUST = ?', [$idJenisCustomer]);
    //     return response()->json($jenis);
    // }

    // public function getLihatSP($id_Penagihan)
    // {
    //     $idNoPenagihan = str_replace('.', '/', $id_Penagihan);

    //     $jenis = DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_PENAGIHAN_SJ] @KODE = 15, @ID_PENAGIHAN = ?', [$idNoPenagihan]);
    //     return response()->json($jenis);
    // }

    // public function getDataSP($noSP)
    // {
    //     $jenis = DB::connection('ConnSales')->select('exec [SP_1486_ACC_LIST_HEADER_PESANAN] @KODE = 3, @IDSURATPESANAN = ?', [$noSP]);
    //     return response()->json($jenis);
    // }

    // public function getLihatPenagihan($id_Penagihan)
    // {
    //     $idNoPenagihan = str_replace('.', '/', $id_Penagihan);
    //     $jenis = DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_PENAGIHAN_SJ] @KODE = 7, @ID_PENAGIHAN = ?', [$idNoPenagihan]);
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
                    // $Syarat$order->SyaratBayar

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
                    'TsyaratPembayaran' => $TsyaratPembayaran,
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
        //
    }
}
