@extends('layouts.appAccounting')
@section('content')
@section('title', 'ACC BKK')

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-12 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">ACC Pengajuan BKK</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            <form method="POST" action="">
                                @csrf
                                <!-- Form fields go here -->
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

                                <div>
                                    <p>
                                    <div class="row">
                                        <div class="col-md-2">
                                            <label for="idPembayaranPenagihan">ID.Pembayaran/Penagihan</label>
                                        </div>
                                        <div class="col-md-1">
                                            <input type="text" id="idPembayaranPenagihan" class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-4">
                                            <input type="text" id="idPembayaranPenagihan" class="form-control" style="width: 100%">
                                        </div>
                                    </div>
                                    <p>
                                    <div class="row">
                                        <div class="col-md-2">
                                            <label for="pembayaran">Pembayaran</label>
                                        </div>
                                        <div class="col-md-3">
                                            <input type="text" id="pembayaran" class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-2" >
                                            <label for="id"></label>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="text" class="form-control" style="width: 100%">
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-2">
                                            <label for="bank">Bank</label>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="text" id="bank" name="bank_select" class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-1">
                                            <select name="bank_select" class="form-control">
                                                <option value="option1">Bank 1</option>
                                                <option value="option2">Bank 2</option>
                                                <option value="option3">Bank 3</option>
                                            </select>
                                        </div>
                                        <div class="col-md-2">
                                            <label for="jenisJumlahPembayaran" style="padding-left: 50px">Jenis/Jumlah Pembayaran</label>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="number" id ="jenisJumlahPembayaran"name="jenisSelect" class="form-control" style="width: 100%">
                                        </div>
                                        <div class="col-md-1">
                                            <select name="jenisSelect" class="form-control">
                                                <option value="option1">Jenis 1</option>
                                                <option value="option2">Jenis 2</option>
                                                <option value="option3">Jenis 3</option>
                                            </select>
                                        </div>
                                        <div class="col-md-1">
                                            <input type="number" class="form-control" style="width: 100%">
                                        </div>
                                    </div>
                                </div>

                                <hr style="height:2px;">
                                <b>PENAGIHAN</b>
                                <p><div class="row">
                                    <div class="col-md-2">
                                        <label for="mataUang">Mata Uang</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" id="mataUang" class="form-control" style="width: 100%">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-2">
                                        <label for="nilaiPenagihan">Nilai Penagihan</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" id="nilaiPenagihan" class="form-control" style="width: 100%">
                                    </div>
                                    <div class="col-md-3">
                                        <label for="nilaiPenagihanRP" style="padding-left: 50px">Nilai Penagihan (RP)</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="number" id="nilaiPenagihanRP" class="form-control" style="width: 100%">
                                    </div>
                                </div>

                                <br><b>PEMBAYARAN</b>
                                <br><div class="card-container" style="display: flex;">
                                    <div class="card" style="width: 50%;">
                                        <p><div style="display: flex;">
                                            <div class="col-md-4">
                                                <label for="bank">Bank</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="text" id="bank" name="bankSelect" class="form-control" style="width: 100%">
                                            </div>
                                            <div class="col-md-1" style="vertical-align: middle;">
                                                <select name="bankSelect" class="form-control" onchange="fillColumns()">
                                                    <option value=""></option>
                                                    <option value="Bank 1">Bank 1</option>
                                                    <option value="Bank 2">Bank 2</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div style="display: flex;">
                                            <div class="col-md-4">
                                                <label for="nilaiDibayarkan">Nilai Dibayarkan</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="text" id="nilaidibayarkan" class="form-control" style="width: 100%">
                                            </div>
                                        </div>
                                        <div style="display: flex;">
                                            <div class="col-md-4">
                                                <label for="nilaiKurs">Nilai Kurs</label>
                                            </div>
                                            <div class="col-md-6">
                                                <input type="number" id="nilaikurs" class="form-control" style="width: 100%">
                                            </div>
                                        </div>
                                    </div>

                                <!--CARD 2-->
                                    <div class="card" style="width: 50%;">
                                        <p><div style="display: flex;">
                                            <div class="col-md-5">
                                                <label>Sudah dibayar:</label>
                                            </div>
                                        </div>
                                        <p><div style="display: flex;">
                                            <div class="col-md-5">
                                                <label for="mataUang" class="clickable">Mata Uang</label>
                                            </div>
                                            <div class="col-md-4">
                                                <input type="text" id="mataUang" class="form-control" style="width: 100%">
                                            </div>
                                        </div>
                                        <div style="display: flex;">
                                            <div class="col-md-5">
                                                <label for="nilaiSudahDibayar" class="clickable">Nilai SUDAH dibayar</label>
                                            </div>
                                            <div class="col-md-4">
                                                <input type="number" id="nilaiSudahDibayar" class="form-control" style="width: 100%">
                                            </div>
                                        </div>
                                        <div style="display: flex;">
                                            <div class="col-md-5">
                                                <label for="nilaiBelumDibayar" class="clickable">Nilai BELUM dibayar</label>
                                            </div>
                                            <div class="col-md-4">
                                                <input type="number" id="nilaiBelumDibayar" class="form-control" style="width: 100%">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p>
                                <div class="mb-3">
                                    <div class="row">
                                        <div class="col-11" style="padding-left: 15px">
                                            <input type="submit" name="isi" value="ISI" class="btn btn-primary">
                                        </div>
                                        <div class="col-1">
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
