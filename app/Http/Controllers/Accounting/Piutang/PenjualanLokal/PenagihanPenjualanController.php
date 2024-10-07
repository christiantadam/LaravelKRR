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

class PenagihanPenjualanController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Piutang.PenjualanLokal.PenagihanPenjualan', compact('access'));
    }

    public function getCustomer()
    {
        //dd("masuk");
        $data = DB::connection('ConnSales')->select('exec [SP_1486_ACC_LIST_ALL_CUSTOMER]
        @Kode = 1');
        return response()->json($data);
    }

    public function getCustomerKoreksi()
    {
        //dd("masuk");
        $data = DB::connection('ConnSales')->select('exec [SP_1486_ACC_LIST_CUSTOMER]
        @Kode = 1');
        return response()->json($data);
    }

    public function getNoPenagihanUM($noSP)
    {
        $data = DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_TAGIHAN_DP_1]
        @SuratPesanan = ?', [$noSP]);
        //dd("MASUK");
        return response()->json($data);
    }

    public function getSuratJalan($noSP)
    {
        $data = DB::connection('ConnSales')->select('exec [SP_1486_ACC_LIST_PENGIRIMAN]
        @KODE = ?, @IdSuratPesanan = ?', [1, $noSP]);
        //dd("MASUK");
        return response()->json($data);
    }

    public function getNoPenagihan($idCustomer)
    {
        $data = DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_PENAGIHAN_SJ]
        @KODE = ?, @IdCustomer = ?', [6, $idCustomer]);
        return response()->json($data);
    }

    public function getDataPenagihan($id_Penagihan)
    {
        $IdPenagihan = str_replace('.', '/', $id_Penagihan);
        //dd($IdPenagihan);
        $data = DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_PENAGIHAN_SJ]
        @Kode = ?, @Id_Penagihan = ?', [7, $IdPenagihan]);
        return response()->json($data);
    }

    public function LihatPenagihan($id_Penagihan, $idJenisPajak)
    {
        //dd("Masuk");
        $IdPenagihan = str_replace('.', '/', $id_Penagihan);
        $data1 =
            DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_PENAGIHAN_SJ]
        @Kode = ?, @Id_Penagihan = ?', [7, $IdPenagihan])
        ;
        //dd($IdPenagihan);
        $data2 =
            DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_JENIS_PAJAK]
        @KODE = ?, @Jns_PPN = ?', [1, $idJenisPajak])
        ;
        $data3 =
            DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_PENAGIHAN_SJ]
        @Kode = ?, @Id_Penagihan = ?', [19, $IdPenagihan])
        ;

        $dataAll = [
            'data1' => $data1,
            'data2' => $data2,
            'data3' => $data3
        ];
        return response()->json($dataAll);
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        //
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

            return datatables($response)->make(true);
        } else if ($id == 'getTagihanDP') {
            $suratPesanan = $request->input('no_sp');

            $results = DB::connection('ConnAccounting')
                ->select('exec SP_1486_ACC_LIST_TAGIHAN_DP_1 @SuratPesanan = ?', [$suratPesanan]);

            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Id_Penagihan' => $row->Id_Penagihan,
                    'nilai_BLM_PAJAK' => $row->nilai_BLM_PAJAK,
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getSuratJalan') {
            // Menjalankan stored procedure 'SP_1486_ACC_LIST_PENGIRIMAN'
            $kode = 1;
            $idSuratPesanan = $request->input('no_sp');

            $results = DB::connection('ConnSales')
                ->select('exec SP_1486_ACC_LIST_PENGIRIMAN @KODE = ?, @IdSuratPesanan = ?', [$kode, $idSuratPesanan]);

            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'IDPengiriman' => $row->IDPengiriman,
                    'TanggalDiterima' => \Carbon\Carbon::parse($row->TanggalDiterima)->format('m/d/Y'),
                ];
            }

            return datatables($response)->make(true);
            // Assuming we set values to variables TSuratJalan and TtglSJ similar to VB.NET
            // $TSuratJalan = $response[0]['IDPENGIRIMAN'] ?? '';
            // $TtglSJ = $response[0]['TANGGALDITERIMA'] ?? '';

            // // Cek apakah Surat Jalan sudah diinputkan
            // if (!empty($TSuratJalan)) {
            //     // Cek apakah ada dalam daftar ListSJ
            //     $listSJ = $request->input('ListSJ', []);  // Assuming ListSJ is passed in the request

            //     foreach ($listSJ as $item) {
            //         if (trim($item['TSuratJalan']) == trim($TSuratJalan) && trim($item['SubItems'][4]) == trim($idSuratPesanan)) {
            //             return response()->json(['message' => 'Data sudah diinputkan'], 200);
            //         }
            //     }

            //     // Simulasi membuka form 'FrmSuratJalan' dan memanggil fungsi 'LihatDetilSJ'
            //     $this->lihatDetilSJ($TSuratJalan, $request->input('TidCustomer'), $idSuratPesanan);

            //     return response()->json(['TSuratJalan' => $TSuratJalan, 'TtglSJ' => $TtglSJ], 200);
            // }
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
        } else if ($id == 'getCharge') {
            // Menjalankan stored procedure 'SP_1486_ACC_LIST_JENIS_DOKUMEN'
            $kode = 5;  // Hardcoded value for KODE

            $results = DB::connection('ConnAccounting')
                ->select('exec SP_1486_ACC_LIST_JENIS_DOKUMEN @KODE = ?', [$kode]);

            // Process the result
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Id_Charge' => $row->Id_Charge,
                    'Nama_Charge' => $row->Nama_Charge,
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'LihatDetilSJ') {
            // Parameters from request
            $sSuratJalan = trim($request->input('surat_jalan'));
            $sIdCust = trim($request->input('idCustomer'));
            $sSuratPesanan = trim($request->input('no_sp'));
            // dd($request->all());
            // Execute the stored procedure
            $results = DB::connection('ConnSales')
                ->select(
                    'exec SP_1486_ACC_LIST_PENGIRIMAN @Kode = ?, @IDPENGIRIMAN = ?, @IDCust = ?, @IdSuratPesanan = ?',
                    [2, $sSuratJalan, $sIdCust, $sSuratPesanan]
                );
            // dd($results);
            // Initialize variables
            $response = [];
            $total = 0;

            foreach ($results as $row) {
                // Build the response array similar to ListSJ in VB.NET
                $response[] = [
                    'NamaBarang' => $row->NamaBarang,
                    'JmlTerimaUmum' => ($row->JmlTerimaUmum == floor($row->JmlTerimaUmum)) ? 0 : $row->JmlTerimaUmum,
                    'HargaSatuan' => $row->HargaSatuan,
                    'Satuan' => $row->Satuan,
                    'Total' => number_format($row->Total, 2),
                ];
                // Calculate total
                // $total += $row->total;
            }

            // Return the response with total amount
            return datatables($response)->make(true);
            // return response()->json([
            //     'data' => $response,
            //     'total' => number_format($total, 2)
            // ]);
        } else if ($id == 'TotalDetailSJ') {
            // Parameters from request
            $sSuratJalan = trim($request->input('surat_jalan'));
            $sIdCust = trim($request->input('idCustomer'));
            $sSuratPesanan = trim($request->input('no_sp'));
            // dd($request->all());
            // Execute the stored procedure
            $results = DB::connection('ConnSales')
                ->select(
                    'exec SP_1486_ACC_LIST_PENGIRIMAN @Kode = ?, @IDPENGIRIMAN = ?, @IDCust = ?, @IdSuratPesanan = ?',
                    [2, $sSuratJalan, $sIdCust, $sSuratPesanan]
                );
            // dd($results);
            // Initialize variables
            $response = [];
            $total = 0;

            foreach ($results as $row) {
                // Build the response array similar to ListSJ in VB.NET
                $response[] = [
                    'Total' => number_format($row->Total, 2),
                ];
                // Calculate total
                $total += $row->Total;
            }

            // Return the response with total amount
            // return datatables($response)->make(true);
            return response()->json(['total' => number_format($total, 2)
            ]);
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
        //
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
