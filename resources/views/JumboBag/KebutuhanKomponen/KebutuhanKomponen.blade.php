@extends('layouts.appJumboBag')
@section('title', 'Kebutuhan Komponen')
@section('content')
    <script>
        var listCustomerJBB = @json($listCustomerJBB);
    </script>
    <style>
        /* From Uiverse.io by vinodjangid07 */
        .print-btn {
            width: 25%;
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
            justify-self: center;
            margin: 0 0 0.5% 0;
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

        #div_cetakKebutuhanKomponen {
            display: none;
        }

        .select2-container--default .select2-results>.select2-results__options {
            max-height: 485px;
            overflow-y: auto;
        }

        @media print {
            .container-fluid {
                display: none;
            }

            #div_cetakKebutuhanKomponen {
                display: block;
                margin: 0.3%;
            }

            #table_cetakRingkasanKebutuhan {
                width: 100%;
                border-collapse: collapse !important;
                border-spacing: 0 !important;
                table-layout: fixed;
            }

            #table_cetakRingkasanKebutuhan *,
            #table_cetakRingkasanKebutuhan th,
            #table_cetakRingkasanKebutuhan td {
                border: 1px solid black !important;
                padding: 4px;
                margin: 0;
                box-shadow: none !important;
                background: white !important;
            }

            #table_cetakRingkasanKebutuhan thead,
            #table_cetakRingkasanKebutuhan tbody,
            #table_cetakRingkasanKebutuhan tr {
                border: none !important;
            }
        }
    </style>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-12 RDZMobilePaddingLR0">
                <div class="card">
                    <button class="acs-icon-btn acs-add-btn acs-float" id="button_tambahKebutuhan" type="button">
                        <div class="acs-add-icon"></div>
                        <div class="acs-btn-txt">Tambah Kebutuhan</div>
                    </button>
                    <div id="div_tabelDaftarKebutuhan" style="margin:0.5%">
                        <h3>Tabel Daftar Kebutuhan</h3>
                        <div style="overflow:auto">
                            <table id="table_daftarKebutuhan">
                                <thead>
                                    <tr style="white-space: nowrap">
                                        <th>Kode Barang JBB</th>
                                        <th>Jumlah Kebutuhan</th>
                                        <th>Tanggal Kebutuhan Awal</th>
                                        <th>Tanggal Kebutuhan Akhir</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <div>
                        <button class="print-btn" id="button_cetakKebutuhanKomponen" type="button">
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
                            Cetak Kebutuhan Komponen Mingguan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="div_cetakKebutuhanKomponen">
        <h1 id="header_cetakKebutuhanKomponen">Kebutuhan Komponen Periode dd-mm-yyyy / dd-mm-yyyy</h1>
        <div id="div_ringkasanKebutuhanKomponen">
            {{-- <h3>Ringkasan Kebutuhan</h3> --}}
            <div style="overflow:auto; font-size: 16px;">
                <table id="table_cetakRingkasanKebutuhan">
                    <thead style="font-weight: bold;">
                        <tr style="white-space: nowrap">
                            <th>Nama Komponen</th>
                            <th>Kode Komponen</th>
                            <th>Warna</th>
                            <th>Total Kebutuhan</th>
                            <th>Lokasi</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
        <div id="div_detailKebutuhanKomponen"></div>
    </div>
    @include('JumboBag.KebutuhanKomponen.TambahKebutuhanKomponenModal')
    @include('JumboBag.KebutuhanKomponen.DetailKebutuhanKomponenModal')
    <script type="text/javascript" src="{{ asset('js/JumboBag/KebutuhanKomponen.js') }}"></script>
@endsection
