<!DOCTYPE html>
<html>
<script>
    window.print()
</script>

<head>
    <meta charset="utf-8">

    <style>
        body {
            font-family: Helvetica, Arial, sans-serif;
            font-size: 13px;
            color: #000;
            padding: 19% 4% 0 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        td {
            padding: 2px 4px;
            vertical-align: top;
        }

        .box {
            border: 1.5px solid #000;
            padding: 12px;
        }

        .right {
            text-align: right;
        }

        .center {
            text-align: center;
        }

        .left {
            text-align: left;
        }


        table.po_table thead th {
            border-bottom: 1px solid #000;
            vertical-align: bottom;
            padding: 0 5px 0 5px;
            line-height: 2;
            font-size: 12px;
            white-space: nowrap;
        }

        table.po_table td {
            vertical-align: top;
            font-size: 12px;
        }

        table.po_table tbody tr:last-child td {
            border-bottom: 1px solid #000;
        }

        .th_sub {
            display: block;
            font-weight: normal;
            margin-top: 2px;
        }

        .signature_box {
            height: 55px;
            text-align: center;
        }

        .signature_img {
            max-height: 90px;
        }
    </style>


</head>

<body>

    <table>
        <tr>
            <td width="50%">
                <label style="line-height: 2;"><b>Issued To:</b></label><br>
                <label>{{ $header->NM_SUP ?? '-' }}</label><br>
                <label>{{ $header->ALAMAT1 ?? '-' }}</label><br>
                <label>{{ $header->KOTA1 ?? '-' }}</label><br>
                <label>{{ $header->NEGARA1 ?? '-' }}</label><br>
                <br><br>

                <b>Delivery To:</b><br>
                PT. Kerta Rajasa Raya<br>
                Jl. Raya Tropodo No. 1<br>
                Waru - Sidoarjo 61256 East Java, Indonesia
            </td>
            <td width="50%">
                <table>
                    <tr>
                        <td><b>Number</b></td>
                        <td>: {{ $header->NO_PO }}</td>
                    </tr>
                    <tr>
                        <td><b>Date</b></td>
                        <td>:
                            {{ $header->Tgl_sppb ? \Carbon\Carbon::parse($header->Tgl_sppb)->format('d M Y') : '-' }}
                        </td>
                    <tr>
                        <td><b>Delivery Date</b></td>
                        <td>:
                            {{ $header->Est_Date ? \Carbon\Carbon::parse($header->Est_Date)->format('d M Y') : '-' }}
                        </td>
                    </tr>
                    <tr>
                        <td><b>Payment Term</b></td>
                        <td>: {{ $header->Pembayaran ?? '-' }}</td>
                    </tr>
                    <tr>
                        <td><b>Divisi</b></td>
                        <td>: {{ $header->Kd_div }} - {{ $header->NM_DIV }}</td>
                    </tr>
                    <tr>
                        <td><b>Requester</b></td>
                        <td>: {{ $header->Nama }}</td>
                    </tr>
                    <tr>
                        <td><b>Page</b></td>
                        <td>: Page 1 of 1</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

    <br>


    <table class="po_table">
        <colgroup>
            <col style="width:2%">
            <col style="width:10%">
            <col style="width:46%">
            <col style="width:6%">
            <col style="width:6%">
            <col style="width:10%">
            <col style="width:7%">
            <col style="width:14%">
        </colgroup>

        <thead>
            <tr>
                <th>No.</th>
                <th>Item Number</th>
                <th>Description</th>
                <th>Qty</th>
                <th>Unit</th>
                <th>Unit Price {{ $header->Id_MataUang_BC ?? 'IDR' }}</th>
                <th>Disc. {{ $header->Id_MataUang_BC ?? 'IDR' }}</th>
                <th>Amount {{ $header->Id_MataUang_BC ?? 'IDR' }}</th>
            </tr>
        </thead>

        <tbody>
            @foreach ($items as $i => $row)
                <tr>
                    <td>{{ $i + 1 }}</td>
                    <td class="center">{{ $row->Kd_brg }}</td>
                    <td>
                        <div>{{ $row->NAMA_BRG }}</div>
                        <div>{{ $row->keterangan ?? '-' }}</div>
                        <div>{{ $row->nama_kategori ?? '-' }}</div>
                        <div>{{ $row->nama_sub_kategori ?? '-' }}</div>
                        <div>{{ $row->No_trans }}</div>
                    </td>
                    <td class="center">{{ number_format($row->Qty, 2) }}</td>
                    <td class="center">{{ $row->Nama_satuan }}</td>
                    <td class="center">{{ number_format($row->PriceUnit, 2) }}</td>
                    <td class="center">
                        {{ number_format($row->harga_disc ?? 0, 2) }}
                        <div>
                            ({{ number_format($row->disc ?? 0, 2) }}%)
                        </div>
                    </td>
                    <td class="right">{{ number_format($row->PriceSub, 2) }}</td>
                </tr>
            @endforeach
        </tbody>

    </table>


    <table style="font-size: 12px;">
        <tr>
            <td width="60%" style="vertical-align: bottom;">
                <b>Document Copy of {{ $items[0]->JumCetak ?? 1 }}</b>
            </td>
            <td width="40%">
                <table>
                    <tr>
                        <td><b>Sub Total</b></td>
                        <td class="right" style="border-bottom: 1px solid black">
                            {{ number_format($sumAmount, 2) }}</td>
                    </tr>
                    <tr>
                        <td><b>DPP Nilai Lain</b></td>
                        <td class="right" style=";border-bottom: 1px solid black">
                            {{ number_format($dpp, 2) }}</td>
                    </tr>
                    <tr>
                        <td><b>VAT</b></td>
                        <td class="right" style=";border-bottom: 1px solid black">
                            {{ number_format($ppn, 2) }}</td>
                    </tr>
                    <tr>
                        <td><b>Total</b></td>
                        <td class="right" style=";border-bottom: 1px solid black">
                            {{ number_format($total, 2) }}</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    @if ($header->StatusBeli == 1)
        {{-- @if (!empty($ttdBase64_2))
            @if (!empty($ttdBase64_1))
                <div style="position: absolute;top: 23.2cm;left: 0.8cm;display: grid;place-items: center;">
                    <img src="{{ $ttdBase64_1 }}" class="signature_img" style="padding-right: 20px">
                </div>
                <div style="position: absolute;top: 25.7cm;left: 0.5cm;display: grid;place-items: center;">
                    <label style="font-size: 10px;">{{ $header->NamaDirektur }}</label>
                </div>
            @endif
            @if (!empty($ttdBase64_2))
                <div style="position: absolute;top: 23.2cm;left: 4cm;display: grid;place-items: center;">
                    <img src="{{ $ttdBase64_2 }}" class="signature_img">
                </div>
                <div style="position: absolute;top: 25.7cm;left: 3.7cm;display: grid;place-items: center;">
                    <label style="font-size: 10px;">{{ $header->NamaDirektur2 }}</label>
                </div>
            @endif
        @else
            <div style="position: absolute;top: 23.2cm;left: 0.8cm;display: grid;place-items: center;">
                <img src="{{ $ttdBase64_1 }}" class="signature_img">
            </div>
            <div style="position: absolute;top: 25.7cm;left: 0.5cm;display: grid;place-items: center;">
                <label style="font-size: 10px;">{{ $header->NamaDirektur }}</label>
            </div>
        @endif --}}

        @if (!empty($ttdBase64_1))
            <div style="position: absolute;top: 23.2cm;left: 0.8cm;display: grid;place-items: center;">
                <img src="{{ $ttdBase64_1 }}" class="signature_img" style="padding-right: 20px">
            </div>
            <div style="position: absolute;top: 25.7cm;left: 0.5cm;display: grid;place-items: center;">
                <label style="font-size: 10px;">{{ $header->NamaDirektur }}</label>
            </div>
        @endif
        @if (!empty($ttdBase64_2))
            <div style="position: absolute;top: 23.2cm;left: 4cm;display: grid;place-items: center;">
                <img src="{{ $ttdBase64_2 }}" class="signature_img">
            </div>
            <div style="position: absolute;top: 25.7cm;left: 3.7cm;display: grid;place-items: center;">
                <label style="font-size: 10px;">{{ $header->NamaDirektur2 }}</label>
            </div>
        @endif
        @if (!empty($ttdBase64_3))
            <div style="position: absolute;top: 23.2cm;left: 7.8cm;display: grid;place-items: center;">
                <img src="{{ $ttdBase64_3 }}" class="signature_img" style="padding-right: 20px">
            </div>
            <div style="position: absolute;top: 25.7cm;left: 7.5cm;display: grid;place-items: center;">
                <label style="font-size: 10px;">{{ $header->NamaManager }}</label>
            </div>
        @endif
        @if (!empty($ttdBase64_4))
            <div style="position: absolute;top: 23.2cm;left: 14.8cm;display: grid;place-items: center;">
                <img src="{{ $ttdBase64_4 }}" class="signature_img" style="padding-right: 20px">
            </div>
            <div style="position: absolute;top: 25.7cm;left: 14.5cm;display: grid;place-items: center;">
                <label style="font-size: 10px;">{{ $header->NamaUser }}</label>
            </div>
        @endif
    @endif
</body>

</html>
