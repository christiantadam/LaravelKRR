<?php

namespace App\Http\Controllers\Sales\ToolPenjualan;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PenjualanBarcodeController extends Controller
{
     //Display a listing of the resource.
     public function index()
     {
         return view('Sales.ToolPenjualan.PenjualanBarcode');
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
