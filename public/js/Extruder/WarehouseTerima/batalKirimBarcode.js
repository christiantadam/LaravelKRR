//#region Variables
const slcDivisi = document.getElementById("select_divisi");
const btnHapus = document.getElementById("btn_hapus");
const btnKeluar = document.getElementById("btn_keluar");
const hidFormName = document.getElementById("form_name");

const listBarcode = [];
/** ISI LIST BARCODE
 * 0 NamaType
 * 1 KodeBarcode
 * 2 NamaSubKelompok
 * 3 NamaKelompok
 * 4 KodeBarang
 * 5 NoIndeks
 * 6 QtyPrimer
 * 7 QtySekunder
 * 8 Qty
 * 9 TglMutasi
 * 10 Divisi
 */

const colBarcode = [
    { width: "200px" }, // Type
    { width: "200px" }, // No. Barcode
    { width: "125px" }, // Sub-kelompok
    { width: "1px" }, // Kelompok
    { width: "125px" }, // Kode Barang
    { width: "100px" }, // No. Indeks
    { width: "1px" }, // Primer
    { width: "1px" }, // Sekunder
    { width: "1px" }, // Tritier
    { width: "100px" }, // Tanggal
    { width: "1px" }, // Divisi
];

var pilBarcode = -1;
var checkboxesBatal = null;
var [sp_select, sp_update] = ["", ""];
//#endregion

//#region Events
slcDivisi.addEventListener("change", function () {
    showData();
});

btnHapus.addEventListener("click", function () {
    showModal(
        "Konfirmasi",
        "Apakah anda yakin mau membatalkan pengiriman barcode ini?",
        () => {
            fetchStmt(
                "/warehouseTerima/" +
                    sp_update +
                    "/" +
                    listBarcode[pilBarcode].KodeBarang +
                    "~" +
                    listBarcode[pilBarcode].NoIndeks,
                () => {
                    alert("Pengiriman Berhasil Dibatalkan");
                    showData();
                }
            );
        }
    );
});
//#endregion

//#region Functions
function showData() {
    listBarcode.length = 0;
    clearTable_DataTable("table_barcode", colBarcode.length, "Memuat data...");

    fetchSelect(
        "/warehouseTerima/" + sp_select + "/2~" + slcDivisi.value,
        (data) => {
            for (let i = 0; i < data.length; i++) {
                listBarcode.push({
                    NamaType: data[i].NamaType,
                    KodeBarcode:
                        data[i].NoIndeks.padStart(9, "0") +
                        "-" +
                        data[i].Kode_barang.padStart(9, "0"),
                    NamaSubKelompok: data[i].NamaSubKelompok,
                    NamaKelompok: data[i].NamaKelompok,
                    KodeBarang: data[i].Kode_barang,
                    NoIndeks: data[i].NoIndeks,
                    QtyPrimer: data[i].Qty_Primer,
                    QtySekunder: data[i].Qty_sekunder,
                    Qty: data[i].Qty,
                    TglMutasi: dateTimeToDate(data[i].Tgl_mutasi),
                    Divisi: data[i].Divisi,
                });
            }

            if (listBarcode.length > 0) {
                addTable_DataTable(
                    "table_barcode",
                    listBarcode.map((item) => {
                        return {
                            ...item,
                            NamaType: `<input class="form-check-input" type="checkbox" value="${item.KodeBarcode}" name="checkbox_barcode"> ${item.NamaType}`,
                        };
                    }),
                    colBarcode,
                    rowClickedBarcode
                );

                checkboxesBatal = document.querySelectorAll(
                    'input[name="checkbox_barcode"]'
                );
            } else {
                clearTable_DataTable(
                    "table_barcode",
                    colBarcode.length,
                    "Tidak ditemukan Data Barcode."
                );
            }
        }
    );
}

function rowClickedBarcode(row, data, index) {
    if (
        pilBarcode ==
        findClickedRowInList(listBarcode, "KodeBarcode", data.KodeBarcode)
    ) {
        row.style.background = "white";
        pilBarcode = -1;
        checkboxesBatal[index].checked = false;
    } else {
        clearSelection_DataTable("table_barcode");
        clearCheckedBoxes(checkboxesBatal, checkboxesBatal[index]);

        row.style.background = "aliceblue";
        checkboxesBatal[index].checked = true;
        pilBarcode = findClickedRowInList(
            listBarcode,
            "KodeBarcode",
            data.KodeBarcode
        );
    }
}
//#endregion

function init() {
    $("#table_barcode").DataTable({
        responsive: true,
        paging: false,
        scrollY: "250px",
        scrollX: "1000000px",
        columns: colBarcode,
        dom: '<"row"<"col-sm-6"i><"col-sm-6"f>>' + '<"row"<"col-sm-12"tr>>',
        language: {
            searchPlaceholder: " Tabel barcode...",
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

    clearTable_DataTable("table_barcode", colBarcode.length);

    switch (hidFormName.value) {
        case "formBatalAssesoris":
            sp_select = "SP_1273_INV_ListBarcodeBahanBaku_Mojo";
            sp_update = "SP_5409_INV_SimpanPembatalanKirimKeGudang";
            break;

        case "formBatalGelondongan":
            sp_select = "SP_1273_INV_ListBarcodeBahanBaku";
            sp_update = "SP_1273_LMT_SimpanPembatalanKirimKeGudang";
            break;

        default:
            break;
    }
}

$(document).ready(() => init());

btnKeluar.addEventListener("click", function () {
    window.location.href = "/Extruder/WarehouseTerima";
});
