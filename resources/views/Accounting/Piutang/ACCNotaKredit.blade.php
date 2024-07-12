@extends('layouts.appAccounting')
@section('content')
@section('title', 'ACC Nota Kredit')

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">ACC Nota Kredit</div>
                    @if (Session::has('success'))
                        <div class="alert alert-success">
                            {{ Session::get('success') }}
                        </div>
                    @endif
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            <form method="POST" action="{{ url('ACCNotaKredit') }}" id="formkoreksi">
                                {{ csrf_field() }}
                                <!-- Form fields go here -->
                                <div style="overflow-y: auto; max-height: 400px;">
                                    <table style="width: 220%; table-layout: fixed;" id="tabelatas">
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
                                        </colgroup>
                                        <thead class="table-dark">
                                            <tr>
                                                <th>Jenis Nota</th>
                                                <th>Tanggal</th>
                                                <th>Customer</th>
                                                <th>Nota Kredit</th>
                                                <th>No. Penagihan</th>
                                                <th>Nilai Retur</th>
                                                <th>Mata Uang</th>
                                                <th>Id Customer</th>
                                                <th>Id Mata Uang</th>
                                                <th>Nilai Kurs</th>
                                                <th>Status Pelunasan</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                                <input type="hidden" id="idNotaKredit" name="idNotaKredit" class="form-control" style="width: 100%">
                                <input type="hidden" id="idnotakredit" name="idnotakredit" class="form-control" style="width: 100%">
                                <input type="hidden" id="idCustomer" name="idCustomer" class="form-control" style="width: 100%">
                                <input type="hidden" id="idMataUang" name="idMataUang" class="form-control" style="width: 100%">
                                <input type="hidden" id="kredit" name="kredit" class="form-control" style="width: 100%">
                                <input type="hidden" id="kurs" name="kurs" class="form-control" style="width: 100%">
                                <input type="hidden" id="statusP" name="statusP" class="form-control" style="width: 100%">

                                <br>
                                <div>
                                    <div class="row">
                                    <div class="col-8"></div>
                                        <div class="col-1">
                                            <input type="submit" id="btnProses" name="btnProses" value="Proses" class="btn btn-success d-flex ml-auto" >
                                        </div>
                                        <div class="col-1">
                                            <input type="submit" id="btnKeluar" name="btnKeluar" value="Keluar" class="btn btn-primary d-flex ml-auto">
                                        </div>
                                    </div>
                                </div>

                                <br>
                                <div style="overflow-y: auto; max-height: 400px;">
                                    <table style="width: 100%; table-layout: fixed;" id="tabelbawah">
                                        <colgroup>
                                            <col style="width: 20%;">
                                            <col style="width: 10%;">
                                            <col style="width: 10%;">
                                            <col style="width: 20%;">
                                            <col style="width: 20%;">
                                            <col style="width: 20%;">
                                        </colgroup>
                                        <thead class="table-dark">
                                            <tr>
                                                <th>Surat Jalan</th>
                                                <th>No. Retur</th>
                                                <th>Qty</th>
                                                <th>Harga</th>
                                                <th>Satuan</th>
                                                <th>Harga Baru</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<script src="{{ asset('js/Piutang/ACCNotaKredit.js') }}"></script>
@endsection
