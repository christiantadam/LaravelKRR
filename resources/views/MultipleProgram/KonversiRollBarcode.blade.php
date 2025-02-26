@extends(
    [
        'JBBPotong' => 'layouts.appJumboBag',
        'ABMStghJadi' => 'layouts.appABM',
        'ADSStghJadi' => 'layouts.appADStar',
    ][$id] ?? 'layouts.app'
)

@section('content')
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

        /* From Uiverse.io by vinodjangid07 */
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
                            @if ($id == 'JBBPotong')
                                <!-- From Uiverse.io by vinodjangid07 -->
                                <button class="print-btn" id="button_cetakKonversi">
                                    <span class="printer-wrapper">
                                        <span class="printer-container">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 92 75">
                                                <path stroke-width="5" stroke="black"
                                                    d="M12 37.5H80C85.2467 37.5 89.5 41.7533 89.5 47V69C89.5 70.933 87.933 72.5 86 72.5H6C4.067 72.5 2.5 70.933 2.5 69V47C2.5 41.7533 6.75329 37.5 12 37.5Z">
                                                </path>
                                                <mask fill="white" id="path-2-inside-1_30_7">
                                                    <path
                                                        d="M12 12C12 5.37258 17.3726 0 24 0H57C70.2548 0 81 10.7452 81 24V29H12V12Z">
                                                    </path>
                                                </mask>
                                                <path mask="url(#path-2-inside-1_30_7)" fill="black"
                                                    d="M7 12C7 2.61116 14.6112 -5 24 -5H57C73.0163 -5 86 7.98374 86 24H76C76 13.5066 67.4934 5 57 5H24C20.134 5 17 8.13401 17 12H7ZM81 29H12H81ZM7 29V12C7 2.61116 14.6112 -5 24 -5V5C20.134 5 17 8.13401 17 12V29H7ZM57 -5C73.0163 -5 86 7.98374 86 24V29H76V24C76 13.5066 67.4934 5 57 5V-5Z">
                                                </path>
                                                <circle fill="black" r="3" cy="49" cx="78"></circle>
                                            </svg>
                                        </span>

                                        <span class="printer-page-wrapper">
                                            <span class="printer-page"></span>
                                        </span>
                                    </span>
                                    Cetak Barcode Konversi Terakhir
                                </button>
                            @endif
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

    <canvas id="div_printBarcode" style="display: none">
        Print Barcode
    </canvas>


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
    @elseif ($id == 'ADSStghJadi')
        <!-- prettier-ignore -->
        @section('title', 'Konversi ADS Stgh Jadi')
        @include('MultipleProgram.ModalPermohonanKonversiRoll.ModalPermohonanADS')
        <script src="{{ asset('js/MultipleProgram/KonversiRollBarcodeADSPotong.js') }}"></script>
    @else
        <script>
            console.log('Belum ada file .js');
        </script>
    @endif
@endsection
