@extends('layouts.appAccounting')
@section('content')
@section('title', 'Maintenance BKK KRR1')

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Maintenance BKK</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        <form method="POST" action="">
                            @csrf
                            <!-- Form fields go here -->

                            <div class="radio-container">
                                <div style="float: left;">
                                    <input type="radio" name="radiogrup" value="radio_2" id="radio_2">
                                    <label for="radio_2">Penagihan &nbsp;</label>
                                </div>
                                <div style="display: inline-block; margin: 0 auto;">
                                    <input type="radio" name="radiogrup" value="radio_3" id="radio_3">
                                    <label for="radio_3">No Penagihan</label>
                                </div>
                            </div>

                            {{-- <div class="card bg-info"> --}}
                            <div class="card">
                                <div>
                                    Data Belum Ada BKK
                                </div>
                                <p>
                                <div style="overflow-x: auto;">
                                    <table style="width: 100%;" id="table_atas">
                                        <thead class="table-dark">
                                            <tr>
                                                <th>ID. Bayar</th>
                                                <th>ID. TT</th>
                                                <th>Nama Supplier</th>
                                                <th>Rincian Pembayaran</th>
                                                <th>Nilai Pembayaran</th>
                                                <th>Tes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                                <br>
                                <div class="mb-3">
                                    <div class="row">
                                        <div class="col-11" style="padding-left: 15px">
                                            <button type="button" class="btn" id="btn_group">GROUP BKK</button>
                                        </div>
                                        <div class="col-1">
                                            <button type="button" class="btn" id="btn_tampil">TAMPIL BKK</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p>
                            <div class="card">
                                <br>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label for="id">ID.Bayar/ID.Detail</label>
                                    </div>
                                    <div class="col-md-1">
                                        <input type="text" name="supplierSelect" class="form-control"
                                            style="width: 100%">
                                    </div>
                                    <div class="col-md-1">
                                        <input type="text" name="supplierSelect" class="form-control"
                                            style="width: 100%">
                                    </div>
                                    <div class="col-md-1">
                                        <label for="id"></label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" name="supplierSelect" class="form-control"
                                            style="width: 100%">
                                    </div>
                                    <div class="col-md-5 d-flex justify-content-end">
                                        <label for="id" style="margin-left: 10px;">Bank</label>
                                        <div class="col-md-2">
                                            <input type="text" name="supplierSelect" class="form-control"
                                                style="width: 100%">
                                        </div>
                                    </div>
                                </div>
                                <br>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label for="id">Rincian Pembayaran</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="number" name="supplierSelect" class="form-control"
                                            style="width: 100%">
                                    </div>
                                </div>
                                <br>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label for="id">Nilai Rincian Rp.</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" name="supplierSelect" class="form-control"
                                            style="width: 100%">
                                    </div>
                                </div>
                                <br>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label for="id">Kode Perkiraan</label>
                                    </div>
                                    <div class="col-md-1">
                                        <input type="text" id="kode_kira" name="kode_kira1" class="form-control"
                                            style="width: 100%">
                                    </div>
                                    <div class="col-md-3">
                                        <input type="text" id="keterangan_kira" name="kode_kira2" class="form-control"
                                            style="width: 100%">
                                    </div>
                                    <div class="col-md-1">
                                        <button type="button" class="btn btn-default"
                                            id="btn_kodeperkiraan">...</button>
                                    </div>
                                </div>
                                <br>
                                <div style="overflow-x: auto;">
                                    <table style="width: 100%;" id="table_bawah">
                                        <thead class="table-dark">
                                            <tr>
                                                <th>ID. Detail</th>
                                                <th>tes1</th>
                                                <th>tes</th>
                                                <th>Rincian Pembayaran</th>
                                                <th>Nilai Rincian</th>
                                                <th>Kode Perkiraan</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                                <br>
                                <div class="row">
                                    <div class="col-md-2" style="padding-left: 950px; padding-right: 50px">
                                        <label for="id">Total</label>
                                    </div>
                                    <div class="col-md-1">
                                        <input type="text" name="supplierSelect" class="form-control"
                                            style="width: 100%">
                                    </div>
                                </div>
                                <br>
                            </div>
                            <br>
                            <div>
                                <button type="button" class="btn btn-primary" id="btn_proses"
                                    style="width: 100px; margin-left: 5px;">ISI</button>
                                <button type="button" class="btn btn-warning" id="btn_proses"
                                    style="width: 100px; margin-left: 5px;">KOREKSI</button>
                                <button type="button" class="btn btn-danger" id="btn_proses"
                                    style="width: 100px; margin-left: 5px;">HAPUS</button>
                                <button type="button" class="btn btn-success" id="btn_proses"
                                    style="width: 100px; margin-left: 5px;">PROSES</button>
                            </div>
                        </form>
                        <br>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal Tampil BKK-->
<div class="modal fade" id="dataBKKModal" tabindex="-1" aria-labelledby="dataBKKModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="dataBKKModalLabel">Data BKK</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-inline">
                    <label for="month">Bln/Thn:</label>
                    <input type="text" id="month" class="form-control" style="width: 80px">
                    <span>&nbsp;/&nbsp;</span>
                    <input type="text" id="year" class="form-control" style="width: 80px">
                    <span>&nbsp;&nbsp;</span>
                    <button id="btn_okbkk" type="button" class="btn btn-primary">OK</button>
                </div>
                <br>
                <div class="table-container">
                    <table class="table table-bordered" id="tabletampilBKK">
                        <thead class="table-dark">
                            <tr>
                                <th>BKK</th>
                                <th>Nilai BKK</th>
                                <th>Supplier</th>
                                <th>ID. Mata Uang</th>
                                <th>ID. Jenis Bayar</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div class="form-group mt-3">
                    <label for="bkk">BKK:</label>
                    <input type="text" id="bkk" class="form-control">
                    <input type="text" id="terbilang" class="form-control" style="display: none">
                    <input type="text" id="id_matauang" class="form-control" style="display: none">
                </div>
                <div class="form-group mt-3">
                    <label for="nilaiBkk">Nilai BKK:</label>
                    <input type="text" id="nilaiBkk" class="form-control" value="0">
                </div>
                <div class="form-group mt-3">
                    <label for="nilaiPembulatan">Nilai Pembulatan:</label>
                    <input type="text" id="nilaiPembulatan" class="form-control" value="0">
                </div>
            </div>
            <div class="modal-footer">
                <button id="btn_cetakbkk" type="button" class="btn btn-success">Cetak</button>
                <button id="btn_prosesbkk" type="button" class="btn btn-success"
                    style="display: none">Proses</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('js/Accounting/Hutang/MaintenanceBKKKRR1.js') }}"></script>
@endsection
