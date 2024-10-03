<?php

namespace App\Http\Controllers\Circular;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;
use Illuminate\Database\QueryException;

class ProsesCircularController extends Controller
{
    public function index($form_name)
    {
        $form_data = [];

        switch ($form_name) {
            default:
                return view('Circular.transaksi.' . $form_name);
        }

        return view('Circular.transaksi.' . $form_name, $form_data);
    }

    public function spProses($sp_str, $sp_data = null)
    {
        if ($sp_data != null) {
            $sp_data = explode('~', $sp_data);
        } else $sp_data = [];

        switch ($sp_str) {

                #region formHasilTransfer
            case 'Sp_Maint_Transfer~1':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1];
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'SP_1486_CIR_LIST_TRANSF_MTR_2':
                $sp_param = '@Id_Mesin = ?, @ID_Order = ?, @Id_Log = ?, @Id_Log_Awal = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'SP_1486_CIR_LIST_TRANSF_MTR_3':
                $sp_param = '@Id_Mesin = ?, @ID_Order = ?, @Id_Log = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');
                #endregion

                #region formHasilKonversi
            case 'SP_1486_CIR_LIST_JML_ANTRIAN':
                $sp_param = '@IdType = ?';
                return $this->executeSP('select', $sp_str, $sp_param, $sp_data, 'ConnInventory');

            case 'sp_List_Subkel':
                $sp_param = '@kodeBarang = ?, @idsubkel = ?';
                return $this->executeSP('select', $sp_str, $sp_param, $sp_data, 'ConnCircular');

            case 'sp_List_Type~1':
            case 'sp_List_Type~2':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @IdORder = ?, @Kd_Brg = ?';
                if (explode('~', $sp_str)[1] == '2') $sp_param .= ', @ket = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'Sp_Maint_Transfer~5':
            case 'Sp_Maint_Transfer~9':
            case 'Sp_Maint_Transfer~10':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @id_Order = ?';
                if (explode('~', $sp_str)[1] == '9') $sp_param .= ', @id_mesin = ?';
                if (explode('~', $sp_str)[1] == '10') $sp_param .= ', @namamesin = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'Sp_Maint_Transfer~6':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @A_kodebarang_warp = ?, @A_kodebarang_weft = ?, @Id_Mesin = ?, @id_Order = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'Sp_Maint_Transfer~4':
            case 'Sp_Maint_Transfer~7':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @Id_Mesin = ?, @id_Order = ?';
                if (explode('~', $sp_str)[1] == '7') {
                    $sp_param .= ', @A_kodebarang_warp = ?';
                } else $sp_param .= ', @id_log = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'Sp_Maint_Transfer~8':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @typemesin = ?, @namamesin = ?, @kode_barang = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'sp_KodeBarang_Type':
                $sp_param = '@XKodeBarang = ?, @XIdSubKelompok = ?';
                return $this->executeSP('select', $sp_str, $sp_param, $sp_data, 'ConnInventory');

            case 'sp_check_penyesuaian_transaksi':
                $sp_param = '@idtype = ?, @idtypetransaksi = ?';
                return $this->executeSP('select', $sp_str, $sp_param, $sp_data, 'ConnInventory');

            case 'Sp_Transfer_Meter~1':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @Tanggal = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnInventory');

            case 'Sp_Transfer_Meter~2':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @UraianDetailTransaksi = ?,  @Tanggal = ?,  @IdType = ?,  @UserAcc = 4384,  @MasukPrimer = ?,  @MasukSekunder = ?,  @MasukTritier = ?,  @KeluarPrimer = ?,  @KeluarSekunder = ?,  @KeluarTritier = ?,  @AsalSubKel = ?,  @IdKonversi = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnInventory');

            case 'SP_1273_CIR_UPDATE_KONVERSI':
                $sp_param = '@noindek = ?, @kd_brg = ?, @IdKonversi = ?';
                return $this->executeSP('select', $sp_str, $sp_param, $sp_data, 'ConnInventory');

            case 'Sp_Update_Kalkulasi_Meter':
                $sp_param = '@idlog1 = ?, @idlog2 = ?, @id_order = ?, @id_mesin = ?, @IdKonversi = ?';
                return $this->executeSP('select', $sp_str, $sp_param, $sp_data, 'ConnCircular');

            case 'sp_IdKelompok_SubKelompok':
                $sp_param = '@XIdKelompok_SubKelompok = ?';
                return $this->executeSP('select', $sp_str, $sp_param, $sp_data, 'ConnInventory');
                #endregion

            default:
                break;
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
                dd(DB::connection($conn)->select(
                    'exec ' . $sp_str . ' ' . $sp_param,
                    $sp_data
                ));

                dd($e->getCode());
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

    public function getKecepatanGroup(Request $request)
    {
        $type_order = $request->input('typeOrder');
        $type_benang = $request->input('typeBenang');
        $id_group = $request->input('idGroup');

        if (!is_array($id_group) || empty($id_group)) {
            throw new InvalidArgumentException("idGroup must be a non-empty array");
        }

        $placeholders = implode(',', array_fill(0, count($id_group), '?'));

        $whereClauses = [];
        $parameters = [];

        if ($type_order) {
            $whereClauses[] = 'Bar.NAMA_BRG LIKE ?';
            $parameters[] = $type_order . '%';
        }

        if ($type_benang) {
            $whereClauses[] = 'Bar.NAMA_BRG LIKE ?';
            $parameters[] = '%' . $type_benang . '%';
        }

        $whereClauses[] = 'Mes.Id_Group IN (' . $placeholders . ')';
        $parameters = array_merge($parameters, $id_group);
        $whereSql = implode(' AND ', $whereClauses);

        $query = "SELECT AVG(CounterPerShift) AS KecepatanGroup
            FROM (
                SELECT Tgl_log, Shift, Id_order, Nama_mesin,
                    SUM(Counter_mesin_akhir - Counter_mesin_awal) AS CounterPerShift
                FROM (
                    SELECT TOP 100 LogMesin.Tgl_Log, LogMesin.Shift,
                        Ord.Id_order, Bar.NAMA_BRG, Nama_mesin,
                        Counter_mesin_akhir, Counter_mesin_awal
                    FROM T_Log_Mesin AS LogMesin
                    INNER JOIN T_Order AS Ord ON LogMesin.Id_order = Ord.Id_order
                    INNER JOIN PURCHASE.dbo.Y_BARANG AS Bar ON Ord.Kode_barang = Bar.KD_BRG
                    INNER JOIN T_Mesin AS Mes ON LogMesin.Id_mesin = Mes.Id_mesin
                    WHERE $whereSql
                    ORDER BY LogMesin.Id_Log
                ) AS SubQuery1
                GROUP BY Tgl_log, Shift, Id_order, Nama_mesin
            ) AS SubQuery2";

        try {
            DB::statement("SET SESSION MAX_EXECUTION_TIME=10000"); // 10 secs.
            $results = DB::connection('ConnCircular')->select($query, $parameters);

            if (empty($results)) {
                throw new \Exception("No results found");
            }
        } catch (\Exception $e) {
            $whereSql = 'Id_Group IN (' . $placeholders . ')';
            $query = "SELECT AVG(Rpm * Number_of_shutle * 2.54 * 0.6 * 0.7) AS KecepatanGroup
                FROM T_Mesin
                WHERE $whereSql";

            $results = DB::connection('ConnCircular')->select($query, $id_group);
        }

        return $results;
    }

    public function getKecepatanMesin(Request $request)
    {
        $type_order = $request->input('typeOrder');
        $type_benang = $request->input('typeBenang');
        $id_group = $request->input('idGroup');

        $query1 = "SELECT TOP 10 AVG(CounterPerShift) AS KecepatanMesin, Nama_mesin
            FROM (
                SELECT Tgl_log, Shift, Id_order, Nama_mesin,
                    SUM(Counter_mesin_akhir - Counter_mesin_awal) AS CounterPerShift
                FROM (
                    SELECT TOP 200 LogMesin.Tgl_Log, LogMesin.Shift,
                        Ord.Id_order, Bar.NAMA_BRG, Nama_mesin,
                        Counter_mesin_akhir, Counter_mesin_awal
                    FROM T_Log_Mesin AS LogMesin
                    INNER JOIN T_Order AS Ord ON LogMesin.Id_order = Ord.Id_order
                    INNER JOIN PURCHASE.dbo.Y_BARANG AS Bar ON Ord.Kode_barang = Bar.KD_BRG
                    INNER JOIN T_Mesin AS Mes ON LogMesin.Id_mesin = Mes.Id_mesin
                    WHERE Bar.NAMA_BRG LIKE ? AND Bar.NAMA_BRG LIKE ? AND Mes.Id_Group = ?
                    ORDER BY LogMesin.Id_Log
                ) AS SubQuery1
                GROUP BY Tgl_log, Shift, Id_order, Nama_mesin
                HAVING SUM(Counter_mesin_akhir - Counter_mesin_awal) >= 10
            ) AS SubQuery2
            GROUP BY Nama_mesin";
        $parameters1 = [$type_order . '%', '%' . $type_benang . '%', $id_group];

        try {
            // DB::statement("SET SESSION MAX_EXECUTION_TIME=60000"); // 60 secs.
            $results1 = DB::connection('ConnCircular')->select($query1, $parameters1);
        } catch (\Exception $e) {
            $results1 = [];
        }

        if (count($results1) < 10) {
            $excludedNamaMesin = array_map(function ($result) {
                return $result->Nama_mesin;
            }, $results1);

            if (!empty($excludedNamaMesin)) {
                $placeholders = implode(',', array_fill(0, count($excludedNamaMesin), '?'));
                $query2 = "SELECT (Rpm * Number_of_shutle * 2.54 * 0.6 * 0.7) AS KecepatanMesin, Nama_mesin
                    FROM T_Mesin
                    WHERE Id_Group = ? AND Nama_mesin NOT IN ($placeholders)";
                $parameters2 = array_merge([$id_group], $excludedNamaMesin);
            } else {
                $query2 = "SELECT (Rpm * Number_of_shutle * 2.54 * 0.6 * 0.7) AS KecepatanMesin, Nama_mesin
                    FROM T_Mesin
                    WHERE Id_Group = ?";
                $parameters2 = [$id_group];
            }

            $results2 = DB::connection('ConnCircular')->select($query2, $parameters2);

            $combinedResults = array_merge($results1, $results2);
            $combinedResults = array_slice($combinedResults, 0, 10);
        } else {
            $combinedResults = $results1;
        }

        // $query3 = "SELECT (50 * Number_of_shutle * 2.54 * 0.6 * 0.3) AS KecepatanMesin, Nama_mesin
        //     FROM T_Mesin
        //     WHERE Nama_mesin = 'JB-02'";
        // $results3 = DB::connection('ConnCircular')->select($query3, []);
        // $combinedResults = $results3;

        return $combinedResults;
    }

    public function getUmurMesin(Request $request)
    {
        $id_group = $request->input('idGroup');

        $query = "SELECT Nama_mesin, Date_operation
            FROM T_Mesin
            WHERE Id_Group = ?";
        $parameters = [$id_group];

        // $query = "SELECT Nama_mesin, Date_operation
        //     FROM T_Mesin
        //     WHERE Nama_mesin = 'JB-02'";

        return DB::connection('ConnCircular')->select($query, $parameters);
    }

    public function getPendingOrder(Request $request)
    {
        /**
         * SELECT Ord.Id_order, Bar1.NAMA_BRG, Ord.R_tgl_Start, Ord.R_tgl_Selesai, R_jumlah_order, Bar2.NAMA_BRG as Barang_Warp, Bar3.NAMA_BRG as Barang_Weft
         * FROM T_Order Ord
         * INNER JOIN PURCHASE.dbo.Y_Barang Bar1 ON Ord.Kode_Barang = Bar1.Kd_Brg
         * INNER JOIN PURCHASE.dbo.Y_Barang Bar2 ON Ord.A_kodebarang_warp = Bar2.Kd_Brg
         * INNER JOIN PURCHASE.dbo.Y_Barang Bar3 ON Ord.A_kodebarang_weft = Bar3.Kd_Brg
         * WHERE Ord.A_tgl_Start IS NULL AND Ord.A_tgl_Akhir IS NULL
         */

        $columns = array(
            1 => 'Id_order',
            2 => 'Bar1.NAMA_BRG',
            3 => 'R_jumlah_order',
            4 => 'R_tgl_Start',
            5 => 'R_tgl_Selesai',
        );

        $totalData = DB::connection('ConnCircular')
            ->table('T_Order as Ord')
            ->select(
                'Ord.Id_order',
                'Bar1.NAMA_BRG',
                'Ord.R_tgl_Start',
                'Ord.R_tgl_Selesai',
                'Ord.R_jumlah_order',
                'Bar2.NAMA_BRG as Barang_Warp',
                'Bar3.NAMA_BRG as Barang_Weft'
            )
            ->join('PURCHASE.dbo.Y_Barang as Bar1', 'Ord.Kode_Barang', '=', 'Bar1.Kd_Brg')
            ->join('PURCHASE.dbo.Y_Barang as Bar2', 'Ord.A_kodebarang_warp', '=', 'Bar2.Kd_Brg')
            ->join('PURCHASE.dbo.Y_Barang as Bar3', 'Ord.A_kodebarang_weft', '=', 'Bar3.Kd_Brg')
            ->whereNull('Ord.A_tgl_Akhir')
            ->count();

        $totalFiltered = $totalData;

        $limit = $request->input('length');
        $start = $request->input('start');

        $orderColumnIndex = $request->input('order.0.column');
        $dir = $request->input('order.0.dir');

        $defaultOrderColumn = 'Id_order';
        $defaultDir = 'asc';

        $order = isset($columns[$orderColumnIndex]) ? $columns[$orderColumnIndex] : $defaultOrderColumn;
        $dir = in_array($dir, ['asc', 'desc']) ? $dir : $defaultDir;

        if (empty($request->input('search.value'))) {
            $sp = DB::connection('ConnCircular')
                ->table('T_Order as Ord')
                ->select(
                    'Ord.Id_order',
                    'Bar1.NAMA_BRG',
                    'Ord.R_tgl_Start',
                    'Ord.R_tgl_Selesai',
                    'Ord.R_jumlah_order',
                    'Bar2.NAMA_BRG as Barang_Warp',
                    'Bar3.NAMA_BRG as Barang_Weft'
                )
                ->join('PURCHASE.dbo.Y_Barang as Bar1', 'Ord.Kode_Barang', '=', 'Bar1.Kd_Brg')
                ->join('PURCHASE.dbo.Y_Barang as Bar2', 'Ord.A_kodebarang_warp', '=', 'Bar2.Kd_Brg')
                ->join('PURCHASE.dbo.Y_Barang as Bar3', 'Ord.A_kodebarang_weft', '=', 'Bar3.Kd_Brg')
                ->whereNull('Ord.A_tgl_Akhir')
                ->offset($start)
                ->limit($limit)
                ->orderBy($order, $dir)
                ->get();
        } else {
            $search = $request->input('search.value');
            $sp = DB::connection('ConnCircular')
                ->table('T_Order as Ord')
                ->select(
                    'Ord.Id_order',
                    'Bar1.NAMA_BRG',
                    'Ord.R_tgl_Start',
                    'Ord.R_tgl_Selesai',
                    'Ord.R_jumlah_order',
                    'Bar2.NAMA_BRG as Barang_Warp',
                    'Bar3.NAMA_BRG as Barang_Weft'
                )
                ->join('PURCHASE.dbo.Y_Barang as Bar1', 'Ord.Kode_Barang', '=', 'Bar1.Kd_Brg')
                ->join('PURCHASE.dbo.Y_Barang as Bar2', 'Ord.A_kodebarang_warp', '=', 'Bar2.Kd_Brg')
                ->join('PURCHASE.dbo.Y_Barang as Bar3', 'Ord.A_kodebarang_weft', '=', 'Bar3.Kd_Brg')
                ->whereNull('Ord.A_tgl_Akhir')
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
                ->table('T_Order as Ord')
                ->select(
                    'Ord.Id_order',
                    'Bar1.NAMA_BRG',
                    'Ord.R_tgl_Start',
                    'Ord.R_tgl_Selesai',
                    'Ord.R_jumlah_order',
                    'Bar2.NAMA_BRG as Barang_Warp',
                    'Bar3.NAMA_BRG as Barang_Weft'
                )
                ->join('PURCHASE.dbo.Y_Barang as Bar1', 'Ord.Kode_Barang', '=', 'Bar1.Kd_Brg')
                ->join('PURCHASE.dbo.Y_Barang as Bar2', 'Ord.A_kodebarang_warp', '=', 'Bar2.Kd_Brg')
                ->join('PURCHASE.dbo.Y_Barang as Bar3', 'Ord.A_kodebarang_weft', '=', 'Bar3.Kd_Brg')
                ->whereNull('Ord.A_tgl_Akhir')
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

                $nestedData['RencanaMulai'] = explode(" ", $datasp->R_tgl_Start)[0];
                $nestedData['RencanaSelesai'] = explode(" ", $datasp->R_tgl_Selesai)[0];
                $nestedData['NamaBarang'] = $datasp->NAMA_BRG;
                $nestedData['JumlahOrder'] = $datasp->R_jumlah_order;
                $nestedData['IdOrder'] = $datasp->Id_order;

                $detailBarang = "<b>Nama Barang: </b><br>" . $datasp->NAMA_BRG . "<br><br>"
                    . "<b>Barang Warp: </b><br>" . $datasp->Barang_Warp . "<br><br>"
                    . "<b>Barang Weft: </b><br>" . $datasp->Barang_Weft;
                $infoClick = "showModal(`" . $detailBarang . "`, null, null, `Detail Barang`)";
                $nestedData['InfoTambahan'] = '
                    <button type="button" class="btn btn-info btn-sm" onclick="' . $infoClick . '" style="min-width: 50px">
                        i
                    </button>
                ';

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

    public function getOrderHistory(Request $request)
    {
        /**
         * SELECT Id_order, A_tgl_Start, A_tgl_Akhir, A_jumlah_Order, NAMA_BRG, D_TEK3
         * FROM T_Order Ord
         * INNER JOIN PURCHASE.dbo.Y_BARANG Bar ON Ord.Kode_barang = Bar.KD_BRG
         * WHERE A_tgl_Start IS NOT NULL
         *      AND A_tgl_Akhir IS NOT NULL
         *      AND A_jumlah_Order <> 0
         * ORDER BY Ord.Id_order
         */

        $columns = array(
            1 => 'Id_order',
            2 => 'NAMA_BRG',
            3 => 'A_jumlah_order',
            4 => 'A_tgl_Start',
            5 => 'A_tgl_Akhir',
            5 => 'D_TEK3',
        );

        $totalData = DB::connection('ConnCircular')
            ->table('T_Order as Ord')
            ->select(
                'Ord.Id_order',
                'Bar.NAMA_BRG',
                'Ord.A_tgl_Start',
                'Ord.A_tgl_Akhir',
                'Ord.A_jumlah_order',
                'Bar.D_TEK3'
            )
            ->join('PURCHASE.dbo.Y_Barang as Bar', 'Ord.Kode_Barang', '=', 'Bar.Kd_Brg')
            ->whereNotNull('Ord.A_tgl_Start')
            ->whereNotNull('Ord.A_tgl_Akhir')
            ->where('Ord.A_jumlah_order', '<>', 0)
            ->count();

        $totalFiltered = $totalData;

        $limit = $request->input('length');
        $start = $request->input('start');

        $orderColumnIndex = $request->input('order.0.column');
        $dir = $request->input('order.0.dir');

        $defaultOrderColumn = 'Id_order';
        $defaultDir = 'asc';

        $order = isset($columns[$orderColumnIndex]) ? $columns[$orderColumnIndex] : $defaultOrderColumn;
        $dir = in_array($dir, ['asc', 'desc']) ? $dir : $defaultDir;

        if (empty($request->input('search.value'))) {
            $sp = DB::connection('ConnCircular')
                ->table('T_Order as Ord')
                ->select(
                    'Ord.Id_order',
                    'Bar.NAMA_BRG',
                    'Ord.A_tgl_Start',
                    'Ord.A_tgl_Akhir',
                    'Ord.A_jumlah_order',
                    'Bar.D_TEK3'
                )
                ->join('PURCHASE.dbo.Y_Barang as Bar', 'Ord.Kode_Barang', '=', 'Bar.Kd_Brg')
                ->whereNotNull('Ord.A_tgl_Start')
                ->whereNotNull('Ord.A_tgl_Akhir')
                ->where('Ord.A_jumlah_order', '<>', 0)
                ->offset($start)
                ->limit($limit)
                ->orderBy($order, $dir)
                ->get();
        } else {
            $search = $request->input('search.value');
            $sp = DB::connection('ConnCircular')
                ->table('T_Order as Ord')
                ->select(
                    'Ord.Id_order',
                    'Bar.NAMA_BRG',
                    'Ord.A_tgl_Start',
                    'Ord.A_tgl_Akhir',
                    'Ord.A_jumlah_order',
                    'Bar.D_TEK3'
                )
                ->join('PURCHASE.dbo.Y_Barang as Bar', 'Ord.Kode_Barang', '=', 'Bar.Kd_Brg')
                ->whereNotNull('Ord.A_tgl_Start')
                ->whereNotNull('Ord.A_tgl_Akhir')
                ->where('Ord.A_jumlah_order', '<>', 0)
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
                ->table('T_Order as Ord')
                ->select(
                    'Ord.Id_order',
                    'Bar.NAMA_BRG',
                    'Ord.A_tgl_Start',
                    'Ord.A_tgl_Akhir',
                    'Ord.A_jumlah_order',
                    'Bar.D_TEK3'
                )
                ->join('PURCHASE.dbo.Y_Barang as Bar', 'Ord.Kode_Barang', '=', 'Bar.Kd_Brg')
                ->whereNotNull('Ord.A_tgl_Start')
                ->whereNotNull('Ord.A_tgl_Akhir')
                ->where('Ord.A_jumlah_order', '<>', 0)
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

                $nestedData['RencanaMulai'] = explode(" ", $datasp->A_tgl_Start)[0];
                $nestedData['RencanaSelesai'] = explode(" ", $datasp->A_tgl_Akhir)[0];
                $nestedData['NamaBarang'] = $datasp->NAMA_BRG;
                $nestedData['JumlahOrder'] = $datasp->A_jumlah_order;
                $nestedData['IdOrder'] = $datasp->Id_order;

                $nestedData['InfoTambahan'] = '
                    <button type="button" class="btn btn-info btn-sm" onclick="#" style="min-width: 50px"
                        id="btn_info_' . $datasp->Id_order . '"
                        data-dtek3="' . $datasp->D_TEK3 . '">
                        i
                    </button>
                ';

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

    public function getHasilMeter(Request $request)
    {
        /**
         * SELECT   Id_mesin, Id_order, Nama_mesin, NAMA_BRG, Tgl_Log, Id_Log, noIndek
         * FROM     dbo.VW_HEADER_POTONG WITH (NOLOCK)
         * WHERE    Tgl_Log >='1/1/2021'
         * ORDER BY Tgl_Log, Nama_mesin, Id_order, Id_Log
         */

        $columns = array(
            0 => 'Id_mesin',
            1 => 'Id_order',
            2 => 'Nama_mesin',
            3 => 'NAMA_BRG',
            4 => 'Tgl_Log',
            5 => 'Id_Log',
            6 => 'noIndek'
        );

        $maxRecords = 100;
        $totalFiltered = $maxRecords;

        $limit = $request->input('length', $maxRecords);
        $start = $request->input('start', 0);
        if ($start + $limit > $maxRecords) {
            $limit = $maxRecords - $start;
        }

        if (empty($request->input('search.value'))) {
            $sp = DB::connection('ConnCircular')
                ->table('dbo.T_Log_Mesin')
                ->select(
                    'dbo.T_Mesin.Nama_mesin',
                    'dbo.T_Log_Mesin.Id_mesin',
                    'PURCHASE.dbo.Y_BARANG.NAMA_BRG',
                    'dbo.T_Order.Id_order',
                    'dbo.T_Log_Mesin.Id_Log',
                    'dbo.T_Log_Mesin.Tgl_Log',
                    'dbo.T_Log_Mesin.noIndek'
                )
                ->join('dbo.T_Mesin', 'dbo.T_Mesin.Id_mesin', '=', 'dbo.T_Log_Mesin.Id_mesin')
                ->join('dbo.T_Order', 'dbo.T_Log_Mesin.Id_order', '=', 'dbo.T_Order.Id_order')
                ->join('PURCHASE.dbo.Y_BARANG', 'dbo.T_Order.Kode_barang', '=', 'PURCHASE.dbo.Y_BARANG.KD_BRG')
                ->where(function ($query) {
                    $query->where(function ($query) {
                        $query->where('dbo.T_Log_Mesin.Status_log', '03')
                            ->whereNull('dbo.T_Log_Mesin.Kalkulasi_Meter');
                    })
                        ->orWhere(function ($query) {
                            $query->where('dbo.T_Log_Mesin.Status_log', '03')
                                ->whereNull('dbo.T_Log_Mesin.Kalkulasi_Meter')
                                ->whereNull('dbo.T_Log_Mesin.noIndek');
                        });
                })
                ->where('dbo.T_Log_Mesin.Tgl_Log', '>=', '2023-01-01')
                ->orderBy('dbo.T_Log_Mesin.Tgl_Log')
                ->orderBy('dbo.T_Mesin.Nama_mesin')
                ->orderBy('dbo.T_Order.Id_order')
                ->orderBy('dbo.T_Log_Mesin.Id_Log')
                ->offset($start)
                ->limit($limit)
                ->get();
        } else {
            $search = $request->input('search.value');
            $sp = DB::connection('ConnCircular')
                ->table('dbo.T_Log_Mesin')
                ->select(
                    'dbo.T_Mesin.Nama_mesin',
                    'dbo.T_Log_Mesin.Id_mesin',
                    'PURCHASE.dbo.Y_BARANG.NAMA_BRG',
                    'dbo.T_Order.Id_order',
                    'dbo.T_Log_Mesin.Id_Log',
                    'dbo.T_Log_Mesin.Tgl_Log',
                    'dbo.T_Log_Mesin.noIndek'
                )
                ->join('dbo.T_Mesin', 'dbo.T_Mesin.Id_mesin', '=', 'dbo.T_Log_Mesin.Id_mesin')
                ->join('dbo.T_Order', 'dbo.T_Log_Mesin.Id_order', '=', 'dbo.T_Order.Id_order')
                ->join('PURCHASE.dbo.Y_BARANG', 'dbo.T_Order.Kode_barang', '=', 'PURCHASE.dbo.Y_BARANG.KD_BRG')
                ->where(function ($query) {
                    $query->where(function ($query) {
                        $query->where('dbo.T_Log_Mesin.Status_log', '03')
                            ->whereNull('dbo.T_Log_Mesin.Kalkulasi_Meter');
                    })
                        ->orWhere(function ($query) {
                            $query->where('dbo.T_Log_Mesin.Status_log', '03')
                                ->whereNull('dbo.T_Log_Mesin.Kalkulasi_Meter')
                                ->whereNull('dbo.T_Log_Mesin.noIndek');
                        });
                })
                ->where('dbo.T_Log_Mesin.Tgl_Log', '>=', '2023-01-01')
                ->where(function ($query) use ($search, $columns) {
                    foreach ($columns as $column) {
                        $query->orWhere($column, 'LIKE', "%{$search}%");
                    }
                })
                ->orderBy('dbo.T_Log_Mesin.Tgl_Log')
                ->orderBy('dbo.T_Mesin.Nama_mesin')
                ->orderBy('dbo.T_Order.Id_order')
                ->orderBy('dbo.T_Log_Mesin.Id_Log')
                ->offset($start)
                ->limit($limit)
                ->get();

            $totalFiltered = DB::connection('ConnCircular')
                ->table('dbo.T_Log_Mesin')
                ->join('dbo.T_Mesin', 'dbo.T_Mesin.Id_mesin', '=', 'dbo.T_Log_Mesin.Id_mesin')
                ->join('dbo.T_Order', 'dbo.T_Log_Mesin.Id_order', '=', 'dbo.T_Order.Id_order')
                ->join('PURCHASE.dbo.Y_BARANG', 'dbo.T_Order.Kode_barang', '=', 'PURCHASE.dbo.Y_BARANG.KD_BRG')
                ->where(function ($query) {
                    $query->where(function ($query) {
                        $query->where('dbo.T_Log_Mesin.Status_log', '03')
                            ->whereNull('dbo.T_Log_Mesin.Kalkulasi_Meter');
                    })
                        ->orWhere(function ($query) {
                            $query->where('dbo.T_Log_Mesin.Status_log', '03')
                                ->whereNull('dbo.T_Log_Mesin.Kalkulasi_Meter')
                                ->whereNull('dbo.T_Log_Mesin.noIndek');
                        });
                })
                ->where('dbo.T_Log_Mesin.Tgl_Log', '>=', '2023-01-01')
                ->where(function ($query) use ($search, $columns) {
                    foreach ($columns as $column) {
                        $query->orWhere($column, 'LIKE', "%{$search}%");
                    }
                })
                ->offset($start)
                ->limit($limit)
                ->count();
        }

        $data = array();
        if (!empty($sp)) {
            foreach ($sp as $index => $datasp) {
                $nestedData['NomorKu'] = $index;

                $nestedData['TanggalLog'] = explode(" ", $datasp->Tgl_Log)[0];
                $nestedData['NamaMesin'] = $datasp->Nama_mesin;
                $nestedData['NamaBarang'] = $datasp->NAMA_BRG;
                $nestedData['Meter'] = '';
                $nestedData['IdMesin'] = $datasp->Id_mesin;
                $nestedData['IdOrder'] = $datasp->Id_order;
                $nestedData['IdLog'] = $datasp->Id_Log;
                $nestedData['IdLogAwal'] = '';
                $nestedData['NoIndeks'] = $datasp->noIndek;

                $data[] = $nestedData;
            }
        }

        $json_data = array(
            "draw" => intval($request->input('draw')),
            "recordsTotal" => 100,
            "recordsFiltered" => min($totalFiltered, $maxRecords),
            "data" => $data
        );

        return response()->json($json_data);
    }

    public function hasilKonversi(Request $request)
    {
        // Mengirim data dari Form Transfer Hasil Meter ke Form Konversi

        $form_data = [
            'IdMesin' => $request->input('konversi_mesin'),
            'IdOrder' => $request->input('konversi_order'),
            'IdLog' => $request->input('konversi_log'),
            'JumlahMeter' => $request->input('konversi_meter'),
        ];

        // dd($form_data);

        return view('transaksi.formHasilKonversi', $form_data);
    }

    public function getSubKelompok(Request $request)
    {
        $search_item = $request->input('searchItem', '');
        $id_sub_kel = $request->input('subKategori');

        // sp_IdKelompok_SubKelompok
        $data = DB::connection('ConnInventory')->select(
            "SELECT DISTINCT namasubkelompok, idsubkelompok FROM vw_prg_subkel
            WHERE IdKelompok= ?
                AND (idsubkelompok LIKE ? OR namasubkelompok LIKE ?)
            ORDER BY NamaSubKelompok",
            [$id_sub_kel, "%$search_item%", "%$search_item%"]
        );

        return $this->createPaginator($data, $request->url(), $request->query(), $request->query('page', 1));
    }

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
}
