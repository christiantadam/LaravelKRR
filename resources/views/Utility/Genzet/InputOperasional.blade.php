@extends('layouts.appUtility')
@section('title', 'Input Operasional')
@section('content')
    @include('Utility.Genzet.StatusLog')
    @include('Utility.Genzet.Teknisi')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Input Operasional</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="row-12 d-flex flex-wrap">
                            <div class="col-lg-4 p-4">
                                <input type="hidden" id="hiddenNomorgenzet">
                                <div class="acs-div-filter">
                                    <label for="tanggal">Tanggal</label>
                                    <input type="date" class="form-control" id="tanggal">
                                </div>
                                <div class="acs-div-filter pt-4">
                                    <label for="Mesin">Mesin</label>
                                    <select class="form-select" aria-label="Default select example" id="mesingenzet">
                                        <option selected disabled>Pilih Mesin Genzet..</option>
                                        @foreach ($mesin as $data)
                                            <option value="{{ $data->NoMesin }}">
                                                {{ $data->NamaMesin }}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="acs-div-filter pt-4">
                                    <label for="jam_awal">Jam Awal Produksi</label>
                                    <input type="time" class="form-control" id="jam_awal" name="jam_awal">
                                </div>
                                <div class="acs-div-filter pt-4">
                                    <label for="jam_akhir">Jam Akhir Produksi</label>
                                    <input type="time" class="form-control" id="jam_akhir" name="jam_akhir">
                                </div>
                                <div class="acs-div-filter pt-4">
                                    <label for="operationhours">Operation Hours</label>
                                    <input type="number" pattern="[0-9]" min="0" class="form-control"
                                        id="operationhours" name="operationhours">
                                </div>
                            </div>
                            <div class="col-lg-3 p-4">
                                <div class="acs-div-filter">
                                    <label for="lubeoil">Lube Oil (Press Min 1.9)</label>
                                    <input type="number" pattern="[0-9]" min="0" class="form-control" id="lubeoil"
                                        name="lubeoil">
                                </div>
                                <div class="acs-div-filter pt-4">
                                    <label for="coolwater">Cool Water (Temp Max 95* celcius)</label>
                                    <input type="number" pattern="[0-9]" min="0" class="form-control" id="coolwater"
                                        name="coolwater">
                                </div>
                                <div class="acs-div-filter pt-4">
                                    <label for="volt">Volt 380 (10%)</label>
                                    <input type="number" pattern="[0-9]" min="0" class="form-control" id="volt"
                                        name="volt">
                                </div>
                                <div class="acs-div-filter pt-4">
                                    <label for="hz">Hz (45-51)</label>
                                    <input type="number" pattern="[0-9]" min="0" class="form-control" id="hz"
                                        name="hz">
                                </div>
                                <div class="acs-div-filter pt-4">
                                    <label for="amp">Amp (Max 650 A)</label>
                                    <input type="number" pattern="[0-9]" min="0" class="form-control" id="amp"
                                        name="amp">
                                </div>
                            </div>
                            <div class="col-lg-3 p-4">
                                <div class="acs-div-filter">
                                    <label for="tambahbbm">Tambah BBM</label>
                                    <input type="number" pattern="[0-9]" min="0" class="form-control" id="tambahbbm"
                                        name="tambahbbm">
                                </div>
                                <div class="acs-div-filter pt-4">
                                    <label for="tambahoil">Tambah Oil</label>
                                    <input type="number" pattern="[0-9]" min="0" class="form-control" id="tambahoil"
                                        name="tambahoil">
                                </div>
                                <div class="acs-div-filter pt-4">
                                    <label for="status">Status Log</label>
                                    <select class="form-select" aria-label="Default select example" id="statuslog">
                                        <option selected disabled>Pilih Status Log...</option>
                                        @foreach ($status as $data)
                                            <option value="{{ $data->NoStatusLog }}">
                                                {{ $data->NamaStatusLog }}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="acs-div-filter pt-4">
                                    <label for="teknisi">Teknisi</label>
                                    <select class="form-select" aria-label="Default select example" id="teknisi">
                                        <option selected disabled>Pilih teknisi...</option>
                                        @foreach ($teknisi as $data)
                                            <option value="{{ $data->NamaUser }}">
                                                {{ $data->NamaUser }}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="acs-div-filter pt-4">
                                    <label for="keterangan">Keterangan</label>
                                    <input type="text" class="form-control" id="keterangan" name="keterangan">
                                </div>
                            </div>
                            <div class="col-lg-2 p-4">
                                <div class="d-flex gap-2 justify-content-end flex-wrap pt-4">
                                    <button class="btn btn-primary w-100 mb-2" type="button"
                                        id="inputButton">Input</button>
                                    <button class="btn btn-primary  w-100 mb-2" type="button"
                                        id="updateButton">Koreksi</button>
                                    <button class="btn btn-primary  w-100 mb-5" type="button"
                                        id="deleteButton">Hapus</button>
                                    <button class="btn btn-primary  w-100 mb-2 mt-2" type="button"
                                        id="saveButton">Proses</button>
                                    <button class="btn btn-primary  w-100 mb-2" type="button"
                                        id="cancelButton">Batal</button>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12 p-4">
                            <div class="row mb-3">
                                <div class="col-md-6 mt-2">
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
                                <div class="col-md-6 mt-2">
                                    <div class="d-flex gap-2 mb-2">
                                        <label for="tanggal">Mesin</label>
                                    </div>
                                    <div class="d-flex gap-2">
                                        <select class="form-select" aria-label="Default select example" name="NoMesin"
                                            id="MesinSearch">
                                            <option selected value="0">Pilih Semua Mesin..</option>
                                            @foreach ($mesin as $data)
                                                <option value="{{ $data->NoMesin }}">
                                                    {{ $data->NamaMesin }}</option>
                                            @endforeach
                                        </select>
                                        <button type="submit" id="refreshButton"
                                            class="btn btn-primary">Refresh</button>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive">
                                <table class="table" id="table-genzet" style="white-space: nowrap;">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th scope="col">Aksi</th>
                                            <th scope="col">Tanggal</th>
                                            <th scope="col">Mesin</th>
                                            <th scope="col">Jam</th>
                                            <th scope="col">Operation Hour</th>
                                            <th scope="col">Lube Oil</th>
                                            <th scope="col">Cool Water</th>
                                            <th scope="col">Volt 380</th>
                                            <th scope="col">Hz</th>
                                            <th scope="col">Amp</th>
                                            <th scope="col">Status Log</th>
                                            <th scope="col">Teknisi</th>
                                            <th scope="col">Keterangan</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                            <div class="col-lg-12 p-0 mt-4">
                                <div class="d-flex justify-content-between flex-wrap">
                                    <button class="btn btn-primary mb-2" data-bs-toggle="modal"
                                        data-bs-target="#modalStatusLog" id="modalstatus" type="button">Status
                                        Log</button>
                                    {{-- <button class="btn btn-primary mb-2" data-bs-toggle="modal"
                                        data-bs-target="#modalTeknisi" id="modalteknisi" type="button">Teknisi</button> --}}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/Utility/Genzet/InputOperasional.js') }}"></script>
@endsection
