<?php

namespace App\Http\Controllers\Circular;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Log;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class AfalanBenangController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Circular');
        return view('Circular.transaksi.AfalanBenang', compact('access'));
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
        if ($id == 'getListAfalanBenang') {
            $tanggal = $request->input('tanggal');
            $shift = strtoupper($request->input('shift'));

            $results = DB::connection('ConnCircular')
                ->select(
                    'EXEC SP_LIST_AFALANBENANG @Kode = ?, @Tanggal = ?, @Shift = ?',
                    [1, $tanggal, $shift]
                );
                
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Shift' => trim($row->Shift),
                    'Nama_mesin' => trim($row->Nama_mesin),
                    'NAMA_BRG' => $row->NAMA_BRG ? trim($row->NAMA_BRG) : '',
                    'Id_order' => $row->Id_order ? trim($row->Id_order) : '',
                    'Id_Log' => trim($row->Id_Log),
                    'Id_mesin' => trim($row->Id_mesin),
                    'Afv_bng_wa' => $row->Afv_bng_wa ?? '',
                    'Afv_bng_we' => $row->Afv_bng_we ?? '',
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
