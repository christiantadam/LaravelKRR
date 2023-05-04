@extends('layouts.appSales')
@section('content')
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <link href="{{ asset('css/cetakSJ.css') }}" rel="stylesheet">
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="acs-div-form">
                    <div style="gap: 10px; display: flex">
                        <div>
                            <input type="radio" name="group_suratJalan" id="surat_jalanPPN"> SJ PPN
                        </div>
                        <div>
                            <input type="radio" name="group_suratJalan" id="surat_jalanNonPPN"> SJ Non PPN
                        </div>
                        <div>
                            <input type="radio" name="group_suratJalan" id="surat_jalanAfalan"> SJ Afalan
                        </div>
                        <div>
                            <input type="radio" name="group_suratJalan" id="surat_jalanExport"> SJ Export
                        </div>
                    </div>
                    <div class="acs-div-filter">
                        <label for="tanggal_sj">Tanggal:</label>
                        <input type="date" name="tanggal_sj" id="tanggal_sj" class="input">
                    </div>
                    <div class="acs-div-filter1">
                        <label for="no_sp">Nomor SP:</label>
                        <input type="text" name="" id="no_sp" class="input">
                    </div>
                    <div class="acs-div-filter1">
                        <label for="no_sj">Nomor SJ:</label>
                        <input type="text" name="" id="no_sj" class="input">
                    </div>
                    {{-- <div class="acs-div-filter2">
                        <label for="jenis_sp">Jenis SP:</label>
                        <input type="text" name="jenis_sp" id="jenis_sp" class="input">
                    </div> --}}
                    <button id="print_button" class="btn btn-primary">View Print</button>
                    <button id="export_pdf" class="btn btn-success">Export PDF</button>
                    <hr>
                    <label for="contoh_print" id="contoh_print">Contoh print:</label>
                </div>
                <div class="acs-div-container" id="contoh_printDiv">
                    <div class="cetak-sjpdf-container">
                        <h1>PT. KERTA RAJASA RAYA</h1>
                        <p>Jl. RAYA TROPODO NO. 1 WARU - SIDOARJO - INDONESIA</p>
                        <p>TELEPON (031)8669595 (HUNTING)</p>
                        <h4>SURAT PENGANTAR PENGIRIMAN BARANG</h4>
                    </div>
                    <div class="cetak-sjpdf-container1">
                        <div class="cetak-sjpdf-container2">
                            <p id="alamat_kirimKolom">Kepada Yth. <br>
                            TOCHU SILIKA INDONESIA <br> Kawasan Industri Mitrakarawang Jl.Mitra Selatan III Blok G-10, Parungmulya Ciampel - Karawang Jawa Barat 41361. Up:Bp.Nico. Telp.0264-440820</p>
                        </div>
                        <table class="cetak-sjpdf-container3">
                            <tr>
                                <td style="border: none !important">Tanggal</td>
                                <td style="border: none !important">:</td>
                                <td style="border: none !important; font-weight: bold" id="tanggal_kirimKolom">12-April-2023</td>
                            </tr>
                            <tr>
                                <td style="border: none !important">Truk Nopol</td>
                                <td style="border: none !important">:</td>
                                <td style="border: none !important;font-weight: bold" id="truk_nopolKolom">B 9055 BEV</td>
                            </tr>
                            <tr>
                                <td style="border: none !important">SP. No.</td>
                                <td style="border: none !important">:</td>
                                <td style="border: none !important;font-weight: bold" id="no_spKolom">A3363A</td>
                            </tr>
                        </table>
                    </div>
                    <table class="cetak-sjpdf-tabel">
                        <tr>
                            <th>U R A I A N</th>
                            <th>SATUAN</th>
                            <th>JUMLAH</th>
                        </tr>
                        <tr>
                            <td id="nama_barangKolom" style="border-right: none !important; border-bottom: none !important">TSI-006-KR11/070.0X070.0X055.0/10X12/1591/GD REV.01</td>
                            <td id="satuan_barangKolom" style="border-right: none !important; border-bottom: none !important">PALET</td>
                            <td id="jumlah_barangKolom" style="border-bottom: none !important">5</td>
                        </tr>
                        <tr>
                            <td style="border-right: none !important; border-bottom: none !important"></td>
                            <td style="border-right: none !important; border-bottom: none !important">LBR</td>
                            <td style="border-bottom: none !important">1250</td>
                        </tr>
                        <tr>
                            <td style="border-right: none !important">NO PO: 015/TSI-MTR/02/2023</td>
                            <td style="border-right: none !important"></td>
                            <td ></td>
                        </tr>
                    </table>
                    <div class="cetak-sjpdf-container4">
                        <h4>Syarat Penyerahan: </h4>
                        <p id="keterangan_kolom">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus consectetur purus in massa fermentum faucibus. Praesent tristique ante ac lectus euismod, in mattis lorem bibendum. Nulla gravida arcu ac purus dignissim, non rutrum odio luctus. Integer nec turpis mauris.</p>
                    </div>
                    <div class="cetak-sjpdf-container5">
                        <div class="cetak-sjpdf-container6">
                            <p>PENGIRIM</p>
                            <br>
                            <br>
                            <br>
                            <br>
                            <br>
                            <fieldset style="border: 1px solid black;"></fieldset>
                            <table style="font-size: 10px;text-align: left">
                                <tr>
                                    <td style="border: none !important">Lembar ke 1,2,3</td>
                                    <td style="border: none !important">=&nbsp;</td>
                                    <td style="border: none !important">Untuk Pembeli</td>
                                </tr>
                                <tr>
                                    <td style="border: none !important">Lembar ke 4</td>
                                    <td style="border: none !important">=&nbsp;</td>
                                    <td style="border: none !important">Untuk Bagian Piutang</td>
                                </tr>
                                <tr>
                                    <td style="border: none !important">Lembar ke 5</td>
                                    <td style="border: none !important">=&nbsp;</td>
                                    <td style="border: none !important">Untuk Gudang</td>
                                </tr>
                                <tr>
                                    <td style="border: none !important">Lembar ke 6</td>
                                    <td style="border: none !important">=&nbsp;</td>
                                    <td style="border: none !important">Untuk Adm. Kantor</td>
                                </tr>
                                <tr>
                                    <td style="border: none !important">Lembar ke 7</td>
                                    <td style="border: none !important">=&nbsp;</td>
                                    <td style="border: none !important">Untuk Satpam</td>
                                </tr>
                            </table>
                        </div>
                        <div class="cetak-sjpdf-container7">
                            <p style="text-align: center; font-weight: bold">TANDA TERIMA <br>
                            BARANG TERSEBUT TELAH KAMI TERIMA DALAM KEADAAN CUKUP DAN BAIK</P>
                            <br>
                            <br>
                            <br>
                            <br>
                            <br>
                            <fieldset style="border: 1px solid black;"></fieldset>
                            <p><span style="font-weight: bold">Note:</span><br>Apabila barang belum terbayar maka barang yang terkirim merupakan barang titipan</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="{{ asset('js/Sales/CetakSJ.js') }}"></script>
@endsection
