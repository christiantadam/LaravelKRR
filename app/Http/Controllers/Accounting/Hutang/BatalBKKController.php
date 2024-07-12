<?php

namespace App\Http\Controllers\Accounting\Hutang;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BatalBKKController extends Controller
{
    public function index()
    {
        $data = 'Accounting';
        return view('Accounting.Hutang.BatalBKK', compact('data'));
    }

    public function getIdBKKBesar($bulanTahun)
    {
        $tabel =  DB::connection('ConnAccounting')->select('exec [SP_1273_ACC_LIST_IDBKK_BTLBKK] @Kode = ?, @BlnThn = ?', [2, $bulanTahun]);
        return response()->json($tabel);
    }
    public function getIdBKKKecil($bulanTahun)
    {
        $tabel =  DB::connection('ConnAccounting')->select('exec [SP_1273_ACC_LIST_IDBKK_BTLBKK] @Kode = ?, @BlnThn = ?', [1, $bulanTahun]);
        return response()->json($tabel);
    }

    public function getListBKKBtlBKK($idBKKSelect)
    {
        $tabel =  DB::connection('ConnAccounting')->select('exec [SP_1273_ACC_LIST_BKK_BTLBKK] @BKK = ?', [$idBKKSelect]);
        return response()->json($tabel);
    }

    public function getCheckBtlBKK($idBKKSelect)
    {
        $tabel =  DB::connection('ConnAccounting')->select('exec [SP_1273_ACC_CHECK_BTLBKK] @BKK = ?', [$idBKKSelect]);
        return response()->json($tabel);
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

    public function update1(Request $request)
    {
        $idBKKSelect = $request->idBKKSelect;
        $alasan = $request->alasan;

        DB::connection('ConnAccounting')->statement('exec [SP_1273_ACC_BATAL_BKK]
            @BKK = ?,
            @Alasan = ?,
            @User = ?', [
                $idBKKSelect,
                $alasan,
                1
            ]);
        return redirect()->back()->with('success', 'Data BKK sudah diBATALkan!!..');
    }

    public function update2(Request $request)
    {
        $idBKKSelect = $request->idBKKSelect;

        DB::connection('ConnAccounting')->statement('exec [SP_1273_ACC_BATAL_BKK_TTLNS]
        @Kode = ?,
        @BKK = ?', [
            2,
            $idBKKSelect
        ]);

        return redirect()->back()->with('success', '');
    }

    //Update the specified resource in storage.
    public function update(Request $request)
    {
        // $idBKKSelect = $request->idBKKSelect;
        // $alasan = $request->alasan;

        // // Pertanyaan pertama
        // if (confirm("Anda yakin Batal BKK ??...")) {
        //     // Jika pengguna menjawab "ya" (OK), jalankan perintah pertama
        //     DB::connection('ConnAccounting')->statement('exec [SP_1273_ACC_BATAL_BKK]
        //     @BKK = ?,
        //     @Alasan = ?,
        //     @User = ?', [
        //         $idBKKSelect,
        //         $alasan,
        //         1
        //     ]);

        //     // Tampilkan pesan
        //     return redirect()->back()->with('success', 'Data BKK sudah diBATALkan!!..');

        //     // Pertanyaan kedua
        //     if (confirm("Apakah Tanda Terima Penagihan dipakai kembali?")) {
        //         // Jika pengguna menjawab "ya" (OK), jalankan perintah kedua
        //         DB::connection('ConnAccounting')->statement('exec [SP_1273_ACC_BATAL_BKK_TTLNS]
        //         @Kode = ?,
        //         @BKK = ?', [
        //             2,
        //             $idBKKSelect
        //         ]);

        //         return redirect()->back()->with('success', '');
        //     }
        // }
        // return redirect()->back();
    }


    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
