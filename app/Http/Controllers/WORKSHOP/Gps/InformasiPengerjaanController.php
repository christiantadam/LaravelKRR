<?php

namespace App\Http\Controllers\WORKSHOP\Gps;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class InformasiPengerjaanController extends Controller
{
    public function JadwalPerMesinPengerjaan() {
        return view('workshop.GPS.Informasi_Pengerjaan.JadwalPerMesin');
    }
    public function JadwalPerOrderPengerjaan() {
        return view('workshop.GPS.Informasi_Pengerjaan.JadwalPerOrder');
    }
    public function DaftarOrderKerjaProyek() {
        return view('workshop.GPS.Informasi_Pengerjaan.DaftarOrderKerjaProyek');
    }
    public function EDMCNC() {
        return view('workshop.GPS.Informasi_Pengerjaan.GrafikMesinEDM-CNC');
    }
    public function DrillMillScrap() {
        return view('workshop.GPS.Informasi_Pengerjaan.GrafikDrill-Mill-Scrap');
    }
    public function MesinGrinding() {
        return view('workshop.GPS.Informasi_Pengerjaan.GrafikMesinGrinding');
    }
    public function MesinLas() {
        return view('workshop.GPS.Informasi_Pengerjaan.GrafikMesinLas');
    }
    public function PunchInjectCasting() {
        return view('workshop.GPS.Informasi_Pengerjaan.GrafikPunch-Inject-Casting');
    }
    public function Turning() {
        return view('workshop.GPS.Informasi_Pengerjaan.MesinTurning');
    }
    public function Finishing() {
        return view('workshop.GPS.Informasi_Pengerjaan.MesinFinishing');
    }
    public function Makloon() {
        return view('workshop.GPS.Informasi_Pengerjaan.ProsesMakloon');
    }
    public function PengerjaanPerOrder() {
        return view('workshop.GPS.Informasi_Pengerjaan.PengerjaanPerOrder');
    }
    public function PengerjaanPerBulan() {
        return view('workshop.GPS.Informasi_Pengerjaan.PengerjaanPerBulan');
    }
    public function HistoriProsesPengerjaan() {
        return view('workshop.GPS.Informasi_Pengerjaan.HistoriProsesPengerjaan');
    }
    public function DaftarSPerPart() {
        return view('workshop.GPS.Informasi_Pengerjaan.DaftarSPerPart');
    }
}
