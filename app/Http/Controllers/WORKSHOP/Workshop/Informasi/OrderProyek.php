<?php

namespace App\Http\Controllers\WORKSHOP\Workshop\Informasi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\HakAksesController;
use Auth;

class OrderProyek extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Workshop');
        $divisi = DB::connection('Connworkshop')->select('exec [SP_5298_WRK_USER-DIVISI] @user = ?', [Auth::user()->NomorUser]);
        return view('WORKSHOP.Workshop.Informasi.OrderProyek', compact(['divisi'], 'access'));
    }
    public function GetAllDataPengorder($tgl_awal, $tgl_akhir, $divisi)
    {
        $all = DB::connection('Connworkshop')->select('[SP_5298_WRK_LIST-ORDER-PRY] @kode = ?, @tgl1 = ?, @tgl2 = ?, @div = ?', [21, $tgl_awal, $tgl_akhir, $divisi]);
        return response()->json($all);
    }
    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show($id, Request $request)
    {
        if ($id == 'GetAllDataPenerimaProyek') {
            $tgl_awal = $request->input('tglawal');
            $tgl_akhir = $request->input('tglakhir');
            $div = $request->input('divisi');
            $all = DB::connection('Connworkshop')->select('[SP_5298_WRK_LIST-ORDER-PRY] @kode = ?, @tgl1 = ?, @tgl2 = ?, @div = ?', [22, $tgl_awal, $tgl_akhir, $div]);

            return response()->json($all);
        } else {
            return response()->json(['error' => (string) "Undefined request: " . $id]);
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
