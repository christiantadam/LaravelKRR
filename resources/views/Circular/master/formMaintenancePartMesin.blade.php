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
            <table id="table_mesin" class="display" style="width:100%">
                <thead>
                    <tr>
                        <th>Nama Mesin</th>
                        <th>Jumlah Parts</th>
                        <th>Status Health</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
            <button id="button_tambahLogMaintenance" class="btn btn-primary" type="button">Tambah Log Maintenance</button>
        </div>
    </div>
@endsection

@section('custom_js')
    <script src="{{ asset('js/Circular/master/maintenancePartMesin.js') }}"></script>

    @include('Circular.modal-tambah-log-maintenance')
@endsection
