//#region Variables
const slcDivisi = document.getElementById("select_divisi");
const slcObjek = document.getElementById("select_objek");

const widthStok = 7;
const listStok = [];

var refetchObjek = false;
//#endregion

//#region Events
slcDivisi.addEventListener("change", function () {
    listStok.length = 0;
    clearTable_DataTable("table_stok", widthStok);
    slcObjek.selectedIndex = 0;

    slcObjek.disabled = true;
    if (slcDivisi.value == "JBB") {
        addOptionIfNotExists(slcObjek, "078", "078 | Barang Dalam Proses");
        tampilBarangSetengahJadi(slcDivisi.value);
    } else if (slcDivisi.value == "ABM") {
        addOptionIfNotExists(slcObjek, "162", "162 | Hasil Setengah Jadi");
        tampilBarangSetengahJadi(slcDivisi.value);
    } else if (slcDivisi.value == "ADS") {
        addOptionIfNotExists(slcObjek, "192", "192 | Hasil Setengah Jadi");
        tampilBarangSetengahJadi(slcDivisi.value);
    } else {
        refetchObjek = true;
        slcObjek.disabled = false;
        slcObjek.focus();
    }
});

slcObjek.addEventListener("keydown", function (event) {
    if (event.key == "Enter" && refetchObjek) {
        refetchObjek = false;
        clearOptions(this);
        const errorOption = addLoadingOption(this);
        const optionKeys = {
            valueKey: "IdObjek",
            textKey: "NamaObjek",
        };

        fetchSelect(
            "/warehouseTerima/SP_1003_INV_UserObjek_Diminta/" + slcDivisi.value,
            (data) => {
                if (data.length > 0) {
                    addOptions(this, data, optionKeys);
                    this.removeChild(errorOption);
                } else refetchObjek = true;
            },
            errorOption
        );
    }
});

slcObjek.addEventListener("mousedown", function () {
    if (refetchObjek) {
        refetchObjek = false;
        clearOptions(this);
        const errorOption = addLoadingOption(this);
        const optionKeys = {
            valueKey: "IdObjek",
            textKey: "NamaObjek",
        };

        fetchSelect(
            "/warehouseTerima/SP_1003_INV_UserObjek_Diminta/" + slcDivisi.value,
            (data) => {
                if (data.length > 0) {
                    addOptions(this, data, optionKeys);
                    this.removeChild(errorOption);
                } else refetchObjek = true;
            },
            errorOption
        );
    }
});

slcObjek.addEventListener("change", function () {
    listStok.length = 0;
    clearTable_DataTable("table_stok", widthStok, "Memuat data...");

    if (this.value == "162" || this.value == "078" || this.value == "192") {
        tampilBarangSetengahJadi(slcDivisi.value);
    } else tampilBarangGelondongan();
});
//#endregion

//#region Functions
function tampilBarangSetengahJadi(id_objek) {
    fetchSelect(
        "/warehouseTerima/SP_1273_INV_AmbilBarangSetJadi/" + id_objek,
        (data) => {
            for (let i = 0; i < data.length; i++) {
                let f_index = "000000000" + data[i].NoIndeks;
                listStok.push({
                    Nomor: i + 1,
                    NoIndeks: f_index.substring(f_index.length - 9),
                    KodeBarang: data[i].Kode_barang,
                    NamaType: data[i].NamaType,
                    QtyPrimer: data[i].Qty_Primer,
                    QtySekunder: data[i].Qty_sekunder,
                    Qty: data[i].Qty,
                });
            }

            if (data.length > 0) {
                addTable_DataTable("table_stok", listStok);
            } else
                clearTable_DataTable(
                    "table_stok",
                    widthStok,
                    "Tidak Ditemukan Barang Setengah Jadi."
                );
        }
    );
}

function tampilBarangGelondongan() {
    fetchSelect(
        "/warehouseTerima/SP_1273_INV_AmbilBarangGelondongan/" +
            slcDivisi.value,
        (data) => {
            for (let i = 0; i < data.length; i++) {
                let no_indeks = "000000000" + (!data[i].NoIndeks).trim();
                listStok.push({
                    Nomor: i + 1,
                    NoIndeks: no_indeks.slice(-9),
                    KodeBarang: data[i].Kode_barang,
                    NamaType: data[i].NamaType,
                    QtyPrimer: data[i].Qty_Primer,
                    QtySekunder: data[i].Qty_sekunder,
                    Qty: data[i].Qty,
                });
            }

            if (data.length > 0) {
                addTable_DataTable("table_stok", listStok);
            } else
                clearTable_DataTable(
                    "table_stok",
                    widthStok,
                    "Tidak Ditemukan Barang Gelondongan."
                );
        }
    );
}
//#endregion

function init() {
    $("#table_stok").DataTable({
        responsive: true,
        paging: false,
        scrollY: "250px",
        scrollX: "",
        dom: '<"row"<"col-sm-6"i><"col-sm-6"f>>' + '<"row"<"col-sm-12"tr>>',
        language: {
            searchPlaceholder: " Tabel stok...",
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

    clearTable_DataTable("table_stok", widthStok);
    slcDivisi.focus();
}

$(document).ready(() => init());
