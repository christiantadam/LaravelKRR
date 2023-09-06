@extends('layouts.appSales') @section('content')
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <link href="{{ asset('css/customer.css') }}" rel="stylesheet">
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @endif
                <div class="card">
                    <div class="card-header">Create Customer</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="permohonan-do-container">
                            <form class="permohonan-do-form" method="POST" action="{{ url('Customer') }}"
                                id="FormCustomer">
                                {{ csrf_field() }}
                                <input type="hidden" name="id_pesanan" id="id_pesanan_hidden" value="">
                                <div id="div_deliveryOrder" class="permohonan-do-form">
                                    <div class="acs-form">
                                        <div class="acs-form1">
                                            <div class="acs-div-filter">
                                                <label for="customer">Jenis Customer</label>
                                                <select name="customer" id="customer" class="input">
                                                    <option selected disabled>-- Pilih Jenis Customer--</option>
                                                    @foreach ($jnscust as $data)
                                                        <option value="{{ $data->IDJnsCust }}">
                                                            {{ $data->IDJnsCust . ' - ' . $data->NamaJnsCust }}</option>
                                                    @endforeach
                                                </select>
                                            </div>
                                            <div class="acs-div-filter">
                                                <label for="surat_pesanan">Nama Customer</label>
                                                <input type="text" name="nomor_spText" id="nomor_spText" class="input"
                                                    placeholder="Nama Customer">
                                            </div>
                                            <div class="acs-div-filter">
                                                <label for="id_pesanan">Initial Customer</label>
                                                <input type="text" name="id_pesananText" id="id_pesananText"
                                                    class="input" placeholder="Initial Customer">
                                            </div>
                                            <div class="acs-div-filter">
                                                <label for="kode_barang">Contact Person</label>
                                                <input type="text" name="kode_barang" id="kode_barang"
                                                    placeholder="Contact Person" class="input" readonly>
                                            </div>
                                            <div class="acs-div-filter">
                                                <label for="kode_barang">Limit Pembelian</label>
                                                <input type="text" name="kode_barang" id="kode_barang"
                                                    placeholder="Limit Pembelian" class="input" readonly>
                                            </div>
                                            <div class="acs-div-filter">
                                                <label for="kode_barang">Alamat Kantor</label>
                                                <input type="text" name="kode_barang" id="kode_barang"
                                                    placeholder="Alamat Kantor" class="input" readonly>
                                            </div>
                                            <div class="acs-div-filter">
                                                <label for="kode_barang">Kota</label>
                                                <input type="text" name="kode_barang" id="kode_barang"
                                                    placeholder="Kota" class="input" readonly>
                                            </div>
                                            <div class="acs-div-filter">
                                                <label for="kode_barang">Provinsi</label>
                                                <input type="text" name="kode_barang" id="kode_barang"
                                                    placeholder="Provinsi" class="input" readonly>
                                            </div>
                                            <div class="acs-div-filter">
                                                <label for="kode_barang">Negara</label>
                                                <input type="text" name="kode_barang" id="kode_barang"
                                                    placeholder="Negara" class="input" readonly>
                                            </div>
                                            <div class="acs-div-filter">
                                                <label for="kode_barang">Kode Pos</label>
                                                <input type="text" name="kode_barang" id="kode_barang"
                                                    placeholder="Kode Pos" class="input" readonly>
                                            </div>
                                        </div>
                                        <div class="acs-form1">
                                            <div class="acs-div-filter3">
                                                <label for="uraian">Provinsi</label>
                                                <input type="text" name="uraian" id="uraian" placeholder="Uraian"
                                                    class="input">
                                            </div>
                                            <div class="acs-div-filter1">
                                                <label for="kelompok_utama">Kelompok Utama</label>
                                                <select name="kelompok_utama" id="kelompok_utama" class="input">
                                                    <option disabled selected>--Pilih Kelompok Utama--</option>
                                                </select>
                                            </div>
                                            <div class="acs-div-filter1">
                                                <label for="kelompok">Kelompok</label>
                                                <select name="kelompok" id="kelompok" class="input">
                                                    <option disabled selected>--Pilih Kelompok--</option>
                                                </select>
                                            </div>
                                            <div class="acs-div-filter1">
                                                <label for="sub_kelompok">Sub Kelompok</label>
                                                <select name="sub_kelompok" id="sub_kelompok" class="input">
                                                    <option disabled selected>--Pilih Sub Kelompok--</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="acs-form1">
                                            <div class="acs-div-filter1">
                                                <label for="customer">Customer</label>
                                                <select name="customer" id="customer" class="input">
                                                    <option selected disabled>-- Pilih Customer--</option>
                                                </select>
                                            </div>
                                            <div class="acs-div-filter">
                                                <label for="surat_pesanan">Surat Pesanan</label>
                                                <div class="acs-div-filter2">
                                                    <input type="text" name="nomor_spText" id="nomor_spText"
                                                        class="input">
                                                    <div class="acs-div-filter1" id="surat_pesananDiv"
                                                        style="display: none">
                                                        <select name="nomor_spSelect" id="nomor_spSelect"
                                                            style="display: none" class="input">
                                                            <option selected disabled>--Pilih Surat Pesanan--</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="acs-div-filter">
                                                <label for="id_pesanan">ID Pesanan</label>
                                                <div class="acs-div-filter2">
                                                    <input type="text" name="id_pesananText" id="id_pesananText"
                                                        class="input">
                                                    <div class="acs-div-filter1" id="id_pesananDiv"
                                                        style="display: none">
                                                        <select name="id_pesananSelect" id="id_pesananSelect"
                                                            style="display: none" class="input">
                                                            <option selected disabled>--Pilih ID Pesanan--</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="acs-div-filter1">
                                                <label for="kode_barang">Kode Barang</label>
                                                <div class="acs-div-filter2">
                                                    <input type="text" name="kode_barang" id="kode_barang"
                                                        placeholder="Kode Barang" class="input" readonly>
                                                    <div class="acs-div-filter1">
                                                        <span id="text_idTypeBarang" style="display: none">ID Type
                                                            Barang</span>
                                                        <input type="text" name="id_typeBarang" id="id_typeBarang"
                                                            class="input" style="display: none" readonly>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="acs-div-btn">
                                    <button id="submit_btn" class="btn btn-primary">
                                        <span>Submit</span></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="{{ asset('js/Sales/Customer.js') }}"></script>
@endsection
