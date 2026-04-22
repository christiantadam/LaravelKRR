<?php

namespace App\Http\Controllers\Sales\Transaksi\SuratJalan;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;
use Illuminate\Support\Facades\Mail;
use Illuminate\Encryption\Encrypter;
use Exception;

class KirimSJController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Sales');
        return view('Sales.Transaksi.SuratJalan.KirimSJ', compact('access'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $jenisProses = $request->jenisProses;
        if ($jenisProses == 'kirimSJ') {
             $idPengiriman = $request->idPengiriman;

            try {
                // proses check apakah customer sudah memiliki perwakilan(user) sekaligus select email customer
                $emailCustomer = DB::connection('ConnSales')
                    ->select(
                        'exec SP_4384_SLS_KIRIM_SJ @XKode = ?, @XIdPengiriman = ?',
                        [0, $idPengiriman]
                    );

                $emails = collect($emailCustomer)
                    ->pluck('Email')
                    ->filter()
                    ->merge([
                        'sales@kertarajasa.co.id'
                    ])
                    ->unique()
                    ->values()
                    ->toArray();

                if (count($emails) <= 1) {
                    return response()->json(['error' => 'Permohonan konfirmasi penerimaan barang tidak dikirim, customer belum register']);
                }

                // proses update kolom kirim customer, proses insert into database public web
                DB::connection('ConnSales')
                    ->statement(
                        'exec SP_4384_SLS_KIRIM_SJ @XKode = ?, @XIdPengiriman = ?',
                        [2, $idPengiriman]
                    );
                //get data to send email
                $dataSuratJalan = DB::connection('ConnSales')
                    ->select(
                        'exec SP_4384_SLS_KIRIM_SJ @XKode = ?, @XIdPengiriman = ?',
                        [3, $idPengiriman]
                    );
                // proses send email permintaan acc customer
                Mail::mailer('MailSales')->send([], [], function ($message) use ($emails, $idPengiriman, $dataSuratJalan) {
                    $data = $dataSuratJalan[0];

                    $product = $data->NamaType ?? '-';
                    $satPrimer = trim($data->satPrimer);
                    $satSekunder = trim($data->satSekunder);
                    $satTritier = trim($data->satTritier);
                    $satJual = $data->satJual;
                    $qty = 0;
                    if ($satJual == $satPrimer) {
                        $qty = $data->QtyPrimer ?? '-';
                    } else if ($satJual == $satSekunder) {
                        $qty = $data->QtySekunder ?? '-';
                    } else if ($satJual == $satTritier) {
                        $qty = $data->QtyTritier ?? '-';
                    }
                    $transporter = $data->NamaExpeditor ?? '-';
                    $licensePlate = $data->TrukNopol ?? '-';
                    $driverName = $data->NamaSupir ?? '-';
                    $key = env('QR_SHARED_SECRET'); // 32 chars
                    $cipher = 'AES-256-CBC';

                    $encrypter = new Encrypter($key, $cipher);
                    $encryptedIdPengiriman = urlencode($encrypter->encryptString((string) $idPengiriman));

                    // $link = url('/surat-jalan/' . $idPengiriman); // change to your real route
                    // $encodedIdPengiriman = hash_hmac('sha256', $idPengiriman, env('QR_SHARED_SECRET'));
                    $link = 'http://192.168.100.67:8000/SuratJalan/' . $encryptedIdPengiriman; // change to your real route
                    $message->to($emails)
                        ->subject("SJ Digital {$idPengiriman} Kerta Rajasa Raya")
                        ->html("<p>Dear Customer,</p>

                        <p>Berikut detail Surat Jalan Digital:</p>

                        <table border='1' cellpadding='8' cellspacing='0' style='border-collapse: collapse;'>
                            <tr>
                                <td><strong>ID Pengiriman</strong></td>
                                <td>{$idPengiriman}</td>
                            </tr>
                            <tr>
                                <td><strong>Product</strong></td>
                                <td>{$product}</td>
                            </tr>
                            <tr>
                                <td><strong>Quantity</strong></td>
                                <td>{$qty} {$satJual}</td>
                            </tr>
                            <tr>
                                <td><strong>Transporter</strong></td>
                                <td>{$transporter}</td>
                            </tr>
                            <tr>
                                <td><strong>License Plate Number</strong></td>
                                <td>{$licensePlate}</td>
                            </tr>
                            <tr>
                                <td><strong>Driver Name</strong></td>
                                <td>{$driverName}</td>
                            </tr>
                        </table>

                        <br>

                        <p>
                            Silakan klik link berikut untuk mengakses halaman konfirmasi penerimaan barang:
                            <a href='{$link}' target='_blank'>Halaman Konfirmasi Penerimaan Barang</a>
                        </p>

                        <br>

                        <p>Best regards,<br>Kerta Rajasa Raya</p>");
                });

                return response()->json(['success' => (string) 'Permohonan konfirmasi penerimaan barang sudah dikirim ke email: ' . implode(', ', $emails)], 200);
            } catch (\Illuminate\Database\QueryException $e) {
                    $msg = $e->getMessage();

                    if (str_contains($msg, 'TTD Supir dan Satpam belum lengkap')) {
                        return response()->json([
                            'error' => 'TTD Supir dan Satpam belum lengkap, silakan lakukan pemeriksaan barang terlebih dahulu.'
                        ]);
                    }
                    return response()->json([
                        'error' => 'Gagal proses kirim SJ'
                    ], 500);
                }
        }

        if ($jenisProses == 'resendSJ') {
            try {
                $idPengiriman = $request->idPengiriman;

                // ambil email customer
                $emailCustomer = DB::connection('ConnSales')
                    ->select(
                        'exec SP_4384_SLS_KIRIM_SJ @XKode = ?, @XIdPengiriman = ?',
                        [0, $idPengiriman]
                    );

                $emails = collect($emailCustomer)
                    ->pluck('Email')
                    ->filter()
                    ->merge(['sales@kertarajasa.co.id'])
                    ->unique()
                    ->values()
                    ->toArray();

                if (count($emails) <= 1) {
                    return response()->json(['error' => 'Customer belum punya email']);
                }

                // increment resend + ambil counter
                $resendResult = DB::connection('ConnSales')->select(
                    'exec SP_4384_SLS_KIRIM_SJ @XKode = ?, @XIdPengiriman = ?',
                    [5, $idPengiriman]
                );

                if (empty($resendResult)) {
                    return response()->json([
                        'error' => 'Gagal mengambil data resend'
                    ]);
                }

                $resendCount = $resendResult[0]->ResendCount ?? 1;

                // ambil data SJ
                $dataSuratJalan = DB::connection('ConnSales')
                    ->select(
                        'exec SP_4384_SLS_KIRIM_SJ @XKode = ?, @XIdPengiriman = ?',
                        [3, $idPengiriman]
                    );

                if (empty($dataSuratJalan)) {
                    return response()->json([
                        'error' => 'Data Surat Jalan tidak ditemukan'
                    ]);
                }

                // kirim email
                Mail::mailer('MailSales')->send([], [], function ($message) use ($emails, $idPengiriman, $dataSuratJalan, $resendCount) {
                    $data = $dataSuratJalan[0];

                    $product = $data->NamaType ?? '-';

                    $satPrimer = trim($data->satPrimer);
                    $satSekunder = trim($data->satSekunder);
                    $satTritier = trim($data->satTritier);
                    $satJual = $data->satJual;

                    $qty = match ($satJual) {
                        $satPrimer => $data->QtyPrimer ?? '-',
                        $satSekunder => $data->QtySekunder ?? '-',
                        $satTritier => $data->QtyTritier ?? '-',
                        default => '-'
                    };

                    $transporter = $data->NamaExpeditor ?? '-';
                    $licensePlate = $data->TrukNopol ?? '-';
                    $driverName = $data->NamaSupir ?? '-';

                    $key = env('QR_SHARED_SECRET');
                    $encrypter = new \Illuminate\Encryption\Encrypter($key, 'AES-256-CBC');
                    $encryptedId = urlencode($encrypter->encryptString((string) $idPengiriman));

                    $link = 'http://192.168.100.67:8000/SuratJalan/' . $encryptedId;

                    // SUBJECT DINAMIS
                    $subject = "RESEND Ke-{$resendCount} SJ Digital {$idPengiriman}";

                    $message->to($emails)
                        ->subject($subject)
                        ->html("
                            <p>Dear Customer,</p>

                            <p>Berikut detail Surat Jalan Digital:</p>

                            <table border='1' cellpadding='8' cellspacing='0' style='border-collapse: collapse;'>
                                <tr>
                                    <td><strong>ID Pengiriman</strong></td>
                                    <td>{$idPengiriman}</td>
                                </tr>
                                <tr>
                                    <td><strong>Product</strong></td>
                                    <td>{$product}</td>
                                </tr>
                                <tr>
                                    <td><strong>Quantity</strong></td>
                                    <td>{$qty} {$satJual}</td>
                                </tr>
                                <tr>
                                    <td><strong>Transporter</strong></td>
                                    <td>{$transporter}</td>
                                </tr>
                                <tr>
                                    <td><strong>License Plate Number</strong></td>
                                    <td>{$licensePlate}</td>
                                </tr>
                                <tr>
                                    <td><strong>Driver Name</strong></td>
                                    <td>{$driverName}</td>
                                </tr>
                            </table>

                            <br>

                            <p>
                                Silakan klik link berikut untuk mengakses halaman konfirmasi penerimaan barang:
                                <a href='{$link}' target='_blank'>Halaman Konfirmasi Penerimaan Barang</a>
                            </p>

                            <br>

                            <p>Best regards,<br>Kerta Rajasa Raya</p>
                        ");
                });

                return response()->json([
                    'success' => 'Email berhasil dikirim ulang ke: ' . implode(', ', $emails)
                ]);

            } catch (\Illuminate\Database\QueryException $e) {
                $msg = $e->getMessage();

                if (str_contains($msg, 'TTD Supir dan Satpam belum lengkap')) {
                    return response()->json([
                        'error' => 'TTD Supir dan Satpam belum lengkap, silakan lakukan pemeriksaan barang terlebih dahulu.'
                    ]);
                }

                if (str_contains($msg, 'Data belum pernah dikirim')) {
                    return response()->json([
                        'error' => 'Surat jalan belum pernah dikirim sebelumnya'
                    ]);
                }

                return response()->json([
                    'error' => 'Gagal proses database'
                ], 500);

            } catch (\Exception $e) {
                return response()->json([
                    'error' => 'Terjadi kesalahan pada sistem'
                ], 500);
            }
        }
    }

    public function show($id)
    {
        if ($id == 'getDataSJ') {
            $dataSuratJalan = DB::connection('ConnSales')
                ->select('exec SP_4384_SLS_KIRIM_SJ @XKode = ?', [4]);
            // dd($dataSuratJalan);
            return datatables($dataSuratJalan)->make(true);
        }
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
