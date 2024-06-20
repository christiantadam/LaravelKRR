@extends('layouts.appJumboBag')
@section('title', 'Copy Kode Barang')

@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Copy Kode Barang</div>
                    <div class="card-body">
                        <form id="copyKodeBarangForm" action="{{ route('CopyKodeBarang.store') }}" method="POST">
                            @csrf
                            <div class="form-group">
                                <label for="customer">Customer</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="id_customer" name="id_customer" required>
                                    <input type="text" class="form-control" style="width: 90%"id="customer" name="customer" required>
                                    <button class="btn" type="button" id="button-customer">...</button>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="kodeBarang">Kode Barang</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="kodeBarang" name="kodeBarang" required>
                                    <button class="btn" type="button" id="button-kode-barang">...</button>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="kodeBarangDirubah">Kode Barang yang Dirubah</label>
                                <input type="text" class="form-control" id="kodeBarangDirubah" name="kodeBarangDirubah"
                                    required>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>

    <script src="{{ asset('js/JumboBag/CopyKodeBarang.js') }}"></script>
@endsection
