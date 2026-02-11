<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">

    <style>
        body {
            font-family: Helvetica, Arial, sans-serif;
            font-size: 8px;
            color: #000;
            padding-top: 20%;
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
            font-size: 8px;
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
                {{ $header->NM_SUP ?? '-' }}<br>
                {{ $header->ALAMAT1 ?? '-' }}<br>
                {{ $header->KOTA1 ?? '-' }}<br>
                {{ $header->NEGARA1 ?? '-' }}<br><br>

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
                <th class="center">Unit Price<span class="th_sub">{{ $header->Id_MataUang_BC ?? 'IDR' }}</span></th>
                <th class="center">Disc.<span class="th_sub">{{ $header->Id_MataUang_BC ?? 'IDR' }}</span></th>
                <th class="center">Amount<span class="th_sub">{{ $header->Id_MataUang_BC ?? 'IDR' }}</span></th>
            </tr>
        </thead>

        <tbody>
            @foreach ($items as $i => $row)
                <tr>
                    <td class="center">{{ $i + 1 }}</td>
                    <td class="center" style="padding-left: 20px;">{{ $row->Kd_brg }}</td>
                    <td style="padding-left: 40px;">
                        <div style="font-weight:bold;">{{ $row->NAMA_BRG }}</div>
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
                    <td class="center">{{ number_format($row->PriceSub, 2) }}</td>
                </tr>
            @endforeach
        </tbody>

    </table>


    <table>
        <tr>
            <td width="60%">
                <b>Document Copy of {{ $items[0]->JumCetak ?? 1 }}</b>
            </td>
            <td width="40%">
                <table>
                    <tr>
                        <td><b>Sub Total</b></td>
                        <td class="right">{{ number_format($sumAmount, 2) }}</td>
                    </tr>
                    <tr>
                        <td><b>DPP Nilai Lain</b></td>
                        <td class="right">{{ number_format($dpp, 2) }}</td>
                    </tr>
                    <tr>
                        <td><b>VAT</b></td>
                        <td class="right">{{ number_format($ppn, 2) }}</td>
                    </tr>
                    <tr>
                        <td><b>Total</b></td>
                        <td class="right">{{ number_format($total, 2) }}</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>



    <table width="100%" style="text-align:center; margin-top:20px;">
        <tr>
            <td width="33%">MENYETUJUI,</td>
            <td width="33%">PEMESAN,</td>
            <td width="33%">PELAKSANA,</td>
        </tr>

        <tr>
            <td>
                @if (!empty($ttdBase64_2))
                    <table width="100%" style="border-collapse:collapse;">
                        <tr>
                            <td width="50%" class="right" style="padding-right: 15px">
                                @if (!empty($ttdBase64_1))
                                    <img src="{{ $ttdBase64_1 }}" class="signature_img">
                                @endif
                            </td>
                            <td width="50%" class="left" style="padding-left: 15px">
                                <img src="{{ $ttdBase64_2 }}" class="signature_img">
                            </td>
                        </tr>
                    </table>
                @else
                    <div class="signature_box">
                        @if (!empty($ttdBase64_1))
                            <img src="{{ $ttdBase64_1 }}" class="signature_img">
                        @endif
                    </div>
                @endif
            </td>



            <td>
                <div class="signature_box"></div>
            </td>

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
{{-- <div
    style="width: 20.5cm; height: 27.94cm; padding: 10px 10px 0px 10px; margin: 0; background: #FFFFFF; box-sizing: border-box; page-break-after: ${
            chunkIndex < chunkedData.length - 1 ? `always` : `avoid`
        };">
    <div style="width: 100%; height : 15%;">
    </div>
    <main style="width: 100%; height : 70%;">
        <div style="width: 100%; height: auto; display: flex;">
            <div style="width: 50%; height: auto; margin-right: 20px;">
                <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; margin:2px 0 10px 0;">Issued To:
                </h1>
                <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">${
                    data.printHeader[0].NM_SUP
                    }</p>
                <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">${
                    data.printHeader[0].ALAMAT1
                    }</p>
                <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">${
                    data.printHeader[0].KOTA1
                    }</p>
                <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">${
                    data.printHeader[0].NEGARA1
                    }</p>
                <br>
                <h1
                    style="font-size: 13px;font-family: Helvetica; font-weight: bold; margin-top: 10px; margin-bottom: 2px;">
                    Delivery To:</h1>
                <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">PT. Kerta Rajasa Raya</p>
                <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">Jl. Raya Tropodo No. 1</p>
                <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">Waru - Sidoarjo 61256 East Java,
                    Indonesia</p>
            </div>
            <div style="width: 50%; height: auto; margin-left: 20px;">
                <div style="width: 100%; display: flex;">
                    <div style="width: 30%; height: auto;">
                        <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; margin: 2px 0;">Number
                        </h1>
                    </div>
                    <div style="width: 70%; height: auto;">
                        <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">: ${
                            data.printHeader[0].NO_PO
                            }</p>
                    </div>
                </div>
                <div style="width: 100%; display: flex;">
                    <div style="width: 30%; height: auto;">
                        <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; margin: 2px 0;">Date</h1>
                    </div>
                    <div style="width: 70%; height: auto;">
                        <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">: ${
                            data.printHeader[0].Tgl_sppb
                            }</p>
                    </div>
                </div>
                <div style="width: 100%; display: flex;">
                    <div style="width: 30%; height: auto;">
                        <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; margin: 2px 0;">Delivery
                            Date</h1>
                    </div>
                    <div style="width: 70%; height: auto;">
                        <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">: ${
                            data.printHeader[0].Est_Date
                            }</p>
                    </div>
                </div>
                <div style="width: 100%; display: flex;">
                    <div style="width: 30%; height: auto;">
                        <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; margin: 2px 0;">Payment
                            Term</h1>
                    </div>
                    <div style="width: 70%; height: auto;">
                        <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">: ${
                            data.printHeader[0].Pembayaran
                            }</p>
                    </div>
                </div>
                <div style="width: 100%; display: flex;">
                    <div style="width: 30%; height: auto;">
                        <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; margin: 2px 0;">Divisi
                        </h1>
                    </div>
                    <div style="width: 70%; height: auto;">
                        <div style="font-size: 13px;font-family: Helvetica; margin: 2px 0; display:flex"><span>:</span>
                            <p style="font-size: 13px;font-family: Helvetica; margin: 0 0 0 4px">
                                ${data.printHeader[0].Kd_div.trim()} - ${data.printHeader[0].NM_DIV.trim()}</p>
                        </div>
                    </div>
                </div>
                <div style="width: 100%; display: flex;">
                    <div style="width: 30%; height: auto;">
                        <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; margin: 2px 0;">Requester
                        </h1>
                    </div>
                    <div style="width: 70%; height: auto;">
                        <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">: ${
                            data.printHeader[0].Nama
                            }</p>
                    </div>
                </div>
                <div style="width: 100%; display: flex;">
                    <div style="width: 30%; height: auto;">
                        <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; margin: 2px 0;">Page</h1>
                    </div>
                    <div style="width: 70%; height: auto;">
                        <p style="font-size: 13px;font-family: Helvetica; margin: 2px 0;">: Page ${
                            Page + 1
                            } of ${chunkedData.length}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="details" style="margin-top: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr>
                        <th>
                            <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; line-height: 13.8px">
                                No.</h1>
                        </th>
                        <th style="text-align: center;">
                            <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; line-height: 13.8px">
                                Item Number</h1>
                        </th>
                        <th style="text-align: center;">
                            <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; line-height: 13.8px">
                                Description</h1>
                        </th>
                        <th style="text-align: center;">
                            <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; line-height: 13.8px">
                                Qty</h1>
                        </th>
                        <th style="text-align: center;">
                            <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; line-height: 13.8px">
                                Unit</h1>
                        </th>
                        <th style="text-align: center;">
                            <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; line-height: 13.8px">
                                Unit Price<br> ${
                                data.printHeader[0].Id_MataUang_BC
                                }</h1>
                        </th>
                        <th style="text-align: center;">
                            <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; line-height: 13.8px">
                                Disc.<br> ${
                                data.printHeader[0].Id_MataUang_BC
                                }</h1>
                        </th>
                        <th style="text-align: center;">
                            <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; line-height: 13.8px">
                                Amount<br> ${
                                data.printHeader[0].Id_MataUang_BC
                                }</h1>
                        </th>
                    </tr>
                </thead>
                <tbody style="border-top: 1px solid black; border-bottom: 1px solid black;">
                    <tr>
                    <td style="text-align: center;vertical-align: top;"><p style="margin:0;font-size: 12px;font-family: Helvetica;">${
                        No + 1
                    }</p></td>
                    <td style="text-align: center;vertical-align: top;"><p style="margin:0;font-size: 12px;font-family: Helvetica;">${
                        item.Kd_brg
                    }</p></td>
                    <td><p style="line-height: 13.8px; font-size: 12px;font-family: Helvetica;padding-right:8px">
                    ${item.NAMA_BRG.replace(/</g, "&lt;")}
                    <br>
                    ${item.keterangan || "-"}
                    <br>
                    ${item.nama_kategori}
                    <br>
                    ${item.nama_sub_kategori}
                    <br>
                    ${item.No_trans}</p>
                    </td>
                    <td style="text-align: center;vertical-align: top;"><p style="margin:0;font-size: 12px;font-family: Helvetica;">${
                        !parseFloat(item.Qty)
                            .toLocaleString("en-US")
                            .includes(".")
                            ? parseFloat(item.Qty).toLocaleString("en-US") +
                              ".00"
                            : parseFloat(item.Qty).toLocaleString("en-US")
                    }</p></td>
                    <td style="text-align: center;vertical-align: top;">
                    <p style="margin:0;font-size: 12px;font-family: Helvetica;">${item.Nama_satuan.trim()}</p>
                    </td>
                    <td style="text-align: center;vertical-align: top;"><p style="margin:0;font-size: 12px;font-family: Helvetica;">${
                        !parseFloat(item.PriceUnit)
                            .toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })
                            .includes(".")
                            ? parseFloat(item.PriceUnit).toLocaleString(
                                  "en-US"
                              ) + ".00"
                            : parseFloat(item.PriceUnit).toLocaleString(
                                  "en-US",
                                  {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                  }
                              )
                    }</p></td>
                    <td style="text-align: center;vertical-align: top;"><p style="margin:0;font-size: 12px;font-family: Helvetica;">${
                        !parseFloat(
                            item.harga_disc == null ? 0 : item.harga_disc
                        )
                            .toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })
                            .includes(".")
                            ? parseFloat(
                                  item.harga_disc == null ? 0 : item.harga_disc
                              ).toLocaleString("en-US", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                              }) + ".00"
                            : parseFloat(
                                  item.harga_disc == null ? 0 : item.harga_disc
                              ).toLocaleString("en-US", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                              })
                    }
                    <br>
                    (${
                        !parseFloat(
                            item.disc == null ? 0 : item.disc
                        )
                            .toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })
                            .includes(".")
                            ? parseFloat(
                                  item.disc == null ? 0 : item.disc
                              ).toLocaleString("en-US", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                              }) + ".00"
                            : parseFloat(
                                  item.disc == null ? 0 : item.disc
                              ).toLocaleString("en-US", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                              })
                    }%)</p></td>
                    <td style="text-align: right;vertical-align: top;"><p style="margin:0;font-size: 12px;font-family: Helvetica;">${
                        !parseFloat(item.PriceSub)
                            .toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })
                            .includes(".")
                            ? parseFloat(item.PriceSub).toLocaleString(
                                  "en-US"
                              ) + ".00"
                            : parseFloat(item.PriceSub).toLocaleString(
                                  "en-US",
                                  {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                  }
                              )
                    }</p></td>
                </tr>
                </tbody>
            </table>
        </div>
        <div style="width: 100%; display: flex;">
            <div style="width: 70%;">
                <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold;margin-top:50px">Document Copy of
                    ${
                    data.print[0].JumCetak
                    }</h1>
            </div>
            <div style="width: 30%;">
                <div style="width: 100%; display: flex;">
                    <div style="width: 55%; margin-right: 10%;">
                        <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; margin: 2px 0;">Sub Total
                        </h1>
                    </div>
                    <div style="width: 60%; border-bottom: 1px solid; text-align: right;">
                        <p style="line-height: 13.8px; font-size: 13px;font-family: Helvetica; margin: 2px 0;">
                            ${sumAmountFix}</p>
                    </div>
                </div>
                <div style="width: 100%; display: flex;">
                    <div style="width: 55%; margin-right: 10%;">
                        <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; margin: 2px 0;">DPP Nilai
                            Lain</h1>
                    </div>
                    <div style="width: 60%; border-bottom: 1px solid; text-align: right;">
                        <p style="line-height: 13.8px; font-size: 13px;font-family: Helvetica; margin: 2px 0;">${DPPFix}
                        </p>
                    </div>
                </div>
                <div style="width: 100%; display: flex;">
                    <div style="width: 55%; margin-right: 10%;">
                        <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; margin: 2px 0;">VAT</h1>
                    </div>
                    <div style="width: 60%; border-bottom: 1px solid; text-align: right;">
                        <p style="line-height: 13.8px; font-size: 13px;font-family: Helvetica; margin: 2px 0;">${ppnFix}
                        </p>
                    </div>
                </div>
                <div style="width: 100%; display: flex;">
                    <div style="width: 55%; margin-right: 10%;">
                        <h1 style="font-size: 13px;font-family: Helvetica; font-weight: bold; margin: 2px 0;">Total</h1>
                    </div>
                    <div style="width: 60%; border-bottom: 1px solid; text-align: right;">
                        <p style="line-height: 13.8px; font-size: 13px;font-family: Helvetica; margin: 2px 0;">${
                            !(sumAmount + ppn)
                            .toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                            })
                            .includes(".")
                            ? (sumAmount + ppn).toLocaleString(
                            "en-US",
                            {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                            }
                            ) + ".00"
                            : (sumAmount + ppn).toLocaleString(
                            "en-US",
                            {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                            }
                            )
                            }</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div> --}}
