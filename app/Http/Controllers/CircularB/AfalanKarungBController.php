<?php

namespace App\Http\Controllers\CircularB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Log;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class AfalanKarungBController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Circular B');
        return view('CircularB.transaksi.AfalanKarung', compact('access'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        try {
            $id_log = (int) $request->input('id_log');
            $afalan_wa = (float) ($request->input('afalan_warp') ?? 0);
            $afalan_we = (float) ($request->input('afalan_weft') ?? 0);
            $weft_end = (float) ($request->input('weft_end') ?? 0);
            // dd( $id_log, $afalan_wa, $afalan_we, $weft_end);
            DB::connection('ConnCircularMojosari')->statement(
                'EXEC SP_1273_CIR_Update_Afalan @Id_log = ?, @Afalan_Wa = ?, @Afalan_We = ?, @WeftEnd = ?',
                [
                    $id_log,
                    $afalan_wa,
                    $afalan_we,
                    $weft_end
                ]
            );

            return response()->json([
                'message' => 'DATA SUDAH TERSIMPAN'
            ]);

        } catch (Exception $e) {

            return response()->json([
                'error' => $e->getMessage()
            ]);

        }
    }

    public function show(Request $request, $id)
    {
        if ($id == 'getListLogMesin') {
            $shift = trim($request->input('shift'));
            $tanggal = $request->input('tanggal');

            $results = DB::connection('ConnCircularMojosari')
                ->select(
                    'EXEC SP_1273_CIR_LIST_LogMesin @Kode = ?, @Shift = ?, @Tanggal = ?',
                    [3, $shift, $tanggal]
                );

            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Id_Log' => trim($row->Id_Log),
                    'NAMA_BRG' => trim($row->NAMA_BRG),
                    'Nama_mesin' => trim($row->Nama_mesin),
                    'Afalan_Wa' => is_null($row->Afalan_Wa) ? 0 : (float) $row->Afalan_Wa,
                    'Afalan_We' => is_null($row->Afalan_We) ? 0 : (float) $row->Afalan_We,
                    'Weft_End' => is_null($row->Weft_End) ? 0 : (float) $row->Weft_End,
                ];
            }

            return datatables($response)->make(true);
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
