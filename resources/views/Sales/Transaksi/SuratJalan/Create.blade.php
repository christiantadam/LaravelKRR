@extends('layouts.appSales') @section('content')
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <link href="{{ asset('css/permohonan-sj.css') }}" rel="stylesheet">
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
                    <div class="card-header">Surat Jalan</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="permohonan-sj-container">
                            <form method="POST" enctype="multipart/form-data" id="form_suratJalan"
                                class="permohonan-sj-form" action="{{ url('SuratJalan') }}">
                                {{ csrf_field() }}
                                <div class="permohonan-sj-form" id="div_suratJalan">

                                        <div class="acs-div-filter">
                                            <label for="id_kirim">Id Kirim</label>
                                            <div class="acs-div-filter2">
                                                <input type="text" name="id_kirimText" id="id_kirimText" class="input"
                                                    readonly>
                                                <select name="id_kirimSelect" id="id_kirimSelect" style="display: none"
                                                    class="input">
                                                    <option selected disabled>--Pilih Id Kirim--</option>
                                                </select>
                                                <button disabled id="list_sjButton" class="btn btn-info"
                                                    style="display: inline;">↺ Lihat Data</button>
                                            </div>
                                        </div>
                                        <div class="acs-div-filter1">
                                            <label for="Keterangan">Keterangan</label>
                                            <textarea placeholder="Keterangan" name="keterangan" id="keterangan" class="textarea"></textarea>
                                        </div>


                                    <div class="permohonan-sj-container02">
                                        <span>Jenis Pengiriman</span>
                                        <select class="permohonan-sj-select input" name="jenis_pengiriman"
                                            id="jenis_pengiriman">
                                            <option disabled selected>-- Pilih Jenis Pengiriman --</option>
                                            @foreach ($jenisPengiriman as $data)
                                                <option value="{{ $data->IDJnsSuratJalan }}">{{ $data->NamaJnsSuratJalan }}
                                                </option>
                                            @endforeach
                                        </select>
                                        <span>Truk Nopol</span>
                                        <input type="text" id="truk_nopol" name="truk_nopol" placeholder="Truk Nopol"
                                            class="input" />
                                    </div>
                                    <div class="permohonan-sj-container03">
                                        <span>Surat Jalan</span>
                                        <input type="text" id="surat_jalan" name="surat_jalan" placeholder="Surat Jalan"
                                            class="input" />
                                        <span>Biaya</span>
                                        <input type="text" id="biaya" name="biaya" placeholder="0"
                                            class="input" />
                                    </div>
                                    <div class="permohonan-sj-container04">
                                        <span>Tanggal</span>
                                        <input type="date" id="tanggal" name="tanggal" placeholder="placeholder"
                                            class="input" />
                                        {{-- <span>No. Container</span>
                        <input type="text" placeholder="Nomor Container" id="nomor_container" name="nomor_container"
                            class="input" /> --}}
                                        <span>Tanggal Actual</span>
                                        <input type="date" placeholder="placeholder" id="tanggal_actual"
                                            name="tanggal_actual" class="input" />
                                    </div>
                                    {{-- <div class="permohonan-sj-container05">
                        <span>Tanggal Actual</span>
                        <input type="date" placeholder="placeholder" id="tanggal_actual" name="tanggal_actual"
                            class="input" />
                        <span>No. Seal</span>
                        <input type="text" placeholder="Nomor Seal" class="input" id="nomor_seal" name="nomor_seal" />
                    </div> --}}
                                    <div class="permohonan-sj-container06">
                                        <span>Customer</span>
                                        <select class="permohonan-sj-select1 input" id="customer" name="customer">
                                            <option disabled selected>-- Pilih Customer--</option>
                                            @foreach ($customer as $data)
                                                @php
                                                    $IDCust = explode(' - ', $data->IdCust);
                                                @endphp
                                                <option value="{{ $IDCust[0] }}">{{ $data->NamaCust }}</option>
                                            @endforeach
                                        </select>
                                        <span>Expeditor</span>
                                        <select class="permohonan-sj-select2 input" id="expeditor" name="expeditor">
                                            <option disabled selected>-- Pilih Expeditor--</option>
                                            @foreach ($expeditor as $data)
                                                <option value="{{ $data->IDEXPEDITOR }}">{{ $data->NAMAEXPEDITOR }}
                                                </option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="permohonan-sj-container07">
                                        <table class="permohonan-sj-table" id="list_view" name="list_view">
                                            <thead class="thead-light">
                                                <tr>
                                                    <th>No. DO</th>
                                                    <th>Uraian</th>
                                                    <th>No. Trans</th>
                                                    <th>Surat Pesanan</th>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
                                    <div class="permohonan-sj-container08">
                                        <div class="permohonan-sj-container09">
                                            <span>Surat Pesanan</span>
                                            <select class="permohonan-sj-select3 input" id="surat_pesanan"
                                                name="surat_pesanan">
                                                <option disabled selected>-- Pilih Jenis Pengiriman --</option>
                                            </select>
                                        </div>
                                        <div class="permohonan-sj-container10">
                                            <span>Nomor DO</span>
                                            <select class="permohonan-sj-select4 input" id="nomor_do" name="nomor_do">
                                                <option disabled selected>-- Pilih Jenis Pengiriman --</option>
                                            </select>
                                        </div>
                                        <div class="permohonan-sj-container11">
                                            <span>Uraian</span>
                                            <textarea id="uraian" name="uraian" placeholder="Uraian" class="permohonan-sj-textarea1 textarea"></textarea>
                                        </div>
                                        <div class="permohonan-sj-container12">
                                            <button id="add_item" name="add_item" type="button"
                                                class="permohonan-sj-button button">
                                                Add Item
                                            </button>
                                            <button id="remove_item" name="remove_item" type="button"
                                                class="permohonan-sj-button1 button">
                                                Remove Item
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="permohonan-sj-container13">
                                    <button id="isi_button" class="permohonan-sj-button2 button">
                                        <span>Isi</span></button>
                                    <button id="edit_button" class="permohonan-sj-button3 button">
                                        <span>Koreksi</span></button>
                                    <button id="hapus_button" class="permohonan-sj-button4 button">
                                        <span>Hapus</span></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="{{ asset('js/Sales/permohonan-s-j.js') }}"></script>
@endsection
