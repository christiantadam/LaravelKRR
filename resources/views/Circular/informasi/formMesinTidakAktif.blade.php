@extends('Circular.layouts.app')

@section('title')
    Mesin Tidak Aktif
@endsection

@section('content')
    <div class="card mb-3">
        <div class="card-header">
            Mesin Tidak Aktif
        </div>

        <div class="card-body" style="padding-left: 5%; padding-right: 5%;">

            <div class="row">
                <div class="col-md-3 aligned-text">
                    <label for="tanggal_mesin_tidak_aktif">Tanggal Mesin Tidak Aktif:</label>
                </div>

                <div class="col-md-5">
                    <div class="input-group input-group-sm">
                        <input type="date" id="tanggal_awal" class="form-control">
                        <span class="input-group-text">s/d</span>
                        <input type="date" id="tanggal_akhir" class="form-control">
                        <button type="button" id="btn_OK" class="btn btn-primary" style="min-width: 75px">OK</button>
                    </div>
                </div>
            </div>

            <div class="mt-3">
                <table id="table_mesin" class="table table-bordered table-hover" style="font-size: 14px">
                    <thead>
                        <tr>
                            <th>Tanggal</th>
                            <th>Mesin</th>
                            <th>Id Order</th>
                            <th>Kd. Barang</th>
                            <th>Nama Order</th>
                            <th>Rencana Order</th>
                            <th>Jumlah Order</th>
                            <th>RPM</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>

            <div class="row mt-4">
                <div class="col-md-12 d-flex justify-content-end flex-wrap">
                    <button type="button" id="btn_keluar" class="btn btn-secondary mx-1 my-1">Keluar</button>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('custom_js')
    <script src="{{ asset('js/Circular/informasi/mesinTidakAktif.js') }}"></script>
@endsection
