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
                                                <th>Id. Penagihan</th>
                                                <th>Nama Supplier</th>
                                                <th>Jenis Dok.</th>
                                                <th>Sts. Pajak</th>
                                                <th>Mata Uang</th>
                                                <th>Nilai Penagihan</th>
                                            </tr>
                                        </thead>
                                        <tbody>
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
                                                <th>Qty Tagih</th>
                                                <th>Satuan</th>
                                                <th>Qty Retur</th>
                                                <th>Tgl. Retur</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>

                                <p>
                                <div class="mb-3">
                                    <div class="row">
                                        <div class="col-2">
                                            <button class="btn btn-primary" id="btn_proses">Proses</button>
                                        </div>
                                        <div class="col-10">
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
