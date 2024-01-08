<?php

namespace App\Http\Controllers\Extruder\ExtruderNet;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Auth;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class BenangController extends Controller
{
    public function index($form_name, $nama_gedung = null)
    {
        $view_name = 'extruder.ExtruderNet.' . $form_name;
        $form_data = [];

        switch ($form_name) {
            case 'formBenangMohon':
                $current_date = Carbon::now();
                $formatted_date = $current_date->format('Y-m-d');

                $form_data = [
                    'listNomor' => $this->getKoreksiSortirNGBlmAcc($formatted_date),
                    'listKelut' => $this->getKelompokUtama_IdObjek('032', '3'),
                ];
                break;

            default:
                break;
        }

        $form_data['namaGedung'] = $nama_gedung;
        $view_data = [
            'pageName' => 'ExtruderNet',
            'formName' => $form_name,
            'formData' => $form_data,
        ];

        return view($view_name, $view_data);
    }

    #region Benang - ACC
    public function getListIdKonversiNG($tanggal1, $tanggal2, $kode = null)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_IDKONVERSI_NG @Tanggal1 = ?, @Tanggal2 = ?, @kode = ?',
            [$tanggal1, $tanggal2, $kode]
        );

        // @Tanggal1 datetime, @Tanggal2 datetime, @kode char(1) = null
    }

    public function getDetailDataBenangNG($id_konversi_ng)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_DETAILDATA_BENANG_NG @IdKonversiNG = ?',
            [$id_konversi_ng]
        );

        // @IdKonversiNG int
        // IdKonversiNG = 1, 2, 3, 4, 5

        /**
         * VW_PRG_5298_EXT_DETAILDATA_BENANG_NG
         * - INVENTORY.dbo.VW_PRG_5298_EXT_SUBKEL
         * - INVENTORY.dbo.VW_PRG_5298_EXT_TYPE
         * - INVENTORY.dbo.VW_PRG_5298_EXT_TMPTRANSAKSI
         * - VW_PRG_5298_EXT_KONVERSI_SORTIR
         * => WHERE VW_PRG_5298_EXT_KONVERSI_SORTIR.SaatLog IS NULL
         *
         * INVENTORY.dbo.VW_PRG_5298_EXT_SUBKEL
         * Divisi - Objek - KelompokUtama - Kelompok - SubKelompok
         *
         * INVENTORY.dbo.VW_PRG_5298_EXT_TYPE
         * Type
         *
         * INVENTORY.dbo.VW_PRG_5298_EXT_TMPTRANSAKSI
         * Tmp_Transaksi (FK | IdType - Type, IdTypeTransaksi - TypeTransaksi)
         *
         * VW_PRG_5298_EXT_KONVERSI_SORTIR
         * DetailKonversiNG - IdKonversiNG(MasterKonversiNG)
         */
    }

    public function getPenyesuaianTransaksi($id_type, $id_type_transaksi)
    {
        return DB::connection('ConnInventory')
            ->table('VW_PRG_5298_EXT_TRANSAKSI')
            ->where('idtypetransaksi', $id_type_transaksi)
            ->where('idtype', $id_type)
            ->whereNull('saatlog')
            ->count();

        // *Query pada SP_5298_EXT_CHECK_PENYESUAIAN_TRANSAKSI
        // *tidak perlu data[0].jumlah, langsung data saja.
        // dd($this->getPenyesuaianTransaksi(5, 06));
    }

    public function getTransaksiKonversiNG($id_konv_ng)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_5409_EXT_DISPLAY_TRANSAKSI_KONVERSI_NG @idkonvNG = ?',
            [$id_konv_ng]
        );

        // @idkonvNG  varchar(14)
    }

    public function updProsesACCKonversi($id_transaksi, $id_type, $waktu_acc, $keluar_primer, $keluar_sekunder, $keluar_tritier, $masuk_primer, $masuk_sekunder, $masuk_tritier)
    {
        return DB::connection('ConnInventory')->statement(
            'exec SP_5298_EXT_PROSES_ACC_KONVERSI @XIdTransaksi = ?, @XIdType = ?, @XUserACC = ' . Auth::user()->NomorUser . ', @XWaktuACC = ?, @XKeluarPrimer = ?, @XKeluarSekunder = ?, @XKeluarTritier = ?, @XMasukPrimer = ?, @XMasukSekunder = ?, @XMasukTritier = ?',
            [$id_transaksi, $id_type, $waktu_acc, $keluar_primer, $keluar_sekunder, $keluar_tritier, $masuk_primer, $masuk_sekunder, $masuk_tritier]
        );

        // @XIdTransaksi  integer, @XIdType  varchar(20), @XUserACC char(7), @XWaktuACC  datetime = null, @XKeluarPrimer  numeric(9,2), @XKeluarSekunder  numeric(9,2), @XKeluarTritier  numeric(9,2), @XMasukPrimer  numeric(9,2), @XMasukSekunder  numeric(9,2), @XMasukTritier  numeric(9,2)
    }

    public function updACCKonversiNG($id_konversi_ng)
    {
        return DB::connection('ConnExtruder')->statement(
            'exec SP_5298_EXT_ACC_KONVERSI_NG @IdKonversiNG = ?, @UserAcc = ' . Auth::user()->NomorUser,
            [$id_konversi_ng]
        );

        // @IdKonversiNG int, @UserAcc char(7)
    }
    #endregion

    #region Benang - Mohon
    public function getListDataNG($id_konversi, $tanggal)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LISTDATA_NG @IdKonversi = ?, @Tanggal = ?',
            [$id_konversi, $tanggal]
        );

        // @IdKonversi int, @Tanggal datetime

        /**
         * IdKonversiNG, IdKonversiEXT, AwalShift, AkhirShift, NamaKomposisi, Tanggal, IdKonversiINV
         * 1	EXT-0000009013	2023-08-25 12:00:00.000	2023-08-25 23:00:00.000	namaKom1	2023-08-22 00:00:00.000	INV0001
         * 2	EXT-0000009032	2023-08-25 01:00:00.000	2023-08-25 02:00:00.000	namaKom1	2023-08-22 00:00:00.000	INV0002
         * 3	EXT-0000009043	2023-08-25 00:00:00.000	2023-08-25 00:00:00.000	namaKom1	2023-08-22 00:00:00.000	INV0003
         *
         * MasterKonversiEXT.IdKonversi - MasterKonversiNG.IdKonversiEXT
         * (EXT-0000009013, EXT-0000009032, EXT-0000009043)
         *
         * MasterKonversiEXT.IdKomposisi - MasterKomposisi.IdKomposisi
         * (DEX000013)
         *
         * MasterKonversiNG.IdKonversiNG - DetailKonversiNG.IdKonversiNG
         * (1, 2, 3)
         */
    }

    public function getDetailUraianKonvNG($id_konversi)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_DETAILURAIAN_KONV_NG @IdKonversi = ?',
            [$id_konversi]
        );

        // @IdKonversi char(9)

        /**
         * IdKonversiNG, TypeMesin + '/' + Shift, Tanggal
         * 1	type1/P 	2023-08-22 00:00:00.000
         * 2	type1/P 	2023-08-22 00:00:00.000
         * 3	type1/P 	2023-08-22 00:00:00.000
         *
         * MasterKonversiEXT.IdMesin - MasterMesin.IdMesin
         * (M-001, mes01)
         *
         * MasterKonversiEXT.IdKonversi - MasterKonversiNG.IdKonversiEXT
         * (EXT-0000009013, EXT-0000009032, EXT-0000009043)
         *
         * MasterKonversiNG.IdKonversiNG - DetailKonversiNG.IdKonversiNG
         * (1, 2, 3)
         */
    }

    public function getKoreksiSortirNGBlmAcc($tanggal)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_KOREKSI_SORTIRNG_BLMACC @Tanggal = ?',
            [$tanggal]
        );

        // @Tanggal datetime
    }

    public function getListProdNG($no_konv)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_PROD_NG @NoKonv = ?',
            [$no_konv]
        );

        // @NoKonv char(14)
    }

    public function getCekDataNG($kode, $no_konv, $id_type)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_CEK_DATA_NG @kode = ?, @noKonv = ?, @idType = ?',
            [$kode, $no_konv, $id_type]
        );

        // @kode int, @noKonv char(14), @idType varchar(20)
    }

    public function getListIdKonv1($id_divisi, $tanggal, $shift)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_IDKONV @Kode = 1, @IdDivisi = ?, @Tanggal = ?, @Shift = ?',
            [$id_divisi, $tanggal, $shift]
        );

        // @IdDivisi char(3)=null, @Tanggal datetime=null, @Shift char(2)=null
    }

    public function getListIdKonv3($id_konversi, $id_type)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_IDKONV @Kode = 3, @IdKonversi = ?, @idType = ?',
            [$id_konversi, $id_type]
        );

        // @IdKonversi char(14)=null, @idType char(20)=null
        // dd($this->getListIdKonv(3, 'KONV0001', 'type1'));
    }

    public function insMasterKonvNG($tanggal, $id_konversi_ext)
    {
        return DB::connection('ConnExtruder')->statement(
            'exec SP_5298_EXT_INSERT_MASTERKONV_NG @Tanggal = ?, @UserInput = ' . Auth::user()->NomorUser . ', @IdKonversiEXT = ?',
            [$tanggal, $id_konversi_ext]
        );

        // LAST Belum di-cek
        // @Tanggal datetime, @UserInput Char(7), @IdKonversiEXT Char(14)
    }

    public function getMasterKonversiNG()
    {
        $idKonversiNG = DB::connection('ConnExtruder')
            ->select('SELECT IdKonversiNG FROM MasterKonversiNG ORDER BY IdKonversiNG DESC');

        return $idKonversiNG[0];

        // *Query SELECT pada SP_5298_EXT_INSERT_MASTERKONV_NG
    }

    public function getListCounter()
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_5298_EXT_LIST_COUNTER'
        );
    }

    public function insDetailKonvNG($id_konversi_ng, $id_type, $jumlah_primer, $jumlah_sekunder, $jumlah_tritier, $id_konv_inv = null)
    {
        return DB::connection('ConnExtruder')->statement(
            'exec SP_5298_EXT_INSERT_DETAILKONV_NG @IdKonversiNG = ?, @IdType = ?, @JumlahPrimer = ?, @JumlahSekunder = ?, @JumlahTritier = ?, @IdKonv_Inv = ?',
            [$id_konversi_ng, $id_type, $jumlah_primer, $jumlah_sekunder, $jumlah_tritier, $id_konv_inv]
        );

        // @IdKonversiNG int, @IdType varchar(20), @JumlahPrimer numeric(9,2), @JumlahSekunder numeric(9,2), @JumlahTritier numeric(9,2), @IdKonv_Inv varchar(10) = null
    }

    public function insAsalTmpTrans($id_type_transaksi, $uraian_detail_transaksi, $id_type, $saat_awal_transaksi, $jumlah_primer, $jumlah_sekunder, $jumlah_tritier, $asal_sub_kel, $id_konversi)
    {
        return DB::connection('ConnInventory')->statement(
            'exec SP_5298_EXT_INSERT_04_ASALTMPTRANSAKSI @XIdTypeTransaksi = ?, @XUraianDetailTransaksi = ?, @XIdType = ?, @XIdPemohon = ' . Auth::user()->NomorUser . ', @XSaatawalTransaksi = ?, @XJumlahKeluarPrimer = ?, @XJumlahKeluarSekunder = ?, @XJumlahKeluarTritier = ?, @XAsalsubKel = ?, @XIdKonversi = ?',
            [$id_type_transaksi, Str::title(str_replace('_', ' ', $uraian_detail_transaksi)), $id_type, $saat_awal_transaksi, $jumlah_primer, $jumlah_sekunder, $jumlah_tritier, $asal_sub_kel, $id_konversi]
        );

        // @XIdTypeTransaksi  char(2), @XUraianDetailTransaksi  varchar(50), @XIdType  varchar(20), @XIdPemohon  char(7), @XSaatawalTransaksi  datetime, @XJumlahKeluarPrimer  numeric(15,2), @XJumlahKeluarSekunder numeric(15,2), @XJumlahKeluarTritier numeric(15,2), @XAsalsubKel  char(6), @XIdKonversi  char(9)
    }

    public function insTujuanTmpTrans($id_type_transaksi, $uraian_detail_transaksi, $id_type, $saat_awal_transaksi, $jumlah_primer, $jumlah_sekunder, $jumlah_tritier, $tujuan_sub_kel, $id_konversi)
    {
        return DB::connection('ConnInventory')->statement(
            'exec SP_5298_EXT_INSERT_04_TUJUANTMPTRANSAKSI @XIdTypeTransaksi = ?, @XUraianDetailTransaksi = ?, @XIdType = ?, @XIdPemohon = ' . Auth::user()->NomorUser . ', @XSaatawalTransaksi = ?, @XJumlahMasukPrimer = ?, @XJumlahMasukSekunder = ?, @XJumlahMasukTritier = ?, @XTujuansubKel = ?, @XIdKonversi = ?',
            [$id_type_transaksi, Str::title(str_replace('_', ' ', $uraian_detail_transaksi)), $id_type, $saat_awal_transaksi, $jumlah_primer, $jumlah_sekunder, $jumlah_tritier, $tujuan_sub_kel, $id_konversi]
        );

        // @XIdTypeTransaksi  char(2), @XUraianDetailTransaksi  varchar(50), @XIdType  varchar(20), @XIdPemohon  char(7), @XSaatawalTransaksi  datetime, @XJumlahMasukPrimer  numeric(15,2), @XJumlahMasukSekunder numeric(15,2), @XJumlahMasukTritier numeric(15,2), @XtujuansubKel  char(6), @XIdKonversi  char(9)
    }

    public function updDetailKonvNG($id_konversi, $id_type, $j_primer, $j_sekunder, $j_tritier)
    {
        return DB::connection('ConnExtruder')->statement(
            'exec SP_5298_EXT_UPDATE_DETAIL_KONV_NG @idkonversi = ?, @idType = ?, @jprimer = ?, @jsekunder = ?, @jtritier = ?',
            [$id_konversi, $id_type, $j_primer, $j_sekunder, $j_tritier]
        );

        // @idkonversi int, @idType varchar(20), @jprimer numeric(18,2), @jsekunder numeric(18,2), @jtritier numeric(18,2)
    }

    public function updTmpTransaksi($id_transaksi, $uraian_detail_transaksi, $jumlah_keluar_primer, $jumlah_keluar_sekunder, $jumlah_keluar_tritier, $tujuan_sub_kelompok = null)
    {
        return DB::connection('ConnInventory')->statement(
            'exec SP_5298_EXT_UPDATE_TMPTRANSAKSI @XIdTransaksi = ?, @XUraianDetailTransaksi = ?, @XJumlahKeluarPrimer = ?, @XJumlahKeluarSekunder = ?, @XJumlahKeluarTritier = ?, @XTujuanSubKelompok = ?',
            [$id_transaksi, Str::title(str_replace('_', ' ', $uraian_detail_transaksi)), $jumlah_keluar_primer, $jumlah_keluar_sekunder, $jumlah_keluar_tritier, $tujuan_sub_kelompok]
        );

        // @XIdTransaksi       int, @XUraianDetailTransaksi varchar (150) = null, @XJumlahKeluarPrimer numeric (9,2), @XJumlahKeluarSekunder numeric (9,2), @XJumlahKeluarTritier numeric (9,2), @XTujuanSubKelompok char (6) =null
    }

    public function delKonversiNG($id_konversi)
    {
        return DB::connection('ConnExtruder')->statement(
            'exec SP_5409_EXT_DELETE_KONVERSI_NG @idkonversi = ?',
            [$id_konversi]
        );

        // @idkonversi varchar(14)
    }
    #endregion

    #region Form Rincian Konversi
    public function getKelompokUtama_IdObjek($id_objek_kelompok_utama, $type = null)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_5298_EXT_IDOBJEK_KELOMPOKUTAMA @Xidobjek_kelompokutama = ?, @Type = ?',
            [$id_objek_kelompok_utama, $type]
        );

        // dd($this->getIdObjKelUtama("032", "3"));
        // @Xidobjek_kelompokutama  varchar(4), @Type char(1) = null
    }

    public function getKelompok_IdKelut($id_kelompok_utama_kelompok, $type = null)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_5298_EXT_IDKELOMPOKUTAMA_KELOMPOK @XIdKelompokUtama_Kelompok = ?, @type = ?',
            [$id_kelompok_utama_kelompok, $type]
        );

        // @XIdKelompokUtama_Kelompok    char (4), @type char(1)=null
    }

    public function getSubKelompok_IdKelompok($id_kelompok_sub_kelompok)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_5298_EXT_IDKELOMPOK_SUBKELOMPOK @XIdKelompok_SubKelompok = ?',
            [$id_kelompok_sub_kelompok]
        );

        // @XIdKelompok_SubKelompok    char (6)
    }

    public function getType_IdSubkel($id_sub_kelompok_type)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_5298_EXT_IDSUBKELOMPOK_TYPE @XIdSubKelompok_Type = ?',
            [$id_sub_kelompok_type]
        );

        // @XIdSubKelompok_Type     char (6)
    }

    public function getSaldoBarang($id_type)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_5298_EXT_SALDO_BARANG @IdType = ?',
            [$id_type]
        );

        // @IdType char(20)
    }
    #endregion
}
