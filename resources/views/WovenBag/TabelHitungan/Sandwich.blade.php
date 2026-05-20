@extends('layouts.appWovenBag')
@section('title', 'Tabel Hitungan Sandwich')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-8 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Tabel Hitungan - Sandwich</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="d-flex">
                            <div style="flex: 0.5">
                                <div style="display: flex;flex-direction: row;">
                                    <label class="col-md-3 p-0">Product Name:</label>
                                    <div class="col-md-2 p-0">
                                        <input type="radio" name="jenisProduct" id="productSandwich" value="Sandwich"
                                            checked disabled>Sandwich
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
                                        placeholder="Gusset" disabled> x
                                    <input class="col-md-2 p-0" type="text" id="size3" name="size3"
                                        placeholder="Panjang" disabled> CM
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
                                    BAG JADI
                                </h5>
                                <div>
                                    <label class="col-md-3 p-0" for="bag_jadiLami">Lami:</label>
                                    <input class="col-md-2 p-0" type="text" id="bag_jadiLami" name="bag_jadiLami"
                                        disabled> MIK
                                </div>
                                <div>
                                    <label class="col-md-3 p-0" for="bag_jadiKertas">Kertas:</label>
                                    <input class="col-md-2 p-0" type="text" id="bag_jadiKertas" name="bag_jadiKertas"
                                        disabled> GSM
                                </div>
                                <div>
                                    <label class="col-md-3 p-0" for="bag_jadiClothBawah1">Cloth Bawah:</label>
                                    <input class="col-md-2 p-0" placeholder="L" type="text" id="bag_jadiClothBawah1"
                                        name="bag_jadiClothBawah1" disabled> X
                                    <input class="col-md-2 p-0" placeholder="P" type="text" id="bag_jadiClothBawah2"
                                        name="bag_jadiClothBawah2" disabled> CM
                                </div>
                                <div>
                                    <label class="col-md-3 p-0" for="bag_jadiLamiBawah">Lami Bawah:</label>
                                    <input class="col-md-2 p-0" type="text" id="bag_jadiLamiBawah"
                                        name="bag_jadiLamiBawah" disabled> MIK
                                </div>
                                <div>
                                    <label class="col-md-3 p-0" for="bag_jadiKertasBawah1">Kertas Bawah:</label>
                                    <input class="col-md-2 p-0" placeholder="L" type="text" id="bag_jadiKertasBawah1"
                                        name="bag_jadiKertasBawah1" disabled> X
                                    <input class="col-md-2 p-0" placeholder="P" type="text" id="bag_jadiKertasBawah2"
                                        name="bag_jadiKertasBawah2" disabled> CM
                                </div>
                                <div>
                                    <label class="col-md-3 p-0" for="bag_jadiInner1">Inner:</label>
                                    <input class="col-md-2 p-0" placeholder="L" type="text" id="bag_jadiInner1"
                                        name="bag_jadiInner1" disabled> X
                                    <input class="col-md-2 p-0" placeholder="P" type="text" id="bag_jadiInner2"
                                        name="bag_jadiInner2" disabled> CM
                                </div>
                                <div>
                                    <label class="col-md-3 p-0" for="bag_jadiTebal">Tebal:</label>
                                    <input class="col-md-2 p-0" type="text" id="bag_jadiTebal" name="bag_jadiTebal"
                                        disabled> MIK
                                </div>
                                <div>
                                    <label class="col-md-3 p-0" for="bag_jadiBenangJahit">Benang Jahit:</label>
                                    <input class="col-md-2 p-0" type="text" id="bag_jadiBenangJahit"
                                        name="bag_jadiBenangJahit" disabled> D
                                </div>
                            </div>
                            <div style="flex: 0.5">
                                <h5 style="color: darkblue;text-decoration: underline;font-style: italic;">
                                    PEMAKAIAN KAIN/KERTAS
                                </h5>
                                <div>
                                    <label class="col-md-3 p-0" for="pemakaian_kainLami">Lami:</label>
                                    <input class="col-md-2 p-0" type="text" id="pemakaian_kainLami"
                                        name="pemakaian_kainLami" disabled> MIK
                                </div>
                                <div>
                                    <label class="col-md-3 p-0" for="pemakaian_kainKertas">Kertas:</label>
                                    <input class="col-md-2 p-0" type="text" id="pemakaian_kainKertas"
                                        name="pemakaian_kainKertas" disabled> GSM
                                </div>
                                <div>
                                    <label class="col-md-3 p-0" for="pemakaian_kainClothBawah1">Cloth Bawah:</label>
                                    <input class="col-md-2 p-0" placeholder="L" type="text"
                                        id="pemakaian_kainClothBawah1" name="pemakaian_kainClothBawah1" disabled> X
                                    <input class="col-md-2 p-0" placeholder="P" type="text"
                                        id="pemakaian_kainClothBawah2" name="pemakaian_kainClothBawah2" disabled> CM
                                </div>
                                <div>
                                    <label class="col-md-3 p-0" for="pemakaian_kainLamiBawah">Lami Bawah:</label>
                                    <input class="col-md-2 p-0" type="text" id="pemakaian_kainLamiBawah"
                                        name="pemakaian_kainLamiBawah" disabled> MIK
                                </div>
                                <div>
                                    <label class="col-md-3 p-0" for="pemakaian_kainKertasBawah1">Kertas Bawah:</label>
                                    <input class="col-md-2 p-0" placeholder="L" type="text"
                                        id="pemakaian_kainKertasBawah1" name="pemakaian_kainKertasBawah1" disabled> X
                                    <input class="col-md-2 p-0" placeholder="P" type="text"
                                        id="pemakaian_kainKertasBawah2" name="pemakaian_kainKertasBawah2" disabled> CM
                                </div>
                                <div>
                                    <label class="col-md-3 p-0" for="pemakaian_kainInner1">Inner:</label>
                                    <input class="col-md-2 p-0" placeholder="L" type="text" id="pemakaian_kainInner1"
                                        name="pemakaian_kainInner1" disabled> X
                                    <input class="col-md-2 p-0" placeholder="P" type="text" id="pemakaian_kainInner2"
                                        name="pemakaian_kainInner2" disabled> CM
                                </div>
                                <div>
                                    <label class="col-md-3 p-0" for="pemakaian_kainTebal">Tebal:</label>
                                    <input class="col-md-2 p-0" type="text" id="pemakaian_kainTebal"
                                        name="pemakaian_kainTebal" disabled> MIK
                                </div>
                                <div>
                                    <label class="col-md-3 p-0" for="pemakaian_kainBenangJahit">Benang Jahit:</label>
                                    <input class="col-md-2 p-0" type="text" id="pemakaian_kainBenangJahit"
                                        name="pemakaian_kainBenangJahit" disabled> D
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
    <script type="text/javascript" src="{{ asset('js/WovenBag/TableHitunganSandwich.js') }}"></script>
@endsection
