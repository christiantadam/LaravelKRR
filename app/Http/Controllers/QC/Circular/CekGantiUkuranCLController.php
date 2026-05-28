<?php

namespace App\Http\Controllers\QC\Circular;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Log;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class CekGantiUkuranCLController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('QC');
        $listTypeMesin = DB::connection('ConnTestQC')
            ->select('EXEC SP_4451_List_Mesin_CL @Kode = ?', [1]);
        $listLokasi = DB::connection('ConnTestQC')
            ->table('Lokasi')
            ->select('idLokasi', 'nama_lokasi')
            ->get();
        // $filtered = array_values(array_filter($listTypeMesin, function ($item) {
        //     return in_array($item->IdType_Mesin, ['13', '17']);
        // }));
        // // dd($filtered);
        // usort($filtered, function ($a, $b) {
        //     return intval($a->IdType_Mesin) - intval($b->IdType_Mesin);
        // });
        $listLokasi = collect($listLokasi)
            ->whereIn('idLokasi', [1])
            ->values();
        return view('QC.Circular.CekGantiUkuran', compact('access', 'listTypeMesin', 'listLokasi'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $proses = $request->input('proses'); // 1 = insert, 2 = update, 3 = delete
        $id_cek = $request->input('id_cek');
        $tanggal = $request->input('tanggal');
        $id_pemeriksaan = $request->input('id_pemeriksaan');
        $shift = $request->input('shift');
        $type_mesin = $request->input('type_mesin');
        $nama_mesin = $request->input('nama_mesin');
        $jam_kerja_awal = $request->input('jam_kerja_awal');
        $jam_kerja_akhir = $request->input('jam_kerja_akhir');
        $std_wa = $request->input('std_wa');
        $toleransi_wa = $request->input('toleransi_wa');
        $periksa_wa = $request->input('periksa_wa');
        $selisih_wa = $request->input('selisih_wa');
        $keputusan_wa = $request->input('keputusan_wa');
        $keterangan_wa = $request->input('keterangan_wa');
        $std_we = $request->input('std_we');
        $toleransi_we = $request->input('toleransi_we');
        $periksa_we = $request->input('periksa_we');
        $selisih_we = $request->input('selisih_we');
        $keputusan_we = $request->input('keputusan_we');
        $keterangan_we = $request->input('keterangan_we');
        $std_warna = $request->input('std_warna');
        $toleransi_warna = $request->input('toleransi_warna');
        $periksa_warna = $request->input('periksa_warna');
        $selisih_warna = $request->input('selisih_warna');
        $keputusan_warna = $request->input('keputusan_warna');
        $keterangan_warna = $request->input('keterangan_warna');
        $std_dropper = $request->input('std_dropper');
        $toleransi_dropper = $request->input('toleransi_dropper');
        $periksa_dropper = $request->input('periksa_dropper');
        $selisih_dropper = $request->input('selisih_dropper');
        $keputusan_dropper = $request->input('keputusan_dropper');
        $keterangan_dropper = $request->input('keterangan_dropper');
        $std_guadring = $request->input('std_guadring');
        $toleransi_guadring = $request->input('toleransi_guadring');
        $periksa_guadring = $request->input('periksa_guadring');
        $selisih_guadring = $request->input('selisih_guadring');
        $keputusan_guadring = $request->input('keputusan_guadring');
        $keterangan_guadring = $request->input('keterangan_guadring');
        $std_jmlWA = $request->input('std_jmlWA');
        $toleransi_jmlWA = $request->input('toleransi_jmlWA');
        $periksa_jmlWA = $request->input('periksa_jmlWA');
        $selisih_jmlWA = $request->input('selisih_jmlWA');
        $keputusan_jmlWA = $request->input('keputusan_jmlWA');
        $keterangan_jmlWA = $request->input('keterangan_jmlWA');
        $std_cg = $request->input('std_cg');
        $toleransi_cg = $request->input('toleransi_cg');
        $periksa_cg = $request->input('periksa_cg');
        $selisih_cg = $request->input('selisih_cg');
        $keputusan_cg = $request->input('keputusan_cg');
        $keterangan_cg = $request->input('keterangan_cg');
        $std_mr = $request->input('std_mr');
        $toleransi_mr = $request->input('toleransi_mr');
        $periksa_mr = $request->input('periksa_mr');
        $selisih_mr = $request->input('selisih_mr');
        $keputusan_mr = $request->input('keputusan_mr');
        $keterangan_mr = $request->input('keterangan_mr');
        $std_bk = $request->input('std_bk');
        $toleransi_bk = $request->input('toleransi_bk');
        $periksa_bk = $request->input('periksa_bk');
        $selisih_bk = $request->input('selisih_bk');
        $keputusan_bk = $request->input('keputusan_bk');
        $keterangan_bk = $request->input('keterangan_bk');
        $std_lk = $request->input('std_lk');
        $toleransi_lk = $request->input('toleransi_lk');
        $periksa_lk = $request->input('periksa_lk');
        $selisih_lk = $request->input('selisih_lk');
        $keputusan_lk = $request->input('keputusan_lk');
        $keterangan_lk = $request->input('keterangan_lk');
        $std_lk2 = $request->input('std_lk2');
        $toleransi_lk2 = $request->input('toleransi_lk2');
        $periksa_lk2 = $request->input('periksa_lk2');
        $selisih_lk2 = $request->input('selisih_lk2');
        $keputusan_lk2 = $request->input('keputusan_lk2');
        $keterangan_lk2 = $request->input('keterangan_lk2');
        $catatan = $request->input('catatan');
        $lokasi = $request->input('lokasi');
        $user = trim(Auth::user()->NomorUser);
        // dd($request->all());
        try {
            switch ($proses) {
                case 1:
                    // Simpan
                    DB::connection('ConnTestQC')
                        ->statement(
                            'EXEC SP_4451_CekGantiUkuranCL 
                        @kode = ?,
                        @tanggal = ?,
                        @id_pemeriksaan = ?,
                        @shift = ?,
                        @type_mesin = ?,
                        @nama_mesin = ?,
                        @jam_kerja_awal = ?,
                        @jam_kerja_akhir = ?,
                        @std_wa = ?,
                        @toleransi_wa = ?,
                        @periksa_wa = ?,
                        @selisih_wa = ?,
                        @keputusan_wa = ?,
                        @keterangan_wa = ?,
                        @std_we = ?,
                        @toleransi_we = ?,
                        @periksa_we = ?,
                        @selisih_we = ?,
                        @keputusan_we = ?,
                        @keterangan_we = ?,
                        @std_warna = ?,
                        @toleransi_warna = ?,
                        @periksa_warna = ?,
                        @selisih_warna = ?,
                        @keputusan_warna = ?,
                        @keterangan_warna = ?,
                        @std_dropper = ?,
                        @toleransi_dropper = ?,
                        @periksa_dropper = ?,
                        @selisih_dropper = ?,
                        @keputusan_dropper = ?,
                        @keterangan_dropper = ?,
                        @std_guadring = ?,
                        @toleransi_guadring = ?,
                        @periksa_guadring = ?,
                        @selisih_guadring = ?,
                        @keputusan_guadring = ?,
                        @keterangan_guadring = ?,
                        @std_jmlWA = ?,
                        @toleransi_jmlWA = ?,
                        @periksa_jmlWA = ?,
                        @selisih_jmlWA = ?,
                        @keputusan_jmlWA = ?,
                        @keterangan_jmlWA = ?,
                        @std_cg = ?,
                        @toleransi_cg = ?,
                        @periksa_cg = ?,
                        @selisih_cg = ?,
                        @keputusan_cg = ?,
                        @keterangan_cg = ?,
                        @std_mr = ?,
                        @toleransi_mr = ?,
                        @periksa_mr = ?,
                        @selisih_mr = ?,
                        @keputusan_mr = ?,
                        @keterangan_mr = ?,
                        @std_bk = ?,
                        @toleransi_bk = ?,
                        @periksa_bk = ?,
                        @selisih_bk = ?,
                        @keputusan_bk = ?,
                        @keterangan_bk = ?,
                        @std_lk = ?,
                        @toleransi_lk = ?,
                        @periksa_lk = ?,
                        @selisih_lk = ?,
                        @keputusan_lk = ?,
                        @keterangan_lk = ?,
                        @std_lk2 = ?,
                        @toleransi_lk2 = ?,
                        @periksa_lk2 = ?,
                        @selisih_lk2 = ?,
                        @keputusan_lk2 = ?,
                        @keterangan_lk2 = ?,
                        @catatan = ?,
                        @lokasi = ?,
                        @user = ?',
                            [
                                1,
                                $tanggal,
                                $id_cek,
                                $shift,
                                $type_mesin,
                                $nama_mesin,
                                $jam_kerja_awal,
                                $jam_kerja_akhir,
                                $std_wa,
                                $toleransi_wa,
                                $periksa_wa,
                                $selisih_wa,
                                $keputusan_wa,
                                $keterangan_wa,
                                $std_we,
                                $toleransi_we,
                                $periksa_we,
                                $selisih_we,
                                $keputusan_we,
                                $keterangan_we,
                                $std_warna,
                                $toleransi_warna,
                                $periksa_warna,
                                $selisih_warna,
                                $keputusan_warna,
                                $keterangan_warna,
                                $std_dropper,
                                $toleransi_dropper,
                                $periksa_dropper,
                                $selisih_dropper,
                                $keputusan_dropper,
                                $keterangan_dropper,
                                $std_guadring,
                                $toleransi_guadring,
                                $periksa_guadring,
                                $selisih_guadring,
                                $keputusan_guadring,
                                $keterangan_guadring,
                                $std_jmlWA,
                                $toleransi_jmlWA,
                                $periksa_jmlWA,
                                $selisih_jmlWA,
                                $keputusan_jmlWA,
                                $keterangan_jmlWA,
                                $std_cg,
                                $toleransi_cg,
                                $periksa_cg,
                                $selisih_cg,
                                $keputusan_cg,
                                $keterangan_cg,
                                $std_mr,
                                $toleransi_mr,
                                $periksa_mr,
                                $selisih_mr,
                                $keputusan_mr,
                                $keterangan_mr,
                                $std_bk,
                                $toleransi_bk,
                                $periksa_bk,
                                $selisih_bk,
                                $keputusan_bk,
                                $keterangan_bk,
                                $std_lk,
                                $toleransi_lk,
                                $periksa_lk,
                                $selisih_lk,
                                $keputusan_lk,
                                $keterangan_lk,
                                $std_lk2,
                                $toleransi_lk2,
                                $periksa_lk2,
                                $selisih_lk2,
                                $keputusan_lk2,
                                $keterangan_lk2,
                                $catatan,
                                $lokasi,
                                $user,
                            ]
                        );

                    return response()->json(['message' => 'Data berhasil disimpan!']);

                case 2:
                    // Update
                    // dd($request->all());
                    DB::connection('ConnTestQC')
                        ->statement(
                            'EXEC SP_4451_CekGantiUkuranCL 
                        @kode = ?,
                        @id_cek = ?,
                        @shift = ?,
                        @jam_kerja_awal = ?,
                        @jam_kerja_akhir = ?,
                        @std_wa = ?,
                        @toleransi_wa = ?,
                        @periksa_wa = ?,
                        @selisih_wa = ?,
                        @keputusan_wa = ?,
                        @keterangan_wa = ?,
                        @std_we = ?,
                        @toleransi_we = ?,
                        @periksa_we = ?,
                        @selisih_we = ?,
                        @keputusan_we = ?,
                        @keterangan_we = ?,
                        @std_warna = ?,
                        @toleransi_warna = ?,
                        @periksa_warna = ?,
                        @selisih_warna = ?,
                        @keputusan_warna = ?,
                        @keterangan_warna = ?,
                        @std_dropper = ?,
                        @toleransi_dropper = ?,
                        @periksa_dropper = ?,
                        @selisih_dropper = ?,
                        @keputusan_dropper = ?,
                        @keterangan_dropper = ?,
                        @std_guadring = ?,
                        @toleransi_guadring = ?,
                        @periksa_guadring = ?,
                        @selisih_guadring = ?,
                        @keputusan_guadring = ?,
                        @keterangan_guadring = ?,
                        @std_jmlWA = ?,
                        @toleransi_jmlWA = ?,
                        @periksa_jmlWA = ?,
                        @selisih_jmlWA = ?,
                        @keputusan_jmlWA = ?,
                        @keterangan_jmlWA = ?,
                        @std_cg = ?,
                        @toleransi_cg = ?,
                        @periksa_cg = ?,
                        @selisih_cg = ?,
                        @keputusan_cg = ?,
                        @keterangan_cg = ?,
                        @std_mr = ?,
                        @toleransi_mr = ?,
                        @periksa_mr = ?,
                        @selisih_mr = ?,
                        @keputusan_mr = ?,
                        @keterangan_mr = ?,
                        @std_bk = ?,
                        @toleransi_bk = ?,
                        @periksa_bk = ?,
                        @selisih_bk = ?,
                        @keputusan_bk = ?,
                        @keterangan_bk = ?,
                        @std_lk = ?,
                        @toleransi_lk = ?,
                        @periksa_lk = ?,
                        @selisih_lk = ?,
                        @keputusan_lk = ?,
                        @keterangan_lk = ?,
                        @std_lk2 = ?,
                        @toleransi_lk2 = ?,
                        @periksa_lk2 = ?,
                        @selisih_lk2 = ?,
                        @keputusan_lk2 = ?,
                        @keterangan_lk2 = ?,
                        @catatan = ?,
                        @user = ?',
                            [
                                4,
                                $id_cek,
                                $shift,
                                $jam_kerja_awal,
                                $jam_kerja_akhir,
                                $std_wa,
                                $toleransi_wa,
                                $periksa_wa,
                                $selisih_wa,
                                $keputusan_wa,
                                $keterangan_wa,
                                $std_we,
                                $toleransi_we,
                                $periksa_we,
                                $selisih_we,
                                $keputusan_we,
                                $keterangan_we,
                                $std_warna,
                                $toleransi_warna,
                                $periksa_warna,
                                $selisih_warna,
                                $keputusan_warna,
                                $keterangan_warna,
                                $std_dropper,
                                $toleransi_dropper,
                                $periksa_dropper,
                                $selisih_dropper,
                                $keputusan_dropper,
                                $keterangan_dropper,
                                $std_guadring,
                                $toleransi_guadring,
                                $periksa_guadring,
                                $selisih_guadring,
                                $keputusan_guadring,
                                $keterangan_guadring,
                                $std_jmlWA,
                                $toleransi_jmlWA,
                                $periksa_jmlWA,
                                $selisih_jmlWA,
                                $keputusan_jmlWA,
                                $keterangan_jmlWA,
                                $std_cg,
                                $toleransi_cg,
                                $periksa_cg,
                                $selisih_cg,
                                $keputusan_cg,
                                $keterangan_cg,
                                $std_mr,
                                $toleransi_mr,
                                $periksa_mr,
                                $selisih_mr,
                                $keputusan_mr,
                                $keterangan_mr,
                                $std_bk,
                                $toleransi_bk,
                                $periksa_bk,
                                $selisih_bk,
                                $keputusan_bk,
                                $keterangan_bk,
                                $std_lk,
                                $toleransi_lk,
                                $periksa_lk,
                                $selisih_lk,
                                $keputusan_lk,
                                $keterangan_lk,
                                $std_lk2,
                                $toleransi_lk2,
                                $periksa_lk2,
                                $selisih_lk2,
                                $keputusan_lk2,
                                $keterangan_lk2,
                                $catatan,
                                $user,
                            ]
                        );

                    return response()->json(['message' => 'Data berhasil dikoreksi!']);

                case 3:
                // Delete
                DB::connection('ConnTestQC')
                    ->statement(
                        'EXEC SP_4451_CekGantiUkuranCL @kode = ?, @id_cek = ?',
                        [5, $id_cek]
                    );

                return response()->json(['message' => 'Data berhasil dihapus!']);

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
        if ($id == 'getDataTable') {
            $tgl_awal = $request->input('tgl_awal');
            $tgl_akhir = $request->input('tgl_akhir');
            $results = DB::connection('ConnCircular')
                ->select('EXEC SP_4451_MaintenancePemeriksaanGantiUkuran @Kode = ?, @tgl_awal = ?, @tgl_akhir = ?', [12, $tgl_awal, $tgl_akhir]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'tanggal' => Carbon::parse($row->tanggal)->format('m/d/Y'),
                    'tanggal_raw' => Carbon::parse($row->tanggal)->format('Y-m-d'),
                    'id_pemeriksaan' => trim($row->id_pemeriksaan),
                    'Type_Mesin' => trim($row->Type_Mesin),
                    'Nama_mesin' => trim($row->Nama_mesin),
                    'ukuran_asal' => trim($row->ukuran_asal),
                    'ukuran_baru' => trim($row->ukuran_baru),
                    'berat_standart' => trim($row->berat_standart),
                    'berat_realita' => trim($row->berat_realita),
                    'benang_wa' => trim($row->benang_wa),
                    'benang_we' => trim($row->benang_we),
                    'jumlah_warp' => trim($row->jumlah_warp),
                    'user_input' => trim($row->user_input),
                    'user_acc' => trim($row->user_acc),
                ];
            }
            // dd($response);
            return datatables($response)->make(true);

        } else if ($id == 'getDataSelect') {
            $id_pemeriksaan = $request->input('id_pemeriksaan');
            $results = DB::connection('ConnCircular')
                ->select('EXEC SP_4451_MaintenancePemeriksaanGantiUkuran @Kode = ?, @id_pemeriksaan = ?', [11, $id_pemeriksaan]);
            // dd($results);

            return response()->json($results);

        } else if ($id == 'getDataTableBawah') {
            $tgl_awal = $request->input('tgl_awalBawah');
            $tgl_akhir = $request->input('tgl_akhirBawah');
            $lokasi = $request->input('lokasi');
            // dd($tgl_awal, $tgl_akhir, $lokasi);
            $results = DB::connection('ConnTestQC')
                ->select('EXEC SP_4451_CekGantiUkuranCL @kode = ?, @tgl_awal = ?, @tgl_akhir = ?, @lokasi = ?', [2, $tgl_awal, $tgl_akhir, $lokasi]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'tanggal' => Carbon::parse($row->tanggal)->format('m/d/Y'),
                    'tanggal_raw' => Carbon::parse($row->tanggal)->format('Y-m-d'),
                    'id_cek' => trim($row->id_cek),
                    'shift' => trim($row->shift),
                    'Type_Mesin' => trim($row->Type_Mesin),
                    'Nama_mesin' => trim($row->Nama_mesin),
                    'ukuran_baru' => $row->ukuran_baru,
                    'benang_wa' => trim($row->benang_wa),
                    'benang_we' => trim($row->benang_we),
                    'user_input' => trim($row->user_input),
                    'user_acc' => trim($row->user_acc),
                ];
            }
            // dd($response);
            return datatables($response)->make(true);

        } else if ($id == 'getKoreksi') {
            $id_cek = $request->input('id_cek');
            // dd($tgl_awal, $tgl_akhir, $lokasi);
            $results = DB::connection('ConnTestQC')
                ->select('EXEC SP_4451_CekGantiUkuranCL @kode = ?, @id_cek = ?', [3, $id_cek]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'tanggal_cek' => Carbon::parse($row->tanggal_cek)->format('m/d/Y'),
                    'tanggal_raw' => Carbon::parse($row->tanggal_cek)->format('Y-m-d'),
                    'tanggal_ganti' => Carbon::parse($row->tanggal_ganti)->format('Y-m-d'),
                    'id_cek' => trim($row->id_cek),
                    'shift' => trim($row->shift),
                    'type_mesin' => trim($row->type_mesin),
                    'nama_mesin' => trim($row->nama_mesin),
                    'jam_kerja_awal' => trim($row->jam_kerja_awal),
                    'jam_kerja_akhir' => trim($row->jam_kerja_akhir),
                    'std_wa' => $row->std_wa,
                    'toleransi_wa' => $row->toleransi_wa,
                    'periksa_wa' => $row->periksa_wa,
                    'selisih_wa' => $row->selisih_wa,
                    'keputusan_wa' => $row->keputusan_wa,
                    'keterangan_wa' => $row->keterangan_wa,
                    'std_we' => $row->std_we,
                    'toleransi_we' => $row->toleransi_we,
                    'periksa_we' => $row->periksa_we,
                    'selisih_we' => $row->selisih_we,
                    'keputusan_we' => $row->keputusan_we,
                    'keterangan_we' => $row->keterangan_we,
                    'std_warna' => $row->std_warna,
                    'toleransi_warna' => $row->toleransi_warna,
                    'periksa_warna' => $row->periksa_warna,
                    'selisih_warna' => $row->selisih_warna,
                    'keputusan_warna' => $row->keputusan_warna,
                    'keterangan_warna' => $row->keterangan_warna,
                    'std_dropper' => $row->std_dropper,
                    'toleransi_dropper' => $row->toleransi_dropper,
                    'periksa_dropper' => $row->periksa_dropper,
                    'selisih_dropper' => $row->selisih_dropper,
                    'keputusan_dropper' => $row->keputusan_dropper,
                    'keterangan_dropper' => $row->keterangan_dropper,
                    'std_guadring' => $row->std_guadring,
                    'toleransi_guadring' => $row->toleransi_guadring,
                    'periksa_guadring' => $row->periksa_guadring,
                    'selisih_guadring' => $row->selisih_guadring,
                    'keputusan_guadring' => $row->keputusan_guadring,
                    'keterangan_guadring' => $row->keterangan_guadring,
                    'std_jmlWA' => $row->std_jmlWA,
                    'toleransi_jmlWA' => $row->toleransi_jmlWA,
                    'periksa_jmlWA' => $row->periksa_jmlWA,
                    'selisih_jmlWA' => $row->selisih_jmlWA,
                    'keputusan_jmlWA' => $row->keputusan_jmlWA,
                    'keterangan_jmlWA' => $row->keterangan_jmlWA,
                    'std_cg' => $row->std_cg,
                    'toleransi_cg' => $row->toleransi_cg,
                    'periksa_cg' => $row->periksa_cg,
                    'selisih_cg' => $row->selisih_cg,
                    'keputusan_cg' => $row->keputusan_cg,
                    'keterangan_cg' => $row->keterangan_cg,
                    'std_mr' => $row->std_mr,
                    'toleransi_mr' => $row->toleransi_mr,
                    'periksa_mr' => $row->periksa_mr,
                    'selisih_mr' => $row->selisih_mr,
                    'keputusan_mr' => $row->keputusan_mr,
                    'keterangan_mr' => $row->keterangan_mr,
                    'std_bk' => $row->std_bk,
                    'toleransi_bk' => $row->toleransi_bk,
                    'periksa_bk' => $row->periksa_bk,
                    'selisih_bk' => $row->selisih_bk,
                    'keputusan_bk' => $row->keputusan_bk,
                    'keterangan_bk' => $row->keterangan_bk,
                    'std_lk' => $row->std_lk,
                    'toleransi_lk' => $row->toleransi_lk,
                    'periksa_lk' => $row->periksa_lk,
                    'selisih_lk' => $row->selisih_lk,
                    'keputusan_lk' => $row->keputusan_lk,
                    'keterangan_lk' => $row->keterangan_lk,
                    'std_lk2' => $row->std_lk2,
                    'toleransi_lk2' => $row->toleransi_lk2,
                    'periksa_lk2' => $row->periksa_lk2,
                    'selisih_lk2' => $row->selisih_lk2,
                    'keputusan_lk2' => $row->keputusan_lk2,
                    'keterangan_lk2' => $row->keterangan_lk2,
                    'catatan' => $row->catatan,
                    'lokasi' => trim($row->lokasi),
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
