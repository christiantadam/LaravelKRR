@extends('layouts.appAccounting')
@section('content')
@section('title', 'Kelebihan Bayar untuk Penjualan Tunai')

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-8 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Kelebihan Bayar untuk Penjualan Tunai</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            <form method="POST" action="">
                                @csrf
                                <!-- Form fields go here -->
                                <div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="tanggalInput" style="margin-right: 10px;">Tanggal Input</label>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="date" id="tanggalInput" name="tanggalInput" class="form-control" style="width: 100%">
                                    </div>
                                </div>
                                <div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="namaCustomerSelect" style="margin-right: 10px;">Nama Customer</label>
                                    </div>
                                    <div class="col-md-8">
                                        <select id="namaCustomerSelect" name="namaCustomerSelect" class="form-control" onchange="fillColumns()">

                                        </select>
                                    </div>
                                    <div class="col-md-1">
                                        <input type="text" id="idCustomer" name="idCustomer" class="form-control" style="width: 100%">
                                    </div>
                                </div>
                                <div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="noNotaKreditSelect" style="margin-right: 10px;">No. Nota Kredit</label>
                                    </div>
                                    <div class="col-md-5">
                                        <select id="noNotaKreditSelect" name="noNotaKreditSelect" class="form-control" onchange="fillColumns()">

                                        </select>
                                    </div>
                                </div>
                                <div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="noPenagihanSelect" style="margin-right: 10px;">No. Penagihan</label>
                                    </div>
                                    <div class="col-md-5">
                                        <select id="noPenagihanSelect" name="noPenagihanSelect" class="form-control" onchange="fillColumns()">

                                        </select>
                                    </div>
                                </div>
                                <div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="mataUang" style="margin-right: 10px;">Mata Uang</label>
                                    </div>
                                    <div class="col-md-4">
                                        <input type="text" id="mataUang" name="mataUang" class="form-control" style="width: 100%">
                                    </div>
                                </div>
                                <div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="statusPelunasan" style="margin-right: 10px;">Status Pelunasan</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" id="statusPelunasan" name="statusPelunasan" class="form-control" style="width: 100%">
                                    </div>
                                </div>

                                <br><div>
                                    <div style="overflow-y: auto; overflow-x: auto; max-height: 400px;">
                                        <table style="width: 120%; table-layout: fixed;" id="tabelKelebihanBayar">
                                            <colgroup>
                                                <col style="width: 20%;">
                                                <col style="width: 20%;">
                                                <col style="width: 20%;">
                                                <col style="width: 20%;">
                                                <col style="width: 20%;">
                                                <col style="width: 20%;">
                                            <thead class="table-dark">
                                                <tr>
                                                    <th>Nama Brg</th>
                                                    <th>Kode Brg</th>
                                                    <th>Selisih</th>
                                                    <th>Harga Satuan</th>
                                                    <th>Total</th>
                                                    <th>Id</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <br>
                                <div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="grandTotal" style="margin-right: 10px;">Grand Total</label>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="text" id="grandTotal" name="grandTotal" class="form-control" style="width: 100%">
                                    </div>
                                </div>
                                <div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="terbilang" style="margin-right: 10px;">Terbilang</label>
                                    </div>
                                    <div class="col-md-9">
                                        <input type="text" id="terbilang" name="terbilang" class="form-control" style="width: 100%">
                                    </div>
                                </div>

                                <br><div>
                                    <div class="row">
                                        <div class="col-md-1">
                                            <input type="submit" id="btnIsi" name="btnIsi" value="Isi" class="btn btn-primary">
                                            <input type="submit" id="btnSimpan" name="btnSimpan" value="Simpan" class="btn btn-primary" style="display: none">
                                        </div>
                                        <div class="col-md-1">
                                            <input type="submit" id="btnKoreksi" name="btnKoreksi" value="Koreksi" class="btn btn-primary">
                                            <input type="submit" id="btnBatal" name="btnBatal" value="Batal" class="btn btn-primary" style="display: none">
                                        </div>
                                        <div class="col-md-1">
                                            <input type="submit" id="btnHapus" name="btnHapus" value="Hapus" class="btn btn-primary">
                                        </div>
                                        <div class="col-md-1">
                                            <input type="submit" id="btnKeluar" name="btnKeluar" value="Keluar" class="btn btn-primary">
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <br>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<script src="{{ asset('js/Piutang/MaintenanceNotaKredit/KelebihanBayarJualTunai.js') }}"></script>
@endsection
