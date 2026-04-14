@extends('layouts.appSales') @section('content')
@section('title', 'Kirim SJ')
<link href="{{ asset('css/style.css') }}" rel="stylesheet">
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">List Surat Jalan Sudah ACC</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <table id="table_SJ" class="table table-bordered table-striped" style="width:100%">
                        <thead class="thead-light text-nowrap">
                            <tr>
                                <th>Customer</th>
                                <th>ID Pengiriman</th>
                                <th>Nomor SP</th>
                                <th>Nama Type</th>
                                <th>Tanggal SJ</th>
                                <th>Status</th>
                                <th>Action</th>
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
<script type="text/javascript" src="{{ asset('js/Sales/KirimSJ.js') }}"></script>
@endsection
