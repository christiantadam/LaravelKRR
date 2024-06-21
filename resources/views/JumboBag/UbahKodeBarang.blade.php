@extends('layouts.appJumboBag')
@section('title', 'Ubah Kode Barang')
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
                    <div class="card-header">Ubah Kode Barang</div>
                    <div class="card-body">
                        <form id="ubahKodeBarangForm" action="{{ route('UbahKodeBarang.store') }}" method="POST">
                            @csrf
                            <div class="form-group">
                                <label for="customer">Customer</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="id_customer" name="id_customer" required>
                                    <input type="text" class="form-control" style="width: 85%" id="customer"
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
                                <label for="kodeBarangDirubah">Kode Barang yang Dirubah</label>
                                <input type="text" class="form-control" id="kodeBarangDirubah" name="kodeBarangDirubah"
                                    required>
                            </div>
                            <button type="submit" class="btn btn-primary" id="prosesBtn">Proses</button>
                            {{-- <button type="submit" class="btn btn-primary">Submit</button> --}}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/JumboBag/UbahKodeBarang.js') }}"></script>
@endsection
