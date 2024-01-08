@extends('layouts.appExtruder')
@section('content')

<div id="tropodo_perawatan" class="form" data-aos="fade-up">
    <form>
        <div class="card mt-3">
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-2">
                        <span class="aligned-text">Tanggal:</span>
                    </div>
                    <div class="col-lg-3">
                        <input type="date" name="tanggal" id="tanggal" class="form-control">
                    </div>
                    <div class="col-lg-2">
                        <span style="display: flex; margin-top: 5px;">Enter</span>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2">
                        <span class="aligned-text">Nama:</span>
                    </div>
                    <div class="col-lg-5">
                        <input type="text" name="nama" id="nama" class="form-control">
                    </div>
                    <div class="col-lg-2">
                        <span style="display: flex; margin-top: 5px;">Enter</span>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2">
                        <span class="aligned-text">Shift:</span>
                    </div>
                    <div class="col-lg-2">
                        <input type="text" name="shift" id="shift" class="form-control">
                    </div>
                    <div class="col-lg-1">
                        <span style="display: flex; margin-top: 5px;">Enter</span>
                    </div>

                    <div class="col-lg-1">
                        <span class="aligned-text">Jam:</span>
                    </div>
                    <div class="col-lg-3">
                        <select class="form-select">
                            <option selected></option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                    <div class="col-lg-2">
                        <span style="display: flex; margin-top: 5px;">Enter</span>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2">
                        <span class="aligned-text">Bagian:</span>
                    </div>
                    <div class="col-lg-6">
                        <div class="input-group">
                            <input type="text" name="bagian1" id="bagian1" class="form-control">
                            <input type="text" name="bagian2" id="bagian2" class="form-control" style="width: 15vw;">
                            <button type="button" class="btn btn-outline-secondary">...</button>
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <span style="display: flex; margin-top: 5px;">Enter</span>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2">
                        <span class="aligned-text">Mesin:</span>
                    </div>
                    <div class="col-lg-6">
                        <div class="input-group">
                            <input type="text" name="mesin1" id="mesin1" class="form-control">
                            <input type="text" name="mesin2" id="mesin2" class="form-control" style="width: 15vw;">
                            <button type="button" class="btn btn-outline-secondary">...</button>
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <span style="display: flex; margin-top: 5px;">Enter</span>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2">
                        <span class="aligned-text">Bagian:</span>
                    </div>
                    <div class="col-lg-4">
                        <div class="input-group">
                            <input type="text" name="bagian1" id="bagian1" class="form-control">
                            <button type="button" class="btn btn-outline-secondary">...</button>
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <span style="display: flex; margin-top: 5px;">Enter</span>
                    </div>
                    <div class="col-lg-3">
                        <input type="text" name="bagian1" id="bagian1" class="form-control">
                    </div>
                </div>
            </div>
        </div>

        <div class="card mt-3">
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-2">
                        <span class="aligned-text">Gangguan:</span>
                    </div>
                    <div class="col-lg-8">
                        <div class="input-group">
                            <input type="text" name="gangguan" id="gangguan" class="form-control">
                            <button type="button" class="btn btn-outline-secondary">...</button>
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <span style="display: flex; margin-top: 5px;">Enter</span>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2">
                        <span class="aligned-text">Penyebab:</span>
                    </div>
                    <div class="col-lg-8">
                        <div class="input-group">
                            <input type="text" name="penyebab" id="penyebab" class="form-control">
                            <button type="button" class="btn btn-outline-secondary">...</button>
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <span style="display: flex; margin-top: 5px;">Enter</span>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2">
                        <span class="aligned-text">Penyelesaian:</span>
                    </div>
                    <div class="col-lg-8">
                        <div class="input-group">
                            <input type="text" name="penyelesaian" id="penyelesaian" class="form-control">
                            <button type="button" class="btn btn-outline-secondary">...</button>
                        </div>
                    </div>
                    <div class="col-lg-2">
                        <span style="display: flex; margin-top: 5px;">Enter</span>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2">
                        <span class="aligned-text">Waktu Mulai:</span>
                    </div>
                    <div class="col-lg-2">
                        <input type="time" name="waktu_mulai" id="waktu_mulai" class="form-control">
                    </div>
                    <div class="col-lg-2">
                        <span style="display: flex; margin-top: 5px;">Enter</span>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2">
                        <span class="aligned-text">Waktu Selesai:</span>
                    </div>
                    <div class="col-lg-2">
                        <input type="time" name="waktu_selesai" id="waktu_selesai" class="form-control">
                    </div>
                    <div class="col-lg-2">
                        <span style="display: flex; margin-top: 5px;">Enter</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-md-5 text-center">
                <button type="submit" class="btn btn-outline-success">Isi</button>
                <button type="submit" class="btn btn-outline-warning">Koreksi</button>
                <button type="submit" class="btn btn-outline-danger">Hapus</button>
            </div>
            <div class="col-md-2"></div>
            <div class="col-md-5 text-center">
                <button type="submit" class="btn btn-outline-primary">Proses</button>
                <button type="button" class="btn btn-outline-secondary">Keluar</button>
            </div>
        </div>
    </form>
</div>

@endsection