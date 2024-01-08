@extends('layouts.appExtruder')

@section('title')
    Cek Barcode
@endsection

@section('content')
    <div id="form_cek_barcode" class="form" data-aos="fade-up">
        <div class="row mt-3">
            <div class="col-md-1"></div>

            <div class="col-md-3">
                <span class="aligned-text">
                    Item Number - Kode Barang:
                </span>
            </div>

            <div class="col-md-5">
                <input type="text" id="kode_barang" class="form-control" placeholder="Masukkan kode barang disini..">
            </div>

            <div class="col-md-2">
                <span class="spn_enter">Enter</span>
            </div>

            <div class="col-md-1"></div>
        </div>
    </div>

    <script src="{{ asset('js\Extruder\WarehouseTerima\cekBarcode.js') }}"></script>
@endsection
