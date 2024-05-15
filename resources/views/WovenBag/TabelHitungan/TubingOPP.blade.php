@extends('layouts.appWovenBag') @section('content')
@section('title', 'Tabel Hitungan Tubing OPP')
<link href="{{ asset('css/style.css') }}" rel="stylesheet">
<link href="{{ asset('css/WovenBag/TabelHitungan/TubingOPP.css') }}" rel="stylesheet">
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-10 RDZMobilePaddingLR0">
            @if (Session::has('success'))
                <div class="alert alert-success">
                    {{ Session::get('success') }}
                </div>
            @endif
            <form class="product-form">
                <h1>Product Form</h1>
                <div class="section">
                    <label for="productName">Product Name</label>
                    <input type="text" id="productName" name="productName" value="Tubing">
                    <input type="text" id="productName2" name="productName2" value="Tubing OPP">
                </div>
                <div class="section">
                    <label for="designedFor">Designed For</label>
                    <input type="text" id="designedFor" name="designedFor">
                </div>
                <div class="section">
                    <label for="productType">Product Type</label>
                    <input type="text" id="productType" name="productType" value="TB">
                    <label for="type">Type</label>
                    <input type="text" id="type" name="type">
                </div>
                <div class="section">
                    <label for="dated">Dated</label>
                    <input type="date" id="dated" name="dated" value="2024-05-15">
                </div>
                <div class="section">
                    <label for="designedBy">Designed By</label>
                    <input type="text" id="designedBy" name="designedBy" value="F001">
                </div>
                <h2>Specification</h2>
                <div class="spec-section">
                    <label for="sizeL">Size</label>
                    <input type="text" id="sizeL" name="sizeL" placeholder="L">
                    <input type="text" id="sizeF" name="sizeF" placeholder="F">
                    <input type="text" id="sizeT" name="sizeT" placeholder="T">
                    <input type="text" id="sizeCM" name="sizeCM" placeholder="CM">
                    <label for="mesh">Mesh</label>
                    <input type="text" id="mesh" name="mesh">
                    <label for="denier">Denier</label>
                    <input type="text" id="denier" name="denier">
                    <label for="colour">Colour</label>
                    <input type="text" id="colour" name="colour">
                </div>
                <h2>Printing</h2>
                <div class="print-section">
                    <label for="sisi1">Sisi 1</label>
                    <input type="text" id="sisi1" name="sisi1">
                    <label for="sisi2">Sisi 2</label>
                    <input type="text" id="sisi2" name="sisi2">
                </div>
                <h2>LEM</h2>
                <div class="lem-section">
                    <label for="eva">EVA</label>
                    <input type="text" id="eva" name="eva">
                    <label for="overlap">Overlap</label>
                    <input type="text" id="overlap" name="overlap">
                </div>
                <div class="material-section">
                    <div class="block">
                        <h3>Bag Jadi</h3>
                        <label for="bagJadiLamiBody">Lami Body</label>
                        <input type="text" id="bagJadiLamiBody" name="bagJadiLamiBody">
                        <label for="bagJadiOPPBody">OPP Body</label>
                        <input type="text" id="bagJadiOPPBody" name="bagJadiOPPBody">
                        <label for="bagJadiOPPPatch">OPP Patch</label>
                        <input type="text" id="bagJadiOPPPatch" name="bagJadiOPPPatch">
                        <label for="bagJadiLamiPatch">Lami Patch</label>
                        <input type="text" id="bagJadiLamiPatch" name="bagJadiLamiPatch">
                        <label for="bagJadiKertas">Kertas</label>
                        <input type="text" id="bagJadiKertas" name="bagJadiKertas">
                        <label for="bagJadiValve">Valve</label>
                        <input type="text" id="bagJadiValve" name="bagJadiValve">
                    </div>
                    <div class="block">
                        <h3>Pemekain Kini/Kertas</h3>
                        <label for="pemekainKiniLamiBody">Lami Body</label>
                        <input type="text" id="pemekainKiniLamiBody" name="pemekainKiniLamiBody">
                        <label for="pemekainKiniOPPBody">OPP Body</label>
                        <input type="text" id="pemekainKiniOPPBody" name="pemekainKiniOPPBody">
                        <label for="pemekainKiniOPPPatch">OPP Patch</label>
                        <input type="text" id="pemekainKiniOPPPatch" name="pemekainKiniOPPPatch">
                        <label for="pemekainKiniLamiPatch">Lami Patch</label>
                        <input type="text" id="pemekainKiniLamiPatch" name="pemekainKiniLamiPatch">
                        <label for="pemekainKiniKertas">Kertas</label>
                        <input type="text" id="pemekainKiniKertas" name="pemekainKiniKertas">
                        <label for="pemekainKiniValve">Valve</label>
                        <input type="text" id="pemekainKiniValve" name="pemekainKiniValve">
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
