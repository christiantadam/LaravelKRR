@extends('layouts.appWovenBag')
@section('title', 'Copy Tabel Hit. Woven Bag')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-8 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">
                        Copy Tabel
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
                                    <button type="button" id="btnBrowseCust1" class="btn btn-primary">
                                        ...
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex">
                            <div class="col-2 p-0">Product Type :</div>
                            <div class="col-1 p-0">
                                <input type="text" id="idProd1" class="form-control" readonly>
                            </div>
                            <div class="col-7">
                                <div class="input-group mb-3">
                                    <input type="text" id="namaProd1" class="form-control" readonly>
                                    <button type="button" class="btn btn-primary" id="btnBrowseProd1">
                                        List Type
                                    </button>
                                </div>
                            </div>
                        </div>
                        <h3 style="text-decoration: underline;">Copy To:</h3>
                        <div class="d-flex">
                            <div class="col-2 p-0">Designed For :</div>
                            <div class="col-1 p-0">
                                <input type="text" id="idCust2" class="form-control" readonly>
                            </div>
                            <div class="col-7">
                                <div class="input-group mb-3">
                                    <input type="text" id="namaCust2" class="form-control" readonly>
                                    <button type="button" class="btn btn-primary" id="btnBrowseCust2">
                                        ...
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex">
                            <div class="col-2 p-0">Product Type :</div>
                            <div class="col-1 p-0">
                                <input type="text" id="idProd2" class="form-control"
                                    style="background-color: bisque" readonly>
                            </div>
                            <div class="col-7">
                                <div class="input-group mb-3">
                                    <input type="text" id="namaProd2" class="form-control"
                                        style="background-color: bisque" readonly>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex">
                            <div class="col-2 p-0">
                                <button id="copyButton" class="btn btn-success">Copy</button>
                                <button id="cancelButton" class="btn btn-secondary">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js\WovenBag\CopyTabel.js') }}"></script>
@endsection
