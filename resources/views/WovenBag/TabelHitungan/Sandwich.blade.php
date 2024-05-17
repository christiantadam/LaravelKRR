@extends('layouts.appWovenBag') @section('content')
@section('title', 'Tabel Hitungan Sandwich')
<link href="{{ asset('css/style.css') }}" rel="stylesheet">
<link href="{{ asset('css/WovenBag/TabelHitungan/Sandwich.css') }}" rel="stylesheet">
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            @if (Session::has('success'))
                <div class="alert alert-success">
                    {{ Session::get('success') }}
                </div>
            @endif
            <div class="container">
                <form class="product-form">
                    <h1>Sandwich Product Form</h1>
                    <hr>
                    <div
                        style="display: flex; flex-direction: row; gap:2%; border-bottom:black solid 1px; padding:5px;margin-bottom: 5px">
                        <div style="width: 49%">
                            <div style="display: flex; flex-direction: row;gap:2%">
                                <div style="display: flex;flex-direction: column; gap: 5%">
                                    <label class="sandwich" for="designedFor">Designed For</label>
                                    <label class="sandwich" for="productType">Product Type</label>
                                </div>
                                <div style="display: flex;flex-direction: column; gap: 5%">
                                    <select name="designedFor" id="designedFor">
                                        <option value="1">a</option>
                                    </select>
                                    <input type="text" id="productType" name="productType" value="5W">
                                </div>
                            </div>
                        </div>
                        <div style="width: 49%">
                            <div style="display: flex; flex-direction: row;gap:2%">
                                <div style="display: flex;flex-direction: column; gap: 5%">
                                    <label class="sandwich" for="dated">Dated</label>
                                    <label class="sandwich" for="designedBy">Designed By</label>
                                </div>
                                <div style="display: flex;flex-direction: column; gap: 5%">
                                    <input type="date" id="dated" name="dated" value="2024-05-15">
                                    <input type="text" id="designedBy" name="designedBy" value="F001">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        style="display: flex; flex-direction: row; gap:2%; border-bottom:black solid 1px; padding:10px;margin-bottom: 10px">
                        <div
                            style="width: 39%;display: flex; flex-direction: column;gap:2%;border-right: black solid 1px">
                            <legend>Specification</legend>
                            <div style="width:100%;display: flex; flex-direction: row;gap:2%">
                                <div style="width:15%;display: flex; flex-direction: column;gap:3%">
                                    <label class="sandwich" for="size">Size</label>
                                    <label class="sandwich" for="mesh">Mesh</label>
                                    <label class="sandwich" for="denier">Denier</label>
                                    <label class="sandwich" for="colour">Colour</label>
                                </div>
                                <div style="width:80%;display: flex; flex-direction: column;gap:2%">
                                    <div style="width:100%;display: flex; flex-direction: row;gap:2%">
                                        <input type="text" id="size1" name="size1" style="width:26%">
                                        +
                                        <input type="text" id="size2" name="size2" style="width:26%">
                                        X
                                        <input type="text" id="size3" name="size3" style="width:26%">
                                    </div>
                                    <input type="text" id="mesh" name="mesh">
                                    <input type="text" id="denier" name="denier">
                                    <input type="text" id="colour" name="colour">
                                </div>
                            </div>
                        </div>
                        <div
                            style="width: 25%;display: flex; flex-direction: column;gap:2%;border-right: black solid 1px">
                            <legend>Printing</legend>
                            <div style="width:100%;display: flex; flex-direction: row;gap:2%">
                                <div style="width:15%;display: flex; flex-direction: column;gap:3%">
                                    <label class="sandwich" for="sisi1">Sisi 1</label>
                                    <label class="sandwich" for="sisi2">Sisi 2</label>
                                </div>
                                <div style="width:75%;display: flex; flex-direction: column;gap:3%">
                                    <input type="text" id="sisi1" name="sisi1">
                                    <input type="text" id="sisi2" name="sisi2">
                                </div>
                            </div>
                        </div>
                        <div style="width: 25%;display: flex; flex-direction: column;gap:2%">
                            <legend>LEM</legend>
                            <div style="width:100%;display: flex; flex-direction: row;gap:2%">
                                <div style="width:20%;display: flex; flex-direction: column;gap:3%">
                                    <label class="sandwich" for="eva">EVA</label>
                                    <label class="sandwich" for="overlap">Overlap</label>
                                </div>
                                <div style="width:80%;display: flex; flex-direction: column;gap:3%">
                                    <input type="text" id="eva" name="eva">
                                    <input type="text" id="overlap" name="overlap">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        style="display: flex; flex-direction: row; gap:2%; border-bottom:black solid 1px; padding:10px;margin-bottom: 10px">
                        <div
                            style="width: 49%;display: flex; flex-direction: column;gap:2%;border-right: black solid 1px; padding:10px">
                            <legend>Bag Jadi</legend>
                            <div style="width:100%;display: flex; flex-direction: row;gap:2%">
                                <div style="width:20%;display: flex; flex-direction: column;height:100%">
                                    <label for="bagJadiLami">Lami</label>
                                    <label for="bagJadiKertas">Kertas</label>
                                    <label for="bagJadiClothBawah">Cloth Bawah</label>
                                    <label for="bagJadiLamiBawah">Lami Bawah</label>
                                    <label for="bagJadiInner">Inner</label>
                                    <label for="bagJadiTebal">Tebal</label>
                                    <label for="bagJadiBenangJahit">Benang Jahit</label>
                                </div>
                                <div style="width:80%;display: flex; flex-direction: column;gap:3%">
                                    <input style="line-height: normal" type="text" id="bagJadiLami"
                                        name="bagJadiLami" placeholder="Lami">
                                    <input style="line-height: normal" type="text" id="bagJadiKertas"
                                        name="bagJadiKertas" placeholder="Kertas">
                                    <input style="line-height: normal" type="text" id="bagJadiClothBawah"
                                        name="bagJadiClothBawah" placeholder="Cloth Bawah">
                                    <input style="line-height: normal" type="text" id="bagJadiLamiBawah"
                                        name="bagJadiLamiBawah" placeholder="Lami Bawah">
                                    <input style="line-height: normal" type="text" id="bagJadiInner"
                                        name="bagJadiInner" placeholder="Inner">
                                    <input style="line-height: normal" type="text" id="bagJadiTebal"
                                        name="bagJadiTebal" placeholder="Tebal">
                                    <input style="line-height: normal" type="text" id="bagJadiBenangJahit"
                                        name="bagJadiBenangJahit" placeholder="Benang Jahit">
                                </div>
                            </div>
                        </div>
                        <div style="width: 49%;display: flex; flex-direction: column;gap:2%; padding:10px">
                            <legend>Pemakain Kain/Kertas</legend>
                            <div style="width:100%;display: flex; flex-direction: row;gap:2%">
                                <div style="width:20%;display: flex; flex-direction: column;height:100%">
                                    <label class="sandwich" for="pemekainKiniLami">Lami</label>
                                    <label class="sandwich" for="pemekainKiniKertas">Kertas</label>
                                    <label class="sandwich" for="pemekainKiniClothBawah">Cloth Bawah</label>
                                    <label class="sandwich" for="pemekainKiniLamiBawah">Lami Bawah</label>
                                    <label class="sandwich" for="pemekainKiniInner">Inner</label>
                                    <label class="sandwich" for="pemekainKiniTebal">Tebal</label>
                                    <label class="sandwich" for="pemekainKiniBenangJahit">Benang Jahit</label>
                                </div>
                                <div style="width:80%;display: flex; flex-direction: column;gap:3%">
                                    <input style="line-height: normal" type="text" id="pemekainKiniLami"
                                        name="pemekainKiniLami"placeholder="Lami">
                                    <input style="line-height: normal" type="text" id="pemekainKiniKertas"
                                        name="pemekainKiniKertas"placeholder="Kertas">
                                    <input style="line-height: normal" type="text" id="pemekainKiniClothBawah"
                                        name="pemekainKiniClothBawah"placeholder="Cloth Bawah">
                                    <input style="line-height: normal" type="text" id="pemekainKiniLamiBawah"
                                        name="pemekainKiniLamiBawah"placeholder="Lami Bawah">
                                    <input style="line-height: normal" type="text" id="pemekainKiniInner"
                                        name="pemekainKiniInner"placeholder="Inner">
                                    <input style="line-height: normal" type="text" id="pemekainKiniTebal"
                                        name="pemekainKiniTebal"placeholder="Tebal">
                                    <input style="line-height: normal" type="text" id="pemekainKiniBenangJahit"
                                        name="pemekainKiniBenangJahit"placeholder="Benang Jahit">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="buttons">
                        <button class="btn btn-primary" type="submit">ADD</button>
                        <button class="btn btn-warning" type="button">UPDATE</button>
                        <button class="btn btn-danger" type="button">DELETE</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="{{ asset('js/Sales/Customer.js') }}"></script>
@endsection
