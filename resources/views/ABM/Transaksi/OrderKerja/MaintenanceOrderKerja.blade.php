@extends('layouts.appABM')
@section('content')
@section('title', 'Maintenance Order Kerja')
<style>
    .input-error {
        outline: 1px solid red;
        text-decoration-color: red;
    }

    .show-important {
        display: flex !important;
    }

    .hide-important {
        display: none !important;
    }

    .show-important-block {
        display: block !important;
    }
</style>
<link href="{{ asset('css/ABM/MaintenanceOrderKerjaABM.css') }}" rel="stylesheet">
<link href="{{ asset('css/style.css') }}" rel="stylesheet">
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            {{-- button untuk munculin create Order Kerja --}}
            <button class="acs-icon-btn acs-add-btn acs-float" type="button" id="button_tambahOrderKerja"
                data-toggle="modal" data-target="#tambahPermohonanOrderKerjaModal">
                <div class="acs-add-icon"></div>
                <div class="acs-btn-txt">Tambah Order Kerja</div>
            </button>
            <div class="card">
                <div class="card-header">Daftar Order Kerja Aktif</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <table id="table_orderKerja" class="table table-bordered table-striped" style="width:100%">
                        <thead class="thead-dark">
                            <tr>
                                <th>Nomor OK</th>
                                <th>Nomor SP</th>
                                <th>Kode Barang Jadi</th>
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

<!-- Modal untuk Detail Order Kerja -->
<div class="modal fade" id="detailOrderKerjaModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog" style="max-width: 90%;">
        <div class="modal-content">
            <div class="modal-header justify-content-center">
                <h5 class="modal-title" id="detailOrderKerjaModalLabel">Detail Order Kerja </h5>
                <button type="button" class="close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="detailOrderKerjaNomorSuratPesanan">Nomor Surat Pesanan</label>
                    <div class="input-group">
                        <div id="detailOrderKerjaNomorSuratPesanan" class="form-control" style="height: auto;"></div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="detailOrderKerjaCustomer">Customer</label>
                    <div class="input-group">
                        <div id="detailOrderKerjaCustomer" class="form-control" style="height: auto;"></div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="detailOrderKerjaNamaBarang">Nama Barang</label>
                    <div class="input-group">
                        <div id="detailOrderKerjaNamaBarang" class="form-control" style="height: auto;"></div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="detailOrderKerjaTanggalRencanaMulaiKerja">Tanggal Rencana Mulai Kerja
                        (YYYY-MM-DD)</label>
                    <div class="input-group">
                        <div id="detailOrderKerjaTanggalRencanaMulaiKerja" class="form-control" style="height: auto;">
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="detailOrderKerjaTanggalRencanaSelesaiKerja">Tanggal Rencana Selesai Kerja
                        (YYYY-MM-DD)</label>
                    <div class="input-group">
                        <div id="detailOrderKerjaTanggalRencanaSelesaiKerja" class="form-control" style="height: auto;">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@include('ABM.Transaksi.OrderKerja.ModalPermohonanOrderKerja')
<script src="{{ asset('js/ABM/Transaksi/OrderKerja.js') }}"></script>
@endsection
