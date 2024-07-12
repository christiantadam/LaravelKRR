@extends('layouts.appAccounting')
@section('content')
@section('title', 'Cetak Nota dan Faktur')

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-8 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Cek Nota dan Faktur</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            <form method="POST" action="">
                                @csrf
                                <!-- Form fields go here -->
                                    <div class="card">
                                        <div class="d-flex">
                                            <div class="col-md-4">
                                                <input type="radio" id="pilihan1" name="pilihan" value="pilihan1">Tunai
                                            </div>
                                            <div class="col-md-4">
                                                <input type="radio" id="pilihan2" name="pilihan" value="pilihan2">Nota/Faktur
                                            </div>
                                            <div class="col-md-4">
                                                <input type="radio" id="pilihan3" name="pilihan" value="pilihan3">Faktur Pajak Tunai
                                            </div>
                                        </div>
                                        <p><div class="d-flex">
                                            <div class="col-md-4">
                                                <input type="radio" id="pilihan4" name="pilihan" value="pilihan4">Faktur Pajak
                                            </div>
                                            <div class="col-md-4">
                                                <input type="radio" id="pilihan5" name="pilihan" value="pilihan5">Faktur Uang Muka
                                            </div>
                                            <div class="col-md-4">
                                                <input type="radio" id="pilihan6" name="pilihan" value="pilihan6">Faktur Tunai UM
                                            </div>
                                        </div>
                                        <br>
                                        <div class="d-flex">
                                            <div class="col-md-4">
                                                <label for="tglProduksi">Tanggal Penagihan</label>
                                            </div>
                                            <div class="col-md-3">
                                                <input type="date" id="tglProduksi" class="form-control" style="width: 100%">
                                            </div>
                                        </div>
                                        <p><div class="d-flex">
                                            <div class="col-md-4">
                                                <label for="customer">Customer</label>
                                            </div>
                                            <div class="col-md-3">
                                                <select name="customerSelect" class="form-control" onchange="fillColumns()">
                                                    <option value="NoPenagihan 1">No1</option>
                                                    <option value="NoPenagihan 2">No2</option>
                                                </select>
                                            </div>
                                        </div>
                                        <p><div class="d-flex">
                                            <div class="col-md-4">
                                                <label for="idPenagihan">Id Penagihan</label>
                                            </div>
                                            <div class="col-md-3">
                                            <input type="text" id="idPenagihan" class="form-control" style="width: 100%">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br><div class="mb-3">
                                    <div class="row">
                                        <div class="col-1">
                                            <input type="submit" id="btnCetak" name="cetak" value="Cetak" class="btn btn-primary">
                                        </div>
                                        <div class="col-2">
                                            <input type="submit" id="btnKeluar" name="keluar" value="Keluar" class="btn btn-primary">
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
