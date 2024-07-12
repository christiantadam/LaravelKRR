@extends('layouts.appAccounting')
@section('content')
@section('title', 'BKM')

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Maintenance Transaksi Bank BKM</div>
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
                                        <input type="radio" name="radiogrup1" value="radio_1" id="radio_3">
                                        <label for="radio_3">Bank Ekstern Rp</label>
                                    </div>
                                </div>
                                <div class="d-flex">
                                    <div class="col-md-6"></div>
                                    <div class="col-md-2">
                                        <input type="radio" name="radiogrup2" value="radio_1" id="radio_1">
                                        <label for="radio_2">KAS Kecil</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="radio" name="radiogrup2" value="radio_1" id="radio_2">
                                        <label for="radio_2">Bank Interen $</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="radio" name="radiogrup2" value="radio_1" id="radio_3">
                                        <label for="radio_3">Bank Interen $</label>
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

                                <br><div>
                                    <b>Data BKM</b>
                                    <div style="overflow-y: auto; max-height: 400px;">
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
                                                    <th>Tgl. Input</th>
                                                    <th>Id. BKM</th>
                                                    <th>Nilai Pelunasan</th>
                                                    <th>Mata Uang</th>
                                                    <th>Bank</th>
                                                    <th>Jenis Bayar</th>
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

                                <!--CARD 1-->
                                <br>
                                <div class="card-container" style="display: flex;">
                                    <div class="card" style="width: 34%;">
                                        <div class="card-body">
                                            <div class="col-md-6">
                                                <b>Rincian Pelunasan</b>
                                            </div>
                                            <div style="overflow-x: auto; overflow-y: auto; max-height: 250px;">
                                                <table style="width: 100%; table-layout: fixed;">
                                                    <colgroup>
                                                    <col style="width: 40%;">
                                                    <col style="width: 30%;">
                                                    <col style="width: 30%;">
                                                    </colgroup>
                                                    <thead class="table-dark">
                                                        <tr>
                                                            <th>Ket. Pelunasan</th>
                                                            <th>Nilai Rincian</th>
                                                            <th>Kode Perkiraan</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Data 1</td>
                                                            <td>Data 2</td>
                                                            <td>Data 3</td>
                                                        </tr>
                                                    <!-- Tambahkan baris lainnya jika diperlukan -->
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    <!--CARD 2-->
                                    <div class="card" style="width: 33%; overflow-y: auto; max-height: 250px;">
                                        <div class="card-body">
                                            <div class="col-md-6">
                                                <b>Rincian Biaya</b>
                                            </div>
                                            <div style="overflow-x: auto;">
                                                <table style="width: 100%; table-layout: fixed;">
                                                    <colgroup>
                                                    <col style="width: 40%;">
                                                    <col style="width: 30%;">
                                                    <col style="width: 30%;">
                                                    </colgroup>
                                                    <thead class="table-dark">
                                                    <tr>
                                                        <th>Keterangan</th>
                                                        <th>Jumlah Biaya</th>
                                                        <th>Kode Perkiraan</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td>Data 1</td>
                                                        <td>Data 2</td>
                                                        <td>Data 3</td>
                                                    </tr>
                                                    <!-- Tambahkan baris lainnya jika diperlukan -->
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <!--CARD 3-->
                                    <div class="card" style="width: 33%; overflow-y: auto; max-height: 250px;">
                                        <div class="card-body">
                                            <div class="col-md-7">
                                                <b>Rincian Kurang/Lebih</b>
                                            </div>
                                            <div style="overflow-x: auto;">
                                                <table style="width: 100%; table-layout: fixed;">
                                                    <colgroup>
                                                    <col style="width: 40%;">
                                                    <col style="width: 30%;">
                                                    <col style="width: 30%;">
                                                    </colgroup>
                                                    <thead class="table-dark">
                                                    <tr>
                                                        <th>Keterangan</th>
                                                        <th>Jumlah</th>
                                                        <th>Kode Perkiraan</th>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td>Data 1</td>
                                                        <td>Data 2</td>
                                                        <td>Data 3</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
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
@endsection
