<?php

namespace App\Http\Controllers\Sales\Transaksi\SuratJalan;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Exception;
use Illuminate\Encryption\Encrypter;

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
                DB::connection('ConnSales')->beginTransaction();
                $idPengiriman = DB::connection('ConnSales')
                    ->table('T_HeaderPengiriman')
                    ->where('IdHeaderKirim', $nomorSJs[$i])
                    ->value('IDPengiriman');
                $payload = "no_sj=$idPengiriman&jenisAcc=Manager";
                $key = env('QR_SHARED_SECRET');
                if (!$key || strlen($key) !== 32) {
                    throw new Exception('QR key tidak valid');
                }

                $encrypter = new Encrypter($key, 'AES-256-CBC');

                $encrypted = urlencode(
                    $encrypter->encryptString((string) $payload)
                );

                // $encodedPayload = hash_hmac('sha256', $payload, env('QR_SHARED_SECRET'));
                $url = "https://mykrr.co.id/DokumenSJ/view/$encrypted";
                $ttdBase64_1 = base64_encode(
                    QrCode::format('png')
                        ->size(150)
                        ->margin(1)
                        ->generate($url)
                );

                DB::connection('ConnSales')->statement('exec SP_1486_SLS_ACC_PENGIRIMAN @IdManager = ?, @IdHeaderKirim = ?, @XGbrAccManager = ?', [$user, $nomorSJs[$i], $ttdBase64_1]);

                $dataHeaderPemeriksaanBarang = DB::connection('ConnGuard')
                    ->table('Header_PemeriksaanBarang')
                    ->select('idHeader', 'user_input', 'sopir', 'no_seal', 'no_container')
                    ->where('surat_jalanTerdaftar', 'like', '%' . $idPengiriman . '%')
                    ->first();
                if ($dataHeaderPemeriksaanBarang) {
                    $payloadSupir = "no_sj=$idPengiriman&jenisAcc=Supir";
                    $key = env('QR_SHARED_SECRET');
                    if (!$key || strlen($key) !== 32) {
                        throw new Exception('QR key tidak valid');
                    }

                    $encrypter = new Encrypter($key, 'AES-256-CBC');

                    $encryptedPayloadSupir = urlencode(
                        $encrypter->encryptString((string) $payloadSupir)
                    );
                    $urlSupir = "https://mykrr.co.id/DokumenSJ/view/$encryptedPayloadSupir";
                    $ttdBase64_Supir = base64_encode(
                        QrCode::format('png')
                            ->size(150)
                            ->margin(1)
                            ->generate($urlSupir)
                    );
                    $payloadSatpam = "no_sj=$idPengiriman&jenisAcc=Satpam";
                    $encryptedPayloadSatpam = urlencode(
                        $encrypter->encryptString((string) $payloadSatpam)
                    );
                    $urlSatpam = "https://mykrr.co.id/DokumenSJ/view/$encryptedPayloadSatpam";
                    $ttdBase64_Satpam = base64_encode(
                        QrCode::format('png')
                            ->size(150)
                            ->margin(1)
                            ->generate($urlSatpam)
                    );
                    DB::connection('ConnSales')->statement(
                        'EXEC SP_1486_SLS_MAINT_HEADERPENGIRIMAN
                                        @MyType = ?,
                                        @AccSupir = ?,
                                        @GbrAccSupir = ?,
                                        @AccSatpam = ?,
                                        @GbrAccSatpam = ?,
                                        @IDPengiriman = ?,
                                        @NoSeal = ?,
                                        @NoContainer = ?',
                        [
                            4,
                            $dataHeaderPemeriksaanBarang->sopir,
                            $ttdBase64_Supir,
                            $dataHeaderPemeriksaanBarang->user_input,
                            $ttdBase64_Satpam,
                            $idPengiriman,
                            $dataHeaderPemeriksaanBarang->no_seal,
                            $dataHeaderPemeriksaanBarang->no_container
                        ]
                    );
                }
                DB::connection('ConnSales')->commit();
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
