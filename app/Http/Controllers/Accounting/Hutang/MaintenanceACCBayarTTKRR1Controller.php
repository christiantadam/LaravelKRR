<?php

namespace App\Http\Controllers\Accounting\Hutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class MaintenanceACCBayarTTKRR1Controller extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Hutang.MaintenanceACCBayarTTKRR1', compact('access'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

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
                ->select('exec SP_1273_ACC_LIST_BKK1_TT');
            // dd($pengajuanDetails);
            $response = [];
            foreach ($pengajuanDetails as $row) {
                $response[] = [
                    'Waktu_Penagihan' => \Carbon\Carbon::parse($row->Waktu_Penagihan)->format('m/d/Y'),
                    'Id_Penagihan' => trim($row->Id_Penagihan),
                    'NM_SUP' => trim($row->NM_SUP),
                    'Nama_MataUang' => trim($row->Nama_MataUang),
                    'Nilai_Penagihan' => number_format($row->Nilai_Penagihan, 2, '.', ','),
                    'Lunas' => trim($row->Lunas),
                ];
            }
            return datatables($response)->make(true);
        } else if ($id == 'getTT') {
            $IdTT = trim($request->input('tt_modal'));
            // dd($IdTT);
            $checkData = DB::connection('ConnAccounting')
                ->select('exec SP_1273_ACC_CHECK_BKK1_IDTT @IdTT = ?', [$IdTT]);

            if ($checkData[0]->Ada == 0) {
                return response()->json(['message' => 'Data Tidak Ada !!.., Hubungi Rus untuk Serah Terima TT !!..']);
            } else {
                $detailData = DB::connection('ConnAccounting')
                    ->select('exec SP_1273_ACC_LIST_BKK1_IDTT @IdTT = ?', [$IdTT]);

                $response = [
                    'NM_SUP' => trim($detailData[0]->NM_SUP),
                    'Nilai_Pembayaran' => number_format($detailData[0]->Nilai_Pembayaran, 2, '.', ','),
                ];

                return response()->json($response);
            }
        } else if ($id == 'updateTT') {
            $IdTT = trim($request->input('tt_modal'));
            $userId = trim($request->input('user_id'));

            // Execute update stored procedure
            DB::connection('ConnAccounting')->statement('exec SP_1273_ACC_UDT_BKK1_USERTT @IdTT = ?, @UserId = ?', [$IdTT, $userId]);

            return response()->json(['message' => 'Data sudah diPROSES!!..']);
        }
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
