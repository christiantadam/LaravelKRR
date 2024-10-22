<?php

namespace App\Http\Controllers\Accounting\Informasi;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;

class SoplangController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Accounting');
        return view('Accounting.Informasi.Soplang', compact('access'));
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
    public function update(Request $request, $id)
    {
        // $tglAkhirLaporan = $request->tglAkhirLaporan;
        // DB::connection('ConnAccounting')->statement('exec [SP_PROSES_SALDOPIUTANG]
        // @TglAkhir = ?', [
        //     $tglAkhirLaporan
        // ]);
        // return redirect()->back()->with('success', 'Data Selesai Diproses. Silakan Lihat Di Excell');

        if ($id === 'proses') {
            $tglAkhirLaporan = $request->input('tglAkhirLaporan');

            try {
                DB::connection('ConnAccounting')
                    ->statement('exec [SP_PROSES_SALDOPIUTANG]
                @TglAkhir = ?', [
                        $tglAkhirLaporan,
                    ]);

                return response()->json(['success' => 'Data Selesai Diproses. Silakan Lihat Di Excell'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
