//#region Variables
const txtKodeBarang = document.getElementById("kode_barang");
//#endregion

//#region Events
txtKodeBarang.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        let [type_trans, status, divisi] = ["", "", ""];
        let [ditembak, div_tujuan, pengirim] = ["", "", ""];
        let type_trans1 = "";

        let no_indeks = txtKodeBarang.value.substring(0, 9);
        txtKodeBarang.value = txtKodeBarang.value.substring(
            txtKodeBarang.value.length - 9
        );

        fetchSelect(
            "/warehouseTerima/SP_1273_BCD_CekBarcode/" +
                txtKodeBarang.value +
                "~" +
                parseInt(no_indeks),
            (data) => {
                let fetchEmpty = true;
                if (data.length > 0) fetchEmpty = false;

                if (!fetchEmpty) {
                    type_trans = data[0].Type_Transaksi;
                    status = data[0].Status != null ? data[0].Status : "";
                    divisi = data[0].IdDivisi;
                    ditembak = data[0].Ditembak != null ? data[0].Ditembak : "";
                    pengirim =
                        data[0].NoTempTrans != null ? data[0].NoTempTrans : "";
                }

                const post_barcode_keluar = () => {
                    if (type_trans == 22 && status == "N" && ditembak == "") {
                        alert(
                            "Barcode Tidak Jadi Dibuat oleh Divisi " + divisi
                        );

                        txtKodeBarang.value = "";
                    } else if (
                        type_trans == 22 &&
                        status == "N" &&
                        ditembak == "4"
                    ) {
                        alert(
                            "Barcode Barang Setengah Jadi Sudah Diterima Gudang"
                        );

                        txtKodeBarang.value = "";
                        return;
                    } else if (
                        (type_trans == 22 &&
                            status == "1" &&
                            ditembak == "1") ||
                        (type_trans == 28 && status == "1" && ditembak == "1")
                    ) {
                        alert("Barcode Belum Dikirim Oleh Divisi " + divisi);
                        txtKodeBarang.value = "";
                        return;
                    } else if (
                        type_trans == 22 &&
                        status == "1" &&
                        ditembak == "4"
                    ) {
                        alert(
                            "Barcode Barang Setengah Jadi Dikirim Ke Kerta 2"
                        );

                        txtKodeBarang.value = "";
                        return;
                    } else if (
                        type_trans == 22 &&
                        status == "3" &&
                        ditembak == "3"
                    ) {
                        alert("Barcode Salah, Hubungi EDP");
                        txtKodeBarang.value = "";
                        return;
                    } else if (
                        (type_trans == 22 && status == "2") ||
                        (type_trans == 28 && status == "2")
                    ) {
                        fetchSelect(
                            "/warehouseTerima/SP_1273_BCD_CekKirimBarcode/" +
                                txtKodeBarang.value +
                                "~" +
                                parseInt(no_indeks),
                            (data3) => {
                                let fetchEmpty = true;
                                if (data3.length > 0) fetchEmpty = false;

                                if (!fetchEmpty) {
                                    div_tujuan = data3[0].Divisi;
                                }

                                if (ditembak == "3" && div_tujuan != "") {
                                    alert(
                                        "Barcode Dikirim ke Divisi " +
                                            div_tujuan
                                    );
                                    txtKodeBarang.value = "";
                                    return;
                                } else if (
                                    ditembak == "2" &&
                                    pengirim != "" &&
                                    div_tujuan != ""
                                ) {
                                    alert(
                                        "Barcode Sudah Discan Oleh Divisi " +
                                            div_tujuan +
                                            ", Cek Barcode di Gagal Terima"
                                    );

                                    txtKodeBarang.value = "";
                                    return;
                                } else if (
                                    ditembak == "3" &&
                                    div_tujuan == ""
                                ) {
                                    alert("Barcode Salah, Hubungi EDP");
                                    txtKodeBarang.value = "";
                                    return;
                                } else if (
                                    ditembak == "2" &&
                                    pengirim != "" &&
                                    div_tujuan == ""
                                ) {
                                    alert("Barcode Salah, Hubungi EDP");
                                    txtKodeBarang.value = "";
                                    return;
                                } else if (ditembak == "2" && pengirim == "") {
                                    alert("Barcode Dikirim Ke Gudang");
                                    txtKodeBarang.value = "";
                                    return;
                                }
                            }
                        );
                    } else if (type_trans == 23 && status == "3") {
                        alert("Barcode Sudah Diterima Oleh Divisi " + divisi);
                        txtKodeBarang.value = "";
                        return;
                    } else if (type_trans == 25 || type_trans == 27) {
                        alert("Barcode Milik Divisi " + divisi);
                        txtKodeBarang.value = "";
                        return;
                    } else if (
                        (type_trans == 26 && status == "5") ||
                        (type_trans == 29 && status == "5") ||
                        (type_trans == 26 && status == "3")
                    ) {
                        alert("Barcode Milik Divisi " + divisi);
                        txtKodeBarang.value = "";
                        return;
                    } else if (type_trans == 5 || type_trans1 == 5) {
                        alert(
                            "Barcode Sudah Dihanguskan Oleh Divisi " + divisi
                        );
                        txtKodeBarang.value = "";
                        return;
                    } else if (type_trans == 9 || type_trans1 == 9) {
                        alert("Barcode Sudah Dijual Oleh Divisi " + divisi);
                        txtKodeBarang.value = "";
                        return;
                    } else if (type_trans1 == 22 && ditembak != "4") {
                        alert(
                            "Barcode Tidak Jadi Dibuat Oleh Divisi " + divisi
                        );

                        txtKodeBarang.value = "";
                        return;
                    } else if (type_trans1 == 22 && ditembak == "4") {
                        alert(
                            "Barcode Setengah Jadi Sudah Diterima Oleh Divisi Gudang"
                        );

                        txtKodeBarang.value = "";
                        return;
                    } else if (
                        type_trans1 == 23 ||
                        type_trans1 == 25 ||
                        type_trans1 == 29
                    ) {
                        alert(
                            "Barcode Milik Divisi " +
                                divisi +
                                " Sudah Tidak Dipakai Lagi"
                        );

                        txtKodeBarang.value = "";
                        return;
                    } else if (type_trans1 == 26) {
                        alert(
                            "Barcode Sudah Dihanguskan Oleh Divisi " + divisi
                        );

                        txtKodeBarang.value = "";
                        return;
                    } else if (type_trans1 == 27) {
                        alert(
                            "Barcode Sudah Dimutasi Satu Divisi Oleh Divisi " +
                                divisi
                        );

                        txtKodeBarang.value = "";
                        return;
                    } else if (type_trans1 == 28 && status == 3) {
                        alert("Barcode Sudah Dikonversi Oleh Divisi " + divisi);
                        txtKodeBarang.value = "";
                        return;
                    } else {
                        alert("Barcode Tidak Ditemukan, Hubungi EDP");
                        txtKodeBarang.value = "";
                        return;
                    }
                };

                if (type_trans == "") {
                    status = "";
                    divisi = "";
                    ditembak = "";
                    pengirim = "";

                    fetchSelect(
                        "/warehouseTerima/SP_1273_BCD_CekBarcodeKeluar/" +
                            txtKodeBarang.value +
                            "~" +
                            parseInt(no_indeks),
                        (data2) => {
                            let fetchEmpty = true;
                            if (data2.length > 0) fetchEmpty = false;

                            if (!fetchEmpty) {
                                type_trans1 = data2[0].Type_Transaksi;
                                status =
                                    data2[0].Status != null
                                        ? data2[0].Status
                                        : "";
                                divisi = data2[0].IdDivisi;
                                ditembak =
                                    data2[0].Ditembak != null
                                        ? data2[0].Ditembak
                                        : "";
                                pengirim =
                                    data2[0].NoTempTrans != null
                                        ? data2[0].NoTempTrans
                                        : "";
                            }

                            post_barcode_keluar();
                        }
                    );
                } else post_barcode_keluar();
            }
        );
    }
});
//#endregion

//#region Functions
//#endregion

function init() {}

$(document).ready(() => init());
