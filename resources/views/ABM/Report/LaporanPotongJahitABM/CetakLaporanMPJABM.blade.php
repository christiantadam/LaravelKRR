@php
    use Carbon\Carbon;

    \Carbon\Carbon::setLocale('id');
    $tanggalCetak = Carbon::parse($data[0]->Tgl_Log)->translatedFormat('d F Y');
    // dd($tanggalCetak, $data);
@endphp

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Laporan MPJ {{ $tanggalCetak }}</title>
    <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
            -webkit-print-color-adjust: exact !important;
            color: #111;
        }

        h1 {
            text-align: center;
            font-size: 18px;
            margin: 6px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 16px;
        }

        th,
        td {
            border: 1px solid #666;
            padding: 2px;
            font-size: 10px;
            vertical-align: middle;
        }

        th {
            background: #efefef;
            text-align: left;
        }

        .right {
            text-align: right;
        }

        .center {
            text-align: center;
        }

        .section-title {
            background: #FDFFB6;
            text-align: center;
            padding: 6px;
            font-weight: bold;
            margin-top: 12px;
        }

        .section-th {
            background: #FDFFB6 !important;
        }

        .kolom-mesin {
            width: 1%;
        }

        .kolom-spec {
            width: 1%;
        }

        .kolom-noOK {
            width: 1%;
        }

        .kolom-order {
            width: 1%;
        }

        .kolom-duplicate {
            width: 13.8cm;
        }

        .no-border {
            background-color: white !important;
            border: none !important;
        }

        .table-pastel-0 {
            background-color: #F7BFD8;
        }

        /* Pink */
        .table-pastel-1 {
            background-color: #FFCCB6;
        }

        /* Coral */
        .table-pastel-2 {
            background-color: #B5EAD7;
        }

        /* Mint */
        .table-pastel-3 {
            background-color: #AECBFA;
        }

        /* Blue */
        .table-pastel-4 {
            background-color: #D1C4E9;
        }

        /* Lavender */
        .table-pastel-5 {
            background-color: #E0E0E0;
        }

        /* Soft Gray */

        @media print {
            @page {
                size: A4 landscape;
            }

            .section-laporan {
                page-break-inside: avoid;
                break-inside: avoid;
            }
        }
    </style>
</head>

<body>
    <div style="width: 28cm; overflow: overflow;">
        <h1>LAPORAN HARIAN MPJ TANGGAL {{ strtoupper($tanggalCetak) }}</h1>
        <div class="section-laporan">
            <table>
                <thead>
                    <tr>
                        <th rowspan="3" class="center kolom-mesin">MESIN</th>
                        <th rowspan="3" class="center kolom-spec">SPEC</th>
                        <th rowspan="3" class="center kolom-noOK">NO. OK</th>
                        <th rowspan="3" class="center kolom-order">ORDER</th>
                        <th colspan="5" class="center section-th">JAM KERJA</th>
                        <th colspan="5" class="center section-th">HASIL PRODUKSI</th>
                        <th colspan="8" class="center section-th">REKAP DETAIL AFALAN</th>
                    </tr>
                    <tr>
                        <th colspan="3" class="center">WAKTU (MENIT)</th>
                        <th rowspan="2" class="center">STD. WKT. (LBR/MNT)</th>
                        <th rowspan="2" class="center">REAL WKT. (LBR/MNT)</th>
                        <th colspan="2" class="center">HSL NET</th>
                        <th colspan="2" class="center">TTL AFAL</th>
                        <th rowspan="2" class="center">HSL KTR (LBR)</th>
                        <th colspan="2" class="center">AFALAN WA</th>
                        <th colspan="2"class="center">AFALAN WE</th>
                        <th colspan="2"class="center">AFALAN POTONG</th>
                        <th colspan="2"class="center">AFALAN CUTTER</th>
                    </tr>
                    <tr>
                        <th class="center">KERJA</th>
                        <th class="center">IST.</th>
                        <th class="center">GANG.</th>
                        <th class="center">KG</th>
                        <th class="center">LBR</th>
                        <th class="center">LBR</th>
                        <th class="center">%</th>
                        <th class="center">KG</th>
                        <th class="center">LBR</th>
                        <th class="center">KG</th>
                        <th class="center">LBR</th>
                        <th class="center">KG</th>
                        <th class="center">LBR</th>
                        <th class="center">KG</th>
                        <th class="center">LBR</th>
                    </tr>
                </thead>

                <tbody>
                    @php
                        $colors = [
                            'table-pastel-0',
                            'table-pastel-1',
                            'table-pastel-2',
                            'table-pastel-3',
                            'table-pastel-4',
                            'table-pastel-5',
                        ];
                    @endphp
                    @php
                        $grouped = collect($data)->groupBy('NamaMesin');
                    @endphp
                    @foreach ($grouped as $namaMesin => $rows)
                        @php
                            $colorClass = $colors[$loop->index % count($colors)];
                        @endphp
                        @foreach ($rows as $index => $item)
                            <tr class="{{ $colorClass }}">
                                @if ($index == 0)
                                    <td rowspan="{{ $rows->count() }}" style="white-space: nowrap;text-align: center">
                                        {{ $namaMesin }}
                                    </td>
                                @endif
                                <td>{{ $item->NamaBarang }}</td>
                                <td class="center">{{ $item->No_OK ?? '-' }}</td>
                                <td class="center">{{ number_format($item->Qty) }}</td>
                                <td class="center">{{ number_format($item->Jam_Kerja) }}</td>
                                <td class="center">{{ number_format($item->Jam_Istirahat) }}</td>
                                <td class="center">
                                    {{ number_format($item->Jam_Gangguan_Mesin + $item->Jam_Gangguan_Lain) }}
                                </td>
                                <td class="center">{{ number_format(1 / $item->Standard_Waktu, 2) }}</td>
                                <td class="center">{{ number_format($item->Kenyan_Waktu, 2) }}</td>
                                <td class="center">{{ number_format($item->BahanBaku_Kg, 2) }}</td>
                                <td class="center">{{ number_format($item->Hasil_Lembar) }}</td>
                                <td class="center">{{ number_format($item->Total_Afalan) }}</td>
                                <td class="center">{{ number_format($item->Total_Afalan_Persen, 2) }}</td>
                                <td class="center">{{ number_format($item->Hasil_Kotor) }}</td>
                                <td class="center">{{ number_format($item->AfalanWA_KG, 2) }}</td>
                                <td class="center">{{ number_format($item->AfalanWA_LBR) }}</td>
                                <td class="center">{{ number_format($item->AfalanWE_KG, 2) }}</td>
                                <td class="center">{{ number_format($item->AfalanWE_LBR) }}</td>
                                <td class="center">{{ number_format($item->AfalanPotong_KG, 2) }}</td>
                                <td class="center">{{ number_format($item->AfalanPotong_LBR) }}</td>
                                <td class="center">{{ number_format($item->AfalanCutter_KG, 2) }}</td>
                                <td class="center">{{ number_format($item->AfalanCutter_LBR) }}</td>
                            </tr>
                        @endforeach
                    @endforeach
                </tbody>
            </table>
        </div>

        <div class="section-laporan">
            <div class="section-title">KESIMPULAN LAPORAN</div>
            <table>
                <thead>
                    <tr>
                        <th rowspan="2" class="center kolom-mesin">MESIN</th>
                        <th rowspan="2" class="center kolom-spec">SPEC</th>
                        <th rowspan="2" class="center kolom-noOK">NO. OK</th>
                        <th rowspan="2" class="center kolom-order">ORDER</th>
                        <th rowspan="2" class="center">LOAD TIME (MNT)</th>
                        <th rowspan="2" class="center">OPERT. TIME (MNT)</th>
                        <th rowspan="2" class="center">OPERT. TIME RATIO (%)</th>
                        <th rowspan="2" class="center">OPERT. SPEED RATIO (%)</th>
                        <th rowspan="2" class="center">NET OPERATION RATIO (%)</th>
                        <th rowspan="2" class="center">PERFOR. EFF. (%)</th>
                        <th rowspan="2" class="center">RATE OF QUALITY PROD. (%)</th>
                        <th rowspan="2" class="center">OVERALL EQUIPMENT EFFECTIVENESS (%)</th>
                    </tr>
                </thead>
                <tbody>
                    @php
                        $grouped = collect($data)->groupBy('NamaMesin');
                    @endphp
                    @foreach ($grouped as $namaMesin => $rows)
                        @php
                            $colorClass = $colors[$loop->index % count($colors)];
                        @endphp
                        @foreach ($rows as $index => $item)
                            <tr class="{{ $colorClass }}">
                                @if ($index == 0)
                                    <td rowspan="{{ $rows->count() }}"
                                        style="white-space: nowrap;text-align: center">
                                        {{ $namaMesin }}
                                    </td>
                                @endif
                                <td>{{ $item->NamaBarang }}</td>
                                <td class="center">{{ $item->No_OK ?? '-' }}</td>
                                <td class="center">{{ number_format($item->Qty) }}</td>
                                <td class="center">{{ number_format($item->Load_Time) }}</td>
                                <td class="center">{{ number_format($item->Opert_Time) }}</td>
                                <td class="center">{{ number_format($item->Opert_Time_Ratio, 2) }}</td>
                                <td class="center">{{ number_format($item->Opert_Speed_Ratio, 2) }}</td>
                                <td class="center">{{ number_format($item->Net_Operation_Ratio, 2) }}</td>
                                <td class="center">{{ number_format($item->Perfor_Eff, 2) }}</td>
                                <td class="center">{{ number_format($item->Rate_Of_Quality_Prod, 2) }}</td>
                                <td class="center">{{ number_format($item->Overall_Equipment_Effectiveness, 2) }}</td>
                            </tr>
                        @endforeach
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</body>
