<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TransBL;
use App\User;
use DB;
use Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        // $AccessProgram=DB::connection('ConnEDP')->table('User_Fitur')->select('NamaProgram')->join('FiturMaster','Id_Fitur','IdFitur')->join('ProgramMaster','Id_Program','IdProgram')->groupBy('NamaProgram')->where('Id_User',Auth::user()->IDUser)->get();
        $AccessProgram = DB::connection('ConnEDP')->table('User_Fitur')
            ->select('NamaProgram', 'RouteProgram')
            ->join('FiturMaster', 'Id_Fitur', 'IdFitur')
            ->join('MenuMaster', 'Id_Menu', 'IdMenu')
            ->join('ProgramMaster', 'Id_Program', 'IdProgram')
            ->groupBy('NamaProgram', 'RouteProgram')
            ->where('Id_User', Auth::user()->IDUser)
            ->OrWhere('Id_User', 218)->get();
        // dd($AccessProgram);
        return view('home', compact('AccessProgram'));
    }
    public function Sales()
    {
        $result = (new HakAksesController)->HakAksesProgram('Sales');
        $access = (new HakAksesController)->HakAksesFiturMaster('Sales');
        if ($result > 0) {
            return view('layouts.appSales', compact('access'));
        } else {
            return redirect('home')->with('status','Anda Tidak Memiliki Hak Akses Program Sales!');

        }
    }
    public function Beli()
    {
        $result = (new HakAksesController)->HakAksesProgram('Beli');
        $access = (new HakAksesController)->HakAksesFiturMaster('Beli');
        if ($result > 0) {
            return view('layouts.appOrderPembelian', compact('access'));
        } else {
            // abort(403);
            return redirect('home')->with('status','Anda Tidak Memiliki Hak Akses Program Beli!');
        }
    }
    public function EDP()
    {
        $result = (new HakAksesController)->HakAksesProgram('EDP');
        $access = (new HakAksesController)->HakAksesFiturMaster('EDP');
        if ($result > 0) {
            return view('layouts.appEDP', compact('access'));
        } else {
            // abort(403);
            return redirect('home')->with('status','Anda Tidak Memiliki Hak Akses Program EDP!');
        }
    }
    public function GPS()
    {
        $result = (new HakAksesController)->HakAksesProgram('Workshop');
        $access = (new HakAksesController)->HakAksesFiturMaster('Workshop');
        if ($result > 0) {
            return view('layouts.appGPS', compact('access'));
        } else {
            // abort(403);
            return redirect('home')->with('status','Anda Tidak Memiliki Hak Akses!');
        }
    }
    public function Workshop()
    {
        $result = (new HakAksesController)->HakAksesProgram('Workshop'); //belum diatur
        $access = (new HakAksesController)->HakAksesFiturMaster('Workshop'); //belum diatur
        if ($result > 0) {
            return view('layouts.appWorkshop', compact('access'));
        } else {
            // abort(403);
            return redirect('home')->with('status','Anda Tidak Memiliki Hak Akses Program Workshop!');
        }
    }
}
