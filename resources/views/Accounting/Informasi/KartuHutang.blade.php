@extends('layouts.appAccounting')
@section('content')
@section('title', 'Kartu Hutang')

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-7 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Informasi Piutang Penjualan</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            <form method="POST" action="">
                                @csrf
                                <!-- Form fields go here -->
                                <div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="periode">PERIODE</label>
                                    </div>
                                    <div class="col-md-3">
                                        <input type="date" id="periode" class="form-control" style="width: 100%">
                                    </div>
                                    <div class="col-md-3">
                                        sampai dengan
                                    </div>
                                    <div class="col-md-3">
                                        <input type="date" id="periode" class="form-control" style="width: 100%">
                                    </div>
                                </div>
                                <div class="d-flex">
                                    <div class="col-md-3">
                                        <label for="supplier">SUPPLIER</label>
                                    </div>
                                    <div class="col-md-9">
                                        <select name="supplierSelect" class="form-control" onchange="fillColumns()">
                                            <option value="Suppler 1">Sup1</option>
                                            <option value="Suppler 2">Sup2</option>
                                        </select>
                                    </div>
                                </div>

                                <br><div class="mb-3">
                                    <div class="row">
                                        <div class="col-2">
                                            <input type="submit" id="btnProses" name="proses" value="Proses" class="btn btn-primary">
                                        </div>
                                        <div class="col-2">
                                            <input type="submit" id="btnPerbaiki" name="perbaiki" value="Perbaiki" class="btn btn-primary">
                                        </div>
                                        <div class="col-2">
                                            <input type="submit" id="btnKeluar" name="keluar" value="KELUAR" class="btn btn-primary">
                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
