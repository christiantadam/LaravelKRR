//#region Variables
const hidInput = document.getElementById("hiddenKu");

const dateAwal = document.getElementById("tanggal_awal");
const dateAkhir = document.getElementById("tanggal_akhir");

const btnOK = document.getElementById("btn_ok");
const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");

const tableDetailCol = [
    { width: "100px" }, // Tanggal
    { width: "125px" }, // Id Konversi
    { width: "125px" }, // Uraian
    { width: "200px" }, // Nama Type
    { width: "125px" }, // Qty. Primer
    { width: "125px" }, // Qty. Sekunder
    { width: "125px" }, // Qty. Tritier
    { width: "100px" }, // Objek
    { width: "100px" }, // Kel. Ut.
    { width: "100px" }, // Kelompok
    { width: "100px" }, // Sub-kel.
    { width: "100px" }, // Id Sub-kel.
    { width: "100px" }, // Id Type
];

const tableKonversiPos = $("#table_konversi").offset().top - 125;

const listKonversi = [];
/* ISI LIST KONVERSI
    0 IdKonversiNG
    1 Tanggal
*/

const listDetail = [];
/* ISI LIST DETAIL
    0 Tanggal
    1 IdKonversiNG
    2 UraianDetailTransaksi
    3 NamaType
    4 JumlahPengeluaranPrimer / JumlahPemasukanPrimer
    5 JumlahPengeluaranSekunder / JumlahPemasukanSekunder
    6 JumlahPengeluaranTritier / JumlahPemasukanTritier
    7 NamaObjek
    8 NamaKelompokUtama
    9 NamaKelompok
    10 NamaSubKelompok
    11 IdSubKelompok
    12 IdType
*/

const listTmpTrans = [];
/* ISI LIST TMP TRANSAKSI
    0 IdTransaksi
    1 IdTypeTransaksi
    2 UraianDetailTransaksi
    3 IdType
    4 IdPenerima
    5 IdPemberi
    6 SaatAwalTransaksi
    7 SaatAkhirTransaksi
    8 JumlahPemasukanPrimer
    9 JumlahPemasukanSekunder
    10 JumlahPemasukanTritier
    11 JumlahPengeluaranPrimer
    12 JumlahPengeluaranSekunder
    13 JumlahPengeluaranTritier
    14 AsalIdSubKelompok
    15 TujuanIdSubKelompok
    16 IdKonversi
    17 SaldoPrimer
    18 SaldoSekunder
    19 SaldoTritier
    20 NamaType
    21 IdSubKelompok_Type
*/

var listOfRadioKonversi,
    listOfRadioDetail = null;

var pilKonversi = -1;
//#endregion

//#region Events
btnOK.addEventListener("click", function () {
    listKonversi.length = 0;
    clearTable_DataTable("table_konversi", 2);
    daftarKonversiBelumACC();
});

btnProses.addEventListener("click", function () {
    cekPenyesuaian();
});

btnKeluar.addEventListener("click", function () {
    window.location.href = "/Extruder/ExtruderNet";
});

hidInput.addEventListener("change", function () {
    if (this.value == "daftar konversi belum acc") {
        tampilDetailKonversi();
    } else if (this.value.includes("cek penyesuaian")) {
        if (this.value.split(" | ")[1] == "true") {
            prosesInventory();
        }
    } else if (this.value.includes("proses inventory")) {
        if (this.value.split(" | ")[1] == "true") {
            prosesExtruder();
        }
    } else if (this.value.includes("proses extruder")) {
        if (this.value.split(" | ")[1] == "true") {
            listKonversi.length = 0;
            listDetail.length = 0;

            clearTable_DataTable("table_konversi", 2);
            clearTable_DataTable("table_detail", tableDetailCol.length);
            daftarKonversiBelumACC();

            alert("Data berhasil tersimpan!");
        }
    }
});

listOfRadioKonversi.forEach((radio, index) => {
    radio.addEventListener("change", function () {
        if (this.checked) {
            pilKonversi = index;
            cariBarcode(listKonversi[index].IdKonversiNG);
        }
    });
});
//#endregion

//#region Functions
function daftarKonversiBelumACC() {
    // SP_5298_EXT_LIST_IDKONVERSI_NG
    fetchSelect(
        `/Benang/getListIdKonversiNG/${dateAwal.value}/${dateAkhir.value}`,
        (data) => {
            for (let i = 0; i < data.length; i++) {
                listKonversi.push({
                    IdKonversiNG: data[i].IdKonversiNG,
                    Tanggal: data[i].Tanggal,
                });
            }

            addTable_DataTable(
                "table_konversi",
                addRadioToData(listKonversi, "IdKonversiNG", "radio_konversi")
            );

            listOfRadioKonversi = document.querySelectorAll(
                ".radio_konversi input[type='radio']"
            );

            $("html, body").animate({ scrollTop: tableKonversiPos }, 100);

            if (data.length != 0) {
                pilKonversi = 0;
            }

            hidInput.value = "daftar konversi belum acc";
            hidInput.dispatchEvent(new Event("change"));
        }
    );
}

function tampilDetailKonversi() {
    listDetail.length = 0;
    clearTable_DataTable(
        "table_detail",
        tableDetailCol.length,
        "Memuat data..."
    );

    for (let i = 0; i < listKonversi.length; i++) {
        // SP_5298_EXT_DETAILDATA_BENANG_NG
        fetchSelect(
            `/Benang/getDetailDataBenangNG/${listKonversi[i].IdKonversiNG}`,
            (data) => {
                for (let j = 0; j < data.length; j++) {
                    let pushedData = {};

                    pushedData["Tanggal"] = dateTimeToDate(data[j].Tanggal);
                    pushedData["IdKonversiNG"] = data[j].IdKonversiNG;
                    pushedData["UraianDetailTransaksi"] =
                        data[j].UraianDetailTransaksi;
                    pushedData["NamaType"] = data[j].NamaType;

                    if (
                        pushedData["UraianDetailTransaksi"] == "Asal Konversi"
                    ) {
                        pushedData["JumlahPengeluaranPrimer"] =
                            data[j].JumlahPengeluaranPrimer;
                        pushedData["JumlahPengeluaranSekunder"] =
                            data[j].JumlahPengeluaranSekunder;
                        pushedData["JumlahPengeluaranTritier"] =
                            data[j].JumlahPengeluaranTritier;
                    } else {
                        pushedData["JumlahPemasukanPrimer"] =
                            data[j].JumlahPemasukanPrimer;
                        pushedData["JumlahPemasukanSekunder"] =
                            data[j].JumlahPemasukanSekunder;
                        pushedData["JumlahPemasukanTritier"] =
                            data[j].JumlahPemasukanTritier;
                    }

                    pushedData["NamaObjek"] = data[j].NamaObjek;
                    pushedData["NamaKelompokUtama"] = data[j].NamaKelompokUtama;
                    pushedData["NamaKelompok"] = data[j].NamaKelompok;
                    pushedData["NamaSubKelompok"] = data[j].NamaSubKelompok;
                    pushedData["IdSubKelompok"] = data[j].IdSubKelompok;
                    pushedData["IdType"] = data[j].IdType;

                    listDetail.push(pushedData);
                }

                addTable_DataTable(
                    "table_detail",
                    addRadioToData(listDetail, "Tanggal", "radio_detail"),
                    tableDetailCol
                );

                listOfRadioDetail = document.querySelectorAll(
                    ".radio_detail input[type='radio']"
                );

                listOfRadioDetail.forEach((radio) => {
                    radio.disabled = true;
                });
            }
        );
    }
}

function cariBarcode(id_konversi) {
    listOfRadioDetail.forEach((radio) => {
        radio.checked = false;
    });

    for (let i = 0; i < listDetail.length; i++) {
        if (listDetail[i].IdKonversiNG == id_konversi) {
            listOfRadioDetail[i].checked = true;
        }
    }
}

function cekPenyesuaian() {
    let penyesuaian = false;

    for (let i = 0; i < listDetail.length; i++) {
        // SP_5298_EXT_CHECK_PENYESUAIAN_TRANSAKSI
        fetchSelect(
            `/Benang/getPenyesuaianTransaksi/null/${listDetail[i].IdType}/06`,
            (data) => {
                if (data[0].jumlah > 1) {
                    penyesuaian = true;

                    alert(
                        "Terdapat penyesuaian untuk type " +
                            listDetail[i].NamaType
                    );
                }
            }
        );
    }

    hidInput.value = "cek penyesuaian | " + penyesuaian;
    hidInput.dispatchEvent(new Event("change"));
}

function prosesInventory() {
    // SP_5409_EXT_DISPLAY_TRANSAKSI_KONVERSI_NG
    fetchSelect(
        `/Benang/getTransaksiKonversiNG/${listKonversi[pilKonversi].IdKonversiNG}`,
        (data) => {
            for (let i = 0; i < data.length; i++) {
                listTmpTrans.push(data[i]);
            }

            if (listTmpTrans.length > 0) {
                for (let i = 0; i < listTmpTrans.length; i++) {
                    if (
                        listTmpTrans[i].JumlahPengeluaranPrimer >
                            listTmpTrans[i].SaldoPrimer ||
                        listTmpTrans[i].JumlahPengeluaranSekunder >
                            listTmpTrans[i].SaldoSekunder ||
                        listTmpTrans[i].JumlahPengeluaranTritier >
                            listTmpTrans[i].SaldoTritier
                    ) {
                        alert(
                            "Saldo untuk type " +
                                listTmpTrans[i].NamaType +
                                " tidak mencukupi."
                        );
                    }
                }
            }

            for (let i = 0; i < listTmpTrans.length; i++) {
                // SP_5298_EXT_PROSES_ACC_KONVERSI
                fetchStmt(
                    `/Benang/updProsesACCKonversi/
                        ${listTmpTrans[i].IdTransaksi}/
                        ${listTmpTrans[i].IdType}/
                        tmpUser/
                        ${getCurrentDate()}/
                        ${listTmpTrans[i].JumlahPengeluaranPrimer}/
                        ${listTmpTrans[i].JumlahPengeluaranSekunder}/
                        ${listTmpTrans[i].JumlahPengeluaranTritier}/
                        ${listTmpTrans[i].JumlahPemasukanPrimer}/
                        ${listTmpTrans[i].JumlahPemasukanSekunder}/
                        ${listTmpTrans[i].JumlahPemasukanTritier}`,
                    () => {
                        hidInput.value = "proses inventory | true";
                        hidInput.dispatchEvent(new Event("change"));
                    },
                    () => {
                        hidInput.value = "proses inventory | false";
                        hidInput.dispatchEvent(new Event("change"));
                    }
                );
            }
        }
    );
}

function prosesExtruder() {
    // SP_5298_EXT_ACC_KONVERSI_NG
    fetchStmt(
        `/Benang/updACCKonversiNG/${listKonversi[pilKonversi].IdKonversiNG}/tmpUser`,
        () => {
            hidInput.value = "proses extruder | true";
            hidInput.dispatchEvent(new Event("change"));
        },
        () => {
            hidInput.value = "proses extruder | false";
            hidInput.dispatchEvent(new Event("change"));
        }
    );
}
//#endregion

function init() {
    if ($.fn.DataTable.isDataTable("#table_konversi")) {
        $("#table_konversi").DataTable().destroy();
    }

    if ($.fn.DataTable.isDataTable("#table_detail")) {
        $("#table_detail").DataTable().destroy();
    }

    $("#table_konversi").DataTable({
        responsive: true,
        paging: false,
        scrollY: "250px",
        scrollX: "",
        language: {
            searchPlaceholder: " Tabel konversi...",
            search: "",
            info: "",
        },
    });

    $("#table_detail").DataTable({
        responsive: true,
        paging: false,
        scrollY: "250px",
        scrollX: "1000000px",
        columns: tableDetailCol,
        dom: '<"row"<"col-sm-6"i><"col-sm-6"f>>' + '<"row"<"col-sm-12"tr>>',
        language: {
            searchPlaceholder: " Tabel detail...",
            search: "",
            info: "Menampilkan _START_ - _END_ dari _TOTAL_ data",
        },

        initComplete: () => {
            var searchInput = $('input[type="search"]').addClass(
                "form-control"
            );

            searchInput.wrap('<div class="input-group"></div>');
            searchInput.before('<span class="input-group-text">Cari:</span>');
        },
    });
}

$(document).ready(() => {
    init();
});
