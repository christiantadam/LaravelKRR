@extends('layouts.appAccounting')
@section('content')
@section('title', 'Maintenance Informasi Bank')

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Maintenance Informasi Bank untuk Uang Masuk</div>
                    @if (Session::has('success'))
                        <div class="alert alert-success">
                            {{ Session::get('success') }}
                        </div>
                    @endif
                    <meta name="csrf-token" content="{{ csrf_token() }}">
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            <form method="POST" action="{{ url('MaintenanceInformasiBank') }}" id="formkoreksi">
                                {{csrf_field()}}

                                <input type="hidden" name="_method" id="methodkoreksi">
                                <!-- Form fields go here -->
                                <div class="d-flex">
                                    <div class="col-md-2">
                                        <label for="id" style="margin-right: 10px;">Tanggal</label>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="date" id="tanggal" name="tanggal" class="form-control" style="width: 100%">
                                    </div>
                                    <div class="col-md-3">
                                        <input type="submit" id="btnOk" name="btnOk" value="OK" class="btn btn-primary">
                                    </div>
                                </div>

                                <br><div>
                                    <div style="overflow-y: auto; max-height: 400px;">
                                        <table style="width: 300%; table-layout: fixed;" id="tabelInfoBank">
                                            <colgroup>
                                                <col style="width: 25%;">
                                                <col style="width: 25%;">
                                                <col style="width: 25%;">
                                                <col style="width: 25%;">
                                                <col style="width: 25%;">
                                                <col style="width: 25%;">
                                                <col style="width: 25%;">
                                                <col style="width: 25%;">
                                                <col style="width: 25%;">
                                                <col style="width: 25%;">
                                                <col style="width: 25%;">
                                                <col style="width: 25%;">
                                            </colgroup>
                                            <thead class="table-dark">
                                                <tr>
                                                    <th>Id. Referensi</th>
                                                    <th>Nama Bank</th>
                                                    <th>Mata Uang</th>
                                                    <th>Nilai</th>
                                                    <th>Keterangan</th>
                                                    <th>Nama Customer</th>
                                                    <th>Id. Bank</th>
                                                    <th>Id. Mata Uang</th>
                                                    <th>Tipe Transaksi</th>
                                                    <th>Id. Jenis Bayar</th>
                                                    <th>Jenis Pembayaran</th>
                                                    <th>No Bukti</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <br>
                                <div class="d-flex">
                                    <div class="col-md-2">
                                        <label for="id" style="margin-right: 10px;">Nama Bank</label>
                                    </div>
                                    <div class="col-md-5">
                                        <select id="namaBankSelect" name="namaBankSelect" class="form-control" readonly>
                                        </select>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="hidden" id="idBank" name="idBank" class="form-control" style="width: 100%" readonly>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" id="idReferensi" name="idReferensi" class="form-control" style="width: 100%" readonly>
                                    </div>
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-2">
                                        <label for="mataUangSelect" style="margin-right: 10px;">Mata Uang</label>
                                    </div>
                                    <div class="col-md-5">
                                        <select id="mataUangSelect" name="mataUangSelect" class="form-control" readonly>
                                        </select>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="hidden" id="idMataUang" name="idMataUang" class="form-control" style="width: 100%" readonly>
                                    </div>
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-2">
                                        <label for="id" style="margin-right: 10px;">Total Nilai</label>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="text" id="totalNilai" name="totalNilai" class="form-control" style="width: 100%" readonly>
                                    </div>
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-2">
                                        <label for="id" style="margin-right: 10px;">Keterangan</label>
                                    </div>
                                    <div class="col-md-10">
                                        <input type="text" id="keterangan" name="keterangan" class="form-control" style="width: 100%" readonly>
                                    </div>
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-2"></div>
                                        <div class="col-md-6">
                                            <input type="radio" name="radiogrup1" value="T" id="radiogrup1" readonly>
                                            <label for="radiogrup1">Transfer</label>
                                        </div>
                                        <div class="col-md-6">
                                            <input type="radio" name="radiogrup1" value="K" id="radiogrup1" readonly>
                                            <label for="radiogrup1">Hasil Kliring</label>
                                        </div>
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-2">
                                        <label for="jenisPembayaranSelect" style="margin-right: 10px;">Jenis Pembayaran</label>
                                    </div>
                                    <div class="col-md-6">
                                        <select id="jenisPembayaranSelect" name="jenisPembayaranSelect" class="form-control" readonly>

                                        </select>
                                    </div>
                                    <div class="col-md-4">
                                        <input type="text" id="idJenisPembayaran" name="idJenisPembayaran" class="form-control" style="width: 100%" readonly>
                                    </div>
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-2">
                                        <label for="noBukti" style="margin-right: 10px;">No. Bukti</label>
                                    </div>
                                    <div class="col-md-10">
                                        <input type="text" id="noBukti" name="noBukti" class="form-control" style="width: 100%" readonly>
                                    </div>
                                </div>
                                <p><br><div class="mb-3">
                                    <div class="row">
                                        <div class="col-2">
                                            <input type="submit" id="btnIsi" name="btnIsi" value="Isi" class="btn btn-primary">
                                            <input type="submit" id="btnSimpan" name="btnSimpan" value="Simpan" class="btn btn-success" style="display: none" onclick="clickSimpan()">
                                            <input type="submit" id="btnSimpanKoreksi" name="btnSimpanKoreksi" value="Simpan" class="btn btn-success" style="display: none" onclick="clickSimpanKoreksi()">
                                        </div>
                                        <div class="col-2">
                                            <input type="submit" id="btnKoreksi" name="btnKoreksi" value="Koreksi" class="btn btn-warning">
                                            <input type="submit" id="btnBatal" name="btnBatal" value="Batal" class="btn btn-warning" style="display: none">
                                        </div>
                                        <div class="col-2">
                                            <input type="submit" id="btnHapus" name="btnHapus" value="Hapus" class="btn btn-danger">
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <br>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<script src="{{ asset('js/Piutang/InformasiBank/MaintenanceInformasiBank.js') }}"></script>
@endsection
