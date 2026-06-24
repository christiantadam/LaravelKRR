<?php

namespace App\Http\Controllers\Beli\Transaksi;

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

class ReminderApproveController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        return view('Beli.Transaksi.ReminderApprove', compact('access'));
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
        $noManager = $request->input('noManager');
        // $no_telp = trim(Auth::user()->NoTelp);
        // dd($no_telp);
        // dd($request->all());
        try {
            switch ($proses) {
                case 1:
                    $response = Http::withHeaders([
                        'Authorization' => env('WA_TOKEN')
                    ])->post('https://api.fonnte.com/send', [
                                'target' => $noManager, // nomor tujuan
                                'message' => "*Reminder Approve*\n\n"
                                    . "No Trans: " . $no_trans . "\n"
                                    . "Nama Barang: " . $nama_barang . "\n"
                                    // . "Kategori Utama: " . $kategori_utama . "\n"
                                    // . "Kategori: " . $kategori . "\n"
                                    . "Sub Kategori: " . $sub_kategori . "\n"
                                    // . "Quantity: " . number_format((float) $data['Qty'], 2, '.', '') . " " . $data['Nama_satuan'] . "\n"
                                    // . "Harga Satuan: " . $data['Id_MataUang_BC'] . " " . number_format((float) $data['PriceUnit'], 4, '.', ',') . "\n"
                                    // . "Total Harga: " . $data['Id_MataUang_BC'] . " " . number_format((float) $data['PriceExt'], 4, '.', ',') . "\n"
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
                                'EXEC SP_4451_ReminderApprove @kode = ?, @no_trans = ?',
                                [2, $no_trans]
                            );
                    }

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
        if ($id == 'getDataAll') {
            // $tgl_awal = $request->input('tgl_awal');
            // $tgl_akhir = $request->input('tgl_akhir');
            $user = trim(Auth::user()->NomorUser);
            $results = DB::connection('ConnPurchase')
                ->select('EXEC SP_4451_ReminderApprove @kode = ?, @user = ?', [3, $user]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'tanggal' => Carbon::parse($row->Tgl_order)->format('m/d/Y'),
                    'tanggal_raw' => Carbon::parse($row->Tgl_order)->format('Y-m-d'),
                    'No_trans' => trim($row->No_trans),
                    'NAMA_BRG' => trim($row->NAMA_BRG),
                    'Qty' => trim($row->Qty),
                    'Kd_div' => trim($row->Kd_div),
                    'Nama' => trim($row->Nama),
                    'StatusBeli' => trim($row->StatusBeli) == '1' ? 'Pengadaan Pembelian' : 'Beli Sendiri',
                    'Nama_satuan' => trim($row->Nama_satuan),
                    'TimeSendWA_Manager' => trim($row->TimeSendWA_Manager),
                ];
            }
            // dd($response);
            return datatables($response)->make(true);

        } else if ($id == 'getDataFilter') {
            $tgl_awal = $request->input('tgl_awal');
            $tgl_akhir = $request->input('tgl_akhir');
            $user = trim(Auth::user()->NomorUser);
            $results = DB::connection('ConnPurchase')
                ->select('EXEC SP_4451_ReminderApprove @kode = ?, @tgl_awal = ?, @tgl_akhir = ?, @user = ?', [1, $tgl_awal, $tgl_akhir, $user]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'tanggal' => Carbon::parse($row->Tgl_order)->format('m/d/Y'),
                    'tanggal_raw' => Carbon::parse($row->Tgl_order)->format('Y-m-d'),
                    'No_trans' => trim($row->No_trans),
                    'NAMA_BRG' => trim($row->NAMA_BRG),
                    'Qty' => trim($row->Qty),
                    'Kd_div' => trim($row->Kd_div),
                    'Nama' => trim($row->Nama),
                    'StatusBeli' => trim($row->StatusBeli) == '1' ? 'Pengadaan Pembelian' : 'Beli Sendiri',
                    'Nama_satuan' => trim($row->Nama_satuan),
                    'TimeSendWA_Manager' => trim($row->TimeSendWA_Manager),
                ];
            }
            // dd($response);
            return datatables($response)->make(true);

        } else if ($id == 'getDetailNoTrans') {
            $noTrans = $request->noTrans;
            // dd($noTrans);
            $data = DB::connection('ConnPurchase')
                ->select('SELECT	YBR.NAMA_BRG, YTB.Qty, YDI.NM_DIV,
            YTB.Operator, YTB.StatusBeli, YTB.keterangan, YTB.Ket_Internal, YTB.PriceUnit,
            YKU.nama, YKK.nama_kategori, YKS.nama_sub_kategori, YUS.Nama AS NamaUser, YTB.PriceExt, YTB.PPN, YTB.harga_disc, YTB.Dokumentasi
            FROM	YTRANSBL YTB INNER JOIN
                    Y_BARANG YBR ON YTB.Kd_brg = YBR.KD_BRG INNER JOIN
                    YDIVISI YDI ON YTB.Kd_div = YDI.KD_DIV INNER JOIN
                    Y_KATEGORI_SUB YKS ON YBR.NO_SUB_KATEGORI = YKS.no_sub_kategori INNER JOIN
                    Y_KATEGORY YKK ON YKS.no_kategori = YKK.no_kategori INNER JOIN
                    Y_KATEGORI_UTAMA YKU ON YKK.no_kat_utama = YKU.no_kat_utama INNER JOIN
                    YUSER YUS ON YUS.kd_user = YTB.Operator
            WHERE	YTB.No_trans = ?', [$noTrans]);
            return response()->json($data, 200);
        } else {
            return response()->json('Invalid request', 405);
        }
    }

    public function getManager($kdDiv)
    {
        // dd($kdDiv);
        $manager = DB::connection('ConnPurchase')->select('EXEC SP_4451_ReminderApprove @kode = ?, @kdDiv = ?', [4, $kdDiv]);
        // dd($manager);
        return response()->json($manager);
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
