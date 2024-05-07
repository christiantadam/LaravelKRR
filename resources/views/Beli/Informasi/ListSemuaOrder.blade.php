@extends('layouts.appOrderPembelian')
@section('content')
@section('title', 'List Semua Order')
<link href="{{ asset('css/style.css') }}" rel="stylesheet">
<link href="{{ asset('css/ListOrderPembelian.css') }}" rel="stylesheet">
<script>
    $(document).ready(function() {
        $("#tabelData").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            order: [[0, 'desc']],
            ajax: {
                url: "{{ url('getAllOrder') }}",
                dataType: "json",
                type: "POST",
                data: {
                    _token: "{{ csrf_token() }}"
                }
            },
            columns: [{
                    data: "Tgl_order",
                    render: function(data, type, row) {
                        console.log(data);
                        if (data != null) {
                            let parts = data.split(" ")[0].split("-");

                            let tgl = parts[2] + "-" + parts[1] + "-" + parts[0];
                            return tgl;
                        } else {
                            return data;
                        }
                    }
                },
                {
                    data: "NO_ORDER",
                },
                {
                    data: "STATUS_PO",
                },
                {
                    data: "TglAprMGR",
                    render: function(data, type, row) {
                        if (data != null) {
                            console.log(data);
                            let parts = data.split(" ")[0].split("-");
                            let time = data.split(" ")[1].split(".");
                            console.log(parts);

                            let tgl = parts[2] + "-" + parts[1] + "-" + parts[0] + " " + time[
                                0];
                            return tgl;
                        } else {
                            return data;
                        }
                    },
                },
                {
                    data: "STATUS_BELI",
                },
                {
                    data: "NO_PO",
                },
                {
                    data: "TGL_PO",
                    render: function(data, type, row) {
                        console.log(data);
                        if (data != null) {
                            let parts = data.split(" ")[0].split("-");

                            let tgl = parts[2] + "-" + parts[1] + "-" + parts[0];
                            return tgl;
                        } else {
                            return data;
                        }
                    }
                },
                {
                    data: "NM_USER",
                },
                {
                    data: "No_BTTB",
                },
            ],
        });
    });
</script>
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            @if (Session::has('success'))
                <div class="alert alert-success">
                    {{ Session::get('success') }}
                </div>
            @elseif (Session::has('error'))
                <div class="alert alert-danger">
                    {{ Session::get('error') }}
                </div>
            @endif
            <div class="card">
                <div class="card-header">List Semua Order</div>
                <div class="card-body ">
                    {{-- <form action="" id="formDaftarHarga"> --}}
                    <div class="scrollmenu">
                        <table id="tabelData" class="table table-bordered" style="width:100%;white-space:nowrap">
                            <thead class="table-primary">
                                <tr>
                                    <th>Tgl. Order</th>
                                    <th>Nomer Order</th>
                                    <th>Status PO</th>
                                    <th>Tgl. Approve Mgr. <br>(DD-MM-YYYY HH:MM:SS)</th>
                                    <th>Status Beli</th>
                                    <th>No. PO</th>
                                    <th>Tgl. PO <br>(DD-MM-YYYY)</th>
                                    <th>Nama User</th>
                                    <th>No. BTTB</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                    {{-- <div class="row mt-4">
                                <div class="col-md-9">
                                    <div class="row mb-3">
                                        <label for="" class="col-md-2 col-form-label">
                                            <input type="radio" name="opsi" id="kode_barang" value="kode_barang" >
                                            Kode Barang
                                        </label>
                                        <div class="col-md-10">
                                            <input type="text" name="search_kode_barang" id="search_kode_barang" class="form-control">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <label for="" class="col-md-2 col-form-label">
                                            <input type="radio" name="opsi" id="nama_barang" value="nama_barang">
                                            Nama Barang
                                        </label>
                                        <div class="col-md-10">
                                            <input type="text" name="search_nama_barang" class="form-control">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <label for="" class="col-md-2 col-form-label">
                                            <input type="radio" name="opsi" id="supplier" value="supplier">
                                            Supplier
                                        </label>
                                        <div class="col-md-10">
                                            <input type="text" name="search_supplier" class="form-control">
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <label for="" class="col-md-2 col-form-label">
                                            <input type="radio" name="opsi" id="user" value="user">
                                            User
                                        </label>
                                        <div class="col-md-10">
                                            <input type="text" name="search_user" class="form-control">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="d-flex flex-column justify-content-between">
                                        <button type="button" id="redisplay" class="btn btn-primary mb-2">Redisplay</button>
                                    </div>
                                </div>
                            </div>
                        </form> --}}

                </div>
            </div>
        </div>
    </div>
@endsection
