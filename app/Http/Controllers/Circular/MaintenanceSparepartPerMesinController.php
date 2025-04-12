<?php

namespace App\Http\Controllers\Circular;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\HakAksesController;
use DB;
use Auth;

class MaintenanceSparepartPerMesinController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Circular');
        $nomorUser = trim(Auth::user()->NomorUser);
        $listMesin = DB::connection('ConnCircular')
            ->select('exec Sp_List_Mesin @Kode = ?', [10]);
        return view('Circular.mesin.formMaintenanceSparepartPerMesin', compact('access', 'nomorUser', 'listMesin'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show($id)
    {
        //
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
