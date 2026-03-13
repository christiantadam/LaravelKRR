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
                    <div class="d-flex" style="gap: 20px; flex-direction: column; padding: 5px; width: 100%;">
                        <div class="d-flex"
                            style="flex-direction: column; padding: 5px; width: 100%; border: 1px solid lightgray;">
                            <label style="font-weight: bold;color: darkblue;" id="labelProses">Input Data</label>
                            <div class="d-flex" style="gap: 1%; width: 100%;">
                                <div class="form-group" style="flex: 0.15">
                                    <label for="id">Tanggal Muat</label>
                                    <div class="input-group" style="gap: 5px">
                                        <input type="date" name="tanggal" class="form-control" style="width: 100%"
                                            id="tanggal">
                                    </div>
                                </div>
                                <div class="form-group" style="flex: 0.15">
                                    <label for="nopol">Nopol</label>
                                    <div class="input-group" style="gap: 5px">
                                        <select id="nopol" class="form-select" style="width: 50%">
                                            <option></option>
                                            @foreach ($listNoPol as $d)
                                                <option value="{{ $d->Nopol }}">
                                                    {{ $d->Nopol }}
                                                </option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group" style="flex: 0.3">
                                    <label for="jam_kerja">Jam Muat</label>
                                    <div class="input-group input-group-sm" style="gap: 5px">
                                        <input type="time" id="jam_muat_awal" class="form-control">
                                        <label>&nbsp;s/d&nbsp;</label>
                                        <input type="time" id="jam_muat_akhir" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group" style="flex: 0.3">
                                    <label for="instansi">Instansi</label>
                                    <div class="input-group">
                                        <select id="instansi" class="form-select" style="width: 50%">
                                            <option></option>
                                            @foreach ($listExpeditor as $e)
                                                <option value="{{ $e->IDExpeditor }}">
                                                    {{ $e->NamaExpeditor }}
                                                </option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex" style="gap: 1%; width: 100%;">
                                <div class="form-group" style="flex: 0.2">
                                    <label for="sopir">Sopir</label>
                                    <div class="input-group">
                                        <input type="text" name="sopir" class="form-control" style="width: 100%"
                                            id="sopir">
                                    </div>
                                </div>
                                <div class="form-group" style="flex: 0.3">
                                    <label for="keterangan">Keterangan</label>
                                    <div class="input-group">
                                        <input type="text" name="keterangan" class="form-control" style="width: 100%"
                                            id="keterangan">
                                    </div>
                                </div>
                                <div class="form-group" style="flex: 0.075; align-content: end;">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="checkbox_customer"
                                            name="checkbox_customer" value="1">
                                        <label class="form-check-label" for="checkbox_customer">
                                            Customer
                                        </label>
                                    </div>
                                </div>
                                <button type="button" class="btn btn-primary h-25 align-self-center"
                                    onclick="openTTD()">
                                    ✍️ TTD Sopir
                                </button>
                                <input type="hidden" name="ttd_base64" id="ttd_base64">
                                <div class="mt-2">
                                    <img id="ttd_preview" style="display:none; border:1px solid #ccc; max-width:200px;">
                                </div>
                            </div>
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
                                        <th>Tujuan Pengiriman</th>
                                        <th>Surat Jalan</th>
                                        <th>ID Tujuan Pengiriman</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                        <div class="d-flex" style="gap: 1%; width: 100%;">
                            <div class="form-group" style="flex: 0.1; display:none;" id="div_suratJalan">
                                <label for="surat_jalan">Surat Jalan</label>
                                <div class="input-group">
                                    <select id="surat_jalan" class="form-select" style="width: 50%">
                                        <option></option>
                                        @foreach ($listSuratJalan as $sj)
                                            <option value="{{ $sj->IDPengiriman }}" data-idcust="{{ $sj->IDCust }}">
                                                {{ $sj->IDPengiriman }}
                                            </option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <div class="form-group" style="flex: 0.5">
                                <label for="text_tujuanKirim">Tujuan Pengiriman</label>
                                <div class="input-group">
                                    <select id="select_tujuanKirim" class="form-select form-select-sm"
                                        style="width: 100%">
                                        <option></option>
                                        @foreach ($listCustomer as $data)
                                            @php
                                                $parts = explode('-', $data->IDCust);
                                            @endphp
                                            <option value="{{ trim($parts[1]) }}">{{ $data->NamaCust }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex" style="gap: 1%; width: 100%;">
                            <div class="form-group" style="flex: 0.2">
                                <label for="type_barang">Tipe Barang</label>
                                <div class="input-group">
                                    <select id="type_barang" class="form-select form-select-sm" style="width: 100%">
                                        <option></option>
                                        @foreach ($listTypeBarang as $d)
                                            <option value="{{ $d->id_typeBarang }}">
                                                {{ $d->id_typeBarang . ' | ' . $d->nama_typeBarang }}
                                            </option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <div class="form-group" style="flex: 0.2">
                                <label for="jam_kerja">Jam</label>
                                <div class="input-group">
                                    <input type="time" id="jam_barang" class="form-control">
                                </div>
                            </div>
                            <div class="form-group" style="flex: 0.4">
                                <label for="item">Item</label>
                                <div class="input-group align-items-center" style="gap: 1%">
                                    <div style="width: 40%">
                                        <input type="number" id="item" class="form-control">
                                    </div>
                                    <div style="width: 59%">
                                        <select id="satuan" class="form-select form-select-sm">
                                            <option></option>
                                            @foreach ($listSatuan as $d)
                                                <option value="{{ $d->No_satuan }}">
                                                    {{ $d->No_satuan . ' | ' . $d->Nama_satuan }}
                                                </option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="d-flex align-self-center">
                                <button type="button" class="btn btn-primary h-25" id="btn_add">Add</button>
                                <button type="button" class="btn btn-warning h-25" id="btn_update">Update</button>
                                <button type="button" class="btn btn-danger h-25" id="btn_delete">Delete</button>
                            </div>
                        </div>
                        <div class="d-flex" style="gap: 1%; width: 100%;">
                            <div class="form-group" style="flex: 0.5">
                                <button type="button" class="btn btn-success" style="width: 200px;"
                                    id="btn_proses">PROSES</button>
                            </div>
                            <div class="form-group " style="flex: 0.5;text-align: end;">
                                <button type="button" class="btn btn-secondary" style="width: 200px;"
                                    id="btn_batal">BATAL</button>
                            </div>
                        </div>
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
@include('Guard.Pemeriksaan.ModalPemeriksaanBarangCustomer')
<script type="text/javascript" src="{{ asset('js/Guard/Pemeriksaan/PemeriksaanBarang.js') }}"></script>
@endsection
