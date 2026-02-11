<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">

   <style>
        @page {
            size: A4;
            margin: 15mm 12mm 15mm 12mm;
        }

        body {
            font-family: Helvetica, Arial, sans-serif;
            font-size: 11px;
            margin: 0;
            padding: 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th {
            padding: 2px;
            font-size: 11px;
            font-weight: bold;
            text-align: center;
        }

        td {
            padding: 4px;
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
            height: 40px;
            text-align: center;
        }

        .signature_img {
            max-height: 40px;
            max-width: 100%;
        }

    </style>
</head>

<body>


{{-- HEADER TEMPLATE --}}
<table>
    <tr>

       <td width="70%" valign="top">
           <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                <tr>
                    <td valign="top" style="padding:0;">
                        <img
                            src="{{ public_path('images/KRRLama.png') }}"
                            width="85"
                            style="display:block;"
                        >
                    </td>

                    <td valign="top" style="padding-left:6px; text-align:center; white-space:nowrap;">
                        <div style="color:#9C2007; font-size:16px; font-weight:bold; line-height:1.1;">
                            PT. KERTA RAJASA RAYA
                        </div>
                        <div style="font-size:11px; font-weight:bold; line-height:1.2;">
                            Woven Bag - Jumbo Bag Industrial
                        </div>
                        <div style="font-size:10px; line-height:1.25;">
                            Jl. Raya Tropodo No. 1, Waru, Sidoarjo 61256<br>
                            East Java, Indonesia<br>
                            Phone : (031) 8669595 &nbsp; Fax : (031) 8669989<br>
                            Home page : www.kertarajasa.co.id<br>
                            Email : kerta88@kertarajasa.co.id
                        </div>
                    </td>

                    <td style="width:100%"></td>
                </tr>
            </table>
        </td>


        <td width="30%" valign="top">
            <b>PURCHASE ORDER (P.O.)</b>
            <table style="margin-top:6px;border:1px solid #000; font-size: 8px;">
                <tr>
                    <td><b>NO. DOKUMEN</b></td>
                    <td>: FM-7.4-01-BL-03-01</td>
                </tr>
                <tr>
                    <td><b>REVISI</b></td>
                    <td>: 4</td>
                </tr>
                  <tr>
                    <td colspan="2" style="height:36px;"></td>
                </tr>
            </table>
        </td>

    </tr>
</table>

<br>

{{--  ISI CONTENT  --}}
<div class="box">

<table>
    <tr>
        <td width="50%">
            <b>Issued To:</b><br>
            {{ $header->NM_SUP }}<br>
            {{ $header->ALAMAT1 }}<br>
            {{ $header->KOTA1 }}<br>
            {{ $header->NEGARA1 }}<br><br>

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
            <th>Item Number</th>
            <th class="center">Description</th>
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
            <td class="center">{{ $row->Kd_brg }}</td>
            <td>
                <div style="font-weight:bold;">{{ $row->NAMA_BRG }}</div>
                <div>{{ $row->keterangan ?? '-' }}</div>
                <div style="font-size: 11px">{{ $row->nama_kategori ?? '-' }}</div>
                <div style="font-size: 10px">{{ $row->nama_sub_kategori ?? '-' }}</div>
                <div>{{ $row->No_trans }}</div>
            </td>
            <td class="center">{{ number_format($row->Qty,2) }}</td>
            <td class="center">{{ $row->Nama_satuan }}</td>
            <td class="center">{{ number_format($row->PriceUnit,2) }}</td>
            <td class="center">
                {{ number_format($row->harga_disc ?? 0, 2) }}
                <div style="font-size:9px;">
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


@php
    $itemCount = count($items);

    if ($itemCount <= 1) {
        $spacerHeight = '85mm';
    } elseif ($itemCount == 2) {
        $spacerHeight = '65mm';
    } elseif ($itemCount == 3) {
        $spacerHeight = '40mm';
    } elseif ($itemCount == 4) {
        $spacerHeight = '0mm';
    }
@endphp

<!-- SPACE DALAM TABEL -->
<table style="width:100%;">
    <tr>
        <td style="height:{{ $spacerHeight }};"></td>
    </tr>
</table>

</div>


{{-- FOOTER TEMPLATE --}}
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
                {{-- 2 TANDA TANGAN --}}
                <table width="100%" style="border-collapse:collapse;">
                    <tr>
                        <td width="45%" class="right" style="padding-right: 15px">
                            <img src="{{ $ttdBase64_1 }}" class="signature_img">
                        </td>
                        <td width="10%"></td>
                        <td width="45%" class="left" style="padding-left: 15px">
                            <img src="{{ $ttdBase64_2 }}" class="signature_img">
                        </td>
                    </tr>
                </table>
            @else
                {{-- 1 TANDA TANGAN --}}
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



<p style="font-size:10px;margin-top:5px;">
    <b>PERHATIAN:</b> UNTUK PENAGIHAN YANG TIDAK DILENGKAPI LEMBAR INI TIDAK DAPAT KAMI LAYANI
</p>

</body>

</html>
