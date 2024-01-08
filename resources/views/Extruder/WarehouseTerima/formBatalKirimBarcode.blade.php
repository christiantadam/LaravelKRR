@extends('layouts.appExtruder')

@section('title')
    Batal Kirim Barcode Gelondongan
@endsection

@section('content')
    <div id="form_batal_kirim" class="form" data-aos="fade-up">

        <input type="hidden" id="form_name" value="{{ $formName }}">

        <div class="row mt-3">
            <div class="col-lg-2">
                <span class="aligned-text">Divisi:</span>
            </div>

            <div class="col-lg-8">
                <select id="select_divisi" class="form-select">
                    <option selected>-- Pilih Divisi --</option>
                    @foreach ($formData['listDivisi'] as $d)
                        <option value="{{ $d->IdDivisi }}">{{ $d->IdDivisi . ' | ' . $d->NamaDivisi }}</option>
                    @endforeach
                </select>
            </div>
        </div>

        <div class="mt-4">
            <span style="font-size: large"><b>Beri tanda centang (√) pada bercode yang batal dikirim ke
                    gudang</b></span>

            <table id="table_barcode" class="hover cell-border">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>No. Barcode</th>
                        <th>Sub-kelompok</th>
                        <th>Kelompok</th>
                        <th>Kode Barang</th>
                        <th>No. Indeks</th>
                        <th>Primer</th>
                        <th>Sekunder</th>
                        <th>Tritier</th>
                        <th>Tanggal</th>
                        <th>Divisi</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>

        <div class="mt-3 mb-5 float-end text-center">
            <button type="button" id="btn_hapus" class="btn btn-outline-danger" style="margin-right: 10px;">Hapus</button>
            <button type="button" id="btn_keluar" class="btn btn-outline-secondary"
                style="margin-right: 10px;">Keluar</button>
        </div>
    </div>

    <script src="{{ asset('js\Extruder\WarehouseTerima\batalKirimBarcode.js') }}"></script>
@endsection
