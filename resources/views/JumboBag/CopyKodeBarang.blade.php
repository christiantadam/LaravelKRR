@extends('layouts.appJumboBag')
@section('title', 'Copy Kode Barang')

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
                    <div class="card-header">Copy Kode Barang</div>
                    <div class="card-body">
                        <form id="copyKodeBarangForm" action="{{ route('CopyKodeBarang.store') }}" method="POST">
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
                                        <p>
                                            <br>
                                        </p>
                                    <button class="btn" type="button" id="button-kode-barang">...</button>
                                </div>
                            </div>
                            <div class="card">
                                {{-- <div class="card-header">Maintenance Customer</div> --}}
                                <div class="card-body table-responsive mt-1">
                                    <table class="table" id="table-hitungan">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th scope="col">Kode</th>
                                                <th scope="col">Komponen</th>
                                                <th scope="col">Panjang</th>
                                                <th scope="col">Lebar</th>
                                                <th scope="col">WA</th>
                                                <th scope="col">WE</th>
                                                <th scope="col">Denier</th>
                                                <th scope="col">Qty</th>
                                                <th scope="col">Berat</th>
                                                <th scope="col">Harga/Kg</th>
                                                <th scope="col">Harga</th>
                                                <th scope="col">Ke</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <br>
                            <div class="form-group">
                                <label for="customers">Customer</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="id_customers" name="id_customers"
                                        required>
                                    <input type="text" class="form-control" style="width: 85%"id="customers"
                                        name="customers" required>
                                    <button class="btn" type="button" id="button-customers">...</button>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="kodeBarangDirubah">Kode Barang</label>
                                <input type="text" class="form-control" id="kodeBarangDirubah" name="kodeBarangDirubah"
                                    required>
                            </div>
                            <div class="form-group">
                                <label for="tanggal">Tanggal</label>
                                <input type="date" class="form-control" id="tanggals" name="tanggals" required>
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

    <script src="{{ asset('js/JumboBag/CopyKodeBarang.js') }}"></script>
@endsection
