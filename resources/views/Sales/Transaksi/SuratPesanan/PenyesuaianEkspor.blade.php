@extends('layouts.appSales') @section('content')
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <link href="{{ asset('css/permohonan-s-p.css') }}" rel="stylesheet">
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
                    <div class="card-header">Penyesuaian Surat Pesanan Ekspor</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="permohonan-s-p-container">
                            <form class="permohonan-s-p-form" id="form_suratPesanan" method="POST"
                                action="{{ url('SuratPesananEkspor') }}">
                                {{ csrf_field() }}
                                <input type="hidden" name="_method" id="methodForm">
                                <div class="acs-div-container toggle-group" id="div_headerSuratPesanan">
                                    <div class="acs-div-container1">
                                        <div class="acs-div-filter">
                                            <label for="tgl_pesan">Tanggal Pesan</label>
                                            <input type="date" name="tgl_pesan" id="tgl_pesan" class="input"
                                                onkeypress="enterToTab(event)">
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="no_sp">Nomor Surat Pesanan </label>
                                            <div>
                                                <input type="text" name="no_spText" id="no_spText" class="input"
                                                    style="width: 60%"onkeypress="enterToTab(event)">
                                                <select name="no_spSelect" id="no_spSelect" class="input"
                                                    style="width: 60%; display: none">
                                                    <option disabled selected>-- Pilih Nomor SP --</option>
                                                    @foreach ($list_sp as $data)
                                                    <option value="{{ $data->IDSuratPesanan }}">{{ $data->IDSuratPesanan }} | {{ $data->NamaCust }} </option>
                                                @endforeach
                                                </select>
                                                <button id="lihat_spButton" class="button btn-info"
                                                    style="display: inline-block">Lihat SP</button>
                                            </div>
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="no_pi">Nomor Proforma Invoice</label>
                                            <input type="text" name="no_pi" id="no_pi" class="input"
                                                onkeypress="enterToTab(event)">
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="no_po">Nomor Purchase Order</label>
                                            <input type="text" name="no_po" id="no_po" class="input"
                                                onkeypress="enterToTab(event)">
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="tgl_po">Tanggal Purchase Order</label>
                                            <input type="date" name="tgl_po" id="tgl_po" class="input"
                                                onkeypress="enterToTab(event)">
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="jenis_harga">Jenis Harga Barang Eksport</label>
                                            <select name="jenis_harga" id="jenis_harga" class="input"
                                                onkeypress="enterToTab(event)">
                                                <option selected disabled>-- Pilih Jenis Harga --</option>
                                                @foreach ($jenis_harga as $data)
                                                    <option value="{{ $data->IdJenisHargaBarang }}">
                                                        {{ $data->JenisHargaBarang }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="mata_uang">Mata Uang</label>
                                            <select name="mata_uang" id="mata_uang" class="input"
                                                onkeypress="enterToTab(event)">
                                                <option selected disabled>-- Pilih Mata Uang --</option>
                                                @foreach ($mata_uang as $data)
                                                    <option value="{{ $data->IDMataUang }}">{{ $data->MataUang }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                    </div>
                                    <div class="acs-div-container1">
                                        <div class="acs-div-filter">
                                            <label for="customer">Customer</label>
                                            <select name="customer" id="customer" class="input"
                                                onkeypress="enterToTab(event)">
                                                <option selected disabled>-- Pilih Customer --</option>
                                                @foreach ($list_customer as $data)
                                                    <option value="{{ $data->IDCust }}">{{ $data->NamaCust }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="sales">Sales</label>
                                            <select name="sales" id="sales" class="input"
                                                onkeypress="enterToTab(event)">
                                                <option selected disabled>-- Pilih Sales --</option>
                                                @foreach ($list_sales as $data)
                                                    <option value="{{ $data->IDSales }}">{{ $data->NamaSales }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="billing">Billing</label>
                                            <select name="billing" id="billing" class="input"
                                                onkeypress="enterToTab(event)">
                                                <option selected disabled>-- Pilih Billing --</option>
                                                @foreach ($list_billing as $data)
                                                    <option value="{{ $data->IDBill }}">{{ $data->NamaBill }}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="cargo_ready">Cargo Ready (Proforma Invoice)</label>
                                            <textarea name="cargo_ready" id="cargo_ready" class="input" cols="30" rows="2"></textarea>
                                            {{-- <input type="text" name="cargo_ready" id="cargo_ready" class="input"
                                                onkeypress="enterToTab(event)"> --}}
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="destination_port">Destination Port (Proforma Invoice)</label>
                                            <input type="text" name="destination_port" id="destination_port" class="input"
                                                onkeypress="enterToTab(event)">
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="payment_terms">Payment Terms (Proforma Invoice)</label>
                                            <textarea name="payment_terms" id="payment_terms" cols="30" rows="4" class="input"></textarea>
                                        </div>
                                    </div>
                                    <div class="acs-div-container2">
                                        <div class="acs-div-filter">
                                            <label for="remarks_quantity">Quantity</label>
                                            <textarea name="remarks_quantity" id="remarks_quantity" cols="30" rows="4" class="input"></textarea>
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="remarks_packing">Packing</label>
                                            <textarea name="remarks_packing" id="remarks_packing" cols="30" rows="4" class="input"></textarea>
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="remarks_price">Price</label>
                                            <textarea name="remarks_price" id="remarks_price" cols="30" rows="4" class="input"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="permohonan-s-p-container17 toggle-group" id="div_tabelSuratPesanan">
                                    <table class="permohonan-s-p-table" id="list_view" name="list_view">
                                        <thead class="thead-light acs-thead">
                                            <tr>
                                                <th>Nama Barang</th>
                                                <th>Jenis Barang</th>
                                                <th>Harga Satuan</th>
                                                <th>Jumlah</th>
                                                <th>Satuan</th>
                                                <th>General Specification</th>
                                                <th>Keterangan Barang</th>
                                                <th>Size/Code</th>
                                                <th>Rencana Kirim</th>
                                                <th>PPN</th>
                                                <th>Id Jenis Barang</th>
                                                <th>Kode Barang</th>
                                                <th>Id Type</th>
                                                <th>Id Pesanan</th>
                                                <th>Rencana Kirim (Cargo Ready)</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                                <div class="acs-div-container toggle-group" id="div_detailSuratPesanan">
                                    <div class="acs-div-container6">
                                        <div class="acs-div-filter">
                                            <label for="kelompok_utama">Kelompok Utama</label>
                                            <select name="kelompok_utama" id="kelompok_utama" class="input">
                                                <option selected disabled>-- Pilih Kelompok Utama --</option>
                                                @foreach ($kelompok_utama as $data)
                                                    <option value="{{ $data->IDTYPEBARANG }}">{{ $data->NAMATYPEBARANG }} | {{ $data->IDTYPEBARANG }} | {{ $data->ObjekDivisi }}
                                                    </option>
                                                @endforeach
                                            </select>
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="kelompok">Kelompok</label>
                                            <select name="kelompok" id="kelompok" class="input">

                                            </select>
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="sub_kelompok">Sub Kelompok</label>
                                            <select name="sub_kelompok" id="sub_kelompok" class="input">

                                            </select>
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="nama_barang">Nama Barang</label>
                                            <select name="nama_barang" id="nama_barang" class="input">

                                            </select>
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="kode_barang">Kode Barang</label>
                                            <input type="text" name="kode_barang" id="kode_barang" class="input"
                                                readonly>
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="jenis_barang">Jenis Barang</label>
                                            <select name="jenis_barang" id="jenis_barang" class="input"
                                                onkeypress="enterToTab(event)">
                                                <option selected disabled>-- Pilih Jenis Barang --</option>
                                                @foreach ($jenis_brg as $data)
                                                    <option value="{{ $data->IDJnsBrg }}">{{ $data->NamaJnsBrg }}
                                                    </option>
                                                @endforeach
                                            </select>
                                        </div>
                                    </div>
                                    <div class="acs-div-container1">
                                        <div class="acs-div-filter">
                                            <label for="qty_pesan">Quantity Pesan</label>
                                            <input type="text" class="input" id="qty_pesan" name="qty_pesan"
                                                onkeypress="enterToTab(event)">
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="harga_satuan">Harga Murni</label>
                                            <input type="text" class="input" id="harga_satuan" name="harga_satuan"
                                                onkeypress="enterToTab(event)">
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="general_specification">General Specification</label>
                                            <textarea name="general_specification" id="general_specification" cols="10" rows="2" class="input"></textarea>
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="keterangan_barang">Keterangan Barang</label>
                                            <textarea name="keterangan_barang" id="keterangan_barang" cols="10" rows="2" class="input"></textarea>
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="size_code">Size / Code</label>
                                            <textarea name="size_code" id="size_code" cols="10" rows="2" class="input"></textarea>
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="ppn">Pajak Pertambahan Nilai</label>
                                            <select name="ppn" id="ppn" class="input">
                                                <option selected disabled>-- Pilih PPN --</option>
                                                <option value="0">0</option>
                                                <option value="INCLUDE">INCLUDE</option>
                                                <option value="EXCLUDE">EXCLUDE</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="acs-div-container7">
                                        <div class="acs-div-filter">
                                            <label for="satuan_jual">Satuan Jual</label>
                                            <select name="satuan_jual" id="satuan_jual" class="input">
                                                <option selected disabled>-- Pilih Satuan Jual --</option>
                                                @foreach ($list_satuan as $data)
                                                    <option value="{{ $data->No_satuan }}">{{ trim($data->Nama_satuan) }}
                                                    </option>
                                                @endforeach
                                            </select>
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="satuan_gudang">Satuan Gudang</label>
                                            <div class="acs-div-container3">
                                                <input type="text" class="input" id="satuan_gudangPrimer"
                                                    name="satuan_gudangPrimer" readonly>
                                                <input type="text" class="input" id="satuan_gudangSekunder"
                                                    name="satuan_gudangSekunder" readonly>
                                                <input type="text" class="input" id="satuan_gudangTritier"
                                                    name="satuan_gudangTritier" readonly>
                                            </div>
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="rencana_kirim">Rencana Kirim</label>
                                            <input type="date" class="input" id="rencana_kirim"
                                                name="rencana_kirim">
                                        </div>
                                        <div class="acs-div-filter">
                                            <label for="cargo_readySuratPesanan">Rencana Kirim (Cargo Ready)</label>
                                            <textarea name="cargo_readySuratPesanan" id="cargo_readySuratPesanan" class="input" cols="30" rows="3"></textarea>
                                        </div>
                                        <div class="acs-div-container4">
                                            <button class="btn-success btn" id="add_button">ADD</button>
                                            <button class="btn-info btn" id="update_button">UPDATE</button>
                                            <button class="btn-danger btn" id="delete_button">DELETE</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="acs-div-container5">
                                    <button id="isi_button" class="btn-primary btn">
                                        <span>Isi</span></button>
                                    {{-- <button id="edit_button" class="btn-primary btn">
                                        <span>Koreksi</span></button> --}}
                                    <button id="hapus_button" class="btn-danger btn">
                                        <span>Hapus</span></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="{{ asset('js/Sales/permohonan-sp-ekspor.js') }}"></script>
@endsection
