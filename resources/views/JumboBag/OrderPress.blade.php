@extends('layouts.appJumboBag')
@section('title', 'Order Press')

<link href="{{ asset('css/style.css') }}" rel="stylesheet">
<link href="{{ asset('css/cetakPress.css') }}" rel="stylesheet">
<link href="{{ asset('css/cetak-prspdf.css') }}" rel="stylesheet" />
<link href="{{ asset('css/printPress.css') }}" rel="stylesheet" />

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
                    <div class="card-header">Order Press</div>
                    <div class="card-body">
                        <form id="ReturPenggantiForm" action="{{ route('OrderJahit.store') }}" method="POST">
                            @csrf
                            <div class="form-group">
                                <label for="customer">Customer</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="id_customer" name="id_customer" required>
                                    <input type="text" class="form-control" style="width: 85%"id="customer"
                                        name="customer" required>
                                    <button class="btn" type="button" id="button-customer">...</button>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="kodeBarang">Kode Barang</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="tanggal" name="tanggal" required>
                                    <input type="text" class="form-control" style="width: 85%" id="kodeBarangAsal"
                                        name="kodeBarangAsal" required>
                                    <button class="btn" type="button" id="button-kode-barang">...</button>
                                </div>
                            </div>
                            <div class="form-group">
                                <label style="width: 88%" for="no_suratpesanan">No Surat Pesanan</label>
                                <label for="delivery">Delivery</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" style="width: 80%" id="no_suratpesanan" name="no_suratpesanan"
                                        required>
                                    <input type="text" class="form-control" id="delivery"
                                        name="delivery" required>
                                    <button class="btn" type="button" id="button-pesanan">...</button>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="jumlah_order">Jumlah Order</label>
                                <input type="text" class="form-control" id="jumlah_order" name="jumlah_order"
                                    required>
                            </div>
                            <br>
                            <div class="form-group">
                                <label for="ukuran">Ukuran</label>
                                <input type="text" class="form-control" id="ukuran" name="ukuran"
                                    required>
                            </div>
                            <div class="form-group">
                                <label for="rajutan">Rajutan</label>
                                <input type="text" class="form-control" id="rajutan" name="rajutan"
                                    required>
                            </div>
                            <div class="form-group">
                                <label for="denier">Denier</label>
                                <input type="text" class="form-control" id="denier" name="denier"
                                    required>
                            </div>
                            <div class="form-group">
                                <label for="type">Type</label>
                                <input type="text" class="form-control" id="type" name="type"
                                    required>
                            </div>
                            <hr>
                            <div class="form-group">
                                <label for="warna">Warna</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" id="warna" name="warna" required>
                                    <button class="btn" type="button" id="button-warna">...</button>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="packing">Packing</label>
                                <input type="text" class="form-control" id="packing" name="packing"
                                    required>
                            </div>
                            <div class="form-group">
                                <label for="no_referensi">No Referensi</label>
                                <input type="text" class="form-control" id="no_referensi" name="no_referensi"
                                    required>
                            </div>
                            <div class="form-group">
                                <label for="halaman">Halaman</label>
                                <input type="text" class="form-control" id="halaman" name="halaman"
                                    required>
                            </div>
                            <button type="submit" class="btn btn-primary">View Print</button>
                            <button type="submit" class="btn btn-success">Print</button>
                    </div>
                    </form>
                </div>
                <br>
                <label for="contoh_print" id="contoh_print">Contoh Print:</label>
            <div class="acs-div-container" id="contoh_printDiv">
                <div class="cetak-prspdf-container">
                    <div class="cetak-prspdf-container01">
                        <div class="cetak-prspdf-container02">
                            <div class="cetak-prspdf-container03">
                                <div class="cetak-prspdf-container04">
                                    <h2 style="margin-bottom: 0px;font-size:28px">
                                        <span>PT. KERTA RAJASA RAYA</span>
                                    </h2>
                                    <p style="margin-bottom: 0px;font-size:18px">
                                        <span>Woven Bag - Jumbo Bag Industrial</span>
                                        <br />
                                    </p>
                                    <p style="margin-bottom: 0px;font-size:15px">
                                        <span>No. Dokumen : FM-7.5-02-JB-03-05</span>
                                        <br />
                                    </p>
                                    {{-- <hr style="border:1px solid black;margin-left: 3px;margin: 0px"> --}}
                                    {{-- <h1 style="font-size: 24px;margin-bottom: 0px">
                                        <span>S U R A T&nbsp; &nbsp;P E S A N A N</span>
                                        <br />
                                    </h1>
                                    <h3>
                                        <span id="nomor_spSpan">No. </span>
                                        <br />
                                    </h3> --}}
                                </div>
                                {{-- <div class="cetak-prspdf-container05">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>PO NO</td>
                                                <td>:</td>
                                                <td id="no_poKolom"></td>
                                            </tr>
                                            <tr>
                                                <td>Tanggal PO</td>
                                                <td>:</td>
                                                <td id="tgl_poKolom"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div> --}}
                            </div>
                            <br>
                            <div class="cetak-prspdf-container06">
                                <div class="cetak-prspdf-container07">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>No Referensi</td>
                                                <td>:</td>
                                                <td id="tgl_pesanKolom"></td>
                                            </tr>
                                            <tr>
                                                <td>Tanggal</td>
                                                <td>:</td>
                                                <td id="nama_customerKolom"></td>
                                            </tr>
                                            <tr>
                                                <td style="white-space: nowrap;vertical-align:top;">Halaman
                                                </td>
                                                <td style="vertical-align:top;">:</td>
                                                <td id="alamat_kantorKolom"></td>
                                            </tr>
                                            <tr>
                                                <td style="vertical-align:top;">Alamat Kirim</td>
                                                <td style="vertical-align:top;">:</td>
                                                <td id="alamat_kirimKolom"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <br>
                        <div class="centered-text-container">
                            <h1 style="margin-bottom: 0px;font-size:23px;">
                                <span>ORDER PRESS JUMBO BAG</span>
                            </h1>
                        </div>
                        <div class="cetak-prspdf-container08">
                            <table style="width: 100%;" id="table_sp">
                                <thead>
                                    <tr>
                                        <th>Kodes
                                            <br>
                                            Ukuran      :
                                            <br>
                                            Rajutan     :
                                            <br>
                                            Denier      :
                                            <br>
                                            Warna       :
                                            <br>
                                            Inner       :
                                        </th>
                                        {{-- <th>TYPE BARANG</th>
                                        <th>KD. BARANG</th>
                                        <th>QUANTITY</th> --}}
                                    </tr>
                                </thead>
                                <tbody>
                                    {{-- <tr class="acs-table-border">
                                                <td id="nomor_barangKolom">d</td>
                                                <td class="acs-table-border" id="nama_barangKolom">c</td>
                                                <td class="acs-table-border" id="kode_barangKolom">b</td>
                                                <td class="acs-table-border" id="quantity_barangKolom">a</td>
                                            </tr> --}}
                                </tbody>
                                {{-- ini harus di-loop sesuai data pesanan --}}
                            </table>
                        </div>
                        <div class="cetak-prspdf-container09">
                            <table>
                                <tr>
                                    <td>Jenis Bayar</td>
                                    <td>:</td>
                                    <td id="jenis_bayarKolom"></td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td style="white-space: nowrap;">Syarat Bayar</td>
                                    <td>:</td>
                                    <td id="syarat_bayarKolom"></td>
                                </tr>
                                <tr>
                                    <td style="white-space: nowrap;vertical-align:top;">Rencana Kirim</td>
                                    <td style="vertical-align:top;">:</td>
                                    <td style="white-space: nowrap;vertical-align:top;" id="rencana_kirimKolom">
                                    </td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td style="vertical-align:top;">Keterangan</td>
                                    <td style="vertical-align:top;">:</td>
                                    <td id="keterangan_kolom">
                                    </td>
                                </tr>
                                <tr>

                                </tr>
                                <tr>

                                </tr>
                            </table>
                        </div>
                        <div class="cetak-prspdf-container10">
                            <table style="margin-left: 8px">
                                <tbody>
                                    <tr>
                                        <td style="text-align: center; white-space: nowrap">WIRANIAGA LOKAL</td>
                                        <td>&nbsp; &nbsp;</td>
                                        <td style="text-align: center">MANAGER</td>
                                        <td>&nbsp; &nbsp;</td>
                                        <td style="text-align: center">DIREKTUR</td>
                                        <td>&nbsp; &nbsp;</td>
                                        <td style="text-align: center">PPIC</td>
                                        <td>&nbsp; &nbsp;</td>
                                        <td>Lembar Ke:</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>

                                        </td>
                                    </tr>
                                    <tr>
                                        <th style="border: none !important;text-align: center;text-decoration: underline;vertical-align:bottom;padding-bottom: 20px;white-space: nowrap"
                                            id="nama_salesKolom">
                                            ADAM CHRISTIANTO</th>
                                        <th style="border: none !important;text-align: center"></th>
                                        <th
                                            style="border: none !important;text-align: center;vertical-align:bottom;padding-bottom: 20px;">
                                            ______________________</th>
                                        <th style="border: none !important;text-align: center"></th>
                                        <th
                                            style="border: none !important;text-align: center;vertical-align:bottom;padding-bottom: 20px;">
                                            _______________________</th>
                                        <th style="border: none !important;text-align: center"></th>
                                        <th
                                            style="border: none !important;text-align: center;vertical-align:bottom;padding-bottom: 20px;">
                                            _______________________</th>
                                        <th style="border: none !important;text-align: center"></th>
                                        <td style="border: none !important;">1. Putih - Produksi <br>
                                            2. Merah - QC <br>
                                            3. Kuning - Adm. Piutang <br>
                                            4. Hijau - Arsip Pemasaran</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    </div>
    </div>

    <script src="{{ asset('js/JumboBag/OrderPress.js') }}"></script>
@endsection
