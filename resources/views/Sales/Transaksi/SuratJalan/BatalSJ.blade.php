@extends('layouts.appSales') @section('content')
@section('title', 'Batal SJ')
<link href="{{ asset('css/batal-sj.css') }}" rel="stylesheet">
<link href="{{ asset('css/style.css') }}" rel="stylesheet">
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Batal Surat Jalan</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="permohonan-sj-container">
                        <div class="permohonan-sj-form">
                            <div class="acs-div-form1">
                                <div class="acs-div-form1" id="div_suratJalan">
                                    <div class="permohonan-sj-form">
                                        <div class="acs-div-form">
                                            <div class="acs-div-filter1">
                                                <label for="customer">Customer</label>
                                                <div class="acs-div-filter2">
                                                    <input type="text" name="customer" id="customer" class="input"
                                                        readonly>
                                                    {{-- <button disabled id="list_sjButton" class="btn btn-info"
                                                        style="display: inline;">↺ Lihat Data</button> --}}
                                                    <button disabled id="list_customerButton" class="btn btn-info"
                                                        style="display: inline;"> ... </button>
                                                </div>
                                            </div>
                                            <div class="acs-div-filter1">
                                                <label for="surat_pesanan">Surat Pesanan</label>
                                                <div class="acs-div-filter2">
                                                    <input type="text" name="surat_pesanan" id="surat_pesanan"
                                                        class="input" readonly>
                                                    <button disabled id="list_suratpesananButton" class="btn btn-info"
                                                        style="display: inline;"> ... </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="acs-div-form">
                                            <div class="acs-div-filter1">
                                                <label for="surat_jalan">Surat Jalan</label>
                                                <div class="acs-div-filter2">
                                                    <input type="text" name="surat_jalan" id="surat_jalan"
                                                        class="input" readonly>
                                                    <button disabled id="list_suratjalanButton" class="btn btn-info"
                                                        style="display: inline;"> ... </button>
                                                </div>
                                            </div>
                                            <div class="acs-div-filter1">
                                                <label for="alasan_batal">Alasan Batal</label>
                                                <textarea placeholder="Alasan Batal" name="alasan_batal" id="alasan_batal" class="textarea"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="permohonan-sj-container13">
                                    <button id="isi_button" class="permohonan-sj-button2 button">
                                        <span>Isi</span></button>
                                    <button id="edit_button" class="permohonan-sj-button3 button">
                                        <span>Koreksi</span></button>
                                    <button id="hapus_button" class="permohonan-sj-button4 button">
                                        <span>Hapus</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="{{ asset('js/Sales/batal-s-j.js') }}"></script>
@endsection
