@extends('layouts.appAccounting')
@section('content')
@section('title', 'ACC Serah Terima Penagihan')

    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-12 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">ACC Serah Terima Penagihan</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            <form method="POST" action="">
                                @csrf
                                <!-- Form fields go here -->

                                <div class="card">
                                    <table class="table">
                                        <thead class="table-dark">
                                            <tr>
                                                <th>Tanggal</th>
                                                <th>Id Penagihan</th>
                                                <th>Nama Supplier</th>
                                                <th>Jenis Dok.</th>
                                                <th>Sts. Pajak</th>
                                                <th>Mata Uang</th>
                                                <th>Nilai Penagihan</th>
                                                <th>.......</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><input type="checkbox" class="data-checkbox"> Data 1</td>
                                                <td>Data 2</td>
                                                <td>Data 3</td>
                                                <td>Data 4</td>
                                                <td>Data 5</td>
                                                <td>Data 6</td>
                                                <td>Data 7</td>
                                                <td>Data 8</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <p>
                                <div class="mb-3">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" id="checkbox2" value="option2">
                                    <label class="form-check-label" for="checkbox2">BATAL Serah</label>
                                </div>
                                <input type="submit" name="proses" value="Proses" class="btn btn-primary" disabled>
                                <input type="submit" name="keluar" value="Keluar" class="btn btn-primary">
                            </form>
                            <br>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
