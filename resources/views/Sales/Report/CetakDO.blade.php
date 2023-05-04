@extends('layouts.appSales') @section('content')
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <link href="{{ asset('css/cetakDO.css') }}" rel="stylesheet">
    <link href="{{ asset('css/cetak-dopdf.css') }}" rel="stylesheet">
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="acs-div-form">
                    <div> <input type="radio" name="group_cetak" id="cetak_belumACC"> Cetak Belum ACC (Lokal) <input
                            type="radio" name="group_cetak" id="cetak_sudahACC"> Cetak Sudah ACC (Lokal) </div>
                    <div class="acs-div-filter"> <label for="tanggal_do">Tanggal:</label> <input type="date"
                            name="tanggal_do" id="tanggal_do" class="input"> </div>
                    <div class="acs-div-filter1"> <label for="no_do">Nomor Referensi:</label> <input type="text"
                            name="nomor_referensi" id="nomor_referensi" class="input"> </div> <button id="print_button"
                        class="btn btn-info" style="font-color: white"><span>&#128462;</span>View Print</button> <button
                        id="export_pdf" class="btn btn-primary"><span>&#11123;</span> Export PDF</button> <button
                        id="print_pdf" class="btn btn-success"><span>&#128438;</span> Print Surat Pesanan</button>
                    <hr> <label for="contoh_print" id="contoh_print">Contoh print:</label>
                </div>
                <div class="acs-div-container" id="contoh_printDiv">

                    <body>
                        <div class="cetak-dopdf-container">
                            <table class="cetak-dopdf-container02 header">
                                <tbody>
                                    <tr style="border: 1px solid black !important">
                                        <td style="text-align: center; border-right: solid 1px black !important">
                                            <h2 style="margin-bottom: 0px"> <span>PT. KERTA RAJASA RAYA</span> </h2>
                                            <p style="margin-bottom: 0px"> <span>Woven Bag - Jumbo Bag
                                                    Industrial</span>
                                                <br />
                                            <p style="margin-bottom: 0px"> <span>No. Dokumen:
                                                    21-FM-03-02-01-01</span>
                                                <br />
                                        </td>
                                        <td>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>No</td>
                                                        <td>:</td>
                                                        <td id="nomor_referensiKolom"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>DiBuat Oleh</td>
                                                        <td>:</td>
                                                        <td id="dibuat_olehKolom">Marketing</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="white-space: nowrap;">Tanggal Kirim</td>
                                                        <td>:</td>
                                                        <td id="tanggal_kirimKolom"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding-right: 10px">
                                            <img src="{{ asset('images/CetakDO1.png') }}" alt="Example Image"
                                                class="acs-image" style="margin-left: 5px">
                                        </td>
                                        <td>
                                            <img src="{{ asset('images/CetakDO2.png') }}" alt="Example Image"
                                                class="acs-image" style="margin-right: 5px">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style="width: 98%">
                                <thead>
                                    <tr>
                                        <td>
                                            <div class="page-header-space"></div>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div id="div_cetakDO"></div>
                                        </td>
                                    </tr>
                                </tbody>

                            </table>

                        </div>
                    </body>

                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="{{ asset('js/Sales/CetakDO.js') }}"></script>
@endsection
