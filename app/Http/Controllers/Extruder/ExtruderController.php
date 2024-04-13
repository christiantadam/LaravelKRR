<?php

namespace App\Http\Controllers\Extruder;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\HakAksesController;

class ExtruderController extends Controller
{
    public function index($pageName = "index", $formName = "index")
    {
        $result = (new HakAksesController)->HakAksesProgram($pageName);
        $access = (new HakAksesController)->HakAksesFiturMaster($pageName);
        $viewName = $pageName == "index"
            ? 'extruder.index'
            : 'extruder.' . $pageName . '.index';
        $viewName = $formName == "index"
            ? $viewName
            : 'extruder.' . $pageName . '.' . $formName;

        $viewData = [
            'pageName' => $pageName,
            'formName' => $formName,
        ];
        // dd($viewData, $viewName, $pageName, $formName, $result, $access);
        if ($result > 0) {
            return view($viewName, $viewData, compact('access'));
        }
        else{
            return redirect('home')->with('status','Anda Tidak Memiliki Hak Akses Program '.$pageName.'!');
        }
    }
}
