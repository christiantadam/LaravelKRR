<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- CSRF Token -->
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <link rel="icon" href="{{ asset('/images/KRR.png') }}" type="image/gif" sizes="16x16">
  {{-- <title style="font-size: 20px">{{ config('app.name', 'Laravel') }}</title> --}}
  <title>@yield('title', 'Workshop')</title>

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

  <!-- TAMBAHAN -->
  <link href="{{ asset('bootstrap-5.3.0-dist/css/bootstrap.min.css') }}" rel="stylesheet">

  <!-- Styles -->
  <link href="{{ asset('css/appWorkshop.css') }}" rel="stylesheet">
  <link href="{{ asset('css/datatables.min.css') }}" rel="stylesheet">
  <link href="{{ asset('css/buttons.dataTables.min.css') }}" rel="stylesheet">
  <link href="{{ asset('css/RdzAndre.css') }}" rel="stylesheet">
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
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <!-- Left Side Of Navbar -->
          {{-- Master --}}
          <ul class="navbar-nav mr-auto RDZNavContenCenter">
            <div class="dropdown">
              <a class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false" style="margin: 10px">
                Master
              </a>
              <ul class="dropdown-menu" style="cursor: default">
                <li>
                  <a href="{{ url('MaintenanceDivisi') }}" class="test"
                    style="padding: 10px;color: black;font-size: 15px;display: block;cursor: pointer"
                    tabindex="-1">Maintenance Divisi</a>
                </li>
                <li>
                  <a href="{{ url('MaintenanceDrafter') }}" class="test"
                    style="padding: 10px;color: black;font-size: 15px;display: block;cursor: pointer"
                    tabindex="-1">Maintenance Drafter</a>
                </li>
                <li>
                  <a href="{{ url('UpdateNoGambar') }}" class="test"
                    style="padding: 10px;color: black;font-size: 15px;display: block;cursor: pointer"
                    tabindex="-1">Update No. Gambar</a>
                </li>
                <li>
                  <a href="{{ url('MaintenanceMesin') }}" class="test"
                    style="padding: 10px;color: black;font-size: 15px;display: block;cursor: pointer"
                    tabindex="-1">Maintenance Mesin</a>
                </li>
              </ul>
            </div>
            {{-- Transaksi --}}
            <div class="dropdown">
              <a class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false" style="margin: 10px">
                Transaksi
              </a>

              <ul class="dropdown-menu" style="cursor: default">
                <li><a href="{{ url('MaintenanceOrderGambar') }}" class="test"
                    style="padding: 10px;color: black;font-size: 15px;display: block;cursor: pointer"
                    tabindex="-1">Maintenance Order Gambar</a>
                </li>
                <li><a href="{{ url('ACCManagerGambar') }}" class="test"
                    style="padding: 10px;color: black;font-size: 15px;display: block;cursor: pointer" tabindex="-1">ACC
                    Manager</a>
                </li>
                <li><a href="{{ url('ACCDirekturGambar') }}" class="test"
                    style="padding: 10px;color: black;font-size: 15px;display: block;cursor: pointer" tabindex="-1">ACC
                    Direktur</a>
                </li>
                <li><a href="{{ url('PenerimaOrderGambar') }}" class="test"
                    style="padding: 10px;color: black;font-size: 15px;display: block;cursor: pointer"
                    tabindex="-1">Penerima Order Gambar</a>
                </li>
                <li><a href="{{ url('ProsesPembeliGambar') }}" class="test"
                    style="padding: 10px;color: black;font-size: 15px;display: block;cursor: pointer"
                    tabindex="-1">Proses Pemberi Gambar</a>
                </li>
                <li><a href="{{ url('StatusOrderGambar') }}" class="test"
                    style="padding: 10px;color: black;font-size: 15px;display: block;cursor: pointer"
                    tabindex="-1">Status Order Gambar</a>
                </li>
                <li><a href="{{ url('MaintenanceKodeGambar') }}" class="test"
                    style="padding: 10px;color: black;font-size: 15px;display: block;cursor: pointer"
                    tabindex="-1">Maintenance Nomor Gambar</a>
                </li>
                <hr style="height:2px;">
                <li><a href="{{ url('MaintenanceOrderKerja') }}" class="test"
                    style="padding: 10px;color: black;font-size: 15px;display: block;cursor: pointer"
                    tabindex="-1">Maintenance Order Kerja</a>
                </li>
                <li><a href="{{ url('ACCManagerKerja') }}" class="test"
                    style="padding: 10px;color: black;font-size: 15px;display: block;cursor: pointer"
                    tabindex="-1">ACC Manager</a>
                </li>
                <li><a href="{{ url('ACCDirekturKerja') }}" class="test"
                    style="padding: 10px;color: black;font-size: 15px;display: block;cursor: pointer"
                    tabindex="-1">ACC Direktur</a>
                </li>
                <li><a href="{{ url('ACCPPIC') }}" class="test"
                    style="padding: 10px;color: black;font-size: 15px;display: block;cursor: pointer"
                    tabindex="-1">ACC PPIC</a>
                </li>
                <li><a href="{{ url('PenerimaOrderKerja') }}" class="test"
                    style="padding: 10px;color: black;font-size: 15px;display: block;cursor: pointer"
                    tabindex="-1">Penerima Order Kerja</a>
                </li>
                <li><a href="{{ url('CetakSuratOrderKerja') }}" class="test"
                    style="padding: 10px;color: black;font-size: 15px;display: block;cursor: pointer"
                    tabindex="-1">Cetak Surat Order Kerja</a>
                </li>
                <li><a href="{{ url('StatusOrderKerja') }}" class="test"
                    style="padding: 10px;color: black;font-size: 15px;display: block;cursor: pointer"
                    tabindex="-1">Status Order Kerja</a>
                </li>
              </ul>
            </div>
            {{-- Proyek --}}
            <div class="dropdown">
              <a class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false" style="margin: 10px">
                Proyek
              </a>
              <ul class="dropdown-menu" style="cursor: default">
                <li><a href="{{ url('MaintenanceOrderProyek') }}" class="test"
                    style="padding: 10px;color: black;font-size: 15px;display: block;cursor: pointer"
                    tabindex="-1">Maintenance Order Proyek</a>
                </li>
                <li><a href="{{ url('ACCManagerProyek') }}" class="test"
                    style="padding: 10px;color: black;font-size: 15px;display: block;cursor: pointer"
                    tabindex="-1">Acc Manager</a>
                </li>
                <li><a href="{{ url('ACCDirekturProyek') }}" class="test"
                    style="padding: 10px;color: black;font-size: 15px;display: block;cursor: pointer"
                    tabindex="-1">Acc Direktur</a>
                </li>
                <li><a href="{{ url('PenerimaOrderProyek') }}" class="test"
                    style="padding: 10px;color: black;font-size: 15px;display: block;cursor: pointer"
                    tabindex="-1">Penerima Order Proyek</a>
                </li>
                <li><a href="{{ url('CetakSuratOrderProyek') }}" class="test"
                    style="padding: 10px;color: black;font-size: 15px;display: block;cursor: pointer"
                    tabindex="-1">Cetak Surat Order Proyek</a>
                </li>
                <li><a href="{{ url('StatusOrderProyek') }}" class="test"
                    style="padding: 10px;color: black;font-size: 15px;display: block;cursor: pointer"
                    tabindex="-1">Status Order Proyek</a>
                </li>
              </ul>
            </div>
            {{-- Informasi --}}
            <div class="dropdown">
              <a class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false" style="margin: 10px">
                Informasi
              </a>
              <ul class="dropdown-menu" style="cursor: default">
                <li><a href="{{ url('OrderGambarSelesai') }}" class="test"
                    style="padding: 10px;color: black;font-size: 15px;display: block;cursor: pointer"
                    tabindex="-1">Order Gambar Yang Selesai</a>
                </li>
                <li><a href="{{ url('OrderKerjaSelesai') }}" class="test"
                    style="padding: 10px;color: black;font-size: 15px;display: block;cursor: pointer"
                    tabindex="-1">Order Kerja Yang Selesai</a>
                </li>
                <li><a href="{{ url('OrderProyekSelesai') }}" class="test"
                    style="padding: 10px;color: black;font-size: 15px;display: block;cursor: pointer"
                    tabindex="-1">Order Proyek Yang Selesai</a>
                </li>
                <li><a href="{{ url('NomorGambar') }}" class="test"
                    style="padding: 10px;color: black;font-size: 15px;display: block;cursor: pointer"
                    tabindex="-1">Nomor Gambar</a>
                </li>
                <li><a href="{{ url('OrderGambar') }}" class="test"
                    style="padding: 10px;color: black;font-size: 15px;display: block;cursor: pointer"
                    tabindex="-1">Order Gambar</a>
                </li>
                <li><a href="{{ url('OrderKerja') }}" class="test"
                    style="padding: 10px;color: black;font-size: 15px;display: block;cursor: pointer"
                    tabindex="-1">Order Kerja</a>
                </li>
                <li><a href="{{ url('OrderProyek') }}" class="test"
                    style="padding: 10px;color: black;font-size: 15px;display: block;cursor: pointer"
                    tabindex="-1">Order Proyek</a>
                </li>

              </ul>
            </div>
          </ul>
          {{-- laporan --}}
          {{-- windows --}}
          {{-- exit --}}
          <!-- Right Side Of Navbar -->
          <!--  -->
          <!-- Authentication Links -->
          <!--  -->
        </div>
      </div>
    </nav>
    {{-- @section('title', 'Laravel') --}}
    <main class="py-4">
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-md-10 RDZMobilePaddingLR0">
              <div class="card">
                      @yield('content')
            </div>
          </div>
        </div>
      </div>
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

<!-- TAMBAHAN -->
<script src="{{ asset('bootstrap-5.3.0-dist/js/bootstrap.bundle.min.js') }}"></script>

</html>
