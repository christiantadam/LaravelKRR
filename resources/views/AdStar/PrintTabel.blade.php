@extends('layouts.appAdStar')
@section('content')
<link href="{{ asset('css/AdStar/PrintTabel.css') }}" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>

<h2>Form Print Tabel </h2>

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
            <div class="col-lg-2 aligned-text">Desing For :</div>
            <div class="col-lg-5">
                <div class="input-group mb-3">
                    <input type="textfield" id='idcust' class="form-control" placeholder="" aria-label="" readonly>
                    <input type="text" id='namacust' class="form-control" placeholder="" aria-label="" readonly>
                    <button type="button" id="btncust" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mdl_customer">
                        ...
                    </button>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-lg-2 aligned-text">Ukuran :</div>
            <div class="col-lg-5">
                <div class="input-group mb-3">
                    <input type="text" id='idukuran' class="form-control" placeholder="" aria-label="" readonly>
                    <button type="button" id="btnukuran" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mdl_ukuran">
                        ...
                    </button>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-lg-2 aligned-text">Product Name :</div>
            <div class="col-lg-5">
                <div class="input-group mb-3">
                    <input type="text" id='idprdnm' class="form-control" placeholder="" aria-label="" readonly>
                    <input type="text" id='namaprdnm' class="form-control" placeholder="" aria-label="" readonly>
                    <button type="button" id="btnprodnm" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mdl_prodname">
                        ...
                    </button>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-lg-2 aligned-text">Printing :</div>
            <div class="col-lg-1 aligned-text">Front :</div>
            <div class="col-lg-4">
                <div class="input-group mb-3">
                    <input type="text" id='front' class="form-control" placeholder="" aria-label="" readonly>
                </div>
            </div>
        </div>
    </div>
</div>

    <div class="modal fade" id="mdl_customer" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="mdl_customer" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h1 class="modal-title fs-5" id="mdl_customer">Modal title</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <table id="tbl_customer" class="table table-bordered">
                    <thead class="thead-dark">
                        <tr>
                            <th>Namacust</th>
                            <th>IDCUST</th>
                        </tr>
                    </thead>
                    <tbody>
                        {{-- @foreach ($dataTransaksi as $data)
                            <tr data-grupmesinorder="{{ $data->GrupMesinOrder }}" data-notrans="{{ $data->IDLog }}">
                                <td>{{ $data->GrupMesinOrder }}</td>
                                <td>{{ $data->IDLog }}</td>
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

    <div class="modal fade" id="mdl_ukuran" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="mdl_ukuran" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h1 class="modal-title fs-5" id="mdl_ukuran">Modal title</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <table id="tbl_ukuran" class="table table-bordered">
                    <thead class="thead-dark">
                        <tr>
                            <th>Ukuran</th>
                            <th>Front</th>
                        </tr>
                    </thead>
                    <tbody>
                        {{-- @foreach ($dataTransaksi as $data)
                            <tr data-grupmesinorder="{{ $data->GrupMesinOrder }}" data-notrans="{{ $data->IDLog }}">
                                <td>{{ $data->GrupMesinOrder }}</td>
                                <td>{{ $data->IDLog }}</td>
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

    <div class="modal fade" id="mdl_prodname" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="mdl_prodname" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h1 class="modal-title fs-5" id="mdl_prodname">Modal title</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <table id="tbl_prodname" class="table table-bordered">
                    <thead class="thead-dark">
                        <tr>
                            <th>Type</th>
                            <th>ID</th>
                            <th>Tanggal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {{-- @foreach ($dataTransaksi as $data)
                            <tr data-grupmesinorder="{{ $data->GrupMesinOrder }}" data-notrans="{{ $data->IDLog }}">
                                <td>{{ $data->GrupMesinOrder }}</td>
                                <td>{{ $data->IDLog }}</td>
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


    <script src="{{ asset('js\AdStar\PrintTabel.js')}}"></script>
@endsection
