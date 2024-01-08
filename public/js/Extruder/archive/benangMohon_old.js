//#region Variables
const dateMohon = document.getElementById("tanggal_mohon");
const dateInput = document.getElementById("tanggal");

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
const btnRK = document.getElementById("btn_rk");

const listOfSlc = document.querySelectorAll("#form_benang_mohon select");
const listOfTxt = document.querySelectorAll(
    "#form_benang_mohon .form-control:not(input[type='date'])"
);

const listAsal = [];
const listTujuan = [];
/* ISI LIST
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

const tableWidth = 14;
const tableAsalPos = $("#table_asal").offset().top - 125;
const tableTujuanPos = $("#table_tujuan").offset().top - 125;
const tableCol = [
    { width: "200px" }, // Id Type
    { width: "200px" }, // Nama Type
    { width: "100px" }, // Jumlah Primer
    { width: "100px" }, // Jumlah Sekunder
    { width: "100px" }, // Jumlah Tritier
    { width: "100px" }, // Nama Objek
    { width: "125px" }, // Nama Kelompok Utama
    { width: "100px" }, // Nama Kelompok
    { width: "125px" }, // Nama Sub-kelompok
    { width: "100px" }, // Id Objek
    { width: "100px" }, // Id Kelompok Utama
    { width: "100px" }, // Id Kelompok
    { width: "100px" }, // Id Sub-kelompok
    { width: "100px" }, // Id Transaksi
];

const hidRincianKonv = document.getElementById("form_rk_return");

var modeProses = "";
var pilAsal = -1; // "tabel_asal"
var pilTujuan = -1; // "tabel_tujuan"
var pilNoKonv = -1; // "select_nomor_konversi"
var pilSlcType = -1;
var refetchType = false; // "select_type"
var refetchKonv = false; // "select_konversi"
//#endregion

//#region Events
btnIsi.addEventListener("click", function () {
    clearData();
    toggleButtons(2);

    modeProses = "isi";
    slcNomor.disabled = true;
    dateInput.classList.remove("unclickable");
    dateInput.value = dateMohon.value;
    dateInput.focus();
});

btnKoreksi.addEventListener("click", function () {
    clearData();
    toggleButtons(2);

    modeProses = "koreksi";
    slcNomor.disabled = false;
    slcNomor.focus();
});

btnHapus.addEventListener("click", function () {
    clearData();
    toggleButtons(2);

    modeProses = "hapus";
    slcNomor.disabled = false;
    slcNomor.focus();
});

btnKeluar.addEventListener("click", function () {
    if (this.textContent == "Keluar") {
        window.location.href = "/Extruder/ExtruderNet";
    } else {
        toggleButtons(1);
        clearData();
        disableControl();

        modeProses = "";
    }
});

btnProses.addEventListener("click", function () {
    if (modeProses == "isi") {
        if (listAsal.length < 1 || listTujuan.length < 1) {
            alert(
                "Data tidak dapat diproses karena tidak ada asal atau tujuan konversi."
            );
        } else {
            prosesIsi();
        }
    } else {
        if (slcNomor.selectedIndex == 0) {
            alert(
                "Belum ada data konversi yang terpilih.\n" +
                    'Mohon periksa kembali bagian "-- Pilih Nomor --"'
            );
        } else if (modeProses == "koreksi") {
            showModal(
                "Koreksi",
                "Apakah anda yakin akan mengoreksi data ini?",
                () => {
                    prosesKoreksi();
                },
                () => {}
            );
        } else if (modeProses == "hapus") {
            showModal(
                "Hapus",
                "Apakah anda yakin akan menghapus data ini?",
                () => {
                    posesHapus();
                },
                () => {}
            );
        }
    }
});

slcNomor.addEventListener("mousedown", function () {
    if (dateInput.value != getCurrentDate() || this.options.length <= 2) {
        clearOptions(this);
        const errorOption = addLoadingOption(this);
        const optionKeys = {
            valueKey: "IdKonversiNG",
            textKey: "MesinShift",
        };

        // SP_5298_EXT_KOREKSI_SORTIRNG_BLMACC
        fetchSelect(
            `/Benang/getKoreksiSrtBlmAcc/${dateInput.value}`,
            (data) => {
                addOptions(this, data, optionKeys, false);
                this.removeChild(errorOption);
            },
            errorOption
        );
    }
});

slcNomor.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        if (dateInput.value != getCurrentDate() || this.options.length <= 2) {
            clearOptions(this);
            const errorOption = addLoadingOption(this);
            const optionKeys = {
                valueKey: "IdKonversiNG",
                textKey: "MesinShift",
            };

            // SP_5298_EXT_KOREKSI_SORTIRNG_BLMACC
            fetchSelect(
                `/Benang/getKoreksiSrtBlmAcc/${dateInput.value}`,
                (data) => {
                    addOptions(this, data, optionKeys, false);
                    this.removeChild(errorOption);
                },
                errorOption
            );
        }
    }
});

slcNomor.addEventListener("change", function () {
    lihatDataKonversiNG(this.value);
    if (modeProses == "koreksi") {
        $("html, body").animate({ scrollTop: tableAsalPos }, 100);
        pilAsal = 0;
    } else if (modeProses == "hapus") {
        btnProses.focus();
    }
});

slcType.addEventListener("mousedown", function () {
    if (listTujuan.length == 0) {
        if (this.options.length <= 3 || refetchType) {
            clearOptions(this);
            const errorOption = addLoadingOption(this);
            const optionKeys = {
                valueKey: "IdType",
                textKey: "Type",
            };

            // SP_5298_EXT_LIST_PROD_NG
            fetchSelect(
                `/Benang/getListProdNG/${slcNoKonversi.value}`,
                (data) => {
                    addOptions(this, data, optionKeys);
                    this.removeChild(errorOption);

                    refetchType = false;
                },
                errorOption
            );
        }
    } else {
        alert(
            "Type tidak boleh diubah, karena sudah terdapat Item Tujuan Konversi"
        );
    }
});

slcType.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        if (listTujuan.length == 0) {
            if (this.options.length <= 3 || refetchType) {
                clearOptions(this);
                const errorOption = addLoadingOption(this);
                const optionKeys = {
                    valueKey: "IdType",
                    textKey: "Type",
                };

                // SP_5298_EXT_LIST_PROD_NG
                fetchSelect(
                    `/Benang/getListProdNG/${slcNoKonversi.value}`,
                    (data) => {
                        addOptions(this, data, optionKeys);
                        this.removeChild(errorOption);

                        refetchType = false;
                    },
                    errorOption
                );
            }
        } else {
            alert(
                "Type tidak boleh diubah, karena sudah terdapat Item Tujuan Konversi"
            );
        }
    }
});

slcType.addEventListener("change", function () {
    // SP_5298_EXT_CEK_DATA_NG Kode 1
    fetchSelect(
        `/Benang/getDataNG/1/${slcNoKonversi.value}/${this.value}`,
        (data) => {
            if (data[0].ada > 0) {
                // SP_5298_EXT_CEK_DATA_NG Kode 2
                fetchSelect(
                    `/Benang/getDataNG/2/${slcNoKonversi.value}/${this.value}`,
                    (data) => {
                        if (data[0].saatLog !== undefined) {
                            alert(
                                "Type: " +
                                    this.value.split(" | ")[1] +
                                    "telah disortir dan di-ACC\n" +
                                    "Data dapat dilihat pada Kartu Barang Inventory"
                            );
                        } else {
                            alert(
                                "Type: " +
                                    this.value.split(" | ")[1] +
                                    "telah disortir dan di-ACC\n" +
                                    "Data dapat dilihat pada ACC Sortir Benang NG"
                            );
                        }
                    }
                );
            } else {
                if (this.selectedIndex != pilSlcType) {
                    pilSlcType = this.selectedIndex;
                    listAsal.length = 0;
                    clearTable_DataTable("table_asal", tableCol.length, [
                        "padding=150px",
                        "Memuat data...",
                    ]);

                    displayDataBenangNG();
                }
            }
        }
    );
});

slcNoKonversi.addEventListener("mousedown", function () {
    if (pilNoKonv != -1) {
        this.remove(pilNoKonv);
    }

    if (
        this.options.length <= 3 ||
        dateInput.value != getCurrentDate() ||
        refetchKonv
    ) {
        clearOptions(this);
        const errorOption = addLoadingOption(this);
        const optionKeys = {
            valueKey: "Konversi",
            textKey: "TypeMesin",
        };

        // SP_5298_EXT_LIST_IDKONV Kode 1
        fetchSelect(
            `/Benang/getListIdKonv/1/null/null/EXT/${dateInput.value}/${txtShift.value}`,
            (data) => {
                addOptions(this, data, optionKeys);
                this.removeChild(errorOption);

                refetchKonv = false;
            },
            errorOption
        );
    }
});

slcNoKonversi.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        if (pilNoKonv != -1) {
            this.remove(pilNoKonv);
        }

        if (
            this.options.length <= 3 ||
            dateInput.value != getCurrentDate() ||
            refetchKonv
        ) {
            clearOptions(this);
            const errorOption = addLoadingOption(this);
            const optionKeys = {
                valueKey: "Konversi",
                textKey: "TypeMesin",
            };

            // SP_5298_EXT_LIST_IDKONV Kode 1
            fetchSelect(
                `/Benang/getListIdKonv/1/null/null/EXT/${dateInput.value}/${txtShift.value}`,
                (data) => {
                    addOptions(this, data, optionKeys);
                    this.removeChild(errorOption);

                    refetchKonv = false;
                },
                errorOption
            );
        }
    }
});

slcNoKonversi.addEventListener("change", function () {
    listAsal.length = 0;
    clearTable_DataTable("table_asal", tableWidth, "padding=150px");
    listTujuan.length = 0;
    clearTable_DataTable("table_tujuan", tableWidth, "padding=150px");

    addOptionIfNotExists(
        slcMesin,
        "slcNoKonversi",
        this[this.selectedIndex].textContent.replace(/\s+/g, "").split("|")[1]
    );

    addOptionIfNotExists(
        slcNoKonversi,
        this.value.split("//")[0],
        this.value.split("//")[0] + " | " + this.value.split("//")[1]
    );

    pilNoKonv = this.selectedIndex;
    refetchType = true;

    if (slcType.selectedIndex != 0) {
        // SP_5298_EXT_LIST_IDKONV Kode 2
        fetchSelect(`/Benang/getListIdKonv/2/${this.value}`, (data) => {
            if (data.length != 0) {
                timeAwal.value = dateTimetoTime(data[0].AwalShift);
                timeAkhir.value = dateTimetoTime(data[0].AkhirShift);
            }
        });
    }

    slcType.disabled = false;
    slcType.focus();
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

txtShift.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (this.value.trim() == "") {
            alert("Shift tidak boleh kosong.");
            this.focus();
        } else {
            this.value = this.value.toUpperCase();
            slcNoKonversi.disabled = false;
            slcNoKonversi.focus();
        }
    }
});

txtShift.addEventListener("change", function () {
    refetchKonv = true;
});

hidRincianKonv.addEventListener("change", function () {
    if (this.value == "CONFIRM") {
        if (pilAsal != -1) {
            if (modeProses == "isi") {
                listTujuan.push({
                    IdType: slcTypeRK.value,
                    NamaType: slcTypeRK.textContent.split(" | ")[1],
                    JumlahPemasukanPrimer: txtPrimerTujuan.value,
                    JumlahPemasukanSekunder: txtSekunderTujuan.value,
                    JumlahPemasukanTritier: txtTersierTujuan.value,
                    NamaObjek: "Bahan & Hasil Produksi",
                    NamaKelompokUtama:
                        slcKelompokUtamaRK.textContent.split(" | ")[1],
                    NamaKelompok: slcKelompokRK.textContent.split(" | ")[1],
                    NamaSubKelompok:
                        slcSubKelompokRK.textContent.split(" | ")[1],
                    IdObjek: "032",
                    IdKelompokUtama: slcKelompokUtamaRK.value,
                    IdKelompok: slcKelompokRK.value,
                    IdSubKelompok: slcSubKelompokRK.value,
                    IdTransaksi: "",
                });

                addTable_DataTable(
                    "table_tujuan",
                    listTujuan,
                    tableCol,
                    rowClickedTujuan
                );
            } else if (modeProses == "koreksi") {
                listAsal[pilAsal].JumlahPengeluaranPrimer = txtPrimerAsal.value;
                listAsal[pilAsal].JumlahPengeluaranSekunder =
                    txtSekunderAsal.value;
                listAsal[pilAsal].JumlahPengeluaranTritier =
                    txtTersierAsal.value;
            }

            btnProses.focus();
        } else if (pilTujuan != -1) {
            if (modeProses == "koreksi") {
                listTujuan[pilTujuan].JumlahPemasukanPrimer =
                    txtPrimerTujuan.value;
                listTujuan[pilTujuan].JumlahPemasukanSekunder =
                    txtSekunderTujuan.value;
                listTujuan[pilTujuan].JumlahPemasukanTritier =
                    txtTersierTujuan.value;

                btnProses.focus();
            }
        }
    }
});
//#endregion

//#region Functions
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

function clearData() {
    listOfTxt.forEach((txt) => {
        txt.value = "";
    });

    listOfSlc.forEach((slc) => {
        slc.selectedIndex = 0;
    });

    listAsal.length = 0;
    clearTable_DataTable("table_asal", tableWidth, "padding=100px");
    listTujuan.length = 0;
    clearTable_DataTable("table_tujuan", tableWidth, "padding=100px");
}

function disableControl() {
    slcNomor.disabled = true;
    slcNoKonversi.disabled = true;
    slcType.disabled = true;
    slcMesin.disabled = true;
    txtShift.disabled = true;
}

function lihatDataKonversiNG(id_konversi) {
    listAsal.length = 0;
    clearTable_DataTable("table_asal", tableWidth, "padding=100px");
    listTujuan.length = 0;
    clearTable_DataTable("table_tujuan", tableWidth, "padding=100px");

    let id_konv_inv = "";

    // SP_5298_EXT_LISTDATA_NG
    fetchSelect(
        `/Benang/getListDataNG/${id_konversi}/${dateInput.value}`,
        (data) => {
            timeAwal.value = dateTimetoTime(data[0].AwalShift);
            timeAkhir.value = dateTimetoTime(data[0].AkhirShift);
            id_konv_inv = data[0].IdKonversiINV;

            addOptionIfNotExists(
                slcNoKonversi,
                data[0].IdKonversiEXT,
                data[0].IdKonversiEXT + " | " + data[0].NamaKomposisi
            );

            // SP_5298_EXT_DETAILURAIAN_KONV_NG
            fetchSelect(
                `/Benang/getDetailUraianKonvNG/${id_konv_inv}`,
                (data) => {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].UraianDetailTransaksi == "Asal Konversi") {
                            listAsal.push({
                                IdType: data[i].IdType,
                                NamaType: data[i].NamaType,
                                JumlahPrimer: data[i].JumlahPengeluaranPrimer,
                                JumlahSekunder:
                                    data[i].JumlahPengeluaranSekunder,
                                JumlahTritier: data[i].JumlahPengeluaranTritier,
                                NamaObjek: data[i].NamaObjek,
                                NamaKelompokUtama: data[i].NamaKelompokUtama,
                                NamaKelompok: data[i].NamaKelompok,
                                NamaSubKelompok: data[i].NamaSubKelompok,
                                IdObjek: data[i].IdObjek,
                                IdKelompokUtama: data[i].IdKelompokUtama,
                                IdKelompok: data[i].IdKelompok,
                                IdSubKelompok: data[i].IdSubKelompok,
                                IdTransaksi: data[i].IdTransaksi,
                            });

                            addTable_DataTable(
                                "table_asal",
                                listAsal,
                                tableCol,
                                rowClickedAsal,
                                null,
                                "Izumi Sagiri"
                            );
                        } else if (
                            data[i].UraianDetailTransaksi == "Tujuan Konversi"
                        ) {
                            listTujuan.push({
                                IdType: data[i].IdType,
                                NamaType: data[i].NamaType,
                                JumlahPrimer: data[i].JumlahPemasukanPrimer,
                                JumlahSekunder: data[i].JumlahPemasukanSekunder,
                                JumlahTritier: data[i].JumlahPemasukanTritier,
                                NamaObjek: data[i].NamaObjek,
                                NamaKelompokUtama: data[i].NamaKelompokUtama,
                                NamaKelompok: data[i].NamaKelompok,
                                NamaSubKelompok: data[i].NamaSubKelompok,
                                IdObjek: data[i].IdObjek,
                                IdKelompokUtama: data[i].IdKelompokUtama,
                                IdKelompok: data[i].IdKelompok,
                                IdSubKelompok: data[i].IdSubKelompok,
                                IdTransaksi: data[i].IdTransaksi,
                            });

                            addTable_DataTable(
                                "table_tujuan",
                                listTujuan,
                                tableCol,
                                rowClickedTujuan
                            );
                        }
                    }
                }
            );
        }
    );
}

function displayDataBenangNG() {
    // SP_5298_EXT_LIST_IDKONV Kode 3
    fetchSelect(
        `/Benang/getListIdKonv/3/${slcNoKonversi.value}/${slcType.value}`,
        (data) => {
            if (data.length != 0) {
                for (let i = 0; i < data.length; i++) {
                    listAsal.push({
                        IdType: data[i].IdType,
                        NamaType: data[i].NamaType,
                        JumlahPrimer: data[i].JumlahPrimer,
                        JumlahSekunder: data[i].JumlahSekunder,
                        JumlahTritier: data[i].JumlahTritier,
                        NamaObjek: data[i].NamaObjek,
                        NamaKelompokUtama: data[i].NamaKelompokUtama,
                        NamaKelompok: data[i].NamaKelompok,
                        NamaSubKelompok: data[i].NamaSubKelompok,
                        IdObjek: data[i].IdObjek,
                        IdKelompokUtama: data[i].IdKelompokUtama,
                        IdKelompok: data[i].IdKelompok,
                        IdSubKelompok: data[i].IdSubKelompok,
                        IdTransaksi: "",
                    });

                    addTable_DataTable(
                        "table_asal",
                        listAsal,
                        tableCol,
                        rowClickedAsal
                    );

                    $("html, body").animate({ scrollTop: tableAsalPos }, 100);
                    pilAsal = 0;
                }
            } else {
                alert("Hasil konversi tidak menghasilkan Benang NG.");
            }
        }
    );
}

function prosesIsi() {
    let id_konv_inv = "";

    // SP_5298_EXT_INSERT_MASTERKONV_NG
    fetchStmt(
        `/Benang/insMasterKonvNG/${dateMohon.value}/${slcNoKonversi.value}/tmpUser`,
        () => {
            fetchSelect(`/Benang/getIdKonversiNG`, (data) => {
                addOptionIfNotExists(slcNomor, data.IdKonversiNG);

                // SP_5298_EXT_LIST_COUNTER
                fetchSelect(`/Benang/getListCounter`, (data) => {
                    id_konv_inv = data.NoKonversi.padStart(9, "0");
                    modeProses = "";

                    insertDetail(id_konv_inv);
                });
            });
        }
    );
}

function insertDetail(id_konv_inv) {
    // SP_5298_EXT_INSERT_DETAILKONV_NG
    for (let i = 0; i < listAsal.length; i++) {
        fetchStmt(
            `/Benang/insDetailKonvNG/${slcNomor.value}/${listAsal[i].IdType}/${listAsal[i].JumlahPengeluaranPrimer}/${listAsal[i].JumlahPengeluaranSekunder}/${listAsal[i].JumlahPengeluaranTritier}/${id_konv_inv}`,
            () => {
                createTmpTransaksiInventory(i, id_konv_inv, 0);
            }
        );
    }

    for (let i = 0; i < listTujuan.length; i++) {
        fetchStmt(
            `/Benang/insDetailKonvNG/${slcNomor.value}/${listTujuan[i].IdType}/${listTujuan[i].JumlahPemasukanPrimer}/${listTujuan[i].JumlahPemasukanSekunder}/${listTujuan[i].JumlahPemasukanTritier}/${id_konv_inv}`,
            () => {
                createTmpTransaksiInventory(i, id_konv_inv, 1);
            }
        );
    }
}

function createTmpTransaksiInventory(i, id_konv_inv, status) {
    let urlString = "";
    switch (status) {
        case 0:
            // SP_5298_EXT_INSERT_04_ASALTMPTRANSAKSI Asal Konersi
            urlString = `/Benang/insAsalTmpTrans/04/asal_konversi/
                ${listAsal[i].IdType}/tmpUser/${dateMohon.value}/
                ${listAsal[i].JumlahPengeluaranPrimer}/
                ${listAsal[i].JumlahPengeluaranSekunder}/
                ${listAsal[i].JumlahPengeluaranTritier}/
                ${listAsal[i].IdSubKelompok}/${id_konv_inv}`;
            break;
        case 1:
            // SP_5298_EXT_INSERT_04_TUJUANTMPTRANSAKSI Tujuan Konversi
            urlString = `/Benang/insTujuanTmpTrans/04/tujuan_konversi/
                ${listTujuan[i].IdType}/tmpUser/${dateMohon.value}/
                ${listTujuan[i].JumlahPemasukanPrimer}/
                ${listTujuan[i].JumlahPemasukanSekunder}/
                ${listTujuan[i].JumlahPemasukanTritier}/
                ${listTujuan[i].IdSubKelompok}/${id_konv_inv}`;
            break;

        default:
            break;
    }

    fetchStmt(urlString, () => {
        clearData();
        disableControl();
        toggleButtons(1);

        alert("Data berhasil tersimpan!");
    });
}

function prosesKoreksi() {
    for (let i = 0; i < listAsal.length; i++) {
        // SP_5298_EXT_UPDATE_DETAIL_KONV_NG
        fetchStmt(
            `/Benang/updDetailKonvNG/${slcNomor.value}/${listAsal[i].IdType}/${listAsal[i].JumlahPengeluaranPrimer}/${listAsal[i].JumlahPengeluaranSekunder}/${listAsal[i].JumlahPengeluaranTritier}`
        );

        // SP_5298_EXT_UPDATE_TMPTRANSAKSI
        fetchStmt(
            `/Benang/updTmpTransaksi/${listAsal[i].IdTransaksi}/asal_konversi/${listAsal[i].JumlahPengeluaranPrimer}/${listAsal[i].JumlahPengeluaranSekunder}/${listAsal[i].JumlahPengeluaranTritier}`
        );
    }

    for (let i = 0; i < listTujuan.length; i++) {
        fetchStmt(
            `/Benang/updDetailKonvNG/${slcNomor.value}/${listTujuan[i].IdType}/${listTujuan[i].JumlahPengeluaranPrimer}/${listTujuan[i].JumlahPengeluaranSekunder}/${listTujuan[i].JumlahPengeluaranTritier}`
        );

        fetchStmt(
            `/Benang/updTmpTransaksi/${listTujuan[i].IdTransaksi}/tujuan_konversi/${listTujuan[i].JumlahPengeluaranPrimer}/${listTujuan[i].JumlahPengeluaranSekunder}/${listTujuan[i].JumlahPengeluaranTritier}`
        );
    }

    clearData();
    disableControl();
    toggleButtons(1);

    modeProses = "";

    alert("Data telah berhasil dikoreksi!");
}

function prosesHapus() {
    // SP_5409_EXT_DELETE_KONVERSI_NG
    fetchStmt(`/Benang/delKonversiNG/${slcNomor.value}`, () => {
        clearData();
        disableControl();
        toggleButtons(1);

        modeProses = "";

        alert("Data telah berhasil dihapus!");
    });
}

function rowClickedAsal(row, data, index) {
    if (pilAsal == index) {
        row.style.background = "white";
        pilAsal = -1;
    } else {
        clearSelection_DataTable("table_asal");
        row.style.background = "aliceblue";
        pilAsal = index;
        pilTujuan = -1;
        clearSelection_DataTable("table_tujuan");

        if (modeProses == "koreksi" || modeProses == "isi") {
            txtIdKelompokUtama.value = data.IdKelompokUtama;
            txtNamaKelompokUtama.value = data.NamaKelompokUtama;
            txtIdKelompok.value = data.IdKelompok;
            txtNamaKelompok.value = data.NamaKelompok;
            txtIdSubKelompok.value = data.IdSubKelompok;
            txtNamaSubKelompok.value = data.NamaSubKelompok;
            txtIdType.value = data.IdType;
            txtNamaType.value = data.NamaType;

            if (modeProses == "koreksi") {
                txtPrimerAsal.value = data.JumlahPengeluaranPrimer;
                txtSekunderAsal.value = data.JumlahPengeluaranSekunder;
                txtTersierAsal.value = data.JumlahPengeluaranTritier;

                const tujuanKonvEle = document
                    .getElementById("tujuan_konv")
                    .querySelectorAll("input, select");
                tujuanKonvEle.forEach((element) => {
                    element.disabled = false;

                    if (element.tagName === "INPUT") {
                        element.value = "";
                    } else {
                        element.selectedIndex = 0;
                    }
                });
            }
        }

        btnRK.click();
    }
}

function rowClickedTujuan(index) {
    if (pilTujuan == index) {
        pilTujuan = -1;
    } else {
        pilTujuan = index;
        pilAsal = -1;

        if (modeProses == "koreksi") {
            addOptionIfNotExists(
                slcKelompokUtamaRK,
                listTujuan[pilTujuan].IdKelompokUtama,
                listTujuan[pilTujuan].IdKelompokUtama +
                    " | " +
                    listTujuan[pilTujuan].NamaKelompokUtama
            );

            addOptionIfNotExists(
                slcKelompokRK,
                listTujuan[pilTujuan].IdKelompok,
                listTujuan[pilTujuan].IdKelompok +
                    " | " +
                    listTujuan[pilTujuan].NamaKelompok
            );

            addOptionIfNotExists(
                slcSubKelompokRK,
                listTujuan[pilTujuan].IdSubKelompok,
                listTujuan[pilTujuan].IdSubKelompok +
                    " | " +
                    listTujuan[pilTujuan].NamaSubKelompok
            );

            addOptionIfNotExists(
                slcTypeRK,
                listTujuan[pilTujuan].IdType,
                listTujuan[pilTujuan].IdType +
                    " | " +
                    listTujuan[pilTujuan].NamaType
            );

            txtPrimerTujuan.value = listTujuan[pilTujuan].JumlahPemasukanPrimer;
            txtSekunderTujuan.value =
                listTujuan[pilTujuan].JumlahPemasukanSekunder;
            txtTersierTujuan.value =
                listTujuan[pilTujuan].JumlahPemasukanTritier;

            const asalKonvEle = document
                .getElementById("asal_konv")
                .querySelectorAll("input, select");
            asalKonvEle.forEach((element) => {
                element.disabled = false;

                if (element.tagName === "INPUT") {
                    element.value = "";
                } else {
                    element.selectedIndex = 0;
                }
            });
        }
    }
}
//#endregion

function init() {
    // if ($.fn.DataTable.isDataTable("#table_tujuan")) {
    //     $("#table_tujuan").DataTable().destroy();
    // }

    // if ($.fn.DataTable.isDataTable("#table_asal")) {
    //     $("#table_asal").DataTable().destroy();
    // }

    $("#table_asal").DataTable({
        responsive: true,
        paging: false,
        scrollY: "250px",
        scrollX: "1000000px",
        columns: tableCol,
        dom: '<"row"<"col-sm-6"i><"col-sm-6"f>>' + '<"row"<"col-sm-12"tr>>',
        language: {
            searchPlaceholder: " Tabel asal...",
            search: "",
        },
    });

    $("#table_tujuan").DataTable({
        responsive: true,
        paging: false,
        scrollY: "250px",
        scrollX: "1000000px",
        columns: tableCol,
        dom: '<"row"<"col-sm-6"i><"col-sm-6"f>>' + '<"row"<"col-sm-12"tr>>',
        language: {
            searchPlaceholder: " Tabel tujuan...",
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

    clearTable_DataTable("table_asal", tableCol.length, "padding=150px");
    clearTable_DataTable("table_tujuan", tableCol.length, "padding=150px");
    dateMohon.value = getCurrentDate();
    dateInput.value = getCurrentDate();
    dateMohon.focus();
}

$(document).ready(function () {
    init();

    btnIsi.focus();
});
