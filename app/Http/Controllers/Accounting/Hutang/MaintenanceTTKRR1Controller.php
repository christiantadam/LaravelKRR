<?php

namespace App\Http\Controllers\Accounting\Hutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class MaintenanceTTKRR1Controller extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Hutang.MaintenanceTTKRR1', compact('access'));
    }

    public function getSupplierTTKRR1()
    {
        $supplier = DB::connection('ConnAccounting')->select('exec [SP_1273_ACC_LIST_SUPPLIER]');
        return response()->json($supplier);
    }

    public function getTabelListDetailBrg($idSupplier)
    {
        $supplier = DB::connection('ConnAccounting')->select('exec [SP_1273_ACC_LIST_BKK1_DETAILBRG] @IdSupplier = ?', [$idSupplier]);
        return response()->json($supplier);
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        // Assign all $request->input values to variables
        $ListPO = $request->input('rowDataArray', []);
        $terbilang = $request->input('terbilang');
        $TIDPenagihan = $request->input('id_penagihan');
        $TIDSupplier = $request->input('id_supp');
        $txtInvSup = $request->input('id_inv') ?: null;
        $TIdUang = 1;
        $user_id = trim(Auth::user()->NomorUser);
        $TNilaiTagih = $request->input('nilai_penagihan');
        $TNoFaktur = $request->input('nofaktur_pajak');
        $TNilaiFaktur = $request->input('nilai_pajak');
        $TPajak = $request->input('pajak');
        // dd($request->all());
        $simpan = false;

        // Check if TIDPenagihan is empty
        if (empty($TIDPenagihan)) {
            // Execute the stored procedure to insert and get the ID
            $result = DB::connection('ConnAccounting')
                ->statement('exec SP_1273_ACC_INS_BKK1_IDTT @IdSupplier = ?, @invSup = ?, @IdMataUang = ?, @UserId = ?', [
                    $TIDSupplier,
                    $txtInvSup,
                    $TIdUang,
                    $user_id
                ]);
            dd($result);
            $TIDPenagihan = $result[0]->IDtt;
            $simpan = true;
        }
        // Loop through ListPO items
        foreach ($ListPO as $item) {
            // Insert details into another table
            DB::connection('ConnAccounting')
                ->select('exec SP_1273_ACC_INS_BKK1_SPPB ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?', [
                    $TIDPenagihan,
                    $item['Kd_div'],
                    $item['NO_PO'],
                    $item['No_BTTB'],
                    $item['No_terima'],
                    $item['Hrg_trm'],
                    $item['Disc_trm'],
                    $item['Ppn_trm'],
                    $item['Kurs_Rp'],
                    $item['Harga_disc'],
                    $item['Harga_Ppn'],
                    $item['Qty_Terima'],
                    $item['Sat_Terima']
                ]);
        }

        // Check if data was saved
        if (!$simpan) {
            return response()->json(['message' => 'TIDAK ADA Data yang diPROSES !!..']);
        } else {
            // Update the main record with the total amount
            DB::connection('ConnAccounting')
                ->select('exec SP_1273_ACC_UDT_BKK1_NILAI_TT ?, ?', [
                    $TIDPenagihan,
                    (float) $TNilaiTagih
                ]);

            // Save tax invoice
            DB::connection('ConnAccounting')
                ->select('exec SP_1273_ACC_INS_BKK1_PAJAK ?, ?, ?, ?, ?', [
                    $TIDPenagihan,
                    $TNoFaktur,
                    $TNilaiFaktur,
                    $TPajak,
                    1
                ]);

            DB::connection('ConnAccounting')
                ->select('exec SP_1273_ACC_UDT_BKK1_TERBILANG ?, ?', [
                    $TIDPenagihan,
                    $terbilang,
                ]);

            return response()->json([
                'message' => "Data berhasil disimpan dengan No.Penagihan: $TIDPenagihan, Jumlah Penagihan Rp. $TNilaiTagih"
            ]);
        }
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
        } else if ($id == 'getPO') {
            $idSupplier = $request->input('id_supp');
            // dd($idSupplier);
            $poDetails = DB::connection('ConnAccounting')
                ->select('exec SP_1273_ACC_LIST_BKK1_DETAILBRG ?', [$idSupplier]);
            // dd($poDetails);
            $response = [];
            foreach ($poDetails as $row) {
                $response[] = [
                    'Kd_div' => trim($row->Kd_div),
                    'NO_PO' => trim($row->NO_PO),
                    'No_BTTB' => trim($row->No_BTTB),
                    'Harga_terbayar' => number_format($row->Harga_terbayar, 2, '.', ','),
                    'Kd_brg' => trim($row->Kd_brg),
                    'NAMA_BRG' => trim($row->NAMA_BRG),
                    'Qty_Terima' => $row->Qty_Terima,
                    'SatTerima' => trim($row->SatTerima),
                    'No_terima' => trim($row->No_terima),
                    'Hrg_trm' => number_format($row->Hrg_trm, 2, '.', ','),
                    'Kurs_Rp' => number_format($row->Kurs_Rp, 2, '.', ','),
                    'Disc_trm' => number_format($row->Disc_trm, 2, '.', ','),
                    'Ppn_trm' => number_format($row->Ppn_trm, 2, '.', ','),
                    'Harga_disc' => number_format($row->Harga_disc, 2, '.', ','),
                    'Harga_Ppn' => number_format($row->Harga_Ppn, 2, '.', ','),
                    'Sat_Terima' => $row->Sat_Terima,
                    'hrg_murni' => number_format($row->hrg_murni, 2, '.', ','),
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
        //
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
