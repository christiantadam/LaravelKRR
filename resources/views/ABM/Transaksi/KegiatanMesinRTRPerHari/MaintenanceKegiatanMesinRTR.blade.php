@extends('layouts.appABM')
@section('content')
@section('title', 'Maintenance Kegiatan Mesin ABM')

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
<link href="{{ asset('css/ABM/MaintenanceKegiatanMesin.css') }}" rel="stylesheet">
<link href="{{ asset('css/style.css') }}" rel="stylesheet">
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            {{-- button untuk munculin create Order Kerja --}}
            <button class="acs-icon-btn acs-add-btn acs-float" id="button_tambahKegiatanMesin" type="button">
                <div class="acs-add-icon"></div>
                <div class="acs-btn-txt">Tambah Log Mesin</div>
            </button>
            <div class="card">
                <div class="card-header">Log Printing Mesin RTR</div>
                <div class="card-body RDZMobilePaddingLR0" style="overflow-x: auto;">
                    <table id="table_logMesin" class="table table-bordered table-striped"
                        style="width:100%">
                        <thead class="thead-dark">
                            <tr>
                                <th>Tgl Log</th>
                                <th>Nama Barang Hasil</th>
                                <th>Mesin</th>
                                <th>Shift</th>
                                <th>No OK</th>
                                <th>Hasil LBR</th>
                                <th>Hasil KG</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th colspan="5" style="text-align:right">Grand Total:</th>
                                <th id="totalLembar"></th>
                                <th id="totalKg"></th>
                                <th></th>
                            </tr>
                        </tfoot>
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
                <button type="button" class="close" id="closeDetailOrderKerjaModal">
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

@include('ABM.Transaksi.KegiatanMesinRTRPerHari.ModalMaintenanceKegiatanMesinRTR')
<script src="{{ asset('js/ABM/Transaksi/MaintenanceKegiatanMesinRTR.js') }}"></script>
@endsection
