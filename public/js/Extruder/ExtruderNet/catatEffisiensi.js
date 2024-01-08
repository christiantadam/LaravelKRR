//#region Variables
const dateInput = document.getElementById("tanggal");
const timeAwal = document.getElementById("awal");
const timeAkhir = document.getElementById("akhir");

const txtScrew = document.getElementById("screw_revolution");
const txtRoll = document.getElementById("roll_speed");
const txtMotor = document.getElementById("motor_current");
const txtStretch = document.getElementById("stretching_ratio");
const txtSlitter = document.getElementById("slitter_width");
const txtRelax = document.getElementById("relax");
const txtNoYam = document.getElementById("no_yam");
const txtDenier = document.getElementById("denier");
const txtWater = document.getElementById("water_gap");
const txtRata = document.getElementById("denier_rata");

const slcMesin = document.getElementById("select_mesin");
const slcShift = document.getElementById("select_shift");
const slcKodeKonv = document.getElementById("select_kode_konversi");
const slcWaktu = document.getElementById("select_waktu_produksi");

const btnIsi = document.getElementById("btn_isi");
const btnKoreksi = document.getElementById("btn_koreksi");
const btnHapus = document.getElementById("btn_hapus");
const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");

const groupBox1Ctr = document.querySelectorAll("#group_box1 .form-control");
const groupBox1Slc = document.querySelectorAll("#group_box1 .form-select");
const groupBox2 = document.querySelectorAll("#group_box2 .form-control");

var refetchWaktu = false;
var refetchKonversi = false;
var modeProses = "";
//#endregion

//#region Events
dateInput.addEventListener("keypress", function (event) {
    if (event.key == "Enter") slcMesin.focus();
});

dateInput.addEventListener("change", () => {
    refetchWaktu = true;
    refetchKonversi = true;
});

slcMesin.addEventListener("change", () => {
    slcShift.focus();
    refetchWaktu = true;
    refetchKonversi = true;
});

slcShift.addEventListener("change", () => {
    refetchWaktu = true;
    refetchKonversi = true;

    if (modeProses != "isi") {
        slcWaktu.classList.remove("hidden");
        slcWaktu.focus();
    } else timeAwal.focus();
});

timeAwal.addEventListener("keypress", function (event) {
    if (event.key == "Enter") timeAkhir.focus();
});

timeAkhir.addEventListener("keypress", function (event) {
    let waktuAwal = new Date(timeAwal.value);
    let waktuAkhir = new Date(timeAkhir.value);

    if (event.key == "Enter") {
        if (this.value == timeAwal.value || waktuAkhir > waktuAwal) {
            this.focus();
            alert(
                "Akhir Produksi tidak bisa lebih awal atau sama dengan Awal Produksi."
            );
        } else slcKodeKonv.focus();
    }
});

slcWaktu.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && refetchWaktu) {
        refetchWaktu = false;
        clearOptions(this, "Awal Produksi | Akhir Produksi");
        const errorOption = addLoadingOption(this);
        const optionKeys = {
            valueKey: "AwalProduksi",
            textKey: "AkhirProduksi",
        };

        // SP_5298_EXT_LIST_AWALPROD_EFF
        fetchSelect(
            "/Catat/getListAwalProdEff/" +
                dateInput.value +
                "/" +
                slcMesin.value +
                "/" +
                slcShift.value,
            (data) => {
                if (data.length > 0) {
                    let formattedData = data.map((item) => {
                        return {
                            AwalProduksi: dateTimetoTime(
                                item.AwalProduksi
                            ).slice(0, -3),
                            AkhirProduksi: dateTimetoTime(
                                item.AkhirProduksi
                            ).slice(0, -3),
                        };
                    });

                    addOptions(this, formattedData, optionKeys);
                    this.removeChild(errorOption);
                } else refetchWaktu = true;
            },
            errorOption
        );
    }
});

slcWaktu.addEventListener("mousedown", function () {
    if (refetchWaktu) {
        refetchWaktu = false;
        clearOptions(this, "Awal Produksi | Akhir Produksi");
        const errorOption = addLoadingOption(this);
        const optionKeys = {
            valueKey: "AwalProduksi",
            textKey: "AkhirProduksi",
        };

        // SP_5298_EXT_LIST_AWALPROD_EFF
        fetchSelect(
            "/Catat/getListAwalProdEff/" +
                dateInput.value +
                "/" +
                slcMesin.value +
                "/" +
                slcShift.value,
            (data) => {
                if (data.length > 0) {
                    let formattedData = data.map((item) => {
                        return {
                            AwalProduksi: dateTimetoTime(
                                item.AwalProduksi
                            ).slice(0, -3),
                            AkhirProduksi: dateTimetoTime(
                                item.AkhirProduksi
                            ).slice(0, -3),
                        };
                    });

                    addOptions(this, formattedData, optionKeys);
                    this.removeChild(errorOption);
                } else refetchWaktu = true;
            },
            errorOption
        );
    }
});

slcWaktu.addEventListener("change", function () {
    timeAwal.value = this[this.selectedIndex].text.split(" | ")[0];
    timeAkhir.value = this[this.selectedIndex].text.split(" | ")[1];

    if (timeAwal.value != "00:00") {
        if (modeProses == "koreksi" || modeProses == "hapus") {
            getDataEffisiensi(() => {
                if (modeProses == "koreksi") {
                    txtScrew.select();
                } else btnProses.focus();
            });
        }
    }
});

slcKodeKonv.addEventListener("mousedown", function () {
    if (refetchKonversi) {
        refetchKonversi = false;
        clearOptions(this);
        const errorOption = addLoadingOption(this);
        const optionKeys = {
            valueKey: "IdKonversi",
            textKey: "NamaKomposisi",
        };

        // SP_5298_EXT_LIST_IDKONVERSI
        fetchSelect(
            "/Catat/getListIdKonversi/" +
                dateInput.value +
                "/" +
                slcMesin.value +
                "/" +
                slcShift.value,
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

slcKodeKonv.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && refetchKonversi) {
        refetchKonversi = false;
        clearOptions(this);
        const errorOption = addLoadingOption(this);
        const optionKeys = {
            valueKey: "IdKonversi",
            textKey: "NamaKomposisi",
        };

        // SP_5298_EXT_LIST_IDKONVERSI
        fetchSelect(
            "/Catat/getListIdKonversi/" +
                dateInput.value +
                "/" +
                slcMesin.value +
                "/" +
                slcShift.value,
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

slcKodeKonv.addEventListener("change", function () {
    txtScrew.select();
});

txtScrew.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (this.value == "") this.value = 0;
        txtMotor.select();
    }
});

txtMotor.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (this.value == "") this.value = 0;
        txtSlitter.select();
    }
});

txtSlitter.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (this.value == "") this.value = 0;
        txtNoYam.select();
    }
});

txtNoYam.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (this.value == "") this.value = 0;
        txtWater.select();
    }
});

txtWater.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (this.value == "") this.value = 0;
        txtRoll.select();
    }
});

txtRoll.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (this.value == "") this.value = 0;
        txtStretch.select();
    }
});

txtStretch.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (this.value == "") this.value = 0;
        txtRelax.select();
    }
});

txtRelax.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (this.value == "") this.value = 0;
        txtDenier.select();
    }
});

txtDenier.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (parseFloat(this.value) < 100 || this.value == "") {
            alert("Denier tidak boleh kurang dari 100.");
            this.select();
        } else {
            switch (parseFloat(this.value)) {
                case 800:
                    txtRata.value = 750;
                    break;
                case 850:
                    txtRata.value = 825;
                    break;
                case 900:
                    txtRata.value = 850;
                    break;
                case 1000:
                    txtRata.value = 950;
                    break;
                case 1500:
                    txtRata.value = 1500;
                    break;
                case 1800:
                    txtRata.value = 1700;
                    break;
                case 1700:
                    txtRata.value = 1700;
                    break;
                case 2000:
                    txtRata.value = 1800;
                    break;
                case 2100:
                    txtRata.value = 1800;
                    break;
                case 950:
                    txtRata.value = 925;
                    break;

                default:
                    break;
            }

            txtRata.select();
        }
    }
});

txtRata.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (this.value == "") this.value = 0;
        btnProses.focus();
    }
});

btnIsi.addEventListener("click", function () {
    modeProses = "isi";
    toggleButtons(2);
    setEnable(true);
    clearAll();
    dateInput.focus();
});

btnKoreksi.addEventListener("click", function () {
    modeProses = "koreksi";
    toggleButtons(2);
    setEnable(true);
    timeAwal.disabled = true;
    timeAkhir.disabled = true;
    slcKodeKonv.disabled = true;
    clearAll();
    dateInput.focus();
});

btnHapus.addEventListener("click", function () {
    modeProses = "hapus";
    toggleButtons(2);
    groupBox1Ctr.forEach((ctr) => (ctr.disabled = false));
    groupBox1Slc.forEach((slc) => (slc.disabled = false));
    timeAwal.disabled = true;
    timeAkhir.disabled = true;
    slcKodeKonv.disabled = true;
    clearAll();
    dateInput.focus();
});

btnProses.addEventListener("click", function () {
    // SP_5298_EXT_CEK_DATA_EFF
    fetchSelect(
        "/Catat/getCekDataEff/" +
            dateInput.value +
            "/" +
            slcMesin.value +
            "/" +
            slcShift.value +
            "/" +
            dateInput.value +
            "T" +
            timeAwal.value +
            "/" +
            dateInput.value +
            "T" +
            timeAkhir.value +
            "/" +
            slcKodeKonv.value,
        (data) => {
            if (data.length > 0) {
                if (modeProses == "isi" && data[0].ada > 0) {
                    alert(
                        "Data Effisiensi dengan ketentuan di bawah sudah ada, \nMesin: " +
                            slcMesin.options[slcMesin.selectedIndex].text +
                            "\nTanggal: " +
                            dateInput.value +
                            "\nShift: " +
                            slcShift.value +
                            "\nNomor Konversi: " +
                            slcKodeKonv.value +
                            "\nJam Produksi: " +
                            timeAwal.value +
                            " - " +
                            timeAkhir.value
                    );
                    return;
                }
            }

            const post_action = () => {
                setEnable(false);
                modeProses = "";
                toggleButtons(1);
                slcWaktu.classList.add("hidden");
            };

            let sp_str = "";
            if (modeProses == "isi") {
                sp_str = "insEff";
            } else if (modeProses == "koreksi") {
                sp_str = "updEff";
            } else sp_str = "delEff";

            if (modeProses == "isi" || modeProses == "koreksi") {
                fetchStmt(
                    "/Catat/" +
                        sp_str +
                        "/" +
                        dateInput.value +
                        "/" +
                        slcMesin.value +
                        "/" +
                        slcShift.value +
                        "/" +
                        dateInput.value +
                        "T" +
                        timeAwal.value +
                        "/" +
                        dateInput.value +
                        "T" +
                        timeAkhir.value +
                        "/" +
                        slcKodeKonv.value +
                        "/" +
                        txtScrew.value +
                        "/" +
                        txtMotor.value +
                        "/" +
                        txtSlitter.value +
                        "/" +
                        txtNoYam.value +
                        "/" +
                        txtWater.value +
                        "/" +
                        txtRoll.value +
                        "/" +
                        txtStretch.value +
                        "/" +
                        txtRelax.value +
                        "/" +
                        txtDenier.value +
                        "/" +
                        txtRata.value +
                        "/" +
                        getCurrentTime(),
                    () => {
                        if (modeProses == "isi") {
                            alert("Data berhasil disimpan.");
                        } else alert("Data berhasil dikoreksi.");
                        slcWaktu.classList.add("hidden");
                        post_action();
                    }
                );
            } else {
                fetchStmt(
                    "/Catat/" +
                        sp_str +
                        "/" +
                        dateInput.value +
                        "/" +
                        slcMesin.value +
                        "/" +
                        slcShift.value +
                        "/" +
                        dateInput.value +
                        "T" +
                        timeAwal.value +
                        "/" +
                        dateInput.value +
                        "T" +
                        timeAkhir.value,
                    () => {
                        alert("Data berhasil dihapus.");
                        post_action();
                    }
                );
            }
        }
    );
});

btnKeluar.addEventListener("click", function () {
    if (this.textContent != "Keluar") {
        toggleButtons(1);
        clearAll();
        setEnable(false);
        modeProses = "";
        slcWaktu.classList.add("hidden");
    } else window.location.href = "/Extruder/ExtruderNet";
});
//#endregion

//#region Functions
function setEnable(m_value) {
    groupBox1Ctr.forEach((input) => (input.disabled = !m_value));
    groupBox1Slc.forEach((input) => (input.disabled = !m_value));
    groupBox2.forEach((input) => (input.disabled = !m_value));

    if (!m_value) txtRata.blur();
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
    groupBox1Ctr.forEach((input) => (input.value = ""));
    groupBox1Slc.forEach((input) => (input.selectedIndex = 0));
    groupBox2.forEach((input) => (input.value = ""));
    timeAwal.value = "00:00";
    timeAkhir.value = "00:00";
    dateInput.value = getCurrentDate();
}

function getDataEffisiensi(post_action = null) {
    // SP_5298_EXT_LIST_EFFISIENSI
    fetchSelect(
        "/Catat/getListEffisiensi/" +
            dateInput.value +
            "/" +
            slcMesin.value +
            "/" +
            slcShift.value +
            "/" +
            dateInput.value +
            "T" +
            timeAwal.value,
        (data) => {
            if (data.length > 0) {
                txtScrew.value = data[0].ScrewRevolution;
                txtMotor.value = data[0].MotorCurrent;
                txtSlitter.value = data[0].SlitterWidth;
                txtNoYam.value = data[0].NoOfYarn;
                txtWater.value = data[0].WaterGap;
                txtRoll.value = data[0].RollSpeed3;
                txtStretch.value = data[0].StretchingRatio;
                txtRelax.value = data[0].Relax;
                txtDenier.value = data[0].Denier;
                txtRata.value = data[0].DenierRata;

                addOptionIfNotExists(
                    slcKodeKonv,
                    data[0].IdKonversi,
                    data[0].IdKonversi + " | " + data[0].NamaKomposisi
                );

                if (post_action != null) post_action();
            } else alert("Data Effisiensi tidak ditemukan.");
        }
    );
}
//#endregion

function init() {
    timeAwal.value = "00:00";
    timeAkhir.value = "00:00";
    dateInput.value = getCurrentDate();
    toggleButtons(1);
    setEnable(false);
    clearAll();
    btnIsi.focus();
}

$(document).ready(() => {
    init();
});
