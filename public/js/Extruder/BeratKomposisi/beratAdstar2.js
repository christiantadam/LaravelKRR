//#region Variables
const txtKodeBarang = document.getElementById("kode_barang");
const txtType = document.getElementById("berat_type");
const numStandar1 = document.getElementById("berat_standar1");
const numStandar2 = document.getElementById("berat_standar2");
const numCloth = document.getElementById("berat_cloth");
const numLami = document.getElementById("berat_lami");

const hidCloth = document.getElementById("hid_cloth");
const hidLami = document.getElementById("hid_lami");

const btnKoreksi = document.getElementById("btn_koreksi");
const btnBatal = document.getElementById("btn_batal");
const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");
const listOfTxt = document.querySelectorAll("input, textarea");

var userId = "1001";
//#endregion

//#region Events
txtKodeBarang.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (this.value.trim() != "") {
            let kode = "000000000";
            kode += this.value.toUpperCase();
            kode = kode.slice(-9);
            this.value = kode;
            loadDataFetch(kode);
        } else this.focus();
    }
});

numStandar2.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        numCloth.value = (
            (parseFloat(hidCloth.value) / parseFloat(numStandar1.value)) *
            parseFloat(numStandar2.value)
        ).toFixed(2);

        numLami.value = (
            (parseFloat(hidLami.value) / parseFloat(numStandar1.value)) *
            parseFloat(numStandar2.value)
        ).toFixed(2);

        btnProses.disabled = false;
        btnProses.focus();
    }
});

btnProses.addEventListener("click", function () {
    formWait(true);
    fetchSelect(
        "/beratStandar/SP_1273_PRG_CEK_KOMPOSISI_1/" + txtKodeBarang.value,
        (data) => {
            if (data.length > 0) {
                if (
                    data[0].Total > 0 &&
                    userId != "1001" &&
                    userId != "1703" &&
                    userId != "1273"
                ) {
                    formWait(false);
                    alert(
                        "Maaf Berat Standart Tidak Bisa diKoreksi, Karena Sudah Memiliki Komposisi Konversi !!!"
                    );

                    txtKodeBarang.value = "";
                    txtKodeBarang.focus();
                    formWait(false);
                    return;
                }
            }

            fetchStmt(
                "/beratStandar/SP_1273_BCD_UPDATE_BERAT_ADSTAR2_1/" +
                    txtKodeBarang.value +
                    "~" +
                    numCloth.value +
                    "~" +
                    numLami.value +
                    "~" +
                    numStandar2.value,
                () => {
                    enableForm(false);
                    formWait(false);
                    alert("Berat Standart 2 Tersimpan.");
                    btnKoreksi.focus();
                }
            );
        }
    );
});

btnKoreksi.addEventListener("click", function () {
    listOfTxt.forEach((ele) => (ele.value = ""));
    txtKodeBarang.disabled = false;
    txtKodeBarang.focus();
    btnBatal.disabled = false;
});

btnBatal.addEventListener("click", function () {
    listOfTxt.forEach((ele) => (ele.value = ""));
    btnProses.disabled = true;
    this.disabled = true;
    listOfTxt.forEach((ele) => (ele.disabled = true));
});

btnKeluar.addEventListener("click", function () {
    window.location.href = "/Extruder/BeratKomposisi";
});
//#endregion

//#region Functions
function enableForm(bool_state) {
    btnKoreksi.disabled = bool_state;
    btnProses.disabled = !bool_state;
    btnBatal.disabled = !bool_state;
    listOfTxt.forEach((ele) => (ele.disabled = !bool_state));
}

function loadDataFetch(s_kode_brg) {
    fetchSelect(
        "/beratStandar/SP_1273_BCD_DATA_ADSTAR_1/" + s_kode_brg,
        (data) => {
            if (data.length > 0) {
                txtKodeBarang.value = s_kode_brg;
                txtType.value = data[0].NAMA_BRG;
                numStandar2.value = data[0].BERAT_TOTAL2;
                numCloth.value = data[0].BERAT_CLOTH2;
                numLami.value = data[0].BERAT_LAMI2;
                numStandar1.value = data[0].BERAT_TOTAL;
                hidCloth.value = data[0].BERAT_CLOTH;
                hidLami.value = data[0].BERAT_LAMI;

                if (
                    numStandar1.value == "" ||
                    parseFloat(numStandar1.value) == 0
                ) {
                    alert("Inputkan Berat Standart 1 Terlebih Dahulu");
                    txtKodeBarang.value = "";
                    listOfTxt.forEach((ele) => (ele.value = ""));
                    txtKodeBarang.focus();
                    return;
                }

                fetchSelect(
                    "/beratStandar/SP_1273_PRG_CEK_KOMPOSISI_1/" + s_kode_brg,
                    (data2) => {
                        if (data2.length > 0) {
                            if (parseFloat(data2[0].Total) == 0) {
                                alert(
                                    "Kode Barang Ini Belum Input Komposisi Konversi !"
                                );

                                listOfTxt.forEach((ele) => (ele.value = ""));
                                txtKodeBarang.focus();
                                return;
                            } else {
                                enableForm(true);
                                numStandar2.select();
                            }
                        } else {
                            alert(
                                "Kode Barang Ini Belum Input Komposisi Konversi !"
                            );

                            listOfTxt.forEach((ele) => (ele.value = ""));
                            txtKodeBarang.focus();
                            return;
                        }
                    }
                );
            } else {
                alert("Kode barang tidak ditemukan.");
                txtKodeBarang.select();
            }
        }
    );
}

function enableForm(bool_state) {
    btnKoreksi.disabled = bool_state;
    btnProses.disabled = !bool_state;
    btnBatal.disabled = !bool_state;
    txtKodeBarang.disabled = !bool_state;
    numStandar2.disabled = !bool_state;
}

function formWait(bool_state) {
    if (bool_state) {
        document.body.style.cursor = "wait";
        btnKoreksi.style.cursor = "wait";
        btnKeluar.style.cursor = "wait";
        btnProses.style.cursor = "wait";
        btnBatal.style.cursor = "wait";
        listOfTxt.forEach((ele) => (ele.style.cursor = "wait"));
    } else {
        document.body.style.cursor = "default";
        btnKoreksi.style.cursor = "default";
        btnKeluar.style.cursor = "default";
        btnProses.style.cursor = "default";
        btnBatal.style.cursor = "default";
        listOfTxt.forEach((ele) => (ele.style.cursor = "default"));
    }
}
//#endregion

function init() {
    enableForm(false);
    btnKoreksi.focus();
}

$(document).ready(() => init());
