<?php

namespace App\Http\Controllers\Guard\Pemeriksaan;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Log;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class PemeriksaanBarangController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Guard');
        $listNoPol = DB::connection('ConnUtility')
            ->select('EXEC SP_5409_PRG_LIST_NOPOL');
        $listSatuan = DB::connection('ConnPurchase')
            ->table('YSATUAN')
            ->select('No_satuan', 'Nama_satuan')
            ->get();
        $listTypeBarang = DB::connection('ConnGuard')
            ->table('Type_Barang')
            ->select('id_typeBarang', 'nama_typeBarang')
            ->get();

        // dd($listTypeBarang);
        // $listNoPol = collect($listNoPol)
        //     ->whereIn('IdType_Mesin', [13, 17])
        //     ->values();
        return view('Guard.Pemeriksaan.PemeriksaanBarang', compact('access', 'listNoPol', 'listSatuan', 'listTypeBarang'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $proses = $request->input('proses');
        $tanggal = $request->input('tanggal');
        $nopol = $request->input('nopol');
        $jam_muat_awal = $request->input('jam_muat_awal');
        $jam_muat_akhir = $request->input('jam_muat_akhir');
        $tujuan_kirim = $request->input('tujuan_kirim');
        $instansi = $request->input('instansi');
        $sopir = $request->input('sopir');
        $keterangan = $request->input('keterangan');
        $ttd_base64 = $request->input('ttd_base64');
        $allRowsDataAtas = $request->input('allRowsDataAtas', []);
        $user_input = trim(Auth::user()->NomorUser);
        $idHeader = $request->input('idHeader');
        $idDetail = $request->input('idDetail');
        // dd(
        //     $proses,
        //     $tanggal,
        //     $nopol,
        //     $jam_muat_awal,
        //     $jam_muat_akhir,
        //     $tujuan_kirim,
        //     $instansi,
        //     $sopir,
        //     $keterangan,
        //     $ttd_base64,
        //     $allRowsDataAtas,
        //     $user_input,
        // );
        try {
            switch ($proses) {
                case 1:
                    DB::connection('ConnGuard')->beginTransaction();
                    // Simpan
                    DB::connection('ConnGuard')
                        ->statement(
                            'EXEC SP_4451_PemeriksaanBarang 
                        @kode = ?,
                        @tanggal = ?,
                        @nopol = ?,
                        @jam_muat_awal = ?,
                        @jam_muat_akhir = ?,
                        @tujuan_kirim = ?,
                        @instansi = ?,
                        @sopir = ?,
                        @keterangan = ?,
                        @user_input = ?,
                        @ttd_base64 = ?',
                            [
                                1,
                                $tanggal,
                                $nopol,
                                $jam_muat_awal,
                                $jam_muat_akhir,
                                $tujuan_kirim,
                                $instansi,
                                $sopir,
                                $keterangan,
                                $user_input,
                                $ttd_base64,
                            ]
                        );

                    // EXEC KODE = 4 (baru jalan kalau kode 1 sukses)
                    $idHeaderResult = DB::connection('ConnGuard')->select(
                        'EXEC SP_4451_PemeriksaanBarang
                        @kode = ?,
                        @user_input = ?',
                        [
                            4,
                            $user_input,
                        ]
                    );
                    $idHeaderResult = $idHeaderResult[0]->idHeader;
                    // dd($idHeaderResult);

                    if ($idHeaderResult) {
                        foreach ($allRowsDataAtas as $row) {
                            // $jamFull = date('Y-m-d') . ' ' . $row[3];
                            $jamFull = $tanggal . ' ' . $row[3];
                            DB::connection('ConnGuard')->statement(
                                'EXEC SP_4451_PemeriksaanBarang
                            @kode = ?,
                            @idHeader = ?,
                            @type_barang = ?,
                            @jam = ?,
                            @item = ?,
                            @satuan = ?,
                            @user_input = ?',
                                [
                                    5,
                                    $idHeaderResult,
                                    $row[1],
                                    $jamFull,
                                    $row[4],
                                    $row[5],
                                    $user_input
                                ]
                            );
                        }
                    }

                    DB::connection('ConnGuard')->commit();
                    return response()->json(['message' => 'Data berhasil disimpan!']);

                case 2:
                    // Update
                    DB::connection('ConnGuard')->beginTransaction();
                    // Simpan
                    DB::connection('ConnGuard')
                        ->statement(
                            'EXEC SP_4451_PemeriksaanBarang 
                        @kode = ?,
                        @idHeader = ?,
                        @tanggal = ?,
                        @nopol = ?,
                        @jam_muat_awal = ?,
                        @jam_muat_akhir = ?,
                        @tujuan_kirim = ?,
                        @instansi = ?,
                        @sopir = ?,
                        @keterangan = ?,
                        @user_input = ?,
                        @ttd_base64 = ?',
                            [
                                2,
                                $idHeader,
                                $tanggal,
                                $nopol,
                                $jam_muat_awal,
                                $jam_muat_akhir,
                                $tujuan_kirim,
                                $instansi,
                                $sopir,
                                $keterangan,
                                $user_input,
                                $ttd_base64,
                            ]
                        );

                    foreach ($allRowsDataAtas as $row) {
                        $jamFull = $tanggal . ' ' . $row[3];
                        // JIKA ID DETAIL KOSONG (DATA BARU)
                        if ($row[0] == '' || $row[0] === null) {
                            DB::connection('ConnGuard')->statement(
                                'EXEC SP_4451_PemeriksaanBarang
                            @kode = ?,
                            @idHeader = ?,
                            @type_barang = ?,
                            @jam = ?,
                            @item = ?,
                            @satuan = ?,
                            @user_input = ?',
                                [
                                    5,                 // contoh: kode INSERT
                                    $idHeader,          // header
                                    $row[1],            // type_barang
                                    $jamFull,
                                    $row[4],            // item
                                    $row[5],            // satuan
                                    $user_input
                                ]
                            );

                        } else {
                            // JIKA ID DETAIL ADA (UPDATE)
                            DB::connection('ConnGuard')->statement(
                                'EXEC SP_4451_PemeriksaanBarang
                            @kode = ?,
                            @idDetail = ?,
                            @type_barang = ?,
                            @jam = ?,
                            @item = ?,
                            @satuan = ?,
                            @user_input = ?',
                                [
                                    9,
                                    $row[0],
                                    $row[1],
                                    $jamFull,
                                    $row[4],
                                    $row[5],
                                    $user_input
                                ]
                            );
                        }
                    }

                    DB::connection('ConnGuard')->commit();
                    return response()->json(['message' => 'Data berhasil dikoreksi!']);

                case 3:
                    // Delete
                    DB::connection('ConnGuard')->beginTransaction();

                    DB::connection('ConnGuard')->statement(
                        'EXEC SP_4451_PemeriksaanBarang
                            @kode = ?,
                            @idHeader = ?',
                        [
                            3,
                            $idHeader
                        ]
                    );

                    DB::connection('ConnGuard')->commit();
                    return response()->json(['message' => 'Data berhasil dihapus!']);

                case 4:
                    // Delete
                    DB::connection('ConnGuard')->statement(
                        'EXEC SP_4451_PemeriksaanBarang
                            @kode = ?,
                            @idDetail = ?',
                        [
                            10,
                            $idDetail
                        ]
                    );
                    return response()->json(['message' => 'Data berhasil detail dihapus!']);

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
        if ($id == 'getDataDetail') {
            $tgl_awal = $request->input('tgl_awal');
            $tgl_akhir = $request->input('tgl_akhir');
            // dd($request->all());
            // $type_kain = $request->input('type_kain');
            $results = DB::connection('ConnGuard')
                ->select('EXEC SP_4451_PemeriksaanBarang @Kode = ?, @tgl_awal = ?, @tgl_akhir = ?', [6, $tgl_awal, $tgl_akhir]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'tanggal' => Carbon::parse($row->tanggal)->format('m/d/Y'),
                    'tanggal_raw' => Carbon::parse($row->tanggal)->format('Y-m-d'),
                    'idHeader' => trim($row->idHeader),
                    'jam_muat' => Carbon::parse($row->jam_muat_awal)->format('H:i')
                        . ' - ' .
                        Carbon::parse($row->jam_muat_akhir)->format('H:i'),
                    'nopol' => trim($row->nopol) ?? "",
                    'instansi' => trim($row->instansi) ?? "",
                    'sopir' => trim($row->sopir) ?? "",
                    'user_input' => trim($row->user_input),
                ];
            }
            // dd($response);
            return datatables($response)->make(true);

        } else if ($id == 'getDataKoreksiHeader') {
            $idHeader = $request->input('idHeader');
            // dd($request->all());
            // $type_kain = $request->input('type_kain');
            $results = DB::connection('ConnGuard')
                ->select('EXEC SP_4451_PemeriksaanBarang @Kode = ?, @idHeader = ?', [7, $idHeader]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'tanggal' => Carbon::parse($row->tanggal)->format('m/d/Y'),
                    'tanggal_raw' => Carbon::parse($row->tanggal)->format('Y-m-d'),
                    'idHeader' => trim($row->idHeader),
                    'jam_muat_awal' => $row->jam_muat_awal,
                    'jam_muat_akhir' => $row->jam_muat_akhir,
                    'nopol' => trim($row->nopol) ?? "",
                    'tujuan_kirim' => trim($row->tujuan_kirim) ?? "",
                    'instansi' => trim($row->instansi) ?? "",
                    'sopir' => trim($row->sopir) ?? "",
                    'keterangan' => trim($row->keterangan) ?? "",
                    'ttd_base64' => trim($row->ttd_base64) ?? "",
                    'user_input' => trim($row->user_input),
                ];
            }
            // dd($response);
            return datatables($response)->make(true);

        } else if ($id == 'getDataKoreksiDetail') {
            $idHeader = $request->input('idHeader');
            // dd($request->all());
            $results = DB::connection('ConnGuard')
                ->select('EXEC SP_4451_PemeriksaanBarang @Kode = ?, @idHeader = ?', [8, $idHeader]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'idDetail' => $row->idDetail,
                    'type_barang' => trim($row->type_barang),
                    'nama_typeBarang' => $row->nama_typeBarang,
                    'jam' => $row->jam,
                    'item' => $row->item,
                    'satuan' => trim($row->satuan) ?? "",
                    'Nama_satuan' => trim($row->Nama_satuan) ?? "",
                    'user_input' => trim($row->user_input) ?? "",
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
