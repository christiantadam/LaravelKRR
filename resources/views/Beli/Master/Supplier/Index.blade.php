@extends('layouts.appOrderPembelian')
@section('content')
@section('title', 'Supplier')
    <script>
        $(document).ready(function() {
            $('#table_Supplier').DataTable({
                processing: true,
                serverSide: true,
                "ajax": {
                    "url": "{{ url('getallsupplier') }}",
                    "dataType": "json",
                    "type": "POSTT",
                    "data": {
                        _token: "{{ csrf_token() }}"
                    }
                },
                "columns": [{
                        "data": "IDSupplier"
                    },
                    {
                        "data": "NamaSupplier"
                    },
                    {
                        "data": "Negara1"
                    },
                    {
                        "data": "Kota1"
                    },
                    {
                        "data": "Alamat1"
                    }
                ]
            });
        });
    </script>
    <link href="{{ asset('css/Supplier.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0"><button class="acs-icon-btn acs-add-btn acs-float" onclick="openNewWindow('Supplier/create')">
                <div class="acs-add-icon"></div>
                <div class="acs-btn-txt">Tambah Supplier</div>
            </button>
            <div class="card">
                <div class="card-header">Supplier</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <table id="table_Supplier" class="table table-bordered table-striped" style="width:100%">
                        <thead class="thead-dark">
                            <tr>
                                <th>IdSupplier</th>
                                <th>Nama Supplier </th>
                                <th>Negara</th>
                                <th>Kota</th>
                                <th>Alamat</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <script src="{{ asset('js/OrderPembelian/Supplier.js') }}"></script>
    @endsection
