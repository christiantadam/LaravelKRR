@extends('layouts.appAccounting')
@section('content')
@section('title', 'Maintenance BKK')

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
                                <p><div class="card">
                                    <table class="table" style="overflow-x: auto;">
                                        <thead class="table-dark">
                                            <tr>
                                                <th>ID. Bayar</th>
                                                <th>ID. TT</th>
                                                <th>Bank</th>
                                                <th>Nama Supplier</th>
                                                <th>Rincian Pembayaran</th>
                                                <th>Nilai Bayar</th>
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

                                <br><div class="row">
                                    <div class="col">
                                        <div class="d-flex">
                                        <button>Group BKK</button>
                                        <button>Refresh BKK</button>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="d-flex">
                                        <button>Tampil BKK</button>
                                        <div class="col-md-3 ml-auto">
                                            <label for="id">ID. Pembayaran</label>
                                        </div>
                                        <div class="col-md-2">
                                            <input type="text" name="supplierSelect" class="form-control" style="width: 100%">
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <hr style="height:2px;">
                                <div class="card-container" style="display: flex;">
                                    <div class="card" style="width: 50%;">
                                        <div class="card-body">
                                            <div class="col">
                                                <div class="d-flex">
                                                    <div>
                                                    <input type="radio" name="radiogrup1" value="radio_1" id="radio_1">
                                                    <label for="radio_1">Detail BG/CEK/TRANSFER</label>
                                                    </div>
                                                    <div class="col-md-2 ml-auto">
                                                    <label for="id">ID. Detail</label>
                                                    </div>
                                                    <div class="col-md-2">
                                                    <input type="text" name="inputIdDetail" class="form-control" style="width: 100%">
                                                    </div>
                                                </div>
                                            </div>
                                            <div style="overflow-x: auto;">
                                            <table style="width: 150%; table-layout: fixed;">
                                                <colgroup>
                                                <col style="width: 20%;">
                                                <col style="width: 25%;">
                                                <col style="width: 25%;">
                                                <col style="width: 25%;">
                                                <col style="width: 25%;">
                                                </colgroup>
                                                <thead class="table-dark">
                                                <tr>
                                                    <th>ID. Detail</th>
                                                    <th>No. BG/CEK/TRANSFER</th>
                                                    <th>Jatuh Tempo</th>
                                                    <th>Cetak ..</th>
                                                    <th>Header 5</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td>Data 1</td>
                                                    <td>Data 2</td>
                                                    <td>Data 3</td>
                                                    <td>Data 4</td>
                                                    <td>Data 5</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                            </div>
                                        </div>
                                    </div>

                                <!--CARD 2-->
                                <div class="card" style="width: 50%;">
                                        <div class="card-body">
                                            <div class="col">
                                            <div class="d-flex">
                                                <div>
                                                <input type="radio" name="radiogrup2" value="radio_1" id="radio_1">
                                                <label for="radio_1">Detail PEMBAYARAN</label>
                                                </div>
                                                <div class="col-md-2 ml-auto">
                                                <label for="id">ID. Detail</label>
                                                </div>
                                                <div class="col-md-2">
                                                <input type="text" name="supplierSelect" class="form-control" style="width: 100%">
                                                </div>
                                            </div>
                                            </div>

                                            <div style="overflow-x: auto;">
                                                <table style="width: 150%; table-layout: fixed;">
                                                    <colgroup>
                                                    <col style="width: 20%;">
                                                    <col style="width: 25%;">
                                                    <col style="width: 25%;">
                                                    <col style="width: 25%;">
                                                    <col style="width: 25%;">
                                                    </colgroup>
                                                    <thead class="table-dark">
                                                    <tr>
                                                        <th>ID. Detail</th>
                                                        <th>Rinacian Bayar</th>
                                                        <th>No. Rincian</th>
                                                        <th>Header 4</th>
                                                        <th>Header 5</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td>Data 1</td>
                                                        <td>Data 2</td>
                                                        <td>Data 3</td>
                                                        <td>Data 4</td>
                                                        <td>Data 5</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <hr style="height:2px;">
                                <div class="mb-3">
                                    <div class="row">
                                        <div class="col-1" style="padding-left: 15px">
                                            <input type="submit" name="isi" value="ISI" class="btn btn-primary">
                                        </div>
                                        <div class="col-1" style="padding-left: 15px">
                                            <input type="submit" name="koreksi" value="KOREKSI" class="btn btn-primary">
                                        </div>
                                        <div class="col-1" style="padding-left: 15px">
                                            <input type="submit" name="hapus" value="HAPUS" class="btn btn-primary">
                                        </div>
                                        <div class="col-8" style="padding-left: 15px">
                                            <input type="submit" name="proses" value="PROSES" class="btn btn-primary">
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
