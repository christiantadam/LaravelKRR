@extends('layouts.appAccounting')
@section('content')
@section('title', 'Maintenance Pelunasan Penjualan')

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Maintenance Pelunasan Penjualan</div>
                    @if (Session::has('success'))
                        <div class="alert alert-success">
                            {{ Session::get('success') }}
                        </div>
                    @endif
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            <form method="POST" action="{{ url('MaintenancePelunasanPenjualan') }}" id="formkoreksi">
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
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="namaCustomerSelect" style="margin-right: 10px;">Nama Customer</label>
                                    </div>
                                    <div class="col-md-6">
                                        <select id="namaCustomerSelect" name="namaCustomerSelect" class="form-control" readonly>

                                        </select>
                                    </div>
                                    <div class="col-md-1">
                                        <input type="text" id="idCustomer" name="idCustomer" class="form-control" style="width: 100%" readonly>
                                    </div>
                                    <div class="col-md-1">
                                        <input type="text" id="idJenisCustomer" name="idJenisCustomer" class="form-control" style="width: 100%" readonly>
                                    </div>
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="noPelunasanSelect" style="margin-right: 10px;">No. Pelunasan</label>
                                    </div>
                                    <div class="col-md-5">
                                        <select id="noPelunasanSelect" name="noPelunasanSelect" class="form-control" readonly>

                                        </select>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" id="IdPelunasan" name="IdPelunasan" class="form-control" style="width: 100%" readonly>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" id="Id_Pelunasan" name="Id_Pelunasan" class="form-control" style="width: 100%" readonly>
                                    </div>
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="jenisPembayaranSelect" style="margin-right: 10px;">Jenis Pembayaran</label>
                                    </div>
                                    <div class="col-md-5">
                                        <select id="jenisPembayaranSelect" name="jenisPembayaranSelect" class="form-control" readonly>

                                        </select>
                                    </div>
                                    <div class="col-md-1">
                                        <input type="text" id="idJenisPembayaran" name="idJenisPembayaran" class="form-control" style="width: 100%" readonly>
                                    </div>
                                    <div class="col-md-1">
                                        <input type="text" id="statusBayar" name="statusBayar" class="form-control" style="width: 100%" readonly>
                                    </div>
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="informasiBankSelect" style="margin-right: 10px;">Informasi Bank</label>
                                    </div>
                                    <div class="col-md-5">
                                        <select id="informasiBankSelect" name="informasiBankSelect" class="form-control" readonly>

                                        </select>
                                    </div>
                                    <div class="col-md-1">
                                        <input type="text" id="idReferensi" name="idReferensi" class="form-control" style="width: 100%" readonly>
                                    </div>
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="mataUangSelect" style="margin-right: 10px;">Mata Uang</label>
                                    </div>
                                    <div class="col-md-5">
                                        <select id="mataUangSelect" name="mataUangSelect" class="form-control" readonly>

                                        </select>
                                    </div>
                                    <div class="col-md-1">
                                        <input type="text" id="idMataUang" name="idMataUang" class="form-control" style="width: 100%" readonly>
                                    </div>
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="nilaiMasukKas" style="margin-right: 10px;">Nilai Masuk Kas</label>
                                    </div>
                                    <div class="col-md-5">
                                        <input type="number" id="nilaiMasukKas" name="nilaiMasukKas" class="form-control" style="width: 100%" readonly>
                                    </div>
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="buktiPelunasan" style="margin-right: 10px;">Bukti Pelunasan</label>
                                    </div>
                                    <div class="col-md-5">
                                        <input type="text" id="buktiPelunasan" name="buktiPelunasan" class="form-control" style="width: 100%" readonly>
                                    </div>
                                </div>

                                <br><div>
                                    <div class="row">
                                        <div class="col-md-2">
                                            <input type="submit" id="btnAddItem" name="btnAddItem" value="Add Item" class="btn btn-primary">
                                        </div>
                                        <div class="col-md-2">
                                            <input type="submit" id="btnEditItem" name="btnEditItem" value="Edit Item" class="btn btn-primary">
                                        </div>
                                        <div class="col-md-2">
                                            <input type="submit" id="btnDeleteItem" name="btnDeleteItem" value="Delete Item" class="btn btn-primary">
                                        </div>
                                    </div>
                                </div>

                                <br><div>
                                    <div style="overflow-y: auto; overflow-x: auto; max-height: 400px;">
                                        <table style="width: 165%; table-layout: fixed;" id="tabelPelunasanPenjualan">
                                            <colgroup>
                                                <col style="width: 15%;">
                                                <col style="width: 15%;">
                                                <col style="width: 15%;">
                                                <col style="width: 15%;">
                                                <col style="width: 15%;">
                                                <col style="width: 15%;">
                                                <col style="width: 15%;">
                                                <col style="width: 15%;">
                                                <col style="width: 15%;">
                                                <col style="width: 15%;">
                                                <col style="width: 20%;">
                                            <thead class="table-dark">
                                                <tr>
                                                    <th>Id. Penagihan</th>
                                                    <th>Nilai Pelunasan</th>
                                                    <th>Biaya</th>
                                                    <th>Lunas</th>
                                                    <th>Id. Detail Pelunasan</th>
                                                    <th>Pelunasan Rupiah</th>
                                                    <th>Mata Uang</th>
                                                    <th>Pelunasan Currency</th>
                                                    <th>Kurang Lebih</th>
                                                    <th>Perkiraan</th>
                                                    <th>ID_Tagihan_Pembulatan</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="hidden" id="tabelIdDetailPelunasan" name="tabelIdDetailPelunasan" class="form-control" style="width: 100%">
                                    </div>
                                    <div class="col-md-2">
                                        <input type="hidden" id="tabelIdPenagihan" name="tabelIdPenagihan" class="form-control" style="width: 100%">
                                    </div>
                                    <div class="col-md-2">
                                        <input type="hidden" id="tabelNilaiPelunasan" name="tabelNilaiPelunasan" class="form-control" style="width: 100%">
                                    </div>
                                    <div class="col-md-2">
                                        <input type="hidden" id="tabelPelunasanRupiah" name="tabelPelunasanRupiah" class="form-control" style="width: 100%">
                                    </div>
                                    <div class="col-md-2">
                                        <input type="hidden" id="tabelBiaya" name="tabelBiaya" class="form-control" style="width: 100%">
                                    </div>
                                    <div class="col-md-2">
                                        <input type="hidden" id="tabelLunas" name="tabelLunas" class="form-control" style="width: 100%">
                                    </div>
                                    <div class="col-md-2">
                                        <input type="hidden" id="tabelPelunasanCurrency" name="tabelPelunasanCurrency" class="form-control" style="width: 100%">
                                    </div>
                                    <div class="col-md-2">
                                        <input type="hidden" id="tabelKurangLebih" name="tabelKurangLebih" class="form-control" style="width: 100%">
                                    </div>
                                    <div class="col-md-2">
                                        <input type="hidden" id="tabelKodePerkiraan" name="tabelKodePerkiraan" class="form-control" style="width: 100%">
                                    </div>
                                    <div class="col-md-2">
                                        <input type="hidden" id="tabelIdDetail" name="tabelIdDetail" class="form-control" style="width: 100%">
                                    </div>
                                    <div class="col-md-2">
                                        <input type="hidden" id="hAtauB" name="hAtauB" class="form-control" style="width: 100%">
                                    </div>
                                </div>
                                <br>
                                <div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="totalPelunasan" style="margin-right: 10px;">Total Pelunasan</label>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="number" id="totalPelunasan" name="totalPelunasan" class="form-control" style="width: 100%" readonly>
                                    </div>
                                    <div class="col-md-2">
                                        <label for="nilaiPiutang" style="margin-right: 10px;">Nilai Piutang</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="number" id="nilaiPiutang" name="nilaiPiutang" class="form-control" style="width: 100%" readonly>
                                    </div>
                                </div>
                                <p><div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="totalBiaya" style="margin-right: 10px;">Total Biaya</label>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="number" id="totalBiaya" name="totalBiaya" class="form-control" style="width: 100%" readonly>
                                    </div>
                                    <div class="col-md-2">
                                        <label for="kurangLebih" style="margin-right: 10px;">Kurang/Lebih</label>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="number" id="kurangLebih" name="kurangLebih" class="form-control" style="width: 100%" readonly>
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <input type="text" id="arrayDetail" name="arrayDetail" class="form-control" style="width: 100%" readonly>
                                </div>
                                <div class="col-md-3">
                                    <input type="text" id="arrayPenagihan" name="arrayIdPen" class="form-control" style="width: 100%" readonly>
                                </div>

                                <br><div>
                                    <div class="row">
                                        <div class="col-md-2">
                                            <input type="submit" id="btnIsi" name="btnIsi" value="Isi" class="btn btn-primary">
                                            <input type="submit" id="btnSimpan" name="btnSimpan" value="Simpan" class="btn btn-success" style="display: none">
                                        </div>
                                        <div class="col-md-2">
                                            <input type="submit" id="btnKoreksi" name="btnKoreksi" value="Koreksi" class="btn btn-warning">
                                            <input type="submit" id="btnBatal" name="btnBatal" value="Batal" class="btn btn-warning" style="display: none">
                                        </div>
                                        <div class="col-md-2">
                                            <input type="submit" id="btnHapus" name="btnHapus" value="Hapus" class="btn btn-danger">
                                        </div>
                                    </div>
                                </div>
                            </form>

                            <!--MODAL FrmLihatPenagihan-->
                            <div class="modal fade" id="modalLihatPenagihan" tabindex="-1" role="dialog" aria-labelledby="pilihBankModal" aria-hidden="true">
                                <div class="modal-dialog modal-lg" role="document">
                                    <div class="modal-content" style="padding: 25px;">
                                        <div class="modal-header">
                                            <h5 class="modal-title">Pengisian Pelunasan Tagihan</h5>
                                            <button type="button" class="close" data-dismiss="modal"
                                                aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <form action="{{ url('MaintenancePelunasanPenjualan') }}" id="formLihatPenagihan" method="POST">
                                            {{ csrf_field() }}
                                            <input type="hidden" name="_method" id="methodLihatPenagihan">

                                            <div class="row" style="padding-left: 20px">
                                                <div class="col-md-4">
                                                    <input type="radio" name="radiogrup1" value="1" id="pelunasan">
                                                    <label for="biaya">Pelunasan</label>
                                                </div>
                                                <div class="col-md-4">
                                                    <input type="radio" name="radiogrup1" value="2" id="biayaditanggung">
                                                    <label for="lainlain">Biaya Ditanggung</label>
                                                </div>
                                                <div class="col-md-4">
                                                    <input type="radio" name="radiogrup1" value="3" id="kuranglebih">
                                                    <label for="negoEkspor">Kurang/Lebih</label>
                                                </div>
                                            </div>

                                            <div class="card" style>
                                                <b>Rincian Pelunasan</b>
                                                <div class="d-flex">
                                                    <div class="col-md-4">
                                                        <label for="noPenagihan" style="margin-right: 10px;">No. Penagihan</label>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <select id="noPenagihan" name="noPenagihan" class="form-control" readonly>

                                                        </select>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <input type="text" id="noPen" name="noPen" class="form-control"style="width: 100%" readonly>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <input type="text" id="no_Pen" name="no_Pen" class="form-control"style="width: 100%" readonly>
                                                    </div>
                                                </div>
                                                <p><div class="d-flex">
                                                    <div class="col-md-4">
                                                        <label for="idBKM" style="margin-right: 10px;">Nilai Penagihan</label>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <input type="text" id="nilaiPenagihan" name="nilaiPenagihan" class="form-control" style="width: 100%" readonly>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <input type="text" id="mataUangPenagihan" name="mataUangPenagihan" class="form-control" style="width: 100%" readonly>
                                                    </div>
                                                </div>
                                                <p><div class="d-flex">
                                                    <div class="col-md-4">
                                                        <label for="nilaiKurs" style="margin-right: 10px;">Nilai Kurs</label>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <input type="text" id="nilaiKurs" name="nilaiKurs" class="form-control" style="width: 100%" readonly>
                                                    </div>
                                                </div>
                                                <p><div class="d-flex">
                                                    <div class="col-md-4">
                                                        <label for="terbayar" style="margin-right: 10px;">Pembayaran Currency</label>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <input type="number" id="terbayar" name="terbayar" class="form-control" style="width: 100%" readonly>
                                                    </div>
                                                    <div class="col-md-3"></div>
                                                    <div class="col-md-2">
                                                        <input type="number" id="sisa" name="sisa" class="form-control" style="width: 100%" readonly>
                                                    </div>
                                                </div>
                                                <p><div class="d-flex">
                                                    <div class="col-md-4">
                                                        <label for="terbayarRupiah" style="margin-right: 10px;">Pembayaran (Rupiah)</label>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <input type="number" id="terbayarRupiah" name="terbayarRupiah" class="form-control" style="width: 100%" readonly>
                                                    </div>
                                                    <div class="col-md-3"></div>
                                                    <div class="col-md-2">
                                                        <input type="number" id="sisaRupiah" name="sisaRupiah" class="form-control" style="width: 100%" readonly>
                                                    </div>
                                                </div>

                                                <br><div class="d-flex">
                                                    <div class="col-md-4">
                                                        <label for="jumlahYangDibayar" style="margin-right: 10px;">Jumlah Yang Dibayar</label>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <input type="number" id="jumlahYangDibayar" name="jumlahYangDibayar" class="form-control" style="width: 100%" readonly>
                                                    </div>
                                                    <div class="col-md-4" style="color: blue">
                                                        Wajib Dienter
                                                    </div>
                                                </div>
                                                <p><div class="d-flex">
                                                    <div class="col-md-4">
                                                        <label for="pelunasanCurrency" style="margin-right: 10px;">Nilai Pelunasan (Currency)</label>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <input type="number" id="pelunasanCurrency" name="pelunasanCurrency" class="form-control" style="width: 100%" readonly>
                                                    </div>
                                                </div>
                                                <p><div class="d-flex">
                                                    <div class="col-md-4">
                                                        <label for="pelunasanRupiah" style="margin-right: 10px;">Nilai Pelunasan (Rupiah)</label>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <input type="number" id="pelunasanRupiah" name="pelunasanRupiah" class="form-control" style="width: 100%" readonly>
                                                    </div>
                                                </div>
                                                <p><div class="d-flex">
                                                    <div class="col-md-4">
                                                        <label for="lunas" style="margin-right: 10px;">Lunas (Y/N)</label>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <input type="text" id="lunas" name="lunas" class="form-control" style="width: 100%" readonly>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="card" style>
                                                <b>Biaya Ditanggung</b>
                                                <div class="d-flex">
                                                    <div class="col-md-4">
                                                        <label for="nilaiBiaya" style="margin-right: 10px;">Nilai Biaya</label>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <input type="number" id="nilaiBiaya" name="nilaiBiaya" class="form-control" style="width: 100%" readonly>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card" style>
                                                <div class="d-flex">
                                                    <div class="col-md-4">
                                                        <label for="nilaiKurangLebih" style="margin-right: 10px;">Nilai Kurang/Lebih</label>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <input type="number" id="nilaiKurangLebih" name="nilaiKurangLebih" class="form-control" style="width: 100%" readonly>
                                                    </div>
                                                </div>
                                                <p><div class="d-flex">
                                                    <div class="col-md-4">
                                                        <label for="noPenagihan1" style="margin-right: 10px;">No. Penagihan</label>
                                                    </div>
                                                    <div class="col-md-5">
                                                        <select id="noPenagihan1" name="noPenagihan1" class="form-control" readonly>

                                                        </select>
                                                    </div>
                                                    <div class="col-md-1">
                                                        <input type="text" id="noPen1" name="noPen1" class="form-control" style="width: 100%" readonly>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <input type="text" id="no_Pen1" name="no_Pen1" class="form-control" style="width: 100%" readonly>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="d-flex">
                                                <div class="col-md-4">
                                                    <label for="kodePerkiraanSelect" style="margin-right: 10px;">Kode Perkiraan</label>
                                                </div>
                                                <div class="col-md-5">
                                                    <select id="kodePerkiraanSelect" name="kodePerkiraanSelect" class="form-control" readonly>

                                                    </select>
                                                </div>
                                                <div class="col-md-2">
                                                    <input type="text" id="idKodePerkiraan" name="idKodePerkiraan" class="form-control" style="width: 100%" readonly>
                                                </div>
                                            </div>

                                            <br><div class="row">
                                                <div class="col-md-2">
                                                    <input type="submit" id="btnSimpanModal" name="btnSimpanModal" value="Simpan" class="btn btn-success">
                                                </div>
                                                <div class="col-md-2">
                                                    <input type="submit" id="btnKeluar" name="btnKeluar" value="Keluar" class="btn btn-primary">
                                                </div>
                                            </div>
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
<script src="{{ asset('js/Accounting/Piutang/MaintenancePelunasanPenjualan.js') }}"></script>
@endsection
