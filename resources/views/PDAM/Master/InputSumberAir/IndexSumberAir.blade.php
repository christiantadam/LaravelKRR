@extends('layouts.appPDAM')
@section('title', 'Input Sumber Air')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <button class="acs-icon-btn acs-add-btn acs-float" id="button_tambahSumber" type="button" data-toggle="modal"
                    data-target="#tambahSumberAirModal">
                    <div class="acs-add-icon"></div>
                    <div class="acs-btn-txt">Tambah Sumber</div>
                </button>
                <div class="card">
                    <div class="card-header">Input Sumber Air</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <table id="table_sumberAir" class="table table-bordered table-striped" style="width:100%">
                            <thead class="thead-dark">
                                <tr>
                                    <th>Nama Sumber</th>
                                    <th>Lokasi</th>
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
    @include('PDAM.Master.InputSumberAir.ModalSumberAir')
    <script src="{{ asset('js/PDAM/InputSumberAir.js') }}"></script>
@endsection
