//#region Variables
const spnBarcode = document.getElementById("jumlah_barcode");
const slcDivisi = document.getElementById("select_divisi");
const btnProses = document.getElementById("btn_proses");
const btnBatal = document.getElementById("btn_batal");
const btnKeluar = document.getElementById("btn_keluar");

const listRekap = [];
/** ISI LIST REKAP
 * 0 - Tanggal
 * 1 - Type
 * 2 - Primer
 * 3 - Sekunder
 * 4 - Tritier
 * 5 - IdType
 * 6 - Pemberi
 * 7 - Divisi
 * 8 - Shift
 */

const listKirim = [];
/** ISI LIST KIRIM
 * 0 - TglMutasi
 * 1 - NamaType
 * 2 - NoBarcode
 * 3 - NamaSubKelompok
 * 4 - NamaKelompok
 * 5 - KodeBarang
 * 6 - NoIndeks
 * 7 - QtyPrimer
 * 8 - QtySekunder
 * 9 - QtyTritier
 * 10 - IdType
 * 11 - NoTempTrans
 */

const colRekap = [
    { width: "1px" }, // Tanggal
    { width: "1px" }, // Type
    { width: "1px" }, // Primer
    { width: "1px" }, // Sekunder
    { width: "1px" }, // Tritier
    { width: "1px" }, // Id Type
    { width: "1px" }, // Divisi
    { width: "1px" }, // Shift
];

const colKirim = [
    { width: "100px" }, // Tanggal
    { width: "200px" }, // Type
    { width: "125px" }, // No. Barcode
    { width: "125px" }, // Sub-kelompok
    { width: "1px" }, // Kelompok
    { width: "125px" }, // Kode Barang
    { width: "125px" }, // No. Indeks
    { width: "1px" }, // Primer
    { width: "1px" }, // Sekunder
    { width: "1px" }, // Tritier
    { width: "1px" }, // Divisi
];
//#endregion

//#region Events
btnProses.addEventListener("click", function () {
    if (listRekap.length > 0) {
    } else alert("Tidak Ada Data Yang Diproses");
});
//#endregion

//#region Functions
function tampilDataDispresiasi() {
    listRekap.length = 0;
    clearTable_DataTable("table_rekap", colRekap, "Memuat data...");

    listKirim.length = 0;
    clearTable_DataTable("table_kirim", colRekap, "Memuat data...");

    fetchSelect(
        "/warehouseTerima/SP_5409_INV_ListBarcodeTerimaGudang/0~2104",
        (data) => {
            let fetchEmpty = true;
            if (data.length > 0) fetchEmpty = false;

            if (!fetchEmpty) {
                for (let i = 0; i < data.length; i++) {
                    let [kode_barang, no_indeks] = ["", ""];
                    kode_barang = data[i].kode_barang;
                    no_indeks = data[i].noindeks.padStart(9, "0");

                    listKirim.push({
                        TglMutasi: data[i].tgl_mutasi,
                        NamaType: data[i].namatype,
                        NoBarcode: no_indeks + "-" + kode_barang,
                        NamaSubKelompok: data[i].namasubkelompok,
                        NamaKelompok: data[i].NamaKelompok,
                        KodeBarang: data[i].kode_barang,
                        NoIndeks: data[i].noindeks,
                        QtyPrimer: data[i].qty_primer,
                        QtySekunder: data[i].qty_sekunder,
                        QtyTritier: data[i].qty,
                        IdType: data[i].idtype,
                        NoTempTrans: data[i].notemptrans,
                    });
                }

                tampilRekap(() => {
                    spnBarcode.textContent = listKirim.length;
                });
            }
        }
    );
}

function tampilRekap(postAction = null) {
    fetchSelect(
        "/warehouseTerima/SP_5409_INV_ListBarcodeTerimaGudang/1~2104",
        (data) => {
            for (let i = 0; i < data.length; i++) {
                listRekap.push({
                    TglMutasi: data[i].tgl_mutasi,
                    NamaType: data[i].namatype,
                    Primer: data[i].primer,
                    Sekunder: data[i].sekunder,
                    Tritier: data[i].tertier,
                    IdType: data[i].idtype,
                    NoTempTrans: data[i].notemptrans,
                });
            }

            if (postAction != null) postAction();
        }
    );
}
//#endregion

function init() {
    $("#table_rekap").DataTable({
        responsive: true,
        paging: false,
        scrollY: "250px",
        scrollX: "",
        dom: '<"row"<"col-sm-6"i><"col-sm-6"f>>' + '<"row"<"col-sm-12"tr>>',
        language: {
            searchPlaceholder: " Tabel rekap...",
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

    $("#table_kirim").DataTable({
        responsive: true,
        paging: false,
        scrollY: "250px",
        scrollX: "1000000px",
        columns: colKirim,
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
            searchInput.before('<span class="input-group-text">Cari:</span>');
        },
    });

    clearTable_DataTable("table_rekap", colRekap.length);
    clearTable_DataTable("table_kirim", colKirim.length);

    addOptionIfNotExists(slcDivisi, "INV", "INV | Warehouse");
    tampilDataDispresiasi();
}

$(document).ready(() => init());

btnKeluar.addEventListener("click", function () {
    window.location.href = "/Extruder/WarehouseTerima";
});
