@extends('layouts.appAccounting')
@section('content')
@section('title', 'Maintenance BKM KRR1')

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Maintenance Bukti Kas Masuk Tunai</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        <form method="POST" action="">
                            @csrf
                            <!-- Form fields go here -->
                            <div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label for="id">Id. BKM</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" name="id_bkm" class="form-control"
                                            style="width: 100%" id="id_bkm">
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label for="id">Tanggal Input</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="date" name="tanggal_input" class="form-control"
                                            style="width: 100%" id="tanggal_input">
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label for="id">Diterima Dari</label>
                                    </div>
                                    <div class="col-md-5">
                                        <input type="text" name="diterima_dari" class="form-control"
                                            style="width: 100%" id="diterima_dari">
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label for="id">Mata Uang</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" name="mata_uang" class="form-control" style="width: 100%"
                                            id="mata_uang">
                                        <input type="text" name="kode_matauang" class="form-control"
                                            style="width: 100%; display: none" id="kode_matauang">
                                    </div>
                                    <div class="col-md-1">
                                        <button type="button" class="btn btn-default" id="btn_matauang">...</button>
                                    </div>
                                    <div style="padding-left: 50px">
                                        <label for="id">Kurs Rupiah</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" name="kurs_rupiah" class="form-control"
                                            style="width: 100%" id="kurs_rupiah">
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label for="id">Jumlah Uang</label>
                                    </div>
                                    <div class="col-md-5">
                                        <input type="number" name="jumlah_uang" class="form-control"
                                            style="width: 100%" id="jumlah_uang">
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label for="id">Bank</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" name="nama_bank" class="form-control" style="width: 100%"
                                            id="nama_bank">
                                        <input type="text" name="id_bank" class="form-control" style="width: 100%; display: none"
                                            id="id_bank">
                                        <input type="text" name="jenis_bank" class="form-control" style="width: 100%; display: none"
                                            id="jenis_bank">
                                    </div>
                                    <div class="col-md-1">
                                        <button type="button" class="btn btn-default" id="btn_bank">...</button>
                                    </div>
                                    <button type="button" class="btn" id="btn_tambahbiaya">Tambah Biaya</button>
                                </div>
                            </div>
                            <br>
                            <div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label for="id">Kode Perkiraan</label>
                                    </div>
                                    <div class="col-md-1">
                                        <input type="text" name="kode_kira" class="form-control" style="width: 100%"
                                            id="kode_kira">
                                    </div>
                                    <div class="col-md-4">
                                        <input type="text" name="keterangan_kira" class="form-control"
                                            style="width: 100%" id="keterangan_kira">
                                    </div>
                                    <div class="col-md-1">
                                        <button type="button" class="btn btn-default"
                                            id="btn_kodeperkiraan">...</button>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label for="id">No. Bukti</label>
                                    </div>
                                    <div class="col-md-6">
                                        <input type="text" name="no_bukti" class="form-control"
                                            style="width: 100%" id="no_bukti">
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label for="id">Uraian</label>
                                    </div>
                                    <div class="col-md-6">
                                        <input type="text" name="uraian" class="form-control"
                                            style="width: 100%" id="uraian">
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div class="mb-3">
                                <div class="row">
                                    <div class="col-2" style="padding-left: 15px">
                                        <button type="button" class="btn btn-primary" id="btn_tambahdata"
                                            style="width: 130px;">Tambah Data</button>
                                    </div>
                                    <div class="col-7" style="padding-left: 15px">
                                        <button type="button" class="btn btn-success" id="btn_proses"
                                            style="width: 130px;">PROSES</button>
                                    </div>
                                    <div class="col-1" style="padding-left: 15px">
                                        <button type="button" class="btn" id="btn_batal"
                                            style="width: 100px;">Batal</button>
                                    </div>
                                    <div class="col-1" style="padding-left: 15px">
                                        <button type="button" class="btn btn-warning" id="btn_koreksi"
                                            style="width: 100px;">Koreksi</button>
                                    </div>
                                    <div class="col-1">
                                        <button type="button" class="btn btn-danger" id="btn_hapus"
                                            style="width: 100px;">Hapus</button>
                                    </div>
                                </div>
                            </div>

                            <div class="card-container" style="display: flex;">
                                <div class="card" style="width: 60%;">
                                    <div class="card-body">
                                        <b>Detail Data</b>
                                        <div style="overflow-x: auto;">
                                            <table style="width: 180%;" id="table_kiri">
                                                <thead class="table-dark">
                                                    <tr>
                                                        <th>Id. Detail</th>
                                                        <th>Terima Dari</th>
                                                        <th>Jumlah Uang</th>
                                                        <th>Kode Perkiraan</th>
                                                        <th>Uraian</th>
                                                        <th>Jenis Pembayaran</th>
                                                        <th>No. Bukti</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>


                                <!--CARD 2-->
                                <div class="card" style="width: 40%;">
                                    <div class="card-body">
                                        <b>Detail Biaya</b>
                                        <div style="overflow-x: auto;">
                                            <table style="width: 150%;" id="table_kanan">
                                                <thead class="table-dark">
                                                    <tr>
                                                        <th>Keterangan</th>
                                                        <th>Biaya</th>
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
                            <div>
                                <div class="row">
                                    <div class="col-md-1"></div>
                                    <div class="col-md-2">
                                        <b><label for="id">Total Pelunasan</label></b>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="number" name="bankSelect" class="form-control"
                                            style="width: 100%">
                                    </div>
                                    <div class="col-md-2"></div>
                                    <div class="col-md-2">
                                        <button type="button" class="btn" id="btn_tampilbkk"
                                            style="width: 130px;">Tampil BKK</button>
                                    </div>
                                    <div class="col-md-1">
                                        {{-- <input type="submit" name="tutup" value="TUTUP" class="btn btn-primary d-flex ml-auto"> --}}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('js/Accounting/Hutang/MaintenanceBKMKRR1.js') }}"></script>
@endsection
