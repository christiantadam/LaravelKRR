@extends('layouts.appWorkshop')
@section('content')
@section('title', 'Maintenance Nomor Gambar')

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
                    Maintenance Kode Barang
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-12">
                            <img src="{{ asset('images/Workshop.png') }}" alt="logo" class="workshop-logo">
                        </div>
                    </div>
                    <div class="card mt-3">
                        <div class="card-body">
                            <div class="row mt-1">
                                <div class="col-lg-2">
                                    <span class="custom-alignment">Tanggal Order:</span>
                                </div>
                                <div class="col-lg-3">
                                    <input type="date" name="tgl" class="form-control" id="tglorder" disabled>
                                </div>
                                <div class="col-lg-3" style="text-align: -webkit-right;">
                                    <span id="lblstatus"></span>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-lg-2">
                                    <span class="custom-alignment">No. Order:</span>
                                </div>
                                <div class="col-lg-3">
                                    <input type="text" name="no_order" class="form-control" id="NoOrder" disabled>
                                </div>
                                <div class="col-lg-2">
                                    <span class="custom-alignment">No. Gambar:</span>
                                </div>
                                <div class="col-lg-3">
                                    <select class="form-select" name="noGambar" style="width: 36vh; height: 6.6vh;"
                                        id="noGambar" disabled>
                                    </select>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-lg-2">
                                    <span class="custom-alignment">Divisi:</span>
                                </div>
                                <div class="col-lg-8">
                                    <input type="text" name="divisi" class="form-control" id="divisi" disabled>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-lg-2">
                                    <span class="custom-alignment">Kd. Barang:</span>
                                </div>
                                <div class="col-lg-3">
                                    <input type="text" name="kd_barang" class="form-control" id="kd_barang" disabled>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-lg-2">
                                    <span class="custom-alignment">Nama Barang:</span>
                                </div>
                                <div class="col-lg-8">
                                    <input type="text" name="nama_barang" class="form-control" id="nama_barang"
                                        disabled>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-lg-2">
                                    <span class="custom-alignment">Peng-Order:</span>
                                </div>
                                <div class="col-lg-2">
                                    <input type="text" name="pengorder" class="form-control" id="UserOd"
                                        style="font-weight: bold;" disabled>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-3 d-flex justify-content-center">
                        <div class="col-lg-8">
                            <input type="hidden" name="Ketorder" id="Ketorder">
                            <input type="hidden" name="satuan" id="satuan">
                            <div class="input-group d-flex justify-content-end">
                                <button type="button" class="btn btn-success custom-btn" id="btnisi"
                                    onclick="Isidiklik()">ISI</button>
                                <button type="button" class="btn btn-warning custom-btn" id="btnkoreksi"
                                    onclick="koreksidiklik()">KOREKSI</button>
                                <button type="button" class="btn btn-primary custom-btn" id="btnproses"
                                    disabled>PROSES</button>
                                <button type="button" class="btn btn-danger custom-btn" id="btnbatal"
                                    onclick="bataldiklik()" disabled>BATAL</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('js/Andre-WorkShop/Workshop/Transaksi/MaintenanceKodeBarang.js') }}"></script>
@endsection
