<?php

namespace App\Http\Controllers\Utility\Elektrik;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;


class InputGangguanElektrikBulananController extends Controller
{
    public function index()
    {
        $divisi = DB::connection('ConnUtility')->select('exec SP_LIST_DIVISI_PELAPOR');

        $access = (new HakAksesController)->HakAksesFiturMaster('Utility');

        return view('Utility.Elektrik.InputGangguanBulanan.InputGangguanBulanan', compact('divisi', 'access'));
    }


    public function postDataBulanan(Request $request)
    {
        try {
            // dd($request->all());
            $bulan = $request->input('bulan');
            $nama = $request->input('nama');
            $masalah = $request->input('masalah');
            $pabrik = $request->input('pabrik');
            $image = $request->file('gambar1');
            $solusi = $request->file('solusi');
            $status = $request->input('status');
            $imageBinary = null;
            if ($image) {
                $binaryReader = fopen($image, 'rb');
                $imageBinary = fread($binaryReader, $image->getSize());
                fclose($binaryReader);
            }

            $data = DB::connection('ConnUtility')->table('Gangguan_Elektrik_Bulanan')->insert([
                'Bulan' => $bulan,
                'Nama' => $nama,
                'Pabrik' => $pabrik,
                'Masalah' => $masalah,
                'GambarGangguan' => $imageBinary ? DB::raw('0x' . bin2hex($imageBinary)) : null,
                'Status' => $status,
                'Solusi' =>null,
                'GambarSelesai' => null,
            ]);
            return response()->json(['success' => true, 'data' => $data]);
        } catch (\Throwable $th) {
            return $th;
        }
    }

    public function selectImageBulanan($id, $imageName)
    {
        $imageData = DB::connection('ConnUtility')
            ->table('Gangguan_Elektrik_Bulanan')
            ->select($imageName)
            ->where('No', $id)
            ->first();

        if ($imageData) {
            $imageContent = $imageData->$imageName;

            return Response::make($imageContent, 200, [
                'Content-Type' => 'image/*',
                'Content-Disposition' => 'inline; filename="' . $imageName . '.jpg"',
            ]);
        }

        return response()->json(['message' => 'Image not found']);
    }

    public function getDataBulananId(Request $request)
    {
        $id = $request->input('id');
        $data = DB::connection('ConnUtility')
            ->table('Gangguan_Elektrik_Bulanan')
            ->where('No', $id)
            ->select('No', 'Bulan', 'Nama', 'Pabrik', 'Masalah', 'Status', 'Solusi')
            ->first();


        if (!$data) {
            return response()->json(['message' => 'Data not found'], 404);
        }
        return response()->json($data, 200);
    }

    public function updateDataBulanan(Request $request)
    {
        try {
            $bulan = $request->input('bulan');
            $nama = $request->input('nama');
            $masalah = $request->input('masalah');
            $pabrik = $request->input('pabrik');
            $status = $request->input('status');
            $solusi = $request->input('solusi');
            $id = $request->input('ID');

            // gambar 1
            $image = $request->file('gambar1');
            $imageBinary = null;
            if ($image) {
                $binaryReader = fopen($image, 'rb');
                $imageBinary = fread($binaryReader, $image->getSize());
                fclose($binaryReader);
            }

            // gambar 2
            $image2 = $request->file('gambar2');
            $imageBinary2 = null;
            if ($image2) {
                $binaryReader2 = fopen($image2, 'rb');
                $imageBinary2 = fread($binaryReader2, $image2->getSize());
                fclose($binaryReader2);
            }


            $save = DB::connection('ConnUtility')->table('Gangguan_Elektrik_Bulanan')->where('No', $id);

            $updateData = [
                'Bulan' => $bulan,
                'Nama' => $nama,
                'Pabrik' => $pabrik,
                'Masalah' => $masalah,
                'Status' => $status,
                'Solusi' => $solusi,
            ];
            // Jika ada gambar1 yang diunggah
            if ($imageBinary) {
                $updateData['GambarGangguan'] = DB::raw('0x' . bin2hex($imageBinary));
            }
            // Jika ada gambar2 yang diunggah
            if ($imageBinary2) {
                $updateData['GambarSelesai'] = DB::raw('0x' . bin2hex($imageBinary2));
            }

            $save->update($updateData);
            return response()->json(['success' => true, 'data' => $save]);
        } catch (\Throwable $th) {
            // dd($save);
            return $th;
        }
    }

    public function getDataBulanan()
    {
        $data = DB::connection('ConnUtility')->select('exec SP_4372_Insert_Gangguan_Electric_Bulanan @kode=0');
        return datatables($data)->make(true);
    }

    public function deleteDataBulanan(Request $request)
    {

        $Id = $request->input('id');

        try {
            foreach ($Id as $id) {
                DB::connection('ConnUtility')->statement('exec SP_4372_Insert_Gangguan_Electric_Bulanan @kode=3, @no= ?', [$id]);
            }

            return response()->json(['success' => true, 'message' => 'Data deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Error deleting data: ' . $e->getMessage()]);
        }
    }
}
