@extends('layouts.appExtruder')

@section('title')
    Terima JBN-JBK-JBJ-JBL
@endsection

@section('content')
    <div id="form_terima_krr2" class="form" data-aos="fade-up">
        <div class="row mt-3">
            <div class="col-lg-3">
                <span class="aligned-text">No. Surat Jalan:</span>
            </div>

            <div class="col-lg-3">
                <input type="text" name="surat_jalan" id="surat_jalan" class="form-control">
            </div>

            <div class="col-lg-5">
                <button type="button" id="btn_sj_jbk" class="btn btn-light" style="padding: 5px 30px">Open SJ JBK JBN JBJ
                    JBL</button>

                <button type="button" id="btn_sj_wvn" class="btn btn-light" style="padding: 5px 30px">Open SJ WVN
                    Nganjuk</button>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-lg-3">
                <span class="aligned-text"><b>SCAN BARCODE:</b></span>
            </div>

            <div class="col-lg-5">
                <input type="text" name="scan_bar" id="scan_bar" class="form-control">
            </div>
        </div>

        <div class="mt-4">
            <span id="site_lbl" style="font-size: large"><b>Daftar Terima</b></span>

            <table id="table_terima" class="hover cell-border">
                <thead>
                    <tr>
                        <th>Spesifikasi</th>
                        <th>Ball</th>
                        <th>Lembar</th>
                        <th>Kg</th>
                        <th>Validated</th>
                        <th>No. SP</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>

        <div class="row mt-3">
            <div class="col-lg-3" style="padding-left: 50px">
                <span>Jumlah item: </span><span id="jmlh_item"><b>0</b></span><br>
                <span>Tervalidasi: </span><span id="tervalidasi"><b>0</b></span>
            </div>

            <div class="col-lg-6"></div>

            <div class="col-lg-3">
                <button type="button" id="btn_proses" class="btn btn-success">Proses</button>
                <button type="button" id="btn_keluar" class="btn btn-secondary">Keluar</button>
            </div>
        </div>
    </div>

    @include('Extruder.WarehouseTerima.modalLihatTerimaData')
    <script src="{{ asset('js\Extruder\WarehouseTerima\terimaKrr2.js') }}"></script>
@endsection
