<style>
    #hasil_cetakCloseTopTableHitungan {
        border-collapse: collapse !important;
    }

    #hasil_cetakCloseTopTableHitungan td {
        border: 1px solid #212529 !important;
    }

    body{
        margin: 12px;
    }

    @media print {
        @page {
            size: A4 landscape;
        }
    }
</style>
@php
    // dd($dataCetak);
    $width = (float) $dataCetak[0]->Width;
    $height = (float) $dataCetak[0]->Height;
    $blockBottom = (float) $dataCetak[0]->BlockBottom;
    $blockCover = (float) $dataCetak[0]->BlockCover;
    $valveSeal = (float) $dataCetak[0]->ValveSeal;
    $valveLength = (float) $dataCetak[0]->ValveLength;
    $warp = (float) $dataCetak[0]->Warp;
    $weft = (float) $dataCetak[0]->Weft;
    $warp2 = (float) $dataCetak[0]->Warp2;
    $weft2 = (float) $dataCetak[0]->Weft2;
    $warp3 = (float) $dataCetak[0]->Warp3;
    $weft3 = (float) $dataCetak[0]->Weft3;
    $warp4 = (float) $dataCetak[0]->Warp4;
    $weft4 = (float) $dataCetak[0]->Weft4;
    $yarn = (float) $dataCetak[0]->Yarn;
    $yarnTW = (float) $dataCetak[0]->Yarn_TW;
    $yarnTL = (float) $dataCetak[0]->Yarn_TL;
    $yarnBW = (float) $dataCetak[0]->Yarn_BW;
    $yarnBL = (float) $dataCetak[0]->Yarn_BL;
    $yarnVS = (float) $dataCetak[0]->Yarn_VS;
    $yarnVL = (float) $dataCetak[0]->Yarn_VL;
    $denier = (float) $dataCetak[0]->Denier;
    $denierTW = (float) $dataCetak[0]->Denier_TW;
    $denierTL = (float) $dataCetak[0]->Denier_TL;
    $denierBW = (float) $dataCetak[0]->Denier_BW;
    $denierBL = (float) $dataCetak[0]->Denier_BL;
    $denierVS = (float) $dataCetak[0]->Denier_VS;
    $denierVL = (float) $dataCetak[0]->Denier_VL;
    $lami = (float) $dataCetak[0]->Lami;
    $kertas = (float) $dataCetak[0]->Kertas;
    $inner = (float) $dataCetak[0]->Inner;
    $spoonBond = (float) $dataCetak[0]->SpoonBond;
    $opp = (float) $dataCetak[0]->OPP;
    $airPermeability = (float) $dataCetak[0]->Air;
    $tinggiBag = $height - ($blockBottom - $blockCover) / 2;
    $bodyWidth = (float) $dataCetak[0]->BodyWidth;
    $bodyHeight = (float) $dataCetak[0]->BodyHeight;
    $topWidth = (float) $dataCetak[0]->TopWidth;
    $topLength = (float) $dataCetak[0]->TopLength;
    $botWidth = (float) $dataCetak[0]->BotWidth;
    $botLength = (float) $dataCetak[0]->BotLength;
    $valveWidth = (float) $dataCetak[0]->ValveWidth;
    $valveHeight = (float) $dataCetak[0]->ValveHeight;
    $weightBodyCloth = (float) $dataCetak[0]->WeightBodyCloth;
    $weightBodyOPP = (float) $dataCetak[0]->WeightBodyOPP;
    $weightBodyLami = (float) $dataCetak[0]->WeightBodyLami;
    $subTotal1 = $weightBodyCloth + $weightBodyOPP + $weightBodyLami;
    $weightTopCloth = (float) $dataCetak[0]->WeightTopCloth;
    $weightTopOPP = (float) $dataCetak[0]->WeightTopOPP;
    $weightTopLami = (float) $dataCetak[0]->WeightTopLami;
    $subTotal2 = $weightTopCloth + $weightTopOPP + $weightTopLami;
    $weightBotCloth = (float) $dataCetak[0]->WeightBotCloth;
    $weightBotOPP = (float) $dataCetak[0]->WeightBotOPP;
    $weightBotLami = (float) $dataCetak[0]->WeightBotLami;
    $subTotal3 = $weightBotCloth + $weightBotOPP + $weightBotLami;
    $weightValveCloth = (float) $dataCetak[0]->WeightValveCloth;
    $weightValveOPP = (float) $dataCetak[0]->WeightValveOPP;
    $weightvalveLami = (float) $dataCetak[0]->WeightvalveLami;
    $subTotal4 = $weightValveCloth + $weightValveOPP + $weightvalveLami;
    $panjangKertas = (float) $dataCetak[0]->PanjangKertas;
    $lebarKertas = (float) $dataCetak[0]->LebarKertas;
    $totalKertas = (float) $dataCetak[0]->TotalKertas;
    $panjangInner = (float) $dataCetak[0]->PanjangInner;
    $lebarInner = (float) $dataCetak[0]->LebarInner;
    $totalInner = (float) $dataCetak[0]->TotalInner;
    $panjangSpoonBond = (float) $dataCetak[0]->PanjangSpoonBond;
    $lebarSpoonBond = (float) $dataCetak[0]->LebarSpoonBond;
    $totalSpoonBond = (float) $dataCetak[0]->TotalSpoonBond;
    $topOverlap = (float) $dataCetak[0]->TopOverlap;
    $botOverLap = (float) $dataCetak[0]->BotOverLap;
    $totalCloth = $weightBodyCloth + $weightTopCloth + $weightBotCloth + $weightValveCloth;
    $totalOPP = $weightBodyOPP + $weightTopOPP + $weightBotOPP + $weightValveOPP;
    $totalLami = $weightBodyLami + $weightTopLami + $weightBotLami + $weightvalveLami;
    $totalSemua = $totalCloth + $totalOPP + $totalLami + $totalKertas + $totalInner + $totalSpoonBond;
@endphp
<div id="hasil_cetakCloseTop" class="m-3">
    <div style="display: flex;flex-direction: row;gap: 1px;padding-bottom: 5px">
        <div style="flex: 0.7;">
            <div style="display: flex;flex-direction: row;gap: 1px;">
                <div style="flex: 0.4;">
                    <table id="hasil_cetakCloseTopTableHeader1">
                        <tr>
                            <td>Product Name</td>
                            <td>:</td>
                            <td id="hasil_cetakCloseTopProductName">{{ $dataCetak[0]->Nama }}</td>
                        </tr>
                        <tr>
                            <td>Product Type</td>
                            <td>:</td>
                            <td id="hasil_cetakCloseTopProductType">{{ $dataCetak[0]->Nama_brg }}</td>
                        </tr>
                        <tr>
                            <td>Date</td>
                            <td>:</td>
                            <td id="hasil_cetakCloseTopDate">
                                {{ \Carbon\Carbon::parse($dataCetak[0]->Tanggal)->format('d-M-Y') }}</td>
                        </tr>
                    </table>
                </div>
                <div style="flex: 0.6;">
                    <table id="hasil_cetakCloseTopTableHeader2">
                        <tr>
                            <td>Designed For</td>
                            <td>:</td>
                            <td id="hasil_cetakCloseTopDesignedFor">{{ $dataCetak[0]->NamaCust }}</td>
                        </tr>
                        <tr>
                            <td>Designed By</td>
                            <td>:</td>
                            <td id="hasil_cetakCloseTopDesignedBy">{{ $dataCetak[0]->DesignName }}</td>
                        </tr>
                        <tr>
                            <td>Note</td>
                            <td>:</td>
                            <td id="hasil_cetakCloseTopNote">{{ $dataCetak[0]->Keterangan ?? '' }}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <label class="m-0" style="text-decoration: underline;font-weight: bold;">SPESIFICATION</label>
            <div style="display: flex;flex-direction: row;gap: 1px;">
                <div style="flex: 0.4;">
                    <table id="hasil_cetakCloseTopTableSpesification1">
                        <tr>
                            <td>Size</td>
                            <td>:</td>
                            <td colspan="4" id="hasil_cetakCloseTopSize">{{ number_format($width, 2, '.', ',') }} X
                                {{ number_format($height, 2, '.', ',') }} +
                                {{ number_format($blockBottom, 2, '.', ',') }}</td>
                        </tr>
                        <tr>
                            <td>Mesh</td>
                            <td>:</td>
                            <td colspan="4" id="hasil_cetakCloseTopMesh">{{ number_format($warp, 2, '.', ',') }} X
                                {{ number_format($weft, 2, '.', ',') }}</td>
                        </tr>
                        <tr>
                            <td>Yarn Width</td>
                            <td>:</td>
                            <td id="hasil_cetakCloseTopYarnWidth">{{ number_format($yarn, 2, '.', ',') }} mm</td>
                            <td>Colour</td>
                            <td>:</td>
                            <td id="hasil_cetakCloseTopColour">{{ $dataCetak[0]->Colour }}</td>
                        </tr>
                    </table>
                </div>
                <div style="flex: 0.3;">
                    <table id="hasil_cetakCloseTopTableSpesification2">
                        <tr>
                            <td>Denier</td>
                            <td>:</td>
                            <td id="hasil_cetakCloseTopDenier">{{ number_format($denier, 2, '.', ',') }}</td>
                        </tr>
                        <tr>
                            <td>Lamination</td>
                            <td>:</td>
                            <td id="hasil_cetakCloseTopLamination">{{ number_format($lami, 2, '.', ',') }} μm</td>
                        </tr>
                        <tr>
                            <td>Kertas</td>
                            <td>:</td>
                            <td id="hasil_cetakCloseTopKertas">{{ number_format($kertas, 2, '.', ',') }} GSM</td>
                        </tr>
                    </table>
                </div>
                <div style="flex: 0.3;">
                    <table id="hasil_cetakCloseTopTableSpesification3">
                        <tr>
                            <td>Inner</td>
                            <td>:</td>
                            <td id="hasil_cetakCloseTopInner">{{ number_format($inner, 2, '.', ',') }} μm</td>
                        </tr>
                        <tr>
                            <td>Spoon Bond</td>
                            <td>:</td>
                            <td id="hasil_cetakCloseTopSpoonBond">{{ number_format($spoonBond, 2, '.', ',') }} GSM</td>
                        </tr>
                        <tr>
                            <td>OPP</td>
                            <td>:</td>
                            <td id="hasil_cetakCloseTopOPP">{{ number_format($opp, 2, '.', ',') }} μm</td>
                        </tr>
                    </table>
                </div>
            </div>
            <label class="m-0" style="text-decoration: underline;font-weight: bold;">PRINTING</label>
            <div style="display: flex;flex-direction: row;gap: 1px;">
                <div style="flex: 0.5;">
                    <table id="hasil_cetakCloseTopTablePrinting1">
                        <tr>
                            <td>Front</td>
                            <td>:</td>
                            <td id="hasil_cetakCloseTopFront">{{ $dataCetak[0]->PrintFront }}</td>
                        </tr>
                        <tr>
                            <td>Back</td>
                            <td>:</td>
                            <td id="hasil_cetakCloseTopBack">{{ $dataCetak[0]->PrintBack }}</td>
                        </tr>
                    </table>
                </div>
                <div style="flex: 0.5;">
                    <table id="hasil_cetakCloseTopTablePrinting2">
                        <tr>
                            <td>Top Patch</td>
                            <td>:</td>
                            <td id="hasil_cetakCloseTopTopPatch">{{ $dataCetak[0]->PrintTop }}</td>
                        </tr>
                        <tr>
                            <td>Bottom Patch</td>
                            <td>:</td>
                            <td id="hasil_cetakCloseTopBottomPatch">{{ $dataCetak[0]->PrintBottom }}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <label class="m-0" style="text-decoration: underline;font-weight: bold;">PERFORMANCE STANDARD</label>
            <div style="display: flex;flex-direction: row;gap: 1px;">
                <div style="flex: 0.4;">
                    <table id="hasil_cetakCloseTopTablePerformanceStandard1">
                        <tr>
                            <td>Air Permeability</td>
                            <td>:</td>
                            <td id="hasil_cetakCloseTopAirPermeability">
                                {{ number_format($airPermeability, 2, '.', ',') }}</td>
                        </tr>
                    </table>
                </div>
                <div style="flex: 0.6;">
                    <table id="hasil_cetakCloseTopTablePerformanceStandard2">
                        <tr>
                            <td>Tinggi Bag (berdiri)</td>
                            <td>:</td>
                            <td id="hasil_cetakCloseTopTinggiBag">{{ number_format($height, 2, '.', ',') }} -
                                (({{ number_format($blockBottom, 2, '.', ',') }} +
                                {{ number_format($blockCover, 2, '.', ',') }}) / 2) =
                                {{ number_format($tinggiBag, 2, '.', ',') }} cm</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div style="flex: 0.3;">
            <div style="position: relative; display: inline-block;">
                <img src="{{ asset('images/Gbr1a.png') }}" style="width: 100%">
                <input type="text" id="hasil_cetakCloseTopGambarInputBB" name="hasil_cetakCloseTopGambarInputBB"
                    style="position: absolute; top: 78.5%; left: 0; width: 13.5%; background-color: white;border:none;"
                    value="{{ number_format($blockBottom, 2, '.', ',') }}" disabled>
                <input type="text" id="hasil_cetakCloseTopGambarInputBC" name="hasil_cetakCloseTopGambarInputBC"
                    style="position: absolute; top: 22.7%; left: -0.2%; width: 13%; background-color: white;border:none;"
                    value="{{ number_format($blockCover, 2, '.', ',') }}" disabled>
                <input type="text" id="hasil_cetakCloseTopGambarInputVS" name="hasil_cetakCloseTopGambarInputVS"
                    style="position: absolute; top: 40.5%; left: 18.4%; width: 11%; background-color: white;border:none;"
                    value="{{ number_format($valveSeal, 2, '.', ',') }}" disabled>
                <input type="text" id="hasil_cetakCloseTopGambarInputVL" name="hasil_cetakCloseTopGambarInputVL"
                    style="position: absolute; top: 49.5%; left: 29%; width: 13%; background-color: white;border:none;"
                    value="{{ number_format($valveLength, 2, '.', ',') }}" disabled>
                <input type="text" id="hasil_cetakCloseTopGambarInputW" name="hasil_cetakCloseTopGambarInputW"
                    style="position: absolute; top: -0.7%; left: 46.5%; width: 17%; background-color: white;border:none;"
                    value="{{ number_format($width, 2, '.', ',') }}" disabled>
                <input type="text" id="hasil_cetakCloseTopGambarInputH" name="hasil_cetakCloseTopGambarInputH"
                    style="position: absolute; top: 44%; left: 88.2%; width: 12%; background-color: white;border:none;"
                    value="{{ number_format($height, 2, '.', ',') }}" disabled>
                <input type="text" id="hasil_cetakCloseTopGambarInputFA" name="hasil_cetakCloseTopGambarInputFA"
                    style="position: absolute; top: 62%; left: 30%; width: 50%; background-color: white;border:none;"
                    value="{{ $dataCetak[0]->FrontArea }}" disabled>
            </div>
        </div>
    </div>
    <table id="hasil_cetakCloseTopTableHitungan" style="width: 100%">
        <tr style="text-align: center;">
            <td rowspan="2" style="font-weight: bold;">Dimension</td>
            <td rowspan="2" style="font-weight: bold;">Standard<br>(cm)</td>
            <td rowspan="2" style="font-weight: bold;">Tolerance</td>
            <td colspan="6" style="font-weight: bold;">Material</td>
            <td rowspan="2" style="font-weight: bold;">Cloth<br>Weight (gr)</td>
            <td rowspan="2" style="font-weight: bold;">OPP<br>Weight (gr)</td>
            <td rowspan="2" style="font-weight: bold;">Lamination<br>Weight (gr)</td>
            <td rowspan="2" style="font-weight: bold;">Sub Total<br>(gr)</td>
        </tr>
        <tr style="text-align: center;">
            <td style="font-weight: bold;">Size (cm)</td>
            <td style="font-weight: bold;">Mesh</td>
            <td colspan="4" style="font-weight: bold;">Yarn Type</td>
        </tr>
        <tr>
            <td style="border-bottom: none !important;">W. Weight</td>
            <td style="text-align: center;border-bottom: none !important;">
                {{ number_format($width, 2, '.', ',') }}</td>
            <td style="text-align: center;border-bottom: none !important;">&plusmn; 0.7</td>
            <td rowspan="2" style="text-align: center;">{{ number_format($bodyWidth, 2, '.', ',') }} X
                {{ number_format($bodyHeight, 2, '.', ',') }}</td>
            <td rowspan="2" style="text-align: center;">{{ number_format($warp, 2, '.', ',') }} X
                {{ number_format($weft, 2, '.', ',') }}</td>
            <td style="text-align: center;">WA</td>
            <td style="text-align: center;">{{ number_format($yarn, 2, '.', ',') }}</td>
            <td style="text-align: center;">{{ number_format($denier, 2, '.', ',') }}</td>
            <td style="text-align: center;">{{ $dataCetak[0]->Colour }}</td>
            <td rowspan="2" style="text-align: center;">{{ number_format($weightBodyCloth, 2, '.', ',') }}</td>
            <td rowspan="2" style="text-align: center;">{{ number_format($weightBodyOPP, 2, '.', ',') }}</td>
            <td rowspan="2" style="text-align: center;">{{ number_format($weightBodyLami, 2, '.', ',') }}</td>
            <td rowspan="2" style="text-align: center;">{{ number_format($subTotal1, 2, '.', ',') }}</td>
        </tr>
        <tr>
            <td style="border-top: none !important;">H. Height</td>
            <td style="text-align: center;border-top: none !important;">{{ number_format($height, 2, '.', ',') }}
            </td>
            <td style="text-align: center;border-top: none !important;">&plusmn; 1</td>
            <td style="text-align: center;">WE</td>
            <td style="text-align: center;">{{ number_format($yarn, 2, '.', ',') }}</td>
            <td style="text-align: center;">{{ number_format($denier, 2, '.', ',') }}</td>
            <td style="text-align: center;">{{ $dataCetak[0]->Colour }}</td>
        </tr>
        <tr>
            <td style="border-bottom: none !important;">TW. Top Cover Width</td>
            <td style="text-align: center;border-bottom: none !important;">{{ number_format($topWidth, 2, '.', ',') }}
            </td>
            <td style="text-align: center;border-bottom: none !important;">&plusmn; 0.5</td>
            <td rowspan="2" style="text-align: center;">{{ number_format($topWidth, 2, '.', ',') }} X
                {{ number_format($topLength, 2, '.', ',') }}</td>
            <td rowspan="2" style="text-align: center;">{{ number_format($warp2, 2, '.', ',') }} X
                {{ number_format($weft2, 2, '.', ',') }}</td>
            <td style="text-align: center;">WA</td>
            <td style="text-align: center;">{{ number_format($yarnTW, 2, '.', ',') }}</td>
            <td style="text-align: center;">{{ number_format($denierTW, 2, '.', ',') }}</td>
            <td style="text-align: center;">{{ trim($dataCetak[0]->Colour_TW) }}</td>
            <td rowspan="2" style="text-align: center;">{{ number_format($weightTopCloth, 2, '.', ',') }}</td>
            <td rowspan="2" style="text-align: center;">{{ number_format($weightTopOPP, 2, '.', ',') }}</td>
            <td rowspan="2" style="text-align: center;">{{ number_format($weightTopLami, 2, '.', ',') }}</td>
            <td rowspan="2" style="text-align: center;">{{ number_format($subTotal2, 2, '.', ',') }}</td>
        </tr>
        <tr>
            <td style="border-top: none !important;">TL. Top Cover Length</td>
            <td style="text-align: center;border-top: none !important;">{{ number_format($topLength, 2, '.', ',') }}
            </td>
            <td style="text-align: center;border-top: none !important;">&plusmn; 1</td>
            <td style="text-align: center;">WE</td>
            <td style="text-align: center;">{{ number_format($yarnTL, 2, '.', ',') }}</td>
            <td style="text-align: center;">{{ number_format($denierTL, 2, '.', ',') }}</td>
            <td style="text-align: center;">{{ trim($dataCetak[0]->Colour_TL) }}</td>
        </tr>
        <tr>
            <td style="border-bottom: none !important;">BW. Bottom Cover Width</td>
            <td style="text-align: center;border-bottom: none !important;">{{ number_format($botWidth, 2, '.', ',') }}
            </td>
            <td style="text-align: center;border-bottom: none !important;">&plusmn; 0.5</td>
            <td rowspan="2" style="text-align: center;">{{ number_format($botWidth, 2, '.', ',') }} X
                {{ number_format($botLength, 2, '.', ',') }}</td>
            <td rowspan="2" style="text-align: center;">{{ number_format($warp3, 2, '.', ',') }} X
                {{ number_format($weft3, 2, '.', ',') }}</td>
            <td style="text-align: center;">WA</td>
            <td style="text-align: center;">{{ number_format($yarnBW, 2, '.', ',') }}</td>
            <td style="text-align: center;">{{ number_format($denierBW, 2, '.', ',') }}</td>
            <td style="text-align: center;">{{ trim($dataCetak[0]->Colour_BW) }}</td>
            <td rowspan="2" style="text-align: center;">{{ number_format($weightBotCloth, 2, '.', ',') }}</td>
            <td rowspan="2" style="text-align: center;">{{ number_format($weightBotOPP, 2, '.', ',') }}</td>
            <td rowspan="2" style="text-align: center;">{{ number_format($weightBotLami, 2, '.', ',') }}</td>
            <td rowspan="2" style="text-align: center;">{{ number_format($subTotal3, 2, '.', ',') }}</td>
        </tr>
        <tr>
            <td style="border-top: none !important;">BL. Bottom Cover Length</td>
            <td style="text-align: center;border-top: none !important;">{{ number_format($botLength, 2, '.', ',') }}
            </td>
            <td style="text-align: center;border-top: none !important;">&plusmn; 1</td>
            <td style="text-align: center;">WE</td>
            <td style="text-align: center;">{{ number_format($yarnBL, 2, '.', ',') }}</td>
            <td style="text-align: center;">{{ number_format($denierBL, 2, '.', ',') }}</td>
            <td style="text-align: center;">{{ trim($dataCetak[0]->Colour_BL) }}</td>
        </tr>
        <tr>
            <td style="border-bottom: none !important;">VS. Valve Seal</td>
            <td style="text-align: center;border-bottom: none !important;">
                {{ number_format($valveSeal, 2, '.', ',') }}</td>
            <td style="text-align: center;border-bottom: none !important;">&plusmn; 0.5</td>
            <td rowspan="2" style="text-align: center;">{{ number_format($valveWidth, 2, '.', ',') }} X
                {{ number_format($valveHeight, 2, '.', ',') }}</td>
            <td rowspan="2" style="text-align: center;">{{ number_format($warp4, 2, '.', ',') }} X
                {{ number_format($weft4, 2, '.', ',') }}</td>
            <td style="text-align: center;">WA</td>
            <td style="text-align: center;">{{ number_format($yarnVS, 2, '.', ',') }}</td>
            <td style="text-align: center;">{{ number_format($denierVS, 2, '.', ',') }}</td>
            <td style="text-align: center;">{{ trim($dataCetak[0]->Colour_VS) }}</td>
            <td rowspan="2" style="text-align: center;">{{ number_format($weightValveCloth, 2, '.', ',') }}</td>
            <td rowspan="2" style="text-align: center;">{{ number_format($weightValveOPP, 2, '.', ',') }}</td>
            <td rowspan="2" style="text-align: center;">{{ number_format($weightvalveLami, 2, '.', ',') }}</td>
            <td rowspan="2" style="text-align: center;">{{ number_format($subTotal4, 2, '.', ',') }}</td>
        </tr>
        <tr>
            <td style="border-top: none !important;">VL. Valve Length</td>
            <td style="text-align: center;border-top: none !important;">{{ number_format($valveLength, 2, '.', ',') }}
            </td>
            <td style="text-align: center;border-top: none !important;">&plusmn; 0.5</td>
            <td style="text-align: center;">WE</td>
            <td style="text-align: center;">{{ number_format($yarnVL, 2, '.', ',') }}</td>
            <td style="text-align: center;">{{ number_format($denierVL, 2, '.', ',') }}</td>
            <td style="text-align: center;">{{ trim($dataCetak[0]->Colour_VL) }}</td>
        </tr>
        <tr>
            <td>Kertas</td>
            <td style="text-align: center;border-top: none !important;">---</td>
            <td style="text-align: center;border-top: none !important;">---</td>
            <td style="text-align: center;">{{ number_format($panjangKertas, 2, '.', ',') }} X
                {{ number_format($lebarKertas, 2, '.', ',') }}</td>
            <td style="text-align: center;">---</td>
            <td colspan="4" style="text-align: center;">---</td>
            <td style="text-align: center;">---</td>
            <td style="text-align: center;">---</td>
            <td style="text-align: center;">---</td>
            <td style="text-align: center;">{{ number_format($totalKertas, 2, '.', ',') }}</td>
        </tr>
        <tr>
            <td>Inner</td>
            <td style="text-align: center;border-top: none !important;">---</td>
            <td style="text-align: center;border-top: none !important;">---</td>
            <td style="text-align: center;">{{ number_format($panjangInner, 2, '.', ',') }} X
                {{ number_format($lebarInner, 2, '.', ',') }}</td>
            <td style="text-align: center;">---</td>
            <td colspan="4" style="text-align: center;">---</td>
            <td style="text-align: center;">---</td>
            <td style="text-align: center;">---</td>
            <td style="text-align: center;">---</td>
            <td style="text-align: center;">{{ number_format($totalInner, 2, '.', ',') }}</td>
        </tr>
        <tr>
            <td>SpoonBond</td>
            <td style="text-align: center;border-top: none !important;">---</td>
            <td style="text-align: center;border-top: none !important;">---</td>
            <td style="text-align: center;">{{ number_format($panjangSpoonBond, 2, '.', ',') }} X
                {{ number_format($lebarSpoonBond, 2, '.', ',') }}</td>
            <td style="text-align: center;">---</td>
            <td colspan="4" style="text-align: center;">---</td>
            <td style="text-align: center;">---</td>
            <td style="text-align: center;">---</td>
            <td style="text-align: center;">---</td>
            <td style="text-align: center;">{{ number_format($totalSpoonBond, 2, '.', ',') }}</td>
        </tr>
        <tr>
            <td>BB. Block Bottom</td>
            <td style="text-align: center;border-top: none !important;">
                {{ number_format($blockBottom, 2, '.', ',') }}</td>
            <td style="text-align: center;border-top: none !important;">&plusmn; 0.5</td>
            <td style="text-align: center;">---</td>
            <td style="text-align: center;">---</td>
            <td colspan="4" style="text-align: center;">---</td>
            <td style="text-align: center;font-weight: bold;">Total Cloth</td>
            <td style="text-align: center;font-weight: bold;">Total OPP</td>
            <td style="text-align: center;font-weight: bold;">Total Lami</td>
            <td style="text-align: center;font-weight: bold;">Total (gr)</td>
        </tr>
        <tr>
            <td>TO. Top Fabric Overlap</td>
            <td style="text-align: center;border-top: none !important;">
                {{ number_format($topOverlap, 2, '.', ',') }}</td>
            <td style="text-align: center;border-top: none !important;">&plusmn; 0.2</td>
            <td style="text-align: center;">---</td>
            <td style="text-align: center;">---</td>
            <td colspan="4" style="text-align: center;">---</td>
            <td rowspan="3" style="text-align: center;font-weight: bold;">
                {{ number_format($totalCloth, 2, '.', ',') }}</td>
            <td rowspan="3" style="text-align: center;font-weight: bold;">
                {{ number_format($totalOPP, 2, '.', ',') }}</td>
            <td rowspan="3" style="text-align: center;font-weight: bold;">
                {{ number_format($totalLami, 2, '.', ',') }}</td>
            <td rowspan="3" style="text-align: center;font-weight: bold;">
                {{ number_format($totalSemua, 2, '.', ',') }}</td>
        </tr>
        <tr>
            <td>BO. Bottom Fabric Overlap</td>
            <td style="text-align: center;border-top: none !important;">{{ number_format($botOverLap, 2, '.', ',') }}
            </td>
            <td style="text-align: center;border-top: none !important;">&plusmn; 0.2</td>
            <td style="text-align: center;">---</td>
            <td style="text-align: center;">---</td>
            <td colspan="4" style="text-align: center;">---</td>
        </tr>
        <tr>
            <td>BC. Block Cover</td>
            <td style="text-align: center;border-top: none !important;">{{ number_format($blockCover, 2, '.', ',') }}
            </td>
            <td style="text-align: center;border-top: none !important;">&plusmn; 0.5</td>
            <td style="text-align: center;">---</td>
            <td style="text-align: center;">---</td>
            <td colspan="4" style="text-align: center;">---</td>
        </tr>
    </table>
</div>
