@extends('layouts.appExtruder')

@section('title')
    Kirim KRR2
@endsection

@section('content')
    <div id="nama_form" class="form" data-aos="fade-up">
        <div class="row mt-3">
            <div class="col-lg-2">
                <span class="aligned-text">Divisi:</span>
            </div>

            <div class="col-lg-8">
                <select id="select_divisi" class="form-select">
                    <option disabled selected>-- Pilih Divisi --</option>
                    @foreach ($formData['listDivisi'] as $d)
                        <option value="{{ $d->IdDivisi }}">{{ $d->IdDivisi . ' | ' . $d->NamaDivisi }}</option>
                    @endforeach
                </select>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-lg-2">
                <span class="aligned-text">Objek:</span>
            </div>

            <div class="col-lg-8">
                <select id="select_objek" class="form-select" disabled>
                    <option disabled selected>-- Pilih Objek --</option>
                </select>
            </div>
        </div>

        <div class="mt-3"></div>

        <span><b>STOK SAAT INI</b></span>

        <div class="table-responsive">
            <table id="table_stok" class="hover cell-border">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Item Number</th>
                        <th>Kode Barang</th>
                        <th>Nama Barang</th>
                        <th>Ball</th>
                        <th>Lembar</th>
                        <th>Kg</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>

    <script src="{{ asset('js\Extruder\WarehouseTerima\stokSetengah.js') }}"></script>
@endsection
