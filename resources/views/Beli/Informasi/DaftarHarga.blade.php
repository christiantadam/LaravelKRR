@extends('layouts.appOrderPembelian')
@section('content')
@section('title', 'Daftar Harga')
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <link href="{{ asset('css/ListOrderPembelian.css') }}" rel="stylesheet">

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @elseif (Session::has('error'))
                    <div class="alert alert-danger">
                        {{ Session::get('error') }}
                    </div>
                @endif
                <div class="card">
                    <div class="card-header">Daftar Harga</div>
                    <div class="card-body ">
                        <form action="" id="formDaftarHarga">
                            <div class="scrollmenu">
                                <table id="tabelData" class="table table-bordered"  style="width:100%;white-space:nowrap">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th>KD Divisi</th>
                                            <th>Kode Barang</th>
                                            <th>Nama Barang</th>
                                            <th>Satuan</th>
                                            <th>Supplier</th>
                                            <th>Kota</th>
                                            <th>Negara</th>
                                            <th>Harga Unit</th>
                                            <th>Mata Uang</th>
                                            <th>Requester</th>
                                            <th>Tgl Order</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="row mt-4">
                                <div class="col-md-9">
                                    <div class="row mb-3">
                                        <label for="" class="col-md-2 col-form-label">
                                            <input type="radio" name="opsi" id="kode_barang" value="kode_barang" >
                                            Kode Barang
                                        </label>
                                        <div class="col-md-10">
                                            <input type="text" name="search_kode_barang" id="search_kode_barang" class="form-control">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <label for="" class="col-md-2 col-form-label">
                                            <input type="radio" name="opsi" id="nama_barang" value="nama_barang">
                                            Nama Barang
                                        </label>
                                        <div class="col-md-10">
                                            <input type="text" name="search_nama_barang" class="form-control">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <label for="" class="col-md-2 col-form-label">
                                            <input type="radio" name="opsi" id="supplier" value="supplier">
                                            Supplier
                                        </label>
                                        <div class="col-md-10">
                                            <input type="text" name="search_supplier" class="form-control">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <label for="" class="col-md-2 col-form-label">
                                            <input type="radio" name="opsi" id="user" value="user">
                                            User
                                        </label>
                                        <div class="col-md-10">
                                            <input type="text" name="search_user" class="form-control">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="d-flex flex-column justify-content-between">
                                        <button type="button" id="redisplay" class="btn btn-primary mb-2">Redisplay</button>
                                    </div>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
        <script src="{{ asset('js/OrderPembelian/DaftarHarga/DaftarHarga.js') }}"></script>
    @endsection
