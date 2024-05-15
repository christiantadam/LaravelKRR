@extends('layouts.appJumboBag') @section('content')
@section('title', 'Tabel Hitungan Tubing OPP')
<link href="{{ asset('css/style.css') }}" rel="stylesheet">
{{-- <link href="{{ asset('css/JumboBag/TabelHitungan.css') }}" rel="stylesheet"> --}}
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            @if (Session::has('success'))
                <div class="alert alert-success">
                    {{ Session::get('success') }}
                </div>
            @endif
            <div class="container">
                <form>
                    <div class="form-row">
                        <label for="customer">Customer:</label>
                        <input type="text" id="customer">
                        <label for="tanggal">Tanggal:</label>
                        <input type="date" id="tanggal" value="2024-05-15">
                    </div>
                    <div class="form-row">
                        <label for="kode-barang">Kode Barang:</label>
                        <input type="text" id="kode-barang">
                        <label for="tanggal-update">Tanggal Update:</label>
                        <input type="date" id="tanggal-update" value="2024-05-15">
                    </div>

                    <fieldset>
                        <legend>Body</legend>
                        <div class="form-row">
                            <label for="body-bentuk">Bentuk:</label>
                            <input type="text" id="body-bentuk">
                            <label for="body-dimensi">Dimensi:</label>
                            <input type="text" id="body-dimensi">
                            <label for="body-panjang">Panjang:</label>
                            <input type="number" id="body-panjang">
                            <label for="body-diameter">Diameter:</label>
                            <input type="number" id="body-diameter">
                            <label for="body-tinggi">Tinggi:</label>
                            <input type="number" id="body-tinggi">
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Cerobong Atas</legend>
                        <div class="form-row">
                            <label for="cerobong-atas-bentuk">Bentuk:</label>
                            <input type="text" id="cerobong-atas-bentuk">
                            <label for="cerobong-atas-dimensi">Dimensi:</label>
                            <input type="text" id="cerobong-atas-dimensi">
                            <label for="cerobong-atas-panjang">Panjang:</label>
                            <input type="number" id="cerobong-atas-panjang">
                            <label for="cerobong-atas-diameter">Diameter:</label>
                            <input type="number" id="cerobong-atas-diameter">
                            <label for="cerobong-atas-tinggi">Tinggi:</label>
                            <input type="number" id="cerobong-atas-tinggi">
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Cerobong Bawah</legend>
                        <div class="form-row">
                            <label for="cerobong-bawah-bentuk">Bentuk:</label>
                            <input type="text" id="cerobong-bawah-bentuk">
                            <label for="cerobong-bawah-dimensi">Dimensi:</label>
                            <input type="text" id="cerobong-bawah-dimensi">
                            <label for="cerobong-bawah-panjang">Panjang:</label>
                            <input type="number" id="cerobong-bawah-panjang">
                            <label for="cerobong-bawah-diameter">Diameter:</label>
                            <input type="number" id="cerobong-bawah-diameter">
                            <label for="cerobong-bawah-tinggi">Tinggi:</label>
                            <input type="number" id="cerobong-bawah-tinggi">
                        </div>
                    </fieldset>

                    <div class="form-row">
                        <label for="jenis-barang">Jenis Barang:</label>
                        <input type="text" id="jenis-barang">
                    </div>

                    <fieldset>
                        <legend>Reinforced</legend>
                        <div class="form-row">
                            <label for="reinforced-lebar">Lebar:</label>
                            <input type="number" id="reinforced-lebar">
                            <label for="reinforced-jumlah">Jumlah:</label>
                            <input type="number" id="reinforced-jumlah">
                            <label for="reinforced-jarak">Jarak:</label>
                            <input type="number" id="reinforced-jarak">
                            <label for="belt-rope">Belt / Rope:</label>
                            <input type="text" id="belt-rope">
                            <label for="tinggi-loop">Tinggi Loop:</label>
                            <input type="number" id="tinggi-loop">
                        </div>
                        <div class="form-row">
                            <label for="swl">SWL:</label>
                            <input type="text" id="swl">
                            <label for="std-waktu">Std Waktu:</label>
                            <input type="text" id="std-waktu">
                            <label for="lama">Lama:</label>
                            <input type="text" id="lama">
                            <label for="warna">Warna:</label>
                            <input type="text" id="warna">
                            <label for="inner">Inner:</label>
                            <input type="text" id="inner">
                        </div>
                        <div class="form-row">
                            <label for="keterangan">Keterangan:</label>
                            <textarea id="keterangan"></textarea>
                        </div>
                    </fieldset>

                    <div class="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Kode</th>
                                    <th>Komponen</th>
                                    <th>Panjang</th>
                                    <th>Lebar</th>
                                    <th>WA</th>
                                    <th>WE</th>
                                    <th>Denier</th>
                                    <th>Qty</th>
                                    <th>Berat</th>
                                    <th>Harga/Kg</th>
                                    <th>Harga</th>
                                    <th>Ke</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- Rows will be added here -->
                            </tbody>
                        </table>
                        <button type="button">Tambah Komponen</button>
                        <button type="button">Koreksi Komponen</button>
                        <button type="button">Hapus Komponen</button>
                    </div>

                    <div class="form-actions">
                        <button type="submit">Isi</button>
                        <button type="button">Koreksi</button>
                        <button type="button">Hapus</button>
                        <button type="button">Proses</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="{{ asset('js/Sales/Customer.js') }}"></script>
@endsection
