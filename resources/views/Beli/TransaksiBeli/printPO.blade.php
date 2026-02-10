<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">

   <style>
        body {
            font-family: Helvetica, Arial, sans-serif;
            font-size: 14px;
            color: #000;
            padding-right: 900px;
            padding-top: 150px;
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

        .right { text-align: right; }
        .center { text-align: center; }
        .left { text-align: left;}


        table.po_table thead th {
            border-bottom: 1px solid #000;
            vertical-align: bottom;
            line-height: 1.15;
        }

        table.po_table td {
            vertical-align: top;
            line-height: 1.35;
        }

        table.po_table tbody tr:last-child td {
            border-bottom: 1px solid #000;
        }

        .th_sub {
            display: block;
            font-size: 10px;
            font-weight: normal;
            margin-top: 2px;
        }

        .signature_box {
            height: 50px;
            text-align: center;
        }

        .signature_img {
            max-height: 55px;
            max-width: 100%;
        }
    </style>


</head>

<body>

<table>
    <tr>
        <td width="50%">
            <b>Issued To:</b><br>
            {{ $header->NM_SUP ?? '-'}}<br>
            {{ $header->ALAMAT1 ?? '-' }}<br>
            {{ $header->KOTA1 ?? '-'}}<br>
            {{ $header->NEGARA1 ?? '-'}}<br><br>

            <b>Delivery To:</b><br>
            PT. Kerta Rajasa Raya<br>
            Jl. Raya Tropodo No. 1<br>
            Waru - Sidoarjo 61256 East Java, Indonesia
        </td>
        <td width="50%">
            <table>
                <tr><td><b>Number</b></td><td>: {{ $header->NO_PO }}</td></tr>
                <tr><td><b>Date</b></td>
                    <td>: {{ $header->Tgl_sppb
                        ? \Carbon\Carbon::parse($header->Tgl_sppb)->format('d M Y')
                        : '-' }}</td>
                <tr>
                    <td><b>Delivery Date</b></td>
                    <td>: {{ $header->Est_Date
                        ? \Carbon\Carbon::parse($header->Est_Date)->format('d M Y')
                        : '-' }}</td>
                </tr>
                <tr>
                    <td><b>Payment Term</b></td>
                    <td>: {{ $header->Pembayaran ?? '-' }}</td>
                </tr>
                <tr><td><b>Divisi</b></td><td>: {{ $header->Kd_div }} - {{ $header->NM_DIV }}</td></tr>
                <tr><td><b>Requester</b></td><td>: {{ $header->Nama }}</td></tr>
                <tr><td><b>Page</b></td><td>: Page 1 of 1</td></tr>
            </table>
        </td>
    </tr>
</table>

<br>


<!-- Tabel -->
<table class="po_table">
    <colgroup>
        <col style="width:6mm">
        <col style="width:10%">
        <col style="width:47%">
        <col style="width:6%">
        <col style="width:6%">
        <col style="width:10%">
        <col style="width:7%">
        <col style="width:14%">
    </colgroup>

    <thead>
        <tr>
            <th>No.</th>
            <th style="padding-left: 20px;">Item Number</th>
            <th class="center" style="padding-left: 10px;">Description</th>
            <th class="center">Qty</th>
            <th>Unit</th>
            <th class="center">Unit Price<span class="th_sub">{{ $header->Nama_MataUang ?? 'IDR' }}</span></th>
            <th class="center">Disc.<span class="th_sub">{{ $header->Nama_MataUang ?? 'IDR' }}</span></th>
            <th class="center">Amount<span class="th_sub">{{ $header->Nama_MataUang ?? 'IDR' }}</span></th>
        </tr>
    </thead>

    <tbody>
        @foreach($items as $i => $row)
        <tr>
            <td class="center">{{ $i + 1 }}</td>
            <td class="center" style="padding-left: 20px;">{{ $row->Kd_brg }}</td>
            <td style="padding-left: 40px;">
                <div style="font-weight:bold;">{{ $row->NAMA_BRG }}</div>
                <div style="font-size: 11px">{{ $row->keterangan ?? '-' }}</div>
                <div style="font-size: 11px">{{ $row->nama_kategori ?? '-' }}</div>
                <div style="font-size: 11px">{{ $row->nama_sub_kategori ?? '-' }}</div>
                <div>{{ $row->No_trans }}</div>
            </td>
            <td class="center">{{ number_format($row->Qty,2) }}</td>
            <td class="center">{{ $row->Nama_satuan }}</td>
            <td class="center">{{ number_format($row->PriceUnit,2) }}</td>
            <td class="center">
                {{ number_format($row->harga_disc ?? 0, 2) }}
                <div style="font-size:13px;">
                    ({{ number_format($row->disc ?? 0, 2) }}%)
                </div>
            </td>
            <td class="center">{{ number_format($row->PriceSub,2) }}</td>
        </tr>
        @endforeach
    </tbody>

</table>


<!--TOTAL-->
<table>
    <tr>
        <td width="60%">
            <b>Document Copy of {{ $items[0]->JumCetak ?? 1 }}</b>
        </td>
        <td width="40%">
            <table>
                <tr><td><b>Sub Total</b></td><td class="right">{{ number_format($sumAmount,2) }}</td></tr>
                <tr><td><b>DPP Nilai Lain</b></td><td class="right">{{ number_format($dpp,2) }}</td></tr>
                <tr><td><b>VAT</b></td><td class="right">{{ number_format($ppn,2) }}</td></tr>
                <tr><td><b>Total</b></td><td class="right">{{ number_format($total,2) }}</td></tr>
            </table>
        </td>
    </tr>
</table>



<!--  FOOTER  -->
<table width="100%" style="text-align:center; margin-top:20px;">
    <tr>
        <td width="33%">MENYETUJUI,</td>
        <td width="33%">PEMESAN,</td>
        <td width="33%">PELAKSANA,</td>
    </tr>

    <tr>
        <!-- MENYETUJUI -->
       <td>
            @if(!empty($ttdBase64_2))
                {{-- 2 TTD → sejajar --}}
                <table width="100%" style="border-collapse:collapse;">
                    <tr>
                        <td width="50%" class="right" style="padding-right: 15px">
                            @if(!empty($ttdBase64_1))
                                <img src="{{ $ttdBase64_1 }}" class="signature_img">
                            @endif
                        </td>
                        <td width="50%" class="left" style="padding-left: 15px">
                            <img src="{{ $ttdBase64_2 }}" class="signature_img">
                        </td>
                    </tr>
                </table>
            @else
                {{-- 1 TTD → center --}}
                <div class="signature_box">
                    @if(!empty($ttdBase64_1))
                        <img src="{{ $ttdBase64_1 }}" class="signature_img">
                    @endif
                </div>
            @endif
        </td>



        <!-- PEMESAN -->
        <td>
            <div class="signature_box"></div>
        </td>

        <!-- PELAKSANA -->
        <td>
            <div class="signature_box"></div>
        </td>
    </tr>

    <tr>
        <td>(............................)</td>
        <td>(............................)</td>
        <td>(............................)</td>
    </tr>
</table>


</body>


</html>
