@extends('layouts.appOrderPembelian')
@section('title', 'Foto Barang')

@section('content')
<link href="{{ asset('css/FotoBarang.css') }}" rel="stylesheet">

<div class="container-foto-barang">
    <div class="foto-card">

        {{-- Kd Barang --}}
        <div class="row-form">
            <label>Kd Barang:</label>

            <div class="input-search-group">
                <input type="text" id="kdBarang" maxlength="9">

                <button id="btnCari">
                    <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        fill="currentColor" viewBox="0 0 24 24" >
                        <path d="M18 10c0-4.41-3.59-8-8-8s-8 3.59-8 8 3.59 8 8 8c1.85 0 3.54-.63 4.9-1.69l5.1 5.1L21.41 20l-5.1-5.1A8 8 0 0 0 18 10M4 10c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6-6-2.69-6-6"></path>
                    </svg>
                </button>
            </div>
        </div>

        {{-- Nama Barang --}}
        <div class="row-form">
            <label>Nama Barang:</label>
            <input type="text" id="namaBarang" readonly>
        </div>

        {{-- Keterangan --}}
        <div class="row-form">
            <label>Keterangan:</label>
            <input type="text" id="ketBarang" readonly>
        </div>

        {{-- Gambar --}}
        <div class="row-form gambar-box">
            <label>Gambar:</label>
            <div class="preview-container">
                <img id="previewImage" src="{{ asset('images/tanyaken_apa.jpg') }}">
            </div>
        </div>

        <input type="file" id="fotoInput" hidden accept="image/*">

        {{-- Button --}}
        <div class="button-group">
            <button id="btnBrowse"> Browse</button>
            <button id="btnFoto"> Foto</button>
            <button id="btnSimpan"> Simpan</button>
            <button id="btnHapus"> Hapus</button>
        </div>
    </div>

</div>

<script src="{{ asset('js/OrderPembelian/FotoBarang.js') }}"></script>
@endsection
