@extends('layouts.appSales')
@section('content')
    <script>
        $(document).ready(function() {
            $('#table_Barcode').DataTable({
                order: [
                    [1, 'desc']
                ],
            });
        });
    </script>
    <link href="{{ asset('css/AccPenjualanCloth.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Acc Penjualan Cloth</div>

                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="{{ asset('js/Sales/AccPenjualanCloth.js') }}"></script>
@endsection
