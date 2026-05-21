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
use Illuminate\Support\Facades\Http;

class PemberhentianMesinCLController extends Controller
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
        return view('QC.Circular.PemberhentianMesinCL', compact('access', 'listTypeMesin', 'listLokasi'));
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
        $idType_mesin = $request->input('idType_mesin');
        $idNama_mesin = $request->input('idNama_mesin');
        $jam_berhenti = $request->input('jam_berhenti');
        $masalah = $request->input('masalah');
        $namaMesin = $request->input('namaMesin');
        $lokasi = $request->input('lokasi');
        $user_input = trim(Auth::user()->NomorUser);
        $id_pemberhentian = $request->input('id_pemberhentian');
        // dd($request->all());
        try {
            switch ($proses) {
                case 1:
                    // Simpan
                    DB::connection('ConnTestQC')
                        ->statement(
                            'EXEC SP_4451_PemberhentianMesinCL 
                        @kode = ?,
                        @tanggal = ?,
                        @idType_mesin = ?,
                        @idNama_mesin = ?,
                        @jam_berhenti = ?,
                        @masalah = ?,
                        @lokasi = ?,
                        @user_input = ?',
                            [
                                1,
                                $tanggal,
                                $idType_mesin,
                                $idNama_mesin,
                                $jam_berhenti,
                                $masalah,
                                $lokasi,
                                $user_input,
                            ]
                        );

                    return response()->json(['message' => 'Data berhasil disimpan!']);

                case 2:
                    // Update
                    // dd($request->all());
                    DB::connection('ConnTestQC')
                        ->statement(
                            'EXEC SP_4451_PemberhentianMesinCL
                        @kode = ?,
                        @id_pemberhentian = ?,
                        @jam_berhenti = ?,
                        @masalah = ?',
                            [
                                4,
                                $id_pemberhentian,
                                $jam_berhenti,
                                $masalah,
                            ]
                        );

                    return response()->json(['message' => 'Data berhasil dikoreksi!']);

                case 3:
                    // Delete
                    DB::connection('ConnTestQC')
                        ->statement(
                            'EXEC SP_4451_PemberhentianMesinCL @kode = ?, @id_pemberhentian = ?',
                            [5, $id_pemberhentian]
                        );

                    return response()->json(['message' => 'Data berhasil dihapus!']);

                case 4:
                    // Send WA
                    if ($lokasi == 1) {
                        $response = Http::withHeaders([
                            'Authorization' => env('WA_TOKEN')
                        ])->post('https://api.fonnte.com/send', [
                                    'target' => '120363428108396190@g.us',
                                    'message' => '⚠️ Mesin ' . $namaMesin . ' dengan masalah: ' . $masalah . '. Mohon segera ditindaklanjuti!',
                                ]);

                        if ($response) {
                            DB::connection('ConnTestQC')
                                ->statement(
                                    'EXEC SP_4451_PemberhentianMesinCL @kode = ?, @id_pemberhentian = ?',
                                    [6, $id_pemberhentian]
                                );
                        }

                        return response()->json(['message' => 'Berhasil Kirim Whatsapp!']);

                    } else if ($lokasi == 2) {
                        $response = Http::withHeaders([
                            'Authorization' => env('WA_TOKEN')
                        ])->post('https://api.fonnte.com/send', [
                                    'target' => '120363427323904569@g.us',
                                    'message' => '⚠️ Mesin ' . $namaMesin . ' dengan masalah: ' . $masalah . '. Mohon segera ditindaklanjuti!',
                                ]);

                        if ($response) {
                            DB::connection('ConnTestQC')
                                ->statement(
                                    'EXEC SP_4451_PemberhentianMesinCL @kode = ?, @id_pemberhentian = ?',
                                    [6, $id_pemberhentian]
                                );
                        }
                    } else if ($lokasi == 3) {
                        # code...
                    }

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
            $lokasi = $request->input('lokasi');
            // dd($request->all());
            $results = DB::connection('ConnTestQC')
                ->select('EXEC SP_4451_PemberhentianMesinCL @Kode = ?, @tgl_awal = ?, @tgl_akhir = ?, @lokasi = ?', [2, $tgl_awal, $tgl_akhir, $lokasi]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'tanggal' => Carbon::parse($row->tanggal)->format('m/d/Y'),
                    'tanggal_raw' => Carbon::parse($row->tanggal)->format('Y-m-d'),
                    'id_pemberhentian' => trim($row->id_pemberhentian),
                    'Type_Mesin' => trim($row->Type_Mesin),
                    'Nama_mesin' => trim($row->Nama_mesin),
                    'jam_berhenti' => Carbon::parse($row->jam_berhenti)->format('H:i'),
                    'jam_dijalankan' => trim($row->jam_dijalankan),
                    'masalah' => trim($row->masalah),
                    'penyelesaian' => trim($row->penyelesaian),
                    'user_input' => trim($row->user_input),
                    'NamaUser' => trim($row->NamaUser),
                    'user_selesai' => trim($row->user_selesai),
                    'time_send_wa' => trim($row->time_send_wa),
                ];
            }
            // dd($response);
            return datatables($response)->make(true);

        } else if ($id == 'getDataKoreksi') {
            $id_pemberhentian = $request->input('id_pemberhentian');
            // dd($request->all());
            $results = DB::connection('ConnTestQC')
                ->select('EXEC SP_4451_PemberhentianMesinCL @Kode = ?, @id_pemberhentian = ?', [3, $id_pemberhentian]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'tanggal' => Carbon::parse($row->tanggal)->format('Y-m-d'),
                    'id_pemberhentian' => trim($row->id_pemberhentian),
                    'type_mesin' => trim($row->type_mesin),
                    'nama_mesin' => trim($row->nama_mesin),
                    'jam_berhenti' => ($row->jam_berhenti),
                    'jam_dijalankan' => trim($row->jam_dijalankan),
                    'masalah' => trim($row->masalah),
                    'penyelesaian' => trim($row->penyelesaian),
                    'user_input' => trim($row->user_input),
                    'id_lokasi' => trim($row->id_lokasi),
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
