<?php

namespace App\Http\Controllers\Extruder\ExtruderNet;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use Illuminate\Support\Facades\DB;

class PencatatanController extends Controller
{
    public function index($form_name)
    {
        $view_name = 'extruder.ExtruderNet.' . $form_name;
        $form_data = [];

        switch ($form_name) {
            case 'formCatatGangguan':
                $form_data = [
                    'listMesin' => $this->getListMesin(1),
                    'listGangguan' => $this->getListGangguan(),
                ];
                break;
            case 'formCatatDaya':
                $form_data = ['listMesin' => $this->getListMesin(1)];
                break;
            case 'formCatatEffisiensi':
                $form_data = ['listMesin' => $this->getListMesin(1)];
                break;
            case 'formCatatPerawatan':
                $form_data = [
                    'listPerawatan' => $this->getListJnsPerawatan("EXT"),
                    'listMesin' => $this->getListMesin(1),
                ];
                break;

            default:
                break;
        }

        $view_data = [
            'pageName' => 'ExtruderNet',
            'formName' => $form_name,
            'formData' => $form_data,
        ];


        return view($view_name, $view_data);
    }

    #region Perawatan
    public function getListJnsPerawatan($id_divisi)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_JNS_PERAWATAN @IdDivisi = ?',
            [$id_divisi]
        );

        // @IdDivisi char(3)
    }

    public function getListWinder($id_perawatan = null, $id_mesin = null)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_WINDER @idperawatan = ?, @idmesin = ?',
            [$id_perawatan, $id_mesin]
        );

        // @idperawatan int =null, @idmesin varchar(5) =null
    }

    public function getJenisGangguan($id_perawatan)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_JENIS_GANGGUAN @IdPerawatan = ?',
            [$id_perawatan]
        );

        // @IdPerawatan int
    }

    public function insPerawatan($tanggal, $shift, $waktu, $id_perawatan, $id_mesin, $no_winder, $gangguan, $sebab, $solusi, $mulai, $selesai, $id_gangguan = null)
    {
        return DB::connection('ConnExtruder')->statement(
            'exec SP_5298_EXT_INSERT_PERAWATAN @tanggal = ?, @userId = '. Auth::user()->NomorUser.', @shift = ?, @waktu = ?, @IdPerawatan = ?, @idmesin = ?, @nowinder = ?, @idGangguan = ?, @gangguan = ?, @sebab = ?, @solusi = ?, @mulai = ?, @selesai = ?, @userinput = '. Auth::user()->NomorUser,
            [$tanggal, $shift, str_replace('_', ' ', $waktu), $id_perawatan, $id_mesin, $no_winder, $id_gangguan, str_replace('_', ' ', $gangguan), str_replace('_', ' ', $sebab), str_replace('_', ' ', $solusi), $mulai, $selesai]
        );

        // @tanggal datetime, @userId char(4), @shift char(1), @waktu varchar(15), @IdPerawatan int, @idmesin char(5), @nowinder char(5), @idGangguan int=null, @gangguan varchar(200), @sebab varchar(200), @solusi varchar(200), @mulai datetime, @selesai datetime, @userinput varchar(7)
    }

    public function updPerawatan($shift, $waktu, $id_perawatan, $id_mesin, $no_winder, $gangguan, $sebab, $solusi, $mulai, $selesai, $kode, $id_gangguan = null)
    {
        return DB::connection('ConnExtruder')->statement(
            'exec SP_5298_EXT_UPDATE_PERAWATAN @shift = ?, @waktu = ?, @IdPerawatan = ?, @idmesin = ?, @nowinder = ?, @idGangguan = ?, @gangguan = ?, @sebab = ?, @solusi = ?, @mulai = ?, @selesai = ?, @Kode = ?, @userkoreksi = '. Auth::user()->NomorUser,
            [$shift, str_replace('_', ' ', $waktu), $id_perawatan, $id_mesin, $no_winder, $id_gangguan, str_replace('_', ' ', $gangguan), str_replace('_', ' ', $sebab), str_replace('_', ' ', $solusi), $mulai, $selesai, $kode]
        );

        // @shift char(1), @waktu varchar(15), @IdPerawatan int, @idmesin char(5), @nowinder char(5), @idGangguan int=null, @gangguan varchar(200), @sebab varchar(200), @solusi varchar(200), @mulai datetime, @selesai datetime, @Kode int, @userkoreksi char(4) = null
    }

    public function delPerawatan($kode)
    {
        return DB::connection('ConnExtruder')->statement(
            'exec SP_5298_EXT_DELETE_PERAWATAN @Kode = ?',
            [$kode]
        );

        // @Kode int
    }

    public function getJenisPenyebab($id_perawatan)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5409_EXT_JENIS_PENYEBAB @IdPerawatan = ?',
            [$id_perawatan]
        );

        // @IdPerawatan int
    }

    public function getJenisPenyelesaian($id_perawatan)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5409_EXT_JENIS_PENYELESAIAN @IdPerawatan = ?',
            [$id_perawatan]
        );

        // @IdPerawatan int
    }

    public function getDataPerawatan($tanggal)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_DATA_PERAWATAN @Tanggal = ?, @userId = ?',
            [$tanggal, Auth::user()->NomorUser]
        );

        // @Tanggal datetime, @userId char(4)
    }
    #endregion

    #region Efisiensi
    public function getListAwalProdEff($tanggal, $no_mesin, $shift)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_AWALPROD_EFF @tanggal = ?, @NoMesin = ?, @Shift = ?',
            [$tanggal, $no_mesin, $shift]
        );

        // @tanggal datetime, @NoMesin char (5), @Shift char(2)
    }

    public function getListEffisiensi($tanggal, $no_mesin, $shift, $awal_produksi)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_EFFISIENSI @Tanggal = ?, @NoMesin = ?, @Shift = ?, @AwalProduksi = ?',
            [$tanggal, $no_mesin, $shift, str_replace('T', ' ', $awal_produksi)]
        );

        // @Tanggal datetime, @NoMesin char(5), @Shift char(2), @AwalProduksi datetime
    }

    public function getListIdKonversi($tanggal, $no_mesin, $shift)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_IDKONVERSI @tanggal = ?, @noMesin = ?, @shift = ?',
            [$tanggal, $no_mesin, $shift]
        );

        // @tanggal datetime, @noMesin char(5), @shift char(2)

        /**
         * IdKonversi       NamaKomposisi   SaatLog                 Tanggal                 IdMesin Shift
         * EXT-0000009013	namaKom1	    2023-09-22 00:00:00.000	2023-09-22 00:00:00.000	M-001	P
         * EXT-0000009032	namaKom1	    2023-09-22 00:00:00.000	2023-09-22 00:00:00.000	M-001	P
         * EXT-0000009043	namaKom1	    2023-09-22 00:00:00.000	2023-09-22 00:00:00.000	M-001	P
         * EXT-0000009044	namaKom1	    2023-08-29 00:00:00.000	2023-08-25 00:00:00.000	mes01	P
         * EXT-0000009045	namaKom1	    2023-08-29 00:00:00.000	2023-08-25 00:00:00.000	mes01	P
         */
    }

    public function getCekDataEff($tgl, $mesin, $shift, $awal, $akhir, $id_konversi)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_CEK_DATA_EFF @tgl = ?, @mesin = ?, @shift = ?, @awal = ?, @akhir = ?, @idkonv = ?',
            [$tgl, $mesin, $shift, str_replace('T', ' ', $awal), str_replace('T', ' ', $akhir), $id_konversi]
        );

        // @tgl datetime, @mesin char(5), @shift char(2), @awal datetime, @akhir datetime, @idkonv varchar(14)
    }

    public function insEff($Tanggal, $IdMesin, $Shift, $AwalProduksi, $AkhirProduksi, $IdKonversi, $ScrewRevolution, $MotorCurrent, $SlitterWidth, $NoOfYarn, $WaterGap, $RollSpeed3, $StretchingRatio, $Relax, $Denier, $DenierRata, $JamUser)
    {
        return DB::connection('ConnExtruder')->statement(
            'exec SP_5298_EXT_INSERT_EFF @Tanggal = ?, @IdMesin = ?, @Shift = ?, @AwalProduksi = ?, @AkhirProduksi = ?, @IdKonversi = ?, @ScrewRevolution = ?, @MotorCurrent = ?, @SlitterWidth = ?, @NoOfYarn = ?, @WaterGap = ?, @RollSpeed3 = ?, @StretchingRatio = ?, @Relax = ?, @Denier = ?, @DenierRata = ?, @JamUser = ?, @UserInput = '. Auth::user()->NomorUser,
            [$Tanggal, $IdMesin, $Shift, str_replace('T', ' ', $AwalProduksi), str_replace('T', ' ', $AkhirProduksi), $IdKonversi, $ScrewRevolution, $MotorCurrent, $SlitterWidth, $NoOfYarn, $WaterGap, $RollSpeed3, $StretchingRatio, $Relax, $Denier, $DenierRata, $JamUser]
        );

        // @Tanggal datetime, @IdMesin char(5), @Shift char(2), @AwalProduksi datetime, @AkhirProduksi datetime, @IdKonversi varchar(14), @ScrewRevolution numeric(9,2), @MotorCurrent numeric(9,2), @SlitterWidth numeric(9,2), @NoOfYarn numeric(9,2), @WaterGap numeric(9,2), @RollSpeed3 numeric(9,2), @StretchingRatio numeric(9,2), @Relax numeric(9,2), @Denier numeric(9,2), @DenierRata numeric(9,2), @JamUser datetime, @UserInput char(7)
    }

    public function updEff($Tanggal, $IdMesin, $Shift, $AwalProduksi, $AkhirProduksi, $IdKonversi, $ScrewRevolution, $MotorCurrent, $SlitterWidth, $NoOfYarn, $WaterGap, $RollSpeed3, $StretchingRatio, $Relax, $Denier, $DenierRata, $JamUser)
    {
        return DB::connection('ConnExtruder')->statement(
            'exec SP_5298_EXT_UPDATE_EFF @Tanggal = ?, @IdMesin = ?, @Shift = ?, @AwalProduksi = ?, @AkhirProduksi = ?, @IdKonversi = ?, @ScrewRevolution = ?, @MotorCurrent = ?, @SlitterWidth = ?, @NoOfYarn = ?, @WaterGap = ?, @RollSpeed3 = ?, @StretchingRatio = ?, @Relax = ?, @Denier = ?, @DenierRata = ?, @JamUser = ?, @UserInput = '. Auth::user()->NomorUser,
            [$Tanggal, $IdMesin, $Shift, str_replace('T', ' ', $AwalProduksi), str_replace('T', ' ', $AkhirProduksi), $IdKonversi, $ScrewRevolution, $MotorCurrent, $SlitterWidth, $NoOfYarn, $WaterGap, $RollSpeed3, $StretchingRatio, $Relax, $Denier, $DenierRata, $JamUser]
        );

        // @Tanggal datetime, @IdMesin char(5), @Shift char(2), @AwalProduksi datetime, @AkhirProduksi datetime, @IdKonversi varchar(14), @ScrewRevolution numeric(9,2), @MotorCurrent numeric(9,2), @SlitterWidth numeric(9,2), @NoOfYarn numeric(9,2), @WaterGap numeric(9,2), @RollSpeed3 numeric(9,2), @StretchingRatio numeric(9,2), @Relax numeric(9,2), @Denier numeric(9,2), @DenierRata numeric(9,2), @JamUser datetime, @UserInput char(7)
    }

    public function delEff($Tanggal, $IdMesin, $Shift, $AwalProduksi, $AkhirProduksi)
    {
        return DB::connection('ConnExtruder')->statement(
            'exec SP_5298_EXT_DELETE_EFF @Tanggal = ?, @IdMesin = ?, @Shift = ?, @AwalProduksi = ?, @AkhirProduksi = ?',
            [$Tanggal, $IdMesin, $Shift, str_replace('T', ' ', $AwalProduksi), str_replace('T', ' ', $AkhirProduksi)]
        );

        // @Tanggal datetime, @IdMesin char(5), @Shift char(2), @AwalProduksi datetime, @AkhirProduksi datetime
    }
    #endregion

    #region Daya
    public function getFaktorKali($id_mesin)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_FAKTOR_KALI @idmesin = ?',
            [$id_mesin]
        );

        // @idmesin  varchar(5)
    }

    public function getKwahMesinPerbulan($bulan, $tahun)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_KWAH_MESIN_PERBULAN @bulan = ?, @tahun = ?',
            [$bulan, $tahun]
        );

        // @bulan  varchar(2), @tahun varchar(4)
    }

    public function insKwahMesin($tanggal, $id_mesin, $jam, $counter, $kali, $jam_user)
    {
        return DB::connection('ConnExtruder')->statement(
            'exec SP_5298_EXT_INSERT_KWAH_MESIN @tanggal = ?, @idmesin = ?, @jam = ?, @counter = ?, @kali = ?, @jamuser = ?, @user = '. Auth::user()->NomorUser,
            [$tanggal, $id_mesin, $jam, $counter, $kali, $jam_user]
        );

        // @tanggal  datetime, @idmesin  varchar(5), @jam datetime, @counter  numeric(10,2), @kali  numeric(10,2), @jamuser datetime, @user  varchar(7)
    }

    public function updKwahMesin($id_kwah_mesin, $counter)
    {
        return DB::connection('ConnExtruder')->statement(
            'exec SP_5298_EXT_UPDATE_KWAH_MESIN @idkwahmesin = ?, @counter = ?',
            [$id_kwah_mesin, $counter]
        );

        // @IdKWaHMesin numeric(9,0), @counter  numeric(10,2)
    }

    public function delKwahMesin($id_kwah)
    {
        return DB::connection('ConnExtruder')->statement(
            'exec SP_5298_EXT_DELETE_KWAH_MESIN @IdKwah = ?',
            [$id_kwah]
        );

        // @IdKwah numeric(9,0)
    }

    public function getListDataKwahMesin($bulan, $tahun)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LISTDATA_KWAH_MESIN @bulan = ?, @tahun = ?',
            [$bulan, $tahun]
        );

        // @bulan  varchar(2), @tahun varchar(4)
    }

    public function getKwahMesin($tanggal, $id_divisi)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_KWAH_MESIN @tanggal = ?, @iddivisi = ?',
            [$tanggal, $id_divisi]
        );

        // @tanggal datetime, @iddivisi char(3)
    }
    #endregion

    #region Gangguan
    public function getListMesin($kode)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_MESIN @kode = ?',
            [$kode]
        );

        // If @kode = 1     SELECT * FROM MasterMesin WHERE IdDivisi='EXT'
        // If @kode = 2     SELECT * FROM MasterMesin WHERE IdDivisi='MEX'
        // If @kode = 3     SELECT * FROM MasterMesin WHERE IdDivisi='DEX'
    }

    public function getListIdKomposisi($tanggal, $id_mesin)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_IDKOMPOSISI @tanggal = ?, @idmesin = ?',
            [$tanggal, $id_mesin]
        );

        // @tanggal datetime, @idmesin varchar(5)
    }

    public function getDisplayShift($id_konversi)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_DISPLAY_SHIFT @IdKonversi = ?',
            [$id_konversi]
        );

        // @IdKonversi Varchar(14)
    }

    public function getListGangguan()
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_GANGGUAN',
            []
        );
    }

    public function getListGangguanProd($bulan, $tahun)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5409_EXT_LIST_GANGGUAN_PROD @Bulan = ?, @Tahun = ?',
            [$bulan, $tahun]
        );

        // @Bulan Numeric(10,2), @Tahun Numeric(10,2)
        // dd($this->getListGangguanProd(8, 2023));
    }

    public function getListShift($id_konversi)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_SHIFT @idkonversi = ?',
            [$id_konversi]
        );

        // @idkonversi char(14)
    }

    public function getNoTrans()
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_NO_TRANS',
            []
        );
    }

    public function insGangguanProd($tanggal, $id_mesin, $id_gangguan, $id_konversi = null, $shift, $awal, $akhir, $awal_gangguan, $akhir_gangguan, $jumlah_jam, $jumlah_menit, $status, $keterangan, $jam_user)
    {
        return DB::connection('ConnExtruder')->statement(
            'exec SP_5298_EXT_INSERT_GANGGUAN_PROD @Tanggal = ?, @IdMesin = ?, @IdGangguan = ?, @IdKonversi = ?, @Shift = ?, @Awal = ?, @Akhir = ?, @AwalGangguan = ?, @AkhirGangguan = ?, @JumlahJam = ?, @JumlahMenit = ?, @Status = ?, @Keterangan = ?, @JamUser = ?, @User = '. Auth::user()->NomorUser,
            [$tanggal, $id_mesin, $id_gangguan, $id_konversi, $shift, str_replace('T', ' ', $awal), str_replace('T', ' ', $akhir), str_replace('T', ' ', $awal_gangguan), str_replace('T', ' ', $akhir_gangguan), $jumlah_jam, $jumlah_menit, $status, $keterangan, $jam_user]
        );

        // @Tanggal Datetime, @IdMesin Char(5), @IdGangguan Char(5), @IdKonversi Char(14)=null, @Shift Char(2), @Awal datetime, @Akhir datetime, @AwalGangguan datetime, @AkhirGangguan datetime, @JumlahJam numeric(9, @JumlahMenit numeric(9, @Status Char(1), @Keterangan Varchar(100), @JamUser datetime, @User Char(7)
    }

    public function updGangguanProd($no_trans, $awal, $akhir, $jam, $menit, $ket)
    {
        return DB::connection('ConnExtruder')->statement(
            'exec SP_5298_EXT_UPDATE_GANGGUAN_PROD @NoTrans = ?, @Awal = ?, @Akhir = ?, @Jam = ?, @Menit = ?, @Ket = ?',
            [$no_trans, str_replace('T', ' ', $awal), str_replace('T', ' ', $akhir), $jam, $menit, $ket]
        );

        // @NoTrans int, @Awal datetime, @Akhir datetime, @Jam numeric(9,0), @Menit numeric(9,0), @Ket varchar(100)
    }

    public function delGangguanProd($no_trans)
    {
        return DB::connection('ConnExtruder')->statement(
            'exec SP_5298_EXT_DELETE_GANGGUAN_PROD @NoTrans = ?',
            [$no_trans]
        );

        // @NoTrans int
    }
    #endregion
}
