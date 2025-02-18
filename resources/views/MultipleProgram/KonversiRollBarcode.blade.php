@extends('layouts.appJumboBag')
@section('content')
    <style>
        .swal-wide {
            width: 75% !important;
        }

        .input-error {
            outline: 1px solid red;
            text-decoration-color: red;
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

            #div_printBarcode {
                display: block !important;
                visibility: visible;
            }
        }
    </style>

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-12 RDZMobilePaddingLR0">
                <div class="card">
                    <button class="acs-icon-btn acs-add-btn acs-float" id="button_tambahKonversi" type="button">
                        <div class="acs-add-icon"></div>
                        <div class="acs-btn-txt">Tambah Konversi</div>
                    </button>
                    <input type="hidden" name="divisiPotong" id='divisiPotong' value={{ $id }}>
                    <input type="hidden" name="nomorUser" id="nomorUser" value={{ $nomorUser }}>
                    @if ($id == 'JBBPotong')
                        <div class="card-header">Konversi Roll Barcode ke JBB Potong</div>
                    @elseif ($id == 'ABMStghJadi')
                        <div class="card-header">Konversi Roll Barcode ke ABM Setengah Jadi</div>
                    @endif
                    <div id="div_tabelDaftarKonversi" style="margin:0.5%">
                        <h3>Tabel Daftar Konversi</h3>
                        <div style="overflow:auto">
                            <table id="table_daftarKonversi">
                                <thead>
                                    <tr style="white-space: nowrap">
                                        <th>Barcode Barang Asal</th>
                                        <th>Nama Type Asal</th>
                                        <th>Pemakaian Primer</th>
                                        <th>Pemakaian Sekunder</th>
                                        <th>Pemakaian Tritier</th>
                                        <th>Id Konversi</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal untuk Detail Transaksi Konversi -->
    <div class="modal fade" id="detailKonversiModal" tabindex="-1" aria-hidden="true">
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
    </div>

    <svg id="div_printBarcode" style="visibility: hidden">
        hueheheheh
    </svg>

    @if ($id == 'JBBPotong')
        @section('title', 'Konversi JBB Potong')
        @include('MultipleProgram.ModalPermohonanKonversiRoll.ModalPermohonanJBB')
        @include('MultipleProgram.ModalPermohonanKonversiRoll.ModalPermohonanJBBTanpaBarcode')
        <script src="{{ asset('js/MultipleProgram/KonversiRollBarcodeJBBPotong.js') }}"></script>
    @elseif ($id == 'ABMStghJadi')
        <!-- prettier-ignore -->
        @section('title', 'Konversi ABM Stgh Jadi')
        @include('MultipleProgram.ModalPermohonanKonversiRoll.ModalPermohonanABM')
        @include('MultipleProgram.ModalPermohonanKonversiRoll.ModalPermohonanABMTanpaBarcode')
        <script src="{{ asset('js/MultipleProgram/KonversiRollBarcodeABMStghJadi.js') }}"></script>
    @elseif ($id == 'ADSPotong')
        <!-- prettier-ignore -->
        @section('title', 'Konversi ABM Stgh Jadi')
        @include('MultipleProgram.ModalPermohonanKonversiRoll.ModalPermohonanADS')
        <script src="{{ asset('js/MultipleProgram/KonversiRollBarcodeADSPotong.js') }}"></script>
    @else
        <script>
            console.log('Belum ada file .js');
        </script>
    @endif
@endsection
