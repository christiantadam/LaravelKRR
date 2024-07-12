@extends('layouts.appAccounting')
@section('content')
@section('title', 'Penyesuaian Saldo Supplier')

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-12 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Penyesuaian Saldo Supplier</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            <form method="POST" action="">
                                @csrf
                                <!-- Form fields go here -->
                                <div >
                                    <div style="white-space: nowrap;">
                                        PENYESUAIAN SALDO
                                    </div>
                                </div>

                                <div class="radio-container">
                                    <div>
                                        <label for="radio_1">Supplier</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="radiogrup" value="radio_2" id="radio_2">
                                        <label for="radio_2">Hutang</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="radiogrup" value="radio_3" id="radio_3">
                                        <label for="radio_3">Tunai</label>
                                    </div>
                                    <button>OK</button>
                                </div>

                                <table class="table">
                                    <thead class="table-dark">
                                        <tr>
                                            <th>Id Supplier</th>
                                            <th>Supplier</th>
                                            <th>Kartu Saldo</th>
                                            <th>Kartu Saldo Rp</th>
                                            <th>Mata Uang</th>
                                            <th>Supplier Saldo</th>
                                            <th>Supplier Saldo...</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><input type="checkbox" id="checkAll"> Data 1</td>
                                            <td>Data 2</td>
                                            <td>Data 3</td>
                                            <td>Data 4</td>
                                            <td>Data 5</td>
                                            <td>Data 6</td>
                                            <td>Data 7</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div class="row">
                                    <div class="col-9">
                                        <div>
                                            <input class="form-check-input" type="checkbox" id="checkbox2" value="option1">
                                        </div>
                                        <div style="white-space: nowrap;">
                                            Pilih Semua
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div>
                                            <input type="submit" id="btnProses1" name="proses" value="Proses" class="btn btn-primary d-flex ml-auto">
                                        </div>
                                    </div>
                                </div>

                                <hr style="height:2px;">
                                <div>
                                    <div style="white-space: nowrap;">
                                        ISI SALDO KOSONG
                                    </div>
                                </div>

                                <br><table class="table">
                                    <thead class="table-dark">
                                        <tr>

                                            <th>Id. Supplier</th>
                                            <th>Supplier</th>
                                            <th>Supplier Saldo</th>
                                            <th>Supplier Saldo...</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><input type="checkbox" id="checkAll"> Data 1</td>
                                            <td>Data 2</td>
                                            <td>Data 3</td>
                                            <td>Data 4</td>
                                        </tr>

                                        <!-- Tambahkan data tabel sesuai kebutuhan -->
                                    </tbody>
                                </table>

                                <p>
                                <div class="mb-3">
                                    <div class="row">
                                        <div class="col-12">
                                            <input type="submit" id="btnProses" name="proses" value="Proses" class="btn btn-primary d-flex ml-auto">
                                        </div>
                                        <div class="col-12">
                                            <input type="submit" id="btnKeluar" name="keluar" value="Keluar" class="btn btn-primary d-flex ml-auto">
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
