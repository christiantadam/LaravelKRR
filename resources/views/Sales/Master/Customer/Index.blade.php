@extends('layouts.appSales') @section('content')
    <script>
        $(document).ready(function() {
            $('#table_Customer').DataTable({
                processing: true,
                serverSide: true,
                "ajax": {
                    "url": "{{ url('getallcustomer') }}",
                    "dataType": "json",
                    "type": "POST",
                    "data": {
                        _token: "{{ csrf_token() }}"
                    }
                },
                "columns": [{
                        "data": "IDCustomer"
                    },
                    {
                        "data": "NamaCustomer"
                    },
                    {
                        "data": "Kota"
                    },
                    {
                        "data": "Negara"
                    },
                    {
                        "data": "Actions"
                    }
                ]
            });
        });
    </script>
    <link href="{{ asset('css/customer.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <button class="acs-icon-btn acs-add-btn acs-float" onclick="openNewWindow('Customer/create')">
                    <div class="acs-add-icon"></div>
                    <div class="acs-btn-txt">Tambah Customer</div>
                </button>
                <div class="card">
                    <div class="card-header">Customer</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <table id="table_Customer" class="table table-bordered table-striped" style="width:100%">
                            <thead class="thead-dark">
                                <tr>
                                    <th>IdCustomer</th>
                                    <th>Nama Customer </th>
                                    <th>Kota Kirim</th>
                                    <th>Negara</th>
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
@endsection
