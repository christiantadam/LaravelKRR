@extends('layouts.appAccounting')
@section('content')
@section('title', 'BKM BKK Nota Kredit')

<style>
    .table-responsive.fixed-height {
        min-height: 50px;
        border-radius: 8px;
        border: 2px solid black;
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
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0;
    }

    .table-responsive.fixed-height table {
        min-width: 100%;
        table-layout: fixed;
    }

    .table-responsive.fixed-height #tabelDataPelunasan.dataTable {
        table-layout: fixed;
        width: 100%;
    }
</style>

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">BKM BKK Nota Kredit</div>
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @endif
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        <form method="POST" action="{{ url('BKMBKKNotaKredit') }}" id="formkoreksi">
                            {{ csrf_field() }}
                            <input type="hidden" name="_method" id="methodkoreksi">
                            <div>

                                <b>Data Nota Kredit</b>
                                <div class="table-responsive fixed-height">
                                    <table class="table table-bordered no-wrap-header" id="tabelNotaKredit">
                                        <thead></thead>
                                        <tbody></tbody>
                                    </table>
                                </div>


                                <input type="hidden" id="idCustomer" name="idCustomer" class="form-control"
                                    style="width: 100%">
                                <input type="hidden" id="idPenagihan" name="idPenagihan" class="form-control"
                                    style="width: 100%">
                                <input type="hidden" id="noNotaKredit" name="noNotaKredit" class="form-control"
                                    style="width: 100%">
                                <input type="hidden" id="jumlah" name="jumlah" class="form-control"
                                    style="width: 100%">
                            </div>
                            <div class="card-container" style="display: flex;">
                                <div style="width: 60%;">
                                    <div class="card" style>
                                        <b>BKM</b>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="tanggal" style="margin-right: 10px;">Tanggal</label>
                                            </div>
                                            <div class="col-md-5">
                                                <input type="date" id="tanggal" name="tanggal" class="form-control"
                                                    style="width: 100%" readonly>
                                            </div>
                                            <div class="col-md-2">
                                                <input type="text" id="bulan" name="bulan" class="form-control"
                                                    style="width: 100%">
                                            </div>
                                            <div class="col-md-2">
                                                <input type="text" id="tahun" name="tahun" class="form-control"
                                                    style="width: 100%">
                                            </div>
                                        </div>
                                        <input type="hidden" name="idPembayaran" id="idPembayaran">
                                        <input type="hidden" name="idPelunasan" id="idPelunasan">
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="idBKM" style="margin-right: 10px;">Id. BKM</label>
                                            </div>
                                            <div class="col-md-4">
                                                <input type="text" id="idBKM" name="idBKM" class="form-control"
                                                    style="width: 100%" readonly>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="hidden" id="id_bkm" name="id_bkm" class="form-control"
                                                    style="width: 100%">
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="mataUangBKMSelect" style="margin-right: 10px;">Mata
                                                    Uang</label>
                                            </div>
                                            <div class="col-md-4">
                                                <select id="mataUangBKMSelect" name="mataUangBKMSelect"
                                                    class="form-control" readonly>

                                                </select>
                                            </div>
                                            <div class="col-md-2">
                                                <label for="kursRupiah" style="margin-right: 10px;">Kurs Rupiah</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="text" id="kursRupiah" name="kursRupiah"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                        </div>
                                        <input type="hidden" name="idMataUangBKM" id="idMataUangBKM"
                                            class="form-control" style="width: 100%">
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
                                            <!--HIDDEN INPUT-->
                                            <div class="col-md-4">
                                                <input type="text" id="idBankBKM" name="idBankBKM"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                            <div class="col-md-3">
                                                <input type="text" id="jenisBankBKM" name="jenisBankBKM"
                                                    class="form-control" style="width: 100%">
                                            </div>
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
                                                <select id="kodePerkiraanSelectBKM" name="kodePerkiraanSelectBKM"
                                                    class="form-control" readonly>

                                                </select>
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="uraian" style="margin-right: 10px;">Uraian</label>
                                            </div>
                                            <div class="col-md-7">
                                                <input type="text" id="uraianBKM" name="uraianBKM"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                        </div>
                                    </div>

                                    <!--CARD 2-->
                                    <div class="card">
                                        <b>BKK</b>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="idBKK" style="margin-right: 10px;">Id. BKK</label>
                                            </div>
                                            <div class="col-md-4">
                                                <input type="text" id="idBKK" name="idBKK"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="hidden" id="id_bkk" name="id_bkk"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="jumlahUangBKK" style="margin-right: 10px;">Jumlah
                                                    Uang</label>
                                            </div>
                                            <div class="col-md-4">
                                                <input type="number" id="jumlahUangBKK" name="jumlahUangBKK"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="namaBankBKKSelect"
                                                    style="margin-right: 10px;">Bank</label>
                                            </div>
                                            <div class="col-md-5">
                                                <select id="namaBankBKKSelect" name="namaBankBKKSelect"
                                                    class="form-control" readonly>

                                                </select>
                                            </div>
                                            <input type="hidden" id="idBankBKK" name="idBankBKK"
                                                class="form-control" style="width: 100%">
                                            <input type="hidden" id="jenisBankBKK" name="jenisBankBKK"
                                                class="form-control" style="width: 100%">
                                        </div>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="kodePerkiraan" style="margin-right: 10px;">Kode
                                                    Perkiraan</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="number" id="idKodePerkiraanBKK"
                                                    name="idKodePerkiraanBKK" class="form-control"
                                                    style="width: 100%" readonly>
                                            </div>
                                            <div class="col-md-5">
                                                <select id="kodePerkiraanBKKSelect" name="kodePerkiraanBKKSelect"
                                                    class="form-control" readonly>

                                                </select>
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="uraianBKK" style="margin-right: 10px;">Uraian</label>
                                            </div>
                                            <div class="col-md-7">
                                                <input type="text" id="uraianBKK" name="uraianBKK"
                                                    class="form-control" style="width: 100%" readonly>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!--CARD 3 KANAN-->
                                <div style="width: 40%;">
                                    <div class="card-body">
                                        <div style="display: flex; justify-content: center;">
                                            <input type="submit" id="btnPilihNotaKredit" name="btnPilihNotaKredit"
                                                value="Pilih Nota Kredit" class="btn btn-primary d-flex ml-auto">
                                        </div>
                                        <div class="row"
                                            style="display: flex; justify-content: center; margin-top: 150px">
                                            <div style="margin-right: 10px;">
                                                <button type="submit" id="btnProses" name="btnProses"
                                                    class="btn btn-primary">PROSES</button>
                                            </div>
                                            <div style="margin-right: 10px;">
                                                <input type="submit" id="btnKoreksi" name="btnKoreksi"
                                                    value="Koreksi" class="btn btn-primary">
                                            </div>
                                            <div>
                                                <input type="submit" id="btnBatal" name="btnBatal" value="Batal"
                                                    class="btn btn-primary">
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row" style="display: flex; justify-content: center;">
                                            <div style="margin-right: 10px;">
                                                <input type="submit" id="btnTampilBKM" name="btnTampilBKM"
                                                    value="Tampil BKM" class="btn btn-primary">
                                            </div>
                                            <div style="margin-right: 10px;">
                                                <input type="submit" id="btnTampilBKK" name="btnTampilBKK"
                                                    value="Tampil BKK" class="btn btn-primary">
                                            </div>
                                            <div>
                                                <input type="submit" name="tutup" value="TUTUP"
                                                    class="btn btn-primary">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <input type="text" id="nilaiUang" name="nilaiUang" class="form-control"
                                style="width: 100%">
                            <input type="text" id="konversi" name="konversi" class="form-control"
                                style="width: 100%">
                            <input type="text" id="konversi1" name="konversi1" class="form-control"
                                style="width: 100%">
                            <input type="text" id="nilai" name="nilai" class="form-control"
                                style="width: 100%">
                            <input type="text" id="nilai1" name="nilai1" class="form-control"
                                style="width: 100%">
                        </form>

                        <!--MODAL TAMPIL BKM-->
                        <div class="modal fade" id="modalTampilBKM" tabindex="-1" role="dialog"
                            aria-labelledby="pilihBankModal" aria-hidden="true">
                            <div class="modal-dialog modal-lg" role="document">
                                <div class="modal-content" style="padding: 25px;">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Cetak BKM Nota Kredit</h5>
                                        <button type="button" class="close" data-dismiss="modal"
                                            aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <form action="{{ url('BKMBKKNotaKredit') }}" id="formTampilBKM" method="POST">
                                        {{ csrf_field() }}
                                        <input type="hidden" name="_method" id="methodTampilBKM">
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="tanggalInputTampilBKM" style="margin-right: 10px;">Tanggal
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
                                                <label for="idBKMTampil" style="margin-right: 10px;">Id. BKM</label>
                                            </div>
                                            <div class="col-md-4">
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
                                        <h5 class="modal-title">Cetak BKK Nota Kredit</h5>
                                        <button type="button" class="close" data-dismiss="modal"
                                            aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <form action="{{ url('BKMBKKNotaKredit') }}" id="formTampilBKK" method="POST">
                                        {{ csrf_field() }}
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


<div class="print">
    <div class="container">
        <div class="row">
            <div class="col-5" style="padding-right: 25px;">
                <div class="row" style="border: solid 1px; justify-content: center; border-bottom: 0px">
                    <h4 style="font-weight: bold">P.T. KERTA RAJASA RAYA</h4>
                </div>
            </div>
            <div class="col-7">
                <div class="row" style="border: solid 1px; justify-content: center; border-bottom: 0px">
                    <h4 style="font-weight: bold">...</h4>
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
                    <div class="col-12">
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
                        <span style="display: inline; font-size: 18px; padding-left: 50px">Jumlah Diterima:
                        </span><span id="symbol"
                            style="display: inline; margin-top: -5px; font-size: 18px; padding-left: 15px"></span><span
                            id="jumlahDiterima" name="jumlahDiterima"
                            style="display: inline; margin-top: -5px; font-size: 18px; padding-left: 15px"></span>
                    </div>
                    <div class="col-12">
                        <span style="display: inline; font-size: 18px; padding-left: 50px">Terbilang: </span>
                    </div>
                    <div class="col-12">
                        <span id="terbilangCetak"
                            style="display: inline; margin-top: -5px; font-size: 18px; padding-left: 50px"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-7" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                    <div class="col-12" style="height: 2.5vh; text-align-last: center;">
                        <span style="font-size: 18px; ">RINCIAN PENERIMAAN</span>
                    </div>
                </div>
            </div>
            <div class="col-3" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                    <div class="col-12" style="height: 2.5vh; text-align-last: center;">
                        <span style="font-size: 18px;">KODE PERKIRAAN</span>
                    </div>
                </div>
            </div>
            <div class="col-2" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; margin-right: -2vh;">
                    <div class="col-12" style="height: 2.5vh; text-align-last: center;">
                        <span style="font-size: 18px;">JUMLAH</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-7" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                    <div class="col-12" style="height: 4vh;">
                        <div class="row">
                            <div class="col-7" style="text-align-last: left;">
                                <span id="rincianPenerimaan" style="font-size: 18px;">BB</span>
                            </div>
                            <div class="col-2" style="text-align-last: right;">
                                <span id="keterangan2" style="font-size: 18px;">AA</span>
                            </div>
                            <div class="col-3" style="text-align-last: right;">
                                <span id="biaya" style="font-size: 18px;">CC</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-3" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                    <div class="col-12" style="height: 4vh; text-align-last: center;">
                        <span id="kodePerkiraanCetak" style="font-size: 18px;"></span>
                    </div>
                </div>
            </div>
            <div class="col-2" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; margin-right: -2vh;">
                    <div class="col-12" style="height: 4vh; text-align-last: right;">
                        <span id="jum1" style="font-size: 18px;">jum1</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-7">
                <div class="row" style="border: solid 1px; border-bottom: 0px; border-right: 0px;">
                    <div class="col-12" style="height: 4vh; text-align-last: left;">
                        <span id="ket" style="font-size: 18px; "></span><br> <!--KET-->
                    </div>
                    <div class="col-12" style="height: 4vh; text-align-last: left;"><!--KET1-->
                        <span id="ket1" style="font-size: 18px; "></span><br>
                    </div>
                    <div class="col-12" style="height: 4vh; text-align-last: left;"><!--KET5-->
                        <span id="ket5" style="font-size: 18px;"></span>
                    </div>
                </div>
            </div>
            <div class="col-3" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                    <div class="col-12" style="height: 12vh; text-align-last: center;">
                        <span id="kodePerkiraanCetak" style="font-size: 18px;"></span> <!--KD-->
                    </div>
                </div>
            </div>
            <div class="col-2" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; margin-right: -2vh;">
                    <div class="col-12" style="height: 4vh; text-align-last: right;">
                        <span id="totalK" style="font-size: 18px;">totalK</span>
                    </div>
                    <div class="col-12" style="height: 4vh; text-align-last: right;">
                        <span id="ket3" style="font-size: 18px;">ket3</span><span id="jum"
                            style="font-size: 18px;">jum</span>
                    </div>
                    <div class="col-12" style="height: 4vh; text-align-last: right;">
                        <span id="ket6" style="font-size: 18px;">ket6<span id="jum2"
                                style="font-size: 18px;">jum2</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-10" style="padding-right: 25px;">
                <div
                    class="row"style="border: solid 1px; justify-content: left; border-right: 0px; margin-right: -3.4vh;">
                    <div class="col-12" style="height: 2.5vh; text-align-last: right;">
                        <span style="font-size: 18px; font-weight: bold; padding-left: 45px">GRAND TOTAL: </span><span
                            id="symbol2" style="font-size: 18px; padding-right: 20px"></span>
                    </div>
                </div>
            </div>
            <div class="col-2" style="padding-right: 25px;">
                <div class="row"style="border: solid 1px; justify-content: left; margin-right: -2vh;">
                    <div class="col-12" style="height: 2.5vh; text-align-last: right;">
                        <span id="grandTotal" style="font-size: 18px;"></span>
                    </div>
                </div>
            </div>
        </div>

        <br><br>
        <div class="row">
            <div class="col-3" style="margin-right: 25px;">
                <div class="row"
                    style="border: solid 1px; border-left: 0px; border-top: 0px; border-right: 0px; text-align-last: center;">
                    <div class="col-12" style="height: 10vh; ">
                        <span id="disetujui" style="font-size: 18px;">Disetujui,</span>
                    </div>
                </div>
            </div>
            <div class="col-3" style="margin-left: 50px">
                <div class="row"
                    style="border: solid 1px; border-left: 0px; border-top: 0px; border-right: 0px; text-align-last: center;">
                    <div class="col-12" style="height: 10vh; ">
                        <span id="kasir" style="font-size: 18px;">Kasir,</span>
                    </div>
                </div>
            </div>
            <div class="col-4" style="margin-right: 25px;">
                <div class="row" style="text-align-last: right;">
                    <div class="col-12" style="height: 10vh; ">
                        <span style="font-size: 18px;">Sidoarjo, </span><span id="tglCetakForm"
                            style="font-size: 18px;"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="{{ asset('js/Accounting/Piutang/BKMBKKNotaKredit.js') }}"></script>

@endsection
