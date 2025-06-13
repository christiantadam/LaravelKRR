//#region Variables
const dateInput = document.getElementById("tanggal");

const hidInventory = document.getElementById("hidden_inv");
const hidExtruder = document.getElementById("hidden_ext");

const txtShift = document.getElementById("shift");
const timeAwal = document.getElementById("shift_awal");
const timeAkhir = document.getElementById("shift_akhir");
const timeMulai = document.getElementById("waktu_mulai");
const timeSelesai = document.getElementById("waktu_selesai");

const txtIdMesin = document.getElementById("id_mesin");
const txtNamaMesin = document.getElementById("nama_mesin");
const txtUkuran = document.getElementById("ukuran");
const txtDenier = document.getElementById("denier");
const txtWarna = document.getElementById("warna");
const txtLot = document.getElementById("lot");
const txtNoUrut = document.getElementById("no_urut");
const txtIdOrder = document.getElementById("id_order");
const txtNamaOrder = document.getElementById("nama_order");
const txtIdKomposisi = document.getElementById("id_komposisi");
const txtNamaKomposisi = document.getElementById("nama_komposisi");
const txtBahanTerpakai = document.getElementById("total_bahan_terpakai");
const txtHasilTimbang = document.getElementById("hasil_timbang");
const txtAfalan = document.getElementById("afalan");

const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");

const listOfInputTxt = document.querySelectorAll("input[type='text']");
const listOfInputTime = document.querySelectorAll("input[type='time']");

const listKonversi = [];
const listHasil = [];
const listTmpTrans = [];
const listTmpExt = [];
const listHutangExt = [];

const tableHasilCol = [
    { width: "300px" },
    { width: "125px" },
    { width: "125px" },
    { width: "125px" },
    { width: "125px" },
    { width: "125px" },
    { width: "125px" },
];

var konversiPil = -1;
//#endregion

//#region Events
btnProses.addEventListener("click", function () {
    prosesExtruder();
    prosesInventory();

    console.log("PROSES SEDANG BERJALAN!");
});

btnKeluar.addEventListener("click", function () {
    window.location.href = "/Extruder/ExtruderNet";
});

hidExtruder.addEventListener("change", function () {
    console.log("Extruder: " + this.value);
    console.log("Inventory: " + hidInventory.value.split("!")[0]);

    if (this.value.split("!")[0] == "Proses Extruder Berhasil") {
        if (hidInventory.value.split("!")[0] == "Proses Inventory Berhasil") {
            alert("Data berhasil tersimpan!");

            clearForm();
            daftarKonversiBelumACC();

            console.log("PROSES BERHASIL KAWAN!");
        } else {
            console.log("PROSES INVENTORY BELUM SELESAI KAWAN!");
        }
    }
});

hidInventory.addEventListener("change", function () {
    console.log("Inventory: " + this.value);
    console.log("Extruder: " + hidExtruder.value);

    if (this.value.split("!")[0] == "Proses Inventory Berhasil") {
        if (hidExtruder.value.split("!")[0] == "Proses Extruder Berhasil") {
            alert("Data berhasil tersimpan!");

            clearForm();
            daftarKonversiBelumACC();

            console.log("PORSES BERHASIL KAWAN!");
        } else {
            console.log("PROSES EXTRUDER BELUM SELESAI KAWAN!");
        }
    }
});
//#endregion

//#region Functions
function clearForm(emptyAll = true) {
    listOfInputTxt.forEach((input) => (input.value = ""));
    listOfInputTime.forEach((input) => (input.value = "00:00"));
    dateInput.value = getCurrentDate();

    listHasil.length = 0;
    clearTable_DataTable("table_hasil", tableHasilCol.length);

    if (emptyAll) {
        listKonversi.length = 0;
        clearTable_DataTable("table_konversi", 2);
    }
}

function daftarKonversiBelumACC() {
    listKonversi.length = 0;
    clearTable_DataTable("table_konversi", 2, "Memuat data...");

    // SP_5298_EXT_LIST_KONV_BLM_ACC
    fetchSelect("/Konversi/getListKonvBlmAcc/EXT", (data) => {
        if (data.length == 0) {
            clearTable_DataTable(
                "table_konversi",
                2,
                "Data konversi tidak ditemukan."
            );
        } else {
            for (let i = 0; i < data.length; i++) {
                listKonversi.push({
                    IdKonversi: data[i].IdKonversi,
                    IdDivisi: data[i].IdDivisi, // subitem 1
                    NamaDivisi: data[i].NamaDivisi, // subitem 2
                    Tanggal: data[i].Tanggal, // subitem 3
                    Shift: data[i].Shift, // subitem 4
                    AwalShift: data[i].AwalShift, // subitem 5
                    AkhirShift: data[i].AkhirShift, // subitem 6
                    IdMesin: data[i].IdMesin, // subitem 7
                    TypeMesin: data[i].TypeMesin, // subitem 8
                    Ukuran: data[i].Ukuran, // subitem 9
                    Denier: data[i].Denier, // subitem 10
                    Warna: data[i].Warna, // subitem 11
                    LotNumber: data[i].LotNumber, // subitem 12
                    IdOrder: data[i].IdOrder, // subitem 13
                    Identifikasi: data[i].Identifikasi, // subitem 14
                    IdKomposisi: data[i].IdKomposisi, // subitem 15
                    NamaKomposisi: data[i].NamaKomposisi, // subitem 16
                    JamMulai: data[i].JamMulai, // subitem 17
                    JamSelesai: data[i].JamSelesai, // subitem 18
                    NoUrut: data[i].nourutorderext, // subitem 19
                });
            }

            addTable_DataTable(
                "table_konversi",
                listKonversi.map((item, index) => {
                    return {
                        IdKonversi: `<input class="form-check-input" type="checkbox" value="${index}" name="checkbox_konversi"> ${item.IdKonversi}`,
                        NamaKomposisi: item.NamaKomposisi,
                    };
                }),
                null,
                null,
                "450px"
            );

            const checkboxes = document.querySelectorAll(
                'input[name="checkbox_konversi"]'
            );

            checkboxes.forEach(function (checkbox) {
                checkbox.addEventListener("change", function () {
                    clearCheckedBoxes(checkboxes, checkbox);
                    if (checkbox.checked) {
                        konversiPil = checkbox.value;
                        listHasil.length = 0;
                        clearTable_DataTable(
                            "table_hasil",
                            tableHasilCol.length,
                            "Memuat data..."
                        );

                        tampilRincianKonversi(
                            konversiPil,
                            listKonversi[konversiPil].IdKonversi
                        );
                    } else {
                        clearForm(false);
                    }
                });
            });
        }
    });
}

function tampilRincianKonversi(i, id_konversi) {
    dateInput.value = dateTimeToDate(listKonversi[i].Tanggal);
    txtShift.value = listKonversi[i].Shift;
    timeAwal.value = dateTimetoTime(listKonversi[i].AwalShift);
    timeAkhir.value = dateTimetoTime(listKonversi[i].AkhirShift);
    txtIdMesin.value = listKonversi[i].IdMesin;
    txtNamaMesin.value = listKonversi[i].TypeMesin;
    txtUkuran.value = listKonversi[i].Ukuran;
    txtDenier.value = listKonversi[i].Denier;
    txtWarna.value = listKonversi[i].Warna;
    txtLot.value = listKonversi[i].LotNumber;
    txtIdOrder.value = listKonversi[i].IdOrder;
    txtNamaOrder.value = listKonversi[i].Identifikasi;
    txtIdKomposisi.value = listKonversi[i].IdKomposisi;
    txtNamaKomposisi.value = listKonversi[i].NamaKomposisi;
    timeMulai.value = dateTimetoTime(listKonversi[i].JamMulai);
    timeAkhir.value = dateTimetoTime(listKonversi[i].JamSelesai);
    txtNoUrut.value = listKonversi[i].NoUrut;

    tampilDetailKonversi(id_konversi);
}

function tampilDetailKonversi(id_konversi) {
    // SP_5298_EXT_LIST_KONV_DETAIL_1
    fetchSelect("/Konversi/getListKonvDetail/" + id_konversi, (data) => {
        if (data.length == 0) {
            clearTable_DataTable(
                "table_hasil",
                tableHasilCol.length,
                `Data untuk Konversi <b>${id_konversi}</b> tidak ditemukan.`
            );
        } else {
            for (let i = 0; i < data.length; i++) {
                listHasil.push({
                    Type: data[i].Type,
                    IdType: data[i].IdType, // subitem 1
                    JumlahPrimer: data[i].JumlahPrimer, // subitem 2
                    SatuanPrimer: data[i].SatuanPrimer, // subitem 3
                    JumlahSekunder: data[i].JumlahSekunder, // subitem 4
                    SatuanSekunder: data[i].SatuanSekunder, // subitem 5
                    JumlahTritier: data[i].JumlahTritier, // subitem 6
                    SatuanTritier: data[i].SatuanTritier, // subitem 7
                    Presentase: data[i].Presentase, // subitem 8
                    StatusType: data[i].StatusType, // subitem 9
                });
            }

            addTable_DataTable("table_hasil", listHasil, tableHasilCol);
            hitungJumlahBahanHasil();
        }
    });
}

function hitungJumlahBahanHasil() {
    let jum_bahan = 0;
    let jum_hasil = 0;
    let jum_afalan = 0;

    for (let i = 0; i < listHasil.length; i++) {
        if (
            listHasil[i].StatusType == "BB" ||
            listHasil[i].StatusType == "BP"
        ) {
            jum_bahan += parseFloat(listHasil[i].JumlahTritier);
        } else if (listHasil[i].StatusType == "AF") {
            jum_afalan += parseFloat(listHasil[i].JumlahTritier);
        } else if (listHasil[i].StatusType == "HP") {
            jum_hasil += parseFloat(listHasil[i].JumlahTritier);
        }
    }

    txtBahanTerpakai.value = jum_bahan != 0 ? jum_bahan : "";
    txtHasilTimbang.value = jum_hasil != 0 ? jum_hasil : "";
    txtAfalan.value = jum_afalan != 0 ? jum_afalan : "";

    toleransi(jum_bahan);
}

function toleransi(jum_bahan) {
    var range1, range2, toleransi, total_hasil_produksi;

    if (
        txtIdMesin.value === "M-003" ||
        txtIdMesin.value === "M-004" ||
        txtIdMesin.value === "M-006" ||
        txtIdMesin.value === "M-007"
    ) {
        toleransi = (8 / 100) * jum_bahan;
        range1 = jum_bahan - toleransi;
        range2 = jum_bahan + toleransi;
        total_hasil_produksi =
            parseFloat(txtHasilTimbang.value) + parseFloat(txtAfalan.value);

        if (total_hasil_produksi >= range1 && total_hasil_produksi <= range2) {
            btnProses.disabled = false;
            btnProses.focus();
        } else if (total_hasil_produksi < range1) {
            alert(
                "Total_hasil_produksi : " +
                    total_hasil_produksi +
                    " lebih kecil dari : " +
                    range1
            );
        } else if (total_hasil_produksi > range2) {
            alert(
                "Total_hasil_produksi : " +
                    total_hasil_produksi +
                    " lebih besar dari : " +
                    range2
            );
        }
    } else if (
        txtIdMesin.value === "M-001" ||
        txtIdMesin.value === "M-002" ||
        txtIdMesin.value === "M-005"
    ) {
        toleransi = (4 / 100) * jum_bahan;
        range1 = jum_bahan - toleransi;
        range2 = jum_bahan + toleransi;
        total_hasil_produksi =
            parseFloat(txtHasilTimbang.value) + parseFloat(txtAfalan.value);

        if (total_hasil_produksi >= range1 && total_hasil_produksi <= range2) {
            btnProses.disabled = false;
            btnProses.focus();
        } else if (total_hasil_produksi < range1) {
            alert(
                "Total Hasil Produksi: " +
                    total_hasil_produksi +
                    " lebih kecil dari: " +
                    range1
            );
        } else if (total_hasil_produksi > range2) {
            alert(
                "Total Hasil Produksi: " +
                    total_hasil_produksi +
                    " lebih besar dari: " +
                    range2
            );
        }
    }
}

function cekPenyesuaian() {
    let penyesuaian = false;

    for (let i = 0; i < listHasil.length; i++) {
        // SP_5298_EXT_CHECK_PENYESUAIAN_TRANSAKSI
        fetchSelect(
            "/Konversi/getPenyesuaianTrans/null/" + listHasil[i].IdType + "/06",
            (data) => {
                if (data[0].jumlah > 1) {
                    alert(
                        "Terdapat penyesuaian untuk type " + listHasil[i].Type
                    );
                    penyesuaian = true;
                }
            }
        );

        if (penyesuaian) break;
    }

    return penyesuaian;
}

function prosesInventory() {
    const getIdTrans = (jum_hutang) => {
        for (let j = 0; j < jum_hutang.length; j++) {
            if (j != 0) {
                listHutangExt.length = 0;
            }

            // SP_5298_EXT_GET_IDTRANS_INV
            fetchSelect(
                "/Konversi/getIdTransInv/" +
                    id_type[j] +
                    "/" +
                    subkel[j] +
                    "/" +
                    dateInput.value +
                    "/" +
                    shift,
                (data) => {
                    for (let k = 0; k < data.length; k++) {
                        listHutangExt.push(data[k]);

                        // SP_5298_EXT_PROSES_UPDATE_HUTANG
                        fetchStmt(
                            "/Konversi/updHutang/" +
                                id_type[j] +
                                "/tmpUser/" +
                                subkel[j] +
                                "/" +
                                listHutangExt[k].Trans,
                            () => {
                                if (listHutangExt.length - 1) {
                                    hidInventory.value = `Proses Inventory Berhasil! Ada hutang ditemukan.`;
                                    hidInventory.dispatchEvent(
                                        new Event("change")
                                    );
                                }
                            },
                            () => {
                                hidInventory.value = `Error pada "udpHutang"`;
                                hidInventory.dispatchEvent(new Event("change"));
                            }
                        );
                    }
                },
                null,
                () => {
                    hidInventory.value = `Error pada "getIdTransInv"`;
                    hidInventory.dispatchEvent(new Event("change"));
                }
            );
        }
    };

    // SP_5409_EXT_DISPLAY_TRANSAKSI_KONVERSI
    fetchSelect(
        "/Konversi/getTransaksiKonv/" + listKonversi[konversiPil].IdKonversi,
        (data) => {
            if (data.length < 1) {
                hidInventory.value = `Proses Inventory Berhasil! Tidak ada hutang ditemukan.`;
                hidInventory.dispatchEvent(new Event("change"));
            } else {
                for (let i = 0; i < data.length; i++) {
                    listTmpTrans.push(data[i]);
                }

                // Cek saldo barang
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
                                `Saldo untuk type ${listTmpTrans[i].NamaType} tidak mencukupi`
                            );
                        }
                    }
                }

                // Tentukan shift
                let shift = "";
                let waktuAwal = new Date("1970-01-01T" + timeAwal.value);
                if (waktuAwal <= new Date("1970-01-01T11:59")) {
                    shift = "P";
                } else if (waktuAwal <= new Date("1970-01-01T16:59")) {
                    shift = "S";
                } else shift = "M";

                // Cek hutang EXT
                for (let i = 0; i < listTmpTrans.length; i++) {
                    fetchSelect(
                        "/Konversi/getJumlahHutang/" +
                            listTmpTrans[i].IdType.trim() +
                            "/" +
                            listTmpTrans[i].idsubkelompok_type.trim() +
                            "/" +
                            shift +
                            "/" +
                            dateInput.value,

                        (data) => {
                            for (let j = 0; j < data.length; j++) {
                                listTmpExt.push(data[j]);
                            }

                            if (i == listTmpTrans.length - 1) {
                                hitungHutang();
                            }
                        },
                        null,
                        () => {
                            hidInventory.value = `Error pada "getJumlahHutang"`;
                            hidInventory.dispatchEvent(new Event("change"));
                        }
                    );
                }
            }
        }
    );
}

function hitungHutang() {
    let jum_hutang = 0;
    let id_type = [];
    let subkel = [];

    for (let i = 0; i < listTmpTrans.length; i++) {
        if (listTmpExt[i].TotalS == null) {
            listTmpExt[i].TotalS = 0;
        }

        if (listTmpExt[i].Total == null) {
            listTmpExt[i].Total = 0;
        }

        if (
            listTmpTrans[i].JumlahPemasukanSekunder == listTmpExt[i].TotalS &&
            listTmpTrans[i].JumlahPemasukanTritier == listTmpExt[i].Total &&
            listTmpTrans[i].JumlahPemasukanSekunder != 0 &&
            listTmpTrans[i].JumlahPemasukanTritier != 0
        ) {
            id_type.push(listTmpTrans[i].IdType);
            subkel.push(listTmpTrans[i].idsubkelompok_type);
            jum_hutang += 1;
        } else {
            console.log(listTmpExt);
            if (listTmpExt[i].TotalS !== 0 || listTmpExt[i].Total !== 0) {
                alert("Jumlah hutang tidak sesuai dengan konversi.");
                break;
            } else {
                console.log(
                    "Tidak ada hutang untuk Konversi " +
                        listKonversi[konversiPil].IdKonversi +
                        "."
                );
            }
        }
    }

    if (jum_hutang > 0) {
        showModal(
            "Lunaskan",
            "Ada hutang benang, apakah ingin dilunaskan?",
            () => {
                for (let i = 0; i < listTmpTrans.length; i++) {
                    // SP_5298_EXT_PROSES_ACC_KONVERSI
                    fetchStmt(
                        "/Konversi/updACCKonversi/" +
                            listTmpTrans[i].IdTransaksi.trim() +
                            "/" +
                            listTmpTrans[i].IdType.trim() +
                            "/tmpUser/" +
                            dateInput.value +
                            "/" +
                            listTmpTrans[i].JumlahPengeluaranPrimer.replace(
                                ".",
                                "_"
                            ) +
                            "/" +
                            listTmpTrans[i].JumlahPengeluaranSekunder.replace(
                                ".",
                                "_"
                            ) +
                            listTmpTrans[i].JumlahPemasukanTritier.replace(
                                ".",
                                "_"
                            ) +
                            "/" +
                            listTmpTrans[i].JumlahPemasukanPrimer.replace(
                                ".",
                                "_"
                            ) +
                            "/" +
                            listTmpTrans[i].JumlahPemasukanSekunder.replace(
                                ".",
                                "_"
                            ) +
                            "/" +
                            listTmpTrans[i].JumlahPemasukanTritier.replace(
                                ".",
                                "_"
                            ),
                        null,
                        () => {
                            hidInventory.value = `Error pada "updACCKonversi"`;
                            hidInventory.dispatchEvent(new Event("change"));
                        }
                    );

                    getIdTrans(jum_hutang);
                }
            },
            () => {}
        );
    } else {
        for (let i = 0; i < listTmpTrans.length; i++) {
            // SP_5298_EXT_PROSES_ACC_KONVERSI
            fetchStmt(
                "/Konversi/updACCKonversi/" +
                    listTmpTrans[i].IdTransaksi.trim() +
                    "/" +
                    listTmpTrans[i].IdType.trim() +
                    "/tmpUser/" +
                    dateInput.value +
                    "/" +
                    listTmpTrans[i].JumlahPengeluaranPrimer.replace(".", "_") +
                    "/" +
                    listTmpTrans[i].JumlahPengeluaranSekunder.replace(
                        ".",
                        "_"
                    ) +
                    "/" +
                    listTmpTrans[i].JumlahPemasukanTritier.replace(".", "_") +
                    "/" +
                    listTmpTrans[i].JumlahPemasukanPrimer.replace(".", "_") +
                    "/" +
                    listTmpTrans[i].JumlahPemasukanSekunder.replace(".", "_") +
                    "/" +
                    listTmpTrans[i].JumlahPemasukanTritier.replace(".", "_"),
                () => {
                    if (i == listTmpTrans.length - 1) {
                        hidInventory.value = `Proses Inventory Berhasil! Tidak ada hutang ditemukan.`;
                        hidInventory.dispatchEvent(new Event("change"));
                    }
                },
                () => {
                    hidInventory.value = `Error pada "updACCKonversi"`;
                    hidInventory.dispatchEvent(new Event("change"));
                }
            );
        }
    }
}

function prosesExtruder() {
    const cekSisaOrd = () => {
        fetchSelect(
            "/Konversi/getOrderStatus/" + txtIdOrder.value,
            (data) => {
                if (data.length < 1) {
                    alert(
                        `Tidak ada order ditemukan untuk data konversi ${listKonversi[konversiPil].IdKonversi}.`
                    );
                } else {
                    if (data[data.length - 1].StatusOrder == "FINISH") {
                        alert(
                            `Order dengan nomor ${
                                txtIdOrder.value
                            } sudah terpenuhi. Terdapat sisa stok sebanyak: ${
                                data[data.length - 1].JumlahProduksiTritier -
                                data[data.length - 1].JumlahTritier
                            }.`
                        );

                        console.log(
                            `Order dengan nomor ${
                                txtIdOrder.value
                            } sudah terpenuhi. Terdapat sisa stok sebanyak: ${
                                data[data.length - 1].JumlahProduksiTritier -
                                data[data.length - 1].JumlahTritier
                            }.`
                        );
                    } else {
                        alert(
                            `Order dengan nomor ${
                                txtIdOrder.value
                            } sudah terpenuhi sebanyak: ${
                                data[data.length - 1].JumlahProduksiTritier -
                                data[data.length - 1].JumlahTritier
                            }. Sisa yang belum terpenuhi sebanyak: ${
                                data[data.length - 1].JumlahTritier -
                                data[data.length - 1].JumlahProduksiTritier
                            }`
                        );
                        console.log(
                            `Order dengan nomor ${
                                txtIdOrder.value
                            } sudah terpenuhi sebanyak: ${
                                data[data.length - 1].JumlahProduksiTritier -
                                data[data.length - 1].JumlahTritier
                            }. Sisa yang belum terpenuhi sebanyak: ${
                                data[data.length - 1].JumlahTritier -
                                data[data.length - 1].JumlahProduksiTritier
                            }`
                        );
                    }
                }

                hidExtruder.value = `Proses Extruder Behasil! Lancar jaya.`;
                hidExtruder.dispatchEvent(new Event("change"));
            },
            null,
            () => {
                hidExtruder.value = `Error pada "getOrderStatus"`;
                hidExtruder.dispatchEvent(new Event("change"));
            }
        );
    };

    // Update master konversi
    fetchStmt(
        "/Konversi/updACCMasterKonv/" +
            listKonversi[konversiPil].IdKonversi +
            "/tmpUser",

        () => {
            // Update order
            for (let i = 0; i < listHasil.length; i++) {
                if (listHasil[i].StatusType == "HP") {
                    const post_action =
                        i === listHasil.length - 1
                            ? () => {
                                  fetchSelect(
                                      "/Konversi/getKeteranganSaldo/" +
                                          txtIdOrder.value +
                                          "/" +
                                          txtNoUrut.value,
                                      (data) => {
                                          console.log(data["nmerror"]);
                                          cekSisaOrd();
                                      },
                                      null,
                                      () => {
                                          hidExtruder.value = `Error pada "getKeteranganSaldo"`;
                                          hidExtruder.dispatchEvent(
                                              new Event("change")
                                          );
                                      }
                                  );
                              }
                            : () => {};

                    fetchStmt(
                        "/Konversi/updSaldoOrdDet/" +
                            txtIdOrder.value +
                            "/" +
                            txtNoUrut.value +
                            "/" +
                            listHasil[i].JumlahPrimer.replace(".", "_") +
                            "/" +
                            listHasil[i].JumlahSekunder.replace(".", "_") +
                            "/" +
                            listHasil[i].JumlahTritier.replace(".", "_"),
                        post_action
                    );
                }
            }
        },
        () => {
            hidExtruder.value = `Error pada "updACCMasterKonv"`;
            hidExtruder.dispatchEvent(new Event("change"));
        }
    );
}
//#endregion

function init() {
    $("#table_konversi").DataTable({
        responsive: true,
        paging: false,
        scrollY: "450px",
        scrollX: "",
        dom: '<"row"<"col-sm-6"i><"col-sm-6"f>>' + '<"row"<"col-sm-12"tr>>',
        language: {
            searchPlaceholder: " Tabel konversi...",
            search: "",
        },
    });

    $("#table_hasil").DataTable({
        responsive: true,
        paging: false,
        scrollY: "250px",
        scrollX: "1000000px",
        columns: tableHasilCol,
        dom: '<"row"<"col-sm-6"i><"col-sm-6"f>>' + '<"row"<"col-sm-12"tr>>',
        language: {
            searchPlaceholder: " Tabel hasil...",
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

    timeAwal.value = "00:00";
    timeAkhir.value = "00:00";
    timeMulai.value = "00:00";
    timeSelesai.value = "00:00";
    daftarKonversiBelumACC();
}

);
});
