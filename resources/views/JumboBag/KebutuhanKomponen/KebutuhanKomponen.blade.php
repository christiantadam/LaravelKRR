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

        .print-btn-schedule {
            width: 15%;
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

        .div-btn-print {
            display: flex;
            flex-direction: row;
            gap: 10px;
            justify-content: center
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

        #div_cetakSchedule {
            display: none;
        }

        .select2-container--default .select2-results>.select2-results__options {
            max-height: 485px;
            overflow-y: auto;
        }

        @media print {
            @page {
                size: landscape;
                margin: 1cm;
            }

            .container-fluid {
                display: none;
            }

            .print-section.print-active {
                display: block !important;
                visibility: visible !important;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
            }

            #div_cetakKebutuhanKomponen table,
            #div_cetakSchedule table {
                width: 100%;
                border-collapse: collapse !important;
                border-spacing: 0 !important;
            }

            #div_cetakKebutuhanKomponen table *,
            #div_cetakKebutuhanKomponen table th,
            #div_cetakKebutuhanKomponen table td {
                border: 1px solid black !important;
                padding: 4px;
                margin: 0;
                box-shadow: none !important;
                background: white !important;
            }

            #div_cetakKebutuhanKomponen table thead,
            #div_cetakKebutuhanKomponen table tbody,
            #div_cetakKebutuhanKomponen table tr {
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
                                        <th>Lokasi</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <div class="div-btn-print">
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
                        <button class="print-btn-schedule" id="button_cetakSchedule" type="button">
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
                            Cetak Schedule
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="div_cetakKebutuhanKomponen" class="print-section">
        <h1 id="header_cetakKebutuhanKomponen">Kebutuhan Komponen Tanggal dd-mm-yyyy / dd-mm-yyyy</h1>
        <hr style="border: 1px solid black;">
        <div id="div_ringkasanKebutuhanKomponenTropodo">
            <h2>Tropodo</h2>
            <div style="overflow:auto; font-size: 16px;" id="div_tableCetakRingkasanKebutuhanTropodoKain">
                <h3>Kain Tubular/Flat</h3>
                <table id="table_cetakRingkasanKebutuhanTropodoKain">
                    <thead style="font-weight: bold;">
                        <tr style="white-space: nowrap">
                            <th>Jenis Kain</th>
                            <th>Warna</th>
                            <th>Lebar</th>
                            <th>Denier</th>
                            <th>WA</th>
                            <th>WE</th>
                            <th>Reinforced</th>
                            <th>Jumlah Reinforced</th>
                            <th>Total Kebutuhan</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div style="overflow:auto; font-size: 16px;" id="div_tableCetakRingkasanKebutuhanTropodoAccessories">
                <h3>Accessories</h3>
                <table id="table_cetakRingkasanKebutuhanTropodoAccessories">
                    <thead style="font-weight: bold;">
                        <tr style="white-space: nowrap">
                            <th>Warna</th>
                            <th>Lebar</th>
                            <th>Denier</th>
                            <th>Total Kebutuhan (mtr)</th>
                            <th>Total Kebutuhan (kg)</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
        <div id="div_ringkasanKebutuhanKomponenMojosari">
            <hr style="border: 1px solid black;">
            <h2>Mojosari</h2>
            <div style="overflow:auto; font-size: 16px;" id="div_tableCetakRingkasanKebutuhanMojosariKain">
                <h3>Kain Tubular/Flat</h3>
                <table id="table_cetakRingkasanKebutuhanMojosariKain">
                    <thead style="font-weight: bold;">
                        <tr style="white-space: nowrap">
                            <th>Jenis</th>
                            <th>Warna</th>
                            <th>Lebar</th>
                            <th>Denier</th>
                            <th>WA</th>
                            <th>WE</th>
                            <th>Reinforced</th>
                            <th>Jumlah Reinforced</th>
                            <th>Total Kebutuhan</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div style="overflow:auto; font-size: 16px;" id="div_tableCetakRingkasanKebutuhanMojosariAccessories">
                <h3>Accessories</h3>
                <table id="table_cetakRingkasanKebutuhanMojosariAccessories">
                    <thead style="font-weight: bold;">
                        <tr style="white-space: nowrap">
                            <th>Warna</th>
                            <th>Lebar</th>
                            <th>Denier</th>
                            <th>Total Kebutuhan (mtr)</th>
                            <th>Total Kebutuhan (kg)</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
        <div id="div_ringkasanKebutuhanKomponenNganjuk">
            <hr style="border: 1px solid black;">
            <h2>Nganjuk</h2>
            <div style="overflow:auto; font-size: 16px;" id="div_tableCetakRingkasanKebutuhanNganjukKain">
                <h3>Kain Tubular/Flat</h3>
                <table id="table_cetakRingkasanKebutuhanNganjukKain">
                    <thead style="font-weight: bold;">
                        <tr style="white-space: nowrap">
                            <th>Jenis</th>
                            <th>Warna</th>
                            <th>Lebar</th>
                            <th>Denier</th>
                            <th>WA</th>
                            <th>WE</th>
                            <th>Reinforced</th>
                            <th>Jumlah Reinforced</th>
                            <th>Total Kebutuhan</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div style="overflow:auto; font-size: 16px;" id="div_tableCetakRingkasanKebutuhanNganjukAccessories">
                <h3>Accessories</h3>
                <table id="table_cetakRingkasanKebutuhanNganjukAccessories">
                    <thead style="font-weight: bold;">
                        <tr style="white-space: nowrap">
                            <th>Warna</th>
                            <th>Lebar</th>
                            <th>Denier</th>
                            <th>Total Kebutuhan (mtr)</th>
                            <th>Total Kebutuhan (kg)</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
        <div id="div_ringkasanKebutuhanKomponenMlorah">
            <hr style="border: 1px solid black;">
            <h2>Mlorah</h2>
            <div style="overflow:auto; font-size: 16px;" id="div_tableCetakRingkasanKebutuhanMlorahKain">
                <h3>Kain Tubular/Flat</h3>
                <table id="table_cetakRingkasanKebutuhanMlorahKain">
                    <thead style="font-weight: bold;">
                        <tr style="white-space: nowrap">
                            <th>Jenis</th>
                            <th>Warna</th>
                            <th>Lebar</th>
                            <th>Denier</th>
                            <th>WA</th>
                            <th>WE</th>
                            <th>Reinforced</th>
                            <th>Jumlah Reinforced</th>
                            <th>Total Kebutuhan</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div style="overflow:auto; font-size: 16px;" id="div_tableCetakRingkasanKebutuhanMlorahAccessories">
                <h3>Accessories</h3>
                <table id="table_cetakRingkasanKebutuhanMlorahAccessories">
                    <thead style="font-weight: bold;">
                        <tr style="white-space: nowrap">
                            <th>Warna</th>
                            <th>Lebar</th>
                            <th>Denier</th>
                            <th>Total Kebutuhan (mtr)</th>
                            <th>Total Kebutuhan (kg)</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
        <div id="div_ringkasanKebutuhanKomponenParto">
            <hr style="border: 1px solid black;">
            <h2>Parto</h2>
            <div style="overflow:auto; font-size: 16px;" id="div_tableCetakRingkasanKebutuhanPartoKain">
                <h3>Kain Tubular/Flat</h3>
                <table id="table_cetakRingkasanKebutuhanPartoKain">
                    <thead style="font-weight: bold;">
                        <tr style="white-space: nowrap">
                            <th>Jenis</th>
                            <th>Warna</th>
                            <th>Lebar</th>
                            <th>Denier</th>
                            <th>WA</th>
                            <th>WE</th>
                            <th>Reinforced</th>
                            <th>Jumlah Reinforced</th>
                            <th>Total Kebutuhan</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div style="overflow:auto; font-size: 16px;" id="div_tableCetakRingkasanKebutuhanPartoAccessories">
                <h3>Accessories</h3>
                <table id="table_cetakRingkasanKebutuhanPartoAccessories">
                    <thead style="font-weight: bold;">
                        <tr style="white-space: nowrap">
                            <th>Warna</th>
                            <th>Lebar</th>
                            <th>Denier</th>
                            <th>Total Kebutuhan (mtr)</th>
                            <th>Total Kebutuhan (kg)</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>

    <div id="div_cetakSchedule" class="print-section">
        <h2 id="header_cetakSchedule">Schedule Tanggal dd-mm-yyyy</h2>
        <div id="div_scheduleTropodo">
            <hr style="border: 1px solid black;">
            <h3>Tropodo</h3>
            <div style="overflow:auto; font-size: 16px;" id="div_tableCetakScheduleTropodo">
                <table id="table_cetakScheduleTropodo">
                    <thead style="font-weight: bold;">
                        <tr style="white-space: nowrap">
                            <th>No.</th>
                            <th>Spek</th>
                            <th>Jumlah</th>
                            <th>Tanggal Kebutuhan Awal</th>
                            <th>Tanggal Kebutuhan Akhir</th>
                            <th>Keterangan</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
        <div id="div_scheduleMojosari">
            <hr style="border: 1px solid black;">
            <h3>Mojosari</h3>
            <div style="overflow:auto; font-size: 16px;" id="div_tableCetakScheduleMojosari">
                <table id="table_cetakScheduleMojosari">
                    <thead style="font-weight: bold;">
                        <tr style="white-space: nowrap">
                            <th>No.</th>
                            <th>Spek</th>
                            <th>Jumlah</th>
                            <th>Tanggal Kebutuhan Awal</th>
                            <th>Tanggal Kebutuhan Akhir</th>
                            <th>Keterangan</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
        <div id="div_scheduleNganjuk">
            <hr style="border: 1px solid black;">
            <h3>Nganjuk</h3>
            <div style="overflow:auto; font-size: 16px;" id="div_tableCetakScheduleNganjuk">
                <table id="table_cetakScheduleNganjuk">
                    <thead style="font-weight: bold;">
                        <tr style="white-space: nowrap">
                            <th>No.</th>
                            <th>Spek</th>
                            <th>Jumlah</th>
                            <th>Tanggal Kebutuhan Awal</th>
                            <th>Tanggal Kebutuhan Akhir</th>
                            <th>Keterangan</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
        <div id="div_scheduleMlorah">
            <hr style="border: 1px solid black;">
            <h3>Mlorah</h3>
            <div style="overflow:auto; font-size: 16px;" id="div_tableCetakScheduleMlorah">
                <table id="table_cetakScheduleMlorah">
                    <thead style="font-weight: bold;">
                        <tr style="white-space: nowrap">
                            <th>No.</th>
                            <th>Spek</th>
                            <th>Jumlah</th>
                            <th>Tanggal Kebutuhan Awal</th>
                            <th>Tanggal Kebutuhan Akhir</th>
                            <th>Keterangan</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
        <div id="div_scheduleParto">
            <hr style="border: 1px solid black;">
            <h3>Parto</h3>
            <div style="overflow:auto; font-size: 16px;" id="div_tableCetakScheduleParto">
                <table id="table_cetakScheduleParto">
                    <thead style="font-weight: bold;">
                        <tr style="white-space: nowrap">
                            <th>No.</th>
                            <th>Spek</th>
                            <th>Jumlah</th>
                            <th>Tanggal Kebutuhan Awal</th>
                            <th>Tanggal Kebutuhan Akhir</th>
                            <th>Keterangan</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
    @include('JumboBag.KebutuhanKomponen.TambahKebutuhanKomponenModal')
    @include('JumboBag.KebutuhanKomponen.DetailKebutuhanKomponenModal')
    <script type="text/javascript" src="{{ asset('js/JumboBag/KebutuhanKomponen.js') }}"></script>
@endsection
