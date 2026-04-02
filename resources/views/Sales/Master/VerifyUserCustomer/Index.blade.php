@extends('layouts.appSales') @section('content')
@section('title', 'Customer Verification')
<style>
    .custom-modal-width {
        max-width: 90%;
        /* Adjust the percentage as needed */
    }
</style>
<link href="{{ asset('css/style.css') }}" rel="stylesheet">
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">List User Milik Customer</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <table id="table_User" class="table table-bordered table-striped" style="width:100%">
                        <thead class="thead-dark">
                            <tr>
                                <th>Nama User</th>
                                <th>Email User</th>
                                <th>Nama Perusahaan</th>
                                <th>NPWP Perusahaan</th>
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
<script type="text/javascript" src="{{ asset('js/Sales/VerifyCustomer.js') }}"></script>
@endsection
