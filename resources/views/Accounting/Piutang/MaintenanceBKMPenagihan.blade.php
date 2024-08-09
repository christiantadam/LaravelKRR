@extends('layouts.appAccounting')
@section('content')
@section('title', 'Maintenance BKM Penagihan')

<style>
    @media print{
        .card {
            display: none;
        }
        .print {
            visibility: visible !important ;
        }
        .modal {
            display: none !important;
        }
        .fade {
            opacity: 0 !important;
        }
    }
</style>

    <div class="container-fluid inti">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Maintenance BKM Penagihan</div>
                    @if (Session::has('success'))
                        <div class="alert alert-success">
                            {{ Session::get('success') }}
                        </div>
                    @endif
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            <form method="POST" action="{{ url('MaintenanceBKMPenagihan') }}" id="formkoreksi">
                                {{ csrf_field() }}
                                <input type="hidden" name="_method" id="methodkoreksi">
                                <!-- Form fields go here -->
                                <div class="d-flex">
                                    <div class="col-md-2">
                                        <label for="bulanTahun" style="margin-right: 10px;">Bulan/Tahun (Untuk contoh 11/2010)</label>
                                    </div>
                                    <div class="col-md-1">
                                        <input type="text" id="bulan" name="bulan" class="form-control" style="width: 100%">
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" id="tahun" name="tahun" class="form-control" style="width: 100%">
                                    </div>
                                    <div class="col-md-2">
                                        <input type="submit" id="btnOK" value="OK" class="btn btn-outline-dark"
                                            onclick="clickOK()">
                                    </div>
                                    <div class="col-md-2">
                                        <input type="submit" id="btnPilihBank" name="btnPilihBank" value="Pilih Bank"
                                            class="btn btn-outline-dark">
                                    </div>
                                    <div class="col-md-2">
                                        <input type="submit" id="btnGroupBKM" name="btnGroupBKM" value="Group BKM"
                                            class="btn btn-outline-dark">
                                    </div>
                                    <div class="col-md-2">
                                        <input type="hidden" id="idBKMNew" name="idBKMNew" class="form-control" style="width: 100%">
                                    </div>
                                </div>

                                <div class="col-md-2">
                                    <input type="hidden" id="tglInputNew" name="tglInputNew" class="form-control" style="width: 100%">
                                </div>

                                <br>
                                <div>
                                    Data Pelunasan
                                    <div style="overflow-y: auto;">
                                        <table style="width: 180%; table-layout: fixed;" id="tabelDataPelunasan">
                                            <colgroup>
                                                <col style="width: 15%;">
                                                <col style="width: 15%;">
                                                <col style="width: 15%;">
                                                <col style="width: 20%;">
                                                <col style="width: 15%;">
                                                <col style="width: 20%;">
                                                <col style="width: 20%;">
                                                <col style="width: 20%;">
                                                <col style="width: 20%;">
                                                <col style="width: 20%;">
                                            </colgroup>
                                            <thead class="table-dark">
                                                <tr>
                                                    <th>Tgl Pelunasan</th>
                                                    <th>Id. Pelunasan</th>
                                                    <th>Id. Bank</th>
                                                    <th>Jenis Pembayaran</th>
                                                    <th>Mata Uang</th>
                                                    <th>Total Pelunasan</th>
                                                    <th>No. Bukti</th>
                                                    <th>Tgl Pembuatan</th>
                                                    <th>IdCust</th>
                                                    <th>Jenis Bayar</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                            </tbody>
                                        </table>
                                        <input type="hidden" id="jenisBank" name="jenisBank" class="form-control" style="width: 100%">
                                        <input type="hidden" id="total" name="total" class="form-control" style="width: 100%">
                                        <input type="hidden" id="uang" name="uang" class="form-control" style="width: 100%">
                                        <input type="hidden" id="konversi" name="konversi" class="form-control" style="width: 100%">
                                        <input type="hidden" id="sisa" name="sisa" class="form-control" style="width: 100%">
                                        <input type="hidden" id="idbkm" name="idbkm" class="form-control" style="width: 100%">
                                    </div>
                                </div>

                                <!--CARD 1-->
                                <br>
                                <div class="card-container" style="display: flex;">
                                    <div class="card" style="width: 40%;">
                                        <div class="card-body">
                                            <div class="col-md-12">
                                                <input type="radio" name="radiogrupDetail" value="1" id="radio_1">
                                                <label for="radio_1">Detail Pelunasan</label>
                                            </div>
                                            <div style="overflow-x: auto; overflow-y: auto; max-height: 250px;">
                                                <table style="width: 280%; table-layout: fixed;"id="tabelDetailPelunasan">
                                                    <colgroup>
                                                        <col style="width: 40%;">
                                                        <col style="width: 40%;">
                                                        <col style="width: 40%;">
                                                        <col style="width: 40%;">
                                                        <col style="width: 40%;">
                                                        <col style="width: 40%;">
                                                        <col style="width: 40%;">
                                                    </colgroup>
                                                    <thead class="table-dark">
                                                        <tr>
                                                            <th>Id. Penagihan</th>
                                                            <th>Nilai Pelunasan</th>
                                                            <th>Pelunasan Rupiah</th>
                                                            <th>Kode Perkiraan</th>
                                                            <th>Customer</th>
                                                            <th>Id. Detail</th>
                                                            <th>Tgl. Penagihan</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    <!--CARD 2-->
                                    <div class="card" style="width: 30%; overflow-y: auto; max-height: 250px;">
                                        <div class="card-body">
                                            <div class="col-md-12">
                                                <input type="radio" name="radiogrupDetail" value="2" id="radio_2">
                                                <label for="radio_2">Detail Biaya</label>
                                            </div>
                                            <div style="overflow-x: auto;">
                                                <table style="width: 200%; table-layout: fixed;" id="tabelDetailBiaya">
                                                    <colgroup>
                                                        <col style="width: 50%;">
                                                        <col style="width: 50%;">
                                                        <col style="width: 50%;">
                                                        <col style="width: 50%;">
                                                    </colgroup>
                                                    <thead class="table-dark">
                                                        <tr>
                                                            <th>Keterangan</th>
                                                            <th>Jumlah Biaya</th>
                                                            <th>Kode Perkiraan</th>
                                                            <th>Id. Detail</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <!--CARD 3-->
                                    <div class="card" style="width: 30%; overflow-y: auto; max-height: 250px;">
                                        <div class="card-body">
                                            <div class="col-md-12">
                                                <input type="radio" name="radiogrupDetail" value="3"
                                                    id="radio_3">
                                                <label for="radio_3">Detail Kurang/Lebih</label>
                                            </div>
                                            <div style="overflow-x: auto;">
                                                <table style="width: 240%; table-layout: fixed;"
                                                    id="tabelDetailKurangLebih">
                                                    <colgroup>
                                                        <col style="width: 60%;">
                                                        <col style="width: 60%;">
                                                        <col style="width: 60%;">
                                                        <col style="width: 60%;">
                                                    </colgroup>
                                                    <thead class="table-dark">
                                                        <tr>
                                                            <th>Keterangan</th>
                                                            <th>Jumlah Biaya</th>
                                                            <th>Kode Perkiraan</th>
                                                            <th>Id. Detail</th>
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
                                <div class="mb-3">
                                    <div class="row">
                                        <div class="col-5">
                                            <input type="submit" id="btnKoreksiDetail" name="koreksidetail"
                                                value="Koreksi Detail" class="btn btn-warning d-flex ml-auto"
                                                onclick="validateTabel()">
                                        </div>
                                        <div class="col-3">
                                            <input type="submit" id="btnTampilBKM" name="btnTampilBKM" value="Tampil BKM"
                                                class="btn btn-primary d-flex ml-auto">
                                        </div>
                                        <div class="col-4">
                                            <input type="submit" id="btnTutup" name="tutup" value="TUTUP"
                                                class="btn btn-dark d-flex ml-auto" disabled>
                                        </div>
                                    </div>
                                </div>

                                <!--MODAL PILIH BANK-->
                            <div class="modal fade" id="pilihBank" tabindex="-1" role="dialog"
                                aria-labelledby="pilihBankModal" aria-hidden="true">
                                <div class="modal-dialog modal-lg" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="pilihBankModal">Maintenance Pilih Bank BKM
                                            </h5>
                                            <button type="button" class="close" data-dismiss="modal"
                                                aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <form id="formPilihBank" method="POST" action="{{ url('DetailPelunasan') }}"
                                            id="modalkoreksi">
                                            <div class="modal-body">
                                                <div class="d-flex">
                                                    <div class="col-md-3">
                                                        <label for="idPelunasan" style="margin-right: 10px;">Id.
                                                            Pelunasan</label>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <input type="text" id="idPelunasan" name="idPelunasan"
                                                            class="form-control" style="width: 100%">
                                                    </div>
                                                </div>
                                                <div class="d-flex">
                                                    <div class="col-md-3">
                                                        <label for="tanggalInput" style="margin-right: 10px;">Tanggal
                                                            Input</label>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <input type="date" id="tanggalInput" class="form-control"
                                                            style="width: 100%">
                                                    </div>
                                                    <div class="col-md-3">
                                                        <label for="tanggalTagih" style="margin-right: 10px;">Tanggal
                                                            Tagih</label>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <input type="date" id="tanggalTagih" name="tanggalTagih" class="form-control"
                                                            style="width: 100%">
                                                    </div>
                                                </div>
                                                <div class="d-flex">
                                                    <div class="col-md-3">
                                                        <label for="jenisBayar" style="margin-right: 10px;">Jenis
                                                            Bayar</label>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <input type="text" id="jenisBayar" class="form-control"
                                                            style="width: 100%">
                                                    </div>
                                                </div>
                                                <div class="d-flex">
                                                    <div class="col-md-3">
                                                        <label for="bankSelect"
                                                            style="margin-right: 10px;">Bank</label>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <input type="text" id="idBank" name="idBank"
                                                            class="form-control" style="width: 100%">
                                                    </div>
                                                    <div class="col-md-7">
                                                        <select name="namaBankSelect" id="namaBankSelect"
                                                            class="form-control">

                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="d-flex">
                                                    <div class="col-md-3">
                                                        <label for="mataUang" style="margin-right: 10px;">Mata
                                                            Uang</label>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <input type="text" id="mataUang" name="mataUang"
                                                            class="form-control" style="width: 100%">
                                                    </div>
                                                </div>
                                                <div class="d-flex">
                                                    <div class="col-md-3">
                                                        <label for="nilaiPelunasan" style="margin-right: 10px;">Nilai
                                                            Pelunasan</label>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <input type="text" id="nilaiPelunasan"
                                                            name="nilaiPelunasan" class="form-control"
                                                            style="width: 100%">
                                                    </div>
                                                </div>
                                                <div class="d-flex">
                                                    <div class="col-md-3">
                                                        <label for="noBukti" style="margin-right: 10px;">No.
                                                            Bukti</label>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <input type="text" id="noBukti" namee="noBukti"
                                                            class="form-control" style="width: 100%">
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-5">
                                                        <input type="submit" id="btnProses" name="btnProses"
                                                            value="Proses" class="btn btn-primary">
                                                    </div>
                                                    <div class="col-3">
                                                    </div>
                                                    <div class="col-4">
                                                        <input type="submit" id="btnTutupModal" name="btnTutupModal"
                                                            value="Tutup" class="btn btn-primary">
                                                    </div>
                                                </div>
                                                <input type="hidden" name="detpelunasan" id="detpelunasan"
                                                    value="datpelunasan">
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        <!--MODAL MAINTENANCE DETAIL PELUNASAN-->
                        <div class="modal fade" id="modalDetailPelunasan" tabindex="-1" role="dialog"
                            aria-labelledby="modalDetailPelunasan" aria-hidden="true">
                            <div class="modal-dialog modal-lg" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="pilihBankModal">Maintenance Pilih Bank BKM</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <form method="POST" action="{{ url('MaintenanceBKMPenagihan') }}"
                                        id="formDetailPelunasan">
                                        {{ csrf_field() }}
                                        <input type="hidden" name="_method" id="methoddetail">
                                        <div class="modal-body">
                                            <div class="d-flex">
                                                <div class="col-md-3">
                                                    <label for="idPenagihan" style="margin-right: 10px;">Id.
                                                        Penagihan</label>
                                                </div>
                                                <div class="col-md-3">
                                                    <input type="text" id="idPenagihan" name="idPenagihan"
                                                        class="form-control" style="width: 100%">
                                                </div>
                                                <div class="col-md-3">
                                                    <label for="iddetail" style="margin-right: 10px;">Id.
                                                        Pelunasan</label>
                                                </div>
                                                <div class="col-md-2">
                                                    <input type="text" id="iddetail" name="iddetail"
                                                        class="form-control" style="width: 100%">
                                                </div>
                                            </div>
                                            <div class="d-flex">
                                                <div class="col-md-3">
                                                    <label for="namaCustomer" style="margin-right: 10px;">Nama
                                                        Customer</label>
                                                </div>
                                                <div class="col-md-3">
                                                    <input type="text" id="namaCustomer" name="namaCustomer"
                                                        class="form-control" style="width: 100%">
                                                </div>
                                            </div>
                                            <div class="d-flex">
                                                <div class="col-md-3">
                                                    <label for="nilaiPelunasan" style="margin-right: 10px;">Nilai
                                                        Pelunasan</label>
                                                </div>
                                                <div class="col-md-3">
                                                    <input type="text" id="nilaiPelunasanDetail"
                                                        name="nilaiPelunasanDetail" class="form-control"
                                                        style="width: 100%">
                                                </div>
                                            </div>
                                            <div class="d-flex">
                                                <div class="col-md-3">
                                                    <label for="pelunasanRupiah" style="margin-right: 10px;">Pelunasan
                                                        Rupiah</label>
                                                </div>
                                                <div class="col-md-3">
                                                    <input type="text" id="pelunasanRupiah" name="pelunasanRupiah"
                                                        class="form-control" style="width: 100%">
                                                </div>
                                            </div>
                                            <div class="d-flex">
                                                <div class="col-md-3">
                                                    <label for="kodePerkiraan" style="margin-right: 10px;">Kode
                                                        Perkiraan</label>
                                                </div>
                                                <div class="col-md-2">
                                                    <input type="text" id="idKodePerkiraan" name="idKodePerkiraan"
                                                        class="form-control" style="width: 100%">
                                                </div>
                                                <div class="col-md-7">
                                                    <select name="kodePerkiraanSelect" id="kodePerkiraanSelect"
                                                        class="form-control">

                                                    </select>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-5">
                                                    <input type="submit" id="btnProsesDetail" name="btnProsesDetail"
                                                        value="Proses" class="btn btn-primary">
                                                </div>
                                                <div class="col-3">
                                                </div>
                                                <div class="col-4">
                                                    <input type="submit" id="btnTutupModal" name="btnTutupModal"
                                                        value="Tutup" class="btn btn-primary">
                                                </div>
                                            </div>
                                            <input type="hidden" name="detpelunasan" id="detpelunasan" value="detpelunasan">
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <!--MODAL DETAIL BIAYA-->
                        <div class="modal fade" id="modalDetailBiaya" tabindex="-1" role="dialog"
                        aria-labelledby="pilihBankModal" aria-hidden="true">
                        <div class="modal-dialog modal-lg" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="pilihBankModal">Maintenance Biaya BKM Penagihan</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form action="{{ url('UpdateDetailBKM') }}" id="formDetailBiaya"
                                    method="POST">
                                    {{ csrf_field() }}
                                    <input type="hidden" name="_method" id="methodbiaya">
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="jumlahBiaya" style="margin-right: 10px;">Jumlah Biaya</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="text" id="jumlahBiaya" name="jumlahBiaya"
                                                class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-3">
                                            <label for="idDetailBiaya" style="margin-right: 10px;">Id. Detail</label>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="text" id="idDetailBiaya" name="idDetailBiaya"class="form-control" style="width: 100%">
                                        </div>
                                    </div>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="kodePerkiraan" style="margin-right: 10px;">Kode
                                                Perkiraan</label>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="text" id="idKodePerkiraanBiaya"
                                                name="idKodePerkiraanBiaya" class="form-control"
                                                style="width: 100%">
                                        </div>
                                        <div class="col-md-7">
                                            <select name="kodePerkiraanBiayaSelect" id="kodePerkiraanBiayaSelect" class="form-control">

                                            </select>
                                        </div>
                                    </div>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="keterangan" style="margin-right: 10px;">Keterangan</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="text" id="keteranganBiaya" name="keteranganBiaya"
                                                class="form-control" style="width: 100%">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-5">
                                            <input type="submit" id="btnProsesBiaya"
                                                name="btnProsesBiaya" value="Proses" class="btn btn-primary">
                                        </div>
                                        <div class="col-3">
                                        </div>
                                        <div class="col-4">
                                            <input type="submit" id="btnTutupModal" name="btnTutupModal"
                                                value="Tutup" class="btn btn-primary">
                                        </div>
                                    </div>
                                    <input type="hidden" name="detpelunasan" id="detpelunasan" value="detbiaya">
                                </div>
                            </form>
                        </div>
                    </div>

                        <!--MODAL MAINTENANCE KURANG/LEBIH BKM-->
                        <div class="modal fade" id="modalDetailKurangLebih" tabindex="-1" role="dialog"
                            aria-labelledby="pilihBankModal" aria-hidden="true">
                            <div class="modal-dialog modal-lg" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="pilihBankModal">Maintenance Kurang/Lebih BKM</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <form action="{{ url('MaintenanceBKMPenagihan') }}" id="formDetailKurangLebih"
                                        method="POST">
                                        {{ csrf_field() }}
                                        <input type="hidden" name="_method" id="methodkuranglebih">
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="jumlahUang" style="margin-right: 10px;">Jumlah Uang</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="text" id="jumlahUang" name="jumlahUang"
                                                    class="form-control" style="width: 100%">
                                            </div>
                                            <input type="hidden" name="idcoba" id="idcoba" value="idcoba">
                                        </div>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="kodePerkiraan" style="margin-right: 10px;">Kode
                                                    Perkiraan</label>
                                            </div>
                                            <div class="col-md-2">
                                                <input type="text" id="idKodePerkiraanKrgLbh"
                                                    name="idKodePerkiraanKrgLbh" class="form-control"
                                                    style="width: 100%">
                                            </div>
                                            <div class="col-md-7">
                                                <select name="kodePerkiraanKrgLbhSelect" id="kodePerkiraanKrgLbhSelect" class="form-control">

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
                                                <input type="submit" id="btnProsesKurangLebih"
                                                    name="btnProsesKurangLebih" value="Proses" class="btn btn-primary">
                                            </div>
                                            <div class="col-3">
                                            </div>
                                            <div class="col-4">
                                                <input type="submit" id="btnTutupModal" name="btnTutupModal"
                                                    value="Tutup" class="btn btn-primary">
                                            </div>
                                        </div>
                                        <input type="hidden" name="detpelunasan" id="detpelunasan" value="detkuranglebih">

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
                                        <h5 class="modal-title" >Maintenance Kurang/Lebih BKM</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <form action="{{ url('MaintenanceBKMPenagihan') }}" id="formTampilBKM" method="POST">
                                        {{ csrf_field() }}
                                        <input type="hidden" name="_method" id="methodTampilBKM">
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="tanggalInputTampil" style="margin-right: 10px;">Tanggal Input</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="date" id="tanggalInputTampil" name="tanggalInputTampil" class="form-control" style="width: 100%">
                                            </div>
                                            <div class="col-md-1">
                                               S/D
                                            </div>
                                            <div class="col-md-3">
                                                <input type="date" id="tanggalInputTampil2" name="tanggalInputTampil2" class="form-control" style="width: 100%">
                                            </div>
                                            <div class="col-md-3">
                                                <button id="btnOkTampil" name="btnOkTampil">OK</button>
                                            </div>
                                        </div>
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="idBKM" style="margin-right: 10px;">Id. BKM</label>
                                            </div>
                                            <div class="col-md-2">
                                                <input type="text" id="idBKM" name="idBKM" class="form-control" style="width: 100%">
                                            </div>
                                            <div class="col-md-3">
                                                <button id="btnCETAK" name="btnCETAK">CETAK</button>
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
                                         <input type="hidden" name="detpelunasan" id="detpelunasan" value="dettampilbkm">
                                    </form>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    {{--  --}}
<div class="print" style="visibility: hidden;">
    <div class="container" >
        <div class="row">
            <div class="col-5" style="padding-right: 25px;">
                <div class="row" style="border: solid 1px; justify-content: center; border-bottom: 0px">
                    <h4 style="font-weight: bold">P.T. KERTA RAJASA RAYA</h4>
                </div>
            </div>
            <div class="col-7">
                <div class="row" style="border: solid 1px; justify-content: center; border-bottom: 0px">
                    <h4 style="font-weight: bold">BUKTI PENERIMAAN KAS</h4>
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
                        <span style="display: inline; font-size: 22px; font-weight: bold">NOMER: </span> <span id="nomer" style="display: inline; margin-top: -5px; font-size: 22px; font-weight: bold;"></span>
                    </div>
                    <div id="tanggal" class="col-12">
                        <span style="display: inline; font-size: 22px; font-weight: bold">TANGGAL: </span><span id="tglCetak" style="display: inline; margin-top: -5px; font-size: 22px; font-weight: bold;"></span>
                    </div>
                </div>
            </div>
        </div>

        <br>
        <div class="row">
            <div class="col-12" style="padding-right: 25px;">
                <div class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; margin-right: -2vh;">
                    <div class="col-12" style="height: 2.5vh;">
                        <span style="display: inline; font-size: 18px; padding-left: 50px">Jumlah Diterima: </span><span id="symbol" style="display: inline; margin-top: -5px; font-size: 18px; padding-left: 15px"></span><span id="jumlahDiterima" name="jumlahDiterima" style="display: inline; margin-top: -5px; font-size: 18px; padding-left: 15px"></span>
                    </div>
                    <div class="col-12">
                        <span style="display: inline; font-size: 18px; padding-left: 50px">Terbilang: </span>
                    </div>
                    <div class="col-12">
                        <span id="terbilangCetak" style="display: inline; margin-top: -5px; font-size: 18px; padding-left: 50px"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-7" style="padding-right: 25px;">
                <div class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                    <div class="col-12" style="height: 2.5vh; text-align-last: center;">
                        <span style="font-size: 18px; ">RINCIAN PENERIMAAN</span>
                    </div>
                </div>
            </div>
            <div class="col-3" style="padding-right: 25px;">
                <div class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                    <div class="col-12" style="height: 2.5vh; text-align-last: center;">
                        <span style="font-size: 18px;">KODE PERKIRAAN</span>
                    </div>
                </div>
            </div>
            <div class="col-2" style="padding-right: 25px;">
                <div class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; margin-right: -2vh;">
                    <div class="col-12" style="height: 2.5vh; text-align-last: center;">
                        <span style="font-size: 18px;">JUMLAH</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-7" style="padding-right: 25px;">
                <div class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
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
                <div class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                    <div class="col-12" style="height: 4vh; text-align-last: center;">
                        <span id="kodePerkiraanCetak" style="font-size: 18px;"></span>
                    </div>
                </div>
            </div>
            <div class="col-2" style="padding-right: 25px;">
                <div class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; margin-right: -2vh;">
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
                <div class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; border-right: 0px; margin-right: -3.4vh;">
                    <div class="col-12" style="height: 12vh; text-align-last: center;">
                        <span id="kodePerkiraanCetak" style="font-size: 18px;"></span> <!--KD-->
                    </div>
                </div>
            </div>
            <div class="col-2" style="padding-right: 25px;">
                <div class="row"style="border: solid 1px; justify-content: left; border-bottom: 0px; margin-right: -2vh;">
                    <div class="col-12" style="height: 4vh; text-align-last: right;">
                        <span id="totalK" style="font-size: 18px;">totalK</span>
                    </div>
                    <div class="col-12" style="height: 4vh; text-align-last: right;">
                        <span id="ket3" style="font-size: 18px;">ket3</span><span id="jum" style="font-size: 18px;">jum</span>
                    </div>
                    <div class="col-12" style="height: 4vh; text-align-last: right;">
                        <span id="ket6" style="font-size: 18px;">ket6<span id="jum2" style="font-size: 18px;">jum2</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-10" style="padding-right: 25px;">
                <div class="row"style="border: solid 1px; justify-content: left; border-right: 0px; margin-right: -3.4vh;">
                    <div class="col-12" style="height: 2.5vh; text-align-last: right;">
                        <span style="font-size: 18px; font-weight: bold; padding-left: 45px">GRAND TOTAL: </span><span id="symbol2" style="font-size: 18px; padding-right: 20px"></span>
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
                <div class="row" style="border: solid 1px; border-left: 0px; border-top: 0px; border-right: 0px; text-align-last: center;">
                    <div class="col-12" style="height: 10vh; ">
                        <span id="disetujui" style="font-size: 18px;">Disetujui,</span>
                    </div>
                </div>
            </div>
            <div class="col-3" style="margin-left: 50px">
                <div class="row" style="border: solid 1px; border-left: 0px; border-top: 0px; border-right: 0px; text-align-last: center;">
                    <div class="col-12" style="height: 10vh; ">
                        <span id="kasir" style="font-size: 18px;">Kasir,</span>
                    </div>
                </div>
            </div>
            <div class="col-4" style="margin-right: 25px;">
                <div class="row" style="text-align-last: right;">
                    <div class="col-12" style="height: 10vh; ">
                        <span style="font-size: 18px;">Sidoarjo, </span><span id="tglCetakForm" style="font-size: 18px;"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="{{ asset('js/Accounting/Piutang/MaintenanceBKMPenagihan.js') }}"></script>
@endsection
