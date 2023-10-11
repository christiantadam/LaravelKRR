@extends('layouts.appSales')
@section('content')
@section('title', 'Cetak SJ')
<link href="{{ asset('css/style.css') }}" rel="stylesheet">
<link href="{{ asset('css/cetakSJ.css') }}" rel="stylesheet">
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            <div class="acs-div-form">
                <div style="gap: 10px; display: flex">
                    <div>
                        <input type="radio" name="group_suratJalan" id="surat_jalanPPN" value="ppn"> SJ PPN
                    </div>
                    <div>
                        <input type="radio" name="group_suratJalan" id="surat_jalanNonPPN" value="non-ppn"
                            style="display: none">{{-- SJ Non PPN --}}
                    </div>
                    <div>
                        <input type="radio" name="group_suratJalan" id="surat_jalanAfalan" value="afalan"
                            style="display: none">{{-- SJ Afalan --}}
                    </div>
                    <div>
                        <input type="radio" name="group_suratJalan" id="surat_jalanExport" value="export"> SJ Export
                    </div>
                </div>
                <div class="acs-div-filter">
                    <label for="tanggal_sj">Tanggal:</label>
                    <input type="date" name="tanggal_sj" id="tanggal_sj" class="input">
                </div>
                <div class="acs-div-filter1">
                    <label for="no_sj">Nomor SJ:</label>
                    <div>
                        <input type="text" name="no_sjText" id="no_sjText" style="width: 80%;display: inline;"
                            class="input">
                        <select name="no_sjSelect" id="no_sjSelect" style="width: 80%;display: none" class="input">
                            <option disabled selected>-- Pilih Nomor Surat Jalan --</option>
                        </select>
                        <button class="btn btn-primary" id="no_sjButton" style="width: 15%" id="no">...</button>
                    </div>
                </div>
                <div class="acs-div-filter1">
                    <label for="no_sp">Nomor SP:</label>
                    <input type="text" name="no_sp" id="no_sp" class="input" readonly>
                </div>
                {{-- <div class="acs-div-filter2">
                        <label for="jenis_sp">Jenis SP:</label>
                        <input type="text" name="jenis_sp" id="jenis_sp" class="input">
                    </div> --}}
                <button id="print_button" class="btn btn-info"><span>&#128462;</span> View Print</button>
                <button id="export_pdf" class="btn btn-primary"><span>&#11123;</span> Export PDF</button>
                <button id="print_pdf" class="btn btn-success"><span>&#128438;</span> Print Surat Jalan</button>
                <hr>
                <label for="contoh_print" id="contoh_print">Contoh print:</label>
            </div>
            <div class="acs-div-container" id="contoh_printDiv">
                <span id="nomor_sjKolom" class="span-nomor_sjKolom" contenteditable="true">sj: 0000101861</span>
                <span id="tanggal_kirimKolom" class="span-tanggal_kirimKolom"
                    contenteditable="true">16-August-2023</span>
                <span id="truk_nopolKolom" class="span-truk_nopolKolom" contenteditable="true">L 8169 UM/RODA JY</span>
                <span id="no_spKolom" class="span-no_spKolom" contenteditable="true">34631</span>
                <span id="alamat_kolom" class="span-alamat_kolom" contenteditable="true">Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Pellentesque non lectus sit amet sapien sollicitudin ultrices.</span>
                <span id="nama_barangKolom" class="span-nama_barangKolom" contenteditable="true"></span>
                <span id="nama_typeBarangKolom" class="span-nama_typeBarangKolom" contenteditable="true"></span>
                <span id="satuan_barangPrimerKolom" class="span-satuan_barangPrimerKolom" contenteditable="true"></span>
                <span id="jumlah_barangPrimerKolom" class="span-jumlah_barangPrimerKolom" contenteditable="true"></span>
                <span id="satuan_barangSekunderKolom" class="span-satuan_barangSekunderKolom"
                    contenteditable="true"></span>
                <span id="jumlah_barangSekunderKolom" class="span-jumlah_barangSekunderKolom"
                    contenteditable="true"></span>
                <span id="no_poKolom" class="span-no_poKolom" contenteditable="true"></span>
                <span id="keterangan_tambahanKolom" class="span-keterangan_tambahanKolom"
                    contenteditable="true"></span>
                <span id="nama_customerKolom" class="span-nama_customerKolom" contenteditable="true"></span>
                <span id="alamat_kirimKolom" class="span-alamat_kirimKolom" contenteditable="true"></span>
                <span id="tanda_tanganKolom" class="span-tanda_tanganKolom" contenteditable="true">(SUNYATA
                    ICHWAN)</span>
            </div>
            <div class="acs-div-container" id="contoh_printSjEksportDiv" style="display: none">
                <div class="acs-div-printsjekspor-header">
                    <div class="acs-div-printsjekspor-header1">
                        <h3>PT. KERTA RAJASA RAYA</h3>
                        <h4>JL RAYA TROPODO No. 1 WARU - SIDOARJO - INDONESIA</h4>
                        <h4>TELP (031) 8669595 (HUNTING)</h4>
                        <h3 style="text-decoration: underline">SURAT PENGANTAR PENGIRIMAN BARANG EKSPORT</h3>
                    </div>
                    <div class="acs-div-printsjekspor-header2">
                        <div class="acs-div-printsjekspor-header3">
                            <h3 id="nomor_sjExport"></h3>
                        </div>
                        <div class="acs-div-printsjekspor-header4"></div>
                    </div>
                </div>
                <div class="acs-div-printsjekspor-body"></div>
                <div class="acs-div-printsjekspor-footer"></div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="{{ asset('js/Sales/CetakSJ.js') }}"></script>
@endsection
