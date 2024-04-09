<?php

namespace App\Http\Controllers\WORKSHOP\Workshop\Master;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use Illuminate\Support\Facades\DB;
use Auth;


class MaintenanceDivisiController extends Controller
{
    public function index()
    {
        $divisi = DB::connection('Connworkshop')->select('exec SP_5298_WRK_DIVISI');
        $result = (new HakAksesController)->HakAksesProgram('Workshop');
        $access = (new HakAksesController)->HakAksesFiturMaster('Workshop');
        //dd(count($divisi));
        //$this->Cekdivisi(123);
        return view('WORKSHOP.Workshop.Master.MaintenanceDivisi', compact(['divisi','result','access']));
    }
    public function create()
    {
        dd('masuk create');
    }
    public function store(Request $request)
    {
        //dd($request->all());
        //buat variabel
        $idDivisi = $request->IdDivisi;
        $namaDivisi = $request->nama_divisi;
        //ini itu buat isi data ke data bese
        $ada = $this->Cekdivisi($idDivisi);
        //dd($ada[0]->ada);
        if ($ada[0]->ada > 0) {
            //dd($ada[0]);
            return redirect()->back()->with('error','Divisi '. $idDivisi . ' Sudah Ada!');
        }
        else {
            DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_PROSES-DIVISI] @kode = ?, @kdDivisi = ?, @nmDivisi = ?', [1, $idDivisi, $namaDivisi]);
            //ini buat kasih pesan sukses
            //echo "wdawda";
            return redirect()->back()->with('success', $namaDivisi . ' Sudah Dibuat! Dengan Kode Divisi ' . $idDivisi);
        }

    }
    public function show($id)
    {
        dd('masuk show');
    }
    public function edit($id)
    {
        dd('masuk edit');
    }
    public function update(Request $request, $id)
    {
        //dd($request->all());
        $idDivisi = $request->KodeDivisi;
        $namaDivisi = $request->nama_divisi;
        DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_PROSES-DIVISI] @kode = ?, @kdDivisi = ?, @nmDivisi = ?', [2, $idDivisi, $namaDivisi]);
        return redirect()->back()->with('success', $namaDivisi . ' Sudah Diubah! Dengan Kode Divisi ' . $idDivisi);
    }
    public function destroy($id)
    {
        //dd('masuk delete');
        $ada = $this->CekAdaTransaksi($id);
        //dd($ada);
        if ($ada[0]->ada > 0) {
            //dd($ada[0]);
            return redirect()->back()->with('error','Data Divisi Tdk Boleh diHapus, karena sudah dipakai utk Transaksi ');
        }
        else{
            DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_PROSES-DIVISI] @kode = ?, @kdDivisi = ?', [3, $id]);
            return redirect()->back()->with('success', $id . ' Sudah DiHapus!');
        }
    }
    public function PengecekanAksesUser()
    {
        //pengecekan akses user untuk page maintenance divisi
    }
    public function Cekdivisi($kdDivisi)
    {
        $ada = DB::connection('Connworkshop')->select('exec [SP_5298_WRK_CEK-DIVISI] @kode = ?, @kdDivisi = ?', [2, $kdDivisi]);
        return $ada;
        //dd($ada);
    }
    public function CekAdaTransaksi($kdDivisi) {
        $ada = DB::connection('Connworkshop')->select('exec [SP_5298_WRK_CEK-DIVISI] @kode = ?, @kdDivisi = ?', [1, $kdDivisi]);
        return $ada;
    }
}
