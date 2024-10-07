@extends('layouts.appAccounting')
@section('content')
@section('title', 'BKM Transitoris Bank')

<style>
    .table-responsive.fixed-height tbody {
        background-color: white;
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
</style>

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Maintenance BKM Transistoris Bank</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        {{-- <form method="POST" action=""> --}}
                        {{-- @csrf --}}
                        <!-- Form fields go here -->
                        <div class="card-container" style="display: flex;">
                            <div style="width: 60%;">
                                <div class="card" style>
                                    <b>BKK</b>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="tanggalInput" style="margin-right: 10px;">Tanggal</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="date" id="tanggalInput" name="tanggalInput"
                                                class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-3">
                                            Wajib di-ENTER
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

                                    <input type="text" id="listBiaya" class="form-control" style="display: none">
                                    <input type="text" id="idUang1" class="form-control" style="display: none">
                                    <input type="text" id="symbol1" class="form-control" style="display: none">

                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="mataUangSelect" style="margin-right: 10px;">Mata
                                                Uang</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="text" id="mataUang1" class="form-control" readonly>
                                        </div>
                                        <div class="col-md-3">
                                            <button id="btnMataUang1" name="btnMataUang1"
                                                class="btn btn-primary">...</button>
                                        </div>
                                    </div>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="jumlahUang" style="margin-right: 10px;">Jumlah Uang</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="text" id="jenisBank1" class="form-control"
                                                style="display: none">
                                            <input type="text" id="uang1" name="uang1" class="form-control"
                                                style="width: 100%">
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
                                            <button id="btnBank1" name="btnBank1" class="btn btn-primary">...</button>
                                        </div>
                                        <div class="col-md-3">
                                            <button id="btnBiaya" name="btnBiaya" class="btn btn-primary"
                                                disabled>Tambah Biaya</button>
                                        </div>
                                    </div>

                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="namaBankSelect" style="margin-right: 10px;">Jenis
                                                Pembayaran</label>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="text" id="idJenisBayar1" class="form-control"
                                                style="display: none">
                                            <input type="text" id="jenisBayar1" class="form-control" readonly>
                                        </div>
                                        <div class="col-md-3">
                                            <button id="btnJenisBayar1" name="btnJenisBayar1"
                                                class="btn btn-primary">...</button>
                                        </div>
                                        <div class="col-md-3">
                                            <button id="btnBG" name="btnBG" class="btn btn-primary"
                                                disabled>Detail BG/CEK/Transfer/DBT</button>
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
                                            <button id="btnPerkiraan1" name="btnPerkiraan1"
                                                class="btn btn-primary">...</button>
                                        </div>
                                    </div>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="uraian" style="margin-right: 10px;">Uraian</label>
                                        </div>
                                        <div class="col-md-7">
                                            <input type="text" id="uraian1" name="uraian1" class="form-control"
                                                style="width: 100%">
                                        </div>
                                    </div>
                                </div>

                                <!--CARD 2-->
                                {{-- <div class="card disabled" id="cardBKM"> --}}
                                <div class="card">
                                    <b>BKM</b>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="tanggal" style="margin-right: 10px;">Tanggal</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="date" id="tgl" name="tgl" readonly
                                                class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-3">
                                            Wajib di-ENTER
                                        </div>
                                    </div>

                                    <input type="text" id="listBiaya1" class="form-control"
                                        style="display: none">
                                    <input type="text" id="idUang" class="form-control" style="display: none">
                                    <input type="text" id="symbol" class="form-control" style="display: none">

                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="idBKK" style="margin-right: 10px;">Id. BKK</label>
                                        </div>
                                        <div class="col-md-4">
                                            <input type="text" id="idBKM" name="idBKM" readonly
                                                class="form-control" style="width: 100%">
                                        </div>
                                    </div>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="mataUangSelect" style="margin-right: 10px;">Mata
                                                Uang</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="text" id="mataUang" class="form-control" readonly>
                                        </div>
                                        <div class="col-md-1">
                                            <button id="btnMataUang" name="btnMataUang" class="btn btn-primary"
                                                disabled>...</button>
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
                                            <label for="jumlahUang" style="margin-right: 10px;">Jumlah
                                                Uang</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="text" id="uang" name="uang" class="form-control"
                                                style="width: 100%" readonly>
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
                                            <label for="namaBankSelect" style="margin-right: 10px;">Jenis
                                                Pembayaran</label>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="text" id="idJenisBayar" class="form-control"
                                                style="display: none">
                                            <input type="text" id="jenisBayar" class="form-control" readonly>
                                        </div>
                                        <div class="col-md-3">
                                            <button id="btnJenisBayar" name="btnJenisBayar" class="btn btn-primary"
                                                disabled>...</button>
                                        </div>
                                        <div class="col-md-3">
                                            <button id="btnBiaya1" name="btnBiaya1" class="btn btn-primary"
                                                disabled>Tambah Biaya</button>
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
                            </div>

                            <input type="text" id="bln" name="bln" readonly class="form-control" hidden
                                style="width: 100%">
                            <input type="text" id="thn" name="thn" readonly class="form-control" hidden
                                style="width: 100%">

                            <!--CARD 2-->
                            <div style="width: 40%;">
                                <div class="col-md-12">
                                    <h6><strong>Detail Biaya BKK</strong></h6>
                                </div>
                                <div class="row mb-2" style="margin-top: 0.5%">
                                    <div class="col-sm-12">
                                        <div class="table-responsive fixed-height">
                                            <table class="table table-bordered no-wrap-header"
                                                id="tableDetailBiayaBKK">
                                                <thead>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12 mb-4">
                                    <button type="button" id="btnKoreksi" class="btn btn-primary">Koreksi
                                        Biaya</button>
                                    <button type="button" id="btnHapus" class="btn btn-danger">Hapus Biaya</button>
                                </div>

                                <div class="col-md-12">
                                    <h6><strong>Detail BG/CEK/TRANSFER BKK</strong></h6>
                                </div>
                                <div class="row mb-2" style="margin-top: 0.5%">
                                    <div class="col-sm-12">
                                        <div class="table-responsive fixed-height">
                                            <table class="table table-bordered no-wrap-header" id="tableBg">
                                                <thead>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12 mb-4">
                                    <button type="button" id="btnKoreksiBg" class="btn btn-primary">Koreksi No
                                        BG</button>
                                    <button type="button" id="btnHapusBg" class="btn btn-danger">Hapus BG</button>
                                </div>

                                <div class="col-md-12">
                                    <h6><strong>Detail Biaya BKM</strong></h6>
                                </div>
                                <div class="row" style="margin-top: 0.5%">
                                    <div class="col-sm-12">
                                        <div class="table-responsive fixed-height">
                                            <table class="table table-bordered no-wrap-header"
                                                id="tableDetailBiayaBKM">
                                                <thead>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <button type="button" id="btnKoreksi2" class="btn btn-primary">Koreksi
                                        Biaya</button>
                                    <button type="button" id="btnHapus2" class="btn btn-danger">Hapus Biaya</button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="row">
                                <div class="col-md-1">
                                    <input type="submit" name="proses" id="btnProses" value="Proses" class="btn btn-primary">
                                </div>
                                <div class="col-md-1">
                                    <input type="submit" id="btnKoreksiForm" name="btnKoreksi" value="KOREKSI"
                                        class="btn btn-primary">
                                </div>
                                <div class="col-md-1">
                                    <input type="submit" id="btnBatal" name="btnBatal" value="Batal"
                                        class="btn btn-primary d-flex ml-auto">
                                </div>
                                <div class="col-md-1">
                                    <input type="submit" id="btnTampilBKM" name="btnTampilBKM" value="TampilBKM"
                                        class="btn btn-primary d-flex ml-auto">
                                </div>
                                <div class="col-md-1" style="padding-left: 30px">
                                    <input type="submit" id="btnTampilBKK" name="btnTampilBKK" value="TampilBKK"
                                        class="btn btn-primary d-flex ml-auto">
                                </div>
                            </div>
                        </div>
                        {{-- </form> --}}

                        {{-- modal bg --}}
                        <div class="modal fade bd-example-modal-lg" id="modalBg" tabindex="-1" role="dialog"
                            aria-labelledby="myLargeModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Maintenance Detail BG/CEK/TRANSFER/DBT LSG</h5>
                                    </div>
                                    <div class="modal-body">
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <label for="bankBg">Bank</label>
                                            </div>
                                            <div class="col-sm-3">
                                                <input type="text" id="bankBg" name="bankBg" readonly
                                                    class="form-control">
                                            </div>
                                        </div>
                                        <div class="row pt-1">
                                            <div class="col-sm-3">
                                                <label for="jenisBg">Jenis Pembayaran</label>
                                            </div>
                                            <div class="col-sm-5">
                                                <input type="text" id="jenisBg" name="jenisBg" readonly
                                                    class="form-control">
                                            </div>
                                        </div>
                                        <div class="row pt-1">
                                            <div class="col-sm-3">
                                                <label for="noBg">Nomer</label>
                                            </div>
                                            <div class="col-sm-7">
                                                <input type="text" id="noBg" name="noBg"
                                                    class="form-control">
                                            </div>
                                        </div>
                                        <div class="row pt-1">
                                            <div class="col-sm-3">
                                                <label for="jatuhTempo">Jatuh Tempo</label>
                                            </div>
                                            <div class="col-sm-3">
                                                <input type="date" id="jatuhTempo" name="jatuhTempo"
                                                    class="form-control">
                                            </div>
                                        </div>
                                        <div class="row pt-1">
                                            <div class="col-sm-3">
                                                <label for="cetak">Status Cetak [T.O.S]</label>
                                            </div>
                                            <div class="col-sm-2">
                                                <input type="text" id="cetak" name="cetak"
                                                    class="form-control">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" id="btnProsesBg"
                                            class="btn btn-primary">PROSES</button>
                                        <button type="button" class="btn btn-secondary"
                                            data-bs-dismiss="modal">TUTUP</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {{-- modal biaya --}}
                        <div class="modal fade bd-example-modal-lg" id="modalBiaya" tabindex="-1" role="dialog"
                            aria-labelledby="myLargeModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Maintenance Biaya BKK Transitoris</h5>
                                    </div>
                                    <div class="modal-body">
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <label for="bankBg">Jumlah Biaya</label>
                                            </div>
                                            <div class="col-sm-5">
                                                <input type="text" id="nilaiPelunasanBiaya" name="bankBg"
                                                    class="form-control">
                                                <input type="text" id="KeA" name="bankBg" hidden readonly
                                                    class="form-control">
                                                <input type="text" id="formListBiaya" name="bankBg" hidden
                                                    readonly class="form-control">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-3">
                                                <label for="kodePerkiraan" style="margin-right: 10px;">Kode
                                                    Perkiraan</label>
                                            </div>
                                            <div class="col-md-2">
                                                <input type="text" id="idPerkiraanBiaya" name="idPerkiraanBiaya"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                            <div class="col-md-5">
                                                <input type="text" id="perkiraanBiaya" name="perkiraanBiaya"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                            <div class="col-md-2">
                                                <button id="btnPerkiraanBiaya" name="btnPerkiraanBiaya"
                                                    class="btn btn-primary">...</button>
                                            </div>
                                        </div>
                                        <div class="row pt-1">
                                            <div class="col-sm-3">
                                                <label for="noBg">keterangan</label>
                                            </div>
                                            <div class="col-sm-7">
                                                <input type="text" id="keteranganBiaya" name="keteranganBiaya"
                                                    class="form-control">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" id="btnProsesBiaya"
                                            class="btn btn-primary">PROSES</button>
                                        <button type="button" class="btn btn-secondary"
                                            data-bs-dismiss="modal">TUTUP</button>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {{-- modal biaya 1 --}}
                        <div class="modal fade bd-example-modal-lg" id="modalBiaya1" tabindex="-1" role="dialog"
                            aria-labelledby="myLargeModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Maintenance Biaya BKK Transitoris</h5>
                                    </div>
                                    <div class="modal-body">
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <label for="bankBg">Jumlah Biaya</label>
                                            </div>
                                            <div class="col-sm-5">
                                                <input type="text" id="nilaiPelunasanBiaya1" name="bankBg"
                                                    class="form-control">
                                                <input type="text" id="KeA1" name="bankBg" hidden readonly
                                                    class="form-control">
                                                <input type="text" id="formListBiaya1" name="bankBg" hidden
                                                    readonly class="form-control">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-3">
                                                <label for="kodePerkiraan1" style="margin-right: 10px;">Kode
                                                    Perkiraan</label>
                                            </div>
                                            <div class="col-md-2">
                                                <input type="text" id="idPerkiraanBiaya1" name="idPerkiraanBiaya"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                            <div class="col-md-5">
                                                <input type="text" id="perkiraanBiaya1" name="perkiraanBiaya"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                            <div class="col-md-2">
                                                <button id="btnPerkiraanBiaya1" name="btnPerkiraanBiaya"
                                                    class="btn btn-primary">...</button>
                                            </div>
                                        </div>
                                        <div class="row pt-1">
                                            <div class="col-sm-3">
                                                <label for="noBg">keterangan</label>
                                            </div>
                                            <div class="col-sm-7">
                                                <input type="text" id="keteranganBiaya1" name="keteranganBiaya"
                                                    class="form-control">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" id="btnProsesBiaya1"
                                            class="btn btn-primary">PROSES</button>
                                        <button type="button" class="btn btn-secondary"
                                            data-bs-dismiss="modal">TUTUP</button>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <!--MODAL TAMBAH BIAYA BKK-->
                        <div class="modal fade" id="modalTambahBiaya" tabindex="-1" role="dialog"
                            aria-labelledby="pilihBankModal" aria-hidden="true">
                            <div class="modal-dialog modal-lg" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="pilihBankModal">Maintenance Biaya BKK Transitoris
                                        </h5>
                                        <button type="button" class="close" data-dismiss="modal"
                                            aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <form action="{{ url('BKMTransitorisBank') }}" id="formTambahBiaya"
                                        method="POST">
                                        {{ csrf_field() }}
                                        <input type="hidden" name="_method" id="methodTambahBiaya">
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="jumlahBiaya" style="margin-right: 10px;">Jumlah
                                                    Biaya</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="text" id="jumlahBiaya" name="jumlahBiaya"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                            {{-- <input type="hidden" name="idcoba" id="idcoba" value="idcoba"> --}}
                                        </div>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="kodePerkiraanTambahBiayaSelect"
                                                    style="margin-right: 10px;">Kode Perkiraan</label>
                                            </div>
                                            <div class="col-md-2">
                                                <input type="text" id="idKodePerkiraanTambahBiaya"
                                                    name="idKodePerkiraanKrgLbh" class="form-control"
                                                    style="width: 100%">
                                            </div>
                                            <div class="col-md-7">
                                                <select name="kodePerkiraanTambahBiayaSelect"
                                                    id="kodePerkiraanTambahBiayaSelect" class="form-control">

                                                </select>
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="keterangan" style="margin-right: 10px;">Keterangan</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="text" id="keterangan" name="keterangan"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-5">
                                                <input type="submit" id="btnProsesTambahBiaya"
                                                    name="btnProsesTambahBiaya" value="Proses"
                                                    class="btn btn-primary">
                                            </div>
                                            <div class="col-3">
                                            </div>
                                            <div class="col-4">
                                                <input type="submit" id="btnTutupModal" name="btnTutupModal"
                                                    value="Tutup" class="btn btn-primary">
                                            </div>
                                        </div>
                                        <input type="hidden" name="detpelunasan" id="detpelunasan"
                                            value="detkuranglebih">
                                </div>
                                </form>
                            </div>
                        </div>

                        <!--MODAL DETAIL BG/CEK/TRANSFER/DBT-->
                        <div class="modal fade" id="modalDetailBG" tabindex="-1" role="dialog"
                            aria-labelledby="pilihBankModal" aria-hidden="true">
                            <div class="modal-dialog modal-lg" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Maintenance Detail BG/CEK/TRANSFER/DBT LSG</h5>
                                        <button type="button" class="close" data-dismiss="modal"
                                            aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <form action="{{ url('BKMTransitorisBank') }}" id="formDetailBG" method="POST">
                                        {{ csrf_field() }}
                                        <input type="hidden" name="_method" id="methodDetailBG">
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="bank" style="margin-right: 10px;">Bank</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="text" id="bank" name="bank"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="jenisPembayaran" style="margin-right: 10px;">Jenis
                                                    Pembayaran</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="text" id="jenisPembayaran" name="jenisPembayaran"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="nomor" style="margin-right: 10px;">Nomor</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="text" id="nomor" name="nomor"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="jatuhTempo" style="margin-right: 10px;">Jatuh
                                                    Tempo</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="date" id="jatuhTempo" name="jatuhTempo"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="statusCetak" style="margin-right: 10px;">Status Cetak
                                                    [T,O,S]</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="text" id="statusCetak" name="statusCetak"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-5">
                                                <input type="submit" id="btnProsesDetailBG" name="btnProsesDetailBG"
                                                    value="Proses" class="btn btn-primary">
                                            </div>
                                            <div class="col-3">
                                            </div>
                                            <div class="col-4">
                                                <input type="submit" id="btnTutupModal" name="btnTutupModal"
                                                    value="Tutup" class="btn btn-primary">
                                            </div>
                                        </div>
                                </div>
                                </form>
                            </div>
                        </div>

                        <!--MODAL TAMBAH BIAYA BKM-->
                        <div class="modal fade" id="modalTambahBiayaBKM" tabindex="-1" role="dialog"
                            aria-labelledby="pilihBankModal" aria-hidden="true">
                            <div class="modal-dialog modal-lg" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="pilihBankModal">Maintenance Biaya BKM Transitoris
                                        </h5>
                                        <button type="button" class="close" data-dismiss="modal"
                                            aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <form action="{{ url('BKMTransitorisBank') }}" id="formTambahBiayaBKM"
                                        method="POST">
                                        {{ csrf_field() }}
                                        <input type="hidden" name="_method" id="methodTambahBiayaBKM">
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="jumlahBiayaBKM" style="margin-right: 10px;">Jumlah
                                                    Biaya</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="text" id="jumlahBiayaBKM" name="jumlahBiayaBKM"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                            {{-- <input type="hidden" name="idcoba" id="idcoba" value="idcoba"> --}}
                                        </div>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="kodePerkiraanBKMTSelect" style="margin-right: 10px;">Kode
                                                    Perkiraan</label>
                                            </div>
                                            <div class="col-md-2">
                                                <input type="text" id="idKodePerkiraanBKMT"
                                                    name="idKodePerkiraanBKMT" class="form-control"
                                                    style="width: 100%">
                                            </div>
                                            <div class="col-md-7">
                                                <select name="kodePerkiraanBKMTSelect" id="kodePerkiraanBKMTSelect"
                                                    class="form-control">

                                                </select>
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="keteranganBKM"
                                                    style="margin-right: 10px;">Keterangan</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="text" id="keteranganBKM" name="keteranganBKM"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-5">
                                                <input type="submit" id="btnProsesTambahBiayaBKM"
                                                    name="btnProsesTambahBiayaBKM" value="Proses"
                                                    class="btn btn-primary">
                                            </div>
                                            <div class="col-3">
                                            </div>
                                            <div class="col-4">
                                                <input type="submit" id="btnTutupModal" name="btnTutupModal"
                                                    value="Tutup" class="btn btn-primary">
                                            </div>
                                        </div>
                                </div>
                                </form>
                            </div>
                        </div>

                        <!--MODAL TAMPIL BKM-->
                        <div class="modal fade" id="modalTampilBKM" tabindex="-1" role="dialog"
                            aria-labelledby="pilihBankModal" aria-hidden="true">
                            <div class="modal-dialog modal-lg" role="document">
                                <div class="modal-content" style="padding: 25px;">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Cetak BKM Transitoris</h5>
                                        <button type="button" class="close" data-dismiss="modal"
                                            aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <form action="{{ url('BKMTransitorisBank') }}" id="formTampilBKM" method="POST">
                                        {{ csrf_field() }}
                                        <input type="hidden" name="_method" id="methodTampilBKM">
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="tanggalInputTampilBKM" style="margin-right: 10px;">Tanggal
                                                    Input</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="date" id="tanggalInputTampilBKM"
                                                    name="tanggalInputTampilBKM" class="form-control"
                                                    style="width: 100%">
                                            </div>
                                            <div class="col-md-1">
                                                S/D
                                            </div>
                                            <div class="col-md-3">
                                                <input type="date" id="tanggalInputTampilBKM2"
                                                    name="tanggalInputTampilBKM2" class="form-control"
                                                    style="width: 100%">
                                            </div>
                                            <div class="col-md-3">
                                                <button id="btnOkTampilBKM" name="btnOkTampilBKM">OK</button>
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="idTampilBKM" style="margin-right: 10px;">Id. BKM</label>
                                            </div>
                                            <div class="col-md-4">
                                                <input type="text" id="idTampilBKM" name="idTampilBKM"
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
                                        <input type="hidden" name="cetak" id="cetak" value="tampilBKM">
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
                                        <h5 class="modal-title">Cetak BKK Transitoris</h5>
                                        <button type="button" class="close" data-dismiss="modal"
                                            aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <form action="{{ url('BKMTransitorisBank') }}" id="formTampilBKK" method="post">
                                        {{ csrf_field() }}
                                        <input type="hidden" name="_method" id="methodTampilBKK">
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="tanggalInputTampil" style="margin-right: 10px;">Tanggal
                                                    Input</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="date" id="tanggalInputTampilBKK"
                                                    name="tanggalInputTampilBKK" class="form-control"
                                                    style="width: 100%">
                                            </div>
                                            <div class="col-md-1">
                                                S/D
                                            </div>
                                            <div class="col-md-3">
                                                <input type="date" id="tanggalInputTampilBKK2"
                                                    name="tanggalInputTampilBKK2" class="form-control"
                                                    style="width: 100%">
                                            </div>
                                            <div class="col-md-3">
                                                <button id="btnOkTampilBKK" name="btnOkTampilBKK">OK</button>
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="idBKK" style="margin-right: 10px;">Id. BKK</label>
                                            </div>
                                            <div class="col-md-4">
                                                <input type="text" id="idTampilBKK" name="idTampilBKK"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                            <div class="col-md-2">
                                                <button id="btnCetakBKK" name="btnCetakBKK">CETAK</button>
                                            </div>
                                        </div>
                                        <div style="overflow-x: auto; overflow-y: auto; max-height: 250px;">
                                            <table style="width: 120%; table-layout: fixed;"id="tabelTampilBKK">
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
                                        <input type="hidden" name="cetak" id="cetak" value="tampilBKK">
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('js/Accounting/Piutang/MaintenanceBKMTransitorisBank.js') }}"></script>
@endsection
