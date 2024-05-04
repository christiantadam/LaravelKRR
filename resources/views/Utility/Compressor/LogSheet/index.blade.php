@extends('layouts.appUtility')
@section('title', 'Log Sheet')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="container" id="alertContainer"></div>
                <div class="card">
                    <div class="card-header">Log Sheet</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="row-12 d-flex flex-wrap">
                            <input type="hidden" id="hiddenNoLogSheet">
                            <div class="col-lg-4 p-4">
                                <div class="acs-div-filter">
                                    <label for="tanggal">Tanggal</label>
                                    <input type="date" class="form-control" id="tanggal">
                                </div>
                                <div class="acs-div-filter pt-4">
                                    <label for="Mesin">Mesin</label>
                                    <select class="form-select" aria-label="Default select example" id="mesin">
                                        <option selected disabled>Pilih Mesin..</option>
                                        @foreach ($mesin as $data)
                                            <option value="{{ $data->NoMesin }}">
                                                {{ $data->NamaMesin }}</option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="acs-div-filter pt-4">
                                    <label for="jam">Jam</label>
                                    <input type="time" class="form-control" id="jam" name="jam">
                                </div>
                                <div class="acs-div-filter pt-4">
                                    <label for="temp">Temperatur</label>
                                    <input type="number" pattern="[0-9]" min="0" class="form-control" id="temp"
                                        name="temp">
                                </div>
                            </div>
                            <div class="col-lg-3 p-4">
                                <div class="acs-div-filter">
                                    <label for="bar">Bar</label>
                                    <input type="number" pattern="[0-9]" min="0" class="form-control" id="bar"
                                        name="bar">
                                </div>
                                <div class="acs-div-filter pt-4">
                                    <label for="rm_hours">RM Hours</label>
                                    <input type="number" pattern="[0-9]" min="0" class="form-control" id="rm_hours"
                                        name="rm_hours">
                                </div>
                                <div class="acs-div-filter pt-4">
                                    <label for="lm_hours">LM Hours</label>
                                    <input type="number" pattern="[0-9]" min="0" class="form-control" id="lm_hours"
                                        name="lm_hours">
                                </div>
                                <div class="acs-div-filter pt-4">
                                    <label for="r_hours">R Hours</label>
                                    <input type="number" pattern="[0-9]" min="0" class="form-control" id="r_hours"
                                        name="r_hours">
                                </div>
                            </div>
                            <div class="col-lg-3 p-4">
                                <div class="acs-div-filter">
                                    <label for="l_hours">L Hours</label>
                                    <input type="number" pattern="[0-9]" min="0" class="form-control" id="l_hours"
                                        name="l_hours">
                                </div>
                                <div class="acs-div-filter pt-4">
                                    <label for="efs">Efs</label>
                                    <input type="number" pattern="[0-9]" min="0" class="form-control" id="efs"
                                        name="efs">
                                </div>
                                <div class="acs-div-filter pt-4">
                                    <label for="tech">Tech</label>
                                    <input type="text" class="form-control" id="tech" name="tech">
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
                                        <input type="date" class="form-control" id="tanggal-awal">
                                        <h6 class="mt-2">S/D</h6>
                                        <input type="date" class="form-control" id="tanggal-akhir">
                                    </div>
                                </div>
                                <div class="col-md-6 mt-2">
                                    <div class="d-flex gap-2 mb-2">
                                        <label for="NoMesinSearch">Mesin</label>
                                    </div>
                                    <div class="d-flex gap-2">
                                        <select class="form-select" aria-label="Default select example"
                                            id="NoMesinSearch">
                                            <option selected value="0">Pilih Semua Mesin..</option>
                                            @foreach ($mesin as $data)
                                                <option value="{{ $data->NoMesin }}">
                                                    {{ $data->NamaMesin }}</option>
                                            @endforeach
                                        </select>
                                        <button type="button" id="refreshButton"
                                            class="btn btn-primary">Refresh</button>
                                    </div>
                                </div>
                            </div>

                            <div class="table-responsive">
                                <table class="table" id="table-logsheet">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th scope="col">Aksi</th>
                                            <th scope="col">Tanggal</th>
                                            <th scope="col">Mesin</th>
                                            <th scope="col">Jam</th>
                                            <th scope="col">Temp</th>
                                            <th scope="col">Bar</th>
                                            <th scope="col">RM Hours</th>
                                            <th scope="col">LM Hours</th>
                                            <th scope="col">R Hours</th>
                                            <th scope="col">L Hours</th>
                                            <th scope="col">Efs</th>
                                            <th scope="col">Tech</th>
                                            <th scope="col">Keterangan</th>
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
    {{-- <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script> --}}
    <script src="{{ asset('js/Utility/Compressor/LogSheet.js') }}"></script>
@endsection
