<?php

namespace App\Http\Controllers\AdStarController;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class StopOrder extends Controller
{
    public function index()
    {
        // $dataorder = DB::connection('ConnAdstar')->select('exec SP_1486_ADSTAR_LIST_ORDER @Kode= ?', [10]);
        //     dd($dataorder);
        return view('AdStar.StopOrder');//
    }

     //Display the specified resource.
    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        //
    }

    //Display the specified resource.
    public function show($cr)
    {
        $crExplode = explode(".", $cr);


        //getorder
        if ($crExplode[1] == "dataOrder") {
            $dataOrder = DB::connection('ConnAdstar')->select('exec SP_1486_ADSTAR_LIST_ORDER @Kode= ?', [ $crExplode[0]]);
            // dd($dataOrder);
            // dd($dataObjek);
            // Return the options as JSON data
            return response()->json($dataOrder);

            // dd($crExplode);

        }
        else if ($crExplode[1] == "dataOrder2") {
            $dataOrder = DB::connection('ConnAdstar')->select('exec SP_1486_ADSTAR_LIST_ORDER @Kode= ?, @no_order= ?', [9, $crExplode[0]]);
            dd($dataOrder);
            // dd($dataObjek);
            // Return the options as JSON data
            return response()->json($dataOrder);

            // dd($crExplode);

        }
    }

    // Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request)
    {
        $data = $request->all();

        DB::connection('ConnAdstar')->statement('exec SP_1486_ADSTAR_MAINT_ORDER @kode = ?, @No_Order = ?, @A_Tgl_Finish = ?', [
            $data['kode'],
            $data['IDLOG'],
            $data['Tanggal'],


        ]);
        return redirect()->route('StopOrder.index')->with('alert', 'Data Produksi Updated successfully!');
    }

    //Remove the specified resource from storage.
//     public function destroy($id)
//     {
//             //


// }
}
