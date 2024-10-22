@extends('layouts.appAccounting')
@section('content')
@section('title', 'Cetak Nota dan Faktur')
<style>
    .table-responsive.fixed-height tbody {
        background-color: white;
    }

    .underline {
        border-bottom: 1px solid black;
        /* Change the color as needed */
        margin-bottom: 10px;
        /* Space between labels and line */
    }

    .table-responsive.fixed-height {
        /* overflow-y: auto; */
        /* position: relative; */
        border-radius: 8px;
        border: 2px solid black;
        /* width: 100%; */
        /* table-layout: fixed; */
        background-color: white;
    }

    .no-wrap-header thead th {
        white-space: nowrap;
        background-color: lightgoldenrodyellow;
        padding: 0;
    }

    .table-responsive.fixed-height tbody td {
        background-color: white;
        padding: 4px 5px;
    }

    .fixed-width {
        white-space: nowrap;
        /* Prevent text wrapping */
        overflow: hidden;
        /* Hide overflow text */
        text-overflow: ellipsis;
        /* Show "..." when the text overflows */
        padding: 0;
    }

    table.dataTable {
        table-layout: fixed;
        /* Ensure table uses fixed layout */
        width: 100%;
        /* Ensure the table takes up the full width */
    }

    #table_list th,
    #table_list td {
        padding-top: 0;
        padding-bottom: 0;
        font-size: 16px;
    }
</style>
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-8 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Cek Nota dan Faktur</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        <!-- Form fields go here -->
                        <div class="card">
                            <div class="d-flex">
                                <div class="col-md-4">
                                    <input type="radio" id="optTunai" name="pilihan" value="optTunai">
                                    <label for="optTunai">Tunai</label>
                                </div>
                                <div class="col-md-4">
                                    <input type="radio" id="optPajakTunai" name="pilihan" value="optPajakTunai">
                                    <label for="optPajakTunai">Faktur Pajak Tunai</label>
                                </div>
                                <div class="col-md-4">
                                    <input type="radio" id="optUM" name="pilihan" value="optUM">
                                    <label for="optUM">Faktur Uang Muka</label>
                                </div>
                            </div>
                            <p>
                            <div class="d-flex">
                                <div class="col-md-4">
                                    <input type="radio" id="optNotaFaktur" name="pilihan" value="optNotaFaktur"
                                        checked>
                                    <label for="optNotaFaktur">Nota/Faktur</label>
                                </div>
                                <div class="col-md-4">
                                    <input type="radio" id="optPajak" name="pilihan" value="optPajak">
                                    <label for="optPajak">Faktur Pajak</label>
                                </div>
                                <div class="col-md-4">
                                    <input type="radio" id="optPajakUM" name="pilihan" value="optPajakUM">
                                    <label for="optPajakUM">Faktur Tunai UM</label>
                                </div>
                            </div>
                            <br>
                            <div class="d-flex">
                                <div class="col-md-4">
                                    <label for="tgl_Penagihan">Tanggal Penagihan</label>
                                </div>
                                <div class="col-md-3">
                                    <input type="date" id="tgl_Penagihan" class="form-control" style="width: 100%">
                                </div>
                            </div>
                            <p>
                            <div class="d-flex">
                                <div class="col-md-4">
                                    <label for="customer">Customer</label>
                                </div>
                                <div class="col-md-7">
                                    <input readonly type="text" id="customer" class="form-control" style="width: 100%">
                                </div>
                                <div class="col-md-1">
                                    <button id="btnBrowse" class="btn btn-primary form-control">...</button>
                                </div>
                            </div>
                            <p>
                            <div class="d-flex">
                                <div class="col-md-4">
                                    <label for="idPenagihan">Id Penagihan</label>
                                </div>
                                <div class="col-md-7">
                                    <input readonly type="text" id="idPenagihan" class="form-control" style="width: 100%">
                                </div>
                            </div>
                        </div>
                        <br>
                        <div class="mb-3">
                            <div class="row">
                                <div class="col-1">
                                    <input type="submit" id="btnPrev" name="cetak" value="Cetak"
                                        class="btn btn-primary">
                                </div>
                                {{-- <div class="col-2">
                                    <input type="submit" id="btnKeluar" name="keluar" value="Keluar"
                                        class="btn btn-primary">
                                </div> --}}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="{{ asset('js/Accounting/Informasi/CetakNotadanFaktur.js') }}"></script>
@endsection
