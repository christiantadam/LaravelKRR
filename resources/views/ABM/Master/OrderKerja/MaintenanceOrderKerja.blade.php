@extends('layouts.appABM')
@section('content')
@section('title', 'Maintenance Order Kerja')
<link href="{{ asset('css/ABM/MaintenanceOrderKerjaABM.css') }}" rel="stylesheet">
<link href="{{ asset('css/style.css') }}" rel="stylesheet">
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            {{-- button untuk munculin create Order Kerja --}}
            <button class="acs-icon-btn acs-add-btn acs-float" id="button_tambahOrderKerja" type="button">
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
                                <th>Tanggal Rencana Mulai</th>
                                <th>Nomor SP</th>
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
{{-- <div class="modal fade" id="detailOrderKerja" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog" style="max-width: 90%;">
            <div class="modal-content">
                <div class="modal-header justify-content-center">
                    <h5 class="modal-title" id="detailKonversiModalLabel">Detail Konversi </h5>
                    <button type="button" data-bs-dismiss="modal" class="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div style="margin: 0.5%;" class="card" id="detail_konversiModalDivTabelAsalKonversi">
                        <h3>Tabel Asal Konversi</h3>
                        <div style="margin: 0.5%;overflow:auto">
                            <table id="detail_konversiModalTableDaftarAsalKonversi">
                                <thead>
                                    <tr style="white-space: nowrap">
                                        <th>Id Type Asal</th>
                                        <th>Nama Type Asal</th>
                                        <th>Pengeluaran Primer</th>
                                        <th>Pengeluaran Sekunder</th>
                                        <th>Pengeluaran Tritier</th>
                                        <th>Id Tmp Transaksi</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <div style="margin: 0.5%;" class="card" id="detail_konversiModalDivTabelTujuanKonversi">
                        <h3>Tabel Tujuan Konversi</h3>
                        <div style="margin: 0.5%;overflow:auto">
                            <table id="detail_konversiModalTableDaftarTujuanKonversi">
                                <thead>
                                    <tr style="white-space: nowrap">
                                        <th>Id Type Tujuan</th>
                                        <th>Nama Type Tujuan</th>
                                        <th>Pemasukan Primer</th>
                                        <th>Pemasukan Sekunder</th>
                                        <th>Pemasukan Tritier</th>
                                        <th>Id Tmp Transaksi</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-success btn-acc" id="button_modalACC">Proses ACC</button>
                </div>
            </div>
        </div>
    </div> --}}

@include('ABM.Master.OrderKerja.ModalPermohonanOrderKerja')
<script src="{{ asset('js/ABM/Master/OrderKerja.js') }}"></script>
@endsection
