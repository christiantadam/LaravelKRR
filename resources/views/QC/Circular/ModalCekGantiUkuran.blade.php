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
    /* @media print {
        @page {
            size: A3;
            margin: 15mm;
        }
    } */
</style>

<div class="modal fade" id="modalLaporan" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog custom-modal-width2">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Preview Lap. Ganti Ukuran Mesin CL</h5>
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
                                <td colspan="2" class="bold center"
                                    style="width:300px; border-bottom:none !important">PT. KERTA
                                    RAJASA RAYA</td>
                                <td class="bold" style="border-right:none !important; border-bottom:none !important">
                                    No Referensi
                                </td>
                                <td class="bold"
                                    style="border-right:none !important; border-bottom:none !important; border-left:none !important">
                                    :</td>
                                <td colspan="3" class="left"
                                    style="width:200px; border-left:none !important; border-bottom:none !important"
                                    id="no_referensiP">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" class="center bold"
                                    style="border-bottom:none !important; border-top:none !important">Woven Bag - Jumbo
                                    Bag Industrial</td>
                                <td class="bold"
                                    style="border-bottom:none !important; border-top:none !important; border-right:none !important">
                                    Tanggal</td>
                                <td class="bold"
                                    style="border-right:none !important; border-bottom:none !important; border-top:none !important; border-left:none !important">
                                    :</td>
                                <td colspan="3" class="left"
                                    style="border-bottom:none !important; border-top:none !important; border-left:none !important"
                                    id="tanggalP">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" class="center bold" style="border-top:none !important">No. Dokumen:
                                    FM - 8.2 - 03 - QC - 01 - 02</td>
                                <td class="bold" style="border-right:none !important; border-top:none !important">
                                    Halaman
                                </td>
                                <td class="bold"
                                    style="border-right:none !important; border-top:none !important; border-left:none !important">
                                    :</td>
                                <td colspan="3" class="left"
                                    style="width:200px; border-left:none !important; border-top:none !important">01 dari
                                    01
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" class="center bold" style="font-size: large">LAP. GANTI UKURAN MESIN
                                    CL
                                </td>
                                <td colspan="4" class="center bold" style="font-size: large">DIVISI CIRCULAR LOOM
                                </td>
                            </tr>
                        </table>
                        <table>
                            <tr>
                                <td class="bold"
                                    style="width:120px; border-right:none !important; border-bottom:none !important;">
                                    No Mesin</td>
                                <td
                                    style="border-right:none !important; border-left:none !important; border-bottom:none !important">
                                    :</td>
                                <td colspan="3" class=""
                                    style="width: 100px; border-right:none !important; border-left:none !important; border-bottom:none !important;"
                                    id="no_mesinP"></td>
                                <td class="bold"
                                    style="width:120px; border-right:none !important; border-left:none !important; border-bottom:none !important;">
                                    Shift</td>
                                <td
                                    style="border-right:none !important; border-left:none !important; border-bottom:none !important;">
                                    :</td>
                                <td colspan="3" class=""
                                    style="width: 100px; border-left:none !important; border-bottom:none !important;"
                                    id="shiftP"></td>
                            </tr>
                            <tr>
                                <td class="bold"
                                    style="width:120px; border-right:none !important; border-top:none !important;">
                                    Ukuran</td>
                                <td
                                    style="border-right:none !important; border-left:none !important; border-top:none !important;">
                                    :</td>
                                <td colspan="3" class=""
                                    style="width: 100px; border-right:none !important; border-left:none !important; border-top:none !important;"
                                    id="ukuranP"></td>
                                <td class="bold"
                                    style="width:120px; border-right:none !important; border-left:none !important; border-top:none !important;">
                                    Jam</td>
                                <td
                                    style="border-right:none !important; border-left:none !important; border-top:none !important;">
                                    :</td>
                                <td colspan="3" class=""
                                    style="width: 100px; border-left:none !important; border-top:none !important;"
                                    id="jamP"></td>
                            </tr>
                        </table>
                        <table id="modalItemTable">
                            <thead>
                                <tr>
                                    <td class="center bold" style="width:5%;">No.</td>
                                    <td class="center bold" style="width:15%;">Uraian</td>
                                    <td class="center bold" style="width:15%;">Standart</td>
                                    <td class="center bold" style="width:15%;">Toleransi</td>
                                    <td class="center bold" style="width:10%;">Periksa</td>
                                    <td class="center bold" style="width:10%;">Selisih</td>
                                    <td class="center bold" style="width:10%;">Masuk</td>
                                    <td class="center bold" style="width:10%;">Tidak</td>
                                    <td class="center bold" style="width:10%;">Keterangan</td>
                                </tr>
                            </thead>
                            <tbody style="border:none !important; border-bottom: 1px solid black !important">
                                <tr>
                                    <td class="center">1</td>
                                    <td class="">Benang Warp</td>
                                    <td class="center" id="std_waP">&nbsp;</td>
                                    <td class="center" id="toleransi_waP">&nbsp;</td>
                                    <td class="center" id="periksa_waP">&nbsp;</td>
                                    <td class="center" id="selisih_waP">&nbsp;</td>
                                    <td class="center" id="masuk_waP">&nbsp;</td>
                                    <td class="center" id="tidak_waP">&nbsp;</td>
                                    <td class="center" id="keterangan_waP">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td class="center">2</td>
                                    <td class="">Benang Weft</td>
                                    <td class="center" id="std_weP">&nbsp;</td>
                                    <td class="center" id="toleransi_weP">&nbsp;</td>
                                    <td class="center" id="periksa_weP">&nbsp;</td>
                                    <td class="center" id="selisih_weP">&nbsp;</td>
                                    <td class="center" id="masuk_weP">&nbsp;</td>
                                    <td class="center" id="tidak_weP">&nbsp;</td>
                                    <td class="center" id="keterangan_weP">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td class="center">3</td>
                                    <td class="">Warna</td>
                                    <td class="center" id="std_warnaP">&nbsp;</td>
                                    <td class="center" id="toleransi_warnaP">&nbsp;</td>
                                    <td class="center" id="periksa_warnaP">&nbsp;</td>
                                    <td class="center" id="selisih_warnaP">&nbsp;</td>
                                    <td class="center" id="masuk_warnaP">&nbsp;</td>
                                    <td class="center" id="tidak_warnaP">&nbsp;</td>
                                    <td class="center" id="keterangan_warnaP">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td class="center">4</td>
                                    <td class="">Dropper</td>
                                    <td class="center" id="std_dropperP">&nbsp;</td>
                                    <td class="center" id="toleransi_dropperP">&nbsp;</td>
                                    <td class="center" id="periksa_dropperP">&nbsp;</td>
                                    <td class="center" id="selisih_dropperP">&nbsp;</td>
                                    <td class="center" id="masuk_dropperP">&nbsp;</td>
                                    <td class="center" id="tidak_dropperP">&nbsp;</td>
                                    <td class="center" id="keterangan_dropperP">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td class="center">5</td>
                                    <td class="">Guarding</td>
                                    <td class="center" id="std_guadringP">&nbsp;</td>
                                    <td class="center" id="toleransi_guadringP">&nbsp;</td>
                                    <td class="center" id="periksa_guadringP">&nbsp;</td>
                                    <td class="center" id="selisih_guadringP">&nbsp;</td>
                                    <td class="center" id="masuk_guadringP">&nbsp;</td>
                                    <td class="center" id="tidak_guadringP">&nbsp;</td>
                                    <td class="center" id="keterangan_guadringP">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td class="center">6</td>
                                    <td class="">Jumlah Benang Warp</td>
                                    <td class="center" id="std_jmlWAP">&nbsp;</td>
                                    <td class="center" id="toleransi_jmlWAP">&nbsp;</td>
                                    <td class="center" id="periksa_jmlWAP">&nbsp;</td>
                                    <td class="center" id="selisih_jmlWAP">&nbsp;</td>
                                    <td class="center" id="masuk_jmlWAP">&nbsp;</td>
                                    <td class="center" id="tidak_jmlWAP">&nbsp;</td>
                                    <td class="center" id="keterangan_jmlWAP">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td class="center">7</td>
                                    <td class="">Change Gear</td>
                                    <td class="center" id="std_cgP">&nbsp;</td>
                                    <td class="center" id="toleransi_cgP">&nbsp;</td>
                                    <td class="center" id="periksa_cgP">&nbsp;</td>
                                    <td class="center" id="selisih_cgP">&nbsp;</td>
                                    <td class="center" id="masuk_cgP">&nbsp;</td>
                                    <td class="center" id="tidak_cgP">&nbsp;</td>
                                    <td class="center" id="keterangan_cgP">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td class="center">8</td>
                                    <td class="">Mutu Rajutan</td>
                                    <td class="center" id="std_mrP">&nbsp;</td>
                                    <td class="center" id="toleransi_mrP">&nbsp;</td>
                                    <td class="center" id="periksa_mrP">&nbsp;</td>
                                    <td class="center" id="selisih_mrP">&nbsp;</td>
                                    <td class="center" id="masuk_mrP">&nbsp;</td>
                                    <td class="center" id="tidak_mrP">&nbsp;</td>
                                    <td class="center" id="keterangan_mrP">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td class="center">9</td>
                                    <td class="">Berat Karung per-meter</td>
                                    <td class="center" id="std_bkP">&nbsp;</td>
                                    <td class="center" id="toleransi_bkP">&nbsp;</td>
                                    <td class="center" id="periksa_bkP">&nbsp;</td>
                                    <td class="center" id="selisih_bkP">&nbsp;</td>
                                    <td class="center" id="masuk_bkP">&nbsp;</td>
                                    <td class="center" id="tidak_bkP">&nbsp;</td>
                                    <td class="center" id="keterangan_bkP">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td class="center">10</td>
                                    <td class="">Lebar Karung</td>
                                    <td class="center" id="std_lkP">&nbsp;</td>
                                    <td class="center" id="toleransi_lkP">&nbsp;</td>
                                    <td class="center" id="periksa_lkP">&nbsp;</td>
                                    <td class="center" id="selisih_lkP">&nbsp;</td>
                                    <td class="center" id="masuk_lkP">&nbsp;</td>
                                    <td class="center" id="tidak_lkP">&nbsp;</td>
                                    <td class="center" id="keterangan_lkP">&nbsp;</td>
                                </tr>
                                <tr style="display: none">
                                    <td class="center">11</td>
                                    <td class="">Lebar Karung</td>
                                    <td class="center" id="std_lk2P">&nbsp;</td>
                                    <td class="center" id="toleransi_lk2P">&nbsp;</td>
                                    <td class="center" id="periksa_lk2P">&nbsp;</td>
                                    <td class="center" id="selisih_lk2P">&nbsp;</td>
                                    <td class="center" id="masuk_lk2P">&nbsp;</td>
                                    <td class="center" id="tidak_lk2P">&nbsp;</td>
                                    <td class="center" id="keterangan_lk2P">&nbsp;</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="" class="center" style="border-right:none !important">Catatan:
                                    </td>
                                    <td colspan="8" style="border-left:none !important" id="catatanP">&nbsp;</td>
                                </tr>
                            </tfoot>
                        </table>
                        <table>
                            <tr>
                                <td class="bold" style="width:15%; border:none !important;">
                                    Tanggal Ganti Ukuran</td>
                                <td class="bold" style="border:none !important;" id="tanggal_gantiUkuranP">&nbsp;
                                </td>

                            </tr>
                            <tr>
                                <td class="bold" style="border:none !important" id="namaSatpamP">
                                    Tanggal Cek</td>
                                <td class="bold" style="border:none !important" id="tanggal_cekP">
                                    &nbsp;</td>
                            </tr>
                        </table>
                        <table>
                            <tr>
                                <td class="center bold"
                                    style="width:30%; border:none !important; border-top: 1px solid black !important">
                                    QC</td>
                                <td class="center bold"
                                    style="border:none !important; border-top: 1px solid black !important">
                                    Circular</td>
                                <td class="center bold"
                                    style="border:none !important; border-top: 1px solid black !important">
                                    Supervisor QC</td>
                            </tr>
                            <tr>
                                <td class="center bold" style="border:none !important">
                                    <img id="ttd_qc" style="display:none; max-width:200px;">
                                </td>
                                <td class="center bold" style="border:none !important">
                                    <img id="ttd_ksqc" style="display:none; max-width:200px;">
                                </td>
                                <td class="center bold" style="border:none !important">
                                    <img id="ttd_spqc" style="display:none; max-width:200px;">
                                </td>
                            </tr>
                            <tr>
                                <td class="center bold" style="border:none !important" id="nama_qcP">
                                    Nama QC</td>
                                <td class="center bold" style="border:none !important" id="nama_ksqcP">
                                    Nama KS. CL</td>
                                <td class="center bold" style="border:none !important" id="nama_spqcP">
                                    Nama SP. QC</td>
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
                        size: A3 landscape;
                        margin: 1mm;
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
