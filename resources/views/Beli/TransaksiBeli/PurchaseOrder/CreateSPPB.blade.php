@extends('layouts.appOrderPembelian')
@section('content')
    <link href="{{ asset('css/CreateSPPB.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <script>
        let loadPermohonanData = {!! json_encode($loadPermohonan) !!};
        let loadHeaderData = {!! json_encode($loadHeader) !!};
    </script>
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
                    <div class="card-header">Create Purchase Order</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="acs-form-row">
                            <div class="acs-form-column">
                                <div class="acs-div-filter1" style="margin-bottom: 12px">
                                    <label for="nomor_purchaseOrder">No. PO</label>
                                    <input type="text" name="nomor_purchaseOrder" id="nomor_purchaseOrder" class="input"
                                        value="{{ $No_PO }}">
                                </div>
                                <div class="acs-div-filter1">
                                    <label for="tanggal_purchaseOrder">Tanggal PO</label>
                                    <input type="date" name="tanggal_purchaseOrder" id="tanggal_purchaseOrder"
                                        class="input">
                                </div>
                            </div>
                            <div class="acs-form-column">
                                <div class="acs-div-filter1">
                                    <label for="supplier">Supplier</label>
                                    <div class="acs-div-filter2">
                                        <select class="input" name="supplier_select" id="supplier_select"
                                            style="display: none;max-width:200px">
                                            <option selected disabled>-- Pilih Supplier --</option>
                                            @foreach ($supplier as $data)
                                                <option value="{{ $data->NO_SUP }}">{{ $data->NM_SUP }}</option>
                                            @endforeach
                                        </select>
                                        <input type="text" name="supplier_text" id="supplier_text" class="input">
                                        <button class="btn btn-info" id="supplier_button">↺ List Supplier</button>
                                    </div>
                                </div>
                                <div class="acs-div-filter1">
                                    <label for="tanggal_mohonKirim">Tanggal Mohon Kirim</label>
                                    <input type="date" name="tanggal_mohonKirim" id="tanggal_mohonKirim" class="input">
                                </div>
                            </div>
                            <div class="acs-form-column">
                                <div class="acs-div-filter1">
                                    <label for="payment_term">Payment Term</label>
                                    <div class="acs-div-filter2">
                                        <input type="text" name="payment_termText" id="payment_termText" class="input">
                                        <select class="input" name="payment_termSelect" id="payment_termSelect"
                                            style="display: none;max-width:200px">
                                            <option selected disabled>-- Choose Payment Term --</option>
                                            @foreach ($listPayment as $data)
                                                <option value="{{ $data->Kode }}">{{ $data->Pembayaran }}</option>
                                            @endforeach
                                        </select>
                                        <button class="btn btn-info" id="payment_termButton">↺ List of Payment Term</button>
                                    </div>
                                </div>
                                <div class="acs-div-filter1">
                                    <label for="mata_uang">Mata Uang</label>
                                    <div class="acs-div-filter2">
                                        <input type="text" name="mata_uangText" id="mata_uangText" class="input">
                                        <select class="input" name="mata_uangSelect" id="mata_uangSelect"
                                            style="display: none;max-width:200px">
                                            <option selected disabled>-- Pilih Mata Uang --</option>
                                            @foreach ($mataUang as $data)
                                                <option value="{{ $data->Id_MataUang }}">{{ $data->Nama_MataUang }}
                                                </option>
                                            @endforeach
                                        </select>
                                        <button class="btn btn-info" id="mata_uangButton">↺ List Mata Uang</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="div_tablePO" class="acs-form-table">
                            <table id="table_CreatePurchaseOrder" class="table table-bordered table-striped"
                                style="width:100%">
                                <thead class="thead-dark">
                                    <tr>
                                        <th>No Order</th>
                                        <th>Kd. Barang</th>
                                        <th>Nama Barang</th>
                                        <th>Sub Kategori</th>
                                        <th>Ket. Order</th>
                                        <th>Ket. Internal</th>
                                        <th>Qty</th>
                                        <th>Satuan</th>
                                        <th>Qty Delay</th>
                                        <th>Harga Unit</th>
                                        <th>Sub Total</th>
                                        <th>PPN</th>
                                        <th>Harga Total</th>
                                        <th>Kurs</th>
                                        <th>IDR Unit</th>
                                        <th>IDR Subtotal</th>
                                        <th>IDRPPN</th>
                                        <th>IDRTotal</th>
                                        <th>Disc (%)</th>
                                        <th>Discount</th>
                                        <th>Disc. IDR</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                        <div class="acs-form-row">
                            <div class="acs-form-column">
                                <div class="acs-div-filter1">
                                    <label for="nomor_order">Nomor Order</label>
                                    <input type="text" name="nomor_order" id="nomor_order" class="input">
                                </div>
                                <div class="acs-div-filter1">
                                    <label for="kode_barang">Kode barang</label>
                                    <input type="text" name="kode_barang" id="kode_barang" class="input">
                                </div>
                                <div class="acs-div-filter1">
                                    <label for="nama_barang">Nama barang</label>
                                    <input type="text" name="nama_barang" id="nama_barang" class="input">
                                </div>
                                <div class="acs-div-filter1">
                                    <label for="sub_kategori">Sub Kategori</label>
                                    <input type="text" name="sub_kategori" id="sub_kategori" class="input">
                                </div>
                                <div class="acs-div-filter1">
                                    <label for="keterangan_order">Ket. Order</label>
                                    <input type="text" name="keterangan_order" id="keterangan_order" class="input">
                                </div>
                                <div class="acs-div-filter1">
                                    <label for="keterangan_internal">Keterangan Internal</label>
                                    <input type="text" name="keterangan_internal" id="keterangan_internal"
                                        class="input">
                                </div>
                            </div>
                            <div class="acs-form-column">
                                <div class="acs-form-row">
                                    <div class="acs-form-column">
                                        <div class="acs-div-filter1">
                                            <label for="qty_order">Qty Order</label>
                                            <input type="text" name="qty_order" id="qty_order" class="input">
                                        </div>
                                        <div class="acs-div-filter1">
                                            <label for="kurs">Kurs</label>
                                            <input type="text" name="kurs" id="kurs" class="input"
                                                value="1">
                                        </div>
                                        <div class="acs-div-filter1">
                                            <label for="harga_unit">Harga Unit</label>
                                            <input type="text" name="harga_unit" id="harga_unit" class="input">
                                        </div>
                                        <div class="acs-div-filter1">
                                            <label for="harga_subTotal">Harga SubTotal</label>
                                            <input type="text" name="harga_subTotal" id="harga_subTotal"
                                                class="input">
                                        </div>
                                        <div class="acs-div-filter1">
                                            <label for="ppn">PPN(%)</label>
                                            <div class="acs-div-filter2">
                                                <select class="input" name="ppn_select" id="ppn_select"
                                                    style="display: none;max-width:200px">
                                                    <option selected disabled>-- Pilih PPN --</option>
                                                    @foreach ($ppn as $data)
                                                        <option value="{{ $data->IdPPN }}">{{ $data->JumPPN }}</option>
                                                    @endforeach
                                                </select>
                                                <input type="text" name="ppn_text" id="ppn_text" class="input">
                                                <button class="btn btn-info" id="ppn_button">↺ List PPN</button>
                                            </div>
                                        </div>
                                        {{-- <div class="acs-div-filter1">
                                            <label for="ppn">PPN(%)</label>
                                            <input type="text" name="ppn" id="ppn" class="input">
                                        </div> --}}
                                        <div class="acs-div-filter1">
                                            <label for="harga_total">Harga Total</label>
                                            <input type="text" name="harga_total" id="harga_total" class="input">
                                        </div>
                                    </div>
                                    <div class="acs-form-column">
                                        <div class="acs-div-filter1">
                                            <label for="qty_delay">Qty Delay</label>
                                            <input type="text" name="qty_delay" id="qty_delay" class="input">
                                        </div>
                                        <div class="acs-div-filter1">
                                            <label for="discount">%Disc/Disc</label>
                                            <div class="acs-div-filter2">
                                                <input type="text" name="persen_discount" id="persen_discount"
                                                    class="input">
                                                <input type="text" name="jumlah_discount" id="jumlah_discount"
                                                    class="input">
                                            </div>
                                        </div>
                                        <div class="acs-div-filter1">
                                            <label for="idr_unit">IDR Unit</label>
                                            <input type="text" name="idr_unit" id="idr_unit" class="input">
                                        </div>
                                        <div class="acs-div-filter1">
                                            <label for="idr_subTotal">IDR SubTotal</label>
                                            <input type="text" name="idr_subTotal" id="idr_subTotal" class="input">
                                        </div>
                                        <div class="acs-div-filter1">
                                            <label for="idr_ppn">IDR PPN</label>
                                            <input type="text" name="idr_ppn" id="idr_ppn" class="input">
                                        </div>
                                        <div class="acs-div-filter1">
                                            <label for="idr_total">IDR Total</label>
                                            <input type="text" name="idr_total" id="idr_total" class="input">
                                        </div>
                                    </div>
                                </div>
                                <div class="acs-div-filter-custom">
                                    <label for="alasan_reject">Alasan Reject</label>
                                    <input type="text" name="alasan_reject" id="alasan_reject" class="input"
                                        value="-">
                                </div>
                            </div>
                            <div class="acs-form-column">
                                <button class="btn btn-primary acs-btn-table" id="update_button">UPDATE</button>
                                <button class="btn btn-primary acs-btn-table" id="remove_button">REMOVE</button>
                                <button class="btn btn-primary acs-btn-table" id="reject_button">REJECT</button>
                            </div>
                        </div>
                        <div class="acs-div-filter-custom1">
                            <button class="btn btn-success" id="post_poButton">POST PO</button>
                        </div>
                    </div>
                </div>
            </div>
            <script src="{{ asset('js/OrderPembelian/CreateSPPB.js') }}"></script>
        @endsection
