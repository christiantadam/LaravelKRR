@extends('layouts.appExtruder')

@section('title')
    Konversi dalam Kg
@endsection

@section('content')
    <div id="konversi_kg" class="form" data-aos="fade-up">
        <form action="#">

            <div class="row mt-3">
                <div class="col">
                    <div class="d-flex align-items-center" style="justify-content: center;">
                        <div class="form-check form-check-inline seperate">
                            <input class="form-check-input custom-radio" type="radio" name="radio_unit" id="rdo_kg"
                                value="kg" checked>
                            <label class="form-check-label rounded-circle custom-radio" for="kgRadio"
                                style="font-size: large">Kg</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input custom-radio" type="radio" name="radio_unit" id="rdo_yard"
                                value="yard">
                            <label class="form-check-label rounded-circle custom-radio" for="yardRadio"
                                style="font-size: large">Yard</label>
                        </div>
                    </div>
                </div>
            </div>


            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label for="kode_barang">Kode Barang:</label>
                        <div class="input-group">
                            <input type="text" class="form-control" id="kode_barang">
                            <button type="button" id="btn_proses" class="btn btn-outline-primary">Proses</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mt-3">
                <table id="table_konversi" class="hover cell-border">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Kode Barang</th>
                            <th>Ket.</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>

        </form>
    </div>

    <script src="{{ asset('js/Extruder/BeratKomposisi/konversiKg.js') }}"></script>
@endsection
