//#region Variables
const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");

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
const listDetailOrder = [];

const tableDetailCol = [
    { width: "300px" },
    { width: "125px" },
    { width: "125px" },
    { width: "125px" },
    { width: "125px" },
    { width: "125px" },
    { width: "125px" },
];

var checkboxes = null;
var terpilih = -1;
//#endregion

//#region Events
btnProses.addEventListener("click", function () {
    const checkedOrder = [];
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) checkedOrder.push(checkbox.id);
    });

    checkedOrder.forEach((order) => {
        // SP_5298_EXT_ACC_ORDER
        fetchStmt("/Order/updAccOrder/" + order);
    });

    listDetailOrder.length = 0;
    clearTable_DataTable("table_detail_order", tableDetailCol.length);

    alert("Order berhasil di-ACC!");
    showOrder();
});

btnKeluar.addEventListener("click", function () {
    window.location.href = "/Extruder/ExtruderNet";
});
//#endregion

//#region Functions
function showOrder() {
    // SP_5298_EXT_ORDER_BLM_ACC
    fetchSelect("/Order/getOrderBlmAcc/" + idDivisi, (data) => {
        listOrder.length = 0;
        const strCheckBox = `<input class="form-check-input" type="checkbox" id="`;
        for (let i = 0; i < data.length; i++) {
            listOrder.push({
                Identifikasi: `${strCheckBox}${data[i].IDOrder}"> ${data[i].Identifikasi}`,
                IDOrder: data[i].IDOrder,
            });
        }

        if (data.length > 0) {
            addTable_DataTable("table_order", listOrder, null, rowClicked);

            checkboxes = document.querySelectorAll("input[type='checkbox']");
            checkboxes.forEach((checkbox) => {
                checkbox.addEventListener("click", function (event) {
                    event.stopPropagation(); // *untuk menghentikan click event pada row saat checkbox diklik
                });
            });
        } else {
            clearTable_DataTable(
                "table_order",
                2,
                "<b>Tidak ditemukan Order yang belum di-ACC.</b>"
            );
        }
    });
}

function rowClicked(row, data, _) {
    if (terpilih == findClickedRowInList(listOrder, "IDOrder", data.IDOrder)) {
        row.style.background = "white";
        terpilih = -1;

        clearTable_DataTable("table_detail_order", tableDetailCol.length);
    } else {
        clearSelection_DataTable("table_order");
        row.style.background = "aliceblue";
        terpilih = findClickedRowInList(listOrder, "IDOrder", data.IDOrder);

        clearTable_DataTable(
            "table_detail_order",
            tableDetailCol.length,
            "Memuat data..."
        );

        // SP_5298_EXT_LIST_SPEK_ORDER_1
        fetchSelect("/Order/getListSpek/" + data.IDOrder, (dataFetch) => {
            listDetailOrder.length = 0;
            for (let i = 0; i < dataFetch.length; i++) {
                listDetailOrder.push({
                    TypeBenang: dataFetch[i].TypeBenang,
                    JumlahPrimer: dataFetch[i].JumlahPrimer,
                    SatuanPrimer: "NULL",
                    JumlahSekunder: dataFetch[i].JumlahSekunder,
                    SatuanSekunder: "NULL",
                    JumlahTritier: dataFetch[i].JumlahTritier,
                    SatuanTritier: "KG",
                });
            }

            if (dataFetch.length <= 0) {
                clearTable_DataTable(
                    "table_detail_order",
                    tableDetailCol.length,
                    `Data untuk <b>Order ${data.IDOrder}</b> tidak ditemukan.</h3>`
                );
            } else {
                addTable_DataTable(
                    "table_detail_order",
                    listDetailOrder,
                    tableDetailCol
                );
            }

            window.scrollTo(0, document.body.scrollHeight);
        });
    }
}

function init() {
    $("#table_order").DataTable({
        responsive: true,
        paging: false,
        scrollY: "250px",
        scrollX: "",
        dom: '<"row"<"col-sm-6"i><"col-sm-6"f>>' + '<"row"<"col-sm-12"tr>>',
        language: {
            searchPlaceholder: " Tabel order...",
            search: "",
        },
    });

    $("#table_detail_order").DataTable({
        responsive: true,
        paging: false,
        scrollY: "250px",
        scrollX: "1000000px",
        columns: tableDetailCol,
        dom: '<"row"<"col-sm-6"i><"col-sm-6"f>>' + '<"row"<"col-sm-12"tr>>',
        language: {
            searchPlaceholder: " Tabel detail order...",
            search: "",
        },

        initComplete: () => {
            var searchInput = $('input[type="search"]').addClass(
                "form-control"
            );

            searchInput.wrap('<div class="input-group"></div>');
            searchInput.before('<span class="input-group-text">Cari:</span>');
        },
    });

    clearTable_DataTable("table_order", 2);
    clearTable_DataTable("table_detail_order", tableDetailCol.length);
    showOrder();
}
//#endregion

$(document).ready(() => init());
