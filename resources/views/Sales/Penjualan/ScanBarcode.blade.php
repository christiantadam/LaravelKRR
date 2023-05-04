@extends('layouts.appSales')
@section('content')
    <script>
        $(document).ready(function() {
            $('#table_Barcode').DataTable({
                order: [
                    [1, 'desc']
                ],
            });
        });
    </script>
    <link href="{{ asset('css/ScanBarcode.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Scan Barcode</div>
                    <div class="acs-div-form2">
                        <div class="acs-div-form3">
                            <div class="acs-div-filter1">
                                <label for="kode_barcode">Kode Barcode</label>
                                <input type="text" name="kode_barcode" id="kode_barcode" class="input">
                            </div>
                            <div class="acs-div-filter2">
                                <label for="jumlah">Jumlah</label>
                                <input type="text" name="jumlah" id="jumlah" class="input">
                            </div>
                        </div>
                        <div class="acs-div-form3" style="align-items: flex-end">
                            <div class="acs-div-filter1">
                                <input type="date" name="tanggal_input" id="tanggal_input" class="input">
                            </div>
                            <div class="acs-div-filter3">
                                <button class="btn btn-primary acs-btn-form">Lihat Data</button>
                                <button class="btn btn-primary acs-btn-form">Lihat Detail</button>
                            </div>
                        </div>
                    </div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0 acs-table-barcode" id="div_tableBarcode">
                        <table id="table_Barcode" class="table table-bordered table-striped" style="width:100%">
                            <thead class="thead-dark">
                                <tr>
                                    <th>No</th>
                                    <th>No Indeks</th>
                                    <th>Kode Barang</th>
                                    <th>Nama Type</th>
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
    <script type="text/javascript" src="{{ asset('js/Sales/ScanBarcode.js') }}"></script>
@endsection
