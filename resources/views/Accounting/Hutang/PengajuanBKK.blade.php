@extends('layouts.appAccounting')
@section('content')
@section('title', 'Pengajuan BKK')

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-12 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">BKK2 - Pengajuan</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            <form method="POST" action="">
                                @csrf
                                <!-- Form fields go here -->

                                <div class="radio-container">
                                    <div style="float: left;">
                                        <input type="radio" name="radiogrup" value="radio_2" id="radio_2">
                                        <label for="radio_2">Penagihan</label>
                                    </div>
                                    <div style="display: inline-block; margin: 0 auto;">
                                        <input type="radio" name="radiogrup" value="radio_3" id="radio_3">
                                        <label for="radio_3">No Penagihan</label>
                                    </div>
                                </div>

                                <div class="card" style="padding-left: 20px;">
                                    <p><div>
                                        Data Penagihan
                                    </div>
                                    <p><div class="row">
                                        <div class="col-md-2">
                                            <label for="id">Supplier</label>
                                        </div>
                                        <div class="col-md-4">
                                            <input type="text" name="supplierSelect" class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-2">
                                            <input type="text" name="supplierSelect" class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-1">
                                            <select name="supplierSelect" class="form-control" onchange="fillColumns()">
                                                <option value=""></option>
                                                <option value="Supplier 1">Supplier 1</option>
                                                <option value="Supplier 2">Supplier 2</option>
                                            </select>
                                        </div>
                                    </div>
                                <p></div>

                                <p><div class="card">
                                    <table class="table">
                                        <thead class="table-dark">
                                            <tr>
                                                <th>Pembayaran</th>
                                                <th>Penagihan</th>
                                                <th>Bank</th>
                                                <th>Rincian Pembayaran</th>
                                                <th>Nilai Bayar</th>
                                                <th>Jenis Bayar</th>
                                                <th>.......</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><input type="checkbox" class="data-checkbox"> Data 1</td>
                                                <td>Data 2</td>
                                                <td>Data 3</td>
                                                <td>Data 4</td>
                                                <td>Data 5</td>
                                                <td>Data 6</td>
                                                <td>Data 7</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div class="radio-container">
                                        <div style="margin-right: 10px;">
                                            PENAGIHAN
                                        </div>
                                        <div>
                                            <input type="radio" name="radiogrup" value="radio_2" id="radio_2">
                                            <label for="radio_2">ADA DP</label>
                                        </div>
                                        <div>
                                            <input type="radio" name="radiogrup" value="radio_3" id="radio_3">
                                            <label for="radio_3">TIDAK ADA DP</label>
                                        </div>
                                        <div style="display: flex;">
                                            <div class="col-md-4">
                                                <label for="id">BKK Uang Muka</label>
                                            </div>
                                            <div class="col-md-4">
                                                <input type="text" name="supplierSelect" class="form-control" style="width: 100%">
                                            </div>
                                            <div class="col-md-1" style="vertical-align: middle;">
                                                <select name="supplierSelect" class="form-control" onchange="fillColumns()">
                                                    <option value=""></option>
                                                    <option value="Supplier 1">Supplier 1</option>
                                                    <option value="Supplier 2">Supplier 2</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                <p><div class="card">
                                    <p><div class="card-container" style="display: flex;">
                                        <div class="card" style="width: 50%;">
                                            <p><div style="display: flex;">
                                                <div class="col-md-3">
                                                    <label for="id">Bank</label>
                                                </div>
                                                <div class="col-md-2">
                                                    <input type="text" name="supplierSelect" class="form-control" style="width: 100%">
                                                </div>
                                                <div class="col-md-1" style="vertical-align: middle;">
                                                    <select name="supplierSelect" class="form-control" onchange="fillColumns()">
                                                        <option value=""></option>
                                                        <option value="Supplier 1">Supplier 1</option>
                                                        <option value="Supplier 2">Supplier 2</option>
                                                    </select>
                                                </div>
                                                <div style="display: flex; padding-left: 20px">
                                                    <div class="col-md-2">
                                                        <label for="id">Kurs</label>
                                                    </div>
                                                    <div class="col-md-6" style="margin-left: 10px;">
                                                        <input type="number" name="supplierSelect" class="form-control" style="width: 100%">
                                                    </div>
                                                </div>
                                            </div>
                                            <div style="display: flex;">
                                                <div class="col-md-3">
                                                    <label for="id">Jenis Pembayaran</label>
                                                </div>
                                                <div class="col-md-2">
                                                    <input type="text" name="supplierSelect" class="form-control" style="width: 100%">
                                                </div>
                                                <div class="col-md-1" style="vertical-align: middle;">
                                                    <select name="supplierSelect" class="form-control" onchange="fillColumns()">
                                                        <option value=""></option>
                                                        <option value="Supplier 1">Supplier 1</option>
                                                        <option value="Supplier 2">Supplier 2</option>
                                                    </select>
                                                </div>
                                                <div style="display: flex; padding-left: 20px">
                                                    <div class="col-md-2">
                                                        <label for="id">Jumlah</label>
                                                    </div>
                                                    <div class="col-md-6" style="margin-left: 10px;">
                                                        <input type="number" name="supplierSelect" class="form-control" style="width: 100%">
                                                    </div>
                                                </div>
                                            </div>
                                            <div style="display: flex;">
                                                <div class="col-md-3">
                                                    <label for="id">Mata Uang</label>
                                                </div>
                                                <div class="col-md-2">
                                                    <input type="text" name="supplierSelect" class="form-control" style="width: 100%">
                                                </div>
                                                <div class="col-md-1" style="vertical-align: middle;">
                                                    <select name="supplierSelect" class="form-control" onchange="fillColumns()">
                                                        <option value=""></option>
                                                        <option value="Supplier 1">Supplier 1</option>
                                                        <option value="Supplier 2">Supplier 2</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div style="display: flex;">
                                                <div class="col-md-3">
                                                    <label for="id">Nilai Pembayaran</label>
                                                </div>
                                                <div class="col-md-6">
                                                    <input type="number" name="supplierSelect" class="form-control" style="width: 100%">
                                                </div>
                                            </div>
                                        </div>

                                    <!--CARD 2-->
                                        <div class="card" style="width: 50%;">
                                            <p><div style="display: flex;">
                                                <div class="col-md-5">
                                                    <label for="id">ID. Pembayaran</label>
                                                </div>
                                                <div class="col-md-2">
                                                    <input type="text" name="supplierSelect" class="form-control" style="width: 100%">
                                                </div>
                                                <div class="col-md-1" style="vertical-align: middle;">
                                                    <select name="supplierSelect" class="form-control" onchange="fillColumns()">
                                                        <option value=""></option>
                                                        <option value="Supplier 1">Supplier 1</option>
                                                        <option value="Supplier 2">Supplier 2</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div style="display: flex;">
                                                <div class="col-md-5">
                                                    <label for="id">Pembayaran Sebelumnya</label>
                                                </div>
                                                <div class="col-md-2">
                                                    <input type="text" name="supplierSelect" class="form-control" style="width: 100%">
                                                </div>
                                            </div>
                                            <div style="display: flex;">
                                                <div class="col-md-5">
                                                    <label for="id">Nilai Pembayaran</label>
                                                </div>
                                                <div class="col-md-4">
                                                    <input type="number" name="supplierSelect" class="form-control" style="width: 100%">
                                                </div>
                                            </div>
                                            <div style="display: flex;">
                                                <div class="col-md-5">
                                                    <label for="id">Belum Dibayar</label>
                                                </div>
                                                <div class="col-md-4">
                                                    <input type="number" name="supplierSelect" class="form-control" style="width: 100%">
                                                </div>
                                            </div>
                                            <div style="display: flex;">
                                                <div class="col-md-5">
                                                    <label for="id">Saldo</label>
                                                </div>
                                                <div class="col-md-4">
                                                    <input type="number" name="supplierSelect" class="form-control" style="width: 100%">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p>
                                <div class="mb-3">
                                    <input type="submit" name="isi" value="Isi" class="btn btn-primary">
                                    <input type="submit" name="koreksi" value="Koreksi" class="btn btn-primary">
                                    <input type="submit" name="hapus" value="Hapus" class="btn btn-primary">
                                    <input type="submit" name="proses" value="Proses" class="btn btn-primary" disabled>
                                    <input type="submit" name="keluar" value="Keluar" class="btn btn-primary">
                                    </div>
                            </form>
                            <br>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
