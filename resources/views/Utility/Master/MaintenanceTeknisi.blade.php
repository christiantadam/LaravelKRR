@extends('layouts.appUtility')
@section('title', 'Maintenance Teknisi')
@section('content')
    @include('Utility.Master.TambahMaintenanceTeknisi')
    @include('Utility.Master.EditMaintenanceTeknisi')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <button class="acs-icon-btn acs-add-btn acs-float" data-bs-toggle="modal" data-bs-target="#tambahmodal"
                    id="modaltambahteknisi" type="button">
                    <div class="acs-add-icon"></div>
                    <div class="acs-btn-txt">Tambah Teknisi</div>
                </button>
                <div class="card">
                    <div class="card-header">Maintenance Teknisi</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="row-12 d-flex flex-wrap">
                            <div class="col-lg-12 p-2">
                                <div class="table-responsive mt-1">
                                    <table class="table" id="table-teknisi">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th scope="col">Lokasi</th>
                                                <th scope="col">Teknisi</th>
                                                <th scope="col">Aksi</th>
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
            </div>
        </div>
    </div>
    <script src="{{ asset('js/Utility/Master/MaintenanceTeknisi.js') }}"></script>
@endsection
