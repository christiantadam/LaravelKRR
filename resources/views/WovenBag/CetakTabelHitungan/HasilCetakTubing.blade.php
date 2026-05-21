<style>
    table {
        width: 100%;
        border-collapse: collapse;
    }

    th,
    td {
        border: 1px solid black;
        padding: 8px;
        text-align: left;
    }

    th {
        background-color: #f2f2f2;
    }

    .text-center {
        text-align: center;
    }
</style>
@php
    // dd($dataCetak);
    $Lebar = number_format($dataCetak[0]->Lebar, 2, '.', ',');
    $Panjang = number_format($dataCetak[0]->Panjang, 2, '.', ',');
    $Tinggi = number_format($dataCetak[0]->Tinggi, 2, '.', ',');
    $LebarClothJadi = number_format($dataCetak[0]->LebarClothJadi, 2, '.', ',');
    $PanjangClothJadi = number_format($dataCetak[0]->PanjangClothJadi, 2, '.', ',');
    $Warp = number_format($dataCetak[0]->Warp, 2, '.', ',');
    $Weft = number_format($dataCetak[0]->Weft, 2, '.', ',');
    $Denier = number_format($dataCetak[0]->Denier, 2, '.', ',');
    $Weft = number_format($dataCetak[0]->Weft, 2, '.', ',');
    $BeratClothJadi = number_format($dataCetak[0]->BeratClothJadi, 2, '.', ',');
    $LebarClothPakai = number_format($dataCetak[0]->LebarClothPakai, 2, '.', ',');
    $PanjangClothPakai = number_format($dataCetak[0]->PanjangClothPakai, 2, '.', ',');
    $BeratClothPakai = number_format($dataCetak[0]->BeratClothPakai, 2, '.', ',');
    $LamiJadi = number_format($dataCetak[0]->LamiJadi, 2, '.', ',');
    $BeratLamiJadi = number_format($dataCetak[0]->BeratLamiJadi, 2, '.', ',');
    $LamiPakai = number_format($dataCetak[0]->LamiPakai, 2, '.', ',');
    $BeratLamiPakai = number_format($dataCetak[0]->BeratLamiPakai, 2, '.', ',');
    $OPPBodyJadiCM = number_format($dataCetak[0]->OPPBodyJadiCM, 2, '.', ',');
    $OPPBodyJadiMIK = number_format($dataCetak[0]->OPPBodyJadiMIK, 2, '.', ',');
    $BeratOPPBodyJadi = number_format($dataCetak[0]->BeratOPPBodyJadi, 2, '.', ',');
    $OPPBodyPakaiCM = number_format($dataCetak[0]->OPPBodyPakaiCM, 2, '.', ',');
    $OPPBodyPakaiMIK = number_format($dataCetak[0]->OPPBodyPakaiMIK, 2, '.', ',');
    $BeratOPPBodyPakai = number_format($dataCetak[0]->BeratOPPBodyPakai, 2, '.', ',');
    $LebarPatchJadi = number_format($dataCetak[0]->LebarPatchJadi, 2, '.', ',');
    $PanjangPatchJadi = number_format($dataCetak[0]->PanjangPatchJadi, 2, '.', ',');
    $BeratPatchJadi = number_format($dataCetak[0]->BeratPatchJadi, 2, '.', ',');
    $OPPPatchJadi = number_format($dataCetak[0]->OPPPatchJadi, 2, '.', ',');
    $BeratOPPPatchJadi = number_format($dataCetak[0]->BeratOPPPatchJadi, 2, '.', ',');
    $OPPPatchPakai = number_format($dataCetak[0]->OPPPatchPakai, 2, '.', ',');
    $BeratOPPPatchPakai = number_format($dataCetak[0]->BeratOPPPatchPakai, 2, '.', ',');
    $LamiPatchJadi = number_format($dataCetak[0]->LamiPatchJadi, 2, '.', ',');
    $BeratLamiPatchJadi = number_format($dataCetak[0]->BeratLamiPatchJadi, 2, '.', ',');
    $LamiPatchPakai = number_format($dataCetak[0]->LamiPatchPakai, 2, '.', ',');
    $BeratLamiPatchPakai = number_format($dataCetak[0]->BeratLamiPatchPakai, 2, '.', ',');
    $KertasJadiCM = number_format($dataCetak[0]->KertasJadiCM, 2, '.', ',');
    $KertasJadiGSM = number_format($dataCetak[0]->KertasJadiGSM, 2, '.', ',');
    $BeratKertasJadi = number_format($dataCetak[0]->BeratKertasJadi, 2, '.', ',');
    $KertasPakaiCM = number_format($dataCetak[0]->KertasPakaiCM, 2, '.', ',');
    $KertasPakaiGSM = number_format($dataCetak[0]->KertasPakaiGSM, 2, '.', ',');
    $BeratKertasPakai = number_format($dataCetak[0]->BeratKertasPakai, 2, '.', ',');
    $PanjangValve = number_format($dataCetak[0]->PanjangValve, 2, '.', ',');
    $LebarValveJadi = number_format($dataCetak[0]->LebarValveJadi, 2, '.', ',');
    $LebarValvePakai = number_format($dataCetak[0]->LebarValvePakai, 2, '.', ',');
    $BeratValveJadi = number_format($dataCetak[0]->BeratValveJadi, 2, '.', ',');
    $BeratValvePakai = number_format($dataCetak[0]->BeratValvePakai, 2, '.', ',');
    $LamiValveJadi = number_format($dataCetak[0]->LamiValveJadi, 2, '.', ',');
    $LamiValvePakai = number_format($dataCetak[0]->LamiValvePakai, 2, '.', ',');
    $BeratLamiValveJadi = number_format($dataCetak[0]->BeratLamiValveJadi, 2, '.', ',');
    $BeratLamiValvePakai = number_format($dataCetak[0]->BeratLamiValvePakai, 2, '.', ',');
    $BeratLemEVA = number_format($dataCetak[0]->BeratLemEVA, 2, '.', ',');
    $BeratLemOverlap = number_format($dataCetak[0]->BeratLemOverlap, 2, '.', ',');
    $TotalJadi = number_format($dataCetak[0]->TotalJadi, 2, '.', ',');
    $TotalPakai = number_format($dataCetak[0]->TotalPakai, 2, '.', ',');
@endphp
<div>
    <div style="display: flex;flex-direction: row;">
        <div style="flex:0.15;">
            <p>Product Name</p>
            <p>Product Type</p>
            <p>Designed For</p>
            <p>Date</p>
            <p>Designed By</p>
        </div>
        <div style="flex: 0.01;">
            <p>:</p>
            <p>:</p>
            <p>:</p>
            <p>:</p>
            <p>:</p>
        </div>
        <div style="flex: 0.85;">
            <p>{{ $dataCetak[0]->JenisProduct }}</p>
            <p>{{ $dataCetak[0]->TypeBarang }}</p>
            <p>{{ $dataCetak[0]->NamaCust }}</p>
            <p>{{ \Carbon\Carbon::parse($dataCetak[0]->Tanggal)->format('m/d/Y') }}</p>
            <p>{{ $dataCetak[0]->Nama }}</p>
        </div>
    </div>
    <h4 style="text-decoration: underline;margin: 0;">SPESIFICATION</h4>
    <div style="display: flex;flex-direction: row;">
        <div style="flex:0.15;">
            <p>Size</p>
            <p>Mesh</p>
            <p>Denier</p>
            <p>Colour</p>
        </div>
        <div style="flex: 0.01;">
            <p>:</p>
            <p>:</p>
            <p>:</p>
            <p>:</p>
        </div>
        <div style="flex: 0.85;">
            <p>{{ $Lebar }} X {{ $Panjang }} + {{ $Tinggi }} CM</p>
            <p>{{ $Warp }} X {{ $Weft }}</p>
            <p>{{ $Denier }}</p>
            <p>{{ $dataCetak[0]->Colour }}</p>
        </div>
    </div>
    <h4 style="text-decoration: underline;margin: 0;">PRINTING</h4>
    <div style="display: flex;flex-direction: row;">
        <div style="flex:0.15;">
            <p>Sisi 1</p>
            <p>Sisi 2</p>
        </div>
        <div style="flex: 0.01;">
            <p>:</p>
            <p>:</p>
        </div>
        <div style="flex: 0.85;">
            <p>{{ $dataCetak[0]->PrintingSisi1 }}</p>
            <p>{{ $dataCetak[0]->PrintingSisi2 }}</p>
        </div>
    </div>
    <table>
        <tr>
            <th class="text-center" rowspan="2">PART</th>
            <th class="text-center" colspan="2">BAG JADI</th>
            <th class="text-center" colspan="2">PEMAKAIAN KAIN / KERTAS</th>
        </tr>
        <tr>
            <th>SPEK</th>
            <th>BERAT<br>(GRAM)</th>
            <th>SPEK</th>
            <th>BERAT<br>(GRAM)</th>
        </tr>
        <tr>
            <td>CLOTH</td>
            <td class="text-center">{{ $LebarClothJadi }} X {{ $PanjangClothJadi }} / {{ $Warp }} X
                {{ $Weft }} / {{ $Denier }}</td>
            <td class="text-center">{{ $BeratClothJadi }}</td>
            <td class="text-center">{{ $LebarClothPakai }} X {{ $PanjangClothPakai }} /
                {{ $Warp }} X {{ $Weft }} / {{ $Denier }}</td>
            <td class="text-center">{{ $BeratClothPakai }}</td>
        </tr>
        <tr>
            <td>LAMI BODY</td>
            <td class="text-center">{{ $LamiJadi }}</td>
            <td class="text-center">{{ $BeratLamiJadi }}</td>
            <td class="text-center">{{ $LamiPakai }}</td>
            <td class="text-center">{{ $BeratLamiPakai }}</td>
        </tr>
        <tr>
            <td>OPP BODY</td>
            <td class="text-center">{{ $OPPBodyJadiCM }} CM / {{ $OPPBodyJadiMIK }} MIK</td>
            <td class="text-center">{{ $BeratOPPBodyJadi }}</td>
            <td class="text-center">{{ $OPPBodyPakaiCM }} CM / {{ $OPPBodyPakaiMIK }} MIK</td>
            <td class="text-center">{{ $BeratOPPBodyPakai }}</td>
        </tr>
        <tr>
            <td>PATCH</td>
            <td class="text-center">{{ $LebarPatchJadi }} X {{ $PanjangPatchJadi }}</td>
            <td class="text-center">{{ $BeratPatchJadi }}</td>
            <td class="text-center">{{ $LebarPatchJadi }} X {{ $PanjangPatchJadi }}</td>
            <td class="text-center">{{ $BeratPatchJadi }}</td>
        </tr>
        <tr>
            <td>OPP PATCH</td>
            <td class="text-center">{{ $LebarPatchJadi }} X {{ $PanjangPatchJadi }} X 2 / {{ $OPPPatchJadi }} MIK</td>
            <td class="text-center">{{ $BeratOPPPatchJadi }}</td>
            <td class="text-center">{{ $LebarPatchJadi }} X {{ $PanjangPatchJadi }} X 2 / {{ $OPPPatchPakai }} MIK</td>
            <td class="text-center">{{ $BeratOPPPatchPakai }}</td>
        </tr>
        <tr>
            <td>LAMI PATCH</td>
            <td class="text-center">{{ $LamiPatchJadi }} X 2</td>
            <td class="text-center">{{ $BeratLamiPatchJadi }}</td>
            <td class="text-center">{{ $LamiPatchPakai }}</td>
            <td class="text-center">{{ $BeratLamiPatchPakai }}</td>
        </tr>
        <tr>
            <td>KERTAS</td>
            <td class="text-center">{{ $KertasJadiCM }} CM / {{ $KertasJadiGSM }} GSM</td>
            <td class="text-center">{{ $BeratKertasJadi }}</td>
            <td class="text-center">{{ $KertasPakaiCM }} CM / {{ $KertasPakaiGSM }} GSM</td>
            <td class="text-center">{{ $BeratKertasPakai }}</td>
        </tr>
        <tr>
            <td>VALVE</td>
            <td class="text-center">{{ $PanjangValve }} X {{ $LebarValveJadi }}</td>
            <td class="text-center">{{ $BeratValveJadi }}</td>
            <td class="text-center">{{ $PanjangValve }} X {{ $LebarValvePakai }}</td>
            <td class="text-center">{{ $BeratValvePakai }}</td>
        </tr>
        <tr>
            <td>LAMI VALVE</td>
            <td class="text-center">{{ $LamiValveJadi }}</td>
            <td class="text-center">{{ $BeratLamiValveJadi }}</td>
            <td class="text-center">{{ $LamiValvePakai }}</td>
            <td class="text-center">{{ $BeratLamiValvePakai }}</td>
        </tr>
        <tr>
            <td>LEM EVA</td>
            <td class="text-center">{{ $dataCetak[0]->LemEVA }}</td>
            <td class="text-center">{{ $BeratLemEVA }}</td>
            <td class="text-center">{{ $dataCetak[0]->LemEVA }}</td>
            <td class="text-center">{{ $BeratLemEVA }}</td>
        </tr>
        <tr>
            <td>LEM OVERLAP</td>
            <td class="text-center">{{ $dataCetak[0]->LemOverLap }}</td>
            <td class="text-center">{{ $BeratLemOverlap }}</td>
            <td class="text-center">{{ $dataCetak[0]->LemOverLap }}</td>
            <td class="text-center">{{ $BeratLemOverlap }}</td>
        </tr>
        <tr>
            <td>TOTAL</td>
            <td class="text-center"></td>
            <td class="text-center">{{ $TotalJadi }}</td>
            <td class="text-center"></td>
            <td class="text-center">{{ $TotalPakai }}</td>
        </tr>
    </table>
</div>
