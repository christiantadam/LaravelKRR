<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">

    <title>
        @yield('title')
    </title>
    <meta content="" name="description">
    <meta content="" name="keywords">

    <!-- Vendor CSS Files -->
    <link href="{{ asset('vendor/aos/aos.css') }}" rel="stylesheet">
    <link href="{{ asset('vendor/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ asset('vendor/bootstrap-icons/bootstrap-icons.css') }}" rel="stylesheet">
    <link href="{{ asset('css/datatables.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/buttons.dataTables.min.css') }}" rel="stylesheet">
    <link href="{{ asset('vendor/select2/select2.min.css') }}" rel="stylesheet">

    <!-- Vendor JS Files -->
    <script src="{{ asset('vendor/aos/aos.js') }}"></script>
    <script src="{{ asset('vendor/bootstrap/js/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ asset('js/jquery-3.7.0.min.js') }}"></script>
    <script src="{{ asset('js/datatables.min.js') }}"></script>
    <script src="{{ asset('vendor/select2/select2.min.js') }}"></script>

    <!-- Template Main CSS File -->
    <link href="{{ asset('css/extruder_style.css') }}" rel="stylesheet">
</head>

<body>
    <!-- ======= Header ======= -->
    <header id="header" class="d-flex align-items-center justify-content-center">
        @if ($pageName == 'WarehouseTerima' && $formName == 'index')
            <div class="container d-flex justify-content-between" style="margin: 0px;">
            @else
                <div class="container d-flex justify-content-between">
        @endif

        <div id="logo">
            @if ($pageName == 'index')
                <h1><a href="#">Kerta Rajasa Raya</a></h1>
            @elseif($pageName == 'WarehouseTerima' && $formName == 'index')
                <h1></h1>
            @elseif($formName == 'formBeratWoven')
                <h1><a href="#">Berat Woven</a></h1>
            @elseif($formName == 'formBeratJumbo')
                <h1><a href="#">Berat Jumbo</a></h1>
            @elseif($formName == 'formBeratADStar')
                <h1><a href="#">Berat AD Star</a></h1>
            @elseif($formName == 'formBeratCircular')
                <h1><a href="#">Berat Circular</a></h1>
            @elseif($formName == 'formBeratAssesoris')
                <h1><a href="#">Berat Assesoris</a></h1>
            @elseif($formName == 'formUpdatePersen')
                <h1><a href="#">Update Persen Toleransi BS</a></h1>
            @elseif($formName == 'formBeratWoven2')
                <h1><a href="#">Berat Woven 2</a></h1>
            @elseif($formName == 'formBeratJumbo2')
                <h1><a href="#">Berat Jumbo 2</a></h1>
            @elseif($formName == 'formBeratADStar2')
                <h1><a href="#">Berat AD Star 2</a></h1>
            @elseif($formName == 'formBeratCircular2')
                <h1><a href="#">Berat Circular 2</a></h1>
            @elseif($formName == 'formBeratAssesoris2')
                <h1><a href="#">Berat Assesoris 2</a></h1>
            @elseif($formName == 'formKomposisiKonversi')
                <h1><a href="#">Komposisi Konversi</a></h1>
            @elseif($formName == 'formKonversiKg')
                <h1><a href="#">Konversi dalam Kg</a></h1>
            @elseif($formName == 'formKonversiBarang')
                <h1><a href="#">Konversi Barang</a></h1>
            @elseif($formName == 'formKomposisiTropodo')
                <h1><a href="#">Maintenance Komposisi Bahan Tropodo</a></h1>
            @elseif($formName == 'formKomposisiMojosari' && $formData['namaGedung'] == 'D')
                <h1><a href="#">Maintenance Komposisi Bahan Mojosari Gedung D</a></h1>
            @elseif($formName == 'formKomposisiMojosari')
                <h1><a href="#">Maintenance Komposisi Bahan Mojosari</a></h1>
            @elseif($formName == 'formKiteMaster')
                <h1><a href="#">Master KITE</a></h1>
            @elseif($formName == 'formKiteEstimasi')
                <h1><a href="#">Estimasi KITE</a></h1>
            @elseif($formName == 'formOrderMaintenance' && $formData['namaGedung'] == 'B')
                <h1><a href="#">Maintenance Order Mojosari Gedung B</a></h1>
            @elseif($formName == 'formOrderMaintenance' && $formData['namaGedung'] == 'D')
                <h1><a href="#">Maintenance Order Mojosari Gedung D</a></h1>
            @elseif($formName == 'formOrderMaintenance')
                <h1><a href="#">Maintenance Order</a></h1>
            @elseif($formName == 'formOrderACC' && $formData['namaGedung'] == 'B')
                <h1><a href="#">ACC Order Mojosari Gedung B</a></h1>
            @elseif($formName == 'formOrderACC' && $formData['namaGedung'] == 'D')
                <h1><a href="#">ACC Order Mojosari Gedung D</a></h1>
            @elseif($formName == 'formOrderACC')
                <h1><a href="#">ACC Order</a></h1>
            @elseif($formName == 'formOrderStatus' && $formData['namaGedung'] == 'B')
                <h1><a href="#">Pembatalan Order Mojosari Gedung B</a></h1>
            @elseif($formName == 'formOrderStatus' && $formData['namaGedung'] == 'D')
                <h1><a href="#">Pembatalan Order Mojosari Gedung D</a></h1>
            @elseif($formName == 'formOrderStatus')
                <h1><a href="#">Pembatalan Order</a></h1>
            @elseif($formName == 'formKonversiMohon' && $formData['namaGedung'] == 'B')
                <h1><a href="#">Permohonan Konversi Mojosari Gedung B</a></h1>
            @elseif($formName == 'formKonversiMohon' && $formData['namaGedung'] == 'D')
                <h1><a href="#">Permohonan Konversi Mojosari Gedung D</a></h1>
            @elseif($formName == 'formKonversiMohon')
                <h1><a href="#">Permohonan Konversi</a></h1>
            @elseif($formName == 'formKonversiACC' && $formData['namaGedung'] == 'B')
                <h1><a href="#">ACC Konversi Mojosari Gedung B</a></h1>
            @elseif($formName == 'formKonversiACC' && $formData['namaGedung'] == 'D')
                <h1><a href="#">ACC Konversi Mojosari Gedung D</a></h1>
            @elseif($formName == 'formKonversiACC')
                <h1><a href="#">ACC Konversi</a></h1>
            @elseif($formName == 'formBenangMohon' && $formData['namaGedung'] == 'D')
                <h1><a href="#">Permohonan Konversi NG Mojosari Gedung D</a></h1>
            @elseif($formName == 'formBenangMohon')
                <h1><a href="#">Permohonan Konversi NG</a></h1>
            @elseif($formName == 'formBenangACC' && $formData['namaGedung'] == 'D')
                <h1><a href="#">ACC Konversi NG Mojosari Gedung D</a></h1>
            @elseif($formName == 'formBenangACC')
                <h1><a href="#">ACC Konversi NG</a></h1>
            @elseif($formName == 'formCatatGangguan')
                <h1><a href="#">Pencatatan Gangguan Produksi</a></h1>
            @elseif($formName == 'formCatatDaya')
                <h1><a href="#">Pencatatan Daya Produksi</a></h1>
            @elseif($formName == 'formCatatEffisiensi')
                <h1><a href="#">Pencatatan Effisiensi</a></h1>
            @elseif($formName == 'formCatatPerawatan')
                <h1><a href="#">Pencatatan Perawatan</a></h1>
            @elseif($formName == 'formScanGelondongan')
                <h1><a href="#">Scan Kirim Barcode Gelondongan</a></h1>
            @elseif($formName == 'formBatalGelondongan')
                <h1><a href="#">Batal Kirim Barcode Gelondongan</a></h1>
            @elseif($formName == 'formScanAssesoris')
                <h1><a href="#">Scan Kirim Barcode Assesoris</a></h1>
            @elseif($formName == 'formBatalAssesoris')
                <h1><a href="#">Batal Kirim Barcode Assesoris</a></h1>
            @elseif($formName == 'formScanKRR2')
                <h1><a href="#">Scan Kirim Barcode Kerta 2</a></h1>
            @elseif($formName == 'formBatalKRR2')
                <h1><a href="#">Batal Kirim Barcode Kerta 2</a></h1>
            @elseif($formName == 'formTerimaKRR2')
                <h1><a href="#">Terima JBN-JBK-JBJ-JBL</a></h1>
            @elseif($formName == 'formStokSetengah')
                <h1><a href="#">Kirim KRR2</a></h1>
            @elseif($formName == 'formCekBarcode')
                <h1><a href="#">Cek Barcode</a></h1>
            @elseif($formName == 'formTerimaPeletan')
                <h1><a href="#">Terima Barang Peletan</a></h1>
            @elseif($formName == 'formGagalPeletan')
                <h1><a href="#">Tidak Tersimpan Peletan</a></h1>
            @else
                <h1><a href="/home">Kerta Rajasa Raya</a></h1>
            @endif
        </div>

        <nav id="navbar" class="navbar">

            @if ($formName == 'index')
                <div id="navbar_full" class="">
                    @if ($pageName == 'BeratKomposisi') {{-- Ini bisa diganti --}}
                        <ul>
                            <li class="dropdown">
                                <a href="#"><span>Berat Standar</span> <i class="bi bi-chevron-down"></i></a>
                                <ul>
                                    <li><a href="/Extruder/BeratKomposisi/formBeratWoven">Berat
                                            Woven</a></li>
                                    <li><a href="/Extruder/BeratKomposisi/formBeratJumbo">Berat
                                            Jumbo</a></li>
                                    <li><a href="/Extruder/BeratKomposisi/formBeratADStar">Berat AD
                                            Star</a>
                                    </li>
                                    <li><a href="/Extruder/BeratKomposisi/formBeratCircular">Berat
                                            Gelondongan / Woven Kraft</a></li>
                                    <li><a href="/Extruder/BeratKomposisi/formBeratAssesoris">Berat
                                            Assesoris</a>
                                    </li>
                                    <li><a href="/Extruder/BeratKomposisi/formUpdatePersen">Update
                                            Persen Toleransi BS</a></li>
                                </ul>
                            </li>
                            <li><a href="/Extruder/BeratKomposisi/formKomposisiKonversi">Komposisi
                                    Konversi</a></li>
                            <li class="dropdown">
                                <a href="#"><span>Berat Standar 2</span> <i class="bi bi-chevron-down"></i></a>
                                <ul>
                                    <li><a href="/Extruder/BeratKomposisi/formBeratWoven2">Berat
                                            Woven</a></li>
                                    <li><a href="/Extruder/BeratKomposisi/formBeratJumbo2">Berat
                                            Jumbo</a></li>
                                    <li><a href="/Extruder/BeratKomposisi/formBeratADStar2">Berat AD
                                            Star</a>
                                    </li>
                                    <li><a href="/Extruder/BeratKomposisi/formBeratCircular2">Berat
                                            Gelondongan / Woven Kraft</a></li>
                                    <li><a href="/Extruder/BeratKomposisi/formBeratAssesoris2">Berat
                                            Assesoris</a>
                                    </li>
                                </ul>
                            </li>
                            <li><a href="/Extruder/BeratKomposisi/formKonversiKg">Konversi Kg</a></li>
                            <li><a href="/Extruder/BeratKomposisi/formKonversiBarang">Konversi</a>
                            </li>
                            <li><a href="/Extruder">Keluar</a></li>
                        </ul>
                    @elseif($pageName == 'ExtruderNet'){{-- Ini bisa diganti --}}
                        <ul>
                            <li class="dropdown">
                                <a href="#"><span>Master</span> <i class="bi bi-chevron-down"></i></a>
                                <ul>
                                    <li><a href="/Extruder/ExtruderNet/Master/formKomposisiTropodo">Maintenance
                                            Komposisi Bahan Tropodo</a></li>
                                    <li><a href="/Extruder/ExtruderNet/Master/formKomposisiMojosari">Maintenance
                                            Komposisi Bahan Mojosari</a></li>
                                    <li><a href="/Extruder/ExtruderNet/Master/formKomposisiMojosari/D">Maintenance
                                            Komposisi Bahan Gedung D Mojosari</a>
                                    </li>
                                    <li class="dropdown"><a href="#"><span>KITE</span> <i
                                                class="bi bi-chevron-right"></i></a>
                                        <ul>
                                            <li><a href="/Extruder/ExtruderNet/Master/formKiteMaster">Master</a></li>
                                            <li><a href="/Extruder/ExtruderNet/Master/formKiteEstimasi">Estimasi</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li class="dropdown">
                                <a href="#"><span>Transaksi Tropodo</span> <i
                                        class="bi bi-chevron-down"></i></a>
                                <ul>
                                    <li class="dropdown">
                                        <a href="#"><span>Order</span> <i class="bi bi-chevron-right"></i></a>
                                        <ul>
                                            <li><a href="/Extruder/ExtruderNet/Order/formOrderMaintenance">Maintenance
                                                    Order Extruder</a></li>
                                            <li><a href="/Extruder/ExtruderNet/Order/formOrderACC">ACC
                                                    Order</a></li>
                                            <li><a href="/Extruder/ExtruderNet/Order/formOrderStatus">Maintenance
                                                    Status
                                                    Order</a></li>
                                        </ul>
                                    </li>
                                    <li class="dropdown">
                                        <a href="#"><span>Konversi</span> <i
                                                class="bi bi-chevron-right"></i></a>
                                        <ul>
                                            <li><a href="/Extruder/ExtruderNet/Konversi/formKonversiMohon">Permohonan
                                                    Konversi
                                                    Barang</a></li>
                                            <li><a href="/Extruder/ExtruderNet/Konversi/formKonversiACC">ACC
                                                    Permohonan
                                                    Konversi</a></li>
                                        </ul>
                                    </li>
                                    <li class="dropdown">
                                        <a href="#"><span>Sortir Benang NG</span>
                                            <i class="bi bi-chevron-right"></i></a>
                                        <ul>
                                            <li><a href="/Extruder/ExtruderNet/Benang/formBenangMohon">Permohonan
                                                    Sortir
                                                    Benang NG</a></li>
                                            <li><a href="/Extruder/ExtruderNet/Benang/formBenangACC">ACC Sortir
                                                    Benang
                                                    NG</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="/Extruder/ExtruderNet/Catat/formCatatGangguan">Pencatatan
                                            Gangguan
                                            Produksi</a>
                                    <li><a href="/Extruder/ExtruderNet/Catat/formCatatDaya">Pencatatan
                                            KwaH
                                            Produksi</a>
                                    <li><a href="/Extruder/ExtruderNet/Catat/formCatatEffisiensi">Pencatatan
                                            Effisiensi</a>
                                    <li><a href="/Extruder/ExtruderNet/Catat/formCatatPerawatan">Perawatan</a>
                                </ul>
                            </li>
                            <li class="dropdown">
                                <a href="#"><span>Transaksi Gedung B MJS</span> <i
                                        class="bi bi-chevron-down"></i></a>
                                <ul>
                                    <li class="dropdown">
                                        <a href="#"><span>Order</span> <i class="bi bi-chevron-right"></i></a>
                                        <ul>
                                            <li><a href="/Extruder/ExtruderNet/Order/formOrderMaintenance/B">Maintenance
                                                    Order Extruder</a></li>
                                            <li><a href="/Extruder/ExtruderNet/Order/formOrderACC/B">ACC Order</a></li>
                                            <li><a href="/Extruder/ExtruderNet/Order/formOrderStatus/B">Maintenance
                                                    Status
                                                    Order</a></li>
                                        </ul>
                                    </li>
                                    <li class="dropdown">
                                        <a href="#"><span>Konversi</span> <i
                                                class="bi bi-chevron-right"></i></a>
                                        <ul>
                                            <li><a href="/Extruder/ExtruderNet/Konversi/formKonversiMohon/B">Permohonan
                                                    Konversi
                                                    Barang</a></li>
                                            <li><a href="/Extruder/ExtruderNet/Konversi/formKonversiACC/B">ACC
                                                    Permohonan
                                                    Konversi</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li class="dropdown">
                                <a href="#"><span>Transaksi Gedung D MJS</span> <i
                                        class="bi bi-chevron-down"></i></a>
                                <ul>
                                    <li class="dropdown">
                                        <a href="#"><span>Order</span> <i class="bi bi-chevron-right"></i></a>
                                        <ul style="transition: 0.3s; left: -75%;">
                                            <li><a href="/Extruder/ExtruderNet/Order/formOrderMaintenance/D">Maintenance
                                                    Order Extruder</a></li>
                                            <li><a href="/Extruder/ExtruderNet/Order/formOrderACC/D">ACC Order</a>
                                            </li>
                                            <li><a href="/Extruder/ExtruderNet/Order/formOrderStatus/D">Maintenance
                                                    Status
                                                    Order</a></li>
                                        </ul>
                                    </li>
                                    <li class="dropdown">
                                        <a href="#"><span>Konversi</span> <i
                                                class="bi bi-chevron-right"></i></a>
                                        <ul style="transition: 0.3s; left: -75%;">
                                            <li><a href="/Extruder/ExtruderNet/Konversi/formKonversiMohon/D">Permohonan
                                                    Konversi
                                                    Barang</a></li>
                                            <li><a href="/Extruder/ExtruderNet/Konversi/formKonversiACC/D">ACC
                                                    Permohonan
                                                    Konversi</a></li>
                                        </ul>
                                    </li>
                                    <li class="dropdown">
                                        <a href="#"><span>Sortir Benang NG</span>
                                            <i class="bi bi-chevron-right"></i></a>
                                        <ul style="transition: 0.3s; left: -75%;">
                                            <li><a href="/Extruder/ExtruderNet/Benang/formBenangMohon/D">Permohonan
                                                    Sortir
                                                    Benang NG</a></li>
                                            <li><a href="/Extruder/ExtruderNet/Benang/formBenangACC/D">ACC Sortir
                                                    Benang
                                                    NG</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="#">Pencatatan Gangguan Produksi</a>
                                    <li><a href="#">Pencatatan KwaH Produksi</a>
                                    <li><a href="#">Pencatatan Efisiensi</a>
                                    <li><a href="#">Perawatan</a>
                                </ul>
                            </li>
                            <li><a href="/Extruder">Keluar</a></li>
                        </ul>
                    @elseif($pageName == 'WarehouseTerima'){{-- Ini bisa diganti --}}
                        <ul class="warehouse" style="border: black solid 3px;">
                            <li><a href="/Extruder/WarehouseTerima/formScanGelondongan">Scan
                                    Kirim<br>Gelondongan</a>
                            </li>
                            <li><a href="/Extruder/WarehouseTerima/formBatalGelondongan">Batal
                                    Kirim<br>Gelondongan</a>
                            </li>
                            <li><a href="/Extruder/WarehouseTerima/formScanAssesoris">Scan
                                    Kirim<br>Assesoris</a></li>
                            <li><a href="/Extruder/WarehouseTerima/formBatalAssesoris">Batal
                                    Kirim<br>Assesoris</a>
                            </li>
                            <li><a href="/Extruder/WarehouseTerima/formScanKRR2">Scan
                                    Kirim<br>KRR2</a></li>
                            <li><a href="/Extruder/WarehouseTerima/formBatalKRR2">Batal
                                    Kirim<br>KRR2</a></li>
                            <li><a href="/Extruder/WarehouseTerima/formCekBarcode">Cek<br>Barcode</a>
                            </li>
                            <li><a href="/Extruder/WarehouseTerima/formTerimaKRR2">Terima<br>KRR2</a>
                            </li>
                            <li><a href="/Extruder/WarehouseTerima/formStokSetengah">Stok<br>Setengah
                                    Jadi</a></li>
                            <li><a href="/Extruder/WarehouseTerima/formTerimaPeletan">Scan
                                    Terima<br>Peletan</a></li>
                            <li><a href="/Extruder/WarehouseTerima/formGagalPeletan">Gagal
                                    Terima<br>Peletan</a></li>
                            <li><a href="/Extruder">Keluar</a></li>
                        </ul>
                    @endif
                </div>
            @else
                <div id="navbar_exit">
                    @if ($pageName == 'BeratKomposisi')
                        <ul>
                            <li><a href="/Extruder/BeratKomposisi">Keluar</a></li>
                        </ul>
                    @elseif($pageName == 'ExtruderNet')
                        <ul>
                            <li><a href="/Extruder/ExtruderNet">Keluar</a></li>
                        </ul>
                    @elseif($pageName == 'WarehouseTerima')
                        <ul>
                            <li><a href="/Extruder/WarehouseTerima">Keluar</a></li>
                        </ul>
                    @endif
                </div>
            @endif

        </nav><!-- .navbar -->

        </div>
    </header><!-- End Header -->

    <!-- Modal -->
    <div class="modal fade" id="confirmation_modal" tabindex="-1" data-toggle="modal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5">Pesan Konfirmasi</h1>
                    <button type="button" id="btn_close_md" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div id="modal_body" class="modal-body">
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" id="btn_cancel_md" class="btn btn-secondary"
                        data-bs-dismiss="modal">Batal</button>
                    <button type="button" id="btn_confirm_md" class="btn btn-primary"
                        data-bs-dismiss="modal"></button>
                </div>
            </div>
        </div>
    </div>
    <!-- End Modal -->

    <!-- Template Main JS File -->
    <script src="{{ asset('js/Extruder/extruder_main.js') }}"></script>

    <main id="main">
        <div class="container">
            @yield('content')
        </div>
    </main><!-- End #main -->
</body>

</html>
