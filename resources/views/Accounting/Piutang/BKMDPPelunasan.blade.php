@extends('layouts.appAccounting')
@section('content')
@section('title', 'Maintenance DP Pelunasan')

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Maintenance BKM-BKK DP</div>
                    @if (Session::has('success'))
                        <div class="alert alert-success">
                            {{ Session::get('success') }}
                        </div>
                    @endif
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            <form method="POST" action="{{ url('BKMDPPelunasan') }}" id="formkoreksi">
                                {{csrf_field()}}
                                <input type="hidden" name="_method" id="methodkoreksi">
                                <!-- Form fields go here -->
                                <div class="d-flex">
                                    <div class="col-md-2">
                                        <label for="namaCustomerSelect" style="margin-right: 10px;">Customer</label>
                                    </div>
                                    <div class="col-md-6">
                                        <select id="namaCustomerSelect" name="namaCustomerSelect" class="form-control">

                                        </select>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="submit" id="btnOK" name="btnOK" value="OK" class="btn">
                                    </div>
                                    <input type="text" id="idCustomer" name="idCustomer" style="margin-right: 10px;"></label>
                                </div>

                                <br>
                                <div>
                                    <b>Data Pelunasan</b>
                                    <div style="overflow-y: auto; max-height: 400px;">
                                        <table style="width: 240%; table-layout: fixed;" id="tabelDataPelunasan">
                                            <colgroup>
                                                <col style="width: 20%;">
                                                <col style="width: 20%;">
                                                <col style="width: 20%;">
                                                <col style="width: 20%;">
                                                <col style="width: 20%;">
                                                <col style="width: 20%;">
                                                <col style="width: 20%;">
                                                <col style="width: 20%;">
                                                <col style="width: 20%;">
                                                <col style="width: 20%;">
                                                <col style="width: 20%;">
                                                <col style="width: 20%;">
                                            </colgroup>
                                            <thead class="table-dark">
                                                <tr>
                                                    <th>Tgl Input</th>
                                                    <th>Id. BKM</th>
                                                    <th>Id. Bank</th>
                                                    <th>Nama Bank</th>
                                                    <th>Mata Uang</th>
                                                    <th>Customer</th>
                                                    <th>Total Pelunasan</th>
                                                    <th>Saldo Pelunasan</th>
                                                    <th>Id. Pelunasan</th>
                                                    <th>Jenis Bank</th>
                                                    <th>Id. Uang</th>
                                                    <th>Id. Cust</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="card-container" style="display: flex;">
                                    <div style="width: 60%;">
                                        <div class="card" style>
                                            <b>BKK</b>
                                            <div class="d-flex">
                                                <div class="col-md-3">
                                                    <label for="tanggal" style="margin-right: 10px;">Tanggal</label>
                                                </div>
                                                <div class="col-md-5">
                                                    <input type="date" id="tanggal" name="tanggal" class="form-control" style="width: 100%" readonly>
                                                </div>
                                                <div class="col-md-2">
                                                    <input type="hidden" id="bulan" name="bulan" class="form-control"
                                                        style="width: 100%">
                                                </div>
                                                <div class="col-md-2">
                                                    <input type="hidden" id="tahun" name="tahun" class="form-control"
                                                        style="width: 100%">
                                                </div>
                                            </div>
                                            <input type="hidden" name="idPembayaran" id="idPembayaran">
                                            <input type="hidden" name="idPelunasan" id="idPelunasan">
                                            <div class="d-flex">
                                                <div class="col-md-3">
                                                    <label for="idBKK" style="margin-right: 10px;">Id. BKK</label>
                                                </div>
                                                <div class="col-md-4">
                                                    <input type="text" id="idBKK" name="idBKK" class="form-control" style="width: 100%" readonly>
                                                </div>
                                                <div class="col-md-3">
                                                    <input type="text" id="id_bkk" name="id_bkk" class="form-control" style="width: 100%" readonly>
                                                </div>
                                            </div>
                                            <div class="d-flex">
                                                <div class="col-md-3">
                                                    <label for="mataUangSelect" style="margin-right: 10px;">Mata Uang</label>
                                                </div>
                                                <div class="col-md-4">
                                                    <select id="mataUangSelect" name="mataUangSelect" class="form-control" readonly>

                                                    </select>
                                                </div>
                                                <div class="col-md-2">
                                                    <label for="kursRupiah" style="margin-right: 10px;">Kurs Rupiah</label>
                                                </div>
                                                <div class="col-md-3">
                                                    <input type="number" id="kursRupiah" name="kursRupiah" class="form-control" style="width: 100%" readonly>
                                                </div>

                                            </div>
                                            <input type="hidden" name="idMataUang" id="idMataUang" class="form-control" style="width: 100%">
                                            <div class="d-flex">
                                                <div class="col-md-3">
                                                    <label for="jumlahUang" style="margin-right: 10px;">Jumlah Uang</label>
                                                </div>
                                                <div class="col-md-4">
                                                    <input type="number" name="jumlahUang" id="jumlahUang" class="form-control" style="width: 100%" readonly>
                                                </div>
                                            </div>
                                            <div class="d-flex">
                                                <div class="col-md-3">
                                                    <label for="namaBankSelect" style="margin-right: 10px;">Bank</label>
                                                </div>
                                                <div class="col-md-6">
                                                    <select id="namaBankSelect" name="namaBankSelect" class="form-control" readonly>

                                                    </select>
                                                </div>
                                                <!--HIDDEN INPUT-->
                                                <div class="col-md-4">
                                                    <input type="hidden" id="idBankBKK" name="idBankBKK" class="form-control" style="width: 100%">
                                                </div>
                                                <div class="col-md-4">
                                                    <input type="hidden" id="jenisBankBKK" name="jenisBankBKK" class="form-control" style="width: 100%">
                                                </div>
                                            </div>
                                            <div class="d-flex">
                                                <div class="col-md-3">
                                                    <label for="kodePerkiraan" style="margin-right: 10px;">Kode Perkiraan</label>
                                                </div>
                                                <div class="col-md-2">
                                                    <input type="number" id="idKodePerkiraanBKK" name="idKodePerkiraanBKK" class="form-control" style="width: 100%" readonly>
                                                </div>
                                                <div class="col-md-5">
                                                    <select id="kodePerkiraanSelectBKK" name="kodePerkiraanSelectBKK" class="form-control" readonly>

                                                    </select>
                                                </div>
                                            </div>
                                            <div class="d-flex">
                                                <div class="col-md-3">
                                                    <label for="uraian" style="margin-right: 10px;">Uraian</label>
                                                </div>
                                                <div class="col-md-7">
                                                    <input type="text" id="uraian" name="uraian" class="form-control" style="width: 100%" readonly>
                                                </div>
                                            </div>
                                        </div>

                                        <!--CARD 2-->
                                        <div class="card" style>
                                            <b>BKM</b>
                                            <div class="d-flex">
                                                <div class="col-md-3">
                                                    <label for="idBKM" style="margin-right: 10px;">Id. BKM</label>
                                                </div>
                                                <div class="col-md-4">
                                                    <input type="text" name="idBKM" id="idBKM" class="form-control" style="width: 100%" readonly>
                                                </div>
                                                <div class="col-md-3">
                                                    <input type="text" id="id_bkm" name="id_bkm" class="form-control" style="width: 100%" readonly>
                                                </div>
                                            </div>
                                            <div class="d-flex">
                                                <div class="col-md-3">
                                                    <label for="jumlahUangBKM" style="margin-right: 10px;">Jumlah Uang</label>
                                                </div>
                                                <div class="col-md-4">
                                                    <input type="number" id="jumlahUangBKM" name="jumlahUangBKM" class="form-control" style="width: 100%" readonly>
                                                </div>
                                            </div>
                                            <div class="d-flex">
                                                <div class="col-md-3">
                                                    <label for="namaBankBKMSelect" style="margin-right: 10px;">Bank</label>
                                                </div>
                                                <div class="col-md-5">
                                                    <select id="namaBankBKMSelect" name="namaBankBKMSelect" class="form-control" readonly>

                                                    </select>
                                                </div>
                                                <input type="hidden" id="idBankBKM" name="idBankBKM" class="form-control" style="width: 100%">
                                                <input type="hidden" id="jenisBankBKM" name="jenisBankBKM" class="form-control" style="width: 100%">
                                            </div>
                                            <div class="d-flex">
                                                <div class="col-md-3">
                                                    <label for="kodePerkiraan" style="margin-right: 10px;">Kode Perkiraan</label>
                                                </div>
                                                <div class="col-md-3">
                                                    <input type="number" id="idKodePerkiraanBKM" name="idKodePerkiraanBKM" class="form-control" style="width: 100%" readonly>
                                                </div>
                                                <div class="col-md-5">
                                                    <select id="kodePerkiraanBKMSelect" name="kodePerkiraanBKMSelect" class="form-control" readonly>

                                                    </select>
                                                </div>
                                            </div>
                                            <div class="d-flex">
                                                <div class="col-md-3">
                                                    <label for="uraianBKM" style="margin-right: 10px;">Uraian</label>
                                                </div>
                                                <div class="col-md-7">
                                                    <input type="text" id="uraianBKM" name="uraianBKM" class="form-control" style="width: 100%" readonly>
                                                </div>
                                            </div>
                                        </div>
                                        <input type="text" id="konversi" name="konversi" class="form-control" style="width: 100%">
                                        <input type="text" id="konversi1" name="konversi1" class="form-control" style="width: 100%">
                                        <input type="text" id="nilai" name="nilai" class="form-control" style="width: 100%">
                                        <input type="text" id="nilai1" name="nilai1" class="form-control" style="width: 100%">
                                    </div>


                                    <!--CARD 2-->
                                    <div style="width: 40%;">
                                        <div class="card-body">
                                            <div style="display: flex; justify-content: center;">
                                                <input type="submit" id="btnPilihBKM" value="Pilih BKM" class="btn btn-primary">
                                            </div>
                                            <br>
                                            <div class="row" style="display: flex; justify-content: center;">
                                                <div style="margin-right: 10px;">
                                                    <button type="submit" id="btnProses" name="btnProses" class="btn btn-primary">PROSES</button>
                                                </div>
                                                <div style="margin-right: 10px;">
                                                    <button type="submit" id="btnKoreksi" name="btnKoreksi" class="btn btn-primary">Koreksi</button>
                                                </div>
                                                <div>
                                                    <input type="submit" id="btnBatal" name="btnBatal" value="Batal" class="btn btn-primary">
                                                </div>
                                            </div>
                                            <br>
                                            <div class="row" style="display: flex; justify-content: center;">
                                                <div style="margin-right: 10px;">
                                                    <button type="submit" id="btnTampilBKM" name="btnTampilBKM" class="btn btn-primary">Tampil BKM</button>
                                                </div>
                                                <div style="margin-right: 10px;">
                                                    <button type="submit" id="btnTampilBKK" name="btnTampilBKK" class="btn btn-primary">Tampil BKK</button>
                                                </div>
                                                <div>
                                                    <input type="submit" name="tutup" value="TUTUP" class="btn btn-primary">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>

                            <!--MODAL TAMPIL BKM-->
                            <div class="modal fade" id="modalTampilBKM" tabindex="-1" role="dialog" aria-labelledby="pilihBankModal" aria-hidden="true">
                                <div class="modal-dialog modal-lg" role="document">
                                    <div class="modal-content" style="padding: 25px;">
                                        <div class="modal-header">
                                            <h5 class="modal-title">Cetak BKM DP</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <form action="{{ url('BKMDPPelunasan') }}" id="formTampilBKM" method="post">
                                            {{ csrf_field() }}
                                            <input type="hidden" name="_method" id="methodTampilBKM">
                                            <div class="d-flex">
                                                <div class="col-md-3">
                                                    <label for="tanggalInputTampil" style="margin-right: 10px;">Tanggal Input</label>
                                                </div>
                                                <div class="col-md-3">
                                                    <input type="date" id="tanggalTampilBKM" name="tanggalTampilBKM" class="form-control" style="width: 100%">
                                                </div>
                                                <div class="col-md-1">
                                                S/D
                                                </div>
                                                <div class="col-md-3">
                                                    <input type="date" id="tanggalTampilBKM2" name="tanggalTampilBKM2" class="form-control" style="width: 100%">
                                                </div>
                                                <div class="col-md-3">
                                                    <button id="btnOkTampilBKM" name="btnOkTampilBKM">OK</button>
                                                </div>
                                            </div>
                                            <div class="d-flex">
                                                <div class="col-md-3">
                                                    <label for="idBKM" style="margin-right: 10px;">Id. BKM</label>
                                                </div>
                                                <div class="col-md-2">
                                                    <input type="text" id="idBKMTampil" name="idBKMTampil" class="form-control" style="width: 100%">
                                                </div>
                                                <div class="col-md-3">
                                                    <button id="btnCetakBKM" name="btnCetakBKM">CETAK</button>
                                                </div>
                                            </div>
                                            <div style="overflow-x: auto; overflow-y: auto; max-height: 250px;">
                                                <table style="width: 120%; table-layout: fixed;"id="tabelTampilBKM">
                                                    <colgroup>
                                                        <col style="width: 30%;">
                                                        <col style="width: 30%;">
                                                        <col style="width: 30%;">
                                                        <col style="width: 30%;">
                                                    </colgroup>
                                                    <thead class="table-dark">
                                                        <tr>
                                                            <th>Tgl. Input</th>
                                                            <th>Id. BKM</th>
                                                            <th>Nilai Pelunasan</th>
                                                            <th>Terjemahan</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                    </tbody>
                                                </table>
                                            </div>
                                            <input type="hidden" name="cetak" id="cetak" value="cetakBKM">
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <!--MODAL TAMPIL BKK-->
                            <div class="modal fade" id="modalTampilBKK" tabindex="-1" role="dialog" aria-labelledby="pilihBankModal" aria-hidden="true">
                                <div class="modal-dialog modal-lg" role="document">
                                    <div class="modal-content" style="padding: 25px;">
                                        <div class="modal-header">
                                            <h5 class="modal-title">Cetak BKK DP</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <form action="{{ url('BKMDPPelunasan') }}" id="formTampilBKK" method="post">
                                            {{ csrf_field() }}
                                            <input type="hidden" name="_method" id="methodTampilBKK">
                                            <div class="d-flex">
                                                <div class="col-md-3">
                                                    <label for="tanggalTampilBKK" style="margin-right: 10px;">Tanggal Input</label>
                                                </div>
                                                <div class="col-md-3">
                                                    <input type="date" id="tanggalTampilBKK" name="tanggalTampilBKK" class="form-control" style="width: 100%">
                                                </div>
                                                <div class="col-md-1">
                                                S/D
                                                </div>
                                                <div class="col-md-3">
                                                    <input type="date" id="tanggalTampilBKK2" name="tanggalTampilBKK2" class="form-control" style="width: 100%">
                                                </div>
                                                <div class="col-md-3">
                                                    <button id="btnOkTampilBKK" name="btnOkTampilBKK">OK</button>
                                                </div>
                                            </div>
                                            <div class="d-flex">
                                                <div class="col-md-3">
                                                    <label for="idBKK" style="margin-right: 10px;">Id. BKK</label>
                                                </div>
                                                <div class="col-md-2">
                                                    <input type="text" id="idBKKTampil" name="idBKKTampil" class="form-control" style="width: 100%">
                                                </div>
                                                <div class="col-md-2">
                                                    <button id="btnCetakBKK" name="btnCetakBKK">CETAK</button>
                                                </div>
                                                <div class="col-md-5">
                                                <input type="text" id="tglCetakBKK" name="tglCetakBKK" class="form-control" style="width: 100%">
                                            </div>
                                            </div>
                                            <div style="overflow-x: auto; overflow-y: auto; max-height: 250px;">
                                                <table style="width: 120%; table-layout: fixed;" id="tabelTampilBKK">
                                                    <colgroup>
                                                        <col style="width: 30%;">
                                                        <col style="width: 30%;">
                                                        <col style="width: 30%;">
                                                        <col style="width: 30%;">
                                                    </colgroup>
                                                    <thead class="table-dark">
                                                        <tr>
                                                            <th>Tgl. Input</th>
                                                            <th>Id. BKK</th>
                                                            <th>Nilai Pelunasan</th>
                                                            <th>Terjemahan</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <input type="hidden" name="cetak" id="cetak" value="cetakBKK">

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
<script src="{{ asset('js/Accounting/Piutang/BKMDPPelunasan.js') }}"></script>
@endsection
