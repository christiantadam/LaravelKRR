@extends('layouts.appABM')
@section('content')
@section('title', 'Maintenance Kegiatan Mesin ABM')

<style>
    .input-error {
        outline: 1px solid red;
        text-decoration-color: red;
    }

    .show-important {
        display: flex !important;
    }

    .hide-important {
        display: none !important;
    }

    .show-important-block {
        display: block !important;
    }

    #table_logMesin th {
        white-space: nowrap;
    }
</style>
<link href="{{ asset('css/ABM/MaintenanceKegiatanMesin.css') }}" rel="stylesheet">
<link href="{{ asset('css/style.css') }}" rel="stylesheet">
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            {{-- button untuk munculin create Order Kerja --}}
            <button class="acs-icon-btn acs-add-btn acs-float" id="button_tambahKegiatanMesin" type="button">
                <div class="acs-add-icon"></div>
                <div class="acs-btn-txt">Tambah Log Mesin</div>
            </button>
            <div class="card">
                <div class="card-header">Log Mesin Potong Jahit</div>
                <div class="card-body RDZMobilePaddingLR0" style="overflow-x: auto;">
                    <table id="table_logMesin" class="table table-bordered table-striped" style="width:100%">
                        <thead class="thead-dark">
                            <tr>
                                <th>Tgl Log</th>
                                <th>Nama Barang Hasil</th>
                                <th>Mesin</th>
                                <th>Shift</th>
                                <th>No OK</th>
                                <th>Hasil LBR</th>
                                <th>Hasil KG</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {{-- <tfoot>
                            <tr>
                                <th colspan="5" style="text-align:right">Grand Total:</th>
                                <th id="totalLembar"></th>
                                <th id="totalKg"></th>
                                <th></th>
                            </tr>
                        </tfoot> --}}
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

@include('ABM.Transaksi.KegiatanMesinMPJPerHari.ModalMaintenanceKegiatanMesinMPJ')
@include('ABM.Transaksi.KegiatanMesinMPJPerHari.ModalMaintenanceKegiatanMesinMPJTanpaOK')
<script src="{{ asset('js/ABM/Transaksi/MaintenanceKegiatanMesinMPJ.js') }}"></script>
@endsection
