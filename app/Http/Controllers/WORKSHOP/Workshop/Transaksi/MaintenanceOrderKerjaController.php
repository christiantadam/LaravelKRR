<?php

namespace App\Http\Controllers\WORKSHOP\Workshop\Transaksi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;
use Auth;
use App\Http\Controllers\HakAksesController;

class MaintenanceOrderKerjaController extends Controller
{
    public function index()
    {
        $nomoruser = trim(Auth::user()->NomorUser);
        $access = (new HakAksesController)->HakAksesFiturMaster('Workshop');
        $satuan = DB::connection('Connworkshop')->select('exec [SP_5298_WRK_SATUAN]');
        $divisi = DB::connection('Connworkshop')->select('exec [SP_5298_WRK_USER-DIVISI] @user = ?', [Auth::user()->NomorUser]);
        return view('WORKSHOP.Workshop.Transaksi.MaintenanceOrderKerja', compact(['divisi', 'satuan'], 'access', "nomoruser"));
    }

    public function LoadData1($noGambar)
    {
        $data1 = DB::connection('ConnPurchase')->select('[SP_5298_WRK_LOAD-BARANG-2] @noGbr = ?', [$noGambar]);
        return response()->json($data1);
    }

    public function LoadData2($kdbarang)
    {
        $data2 = DB::connection('Connworkshop')->select('[SP_5298_WRK_SALDO-BARANG] @kdBarang = ?', [$kdbarang]);
        return response()->json($data2);
    }

    public function LoadData($kdBarang)
    {
        $data = DB::connection('ConnPurchase')->select('[SP_5298_WRK_LOAD-BARANG-1] @kdBarang = ?', [$kdBarang]);
        return response()->json($data);
    }

    public function GetDataAll($tgl_awal, $tgl_akhir, $divisi)
    {
        $all = DB::connection('Connworkshop')->select('[SP_5298_WRK_LIST-ORDER-KRJ] @kode = ?, @tgl1 = ?, @tgl2 = ?, @div = ?', [1, $tgl_awal, $tgl_akhir, $divisi]);
        return response()->json($all);

        //ambil semua kecuali dokumentasi dan dokumentasi file
        // $clean = collect($all)->map(function ($row) {
        //     unset($row->Dokumentasi);
        //     unset($row->DokumentasiFile);
        //     return $row;
        // });

        // return response()->json($clean);
    }

    public function GatDataForUserOrder($tgl_awal, $tgl_akhir, $iduserOrder, $divisi)
    {
        $all = DB::connection('Connworkshop')->select('[SP_5298_WRK_LIST-ORDER-KRJ] @kode = ?, @tgl1 = ?, @tgl2 = ?, @user = ?, @div = ?', [2, $tgl_awal, $tgl_akhir, $iduserOrder, $divisi]);
        return response()->json($all);

        //ambil semua kecuali dokumentasi dan dokumentasi file
        // $clean = collect($all)->map(function ($row) {
        //     unset($row->Dokumentasi);
        //     unset($row->DokumentasiFile);
        //     return $row;
        // });

        // return response()->json($clean);
    }

    public function mesin($idDivisi)
    {
        $mesin = DB::connection('Connworkshop')->select('exec [SP_5298_WRK_LIST-MESIN] @Id_divisi = ?', [$idDivisi]);
        return response()->json($mesin);
    }

    public function create()
    {
        //
    }

    public function inputfile(Request $request)
    {
        // dd($request->all(), $request->file('inputpdfmodal'));
        $request->validate([
            'inputpdfmodal' => 'required|mimes:pdf|max:2048', // Adjust the max file size as needed
        ]);
        $kdBarang = $request->kode;
        $pdf = $request->file('inputpdfmodal');
        $binaryReader = fopen($pdf, 'rb');
        $pdfBinary = fread($binaryReader, $pdf->getSize());
        fclose($binaryReader);
        // dd($pdf, $binaryReader, $pdfBinary);
        DB::connection('ConnPurchase')->table('Y_FOTO')->insert([
            'KD_BARANG' => $kdBarang,
            'PDF' => DB::raw('0x' . bin2hex($pdfBinary)) // Assuming PDF column is binary data type
        ]);
        return response()->json(['success' => 'mantap']);
    }

    public function updatepdf(Request $request)
    {
        $request->validate([
            'updatepdfmodal' => 'required|mimes:pdf|max:2048', // Adjust the max file size as needed
        ]);
        $kdBarang = $request->kode;
        $pdf = $request->file('updatepdfmodal');
        $binaryReader = fopen($pdf, 'rb');
        $pdfBinary = fread($binaryReader, $pdf->getSize());
        fclose($binaryReader);
        // dd($pdf, $binaryReader, $pdfBinary);
        DB::connection('ConnPurchase')->table('Y_FOTO')->where('KD_BARANG', $kdBarang)->update([
            'PDF' => DB::raw('0x' . bin2hex($pdfBinary))
        ]);
    }

    public function selectpdf($kdBarang)
    {
        $pdf = DB::connection('ConnPurchase')
            ->table('Y_FOTO')
            ->select('PDF')
            ->where('KD_BARANG', '=', $kdBarang)
            ->first();
        //dd($pdf);
        if ($pdf) {
            $pdfContent = $pdf->PDF;

            return Response::make($pdfContent, 200, [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'inline; filename="document.pdf"'
            ]);
        }
        // return response()->json($pdf);
    }

    public function store(Request $request)
    {
        //dd($request->all());
        $tgl = $request->tanggalmodal;
        $IdDiv = $request->iddivisiOrder;
        $kdBrg = $request->Kdbarangmodal;
        $noGbr = $request->NomorGambarModal;
        $namaBrg = $request->NamaBarangModal;
        $jml = $request->JumlahModal;
        $userOd = $request->UserModal;
        $ketOd = $request->KeteranganModal;
        $noSat = $request->SatuanModal;
        $noMesin = $request->MesinModal;
        $radio = $request->inlineRadioOptions;
        if ($radio == "Baru") {
            DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_INSERT-ORDER-KRJ] @tgl = ?, @IdDiv = ?, @kdBrg = ?, @noGbr = ?, @namaBrg = ?, @jml = ?, @userOd = ?, @ketOd = ?, @noSat = ?, @noMesin = ?, @noKet = ?', [$tgl, $IdDiv, $kdBrg, $noGbr, $namaBrg, $jml, $userOd, $ketOd, $noSat, $noMesin, 1]);
        }
        if ($radio == "Perbaikan") {
            DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_INSERT-ORDER-KRJ] @tgl = ?, @IdDiv = ?, @kdBrg = ?, @noGbr = ?, @namaBrg = ?, @jml = ?, @userOd = ?, @ketOd = ?, @noSat = ?, @noMesin = ?, @noKet = ?', [$tgl, $IdDiv, $kdBrg, $noGbr, $namaBrg, $jml, $userOd, $ketOd, $noSat, $noMesin, 3]);
        }
        return redirect()->back()->with('success', 'Data TerSIMPAN');
    }


    public function show($id)
    {
        //
    }


    public function edit($id)
    {
        //
    }


    public function update(Request $request, $id)
    {
        //dd($request->all());
        $kdBrg = $request->Kdbarangmodal;
        $noGbr = $request->NomorGambarModal;
        $namaBrg = $request->NamaBarangModal;
        $jml = $request->JumlahModal;
        $ketOd = $request->KeteranganModal;
        $noSat = $request->SatuanModal;
        $noMesin = $request->MesinModal;
        $radio = $request->inlineRadioOptions;
        if ($radio == "Baru") {
            DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_UPDATE-ORDER-KRJ] @noOrder = ?, @kdBrg = ?, @noGbr = ?, @namaBrg = ?, @jml = ?,  @ketOd = ?, @noSat = ?, @noMesin = ?, @noKet = ?', [$id, $kdBrg, $noGbr, $namaBrg, $jml, $ketOd, $noSat, $noMesin, 1]);
        }
        if ($radio == "Perbaikan") {
            DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_UPDATE-ORDER-KRJ] @noOrder = ?, @kdBrg = ?, @noGbr = ?, @namaBrg = ?, @jml = ?,  @ketOd = ?, @noSat = ?, @noMesin = ?, @noKet = ?', [$id, $kdBrg, $noGbr, $namaBrg, $jml, $ketOd, $noSat, $noMesin, 3]);
        }
        return redirect()->back()->with('success', 'Data TerKOREKSI');
    }


    public function destroy($id)
    {
        //dd($id);
        DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_DELETE-ORDER-KRJ] @noOrder = ?', [$id]);
        return redirect()->back()->with('success', 'Data TerHAPUS');
    }

    public function uploadDokumentasi(Request $request)
    {
        try {

            $request->validate([
                'noOrder'     => 'required',
                'attach_file' => 'required|file|max:1536|mimes:pdf,jpg,jpeg,png'
            ]);

            $noOrder = trim($request->noOrder);
            $conn    = DB::connection('Connworkshop');

            $conn->beginTransaction();

            // 1. Cek order ada
            $order = $conn->table('T_ORDER_KERJA')
                ->where('Id_Order', $noOrder)
                ->first();

            if (!$order) {
                $conn->rollBack();
                return response()->json([
                    'success' => false,
                    'message' => 'Order tidak ditemukan'
                ]);
            }

            // 2. Cek sudah ada dokumentasi
            if (!is_null($order->Dokumentasi) || !is_null($order->DokumentasiFile)) {
                $conn->rollBack();
                return response()->json([
                    'success' => false,
                    'message' => 'Dokumentasi sudah ada'
                ]);
            }

            $file       = $request->file('attach_file');
            $extension  = strtolower($file->getClientOriginalExtension());
            $binary     = file_get_contents($file->getRealPath());

            if ($binary === false) {
                throw new \Exception('Gagal membaca file');
            }

            // ============================
            // PDF → VARBINARY
            // ============================
            if ($extension === 'pdf') {

                $hex = bin2hex($binary);

                $conn->table('T_ORDER_KERJA')
                    ->where('Id_Order', $noOrder)
                    ->update([
                        'DokumentasiFile' => DB::raw("CONVERT(varbinary(max), 0x$hex)"),
                    ]);

            }
            // ============================
            // IMAGE → VARCHAR(BASE64)
            // ============================
            else {

                $base64 = base64_encode($binary);

                $affected = $conn->table('T_ORDER_KERJA')
                    ->where('Id_Order', $noOrder)
                    ->update([
                        'Dokumentasi' => $base64
                    ]);

            }

            $conn->commit();

            return response()->json([
                'success' => true,
                'message' => 'Dokumentasi berhasil diupload'
            ]);

        } catch (\Throwable $e) {

            if (isset($conn)) {
                $conn->rollBack();
            }

            return response()->json([
                'success' => false,
                'message' => 'Upload gagal',
                'debug'   => $e->getMessage()
            ]);
        }
    }
    public function getDokumentasi($noOrder)
    {
        $row = DB::connection('Connworkshop')
            ->table('T_ORDER_KERJA')
            ->select('Dokumentasi', 'DokumentasiFile')
            ->where('Id_Order', trim($noOrder))
            ->first();

        if (!$row) {
            return response()->json([
                'success' => false,
                'message' => 'Data tidak ditemukan'
            ], 404);
        }

        // ========================
        // Jika PDF (varbinary)
        // ========================
        if (!empty($row->DokumentasiFile)) {

            return response($row->DokumentasiFile)
                ->header('Content-Type', 'application/pdf')
                ->header('Content-Disposition', 'attachment; filename="Dokumentasi_'.$noOrder.'.pdf"');
        }

        // ========================
        // Jika IMAGE (base64)
        // ========================
        if (!empty($row->Dokumentasi)) {

            $imageBinary = base64_decode($row->Dokumentasi);

            return response($imageBinary)
                ->header('Content-Type', 'image/jpeg')
                ->header('Content-Disposition', 'attachment; filename="Dokumentasi_'.$noOrder.'.jpg"');
        }

        return response()->json([
            'success' => false,
            'message' => 'File tidak ditemukan'
        ], 404);
    }

    public function deleteDokumentasi($noOrder)
    {
        $affected = DB::connection('Connworkshop')
            ->table('T_ORDER_KERJA')
            ->where('Id_Order', trim($noOrder))
            ->update([
                'DokumentasiFile' => DB::raw('CONVERT(VARBINARY(MAX), NULL)'),
                'Dokumentasi'     => DB::raw('CONVERT(VARCHAR(MAX), NULL)')
            ]);

        if ($affected > 0) {
            return response()->json([
                'success' => true,
                'message' => 'Dokumentasi berhasil dihapus'
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Data tidak ditemukan'
        ], 404);
    }

    public function checkDokumentasi($noOrder)
    {
        $exists = DB::connection('Connworkshop')
            ->table('T_ORDER_KERJA')
            ->where('Id_Order', trim($noOrder))
            ->where(function($q){
                $q->whereNotNull('Dokumentasi')
                ->orWhereNotNull('DokumentasiFile');
            })
            ->exists();

        return response()->json([
            'hasFile' => $exists ? 1 : 0
        ]);
    }



}
