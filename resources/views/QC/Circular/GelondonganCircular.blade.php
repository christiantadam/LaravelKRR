@extends('layouts.appQC')
@section('content')
@section('title', 'Gelondongan Circular')
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
                <div class="card-header">Gelondongan Circular</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="col-12">
                        <div class="row">
                            <div class="col-5">
                                <label for="radiobutton" class="form-check-label">Data Sudah Panen</label>
                                <div class="row">
                                    <div class="col">
                                        <input type="date" class="form-control font-weight-bold" id="tgl_awal"
                                            name="tgl_awal">
                                        <label for="tgl_awal" class="form-label"></label>
                                    </div>
                                    <div>
                                        <label for="sampai_dengan">s/d</label>
                                    </div>
                                    <div class="col">
                                        <input type="date" class="form-control font-weight-bold" id="tgl_akhir"
                                            name="tgl_akhir">
                                        <label for="tgl_akhir" class="form-label"></label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-2">
                                <div class="col-12">
                                    <button class="btn btn-info mt-4 w-100" id="btn_redisplay">Redisplay</button>
                                </div>
                            </div>
                        </div>
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
                        <div class="table-container">
                            <table class="table table-bordered" id="table_atas" style="width: 100%">
                                <thead class="table-dark">
                                    <tr>
                                        <th>ID. Laporan</th>
                                        <th>Tanggal</th>
                                        <th>Shift</th>
                                        <th>Status Panen</th>
                                        <th>User Panen</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                        <div class="card">
                            <label style="font-weight: bold;" id="labelProses">Input Data Gelondongan Circular</label>
                            <br>
                            <div class="row">
                                <div class="col-md-1">
                                    <label for="id">Tanggal</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="date" name="id_penagihan" class="form-control" style="width: 100%"
                                        id="tanggal">
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
                            </div>
                            <br>
                            <div class="row">
                                <!-- MRNG -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label class="form-label font-weight-bold text-center">
                                        MRNG
                                    </label>

                                    <input type="hidden" name="mrng" value="T">

                                    <div class="form-check form-switch switch-lampu d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" id="mrng"
                                            name="mrng" value="Y">

                                        <label
                                            class="form-check-label d-flex align-items-center justify-content-center"
                                            for="mrng" style="min-width: 50px;">
                                            <span class="text-off">X</span>
                                            <span class="text-on d-none">✔</span>

                                        </label>
                                    </div>
                                </div>
                                <!-- GBS -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label class="form-label font-weight-bold text-center">
                                        GBS
                                    </label>

                                    <input type="hidden" name="gbs" value="T">

                                    <div class="form-check form-switch switch-lampu d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" id="gbs"
                                            name="gbs" value="Y">

                                        <label
                                            class="form-check-label d-flex align-items-center justify-content-center"
                                            for="gbs" style="min-width: 50px;">
                                            <span class="text-off">X</span>
                                            <span class="text-on d-none">✔</span>

                                        </label>
                                    </div>
                                </div>
                                <!-- MLPT -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label class="form-label font-weight-bold text-center">
                                        MLPT
                                    </label>

                                    <input type="hidden" name="mlpt" value="T">

                                    <div class="form-check form-switch switch-lampu d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" id="mlpt"
                                            name="mlpt" value="Y">
                                        <label
                                            class="form-check-label d-flex align-items-center justify-content-center"
                                            for="mlpt" style="min-width: 50px;">
                                            <span class="text-off">X</span>
                                            <span class="text-on d-none">✔</span>
                                        </label>
                                    </div>
                                </div>
                                <!-- MLBR -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label class="form-label font-weight-bold text-center">
                                        MLBR
                                    </label>

                                    <input type="hidden" name="mlbr" value="T">

                                    <div class="form-check form-switch switch-lampu d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" id="mlbr"
                                            name="mlbr" value="Y">
                                        <label
                                            class="form-check-label d-flex align-items-center justify-content-center"
                                            for="mlbr" style="min-width: 50px;">
                                            <span class="text-off">X</span>
                                            <span class="text-on d-none">✔</span>
                                        </label>
                                    </div>
                                </div>
                                <!-- MYST -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label class="form-label font-weight-bold text-center">
                                        MYST
                                    </label>

                                    <input type="hidden" name="myst" value="T">

                                    <div class="form-check form-switch switch-lampu d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" id="myst"
                                            name="myst" value="Y">
                                        <label
                                            class="form-check-label d-flex align-items-center justify-content-center"
                                            for="myst" style="min-width: 50px;">
                                            <span class="text-off">X</span>
                                            <span class="text-on d-none">✔</span>
                                        </label>
                                    </div>
                                </div>
                                <!-- Rajut Jelek -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label class="form-label font-weight-bold text-center">
                                        Rajut Jelek
                                    </label>

                                    <input type="hidden" name="rajut_jelek" value="T">

                                    <div class="form-check form-switch switch-lampu d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" id="rajut_jelek"
                                            name="rajut_jelek" value="Y">
                                        <label
                                            class="form-check-label d-flex align-items-center justify-content-center"
                                            for="rajut_jelek" style="min-width: 50px;">
                                            <span class="text-off">X</span>
                                            <span class="text-on d-none">✔</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <!-- Berbulu -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label class="form-label font-weight-bold text-center">
                                        Berbulu
                                    </label>

                                    <input type="hidden" name="berbulu" value="T">

                                    <div class="form-check form-switch switch-lampu d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" id="berbulu"
                                            name="berbulu" value="Y">
                                        <label
                                            class="form-check-label d-flex align-items-center justify-content-center"
                                            for="berbulu" style="min-width: 50px;">
                                            <span class="text-off">X</span>
                                            <span class="text-on d-none">✔</span>
                                        </label>
                                    </div>
                                </div>
                                <!-- Φ. Besar -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label class="form-label font-weight-bold text-center">
                                        Φ. Besar
                                    </label>

                                    <input type="hidden" name="phi_besar" value="T">

                                    <div class="form-check form-switch switch-lampu d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" id="phi_besar"
                                            name="phi_besar" value="Y">
                                        <label
                                            class="form-check-label d-flex align-items-center justify-content-center"
                                            for="phi_besar" style="min-width: 50px;">
                                            <span class="text-off">X</span>
                                            <span class="text-on d-none">✔</span>
                                        </label>
                                    </div>
                                </div>
                                <!-- QC. Pass -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label class="form-label font-weight-bold text-center">
                                        QC. Pass
                                    </label>

                                    <input type="hidden" name="qc_pass" value="T">

                                    <div class="form-check form-switch switch-lampu d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" id="qc_pass"
                                            name="qc_pass" value="Y">
                                        <label
                                            class="form-check-label d-flex align-items-center justify-content-center"
                                            for="qc_pass" style="min-width: 50px;">
                                            <span class="text-off">X</span>
                                            <span class="text-on d-none">✔</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-1">
                                    <label for="keterangan">Keterangan</label>
                                </div>
                                <div class="col-md-7">
                                    <input type="text" name="keterangan" class="form-control" style="width: 100%"
                                        id="keterangan">
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
                                <label for="radiobutton" class="form-check-label">Data Detail</label>
                                <div class="row">
                                    <div class="col">
                                        <input type="date" class="form-control font-weight-bold"
                                            id="tgl_awalDetail" name="tgl_awalDetail">
                                        <label for="tgl_awalDetail" class="form-label"></label>
                                    </div>
                                    <div>
                                        <label for="sampai_dengan">s/d</label>
                                    </div>
                                    <div class="col">
                                        <input type="date" class="form-control font-weight-bold"
                                            id="tgl_akhirDetail" name="tgl_akhirDetail">
                                        <label for="tgl_akhirDetail" class="form-label"></label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-2">
                                <div class="col-12">
                                    <button class="btn btn-info mt-4 w-100"
                                        id="btn_redisplayDetail">Redisplay</button>
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
                                    <th>No Mesin</th>
                                    <th>QC. Pass</th>
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

<style>
    .custom-modal-width {
        max-width: 75%;
    }
</style>
<div class="modal fade" id="modalLaporan" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog custom-modal-width">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalLabelCustomer">Laporan Cek Kain Circular</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-5">
                        <label for="radiobutton" class="form-check-label">Tanggal Laporan</label>
                        <div class="row">
                            <div class="col">
                                <input type="date" class="form-control font-weight-bold" id="tgl_awalModal"
                                    name="tgl_awalModal">
                                <label for="tgl_awalModal" class="form-label"></label>
                            </div>
                            <div>
                                <label for="sampai_dengan">s/d</label>
                            </div>
                            <div class="col">
                                <input type="date" class="form-control font-weight-bold" id="tgl_akhirModal"
                                    name="tgl_akhirModal">
                                <label for="tgl_akhirModal" class="form-label"></label>
                            </div>
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="col-12">
                            <button class="btn btn-info mt-4 w-100" id="btn_okModal">OK</button>
                        </div>
                    </div>
                </div>
                <div class="table-container">
                    <table class="table table-bordered" id="table_laporan" style="width: 100%">
                        <thead class="table-dark">
                            <tr>
                                <th>ID. Laporan</th>
                                <th>Tanggal</th>
                                <th>Shift</th>
                                <th>Status Panen</th>
                                <th>User Panen</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <br>
                <div style="display: flex; justify-content: space-between;">
                    <button type="button" class="btn btn-success" id="btn_prosesPanen" style="width: 130px;">
                        Proses Panen
                    </button>

                    <button type="button" class="btn btn-secondary" id="btn_print"
                        style="width: 100px; display: none;">
                        BATAL
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
{{-- <script src="{{ asset('js/Accounting/Piutang/MaintenanceFakturPajakPenjualan.js') }}"></script> --}}
<script type="text/javascript" src="{{ asset('js/QC/Circular/GelondonganCircular.js') }}"></script>
@endsection
