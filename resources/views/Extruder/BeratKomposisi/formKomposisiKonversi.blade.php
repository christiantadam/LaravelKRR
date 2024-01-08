@extends('layouts.appExtruder')

@section('title')
    Komposisi Konversi
@endsection

@section('content')
    <div id="komposisi_konversi" class="form" data-aos="fade-up">

        <div class="row mt-3">
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text">Kode Barang:</span>
            </div>
            <div class="form-group col-md-3 mt-3 mt-md-0">
                <input type="text" class="form-control" id="kode_barang">
            </div>

            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text">Berat Standar:</span>
            </div>
            <div class="form-group col-md-4 mt-3 mt-md-0">
                <div class="input-group">
                    <input type="number" class="form-control" id="berat_standar">
                    <span class="input-group-text">Gram</span>
                </div>
            </div>
        </div>

        <div class="row mt-3">
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text">Type:</span>
            </div>
            <div class="form-group col-md-10 mt-3 mt-md-0">
                <textarea class="form-control" id="txt_type" rows="3"></textarea>
            </div>
        </div>

        <div class="row mt-3">
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text">PP:</span>
            </div>
            <div class="form-group col-md-3 mt-3 mt-md-0">
                <div class="input-group">
                    <input type="number" min="0" class="form-control txt txt_gram" id="pp_gram">
                    <span class="input-group-text">Gram</span>
                </div>
            </div>
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text"></span>
            </div>
            <div class="form-group col-md-3 mt-3 mt-md-0">
                <div class="input-group">
                    <input type="number" min="0" class="form-control txt_persen" id="pp_persen">
                    <span class="input-group-text lbl_persen">%</span>
                </div>
            </div>
        </div>

        <div class="row mt-3">
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text">PE:</span>
            </div>
            <div class="form-group col-md-3 mt-3 mt-md-0">
                <div class="input-group">
                    <input type="number" min="0" class="form-control txt_gram" id="pe_gram">
                    <span class="input-group-text">Gram</span>
                </div>
            </div>
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text"></span>
            </div>
            <div class="form-group col-md-3 mt-3 mt-md-0">
                <div class="input-group">
                    <input type="number" min="0" class="form-control txt_persen" id="pe_persen">
                    <span class="input-group-text lbl_persen">%</span>
                </div>
            </div>
        </div>

        <div class="row mt-3">
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text">CaCO3:</span>
            </div>
            <div class="form-group col-md-3 mt-3 mt-md-0">
                <div class="input-group">
                    <input type="number" min="0" class="form-control txt_gram" id="caco3_gram">
                    <span class="input-group-text">Gram</span>
                </div>
            </div>
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text"></span>
            </div>
            <div class="form-group col-md-3 mt-3 mt-md-0">
                <div class="input-group">
                    <input type="number" min="0" class="form-control txt_persen" id="caco3_persen">
                    <span class="input-group-text lbl_persen">%</span>
                </div>
            </div>
        </div>

        <div class="row mt-3">
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text">Masterbatch:</span>
            </div>
            <div class="form-group col-md-3 mt-3 mt-md-0">
                <div class="input-group">
                    <input type="number" min="0" class="form-control txt_gram" id="masterbatch_gram">
                    <span class="input-group-text">Gram</span>
                </div>
            </div>
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text"></span>
            </div>
            <div class="form-group col-md-3 mt-3 mt-md-0">
                <div class="input-group">
                    <input type="number" min="0" class="form-control txt_persen" id="masterbatch_persen">
                    <span class="input-group-text lbl_persen">%</span>
                </div>
            </div>
        </div>

        <div class="row mt-3">
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text">UV:</span>
            </div>
            <div class="form-group col-md-3 mt-3 mt-md-0">
                <div class="input-group">
                    <input type="number" min="0" class="form-control txt_gram" id="UV_gram">
                    <span class="input-group-text">Gram</span>
                </div>
            </div>
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text"></span>
            </div>
            <div class="form-group col-md-3 mt-3 mt-md-0">
                <div class="input-group">
                    <input type="number" min="0" class="form-control txt_persen" id="UV_persen">
                    <span class="input-group-text lbl_persen">%</span>
                </div>
            </div>
        </div>

        <div class="row mt-3">
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text">Anti Static:</span>
            </div>
            <div class="form-group col-md-3 mt-3 mt-md-0">
                <div class="input-group">
                    <input type="number" min="0" class="form-control txt_gram" id="anti_static_gram">
                    <span class="input-group-text">Gram</span>
                </div>
            </div>
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text"></span>
            </div>
            <div class="form-group col-md-3 mt-3 mt-md-0">
                <div class="input-group">
                    <input type="number" min="0" class="form-control txt_persen" id="anti_static_persen">
                    <span class="input-group-text lbl_persen">%</span>
                </div>
            </div>
        </div>

        <div class="row mt-3">
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text">Conductive / Kertas:</span>
            </div>
            <div class="form-group col-md-3 mt-3 mt-md-0">
                <div class="input-group">
                    <input type="number" min="0" class="form-control txt_gram" id="kertas_gram">
                    <span class="input-group-text">Gram</span>
                </div>
            </div>
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text"></span>
            </div>
            <div class="form-group col-md-3 mt-3 mt-md-0">
                <div class="input-group">
                    <input type="number" min="0" class="form-control txt_persen" id="kertas_persen">
                    <span class="input-group-text lbl_persen">%</span>
                </div>
            </div>
        </div>

        <div class="row mt-3">
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text">LDPE:</span>
            </div>
            <div class="form-group col-md-3 mt-3 mt-md-0">
                <div class="input-group">
                    <input type="number" min="0" class="form-control txt_gram" id="ldpe_gram">
                    <span class="input-group-text">Gram</span>
                </div>
            </div>
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text"></span>
            </div>
            <div class="form-group col-md-3 mt-3 mt-md-0">
                <div class="input-group">
                    <input type="number" min="0" class="form-control txt_persen" id="ldpe_persen">
                    <span class="input-group-text lbl_persen">%</span>
                </div>
            </div>
        </div>

        <div class="row mt-3">
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text">LLDPE:</span>
            </div>
            <div class="form-group col-md-3 mt-3 mt-md-0">
                <div class="input-group">
                    <input type="number" min="0" class="form-control txt_gram" id="lldpe_gram">
                    <span class="input-group-text">Gram</span>
                </div>
            </div>
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text"></span>
            </div>
            <div class="form-group col-md-3 mt-3 mt-md-0">
                <div class="input-group">
                    <input type="number" min="0" class="form-control txt_persen" id="lldpe_persen">
                    <span class="input-group-text lbl_persen">%</span>
                </div>
            </div>
        </div>

        <div class="row mt-3">
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text">HDPE:</span>
            </div>
            <div class="form-group col-md-3 mt-3 mt-md-0">
                <div class="input-group">
                    <input type="number" min="0" class="form-control txt_gram" id="hdpe_gram">
                    <span class="input-group-text">Gram</span>
                </div>
            </div>
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text"></span>
            </div>
            <div class="form-group col-md-3 mt-3 mt-md-0">
                <div class="input-group">
                    <input type="number" min="0" class="form-control txt_persen" id="hdpe_persen">
                    <span class="input-group-text lbl_persen">%</span>
                </div>
            </div>
        </div>

        <div class="row mt-3">
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text">Total Komposisi:</span>
            </div>
            <div class="form-group col-md-3 mt-3 mt-md-0">
                <div class="input-group">
                    <input type="number" min="0" class="form-control" id="total_gram">
                    <span class="input-group-text">Gram</span>
                </div>
            </div>
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text">Jumlah:</span>
            </div>
            <div class="form-group col-md-3 mt-3 mt-md-0">
                <div class="input-group">
                    <input type="number" min="0" class="form-control" id="total_persen">
                    <span class="input-group-text lbl_persen">%</span>
                </div>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-9 row justify-content-md-center">
                <div class="text-center col-md-auto"><button type="button" id="btn_isi"
                        class="btn btn-outline-success">Isi</button></div>
                <div class="text-center col-md-auto"><button type="button" id="btn_batal"
                        class="btn btn-outline-danger">Batal</button></div>
                <div class="text-center col-md-auto"><button type="button" id="btn_proses"
                        class="btn btn-outline-primary">Proses</button></div>
            </div>

            <div class="text-center col-3"><button type="button" id="btn_keluar"
                    class="btn btn-outline-secondary">Keluar</button></div>
        </div>

    </div>

    <script src="{{ asset('js/Extruder/BeratKomposisi/komposisiKonversi.js') }}"></script>
@endsection
