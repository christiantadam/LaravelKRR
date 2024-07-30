<?php

namespace App\Http\Controllers\Accounting\Hutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class PengajuanBKKController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Hutang.PengajuanBKK', compact('access'));
        // $data = 'Accounting';
        // return view('Accounting.Hutang.PengajuanBKK', compact('data'));
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
        if ($id == 'getSupplier') {
            $supplierDetails = DB::connection('ConnAccounting')
                ->select('exec SP_1273_ACC_LIST_SUPPLIER');
            $response = [];
            foreach ($supplierDetails as $row) {
                $response[] = [
                    'NM_SUP' => trim($row->NM_SUP),
                    'NO_SUP' => trim($row->NO_SUP),
                ];
            }
            return datatables($response)->make(true);
        } else if ($id == 'getPengajuan') {
            $pengajuanDetails = DB::connection('ConnAccounting')
                ->select('exec SP_1273_ACC_LIST_BKK2_PENGAJUAN');
            // dd($pengajuanDetails);
            $response = [];
            foreach ($pengajuanDetails as $row) {
                $item = [];
                $item['Id_Pembayaran'] = trim($row->Id_Pembayaran);
                $item['Id_Penagihan'] = (substr(trim($row->Id_Penagihan), 0, 1) != 'X') ? trim($row->Id_Penagihan) : trim($row->Id_Penagihan);
                $item['Id_Bank'] = trim($row->Id_Bank);
                $item['Rincian_Bayar'] = trim($row->Rincian_Bayar);
                $item['Nilai_Pembayaran'] = number_format($row->Nilai_Pembayaran, 2, ',', '.');
                $item['Id_Jenis_Bayar'] = trim($row->Id_Jenis_Bayar);
                $item['Jenis_Pembayaran'] = trim($row->Jenis_Pembayaran);
                $item['Id_MataUang'] = trim($row->Id_MataUang);
                $item['Nama_MataUang'] = trim($row->Nama_MataUang);
                $item['Jml_JenisBayar'] = $row->Jml_JenisBayar;
                $item['Kurs_Bayar'] = $row->Kurs_Bayar;
                $response[] = $item;
            }
            return datatables($response)->make(true);
        } else if ($id == 'getTT') {
            $supplierId = $request->input('supplier1');
            // dd($supplierId);
            $ttDetails = DB::connection('ConnAccounting')
                ->select('exec SP_1273_ACC_LIST_BKK2_TT @IDSupplier = ?', [$supplierId]);
            // dd($ttDetails);
            $response = [];
            foreach ($ttDetails as $row) {
                $item = [];
                $item['Waktu_Penagihan'] = \Carbon\Carbon::parse($row->Waktu_Penagihan)->format('m/d/Y');
                $item['Id_Penagihan'] = trim($row->Id_Penagihan);
                $item['Status_PPN'] = ($row->Status_PPN == 'N') ? 'Tidak Ada' : 'Ada Pajak';
                $item['UangTT'] = trim($row->UangTT);
                $item['Nilai_Penagihan'] = number_format($row->Nilai_Penagihan, 2, ',', '.');
                $item['Lunas'] = trim($row->Lunas);
                $item['IdUangTT'] = trim($row->IdUangTT);
                $item['Id_Pembayaran'] = $row->Id_Pembayaran;
                $item['TT_NoLunas'] = "";
                $response[] = $item;
            }

            $ttNoLunasDetails = DB::connection('ConnAccounting')
                ->select('exec Sp_1273_ACC_LIST_BKK2_TT_NOLUNAS @IDSupplier = ?', [$supplierId]);
            foreach ($ttNoLunasDetails as $row) {
                $item = [];
                $item['Waktu_Penagihan'] = \Carbon\Carbon::parse($row->Waktu_Penagihan)->format('m/d/Y');
                $item['Id_Penagihan'] = trim($row->Id_Penagihan);
                $item['Status_PPN'] = ($row->Status_PPN == 'N') ? 'Tidak Ada' : 'Ada Pajak';
                $item['UangTT'] = trim($row->UangTT);
                $item['Nilai_Penagihan'] = number_format($row->Nilai_Penagihan, 2, ',', '.');
                $item['Lunas'] = trim($row->Lunas);
                $item['IdUangTT'] = trim($row->IdUangTT);
                $item['Id_Pembayaran'] = $row->Id_Pembayaran;
                $item['TT_NoLunas'] = $row->TT_NoLunas;
                $item['isRed'] = true;
                $response[] = $item;
            }
            // dd($ttDetails, $ttNoLunasDetails);
            return datatables($response)->make(true);
        } else if ($id == 'getBKK_DP') {
            $BKM_Pot = $request->input('BKM_Pot');
            $supplierId = $request->input('supplier1');
            // dd($request->all());
            $response = [];

            if (!$BKM_Pot) {
                $results = DB::connection('ConnAccounting')
                    ->select('exec SP_1273_ACC_LIST_BKK2_BKKDP @IDSUPP = ?', [$supplierId]);

                foreach ($results as $result) {
                    $bkk = $result->BKK;
                    $rincian = $result->Rincian;

                    $resultRincian = DB::connection('ConnAccounting')
                        ->select('exec SP_1273_ACC_LIST_BKK2_BKKDP_RINCIAN @BKK = ?, @Rincian = ?', [$bkk, $rincian]);

                    if ($resultRincian) {
                        $nilaiPembayaran = $resultRincian[0]->Nilai_Pembayaran;
                        $idPembayaran = $resultRincian[0]->Id_Pembayaran;

                        $response[] = [
                            'TBKK_DP' => $bkk,
                            'TRincian_DP' => $rincian,
                            'TNilaiByrSbl' => number_format($nilaiPembayaran, 2, ',', '.'),
                            'TIDByr_DP' => $idPembayaran,
                            'TSisaByr' => number_format(($request->input('TNilaiBayar') - $nilaiPembayaran), 2, ',', '.')
                        ];
                    } else {
                        $response['error'] = "Pilih BKK Uang Mukanya dulu !!..";
                    }
                }
            } else {
                $results = DB::connection('ConnAccounting')
                    ->select('exec SP_1273_ACC_LIST_BKK2_DP_PEMBAYARAN @idSup = ?', [$supplierId]);

                foreach ($results as $result) {
                    $bkk = $result->Id_BKM;
                    $custNilai = $result->CustNilai;

                    $resultPembayaran = DB::connection('ConnAccounting')
                        ->select('exec SP_1273_ACC_LIST_BKK2_BKMDP_PEMBAYARAN @bkk = ?', [$bkk]);

                    if ($resultPembayaran) {
                        $nilaiPelunasan = $resultPembayaran[0]->Nilai_Pelunasan;

                        $response[] = [
                            'TBKK_DP' => $bkk,
                            'TIDBKK_DP' => $custNilai,
                            'TNilaiBayarS' => number_format($nilaiPelunasan, 2, ',', '.'),
                            'TSelisih' => number_format(($request->input('TNilaiRincian') - $nilaiPelunasan), 2, ',', '.')
                        ];
                    } else {
                        $response['error'] = "Pilih BKM Potong Tagihannya dulu !!..";
                    }
                }
            }
            return datatables($response)->make(true);
        }else if ($id == 'getBank') {
            $response = [];

            $banks = DB::connection('ConnAccounting')
                ->select('exec SP_1273_ACC_LIST_BKK2_BANK');

            foreach ($banks as $bank) {
                $response[] = [
                    'ID_Bank' => $bank->ID_Bank,
                    'Nama_Bank' => $bank->Nama_Bank,
                ];
            }

            if (empty($response)) {
                return response()->json(['error' => 'Pilih dulu Banknya !!..']);
            }
            return datatables($response)->make(true);
        }else if ($id == 'getBankDetails') {
            $selectedBank = $request->input('id_bank');
            $response = [];

            if ($request->has('TT') || $request->input('Proses') == 2) {
                $idBankDetails = DB::connection('ConnAccounting')
                    ->select('exec SP_1273_ACC_LIST_BKK2_IDBANK @IdBank = ?', [$selectedBank]);

                if (!empty($idBankDetails)) {
                    $idMataUang = $idBankDetails[0]->Id_MataUang;
                    $namaMataUang = $idBankDetails[0]->Nama_MataUang;

                    if ($request->input('TIdUang') == 1) {
                        if ($idMataUang != 1) {
                            return response()->json(['error' => "Bank = $selectedBank  Untuk MataUang : $namaMataUang"]);
                        }
                    } else {
                        if ($idMataUang == 1) {
                            return response()->json(['error' => "Bank = $selectedBank  Untuk MataUang : $namaMataUang"]);
                        }
                    }
                }
            }

            return response()->json(['success' => true, 'data' => $response]);
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
