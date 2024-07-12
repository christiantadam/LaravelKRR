@extends('layouts.appAccounting')
@section('content')
@section('title', 'BKK')

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Maintenance Transaksi Bank (BKK)</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            <form method="POST" action="">
                                @csrf
                                <!-- Form fields go here -->
                                <div class="d-flex">
                                    <div class="col-md-1">
                                        <b>Data BKK</b>
                                    </div>
                                    <div class="col-md-1">
                                        <label for="bulan" style="margin-right: 10px;">Bulan</label>
                                    </div>
                                    <div class="col-md-1">
                                        <input type="text" for="bulan" class="form-control" style="width: 100%">
                                    </div>
                                    <div class="col-md-1">
                                        <label for="tahun" style="margin-right: 10px;">Tahun</label>
                                    </div>
                                    <div class="col-md-1">
                                        <input type="text" id="tahun" class="form-control" style="width: 100%">
                                    </div>
                                    <div class="col-md-1"></div>
                                    <div class="col-md-2">
                                        <input type="radio" name="radiogrup1" value="radio_1" id="radio_1">
                                        <label for="radio_2">KAS Besar</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="radio" name="radiogrup1" value="radio_1" id="radio_2">
                                        <label for="radio_2">Bank Interen Rp</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="radio" name="radiogrup1" value="radio_1" id="radio_1">
                                        <label for="radio_2">Bank Ekstern Rp</label>
                                    </div>
                                </div>
                                <div class="d-flex">
                                    <div class="col-md-6"></div>
                                    <div class="col-md-2">
                                        <input type="radio" name="radiogrup1" value="radio_1" id="radio_1">
                                        <label for="radio_2">KAS Kecil</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="radio" name="radiogrup1" value="radio_1" id="radio_2">
                                        <label for="radio_2">Bank Interen $</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="radio" name="radiogrup1" value="radio_1" id="radio_1">
                                        <label for="radio_2">Bank Interen $</label>
                                    </div>
                                </div>
                                <div class="d-flex">
                                    <div class="col-md-1"></div>
                                    <div class="col-md-1">
                                        <label for="namaBank" style="margin-right: 10px;">Nama Bank</label>
                                    </div>
                                    <div class="col-md-2">
                                        <select name="namaBankSelect" class="form-control" onchange="fillColumns()">
                                            <option value="NoPenagihan 1">No1</option>
                                            <option value="NoPenagihan 2">No2</option>
                                        </select>
                                    </div>
                                    <div class="col-md-2"></div>
                                    <div class="col-md-1">
                                        <input type="submit" id="btnPilihBank" name="pilihBank" value="OK" class="btn">
                                    </div>
                                    <div class="col-md-2">
                                        <input type="submit" id="btnProses" name="proses" value="PROSES" class="btn">
                                    </div>
                                </div>

                                <br><div class="d-flex">
                                    <div class="col-md-1"></div>
                                    <div class="col-md-10" style="overflow-y: auto; max-height: 400px;">
                                        <table style="width: 110%; table-layout: fixed;">
                                            <colgroup>
                                                <col style="width: 15%;">
                                                <col style="width: 10%;">
                                                <col style="width: 15%;">
                                                <col style="width: 15%;">
                                                <col style="width: 10%;">
                                                <col style="width: 15%;">
                                            </colgroup>
                                            <thead class="table-dark">
                                                <tr>
                                                    <th>Id. BKK</th>
                                                    <th>Tgl. Buat</th>
                                                    <th>Bank</th>
                                                    <th>Nilai BKk</th>
                                                    <th>Purchase Order</th>
                                                    <th>Supplier</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Data 1</td>
                                                    <td>Data 2</td>
                                                    <td>Data 3</td>
                                                    <td>Data 4</td>
                                                    <td>Data 5</td>
                                                    <td>Data 6</td>
                                                </tr>
                                                <!-- Tambahkan baris lainnya jika diperlukan -->
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="col-md-1"></div>
                                </div>

                                <br><div>
                                    <b>Rincian Data BKK</b>
                                    <div style="overflow-y: auto; max-height: 400px;">
                                        <table style="width: 100%; table-layout: fixed;">
                                            <colgroup>
                                                <col style="width: 15%;">
                                                <col style="width: 10%;">
                                                <col style="width: 25%;">
                                                <col style="width: 15%;">
                                                <col style="width: 20%;">
                                                <col style="width: 15%;">
                                            </colgroup>
                                            <thead class="table-dark">
                                                <tr>
                                                    <th>Id. Penagihan</th>
                                                    <th>Jenis Bayar</th>
                                                    <th>Rincian Bayar</th>
                                                    <th>Symbol</th>
                                                    <th>Nilai Rincian</th>
                                                    <th>Kode Perkiraan</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Data 1</td>
                                                    <td>Data 2</td>
                                                    <td>Data 3</td>
                                                    <td>Data 4</td>
                                                    <td>Data 5</td>
                                                    <td>Data 6</td>
                                                </tr>
                                                <!-- Tambahkan baris lainnya jika diperlukan -->
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <br><div class="mb-3">
                                    <div class="row">
                                        <div class="col-11">
                                        </div>
                                        <div class="col-1">
                                            <input type="submit" id="btnKeluar" name="keluar" value="KELUAR" class="btn btn-primary d-flex ml-auto">
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
@endsection
