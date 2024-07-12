@extends('layouts.appAccounting')
@section('content')
@section('title', 'ACC Penagihan Penjualan')

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">ACC Penagihan Penjualan</div>
                    @if (Session::has('success'))
                        <div class="alert alert-success">
                            {{ Session::get('success') }}
                        </div>
                    @endif
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            <form method="POST" action="{{ url('ACCPenagihanPenjualan') }}" id="formkoreksi">
                                {{csrf_field()}}
                                <input type="hidden" name="_method" id="methodkoreksi">
                                <!-- Form fields go here -->
                                <div style="overflow-y: auto; overflow-x: auto; max-height: 400px;">
                                    <table style="width: 260%; table-layout: fixed;" id="tabelListHeader">
                                        <colgroup>
                                            <col style="width: 15%;">
                                            <col style="width: 15%;">
                                            <col style="width: 30%;">
                                            <col style="width: 15%;">
                                            <col style="width: 20%;">
                                            <col style="width: 10%;">
                                            <col style="width: 20%;">
                                            <col style="width: 15%;">
                                            <col style="width: 15%;">
                                            <col style="width: 30%;">
                                            <col style="width: 15%;">
                                            <col style="width: 20%;">
                                            <col style="width: 10%;">
                                        </colgroup>
                                        <thead class="table-dark">
                                            <tr>
                                                <th>Tanggal</th>
                                                <th>Id. Penagihan</th>
                                                <th>Customer</th>
                                                <th>PO</th>
                                                <th>Nilai Tagihan</th>
                                                <th>Mata Uang</th>
                                                <th>Id. Customer</th>
                                                <th>Id. Mata Uang</th>
                                                <th>Kurs</th>
                                                <th>Nama NPWP</th>
                                                <th>Jenis Customer</th>
                                                <th>Id. Faktur Pajak</th>
                                                <th>Jenis PPN</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>

                                <br>
                                <div>
                                    <div class="row">
                                        <div class="col-md-2">
                                            <label for="idPenagihan">Id. Penagihan</label>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="text" id="idPenagihan" name="idPenagihan" class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-7">
                                            <input type="submit" id="btnProses" name="btnProses" value="Proses" class="btn btn-success d-flex ml-auto">
                                        </div>
                                        <div class="col-1">
                                            <input type="submit" id="btnKeluar" name="btnKeluar" value="Keluar" class="btn btn-primary d-flex ml-auto">
                                        </div>
                                    </div>
                                </div>
                                <p><div>
                                    <div class="row">
                                        <div class="col-md-2">
                                            <label for="fakturPajak">Faktur Pajak</label>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="text" id="fakturPajak" name="fakturPajak" class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-end">
                                            Sebelum Di Acc, Mohon diteliti Kembali
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="hidden" id="idMataUang" name="idMataUang" class="form-control" style="width: 100%">
                                    </div>
                                    <div class="col-md-2">
                                        <input type="hidden" id="id_Penagihan" name="id_Penagihan" class="form-control" style="width: 100%">
                                    </div>
                                    <div class="col-md-2">
                                        <input type="hidden" id="jenisCustomer" name="jenisCustomer" class="form-control" style="width: 100%">
                                    </div>
                                    <div class="col-md-2">
                                        <input type="hidden" id="namaNPWP" name="namaNPWP" class="form-control" style="width: 100%">
                                    </div>
                                    <div class="col-md-2">
                                        <input type="hidden" id="nilaiTagihan" name="nilaiTagihan" class="form-control" style="width: 100%">
                                    </div>
                                    <div class="col-md-2">
                                        <input type="hidden" id="idCustomer" name="idCustomer" class="form-control" style="width: 100%">
                                    </div>
                                    <div class="col-md-2">
                                        <input type="hidden" id="kurs" name="kurs" class="form-control" style="width: 100%">
                                    </div>
                                </div>

                                <br>
                                <div style="overflow-y: auto; max-height: 400px;">
                                    <table style="width: 60%; table-layout: fixed;" id="tabelDisplayDetail">
                                        <colgroup>
                                            <col style="width: 30%;">
                                            <col style="width: 30%;">
                                        </colgroup>
                                        <thead class="table-dark">
                                            <tr>
                                                <th>Surat Jalan</th>
                                                <th>Tanggal Terima Barang</th>
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
<script src="{{ asset('js/Piutang/ACCPenagihanPenjualan.js') }}"></script>
@endsection
