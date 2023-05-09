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
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/datatables.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/buttons.dataTables.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/Rdz.css') }}" rel="stylesheet">
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
                    <img src="{{ asset('/images/KRR.png') }}" width="55" height="50" alt="KRR">
                    {{ config('app.name', 'Laravel') }}
                </a>
                @guest
                @else
                    <div class="NameAndroid RDZNavBrandCenter" style="display:none;padding-top: 5px;">
                        <p style="font-size: 15px;display: block;margin-bottom: 0px;text-align:center"><label
                                id="greeting"></label>, {{ Auth::user()->NamaUser }}</p>
                    </div>
                    <br>
                    <button class="navbar-toggler RDZNavBrandCenter" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="{{ __('Toggle navigation') }}">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                @endguest

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    @guest
                    @else
                        <ul class="navbar-nav mr-auto RDZNavContenCenter">
                            <div class="dropdown">
                                <a class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false" style="margin: 10px">
                                    Master
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a style="margin: 10px;color: black;font-size: 15px;display: block" tabindex="-1"
                                            href="{{ url('Customer') }}">Customer</a></li>
                                    <li><a style="margin: 10px;color: black;font-size: 15px;display: block" tabindex="-1"
                                            href="{{ url('Billing') }}">Billing</a></li>
                                    <li><a style="margin: 10px;color: black;font-size: 15px;display: block" tabindex="-1"
                                            href="{{ url('Expeditor') }}">Expeditor</a></li>
                                </ul>
                            </div>
                            <div class="dropdown">
                                <a class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false" style="margin: 10px">
                                    Transaksi
                                </a>
                                <ul class="dropdown-menu" style="cursor: default">
                                    <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                            tabindex="-1">Surat Pesanan &raquo;</a>

                                        <ul class="dropdown-menu dropdown-submenu">
                                            <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                    tabindex="-1" href="{{ url('SuratPesanan/create') }}">Permohonan</a>
                                            </li>
                                            <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                    tabindex="-1" href="{{ url('SuratPesananManager') }}">ACC Manager</a>
                                            </li>
                                            <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                    tabindex="-1"
                                                    href="{{ url('SuratPesananManager/penyesuaian/suratpesanan') }}">Penyesuaian
                                                    SP</a></li>
                                        </ul>
                                    </li>

                                    <li><a class="test"
                                            style="margin: 10px;color: black;font-size: 15px;display: block;cursor: default"
                                            tabindex="-1">Delivery Order &raquo;</a>

                                        <ul class="dropdown-menu dropdown-submenu">
                                            <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                    tabindex="-1" href="{{ url('DeliveryOrder/create') }}">Permohonan
                                                    DO</a></li>
                                            <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                    tabindex="-1" href="{{ url('DeliveryOrderManager') }}">ACC DO</a>
                                            </li>
                                            <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                    tabindex="-1"
                                                    href="{{ url('DeliveryOrderManager/BatalDo/index') }}">Batal DO</a>
                                            </li>
                                        </ul>
                                    </li>

                                    <li><a class="test"style="margin: 10px; color: black;font-size: 15px;display: block;cursor: default"
                                            tabindex="-1">Surat Jalan &raquo;</a>
                                        <ul class="dropdown-menu dropdown-submenu">
                                            <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                    tabindex="-1" href="{{ url('SuratJalan/create') }}">Mohon SJ</a>
                                            </li>
                                            <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                    tabindex="-1"
                                                    href="{{ url('SuratJalanManager') }}">ACCPermohonan</a>
                                            </li>
                                            <hr style="height:2px;">
                                            <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                    tabindex="-1" href="{{ url('PascaKirim') }}">Pasca Kirim</a></li>
                                            <hr style="height: 2px;">
                                        </ul>
                                    </li>

                                    {{-- <li><a class="test"style="margin: 10px;color: black;font-size: 15px;display: block"
                                            tabindex="-1" href="#">Retur &raquo;</a>
                                        <ul class="dropdown-menu dropdown-submenu">
                                            <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                    tabindex="-1" href="#">Mohon Retur</a></li>
                                            <li><a style="margin: 10px;color: black;font-size: 15px;display: block"
                                                    tabindex="-1" href="#">ACC Retur</a></li>
                                        </ul>
                                    </li> --}}
                                </ul>
                            </div>
                            <div class="dropdown">
                                <a class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false" style="margin: 10px">
                                    Report
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a style="margin: 10px;color: black;font-size: 15px;display: block" tabindex="-1"
                                            href=" {{ url('CetakSP') }}">Cetak SP</a></li>
                                    <li><a style="margin: 10px;color: black;font-size: 15px;display: block" tabindex="-1"
                                            href=" {{ url('CetakDO') }}">Cetak DO</a></li>
                                    <li><a style="margin: 10px;color: black;font-size: 15px;display: block" tabindex="-1"
                                            href=" {{ url('CetakSJ') }}">Cetak SJ</a></li>
                                    <li><a style="margin: 10px;color: black;font-size: 15px;display: block" tabindex="-1"
                                            href="#">Cetak BonKas</a></li>
                                </ul>
                            </div>
                            <div class="dropdown">
                                <a class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false" style="margin: 10px">
                                    Tool Penjualan
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a style="margin: 10px;color: black;font-size: 15px;display: block" tabindex="-1"
                                            href="{{ url('CariBarcode') }}">Cari Barcode</a></li>
                                    <li><a style="margin: 10px;color: black;font-size: 15px;display: block" tabindex="-1"
                                            href="{{ url('BarcodeKerta2') }}">Barcode Kerta2</a></li>
                                    <li><a style="margin: 10px;color: black;font-size: 15px;display: block" tabindex="-1"
                                            href="{{ url('GantiRPM') }}">Ganti RPM</a></li>
                                    <li><a style="margin: 10px;color: black;font-size: 15px;display: block" tabindex="-1"
                                            href="{{ url('HapusCIR') }}">Hapus CIR</a></li>
                                    <li><a style="margin: 10px;color: black;font-size: 15px;display: block" tabindex="-1"
                                            href="{{ url('BatalJual') }}">Batal Jual</a></li>
                                    <li><a style="margin: 10px;color: black;font-size: 15px;display: block" tabindex="-1"
                                            href="{{ url('PenjualanBarcode') }}">Penjualan Barcode</a></li>
                                    <li><a style="margin: 10px;color: black;font-size: 15px;display: block" tabindex="-1"
                                            href="{{ url('PenjualanNyangkut') }}">Penjualan Nyangkut</a></li>
                                    <li><a style="margin: 10px;color: black;font-size: 15px;display: block" tabindex="-1"
                                            href="{{ url('SetengahJadiNyangkut') }}">Setengah Jadi Nyangkut</a></li>
                                </ul>
                            </div>
                            <div class="dropdown">
                                <a class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false" style="margin: 10px">
                                    Penjualan
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a style="margin: 10px;color: black;font-size: 15px;display: block" tabindex="-1"
                                            href="{{ url('ScanBarcode') }}">Scan Barcode</a></li>
                                    <li><a style="margin: 10px;color: black;font-size: 15px;display: block" tabindex="-1"
                                            href="{{ url('ScanBarcode') }}">Barcode Jual</a></li>
                                    <li><a style="margin: 10px;color: black;font-size: 15px;display: block" tabindex="-1"
                                            href="{{ url('AccPenjualan') }}">Acc Penjualan</a></li>
                                    <li><a style="margin: 10px;color: black;font-size: 15px;display: block" tabindex="-1"
                                            href="{{ url('AccPenjualanCloth') }}">Acc Penjualan Cloth</a></li>
                                </ul>
                            </div>
                            {{-- <div class="dropdown">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                        style="margin: 10px">
                                        Penjualan
                                    </button>
                                    <div class="btn-group dropright">
                                        <button type="button" class="btn btn-secondary dropdown-toggle"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Dropright
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <li style="margin: 10px;"><a style="color: black;font-size: 15px;display: block"
                                                    href="/sales">ACC Pengiriman</a></li>
                                        </div>
                                    </div>
                                </div> --}}
                        </ul>
                    @endguest
                    <!-- Right Side Of Navbar -->

                    <!-- Authentication Links -->
                    @guest
                    @else
                        <ul class="navbar-nav ml-auto">
                            {{-- <li class="nav-item dropdown">
                                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                    {{ Auth::user()->NamaUser }} <span class="caret"></span>
                                </a>

                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="{{ route('logout') }}"
                                        onclick="event.preventDefault();
                                            document.getElementById('logout-form').submit();">
                                        {{ __('Logout') }}
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST"
                                        style="display: none;">
                                        @csrf
                                    </form>
                                </div>
                            </li> --}}
                            <div style="border-right: 1px solid;margin-right: 5px;padding-right: 5px;"
                                class="NameWindows">
                                <p style="font-size: 15px;display: block;margin-bottom: 0px;"><label
                                        id="greeting1"></label>,
                                    {{ Auth::user()->NamaUser }}</p> {{-- bisa dikasih profile --}}
                            </div>
                            <li><a class="RDZlogout" style="color: black;font-size: 15px;display: block;"
                                    href="{{ route('logout') }}"
                                    onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                    {{ __('Logout') }}
                                </a>

                                <form id="logout-form" action="{{ route('logout') }}" method="POST"
                                    style="display: none;">
                                    @csrf
                                </form>
                            </li>
                        </ul>
                    @endguest

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
