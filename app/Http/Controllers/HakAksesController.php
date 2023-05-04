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
        $AccessProgram=DB::connection('ConnEDP')->table('User_Fitur')->select('NamaProgram')->join('FiturMaster','Id_Fitur','IdFitur')->join('ProgramMaster','Id_Program','IdProgram')->where('Id_User',Auth::user()->IDUser)->where('NamaProgram',$Program)->count();

        return $AccessProgram;
        //return view('home',compact('AccessProgram'));
    }
    public function HakAksesFitur($Fitur)
    {
        $AccessFitur=DB::connection('ConnEDP')->table('User_Fitur')->join('FiturMaster','Id_Fitur','IdFitur')->where('Id_User',Auth::user()->IDUser)->where('NamaFitur',$Fitur)->count();
        //dd($AccessProgram);
        return $AccessFitur;
        //return view('home',compact('AccessProgram'));
    }
}
