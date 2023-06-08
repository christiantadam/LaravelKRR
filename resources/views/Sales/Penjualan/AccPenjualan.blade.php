@extends('layouts.appSales')
@section('content')
    <script>
        let data = {!! json_encode($data) !!};
    </script>
    <link href="{{ asset('css/AccPenjualan.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @elseif (Session::has('error'))
                    <div class="alert alert-danger">
                        {{ Session::get('error') }}
                    </div>
                @endif
                <div class="card">
                    <div class="card-header">Acc Penjualan</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0 acs-table-barcode" id="div_tableBarcode">
                        <div style="overflow: auto">
                            <table id="table_AccPenjualan" class="table table-bordered table-striped">
                                <thead class="thead-dark">
                                    <tr>
                                        <th>Id Transaksi</th>
                                        <th>Id Type</th>
                                        <th>Nama Type</th>
                                        <th>Primer</th>
                                        <th>Sekunder</th>
                                        <th>Tritier</th>
                                        <th>Kode Barang</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <form class="acs-div-form" method="POST" action="{{ url('AccPenjualan') }}" id="form_accJualBarcode">
                        {{ csrf_field() }}
                        <div class="acs-div-form2">
                            <div class="acs-div-form3">
                                <div class="acs-div-filter1">
                                    <label for="divisi">Divisi</label>
                                    <input type="text" name="divisi" id="divisi" class="input" readonly>
                                </div>
                                <div class="acs-div-filter1">
                                    <label for="objek">Objek</label>
                                    <input type="text" name="objek" id="objek" class="input" readonly>
                                </div>
                                <div class="acs-div-filter1">
                                    <label for="kelompok_utama">Kelompok Utama</label>
                                    <input type="text" name="kelompok_utama" id="kelompok_utama" class="input" readonly>
                                </div>
                                <div class="acs-div-filter1">
                                    <label for="kelompok">Kelompok</label>
                                    <input type="text" name="kelompok" id="kelompok" class="input" readonly>
                                </div>
                                <div class="acs-div-filter1">
                                    <label for="sub_kelompok">Sub Kelompok</label>
                                    <input type="text" name="sub_kelompok" id="sub_kelompok" class="input" readonly>
                                </div>
                            </div>
                            <div class="acs-div-form3" style="border: 1px solid grey; margin:3%; padding:1%">
                                <legend>Saldo</legend>
                                <div class="acs-div-filter1">
                                    <label for="saldo_primer">Primer</label>
                                    <div style="display: flex; flex-direction: row; gap: 3%">
                                        <input type="text" name="saldo_primer" id="saldo_primer" class="input" readonly>
                                        <input type="text" name="saldo_primerSatuan" id="saldo_primerSatuan"
                                            class="input" style="width: 25%" readonly>
                                    </div>
                                </div>
                                <div class="acs-div-filter1">
                                    <label for="saldo_sekunder">Sekunder</label>
                                    <div style="display: flex; flex-direction: row; gap: 3%">
                                        <input type="text" name="saldo_sekunder" id="saldo_sekunder" class="input"
                                            readonly>
                                        <input type="text" name="saldo_sekunderSatuan" id="saldo_sekunderSatuan"
                                            class="input" style="width: 25%" readonly>
                                    </div>
                                </div>
                                <div class="acs-div-filter1">
                                    <label for="saldo_tritier">Tritier</label>
                                    <div style="display: flex; flex-direction: row; gap: 3%">
                                        <input type="text" name="saldo_tritier" id="saldo_tritier" class="input"
                                            readonly>
                                        <input type="text" name="saldo_tritierSatuan" id="saldo_tritierSatuan"
                                            class="input" style="width:25%" readonly>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="acs-div-form2">
                            <div class="acs-div-form3">
                                <div class="acs-div-filter1">
                                    <label for="divisi">Id Transaksi</label>
                                    <input type="text" name="id_transaksi" id="id_transaksi" class="input" readonly>
                                </div>
                                <div class="acs-div-filter1">
                                    <label for="id_type">Id Type</label>
                                    <input type="text" name="id_type" id="id_type" class="input" readonly>
                                </div>
                                <div class="acs-div-filter1">
                                    <label for="nama_barang">Nama Barang</label>
                                    <input type="text" name="nama_barang" id="nama_barang" class="input" readonly>
                                </div>
                            </div>
                            <div class="acs-div-form3">
                                <div class="acs-div-filter1">
                                    <label for="nama_customer">Nama Customer</label>
                                    <input type="text" name="nama_customer" id="nama_customer" class="input"
                                        readonly>
                                </div>
                                <div class="acs-div-filter1">
                                    <label for="no_sp">No SP</label>
                                    <input type="text" name="no_sp" id="no_sp" class="input" readonly>
                                </div>
                                <div class="acs-div-filter1">
                                    <label for="tgl_mohonDO">Tanggal Mohon DO</label>
                                    <input type="date" name="tgl_mohonDO" id="tgl_mohonDO" class="input" readonly>
                                </div>
                            </div>
                            <div class="acs-div-form3"
                                style="border: 1px solid grey; margin:3%; padding:1%; width: fit-content">
                                <div class="acs-div-filter3">
                                    <label for="max_do">Max DO</label>
                                    <div style="display: flex; flex-direction: row; gap: 3%">
                                        <input type="text" name="max_do" id="max_do" class="input acs-input" readonly>
                                        <input type="text" name="max_doSatuan" id="max_doSatuan" class="input acs-input1" readonly>
                                    </div>
                                </div>
                                <div class="acs-div-filter3">
                                    <label for="min_do">Min DO</label>
                                    <div style="display: flex; flex-direction: row; gap: 3%">
                                        <input type="text" name="min_do" id="min_do" class="input acs-input" readonly>
                                        <input type="text" name="min_doSatuan" id="min_doSatuan" class="input acs-input1" readonly>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="acs-div-form2">

                            <div class="acs-div-form3" style="margin: 10px">
                                <div>
                                    <span>Jumlah Dikeluarkan</span>
                                </div>
                                <div style="display: flex; flex-direction: row;gap: 2%">
                                    <div class="acs-div-filter1">
                                        <div style="display: flex; flex-direction: row; gap: 3%">
                                            <label for="saldo_primerDikeluarkan">Primer</label>
                                            <input type="text" name="saldo_primerDikeluarkan"
                                                id="saldo_primerDikeluarkan" class="input acs-input" readonly>
                                            <input type="text" name="saldo_primerDikeluarkanSatuan"
                                                id="saldo_primerDikeluarkanSatuan" class="input acs-input1" readonly>
                                        </div>
                                    </div>
                                    <div class="acs-div-filter1">
                                        <div style="display: flex; flex-direction: row; gap: 3%">
                                            <label for="saldo_sekunderDikeluarkan">Sekunder</label>
                                            <input type="text" name="saldo_sekunderDikeluarkan"
                                                id="saldo_sekunderDikeluarkan" class="input acs-input" readonly>
                                            <input type="text" name="saldo_sekunderDikeluarkanSatuan"
                                                id="saldo_sekunderDikeluarkanSatuan" class="input acs-input1" readonly>
                                        </div>
                                    </div>
                                    <div class="acs-div-filter1">
                                        <div style="display: flex; flex-direction: row; gap: 3%">
                                            <label for="saldo_tritierDikeluarkan">Tritier</label>
                                            <input type="text" name="saldo_tritierDikeluarkan"
                                                id="saldo_tritierDikeluarkan" class="input acs-input" readonly>
                                            <input type="text" name="saldo_tritierDikeluarkanSatuan"
                                                id="saldo_tritierDikeluarkanSatuan" class="input acs-input1" readonly>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="acs-div-filter1">
                            <label for="jumlah_konversi">Jumlah Konversi</label>
                            <input type="text" name="jumlah_konversi" id="jumlah_konversi" class="input" readonly>
                            {{-- <button id="tampilModal" class="btn btn-light">Tampil Modal</button> --}}
                        </div>
                        <div class="acs-btn-form5">
                            <button id="prosesButton" class="btn btn-primary acs-btn-form">Proses</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- The modal overlay -->
    <div id="modalOverlay">
        <!-- Modal content area -->
        <div id="modalContent">
            <h3>Pilih Barcode</h3>
            <table id="table_AccBarcodePenjualan" class="table table-bordered table-striped" style="width:100%">
                <thead class="thead-dark">
                    <tr>
                        <th>No</th>
                        <th>No Indeks</th>
                        <th>Kode Barang</th>
                        <th>Primer</th>
                        <th>Sekunder</th>
                        <th>Tritier</th>
                        <th>Tgl Scan</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
            {{-- <button id="pilihButton" class="btn btn-light">Pilih</button> --}}
            <div style="display: flex; flex-direction: row">
                <button id="pilihButton" class="btn btn-light">Pilih</button>
                <button id="pilihSemuaButton" class="btn btn-light">Pilih Semua</button>
                <button id="hapusButton" class="btn btn-dark">Hapus</button>
                <button id="closeModalButton" class="btn btn-danger">Close</button>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="{{ asset('js/Sales/AccPenjualan.js') }}"></script>
@endsection
