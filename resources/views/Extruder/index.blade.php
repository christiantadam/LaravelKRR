@extends('layouts.appExtruder')

@section('title')
    Divisi Extruder
@endsection

@section('content')
    <div class="row gy-4">

        <div class="col-lg-4" data-aos="fade-up" data-aos-delay="100">
            <div class="box" onclick="location.href = '/Extruder/BeratKomposisi'">
                <div class="icon"><i class="bi bi-briefcase"></i></div>
                <h4 class="title">Berat Komposisi 2</h4>
            </div>
        </div>

        <div class="col-lg-4" data-aos="fade-up" data-aos-delay="200">
            <div class="box" onclick="location.href = '/Extruder/ExtruderNet'">
                <div class="icon"><i class="bi bi-card-checklist"></i></div>
                <h4 class="title">Extruder.Net</h4>
            </div>
        </div>

        <div class="col-lg-4" data-aos="fade-up" data-aos-delay="300">
            <div class="box" onclick="location.href = '/Extruder/WarehouseTerima'">
                <div class="icon"><i class="bi bi-bar-chart"></i></div>
                <h4 class="title">Warehouse Terima KRR2</h4>
            </div>
        </div>

    </div>
@endsection
