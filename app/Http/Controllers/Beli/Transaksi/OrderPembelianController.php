<?php

namespace App\Http\Controllers\Beli\Transaksi;

use Illuminate\Http\Request;
use App\Models\Beli\TransBL;
use App\User;
use App\UserDiv;
use Auth;
use Carbon\Carbon;
use DB;
use App\Http\Controllers\Controller;

class OrderPembelianController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        // return view('Sales.ToolPenjualan.HapusCIR');
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
