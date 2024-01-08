<?php

namespace App\Http\Controllers\Extruder\ExtruderNet;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Auth;

class MasterController extends Controller
{
    public function index($form_name, $nama_gedung = null)
    {
        $view_name = 'extruder.ExtruderNet.' . $form_name;
        $form_data = [];

        switch ($form_name) {
            case 'formKomposisiTropodo':
                $form_data = [
                    'listKomposisi' => $this->getListKomposisi('EXT'),
                    'listMesin' => $this->getListMesin(1),
                    'listObjek' => $this->getIdDivisiObjek('EXT')
                ];
                break;

            case 'formKomposisiMojosari':
                $id_hasil = $nama_gedung == "D" ? 2250 : 1994;
                $id_afalan = $nama_gedung == "D" ? 2251 : 1976;
                $id_komposisi = $nama_gedung == "D" ? 'DEX' : 'MEX';
                $kode_mesin = $nama_gedung == "D" ? 3 : 2;

                $form_data = [
                    'listKomposisi' => $this->getListKomposisi($id_komposisi),
                    'listMesin' => $this->getListMesin($kode_mesin),
                    'listAfalan' => $this->getPrgTypeProduksi(1, $id_afalan),
                    'listObjek' => $this->getIdDivisiObjek($id_komposisi),
                    'listHP' => $this->getPrgTypeProduksi(2, $id_hasil),
                    'listNG' => $this->getPrgTypeProduksi(3, $id_hasil)
                ];
                break;

            case 'formKiteEstimasi':
                $form_data = ['listBarang' => $this->getKiteExtruder(2)];
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

    #region KITE
    public function getCekBahanKite($kode)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_1273_EXT_Cek_Bahan_KITE @Kode = ?',
            [$kode]
        );

        // @Kode char(1)
    }

    public function getKiteExtruder($kode, $tgl_start = null, $kode_barang = null, $jenis_fas = null, $bahan_pp = null, $benang = null, $meter = null, $roll = null, $meter_awal = null, $hasil = null, $id_order = null, $caco3 = null)
    {
        if ($kode == '1' || $kode == '7') {
            return DB::connection('ConnExtruder')->statement(
                'exec SP_1273_EXT_KITE @Kode = ?, @TglStart = ?, @KodeBarang = ?, @JenisFas = ?, @BahanPP = ?, @Benang = ?, @Meter = ?, @Roll = ?, @MeterAwal = ?, @Hasil = ?, @IdOrder = ?, @CaCO3 = ?',
                [$kode, $tgl_start, $kode_barang, $jenis_fas, $bahan_pp, $benang, $meter, $roll, $meter_awal, $hasil, $id_order, $caco3]
            );
        } else {
            return DB::connection('ConnExtruder')->select(
                'exec SP_1273_EXT_KITE @Kode = ?, @TglStart = ?, @KodeBarang = ?, @JenisFas = ?, @BahanPP = ?, @Benang = ?, @Meter = ?, @Roll = ?, @MeterAwal = ?, @Hasil = ?, @IdOrder = ?, @CaCO3 = ?',
                [$kode, $tgl_start, $kode_barang, $jenis_fas, $bahan_pp, $benang, $meter, $roll, $meter_awal, $hasil, $id_order, $caco3]
            );
        }

        // @Kode char(1), @TglStart date = null, @KodeBarang char(9) = null, @JenisFas varchar(50) = null, @BahanPP decimal(18,0) = null, @Benang decimal(18,2) = null, @Meter decimal(18,0) = null, @Roll decimal(18,0) = null, @MeterAwal decimal(18,2) = null, @Hasil decimal(18,2) = null, @IdOrder int = null, @CaCO3 decimal(18,2) = null
    }

    public function getKiteExtOrder($kode, $id_order)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_1273_EXT_KITE @Kode = ?, @IdOrder = ?',
            [$kode, $id_order]
        );
    }

    public function getKiteExtruder7($id_order, $tgl_start, $bahan_pp, $caco3, $benang)
    {
        return DB::connection('ConnExtruder')->statement(
            'exec SP_1273_EXT_KITE @Kode = 7, @IdOrder = ?, @TglStart = ?, @BahanPP = ?, @CaCO3 = ?, @Benang = ?',
            [$id_order, $tgl_start, $bahan_pp, $caco3, $benang]
        );
    }
    #endregion

    #region Mojosari
    public function getListKomposisiBahanMjs($id_komposisi)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_1273_EXT_LIST_KOMPOSISI_BAHAN @IdKomposisi = ?',
            [$id_komposisi]
        );

        // @IdKomposisi char(9)
    }

    public function getCekJumlahKomposisi($kode, $id_komposisi, $id_kelompok = null, $jns = null, $persentase = null)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_1273_MEX_CEK_JumlahKomposisi @Kode = ?, @IdKomposisi = ?, @IdKelompok = ?, @Jns = ?, @persentase = ?',
            [$kode, $id_komposisi, $id_kelompok, $jns, $persentase]
        );

        // @Kode char(1), @IdKomposisi char(9), @IdKelompok char(4) = null, @Jns char(3) = null, @persentase numeric(9,2) = null
    }

    public function getPrgBomBarang($kode, $kode_barang = null, $id_komposisi = null, $id_kelompok = null, $id_divisi = null, $mesin = null)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_1273_PRG_BOM_Barang @Kode = ?, @KodeBarang  = ?, @IdKomposisi = ?, @IdKelompok = ?, @IdDivisi = ?, @Mesin = ?',
            [$kode, $kode_barang, $id_komposisi, $id_kelompok, $id_divisi, $mesin]
        );

        // @Kode char(2), @KodeBarang  char(9) = null, @IdKomposisi char(9) = null, @IdKelompok char(6) = null, @IdDivisi char(3) = null, @Mesin varchar(50) = null
    }

    public function insKomposisiBahanMjs($kode, $id_komposisi, $id_type = null, $kd_brg = null, $id_divisi = null, $persentase = null, $primer = null, $sekunder = null, $tritier = null, $cadangan = null, $tmp_tritir = null, $id_type1 = null)
    {
        if ($kode == "3") {
            return DB::connection('ConnInventory')->select(
                'exec SP_1273_MEX_INSERT_KOMPOSISI_BAHAN @Kode = ?, @IdKomposisi = ?, @IdType = ?, @KdBrg = ?, @IdDivisi = ?, @Persentase = ?, @Primer = ?, @Sekunder = ?, @Tritier = ?, @Cadangan = ?, @TmpTritir = ?, @IdType1 = ?',
                [$kode, $id_komposisi, $id_type, $kd_brg, $id_divisi, $persentase, $primer, $sekunder, $tritier, $cadangan, $tmp_tritir, $id_type1]
            );
        } else {
            return DB::connection('ConnInventory')->statement(
                'exec SP_1273_MEX_INSERT_KOMPOSISI_BAHAN @Kode = ?, @IdKomposisi = ?, @IdType = ?, @KdBrg = ?, @IdDivisi = ?, @Persentase = ?, @Primer = ?, @Sekunder = ?, @Tritier = ?, @Cadangan = ?, @TmpTritir = ?, @IdType1 = ?',
                [$kode, $id_komposisi, $id_type, $kd_brg, $id_divisi, $persentase, $primer, $sekunder, $tritier, $cadangan, $tmp_tritir, $id_type1]
            );
        }


        // @Kode char(1), @IdKomposisi  varchar(9), @IdType  varchar(20) = null, @KdBrg  varchar(9)=null, @IdDivisi char(3)=null, @Persentase numeric(9,2) = null, @Primer numeric(9,2)= null, @Sekunder numeric(9,2)= null, @Tritier numeric(9,2)= null, @Cadangan int=null, @TmpTritir numeric(9,2) = null, @IdType1 varchar(20) = null
    }

    public function delKomposisiBahanMjs($id_komposisi)
    {
        return DB::connection('ConnExtruder')->statement(
            'exec SP_1273_MEX_DELETE_KOMPOSISI_BAHAN @idkomposisi = ?',
            [$id_komposisi]
        );

        // @idkomposisi  varchar(9)
    }

    public function getPrgTypeProduksi($kode, $id_kelut)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_1273_PRG_TypeProduksi @Kode = ?, @IdKelut = ?',
            [$kode, $id_kelut]
        );

        // @Kode char(1), @IdKelut  char(4)
    }
    #endregion

    #region Tropodo
    public function getListKomposisiBahan($id_komposisi)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_KOMPOSISI_BAHAN @IdKomposisi = ?',
            [$id_komposisi]
        );

        // @IdKomposisi char(9)
    }

    public function getDetailBahan($id_type)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_5298_EXT_DETAIL_BAHAN @idtype = ?',
            [$id_type]
        );

        // @idtype varchar(20)
    }

    public function getListKomposisi($id_divisi, $id_komposisi = null)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_KOMPOSISI_1 @iddivisi = ?, @idkomposisi = ?',
            [$id_divisi, $id_komposisi]
        );

        // @iddivisi char(3), @idkomposisi char(9) = null
    }

    public function getListMesin($kode)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_MESIN @kode = ?',
            [$kode]
        );

        // @kode integer
    }

    public function getIdDivisiObjek($id_divisi)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_5298_EXT_IDDIVISI_OBJEK @XIdDivisi_Objek = ?',
            [$id_divisi]
        );

        // @XIdDivisi_Objek     char (3)
    }

    public function getIdObjekKelompokUtama($id_objek, $type = null)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_5298_EXT_IDOBJEK_KELOMPOKUTAMA @Xidobjek_kelompokutama = ?, @Type = ?',
            [$id_objek, $type]
        );

        // @Xidobjek_kelompokutama  varchar(4), @Type char(1) = null
    }

    public function getIdKelompokUtamaKelompok($id_kelompok_utama, $type = null)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_5298_EXT_IDKELOMPOKUTAMA_KELOMPOK @XIdKelompokUtama_Kelompok = ?, @type = ?',
            [$id_kelompok_utama, $type]
        );

        // @XIdKelompokUtama_Kelompok    char (4), @type char(1)=null
    }

    public function getCekKelompokMesin($id_kel)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_CEK_KELOMPOK_MESIN @idkel = ?',
            [$id_kel]
        );

        // @idkel char(4)
    }

    public function getIdKelompokSubKelompok($id_kelompok)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_5298_EXT_IDKELOMPOK_SUBKELOMPOK @XIdKelompok_SubKelompok = ?',
            [$id_kelompok]
        );

        // @XIdKelompok_SubKelompok    char (6)
    }

    public function getIdSubKelompokType($id_sub_kelompok)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_5298_EXT_IDSUBKELOMPOK_TYPE @XIdSubKelompok_Type = ?',
            [$id_sub_kelompok]
        );

        // @XIdSubKelompok_Type     char (6)
    }

    public function getCekKonversi($id_komposisi, $id_type)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5409_EXT_CEK_KONVERSI @idkomposisi = ?, @idtype = ?',
            [$id_komposisi, $id_type]
        );

        // @idkomposisi char(9), @idtype char(20)
    }

    public function getIdMesin($id_kel)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_IDMESIN @idkel = ?',
            [$id_kel]
        );

        // @idkel char(4)
    }

    public function delKomposisiBahan1($id_komposisi, $id_type)
    {
        return DB::connection('ConnExtruder')->statement(
            'exec SP_5298_EXT_DELETE_KOMPOSISI_BAHAN_1 @idkomposisi = ?, @idtype = ?',
            [$id_komposisi, $id_type]
        );

        // @idkomposisi varchar(10), @idtype varchar(20)
    }

    public function insKomposisiBahan($id_komposisi, $id_objek, $nama_objek, $id_kelompok_utama, $nama_kelompok_utama, $id_kelompok, $nama_kelompok, $id_sub_kelompok, $nama_sub_kelompok, $id_type, $nama_type, $kd_brg = null, $jumlah_primer, $sat_primer = null, $jumlah_sekunder, $sat_sekunder = null, $jumlah_tritier, $sat_tritier = null, $persentase, $status_type, $cadangan = 0)
    {
        return DB::connection('ConnExtruder')->statement(
            'exec SP_5298_EXT_INSERT_KOMPOSISI_BAHAN @IdKomposisi = ?, @IdObjek = ?, @NamaObjek = ?, @IdKelompokUtama = ?, @NamaKelompokUtama = ?, @IdKelompok = ?, @NamaKelompok = ?, @IdSubKelompok = ?, @NamaSubKelompok = ?, @IdType = ?, @NamaType = ?, @KdBrg = ?, @JumlahPrimer = ?, @SatPrimer = ?, @JumlahSekunder = ?, @SatSekunder = ?, @JumlahTritier = ?, @SatTritier = ?, @Persentase = ?, @StatusType = ?, @Cadangan = ?',
            [$id_komposisi, $id_objek, str_replace('_', ' ', str_replace('/', '~', $nama_objek)), $id_kelompok_utama, str_replace('_', ' ', str_replace('/', '~', $nama_kelompok_utama)), $id_kelompok, str_replace('_', ' ', str_replace('/', '~', $nama_kelompok)), $id_sub_kelompok, str_replace('_', ' ', str_replace('/', '~', $nama_sub_kelompok)), $id_type, str_replace('_', ' ', str_replace('/', '~', $nama_type)), $kd_brg, $jumlah_primer, $sat_primer, $jumlah_sekunder, $sat_sekunder, $jumlah_tritier, $sat_tritier, $persentase, $status_type, $cadangan]
        );

        // @IdKomposisi  varchar(9), @IdObjek  varchar(3), @NamaObjek  varchar(50), @IdKelompokUtama  char(4), @NamaKelompokUtama  varchar(50), @IdKelompok  char(4), @NamaKelompok  varchar(50), @IdSubKelompok  char(6), @NamaSubKelompok  varchar(50), @IdType  varchar(20), @NamaType  varchar(100), @KdBrg  varchar(9)=null, @JumlahPrimer numeric(9,2), @SatPrimer  varchar(4)=null, @JumlahSekunder numeric(9,2), @SatSekunder  varchar(4)=null, @JumlahTritier numeric(9,2), @SatTritier  varchar(4)=null, @Persentase numeric(9,2), @StatusType  char(2), @Cadangan int = 0
    }

    public function delKomposisiBahan($id_komposisi)
    {
        return DB::connection('ConnExtruder')->statement(
            'exec SP_5298_EXT_DELETE_KOMPOSISI_BAHAN @idkomposisi = ?',
            [$id_komposisi]
        );

        // @idkomposisi  varchar(9)
    }

    public function insMasterKomposisi($nama_komposisi, $id_mesin, $id_divisi, $user = null)
    {
        return DB::connection('ConnExtruder')->statement(
            'exec SP_5298_EXT_INSERT_MASTER_KOMPOSISI @NamaKomposisi = ?, @idmesin = ?, @iddivisi = ?, @user = '. Auth::user()->NomorUser,
            [str_replace('~', '/', strtoupper(str_replace('_', ' ', $nama_komposisi))), $id_mesin, $id_divisi, $user]
        );

        // @NamaKomposisi varchar(100), @idmesin varchar(5), @iddivisi char(3), @user varchar(4)=null
    }

    public function getMasterKomposisi($id_divisi)
    {
        $mCounter = DB::connection('ConnExtruder')
            ->table('CounterTrans')
            ->where('divisi', $id_divisi)
            ->value(DB::raw('ISNULL(MAX(IdKomposisi), 0) + 1'));

        $mCode = str_pad($mCounter, 9, '0', STR_PAD_LEFT);
        $mCode = $id_divisi . substr($mCode, -6);

        return response()->json(['NoKomposisi' => $mCode]);

        // *Query SELECT pada SP_5298_EXT_INSERT_MASTER_KOMPOSISI
    }

    public function updIdKomposisiCounter($id_divisi)
    {
        return DB::connection('ConnExtruder')->statement(
            'exec SP_5298_EXT_UPDATE_IDKOMPOSISI_COUNTER @iddivisi = ?',
            [$id_divisi]
        );

        // @iddivisi char(3)
    }

    public function getCekKomposisi($id)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_CEK_KOMPOSISI @id = ?',
            [$id]
        );

        // @id char(9)
    }

    public function delMasterKomposisi($id_komposisi)
    {
        return DB::connection('ConnExtruder')->statement(
            'exec SP_5298_EXT_DELETE_MASTER_KOMPOSISI @idkomposisi = ?',
            [$id_komposisi]
        );

        // @idkomposisi  varchar(9)
    }
    #endregion
}
