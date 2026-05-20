@extends('layouts.appWovenBag')
@section('title', 'Tabel Hitungan Tubing OPP')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-8 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Tabel Hitungan - Tubing OPP</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="d-flex">
                            <div style="flex: 0.5">
                                <div style="display: flex;flex-direction: row;">
                                    <label class="col-md-3 p-0">Product Name:</label>
                                    <div class="col-md-2 p-0">
                                        <input type="radio" name="jenisProduct" id="productTubing" value="Tubing" checked
                                            disabled>Tubing
                                    </div>
                                    <div class="col-md-3 p-0">
                                        <input type="radio" name="jenisProduct" id="productTubingOPP" value="TubingOPP"
                                            disabled>Tubing OPP
                                    </div>
                                    <input type="hidden" name="idProduct" id="idProduct">
                                </div>
                                <div>
                                    <label class="col-md-3 p-0">Design For:</label>
                                    <input class="col-md-2 p-0 readonly-field" type="text" id="idCustomer" name="idCustomer" disabled>
                                    <input class="col-md-5 p-0 readonly-field" type="text" id="namaCustomer" name="namaCustomer"
                                        disabled>
                                    <button type="button" id="btnBrowseCustomer" class="btn btn-primary"
                                        disabled>...</button>
                                </div>
                            </div>
                            <div style="flex: 0.5">
                                <div>
                                    <div>
                                        <label class="col-md-3 p-0">Product Type:</label>
                                        <input class="col-md-2 p-0 readonly-field" type="text" id="productType1" name="productType1"
                                            disabled>
                                        -
                                        <input class="col-md-4 p-0 readonly-field" type="text" id="productType2" name="productType2"
                                            disabled>
                                        <button type="button" id="btnBrowseProduct" class="btn btn-primary" disabled>List
                                            Type</button>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label class="col-md-3 p-0" for="tanggalPembuatan">Dated:</label>
                                        <input class="col-md-3 p-0" type="date" id="tanggalPembuatan"
                                            name="tanggalPembuatan" disabled>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex">
                            <div style="flex: 0.4">
                                <h5 style="color: darkblue;text-decoration: underline;font-style: italic;">
                                    SPESIFICATION
                                </h5>
                                <div>
                                    <label class="col-md-2 p-0" for="sizeW1">Size:</label>
                                    <input class="col-md-2 p-0" type="text" id="size1" name="size1"
                                        placeholder="Lebar" disabled> +
                                    <input class="col-md-2 p-0" type="text" id="size2" name="size2"
                                        placeholder="Panjang" disabled> x
                                    <input class="col-md-2 p-0" type="text" id="size3" name="size3"
                                        placeholder="Tinggi" disabled> CM
                                </div>
                                <div>
                                    <label class="col-md-2 p-0" for="meshWA">Mesh:</label>
                                    <input class="col-md-2 p-0" type="text" id="meshWA" name="meshWA" disabled> x
                                    <input class="col-md-2 p-0" type="text" id="meshWE" name="meshWE" disabled>
                                </div>
                                <div>
                                    <label class="col-md-2 p-0" for="denier">Denier:</label>
                                    <input class="col-md-2 p-0" type="text" id="denier" name="denier" disabled>
                                    <label class="col-md-2 p-0" for="colour">Colour:</label>
                                    <input class="col-md-5 p-0" type="text" id="colour" name="colour" disabled>
                                </div>
                            </div>
                            <div style="flex: 0.6">
                                <h5 style="color: darkblue;text-decoration: underline;font-style: italic;">
                                    PRINTING
                                </h5>
                                <div>
                                    <label class="col-md-1 p-0" for="sisi1">Sisi 1:</label>
                                    <input class="col-md-4 p-0" type="text" id="sisi1" name="sisi1" disabled>
                                    <label class="col-md-1 p-0" for="sisi2">Sisi 2:</label>
                                    <input class="col-md-5 p-0" type="text" id="sisi2" name="sisi2" disabled>
                                </div>
                                <div>
                                </div>
                                <h5 style="color: darkblue;text-decoration: underline;font-style: italic;">
                                    LEM
                                </h5>
                                <div>
                                    <label class="col-md-1 p-0" for="eva">EVA:</label>
                                    <input class="col-md-2 p-0" type="text" id="eva" name="eva" disabled>
                                    <label class="col-md-2 p-0" for="overlap">Overlap:</label>
                                    <input class="col-md-6 p-0" type="text" id="overlap" name="overlap" disabled>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex">
                            <div style="flex: 0.5">
                                <h5 style="color: darkblue;text-decoration: underline;font-style: italic;">
                                    Bag Jadi
                                </h5>
                                <div>
                                    <label class="col-md-3 p-0" for="bag_jadiLamiBody">Lami Body:</label>
                                    <input class="col-md-2 p-0" type="text" id="bag_jadiLamiBody"
                                        name="bag_jadiLamiBody" disabled> MIK
                                </div>
                                <div>
                                    <label class="col-md-3 p-0" for="bag_jadiOPPBody">OPP Body:</label>
                                    <input class="col-md-2 p-0" type="text" id="bag_jadiOPPBody"
                                        name="bag_jadiOPPBody" disabled> MIK
                                </div>
                                <div>
                                    <label class="col-md-3 p-0" for="bag_jadiOPPPatch">OPP Patch:</label>
                                    <input class="col-md-2 p-0" type="text" id="bag_jadiOPPPatch"
                                        name="bag_jadiOPPPatch" disabled> MIK
                                </div>
                                <div>
                                    <label class="col-md-3 p-0" for="bag_jadiLamiPatch">Lami Patch:</label>
                                    <input class="col-md-2 p-0" type="text" id="bag_jadiLamiPatch"
                                        name="bag_jadiLamiPatch" disabled> MIK
                                </div>
                                <div>
                                    <label class="col-md-3 p-0" for="bag_jadiKertas1">Kertas :</label>
                                    <input class="col-md-2 p-0" type="text" id="bag_jadiKertas1"
                                        name="bag_jadiKertas1" disabled> /
                                    <input class="col-md-2 p-0" type="text" id="bag_jadiKertas2"
                                        name="bag_jadiKertas2" disabled> GSM
                                </div>
                                <div>
                                    <label class="col-md-3 p-0" for="bag_jadiValve">Valve:</label>
                                    <input class="col-md-2 p-0" type="text" id="bag_jadiValve" name="bag_jadiValve"
                                        disabled>
                                </div>
                                <div>
                                    <label class="col-md-3 p-0" for="bag_jadiLamiValve">Lami Valve:</label>
                                    <input class="col-md-2 p-0" type="text" id="bag_jadiLamiValve"
                                        name="bag_jadiLamiValve" disabled> MIK
                                </div>
                            </div>
                            <div style="flex: 0.5">
                                <h5 style="color: darkblue;text-decoration: underline;font-style: italic;">
                                    Pemakaian Kain/Kertas
                                </h5>
                                <div>
                                    <label class="col-md-3 p-0" for="pemakaian_kainLamiBody">Lami Body:</label>
                                    <input class="col-md-2 p-0" type="text" id="pemakaian_kainLamiBody"
                                        name="pemakaian_kainLamiBody" disabled> MIK
                                </div>
                                <div>
                                    <label class="col-md-3 p-0" for="pemakaian_kainOPPBody">OPP Body:</label>
                                    <input class="col-md-2 p-0" type="text" id="pemakaian_kainOPPBody"
                                        name="pemakaian_kainOPPBody" disabled> MIK
                                </div>
                                <div>
                                    <label class="col-md-3 p-0" for="pemakaian_kainOPPPatch">OPP Patch:</label>
                                    <input class="col-md-2 p-0" type="text" id="pemakaian_kainOPPPatch"
                                        name="pemakaian_kainOPPPatch" disabled> MIK
                                </div>
                                <div>
                                    <label class="col-md-3 p-0" for="pemakaian_kainLamiPatch">Lami Patch:</label>
                                    <input class="col-md-2 p-0" type="text" id="pemakaian_kainLamiPatch"
                                        name="pemakaian_kainLamiPatch" disabled> MIK
                                </div>
                                <div>
                                    <label class="col-md-3 p-0" for="pemakaian_kainKertas1">Kertas :</label>
                                    <input class="col-md-2 p-0" type="text" id="pemakaian_kainKertas1"
                                        name="pemakaian_kainKertas1" disabled> /
                                    <input class="col-md-2 p-0" type="text" id="pemakaian_kainKertas2"
                                        name="pemakaian_kainKertas2" disabled> GSM
                                </div>
                                <div>
                                    <label class="col-md-3 p-0" for="pemakaian_kainValve">Valve:</label>
                                    <input class="col-md-2 p-0" type="text" id="pemakaian_kainValve"
                                        name="pemakaian_kainValve" disabled>
                                </div>
                                <div>
                                    <label class="col-md-3 p-0" for="pemakaian_kainLamiValve">Lami Valve:</label>
                                    <input class="col-md-2 p-0" type="text" id="pemakaian_kainLamiValve"
                                        name="pemakaian_kainLamiValve" disabled> MIK
                                </div>
                            </div>
                        </div>
                        <div class="d-flex mt-2" style="gap: 5px;">
                            <button class="btn btn-primary" id="btnAdd">Add</button>
                            <button class="btn btn-warning" id="btnKoreksi">Koreksi</button>
                            <button class="btn btn-danger" id="btnDelete">Delete</button>
                            <button class="btn btn-secondary" style="display:none;" id="btnClear">Clear</button>
                            <button class="btn btn-success" style="display:none;" id="btnProses">Proses</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="{{ asset('js/WovenBag/TableHitunganTubingOPP.js') }}"></script>
@endsection
