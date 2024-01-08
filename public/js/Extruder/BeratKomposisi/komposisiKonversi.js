//#region Variables
const txtKodeBarang = document.getElementById("kode_barang");
const txtType = document.getElementById("txt_type");
const listOfInput = document.querySelectorAll("input, textarea");
const listOfLabel = document.querySelectorAll("span.lbl_persen");
const listOfGram = document.querySelectorAll("input.txt_gram");
const listOfPersen = document.querySelectorAll("input.txt_persen");

const numBerat = document.getElementById("berat_standar");
const numPpGram = document.getElementById("pp_gram");
const numPpPersen = document.getElementById("pp_persen");
const numPeGram = document.getElementById("pe_gram");
const numPePersen = document.getElementById("pe_persen");
const numCaco3Gram = document.getElementById("caco3_gram");
const numCac03Persen = document.getElementById("caco3_persen");
const numMasterGram = document.getElementById("masterbatch_gram");
const numMasterPersen = document.getElementById("masterbatch_persen");
const numUvGram = document.getElementById("UV_gram");
const numUvPersen = document.getElementById("UV_persen");
const numAntiGram = document.getElementById("anti_static_gram");
const numAntiPersen = document.getElementById("anti_static_persen");
const numKertasGram = document.getElementById("kertas_gram");
const numKertasPersen = document.getElementById("kertas_persen");
const numLdpeGram = document.getElementById("ldpe_gram");
const numLdpePersen = document.getElementById("ldpe_persen");
const numLldpeGram = document.getElementById("lldpe_gram");
const numLldpePersen = document.getElementById("lldpe_persen");
const numHdpeGram = document.getElementById("hdpe_gram");
const numHdpePersen = document.getElementById("hdpe_persen");
const numTotal = document.getElementById("total_gram");
const numJumlah = document.getElementById("total_persen");

const btnIsi = document.getElementById("btn_isi");
const btnBatal = document.getElementById("btn_batal");
const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");

var jualKg = "";
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
            enableForm(true);
        } else this.select();
    }
});

btnBatal.addEventListener("click", function () {
    clearForm();
    enableForm(false);
    btnIsi.focus();
});

btnProses.addEventListener("click", function () {
    if (txtKodeBarang.value.trim() != "") {
        let is_empty = false;
        listOfGram.forEach((ele) => {
            if (ele.value == "") is_empty = true;
        });

        if (!is_empty) {
            hitungSemuaPersen();

            if (parseInt(numTotal.value) == parseInt(numBerat.value)) {
                fetchStmt(
                    "/komposisiKonversi/SP_1273_PRG_UPDATE_KOMPOSISI_KONVERSI_1/" +
                        txtKodeBarang.value +
                        "~" +
                        numPpGram.value +
                        "~" +
                        numPeGram.value +
                        "~" +
                        numCaco3Gram.value +
                        "~" +
                        numMasterGram.value +
                        "~" +
                        numUvGram.value +
                        "~" +
                        numAntiGram.value +
                        "~" +
                        numKertasGram.value +
                        "~" +
                        numLdpeGram.value +
                        "~" +
                        numLldpeGram.value +
                        "~" +
                        numHdpeGram.value,
                    () => {
                        enableForm(false);
                        btnIsi.focus();
                        alert("Komposisi Konversi berhasil tersimpan.");
                    }
                );
            } else
                alert(
                    "Jumlah Komposisi Tidak Sama dengan Berat Standart, Cek Kembali Inputan Anda !"
                );
        } else
            alert(
                "Inputan Komposisi Konversi Belum Terisi Dengan Lengkap, Cek Kembali Inputan Anda"
            );
    } else alert("Isi Komposisi Terlebih Dahulu");
});

btnIsi.addEventListener("click", function () {
    listOfInput.forEach((ele) => (ele.value = ""));
    txtKodeBarang.disabled = false;
    txtKodeBarang.focus();
});

btnKeluar.addEventListener("click", function () {
    window.location.href = "/Extruder/BeratKomposisi";
});

numHdpeGram.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (this.value.trim() == "") {
            numHdpeGram.value = 0;
            btnProses.focus();
            return;
        }

        let is_empty = false;
        listOfGram.forEach((ele) => {
            if (ele.value == "") is_empty = true;
        });

        if (!is_empty) {
            hitungSemuaPersen();
            btnProses.focus();
        } else
            alert(
                "Inputan Komposisi Konversi Belum Terisi Dengan Lengkap, Cek Kembali Inputan Anda"
            );
    }
});
//#endregion

//#region Functions
function enableForm(bool_state) {
    listOfInput.forEach((input) => (input.disabled = !bool_state));
    btnBatal.disabled = !bool_state;
    btnProses.disabled = !bool_state;
    btnIsi.disabled = bool_state;
    numJumlah.disabled = true;
    numTotal.disabled = true;
    txtType.disabled = true;
    listOfPersen.forEach((ele) => (ele.disabled = true));
    numBerat.disabled = true;
}

function clearForm() {
    listOfInput.forEach((input) => (input.value = ""));
    listOfLabel.forEach((span) => (span.textContent = "%"));
}

function loadDataFetch(s_kode_brg) {
    fetchSelect(
        "/komposisiKonversi/SP_1273_ABM_BERAT_STANDART_1/" + s_kode_brg,
        (data) => {
            if (data.length > 0) {
                numBerat.value = parseInt(data[0].BERAT_TOTAL);
                if (parseFloat(numBerat.value) == 0 || numBerat.value == "") {
                    alert("Inputkan Berat Standart Terlebih Dahulu !");
                    clearForm();
                    enableForm(false);
                } else {
                    fetchSelect(
                        "/komposisiKonversi/SP_1273_PRG_DATA_KOMPOSISI_1/" +
                            s_kode_brg,
                        (data2) => {
                            if (data2.length > 0) {
                                txtKodeBarang.value = s_kode_brg;
                                txtType.value = data2[0].NAMA_BRG;
                                numPpGram.value = data2[0].PP;
                                numPeGram.value = data2[0].PE;
                                numCaco3Gram.value = data2[0].CaCO3;
                                numMasterGram.value = data2[0].Masterbatch;
                                numUvGram.value = data2[0].UV;
                                numAntiGram.value = data2[0].AntiStatic;
                                numKertasGram.value = data2[0].Conductive;
                                numLdpeGram.value = data2[0].LDPE_Lami;
                                numLldpeGram.value = data2[0].LLDPE_Inner;
                                numHdpeGram.value = data2[0].HDPE_Inner;
                                jualKg = data2[0].JualKg;

                                hitungSemuaPersen();
                                numPpGram.select();
                            } else {
                                enableForm(false);
                                alert(
                                    "Kode Barang Belum diDaftarkan Sebagai Kode Barang Eksport !"
                                );
                            }
                        }
                    );
                }
            } else {
                txtKodeBarang.select();
                alert("Kode Barang " + s_kode_brg + " tidak ditemukan.");
            }
        }
    );
}

function hitungSemuaPersen() {
    let list_input = [];
    listOfGram.forEach((ele) => list_input.push(parseFloat(ele.value)));
    if (jualKg == "Y") {
        listOfLabel.forEach((ele) => (ele.textContent = "Gram"));
        listOfPersen.forEach(function (ele, i) {
            ele.value = (
                (parseFloat(list_input[i]) / parseFloat(numBerat.value)) *
                1000
            ).toFixed(2);

            if (isNaN(parseFloat(numJumlah.value))) numJumlah.value = 0;
            numJumlah.value =
                parseFloat(numJumlah.value) + parseFloat(ele.value);
        });
    } else {
        listOfLabel.forEach((ele) => (ele.textContent = "%"));
        listOfPersen.forEach(function (ele, i) {
            ele.value = (
                (parseFloat(list_input[i]) / parseFloat(numBerat.value)) *
                100
            ).toFixed(2);

            if (isNaN(parseFloat(numJumlah.value))) numJumlah.value = 0;
            numJumlah.value =
                parseFloat(numJumlah.value) + parseFloat(ele.value);
        });
    }

    numJumlah.value = parseFloat(numJumlah.value).toFixed(0);
    numTotal.value = parseInt(
        list_input.reduce(function (x, y) {
            return x + y;
        }, 0)
    );
}

function hitungPersenSatuan(ele_gram, ele_persen, ele_target) {
    ele_gram.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            if (ele_gram.value !== "") {
                ele_persen.value = (
                    (parseFloat(ele_gram.value) / parseFloat(numBerat.value)) *
                    100
                ).toFixed(2);
            } else ele_gram.value = 0;
            ele_target.select();
        }
    });
}
//#endregion

function init() {
    enableForm(false);
    btnIsi.focus();
    numJumlah.value = 0;
    hitungPersenSatuan(numPpGram, numPpPersen, numPeGram);
    hitungPersenSatuan(numPeGram, numPePersen, numCaco3Gram);
    hitungPersenSatuan(numCaco3Gram, numCac03Persen, numMasterGram);
    hitungPersenSatuan(numMasterGram, numMasterPersen, numUvGram);
    hitungPersenSatuan(numUvGram, numUvPersen, numAntiGram);
    hitungPersenSatuan(numAntiGram, numAntiPersen, numKertasGram);
    hitungPersenSatuan(numKertasGram, numKertasPersen, numLdpeGram);
    hitungPersenSatuan(numLdpeGram, numLdpePersen, numLldpeGram);
    hitungPersenSatuan(numLldpeGram, numLldpePersen, numHdpeGram);
}

$(document).ready(() => init());
