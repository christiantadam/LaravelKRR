@extends('layouts.appJumboBag')
@section('title', 'Maintenance Order Press')

@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <script>
                let successMessage = '';
                let errorMessage = '';
            </script>
            @if (Session::has('success'))
                <script>
                    successMessage = "{{ Session::get('success') }}";
                </script>
            @elseif (Session::has('error'))
                <script>
                    errorMessage = "{{ Session::get('error') }}";
                </script>
            @endif
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Order Jahit</div>
                    <div class="card-body">
                        <form id="ReturPenggantiForm" action="{{ route('MaintenanceOrderPress.store') }}" method="POST">
                            @csrf
                            <div class="form-group">
                                <label for="customer">Customer</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="id_customer" name="id_customer" required>
                                    <input type="text" class="form-control" style="width: 85%"id="customer"
                                        name="customer" required>
                                    <button class="btn" type="button" id="button-customer">...</button>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="kodeBarang">Kode Barang</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="tanggal" name="tanggal" required>
                                    <input type="text" class="form-control" style="width: 85%" id="kodeBarangAsal"
                                        name="kodeBarangAsal" required>
                                    <button class="btn" type="button" id="button-kode-barang">...</button>
                                </div>
                            </div>
                            <div class="form-group">
                                <label style="width: 88%" for="no_suratpesanan">No Surat Pesanan</label>
                                <label for="delivery">Delivery</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" style="width: 80%" id="no_suratpesanan" name="no_suratpesanan"
                                        required>
                                    <input type="text" class="form-control" id="delivery"
                                        name="delivery" required>
                                    <button class="btn" type="button" id="button-pesanan">...</button>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="jumlah_order">Jumlah Order</label>
                                <input type="text" class="form-control" id="jumlah_order" name="jumlah_order"
                                    required>
                            </div>
                            <div class="form-group">
                                <label for="jumlah_press">Jumlah Press</label>
                                <input type="text" class="form-control" id="jumlah_press" name="jumlah_press"
                                    required>
                            </div>
                            <hr>
                            <div class="form-group">
                                <label for="tanggals" style="width: 50%">Tanggal Start</label>
                                <label for="tanggalf">Tanggal Finish</label>
                                <div class="input-group">
                                    <input type="date" class="form-control" id="tanggals" name="tanggals" required>
                                    <input type="date" class="form-control" id="tanggalf" name="tanggalf" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="stok">Stok Order Sebelumnya</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="stok1" name="stok1" required>
                                    <input type="text" class="form-control" style="width: 85%" id="stok2"
                                        name="stok2" required>
                                    <button class="btn" type="button" id="button_stok">...</button>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="sisa">Sisa Stok</label>
                                <input type="text" class="form-control" id="sisa" name="sisa"
                                    required>
                            </div>
                            <div class="form-group">
                                <label for="jumlah">Jumlah</label>
                                <input type="text" class="form-control" id="jumlah" name="jumlah"
                                    required>
                            </div>
                            <button type="submit" class="btn btn-primary">Simpan</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>
    </div>

    <script src="{{ asset('js/JumboBag/MaintenanceOrderPress.js') }}"></script>
@endsection
