<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Title and Logo -->
    <link rel="icon" href="{{ asset('/images/KRR.png') }}" type="image/gif" sizes="16x16">
    <title style="font-size: 20px">@yield('title', 'Home Sales')</title>

    <!-- Scripts -->
    <script src="{{ asset('js/jquery-3.5.1.js') }}"></script>
    <script src="{{ asset('js/jquery-3.2.1.js') }}"></script>
    <script src="{{ asset('js/bootstrap-3.3.7.min.js') }}"></script>
    {{-- <script src='{{ asset('js/dataTables.select-1.6.2.min.js') }}'></script> --}}
    <script src="{{ asset('js/app.js') }}"></script>
    <script src="{{ asset('js/datatables.min.js') }}"></script>
    <script src="{{ asset('js/datatablesSumApi.js') }}"></script>
    <script src="{{ asset('js/jquery-1.12.1.dataTables.min.js') }}"></script>
    <script src="{{ asset('js/jquery-dateformat.js') }}"></script>
    <script src="{{ asset('js/RDZ.js') }}"></script>
    <script src="{{ asset('js/sweetalert2.all.min.js') }}"></script>
    <script src="{{ asset('js/numeral.min.js') }}"></script>
    <script src="{{ asset('js/User.js') }}"></script>

    <!-- Fonts -->
    {{-- <link rel="dns-prefetch" href="//fonts.gstatic.com"> --}}
    <link href="{{ asset('css/FontsGoogleapisIconFamilyMaterialIcons.css') }}" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/sweetalert2.min.css') }}">
    <link href="{{ asset('css/datatables.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/buttons.dataTables.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/Rdz.css') }}" rel="stylesheet">
    <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous"> -->
    <link rel="stylesheet" href="{{ asset('css/FontsGoogleMaterialIcons.css') }}">
    <link rel="stylesheet" href="{{ asset('css/fonts.googleapis.MaterialSymbolsOutlined.css') }}" />
</head>

<body onload="Greeting()">
    <div id="app">
        <nav class="navbar navbar-expand-md navbar-light bg-white shadow sticky-top">
            <div class="container col-md-12">
                <a class="navbar-brand RDZNavBrandCenter RDZUnderLine" href="{{ url('/') }}">
                    🡰 <img src="{{ asset('/images/KRR.png') }}" width="55" height="50" alt="KRR">
                    {{-- {{ config('app.name', 'Laravel') }} --}}
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
                            @foreach ($access['AccessMenu'] as $menuItem)
                                @php
                                    $print = 0;
                                    $cekSubMenuPrint = 0;
                                @endphp
                                @if ($menuItem->Parent_IdMenu === null)
                                    @php
                                        $print = 1;
                                    @endphp
                                    <div class="dropdown">
                                        <a class="dropdown-toggle" type="button" id="dropdownMenuButton"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                            style="margin: 10px">
                                            {{ $menuItem->NamaMenu }}
                                        </a>
                                @endif
                                @foreach ($access['AccessMenu'] as $cekSubMenu)
                                    @if ($menuItem->IdMenu == $cekSubMenu->Parent_IdMenu)
                                        <ul class="dropdown-menu" style="cursor: default;">
                                            @php
                                                $cekSubMenuPrint = 1;
                                            @endphp
                                        @break
                                @endif
                            @endforeach
                            @foreach ($access['AccessMenu'] as $secondMenuItem)
                                @php
                                    $printSecond = 0;
                                @endphp
                                @if ($secondMenuItem->Parent_IdMenu !== null && $secondMenuItem->Parent_IdMenu == $menuItem->IdMenu)
                                    @php
                                        $printSecond = 1;
                                    @endphp
                                    <li>
                                        <a class="" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                                            aria-haspopup="true" aria-expanded="false"
                                            style="margin: 10px;cursor: default;">
                                            {{ $secondMenuItem->NamaMenu }} &raquo;
                                        </a>
                                @endif
                                @if ($printSecond == 1)
                                    <ul class="dropdown-menu dropdown-submenu">
                                        @foreach ($access['AccessFitur'] as $secondSubMenuItem)
                                            @if ($secondSubMenuItem->Id_Menu === $secondMenuItem->IdMenu && $printSecond == 1)
                                                <li>
                                                    <a style="color: black;font-size: 15px;display: block"
                                                        class="dropdown-item" tabindex="-1"
                                                        href="{{ url($secondSubMenuItem->Route) }}">{{ $secondSubMenuItem->NamaFitur }}
                                                    </a>
                                                </li>
                                            @endif
                                        @endforeach
                                    </ul>
                                    </li>
                                @endif
                            @endforeach
                            @if ($cekSubMenuPrint == 1)
                                @foreach ($access['AccessFitur'] as $subMenuItem)
                                    @if ($subMenuItem->Id_Menu === $menuItem->IdMenu)
                                        <li>
                                            <a style="color: black;font-size: 15px;display: block" class="dropdown-item"
                                                tabindex="-1"
                                                href="{{ url($subMenuItem->Route) }}">{{ $subMenuItem->NamaFitur }}
                                            </a>
                                        </li>
                                    @endif
                                @endforeach
                    </ul>
                    @endif
                    {{-- @php
                        echo "<script>console.log('Menu: " . $menuItem->NamaMenu . " ".$print." ".$printSecond." ".$cekSubMenuPrint."');</script>"; //untuk debugging, jangan dihapus
                    @endphp --}}
                    @if ($print == 1 && $printSecond == 0 && $cekSubMenuPrint == 0)
                        <ul class="dropdown-menu">
                            @foreach ($access['AccessFitur'] as $subMenuItem)
                                @if ($subMenuItem->Id_Menu === $menuItem->IdMenu)
                                    <li>
                                        <a style="color: black;font-size: 15px;display: block" class="dropdown-item"
                                            tabindex="-1"
                                            href="{{ url($subMenuItem->Route) }}">{{ $subMenuItem->NamaFitur }}
                                        </a>
                                    </li>
                                @endif
                            @endforeach
                        </ul>
                </div>
                @endif
                @endforeach
                </ul>

                {{-- <ul class="navbar-nav mr-auto RDZNavContenCenter">
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
                                        </ul>
                                    </li>
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
                        </ul> --}}
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
                    <div style="border-right: 1px solid;margin-right: 5px;padding-right: 5px;" class="NameWindows">
                        <p style="font-size: 15px;display: block;margin-bottom: 0px;"><label id="greeting1"></label>,
                            {{ Auth::user()->NamaUser }}</p> {{-- bisa dikasih profile --}}
                    </div>
                    <li><a class="RDZlogout" style="color: black;font-size: 15px;display: block;"
                            href="{{ route('logout') }}"
                            onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                            {{ __('Logout') }}
                        </a>

                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                            @csrf
                        </form>
                    </li>
                </ul>
            @endguest

        </div>
</div>
</nav>
{{-- <nav>
        <ul class="navbar">
            <li><a href="#">Home</a></li>
            <li class="dropdown">
                <a href="#" class="dropbtn">Services</a>
                <div class="dropdown-content">
                    <a href="#">Service 1</a>
                    <a href="#">Service 2</a>
                    <div class="dropdown-submenu">
                        <a href="#">Service 3</a>
                        <div class="dropdown-submenu-content">
                            <a href="#">Subservice 1</a>
                            <a href="#">Subservice 2</a>
                        </div>
                    </div>
                </div>
            </li>
            <li><a href="#">About</a></li>
            <li class="dropdown">
                <a href="#" class="dropbtn">Products</a>
                <div class="dropdown-content">
                    <a href="#">Product 1</a>
                    <a href="#">Product 2</a>
                    <div class="dropdown-submenu">
                        <a href="#">Product 3</a>
                        <div class="dropdown-submenu-content">
                            <a href="#">Subproduct 1</a>
                            <a href="#">Subproduct 2</a>
                        </div>
                    </div>
                </div>
            </li>
            <li><a href="#">Contact</a></li>
        </ul>
    </nav> --}}



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
{{-- <style>
    /* Navbar styles */
    .navbar {
        list-style-type: none;
        margin: 0;
        padding: 0;
        background-color: #f1f1f1;
        display: flex;
    }

    .navbar li {
        float: left;
    }

    .navbar li a {
        display: block;
        color: #333;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
    }

    .navbar li a:hover {
        background-color: #ddd;
    }

    /* Dropdown menu styles */
    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    }

    .dropdown-content a {
        color: #333;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
        text-align: left;
    }

    .dropdown:hover .dropdown-content {
        display: block;
    }

    /* Submenu styles */
    .dropdown-submenu {
        position: relative;
    }

    .dropdown-submenu .dropdown-submenu-content {
        display: none;
        position: absolute;
        top: 0;
        left: 100%;
        min-width: 160px;
        margin-top: -30px;
        /* Adjust the vertical alignment */
        z-index: 1;
        /* Ensure the submenu appears above the parent menu */
    }

    .dropdown-submenu:hover>.dropdown-submenu-content {
        display: block;
    }

    .dropdown-submenu .dropdown-submenu-content .dropdown-submenu-content {
        top: 0;
        left: 100%;
        margin-top: -30px;
        /* Adjust the vertical alignment */
        margin-left: -160px;
        /* Adjust the horizontal alignment */
    }

    /* Adjusted styles for submenu and sub-submenu items */
    .dropdown-content>.dropdown-submenu .dropdown-submenu-content a {
        padding-left: 30px;
        /* Add indentation for submenus */
    }

    .dropdown-content>.dropdown-submenu .dropdown-submenu-content .dropdown-submenu-content a {
        padding-left: 60px;
        /* Increase indentation for sub-submenus */
    }
</style> --}}

</html>
