<?php

namespace App\Http\Controllers\WORKSHOP\Workshop\Master;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UpdateNoGambarController extends Controller
{

    public function index()
    {
        //$Gambar = DB::connection('ConnPurchase')->select('exec [SP_5298_WRK_USER-DRAFTER]');
        return view('WORKSHOP.Workshop.Master.UpdateNoGambar');
    }
    public function Getdata($id)
    {
        $data = DB::connection('ConnPurchase')->select('exec [SP_5298_WRK_LOAD-BARANG] @KdBarang = ?', [$id]);
        // dd($data);
        return response()->json($data);
    }

    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        //
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
        $kd_barang = $request->kd_barang;
        $nama_barang = $request->nama_barang;
        $no_gambar = $request->no_gambar;
        $ada = $this->CekNoGambar($no_gambar);
        //dd($ada['ambildata']);
        if ($ada['ada'][0]->ada > 0) {
            //dd($ada[0]);
            $namaBarang = $ada['ambildata'][0] -> Nama_Brg;
            $kdBarang = $ada['ambildata'][0] -> Kd_Brg;
            return redirect()->back()->with('error','Nomor Gambar Sudah dipakai untuk Kode Barang ' . $kdBarang .' Dengan nama '. $namaBarang .'. Tidak bisa diproses');
        }
        else {

            DB::connection('ConnPurchase')->statement('exec [SP_5298_WRK_UPDATE-NO-GBR] @kode = ?, @kdBrg = ?, @noGbr = ?', [1, $kd_barang, $no_gambar]);
            return redirect()->back()->with('success', $nama_barang . ' Sudah Diubah! Dengan Kode Barang ' . $no_gambar. 'Dan Nomor Gambar '.$no_gambar);
        }
        //dd($request->all());
    }


    public function destroy($id)
    {
        //
    }
    public function PengecekanAksesUser() {
        //pengecekan akses user Update Nomor Gambar
    }
    public function CekNoGambar($no_gambar) {
        $ada = DB::connection('ConnPurchase')->select('exec [SP_5298_WRK_CEK-NO-GAMBAR] @kode = ?, @noGbr = ?', [1, $no_gambar]);
        $ambildata = DB::connection('ConnPurchase')->select('exec [SP_5298_WRK_CEK-NO-GAMBAR] @kode = ?, @noGbr = ?', [2, $no_gambar]);
        $dataArray = [
             'ada' => $ada,
            'ambildata' => $ambildata,
        ];
        return $dataArray;
    }
}
