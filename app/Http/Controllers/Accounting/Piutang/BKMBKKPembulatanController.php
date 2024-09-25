<?php

namespace App\Http\Controllers\Accounting\Piutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Auth;

class BKMBKKPembulatanController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Piutang.BKMBKKPembulatan', compact('access'));
    }

    // public function getTabelPelunasan($bulan, $tahun)
    // {
    //     //dd($bulan, $tahun);
    //     $tabel =  DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_BKM_PEMBULATAN] @kode = ?, @bln = ?, @thn = ?', [1, $bulan, $tahun]);
    //     return response()->json($tabel);
    // }

    // public function getTabelDetailBiaya($idBKM)
    // {
    //     //dd($idBKM);
    //     $tabel =  DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_BKM_PEMBULATAN] @kode = ?, @idBKM = ?', [2, $idBKM]);
    //     return response()->json($tabel);
    // }

    // public function getBankPembulatan()
    // {
    //     $tabel =  DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_BANK]');
    //     return response()->json($tabel);
    // }

    // public function getJenisBankPembulatan($idBank)
    // {
    //     //dd($idBKM);
    //     $tabel =  DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_BANK_1] @idBank = ?', [$idBank]);
    //     return response()->json($tabel);
    // }

    // function getIDBKK($id, $tanggal)
    // {
    //     $idBank = $id;
    //     $tanggal = $tanggal;
    //     $jenis = 'P';

    //     // $result = DB::statement("EXEC [dbo].[SP_5409_ACC_COUNTER_BKM_BKK] ?, ?, ?, ?", [
    //     //     $jenis,
    //     //     $tanggal,
    //     //     $idBank,
    //     //     null
    //     //     // Pass by reference for output parameter
    //     // ]);

    //     $tahun = substr($tanggal, -10, 4);
    //     $x = DB::connection('ConnAccounting')->table('T_COUNTER_BKK')->where('Periode', '=', $tahun)->first();
    //     $nomorIdBKK = '00000' . str_pad($x->Id_BKK_E_Rp, 5, '0', STR_PAD_LEFT);
    //     $idBKK = $idBank . '-R' . substr($tahun, -2) . substr($nomorIdBKK, -5);

    //     return response()->json($idBKK);
    // }

    // public function getIdPembayaran()
    // {
    //     $idPembayaran = DB::connection('ConnAccounting')
    //         ->table('T_Pembayaran_Tagihan')
    //         ->max('Id_Pembayaran');
    //     // dd($idPelunasan);

    //     return response()->json(['Id_Pembayaran' => $idPembayaran]);
    // }

    // public function getTabelTampilBKKPembulatan($tanggalTampilBKK, $tanggalTampilBKK2)
    // {
    //     // dd("masuk");
    //     $tabel =  DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_BKK_DP_PERTGL] @tgl1 = ?, @tgl2 = ?', [$tanggalTampilBKK, $tanggalTampilBKK2]);
    //     return response()->json($tabel);
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

    // public function getCetakBKMBKKPembulatan($idBKKTampil)
    // {
    //     //dd($idBKM);
    //     $data = DB::connection('ConnAccounting')->table('VW_PRG_5298_ACC_CETAK_BKK_DP')
    //     ->where('Id_BKK', $idBKKTampil)
    //     ->get();
    //     return $data;
    // }

    // public function insertUpdate(Request $request)
    // {
    //     $idBKK = $request->idBKK;
    //     $tanggal = $request->tanggal;
    //     $konversi = $request->konversi;
    //     $jumlahUang = $request->jumlahUang;
    //     $idBank = $request->idBank;

    //     $idBKM = $request->idBKM;
    //     $idMataUang = $request->idMataUang;
    //     $idPembayaran = $request->idPembayaran;
    //     $uraian = $request->uraian;
    //     $idKodePerkiraan = $request->idKodePerkiraan;
    //     $id_bkk = $request->id_bkk;

    //     $jenisBank = $request->jenisBank;

    //     DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_INSERT_BKK_TPEMBAYARAN]
    //     @idBKK = ?,
    //     @tgl = ?,
    //     @userinput = ?,
    //     @terjemahan = ?,
    //     @nilai = ?,
    //     @IdBank= ?', [
    //         $idBKK,
    //         $tanggal,
    //         null,
    //         $konversi,
    //         $jumlahUang,
    //         $idBank,
    //     ]);

    //     DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_INSERT_BKK_TPEMBAYARAN_TAG]
    //     @idBKK = ?,
    //     @idUang = ?,
    //     @idJenis = ?,
    //     @idBank = ?,
    //     @nilai = ?,
    //     @user= ?,
    //     @idBKM_acuan = ?', [
    //         $idBKK,
    //         $idMataUang,
    //         1,
    //         $idBank,
    //         $jumlahUang,
    //         1,
    //         $idBKM
    //     ]);

    //     DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_INSERT_BKK_TDETAILPEMB]
    //     @idpembayaran = ?,
    //     @keterangan = ?,
    //     @biaya = ?,
    //     @kodeperkiraan = ?', [
    //         $idPembayaran,
    //         $uraian,
    //         $jumlahUang,
    //         $idKodePerkiraan
    //     ]);

    //     $idBKK = $request->idBKK;
    //     $idBank = $request->idBank;
    //     $jenisBank = $request->jenisBank;
    //     $tanggal = $request->tanggal;

    //     DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_COUNTER_IDBKK]
    //     @idbkk = ?,
    //     @idBank = ?,
    //     @jenis = ?,
    //     @tgl = ?', [
    //         $id_bkk,
    //         $idBank,
    //         $jenisBank,
    //         $tanggal
    //     ]);

    //     return redirect()->back()->with('success', 'BKK No. ' . $idBKK . ' Tersimpan');
    // }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        if ($id == 'getBank') {
            // Retrieve list of banks (SP_5298_ACC_LIST_BANK)
            $bankResults = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_LIST_BANK');
            // dd($bankResults);
            $response = [];
            foreach ($bankResults as $bank) {
                $response[] = [
                    'Id_Bank' => $bank->Id_Bank,
                    'Nama_Bank' => $bank->Nama_Bank,
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getBankDetails') {
            if ($request->input('idBank') !== null) {
                // Execute the stored procedure to get bank details
                $bankResults = DB::connection('ConnAccounting')
                    ->select('exec SP_5298_ACC_LIST_BANK_2 @idBank = ?', [
                        trim($request->input('idBank'))
                    ]);
                // dd($bankResults);
                if (count($bankResults) > 0) {
                    $bankData = $bankResults[0];

                    $response = [
                        'Jenis' => trim($bankData->jenis),
                        'Nama' => trim($bankData->Nama)
                    ];

                    return response()->json($response, 200);
                } else {
                    return response()->json(['message' => 'Bank not found'], 404);
                }
            } else {
                return response()->json(['message' => 'Invalid Bank ID'], 400);
            }
        } else if ($id == 'getBKM') {
            $kode = 1;
            $bulan = $request->input('bulan');
            $tahun = $request->input('tahun');

            $bkmResults = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_LIST_BKM_PEMBULATAN @kode = ?, @bln = ?, @thn = ?', [$kode, $bulan, $tahun]);
            // dd($bkmResults);
            $response = [];
            $index = 0;

            if (!empty($bkmResults)) {
                foreach ($bkmResults as $bkm) {
                    $index++;
                    $response[] = [
                        'Tgl_Input' => \Carbon\Carbon::parse($bkm->Tgl_Input)->format('m/d/Y'),
                        'Id_BKM' => $bkm->Id_BKM,
                        'Total' => number_format($bkm->Total, 2, '.', ','),
                    ];
                }
            }

            return datatables($response)->make(true);
        } else if ($id == 'getBKMDetails') {
            $kode = 2;
            $idBKM = trim($request->input('idBKM'));
            // dd($idBKM);
            // Execute the stored procedure
            $bkmDetails = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_LIST_BKM_PEMBULATAN @kode = ?, @idBKM = ?', [$kode, $idBKM]);
            // dd($bkmDetails);
            // Prepare the response array for DataTables
            $response = [];
            foreach ($bkmDetails as $detail) {
                $response[] = [
                    'NamaCust' => $detail->NamaCust,
                    'No_Bukti' => $detail->No_Bukti,
                    'ID_Penagihan' => $detail->ID_Penagihan,
                    'MataUang' => $detail->MataUang,
                    'Rincian' => number_format($detail->Rincian, 2, '.', ','), // Format as ###,###,##0.00
                    'Id_bank' => $detail->Id_bank,
                    'Jenis_Bank' => $detail->Jenis_Bank,
                    'Id_MataUang' => $detail->Id_MataUang,
                ];
            }

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
