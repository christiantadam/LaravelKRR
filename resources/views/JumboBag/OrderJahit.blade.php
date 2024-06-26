@extends('layouts.appJumboBag')
@section('title', 'Order Jahit')

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
                        <form id="ReturPenggantiForm" action="{{ route('OrderJahit.store') }}" method="POST">
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
                            <br>
                            <div class="form-group">
                                <label for="ukuran">Ukuran</label>
                                <input type="text" class="form-control" id="ukuran" name="ukuran"
                                    required>
                            </div>
                            <div class="form-group">
                                <label for="rajutan">Rajutan</label>
                                <input type="text" class="form-control" id="rajutan" name="rajutan"
                                    required>
                            </div>
                            <div class="form-group">
                                <label for="denier">Denier</label>
                                <input type="text" class="form-control" id="denier" name="denier"
                                    required>
                            </div>
                            <div class="form-group">
                                <label for="type">Type</label>
                                <input type="text" class="form-control" id="type" name="type"
                                    required>
                            </div>
                            <hr>
                            <div class="form-group">
                                <label for="no_referensi">No Referensi</label>
                                <input type="text" class="form-control" id="no_referensi" name="no_referensi"
                                    required>
                            </div>
                            <button type="submit" class="btn btn-primary">Print</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>
    </div>

    <script src="{{ asset('js/JumboBag/OrderJahit.js') }}"></script>
@endsection
