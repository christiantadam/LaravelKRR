<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use DB;
use Auth;

class HakAksesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function HakAksesProgram($Program)
    {
        // $AccessProgram=DB::connection('ConnEDP')->table('User_Fitur')->select('NamaProgram')->join('FiturMaster','Id_Fitur','IdFitur')->join('ProgramMaster','Id_Program','IdProgram')->where('Id_User',Auth::user()->IDUser)->where('NamaProgram',$Program)->count();
        $AccessProgram = DB::connection('ConnEDP')->table('User_Fitur')->select('NamaProgram')->join('FiturMaster', 'Id_Fitur', 'IdFitur')->join('MenuMaster', 'Id_Menu', 'IdMenu')->join('ProgramMaster', 'Id_Program', 'IdProgram')->where('Id_User', Auth::user()->IDUser)->where('NamaProgram', $Program)->count();
        return $AccessProgram;
        //return view('home',compact('AccessProgram'));
    }
    public function HakAksesFitur($Fitur)
    {
        $AccessFitur = DB::connection('ConnEDP')->table('User_Fitur')->join('FiturMaster', 'Id_Fitur', 'IdFitur')->where('Id_User', Auth::user()->IDUser)->where('NamaFitur', $Fitur)->count();
        //dd($AccessProgram);
        return $AccessFitur;
        //return view('home',compact('AccessProgram'));
    }
    function HakAksesFiturMaster()
    {
        $AccessMenu = DB::connection('ConnEDP')->table('MenuMaster')
            ->select('IdMenu', 'NamaMenu', 'Parent_IdMenu')
            ->leftJoin('FiturMaster', 'Id_Menu', '=', 'IdMenu')
            ->leftJoin('User_Fitur', 'Id_Fitur', '=', 'IdFitur')
            ->where('Id_User', 47)
            ->orWhere('IdMenu', function ($subquery) {
                $subquery->select('Parent_IdMenu')
                    ->from('MenuMaster')
                    ->join('ProgramMaster', 'Id_Program', '=', 'IdProgram')
                    ->leftJoin('FiturMaster', 'Id_Menu', '=', 'IdMenu')
                    ->leftJoin('User_Fitur', 'Id_Fitur', '=', 'IdFitur')
                    ->whereNotNull('Parent_IdMenu')
                    ->groupBy('Parent_IdMenu');
            })
            ->groupBy('IdMenu', 'NamaMenu', 'Parent_IdMenu')
            ->orderBy('NamaMenu', 'asc')
            ->get();

        $AccessFitur = DB::connection('ConnEDP')->table('User_Fitur')->select('IdFitur','NamaFitur', 'Id_Menu', 'Route')->join('FiturMaster', 'Id_Fitur', 'IdFitur')->join('MenuMaster', 'Id_Menu', 'IdMenu')->join('ProgramMaster', 'Id_Program', 'IdProgram')->groupBy('IdFitur','NamaFitur', 'Id_Menu', 'Route')->where('Id_User', Auth::user()->IDUser)->get();
        $Access = [
            'AccessMenu' => $AccessMenu,
            'AccessFitur' => $AccessFitur
        ];

        return $Access;
    }
}
