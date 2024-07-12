@extends('layouts.appAccounting')
@section('content')
@section('title', 'Maint Penagihan Surat Jalan Export')

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Maint Penagihan Surat Jalan Ekspor</div>
                    @if (Session::has('success'))
                        <div class="alert alert-success">
                            {{ Session::get('success') }}
                        </div>
                    @endif
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            <form method="POST" action="{{ url('PenagihanPenjualanExport') }}" id="formkoreksi">
                                {{csrf_field()}}
                                <input type="hidden" name="_method" id="methodkoreksi">
                                <!-- Form fields go here -->
                                <div>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="tanggal" style="margin-right: 10px;">Tanggal</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="date" id="tanggal" name="tanggal" class="form-control" style="width: 100%" readonly>
                                        </div>
                                    </div>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="namaCustomerSelect" style="margin-right: 10px;">Nama Customer</label>
                                        </div>
                                        <div class="col-md-7">
                                            <select name="namaCustomerSelect" id="namaCustomerSelect" class="form-control" readonly>

                                            </select>
                                        </div>
                                        <div class="col-md-1">
                                            <input type="text" id="idCustomer" name="idCustomer" class="form-control" style="width: 100%" readonly>
                                        </div>
                                        <div class="col-md-1">
                                            <input type="text" id="idJenisCustomer" name="idJenisCustomer" class="form-control" style="width: 100%" readonly>
                                        </div>
                                    </div>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="noPenagihanSelect" style="margin-right: 10px;">No. Penagihan</label>
                                        </div>
                                        <div class="col-md-5">
                                            <select id="noPenagihanSelect" name="noPenagihanSelect" class="form-control" readonly>

                                            </select>
                                        </div>
                                    </div>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="suratJalanSelect" style="margin-right: 10px;">Surat Jalan</label>
                                        </div>
                                        <div class="col-md-3">
                                            <select id="suratJalanSelect" name="suratJalanSelect" class="form-control" readonly>

                                            </select>
                                        </div>
                                    </div>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="mataUang" style="margin-right: 10px;">Mata Uang</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="text" id="mataUang" name="mataUang" class="form-control" style="width: 100%" readonly>
                                        </div>
                                    </div>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="nilaiKurs" style="margin-right: 10px;">Nilai Kurs</label>
                                        </div>
                                        <div class="col-md-4">
                                            <input type="text" id="nilaiKurs" name="nilaiKurs" class="form-control" style="width: 100%" readonly>
                                        </div>
                                    </div>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="dokumen" style="margin-right: 10px;">Dokumen</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="text" id="dokumen" name="dokumen" class="form-control" style="width: 100%" readonly>
                                        </div>
                                    </div>
                                    <div class="d-flex">
                                        <div class="col-md-3">
                                            <label for="userPenagihSelect" style="margin-right: 10px;">User Penagih</label>
                                        </div>
                                        <div class="col-md-5">
                                            <select name="userPenagihSelect" id="userPenagihSelect" class="form-control" readonly>

                                            </select>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="submit" id="btnLihatItem" name="btnLihatItem" value="Lihat Item" class="btn btn-primary d-flex ml-auto">
                                        </div>
                                        <div class="col-md-2">
                                            <input type="submit" id="btnHapusItem" name="btnHapusItem" value="Hapus Item" class="btn btn-primary d-flex ml-auto">
                                        </div>
                                    </div>
                                </div>

                                <!--CARD 2-->
                                <br><div>
                                    <div style="overflow-y: auto; max-height: 400px;">
                                        <table style="width: 100%; table-layout: fixed;" id="tabelPenagihanPenjualanEx">
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
                                                    <th>Nilai FOB</th>
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
                                        <label for="noPEB" style="margin-right: 10px;">No. PEB</label>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="number" id="noPEB" name="noPEB" class="form-control" style="width: 100%" readonly>
                                    </div>
                                    <div class="col-md-2">
                                        <label for="tanggalPEB" style="margin-right: 10px;">Tanggal PEB</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="date" id="tanggalPEB" name="tanggalPEB" class="form-control" style="width: 100%" readonly>
                                    </div>
                                </div>
                                <div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="noBL" style="margin-right: 10px;">No. BL</label>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="number" id="noBL" name="noBL" class="form-control" style="width: 100%" readonly>
                                    </div>
                                    <div class="col-md-2">
                                        <label for="tanggalBL" style="margin-right: 10px;">Tanggal BL</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="date" id="tanggalBL" name="tanggalBL" class="form-control" style="width: 100%" readonly>
                                    </div>
                                </div>
                                <div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="nilaiDitagihkan" style="margin-right: 10px;">Nilai yang Ditagihkan</label>
                                    </div>
                                    <div class="col-md-4">
                                        <input type="text" id="nilaiDitagihkan" name="nilaiDitagihkan" class="form-control" style="width: 100%" readonly>
                                    </div>
                                </div>
                                <div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="terbilang" style="margin-right: 10px;">Terbilang</label>
                                    </div>
                                    <div class="col-md-9">
                                        <input type="text" id="terbilang" name="terbilang" class="form-control" style="width: 100%" readonly>
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
                                            <input type="submit" id="btnHapus" name="btnHapus" value="Hapus" class="btn btn-primary d-flex ml-auto">
                                        </div>
                                        <div class="col-md-1">
                                            <input type="submit" id="btnHapus" name="btnHapus" value="Keluar" class="btn btn-primary d-flex ml-auto">
                                        </div>
                                    </div>
                                </div>
                            </form>

                            <!--MODAL LIHAT ITEM-->
                            <div class="modal fade" id="modalLihatItem" tabindex="-1" role="dialog" aria-labelledby="pilihBankModal" aria-hidden="true">
                                <div class="modal-dialog modal-lg" role="document">
                                    <div class="modal-content" style="padding: 25px;">
                                        <div class="modal-header">
                                            <h5 class="modal-title">Detail Surat Jalan Export</h5>
                                            <button type="button" class="close" data-dismiss="modal"
                                                aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <form action="{{ url('PenagihanPenjualanExport') }}" id="formLihatItem" method="POST">
                                            {{ csrf_field() }}
                                            <input type="hidden" name="_method" id="methodLihatItem">

                                            <div style="overflow-x: auto; overflow-y: auto; max-height: 250px;">
                                                <table style="width: 210%; table-layout: fixed;"id="tabelTampilBKK">
                                                    <colgroup>
                                                        <col style="width: 30%;">
                                                        <col style="width: 30%;">
                                                        <col style="width: 30%;">
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
                                                            <th>Total</th>
                                                            <th>Retur</th>
                                                            <th>Total FOB</th>
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
                                                <div class="col-md-4">
                                                    <input type="text" id="totalLihat" name="totalLihat" class="form-control" style="width: 100%">
                                                </div>
                                                <div class="col-md-3">
                                                    <input type="text" id="totalFOB" name="totalFOB" class="form-control" style="width: 100%">
                                                </div>
                                                <div class="col-md-3">
                                                    <input type="text" id="idPengiriman" name="idPengiriman" class="form-control" style="width: 100%">
                                                </div>
                                                {{-- <div class="col-md-2">
                                                    <button id="btnSimpanLihat" name="btnSimpanLihat" >Simpan</button>
                                                </div>
                                                <div class="col-md-2">
                                                    <button id="btnKeluarr" name="btnKeluarr">Keluar</button>
                                                </div> --}}
                                            </div>
                                            <br><div class="d-flex">
                                                <div class="col-md-2">
                                                    <label for="totalLihat" style="margin-right: 10px;">Harga FOB</label>
                                                </div>
                                                <div class="col-md-2">
                                                    <input type="text" id="totalLihat" name="totalLihat" class="form-control" style="width: 100%">
                                                </div>
                                                <div class="col-md-2">
                                                    <button class="btn btn-primary" id="btnInsert" name="btnInsert">Insert</button>
                                                </div>
                                                <div class="col-md-3">
                                                    <input type="text" id="idPesanan" name="idPesanan" class="form-control" style="width: 100%">
                                                </div>
                                                <div class="col-md-3">
                                                    <input type="text" id="idCust" name="idCust" class="form-control" style="width: 100%">
                                                </div>
                                            </div>
                                            <br><div class="col-md-2">
                                                <button class="btn btn-success" id="btnSimpanLihat" name="btnSimpanLihat" >Simpan</button>
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
<script src="{{ asset('js/Piutang/PenagihanPenjualanExport.js') }}"></script>
@endsection
