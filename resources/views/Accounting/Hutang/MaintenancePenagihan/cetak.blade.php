    @php
        $subTotal = (float) 0;
        $total = (float) 0;
        $hargaSatuan = (float) 0;
        $hargaTerbayar = (float) 0;
    @endphp

    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Cetak TT {{ $dataCetak[0]->Id_Penagihan }}</title>
        <style>
            body {
                margin: 15px 20px 15px 15px;
                font-family: Tahoma, Arial, Helvetica, sans-serif;
                color: #111;
                font-size: 11px;
            }
        </style>
        @if ($dataCetak[0]->Status_PPN !== 'Y')
            @if ($dataCetak[0]->Id_MataUang_BC !== 'IDR')
                <style>
                    #table_dataSPPB tbody tr:nth-last-child(3) {
                        border-top: 1px solid black;
                    }
                </style>
            @else
                <style>
                    #table_dataSPPB tbody tr:nth-last-child(1) {
                        border-top: 1px solid black;
                    }
                </style>
            @endif
        @endif
    </head>

    <body>
        <div>
            <div style="display: flex;flex-direction: row;">
                <div style="display: flex;flex-direction: column;flex: 0.5;text-align: left;font-size: 13px;">
                    <label>PT. KERTA RAJASA RAYA</label>
                    <label>Jl. Raya Tropodo No. 1</label>
                    <label>Waru - Sidoarjo</label>
                    {{-- <label>Phone: +62-31-8669595, Fax: +62-31-8675315</label> --}}
                </div>
                <table style="flex: 0.5;border-collapse: collapse;font-size: 12px;">
                    <tr>
                        <td style="border:none;" colspan="3">Receipt Invoice</td>
                    </tr>
                    <tr>
                        <td style="border:none;">Receipt Number</td>
                        <td style="border:none;">:</td>
                        <td style="border:none;">{{ $dataCetak[0]->Id_Penagihan }}</td>
                    </tr>
                    <tr>
                        <td style="border:none;">Vendor Invoice</td>
                        <td style="border:none;">:</td>
                        <td style="border:none;">{{ $dataCetak[0]->Id_Inv_Supp }}</td>
                    </tr>
                    <tr>
                        <td style="border:none;">Due Date</td>
                        <td style="border:none;">:</td>
                        <td style="border:none;">{{ date('d-M-Y', strtotime($dataCetak[0]->Tempo)) }}</td>
                    </tr>
                    <tr>
                        <td style="border:none;">Create Date</td>
                        <td style="border:none;">:</td>
                        <td style="border:none;">{{ date('d-M-Y', strtotime($dataCetak[0]->Waktu_Penagihan)) }}</td>
                    </tr>
                </table>
                {{-- <div style="display: flex;flex-direction: row;flex: 0.5;text-align: right;">
                    <div style="display: flex;flex-direction: column;flex: 0.395;">
                        <label>Receipt Invoice</label>
                        <label>Invoice Number</label>
                        <label>Vendor Invoice</label>
                        <label>Due Date</label>
                        <label>Create Date</label>
                    </div>
                    <div style="display: flex;flex-direction: column;flex: 0.005;">
                        <label></label>
                        <label>:</label>
                        <label>:</label>
                        <label>:</label>
                        <label>:</label>
                    </div>
                    <div style="display: flex;flex-direction: column;flex: 0.60;">
                        <label></label>
                        <label>{{ $dataCetak[0]->Id_Penagihan }}</label>
                        <label>{{ $dataCetak[0]->Faktur }}</label>
                        <label>{{ $dataCetak[0]->Tempo }}</label>
                        <label>{{ $dataCetak[0]->Waktu_Penagihan }}</label>
                    </div>
                </div> --}}
            </div>
            <div style="display: flex;flex-direction: row;margin-top: 10px">
                <div style="display: flex;flex-direction: column;flex: 0.60;">
                    <label>{{ $dataCetak[0]->NM_SUP }}</label>
                    <label>{{ $dataCetak[0]->ALAMAT1 }}</label>
                    <label>{{ $dataCetak[0]->KOTA1 }}, {{ $dataCetak[0]->NEGARA1 }}</label>
                    <label>PHONE: {{ $dataCetak[0]->TLP1 }}, FAX: {{ $dataCetak[0]->FAX1 ?? '-' }}</label>
                </div>
            </div>
            <table id="table_dataSPPB" style="width: 100%;border-collapse: collapse;margin-top: 10px;font-size: 11px">
                <tr style="white-space: nowrap">
                    <td
                        style="padding: 10px 5px 10px 5px; text-align: center;font-weight: bold;border-bottom: 1px solid black;">
                        No.</td>
                    <td
                        style="padding: 10px 5px 10px 5px; text-align: center;font-weight: bold;border-bottom: 1px solid black;">
                        Receive Date</td>
                    <td
                        style="padding: 10px 5px 10px 5px; text-align: center;font-weight: bold;border-bottom: 1px solid black;">
                        Receipt No.</td>
                    <td
                        style="padding: 10px 5px 10px 5px; text-align: center;font-weight: bold;border-bottom: 1px solid black;">
                        PO</td>
                    <td
                        style="padding: 10px 5px 10px 5px; text-align: center;font-weight: bold;border-bottom: 1px solid black;">
                        Description</td>
                    <td
                        style="padding: 10px 5px 10px 5px; text-align: center;font-weight: bold;border-bottom: 1px solid black;">
                        Qty</td>
                    <td
                        style="padding: 10px 5px 10px 5px; text-align: center;font-weight: bold;border-bottom: 1px solid black;">
                        Unit</td>
                    <td
                        style="padding: 10px 5px 10px 5px; text-align: center;font-weight: bold;border-bottom: 1px solid black;">
                        Unit Price</td>
                    <td
                        style="padding: 10px 5px 10px 5px; text-align: center;font-weight: bold;border-bottom: 1px solid black;">
                        Discount</td>
                    <td
                        style="padding: 10px 5px 10px 5px; text-align: center;font-weight: bold;border-bottom: 1px solid black;">
                        Amount
                        {{ $dataCetak[0]->Id_MataUang_BC }}
                    </td>
                </tr>
                @foreach ($dataCetak as $index => $item)
                    <tr>
                        @php
                            $hargaSatuan =
                                $dataCetak[0]->Id_MataUang_BC == 'IDR' ? $item->Hrg_Satuan_Rp : $item->Hrg_Sat;
                            $hargaMurni =
                                $dataCetak[0]->Id_MataUang_BC == 'IDR' ? $item->Hrg_Murni_Rp : $item->Harga_Murni;
                            $hargaDisc =
                                $dataCetak[0]->Id_MataUang_BC == 'IDR' ? $item->Harga_Disc : $item->Hrg_Disc_Rp;
                            $hargaTerbayar =
                                $dataCetak[0]->Id_MataUang_BC == 'IDR'
                                    ? $item->Harga_TerbayarRp
                                    : $item->Harga_Terbayar;
                            $subTotal += (float) $hargaMurni - $hargaDisc;
                        @endphp
                        <td style="padding: 2px 5px 0 5px">{{ $index + 1 }}</td>
                        <td style="padding: 2px 5px 0 5px; white-space: nowrap;">
                            {{ date('d-M-Y', strtotime($item->Datang)) }}</td>
                        <td style="padding: 2px 5px 0 5px;">{{ $item->No_SuratJalan }}</td>
                        <td style="padding: 2px 5px 0 5px; white-space: nowrap;">{{ $item->No_PO }}</td>
                        <td style="padding: 2px 5px 0 5px">{{ $item->NAMA_BRG }}</td>
                        <td style="padding: 2px 5px 0 5px">{{ number_format($item->Qty_Terima, 0, '.', ',') }}</td>
                        <td style="padding: 2px 5px 0 5px">{{ $item->SatTerima }}</td>
                        <td style="padding: 2px 5px 0 5px; white-space: nowrap;">
                            {{-- {{ $item->Symbol }} --}}
                            {{ number_format($hargaSatuan, 4, '.', ',') }}
                        </td>
                        <td style="padding: 2px 5px 0 5px; white-space: nowrap;">
                            {{-- {{ $item->Symbol }} --}}
                            {{ number_format($hargaDisc, 2, '.', ',') }}</td>
                        <td style="padding: 2px 5px 0 5px; white-space: nowrap;">
                            {{-- {{ $item->Symbol }} --}}
                            {{ number_format($hargaMurni, 4, '.', ',') }}
                        </td>

                    </tr>
                @endforeach
                @if ($dataCetak[0]->Status_PPN == 'Y')
                    @php
                        // dd($dataCetak);
                        $Nilai_Pajak = (float) $dataCetak[0]->Nilai_Pajak;
                        $dppAmount = $Nilai_Pajak == 12 ? ($subTotal * 11) / 12 : $subTotal;
                        $ppnAmount = ($dppAmount * $Nilai_Pajak) / 100;
                    @endphp
                    @if ($subTotal !== $dppAmount)
                        <style>
                            #table_dataSPPB tbody tr:nth-last-child(4) {
                                border-top: 1px solid black;
                            }
                        </style>
                    @else
                        <style>
                            #table_dataSPPB tbody tr:nth-last-child(3) {
                                border-top: 1px solid black;
                            }
                        </style>
                    @endif
                    <tr>
                        <td colspan="9" style="border: none;text-align: right;padding: 5px 5px 0 0;">Subtotal</td>
                        <td style="border: none;padding: 5px 0 0 5px;">{{ $dataCetak[0]->Symbol }}
                            {{ number_format($subTotal, 2, '.', ',') }} </td>
                    </tr>
                    @if ($subTotal !== $dppAmount)
                        <tr>
                            <td colspan="9" style="border: none;text-align: right;padding: 5px 5px 0 0;">DPP</td>
                            <td style="border: none;padding: 5px 0 0 5px;">{{ $dataCetak[0]->Symbol }}
                                {{ number_format($dppAmount, 2, '.', ',') }} </td>
                        </tr>
                    @endif
                    <tr>
                        <td colspan="9" style="border: none;text-align: right;padding: 5px 5px 0 0;">PPN</td>
                        <td style="border: none;padding: 5px 0 0 5px;">{{ $dataCetak[0]->Symbol }}
                            {{ number_format($ppnAmount, 2, '.', ',') }} </td>
                    </tr>
                    @php
                        // dd(number_format((float) $item->Harga_Terbayar, 2, '.', ','));
                        $total = (float) $subTotal + (float) $ppnAmount;
                    @endphp
                    <tr>
                        <td colspan="9" style="border: none;text-align: right;padding: 5px 5px 0 0;">Total</td>
                        <td style="border: none;padding: 5px 0 0 5px;white-space: nowrap;">{{ $dataCetak[0]->Symbol }}
                            {{ number_format($total, 4, '.', ',') }} </td>
                    </tr>
                @else
                    @php
                        $total = $subTotal;
                    @endphp
                    <tr>
                        <td colspan="9" style="border: none;text-align: right;padding: 5px 5px 0 0;">Total</td>
                        <td style="border: none;padding: 5px 0 0 5px;white-space: nowrap;">{{ $dataCetak[0]->Symbol }}
                            {{ number_format($total, 4, '.', ',') }} </td>
                    </tr>
                    @if ($dataCetak[0]->Id_MataUang_BC !== 'IDR')
                        <tr>
                            <td colspan="9" style="border: none;text-align: right;padding: 5px 5px 0 0;;">
                                Kurs IDR</td>
                            <td style="border: none;padding: 5px 0 0 5px;">Rp.
                                {{ number_format($dataCetak[0]->Kurs_Rp, 2, '.', ',') }} </td>
                        </tr>
                        <tr>
                            <td colspan="9" style="border: none;text-align: right;padding: 5px 5px 0 0;;">
                                Total IDR</td>
                            <td style="border: none;padding: 5px 0 0 5px;white-space: nowrap;">Rp.
                                {{ number_format($dataCetak[0]->Harga_TerbayarRp, 2, '.', ',') }} </td>
                        </tr>
                    @endif
                @endif
            </table>
            <div style="display: flex;flex-direction: row;margin-top: 10px;font-size: 11px;">
                <div style="display: flex;flex-direction: column;flex: 0.5;text-align: center;">
                    <label>Sender</label>
                    <br>
                    <br>
                    <br>
                    <br>
                    <label>____________________</label>
                </div>
                <div style="display: flex;flex-direction: column;flex: 0.5;text-align: center;">
                    <label>Receiver</label>
                    <br>
                    <br>
                    <br>
                    <br>
                    <label>____________________</label>
                </div>
            </div>
        </div>
    </body>
