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

class ACCCekGantiUkuranCLController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('QC');
        $listLokasi = DB::connection('ConnTestQC')
            ->table('Lokasi')
            ->select('idLokasi', 'nama_lokasi')
            ->get();
        $listLokasi = collect($listLokasi)
            ->whereIn('idLokasi', [1])
            ->values();
        return view('QC.Circular.ACCCekGantiUkuranCL', compact('access', 'listLokasi'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $rowDataArray = $request->input('checkedRows', []);
        $nomorUser = trim(Auth::user()->NomorUser);
        // dd($rowDataArray);
        if (empty($rowDataArray)) {
            return response()->json([
                'error' => 'TIDAK DAPAT Proses Data, pilih data terlebih dahulu!!!..'
            ]);
        }

        foreach ($rowDataArray as $item) {
            DB::connection('ConnTestQC')->statement(
                'EXEC SP_4451_CekGantiUkuranCL @kode = ?, @user = ?, @id_cek = ?',
                [
                    7,
                    $nomorUser,
                    $item['id_cek']
                ]
            );
        }

        return response()->json(['message' => 'Data berhasil diACC!!..']);
    }

    public function show(Request $request, $id)
    {
        if ($id == 'getData') {
            $tgl_awal = $request->input('tgl_awal');
            $tgl_akhir = $request->input('tgl_akhir');
            $lokasi = $request->input('lokasi');
            // dd($tgl_awal, $tgl_akhir, $lokasi);
            $results = DB::connection('ConnTestQC')
                ->select('EXEC SP_4451_CekGantiUkuranCL @kode = ?, @tgl_awal = ?, @tgl_akhir = ?, @lokasi = ?', [8, $tgl_awal, $tgl_akhir, $lokasi]);
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

        } else if ($id == 'getPrint') {
            $id_cek = $request->input('id_cek');
            $user = trim(Auth::user()->NomorUser);
            // dd($id_cek);
            $results = DB::connection('ConnTestQC')
                ->select('EXEC SP_4451_CekGantiUkuranCL @kode = ?, @id_cek = ?', [6, $id_cek]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'tanggal_cek' => Carbon::parse($row->tanggal_cek)->format('m/d/Y'),
                    'tanggal_raw' => Carbon::parse($row->tanggal_cek)->format('Y-m-d'),
                    'tanggal_ganti' => Carbon::parse($row->tanggal_ganti)->format('Y-m-d'),
                    'id_cek' => trim($row->id_cek),
                    'shift' => trim($row->shift),
                    'Type_Mesin' => trim($row->Type_Mesin),
                    'Nama_mesin' => trim($row->Nama_mesin),
                    'jam_kerja' => Carbon::parse($row->jam_kerja_awal)->format('H:i')
                        . ' - ' .
                        Carbon::parse($row->jam_kerja_akhir)->format('H:i'),
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
                    'ukuran_baru' => $row->ukuran_baru,
                    'lokasi' => trim($row->lokasi),
                    'ttd_qc' => $row->ttd_qc,
                    'nama_qc' => $row->nama_qc,
                    'ttd_cl' => $row->ttd_cl,
                    'nama_cl' => $row->nama_cl,
                    'ttd_acc' => $row->ttd_acc,
                    'nama_acc' => $row->nama_acc,
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
