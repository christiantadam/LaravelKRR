<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="icon" href="{{ asset('/images/KRR.png') }}" type="image/gif" sizes="16x16">
    <title style="font-size: 20px">{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js' type='text/javascript'></script>

    <script src="{{ asset('js/app.js') }}"></script>
    <!-- <script src="https://code.jquery.com/jquery-3.1.0.js"></script> -->
    <!-- <script src="//code.jquery.com/jquery-1.11.0.min.js"></script> -->
    <script src="{{ asset('js/datatables.min.js') }}"></script>
    <script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/select/1.6.2/js/dataTables.select.min.js"></script>
    <script src="{{ asset('js/jquery-dateformat.js') }}"></script>
    <script src="{{ asset('js/RDZ.js') }}"></script>
    <script src="{{ asset('js/User.js') }}"></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/appWorkshop.css') }}" rel="stylesheet">
    <link href="{{ asset('css/datatables.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/buttons.dataTables.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/RdzAndre.css') }}" rel="stylesheet">
    <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous"> -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
</head>

<body onload="Greeting()">
    <div id="app">
        <nav class="navbar navbar-expand-md navbar-light bg-white shadow sticky-top">
            <div class="container col-md-12">
                <a class="navbar-brand RDZNavBrandCenter RDZUnderLine" href="{{ url('/') }}">
                    🡰 <img src="{{ asset('/images/KRR.png') }}" width="55" height="50" alt="KRR">
                    {{-- {{ config('app.name', 'Laravel') }} --}}
                </a>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    {{-- jadwal konstruksi --}}
                    <ul class="navbar-nav mr-auto RDZNavContenCenter">
                        <div class="dropdown">
                            <a class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false" style="margin: 10px">
                                Jadwal Konstruksi
                            </a>
                            <ul class="dropdown-menu" style="cursor: default">
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('estimasiJadwal') }}">Estimasi Jadwal ✓</a> </li>
                                <hr style="height:2px;">
                                <li><a class="test"
                                        style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('MaintenanceGambar') }}">Maintenance Bagian Gambar
                                        ✓</a>
                                </li>
                                <li><a class="test"
                                        style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('InputJadwalKonstruksi') }}">Input Jadwal </a>
                                </li>
                                <hr style="height:2px;">
                                <li><a class="test"
                                        style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('EditJam') }}">Edit Jam Kerja Optimal ✓</a>
                                </li>


                                <li><a class="test"style="margin: 10px; color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1">Edit Jadwal &raquo;</a>
                                    <ul class="dropdown-menu dropdown-submenu">
                                        <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                tabindex="-1" href="{{ url('EditPerWorkStation') }}">Per WorkStation
                                                ✓</a>
                                        </li>
                                        <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                tabindex="-1" href="{{ url('EditPerOrderkonstruksi') }}">Per Order
                                                ✓</a>
                                        </li>
                                    </ul>
                                </li>
                                <li><a class="test"
                                        style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('EditEstimasiTanggal') }}">Edit Estimasi Tanggal
                                        ✓</a>
                                </li>
                                <li><a class="test"
                                        style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('EditEstimasiWaktu') }}">Edit Estimasi Waktu</a>
                                </li>
                                <hr style="height:2px;">
                                <li><a class="test"
                                        style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('FinishJadwalKonstruksi') }}">Finish Jadwal</a>
                                </li>
                                <li><a class="test"style="margin: 10px; color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1">Delete Jadwal &raquo;</a>
                                    <ul class="dropdown-menu dropdown-submenu">
                                        <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                tabindex="-1"
                                                href="{{ url('DeleteJadwalPerWorkStation') }}">Per-WorkStation</a>
                                        </li>
                                        <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                tabindex="-1" href="{{ url('DeleteJadwalPerOrder') }}">Per-Order</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        {{-- Jadwal Pengerjaan --}}
                        <div class="dropdown">
                            <a class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false" style="margin: 10px">
                                Jadwal Pengerjaan
                            </a>
                            <ul class="dropdown-menu" style="cursor: default;">
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('MaintenanceMaterialType') }}">Maintenance
                                        Material Type</a>
                                </li>
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('MaintenanceBagianBarang') }}">Maintenance Bagian
                                        Barang</a>
                                </li>
                                <hr style="height:2px;">
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('InputJadwal') }}">Input Jadwal</a>
                                </li>
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('EditJamKerja') }}">Edit Jam Kerja Optimal</a>
                                </li>

                                <li><a class="test"
                                        style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1">Edit Jadwal &raquo;</a>

                                    <ul class="dropdown-menu dropdown-submenu">
                                        <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                tabindex="-1" href="{{ url('EditPerMesin') }}">Per-Mesin</a></li>
                                        <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                tabindex="-1" href="{{ url('EditPerOrder') }}">Per-Order</a>
                                        </li>
                                    </ul>
                                </li>
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('EditEstimasiTanggalPengerjaan') }}">Edit
                                        Estimasi Tanggal</a>
                                </li>
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('EditEstimasiWaktuPengerjaan') }}">Edit Estimasi
                                        Waktu</a>
                                </li>
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('EditJumlahBarang') }}">Edit Jumlah Barang yang
                                        dikerjakan</a>
                                </li>
                                <hr style="height:2px;">
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('FinishJadwalPengerjaan') }}">Finish Jadwal</a>
                                </li>

                                <li><a class="test"style="margin: 10px; color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1">Delete Jadwal &raquo;</a>
                                    <ul class="dropdown-menu dropdown-submenu">
                                        <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                tabindex="-1" href="{{ url('DeletePerMesin') }}">Per-Mesin</a>
                                        </li>
                                        <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                tabindex="-1" href="{{ url('DeletePerOrder') }}">Per-Order</a>
                                        </li>
                                    </ul>
                                </li>
                                <hr style="height:2px;">
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('BiayaProsesMakloon') }}">Biaya Proses
                                        Makloon</a>
                                </li>
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('HargaMaterial') }}">Harga Material</a>
                                </li>
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('MaintenanceDataSPart') }}">Maintenance Data
                                        S/Part</a>
                                </li>
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('NomorOrderKerjaProyek') }}">Nomor Order
                                        Kerja/Proyek</a>
                                </li>
                                <hr style="height:2px;">
                                <li><a class="test"style="margin: 10px; color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1">Penyesuaian Data(Finish) &raquo;</a>
                                    <ul class="dropdown-menu dropdown-submenu">
                                        <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                tabindex="-1" href="{{ url('DataPerencanaan') }}">Data Rencana</a>
                                        </li>
                                        <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                tabindex="-1" href="{{ url('DataSelesai') }}">Data Selesai</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        {{-- informasi konstruksi --}}

                        <div class="dropdown">
                            <a class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false" style="margin: 10px">
                                Informasi Konstruksi
                            </a>
                            <ul class="dropdown-menu" style="cursor: default">
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('JadwalPerWorkStation') }}">Jadwal
                                        Per-WorkStasion ✓</a>
                                </li>
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('JadwalPerOder') }}">Jadwal Per-Order</a>
                                </li>
                                <hr style="height:2px;">
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('DaftarOrderGambar') }}">Daftar Order Gambar</a>
                                </li>
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('DaftarEstimasiJadwal') }}">Daftar Estimasi
                                        Jadwal</a>
                                </li>
                                <hr style="height:2px;">
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('GrafikWorkStation') }}">Grafik Work Stations</a>
                                </li>
                                <hr style="height:2px;">
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('JadwalKonstruksiPerBulan') }}">Jadwal Konstruksi
                                        per bulan</a>
                                </li>
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('HistoriProsesKonstruksi') }}">Histori Proses
                                        Konstruksi</a>
                                </li>
                            </ul>
                        </div>
                        {{-- informasi pengerjaan --}}
                        <div class="dropdown">
                            <a class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false" style="margin: 10px">
                                Informasi Perngerjaan
                            </a>
                            <ul class="dropdown-menu" style="cursor: default">
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('JadwalPerMesinPengerjaan') }}">Jadwal
                                        Per-Mesin</a>
                                </li>
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('JadwalPerOrderPengerjaan') }}">Jadwal
                                        Per-Order</a>
                                </li>
                                <hr style="height:2px;">
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('DaftarOrderKerjaProyek') }}">Daftar Order Kerja
                                        dan Proyek</a>
                                </li>
                                <hr style="height:2px;">
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('EDMCNC') }}">Grafik Mesin EDM/CNC</a>
                                </li>
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('DrillMillScrap') }}">Grafik Mesin
                                        Drill/Mill/Scrap</a>
                                </li>
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('MesinGrinding') }}">Grafik Mesin Grinding</a>
                                </li>
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('MesinLas') }}">Grafik Mesin Las</a>
                                </li>
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('PunchInjectCasting') }}">Grafik Mesin
                                        Punch/Inject/Casting</a>
                                </li>
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('Turning') }}">Grafik Mesin Turning</a>
                                </li>
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('Finishing') }}">Grafik Mesin Finishing</a>
                                </li>
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('ProsesMakloon') }}">Grafik Mesin Makloon</a>
                                </li>
                                <hr style="height:2px;">
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('PengerjaanPerOrder') }}">Grafik Pengerjaan Per
                                        Order</a>
                                </li>
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('PengerjaanPerBulan') }}">Jadwal Pengerjaan per
                                        bulan</a>
                                </li>
                                <hr style="height:2px;">
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('HistoriProsesPengerjaan') }}">Histori Proses
                                        Pengerjaan</a>
                                </li>
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('DaftarSPerPart') }}">Daftar Sper Part Per
                                        Order</a>
                                </li>
                            </ul>
                        </div>
                        {{-- Laporan --}}
                        <div class="dropdown">
                            <a class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false" style="margin: 10px">
                                Laporan
                            </a>
                            <ul class="dropdown-menu" style="cursor: default">
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('') }}">Order Gambar Masuk</a>
                                </li>
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('OrderPengerjaanMasuk') }}">Order Pengerjaan
                                        Masuk</a>
                                </li>
                                <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                        tabindex="-1" href="{{ url('HasilPengerjaan') }}">Hasil Pengerjaan</a>
                                </li>
                            </ul>
                        </div>
                    </ul>
                    {{-- laporan --}}
                    {{-- windows --}}
                    {{-- exit --}}
                    <!-- Right Side Of Navbar -->

                    <!-- Authentication Links -->

                </div>
            </div>
        </nav>

        <main class="py-4">
            @yield('content')
        </main>
    </div>
    <script>
        $(document).ready(function() {
            $('.dropdown-submenu a.test').on("click", function(e) {
                $(this).next('ul').toggle();
                e.stopPropagation();
                e.preventDefault();
            });
        });
    </script>
</body>

</html>
