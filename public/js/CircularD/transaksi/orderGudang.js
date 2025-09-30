//#region Variables
const txtKodeAsal = document.getElementById("kode_asal");
const txtIdOrder = document.getElementById("id_order");
const btnIdOrder = document.getElementById("btn_id_order");
const txtTypeAsal = document.getElementById("type_asal");
const txtRollOrder = document.getElementById("roll_order");
const txtRollProduksi = document.getElementById("roll_produksi");

const txtKodeTujuan = document.getElementById("kode_tujuan");
const btnKodeTujuan = document.getElementById("btn_kode_tujuan");
const txtNoSP = document.getElementById("no_sp");
const btnNoSP = document.getElementById("btn_no_sp");
const txtTypeTujuan = document.getElementById("type_tujuan");
const txtMeterOrder = document.getElementById("meter_order");
const txtMeterProduksi = document.getElementById("meter_produksi");

const chkStatusLunas = document.getElementById("status_lunas");
const hidProses = document.getElementById("mode_proses");
const hidData = document.getElementById("form_data");

const btnIsi = document.getElementById("btn_isi");
const btnKoreksi = document.getElementById("btn_koreksi");
const btnHapus = document.getElementById("btn_hapus");
const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");
//#endregion

//#region Listeners
btnIdOrder.addEventListener("click", function () {
    if (hidProses.value == "3") {
        fetchSelect("/sp-order/GET_ORDER_DAN_BARANG_ASAL", (data) => {
            var desiredKeyOrder = ["Nama_Barang", "Id_Order", "Kode_Barang"];
            var rearrangedData = data.map(function (item) {
                return reorderKeys(item, desiredKeyOrder);
            });
            MD_tableData = rearrangedData;
            MD_titleLabel.textContent = "Daftar Order dan Barang Asal";

            MD_tableHeaders = ["Nama Barang", "Id Order"];
            MD_columnSizes = [200, 100];

            MD_postAction = () => {
                let selectedData = MD_tableData.find(
                    (order) => order.Id_Order === MD_selectedData["Id Order"]
                );

                txtIdOrder.value = selectedData["Id_Order"];
                txtTypeAsal.value = selectedData["Nama_Barang"];
                txtTypeAsal.title = selectedData["Nama_Barang"];
                txtKodeAsal.value = selectedData["Kode_Barang"];

                txtKodeTujuan.disabled = false;
                btnKodeTujuan.disabled = false;
                txtKodeTujuan.focus();
            };

            $("#staticBackdrop").modal("show");
        });
    } else if (hidProses.value == "4") {
        fetchSelect("/sp-order/SP_4384_CIR_Check_GudangOrder1~6", (data) => {
            var desiredKeyOrder = ["idsuratpesanan", "id_order"];
            var rearrangedData = data.map(function (item) {
                return reorderKeys(item, desiredKeyOrder);
            });

            const uniqueOrders = removeDuplicateOrders(rearrangedData);
            MD_tableData = uniqueOrders;
            MD_titleLabel.textContent =
                "Daftar Order Gudang Sudah Mulai Produksi";

            MD_tableHeaders = ["Nomor Surat Pesanan", "Id Order"];
            MD_columnSizes = [200, 100];

            MD_postAction = () => {
                txtIdOrder.value = MD_selectedData["Id Order"];
                txtNoSP.value = MD_selectedData["Nomor Surat Pesanan"];

                fetchSelect(
                    "/sp-order/SP_4384_CIR_Check_GudangOrder1~7/" +
                        txtIdOrder.value.trim(),
                    (data2) => {
                        txtKodeAsal.value = data2[0]["Kode_barang_asal"];
                        txtTypeAsal.value = data2[0]["Nama_brg_asal"];

                        txtKodeTujuan.value = data2[0]["kode_barang_tujuan"];
                        txtTypeTujuan.value = data2[0]["Nama_brg_tujuan"];
                        txtTypeTujuan.title = data2[0]["Nama_brg_tujuan"];

                        txtRollOrder.value = data2[0]["Roll_order"];
                        txtMeterOrder.value = data2[0]["Meter_order"];
                        txtRollProduksi.value = data2[0]["Roll_produksi"];
                        txtMeterProduksi.value = data2[0]["Meter_produksi"];

                        if (data2[0]["Status"] == "1") {
                            chkStatusLunas.checked = true;
                        } else chkStatusLunas.checked = false;

                        txtRollOrder.disabled = false;
                        txtMeterOrder.disabled = false;

                        txtRollProduksi.disabled = false;
                        txtMeterProduksi.disabled = false;

                        chkStatusLunas.disabled = false;
                        txtIdOrder.disabled = true;
                        txtNoSP.disabled = true;

                        btnProses.focus();
                    }
                );
            };

            $("#staticBackdrop").modal("show");
        });
    } else if (hidProses.value == "5") {
        // Perbedaan hanya pada kode sp, mungkin bisa jadikan satu dengan hidProses.value "4"

        fetchSelect("/sp-order/SP_4384_CIR_Check_GudangOrder1~10", (data) => {
            var desiredKeyOrder = ["idsuratpesanan", "id_order"];
            var rearrangedData = data.map(function (item) {
                return reorderKeys(item, desiredKeyOrder);
            });

            const uniqueOrders = removeDuplicateOrders(rearrangedData);
            MD_tableData = uniqueOrders;
            MD_titleLabel.textContent =
                "Daftar Order Gudang Belum Mulai Produksi";

            MD_tableHeaders = ["Nomor Surat Pesanan", "Id Order"];
            MD_columnSizes = [200, 100];

            MD_postAction = () => {
                txtIdOrder.value = MD_selectedData["Id Order"];
                txtNoSP.value = MD_selectedData["Nomor Surat Pesanan"];

                fetchSelect(
                    "/sp-order/SP_4384_CIR_Check_GudangOrder1~7/" +
                        txtIdOrder.value.trim(),
                    (data2) => {
                        txtKodeAsal.value = data2[0]["Kode_barang_asal"];
                        txtKodeTujuan.value = data2[0]["kode_barang_tujuan"];
                        txtTypeAsal.value = data2[0]["Nama_brg_asal"];
                        txtTypeTujuan.value = data2[0]["Nama_brg_tujuan"];
                        txtTypeTujuan.title = data2[0]["Nama_brg_tujuan"];
                        txtRollOrder.value = data2[0]["Roll_order"];
                        txtMeterOrder.value = data2[0]["Meter_order"];

                        if (data2[0]["Status"] == "1") {
                            chkStatusLunas.checked = true;
                        } else chkStatusLunas.checked = false;

                        btnProses.focus();
                    }
                );
            };

            $("#staticBackdrop").modal("show");
        });
    }
});

btnKodeTujuan.addEventListener("click", function () {
    fetchSelect("/sp-order/GET_PESANAN_DAN_BARANG_TUJUAN", (data) => {
        var desiredKeyOrder = ["Nama_Barang", "Id_Sp", "Kode_Barang"];
        var rearrangedData = data.map(function (item) {
            return reorderKeys(item, desiredKeyOrder);
        });
        MD_tableData = rearrangedData;
        MD_titleLabel.textContent = "Daftar No. SP dan Barang Tujuan";

        MD_tableHeaders = ["Nama Barang", "No. Surat Pesanan"];
        MD_columnSizes = [200, 100];

        MD_postAction = () => {
            let selectedData = MD_tableData.find(
                (sp) => sp.Id_Sp === MD_selectedData["No. Surat Pesanan"]
            );

            txtNoSP.value = selectedData["Id_Sp"];
            txtTypeTujuan.value = selectedData["Nama_Barang"];
            txtTypeTujuan.title = selectedData["Nama_Barang"];
            txtKodeTujuan.value = selectedData["Kode_Barang"];

            btnNoSP.disabled = false;
            txtRollOrder.disabled = false;
            txtMeterOrder.disabled = false;
            txtRollOrder.focus();
        };

        $("#staticBackdrop").modal("show");
    });
});

btnNoSP.addEventListener("click", function () {
    fetchSelect(
        "/sp-order/SP_4384_CIR_Check_GudangOrder1~9/" + txtKodeTujuan.value,
        (data) => {
            var desiredKeyOrder = ["Nama_Barang", "Id_sp"];
            var rearrangedData = data.map(function (item) {
                return reorderKeys(item, desiredKeyOrder);
            });
            MD_tableData = rearrangedData;

            MD_tableHeaders = ["Nama Barang", "Id Surat Pesanan"];
            MD_columnSizes = [200, 100];

            MD_postAction = () => {
                txtTypeTujuan.value = MD_selectedData["Nama Barang"];
                txtTypeTujuan.title = MD_selectedData["Nama Barang"];
                txtNoSP.value = MD_selectedData["Id Surat Pesanan"];

                txtRollOrder.disabled = false;
                txtMeterOrder.disabled = false;
                txtRollOrder.focus();
            };

            $("#staticBackdrop").modal("show");
        }
    );
});

btnIsi.addEventListener("click", function () {
    hidProses.value = 3;
    toggleButtons();
    btnIdOrder.focus();
});

btnKoreksi.addEventListener("click", function () {
    hidProses.value = 4;
    toggleButtons();
    btnIdOrder.focus();
});

btnHapus.addEventListener("click", function () {
    hidProses.value = 5;
    toggleButtons();
    btnIdOrder.focus();
});

btnProses.addEventListener("click", function (event) {
    if (txtTypeAsal.value != "" || txtTypeTujuan.value != "") {
        if (
            hidProses.value == "4" &&
            txtRollProduksi.value == "0" &&
            txtMeterProduksi.value == "0"
        ) {
            chkStatusLunas.checked = false;
            showToast("Roll Produksi dan Meter Produksi tidak boleh kosong.");
            event.preventDefault();
            return;
        }

        var encodeSp = txtNoSP.value.trim().replace("/", "|");
        hidData.value = "";

        switch (hidProses.value) {
            case "4":
                let status = 0;
                if (chkStatusLunas.checked) status = 1;

                hidData.value =
                    txtIdOrder.value +
                    "~" +
                    encodeSp +
                    "~" +
                    txtRollOrder.value +
                    "~" +
                    txtMeterOrder.value +
                    "~" +
                    txtRollProduksi.value +
                    "~" +
                    txtMeterProduksi.value +
                    "~" +
                    status +
                    "~" +
                    getCurrentDateTime() +
                    "~";

                if (status == "1") hidData.value += getCurrentDateTime();
                break;

            case "5":
                hidData.value = txtIdOrder.value + "~" + encodeSp;
                break;

            default:
                hidData.value =
                    txtIdOrder.value +
                    "~" +
                    encodeSp +
                    "~" +
                    txtKodeAsal.value.trim() +
                    "~" +
                    txtKodeTujuan.value.trim() +
                    "~" +
                    txtRollOrder.value +
                    "~" +
                    txtMeterOrder.value +
                    "~" +
                    txtRollProduksi.value +
                    "~" +
                    txtMeterProduksi.value +
                    "~" +
                    getCurrentDateTime() +
                    "~TROPODO";
                break;
        }
    } else showToast("Mohon isi form dengan benar.");
});

btnKeluar.addEventListener("click", function () {
    if (this.textContent != "Keluar") {
        clearForm();

        txtKodeAsal.disabled = true;
        txtKodeTujuan.disabled = true;
        txtRollOrder.disabled = true;
        txtMeterOrder.disabled = true;
        txtRollProduksi.disabled = true;
        txtMeterProduksi.disabled = true;
        chkStatusLunas.disabled = true;

        txtIdOrder.disabled = true;
        btnIdOrder.disabled = true;
        btnNoSP.disabled = true;
        btnKodeTujuan.disabled = true;

        btnProses.disabled = true;
        btnKeluar.textContent = "Keluar";
        btnIsi.disabled = false;
        btnHapus.disabled = false;
        btnKoreksi.disabled = false;
        btnIsi.focus();
    } else window.location.href = "/";
});

txtKodeAsal.addEventListener("change", function () {
    if (hidProses.value == "3") {
        if (txtKodeAsal.value.trim().length < 9) {
            while (txtKodeAsal.value.length < 9) {
                txtKodeAsal.value = "0" + txtKodeAsal.value;
            }
        }

        btnIdOrder.disabled = false;
        btnIdOrder.focus();
    }
});

txtRollOrder.addEventListener("change", function () {
    txtMeterOrder.disabled = false;
    txtMeterOrder.select();
});

txtMeterOrder.addEventListener("change", function () {
    if (hidProses.value == "3") {
        btnProses.focus();
    }
});

txtKodeTujuan.addEventListener("change", function () {
    if (hidProses.value == "3") {
        if (txtKodeTujuan.value.trim().length < 9) {
            while (txtKodeTujuan.value.length < 9) {
                txtKodeTujuan.value = "0" + txtKodeTujuan.value;
            }
        }

        btnNoSP.disabled = false;
        btnNoSP.focus();
    }
});

txtRollProduksi.addEventListener("change", function () {
    txtMeterProduksi.disabled = false;
    txtMeterProduksi.select();
});

txtMeterProduksi.addEventListener("change", function () {
    chkStatusLunas.disabled = false;
    chkStatusLunas.focus();
});

chkStatusLunas.addEventListener("change", function () {
    btnProses.disabled = false;
    btnProses.focus();
});

txtIdOrder.addEventListener("change", function () {
    if (this.value.trim() != "") {
        if (hidProses.value == "3") {
            fetchSelect(
                "/sp-order/SP_4384_CIR_Check_GudangOrder1~1/" +
                    txtIdOrder.value.trim() +
                    "~1",
                (data) => {
                    txtTypeAsal.value = data[0]["Nama_barang"];
                    txtTypeAsal.title = data[0]["Nama_barang"];
                    txtKodeAsal.value = data[0]["Kode_barang"];
                }
            );
        } else {
            fetchSelect(
                "/sp-order/SP_4384_CIR_Check_GudangOrder1~7/" +
                    txtIdOrder.value.trim(),
                (data) => {
                    txtNoSP.Text = data[0]["idsuratpesanan"];
                    txtIdOrder.Text = data[0]["Id_order"];
                    txtKodeAsal.Text = data[0]["Kode_barang_asal"];
                    txtKodeTujuan.Text = data[0]["Kode_barang_tujuan"];
                    txtTypeAsal.Text = data[0]["Nama_Brg_Asal"];
                    txtTypeTujuan.Text = data[0]["Nama_Brg_Tujuan"];
                    txtRollOrder.Text = data[0]["Roll_order"];
                    txtMeterOrder.Text = data[0]["Meter_order"];
                    txtRollProduksi.Text = data[0]["Roll_produksi"];
                    txtMeterProduksi.Text = data[0]["Meter_produksi"];

                    if (data[0]["Status"] == "1") {
                        chkStatusLunas.checked = true;
                    } else chkStatusLunas.checked = false;

                    if (hidProses.value == "4") {
                        txtRollOrder.disabled = false;
                        txtMeterOrder.disabled = false;
                        txtRollProduksi.disabled = false;
                        txtMeterProduksi.disabled = false;
                        chkStatusLunas.disabled = false;
                        txtIdOrder.disabled = true;
                        txtNoSP.disabled = true;
                        chkStatusLunas.disabled = false;
                    }
                }
            );
        }

        txtKodeTujuan.disabled = false;
        btnKodeTujuan.disabled = false;
        txtKodeTujuan.select();
    }
});

txtNoSP.addEventListener("change", function () {
    if (hidProses.value != "3") {
        fetchSelect(
            "/sp-order/SP_4384_CIR_Check_GudangOrder1~7/" +
                txtIdOrder.value.trim(),
            (data) => {
                txtNoSP.Text = data[0]["idsuratpesanan"];
                txtIdOrder.Text = data[0]["Id_order"];
                txtKodeAsal.Text = data[0]["Kode_barang_asal"];
                txtKodeTujuan.Text = data[0]["Kode_barang_tujuan"];
                txtTypeAsal.Text = data[0]["Nama_Brg_Asal"];
                txtTypeTujuan.Text = data[0]["Nama_Brg_Tujuan"];
                txtRollOrder.Text = data[0]["Roll_order"];
                txtMeterOrder.Text = data[0]["Meter_order"];
                txtRollProduksi.Text = data[0]["Roll_produksi"];
                txtMeterProduksi.Text = data[0]["Meter_produksi"];

                if (data[0]["Status"] == "1") {
                    chkStatusLunas.checked = true;
                } else chkStatusLunas.checked = false;

                if (hidProses.value == "4") {
                    txtRollOrder.disabled = false;
                    txtMeterOrder.disabled = false;
                    txtRollProduksi.disabled = false;
                    txtMeterProduksi.disabled = false;
                    chkStatusLunas.disabled = false;
                    txtIdOrder.disabled = true;
                    txtNoSP.disabled = true;
                    chkStatusLunas.disabled = false;
                }
            }
        );
    }

    btnKodeTujuan.disabled = false;
    btnKodeTujuan.focus();
});
//#endregion

//#region Functions
function toggleButtons() {
    btnProses.disabled = false;
    btnKeluar.disabled = false;
    btnKeluar.textContent = "Batal";
    btnIsi.disabled = true;
    btnHapus.disabled = true;
    btnKoreksi.disabled = true;

    switch (hidProses.value) {
        case "3":
            txtKodeAsal.disabled = true;
            txtKodeTujuan.disabled = true;
            txtRollOrder.disabled = true;
            txtMeterOrder.disabled = true;
            txtRollProduksi.disabled = true;
            txtMeterProduksi.disabled = true;
            chkStatusLunas.disabled = true;
            txtIdOrder.disabled = false;
            btnIdOrder.disabled = false;

            txtRollProduksi.value = "0";
            txtMeterProduksi.value = "0";
            break;

        case "4":
            txtKodeAsal.disabled = true;
            txtKodeTujuan.disabled = true;
            txtRollOrder.disabled = true;
            txtMeterOrder.disabled = true;
            txtRollProduksi.disabled = true;
            txtMeterProduksi.disabled = true;
            chkStatusLunas.disabled = false;

            btnIdOrder.disabled = false;
            btnNoSP.disabled = true;
            btnKodeTujuan.disabled = true;
            break;

        case "5":
            txtNoSP.disabled = true;
            txtKodeTujuan.disabled = true;

            txtKodeAsal.disabled = true;
            txtKodeTujuan.disabled = true;
            txtRollOrder.disabled = true;
            txtMeterOrder.disabled = true;
            txtRollProduksi.disabled = true;
            txtMeterProduksi.disabled = true;
            chkStatusLunas.disabled = true;

            btnIdOrder.disabled = false;
            btnNoSP.disabled = true;
            btnKodeTujuan.disabled = true;
            break;

        default:
            break;
    }
}

function removeDuplicateOrders(arr) {
    const seen = new Set();
    return arr.filter((order) => {
        if (seen.has(order.id_order)) {
            return false;
        } else {
            seen.add(order.id_order);
            return true;
        }
    });
}

function init() {
    prepareButtons(btnIsi, btnKoreksi, btnHapus, btnKeluar);
    btnIsi.focus();
}

$(document).ready(function () {
    init();
});
//#endregion

/**
 *
 * Catatan migrasi
 *
 * SP itu Surat Pesanan
 *
 * Mode proses ada di VB diubah menjadi berikut;
 * (agar menyesuaikan dengan kode SP)
 * proses 1 = 3
 * proses 2 = 4
 * proses 3 = 5
 *
 * TEST CASE:

Id Order
30941
30937
30940
30982
30720

Kode Barang
000071983
000072991
000069820
000044597
000078481

 *
 */
