<?php

namespace App\Http\Controllers\Accounting\Hutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class ACCBKKController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Hutang.ACCBKK', compact('access'));
        // $data = 'Accounting';
        // return view('Accounting.Hutang.ACCBKK', compact('data'));
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
        if ($id == 'getBank') {
            $response = [];

            $banks = DB::connection('ConnAccounting')
                ->select('exec SP_1273_ACC_LIST_BKK2_BANK');
            // dd($banks);
            foreach ($banks as $bank) {
                $response[] = [
                    'Id_Bank' => $bank->Id_Bank,
                    'Nama_Bank' => $bank->Nama_Bank,
                ];
            }

            if (empty($response)) {
                return response()->json(['error' => 'Pilih dulu Banknya !!..']);
            }
            return datatables($response)->make(true);
        } else if ($id == 'getPengajuan') {
            $response = [];

            $pengajuan = DB::connection('ConnAccounting')
                ->select('exec SP_1273_ACC_LIST_BKK2_PENGAJUAN');
            // dd($pengajuan);
            foreach ($pengajuan as $ajuan) {
                $response[] = [
                    'Id_Pembayaran' => trim($ajuan->Id_Pembayaran),
                    'Id_Penagihan' => trim($ajuan->Id_Penagihan),
                    'Id_Bank' => trim($ajuan->Id_Bank),
                    'Rincian_Bayar' => trim($ajuan->Rincian_Bayar),
                    'Nilai_Pembayaran' => number_format($ajuan->Nilai_Pembayaran, 2, '.', ','),
                    'Id_Jenis_Bayar' => trim($ajuan->Id_Jenis_Bayar),
                    'Jenis_Pembayaran' => trim($ajuan->Jenis_Pembayaran),
                    'Id_MataUang' => trim($ajuan->Id_MataUang),
                    'Nama_MataUang' => trim($ajuan->Nama_MataUang),
                    'Jml_JenisBayar' => $ajuan->Jml_JenisBayar,
                    'Kurs_Bayar' => intval($ajuan->Kurs_Bayar),
                    'NM_SUP' => $ajuan->NM_SUP,
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
