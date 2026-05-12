@extends('layouts.appAdStar')
@section('title', 'Cetak Tabel Hit. Ad Star')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Cetak Tabel Hitungan</div>
                    <div class="card-body">
                        <div style="display: flex; flex-direction: row;">
                            <div style="flex: 0.5">
                                <div style="display: flex;flex-direction: row;">
                                    <label class="col-md-3 p-0">Product Name:</label>
                                    <div class="col-md-2 p-0">
                                        <input type="radio" name="jenisProduct" id="productStarpak" value="Starpak"
                                            checked>Starpak
                                    </div>
                                    <div class="col-md-2 p-0">
                                        <input type="radio" name="jenisProduct" id="productAdstar" value="Adstar">Adstar
                                    </div>
                                </div>
                                <div>
                                    <label class="col-md-2 p-0">Design For:</label>
                                    <input class="col-md-1 p-0" type="text" id="idCustomer" name="idCustomer" disabled>
                                    <input class="col-md-4 p-0" type="text" id="namaCustomer" name="namaCustomer"
                                        disabled>
                                    <button type="button" id="btnBrowseCustomer" class="btn btn-primary">...</button>
                                </div>
                                <div>
                                    <label class="col-md-2 p-0">Ukuran:</label>
                                    <input class="col-md-5 p-0" type="text" id="ukuran" name="ukuran" disabled>
                                    <button type="button" id="btnBrowseUkuran" class="btn btn-primary">...</button>
                                </div>
                                <div>
                                    <label class="col-md-2 p-0">Product Name:</label>
                                    <input class="col-md-1 p-0" type="text" id="productId" name="productId"
                                        disabled>
                                    <input class="col-md-4 p-0" type="text" id="productType" name="productType"
                                        disabled>
                                    <button type="button" id="btnBrowseProduct" class="btn btn-primary">...</button>
                                </div>
                                <div>
                                    <label class="col-md-2 p-0">Printing:</label>
                                    <label class="col-md-1 p-0">Front</label>
                                    <input class="col-md-4 p-0" type="text" id="frontPrinting" name="frontPrinting"
                                        disabled>
                                </div>
                                <button class="btn btn-success" id="btnCetak">Cetak</button>
                            </div>
                            <div style="flex: 0.5"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js\AdStar\CetakTabelHitungan.js') }}"></script>
@endsection
