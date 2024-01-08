//#region Variables
const txtSuratJalan = document.getElementById("surat_jalan");
const txtScanBarcode = document.getElementById("scan_bar");
const spnJumlahItem = document.getElementById("jmlh_item");
const spnTervalidasi = document.getElementById("tervalidasi");
const spnSite = document.getElementById("site_lbl");

const btnSJ_JBK = document.getElementById("btn_sj_jbk");
const btnSJ_WVN = document.getElementById("btn_sj_wvn");
const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");

const listTerima = [];
/** ISI LIST TERIMA
 * 0 IdType *hidden
 * 1 NoBarcode *hidden
 * 2 NamaType
 * 3 Primer
 * 4 Sekunder
 * 5 Tritier
 * 6 Status
 * 7 NoBttb
 */

var tableTerima = null;
var kSite = -1;
//#endregion

//#region Events
btnSJ_JBK.addEventListener("click", function () {
    txtScanBarcode.value = "";
    txtSuratJalan.value = "";

    kSite = 1;
    modalLihatSJ(kSite);
    spnSite.textContent = "Daftar Terima - JBN & JBK";
});

btnSJ_WVN.addEventListener("click", function () {
    txtScanBarcode.value = "";
    txtSuratJalan.value = "";

    kSite = 2;
    modalLihatSJ(kSite);
    spnSite.textContent = "Daftar Terima - Woven Nganjuk";
});

btnProses.addEventListener("click", function () {
    if (txtSuratJalan.value.trim() == "") {
        return;
    }

    fetchSelect(
        "/warehouseTerima/SP_1273_INV_Select_SumPenerimaanKRR2/" +
            txtSuratJalan.value.trim() +
            "~" +
            kSite,
        (data) => {
            for (let i = 0; i < data.length; i++) {
                fetchStmt(
                    "/warehouseTerima/SP_1273_INV_ACCGUDANG_BARCODEKRR/" +
                        data[i].Id_Type +
                        "~" +
                        data[i].JmlPrimer +
                        "~" +
                        data[i].JmlSekunder +
                        "~" +
                        data[i].JmlTritier +
                        "~" +
                        data[i].Penerima +
                        "~" +
                        data[i].Tgl_Terima +
                        "~" +
                        data[i].Uraian +
                        "~" +
                        txtSuratJalan.value.trim() +
                        "~" +
                        data[i].Kode_barang +
                        "~" +
                        data[i].No_BTTB +
                        "~" +
                        kSite,
                    () => {
                        if (i == data.length - 1) {
                            txtSuratJalan.value = "";
                            txtScanBarcode.value = "";
                            listTerima.length = 0;
                            clearTable_DataTable("table_terima", 6);
                            spnJumlahItem.textContent = "0";
                            spnTervalidasi.textContent = "0";
                            btnProses.disabled = false;
                            btnKeluar.focus();
                        }
                    }
                );
            }
        }
    );
});

txtScanBarcode.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        validasiItems(this.value.trim(), kSite);
        this.value = this.value.trim().substr(-9);
        this.focus();
    }
});
//#endregion

//#region Functions
function validasiBarcode(s_no_barcode) {
    try {
        let my_search_char = "-";

        // No Indeks
        let no_indeks;
        let my_start = 1;
        let my_pos = s_no_barcode.indexOf(my_search_char, my_start);
        no_indeks = s_no_barcode.substring(0, my_pos).trim();
        let long_no_indeks = no_indeks.length;
        let bln_no_index = long_no_indeks === 9;

        // Kode Barang
        let kd_barang;
        my_start = my_pos + 1;
        my_pos = s_no_barcode.indexOf(my_search_char, my_start);
        if (my_pos === -1) {
            kd_barang = s_no_barcode.substring(my_start).trim();
        } else kd_barang = s_no_barcode.substring(my_start, my_pos).trim();
        let long_kd_barang = kd_barang.length;
        let bln_kd_barang = long_kd_barang === 9;

        return bln_no_index && bln_kd_barang;
    } catch (err) {
        console.error(err.message);
    }
}

function validasiItems(s_no_barcode, site) {
    if (listTerima.length > 0) {
        for (let i = 0; i < listTerima.length; i++) {
            if (listTerima[i].NoBarcode.trim() == s_no_barcode.trim()) {
                fetchSelect(
                    "/warehouseTerima/SPUpdate_ValidasiTerimaDariKRR2/" +
                        s_no_barcode.trim() +
                        "~" +
                        site,
                    () => {
                        tableTerima.rows().every(function () {
                            let rowData = this.data();
                            if (rowData.NoBarcode == listTerima[i].NoBarcode) {
                                $(this.node()).addClass("row_hijau");
                            }
                        });

                        listTerima[i].Status = "1";
                        spnTervalidasi.textContent =
                            parseFloat(spnTervalidasi.textContent) + 1;
                        return;
                    }
                );

                break;
            }
        }
    }
}

function getTypeBarang(s_kd_barang) {
    fetchSelect(
        "/warehouseTerima/spSelect_IdType_KelebihanBarang/" +
            s_kd_barang.trim(),
        (data) => {
            return data[0].IdType;
        }
    );
}

function loadDataFromServer(no_sj, kd_div) {
    clearTable_DataTable("table_terima", 6, "Memuat data...");
    listTerima.length = 0;

    let kode = kd_div == 1 ? 1 : 2;
    fetchSelect(
        "/warehouseTerima/spSelect_TerimaDariKRR2/" + no_sj.trim() + "~" + kode,
        (data) => {
            let pushedList = [];
            for (let i = 0; i < data.length; i++) {
                listTerima.push({
                    IdType: data[i].IdType,
                    NoBarcode: data[i].No_Barcode,
                    NamaType: data[i].NamaType,
                    Primer: data[i].Primer,
                    Sekunder: data[i].Sekunder,
                    Tritier: data[i].Tritier,
                    Status: data[i].Status,
                    NoBttb: data[i].No_BTTB,
                });

                pushedList.push({
                    NamaType: data[i].NamaType,
                    Primer: data[i].Primer,
                    Sekunder: data[i].Sekunder,
                    Tritier: data[i].Tritier,
                    Status: data[i].Status,
                    NoBttb: data[i].No_BTTB,
                });

                if (kd_div == 2 && data[i].Status == -1) {
                    spnTervalidasi.textContent =
                        parseFloat(spnTervalidasi.textContent) + 1;
                } else if (kd_div != 2 && data[i].Status == 2) {
                    spnTervalidasi.textContent =
                        parseFloat(spnTervalidasi.textContent) + 1;
                }
            }

            let cek_status = 0;
            if (kd_div == 2) {
                cek_status = -1;
            } else cek_status = 2;

            if (data.length > 0) {
                addTable_DataTable(
                    "table_terima",
                    pushedList,
                    null,
                    null,
                    null,
                    ["colored_row", cek_status]
                );

                txtScanBarcode.value = "";
                txtScanBarcode.focus();
            } else {
                clearTable_DataTable(
                    "table_terima",
                    6,
                    "Data untuk <b>No. SJ - " +
                        confirmedData.NoSJ +
                        "</b> tidak ditemukan."
                );

                btnSJ_JBK.focus();
            }
        }
    );
}

function modalLihatSJ(kd_div) {
    let kode_sp = kd_div == 1 ? 1 : 2;
    fetchSelect("/warehouseTerima/SP_1003_JBM_LHTNOPOL/" + kode_sp, (data) => {
        for (let i = 0; i < data.length; i++) {
            TD_listTable.push({
                NoSJ: data[i].NoSJ,
                TglKirim: dateTimeToDate(data[i].Tgl_Kirim),
                NoPol: data[i].NoPol,
            });
        }

        [TD_tableId, TD_tableName, TD_formTitle, TD_keyStr] = [
            "table_surat_jalan",
            "Tabel surat jalan...",
            "Lihat Data Surat Jalan",
            "NoSJ",
        ];

        TD_colTable = 3;
        TD_strTable = `
            <table id="${TD_tableId}" class="hover cell-border">
                <thead>
                    <tr>
                        <th>No. SJ</th>
                        <th>Tgl. Kirim</th>
                        <th>No. Pol</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        `;

        $("#form_lihat_data").modal({ backdrop: "static", keyboard: false });
        $("#form_lihat_data").modal("show");
    });
}

function fetchModalResult(resModal) {
    /**
     * Data dalam bentuk JSON
     */

    $("#form_lihat_data").modal("hide");
    loadDataFromServer(resModal.NoSJ, kSite);
}

function testingRowWarna() {
    listTerima.push({
        NamaType: "halo123",
        Primer: "halo123",
        Sekunder: "halo123",
        Tritier: "halo123",
        Status: 0,
        NoBttb: "halo123",
    });

    listTerima.push({
        NamaType: "halo123",
        Primer: "halo123",
        Sekunder: "halo123",
        Tritier: "halo123",
        Status: 0,
        NoBttb: "halo123",
    });

    listTerima.push({
        NamaType: "halo123",
        Primer: "halo123",
        Sekunder: "halo123",
        Tritier: "halo123",
        Status: -1,
        NoBttb: "halo123",
    });

    listTerima.push({
        NamaType: "halo123",
        Primer: "halo123",
        Sekunder: "halo123",
        Tritier: "halo123",
        Status: 0,
        NoBttb: "halo123",
    });

    addTable_DataTable("table_terima", listTerima, null, null, null, [
        "colored_row",
        -1,
    ]);
}
//#endregion

function init() {
    tableTerima = $("#table_terima").DataTable({
        responsive: true,
        paging: false,
        scrollY: "250px",
        scrollX: "",
        dom: '<"row"<"col-sm-6"i><"col-sm-6"f>>' + '<"row"<"col-sm-12"tr>>',
        language: {
            searchPlaceholder: " Tabel terima...",
            search: "",
        },

        initComplete: () => {
            var searchInput = $('input[type="search"]:last').addClass(
                "form-control"
            );

            searchInput.wrap('<div class="input-group"></div>');
            searchInput.before('<span class="input-group-text">Cari:</span>');
        },
    });

    clearTable_DataTable("table_terima", 6);
    // testingRowWarna();
}

$(document).ready(() => init());

btnKeluar.addEventListener("click", function () {
    window.location.href = "/Extruder/WarehouseTerima";
});
