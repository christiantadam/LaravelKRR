<?php

namespace App\Http\Controllers\Extruder\ExtruderNet;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Auth;

class KonversiController extends Controller
{
    public function index($form_name, $nama_gedung = null)
    {
        $view_name = 'extruder.Extruder.' . $form_name;
        $form_data = [];

        $id_divisi = "";
        $kode_mesin = "";
        switch ($nama_gedung) {
            case 'B':
                $id_divisi = 'MEX';
                $kode_mesin = 2;
                break;

            default:
                $id_divisi = 'EXT';
                $kode_mesin = 1;
                break;
        }

        switch ($form_name) {
            case 'formKonversiMohon':
                $form_data = [
                    'listKonversi' => $this->getListKonversi($id_divisi),
                    'listMesin' => $this->getListMesin($kode_mesin),
                    'listNoOrder' => $this->getOrdAccBlmSelesai($id_divisi)
                ];
                break;

            default:
                break;
        }

        $form_data['namaGedung'] = $nama_gedung;
        $view_data = [
            'pageName' => 'Extruder',
            'formName' => $form_name,
            'formData' => $form_data,
        ];

        return view($view_name, $view_data);
    }

    #region Konversi - ACC
    public function getListKonvBlmAcc($id_divisi)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_KONV_BLM_ACC @IdDivisi = ?',
            [$id_divisi]
        );

        // @IdDivisi char(3)
    }

    public function getListKonvDetail($id_konversi)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_KONV_DETAIL_1 @IdKonversi = ?',
            [$id_konversi]
        );

        // @IdKonversi varchar(14)
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

    public function getTransaksiKonversi($id_konv_ext)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_5409_EXT_DISPLAY_TRANSAKSI_KONVERSI @idkonvext = ?',
            [$id_konv_ext]
        );

        // @idkonvext  varchar(14)
        // dd($this->getTransaksiKonversi('EXT-0000009043'));
    }

    public function getJumlahHutang($id_type, $subkel, $shift, $tgl)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_5298_EXT_AMBIL_JUMLAH_HUTANG @idType = ?, @subKel = ?, @shift = ?, @tgl = ?',
            [$id_type, $subkel, $shift, $tgl]
        );

        // @idType char(20), @subKel char(6), @shift char(1), @tgl varchar(10)
        // dd($this->getJumlahHutang('5', 'sub1', 'P', '07-09-23'));
        // dd($this->getJumlahHutang('type3', '123456', 'T', 'is is a '));
    }

    public function updProsesACCKonversi($id_transaksi, $id_type, $waktu_acc, $keluar_primer, $keluar_sekunder, $keluar_tritier, $masuk_primer, $masuk_sekunder, $masuk_tritier)
    {
        return DB::connection('ConnInventory')->statement(
            'exec SP_5298_EXT_PROSES_ACC_KONVERSI @XIdTransaksi = ?, @XIdType = ?, @XUserACC = ' . Auth::user()->NomorUser . ', @XWaktuACC = ?, @XKeluarPrimer = ?, @XKeluarSekunder = ?, @XKeluarTritier = ?, @XMasukPrimer = ?, @XMasukSekunder = ?, @XMasukTritier = ?',
            [$id_transaksi, $id_type, $waktu_acc, str_replace("_", ".", $keluar_primer), str_replace("_", ".", $keluar_sekunder), str_replace("_", ".", $keluar_tritier), str_replace("_", ".", $masuk_primer), str_replace("_", ".", $masuk_sekunder), str_replace("_", ".", $masuk_tritier)]
        );

        // @XIdTransaksi  integer, @XIdType  varchar(20), @XUserACC char(7), @XWaktuACC  datetime = null, @XKeluarPrimer  numeric(9,2), @XKeluarSekunder  numeric(9,2), @XKeluarTritier  numeric(9,2), @XMasukPrimer  numeric(9,2), @XMasukSekunder  numeric(9,2), @XMasukTritier  numeric(9,2)
    }

    public function getIdTransInv($id_type, $subkel, $tgl, $shift)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_5298_EXT_GET_IDTRANS_INV @idType = ?, @subKel = ?, @tgl = ?, @shift = ?',
            [$id_type, $subkel, $tgl, $shift]
        );

        // @idType char(20), @subKel char(6), @tgl varchar(10), @shift char(1)
        // dd($this->getIdTransInv(1, 123456, 'P', '07-09-23'));
    }

    public function updProsesHutang($id_type, $subkel, $id_inv)
    {
        return DB::connection('ConnInventory')->statement(
            'exec SP_5298_EXT_PROSES_UPDATE_HUTANG @idType = ?, @subKel = ?, @idINV = ?, @Pemberi = ' . Auth::user()->NomorUser,
            [$id_type, $subkel, $id_inv]
        );

        // @idType char(20), @subKel char(6), @idINV char(9), @Pemberi char(4)
    }

    public function updACCMasterKonv($id_konversi)
    {
        return DB::connection('ConnExtruder')->statement(
            'exec SP_5298_EXT_ACC_MASTER_KONVERSI @idkonversi = ?, @useracc = ' . Auth::user()->NomorUser,
            [$id_konversi]
        );

        // @idkonversi varchar(14), @useracc varchar(4)
    }

    public function updSaldoOrderDetail($id_order, $no_urut_order, $primer, $sekunder, $tritier)
    {
        return DB::connection('ConnExtruder')->statement(
            'exec SP_5298_EXT_UPDATE_SALDO_ORDER_DETAIL @idorder = ?, @nourutorder = ?, @primer = ?, @sekunder = ?, @tritier = ?',
            [$id_order, $no_urut_order, str_replace("_", ".", $primer), str_replace("_", ".", $sekunder), str_replace("_", ".", $tritier)]
        );

        // @idorder varchar(10), @nourutorder int, @primer numeric(9,2), @sekunder numeric(9,2), @tritier numeric(9,2)
    }

    public function getSaldoOrderDetail($id_order, $no_urut_order)
    {
        $order_detail = DB::connection('ConnExtruder')
            ->select('SELECT * FROM OrderDetailEXT WHERE idorder = ? AND nourutorder = ?', [$id_order, $no_urut_order]);

        if (!$order_detail) {
            return response()->json(['error' => 'Order detail not found'], 404);
        }

        // dd($order_detail);

        $order_tritier = $order_detail[0]->JumlahTritier;
        $konversi_tritier = $order_detail[0]->JumlahProduksiTritier;
        $nerror = '';

        if ($konversi_tritier >= $order_tritier) {
            $nerror = 'Order dengan IdOrder: ' . $id_order . ' sudah terpenuhi, terdapat sisa stok sebanyak: ' . ($konversi_tritier - $order_tritier) . '.';
        } else {
            $nerror = 'Order dengan IdOrder: ' . $id_order . ' sudah terpenuhi sebanyak: ' . $konversi_tritier . ' dan sisa order yang belum terpenuhi: ' . ($order_tritier - $konversi_tritier) . '.';
        }

        return response()->json(['nmerror' => $nerror]);

        // *Query SELECT pada SP_5298_EXT_UPDATE_SALDO_ORDER_DETAIL
    }

    public function getOrderStatus($id_order)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5409_EXT_ORDER_STATUS @IdOrder = ?',
            [$id_order]
        );

        // PARAMETER - @IdOrder char(10)
    }
    #endregion

    #region Konversi - Permohonan
    public function getListKomposisiBahan($id_komposisi)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_KOMPOSISI_BAHAN @IdKomposisi = ?',
            [$id_komposisi]
        );

        // @IdKomposisi char(9)
    }

    public function getSatuan($id_type)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_GET_SATUAN @idtype = ?',
            [$id_type]
        );

        // @idtype varchar(20)
    }

    public function getSaldoBarang($id_type)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_5298_EXT_SALDO_BARANG @idtype = ?',
            [$id_type]
        );

        // @idtype char(20)
    }

    public function getDataKonversi($id_konversi)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_DATA_KONVERSI @idkonversi = ?',
            [$id_konversi]
        );

        // @idkonversi varchar(14)
    }

    public function getListDetailKonversi($id_konversi)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_DETAIL_KONVERSI_1 @idkonversi = ?',
            [$id_konversi]
        );

        // @idkonversi varchar(14)
    }

    public function getListKonversi($id_divisi, $kode = null, $datetime = null)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_KONVERSI @Kode = ?, @iddivisi = ?, @Tanggal = ?',
            [$kode, $id_divisi, $datetime]
        );

        // @Kode int=null, @iddivisi char(3), @Tanggal datetime=null
    }

    public function getIdKonversiInv($id_konversi)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_IDKONVERSI_INV @idkonversi = ?',
            [$id_konversi]
        );

        // @idkonversi varchar(14)
    }

    public function getListMesin($kode)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_MESIN @kode = ?',
            [$kode]
        );

        // @kode integer
    }

    public function getOrdAccBlmSelesai($divisi)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_ORDER_ACC_BLM_SELESAI @Divisi = ?',
            [$divisi]
        );

        // @Divisi char(3)
    }

    public function getListKomposisi($kode, $id_mesin)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_KOMPOSISI @Kode = ?, @idmesin = ?',
            [$kode, $id_mesin]
        );

        // @Kode char(1), @idmesin varchar(5)
    }

    public function getListSpek($id_order)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_SPEK_ORDER @idorder = ?',
            [$id_order]
        );

        // @idorder varchar(10)
    }

    public function getSaldoInv($id_type)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_1003_INV_Saldo_Barang @IdType = ?',
            [$id_type]
        );

        // @IdType char(20)
    }

    public function insTmpTransaksi($id_type_transaksi, $uraian_detail_transaksi, $id_type, $saat_awal_transaksi, $jumlah_keluar_primer, $jumlah_keluar_sekunder, $jumlah_keluar_tritier, $asal_sub_kel, $id_konversi)
    {
        $sp_str = '';
        $primer_str = '';
        $sekunder_str = '';
        $tersier_str = '';
        $subkel_str = '';

        if ($uraian_detail_transaksi == 'asal_konversi') {
            $sp_str = 'SP_5298_EXT_INSERT_04_ASALTMPTRANSAKSI';
            $primer_str = '@XJumlahKeluarPrimer';
            $sekunder_str = '@XJumlahKeluarSekunder';
            $tersier_str = '@XJumlahKeluarTritier';
            $subkel_str = '@XAsalSubKel';
        } else if ($uraian_detail_transaksi == 'tujuan_konversi') {
            $sp_str = 'SP_5298_EXT_INSERT_04_TUJUANTMPTRANSAKSI';
            $primer_str = '@XJumlahMasukPrimer';
            $sekunder_str = '@XJumlahMasukSekunder';
            $tersier_str = '@XJumlahMasukTritier';
            $subkel_str = '@XTujuanSubKel';
        }

        return DB::connection('ConnInventory')->statement(
            'exec ' . $sp_str . ' @XIdTypeTransaksi = ?, @XUraianDetailTransaksi = ?, @XIdType = ?, @XIdPemohon = ' . Auth::user()->NomorUser . ', @XsaatAwalTransaksi = ?, ' . $primer_str . ' = ?, ' . $sekunder_str . ' = ?, ' . $tersier_str . ' = ?, ' . $subkel_str . ' = ?, @XIdKonversi = ?',
            [$id_type_transaksi, Str::title(str_replace('_', ' ', $uraian_detail_transaksi)), $id_type, $saat_awal_transaksi, str_replace('_', '.', $jumlah_keluar_primer), str_replace('_', '.', $jumlah_keluar_sekunder), str_replace('_', '.', $jumlah_keluar_tritier), $asal_sub_kel, $id_konversi]
        );

        // @XIdTypeTransaksi  char(2), @XUraianDetailTransaksi  varchar(50), @XIdType  varchar(20), @XIdPemohon  char(7), @XSaatawalTransaksi  datetime, @XJumlahKeluarPrimer  numeric(15,2), @XJumlahKeluarSekunder numeric(15,2), @XJumlahKeluarTritier numeric(15,2), @XAsalsubKel  char(6), @XIdKonversi  char(9)

        // @XIdTypeTransaksi  char(2), @XUraianDetailTransaksi  varchar(50), @XIdType  varchar(20), @XIdPemohon  char(7), @XSaatAwalTransaksi  datetime, @XJumlahMasukPrimer  numeric(15,2), @XJumlahMasukSekunder numeric(15,2), @XJumlahMasukTritier numeric(15,2), @XTujuanSubKel  char(6), @XIdKonversi  char(9)
    }

    public function insDetailKonversi($id_konversi, $id_type, $jumlah_primer, $jumlah_sekunder, $jumlah_tritier, $presentase = 0, $id_konversi_inv)
    {
        return DB::connection('ConnExtruder')->statement(
            'exec SP_5409_EXT_INSERT_DETAILKONVERSI @IdKonversi = ?, @IdType = ?, @JumlahPrimer = ?, @JumlahSekunder = ?, @JumlahTritier = ?, @Persentase = ?, @idKonversiInv = ?',
            [$id_konversi, $id_type, str_replace('_', '.', $jumlah_primer), str_replace('_', '.', $jumlah_sekunder), str_replace('_', '.', $jumlah_tritier), $presentase, $id_konversi_inv]
        );

        // @IdKonversi varchar(14), @IdType varchar(20), @JumlahPrimer numeric(9,2), @JumlahSekunder numeric(9,2), @JumlahTritier numeric(9,2), @Persentase numeric(9,2)=0, @idKonversiInv varchar(9)
    }

    public function insMasterKonversi($tgl, $shift, $awal, $akhir, $mesin, $ukuran, $denier, $warna, $lot_number, $id_order, $no_urut, $id_komp, $jam1, $jam2, $kode = null)
    {
        return DB::connection('ConnExtruder')->statement(
            'exec SP_5298_EXT_INSERT_MASTER_KONVERSI @tgl = ?, @shift = ?, @awal = ?, @akhir = ?, @mesin = ?, @ukuran = ?, @denier = ?, @warna = ?, @lotNumber = ?, @idOrder = ?, @noUrut = ?, @idKomp = ?, @jam1 = ?, @jam2 = ?, @user = ' . Auth::user()->NomorUser . ', @kode = ?',
            [$tgl, $shift, str_replace("_", ":", $awal), str_replace("_", ":", $akhir), $mesin, str_replace("_", ".", $ukuran), str_replace("_", ".", $denier), $warna, str_replace("_", ".", $lot_number), $id_order, $no_urut, $id_komp, Carbon::today()->format('Y-m-d') . ' ' . str_replace("_", ":", $jam1), Carbon::today()->format('Y-m-d') . ' ' . str_replace("_", ":", $jam2), $kode]
        );

        // @tgl datetime, @shift char(2), @awal datetime, @akhir datetime, @mesin char(5), @ukuran numeric(9,2), @denier numeric(9,2), @warna varchar(10), @lotNumber varchar(9), @idOrder varchar(10), @noUrut int, @idKomp char(9), @jam1 datetime, @jam2 datetime, @user char(7), @kode char(1) = null
    }

    public function getMasterKonversi($kode = null)
    {
        try {
            $divisi = $kode != null
                ? 'DEX'
                : 'EXT';

            $counter = DB::connection('ConnExtruder')
                ->table('CounterTrans')
                ->where('Divisi', $divisi)
                ->value(DB::raw('IdKonversi'));

            $id = '0000000000' . str_pad($counter, 9, '0', STR_PAD_LEFT);
            $id = $divisi . '-' . substr($id, -10);

            return response()->json(['NoKonversi' => $id]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }

        // *Query SELECT pada SP_5298_EXT_INSERT_MASTER_KONVERSI
    }

    public function updListCounter()
    {
        return DB::connection('ConnInventory')->statement(
            'exec SP_5298_EXT_LIST_COUNTER',
            []
        );
    }

    public function getListCounter()
    {
        $id_konversi = DB::connection('ConnInventory')->table('counter')->value('IdKonversi');
        $formatted_id = str_pad($id_konversi, 9, '0', STR_PAD_LEFT);
        return response()->json(['NoKonversi' => $formatted_id]);

        // *Query SELECT pada SP_5298_EXT_LIST_COUNTER
    }

    public function updMasterKonversi($tgl, $shift, $awal, $akhir, $ukuran, $denier, $warna, $lot_number, $jam1, $jam2, $id_konv)
    {
        return DB::connection('ConnExtruder')->statement(
            'exec SP_5409_EXT_UPDATE_MASTER_KONVERSI @tgl = ?, @shift = ?, @awal = ?, @akhir = ?, @ukuran = ?, @denier = ?, @warna = ?, @lotNumber = ?, @jam1 = ?, @jam2 = ?, @idkonv = ?',
            [$tgl, $shift, str_replace("_", ":", $awal), str_replace("_", ":", $akhir), str_replace("_", ".", $ukuran), str_replace("_", ".", $denier), $warna, str_replace("_", ".", $lot_number), str_replace("_", ":", $jam1), str_replace("_", ":", $jam2), $id_konv]
        );

        // @tgl datetime, @shift char(2), @awal datetime, @akhir datetime, @ukuran numeric(9,2), @denier numeric(9,2), @warna varchar(10), @lotNumber varchar(9), @jam1 datetime, @jam2 datetime, @idkonv char(14)
    }

    public function delDetailKonversi($id_konversi, $id_konv_inv)
    {
        return DB::connection('ConnExtruder')->statement(
            'exec SP_5409_EXT_DELETE_DETAIL_KONVERSI @idkonversi = ?, @idkonvInv = ?',
            [$id_konversi, $id_konv_inv]
        );

        // @idkonversi varchar(14), @idkonvInv varchar(9)
    }

    public function delKonversi($id_konversi)
    {
        return DB::connection('ConnExtruder')->statement(
            'exec SP_5409_EXT_DELETE_KONVERSI @idkonversi = ?',
            [$id_konversi]
        );

        // @idkonversi varchar(14)
    }
    #endregion
}
