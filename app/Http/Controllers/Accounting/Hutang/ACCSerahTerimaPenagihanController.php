<?php

namespace App\Http\Controllers\Accounting\Hutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;

class ACCSerahTerimaPenagihanController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Hutang.ACCSerahTerimaPenagihan', compact('access'));
        // $data = 'Accounting';
        // return view('Accounting.Hutang.ACCSerahTerimaPenagihan', compact('data'));
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
        if ($id == 'getSerahTerima') {
            $data = DB::connection('ConnAccounting')
                ->select('exec SP_1273_ACC_LIST_TT_SERAHTRM');
            // dd($data);
            $response = [];
            foreach ($data as $row) {
                $statusPpn = $row->Status_PPN == 'N' ? 'Tidak Ada' : 'Ada Pajak';
                $response[] = [
                    'Waktu_Penagihan' => \Carbon\Carbon::parse($row->Waktu_Penagihan)->format('m/d/Y'),
                    'Id_Penagihan' => trim($row->Id_Penagihan),
                    'NM_SUP' => trim($row->NM_SUP),
                    'Nama_Dokumen' => trim($row->Nama_Dokumen),
                    'Status_PPN' => $statusPpn,
                    'Nama_MataUang' => trim($row->Nama_MataUang),
                    'Nilai_Penagihan' => number_format($row->Nilai_Penagihan, 4, '.', ','),
                    'Id_MataUang' => $row->Id_MataUang,
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
