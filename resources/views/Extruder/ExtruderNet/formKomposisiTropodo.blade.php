@extends('layouts.appExtruder')

@section('title')
    Komposisi Bahan Tropodo
@endsection

@section('content')
    <style>
        #table_komposisi {
            font-size: 12px;
        }

        .sorting {
            font-size: 12px;
        }
    </style>

    <div id="komposisi_tropodo" class="form" data-aos="fade-up">
        <div class="row mt-3">
            <div class="col-md-3">
                <span class="aligned-text">Id Komposisi:</span>
            </div>
            <div class="col-md-6 form-group">
                <select class="form-select" id="select_id_komposisi" disabled>
                    <option selected disabled>-- Pilih Id Komposisi --</option>
                    @foreach ($formData['listKomposisi'] as $d)
                        <option value="{{ $d->IdKomposisi }}">{{ $d->IdKomposisi . ' | ' . $d->NamaKomposisi }}</option>
                    @endforeach
                </select>
                <input type="text" id="nama_komposisi" class="form-control hidden"
                    placeholder="Masukkan nama komposisi disini...">
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-md-3">
                <span class="aligned-text">Mesin:</span>
            </div>
            <div class="col-md-6 form-group">
                <select class="form-select" id="select_mesin" disabled>
                    <option selected disabled>-- Pilih Mesin --</option>
                    @foreach ($formData['listMesin'] as $d)
                        <option value="{{ $d->IdMesin }}">{{ $d->IdMesin . ' | ' . $d->TypeMesin }}</option>
                    @endforeach
                </select>
            </div>
        </div>

        <div class="card mt-5">
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
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>

                <div class="row mt-3">
                    <div class="col-md-7 form-group">
                        <label for="select_objek">Objek:</label>
                        <select id="select_objek" class="form-select" disabled>
                            <option selected disabled>-- Pilih Objek --</option>
                            @foreach ($formData['listObjek'] as $d)
                                <option value="{{ $d->IdObjek }}">{{ $d->NamaObjek }}
                                </option>
                            @endforeach
                        </select>
                    </div>

                    <div class="col-md-4 form-group">
                        <label for="objek">Primer:</label>
                        <div class="input-group">
                            <input type="number" id="primer" class="form-control" placeholder="0" disabled>
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
                            <input type="number" id="sekunder" class="form-control" placeholder="0" disabled>
                            <input type="text" id="sat_sekunder" class="form-control" disabled>
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-md-7 form-group">
                        <label for="select_kelompok">Kelompok:</label>
                        <select id="select_kelompok" class="form-select" disabled>
                            <option selected disabled>-- Pilih Kelompok --</option>
                        </select>
                    </div>

                    <div class="col-md-4 form-group">
                        <label for="objek">Tritier:</label>
                        <div class="input-group">
                            <input type="number" id="tritier" class="form-control" placeholder="0" disabled>
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
                        <label for="objek">Presentase:</label>
                        <div class="input-group">
                            <input type="number" id="persentase" class="form-control" placeholder="0" disabled>
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
                </div>

                <div class="row mt-3">
                    <div class="col-md-6">
                        <div class="row mt-2">
                            <div class="col-md-6" style="padding-left: 50px">BB: Bahan Baku</div>
                            <div class="col-md-6">HP: Hasil Produksi</div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-md-6" style="padding-left: 50px">BP: Bahan Pembantu</div>
                            <div class="col-md-6">AF: Afalan</div>
                        </div>
                    </div>

                    <div class="col-md-1"></div>

                    <div class="col-md-5 text-center">
                        <button type="button" id="btn_tambah_detail" class="btn btn-success" disabled>Tambah
                            Bahan</button>
                        <button type="button" id="btn_koreksi_detail" class="btn btn-warning" disabled>Koreksi</button>
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
            <div class="col-md-2"></div>
            <div class="col-md-4 text-center">
                <button type="button" id="btn_proses" class="btn btn-primary" disabled>Proses</button>
                <button type="button" id="btn_keluar" class="btn btn-secondary">Keluar</button>
            </div>
        </div>
    </div>

    <script src="{{ asset('js/Extruder/ExtruderNet/komposisiTropodo.js') }}"></script>
@endsection
