@extends('layouts.appAccounting')
@section('content')
@section('title', 'Maintenance Kurs BKK')

<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12 RDZMobilePaddingLR0">
            <div class="card">
                <div class="card-header">Maintenance Kurs BKK</div>
                <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                    <div class="form-container col-md-12">
                        <form method="POST" action="">
                            @csrf
                            <!-- Form fields go here -->
                            <div class="card-container" style="display: flex;">
                                <div class="card" style="width: 40%;">
                                    <br>
                                    <div class="d-flex">
                                        <div class="col-md-4">
                                            <b>Data BKK</b>
                                        </div>
                                        <div class="col-md-6">
                                            <input type="radio" name="radiogrup1" value="radio_1" id="radio_1">
                                            <label for="radio_1">Kas Kecil dng Supplier $</label>
                                        </div>
                                    </div>

                                    <div class="card-body">
                                        <div style="overflow-y: auto; max-height: 400px;">
                                            <table style="width: 120%;" id="table_bkk">
                                                <thead class="table-dark">
                                                    <tr>
                                                        <th>BKK</th>
                                                        <th>Nilai BKK</th>
                                                        <th>Tgl_BKK</th>
                                                        <th>Supplier</th>
                                                        <th>Id. Supplier</th>
                                                        <th>Sym. Supplier</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <!--CARD 2-->
                                <div style="width: 60%;">
                                    <div class="card-body">
                                        <div class="col">
                                            <div class="d-flex">
                                                <div class="col-md-1">
                                                    <label for="id">Bulan</label>
                                                </div>
                                                <div class="col-md-2">
                                                    <input type="text" id="bulan" name="bulan"
                                                        class="form-control" style="width: 100%">
                                                </div>
                                                <div class="col-md-1" style="padding-right: 25px">
                                                    <label for="id">Tahun</label>
                                                </div>
                                                <div class="col-md-3">
                                                    <input type="text" id="tahun" name="tahun"
                                                        class="form-control" style="width: 100%">
                                                </div>
                                                <div class="col-md-2">
                                                    <button id="btn_ok" type="button" class="btn btn-primary"
                                                        style="width: 100px">OK</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div class="card-body">
                                            <div class="row">
                                                <p>
                                                <div class="col-md-3">
                                                    <label for="id">BKK</label>
                                                </div>
                                                <div class="col-md-3">
                                                    <input type="text" id="bkk" name="bkk" class="form-control"
                                                        style="width: 100%">
                                                </div>
                                            </div>
                                            <br>
                                            <div class="row">
                                                <p>
                                                <div class="col-md-3">
                                                    <label for="id">Nama Supplier</label>
                                                </div>
                                                <div class="col-md-9">
                                                    <input type="text" id="nama_supplier" name="supplierSelect" class="form-control"
                                                        style="width: 100%">
                                                </div>
                                            </div>
                                            <b>Data Pembayaran</b>
                                            <div style="overflow-y: auto; max-height: 250px;">
                                                <table style="width: 100%;" id="table_pembayaran">
                                                    <thead class="table-dark">
                                                        <tr>
                                                            <th>Id. Bayar</th>
                                                            <th>Penagihan</th>
                                                            <th>Jenis Byr</th>
                                                            <th>Mata Uang</th>
                                                            <th>Nilai Bayar</th>
                                                            <th>Kurs Bayar</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="row">
                                            <p>
                                            <div class="col-md-3">
                                                <b>Data Rincian</b>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="submit" name="kurstt" value="KURS TT" class="btn">
                                            </div>
                                        </div>

                                        <div style="overflow-y: auto; max-height: 250px;">
                                            <table style="width: 100%;" id="table_rincian">
                                                <thead class="table-dark">
                                                    <tr>
                                                        <th>Id. Bayar</th>
                                                        <th>Id. Detail</th>
                                                        <th>Rincian Bayar</th>
                                                        <th>Nilai RIncian</th>
                                                        <th>Perkiraan</th>
                                                        <th>Kurs</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>

                                        <p>
                                        <div class="card-container" style="display: flex;">
                                            <div class="card" style="width:30%;">
                                                <div class="row">
                                                    <div class="card-body">
                                                        <div class="col-md-12">
                                                            <label for="id">KURS PEMBAYARAN</label>
                                                        </div>
                                                        <div class="col-md-12">
                                                            <input type="number" name="supplierSelect"
                                                                class="form-control" style="width: 100%">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style="width: 70%;">
                                                <div class="row">
                                                    <div class="col-md-5">
                                                        <button id="btn_prosesbkm" type="button"
                                                            class="btn btn-success"
                                                            style="width: 130px">Proses</button>
                                                    </div>
                                                    <div class="col-md-1">
                                                        <label for="id">ID. Bayar</label>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <input type="text" name="input2" class="form-control"
                                                            style="width: 100%">
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label for="id">ID. Rincian</label>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <input type="text" name="input3" class="form-control"
                                                            style="width: 100%">
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-md-9">
                                                        <button id="btn_prosesbkm" type="button"
                                                            class="btn btn-success" style="width: 130px">Proses
                                                            Rincian</button>
                                                    </div>
                                                    <div class="col-md-3">
                                                        {{-- <input type="submit" name="keluar" value="KELUAR"
                                                            class="btn btn-primary d-flex ml-auto"> --}}
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

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
<script src="{{ asset('js/Accounting/Hutang/MaintenanceKursBKK.js') }}"></script>
@endsection
