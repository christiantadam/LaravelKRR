@extends('layouts.appOrderPembelian')
@section('content')
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
                <div class="card font-weight-bold">
                    <div class="card-header">History Pembelian</div>
                    <div class="card-body ">
                        <form action="" id="formDaftarHarga">
                            <div style="overflow: auto;">
                                <table id="tabelData" class="table table-bordered" style="white-space: nowrap">
                                    <thead class="table-primary">
                                        <tr>
                                            <th>No Order</th>
                                            <th>Status Order</th>
                                            <th>Tgl PO</th>
                                            <th>Kode Barang</th>
                                            <th>Nama Barang</th>
                                            <th>Harga Unit</th>
                                            <th>Satuan</th>
                                            <th>Supplier</th>
                                            <th>Requester</th>
                                            <th>Kode Divisi</th>
                                            <th>Sub Kategori</th>
                                            <th>Status Beli</th>
                                            <th>Qty PO</th>
                                        </tr>
                                    </thead>
                                    {{-- <tbody>
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
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody> --}}
                                </table>
                            </div>
                            <div class="row mt-4">
                                <div class="col-md-9">
                                    <div class="row mb-3">
                                        <label for="" class="col-md-2 col-form-label">
                                            <input type="radio" name="opsi" id="rbkode_barang" value="kode_barang" >
                                            Kode Barang
                                        </label>
                                        <div class="col-md-10">
                                            <input type="text" name="search_kode_barang" id="search_kode_barang"class="form-control font-weight-bold">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <label for="" class="col-md-2 col-form-label">
                                            <input type="radio" name="opsi" id="rbnama_barang" value="nama_barang">
                                            Nama Barang
                                        </label>
                                        <div class="col-md-10">
                                            <input type="text" name="search_nama_barang" id="search_nama_barang" class="form-control font-weight-bold">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <label for="" class="col-md-2 col-form-label">
                                            <input type="radio" name="opsi" id="rbsupplier" value="supplier">
                                            Supplier
                                        </label>
                                        <div class="col-md-10">
                                            <input type="text" name="search_supplier" id="search_supplier" class="form-control font-weight-bold">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <label for="" class="col-md-2 col-form-label">
                                            <input type="radio" name="opsi" id="rbuser" value="user">
                                            User
                                        </label>
                                        <div class="col-md-10">
                                            <input type="text" name="search_user" id="search_user" class="form-control font-weight-bold">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="d-flex flex-column justify-content-between">
                                        <button type="button" id="redisplay" class="custom-button1 mb-2">Redisplay</button>
                                    </div>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
        <script src="{{ asset('js/OrderPembelian/HistoryPembelianMaster/HistoryPembelianMaster.js') }}"></script>
    @endsection
