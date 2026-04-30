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

class ACCGantiUkuranController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Circular');
        return view('Circular.transaksi.ACCGantiUkuran', compact('access'));
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
            if (isset($item['id_pemeriksaan']) && !empty($item['id_pemeriksaan'])) {
                $adaProses = true;

                // Call the stored procedure for each item
                DB::connection('ConnCircular')
                    ->statement('EXEC SP_4451_MaintenancePemeriksaanGantiUkuran @Kode = ?, @user_input = ?, @id_pemeriksaan = ?', [9, $nomorUser, $item['id_pemeriksaan']]);
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
            $user_input = trim(Auth::user()->NomorUser);
            // dd($request->all());
            // $type_kain = $request->input('type_kain');
            $results = DB::connection('ConnCircular')
                ->select('EXEC SP_4451_MaintenancePemeriksaanGantiUkuran @Kode = ?, @tgl_awal = ?, @tgl_akhir = ?', [8, $tgl_awal, $tgl_akhir]);
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
                ];
            }
            // dd($response);
            return datatables($response)->make(true);

        } else if ($id == 'getPrint') {
            $id_pemeriksaan = $request->input('id_pemeriksaan');
            $user_input = trim(Auth::user()->NomorUser);
            // dd($request->all());
            // $type_kain = $request->input('type_kain');
            $results = DB::connection('ConnCircular')
                ->select('EXEC SP_4451_MaintenancePemeriksaanGantiUkuran @Kode = ?, @id_pemeriksaan = ?', [10, $id_pemeriksaan]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'tanggal' => Carbon::parse($row->tanggal)->format('m/d/Y'),
                    'tanggal_raw' => Carbon::parse($row->tanggal)->format('Y-m-d'),
                    'Type_Mesin' => trim($row->Type_Mesin) ?? "",
                    'Nama_mesin' => trim($row->Nama_mesin) ?? "",
                    'ukuran_asal' => $row->ukuran_asal ?? "",
                    'ukuran_baru' => $row->ukuran_baru ?? "",
                    'corak' => trim($row->corak) ?? "",
                    'berat_standart' => trim($row->berat_standart) ?? "",
                    'berat_realita' => trim($row->berat_realita) ?? "",
                    'benang_wa' => trim($row->benang_wa) ?? "",
                    'benang_we' => trim($row->benang_we) ?? "",
                    'jumlah_warp' => trim($row->jumlah_warp) ?? "",
                    'rpm' => trim($row->rpm) ?? "",
                    'perawatan_gu' => trim($row->perawatan_gu) ?? "",
                    'awal_ganti' => $row->awal_ganti
                        ? Carbon::parse($row->awal_ganti)->format('H:i')
                        : "",

                    'akhir_ganti' => $row->akhir_ganti
                        ? Carbon::parse($row->akhir_ganti)->format('H:i')
                        : "",
                    'ukuranGr_benar' => trim($row->ukuranGr_benar) ?? "",
                    'ukuranGr_salah' => trim($row->ukuranGr_salah) ?? "",
                    'posisi_gr' => trim($row->posisi_gr) ?? "",
                    'posisi_sa' => trim($row->posisi_sa) ?? "",
                    'tension_bs' => trim($row->tension_bs) ?? "",
                    'kondisi_pr' => trim($row->kondisi_pr) ?? "",
                    'kondisi_em' => trim($row->kondisi_em) ?? "",
                    'kondisi_ulr' => trim($row->kondisi_ulr) ?? "",
                    'kondisi_dl' => trim($row->kondisi_dl) ?? "",
                    'kondisi_sb' => trim($row->kondisi_sb) ?? "",
                    'kondisi_ot' => trim($row->kondisi_ot) ?? "",
                    'sensor_warp' => trim($row->sensor_warp) ?? "",
                    'sensor_weft' => trim($row->sensor_weft) ?? "",
                    'sensor_weft_end' => trim($row->sensor_weft_end) ?? "",
                    'posisi_expander' => trim($row->posisi_expander) ?? "",
                    'roda_expander' => trim($row->roda_expander) ?? "",
                    'settingWeft_benar' => trim($row->settingWeft_benar) ?? "",
                    'settingWeft_salah' => trim($row->settingWeft_salah) ?? "",
                    'hasil_belahan' => trim($row->hasil_belahan) ?? "",
                    'kondisi_jog' => trim($row->kondisi_jog) ?? "",
                    'tension_winder' => trim($row->tension_winder) ?? "",
                    'jalurBenang_rak' => trim($row->jalurBenang_rak) ?? "",
                    'jalurBenang_dl' => trim($row->jalurBenang_dl) ?? "",
                    'jalurBenang_wh' => trim($row->jalurBenang_wh) ?? "",
                    'kondisi_dropper' => trim($row->kondisi_dropper) ?? "",
                    'corak_js' => trim($row->corak_js) ?? "",
                    'setting_roll_wtc' => trim($row->setting_roll_wtc) ?? "",
                    'keterangan' => trim($row->keterangan) ?? "",
                    'NamaUser' => trim($row->NamaUser) ?? "",
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
