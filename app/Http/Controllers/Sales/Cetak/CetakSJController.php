<?php

namespace App\Http\Controllers\Sales\Cetak;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use PDF;
use App\Http\Controllers\HakAksesController;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class CetakSJController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        // $customer = db::connection('sqlsrv2')->select('exec SP_1486_SLS_LIST_ALL_CUSTOMER @Kode = ?', [1]);
        // dd($customer);
        $access = (new HakAksesController)->HakAksesFiturMaster('Sales');
        $user = Auth::user()->NomorUser;
        return view('Sales.Report.CetakSJ', compact('access', 'user'));
    }

    public function getSuratJalan($tanggal)
    {
        $data = db::connection('ConnSales')->select('exec SP_1486_SLS_LIST_CETAK_SJ @TglKirim = ?, @XKode = ?', [$tanggal, 1]);
        return response()->json($data);
    }
    public function getDataCetakSuratJalan($tanggal, $nosj, $jenissj)
    {
        // $data = db::connection('ConnInventory')->select('select * from VW_PRG_1486_SLS_CETAK_SJ where tglkirim = ? and IDPengiriman = ?',[$request->TanggalSJ, $request->NomorSJ]);
        if ($jenissj == 'suratjalanppn') {
            $data = db::connection('ConnSales')->select('select * from VW_PRG_1486_SLS_CETAK_SJ where tglkirim = ? and IDPengiriman = ?', [$tanggal, $nosj]);
            return response()->json($data);
        } elseif ($jenissj == 'suratjalanexport') {
            $data = db::connection('ConnSales')->select('select * from VW_PRG_1486_SLS_CETAK_SJ where tglkirim = ? and IDPengiriman = ?', [$tanggal, $nosj]);
            return response()->json($data);
        } else {
            //error handling untuk jenis sj selain suratjalanexport dan suratjalanppn
            return response()->json('Jenis SJ ' . $jenissj . ' belum disetting');
        }
    }

    public function downloadPdf($no_sj)
    {
        $items = DB::connection('ConnSales')
            ->table('VW_PRG_1486_SLS_CETAK_SJ')
            ->where('VW_PRG_1486_SLS_CETAK_SJ.IDPengiriman', $no_sj)
            ->first();

        if (!$items) {
            abort(404, 'Data PO tidak ditemukan');
        }

        /* ===============================
         * AMBIL TTD
         * =============================== */
        $ttdBinary1 = null;

        if (!empty($items->AccMrg)) {
            $ttdBinary1 = DB::connection('ConnEDP')
                ->table('dbo.UserMaster')
                ->where('NomorUser', $items->AccMrg)
                ->value('FotoTtd');
        }

        $convertToBase64 = function ($fotoTtd) {
            if (empty($fotoTtd)) {
                return null;
            }

            if (str_starts_with($fotoTtd, 'data:image')) {
                return $fotoTtd;
            }

            return 'data:image/png;base64,' . $fotoTtd;
        };

        $ttdBase64_1 = $convertToBase64($ttdBinary1);

        /* ===============================
         * GENERATE QR CODE
         * =============================== */

        // $url = url("dokumen/$no_sj");

        // $ttdBase64_1 = base64_encode(
        //     QrCode::format('png')
        //         ->size(150)
        //         ->margin(1)
        //         ->generate($url)
        // );

        // $ttdBase64_1 = 'data:image/png;base64,' . $ttdBase64_1;
        $pdf = Pdf::loadView('Sales.Report.SuratJalanPDF', [
            'items' => $items,
            'ttdBase64_1' => $ttdBase64_1,
        ])->setPaper('A4', 'portrait');

        return $pdf->stream("{$no_sj}.pdf");
        // return view('Sales.Report.SuratJalanPDF', [
        //     'items' => $items,
        //     'ttdBase64_1' => $ttdBase64_1,
        // ]);
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    // Store a newly created resource in storage.
    public function store(Request $request)
    {
        //
    }

    //Display the specified resource.
    public function show($id)
    {
        //
    }

    //Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update($id)
    {

    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
