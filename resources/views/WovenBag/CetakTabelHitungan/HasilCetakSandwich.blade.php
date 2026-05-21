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
    $Gusset = number_format($dataCetak[0]->Gusset, 2, '.', ',');
    $Panjang = number_format($dataCetak[0]->Panjang, 2, '.', ',');
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
    $KertasJadiCM = number_format($dataCetak[0]->KertasJadiCM, 2, '.', ',');
    $KertasJadiGSM = number_format($dataCetak[0]->KertasJadiGSM, 2, '.', ',');
    $BeratKertasJadi = number_format($dataCetak[0]->BeratKertasJadi, 2, '.', ',');
    $KertasPakaiCM = number_format($dataCetak[0]->KertasPakaiCM, 2, '.', ',');
    $KertasPakaiGSM = number_format($dataCetak[0]->KertasPakaiGSM, 2, '.', ',');
    $BeratKertasPakai = number_format($dataCetak[0]->BeratKertasPakai, 2, '.', ',');
    $LebarClothBawahJadi = number_format($dataCetak[0]->LebarClothBawahJadi, 2, '.', ',');
    $PanjangClothBawahJadi = number_format($dataCetak[0]->PanjangClothBawahJadi, 2, '.', ',');
    $BeratClothBawahJadi = number_format($dataCetak[0]->BeratClothBawahJadi, 2, '.', ',');
    $LebarClothBawahPakai = number_format($dataCetak[0]->LebarClothBawahPakai, 2, '.', ',');
    $PanjangClothBawahPakai = number_format($dataCetak[0]->PanjangClothBawahPakai, 2, '.', ',');
    $BeratClothBawahPakai = number_format($dataCetak[0]->BeratClothBawahPakai, 2, '.', ',');
    $LamiBawahJadi = number_format($dataCetak[0]->LamiBawahJadi, 2, '.', ',');
    $BeratLamiBawahJadi = number_format($dataCetak[0]->BeratLamiBawahJadi, 2, '.', ',');
    $LamiBawahPakai = number_format($dataCetak[0]->LamiBawahPakai, 2, '.', ',');
    $BeratLamiBawahPakai = number_format($dataCetak[0]->BeratLamiBawahPakai, 2, '.', ',');
    $LebarKertasBawahJadi = number_format($dataCetak[0]->LebarKertasBawahJadi, 2, '.', ',');
    $PanjangKertasBawahJadi = number_format($dataCetak[0]->PanjangKertasBawahJadi, 2, '.', ',');
    $BeratKertasBawahJadi = number_format($dataCetak[0]->BeratKertasBawahJadi, 2, '.', ',');
    $LebarKertasBawahPakai = number_format($dataCetak[0]->LebarKertasBawahPakai, 2, '.', ',');
    $PanjangKertasBawahPakai = number_format($dataCetak[0]->PanjangKertasBawahPakai, 2, '.', ',');
    $BeratKertasBawahPakai = number_format($dataCetak[0]->BeratKertasBawahPakai, 2, '.', ',');
    $PanjangInnerJadi = number_format($dataCetak[0]->PanjangInnerJadi, 2, '.', ',');
    $LebarInnerJadi = number_format($dataCetak[0]->LebarInnerJadi, 2, '.', ',');
    $TebalInnerJadi = number_format($dataCetak[0]->TebalInnerJadi, 2, '.', ',');
    $BeratInnerJadi = number_format($dataCetak[0]->BeratInnerJadi, 2, '.', ',');
    $PanjangInnerPakai = number_format($dataCetak[0]->PanjangInnerPakai, 2, '.', ',');
    $LebarInnerPakai = number_format($dataCetak[0]->LebarInnerPakai, 2, '.', ',');
    $TebalInnerPakai = number_format($dataCetak[0]->TebalInnerPakai, 2, '.', ',');
    $BeratInnerPakai = number_format($dataCetak[0]->BeratInnerPakai, 2, '.', ',');
    $BenangJahitJadi = number_format($dataCetak[0]->BenangJahitJadi, 2, '.', ',');
    $BeratBenangJahitJadi = number_format($dataCetak[0]->BeratBenangJahitJadi, 2, '.', ',');
    $BenangJahitPakai = number_format($dataCetak[0]->BenangJahitPakai, 2, '.', ',');
    $BeratBenangJahitPakai = number_format($dataCetak[0]->BeratBenangJahitPakai, 2, '.', ',');
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
            <p>{{ $Lebar }} + {{ $Gusset }} X {{ $Panjang }} CM</p>
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
            <td>LAMI</td>
            <td class="text-center">{{ $LamiJadi }}</td>
            <td class="text-center">{{ $BeratLamiJadi }}</td>
            <td class="text-center">{{ $LamiPakai }}</td>
            <td class="text-center">{{ $BeratLamiPakai }}</td>
        </tr>
        <tr>
            <td>KERTAS</td>
            <td class="text-center">{{ $KertasJadiCM }} CM / {{ $KertasJadiGSM }} GSM</td>
            <td class="text-center">{{ $BeratKertasJadi }}</td>
            <td class="text-center">{{ $KertasPakaiCM }} CM / {{ $KertasPakaiGSM }} GSM
            </td>
            <td class="text-center">{{ $BeratKertasPakai }}</td>
        </tr>
        <tr>
            <td>CLOTH BAWAH</td>
            <td class="text-center">{{ $LebarClothBawahJadi }} X {{ $PanjangClothBawahJadi }}</td>
            <td class="text-center">{{ $BeratClothBawahJadi }}</td>
            <td class="text-center">{{ $LebarClothBawahPakai }} X {{ $PanjangClothBawahPakai }}</td>
            <td class="text-center">{{ $BeratClothBawahPakai }}</td>
        </tr>
        <tr>
            <td>LAMI BAWAH</td>
            <td class="text-center">{{ $LamiBawahJadi }}</td>
            <td class="text-center">{{ $BeratLamiBawahJadi }}</td>
            <td class="text-center">{{ $LamiBawahPakai }}</td>
            <td class="text-center">{{ $BeratLamiBawahPakai }}</td>
        </tr>
        <tr>
            <td>KERTAS BAWAH</td>
            <td class="text-center">{{ $LebarKertasBawahJadi }} X {{ $PanjangKertasBawahJadi }}</td>
            <td class="text-center">{{ $BeratKertasBawahJadi }}</td>
            <td class="text-center">{{ $LebarKertasBawahPakai }} X {{ $PanjangKertasBawahPakai }}</td>
            <td class="text-center">{{ $BeratKertasBawahPakai }}</td>
        </tr>
        <tr>
            <td>INNER</td>
            <td class="text-center">{{ $PanjangInnerJadi }} X {{ $LebarInnerJadi }}<br>Tebal {{ $TebalInnerJadi }}
                MIC</td>
            <td class="text-center">{{ $BeratInnerJadi }}</td>
            <td class="text-center">{{ $PanjangInnerPakai }} X {{ $LebarInnerPakai }}<br>Tebal {{ $TebalInnerPakai }}
                MIC</td>
            <td class="text-center">{{ $BeratInnerPakai }}</td>
        </tr>
        <tr>
            <td>BENANG JAHIT</td>
            <td class="text-center">{{ $BenangJahitJadi }}D</td>
            <td class="text-center">{{ $BeratBenangJahitJadi }}</td>
            <td class="text-center">{{ $BenangJahitPakai }}D</td>
            <td class="text-center">{{ $BeratBenangJahitPakai }}</td>
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
