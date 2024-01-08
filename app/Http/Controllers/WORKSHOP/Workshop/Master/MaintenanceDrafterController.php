<?php
namespace App\Http\Controllers\WORKSHOP\Workshop\Master;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MaintenanceDrafterController extends Controller
{

    public function index()
    {
        $drafter = DB::connection('Connworkshop')->select('exec [SP_5298_WRK_USER-DRAFTER]');

        return view('WORKSHOP.Workshop.Master.MaintenanceDrafter', compact(['drafter']));
    }


    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        //dd($request->all());
        //buat variabel
        $idDraf = $request->UsrDraf;
        $namaPembuat = $request->nama;
        $ada = $this->Cekdrafter($idDraf);
        //dd($ada[0]->ada);
        if ($ada[0]->ada > 0) {
            //dd($ada[0]);
            return redirect()->back()->with('success','User Drafter '. $idDraf . ' Sudah Ada!');
        }
        else {
            //ini itu buat isi data ke data bese
            DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_PROSES-DRAFTER] @kode = ?, @kdDraf = ?, @nmDraf = ?', [1, $idDraf, $namaPembuat]);
            //ini buat kasih pensan sukses
            return redirect()->back()->with('success', $namaPembuat . ' Sudah Ditambahkan! Dengan Id User ' . $idDraf);
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
         $idDraf = $request->UserDrafter;
         $namaPembuat = $request->nama;
         DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_PROSES-DRAFTER] @kode = ?, @kdDraf = ?, @nmDraf = ?', [2, $idDraf, $namaPembuat]);
         return redirect()->back()->with('success', $namaPembuat . ' Sudah Diubah! Dengan Kode Divisi ' . $idDraf);
    }


    public function destroy($id)
    {
            //dd('masuk delete');
            $ada = $this->CekAdaTransaksi($id);
            //dd($ada);
            if ($ada[0]->ada > 0) {
                //dd($ada[0]);
                return redirect()->back()->with('success','Data Drafter Tdk Boleh diHapus, karena sudah dipakai utk Transaksi');
            }
            else {
                DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_PROSES-DRAFTER] @kode = ?, @kdDraf = ?', [3, $id]);
                return redirect()->back()->with('success', $id . ' Sudah DiHapus!');
            }
    }
    public function PengecekanAksesUser() {
        //pengecekan akses user untuk Maintenance Drafter
    }
    public function Cekdrafter($kddraf)
    {
        $ada = DB::connection('Connworkshop')->select('exec [SP_5298_WRK_CEK-DRAFTER] @kode = ?, @kdDraf = ?', [2, $kddraf]);
        return $ada;
        //dd($ada);
    }
    public function CekAdaTransaksi($kddraf) {
        $ada = DB::connection('Connworkshop')->select('exec [SP_5298_WRK_CEK-DRAFTER] @kode = ?, @kdDraf = ?', [1, $kddraf]);
        return $ada;
    }
}
