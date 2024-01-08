<?php

namespace App\Http\Controllers\WORKSHOP\Gps;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LaporanController extends Controller
{
    public function OrderPengerjaanMasuk(){
        return view('workshop.GPS.Laporan.OrderPengerjaanMasuk');
    }
    public function HasilPengerjaan() {
        return view('workshop.GPS.Laporan.HasilPengerjaan');
    }
}
