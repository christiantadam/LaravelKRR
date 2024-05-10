<?php

namespace App\Http\Controllers\Utility\Master;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Support\Facades\Response;


class MaintenanceTeknisi extends Controller
{

    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Utility');
        $teknisi = DB::connection('ConnEDP')
            ->table('UserMaster')
            ->leftJoin('Utility.dbo.utility_teknisi', 'UserMaster.IdUser', '=', 'utility_teknisi.IdUserMaster')
            ->orderBy('NamaUser')
            ->where('IsActive', true)
            ->whereNotNull('Password')
            ->whereNull('utility_teknisi.IdUserMaster')
            ->get();
        $lokasi = DB::connection('ConnEDP')->table('Lokasi')->get();
        return view('Utility.Master.MaintenanceTeknisi', compact('access', 'teknisi', 'lokasi'));
    }


    public function saveTeknisi(Request $request)
    {
        try {
            $IdUserMaster = $request->input('NamaTeknisi');
            $Lokasi = $request->input('Lokasi');

            DB::connection('ConnUtility')->statement('EXEC SP_MAINTENANCE_UTILITY_TEKNISI @Kode = ?,@IdUserMaster = ?,@Lokasi = ?', [1, $IdUserMaster, $Lokasi]);

            return response()->json(['success' => 'Data Teknisi berhasil disimpan']);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Terjadi kesalahan saat menyimpan data. Silakan coba lagi.');
        }
    }


    public function updateTeknisi(Request $request)
    {
        try {
            $id = $request->input('ID');
            $Teknisi = $request->input('Teknisi');
            $Lokasi = $request->input('Lokasi');

            $data = DB::connection('ConnUtility')->statement('EXEC SP_MAINTENANCE_UTILITY_TEKNISI @Kode = ?, @IdUserMaster= ?, @Id_Teknisi = ?, @Lokasi = ?', [3, $id, $Teknisi, $Lokasi]);
            return response()->json($data);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'An error occurred while saving the data. Please try again.');
        }
    }

    public function getTeknisiById(Request $request)
    {
        $id = $request->input('id');

        $listTeknisi = DB::connection('ConnUtility')
            ->table('Utility_Teknisi')
            ->where('Id_Teknisi', $id)
            ->first();

        return response()->json($listTeknisi);
    }

    public function getTeknisi()
    {
        $listTeknisi = DB::connection('ConnUtility')->select('exec SP_MAINTENANCE_UTILITY_TEKNISI');

        return datatables($listTeknisi)->make(true);
    }

    public function deleteTeknisi(Request $request)
    {
        try {
            $Id = $request->input('id');

            DB::connection('ConnUtility')->statement('exec SP_MAINTENANCE_UTILITY_TEKNISI @Kode = ?, @Id_Teknisi = ?', [2, $Id]);

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            // Log::error('Error deleting Teknisi: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while deleting the data. Please try again.']);
        }
    }
}
