//#region Variables
const dateInput = document.getElementById("tanggal");
const slcType = document.getElementById("select_benang");
const listOfDetail = document.querySelectorAll(".card .form-control");

const txtNoOrder = document.getElementById("no_order");
const txtIdentifikasi = document.getElementById("identifikasi");
const txtPrimerQty = document.getElementById("primer_qty");
const txtSekunderQty = document.getElementById("sekunder_qty");
const txtTritierQty = document.getElementById("tritier_qty");

const spnPrimerSat = document.getElementById("primer_sat");
const spnSekunderSat = document.getElementById("sekunder_sat");
const spnTritierSat = document.getElementById("tritier_sat");

const btnBaru = document.getElementById("btn_baru");
const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");
const btnDetail = document.getElementById("btn_detail");

const namaGedung =
    document.getElementById("nama_gedung").value == ""
        ? "default"
        : document.getElementById("nama_gedung").value;

const listOrder = [];
/* ISI LIST ORDER
    0 NamaType
    1 SatPrimer
    2 QtyPrimer
    3 SatSekunder
    4 QtySekunder
    5 SatTritier
    6 QtyTritier
*/

const tableOrderCol = [
    { width: "300px" },
    { width: "125px" },
    { width: "125px" },
    { width: "125px" },
    { width: "125px" },
    { width: "125px" },
    { width: "125px" },
];

var counterType = 0;
//#endregion

//#region Events
btnBaru.addEventListener("click", function () {
    clearTable_DataTable("table_order", tableOrderCol.length);
    clearDataDetail();
    toggleButtons(2);

    txtNoOrder.value = "";
    txtIdentifikasi.value = "";
    listOrder.length = 0;
    txtIdentifikasi.focus();
});

btnDetail.addEventListener("click", function () {
    // Lakukan pengecekkan untuk tiap input pada card Detail Order
    var isDetailEmpty = false;

    if (slcType.selectedIndex != 0) {
        listOfDetail.forEach((ele) => {
            if (ele.value == "") isDetailEmpty = true;
        });
    } else isDetailEmpty = true;

    if (isDetailEmpty) {
        alert("Ada data yang belum terisi. \nMohon periksa kembali.");
        return;
    }

    // Lakukan pencarian terhadap tabel berdasarkan Nama Type
    const typeAda = listOrder.some((order) => {
        return order.NamaType === slcType.options[slcType.selectedIndex].text;
    });

    if (typeAda) {
        slcType.focus();
        alert("Sudah ada type benang yang sama dalam order.");
    } else {
        listOrder.push({
            NamaType: slcType.options[slcType.selectedIndex].text,
            SatPrimer: spnPrimerSat.textContent,
            QtyPrimer: txtPrimerQty.value,
            SatSekunder: spnSekunderSat.textContent,
            QtySekunder: txtSekunderQty.value,
            SatTritier: spnTritierSat.textContent,
            QtyTritier: txtTritierQty.value,
        });

        addTable_DataTable("table_order", listOrder, tableOrderCol);

        // Lakukan konfirmasi apakah ingin melakukan penambahan data lagi
        showModal(
            "Ya",
            "Ingin input data bahan / hasil produksi lagi?",
            () => {
                clearDataDetail();
                slcType.focus();
            },
            () => {
                btnProses.focus();
            },
            "Tidak"
        );
    }
});

btnKeluar.addEventListener("click", function () {
    if (this.textContent == "Keluar") {
        window.location.href = "/Extruder/ExtruderNet";
    } else {
        txtIdentifikasi.value = "";
        toggleButtons(1);
        clearDataDetail();
        disableDetail();

        listOrder.length = 0;
        clearTable_DataTable("table_order", tableOrderCol.length);
    }
});

txtNoOrder.addEventListener("change", function () {
    for (let i = 0; i < listOrder.length; i++) {
        // SP_5298_EXT_INSERT_ORDERDETAIL_BENANG
        fetchStmt(
            "/Order/insOrderDetail/" +
                txtNoOrder.value +
                "/" +
                toSnakeCase(listOrder[i].NamaType)
                    .replace(/ /g, "_")
                    .replace(/\//g, "~") +
                "/" +
                listOrder[i].QtyPrimer +
                "/" +
                listOrder[i].QtySekunder +
                "/" +
                listOrder[i].QtyTritier +
                "/0/0/0",
            () => {
                let id_divisi = "";
                switch (namaGedung) {
                    case "B":
                        id_divisi = "MEX";
                        break;

                    case "D":
                        id_divisi = "DEX";
                        break;

                    default:
                        id_divisi = "EXT";
                        break;
                }

                if (i == listOrder.length - 1) {
                    // SP_5298_EXT_UPDATE_COUNTER_ORDER
                    fetchStmt("/Order/updCounterOrder/" + id_divisi);
                }
            }
        );
    }

    alert("Data berhasil disimpan!");
    toggleButtons(1);
    disableDetail();

    btnBaru.focus();
});

btnProses.addEventListener("click", function () {
    if (listOrder.length < 1) {
        alert("Data order masih kosong!");
    } else {
        // SP_5298_EXT_INSERT_ORDER_BENANG; namaGedung = "default" / "D"
        // SP_1273_MEX_INSERT_ORDER_BENANG; namaGedung = "B"
        let kode_ins = namaGedung == "D" ? "D" : "";
        fetchStmt(
            "/Order/insOrderBenang/" +
                namaGedung +
                "/" +
                dateInput.value +
                "/" +
                txtIdentifikasi.value.replace(/ /g, "_").replace(/\//g, "~") +
                "/" +
                kode_ins,
            () => {
                if (namaGedung == "B") {
                    fetchSelect("/Order/getNoOrderMjs", (data) => {
                        txtNoOrder.value = data.NoOrder;
                        txtNoOrder.dispatchEvent(new Event("change"));
                    });
                } else {
                    fetchSelect("/Order/getNoOrder", (data) => {
                        txtNoOrder.value = data.NoOrder;
                        txtNoOrder.dispatchEvent(new Event("change"));
                    });
                }
            }
        );
    }
});

slcType.addEventListener("keydown", function (event) {
    if (event.key === "Enter") counterType += 1;
});

slcType.addEventListener("click", function () {
    counterType += 1;
    if ((counterType %= 2) == 0) {
        counterType = 0;

        if (this.value != "-- Pilih Type Benang --") {
            const [SatPrimer, SatSekunder, SatTirtier] = this.value.split(",");
            spnPrimerSat.textContent = SatPrimer;
            spnSekunderSat.textContent = SatSekunder;
            spnTritierSat.textContent = SatTirtier;

            txtPrimerQty.disabled = false;
            txtPrimerQty.focus();
            txtPrimerQty.value = "";
            txtSekunderQty.value = "";
            txtTritierQty.value = "";
        }
    }
});

txtIdentifikasi.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (this.value.trim() === "") {
            alert("Masukkan identifikasi order terlebih dahulu");
            txtIdentifikasi.focus();
        } else {
            slcType.disabled = false;
            slcType.focus();
        }
    }
});

txtPrimerQty.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        txtSekunderQty.disabled = false;
        txtSekunderQty.focus();

        if (this.value == "") this.value = 0;
    }
});

txtSekunderQty.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        txtTritierQty.disabled = false;
        txtTritierQty.focus();

        if (this.value == "") this.value = 0;
    }
});

txtTritierQty.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (this.value == "" || this.value == 0) {
            alert("Jumlah tritier tidak boleh kosong.");
            this.focus();
        } else {
            btnDetail.disabled = false;
            btnDetail.focus();
        }
    }
});

btnBaru.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") {
        if (btnProses.disabled == false) {
            btnProses.focus();
        } else btnKeluar.focus();
    }
});

btnProses.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        btnBaru.focus();
    } else if (event.key === "ArrowRight") {
        btnKeluar.focus();
    }
});

btnKeluar.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        if (btnProses.disabled == false) {
            btnProses.focus();
        } else btnBaru.focus();
    }
});
//#endregion

//#region Functions
function toggleButtons(tmb) {
    switch (tmb) {
        case 1:
            dateInput.classList.add("unclickable");
            txtIdentifikasi.disabled = true;
            btnBaru.disabled = false;
            btnProses.disabled = true;
            btnKeluar.textContent = "Keluar";
            break;
        case 2:
            dateInput.classList.remove("unclickable");
            txtIdentifikasi.disabled = false;
            btnBaru.disabled = true;
            btnProses.disabled = false;
            btnKeluar.textContent = "Batal";
            break;

        default:
            break;
    }
}

function clearDataDetail() {
    slcType.selectedIndex = 0;
    listOfDetail.forEach((ele) => (ele.value = ""));
}

function disableDetail() {
    slcType.disabled = true;
    listOfDetail.forEach((ele) => (ele.disabled = true));
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
    toggleButtons(1);
    btnBaru.focus();
    dateInput.value = getCurrentDate();
}
//#endregion

$(document).ready(() => init());
