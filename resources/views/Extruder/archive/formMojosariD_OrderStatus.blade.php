@extends('layouts.appExtruder')
@section('content')

<div id="tropodo_order_status" class="form" data-aos="fade-up">
    <form>
        <div class="form-group mt-3">
            <label for="no_order">No. Order:</label>
            <div class="input-group">
                <input type="text" class="form-control" name="no_order1">
                <input type="text" class="form-control" name="no_order2" style="width: 65vw;">
                <button type="button" class="btn btn-outline-secondary">...</button>
            </div>
        </div>

        <div class="card mt-3">
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-2 aligned-text">Tanggal:</div>
                    <div class="col-lg-3">
                        <input type="date" name="tanggal" id="tanggal" class="form-control">
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Spek:</div>
                    <div class="col-lg-8">
                        <input type="text" name="spek" id="spek" class="form-control">
                    </div>
                </div>

                <div class="row mt-3">

                    <div class="col-lg-2 aligned-text">Jumlah Order:</div>
                    <div class="col-lg-3">
                        <input type="number" name="jmlh_order" id="jmlh_order" class="form-control" value="0">
                    </div>

                    <div class="col-lg-2 aligned-text">Jumlah Produksi:</div>
                    <div class="col-lg-3">
                        <input type="number" name="jmlh_produksi" id="jmlh_produksi" class="form-control" value="0">
                    </div>

                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Status:</div>
                    <div class="col-lg-3">
                        <select class="form-select">
                            <option selected></option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-lg-2 aligned-text">Keterangan:</div>
                    <div class="col-lg-8">
                        <input type="text" name="keterangan" id="keterangan" class="form-control">
                    </div>
                </div>
            </div>
        </div>

        <table class="table table-hover mt-3">
            <thead>
                <tr>
                    <th scope="col">Tanggal Order</th>
                    <th scope="col">Spek</th>
                    <th scope="col">Jumlah Order</th>
                    <th scope="col">Jumlah Konversi</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>temp</td>
                    <td>temp</td>
                    <td>temp</td>
                    <td>temp</td>
                </tr>
                <tr>
                    <td>temp</td>
                    <td>temp</td>
                    <td>temp</td>
                    <td>temp</td>
                </tr>
                <tr>
                    <td>temp</td>
                    <td>temp</td>
                    <td>temp</td>
                    <td>temp</td>
                </tr>
            </tbody>
        </table>

        <div class="float-end mt-3 mb-3">
            <button type="submit" class="btn btn-outline-success">Proses</button>
            <button type="button" class="btn btn-outline-danger">Keluar</button>
        </div>
    </form>
</div>

@endsection