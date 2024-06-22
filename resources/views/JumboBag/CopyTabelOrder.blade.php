@extends('layouts.appJumboBag')
@section('title', 'Copy Order')

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
                    <div class="card-header">Data Tabel Order</div>
                    <div class="card-body">
                        <form id="copyOrderForm" action="{{ route('CopyTabelOrder.store') }}" method="POST">
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
                                <label for="noPesanan">No Pesanan</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="no_pesanan" name="no_pesanan" required>
                                    <button class="btn" type="button" id="button-no-pesanan">...</button>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="timeDelivery">Time Delivery</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="time_deliv" name="time_deliv" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="jumlahOrder">Jumlah Order</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="jumlah_order" name="jumlah_order"
                                        required>
                                </div>
                            </div>
                    </div>
                    </form>
                </div>
                <br>
                <div class="card">
                    <div class="card-header">Surat Pesanan Baru</div>
                    <div class="card-body">
                        <form id="copyKodeBarangForm" action="{{ route('CopyKodeBarang.store') }}" method="POST">
                            @csrf
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
                                <label for="customer">No Surat Pesanan</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" style="width: 30%" id="id_customer"
                                        name="id_customer" required>
                                    <button class="btn" type="button" id="button-customer">...</button>
                                    <input type="text" class="form-control" id="customer" name="customer" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="noPesanan">Jenis Barang</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="no_pesanan" name="no_pesanan"
                                        required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="tanggals">Rencana Kirim</label>
                                <div class="input-group">
                                    <input type="date" class="form-control" id="tanggals" name="tanggals"
                                        required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="jumlahOrder">Quantity</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="jumlah_order" name="jumlah_order"
                                        required>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary">Proses</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>
    </div>

    <script src="{{ asset('js/JumboBag/CopyTabelOrder.js') }}"></script>
@endsection
