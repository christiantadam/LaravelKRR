@extends('layouts.appOrderPembelian')
@section('title', 'Reminder Approve')

@section('content')
    {{-- <link href="{{ asset('css/FotoBarang.css') }}" rel="stylesheet"> --}}
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-12 RDZMobilePaddingLR0">
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @elseif (Session::has('error'))
                    <div class="alert alert-danger">
                        {{ Session::get('error') }}
                    </div>
                @endif
                <div class="card font-weight-bold">
                    <div class="card-header">Reminder Approve</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="col-12">
                            <div class="row">
                                <div class="col-5">
                                    <label for="radiobutton" class="form-check-label" id="labelRedisplay">Tanggal</label>
                                    <div class="row">
                                        <div class="col">
                                            <input type="date" class="form-control font-weight-bold" id="tgl_awal"
                                                name="tgl_awal">
                                            <label for="tgl_awal" class="form-label"></label>
                                        </div>
                                        <div>
                                            <label for="sampai_dengan">s/d</label>
                                        </div>
                                        <div class="col">
                                            <input type="date" class="form-control font-weight-bold" id="tgl_akhir"
                                                name="tgl_akhir">
                                            <label for="tgl_akhir" class="form-label"></label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-2">
                                    <div class="col-12">
                                        <button class="btn btn-info mt-4 w-100" id="btn_redisplay">Redisplay</button>
                                    </div>
                                </div>
                            </div>
                            <table class ="table table-bordered text-center align-middle" id="table_atas"
                                style="width: 100%">
                                <thead class="table-dark" style="text-align: center">
                                    <tr>
                                        <th>No Trans</th>
                                        <th>Tanggal</th>
                                        <th>Nama Barang</th>
                                        <th>Quantity</th>
                                        <th>Divisi</th>
                                        <th>User</th>
                                        <th>Status Beli</th>
                                        <th>Aksi</th>
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

    <div class="modal fade" id="editmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <input type="hidden" id="hiddenIdTeknisi">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Reminder Approve by Whatsapp</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row-lg-12 mb-2">
                        <div class="col-lg-12 d-flex">
                            <label for="manager" style="font-weight: bold;">Nama Manager - No Telp</label>
                        </div>
                        {{-- <div class="col-md-5 d-flex">
                            <label for="nama_mesin">Nama Mesin</label>
                        </div> --}}
                        <div class="col-md-12">
                            <select id="manager" class="form-select form-select-sm" style="width: 100%">
                                <option></option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer d-flex justify-content-end">
                        <button type="button" class="btn btn-success" id="btn_kirim">Kirim</button>
                        <button type="button text-end" class="btn btn-secondary" data-bs-dismiss="modal">Keluar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @include('Beli/Transaksi/FinalApprove/modalDetailFinal')
    <script src="{{ asset('js/OrderPembelian/ReminderApprove.js') }}"></script>
@endsection
