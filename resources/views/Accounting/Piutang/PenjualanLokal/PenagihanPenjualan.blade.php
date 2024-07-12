@extends('layouts.appAccounting')
@section('content')
@section('title', 'Penagihan Penjualan')

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-11 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Maintenance Penagihan Surat Jalan</div>
                    @if (Session::has('success'))
                        <div class="alert alert-success">
                            {{ Session::get('success') }}
                        </div>
                    @endif
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            <form method="POST" action="{{ url('PenagihanPenjualan') }}" id="formkoreksi">
                                {{csrf_field()}}
                                <input type="hidden" name="_method" id="methodkoreksi">
                                <!-- Form fields go here -->
                                <div class="card" style="display: flex;">
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="tanggal" style="margin-right: 10px;">Tanggal</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="date" id="tanggal" name="tanggal" class="form-control" style="width: 100%">
                                        </div>
                                    </div>
                                    <p><div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="namaCustomerSelect" style="margin-right: 10px;">Nama Customer</label>
                                        </div>
                                        <div class="col-md-5">
                                            <select id="namaCustomerSelect" name="namaCustomerSelect" class="form-control" readonly>

                                            </select>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="text" id="idCustomer" name="idCustomer" class="form-control" style="width: 100%" readonly>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="text" id="idJenisCustomer" name="idJenisCustomer" class="form-control" style="width: 100%" readonly>
                                        </div>
                                    </div>
                                    <p><div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="noPenagihanSelect" style="margin-right: 10px;">No. Penagihan</label>
                                        </div>
                                        <div class="col-md-5">
                                            <select id="noPenagihanSelect" name="noPenagihanSelect" class="form-control" readonly>

                                            </select>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="text" id="IdPenagihan" name="IdPenagihan" class="form-control" style="width: 100%" readonly>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="text" id="id_Penagihan" name="IdPenagihan" class="form-control" style="width: 100%" readonly>
                                        </div>
                                    </div>
                                    <p><div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="jnsCustomer" style="margin-right: 10px;">Jenis Customer</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="text" id="jnsCustomer" name="jnsCustomer" class="form-control" style="width: 100%" readonly>
                                        </div>
                                    </div>
                                    <p><div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="alamat" style="margin-right: 10px;">Alamat</label>
                                        </div>
                                        <div class="col-md-7">
                                            <input type="text" id="alamat" name="alamat" class="form-control" style="width: 100%" readonly>
                                        </div>
                                    </div>
                                    <p><div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="nomorSPSelect" style="margin-right: 10px;">Nomor SP</label>
                                        </div>
                                        <div class="col-md-3">
                                            <select name="nomorSPSelect" id="nomorSPSelect" class="form-control" readonly>

                                            </select>
                                        </div>
                                        <div class="col-md-1">
                                            <input type="text" id="noSP" name="noSP" class="form-control" style="width: 100%" readonly>
                                        </div>
                                        <div class="col-md-2">
                                            <label for="nomorPO" style="margin-right: 10px;">Nomor PO</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="text" id="nomorPO" name="nomorPO" class="form-control" style="width: 100%" readonly>
                                        </div>
                                    </div>
                                    <p><div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="nomorSP" style="margin-right: 10px;">Mata Uang</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="text" id="namaMataUang" name="namaMataUang" class="form-control" style="width: 100%" readonly>
                                        </div>
                                        <div class="col-md-1">
                                            <input type="text" id="idMataUang" name="idMataUang" class="form-control" style="width: 100%" readonly>
                                        </div>
                                        <div class="col-md-2">
                                            <label for="nilaiKurs" style="margin-right: 10px;">Nilai Kurs</label>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="number" id="nilaiKurs" name="nilaiKurs" class="form-control" style="width: 100%" readonly>
                                        </div>
                                    </div>
                                    <p><div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="penagihanPajak" style="margin-right: 10px;">Penagihan Pajak</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="date" id="penagihanPajak" name="penagihanPajak" class="form-control" style="width: 100%" readonly>
                                        </div>
                                        <div class="col-md-1">

                                        </div>
                                        <div class="col-md-2">
                                            <label for="penagihanPajak" style="margin-right: 10px;">Syarat Pembayaran</label>
                                        </div>
                                        <div class="col-md-1">
                                            <input type="text" id="syaratPembayaran" name="syaratPembayaran" class="form-control" style="width: 100%" readonly>
                                        </div>
                                        <div class="col-md-1">
                                            <label for="penagihanPajak" style="margin-right: 10px;">Hari</label>
                                        </div>
                                    </div>
                                    <p><div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="userPenagihSelect" style="margin-right: 10px;">User Penagih</label>
                                        </div>
                                        <div class="col-md-5">
                                            <select name="userPenagihSelect" id="userPenagihSelect" class="form-control" readonly>

                                            </select>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="number" id="idUserPenagih" name="idUserPenagih" class="form-control" style="width: 100%" readonly>
                                        </div>
                                    </div>
                                    <p><div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="jenisPajakSelect" style="margin-right: 10px;">Jenis Pajak</label>
                                        </div>
                                        <div class="col-md-2">
                                            <select name="jenisPajakSelect" id="jenisPajakSelect" class="form-control" readonly>

                                            </select>
                                        </div>
                                        <div class="col-md-1">
                                            <label for="PPN" style="margin-right: 10px;">PPN%</label>
                                        </div>
                                        <div class="col-md-1">
                                            <input type="number" id="Ppn" name="Ppn" class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-2">
                                            <label for="noPenagihanUMSelect" style="margin-right: 10px;">No. Penagihan UM</label>
                                        </div>
                                        <div class="col-md-3">
                                            <select name="noPenagihanUMSelect" id="noPenagihanUMSelect" class="form-control">

                                            </select>
                                        </div>
                                        <div class="col-md-1">
                                            <input type="number" id="idJenisPajak" name="idJenisPajak" class="form-control" style="width: 100%">
                                        </div>
                                    </div>
                                </div>

                                <!--CARD 2-->
                                <div class="card">
                                <br><div>
                                    <div style="overflow-y: auto; max-height: 400px;">
                                        <table style="width: 100%; table-layout: fixed;">
                                            <colgroup>
                                                <col style="width: 25%;">
                                                <col style="width: 25%;">
                                                <col style="width: 25%;">
                                                <col style="width: 25%;">
                                            <thead class="table-dark">
                                                <tr>
                                                    <th>Surat Jalan</th>
                                                    <th>Tanggal</th>
                                                    <th>Nilai Penagihan</th>
                                                    <th>Surat Pesanan</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Data 1</td>
                                                    <td>Data 2</td>
                                                    <td>Data 3</td>
                                                    <td>Data 4</td>
                                                </tr>
                                                <!-- Tambahkan baris lainnya jika diperlukan -->
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-10">
                                        <input type="submit" id="btnLihatItem" name="btnLihatItem" value="Lihat Item" class="btn d-flex ml-auto">
                                    </div>
                                    <div class="col-md-2">
                                        <input type="submit" id="btnHapusItem" name="btnHapusItem" value="Hapus Item" class="btn d-flex ml-auto">
                                    </div>
                                </div>
                                <br>
                                <p><div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="suratJalanSelect" style="margin-right: 10px;">Surat Jalan</label>
                                    </div>
                                    <div class="col-md-3">
                                        <select name="suratJalanSelect" id="suratJalanSelect" class="form-control">

                                        </select>
                                    </div>
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="dokumen" style="margin-right: 10px;">Dokumen</label>
                                    </div>
                                    <div class="col-md-3">
                                        <select name="dokumenSelect" id="dokumen" class="form-control">
                                            <option value=""></option>
                                            <option value="Dokumen 1">Dok1</option>
                                            <option value="Dokumen 2">Dok2</option>
                                        </select>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="text" id="idDokumen" name="idDokumen" class="form-control" style="width: 100%">
                                    </div>
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="noBC24" style="margin-right: 10px;">No. BC 2.4</label>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="number" id="noBC24" name="noBC24" class="form-control" style="width: 100%">
                                    </div>
                                    <div class="col-md-2">
                                        <label for="tanggalBC24" style="margin-right: 10px;">Tanggal BC 2.4</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="date" id="tanggalBC24" name="tanggalBC24" class="form-control" style="width: 100%">
                                    </div>
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="nilaiPenagihan" style="margin-right: 10px;">Nilai Penagihan</label>
                                    </div>
                                    <div class="col-md-4">
                                        <input type="text" id="nilaiPenagihan" name="nilaiPenagihan" class="form-control" style="width: 100%">
                                    </div>
                                    <div class="col-md-2">
                                        <label for="nilaiUangMuka" style="margin-right: 10px;">Nilai Uang Muka</label>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="number" id="nilaiUangMuka" name="nilaiUangMuka" class="form-control" style="width: 100%">
                                    </div>
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="terbilang" style="margin-right: 10px;">Terbilang</label>
                                    </div>
                                    <div class="col-md-9">
                                        <input type="number" id="terbilang" name="terbilang" class="form-control" style="width: 100%">
                                    </div>
                                </div>

                                <br><div>
                                    <div class="row">
                                        <div class="col-md-1">
                                            <input type="submit" id="btnIsi" name="btnIsi" value="Isi" class="btn btn-primary">
                                            <input type="submit" id="btnSimpan" name="btnSimpan" value="Simpan" class="btn btn-success" style="display: none">
                                        </div>
                                        <div class="col-md-2">
                                            <input type="submit" id="btnKoreksi" name="btnKoreksi" value="Koreksi" class="btn btn-warning">
                                            <input type="submit" id="btnBatal" name="btnBatal" value="Batal" class="btn btn-warning" style="display: none">
                                        </div>
                                        <div class="col-md-2">
                                            <input type="submit" id="btnHapus" name="btnHapus" value="Hapus" class="btn btn-danger d-flex ml-auto">
                                        </div>
                                        <div class="col-md-2">
                                            <input type="submit" name="keluar" value="Keluar" class="btn btn-primary d-flex ml-auto">
                                        </div>
                                    </div>
                                </div>
                            </form>

                            <!--MODAL LIHAT ITEM-->
                            <div class="modal fade" id="modalLihatItem" tabindex="-1" role="dialog" aria-labelledby="pilihBankModal" aria-hidden="true">
                                <div class="modal-dialog modal-lg" role="document">
                                    <div class="modal-content" style="padding: 25px;">
                                        <div class="modal-header">
                                            <h5 class="modal-title">Surat Jalan yang Ditagihkan</h5>
                                            <button type="button" class="close" data-dismiss="modal"
                                                aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <form action="{{ url('PenagihanPenjualan') }}" id="formLihatItem" method="POST">
                                            {{ csrf_field() }}
                                            <input type="hidden" name="_method" id="methodLihatItem">

                                            <div style="overflow-x: auto; overflow-y: auto; max-height: 250px;">
                                                <table style="width: 120%; table-layout: fixed;"id="tabelTampilBKK">
                                                    <colgroup>
                                                        <col style="width: 30%;">
                                                        <col style="width: 30%;">
                                                        <col style="width: 30%;">
                                                        <col style="width: 30%;">
                                                    </colgroup>
                                                    <thead class="table-dark">
                                                        <tr>
                                                            <th>Nama Type</th>
                                                            <th>Kwantum</th>
                                                            <th>Harga Satuan</th>
                                                            <th>Satuan</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <br><div class="d-flex">
                                                <div class="col-md-2">
                                                    <label for="idBKKTampil" style="margin-right: 10px;">Total</label>
                                                </div>
                                                <div class="col-md-6">

                                                </div>
                                                <div class="col-md-2">
                                                    <button id="btnSimpanLihat" name="btnSimpanLihat" >Simpan</button>
                                                </div>
                                                <div class="col-md-2">
                                                    <button id="btnKeluarr" name="btnKeluarr">Keluar</button>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <input type="text" id="totalLihat" name="totalLihat" class="form-control" style="width: 100%">
                                            </div>
                                            {{-- <input type="hidden" name="cetak" id="cetak" value="cetakBKK"> --}}
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<script src="{{ asset('js/Piutang/PenjualanLokal/PenagihanPenjualan.js') }}"></script>
@endsection
