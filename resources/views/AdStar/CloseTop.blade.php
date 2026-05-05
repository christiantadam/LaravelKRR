@extends('layouts.appAdStar')
@section('title', 'Close Top Tabel Hitungan')
@section('content')
    <input type="hidden" name="nomorUser" id="nomorUser" value="{{ $user }}">
    <input type="hidden" name="valveSeal" id="valveSeal">
    <input type="hidden" name="valveLength" id="valveLength">
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-12 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="d-flex">
                            <div style="flex: 0.7">
                                <div class="d-flex">
                                    <div style="flex: 0.6">
                                        <div style="display: flex;flex-direction: row;">
                                            <label class="col-md-3 p-0">Product Name:</label>
                                            <div class="col-md-2 p-0">
                                                <input type="radio" name="jenisProduct" id="productStarpak"
                                                    value="Starpak" checked disabled>Starpak
                                            </div>
                                            <div class="col-md-2 p-0">
                                                <input type="radio" name="jenisProduct" id="productAdstar" value="Adstar"
                                                    disabled>Adstar
                                            </div>
                                            <input type="hidden" name="idProduct" id="idProduct">
                                        </div>
                                        <div>
                                            <label class="col-md-3 p-0">Design For:</label>
                                            <input class="col-md-1 p-0 readonly-field" type="text" id="idCustomer"
                                                name="idCustomer" disabled>
                                            <input class="col-md-4 p-0 readonly-field" type="text" id="namaCustomer"
                                                name="namaCustomer" disabled>
                                            <button type="button" id="btnBrowseCustomer" class="btn btn-primary"
                                                disabled>...</button>
                                            <button type="button" id="btnJenisBag" class="btn btn-primary" disabled>Jenis
                                                Bag</button>
                                        </div>
                                        <div>
                                            <div>
                                                <label class="col-md-3 p-0">Product Type:</label>
                                                <input class="col-md-1 p-0" type="text" id="productType1"
                                                    name="productType1" style="background-color: bisque;" disabled>
                                                -
                                                <input class="col-md-4 p-0" type="text" id="productType2"
                                                    name="productType2" style="background-color: bisque;" disabled>
                                                <button type="button" id="btnBrowseProduct" class="btn btn-primary"
                                                    disabled>List
                                                    Type</button>
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <label class="col-md-3 p-0" for="tanggalPembuatan">Dated:</label>
                                                <input class="col-md-3 p-0" type="date" id="tanggalPembuatan"
                                                    name="tanggalPembuatan" disabled>
                                                {{-- <label class="col-md-3 p-0" for="designedBy">Designed by:</label>
                                                <input class="col-md-2 p-0" style="background-color: bisque;" type="text"
                                                    id="designedBy" disabled> --}}
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <label class="col-md-3 p-0" style="vertical-align: top;"
                                                    for="keterangan">Keterangan:</label>
                                                <textarea class="col-md-8 p-0" style="background-color: bisque;" name="keterangan" id="keterangan" disabled></textarea>
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                            </div>
                                        </div>
                                        <h5 style="color: blue;text-decoration: underline;font-style: italic;">PRINTING</h5>
                                        <div>
                                            <label class="col-md-1 p-0" for="printingFront">Front:</label>
                                            <input class="col-md-4 p-0" type="text" style="background-color: bisque;"
                                                id="printingFront" name="printingFront" disabled>
                                            <label class="col-md-3 p-0" for="printingTopPatch">Top Patch:</label>
                                            <input class="col-md-3 p-0" type="text" style="background-color: bisque;"
                                                id="printingTopPatch" name="printingTopPatch" disabled>
                                        </div>
                                        <div>
                                            <label class="col-md-1 p-0" for="printingBack">Back:</label>
                                            <input class="col-md-4 p-0" type="text" style="background-color: bisque;"
                                                id="printingBack" name="printingBack" disabled>
                                            <label class="col-md-3 p-0" for="printingBottomPatch">Bottom Patch:</label>
                                            <input class="col-md-3 p-0" type="text" style="background-color: bisque;"
                                                id="printingBottomPatch" name="printingBottomPatch" disabled>
                                        </div>
                                    </div>
                                    <div style="flex: 0.4">
                                        <h5 style="color: blue;text-decoration: underline;font-style: italic;">
                                            SPESIFICATION
                                        </h5>
                                        <div>
                                            <label class="col-md-3 p-0" for="sizeW1">Size:</label>
                                            <input class="col-md-2 p-0 readonly-field" type="text" id="sizeW1"
                                                name="sizeW1" disabled> x
                                            <input class="col-md-2 p-0 readonly-field" type="text" id="sizeH1"
                                                name="sizeH1" disabled> +
                                            <input class="col-md-2 p-0 readonly-field" type="text" id="sizeBB1"
                                                name="sizeBB1" disabled> CM
                                        </div>
                                        <div>
                                            <label class="col-md-3 p-0" for="meshWA">Mesh:</label>
                                            <input class="col-md-2 p-0" type="text" id="meshWA" name="meshWA"
                                                style="background-color: bisque;" disabled> x
                                            <input class="col-md-2 p-0" type="text" id="meshWE" name="meshWE"
                                                style="background-color: bisque;" disabled>
                                        </div>
                                        <div>
                                            <label class="col-md-3 p-0" for="yarnWidth">Yarn Width:</label>
                                            <input class="col-md-3 p-0" type="text" id="yarnWidth" name="yarnWidth"
                                                style="background-color: bisque;" disabled>
                                            <label class="col-md-2 p-0" for="denier">Denier:</label>
                                            <input class="col-md-3 p-0" type="text" id="denier" name="denier"
                                                style="background-color: bisque;" disabled>
                                        </div>
                                        <div>
                                            <label class="col-md-3 p-0" for="colour">Colour:</label>
                                            <input class="col-md-8 p-0" type="text" id="colour" name="colour"
                                                style="background-color: bisque;" disabled>
                                        </div>
                                        <div>
                                            <label class="col-md-3 p-0" for="lamination">Lamination:</label>
                                            <input class="col-md-3 p-0" type="text" id="lamination" name="lamination"
                                                placeholder="μm" style="background-color: bisque;" disabled>
                                            <label class="col-md-2 p-0" for="OPP">OPP:</label>
                                            <input class="col-md-3 p-0" type="text" id="OPP" name="OPP"
                                                placeholder="μm" style="background-color: bisque;" disabled>
                                        </div>
                                        <div>
                                            <label class="col-md-3 p-0" for="kertas">Kertas:</label>
                                            <input class="col-md-3 p-0" type="text" id="kertas" name="kertas"
                                                placeholder="GSM" style="background-color: bisque;" disabled>
                                            <label class="col-md-2 p-0" for="inner">Inner:</label>
                                            <input class="col-md-3 p-0" type="text" id="inner" name="inner"
                                                placeholder="μm" style="background-color: bisque;" disabled>
                                        </div>
                                        <div>
                                            <label class="col-md-3 p-0" for="spoonbond">SpoonBond:</label>
                                            <input class="col-md-3 p-0" type="text" id="spoonbond" name="spoonbond"
                                                placeholder="GSM" style="background-color: bisque;" disabled>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h5 style="color: blue;text-decoration: underline;font-style: italic;">PERFORMANCE
                                        STANDARD</h5>
                                    <div class="d-flex mt-2">
                                        <div class="w-100">
                                            <label class="col-md-2 p-0" for="airPermeability">Air Permeability:</label>
                                            <input class="col-md-2 p-0" type="text" style="background-color: bisque;"
                                                id="airPermeability" name="airPermeability" disabled>
                                            <label class="col-md-3 p-0" for="tinggiBagBerdiri">Tinggi
                                                Bag(berdiri):</label>
                                            <input class="col-md-2 p-0 readonly-field" type="text"
                                                id="tinggiBagBerdiri" name="tinggiBagBerdiri" disabled>
                                            <button class="col-md-2 p-0" id="btnCalculate" name="btnCalculate"
                                                disabled>Calculate</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style="flex: 0.3">
                                <div style="position: relative; display: inline-block;">
                                    <img src="{{ asset('images/Gbr1a.png') }}" style="width: 100%">
                                    <input type="text" id="gambarInputBB" name="gambarInputBB" placeholder="BB"
                                        style="position: absolute;
                                            top: 78.5%;
                                            left: 0;
                                            width: 13.5%;
                                            background-color: bisque;"
                                        disabled>
                                    <input type="text" id="gambarInputBC" name="gambarInputBC" placeholder="BC"
                                        style="position: absolute;
                                            top: 22.7%;
                                            left: -0.3%;
                                            width: 13%;
                                            background-color: bisque;"
                                        disabled>
                                    <input type="text" id="gambarInputVS" name="gambarInputVS" placeholder="VS"
                                        style="position: absolute;
                                            top: 41.2%;
                                            left: 18.7%;
                                            width: 11%;
                                            background-color: bisque;"
                                        disabled>
                                    <input type="text" id="gambarInputVL" name="gambarInputVL" placeholder="VL"
                                        style="position: absolute;
                                            top: 49.5%;
                                            left: 29%;
                                            width: 13%;
                                            background-color: bisque;"
                                        disabled>
                                    <input type="text" id="gambarInputW" name="gambarInputW" placeholder="W"
                                        style="position: absolute;
                                            top: -2.3%;
                                            left: 47%;
                                            width: 17%;
                                            background-color: bisque;"
                                        disabled>
                                    <input type="text" id="gambarInputH" name="gambarInputH" placeholder="H"
                                        style="position: absolute;
                                            top: 44%;
                                            left: 88%;
                                            width: 12%;
                                            background-color: bisque;"
                                        disabled>
                                    <input type="text" id="gambarInputFA" name="gambarInputFA"
                                        placeholder="Front Area"
                                        style="position: absolute;
                                            top: 62%;
                                            left: 30%;
                                            width: 35%;
                                            background-color: bisque;"
                                        disabled>
                                </div>
                            </div>
                        </div>
                        <table id="tableHitungan" class="mt-3 w-100">
                            <thead style="text-align: center">
                                <tr>
                                    <th rowspan="2">Dimension</th>
                                    <th rowspan="2">Standard (cm)</th>
                                    <th rowspan="2">Tolerance</th>
                                    <th colspan="6">Material</th>
                                    <th rowspan="2">Cloth Weight (gr)</th>
                                    <th rowspan="2">OPP Weight (gr)</th>
                                    <th rowspan="2">Lamination Weight (gr)</th>
                                    <th rowspan="2">Sub Total (gr)</th>
                                </tr>
                                <tr>
                                    <th> Size (cm)</th>
                                    <th> Mesh</th>
                                    <th colspan="4">Yarn Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td> W. Width</td>
                                    <td style="text-align: center;" id="tableHitungan_StdWidth"> 0 </td>
                                    <td style="text-align: center;"> ±0.7</td>
                                    <td rowspan="2" style="justify-items: center;">
                                        <div class="d-flex align-items-baseline" style="gap: 5px;">
                                            <input type="text" id="tableHitungan_S1" name="tableHitungan_S1"
                                                class="readonly-field" style="text-align: center;width: 50px;" disabled>
                                            <label for="size">X</label>
                                            <input type="text" id="tableHitungan_S2" name="tableHitungan_S2"
                                                style="text-align: center;width: 50px;background-color: bisque;" disabled>
                                        </div>
                                    </td>
                                    <td rowspan="2" style="justify-items: center;">
                                        <div class="d-flex align-items-baseline" style="gap: 5px;">
                                            <input type="text" id="tableHitungan_WA1" name="tableHitungan_WA1"
                                                class="readonly-field" style="text-align: center;width: 50px;" disabled>
                                            <label for="size">X</label>
                                            <input type="text" id="tableHitungan_WE1" name="tableHitungan_WE1"
                                                class="readonly-field" style="text-align: center;width: 50px;" disabled>
                                        </div>
                                    </td>
                                    <td>Wa</td>
                                    <td style="text-align: center;">
                                        <input type="text" id="tableHitungan_yarn1" name="tableHitungan_yarn1"
                                            class="readonly-field" style="text-align: center;width: 50px;" disabled>
                                    </td>
                                    <td style="text-align: center;">
                                        <input type="text" id="tableHitungan_Denier1" name="tableHitungan_Denier1"
                                            class="readonly-field" style="text-align: center;width: 50px;" disabled>
                                    </td>
                                    <td style="text-align: center;">
                                        <input type="text" id="tableHitungan_C1" name="tableHitungan_C1"
                                            class="readonly-field" style="text-align: center;width: 50px;" disabled>
                                    </td>
                                    <td id="tableHitungan_CW1" name="tableHitungan_CW1" style="text-align: center;"
                                        rowspan="2">0</td>
                                    <td id="tableHitungan_OPP1" name="tableHitungan_OPP1" style="text-align: center;"
                                        rowspan="2">0</td>
                                    <td id="tableHitungan_LW1" name="tableHitungan_LW1" style="text-align: center;"
                                        rowspan="2">0</td>
                                    <td id="tableHitungan_ST1" name="tableHitungan_ST1" style="text-align: center;"
                                        rowspan="2">0</td>
                                </tr>
                                <tr>
                                    <td> H. Height</td>
                                    <td style="text-align: center;" id="tableHitungan_StdHeight"> 0 </td>
                                    <td style="text-align: center;"> ±1</td>
                                    <td>We</td>
                                    <td style="text-align: center;">
                                        <input type="text" id="tableHitungan_yarn2" name="tableHitungan_yarn2"
                                            class="readonly-field" style="text-align: center;width: 50px;" disabled>
                                    </td>
                                    <td style="text-align: center;">
                                        <input type="text" id="tableHitungan_Denier2" name="tableHitungan_Denier2"
                                            class="readonly-field" style="text-align: center;width: 50px;" disabled>
                                    </td>
                                    <td style="text-align: center;">
                                        <input type="text" id="tableHitungan_C2" name="tableHitungan_C2"
                                            class="readonly-field" style="text-align: center;width: 50px;" disabled>
                                    </td>
                                </tr>
                                <tr>
                                    <td> TW Top Cover Width</td>
                                    <td style="text-align: center;" id="tableHitungan_StdTW"> 0 </td>
                                    <td style="text-align: center;"> ±0.5</td>
                                    <td rowspan="2" style="justify-items: center;">
                                        <div class="d-flex align-items-baseline" style="gap: 5px;">
                                            <input id="tableHitungan_S3" name="tableHitungan_S3" type="text"
                                                style="text-align: center;width: 50px;" class="readonly-field" disabled>
                                            <label for="size">X</label>
                                            <input id="tableHitungan_S4" name="tableHitungan_S4" type="text"
                                                style="text-align: center;width: 50px;" class="readonly-field" disabled>
                                        </div>
                                    </td>
                                    <td rowspan="2" style="justify-items: center;">
                                        <div class="d-flex align-items-baseline" style="gap: 5px;">
                                            <input type="text" id="tableHitungan_WA2" name="tableHitungan_WA2"
                                                style="text-align: center;width: 50px;background-color: bisque;" disabled>
                                            <label for="size">X</label>
                                            <input type="text" id="tableHitungan_WE2" name="tableHitungan_WE2"
                                                style="text-align: center;width: 50px;background-color: bisque;" disabled>
                                        </div>
                                    </td>
                                    <td>Wa</td>
                                    <td style="text-align: center;">
                                        <input type="text" id="tableHitungan_yarn3" name="tableHitungan_yarn3"
                                            style="text-align: center;width: 50px;background-color: bisque;" disabled>
                                    </td>
                                    <td style="text-align: center;">
                                        <input type="text" id="tableHitungan_Denier3" name="tableHitungan_Denier3"
                                            style="text-align: center;width: 50px;background-color: bisque;" disabled>
                                    </td>
                                    <td style="text-align: center;">
                                        <input type="text" id="tableHitungan_C3" name="tableHitungan_C3"
                                            style="text-align: center;width: 50px;background-color: bisque;" disabled>
                                    </td>
                                    <td id="tableHitungan_CW2" name="tableHitungan_CW2" style="text-align: center;"
                                        rowspan="2">0</td>
                                    <td id="tableHitungan_OPP2" name="tableHitungan_OPP2" style="text-align: center;"
                                        rowspan="2">0</td>
                                    <td id="tableHitungan_LW2" name="tableHitungan_LW2" style="text-align: center;"
                                        rowspan="2">0</td>
                                    <td id="tableHitungan_ST2" name="tableHitungan_ST2" style="text-align: center;"
                                        rowspan="2">0</td>
                                </tr>
                                <tr>
                                    <td> TL Top Cover Length</td>
                                    <td style="text-align: center;" id="tableHitungan_StdTL"> 0 </td>
                                    <td style="text-align: center;"> ±1</td>
                                    <td>We</td>
                                    <td style="text-align: center;">
                                        <input id="tableHitungan_yarn4" name="tableHitungan_yarn4" type="text"
                                            style="text-align: center;width: 50px;background-color: bisque;" disabled>
                                    </td>
                                    <td style="text-align: center;">
                                        <input id="tableHitungan_Denier4" name="tableHitungan_Denier4" type="text"
                                            style="text-align: center;width: 50px;background-color: bisque;" disabled>
                                    </td>
                                    <td style="text-align: center;">
                                        <input id="tableHitungan_C4" name="tableHitungan_C4" type="text"
                                            style="text-align: center;width: 50px;background-color: bisque;" disabled>
                                    </td>
                                </tr>
                                <tr>
                                    <td> BW. Bottom Patch Width</td>
                                    <td style="text-align: center;" id="tableHitungan_StdBW"> 0 </td>
                                    <td style="text-align: center;"> ±0.5</td>
                                    <td rowspan="2" style="justify-items: center;">
                                        <div class="d-flex align-items-baseline" style="gap: 5px;">
                                            <input type="text" id="tableHitungan_S5" name="tableHitungan_S5"
                                                class="readonly-field" style="text-align: center;width: 50px;" disabled>
                                            <label for="size">X</label>
                                            <input type="text" id="tableHitungan_S6" name="tableHitungan_S6"
                                                class="readonly-field" style="text-align: center;width: 50px;" disabled>
                                        </div>
                                    </td>
                                    <td rowspan="2" style="justify-items: center;">
                                        <div class="d-flex align-items-baseline" style="gap: 5px;">
                                            <input type="text" id="tableHitungan_WA3" name="tableHitungan_WA3"
                                                style="text-align: center;width: 50px;background-color: bisque;" disabled>
                                            <label for="size">X</label>
                                            <input type="text" id="tableHitungan_WE3" name="tableHitungan_WE3"
                                                style="text-align: center;width: 50px;background-color: bisque;" disabled>
                                        </div>
                                    </td>
                                    <td>Wa</td>
                                    <td style="text-align: center;">
                                        <input type="text" id="tableHitungan_yarn5" name="tableHitungan_yarn5"
                                            style="text-align: center;width: 50px;background-color: bisque;" disabled>
                                    </td>
                                    <td style="text-align: center;">
                                        <input type="text" id="tableHitungan_Denier5" name="tableHitungan_Denier5"
                                            style="text-align: center;width: 50px;background-color: bisque;" disabled>
                                    </td>
                                    <td style="text-align: center;">
                                        <input type="text" id="tableHitungan_C5" name="tableHitungan_C5"
                                            style="text-align: center;width: 50px;background-color: bisque;" disabled>
                                    </td>
                                    <td id="tableHitungan_CW3" name="tableHitungan_CW3" style="text-align: center;"
                                        rowspan="2">0</td>
                                    <td id="tableHitungan_OPP3" name="tableHitungan_OPP3" style="text-align: center;"
                                        rowspan="2">0</td>
                                    <td id="tableHitungan_LW3" name="tableHitungan_LW3" style="text-align: center;"
                                        rowspan="2">0</td>
                                    <td id="tableHitungan_ST3" name="tableHitungan_ST3" style="text-align: center;"
                                        rowspan="2">0</td>
                                </tr>
                                <tr>
                                    <td> BL. Bottom Patch Length</td>
                                    <td style="text-align: center;" id="tableHitungan_StdBL"> 0 </td>
                                    <td style="text-align: center;"> ±1</td>
                                    <td>We</td>
                                    <td style="text-align: center;">
                                        <input type="text" id="tableHitungan_yarn6" name="tableHitungan_yarn6"
                                            style="text-align: center;width: 50px;background-color: bisque;" disabled>
                                    </td>
                                    <td style="text-align: center;">
                                        <input type="text" id="tableHitungan_Denier6" name="tableHitungan_Denier6"
                                            style="text-align: center;width: 50px;background-color: bisque;" disabled>
                                    </td>
                                    <td style="text-align: center;">
                                        <input type="text" id="tableHitungan_C6" name="tableHitungan_C6"
                                            style="text-align: center;width: 50px;background-color: bisque;" disabled>
                                    </td>
                                </tr>
                                <tr>
                                    <td> VS. Valve Seal</td>
                                    <td style="text-align: center;" id="tableHitungan_StdVS"> 0 </td>
                                    <td style="text-align: center;"> ±0.5</td>
                                    <td rowspan="2" style="justify-items: center;">
                                        <div class="d-flex align-items-baseline" style="gap: 5px;">
                                            <input id="tableHitungan_S7" name="tableHitungan_S7" type="text"
                                                style="text-align: center;width: 50px;" class="readonly-field" disabled>
                                            <label for="size">X</label>
                                            <input id="tableHitungan_S8" name="tableHitungan_S8" type="text"
                                                style="text-align: center;width: 50px;" class="readonly-field" disabled>
                                        </div>
                                    </td>
                                    <td rowspan="2" style="justify-items: center;">
                                        <div class="d-flex align-items-baseline" style="gap: 5px;">
                                            <input id="tableHitungan_WA4" name="tableHitungan_WA4" type="text"
                                                style="text-align: center;width: 50px;background-color: bisque;" disabled>
                                            <label for="size">X</label>
                                            <input id="tableHitungan_WE4" name="tableHitungan_WE4" type="text"
                                                style="text-align: center;width: 50px;background-color: bisque;" disabled>
                                        </div>
                                    </td>
                                    <td>Wa</td>
                                    <td style="text-align: center;">
                                        <input id="tableHitungan_yarn7" name="tableHitungan_yarn7" type="text"
                                            style="text-align: center;width: 50px;background-color: bisque;" disabled>
                                    </td>
                                    <td style="text-align: center;">
                                        <input id="tableHitungan_Denier7" name="tableHitungan_Denier7" type="text"
                                            style="text-align: center;width: 50px;background-color: bisque;" disabled>
                                    </td>
                                    <td style="text-align: center;">
                                        <input id="tableHitungan_C7" name="tableHitungan_C7" type="text"
                                            style="text-align: center;width: 50px;background-color: bisque;" disabled>
                                    </td>
                                    <td id="tableHitungan_CW4" name="tableHitungan_CW4" style="text-align: center;"
                                        rowspan="2">0</td>
                                    <td id="tableHitungan_OPP4" name="tableHitungan_OPP4" style="text-align: center;"
                                        rowspan="2">0</td>
                                    <td id="tableHitungan_LW4" name="tableHitungan_LW4" style="text-align: center;"
                                        rowspan="2">0</td>
                                    <td id="tableHitungan_ST4" name="tableHitungan_ST4" style="text-align: center;"
                                        rowspan="2">0</td>
                                </tr>
                                <tr>
                                    <td> VL. Valve Length</td>
                                    <td style="text-align: center;" id="tableHitungan_StdVL"> 0 </td>
                                    <td style="text-align: center;"> ±0.5</td>
                                    <td>We</td>
                                    <td style="text-align: center;">
                                        <input id="tableHitungan_yarn8" name="tableHitungan_yarn8" type="text"
                                            style="text-align: center;width: 50px;background-color: bisque;" disabled>
                                    </td>
                                    <td style="text-align: center;">
                                        <input id="tableHitungan_Denier8" name="tableHitungan_Denier8" type="text"
                                            style="text-align: center;width: 50px;background-color: bisque;" disabled>
                                    </td>
                                    <td style="text-align: center;">
                                        <input id="tableHitungan_C8" name="tableHitungan_C8" type="text"
                                            style="text-align: center;width: 50px;background-color: bisque;" disabled>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Kertas</td>
                                    <td></td>
                                    <td></td>
                                    <td style="justify-items: center;">
                                        <div class="d-flex align-items-baseline" style="gap: 5px;">
                                            <input id="tableHitungan_S9" name="tableHitungan_S9" type="text"
                                                style="text-align: center;width: 50px;background-color: bisque;" disabled>
                                            <label for="size">X</label>
                                            <input id="tableHitungan_S10" name="tableHitungan_S10" type="text"
                                                style="text-align: center;width: 50px;background-color: bisque;" disabled>
                                        </div>
                                    </td>
                                    <td></td>
                                    <td colspan="4"></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td id="tableHitungan_ST5" name="tableHitungan_ST5" style="text-align: center;">0
                                    </td>
                                </tr>
                                <tr>
                                    <td>Inner</td>
                                    <td></td>
                                    <td></td>
                                    <td style="justify-items: center;">
                                        <div class="d-flex align-items-baseline" style="gap: 5px;">
                                            <input id="tableHitungan_S11" name="tableHitungan_S11" type="text"
                                                style="text-align: center;width: 50px;background-color: bisque;" disabled>
                                            <label for="size">X</label>
                                            <input id="tableHitungan_S12" name="tableHitungan_S12" type="text"
                                                style="text-align: center;width: 50px;background-color: bisque;" disabled>
                                        </div>
                                    </td>
                                    <td></td>
                                    <td colspan="4"></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td id="tableHitungan_ST6" name="tableHitungan_ST6" style="text-align: center;">0
                                    </td>
                                </tr>
                                <tr>
                                    <td>SpoonBond</td>
                                    <td></td>
                                    <td></td>
                                    <td style="justify-items: center;">
                                        <div class="d-flex align-items-baseline" style="gap: 5px;">
                                            <input id="tableHitungan_S13" name="tableHitungan_S13" type="text"
                                                style="text-align: center;width: 50px;background-color: bisque;" disabled>
                                            <label for="size">X</label>
                                            <input id="tableHitungan_S14" name="tableHitungan_S14" type="text"
                                                style="text-align: center;width: 50px;background-color: bisque;" disabled>
                                        </div>
                                    </td>
                                    <td></td>
                                    <td colspan="4"></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td id="tableHitungan_ST7" name="tableHitungan_ST7" style="text-align: center;">0
                                    </td>
                                </tr>
                                <tr>
                                    <td>BB. Block Bottom</td>
                                    <td style="text-align: center;" id="tableHitungan_StdBB">0</td>
                                    <td style="text-align: center;">±0.5</td>
                                    <td style="text-align: center;">---</td>
                                    <td style="text-align: center;">---</td>
                                    <td style="text-align: center;" colspan="4">---</td>
                                    <th style="text-align: center;">Total Cloth</th>
                                    <th style="text-align: center;">Total OPP</th>
                                    <th style="text-align: center;">Total Lami</th>
                                    <th style="text-align: center;">Total (gr)</th>
                                </tr>
                                <tr>
                                    <td>BC. Block Cover</td>
                                    <td style="text-align: center;" id="tableHitungan_StdBC">0</td>
                                    <td style="text-align: center;">±0.5</td>
                                    <td style="text-align: center;">---</td>
                                    <td style="text-align: center;">---</td>
                                    <td style="text-align: center;" colspan="4">---</td>
                                    <td id="tableHitungan_CWTotal" name="tableHitungan_CWTotal"
                                        style="text-align: center;" rowspan="3">0</td>
                                    <td id="tableHitungan_OPPTotal" name="tableHitungan_OPPTotal"
                                        style="text-align: center;" rowspan="3">0</td>
                                    <td id="tableHitungan_LWTotal" name="tableHitungan_LWTotal"
                                        style="text-align: center;" rowspan="3">0</td>
                                    <td id="tableHitungan_STTotal" name="tableHitungan_STTotal"
                                        style="text-align: center;" rowspan="3">0</td>
                                </tr>
                                <tr>
                                    <td>TO. Top Fabric Overlap</td>
                                    <td style="text-align: center;" id="tableHitungan_StdTO">1</td>
                                    <td style="text-align: center;">±0.2</td>
                                    <td style="text-align: center;">---</td>
                                    <td style="text-align: center;">---</td>
                                    <td style="text-align: center;" colspan="4">---</td>
                                </tr>
                                <tr>
                                    <td>BO. Bottom Fabric Overlap</td>
                                    <td style="text-align: center;" id="tableHitungan_StdBO">1</td>
                                    <td style="text-align: center;">±0.2</td>
                                    <td style="text-align: center;">---</td>
                                    <td style="text-align: center;">---</td>
                                    <td style="text-align: center;" colspan="4">---</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="mt-3">
                            <button id="addButton" class="btn btn-primary">Add</button>
                            <button id="saveButton" class="btn btn-primary" style="display: none;">Save</button>
                            <button id="updateButton" class="btn btn-success">Update</button>
                            <button id="deleteButton" class="btn btn-danger">Delete</button>
                            <button id="cancelButton" class="btn btn-secondary" style="display: none;">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js\AdStar\CloseTop.js') }}"></script>
@endsection
