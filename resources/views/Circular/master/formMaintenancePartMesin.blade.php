@extends('Circular.layouts.app')

@section('title')
    Maintenance Part Mesin
@endsection

@section('content')
    <div class="card" style="max-width: 750px; margin-left: auto; margin-right: auto;">
        <div class="card-header">
            Maintenance Part Mesin
        </div>

        <div class="card-body" style="padding-left: 5%; padding-right: 5%;">
            <table id="example" class="display" style="width:100%">
                <thead>
                    <tr>
                        <th>Nama Mesin</th>
                        <th>Jumlah Parts</th>
                        <th>Status Health</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    </div>
@endsection

@section('custom_js')
    <script src="{{ asset('js/Circular/master/maintenancePartMesin.js') }}"></script>
@endsection
