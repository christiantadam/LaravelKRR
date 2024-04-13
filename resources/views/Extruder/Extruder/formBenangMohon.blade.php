@extends('layouts.appExtruder')

@section('title')
    Permohonan Konversi NG
@endsection

@section('content')
    <style>
        #table_asal,
        #table_tujuan {
            font-size: 12px;
        }

        .sorting {
            font-size: 12px;
        }
    </style>

    <input type="hidden" id="nama_gedung" value="{{ $formData['namaGedung'] }}">
    <input type="hidden" id="form_rk_return">

    <div id="form_benang_mohon" class="form" data-aos="fade-up">

        <div class="row mt-3">
            <div class="col-lg-7"></div>

            <div class="col-lg-3">
                <span class="aligned-text">Tanggal Mohon:</span>
            </div>

            <div class="col-lg-2">
                <input type="date" id="tanggal_mohon" class="form-control">
            </div>
        </div>

        <div class="row mt-3 border-bottom"></div>

        <div class="row mt-3">
            <div class="col-lg-2">
                <span class="aligned-text">Tanggal:</span>
            </div>
            <div class="col-lg-3">
                <input type="date" id="tanggal" class="form-control unclickable">
            </div>

            <div class="col-lg-2">
                <span class="aligned-text">Mesin:</span>
            </div>

            <div class="col-lg-3">
                <select id="select_mesin" class="form-select" disabled>
                    <option selected disabled>-- Pilih Mesin --</option>
                </select>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-lg-2">
                <span class="aligned-text">Nomor:</span>
            </div>

            <div class="col-lg-3">
                <select id="select_nomor" class="form-select" disabled>
                    <option selected disabled>-- Pilih Nomor --</option>
                    @foreach ($formData['listNomor'] as $d)
                        <option value="{{ $d->MesinShift }}">{{ $d->IdKonversiNG }}</option>
                    @endforeach
                </select>
            </div>

            <div class="col-lg-1"></div>

            <div class="col-lg-6">
                <select id="select_nomor_konversi" class="form-select" style="text-align: center" disabled>
                    <option selected disabled>-- Pilih Nomor Konversi --</option>
                </select>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-lg-2">
                <span class="aligned-text">Shift:</span>
            </div>
            <div class="col-lg-3">
                <div class="input-group">
                    <input type="text" id="shift" class="form-control" style="max-width: 50px;" disabled>
                    <input type="time" id="shift_awal" class="form-control unclickable">
                    <span class="input-group-text">s/d</span>
                    <input type="time" id="shift_akhir" class="form-control unclickable">
                </div>
            </div>

            <div class="col-lg-2">
                <span class="aligned-text">Type:</span>
            </div>
            <div class="col-lg-5">
                <select id="select_type" class="form-select" disabled>
                    <option selected disabled>-- Pilih Type --</option>
                </select>
            </div>
        </div>

        <div class="card mt-3">
            <div class="card-header">Asal Konversi</div>

            <div class="card-body">
                <table id="table_asal" class="hover cell-border">
                    <thead>
                        <tr>
                            <th>Id Type</th>
                            <th>Nama Type</th>
                            <th>Jumlah Primer</th>
                            <th>Jumlah Sekunder</th>
                            <th>Jumlah Tritier</th>
                            <th>Nama Objek</th>
                            <th>Nama Kel. Utama</th>
                            <th>Nama Kelompok</th>
                            <th>Nama Sub-kelompok</th>
                            <th>Id Objek</th>
                            <th>Id Kel. Ut.</th>
                            <th>Id Kelompok</th>
                            <th>Id Sub-kel.</th>
                            <th>Id Transaksi</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>

        <div class="card mt-3">
            <div class="card-header">Tujuan Konversi</div>

            <div class="card-body">
                <table id="table_tujuan" class="hover cell-border">
                    <thead>
                        <tr>
                            <th>Id Type</th>
                            <th>Nama Type</th>
                            <th>Jumlah Primer</th>
                            <th>Jumlah Sekunder</th>
                            <th>Jumlah Tritier</th>
                            <th>Nama Objek</th>
                            <th>Nama Kel. Utama</th>
                            <th>Nama Kelompok</th>
                            <th>Nama Sub-kelompok</th>
                            <th>Id Objek</th>
                            <th>Id Kel. Ut.</th>
                            <th>Id Kelompok</th>
                            <th>Id Sub-kel.</th>
                            <th>Id Transaksi</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-md-5 text-center">
                <button type="button" id="btn_isi" class="btn btn-success">Isi</button>
                <button type="button" id="btn_koreksi" class="btn btn-warning">Koreksi</button>
                <button type="button" id="btn_hapus" class="btn btn-danger">Hapus</button>
            </div>
            <div class="col-md-2"></div>
            <div class="col-md-5 text-center">
                <button type="button" id="btn_proses" class="btn btn-primary">Proses</button>
                <button type="button" id="btn_keluar" class="btn btn-secondary">Keluar</button>
            </div>
        </div>
    </div>

    @include('Extruder.ExtruderNet.modalRincianKonversi')
    <script src="{{ asset('js/Extruder/ExtruderNet/benangMohon_new.js') }}"></script>
@endsection
