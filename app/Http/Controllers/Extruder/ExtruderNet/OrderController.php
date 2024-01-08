<?php

namespace App\Http\Controllers\Extruder\ExtruderNet;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Auth;

class OrderController extends Controller
{
    public function index($form_name, $nama_gedung = null)
    {
        $view_name = 'extruder.ExtruderNet.' . $form_name;
        $form_data = [];

        $id_divisi = "";
        $kode_benang = "";
        switch ($nama_gedung) {
            case 'B':
                $id_divisi = "MEX";
                $kode_benang = 3;
                break;

            case 'D':
                $id_divisi = "DEX";
                $kode_benang = 5;
                break;

            default:
                $id_divisi = "EXT";
                $kode_benang = 2;
                break;
        }

        switch ($form_name) {
            case 'formOrderMaintenance':
                $form_data = ['listBenang' => $this->getListBenang($kode_benang)];
                break;

            case 'formOrderStatus':
                $form_data = ['listBatalOrder' => $this->getListBatalOrd($id_divisi)];
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

    #region Order - Maintenance
    public function getListBenang($kode)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_BENANG @kode = ?',
            [$kode]
        );
    }

    public function insOrderBenang($gedung, $tanggal, $identifikasi, $kode = null)
    {
        if ($gedung == 'B') {
            return DB::connection('ConnExtruder')->statement(
                'exec SP_1273_MEX_INSERT_ORDER_BENANG @tanggal = ?, @identifikasi = ?, @user = '. Auth::user()->NomorUser,
                [$tanggal, str_replace('~', '/', strtoupper(str_replace('_', ' ', $identifikasi)))]
            );
        } else {
            return DB::connection('ConnExtruder')->statement(
                'exec SP_5298_EXT_INSERT_ORDER_BENANG @tanggal = ?, @identifikasi = ?, @user = '. Auth::user()->NomorUser.', @kode = ?',
                [$tanggal, str_replace('~', '/', strtoupper(str_replace('_', ' ', $identifikasi))), $kode]
            );
        }
    }

    public function getNoOrder($kode = null)
    {
        $divisi = $kode == 'D'
            ? 'DEX'
            : 'EXT';

        $mCounterResult = DB::connection('ConnExtruder')
            ->select('SELECT IdOrder + 1 AS mCounter FROM CounterTrans WHERE divisi = ?', [$divisi]);

        $mCounter = $mCounterResult[0]->mCounter;
        $mCode = '000000000' . $mCounter;
        $mCode = $divisi . substr($mCode, -7);

        return response()->json(['NoOrder' => $mCode]);

        // *Query SELECT pada SP_5298_EXT_INSERT_ORDER_BENANG
    }

    public function getNoOrderMjs()
    {
        $mCounterResult = DB::connection('ConnExtruder')
            ->select('SELECT IdOrder + 1 AS mCounter FROM CounterTrans WHERE divisi = ?', ['MEX']);

        $mCounter = $mCounterResult[0]->mCounter;
        $mCode = '000000000' . $mCounter;
        $mCode = 'MEX' . substr($mCode, -7);

        return response()->json(['NoOrder' => $mCode]);

        // *Query SELECT pada SP_1273_MEX_INSERT_ORDER_BENANG
    }

    public function insOrderDetail($id_order, $type_benang, $jmlh_primer, $jmlh_sekunder, $jmlh_tritier, $prod_primer, $prod_sekunder, $prod_tritier)
    {
        return DB::connection('ConnExtruder')->statement(
            'exec SP_5298_EXT_INSERT_ORDERDETAIL_BENANG @idorder = ?, @typebenang = ?, @jumlahprimer = ?, @jumlahsekunder = ?, @jumlahtritier = ?, @jumprodprimer = ?, @jumprodsekunder = ?, @jumprodtritier = ?',
            [$id_order, str_replace('~', '/', strtoupper(str_replace('_', ' ', $type_benang))), $jmlh_primer, $jmlh_sekunder, $jmlh_tritier, $prod_primer, $prod_sekunder, $prod_tritier]
        );
    }

    public function updCounterOrder($id_divisi)
    {
        return DB::connection('ConnExtruder')->statement(
            'exec SP_5298_EXT_UPDATE_COUNTER_ORDER @iddivisi = ?',
            [$id_divisi]
        );
    }
    #endregion

    #region Order - ACC
    public function getOrderBlmAcc($divisi)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_ORDER_BLM_ACC @divisi = ?',
            [$divisi]
        );
    }

    public function getListSpek($id_order)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_SPEK_ORDER_1 @idorder = ?',
            [$id_order]
        );
    }

    public function updAccOrder($id_order)
    {
        return DB::connection('ConnExtruder')->statement(
            'exec SP_5298_EXT_ACC_ORDER @idorder = ?, @useracc = '. Auth::user()->NomorUser,
            [$id_order]
        );
    }
    #endregion

    #region Order - Status
    public function getListBatalOrd($id_divisi)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_BATAL_ORDER @iddivisi = ?',
            [$id_divisi]
        );
    }

    public function getListOrderBtl($id_order)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_ORDER_BATAL @idorder = ?',
            [$id_order]
        );
    }

    public function updStatusOrder($id_order, $status, $ket)
    {
        return DB::connection('ConnExtruder')->statement(
            'exec SP_5298_EXT_STATUS_ORDER @idorder = ?, @status = ?, @ket = ?',
            [$id_order, $status, strtoupper(str_replace('_', ' ', $ket))]
        );
    }
    #endregion
}
