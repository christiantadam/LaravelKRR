//#region Variables
const slcDivisi = document.getElementById("select_divisi");
const txtNoBarcode = document.getElementById("no_barcode");
const spnBarcode = document.getElementById("btn_barcode");
const hidGetFetch = document.getElementById("ambil_data_fetch");

const btnBelum = document.getElementById("btn_belum");
const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");

const listRekap = [];
/** ISI LIST REKAP
 * 0 - Tanggal
 * 1 - Type
 * 2 - Primer
 * 3 - Sekunder
 * 4 - Tritier
 * 5 - IdType
 * 6 - Pemberi
 * 7 - Divisi
 * 8 - Shift
 */

const listKirim = [];
/** ISI LIST KIRIM
 * 0 - TglMutasi
 * 1 - NamaType
 * 2 - NoBarcode
 * 3 - NamaSubKelompok
 * 4 - NamaKelompok
 * 5 - KodeBarang
 * 6 - NoIndeks
 * 7 - QtyPrimer
 * 8 - QtySekunder
 * 9 - QtyTritier
 * 10 - IdType
 * 11 - NoTempTrans
 */

const colRekap = [
    { width: "1px" }, // Tanggal
    { width: "1px" }, // Type
    { width: "1px" }, // Primer
    { width: "1px" }, // Sekunder
    { width: "1px" }, // Tritier
    { width: "1px" }, // Id Type
    { width: "1px" }, // Divisi
    { width: "1px" }, // Shift
];

const colKirim = [
    { width: "100px" }, // Tanggal
    { width: "200px" }, // Type
    { width: "125px" }, // No. Barcode
    { width: "125px" }, // Sub-kelompok
    { width: "1px" }, // Kelompok
    { width: "125px" }, // Kode Barang
    { width: "125px" }, // No. Indeks
    { width: "1px" }, // Primer
    { width: "1px" }, // Sekunder
    { width: "1px" }, // Tritier
    { width: "1px" }, // Divisi
];
//#endregion

//#region Events
slcDivisi.addEventListener("change", function () {
    if (this.selectedIndex != 0) {
        dataTidakTersimpan(() => {
            txtNoBarcode.disabled = false;
            txtNoBarcode.value = "";
            txtNoBarcode.focus();
        });
    } else {
        slcDivisi.focus();
        alert("Pilih Divisi Terlebih Dahulu!");
    }
});

txtNoBarcode.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (slcDivisi.selectedIndex == 0) {
            alert("Pilih Divisi Terlebih Dahulu!");
            this.value = "";
            slcDivisi.focus();
            return;
        }

        if (this.value.trim() != "") {
            let kode_barang = this.value.substring(this.value.length - 9);
            let no_indeks = this.value.substring(0, 9).replace(/^0+/, "");

            let found = "";
            fetchSelect(
                "warehouseTerima/SP_1273_INV_Cek_Barcode/" +
                    kode_barang +
                    "~" +
                    no_indeks +
                    "~" +
                    slcDivisi.value,
                (data) => {
                    if (data.length > 0) {
                        found = data[0].Ada;
                    }

                    if (found == 1) {
                        alert("Barcode Salah, Cek Barcode Anda");
                        txtNoBarcode.value = "";
                        txtNoBarcode.focus();
                    } else cekBarcodeDispatch(kode_barang, no_indeks);
                }
            );
        } else alert("Scan Barcode Terlebih Dahulu!");
    }
});

btnBelum.addEventListener("click", function () {
    if (slcDivisi.selectedIndex == 0) {
        alert("Pilih Dulu Divisinya");
        slcDivisi.focus();
    } else {
        hidDivisi.value = slcDivisi.value;
        // LD_formData.kode = [3, 5];
        LD_formData.title = "Daftar Barcode yang Belum Diterima";
        $("#form_lihat_data").modal("show");
    }
});

btnProses.addEventListener("click", function () {
    if (listRekap.length > 0) {
        for (let i = 0; i < listRekap.length; i++) {
            fetchSelect(
                "/warehouseTerima/SP_1273_INV_ACCGUDANG_BARCODE/" +
                    listRekap[i].Tanggal +
                    "~" +
                    listRekap[i].Shift +
                    "~" +
                    listRekap[i].Primer +
                    "~" +
                    listRekap[i].Sekunder +
                    "~" +
                    listRekap[i].Tritier +
                    "~" +
                    listRekap[i].IdType +
                    "~" +
                    listRekap[i].Pemberi +
                    "~" +
                    listRekap[i].Divisi,
                (data) => {
                    if (data.length > 0) {
                        if (data[0].NmError.trim() == "BENAR") {
                            alert("Data Sudah Selesai Diproses");
                        } else alert("Data Tidak Tersimpan, Ulangi Lagi!");
                        listRekap.length = 0;
                        clearTable_DataTable("table_rekap", colRekap.length);
                        listKirim.length = 0;
                        clearTable_DataTable("table_kirim", colKirim.length);
                        txtNoBarcode.value = "";
                        txtNoBarcode.focus();

                        dataTidakTersimpan();
                    }
                }
            );
        }
    } else alert("Masukkan Dulu No Barcode Yang Akan Diproses");
});

hidGetFetch.addEventListener("change", function () {
    let [sts, kode_barang, no_indeks] = this.value.split(",");
    if (sts == 2) {
        let sudahTembak = false;
        for (let i = 0; i < listKirim.length; i++) {
            if (listKirim[i].NoBarcode == this.value.trim()) {
                sudahTembak = true;
                break;
            }
        }

        if (!sudahTembak) {
            ambilDataBarangFetch(kode_barang, no_indeks, () => {
                spnBarcode.textContent = listKirim.length;
                txtNoBarcode.value = "";
                txtNoBarcode.focus();
            });
        } else alert("Barcode Sudah Pernah Ditembak!");
    } else if (sts == 1) {
        alert("Barcode Ini Belum Pernah Dikirimkan!");
    } else if (sts == 3) {
        alert("Barcode Sudah Pernah di ACC!");
    } else alert("Data Barcode Tidak Ditemukan!");
});
//#endregion

//#region Functions
function dataTidakTersimpan(success_action = null) {
    fetchSelect(
        "/warehouseTerima/SP_5409_INV_ListBarcodeTerimaGudang/0~2014",
        (data) => {
            if (data.length > 0) {
                window.location.href =
                    "/Extruder/WarehouseTerima/formGagalPeletan";
            } else if (success_action != null) success_action();
        }
    );
}

function cekBarcodeDispatch(kode_barang, no_indeks) {
    let dispresiasiKu = 0;
    fetchSelect(
        "/warehouseTerima/SP_5409_INV_CekBarcodeKirimGudang/" +
            kode_barang +
            "~" +
            no_indeks,
        (data) => {
            let fetchEmpty = true;
            if (data.length > 0) fetchEmpty = false;

            /**
             * Keterangan Status:
             * 1 - Belum diterima ke gudang
             * 2 - Sudah dikirim ke gudang
             * 3 - Belum dikirim
             * 4 - Data tidak ada
             */

            if (!fetchEmpty) {
                if (data.Status === null) {
                    dispresiasiKu = "kosong";
                } else dispresiasiKu = data.Status;
            }

            let statusKu = -1;
            switch (dispresiasiKu) {
                case 2:
                    statusKu = 3;
                    break;
                case 3:
                    statusKu = 2;
                    break;
                case 1:
                    statusKu = 1;
                    break;
                default:
                    statusKu = 4;
                    break;
            }

            hidData.value = [statusKu, kode_barang, no_indeks];
            hidData.dispatchEvent(new Event("change"));
        }
    );
}

function ambilDataBarangFetch(kode_barang, no_indeks) {
    let [type, id_type, pemberi] = ["", "", ""];
    let [primer, sekunder, tritier] = [0, 0, 0];
    let [tanggal, shift, divisi] = ["", "", ""];

    fetchSelect(
        "/warehouseTerima/SP_5409_INV_SimpanPenerimaanAwalGudang/" +
            kode_barang +
            "~" +
            no_indeks,
        (data) => {
            if (data.NError.trim() != "sukses") {
                alert(data.NError);
                return;
            }

            fetchSelect(
                "/warehouseTerima/SP_5409_INV_SimpanPenerimaanAwalGudang2/" +
                    kode_barang +
                    "~" +
                    no_indeks,
                (data2) => {
                    for (let i = 0; i < data2.length; i++) {
                        listKirim.push({
                            TglMutasi: dateTimeToDate(data[i].tgl_mutasi),
                            NamaType: data[i].namatype,
                            NoBarcode: txtNoBarcode.value,
                            NamaSubKelompok: data[i].namasubkelompok,
                            NamaKelompok: data[i].namakelompok,
                            KodeBarang: kode_barang,
                            NoIndeks: no_indeks,
                            QtyPrimer: data[i].qty_primer,
                            QtySekunder: data[i].qty_sekunder,
                            QtyTritier: data[i].qty,
                            IdType: data[i].idtype,
                            NoTempTrans: data[i].notemptrans,
                        });

                        type = data2[i].namatype;
                        id_type = data2[i].idtype;
                        primer = data2[i].qty_primer;
                        sekunder = data2[i].qty_sekunder;
                        tritier = data2[i].qty;
                        tanggal = dateTimeToDate(data2[i].tgl_mutasi);
                        shift = data2[i].uraiandetailtransaksi;
                        pemberi = data2[i].notemptrans;
                        divisi = data2[i].divisi;
                    }

                    if (data2.length > 0) {
                        spnBarcode.textContent = listKirim.length;
                        buatRekapFetch(
                            id_type,
                            type,
                            tanggal,
                            shift,
                            [primer, sekunder, tritier],
                            pemberi,
                            divisi
                        );
                    } else alert("Tembak Ulang Barcode");
                }
            );
        }
    );
}

function buatRekapFetch(
    id_type,
    type,
    tanggal,
    shift,
    jumlah,
    pemberi,
    divisi
) {
    let [primer, sekunder, tritier] = jumlah;
    let [primer2, sekunder2, tritier2] = [0, 0, 0];

    let [indeks, found] = [-1, false];
    for (let i = 0; i < listRekap.length; i++) {
        if (listRekap[i].IdType == id_type && listRekap[i].Tanggal == tanggal) {
            indeks = i;
            primer2 = listRekap[i].Primer;
            sekunder2 = listRekap[i].Sekunder;
            tritier2 = listRekap[i].Tritier;
            found = true;
            break;
        }
    }

    if (!found) {
        listRekap.push({
            Tanggal: tanggal,
            Type: type,
            Primer: primer,
            Sekunder: sekunder,
            Tritier: tritier,
            IdType: id_type,
            Pemberi: pemberi,
            Divisi: divisi,
            Shift: shift,
        });
    } else {
        primer2 = parseFloat(primer2) + parseFloat(primer);
        sekunder2 = parseFloat(sekunder2) + parseFloat(sekunder);
        tritier2 = parseFloat(tritier2) + parseFloat(tritier);
        listRekap[indeks].Primer = primer2;
        listRekap[indeks].Sekunder = sekunder2;
        listRekap[indeks].Tritier = tritier2;
    }

    addTable_DataTable("table_rekap", listRekap);
}
//#endregion

function init() {
    $("#table_rekap").DataTable({
        responsive: true,
        paging: false,
        scrollY: "250px",
        scrollX: "",
        dom: '<"row"<"col-sm-6"i><"col-sm-6"f>>' + '<"row"<"col-sm-12"tr>>',
        language: {
            searchPlaceholder: " Tabel rekap...",
            search: "",
        },

        initComplete: () => {
            var searchInput = $('input[type="search"]:last').addClass(
                "form-control"
            );

            searchInput.wrap('<div class="input-group"></div>');
            searchInput.before('<span class="input-group-text">Cari:</span>');
        },
    });

    $("#table_kirim").DataTable({
        responsive: true,
        paging: false,
        scrollY: "250px",
        scrollX: "1000000px",
        columns: colKirim,
        dom: '<"row"<"col-sm-6"i><"col-sm-6"f>>' + '<"row"<"col-sm-12"tr>>',
        language: {
            searchPlaceholder: " Tabel kirim...",
            search: "",
        },

        initComplete: () => {
            var searchInput = $('input[type="search"]:last').addClass(
                "form-control"
            );

            searchInput.wrap('<div class="input-group"></div>');
            searchInput.before('<span class="input-group-text">Cari:</span>');
        },
    });

    clearTable_DataTable("table_rekap", colRekap.length);
    clearTable_DataTable("table_kirim", colKirim.length);
    addOptionIfNotExists(slcDivisi, "INV", "INV | Warehouse");

    dataTidakTersimpan();
}

$(document).ready(() => init());

btnKeluar.addEventListener("click", function () {
    window.location.href = "/Extruder/WarehouseTerima";
});
