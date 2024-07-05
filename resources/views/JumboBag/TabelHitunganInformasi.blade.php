@extends('layouts.appJumboBag')
@section('title', 'Tabel Hitungan')

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
                    <div class="card-header">Tabel Hitungan</div>
                    <div class="card-body">
                        <form id="ReturPenggantiForm" action="{{ route('TabelHitunganInformasi.store') }}" method="POST">
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
                                            <button class="input" type="button" id="btn_customer"
                                                style="border-radius: 5px; width: 5%; cursor: pointer; border: 1px solid black;">...</button>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="Ukuran">Ukuran&nbsp;&nbsp;<span style="font-style: italic;">(Panjang
                                                BB X Lebar BB X Diameter BB X Tinggi BB)</span></label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="ukuran" name="ukuran"
                                                required>
                                            <button class="input" type="button" id="btn_ukuran"
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
                                            <button class="input" type="button" id="btn_kodebarang"
                                                style="border-radius: 5px; width: 5%; cursor: pointer; border: 1px solid black;">...</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="tanggals" style="width: 50%">Tanggal Update</label>
                                        <div class="input-group">
                                            <input type="date" class="form-control" id="tanggalu" name="tanggalu"
                                                required>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="User">User</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="user" name="user"
                                                required>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <h4>Body</h4>
                                        <label for="body" style="width: 16%">Bentuk</label>
                                        <label for="body" style="width: 15%">Model</label>
                                        <label for="body">
                                            <span style="font-style: italic;">Circular/Square</span> Dimensi
                                        </label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="bentuk_body" name="bentuk_body"
                                                required>
                                            <input type="text" class="form-control" id="model_body" name="model_body"
                                                required>
                                            <input type="text" class="form-control" style="width: 50%" id="dimensi_body"
                                                name="dimensi_body" required>
                                            <button class="input" type="button" id="btn_body"
                                                style="border-radius: 5px; width: 5%; cursor: pointer; border: 1px solid black;">...</button>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <h4>Cerobong Atas</h4>
                                        <label for="ca" style="width: 16%">Bentuk</label>
                                        <label for="ca" style="width: 15%">Model</label>
                                        <label for="ca">
                                            <span style="font-style: italic;">Circular/Square</span> Dimensi
                                        </label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="bentuk_ca" name="bentuk_ca"
                                                required>
                                            <input type="text" class="form-control" id="model_ca" name="model_ca"
                                                required>
                                            <input type="text" class="form-control" style="width: 50%"
                                                id="dimensi_ca" name="dimensi_ca" required>
                                            <button class="input" type="button" id="btn_ca"
                                                style="border-radius: 5px; width: 5%; cursor: pointer; border: 1px solid black;">...</button>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <h4>Cerobong Bawah</h4>
                                        <label for="cb" style="width: 16%">Bentuk</label>
                                        <label for="cb" style="width: 15%">Model</label>
                                        <label for="cb">
                                            <span style="font-style: italic;">Circular/Square</span> Dimensi
                                        </label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="bentuk_cb" name="bentuk_cb"
                                                required>
                                            <input type="text" class="form-control" id="model_cb" name="model_cb"
                                                required>
                                            <input type="text" class="form-control" style="width: 50%"
                                                id="dimensi_cb" name="dimensi_cb" required>
                                            <button class="input" type="button" id="btn_cb"
                                                style="border-radius: 5px; width: 5%; cursor: pointer; border: 1px solid black;">...</button>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="Swl" style="width: 50%">SWL</label>
                                        <label for="Sf">SF</label>
                                        <div class="input-group" style="display: flex; align-items: center; gap: 10px;">
                                            <input type="text" class="form-control" id="swl" name="swl"
                                                required>
                                            <input type="text" class="form-control" id="sf" name="sf"
                                                required>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <h4 style="visibility: hidden;">Body</h4>
                                        <label for="body" style="width: 25%">Panjang</label>
                                        <label for="body" style="width: 24%">Diameter</label>
                                        <label for="body" style="width: 24%">Lebar</label>
                                        <label for="body">Tinggi</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="panjang_body"
                                                name="panjang_body" required>
                                            <input type="text" class="form-control" id="diameter_body"
                                                name="diameter_body" required>
                                            <input type="text" class="form-control" id="lebar_body" name="lebar_body"
                                                required>
                                            <input type="text" class="form-control" id="tinggi_body"
                                                name="tinggi_body" required>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <h4 style="visibility: hidden;">Cerobong Atas</h4>
                                        <label for="ca" style="width: 25%">Panjang</label>
                                        <label for="ca" style="width: 24%">Diameter</label>
                                        <label for="ca" style="width: 24%">Lebar</label>
                                        <label for="ca">Tinggi</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="panjang_ca" name="panjang_ca"
                                                required>
                                            <input type="text" class="form-control" id="diameter_ca"
                                                name="diameter_ca" required>
                                            <input type="text" class="form-control" id="lebar_ca" name="lebar_ca"
                                                required>
                                            <input type="text" class="form-control" id="tinggi_ca" name="tinggi_ca"
                                                required>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <h4 style="visibility: hidden;">Cerobong Bawah</h4>
                                        <label for="cb" style="width: 25%">Panjang</label>
                                        <label for="cb" style="width: 24%">Diameter</label>
                                        <label for="cb" style="width: 24%">Lebar</label>
                                        <label for="cb">Tinggi</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="panjang_cb" name="panjang_cb"
                                                required>
                                            <input type="text" class="form-control" id="diameter_cb"
                                                name="diameter_cb" required>
                                            <input type="text" class="form-control" id="lebar_cb" name="lebar_cb"
                                                required>
                                            <input type="text" class="form-control" id="tinggi_cb" name="tinggi_cb"
                                                required>
                                        </div>
                                    </div>
                                    {{-- <div class="form-group text-right">
                                        <label for="jumlah" style="visibility: hidden;">a</label>
                                        <br>
                                        <button type="submit" class="btn btn-primary">Simpan</button>
                                    </div> --}}
                                </div>
                            </div>
                            <hr>
                            <div>
                                <table id="tabel" class="table">
                                    <thead>
                                        <tr>
                                            <th>Nama Customer</th>
                                            <th>Kode Barang</th>
                                            <th>Panjang</th>
                                            <th>Lebar B</th>
                                            <th>Tinggi B</th>
                                            <th>Diameter</th>
                                            <th>Model BB</th>
                                            <th>Model CA</th>
                                            <th>Model CB</th>
                                            <th style="width: ">Warna</th>
                                            <th>SWL</th>
                                            <th>SF1</th>
                                            <th>SF2</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                            <hr>
                            <div style="display: flex; justify-content: center;">
                                <button id="btn_cari" class="btn btn-primary" style="margin-right: 20px; width:100px">Cari</button>
                                <button id="btn_clear" class="btn btn-warning" style="margin-right: 20px; width:100px">Clear</button>
                                <button id="btn_print" class="btn btn-success" style="width:100px">Print</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>

    <script src="{{ asset('js/JumboBag/TabelHitunganInformasi.js') }}"></script>
@endsection
