@extends('layouts.appAccounting')
@section('content')
@section('title', 'Nota kredit / Retur')

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Nota Kredit / Retur</div>
                    @if (Session::has('success'))
                        <div class="alert alert-success">
                            {{ Session::get('success') }}
                        </div>
                    @endif
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            <form method="POST" action="{{ url('NotaKreditRetur') }}" id="formkoreksi">
                                {{csrf_field()}}
                                <input type="hidden" name="_method" id="methodkoreksi">
                                <!-- Form fields go here -->
                                <div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="tanggalInput" style="margin-right: 10px;">Tanggal Input</label>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="date" id="tanggalInput" name="tanggalInput" class="form-control" style="width: 100%" readonly>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" id="jenisPPN" name="jenisPPN" class="form-control" style="width: 100%" readonly>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" id="statusPPN" name="statusPPN" class="form-control" style="width: 100%" readonly>
                                    </div>
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="namaCustomerSelect" style="margin-right: 10px;">Nama Customer</label>
                                    </div>
                                    <div class="col-md-7">
                                        <select id="namaCustomerSelect" name="namaCustomerSelect" class="form-control" readonly>

                                        </select>
                                    </div>
                                    <div class="col-md-1">
                                        <input type="text" id="idCustomer" name="idCustomer" class="form-control" style="width: 100%" readonly>
                                    </div>
                                    <div class="col-md-1">
                                        <input type="text" id="jenisCustomer" name="jenisCustomer" class="form-control" style="width: 100%" readonly>
                                    </div>
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="noNotaKreditSelect" style="margin-right: 10px;">No. Nota Kredit</label>
                                    </div>
                                    <div class="col-md-5">
                                        <select id="noNotaKreditSelect" name="noNotaKreditSelect" class="form-control" readonly>

                                        </select>
                                    </div>
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="suratJalanSelect" style="margin-right: 10px;">Surat Jalan</label>
                                    </div>
                                    <div class="col-md-5">
                                        <select id="suratJalanSelect" name="suratJalanSelect" class="form-control" readonly>

                                        </select>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" id="suratjalan" name="suratjalan" class="form-control" style="width: 100%" readonly>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" id="idbarang" name="idbarang" class="form-control" style="width: 100%" readonly>
                                    </div>
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="namaBarang" style="margin-right: 10px;">Nama Barang</label>
                                    </div>
                                    <div class="col-md-7">
                                        <input type="text" id="namaBarang" name="namaBarang" value="" class="form-control" style="width: 100%" readonly>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" id="MIdRetur" name="MIdRetur" class="form-control" style="width: 100%" readonly>
                                    </div>
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="noPenagihan" style="margin-right: 10px;">No. Penagihan</label>
                                    </div>
                                    <div class="col-md-5">
                                        <input type="text" id="noPenagihan" name="noPenagihan" class="form-control" style="width: 100%" readonly>
                                    </div>
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="mataUang" style="margin-right: 10px;">Mata Uang</label>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="text" id="mataUang" name="mataUang" class="form-control" style="width: 100%" readonly>
                                    </div>
                                    <div class="col-md-2">
                                        <label for="nilaiKurs" style="margin-right: 10px;">Nilai Kurs</label>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="text" id="nilaiKurs" name="nilaiKurs" class="form-control" style="width: 100%" readonly>
                                    </div>
                                    <div class="col-md-1">
                                        <input type="text" id="idMataUang" name="idMataUang" class="form-control" style="width: 100%" readonly>
                                    </div>
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="jumlahRetur" style="margin-right: 10px;">Jumlah Retur</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="number" id="jumlahRetur" name="jumlahRetur" class="form-control" style="width: 100%" readonly>
                                    </div>
                                    <div class="col-md-1">
                                        <input type="text" id="satuan" name="satuan" class="form-control" style="width: 100%" readonly>
                                    </div>
                                    <div class="col-md-1">
                                        <label for="harga" style="margin-right: 10px;">Harga</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="number" id="harga" name="harga" class="form-control" style="width: 100%" readonly>
                                    </div>
                                    <div class="col-md-1 form-check">
                                        =
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" id="total" name="total" class="form-control" style="width: 100%" readonly>
                                    </div>
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="statusPelunasan" style="margin-right: 10px;">Status Pelunasan</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" id="statusPelunasan" name="statusPelunasan" class="form-control" style="width: 100%" readonly>
                                    </div>
                                    <div class="col-md-4"></div>
                                    <div class="col-md-1">
                                        <label for="discount" style="margin-right: 10px;">Discount</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="number" id="discount" name="discount" class="form-control" style="width: 100%" readonly>
                                    </div>
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="grandTotalRetur" style="margin-right: 10px;">Grand Total Retur</label>
                                    </div>
                                    <div class="col-md-4">
                                        <input type="text" id="grandTotalRetur" name="grandTotalRetur" class="form-control" style="width: 100%" readonly>
                                    </div>
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="terbilang" style="margin-right: 10px;">Terbilang</label>
                                    </div>
                                    <div class="col-md-9">
                                        <input type="text" id="terbilang" name="terbilang" class="form-control" style="width: 100%" readonly>
                                    </div>
                                </div>

                                <br><div>
                                    <div class="row">
                                        <div class="col-md-2">
                                            <input type="submit" id="btnTambahItem" name="btnTambahItem" value="Tambah Item" class="btn btn-primary">
                                        </div>
                                        <div class="col-md-2">
                                            <input type="submit" id="btnHapusItem" name="btnHapusItem" value="Hapus Item" class="btn btn-primary">
                                        </div>
                                    </div>
                                </div>

                                <br><div>
                                    <div style="overflow-y: auto; overflow-x: auto; max-height: 400px;">
                                        <table style="width: 100%; table-layout: fixed;" id="tabelNotaKreditRetur">
                                            <colgroup>
                                                <col style="width: 20%;">
                                                <col style="width: 20%;">
                                                <col style="width: 20%;">
                                                <col style="width: 20%;">
                                                <col style="width: 20%;">
                                            <thead class="table-dark">
                                                <tr>
                                                    <th>Customer</th>
                                                    <th>Surat Jalan</th>
                                                    <th>Nama Barang</th>
                                                    <th>No. Penagihan</th>
                                                    <th>Totak retur</th>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <br><div>
                                    <div class="row">
                                        <div class="col-md-2">
                                            <input type="submit" id="btnIsi" name="btnIsi" value="Isi" class="btn btn-primary">
                                            <input type="submit" id="btnSimpan" name="btnSimpan" value="Simpan" class="btn btn-primary" style="display: none">
                                        </div>
                                        <div class="col-md-2">
                                            <input type="submit" id="btnKoreksi" name="btnKoreksi" value="Koreksi" class="btn btn-primary">
                                            <input type="submit" id="btnBatal" name="btnBatal" value="Batal" class="btn btn-primary" style="display: none">
                                        </div>
                                        <div class="col-md-2">
                                            <input type="submit" id="btnHapus" name="btnHapus" value="Hapus" class="btn btn-primary">
                                        </div>
                                        <div class="col-md-2">
                                            <input type="submit" id="btnKeluar" name="btnKeluar" value="Keluar" class="btn btn-primary">
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<script src="{{ asset('js/Piutang/MaintenanceNotaKredit/NotaKreditRetur.js') }}"></script>
@endsection
