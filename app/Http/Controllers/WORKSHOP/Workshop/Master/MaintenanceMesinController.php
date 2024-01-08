<?php

namespace App\Http\Controllers\WORKSHOP\Workshop\Master;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MaintenanceMesinController extends Controller
{

    public function index()
    {
        $divisi = DB::connection('Connworkshop')->select('exec SP_5298_WRK_DIVISI');
        //$mesin = DB::connection('Connworkshop')->select('exec SP_5298_WRK_LIST-MESIN');

        return view('WORKSHOP.Workshop.Master.MaintenanceMesin', compact(['divisi']));
    }
    public function getmesin($id)
    {
        $data = DB::connection('Connworkshop')->select('exec [SP_5298_WRK_LIST-MESIN] @Id_Divisi = ?', [$id]);
        // dd($data);
        return response()->json($data);
    }

    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        //dd($request->all());
        $idDivisi = $request->divisi;
        $namamesin = $request->isiMesin;

        $ada = $this->cekdivisi($idDivisi, $namamesin);
        if ($ada[0]->ada > 0) {
            return redirect()->back()->with('error', 'Mesin ' . $namamesin . ' Sudah Ada! Pada Divisi ' . $idDivisi);
        } else {
            DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_PROSES-MESIN] @kode = ?, @Id_Divisi = ?, @mesin = ?', [1, $idDivisi, $namamesin]);
            //ini buat kasih pesan sukses
            //echo "wdawda";
            return redirect()->back()->with('success', $namamesin . ' Sudah Dibuat! Dengan Kode Divisi ' . $idDivisi);
        }
    }


    public function show($id)
    {
        //
    }


    public function edit($id)
    {
        //
    }


    public function update(Request $request, $id)
    {
        //dd($request->all());
        $idDivisi = $request->divisi;
        $namamesin = $request->isiMesin;
        $idmesin = $request->mesin;
        DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_PROSES-MESIN] @kode = ?, @Id_Divisi = ?,@noMesin =? , @mesin = ?', [2, $idDivisi, $idmesin, $namamesin]);
        //ini buat kasih pesan sukses
        //echo "wdawda";
        return redirect()->back()->with('success', $namamesin . ' Sudah diubah! Dengan Kode Divisi ' . $idDivisi);
    }


    public function destroy($id)
    {
        $ada = $this->cekmesin($id);
        if ($ada['ada'][0]->ada > 0 or $ada['ambildata'][0]->ada > 0) {
            return redirect()->back()->with('error', 'Data Mesin Tdk Boleh diHapus, karena sudah dipakai utk Transaksi');
        } else {
            DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_PROSES-MESIN] @kode = ?, @noMesin =?', [3, $id]);
            //ini buat kasih pesan sukses
            //echo "wdawda";
            return redirect()->back()->with('success', $id . ' Sudah dihapus!');
        }
    }
    public function cekdivisi($idDivisi, $mesin)
    {
        $ada = DB::connection('Connworkshop')->select('exec [SP_5298_WRK_CEK-MESIN] @kode = ?, @Id_Divisi = ?, @mesin = ?', [2, $idDivisi, $mesin]);
        return $ada;
    }
    public function cekmesin($nomesin)
    {
        $ada = DB::connection('Connworkshop')->select('exec [SP_5298_WRK_CEK-MESIN] @kode = ?, @noMesin = ?', [1, $nomesin]);
        $ambildata = DB::connection('Connworkshop')->select('exec [SP_5298_WRK_CEK-MESIN] @kode = ?, @noMesin = ?', [3, $nomesin]);
        $dataArray = [
            'ada' => $ada,
            'ambildata' => $ambildata,
        ];
        return $dataArray;
    }
}
