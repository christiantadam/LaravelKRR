<?php

namespace App\Http\Controllers\Utility\Project;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;

class InputProjectController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Utility');

        return view('Utility.Project.InputProject.InputProject', compact('access'));
    }

    public function postDataProject(Request $request)
    {
        // dd($request->all());
        //
        try {
            $Kode = '1';
            $NamaMesin = $request->input('nama_mesin');
            $NamaProject = $request->input('nama_project');;
            $TglMulai = $request->input('tanggal_mulai');
            $TglSelesai = $request->input('tanggal_selesai');
            $Keterangan = $request->input('keterangan');
            $Id = $request->input('id');
            $user_input = Auth::user()->NomorUser;
            $KeteranganKerja = $request->input('keterangan_kerusakan');
            $MerkMesin = $request->input('merk_mesin');
            $LokasiMesin = $request->input('lokasi_mesin');
            $TahunBuat = $request->input('tahun_pembuatan');
            $Perbaikan = $request->input('perbaikan');
            $ketGambar1 = $request->input('ketgambar1');
            $ketGambar2 = $request->input('ketgambar2');



            $image = $request->file('gambar1data');
            $imageBinary = null;
            if ($image) {
                $binaryReader = fopen($image, 'rb');
                $imageBinary = fread($binaryReader, $image->getSize());
                fclose($binaryReader);
            }

            // gambar 2
            $image2 = $request->file('gambar2data');
            $imageBinary2 = null;
            if ($image2) {
                $binaryReader2 = fopen($image2, 'rb');
                $imageBinary2 = fread($binaryReader2, $image2->getSize());
                fclose($binaryReader2);
            }

            DB::connection('ConnUtility')->statement('exec SP_1273_UTY_MAINT_PROJECT ?,?,?,?,?,?,?,?,?,?,?,?,?', [
                $Kode,
                $NamaMesin,
                $NamaProject,
                $TglMulai,
                $TglSelesai,
                $Keterangan,
                $user_input,
                $KeteranganKerja,
                $Id,
                $MerkMesin,
                $LokasiMesin,
                $TahunBuat,
                $Perbaikan,
            ]);


            $insertedId = DB::connection('ConnUtility')->getPdo()->lastInsertId();

            $save = DB::connection('ConnUtility')->table('GAMBAR_PROJECT')->insert([
                'Id' => $insertedId,
                'Gambar1' => $imageBinary ? DB::raw('0x' . bin2hex($imageBinary)) : null,
                'KeteranganGambar1' => $imageBinary ? $ketGambar1 : null,
                'Gambar2' => $imageBinary2 ? DB::raw('0x' . bin2hex($imageBinary2)) : null,
                'KeteranganGambar2' => $imageBinary2 ? $ketGambar2 : null,
                'UserInput' => $user_input,
                'UserKoreksi' => null,
            ]);

            return response()->json(['success' => true, 'data' => $save]);


            if ($save) {
                return response()->json(['success' => true]);
            } else {
                return response()->json(['error' => 'Gagal menyimpan data.'], 500);
            }
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Terjadi kesalahan internal.'], 500);
        }
        // return($request->all());
    }


    public function getDataProject(Request $request)
    {
        try {
            $bulan = $request->input('bulan');
            $tahun = $request->input('tahun');
            $user_input = Auth::user()->NomorUser;

            if ($tahun == '' || $bulan == '') {
                $data = DB::connection('ConnUtility')->table('PROJECT')->get();
            } else {
                $data = DB::connection('ConnUtility')->select('exec SP_1273_UTY_LIST_PROJECT @Kode=?, @UserId=?, @bulan=?, @tahun=?', ['4', $user_input, $bulan, $tahun]);
            }
            return datatables($data)->make(true);
        } catch (\Exception $e) {
            // Handle the error if any
            return response()->json(['error' => 'Internal Server Error.'], 500);
        }
    }


    public function deleteDataProject(Request $request)
    {
        try {
            // Retrieve the ID to be deleted from the request
            $idToDelete = $request->input('id');

            // Check if the provided Kode is '3'
            $Kode = '3';
            if ($Kode == '3') {
                // Perform deletion logic for PROJECT table
                DB::connection('ConnUtility')->table('PROJECT')->where('Id', $idToDelete)->delete();

                // Return a success response
                return response()->json(['success' => true, 'message' => 'Data deleted successfully']);
            } else {
                // Return an error response if Kode is not '3'
                return response()->json(['success' => false, 'message' => 'Invalid Kode.']);
            }
        } catch (\Exception $e) {
            // Return an error response
            return response()->json(['success' => false, 'message' => 'Error deleting data: ' . $e->getMessage()]);
        }
    }

    public function selectImage($id, $imageName)
    {
        // Validate $imageName to make sure it's one of the allowed image names (e.g., 'Gambar1', 'Gambar2')

        $imageData = DB::connection('ConnUtility')
            ->table('GAMBAR_PROJECT')
            ->select($imageName, 'Keterangan' . $imageName)
            ->where('Id', $id)
            ->first();

        if ($imageData) {
            $imageContent = $imageData->$imageName;
            $keterangan = $imageData->{'Keterangan' . $imageName};

            return Response::make($imageContent, 200, [
                'Content-Type' => 'image/*', // Adjust the content type based on your image format
                'Content-Disposition' => 'inline; filename="' . $imageName . '.jpg"',
            ])->header('Image-Description', $keterangan);
        }

        return response()->json(['message' => 'Image not found']);
    }

    public function getDataProjectId(Request $request)
    {
        $id = $request->input('id');
        $data = DB::connection('ConnUtility')->table('PROJECT')->where('Id', $id)->first();

        if (!$data) {
            return response()->json(['message' => 'Data not found'], 404);
        }

        return response()->json($data, 200);
    }
    public function getNamaUser(Request $request)
    {
        $nama_user = $request->input('nama_user');
        $data = DB::connection('EDP')->table('UserMaster')->where('NamaUser', $nama_user)->first();

        if (!$data) {
            return response()->json(['message' => 'Data not found'], 404);
        }

        return response()->json($data, 200);
    }

    public function getDataUserId(Request $request)
    {
        try {
            $user_input = Auth::user()->NomorUser;

            return response()->json(['success' => true, 'NomorUser' => $user_input]);
        } catch (\Throwable $th) {
            report($th);
            return response()->json(['success' => false, 'message' => $th->getMessage()]);
        }
    }
    //Show the form for creating a new resource.

    public function updateDataProject(Request $request)
    {
        try {
            $Kode = '2';
            $Id = $request->input('ID');
            $NamaProject = $request->input('nama_project');
            $NamaMesin = $request->input('nama_mesin');
            $TglMulai = $request->input('tanggal_mulai');
            $TglSelesai = $request->input('tanggal_selesai');
            $Keterangan = $request->input('keterangan');
            // $Id = $request->input('id');
            $user_input = Auth::user()->NomorUser;
            $KeteranganKerja = $request->input('keterangan_kerusakan');
            $MerkMesin = $request->input('merk_mesin');
            $LokasiMesin = $request->input('lokasi_mesin');
            $TahunBuat = $request->input('tahun_pembuatan');
            $Perbaikan = $request->input('perbaikan');
            $ketGambar1 = $request->input('ketgambar1');
            $ketGambar2 = $request->input('ketgambar2');

            $data = DB::connection('ConnUtility')->statement('exec SP_1273_UTY_MAINT_PROJECT ?,?,?,?,?,?,?,?,?,?,?,?,?', [
                $Kode,
                $NamaMesin,
                $NamaProject,
                $TglMulai,
                $TglSelesai,
                $Keterangan,
                $user_input,
                $KeteranganKerja,
                $Id,
                $MerkMesin,
                $LokasiMesin,
                $TahunBuat,
                $Perbaikan,
            ]);


            $image = $request->file('gambar1data');
            $imageBinary = null;
            if ($image) {
                $binaryReader = fopen($image, 'rb');
                $imageBinary = fread($binaryReader, $image->getSize());
                fclose($binaryReader);
            }

            // gambar 2
            $image2 = $request->file('gambar2data');
            $imageBinary2 = null;
            if ($image2) {
                $binaryReader2 = fopen($image2, 'rb');
                $imageBinary2 = fread($binaryReader2, $image2->getSize());
                fclose($binaryReader2);
            }

            $save = DB::connection('ConnUtility')->table('GAMBAR_ELEKTRIK')->where('Id', $Id);

            $updateData = [
                'KeteranganGambar1' => $ketGambar1,
                'KeteranganGambar2' => $ketGambar2,
                // 'UserInput' => $user_input,
                'UserKoreksi' => $user_input,
            ];
            // Jika ada gambar1 yang diunggah
            if ($imageBinary) {
                $updateData['Gambar1'] = DB::raw('0x' . bin2hex($imageBinary));
            }
            // Jika ada gambar2 yang diunggah
            if ($imageBinary2) {
                $updateData['Gambar2'] = DB::raw('0x' . bin2hex($imageBinary2));
            }
            $save->update($updateData);


            return response()->json(['success' => true, 'data' => $save]);
        } catch (\Exception $e) {
        }
    }
}
