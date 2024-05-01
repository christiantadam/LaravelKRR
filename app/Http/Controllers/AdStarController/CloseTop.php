<?php

namespace App\Http\Controllers\AdStarController;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;

class CLoseTop extends Controller
{
    public function index()
    {
        $result = (new HakAksesController)->HakAksesFitur('Close Top');
        $access = (new HakAksesController)->HakAksesFiturMaster('AD Star');
        $dataCust = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_CUSTOMER @Kode=2');

        if ($result) {
            return view('AdStar.CloseTop', compact('dataCust', 'access'));
        } else {
            return redirect()->route('AdStar.AdStarHome')->with('status', 'Anda Tidak Memiliki Hak Akses Fitur Tabel Hitungan - Close Top!');
        }
    }
     /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($cr)
    {
        $crExplode = explode(".", $cr);
        $lastIndex = count($crExplode) -1;


        //getorder
      if ($crExplode[$lastIndex] == "dataProdType") {
            $dataProdType = DB::connection('ConnAdstar')->select('exec SP_1486_ADSTAR_LIST_TABEL_HITUNGAN @Kode= ?, @idcust= ?' , [ 7, $crExplode[0]]);
            // dd($dataObjek);
            // Return the options as JSON data
            return response()->json($dataProdType);

            // dd($crExplode);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
