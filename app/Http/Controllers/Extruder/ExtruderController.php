<?php

namespace App\Http\Controllers\Extruder;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ExtruderController extends Controller
{
    public function index($pageName = "index", $formName = "index")
    {
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
        // dd($viewData, $viewName);
        return view($viewName, $viewData);
    }
}
