//#region Variables
const LD_tanggal = document.getElementById("ld_tanggal");
const table_kirim_gudang = document.getElementById("table_kirim_gudang");

const spnLoading = document.getElementById("loading_lbl");
const btnRefresh = document.getElementById("btn_refresh");
const btnSemua = document.getElementById("btn_semua");
const hidDivisi = document.getElementById("hidden_divisi");
const hidObjek = document.getElementById("hidden_objek");

const LD_listKirim = [];
/** ISI LIST KIRIM
 * 0 TglKirim
 * 1 NamaType
 * 2 KodeBarang
 * 3 NoIndeks
 * 4 Primer
 * 5 Sekunder
 * 6 Tritier
 * 7 Divisi
 */

const LD_colKirim = [
    { width: "1px" }, // No.
    { width: "100px" }, // Tanggal
    { width: "650px" }, // Type
    { width: "100px" }, // Kode Barang
    { width: "100px" }, // No. Indeks
    { width: "1px" }, // Primer
    { width: "1px" }, // Sekunder
    { width: "1px" }, // Tritier
    { width: "1px" }, // Divisi
];

var LD_formData = { title: "", kode: "" };
//#endregion

//#region Events
btnRefresh.addEventListener("click", function () {
    LD_listKirim.length = 0;
    clearTable_DataTable(
        "table_kirim_gudang",
        LD_colKirim.length,
        "Memuat data..."
    );

    LD_showData(LD_formData.kode, LD_tanggal.value);
});

btnSemua.addEventListener("click", function () {
    LD_listKirim.length = 0;
    clearTable_DataTable(
        "table_kirim_gudang",
        LD_colKirim.length,
        "Memuat data..."
    );

    LD_showData(LD_formData.kode);
});
//#endregion

//#region Functions
function LD_showData(kode, tgl = "") {
    let kode_sp = tgl == "" ? kode[0] : kode[1];
    let fetch_url = "";

    // Gelondongan kode sp = 2 & 13

    if (LD_formData.title == "Lihat Data Assesoris") {
        fetch_url =
            "/warehouseTerima/SP_1273_INV_ListKirimBahanBaku/" + kode_sp;
    } else {
        fetch_url =
            "/warehouseTerima/SP_1273_INV_ListKirimBahanBaku/" +
            kode_sp +
            "~" +
            hidDivisi.value;
    }

    if (tgl != "") fetch_url += "~" + tgl;

    fetchSelect(fetch_url, (data) => {
        for (let i = 0; i < data.length; i++) {
            LD_listKirim.push({
                Nomor: i + 1,
                TglKirim: dateTimeToDate(data[i].TglKirim),
                NamaType: data[i].NamaType,
                KodeBarang: data[i].KodeBarang,
                NoIndeks: data[i].NoIndeks,
                Primer: data[i].Primer,
                Sekunder: data[i].Sekunder,
                Tritier: data[i].Tritier,
                Divisi: data[i].Divisi,
            });
        }

        if (data.length <= 0) {
            if (tgl == "") {
                clearTable_DataTable(
                    "table_kirim_gudang",
                    LD_colKirim.length,
                    "Data Barcode tidak ditemukan."
                );
            } else
                clearTable_DataTable(
                    "table_kirim_gudang",
                    LD_colKirim.length,
                    "Tidak ditemukan data pada <b>" + LD_tanggal.value + "</b>."
                );
        } else
            addTable_DataTable(
                "table_kirim_gudang",
                LD_listKirim,
                LD_colKirim,
                null,
                "350px",
                "add_paging"
            );
    });
}
//#endregion

function init_dt() {
    spnLoading.classList.add("hidden");
    table_kirim_gudang.classList.remove("hidden");
    LD_tanggal.value = getCurrentDate();

    if (!$.fn.DataTable.isDataTable("#table_kirim_gudang")) {
        $("#table_kirim_gudang").DataTable({
            responsive: true,
            paging: false,
            scrollY: "350px",
            scrollX: "",
            dom: '<"row"<"col-sm-6"i><"col-sm-6"f>>' + '<"row"<"col-sm-12"tr>>',
            language: {
                searchPlaceholder: " Tabel kirim...",
                search: "",
            },

            initComplete: () => {
                var searchInput = $('input[type="search"]:last').addClass(
                    "form-control"
                );

                searchInput.wrap('<div class="input-group"></div>');
                searchInput.before(
                    '<span class="input-group-text">Cari:</span>'
                );
            },
        });
    }

    document.getElementById("ld_title").textContent = LD_formData.title;
    LD_listKirim.length = 0;
    clearTable_DataTable(
        "table_kirim_gudang",
        LD_colKirim.length,
        "Memuat data..."
    );

    LD_showData(LD_formData.kode);
}

$("#form_lihat_data").on("shown.bs.modal", function () {
    init_dt();
});

$("#form_lihat_data").on("hidden.bs.modal", function () {
    LD_listKirim.length = 0;
    clearTable_DataTable("table_kirim_gudang", LD_colKirim.length);
});
