<?php

namespace App\Http\Controllers\Extruder\WarehouseTerima;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Auth;

class WarehouseController extends Controller
{
    public function index($form_name)
    {
        $view_name = 'extruder.WarehouseTerima.' . $form_name;
        $form_data = ['listDivisi' => $this->getListDivisi()];

        switch ($form_name) {
            case 'formBatalAssesoris':
            case 'formBatalGelondongan':
                $view_name = 'extruder.WarehouseTerima.formBatalKirimBarcode';

            default:
                # code...
                break;
        }

        $view_data = [
            'pageName' => 'WarehouseTerima',
            'formName' => $form_name,
            'formData' => $form_data,
        ];

        return view($view_name, $view_data);
    }

    private function getListDivisi()
    {
        return $this->executeSP(
            'select',
            'SP_1003_INV_UserDivisi',
            '@XKdUser = ' . Auth::user()->NomorUser,
            []
        );
    }

    private function getStatusDispresiasi($kode_barang, $no_indeks, $trans1, $trans2, $trans3, $trans4, $divisi)
    {
        // [SP_1273_INV_CekBarcodeGelondonganMojosari]

        $query = "
            SELECT Dispresiasi.Status
            FROM Dispresiasi
            INNER JOIN Type ON Dispresiasi.Id_type_tujuan = Type.IdType
            INNER JOIN Subkelompok ON Type.IdSubkelompok_Type = Subkelompok.IdSubkelompok
            INNER JOIN Kelompok ON Subkelompok.IdKelompok_Subkelompok = Kelompok.IdKelompok
            INNER JOIN KelompokUtama ON Kelompok.IdKelompokUtama_Kelompok = KelompokUtama.IdKelompokUtama
            INNER JOIN Objek ON KelompokUtama.IdObjek_KelompokUtama = Objek.IdObjek
            WHERE Dispresiasi.Kode_barang = :KodeBarang
            AND Dispresiasi.NoIndeks = :NoIndeks
            AND Dispresiasi.Type_Transaksi IN (:typetrans, :typetrans1, :typetrans2, :typetrans3)
            AND Objek.IdDivisi_Objek = :Divisi
        ";

        $bindings = [
            'KodeBarang' => $kode_barang,
            'NoIndeks' => $no_indeks,
            'typetrans' => $trans1,
            'typetrans1' => $trans2,
            'typetrans2' => $trans3,
            'typetrans3' => $trans4,
            'Divisi' => $divisi,
        ];

        $dispresiasiData = DB::connection('ConnInventory')->select($query, $bindings);
        return $dispresiasiData;
    }

    private function getCekBarcodeKirimGudang($kode_barang, $no_indeks, $divisi = null)
    {
        // [SP_5409_INV_CekBarcodeKirimGudang]

        $status_dispresiasi = DB::connection('ConnInventory')->table('dispresiasi')
            ->where('kode_barang', $kode_barang)
            ->where('noindeks', $no_indeks)
            ->whereNotNull('y_idtrans')
            ->select('Status')
            ->first();
        $status_dispresiasi = $status_dispresiasi->Status;

        if ($divisi !== null) {
            $id_typeResult = DB::connection('ConnInventory')->table('Dispresiasi')
                ->where('kode_barang', $kode_barang)
                ->where('noindeks', $no_indeks)
                ->whereNotNull('y_idtrans')
                ->select('id_type_tujuan')
                ->first();
            $id_type = $id_typeResult->id_type_tujuan;

            $id_divResult = DB::table('VW_TYPE')
                ->where('IdType', $id_type)
                ->select('IdDivisi')
                ->first();
            $id_div = $id_divResult->IdDivisi;

            if ($divisi != $id_div)
                $status_dispresiasi = response()->json(['Status' => 5]);
        }

        return $status_dispresiasi;
    }

    private function updKirimMjsGelondongan($kode_barang, $no_indeks, $divisi, $status)
    {
        // [SP_1273_INV_SimpanPermohonanKirimMojosari]

        DB::beginTransaction();
        try {
            $select_dispresiasi = DB::connection('ConnInventory')->select(
                'SELECT id_type_tujuan, qty, qty_primer, qty_sekunder, tgl_mutasi,  type_transaksi FROM dispresiasi WHERE kode_barang = ? AND noindeks = ?',
                [$kode_barang, $no_indeks]
            );

            if (count($select_dispresiasi) > 0) {
                $id_type = $select_dispresiasi[0]->id_type_tujuan;
                $jumlah_keluar_tritier = $select_dispresiasi[0]->qty;
                $jumlah_keluar_primer = $select_dispresiasi[0]->qty_primer;
                $jumlah_keluar_sekunder = $select_dispresiasi[0]->qty_sekunder;
                $tgl_produksi = $select_dispresiasi[0]->tgl_mutasi;

                $select_type = DB::connection('ConnInventory')->select(
                    'SELECT SaldoTritier, SaldoSekunder, SaldoPrimer FROM Type WHERE IdType = ?',
                    [$id_type]
                );

                $saldo_tritier = $select_type[0]->SaldoTritier;
                $saldo_sekunder = $select_type[0]->SaldoSekunder;
                $saldo_primer = $select_type[0]->SaldoPrimer;

                $select_transaksi = DB::connection('ConnInventory')->select(
                    'SELECT t.uraiandetailtransaksi FROM transaksi t, dispresiasi d WHERE d.y_idtrans = t.idtransaksi and d.kode_barang = ? and d.noindeks = ?',
                    [$kode_barang, $no_indeks]
                );

                $uraian = $select_transaksi[0]->uraiandetailtransaksi;

                if (doubleval($saldo_tritier) - doubleval($jumlah_keluar_tritier) >= 0) {
                    if (doubleval($saldo_sekunder) - doubleval($jumlah_keluar_sekunder) >= 0) {
                        if (doubleval($saldo_primer) - doubleval($jumlah_keluar_primer) >= 0) {
                            // Update dispresiasi
                            DB::connection('ConnInventory')->update(
                                "UPDATE dispresiasi SET type_transaksi = '27', status = '2', ditembak = '3', notemptrans = " . Auth::user()->NomorUser . " WHERE kode_barang = ? AND noindeks = ?",
                                [$kode_barang, $no_indeks]
                            );

                            // Masukkan data dalam tmp_kirim_gudang
                            if ($status == 0) {
                                $tanggal = Carbon::now()->format('Y-m-d');
                                DB::connection('ConnInventory')
                                    ->table('tmp_kirim_gudang')
                                    ->insert([
                                        'idpemberi' => Auth::user()->NomorUser,
                                        'tglkirim' => $tanggal,
                                        'kodebarang' => $kode_barang,
                                        'noindeks' => $no_indeks,
                                        'primer' => $jumlah_keluar_primer,
                                        'sekunder' => $jumlah_keluar_sekunder,
                                        'tritier' => $jumlah_keluar_tritier,
                                        'idtype' => $id_type,
                                        'tglProduksi' => $tgl_produksi,
                                        'typetransaksi' => '27',
                                        'status' => -1,
                                        'divisi' => $divisi,
                                        'uraian' => $uraian
                                    ]);

                                DB::connection('ConnInventory')->update(
                                    'UPDATE dispresiasi SET tgl_tembak_keluar = ? WHERE kode_barang = ? AND noindeks = ?',
                                    [$tanggal, $kode_barang, $no_indeks]
                                );
                            } else if ($status == 1) {
                                $tanggal = Carbon::now()->subDay()->format('Y-m-d');

                                DB::connection('ConnInventory')
                                    ->table('tmp_kirim_gudang')
                                    ->insert([
                                        'idpemberi' => Auth::user()->NomorUser,
                                        'tglkirim' => $tanggal,
                                        'kodebarang' => $kode_barang,
                                        'noindeks' => $no_indeks,
                                        'primer' => $jumlah_keluar_primer,
                                        'sekunder' => $jumlah_keluar_sekunder,
                                        'tritier' => $jumlah_keluar_tritier,
                                        'idtype' => $id_type,
                                        'tglProduksi' => $tgl_produksi,
                                        'typetransaksi' => '27',
                                        'status' => -1,
                                        'divisi' => $divisi,
                                        'uraian' => $uraian
                                    ]);

                                DB::connection('ConnInventory')->update(
                                    'UPDATE dispresiasi SET tgl_tembak_keluar = ? WHERE kode_barang = ? AND noindeks = ?',
                                    [$tanggal, $kode_barang, $no_indeks]
                                );
                            }
                        } else
                            return response()->json(['pesan' => 'Saldo Primer tidak mencukupi.']);
                    } else
                        return response()->json(['pesan' => 'Saldo Sekunder tidak mencukupi.']);
                } else
                    return response()->json(['pesan' => 'Saldo Primer tidak mencukupi.']);
            } else
                return response()->json(['pesan' => 'Dispresiasi tidak ditemukan.']);

            DB::commit();
        } catch (\Exception $e) {
            // lihat error pada file storage\logs\laravel.log
            Log::error($e->getMessage());
            DB::rollBack();
        }

        return 1;
    }

    private function updKirimMjsAssesoris($kode_barang, $no_indeks, $status, $divisi, $type_asal = null)
    {
        // [SP_1273_INV_SimpanPermohonanKirimKeMojosari]

        DB::beginTransaction();
        try {
            $select_dispresiasi = DB::connection('ConnInventory')->select(
                'SELECT id_type_tujuan, qty, qty_primer, qty_sekunder, tgl_mutasi,  type_transaksi FROM dispresiasi WHERE kode_barang = ? AND noindeks = ?',
                [$kode_barang, $no_indeks]
            );

            if (count($select_dispresiasi) > 0) {
                $id_type = $select_dispresiasi[0]->id_type_tujuan;
                $jumlah_keluar_tritier = $select_dispresiasi[0]->qty;
                $jumlah_keluar_primer = $select_dispresiasi[0]->qty_primer;
                $jumlah_keluar_sekunder = $select_dispresiasi[0]->qty_sekunder;
                $tgl_produksi = $select_dispresiasi[0]->tgl_mutasi;

                $select_type = DB::connection('ConnInventory')->select(
                    'SELECT SaldoTritier, SaldoSekunder, SaldoPrimer FROM Type WHERE IdType = ?',
                    [$id_type]
                );

                $saldo_tritier = $select_type[0]->SaldoTritier;
                $saldo_sekunder = $select_type[0]->SaldoSekunder;
                $saldo_primer = $select_type[0]->SaldoPrimer;

                $select_transaksi = DB::connection('ConnInventory')->select(
                    'SELECT t.uraiandetailtransaksi FROM transaksi t, dispresiasi d WHERE d.y_idtrans = t.idtransaksi and d.kode_barang = ? and d.noindeks = ?',
                    [$kode_barang, $no_indeks]
                );

                $uraian = $select_transaksi[0]->uraiandetailtransaksi;

                if (doubleval($saldo_tritier) - doubleval($jumlah_keluar_tritier) >= 0) {
                    if (doubleval($saldo_sekunder) - doubleval($jumlah_keluar_sekunder) >= 0) {
                        if (doubleval($saldo_primer) - doubleval($jumlah_keluar_primer) >= 0) {
                            // Update dispresiasi
                            DB::connection('ConnInventory')->update(
                                "UPDATE dispresiasi SET jumlah_cetak = '4', status = '2', ditembak = '3', notemptrans = " . Auth::user()->NomorUser . " WHERE kode_barang = ? AND noindeks = ?",
                                [$kode_barang, $no_indeks]
                            );

                            // Masukkan data dalam tmp_kirim_gudang
                            if ($status == 0) {
                                $tanggal = Carbon::now()->format('Y-m-d');
                                DB::connection('ConnInventory')
                                    ->table('tmp_kirim_gudang')
                                    ->insert([
                                        'idpemberi' => Auth::user()->NomorUser,
                                        'tglkirim' => $tanggal,
                                        'kodebarang' => $kode_barang,
                                        'noindeks' => $no_indeks,
                                        'primer' => $jumlah_keluar_primer,
                                        'sekunder' => $jumlah_keluar_sekunder,
                                        'tritier' => $jumlah_keluar_tritier,
                                        'idtype' => $id_type,
                                        'tglProduksi' => $tgl_produksi,
                                        'typetransaksi' => '27',
                                        'status' => 0,
                                        'divisi' => $divisi,
                                        'uraian' => $uraian
                                    ]);

                                DB::connection('ConnInventory')->update(
                                    'UPDATE dispresiasi SET tgl_tembak_keluar = ? WHERE kode_barang = ? AND noindeks = ?',
                                    [$tanggal, $kode_barang, $no_indeks]
                                );
                            } else if ($status == 1) {
                                $tanggal = Carbon::now()->subDay()->format('Y-m-d');
                                DB::connection('ConnInventory')
                                    ->table('tmp_kirim_gudang')
                                    ->insert([
                                        'idpemberi' => Auth::user()->NomorUser,
                                        'tglkirim' => $tanggal,
                                        'kodebarang' => $kode_barang,
                                        'noindeks' => $no_indeks,
                                        'primer' => $jumlah_keluar_primer,
                                        'sekunder' => $jumlah_keluar_sekunder,
                                        'tritier' => $jumlah_keluar_tritier,
                                        'idtype' => $id_type,
                                        'tglProduksi' => $tgl_produksi,
                                        'typetransaksi' => '27',
                                        'status' => -1,
                                        'divisi' => $divisi,
                                        'uraian' => $uraian
                                    ]);


                                if ($type_asal != null) {
                                    DB::connection('ConnInventory')->update(
                                        'UPDATE dispresiasi SET id_type_asal = ?, tgl_tembak_keluar = ? WHERE kode_barang = ? AND noindeks = ?',
                                        [$type_asal, $tanggal, $kode_barang, $no_indeks]
                                    );
                                } else {
                                    DB::connection('ConnInventory')->update(
                                        'UPDATE dispresiasi SET tgl_tembak_keluar = ? WHERE kode_barang = ? AND noindeks = ?',
                                        [$tanggal, $kode_barang, $no_indeks]
                                    );
                                }
                            }
                        } else
                            return response()->json(['pesan' => 'Saldo Primer tidak mencukupi.']);
                    } else
                        return response()->json(['pesan' => 'Saldo Sekunder tidak mencukupi.']);
                } else
                    return response()->json(['pesan' => 'Saldo Primer tidak mencukupi.']);
            } else
                return response()->json(['pesan' => 'Dispresiasi tidak ditemukan.']);

            DB::commit();
        } catch (\Exception $e) {
            // lihat error pada file storage\logs\laravel.log
            Log::error($e->getMessage());
            DB::rollBack();
        }

        return 1;
    }

    private function updKirimKerta2($kode_barang, $no_indeks, $status, $divisi)
    {
        // [SP_1273_INV_SimpanPermohonanKirimKerta2]

        DB::beginTransaction();
        try {
            $select_dispresiasi = DB::connection('ConnInventory')->select(
                'SELECT id_type_tujuan, qty, qty_primer, qty_sekunder, tgl_mutasi,  type_transaksi FROM dispresiasi WHERE kode_barang = ? AND noindeks = ?',
                [$kode_barang, $no_indeks]
            );

            if (count($select_dispresiasi) > 0) {
                $id_type = $select_dispresiasi[0]->id_type_tujuan;
                $jumlah_keluar_tritier = $select_dispresiasi[0]->qty;
                $jumlah_keluar_primer = $select_dispresiasi[0]->qty_primer;
                $jumlah_keluar_sekunder = $select_dispresiasi[0]->qty_sekunder;
                $tgl_produksi = $select_dispresiasi[0]->tgl_mutasi;

                $select_type = DB::connection('ConnInventory')->select(
                    'SELECT SaldoTritier, SaldoSekunder, SaldoPrimer FROM Type WHERE IdType = ?',
                    [$id_type]
                );

                $saldo_tritier = $select_type[0]->SaldoTritier;
                $saldo_sekunder = $select_type[0]->SaldoSekunder;
                $saldo_primer = $select_type[0]->SaldoPrimer;

                $select_transaksi = DB::connection('ConnInventory')->select(
                    'SELECT t.uraiandetailtransaksi FROM transaksi t, dispresiasi d WHERE d.y_idtrans = t.idtransaksi and d.kode_barang = ? and d.noindeks = ?',
                    [$kode_barang, $no_indeks]
                );

                $uraian = $select_transaksi[0]->uraiandetailtransaksi;

                if (doubleval($saldo_tritier) - doubleval($jumlah_keluar_tritier) >= 0) {
                    if (doubleval($saldo_sekunder) - doubleval($jumlah_keluar_sekunder) >= 0) {
                        if (doubleval($saldo_primer) - doubleval($jumlah_keluar_primer) >= 0) {
                            // Update dispresiasi
                            DB::connection('ConnInventory')->update(
                                "UPDATE dispresiasi SET type_transaksi = '24', status = '2', ditembak = '3', notemptrans = " . Auth::user()->NomorUser . " WHERE kode_barang = ? AND noindeks = ?",
                                [$kode_barang, $no_indeks]
                            );

                            // Masukkan data dalam tmp_kirim_gudang
                            if ($status == 0) {
                                $tanggal = Carbon::now()->format('Y-m-d');
                                DB::connection('ConnInventory')
                                    ->table('tmp_kirim_gudang')
                                    ->insert([
                                        'idpemberi' => Auth::user()->NomorUser,
                                        'tglkirim' => $tanggal,
                                        'kodebarang' => $kode_barang,
                                        'noindeks' => $no_indeks,
                                        'primer' => $jumlah_keluar_primer,
                                        'sekunder' => $jumlah_keluar_sekunder,
                                        'tritier' => $jumlah_keluar_tritier,
                                        'idtype' => $id_type,
                                        'tglProduksi' => $tgl_produksi,
                                        'typetransaksi' => '24',
                                        'status' => -1,
                                        'divisi' => $divisi,
                                        'uraian' => $uraian
                                    ]);

                                DB::connection('ConnInventory')->update(
                                    'UPDATE dispresiasi SET tgl_tembak_keluar = ? WHERE kode_barang = ? AND noindeks = ?',
                                    [$tanggal, $kode_barang, $no_indeks]
                                );
                            } else if ($status == 1) {
                                $tanggal = Carbon::now()->subDay()->format('Y-m-d');
                                DB::connection('ConnInventory')
                                    ->table('tmp_kirim_gudang')
                                    ->insert([
                                        'idpemberi' => Auth::user()->NomorUser,
                                        'tglkirim' => $tanggal,
                                        'kodebarang' => $kode_barang,
                                        'noindeks' => $no_indeks,
                                        'primer' => $jumlah_keluar_primer,
                                        'sekunder' => $jumlah_keluar_sekunder,
                                        'tritier' => $jumlah_keluar_tritier,
                                        'idtype' => $id_type,
                                        'tglProduksi' => $tgl_produksi,
                                        'typetransaksi' => '24',
                                        'status' => -1,
                                        'divisi' => $divisi,
                                        'uraian' => $uraian
                                    ]);

                                DB::connection('ConnInventory')->update(
                                    'UPDATE dispresiasi SET tgl_tembak_keluar = ? WHERE kode_barang = ? AND noindeks = ?',
                                    [$tanggal, $kode_barang, $no_indeks]
                                );
                            }
                        } else
                            return response()->json(['pesan' => 'Saldo Primer tidak mencukupi.']);
                    } else
                        return response()->json(['pesan' => 'Saldo Sekunder tidak mencukupi.']);
                } else
                    return response()->json(['pesan' => 'Saldo Primer tidak mencukupi.']);
            } else
                return response()->json(['pesan' => 'Dispresiasi tidak ditemukan.']);

            DB::commit();
        } catch (\Exception $e) {
            // lihat error pada file storage\logs\laravel.log
            Log::error($e->getMessage());
            DB::rollBack();
        }

        return 1;
    }

    private function updAccGudangBarcode($id_type, $jumlah_keluar_primer, $jumlah_keluar_sekunder, $jumlah_keluar_tritier, $user_id, $id_pemberi, $tanggal, $uraian, $divisi, $no_sp)
    {
        #region Variables
        $IdTypePemberi = '';
        $SPrimerBeri = '';
        $SSekunderBeri = '';
        $STritierBeri = '';
        $SUmumBeri = '';
        $KonvBeri = '';
        $SldPrimerBeri = '';
        $SldSekunderBeri = '';
        $SldTritierBeri = '';
        $MinStokBeri = '';
        $KonvTriSekBeri = '';
        $KonvSekPriBeri = '';
        $IdPenerima = '';
        $IdSubKelAsl = '';
        $a = '';
        $YIdTransaksi = '';
        $DivisiPemberi = '';
        $Satuan = '';
        $IdTrans1 = '';

        // Variabel yang digunakan proses penerima
        $IdSubKelTuj = '';
        $IdTypeTerima = '';
        $SPrimerTerima = '';
        $SSekunderTerima = '';
        $STritierTerima = '';
        $SUmumTerima = '';
        $KonvTerima = '';
        $SldPrimerTerima = '';
        $SldSekunderTerima = '';
        $SldTritierTerima = '';
        $MaxStokTerima = '';
        $KonvSekPriTerima = '';
        $XIdTransaksi = '';
        $DivisiPenerima = '';

        $IdTrans = '';
        $x_trans = '';
        $y_trans = '';
        $idtype_tujuan = '';
        $typetransaksi = '';
        #endregion

        DB::beginTransaction();

        try {
            // Cek penyesuaian
            $IdTrans = DB::connection('ConnInventory')->select(
                "SELECT IdTransaksi FROM Transaksi WHERE idtype = :id_type AND SaatLog IS NULL AND IdTypeTransaksi = '06'",
                ['id_type' => $id_type]
            );

            if (count($IdTrans) > 0) {
                return response()->json(['pesan' => 'Ada Transaksi Penyesuaian Yang Belum di ACC']);
            }

            DB::commit();
            return response()->json(['message' => 'Success'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function warehouseTerima($fun_str, $fun_data)
    {
        $param_data = explode('~', $fun_data);
        switch ($fun_str) {
            case 'SP_5409_INV_ListBarcodeTerimaGudang':
                $param_str = '@status = ?, @idkelompokutama = ?';
                return $this->executeSP('select', $fun_str, $param_str, $param_data);

            case 'SP_1273_INV_AmbilBarangGelondongan':
                /**
                 * 022 / 042 | Objek (IdDivisi_Objek) -> Divisi (IdDivisi)
                 * KelompokUtama (IdObjek_KelompokUtama) -> Objek (IdObjek)
                 * 000288 / 002432 | Kelompok (IdKelompokUtama_Kelompok) -> KelompokUtama (IdKelompokUtama)
                 * SubKelompok (IdKelompok_Subkelompok) -> Kelompok (IdKelompok)
                 * Type (IdSubkelompok_Type) -> SubKelompok (IdSubkelompok)
                 * Status = 3, Type_Transaksi = 23 | Dispresiasi (Id_type_tujuan) -> Type (IdType)
                 */
                $param_str = '@divisi = ?';
                return $this->executeSP('select', $fun_str, $param_str, $param_data);

            case 'SP_1273_INV_AmbilBarangSetJadi':
                /**
                 * 078 / 162 / 192 | Objek (IdDivisi_Objek) -> Divisi (IdDivisi)
                 * KelompokUtama (IdObjek_KelompokUtama) -> Objek (IdObjek)
                 * Kelompok (IdKelompokUtama_Kelompok) -> KelompokUtama (IdKelompokUtama)
                 * SubKelompok (IdKelompok_Subkelompok) -> Kelompok (IdKelompok)
                 * Type (IdSubkelompok_Type) -> SubKelompok (IdSubkelompok)
                 * Status = 1, Type_Transaksi = 22, Tgl_Tembak_Keluar = NULL | Dispresiasi (Id_type_tujuan) -> Type (IdType)
                 */
                $param_str = '@IdObjek = ?';
                return $this->executeSP('select', $fun_str, $param_str, $param_data);

            case 'SP_1273_INV_ACCGUDANG_BARCODEKRR':
                $param_str = '@IdType = ?, @JumlahKeluarPrimer = ?, @JumlahKeluarSekunder = ?, @JumlahKeluarTritier = ?, @user_id = ' . Auth::user()->NomorUser . ', @IdPemberi = ?, @Tanggal = ?, @Uraian = ?, @NoSJ = ?, @KodeBarang = ?, @NoSP = ?, @Kode = ?';
                return $this->executeSP('statement', $fun_str, $param_str, $param_data);

            case 'SPUpdate_ValidasiTerimaDariKRR2':
                $param_str = '@No_Barcode = ?, @site = ?';
                return $this->executeSP('statement', $fun_str, $param_str, $param_data);

            case 'SP_1003_JBM_LHTNOPOL':
                $param_str = '@kode = ?';
                return $this->executeSP('select', $fun_str, $param_str, $param_data);

            case 'spSelect_TerimaDariKRR2':
            case 'SP_1273_INV_Select_SumPenerimaanKRR2':
                $param_str = '@NoSJ = ?, @Kode = ?';
                return $this->executeSP('select', $fun_str, $param_str, $param_data);

            case 'SP_1273_INV_CekBarangSetJadi_TidakKirim':
            case 'spSelect_IdType_KelebihanBarang':
                $param_str = '@KodeBarang = ?';
                return $this->executeSP('select', $fun_str, $param_str, $param_data);

            case 'SP_1273_INV_CekGelondongan_KirimKeKRR2':
            case 'SP_1273_INV_Cek_KirimKeKRR2':
                $param_str = '@KodeBarang = ?, @ItemNumber = ?, @IdDiv = ?';
                return $this->executeSP('select', $fun_str, $param_str, $param_data);

            case 'SP_1273_INV_ListBarcodeKerta2':
                $param_str = '@Kode = ?, @status = ?, @iddivisi = ?';
                return $this->executeSP('select', $fun_str, $param_str, $param_data);

            case 'SP_1273_INV_ambil_counter_sj_krr2':
                $param_str = '@mode = ?';
                return $this->executeSP('select', $fun_str, $param_str, $param_data);

            case 'SP_1003_INV_UserObjek_Diminta':
                $param_str = '@XIdDivisi = ?, @XKdUser = ' . Auth::user()->NomorUser;
                return $this->executeSP('select', $fun_str, $param_str, $param_data);

            case 'SP_1273_INV_SimpanPermohonanKirimKerta2':
                return $this->updKirimKerta2($param_data[0], $param_data[1], $param_data[2], $param_data[3]);

            case 'SP_5409_INV_CekBarcodeKirimGudang':
                return $this->getCekBarcodeKirimGudang($param_data[0], $param_data[1]);

            case 'SP_1273_INV_SimpanPermohonanKirimKeMojosari':
                return $this->updKirimMjsAssesoris($param_data[0], $param_data[1], $param_data[2], $param_data[3]);

            case 'SP_1273_INV_SimpanPermohonanKirimMojosari':
                return $this->updKirimMjsGelondongan($param_data[0], $param_data[1], $param_data[2], $param_data[3]);

            case 'SP_1273_INV_CekBarcodeGelondonganMojosari':
                return $this->getStatusDispresiasi($param_data[0], $param_data[1], $param_data[2], $param_data[3], $param_data[4], $param_data[5], $param_data[6]);

            case 'SP_1273_BCD_CekKirimBarcode':
            case 'SP_1273_BCD_CekBarcode':
            case 'SP_1273_BCD_CekBarcodeKeluar':
            case 'SP_5409_INV_SimpanPenerimaanAwalGudang':
            case 'SP_1273_LMT_SimpanPembatalanKirimKeGudang':
            case 'SP_5409_INV_SimpanPenerimaanAwalGudang2':
            case 'SP_1273_INV_TampilDataBarang_Mojo':
                $param_str = '@kodebarang = ?, @noindeks = ?';
                if ($fun_str == 'SP_5409_INV_SimpanPenerimaanAwalGudang' || $fun_str == 'SP_1273_LMT_SimpanPembatalanKirimKeGudang') {
                    $action_str = 'statement';
                } else
                    $action_str = 'select';
                return $this->executeSP($action_str, $fun_str, $param_str, $param_data);

            case 'SP_5409_INV_SimpanPenerimaanAwalGudang':
                $param_str = '@kode_barang = ?, @item_number = ?, @Divisi = ?';
                return $this->executeSP('statement', $fun_str, $param_str, $param_data);

            case 'SP_1273_INV_ACCGUDANG_BARCODEMOJOSARI':
                $param_str = '@Tanggal = ?, @Uraian = ?, @JumlahKeluarPrimer = ?, @JumlahKeluarSekunder = ?, @JumlahKeluarTritier = ?, @IdType = ?, @IdPemberi = ?, @user_id = ' . Auth::user()->NomorUser . ', @Divisi = ?';
                return $this->executeSP('statement', $fun_str, $param_str, $param_data);

            case 'SP_1273_INV_ListBarcodeTerimaBahanBaku':
                $param_str = '@status = ?, @Divisi = ?';
                return $this->executeSP('statement', $fun_str, $param_str, $param_data);

            case 'SP_1003_INV_UserDivisi':
                return $this->getListDivisi();

            case 'SP_1273_INV_ListBarcodeTerimaBahanBaku':
                $param_str = '@status = ?, @Divisi = ?';
                return $this->executeSP('select', $fun_str, $param_str, $param_data);

            case 'SP_1273_INV_TampilGelondongan_Mojo':
                $param_str = '@kodebarang = ?, @noindeks = ?, @Divisi = ?';
                return $this->executeSP('select', $fun_str, $param_str, $param_data);

            case 'SP_JAM_SERVER':
                $param_str = '';
                return $this->executeSP('select', $fun_str, $param_str, $param_data);

            case 'SP_1273_INV_ListBarcodeBahanBaku':
            case 'SP_1273_INV_ListBarcodeBahanBaku_Mojo':
                $param_str = '@status = ?, @iddivisi = ?';
                return $this->executeSP('select', $fun_str, $param_str, $param_data);

            case 'SP_1273_INV_ListKirimBahanBaku':
                $param_str = '@Kode = ?, @Divisi = ?';
                if ($param_data[0] == '3')
                    $param_str = '@Kode = ?';
                if ($param_data[0] == '12')
                    $param_str .= ', @Tanggal = ?';
                return $this->executeSP('select', $fun_str, $param_str, $param_data);

            default:
                dd("SP tidak ditemukan.");
                break;
        }
    }

    private function executeSP($action_str, $sp_str, $param_str, $param_data)
    {
        if ($action_str == 'statement') {
            return DB::connection('ConnInventory')->statement(
                'exec ' . $sp_str . ' ' . $param_str,
                $param_data
            );
        } else if ($action_str == 'select') {
            return DB::connection('ConnInventory')->select(
                'exec ' . $sp_str . ' ' . $param_str,
                $param_data
            );
        }
    }
}

// public function lihatDataBarcode(Request $request)
// {
//     $columns = array(
//         1 => 'TglKirim',
//         2 => 'NamaType',
//         3 => 'KodeBarang',
//         4 => 'NoIndeks',
//         5 => 'Primer',
//         6 => 'Sekunder',
//         7 => 'Tritier',
//         8 => 'Divisi'
//     );

//     $kode_sp = $request->kode_sp;
//     $divisi = $request->divisi;
//     $tanggal = $request->tanggal;

//     // dd($kode_sp);

//     $query = '';
//     if ($kode_sp == 2) {
//         $query = "SELECT
//                 Tmp_Kirim_Gudang.IdPemberi,
//                 Tmp_Kirim_Gudang.TglKirim,
//                 Tmp_Kirim_Gudang.KodeBarang,
//                 Tmp_Kirim_Gudang.NoIndeks,
//                 Tmp_Kirim_Gudang.Primer,
//                 Tmp_Kirim_Gudang.Sekunder,
//                 Tmp_Kirim_Gudang.Tritier,
//                 Tmp_Kirim_Gudang.Timeinput,
//                 Tmp_Kirim_Gudang.IdType,
//                 Type.NamaType,
//                 Tmp_Kirim_Gudang.TypeTransaksi,
//                 Tmp_Kirim_Gudang.Status,
//                 Tmp_Kirim_Gudang.Divisi
//             FROM Tmp_Kirim_Gudang
//             INNER JOIN Type ON Tmp_Kirim_Gudang.IdType = Type.IdType
//             WHERE
//                 (Tmp_Kirim_Gudang.TypeTransaksi = '27')
//                 AND (Tmp_Kirim_Gudang.Status in (-1, 0))
//                 AND Tmp_Kirim_Gudang.Divisi = :Divisi
//         ";

//         $bindings = [
//             'Divisi' => $divisi
//         ];
//     } else if ($kode_sp == 13) {
//         $query = "SELECT
//                 Tmp_Kirim_Gudang.IdPemberi,
//                 Tmp_Kirim_Gudang.TglKirim,
//                 Tmp_Kirim_Gudang.KodeBarang,
//                 Tmp_Kirim_Gudang.NoIndeks,
//                 Tmp_Kirim_Gudang.Primer,
//                 Tmp_Kirim_Gudang.Sekunder,
//                 Tmp_Kirim_Gudang.Tritier,
//                 Tmp_Kirim_Gudang.Timeinput,
//                 Tmp_Kirim_Gudang.IdType,
//                 Type.NamaType,
//                 Tmp_Kirim_Gudang.TypeTransaksi,
//                 Tmp_Kirim_Gudang.Status,
//                 Tmp_Kirim_Gudang.Divisi
//             FROM Kelompok
//             INNER JOIN KelompokUtama ON Kelompok.IdKelompokUtama_Kelompok = KelompokUtama.IdKelompokUtama
//             INNER JOIN Subkelompok ON Kelompok.IdKelompok = Subkelompok.IdKelompok_Subkelompok
//             INNER JOIN Tmp_Kirim_Gudang
//                 INNER JOIN Type ON Tmp_Kirim_Gudang.IdType = Type.IdType
//                 ON Subkelompok.IdSubkelompok = Type.IdSubkelompok_Type
//             WHERE
//                 (Tmp_Kirim_Gudang.TypeTransaksi = '27')
//                 AND (Tmp_Kirim_Gudang.Status = 0)
//                 AND (Tmp_Kirim_Gudang.Divisi = :Divisi)
//                 AND (Tmp_Kirim_Gudang.TglKirim = :Tanggal)
//         ";

//         $bindings = [
//             'Divisi' => $divisi,
//             'Tanggal' => $tanggal
//         ];
//     }

//     $total_data = count(DB::connection('ConnInventory')->select($query, $bindings));

//     $total_filtered = $total_data;

//     $limit = $request->input('length');
//     $start = $request->input('start');
//     $order = $columns[$request->input('order.0.column')];
//     $dir = $request->input('order.0.dir');

//     if (empty($request->input('search.value'))) {
//         if ($kode_sp == 2) {
//             $query = "SELECT
//                     Tmp_Kirim_Gudang.IdPemberi,
//                     Tmp_Kirim_Gudang.TglKirim,
//                     Tmp_Kirim_Gudang.KodeBarang,
//                     Tmp_Kirim_Gudang.NoIndeks,
//                     Tmp_Kirim_Gudang.Primer,
//                     Tmp_Kirim_Gudang.Sekunder,
//                     Tmp_Kirim_Gudang.Tritier,
//                     Tmp_Kirim_Gudang.Timeinput,
//                     Tmp_Kirim_Gudang.IdType,
//                     Type.NamaType,
//                     Tmp_Kirim_Gudang.TypeTransaksi,
//                     Tmp_Kirim_Gudang.Status,
//                     Tmp_Kirim_Gudang.Divisi
//                 FROM Tmp_Kirim_Gudang
//                 INNER JOIN Type ON Tmp_Kirim_Gudang.IdType = Type.IdType
//                 WHERE
//                     (Tmp_Kirim_Gudang.TypeTransaksi = '27')
//                     AND (Tmp_Kirim_Gudang.Status in (-1, 0))
//                     AND Tmp_Kirim_Gudang.Divisi = :Divisi
//                 ORDER BY Tmp_Kirim_Gudang.TglKirim $order $dir
//                 LIMIT :Limit OFFSET :Offset
//             ";

//             $bindings = [
//                 'Divisi' => $divisi,
//                 'Limit' => $limit,
//                 'Offset' => $start
//             ];
//         } else if ($kode_sp == 13) {
//             $query = "SELECT
//                     Tmp_Kirim_Gudang.IdPemberi,
//                     Tmp_Kirim_Gudang.TglKirim,
//                     Tmp_Kirim_Gudang.KodeBarang,
//                     Tmp_Kirim_Gudang.NoIndeks,
//                     Tmp_Kirim_Gudang.Primer,
//                     Tmp_Kirim_Gudang.Sekunder,
//                     Tmp_Kirim_Gudang.Tritier,
//                     Tmp_Kirim_Gudang.Timeinput,
//                     Tmp_Kirim_Gudang.IdType,
//                     Type.NamaType,
//                     Tmp_Kirim_Gudang.TypeTransaksi,
//                     Tmp_Kirim_Gudang.Status,
//                     Tmp_Kirim_Gudang.Divisi
//                 FROM Kelompok
//                 INNER JOIN KelompokUtama ON Kelompok.IdKelompokUtama_Kelompok = KelompokUtama.IdKelompokUtama
//                 INNER JOIN Subkelompok ON Kelompok.IdKelompok = Subkelompok.IdKelompok_Subkelompok
//                 INNER JOIN Tmp_Kirim_Gudang
//                     INNER JOIN Type ON Tmp_Kirim_Gudang.IdType = Type.IdType
//                     ON Subkelompok.IdSubkelompok = Type.IdSubkelompok_Type
//                 WHERE
//                     (Tmp_Kirim_Gudang.TypeTransaksi = '27')
//                     AND (Tmp_Kirim_Gudang.Status = 0)
//                     AND (Tmp_Kirim_Gudang.Divisi = :Divisi)
//                     AND (Tmp_Kirim_Gudang.TglKirim = :Tanggal)
//                 ORDER BY Tmp_Kirim_Gudang.TglKirim $order $dir
//                 LIMIT :Limit OFFSET :Offset
//             ";

//             $bindings = [
//                 'Divisi' => $divisi,
//                 'Tanggal' => $tanggal,
//                 'Limit' => $limit,
//                 'Offset' => $start
//             ];
//         }
//     } else {
//         $search = $request->input('search.value');

//         $like_conditions = [];
//         foreach ($columns as $column) {
//             $likeConditions[] = "$column LIKE :Search";
//         }

//         $where_clause = implode(' OR ', $like_conditions);

//         if ($kode_sp == 2) {
//             $query = "SELECT
//                     Tmp_Kirim_Gudang.IdPemberi,
//                     Tmp_Kirim_Gudang.TglKirim,
//                     Tmp_Kirim_Gudang.KodeBarang,
//                     Tmp_Kirim_Gudang.NoIndeks,
//                     Tmp_Kirim_Gudang.Primer,
//                     Tmp_Kirim_Gudang.Sekunder,
//                     Tmp_Kirim_Gudang.Tritier,
//                     Tmp_Kirim_Gudang.Timeinput,
//                     Tmp_Kirim_Gudang.IdType,
//                     Type.NamaType,
//                     Tmp_Kirim_Gudang.TypeTransaksi,
//                     Tmp_Kirim_Gudang.Status,
//                     Tmp_Kirim_Gudang.Divisi
//                 FROM Tmp_Kirim_Gudang
//                 INNER JOIN Type ON Tmp_Kirim_Gudang.IdType = Type.IdType
//                 WHERE
//                     (Tmp_Kirim_Gudang.TypeTransaksi = '27')
//                     AND (Tmp_Kirim_Gudang.Status in (-1, 0))
//                     AND Tmp_Kirim_Gudang.Divisi = :Divisi
//                     AND ($where_clause)
//                 ORDER BY Tmp_Kirim_Gudang.TglKirim $order $dir
//                 LIMIT :Limit OFFSET :Offset
//             ";

//             $bindings = [
//                 'Divisi' => $divisi,
//                 'Limit' => $limit,
//                 'Offset' => $start,
//                 'Search' => '%' . $search . '%'
//             ];

//             $total_filtered = count(DB::connection('ConnInventory')->select($query, $bindings));
//         } else if ($kode_sp == 13) {
//             $query = "SELECT
//                     Tmp_Kirim_Gudang.IdPemberi,
//                     Tmp_Kirim_Gudang.TglKirim,
//                     Tmp_Kirim_Gudang.KodeBarang,
//                     Tmp_Kirim_Gudang.NoIndeks,
//                     Tmp_Kirim_Gudang.Primer,
//                     Tmp_Kirim_Gudang.Sekunder,
//                     Tmp_Kirim_Gudang.Tritier,
//                     Tmp_Kirim_Gudang.Timeinput,
//                     Tmp_Kirim_Gudang.IdType,
//                     Type.NamaType,
//                     Tmp_Kirim_Gudang.TypeTransaksi,
//                     Tmp_Kirim_Gudang.Status,
//                     Tmp_Kirim_Gudang.Divisi
//                 FROM Kelompok
//                 INNER JOIN KelompokUtama ON Kelompok.IdKelompokUtama_Kelompok = KelompokUtama.IdKelompokUtama
//                 INNER JOIN Subkelompok ON Kelompok.IdKelompok = Subkelompok.IdKelompok_Subkelompok
//                 INNER JOIN Tmp_Kirim_Gudang
//                     INNER JOIN Type ON Tmp_Kirim_Gudang.IdType = Type.IdType
//                     ON Subkelompok.IdSubkelompok = Type.IdSubkelompok_Type
//                 WHERE
//                     (Tmp_Kirim_Gudang.TypeTransaksi = '27')
//                     AND (Tmp_Kirim_Gudang.Status = 0)
//                     AND (Tmp_Kirim_Gudang.Divisi = :Divisi)
//                     AND (Tmp_Kirim_Gudang.TglKirim = :Tanggal)
//                     AND ($where_clause)
//                 ORDER BY Tmp_Kirim_Gudang.TglKirim $order $dir
//                 LIMIT :Limit OFFSET :Offset
//             ";

//             $bindings = [
//                 'Divisi' => $divisi,
//                 'Tanggal' => $tanggal,
//                 'Limit' => $limit,
//                 'Offset' => $start,
//                 'Search' => '%' . $search . '%'
//             ];

//             $total_filtered = count(DB::connection('ConnInventory')->select($query, $bindings));
//         }
//     }

//     $data = array();
//     if (!empty($sp)) {
//         foreach ($sp as $datasp) {
//             $nestedData['TglKirim'] = substr($datasp->TglKirim, 0, 10);
//             $nestedData['NamaType'] = $datasp->NamaType;
//             $nestedData['KodeBarang'] = $datasp->KodeBarang;
//             $nestedData['NoIndeks'] = $datasp->NoIndeks;
//             $nestedData['Primer'] = $datasp->Primer;
//             $nestedData['Sekunder'] = $datasp->Sekunder;
//             $nestedData['Tritier'] = $datasp->Tritier;
//             $nestedData['Divisi'] = $datasp->Divisi;

//             $data[] = $nestedData;
//         }
//     }

//     $json_data = array(
//         "draw" => intval($request->input('draw')),
//         "recordsTotal" => intval($total_data),
//         "recordsFiltered" => intval($total_filtered),
//         "data" => $data
//     );

//     echo json_encode($json_data);
// }
