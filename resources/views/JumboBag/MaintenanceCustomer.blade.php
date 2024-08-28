@extends('layouts.appJumboBag')
@section('title', 'Maintenance Customer')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <button class="acs-icon-btn acs-add-btn acs-float" data-bs-toggle="modal" data-bs-target="#tambahCustomerModal"
                    id="modaltambahcustomer" type="button">
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

    <!-- Modal untuk Tambah Customer -->
    <div class="modal fade" id="tambahCustomerModal" tabindex="-1" aria-labelledby="tambahCustomerModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header justify-content-center">
                    <h5 class="modal-title" id="tambahCustomerModalLabel">Tambah Customer</h5>
                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="tambahCustomerForm">
                        <div class="form-group">
                            <label for="kodeCustomer">Kode Customer</label>
                            <input type="text" class="form-control" id="kodeCustomer" name="kodeCustomer" maxlength="4">
                        </div>
                        <div class="form-group">
                            <label for="namaCustomer">Nama Customer</label>
                            <input type="text" class="form-control" id="namaCustomer" name="namaCustomer">
                        </div>
                        <button type="submit" class="btn btn-primary">Tambah Customer</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script src="{{ asset('js/JumboBag/MaintenanceCustomer.js') }}"></script>
@endsection
