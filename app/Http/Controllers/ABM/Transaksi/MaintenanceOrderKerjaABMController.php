<?php

namespace App\Http\Controllers\ABM\Transaksi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;
use Exception;
use DB;
use Auth;
use DateTime;
use DateTimeZone;

class MaintenanceOrderKerjaABMController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('ABM');
        return view('ABM.Transaksi.OrderKerja.MaintenanceOrderKerja', compact('access'));
    }

    public function create()
    {
        dd('MaintenanceOrderKerjaController Create');
    }

    public function store(Request $request)
    {
        $jenisStore = $request->jenisStore;
        if ($jenisStore == 'storeOrderKerja') {
            $NomorOrderKerja = $request->NomorOrderKerja;
            $TanggalRencanaMulaiKerja = $request->TanggalRencanaMulaiKerja;
            $TanggalRencanaSelesaiKerja = $request->TanggalRencanaSelesaiKerja;
            $IDPesanan = $request->IDPesanan;
            $JenisOK = $request->JenisOK;
            try {
                DB::connection('ConnABM')->statement('EXEC SP_4384_Maintenance_Nomor_Order_Kerja
                @XKode = ?,
                @XNomorOrderKerja = ?,
                @XTanggalRencanaMulaiKerja = ?,
                @XTanggalRencanaSelesaiKerja = ?,
                @XIDPesanan = ?,
                @XNomorUser = ?,
                @XJenisOK = ?',
                    [
                        3,
                        $NomorOrderKerja,
                        $TanggalRencanaMulaiKerja,
                        $TanggalRencanaSelesaiKerja,
                        $IDPesanan,
                        trim(Auth::user()->NomorUser),
                        $JenisOK
                    ]
                );
                return response()->json(['success' => 'Data Order Kerja berhasil disimpan.']);
            } catch (Exception $e) {
                return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
            }
        } else if ($jenisStore == 'storeJenisOK') {
            $nama_jenis_ok = $request->nama_jenis_ok;
            $kd_jenis__ok = $request->kd_jenis__ok;
            try {
                DB::connection('ConnABM')->statement('EXEC SP_4384_Maintenance_Nomor_Order_Kerja
                @XKode = ?,
                @XNamaJenisOK = ?,
                @XKdJenisOK = ?',
                    [
                        9,
                        $nama_jenis_ok,
                        $kd_jenis__ok,
                    ]
                );
                return response()->json(['success' => 'Data Order Kerja berhasil disimpan.', 'nama_jenis_ok' => $nama_jenis_ok]);
            } catch (Exception $e) {
                return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
            }
        }
    }

    public function show($id, Request $request)
    {
        if ($id == 'getDataPermohonanOrderKerja') {
            $listOrderKerja = DB::connection('ConnABM')->select('EXEC SP_4384_Maintenance_Nomor_Order_Kerja @XKode = ?', [0]);
            // Convert the data into an array that DataTables can consume
            $dataOrderKerja = [];
            foreach ($listOrderKerja as $OrkerKerja) {
                $formattedDate = (new DateTime($OrkerKerja->TanggalRencanaMulaiKerja))->format('m-d-Y');
                $dataOrderKerja[] = [
                    'NomorOrderKerja' => $OrkerKerja->No_OK,
                    'TanggalRencanaMulai' => $formattedDate,
                    'NomorSP' => $OrkerKerja->IDSuratPesanan,
                ];
            }

            return datatables($dataOrderKerja)->make(true);
        } else if ($id == 'getDataInputPermohonanOrderKerja') {
            $dataNomorOrderKerja = DB::connection('ConnABM')->select('EXEC SP_4384_Maintenance_Nomor_Order_Kerja @XKode = ?', [1]);
            $dataSuratPesanan = DB::connection('ConnABM')->select('EXEC SP_4384_Maintenance_Nomor_Order_Kerja @XKode = ?', [2]);
            return response()->json([
                'success' => true,
                'NomorOrderKerja' => $dataNomorOrderKerja,
                'dataSuratPesanan' => $dataSuratPesanan
            ]);
        } else if ($id == 'getDataJenisOrderKerja') {
            $dataJenisOrderKerja = DB::connection('ConnABM')->select('EXEC SP_4384_Maintenance_Nomor_Order_Kerja @XKode = ?', [8]);
            return response()->json([
                'success' => true,
                'dataJenisOrderKerja' => $dataJenisOrderKerja
            ]);
        } else if ($id == 'getDataSPBerdasarkanNomorOrderKerja') {
            $NomorOrderKerja = $request->input('NomorOrderKerja');
            $JenisOK = $request->input('JenisOK');
            $cekNomorOrderKerja = DB::connection('ConnABM')->select('EXEC SP_4384_Maintenance_Nomor_Order_Kerja @XKode = ?, @XNomorOrderKerja = ?, @XJenisOK = ?', [6, $NomorOrderKerja, $JenisOK]);
            if ($cekNomorOrderKerja[0]->JumlahNomorOrderKerja > 0) {
                $dataSuratPesanan = DB::connection('ConnABM')->select('EXEC SP_4384_Maintenance_Nomor_Order_Kerja @XKode = ?, @XNomorOrderKerja = ?, @XJenisOK= ?', [7, $NomorOrderKerja, $JenisOK]);
            } else {
                $dataSuratPesanan = DB::connection('ConnABM')->select('EXEC SP_4384_Maintenance_Nomor_Order_Kerja @XKode = ?', [2]);
            }
            return response()->json([
                'success' => true,
                'dataSuratPesanan' => $dataSuratPesanan,
                'cekNomorOrderKerja' => $cekNomorOrderKerja
            ]);
        } else if ($id == 'getDetailOrderKerja') {
            $NomorOrderKerja = $request->input('NomorOrderKerja');
            $dataDetailOrderKerja = DB::connection('ConnABM')->select('EXEC SP_4384_Maintenance_Nomor_Order_Kerja @XKode = ?, @XNomorOrderKerja = ?', [5, $NomorOrderKerja]);
            return response()->json([
                'success' => true,
                'dataDetailOrderKerja' => $dataDetailOrderKerja
            ]);
        } else {
            return response()->json(['error' => (string) "Undefined request: " . $id]);
        }
    }

    public function edit($id)
    {
        dd('MaintenanceOrderKerjaController Edit');
    }

    public function update(Request $request, $id)
    {
        dd('MaintenanceOrderKerjaController Update');
    }

    public function destroy($id)
    {
        try {
            DB::connection('ConnABM')->statement('EXEC SP_4384_Maintenance_Nomor_Order_Kerja
                @XKode = ?,
                @XNomorOrderKerja = ?',
                [
                    4,
                    $id
                ]
            );
            return response()->json(['success' => 'Data Order Kerja berhasil dinonaktifkan.']);
        } catch (Exception $e) {
            return response()->json(['error' => (string) "Terjadi Kesalahan! " . $e->getMessage()]);
        }
    }
}
