//#region Variables
const dateInput = document.getElementById("tanggal");
const listOfInput = document.querySelectorAll(".card .form-control");

const txtSpek = document.getElementById("spek");
const txtJmlhOrder = document.getElementById("jmlh_order");
const txtJmlhProd = document.getElementById("jmlh_produksi");
const txtKeterangan = document.getElementById("keterangan");

const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");

const slcOrder = document.getElementById("select_order");
const slcStatus = document.getElementById("select_status");

var counterOrder = 0;
var counterStatus = 0;

const namaGedung = document.getElementById("nama_gedung").value;
var idDivisi = "";
switch (namaGedung) {
    case "B":
        idDivisi = "MEX";
        break;

    case "D":
        idDivisi = "DEX";
        break;

    default:
        idDivisi = "EXT";
        break;
}

const listOrder = [];
/* ISI LIST ORDER
    0 TanggalOrder
    1 TypeBenang
    2 JumlahTritier
    3 JumlahProduksiTritier
*/

const tableOrderCol = [
    { width: "225px" },
    { width: "500px" },
    { width: "225px" },
    { width: "225px" },
];

var terpilih = -1;
//#endregion

//#region Events
slcOrder.addEventListener("keydown", function (event) {
    if (event.key === "Enter") counterOrder += 1;
});

slcOrder.addEventListener("click", function () {
    counterOrder += 1;

    if ((counterOrder %= 2) == 0) {
        counterOrder = 0;

        listOfInput.forEach((input) => (input.value = ""));
        clearTable_DataTable(
            "table_order",
            tableOrderCol.length,
            "Memuat data..."
        );
        fetchSelect("/Order/getListOrderBtl/" + slcOrder.value, (data) => {
            listOrder.length = 0;
            for (let i = 0; i < data.length; i++) {
                listOrder.push({
                    TanggalOrder: dateTimeToDate(data[i].TanggalOrder),
                    TypeBenang: data[i].TypeBenang,
                    JumlahTritier: data[i].JumlahTritier,
                    JumlahProduksiTritier: data[i].JumlahProduksiTritier,
                });
            }

            if (data.length > 0) {
                addTable_DataTable(
                    "table_order",
                    listOrder,
                    tableOrderCol,
                    rowClicked
                );
            } else
                clearTable_DataTable(
                    "table_order",
                    tableOrderCol,
                    "Tidak ditemukan data untuk <b>Order " + slcOrder + "</b>."
                );

            window.scrollTo(0, document.body.scrollHeight);
        });

        slcStatus.focus();
    }
});

slcStatus.addEventListener("keydown", function (event) {
    if (event.key === "Enter") counterStatus += 1;
});

slcStatus.addEventListener("change", function () {
    counterStatus += 1;

    if ((counterStatus %= 2) == 0) {
        counterStatus = 0;
        if (this.value != "-- Pilih Status --") txtKeterangan.focus();
    }
});

txtKeterangan.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        btnProses.disabled = false;
        btnProses.focus();
    }
});

btnProses.addEventListener("click", function () {
    if (slcStatus.value == "-- Pilih Status --") {
        alert("Status masih belum terpilih!");
        slcStatus.focus();
    } else if (txtKeterangan.value == "") {
        alert("Keterangan masih belum terisi!");
        txtKeterangan.focus();
    } else {
        // SP_5298_EXT_STATUS_ORDER
        fetchStmt(
            "/Order/updStatusOrder/" +
                slcOrder.value +
                "/" +
                slcStatus.value +
                "/" +
                toSnakeCase(txtKeterangan.value)
        );

        listOrder.length = 0;
        clearTable_DataTable("table_order", tableOrderCol.length);

        btnProses.disabled = true;
        clearData();

        // Memperbarui data pada slcOrder
        clearOptions(slcOrder);
        const errorOption = addLoadingOption(slcOrder);
        const optionKeys = {
            valueKey: "IdOrder",
            textKey: "Identifikasi",
        };

        // SP_5298_EXT_LIST_BATAL_ORDER
        fetchSelect(
            "/Order/getListBatalOrd/" + idDivisi,
            (data) => {
                if (data.length > 0) {
                    addOptions(slcOrder, data, optionKeys);
                    slcOrder.removeChild(errorOption);
                }
            },
            errorOption
        );

        alert("Data telah diproses!");
    }
});

btnKeluar.addEventListener("click", function () {
    window.location.href = "/Extruder/ExtruderNet";
});

btnProses.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") btnKeluar.focus();
});

btnKeluar.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") btnProses.focus();
});
//#endregion

//#region Functions
function clearData() {
    slcOrder.selectedIndex = 0;
    slcStatus.selectedIndex = 0;
    listOfInput.forEach((input) => (input.value = ""));
}

function rowClicked(row, data, _) {
    if (
        terpilih ==
        findClickedRowInList(listOrder, "TypeBenang", data.TypeBenang)
    ) {
        row.style.background = "white";
        terpilih = -1;

        listOfInput.forEach((input) => {
            if (input.id != "keterangan") input.value = "";
        });
    } else {
        clearSelection_DataTable("table_order");
        row.style.background = "aliceblue";
        terpilih = findClickedRowInList(
            listOrder,
            "TypeBenang",
            data.TypeBenang
        );

        dateInput.value = data.TanggalOrder;
        txtSpek.value = data.TypeBenang;
        txtJmlhOrder.value = data.JumlahTritier;
        txtJmlhProd.value = data.JumlahProduksiTritier;
    }
}

function init() {
    $("#table_order").DataTable({
        responsive: true,
        paging: false,
        scrollY: "250px",
        scrollX: "1000000px",
        columns: tableOrderCol,
        dom: '<"row"<"col-sm-6"i><"col-sm-6"f>>' + '<"row"<"col-sm-12"tr>>',
        language: {
            searchPlaceholder: " Tabel order...",
            search: "",
        },

        initComplete: function () {
            var searchInput = $('input[type="search"]').addClass(
                "form-control"
            );

            searchInput.wrap('<div class="input-group"></div>');
            searchInput.before('<span class="input-group-text">Cari:</span>');
        },
    });

    clearTable_DataTable("table_order", tableOrderCol.length);
    slcOrder.focus();
}
//#endregion

$(document).ready(() => init());
