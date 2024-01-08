//#region Variables

/**
 * Script tersambung dengan "rincianKonversi.js"
 * Pastikan tidak ada duplikasi nama variabel untuk menghindari error
 */

const slcMesin = document.getElementById("select_mesin");
const slcNomor = document.getElementById("select_nomor");
const slcNoKonversi = document.getElementById("select_nomor_konversi");
const slcType = document.getElementById("select_type");

const txtShift = document.getElementById("shift");
const timeAwal = document.getElementById("shift_awal");
const timeAkhir = document.getElementById("shift_akhir");

const btnIsi = document.getElementById("btn_isi");
const btnKoreksi = document.getElementById("btn_koreksi");
const btnHapus = document.getElementById("btn_hapus");
const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");

const dateMohon = document.getElementById("tanggal_mohon");
const dateInput = document.getElementById("tanggal");

/**
 * Tanggal Mohon
 * - digunakan saat melakukan insert data ke database.
 * - saat ketik enter tanggal berubah sesuai tanggal biasa.
 * - tidak memiliki dampak apapun saat mode "Koreksi" dan "Hapus".
 *
 * Tanggal biasa
 * - digunakan untuk mencari nomor konversi yang diinginkan.
 * - digunakan pada 3 proses "Isi", "Koreksi", dan "Hapus".
 */

const hidRincianKonv = document.getElementById("form_rk_return");
const listOfSlc = document.querySelectorAll("select");

const namaGedung = document.getElementById("nama_gedung").value;
const idDivisi = namaGedung == "D" ? "DEX" : "EXT";

const listAsal = [];
const listTujuan = [];
/* ISI LIST ASAL & TUJUAN
    0 IdType
    1 NamaType
    2 JumlahPrimer
    3 JumlahSekunder
    4 JumlahTritier
    5 NamaObjek
    6 NamaKelompokUtama
    7 NamaKelompok
    8 NamaSubKelompok
    9 IdObjek
    10 IdKelompokUtama
    11 IdKelompok
    12 IdSubKelompok
    13 IdTransaksi
*/

const posAsal = $("#table_asal").offset().top - 125;
const posTujuan = $("#table_tujuan").offset().top - 125;
const colTable = [
    { width: "100px" }, // Id Type
    { width: "150px" }, // Nama Type
    { width: "75px" }, // Jumlah Primer
    { width: "75px" }, // Jumlah Sekunder
    { width: "75px" }, // Jumlah Tritier
    { width: "125px" }, // Nama Objek
    { width: "90px" }, // Nama Kelompok Utama
    { width: "90px" }, // Nama Kelompok
    { width: "90px" }, // Nama Sub-kelompok
    { width: "90px" }, // Id Objek
    { width: "90px" }, // Id Kelompok Utama
    { width: "90px" }, // Id Kelompok
    { width: "90px" }, // Id Sub-kelompok
    { width: "90px" }, // Id Transaksi
];

var modeProses = "";
var refetchNomor = false;
var refetchType = false;
var refetchKonversi = false;
var clickedTable = "";
var [pilAsal, pilTujuan] = [-1, -1];
//#endregion

//#region Events
dateInput.addEventListener("change", function () {
    refetchNomor = true;
    refetchKonversi = true;
});

dateInput.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (modeProses == "isi") {
            txtShift.disabled = false;
            txtShift.focus();
        } else if (modeProses == "koreksi" || modeProses == "hapus") {
            slcNomor.disabled = false;
            slcNomor.focus();
        }
    }
});

dateMohon.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        dateInput.value = dateMohon.value;
        btnIsi.focus();
    }
});

txtShift.addEventListener("change", function () {
    refetchKonversi = true;
});

txtShift.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (this.value.trim() != "") {
            this.value = this.value.toUpperCase();
            slcNoKonversi.disabled = false;
            slcNoKonversi.focus();
        } else this.select();
    }
});

slcNomor.addEventListener("mousedown", function () {
    if (refetchNomor) {
        refetchNomor = false;
        clearOptions(this);
        const errorOption = addLoadingOption(this);
        const optionKeys = {
            valueKey: "MesinShift",
            textKey: "IdKonversiNG",
        };

        // SP_5298_EXT_KOREKSI_SORTIRNG_BLMACC
        fetchSelect(
            "/Benang/getKoreksiSortirNGBlmAcc/" + dateInput.value,
            (data) => {
                if (data.length > 0) {
                    addOptions(this, data, optionKeys);
                    this.removeChild(errorOption);
                } else refetchNomor = true;
            },
            errorOption
        );
    }
});

slcNomor.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && refetchNomor) {
        refetchNomor = false;
        clearOptions(this);
        const errorOption = addLoadingOption(this);
        const optionKeys = {
            valueKey: "MesinShift",
            textKey: "IdKonversiNG",
        };

        // SP_5298_EXT_KOREKSI_SORTIRNG_BLMACC
        fetchSelect(
            "/Benang/getKoreksiSortirNGBlmAcc/" + dateInput.value,
            (data) => {
                if (data.length > 0) {
                    addOptions(this, data, optionKeys);
                    this.removeChild(errorOption);
                } else refetchNomor = true;
            },
            errorOption
        );
    }
});

slcNomor.addEventListener("change", function () {
    let type_mesin = this.value.split("/")[0];
    addOptionIfNotExists(slcMesin, type_mesin);
    txtShift.value = this.value.split("/")[1];

    lihatDataKonversiNGFetch(
        this.options[this.selectedIndex].text.split(" | ")[1],
        () => {
            if (modeProses == "koreksi") {
                $("html, body").animate({ scrollTop: posAsal }, 100);
            } else if (modeProses == "hapus") {
                btnProses.focus();
            }
        }
    );
});

slcNoKonversi.addEventListener("mousedown", function () {
    removeOption(this, "", "//");
    this.selectedIndex = 0;

    if (refetchKonversi) {
        refetchKonversi = false;
        clearOptions(this);
        const errorOption = addLoadingOption(this);
        const optionKeys = {
            valueKey: "Konversi",
            textKey: "TypeMesin",
        };

        // SP_5298_EXT_LIST_IDKONV
        // AMBIL DARI VW_PRG_5298_EXT_LIST_IDKONV
        fetchSelect(
            "/Benang/getListIdKonv1/" +
                idDivisi +
                "/" +
                dateInput.value +
                "/" +
                txtShift.value,
            (data) => {
                if (data.length > 0) {
                    addOptions(this, data, optionKeys);
                    this.removeChild(errorOption);
                } else refetchKonversi = true;
            },
            errorOption
        );
    }
});

slcNoKonversi.addEventListener("keydown", function (event) {
    removeOption(this, "", "//");
    this.selectedIndex = 0;

    if (event.key === "Enter" && refetchKonversi) {
        refetchKonversi = false;
        clearOptions(this);
        const errorOption = addLoadingOption(this);
        const optionKeys = {
            valueKey: "Konversi",
            textKey: "TypeMesin",
        };

        // SP_5298_EXT_LIST_IDKONV
        // AMBIL DARI VW_PRG_5298_EXT_LIST_IDKONV
        fetchSelect(
            "/Benang/getListIdKonv1/" +
                idDivisi +
                "/" +
                dateInput.value +
                "/" +
                txtShift.value,
            (data) => {
                if (data.length > 0) {
                    addOptions(this, data, optionKeys);
                    this.removeChild(errorOption);
                } else refetchKonversi = true;
            },
            errorOption
        );
    }
});

slcNoKonversi.addEventListener("change", function () {
    refetchType = true;
    listAsal.length = 0;
    clearTable_DataTable("table_asal", colTable.length, "padding=250px");
    listTujuan.length = 0;
    clearTable_DataTable("table_tujuan", colTable.length, "padding=250px");

    let id_konv = this.value.split("//")[0];
    let komposisi = this.value.split("//")[1];
    let type_mesin = this.options[this.selectedIndex].text.split("|")[1].trim();
    addOptionIfNotExists(slcMesin, type_mesin);
    addOptionIfNotExists(this, id_konv, id_konv + " | " + komposisi);
    slcType.disabled = false;
    slcType.focus();
});

slcType.addEventListener("mousedown", function () {
    if (listTujuan.length <= 0) {
        if (refetchType) {
            refetchType = false;
            clearOptions(this);
            const errorOption = addLoadingOption(this);
            const optionKeys = {
                valueKey: "IdType",
                textKey: "Type",
            };

            // SP_5298_EXT_LIST_PROD_NG
            // AMBIL DARI VW_PRG_5298_EXT_LIST_PROD_NG
            fetchSelect(
                "/Benang/getListProdNG/" + slcNoKonversi.value,
                (data) => {
                    if (data.length > 0) {
                        addOptions(this, data, optionKeys, false);
                        this.removeChild(errorOption);
                    } else refetchType = true;
                },
                errorOption
            );
        }
    } else alert("Tidak Boleh Ubah Type, Karena Sudah Ada Item Tujuan Konversi");
});

slcType.addEventListener("keydown", function (event) {
    if (listTujuan.length <= 0) {
        if (event.key === "Enter" && refetchType) {
            refetchType = false;
            clearOptions(this);
            const errorOption = addLoadingOption(this);
            const optionKeys = {
                valueKey: "IdType",
                textKey: "Type",
            };

            // SP_5298_EXT_LIST_PROD_NG
            // AMBIL DARI VW_PRG_5298_EXT_LIST_PROD_NG
            fetchSelect(
                "/Benang/getListProdNG/" + slcNoKonversi.value,
                (data) => {
                    if (data.length > 0) {
                        addOptions(this, data, optionKeys, false);
                        this.removeChild(errorOption);
                    } else refetchType = true;
                },
                errorOption
            );
        }
    } else alert("Tidak Boleh Ubah Type, Karena Sudah Ada Item Tujuan Konversi");
});

slcType.addEventListener("change", function () {
    // SP_5298_EXT_CEK_DATA_NG Kode 1
    fetchSelect(
        "/Benang/getCekDataNG/1/" + slcNoKonversi.value + "/" + slcType.value,
        (data) => {
            if (data.length > 0) {
                if (data[0].ada > 0) {
                    // SP_5298_EXT_CEK_DATA_NG Kode 2
                    fetchSelect(
                        "/Benang/getCekDataNG/2/" +
                            slcNoKonversi.value +
                            "/" +
                            slcType.value,
                        (data2) => {
                            if (data2.length > 0) {
                                let nama_type =
                                    slcType.options[slcType.selectedIndex].text;

                                if (data2[0].SaatLog != null) {
                                    alert(
                                        nama_type +
                                            " sudah disortir dan di-ACC.\n" +
                                            "Cek datanya di Kartu Barang Inventory."
                                    );
                                } else
                                    alert(
                                        nama_type +
                                            " sudah disortir namun belum di-ACC.\n" +
                                            "Cek datanya di ACC Sortir Benang NG."
                                    );
                            }
                        }
                    );
                } else {
                    displayDataBenangNGFetch();
                }
            } else alert("Data Benang NG tidak ditemukan.");
        }
    );
});

btnIsi.addEventListener("click", function () {
    clearAll();
    dateInput.classList.remove("unclickable");
    dateInput.value = dateMohon.value;
    dateInput.focus();
    modeProses = "isi";
    toggleButtons(2);
    slcNomor.disabled = true;
});

btnKoreksi.addEventListener("click", function () {
    clearAll();
    dateInput.classList.remove("unclickable");
    slcNomor.disabled = false;
    slcNomor.focus();
    refetchNomor = true;
    modeProses = "koreksi";
    toggleButtons(2);
});

btnHapus.addEventListener("click", function () {
    clearAll();
    dateInput.classList.remove("unclickable");
    slcNomor.disabled = false;
    slcNomor.focus();
    refetchNomor = true;
    modeProses = "hapus";
    toggleButtons(2);
});

btnProses.addEventListener("click", function () {
    if (modeProses == "isi") {
        if (listAsal.length <= 0 || listTujuan.length <= 0) {
            alert(
                "Data tidak dapat diproses karena tidak ada asal atau tujuan konversi."
            );
        } else {
            prosesIsiFetch();
        }
    } else if (modeProses == "koreksi") {
        if (slcNomor.selectedIndex == 0) {
            alert("Pilih dulu data konversi yang akan dikoreksi.");
        } else {
            showModal(
                "Koreksi",
                "Apakah anda yakin akan mengoreksi data <b>" +
                    slcNomor.value +
                    "</b>?",
                () => {
                    prosesKoreksiFetch(slcNomor.value);
                }
            );
        }
    } else if (modeProses == "hapus") {
        if (slcNomor.selectedIndex == 0) {
            alert("Pilih dulu data konversi yang akan dikoreksi.");
        } else {
            showModal(
                "Hapus",
                "Apakah anda yakin akan menghapus data <b>" +
                    slcNomor.options[slcNomor.selectedIndex].text +
                    "</b>?",
                () => {
                    prosesHapusFetch(
                        slcNomor.options[slcNomor.selectedIndex].text.split(
                            " | "
                        )[1]
                    );
                }
            );
        }
    }
});

btnKeluar.addEventListener("click", function () {
    if (this.textContent != "Keluar") {
        toggleButtons(1);
        clearAll();
        disableAll();
        modeProses = "";
    } else window.location.href = "/Extruder/ExtruderNet";
});

hidRincianKonv.addEventListener("change", function () {
    if (clickedTable == "asal") {
        if (modeProses == "isi") {
            listTujuan.length = 0;
            listTujuan.push({
                IdType: RK_slcType.value,
                NamaType:
                    RK_slcType.options[RK_slcType.selectedIndex].text.split(
                        " | "
                    )[1],
                JumlahPrimer: txtPrimerTujuan.value,
                JumlahSekunder: txtSekunderTujuan.value,
                JumlahTritier: txtTritierTujuan.value,
                NamaObjek: "Bahan & Hasil Produksi",
                NamaKelompokUtama: RK_slcKelut.value,
                NamaKelompok: RK_slcKelut.options[
                    RK_slcKelut.selectedIndex
                ].text
                    .split("|")[1]
                    .trim(),
                NamaSubKelompok: RK_slcSubkel.options[
                    RK_slcSubkel.selectedIndex
                ].text
                    .split("|")[1]
                    .trim(),
                IdObjek: "032",
                IdKelompokUtama: RK_slcKelut.value,
                IdKelompok: RK_slcKelompok.value,
                IdSubKelompok: RK_slcSubkel.value,
                IdTransaksi: "",
            });

            addTable_DataTable(
                "table_tujuan",
                listTujuan,
                colTable,
                rowClickedTujuan,
                "125px"
            );
        } else if (modeProses == "koreksi") {
            listAsal[pilAsal].JumlahPrimer = txtPrimerAsal.value;
            listAsal[pilAsal].JumlahSekunder = txtSekunderAsal.value;
            listAsal[pilAsal].JumlahTritier = txtTritierAsal.value;

            addTable_DataTable(
                "table_asal",
                listAsal,
                colTable,
                rowClickedAsal,
                "125px"
            );
        }
    } else if (clickedTable == "tujuan") {
        listTujuan[pilTujuan].JumlahPrimer = txtPrimerTujuan.value;
        listTujuan[pilTujuan].JumlahSekunder = txtSekunderTujuan.value;
        listTujuan[pilTujuan].JumlahTritier = txtTritierTujuan.value;

        addTable_DataTable(
            "table_tujuan",
            listTujuan,
            colTable,
            rowClickedTujuan,
            "125px"
        );
    }

    clickedTable = "";
    btnProses.focus();
});

$("#form_rincian_konversi").on("hidden.bs.modal", function () {
    RK_clearAll();
    pilAsal = -1;
    clearSelection_DataTable("table_asal");
    pilTujuan = -1;
    clearSelection_DataTable("table_tujuan");
});
//#endregion

//#region Functions
function lihatDataKonversiNGFetch(id_konversi, post_action = null) {
    listAsal.length = 0;
    clearTable_DataTable("table_asal", colTable.length, [
        "padding=250px",
        "Memuat data...",
    ]);

    listTujuan.length = 0;
    clearTable_DataTable("table_tujuan", colTable.length, [
        "padding=250px",
        "Memuat data...",
    ]);

    // SP_5298_EXT_LISTDATA_NG
    fetchSelect(
        "/Benang/getListDataNG/" + id_konversi.trim() + "/" + dateInput.value,
        (data_ng) => {
            if (data_ng.length > 0) {
                timeAwal.value = dateTimetoTime(data_ng[0].AwalShift);
                timeAkhir.value = dateTimetoTime(data_ng[0].AkhirShift);

                addOptionIfNotExists(
                    slcNoKonversi,
                    data_ng[0].IdKonversiEXT,
                    data_ng[0].IdKonversiEXT + " | " + data_ng[0].NamaKomposisi
                );

                // SP_5298_EXT_DETAILURAIAN_KONV_NG
                fetchSelect(
                    "/Benang/getDetailUraianKonvNG/" + data_ng[0].IdKonversiINV,
                    (d) => {
                        for (let i = 0; i < d.length; i++) {
                            if (d[i].UraianDetailTransaksi == "Asal Konversi") {
                                listAsal.push({
                                    IdType: d[i].IdType,
                                    NamaType: d[i].NamaType,
                                    JumlahPrimer: d[i].JumlahPengeluaranPrimer,
                                    JumlahSekunder:
                                        d[i].JumlahPengeluaranSekunder,
                                    JumlahTritier:
                                        d[i].JumlahPengeluaranTritier,
                                    NamaObjek: d[i].NamaObjek,
                                    NamaKelompokUtama: d[i].NamaKelompokUtama,
                                    NamaKelompok: d[i].NamaKelompok,
                                    NamaSubKelompok: d[i].NamaSubKelompok,
                                    IdObjek: d[i].IdObjek,
                                    IdKelompokUtama: d[i].IdKelompokUtama,
                                    IdKelompok: d[i].IdKelompok,
                                    IdSubKelompok: d[i].IdSubkelompok,
                                    IdTransaksi: d[i].IdTransaksi,
                                });

                                addTable_DataTable(
                                    "table_asal",
                                    listAsal,
                                    colTable,
                                    rowClickedAsal,
                                    "125px"
                                );
                            } else if (
                                d[i].UraianDetailTransaksi == "Tujuan Konversi"
                            ) {
                                listTujuan.push({
                                    IdType: d[i].IdType,
                                    NamaType: d[i].NamaType,
                                    JumlahPrimer: d[i].JumlahPemasukanPrimer,
                                    JumlahSekunder:
                                        d[i].JumlahPemasukanSekunder,
                                    JumlahTritier: d[i].JumlahPemasukanTritier,
                                    NamaObjek: d[i].NamaObjek,
                                    NamaKelompokUtama: d[i].NamaKelompokUtama,
                                    NamaKelompok: d[i].NamaKelompok,
                                    NamaSubKelompok: d[i].NamaSubKelompok,
                                    IdObjek: d[i].IdObjek,
                                    IdKelompokUtama: d[i].IdKelompokUtama,
                                    IdKelompok: d[i].IdKelompok,
                                    IdSubKelompok: d[i].IdSubkelompok,
                                    IdTransaksi: d[i].IdTransaksi,
                                });

                                addTable_DataTable(
                                    "table_tujuan",
                                    listTujuan,
                                    colTable,
                                    rowClickedTujuan,
                                    "125px"
                                );
                            }

                            if (d.length <= 0)
                                alert("Data konversi tidak ditemukan.");
                        }

                        if (post_action != null) post_action();
                    }
                );
            } else console.log("Data NG tidak ditemukan.");
        }
    );
}

function displayDataBenangNGFetch(post_action = null) {
    // SP_5298_EXT_LIST_IDKONV Kode 3
    fetchSelect(
        "/Benang/getListIdKonv3/" + slcNoKonversi.value + "/" + slcType.value,
        (d) => {
            if (d.length > 0) {
                $("html, body").animate({ scrollTop: posAsal }, 100);
                for (let i = 0; i < d.length; i++) {
                    listAsal.push({
                        IdType: d[i].IdType,
                        NamaType: d[i].NamaType,
                        JumlahPrimer: d[i].JumlahPrimer,
                        JumlahSekunder: d[i].JumlahSekunder,
                        JumlahTritier: d[i].JumlahTritier,
                        NamaObjek: d[i].NamaObjek,
                        NamaKelompokUtama: d[i].NamaKelompokUtama,
                        NamaKelompok: d[i].NamaKelompok,
                        NamaSubKelompok: d[i].NamaSubKelompok,
                        IdObjek: d[i].IdObjek,
                        IdKelompokUtama: d[i].IdKelompokUtama,
                        IdKelompok: d[i].IdKelompok,
                        IdSubKelompok: d[i].IdSubKelompok,
                        IdTransaksi: "",
                    });
                }

                addTable_DataTable(
                    "table_asal",
                    listAsal,
                    colTable,
                    rowClickedAsal,
                    "125px"
                );
            } else alert("Hasil Konversi Tidak Menghasilkan Benang NG");
            if (post_action != null) post_action();
        }
    );
}

function prosesIsiFetch() {
    // SP_5298_EXT_INSERT_MASTERKONV_NG
    fetchStmt(
        "/Benang/insMasterKonvNG/" +
            dateMohon.value +
            "/" +
            slcNoKonversi.value,
        () => {
            fetchSelect("/Benang/getMasterKonversiNG", (data) => {
                if (data.IdKonversiNG !== undefined) {
                    addOptionIfNotExists(slcNomor, data.IdKonversiNG);

                    // SP_5298_EXT_LIST_COUNTER
                    fetchSelect("/Benang/getListCounter", (dataCounter) => {
                        if (dataCounter.length > 0) {
                            insertDetailFetch(
                                padLeft(dataCounter[0].NoKonversi, 9, "0"),
                                () => {
                                    clearAll();
                                    disableAll();
                                    toggleButtons(1);
                                    modeProses = "";
                                    alert("Data berhasil tersimpan.");
                                    btnIsi.focus();
                                    RK_modeProses = "";
                                }
                            );
                        }
                    });
                } else alert("SP_5298_EXT_INSERT_MASTERKONV_NG");
            });
        }
    );
}

function insertDetailFetch(id_konv_inv, post_action = null) {
    for (let i = 0; i < listAsal.length; i++) {
        // SP_5298_EXT_INSERT_DETAILKONV_NG
        fetchStmt(
            "/Benang/insDetailKonvNG/" +
                slcNomor.options[slcNomor.selectedIndex].text +
                "/" +
                listAsal[i].IdType.trim() +
                "/" +
                listAsal[i].JumlahPrimer +
                "/" +
                listAsal[i].JumlahSekunder +
                "/" +
                listAsal[i].JumlahTritier +
                "/" +
                id_konv_inv,
            () => {
                if (i == listAsal.length - 1) {
                    createTmpTransaksiInventoryFetch(i, id_konv_inv, 0, () => {
                        if (post_action != null) post_action();
                    });
                } else {
                    createTmpTransaksiInventoryFetch(i, id_konv_inv, 0);
                }
            }
        );
    }

    for (let i = 0; i < listTujuan.length; i++) {
        // SP_5298_EXT_INSERT_DETAILKONV_NG
        fetchStmt(
            "/Benang/insDetailKonvNG/" +
                slcNomor.options[slcNomor.selectedIndex].text +
                "/" +
                listTujuan[i].IdType.trim() +
                "/" +
                listTujuan[i].JumlahPrimer +
                "/" +
                listTujuan[i].JumlahSekunder +
                "/" +
                listTujuan[i].JumlahTritier +
                "/" +
                id_konv_inv,
            () => {
                createTmpTransaksiInventoryFetch(i, id_konv_inv, 1);
            }
        );
    }
}

function createTmpTransaksiInventoryFetch(
    i,
    id_konv_inv,
    status,
    post_action = null
) {
    if (status == 0) {
        // SP_5298_EXT_INSERT_04_ASALTMPTRANSAKSI
        fetchStmt(
            "/Benang/insAsalTmpTrans/04/asal_konversi/" +
                listAsal[i].IdType.trim() +
                "/" +
                dateMohon.value +
                "/" +
                listAsal[i].JumlahPrimer +
                "/" +
                listAsal[i].JumlahSekunder +
                "/" +
                listAsal[i].JumlahTritier +
                "/" +
                listAsal[i].IdSubKelompok.trim() +
                "/" +
                id_konv_inv.trim(),
            () => {
                if (post_action != null) post_action();
            }
        );
    } else if (status == 1) {
        // SP_5298_EXT_INSERT_04_TUJUANTMPTRANSAKSI
        fetchStmt(
            "/Benang/insTujuanTmpTrans/04/tujuan_konversi/" +
                listTujuan[i].IdType.trim() +
                "/" +
                dateMohon.value +
                "/" +
                listTujuan[i].JumlahPrimer +
                "/" +
                listTujuan[i].JumlahSekunder +
                "/" +
                listTujuan[i].JumlahTritier +
                "/" +
                listTujuan[i].IdSubKelompok.trim() +
                "/" +
                id_konv_inv.trim(),
            () => {
                if (post_action != null) post_action();
            }
        );
    }
}

function prosesKoreksiFetch() {
    let [asalDone, tujuanDone] = [false, false];
    const post_action = () => {
        clearAll();
        disableAll();
        toggleButtons(1);
        modeProses = "";
        alert("Data berhasil dikoreksi.");
        btnIsi.focus();
        RK_modeProses = "";
    };

    for (let i = 0; i < listAsal.length; i++) {
        // SP_5298_EXT_UPDATE_DETAIL_KONV_NG
        fetchStmt(
            "/Benang/updDetailKonvNG/" +
                slcNomor.options[slcNomor.selectedIndex].text.split(" | ")[1] +
                "/" +
                listAsal[i].IdType +
                "/" +
                listAsal[i].JumlahPrimer +
                "/" +
                listAsal[i].JumlahSekunder +
                "/" +
                listAsal[i].JumlahTritier,
            () => {
                // SP_5298_EXT_UPDATE_TMPTRANSAKSI
                fetchStmt(
                    "/Benang/updTmpTransaksi/" +
                        listAsal[i].IdTransaksi +
                        "/asal_konversi/" +
                        listAsal[i].JumlahPrimer +
                        "/" +
                        listAsal[i].JumlahSekunder +
                        "/" +
                        listAsal[i].JumlahTritier,
                    () => {
                        asalDone = true;
                        if (i == listAsal.length - 1 && tujuanDone)
                            post_action();
                    }
                );
            }
        );
    }

    for (let i = 0; i < listTujuan.length; i++) {
        // SP_5298_EXT_UPDATE_DETAIL_KONV_NG
        fetchStmt(
            "/Benang/updDetailKonvNG/" +
                slcNomor.options[slcNomor.selectedIndex].text.split(" | ")[1] +
                "/" +
                listTujuan[i].IdType +
                "/" +
                listTujuan[i].JumlahPrimer +
                "/" +
                listTujuan[i].JumlahSekunder +
                "/" +
                listTujuan[i].JumlahTritier,
            () => {
                // SP_5298_EXT_UPDATE_TMPTRANSAKSI
                fetchStmt(
                    "/Benang/updTmpTransaksi/" +
                        listTujuan[i].IdTransaksi +
                        "/tujuan_konversi/" +
                        listTujuan[i].JumlahPrimer +
                        "/" +
                        listTujuan[i].JumlahSekunder +
                        "/" +
                        listTujuan[i].JumlahTritier,
                    () => {
                        tujuanDone = true;
                        if (i == listTujuan.length - 1 && asalDone)
                            post_action();
                    }
                );
            }
        );
    }
}

function prosesHapusFetch(id_konversi_ng) {
    // SP_5409_EXT_DELETE_KONVERSI_NG
    fetchStmt("/Benang/delKonversiNG/" + id_konversi_ng, () => {
        clearAll();
        disableAll();
        toggleButtons(1);
        modeProses = "";
        alert("Data berhasil dihapus.");
        btnIsi.focus();
        RK_modeProses = "";
        refetchNomor = true;
    });
}

function rowClickedAsal(row, data, _) {
    if (pilAsal == findClickedRowInList(listAsal, "IdType", data.IdType)) {
        row.style.background = "white";
        pilAsal = -1;
    } else {
        pilAsal = findClickedRowInList(listAsal, "IdType", data.IdType);
        clearSelection_DataTable("tabel_asal");
        row.style.background = "aliceblue";
        clickedTable = "asal";

        if (modeProses == "koreksi" || modeProses == "isi") {
            RK_txtIdKelut.value = data.IdKelompokUtama;
            RK_txtNamaKelut.value = data.NamaKelompokUtama;
            RK_txtIdKelompok.value = data.IdKelompok;
            RK_txtNamaKelompok.value = data.NamaKelompok;
            RK_txtIdSubkel.value = data.IdSubKelompok;
            RK_txtNamaSubkel.value = data.NamaSubKelompok;
            RK_txtIdType.value = data.IdType;
            RK_txtNamaType.value = data.NamaType;

            if (modeProses == "koreksi") {
                txtPrimerAsal.value = data.JumlahPrimer;
                txtSekunderAsal.value = data.JumlahSekunder;
                txtTritierAsal.value = data.JumlahTritier;

                RK_disableAll("asal");
                RK_modeProses = "asal";
            }

            RK_modeProses = "asal";
            saldoTypeFetch(RK_txtIdType.value, true);
            $("#form_rincian_konversi").modal("show");
        }
    }
}

function rowClickedTujuan(row, data, _) {
    if (pilTujuan == findClickedRowInList(listTujuan, "IdType", data.IdType)) {
        row.style.background = "white";
        pilTujuan = -1;
    } else {
        pilTujuan = findClickedRowInList(listTujuan, "IdType", data.IdType);
        clearSelection_DataTable("tabel_asal");
        row.style.background = "aliceblue";
        clickedTable = "tujuan";

        if (modeProses == "koreksi") {
            addOptionIfNotExists(
                RK_slcKelut,
                data.IdKelompokUtama,
                data.IdKelompokUtama + " | " + data.NamaKelompokUtama
            );

            addOptionIfNotExists(
                RK_slcKelompok,
                data.IdKelompok,
                data.IdKelompok + " | " + data.NamaKelompok
            );

            addOptionIfNotExists(
                RK_slcSubkel,
                data.IdSubKelompok,
                data.IdSubKelompok + " | " + data.NamaSubKelompok
            );

            addOptionIfNotExists(
                RK_slcType,
                data.IdType,
                data.IdType + " | " + data.NamaType
            );

            txtPrimerTujuan.value = data.JumlahPrimer;
            txtSekunderTujuan.value = data.JumlahSekunder;
            txtTritierTujuan.value = data.JumlahTritier;

            RK_disableAll("tujuan");
            RK_modeProses = "tujuan";
            saldoTypeFetch(listTujuan[pilTujuan].IdType, false);
            $("#form_rincian_konversi").modal("show");
        }
    }
}

function disableAll() {
    listOfSlc.forEach((slc) => (slc.disabled = true));
    timeAwal.classList.add("unclickable");
    timeAkhir.classList.add("unclickable");
    dateInput.classList.add("unclickable");
    txtShift.disabled = true;
}

function clearAll() {
    listOfSlc.forEach((slc) => (slc.selectedIndex = 0));
    timeAwal.value = "00:00";
    timeAkhir.value = "00:00";
    txtShift.value = "";
    dateInput.value = getCurrentDate();
    dateMohon.value = getCurrentDate();
    listAsal.length = 0;
    clearTable_DataTable("table_asal", colTable.length, "padding=250px");
    listTujuan.length = 0;
    clearTable_DataTable("table_tujuan", colTable.length, "padding=250px");
}

function toggleButtons(tmb) {
    switch (tmb) {
        case 1:
            btnIsi.disabled = false;
            btnKoreksi.disabled = false;
            btnHapus.disabled = false;
            btnProses.disabled = true;
            btnKeluar.textContent = "Keluar";
            break;
        case 2:
            btnIsi.disabled = true;
            btnKoreksi.disabled = true;
            btnHapus.disabled = true;
            btnProses.disabled = false;
            btnKeluar.textContent = "Batal";
            break;

        default:
            break;
    }
}
//#endregion

function init() {
    $("#table_asal").DataTable({
        responsive: true,
        paging: false,
        scrollY: "125px",
        scrollX: "1000000px",
        columns: colTable,
        dom: '<"row"<"col-sm-6"i><"col-sm-6"f>>' + '<"row"<"col-sm-12"tr>>',
        language: {
            searchPlaceholder: " Tabel asal...",
            search: "",
        },
    });

    $("#table_tujuan").DataTable({
        responsive: true,
        paging: false,
        scrollY: "125px",
        scrollX: "1000000px",
        columns: colTable,
        dom: '<"row"<"col-sm-6"i><"col-sm-6"f>>' + '<"row"<"col-sm-12"tr>>',
        language: {
            searchPlaceholder: " Tabel tujuan...",
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

    clearTable_DataTable("table_asal", colTable.length, "padding=250px");
    clearTable_DataTable("table_tujuan", colTable.length, "padding=250px");
    dateInput.value = getCurrentDate();
    dateMohon.value = getCurrentDate();
    timeAkhir.value = "00:00";
    timeAwal.value = "00:00";
    btnIsi.focus();

    /**
     * DEBUG
     */

    // dateInput.value = "2023-08-22";
    // lihatDataKonversiNGFetch("1");

    // txtShift.value = "P";

    // addOptionIfNotExists(slcNoKonversi, "EXT-0000009043");
    // addOptionIfNotExists(slcType, "1");
    // displayDataBenangNGFetch();
}

$(document).ready(() => init());
