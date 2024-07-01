@extends('layouts.appJumboBag')
@section('title', 'Permohonan Retur / Pengganti')

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
                    <div class="card-header">Permohonan Retur / Pengganti</div>
                    <div class="card-body">
                        <form id="PermohonanReturForm" action="{{ route('PermohonanRetur.store') }}" method="POST">
                            @csrf
                            <div class="form-group">
                                <label for="customer">Customer</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="id_customer" name="id_customer" required>
                                    <input type="text" class="form-control" style="width: 85%"id="customer"
                                        name="customer" required>
                                    <button class="btn" type="button" id="button_customer">...</button>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="kodeBarang">Kode Barang</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="tanggal" name="tanggal" required>
                                    <input type="text" class="form-control" style="width: 85%" id="kodeBarangAsal"
                                        name="kodeBarangAsal" required>
                                    <button class="btn" type="button" id="button_kodebarang">...</button>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="no_suratpesanan">No Surat Pesanan</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="no_suratpesanan" name="no_suratpesanan"
                                        required>
                                    <button class="btn" type="button" id="button_pesanan">...</button>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="timeDelivery">Time Delivery</label>
                                <div class="input-group">
                                    <input type="date" class="form-control" id="time_deliv" name="time_deliv" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="jumlah_order">Jumlah order</label>
                                <input type="text" class="form-control" id="jumlah_order" name="jumlah_order" required>
                            </div>
                            <hr>
                            <div class="form-group">
                                <label for="jumlah_retur">Jumlah Retur</label>
                                <input type="text" class="form-control" id="jumlah_retur" name="jumlah_retur" required>
                            </div>
                            <div class="form-group">
                                <label for="no_referensi">No Referensi</label>
                                <input type="text" class="form-control" id="no_referensi" name="no_referensi" required>
                            </div>
                            <div class="d-flex justify-content-between">
                                <div>
                                    <button id="btn_isi" style="width: 100px" class="btn btn-primary">Isi</button>
                                    <button id="btn_koreksi" style="width: 100px"class="btn btn-warning">Koreksi</button>
                                    <button id="btn_hapus" style="width: 100px"class="btn btn-danger">Hapus</button>
                                </div>
                                <div>
                                    <button id="btn_proses" style="width: 100px"class="btn btn-success">Proses</button>
                                    <button id="btn_batal" style="width: 100px"class="btn">Batal</button>
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

    <script src="{{ asset('js/JumboBag/PermohonanRetur.js') }}"></script>
@endsection
