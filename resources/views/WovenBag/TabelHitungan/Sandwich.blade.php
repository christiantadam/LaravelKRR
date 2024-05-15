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
            <form class="product-form">
                <h1>Sandwich Product Form</h1>
                <hr>
                <div class="section">
                    <label class="sandwich" for="designedFor">Designed For</label>
                    <select name="designedFor" id="designedFor">
                        <option value="1">a</option>
                    </select>
                </div>
                <div class="section">
                    <label class="sandwich" for="productType">Product Type</label>
                    <input type="text" id="productType" name="productType" value="5W">
                    <label class="sandwich" for="type">Type</label>
                    <input type="text" id="type" name="type">
                </div>
                <div class="section">
                    <label class="sandwich" for="dated">Dated</label>
                    <input type="date" id="dated" name="dated" value="2024-05-15">
                </div>
                <div class="section">
                    <label class="sandwich" for="designedBy">Designed By</label>
                    <input type="text" id="designedBy" name="designedBy" value="F001">
                </div>
                <h2>Specification</h2>
                <div class="spec-section">
                    <label class="sandwich" for="size">Size</label>
                    <input type="text" id="size" name="size">
                    <label class="sandwich" for="mesh">Mesh</label>
                    <input type="text" id="mesh" name="mesh">
                    <label class="sandwich" for="denier">Denier</label>
                    <input type="text" id="denier" name="denier">
                    <label class="sandwich" for="colour">Colour</label>
                    <input type="text" id="colour" name="colour">
                </div>
                <h2>Printing</h2>
                <div class="print-section">
                    <label class="sandwich" for="sisi1">Sisi 1</label>
                    <input type="text" id="sisi1" name="sisi1">
                    <label class="sandwich" for="sisi2">Sisi 2</label>
                    <input type="text" id="sisi2" name="sisi2">
                </div>
                <h2>LEM</h2>
                <div class="lem-section">
                    <label class="sandwich" for="eva">EVA</label>
                    <input type="text" id="eva" name="eva">
                    <label class="sandwich" for="overlap">Overlap</label>
                    <input type="text" id="overlap" name="overlap">
                </div>
                <div class="material-section">
                    <div class="block">
                        <h3>Bag Jadi</h3>
                        <label class="sandwich" for="bagJadiLami">Lami</label>
                        <input type="text" id="bagJadiLami" name="bagJadiLami">
                        <label class="sandwich" for="bagJadiKertas">Kertas</label>
                        <input type="text" id="bagJadiKertas" name="bagJadiKertas">
                        <label class="sandwich" for="bagJadiClothBawah">Cloth Bawah</label>
                        <input type="text" id="bagJadiClothBawah" name="bagJadiClothBawah">
                        <label class="sandwich" for="bagJadiLamiBawah">Lami Bawah</label>
                        <input type="text" id="bagJadiLamiBawah" name="bagJadiLamiBawah">
                        <label class="sandwich" for="bagJadiInner">Inner</label>
                        <input type="text" id="bagJadiInner" name="bagJadiInner">
                        <label class="sandwich" for="bagJadiTebal">Tebal</label>
                        <input type="text" id="bagJadiTebal" name="bagJadiTebal">
                        <label class="sandwich" for="bagJadiBenangJahit">Benang Jahit</label>
                        <input type="text" id="bagJadiBenangJahit" name="bagJadiBenangJahit">
                    </div>
                    <div class="block">
                        <h3>Pemekain Kini/Kertas</h3>
                        <label class="sandwich" for="pemekainKiniLami">Lami</label>
                        <input type="text" id="pemekainKiniLami" name="pemekainKiniLami">
                        <label class="sandwich" for="pemekainKiniKertas">Kertas</label>
                        <input type="text" id="pemekainKiniKertas" name="pemekainKiniKertas">
                        <label class="sandwich" for="pemekainKiniClothBawah">Cloth Bawah</label>
                        <input type="text" id="pemekainKiniClothBawah" name="pemekainKiniClothBawah">
                        <label class="sandwich" for="pemekainKiniLamiBawah">Lami Bawah</label>
                        <input type="text" id="pemekainKiniLamiBawah" name="pemekainKiniLamiBawah">
                        <label class="sandwich" for="pemekainKiniInner">Inner</label>
                        <input type="text" id="pemekainKiniInner" name="pemekainKiniInner">
                        <label class="sandwich" for="pemekainKiniTebal">Tebal</label>
                        <input type="text" id="pemekainKiniTebal" name="pemekainKiniTebal">
                        <label class="sandwich" for="pemekainKiniBenangJahit">Benang Jahit</label>
                        <input type="text" id="pemekainKiniBenangJahit" name="pemekainKiniBenangJahit">
                    </div>
                </div>
                <div class="buttons">
                    <button type="submit">ADD</button>
                    <button type="button">UPDATE</button>
                    <button type="button">DEL</button>
                    <button type="button">EXIT</button>
                </div>
            </form>
        </div>
    </div>
</div>
<script type="text/javascript" src="{{ asset('js/Sales/Customer.js') }}"></script>
@endsection
