@extends('layouts.appExtruder')

@section('title')
    Permohonan Konversi
@endsection

@section('content')
    <style>
        #table_komposisi,
        #table_konversi {
            font-size: 12px;
        }

        .sorting,
        .sorting_disabled {
            font-size: 12px;
        }
    </style>

    <input type="hidden" id="input_hidden">
    <input type="hidden" id="nama_gedung" value="{{ $formData['namaGedung'] }}">

    <div id="konversi_mohon" class="form" data-aos="fade-up">
        <div class="form-group row mt-3">
            <div class="col-lg-2"><span class="aligned-text">Nomor: </span></div>
            <div class="col-lg-8">
                <select id="select_nomor" class="form-select" disabled>
                    <option selected disabled>-- Pilih Nomor --</option>
                    @foreach ($formData['listKonversi'] as $d)
                        <option value="{{ $d->IdKonversi }}">{{ $d->IdKonversi . ' | ' . $d->NamaKomposisi }}</option>
                    @endforeach
                </select>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-lg-4">
                <label for="select_nomor_order">No. Order:</label>
                <select id="select_nomor_order" class="form-select" disabled>
                    <option selected disabled>-- Pilih Nomor Order --</option>
                    @foreach ($formData['listNoOrder'] as $d)
                        <option value="{{ $d->IDOrder }}">{{ $d->IDOrder . ' | ' . $d->Identifikasi }}</option>
                    @endforeach
                </select>
            </div>

            <div class="col-lg-1"></div>

            <div class="col-lg-2">
                <label for="lot">Lot:</label>
                <input type="number" id="lot" class="form-control" placeholder="0" disabled>
            </div>

            <div class="col-lg-1"></div>

            <div class="col-lg-4">
                <label for="tanggal">Tanggal:</label>
                <input type="date" id="tanggal" class="form-control">
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-lg-4">
                <label for="select_spek">Spek:</label>
                <select id="select_spek" class="form-select" disabled>
                    <option selected disabled>-- Pilih Spek --</option>
                </select>
            </div>

            <div class="col-lg-1"></div>

            <div class="col-lg-2">
                <label for="ukuran">Ukuran:</label>
                <input type="number" id="ukuran" class="form-control" placeholder="0" disabled>
            </div>

            <div class="col-lg-1"></div>

            <div class="col-lg-4">
                <label for="shift">Shift:</label>
                <div class="input-group">
                    <input type="text" id="shift" class="form-control" style="max-width: 50px;" disabled>
                    <input type="time" id="shift_awal" class="form-control unclickable" value="00:00">
                    <span class="input-group-text">s/d</span>
                    <input type="time" id="shift_akhir" class="form-control unclickable" value="00:00">
                </div>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-lg-4">
                <label for="select_mesin">Mesin:</label>
                <select id="select_mesin" class="form-select" disabled>
                    <option selected disabled>-- Pilih Mesin --</option>
                    @foreach ($formData['listMesin'] as $d)
                        <option value="{{ $d->IdMesin }}">{{ $d->IdMesin . ' | ' . $d->TypeMesin }}</option>
                    @endforeach
                </select>
            </div>

            <div class="col-lg-1"></div>

            <div class="col-lg-2">
                <label for="denier">Denier:</label>
                <input type="number" id="denier" class="form-control" placeholder="0" disabled>
            </div>

            <div class="col-lg-1"></div>

            <div class="col-lg-2">
                <label for="waktu_mulai">Mulai:</label>
                <input type="time" id="waktu_mulai" class="form-control unclickable" value="00:00">
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-lg-4">
                <label for="select_komposisi">Komposisi:</label>
                <select id="select_komposisi" class="form-select" disabled>
                    <option selected disabled>-- Pilih Komposisi --</option>
                </select>
            </div>

            <div class="col-lg-1"></div>

            <div class="col-lg-2">
                <label for="warna">Warna:</label>
                <input type="text" id="warna" class="form-control" disabled>
            </div>

            <div class="col-lg-1"></div>

            <div class="col-lg-2">
                <label for="waktu_selesai">Selesai:</label>
                <input type="time" id="waktu_selesai" class="form-control unclickable" value="00:00">
            </div>

            <div class="col-lg-2">
                <label for="temp"></label>
                <input type="text" id="no_urut" class="form-control hidden" placeholder="Nomor Urut">
            </div>
        </div>

        <div class="card mt-4">
            <div class="card-body">
                <table id="table_konversi" class="hover cell-border" tabindex="0">
                    <thead>
                        <tr>
                            <th>Nama Type</th>
                            <th>Qty. Primer</th>
                            <th>Sat. Primer</th>
                            <th>Qty. Sekunder</th>
                            <th>Sat. Sekunder</th>
                            <th>Qty. Tritier</th>
                            <th>Sat. Tritier</th>
                            <th>Presentase</th>
                            <th>Jenis</th>
                            <th>Id Sub-kel.</th>
                            <th>IdType</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>

                <div class="row mt-4">

                    <div class="col-lg-6">
                        <div class="mt-2">
                            <table id="table_komposisi" class="hover cell-border" tabindex="1">
                                <thead>
                                    <tr>
                                        <th>Jenis</th>
                                        <th>Nama Type</th>
                                        <th>Sub-kelompok</th>
                                        <th>Id Subkel.</th>
                                        <th>IdType</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="row">
                            <div class="col-lg-12">
                                <label for="item_produksi">Item Produksi:</label>
                                <div class="input-group">
                                    <input type="text" id="id_produksi" class="form-control" disabled>
                                    <input type="text" id="nama_produksi" class="form-control" style="width: 12.5vw;"
                                        disabled>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-lg-6">
                                <label for="stok_primer">Stok Primer:</label>
                                <input type="number" id="stok_primer" class="form-control" disabled>
                            </div>
                            <div class="col-lg-1"></div>
                            <div class="col-lg-5">
                                <label for="primer">Primer:</label>
                                <div class="input-group">
                                    <input type="number" id="primer" class="form-control" placeholder="0" disabled>
                                    <span id="sat_primer" class="input-group-text"></span>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-lg-6">
                                <label for="stok_sekunder">Stok Sekunder:</label>
                                <input type="number" id="stok_sekunder" class="form-control" disabled>
                            </div>
                            <div class="col-lg-1"></div>
                            <div class="col-lg-5">
                                <label for="sekunder">Sekunder:</label>
                                <div class="input-group">
                                    <input type="number" id="sekunder" class="form-control" placeholder="0" disabled>
                                    <span id="sat_sekunder" class="input-group-text"></span>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-lg-6">
                                <label for="stok_tritier">Stok Tritier:</label>
                                <input type="number" id="stok_tritier" class="form-control" disabled>
                            </div>
                            <div class="col-lg-1"></div>
                            <div class="col-lg-5">
                                <label for="tritier">Tritier:</label>
                                <div class="input-group">
                                    <input type="number" id="tritier" class="form-control" placeholder="0" disabled>
                                    <span id="sat_tritier" class="input-group-text"></span>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-4">
                            <div class="col-lg-3">
                                <input type="text" id="jenis" class="form-control" placeholder="Jenis" disabled>
                            </div>

                            <div class="col-lg-9">
                                <div class="float-end">
                                    <button type="button" id="btn_baru_detail" class="btn btn-success" disabled>Tambah
                                        Item</button>
                                    <button type="button" id="btn_koreksi_detail" class="btn btn-warning"
                                        disabled>Koreksi</button>
                                    <button type="button" id="btn_hapus_detail" class="btn btn-danger"
                                        disabled>Hapus</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-md-5 text-center">
                <button type="button" id="btn_baru_master" class="btn btn-success">Konversi Baru</button>
                <button type="button" id="btn_koreksi_master" class="btn btn-warning">Koreksi</button>
                <button type="button" id="btn_hapus_master" class="btn btn-danger">Hapus</button>
            </div>
            <div class="col-md-2"></div>
            <div class="col-md-5 text-center">
                <button type="button" id="btn_proses" class="btn btn-primary" disabled>Proses</button>
                <button type="button" id="btn_keluar" class="btn btn-secondary">Keluar</button>
            </div>
        </div>
    </div>

    <script src="{{ asset('js/Extruder/ExtruderNet/konversiMohon_new.js') }}"></script>
@endsection
