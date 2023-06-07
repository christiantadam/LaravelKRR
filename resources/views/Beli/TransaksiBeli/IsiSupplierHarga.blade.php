@extends('layouts.appOrderPembelian')
@section('content')
    <link href="{{ asset('css/IsiSupplierHarga.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
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
                    <div class="card-header">Isi Supplier - Harga</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="acs-form">
                            <div class="acs-form1" style="width: 60%">
                                <label for="filter">Search by:</label>
                                <div class="acs-form" style="border: 0.5px grey solid;">
                                    <div style="display: flex;flex-direction: row;">
                                        <input type="radio" name="filter_radioButton" id="filter_radioButton1"
                                            value="AllOrder" class="radio-button" checked>
                                        <p>All Order</p>
                                    </div>
                                    <div style="display: flex;flex-direction: row;">
                                        <input type="radio" name="filter_radioButton" id="filter_radioButton2"
                                            value="NomorOrder" class="radio-button" checked>
                                        <p>No. Order</p>
                                    </div>
                                    <input type="text" name="nomor_order" id="nomor_order" class="input">
                                    <div style="display: flex;flex-direction: row;">
                                        <input type="radio" name="filter_radioButton" id="filter_radioButton3"
                                            value="User" class="radio-button" checked>
                                        <p>User</p>
                                    </div>
                                    <input type="text" name="user" id="user" class="input">
                                </div>
                            </div>
                            <div class="acs-form1" style="align-self: self-end">
                                <button class="btn btn-success acs-btn" id="button_redisplay">Redisplay</button>
                            </div>
                        </div>
                        <div id="div_tablePO" class="acs-form3">
                            <table id="table_IsiHarga" class="table table-bordered table-striped" style="width:100%">
                                <thead class="thead-dark">
                                    <tr>
                                        <th>No. Order</th>
                                        <th>Status Beli</th>
                                        <th>Kode Barang</th>
                                        <th>Nama Barang</th>
                                        <th>Sub Kategori</th>
                                        <th>Qty</th>
                                        <th>Satuan</th>
                                        <th>User</th>
                                        <th>Id_Div</th>
                                        <th>Tgl. Dibutuhkan</th>
                                        <th>Ket. Order</th>
                                        <th>Ket. Internal</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                        {{-- <div class="button-align-right">
                            <div>
                                <input type="checkbox" name="checkbox_centangSemuaBaris"
                                    id="checkbox_centangSemuaBaris">Centang Semua
                            </div>

                            <form action="{{ url('openFormCreateSPPB/create') }}" id="form_createSPPB" method="GET">
                                <button class="btn btn-success" id="create_po">Create PO</button>
                            </form>
                        </div> --}}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/OrderPembelian/IsiSupplierHarga.js') }}"></script>
@endsection
