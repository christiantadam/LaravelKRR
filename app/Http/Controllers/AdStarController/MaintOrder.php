<?php

namespace App\Http\Controllers\AdStarController;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class MaintOrder extends Controller
{
    public function index()
    {
        $dataCust = DB::connection('ConnAdstar')->select('exec SP_1486_ADSTAR_LIST_ORDER @Kode=1');
        $datanoordkrj = DB::connection('ConnAdstar')->select('exec SP_1486_ADSTAR_LIST_ORDER @Kode=10');



        return view('AdStar.MaintOrder', compact('dataCust','datanoordkrj'));//
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
        $data = $request->all();
        // dd($data);
        DB::connection('ConnAdstar')->statement('exec SP_1486_ADSTAR_MAINT_ORDER @kode = ?, @Tgl_Order = ?, @No_Order = ?, @No_Sp = ?, @Kd_Brg = ?, @Jml_Order = ?, @A_Order = ?, @R_Tgl_Start = ?, @R_Tgl_Finish = ?, @IdPesanan = ?, @BufferStok = ?', [
            $data['kode'],
            $data['Tgl_Order'],
            $data['No_Order'],
            $data['No_Sp'],
            $data['Kd_Brg'],
            $data['Jml_Order'],
            $data['A_Order'],
            $data['R_Tgl_Start'],
            $data['R_Tgl_Finish'],
            $data['IdPesanan'],
            $data['BufferStok'],
        ]);
        return redirect()->route('AdStarMaintOrder.index')->with('alert', 'Berhasil Tambah Data !');

    }

    //Display the specified resource.
    public function show($cr)
    {
        $crExplode = explode(".", $cr);
        $lastIndex = count($crExplode) -1;
        // dd($crExplode);
        //getDivisi
        if ($crExplode[$lastIndex] == "dataBrng") {
            $dataBrng = DB::connection('ConnAdstar')->select('exec SP_1486_ADSTAR_LIST_ORDER @Kode= ?, @idcust= ?', [2, $crExplode[0]]);
            // dd($dataObjek);
            // Return the options as JSON data
            return response()->json($dataBrng);

            // dd($crExplode);
        }
        elseif ($crExplode[$lastIndex] == "dataSrtPsn") {
            $dataSrtPsn = DB::connection('ConnAdstar')->select('exec SP_1486_ADSTAR_LIST_ORDER @Kode= ?, @idcust= ?, @KD_BRG= ?' , [3, $crExplode[0], $crExplode[1]]);
            // dd($dataObjek);
            // Return the options as JSON data
            return response()->json($dataSrtPsn);

            // dd($crExplode);
        }
        elseif ($crExplode[$lastIndex] == "datastkordsblm") {
            $datastkordsblm = DB::connection('ConnAdstar')->select('exec SP_1486_ADSTAR_LIST_ORDER @Kode= ?, @KD_BRG= ?', [12, $crExplode[0]]);
            // dd($dataObjek);
            // Return the options as JSON data
            return response()->json($datastkordsblm);

            // dd($crExplode);
        }
        elseif ($crExplode[$lastIndex] == "dataSrtPsn2") {
            $dataSrtPsn2 = DB::connection('ConnAdstar')->select('exec SP_1486_ADSTAR_LIST_ORDER @Kode= ?, @NoSP= ?', [4, $crExplode[0]]);
            // dd($dataObjek);
            // Return the options as JSON data
            return response()->json($dataSrtPsn2);

            // dd($crExplode);
        }
        elseif ($crExplode[$lastIndex] == "dataJmlhPress") {
            $dataJmlhPress = DB::connection('ConnAdstar')->select('exec SP_1486_ADSTAR_LIST_ORDER @Kode= ?, @IDPESANAN= ?', [11, $crExplode[0]]);
            // dd($dataObjek);
            // Return the options as JSON data
            return response()->json($dataJmlhPress);

            // dd($crExplode);
        }
        elseif ($crExplode[$lastIndex] == "datasisastok") {
            $datasisastok = DB::connection('ConnAdstar')->select('exec SP_1486_ADSTAR_LIST_ORDER @Kode= ?, @KD_BRG= ?, @nosp= ?, @tglorder= ?', [13, $crExplode[0], $crExplode[1], $crExplode[2]]);
            // dd($datasisastok);
            // Return the options as JSON data
            return response()->json($datasisastok);

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

        DB::connection('ConnAdstar')->statement('exec SP_1486_ADSTAR_MAINT_ORDER @kode = ?, @Tgl_Order = ?, @No_Order = ?, @No_Sp = ?, @Kd_Brg = ?, @Jml_Order = ?, @A_Order = ?, @R_Tgl_Start = ?, @R_Tgl_Finish = ?, @IdPesanan = ?, @BufferStok = ?', [
            $data['kode'],
            $data['Tgl_Order'],
            $data['No_Order'],
            $data['No_Sp'],
            $data['Kd_Brg'],
            $data['Jml_Order'],
            $data['A_Order'],
            $data['R_Tgl_Start'],
            $data['R_Tgl_Finish'],
            $data['IdPesanan'],
            $data['BufferStok'],
        ]);
        return redirect()->route('AdStarMaintOrder.index')->with('alert', 'Data Produksi Updated successfully!');
    }

    public function destroy(Request $request)
    {
        $data = $request->all();
        // dd('Masuk Destroy', $data);
        DB::connection('ConnAdstar')->statement('exec SP_1486_ADSTAR_MAINT_ORDER @kode = ?, @Tgl_Order = ?, @No_Order = ?, @No_Sp = ?, @Kd_Brg = ?, @Jml_Order = ?, @A_Order = ?, @R_Tgl_Start = ?, @R_Tgl_Finish = ?, @IdPesanan = ?, @BufferStok = ?', [
            $data['kode'],
            $data['Tgl_Order'],
            $data['No_Order'],
            $data['No_Sp'],
            $data['Kd_Brg'],
            $data['Jml_Order'],
            $data['A_Order'],
            $data['R_Tgl_Start'],
            $data['R_Tgl_Finish'],
            $data['IdPesanan'],
            $data['BufferStok'],
        ]);
        return redirect()->route('AdStarMaintOrder.index')->with('alert', 'Data Produksi  berhasil dihapus!');
    }

    //Remove the specified resource from storage.
//     public function destroy($id)
//     {
//             //

// }
}
