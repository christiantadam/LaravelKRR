@extends('layouts.appOrderPembelian')
@section('content')
    <link href="{{ asset('css/DaftarOrder.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">

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
                    <div class="card-header">Daftar Order</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">

                    </div>
                </div>
            </div>
        </div>
        <script src="{{ asset('js/OrderPembelian/DaftarOrder.js') }}"></script>
    @endsection
