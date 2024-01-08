@extends('layouts.appExtruder')
@section('content')

<div id="tropodo_gangguan_produksi" class="form" data-aos="fade-up">
    <form>
        <div class="card mt-3">
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-4">
                        <label for="tanggal">Tanggal:</label>
                        <input type="date" name="tanggal" id="tanggal" class="form-control">
                    </div>

                    <div class="col-lg-4 row d-flex align-items-center">
                        <div class="col-md-6 text-end">
                            <div class="form-check">
                                <input type="radio" name="tanggal" value="masuk" id="masuk">
                                <label for="masuk">
                                    Masuk
                                </label>
                            </div>
                        </div>
                        <div class="col-md-6 text-start">
                            <div class="form-check">
                                <input type="radio" name="tanggal" value="libur" id="libur">
                                <label for="libur">
                                    Libur
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4">
                        <label for="no_transaksi">No. Transaksi:</label>
                        <input type="text" name="no_transaksi" id="no_transaksi" class="form-control">
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-7">
                        <label for="kode_mesin">Kode Mesin:</label>
                        <div class="input-group">
                            <input type="text" name="kode_mesin1" id="kode_mesin1" class="form-control">
                            <input type="text" name="kode_mesin2" id="kode_mesin2" class="form-control"
                                style="width: 22.5vw;">
                            <button type="button" class="btn btn-outline-secondary">...</button>
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-10">
                        <label for="komposisi">Komposisi:</label>
                        <div class="input-group">
                            <input type="text" name="komposisi1" id="komposisi1" class="form-control">
                            <input type="text" name="komposisi2" id="komposisi2" class="form-control"
                                style="width: 22.5vw;">
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
                </div>
            </div>
        </div>

        <div class="card mt-3">
            <div class="card-body">

                <div class="row mt-3">
                    <div class="col-lg-3">
                        <span class="aligned-text">Gangguan:</span>
                    </div>

                    <div class="col-lg-7">
                        <div class="input-group">
                            <input type="text" name="gangguan1" id="gangguan1" class="form-control">
                            <input type="text" name="gangguan2" id="gangguan2" class="form-control"
                                style="width: 22.5vw;">
                            <button type="button" class="btn btn-outline-secondary">...</button>
                        </div>
                    </div>
                </div>

                <div class="row mt-3">

                    <div class="col-lg-5">
                        <div class="row">
                            <div class="col-lg-5">
                                <span class="aligned-text">Awal Gangguan:</span>
                            </div>

                            <div class="col-lg-7">
                                <input type="time" name="waktu_awal" id="waktu_awal" class="form-control">
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-lg-5">
                                <span class="aligned-text">Akhir Gangguan:</span>
                            </div>

                            <div class="col-lg-7">
                                <input type="time" name="waktu_akhir" id="waktu_akhir" class="form-control">
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-lg-5">
                                <span class="aligned-text">Jumlah Jam:</span>
                            </div>

                            <div class="col-lg-7">
                                <input type="number" name="jmlh_jam" id="jmlh_jam" class="form-control">
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-lg-5">
                                <span class="aligned-text">Jumlah Menit:</span>
                            </div>

                            <div class="col-lg-7">
                                <input type="number" name="jmlh_menit" id="jmlh_menit" class="form-control">
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-7 mt-3">
                        <label for="keterangan">Keterangan:</label>
                        <textarea name="keeterangan" rows="5" cols="50" class="form-control"></textarea>
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