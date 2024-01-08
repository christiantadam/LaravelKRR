@extends('layouts.appExtruder')
@section('content')

<div id="tropodo_benang_acc" class="form" data-aos="fade-up">
    <form>
        <div class="row mt-3">
            <div class="col-lg-2">
                <span class="aligned-text">Tanggal:</span>
            </div>

            <div class="col-lg-5">
                <div class="input-group">
                    <input type="date" name="tanggal_awal" id="tanggal_awal" class="form-control">
                    <span class="input-group-text">s/d</span>
                    <input type="date" name="tanggal_akhir" id="tanggal_akhir" class="form-control">
                    <button type="submit" class="btn btn-outline-primary">OK</button>
                </div>
            </div>
        </div>

        <div class="row mt-3">
            <div class="col-lg-3">
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

            <div class="col-lg-9">
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

        <div class="mt-3 mb-5 float-end text-center">
            <button type="submit" class="btn btn-outline-success">Proses</button>
            <button type="button" class="btn btn-outline-danger">Keluar</button>
        </div>
    </form>
</div>

@endsection