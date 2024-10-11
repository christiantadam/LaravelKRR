@extends('layouts.appAccounting')
@section('content')
@section('title', 'Maintenance DP Pelunasan')

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

    .preview,
    .preview2 {
        display: none;
        /* Initially hide both previews */
    }

    @media print {

        /* Hide everything by default */
        body * {
            visibility: hidden;
        }

        /* Show only elements with the class 'preview' */
        .preview,
        .preview * {
            visibility: visible;
        }

        /* Show only elements with the class 'preview2' */
        .preview2,
        .preview2 * {
            visibility: visible;
        }

        /* Ensure that the elements are positioned correctly */
        .preview,
        .preview2 {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            transform-origin: top left;
        }
    }
</style>

{{-- <div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Maintenance BKM-BKK DP</div>
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @endif
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        <form method="POST" action="{{ url('BKMDPPelunasan') }}" id="formkoreksi">
                            {{ csrf_field() }}
                            <input type="hidden" name="_method" id="methodkoreksi">
                            <!-- Form fields go here -->
                            <div class="d-flex">
                                <div class="col-md-2">
                                    <label for="namaCustomerSelect" style="margin-right: 10px;">Customer</label>
                                </div>
                                <div class="col-md-6">
                                    <select id="namaCustomerSelect" name="namaCustomerSelect" class="form-control">

                                    </select>
                                </div>
                                <div class="col-md-2">
                                    <input type="submit" id="btnOK" name="btnOK" value="OK" class="btn">
                                </div>
                                <input type="text" id="idCustomer" name="idCustomer"
                                    style="margin-right: 10px;"></label>
                            </div>

                            <br>
                            <div>
                                <b>Data Pelunasan</b>
                                <div style="overflow-y: auto; max-height: 400px;">
                                    <table style="width: 240%; table-layout: fixed;" id="tabelDataPelunasan">
                                        <colgroup>
                                            <col style="width: 20%;">
                                            <col style="width: 20%;">
                                            <col style="width: 20%;">
                                            <col style="width: 20%;">
                                            <col style="width: 20%;">
                                            <col style="width: 20%;">
                                            <col style="width: 20%;">
                                            <col style="width: 20%;">
                                            <col style="width: 20%;">
                                            <col style="width: 20%;">
                                            <col style="width: 20%;">
                                            <col style="width: 20%;">
                                        </colgroup>
                                        <thead class="table-dark">
                                            <tr>
                                                <th>Tgl Input</th>
                                                <th>Id. BKM</th>
                                                <th>Id. Bank</th>
                                                <th>Nama Bank</th>
                                                <th>Mata Uang</th>
                                                <th>Customer</th>
                                                <th>Total Pelunasan</th>
                                                <th>Saldo Pelunasan</th>
                                                <th>Id. Pelunasan</th>
                                                <th>Jenis Bank</th>
                                                <th>Id. Uang</th>
                                                <th>Id. Cust</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="card-container" style="display: flex;">
                                <div style="width: 60%;">
                                    <div class="card" style>
                                        <b>BKK</b>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="tanggal" style="margin-right: 10px;">Tanggal</label>
                                            </div>
                                            <div class="col-md-5">
                                                <input type="date" id="tanggal" name="tanggal" class="form-control"
                                                    style="width: 100%" readonly>
                                            </div>
                                            <div class="col-md-2">
                                                <input type="hidden" id="bulan" name="bulan" class="form-control"
                                                    style="width: 100%">
                                            </div>
                                            <div class="col-md-2">
                                                <input type="hidden" id="tahun" name="tahun" class="form-control"
                                                    style="width: 100%">
                                            </div>
                                        </div>
                                        <input type="hidden" name="idPembayaran" id="idPembayaran">
                                        <input type="hidden" name="idPelunasan" id="idPelunasan">
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="idBKK" style="margin-right: 10px;">Id. BKK</label>
                                            </div>
                                            <div class="col-md-4">
                                                <input type="text" id="idBKK" name="idBKK" class="form-control"
                                                    style="width: 100%" readonly>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="text" id="id_bkk" name="id_bkk" class="form-control"
                                                    style="width: 100%" readonly>
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="mataUangSelect" style="margin-right: 10px;">Mata
                                                    Uang</label>
                                            </div>
                                            <div class="col-md-4">
                                                <select id="mataUangSelect" name="mataUangSelect"
                                                    class="form-control" readonly>

                                                </select>
                                            </div>
                                            <div class="col-md-2">
                                                <label for="kursRupiah" style="margin-right: 10px;">Kurs
                                                    Rupiah</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="number" id="kursRupiah" name="kursRupiah"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>

                                        </div>
                                        <input type="hidden" name="idMataUang" id="idMataUang" class="form-control"
                                            style="width: 100%">
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="jumlahUang" style="margin-right: 10px;">Jumlah
                                                    Uang</label>
                                            </div>
                                            <div class="col-md-4">
                                                <input type="number" name="jumlahUang" id="jumlahUang"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="namaBankSelect" style="margin-right: 10px;">Bank</label>
                                            </div>
                                            <div class="col-md-6">
                                                <select id="namaBankSelect" name="namaBankSelect"
                                                    class="form-control" readonly>

                                                </select>
                                            </div>
                                            <!--HIDDEN INPUT-->
                                            <div class="col-md-4">
                                                <input type="hidden" id="idBankBKK" name="idBankBKK"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                            <div class="col-md-4">
                                                <input type="hidden" id="jenisBankBKK" name="jenisBankBKK"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="kodePerkiraan" style="margin-right: 10px;">Kode
                                                    Perkiraan</label>
                                            </div>
                                            <div class="col-md-2">
                                                <input type="number" id="idKodePerkiraanBKK"
                                                    name="idKodePerkiraanBKK" class="form-control"
                                                    style="width: 100%" readonly>
                                            </div>
                                            <div class="col-md-5">
                                                <select id="kodePerkiraanSelectBKK" name="kodePerkiraanSelectBKK"
                                                    class="form-control" readonly>

                                                </select>
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="uraian" style="margin-right: 10px;">Uraian</label>
                                            </div>
                                            <div class="col-md-7">
                                                <input type="text" id="uraian" name="uraian"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                        </div>
                                    </div>

                                    <!--CARD 2-->
                                    <div class="card" style>
                                        <b>BKM</b>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="idBKM" style="margin-right: 10px;">Id. BKM</label>
                                            </div>
                                            <div class="col-md-4">
                                                <input type="text" name="idBKM" id="idBKM"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="text" id="id_bkm" name="id_bkm"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="jumlahUangBKM" style="margin-right: 10px;">Jumlah
                                                    Uang</label>
                                            </div>
                                            <div class="col-md-4">
                                                <input type="number" id="jumlahUangBKM" name="jumlahUangBKM"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="namaBankBKMSelect"
                                                    style="margin-right: 10px;">Bank</label>
                                            </div>
                                            <div class="col-md-5">
                                                <select id="namaBankBKMSelect" name="namaBankBKMSelect"
                                                    class="form-control" readonly>

                                                </select>
                                            </div>
                                            <input type="hidden" id="idBankBKM" name="idBankBKM"
                                                class="form-control" style="width: 100%">
                                            <input type="hidden" id="jenisBankBKM" name="jenisBankBKM"
                                                class="form-control" style="width: 100%">
                                        </div>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="kodePerkiraan" style="margin-right: 10px;">Kode
                                                    Perkiraan</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="number" id="idKodePerkiraanBKM"
                                                    name="idKodePerkiraanBKM" class="form-control"
                                                    style="width: 100%" readonly>
                                            </div>
                                            <div class="col-md-5">
                                                <select id="kodePerkiraanBKMSelect" name="kodePerkiraanBKMSelect"
                                                    class="form-control" readonly>

                                                </select>
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="uraianBKM" style="margin-right: 10px;">Uraian</label>
                                            </div>
                                            <div class="col-md-7">
                                                <input type="text" id="uraianBKM" name="uraianBKM"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                        </div>
                                    </div>
                                    <input type="text" id="konversi" name="konversi" class="form-control"
                                        style="width: 100%">
                                    <input type="text" id="konversi1" name="konversi1" class="form-control"
                                        style="width: 100%">
                                    <input type="text" id="nilai" name="nilai" class="form-control"
                                        style="width: 100%">
                                    <input type="text" id="nilai1" name="nilai1" class="form-control"
                                        style="width: 100%">
                                </div>


                                <!--CARD 2-->
                                <div style="width: 40%;">
                                    <div class="card-body">
                                        <div style="display: flex; justify-content: center;">
                                            <input type="submit" id="btnPilihBKM" value="Pilih BKM"
                                                class="btn btn-primary">
                                        </div>
                                        <br>
                                        <div class="row" style="display: flex; justify-content: center;">
                                            <div style="margin-right: 10px;">
                                                <button type="submit" id="btnProses" name="btnProses"
                                                    class="btn btn-primary">PROSES</button>
                                            </div>
                                            <div style="margin-right: 10px;">
                                                <button type="submit" id="btnKoreksi" name="btnKoreksi"
                                                    class="btn btn-primary">Koreksi</button>
                                            </div>
                                            <div>
                                                <input type="submit" id="btnBatal" name="btnBatal" value="Batal"
                                                    class="btn btn-primary">
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row" style="display: flex; justify-content: center;">
                                            <div style="margin-right: 10px;">
                                                <button type="submit" id="btnTampilBKM" name="btnTampilBKM"
                                                    class="btn btn-primary">Tampil BKM</button>
                                            </div>
                                            <div style="margin-right: 10px;">
                                                <button type="submit" id="btnTampilBKK" name="btnTampilBKK"
                                                    class="btn btn-primary">Tampil BKK</button>
                                            </div>
                                            <div>
                                                <input type="submit" name="tutup" value="TUTUP"
                                                    class="btn btn-primary">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>

                        <!--MODAL TAMPIL BKM-->
                        <div class="modal fade" id="modalTampilBKM" tabindex="-1" role="dialog"
                            aria-labelledby="pilihBankModal" aria-hidden="true">
                            <div class="modal-dialog modal-lg" role="document">
                                <div class="modal-content" style="padding: 25px;">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Cetak BKM DP</h5>
                                        <button type="button" class="close" data-dismiss="modal"
                                            aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <form action="{{ url('BKMDPPelunasan') }}" id="formTampilBKM" method="post">
                                        {{ csrf_field() }}
                                        <input type="hidden" name="_method" id="methodTampilBKM">
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="tanggalInputTampil" style="margin-right: 10px;">Tanggal
                                                    Input</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="date" id="tanggalTampilBKM" name="tanggalTampilBKM"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                            <div class="col-md-1">
                                                S/D
                                            </div>
                                            <div class="col-md-3">
                                                <input type="date" id="tanggalTampilBKM2" name="tanggalTampilBKM2"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                            <div class="col-md-3">
                                                <button id="btnOkTampilBKM" name="btnOkTampilBKM">OK</button>
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="idBKM" style="margin-right: 10px;">Id. BKM</label>
                                            </div>
                                            <div class="col-md-2">
                                                <input type="text" id="idBKMTampil" name="idBKMTampil"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                            <div class="col-md-3">
                                                <button id="btnCetakBKM" name="btnCetakBKM">CETAK</button>
                                            </div>
                                        </div>
                                        <div style="overflow-x: auto; overflow-y: auto; max-height: 250px;">
                                            <table style="width: 120%; table-layout: fixed;"id="tabelTampilBKM">
                                                <colgroup>
                                                    <col style="width: 30%;">
                                                    <col style="width: 30%;">
                                                    <col style="width: 30%;">
                                                    <col style="width: 30%;">
                                                </colgroup>
                                                <thead class="table-dark">
                                                    <tr>
                                                        <th>Tgl. Input</th>
                                                        <th>Id. BKM</th>
                                                        <th>Nilai Pelunasan</th>
                                                        <th>Terjemahan</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                </tbody>
                                            </table>
                                        </div>
                                        <input type="hidden" name="cetak" id="cetak" value="cetakBKM">
                                    </form>
                                </div>
                            </div>
                        </div>

                        <!--MODAL TAMPIL BKK-->
                        <div class="modal fade" id="modalTampilBKK" tabindex="-1" role="dialog"
                            aria-labelledby="pilihBankModal" aria-hidden="true">
                            <div class="modal-dialog modal-lg" role="document">
                                <div class="modal-content" style="padding: 25px;">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Cetak BKK DP</h5>
                                        <button type="button" class="close" data-dismiss="modal"
                                            aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <form action="{{ url('BKMDPPelunasan') }}" id="formTampilBKK" method="post">
                                        {{ csrf_field() }}
                                        <input type="hidden" name="_method" id="methodTampilBKK">
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="tanggalTampilBKK" style="margin-right: 10px;">Tanggal
                                                    Input</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="date" id="tanggalTampilBKK" name="tanggalTampilBKK"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                            <div class="col-md-1">
                                                S/D
                                            </div>
                                            <div class="col-md-3">
                                                <input type="date" id="tanggalTampilBKK2" name="tanggalTampilBKK2"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                            <div class="col-md-3">
                                                <button id="btnOkTampilBKK" name="btnOkTampilBKK">OK</button>
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="idBKK" style="margin-right: 10px;">Id. BKK</label>
                                            </div>
                                            <div class="col-md-2">
                                                <input type="text" id="idBKKTampil" name="idBKKTampil"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                            <div class="col-md-2">
                                                <button id="btnCetakBKK" name="btnCetakBKK">CETAK</button>
                                            </div>
                                            <div class="col-md-5">
                                                <input type="text" id="tglCetakBKK" name="tglCetakBKK"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                        </div>
                                        <div style="overflow-x: auto; overflow-y: auto; max-height: 250px;">
                                            <table style="width: 120%; table-layout: fixed;" id="tabelTampilBKK">
                                                <colgroup>
                                                    <col style="width: 30%;">
                                                    <col style="width: 30%;">
                                                    <col style="width: 30%;">
                                                    <col style="width: 30%;">
                                                </colgroup>
                                                <thead class="table-dark">
                                                    <tr>
                                                        <th>Tgl. Input</th>
                                                        <th>Id. BKK</th>
                                                        <th>Nilai Pelunasan</th>
                                                        <th>Terjemahan</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                        <input type="hidden" name="cetak" id="cetak" value="cetakBKK">

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> --}}

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Maintenance BKM-BKK DP</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        {{-- <form method="POST" action=""> --}}
                        {{-- @csrf --}}
                        <!-- Form fields go here -->
                        <div class="card-container">
                            <div style="width: 100%;">

                                <div class="d-flex">
                                    <div class="col-md-3 mt-3">
                                        <h6><strong>Data Pelunasan</strong></h6>
                                    </div>
                                    <div class="col-md-1">
                                        <label for="mataUangSelect">Customer</label>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="text" id="cust" class="form-control" readonly>
                                        <input type="text" id="idCust" class="form-control" readonly hidden>
                                        <input type="text" id="thn1" class="form-control" readonly hidden>
                                        <input type="text" id="bln1" class="form-control" readonly hidden>
                                    </div>
                                    <div class="col-md-1">
                                        <button id="btnCust" name="btnCust" class="btn btn-primary">...</button>
                                    </div>
                                    <div class="col-md-1">
                                        <button id="btnOk" name="btnOk" class="btn btn-primary">OK</button>
                                    </div>
                                </div>
                                <div class="row mb-2" style="margin-top: 0.5%">
                                    <div class="col-sm-12">
                                        <div class="table-responsive fixed-height">
                                            <table class="table table-bordered no-wrap-header" id="tableData">
                                                <thead>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="d-flex" style="width: 100%;">
                                <div style="width: 60%">
                                    <div class="card" style>
                                        <b>BKK</b>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="tglInput" style="margin-right: 10px;">Tanggal</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="date" id="tglInput" name="tanggalInput" readonly
                                                    class="form-control" style="width: 100%">
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="idBKK" style="margin-right: 10px;">Id. BKK</label>
                                            </div>
                                            <div class="col-md-4">
                                                <input type="text" id="idBKK" name="idBKK" class="form-control"
                                                    style="width: 100%" readonly>
                                            </div>
                                        </div>

                                        <input type="text" id="idUang" class="form-control" style="display: none">

                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="mataUangSelect" style="margin-right: 10px;">Mata
                                                    Uang</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="text" id="mataUang" class="form-control" readonly>
                                            </div>
                                            <div class="col-md-1">
                                                <button id="btnMataUang" name="btnMataUang1" disabled
                                                    class="btn btn-primary">...</button>
                                            </div>
                                            <div class="col-md-1">
                                                <label for="mataUangSelect" style="margin-right: 10px;">Kurs</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="text" id="kurs" class="form-control" readonly>
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="jumlahUang" style="margin-right: 10px;">Jumlah Uang</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="text" id="jenisBank1" class="form-control" readonly
                                                    style="display: none">
                                                <input type="text" id="uang1" name="uang1" class="form-control"
                                                    readonly style="width: 100%">
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="namaBankSelect" style="margin-right: 10px;">Bank</label>
                                            </div>
                                            <div class="col-md-4">
                                                <input type="text" id="idBank1" class="form-control"
                                                    style="display: none">
                                                <input type="text" id="bank1" class="form-control" readonly>
                                            </div>
                                            <div class="col-md-2">
                                                <button id="btnBank1" name="btnBank1" class="btn btn-primary"
                                                    disabled>...</button>
                                            </div>
                                        </div>

                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="kodePerkiraan" style="margin-right: 10px;">Kode
                                                    Perkiraan</label>
                                            </div>
                                            <div class="col-md-2">
                                                <input type="text" id="idPerkiraan1" name="idPerkiraan1"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                            <div class="col-md-5">
                                                <input type="text" id="perkiraan1" name="perkiraan1"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                            <div class="col-md-3">
                                                <button id="btnPerkiraan1" name="btnPerkiraan1" disabled
                                                    class="btn btn-primary">...</button>
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="uraian" style="margin-right: 10px;">Uraian</label>
                                            </div>
                                            <div class="col-md-7">
                                                <input type="text" id="uraian1" name="uraian1"
                                                    class="form-control" readonly style="width: 100%">
                                            </div>
                                        </div>
                                    </div>

                                    <!--CARD 2-->
                                    {{-- <div class="card disabled" id="cardBKM"> --}}
                                    <div class="card">
                                        <b>BKM</b>

                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="idBKK" style="margin-right: 10px;">Id. BKM</label>
                                            </div>
                                            <div class="col-md-4">
                                                <input type="text" id="idBKM" name="idBKM" readonly
                                                    class="form-control" style="width: 100%">
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="jumlahUang" style="margin-right: 10px;">Jumlah
                                                    Uang</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="text" id="uang" name="uang"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>

                                        </div>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="namaBankSelect" style="margin-right: 10px;">Bank</label>
                                            </div>
                                            <div class="col-md-4">
                                                <input type="text" id="idBank" class="form-control"
                                                    style="display: none">
                                                <input type="text" id="jenisBank" class="form-control"
                                                    style="display: none">
                                                <input type="text" id="bank" class="form-control" readonly>
                                            </div>
                                            <div class="col-md-3">
                                                <button id="btnBank" name="btnBank" class="btn btn-primary"
                                                    disabled>...</button>
                                            </div>

                                        </div>

                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="kodePerkiraan" style="margin-right: 10px;">Kode
                                                    Perkiraan</label>
                                            </div>
                                            <div class="col-md-2">
                                                <input type="text" id="idPerkiraan" name="idPerkiraan"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                            <div class="col-md-5">
                                                <input type="text" id="perkiraan" name="perkiraan"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                            <div class="col-md-3">
                                                <button id="btnPerkiraan" name="btnPerkiraan" class="btn btn-primary"
                                                    disabled>...</button>
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="uraian" style="margin-right: 10px;">Uraian</label>
                                            </div>
                                            <div class="col-md-7">
                                                <input type="text" id="uraian" name="uraian" readonly
                                                    class="form-control" style="width: 100%">
                                            </div>
                                        </div>
                                    </div>

                                    <input type="text" id="bln" name="bln" readonly
                                        class="form-control" hidden style="width: 100%">
                                    <input type="text" id="thn" name="thn" readonly
                                        class="form-control" hidden style="width: 100%">
                                </div>

                                <div style="width: 40%">
                                    <div class="row mt-5">
                                        <div class="col-md-2 offset-sm-2">
                                            <input type="submit" name="proses" id="btnPilih" value="Pilih BKM"
                                                class="btn btn-primary">
                                        </div>
                                    </div>
                                    <div class="row" style="margin-top: 30%">
                                        <div class="col-md-2 offset-sm-2">
                                            <input type="submit" name="proses" id="btnProses" value="Proses"
                                                class="btn btn-primary">
                                        </div>
                                        <div class="col-md-2">
                                            <input type="submit" id="btnKoreksiForm" name="btnKoreksi"
                                                value="KOREKSI" class="btn btn-primary">
                                        </div>
                                        <div class="col-md-2">
                                            <input type="submit" id="btnBatal" name="btnBatal" value="Batal"
                                                class="btn btn-primary d-flex ml-auto">
                                        </div>

                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-md-2 offset-sm-2">
                                            <input type="submit" id="btnTampilBKM" name="btnTampilBKM"
                                                value="TampilBKM" class="btn btn-primary d-flex ml-auto">
                                        </div>
                                        <div class="col-md-2" style="padding-left: 30px">
                                            <input type="submit" id="btnTampilBKK" name="btnTampilBKK"
                                                value="TampilBKK" class="btn btn-primary d-flex ml-auto">
                                        </div>
                                    </div>
                                </div>

                                <!--CARD 2-->
                            </div>
                        </div>

                        {{-- print voucher --}}
                        <div class="preview">
                            <div class="row">
                                <div class="col-sm-12">
                                    <label><b>Receipt Voucher</b></label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <label><b>PT. Kerta Rajasa Raya</b></label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-1">
                                    <label>Name</label>
                                </div>
                                <div class="col-sm-6">
                                    <span id="namaCetakBKM">: Nama di sini</span>
                                </div>
                                <div class="col-sm-2">
                                    <label>Voucher</label>
                                </div>
                                <div class="col-sm-3">
                                    <span id="voucherCetakBKM">: Voucher di sini</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-1">
                                    <label>Description</label>
                                </div>
                                <div class="col-sm-6">
                                    <span id="descriptionCetakBKM">: Description di sini</span>
                                </div>
                                <div class="col-sm-2">
                                    <label>Posted On</label>
                                </div>
                                <div class="col-sm-3">
                                    <span id="postedCetakBKM">: Posted ON di sini</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-1">
                                    <label>Date</label>
                                </div>
                                <div class="col-sm-6">
                                    <span id="dateCetakBKM">: Date di sini</span>
                                </div>
                                <div class="col-sm-2">
                                    <label>Received From</label>
                                </div>
                                <div class="col-sm-3">
                                    <span id="receivedCetakBKM">: Received From di sini</span>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-sm-2 text-center underline">
                                    <label>C.O.A</label>
                                </div>
                                <div class="col-sm-4 text-center underline">
                                    <label>Account Name</label>
                                </div>
                                <div class="col-sm-4 text-center underline">
                                    <label>Description</label>
                                </div>
                                <div class="col-sm-2 text-right underline">
                                    <span id="amountBKM">Amount</span>
                                </div>
                            </div>
                            <div id="bkmDetailsContainer" style="margin-top: -0.5%"></div>
                            {{-- <div class="row">
                                <div class="col-sm-2 text-center underline">
                                    <span id="coaListBKM">data coa</span>
                                </div>
                                <div class="col-sm-4 text-center underline">
                                    <span id="accountListBKM">data account</span>
                                </div>
                                <div class="col-sm-4 text-center underline">
                                    <span id="descriptionListBKM">data Description</span>
                                </div>
                                <div class="col-sm-2 text-right underline">
                                    <span id="amountListBKM">data Amount</span>
                                </div>
                            </div> --}}
                            <div class="row">
                                <div class="col-sm-2 text-right offset-sm-8">
                                    <label>TOTAL =</label>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="totalAmountBKM">total amountBKM</span>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-sm-4 text-center">
                                    <label>Receiver</label>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <label>Cashier</label>
                                </div>
                                <div class="col-sm-4 text-center">
                                    <label>Responsible Person</label>
                                </div>
                            </div>

                            <div class="row mt-5">
                                <div class="col-sm-2 offset-sm-1 text-center underline">
                                </div>
                                <div class="col-sm-2 offset-sm-2 text-center underline">
                                </div>
                                <div class="col-sm-2 offset-sm-2 text-center underline">
                                </div>
                            </div>
                        </div>
                        {{-- end tampil voucher --}}

                        {{-- tampil bkk --}}
                        {{-- print voucher --}}
                        <div class="preview2">
                            <div class="row">
                                <div class="col-sm-12">
                                    <label><b>Payment Voucher</b></label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <label><b>PT. Kerta Rajasa Raya</b></label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-1">
                                    <label>Name</label>
                                </div>
                                <div class="col-sm-3">
                                    <span id="namaCetakBKK">: Nama di sini</span>
                                </div>
                                <div class="col-sm-1">
                                    <label>Date</label>
                                </div>
                                <div class="col-sm-3">
                                    <span id="dateCetakBKK">: Date di sini</span>
                                </div>
                                <div class="col-sm-1">
                                    <label>Voucher</label>
                                </div>
                                <div class="col-sm-3">
                                    <span id="voucherCetakBKK">: Voucher di sini</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-1">
                                    <label>Description</label>
                                </div>
                                <div class="col-sm-3">
                                    <span id="descriptionCetakBKK">: Description di sini</span>
                                </div>
                                <div class="col-sm-1">
                                    <label>Paid To</label>
                                </div>
                                <div class="col-sm-3">
                                    <span id="paidCetakBKK">: Paid To di sini</span>
                                </div>
                                <div class="col-sm-1">
                                    <label>Posted On</label>
                                </div>
                                <div class="col-sm-3">
                                    <span id="postedCetakBKK">: Posted On di sini</span>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-sm-2 text-center underline">
                                    <label>C.O.A</label>
                                </div>
                                <div class="col-sm-3 text-center underline">
                                    <label>Account Name</label>
                                </div>
                                <div class="col-sm-3 text-center underline">
                                    <label>Description</label>
                                </div>
                                <div class="col-sm-2 text-center underline">
                                    <label>CEK/BG No.</label>
                                </div>
                                <div class="col-sm-2 text-right underline">
                                    <span id="amountBKK">Amount</span>
                                </div>
                            </div>
                            <div id="bkkDetailsContainer" style="margin-top: -0.5%"></div>
                            <div class="row">
                                <div class="col-sm-2 text-right offset-sm-8">
                                    <label>TOTAL =</label>
                                </div>
                                <div class="col-sm-2 text-right">
                                    <span id="totalAmountBKK">total amount BKK</span>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-sm-3 text-center">
                                    <label>Receiver</label>
                                </div>
                                <div class="col-sm-3 text-center">
                                    <label>Cashier</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-3 text-left offset-sm-6">
                                    <label>Note: </label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6 offset-sm-6">
                                    <span id="batalNote">batal</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6 offset-sm-6">
                                    <span id="alasanNote">alasan</span>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-1 offset-sm-1 text-center underline">
                                </div>
                                <div class="col-sm-1 offset-sm-2 text-center underline">
                                </div>
                            </div>
                        </div>
                        {{-- end tampil bkk --}}
                        {{-- </form> --}}


                        {{-- modal tampil bkm --}}
                        <div class="modal fade bd-example-modal-lg" id="modalListBKM" tabindex="-1" role="dialog"
                            aria-labelledby="myLargeModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Cetak BKM Transitoris</h5>
                                    </div>
                                    <div class="modal-body">
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <label for="bankBg">Tanggal Input</label>
                                            </div>
                                            <div class="col-sm-3">
                                                <input type="date" id="tglAwalBKM" class="form-control">
                                            </div>
                                            <div class="col-sm-1">
                                                <label>S/D</label>
                                            </div>
                                            <div class="col-sm-3">
                                                <input type="date" id="tglAkhirBKM" class="form-control">
                                            </div>
                                            <div class="col-sm-2">
                                                <input type="submit" id="btnOkBKM" value="OK"
                                                    class="btn btn-primary d-flex ml-auto">
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-sm-3">
                                                <label for="bankBg">Id. BKM</label>
                                            </div>
                                            <div class="col-sm-3">
                                                <input type="text" id="idCetakBKM" readonly class="form-control">
                                            </div>
                                            <div class="col-sm-2">
                                                <input type="submit" id="btnCetakBKM" value="CETAK"
                                                    class="btn btn-primary d-flex ml-auto">
                                            </div>
                                        </div>

                                        <div class="row mb-2" style="margin-top: 0.5%">
                                            <div class="col-sm-12">
                                                <div class="table-responsive fixed-height">
                                                    <table class="table table-bordered no-wrap-header"
                                                        id="tableListBKM">
                                                        <thead>
                                                        </thead>
                                                        <tbody>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary"
                                            data-bs-dismiss="modal">TUTUP</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {{-- modal tampil bkk --}}
                        <div class="modal fade bd-example-modal-lg" id="modalListBKK" tabindex="-1" role="dialog"
                            aria-labelledby="myLargeModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Cetak BKK Transitoris</h5>
                                    </div>
                                    <div class="modal-body">
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <label for="bankBg">Tanggal Input</label>
                                            </div>
                                            <div class="col-sm-3">
                                                <input type="date" id="tglAwalBKK" class="form-control">
                                            </div>
                                            <div class="col-sm-1">
                                                <label>S/D</label>
                                            </div>
                                            <div class="col-sm-3">
                                                <input type="date" id="tglAkhirBKK" class="form-control">
                                            </div>
                                            <div class="col-sm-2">
                                                <input type="submit" id="btnOkBKK" value="OK"
                                                    class="btn btn-primary d-flex ml-auto">
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-sm-3">
                                                <label for="bankBg">Id. BKK</label>
                                            </div>
                                            <div class="col-sm-3">
                                                <input type="text" id="idCetakBKK" readonly class="form-control">
                                            </div>
                                            <div class="col-sm-2">
                                                <input type="submit" id="btnCetakBKK" value="CETAK"
                                                    class="btn btn-primary d-flex ml-auto">
                                            </div>
                                        </div>

                                        <div class="row mb-2" style="margin-top: 0.5%">
                                            <div class="col-sm-12">
                                                <div class="table-responsive fixed-height">
                                                    <table class="table table-bordered no-wrap-header"
                                                        id="tableListBKK">
                                                        <thead>
                                                        </thead>
                                                        <tbody>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary"
                                            data-bs-dismiss="modal">TUTUP</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="{{ asset('js/Accounting/Piutang/BKMDPPelunasan.js') }}"></script>
@endsection
