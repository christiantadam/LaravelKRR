//#region Variables
const dateInput = document.getElementById("tanggal");
const rdoMasuk = document.getElementById("radio_masuk");
const rdoLibur = document.getElementById("radio_libur");

const timeShiftAwal = document.getElementById("shift_awal");
const timeShiftAkhir = document.getElementById("shift_akhir");
const timeGangAwal = document.getElementById("waktu_awal");
const timeGangAkhir = document.getElementById("waktu_akhir");

const slcKodeMesin = document.getElementById("select_kode_mesin");
const slcKomposisi = document.getElementById("select_komposisi");
const slcGangguan = document.getElementById("select_gangguan");

const txtNoTransaksi = document.getElementById("no_transaksi");
const txtShift = document.getElementById("shift");
const txtJmlhJam = document.getElementById("jmlh_jam");
const txtJmlhMenit = document.getElementById("jmlh_menit");
const txtKeterangan = document.getElementById("keterangan");
const txtTanggal = document.getElementById("data_tgl");

const btnOk = document.getElementById("btn_ok");
const btnIsi = document.getElementById("btn_isi");
const btnKoreksi = document.getElementById("btn_koreksi");
const btnHapus = document.getElementById("btn_hapus");
const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");

const listOfTransaksi = document.querySelectorAll(
    "#card_transaksi .form-control, .form-check-input, #card_transaksi .form-select"
);

const listOfGangguan = document.querySelectorAll(
    "#card_gangguan .form-control, #card_gangguan .form-select"
);

const listGangguan = [];
/* ISI LIST GANGGUAN
    0 NoTrans
    1 Tanggal
    2 IdMesin
    3 TypeMesin
    4 IdKonversi
    5 IdGangguan
    6 NamaGangguan
    7 AwalGangguan
    8 AkhirGangguan
    9 JumlahJam
    10 JumlahMenit
    11 Keterangan
*/

const posGangguan = $("#table_gangguan").offset().top - 125;
const colGangguan = [
    { width: "125px" }, // No. Transaksi
    { width: "100px" }, // Tanggal
    { width: "100px" }, // Id Mesin
    { width: "100px" }, // Nama Mesin
    { width: "125px" }, // Id Konversi
    { width: "50px" }, // Id Gangguan
    { width: "125px" }, // Nama Gangguan
    { width: "100px" }, // Awal Gangguan
    { width: "100px" }, // Akhir Gangguan
    { width: "100px" }, // Jumlah Jam
    { width: "110px" }, // Jumlah Menit
    { width: "125px" }, // Keterangan
];

var checkboxesGangguan = null;
var pilGangguan = -1;
var modeProses = "";
var refetchKomposisi = false;
//#endregion

//#region Events
dateInput.addEventListener("keypress", function (event) {
    if (event.key == "Enter") slcKodeMesin.focus();
});

timeShiftAwal.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        timeShiftAkhir.focus();
    }
});

timeGangAwal.addEventListener("keypress", function (event) {
    if (event.key == "Enter") timeGangAkhir.focus();
});

timeGangAkhir.addEventListener("keypress", function (event) {
    if (event.key == "Enter") this.blur();
});

timeShiftAkhir.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        slcGangguan.focus();
    }
});

rdoLibur.addEventListener("change", function () {
    slcKomposisi.selectedIndex = 0;
});

rdoMasuk.addEventListener("change", function () {
    slcKomposisi.selectedIndex = 0;
});

btnOk.addEventListener("click", function () {
    listGangguan.length = 0;
    clearTable_DataTable("table_gangguan", colGangguan.length, [
        "padding=250px",
        "Memuat data...",
    ]);

    loadDataGangguanProdEXT();
});

btnIsi.addEventListener("click", function () {
    toggleButtons(2);
    clearAll();
    modeProses = "isi";
    timeGangAwal.value = getCurrentDate() + "T" + getCurrentTime("hh:mm");
    timeGangAkhir.value = getCurrentDate() + "T" + getCurrentTime("hh:mm");
    setEnable(true);
});

btnKoreksi.addEventListener("click", function () {
    if (pilGangguan != -1) {
        modeProses = "koreksi";
        toggleButtons(2);
        setEnable(true, "gangguan");
        timeGangAwal.focus();
    } else {
        alert("Belum ada data yang dipilih.");
    }
});

btnHapus.addEventListener("click", function () {
    if (pilGangguan != -1) {
        toggleButtons(2);
        modeProses = "hapus";

        btnProses.focus();
    } else {
        alert("Belum ada data yang dipilih.");
    }
});

btnProses.addEventListener("click", function () {
    if (modeProses == "isi") {
        if (slcKodeMesin.selectedIndex == 0) {
            slcKodeMesin.focus();
            alert("Data belum terisi dengan lengkap. Mohon periksa kembali!");
        } else if (slcKomposisi.selectedIndex == 0) {
            slcKomposisi.focus();
            alert("Data belum terisi dengan lengkap. Mohon periksa kembali!");
        } else if (slcGangguan.selectedIndex == 0) {
            slcGangguan.focus();
            alert("Data belum terisi dengan lengkap. Mohon periksa kembali!");
        } else if (txtKeterangan.value.trim() == "") {
            txtKeterangan.focus();
            alert("Data belum terisi dengan lengkap. Mohon periksa kembali!");
        } else prosesIsi();
    } else if (modeProses == "koreksi") {
        prosesUpdate();
    } else if (modeProses == "hapus") {
        prosesDelete();
    }
});

btnKeluar.addEventListener("click", function () {
    if (this.textContent != "Keluar") {
        toggleButtons(1);
        clearAll();
        setEnable(false);

        pilGangguan = -1;
        listGangguan.length = 0;
        clearTable_DataTable("table_gangguan", colGangguan.length);

        modeProses = "";
    } else window.location.href = "/Extruder/ExtruderNet";
});

slcKodeMesin.addEventListener("change", function () {
    if (modeProses == "Koreksi" || modeProses == "Hapus") {
        btnOk.disabled = false;
        btnOk.focus();
    } else if (modeProses == "Isi") {
        slcGangguan.disabled = false;
        slcGangguan.focus();
    }

    if (rdoLibur.checked) {
        slcKomposisi.disabled = true;
        txtShift.disabled = false;
        txtShift.focus();
    } else {
        slcKomposisi.disabled = false;
        slcKomposisi.focus();
    }

    refetchKomposisi = true;
});

slcKomposisi.addEventListener("mousedown", function () {
    /**
     * Test case db lokal
     * Pilih tanggal 22 September bila data tidak muncul
     */

    if (refetchKomposisi) {
        refetchKomposisi = false;
        clearOptions(this);
        const errorOption = addLoadingOption(this);
        const optionKeys = {
            valueKey: "idkonversi",
            textKey: "namakomposisi",
        };

        // SP_5298_EXT_LIST_IDKOMPOSISI
        fetchSelect(
            "/Catat/getListIdKomposisi/" +
                dateInput.value +
                "/" +
                slcKodeMesin.value,
            (data) => {
                if (data.length > 0) {
                    addOptions(this, data, optionKeys);
                    this.removeChild(errorOption);
                } else refetchKomposisi = true;
            },
            errorOption
        );
    }
});

slcKomposisi.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && refetchKomposisi) {
        refetchKomposisi = false;
        clearOptions(this);
        const errorOption = addLoadingOption(this);
        const optionKeys = {
            valueKey: "idkonversi",
            textKey: "namakomposisi",
        };

        // SP_5298_EXT_LIST_IDKOMPOSISI
        fetchSelect(
            "/Catat/getListIdKomposisi/" +
                dateInput.value +
                "/" +
                slcKodeMesin.value,
            (data) => {
                if (data.length > 0) {
                    addOptions(this, data, optionKeys);
                    this.removeChild(errorOption);
                } else refetchKomposisi = true;
            },
            errorOption
        );
    }
});

slcKomposisi.addEventListener("change", function () {
    // SP_5298_EXT_DISPLAY_SHIFT
    fetchSelect("/Catat/getDisplayShift/" + this.value, (data) => {
        txtShift.value = data[0].Shift;
        timeShiftAwal.value = dateTimetoTime(data[0].AwalShift);
        timeShiftAkhir.value = dateTimetoTime(data[0].AkhirShift);

        slcGangguan.disabled = false;
        slcGangguan.focus();
    });
});

slcGangguan.addEventListener("change", function () {
    timeGangAwal.disabled = false;
    timeGangAwal.focus();
});

txtShift.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        this.value = this.value.toUpperCase();
        timeShiftAwal.focus();
    }
});

txtKeterangan.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        this.value = this.value.toUpperCase().replace(/\n/g, "");
        btnProses.focus();
    }
});

txtTanggal.addEventListener("keypress", function (event) {
    if (event.key == "Enter") btnOk.focus();
});
//#endregion

//#region Functions
function hitungWaktu() {
    /**
     * Dipakai oleh datetime "Akhir Gangguan" onblur
     */

    let waktuAwal = new Date(timeGangAwal.value);
    let waktuAkhir = new Date(timeGangAkhir.value);
    if (waktuAkhir > waktuAwal) {
        let timeDiff = calculateTimeDifference(timeGangAwal, timeGangAkhir);
        txtJmlhJam.value = timeDiff[0];
        txtJmlhMenit.value = timeDiff[1];
        txtKeterangan.focus();
    } else {
        alert(
            "Akhir Gangguan tidak bisa lebih awal dibandingkan Awal Gangguan."
        );
    }
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

function setEnable(m_value, group_box = "") {
    // Bagian Transaksi
    if (group_box != "gangguan") {
        listOfTransaksi.forEach((ele) => {
            if (ele.type == "date" || ele.type == "time") {
                if (m_value) {
                    ele.classList.remove("unclickable");
                } else ele.classList.add("unclickable");
            } else ele.disabled = !m_value;
        });

        if (modeProses == "isi" && m_value) {
            txtShift.disabled = true;
            timeShiftAwal.disabled = true;
            timeShiftAkhir.disabled = true;
            txtNoTransaksi.disabled = true;
            dateInput.focus();
        }
    }

    // Bagian Gangguan
    if (group_box != "transaksi") {
        listOfGangguan.forEach((ele) => {
            if (ele.type == "datetime") {
                if (m_value) {
                    ele.classList.remove("unclickable");
                } else ele.classList.add("unclickable");
            } else ele.disabled = !m_value;
        });

        if (modeProses == "isi" || modeProses == "koreksi") {
            if (m_value) {
                txtJmlhJam.disabled = true;
                txtJmlhMenit.disabled = true;
            }
        }
    }
}

function clearAll() {
    listOfTransaksi.forEach((input) => {
        if (input.tagName == "INPUT") {
            input.value = "";
        } else input.selectedIndex = 0;
    });

    listOfGangguan.forEach((input) => {
        if (input.tagName == "INPUT" || input.tagName == "TEXTAREA") {
            input.value = "";
        } else input.selectedIndex = 0;
    });

    dateInput.value = getCurrentDate();
    timeShiftAwal.value = "00:00";
    timeShiftAkhir.value = "00:00";
    timeGangAwal.value = getCurrentDate() + "T" + getCurrentTime("hh:mm");
    timeGangAkhir.value = getCurrentDate() + "T" + getCurrentTime("hh:mm");
}

function loadDataGangguanProdEXT() {
    // SP_5409_EXT_LIST_GANGGUAN_PROD
    fetchSelect(
        "/Catat/getListGangguanProd/" +
            txtTanggal.value.split("/")[0] +
            "/" +
            txtTanggal.value.split("/")[1],
        (data) => {
            for (let i = 0; i < data.length; i++) {
                listGangguan.push({
                    NoTrans: data[i].NoTrans,
                    Tanggal: dateTimeToDate(data[i].Tanggal),
                    IdMesin: data[i].IdMesin,
                    TypeMesin: data[i].TypeMesin,
                    IdKonversi:
                        data[i].IdKonversi === undefined
                            ? ""
                            : data[i].IdKonversi,
                    IdGangguan: data[i].IdGangguan,
                    NamaGangguan: data[i].NamaGangguan,
                    AwalGangguan: data[i].AwalGangguan,
                    AkhirGangguan: data[i].AkhirGangguan,
                    JumlahJam: data[i].JumlahJam,
                    JumlahMenit: data[i].JumlahMenit,
                    Keterangan: data[i].Keterangan,
                    Transaksi: data[i].NoTrans,
                });
            }

            if (listGangguan.length > 0) {
                addTable_DataTable(
                    "table_gangguan",
                    listGangguan.map((item, index) => {
                        return {
                            ...item,
                            NoTrans: `<input class="form-check-input" type="checkbox" value="${index}" name="checkbox_gangguan"> ${item.NoTrans}`,
                        };
                    }),
                    colGangguan,
                    rowClickedGangguan
                );
            } else
                clearTable_DataTable(
                    "table_gangguan",
                    colGangguan.length,
                    "Tidak Ada Data Gangguan."
                );

            checkboxesGangguan = document.querySelectorAll(
                'input[name="checkbox_gangguan"]'
            );
        }
    );
}

function rowClickedGangguan(row, data, _) {
    if (
        pilGangguan ==
        findClickedRowInList(listGangguan, "NoTrans", data.Transaksi)
    ) {
        row.style.background = "white";
        checkboxesGangguan[pilGangguan].checked = false;
        pilGangguan = -1;
        clearAll();
    } else {
        clearSelection_DataTable("table_gangguan");
        clearCheckedBoxes(checkboxesGangguan, checkboxesGangguan[pilGangguan]);

        pilGangguan = findClickedRowInList(
            listGangguan,
            "NoTrans",
            data.Transaksi
        );
        row.style.background = "aliceblue";
        checkboxesGangguan[pilGangguan].checked = true;

        txtNoTransaksi.value = listGangguan[pilGangguan].Transaksi;
        dateInput.value = data.Tanggal;
        timeGangAwal.value = data.AwalGangguan.replace(" ", "T");
        timeGangAkhir.value = data.AkhirGangguan.replace(" ", "T");
        txtJmlhJam.value = data.JumlahJam;
        txtJmlhMenit.value = data.JumlahMenit;
        txtKeterangan.value = data.Keterangan;

        addOptionIfNotExists(
            slcKodeMesin,
            data.IdMesin,
            data.IdMesin + " | " + data.NamaMesin
        );

        addOptionIfNotExists(
            slcGangguan,
            data.IdGangguan,
            data.IdGangguan + " | " + data.NamaGangguan
        );

        addOptionIfNotExists(slcKomposisi, data.IdKonversi);

        if (slcKomposisi.value != "null") {
            // SP_5298_EXT_LIST_SHIFT
            fetchSelect("/Catat/getListShift/" + slcKomposisi.value, (data) => {
                txtShift.value = data[0].Shift;
                timeShiftAwal.value =
                    data[0].AwalShift.split(" ")[1].split(".")[0];
                timeShiftAkhir.value =
                    data[0].AkhirShift.split(" ")[1].split(".")[0];
            });
        } else txtShift.value = "***";
    }
}

function prosesIsi() {
    let radioStr = rdoLibur.checked ? "L" : "M";

    // SP_5298_EXT_INSERT_GANGGUAN_PROD
    fetchStmt(
        "/Catat/insGangguanProd/" +
            dateInput.value +
            "/" +
            slcKodeMesin.value +
            "/" +
            slcGangguan.value +
            "/" +
            slcKomposisi.value +
            "/" +
            txtShift.value +
            "/" +
            getCurrentDate() +
            "T" +
            timeShiftAwal.value +
            "/" +
            getCurrentDate() +
            "T" +
            timeShiftAkhir.value +
            "/" +
            timeGangAwal.value +
            "/" +
            timeGangAkhir.value +
            "/" +
            txtJmlhJam.value +
            "/" +
            txtJmlhMenit.value +
            "/" +
            radioStr +
            "/" +
            txtKeterangan.value +
            "/" +
            getCurrentTime(),
        () => {
            // SP_5298_EXT_NO_TRANS
            fetchSelect("/Catat/getNoTrans", (data) => {
                txtNoTransaksi.value = data[0].No_Trans;

                setEnable(false);
                modeProses = "";
                toggleButtons(1);
                btnIsi.focus();

                listGangguan.push({
                    NoTrans: txtNoTransaksi.value,
                    Tanggal: dateInput.value,
                    IdMesin: slcKodeMesin.value,
                    TypeMesin: slcKodeMesin.textContent.split(" | ")[1],
                    IdKonversi: slcKomposisi.value,
                    IdGangguan: slcGangguan.value,
                    NamaGangguan: slcGangguan.textContent.split(" | ")[1],
                    AwalGangguan: timeGangAwal.value.replace("T", " "),
                    AkhirGangguan: timeGangAkhir.value.replace("T", " "),
                    JumlahJam: txtJmlhJam.value,
                    JumlahMenit: txtJmlhMenit.value,
                    Keterangan: txtKeterangan.value,
                });

                addTable_DataTable(
                    "table_gangguan",
                    listGangguan,
                    colGangguan,
                    rowClickedGangguan
                );
            });
        }
    );
}

function prosesUpdate() {
    // SP_5298_EXT_UPDATE_GANGGUAN_PROD
    fetchStmt(
        "/Catat/updGangguanProd/" +
            txtNoTransaksi.value +
            "/" +
            timeGangAwal.value +
            "/" +
            timeGangAkhir.value +
            "/" +
            txtJmlhJam.value +
            "/" +
            txtJmlhMenit.value +
            "/" +
            txtKeterangan.value,
        () => {
            setEnable(false);
            modeProses = "";
            toggleButtons(1);
            clearAll();
            listGangguan.length = 0;
            clearTable_DataTable("table_gangguan", colGangguan.length);
            btnIsi.focus();

            alert("Data berhasil dikoreksi!");
        }
    );
}

function prosesDelete() {
    // SP_5298_EXT_DELETE_GANGGUAN_PROD
    fetchStmt("/Catat/delGangguanProd/" + txtNoTransaksi.value, () => {
        setEnable(false);
        modeProses = "";
        toggleButtons(1);
        clearAll();
        listGangguan.length = 0;
        clearTable_DataTable("table_gangguan", colGangguan.length);
        btnIsi.focus();

        alert("Data berhasil dihapus!");
    });
}
//#endregion

function init() {
    $("#table_gangguan").DataTable({
        responsive: true,
        paging: false,
        scrollY: "250px",
        scrollX: "1000000px",
        columns: colGangguan,
        dom: '<"row"<"col-sm-6"i><"col-sm-6"f>>' + '<"row"<"col-sm-12"tr>>',
        language: {
            searchPlaceholder: " Tabel gangguan...",
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

    clearTable_DataTable("table_gangguan", colGangguan.length);
    toggleButtons(1);
    setEnable(false);

    btnIsi.focus();
    txtTanggal.value = getCurrentDate(true);
    dateInput.value = getCurrentDate();
    timeShiftAwal.value = "00:00";
    timeShiftAkhir.value = "00:00";
    timeGangAwal.value = getCurrentDate() + " 00:00";
    timeGangAkhir.value = getCurrentDate() + " 00:00";
}

$(document).ready(() => {
    init();
});
