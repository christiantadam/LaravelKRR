@extends('layouts.appGuard')
@section('content')
@section('title', 'View Pemeriksaan Barang')

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">View Pemeriksaan Barang</div>
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
                        <div style="overflow-x: auto;">
                            <table style="width: 100%;" id="table_atas">
                                <thead class="table-dark">
                                    <tr>
                                        <th>ID Header</th>
                                        <th>Tanggal Muat</th>
                                        <th>Jam Muat</th>
                                        <th>Nopol</th>
                                        <th>Instansi</th>
                                        <th>Tujuan Kirim</th>
                                        <th>Sopir</th>
                                        <th>User Input</th>
                                        <th>User ACC</th>
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
</div>
@include('Guard.Pemeriksaan.ModalPemeriksaanBarang')
@include('Guard.Pemeriksaan.ModalPemeriksaanBarangCustomer')
<script type="text/javascript" src="{{ asset('js/Guard/Pemeriksaan/ViewGudangPB.js') }}"></script>
@endsection
