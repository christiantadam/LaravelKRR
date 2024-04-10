@extends('layouts.appWorkshop')
@section('content')
@section('title', 'Penerima Order Gambar')
<style>
    #tablepenerimagambar td {
        padding: 1px;
        white-space: nowrap;
        text-align-last: center;
    }
</style>
<link href="{{ asset('css/Workshop/Transaksi/PenerimaGambar.css') }}" rel="stylesheet">
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
                    Penerima Order Gambar
                </div>

                <div class="card-body">
                    <form action="{{ url('PenerimaOrderGambar') }}" method="post" id="formPemerimaGambar">
                        {{ csrf_field() }}
                        <input type="hidden" name="_method" id="methodForm">
                        <img src="{{ asset('images/Workshop.png') }}" alt="logo" class="workshop-logo">

                        <div class="row">
                            <div class="col-lg-6 row">
                                <div class="col-lg-4  ">
                                    <span class="custom-alignment">Tgl. ACC Direktur:</span>
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
                            </div>
                            <div class="col-lg-6">

                                <div class="row d-flex justify-content-center">
                                    <div class="col-lg-4 content-center">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="radio-terima-gambar"
                                                id="acc_order">
                                            <label class="form-check-label" for="radio-terima-gambar">
                                                ACC Order
                                            </label>
                                        </div>
                                    </div>

                                    <div class="col-lg-4 content-center">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="radio-terima-gambar"
                                                id="batal_acc">
                                            <label class="form-check-label" for="radio-terima-gambar">
                                                Batal ACC
                                            </label>
                                        </div>
                                    </div>

                                    <div class="col-lg-4 content-center">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="radio-terima-gambar"
                                                id="order_tolak">
                                            <label class="form-check-label" for="radio-terima-gambar">
                                                Order Ditolak
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div class="row d-flex justify-content-center mt-1">
                                    <div class="col-lg-4 content-center">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="radio-terima-gambar"
                                                id="order_kerja">
                                            <label class="form-check-label" for="radio-terima-gambar">
                                                Order Dikerjakan
                                            </label>
                                        </div>
                                    </div>


                                    <div class="col-lg-4 content-center">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="radio-terima-gambar"
                                                id="order_selesai">
                                            <label class="form-check-label" for="radio-terima-gambar">
                                                Order Selesai
                                            </label>
                                        </div>
                                    </div>

                                    <div class="col-lg-4 content-center">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="radio-terima-gambar"
                                                id="order_batal">
                                            <label class="form-check-label" for="radio-terima-gambar">
                                                Order Dibatalkan
                                            </label>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div class="table-responsive">
                            <table class="table mt-3" style="width: max-content" id="tablepenerimagambar">
                                <thead class="table-dark" style="white-space: nowrap">
                                    <tr>
                                        <th>No. Order</th>
                                        <th>Tgl. Order</th>
                                        <th>Tgl. ACC Direktur</th>
                                        <th>Nama Barang</th>
                                        <th>NoGbrRev</th>
                                        <th>Jumlah</th>
                                        <th>Status Order</th>
                                        <th>Divisi</th>
                                        <th>Mesin</th>
                                        <th>Keterangan Order</th>
                                        <th>Peng-order</th>
                                        <th>UserOd</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>

                        <div class="row mt-3">
                            <div class="col-lg-6">
                                <div class="keterangan keterangan-padding">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <span style="color: red;">xxxxx -></span>
                                            <span>Sudah diterima</span><br>
                                            <span style="color: blue;">xxxxx -></span>
                                            <span>Sedang dikerjakan</span><br>
                                        </div>

                                        <div class="col-lg-6">
                                            <span>xxxxx -> Belum Diterima</span><br>
                                            <span style="color: green;">xxxxx -></span>
                                            <span>Ditolak</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-6 mt-3">
                                <div class="float-start">
                                    <button type="button" class="btn btn-light custom-btn"
                                        id="refresh">Refresh</button>
                                    <button type="button" class="btn btn-primary custom-btn" id="pilihsemua">Pilih
                                        Semua</button>
                                </div>

                                <div class="float-end">
                                    <input type="hidden" name="semuacentang" id="semuacentang">
                                    <input type="hidden" name="radiobox" id="radiobox">
                                    <input type="hidden" name="KetTdkS" id="KetTdkS">
                                    <input type="hidden" name="iduser" id="iduser">
                                    <input type="hidden" name="ketbatal" id="ketbatal">
                                    <input type="hidden" name="no_order" id="no_order">
                                    <button type="button" class="btn btn-primary" style="width: 7.5em;"
                                        onclick="klikproses()" disabled id="btnproses"><b>PROSES</b></button>
                                    <button type="button" class="btn btn-warning" id="btnkoreksi"
                                        onclick="koreksiklik()" disabled>KOREKSI</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade koreksi-modal-lg" id="modalkoreksi" tabindex="-1" role="dialog"
    aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content" style="width: 174vh;margin-left: -22vh;">
            <div class="modal-header">
                <div class="col-7" style="text-align-last:right;">
                    <h3 cl ass="modal-title" id="exampleModalLabel" style="font-weight:bold">Workshop</h3>
                </div>
                <div class="col-5">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-6">
                        <form id="ModalProsesPembeliGambar" method="POST">
                            {{ csrf_field() }}
                            <input type="hidden" name="_method" id="methodFormProses">

                            <div class="row mt-3">
                                <div class="col-5">
                                    <span class="custom-alignment">Tanggal Order:</span>
                                </div>

                                <div class="col-7">
                                    <div class="row">
                                        <div class="col">
                                            <input type="text" name="tglOrder" class="form-control"
                                                id="tglOrder">
                                        </div>
                                        <div class="col">
                                            <b>
                                                <span id="lblstatus" style="color: pink"></span>
                                            </b>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-lg-5">
                                    <span class="custom-alignment">No. Order:</span>
                                </div>

                                <div class="col-lg-7">
                                    <input type="text" name="noOrder" class="form-control" id="noOrder">
                                </div>
                            </div>
                            <div class="row" style="margin-left: 12.5vh;margin-top: 3vh;">
                                <div class="col">
                                    <div class="row">
                                        <div class="col-6"> <!-- Updated class: col-lg-4 -->
                                            <span class="custom-alignment">Kd. Barang</span>
                                        </div>

                                        <div class="col-6"> <!-- Updated class: col-lg-8 -->
                                            <input type="text" name="KodeBarang" class="form-control"
                                                id="KodeBarang" style="margin-left: 21px;width:93px">
                                        </div>
                                    </div>
                                </div>

                                <div class="col">
                                    <div class="row">
                                        <div class="col-6"> <!-- Updated class: col-lg-4 -->
                                            <span class="custom-alignment">No. Gambar</span>
                                        </div>

                                        <div class="col-6"> <!-- Updated class: col-lg-8 -->
                                            <input type="text" name="noGambar" class="form-control"
                                                id="noGambar">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-lg-5">
                                    <span class="custom-alignment">Divisi</span>
                                </div>

                                <div class="col-lg-7">
                                    <input type="text" name="Divisimodal" class="form-control" id="Divisimodal">
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-lg-5">
                                    <span class="custom-alignment">Nama Barang</span>
                                </div>

                                <div class="col-lg-7">
                                    <input type="text" name="NamaBarangModal" class="form-control"
                                        id="NamaBarangModal">
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-lg-5">
                                    <span class="custom-alignment">Keterangan Order</span>
                                </div>

                                <div class="col-lg-7">
                                    <input type="text" name="acc_manager" class="form-control"
                                        id="KeteranganModal">
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-lg-5">
                                    <span class="custom-alignment">Jumlah</span>
                                </div>

                                <div class="col-lg-7">
                                    <input type="text" name="JumlahModal" class="form-control" id="JumlahModal">
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-lg-5">
                                    <span class="custom-alignment">Drafter</span>
                                </div>

                                <div class="col-lg-7">
                                    <select class="form-select" name="DrafterModal"
                                        style="width: 36vh; height: 6.6vh;" id="DrafterModal">
                                        <option disabled selected>Pilih Drafter</option>
                                        @foreach ($drafter as $d)
                                            <option value="{{ $d->IdUser }}">{{ $d->NamaPembuat }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-lg-5">
                                    <span class="custom-alignment">Tgl. Start</span>
                                </div>

                                <div class="col-lg-7">
                                    <input type="date" name="tgl_start" class="form-control" id="tgl_start">
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-lg-5">
                                    <span class="custom-alignment">Tgl. Finish</span>
                                </div>

                                <div class="col-lg-7">
                                    <input type="date" name="tgl_finish" class="form-control" id="tgl_finish"
                                        disabled>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-lg-5">
                                    <span class="custom-alignment">Operator</span>
                                </div>

                                <div class="col-lg-7">
                                    <div class="row">
                                        <div class="col">
                                            <input type="text" name="IdUser" class="form-control" id="IdUser"
                                                disabled>
                                        </div>
                                        <div class="col">
                                            <input type="text" name="NamaUser" class="form-control"
                                                id="NamaUser" disabled>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <input type="hidden" name="Tsts" id="Tsts">
                                <input type="hidden" name="TuserOd" id="TuserOd">
                                <input type="hidden" name="arraynomorgambar" id="arraynomorgambar">
                                <input type="hidden" name="arraynamagambar" id="arraynamagambar">
                                <input type="hidden" name="arraytglapprove" id="arraytglapprove">
                                <button type="button" class="btn btn-primary" style="float: right;margin-top:10px"
                                    onclick="prosesmodalklik()">Proses</button>
                            </div>
                        </form>
                    </div>
                    <div class="col-6">
                        <p>Detail Gambar</p>
                        <div class="row mt-3">
                            <div class="col-lg-5">
                                <span class="custom-alignment">No. Gambar</span>
                            </div>

                            <div class="col-lg-7">
                                <input type="text" name="NoGambarModal" class="form-control" id="NoGambarModal"
                                    disabled>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-lg-5">
                                <span class="custom-alignment">Nama Gambar</span>
                            </div>

                            <div class="col-lg-7">
                                <input type="text" name="NamaGambarModal" class="form-control"
                                    id="NamaGambarModal" disabled>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-lg-5">
                                <span class="custom-alignment">Approve</span>
                            </div>

                            <div class="col-lg-7">
                                <input type="date" name="Approvemodal" class="form-control" id="Approvemodal"
                                    disabled>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-9" style="text-align-last: right;">
                                <button type="button" class="btn btn-outline-success" onclick="klikplus()"
                                    id="btnplus" disabled>+</button>
                            </div>
                            <div class="col-3">
                                <button type="button" class="btn btn-outline-danger" onclick="klikmin()"
                                    id="btnmin" disabled>-</button>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="table-responsive" style="text-align: -webkit-center;">
                                <table class="table mt-3" id="tableModal">
                                    <thead class="table-dark">
                                        <tr>
                                            <th>No. Gambar</th>
                                            <th>Nama Barang</th>
                                            <th>Approve</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <div>
                            <button type="button" class="btn btn-danger"
                                data-dismiss="modal"style="float: right">Batal</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('js/Andre-WorkShop/Workshop/Transaksi/PenerimaOrderGambar.js') }}"></script>
@endsection
