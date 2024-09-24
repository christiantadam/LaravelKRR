@extends('layouts.appAccounting')
@section('content')
@section('title', 'BKM BKK Pembulatan')

<style>
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
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">BKM-BKK Pembulatan</div>
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @endif
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        <input type="hidden" name="_method" id="methodkoreksi">
                        <!-- Form fields go here -->
                        <div class="d-flex">
                            <div class="col-md-2">
                                <label for="bulanTahun" style="margin-right: 10px;">Bulan/Tahun</label>
                            </div>
                            <div class="col-md-1">
                                <input type="text" id="bulan" name="bulan" class="form-control"
                                    style="width: 100%">
                            </div>
                            <div class="col-md-1">
                                <input type="text" id="tahun" name="tahun" class="form-control"
                                    style="width: 100%">
                            </div>
                            <div class="col-md-2">
                                <button type="button" class="btn btn-primary" id="btn_ok">OK</button>
                            </div>
                        </div>

                        <!--CARD 1-->
                        <br>
                        <div class="card-container" style="display: flex;">
                            <div class="card" style="width: 40%;">
                                <div class="card-body">
                                    <div class="col-md-12">
                                        <strong>Data BKM</strong>
                                    </div>
                                    <div style="overflow-x: auto; overflow-y: auto;">
                                        <table style="width: 100%;" id="table_DataBKM">
                                            {{-- <colgroup>
                                                    <col style="width: 60%;">
                                                    <col style="width: 60%;">
                                                    <col style="width: 60%;">
                                                    </colgroup> --}}
                                            <thead class="table-dark">
                                                <tr>
                                                    <th>No. BKM</th>
                                                    <th>Tgl. BKM</th>
                                                    <th>Nilai Pelunasan</th>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="col-md-10">
                                        <input type="hidden" id="idBKM" name="idBKM" class="form-control"
                                            style="width: 100%">
                                    </div>
                                    <div class="col-md-10">
                                        <input type="hidden" id="id_bkk" name="id_bkk" class="form-control"
                                            style="width: 100%">
                                    </div>
                                    <div class="col-md-10">
                                        <input type="hidden" name="idPembayaran" id="idPembayaran">
                                    </div>
                                    <div class="col-md-10">
                                        <input type="hidden" name="idMataUang" id="idMataUang">
                                    </div>
                                </div>
                            </div>

                            <!--CARD 2-->
                            <div class="card" style="width: 60%; overflow-y: auto;">
                                <div class="card-body">
                                    <div class="col-md-6">
                                        <strong>Rincian Data</strong>
                                    </div>
                                    <div style="overflow-x: auto;">
                                        <table style="width: 130%; table-layout: fixed;" id="table_RincianData">
                                            <colgroup>
                                                <col style="width: 40%;">
                                                <col style="width: 35%;">
                                                <col style="width: 35%;">
                                                <col style="width: 30%;">
                                                <col style="width: 40%;">
                                                <col style="width: 20%;">
                                                <col style="width: 20%;">
                                                <col style="width: 20%;">
                                            </colgroup>
                                            <thead class="table-dark">
                                                <tr>
                                                    <th>Customer</th>
                                                    <th>No. Bukti</th>
                                                    <th>Invoice</th>
                                                    <th>Mata Uang</th>
                                                    <th>Nilai Rincian</th>
                                                    <th>Id. Bank</th>
                                                    <th>Id. Jenis</th>
                                                    <th>Id. Uang</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <br>
                        <div class="card-container" style="display: flex;">
                            <div class="card" style="width: 60%;">
                                <div class="card-body">
                                    <b>BKK</b>
                                    <p>
                                    <div class="row">
                                        <div class="col-md-3">
                                            <label for="kodePerkiraan">Bank</label>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="text" id="id_bank" name="id_bank" class="form-control"
                                                style="width: 100%">
                                        </div>
                                        <div class="col-md-5">
                                            <input type="text" id="nama_bank" name="nama_bank" class="form-control"
                                                style="width: 100%">
                                        </div>
                                        <div class="col-md-1">
                                            <button type="button" class="btn btn-default"
                                                id="btn_bank">...</button>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="hidden" id="idBank" name="idBank" class="form-control"
                                                style="width: 100%">
                                        </div>
                                        <div class="col-md-2">
                                            <input type="hidden" id="jenis_bank" name="jenisBank"
                                                class="form-control" style="width: 100%">
                                        </div>
                                    </div>
                                    <p>
                                    <div class="row">
                                        <div class="col-md-3">
                                            <label for="tanggal">Tanggal</label>
                                        </div>
                                        <div class="col-md-5">
                                            <input type="date" id="tanggal" name="tanggal" class="form-control"
                                                style="width: 100%">
                                        </div>
                                    </div>
                                    <p>
                                    <div class="row">
                                        <div class="col-md-3">
                                            <label for="idBKK">Id. BKK</label>
                                        </div>
                                        <div class="col-md-4">
                                            <input type="text" id="idBKK" name="idBKK" class="form-control"
                                                style="width: 100%">
                                        </div>
                                    </div>
                                    <p>
                                    <div class="row">
                                        <div class="col-md-3">
                                            <label for="jumlahUang">Jumlah Uang</label>
                                        </div>
                                        <div class="col-md-4">
                                            <input type="text" id="jumlahUang" name="jumlahUang"
                                                class="form-control" style="width: 100%">
                                        </div>
                                    </div>
                                    <p>
                                    <div class="row">
                                        <div class="col-md-3">
                                            <label for="kodePerkiraan">Kode Perkiraan</label>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="text" id="idKodePerkiraan" name="idKodePerkiraan"
                                                class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-5">
                                            <input type="text" id="ketKodePerkiraan" name="ketKodePerkiraan"
                                                class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-1">
                                            <button type="button" class="btn btn-default"
                                                id="btn_perkiraan">...</button>
                                        </div>
                                    </div>
                                    <p>
                                    <div class="row">
                                        <div class="col-md-3">
                                            <label for="uraian">Uraian</label>
                                        </div>
                                        <div class="col-md-8">
                                            <input type="text" id="uraian" name="uraian" class="form-control"
                                                style="width: 100%">
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <input type="hidden" id="konversi" name="konversi" class="form-control"
                                            style="width: 100%">
                                    </div>
                                </div>
                            </div>

                            <!--CARD 2-->
                            <div style="width: 40%;">
                                <div class="card-body">
                                    <div style="display: flex; justify-content: center;">
                                        <input type="submit" id="btnPilihBKM" name="btnPilihBKM" value="Pilih BKM"
                                            class="btn btn-primary">
                                    </div>
                                    <br>
                                    <div class="row" style="display: flex; justify-content: center;">
                                        <div>
                                            <button type="submit" id="btnProses" name="btnProses"
                                                class="btn btn-success">PROSES</button>
                                        </div>
                                        <div style="display: flex; justify-content: center;">
                                            <input type="submit" id="btnBatal" name="btnBatal" value="Batal"
                                                class="btn btn-danger">
                                        </div>
                                    </div>
                                    <br>
                                    <div class="row" style="display: flex; justify-content: center;">
                                        <div>
                                            <button type="submit" id="btnTampilBKK" name="btnTampilBKK"
                                                class="btn btn-primary">Tampil BKK</button>
                                        </div>
                                        <div>
                                            <input type="submit" name="tutup" value="TUTUP"
                                                class="btn btn-secondary">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="modal fade" id="modalTampilBKK" tabindex="-1" role="dialog"
                            aria-labelledby="pilihBankModal" aria-hidden="true">
                            <div class="modal-dialog modal-lg" role="document">
                                <div class="modal-content" style="padding: 25px;">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Cetak BKK Nota Kredit</h5>
                                        <button type="button" class="close" data-dismiss="modal"
                                            aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <input type="hidden" name="_method" id="methodTampilBKK">
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="tanggalInputTampilBKM" style="margin-right: 10px;">Tanggal
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
                                            <label for="idBKKTampil" style="margin-right: 10px;">Id. BKK</label>
                                        </div>
                                        <div class="col-md-4">
                                            <input type="text" id="idBKKTampil" name="idBKKTampil"
                                                class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-3">
                                            <button id="btnCetakBKK" name="btnCetakBKK">CETAK</button>
                                        </div>
                                    </div>
                                    <div style="overflow-x: auto; overflow-y: auto; max-height: 250px;">
                                        <table style="width: 120%; table-layout: fixed;"id="table_TampilBKK">
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
                                    <input type="hidden" name="cetak" id="cetak" value="cetakBKK">
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

{{-- style="visibility: hidden; --}}
<div class="print" style="visibility: hidden;">
    <div class="container">
        <div class="row">
            <div class="col-5" style="padding-right: 25px;">
                <div class="row" style="border: solid 1px; justify-content: center; border-bottom: 0px">
                    <h4 style="font-weight: bold">P.T. KERTA RAJASA RAYA</h4>
                </div>
            </div>
            <div class="col-7">
                <div class="row" style="border: solid 1px; justify-content: center; border-bottom: 0px">
                    <h4 style="font-weight: bold">BUKTI PENGELUARAN KAS</h4>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-5" style="padding-right: 25px;">
                <div class="row" style="border: solid 1px; text-align-last: center;">
                    <div class="col-12" style="height: 3vh; ">
                        <span style="font-weight: bold; font-size: 22px;">Jl. Raya Tropodo No. 1</span><br>
                    </div>
                    <div class="col-12">
                        <span style="font-weight: bold; font-size: 22px;">WARU - SIDOARJO</span>
                    </div>
                </div>
            </div>
            <div class="col-7">
                <div class="row" style="border: solid 1px; text-align-last: center;">
                    <div id="id_BKM" class="col-12" style="height: 3vh;">
                        <span style="display: inline; font-size: 22px; font-weight: bold">NOMER: </span> <span
                            id="nomer"
                            style="display: inline; margin-top: -5px; font-size: 22px; font-weight: bold;"></span>
                    </div>
                    <div id="tanggal" class="col-12">
                        <span style="display: inline; font-size: 22px; font-weight: bold">TANGGAL: </span><span
                            id="tglCetak"
                            style="display: inline; margin-top: -5px; font-size: 22px; font-weight: bold;"></span>
                    </div>
                </div>
            </div>
        </div>

        <br>
        <div class="row">
            <div class="col-12" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; margin-right: -2vh;">
                    <div class="col-12" style="height: 2.5vh;">
                        <span style="display: inline; font-size: 17px; padding-left: 50px">Jumlah Diterima:
                        </span><span id="symbol"
                            style="display: inline; margin-top: -5px; font-size: 17px; padding-left: 15px"></span><span
                            id="nilaiPembulatan" name="nilaiPembulatan"
                            style="display: inline; margin-top: -5px; font-size: 17px; padding-left: 15px"></span>
                    </div>
                    <div class="col-12">
                        <span style="display: inline; font-size: 17px; padding-left: 50px">Terbilang: </span>
                    </div>
                    <div class="col-12">
                        <span id="terbilangCetak"
                            style="display: inline; margin-top: -5px; font-size: 17px; padding-left: 50px"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                    <div class="col-12" style="height: 2.5vh; text-align-last: center;">
                        <span style="font-size: 17px; ">BENTUK PEMBAYARAN</span>
                    </div>
                </div>
            </div>
            <div class="col-8" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; margin-right: -2vh;">
                    <div class="col-12" style="height: 2.5vh; text-align-last: center;">
                        <span style="font-size: 17px;">URAIAN PEMBAYARAN</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-2" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                    <div class="col-12" style="height: 2.5vh; text-align-last: center;">
                        <span style="font-size: 16px; ">Jenis Pembayaran</span>
                    </div>
                </div>
            </div>
            <div class="col-2" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                    <div class="col-12" style="height: 2.5vh; text-align-last: center;">
                        <span style="font-size: 16px;">JATUH TEMPO</span>
                    </div>
                </div>
            </div>
            <div class="col-4" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                    <div class="col-12" style="height: 2.5vh; text-align-last: center;">
                        <span style="font-size: 16px;">RINCIAN</span>
                    </div>
                </div>
            </div>
            <div class="col-2" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                    <div class="col-12" style="height: 2.5vh; text-align-last: center;">
                        <span style="font-size: 16px;">KODE PERKIRAAN</span>
                    </div>
                </div>
            </div>
            <div class="col-2" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; margin-right: -2vh;">
                    <div class="col-12" style="height: 2.5vh; text-align-last: center;">
                        <span style="font-size: 16px;">JUMLAH</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-2" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                    <div class="col-12" style="height: 2.5vh; text-align-last: center;">
                        <span id="jenispemb" style="font-size: 16px; ">jenispemb</span>
                    </div>
                </div>
            </div>
            <div class="col-2" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                    <div class="col-12" style="height: 2.5vh; text-align-last: center;">
                        <span id="jatuhtempo" style="font-size: 16px;">jatuhtempo</span>
                    </div>
                </div>
            </div>
            <div class="col-4" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                    <div class="col-12" style="height: 2.5vh; text-align-last: center;">
                        <span id="rincianbayar" style="font-size: 16px;">rincian</span>
                    </div>
                </div>
            </div>
            <div class="col-2" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                    <div class="col-12" style="height: 2.5vh; text-align-last: center;">
                        <span id="kodeperkiraan" style="font-size: 16px;">kodeperkiraan</span>
                    </div>
                </div>
            </div>
            <div class="col-2" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; margin-right: -2vh;">
                    <div class="col-12" style="height: 2.5vh; text-align-last: center;">
                        <span id="nilairincian" style="font-size: 16px;">jumlah</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-10" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-right: 0px; margin-right: -3.4vh;">
                    <div class="col-12" style="height: 2.5vh; text-align-last: right;">
                        <span style="font-size: 16px; font-weight: bold; padding-left: 45px">GRAND TOTAL: </span><span
                            id="symbol2"
                            style="display: inline; margin-top: -5px; font-size: 16px; padding-right: 20px"></span>
                    </div>
                </div>
            </div>
            <div class="col-2" style="padding-right: 25px;">
                <div class="row"style="border: solid 1px; justify-content: left; margin-right: -2vh;">
                    <div class="col-12" style="height: 2.5vh; text-align-last: right;">
                        <span id="grandTotal" style="font-size: 16px;"></span>
                    </div>
                </div>
            </div>
        </div>

        <br><br>
        <div class="row">
            <div class="col-2" style="margin-right: 20px;">
                <div class="row"
                    style="border: solid 1px; border-left: 0px; border-top: 0px; border-bottom: 0px; border-right: 0px; text-align-last: center;">
                    <div class="col-12" style="height: 10vh; ">
                        <span id="disetujui" style="font-size: 16px;">Disetujui,</span>
                    </div>
                </div>
            </div>
            <div class="col-2" style="margin-left: 40px">
                <div class="row"
                    style="border: solid 1px; border-left: 0px; border-top: 0px; border-bottom: 0px; border-right: 0px; text-align-last: center;">
                    <div class="col-12" style="height: 10vh; ">
                        <span id="kasir" style="font-size: 16px;">Kasir,</span>
                    </div>
                </div>
            </div>
            <div class="col-7" style="margin-right: 20px;">
                <div class="row" style="text-align-last: left;">
                    <div class="col-12" style="height: 3vh; ">
                        <span style="font-size: 15px;">Untuk pembulatan BKM Nomer: </span><span id="idBKMAcuan"
                            style="font-size: 15px;"></span><span style="font-size: 15px;">, Tanggal: </span><span
                            id="tanggalBKM" style="font-size: 15px;"></span>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-2" style="margin-right: 20px;">
                <div class="row"
                    style="text-align-last: center; border: solid 1px; border-left: 0px; border-top: 0px; border-right: 0px;">
                    <div class="col-12" style="height: 4vh; ">
                        <span id="disetujui" style="font-size: 16px;"></span>
                    </div>
                </div>
            </div>
            <div class="col-2" style="margin-left: 40px">
                <div class="row"
                    style="border: solid 1px; border-left: 0px; border-top: 0px; border-right: 0px; text-align-last: center;">
                    <div class="col-12" style="height: 4vh; ">
                        <span id="kasir" style="font-size: 16px;"></span>
                    </div>
                </div>
            </div>
            <div class="col-4" style="margin-right: 20px;">
                <div class="row" style="text-align-last: right;">
                    <div class="col-12" style="height: 4vh; ">
                        <span style="font-size: 16px;">Sidoarjo, </span><span id="tglCetakForm"
                            style="font-size: 17px;"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('js/Accounting/Piutang/BKMBKKPembulatan.js') }}"></script>
@endsection
