@extends('layouts.appWovenBag')
@section('title', 'Cetak Tabel Hit. Woven Bag')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-6 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">
                        Cetak Tabel Hitungan Woven Bag
                    </div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="d-flex">
                            <div class="col-2 p-0">Product name :</div>
                            <div class="col-2 p-0">
                                <div class="form-check">
                                    <input type="radio" class="form-check-input" id="radioSandwich"
                                        name="radioProductName" value="Sandwich">
                                    <label class="form-check-label" for="radioSandwich">Sandwich</label>
                                </div>
                            </div>
                            <div class="col-2 p-0">
                                <div class="form-check">
                                    <input type="radio" class="form-check-input" id="radioTubing" name="radioProductName"
                                        value="Tubing">
                                    <label class="form-check-label" for="radioTubing">Tubing</label>
                                </div>
                            </div>
                            <div class="col-2 p-0">
                                <div class="form-check">
                                    <input type="radio" class="form-check-input" id="radioTubingOPP"
                                        name="radioProductName" value="Tubing OPP">
                                    <label class="form-check-label" for="radioTubingOPP">Tubing OPP</label>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex mt-2">
                            <div class="col-2 p-0">Designed For :</div>
                            <div class="col-1 p-0">
                                <input type="text" id="idCust" class="form-control" readonly>
                            </div>
                            <div class="col-7">
                                <div class="input-group mb-3">
                                    <input type="text" id="namaCust" class="form-control" readonly>
                                    <button type="button" id="btnBrowseCust" class="btn btn-primary">
                                        ...
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex">
                            <div class="col-2 p-0">Ukuran :</div>
                            <div class="col-8 pl-0">
                                <div class="input-group mb-3">
                                    <input type="text" id="ukuranProd" class="form-control" readonly>
                                    <button type="button" class="btn btn-primary" id="btnBrowseUkuran">
                                        ...
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex">
                            <div class="col-2 p-0">Product Type :</div>
                            <div class="col-1 p-0">
                                <input type="text" id="idProd" class="form-control" readonly>
                            </div>
                            <div class="col-7">
                                <div class="input-group mb-3">
                                    <input type="text" id="namaProd" class="form-control" readonly>
                                    <button type="button" class="btn btn-primary" id="btnBrowseProd">
                                        ...
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex">
                            <div class="col-4 p-0">
                                <button id="cetakButton" class="btn btn-success">Cetak</button>
                                <button id="clearButton" class="btn btn-secondary">Clear</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js\WovenBag\CetakTabelHitungan.js') }}"></script>
@endsection
