@extends('layouts.appUtility')
@section('title', 'Maintenance Tipe Gangguan')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <button class="acs-icon-btn acs-add-btn acs-float" data-bs-toggle="modal" data-bs-target="#tambahCustomerModal"
                    id="modaltambahcustomer" type="button">
                    <div class="acs-add-icon"></div>
                    <div class="acs-btn-txt">Tambah Gangguan</div>
                </button>
                <div class="card">
                    <div class="card-header">Maintenance Tipe Gangguan</div>
                    <div class="card-body table-responsive mt-1">
                        <table class="table" id="table-customer">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Tipe Gangguan</th>
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
    <!-- Modal untuk Tambah Customer -->
    <div class="modal fade" id="tambahCustomerModal" tabindex="-1" aria-labelledby="tambahCustomerModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header justify-content-center">
                    <h5 class="modal-title" id="tambahCustomerModalLabel">Tambah Tipe Gangguan</h5>
                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="tambahCustomerForm">
                        {{-- <div class="form-group">
                            <label for="kodeCustomer">Kode Customer</label>
                            <input type="text" class="form-control" id="kodeCustomer" name="kodeCustomer" maxlength="4">
                        </div> --}}
                        <div class="form-group">
                            <label for="tipeGangguan">Tipe Gangguan</label>
                            <input type="text" class="form-control" id="tipe_gangguan" name="tipe_gangguan">
                        </div>
                        <button type="submit" class="btn btn-primary">Tambah</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script src="{{ asset('js/Utility/Master/MaintenanceTipeGangguan.js') }}"></script>
@endsection

