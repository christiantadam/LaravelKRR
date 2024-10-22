@extends('layouts.appAccounting')
@section('content')
@section('title', 'Cetak Nota Kredit')

<style>
    .table-responsive.fixed-height tbody {
        background-color: white;
    }

    .underline {
        border-bottom: 1px solid black;
        /* Change the color as needed */
        margin-bottom: 10px;
        /* Space between labels and line */
    }

    .table-responsive.fixed-height {
        /* overflow-y: auto; */
        /* position: relative; */
        border-radius: 8px;
        border: 2px solid black;
        /* width: 100%; */
        /* table-layout: fixed; */
        background-color: white;
    }

    .no-wrap-header thead th {
        white-space: nowrap;
        background-color: lightgoldenrodyellow;
        padding: 0;
    }

    .table-responsive.fixed-height tbody td {
        background-color: white;
        padding: 4px 5px;
    }

    .fixed-width {
        white-space: nowrap;
        /* Prevent text wrapping */
        overflow: hidden;
        /* Hide overflow text */
        text-overflow: ellipsis;
        /* Show "..." when the text overflows */
        padding: 0;
    }

    table.dataTable {
        table-layout: fixed;
        /* Ensure table uses fixed layout */
        width: 100%;
        /* Ensure the table takes up the full width */
    }

    #table_list th,
    #table_list td {
        padding-top: 0;
        padding-bottom: 0;
        font-size: 16px;
    }

    @media print {
        .card {
            display: none;
        }

        .print {
            visibility: visible !important;
        }

        .modal {
            display: none !important;
        }

        .fade {
            opacity: 0 !important;
        }
    }
</style>

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-7 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Cetak Nota Kredit</div>
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @endif
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        <div class="d-flex">
                            <div class="col-md-4">
                                <label for="tanggal">Tanggal</label>
                            </div>
                            <div class="col-md-3">
                                <input type="date" id="tanggal" name="tanggal" class="form-control"
                                    style="width: 100%">
                            </div>
                        </div>
                        <p>
                        <div class="d-flex">
                            <div class="col-md-4">
                                <label for="namaCustomer">Customer</label>
                            </div>
                            <div class="col-md-5">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="namaCustomer" name="namaCustomer"
                                        readonly>
                                    <div class="input-group-append">
                                        <button type="button" id="btn_cust" class="btn btn-default">...</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p>
                        <div class="d-flex">
                            <div class="col-md-4">
                                <label for="notaKredit">Nota Kredit</label>
                            </div>
                            <div class="col-md-5">
                                <input type="text" id="notaKredit" name="notaKredit" class="form-control"
                                    style="width: 100%">
                            </div>
                        </div>

                        <div class="col-md-5">
                            <input type="hidden" id="statusPPN" name="statusPPN" class="form-control"
                                style="width: 100%">
                        </div>
                        <div class="col-md-5">
                            <input type="hidden" id="jnsNotaKredit" name="jnsNotaKredit" class="form-control"
                                style="width: 100%">
                        </div>

                        <br>
                        <div class="mb-3">
                            <div class="row">
                                <div class="col-2">
                                    <input type="submit" id="btnCetak" name="btnCetak" value="Cetak"
                                        class="btn btn-primary">
                                </div>
                                <div class="col-2">
                                    <input type="submit" id="btnKeluar" name="btnKeluar" value="Keluar"
                                        class="btn btn-primary">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="notaKreditPPN">
    <div class="container">
        <div class="row" style="margin-top: 10%">
            <div class="col-sm-12" style="text-align-last: center">
                <div class="col-sm-12" style="text-align: center;">
                    <strong><u>LAMPIRAN KEPUTUSAN MENTERI KEUANGAN R.I</u></strong>
                </div>
                <div class="col-sm-12" style="text-align: center; font: 14px">
                    Nomor : 987/KMK. 04/1984 Tanggal : 18 September 1984
                </div>
            </div>
        </div>
        <div class="row" style="border: solid 1px; font: 16px">
            <div class="col-sm-12"><strong><u>PEMBELI</u></strong></div>
            <div class="col-sm-2"></div>
            <div class="col-sm-10">
                <div class="row">
                    <div class="col-sm-2">NAMA :</div>
                    <div class="col-sm-8" id="nama"></div>
                    <div class="col-sm-2"></div>
                </div>
                <div class="row">
                    <div class="col-sm-2">ALAMAT :</div>
                    <div class="col-sm-8" id="alamat"></div>
                    <div class="col-sm-2"></div>
                </div>
                <div class="row">
                    <div class="col-sm-2">NPWP :</div>
                    <div class="col-sm-8" id="npwp"></div>
                    <div class="col-sm-2"></div>
                </div>
            </div>
        </div>
        <div class="row" style="border: solid 1px; font: 16px">
            <div class="col-sm-12">
                <strong>
                    <center><u>NOTA RETUR</u></center>
                </strong>
            </div>
            <div class="col-sm-12" style="text-align: center; font: 16px" id="nomor"><center></center></div>
            <div class="col-sm-5" id="ketPajak"></div>
            {{-- <div class="col-sm-1" id="idFakturPajak" style="text-align: left; padding: 0px"></div>
            <div class="col-sm-1" id="pajak1" style="text-align: left; padding-left: 0px"></div> --}}
        </div>
        <div class="row" style="border: solid 1px; font: 16px">
            <div class="col-sm-12"><strong><u>Kepada P E N J U A L</u></strong></div>
            <div class="col-sm-4"></div>
            <div class="col-sm-6">
                <div class="row">
                    <div class="col-sm-2">NAMA &nbsp; &nbsp; :</div>
                    <div class="col-sm-10">PT. KERTA RAJASA RAYA</div>
                </div>
                <div class="row">
                    <div class="col-sm-2">ALAMAT :</div>
                    <div class="col-sm-10">Jl. Raya Tropodo No. 1, Waru - Sidoarjo</div>
                </div>
                <div class="row">
                    <div class="col-sm-2">NPWP &nbsp; &nbsp;:</div>
                    <div class="col-sm-10">01.140.897.8-617.000</div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-1" style="border: solid 1px; font: 16px"><center>No</center></div>
            <div class="col-sm-5" style="border: solid 1px; font: 16px"><center>Nama Barang Kena Pajak / Barang Mewah Yang Retur</center></div>
            <div class="col-sm-2" style="border: solid 1px; font: 16px"><center>Kuantum</center></div>
            <div class="col-sm-2" style="border: solid 1px; font: 16px"><center>Harga Satuan Faktur Pajak (Rp. )</center></div>
            <div class="col-sm-2" style="border: solid 1px; font: 16px"><center>Harga Jual Yang DiRetur (Rp. )</center></div>
        </div>
        <div class="row">
            <div class="col-sm-1" id="no" style="border: solid 1px; font: 16px"><center>&nbsp;</center></div>
            <div class="col-sm-5" id="namaTypeBarang" style="border: solid 1px; font: 16px"></div>
            <div class="col-sm-2 d-flex" style="border: solid 1px; font: 16px; text-align: center;">
                <div id="qtyKonversi" style="padding-right: 3%">bbbb</div>
                <div id="satuanJual">aaa</div>
            </div>
            <div class="col-sm-2" id="hargaSatuan" style="border: solid 1px; font: 16px"></div>
            <div class="col-sm-2" id="total" style="border: solid 1px; font: 16px"></div>

            <div class="col-sm-5 offset-sm-1" id="namaBarang"></div><div class="col-sm-6"></div>
            <div class="col-sm-5 offset-sm-1" id="no_po"></div><div class="col-sm-6"></div>

        </div>
        <div class="row" style="border: solid 1px; font: 16px">
            <div class="col-sm-2" style="font: 14px">Surat Jalan :</div>
            <div class="col-sm-6" id="suratJalan"></div>
            <div class="col-sm-2" style="text-align: right;">Harga Jual</div>
            <div class="col-sm-2" id="grandTotal1" style="border: solid 1px; font: 16px; text-align: right;"></div>

            <div class="col-sm-2 offset-sm-8" style="text-align: right;">Potongan Harga</div>
            <div class="col-sm-2" style="border: solid 1px; font: 16px; text-align: right"> - </div>
        </div>
        <div class="row" style="border: solid 1px; font: 16px">
            <div class="col-sm-10"><center>Jumlah Harga Jual Barang yang diretur</center></div>
            <div class="col-sm-2" id="grandTotal2" style="border: solid 1px; font: 16px; text-align: right;"></div>
        </div>


        <div class="row" style="border: solid 1px; font: 16px">
            <div class="col-sm-10">Jumlah Pajak Yang Dikurangkan :</div>
            <div class="col-sm-2"  style="border: solid 1px; border-bottom: 0px;"></div>
            <div class="col-sm-5 offset-sm-5">a. Pajak Pertambahan Nilai (PPN) .......................................................</div>
            <div class="col-sm-2" id="nilaiPajak" style="border: solid 1px; border-top: 0px; "></div>
            <div class="col-sm-5 offset-sm-5">b. Pajak Penjualan atas Barang Mewah (PPN) ....................................</div>
            <div class="col-sm-2" style="border: solid 1px;">&nbsp;</div>

        </div>
        <div class="row" style="border: solid 1px; font: 16px">
            <div class="col-sm-12"></div>
            <div class="col-sm-2">Faktur No. :</div>
            <div class="col-sm-2 offset-sm-4" id="idPenagihan"></div>
            <div class="col-sm-1">Sidorarjo, </div>
            <div class="col-sm-3" id="tanggal" style="border: solid 1px; border-left: 0px; border-top: 0px; border-right: 0px;"><center></center></div>
            <div class="col-sm-3 offset-sm-9"><center>Pembeli</center></div>
            <div class="col-sm-3 offset-sm-9"><center>Cap & ttd</center></div>

            <div class="col-sm-5" style="margin-top: 7%">Lembar Ke-1 : Untuk PKP yang menerbitkan Faktur Pajak</div>
            <div class="col-sm-3 offset-sm-4" style="border: solid 1px; border-left: 0px; border-top: 0px; border-right: 0px;"></div>
            <div class="col-sm-12">Lembar Ke-2 : Untuk Pembeli Yang Meretur Barang</div>
            <div class="col-sm-12">Lembar Ke-3 : Untuk Kantor Pelayanan Pajak</div>

        </div>

    </div>
</div>

<script src="{{ asset('js/Accounting/Informasi/CetakNotaKredit.js') }}"></script>
@endsection
