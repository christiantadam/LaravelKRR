<?php

namespace App\Http\Controllers\Sales\Transaksi\SuratJalan;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Exception;

class SuratJalanManagerController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $data = db::connection('ConnSales')->select('exec SP_1486_SLS_LIST_HEADERKIRIM_BLMACC');
        $access = (new HakAksesController)->HakAksesFiturMaster('Sales');
        return view('Sales.Transaksi.SuratJalan.AccPermohonan', compact('data', 'access'));
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
        $data = db::connection('ConnSales')->select('exec SP_1486_SLS_LIST_DETAILKIRIM_BLMACC @IDHeaderKirim = ?', [$id]);
        return response()->json($data);
    }

    //Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request)
    {
        $user = auth::user()->NomorUser;
        $nomorSJs = $request->nomorSJs;
        try {
            for ($i = 0; $i < count($nomorSJs); $i++) {
                $payload = "no_sj=$nomorSJs[$i]&jenisAcc=Manager";
                $encodedPayload = hash_hmac('sha256', $payload, env('QR_SHARED_SECRET'));
                $url = "http://192.168.100.67:8000/DokumenSJ/view/$encodedPayload";
                $ttdBase64_1 = base64_encode(
                    QrCode::format('png')
                        ->size(150)
                        ->margin(1)
                        ->generate($url)
                );

                db::connection('ConnSales')->statement('exec SP_1486_SLS_ACC_PENGIRIMAN @IdManager = ?, @IdHeaderKirim = ?, @XGbrAccManager = ?', [$user, $nomorSJs[$i], $ttdBase64_1]);
            }
            return redirect()->back()->with('success', 'Surat Jalan yang Dipilih Sudah Disetujui!');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Surat Jalan yang Dipilih Gagal Disetujui!');
        }

    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
