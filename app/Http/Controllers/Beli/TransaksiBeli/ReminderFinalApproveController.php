<?php

namespace App\Http\Controllers\Beli\TransaksiBeli;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Log;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\Http;

class ReminderFinalApproveController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        return view('Beli.TransaksiBeli.ReminderFinalApprove', compact('access'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $proses = $request->input('proses'); // 1 = insert, 2 = update, 3 = delete
        $no_trans = $request->input('no_trans');
        $nama_barang = $request->input('nama_barang');
        $kategori_utama = $request->input('kategori_utama');
        $kategori = $request->input('kategori');
        $sub_kategori = $request->input('sub_kategori');
        $divisi = $request->input('divisi');
        $user = $request->input('user');
        $status_beli = $request->input('status_beli');
        $keterangan_order = $request->input('keterangan_order');
        $keterangan_internal = $request->input('keterangan_internal');
        $data = $request->input('data');
        $user_input = trim(Auth::user()->NomorUser);
        // $no_telp = trim(Auth::user()->NoTelp);
        // dd($no_telp);
        // dd($request->all());
        try {
            switch ($proses) {
                case 1:
                    // dd($request->all());
                    // Send WA
                    $noTelpRudy = DB::connection('ConnEDP')
                        ->table('UserMaster')
                        ->where('NomorUser', 'RUDY')
                        ->value('NoTelp');
                    $noTelpTjahyo = DB::connection('ConnEDP')
                        ->table('UserMaster')
                        ->where('NomorUser', 'TJAHYO')
                        ->value('NoTelp');
                    $noTelpLeony = DB::connection('ConnEDP')
                        ->table('UserMaster')
                        ->where('NomorUser', '1067')
                        ->value('NoTelp');
                    // $noTelpFadly = DB::connection('ConnEDP')
                    //     ->table('UserMaster')
                    //     ->where('NomorUser', '4451')
                    //     ->value('NoTelp');
                    // dd($noTelpFadly);
                    if (str_contains($data['DirekturApprove'], 'RUDY')) {
                        $response = Http::withHeaders([
                            'Authorization' => env('WA_TOKEN')
                        ])->post('https://api.fonnte.com/send', [
                                    'target' => $noTelpRudy, // nomor tujuan
                                    'message' => "*Reminder Final Approve*\n\n"
                                        . "No Trans: " . $no_trans . "\n"
                                        . "Nama Barang: " . $nama_barang . "\n"
                                        // . "Kategori Utama: " . $kategori_utama . "\n"
                                        // . "Kategori: " . $kategori . "\n"
                                        // . "Sub Kategori: " . $sub_kategori . "\n"
                                        . "Quantity: " . number_format((float) $data['Qty'], 2, '.', '') . " " . $data['Nama_satuan'] . "\n"
                                        . "Harga Satuan: " . $data['Id_MataUang_BC'] . " " . number_format((float) $data['PriceUnit'], 4, '.', ',') . "\n"
                                        . "Total Harga: " . $data['Id_MataUang_BC'] . " " . number_format((float) $data['PriceExt'], 4, '.', ',') . "\n"
                                        . "Divisi: " . $divisi . "\n"
                                        . "User Order: " . $user . "\n"
                                        // . "Status Beli: " . $status_beli . "\n"
                                        . "Keterangan Order: " . $keterangan_order . "\n"
                                        . "Keterangan Internal: " . $keterangan_internal . "\n"
                                        . "\n\n_Pesan ini terkirim otomatis menggunakan website KRR_",
                                ]);

                        if ($response) {
                            DB::connection('ConnPurchase')
                                ->statement(
                                    'EXEC SP_4451_ReminderFinalApprove @kode = ?, @no_trans = ?',
                                    [2, $no_trans]
                                );
                        }
                    }

                    if (str_contains($data['DirekturApprove'], 'TJAHYO')) {
                        $response = Http::withHeaders([
                            'Authorization' => env('WA_TOKEN')
                        ])->post('https://api.fonnte.com/send', [
                                    'target' => $noTelpTjahyo, // nomor tujuan
                                    'message' => "*Reminder Final Approve*\n\n"
                                        . "No Trans: " . $no_trans . "\n"
                                        . "Nama Barang: " . $nama_barang . "\n"
                                        // . "Kategori Utama: " . $kategori_utama . "\n"
                                        // . "Kategori: " . $kategori . "\n"
                                        // . "Sub Kategori: " . $sub_kategori . "\n"
                                        . "Quantity: " . number_format((float) $data['Qty'], 2, '.', '') . " " . $data['Nama_satuan'] . "\n"
                                        . "Harga Satuan: " . $data['Id_MataUang_BC'] . " " . number_format((float) $data['PriceUnit'], 4, '.', ',') . "\n"
                                        . "Total Harga: " . $data['Id_MataUang_BC'] . " " . number_format((float) $data['PriceExt'], 4, '.', ',') . "\n"
                                        . "Divisi: " . $divisi . "\n"
                                        . "User Order: " . $user . "\n"
                                        // . "Status Beli: " . $status_beli . "\n"
                                        . "Keterangan Order: " . $keterangan_order . "\n"
                                        . "Keterangan Internal: " . $keterangan_internal . "\n"
                                        . "\n\n_Pesan ini terkirim otomatis menggunakan website KRR_",
                                ]);

                        if ($response) {
                            DB::connection('ConnPurchase')
                                ->statement(
                                    'EXEC SP_4451_ReminderFinalApprove @kode = ?, @no_trans = ?',
                                    [2, $no_trans]
                                );
                        }
                    }

                    // Leony
                    $response = Http::withHeaders([
                        'Authorization' => env('WA_TOKEN')
                    ])->post('https://api.fonnte.com/send', [
                                'target' => $noTelpLeony, // nomor tujuan
                                'message' => "*Reminder Final Approve*\n\n"
                                    . "No Trans: " . $no_trans . "\n"
                                    . "Nama Barang: " . $nama_barang . "\n"
                                    // . "Kategori Utama: " . $kategori_utama . "\n"
                                    // . "Kategori: " . $kategori . "\n"
                                    // . "Sub Kategori: " . $sub_kategori . "\n"
                                    . "Quantity: " . number_format((float) $data['Qty'], 2, '.', '') . " " . $data['Nama_satuan'] . "\n"
                                    . "Harga Satuan: " . $data['Id_MataUang_BC'] . " " . number_format((float) $data['PriceUnit'], 4, '.', ',') . "\n"
                                    . "Total Harga: " . $data['Id_MataUang_BC'] . " " . number_format((float) $data['PriceExt'], 4, '.', ',') . "\n"
                                    . "Divisi: " . $divisi . "\n"
                                    . "User Order: " . $user . "\n"
                                    // . "Status Beli: " . $status_beli . "\n"
                                    . "Keterangan Order: " . $keterangan_order . "\n"
                                    . "Keterangan Internal: " . $keterangan_internal . "\n"
                                    . "\n\n_Pesan ini terkirim otomatis menggunakan website KRR_",
                            ]);

                    return response()->json(['message' => 'Berhasil Kirim Whatsapp!']);

                default:
                    return response()->json(['error', 'Proses tidak valid']);
            }

        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ]);
        }
    }

    public function show(Request $request, $id)
    {
        if ($id == 'getData') {
            $tgl_awal = $request->input('tgl_awal');
            $tgl_akhir = $request->input('tgl_akhir');
            // dd($tgl_awal, $tgl_akhir);
            $results = DB::connection('ConnPurchase')
                ->select('EXEC SP_4451_ReminderFinalApprove @kode = ?, @tgl_awal = ?, @tgl_akhir = ?', [1, $tgl_awal, $tgl_akhir]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'tanggal' => Carbon::parse($row->Tgl_order)->format('m/d/Y'),
                    'tanggal_raw' => Carbon::parse($row->Tgl_order)->format('Y-m-d'),
                    'No_trans' => trim($row->No_trans),
                    'NAMA_BRG' => trim($row->NAMA_BRG),
                    'Qty' => trim($row->Qty),
                    'Id_MataUang_BC' => trim($row->Id_MataUang_BC),
                    'PriceUnit' => trim($row->PriceUnit),
                    'PriceExt' => trim($row->PriceExt),
                    'Kd_div' => trim($row->Kd_div),
                    'Nama' => trim($row->Nama),
                    'StatusBeli' => trim($row->StatusBeli) == '1' ? 'Pengadaan Pembelian' : 'Beli Sendiri',
                    'Nama_satuan' => trim($row->Nama_satuan),
                    'TimeSendWA' => trim($row->TimeSendWA),
                    'DirekturApprove' => trim($row->DirekturApprove),
                ];
            }
            // dd($response);
            return datatables($response)->make(true);

        } else if ($id == 'getDataAll') {
            // $tgl_awal = $request->input('tgl_awal');
            // $tgl_akhir = $request->input('tgl_akhir');
            $results = DB::connection('ConnPurchase')
                ->select('EXEC SP_4451_ReminderFinalApprove @kode = ?', [3]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'tanggal' => Carbon::parse($row->Tgl_order)->format('m/d/Y'),
                    'tanggal_raw' => Carbon::parse($row->Tgl_order)->format('Y-m-d'),
                    'No_trans' => trim($row->No_trans),
                    'NAMA_BRG' => trim($row->NAMA_BRG),
                    'Qty' => trim($row->Qty),
                    'Id_MataUang_BC' => trim($row->Id_MataUang_BC),
                    'PriceUnit' => trim($row->PriceUnit),
                    'PriceExt' => trim($row->PriceExt),
                    'Kd_div' => trim($row->Kd_div),
                    'Nama' => trim($row->Nama),
                    'StatusBeli' => trim($row->StatusBeli) == '1' ? 'Pengadaan Pembelian' : 'Beli Sendiri',
                    'Nama_satuan' => trim($row->Nama_satuan),
                    'TimeSendWA' => trim($row->TimeSendWA),
                    'DirekturApprove' => trim($row->DirekturApprove),
                ];
            }
            // dd($response);
            return datatables($response)->make(true);

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
