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
    .laporan-extruderCustomer {
        font-family: "Times New Roman", serif;
        font-size: 12px;
        color: #000;
    }

    .laporan-extruderCustomer .container {
        width: 100%;
        border: 1px solid #000;
        padding: 5px;
        box-sizing: border-box;
    }

    .laporan-extruderCustomer table {
        border-collapse: collapse;
        width: 100%;
    }

    .laporan-extruderCustomer td,
    .laporan-extruderCustomer th {
        border: 1px solid #000;
        padding: 1px 2px;
        vertical-align: middle;
    }

    .laporan-extruderCustomer .no-border td,
    .laporan-extruderCustomer .no-border th {
        border: none;
    }

    .laporan-extruderCustomer .center {
        text-align: center;
    }

    .laporan-extruderCustomer .right {
        text-align: right;
    }

    .laporan-extruderCustomer .bold {
        font-weight: bold;
    }

    .laporan-extruderCustomer .section-title {
        font-weight: bold;
        text-align: center;
        margin: 5px 0;
    }

    .laporan-extruderCustomer .small-text {
        font-size: 10px;
    }

    .laporan-extruderCustomer .remark {
        height: 60px;
    }

    .laporan-extruderCustomer .signature td {
        height: 30px;
    }

    #foto_pengirimanContainerCustomer {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
    }

    #foto_pengirimanContainerCustomer img {
        width: 500px;
        height: auto;
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

<div class="modal fade" id="modalLaporanCustomer" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog custom-modal-width2">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Preview Pemeriksaan Barang</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <button type="button" id="btn_printCustomer" class="btn btn-success mb-2">
                    Print
                </button>
                <div class="laporan-extruderCustomer">
                    <div class="container mt-2">
                        <table>
                            <tr>
                                <td class="bold center" style="border-bottom:none !important">PT. KERTA
                                    RAJASA RAYA</td>
                            </tr>
                            <tr>
                                <td class="center bold"
                                    style="border-bottom:none !important; border-top:none !important">Woven Bag - Jumbo
                                    Bag Industrial</td>
                            </tr>
                            <tr>
                                <td class="center bold" style="border-top:none !important">No. Dokumen:
                                    FM - 7.5 - 06 - BJ - 00 - 01</td>
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
                                    id="customer_tanggalMuatP"></td>
                                <td class="bold"
                                    style="width:120px; border-right:none !important; border-left:none !important; border-bottom:none !important;">
                                    Nopol</td>
                                <td
                                    style="border-right:none !important; border-left:none !important; border-bottom:none !important;">
                                    :</td>
                                <td colspan="3" class=""
                                    style="width: 100px; border-left:none !important; border-bottom:none !important;"
                                    id="customer_nopolP"></td>
                            </tr>
                            <tr>
                                <td class="bold"
                                    style="width:120px; border-right:none !important; border-top:none !important;border-bottom:none !important;">
                                    Jam Muat</td>
                                <td
                                    style="border-right:none !important; border-left:none !important; border-top:none !important;border-bottom:none !important;">
                                    :</td>
                                <td colspan="3" class=""
                                    style="width: 100px; border-right:none !important; border-left:none !important; border-top:none !important;border-bottom:none !important;"
                                    id="customer_jamMuatP"></td>
                                <td class="bold"
                                    style="width:120px; border-right:none !important; border-left:none !important; border-top:none !important;border-bottom:none !important;">
                                    Instansi</td>
                                <td
                                    style="border-right:none !important; border-left:none !important; border-top:none !important;border-bottom:none !important;">
                                    :</td>
                                <td colspan="3" class=""
                                    style="width: 100px; border-left:none !important; border-top:none !important;border-bottom:none !important;"
                                    id="customer_instansiP"></td>
                            </tr>
                            <tr>
                                <td class="bold"
                                    style="width:120px; border-right:none !important; border-top:none !important;border-bottom:none !important;">
                                    Tujuan Pengiriman</td>
                                <td
                                    style="border-right:none !important; border-left:none !important; border-top:none !important;border-bottom:none !important;">
                                    :</td>
                                <td colspan="3" class=""
                                    style="width: 100px; border-right:none !important; border-left:none !important; border-top:none !important;border-bottom:none !important;"
                                    id="customer_tujuanKirim"></td>
                                <td class="bold"
                                    style="width:120px; border-right:none !important; border-left:none !important; border-top:none !important;border-bottom:none !important;">
                                    No. Seal / Container</td>
                                <td
                                    style="border-right:none !important; border-left:none !important; border-top:none !important;border-bottom:none !important;">
                                    :</td>
                                <td colspan="3" class=""
                                    style="width: 100px; border-left:none !important; border-top:none !important;border-bottom:none !important;"
                                    id="customer_sealContainer"></td>
                            </tr>
                            <tr>
                                <td class="bold"
                                    style="width:120px; border-right:none !important; border-top:none !important;">
                                    Surat Jalan</td>
                                <td
                                    style="border-right:none !important; border-left:none !important; border-top:none !important;">
                                    :</td>
                                <td colspan="8" class=""
                                    style="width: 100px; border-left:none !important; border-top:none !important;"
                                    id="customer_suratJalan"></td>
                            </tr>
                        </table>
                        <table id="customer_modalItemTable">
                            <thead>
                                <tr>
                                    <td class="center bold" style="width:5%;">No.</td>
                                    <td class="center bold" style="width:27.5%;">Tipe Barang</td>
                                    <td class="center bold" style="width:10%;">Jam</td>
                                    <td class="center bold" style="width:15%;">Unit</td>
                                    <td class="center bold" style="width:15%;">Total</td>
                                </tr>
                            </thead>
                            <tbody style="border:none !important; border-bottom: 1px solid black !important">
                                <tr>
                                    <td class="center bold" style="width:5%;">&nbsp;</td>
                                    <td class="center bold" style="width:27.5%;">&nbsp;</td>
                                    <td class="center bold" style="width:10%;">&nbsp;</td>
                                    <td class="center bold" style="width:15%;">&nbsp;</td>
                                    <td class="center bold" style="width:15%;">&nbsp;</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td class="right" style="width:10%;border:none !important;">Keterangan:</td>
                                    <td class="pl-2 pr-2" style="width: 90%;border:none !important;" colspan="4"
                                        id="customer_kolomKeterangan"></td>
                                </tr>
                            </tfoot>
                        </table>
                        <table>
                            <tr>
                                <td class="center bold"
                                    style="width:120px; border:none !important; border-top: 1px solid black !important">
                                    Tanda Tangan & Nama Jelas</td>
                                <td class="center bold"
                                    style="width:120px; border:none !important; border-top: 1px solid black !important"
                                    id="customer_ttnSatpam2">
                                    Tanda Tangan & Nama Jelas</td>
                                <td class="center bold"
                                    style="width:120px; border:none !important; border-top: 1px solid black !important"
                                    id="customer_ttnGudang">
                                    Tanda Tangan & Nama Jelas</td>
                                <td class="center bold"
                                    style="width:120px; border:none !important; border-top: 1px solid black !important">
                                    Tanda Tangan & Nama Jelas</td>
                            </tr>
                            <tr>
                                <td class="center bold" style="width:120px; border:none !important">Satpam</td>
                                <td class="center bold" style="width:120px; border:none !important"
                                    id="customer_spm">
                                    Satpam</td>
                                <td class="center bold" style="width:120px; border:none !important"
                                    id="customer_gdg">
                                    Mengetahui</td>
                                <td class="center bold" style="width:120px; border:none !important">Sopir</td>
                            </tr>
                            <tr>
                                <td class="center bold" style="width:120px; border:none !important">
                                    <img id="customer_ttd_satpam" style="display:none; max-width:200px;">
                                </td>
                                <td class="center bold" style="width:120px; border:none !important">
                                    <img id="customer_ttd_satpam2" style="display:none; max-width:200px;">
                                </td>
                                <td class="center bold" style="width:120px; border:none !important">
                                    <img id="customer_ttd_gudang" style="display:none; max-width:200px;">
                                </td>
                                <td class="center bold" style="width:120px; border:none !important">
                                    <img id="customer_ttd_sopir" style="display:none; max-width:200px;">
                                </td>
                            </tr>
                            <tr>
                                <td class="center bold" style="width:120px; border:none !important"
                                    id="customer_namaSatpamP">
                                    Nama Satpam</td>
                                <td class="center bold" style="width:120px; border:none !important"
                                    id="customer_namaSatpamP2">
                                    Nama Satpam</td>
                                <td class="center bold" style="width:120px; border:none !important"
                                    id="customer_namaGudangP">
                                    Nama Gudang</td>
                                <td class="center bold" style="width:120px; border:none !important"
                                    id="customer_namaSopirP">
                                    Nama Sopir</td>
                            </tr>
                        </table>
                        <div id="foto_pengirimanContainerCustomer">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    document.getElementById("btn_printCustomer").addEventListener("click", function(event) {
        event.preventDefault();

        let printContentCustomer = document.querySelector(".laporan-extruderCustomer").innerHTML;

        // buka TAB baru
        let printWindowCustomer = window.open("", "_blank");

        printWindowCustomer.document.write(`
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

                    #foto_pengirimanContainerCustomer {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 10px;
                    }

                    #foto_pengirimanContainerCustomer img {
                        width: 450px;
                        height: auto;
                    }

                    .center { text-align: center; }
                    .right { text-align: right; }
                    .bold { font-weight: bold; }
                    .small-text { font-size: 10px; }
                </style>
            </head>
            <body>
                ${printContentCustomer}
            </body>
            </html>
        `);

        printWindowCustomer.document.close();
        printWindowCustomer.focus();

        // tunggu render lalu print
        setTimeout(() => {
            printWindowCustomer.print();
            printWindowCustomer.close(); // boleh dihapus kalau tab mau tetap terbuka
        }, 500);
    });
</script>
