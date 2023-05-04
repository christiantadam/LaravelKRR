@extends('layouts.appSales')
@section('content')
    <script>
        $(document).ready(function() {
            $('#table_BatalJual').DataTable({
                order: [
                    [1, 'desc']
                ],
            });
        });
    </script>
    <link href="{{ asset('css/BatalJual.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Batal Jual</div>
                    <div class="acs-div-form1">
                        <div>
                            <div class="acs-div-filter1">
                                <label for="kode_barang">Kode Barang</label>
                                <div>
                                    <input type="text" name="kode_barang" id="kode_barang" class="input">
                                    Tekan Enter
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card-body RDZOverflow RDZMobilePaddingLR0 acs-table-barcode" id="div_tableBarcode">
                        <table id="table_Barcode" class="table table-bordered table-striped" style="width:100%">
                            <thead class="thead-dark">
                                <tr>
                                    <th>Tanggal</th>
                                    <th>No Indeks </th>
                                    <th>Kode Barang</th>
                                    <th>Id Type</th>
                                    <th>Divisi</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                    <div class="acs-div-filter4">
                        <button class="btn btn-primary acs-btn-form" id="button_proses">Proses</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="{{ asset('js/Sales/BatalJual.js') }}"></script>
@endsection
