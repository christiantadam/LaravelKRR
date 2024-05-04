<?php

namespace App\Http\Controllers\Utility\Project;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PrintProjectController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {
        $divisi = DB::connection('ConnUtility')->select('exec SP_LIST_DIVISI_PELAPOR');
        $access = (new HakAksesController)->HakAksesFiturMaster('Utility');

        return view('Utility.Project.PrintProject.PrintProject', compact('divisi','access'));
    }
    public function getDataProject(Request $request)
    {

        try {
            $bulan = $request->input('bulan');
            $tahun = $request->input('tahun');

            // Execute the stored procedure and fetch data
            $data = DB::connection('ConnUtility')->select('exec SP_1273_UTY_LIST_PROJECT @Kode=?, @bulan=?, @tahun=?', [ 4, $bulan, $tahun]);

            // Jika data ditemukan, kembalikan dalam format yang sesuai

                return datatables($data)->make(true);

        } catch (\Exception $e) {
            // Tangani kesalahan jika terjadi
            return response()->json(['error' => 'Internal Server Error.'], 500);
        }

    }




    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    //Store a newly created resource in storage.
    public function store(Request $request)
    {
        //
    }

    //Display the specified resource.
    public function show($id)
    {
        //
    }

    //Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request, $id)
    {
        //
    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
