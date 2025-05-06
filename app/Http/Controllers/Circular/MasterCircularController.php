<?php

namespace App\Http\Controllers\Circular;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;
use App\Http\Controllers\HakAksesController;

class MasterCircularController extends Controller
{
    public function index($form_name)
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Circular');
        $form_data = [];

        switch ($form_name) {
            case 'formMesinType':
                $form_data = [
                    'listTypeMesin' => $this->spMesin('Sp_List_TypeMesin')
                ];
                break;

            case 'formMesinKelompok':
                $form_data = [
                    'listKelompokMesin' => $this->spMesin('Sp_List_Group')
                ];
                break;

            case 'formMesinMaster':
                $form_data = [
                    'listIdMesin' => $this->spMesin('Sp_List_Mesin'),
                    'listTypeMesin' => $this->spMesin('Sp_List_TypeMesin'),
                    'listKelompok' => $this->spMesin('Sp_List_Group'),
                    'listRawat' => $this->spMesin('Sp_List_GroupPerawatan'),
                    'listLokasi' => $this->spMesin('Sp_List_TGroupLokasi'),
                    'listIdPlc' => $this->spMesin('Sp_List_PLC_Mesin')
                ];
                break;

            case 'formKelompokRawat':
                $form_data = [
                    'listRawat' => $this->spMesin('Sp_List_GroupPerawatan')
                ];
                break;

            case 'formKelompokLokasi':
                $form_data = [
                    'listLokasi' => $this->spMesin('Sp_List_TGroupLokasi')
                ];
                break;
            default:
                return view('Circular.master.' . $form_name, compact('access'));
        }
        // dd($form_data);
        return view('Circular.master.' . $form_name, $form_data, compact('access'));
    }

    public function spMesin($sp_str, $sp_data = null)
    {
        if ($sp_data != null) {
            $sp_data = explode('~', $sp_data);
        } else
            $sp_data = [];

        switch ($sp_str) {

            #region formMesinType

            case 'Sp_List_TypeMesin':
                $sp_param = '@Kode = 1';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'Sp_Maint_TypeMesin~1':
                $sp_param = '@Kode = 1, @TypeMesin = ?, @NamaOEM = ?, @OriginalCountry = ?';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'Sp_Maint_TypeMesin~2':
                $sp_param = '@Kode = 2, @IdTypeMesin = ?, @TypeMesin = ?, @NamaOEM = ?, @OriginalCountry = ?';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'Sp_Maint_TypeMesin~3':
                $sp_param = '@Kode = 3, @IdTypeMesin = ?';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            #endregion

            #region formMesinKelompok

            case 'Sp_List_Group':
                $sp_param = '@Kode = 1';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'Sp_Maint_Group~1':
                $sp_param = '@Kode = 1, @Keterangan = ?';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'Sp_Maint_Group~2':
                $sp_param = '@Kode = 2, @IdGroup = ?, @Keterangan = ?';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'Sp_Maint_Group~3':
                $sp_param = '@Kode = 3, @IdGroup = ?';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            #endregion

            #region formMesinMaster

            case 'Sp_List_Mesin':
                $sp_param = '@Kode = 1';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'Sp_List_Mesin~2':
                $sp_param = '@Kode = 2, @IdMesin = ?';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'Sp_List_PLC_Mesin':
                $sp_param = '@Kode = 1';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'Sp_Maint_Mesin~1':
                // Jumlah Parameter: 15
                $sp_param = '@Kode = 1, @IdTypeMesin = ?, @NamaMesin = ?, @SerialNumber = ?, @DateManufacture = ?, @DateOperation = ?, @IdGroup = ?, @Active = ?, @NumberOfShutle = ?, @Rpm = ?, @MinEff = ?, @MinMesin = ?, @Premi = ?, @IdGroupPerawatan = ?, @IdLokasi = ?';

                if (count($sp_data) >= 19) {
                    // +3
                    $sp_param .= ', @StatusPLC = ?, @IdGroupPLC = ?, @IdPLC = ?';
                } else
                    $sp_param .= ', @StatusPLC = ?';

                // +1
                $sp_param .= ', @IdUser = 4384';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'Sp_Maint_Mesin~2':
                // Jumlah Parameter: 16
                $sp_param = '@Kode = 2, @IdMesin = ?, @IdTypeMesin = ?, @NamaMesin = ?, @SerialNumber = ?, @DateManufacture = ?, @DateOperation = ?, @IdGroup = ?, @Active = ?, @NumberOfShutle = ?, @Rpm = ?, @MinEff = ?, @MinMesin = ?, @Premi = ?, @IdGroupPerawatan = ?, @IdLokasi = ?';

                if (count($sp_data) >= 20) {
                    // +3
                    $sp_param .= ', @StatusPLC = ?, @IdGroupPLC = ?, @IdPLC = ?';
                } else
                    $sp_param .= ', @StatusPLC = ?';

                // +1
                $sp_param .= ', @IdUser = 4384';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'Sp_Maint_Mesin~3':
                $sp_param = '@Kode = 3, @IdMesin = ?';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            #endregion

            #region formKelompokRawat

            case 'Sp_List_GroupPerawatan':
                $sp_param = '@Kode = 1';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'Sp_Maint_GroupPerawatan~1':
                $sp_param = '@Kode = 1, @SdpKwhMeter = ?';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'Sp_Maint_GroupPerawatan~2':
                $sp_param = '@Kode = 2, @IdGroupPerawatan = ?, @SdpKwhMeter = ?';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'Sp_Maint_GroupPerawatan~3':
                $sp_param = '@Kode = 3, @IdGroupPerawatan = ?';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            #endregion

            #region formKelompokLokasi

            case 'Sp_List_TGroupLokasi':
                $sp_param = '@Kode = 1';
                return $this->executeSP('select', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'Sp_Maint_TGroupLokasi~1':
                $sp_param = '@Kode = 1, @NamaLokasi = ?';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'Sp_Maint_TGroupLokasi~2':
                $sp_param = '@Kode = 2, @IdGroupLokasi = ?, @NamaLokasi = ?';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            case 'Sp_Maint_TGroupLokasi~3':
                $sp_param = '@Kode = 3, @IdGroupLokasi = ?';
                return $this->executeSP('statement', explode('~', $sp_str)[0], $sp_param, $sp_data, 'ConnCircular');

            #endregion

            default:
                break;
        }
    }

    public function prosesMesin(Request $request)
    {
        $proses = $request->input('mode_proses');
        $sp_data = $request->input('form_data');
        $sp_str = $request->input('form_sp');

        $affected_rows = $this->spMesin($sp_str . '~' . $proses, $sp_data);

        if ($affected_rows > 0) {
            $str_info = '';
            switch ($proses) {
                case 2:
                    $str_info = 'Data Berhasil Dikoreksi!';
                    break;

                case 3:
                    $str_info = 'Data Berhasil Dihapus!';
                    break;

                default:
                    $str_info = 'Data Berhasil Disimpan!';
                    break;
            }

            return redirect()->back()->with(
                'success',
                $str_info
            );
        } else {
            return redirect()->back()->with(
                'info',
                'Tidak ada data yang diubah.'
            );
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
                $errorCode = $e->getCode();
                $errorInfo = $e->errorInfo;

                if ($errorCode == '23000' && strpos($errorInfo[2], 'DELETE statement conflicted')) {
                    return 'error - ' . 'Data tidak dapat dihapus karena telah terhubung dengan data lain!';
                } else {
                    return 'error - ' . $errorInfo[2];
                }
            }
        } else if ($action == 'select') {
            try {
                return DB::connection($conn)->select(
                    'exec ' . $sp_str . ' ' . $sp_param,
                    $sp_data
                );
            } catch (QueryException $e) {
                $errorCode = $e->getCode();
                $errorInfo = $e->errorInfo;

                return 'error - ' . $errorInfo[2];
            }
        }
    }

    public function cobaServerSide(Request $request)
    {
        $columns = array(
            0 => 'Id_mesin',
            1 => 'IdType_mesin',
            2 => 'Nama_mesin'
        );

        $totalData = DB::connection('ConnCircular')
            ->table('T_Mesin')
            ->select('Id_mesin', 'IdType_mesin', 'Nama_mesin')
            ->count();

        $totalFiltered = $totalData;

        $limit = $request->input('length');
        $start = $request->input('start');
        $order = $columns[$request->input('order.0.column')];
        $dir = $request->input('order.0.dir');

        if (empty($request->input('search.value'))) {
            $sp = DB::connection('ConnCircular')
                ->table('T_Mesin')
                ->select('Id_mesin', 'IdType_mesin', 'Nama_mesin')
                ->offset($start)
                ->limit($limit)
                ->orderBy($order, $dir)
                ->get();
        } else {
            $search = $request->input('search.value');
            $sp = DB::connection('ConnCircular')
                ->table('T_Mesin')
                ->select('Id_mesin', 'IdType_mesin', 'Nama_mesin')
                ->where('Id_mesin', 'LIKE', "%{$search}%")
                ->orWhere('IdType_mesin', 'LIKE', "%{$search}%")
                ->orWhere('Nama_mesin', 'LIKE', "%{$search}%")
                ->offset($start)
                ->limit($limit)
                ->orderBy($order, $dir)
                ->get();

            $totalFiltered = DB::connection('ConnCircular')
                ->table('T_Mesin')
                ->select('Id_mesin', 'IdType_mesin', 'Nama_mesin')
                ->where('Id_mesin', 'LIKE', "%{$search}%")
                ->orWhere('IdType_mesin', 'LIKE', "%{$search}%")
                ->orWhere('Nama_mesin', 'LIKE', "%{$search}%")
                ->count();
        }

        $data = array();
        if (!empty($sp)) {
            foreach ($sp as $index => $datasp) {
                $nestedData['NomorKu'] = $index;
                $nestedData['Id_mesin'] = $datasp->Id_mesin;
                $nestedData['IdType_mesin'] = $datasp->IdType_mesin;
                $nestedData['temp'] = 'Izumi Sagiri';
                $nestedData['Nama_mesin'] = $datasp->Nama_mesin;

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
