//#region Variables
const txtGelondongan = document.getElementById("kode_gelondongan");
const txtType = document.getElementById("berat_type");
const numStandar1 = document.getElementById("berat_standar1");
const numStandar2 = document.getElementById("berat_standar2");
const numKarung = document.getElementById("berat_karung");
const numReinforced = document.getElementById("berat_reinforced");
const numLami = document.getElementById("berat_lami");
const numConductive = document.getElementById("berat_conductive");

const hidKarung = document.getElementById("hid_karung");
const hidReinforced = document.getElementById("hid_reinforced");
const hidLami = document.getElementById("hid_lami");
const hidConductive = document.getElementById("hid_conductive");

const btnKoreksi = document.getElementById("btn_koreksi");
const btnBatal = document.getElementById("btn_batal");
const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");
const listOfTxt = document.querySelectorAll("input, textarea");

var userId = "1001";
//#endregion

//#region Events
txtGelondongan.addEventListener("keypress", function (event) {
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
        numKarung.value = (
            (parseFloat(hidKarung.value) / parseFloat(numStandar1.value)) *
            parseFloat(numStandar2.value)
        ).toFixed(2);

        numReinforced.value = (
            (parseFloat(hidReinforced.value) / parseFloat(numStandar1.value)) *
            parseFloat(numStandar2.value)
        ).toFixed(2);

        numLami.value = (
            (parseFloat(hidLami.value) / parseFloat(numStandar1.value)) *
            parseFloat(numStandar2.value)
        ).toFixed(2);

        numConductive.value = (
            (parseFloat(hidConductive.value) / parseFloat(numStandar1.value)) *
            parseFloat(numStandar2.value)
        ).toFixed(2);

        btnProses.disabled = false;
        btnProses.focus();
    }
});

btnProses.addEventListener("click", function () {
    formWait(true);
    fetchSelect(
        "/beratStandar/SP_1273_PRG_CEK_KOMPOSISI_1/" + txtGelondongan.value,
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

                    txtGelondongan.value = "";
                    txtGelondongan.focus();
                    formWait(false);
                    return;
                }
            }

            fetchStmt(
                "/beratStandar/SP_1273_BCD_UPDATE_BERAT_CIRCULAR2_1/" +
                    txtGelondongan.value +
                    "~" +
                    numKarung.value +
                    "~" +
                    numReinforced.value +
                    "~" +
                    numLami.value +
                    "~" +
                    numConductive.value +
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
    txtGelondongan.disabled = false;
    txtGelondongan.focus();
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
        "/beratStandar/SP_1273_BCD_DATA_CIRCULAR_1/" + s_kode_brg,
        (data) => {
            if (data.length > 0) {
                txtGelondongan.value = s_kode_brg;
                txtType.value = data[0].NAMA_BRG;
                numStandar2.value = data[0].BERAT_TOTAL2;
                numKarung.value = data[0].BERAT_KARUNG2;
                numReinforced.value = data[0].BERAT_KARUNG_FORCE2;
                numLami.value = data[0].BERAT_LAMI2;
                numConductive.value = data[0].BERAT_CONDUCTIVE2;
                numStandar1.value = data[0].BERAT_TOTAL;
                hidKarung.value = data[0].BERAT_KARUNG;
                hidReinforced.value = data[0].BERAT_KARUNG_FORCE;
                hidLami.value = data[0].BERAT_LAMI;
                hidConductive.value = data[0].BERAT_CONDUCTIVE;

                if (
                    numStandar1.value == "" ||
                    parseFloat(numStandar1.value) == 0
                ) {
                    alert("Inputkan Berat Standart 1 Terlebih Dahulu");
                    txtGelondongan.value = "";
                    listOfTxt.forEach((ele) => (ele.value = ""));
                    txtGelondongan.focus();
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
                                txtGelondongan.focus();
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
                            txtGelondongan.focus();
                            return;
                        }
                    }
                );
            } else {
                alert("Kode barang tidak ditemukan.");
                txtGelondongan.select();
            }
        }
    );
}

function enableForm(bool_state) {
    btnKoreksi.disabled = bool_state;
    btnProses.disabled = !bool_state;
    btnBatal.disabled = !bool_state;
    txtGelondongan.disabled = !bool_state;
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
