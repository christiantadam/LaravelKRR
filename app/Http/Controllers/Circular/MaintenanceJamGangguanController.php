<?php

namespace App\Http\Controllers\Circular;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Log;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class MaintenanceJamGangguanController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Circular');
        return view('Circular.transaksi.MaintenanceJamGangguan', compact('access'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $proses = $request->input('proses');
        $tanggal = $request->input('tanggal');
        $shift = $request->input('shift');
        $id_mesin = $request->input('id_namaMesin');
        $jam_gangguan = $request->input('jam_gangguan');
        $jam_gangguan2 = $request->input('jam_gangguan2');
        $id_jenisGangguan = $request->input('id_jenisGangguan');
        $TypeG = $request->input('typeG');
        $idOrder = $request->input('idOrder');
        $order = $request->input('order');
        $idGangguan = $request->input('idGangguan');
        // dd($request->all());
        // return response()->json($request->all());
        // PROSES = 1 (INSERT)
        if ($proses == 1) {
            // Tentukan TypeG
            if ($TypeG == null) {
                return response()->json(['error' => 'Pilih dulu Type Gangguannya!']);
            }
            // dd($request->all());
            // --------------------- CEK SUDAH ADA APA BELUM -----------------
            $cek = DB::connection('ConnCircular')
                ->select("EXEC sp_list_gangguan1 ?,?,?,?,?,?,?", [
                    $tanggal,
                    $shift,
                    $id_mesin,
                    $jam_gangguan,
                    $jam_gangguan2,
                    $TypeG,
                    $id_jenisGangguan
                ]);

            if (count($cek) > 0 && $cek[0]->Ada > 0) {
                $salah = true;
            }

            if ($salah == false) {

                // ------------------------ INSERT -------------------------
                DB::connection('ConnCircular')
                    ->statement("EXEC Sp_Maint_Gangguan @Kode = ?, @Tanggal = ?, @Shift = ?, @IdMesin = ?, @JamAwal = ?, @JamAkhir = ?, @IdTypeGangguan = ?, @IdJenisGangguan = ?, @IdOrder = ?, @NamaOrder = ?", [
                        1, // @Kode
                        $tanggal,
                        $shift,
                        $id_mesin,
                        $jam_gangguan,
                        $jam_gangguan2,
                        $TypeG,
                        $id_jenisGangguan,
                        $idOrder,
                        $order
                    ]);

                return response()->json(['message' => 'Data sudah diSIMPAN!']);
            } else {
                return response()->json(['error' => 'Gangguan sudah pernah diinputkan!']);
            }
        }

        // PROSES = 2 (UPDATE / KOREKSI)
        if ($proses == 2) {
            if ($TypeG == null) {
                return response()->json(['error' => 'Pilih dulu Type Gangguannya!']);
            }

            DB::connection('ConnCircular')
                ->statement("EXEC Sp_Maint_Gangguan @Kode = ?, @IdGangguan = ?, @IdTypeGangguan = ?, @IdJenisGangguan = ?", [
                    2,
                    $idGangguan,
                    $TypeG,
                    $id_jenisGangguan
                ]);

            return response()->json(['message' => 'Data sudah diKOREKSI!']);
        }

        // PROSES = 3 (DELETE)
        if ($proses == 3) {
            DB::connection('ConnCircular')
                ->statement("EXEC Sp_Maint_Gangguan Kode = ?, @IdGangguan = ?", [
                    3,
                    $idGangguan
                ]);

            return response()->json(['message' => 'Data sudah diHAPUS!']);
        }

        return response()->json(['error' => 'Proses tidak dikenal']);
    }

    public function show(Request $request, $id)
    {
        if ($id == 'getListTypeMesin') {
            $results = DB::connection('ConnCircular')
                ->select('EXEC Sp_List_TypeMesin @Kode = ?', [1]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Type_Mesin' => trim($row->Type_Mesin),
                    'IdType_Mesin' => trim($row->IdType_Mesin),
                ];
            }

            return datatables($response)->make(true);

        } else if ($id == 'getListMesin') {
            // === 1. Ambil data mesin berdasarkan IdType_Mesin ===
            $IdTypeMesin = $request->input('id_typeMesin');

            $results = DB::connection('ConnCircular')
                ->select('EXEC Sp_List_Mesin @Kode = ?, @IdType_Mesin = ?', [3, $IdTypeMesin]);

            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Nama_mesin' => trim($row->Nama_mesin),
                    'Id_mesin' => trim($row->Id_mesin),
                ];
            }

            return datatables($response)->make(true);

        } else if ($id == 'getLogMesin') {
            // === 2. Cek apakah ada log mesin (Sp_List_Log_Mesin @Kode = 4) ===
            $Tanggal = $request->input('tanggal');
            $Shift = $request->input('shift');
            $IdMesin = $request->input('id_namaMesin');

            $check = DB::connection('ConnCircular')
                ->select(
                    'EXEC Sp_List_Log_Mesin @Kode = ?, @Tanggal = ?, @Shift = ?, @IdMesin = ?',
                    [4, $Tanggal, $Shift, $IdMesin]
                );
            // dd($check);
            $Ada = 0;
            foreach ($check as $row) {
                $Ada = $row->Ada ?? 0;
            }

            // === 3. Jika ada log mesin, ambil detail order (Sp_List_Log_Mesin @Kode = 5) ===
            if ($Ada != 0) {
                $results = DB::connection('ConnCircular')
                    ->select(
                        'EXEC Sp_List_Log_Mesin @Kode = ?, @Tanggal = ?, @Shift = ?, @IdMesin = ?',
                        [5, $Tanggal, $Shift, $IdMesin]
                    );
                // dd($results);
                $response = [];
                foreach ($results as $row) {
                    $response[] = [
                        'Id_order' => $row->Id_order,
                        'NAMA_BRG' => $row->NAMA_BRG,
                    ];
                }

                return response()->json([
                    'status' => 'ada',
                    'data' => $response
                ]);
            } else {
                // Tidak ada data log mesin
                return response()->json([
                    'status' => 'tidak_ada',
                    'data' => []
                ]);
            }

        } else if ($id == 'getListJenisGangguan') {
            // Jalankan stored procedure Sp_List_JenisGangguan @Kode = 1
            $results = DB::connection('ConnCircular')
                ->select('EXEC Sp_List_JenisGangguan @Kode = ?', [1]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'Jenis_Gangguan' => trim($row->Jenis_Gangguan),
                    'Id_Jenis_Gangguan' => trim($row->Id_Jenis_Gangguan),
                ];
            }

            return datatables($response)->make(true);

        } else if ($id == 'getListGangguan') {
            // Cek apakah ada data gangguan untuk tanggal tertentu
            $tanggal = $request->input('tanggal');

            $checkData = DB::connection('ConnCircular')
                ->select('EXEC Sp_List_Gangguan @Kode = ?, @Tanggal = ?', [2, $tanggal]);
            // dd($checkData);
            $ada = 0;
            if (!empty($checkData)) {
                foreach ($checkData as $row) {
                    $ada = $row->Ada ?? 0;
                }
            }

            if ($ada > 0) {
                // Ambil daftar gangguan jika data ada
                $results = DB::connection('ConnCircular')
                    ->select('EXEC Sp_List_Gangguan @Kode = ?, @Tanggal = ?', [5, $tanggal]);
                // dd($results);
                $response = [];
                foreach ($results as $row) {
                    $response[] = [
                        'Nama_mesin' => trim($row->Nama_mesin),
                        'Shift' => trim($row->Shift),
                        'Id_Gangguan' => trim($row->Id_Gangguan),
                        'Id_Order' => trim($row->Id_Order) ?? "",
                        'NamaOrder' => trim($row->NamaOrder) ?? "",
                    ];
                }

                return datatables($response)->make(true);
            } else {
                // Jika tidak ada data
                return response()->json([
                    'success' => false,
                    'message' => 'Data gangguan untuk tanggal tersebut TIDAK ADA!',
                ]);
            }
        }
        // ========================
        // Ambil IdMesin berdasarkan nama mesin
        // ========================
        else if ($id == 'getIdMesinByNama') {
            $namaMesin = trim($request->input('namaMesin'));
            $results = DB::connection('ConnCircular')
                ->select('EXEC sp_IdMesin @nama = ?', [$namaMesin]);
            // dd($results);
            if (!empty($results)) {
                return response()->json([
                    'success' => true,
                    'Id_mesin' => $results[0]->Id_mesin,
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Data mesin tidak ditemukan!',
                ]);
            }
        } else if ($id == 'getStore') {
            $proses = $request->input('proses');
            $tanggal = $request->input('tanggal');
            $shift = $request->input('shift');
            $id_mesin = $request->input('id_namaMesin');
            $jam_gangguan = $request->input('jam_gangguan');
            $jam_gangguan2 = $request->input('jam_gangguan2');
            $id_jenisGangguan = $request->input('id_jenisGangguan');
            $TypeG = $request->input('typeG');
            $idOrder = $request->input('idOrder');
            $order = $request->input('order');
            $idGangguan = $request->input('idGangguan');
            // dd($request->all());
            // return response()->json($request->all());
            // PROSES = 1 (INSERT)
            if ($proses == 1) {
                // Tentukan TypeG
                if ($TypeG == null) {
                    return response()->json(['error' => 'Pilih dulu Type Gangguannya!']);
                }
                // dd($request->all());
                $salah = false;
                // --------------------- CEK SUDAH ADA APA BELUM -----------------
                $cek = DB::connection('ConnCircular')
                    ->select("EXEC sp_list_gangguan1 ?,?,?,?,?,?,?", [
                        $tanggal,
                        $shift,
                        $id_mesin,
                        $jam_gangguan,
                        $jam_gangguan2,
                        $TypeG,
                        $id_jenisGangguan
                    ]);
                // dd($cek);
                if (count($cek) > 0 && $cek[0]->ada > 0) {
                    $salah = true;
                }

                if ($salah == false) {
                    // ------------------------ INSERT -------------------------
                    DB::connection('ConnCircular')
                        ->statement("EXEC Sp_Maint_Gangguan @Kode = ?, @Tanggal = ?, @Shift = ?, @IdMesin = ?, @JamAwal = ?, @JamAkhir = ?, @IdTypeGangguan = ?, @IdJenisGangguan = ?, @IdOrder = ?, @NamaOrder = ?", [
                            1, // @Kode
                            $tanggal,
                            $shift,
                            $id_mesin,
                            $jam_gangguan,
                            $jam_gangguan2,
                            $TypeG,
                            $id_jenisGangguan,
                            $idOrder,
                            $order
                        ]);

                    return response()->json(['message' => 'Data sudah diSIMPAN!']);
                } else {
                    return response()->json(['error' => 'Gangguan sudah pernah diinputkan!']);
                }
            }

            // PROSES = 2 (UPDATE / KOREKSI)
            if ($proses == 2) {
                if ($TypeG == null) {
                    return response()->json(['error' => 'Pilih dulu Type Gangguannya!']);
                }

                DB::connection('ConnCircular')
                    ->statement("EXEC Sp_Maint_Gangguan @Kode = ?, @IdGangguan = ?, @IdTypeGangguan = ?, @IdJenisGangguan = ?", [
                        2,
                        $idGangguan,
                        $TypeG,
                        $id_jenisGangguan
                    ]);

                return response()->json(['message' => 'Data sudah diKOREKSI!']);
            }

            // PROSES = 3 (DELETE)
            if ($proses == 3) {
                DB::connection('ConnCircular')
                    ->statement("EXEC Sp_Maint_Gangguan @Kode = ?, @IdGangguan = ?", [
                        3,
                        $idGangguan
                    ]);

                return response()->json(['message' => 'Data sudah diHAPUS!']);
            }

            return response()->json(['error' => 'Proses tidak dikenal']);
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
