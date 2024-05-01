<?php

namespace App\Http\Controllers\AdStarController;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class CopyTabel extends Controller
{
    public function index()
    {
        $dataCust2 = DB::connection('ConnSales')->select('exec SP_1486_SLS_LIST_CUSTOMER @Kode=2');

        return view('AdStar.CopyTabel', compact('dataCust2'));//
    }

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
        if ($crExplode[$lastIndex] == "dataCust1") {
            $dataCust1 = DB::connection('ConnAdstar')->select('exec SP_1486_ADSTAR_LIST_TABEL_HITUNGAN @Kode= ?', [ $crExplode[0]]);
            // dd($dataCust1);
            // dd($dataObjek);
            // Return the options as JSON data
            return response()->json($dataCust1);

            // dd($crExplode);

        }elseif ($crExplode[$lastIndex] == "dataProdType") {
            $dataProdType = DB::connection('ConnAdstar')->select('exec SP_1486_ADSTAR_LIST_ORDER @Kode= ?, @idcust= ?' , [ $crExplode[0], $crExplode[1]]);
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
