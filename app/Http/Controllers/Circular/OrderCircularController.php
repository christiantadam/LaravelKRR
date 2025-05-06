<?php

namespace App\Http\Controllers\Circular;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;
use Log;
use App\Http\Controllers\HakAksesController;

class OrderCircularController extends Controller
{
    public function index($form_name)
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Circular');
        $form_data = [];

        switch ($form_name) {
            case 'formOrderMaster':
                $form_data = ['listSubKategori' => $this->spOrder('SP_1273_CIR_LIST_SUBKATEGORI')];
                break;

            case 'formOrderAktif':
                $list_type_mesin = $this->spOrder('Sp_List_TypeMesin~1');
                usort($list_type_mesin, function ($a, $b) {
                    return intval($a->IdType_Mesin) - intval($b->IdType_Mesin);
                });

                $form_data = ['listTypeMesin' => $list_type_mesin];
                break;

            case 'formKegiatanMesin':
                $list_status_log = $this->spOrder('sp_List_Status_Log~1');
                usort($list_status_log, function ($a, $b) {
                    return strcmp($a->id_status, $b->id_status);
                });

                $list_type_mesin = $this->spOrder('Sp_List_TypeMesin~1');
                usort($list_type_mesin, function ($a, $b) {
                    return intval($a->IdType_Mesin) - intval($b->IdType_Mesin);
                });

                $form_data = [
                    'listStatusLog' => $list_status_log,
                    'listTypeMesin' => $list_type_mesin
                ];
                break;

            case 'formCounterMesin':
                $form_data = [
                    'listMesin' => $this->spOrder('Sp_List_Mesin~1'),
                ];
                break;

            default:
                return view('Circular.transaksi.' . $form_name, compact('access'));
        }

        return view('Circular.transaksi.' . $form_name, $form_data, compact('access'));
    }

    public function spOrder($sp_str, $sp_data = null)
    {
        if ($sp_data != null) {
            $sp_data = explode('~', $sp_data);
        } else
            $sp_data = [];

        if (strpos($sp_str, 'SP_4384_CIR_Check_GudangOrder1') !== false)
            $sp_param = '@XKode = ' . explode('~', $sp_str)[1];

        switch ($sp_str) {

            #region formOrderMaster

            case 'Sp_List_Order~2':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @IdOrder = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'Sp_List_Order~5':
            case 'Sp_List_Order~6':
            case 'Sp_List_Order~7':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @KdOrder = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'Sp_List_Order~8':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1];
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'Sp_Maint_Order~1':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @KodeBarang = ?, @RTglStart = ?, @RTglSelesai = ?, @RJumlahOrder = ?, @AWarp = ?, @AWeft = ?, @AKdBrgWarp = ?, @AKdBrgWeft = ?, @JmlBngStrip = ?, @Lokasi = ?, @Effisiensi = ?';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'Sp_Maint_Order~2':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @IdOrder = ?, @RTglStart = ?, @RTglSelesai = ?, @RJumlahOrder = ?, @AWarp = ?, @AWeft = ?, @AKdBrgWarp = ?, @AKdBrgWeft = ?, @JmlBngStrip = ?, @Lokasi = ?, @Effisiensi = ?';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'Sp_Maint_Order~3':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @IdOrder = ?';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'Sp_Maint_Benang~4':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @Id_Order = ?, @IDDetail = ?';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            #endregion

            #region formOrderGudang

            case 'SP_4384_CIR_Check_GudangOrder1~1':
                $sp_param .= ', @XIdOrder = ?, @XIdLokasi = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'GET_ORDER_DAN_BARANG_ASAL':
                return DB::connection('ConnCircular')->select(
                    "SELECT DISTINCT TOP 100 v.KD_BRG as Kode_Barang,
                        v.NAMA_BRG as Nama_Barang, v.Id_order as Id_Order
                    FROM VW_CIR_4384_Select_Torder_Ybarang AS v
                    WHERE v.id_lokasi <> 4
                    ORDER BY v.Id_order DESC",
                    []
                );

            case 'GET_PESANAN_DAN_BARANG_TUJUAN':
                return DB::connection('ConnCircular')->select(
                    "SELECT DISTINCT TOP 100 v.kodebarang as Kode_Barang,
                        v.nama_brg as Nama_Barang, v.IDSuratPesanan as Id_Sp
                    FROM VW_CIR_4384_SELECT_TDETAILPESANAN_YBARANG AS v
                    ORDER BY v.IDSuratPesanan DESC",
                    []
                );

            case 'SP_4384_CIR_Check_GudangOrder1~2':
                $sp_param .= ', @XKodeBrgAsal = ?, @XIdLokasi = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'SP_4384_CIR_Check_GudangOrder1~3':
                $sp_data[1] = str_replace("|", "/", $sp_data[1]);
                $sp_param .= ', @XIdOrder = ?, @XNo_Sp = ?, @XKodeBrgAsal = ?, @XKodeBrgTujuan = ?, @XRollOrder = ?, @XMeterOrder = ?, @XRollProduksi = ?, @XMeterProduksi = ?, @XTimeinput = ?, @XLokasi = ?';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'SP_4384_CIR_Check_GudangOrder1~4':
                $sp_data[1] = str_replace("|", "/", $sp_data[1]);
                $sp_param .= ', @XIdOrder = ?, @XNo_Sp = ?, @XRollOrder = ?, @XMeterOrder = ?, @XRollproduksi = ?, @XMeterproduksi = ?, @XStatus = ?, @XTimekoreksi = ?, ';
                if (count($sp_data) >= 9)
                    $sp_param .= '@XTimenonaktif = ?';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'SP_4384_CIR_Check_GudangOrder1~5':
                $sp_data[1] = str_replace("|", "/", $sp_data[1]);
                $sp_param .= ', @XIdOrder = ?, @XNo_Sp = ?';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'SP_4384_CIR_Check_GudangOrder1~6':
            case 'SP_4384_CIR_Check_GudangOrder1~10':
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'SP_4384_CIR_Check_GudangOrder1~7':
                $sp_param .= ', @XIdOrder = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'SP_4384_CIR_Check_GudangOrder1~8':
                $sp_data[1] = str_replace("|", "/", $sp_data[0]);
                $sp_param .= ', @XNo_Sp = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'SP_4384_CIR_Check_GudangOrder1~9':
                $sp_param .= ', @XKodeBrgTujuan = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            #endregion

            #region modalBenang

            case 'Sp_List_Benang~1':
            case 'Sp_List_Benang~2':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @Id_Order = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'Sp_Maint_Benang~1':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @Kd_Brg = ?, @Ket = ?, @jml = ?';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'Sp_Maint_Benang~2':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @Kd_Brg = ?, @IdDetail = ?, @jml = ?';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'Sp_Maint_Benang~3':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @IdDetail = ?';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'GET_ID_DETAIL_BENANG':
                return DB::connection('ConnCircular')->select(
                    'SELECT TOP 1 IdDetail FROM T_Benang_Strip ORDER BY IdDetail DESC'
                );

            case 'SP_1273_CIR_LIST_SUBKATEGORI':
                $sp_param = '';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            #endregion

            #region formOrderAktif

            case 'Sp_List_TypeMesin~1':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1];
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'Sp_List_Mesin~3':
            case 'Sp_List_Mesin~8':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @IdType_Mesin = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'Sp_List_Mesin~2':
            case 'Sp_List_Mesin~4':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @IdMesin = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'sp_List_log_Mesin~6':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @IdMesin = ?, @IdOrder = ?, @Shift = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'Sp_List_Order~13':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @IdOrder = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'Sp_List_Order~14':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1];
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'Sp_Maint_Mesin~4':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @IdMesin = ?, @IdOrder = ?, @MeterPanen = ?, @IdUser = 4384';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            #endregion

            #region formOrderStop

            case 'Sp_Akhir_Order':
                $sp_param = '@TglSelesai = ?, @IdOrder = ?';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            #endregion

            #region formKegiatanMesin

            case 'Sp_Transfer_Pegawai':
                try {
                    // Define your date parameters
                    $tanggal1 = $sp_data[0];
                    $tanggal2 = $sp_data[1];

                    // Start a transaction
                    DB::connection('ConnCircular')->beginTransaction();

                    // Step 1: Delete existing records from T_PEGAWAI
                    DB::connection('ConnCircular')->table('T_PEGAWAI')->delete();

                    // Step 2: Fetch data from the view
                    $data = DB::connection('ConnCircular')
                        ->table('PAYROLL.dbo.VW_PRG_1273_CIR_SHIFT_PEGAWAI')
                        ->select('Tanggal', 'Nama_Div', 'Kd_Pegawai', 'nama_peg', 'shift')
                        ->whereBetween('Tanggal', [$tanggal1, $tanggal2])
                        ->orderBy('Tanggal')
                        ->orderBy('Kd_Pegawai')
                        ->get();

                    // Step 3: Insert data into T_PEGAWAI and count the number of affected rows
                    $affectedRows = 0;
                    foreach ($data as $row) {
                        $inserted = DB::connection('ConnCircular')->table('T_PEGAWAI')->insert([
                            'Tanggal' => $row->Tanggal,
                            'Nama_Div' => $row->Nama_Div,
                            'Kd_Pegawai' => $row->Kd_Pegawai,
                            'nama_peg' => $row->nama_peg,
                            'shift' => $row->shift
                        ]);
                        if ($inserted) {
                            $affectedRows++;
                        }
                    }

                    // Commit the transaction
                    DB::connection('ConnCircular')->commit();

                    // Return the number of affected rows
                    return $affectedRows;
                } catch (QueryException $e) {
                    // Rollback the transaction in case of an error
                    DB::connection('ConnCircular')->rollBack();

                    // Log the error
                    Log::error('Data transfer failed: ' . $e->getMessage());

                    // Return an error message or perform other error handling actions
                    return 'Data transfer failed: ' . $e->getMessage();
                }

            case 'sp_List_Log_Mesin_PerLog':
                $query = "
                    SELECT KARYAWAN.nama_peg,
                        dbo.VW_Log_Mesin_Blm_Selesai.Id_Log,
                        dbo.VW_Log_Mesin_Blm_Selesai.Tgl_Log,
                        dbo.VW_Log_Mesin_Blm_Selesai.Shift,
                        dbo.VW_Log_Mesin_Blm_Selesai.Id_mesin,
                        dbo.VW_Log_Mesin_Blm_Selesai.Id_order,
                        dbo.VW_Log_Mesin_Blm_Selesai.Id_karyawan,
                        dbo.VW_Log_Mesin_Blm_Selesai.Counter_mesin_awal,
                        dbo.VW_Log_Mesin_Blm_Selesai.Counter_mesin_akhir,
                        dbo.VW_Log_Mesin_Blm_Selesai.Time_Catat,
                        dbo.VW_Log_Mesin_Blm_Selesai.A_rpm,
                        dbo.VW_Log_Mesin_Blm_Selesai.A_n_shutle,
                        dbo.VW_Log_Mesin_Blm_Selesai.Afalan_Wa,
                        dbo.VW_Log_Mesin_Blm_Selesai.Afalan_We,
                        dbo.VW_Log_Mesin_Blm_Selesai.Status_log,
                        dbo.VW_Log_Mesin_Blm_Selesai.Kalkulasi_Meter,
                        dbo.VW_Log_Mesin_Blm_Selesai.Kalkulasi_Premi,
                        dbo.VW_Log_Mesin_Blm_Selesai.Id_User,
                        dbo.VW_Log_Mesin_Blm_Selesai.Kode_barang,
                        dbo.VW_Log_Mesin_Blm_Selesai.NAMA_BRG,
                        dbo.VW_Log_Mesin_Blm_Selesai.Nama_mesin,
                        dbo.VW_Log_Mesin_Blm_Selesai.IdType_Mesin,
                        dbo.VW_Log_Mesin_Blm_Selesai.Type_Mesin,
                        dbo.VW_Log_Mesin_Blm_Selesai.Keterangan,
                        dbo.VW_Log_Mesin_Blm_Selesai.Awal_jam_kerja,
                        dbo.VW_Log_Mesin_Blm_Selesai.Kalkulasi_Meter,
                        dbo.VW_Log_Mesin_Blm_Selesai.Akhir_jam_kerja,
                        dbo.VW_Log_Mesin_Blm_Selesai.MeterManual
                    FROM T_Pegawai KARYAWAN
                    INNER JOIN dbo.VW_Log_Mesin_Blm_Selesai
                    ON KARYAWAN.Kd_pegawai = dbo.VW_Log_Mesin_Blm_Selesai.Id_karyawan
                    WHERE dbo.VW_Log_Mesin_Blm_Selesai.id_log = ?
                ";

                $logDetails = DB::connection('ConnCircular')->select($query, $sp_data);
                return $logDetails;

            case 'sp_List_Pegawai~1':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @Shift = ?, @Tanggal = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'sp_List_Status_Log~1':
            case 'Sp_List_PLC_Mesin~1';
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1];
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'Sp_Check_Order':
                $sp_param = '@IdOrder = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'SP_Cek_Pegawai':
                $sp_param = '@tanggal = ?, @Id_Mesin = ?, @Id_Order = ?, @Shift = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'sp_Insert_Log_Mesin':
                $sp_data[10] = str_replace('_', ':', $sp_data[10]); // @jam1
                $sp_data[11] = str_replace('_', ':', $sp_data[11]); // @jam2

                $sp_param = '@tgl_log = ?, @id_mesin = ?, @shift = ?, @id_order = ?, @id_karyawan = ?, @Counter_Mesin_awal = ?, @Counter_Mesin_Akhir = ?, @A_Rpm = ?, @A_N_Shutle = ?, @status_log = ?, @id_user = 4384, @jam1 = ?, @jam2 = ?, @MeterManual = ?';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'sp_Update_Log_Mesin':
                $sp_data[11] = str_replace('_', ':', $sp_data[11]); // @jam1
                $sp_data[12] = str_replace('_', ':', $sp_data[12]); // @jam2

                $sp_param = '@Id_Log = ?, @tgl_log = ?, @id_mesin = ?, @shift = ?, @id_order = ?, @id_karyawan = ?, @Counter_Mesin_awal = ?, @Counter_Mesin_Akhir = ?, @A_Rpm = ?, @A_N_Shutle = ?, @status_log = ?, @id_user = 4384, @jam1 = ?, @jam2 = ?, @MeterManual = ?, @Kalkulasi_Meter = ?';
                if ($sp_data[14] == 'null')
                    $sp_param = '@Id_Log = ?, @tgl_log = ?, @id_mesin = ?, @shift = ?, @id_order = ?, @id_karyawan = ?, @Counter_Mesin_awal = ?, @Counter_Mesin_Akhir = ?, @A_Rpm = ?, @A_N_Shutle = ?, @status_log = ?, @id_user = 4384, @jam1 = ?, @jam2 = ?, @MeterManual = ?';

                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'sp_Delete_Log_Mesin':
                $sp_param = '@Id_Log = ?, @UserDlt = 4384';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'sp_Delete_Log_Mesin~ERROR':
                $sp_param = '@Id_Log = ?, @UserDlt = 4384';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'Sp_4JAM_CHECK':
                $sp_param = '@IdMesin = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            #endregion

            #region formCounterMesin

            case 'Sp_List_Mesin~1':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1];
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'Sp_Maint_Mesin~5':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @IdMesin = ?, @CounterPagi = ?, @CounterSore = ?, @Countermalam = ?, @IdUser = 4384';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            #endregion

            default:
                break;
        }
    }

    public function prosesOrder(Request $request)
    {
        $str_info = '';

        $proses = $request->input('mode_proses');
        $sp_data = $request->input('form_data');
        $sp_str = $request->input('form_sp');

        if ($request->input('form_sp2') == 'Sp_Maint_Benang') {
            $data_benang = explode('~', $request->input('form_data2'));
            $this->prosesBenang($data_benang[0], $data_benang[1]);
        }

        $row_info = $this->spOrder($sp_str . '~' . $proses, $sp_data);
        // dd($row_info);

        if ($proses === null)
            $row_info = $this->spOrder($sp_str, $sp_data);

        if (is_int($row_info) && $row_info > 0) {
            $koreksi = 2;
            $hapus = 3;

            if ($sp_str == 'SP_4384_CIR_Check_GudangOrder1') {
                $koreksi = 4;
                $hapus = 5;
            }

            switch ($proses) {
                case $koreksi:
                    $str_info .= 'Data Berhasil Dikoreksi!';
                    break;

                case $hapus:
                    $str_info .= 'Data Berhasil Dihapus!';
                    break;

                default:
                    $str_info .= 'Data Berhasil Disimpan!';
                    break;
            }

            return redirect()->back()->with(
                'success',
                $str_info
            );
        } else {
            return redirect()->back()->with('error', $row_info);
        }
    }

    private function executeSP($action, $sp_str, $sp_param, $sp_data, $conn)
    {
        if ($action == 'statement') {
            try {
                return DB::connection($conn)->affectingStatement(
                    'exec ' . $sp_str . ' ' . $sp_param,
                    $sp_data
                );
            } catch (QueryException $e) {
                if ($e->getCode() == '23000' && $sp_str == 'SP_4384_CIR_Check_GudangOrder1') {
                    return 'Data order gudang sudah ada. <br>Silahkan lihat pada bagian Koreksi.';
                } else if ($sp_str == 'Sp_Transfer_Pegawai') {
                    return 'error';
                } else if ($e->getCode() == '23000' && $sp_str == 'Sp_Maint_Order') {
                    return 'Data order telah dikerjakan oleh mesin dan tercatat dalam sistem. Data tidak dapat dihapus.';
                } else if ($e->getCode() == '23000') {
                    return 'Data telah terhubung dengan data lain. Data tidak dapat dihapus.';
                } else {
                    dd(DB::connection($conn)->select(
                        'exec ' . $sp_str . ' ' . $sp_param,
                        $sp_data
                    ));
                }
            }
        } else if ($action == 'select') {
            try {
                return DB::connection($conn)->select(
                    'exec ' . $sp_str . ' ' . $sp_param,
                    $sp_data
                );
            } catch (QueryException $e) {
                dd(DB::connection($conn)->select(
                    'exec ' . $sp_str . ' ' . $sp_param,
                    $sp_data
                ));
            }
        }
    }

    private function prosesBenang($id_order, $id_detail)
    {
        $list_order = explode(',', $id_detail);
        for ($i = 0; $i < count($list_order); $i++) {
            $affected_rows = $this->spOrder('Sp_Maint_Benang~4', $id_order . '~' . $list_order[$i]);
            if ($affected_rows <= 0) {
                return redirect()->back()->with(
                    'error',
                    'Terdapat kendala dalam memproses data. <br>Mohon segera hubungi EDP.'
                );
            }
        }
    }

    #region Select2 Pagination Form Order Meisn Aktif
    public function getMesinAktif(Request $request)
    {
        $search_item = $request->input('searchItem', '');
        $id_type_mesin = $request->input('idTypeMesin');

        // Sp_List_Mesin | @Kode = 3
        $data = DB::connection('ConnCircular')->select(
            "SELECT dbo.T_Mesin.*
            FROM dbo.T_Mesin
            WHERE (dbo.T_Mesin.Active = 'Y')
                AND dbo.T_Mesin.idtype_mesin = ?
                AND (Id_mesin LIKE ? OR Nama_mesin LIKE ?)
            ORDER BY nama_mesin",
            [$id_type_mesin, "%$search_item%", "%$search_item%"]
        );

        // Sebelumnya INNER JOIN dengan T_Order, sehingga jika mesin belum pernah mengerjakan order tidak akan tampil.
        // Perubahan dilakukan agar formOrderMesinAktif bisa jalan untuk mesin yang masih kosong

        return $this->createPaginator($data, $request->url(), $request->query(), $request->query('page', 1));
    }

    public function getOrderBaru(Request $request)
    {
        $search_item = $request->input('searchItem', '');

        // Sp_List_Order | @Kode = 14
        $data = DB::connection('ConnCircular')->select(
            "SELECT TOP 100 PERCENT dbo.T_Order.*, PURCHASE.dbo.Y_BARANG.NAMA_BRG AS Nama_Barang,
                Y_BARANG_1.NAMA_BRG AS BenangWarp, Y_BARANG_2.NAMA_BRG AS BenangWeft
            FROM dbo.T_Order INNER JOIN
                PURCHASE.dbo.Y_BARANG ON dbo.T_Order.Kode_barang = PURCHASE.dbo.Y_BARANG.KD_BRG INNER JOIN
                PURCHASE.dbo.Y_BARANG Y_BARANG_1 ON dbo.T_Order.A_kodebarang_warp = Y_BARANG_1.KD_BRG INNER JOIN
                PURCHASE.dbo.Y_BARANG Y_BARANG_2 ON dbo.T_Order.A_kodebarang_weft = Y_BARANG_2.KD_BRG
            WHERE (dbo.T_Order.A_tgl_Akhir IS NULL)
                AND dbo.T_Order.Lokasi LIKE 'Tropodo'
                AND (Id_order LIKE ? OR PURCHASE.dbo.Y_BARANG.NAMA_BRG LIKE ?)
            ORDER BY dbo.T_Order.Id_Order",
            ["%$search_item%", "%$search_item%"]
        );

        return $this->createPaginator($data, $request->url(), $request->query(), $request->query('page', 1));
    }
    #endregion

    #region Select2 Pagination Form Order Master
    public function getIdOrder(Request $request)
    {
        $search_item = $request->input('searchItem', '');

        // Sp_List_Order | @Kode = 3
        $data = DB::connection('ConnCircular')->select(
            "SELECT dbo.T_Order.*,
            PURCHASE.dbo.Y_BARANG.NAMA_BRG AS Nama_Barang,
            Y_BARANG_1.NAMA_BRG AS BenangWarp,
            Y_BARANG_2.NAMA_BRG AS BenangWeft
            FROM dbo.T_Order INNER JOIN
                PURCHASE.dbo.Y_BARANG ON dbo.T_Order.Kode_barang = PURCHASE.dbo.Y_BARANG.KD_BRG
                INNER JOIN PURCHASE.dbo.Y_BARANG Y_BARANG_1 ON dbo.T_Order.A_kodebarang_warp = Y_BARANG_1.KD_BRG
                INNER JOIN PURCHASE.dbo.Y_BARANG Y_BARANG_2 ON dbo.T_Order.A_kodebarang_weft = Y_BARANG_2.KD_BRG
            WHERE dbo.T_Order.A_tgl_Akhir IS NULL
                AND (dbo.T_Order.Id_order LIKE ? OR PURCHASE.dbo.Y_BARANG.NAMA_BRG LIKE ?)
            ORDER BY dbo.T_Order.Id_Order DESC",
            ["%$search_item%", "%$search_item%"]
        );

        return $this->createPaginator($data, $request->url(), $request->query(), $request->query('page', 1));
    }

    public function getBarang(Request $request)
    {
        $search_item = $request->input('searchItem', '');

        // Sp_Mohon_Beli | @MyTpe = 7
        $data = DB::connection('ConnPurchase')->select(
            "SELECT KD_BRG, NAMA_BRG, D_TEK0, D_TEK1, D_TEK1 + ' / ' + NAMA_BRG AS NmBrg
            FROM dbo.Y_BARANG
            WHERE (NO_SUB_KATEGORI = '1097') AND (NOT (NAMA_BRG LIKE 'Sama%'))
                AND (NOT (NAMA_BRG LIKE 'LAMT-%')) AND (NOT (NAMA_BRG LIKE 'RTR-%'))
                AND (ASCII(LEFT(NAMA_BRG, 1)) <= 87) AND (ASCII(LEFT(NAMA_BRG, 1)) >= 65)
                AND D_TEK0 IS NOT NULL
                AND (KD_BRG LIKE ? OR NAMA_BRG LIKE ?)
            ORDER BY D_TEK1, KD_BRG",
            ["%$search_item%", "%$search_item%"]
        );

        return $this->createPaginator($data, $request->url(), $request->query(), $request->query('page', 1));
    }

    public function getBenangWarp(Request $request)
    {
        $search_item = $request->input('searchItem', '');

        // Sp_List_Order | @Kode = 9
        $data = DB::connection('ConnCircular')->select(
            "SELECT TOP 100 PERCENT KD_BRG, NAMA_BRG
            FROM dbo.vw_type_benang
            WHERE (NAMA_BRG <> '-')
                AND (KD_BRG LIKE ? OR NAMA_BRG LIKE ?)
            ORDER BY NAMA_BRG",
            ["%$search_item%", "%$search_item%"]
        );

        return $this->createPaginator($data, $request->url(), $request->query(), $request->query('page', 1));
    }

    public function getBenangStrip(Request $request)
    {
        $search_item = $request->input('searchItem', '');
        $sub_kategori = $request->input('subKategori');

        // Sp_Mohon_Beli | @MyType = 5
        $data = DB::connection('ConnPurchase')->select(
            "SELECT NAMA_BRG,KD_BRG
            FROM Y_BARANG
            WHERE NO_SUB_KATEGORI = ?
                AND (NAMA_BRG <> '-'   AND NAMA_BRG NOT LIKE 'Tidak%')
                AND (KD_BRG LIKE ? OR NAMA_BRG LIKE ?)
            ORDER BY NAMA_BRG",
            [$sub_kategori, "%$search_item%", "%$search_item%"]
        );

        return $this->createPaginator($data, $request->url(), $request->query(), $request->query('page', 1));
    }
    #endregion

    #region Select2 Pagination Form Kegiatan Mesin
    public function getMesinOrder(Request $request)
    {
        $search_item = $request->input('searchItem', '');
        $id_type_mesin = $request->input('idTypeMesin');

        // Sp_List_Mesin | @Kode = 3
        $data = DB::connection('ConnCircular')->select(
            "SELECT dbo.T_Mesin.*
            FROM dbo.T_Mesin
            INNER JOIN dbo.T_Order ON dbo.T_Mesin.Id_Order = dbo.T_Order.Id_order
            WHERE dbo.T_Mesin.Active = 'Y'
                AND dbo.T_Mesin.idtype_mesin = ?
                AND (dbo.T_Mesin.Id_mesin LIKE ? OR dbo.T_Mesin.Nama_mesin LIKE ?)
            ORDER BY  nama_mesin",
            [$id_type_mesin, "%$search_item%", "%$search_item%"]
        );

        return $this->createPaginator($data, $request->url(), $request->query(), $request->query('page', 1));
    }

    public function getDaftarPegawai(Request $request)
    {
        $search_item = $request->input('searchItem', '');
        $shift = $request->input('shift');
        $tanggal = $request->input('tanggal');
        $shifts = [
            'P' => [0, 1, 7, 10, 4, 9, 14],
            'S' => [2, 8, 13, 5, 15],
            'M' => [11, 3, 6, 16, 19]
        ];

        $data = array();
        $shift_conditions = isset($shifts[$shift]) ? $shifts[$shift] : null;
        if ($shift_conditions) {
            $placeholders = implode(',', array_fill(0, count($shift_conditions), '?'));
            $sql = "SELECT T_PEGAWAI.Nama_Div, T_PEGAWAI.nama_peg, T_PEGAWAI.shift, T_PEGAWAI.Kd_pegawai
                    FROM T_PEGAWAI
                    WHERE T_PEGAWAI.tanggal = ?
                        AND T_PEGAWAI.Shift IN ($placeholders)
                        AND (T_PEGAWAI.Kd_pegawai LIKE ? OR T_PEGAWAI.nama_peg LIKE ?)
                    ORDER BY T_PEGAWAI.nama_peg";
            $params = array_merge([$tanggal], $shift_conditions, ["%$search_item%", "%$search_item%"]);

            $data = DB::connection('ConnCircular')->select($sql, $params);
        }

        return $this->createPaginator($data, $request->url(), $request->query(), $request->query('page', 1));
    }

    public function getLogMesin(Request $request)
    {
        $search_item = $request->input('searchItem', '');
        $tanggal = $request->input('tanggal');

        // SP_1273_CIR_LIST_ALL_LOG_MESIN
        $data = DB::connection('ConnCircular')->select(
            "SELECT TOP (100) PERCENT dbo.T_Log_Mesin.Id_Log,
                CONVERT(char(10), dbo.T_Log_Mesin.Tgl_Log, 101) + ' - ' + dbo.T_Mesin.Nama_mesin + ' - ' + PURCHASE.dbo.Y_BARANG.NAMA_BRG AS nama
            FROM dbo.T_Mesin RIGHT OUTER JOIN
                dbo.T_Log_Mesin ON dbo.T_Mesin.Id_mesin = dbo.T_Log_Mesin.Id_mesin LEFT OUTER JOIN
                dbo.T_Order ON dbo.T_Log_Mesin.Id_order = dbo.T_Order.Id_order LEFT OUTER JOIN
                PURCHASE.dbo.Y_BARANG ON dbo.T_Order.Kode_barang = PURCHASE.dbo.Y_BARANG.KD_BRG
            WHERE (dbo.T_Log_Mesin.Kalkulasi_Premi IS NULL)
                AND (dbo.T_Log_Mesin.Kalkulasi_Meter IS NULL)
                AND dbo.T_Log_Mesin.Tgl_Log = ?
                AND (dbo.T_Log_Mesin.Id_Log LIKE ?
                    OR CONVERT(char(10), dbo.T_Log_Mesin.Tgl_Log, 101) + ' - ' + dbo.T_Mesin.Nama_mesin + ' - ' + PURCHASE.dbo.Y_BARANG.NAMA_BRG LIKE ?)
            ORDER BY dbo.T_Log_Mesin.Tgl_Log DESC, dbo.T_Mesin.Nama_mesin",
            [$tanggal, "%$search_item%", "%$search_item%"]
        );

        return $this->createPaginator($data, $request->url(), $request->query(), $request->query('page', 1));
    }
    #endregion

    private function createPaginator($data, $url, $query, $page)
    {
        $perPage = 10; // Number of items per page
        $total = count($data); // Total number of items
        $offset = ($page - 1) * $perPage; // Calculate the offset
        $paginator = new LengthAwarePaginator(
            array_slice($data, $offset, $perPage),
            $total,
            $perPage,
            $page,
            ['path' => $url, 'query' => $query]
        );

        // array slice untuk mengambil data berdaarkan jumlah awal dan akhir dari data

        return $paginator;
    }
    #endregion

    #region DataTables Pagination
    public function getOrderBarang(Request $request)
    {
        /**
         * SELECT   T_Mesin.*, T_Order.*, PURCHASE.dbo.Y_BARANG.NAMA_BRG AS Nama_Barang,
         *          Y_BARANG_1.NAMA_BRG AS BenangWarp, Y_BARANG_2.NAMA_BRG AS BenangWeft,
         *          PURCHASE.dbo.Y_BARANG.D_TEK0 AS D_Tek0
         * FROM     T_Mesin INNER JOIN
         *          T_Order ON T_Mesin.Id_Order = T_Order.Id_order INNER JOIN
         *          PURCHASE.dbo.Y_BARANG ON T_Order.Kode_barang = PURCHASE.dbo.Y_BARANG.KD_BRG INNER JOIN
         *          PURCHASE.dbo.Y_BARANG Y_BARANG_1 ON T_Order.A_kodebarang_warp = Y_BARANG_1.KD_BRG INNER JOIN
         *          PURCHASE.dbo.Y_BARANG Y_BARANG_2 ON T_Order.A_kodebarang_weft = Y_BARANG_2.KD_BRG
         * WHERE    (T_Mesin.Active = 'Y') AND (T_Mesin.IdType_mesin = @IdType_Mesin)
         * ORDER BY T_Mesin.Nama_mesin
         */

        $columns = array(
            0 => 'Id_mesin',
            1 => 'Nama_mesin',
            2 => 'Id_Order',
            3 => 'Nama_Barang',
            4 => 'MeterPanen'
        );

        $totalData = DB::connection('ConnCircular')
            ->table('T_Mesin')
            ->join('T_Order', 'T_Mesin.Id_Order', '=', 'T_Order.Id_order')
            ->join('PURCHASE.dbo.Y_BARANG', 'T_Order.Kode_barang', '=', 'PURCHASE.dbo.Y_BARANG.KD_BRG')
            ->join('PURCHASE.dbo.Y_BARANG AS Y_BARANG_1', 'T_Order.A_kodebarang_warp', '=', 'Y_BARANG_1.KD_BRG')
            ->join('PURCHASE.dbo.Y_BARANG AS Y_BARANG_2', 'T_Order.A_kodebarang_weft', '=', 'Y_BARANG_2.KD_BRG')
            ->where('T_Mesin.Active', 'Y')
            ->where('T_Mesin.IdType_mesin', $request->input('idTypeMesin'))
            ->count();

        $totalFiltered = $totalData;

        $idTypeMesin = $request->input('idTypeMesin');
        $limit = $request->input('length');
        $start = $request->input('start');
        $orderColumnIndex = $request->input('order.0.column');
        $order = $columns[$orderColumnIndex];
        $dir = $request->input('order.0.dir');

        if (empty($request->input('search.value'))) {
            $sp = DB::connection('ConnCircular')
                ->table('T_Mesin')
                ->join('T_Order', 'T_Mesin.Id_Order', '=', 'T_Order.Id_order')
                ->join('PURCHASE.dbo.Y_BARANG', 'T_Order.Kode_barang', '=', 'PURCHASE.dbo.Y_BARANG.KD_BRG')
                ->join('PURCHASE.dbo.Y_BARANG AS Y_BARANG_1', 'T_Order.A_kodebarang_warp', '=', 'Y_BARANG_1.KD_BRG')
                ->join('PURCHASE.dbo.Y_BARANG AS Y_BARANG_2', 'T_Order.A_kodebarang_weft', '=', 'Y_BARANG_2.KD_BRG')
                ->select(
                    'T_Mesin.Id_mesin',
                    'T_Mesin.Nama_mesin',
                    'T_Order.Id_order',
                    'PURCHASE.dbo.Y_BARANG.NAMA_BRG AS Nama_Barang',
                    'MeterPanen'
                )
                ->where('T_Mesin.Active', 'Y')
                ->where('T_Mesin.IdType_mesin', $idTypeMesin)
                ->offset($start)
                ->limit($limit)
                ->orderBy($order, $dir)
                ->get();
        } else {
            $search = $request->input('search.value');
            $sp = DB::connection('ConnCircular')
                ->table('T_Mesin')
                ->join('T_Order', 'T_Mesin.Id_Order', '=', 'T_Order.Id_order')
                ->join('PURCHASE.dbo.Y_BARANG', 'T_Order.Kode_barang', '=', 'PURCHASE.dbo.Y_BARANG.KD_BRG')
                ->join('PURCHASE.dbo.Y_BARANG AS Y_BARANG_1', 'T_Order.A_kodebarang_warp', '=', 'Y_BARANG_1.KD_BRG')
                ->join('PURCHASE.dbo.Y_BARANG AS Y_BARANG_2', 'T_Order.A_kodebarang_weft', '=', 'Y_BARANG_2.KD_BRG')
                ->select(
                    'T_Mesin.Id_mesin',
                    'T_Mesin.Nama_mesin',
                    'T_Order.Id_order',
                    'PURCHASE.dbo.Y_BARANG.NAMA_BRG AS Nama_Barang',
                    'MeterPanen'
                )
                ->where('T_Mesin.Active', 'Y')
                ->where('T_Mesin.IdType_mesin', $idTypeMesin)
                ->where(function ($query) use ($search, $columns) {
                    foreach ($columns as $column) {
                        $query->orWhere($column, 'LIKE', "%{$search}%");
                    }
                })
                ->offset($start)
                ->limit($limit)
                ->orderBy($order, $dir)
                ->get();

            $totalFiltered = DB::connection('ConnCircular')
                ->table('T_Mesin')
                ->join('T_Order', 'T_Mesin.Id_Order', '=', 'T_Order.Id_order')
                ->join('PURCHASE.dbo.Y_BARANG', 'T_Order.Kode_barang', '=', 'PURCHASE.dbo.Y_BARANG.KD_BRG')
                ->join('PURCHASE.dbo.Y_BARANG AS Y_BARANG_1', 'T_Order.A_kodebarang_warp', '=', 'Y_BARANG_1.KD_BRG')
                ->join('PURCHASE.dbo.Y_BARANG AS Y_BARANG_2', 'T_Order.A_kodebarang_weft', '=', 'Y_BARANG_2.KD_BRG')
                ->where('T_Mesin.Active', 'Y')
                ->where('T_Mesin.IdType_mesin', $idTypeMesin)
                ->where(function ($query) use ($search, $columns) {
                    foreach ($columns as $column) {
                        $query->orWhere($column, 'LIKE', "%{$search}%");
                    }
                })
                ->count();
        }

        $data = array();
        if (!empty($sp)) {
            foreach ($sp as $index => $datasp) {
                $nestedData['NomorKu'] = $index;

                $nestedData['IdMesin'] = $datasp->Id_mesin;
                $nestedData['NamaMesin'] = $datasp->Nama_mesin;
                $nestedData['IdOrder'] = $datasp->Id_order;
                $nestedData['NamaBarang'] = $datasp->Nama_Barang;
                $nestedData['MeterPanen'] = $datasp->MeterPanen;

                $data[] = $nestedData;
            }
        }

        $json_data = array(
            "draw" => intval($request->input('draw')),
            "recordsTotal" => intval($totalData),
            "recordsFiltered" => intval($totalFiltered),
            "data" => $data
        );

        echo json_encode($json_data);
    }

    public function get_Mesin_Order_Barang(Request $request)
    {
        /**
         * SELECT   T_Mesin.*, T_Order.*, PURCHASE.dbo.Y_BARANG.NAMA_BRG AS Nama_Barang
         *          PURCHASE.dbo.Y_BARANG.D_TEK0 AS D_Tek0
         * FROM     T_Mesin INNER JOIN
         *          T_Order ON T_Mesin.Id_Order = T_Order.Id_order INNER JOIN
         *          PURCHASE.dbo.Y_BARANG ON T_Order.Kode_barang = PURCHASE.dbo.Y_BARANG.KD_BRG
         * WHERE    (T_Mesin.Active = 'Y') AND (T_Mesin.IdType_mesin = @IdType_Mesin)
         * ORDER BY T_Mesin.Nama_mesin
         */

        $columns = array(
            0 => 'Id_mesin',
            1 => 'Nama_mesin',
            2 => 'Id_Order',
            3 => 'Nama_Barang',
            4 => 'MeterPanen'
        );

        $totalData = DB::connection('ConnCircular')
            ->table('T_Mesin')
            ->join('T_Order', 'T_Mesin.Id_Order', '=', 'T_Order.Id_order')
            ->join('PURCHASE.dbo.Y_BARANG', 'T_Order.Kode_barang', '=', 'PURCHASE.dbo.Y_BARANG.KD_BRG')
            ->where('T_Mesin.Active', 'Y')
            ->where('T_Mesin.IdType_mesin', $request->input('idTypeMesin'))
            ->count();

        $totalFiltered = $totalData;

        $idTypeMesin = $request->input('idTypeMesin');
        $limit = $request->input('length');
        $start = $request->input('start');
        $orderColumnIndex = $request->input('order.0.column');
        $order = $columns[$orderColumnIndex];
        $dir = $request->input('order.0.dir');

        if (empty($request->input('search.value'))) {
            $sp = DB::connection('ConnCircular')
                ->table('T_Mesin')
                ->join('T_Order', 'T_Mesin.Id_Order', '=', 'T_Order.Id_order')
                ->join('PURCHASE.dbo.Y_BARANG', 'T_Order.Kode_barang', '=', 'PURCHASE.dbo.Y_BARANG.KD_BRG')
                ->select(
                    'T_Mesin.Id_mesin',
                    'T_Mesin.Nama_mesin',
                    'T_Order.Id_order',
                    'PURCHASE.dbo.Y_BARANG.NAMA_BRG AS Nama_Barang',
                    'MeterPanen'
                )
                ->where('T_Mesin.Active', 'Y')
                ->where('T_Mesin.IdType_mesin', $idTypeMesin)
                ->offset($start)
                ->limit($limit)
                ->orderBy($order, $dir)
                ->get();
        } else {
            $search = $request->input('search.value');
            $sp = DB::connection('ConnCircular')
                ->table('T_Mesin')
                ->join('T_Order', 'T_Mesin.Id_Order', '=', 'T_Order.Id_order')
                ->join('PURCHASE.dbo.Y_BARANG', 'T_Order.Kode_barang', '=', 'PURCHASE.dbo.Y_BARANG.KD_BRG')
                ->select(
                    'T_Mesin.Id_mesin',
                    'T_Mesin.Nama_mesin',
                    'T_Order.Id_order',
                    'PURCHASE.dbo.Y_BARANG.NAMA_BRG AS Nama_Barang',
                    'MeterPanen'
                )
                ->where('T_Mesin.Active', 'Y')
                ->where('T_Mesin.IdType_mesin', $idTypeMesin)
                ->where(function ($query) use ($search, $columns) {
                    foreach ($columns as $column) {
                        $query->orWhere($column, 'LIKE', "%{$search}%");
                    }
                })
                ->offset($start)
                ->limit($limit)
                ->orderBy($order, $dir)
                ->get();

            $totalFiltered = DB::connection('ConnCircular')
                ->table('T_Mesin')
                ->join('T_Order', 'T_Mesin.Id_Order', '=', 'T_Order.Id_order')
                ->join('PURCHASE.dbo.Y_BARANG', 'T_Order.Kode_barang', '=', 'PURCHASE.dbo.Y_BARANG.KD_BRG')
                ->where('T_Mesin.Active', 'Y')
                ->where('T_Mesin.IdType_mesin', $idTypeMesin)
                ->where(function ($query) use ($search, $columns) {
                    foreach ($columns as $column) {
                        $query->orWhere($column, 'LIKE', "%{$search}%");
                    }
                })
                ->count();
        }

        $data = array();
        if (!empty($sp)) {
            foreach ($sp as $index => $datasp) {
                $nestedData['NomorKu'] = $index;

                $nestedData['IdMesin'] = $datasp->Id_mesin;
                $nestedData['NamaMesin'] = $datasp->Nama_mesin;
                $nestedData['IdOrder'] = $datasp->Id_order;
                $nestedData['NamaBarang'] = $datasp->Nama_Barang;
                $nestedData['MeterPanen'] = $datasp->MeterPanen;

                $data[] = $nestedData;
            }
        }

        $json_data = array(
            "draw" => intval($request->input('draw')),
            "recordsTotal" => intval($totalData),
            "recordsFiltered" => intval($totalFiltered),
            "data" => $data
        );

        echo json_encode($json_data);
    }
    #endregion
}
