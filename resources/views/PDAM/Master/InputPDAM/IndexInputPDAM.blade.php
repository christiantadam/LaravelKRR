@extends('layouts.appPDAM')
@section('title', 'Input PDAM')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <button class="acs-icon-btn acs-add-btn acs-float" id="button_tambahData" type="button" data-toggle="modal"
                    data-target="#tambahDataPDAMModal">
                    <div class="acs-add-icon"></div>
                    <div class="acs-btn-txt">Tambah Data</div>
                </button>
                <div class="card">
                    <div class="card-header">Input PDAM</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div style="display: flex;flex-direction: row;gap: 5px;">
                            <div class="form-group">
                                <label for="select_lokasiSumberAirFilter">Lokasi Sumber Air</label>
                                <div class="input-group">
                                    <select name="select_lokasiSumberAirFilter" id="select_lokasiSumberAirFilter"
                                        class="form-control">
                                        @if (count($lokasi) > 1)
                                            <option disabled selected>-- Pilih Lokasi --</option>
                                            @foreach ($lokasi as $l)
                                                <option value="{{ $l->Id_Lokasi }}">{{ $l->Lokasi }}</option>
                                            @endforeach
                                        @else
                                            @foreach ($lokasi as $l)
                                                <option value="{{ $l->Id_Lokasi }}">{{ $l->Lokasi }} |
                                                    {{ $l->Id_Lokasi }}</option>
                                            @endforeach
                                        @endif
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="select_sumberAirFilter">Nama Sumber Air</label>
                                <div class="input-group">
                                    @if (count($lokasi) > 1)
                                        <select name="select_sumberAirFilter" id="select_sumberAirFilter"
                                            class="form-control" disabled>
                                            <option disabled selected>-- Pilih Sumber Air --</option>
                                        </select>
                                    @else
                                        <select name="select_sumberAirFilter" id="select_sumberAirFilter"
                                            class="form-control">
                                            <option disabled selected>-- Pilih Sumber Air --</option>
                                            @foreach ($sumberModal as $s)
                                                <option value="{{ $s->IdSumberAir }}">{{ $s->NamaSumberAir }}</option>
                                            @endforeach
                                        </select>
                                    @endif
                                </div>
                            </div>
                            <button class="btn btn-secondary" style="align-self: center" id="button_clearFilter">Clear
                                Filter</button>
                        </div>
                        <table id="table_dataPDAM" class="table table-bordered table-striped" style="width:100%">
                            <thead class="thead-dark">
                                <tr>
                                    <th>Tanggal</th>
                                    <th>Lokasi</th>
                                    <th>Sumber Air</th>
                                    <th>Counter</th>
                                    <th>Pemakaian</th>
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
    @include('PDAM.Master.InputPDAM.ModalInputPDAM')
    @include('PDAM.Master.InputPDAM.DetailDataPDAM')
    <script src="{{ asset('js/PDAM/InputPDAM.js') }}"></script>
@endsection
