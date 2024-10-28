<?php

namespace App\Http\Controllers\Accounting\Piutang;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;

class PelunasanPenjualanCashAdvanceController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Piutang.PelunasanPenjualanCashAdvance', compact('access'));
    }

    public function getCustIsiCashAdvance()
    {
        $tabel = DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_PELUNASAN_TAGIHAN] @Kode = ?', [7]);
        return datatables($tabel)->make(true);
    }

    public function getNoPelunasanCashAdvance($idCustomer)
    {
        $tabel = DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_PELUNASAN_TAGIHAN] @Kode = ?, @Id_Customer = ?', [6, $idCustomer]);
        return datatables($tabel)->make(true);
    }

    public function LihatHeaderPelunasanCashAdvance($noPelunasan)
    {
        $tabel = DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_PELUNASAN_TAGIHAN] @Kode = ?, @Id_Pelunasan = ?', [2, $noPelunasan]);
        return response()->json($tabel);
    }

    public function LihatDetailPelunasanCashAdvance($noPelunasan)
    {
        $tabel = DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_PELUNASAN_TAGIHAN] @Kode = ?, @Id_Pelunasan = ?', [3, $noPelunasan]);
        return response()->json($tabel);
    }

    public function getLihat_PenagihanCashAdvance($no_Pen)
    {
        $noPen = str_replace('.', '/', $no_Pen);
        $tabel = DB::connection('ConnAccounting')->select('exec [SP_LIST_PELUNASAN_TAGIHAN] @Kode = ?, @Id_Penagihan = ?', [5, $noPen]);
        return response()->json($tabel);
    }

    public function getLihat_PenagihanCashAdvance2($no_Pen)
    {
        $noPen = str_replace('.', '/', $no_Pen);
        $tabel = DB::connection('ConnAccounting')->select('exec [SP_LIST_PELUNASAN_TAGIHAN] @Kode = ?, @Id_Penagihan = ?', [4, $noPen]);
        return response()->json($tabel);
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {

        $noPelunasan = $request->noPelunasan;
        $idCustomer = $request->idCustomer;
        $idBKM = $request->idBKM;
        $sisa = $request->sisa;
        $nilai_Pelunasan = $request->nilai_Pelunasan;

        // $tabelIdDetailPelunasan = $request->tabelIdDetailPelunasan;
        // $tabelIdPenagihan = $request->tabelIdPenagihan;
        // $tabelNilaiPelunasan = $request->tabelNilaiPelunasan;
        // $tabelPelunasanRupiah = $request->tabelPelunasanRupiah;
        // $tabelMataUang = $request->tabelMataUang;
        // $tabelBiaya = $request->tabelBiaya;
        // $tabelLunas = $request->tabelLunas;
        // $tabelPelunasanCurrency = $request->tabelPelunasanCurrency;
        // $tabelKurangLebih = $request->tabelKurangLebih;
        // $tabelKodePerkiraan = $request->tabelKodePerkiraan;
        // $tabelKurs = $request->tabelKurs;
        // $tabelIdDetail = $request->tabelIdDetail;

        $listDataJSON = $request->input('listData');
        // Mendekode JSON menjadi array
        $listData = json_decode($listDataJSON, true);

        if (is_array($listData)) {
            foreach ($listData as $data) {
                $tabelIdDetailPelunasan = $data['tabelIdDetailPelunasan'];
                $noPelunasan = $noPelunasan;
                $tabelIdPenagihan = $data['tabelIdPenagihan'];
                $tabelNilaiPelunasan = $data['tabelNilaiPelunasan'];
                $tabelPelunasanRupiah = $data['tabelPelunasanRupiah'];
                $tabelBiaya = $data['tabelBiaya'];
                $tabelLunas = $data['tabelLunas'];
                $tabelPelunasanCurrency = $data['tabelPelunasanCurrency'];
                $tabelKurangLebih = $data['tabelKurangLebih'];
                $tabelKodePerkiraan = $data['tabelKodePerkiraan'];
                $tabelIdDetail = $data['tabelIdDetail'];
                $tabelMataUang = $data['tabelMataUang'];
                $tabelKurs = $data['tabelKurs'];

                DB::connection('ConnAccounting')->statement('exec [SP_1486_ACC_MAINT_PELUNASAN_TAGIHAN]
                @Kode = ?,
                @Id_Pelunasan = ?,
                @Id_Detail_Pelunasan = ?,
                @Id_Penagihan = ?,
                @Nilai_Pelunasan = ?,
                @Pelunasan_Rupiah = ?,
                @Biaya = ?,
                @Lunas = ?,
                @Pelunasan_Curency = ?,
                @KurangLebih = ?,
                @Kode_Perkiraan = ?,
                @Id_Penagihan_Pembulatan = ?
                ', [
                    5,
                    $tabelIdDetailPelunasan,
                    $noPelunasan,
                    $tabelIdPenagihan,
                    $tabelNilaiPelunasan,
                    $tabelPelunasanRupiah,
                    $tabelBiaya,
                    $tabelLunas,
                    $tabelPelunasanCurrency,
                    $tabelKurangLebih,
                    $tabelKodePerkiraan,
                    $tabelIdDetail
                ]);

                // DB::connection('ConnAccounting')->statement('exec [SP_5298_ACC_INSERT_KARTU_PIUTANG]
                // @IdPenagihan = ?,
                // @IdCust = ?,
                // @IdMtUang = ?,
                // @kreditRp = ?,
                // @kreditCur = ?,
                // @kurs = ?,
                // @noBKM = ?
                // ', [
                //     $tabelIdPenagihan,
                //     $idCustomer,
                //     $tabelMataUang,
                //     $tabelPelunasanRupiah,
                //     $tabelPelunasanCurrency,
                //     $tabelKurs,
                //     $idBKM
                // ]);

                DB::connection('ConnAccounting')->statement('exec [SP_1486_ACC_MAINT_PELUNASAN_TAGIHAN]
                @Kode = ?,
                @Id_Pelunasan = ?,
                @SaldoPelunasan = ?,
                @Nilai_Pelunasan = ?
                ', [
                    6,
                    $tabelIdDetailPelunasan,
                    $sisa,
                    $tabelNilaiPelunasan
                ]);
            }
        } else {
            return redirect()->back()->with('success', 'Data listData tidak valid');
        }
        // dd($listData);
        return redirect()->back()->with('success', 'Sudah TerSimpan');
    }

    //Display the specified resource.
    public function show($id, Request $request)
    {
        if ($id === 'getPenagihan') {
            $IdCustomer = $request->input('IdCustomer');

            $tabel = DB::connection('ConnAccounting')->select('exec [SP_LIST_PENAGIHAN_SJ] @Kode = ?, @IdCustomer = ?', [3, $IdCustomer]);
            return datatables($tabel)->make(true);
        }

        // lihat penaghihan
        else if ($id === 'lihatPenagihan') {
            $Id_Penagihan = $request->input('Id_Penagihan');

            $tabel = DB::connection('ConnAccounting')->select('exec [SP_LIST_PELUNASAN_TAGIHAN] @Kode = ?, @Id_Penagihan = ?', [5, $Id_Penagihan]);
            return response()->json($tabel);
        }
        
        // lihat penaghihan2
        else if ($id === 'lihatPenagihan2') {
            $Id_Penagihan = $request->input('Id_Penagihan');

            $tabel = DB::connection('ConnAccounting')->select('exec [SP_LIST_PELUNASAN_TAGIHAN] @Kode = ?, @Id_Penagihan = ?', [4, $Id_Penagihan]);
            return response()->json($tabel);
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
