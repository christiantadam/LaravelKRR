@extends(
    [
        'JBBStghJd' => 'layouts.appJumboBag',
        'ABMBrgJd' => 'layouts.appABM',
        'ADSBrgJd' => 'layouts.appADStar',
    ][$id] ?? 'layouts.app'
)
@section('content')
    <style>
        .swal2-container .select2-dropdown {
            z-index: 10000 !important;
        }

        .swal2-container .select2-container {
            width: 100% !important;
            /* Ensure the Select2 component spans the modal width */
        }

        .swal2-container .select2-selection {
            height: auto !important;
            /* Fix the height to auto */
        }

        .swal2-container .swal2-input {
            height: auto !important;
            /* Make sure the input fields take the proper height */
        }

        .row-warning {
            background-color: #ffcccc;
            /* Warning red */
            transition: background-color 2s ease;
            /* 2-second fade transition */
        }

        .editable-cell {
            contenteditable="true"
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
                    <input type="hidden" name="divisiUser" id='divisiUser' value={{ $id }}>
                    <input type="hidden" name="nomorUser" id="nomorUser" value={{ $nomorUser }}>
                    <div class="card-header">
                        @if ($id == 'JBBStghJd')
                            Konversi JBB Setengah Jadi ke Barang Jadi
                        @elseif ($id == 'ABMBrgJd')
                            Konversi ABM Setengah Jadi ke Barang Jadi
                        @elseif ($id == 'ADSBrgJd')
                            Konversi ADS Setengah Jadi ke Barang Jadi
                        @endif
                    </div>
                    <div id="div_tabelDaftarKonversi" style="margin:0.5%">
                        <h3>Tabel Daftar Konversi</h3>
                        <div style="overflow:auto">
                            <table id="table_daftarKonversi">
                                <thead>
                                    <tr style="white-space: nowrap">
                                        <th>Id Type Tujuan</th>
                                        <th>Nama Type Tujuan</th>
                                        <th>Hasil Primer</th>
                                        <th>Hasil Sekunder</th>
                                        <th>Hasil Tritier</th>
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
                    <button type="button" data-bs-dismiss="modal" class="close" id="closeModalButtonDetail">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body-detail" style="position: relative;flex: 1 1 auto;padding: 1rem">
                    <div style="margin: 0.5%;padding: 0.5%" class="card" id="detail_konversiModalDivTabelAsalKonversi">
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
                    <div style="margin: 0.5%;padding: 0.5%" class="card" id="detail_konversiModalDivTabelTujuanKonversi">
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

    <canvas id="div_printBarcode" style="display: none">
        Print Barcode
    </canvas>

    @if ($id == 'JBBStghJd')
        @section('title', 'Konversi JBB Barang Jadi')
        @include('MultipleProgram.ModalPermohonanKonversiBarangJadi.ModalPermohonanJBB')
        <script src="{{ asset('js/MultipleProgram/KonversiSetengahJadiJBBPotong.js') }}"></script>
    @elseif ($id == 'ABMBrgJd')
        <!-- prettier-ignore -->
        @section('title', content: 'Konversi ABM Barang Jadi')
        @include('MultipleProgram.ModalPermohonanKonversiBarangJadi.ModalPermohonanABM')
        <script src="{{ asset('js/MultipleProgram/KonversiSetengahJadiABMPotong.js') }}"></script>
    @elseif ($id == 'ADSBrgJd')
        <!-- prettier-ignore -->
        @section('title', content: 'Konversi ADS Barang Jadi')
        @include('MultipleProgram.ModalPermohonanKonversiBarangJadi.ModalPermohonanADS')
        <script src="{{ asset('js/MultipleProgram/KonversiSetengahJadiADSPotong.js') }}"></script>
    @else
        <script>
            console.log('Belum ada file .js');
        </script>
    @endif
@endsection
