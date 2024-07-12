@extends('layouts.appAccounting')
@section('content')
@section('title', 'Pengajuan')

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Maintenance Pengajuan BKK Nota Kredit</div>
                    @if (Session::has('success'))
                        <div class="alert alert-success">
                            {{ Session::get('success') }}
                        </div>
                    @endif
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            <form method="POST" action="{{ url('Pengajuan') }}" id="formkoreksi">
                                {{csrf_field()}}
                                <!-- Form fields go here -->
                                <br><div>
                                    <b>Data Nota Kredit untuk Create BKK</b>
                                    <div style="overflow-y: auto; max-height: 400px;">
                                        <table style="width: 140%; table-layout: fixed;" id="tabelDataNotaK">
                                            <colgroup>
                                                <col style="width: 10%;">
                                                <col style="width: 20%;">
                                                <col style="width: 20%;">
                                                <col style="width: 20%;">
                                                <col style="width: 10%;">
                                                <col style="width: 10%;">
                                                <col style="width: 10%;">
                                                <col style="width: 20%;">
                                                <col style="width: 20%;">
                                            </colgroup>
                                            <thead class="table-dark">
                                                <tr>
                                                    <th>Tanggal</th>
                                                    <th>Id. Nota Kredit</th>
                                                    <th>Id. Penagihan</th>
                                                    <th>Customer</th>
                                                    <th>Mata Uang</th>
                                                    <th>Jml Uang</th>
                                                    <th>Id. Bank</th>
                                                    <th>Jenis Bayar</th>
                                                    <th>Rincian Bayar</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>

                                        <input type="hidden" id="id_Bank" name="id_Bank" class="form-control" style="width: 100%">
                                        <input type="hidden" id="jenis_Bayar" name="jenis_Bayar" class="form-control" style="width: 100%">
                                        <input type="hidden" id="idJenisBayar" name="idJenisBayar" class="form-control" style="width: 100%">
                                    </div>
                                    </div>
                                </div>

                                <br>
                                <div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="noPenagihan" style="margin-right: 10px;">No. Penagihan</label>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="text" id="noTagih" name="noTagih" class="form-control" style="width: 100%">
                                    </div>
                                    <div class="col-md-2">
                                        <input type="hidden" id="idNotaK" name="idNotaK" class="form-control" style="width: 100%">
                                    </div>
                                </div>
                                <div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="customer" style="margin-right: 10px;">Customer</label>
                                    </div>
                                    <div class="col-md-4">
                                        <input type="text" id="namaCustomer" name="namaCustomer" class="form-control" style="width: 100%">
                                    </div>
                                </div>
                                <div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="mataUangSelect" style="margin-right: 10px;">Mata Uang</label>
                                    </div>
                                    <div class="col-md-3">
                                        <select id="mataUangSelect" name="mataUangSelect" class="form-control">

                                        </select>
                                    </div>
                                    <div class="col-md-4">
                                        <input type="hidden" id="idMataUang" name="idMataUang" class="form-control" style="width: 100%">
                                    </div>
                                </div>
                                <div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="jumlahUang" style="margin-right: 10px;">Jumlah Uang</label>
                                    </div>
                                    <div class="col-md-4">
                                        <input type="text" id="jumlahUang" name="jumlahUang" class="form-control" style="width: 100%">
                                    </div>
                                </div>
                                <div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="jenisBayarSelect" style="margin-right: 10px;">Jenis Bayar</label>
                                    </div>
                                    <div class="col-md-3">
                                        <select id="jenisBayarSelect" name="jenisBayarSelect" class="form-control">

                                        </select>
                                    </div>
                                </div>
                                <div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="namaBankSelect" style="margin-right: 10px;">Bank</label>
                                    </div>
                                    <div class="col-md-3">
                                        <select id="namaBankSelect" name="namaBankSelect" class="form-control">

                                        </select>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="hidden" id="idBank" name="idBank" class="form-control" style="width: 100%">
                                    </div>
                                    <div class="col-md-2">
                                        <input type="hidden" id="namaBank" name="namaBank" class="form-control" style="width: 100%">
                                    </div>
                                </div>
                                <div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="rincianBKK" style="margin-right: 10px;">Rincian BKK</label>
                                    </div>
                                    <div class="col-md-4">
                                        <input type="text" id="rincianBKK" name="rincianBKK" class="form-control" style="width: 100%">
                                    </div>
                                </div>
                                <br><div>
                                    <div class="row">
                                        <div class="col-md-8 d-flex ml-auto">
                                            <input type="submit" id="btnIsi" name="btnIsi" value="ISI" class="btn btn-primary d-flex ml-auto">
                                        </div>
                                        <div class="col-md-1">
                                            <input type="submit" id="btnKoreksi" name="btnKoreksi" value="KOREKSI" class="btn btn-primary">
                                        </div>
                                        <div class="col-md-1">
                                            <input type="submit" id="btnHapus" name="btnHapus" value="HAPUS" class="btn btn-primary">
                                        </div>
                                        <div class="col-md-1">
                                            <input type="submit" id="btnProses" name="btnProses" value="PROSES" class="btn btn-primary" disabled>
                                        </div>
                                        <div class="col-md-1 ">
                                            <input type="submit" id="btnKeluar" name="btnKeluar" value="KELUAR" class="btn btn-primary">
                                            <input type="submit" id="btnBatal" name="btnBatal" value="BATAL" class="btn btn-primary" style="display: none">
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
<script src="{{ asset('js/Piutang/MaintenanceBKKNotaKredit/Pengajuan.js') }}"></script>
@endsection
