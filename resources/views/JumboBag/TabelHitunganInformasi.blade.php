@extends('layouts.appJumboBag')
@section('title', 'Tabel Hitungan')

<link href="{{ asset('css/printTHI.css') }}" rel="stylesheet">

@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <script>
                let successMessage = '';
                let errorMessage = '';
            </script>
            @if (Session::has('success'))
                <script>
                    successMessage = "{{ Session::get('success') }}";
                </script>
            @elseif (Session::has('error'))
                <script>
                    errorMessage = "{{ Session::get('error') }}";
                </script>
            @endif
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Tabel Hitungan</div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="customer" style="width: 51%">Customer</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="id_customer" name="id_customer"
                                            required>
                                        <input type="text" class="form-control" style="width: 70%" id="customer"
                                            name="customer" required>
                                        <button class="input" type="button" id="btn_customer"
                                            style="border-radius: 5px; width: 5%; cursor: pointer; border: 1px solid black;">...</button>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="Ukuran">Ukuran&nbsp;&nbsp;<span style="font-style: italic;">(Panjang
                                            BB X Lebar BB X Diameter BB X Tinggi BB)</span></label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="ukuran" name="ukuran" required>
                                        <button class="input" type="button" id="btn_ukuran"
                                            style="border-radius: 5px; width: 5%; cursor: pointer; border: 1px solid black;">...</button>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="kodeBarang">Kode Barang</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="tanggal" name="tanggal"
                                            style="width: 10%" required>
                                        <input type="text" class="form-control" style="width: 70%" id="kodeBarangAsal"
                                            name="kodeBarangAsal" required>
                                        <button class="input" type="button" id="btn_kodebarang"
                                            style="border-radius: 5px; width: 5%; cursor: pointer; border: 1px solid black;">...</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="tanggals" style="width: 50%">Tanggal Update</label>
                                    <div class="input-group">
                                        <input type="date" class="form-control" id="tanggalu" name="tanggalu" required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="User">User</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="user" name="user" required>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <h4>Body</h4>
                                    <label for="body" style="width: 16%">Bentuk</label>
                                    <label for="body" style="width: 15%">Model</label>
                                    <label for="body">
                                        <span style="font-style: italic;">Circular/Square</span> Dimensi
                                    </label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="bentuk_body" name="bentuk_body"
                                            required>
                                        <input type="text" class="form-control" id="model_body" name="model_body"
                                            required>
                                        <input type="text" class="form-control" style="width: 50%" id="dimensi_body"
                                            name="dimensi_body" required>
                                        <button class="input" type="button" id="btn_body"
                                            style="border-radius: 5px; width: 5%; cursor: pointer; border: 1px solid black;">...</button>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <h4>Cerobong Atas</h4>
                                    <label for="ca" style="width: 16%">Bentuk</label>
                                    <label for="ca" style="width: 15%">Model</label>
                                    <label for="ca">
                                        <span style="font-style: italic;">Circular/Square</span> Dimensi
                                    </label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="bentuk_ca" name="bentuk_ca"
                                            required>
                                        <input type="text" class="form-control" id="model_ca" name="model_ca"
                                            required>
                                        <input type="text" class="form-control" style="width: 50%" id="dimensi_ca"
                                            name="dimensi_ca" required>
                                        <button class="input" type="button" id="btn_ca"
                                            style="border-radius: 5px; width: 5%; cursor: pointer; border: 1px solid black;">...</button>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <h4>Cerobong Bawah</h4>
                                    <label for="cb" style="width: 16%">Bentuk</label>
                                    <label for="cb" style="width: 15%">Model</label>
                                    <label for="cb">
                                        <span style="font-style: italic;">Circular/Square</span> Dimensi
                                    </label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="bentuk_cb" name="bentuk_cb"
                                            required>
                                        <input type="text" class="form-control" id="model_cb" name="model_cb"
                                            required>
                                        <input type="text" class="form-control" style="width: 50%" id="dimensi_cb"
                                            name="dimensi_cb" required>
                                        <button class="input" type="button" id="btn_cb"
                                            style="border-radius: 5px; width: 5%; cursor: pointer; border: 1px solid black;">...</button>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="Swl" style="width: 50%">SWL</label>
                                    <label for="Sf1" style="width: 25%">SF1</label>
                                    <label for="Sf2">SF2</label>
                                    <div class="input-group" style="display: flex; align-items: center; gap: 10px;">
                                        <input style="width: 28%" type="text" class="form-control" id="swl"
                                            name="swl" required>
                                        <input type="text" class="form-control" id="sf1" name="sf1"
                                            required>
                                        <input type="text" class="form-control" id="sf2" name="sf2"
                                            required>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <h4 style="visibility: hidden;">Body</h4>
                                    <label for="body" style="width: 25%">Panjang</label>
                                    <label for="body" style="width: 24%">Diameter</label>
                                    <label for="body" style="width: 24%">Lebar</label>
                                    <label for="body">Tinggi</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="panjang_body" name="panjang_body"
                                            required>
                                        <input type="text" class="form-control" id="diameter_body"
                                            name="diameter_body" required>
                                        <input type="text" class="form-control" id="lebar_body" name="lebar_body"
                                            required>
                                        <input type="text" class="form-control" id="tinggi_body" name="tinggi_body"
                                            required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <h4 style="visibility: hidden;">Cerobong Atas</h4>
                                    <label for="ca" style="width: 25%">Panjang</label>
                                    <label for="ca" style="width: 24%">Diameter</label>
                                    <label for="ca" style="width: 24%">Lebar</label>
                                    <label for="ca">Tinggi</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="panjang_ca" name="panjang_ca"
                                            required>
                                        <input type="text" class="form-control" id="diameter_ca" name="diameter_ca"
                                            required>
                                        <input type="text" class="form-control" id="lebar_ca" name="lebar_ca"
                                            required>
                                        <input type="text" class="form-control" id="tinggi_ca" name="tinggi_ca"
                                            required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <h4 style="visibility: hidden;">Cerobong Bawah</h4>
                                    <label for="cb" style="width: 25%">Panjang</label>
                                    <label for="cb" style="width: 24%">Diameter</label>
                                    <label for="cb" style="width: 24%">Lebar</label>
                                    <label for="cb">Tinggi</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="panjang_cb" name="panjang_cb"
                                            required>
                                        <input type="text" class="form-control" id="diameter_cb" name="diameter_cb"
                                            required>
                                        <input type="text" class="form-control" id="lebar_cb" name="lebar_cb"
                                            required>
                                        <input type="text" class="form-control" id="tinggi_cb" name="tinggi_cb"
                                            required>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div>
                            <table id="tabel" class="table">
                                <thead>
                                    <tr>
                                        <th>Nama Customer</th>
                                        <th>Kode Barang</th>
                                        <th>Panjang</th>
                                        <th>Lebar B</th>
                                        <th>Tinggi B</th>
                                        <th>Diameter</th>
                                        <th>Model BB</th>
                                        <th>Model CA</th>
                                        <th>Model CB</th>
                                        <th style="width: ">Warna</th>
                                        <th>SWL</th>
                                        <th>SF1</th>
                                        <th>SF2</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                        <hr>
                        <div style="display: flex; justify-content: center;">
                            <button id="btn_cari" class="btn btn-primary"
                                style="margin-right: 20px; width:100px">Cari</button>
                            <button id="btn_clear" class="btn btn-warning"
                                style="margin-right: 20px; width:100px">Clear</button>
                            <button id="btn_print" class="btn btn-success" style="width:100px">Print</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="acs-div-container" id="contoh_printDiv">
        <div class="cetak-prspdf-container">
            <div class="cetak-prspdf-container01">
                <div class="cetak-prspdf-container02">
                    <div class="row">
                        <div style="padding-top: 3px"
                            class="col-sm-7 d-flex align-items-center justify-content-center bordered">
                            <div>
                                <h1 style="margin: 0" class="text-center">PT. KERTA RAJASA RAYA</h1>
                                <div class="text-center">
                                    <h4> Woven Bag - Jumbo Bag Industrial<br>
                                        No. Dokumen : FM-7.2-02-JB-01-01</h4>
                                </div>
                            </div>

                        </div>
                        <div class="col-sm-5 d-flex align-items-center justify-content-center bordered">
                            <div class="row">
                                <div class="col-4">No. Referensi</div>
                                <div class="col-1">:</div>
                                <div class="col-7">
                                    <span id="no_referensi_print">0</span>
                                </div>
                                <div class="col-4">Tangal</div>
                                <div class="col-1">:</div>
                                <div class="col-7">
                                    <span id="tanggal_print"></span>
                                </div>
                                <div class="col-4">Halaman</div>
                                <div class="col-1">:</div>
                                <div class="col-7">
                                    <span id="halaman_print">...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="centered-text-container">
                    <h1 style="margin-bottom: 0px;font-size:23px;">
                        <span>TABEL HITUNGAN PERSIAPAN</span>
                    </h1>
                </div>
                <div class="cetak-prspdf-container08">
                    <table style="width: 100%;border-collapse: collapse; border: 1px solid black;" id="table_ket">
                        <thead>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="border:none !important; border-right: 1px solid black !important"
                                    id="nomor_barangKolom">&nbsp;TANGGAL</td>
                                <td style="border:none !important; width: 78%" id="tanggal_tabel">&nbsp;c</td>
                            </tr>
                            <tr>
                                <td style="border:none !important; border-right: 1px solid black !important"
                                    id="nomor_barangKolom">&nbsp;CUSTOMER</td>
                                <td style="border:none !important" id="customer_tabel">&nbsp;c
                                </td>
                            </tr>
                            <tr>
                                <td style="border:none !important; border-right: 1px solid black !important"
                                    id="nomor_barangKolom">&nbsp;UKURAN</td>
                                <td style="border:none !important" id="ukuran_tabel">&nbsp;c
                                </td>
                            </tr>
                            <tr>
                                <td style="border:none !important; border-right: 1px solid black !important"
                                    id="nomor_barangKolom">&nbsp;MODEL</td>
                                <td style="border:none !important" id="model_tabel">&nbsp;c
                                </td>
                            </tr>
                            <tr>
                                <td style="border:none !important; border-right: 1px solid black !important"
                                    id="nomor_barangKolom">&nbsp;REINFORCED</td>
                                <td style="border:none !important" id="reinforced_tabel">&nbsp;c
                                </td>
                            </tr>
                            <tr>
                                <td style="border:none !important; border-right: 1px solid black !important"
                                    id="nomor_barangKolom">&nbsp;SWL</td>
                                <td style="border:none !important" id="swl_tabel">&nbsp;c
                                </td>
                            </tr>
                            <tr>
                                <td style="border:none !important; border-right: 1px solid black !important"
                                    id="nomor_barangKolom">&nbsp;SF</td>
                                <td style="border:none !important" id="sf_tabel">&nbsp;c
                                </td>
                            </tr>
                            <tr>
                                <td style="border:none !important; border-right: 1px solid black !important"
                                    id="nomor_barangKolom">&nbsp;BERAT KAIN / M</td>
                                <td style="border:none !important" id="berat_tabel">&nbsp;c
                                </td>
                            </tr>
                            <tr>
                                <td style="border:none !important; border-right: 1px solid black !important"
                                    id="nomor_barangKolom">&nbsp;TYPE / JNS BARANG</td>
                                <td style="border:none !important" id="type_tabel">&nbsp;c</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <br>
                <div class="cetak-prspdf-container08 bordered">
                    <table style="width: 100%" id="tableHitung">
                        <thead>
                            <tr>
                                <td
                                    style="width: 350px;text-align: center !important; border:none !important; border-top: 1px solid black !important; border-left: 1px solid black !important;border-right: 1px solid black !important">
                                    KOMPONEN</td>
                                <td colspan="2"
                                    style="border:none !important; border-bottom: 1px solid black !important; border-top: 1px solid black !important; text-align: center; border-right: 1px solid black !important">
                                    POTONGAN
                                </td>
                                <td colspan="2"
                                    style="border:none !important; border-bottom: 1px solid black !important; border-top: 1px solid black !important; text-align: center; border-right: 1px solid black !important">
                                    RAJUTAN
                                </td>
                                <td
                                    style="text-align: center !important; border:none !important; border-top: 1px solid black !important;">
                                    DENIER</td>
                                <td
                                    style="text-align: center !important; border:none !important; border-top: 1px solid black !important; border-left: 1px solid black !important">
                                    QTY</td>
                                <td
                                    style="text-align: center !important; border:none !important; border-top: 1px solid black !important; border-left: 1px solid black !important">
                                    BERAT</td>
                                <td
                                    style="text-align: center !important; border:none !important; border-top: 1px solid black !important; border-left: 1px solid black !important">
                                    HARGA / (KG)</td>
                                <td
                                    style="text-align: center !important; border:none !important; border-top: 1px solid black !important; border-left: 1px solid black !important;border-right: 1px solid black !important">
                                    HARGA</td>
                            </tr>
                            <tr>
                                <td
                                    style="border:none !important; border-right: 1px solid black !important; border-left: 1px solid black !important;border-bottom: 1px solid black !important">
                                </td>
                                <td style="text-align: center !important; width: 70px">&nbsp;P</td>
                                <td style="text-align: center !important; width: 70px">&nbsp;L</td>
                                <td style="text-align: center !important; width: 60px">Warp</td>
                                <td style="text-align: center !important; width: 60px">Weft</td>
                                <td style="border:none !important;border-bottom: 1px solid black !important">
                                </td>
                                <td
                                    style="border:none !important; border-left: 1px solid black !important;border-bottom: 1px solid black !important">
                                </td>
                                <td
                                    style="border:none !important; border-left: 1px solid black !important;border-bottom: 1px solid black !important">
                                </td>
                                <td
                                    style="border:none !important; border-left: 1px solid black !important;border-bottom: 1px solid black !important">
                                </td>
                                <td
                                    style="border:none !important; border-right: 1px solid black !important; border-left: 1px solid black !important;border-bottom: 1px solid black !important">
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td
                                    style="text-align: center !important; border:none !important; border-left: 1px solid black !important;border-right: 1px solid black !important; border-bottom: 1px solid black !important">
                                    &nbsp;TOTAL</td>
                                <td colspan="6" id="potonganP_oj"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="berat_total"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="hargakg_total"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                                <td id="harga_total"
                                    style="text-align: center !important; border-top:none !important; border-left:none !important;">
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <br>
                <div class="cetak-prspdf-container08">
                    <table style="width: 100%">
                        <tr>
                            <td style="text-align: left !important; border:none !important;">
                                &nbsp;CATATAN :</td>
                            <td id="catatan_tabel"
                                style="width: 900px;text-align: left !important; border:none !important;">
                            </td>
                        </tr>
                    </table>
                </div>
                <br>
                <div class="cetak-prspdf-container08">
                    <table style="width: 100%">
                        <tr>
                            <td
                                style="width: 25%; text-align: center !important; border-top: 1px solid black; border-bottom:none !important">
                                ACC TABEL HITUNGAN</td>
                            <td id="acc_th"
                                style="text-align: center !important; border-top: 1px solid black; border-bottom:none !important">
                                &nbsp;</td>
                            <td
                                style="width: 25%; text-align: center !important; border-top: 1px solid black; border-bottom:none !important">
                                GAMBAR</td>
                            <td id="id_th"
                                style="text-align: center !important; border-top: 1px solid black; border-bottom:none !important">
                                &nbsp;</td>
                        </tr>
                        <tr>
                            <td style="width: 25%; text-align: center !important; border-left: 1px solid black">
                                &nbsp;</td>
                            <td style="text-align: center !important;">
                                &nbsp;</td>
                            <td style="width: 25%; text-align: center !important;">
                                &nbsp;</td>
                            <td style="text-align: center !important; border-right: 1px solid black">
                                &nbsp;</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
    </div>

    <script src="{{ asset('js/JumboBag/TabelHitunganInformasi.js') }}"></script>
@endsection
