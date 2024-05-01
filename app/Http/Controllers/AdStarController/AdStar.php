<?php

namespace App\Http\Controllers\AdStarController;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;

class AdStar extends Controller
{
    public function index()
    {
        // dd('masuk index');
        $result = (new HakAksesController)->HakAksesProgram('AD Star');
        $access = (new HakAksesController)->HakAksesFiturMaster('AD Star');
        // $counterBrg = DB::connection('ConnPurchase')->table('YCOUNTER')->select('Y_BARANG')->get();
        // dd(intval($counterBrg[0]->Y_BARANG) + 1);
        if ($result) {
            return view('AdStar.AdStarHome',compact('access'));
        } else {
            return redirect('home')->with('status','Anda Tidak Memiliki Hak Akses Program Ad Star!');
        }
    }

    public function create()
    {

    }

    public function store(Request $request)
    {

    }

    public function show($id)
    {

    }

    public function edit($id)
    {

    }

    public function update(Request $request, $id)
    {

    }

    public function destroy($id)
    {

    }
}
