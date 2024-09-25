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

class KodePerkiraanBKMController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Piutang.KodePerkiraanBKM', compact('access'));
    }

    // public function getIdBKM5($BlnThn)
    // {
    //     $tabel = DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_TPELUNASAN] @Kode = ?, @BlnThn = ?', [5, $BlnThn]);
    //     return response()->json($tabel);
    // }
    // public function getIdBKM6($BlnThn)
    // {
    //     $tabel = DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_TPELUNASAN] @Kode = ?, @BlnThn = ?', [6, $BlnThn]);
    //     return response()->json($tabel);
    // }

    // public function getTabelRincian($idBKM)
    // {
    //     $tabel = DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_TPELUNASAN] @Kode = ?, @IdBKM = ?', [7, $idBKM]);
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
        //
    }

    //Display the specified resource.
    public function show(Request $request, $id)
    {
        if ($id == 'getKira') {
            // Execute the stored procedure
            $results = DB::connection('ConnAccounting')
                ->select('exec SP_1273_ACC_LIST_BKK1_KODEPERKIRAAN');
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'NoKodePerkiraan' => trim($row->NoKodePerkiraan),
                    'Keterangan' => trim($row->Keterangan),
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getPelunasan') {
            $kode = $request->input('kode');

            $blnThn = trim($request->input('bulan')) . substr(trim($request->input('tahun')), -2);
            dd($blnThn, $kode);
            $results = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_LIST_TPELUNASAN @Kode = ?, @BlnThn = ?', [$kode, $blnThn]);

            if (!empty($results)) {
                $response = [];
                foreach ($results as $row) {
                    $response[] = [
                        'id_bkm' => $row->id_bkm,
                        'Id_Bank' => $row->Id_Bank,
                        'Jenis_Pembayaran' => $row->Jenis_Pembayaran,
                        'Symbol' => $row->Symbol,
                        'Nilai_Pelunasan' => number_format($row->Nilai_Pelunasan, 2),
                    ];
                }
                return response()->json($response);
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
        //
    }
}
