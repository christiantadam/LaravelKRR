@extends('layouts.appExtruder')

@section('title')
    Update Persen Toleransi BS
@endsection

@section('content')
    <div id="update_persen" class="form" data-aos="fade-up">

        <div class="row mt-3">
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text">Kode Barang:</span>
            </div>
            <div class="form-group col-md-6 mt-3 mt-md-0">
                <input type="text" class="form-control" id="kode_barang">
            </div>
        </div>

        <div class="row mt-3">
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text">Nama Barang:</span>
            </div>
            <div class="form-group col-md-10 mt-3 mt-md-0">
                <textarea class="form-control" id="nama_barang" rows="3"></textarea>
            </div>
        </div>

        <div class="row mt-3">
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text">Persen Atas:</span>
            </div>
            <div class="form-group col-md-6 mt-3 mt-md-0">
                <input type="number" class="form-control" id="persen_atas" placeholder="5">
            </div>
            <div class="form-group col-md-4 d-flex">
                <span class="aligned-text" style="color: red;"><i>Persen atas harus positif</i></span>
            </div>
        </div>

        <div class="row mt-3">
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text">Persen Bawah:</span>
            </div>
            <div class="form-group col-md-6 mt-3 mt-md-0">
                <input type="number" class="form-control" id="persen_bawah" placeholder="-5">
            </div>
            <div class="form-group col-md-4 d-flex">
                <span class="aligned-text" style="color: red;"><i>Persen bawah harus negatif</i></span>
            </div>
        </div>

        <div class="row mt-3">
            <div class="form-group col-md-2 d-flex justify-content-end">
                <span class="aligned-text">Alasan:</span>
            </div>
            <div class="form-group col-md-10 mt-3 mt-md-0">
                <textarea class="form-control" id="alasan" rows="3"></textarea>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-9 row justify-content-md-center">
                <div class="text-center col-md-auto"><button type="button" id="btn_koreksi"
                        class="btn btn-outline-warning">Koreksi</button></div>
                <div class="text-center col-md-auto"><button type="button" id="btn_batal"
                        class="btn btn-outline-danger">Batal</button></div>
                <div class="text-center col-md-auto"><button type="button" id="btn_proses"
                        class="btn btn-outline-success">Proses</button></div>
            </div>

            <div class="text-center col-3"><button type="button" id="btn_keluar"
                    class="btn btn-outline-secondary">Keluar</button></div>
        </div>

    </div>

    <script src="{{ asset('js/Extruder/BeratKomposisi/updatePersen.js') }}"></script>
@endsection
