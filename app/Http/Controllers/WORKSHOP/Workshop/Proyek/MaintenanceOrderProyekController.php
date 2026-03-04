<?php

namespace App\Http\Controllers\WORKSHOP\Workshop\Proyek;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;
use Auth;

class MaintenanceOrderProyekController extends Controller
{

    public function index()
    {
        $nomoruser = trim(Auth::user()->NomorUser);
        $access = (new HakAksesController)->HakAksesFiturMaster('Workshop');
        $satuan = DB::connection('Connworkshop')->select('exec [SP_5298_WRK_SATUAN]');
        $divisi = DB::connection('Connworkshop')->select('exec [SP_5298_WRK_USER-DIVISI] @user = ?', [Auth::user()->NomorUser]);
        return view('WORKSHOP.Workshop.Proyek.MaintenanceOrderProyek', compact(['divisi', 'satuan'], 'access', 'nomoruser'));
    }
    public function GetMesin($idDivisi)
    {
        $mesin = DB::connection('Connworkshop')->select('exec [SP_5298_WRK_LIST-MESIN] @Id_divisi = ?', [$idDivisi]);
        return response()->json($mesin);
    }
    public function GetDataAll($tgl_awal, $tgl_akhir, $divisi)
    {
        // kalau mau menampilkan data order proyek kolom ACC_Mng harus null. table T_Order_Proyek database workshop
        $all = DB::connection('Connworkshop')->select('[SP_5298_WRK_LIST-ORDER-PRY] @kode = ?, @tgl1 = ?, @tgl2 = ?, @div = ?', [1, $tgl_awal, $tgl_akhir, $divisi]);
        return response()->json($all);
    }
    public function GatDataForUserOrder($tgl_awal, $tgl_akhir, $iduserOrder, $divisi)
    {
        $all = DB::connection('Connworkshop')->select('[SP_5298_WRK_LIST-ORDER-PRY] @kode = ?, @tgl1 = ?, @tgl2 = ?, @user = ?, @div = ?', [2, $tgl_awal, $tgl_akhir, $iduserOrder, $divisi]);
        return response()->json($all);
    }
    public function GetDataTable($noOrder)
    {
        $all = DB::connection('Connworkshop')->select('[SP_5298_WRK_LIST-ORDER-PRY] @kode = ?, @noOrder = ?', [3, $noOrder]);
        return response()->json($all);
    }
    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        // dd($request->all());
        $tgl = $request->Tanggalmodal;
        $IdDiv = $request->iddivmodal;
        $namaBrg = $request->NamaProyekModal;
        $jml = $request->Jumlah;
        $userOd = $request->PengOrderModal;
        $ketOd = $request->KeteranganModal;
        $noSat = $request->SatuanModal;
        $noMesin = $request->MesinModal;
        $radio = $request->inlineRadioOptions;
        if ($radio == "Buat") {
            $noket = 1;
            DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_INSERT-ORDER-PRY] @tgl = ?, @IdDiv = ?, @namaBrg = ?, @jml = ?, @userOd = ?, @ketOd = ?, @noSat = ?, @noMesin = ?, @noKet = ?', [$tgl, $IdDiv, $namaBrg, $jml, $userOd, $ketOd, $noSat, $noMesin, $noket]);
        }
        if ($radio == "Perbaikan") {
            $noket = 3;
            DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_INSERT-ORDER-PRY] @tgl = ?, @IdDiv = ?, @namaBrg = ?, @jml = ?, @userOd = ?, @ketOd = ?, @noSat = ?, @noMesin = ?, @noKet = ?', [$tgl, $IdDiv, $namaBrg, $jml, $userOd, $ketOd, $noSat, $noMesin, $noket]);
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
        $noOrder = $id;
        $namaBrg = $request->NamaProyekModal;
        $jml = $request->Jumlah;
        $ketOd = $request->KeteranganModal;
        $noSat = $request->SatuanModal;
        $noMesin = $request->MesinModal;
        $radio = $request->inlineRadioOptions;
        if ($radio == "Buat") {
            $noket = 1;
            DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_UPDATE-ORDER-PRY] @noOrder = ?, @namaBrg = ?, @jml = ? , @ketOd = ?, @noSat = ?, @noMesin = ?, @noKet = ?', [$noOrder, $namaBrg, $jml, $ketOd, $noSat, $noMesin, $noket]);
        }
        if ($radio == "Perbaikan") {
            $noket = 3;
            DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_UPDATE-ORDER-PRY] @noOrder = ?, @namaBrg = ?, @jml = ? , @ketOd = ?, @noSat = ?, @noMesin = ?, @noKet = ?', [$noOrder, $namaBrg, $jml, $ketOd, $noSat, $noMesin, $noket]);
        }
        return redirect()->back()->with('success', 'Data TerKOREKSI');
    }


    public function destroy($id)
    {
        //dd($id);
        DB::connection('Connworkshop')->statement('exec [SP_5298_WRK_DELETE-ORDER-PRY] @noOrder = ?', [$id]);
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
            $order = $conn->table('T_ORDER_PROYEK')
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

                $conn->table('T_ORDER_PROYEK')
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

                $conn->table('T_ORDER_PROYEK')
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
            ->table('T_ORDER_PROYEK')
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
            ->table('T_ORDER_PROYEK')
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
            ->table('T_ORDER_PROYEK')
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
