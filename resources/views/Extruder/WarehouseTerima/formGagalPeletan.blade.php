@extends('layouts.appExtruder')

@section('title')
    Tidak Tersimpan Peletan
@endsection

@section('content')
    <div id="batal_terima_peletan" class="form" data-aos="fade-up">
        <div class="row mt-3">
            <div class="col-lg-6">
                <div class="row">
                    <div class="col-lg-3">
                        <span class="aligned-text">Divisi:</span>
                    </div>
                    <div class="col-lg-9">
                        <select id="select_divisi" class="form-select">
                            <option disabled selected>-- Pilih Divisi --</option>
                            @foreach ($formData['listDivisi'] as $d)
                                <option value="{{ $d->IdDivisi }}">{{ $d->IdDivisi . ' | ' . $d->NamaDivisi }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
            </div>

            <div class="col-lg-3"></div>

            <div class="col-lg-3">
                <button id="jumlah_barcode" type="button" class="btn btn-outline-secondary btn-scan-barcode" disabled
                    style="color: black; font-size: x-large; height: auto;">0</button>
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
                        <th>Shift</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>

        <div class="mt-4">
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

        <div class="mt-3 mb-5 float-end text-center">
            <button id="btn_proses" type="button" class="btn btn-outline-success"
                style="margin-right: 10px;">Proses</button>
            <button id="btn_batal" type="button" class="btn btn-outline-danger" style="margin-right: 10px;">Batal
                Proses</button>
            <button id="btn_keluar" type="button" class="btn btn-outline-secondary"
                style="margin-right: 10px;">Keluar</button>
        </div>
    </div>

    <script src="{{ asset('js\Extruder\WarehouseTerima\batalTerimaPeletan.js') }}"></script>
@endsection
