<?php

namespace App\Http\Controllers\ABM\Barcode;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use Exception;
use DB;
use Auth;

class BarcodeRTRController extends Controller
{
    public function index()
    {
        $nomorUser = trim(Auth::user()->NomorUser);
        $access = (new HakAksesController)->HakAksesFiturMaster('ABM');
        $objek = DB::connection('ConnInventory')
            ->select('exec SP_4384_ABM_Konversi_Balik_Lami @XKdUser = ?, @XKode = ?', [$nomorUser, 0]); // get all objek from divisi ABM
        return view('ABM.Barcode.Printing.BarcodePrinting', compact('access', 'nomorUser', 'objek'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show($id, Request $request)
    {
        if ($id == 'getDataKonversiRTR') {
            $nomorIndeksBarangAsal = (int) $request->input('nomorIndeksBarangAsal');
            $kodeBarangAsal = $request->input('kodeBarangAsal');
            try {
                $dataBarcode = DB::connection('ConnABM')
                    ->select(
                        'EXEC SP_4384_ABM_Konversi_Printing @XKode = ?, @XKdBrg = ?, @XNomorIndeks = ?',
                        [2, $kodeBarangAsal, $nomorIndeksBarangAsal]
                    );

                $dataMesin = DB::connection('ConnABM')->select('EXEC SP_4384_ABM_Konversi_Printing @XKode = ?', [4]);
                return response()->json(['success' => true, 'dataBarcode' => $dataBarcode, 'dataMesin' => $dataMesin]);
            } catch (Exception $e) {
                if ($e->getMessage() == 'Undefined array key 0') {
                    return response()->json(['error' => (string) "Terjadi Kesalahan, Data Barcode Tidak Ditemukan!"]);
                } else {
                    return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
                }
            }
        } else {
            return response()->json(['error' => (string) "Undefined request: " . $id]);
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
