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
                                        <input type="radio" name="filter_radioButton" id="filter_radioButtonAllOrder"
                                            value="AllOrder" class="radio-button" checked>
                                        <p>All Order</p>
                                    </div>
                                    <div style="display: flex;flex-direction: row;">
                                        <input type="radio" name="filter_radioButton" id="filter_radioButtonNomorOrder"
                                            value="NomorOrder" class="radio-button">
                                        <p>No. Order</p>
                                    </div>
                                    <input type="text" name="nomor_order" id="nomor_order" class="input">
                                    <div style="display: flex;flex-direction: row;">
                                        <input type="radio" name="filter_radioButton" id="filter_radioButtonUser"
                                            value="User" class="radio-button">
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

                        <div class="acs-form4">
                            <div class="acs-form5">
                                <div class="acs-div-filter">
                                    <label for="nomor_order">Nomor Order</label>
                                    <input type="text" name="nomor_order" id="nomor_order" class="input">
                                </div>
                                <div class="acs-div-filter">
                                    <label for="status_beli">Status Beli</label>
                                    <div class="acs-div-filter1">
                                        <div style="display: flex;flex-direction:row">
                                            <input type="radio" name="status_beliRadioButton" id="status_beliPengadaanPembelian" class="input" checked>Pengadaan Pembelian
                                        </div>
                                        <div style="display: flex;flex-direction:row">
                                            <input type="radio" name="status_beliRadioButton" id="status_beliBeliSendiri" class="input">Beli Sendiri
                                        </div>
                                    </div>
                                </div>
                                <div class="acs-div-filter">
                                    <label for="tanggal_dibutuhkan">Tanggal Dibutuhkan</label>
                                    <input type="date" name="tanggal_dibutuhkan" id="tanggal_dibutuhkan" class="input">
                                </div>
                                <div class="acs-div-filter">
                                    <label for="divisi">Divisi</label>
                                    <input type="hidden" name="id_divisi" id="id_divisi">
                                    <input type="text" name="divisi" id="divisi" class="input">
                                </div>
                                <div class="acs-div-filter">
                                    <label for="kode_barang">Kode Barang</label>
                                    <input type="text" name="kode_barang" id="kode_barang" class="input">
                                </div>
                                <div class="acs-div-filter">
                                    <label for="nama_barang">Nama Barang</label>
                                    <input type="text" name="nama_barang" id="nama_barang" class="input">
                                </div>
                                <div class="acs-div-filter">
                                    <label for="sub_kategori">Sub Kategori</label>
                                    <input type="text" name="sub_kategori" id="sub_kategori" class="input">
                                </div>
                                <div class="acs-div-filter">
                                    <label for="keterangan_order">Keterangan Order</label>
                                    <input type="text" name="keterangan_order" id="keterangan_order" class="input" value="-">
                                </div>
                                <div class="acs-div-filter">
                                    <label for="keterangan_internal">Keterangan Internal</label>
                                    <input type="text" name="keterangan_internal" id="keterangan_internal" class="input" value="-">
                                </div>
                                <div class="acs-div-filter">
                                    <label for="user">User</label>
                                    <input type="text" name="user" id="user" class="input">
                                </div>
                            </div>
                            <div class="acs-form5">
                                <div class="acs-div-filter1" style="align-items: center">
                                    <label for="qty_order">Qty Order</label>
                                    <input type="text" name="qty_order" id="qty_order" class="input" value="0">
                                    <label for="qty_delay">Qty Delay</label>
                                    <input type="text" name="qty_delay" id="qty_delay" class="input" value="0">
                                </div>
                            </div>
                            <div class="acs-form6">
                                <button class="btn btn-success">Approve</button>
                                <button class="btn btn-info">Clear</button>
                                <button class="btn btn-danger">Reject</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/OrderPembelian/IsiSupplierHarga.js') }}"></script>
@endsection
