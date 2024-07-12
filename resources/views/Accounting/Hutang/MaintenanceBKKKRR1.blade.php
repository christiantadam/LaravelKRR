@extends('layouts.appAccounting')
@section('content')
@section('title', 'Maintenance BKK KRR1')

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-12 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Maintenance BKK</div>
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

                                <div class="card bg-info">
                                    <div>
                                        Data Belum Ada BKK
                                    </div>
                                    <p><div style="overflow-x: auto;">
                                        <table style="width: 100%; table-layout: fixed;">
                                            <colgroup>
                                            <col style="width: 10%;">
                                            <col style="width: 10%;">
                                            <col style="width: 30%;">
                                            <col style="width: 10%;">
                                            <col style="width: 20%;">
                                            <col style="width: 10%;">
                                            </colgroup>
                                            <thead class="table-dark">
                                                <tr>
                                                    <th>ID. Bayar</th>
                                                    <th>ID. TT</th>
                                                    <th>Nama Supplier</th>
                                                    <th>Rincian Pembayaran</th>
                                                    <th>Nilai ...</th>
                                                    <th>...</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><input type="checkbox" class="data-checkbox">Data 1</td>
                                                    <td>Data 2</td>
                                                    <td>Data 3</td>
                                                    <td>Data 4</td>
                                                    <td>Data 5</td>
                                                    <td>Data 6</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div class="mb-3">
                                        <div class="row">
                                            <div class="col-11" style="padding-left: 15px">
                                                <input type="submit" name="groupbkk" value="GROUP BKK" class="btn">
                                            </div>
                                            <div class="col-1">
                                                <input type="submit" name="tampilbkk" value="TAMPIL BKK" class="btn d-flex ml-auto">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <p>
                                <div class="card">
                                    <div class="row">
                                        <div class="col-md-2">
                                            <label for="id">ID.Bayar/ID.Detail</label>
                                        </div>
                                        <div class="col-md-1">
                                            <input type="text" name="supplierSelect" class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-1">
                                            <input type="text" name="supplierSelect" class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-1" >
                                            <label for="id"></label>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="text" name="supplierSelect" class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-5 d-flex justify-content-end">
                                            <label for="id" style="margin-left: 10px;">Bank</label>
                                            <div class="col-md-2">
                                                <input type="text" name="supplierSelect" class="form-control" style="width: 100%">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-2">
                                            <label for="id">Rincian Pembayaran</label>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="number" name="supplierSelect" class="form-control" style="width: 100%">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-2">
                                            <label for="id">Nilai Rincian Rp.</label>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="text" name="supplierSelect" class="form-control" style="width: 100%">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-2">
                                            <label for="id">Kode Perkiraan</label>
                                        </div>
                                        <div class="col-md-1">
                                            <input type="text" name="supplierSelect" class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-3">
                                            <input type="text" name="supplierSelect" class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-1">
                                            <select name="supplierSelect" class="form-control" onchange="fillColumns()">
                                                <option value=""></option>
                                                <option value="Supplier 1">Kd1</option>
                                                <option value="Supplier 2">Kd2</option>
                                            </select>
                                        </div>
                                    </div>

                                    <p><div style="overflow-x: auto;">
                                        <table style="width: 100%; table-layout: fixed;">
                                            <colgroup>
                                            <col style="width: 10%;">
                                            <col style="width: 10%;">
                                            <col style="width: 30%;">
                                            <col style="width: 10%;">
                                            <col style="width: 20%;">
                                            <col style="width: 10%;">
                                            </colgroup>
                                            <thead class="table-dark">
                                                <tr>
                                                    <th>ID. Detail</th>
                                                    <th>Rincian Pembayaran</th>
                                                    <th>Nilai Rincian</th>
                                                    <th>Kd. Perkiraan</th>
                                                    <th>...</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><input type="checkbox" class="data-checkbox">Data 1</td>
                                                    <td>Data 2</td>
                                                    <td>Data 3</td>
                                                    <td>Data 4</td>
                                                    <td>Data 5</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <p><div class="row">
                                        <div class="col-md-2" style="padding-left: 950px; padding-right: 50px">
                                            <label for="id">Total</label>
                                        </div>
                                        <div class="col-md-1">
                                            <input type="text" name="supplierSelect" class="form-control" style="width: 100%">
                                        </div>
                                    </div>
                                </div>

                                <p>
                                <div>
                                    <input type="submit" name="isi" value="ISI" class="btn btn-primary">
                                    <input type="submit" name="koreksi" value="KOREKSI" class="btn btn-primary">
                                    <input type="submit" name="hapus" value="HAPUS" class="btn btn-primary">
                                    <input type="submit" name="proses" value="PROSES" class="btn btn-primary" disabled>
                                    <input type="submit" name="keluar" value="KELUAR" class="btn btn-primary d-flex ml-auto">
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
