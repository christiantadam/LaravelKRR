<?php

namespace App\Http\Controllers\Guard\Pemeriksaan;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use DB;

class ViewPemeriksaanBarangController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Guard');
        return view('Guard.Pemeriksaan.ViewGudangPB', compact('access'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show(Request $request, $id)
    {
        if ($id == 'getData') {
            $tgl_awal = $request->input('tgl_awal');
            $tgl_akhir = $request->input('tgl_akhir');
            $user_input = trim(Auth::user()->NomorUser);
            // dd($request->all());
            // $type_kain = $request->input('type_kain');
            $results = DB::connection('ConnGuard')
                ->select('EXEC SP_4384_ViewGudangPB @Kode = ?, @tgl_awal = ?, @tgl_akhir = ?, @nomorUser = ?', [1, $tgl_awal, $tgl_akhir, $user_input]);
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
                    'NamaUserACC' => trim($row->NamaUserACC),
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
