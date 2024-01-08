@extends('layouts.appExtruder')
@section('content')

<div id="tropodo_benang_mohon" class="form" data-aos="fade-up">
    <form>
        <div class="row mt-3">
            <div class="col-lg-4"></div>

            <div class="col-lg-3">
                <span class="aligned-text">Tanggal Mohon:</span>
            </div>

            <div class="col-lg-5">
                <input type="date" name="tanggal_mohon" id="tanggal_mohon" class="form-control">
            </div>
        </div>

        <div class="row mt-3 border-bottom"></div>

        <div class="row mt-3">
            <div class="col-lg-3">
                <label for="tanggal">Tanggal:</label>
                <input type="date" name="tanggal" id="tanggal" class="form-control">
            </div>

            <div class="col-lg-2"></div>

            <div class="col-lg-5">
                <label for="mesin">Mesin:</label>
                <div class="input-group">
                    <input type="text" name="mesin" id="mesin" class="form-control">
                    <button type="button" class="btn btn-outline-secondary">...</button>
                </div>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-lg-4">
                <label for="nomor">Nomor:</label>
                <div class="input-group">
                    <input type="text" name="nomor" id="nomor" class="form-control">
                    <button type="button" class="btn btn-outline-secondary">...</button>
                </div>
            </div>

            <div class="col-lg-1"></div>

            <div class="col-lg-7">
                <label for="no_konversi">No. Konversi:</label>
                <div class="input-group">
                    <input type="text" name="no_konversi1" id="no_konversi1" class="form-control">
                    <input type="text" name="no_konversi2" id="no_konversi2" class="form-control" style="width: 22.5vw;">
                    <button type="button" class="btn btn-outline-secondary">...</button>
                </div>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-lg-4">
                <label for="tanggal">Shift:</label>
                <div class="input-group">
                    <input type="text" name="shift" id="shift" class="form-control" style="max-width: 50px;">
                    <input type="time" name="shift_awal" id="shift_awal" class="form-control">
                    <span class="input-group-text">s/d</span>
                    <input type="time" name="shift_akhir" id="shift_akhir" class="form-control">
                </div>
            </div>

            <div class="col-lg-1"></div>

            <div class="col-lg-7">
                <label for="type">Type:</label>
                <div class="input-group">
                    <input type="text" name="type1" id="type1" class="form-control">
                    <input type="text" name="type2" id="type2" class="form-control" style="width: 27.5vw;">
                    <button type="button" class="btn btn-outline-secondary">...</button>
                </div>
            </div>
        </div>

        <div class="card mt-3">
            <div class="card-header">Asal Konversi</div>

            <div class="card-body">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">No. Konversi</th>
                            <th scope="col">Spec</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>temp</td>
                            <td>temp</td>
                        </tr>
                        <tr>
                            <td>temp</td>
                            <td>temp</td>
                        </tr>
                        <tr>
                            <td>temp</td>
                            <td>temp</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="card mt-3">
            <div class="card-header">Tujuan Konversi</div>

            <div class="card-body">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">No. Konversi</th>
                            <th scope="col">Spec</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>temp</td>
                            <td>temp</td>
                        </tr>
                        <tr>
                            <td>temp</td>
                            <td>temp</td>
                        </tr>
                        <tr>
                            <td>temp</td>
                            <td>temp</td>
                        </tr>
                    </tbody>
                </table>
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