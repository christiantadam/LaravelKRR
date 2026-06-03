<?php

namespace App\Http\Controllers\Guard\Pemeriksaan;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Log;
use App\Http\Controllers\HakAksesController;
use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Encryption\Encrypter;

class ACCGudangPBController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Guard');

        // dd($listTypeBarang);
        // $listNoPol = collect($listNoPol)
        //     ->whereIn('IdType_Mesin', [13, 17])
        //     ->values();
        return view('Guard.Pemeriksaan.ACCGudangPB', compact('access'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $rowDataArray = $request->input('checkedRows', []);
        $nomorUser = trim(Auth::user()->NomorUser);
        // dd($rowDataArray);
        if (empty($rowDataArray)) {
            return response()->json(['error' => 'TIDAK DAPAT Proses Data, karena tidak ada Data!!!..']);
        }

        $adaProses = false;

        foreach ($rowDataArray as $item) {
            if (isset($item['idHeader']) && !empty($item['idHeader'])) {
                $adaProses = true;
                $dataHeaderPengiriman = DB::connection('ConnGuard')->select(
                    'EXEC SP_4451_PemeriksaanBarang
                        @kode = ?,
                        @idHeader = ?',
                    [
                        11,
                        $item['idHeader']
                    ]
                );

                if ($dataHeaderPengiriman[0]->surat_jalanTerdaftar) {
                    $idPengirimanArray = array_map(
                        'trim',
                        explode(',', $dataHeaderPengiriman[0]->surat_jalanTerdaftar)
                    );
                } else {
                    $idPengirimanArray = null;
                }

                if ($idPengirimanArray) {
                    for ($i = 0; $i < count($idPengirimanArray); $i++) {
                        $cekIdPengiriman = DB::connection('ConnSales')->select(
                            'EXEC SP_1486_SLS_MAINT_HEADERPENGIRIMAN
                                        @MyType = ?,
                                        @IDPengiriman = ?',
                            [
                                5,
                                $idPengirimanArray[$i]
                            ]
                        );
                        if (!empty($cekIdPengiriman[0])) {
                            $payloadSupir = "no_sj=$idPengirimanArray[$i]&jenisAcc=Supir";
                            $key = env('QR_SHARED_SECRET');
                            if (!$key || strlen($key) !== 32) {
                                throw new Exception('QR key tidak valid');
                            }

                            $encrypter = new Encrypter($key, 'AES-256-CBC');

                            $encryptedPayloadSupir = urlencode(
                                $encrypter->encryptString((string) $payloadSupir)
                            );
                            $urlSupir = "https://mykrr.co.id/DokumenSJ/view/$encryptedPayloadSupir";
                            $ttdBase64_Supir = base64_encode(
                                QrCode::format('png')
                                    ->size(150)
                                    ->margin(1)
                                    ->generate($urlSupir)
                            );
                            $payloadSatpam = "no_sj=$idPengirimanArray[$i]&jenisAcc=Satpam";
                            $encryptedPayloadSatpam = urlencode(
                                $encrypter->encryptString((string) $payloadSatpam)
                            );
                            $urlSatpam = "https://mykrr.co.id/DokumenSJ/view/$encryptedPayloadSatpam";
                            $ttdBase64_Satpam = base64_encode(
                                QrCode::format('png')
                                    ->size(150)
                                    ->margin(1)
                                    ->generate($urlSatpam)
                            );
                            DB::connection('ConnSales')->statement(
                                'EXEC SP_1486_SLS_MAINT_HEADERPENGIRIMAN
                                        @MyType = ?,
                                        @AccSupir = ?,
                                        @GbrAccSupir = ?,
                                        @AccSatpam = ?,
                                        @GbrAccSatpam = ?,
                                        @IDPengiriman = ?,
                                        @NoSeal = ?,
                                        @NoContainer = ?',
                                [
                                    4,
                                    $dataHeaderPengiriman[0]->sopir,
                                    $ttdBase64_Supir,
                                    $dataHeaderPengiriman[0]->user_input,
                                    $ttdBase64_Satpam,
                                    $idPengirimanArray[$i],
                                    $dataHeaderPengiriman[0]->no_seal,
                                    $dataHeaderPengiriman[0]->no_container
                                ]
                            );
                        }
                    }
                }

                // Call the stored procedure for each item
                DB::connection('ConnGuard')
                    ->statement('EXEC SP_4451_ACCGudangPB @Kode = ?, @user_input = ?, @idHeader = ?', [2, $nomorUser, $item['idHeader']]);
            }
        }

        if ($adaProses) {
            return response()->json(['message' => 'Data berhasil diACC!!..']);
        } else {
            return response()->json(['error' => 'Pilih dulu datanya!!.. dengan memberi tanda centang']);
        }
    }

    public function show(Request $request, $id)
    {
        if ($id == 'getData') {
            $tgl_awal = $request->input('tgl_awal');
            $tgl_akhir = $request->input('tgl_akhir');
            $user_input = trim(Auth::user()->NomorUser);
            // dd($request->all());
            // $type_kain = $request->input('type_kain');
            $results = DB::connection('ConnGuard')
                ->select('EXEC SP_4451_ACCGudangPB @Kode = ?, @tgl_awal = ?, @tgl_akhir = ?, @nomorUser = ?', [1, $tgl_awal, $tgl_akhir, $user_input]);
            // dd($results);
            $response = [];
            foreach ($results as $row) {
                $response[] = [
                    'tanggal' => Carbon::parse($row->tanggal)->format('m/d/Y'),
                    'tanggal_raw' => Carbon::parse($row->tanggal)->format('Y-m-d'),
                    'idHeader' => trim($row->idHeader),
                    'jam_muat' => Carbon::parse($row->jam_muat_awal)->format('H:i')
                        . ' - ' .
                        Carbon::parse($row->jam_muat_akhir)->format('H:i'),
                    'nopol' => trim($row->nopol) ?? "",
                    'instansi' => trim($row->instansi) ?? "",
                    'tujuan_kirim' => trim($row->tujuan_kirim) ?? "",
                    'sopir' => trim($row->sopir) ?? "",
                    'NamaUser' => trim($row->NamaUser),
                ];
            }
            // dd($response);
            return datatables($response)->make(true);

        }
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
