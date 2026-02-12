@extends('layouts.appEDP')
@section('title', 'Maintenance Lokasi')
@section('content')
    {{-- @include('Utility.Master.EditMaintenanceTeknisi') --}}
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                {{-- <button class="acs-icon-btn acs-add-btn acs-float" data-bs-toggle="modal" data-bs-target="#tambahmodal"
                    id="modaltambahteknisi" type="button">
                    <div class="acs-add-icon"></div>
                    <div class="acs-btn-txt">Tambah Teknisi</div>
                </button> --}}
                <div class="card">
                    <div class="card-header">Maintenance Lokasi</div>
                    <div class="card-body table-responsive mt-1">
                        <table class="table" id="table-teknisi">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">ID User</th>
                                    <th scope="col">Nomor User</th>
                                    <th scope="col">Nama User</th>
                                    <th scope="col">Lokasi</th>
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

    <div class="modal fade" id="editmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <input type="hidden" id="hiddenIdTeknisi">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Edit Lokasi</h5>
                    <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row-lg-12 mb-2">
                        <div class="col-lg-12 d-flex">
                            <label for="teknisi">User</label>
                        </div>
                        <div class="col-lg-12 d-flex">
                            <input type="text" class="form-control text-center" id="userEdit" name="userEdit" readonly>
                        </div>
                    </div>
                    <div class="row-lg-12 mb-2">
                        <div class="col-lg-12 d-flex">
                            <label for="lokasi">Lokasi</label>
                        </div>
                        <div class="col-lg-12 d-flex flex-column">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="lokasiTropodo" value="TPD">
                                <label class="form-check-label" for="lokasiTropodo">
                                    Tropodo
                                </label>
                            </div>

                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="lokasiMojosari" value="MJS">
                                <label class="form-check-label" for="lokasiMojosari">
                                    Mojosari
                                </label>
                            </div>

                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="lokasiJekek" value="JKK">
                                <label class="form-check-label" for="lokasiJekek">
                                    Jekek
                                </label>
                            </div>

                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="lokasiMlorah" value="MLH">
                                <label class="form-check-label" for="lokasiMlorah">
                                    Mlorah
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer d-flex justify-content-end">
                    <button type="button" class="btn btn-success" id="updateButtonTeknisi">Simpan</button>
                    <button type="button text-end" class="btn btn-danger" data-dismiss="modal">Keluar</button>
                </div>
            </div>
        </div>
    </div>

    <script src="{{ asset('js/EDP/MaintenanceLokasi.js') }}"></script>
@endsection
