//#region Variables
const dateInput = document.getElementById("tanggal");
const hidKode = document.getElementById("kode");
const hidDaftarRW = document.getElementById("form_rw_return");
const timeMulai = document.getElementById("waktu_mulai");
const timeSelesai = document.getElementById("waktu_selesai");

const txtNama = document.getElementById("nama");
const txtShift = document.getElementById("shift");
const txtWinder = document.getElementById("winder");

const slcJam = document.getElementById("select_jam");
const slcBagian = document.getElementById("select_bagian");
const slcMesin = document.getElementById("select_mesin");
const slcWinder = document.getElementById("select_winder");
const slcGangguan = document.getElementById("select_gangguan");
const slcPenyebab = document.getElementById("select_penyebab");
const slcPenyelesaian = document.getElementById("select_penyelesaian");

const btnIsi = document.getElementById("btn_isi");
const btnKoreksi = document.getElementById("btn_koreksi");
const btnHapus = document.getElementById("btn_hapus");
const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");

const groupBox1Slc = document.querySelectorAll("#group_box1 .form-select");
const groupBox1Ctr = document.querySelectorAll("#group_box1 .form-control");
const groupBox2Slc = document.querySelectorAll("#group_box2 .form-select");
const groupBox2Ctr = document.querySelectorAll("#group_box2 .form-control");

var modeProses = "";
var refetchWinder = false;
var refetchGangguan = false;
var refetchPenyebab = false;
var refetchPenyelesaian = false;
//#endregion

//#region Events
dateInput.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (modeProses == "isi") {
            txtShift.select();
        } else txtNama.select();
    }
});

txtNama.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        /**
         * Membuka modal berisi data-data perawatan yang telah tersimpan.
         * Setelah memilih data dan klik OK akan kembali ke halaman ini,
         * menampilkan data terhadap perawatan yang dipilih.
         *
         * Modal dapat dilihat pada file modalDaftarPerawatan.blade.php
         */

        event.preventDefault();
        RW_tanggal = dateInput.value;
        $("#form_daftar_rawat").modal("show");
    }
});

hidDaftarRW.addEventListener("change", function () {
    if (RW_clickedData != null) {
        hidKode.value = RW_clickedData.Kode;
        txtNama.value = RW_clickedData.NamaUser;
        txtShift.value = RW_clickedData.Shift;
        timeMulai.value = RW_clickedData.WaktuMulai;
        timeSelesai.value = RW_clickedData.WaktuSelesai;
        txtWinder.value = RW_clickedData.Winder;

        addOptionIfNotExists(slcWinder, RW_clickedData.NoWinder);
        addOptionIfNotExists(slcPenyebab, RW_clickedData.Penyebab);
        addOptionIfNotExists(slcPenyelesaian, RW_clickedData.Penyelesaian);
        addOptionIfNotExists(
            slcGangguan,
            RW_clickedData.IdGangguan,
            RW_clickedData.Gangguan
        );

        addOptionIfNotExists(
            slcJam,
            RW_clickedData.Waktu.replace(/ /g, "_"),
            RW_clickedData.Waktu
        );

        addOptionIfNotExists(
            slcBagian,
            RW_clickedData.IdPerawatan,
            RW_clickedData.IdPerawatan + " | " + RW_clickedData.NamaPerawatan
        );

        addOptionIfNotExists(
            slcMesin,
            RW_clickedData.IdMesin,
            RW_clickedData.IdMesin + " | " + RW_clickedData.TypeMesin
        );

        if (modeProses == "koreksi") {
            refetchWinder = true;
            refetchGangguan = true;
            refetchPenyebab = true;
            refetchPenyelesaian = true;
            slcGangguan.focus();
        } else btnProses.focus();
    } else alert("Belum ada data perawatan yang terpilih.");
});

txtShift.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (this.value != "") {
            this.value = this.value.toUpperCase();
            slcJam.focus();
        } else this.focus();
    }
});

slcJam.addEventListener("change", function () {
    if (modeProses == "Koreksi" || modeProses == "Hapus") {
        slcMesin.focus();
    } else slcBagian.focus();
});

slcBagian.addEventListener("change", function () {
    refetchWinder = true;
    refetchGangguan = true;
    refetchPenyebab = true;
    refetchPenyelesaian = true;
    slcMesin.focus();
});

slcMesin.addEventListener("change", function () {
    refetchWinder = true;
    slcWinder.focus();
});

slcWinder.addEventListener("mousedown", function () {
    if (refetchWinder) {
        refetchWinder = false;
        clearOptions(this);
        const errorOption = addLoadingOption(this);
        const optionKeys = {
            valueKey: "NoWinder",
            textKey: "Winder",
        };

        // SP_5298_EXT_LIST_WINDER
        fetchSelect(
            "/Catat/getListWinder/" + slcBagian.value + "/" + slcMesin.value,
            (data) => {
                if (data.length > 0) {
                    addOptions(this, data, optionKeys, "swap");
                    this.removeChild(errorOption);
                } else refetchWinder = true;
            },
            errorOption
        );
    }
});

slcWinder.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && refetchWinder) {
        refetchWinder = false;
        clearOptions(this);
        const errorOption = addLoadingOption(this);
        const optionKeys = {
            valueKey: "NoWinder",
            textKey: "Winder",
        };

        // SP_5298_EXT_LIST_WINDER
        fetchSelect(
            "/Catat/getListWinder/" + slcBagian.value + "/" + slcMesin.value,
            (data) => {
                if (data.length > 0) {
                    addOptions(this, data, optionKeys, "swap");
                    this.removeChild(errorOption);
                } else refetchWinder = true;
            },
            errorOption
        );
    }
});

slcWinder.addEventListener("change", function () {
    txtWinder.value = this.value;
    slcGangguan.focus();
});

slcGangguan.addEventListener("mousedown", function () {
    if (refetchGangguan) {
        refetchGangguan = false;
        clearOptions(this);
        const errorOption = addLoadingOption(this);
        const optionKeys = {
            valueKey: "IdGangguan",
            textKey: "NamaGangguan",
        };

        // SP_5298_EXT_JENIS_GANGGUAN
        fetchSelect(
            "/Catat/getJenisGangguan/" + slcBagian.value,
            (data) => {
                if (data.length > 0) {
                    addOptions(this, data, optionKeys, false);
                    this.removeChild(errorOption);
                } else refetchGangguan = true;
            },
            errorOption
        );
    }
});

slcGangguan.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && refetchGangguan) {
        refetchGangguan = false;
        clearOptions(this);
        const errorOption = addLoadingOption(this);
        const optionKeys = {
            valueKey: "IdGangguan",
            textKey: "NamaGangguan",
        };

        // SP_5298_EXT_JENIS_GANGGUAN
        fetchSelect(
            "/Catat/getJenisGangguan/" + slcBagian.value,
            (data) => {
                if (data.length > 0) {
                    addOptions(this, data, optionKeys, false);
                    this.removeChild(errorOption);
                } else refetchGangguan = true;
            },
            errorOption
        );
    }
});

slcGangguan.addEventListener("change", function () {
    slcPenyebab.focus();
});

slcPenyebab.addEventListener("mousedown", function () {
    if (refetchPenyebab) {
        refetchPenyebab = false;
        clearOptions(this);
        const errorOption = addLoadingOption(this);
        const optionKeys = {
            valueKey: "NamaPenyebab",
            textKey: "NamaPenyebab",
        };

        // SP_5409_EXT_JENIS_PENYEBAB
        fetchSelect(
            "/Catat/getJenisPenyebab/" + slcBagian.value,
            (data) => {
                if (data.length > 0) {
                    addOptions(this, data, optionKeys, false);
                    this.removeChild(errorOption);
                } else refetchPenyebab = true;
            },
            errorOption
        );
    }
});

slcPenyebab.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && refetchPenyebab) {
        refetchPenyebab = false;
        clearOptions(this);
        const errorOption = addLoadingOption(this);
        const optionKeys = {
            valueKey: "NamaPenyebab",
            textKey: "NamaPenyebab",
        };

        // SP_5409_EXT_JENIS_PENYEBAB
        fetchSelect(
            "/Catat/getJenisPenyebab/" + slcBagian.value,
            (data) => {
                if (data.length > 0) {
                    addOptions(this, data, optionKeys, false);
                    this.removeChild(errorOption);
                } else refetchPenyebab = true;
            },
            errorOption
        );
    }
});

slcPenyebab.addEventListener("change", function () {
    slcPenyelesaian.focus();
});

slcPenyelesaian.addEventListener("mousedown", function () {
    if (refetchPenyelesaian) {
        refetchPenyelesaian = false;
        clearOptions(this);
        const errorOption = addLoadingOption(this);
        const optionKeys = {
            valueKey: "NamaPenyelesaian",
            textKey: "NamaPenyelesaian",
        };

        // SP_5409_EXT_JENIS_PENYELESAIAN
        fetchSelect(
            "/Catat/getJenisPenyelesaian/" + slcBagian.value,
            (data) => {
                if (data.length > 0) {
                    addOptions(this, data, optionKeys, false);
                    this.removeChild(errorOption);
                } else refetchPenyelesaian = true;
            },
            errorOption
        );
    }
});

slcPenyelesaian.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && refetchPenyelesaian) {
        refetchPenyelesaian = false;
        clearOptions(this);
        const errorOption = addLoadingOption(this);
        const optionKeys = {
            valueKey: "NamaPenyelesaian",
            textKey: "NamaPenyelesaian",
        };

        // SP_5409_EXT_JENIS_PENYELESAIAN
        fetchSelect(
            "/Catat/getJenisPenyelesaian/" + slcBagian.value,
            (data) => {
                if (data.length > 0) {
                    addOptions(this, data, optionKeys, false);
                    this.removeChild(errorOption);
                } else refetchPenyelesaian = true;
            },
            errorOption
        );
    }
});

slcPenyelesaian.addEventListener("change", function () {
    timeMulai.focus();
});

timeMulai.addEventListener("keypress", function (event) {
    if (event.key == "Enter") timeSelesai.focus();
});

timeSelesai.addEventListener("keypress", function (event) {
    if (event.key == "Enter") btnProses.focus();
});

btnIsi.addEventListener("click", function () {
    modeProses = "isi";
    toggleButtons(2);
    setEnable(true);
    clearAll();
    dateInput.focus();
});

btnKoreksi.addEventListener("click", function () {
    clearAll();
    modeProses = "koreksi";
    toggleButtons(2);
    setEnable(true);
    dateInput.focus();
});

btnHapus.addEventListener("click", function () {
    clearAll();
    modeProses = "hapus";
    toggleButtons(2);
    dateInput.disabled = false;
    txtNama.disabled = false;
    dateInput.focus();
});

btnProses.addEventListener("click", function () {
    if (modeProses == "isi") {
        prosesIsi();
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
        modeProses = "";
    } else window.location.href = "/Extruder/ExtruderNet";
});
//#endregion

//#region Functions
function setEnable(m_value) {
    groupBox1Ctr.forEach((ele) => (ele.disabled = !m_value));
    groupBox1Slc.forEach((ele) => (ele.disabled = !m_value));
    groupBox2Ctr.forEach((ele) => (ele.disabled = !m_value));
    groupBox2Slc.forEach((ele) => (ele.disabled = !m_value));

    txtWinder.disabled = true;
    if (modeProses == "isi" && m_value) txtNama.disabled = true;
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

function clearAll() {
    groupBox1Ctr.forEach((ele) => (ele.value = ""));
    groupBox1Slc.forEach((ele) => (ele.selectedIndex = 0));
    groupBox2Ctr.forEach((ele) => (ele.value = ""));
    groupBox2Slc.forEach((ele) => (ele.selectedIndex = 0));

    dateInput.value = getCurrentDate();
    timeMulai.value = "00:00";
    timeSelesai.value = "00:00";

    listRawat.length = 0;
    clearTable_DataTable("table_perawatan", colRawat.length, "padding=250px");
}

function prosesIsi() {
    let id_gangguan = slcBagian.value == 2 ? slcGangguan.value : "";

    // SP_5298_EXT_INSERT_PERAWATAN
    fetchStmt(
        "/Catat/insPerawatan/" +
            dateInput.value +
            "/" +
            txtShift.value +
            "/" +
            slcJam.value +
            "/" +
            slcBagian.value +
            "/" +
            slcMesin.value +
            "/" +
            slcWinder.options[slcWinder.selectedIndex].text +
            "/" +
            slcGangguan.options[slcGangguan.selectedIndex].text.replace(
                / /g,
                "_"
            ) +
            "/" +
            slcPenyebab.value.replace(/ /g, "_") +
            "/" +
            slcPenyelesaian.value.replace(/ /g, "_") +
            "/" +
            timeMulai.value +
            "/" +
            timeSelesai.value +
            "/" +
            id_gangguan,
        () => {
            showModal(
                "Tambah Lagi",
                "Data berhasil tersimpan, ingin input data perawatan lagi?",
                () => {
                    slcMesin.focus();
                },
                () => {
                    setEnable(false);
                    modeProses = "";
                    toggleButtons(1);
                    clearAll();
                }
            );
        }
    );
}

function prosesUpdate() {
    let id_gangguan = slcBagian.value == 2 ? slcGangguan.value : "";

    // SP_5298_EXT_UPDATE_PERAWATAN
    fetchStmt(
        "/Catat/updPerawatan/" +
            txtShift.value +
            "/" +
            slcJam.value +
            "/" +
            slcBagian.value +
            "/" +
            slcMesin.value +
            "/" +
            slcWinder.options[slcWinder.selectedIndex].text +
            "/" +
            slcGangguan.options[slcGangguan.selectedIndex].text.replace(
                / /g,
                "_"
            ) +
            "/" +
            slcPenyebab.value.replace(/ /g, "_") +
            "/" +
            slcPenyelesaian.value.replace(/ /g, "_") +
            "/" +
            timeMulai.value +
            "/" +
            timeSelesai.value +
            "/" +
            hidKode.value +
            "/" +
            id_gangguan,
        () => {
            setEnable(false);
            modeProses = "";
            toggleButtons(1);
            clearAll();

            alert("Data berhasil dikoreksi.");
        }
    );
}

function prosesDelete() {
    // SP_5298_EXT_DELETE_PERAWATAN
    fetchStmt("/Catat/delPerawatan/" + hidKode.value, () => {
        setEnable(false);
        modeProses = "";
        toggleButtons(1);
        clearAll();

        alert("Data berhasil dihapus.");
    });
}
//#endregion

function init() {
    toggleButtons(1);
    setEnable(false);
    clearAll();
    btnIsi.focus();
}

$(document).ready(() => init());
