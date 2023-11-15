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
        $memory = DB::connection('ConnEDP')->table('Kapasitas_VGA')->select('*')->get();
        $monitor = DB::connection('ConnEDP')->table('Ukuran_Monitor')->select('*')->get();
        dd($processor, $monitor, $memory, $harddisk, $typeos);
        return view('EDP.Master.Computer.Create', compact('access', 'processor', 'monitor', 'memory', 'harddisk', 'typeos'));
    }

    public function store(Request $request)
    {
        dd($request->all());
    }

    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        // dd('masuk edit');
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        // dd('masuk');
        DB::connection('ConnEDP')->table('Komputer')->where('Kode_Comp', '=', $id)->delete();
        // echo "<script type='text/javascript'>alert('Data Berhasil dihapus') ;</script>";
        return redirect('Computer')->with(['success' => 'Data ' . $id . ' berhasil dihapus!']);
    }
}
