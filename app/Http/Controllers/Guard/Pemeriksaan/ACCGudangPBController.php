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

class ACCGudangPBController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Guard');

        // dd($listTypeBarang);
        // $listNoPol = collect($listNoPol)
        //     ->whereIn('IdType_Mesin', [13, 17])
        //     ->values();
        return view('Guard.Pemeriksaan.ACCGudangPB', compact('access'));
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
            return response()->json(['error' => 'TIDAK DAPAT Proses Data, karena tidak ada Data!!!..']);
        }

        $adaProses = false;

        foreach ($rowDataArray as $item) {
            if (isset($item['idHeader']) && !empty($item['idHeader'])) {
                $adaProses = true;

                // Call the stored procedure for each item
                DB::connection('ConnGuard')
                    ->statement('EXEC SP_4451_ACCGudangPB @Kode = ?, @user_input = ?, @idHeader = ?', [2, $nomorUser, $item['idHeader']]);
            }
        }

        if ($adaProses) {
            return response()->json(['message' => 'Data berhasil diACC!!..']);
        } else {
            return response()->json(['error' => 'Pilih dulu datanya!!.. dengan memberi tanda centang']);
        }
    }

    public function show(Request $request, $id)
    {
        if ($id == 'getData') {
            $tgl_awal = $request->input('tgl_awal');
            $tgl_akhir = $request->input('tgl_akhir');
            // dd($request->all());
            // $type_kain = $request->input('type_kain');
            $results = DB::connection('ConnGuard')
                ->select('EXEC SP_4451_ACCGudangPB @Kode = ?, @tgl_awal = ?, @tgl_akhir = ?', [1, $tgl_awal, $tgl_akhir]);
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
                    'tujuan_kirim' => trim($row->tujuan_kirim) ?? "",
                    'sopir' => trim($row->sopir) ?? "",
                    'NamaUser' => trim($row->NamaUser),
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
