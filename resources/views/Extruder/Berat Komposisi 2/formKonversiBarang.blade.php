@extends('layouts.appExtruder')

@section('title')
    Konversi Barang
@endsection

@section('content')
    <div id="konversi_barang" class="form" data-aos="fade-up">
        <div class="row mt-3">
            <div class="form-group col-md-4">
                <label for="kode_barang">Kode Barang:</label>
                <input type="text" class="form-control" id="kode_barang" disabled>
            </div>
            <div class="form-group col-md-2">
                <label for="berat_standar">Berat Standar:</label>
                <div class="input-group">
                    <input type="number" min="0" class="form-control" id="berat_standar" disabled>
                    <span class="input-group-text">Kg</span>
                </div>
            </div>
            <div class="form-group col-md-2">
                <span id="lbl_berat_standar" class="hidden">...</span>
            </div>
            <div class="form-group col-md-4">
                <label for="tanggal_input">Tanggal Input:</label>
                <input type="date" class="form-control" id="tanggal_input" disabled>
            </div>
        </div>

        <div class="row mt-3">
            <div class="form-group col-md-5">
                <label for="no_konversi">No Konversi:</label>
                <input type="text" class="form-control" id="no_konversi" disabled>
            </div>
            <div class="form-group col-md-3"></div>
            <div class="form-group col-md-4">
                <label for="tanggal_loading_bc">Tanggal Loading BC:</label>
                <input type="date" class="form-control" id="tanggal_loading_bc">
            </div>
        </div>

        <div class="row mt-3">
            <div class="form-group col-md-12">
                <label for="type">Type:</label>
                <textarea class="form-control" id="type_berat" rows="3" disabled></textarea>
            </div>
        </div>

        <div class="row mt-3">
            <div class="form-group col-md-5">
                <label for="jenis_barang">Jenis Barang:</label>
                <input type="text" class="form-control" id="jenis_barang" disabled>
            </div>
            <div class="form-group col-md-1"></div>
            <div class="form-group col-md-2">
                <label for="terkandung">Terkandung:</label>
                <div class="input-group">
                    <input type="number" min="0" class="form-control" id="terkandung" disabled>
                    <span class="input-group-text">%</span>
                </div>
            </div>
            <div class="form-group col-md-2">
                <label for="waste">Waste:</label>
                <div class="input-group">
                    <input type="number" min="0" class="form-control" id="waste" disabled>
                    <span class="input-group-text">%</span>
                </div>
            </div>

            <div class="form-group col-md-2">
                <label for="sub_kategori">No. Sub-kategori:</label>
                <input type="text" class="form-control" id="sub_kategori" disabled>
            </div>
        </div>

        <div class="row mt-5">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Komposisi Barang</h5>
                        <div class="row mt-3">
                            <div class="form-group col-md-4">
                                <label for="PP">PP:</label>
                                <div class="input-group">
                                    <input type="number" min="0" class="form-control txt_komposisi" id="PP_kg"
                                        disabled>
                                    <span class="input-group-text">Kg</span>
                                </div>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="PP_persen">Persen PP:</label>
                                <div class="input-group">
                                    <input type="number" min="0" class="form-control" id="PP_persen" disabled>
                                    <span class="input-group-text">%</span>
                                </div>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="koef_PP">Koef. PP:</label>
                                <div class="input-group">
                                    <input type="number" min="0" class="form-control" id="koef_PP" disabled>
                                    <span class="input-group-text">Kg</span>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="form-group col-md-4">
                                <label for="PE">PE:</label>
                                <div class="input-group">
                                    <input type="number" min="0" class="form-control txt_komposisi"
                                        id="PE_kg" disabled>
                                    <span class="input-group-text">Kg</span>
                                </div>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="PE_persen">Persen PE:</label>
                                <div class="input-group">
                                    <input type="number" min="0" class="form-control" id="PE_persen" disabled>
                                    <span class="input-group-text">%</span>
                                </div>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="koef_PE">Koef. PE:</label>
                                <div class="input-group">
                                    <input type="number" min="0" class="form-control" id="koef_PE" disabled>
                                    <span class="input-group-text">Kg</span>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="form-group col-md-4">
                                <label for="CaCO3">CaCO3:</label>
                                <div class="input-group">
                                    <input type="number" min="0" class="form-control txt_komposisi"
                                        id="CaCO3_kg" disabled>
                                    <span class="input-group-text">Kg</span>
                                </div>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="CaCO3_persen">Persen CaCO3:</label>
                                <div class="input-group">
                                    <input type="number" min="0" class="form-control" id="CaCO3_persen"
                                        disabled>
                                    <span class="input-group-text">%</span>
                                </div>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="koef_CaCO3">Koef. CaCO3:</label>
                                <div class="input-group">
                                    <input type="number" min="0" class="form-control" id="koef_CaCO3" disabled>
                                    <span class="input-group-text">Kg</span>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="form-group col-md-4">
                                <label for="Masterbatch">Masterbatch:</label>
                                <div class="input-group">
                                    <input type="number" min="0" class="form-control txt_komposisi"
                                        id="Masterbatch_kg" disabled>
                                    <span class="input-group-text">Kg</span>
                                </div>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="Masterbatch_persen">Persen Masterbatch:</label>
                                <div class="input-group">
                                    <input type="number" min="0" class="form-control" id="Masterbatch_persen"
                                        disabled>
                                    <span class="input-group-text">%</span>
                                </div>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="koef_Masterbatch">Koef. Masterbatch:</label>
                                <div class="input-group">
                                    <input type="number" min="0" class="form-control" id="koef_Masterbatch"
                                        disabled>
                                    <span class="input-group-text">Kg</span>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="form-group col-md-4">
                                <label for="UV">UV:</label>
                                <div class="input-group">
                                    <input type="number" min="0" class="form-control txt_komposisi"
                                        id="UV_kg" disabled>
                                    <span class="input-group-text">Kg</span>
                                </div>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="UV_persen">Persen UV:</label>
                                <div class="input-group">
                                    <input type="number" min="0" class="form-control" id="UV_persen" disabled>
                                    <span class="input-group-text">%</span>
                                </div>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="koef_UV">Koef. UV:</label>
                                <div class="input-group">
                                    <input type="number" min="0" class="form-control" id="koef_UV" disabled>
                                    <span class="input-group-text">Kg</span>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="form-group col-md-4">
                                <label for="Anti_Static">Anti Static:</label>
                                <div class="input-group">
                                    <input type="number" min="0" class="form-control txt_komposisi"
                                        id="Anti_Static_kg" disabled>
                                    <span class="input-group-text">Kg</span>
                                </div>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="Anti_Static_persen">Persen Anti Static:</label>
                                <div class="input-group">
                                    <input type="number" min="0" class="form-control" id="Anti_Static_persen"
                                        disabled>
                                    <span class="input-group-text">%</span>
                                </div>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="koef_Anti_Static">Koef. Anti Static:</label>
                                <div class="input-group">
                                    <input type="number" min="0" class="form-control" id="koef_Anti_Static"
                                        disabled>
                                    <span class="input-group-text">Kg</span>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="form-group col-md-4">
                                <label for="Conductive">Conductive / Kertas:</label>
                                <div class="input-group">
                                    <input type="number" min="0" class="form-control txt_komposisi"
                                        id="Conductive_kg" disabled>
                                    <span class="input-group-text">Kg</span>
                                </div>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="Conductive_persen">Persen Conductive / Kertas:</label>
                                <div class="input-group">
                                    <input type="number" min="0" class="form-control" id="Conductive_persen"
                                        disabled>
                                    <span class="input-group-text">%</span>
                                </div>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="koef_Conductive">Koef. Conductive / Kertas:</label>
                                <div class="input-group">
                                    <input type="number" min="0" class="form-control" id="koef_Conductive"
                                        disabled>
                                    <span class="input-group-text">Kg</span>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="form-group col-md-4">
                                <label for="pp">LDPE:</label>
                                <div class="input-group">
                                    <input type="number" min="0" class="form-control txt_komposisi"
                                        id="LDPE_kg" disabled>
                                    <span class="input-group-text">Kg</span>
                                </div>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="LDPE_persen">Persen LDPE:</label>
                                <div class="input-group">
                                    <input type="number" min="0" class="form-control" id="LDPE_persen" disabled>
                                    <span class="input-group-text">%</span>
                                </div>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="koef_LDPE">Koef. LDPE:</label>
                                <div class="input-group">
                                    <input type="number" min="0" class="form-control" id="koef_LDPE" disabled>
                                    <span class="input-group-text">Kg</span>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="form-group col-md-4">
                                <label for="LLDPE">LLDPE:</label>
                                <div class="input-group">
                                    <input type="number" min="0" class="form-control txt_komposisi"
                                        id="LLDPE_kg" disabled>
                                    <span class="input-group-text">Kg</span>
                                </div>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="LLDPE_persen">Persen LLDPE:</label>
                                <div class="input-group">
                                    <input type="number" min="0" class="form-control" id="LLDPE_persen"
                                        disabled>
                                    <span class="input-group-text">%</span>
                                </div>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="koef_LLDPE">Koef. LLDPE:</label>
                                <div class="input-group">
                                    <input type="number" min="0" class="form-control" id="koef_LLDPE" disabled>
                                    <span class="input-group-text">Kg</span>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="form-group col-md-4">
                                <label for="LLDPE">HDPE:</label>
                                <div class="input-group">
                                    <input type="number" min="0" class="form-control txt_komposisi"
                                        id="HDPE_kg" disabled>
                                    <span class="input-group-text">Kg</span>
                                </div>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="HDPE_persen">Persen HDPE:</label>
                                <div class="input-group">
                                    <input type="number" min="0" class="form-control" id="HDPE_persen" disabled>
                                    <span class="input-group-text">%</span>
                                </div>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="koef_HDPE">Koef. HDPE:</label>
                                <div class="input-group">
                                    <input type="number" min="0" class="form-control" id="koef_HDPE" disabled>
                                    <span class="input-group-text">Kg</span>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="form-group col-md-4">
                                <label for="Total">Total Komposisi:</label>
                                <div class="input-group">
                                    <input type="number" min="0" class="form-control" id="Total_kg" disabled>
                                    <span class="input-group-text">Kg</span>
                                </div>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="Total_persen">Jumlah:</label>
                                <div class="input-group">
                                    <input type="number" min="0" class="form-control" id="Total_persen"
                                        disabled>
                                    <span class="input-group-text">%</span>
                                </div>
                            </div>
                            <div class="form-group col-md-4">
                                <label for="koef_Total">Total Koefisien:</label>
                                <div class="input-group">
                                    <input type="number" min="0" class="form-control" id="koef_Total" disabled>
                                    <span class="input-group-text">Kg</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-3">
            <table id="table_konversi" class="hover cell-border">
                <thead>
                    <tr>
                        <th>Tanggal</th>
                        <th>No. Konversi</th>
                        <th>Berat Standar</th>
                        <th>Koef. PP</th>
                        <th>Koef. PE</th>
                        <th>Koef. CaCO3</th>
                        <th>Koef. MB</th>
                        <th>Koef. UV</th>
                        <th>Koef. AS</th>
                        <th>Koef. Cond.</th>
                        <th>Koef. LDPE</th>
                        <th>Koef. LLDPE</th>
                        <th>Koef. HDPE</th>
                        <th>Tgl. Loading</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>

        <div class="row mt-3">
            <div class="col" style="display: flex; justify-content: center;">
                <button type="button" id="btn_isi" class="btn btn-outline-success spacing-button">Isi</button>
                <button type="button" id="btn_koreksi" class="btn btn-outline-warning spacing-button">Koreksi</button>
                <button type="button" id="btn_hapus" class="btn btn-outline-danger spacing-button">Hapus</button>
                <button type="button" id="btn_tgl" class="btn btn-outline-info spacing-button seperate">Koreksi Tgl.
                    Loading</button>
                <button type="button" id="btn_proses" class="btn btn-outline-primary spacing-button">Proses</button>
                <button type="button" id="btn_print" class="btn btn-outline-dark spacing-button">Print</button>
                <button type="button" id="btn_keluar" class="btn btn-outline-secondary spacing-button">Keluar</button>
            </div>
        </div>

    </div>

    <script src="{{ asset('js/Extruder/BeratKomposisi/konversiBarang.js') }}"></script>
@endsection
