@extends('layouts.appAdStar')
@section('content')
    <div class="container"><h2>Maint Kode Barang</h2></div>
    <link href="{{ asset('css/AdStar/UpKodeBarang.css') }}" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>

    <div class="container">
        <div class="table-responsive">
            <table id="tabel_Barang" class="table table-bordered">
                <thead class="thead-dark">
                    <tr>
                        <th>Nama Barang</th>
                        <th>Kode Barang</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($dataUpKdBrng as $data)
                        <tr data-idbrng="{{ $data->id }}" data-nama="{{ $data->Nama_brg }}" data-kode="{{ $data->kd_brg }}">
                            <td>{{ $data->Nama_brg }}</td>
                            <td>{{ $data->kd_brg }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>

    <div class="container">
        <div class="container">
            <label for="nama-barang">Nama Barang:</label>
            <input type="text" id="input1" required class="input-small">
            <input type="text" id="nama-barang" class="input-medium">
        </div>

        <div class="container">
            <label for="kd-barang">Kode Barang:</label>
            <input type="text" id="kd-barang" required class="input-small">
            <input type="text" id="input2" class="input-medium">

                    <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary" id="btclistdata" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                List Data
            </button>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Kode Barang</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <table id="tabel_Barang2" class="table table-bordered">
                        <thead class="thead-dark">
                            <tr>
                                <th>Nama Barang</th>
                                <th>Kode Barang</th>
                            </tr>
                        </thead>
                        <tbody>
                            {{-- @foreach ($dataUpKdBrng as $data)
                                <tr data-idbrng="{{ $data->id }}" data-nama="{{ $data->Nama_brg }}" data-kode="{{ $data->kd_brg }}">
                                    <td>{{ $data->Nama_brg }}</td>
                                    <td>{{ $data->kd_brg }}</td>
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

    <div class="container">
        <button id="saveButton" class="btn btn-secondary" onclick="updateData()">Update</button>
    </div>

    <div class="scrollable-container">
        <!-- Add content here -->
    </div>

    <script src="{{ asset('js\AdStar\UpKodeBarang.js')}}"></script>

@endsection

