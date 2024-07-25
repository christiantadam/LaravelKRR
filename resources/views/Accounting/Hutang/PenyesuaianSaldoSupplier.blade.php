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
                                        <h5>PENYESUAIAN SALDO</h5>
                                    </div>
                                </div>

                                <div class="radio-container">
                                    <div>
                                        <label for="radio_1">Supplier</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="radiogrup" value="radio_2" id="radio_hutang">
                                        <label for="radio_2">Hutang</label>
                                        <label style="visibility: hidden"">AAAAA</label>
                                        <input type="radio" name="radiogrup" value="radio_3" id="radio_tunai">
                                        <label for="radio_3">Tunai</label>
                                        <label style="visibility: hidden"">AAAAAAA</label>
                                        <button id="btn_ok" class="btn btn-success">OK</button>
                                    </div>
                                    <div>

                                    </div>
                                </div>
                                <br>
                                <table class="table" id="tablepenyesuaian">
                                    <thead class="table-dark">
                                        <tr>
                                            <th>Id Supplier</th>
                                            <th>Supplier</th>
                                            <th>Kartu Saldo</th>
                                            <th>Kartu Saldo Rp</th>
                                            <th>Mata Uang</th>
                                            <th>Supplier Saldo</th>
                                            <th>Supplier Saldo Rp</th>
                                            <th>Id Trans</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>

                                <div class="row">
                                    <div class="col-9" style="margin-left: 20px;">
                                        <div>
                                            <input class="form-check-input" type="checkbox" id="checkbox2" value="option1">
                                        </div>
                                        <div style="white-space: nowrap;">
                                            Pilih Semua
                                        </div>
                                    </div>
                                    <div class="col-2" style="margin-left: 134px;">
                                        <div>
                                            <input type="submit" id="btnProses1" name="proses" value="Proses" class="btn btn-primary d-flex ml-auto">
                                        </div>
                                    </div>
                                </div>

                                <hr style="height:2px;">
                                <div>
                                    <div style="white-space: nowrap;">
                                        <h5>ISI SALDO KOSONG</h5>
                                    </div>
                                </div>

                                <br><table class="table" id="tablesaldokosong">
                                    <thead class="table-dark">
                                        <tr>

                                            <th>Id. Supplier</th>
                                            <th>Supplier</th>
                                            <th>Supplier Saldo</th>
                                            <th>Supplier Saldo Rp</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>

                                <p>
                                <div class="mb-3">
                                    <div class="row">
                                        <div class="col-12">
                                            <input type="submit" id="btn_proses2" name="proses" value="Proses" class="btn btn-primary d-flex ml-auto">
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
