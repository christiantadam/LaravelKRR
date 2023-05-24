@extends('layouts.appSales') @section('content')
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <link href="{{ asset('css/permohonan-do.css') }}" rel="stylesheet">
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @endif
                <div class="card">
                    <div class="card-header">Delivery Order</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="permohonan-do-container">
                            <form class="permohonan-do-form" id="form_deliveryOrder" method="POST"
                                action="{{ url('DeliveryOrder') }}">
                                {{ csrf_field() }}
                                <input type="hidden" name="id_pesanan" id="id_pesanan_hidden" value="">
                                <div id="div_deliveryOrder" class="permohonan-do-form">
                                    <div class="acs-div-filter">
                                        <label for="tgl_do">Tgl DO</label>
                                        <div class="acs-div-filter2" style="gap: 12px">
                                            <input type="date" name="tgl_do" id="tgl_do" class="input">
                                            <button id="listDO_button" class="btn btn-info" style="display: inline;"
                                                disabled>↺ List All DO</button>
                                            <div class="acs-div-filter1">
                                                <span id="nomor_doSpan">Nomor DO: </span>
                                                <input type="text" name="nomor_doText" id="nomor_doText" class="input">
                                                <select name="nomor_doSelect" id="nomor_doSelect" style="display: none"
                                                    class="input">
                                                    <option disabled selected>-- Pilih Nomor Delivery Order --</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="acs-form">
                                        <div class="acs-form1">
                                            <div class="acs-div-filter1">
                                                <label for="customer">Customer</label>
                                                <select name="customer" id="customer" class="input">
                                                    <option selected disabled>-- Pilih Customer--</option>
                                                    @foreach ($customer as $data)
                                                        @php
                                                            $IDCust = trim(substr($data->IDCust, strpos($data->IDCust, '-') + 1));
                                                        @endphp
                                                        <option value="{{ $IDCust }}">{{ $data->NamaCust }}</option>
                                                    @endforeach
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
                                                    <button id="listSP_button" class="btn btn-info"
                                                        style="display: inline;">↺ List All SP</button>
                                                </div>
                                            </div>
                                            <div class="acs-div-filter">
                                                <label for="id_pesanan">ID Pesanan</label>
                                                <div class="acs-div-filter2">
                                                    <input type="text" name="id_pesananText" id="id_pesananText"
                                                        class="input">
                                                    <div class="acs-div-filter1" id="id_pesananDiv" style="display: none">
                                                        <select name="id_pesananSelect" id="id_pesananSelect"
                                                            style="display: none" class="input">
                                                            <option selected disabled>--Pilih ID Pesanan--</option>
                                                        </select>
                                                    </div>
                                                    <button id="listBarang_button" class="btn btn-info"
                                                        style="display: inline;">↺ List All Barang</button>
                                                </div>
                                            </div>
                                            <div class="acs-div-filter1">
                                                <label for="kode_barang">Kode Barang</label>
                                                <div class="acs-div-filter2" style="gap: 12px">
                                                    <input type="text" name="kode_barang" id="kode_barang"
                                                        placeholder="Kode Barang" class="input">
                                                    <div class="acs-div-filter1">
                                                        <span id="text_idTypeBarang" style="display: none">ID Type
                                                            Barang</span>
                                                        <input type="text" name="id_typeBarang" id="id_typeBarang"
                                                            class="input" style="display: none">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="acs-form1">
                                            <div class="acs-div-filter3">
                                                <label for="uraian">Uraian</label>
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
                                    </div>
                                    {{-- <div class="permohonan-do-container06">
                                        <span class="permohonan-do-text07">Uraian</span>
                                        <input type="text" id="uraian" name="uraian" placeholder="Uraian"
                                            class="permohonan-do-textarea textarea"></textarea>
                                    </div>
                                    <div class="permohonan-do-container07">
                                        <span class="permohonan-do-text08">Kel. Utama</span>
                                        <select id="kelompok_utama" name="kelompok_utama"
                                            class="permohonan-do-select4 input">
                                            <option disabled selected>--Pilih Kelompok Utama--</option>
                                        </select>
                                    </div>
                                    <div class="permohonan-do-container08">
                                        <span class="permohonan-do-text09">Kelompok</span>
                                        <select id="kelompok" name="kelompok" class="permohonan-do-select5 input">
                                            <option disabled selected>--Pilih Kelompok--</option>
                                        </select>
                                    </div>
                                    <div class="permohonan-do-container09">
                                        <span class="permohonan-do-text10">Sub. Kel.</span>
                                        <select id="sub_kelompok" name="sub_kelompok"
                                            class="permohonan-do-select6 input">
                                            <option disabled selected>--Pilih Sub Kelompok--</option>
                                        </select>
                                    </div> --}}
                                    <div class="permohonan-do-container10">
                                        <div class="permohonan-do-container11">
                                            <div class="permohonan-do-container12">
                                                <span class="permohonan-do-text11">Qty Primer</span>
                                                <input type="text" id="qty_primer" name="qty_primer"
                                                    placeholder="Qty Primer" class="permohonan-do-textinput02 input" />
                                            </div>
                                            <div class="permohonan-do-container13">
                                                <span class="permohonan-do-text13">Qty Sekunder</span>
                                                <input type="text" id="qty_sekunder" name="qty_sekunder"
                                                    placeholder="Qty Sekunder" class="permohonan-do-textinput04 input" />
                                                <span class="permohonan-do-text14">Qty Order</span>
                                                <input type="text" id="qty_order" name="qty_order"
                                                    placeholder="Qty Order" class="permohonan-do-textinput05 input" />
                                            </div>
                                            <div class="permohonan-do-container13">
                                                <span class="permohonan-do-text13">Qty Tritier</span>
                                                <input type="text" id="qty_tritier" name="qty_tritier"
                                                    placeholder="Qty Tritier" class="input" style="margin-left: 40px" />
                                                <span class="permohonan-do-text14">Qty Kirim</span>
                                                <input type="text" id="qty_kirim" name="qty_kirim"
                                                    placeholder="Qty Kirim" class="input" />
                                            </div>
                                            <div class="permohonan-do-container14">
                                                <span class="permohonan-do-text15">Max Kirim</span>
                                                <input type="text" id="max_kirim" name="max_kirim"
                                                    placeholder="Max Kirim" class="permohonan-do-textinput06 input" />
                                            </div>
                                            <div class="permohonan-do-container15">
                                                <span class="permohonan-do-text16">Min Kirim</span>
                                                <input type="text" id="min_kirim" name="min_kirim"
                                                    placeholder="Min Kirim" class="permohonan-do-textinput07 input" />
                                            </div>
                                        </div>
                                        <div class="permohonan-do-container16">
                                            <div class="permohonan-do-container17">
                                                <span class="permohonan-do-text17">Qty Primer</span>
                                                <input type="text" id="qty_primerGudang" name="qty_primerGudang"
                                                    placeholder="Qty Primer Gudang"
                                                    class="permohonan-do-textinput08 input" readonly />
                                                <input type="text" placeholder="Satuan Primer" id="satuan_primer"
                                                    class="permohonan-do-textinput09 input" />
                                            </div>
                                            <div class="permohonan-do-container18">
                                                <span class="permohonan-do-text18">Qty Sekunder</span>
                                                <input type="text" placeholder="Qty Sekunder Gudang"
                                                    id="qty_sekunderGudang" class="permohonan-do-textinput10 input"
                                                    readonly />
                                                <input type="text" placeholder="Satuan Sekunder" id="satuan_sekunder"
                                                    class="permohonan-do-textinput11 input" />
                                            </div>
                                            <div class="permohonan-do-container19">
                                                <span class="permohonan-do-text19">Qty Tritier</span>
                                                <input type="text" id="qty_tritierGudang" name="qty_tritierGudang"
                                                    placeholder="Qty Tritier Gudang"
                                                    class="permohonan-do-textinput12 input" readonly />
                                                <input type="text" placeholder="Satuan Tritier" id="satuan_tritier"
                                                    class="permohonan-do-textinput13 input" />
                                            </div>
                                            <div class="permohonan-do-container20">
                                                <span class="permohonan-do-text20">Divisi</span>
                                                <input type="text" id="divisi" name="divisi" placeholder="Divisi"
                                                    class="permohonan-do-textinput14 input" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="permohonan-do-container21">
                                        <span class="permohonan-do-text21">
                                            <span>Alamat Kirim</span>
                                            <br />
                                            <br />
                                        </span>
                                        <textarea id="alamat_kirim" name="alamat_kirim" placeholder="Alamat Kirim" class="permohonan-do-textarea1 textarea"></textarea>
                                    </div>
                                    <div class="permohonan-do-container22">
                                        <span class="permohonan-do-text25">
                                            <span>Kota Kirim</span>
                                            <br />
                                            <br />
                                        </span>
                                        <input type="text" id="kota_kirim" name="kota_kirim" placeholder="Kota Kirim"
                                            class="permohonan-do-input1 input" />
                                    </div>
                                    <div class="permohonan-do-container23" style="display: none">
                                        <div class="permohonan-do-container24">
                                            <span class="permohonan-do-text29">
                                                <span>Vessel</span>
                                                <br />
                                            </span>
                                            <input type="text" id="vessel" name="vessel" placeholder="Vessel"
                                                class="permohonan-do-input2 input" />
                                        </div>
                                        <div class="permohonan-do-container25">
                                            <span class="permohonan-do-text32">
                                                <span>ETD</span>
                                                <br />
                                            </span>
                                            <input type="date" id="etd" name="etd"
                                                placeholder="placeholder" class="permohonan-do-textinput15 input" />
                                        </div>
                                        <div class="permohonan-do-container26">
                                            <span class="permohonan-do-text35">
                                                <span>CC</span>
                                                <br />
                                            </span>
                                            <input type="date" id="cc" name="cc"
                                                placeholder="placeholder" class="permohonan-do-textinput16 input" />
                                        </div>
                                    </div>
                                </div>
                                <div class="permohonan-do-container27">
                                    <button id="isi_button" class="permohonan-do-button1 button">
                                        <span>Isi</span></button>
                                    <button id="edit_button" class="permohonan-do-button2 button">
                                        <span>Koreksi</span></button>
                                    <button id="hapus_button" class="permohonan-do-button3 button">
                                        <span>Hapus</span></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="{{ asset('js/Sales/permohonan-do.js') }}"></script>
@endsection
