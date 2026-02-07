{{-- =========================
    STYLE KHUSUS MODAL
========================= --}}
<style>
    .custom-modal-width2 {
        max-width: 75%;
    }

    /* =========================
   SCOPE LAPORAN
========================= */
    .laporan-extruder {
        font-family: "Times New Roman", serif;
        font-size: 12px;
        color: #000;
    }

    .laporan-extruder .container {
        width: 100%;
        border: 1px solid #000;
        padding: 5px;
        box-sizing: border-box;
    }

    .laporan-extruder table {
        border-collapse: collapse;
        width: 100%;
    }

    .laporan-extruder td,
    .laporan-extruder th {
        border: 1px solid #000;
        padding: 1px 2px;
        vertical-align: middle;
    }

    .laporan-extruder .no-border td,
    .laporan-extruder .no-border th {
        border: none;
    }

    .laporan-extruder .center {
        text-align: center;
    }

    .laporan-extruder .right {
        text-align: right;
    }

    .laporan-extruder .bold {
        font-weight: bold;
    }

    .laporan-extruder .section-title {
        font-weight: bold;
        text-align: center;
        margin: 5px 0;
    }

    .laporan-extruder .small-text {
        font-size: 10px;
    }

    .laporan-extruder .remark {
        height: 60px;
    }

    .laporan-extruder .signature td {
        height: 30px;
    }

    /* =========================
   PRINT ONLY
========================= */
    @media print {
        @page {
            size: A3 portrait;
            margin: 15mm;
        }
    }
</style>

<div class="modal fade" id="modalLaporan" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog custom-modal-width2">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Preview Pemeriksaan Barang</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <button type="button" id="btn_print" class="btn btn-success mb-2">
                    Print
                </button>
                <div class="laporan-extruder">
                    <div class="container mt-2">
                        <table>
                            <tr>
                                <td colspan="2" class="bold center" style="border-bottom:none !important">PT. KERTA
                                    RAJASA RAYA</td>
                                <td class="small-text left"
                                    style="border-right:none !important; border-bottom:none !important"></td>
                                <td colspan="4" class="small-text left"
                                    style="width:200px; border-left:none !important; border-bottom:none !important">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" class="center bold"
                                    style="border-bottom:none !important; border-top:none !important">Woven Bag - Jumbo
                                    Bag Industrial</td>
                                <td class="bold"
                                    style="border-bottom:none !important; border-top:none !important; border-right:none !important">
                                    Tujuan Pengiriman :</td>
                                <td colspan="4" id="tujuanKirimP"
                                    style="border-bottom:none !important; border-top:none !important; border-left:none !important">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" class="center bold" style="border-top:none !important">No. Dokumen:
                                    FM - 7.5 - 06 - BJ - 00 - 01</td>
                                <td colspan="5" style="border-top:none !important"></td>
                            </tr>
                            <tr>
                                <td colspan="6" class="center bold" style="font-size: large">FORM PEMERIKSAAN BARANG
                                </td>
                            </tr>
                        </table>
                        <table>
                            <tr>
                                <td class="bold"
                                    style="width:120px; border-right:none !important; border-bottom:none !important;">
                                    Tanggal Muat</td>
                                <td
                                    style="border-right:none !important; border-left:none !important; border-bottom:none !important">
                                    :</td>
                                <td colspan="3" class=""
                                    style="width: 100px; border-right:none !important; border-left:none !important; border-bottom:none !important;"
                                    id="tanggalMuatP"></td>
                                <td class="bold"
                                    style="width:120px; border-right:none !important; border-left:none !important; border-bottom:none !important;">
                                    Nopol</td>
                                <td
                                    style="border-right:none !important; border-left:none !important; border-bottom:none !important;">
                                    :</td>
                                <td colspan="3" class=""
                                    style="width: 100px; border-left:none !important; border-bottom:none !important;"
                                    id="nopolP"></td>
                            </tr>
                            <tr>
                                <td class="bold"
                                    style="width:120px; border-right:none !important; border-top:none !important;">Jam
                                    Muat</td>
                                <td
                                    style="border-right:none !important; border-left:none !important; border-top:none !important;">
                                    :</td>
                                <td colspan="3" class=""
                                    style="width: 100px; border-right:none !important; border-left:none !important; border-top:none !important;"
                                    id="jamMuatP"></td>
                                <td class="bold"
                                    style="width:120px; border-right:none !important; border-left:none !important; border-top:none !important;">
                                    Instansi</td>
                                <td
                                    style="border-right:none !important; border-left:none !important; border-top:none !important;">
                                    :</td>
                                <td colspan="3" class=""
                                    style="width: 100px; border-left:none !important; border-top:none !important;"
                                    id="instansiP"></td>
                            </tr>
                        </table>
                        <table id="modalItemTable">
                            <thead>
                                <tr>
                                    <td class="center bold" style="width:20px;">No.</td>
                                    <td class="center bold" style="width:120px;">Tipe Barang</td>
                                    <td class="center bold" style="width:50px;">Jam</td>
                                    <td class="center bold" style="width:120px;">Unit</td>
                                    <td class="center bold" style="width:50px;">Total</td>
                                </tr>
                            </thead>
                            <tbody style="border:none !important; border-bottom: 1px solid black !important">
                                <tr>
                                    <td class="center bold" style="width:20px;">&nbsp;</td>
                                    <td class="center bold" style="width:120px;">&nbsp;</td>
                                    <td class="center bold" style="width:50px;">&nbsp;</td>
                                    <td class="center bold" style="width:120px;">&nbsp;</td>
                                    <td class="center bold" style="width:50px;">&nbsp;</td>
                                </tr>
                            </tbody>
                        </table>
                        <table>
                            <tr>
                                <td class="center bold"
                                    style="width:120px; border:none !important; border-top: 1px solid black !important">
                                    Tanda Tangan & Nama Jelas</td>
                                <td class="center bold"
                                    style="width:120px; border:none !important; border-top: 1px solid black !important" id="ttnGudang">
                                    Tanda Tangan & Nama Jelas</td>
                                <td class="center bold"
                                    style="width:120px; border:none !important; border-top: 1px solid black !important">
                                    Tanda Tangan & Nama Jelas</td>
                            </tr>
                            <tr>
                                <td class="center bold" style="width:120px; border:none !important">Satpam</td>
                                <td class="center bold" style="width:120px; border:none !important" id="gdg">Gudang</td>
                                <td class="center bold" style="width:120px; border:none !important">Sopir</td>
                            </tr>
                            <tr>
                                <td class="center bold" style="width:120px; border:none !important">
                                    <img id="ttd_satpam" style="display:none; max-width:200px;">
                                </td>
                                <td class="center bold" style="width:120px; border:none !important">
                                    <img id="ttd_gudang" style="display:none; max-width:200px;">
                                </td>
                                <td class="center bold" style="width:120px; border:none !important">
                                    <img id="ttd_sopir" style="display:none; max-width:200px;">
                                </td>
                            </tr>
                            <tr>
                                <td class="center bold" style="width:120px; border:none !important" id="namaSatpamP">
                                    Nama Satpam</td>
                                <td class="center bold" style="width:120px; border:none !important" id="namaGudangP">
                                    Nama Gudang</td>
                                <td class="center bold" style="width:120px; border:none !important" id="namaSopirP">
                                    Nama Sopir</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    document.getElementById("btn_print").addEventListener("click", function(event) {
        event.preventDefault();

        let printContent = document.querySelector(".laporan-extruder").innerHTML;

        // buka TAB baru
        let printWindow = window.open("", "_blank");

        printWindow.document.write(`
            <html>
            <head>
                <title>Print Laporan</title>
                <style>
                    @page {
                        size: A3 portrait;
                        margin: 15mm;
                    }

                    body {
                        font-family: "Times New Roman", serif;
                        font-size: 12px;
                        color: #000;
                    }

                    .container {
                        width: 100%;
                        border: 1px solid #000;
                        padding: 5px;
                        box-sizing: border-box;
                    }

                    table {
                        border-collapse: collapse;
                        width: 100%;
                    }

                    td, th {
                        border: 1px solid #000;
                        padding: 1px 2px;
                        vertical-align: middle;
                    }

                    .no-border td, .no-border th {
                        border: none;
                    }

                    .center { text-align: center; }
                    .right { text-align: right; }
                    .bold { font-weight: bold; }
                    .small-text { font-size: 10px; }
                </style>
            </head>
            <body>
                ${printContent}
            </body>
            </html>
        `);

        printWindow.document.close();
        printWindow.focus();

        // tunggu render lalu print
        setTimeout(() => {
            printWindow.print();
            printWindow.close(); // boleh dihapus kalau tab mau tetap terbuka
        }, 500);
    });
</script>
