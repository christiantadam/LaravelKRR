@extends('layouts.appJumboBag')
@section('title', 'Maintenance Tabel Order')

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
            <style>
                .py-4 {
                    padding-bottom: 100px !important;
                }
            </style>
            <div class="col-md-10 RDZMobilePaddingLR0">
                <form id="copyKodeBarangForm" action="{{ route('CopyTabelOrder.store') }}" method="POST">
                    <div style="display: flex; flex-direction: row; gap: 1%;margin-bottom: 5px;">
                        <div style="width: 50%" class="card">
                            <div class="card-header">Jumbo Bag</div>
                            <div class="card-body">
                                @csrf
                                <div class="form-group">
                                    <label for="customer">Customer</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="id_customer" name="id_customer"
                                            required>
                                        <input type="text" class="form-control" style="width: 70%"id="customer"
                                            name="customer" required>
                                        <button class="btn" type="button" id="button_customer">...</button>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="kodeBarang">Kode Barang</label>
                                    <div class="input-group">
                                        {{-- <input type="text" class="form-control" id="tanggal" name="tanggal" required> --}}
                                        <input type="text" class="form-control" style="width: 70%" id="kodeBarangAsal"
                                            name="kodeBarangAsal" required>
                                        <button class="btn" type="button" id="button_kodebarang">...</button>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="noPesanan">No Pesanan</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="no_pesanan" name="no_pesanan"
                                            required>
                                        <button class="btn" type="button" id="button_nopesanan">...</button>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="timeDelivery">Time Delivery</label>
                                    <div class="input-group">
                                        <input type="date" class="form-control" id="time_deliv" name="time_deliv"
                                            required>
                                        <input type="hidden" class="form-control" id="time_delivold"
                                            name="time_delivold" required>

                                    </div>
                                </div>
                                <hr>
                                {{-- <div>s --}}
                                <div class="form-group">
                                    <label for="jumlahOrder">Jumlah Order</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="jumlah_order" name="jumlah_order"
                                            required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="tanggalDikerjakan">Tanggal Dikerjakan</label>
                                    <div class="input-group">
                                        <input type="date" class="form-control" id="tanggal_dikerjakan"
                                            name="tanggal_dikerjakan" required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="tanggalSelesai">Tanggal Selesai</label>
                                    <div class="input-group">
                                        <input type="date" class="form-control" id="tanggal_selesai"
                                            name="tanggal_selesai" required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="alasanStop">Alasan Stop</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="alasan" name="alasan" required>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br>
                        <div style="width: 50%" class="card">
                            <div class="card-header">Sales</div>
                            <div class="card-body">
                                <div class="form-group">
                                    <label for="customerSales">Customer</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="id_customers" name="id_customers"
                                            required>
                                        <input type="text" class="form-control" style="width: 70%"id="customers"
                                            name="customers" required>
                                        <button class="btn" type="button" id="button_customers">...</button>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="kodeBarang">Kode Barang</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="kodebarangs" name="kodebarangs"
                                            required>
                                        <input type="text" class="form-control" style="width: 70%" id="kodeBarangs"
                                            name="kodeBarangs" required>
                                        <button class="btn" type="button" id="button_kodebarang2">...</button>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="nosuratpesanan">No Surat Pesanan</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" style="width: 70%"
                                            id="idsuratpesanan" name="idsuratpesanan" required>
                                        <button class="btn" type="button" id="button_pesanan">...</button>
                                        <input type="text" class="form-control" id="idpesanan" name="idpesanan"
                                            required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="jenis_barang">Jenis Barang</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="jenis_barang" name="jenis_barang"
                                            required>
                                        <input type="date" class="form-control" id="tanggal_j" name="tanggal_j"
                                            required>
                                    </div>
                                </div>
                                <hr>
                                <div class="form-group">
                                    <label for="qtySP">Qty SP</label>
                                    <div class="input-group">
                                        <input type="text" style="width: 75%" class="form-control" id="qty_sp"
                                            name="qty_sp" required>
                                        <input type="text" class="form-control" id="satuan" name="satuan">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="qty_sisa">Qty Sisa SP</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="qty_sisa" name="qty_sisa"
                                            required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="qty_produksi">Qty Produksi</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="qty_produksi" name="qty_produksi"
                                            required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="rencana">Rencana Kirim</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="rencana" name="rencana"
                                            required>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br>
                    </div>
                    <div>
                        <div
                            style="
                        display: flex;
                        flex-direction: row;
                        width: 100%;
                    ">
                            <button id="btn_isi" style="width: 100px" class="btn btn-primary">Isi</button>
                            <button id="btn_koreksi" style="width: 100px" class="btn btn-warning">Koreksi</button>
                            <button id="btn_hapus" style="width: 100px" class="btn btn-danger">Hapus</button>
                            <button id="btn_stop_order" style="width: 100px" class="btn btn-dark">Stop Order</button>
                            <button style="width: 150px"id="btn_transfer" class="btn btn-info">Transfer
                                Data</button>
                            <div
                                style="
                            width: 100%;
                            text-align: right;
                            margin-right: 2%;
                        ">
                                <button style="width: 100px" id="btn_proses" style="width: 100px"
                                    class="btn btn-success">Proses</button>
                                <button id="btn_batal" style="width: 100px" class="btn">Batal</button>
                            </div>
                        </div>
                        {{-- <div style="margin-left: -10px;">
                            <button id="btn_proses" style="width: 100px" class="btn btn-success">Proses</button>
                            <button id="btn_batal" style="width: 100px" class="btn">Batal</button>
                        </div> --}}
                    </div>

            </div>
            </form>
        </div>
    </div>
    </div>
    </div>
    </div>
    </div>

    <script src="{{ asset('js/JumboBag/MaintenanceTabelOrder.js') }}"></script>
@endsection
