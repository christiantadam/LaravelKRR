@extends('layouts.appAccounting')
@section('content')
@section('title', 'Maintenance BKM KRR1')

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Maintenance Bukti Kas Masuk Tunai</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            <form method="POST" action="">
                                @csrf
                                <!-- Form fields go here -->
                                <div>
                                    <div class="row">
                                        <div class="col-md-2">
                                            <label for="id">Id. Bank</label>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="text" name="bankSelect" class="form-control" style="width: 100%">
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div class="row">
                                        <div class="col-md-2">
                                            <label for="id">Tanggal Input</label>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="date" name="bankSelect" class="form-control" style="width: 100%">
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div class="row">
                                        <div class="col-md-2">
                                            <label for="id">Diterima Dari</label>
                                        </div>
                                        <div class="col-md-5">
                                            <input type="text" name="bankSelect" class="form-control" style="width: 100%">
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div class="row">
                                        <div class="col-md-2">
                                            <label for="id">Mata Uang</label>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="text" name="bankSelect" class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-1">
                                            <select name="bank_select" class="form-control">
                                                <option value="option1">MU1</option>
                                                <option value="option2">MU2</option>
                                                <option value="option3">MU3</option>
                                            </select>
                                        </div>
                                        <div style="padding-left: 50px">
                                            <label for="id">Kurs Rupiah</label>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="number" name="bankSelect" class="form-control" style="width: 100%">
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div class="row">
                                        <div class="col-md-2">
                                            <label for="id">Jumlah Uang</label>
                                        </div>
                                        <div class="col-md-5">
                                            <input type="number" name="bankSelect" class="form-control" style="width: 100%">
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div class="row">
                                        <div class="col-md-2">
                                            <label for="id">Bank</label>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="text" name="bankSelect" class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-1">
                                            <select name="bank_select" class="form-control">
                                                <option value="option1">Bank1</option>
                                                <option value="option2">Bank2</option>
                                                <option value="option3">Bank3</option>
                                            </select>
                                        </div>
                                        <button>Tambah Biaya</button>
                                    </div>
                                </div>
                                <div>
                                    <div class="row">
                                        <div class="col-md-2">
                                            <label for="id">Kode Perkiraan</label>
                                        </div>
                                        <div class="col-md-1">
                                            <input type="text" name="bankSelect" class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-4">
                                            <input type="text" name="bankSelect" class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-1">
                                            <select name="bank_select" class="form-control">
                                                <option value="option1">Bank1</option>
                                                <option value="option2">Bank2</option>
                                                <option value="option3">Bank3</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div class="row">
                                        <div class="col-md-2">
                                            <label for="id">No. Bukti</label>
                                        </div>
                                        <div class="col-md-6">
                                            <input type="text" name="bankSelect" class="form-control" style="width: 100%">
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div class="row">
                                        <div class="col-md-2">
                                            <label for="id">Uraian</label>
                                        </div>
                                        <div class="col-md-6">
                                            <input type="text" name="bankSelect" class="form-control" style="width: 100%">
                                        </div>
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <div class="row">
                                        <div class="col-2" style="padding-left: 15px">
                                            <input type="submit" name="tambahdata" value="Tambah Data" class="btn btn-primary" disabled>
                                        </div>
                                        <div class="col-7" style="padding-left: 15px">
                                            <input type="submit" name="proses" value="PROSES" class="btn btn-primary">
                                        </div>
                                        <div class="col-1" style="padding-left: 15px">
                                            <input type="submit" name="batal" value="Batal" class="btn btn-primary d-flex ml-auto">
                                        </div>
                                        <div class="col-1" style="padding-left: 15px">
                                            <input type="submit" name="koreksi" value="Koreksi" class="btn btn-primary d-flex ml-auto">
                                        </div>
                                        <div class="col-1">
                                            <input type="submit" name="hapus" value="Hapus" class="btn btn-primary d-flex ml-auto">
                                        </div>
                                    </div>
                                </div>

                                <div class="card-container" style="display: flex;">
                                    <div class="card" style="width: 60%;">
                                        <div class="card-body">
                                            <b>Detail Data</b>
                                            <div style="overflow-x: auto;">
                                                <table style="width: 180%; table-layout: fixed;">
                                                    <colgroup>
                                                    <col style="width: 20%;">
                                                    <col style="width: 20%;">
                                                    <col style="width: 40%;">
                                                    <col style="width: 25%;">
                                                    <col style="width: 25%;">
                                                    <col style="width: 25%;">
                                                    <col style="width: 25%;">
                                                    </colgroup>
                                                    <thead class="table-dark">
                                                    <tr>
                                                        <th>Id. Detail</th>
                                                        <th>Terima Dari</th>
                                                        <th>Jumlah Uang</th>
                                                        <th>Kode Perkiraan</th>
                                                        <th>Uraian</th>
                                                        <th>Jenis Pembayaran</th>
                                                        <th>No. Bukti</th>
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
                                                        <td>Data 7</td>
                                                    </tr>
                                                    <!-- Tambahkan baris lainnya jika diperlukan -->
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>


                                    <!--CARD 2-->
                                    <div class="card" style="width: 40%;">
                                        <div class="card-body">
                                            <b>Detail Biaya</b>
                                            <div style="overflow-x: auto;">
                                                <table style="width: 150%; table-layout: fixed;">
                                                    <colgroup>
                                                    <col style="width: 25%;">
                                                    <col style="width: 25%;">
                                                    <col style="width: 25%;">
                                                    <col style="width: 25%;">
                                                    </colgroup>
                                                    <thead class="table-dark">
                                                    <tr>
                                                        <th>Keterangan</th>
                                                        <th>Biaya</th>
                                                        <th>Kode Perkiraan</th>
                                                        <th>Id. Detail</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td>Data 1</td>
                                                        <td>Data 2</td>
                                                        <td>Data 3</td>
                                                        <td>Data 4</td>
                                                    </tr>
                                                    <!-- Tambahkan baris lainnya jika diperlukan -->
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div class="row">
                                        <div class="col-md-1"></div>
                                        <div class="col-md-2">
                                            <b><label for="id">Total Pelunasan</label></b>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="number" name="bankSelect" class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-2"></div>
                                        <div class="col-md-2" >
                                            <input type="submit" name="tampilbkm" value="TAMPIL BKM" class="btn btn-primary d-flex ml-auto">
                                        </div>
                                        <div class="col-md-1">
                                            <input type="submit" name="tutup" value="TUTUP" class="btn btn-primary d-flex ml-auto">
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
