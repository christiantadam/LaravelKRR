<?php

namespace App\Http\Controllers\EDP;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use DB;

class MaintenanceHakAksesController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('EDP');
        $pegawai = DB::connection('ConnEDP')->table('UserMaster')->select('NomorUser', 'NamaUser')->get();
        $program = DB::connection('ConnEDP')->table('ProgramMaster')->select('*')->get();
        // dd($program);
        return view('EDP.Master.MaintenanceHakAkses', compact('access', 'pegawai', 'program'));
    }

    function getAllFitur($IdProgram, $NomorPegawai)
    {
        $fiturMaster = DB::connection('ConnEDP')->table('FiturMaster')->select('NamaMenu', 'NamaFitur', 'IdFitur')->leftJoin('MenuMaster', 'Id_Menu', '=', 'IdMenu')->where('Id_Program', '=', $IdProgram)->get();
        $idFiturMilikUser = DB::connection('ConnEDP')->table('User_Fitur')->select('Id_Fitur')->leftJoin('UserMaster', 'IdUser', '=', 'Id_User')->where('NomorUser', '=', $NomorPegawai)->get();
        $data = [
            $fiturMaster,
            $idFiturMilikUser
        ];
        return response()->json($data);
    }

    function EditUserFitur(Request $request)
    {
        // dd($request->all(), !empty($request->addedValues));

        if (!empty($request->deletedValues)) {
            $deletedValues = json_decode($request->deletedValues);

            DB::connection('ConnEDP')
                ->table('User_Fitur')
                ->leftJoin('UserMaster', 'User_fitur.Id_User', '=', 'UserMaster.IdUser')
                ->where('UserMaster.NomorUser', $request->namaPegawaiText)
                ->whereIn('User_fitur.Id_Fitur', $deletedValues)
                ->delete();
        }
        if (!empty($request->addedValues)) {
            $addedValues = json_decode($request->addedValues);
            $iduser = DB::connection('ConnEDP')->table('UserMaster')->select('IDUser')->where('NomorUser', '=', $request->namaPegawaiText)->get();
            // dd($addedValues[0], $iduser[0]->IDUser, $request->namaPegawaiText);
            for ($i=0; $i < count($addedValues); $i++) {
                DB::connection('ConnEDP')
                ->table('User_Fitur')
                ->insert([
                    'Id_User' => $iduser[0]->IDUser,
                    'Id_Fitur' => $addedValues[$i]
                ]);
            }
        }

        return redirect()->back()->with('success', 'Maintenance Berhasil!');
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    // Store a newly created resource in storage.
    public function store(Request $request)
    {

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
    public function update($id)
    {

    }

    //Remove the specified resource from storage.
    public function destroy($id)
    {
        //
    }
}
