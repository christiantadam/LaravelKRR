<?php

namespace App\Http\Controllers\Extruder\ExtruderNet;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MasterController extends Controller
{
    public function index($form_name)
    {
        $view_name = 'extruder.ExtruderNet.' . $form_name;
        $form_data = [];

        switch ($form_name) {
            case 'formKomposisiTropodo':
                $form_data = $this->komposisiTropodo();
                break;
            case 'formKomposisiMojosari':
                $form_data = $this->komposisiMojosari(false);
                break;
            case 'formKomposisiGedungD':
                $view_name = 'extruder.ExtruderNet.formKomposisiMojosari';
                $form_data = $this->komposisiMojosari(true);
                break;

            default:
                $form_data = [];
                break;
        }

        $view_data = [
            'pageName' => 'ExtruderNet',
            'formName' => $form_name,
            'formData' => $form_data,
        ];

        return view($view_name, $view_data);
    }


    public function komposisiMojosari($is_gedung_d)
    {
        if (!$is_gedung_d) {
            $id_komposisi = $this->getIdKomposisi('MEX');
        } else {
            $id_komposisi = $this->getIdKomposisi('DEX');
        }

        return [
            'listIdKomposisi' => $id_komposisi,
        ];
    }

    public function komposisiTropodo()
    {
        $id_komposisi = $this->getIdKomposisi('EXT');
        $mesin = $this->getMesin(1);
        $objek = $this->getObjek('EXT');

        return [
            'listIdKomposisi' => $id_komposisi,
            'listMesin' => $mesin,
            'listObjek' => $objek,
        ];
    }

    public function getDataKomposisi($no_komposisi)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_KOMPOSISI_BAHAN @idkomposisi = ?',
            [$no_komposisi]
        );

        // TABLE NAMES
        // Extruder - Detail_KonversiEXT, Master_KonversiEXT, MasterKomposisi, Detail_KomposisiBahan
        // Inventory - Satuan_1, Satuan_2, Satuan_3, Type, Objek, Divisi, KelompokUtama, Kelompok, SubKelompok

        // PARAMETER @idkomposisi char(9)

        // RETURN listKomposisi(statustype, idtype, namatype, jumlahprimer, satuanprimer,
        // satuansekunder, jumlahtritier, satuantritier, Persentase, idobjek, namaobjek,
        // idkelompokutama, idkelompok, namakelompok, idsubkelompok, namasubkelompok)
    }

    public function getSatuan($id_type)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_5298_EXT_DETAIL_BAHAN @idtype = ?',
            [$id_type]
        );

        // TABLE NAMES
        // A, Satuan_1, Satuan_2, Satuan_3, Satuan_4, Objek, Divisi, Kelompok Utama, Kelompok, Sub-kelompok

        // PARAMETER @idtype varchar(20)

        // RETURN unitPrimer(unitprimer), unitSekunder(unitsekunder), unitTritier(unittritier),
        // txtSatPrimer.Text(namasatprimer), txtSatSekunder.Text(namasatsekunder),
        // txtSatTritier.Text(namasattritier)
    }

    public function getIdKomposisi($id_divisi, $id_komposisi = null)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_KOMPOSISI_1 @iddivisi = ?, @idkomposisi = ?',
            [$id_divisi, $id_komposisi]
        );

        // If @idkomposisi = null
        // SELECT * FROM MasterKomposisi
        // WHERE IdDivisi=@iddivisi AND IdKomposisi >= 'DEX000013'
        // ORDER BY NamaKomposisi

        // Else
        // SELECT MasterKomposisi.NamaKomposisi, MasterKomposisi.IdMesin, MasterMesin.TypeMesin
        // FROM MasterKomposisi INNER JOIN MasterMesin
        // ON MasterKomposisi.IdMesin = MasterMesin.IdMesin
        // WHERE MasterKomposisi.IdKomposisi = @idkomposisi
        // ORDER BY MasterKomposisi.NamaKomposisi
    }

    public function getMesin($kode)
    {
        return DB::connection('ConnExtruder')->select(
            'exec SP_5298_EXT_LIST_MESIN @kode = ?',
            [$kode]
        );

        // If @kode = 1     SELECT * FROM MasterMesin WHERE IdDivisi='EXT'
        // If @kode = 2     SELECT * FROM MasterMesin WHERE IdDivisi='MEX'
        // If @kode = 3     SELECT * FROM MasterMesin WHERE IdDivisi='DEX'
    }

    public function getObjek($id_divisi)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_5298_EXT_IDDIVISI_OBJEK @xiddivisi_objek = ?',
            [$id_divisi]
        );

        // SELECT * FROM objek WHERE IdDivisi_Objek = @xiddivisi_objek
        // ORDER BY NamaObjek
    }

    public function getKelompokUtama($id_objek, $type = null)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_5298_EXT_IDOBJEK_KELOMPOKUTAMA @xidobjek_kelompokutama = ?, @type = ?',
            [$id_objek, $type]
        );

        // If @type = null
        // SELECT NamaKelompokUtama, IdKelompokUtama FROM KelompokUtama
        // WHERE IdObjek_KelompokUtama = @xidobjek_kelompokutama
        // ORDER BY NamaKelompokUtama

        // If @type = '3'
        // SELECT * FROM KelompokUtama
        // WHERE IdObjek_KelompokUtama = @xidobjek_kelompokutama AND IdKelompokUtama = '0213'
        // ORDER BY NamaKelompokUtama
    }

    public function getKelompok($id_kelompok_utama, $type = null)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_5298_EXT_IDKELOMPOKUTAMA_KELOMPOK @xidkelompokutama_kelompok = ?, @type = ?',
            [$id_kelompok_utama, $type]
        );

        // If @type = null
        // SELECT DISTINCT NamaKelompok, IdKelompok FROM vw_prg_5298_ext_subkel
        // WHERE IdKelompokUtama = @xidkelompokutama_kelompok
        // ORDER BY NamaKelompok ASC

        // If @type = '1'
        // SELECT DISTINCT IdKelompok, NamaKelompok FROM vw_prg_5298_ext_subkel
        // WHERE IdKelompokUtama = @xidkelompokutama_kelompok AND IdKelompok = '001122'
        // ORDER BY NamaKelompok ASC

        // *ambil dari tabel Objek, Divisi, Kelompok Utama, Kelompok, Sub-kelompok
    }

    public function getSubKelompok($id_kelompok)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_5298_EXT_IDKELOMPOK_SUBKELOMPOK @Xidkelompok_subkelompok = ?',
            [$id_kelompok]
        );

        // SELECT DISTINCT NamaSubKelompok, IdSubKelompok FROM vw_prg_5298_ext_subkel
        // WHERE IdKelompok = @xidkelompok_subkelompok
        // ORDER BY NamaSubKelompok
    }

    public function getType($id_sub_kelompok)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_5298_EXT_IDSUBKELOMPOK_TYPE @xidsubkelompok_type = ?',
            [$id_sub_kelompok]
        );

        // SELECT * FROM vw_prg_5298_ext_type
        // WHERE @xidsubkelompok_type = IdSubKelompok_Type AND NonAktif = 'Y'
        // ORDER BY NamaType

        // *ambil dari tabel Type
    }

    public function getBarang($kode, $kode_barang = null, $id_komposisi = null, $id_kelompok = null, $id_divisi = null, $mesin = null)
    {
        return DB::connection('ConnInventory')->select(
            'exec SP_1273_PRG_BOM_Barang @kode = ?, @kodebarang = ?, @idkomposisi = ?, @iddivisi = ?, @mesin = ?',
            [$kode, $kode_barang, $id_komposisi, $id_kelompok, $id_divisi, $mesin]
        );

        // @Kode char(2),
        // @KodeBarang  char(9) = null,
        // @IdKomposisi char(9) = null,
        // @IdKelompok char(6) = null,
        // @IdDivisi char(3) = null,
        // @Mesin varchar(50) = null
    }

    function splokal(Request $request)
    {
        $columns = array(
            0 => 'IDSuratPesanan',
            1 => 'NamaCust',
            2 => 'Tgl_Pesan'
        );

        $totalData = DB::connection('ConnSales')
            ->table('T_HeaderPesanan')
            ->select('IDSuratPesanan', 'Tgl_Pesan', 'NamaCust')
            ->leftJoin('T_Customer', 'T_HeaderPesanan.IDCust', '=', 'T_Customer.IDCust')
            ->where('IDJnsSuratPesanan', '=', 1)
            ->where('Aktive', '=', 'Y')
            ->whereNull('Deleted')
            ->whereNotNull('AccManager')
            ->orderBy('Tgl_Pesan', 'Desc')
            ->count();

        $totalFiltered = $totalData;

        $limit = $request->input('length');
        $start = $request->input('start');
        $order = $columns[$request->input('order.0.column')];
        $dir = $request->input('order.0.dir');

        if (empty($request->input('search.value'))) {
            $sp = DB::connection('ConnSales')
                ->table('T_HeaderPesanan')
                ->select('IDSuratPesanan', 'Tgl_Pesan', 'NamaCust')
                ->leftJoin('T_Customer', 'T_HeaderPesanan.IDCust', '=', 'T_Customer.IDCust')
                ->where('IDJnsSuratPesanan', '=', 1)
                ->where('Aktive', '=', 'Y')
                ->whereNull('Deleted')
                ->whereNotNull('AccManager')
                ->offset($start)
                ->limit($limit)
                ->orderBy($order, $dir)
                ->get();
        } else {
            $search = $request->input('search.value');
            $sp = DB::connection('ConnSales')
                ->table('T_HeaderPesanan')
                ->select('IDSuratPesanan', 'Tgl_Pesan', 'NamaCust')
                ->leftJoin('T_Customer', 'T_HeaderPesanan.IDCust', '=', 'T_Customer.IDCust')
                ->where('IDJnsSuratPesanan', '=', 1)
                ->where('Aktive', '=', 'Y')
                ->whereNull('Deleted')
                ->whereNotNull('AccManager')
                ->where('IDSuratPesanan', 'LIKE', "%{$search}%")
                ->orWhere('Tgl_Pesan', 'LIKE', "%{$search}%")
                ->orWhere('NamaCust', 'LIKE', "%{$search}%")
                ->offset($start)
                ->limit($limit)
                ->orderBy($order, $dir)
                ->get();

            $totalFiltered = DB::connection('ConnSales')
                ->table('T_HeaderPesanan')
                ->select('IDSuratPesanan', 'Tgl_Pesan', 'NamaCust')
                ->leftJoin('T_Customer', 'T_HeaderPesanan.IDCust', '=', 'T_Customer.IDCust')
                ->where('IDJnsSuratPesanan', '=', 1)
                ->where('Aktive', '=', 'Y')
                ->whereNull('Deleted')
                ->whereNotNull('AccManager')
                ->where('IDSuratPesanan', 'LIKE', "%{$search}%")
                ->orWhere('Tgl_Pesan', 'LIKE', "%{$search}%")
                ->orWhere('NamaCust', 'LIKE', "%{$search}%")
                ->count();
        }

        $data = array();
        if (!empty($sp)) {
            foreach ($sp as $datasp) {
                $nestedData['IDSuratPesanan'] = $datasp->IDSuratPesanan;
                $nestedData['NamaCust'] = $datasp->NamaCust;
                $nestedData['Tgl_Pesan'] = substr($datasp->Tgl_Pesan, 0, 10);
                if (strstr($datasp->IDSuratPesanan, '/')) {
                    $no_spValue = str_replace('/', '.', $datasp->IDSuratPesanan);
                } else {
                    $no_spValue = $datasp->IDSuratPesanan;
                }
                $csrfToken = Session::get('_token');
                $nestedData['Actions'] = "<button class=\"btn btn-sm btn-info\" onclick=\"openNewWindow('/penyesuaian/" . $no_spValue . "')\">&#x270E; Penyesuaian</button>
                <br> <form onsubmit=\"return confirm('Apakah Anda Yakin ?');\"
                                        action=\"/batalsplokal/" . $no_spValue . "\" method=\"POST\"
                                        enctype=\"multipart/form-data\"> <button type=\"submit\"
                                            class=\"btn btn-sm btn-danger\"><span>&#x1F5D1;</span>Batal SP</button>
                                            <input type=\"hidden\" name=\"_token\" value=\"" . $csrfToken . "\">
                                    </form>";

                $data[] = $nestedData;
            }
        }

        $json_data = array(
            "draw" => intval($request->input('draw')),
            "recordsTotal" => intval($totalData),
            "recordsFiltered" => intval($totalFiltered),
            "data" => $data
        );
        // dd($sp);
        echo json_encode($json_data);
    }
}
