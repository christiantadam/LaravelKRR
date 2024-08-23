<?php

namespace App\Http\Controllers\JumboBag;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use App\Http\Controllers\HakAksesController;
use Exception;
use Auth;

class PermohonanKonversiJBBPotongController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Jumbo Bag');
        return view('JumboBag.PermohonanKonversiJBBPotong', compact('access'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show($id, Request $request)
    {
        if ($id == 'getDivisi') {
            $UserInput = trim(Auth::user()->NomorUser);

            $divisiConn = DB::connection('ConnInventory')
                ->select('exec SP_4384_JBB_Konversi_Potong @XKdUser = ?, @XKode = ?', [$UserInput, 1]);

            $divisiArr = array_map(function ($divisiList) {
                return [
                    'NamaDivisi' => $divisiList->NamaDivisi,
                    'IdDivisi' => $divisiList->IdDivisi,
                ];
            }, $divisiConn);

            return datatables($divisiArr)->make(true);
        } else if ($id == 'getObjek') {
            $UserInput = trim(Auth::user()->NomorUser);
            $idDivisi = $request->input('idDivisi');
            $objekConn = DB::connection('ConnInventory')
                ->select('exec SP_4384_JBB_Konversi_Potong @XKdUser = ?, @XKode = ?, @XIdDivisi = ?', [$UserInput, 2, $idDivisi]);

            $objekArr = array_map(function ($objekList) {
                return [
                    'Namaobjek' => $objekList->NamaObjek,
                    'Idobjek' => $objekList->IdObjek,
                ];
            }, $objekConn);

            return datatables($objekArr)->make(true);
        } else if ($id == 'getDataKonversi') {
            return response()->json($request->input('idKonversi'), 200);
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
