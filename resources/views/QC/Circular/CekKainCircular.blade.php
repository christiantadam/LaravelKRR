@extends('layouts.appQC')
@section('content')
@section('title', 'Cek Kain Circular')
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
                <div class="card-header">Cek Kain Circular</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="col-12">
                        <div class="card">
                            <label style="font-weight: bold;" id="labelProses">Input Data</label>
                            <br>
                            <div class="row">
                                <div class="col-md-1">
                                    <label for="id">Tipe Kain</label>
                                </div>
                                <div class="col-md-2">
                                    <select id="type_kain" class="form-select form-select-sm" style="width: 100%">
                                        {{-- <option disabled selected>Pilih Shift</option> --}}
                                        <option></option>
                                        <option value="1">Tubular</option>
                                        <option value="2">Layar/Flat</option>
                                        <option value="3">Gusset</option>
                                    </select>
                                </div>
                            </div>
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
                                <div class="col-md-1">
                                    <label for="counter_mesin">Counter Mesin</label>
                                </div>
                                <div class="col-md-1">
                                    <input type="number" name="counter_mesin" class="form-control" style="width: 100%"
                                        id="counter_mesin">
                                </div>
                                <div class="col-md-1">
                                    <label>Status Mesin</label>
                                </div>
                                <div class="col-md-1">
                                    <div class="form-check form-switch switch-lampu d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" id="status_mesin"
                                            name="status_mesin" value="Y" style="margin-right: 50px">
                                        <label class="form-check-label d-flex align-items-center justify-content-center"
                                            for="status_mesin" style="min-width: 50px;">
                                            <span class="text-off">X</span>
                                            <span class="text-on d-none">✔</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <input type="time" class="form-control text-center" id="jam_mati"
                                        name="jam_mati">
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <!-- Lebar ST -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="lbr_st" class="form-label font-weight-bold text-center">
                                        Lebar ST
                                    </label>
                                    <input type="number" class="form-control text-center" id="lbr_st" name="lbr_st"
                                        enterkeyhint="enter">
                                </div>
                                <!-- Rajutan WA -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="rajutan_wa" class="form-label font-weight-bold text-center">
                                        Rajutan WA
                                    </label>
                                    <input type="number" class="form-control text-center" id="rajutan_wa"
                                        name="rajutan_wa">
                                </div>
                                <!-- Rajutan WE -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="rajutan_we" class="form-label font-weight-bold text-center">
                                        Rajutan WE
                                    </label>
                                    <input type="number" class="form-control text-center" id="rajutan_we"
                                        name="rajutan_we">
                                </div>
                                <!-- Denier -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="denier" class="form-label font-weight-bold text-center">
                                        Denier
                                    </label>
                                    <input type="number" class="form-control text-center" id="denier"
                                        name="denier">
                                </div>
                                <!-- Jml Bng WA (ST)/(PM) -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="jml_bng_wa" class="form-label font-weight-bold text-center">
                                        Jml Bng WA
                                    </label>

                                    <div class="row w-100 g-0">
                                        <div class="col p-0">
                                            <input type="number" class="form-control text-center" id="jml_bng_wa_st"
                                                name="jml_bng_waST" placeholder="ST">
                                        </div>
                                        <div class="col p-0">
                                            <input type="number" class="form-control text-center" id="jml_bng_wa_pm"
                                                name="jml_bng_waPM" placeholder="PM">
                                        </div>
                                    </div>
                                </div>
                                <!-- WRN -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="wrn" class="form-label font-weight-bold text-center">
                                        WRN
                                    </label>
                                    <input type="text" class="form-control text-center" id="wrn"
                                        name="wrn">
                                </div>
                            </div>
                            <div class="row">
                                <!-- LBR -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="lbr" class="form-label font-weight-bold text-center">
                                        LBR
                                    </label>
                                    <input type="number" class="form-control text-center" id="lbr"
                                        name="lbr">
                                </div>
                                <!-- LPT -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label class="form-label font-weight-bold text-center">
                                        LPT
                                    </label>

                                    <input type="hidden" name="lpt" value="T">

                                    <div class="form-check form-switch switch-lampu d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" id="lpt"
                                            name="lpt" value="Y">

                                        <label
                                            class="form-check-label d-flex align-items-center justify-content-center"
                                            for="lpt" style="min-width: 50px;">
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
                                <!-- WNDR GLD -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label class="form-label font-weight-bold text-center">
                                        WNDR GLD
                                    </label>

                                    <input type="hidden" name="wndr_gld" value="T">

                                    <div class="form-check form-switch switch-lampu d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" id="wndr_gld"
                                            name="wndr_gld" value="Y">
                                        <label
                                            class="form-check-label d-flex align-items-center justify-content-center"
                                            for="wndr_gld" style="min-width: 50px;">
                                            <span class="text-off">X</span>
                                            <span class="text-on d-none">✔</span>
                                        </label>
                                    </div>
                                </div>
                                <!-- BULU -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label class="form-label font-weight-bold text-center">
                                        Bulu
                                    </label>

                                    <input type="hidden" name="bulu" value="T">

                                    <div class="form-check form-switch switch-lampu d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" id="bulu"
                                            name="bulu" value="Y">
                                        <label
                                            class="form-check-label d-flex align-items-center justify-content-center"
                                            for="bulu" style="min-width: 50px;">
                                            <span class="text-off">X</span>
                                            <span class="text-on d-none">✔</span>
                                        </label>
                                    </div>
                                </div>
                                <!-- Jam Temuan Bulu -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="jam_bulu" class="form-label font-weight-bold text-center">
                                        Jam Temuan Bulu
                                    </label>
                                    <input type="time" class="form-control text-center" id="jam_bulu"
                                        name="jam_bulu">
                                </div>
                            </div>
                            <div class="row">
                                <!-- TANDA -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label class="form-label font-weight-bold text-center">
                                        Tanda
                                    </label>

                                    <input type="hidden" name="tanda" value="T">

                                    <div class="form-check form-switch switch-lampu d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" id="tanda"
                                            name="tanda" value="Y">
                                        <label
                                            class="form-check-label d-flex align-items-center justify-content-center"
                                            for="tanda" style="min-width: 50px;">
                                            <span class="text-off">X</span>
                                            <span class="text-on d-none">✔</span>
                                        </label>
                                    </div>
                                </div>
                                <!-- Ping Bergerigi -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label class="form-label font-weight-bold text-center">
                                        Ping Bergerigi
                                    </label>

                                    <input type="hidden" name="ping_bergerigi" value="T">

                                    <div class="form-check form-switch switch-lampu d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" id="ping_bergerigi"
                                            name="ping_bergerigi" value="Y">
                                        <label
                                            class="form-check-label d-flex align-items-center justify-content-center"
                                            for="ping_bergerigi" style="min-width: 50px;">
                                            <span class="text-off">X</span>
                                            <span class="text-on d-none">✔</span>
                                        </label>
                                    </div>
                                </div>
                                <!-- Sensor WA -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label class="form-label font-weight-bold text-center">
                                        Sensor WA
                                    </label>

                                    <input type="hidden" name="sensor_wa" value="NG">

                                    <div class="form-check form-switch switch-lampu d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" id="sensor_wa"
                                            name="sensor_wa" value="OK">
                                        <label
                                            class="form-check-label d-flex align-items-center justify-content-center"
                                            for="sensor_wa" style="min-width: 50px;">
                                            <span class="text-off">NG</span>
                                            <span class="text-on d-none">OK</span>
                                        </label>
                                    </div>
                                </div>
                                <!-- Sensor WE -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label class="form-label font-weight-bold text-center">
                                        Sensor WE
                                    </label>

                                    <input type="hidden" name="sensor_we" value="NG">

                                    <div class="form-check form-switch switch-lampu d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" id="sensor_we"
                                            name="sensor_we" value="OK">
                                        <label
                                            class="form-check-label d-flex align-items-center justify-content-center"
                                            for="sensor_we" style="min-width: 50px;">
                                            <span class="text-off">NG</span>
                                            <span class="text-on d-none">OK</span>
                                        </label>
                                    </div>
                                </div>
                                <!-- Stang ARM -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label class="form-label font-weight-bold text-center">
                                        Stang ARM
                                    </label>

                                    <input type="hidden" name="stang_arm" value="NG">

                                    <div class="form-check form-switch switch-lampu d-flex align-items-center">
                                        <input class="form-check-input me-2" type="checkbox" id="stang_arm"
                                            name="stang_arm" value="OK">
                                        <label
                                            class="form-check-label d-flex align-items-center justify-content-center"
                                            for="stang_arm" style="min-width: 50px;">
                                            <span class="text-off">NG</span>
                                            <span class="text-on d-none">OK</span>
                                        </label>
                                    </div>
                                </div>
                                <!-- LBR Reinf -->
                                <div class="col-2 d-flex flex-column align-items-center">
                                    <label for="lbr_reinf" class="form-label font-weight-bold text-center" id="lbr_reinfLabel">
                                        LBR Reinf
                                    </label>
                                    <input type="text" class="form-control text-center" id="lbr_reinf"
                                        name="lbr_reinf">
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
                            <hr>
                            <div style="text-align: center">
                                <label id="jarak_stripLabel">Jarak Strip (cm)</label>
                            </div>
                            <div class="row justify-content-center">
                                <div class="col-1 d-flex flex-column align-items-center">
                                    <label for="jarak_strip1" class="form-label font-weight-bold text-center" id="jarak_strip1Label">
                                        Strip 1
                                    </label>
                                    <input type="number" class="form-control text-center" id="jarak_strip1"
                                        name="jarak_strip1" enterkeyhint="enter">
                                </div>

                                <div class="col-1 d-flex flex-column align-items-center">
                                    <label for="jarak_strip2" class="form-label font-weight-bold text-center" id="jarak_strip2Label">
                                        Strip 2
                                    </label>
                                    <input type="number" class="form-control text-center" id="jarak_strip2"
                                        name="jarak_strip2" enterkeyhint="enter">
                                </div>

                                <div class="col-1 d-flex flex-column align-items-center">
                                    <label for="jarak_strip3" class="form-label font-weight-bold text-center" id="jarak_strip3Label">
                                        Strip 3
                                    </label>
                                    <input type="number" class="form-control text-center" id="jarak_strip3"
                                        name="jarak_strip3" enterkeyhint="enter">
                                </div>

                                <div class="col-1 d-flex flex-column align-items-center">
                                    <label for="jarak_strip4" class="form-label font-weight-bold text-center" id="jarak_strip4Label">
                                        Strip 4
                                    </label>
                                    <input type="number" class="form-control text-center" id="jarak_strip4"
                                        name="jarak_strip4" enterkeyhint="enter">
                                </div>

                                <div class="col-1 d-flex flex-column align-items-center">
                                    <label for="jarak_strip5" class="form-label font-weight-bold text-center" id="jarak_strip5Label">
                                        Strip 5
                                    </label>
                                    <input type="number" class="form-control text-center" id="jarak_strip5"
                                        name="jarak_strip5" enterkeyhint="enter">
                                </div>

                                <div class="col-1 d-flex flex-column align-items-center">
                                    <label for="jarak_strip6" class="form-label font-weight-bold text-center" id="jarak_strip6Label">
                                        Strip 6
                                    </label>
                                    <input type="number" class="form-control text-center" id="jarak_strip6"
                                        name="jarak_strip6" enterkeyhint="enter">
                                </div>

                                <div class="col-1 d-flex flex-column align-items-center">
                                    <label for="jarak_strip7" class="form-label font-weight-bold text-center" id="jarak_strip7Label">
                                        Strip 7
                                    </label>
                                    <input type="number" class="form-control text-center" id="jarak_strip7"
                                        name="jarak_strip7" enterkeyhint="enter">
                                </div>

                                <div class="col-1 d-flex flex-column align-items-center">
                                    <label for="jarak_strip8" class="form-label font-weight-bold text-center" id="jarak_strip8Label">
                                        Strip 8
                                    </label>
                                    <input type="number" class="form-control text-center" id="jarak_strip8"
                                        name="jarak_strip8" enterkeyhint="enter">
                                </div>

                                <div class="col-1 d-flex flex-column align-items-center">
                                    <label for="jarak_strip9" class="form-label font-weight-bold text-center" id="jarak_strip9Label">
                                        Strip 9
                                    </label>
                                    <input type="number" class="form-control text-center" id="jarak_strip9"
                                        name="jarak_strip9" enterkeyhint="enter">
                                </div>

                                <div class="col-1 d-flex flex-column align-items-center">
                                    <label for="jarak_strip10" class="form-label font-weight-bold text-center" id="jarak_strip10Label">
                                        Strip 10
                                    </label>
                                    <input type="number" class="form-control text-center" id="jarak_strip10"
                                        name="jarak_strip10" enterkeyhint="enter">
                                </div>

                                <div class="col-1 d-flex flex-column align-items-center">
                                    <label for="jarak_strip11" class="form-label font-weight-bold text-center" id="jarak_strip11Label">
                                        Strip 11
                                    </label>
                                    <input type="number" class="form-control text-center" id="jarak_strip11"
                                        name="jarak_strip11" enterkeyhint="enter">
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
                                <label for="radiobutton" class="form-check-label" id="labelRedisplay">Tanggal Cek Kain</label>
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
                            <div class="col-2" style="text-align: right">
                                <div class="col-12">
                                    <button class="btn btno mt-4 w-100" id="btn_laporan">Laporan</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <table class ="table table-bordered text-center align-middle" id="table_atas"
                            style="width: 100%">
                            <thead class="table-dark" style="text-align: center">
                                <tr>
                                    <th rowspan="2">ID</th>
                                    <th rowspan="2">Type Kain</th>
                                    <th rowspan="2">Tanggal</th>
                                    <th rowspan="2">Shift</th>
                                    <th rowspan="2">No Mesin</th>
                                    <th rowspan="2">Counter Mesin</th>
                                    <th rowspan="2">Status Mesin</th>
                                    <th rowspan="2">Lebar ST</th>
                                    <th colspan="2">Rajutan</th>
                                    {{-- <th rowspan="2">Denier</th> --}}
                                    <th rowspan="2">WRN</th>
                                    <th rowspan="2">User Input</th>
                                    <th rowspan="2">Aksi</th>
                                </tr>
                                <tr>
                                    <th>WA</th>
                                    <th>WE</th>
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
<script type="text/javascript" src="{{ asset('js/QC/Circular/CekKainCircular.js') }}"></script>
@endsection
