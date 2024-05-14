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
            ->orderBy('NamaUser')
            ->where('IsActive', true)
            ->whereNotNull('Password')
            ->get(); //get all user in UserMaster that has registered login page
        $lokasi = DB::connection('ConnUtility')->table('Lokasi')->get();
        return view('Utility.Master.MaintenanceTeknisi', compact('access', 'teknisi', 'lokasi'));
    }


    public function saveTeknisi(Request $request)
    {
        try {
            $IdUserMaster = $request->input('NamaTeknisi');
            $cekInput = DB::connection('ConnUtility')->table('Utility_Teknisi')
                ->where('IdUserMaster', $IdUserMaster)
                ->get();
            if ($cekInput->isEmpty()) {
                if ($request->addedValues !== "[]") {
                    $addedValues = json_decode($request->Lokasi);
                    $addedValuesString = implode(', ', $addedValues);
                    DB::connection('ConnUtility')->statement('EXEC SP_MAINTENANCE_UTILITY_TEKNISI @Kode = ?,@IdUserMaster = ?', [1, $IdUserMaster]);
                    $idTeknisi = DB::connection('ConnUtility')->table('Utility_Teknisi')
                    ->where('IdUserMaster', $IdUserMaster)
                    ->select('Id_Teknisi')
                    ->get();
                    DB::connection('ConnUtility')->statement('exec SP_MAINTENANCE_UTILITY_TEKNISI @Kode = ?, @XKode = ?, @Id_Teknisi = ?, @AddedValues = ?', [3, 2, $idTeknisi->pluck('Id_Teknisi')->all()[0], $addedValuesString]);
                    return response()->json(['success' => 'Data Teknisi berhasil disimpan']);
                }
            } else {
                return response()->json(['error' => 'Teknisi Sudah terdaftar! Silahkan Edit Lokasi']);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }


    public function updateTeknisi(Request $request)
    {
        try {
            if ($request->deletedValues !== "[]") {
                $deletedValues = json_decode($request->deletedValues);
                // $detedValuesString = implode(', ', $deletedValues);
                for ($i = 0; $i < count($deletedValues); $i++) {
                    DB::connection('ConnUtility')->statement('exec SP_MAINTENANCE_UTILITY_TEKNISI @Kode = ?, @XKode = ?, @Id_Teknisi = ?, @DeletedValues = ?', [3, 1, $request->input('Teknisi'), $deletedValues[$i]]);
                }
            }
            if ($request->addedValues !== "[]") {
                $addedValues = json_decode($request->addedValues);
                $addedValuesString = implode(', ', $addedValues);
                DB::connection('ConnUtility')->statement('exec SP_MAINTENANCE_UTILITY_TEKNISI @Kode = ?, @XKode = ?, @Id_Teknisi = ?, @AddedValues = ?', [3, 2, $request->input('Teknisi'), $addedValuesString]);

            }
            return response()->json(['success' => 'Data Teknisi berhasil diperbarui']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function getTeknisiById(Request $request)
    {
        $id = $request->input('id');
        $lokasi = $request->input('lokasi');

        if (strpos($lokasi, ',') !== false) {
            // If yes, explode $lokasi into an array
            $lokasiArray = explode(',', $lokasi);
        } else {
            // If no, make $lokasi an array
            $lokasiArray = [$lokasi];
        }

        $listTeknisi = DB::connection('ConnUtility')
            ->table('Utility_Teknisi')
            ->join('Teknisi_Lokasi_Assignment', 'Utility_Teknisi.Id_Teknisi', 'Teknisi_Lokasi_Assignment.Id_Teknisi')
            ->join('Lokasi', 'Teknisi_Lokasi_Assignment.Id_lokasi', 'Lokasi.Id_lokasi')
            ->where('Utility_Teknisi.Id_Teknisi', $id)
            ->whereIn('Lokasi.Lokasi', $lokasiArray)
            ->select('IdUserMaster')
            ->first();

        return response()->json($listTeknisi);
    }

    public function AllLokasiTeknisi($idTeknisi)
    {
        if ($idTeknisi == 0) {
            $listLokasi = DB::connection('ConnUtility')
                ->table('Lokasi')
                ->get();
            $data = [
                $listLokasi
            ];
        } else {
            $listLokasi = DB::connection('ConnUtility')
                ->table('Lokasi')
                ->get();
            $listLokasiTeknisi = DB::connection('ConnUtility')
                ->table('Teknisi_Lokasi_Assignment')
                ->join('Lokasi', 'Teknisi_Lokasi_Assignment.Id_lokasi', 'Lokasi.Id_lokasi')
                ->where('Teknisi_Lokasi_Assignment.Id_Teknisi', $idTeknisi)
                ->select('Lokasi.id_lokasi', 'Lokasi.lokasi')
                ->get();
            $data = [
                $listLokasi,
                $listLokasiTeknisi
            ];
        }
        return response()->json($data);
    }

    public function getTeknisi()
    {
        $listTeknisi = DB::connection('ConnUtility')->select('exec SP_MAINTENANCE_UTILITY_TEKNISI');
        $groupedTeknisi = [];
        foreach ($listTeknisi as $teknisi) {
            $namaUser = $teknisi->NamaUser;
            $lokasi = $teknisi->Lokasi;
            $idTeknisi = $teknisi->Id_Teknisi;

            // If technician already exists in groupedTeknisi, concatenate the location
            if (array_key_exists($namaUser, $groupedTeknisi)) {
                $groupedTeknisi[$namaUser]['Lokasi'] .= ", $lokasi";
            } else {
                $groupedTeknisi[$namaUser] = [
                    'NamaUser' => $namaUser,
                    'Lokasi' => $lokasi,
                    'Id_Teknisi' => $idTeknisi
                ];
            }
        }

        // Convert the grouped technicians back to a sequential array
        $formattedTeknisi = array_values($groupedTeknisi);

        return datatables($formattedTeknisi)->make(true);
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
