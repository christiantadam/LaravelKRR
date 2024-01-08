@extends('layouts.appExtruder')

@section('title')
    Scan Barcode Gelondongan
@endsection

@section('content')
    <input type="hidden" id="ambil_data_fetch">
    <div id="scan_gelondongan" class="form" data-aos="fade-up">
        <div class="row mt-3">
            <div class="col-lg-6">

                <div class="row">
                    <div class="col-lg-3">
                        <span class="aligned-text">Divisi:</span>
                    </div>
                    <div class="col-lg-7">
                        <select id="select_divisi" class="form-select">
                            <option disabled selected>-- Pilih Divisi --</option>
                            @foreach ($formData['listDivisi'] as $d)
                                <option value="{{ $d->IdDivisi }}">{{ $d->IdDivisi . ' | ' . $d->NamaDivisi }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-3">
                        <span class="aligned-text">No. Barcode:</span>
                    </div>
                    <div class="col-lg-7">
                        <input type="text" id="no_barcode" class="form-control" placeholder="<<no barcode>>">
                    </div>

                    <div class="col-lg-2">
                        <span class="spn_enter">Enter</span>
                    </div>
                </div>

            </div>

            <div class="col-lg-6">
                <button type="button" id="btn_lihat"
                    class="btn btn-outline-warning btn-scan-barcode">Lihat<br>Data</button>
                <button type="button" id="btn_proses" class="btn btn-outline-success btn-scan-barcode">Proses</button>
                <button type="button" id="btn_keluar" class="btn btn-outline-danger btn-scan-barcode">Keluar</button>
                <button type="button" id="btn_barcode" class="btn btn-outline-secondary btn-scan-barcode" disabled
                    style="color: black; font-size: xx-large;">0</button>
            </div>
        </div>

        <div class="mt-4">
            <span style="font-size: large"><b>Rekap Barcode Yang Diterima</b></span>

            <table id="table_rekap" class="hover cell-border">
                <thead>
                    <tr>
                        <th>Tanggal</th>
                        <th>Type</th>
                        <th>Primer</th>
                        <th>Sekunder</th>
                        <th>Tritier</th>
                        <th>Id Type</th>
                        <th>Divisi</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>

        <div class="mt-5">
            <span style="font-size: large"><b>Daftar Barcode Yang Diterima Gudang</b></span>

            <table id="table_kirim" class="hover cell-border">
                <thead>
                    <tr>
                        <th>Tanggal</th>
                        <th>Type</th>
                        <th>No. Barcode</th>
                        <th>Sub-Kelompok</th>
                        <th>Kelompok</th>
                        <th>Kode Barang</th>
                        <th>No. Indeks</th>
                        <th>Primer</th>
                        <th>Sekunder</th>
                        <th>Tritier</th>
                        <th>Divisi</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>

    @include('Extruder.WarehouseTerima.modalLihatDataBarcode')
    <script src="{{ asset('js\Extruder\WarehouseTerima\scanGelondongan.js') }}"></script>
@endsection
