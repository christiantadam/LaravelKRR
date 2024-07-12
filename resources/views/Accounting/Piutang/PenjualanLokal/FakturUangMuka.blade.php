@extends('layouts.appAccounting')
@section('content')
@section('title', 'Faktur Uang Muka')

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-12 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">FAKTUR UANG MUKA</div>
                    @if (Session::has('success'))
                        <div class="alert alert-success">
                            {{ Session::get('success') }}
                        </div>
                    @endif
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            <form method="POST" action="{{ url('FakturUangMuka') }}" id="formkoreksi">
                                {{csrf_field()}}
                                <input type="hidden" name="_method" id="methodkoreksi">
                                <!-- Form fields go here -->
                                <div class="card" style="display: flex;">
                                    <div  style="width: 100%;">
                                        <div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="tanggal" style="margin-right: 10px;">Tanggal</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="date" id="tanggal" name="tanggal" class="form-control" style="width: 100%" readonly>
                                            </div>
                                        </div>
                                        <p><div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="namaCustomer" style="margin-right: 10px;">Nama Customer</label>
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
                                                <label for="jenisCustomer" style="margin-right: 10px;">Jenis Customer</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="text" id="jenisCustomer" name="jenisCustomer" class="form-control" style="width: 100%" readonly>
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
                                            <div class="col-md-3">
                                                <select name="jenisPajakSelect" id="jenisPajakSelect" class="form-control" readonly>

                                                </select>
                                            </div>
                                            <div class="col-md-1">
                                                <label for="PPN" style="margin-right: 10px;">PPN%</label>
                                            </div>
                                            <div class="col-md-2">
                                                <input type="number" id="Ppn" name="Ppn" class="form-control" style="width: 100%" readonly>
                                            </div>
                                            <div class="col-md-1">
                                                <input type="text" id="idJenisPajak" name="idJenisPajak" class="form-control" style="width: 100%">
                                            </div>
                                        </div>
                                        <p><div class="d-flex">
                                            <div class="col-md-3">
                                                <label for="dokumenSelect" style="margin-right: 10px;">Dokumen</label>
                                            </div>
                                            <div class="col-md-3">
                                                <select id="dokumenSelect" name="dokumenSelect" id="dokumen" class="form-control" readonly>

                                                </select>
                                            </div>
                                            <div class="col-md-2">
                                                <input type="text" id="idJenisDokumen" name="idJenisDokumen" class="form-control" style="width: 100%">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!--CARD 2-->
                                <br>
                                <div class="card">
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="uangMasuk" style="margin-right: 10px;">Uang Masuk</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="text" id="uangMasuk" name="uangMasuk" class="form-control" style="width: 100%" readonly>
                                        </div>
                                        <div class="col-md-2">
                                           Enter
                                        </div>
                                        <div class="col-md-1">
                                            <label for="total" style="margin-right: 10px;">Total</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="text" id="total" name="total" class="form-control" style="width: 100%" readonly>
                                        </div>
                                    </div>
                                    <p><div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="nilaiSblmPPN" style="margin-right: 10px;">Nilai Sblm PPN</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="number" id="nilaiSblmPPN" name="nilaiSblmPPN" class="form-control" style="width: 100%" readonly>
                                        </div>
                                    </div>
                                    <p><div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="nilaiPpn" style="margin-right: 10px;">Nilai Ppn</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="number" id="nilaiPpn" name="nilaiPpn" class="form-control" style="width: 100%" readonly>
                                        </div>
                                    </div>
                                    <p><div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="terbilang" style="margin-right: 10px;">Terbilang</label>
                                        </div>
                                        <div class="col-md-9">
                                            <input type="number" id="terbilang" name="terbilang" class="form-control" style="width: 100%" readonly>
                                        </div>
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
                                            <input type="submit" id="btnHapus" name="btnHapus" value="Hapus" class="btn btn-danger">
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
<script src="{{ asset('js/Piutang/PenjualanLokal/FakturUangMuka.js') }}"></script>
@endsection
