//#region Variables
const rdoPembebasan = document.getElementById("fasilitas_pembebasan");
const rdoPengembalian = document.getElementById("fasilitas_pengembalian");
const dateStart = document.getElementById("tgl_start");
const dateEstimasi = document.getElementById("estimasi_tgl");
const slcKodeBarang = document.getElementById("select_kode_barang");

const txtNamaBarang = document.getElementById("nama_barang");
const txtBahanPP = document.getElementById("bahan_pp");
const txtBenang = document.getElementById("benang");
const txtHasil = document.getElementById("hasil");
const txtSisa = document.getElementById("sisa");
const txtInputPP = document.getElementById("estimasi_pp");
const txtCaco3 = document.getElementById("estimasi_caco3");
const txtHasilBenang = document.getElementById("estimasi_benang");

const hidMeter = document.getElementById("meter");
const hidRoll = document.getElementById("roll");
const hidAwal = document.getElementById("meter_awal");
const hidOrder = document.getElementById("id_order");

const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");

const listOfEstimasi = document.querySelectorAll(
    "#estimasi_bahan .form-control"
);

const listOrder = [];
/* ISI LIST ORDER
    0 Tanggal
    1 BahanPP
    2 CaCO3
    3 Benang
*/

var refetchKode = false;
//#endregion

//#region Events
rdoPembebasan.addEventListener("change", function () {
    refetchKode = true;
    clearAll();
});

rdoPengembalian.addEventListener("change", function () {
    refetchKode = true;
    clearAll();
});

slcKodeBarang.addEventListener("mousedown", function () {
    if (refetchKode) {
        refetchKode = false;
        clearOptions(this);
        const errorOption = addLoadingOption(this);
        const optionKeys = {
            valueKey: "TglStart",
            textKey: "KodeBarang",
        };

        let kode = -1;
        if (rdoPembebasan.checked) {
            kode = 2;
        } else kode = 3;

        // SP_1273_EXT_KITE Kode 2
        // SP_1273_EXT_KITE Kode 3
        fetchSelect(
            "/Master/getKiteExtruder/" + kode,
            (data) => {
                if (data.length > 0) {
                    addOptions(this, data, optionKeys, false);
                    this.removeChild(errorOption);
                } else refetchKode = true;
            },
            errorOption
        );
    }
});

slcKodeBarang.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && refetchKode) {
        refetchKode = false;
        clearOptions(this);
        const errorOption = addLoadingOption(this);
        const optionKeys = {
            valueKey: "TglStart",
            textKey: "KodeBarang",
        };

        let kode = -1;
        if (rdoPembebasan.checked) {
            kode = 2;
        } else kode = 3;

        // SP_1273_EXT_KITE Kode 2
        // SP_1273_EXT_KITE Kode 3
        fetchSelect(
            "/Master/getKiteExtruder/" + kode,
            (data) => {
                if (data.length > 0) {
                    addOptions(this, data, optionKeys, false);
                    this.removeChild(errorOption);
                } else refetchKode = true;
            },
            errorOption
        );
    }
});

slcKodeBarang.addEventListener("change", function () {
    dateStart.value = this.value;

    // SP_1273_EXT_KITE Kode 4
    fetchSelect(
        "/Master/getKiteExtruder/4/" +
            dateStart.value +
            "/" +
            this.options[this.selectedIndex].text,
        (data) => {
            if (data.length > 0) {
                hidOrder.value = data[0].IdOrder;
                txtNamaBarang.value = data[0].NAMA_BRG;
                txtBahanPP.value = data[0].BahanPP;
                txtBenang.value = data[0].Benang;
                txtHasil.value = data[0].Hasil;

                txtSisa.value =
                    parseFloat(txtBenang.value) - parseFloat(txtHasil.value);
                txtSisa.value = parseFloat(txtSisa.value).toFixed(2);

                // SP_1273_EXT_KITE Kode 6
                fetchSelect(
                    "/Master/getKiteExtOrder/6/" + hidOrder.value,
                    (data2) => {
                        if (data2.length > 0) {
                            if (data2[0].Ada > 0) {
                                listOrder.length = 0;
                                clearTable_DataTable("table_order", 4);

                                // SP_1273_EXT_KITE Kode 5
                                fetchSelect(
                                    "/Master/getKiteExtOrder/5/" +
                                        hidOrder.value,
                                    (data3) => {
                                        for (let i = 0; i < data3.length; i++) {
                                            listOrder.push({
                                                Tanggal: data3[i].Tanggal,
                                                BahanPP: data3[i].BahanPP,
                                                CaCO3: data3[i].CaCO3,
                                                Benang: data3[i].Benang,
                                            });
                                        }

                                        txtInputPP.focus();
                                        if (data3.length > 0) {
                                            addTable_DataTable(
                                                "table_order",
                                                listOrder,
                                                null,
                                                null,
                                                "500px"
                                            );
                                        }
                                    }
                                );
                            } else txtInputPP.focus();
                        }
                    }
                );
            } else alert("Data barang tidak ditemukan.");
        }
    );
});

txtInputPP.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        txtHasilBenang.value =
            ((parseFloat(this.value) / 0.0757) * 97.01) / 1000;
        txtHasilBenang.value = parseFloat(txtHasilBenang.value).toFixed(2);
        txtCaco3.value =
            parseFloat(txtHasilBenang.value) - parseFloat(txtInputPP.value);

        btnProses.focus();
    }
});

btnProses.addEventListener("click", function () {
    if (txtNamaBarang.value.trim() == "") {
        alert("Pilih Kode Barang Fasilitas Terlebih Dahulu !");
        slcKodeBarang.focus();
    } else if (txtHasilBenang.value.trim() == "") {
        alert("Isi Bahan PP Terlebih Dahulu !");
        txtInputPP.focus();
    } else {
        // SP_1273_EXT_KITE Kode 7
        fetchStmt(
            "/Master/getKiteExtruder7/" +
                hidOrder.value +
                "/" +
                dateEstimasi.value +
                "/" +
                txtInputPP.value +
                "/" +
                txtCaco3.value +
                "/" +
                txtHasilBenang.value,
            () => {
                alert("Data berhasil tersimpan.");
                dateEstimasi.value = getCurrentDate();
                txtInputPP.value = "";
                txtCaco3.value = "";
                txtHasilBenang.value = "";

                // SP_1273_EXT_KITE Kode 4
                fetchSelect(
                    "/Master/getKiteExtruder/4/" +
                        dateStart.value +
                        "/" +
                        slcKodeBarang.options[slcKodeBarang.selectedIndex].text,
                    (data) => {
                        if (data.length > 0) {
                            hidOrder.value = data[0].IdOrder;
                            txtNamaBarang.value = data[0].NAMA_BRG;
                            txtBahanPP.value = data[0].BahanPP;
                            txtBenang.value = data[0].Benang;
                            txtHasil.value = data[0].Hasil;

                            txtSisa.value =
                                parseFloat(txtBenang.value) -
                                parseFloat(txtHasil.value);

                            listOrder.length = 0;
                            clearTable_DataTable("table_order", 4);

                            // SP_1273_EXT_KITE Kode 5
                            fetchSelect(
                                "/Master/getKiteExtOrder/5/" + hidOrder.value,
                                (data3) => {
                                    for (let i = 0; i < data3.length; i++) {
                                        listOrder.push({
                                            Tanggal: data3[i].Tanggal,
                                            BahanPP: data3[i].BahanPP,
                                            CaCO3: data3[i].CaCO3,
                                            Benang: data3[i].Benang,
                                        });
                                    }

                                    txtInputPP.focus();
                                    if (data3.length > 0) {
                                        addTable_DataTable(
                                            "table_order",
                                            listOrder,
                                            null,
                                            null,
                                            "500px"
                                        );
                                    }
                                }
                            );
                        } else alert("Data barang tidak ditemukan.");
                    }
                );
            }
        );
    }
});

btnKeluar.addEventListener("click", function () {
    window.location.href = "/Extruder/ExtruderNet";
});
//#endregion

//#region Functions
function clearAll() {
    listOrder.length = 0;
    clearTable_DataTable("table_order", 4);

    slcKodeBarang.selectedIndex = 0;
    dateStart.value = getCurrentDate();
    txtNamaBarang.value = "";
    txtBahanPP.value = "";
    txtBenang.value = "";
    txtHasil.value = "";
    txtSisa.value = "";

    listOfEstimasi.forEach((ele) => (ele.value = ""));
    dateEstimasi.value = getCurrentDate();
}
//#endregion

function init() {
    $("#table_order").DataTable({
        responsive: true,
        paging: false,
        scrollY: "500px",
        scrollX: "",
        dom: '<"row"<"col-sm-6"i><"col-sm-6"f>>' + '<"row"<"col-sm-12"tr>>',
        language: {
            searchPlaceholder: " Tabel order...",
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

    clearTable_DataTable("table_order", 4);
    rdoPembebasan.checked = true;
    dateStart.value = getCurrentDate();
    dateEstimasi.value = getCurrentDate();
    slcKodeBarang.focus();
}

$(document).ready(() => init());
