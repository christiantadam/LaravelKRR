<?php

namespace App\Http\Controllers\AdStarController;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PrintTabel extends Controller
{
    public function index()
    {
        return view('AdStar.PrintTabel');//
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
        if ($crExplode[$lastIndex] == "dataCust") {
            $dataCust = DB::connection('ConnAdstar')->select('exec SP_1486_ADSTAR_LIST_TABEL_HITUNGAN @Kode= ?, @idjenis ?', [4, $crExplode[0]]);
            return response()->json($dataCust);

            // dd($crExplode);

        }else if ($crExplode[$lastIndex] == "dataUkuran") {
            $dataUkuran = DB::connection('ConnAdstar')->select('exec SP_1486_ADSTAR_LIST_TABEL_HITUNGAN @Kode= ?, @IDCUST= ?', [8, $crExplode[0]]);
            return response()->json($dataUkuran);

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
