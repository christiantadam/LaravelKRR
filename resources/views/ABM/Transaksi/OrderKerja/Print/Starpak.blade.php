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
    $jumlahWarna = explode(' | ', $dataDetailOrderKerja[0]->WarnaPrinting)[0];
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

    <div class="d-flex p-3" style="width: 100%; height: calc(100% - 40px);font-size: 12px;">
        <div class="d-flex" style="width: 100%; height: 100%; border: 1px solid black;">
            <div class="d-flex flex-column p-2" style="flex: 0.3;">
                <div class="d-flex" style="flex: 0.75">
                    <div style="flex:0.38; white-space: nowrap;">
                        <label>NO. ORDER KERJA</label><br>
                        <label>UKURAN</label><br>
                        <label>RAJUTAN</label><br>
                        <label>DENIER</label><br>
                        <label>ROLL</label><br>
                        <label>DRUM KLISE</label><br>
                        <label>PANJANG POTONGAN</label><br>
                        <label>CORAK PRINTING</label><br>
                        @for ($i = 0; $i < $jumlahWarna; $i++)
                            <label>WARNA PRINT {{ $i + 1 }}</label><br>
                        @endfor
                        <label>CORONA</label><br>
                        <label>JUMLAH</label><br>
                        <label>PRINT MAX</label><br>
                        <label>TGL. MULAI</label><br>
                        <label>SELESAI</label><br>
                        <label>SP. NO.</label><br>
                        <label>NAMA CUSTOMER</label><br>
                        <label>KODE BARANG JADI</label><br>
                        <label>PACKING</label>
                    </div>
                    <div style="flex: 0.001">
                        <label>:</label><br>
                        <label>:</label><br>
                        <label>:</label><br>
                        <label>:</label><br>
                        <label>:</label><br>
                        <label>:</label><br>
                        <label>:</label><br>
                        @for ($i = 0; $i < $jumlahWarna; $i++)
                            <label>:</label><br>
                        @endfor
                        <label>:</label><br>
                        <label>:</label><br>
                        <label>:</label><br>
                        <label>:</label><br>
                        <label>:</label><br>
                        <label>:</label><br>
                        <label>:</label><br>
                        <label>:</label><br>
                        <label>:</label><br>
                        <label>:</label>
                    </div>
                    <div class="pl-2" style="flex: 0.619;white-space: nowrap;">
                        <label>{{ $dataDetailOrderKerja[0]->No_OK }}</label><br>
                        <label>{{ $dataDetailOrderKerja[0]->Ukuran ?? '-' }} CM</label><br>
                        <label>{{ $dataDetailOrderKerja[0]->Rajutan ?? '-' }}</label><br>
                        <label>{{ $dataDetailOrderKerja[0]->Denier ?? 0 }}</label><br>
                        <label>{{ $dataDetailOrderKerja[0]->NamaBarangStarpakPrinting }}</label><br>
                        <label>{{ $dataDetailOrderKerja[0]->DrumKliseStarpak ?? 0 }} CM</label><br>
                        <label>{{ $dataDetailOrderKerja[0]->PanjangPotongStarpak ?? 0 }} CM</label><br>
                        <label>{{ $dataDetailOrderKerja[0]->CorakPrinting ?? '-' }}</label><br>
                        @for ($i = 0; $i < $jumlahWarna; $i++)
                            <label>{{ explode(' | ', $dataDetailOrderKerja[0]->WarnaPrinting)[$i] }}</label><br>
                        @endfor
                        <label>{{ $dataDetailOrderKerja[0]->CoronaStarpak ?? 0 }}</label><br>
                        <label>{{ $dataDetailOrderKerja[0]->Qty ?? 0 }} &nbsp;
                            {{ $dataDetailOrderKerja[0]->Satuan ?? " - "}}
                        </label><br>
                        <label>{{ $dataDetailOrderKerja[0]->PrintMaxStarpak ?? 0 }}</label><br>
                        <label>
                            {{ $dataDetailOrderKerja[0]->TanggalRencanaMulaiKerja ? \Carbon\Carbon::parse($dataDetailOrderKerja[0]->TanggalRencanaMulaiKerja)->format('d-m-Y') : '' }}
                        </label><br>
                        <label>
                            {{ $dataDetailOrderKerja[0]->TanggalRencanaSelesaiKerja ? \Carbon\Carbon::parse($dataDetailOrderKerja[0]->TanggalRencanaSelesaiKerja)->format('d-m-Y') : '' }}
                        </label><br>
                        <label>{{ $dataDetailOrderKerja[0]->IDSuratPesanan }}</label><br>
                        <label>{{ $dataDetailOrderKerja[0]->NamaCust }}</label><br>
                        <label>{{ $dataDetailOrderKerja[0]->KodeBarang }}</label><br>
                        <label>{{ $dataDetailOrderKerja[0]->Packing }}</label>
                    </div>
                </div>
                <div style="flex: 0.25;border-top: 1px solid black; white-space: nowrap;">
                    <label>Keterangan:</label><br>
                    {{-- <label>JAHIT BAWAH PAKAI BENANG KKC-90-A-NT-03-R0/K0</label><br>
                    <label>BUKA MULUT HARUS BAIK</label><br>
                    <label>PRINTING SESUAI CONTOH KARUNG/GAMBAR</label><br>
                    <label>PRINTING SESUAI CONTOH KARUNG/GAMBAR</label><br>
                    <label>PAKAI BALEMARK</label> --}}
                    {!! nl2br(e($dataDetailOrderKerja[0]->Keterangan ?? '-')) !!}
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
