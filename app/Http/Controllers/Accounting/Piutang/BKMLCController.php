<?php

namespace App\Http\Controllers\Accounting\Piutang;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;

class BKMLCController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Piutang.BKMLC', compact('access'));
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
        if ($id === 'tampilPelunasan') {
            $bln = $request->input('bln');
            $thn = $request->input('thn');

            // Initialize $data_divisi array before the loop
            $data_divisi = [];

            $tabel = DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_LIST_PELUNASAN_DOLLAR] @bln = ?, @thn = ?', [$bln, $thn]);

            foreach ($tabel as $detail_divisi) {
                $biaya = 0;
                $krglbh = 0;
                $nilai = 0;

                // Fetch Biaya data
                $cekBiaya = DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_CEK_BIAYA] @idPelunasan = ?', [$detail_divisi->Id_Pelunasan]);

                $adaBiaya = intval($cekBiaya[0]->ada);
                if ($adaBiaya > 0) {
                    $cekBiaya1 = DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_CEK_BIAYA_1] @idPelunasan = ?', [$detail_divisi->Id_Pelunasan]);

                    foreach ($cekBiaya1 as $detail_biaya1) {
                        $biaya += floatval($detail_biaya1->biaya);
                    }
                }

                // Fetch KurangLebih data
                $cekKrgLbh = DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_CEK_KRGLBH] @idPelunasan = ?', [$detail_divisi->Id_Pelunasan]);

                $adaBiaya = intval($cekKrgLbh[0]->ada);
                if ($adaBiaya > 0) {
                    $cekKrgLbh1 = DB::connection('ConnAccounting')->select('exec [SP_5298_ACC_CEK_KRGLBH_1] @idPelunasan = ?', [$detail_divisi->Id_Pelunasan]);

                    foreach ($cekKrgLbh1 as $detail_biaya1) {
                        $krglbh += floatval($detail_biaya1->KurangLebih);
                    }
                }

                // Calculate Nilai Pelunasan
                $nilai = floatval($detail_divisi->Nilai_Pelunasan) - $biaya + $krglbh;

                // Append to the array
                $data_divisi[] = [
                    'Id_Pelunasan' => $detail_divisi->Id_Pelunasan,
                    'Tgl_Pelunasan' => $detail_divisi->Tgl_Pelunasan,
                    'Id_bank' => $detail_divisi->Id_bank,
                    'Jenis_Pembayaran' => $detail_divisi->Jenis_Pembayaran,
                    'Nama_MataUang' => $detail_divisi->Nama_MataUang,
                    'Nilai_Pelunasan' => $detail_divisi->Nilai_Pelunasan,
                    'No_Bukti' => $detail_divisi->No_Bukti,
                    'SaldoPelunasan' => $detail_divisi->SaldoPelunasan,
                    'nilai' => $nilai,
                ];
            }

            // Return the accumulated data
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
