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
            <div class="col-md-12 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Maintenance Order Press</div>
                    <div class="card-body">
                        <form id="ReturPenggantiForm" action="{{ route('MaintenanceOrderPress.store') }}" method="POST">
                            @csrf
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="customer" style="width: 51%">Customer</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="id_customer" name="id_customer"
                                                required>
                                            <input type="text" class="form-control" style="width: 70%" id="customer"
                                                name="customer" required>
                                            <button class="input" type="button" id="button-customer"
                                                style="border-radius: 5px; width: 5%; cursor: pointer; border: 1px solid black;">...</button>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="kodeBarang">Kode Barang</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="tanggal" name="tanggal"
                                                required>
                                            <input type="text" class="form-control" style="width: 70%"
                                                id="kodeBarangAsal" name="kodeBarangAsal" required>
                                            <button class="input" type="button" id="button-kode-barang"
                                                style="border-radius: 5px; width: 5%; cursor: pointer; border: 1px solid black;">...</button>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label style="width: 88%" for="no_suratpesanan">No Surat Pesanan</label>
                                        <label for="delivery">Delivery</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" style="width: 70%"
                                                id="no_suratpesanan" name="no_suratpesanan" required>
                                            <input type="text" class="form-control" id="delivery" name="delivery"
                                                required>
                                            <button class="input" type="button" id="button-pesanan"
                                                style="border-radius: 5px; width: 5%; cursor: pointer; border: 1px solid black;">...</button>
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
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="tanggals" style="width: 50%">Tanggal Start</label>
                                        <label for="tanggalf">Tanggal Finish</label>
                                        <div class="input-group">
                                            <input type="date" class="form-control" id="tanggals" name="tanggals"
                                                required>
                                            <input type="date" class="form-control" id="tanggalf" name="tanggalf"
                                                required>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="stok">Stok Order Sebelumnya</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="stok1" name="stok1">
                                            <input type="text" class="form-control" style="width: 70%" id="stok2"
                                                name="stok2">
                                            <button class="input" type="button" id="button_stok"
                                                style="border-radius: 5px; width: 5%; cursor: pointer; border: 1px solid black;">...</button>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="sisa">Sisa Stok</label>
                                        <input type="text" class="form-control" id="sisa" name="sisa">
                                    </div>
                                    <div class="form-group">
                                        <label for="jumlah">Jumlah</label>
                                        <input type="text" class="form-control" id="jumlah" name="jumlah">
                                    </div>
                                    <div class="form-group text-right">
                                        <label for="jumlah" style="visibility: hidden;">a</label>
                                        <br>
                                        <button type="submit" class="btn btn-primary" id="btn_simpan">Simpan</button>
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

    <script src="{{ asset('js/JumboBag/MaintenanceOrderPress.js') }}"></script>
@endsection
