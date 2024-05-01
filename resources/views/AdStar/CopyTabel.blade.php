@extends('layouts.appAdStar')
@section('content')

<link href="{{ asset('css/AdStar/CopyTabel.css') }}" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>

<h2>Form Copy Tabel </h2>

<div class="container">
    <div class="card">
        <div class="row mt-3">
            <div class="col-lg-2 aligned-text">Product name :</div>
            <div class="col-lg-2">
                <div class="form-check">
                    <input type="radio" class="form-check-input" id="radio1" name="optradio" value="1">StarPark
                    <label class="form-check-label" for="radio1"></label>
                </div>
            </div>
            <div class="col-lg-2">
                <div class="form-check">
                    <input type="radio" class="form-check-input" id="radio2" name="optradio" value="2">AdStar
                    <label class="form-check-label" for="radio2"></label>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-lg-2 aligned-text">Model :</div>
            <div class="col-lg-2">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="check1" name="optioncheck" value="1">
                    <label class="form-check-label" for="check1">Top Open</label>
                </div>
            </div>
            <div class="col-lg-2">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="check2" name="optioncheck" value="2">
                    <label class="form-check-label" for="check2">Top Close</label>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-lg-2 aligned-text">Desing For :</div>
            <div class="col-lg-5">
                <div class="input-group mb-3">
                    <input type="text" id='idcust' class="form-control" placeholder="" aria-label="" readonly>
                    <input type="text" id='namacust' class="form-control" placeholder="" aria-label="" readonly>
                    <button type="button" id="btncust1" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mdl_customer1">
                        ...
                    </button>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-lg-2 aligned-text">Product Type :</div>
            <div class="col-lg-5">
                <div class="input-group mb-3">
                    <input type="text" id='idprod1' class="form-control" placeholder="" aria-label="" readonly>
                    <input type="text" id='namaprod1' class="form-control" placeholder="" aria-label="" readonly>
                    <button type="button" id="btnprodtype" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mdl_prodtype">
                        List Type
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="container">
    <div class="card">
        <h3 class="card-title">Copy to</h3>
        <div class="row mt-3">
            <div class="col-lg-2 aligned-text">Desing For :</div>
            <div class="col-lg-5">
                <div class="input-group mb-3">
                    <input type="text" id='idcust2' class="form-control" placeholder="" aria-label="" readonly>
                    <input type="text" id='namacust2' class="form-control" placeholder="" aria-label="" readonly>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mdl_customer2">
                        ...
                    </button>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-lg-2 aligned-text">Product Type :</div>
            <div class="col-lg-5">
                <div class="input-group mb-3">
                    <input type="text" id='idprod2' class="form-control" placeholder="" aria-label="" readonly>
                        --
                    <input type="text" id='namaprod2' class="form-control" placeholder="" aria-label="" readonly>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-lg-2 aligned-text">
                <button id="addButton" class="btn btn-primary" style="display: block;">Copy</button>
                <button id="saveButton" class="btn btn-primary" style="display: none;">Save</button>
            </div>
            <div class="col-lg-2 aligned-text">
                <button id="cancelButton" class="btn btn-success" style="display: none;">Cancel</button>
            </div>
        </div>
    </div>
</div>


<!-- Modal customer asal-->
<div class="modal fade" id="mdl_customer1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="mdl_customer1" aria-hidden="true">
    <div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
        <h1 class="modal-title fs-5" id="mdl_customer">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <table id="tbl_customer1" class="table table-bordered">
                <thead class="thead-dark">
                    <tr>
                        <th>Namacust</th>
                        <th>IDCUST</th>
                    </tr>
                </thead>
                <tbody>
                    {{-- @foreach ($dataCust as $data)
                        <tr data-namacust="{{ $data->NamaCust }}" data-idcust="{{ $data->IDCust }}">
                            <td>{{ $data->NamaCust }}</td>
                            <td>{{ $data->IDCust }}</td>
                        </tr>
                    @endforeach --}}
                </tbody>
            </table>
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
    </div>
    </div>
</div>

<!-- Modal customer product type-->
<div class="modal fade" id="mdl_prodtype" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="mdl_prodtype" aria-hidden="true">
    <div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
        <h1 class="modal-title fs-5" id="mdl_prodtype">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <table id="tbl_prodtype" class="table table-bordered">
                <thead class="thead-dark">
                    <tr>
                        <th>Nama Barang</th>
                        <th>ID</th>
                    </tr>
                </thead>
                <tbody>
                     {{-- @foreach ($dataCust as $data)
                         <tr data-namacust="{{ $data->NamaCust }}" data-idcust="{{ $data->IDCust }}">
                             <td>{{ $data->NamaCust }}</td>
                             <td>{{ $data->IDCust }}</td>
                         </tr>
                     @endforeach --}}
                </tbody>
            </table>
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
    </div>
    </div>
</div>

<!-- Modal customer asal-->
<div class="modal fade" id="mdl_customer2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="mdl_customer2" aria-hidden="true">
    <div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
        <h1 class="modal-title fs-5" id="mdl_customer2">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <table id="tbl_customer2" class="table table-bordered">
                <thead class="thead-dark">
                    <tr>
                        <th>Namacust</th>
                        <th>IDCUST</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($dataCust2 as $data)
                        <tr data-NAMACUST="{{ $data->NAMACUST }}" data-IDCust="{{ $data->IDCust }}">
                            <td>{{ $data->NAMACUST }}</td>
                            <td>{{ $data->IDCust }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
    </div>
    </div>
</div>

<script src="{{ asset('js\AdStar\CopyTabel.js')}}"></script>
@endsection
