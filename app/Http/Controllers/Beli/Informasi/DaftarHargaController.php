<?php

namespace App\Http\Controllers\Beli\Informasi;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use DB;
use Illuminate\Support\Facades\DB as FacadesDB;
use Illuminate\Support\Facades\Auth;

class DaftarHargaController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        $result = (new HakAksesController)->HakAksesFitur('Daftar Harga');
        // dd($result);
        if ($result > 0) {
            return view('Beli.Informasi.DaftarHarga', compact('access'));
        } else {
            abort(403);
        }
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    public function redisplay(Request $request)
    {
        $nm_brg = $request->input('nm_brg');
        $kd = 1;
        $req = $request->input('req');
        $sup = $request->input('sup');
        $kdbrg = $request->input('kdbrg');
        if (($nm_brg != null) || ($req != null) || ($sup != null) || ($kdbrg != null)) {
            try {
                $redisplay = DB::connection('ConnPurchase')->select('exec spSelect_CariTypeBarang_dotNet @nm_brg = ?, @kd = ?, @req = ?, @sup = ?, @kdbrg = ?', [$nm_brg, $kd, $req, $sup, $kdbrg]);
                return datatables($redisplay)->make(true);
            } catch (\Throwable $Error) {
                return Response()->json($Error);
            }
        } else {
            return Response()->json('Parameter harus di isi');
        }
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
    }

    //Display the specified resource.
    public function show($id)
    {
        //
    }

    //Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request, $id)
    {
        //
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
