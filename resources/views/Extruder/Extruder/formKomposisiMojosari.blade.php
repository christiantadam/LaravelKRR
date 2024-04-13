@extends('layouts.appExtruder')

@section('title')
    Komposisi Bahan Mojosari
@endsection

@section('content')
    <input type="hidden" id="nama_gedung" value="{{ $formData['namaGedung'] }}">

    <div id="form_komposisi_mojosari" class="form" data-aos="fade-up">

        <div id="master" class="row mt-3">
            <div class="col-md-7">
                <label for="select_id_komposisi">Id Komposisi:</label>
                <select id="select_id_komposisi" class="form-select" disabled>
                    <option selected disabled>-- Pilih Id Komposisi --</option>
                    @foreach ($formData['listKomposisi'] as $d)
                        <option value="{{ $d->IdKomposisi }}">{{ $d->IdKomposisi . ' | ' . $d->NamaKomposisi }}</option>
                    @endforeach
                </select>
                <input type="text" id="nama_komposisi" class="form-control hidden"
                    placeholder="Masukkan nama komposisi disini...">

                <div class="mt-3">
                    <label for="select_mesin">Mesin:</label>
                    <select id="select_mesin" class="form-select" disabled>
                        <option selected disabled>-- Pilih Mesin --</option>
                        @foreach ($formData['listMesin'] as $d)
                            <option value="{{ $d->IdMesin }}">{{ $d->IdMesin . ' | ' . $d->TypeMesin }}</option>
                        @endforeach
                    </select>
                </div>

                <div class="mt-3">
                    <label for="select_hp">Hasil Produksi:</label>
                    <select id="select_hp" class="form-select" disabled>
                        <option selected disabled>-- Pilih Hasil Produksi --</option>
                        @foreach ($formData['listHP'] as $d)
                            <option value="{{ $d->KodeBarang }}">{{ $d->KodeBarang . ' | ' . $d->NamaType }}</option>
                        @endforeach
                    </select>
                </div>

                <div class="mt-3">
                    <label for="select_hp_ng">Hasil Produksi NG:</label>
                    <select id="select_hp_ng" class="form-select" disabled>
                        <option selected disabled>-- Pilih Hasil Produksi NG --</option>
                        @foreach ($formData['listNG'] as $d)
                            <option value="{{ $d->KodeBarang }}">{{ $d->KodeBarang . ' | ' . $d->NamaType }}</option>
                        @endforeach
                    </select>
                </div>

                <div class="mt-3">
                    <label for="select_afalan">Afalan:</label>
                    <select id="select_afalan" class="form-select" disabled>
                        <option selected disabled>-- Pilih Afalan --</option>
                        @foreach ($formData['listAfalan'] as $d)
                            <option value="{{ $d->KodeBarang }}">{{ $d->KodeBarang . ' | ' . $d->NamaType }}</option>
                        @endforeach
                    </select>
                </div>
            </div>

            <div class="col-md-5">
                {{-- BAGIAN INI TIDAK PERNAH TERPAKAI PADA SOURCE CODE VB --}}
                <div class="row" style="height: 20%;">
                    <div id="radio_container" class="hidden">
                        <div class="col-md-4 row d-flex align-items-center">
                            <div class="form-check" style="display: flex; justify-content: center;">
                                <input class="form-check-input" type="radio" name="radio_jenis" id="radio_bb">
                                <label class="form-check-label" for="radio_bb" style="padding-left: 7.5px">
                                    Komposisi
                                </label>
                            </div>
                        </div>

                        <div class="col-md-4 row d-flex align-items-center">
                            <div class="form-check" style="display: flex; justify-content: center;">
                                <input class="form-check-input" type="radio" name="radio_jenis" id="radio_hp">
                                <label class="form-check-label" for="radio_hp" style="padding-left: 7.5px">
                                    Hasil Produksi
                                </label>
                            </div>
                        </div>

                        <div class="col-md-4 row d-flex align-items-center">
                            <div class="form-check" style="display: flex; justify-content: center;">
                                <input class="form-check-input" type="radio" name="radio_jenis" id="radio_af">
                                <label class="form-check-label" for="radio_af" style="padding-left: 7.5px">
                                    Afalan
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                {{--  --}}

                <div class="row" style="height: 80%;">
                    <div class="col-md-4 d-flex align-items-end">
                        <button type="button" id="btn_tambah_afalan" class="btn btn-secondary" style="margin-bottom: 7.5px"
                            disabled>Tambah
                            Afalan</button>
                    </div>
                    <div class="col-md-8">
                        <table id="table_afalan" class="hover cell-border">
                            <thead>
                                <tr>
                                    <th>Kode Barang</th>
                                    <th>Nama Type</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div class="card mt-3">
            <div class="card-body">
                <table id="table_komposisi" class="hover cell-border" tabindex="0">
                    <thead>
                        <tr>
                            <th>Jenis</th>
                            <th>Id Type</th>
                            <th>Nama Type</th>
                            <th>Qty. Primer</th>
                            <th>Sat. Primer</th>
                            <th>Qty. Sekunder</th>
                            <th>Sat. Sekunder</th>
                            <th>Qty. Tritier</th>
                            <th>Sat. Tritier</th>
                            <th>Persentase</th>
                            <th>Id Objek</th>
                            <th>Nama Objek</th>
                            <th>Id Kelut.</th>
                            <th>Nama Kelut.</th>
                            <th>Id Kelompok</th>
                            <th>Kelompok</th>
                            <th>Id Subkel.</th>
                            <th>Subkel.</th>
                            <th>Kode Barang</th>
                            <th>Cadangan</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>

                <div class="row mt-3">
                    <div class="col-md-7 form-group">
                        <label for="select_objek">Objek:</label>
                        <select id="select_objek" class="form-select" disabled>
                            <option selected disabled>-- Pilih Objek --</option>
                        </select>
                    </div>

                    <div class="col-md-4 form-group">
                        <label for="objek">Primer:</label>
                        <div class="input-group">
                            <input type="number" min="0" id="primer" class="form-control" placeholder="0"
                                disabled>
                            <input type="text" id="sat_primer" class="form-control" disabled>
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-md-7 form-group">
                        <label for="select_kelompok_utama">Kelompok Utama:</label>
                        <select id="select_kelompok_utama" class="form-select" disabled>
                            <option selected disabled>-- Pilih Kelompok Utama --</option>
                        </select>
                    </div>

                    <div class="col-md-4 form-group">
                        <label for="objek">Sekunder:</label>
                        <div class="input-group">
                            <input type="number" min="0" id="sekunder" class="form-control" placeholder="0"
                                disabled>
                            <input type="text" id="sat_sekunder" class="form-control" disabled>
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-md-7 form-group">
                        <label for="select_kelompok">Kelompok:</label>
                        <select id="select_kelompok" class="form-select" disabled>
                            <option selected disabled>-- Pilih Kelompok --</option>
                            <option value="loading" style="display: none" disabled>Loading...</option>
                            <option value="temp">haloDunia</option>
                        </select>
                    </div>

                    <div class="col-md-4 form-group">
                        <label for="objek">Tritier:</label>
                        <div class="input-group">
                            <input type="number" min="0" id="tritier" class="form-control" placeholder="0"
                                disabled>
                            <input type="text" id="sat_tritier" class="form-control" disabled>
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-md-7 form-group">
                        <label for="select_sub_kelompok">Sub-kelompok:</label>
                        <select id="select_sub_kelompok" class="form-select" disabled>
                            <option selected disabled>-- Pilih Sub-kelompok --</option>
                        </select>
                    </div>

                    <div class="col-md-2 form-group">
                        <label for="objek">Persentase:</label>
                        <div class="input-group">
                            <input type="number" id="persentase" min="0" class="form-control" placeholder="0"
                                disabled>
                            <span class="input-group-text">%</span>
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-md-7 form-group">
                        <label for="select_type">Type:</label>
                        <select id="select_type" class="form-select" disabled>
                            <option selected disabled>-- Pilih Type --</option>
                        </select>
                    </div>

                    <div class="col-md-4 form-group">
                        <label for="objek">Kode Barang:</label>
                        <input type="text" id="kode_barang" class="form-control" disabled>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-md-3" style="padding-left: 25px;">
                        BB: Bahan Baku<br>
                        BP: Bahan Pembantu
                    </div>

                    <div class="col-md-3" style="padding-left: 25px;">
                        HP: Hasil Produksi<br>
                        AF: Afalan
                    </div>

                    <div class="col-md-1"></div>

                    <div class="col-md-2 form-group">
                        <label for="objek">Cadangan:</label>
                        <div class="input-group">
                            <input type="text" id="cadangan" class="form-control" value="0" disabled>
                        </div>
                    </div>
                </div>

                <div class="row mt-4">
                    <div class="col-md-12 d-flex justify-content-center">
                        <button type="button" id="btn_cadangan_detail" class="btn btn-info" style="margin-right: 2em;"
                            disabled>Tambah
                            Cadangan</button>
                        <button type="button" id="btn_tambah_detail" class="btn btn-success" style="margin-right: 2em;"
                            disabled>Tambah
                            Bahan</button>
                        <button type="button" id="btn_koreksi_detail" class="btn btn-warning"
                            style="margin-right: 2em;" disabled>Koreksi</button>
                        <button type="button" id="btn_hapus_detail" class="btn btn-danger" disabled>Hapus</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-md-6 text-center">
                <button type="button" id="btn_baru_master" class="btn btn-success">Komposisi Baru</button>
                <button type="button" id="btn_koreksi_master" class="btn btn-warning">Koreksi</button>
                <button type="button" id="btn_hapus_master" class="btn btn-danger">Hapus</button>
            </div>

            <div class="col-md-1">
                <input type="number" min="0" id="persentase2" class="form-control hidden" placeholder="0">
            </div>

            <div class="col-md-1">
                <input type="number" min="0" id="cadangan2" class="form-control hidden" placeholder="0">
            </div>

            <div class="col-md-4 text-center">
                <button type="button" id="btn_proses" class="btn btn-primary" disabled>Proses</button>
                <button type="button" id="btn_keluar" class="btn btn-secondary">Keluar</button>
            </div>
        </div>
    </div>

    <script src="{{ asset('js/Extruder/ExtruderNet/komposisiMojosari.js') }}"></script>
@endsection
