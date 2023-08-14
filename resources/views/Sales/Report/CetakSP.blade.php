@extends('layouts.appSales')
@section('content')
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <link href="{{ asset('css/cetakSP.css') }}" rel="stylesheet">
    <link href="{{ asset('css/cetak-sppdf.css') }}" rel="stylesheet" />
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="acs-div-filter">
                    <label for="tanggal_sp">Tanggal:</label>
                    <div class="acs-div-filter3">
                        <input type="date" name="tanggal_sp" id="tanggal_sp" class="input">
                        <button id="lihat_sp" class="btn" style="display: inline-block">Lihat Surat Pesanan</button>
                    </div>
                </div>
                <div class="acs-div-filter1">
                    <label for="no_sp">Nomor SP:</label>
                    <div>
                        <select name="no_spSelect" id="no_spSelect" class="input">
                            <option disabled selected value>-- Pilih Nomor SP --</option>
                            @foreach ($nosp as $data)
                                @if ($data->IDSuratPesanan !== 'NO DATA')
                                    <option value="{{ $data->IDSuratPesanan }}">{{ $data->IDSuratPesanan }} |
                                        {{ $data->NamaCust }}</option>
                                @endif
                            @endforeach
                        </select>
                        <input type="text" name="no_spText" id="no_spText" class="input">
                    </div>
                </div>
                <div class="acs-div-filter2">
                    <label for="jenis_sp">Jenis SP:</label>
                    <input type="text" name="jenis_sp" id="jenis_sp" class="input">
                </div>
                <button id="print_button" class="btn btn-info" style="font-color: white"><span>&#128462;</span> View
                    Print</button>
                <button id="export_pdf" class="btn btn-primary"><span>&#11123;</span> Export PDF</button>
                <button id="print_pdf" class="btn btn-success"><span>&#128438;</span> Print Surat Pesanan</button>
                <hr>
                <label for="contoh_print" id="contoh_print">Contoh Print:</label>
                <div class="acs-div-container" id="contoh_printDiv" style="display: none">

                    <body>
                        <div class="cetak-sppdf-container">
                            <div class="cetak-sppdf-container01">
                                <div class="cetak-sppdf-container02">
                                    <div class="cetak-sppdf-container03">
                                        <div class="cetak-sppdf-container04">
                                            <h2 style="margin-bottom: 0px;font-size:28px">
                                                <span>PT. KERTA RAJASA RAYA</span>
                                            </h2>
                                            <h3 style="margin-bottom: 0px">
                                                <span>WARU - SIDOARJO</span>
                                                <br />
                                            </h3>
                                            <hr style="border:1px solid black;margin-left: 3px;margin: 0px">
                                            <h1 style="font-size: 24px;margin-bottom: 0px">
                                                <span>S U R A T&nbsp; &nbsp;P E S A N A N</span>
                                                <br />
                                            </h1>
                                            <h3>
                                                <span id="nomor_spSpan">No. </span>
                                                <br />
                                            </h3>
                                        </div>
                                        <div class="cetak-sppdf-container05">
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
                                        </div>
                                    </div>
                                    <div class="cetak-sppdf-container06">
                                        <div class="cetak-sppdf-container07">
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>Tanggal Pesanan</td>
                                                        <td>:</td>
                                                        <td id="tgl_pesanKolom"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Nama Langganan</td>
                                                        <td>:</td>
                                                        <td id="nama_customerKolom"></td>
                                                    </tr>
                                                    <tr>
                                                        <td style="white-space: nowrap;vertical-align:top;">Alamat Langganan
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
                                <div class="cetak-sppdf-container08">
                                    <table style="width: 100%;" id="table_sp">
                                        <thead>
                                            <tr>
                                                <th>NO.</th>
                                                <th>TYPE BARANG</th>
                                                <th>KD. BARANG</th>
                                                <th>QUANTITY</th>
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
                                <div class="cetak-sppdf-container09">
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
                                <div class="cetak-sppdf-container10">
                                    <table style="margin-left: 8px">
                                        <tbody>
                                            <tr>
                                                <td style="text-align: center">WIRANIAGA LOKAL</td>
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
                                                <th style="border: none !important;text-align: center;text-decoration: underline;vertical-align:bottom;padding-bottom: 20px;"
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
                    </body>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="{{ asset('js/Sales/CetakSP.js') }}"></script>
@endsection
