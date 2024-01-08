@extends('layouts.appExtruder')
@section('content')

<div id="tropodo_konversi_acc" class="form" data-aos="fade-up">
    <form>
        <div class="card mt-3">
            <div class="card-header">Daftar Konversi</div>

            <div class="card-body">
                <div class="row">

                    <div class="col-lg-6">
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

                    <div class="col-lg-6">

                        <div class="row mt-3">
                            <div class="col-lg-4">
                                <label for="tanggal">Tanggal:</label>
                                <input type="date" name="tanggal" id="tanggal" class="form-control">
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-lg-8">
                                <label for="tanggal">Shift:</label>
                                <div class="input-group">
                                    <input type="text" name="shift" id="shift" class="form-control"
                                        style="max-width: 50px;">
                                    <input type="time" name="shift_awal" id="shift_awal" class="form-control">
                                    <span class="input-group-text">s/d</span>
                                    <input type="time" name="shift_akhir" id="shift_akhir" class="form-control">
                                </div>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-lg-12">
                                <label for="mesin">Mesin:</label>
                                <div class="input-group">
                                    <input type="text" name="mesin1" id="mesin1" class="form-control">
                                    <input type="text" name="mesin2" id="mesin2" class="form-control"
                                        style="width: 12.5vw;">
                                    <button type="button" class="btn btn-outline-secondary">...</button>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-lg-4">
                                <label for="ukuran">Ukuran:</label>
                                <input type="number" name="ukuran" id="ukuran" class="form-control" value="0">
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-lg-4">
                                <label for="denier">Denier:</label>
                                <input type="number" name="denier" id="denier" class="form-control" value="0">
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-lg-6">

                                <label for="warna">Warna:</label>
                                <input type="text" name="warna" id="warna" class="form-control">

                                <div class="mt-3"></div>

                                <label for="lot">Lot:</label>
                                <input type="text" name="lot" id="lot" class="form-control">

                            </div>

                            <div class="col-lg-6">
                                <input type="text" name="temp" id="temp" class="form-control"
                                    style="margin-top: 3.75em;">
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-lg-12">
                                <label for="no_order">No. Order:</label>
                                <div class="input-group">
                                    <input type="text" name="no_order1" id="no_order1" class="form-control">
                                    <input type="text" name="no_order2" id="no_order2" class="form-control"
                                        style="width: 12.5vw;">
                                    <button type="button" class="btn btn-outline-secondary">...</button>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-lg-12">
                                <label for="komposisi">Komposisi:</label>
                                <div class="input-group">
                                    <input type="text" name="komposisi1" id="komposisi1" class="form-control">
                                    <input type="text" name="komposisi2" id="komposisi2" class="form-control"
                                        style="width: 12.5vw;">
                                    <button type="button" class="btn btn-outline-secondary">...</button>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-lg-6">
                                <label for="waktu_mulai">Mulai:</label>
                                <input type="time" name="waktu_mulai" id="waktu_mulai" class="form-control">
                            </div>
                            <div class="col-lg-6">
                                <label for="waktu_selesai">Selesai:</label>
                                <input type="time" name="waktu_selesai" id="waktu_selesai" class="form-control">
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>

        <div class="card mt-3">
            <div class="card-header">Hasil Produksi</div>

            <div class="card-body">
                <table class="table table-hover mt-3" style="table-layout: fixed;">
                    <colgroup>
                        <col style="width: 300px;">
                        <col style="width: 125px;">
                        <col style="width: 125px;">
                        <col style="width: 125px;">
                        <col style="width: 125px;">
                        <col style="width: 125px;">
                        <col style="width: 125px;">
                    </colgroup>
                    <thead>
                        <tr>
                            <th>Nama Type</th>
                            <th class="text-center">Qty Primer</th>
                            <th class="text-center">Sat Primer</th>
                            <th class="text-center">Qty Sekunder</th>
                            <th class="text-center">Sat Sekunder</th>
                            <th class="text-center">Qty Tertier</th>
                            <th class="text-center">Sat Tertier</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Data 1</td>
                            <td class="text-center">10</td>
                            <td class="text-center">kg</td>
                            <td class="text-center">5</td>
                            <td class="text-center">kg</td>
                            <td class="text-center">3</td>
                            <td class="text-center">kg</td>
                        </tr>
                        <tr>
                            <td>Data 2</td>
                            <td class="text-center">8</td>
                            <td class="text-center">kg</td>
                            <td class="text-center">4</td>
                            <td class="text-center">kg</td>
                            <td class="text-center">2</td>
                            <td class="text-center">kg</td>
                        </tr>
                        <tr>
                            <td>Data 3</td>
                            <td class="text-center">15</td>
                            <td class="text-center">kg</td>
                            <td class="text-center">6</td>
                            <td class="text-center">kg</td>
                            <td class="text-center">1</td>
                            <td class="text-center">kg</td>
                        </tr>
                    </tbody>
                </table>

                <div class="row mt-3 d-flex justify-content-center">
                    <div class="col-lg-3" style="margin-right: 25px;">
                        <label for="total_bahan_terpakai">Total Bahan Terpakai:</label>
                        <input type="number" name="total_bahan_terpakai" id="total_bahan_terpakai" class="form-control"
                            value="0">
                    </div>
                    <div class="col-lg-3" style="margin-right: 25px;">
                        <label for="hasil_timbang">Hasil Timbang:</label>
                        <input type="number" name="hasil_timbang" id="hasil_timbang" class="form-control" value="0">
                    </div>
                    <div class="col-lg-3">
                        <label for="afalan">Afalan:</label>
                        <input type="number" name="afalan" id="afalan" class="form-control" value="0">
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-3 mb-5 float-end text-center">
            <button type="submit" class="btn btn-outline-success">Proses</button>
            <button type="button" class="btn btn-outline-danger">Keluar</button>
        </div>
    </form>
</div>

@endsection