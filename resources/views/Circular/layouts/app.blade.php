<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>
        @yield('title')
    </title>

    <link rel="icon" href="{{ asset('/images/KRR.png') }}" type="image/gif" loading=lazy sizes="16x16">

    <!-- Bootstrap -->
    <link rel="stylesheet" type="text/css"
        href="{{ asset('library/Circular/Bootstrap-5.3.2-dist/css/bootstrap.min.css') }}">

    <!-- DataTables -->
    <link rel="stylesheet" type="text/css" href="{{ asset('library/Circular/DataTables/datatables.min.css') }}">

    <!-- Select2 -->
    <link rel="stylesheet" type="text/css" href="{{ asset('library/Circular/Select2/select2.min.css') }}">

    <!-- SweetAlert2 -->
    <link rel="stylesheet" type="text/css" href="{{ asset('library/Circular/SweetAlert2/sweetalert2.min.css') }}">

    <!-- Animate on scroll -->
    <link rel="stylesheet" type="text/css" href="{{ asset('library/Circular/AOS/aos.min.css') }}">

    <!-- Additional CSS Files -->
    <link rel="stylesheet" type="text/css" href="{{ asset('library/Circular/navbar_assets/css/custom.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('library/Circular/navbar_assets/css/font-awesome.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('css/Circular/app.css') }}">

    {{-- https://templatemo.com/tm-540-lava-landing-page --}}

</head>

<body>
    <form action="{{ route('logout') }}" method="post">
        @csrf
        <button id="logout-button-desktop" type="submit" class="btn btn-danger">
            Logout &nbsp; <img src="{{ asset('images/Circular/icons/box-arrow-right.svg') }}" class="me-2"
                alt="Logout Icon">
        </button>
    </form>

    <!-- ***** Header Desktop Start ***** -->
    <header class="header-area header-sticky">
        <div id="header_desktop_container" class="container">
            <div class="row">
                <div class="col-12">
                    <nav class="main-nav">
                        <!-- ***** Logo Start ***** -->
                        {{-- <a href="{{ Request::is('Circular') ? url('/') : url('Circular') }}" class="logo">
                            {{ Request::is('Circular') ? 'Kerta Rajasa Raya' : 'Circular.Net' }}
                        </a> --}}
                        <a href="{{ url('/') }}" class="logo"> {{ 'Kerta Rajasa Raya' }} </a>
                        <!-- ***** Logo End ***** -->
                        <!-- ***** Menu Start ***** -->
                        <ul class="nav">
                            <li class="submenu">
                                <a href="#">Master</a>
                                <ul>
                                    <li>
                                        <a href="/master/formMesinType" class="menu-item">
                                            Maintenance Type Mesin
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/master/formMesinKelompok" class="menu-item">
                                            Maintenance Pengelompokkan Mesin
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/master/formMesinMaster" class="menu-item">
                                            Maintenance Mesin
                                        </a>
                                    </li>
                                    {{-- <li>
                                        <a href="#" class="menu-item seperate-item item-unfinished">
                                            Maintenance Jenis Gangguan
                                        </a>
                                    </li> --}}
                                    <li>
                                        <a href="/master/formKelompokRawat" class="menu-item seperate-item">
                                            Maintenance Pengelompokkan Perawatan
                                        </a>
                                    </li>
                                    {{-- <li>
                                        <a href="#" class="menu-item item-unfinished">
                                            Maintenance Guide Ring
                                        </a>
                                    </li> --}}
                                    <li>
                                        <a href="/master/formKelompokLokasi" class="menu-item">
                                            Maintenance Pengelompokkan Lokasi Mesin
                                        </a>
                                    </li>
                                    {{-- <li>
                                        <a href="#" class="menu-item seperate-item item-unfinished">
                                            Maintenance Mesin Jalan 4 Jam
                                        </a>
                                    </li> --}}
                                    {{-- <li>
                                        <a href="#" class="menu-item seperate-item item-unfinished">
                                            Maintenance Bobin
                                        </a>
                                    </li> --}}
                                </ul>
                            </li>
                            <li class="submenu">
                                <a href="#">Mesin</a>
                                <ul>
                                    <li>
                                        <a href="/SparepartMesin" class="menu-item">
                                            Maintenance Part Mesin
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li class="submenu">
                                <a href="#">Transaksi</a>
                                <ul>
                                    <li>
                                        <a href="/order/formCounterMesin" class="menu-item">
                                            Maintenance Reset Counter per Mesin
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/order/formOrderMaster" class="menu-item seperate-item">
                                            Maintenance Order
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/order/formOrderGudang" class="menu-item">
                                            Maintenance Order Gudang
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/order/formOrderAktif" class="menu-item">
                                            Maintenance Order Mesin yang Aktif
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/order/formOrderStop" class="menu-item">
                                            Maintenance Stop Order
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/order/formJobAssignment" class="menu-item seperate-item">
                                            Penugasan Mesin Terhadap Order
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/order/formKegiatanMesin" class="menu-item seperate-item">
                                            Maintenance Kegiatan Mesin
                                        </a>
                                    </li>
                                    {{-- <li>
                                        <a href="#" class="menu-item item-unfinished">
                                            Maintenance Kode Pegawai
                                        </a>
                                    </li> --}}
                                    {{-- <li>
                                        <a href="#" class="menu-item seperate-item item-unfinished">
                                            Maintenance Afalan Benang
                                        </a>
                                    </li> --}}
                                    {{-- <li>
                                        <a href="#" class="menu-item item-unfinished">
                                            Maintenance Afalan Karung
                                        </a>
                                    </li> --}}
                                    {{-- <li>
                                        <a href="#" class="menu-item item-unfinished">
                                            Proses Afalan
                                        </a>
                                    </li> --}}
                                    {{-- <li>
                                        <a href="#" class="menu-item seperate-item item-unfinished">
                                            Maintenance Jam Gangguan
                                        </a>
                                    </li> --}}
                                    {{-- <li>
                                        <a href="#" class="menu-item item-unfinished">
                                            Maintenance Kwh Meter
                                        </a>
                                    </li> --}}
                                    {{-- <li>
                                        <a href="/proses/formHasilMeter" class="menu-item seperate-item">
                                            Transfer Hasil Meter
                                        </a>
                                    </li> --}}
                                    {{-- <li>
                                        <a href="#" class="menu-item item-unfinished">
                                            Proses Perhitungan Efisiensi
                                        </a>
                                    </li> --}}
                                    {{-- <li>
                                        <a href="#" class="menu-item item-unfinished">
                                            Proses Perhitungan Berat
                                        </a>
                                    </li> --}}
                                    {{-- <li>
                                        <a href="#" class="menu-item item-unfinished">
                                            Proses Pemakaian Benang
                                        </a>
                                    </li> --}}
                                    {{-- <li>
                                        <a href="#" class="menu-item seperate-item">
                                            Proses Cetak Lap. History CIR
                                        </a>
                                    </li> --}}
                                    {{-- <li>
                                        <a href="#" class="menu-item seperate-item item-unfinished">
                                            Pemakaian Benang Fasilitas
                                        </a>
                                    </li> --}}
                                </ul>
                            </li>
                            <li class="submenu">
                                <a href="#">Informasi</a>
                                <ul>
                                    <li>
                                        <a href="/informasi/formInfoHistory" class="menu-item">
                                            Laporan History CIR.
                                        </a>
                                    </li>
                                    {{-- <li>
                                        <a href="#" class="menu-item item-unfinished">
                                            History Gelondongan
                                        </a>
                                    </li> --}}
                                    <li>
                                        <a href="/informasi/formJadwalPotong" class="menu-item seperate-item">
                                            Jadwal Potong
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/informasi/formMesinTidakAktif" class="menu-item">
                                            Mesin Tidak Aktif
                                        </a>
                                    </li>
                                    {{-- <li>
                                        <a href="#" class="menu-item item-unfinished">
                                            Jam Panen
                                        </a>
                                    </li> --}}
                                </ul>
                            </li>
                            {{-- <li class="submenu">
                                <a href="#">Koreksi</a>
                                <ul>
                                    <li><a href="" class="menu-item">Ganti RPM / Shuttle</a></li>
                                    <li><a href="" class="menu-item">Ganti Nama Karyawan</a></li>
                                    <li><a href="" class="menu-item">Ganti Id Order</a></li>
                                    <li><a href="" class="menu-item">Hapus History</a></li>
                                    <li><a href="" class="menu-item">Hapus Kegiatan Mesin</a></li>
                                    <li><a href="" class="menu-item">Jam Kerja</a></li>
                                    <li><a href="" class="menu-item">History Salah</a></li>
                                </ul>
                            </li> --}}
                        </ul>

                        <a class='menu-trigger'>
                            <span>Menu</span>
                        </a>
                        <!-- ***** Menu End ***** -->
                    </nav>
                </div>
            </div>
        </div>
    </header>
    <!-- ***** Header Desktop End ***** -->

    <!-- ***** Header Mobile Start ***** -->
    <nav id="header_mobile" class="navbar bg-body-tertiary fixed-top" style="--bs-bg-opacity: .5;">
        <div class="container-fluid">
            <a href="/" class="logo-mobile">
                Circular.Net
            </a>

            <button id="button-navbar-mobile" class="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                data-bs-target="#mobile_navbar" aria-controls="mobile_navbar" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="offcanvas offcanvas-end" tabindex="-1" id="mobile_navbar"
                aria-labelledby="offcanvasNavbarLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Circular.Net</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas"
                        aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                Master
                            </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <a href="/master/formMesinType" class="dropdown-item">
                                        Maintenance Type Mesin
                                    </a>
                                </li>
                                <li>
                                    <a href="/master/formMesinKelompok" class="dropdown-item">
                                        Maintenance Pengelompokkan Mesin
                                    </a>
                                </li>
                                <li>
                                    <a href="/master/formMesinMaster" class="dropdown-item">
                                        Maintenance Mesin
                                    </a>
                                </li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                {{-- <li>
                                    <a href="/" class="dropdown-item item-unfinished">
                                        Maintenance Jenis Gangguan
                                    </a>
                                </li> --}}
                                <li>
                                    <a href="/master/formKelompokRawat" class="dropdown-item">
                                        Maintenance Pengelompokkan Perawatan
                                    </a>
                                </li>
                                {{-- <li>
                                    <a href="/" class="dropdown-item item-unfinished">
                                        Maintenance Guide Ring
                                    </a>
                                </li> --}}
                                <li>
                                    <a href="/master/formKelompokLokasi" class="dropdown-item">
                                        Maintenance Pengelompokkan Lokasi Mesin
                                    </a>
                                </li>
                                {{-- <li>
                                    <hr class="dropdown-divider">
                                </li> --}}
                                {{-- <li>
                                    <a href="/" class="dropdown-item item-unfinished">
                                        Maintenance Mesin Jalan 4 Jam
                                    </a>
                                </li> --}}
                                {{-- <li>
                                    <hr class="dropdown-divider">
                                </li> --}}
                                {{-- <li>
                                    <a href="/" class="dropdown-item item-unfinished">
                                        Maintenance Bobin
                                    </a>
                                </li> --}}
                            </ul>
                        </li>

                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                Mesin
                            </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <a href="SparepartMesin" class="dropdown-item">
                                        Maintenance Part Mesin
                                    </a>
                                </li>
                            </ul>
                        </li>

                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                Transaksi
                            </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <a href="/order/formCounterMesin" class="dropdown-item">
                                        Maintenance Reset Counter Per Mesin</a>
                                </li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li>
                                    <a href="/order/formOrderMaster" class="dropdown-item">
                                        Maintenance Order
                                    </a>
                                </li>
                                <li>
                                    <a href="/order/formOrderGudang" class="dropdown-item">
                                        Maintenance Order Gudang
                                    </a>
                                </li>
                                <li>
                                    <a href="/order/formOrderAktif" class="dropdown-item">
                                        Maintenance Order Mesin yang Aktif
                                    </a>
                                </li>
                                <li>
                                    <a href="/order/formOrderStop" class="dropdown-item">
                                        Maintenance Order Stop Order
                                    </a>
                                </li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li>
                                    <a href="/order/formJobAssignment" class="dropdown-item">
                                        Maintenance Order Stop Order
                                    </a>
                                </li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li>
                                    <a href="/order/formKegiatanMesin" class="dropdown-item">
                                        Maintenance Kegiatan Mesin
                                    </a>
                                </li>
                                {{-- <li>
                                    <a href="#" class="dropdown-item item-unfinished">
                                        Maintenance Kode Pegawai
                                    </a>
                                </li> --}}
                                {{-- <li>
                                    <hr class="dropdown-divider">
                                </li> --}}
                                {{-- <li>
                                    <a href="#" class="dropdown-item item-unfinished">
                                        Maintenance Afalan Benang
                                    </a>
                                </li> --}}
                                {{-- <li>
                                    <a href="#" class="dropdown-item item-unfinished">
                                        Maintenance Afalan Karung
                                    </a>
                                </li> --}}
                                {{-- <li>
                                    <a href="#" class="dropdown-item item-unfinished">
                                        Proses Afalan
                                    </a>
                                </li> --}}
                                {{-- <li>
                                    <hr class="dropdown-divider">
                                </li> --}}
                                {{-- <li>
                                    <a href="#" class="dropdown-item item-unfinished">
                                        Maintenance Jam Gangguan
                                    </a>
                                </li> --}}
                                {{-- <li>
                                    <a href="#" class="dropdown-item item-unfinished">
                                        Maintenance Kwh Meter
                                    </a>
                                </li> --}}
                                {{-- <li>
                                    <hr class="dropdown-divider">
                                </li> --}}
                                {{-- <li>
                                    <a href="#" class="dropdown-item">
                                        Transfer Hasil Meter
                                    </a>
                                </li> --}}
                                {{-- <li>
                                    <a href="#" class="dropdown-item">
                                        Proses Perhitungan Efisiensi
                                    </a>
                                </li> --}}
                                {{-- <li>
                                    <a href="#" class="dropdown-item">
                                        Proses Perhitungan Berat
                                    </a>
                                </li> --}}
                                {{-- <li>
                                    <a href="#" class="dropdown-item item-unfinished">
                                        Proses Perhitungan Premi
                                    </a>
                                </li> --}}
                                {{-- <li>
                                    <a href="#" class="dropdown-item item-unfinished">
                                        Proses Pembayaran Premi
                                    </a>
                                </li> --}}
                                {{-- <li>
                                    <a href="#" class="dropdown-item item-unfinished">
                                        Proses Pemakaian Benang
                                    </a>
                                </li> --}}
                                {{-- <li>
                                    <hr class="dropdown-divider">
                                </li> --}}
                                {{-- <li>
                                    <a href="#" class="dropdown-item">
                                        Proses Cetak Lap. History CIR
                                    </a>
                                </li> --}}
                                {{-- <li>
                                    <hr class="dropdown-divider">
                                </li> --}}
                                {{-- <li>
                                    <a href="#" class="dropdown-item item-unfinished">
                                        Pemakaian Benang Fasilitas
                                    </a>
                                </li> --}}
                            </ul>
                        </li>

                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                Informasi
                            </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <a class="dropdown-item" href="/informasi/formInfoHistory">
                                        Laporan History CIR.
                                    </a>
                                </li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                {{-- <li>
                                    <a class="dropdown-item" href="#">
                                        History Gelondongan
                                    </a>
                                </li> --}}
                                {{-- <li>
                                    <hr class="dropdown-divider">
                                </li> --}}
                                <li>
                                    <a class="dropdown-item" href="/informasi/formJadwalPotong">
                                        Jadwal Potong
                                    </a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="/informasi/formMesinTidakAktif">
                                        Mesin Tidak Aktif
                                    </a>
                                </li>
                                {{-- <li>
                                    <hr class="dropdown-divider">
                                </li> --}}
                                {{-- <li>
                                    <a class="dropdown-item" href="#">
                                        Jam Panen
                                    </a>
                                </li> --}}
                            </ul>
                            <hr>
                            <form action="{{ route('logout') }}" method="post"
                                class="d-flex justify-content-end mt-3">
                                @csrf
                                <button id="logout-button-mobile" type="submit" class="btn btn-danger">
                                    Logout &nbsp; <img src="{{ asset('images/Circular/icons/box-arrow-right.svg') }}"
                                        class="me-2" alt="Logout Icon">
                                </button>
                            </form>
                        </li>

                        {{-- <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                Koreksi
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Ganti RPM / Shuttle</a></li>
                                <li><a class="dropdown-item" href="#">Ganti Nama Karyawan</a></li>
                                <li><a class="dropdown-item" href="#">Ganti Id Order</a></li>
                                <li><a class="dropdown-item" href="#">Hapus History</a></li>
                                <li><a class="dropdown-item" href="#">Hapus Kegiatan Mesin</a></li>
                                <li><a class="dropdown-item" href="#">Jam Kerja</a></li>
                                <li><a class="dropdown-item" href="#">History Salah</a></li>
                            </ul>
                        </li> --}}
                    </ul>
                    {{-- <form class="d-flex mt-3" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form> --}}
                </div>
            </div>
        </div>
    </nav>
    <!-- ***** Header Mobile End ***** -->

    <!-- ***** Toast Start ***** -->
    @if (session()->has('success') || session()->has('error'))
        <div class="toast-container position-fixed bottom-0 end-0 p-3">
            @if (session()->has('success'))
                <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">
                        <img src="{{ asset('icons/check-circle-fill.svg') }}" class="me-2" alt="Success Icon">
                        <strong class="me-auto">Berhasil!</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="toast"
                            aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                        {{ session('success') }}
                    </div>
                </div>
            @elseif (session()->has('error'))
                <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">
                        <img src="{{ asset('icons/exclamation-circle-fill.svg') }}" class="me-2" alt="Error Icon">
                        <strong class="me-auto">Gagal!</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="toast"
                            aria-label="Close"></button>
                    </div>
                    <div class="toast-body">
                        {!! session('error') !!}
                    </div>
                </div>
            @endif
        </div>
    @endif

    <div class="toast-container position-fixed bottom-0 end-0 p-3 d-none">
        <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" id="myToast">
            <div id="toastHeader" class="toast-header"
                data-success-icon="{{ asset('icons/check-circle-fill.svg') }}"
                data-error-icon="{{ asset('icons/exclamation-circle-fill.svg') }}"
                data-info-icon="{{ asset('icons/info-circle-fill.svg') }}"></div>
            <div class="toast-body">
                <span id="toastText"></span>
            </div>
        </div>
    </div>
    <!-- ***** Toast End ***** -->

    <!-- ***** Main Area Start ***** -->
    <main data-aos="fade-up">
        <div class="container">
            @yield('content')
        </div>
    </main>
    <!-- ***** Main Area End ***** -->

    <!-- ***** Modal Start ***** -->
    <div class="modal fade" id="confirmation_modal" data-bs-backdrop="static" tabindex="-1"
        aria-labelledby="confirmation_modal_label" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 id="cm_title" class="modal-title">Pesan Konfirmasi</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div id="cm_body" class="modal-body">
                    <p>This is the content of the modal.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" id="cm_btn_ya" class="btn btn-primary"
                        data-bs-dismiss="modal">YA</button>
                    <button type="button" id="cm_btn_tidak" class="btn btn-secondary"
                        data-bs-dismiss="modal">TIDAK</button>
                </div>
            </div>
        </div>
    </div>
    <!-- ***** Modal End ***** -->

    <!-- Bootstrap -->
    <script src="{{ asset('library/Circular/Bootstrap-5.3.2-dist/js/bootstrap.bundle.min.js') }}"></script>

    <!-- jQuery -->
    <script src="{{ asset('library/Circular/navbar_assets/js/jquery-2.1.0.min.js') }}"></script>

    <!-- DataTables -->
    <script src="{{ asset('library/Circular/DataTables/datatables.min.js') }}"></script>
    <script src="{{ asset('library/Circular/DataTables/ellipsis.min.js') }}"></script>

    <!-- Select2 -->
    <script src="{{ asset('library/Circular/Select2/select2.min.js') }}"></script>

    <!-- SweetAlert2 -->
    <script src="{{ asset('library/Circular/SweetAlert2/sweetalert2.all.min.js') }}"></script>

    <!-- Animate on scroll -->
    <script src="{{ asset('library/Circular/AOS/aos.min.js') }}"></script>

    <!-- Global Init -->
    <script src="{{ asset('js/Circular/app.js') }}"></script>

    <script src="{{ asset('js/chart.js') }}"></script>
    @yield('custom_js')

</body>

</html>
