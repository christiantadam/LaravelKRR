<?php

namespace App\Http\Controllers\Accounting\Piutang;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;


class MaintenanceBKMTransistorisBankController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Piutang.MaintenanceBKMTransistorisBank', compact('access'));
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
    public function show($id, Request $request)
    {
        $user = Auth::user()->NomorUser;

        // get user id
        if ($id === 'getUserId') {
            return response()->json(['user' => $user]);
        }

        // get divisi
        else if ($id === 'getMataUang') {
            $divisi = DB::connection('ConnAccounting')->select('exec SP_5298_ACC_LIST_MATA_UANG @kode = ?', [1]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'Id_MataUang' => $detail_divisi->Id_MataUang,
                    'Nama_MataUang' => $detail_divisi->Nama_MataUang,
                ];
            }
            return datatables($divisi)->make(true);
        }

        // get divisi
        else if ($id === 'getBank') {
            $divisi = DB::connection('ConnAccounting')->select('exec SP_5298_ACC_LIST_BANK');
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'Id_Bank' => $detail_divisi->Id_Bank,
                    'Nama_Bank' => $detail_divisi->Nama_Bank,
                ];
            }
            return datatables($divisi)->make(true);
        }

        // get divisi
        else if ($id === 'getAccBank') {
            $idBank = $request->input('idBank');

            $divisi = DB::connection('ConnAccounting')->select('exec SP_5298_ACC_LIST_BANK_1 @idBank = ?', [$idBank]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'jenis' => $detail_divisi->jenis,
                ];
            }
            return response()->json($data_divisi);
        }

        // get divisi
        else if ($id === 'getJenisBayar') {
            // $idBank = $request->input('idBank');

            $divisi = DB::connection('ConnAccounting')->select('exec SP_5298_ACC_JENIS_DOK');
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'Id_Jenis_Bayar' => $detail_divisi->Id_Jenis_Bayar,
                    'Jenis_Pembayaran' => $detail_divisi->Jenis_Pembayaran,
                ];
            }
            return datatables($divisi)->make(true);
        }

        // get divisi
        else if ($id === 'getPerkiraan') {
            // $idBank = $request->input('idBank');

            $divisi = DB::connection('ConnAccounting')->select('exec SP_5298_ACC_LIST_KODE_PERKIRAAN @Kode = ?', [1]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'NoKodePerkiraan' => $detail_divisi->NoKodePerkiraan,
                    'Keterangan' => $detail_divisi->Keterangan,
                ];
            }
            return datatables($divisi)->make(true);
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
        $proses = $request->all();
        if ($proses['cetak'] == "tampilBKK") {
            //dd($request->all());
            $idBKK = $request->idTampilBKK;
            DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_TGLCETAK_BKK] @idBKK = ?', [
                $idBKK
            ]);
            return redirect()->back()->with('success', 'Tanggal cetak sudah terupdate');

        } else if ($proses['cetak'] == "tampilBKM") {
            //dd('masuk');
            $idBKM = $request->idTampilBKM;
            DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_UPDATE_TGLCETAK_BKM] @idBKM = ?', [
                $idBKM
            ]);
            return redirect()->back()->with('success', 'Detail Sudah Terkoreksi');
        }

        //dd($request->all());
    }



    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
