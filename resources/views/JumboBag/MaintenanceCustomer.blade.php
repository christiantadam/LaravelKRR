@extends('layouts.appJumboBag')
@section('title', 'Maintenance Customer')
@section('content')
    {{-- @include('Utility.Master.TambahMaintenanceTeknisi')
    @include('Utility.Master.EditMaintenanceTeknisi') --}}
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <button class="acs-icon-btn acs-add-btn acs-float" data-bs-toggle="modal" data-bs-target="#tambahmodal"
                    id="modaltambahteknisi" type="button">
                    <div class="acs-add-icon"></div>
                    <div class="acs-btn-txt">Tambah Customer</div>
                </button>
                <div class="card">
                    <div class="card-header">Maintenance Customer</div>
                    <div class="card-body table-responsive mt-1">
                        <table class="table" id="table-customer">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Kode Customer</th>
                                    <th scope="col">Nama Customer</th>
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

    <!-- Modal untuk Edit Customer -->
    <div class="modal fade" id="editCustomerModal" tabindex="-1" aria-labelledby="editCustomerModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editCustomerModalLabel">Edit Customer</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="editCustomerForm">
                        <input type="hidden" id="editKodeCustomer">
                        <div class="mb-3">
                            <label for="editNamaCustomer" class="form-label">Nama Customer</label>
                            <input type="text" class="form-control" id="editNamaCustomer" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Simpan Perubahan</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/JumboBag/MaintenanceCustomer.js') }}"></script>
@endsection
