@extends('layouts.appSales') @section('content')
@section('title', 'Kirim SJ ke Customer')
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
        <div class="col-md-10 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">List Surat Jalan untuk Kirim ke Customer </div>
                <div class="table-responsive">
                    <table id="table_SJ" class="table table-bordered table-striped w-100">
                        <thead class="thead-light text-nowrap">
                            <tr>
                                <th>Customer</th>
                                <th>ID Pengiriman</th>
                                <th>Nomor SP</th>
                                <th>Nama Type</th>
                                <th>Quantity</th>
                                <th>Transporter</th>
                                <th>License Plate Number</th>
                                <th>Supir</th>
                                <th>Tanggal SJ</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="{{ asset('js/Sales/KirimSJ.js') }}"></script>
@endsection
