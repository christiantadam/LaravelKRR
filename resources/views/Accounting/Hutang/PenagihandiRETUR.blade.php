@extends('layouts.appAccounting')
@section('content')
@section('title', 'Penagihan di Retur')

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-12 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Penagihan diRETUR</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            <form method="POST" action="">
                                @csrf
                                <!-- Form fields go here -->

                                <div class="row">
                                    <div class="col-9">
                                        <div style="white-space: nowrap;">
                                            KETERANGAN: BARANG diRETUR SEMUA
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div>
                                            <button class="btn d-flex ml-auto">Tampilkan Retur Sebagian</button>
                                        </div>
                                    </div>
                                </div>

                                <div class="card">
                                    <table class="table">
                                        <thead class="table-dark">
                                            <tr>
                                                <th>Tanggal</th>
                                                <th>Id Penagihan</th>
                                                <th>Nama Supplier</th>
                                                <th>Jenis Dok.</th>
                                                <th>Sts. Pajak</th>
                                                <th>Mata Uang</th>
                                                <th>Nilai Penagihan</th>
                                                <th>.......</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><input type="checkbox" id="checkAll">Data 1</td>
                                                <td>Data 2</td>
                                                <td>Data 3</td>
                                                <td>Data 4</td>
                                                <td>Data 5</td>
                                                <td>Data 6</td>
                                                <td>Data 7</td>
                                                <td>Data 8</td>
                                            </tr>

                                            <!-- Tambahkan data tabel sesuai kebutuhan -->
                                        </tbody>
                                    </table>
                                </div>

                                <br><div class="row">
                                    <div class="col-9">
                                        <div style="white-space: nowrap;">
                                            BARANG yang diRETUR
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div>
                                            <input type="text" name="text" class="form-control d-flex ml-auto" style="width: 150px">
                                        </div>
                                    </div>
                                </div>

                                <p><div class="card">
                                    <table class="table">
                                        <thead class="table-dark">
                                            <tr>
                                                <th>No. Terima</th>
                                                <th>Id. Divisi</th>
                                                <th>No. SPPB</th>
                                                <th>Kd. Brg</th>
                                                <th>Nama Barang</th>
                                                <th>Gty Tagih</th>
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

                                            <!-- Tambahkan data tabel sesuai kebutuhan -->
                                        </tbody>
                                    </table>
                                </div>

                                <p>
                                <div class="mb-3">
                                    <div class="row">
                                        <div class="col-2">
                                            <input type="submit" id="btnProses" name="proses" value="Proses" class="btn btn-primary" disabled>
                                        </div>
                                        <div class="col-10">
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
