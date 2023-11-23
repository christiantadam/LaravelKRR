<?php

namespace App\Http\Controllers\EDP;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use DB;

class ComputerController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('EDP');
        $data = DB::connection('ConnEDP')->table('Komputer')->select('*')->get();
        // dd($data);
        return view('EDP.Master.Computer.Index', compact('access', 'data'));
    }

    public function create()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('EDP');
        $processor = DB::connection('ConnEDP')->table('Type_Processor')->select('*')->get();
        $memory = DB::connection('ConnEDP')->table('Kapasitas_Memory')->select('*')->get();
        $typeos = DB::connection('ConnEDP')->table('Type_OS')->select('*')->get();
        $harddisk = DB::connection('ConnEDP')->table('Kapasitas_HardDisk')->select('*')->get();
        $vga = DB::connection('ConnEDP')->table('Kapasitas_VGA')->select('*')->get();
        $monitor = DB::connection('ConnEDP')->table('Ukuran_Monitor')->select('*')->get();
        // dd($processor, $monitor, $memory, $harddisk, $typeos, $vga);
        return view('EDP.Master.Computer.Create', compact('access', 'processor', 'monitor', 'memory', 'harddisk', 'typeos', 'vga'));
    }

    public function store(Request $request)
    {
        dd('Masuk Store', $request->all());
    }

    public function show($id)
    {
        $dataKomputer = DB::connection('ConnEDP')->select('exec SP_4384_EDP_MaintenanceKomputer @Kode = ?, @KodeComp = ?', [1, $id]);
        $dataKomponen = DB::connection('ConnEDP')->select('exec SP_4384_EDP_MaintenanceKomputer @Kode = ?, @KodeComp = ?', [2, $id]);
        $data = [$dataKomputer,$dataKomponen];
        return response()->json($data);
    }

    public function edit($id)
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('EDP');
        $computer = DB::connection('ConnEDP')->table('Komputer')->select('*')->where('Kode_Comp', '=', $id)->get();
        $processor = DB::connection('ConnEDP')->table('Type_Processor')->select('*')->get();
        $memory = DB::connection('ConnEDP')->table('Kapasitas_Memory')->select('*')->get();
        $typeos = DB::connection('ConnEDP')->table('Type_OS')->select('*')->get();
        $harddisk = DB::connection('ConnEDP')->table('Kapasitas_HardDisk')->select('*')->get();
        $vga = DB::connection('ConnEDP')->table('Kapasitas_VGA')->select('*')->get();
        $monitor = DB::connection('ConnEDP')->table('Ukuran_Monitor')->select('*')->get();
        // dd('masuk edit', $id, $computer);
        return view('EDP.Master.Computer.Edit', compact('access', 'computer', 'processor', 'monitor', 'memory', 'harddisk', 'typeos', 'vga'));
    }

    public function update(Request $request, $id)
    {
        dd('masuk update', $request->all());
    }

    public function destroy($id)
    {
        // dd('masuk destroy');
        DB::connection('ConnEDP')->table('Komputer')->where('Kode_Comp', '=', $id)->delete();
        // echo "<script type='text/javascript'>alert('Data Berhasil dihapus') ;</script>";
        return redirect('Computer')->with(['success' => 'Data ' . $id . ' berhasil dihapus!']);
    }
}
