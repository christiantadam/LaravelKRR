<?php

namespace App\Http\Controllers\Utility\Master;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Support\Facades\Response;

class MaintenanceTipeGangguan extends Controller
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
        return view('Utility.Master.MaintenanceTipeGangguan', compact('access', 'teknisi', 'lokasi'));
    }
    public function create()
    {
        $TipeGangguan =
            DB::connection('ConnUtility')->select('exec SP_LIST_TYPE_GANGGUAN_ELEKTRIK');
        // dd($TipeGangguan);
        $Gangguan = [];
        foreach ($TipeGangguan as $Gang) {
            $Gangguan[] = [
                'nama_type_gangguan' => $Gang->nama_type_gangguan,
                'id_type' => $Gang->id_type,
            ];
        }
        return datatables($Gangguan)->make(true);
    }
    public function store(Request $request)
    {
        try {
            $Keterangan = $request->input('tipe_gangguan');

            DB::connection('ConnUtility')->statement('exec SP_INSERT_TYPE_GANGGUAN_ELEKTRIK ? ', [$Keterangan]);
            return response()->json(['success' => 'Tipe gangguan berhasil ditambahkan!']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }
    public function show($id)
{

}

    public function edit(Request $request, $id)
    {
        $cust = DB::connection('ConnUtility')
            ->table('E_Type_gangguan_elektrik')
            ->where('id_type', $id)
            ->orderBy('id_type', 'asc')
            ->get();
        return response()->json($cust);
    }
    public function update(Request $request, $id)
    {
        try {
            $id = $request->input('id_type');
            $Keterangan = $request->input('nama_type_gangguan');
            // dd($id, $Keterangan);

            DB::connection('ConnUtility')->statement('exec SP_KOREKSI_TYPE_GANGGUAN_ELEKTRIK ? , ? ', [$id, $Keterangan]);
            return response()->json(['success' => 'Data dengan Kode Customer: ' . $id . ' sudah Diupdate!']);
        } catch (\Exception $ex) {
            return response()->json(['error' => $ex->getMessage()]);
        }
    }
    public function destroy(Request $request, $id)
    {
        try {
            $id = $request->input('id_type');
            // dd($Id);

            DB::connection('ConnUtility')->statement('exec SP_HAPUS_TYPE_GANGGUAN_ELEKTRIK @id_type = ?', [$id]);

            return response()->json(['success' => 'Data Terhapus']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while deleting the data. Please try again.']);
        }
    }
}
