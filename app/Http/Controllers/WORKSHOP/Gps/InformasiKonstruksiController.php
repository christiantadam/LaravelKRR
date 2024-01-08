<?php

namespace App\Http\Controllers\WORKSHOP\Gps;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class InformasiKonstruksiController extends Controller
{
    public function JadwalPerOrder() {
        return view('workshop.GPS.Informasi_Konstruksi.JadwalPerOrder');
    }
    public function DaftarOrderGambar() {
        return view('workshop.GPS.Informasi_Konstruksi.DaftarOrderGambar');
    }
    public function DaftarEstimasiJadwal() {
        return view('workshop.GPS.Informasi_Konstruksi.DaftarEstimasiJadwal');
    }
    public function GrafikWorkStation() {
        return view('workshop.GPS.Informasi_Konstruksi.GrafikWorkStation');
    }
    public function JadwalKonstruksiPerBulan() {
        return view('workshop.GPS.Informasi_Konstruksi.JadwalKonstruksiPerBulan');
    }
    public function HistoriProsesKonstruksi() {
        return view('workshop.GPS.Informasi_Konstruksi.HistoriProsesKonstruksi');
    }
}
