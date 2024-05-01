<?php

namespace App\Http\Controllers\AdStarController;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class HasilProd extends Controller
{
    public function index()
    {
        $dataMesin = DB::connection('ConnAdstar')->select('exec SP_1486_ADSTAR_LIST_MESIN');
        // $dataTransaksi = DB::connection('ConnADSTAR')->select('exec SP_1486_ADSTAR_LIST_HASIL_PRODUKSI @Kode=1 @tanggal=' );
        $dataOrder = DB::connection('ConnAdstar')->select('exec SP_1486_ADSTAR_LIST_ORDER @Kode=5');
        // dd($dataOrder);

        return view('AdStar.HasilProd', compact('dataMesin','dataOrder'));//
    }
    // ,'?\dataTransaksi','dataOrder'


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
        DB::connection('ConnAdstar')->statement('exec SP_1486_ADSTAR_MAINT_HASIL_PRODUKSI @kode = ?, @Tanggal = ?, @No_Order = ?, @IDMESIN = ?, @GROUP = ?, @AWALSHIFT = ?, @AKHIRSHIFT = ?, @JMLPRIMER = ?, @JMLSEKUNDER = ?, @JMLTRITIER = ?, @USERINPUT = ?', [
            $data['kode'],
            $data['Tanggal'],
            $data['No_Order'],
            $data['IDMESIN'],
            $data['Group'],
            $data['AWALSHIFT'],
            $data['AKHIRSHIFT'],
            $data['JMLPRIMER'],
            $data['JMLSEKUNDER'],
            $data['JMLTRITIER'],
            1,
        ]);
        return redirect()->route('AdStarHasilProd.index')->with('alert', 'Berhasil Tambah Data !');

    }

    //Display the specified resource.
    public function show($cr)
    {
        $crExplode = explode(".", $cr);

        //getDivisi
        if ($crExplode[1] == "dataTransaksi") {
            $dataTransaksi = DB::connection('ConnAdstar')->select('exec SP_1486_ADSTAR_LIST_HASIL_PRODUKSI @Kode= ?, @tanggal= ?', [1, $crExplode[0]]);
            // dd($dataObjek);
            // Return the options as JSON data a
            return response()->json($dataTransaksi);

            // dd($crExplode);
        }else if ($crExplode[1] == "getDataProduksi") {
            $dataTransaksi = DB::connection('ConnAdstar')->select('exec SP_1486_ADSTAR_LIST_HASIL_PRODUKSI @Kode= ?, @IDLOG= ?', [2, $crExplode[0]]);
            // dd($dataTransaksi);
            // Return the options as JSON data a
            return response()->json($dataTransaksi);

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

        DB::connection('ConnAdstar')->statement('exec SP_1486_ADSTAR_MAINT_HASIL_PRODUKSI @kode = ?, @Tanggal = ?, @IDLOG = ?,@No_Order = ?, @IDMESIN = ?, @GROUP = ?, @AWALSHIFT = ?, @AKHIRSHIFT = ?, @JMLPRIMER = ?, @JMLSEKUNDER = ?, @JMLTRITIER = ?, @USERINPUT = ?', [
            $data['kode'],
            $data['Tanggal'],
            $data['IDLOG'],
            $data['No_Order'],
            $data['IDMESIN'],
            $data['Group'],
            $data['AWALSHIFT'],
            $data['AKHIRSHIFT'],
            $data['JMLPRIMER'],
            $data['JMLSEKUNDER'],
            $data['JMLTRITIER'],
            1,
        ]);
        return redirect()->route('AdStarHasilProd.index')->with('alert', 'Data Produksi Updated successfully!');
    }

    public function destroy(Request $request)
    {
        $data = $request->all();
        // dd('Masuk Destroy', $data);
        DB::connection('ConnAdstar')->statement('exec SP_1486_ADSTAR_MAINT_HASIL_PRODUKSI @kode = ?, @Tanggal = ?, @IDLOG = ?,@No_Order = ?, @IDMESIN = ?, @GROUP = ?, @AWALSHIFT = ?, @AKHIRSHIFT = ?, @JMLPRIMER = ?, @JMLSEKUNDER = ?, @JMLTRITIER = ?, @USERINPUT = ?', [
            $data['kode'],
            $data['Tanggal'],
            $data['IDLOG'],
            $data['No_Order'],
            $data['IDMESIN'],
            $data['Group'],
            $data['AWALSHIFT'],
            $data['AKHIRSHIFT'],
            $data['JMLPRIMER'],
            $data['JMLSEKUNDER'],
            $data['JMLTRITIER'],
            1,
        ]);
        return redirect()->route('AdStarHasilProd.index')->with('alert', 'Data Produksi  berhasil dihapus!');
    }
    //Remove the specified resource from storage.
//     public function destroy($id)
//     {
//             //


// }
}
