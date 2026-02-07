@extends('layouts.appGuard')
@section('content')
@section('title', 'Pemeriksaan Barang')
{{-- <link href="{{ asset('css/ListPurchaseOrder.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet"> --}}
{{-- <style>
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
</style> --}}
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
                <div class="card-header">Pemeriksaan Barang</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="col-12">
                        <div class="card">
                            <label style="font-weight: bold;" id="labelProses">Input Data</label>
                            <div class="row">
                                <div class="col-md-1">
                                    <label for="id">Tanggal Muat</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="date" name="tanggal" class="form-control" style="width: 100%"
                                        id="tanggal">
                                </div>
                                <div class="col-md-1 d-flex justify-content-end">
                                    <label for="nopol">Nopol</label>
                                </div>
                                <div class="col-md-2">
                                    <select id="nopol" class="form-select form-select-sm" style="width: 100%">
                                        <option></option>
                                        @foreach ($listNoPol as $d)
                                            <option value="{{ $d->Nopol }}">
                                                {{ $d->Nopol }}
                                                {{-- {{ $d->Nopol . ' | ' . $d->Type_Mesin }} --}}
                                            </option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="col-md-2">
                                    <div class="input-group input-group-sm">
                                        <input type="text" id="nopol_input" class="form-control">
                                    </div>
                                </div>
                                <div class="col-md-1 d-flex justify-content-end">
                                    <label for="jam_kerja">Jam Muat</label>
                                </div>

                                <div class="col-md-3">
                                    <div class="input-group input-group-sm">
                                        <input type="time" id="jam_muat_awal" class="form-control">
                                        <label>&nbsp;s/d&nbsp;</label>
                                        <input type="time" id="jam_muat_akhir" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-1">
                                    <label for="tujuan_kirim">Tujuan Pengiriman</label>
                                </div>
                                <div class="col-md-3">
                                    <input type="text" name="tujuan_kirim" class="form-control" style="width: 100%"
                                        id="tujuan_kirim">
                                </div>
                                <div class="col-md-1 d-flex justify-content-end">
                                    <label for="instansi">Instansi</label>
                                </div>
                                <div class="col-md-3">
                                    <input type="text" name="instansi" class="form-control" style="width: 100%"
                                        id="instansi">
                                </div>
                                <div class="col-md-1 d-flex justify-content-end">
                                    <label for="sopir">Sopir</label>
                                </div>
                                <div class="col-md-3">
                                    <input type="text" name="sopir" class="form-control" style="width: 100%"
                                        id="sopir">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-1">
                                    <label for="keterangan">Keterangan</label>
                                </div>
                                <div class="col-md-5">
                                    <input type="text" name="keterangan" class="form-control" style="width: 100%"
                                        id="keterangan">
                                </div>
                                <div class="col-md-2">
                                    <button type="button" class="btn btn-sm btn-primary" onclick="openTTD()">
                                        ✍️ TTD Sopir
                                    </button>
                                </div>
                                <div class="col-md-1">
                                    <input type="text" name="" class="form-control"
                                        style="width: 100%; visibility: hidden;">
                                </div>
                                <input type="hidden" name="ttd_base64" id="ttd_base64">
                                <div class="mt-2">
                                    <img id="ttd_preview" style="display:none; border:1px solid #ccc; max-width:200px;">
                                </div>
                            </div>
                            <br>
                            {{-- <div class="row">
                                <div class="col-md-1">
                                    <label for="user_gudang">Gudang</label>
                                </div>
                                <div class="col-md-3">
                                    <select id="user_gudang" class="form-select form-select-sm" style="width: 100%">
                                        <option></option>
                                        @foreach ($listTypeBarang as $d)
                                            <option value="{{ $d->id_typeBarang }}">
                                                {{ $d->id_typeBarang . ' | ' . $d->nama_typeBarang }}
                                            </option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <br> --}}
                        </div>

                        <div class="table-container">
                            <table class="table table-bordered" id="table_atas" style="width: 100%">
                                <thead class="table-dark">
                                    <tr>
                                        <th>ID Detail</th>
                                        <th>Kode Tipe Barang</th>
                                        <th>Tipe Barang</th>
                                        <th>Jam</th>
                                        <th>Item</th>
                                        <th>Kode Satuan</th>
                                        <th>Satuan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-md-1">
                                <label for="type_barang">Tipe Barang</label>
                            </div>
                            <div class="col-md-2">
                                <select id="type_barang" class="form-select form-select-sm" style="width: 100%">
                                    <option></option>
                                    @foreach ($listTypeBarang as $d)
                                        <option value="{{ $d->id_typeBarang }}">
                                            {{ $d->id_typeBarang . ' | ' . $d->nama_typeBarang }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="col-md-1 d-flex justify-content-end">
                                <label for="jam_kerja">Jam</label>
                            </div>
                            <div class="col-md-2">
                                <div class="input-group input-group-sm">
                                    <input type="time" id="jam_barang" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-1 d-flex justify-content-end">
                                <label for="jam_kerja">Item</label>
                            </div>
                            <div class="col-md-1">
                                <div class="input-group input-group-sm">
                                    <input type="number" id="item" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-2">
                                <select id="satuan" class="form-select form-select-sm" style="width: 100%">
                                    <option></option>
                                    @foreach ($listSatuan as $d)
                                        <option value="{{ $d->No_satuan }}">
                                            {{ $d->No_satuan . ' | ' . $d->Nama_satuan }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="col-md-2 d-flex justify-content-end">
                                <button type="button" class="btn btn-primary btn-sm" id="btn_add">
                                    <i></i> Add
                                </button>
                                <button type="button" class="btn btn-warning btn-sm" id="btn_update">
                                    <i></i> Update
                                </button>
                                <button type="button" class="btn btn-danger btn-sm" id="btn_delete">
                                    <i></i> Delete
                                </button>
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
                    <hr>
                    <div class="row">
                        <div class="col-5">
                            <label for="radiobutton" class="form-check-label" id="labelRedisplay">Tanggal
                                Pemeriksaan</label>
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
                        {{-- <div class="col-2" style="text-align: right">
                                <div class="col-12">
                                    <button class="btn btno mt-4 w-100" id="btn_laporan">Laporan</button>
                                </div>
                            </div> --}}
                    </div>
                    <table class ="table table-bordered text-center align-middle" id="table_bawah"
                        style="width: 100%">
                        <thead class="table-dark" style="text-align: center">
                            <tr>
                                <th>ID Header</th>
                                <th>Tanggal Muat</th>
                                <th>Jam Muat</th>
                                <th>Nopol</th>
                                <th>Instansi</th>
                                <th>Sopir</th>
                                <th>User Input</th>
                                <th>User ACC Gudang</th>
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

<div class="modal fade" id="ttdModal" tabindex="-1">
    <div class="modal-dialog modal-md modal-dialog-centered custom-modal-width">
        <div class="modal-content">
            <div class="modal-header">
                <h6 class="modal-title">Tanda Tangan Digital</h6>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div class="modal-body text-center">
                <canvas id="ttdCanvas" width="600" height="400"
                    style="border:1px solid #ccc; touch-action:none;"></canvas>
            </div>

            <div class="modal-footer">
                <button class="btn btn-secondary btn-sm" onclick="clearTTD()" id="btn_clearTTD">Clear</button>
                <button class="btn btn-success btn-sm" onclick="saveTTD()" id="btn_simpanTTD">Simpan</button>
            </div>
        </div>
    </div>
</div>

<style>
    .custom-modal-width {
        max-width: 60%;
        max-height: 60%;
    }
</style>

<script>
    let canvas, ctx, drawing = false;

    function initCanvas() {
        canvas = document.getElementById("ttdCanvas");
        if (!canvas) return;

        ctx = canvas.getContext("2d");

        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.strokeStyle = "#000";

        // MOUSE
        canvas.onmousedown = e => {
            drawing = true;
            ctx.beginPath();
            ctx.moveTo(e.offsetX, e.offsetY);
        };

        canvas.onmousemove = e => {
            if (!drawing) return;
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
        };

        canvas.onmouseup = () => drawing = false;
        canvas.onmouseleave = () => drawing = false;

        // TOUCH
        canvas.addEventListener("touchstart", e => {
            e.preventDefault();
            drawing = true;
            let t = e.touches[0];
            let rect = canvas.getBoundingClientRect();
            ctx.beginPath();
            ctx.moveTo(t.clientX - rect.left, t.clientY - rect.top);
        });

        canvas.addEventListener("touchmove", e => {
            e.preventDefault();
            if (!drawing) return;
            let t = e.touches[0];
            let rect = canvas.getBoundingClientRect();
            ctx.lineTo(t.clientX - rect.left, t.clientY - rect.top);
            ctx.stroke();
        });

        canvas.addEventListener("touchend", () => drawing = false);
    }

    function clearTTD() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let img = document.getElementById("ttd_preview");
        // img.src = base64;
        img.style.display = "none";
    }

    function saveTTD() {
        let base64 = canvas.toDataURL("image/png");
        document.getElementById("ttd_base64").value = base64;

        let img = document.getElementById("ttd_preview");
        img.src = base64;
        img.style.display = "block";

        bootstrap.Modal.getInstance(
            document.getElementById("ttdModal")
        ).hide();
    }

    function openTTD() {
        const modal = new bootstrap.Modal(document.getElementById("ttdModal"));
        modal.show();

        // inisialisasi canvas SETELAH modal muncul
        setTimeout(initCanvas, 200);
    }
</script>
@include('Guard.Pemeriksaan.ModalPemeriksaanBarang')
<script type="text/javascript" src="{{ asset('js/Guard/Pemeriksaan/PemeriksaanBarang.js') }}"></script>
@endsection
