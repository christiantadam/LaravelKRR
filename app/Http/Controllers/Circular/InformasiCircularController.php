<?php

namespace App\Http\Controllers\Circular;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use Carbon\Carbon;

class InformasiCircularController extends Controller
{
    public function index($form_name)
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Circular');
        $form_data = [];

        switch ($form_name) {
            case 'formCounterMesin':
                $form_data = [
                    'listMesin' => $this->spOrder('Sp_List_Mesin~1'),
                ];
                break;
            default:
                return view('Circular.informasi.' . $form_name, compact('access'));
        }

        return view('Circular.informasi.' . $form_name, $form_data, compact('access'));
    }

    public function show(Request $request, $id)
    {
        if ($id == 'CekMesinTidakAktif') {
            // ambil parameter tanggal awal & akhir dari request
            $dtpTgl = $request->input('dtAwal');
            $dtpTgl1 = $request->input('dtAkhir');
            // dd($dtpTgl, $dtpTgl1);
            // ubah ke Carbon untuk hitung selisih hari
            $tglAwal = Carbon::parse($dtpTgl);
            $tglAkhir = Carbon::parse($dtpTgl1);
            $jumlahHari = $tglAwal->diffInDays($tglAkhir);
            // dd($jumlahHari);
            $listMesin = [];
            for ($j = 0; $j <= $jumlahHari; $j++) {
                $tgl = $tglAwal->copy()->addDays($j);

                $results = DB::connection('ConnCircular')->select(
                    'exec SP_1273_CIR_CEK_MesinTidakAktif @Tgl = ?',
                    [$tgl->format('Y-m-d')]
                );
                // dd($results);
                foreach ($results as $row) {
                    $listMesin[] = [
                        'Tanggal_Raw' => $tgl->format('Y-m-d'),
                        'Tanggal' => $tgl->format('m/d/Y'),
                        'Nama_mesin' => $row->Nama_mesin ?? null,
                        'Id_Order' => $row->Id_Order ?? null,
                        'Kode_barang' => $row->Kode_barang ?? null,
                        'NAMA_BRG' => $row->NAMA_BRG ?? null,
                        'R_jumlah_Order' => $row->R_jumlah_Order ?? null,
                        'A_jumlah_Order' => $row->A_jumlah_Order ?? null,
                        'Rpm' => $row->Rpm ?? null,
                    ];
                }
            }
            // dd($listMesin);
            // kembalikan dalam bentuk DataTables
            return datatables($listMesin)->make(true);
        }
    }

    public function spInformasi($sp_str, $sp_data = null)
    {
        if ($sp_data != null) {
            $sp_data = explode('~', $sp_data);
        } else
            $sp_data = [];

        switch ($sp_str) {
            #region formInfoMeter

            case 'Sp_List_ProsesMeter~5':
            case 'Sp_List_ProsesMeter~6':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1] . ', @Tanggal = ?, @Shift = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            #endregion

            #region formJadwalPotong

            case 'SP_1273_CIR_Delete_JadwalPotong':
                return $this->executeSP('statement', explode('~', $sp_str)[0], '', [], 'ConnCircular');

            case 'SP_1273_CIR_LIST_LogMesin~1':
            case 'SP_1273_CIR_LIST_LogMesin~2':
                $sp_param = '@Kode = ' . explode('~', $sp_str)[1];
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'SP_1273_CIR_Insert_JadwalPotong':
                $sp_param = '@NamaMesin = ?, @TotalMeter = ?, @StandartRoll = ?, @JumlahJam = ?, @TanggalPotong = ?, @Shift = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

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

    public function getMesinTidakAktif($tgl_awal, $tgl_akhir)
    {
        $dateRange = \Carbon\CarbonPeriod::create($tgl_awal, $tgl_akhir);
        $resultArray = [];

        foreach ($dateRange as $date) {
            $result = DB::connection('ConnCircular')
                ->table('T_Mesin')
                ->select(
                    'T_Mesin.Id_mesin',
                    'T_Mesin.Nama_mesin',
                    'T_Mesin.Id_Order',
                    'T_Order.Kode_barang',
                    'VW_TYPE_BARANG.NAMA_BRG',
                    'T_Order.R_jumlah_Order',
                    'T_Order.A_jumlah_Order',
                    'T_Mesin.Rpm'
                )
                ->join('T_Order', 'T_Mesin.Id_Order', '=', 'T_Order.Id_order')
                ->join('VW_TYPE_BARANG', 'T_Order.Kode_barang', '=', 'VW_TYPE_BARANG.KD_BRG')
                ->whereNotIn('T_Mesin.Id_mesin', function ($query) use ($date) {
                    $query->select('T_Log_Mesin.Id_mesin')
                        ->from('T_Log_Mesin')
                        ->whereDate('T_Log_Mesin.Tgl_Log', $date->format('Y-m-d')); // Ensure only date is compared
                })
                ->where('T_Mesin.Active', 'Y')
                ->orderBy('T_Mesin.Id_mesin')
                ->get();

            $resultArray = array_merge($resultArray, $result->map(function ($item) use ($date) {
                $item->Tanggal = $date->toDateString();
                return $item;
            })->toArray());
        }

        return $resultArray;
    }

    public function getLaporanHistory(Request $request)
    {
        $columns = [
            0 => 'Nama_mesin',
            1 => 'TotalMeter',
            2 => 'AvgRpm',
            3 => 'AvgShuttle',
            4 => 'Id_order',
            5 => 'NAMA_BRG'
        ];

        $tanggal = $request->input('tanggal');

        // Start building the main query
        $query = DB::connection('ConnCircular')->table(function ($query) use ($tanggal) {
            // Subquery to calculate aggregates
            $query->select([
                'Mesin.Nama_mesin',
                DB::raw('SUM(LogMesin.Counter_mesin_akhir - LogMesin.Counter_mesin_awal) AS TotalMeter'),
                DB::raw('AVG(LogMesin.A_rpm) AS AvgRpm'),
                DB::raw('AVG(LogMesin.A_n_shutle) AS AvgShuttle'),
                'LogMesin.Id_order',
                'Bar.NAMA_BRG'
            ])
                ->from('T_Log_Mesin as LogMesin')
                ->join('T_Mesin as Mesin', 'LogMesin.Id_mesin', '=', 'Mesin.Id_mesin')
                ->join('T_Order as Ord', 'LogMesin.Id_order', '=', 'Ord.Id_order')
                ->join('PURCHASE.dbo.Y_BARANG as Bar', 'Ord.Kode_barang', '=', 'Bar.KD_BRG')
                ->where('LogMesin.Tgl_Log', '=', $tanggal)
                ->groupBy('Mesin.Nama_mesin', 'Bar.NAMA_BRG', 'LogMesin.Id_order');
        }, 'SubQueryAlias'); // Provide an alias for the subquery

        // Count total data before filtering
        $totalData = $query->count();

        // Apply search filter if applicable
        $search = $request->input('search.value');
        if (!empty($search)) {
            $query->where(function ($query) use ($search, $columns) {
                foreach ($columns as $column) {
                    $query->orWhere($column, 'LIKE', "%{$search}%");
                }
            });
        }

        // Count filtered data
        $totalFiltered = $query->count();

        // Initialize variables for pagination and ordering
        $limit = $request->input('length');
        $start = $request->input('start');
        $orderColumnIndex = $request->input('order.0.column');
        $dir = $request->input('order.0.dir');

        $defaultOrderColumn = 'Nama_mesin';
        $defaultDir = 'asc';

        if ($limit == -1) {
            $limit = $totalData; // Set limit to total data count
            $start = 0; // Start from the first record
        }

        // Determine order column and direction
        $order = isset($columns[$orderColumnIndex]) ? $columns[$orderColumnIndex] : $defaultOrderColumn;
        $dir = in_array($dir, ['asc', 'desc']) ? $dir : $defaultDir;

        // Apply ordering and pagination to the main query
        $query->offset($start)
            ->limit($limit)
            ->orderBy($order, $dir);

        // Execute the main query
        $sp = $query->get();

        // Prepare the data for DataTables response
        $data = [];
        foreach ($sp as $index => $datasp) {
            $nestedData['NomorKu'] = $index;
            $nestedData['NamaMesin'] = $datasp->Nama_mesin;
            $nestedData['TotalMeter'] = $datasp->TotalMeter;
            $nestedData['AvgRpm'] = $datasp->AvgRpm;
            $nestedData['AvgShuttle'] = $datasp->AvgShuttle;
            $nestedData['IdOrder'] = $datasp->Id_order;
            $nestedData['NamaBarang'] = $datasp->NAMA_BRG;

            $data[] = $nestedData;
        }

        // Prepare JSON response for DataTables
        $json_data = [
            "draw" => intval($request->input('draw')),
            "recordsTotal" => intval($totalData),
            "recordsFiltered" => intval($totalFiltered),
            "data" => $data
        ];

        return response()->json($json_data);
    }
}
