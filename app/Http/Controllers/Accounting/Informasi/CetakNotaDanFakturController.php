<?php

namespace App\Http\Controllers\Accounting\Informasi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;


class CetakNotaDanFakturController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Informasi.CetakNotadanFaktur', compact('access'));
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
        if ($id === 'getCust') {
            $Tgl_Penagihan = $request->input('Tgl_Penagihan');

            $divisi = DB::connection('ConnAccounting')->select(
                'exec SP_LIST_PENAGIHAN_SJ @Kode = ?, @Tgl_Penagihan = ?'
                ,
                [10, $Tgl_Penagihan]
            );
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'NamaCust' => $detail_divisi->NamaCust,
                    'Id_Penagihan' => $detail_divisi->Id_Penagihan,
                ];
            }
            return datatables($divisi)->make(true);
        }

        // get divisi
        else if ($id === 'getSuratJalan') {
            $Id_Penagihan = $request->input('Id_Penagihan');

            $divisi = DB::connection('ConnAccounting')->select('exec SP_LIST_PENAGIHAN_SJ
            @Kode = ?, @Id_Penagihan = ?', [11, $Id_Penagihan]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'Surat_Jalan' => $detail_divisi->Surat_Jalan,
                ];
            }
            return response()->json($data_divisi);
        }

        // get divisi
        else if ($id === 'getPajak') {
            $Id_Penagihan = $request->input('Id_Penagihan');

            $divisi = DB::connection('ConnAccounting')->select('exec SP_LIST_PENAGIHAN_SJ
                    @Kode = ?, @Id_Penagihan = ?', [12, $Id_Penagihan]);
            $data_divisi = [];
            foreach ($divisi as $detail_divisi) {
                $data_divisi[] = [
                    'IdFakturPajak' => $detail_divisi->IdFakturPajak,
                    'Id_MataUang' => $detail_divisi->Id_MataUang,
                ];
            }
            return response()->json($data_divisi);
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
