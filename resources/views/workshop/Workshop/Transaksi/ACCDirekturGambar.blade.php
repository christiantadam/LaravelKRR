@extends('layouts.appWorkshop')
@section('content')
@section('title', 'ACC Direktur Gambar')
<style>
    #tableDirektur td {
        padding: 1px;
        white-space: nowrap;
        text-align-last: center;
    }
</style>
<link href="{{ asset('css/Workshop/Transaksi/ACCDirekturGambar.css') }}" rel="stylesheet">
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
                    ACC Direktur -- Order Gambar
                </div>

                <div class="card-body">
                    {{-- <img src="{{ asset('images/Workshop.png') }}" alt="logo" class="workshop-logo"> --}}
                    <form id="formAccDirektur" action="{{ url('ACCDirekturGambar') }}" method="post">
                        {{ csrf_field() }}
                        <input type="hidden" name="_method" id="methodForm">
                        <div class="row">
                            <div class="col-7 row">
                                <div class="col-lg-2">
                                    <span class="custom-alignment" style="white-space: nowrap">Tgl. Order:</span>
                                </div>

                                <div class="col-lg-8">
                                    <div class="row">
                                        <div class="col-lg-5">
                                            <input type="Date" class="form-control" name="tgl_awal" id="tgl_awal">
                                        </div>
                                        <div class="col-lg-2 d-flex justify-content-center">
                                            <span style="margin-top: 5px;">s/d</span>
                                        </div>
                                        <div class="col-lg-5">
                                            <input type="Date" class="form-control" name="tgl_akhir" id="tgl_akhir">
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-2">
                                    <button type="button" class="btn btn-primary"
                                        id="ok"><b><u>O</u>K</b></button>
                                </div>

                            </div>

                            <div class="col-lg-5 row d-flex justify-content-center mt-1">

                                <div class="col-lg-3 content-center">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="radio-acc-Direktur-gambar"
                                            id="acc" checked>
                                        <label class="form-check-label" for="radio-acc-Direktur-gambar">
                                            ACC
                                        </label>
                                    </div>
                                </div>

                                <div class="col-lg-4 content-center">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="radio-acc-Direktur-gambar"
                                            id="batal_acc">
                                        <label class="form-check-label" for="radio-acc-Direktur-gambar">
                                            Batal ACC
                                        </label>
                                    </div>
                                </div>

                                <div class="col-lg-4 content-center">
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="radio-acc-Direktur-gambar"
                                            id="tdk_setuju">
                                        <label class="form-check-label" for="radio-acc-Direktur-gambar">
                                            Tdk disetujui
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="table-responsive" style="margin-top: 36px;">
                            <table class="table mt-3" style="width: max-content" id="tableDirektur">
                                <thead class="table-dark" style="white-space: nowrap">
                                    <tr>
                                        <th>No. Order</th>
                                        <th>Tgl. Order</th>
                                        <th>Nama Barang</th>
                                        <th>Kd. Barang</th>
                                        <th>Jumlah</th>
                                        <th>Status Order</th>
                                        <th>Divisi</th>
                                        <th>Mesin</th>
                                        <th>Keterangan Order</th>
                                        <th>Peng-order</th>
                                        <th>Ket. Ditolak</th>
                                        <th>Ket. tdk disetujui</th>
                                    </tr>
                                </thead>
                                <tbody> </tbody>
                            </table>
                        </div>

                        <div class="row mt-3">
                            <div class="col-lg-6">
                                <div class="keterangan keterangan-padding">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <span style="color: red;">xxxxx -></span>
                                            <span>Sudah di-ACC</span><br>

                                            <span style="color: green;">xxxxx -></span>
                                            <span>Ditolak Div. Teknik</span><br>
                                        </div>

                                        <div class="col-lg-6">
                                            <span style="color: grey;">xxxxx -></span>
                                            <span>Tdk disetujui Direktur</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-6 mt-3">
                                <div class="float-start">
                                    <button type="button" class="btn btn-light custom-btn"
                                        id="refresh">Refresh</button>
                                    <button type="button" class="btn btn-info custom-btn" id="pilihsemua">Pilih
                                        Semua</button>
                                </div>

                                <div class="float-end">
                                    <input type="hidden" name="semuacentang" id="semuacentang">
                                    <input type="hidden" name="radiobox" id="radiobox">
                                    <input type="hidden" name="KetTdkS" id="KetTdkS">
                                    <input type="hidden" name="idorder" id="idorder">
                                    <button type="button" class="btn btn-primary custom-btn" style="width: 10em;"
                                        onclick="klikproses()"><b><u>P</u>ROSES</b></button>
                                    {{-- <button type="button" class="btn btn-secondary"><u>K</u>ELUAR</button> --}}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="{{ asset('js/Andre-WorkShop/Workshop/Transaksi/ACCDirekturOrderGambar.js') }}"></script>
@endsection
