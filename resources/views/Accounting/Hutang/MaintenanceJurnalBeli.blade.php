@extends('layouts.appAccounting')
@section('content')
@section('title', 'Maintenance Jurnal Beli')

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-12 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Jurnal Beli</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            <form method="POST" action="">
                                @csrf
                                <!-- Form fields go here -->

                                <div>
                                    <div class="row">
                                        <div class="col-md-2">
                                            <label for="id">Supplier</label>
                                        </div>
                                        <div class="col-md-1">
                                            <input type="text" name="supplierSelect" class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-4">
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
                                    <div class="row">
                                        <div class="col-md-2">
                                            <label for="id">Bulan/Tahun</label>
                                        </div>
                                        <div class="col-md-1">
                                            <select name="nama_select" class="form-control" >
                                                <option value="option1">Pilihan 1</option>
                                                <option value="option2">Pilihan 2</option>
                                                <option value="option3">Pilihan 3</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row align-items-center">
                                        <div class="col-md-2" style="padding-left: 15px; white-space: nowrap;">
                                            <label for="idpenagihan">BKK</label>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="number" id="idpenagihan" name="idtagihan" class="form-control">
                                        </div>
                                        <div class="col-md-1">
                                            <label for="tanggal">Tanggal</label>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="date" id="tanggal" name="pembulatan" class="form-control">
                                        </div>
                                        <div class="col-md-2">
                                            <label for="tanggal">MataUang Bayar</label>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="text" id="matauangbayar" name="pembulatan" class="form-control">
                                        </div>
                                    </div>

                                    <hr style="height:2px;">
                                    <div class="row">
                                        <div class="col-8"> </div>
                                            <div class="col-4 d-flex align-items-center">
                                                <span style="white-space: nowrap; padding-right: 10px">BARANG yang diRETUR</span>
                                                <input type="text" name="text" style="width: 150px">
                                            </div>
                                        </div>
                                    </div>


                                    <div class="row">
                                        <div class="col-md-2">
                                            <label for="id">Kd. Perkiraan</label>
                                        </div>
                                        <div class="col-md-1">
                                            <input type="text" name="supplierSelect" class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-4">
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

                                    <div class="row">
                                        <div class="col-md-2">
                                            <label for="id">Mata Uang</label>
                                        </div>
                                        <div class="col-md-2">
                                            <select name="nama_select" class="form-control" >
                                                <option value="option1">Pilihan 1</option>
                                                <option value="option2">Pilihan 2</option>
                                                <option value="option3">Pilihan 3</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-4">
                                            <p><div class="row">
                                                <div class="col-md-6">
                                                    <label for="id">Tagihan:</label>
                                                </div>
                                                <div class="col-md-6">
                                                    <label for="id">Hutang</label>
                                                    <input type="number" name="tagihan" class="form-control">

                                                    <br><input class="form-check-input" type="checkbox" id="checkbox2" value="option1">
                                                    <label class="form-check-label" for="checkbox2">Koreksi Pembelian</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <p><div class="row">
                                                <div class="col-md-6">
                                                    <label for="id">Pelunasan</label>
                                                    <input type="number" name="pembulatan" class="form-control">
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <p><div class="row align-items-center">
                                        <div class="col-md-2">
                                            <label for="matauang">Keterangan</label>
                                        </div>
                                        <div class="col-md-5">
                                            <input type="text" name="matauang" class="form-control">
                                        </div>
                                    </div>

                                    <hr style="height:2px;">
                                    <table class="table">
                                        <thead class="table-dark">
                                            <tr>
                                                <th style="width: 15%;">Id Jurnal</th>
                                                <th style="width: 15%;">Kd. Perkiraan</th>
                                                <th style="width: 15%;">MataUang</th>
                                                <th style="width: 15%;">Nilai Debet</th>
                                                <th style="width: 15%;">Nilai Kredit</th>
                                                <th style="width: 45%;">Keterangan</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style="width: 15%;">Data 1</td>
                                                <td style="width: 15%;">Data 2</td>
                                                <td style="width: 15%;">Data 3</td>
                                                <td style="width: 15%;">Data 4</td>
                                                <td style="width: 15%;">Data 5</td>
                                                <td style="width: 45%;">Data 6</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <hr style="height:2px;">
                                    <div class="row">
                                        <div style="padding-left: 15px">
                                            <input type="submit" name="isi" value="ISI" class="btn btn-primary">
                                        </div>
                                        <div class="col-1">
                                            <input type="submit" name="koreksi" value="KOREKSI" class="btn btn-primary">
                                        </div>
                                        <div class="col-1">
                                            <input type="submit" name="hapus" value="HAPUS" class="btn btn-primary">
                                        </div>
                                        <div class="col-1">
                                            <input type="submit" name="proses" value="PROSES" class="btn btn-primary" disabled>
                                        </div>
                                        <div class="col-8">
                                            <input type="submit" name="keluar" value="KELUAR" class="btn btn-primary d-flex ml-auto">
                                        </div>
                                    </div>
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
