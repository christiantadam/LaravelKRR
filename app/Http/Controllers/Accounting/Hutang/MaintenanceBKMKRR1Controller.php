<?php

namespace App\Http\Controllers\Accounting\Hutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class MaintenanceBKMKRR1Controller extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Hutang.MaintenanceBKMKRR1', compact('access'));
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
        } else if ($id == 'getMataUang') {
            $results = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_LIST_MATA_UANG @kode = ?', [1]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Nama_MataUang' => $row->Nama_MataUang,
                    'Id_MataUang' => $row->Id_MataUang,
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getBank') {
            // Execute the stored procedure for 'SP_5298_ACC_LIST_BANK'
            $results = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_LIST_BANK');
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Id_Bank' => $row->Id_Bank,
                    'Nama_Bank' => $row->Nama_Bank,
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getBankDetail') {
            // Execute the stored procedure for 'SP_5298_ACC_LIST_BANK_1'
            $bankId = $request->input('id_bank');
            $result = DB::connection('ConnAccounting')
                ->select('exec SP_5298_ACC_LIST_BANK_1 @idBank = ?', [trim($bankId)]);
            // dd($result);
            if (!empty($result)) {
                $response = [
                    'JenisBank' => trim($result[0]->jenis),
                ];
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
        //
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
