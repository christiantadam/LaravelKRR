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

class GelondonganCircularController extends Controller
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
        // $listTypeMesin = collect($listTypeMesin)
        //     ->whereIn('IdType_Mesin', [13, 17])
        //     ->values();
        return view('QC.Circular.GelondonganCircular', compact('access', 'listTypeMesin', 'listLokasi'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $proses = $request->input('proses'); // 1 = insert, 2 = update, 3 = delete
        $tanggal = $request->input('tanggal');
        $shift = $request->input('shift');
        $jam_kerja_awal = $request->input('jam_kerja_awal');
        $jam_kerja_akhir = $request->input('jam_kerja_akhir');
        $user_input = trim(Auth::user()->NomorUser);
        $idType_mesin = $request->input('idType_mesin');
        $idNama_mesin = $request->input('idNama_mesin');
        $mrng = $request->input('mrng');
        $gbs = $request->input('gbs');
        $mlpt = $request->input('mlpt');
        $mlbr = $request->input('mlbr');
        $myst = $request->input('myst');
        $rajut_jelek = $request->input('rajut_jelek');
        $berbulu = $request->input('berbulu');
        $phi_besar = $request->input('phi_besar');
        $qc_pass = $request->input('qc_pass');
        $keterangan = $request->input('keterangan');
        $rowDataAtas = $request->input('rowDataAtas');
        $idDetail = $request->input('idDetail');
        $lokasi = $request->input('lokasi');
        try {

            switch ($proses) {
                case 1:
                    // Simpan
                    DB::connection('ConnTestQC')
                        ->statement(
                            'EXEC SP_4451_GelondonganCL 
                        @Kode = ?,
                        @tanggal = ?,
                        @shift = ?,
                        @jam_kerja_awal = ?,
                        @jam_kerja_akhir = ?,
                        @user_input = ?,
                        @idType_mesin = ?,
                        @idNama_mesin = ?,
                        @mrng = ?,
                        @gbs = ?,
                        @mlpt = ?,
                        @mlbr = ?,
                        @myst = ?,
                        @rajut_jelek = ?,
                        @berbulu = ?,
                        @phi_besar = ?,
                        @qc_pass = ?,
                        @keterangan = ?,
                        @idHeaderCKCL = ?,
                        @idLokasi = ?',
                            [
                                2,
                                $tanggal,
                                $shift,
                                $jam_kerja_awal,
                                $jam_kerja_akhir,
                                $user_input,
                                $idType_mesin,
                                $idNama_mesin,
                                $mrng,
                                $gbs,
                                $mlpt,
                                $mlbr,
                                $myst,
                                $rajut_jelek,
                                $berbulu,
                                $phi_besar,
                                $qc_pass,
                                $keterangan,
                                $rowDataAtas['idHeader'],
                                $lokasi
                            ]
                        );

                    return response()->json(['message' => 'Data berhasil disimpan!']);

                case 2:
                    DB::connection('ConnTestQC')
                        ->statement(
                            'EXEC SP_4451_GelondonganCL 
                        @Kode = ?,
                        @jam_kerja_awal = ?,
                        @jam_kerja_akhir = ?,
                        @user_input = ?,
                        @idType_mesin = ?,
                        @idNama_mesin = ?,
                        @mrng = ?,
                        @gbs = ?,
                        @mlpt = ?,
                        @mlbr = ?,
                        @myst = ?,
                        @rajut_jelek = ?,
                        @berbulu = ?,
                        @phi_besar = ?,
                        @qc_pass = ?,
                        @keterangan = ?,
                        @idDetail = ?',
                            [
                                5,
                                $jam_kerja_awal,
                                $jam_kerja_akhir,
                                $user_input,
                                $idType_mesin,
                                $idNama_mesin,
                                $mrng,
                                $gbs,
                                $mlpt,
                                $mlbr,
                                $myst,
                                $rajut_jelek,
                                $berbulu,
                                $phi_besar,
                                $qc_pass,
                                $keterangan,
                                $idDetail,
                            ]
                        );

                    return response()->json(['message' => 'Data berhasil dikoreksi!']);

                case 3:
                    // Delete
                    DB::connection('ConnTestQC')
                        ->statement(
                            'EXEC SP_4451_GelondonganCL @Kode = ?, @user_input = ?, @idDetail = ?',
                            [6, $user_input, $idDetail]
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
        if ($id == 'getDataHeaderCKCL') {
            // dd($request->all());
            $tgl_awal = $request->input('tgl_awal');
            $tgl_akhir = $request->input('tgl_akhir');
            $lokasi = $request->input('lokasi');
            $results = DB::connection('ConnTestQC')
                ->select('EXEC SP_4451_GelondonganCL @Kode = ?, @tgl_awal = ?, @tgl_akhir = ?, @idLokasi = ?', [1, $tgl_awal, $tgl_akhir, $lokasi]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'idHeader' => trim($row->idHeader),
                    'tanggal' => Carbon::parse($row->tanggal)->format('m/d/Y'),
                    'tanggal_raw' => Carbon::parse($row->tanggal)->format('Y-m-d'),
                    'shift' => trim($row->shift),
                    'status_panen' => trim($row->status_panen),
                    'user_panen' => trim($row->user_panen),

                ];
            }
            // dd($response);
            return datatables($response)->make(true);
        } else if ($id == 'getDataDetail') {
            $tgl_awal = $request->input('tgl_awalDetail');
            $tgl_akhir = $request->input('tgl_akhirDetail');
            $lokasi = $request->input('lokasi');
            $results = DB::connection('ConnTestQC')
                ->select('EXEC SP_4451_GelondonganCL @Kode = ?, @tgl_awal = ?, @tgl_akhir = ?, @idLokasi = ?', [3, $tgl_awal, $tgl_akhir, $lokasi]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'tanggal' => Carbon::parse($row->tanggal)->format('m/d/Y'),
                    'tanggal_raw' => Carbon::parse($row->tanggal)->format('Y-m-d'),
                    'idDetail' => trim($row->idDetail),
                    'shift' => trim($row->shift),
                    'Nama_mesin' => trim($row->Nama_mesin),
                    'qc_pass' => trim($row->qc_pass),
                    'user_input' => trim($row->user_input),

                ];
            }
            // dd($response);
            return datatables($response)->make(true);
        } else if ($id == 'getDataKoreksi') {
            $idDetail = $request->input('idDetail');
            $results = DB::connection('ConnTestQC')
                ->select('EXEC SP_4451_GelondonganCL @Kode = ?, @idDetail = ?', [4, $idDetail]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'idDetail' => trim($row->idDetail),
                    'tanggal' => Carbon::parse($row->tanggal)->format('Y-m-d'),
                    'shift' => trim($row->shift),
                    'jam_kerja_awal' => trim($row->jam_kerja_awal),
                    'jam_kerja_akhir' => trim($row->jam_kerja_akhir),
                    'idType_mesin' => trim($row->idType_mesin),
                    'idNama_mesin' => trim($row->idNama_mesin),
                    'mrng' => trim($row->mrng),
                    'gbs' => trim($row->gbs),
                    'mlpt' => trim($row->mlpt),
                    'mlbr' => trim($row->mlbr),
                    'myst' => trim($row->myst),
                    'rajut_jelek' => trim($row->rajut_jelek),
                    'berbulu' => trim($row->berbulu),
                    'phi_besar' => trim($row->phi_besar),
                    'qc_pass' => trim($row->qc_pass),
                    'keterangan' => trim($row->keterangan),

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
