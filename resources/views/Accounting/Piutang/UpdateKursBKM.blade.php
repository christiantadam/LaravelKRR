@extends('layouts.appAccounting')
@section('content')
@section('title', 'Maintenance Update Kurs BKM')

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Maintenance Update Kurs BKM $$</div>
                    @if (Session::has('success'))
                        <div class="alert alert-success">
                            {{ Session::get('success') }}
                        </div>
                    @endif
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            <form method="POST" action="{{ url('UpdateKursBKM') }}" id="formkoreksi">
                                {{ csrf_field() }}
                                <input type="hidden" name="_method" id="methodkoreksi">
                                <!-- Form fields go here -->
                                <div class="d-flex">
                                    <div class="col-md-2">
                                        <label for="bulanTahun" style="margin-right: 10px;">Bulan dan Tahun</label>
                                    </div>
                                    <div class="col-md-1">
                                        <input type="text" id="bulan" name="bulan" class="form-control" style="width: 100%">
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" id="tahun" name="tahun" class="form-control" style="width: 100%">
                                    </div>
                                    <div class="col-md-2">
                                        <input type="submit" id="btnOK" name="btnOK" value="OK" class="btn">
                                    </div>
                                </div>

                                <br><div>
                                    Data Pelunasan
                                    <div style="overflow-y: auto; max-height: 400px;">
                                        <table style="width: 170%; table-layout: fixed;" id="tabelDataPelunasan">
                                            <colgroup>
                                                <col style="width: 25%;">
                                                <col style="width: 15%;">
                                                <col style="width: 15%;">
                                                <col style="width: 20%;">
                                                <col style="width: 25%;">
                                                <col style="width: 25%;">
                                                <col style="width: 25%;">
                                                <col style="width: 20%;">
                                            </colgroup>
                                            <thead class="table-dark">
                                                <tr>
                                                    <th>Tgl Input</th>
                                                    <th>Id. BKM</th>
                                                    <th>Id. Bank</th>
                                                    <th>Total Pelunasan</th>
                                                    <th>Rincian Pelunasan</th>
                                                    <th>Kode Perkiraan</th>
                                                    <th>Keterangan</th>
                                                    <th>Id. Pelunasan</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>

                                        <input type="hidden" id="IdPelunasan" name="IdPelunasan" class="form-control" style="width: 100%">
                                        <input type="hidden" id="idbkm" name="idbkm" class="form-control" style="width: 100%">
                                    </div>
                                </div>
                                <br><div class="mb-3">
                                    <div class="row">
                                        <div class="col-md-2">
                                            <label for="kursRupiah" style="margin-right: 10px;">Kurs Rupiah</label>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="number" id="kursRupiah" name="kursRupiah" class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-3">
                                        </div>
                                        <div class="col-2">
                                            <input type="submit" id="btnProses" name="btnProses" value="PROSES" class="btn btn-success d-flex ml-auto">
                                        </div>
                                        <div class="col-3">
                                            <input type="submit" id="btnPilihBKM" name="btnPilihBKM" value="Pilih BKM" class="btn btn-primary d-flex ml-auto">
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
<script src="{{ asset('js/Piutang/UpdateKursBKM.js') }}"></script>
@endsection
