@extends('layouts.appAccounting')
@section('content')
@section('title', 'Cetak Nota dan Faktur')
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

    .faktur {
        display: none;
    }

    .fakturXC {
        display: none;
    }

    .nota {
        display: none;
    }

    .fakturPajak1 {
        display: none;
    }

    .fakturPajak {
        display: none;
    }

    @media print {

        /* Hide everything by default */
        body * {
            visibility: hidden;
        }

        /* Show only elements with the class 'faktur' */
        .faktur,
        .faktur * {
            visibility: visible;
        }

        /* Show only elements with the class 'fakturXC' */
        .fakturXC,
        .fakturXC * {
            visibility: visible;
        }

        .nota,
        .nota * {
            visibility: visible;
        }

        .fakturPajak1,
        .fakturPajak1 * {
            visibility: visible;
        }

        .fakturPajak,
        .fakturPajak * {
            visibility: visible;
        }

        /* Ensure that the elements are positioned correctly */
        .faktur,
        .fakturXC,
        .nota,
        .fakturPajak1,
        .fakturPajak {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            transform-origin: top left;
        }
    }
</style>
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-8 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Cek Nota dan Faktur</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        <!-- Form fields go here -->
                        <div class="card">
                            <div class="d-flex">
                                <div class="col-md-4">
                                    <input type="radio" id="optTunai" name="pilihan" value="optTunai">
                                    <label for="optTunai">Tunai</label>
                                </div>
                                <div class="col-md-4">
                                    <input type="radio" id="optPajakTunai" name="pilihan" value="optPajakTunai">
                                    <label for="optPajakTunai">Faktur Pajak Tunai</label>
                                </div>
                                <div class="col-md-4">
                                    <input type="radio" id="optUM" name="pilihan" value="optUM">
                                    <label for="optUM">Faktur Uang Muka</label>
                                </div>
                            </div>
                            <p>
                            <div class="d-flex">
                                <div class="col-md-4">
                                    <input type="radio" id="optNotaFaktur" name="pilihan" value="optNotaFaktur"
                                        checked>
                                    <label for="optNotaFaktur">Nota/Faktur</label>
                                </div>
                                <div class="col-md-4">
                                    <input type="radio" id="optPajak" name="pilihan" value="optPajak">
                                    <label for="optPajak">Faktur Pajak</label>
                                </div>
                                <div class="col-md-4">
                                    <input type="radio" id="optPajakUM" name="pilihan" value="optPajakUM">
                                    <label for="optPajakUM">Faktur Tunai UM</label>
                                </div>
                            </div>
                            <br>
                            <div class="d-flex">
                                <div class="col-md-4">
                                    <label for="tgl_Penagihan">Tanggal Penagihan</label>
                                </div>
                                <div class="col-md-3">
                                    <input type="date" id="tgl_Penagihan" class="form-control" style="width: 100%">
                                </div>
                            </div>
                            <p>
                            <div class="d-flex">
                                <div class="col-md-4">
                                    <label for="customer">Customer</label>
                                </div>
                                <div class="col-md-7">
                                    <input readonly type="text" id="customer" class="form-control"
                                        style="width: 100%">
                                </div>
                                <div class="col-md-1">
                                    <button id="btnBrowse" class="btn btn-primary form-control">...</button>
                                </div>
                            </div>
                            <p>
                            <div class="d-flex">
                                <div class="col-md-4">
                                    <label for="idPenagihan">Id Penagihan</label>
                                </div>
                                <div class="col-md-7">
                                    <input readonly type="text" id="idPenagihan" class="form-control"
                                        style="width: 100%">
                                </div>
                            </div>
                        </div>
                        <br>
                        <div class="mb-3">
                            <div class="row">
                                <div class="col-1">
                                    <input type="submit" id="btnPrev" name="cetak" value="Cetak"
                                        class="btn btn-primary">
                                </div>
                                {{-- <div class="col-2">
                                    <input type="submit" id="btnKeluar" name="keluar" value="Keluar"
                                        class="btn btn-primary">
                                </div> --}}
                            </div>
                        </div>

                        {{-- nota dan faktur --}}
                        <div class="faktur">

                            <div class="row">
                                <div class="col-sm-12 text-right">
                                    <span id="faktur_IdPenagihan">Id Penagihan</span>
                                </div>
                            </div>

                            <div class="row mt-5">
                                <div class="col-sm-8 text-right">
                                    <label>Nomor Seri Faktur Pajak</label>
                                </div>
                                <div class="col-sm-4 text-right">
                                    <span id="faktur_AreaPPNThnIdFakturPajak">XX . 012 - XX. XXXXXXXXX
                                    </span>
                                </div>
                            </div>

                            <div class="row" style="margin-top: 15%">
                                <div class="col-sm-9 offset-sm-3 text-left">
                                    <span
                                        id="faktur_NamaNPWP">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXNAMAXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-9 offset-sm-3 text-left">
                                    <span
                                        id="faktur_AlamatNPWP">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXALAMATXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-9 offset-sm-3 text-left">
                                    <span id="faktur_NPWP">XXXXXXXXXXXXXXNPWPXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-sm-10 offset-sm-1 text-left">
                                    <span
                                        id="faktur_NamaKelompokUtama">XXXXXXXXXXXXXXKELUTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div id="faktur_Detail"></div>

                            <div class="row mt-3">
                                <div class="col-sm-10 text-left offset-sm-1">
                                    <label><b> Pembayaran mohon ditransfer ke: <br>
                                            Bank OCBC NISP Cab. Diponegoro - Surabaya <br>
                                            a/c. 5578 0000 9333 ( IDR ) <br>
                                            a/n. PT. Kerta Rajasa Raya</b></label>
                                </div>
                            </div>

                            <div class="row mt-4">
                                <div class="col-sm-2 text-left offset-sm-2">
                                    <label><b> XXXXXXXXXXXXXXXXXXXXXXXXXXXX</b></label>
                                </div>
                                <div class="col-sm-1 offset-sm-5 text-right">
                                    <span id="faktur_SymbolGrand">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="faktur_Grand">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-2 offset-sm-10 text-right">
                                    <label>0.00</label>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="faktur_SymbolUM">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="faktur_UM">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="faktur_SymbolDPP">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="faktur_DPP">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-2 text-left offset-sm-1">
                                    <span><b>11%</b></span>
                                </div>
                                <div class="col-sm-1 offset-sm-6 text-right">
                                    <span id="faktur_SymbolPajak">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="faktur_Pajak">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-8 text-left offset-sm-1">
                                    <span
                                        id="faktur_Terbilang">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                                </div>
                                <div class="col-sm-1 text-right" style="font-weight: bold">
                                    <span id="faktur_SymbolTerbayar">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right" style="font-weight: bold">
                                    <span id="faktur_Terbayar">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row" style="font-weight: bold">
                                <div class="col-sm-4 text-left">
                                    <span id="faktur_SyaratBayar">Syarat Pembayaran: &emsp;&emsp;xxxx Hari</span>
                                </div>
                                <div class="col-sm-2 text-center offset-sm-3">
                                    <span>Sidoarjo</span>
                                </div>
                                <div class="col-sm-2 text-left">
                                    <span id="faktur_TglBln">3 Januari</span>
                                </div>
                                <div class="col-sm-1 text-center">
                                    <span id="faktur_Thn">11</span>
                                </div>
                            </div>

                            <div class="row" style="font-weight: bold">
                                <div class="col-sm-12 text-left">
                                    <span id="faktur_Tempo">Jatuh Tempo: &emsp;&emsp; 12/31/1999</span>
                                </div>
                            </div>

                            <div class="row" style="font-weight: bold">
                                <div class="col-sm-12 text-left">
                                    <span id="faktur_SuratJalan">Surat Jalan: &emsp;&emsp;
                                        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                                </div>
                            </div>

                            <div class="row" style="font-weight: bold">
                                <div class="col-sm-8 text-left">
                                    <span
                                        id="faktur_SJ">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                                </div>
                                <div class="col-sm-3 text-center">
                                    <span id="faktur_SJ">RUDY SANTOSO</span>
                                </div>
                            </div>

                        </div>

                        <div class="fakturXC">

                            <div class="row">
                                <div class="col-sm-12 text-right">
                                    <span id="fakturXC_IdPenagihan">Id Penagihan</span>
                                </div>
                            </div>

                            <div class="row mt-5">
                                <div class="col-sm-8 text-right">
                                    <label>Nomor Seri Faktur Pajak</label>
                                </div>
                                <div class="col-sm-4 text-right">
                                    <span id="fakturXC_AreaPPNThnIdFakturPajak">XX . 012 - XX. XXXXXXXXX
                                    </span>
                                </div>
                            </div>

                            <div class="row" style="margin-top: 15%">
                                <div class="col-sm-9 offset-sm-3 text-left">
                                    <span
                                        id="fakturXC_NamaNPWP">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXNAMAXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-9 offset-sm-3 text-left">
                                    <span
                                        id="fakturXC_AlamatNPWP">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXALAMATXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-9 offset-sm-3 text-left">
                                    <span id="fakturXC_NPWP">XXXXXXXXXXXXXXNPWPXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-sm-10 offset-sm-1 text-left">
                                    <span
                                        id="fakturXC_NamaKelompokUtama">XXXXXXXXXXXXXXKELUTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div id="fakturXC_Detail"></div>

                            <div class="row mt-4">
                                <div class="col-sm-6 text-left offset-sm-1">
                                    <span>Tambahan Biaya</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-4 text-left offset-sm-1">
                                    <span>1. Extra Charge Transport</span>
                                </div>
                                <div class="col-sm-7 text-right">
                                    <span id="fakturXC_Dexlite">-5,555,555.55</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-4 text-left offset-sm-1">
                                    <span>2. Storage</span>
                                </div>
                                <div class="col-sm-7 text-right">
                                    <span id="fakturXC_Demurrage">-5,555,555.55</span>
                                </div>
                            </div>

                            <div class="row mt-5">
                                <div class="col-sm-10 text-left offset-sm-1">
                                    <label><b> Pembayaran mohon ditransfer ke: <br>
                                            Bank OCBC NISP Cab. Diponegoro - Surabaya <br>
                                            a/c. 5578 0000 9333 ( IDR ) <br>
                                            a/n. PT. Kerta Rajasa Raya</b></label>
                                </div>
                            </div>

                            <div class="row mt-4">
                                <div class="col-sm-2 text-left offset-sm-2">
                                    <label><b> XXXXXXXXXXXXXXXXXXXXXXXXXXXX</b></label>
                                </div>
                                <div class="col-sm-1 offset-sm-5 text-right">
                                    <span id="fakturXC_SymbolGrand">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturXC_Grand">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-2 offset-sm-10 text-right">
                                    <label>0.00</label>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="fakturXC_SymbolUM">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturXC_UM">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="fakturXC_SymbolDPP">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturXC_DPP">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-2 text-left offset-sm-1">
                                    <span><b>11%</b></span>
                                </div>
                                <div class="col-sm-1 offset-sm-6 text-right">
                                    <span id="fakturXC_SymbolPajak">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturXC_Pajak">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-8 text-left offset-sm-1">
                                    <span
                                        id="fakturXC_Terbilang">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                                </div>
                                <div class="col-sm-1 text-right" style="font-weight: bold">
                                    <span id="fakturXC_SymbolTerbayar">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right" style="font-weight: bold">
                                    <span id="fakturXC_Terbayar">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row" style="font-weight: bold">
                                <div class="col-sm-4 text-left">
                                    <span id="fakturXC_SyaratBayar">Syarat Pembayaran: &emsp;&emsp;xxxx Hari</span>
                                </div>
                                <div class="col-sm-2 text-center offset-sm-3">
                                    <span>Sidoarjo</span>
                                </div>
                                <div class="col-sm-2 text-left">
                                    <span id="fakturXC_TglBln">3 Januari</span>
                                </div>
                                <div class="col-sm-1 text-center">
                                    <span id="fakturXC_Thn">11</span>
                                </div>
                            </div>

                            <div class="row" style="font-weight: bold">
                                <div class="col-sm-12 text-left">
                                    <span id="fakturXC_Tempo">Jatuh Tempo: &emsp;&emsp; 12/31/1999</span>
                                </div>
                            </div>

                            <div class="row" style="font-weight: bold">
                                <div class="col-sm-12 text-left">
                                    <span id="fakturXC_SuratJalan">Surat Jalan: &emsp;&emsp;
                                        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                                </div>
                            </div>

                            <div class="row" style="font-weight: bold">
                                <div class="col-sm-8 text-left">
                                    <span
                                        id="fakturXC_SJ">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                                </div>
                                <div class="col-sm-3 text-center">
                                    <span id="fakturXC_SJ">RUDY SANTOSO</span>
                                </div>
                            </div>

                        </div>

                        <div class="nota">

                            <div class="row" style="font-weight: bold">
                                <div class="col-sm-9 offset-sm-3 text-left">
                                    <span
                                        id="nota_IdPenagihan">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXIdPenagihanXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-sm-9 offset-sm-3 text-left">
                                    <span
                                        id="nota_NamaCust">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXNAMACUStXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col-sm-9 offset-sm-3 text-left">
                                    <span id="nota_Alamat">XXXXXXXXXXXXXXalamatXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>

                            <div class="row" style="margin-top: 15%">
                                <div class="col-sm-10 offset-sm-1 text-left">
                                    <span
                                        id="nota_NamaKelompokUtama">XXXXXXXXXXXXXXKELUTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>

                            <div id="nota_Detail" style="margin-bottom: 25%"></div>

                            <div class="row mt-4" style="font-weight: bold">
                                <div class="col-sm-8 text-left offset-sm-1">
                                    <span
                                        id="nota_Terbilang">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                                </div>
                                <div class="col-sm-1 text-right">
                                    <span id="nota_SymbolGrand">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="nota_Grand">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-4 text-left">
                                    <span id="nota_SyaratBayar">Syarat Pembayaran: &emsp;&emsp;xxxx Hari</span>
                                </div>
                                <div class="col-sm-2 text-center offset-sm-3">
                                    <span>Sidoarjo</span>
                                </div>
                                <div class="col-sm-2 text-left">
                                    <span id="nota_TglBln">3 Januari</span>
                                </div>
                                <div class="col-sm-1 text-center">
                                    <span id="nota_Thn">11</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-12 text-left">
                                    <span id="nota_Tempo">Jatuh Tempo: &emsp;&emsp; 12/31/1999</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-12 text-left">
                                    <span id="nota_SuratJalan">Surat Jalan: &emsp;&emsp;
                                        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-8 text-left">
                                    <span
                                        id="nota_SJ">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
                                </div>
                                <div class="col-sm-3 text-center">
                                    <span id="nota_SJ">YUDI SANTOSO</span>
                                </div>
                            </div>

                        </div>


                        {{-- faktur pajak --}}
                        <div class="fakturPajak1">

                            <div class="row" style="font-weight: bold">
                                <div class="col-sm-12 text-center">
                                    <span id="fakturPajak1_AreaPPNThnIdFakturPajak">XX . 012 - XX. XXXXXXXXX
                                    </span>
                                </div>
                            </div>

                            <div class="row" style="margin-top: 25%">
                                <div class="col-sm-9 offset-sm-3 text-left">
                                    <span
                                        id="fakturPajak1_NamaNPWP">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXNAMAXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4 offset-sm-3 text-left">
                                    <span
                                        id="fakturPajak1_AlamatNPWP">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxXXXXXXXXALAMATXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4 offset-sm-3 text-left">
                                    <span id="fakturPajak1_NPWP">XXXXXXXXXXXXXXNPWPXXXXX</span>
                                </div>
                                <div class="col-sm-4 offset-sm-1 text-left">
                                    <span id="fakturPajak1_NPWP2">XXXXXXXXXXXXXXNPWPXXXXX</span>
                                </div>
                            </div>

                            <div class="row" style="margin-top: 15%">
                                <div class="col-sm-10 offset-sm-1 text-left">
                                    <span
                                        id="fakturPajak1_NamaKelompokUtama">XXXXXXXXXXXXXXKELUTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div id="fakturPajak1_Detail"></div>

                            <div class="row mt-4">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="fakturPajak1_SymbolGrand">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturPajak1_Grand">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="fakturPajak1_Symbol0">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span>0.00</span>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="fakturPajak1_SymbolUM">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturPajak1_UM">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="fakturPajak1_SymbolGrandTot">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturPajak1_GrandTot">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-1 offset-sm-9 text-right">
                                    <span id="fakturPajak1_SymbolPajak">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturPajak1_Pajak">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row mt-4">
                                <div class="col-sm-2 text-center offset-sm-7">
                                    <span>Sidoarjo</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturPajak1_TglBln">3 Januari</span>
                                </div>
                                <div class="col-sm-1 text-center">
                                    <span id="fakturPajak1_Thn">11</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-8 text-center">
                                    <label>-</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-8 text-center">
                                    <label>-</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-8 text-center">
                                    <label>-</label>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <label>YUDI SANTOSO</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-8 text-center">
                                    <label>-</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-8 text-center">
                                    <label>-</label>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <label>MARKETING MANAGER</label>
                                </div>
                            </div>
                        </div>

                        <div class="fakturPajak">

                            <div class="row" style="font-weight: bold">
                                <div class="col-sm-12 text-center">
                                    <span id="fakturPajak_AreaPPNThnIdFakturPajak">XX . 012 - XX. XXXXXXXXX
                                    </span>
                                </div>
                            </div>

                            <div class="row" style="margin-top: 25%">
                                <div class="col-sm-9 offset-sm-3 text-left">
                                    <span
                                        id="fakturPajak_NamaNPWP">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXNAMAXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4 offset-sm-3 text-left">
                                    <span
                                        id="fakturPajak_AlamatNPWP">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxXXXXXXXXALAMATXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4 offset-sm-3 text-left">
                                    <span id="fakturPajak_NPWP">XXXXXXXXXXXXXXNPWPXXXXX</span>
                                </div>
                                <div class="col-sm-4 offset-sm-1 text-left">
                                    <span id="fakturPajak_NPWP2">XXXXXXXXXXXXXXNPWPXXXXX</span>
                                </div>
                            </div>

                            <div class="row" style="margin-top: 15%">
                                <div class="col-sm-10 offset-sm-1 text-left">
                                    <span
                                        id="fakturPajak_NamaKelompokUtama">XXXXXXXXXXXXXXKELUTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                                </div>
                            </div>
                            <div id="fakturPajak_Detail"></div>

                            <div class="row mt-4">
                                <div class="col-sm-1 offset-sm-7 text-right">
                                    <span id="fakturPajak_SymbolGrand">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturPajak_Grand">-5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-2 offset-sm-8 text-right">
                                    <span>0.00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-1 offset-sm-7 text-right">
                                    <span id="fakturPajak_SymbolUM">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturPajak_UM">-5.555.555,00</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturPajak_UMRupiah">Rp. -5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-1 offset-sm-7 text-right">
                                    <span id="fakturPajak_SymbolGrandTot">xxxx</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturPajak_GrandTot">-5.555.555,00</span>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="fakturPajak_TotalRupiah">Rp. -5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-2 offset-sm-10 text-right">
                                    <span id="fakturPajak_Pajak">Rp. -5.555.555,00</span>
                                </div>
                            </div>

                            <div class="row mt-4">
                                <div class="col-sm-2 offset-sm-9 text-right">
                                    <span id="fakturPajak_TglBln">3 Januari</span>
                                </div>
                                <div class="col-sm-1 text-center">
                                    <span id="fakturPajak_Thn">11</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-8 text-center">
                                    <label>-</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-8 text-center">
                                    <label>-</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-8 text-center">
                                    <label>-</label>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <label>YUDI SANTOSO</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-8 text-center">
                                    <label>-</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-8 text-center">
                                    <label>-</label>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <label>MARKETING MANAGER</label>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-8 offset-sm-1">
                                    <span id="fakturPajak_Kurs">Kurs /1 Rp.</span>
                                </div>
                            </div>

                        </div>


                        {{-- Faktur Tunai UM --}}
                        

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('js/Accounting/Informasi/CetakNotadanFaktur.js') }}"></script>
@endsection
