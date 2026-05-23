<?php

namespace App\Http\Controllers\Accounting\Informasi;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Exception;


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
        $tglAkhir = Carbon::parse($request->input('tglAkhirLaporan'));
        try {
            DB::connection('ConnAccounting')->statement('exec SP_PROSES_SALDOPIUTANG @TglAkhir = ?', [$tglAkhir]);
            return response()->json(['success' => 'Data Selesai Diproses. Silakan Lihat Di Excel']);
        } catch (Exception $ex) {
            return response()->json(['error' => $ex->getMessage()]);
        }
    }

    //Display the specified resource.
    public function show($id, Request $request)
    {
        $tglAkhir = $request->input('tglAkhir');
        $date = Carbon::parse($tglAkhir);

        if ($id === 'lihat') {
            $results = DB::connection('ConnAccounting')->select('exec [SP_PROSES_SALDOPIUTANG2] @TglAkhir = ?', [$date]);

            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Id_Customer' => $row->Id_Customer,    // Map @idcust
                    'NamaCust' => $row->NamaCust,       // Map @NamaCust
                    'Id_Penagihan' => $row->Id_Penagihan,   // Map @IdPenagihan
                    'Tgl_Penagihan' => $row->Tgl_Penagihan,  // Map @TglPenagihan
                    'Nama_MataUang' => $row->Nama_MataUang,  // Map @Nama_MataUang
                    'NilaiKurs' => $row->NilaiKurs,      // Map @NilaiKurs
                    'Nilai_Penagihan' => $row->Nilai_Penagihan, // Map @Nilai_Penagihan
                    'Dokumen' => $row->Nama_Dokumen,   // Map @Dokumen
                    'Id_Detail_Pelunasan' => $row->Id_Detail_Pelunasan,  // Map @IdDetail
                ];
            }

            return datatables($response)->make(true);
        }
    }

    // Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request, $id)
    {
        set_time_limit(1000);
        $tglAkhirLaporan = $request->input('tglAkhirLaporan');
        $date = Carbon::parse($tglAkhirLaporan);
        $bln = $date->format('m');
        $thn = $date->format('Y');
        $periode = $bln . $thn;

        // $startTime = microtime(true);

        // set_time_limit(300); // Increase execution time limit to 300 seconds

        // $endTime = microtime(true);
        // $elapsedTime = $endTime - $startTime;
        // Log::info((string) 'Elapsed Time for post BTTB: ' . $elapsedTime . ' | NoTrans: ');

        if ($id === 'proses') {
            try {
                $listDataSoplang = DB::connection('ConnAccounting')
                    // ->statement('exec [SP_Proses_SaldoPiutang] @TglAkhir = ?', [$tglAkhirLaporan]);
                    ->statement('exec [SP_4451_ACC_GetDataProsesSaldoPiutang] @TglAkhir = ?', [$tglAkhirLaporan]);

                // dd($listDataSoplang);
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
