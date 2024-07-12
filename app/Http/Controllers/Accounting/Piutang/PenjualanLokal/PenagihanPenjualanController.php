<?php

namespace App\Http\Controllers\Accounting\Piutang\PenjualanLokal;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PenagihanPenjualanController extends Controller
{
    public function index()
    {
        $data = 'Accounting';
        return view('Accounting.Piutang.PenjualanLokal.PenagihanPenjualan', compact('data'));
    }

    public function getCustomer()
    {
        //dd("masuk");
        $data =  DB::connection('ConnSales')->select('exec [SP_1486_ACC_LIST_ALL_CUSTOMER]
        @Kode = 1');
        return response()->json($data);
    }

    public function getCustomerKoreksi()
    {
        //dd("masuk");
        $data =  DB::connection('ConnSales')->select('exec [SP_1486_ACC_LIST_CUSTOMER]
        @Kode = 1');
        return response()->json($data);
    }

    public function getNoPenagihanUM($noSP)
    {
        $data =  DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_TAGIHAN_DP_1]
        @SuratPesanan = ?', [$noSP]);
        //dd("MASUK");
        return response()->json($data);
    }

    public function getSuratJalan($noSP)
    {
        $data =  DB::connection('ConnSales')->select('exec [SP_1486_ACC_LIST_PENGIRIMAN]
        @KODE = ?, @IdSuratPesanan = ?', [1, $noSP]);
        //dd("MASUK");
        return response()->json($data);
    }

    public function getNoPenagihan($idCustomer)
    {
        $data =  DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_PENAGIHAN_SJ]
        @KODE = ?, @IdCustomer = ?', [6, $idCustomer]);
        return response()->json($data);
    }

    public function getDataPenagihan($id_Penagihan)
    {
        $IdPenagihan = str_replace('.', '/', $id_Penagihan);
        //dd($IdPenagihan);
        $data =  DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_PENAGIHAN_SJ]
        @Kode = ?, @Id_Penagihan = ?', [7, $IdPenagihan]);
        return response()->json($data);
    }

    public function LihatPenagihan($id_Penagihan, $idJenisPajak)
    {
        //dd("Masuk");
        $IdPenagihan = str_replace('.', '/', $id_Penagihan);
        $data1 =
            DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_PENAGIHAN_SJ]
        @Kode = ?, @Id_Penagihan = ?', [7, $IdPenagihan])
        ;
        //dd($IdPenagihan);
        $data2 =
            DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_JENIS_PAJAK]
        @KODE = ?, @Jns_PPN = ?', [1, $idJenisPajak])
        ;
        $data3 =
            DB::connection('ConnAccounting')->select('exec [SP_1486_ACC_LIST_PENAGIHAN_SJ]
        @Kode = ?, @Id_Penagihan = ?', [19, $IdPenagihan])
        ;

        $dataAll = [
            'data1' => $data1,
            'data2' => $data2,
            'data3' => $data3
        ];
        return response()->json($dataAll);
    }

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
        //
    }

    // Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request)
    {
        //
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
