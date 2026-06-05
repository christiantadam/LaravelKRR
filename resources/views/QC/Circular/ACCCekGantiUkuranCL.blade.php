@extends('layouts.appQC')
@section('content')
@section('title', 'ACC Cek Ganti Ukuran Circular')

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">ACC Cek Ganti Ukuran Circular</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        @csrf
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
                        <div style="overflow-x: auto;">
                            <table style="width: 100%;" id="table_atas">
                                <thead class="table-dark">
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
                        <div class="mb-3">
                            {{-- <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="checkbox_all" value="option2">
                                    <label class="form-check-label" for="checkbox_all">Pilih Semua</label>
                                </div> --}}
                            <br>
                            <div class="form-check mt-2 d-flex justify-content-start">
                                <button type="button" class="btn btn-success" id="btn_proses"
                                    style="width: 100px; margin-left: 5px;">Proses</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@include('QC.Circular.ModalCekGantiUkuran')
{{-- @include('Guard.Pemeriksaan.ModalPemeriksaanBarang') --}}
{{--
@include('Guard.Pemeriksaan.ModalPemeriksaanBarangCustomer') --}}
<script type="text/javascript" src="{{ asset('js/QC/Circular/ACCCekGantiUkuranCL.js') }}"></script>
@endsection
