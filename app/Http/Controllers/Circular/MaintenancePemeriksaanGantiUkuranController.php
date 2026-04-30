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

class MaintenancePemeriksaanGantiUkuranController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Circular');
        $listTypeMesin = DB::connection('ConnCircular')
            ->select('EXEC Sp_List_TypeMesin @Kode = ?', [1]);
        $listBenangWeft = DB::connection('ConnCircular')
            ->select('EXEC Sp_List_Order @Kode = ?', [9]);
        $listBenangWarp = DB::connection('ConnPurchase')
            ->select('EXEC Sp_Mohon_Beli @MyType = ?, @MyValue = ?', [5, 1097]);
        $listTypeMesin = collect($listTypeMesin)
            ->whereIn('IdType_Mesin', [13, 17])
            ->values();
        return view('Circular.transaksi.MaintenancePemeriksaanGantiUkuran', compact('access', 'listTypeMesin', 'listBenangWeft', 'listBenangWarp'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $proses = $request->input('proses');
        $id_pemeriksaan = $request->input('id_pemeriksaan');
        $tanggal = $request->input('tanggal');
        $type_mesin = $request->input('type_mesin');
        $mesin = $request->input('mesin');
        $benang_wa = $request->input('benang_wa');
        $benang_we = $request->input('benang_we');
        $order = $request->input('order');
        $ukuran_asal = $request->input('ukuran_asal');
        $ukuran_baru = $request->input('ukuran_baru');
        $corak = $request->input('corak');
        $berat_standart = $request->input('berat_standart');
        $berat_realita = $request->input('berat_realita');
        $rpm = $request->input('rpm');
        $jumlah_warp = $request->input('jumlah_warp');
        $awal_ganti = $request->input('awal_ganti');
        $akhir_ganti = $request->input('akhir_ganti');
        $perawatan_gu = $request->input('perawatan_gu');
        $keterangan = $request->input('keterangan');
        $ukuranGr_benar = $request->input('ukuranGr_benar');
        $ukuranGr_salah = $request->input('ukuranGr_salah');
        $settingWeft_benar = $request->input('settingWeft_benar');
        $settingWeft_salah = $request->input('settingWeft_salah');
        $posisi_gr = $request->input('posisi_gr');
        $posisi_sa = $request->input('posisi_sa');
        $tension_bs = $request->input('tension_bs');
        $kondisi_pr = $request->input('kondisi_pr');
        $kondisi_em = $request->input('kondisi_em');
        $kondisi_ulr = $request->input('kondisi_ulr');
        $kondisi_dl = $request->input('kondisi_dl');
        $kondisi_sb = $request->input('kondisi_sb');
        $kondisi_ot = $request->input('kondisi_ot');
        $sensor_warp = $request->input('sensor_warp');
        $sensor_weft = $request->input('sensor_weft');
        $sensor_weft_end = $request->input('sensor_weft_end');
        $posisi_expander = $request->input('posisi_expander');
        $roda_expander = $request->input('roda_expander');
        $hasil_belahan = $request->input('hasil_belahan');
        $kondisi_jog = $request->input('kondisi_jog');
        $tension_winder = $request->input('tension_winder');
        $jalurBenang_rak = $request->input('jalurBenang_rak');
        $jalurBenang_dl = $request->input('jalurBenang_dl');
        $jalurBenang_wh = $request->input('jalurBenang_wh');
        $kondisi_dropper = $request->input('kondisi_dropper');
        $corak_js = $request->input('corak_js');
        $setting_roll_wtc = $request->input('setting_roll_wtc');
        $user_input = trim(Auth::user()->NomorUser);
        try {
            switch ($proses) {
                case 1:
                    // Simpan
                    DB::connection('ConnCircular')
                        ->statement(
                            'EXEC SP_4451_MaintenancePemeriksaanGantiUkuran
                            @kode = ?,
                            @tanggal = ?,
                            @order = ?,
                            @type_mesin = ?,
                            @mesin = ?,
                            @benang_wa = ?,
                            @benang_we = ?,
                            @ukuran_asal = ?,
                            @ukuran_baru = ?,
                            @corak = ?,
                            @berat_standart = ?,
                            @berat_realita = ?,
                            @rpm = ?,
                            @jumlah_warp = ?,
                            @awal_ganti = ?,
                            @akhir_ganti = ?,
                            @perawatan_gu = ?,
                            @keterangan = ?,
                            @ukuranGr_benar = ?,
                            @ukuranGr_salah = ?,
                            @posisi_gr = ?,
                            @posisi_sa = ?,
                            @tension_bs = ?,
                            @kondisi_pr = ?,
                            @kondisi_em = ?,
                            @kondisi_ulr = ?,
                            @kondisi_dl = ?,
                            @kondisi_sb = ?,
                            @kondisi_ot = ?,
                            @sensor_warp = ?,
                            @sensor_weft = ?,
                            @sensor_weft_end = ?,
                            @posisi_expander = ?,
                            @roda_expander = ?,
                            @settingWeft_benar = ?,
                            @settingWeft_salah = ?,
                            @hasil_belahan = ?,
                            @kondisi_jog = ?,
                            @tension_winder = ?,
                            @jalurBenang_rak = ?,
                            @jalurBenang_dl = ?,
                            @jalurBenang_wh = ?,
                            @kondisi_dropper = ?,
                            @corak_js = ?,
                            @setting_roll_wtc = ?,
                            @user_input = ?',
                            [
                                3,
                                $tanggal,
                                $order,
                                $type_mesin,
                                $mesin,
                                $benang_wa,
                                $benang_we,
                                $ukuran_asal,
                                $ukuran_baru,
                                $corak,
                                $berat_standart,
                                $berat_realita,
                                $rpm,
                                $jumlah_warp,
                                $awal_ganti,
                                $akhir_ganti,
                                $perawatan_gu,
                                $keterangan,
                                $ukuranGr_benar ?? null,
                                $ukuranGr_salah ?? null,
                                $posisi_gr,
                                $posisi_sa,
                                $tension_bs,
                                $kondisi_pr,
                                $kondisi_em,
                                $kondisi_ulr,
                                $kondisi_dl,
                                $kondisi_sb,
                                $kondisi_ot,
                                $sensor_warp,
                                $sensor_weft,
                                $sensor_weft_end,
                                $posisi_expander,
                                $roda_expander,
                                $settingWeft_benar ?? null,
                                $settingWeft_salah ?? null,
                                $hasil_belahan,
                                $kondisi_jog,
                                $tension_winder,
                                $jalurBenang_rak,
                                $jalurBenang_dl,
                                $jalurBenang_wh,
                                $kondisi_dropper,
                                $corak_js,
                                $setting_roll_wtc,
                                $user_input
                            ]
                        );
                    return response()->json(['message' => 'Data berhasil disimpan!']);

                case 2:
                    // Update
                    DB::connection('ConnCircular')
                        ->statement(
                            'EXEC SP_4451_MaintenancePemeriksaanGantiUkuran
                            @kode = ?,
                            @id_pemeriksaan = ?,
                            @tanggal = ?,
                            @order = ?,
                            @type_mesin = ?,
                            @mesin = ?,
                            @benang_wa = ?,
                            @benang_we = ?,
                            @ukuran_asal = ?,
                            @ukuran_baru = ?,
                            @corak = ?,
                            @berat_standart = ?,
                            @berat_realita = ?,
                            @rpm = ?,
                            @jumlah_warp = ?,
                            @awal_ganti = ?,
                            @akhir_ganti = ?,
                            @perawatan_gu = ?,
                            @keterangan = ?,
                            @ukuranGr_benar = ?,
                            @ukuranGr_salah = ?,
                            @posisi_gr = ?,
                            @posisi_sa = ?,
                            @tension_bs = ?,
                            @kondisi_pr = ?,
                            @kondisi_em = ?,
                            @kondisi_ulr = ?,
                            @kondisi_dl = ?,
                            @kondisi_sb = ?,
                            @kondisi_ot = ?,
                            @sensor_warp = ?,
                            @sensor_weft = ?,
                            @sensor_weft_end = ?,
                            @posisi_expander = ?,
                            @roda_expander = ?,
                            @settingWeft_benar = ?,
                            @settingWeft_salah = ?,
                            @hasil_belahan = ?,
                            @kondisi_jog = ?,
                            @tension_winder = ?,
                            @jalurBenang_rak = ?,
                            @jalurBenang_dl = ?,
                            @jalurBenang_wh = ?,
                            @kondisi_dropper = ?,
                            @corak_js = ?,
                            @setting_roll_wtc = ?,
                            @user_input = ?',
                            [
                                6,
                                $id_pemeriksaan,
                                $tanggal,
                                $order,
                                $type_mesin,
                                $mesin,
                                $benang_wa,
                                $benang_we,
                                $ukuran_asal,
                                $ukuran_baru,
                                $corak,
                                $berat_standart,
                                $berat_realita,
                                $rpm,
                                $jumlah_warp,
                                $awal_ganti,
                                $akhir_ganti,
                                $perawatan_gu,
                                $keterangan,
                                $ukuranGr_benar ?? null,
                                $ukuranGr_salah ?? null,
                                $posisi_gr,
                                $posisi_sa,
                                $tension_bs,
                                $kondisi_pr,
                                $kondisi_em,
                                $kondisi_ulr,
                                $kondisi_dl,
                                $kondisi_sb,
                                $kondisi_ot,
                                $sensor_warp,
                                $sensor_weft,
                                $sensor_weft_end,
                                $posisi_expander,
                                $roda_expander,
                                $settingWeft_benar ?? null,
                                $settingWeft_salah ?? null,
                                $hasil_belahan,
                                $kondisi_jog,
                                $tension_winder,
                                $jalurBenang_rak,
                                $jalurBenang_dl,
                                $jalurBenang_wh,
                                $kondisi_dropper,
                                $corak_js,
                                $setting_roll_wtc,
                                $user_input
                            ]
                        );

                    return response()->json(['message' => 'Data berhasil dikoreksi!']);

                case 3:
                    // Delete
                    DB::connection('ConnCircular')
                        ->statement(
                            'EXEC SP_4451_MaintenancePemeriksaanGantiUkuran @Kode = ?, @id_pemeriksaan = ?',
                            [7, $id_pemeriksaan]
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
        if ($id == 'getDataTypeBarang') {
            $idNama_mesin = $request->input('idNama_mesin');
            $idOrder = DB::connection('ConnCircular')
                ->select('EXEC SP_4451_MaintenancePemeriksaanGantiUkuran @kode = ?, @mesin = ?', [1, $idNama_mesin]);
            // dd($idOrder);
            $rpm = $idOrder[0]->Rpm;
            $idOrder = $idOrder[0]->Id_Order ?? null;
            $benang = DB::connection('ConnCircular')
                ->select('EXEC SP_4451_MaintenancePemeriksaanGantiUkuran @kode = ?, @order = ?', [2, $idOrder]);
            $kdBrg = DB::connection('ConnCircular')->table('T_Order')->where('Id_Order', $idOrder)->value('Kode_Barang');
            $vw = DB::connection('ConnCircular')->table('VW_Type_Barang')->where('Kd_Brg', $kdBrg)->first();
            // dd($vw);
            return response()->json([$vw, $benang, $idOrder, $rpm]);

        } else if ($id == 'getDataTable') {
            $tgl_awal = $request->input('tgl_awal');
            $tgl_akhir = $request->input('tgl_akhir');
            $results = DB::connection('ConnCircular')
                ->select('EXEC SP_4451_MaintenancePemeriksaanGantiUkuran @Kode = ?, @tgl_awal = ?, @tgl_akhir = ?', [4, $tgl_awal, $tgl_akhir]);
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

        } else if ($id == 'getDataKoreksi') {
            $id_pemeriksaan = $request->input('id_pemeriksaan');
            $results = DB::connection('ConnCircular')
                ->select('EXEC SP_4451_MaintenancePemeriksaanGantiUkuran @Kode = ?, @id_pemeriksaan = ?', [5, $id_pemeriksaan]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'id_pemeriksaan' => trim($row->id_pemeriksaan),
                    'tanggal' => Carbon::parse($row->tanggal)->format('Y-m-d'),
                    'idOrder' => trim($row->idOrder),
                    'type_mesin' => trim($row->type_mesin),
                    'mesin' => trim($row->mesin),
                    'benang_wa' => trim($row->benang_wa),
                    'benang_we' => trim($row->benang_we),
                    'ukuran_asal' => trim($row->ukuran_asal),
                    'ukuran_baru' => trim($row->ukuran_baru),
                    'corak' => trim($row->corak),
                    'berat_standart' => trim($row->berat_standart),
                    'berat_realita' => trim($row->berat_realita),
                    'rpm' => trim($row->rpm),
                    'jumlah_warp' => trim($row->jumlah_warp),
                    'awal_ganti' => trim($row->awal_ganti),
                    'akhir_ganti' => trim($row->akhir_ganti),
                    'perawatan_gu' => trim($row->perawatan_gu),
                    'keterangan' => trim($row->keterangan),
                    'ukuranGr_benar' => trim($row->ukuranGr_benar),
                    'ukuranGr_salah' => $row->ukuranGr_salah,
                    'posisi_gr' => trim($row->posisi_gr),
                    'posisi_sa' => trim($row->posisi_sa),
                    'tension_bs' => trim($row->tension_bs),
                    'kondisi_pr' => trim($row->kondisi_pr),
                    'kondisi_em' => trim($row->kondisi_em),
                    'kondisi_ulr' => trim($row->kondisi_ulr),
                    'kondisi_dl' => trim($row->kondisi_dl),
                    'kondisi_sb' => trim($row->kondisi_sb),
                    'kondisi_ot' => trim($row->kondisi_ot),
                    'sensor_warp' => trim($row->sensor_warp),
                    'sensor_weft' => trim($row->sensor_weft),
                    'sensor_weft_end' => trim($row->sensor_weft_end),
                    'posisi_expander' => trim($row->posisi_expander),
                    'roda_expander' => trim($row->roda_expander),
                    'settingWeft_benar' => trim($row->settingWeft_benar),
                    'settingWeft_salah' => $row->settingWeft_salah,
                    'hasil_belahan' => trim($row->hasil_belahan),
                    'kondisi_jog' => trim($row->kondisi_jog),
                    'tension_winder' => trim($row->tension_winder),
                    'jalurBenang_rak' => trim($row->jalurBenang_rak),
                    'jalurBenang_dl' => trim($row->jalurBenang_dl),
                    'jalurBenang_wh' => trim($row->jalurBenang_wh),
                    'kondisi_dropper' => trim($row->kondisi_dropper),
                    'corak_js' => trim($row->corak_js),
                    'setting_roll_wtc' => trim($row->setting_roll_wtc),
                    'user_input' => trim($row->user_input),
                    'time_input' => trim($row->time_input),
                    'user_koreksi' => $row->user_koreksi,
                    'koreksi_time' => $row->koreksi_time,
                    'user_acc' => $row->user_acc,
                    'time_acc' => $row->time_acc,
                ];
            }
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
