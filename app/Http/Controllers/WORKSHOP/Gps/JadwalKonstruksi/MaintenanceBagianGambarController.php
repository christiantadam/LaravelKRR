<?php

namespace App\Http\Controllers\WORKSHOP\Gps\JadwalKonstruksi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class MaintenanceBagianGambarController extends Controller
{
    public function index()
    {
        //
        return view('workshop.GPS.Jadwal_konstruksi.MaintenanceGambar');
    }
    public function LoadData($noOd){
        $data = DB::connection('Connworkshop')->select('[SP_5298_PJW_LIST-ORDER-GAMBAR] @kode = ?, @noOd = ?', [1,$noOd]);
        return response()->json($data);
    }
    public function cekdataestimasi($noOd) {
        $data = DB::connection('Connworkshop')->select('[SP_5298_PJW_CEK-ESTIMASI-KONSTRUKSI] @noOd = ?', [$noOd]);
        return response()->json($data);
    }
    public function cekdata($noOd, $bagian) {
        $data = DB::connection('Connworkshop')->select('[SP_5298_PJW_CEK-BAGIAN-GAMBAR] @noOd = ?, @bagian = ?', [$noOd, $bagian]);
        return response()->json($data);
    }
    public function Getdatabagian($noOd) {
        $data = DB::connection('Connworkshop')->select('[SP_5298_PJW_LIST-BAGIAN-GAMBAR] @noOd = ?', [$noOd]);
        return response()->json($data);
    }
    public function cekdatabagian($noOd , $Idbag) {
        $data = DB::connection('Connworkshop')->select('[SP_5298_PJW_CEK-TRANSAKSI-BAGIAN-GAMBAR] @noOd = ? , @Idbag = ?', [$noOd,$Idbag]);
        return response()->json($data);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
        // dd($request->all());
        $noOd = $request->NoOrder;
        $bagian = $request->NamaBagiantext;
        DB::connection('Connworkshop')->statement('exec [SP_5298_PJW_MAINT-BAGIAN-GAMBAR] @kode = ?, @noOd = ?, @bagian = ?', [1, $noOd,$bagian]);
        return redirect()->back()->with('success',"Data telah diSimpan.");
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
        //
        // dd($request->all());
        $IdBagian = $request->NamaBagian;
        $bagian = $request->NamaBagiantext;
        DB::connection('Connworkshop')->statement('exec [SP_5298_PJW_MAINT-BAGIAN-GAMBAR] @kode = ?, @IdBagian = ?, @bagian = ?', [2, $IdBagian,$bagian]);
        return redirect()->back()->with('success',"Data telah diSimpan.");

    }

    public function destroy($id)
    {
        //
       // dd($id);
        DB::connection('Connworkshop')->statement('exec [SP_5298_PJW_MAINT-BAGIAN-GAMBAR] @kode = ?, @IdBagian = ?', [3, $id]);
        return redirect()->back()->with('success',"Data bagian telah DiHapus.");
    }
}
