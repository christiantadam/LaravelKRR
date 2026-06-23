@extends('layouts.appSales') @section('content')
@section('title', 'List SJ Online Sudah ACC')
<link href="{{ asset('css/style.css') }}" rel="stylesheet">

<style>
    .table-responsive {
        overflow-x: auto;
        width: 100%;
    }

    #table_SJ {
        min-width: 1400px;
    }

    #table_SJ td,
    #table_SJ th {
        white-space: nowrap;
        vertical-align: middle;
    }
</style>

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">List Surat Jalan Online Sudah Verifikasi </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table id="table_SJ" class="table table-bordered table-striped w-100">
                            <thead class="thead-light text-nowrap">
                                <tr>
                                    <th>Tanggal SJ</th>
                                    <th>Nomor SJ</th>
                                    <th>Customer</th>
                                    <th>Nomor SP</th>
                                    <th>Nomor PO</th>
                                    <th>Nama Type</th>
                                    <th>Jumlah</th>
                                    <th>Alamat Kirim</th>
                                    <th>Pengirim</th>
                                    <th>Plat Nomor Kendaraan</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="{{ asset('js/Sales/KirimSJACC.js') }}"></script>
@endsection
