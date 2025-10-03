@extends('layouts.appABM')
@section('content')
@section('title', 'Laporan MPJ ABM')
<link href="{{ asset('css/style.css') }}" rel="stylesheet">
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Laporan MPJ ABM</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">

                    <div class="py-2">
                        <div class="d-flex" style="gap: 1%;width: 100%">
                            <div class="form-group"style="flex: 0.12">
                                <label for="tanggalLaporan">Tanggal Laporan</label>
                                <div class="input-group">
                                    <input type="date" name="tanggalLaporan" id="tanggalLaporan"
                                        class="form-control">
                                </div>
                            </div>
                            <div class="form-group align-content-end"style="flex: 0.12">
                                <button class="btn btn-secondary" id="button_cetakLaporan">Cetak Laporan</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>

<script src="{{ asset('js/ABM/Report/LaporanPotongJahitABM.js') }}"></script>
@endsection
