<?php

namespace App\Http\Controllers\Utility\Elektrik;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;

class TambahGambarElektrikController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {
        $divisi = DB::connection('ConnUtility')->select('exec SP_LIST_DIVISI_PELAPOR');
        $access = (new HakAksesController)->HakAksesFiturMaster('Utility');

        return view('Utility.Elektrik.TambahGambar.TambahGambar', compact('divisi', 'access'));
    }


    public function getDataGambar(Request $request)
    {


        $tanggal1 = $request->input('tanggal1');
        $tanggal2 = $request->input('tanggal2');
        $l_div_pelapor = $request->input('divisi');

        // Execute the stored procedure and fetch data
        $data = DB::connection('ConnUtility')->select('exec SP_DT_LIST_GANGGUAN_ELEKTRIK_BLN_THN2 @date1 = ?, @date2 = ?,  @divisi = ?', [$tanggal1, $tanggal2, $l_div_pelapor]);
        // Return data as a JSON response
        return datatables($data)->make(true);
    }

    public function checkData(Request $request)
    {
        $idToCheck = $request->input('Id');

        $existingData = DB::connection('ConnUtility')
            ->table('GAMBAR_ELEKTRIK')
            ->where('IdLaporan', $idToCheck)
            ->whereNotNull('Gambar1')
            ->whereNotNull('Gambar2')
            ->first();

        if ($existingData) {
            return response()->json(['status' => 200, 'message' => 'Data ada.']);
        } else {
            return response()->json(['status' => 404, 'message' => 'Data tidak lengkap. Gambar 1 dan Gambar 2 harus terisi.']);
        }
    }




    public function postDataGambar(Request $request)
    {
        try {


            // dd($request->all());
            $user_input = Auth::user()->NomorUser;
            $idToCheck = $request->input('Id');
            $Keterangan3 = $request->input('ketgambar3');
            $Keterangan4 = $request->input('ketgambar4');
            $Keterangan5 = $request->input('ketgambar5');
            $Keterangan6 = $request->input('ketgambar6');
            $Keterangan7 = $request->input('ketgambar7');
            $Keterangan8 = $request->input('ketgambar8');
            $Keterangan9 = $request->input('ketgambar9');
            $Keterangan10 = $request->input('ketgambar10');

            // gambar 3
            $image3 = $request->file('gambar3data');
            $imageBinary3 = null;
            if ($image3) {
                $binaryReader3 = fopen($image3, 'rb');
                $imageBinary3 = fread($binaryReader3, $image3->getSize());
                fclose($binaryReader3);
            }
            // gambar 4
            $image4 = $request->file('gambar4data');
            $imageBinary4 = null;
            if ($image4) {
                $binaryReader4 = fopen($image4, 'rb');
                $imageBinary4 = fread($binaryReader4, $image4->getSize());
                fclose($binaryReader4);
            }
            // gambar 5
            $image5 = $request->file('gambar5data');
            $imageBinary5 = null;
            if ($image5) {
                $binaryReader5 = fopen($image5, 'rb');
                $imageBinary5 = fread($binaryReader5, $image5->getSize());
                fclose($binaryReader5);
            }
            // gambar 6
            $image6 = $request->file('gambar6data');
            $imageBinary6 = null;
            if ($image6) {
                $binaryReader6 = fopen($image6, 'rb');
                $imageBinary6 = fread($binaryReader6, $image6->getSize());
                fclose($binaryReader6);
            }
            // gambar 7
            $image7 = $request->file('gambar7data');
            $imageBinary7 = null;
            if ($image7) {
                $binaryReader7 = fopen($image7, 'rb');
                $imageBinary7 = fread($binaryReader7, $image7->getSize());
                fclose($binaryReader7);
            }
            // gambar 8
            $image8 = $request->file('gambar8data');
            $imageBinary8 = null;
            if ($image8) {
                $binaryReader8 = fopen($image8, 'rb');
                $imageBinary8 = fread($binaryReader8, $image8->getSize());
                fclose($binaryReader8);
            }
            // gambar 9
            $image9 = $request->file('gambar9data');
            $imageBinary9 = null;
            if ($image9) {
                $binaryReader9 = fopen($image9, 'rb');
                $imageBinary9 = fread($binaryReader9, $image9->getSize());
                fclose($binaryReader9);
            }
            // gambar 10
            $image10 = $request->file('gambar10data');
            $imageBinary10 = null;
            if ($image10) {
                $binaryReader10 = fopen($image10, 'rb');
                $imageBinary10 = fread($binaryReader10, $image10->getSize());
                fclose($binaryReader10);
            }


            $save = DB::connection('ConnUtility')->table('GAMBAR_ELEKTRIK')->where('IdLaporan', $idToCheck);
            $data = [];
            if ($imageBinary3) {
                $data['Gambar3'] = DB::raw('0x' . bin2hex($imageBinary3));
                $data['KeteranganGambar3'] = $Keterangan3;
            }
            // Jika ada gambar2 yang diunggah
            if ($imageBinary4) {
                $data['Gambar4'] = DB::raw('0x' . bin2hex($imageBinary4));
                $data['KeteranganGambar4'] = $Keterangan4;
            }
            if ($imageBinary5) {
                $data['Gambar5'] = DB::raw('0x' . bin2hex($imageBinary5));
                $data['KeteranganGambar5'] = $Keterangan5;
            }
            if ($imageBinary6) {
                $data['Gambar6'] = DB::raw('0x' . bin2hex($imageBinary6));
                $data['KeteranganGambar6'] = $Keterangan6;
            }
            if ($imageBinary7) {
                $data['Gambar7'] = DB::raw('0x' . bin2hex($imageBinary7));
                $data['KeteranganGambar7'] = $Keterangan7;
            }
            if ($imageBinary8) {
                $data['Gambar8'] = DB::raw('0x' . bin2hex($imageBinary8));
                $data['KeteranganGambar8'] = $Keterangan8;
            }
            if ($imageBinary9) {
                $data['Gambar9'] = DB::raw('0x' . bin2hex($imageBinary9));
                $data['KeteranganGambar9'] = $Keterangan9;
            }
            if ($imageBinary10) {
                $data['Gambar10'] = DB::raw('0x' . bin2hex($imageBinary10));
                $data['KeteranganGambar10'] = $Keterangan10;
            }
            $save->update($data);

            return response()->json(['success' => true, 'message' => 'Image saved successfully']);
        } catch (\Throwable $th) {
            report($th);
            return $th;
        }
    }

    public function updateDataGambar(Request $request)
    {
        try {
            // dd($request->all());
            $user_input = Auth::user()->NomorUser;
            $idToCheck = $request->input('Id');
            $Keterangan3 = $request->input('ketgambar3');
            $Keterangan4 = $request->input('ketgambar4');
            $Keterangan5 = $request->input('ketgambar5');
            $Keterangan6 = $request->input('ketgambar6');
            $Keterangan7 = $request->input('ketgambar7');
            $Keterangan8 = $request->input('ketgambar8');
            $Keterangan9 = $request->input('ketgambar9');
            $Keterangan10 = $request->input('ketgambar10');

            // gambar 3
            $image3 = $request->file('gambar3data');
            $imageBinary3 = null;
            if ($image3) {
                $binaryReader3 = fopen($image3, 'rb');
                $imageBinary3 = fread($binaryReader3, $image3->getSize());
                fclose($binaryReader3);
            }
            // gambar 4
            $image4 = $request->file('gambar4data');
            $imageBinary4 = null;
            if ($image4) {
                $binaryReader4 = fopen($image4, 'rb');
                $imageBinary4 = fread($binaryReader4, $image4->getSize());
                fclose($binaryReader4);
            }
            // gambar 5
            $image5 = $request->file('gambar5data');
            $imageBinary5 = null;
            if ($image5) {
                $binaryReader5 = fopen($image5, 'rb');
                $imageBinary5 = fread($binaryReader5, $image5->getSize());
                fclose($binaryReader5);
            }
            // gambar 6
            $image6 = $request->file('gambar6data');
            $imageBinary6 = null;
            if ($image6) {
                $binaryReader6 = fopen($image6, 'rb');
                $imageBinary6 = fread($binaryReader6, $image6->getSize());
                fclose($binaryReader6);
            }
            // gambar 7
            $image7 = $request->file('gambar7data');
            $imageBinary7 = null;
            if ($image7) {
                $binaryReader7 = fopen($image7, 'rb');
                $imageBinary7 = fread($binaryReader7, $image7->getSize());
                fclose($binaryReader7);
            }
            // gambar 8
            $image8 = $request->file('gambar8data');
            $imageBinary8 = null;
            if ($image8) {
                $binaryReader8 = fopen($image8, 'rb');
                $imageBinary8 = fread($binaryReader8, $image8->getSize());
                fclose($binaryReader8);
            }
            // gambar 9
            $image9 = $request->file('gambar9data');
            $imageBinary9 = null;
            if ($image9) {
                $binaryReader9 = fopen($image9, 'rb');
                $imageBinary9 = fread($binaryReader9, $image9->getSize());
                fclose($binaryReader9);
            }
            // gambar 10
            $image10 = $request->file('gambar10data');
            $imageBinary10 = null;
            if ($image10) {
                $binaryReader10 = fopen($image10, 'rb');
                $imageBinary10 = fread($binaryReader10, $image10->getSize());
                fclose($binaryReader10);
            }

            $save = DB::connection('ConnUtility')->table('GAMBAR_ELEKTRIK')->where('IdLaporan', $idToCheck);
            $data = [];
            if ($imageBinary3) {
                $data['Gambar3'] = DB::raw('0x' . bin2hex($imageBinary3));
                $data['KeteranganGambar3'] = $Keterangan3;
            }
            // Jika ada gambar2 yang diunggah
            if ($imageBinary4) {
                $data['Gambar4'] = DB::raw('0x' . bin2hex($imageBinary4));
                $data['KeteranganGambar4'] = $Keterangan4;
            }
            if ($imageBinary5) {
                $data['Gambar5'] = DB::raw('0x' . bin2hex($imageBinary5));
                $data['KeteranganGambar5'] = $Keterangan5;
            }
            if ($imageBinary6) {
                $data['Gambar6'] = DB::raw('0x' . bin2hex($imageBinary6));
                $data['KeteranganGambar6'] = $Keterangan6;
            }
            if ($imageBinary7) {
                $data['Gambar7'] = DB::raw('0x' . bin2hex($imageBinary7));
                $data['KeteranganGambar7'] = $Keterangan7;
            }
            if ($imageBinary8) {
                $data['Gambar8'] = DB::raw('0x' . bin2hex($imageBinary8));
                $data['KeteranganGambar8'] = $Keterangan8;
            }
            if ($imageBinary9) {
                $data['Gambar9'] = DB::raw('0x' . bin2hex($imageBinary9));
                $data['KeteranganGambar9'] = $Keterangan9;
            }
            if ($imageBinary10) {
                $data['Gambar10'] = DB::raw('0x' . bin2hex($imageBinary10));
                $data['KeteranganGambar10'] = $Keterangan10;
            }
            $save->update($data);
            return response()->json(['success' => true, 'message' => 'Image updated successfully']);
        } catch (\Throwable $th) {
            report($th);
            return $th;
        }
    }

    public function SelectImages($id, $imageName)
    {
        $imageData = DB::connection('ConnUtility')
            ->table('GAMBAR_ELEKTRIK')
            ->select($imageName, 'Keterangan' . $imageName)
            ->where('IdLaporan', $id)
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
}
