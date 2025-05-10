<?php

namespace App\Http\Controllers\JumboBag;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use DB;
use Illuminate\Support\Facades\Auth;
use Exception;

class KebutuhanKomponenController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Jumbo Bag');
        $listCustomerJBB = DB::connection('ConnJumboBag')->select('EXEC SP_4384_Maintenance_Kebutuhan_Komponen @XKode = ?', [1]);
        return view('JumboBag.KebutuhanKomponen.KebutuhanKomponen', compact('access', 'listCustomerJBB'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $jenis = $request->input('jenis');
        if ($jenis == 'tambahKebutuhanKomponen') {
            $kodeBarang = $request->input('kodeBarang');
            $jumlahKebutuhan = $request->input('jumlahKebutuhan');
            $tanggalKebutuhanAwal = $request->input('tanggalKebutuhanAkhir');
            $tanggalKebutuhanAkhir = $request->input('tanggalKebutuhanAkhir');
            $lokasi = $request->input('lokasi');
            try {
                DB::connection('ConnJumboBag')->statement(
                    'EXEC SP_4384_Maintenance_Kebutuhan_Komponen @XKode = ?, @XKodeBarang = ?, @XJumlahKebutuhan = ?, @XTanggalKebutuhanAwal = ?,
                    @XTanggalKebutuhanAkhir = ?, @XLokasi = ?'
                    ,
                    [
                        3,
                        $kodeBarang,
                        $jumlahKebutuhan,
                        $tanggalKebutuhanAwal,
                        $tanggalKebutuhanAkhir,
                        $lokasi
                    ]
                );
                return response()->json(['success' => true]);
            } catch (Exception $e) {
                return response()->json(['error' => 'Failed to insert data: ' . $e->getMessage()], 500);
            }
        } else if ($jenis == 'editKebutuhanKomponen') {
            $kodeBarang = $request->input('kodeBarang');
            $jumlahKebutuhan = $request->input('jumlahKebutuhan');
            $tanggalKebutuhanAwal = $request->input('tanggalKebutuhanAkhir');
            $tanggalKebutuhanAkhir = $request->input('tanggalKebutuhanAkhir');
            $lokasi = $request->input('lokasi');
            try {
                DB::connection('ConnJumboBag')->statement(
                    'EXEC SP_4384_Maintenance_Kebutuhan_Komponen @XKode = ?, @XKodeBarang = ?, @XJumlahKebutuhan = ?, @XTanggalKebutuhanAwal = ?,
                    @XTanggalKebutuhanAkhir = ?, @XLokasi = ?'
                    ,
                    [
                        4,
                        $kodeBarang,
                        $jumlahKebutuhan,
                        $tanggalKebutuhanAwal,
                        $tanggalKebutuhanAkhir,
                        $lokasi
                    ]
                );
                return response()->json(['success' => true]);
            } catch (Exception $e) {
                return response()->json(['error' => 'Failed to insert data: ' . $e->getMessage()], 500);
            }
        } else if ($jenis == 'hapusKebutuhanKomponen') {
            $idKebutuhanKomponen = $request->input('idKebutuhanKomponen');
            try {
                DB::connection('ConnJumboBag')->statement(
                    'EXEC SP_4384_Maintenance_Kebutuhan_Komponen @XKode = ?, @XIdKebutuhanKomponen = ?'
                    ,
                    [
                        8,
                        $idKebutuhanKomponen
                    ]
                );

                return response()->json(['success' => true]);
            } catch (Exception $e) {
                return response()->json(['error' => 'Failed to insert data: ' . $e->getMessage()], 500);
            }
        } else {
            return response()->json(['error' => 'Invalid request type'], 400);
        }
    }

    public function show($id, Request $request)
    {
        if ($id == 'getDataKebutuhan') {
            try {
                $listKebutuhan = DB::connection('ConnJumboBag')->select('EXEC SP_4384_Maintenance_Kebutuhan_Komponen @XKode = ?', [0]);

                return response()->json($listKebutuhan);
            } catch (Exception $e) {
                return response()->json(['error' => 'Failed to fetch data: ' . $e->getMessage()], 500);
            }
        } else if ($id == 'getDataKebutuhanDetail') {
            try {
                $idKebutuhanKomponen = $request->input('IdKebutuhanKomponen');
                $listDetailKebutuhan = DB::connection('ConnJumboBag')->select('EXEC SP_4384_Maintenance_Kebutuhan_Komponen @XKode = ?, @XIdKebutuhanKomponen = ?', [6, $idKebutuhanKomponen]);

                return response()->json($listDetailKebutuhan);
            } catch (Exception $e) {
                return response()->json(['error' => 'Failed to fetch data: ' . $e->getMessage()], 500);
            }
        } else if ($id == 'getDataCetakKebutuhanDetail') {
            try {
                // $TanggalKebutuhanAwal = $request->input('TanggalKebutuhanAwal');
                // $TanggalKebutuhanAkhir = $request->input('TanggalKebutuhanAkhir');
                $TanggalKebutuhan = $request->input('TanggalKebutuhan');

                $listDetailKebutuhan = DB::connection('ConnJumboBag')->select('EXEC SP_4384_Maintenance_Kebutuhan_Komponen @XKode = ?, @XTanggalKebutuhan = ?', [7, $TanggalKebutuhan]);

                return response()->json($listDetailKebutuhan);
            } catch (Exception $e) {
                return response()->json(['error' => 'Failed to fetch data: ' . $e->getMessage()], 500);
            }
        } else if ($id == 'getKodeBarangJBB') {
            try {
                $customer = $request->input('customer');
                $listKodeBarangJBB = DB::connection('ConnJumboBag')->select('EXEC SP_4384_Maintenance_Kebutuhan_Komponen @XKode = ?, @XIdCustomer = ?', [2, $customer]);

                return response()->json($listKodeBarangJBB);
            } catch (Exception $e) {
                return response()->json(['error' => 'Failed to fetch data: ' . $e->getMessage()], 500);
            }
        } else if ($id == 'getDataKodeBarangEditJBB') {
            try {
                $idKebutuhanKomponen = $request->input('IdKebutuhanKomponen');
                $listKodeBarangJBB = DB::connection('ConnJumboBag')->select('EXEC SP_4384_Maintenance_Kebutuhan_Komponen @XKode = ?, @XIdKebutuhanKomponen = ?', [5, $idKebutuhanKomponen]);

                return response()->json($listKodeBarangJBB);
            } catch (Exception $e) {
                return response()->json(['error' => 'Failed to fetch data: ' . $e->getMessage()], 500);
            }
        } else {
            return response()->json(['error' => 'Invalid ID'], 400);
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
