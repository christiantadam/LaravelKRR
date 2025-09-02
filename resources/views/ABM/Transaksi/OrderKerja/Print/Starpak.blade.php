{{-- <table border="1" cellpadding="5" cellspacing="0">
    <thead>
        <tr>
            @if (isset($dataDetailOrderKerja[0]))
                @foreach (array_keys((array) $dataDetailOrderKerja[0]) as $key)
                    <th>{{ ucfirst($key) }}</th>
                @endforeach
            @endif
        </tr>
    </thead>
    <tbody>
        @foreach ($dataDetailOrderKerja as $item)
            <tr>
                @foreach ((array) $item as $value)
                    <td>{{ $value }}</td>
                @endforeach
            </tr>
        @endforeach
    </tbody>
</table> --}}

{{-- catatan settingan print: A4, landscape, margin:default, scale:default --}}
<link href="{{ asset('css/app.css') }}" rel="stylesheet">
<style>
    label {
        margin-bottom: 0 !important
    }

    table {
        border-collapse: collapse;
        width: 100%;
    }

    table,
    th,
    td {
        border: 1px solid black;
    }

    th,
    td {
        text-align: center;
        font-weight: normal;
        /* no bold */
        font-size: 12px;
        /* smaller font */
    }

    /* Set empty row height */
    td {
        height: 0.9cm;
    }

    #tableTTD td {
        height: 2cm;
    }

    #tableTTD th,
    #tableTTD td {
        width: 25%;
    }

    @media print {
        @page {
            size: A4 landscape !important;
        }

        #printArea {
            margin: 0;
        }

        #catatanPrint {
            display: none;
        }
    }
</style>
@php
    // dd($dataDetailOrderKerja);
    $jumlahWarna = explode(' | ', $dataDetailOrderKerja[0]->WarnaPrinting)[0] ?? 0;
    $jumlahWarnaPatchAtas = explode(' | ', $dataDetailOrderKerja[0]->WarnaPrintingPatchAtas)[0] ?? 0;
    $jumlahWarnaPatchBawah = explode(' | ', $dataDetailOrderKerja[0]->WarnaPrintingPatchBawah)[0] ?? 0;
@endphp
<div class="m-2" style="width: 99%; height: 19cm; border: 1px solid black;" id="printArea" contenteditable="true">
    <div class="d-flex" style="width: 100%; font-size: smaller; line-height: 1.25; border-bottom: 1px solid black;">
        <div class="d-flex flex-column"
            style="flex: 0.5; border-right: 1px solid black; align-items: center; align-content: center;">
            <div style="flex: 0.3">
                <label>PT. Kerta Rajasa Raya</label>
            </div>
            <div style="flex: 0.3">
                <label>Woven Bag . Jumbo Bag . Cement Bag Industrial</label>
            </div>
            <div style="flex: 0.3">
                <label>(FM-7,5-02-WB-01-02)</label>
            </div>
        </div>
        <div class="d-flex flex-column" style="flex: 0.15;">
            <div class="pl-1" style="flex: 0.5; align-content: center; border-bottom: 1px solid black;">
                <label>No. Referensi </label>
            </div>
            <div class="pl-1" style="flex: 0.5; align-content: center;">
                <label>Tgl. Berlaku </label>
            </div>
        </div>
        <div class="d-flex flex-column" style="flex: 0.001;">
            <div style="flex: 0.5; align-content: center; border-bottom: 1px solid black;">
                <label>:</label>
            </div>
            <div style="flex: 0.5; align-content: center;">
                <label>:</label>
            </div>
        </div>
        <div class="d-flex flex-column" style="flex: 0.199; border-right: 1px solid black;">
            <div class="pl-1" style="flex: 0.5; align-content: center; border-bottom: 1px solid black;">
                <label id="title_noReferensi">{{ $dataDetailOrderKerja[0]->No_OK }}</label>
            </div>
            <div class="pl-1" style="flex: 0.5; align-content: center;">
                <label
                    id="title_tglBerlaku">{{ $dataDetailOrderKerja[0]->TanggalInput ? \Carbon\Carbon::parse($dataDetailOrderKerja[0]->TanggalInput)->format('d-m-Y') : '' }}
                </label>
            </div>
        </div>
        <div class="d-flex flex-column" style="flex: 0.15;">
            <div style="flex: 0.3; text-align: center; border-bottom: 1px solid black;">
                <label>Order Kerja ABM</label>
            </div>
            <div style="flex: 0.7; align-content: end; text-align: center;">
                <label class="m-0">LOKAL / EXPORT</label>
            </div>
        </div>
    </div>

    <div class="d-flex p-3" style="width: 100%; height: calc(100% - 40px);font-size: 10px;">
        <div class="d-flex" style="width: 100%; height: 100%; border: 1px solid black;">
            <div class="d-flex flex-column p-2" style="flex: 0.3;">
                <div class="d-flex" style="flex: 0.95">
                    @php
                        // untuk enter-enter
                        $rollValue = $dataDetailOrderKerja[0]->RollStarpak ?? '-';
                        $isLongRoll = strlen($rollValue) > 45;
                        $rollChunks = $isLongRoll ? ($rollChunks = splitByWord($rollValue, 45)) : [$rollValue];

                        $rollPatchAtasValue = $dataDetailOrderKerja[0]->RollPatchAtas ?? '-';
                        $isLongRollPatchAtas = strlen($rollPatchAtasValue) > 45;
                        $rollPatchAtasChunks = $isLongRollPatchAtas
                            ? ($rollPatchAtasChunks = splitByWord($rollPatchAtasValue, 45))
                            : [$rollPatchAtasValue];

                        $rollPatchBawahValue = $dataDetailOrderKerja[0]->RollPatchBawah ?? '-';
                        $isLongRollPatchBawah = strlen($rollPatchBawahValue) > 45;
                        $rollPatchBawahChunks = $isLongRollPatchBawah
                            ? ($rollPatchBawahChunks = splitByWord($rollPatchBawahValue, 45))
                            : [$rollPatchBawahValue];

                        $corakPrintingValue = $dataDetailOrderKerja[0]->CorakPrinting ?? '-';
                        $isLongCorak = strlen($corakPrintingValue) > 45;
                        $corakChunks = $isLongCorak
                            ? ($corakChunks = splitByWord($corakPrintingValue, 45))
                            : [$corakPrintingValue];

                        // untuk cek apakah patch atas-bawah sama
                        $topAndBottomPatchIsEqual = true;

                        $RollPatchBawah = $dataDetailOrderKerja[0]->RollPatchBawah;
                        $DrumKliseStarpakPatchBawah = $dataDetailOrderKerja[0]->DrumKliseStarpakPatchBawah;
                        $CorakPrintingPatchBawah = $dataDetailOrderKerja[0]->CorakPrintingPatchBawah;
                        $WarnaPrintingPatchBawah = $dataDetailOrderKerja[0]->WarnaPrintingPatchBawah;
                        $JumlahPatchBawah = $dataDetailOrderKerja[0]->JumlahPatchBawah;

                        $RollPatchAtas = $dataDetailOrderKerja[0]->RollPatchAtas;
                        $DrumKliseStarpakPatchAtas = $dataDetailOrderKerja[0]->DrumKliseStarpakPatchAtas;
                        $CorakPrintingPatchAtas = $dataDetailOrderKerja[0]->CorakPrintingPatchAtas;
                        $WarnaPrintingPatchAtas = $dataDetailOrderKerja[0]->WarnaPrintingPatchAtas;
                        $JumlahPatchAtas = $dataDetailOrderKerja[0]->JumlahPatchAtas ?? 0;
                        if (
                            !is_null($RollPatchBawah) &&
                            !is_null($RollPatchAtas) &&
                            !is_null($DrumKliseStarpakPatchBawah) &&
                            !is_null($DrumKliseStarpakPatchAtas) &&
                            !is_null($CorakPrintingPatchBawah) &&
                            !is_null($CorakPrintingPatchAtas) &&
                            !is_null($WarnaPrintingPatchBawah) &&
                            !is_null($WarnaPrintingPatchAtas) &&
                            !is_null($JumlahPatchBawah) &&
                            !is_null($JumlahPatchAtas)
                        ) {
                            if (
                                $RollPatchBawah !== $RollPatchAtas ||
                                $DrumKliseStarpakPatchBawah !== $DrumKliseStarpakPatchAtas ||
                                $CorakPrintingPatchBawah !== $CorakPrintingPatchAtas ||
                                $WarnaPrintingPatchBawah !== $WarnaPrintingPatchAtas ||
                                $JumlahPatchBawah !== $JumlahPatchAtas
                            ) {
                                $topAndBottomPatchIsEqual = false;
                            }
                        }
                    @endphp
                    <div style="flex:0.38; white-space: nowrap;">
                        <label>NO. ORDER KERJA</label><br>
                        <label>UKURAN</label><br>
                        <label>RAJUTAN</label><br>
                        <label>DENIER</label><br>
                        <label style="font-weight: 800">ROLL BODY</label><br>
                        <label>ROLL</label><br>
                        @if ($isLongRoll)
                            <br>
                        @endif
                        <label>KERTAS</label><br>
                        <label>INNER</label><br>
                        <label>SPOON BOND</label><br>
                        <label>DRUM KLISE</label><br>
                        <label>PANJANG POTONGAN</label><br>
                        <label>CORAK PRINTING</label><br>
                        @if ($isLongCorak)
                            <br>
                        @endif
                        @for ($i = 0; $i < $jumlahWarna; $i++)
                            <label>WARNA PRINT {{ $i + 1 }}</label><br>
                        @endfor
                        <label>CORONA</label><br>
                        <label>JUMLAH</label><br>
                        <label>PRINT MAX</label><br>
                        <label>SP. NO.</label><br>
                        <label>NAMA CUSTOMER</label><br>
                        @if ($topAndBottomPatchIsEqual)
                            <label style="font-weight: 800">ROLL PATCH (TOP COVER & BOTTOM COVER)</label><br>
                            <label>ROLL</label><br>
                            @if ($isLongRollPatchAtas)
                                <br>
                            @endif
                            <label>DRUM KLISE</label><br>
                            <label>CORAK PRINTING</label><br>
                            @for ($i = 0; $i < $jumlahWarnaPatchAtas; $i++)
                                <label>WARNA PRINT {{ $i + 1 }}</label><br>
                            @endfor
                            <label>JUMLAH</label><br>
                            <label>KB PRT PATCH ATAS</label><br>
                            <label>KB PRT PATCH BAWAH</label><br>
                            <label>CORONA</label><br>
                        @else
                            <label style="font-weight: 800">ROLL PATCH (TOP COVER)</label><br>
                            <label>ROLL</label><br>
                            @if ($isLongRollPatchAtas)
                                <br>
                            @endif
                            <label>DRUM KLISE</label><br>
                            <label>CORAK PRINTING</label><br>
                            @for ($i = 0; $i < $jumlahWarnaPatchAtas; $i++)
                                <label>WARNA PRINT {{ $i + 1 }}</label><br>
                            @endfor
                            <label>JUMLAH</label><br>
                            <label>KB PRT PATCH ATAS</label><br>
                            <label>CORONA</label><br>
                            <label style="font-weight: 800">ROLL PATCH (BOTTOM COVER)</label><br>
                            <label>ROLL</label><br>
                            @if ($isLongRollPatchBawah)
                                <br>
                            @endif
                            <label>DRUM KLISE</label><br>
                            <label>CORAK PRINTING</label><br>
                            @for ($i = 0; $i < $jumlahWarnaPatchBawah; $i++)
                                <label>WARNA PRINT {{ $i + 1 }}</label><br>
                            @endfor
                            <label>JUMLAH</label><br>
                            <label>KB PRT PATCH BAWAH</label><br>
                            <label>CORONA</label><br>
                        @endif

                    </div>
                    <div style="flex: 0.001">
                        <label>:</label><br>
                        <label>:</label><br>
                        <label>:</label><br>
                        <label>:</label><br><br>
                        <label>:</label><br>
                        @if ($isLongRoll)
                            <br>
                        @endif
                        <label>:</label><br>
                        <label>:</label><br>
                        <label>:</label><br>
                        <label>:</label><br>
                        <label>:</label><br>
                        <label>:</label><br>
                        @if ($isLongCorak)
                            <br>
                        @endif
                        @for ($i = 0; $i < $jumlahWarna; $i++)
                            <label>:</label><br>
                        @endfor
                        <label>:</label><br>
                        <label>:</label><br>
                        <label>:</label><br>
                        <label>:</label><br>
                        <label>:</label><br>
                        <br>
                        @if ($topAndBottomPatchIsEqual)
                            <label>:</label><br>
                            @if ($isLongRollPatchAtas)
                                <br>
                            @endif
                            <label>:</label><br>
                            <label>:</label><br>
                            @for ($i = 0; $i < $jumlahWarnaPatchAtas; $i++)
                                <label>:</label><br>
                            @endfor
                            <label>:</label><br>
                            <label>:</label><br>
                            <label>:</label><br>
                            <label>:</label><br>
                        @else
                            <label>:</label><br>
                            @if ($isLongRollPatchAtas)
                                <br>
                            @endif
                            <label>:</label><br>
                            <label>:</label><br>
                            @for ($i = 0; $i < $jumlahWarnaPatchAtas; $i++)
                                <label>:</label><br>
                            @endfor
                            <label>:</label><br>
                            <label>:</label><br>
                            <label>:</label><br>
                            <br>
                            <label>:</label><br>
                            @if ($isLongRollPatchBawah)
                                <br>
                            @endif
                            <label>:</label><br>
                            <label>:</label><br>
                            @for ($i = 0; $i < $jumlahWarnaPatchBawah; $i++)
                                <label>:</label><br>
                            @endfor
                            <label>:</label><br>
                            <label>:</label><br>
                            <label>:</label><br>
                        @endif
                    </div>
                    <div class="pl-2" style="flex: 0.619;white-space: nowrap;">
                        <label>{{ $dataDetailOrderKerja[0]->No_OK }}</label><br>
                        <label>{{ $dataDetailOrderKerja[0]->Ukuran ?? '-' }} CM</label><br>
                        <label>{{ $dataDetailOrderKerja[0]->Rajutan ?? '-' }}</label><br>
                        <label>{{ $dataDetailOrderKerja[0]->Denier ?? 0 }}</label><br><br>
                        <label>
                            @foreach ($rollChunks as $chunk)
                                {{ $chunk }}<br>
                            @endforeach
                        </label><br>
                        <label>{{ $dataDetailOrderKerja[0]->KertasStarpak ?? '-' }}</label><br>
                        <label>{{ $dataDetailOrderKerja[0]->InnerStarpak ?? '-' }}</label><br>
                        <label>{{ $dataDetailOrderKerja[0]->SpoonBondStarpak ?? '-' }}</label><br>
                        <label>{{ $dataDetailOrderKerja[0]->DrumKliseStarpak ?? 0 }} CM</label><br>
                        <label>{{ $dataDetailOrderKerja[0]->PanjangPotongStarpak ?? 0 }} CM</label><br>
                        <label>
                            @foreach ($corakChunks as $chunk)
                                {{ $chunk }}<br>
                            @endforeach
                        </label><br>
                        @for ($i = 0; $i < $jumlahWarna; $i++)
                            <label>{{ explode(' | ', $dataDetailOrderKerja[0]->WarnaPrinting)[$i + 1] }}</label><br>
                        @endfor
                        <label>{{ number_format($dataDetailOrderKerja[0]->CoronaStarpak ?? 0, 2, '.', ',') ?? 0 }}</label><br>
                        <label>{{ number_format($dataDetailOrderKerja[0]->Qty ?? 0, 2, '.', ',') ?? 0 }} &nbsp;
                            {{ $dataDetailOrderKerja[0]->Satuan ?? ' - ' }}
                        </label><br>
                        <label>{{ number_format($dataDetailOrderKerja[0]->PrintMaxStarpak ?? 0, 2, '.', ',') ?? 0 }}</label><br>
                        <label>{{ $dataDetailOrderKerja[0]->IDSuratPesanan }}</label><br>
                        <label>{{ $dataDetailOrderKerja[0]->NamaCust }}</label><br>
                        <br>
                        @if ($topAndBottomPatchIsEqual)
                            <label>
                                @foreach ($rollPatchAtasChunks as $chunk)
                                    {{ $chunk }}<br>
                                @endforeach
                            </label><br>
                            <label>{{ $dataDetailOrderKerja[0]->DrumKliseStarpakPatchAtas ?? '-' }}</label><br>
                            <label>{{ $dataDetailOrderKerja[0]->CorakPrintingPatchAtas ?? '-' }}</label><br>
                            @for ($i = 0; $i < $jumlahWarnaPatchAtas; $i++)
                                <label>{{ explode(' | ', $dataDetailOrderKerja[0]->WarnaPrintingPatchAtas)[$i + 1] }}</label><br>
                            @endfor
                            <label>{{ $dataDetailOrderKerja[0]->JumlahPatchAtas + $dataDetailOrderKerja[0]->JumlahPatchBawah ?? 0 }}</label><br>
                            <label>{{ $dataDetailOrderKerja[0]->KBPrintingStarpakPatchAtas ?? '-' }}</label><br>
                            <label>{{ $dataDetailOrderKerja[0]->KBPrintingStarpakPatchBawah ?? '-' }}</label><br>
                            <label>{{ $dataDetailOrderKerja[0]->CoronaPatchAtas ?? 0 }}</label>
                        @else
                            <label>
                                @foreach ($rollPatchAtasChunks as $chunk)
                                    {{ $chunk }}<br>
                                @endforeach
                            </label><br>
                            <label>{{ $dataDetailOrderKerja[0]->DrumKliseStarpakPatchAtas ?? '-' }}</label><br>
                            <label>{{ $dataDetailOrderKerja[0]->CorakPrintingPatchAtas ?? '-' }}</label><br>
                            @for ($i = 0; $i < $jumlahWarnaPatchAtas; $i++)
                                <label>{{ explode(' | ', $dataDetailOrderKerja[0]->WarnaPrintingPatchAtas)[$i + 1] }}</label><br>
                            @endfor
                            <label>{{ $dataDetailOrderKerja[0]->JumlahPatchAtas ?? 0 }}</label><br>
                            <label>{{ $dataDetailOrderKerja[0]->KBPrintingStarpakPatchAtas ?? '-' }}</label><br>
                            <label>{{ $dataDetailOrderKerja[0]->CoronaPatchAtas ?? 0 }}</label><br>
                            <br>
                            <label>
                                @foreach ($rollPatchBawahChunks as $chunk)
                                    {{ $chunk }}<br>
                                @endforeach
                            </label><br>
                            <label>{{ $dataDetailOrderKerja[0]->DrumKliseStarpakPatchBawah ?? '-' }}</label><br>
                            <label>{{ $dataDetailOrderKerja[0]->CorakPrintingPatchBawah ?? '-' }}</label><br>
                            @for ($i = 0; $i < $jumlahWarnaPatchBawah; $i++)
                                <label>{{ explode(' | ', $dataDetailOrderKerja[0]->WarnaPrintingPatchBawah)[$i + 1] }}</label><br>
                            @endfor
                            <label>{{ $dataDetailOrderKerja[0]->JumlahPatchBawah ?? 0 }}</label><br>
                            <label>{{ $dataDetailOrderKerja[0]->KBPrintingStarpakPatchBawah ?? '-' }}</label><br>
                            <label>{{ $dataDetailOrderKerja[0]->CoronaPatchBawah ?? 0 }}</label>
                        @endif
                    </div>
                </div>
                <div id="div_airPermeability"
                    style="flex: 0.05;
                            text-align: center;
                            background-color: red;
                            font-weight: bolder;
                            font-size: medium;
                            margin-right: 20%;
                            margin-left: 20%;
                            -webkit-print-color-adjust: exact;
                            print-color-adjust: exact;">
                    <label>AP STARKON {{ $dataDetailOrderKerja[0]->AirPermeabilityStarpak ?? 0 }} Nm³/h</label>
                </div>
            </div>
            <div class="d-flex flex-column p-2" style="flex: 0.35;">
                <table>
                    <tr>
                        <th>TGL</th>
                        <th>SHIFT</th>
                        <th>SELESAI</th>
                        <th>SALDO</th>
                    </tr>
                    @for ($i = 0; $i < 14; $i++)
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    @endfor
                </table>
                @if ($dataDetailOrderKerja[0]->SisaSaldoInventory > 0)
                    <div style="position: relative; height: 0;">
                        <label id="label_saldoSisa" style="position: absolute; top: -12.3cm; left: 0.1cm;">
                            Saldo Sisa
                            {{ number_format($dataDetailOrderKerja[0]->SisaSaldoInventory ?? 0, 0, '.', ',') ?? 0 }}
                            {{ $dataDetailOrderKerja[0]->Satuan }}
                        </label>
                    </div>
                @endif
            </div>
            <div class="d-flex flex-column p-2" style="flex: 0.35; gap: 5px;">
                <table>
                    <tr>
                        <th>TGL</th>
                        <th>SHIFT</th>
                        <th>SELESAI</th>
                        <th>SALDO</th>
                    </tr>
                    @for ($i = 0; $i < 14; $i++)
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    @endfor
                </table>

                <table id="tableTTD">
                    <tr>
                        <th>PEMBUAT</th>
                        <th>MANAGER</th>
                        <th>MANAGER QC</th>
                        <th>WB</th>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</div>

<div class="p-2" id="catatanPrint" style="color: red; font-weight: bold;">
    <label>Saat print harap pastikan sudah sesuai dengan settingan berikut: </label>
    <br>
    <label>-Margin: Minimal</label>
    <br>
    <label>-Scale: Default</label>
    <br>
    <label>-Paper Size: A4</label>
</div>
