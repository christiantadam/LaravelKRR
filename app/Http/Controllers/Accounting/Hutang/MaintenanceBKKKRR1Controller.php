<?php

namespace App\Http\Controllers\Accounting\Hutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class MaintenanceBKKKRR1Controller extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Hutang.MaintenanceBKKKRR1', compact('access'));
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
        if ($id == 'getDataAwalAtas') {
            $response = [];

            $results1 = DB::connection('ConnAccounting')
                ->select('exec SP_1273_ACC_LIST_BKK1_NOBKK_TT');
            // dd($results1);
            foreach ($results1 as $row) {
                $response[] = [
                    'Id_Pembayaran' => trim($row->Id_Pembayaran),
                    'Id_Penagihan' => trim($row->Id_Penagihan),
                    'NM_SUP' => trim($row->NM_SUP),
                    'Rincian_Bayar' => trim($row->Rincian_Bayar),
                    'Nilai_Rincian' => number_format($row->Nilai_Rincian, 2, '.', ','),
                    'Id_Supplier' => $row->Id_Supplier,
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getDataAwalBawah') {
            $response = [];

            $results2 = DB::connection('ConnAccounting')
                ->select('exec SP_1273_ACC_LIST_BKK1_NOBKK_NOTT');
            // dd($results2);
            foreach ($results2 as $row) {
                $response[] = [
                    'Id_Pembayaran' => trim($row->Id_Pembayaran),
                    'Id_Penagihan' => trim($row->Id_Penagihan),
                    'NM_SUP' => trim($row->NM_SUP),
                    'Rincian_Bayar' => trim($row->Rincian_Bayar),
                    'Nilai_Rincian' => number_format($row->Nilai_Rincian, 2, '.', ','),
                    'Id_Supplier' => $row->Id_Supplier,
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getKira') {
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
        } else if ($id == 'getPenagihan') {
            $response = [];

            $results = DB::connection('ConnAccounting')
                ->select('exec SP_1273_ACC_LIST_BKK1_TTRINC');
            // dd($results);
            foreach ($results as $row) {
                $response[] = [
                    'Waktu_Penagihan' => \Carbon\Carbon::parse($row->Waktu_Penagihan)->format('m/d/Y'),
                    'Id_Penagihan' => trim($row->Id_Penagihan),
                    'NM_SUP' => trim($row->NM_SUP),
                    'Nama_MataUang' => trim($row->Nama_MataUang),
                    'Nilai_Penagihan' => number_format($row->Nilai_Penagihan, 2, '.', ','),
                    'Lunas' => trim($row->Lunas),
                    'Status_PPN' => trim($row->Status_PPN),
                ];
            }

            return datatables($response)->make(true);
        } else if ($id == 'getTampilBKK') {
            $response = [];

            $month = $request->input('month');
            $year = $request->input('year');

            if (intval($month) > 0 && intval($month) < 13) {
                $BlnThn = str_pad($month, 2, '0', STR_PAD_LEFT) . substr($year, -2);

                $results = DB::connection('ConnAccounting')
                    ->select('exec SP_1273_ACC_LIST_BKK1_BKK @BlnThn = ?', [$BlnThn]);

                foreach ($results as $row) {
                    $response[] = [
                        'Id_BKK' => trim($row->Id_BKK),
                        'NilaiBKK' => number_format($row->NilaiBKK, 2, '.', ','),
                        'NM_SUP' => $row->NM_SUP ? trim($row->NM_SUP) : 'NO Penagihan',
                    ];
                }
            }

            return datatables($response)->make(true);
        } else if ($id == 'getDetailPembayaran') {
            $response = [];

            $IdPembayaran = $request->input('id_bayar');

            $results = DB::connection('ConnAccounting')
                ->select('exec SP_1273_ACC_LIST_BKK1_DETAILBYR @IdPembayaran = ?', [$IdPembayaran]);
            // dd($results);
            // Process the results
            foreach ($results as $row) {
                $response[] = [
                    'Id_Detail_Bayar' => trim($row->Id_Detail_Bayar),
                    'Rincian_Bayar' => trim($row->Rincian_Bayar),
                    'Nilai_Rincian' => number_format($row->Nilai_Rincian, 2, '.', ','),
                    'Kode_Perkiraan' => trim($row->Kode_Perkiraan),
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
