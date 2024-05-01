@extends('layouts.appAdStar')
@section('content')
<link href="{{ asset('css/AdStar/MaintOrder.css') }}" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>

<div class="container">
<h2>Maintenance Order Press</h2>
</div>

    <div class="container">
        <div class="card">
            <h3 class="card-title">Sales</h3>
            <div class="row mt-3">
                <div class="col-lg-2 aligned-text">Customer:</div>
                <div class="col-lg-5">
                    <div class="input-group mb-3">
                        <input type="text" id='idcust' class="form-control" placeholder="" aria-label="" readonly>
                        <input type="text" id='namacust' class="form-control" placeholder="" aria-label="" readonly>
                        <button type="button" id="btncustomer" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mdl_customer" disabled>
                            ...
                        </button>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-lg-2 aligned-text">Nama Barang:</div>
                <div class="col-lg-5">
                    <div class="input-group mb-3">
                        <input type="text" id="kd_brng" class="form-control" placeholder="" aria-label="" readonly>
                        <input type="text" id="nm_type" class="form-control" placeholder="" aria-label="" readonly>
                        <button type="button" id="ld-Brng" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mdl_nmbrng" disabled>
                            ...
                        </button>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-lg-2 aligned-text">No. Pesanan:</div>
                <div class="col-lg-2">
                    <input type="number" id="no_psn" class="" required min="0" placeholder="lbr" readonly>
                </div>

                <div class="col-lg-2 aligned-text">Surat Pesanan:</div>
                <div class="col-lg-3">
                    <div class="input-group mb-3">
                        <input type="text" id="idsurat" class="form-control" placeholder="" aria-label="" readonly>
                        <button type="button" id="ld_srtpsn" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mdl_srtpsn" disabled>
                            ...
                        </button>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-lg-2 aligned-text">Jumlah Order:</div>
                <div class="col-lg-2">
                    <input type="number" id="qty_ordr" class="input-small" required min="0" placeholder="lbr" readonly>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-lg-2 aligned-text">Jumlah Press:</div>
                <div class="col-lg-2">
                    <input type="number" id="qty_prs" class="input-small" required min="0" placeholder="lbr" readonly>
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="card">
            <h3 class="card-title">AdStar</h3>
            <div class="row mt-3">
                <div class="col-lg-2 aligned-text">No. Order Kerja:</div>
                <div class="col-lg-3">
                    <div class="input-group mb-3">
                        <input type="text" id='inputNoOrder' class="form-control" placeholder="" aria-label="" readonly>
                        <button type="button" id="btn_inputNoOrder" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mdl_noordkrj" disabled>
                            ...
                        </button>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-lg-2 aligned-text">Tanggal Order:</div>
                <div class="col-lg-2">
                    <input type="date" id="tgl-order" class="form-control" required readonly>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-lg-2 aligned-text">Stock Order Sebelumnya:</div>
                <div class="col-lg-5">
                    <div class="input-group mb-3">
                        <input type="text" id="inputtnglstpordprs" class="form-control" placeholder="" aria-label="" readonly>
                        <input type="text" id="inputidstpordprs" class="form-control" placeholder="" aria-label="" readonly>
                        <button type="button" id='id-stkordsblm' class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mdl_stkordsblm" disabled>
                            ...
                        </button>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-lg-2 aligned-text">Sisa Stock:</div>
                <div class="col-lg-2">
                    <input type="number" id="sisa_stock" class="input-small" required min="0" placeholder="lbr" readonly>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-lg-2 aligned-text">Hasil:</div>
                <div class="col-lg-2">
                    <input type="number" id="hasil" class="input-small" required min="0" placeholder="lbr" readonly>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-lg-2 aligned-text">Tanggal Dikerjakan:</div>
                <div class="col-lg-2">
                    <input type="date" id="tanggalstart" class="form-control" required readonly>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-lg-2 aligned-text">Tanggal Finish:</div>
                <div class="col-lg-2">
                    <input type="date" id="tanggalfinish" class="form-control" required readonly>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="row mt-3">
                <div class="col-lg-2 aligned-text">
                    <button id="addButton" class="btn btn-primary" style="display: block;">Add</button>
                    <button id="saveButton" class="btn btn-primary" style="display: none;">Save</button>
                </div>
                <div class="col-lg-2 aligned-text">
                    <button id="updateButton" class="btn btn-success" style="display: block;">Update</button>
                    <button id="cancelButton" class="btn btn-success" style="display: none;">Cancel</button>
                </div>
                <div class="col-lg-2 aligned-text">
                    <button id="deleteButton" class="btn btn-danger" style="display: block">Delete</button>
                </div>
            </div>
        </div>

        <div class="scrollable-container">
            <!-- Add content here -->
        </div>
    </div>

    <!-- Modal customer-->
<div class="modal fade" id="mdl_customer" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="mdl_customer" aria-hidden="true">
    <div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
        <h1 class="modal-title fs-5" id="mdl_customer">Customer</h1>
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
                    @foreach ($dataCust as $data)
                        <tr data-namacust="{{ $data->NamaCust }}" data-idcust="{{ $data->IDCust }}">
                            <td>{{ $data->NamaCust }}</td>
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

<!-- Modal Barang-->
<div class="modal fade" id="mdl_nmbrng" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="mdl_nmbrng" aria-hidden="true">
    <div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
        <h1 class="modal-title fs-5" id="mdl_nmbrng">Nama Barang</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <table id="tbl_nmbrng" class="table table-bordered">
                <thead class="thead-dark">
                    <tr>
                        <th>Nama Type</th>
                        <th>Kode Barang</th>
                    </tr>
                </thead>
                <tbody>
                    {{-- @foreach ($dataorder as $data)
                        <tr data-nmbrng="{{ $data->Nama_brg }}" data-noordr="{{ $data->No_Order }}">
                            <td>{{ $data->Nama_brg }}</td>
                            <td>{{ $data->No_Order }}</td>
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


<!-- Modal Surat pesanan-->
<div class="modal fade" id="mdl_srtpsn" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="mdl_srtpsn" aria-hidden="true">
    <div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
        <h1 class="modal-title fs-5" id="mdl_srtpsn">Surat Pesanan</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <table id="tbl_srtpsn" class="table table-bordered">
                <thead class="thead-dark">
                    <tr>
                        <th>IdSuratPesanan</th>
                        <th>QTY</th>
                    </tr>
                </thead>
                <tbody>
                    {{-- @foreach ($dataorder as $data)
                        <tr data-nmbrng="{{ $data->Nama_brg }}" data-noordr="{{ $data->No_Order }}">
                            <td>{{ $data->Nama_brg }}</td>
                            <td>{{ $data->No_Order }}</td>
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


<!-- Modal no order kerja-->
<div class="modal fade" id="mdl_noordkrj" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="mdl_noordkrj" aria-hidden="true">
    <div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
        <h1 class="modal-title fs-5" id="mdl_noordkrj">No Order Kerja</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <table id="tbl_noordkrj" class="table table-bordered">
                <thead class="thead-dark">
                    <tr>
                        <th>Nama BRG</th>
                        <th>No Order</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($datanoordkrj as $data)
                        <tr data-noordkrj="{{ $data->NAMA_BRG }}" data-noordr="{{ $data->No_Order }}">
                            <td>{{ $data->NAMA_BRG }}</td>
                            <td>{{ $data->No_Order }}</td>
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

<!-- Modal stok order sebelum-->
<div class="modal fade" id="mdl_stkordsblm" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="mdl_stkordsblm" aria-hidden="true">
    <div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
        <h1 class="modal-title fs-5" id="mdl_stkordsblm">Stock Order Sebelum</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <table id="tbl_stkordsblm" class="table table-bordered">
                <thead class="thead-dark">
                    <tr>
                        <th>Surat Pesanan </th>
                        <th>Tanggal Order</th>
                    </tr>
                </thead>
                <tbody>
                    {{-- @foreach ($dataorder as $data)
                        <tr data-nmbrng="{{ $data->Nama_brg }}" data-noordr="{{ $data->No_Order }}">
                            <td>{{ $data->Nama_brg }}</td>
                            <td>{{ $data->No_Order }}</td>
                        </tr>
                    @endforeach --}}
                </tbody>
            </table>
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
        <div id="form-container"></div>
    </div>
    </div>
</div>

<script src="{{ asset('js\AdStar\MaintOrder.js')}}"></script>

@endsection

