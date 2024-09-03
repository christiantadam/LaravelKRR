<?php

namespace App\Http\Controllers\Accounting\Hutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class MaintenanceKursBKKController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Hutang.MaintenanceKursBKK', compact('access'));
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
        if ($id == 'checkBKK') {
            // $tes = $request->input('krr1');
            // dd($tes);
            $BlnThn = trim($request->input('bulan')) . substr(trim($request->input('tahun')), -2);
            // dd($BlnThn);
            if ($request->input('krr1') == "true") {
                $resultCheck = DB::connection('ConnAccounting')
                    ->select('exec SP_1273_ACC_CHECK_BKK_KURS_BKK @BlnThn = ?', [$BlnThn]);
                if (!empty($resultCheck) && $resultCheck[0]->Ada == 0) {
                    return response()->json(['message' => 'Tidak ada Data!!..'], 404);
                }
            }

            $storedProc = $request->input('krr1') == "true"
                ? 'SP_1273_ACC_LIST_BKK_KURS_KRR1'
                : 'SP_1273_ACC_LIST_BKK_KURS_BKK';

            $results = DB::connection('ConnAccounting')
                ->select((string) 'exec ' . $storedProc . ' @BlnThn = ?', [$BlnThn]);

            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Id_BKK' => $row->Id_BKK,
                    'Nilai_Pembulatan' => number_format($row->Nilai_Pembulatan, 2, '.', ','),
                    'Tanggal_BKK' => date('Y-m-d', strtotime($row->Tanggal_BKK)),
                    'Sym_Supp' => $row->Sym_Supp ?? '',
                    'NM_SUP' => $row->NM_SUP ?? '',
                    'Id_Supplier' => $row->Id_Supplier ?? '',
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'listBKKClick') {
            $TBKK = $request->input('bkk');

            $responseBayar = [];
            $ComTrans = DB::connection('ConnAccounting')->select('exec SP_1273_ACC_LIST_BKK_BAYARTAGIHAN @IdBKK = ?', [$TBKK]);
            // dd($ComTrans);
            if (!empty($ComTrans)) {
                foreach ($ComTrans as $trans) {
                    $responseBayar[] = [
                        'Id_Pembayaran' => $trans->Id_Pembayaran,
                        'Id_Penagihan' => $trans->Id_Penagihan ?? '',
                        'Jenis_Pembayaran' => $trans->Jenis_Pembayaran,
                        'Nama_MataUang' => $trans->Nama_MataUang,
                        'Nilai_Pembayaran' => number_format($trans->Nilai_Pembayaran, 2, '.', ','),
                        'Kurs_Bayar' => number_format($trans->Kurs_Bayar, 2, '.', ','),
                    ];
                }
            }

            return datatables($responseBayar)->make(true);
        } else if ($id == 'listBayarClick') {
            $IdPembayaran = $request->input('id_pembayaran');

            $responseRincian = [];
            $ComTrans = DB::connection('ConnAccounting')->select('exec SP_1273_ACC_LIST_BKK_DETAILPEMBAYARAN @IdPembayaran = ?', [$IdPembayaran]);
            // dd($ComTrans);
            if (!empty($ComTrans)) {
                foreach ($ComTrans as $trans) {
                    $responseRincian[] = [
                        'Id_Pembayaran' => $trans->Id_Pembayaran,
                        'Id_Detail_Bayar' => $trans->Id_Detail_Bayar,
                        'Rincian_Bayar' => $trans->Rincian_Bayar,
                        'Nilai_Rincian' => number_format($trans->Nilai_Rincian, 2, '.', ','),
                        'Kode_Perkiraan' => $trans->Kode_Perkiraan,
                        'Kurs' => number_format($trans->Kurs ?? 0, 5, '.', ','),
                    ];
                }
            }

            return datatables($responseRincian)->make(true);
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
