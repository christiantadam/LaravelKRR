@extends('layouts.appUtility')
@section('title', 'Input PDAM')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Input PDAM</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="row-12 d-flex flex-wrap">
                            <div class="col-lg-5 p-4">
                                <input type="hidden" id="hiddenNomorpdam">
                                <div class="acs-div-filter pt-4">
                                    <label for="tanggal">Tanggal</label>
                                    <input type="date" class="form-control" id="tanggal">
                                </div>
                                <div class="acs-div-filter pt-4">
                                    <label for="jam">Jam</label>
                                    <input type="time" class="form-control" id="jam" name="jam">
                                </div>
                                <div class="acs-div-filter pt-4">
                                    <label for="nometer">No Meter</label>
                                    <select class="form-select" aria-label="Default select example" id="nometer">
                                        <option selected disabled>Pilih..</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>

                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-5 p-4">
                                <div class="acs-div-filter pt-4">
                                    <label for="counter">Counter</label>
                                    <input type="number" class="form-control" id="counter" name="counter">
                                </div>
                                <div class="acs-div-filter pt-4">
                                    <label for="teknisi">Teknisi</label>
                                    <input type="text" class="form-control" id="teknisi" name="teknisi">
                                </div>
                            </div>
                            <div class="col-lg-2 p-4">
                                <div class="d-flex gap-2 justify-content-end flex-wrap pt-4">
                                    <button class="btn btn-primary w-100 mb-2" type="button"
                                        id="inputButton">Input</button>
                                    <button class="btn btn-primary  w-100 mb-2" type="button"
                                        id="updateButton">Koreksi</button>
                                    <button class="btn btn-primary  w-100 mb-2" type="button"
                                        id="deleteButton">Hapus</button>
                                    <button class="btn btn-primary  w-100 mb-2" type="button"
                                        id="saveButton">Proses</button>
                                    <button class="btn btn-primary  w-100 mb-2" type="button"
                                        id="cancelButton">Batal</button>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12 p-4">
                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <div class="d-flex gap-2 mb-2">
                                        <label for="tanggal">Filter</label>
                                    </div>
                                    <div class="d-flex gap-2">
                                        <h6 class="mt-2">Tanggal</h6>
                                        <input type="date" class="form-control" id="tanggal-awal" name="date1">
                                        <h6 class="mt-2">S/D</h6>
                                        <input type="date" class="form-control" id="tanggal-akhir" name="date2">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="d-flex gap-2 mb-2">
                                        <label for="tanggal">No Meter</label>
                                    </div>
                                    <div class="d-flex gap-2">
                                        <input type="text" class="form-control" id="nometersearch" name="nometersearch">
                                        <button type="submit" id="refreshButton" class="btn btn-primary">Refresh</button>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive">
                                <table class="table mt-2" id="table-pdam">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th scope="col">Aksi</th>
                                            <th scope="col">Tanggal</th>
                                            <th scope="col">Jam</th>
                                            <th scope="col">No Meter</th>
                                            <th scope="col">Counter</th>
                                            <th scope="col">Teknisi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/Utility/PDAM/InputPDAM.js') }}"></script>
@endsection
