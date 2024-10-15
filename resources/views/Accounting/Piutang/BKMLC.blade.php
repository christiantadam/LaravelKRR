@extends('layouts.appAccounting')
@section('content')
@section('title', 'BKM LC')

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

    .preview {
        display: none;
    }

    .preview2 {
        display: none;
    }

    @media print {

        /* Hide everything by default */
        body * {
            visibility: hidden;
        }

        /* Show only elements with the class 'preview' */
        .preview,
        .preview * {
            visibility: visible;
        }

        /* Show only elements with the class 'preview2' */
        .preview2,
        .preview2 * {
            visibility: visible;
        }

        /* Ensure that the elements are positioned correctly */
        .preview,
        .preview2 {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            transform-origin: top left;
        }
    }
</style>

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Maintenance BKM-BKK LC</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">

                        <div class="row">
                            <div class="col-md-2">
                                <label for="bulanTahun" style="margin-right: 10px;">Bulan/Tahun</label>
                            </div>
                            <div class="col-md-1">
                                <input type="text" id="bln" name="bln" class="form-control"
                                    style="width: 100%">
                            </div>
                            <div class="col-md-1">
                                <input type="text" id="thn" name="thn" class="form-control"
                                    style="width: 100%">
                            </div>
                            <div class="col-md-2">
                                <input type="submit" id="btnOK" name="btnOK" value="OK" class="btn">
                            </div>
                            <div class="col-md-2">
                                <input type="submit" id="btnPilih" name="pilihBank" value="Pilih Bank" class="btn">
                            </div>
                            <div class="col-md-2">
                                <input type="submit" id="btnGroup" name="groupBKM" value="Group BKM" class="btn">
                            </div>
                        </div>

                        <div class="row mb-2" style="margin-top: 0.5%">
                            <div class="col-sm-12">
                                <div class="table-responsive fixed-height">
                                    <table class="table table-bordered no-wrap-header" id="tableData">
                                        <thead>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-sm-4">
                                <input type="radio" id="detailPelunasan" name="detailOption" value="pelunasan">
                                <label for="detailPelunasan">Detail Pelunasan</label>
                            </div>
                            <div class="col-sm-4">
                                <input type="radio" id="detailBiaya" name="detailOption" value="biaya">
                                <label for="detailBiaya">Detail Biaya</label>
                            </div>
                            <div class="col-sm-4">
                                <input type="radio" id="detailKurangLebih" name="detailOption" value="kurangLebih">
                                <label for="detailKurangLebih">Detail Kurang/Lebih</label>
                            </div>
                        </div>

                        <div class="row mb-2" style="margin-top: 0.5%">
                            <div class="col-sm-4">
                                <div class="table-responsive fixed-height">
                                    <table class="table table-bordered no-wrap-header" id="tablePelunasan">
                                        <thead>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="table-responsive fixed-height">
                                    <table class="table table-bordered no-wrap-header" id="tableBiaya">
                                        <thead>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="table-responsive fixed-height">
                                    <table class="table table-bordered no-wrap-header" id="tableKurangLebih">
                                        <thead>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div class="mb-3">
                            <div class="row">
                                <div class="col-5">
                                    <input type="submit" id="btnTampilbkm" value="Tampil BKM"
                                        class="btn btn-primary d-flex ml-auto">
                                </div>
                                <div class="col-3">
                                    <input type="submit" id="btnTampilBKK" value="Tampil BKK"
                                        class="btn btn-primary d-flex ml-auto">
                                </div>
                                <div class="col-4">
                                    <input type="submit" id="btnTutup" value="TUTUP"
                                        class="btn btn-primary d-flex ml-auto" disabled>
                                </div>
                            </div>
                        </div>

                        <div class="modal fade bd-example-modal-lg" id="modalPilihBank" tabindex="-1" role="dialog"
                            aria-labelledby="myLargeModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title">Maintenance Pilih Bank BKM</h5>
                                    </div>
                                    <div class="modal-body">
                                        <div class="row">
                                            <div class="col-sm-3">
                                                <label for="bankBg">Id. Pelunasan</label>
                                            </div>
                                            <div class="col-sm-3">
                                                <input type="text" id="idPelunasanPilih" class="form-control" readonly>
                                            </div>
                                        </div>

                                        <div class="row mt-5">
                                            <div class="col-sm-3">
                                                <label for="bankBg">Tanggal Input</label>
                                            </div>
                                            <div class="col-sm-3">
                                                <input type="date" id="tglInputPilih" class="form-control">
                                                <input type="text" id="blnPilih" class="form-control" hidden>
                                                <input type="text" id="thnPilih" class="form-control" hidden>
                                            </div>
                                        </div>

                                        <div class="row mt-1">
                                            <div class="col-sm-3">
                                                <label for="bankBg">Jenis Bayar</label>
                                            </div>
                                            <div class="col-sm-3">
                                                <input type="text" id="jenisBayarPilih" class="form-control" readonly>
                                            </div>
                                        </div>

                                        <div class="row mt-1">
                                            <div class="col-sm-3">
                                                <label for="bankBg">Bank</label>
                                            </div>
                                            <div class="col-sm-2">
                                                <input type="text" id="bankPilih" class="form-control" readonly>
                                            </div>
                                            <div class="col-sm-6">
                                                <input type="text" id="namaBankPilih" class="form-control" readonly>
                                            </div>
                                            <div class="col-sm-1">
                                                <button id="btnBankPilih" class="form-control btn btn-primary">...</button>
                                            </div>
                                        </div>

                                        <div class="row mt-1">
                                            <div class="col-sm-3">
                                                <label for="bankBg">Mata Uang</label>
                                            </div>
                                            <div class="col-sm-3">
                                                <input type="text" id="mataUangPilih" class="form-control" readonly>
                                            </div>
                                        </div>

                                        <div class="row mt-1">
                                            <div class="col-sm-3">
                                                <label for="bankBg">Nilai Pelunasan</label>
                                            </div>
                                            <div class="col-sm-6">
                                                <input type="text" id="pelunasanPilih" class="form-control" readonly>
                                            </div>
                                        </div>

                                        <div class="row mt-1">
                                            <div class="col-sm-3">
                                                <label for="bankBg">No. Bukti</label>
                                            </div>
                                            <div class="col-sm-9">
                                                <input type="text" id="buktiPilih" class="form-control" readonly>
                                                <input type="text" id="jenisBankPilih" class="form-control" hidden>
                                                <input type="text" id="keAPilih" class="form-control" hidden>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="modal-footer">
                                        <button id="btnProsesPilih" class="btn btn-primary">PROSES</button>
                                        <button type="button" class="btn btn-secondary"
                                            data-bs-dismiss="modal">TUTUP</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="{{ asset('js\Accounting\Piutang\BKMLC.js') }}"></script>
@endsection
