<?php

namespace App\Http\Controllers\Accounting\Hutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class MaintenanceJurnalBeliController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Hutang.MaintenanceJurnalBeli', compact('access'));
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
            try {
                // Execute the stored procedure
                $suppStatusDetails = DB::connection('ConnAccounting')
                    ->select('exec SP_1273_ACC_LIST_SUPP_STATUSH');
                // dd($suppStatusDetails);
                $response = [];
                foreach ($suppStatusDetails as $row) {
                    $response[] = [
                        'Supplier' => $row->Supplier,
                        'NO_SUP' => $row->NO_SUP,
                    ];
                }

                return datatables($response)->make(true);
            } catch (Exception $e) {
                return response()->json(['error' => 'Error retrieving supplier status: ' . $e->getMessage()], 500);
            }
        } else if ($id == 'getPeriodeJurnal') {
            try {
                $periodeDetails = DB::connection('ConnAccounting')
                    ->select('exec SP_1273_ACC_LIST_PERIODE_JURNAL @IDSupplier = ?', [
                        trim($request->input('kode_supp'))
                    ]);
                // dd($periodeDetails);
                if (count($periodeDetails) > 0) {
                    $response = [];
                    foreach ($periodeDetails as $row) {
                        $response[] = [
                            'BlnThn' => $row->BlnThn,
                        ];
                    }

                    $TBlTh = $response[0]['BlnThn'] ?? '';

                    if ($TBlTh !== '') {
                        return datatables($response)->make(true);
                    } else {
                        return response()->json(['error' => 'Pilih dulu Periode BKKnya !!...']);
                    }
                } else {
                    return response()->json(['error' => 'No data found for the provided supplier ID.']);
                }
            } catch (Exception $e) {
                return response()->json(['error' => 'Error retrieving periode jurnal: ' . $e->getMessage()]);
            }
        } else if ($id == 'getBKK') {
            try {
                $comTrans = DB::connection('ConnAccounting')
                    ->select('exec SP_1273_ACC_LIST_BKK_JURNAL ?, ?', [
                        $request->input('kode_supp'),
                        $request->input('bulantahun')
                    ]);
                // dd($comTrans);
                $response = [];
                foreach ($comTrans as $row) {
                    $response[] = [
                        'Referensi' => $row->Referensi,
                        'Uang' => $row->Uang,
                    ];
                }

                return datatables($response)->make(true);
            } catch (Exception $e) {
                return response()->json(['error' => 'Error executing BKK procedure: ' . $e->getMessage()], 500);
            }
        } else if ($id == 'checkBKK') {
            try {
                $bkk = $request->input('bkk');

                $checkJurnal = DB::connection('ConnAccounting')
                    ->select('exec SP_1273_ACC_CHECK_ADA_JURNAL ?', [$bkk]);
                // dd($checkJurnal);
                if ($checkJurnal[0]->Ada == 0) {
                    return response()->json(['message' => 'TIDAK ADA Data JURNAL !!'], 200);
                } else {
                    return response()->json(['error' => 'Ada Data Jurnal'], 200);
                }

            } catch (Exception $e) {
                return response()->json(['error' => 'Error executing BKK procedure: ' . $e->getMessage()], 500);
            }
        } else if ($id == 'DataJurnal') {
            try {
                $bkk = $request->input('bkk');
                $recTrans = DB::connection('ConnAccounting')
                    ->select('exec SP_1273_ACC_LIST_TT_JURNAL ?', [$bkk]);

                $response = [];
                foreach ($recTrans as $row) {
                    $response[] = [
                        'BKK' => $row->BKK,
                        'KodePerkiraan' => $row->KodePerkiraan,
                        'KetKira' => $row->KetKira,
                        'Nilai_Debet' => number_format($row->Nilai_Debet, 4, ',', '.'),
                        'Nilai_Kredit' => number_format($row->Nilai_Kredit, 4, ',', '.'),
                        'Keterangan' => $row->Keterangan,
                        'ID_Jurnal' => $row->ID_Jurnal,
                    ];
                }

                return datatables($response)->make(true);
            } catch (Exception $e) {
                return response()->json(['error' => 'Error retrieving jurnal data: ' . $e->getMessage()], 500);
            }
        } else if ($id == 'getKira') {
            try {
                $comTrans = DB::connection('ConnAccounting')
                    ->select('exec SP_1273_ACC_LIST_TT_KODEPERKIRAAN');
                // dd($comTrans);
                $response = [];
                foreach ($comTrans as $row) {
                    $response[] = [
                        'NoKodePerkiraan' => $row->NoKodePerkiraan,
                        'Keterangan' => $row->Keterangan,
                    ];
                }

                return datatables($response)->make(true);
            } catch (Exception $e) {
                return response()->json(['error' => 'Error executing kode perkiraan procedure: ' . $e->getMessage()], 500);
            }
        } else if ($id == 'getMataUang') {
            try {
                // Execute the stored procedure
                $comTrans = DB::connection('ConnAccounting')
                    ->select('exec SP_1273_ACC_LIST_TT_MATAUANG');
                // dd($comTrans);
                $response = [];
                foreach ($comTrans as $row) {
                    $response[] = [
                        'Nama_MataUang' => $row->Nama_MataUang,
                        'Id_MataUang' => $row->Id_MataUang,
                    ];
                }

                return datatables($response)->make(true);
            } catch (Exception $e) {
                return response()->json(['error' => 'Error executing mata uang procedure: ' . $e->getMessage()], 500);
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
        //
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
