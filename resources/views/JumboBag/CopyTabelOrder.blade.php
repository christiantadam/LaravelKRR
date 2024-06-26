@extends('layouts.appJumboBag')
@section('title', 'Copy Tabel Order')

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
                <form id="copyKodeBarangForm" action="{{ route('CopyTabelOrder.store') }}" method="POST">
                    <div class="card">
                        <div class="card-header">Data Tabel Order</div>
                        <div class="card-body">
                            @csrf
                            <div class="form-group">
                                <label for="customer">Customer</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="id_customer" name="id_customer" required>
                                    <input type="text" class="form-control" style="width: 85%"id="customer"
                                        name="customer" required readonly>
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
                    </div>
                    <br>
                    <div class="card">
                        <div class="card-header">Surat Pesanan Baru</div>
                        <div class="card-body">
                            <div class="form-group">
                                <label for="kodeBarang">Kode Barang</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="kodebarang" name="kodebarang" required>
                                    <input type="text" class="form-control" style="width: 85%" id="kodeBarangs"
                                        name="kodeBarangs" required>
                                    <button class="btn" type="button" id="button-kode-barang2">...</button>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="nosuratpesanan">No Surat Pesanan</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" style="width: 70%" id="idsuratpesanan"
                                        name="idsuratpesanan" required>
                                    <button class="btn" type="button" id="button-pesanan">...</button>
                                    <input type="text" class="form-control" id="idpesanan" name="idpesanan" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="jenis_barang">Jenis Barang</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="jenis_barang" name="jenis_barang"
                                        required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="tanggals">Rencana Kirim</label>
                                <div class="input-group">
                                    <input type="date" class="form-control" id="tanggals" name="tanggals" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="jumlahOrder2">Quantity</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" style="width: 85%" id="jumlah_order2"
                                        name="jumlah_order2" required>
                                    <input type="text" class="form-control" id="satuan" name="satuan" required
                                        style="text-align: center;">
                                </div>
                            </div>
                        </div>
                    </div>
                    <br>
                    <button type="submit" class="btn btn-primary">Proses</button>
                </form>
            </div>
        </div>
    </div>
    </div>
    </div>
    </div>

    <script src="{{ asset('js/JumboBag/CopyTabelOrder.js') }}"></script>
@endsection
