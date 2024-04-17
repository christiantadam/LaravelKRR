@extends('layouts.appWorkshop')
@section('content')
@section('title', 'ACC Manager Proyek')
<link href="{{ asset('css/Workshop/Transaksi/ACCManagerGambar.css') }}" rel="stylesheet">
@if (Session::has('success'))
    <div class="alert alert-success">
        {{ Session::get('success') }}
    </div>
@elseif (Session::has('error'))
    <div class="alert alert-danger">
        {{ Session::get('error') }}
    </div>
@endif
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">
                    ACC Manager -- Order Proyek
                </div>

                <div class="card-body">
                    <img src="{{ asset('images/Workshop.png') }}" alt="logo" class="workshop-logo">

                    <div class="row">
                        <div class="col-lg-6">

                            <div class="row">
                                <div class="col-lg-4">
                                    <span class="custom-alignment">Divisi:</span>
                                </div>

                                <div class="col-lg-8">
                                    <select class="form-select" name="KodeDivisi"
                                        style="width: 36vh;
                            height: 6vh;" id="kddivisi">
                                        <option disabled selected>Pilih Divisi</option>
                                        @foreach ($divisi as $d)
                                            <option value="{{ $d->IdDivisi }}">{{ $d->IdDivisi }} --
                                                {{ $d->NamaDivisi }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <div class="table-responsive" style="margin-top:5%">
                                <table class="table mt-3" style="width: max-content; " id="TableACCManagerProyek">
                                    <thead class="table-dark">
                                        <tr>
                                            <th>No.Order</th>
                                            <th>Tgl.Order</th>
                                            <th>Nama Proyek</th>
                                            <th>Status Order</th>
                                            <th>Mesin</th>
                                            <th>Tgl.tdk disetujui Manager</th>
                                            <th>Ket.tdk disetujui Manager</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                            </div>
                            <button type="button" class="btn btn-info" id="refresh">Refresh</button>
                            <button type="button" class="btn btn-light" id="pilihsemua">Pilih Semua</button>

                        </div>

                        <div class="col-lg-6">
                            <form method="post" id="formAccManagerProyek" action="{{ url('ACCManagerProyek') }}">
                                {{ csrf_field() }}
                                <input type="hidden" name="_method" id="methodForm">
                                <input type="hidden" name="radiobox" id="radiobox">
                                <input type="hidden" name="semuacentang" id="semuacentang">
                                <input type="hidden" name="KetTdkS" id="KetTdkS">
                                <input type="hidden" name="iduser" id="iduser">


                                <div class="row d-flex justify-content-center">
                                    <div class="col-lg-3 content-center">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio"
                                                name="radio-acc-manager-gambar" id="acc" checked>
                                            <label class="form-check-label" for="radio-acc-manager-gambar">
                                                ACC
                                            </label>
                                        </div>
                                    </div>

                                    <div class="col-lg-3 content-center">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio"
                                                name="radio-acc-manager-gambar" id="batal_acc">
                                            <label class="form-check-label" for="radio-acc-manager-gambar"
                                                style="white-space: nowrap">
                                                Batal ACC
                                            </label>
                                        </div>
                                    </div>

                                    <div class="col-lg-4 content-center">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio"
                                                name="radio-acc-manager-gambar" id="tdk_setuju">
                                            <label class="form-check-label" for="radio-acc-manager-gambar">
                                                Tdk disetujui
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <div class="col-lg-5">
                                        <span class="custom-alignment">User ACC:</span>
                                    </div>

                                    <div class="col-lg-3">
                                        <input type="text" name="UserACC" class="form-control"
                                            style="font-size: large; color: blue; font-weight: bold;" id="UserACC"
                                            value="{{ $user }}" disabled>
                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <div class="col-lg-5">
                                        <span class="custom-alignment">No. Order:</span>
                                    </div>

                                    <div class="col-lg-5">
                                        <input type="text" name="no_order" class="form-control" id="no_order">
                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <div class="col-lg-5">
                                        <span class="custom-alignment">Jumlah:</span>
                                    </div>

                                    <div class="col-lg-5">
                                        <div class="input-group">
                                            <input type="number" name="jmlh1" class="form-control"
                                                id="jmlh1">
                                            <input type="text" name="jmlh2" class="form-control"
                                                style="width: 7.5vw;" id="jmlh2">
                                        </div>
                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <div class="col-lg-5">
                                        <span class="custom-alignment">Keterangan Order:</span>
                                    </div>

                                    <div class="col-lg-7">
                                        <input type="text" name="keterangan_order" class="form-control"
                                            id="keterangan_order">
                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <div class="col-lg-5">
                                        <span class="custom-alignment">Peng-Order:</span>
                                    </div>

                                    <div class="col-lg-6">
                                        <input type="text" name="pengorder" class="form-control" id="pengorder">
                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <div class="col-lg-5">
                                        <span class="custom-alignment">ACC Direktur:</span>
                                    </div>

                                    <div class="col-lg-6">
                                        <input type="text" name="acc_direktur" class="form-control"
                                            id="acc_direktur">
                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <div class="col-lg-5">
                                        <span class="custom-alignment">Tgl. tdk disetujui Direktur:</span>
                                    </div>

                                    <div class="col-lg-6">
                                        <input type="date" name="tgl_direktur" class="form-control"
                                            id="tgl_direktur">
                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <div class="col-lg-5">
                                        <span class="custom-alignment">Ket. tdk disetujui Direktur:</span>
                                    </div>

                                    <div class="col-lg-6">
                                        <input type="text" name="ket_direktur" class="form-control"
                                            id="ket_direktur">
                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <div class="col-lg-5">
                                        <span class="custom-alignment">Tgl. Ditolak Div. Teknik:</span>
                                    </div>

                                    <div class="col-lg-6">
                                        <input type="date" name="tgl_teknik" class="form-control"
                                            id="tgl_teknik">
                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <div class="col-lg-5">
                                        <span class="custom-alignment">Ket. Ditolak Div. Teknik:</span>
                                    </div>

                                    <div class="col-lg-6">
                                        <input type="text" name="ket_teknik_tolak" class="form-control"
                                            id="ket_teknik_tolak">
                                    </div>
                                </div>

                                <div class="row mt-3">
                                    <div class="col-lg-5">
                                        <span class="custom-alignment">Ket. Ditunda Div. Teknik:</span>
                                    </div>

                                    <div class="col-lg-6">
                                        <input type="text" name="ket_teknik_tunda" class="form-control"
                                            id="ket_teknik_tunda">
                                    </div>
                                </div>

                                <div class="row mt-3 d-flex justify-content-center">
                                    <div class="col-lg-6 content-center">
                                        <button type="button" class="btn btn-primary" style="width: inherit;"
                                            onclick="klikproses()"><b>PROSES</b></button>
                                    </div>
                                </div>

                                <div class="keterangan keterangan-padding mt-3">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <span style="color: red;">xxxxx -></span>
                                            <span> : ACC Direktur</span><br>

                                            <span style="color: deeppink;">xxxxx -></span>
                                            <span> : Ditunda Div. Teknik</span><br>

                                            <span style="color: green;">xxxxx -></span>
                                            <span> : Ditolak Div. Teknik</span><br>
                                        </div>

                                        <div class="col-lg-6">
                                            <span style="color: blue;">xxxxx -></span>
                                            <span> : ACC Direktur</span><br>

                                            <span style="color: grey;">xxxxx -></span>
                                            <span> : Tdk disetujui Direktur</span>

                                            <span style="color: brown;">xxxxx -></span>
                                            <span> : Tdk disetujui Manager</span><br>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="{{ asset('js/Andre-WorkShop/Workshop/Proyek/ACCManagerProyek.js') }}"></script>
@endsection
