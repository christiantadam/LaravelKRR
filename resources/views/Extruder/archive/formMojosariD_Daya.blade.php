@extends('layouts.appExtruder')
@section('content')

<div id="tropodo_daya" class="form" data-aos="fade-up">
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
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2">
                        <span class="aligned-text">Mesin:</span>
                    </div>

                    <div class="col-lg-7">
                        <div class="input-group">
                            <input type="text" name="mesin1" id="mesin1" class="form-control">
                            <input type="text" name="mesin2" id="mesin2" class="form-control" style="width: 22.5vw;">
                            <button type="button" class="btn btn-outline-secondary">...</button>
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-6">

                        <div class="row">
                            <div class="col-lg-4">
                                <span class="aligned-text">Jam Produksi:</span>
                            </div>
                            <div class="col-lg-6">
                                <input type="time" name="jam_produksi" id="jam_produksi" class="form-control">
                            </div>
                        </div>


                        <div class="row mt-3">
                            <div class="col-lg-4">
                                <span class="aligned-text">Counter:</span>
                            </div>
                            <div class="col-lg-6">
                                <input type="text" name="counter" id="counter" class="form-control">
                            </div>
                        </div>

                    </div>

                    <div class="col-lg-3">
                        <input type="text" name="temp" id="temp" class="form-control" style="margin-top: 1.75em;">
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2">
                        <span class="aligned-text">Faktor Kali:</span>
                    </div>

                    <div class="col-lg-3">
                        <input type="text" name="faktor" id="faktor" class="form-control">
                    </div>
                </div>
            </div>
        </div>

        <div class="card mt-3">
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-3">
                        <span class="aligned-text">Data Bulan/Tahun</span>
                    </div>

                    <div class="col-lg-5">
                        <div class="input-group">
                            <input type="date" name="data_tgl" id="data_tgl" class="form-control">
                            <button type="button" class="btn btn-outline-primary">OK</button>
                        </div>
                    </div>
                </div>

                <table class="table table-hover mt-3">
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