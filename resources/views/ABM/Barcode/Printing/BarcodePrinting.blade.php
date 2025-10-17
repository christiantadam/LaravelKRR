@extends('layouts.appABM')
@section('content')
@section('title', 'Barcode Printing ABM')
<style>
    .swal-wide {
        width: 75% !important;
    }

    .wide-swal {
        /*for swal barcode*/
        max-width: none;
    }

    .input-error {
        outline: 1px solid red;
        text-decoration-color: red;
    }

    .print-btn {
        width: 300px;
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        border: 1px solid rgb(0, 0, 0);
        border-radius: 10px;
        gap: 10px;
        font-size: 16px;
        cursor: pointer;
        overflow: hidden;
        font-weight: 500;
        box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.065);
        transition: all 0.3s;
    }

    .printer-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 100%;
    }

    .printer-container {
        height: 50%;
        width: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: center;
    }

    .printer-container svg {
        width: 100%;
        height: auto;
        transform: translateY(4px);
    }

    .printer-page-wrapper {
        width: 100%;
        height: 50%;
        display: flex;
        align-items: flex-start;
        justify-content: center;
    }

    .printer-page {
        width: 70%;
        height: 10px;
        border: 1px solid black;
        background-color: white;
        transform: translateY(0px);
        transition: all 0.3s;
        transform-origin: top;
    }

    .print-btn:hover .printer-page {
        height: 16px;
        background-color: rgb(239, 239, 239);
    }

    .print-btn:hover {
        background-color: rgb(239, 239, 239);
    }

    .barcode-container {
        display: none;
        justify-items: center;
    }

    .barcode-card {
        width: 80%;
        height: 145mm;
        border: 1px solid #000;
        border-radius: 8px;
        box-sizing: border-box;
        padding: 20mm 10mm;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        page-break-after: always;
    }

    .barcode-text {
        margin-top: 15px;
        text-align: center;
        word-wrap: break-word;
        max-width: 100%;
    }

    .barcode-code {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 8px;
    }

    .barcode-name {
        font-size: 16px;
        line-height: 1.4;
        white-space: normal;
        word-break: break-word;
    }

    @media print {
        .container-fluid {
            display: none;
        }

        #detailKonversiModal {
            display: none;
        }

        #tambahTujuanModal {
            display: none;
        }

        .barcode-container {
            display: block;
        }

        .barcode-card {
            page-break-after: always;
        }
    }
</style>

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <button class="acs-icon-btn acs-add-btn acs-float" id="button_tambahKonversi" type="button">
                    <div class="acs-add-icon"></div>
                    <div class="acs-btn-txt">Tambah Barcode</div>
                </button>
                <input type="hidden" name="nomorUser" id="nomorUser" value={{ $nomorUser }}>
                <div class="card-header">Barcode Printing ABM</div>
                <div id="div_tabelDaftarBarcode" style="margin:0.5%">
                    <h3>Daftar Barcode</h3>
                    <div style="overflow:auto">
                        <table id="table_daftarBarcode">
                            <thead>
                                <tr style="white-space: nowrap">
                                    <th>Barcode</th>
                                    <th>Nama Type</th>
                                    <th>Jumlah Primer</th>
                                    <th>Jumlah Sekunder</th>
                                    <th>Jumlah Tritier</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {{-- <div>Untuk contoh print barcode pakai barcode 000000587-000139863</div> --}}
</div>

<!-- Modal untuk Detail Transaksi Konversi -->
<div class="modal fade" id="detailKonversiModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog" style="max-width: 90%;">
        <div class="modal-content">
            <div class="modal-header justify-content-center">
                <h5 class="modal-title" id="detailKonversiModalLabel">Detail Konversi </h5>
                <button type="button" class="close" aria-label="Close" id="closeModalButtonDetail">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" style="display:grid; gap: 5px">
                <div class="card border-top border-dark bg-light p-2">
                    <div class="d-flex" style="gap: 0.5%;width: 100%">
                        <div class="form-group" style="flex: 0.5">
                            <label for="modalDetail_tanggal">Tanggal Konversi</label>
                            <div class="input-group">
                                <input type="date" class="form-control" id="modalDetail_tanggal"
                                    name="modalDetail_tanggal" readonly>
                            </div>
                        </div>
                        <div class="form-group" style="flex: 0.3">
                            <label for="modalDetail_shift">Shift</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="modalDetail_shift"
                                    name="modalDetail_shift" readonly>
                            </div>
                        </div>
                        <div class="form-group" style="flex: 0.3">
                            <label for="modalDetail_group">Group</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="modalDetail_group"
                                    name="modalDetail_group" readonly>
                            </div>
                        </div>
                        <div class="form-group"style="flex: 1">
                            <label for="modalDetail_customer">Customer</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="modalDetail_customer"
                                    name="modalDetail_customer" readonly>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card border-top border-dark bg-light p-2" id="detail_konversiModalDivTabelAsalKonversi">
                    <h3>Tabel Asal Konversi</h3>
                    <div style="margin: 0.5%;overflow:auto">
                        <table id="detail_konversiModalTableDaftarAsalKonversi">
                            <thead>
                                <tr style="white-space: nowrap">
                                    <th>Id Type Asal</th>
                                    <th>Nama Type Asal</th>
                                    <th>Kelompok Utama</th>
                                    <th>Pengeluaran Primer</th>
                                    <th>Pengeluaran Sekunder</th>
                                    <th>Pengeluaran Tritier</th>
                                    <th>Id Tmp Transaksi</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                <div class="card border-top border-dark bg-light p-2" id="detail_konversiModalDivTabelTujuanKonversi">
                    <h3>Tabel Tujuan Konversi</h3>
                    <div style="margin: 0.5%;overflow:auto">
                        <table id="detail_konversiModalTableDaftarTujuanKonversi">
                            <thead>
                                <tr style="white-space: nowrap">
                                    <th>Id Type Tujuan</th>
                                    <th>Nama Type Tujuan</th>
                                    <th>Kelompok Utama</th>
                                    <th>Pemasukan Primer</th>
                                    <th>Pemasukan Sekunder</th>
                                    <th>Pemasukan Tritier</th>
                                    <th>Id Tmp Transaksi</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                <button type="submit" class="btn btn-success btn-acc" style="width: 8%" id="button_modalACC">Proses
                    ACC</button>
            </div>
        </div>
    </div>
</div>

{{-- <canvas id="div_printBarcode" style="display: none">
    Print Barcode
</canvas> --}}
<div id="barcodeContainer" class="barcode-container">

</div>
@include('ABM.Barcode.Printing.ModalPermohonanKonversiBarcodePrinting')
<script src="{{ asset('js/ABM/Barcode/BarcodePrinting.js') }}"></script>
@endsection
