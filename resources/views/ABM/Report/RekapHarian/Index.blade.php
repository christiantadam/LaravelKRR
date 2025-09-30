@extends('layouts.appABM')
@section('content')
@section('title', 'Rekap Harian ABM')
<link href="{{ asset('css/style.css') }}" rel="stylesheet">
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Rekapan Harian ABM</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">

                    <div class="py-2">
                        <div class="d-flex" style="gap: 1%;width: 100%">
                            <div class="form-group"style="flex: 0.12">
                                <label for="tanggalRekapan">Tanggal Rekap</label>
                                <div class="input-group">
                                    <input type="date" name="tanggalRekapan" id="tanggalRekapan"
                                        class="form-control">
                                </div>
                            </div>
                            <div class="form-group align-content-end"style="flex: 0.12">
                                <button class="btn btn-success" id="button_cetakRekapan">Cetak Rekapan</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>

@include('ABM.Report.RekapHarian.modalInputDataRekapHarian')
<script src="{{ asset('js/ABM/Report/RekapHarian.js') }}"></script>
@endsection
