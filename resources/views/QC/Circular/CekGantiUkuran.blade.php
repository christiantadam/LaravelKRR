@extends('layouts.appQC')
@section('content')
@section('title', 'Cek Ganti Ukuran Circular')
{{-- <link href="{{ asset('css/ListPurchaseOrder.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet"> --}}
<style>
    .switch-lampu .form-check-input {
        width: 3.2rem;
        height: 1.6rem;
        cursor: pointer;
    }

    .switch-lampu .form-check-input:checked {
        background-color: #28a745;
        border-color: #28a745;
    }

    .switch-lampu .form-check-input:not(:checked) {
        background-color: #dc3545;
        border-color: #dc3545;
    }

    .switch-lampu .form-check-label {
        margin-left: 8px;
        font-weight: bold;
    }

    .switch-lampu .text-on {
        color: #28a745;
    }

    .switch-lampu .text-off {
        color: #dc3545;
    }

    .container-fluid {
        transform: scale(0.9);
        transform-origin: top left;
        width: 111.11%;
    }
</style>
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            @if (Session::has('success'))
                <div class="alert alert-success">
                    {{ Session::get('success') }}
                </div>
            @elseif (Session::has('error'))
                <div class="alert alert-danger">
                    {{ Session::get('error') }}
                </div>
            @endif
            <div class="card font-weight-bold">
                <div class="card-header">Cek Ganti Ukuran Circular&emsp;FM-8.2-03-QC-01-02</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="col-12">
                        <div class="card">
                            <label style="font-weight: bold;" id="labelProses">Input Data</label>
                            <br>
                            <div class="row">
                                <div class="col-md-1">
                                    <label for="lokasi">Lokasi</label>
                                </div>
                                <div class="col-md-3">
                                    <select id="lokasi" class="form-select form-select-sm" style="width: 100%">
                                        <option></option>
                                        @foreach ($listLokasi as $d)
                                            <option value="{{ $d->idLokasi }}">
                                                {{ $d->idLokasi . ' | ' . $d->nama_lokasi }}
                                            </option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-8">
                                    <label for="radiobutton" class="form-check-label">
                                        Tanggal Ganti Ukuran Circular
                                    </label>
                                    <div class="row align-items-center mt-1">
                                        <div class="col-auto">
                                            <input type="date" class="form-control font-weight-bold" id="tgl_awal"
                                                name="tgl_awal">
                                        </div>
                                        <div class="col-auto">
                                            <label class="mb-0">s/d</label>
                                        </div>
                                        <div class="col-auto">
                                            <input type="date" class="form-control font-weight-bold" id="tgl_akhir"
                                                name="tgl_akhir">
                                        </div>
                                        <div class="col-auto">
                                            <button class="btn btn-info" id="btn_redisplay">
                                                Redisplay
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <table class ="table table-bordered text-center align-middle" id="table_atas"
                                style="width: 100%">
                                <thead class="table-dark" style="text-align: center">
                                    <tr>
                                        <th rowspan="2">ID</th>
                                        <th rowspan="2">Tanggal</th>
                                        <th rowspan="2">Type Mesin</th>
                                        <th rowspan="2">Mesin</th>
                                        <th rowspan="2">Ukuran Asal</th>
                                        <th rowspan="2">Ukuran Baru</th>
                                        <th rowspan="2">Berat Standart</th>
                                        <th rowspan="2">Berat Realita</th>
                                        <th colspan="2">Benang</th>
                                        <th rowspan="2">Jumlah Warp</th>
                                        <th rowspan="2">User Input</th>
                                        {{-- <th rowspan="2">Aksi</th> --}}
                                    </tr>
                                    <tr>
                                        <th>WA</th>
                                        <th>WE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                            <br>
                            <div class="row">
                                <div class="col-md-1">
                                    <label for="tanggal">Tanggal Cek</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="date" name="tanggal" class="form-control" style="width: 100%"
                                        id="tanggal">
                                </div>
                                <div class="col-md-2 d-flex justify-content-end">
                                    <label for="tanggalGU">Tanggal Ganti Ukuran</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="date" name="tanggalGU" class="form-control" style="width: 100%"
                                        id="tanggalGU" readonly>
                                </div>
                                <div class="col-md-1 d-flex justify-content-end">
                                    <label for="shift">Shift</label>
                                </div>
                                <div class="col-md-2">
                                    <select id="shift" class="form-select form-select-sm" style="width: 100%">
                                        {{-- <option disabled selected>Pilih Shift</option> --}}
                                        <option></option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                    </select>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-1">
                                    <label for="type_mesin">Type Mesin</label>
                                </div>
                                <div class="col-md-3">
                                    <select id="type_mesin" class="form-select form-select-sm" style="width: 100%">
                                        <option></option>
                                        @foreach ($listTypeMesin as $d)
                                            <option value="{{ $d->IdType_Mesin }}">
                                                {{ $d->IdType_Mesin . ' | ' . $d->Type_Mesin }}
                                            </option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="col-md-2">
                                    <select id="nama_mesin" class="form-select form-select-sm" style="width: 100%">
                                        <option></option>
                                    </select>
                                </div>
                                <div class="col-md-2 d-flex justify-content-end">
                                    <label for="jam_kerja">Jam Kerja</label>
                                </div>
                                <div class="col-md-3">
                                    <div class="input-group input-group-sm">
                                        <input type="time" id="jam_kerja_awal" class="form-control">
                                        <label>&nbsp;s/d&nbsp;</label>
                                        <input type="time" id="jam_kerja_akhir" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-2 d-flex align-items-center">
                                    <label for="std_wa" class="mb-0">Benang Warp</label>
                                </div>
                                <!-- Standart -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="std_wa" class="form-label font-weight-bold text-center">
                                        Standart
                                    </label>
                                    <input type="text" class="form-control text-center" id="std_wa"
                                        name="std_wa">
                                </div>
                                <!-- Toleransi -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="toleransi_wa" class="form-label font-weight-bold text-center">
                                        Toleransi
                                    </label>
                                    <input type="text" class="form-control text-center" id="toleransi_wa"
                                        name="toleransi_wa">
                                </div>
                                <!-- Periksa -->
                                <div class="col-1 d-flex flex-column align-items-center">
                                    <label for="periksa_wa" class="form-label font-weight-bold text-center">
                                        Periksa
                                    </label>
                                    <input type="text" class="form-control text-center" id="periksa_wa"
                                        name="periksa_wa">
                                </div>
                                <!-- Selisih -->
                                <div class="col-1 d-flex flex-column align-items-center">
                                    <label for="selisih_wa" class="form-label font-weight-bold text-center">
                                        Selisih
                                    </label>
                                    <input type="text" class="form-control text-center" id="selisih_wa"
                                        name="selisih_wa">
                                </div>
                                <!-- Keputusan -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label class="form-label font-weight-bold text-center">
                                        Keputusan
                                    </label>

                                    <input type="hidden" name="keputusan_wa" value="Tidak">

                                    <select id="keputusan_wa" class="form-select form-select-sm text-center"
                                        style="width: 100%">
                                        <option></option>
                                        <option value="Masuk">Masuk</option>
                                        <option value="Tidak">Tidak</option>
                                    </select>
                                </div>
                                <!-- Keterangan -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="keterangan_wa" class="form-label font-weight-bold text-center">
                                        Keterangan
                                    </label>
                                    <input type="text" class="form-control text-center" id="keterangan_wa"
                                        name="keterangan_wa">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-2 d-flex align-items-center">
                                    <label for="std_we" class="mb-0">Benang Weft</label>
                                </div>
                                <!-- Standart -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="std_we" class="form-label font-weight-bold text-center">
                                        Standart
                                    </label>
                                    <input type="text" class="form-control text-center" id="std_we"
                                        name="std_we">
                                </div>
                                <!-- Toleransi -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="toleransi_we" class="form-label font-weight-bold text-center">
                                        Toleransi
                                    </label>
                                    <input type="text" class="form-control text-center" id="toleransi_we"
                                        name="toleransi_we">
                                </div>
                                <!-- Periksa -->
                                <div class="col-1 d-flex flex-column align-items-center">
                                    <label for="periksa_we" class="form-label font-weight-bold text-center">
                                        Periksa
                                    </label>
                                    <input type="text" class="form-control text-center" id="periksa_we"
                                        name="periksa_we">
                                </div>
                                <!-- Selisih -->
                                <div class="col-1 d-flex flex-column align-items-center">
                                    <label for="selisih_we" class="form-label font-weight-bold text-center">
                                        Selisih
                                    </label>
                                    <input type="text" class="form-control text-center" id="selisih_we"
                                        name="selisih_we">
                                </div>
                                <!-- Keputusan -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label class="form-label font-weight-bold text-center">
                                        Keputusan
                                    </label>

                                    <input type="hidden" name="keputusan_we" value="Tidak">

                                    <select id="keputusan_we" class="form-select form-select-sm text-center"
                                        style="width: 100%">
                                        <option></option>
                                        <option value="Masuk">Masuk</option>
                                        <option value="Tidak">Tidak</option>
                                    </select>
                                </div>
                                <!-- Keterangan -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="keterangan_we" class="form-label font-weight-bold text-center">
                                        Keterangan
                                    </label>
                                    <input type="text" class="form-control text-center" id="keterangan_we"
                                        name="keterangan_we">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-2 d-flex align-items-center">
                                    <label for="std_warna" class="mb-0">Warna</label>
                                </div>
                                <!-- Standart -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="std_warna" class="form-label font-weight-bold text-center">
                                        Standart
                                    </label>
                                    <input type="text" class="form-control text-center" id="std_warna"
                                        name="std_warna">
                                </div>
                                <!-- Toleransi -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="toleransi_warna" class="form-label font-weight-bold text-center">
                                        Toleransi
                                    </label>
                                    <input type="text" class="form-control text-center" id="toleransi_warna"
                                        name="toleransi_warna">
                                </div>
                                <!-- Periksa -->
                                <div class="col-1 d-flex flex-column align-items-center">
                                    <label for="periksa_warna" class="form-label font-weight-bold text-center">
                                        Periksa
                                    </label>
                                    <input type="text" class="form-control text-center" id="periksa_warna"
                                        name="periksa_warna">
                                </div>
                                <!-- Selisih -->
                                <div class="col-1 d-flex flex-column align-items-center">
                                    <label for="selisih_warna" class="form-label font-weight-bold text-center">
                                        Selisih
                                    </label>
                                    <input type="text" class="form-control text-center" id="selisih_warna"
                                        name="selisih_warna">
                                </div>
                                <!-- Keputusan -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label class="form-label font-weight-bold text-center">
                                        Keputusan
                                    </label>

                                    <input type="hidden" name="keputusan_warna" value="Tidak">

                                    <select id="keputusan_warna" class="form-select form-select-sm text-center"
                                        style="width: 100%">
                                        <option></option>
                                        <option value="Masuk">Masuk</option>
                                        <option value="Tidak">Tidak</option>
                                    </select>
                                </div>
                                <!-- Keterangan -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="keterangan_warna" class="form-label font-weight-bold text-center">
                                        Keterangan
                                    </label>
                                    <input type="text" class="form-control text-center" id="keterangan_warna"
                                        name="keterangan_warna">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-2 d-flex align-items-center">
                                    <label for="std_dropper" class="mb-0">Dropper</label>
                                </div>
                                <!-- Standart -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="std_dropper" class="form-label font-weight-bold text-center">
                                        Standart
                                    </label>
                                    <input type="text" class="form-control text-center" id="std_dropper"
                                        name="std_dropper">
                                </div>
                                <!-- Toleransi -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="toleransi_dropper" class="form-label font-weight-bold text-center">
                                        Toleransi
                                    </label>
                                    <input type="text" class="form-control text-center" id="toleransi_dropper"
                                        name="toleransi_dropper">
                                </div>
                                <!-- Periksa -->
                                <div class="col-1 d-flex flex-column align-items-center">
                                    <label for="periksa_dropper" class="form-label font-weight-bold text-center">
                                        Periksa
                                    </label>
                                    <input type="text" class="form-control text-center" id="periksa_dropper"
                                        name="periksa_dropper">
                                </div>
                                <!-- Selisih -->
                                <div class="col-1 d-flex flex-column align-items-center">
                                    <label for="selisih_dropper" class="form-label font-weight-bold text-center">
                                        Selisih
                                    </label>
                                    <input type="text" class="form-control text-center" id="selisih_dropper"
                                        name="selisih_dropper">
                                </div>
                                <!-- Keputusan -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label class="form-label font-weight-bold text-center">
                                        Keputusan
                                    </label>

                                    <input type="hidden" name="keputusan_dropper" value="Tidak">

                                    <select id="keputusan_dropper" class="form-select form-select-sm text-center"
                                        style="width: 100%">
                                        <option></option>
                                        <option value="Masuk">Masuk</option>
                                        <option value="Tidak">Tidak</option>
                                    </select>
                                </div>
                                <!-- Keterangan -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="keterangan_dropper" class="form-label font-weight-bold text-center">
                                        Keterangan
                                    </label>
                                    <input type="text" class="form-control text-center" id="keterangan_dropper"
                                        name="keterangan_dropper">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-2 d-flex align-items-center">
                                    <label for="std_guadring" class="mb-0">Guadring</label>
                                </div>
                                <!-- Standart -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="std_guadring" class="form-label font-weight-bold text-center">
                                        Standart
                                    </label>
                                    <input type="text" class="form-control text-center" id="std_guadring"
                                        name="std_guadring">
                                </div>
                                <!-- Toleransi -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="toleransi_guadring" class="form-label font-weight-bold text-center">
                                        Toleransi
                                    </label>
                                    <input type="text" class="form-control text-center" id="toleransi_guadring"
                                        name="toleransi_guadring" value ="± 1 cm">
                                </div>
                                <!-- Periksa -->
                                <div class="col-1 d-flex flex-column align-items-center">
                                    <label for="periksa_guadring" class="form-label font-weight-bold text-center">
                                        Periksa
                                    </label>
                                    <input type="text" class="form-control text-center" id="periksa_guadring"
                                        name="periksa_guadring">
                                </div>
                                <!-- Selisih -->
                                <div class="col-1 d-flex flex-column align-items-center">
                                    <label for="selisih_guadring" class="form-label font-weight-bold text-center">
                                        Selisih
                                    </label>
                                    <input type="text" class="form-control text-center" id="selisih_guadring"
                                        name="selisih_guadring">
                                </div>
                                <!-- Keputusan -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label class="form-label font-weight-bold text-center">
                                        Keputusan
                                    </label>

                                    <input type="hidden" name="keputusan_guadring" value="Tidak">

                                    <select id="keputusan_guadring" class="form-select form-select-sm text-center"
                                        style="width: 100%">
                                        <option></option>
                                        <option value="Masuk">Masuk</option>
                                        <option value="Tidak">Tidak</option>
                                    </select>
                                </div>
                                <!-- Keterangan -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="keterangan_guadring" class="form-label font-weight-bold text-center">
                                        Keterangan
                                    </label>
                                    <input type="text" class="form-control text-center" id="keterangan_guadring"
                                        name="keterangan_guadring">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-2 d-flex align-items-center">
                                    <label for="std_jmlWA" class="mb-0">Jumlah Benang Warp</label>
                                </div>
                                <!-- Standart -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="std_jmlWA" class="form-label font-weight-bold text-center">
                                        Standart
                                    </label>
                                    <input type="text" class="form-control text-center" id="std_jmlWA"
                                        name="std_jmlWA">
                                </div>
                                <!-- Toleransi -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="toleransi_jmlWA" class="form-label font-weight-bold text-center">
                                        Toleransi
                                    </label>
                                    <input type="text" class="form-control text-center" id="toleransi_jmlWA"
                                        name="toleransi_jmlWA" value ="± 3 %">
                                </div>
                                <!-- Periksa -->
                                <div class="col-1 d-flex flex-column align-items-center">
                                    <label for="periksa_jmlWA" class="form-label font-weight-bold text-center">
                                        Periksa
                                    </label>
                                    <input type="text" class="form-control text-center" id="periksa_jmlWA"
                                        name="periksa_jmlWA">
                                </div>
                                <!-- Selisih -->
                                <div class="col-1 d-flex flex-column align-items-center">
                                    <label for="selisih_jmlWA" class="form-label font-weight-bold text-center">
                                        Selisih
                                    </label>
                                    <input type="text" class="form-control text-center" id="selisih_jmlWA"
                                        name="selisih_jmlWA">
                                </div>
                                <!-- Keputusan -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label class="form-label font-weight-bold text-center">
                                        Keputusan
                                    </label>

                                    <input type="hidden" name="keputusan_jmlWA" value="Tidak">

                                    <select id="keputusan_jmlWA" class="form-select form-select-sm text-center"
                                        style="width: 100%">
                                        <option></option>
                                        <option value="Masuk">Masuk</option>
                                        <option value="Tidak">Tidak</option>
                                    </select>
                                </div>
                                <!-- Keterangan -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="keterangan_jmlWA" class="form-label font-weight-bold text-center">
                                        Keterangan
                                    </label>
                                    <input type="text" class="form-control text-center" id="keterangan_jmlWA"
                                        name="keterangan_jmlWA">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-2 d-flex align-items-center">
                                    <label for="std_cg" class="mb-0">Change Gear</label>
                                </div>
                                <!-- Standart -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="std_cg" class="form-label font-weight-bold text-center">
                                        Standart
                                    </label>
                                    <input type="text" class="form-control text-center" id="std_cg"
                                        name="std_cg">
                                </div>
                                <!-- Toleransi -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="toleransi_cg" class="form-label font-weight-bold text-center">
                                        Toleransi
                                    </label>
                                    <input type="text" class="form-control text-center" id="toleransi_cg"
                                        name="toleransi_cg">
                                </div>
                                <!-- Periksa -->
                                <div class="col-1 d-flex flex-column align-items-center">
                                    <label for="periksa_cg" class="form-label font-weight-bold text-center">
                                        Periksa
                                    </label>
                                    <input type="text" class="form-control text-center" id="periksa_cg"
                                        name="periksa_cg">
                                </div>
                                <!-- Selisih -->
                                <div class="col-1 d-flex flex-column align-items-center">
                                    <label for="selisih_cg" class="form-label font-weight-bold text-center">
                                        Selisih
                                    </label>
                                    <input type="text" class="form-control text-center" id="selisih_cg"
                                        name="selisih_cg">
                                </div>
                                <!-- Keputusan -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label class="form-label font-weight-bold text-center">
                                        Keputusan
                                    </label>

                                    <input type="hidden" name="keputusan_cg" value="Tidak">

                                    <select id="keputusan_cg" class="form-select form-select-sm text-center"
                                        style="width: 100%">
                                        <option></option>
                                        <option value="Masuk">Masuk</option>
                                        <option value="Tidak">Tidak</option>
                                    </select>
                                </div>
                                <!-- Keterangan -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="keterangan_cg" class="form-label font-weight-bold text-center">
                                        Keterangan
                                    </label>
                                    <input type="text" class="form-control text-center" id="keterangan_cg"
                                        name="keterangan_cg">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-2 d-flex align-items-center">
                                    <label for="std_mr" class="mb-0">Mutu Rajutan</label>
                                </div>
                                <!-- Standart -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="std_mr" class="form-label font-weight-bold text-center">
                                        Standart
                                    </label>
                                    <input type="text" class="form-control text-center" id="std_mr"
                                        name="std_mr">
                                </div>
                                <!-- Toleransi -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="toleransi_mr" class="form-label font-weight-bold text-center">
                                        Toleransi
                                    </label>
                                    <input type="text" class="form-control text-center" id="toleransi_mr"
                                        name="toleransi_mr" value ="± 0.5">
                                </div>
                                <!-- Periksa -->
                                <div class="col-1 d-flex flex-column align-items-center">
                                    <label for="periksa_mr" class="form-label font-weight-bold text-center">
                                        Periksa
                                    </label>
                                    <input type="text" class="form-control text-center" id="periksa_mr"
                                        name="periksa_mr">
                                </div>
                                <!-- Selisih -->
                                <div class="col-1 d-flex flex-column align-items-center">
                                    <label for="selisih_mr" class="form-label font-weight-bold text-center">
                                        Selisih
                                    </label>
                                    <input type="text" class="form-control text-center" id="selisih_mr"
                                        name="selisih_mr">
                                </div>
                                <!-- Keputusan -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label class="form-label font-weight-bold text-center">
                                        Keputusan
                                    </label>

                                    <input type="hidden" name="keputusan_mr" value="Tidak">

                                    <select id="keputusan_mr" class="form-select form-select-sm text-center"
                                        style="width: 100%">
                                        <option></option>
                                        <option value="Masuk">Masuk</option>
                                        <option value="Tidak">Tidak</option>
                                    </select>
                                </div>
                                <!-- Keterangan -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="keterangan_mr" class="form-label font-weight-bold text-center">
                                        Keterangan
                                    </label>
                                    <input type="text" class="form-control text-center" id="keterangan_mr"
                                        name="keterangan_mr">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-2 d-flex align-items-center">
                                    <label for="std_bk" class="mb-0">Berat Karung per-meter</label>
                                </div>
                                <!-- Standart -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="std_bk" class="form-label font-weight-bold text-center">
                                        Standart
                                    </label>
                                    <input type="text" class="form-control text-center" id="std_bk"
                                        name="std_bk">
                                </div>
                                <!-- Toleransi -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="toleransi_bk" class="form-label font-weight-bold text-center">
                                        Toleransi
                                    </label>
                                    <input type="text" class="form-control text-center" id="toleransi_bk"
                                        name="toleransi_bk" value ="± 3 %">
                                </div>
                                <!-- Periksa -->
                                <div class="col-1 d-flex flex-column align-items-center">
                                    <label for="periksa_bk" class="form-label font-weight-bold text-center">
                                        Periksa
                                    </label>
                                    <input type="text" class="form-control text-center" id="periksa_bk"
                                        name="periksa_bk">
                                </div>
                                <!-- Selisih -->
                                <div class="col-1 d-flex flex-column align-items-center">
                                    <label for="selisih_bk" class="form-label font-weight-bold text-center">
                                        Selisih
                                    </label>
                                    <input type="text" class="form-control text-center" id="selisih_bk"
                                        name="selisih_bk">
                                </div>
                                <!-- Keputusan -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label class="form-label font-weight-bold text-center">
                                        Keputusan
                                    </label>

                                    <input type="hidden" name="keputusan_bk" value="Tidak">

                                    <select id="keputusan_bk" class="form-select form-select-sm text-center"
                                        style="width: 100%">
                                        <option></option>
                                        <option value="Masuk">Masuk</option>
                                        <option value="Tidak">Tidak</option>
                                    </select>
                                </div>
                                <!-- Keterangan -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="keterangan_bk" class="form-label font-weight-bold text-center">
                                        Keterangan
                                    </label>
                                    <input type="text" class="form-control text-center" id="keterangan_bk"
                                        name="keterangan_bk">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-2 d-flex align-items-center">
                                    <label for="std_lk" class="mb-0">Lebar Karung</label>
                                </div>
                                <!-- Standart -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="std_lk" class="form-label font-weight-bold text-center">
                                        Standart
                                    </label>
                                    <input type="text" class="form-control text-center" id="std_lk"
                                        name="std_lk">
                                </div>
                                <!-- Toleransi -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="toleransi_lk" class="form-label font-weight-bold text-center">
                                        Toleransi
                                    </label>
                                    <input type="text" class="form-control text-center" id="toleransi_lk"
                                        name="toleransi_lk" value ="-0 / + 1 cm">
                                </div>
                                <!-- Periksa -->
                                <div class="col-1 d-flex flex-column align-items-center">
                                    <label for="periksa_lk" class="form-label font-weight-bold text-center">
                                        Periksa
                                    </label>
                                    <input type="text" class="form-control text-center" id="periksa_lk"
                                        name="periksa_lk">
                                </div>
                                <!-- Selisih -->
                                <div class="col-1 d-flex flex-column align-items-center">
                                    <label for="selisih_lk" class="form-label font-weight-bold text-center">
                                        Selisih
                                    </label>
                                    <input type="text" class="form-control text-center" id="selisih_lk"
                                        name="selisih_lk">
                                </div>
                                <!-- Keputusan -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label class="form-label font-weight-bold text-center">
                                        Keputusan
                                    </label>

                                    <input type="hidden" name="keputusan_lk" value="Tidak">

                                    <select id="keputusan_lk" class="form-select form-select-sm text-center"
                                        style="width: 100%">
                                        <option></option>
                                        <option value="Masuk">Masuk</option>
                                        <option value="Tidak">Tidak</option>
                                    </select>
                                </div>
                                <!-- Keterangan -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="keterangan_lk" class="form-label font-weight-bold text-center">
                                        Keterangan
                                    </label>
                                    <input type="text" class="form-control text-center" id="keterangan_lk"
                                        name="keterangan_lk">
                                </div>
                            </div>
                            <div class="row" style="display: none">
                                <div class="col-md-2 d-flex align-items-center">
                                    <label for="std_lk2" class="mb-0">Lebar Karung</label>
                                </div>
                                <!-- Standart -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="std_lk2" class="form-label font-weight-bold text-center">
                                        Standart
                                    </label>
                                    <input type="text" class="form-control text-center" id="std_lk2"
                                        name="std_lk2">
                                </div>
                                <!-- Toleransi -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="toleransi_lk2" class="form-label font-weight-bold text-center">
                                        Toleransi
                                    </label>
                                    <input type="text" class="form-control text-center" id="toleransi_lk2"
                                        name="toleransi_lk2" value ="-0 / + 1 cm">
                                </div>
                                <!-- Periksa -->
                                <div class="col-1 d-flex flex-column align-items-center">
                                    <label for="periksa_lk2" class="form-label font-weight-bold text-center">
                                        Periksa
                                    </label>
                                    <input type="text" class="form-control text-center" id="periksa_lk2"
                                        name="periksa_lk2">
                                </div>
                                <!-- Selisih -->
                                <div class="col-1 d-flex flex-column align-items-center">
                                    <label for="selisih_lk2" class="form-label font-weight-bold text-center">
                                        Selisih
                                    </label>
                                    <input type="text" class="form-control text-center" id="selisih_lk2"
                                        name="selisih_lk2">
                                </div>
                                <!-- Keputusan -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label class="form-label font-weight-bold text-center">
                                        Keputusan
                                    </label>

                                    <input type="hidden" name="keputusan_lk2" value="Tidak">

                                    <select id="keputusan_lk2" class="form-select form-select-sm text-center"
                                        style="width: 100%">
                                        <option></option>
                                        <option value="Masuk">Masuk</option>
                                        <option value="Tidak">Tidak</option>
                                    </select>
                                </div>
                                <!-- Keterangan -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="keterangan_lk2" class="form-label font-weight-bold text-center">
                                        Keterangan
                                    </label>
                                    <input type="text" class="form-control text-center" id="keterangan_lk2"
                                        name="keterangan_lk2">
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-2 d-flex align-items-center">
                                    <label for="catatan" class="mb-0">Catatan</label>
                                </div>
                                <div class="col-10 d-flex flex-column align-items-center">
                                    <input type="text" class="form-control text-left" id="catatan"
                                        name="catatan">
                                </div>
                            </div>
                            <br>
                            <div style="display: flex; justify-content: space-between;">
                                <button type="button" class="btn btn-success" id="btn_proses"
                                    style="width: 130px; margin-left: 10px;">
                                    PROSES
                                </button>

                                <button type="button" class="btn btn-secondary" id="btn_batal"
                                    style="width: 100px; margin-right: 10px;">
                                    BATAL
                                </button>
                            </div>
                            <br>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-5">
                                <label for="radiobutton" class="form-check-label" id="labelRedisplay">Tanggal
                                    Cek</label>
                                <div class="row">
                                    <div class="col">
                                        <input type="date" class="form-control font-weight-bold"
                                            id="tgl_awalBawah" name="tgl_awalBawah">
                                        <label for="tgl_awalBawah" class="form-label"></label>
                                    </div>
                                    <div>
                                        <label for="sampai_dengan">s/d</label>
                                    </div>
                                    <div class="col">
                                        <input type="date" class="form-control font-weight-bold"
                                            id="tgl_akhirBawah" name="tgl_akhirBawah">
                                        <label for="tgl_akhirBawah" class="form-label"></label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-2">
                                <div class="col-12">
                                    <button class="btn btn-info mt-4 w-100" id="btn_redisplayBawah">Redisplay</button>
                                </div>
                            </div>
                            {{-- <div class="col-2" style="text-align: right">
                                <div class="col-12">
                                    <button class="btn btno mt-4 w-100" id="btn_laporan">Laporan</button>
                                </div>
                            </div> --}}
                        </div>
                    </div>
                    <div class="col-12">
                        <table class ="table table-bordered text-center align-middle" id="table_bawah"
                            style="width: 100%">
                            <thead class="table-dark" style="text-align: center">
                                <tr>
                                    <th>ID</th>
                                    <th>Tanggal</th>
                                    <th>Shift</th>
                                    <th>Type Mesin</th>
                                    <th>Mesin</th>
                                    <th>Ukuran</th>
                                    <th>Benang WA</th>
                                    <th>Benang WE</th>
                                    <th>User Input</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@include('QC.Circular.ModalCekGantiUkuran')
{{-- <script src="{{ asset('js/Accounting/Piutang/MaintenanceFakturPajakPenjualan.js') }}"></script> --}}
<script type="text/javascript" src="{{ asset('js/QC/Circular/CekGantiUkuran.js') }}"></script>
@endsection
