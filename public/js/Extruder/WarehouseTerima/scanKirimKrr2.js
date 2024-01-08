//#region Variables
const slcDivisi = document.getElementById("select_divisi");
const slcObjek = document.getElementById("select_objek");
const txtNoBarcode = document.getElementById("no_barcode");
const spnBarcode = document.getElementById("btn_barcode");
const hidData = document.getElementById("hidden_ku");

const divTujuan = document.getElementById("bagian_tujuan");
const rdoNganjuk = document.getElementById("radio_nganjuk"); // Kerto
const rdoMjs = document.getElementById("radio_mojosari"); // Mojosari
const rdoBrebek = document.getElementById("radio_brebek"); // Mojo

const btnLihat = document.getElementById("btn_lihat");
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
 * 6 - Divisi
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
 * 10 - IdDivisi
 */

const colRekap = [
    { width: "1px" }, // Tanggal
    { width: "1px" }, // Type
    { width: "1px" }, // Primer
    { width: "1px" }, // Sekunder
    { width: "1px" }, // Tritier
    { width: "1px" }, // Id Type
    { width: "1px" }, // Divisi
];

const colKirim = [
    { width: "1px" }, // Tanggal
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

var noUrut = 0;
var refetchObjek = false;
//#endregion

//#region Events
slcDivisi.addEventListener("change", function () {
    if (this.value == "JBB") {
        addOptionIfNotExists(slcObjek, "078", "078 | Barang Dalam Proses");

        fetchSelect(
            "/warehouseTerima/SP_1273_INV_ambil_counter_sj_krr2/6",
            (data) => {
                noUrut = parseFloat(data[0].IdJumboKRR1) + 1;
                txtNoBarcode.focus();
            }
        );
    } else if (this.value == "ABM") {
        addOptionIfNotExists(slcObjek, "162", "162 | Hasil Setengah Jadi");

        fetchSelect(
            "/warehouseTerima/SP_1273_INV_ambil_counter_sj_krr2/3",
            (data) => {
                noUrut = parseFloat(data[0].IdWovenKRR1) + 1;
                txtNoBarcode.focus();
            }
        );
    } else if (this.value == "ADS") {
        addOptionIfNotExists(slcObjek, "192", "192 | Hasil Setengah Jadi");

        fetchSelect(
            "/warehouseTerima/SP_1273_INV_ambil_counter_sj_krr2/12",
            (data) => {
                noUrut = parseFloat(data[0].IdADSKRR1) + 1;
                txtNoBarcode.focus();
            }
        );
    } else if (this.value == "INV") {
        addOptionIfNotExists(
            slcObjek,
            "107",
            "107 | Gudang produksi - Barang Jadi"
        );

        fetchSelect(
            "/warehouseTerima/SP_1273_INV_ambil_counter_sj_krr2/15",
            (data) => {
                noUrut = parseFloat(data[0].IdINVKRR1) + 1;
                txtNoBarcode.focus();
            }
        );
    } else {
        slcObjek.selectedIndex = 0;
        slcObjek.disabled = false;
        slcObjek.focus();
    }

    if (slcObjek.value == "162" || slcObjek.value == "192") {
        divTujuan.classList.remove("hidden");
        rdoBrebek.classList.remove("hidden");
        rdoNganjuk.classList.remove("hidden");
        if (slcObjek.value == "192") {
            rdoMjs.classList.remove("hidden");
        } else rdoMjs.classList.add("hidden");
    } else divTujuan.classList.add("hidden");

    refetchObjek = true;
});

slcObjek.addEventListener("keydown", function (event) {
    if (event.key == "Enter" && refetchObjek) {
        refetchObjek = false;
        clearOptions(this);
        const errorOption = addLoadingOption(this);
        const optionKeys = {
            valueKey: "IdObjek",
            textKey: "NamaObjek",
        };

        fetchSelect(
            "/warehouseTerima/SP_1003_INV_UserObjek_Diminta/" + slcDivisi.value,
            (data) => {
                if (data.length > 0) {
                    addOptions(this, data, optionKeys);
                    this.removeChild(errorOption);

                    if (slcDivisi.value == "JBB") {
                        addOptionIfNotExists(
                            slcObjek,
                            "078",
                            "078 | Barang Dalam Proses"
                        );
                    } else if (slcDivisi.value == "ABM") {
                        addOptionIfNotExists(
                            slcObjek,
                            "162",
                            "162 | Hasil Setengah Jadi"
                        );
                    } else if (slcDivisi.value == "ADS") {
                        addOptionIfNotExists(
                            slcObjek,
                            "192",
                            "192 | Hasil Setengah Jadi"
                        );
                    } else if (slcDivisi.value == "INV") {
                        addOptionIfNotExists(
                            slcObjek,
                            "107",
                            "107 | Gudang produksi - Barang Jadi"
                        );
                    }
                } else refetchObjek = true;
            },
            errorOption
        );
    }
});

slcObjek.addEventListener("mousedown", function () {
    if (refetchObjek) {
        refetchObjek = false;
        clearOptions(this);
        const errorOption = addLoadingOption(this);
        const optionKeys = {
            valueKey: "IdObjek",
            textKey: "NamaObjek",
        };

        fetchSelect(
            "/warehouseTerima/SP_1003_INV_UserObjek_Diminta/" + slcDivisi.value,
            (data) => {
                if (data.length > 0) {
                    addOptions(this, data, optionKeys);
                    this.removeChild(errorOption);

                    if (slcDivisi.value == "JBB") {
                        addOptionIfNotExists(
                            slcObjek,
                            "078",
                            "078 | Barang Dalam Proses"
                        );
                    } else if (slcDivisi.value == "ABM") {
                        addOptionIfNotExists(
                            slcObjek,
                            "162",
                            "162 | Hasil Setengah Jadi"
                        );
                    } else if (slcDivisi.value == "ADS") {
                        addOptionIfNotExists(
                            slcObjek,
                            "192",
                            "192 | Hasil Setengah Jadi"
                        );
                    } else if (slcDivisi.value == "INV") {
                        addOptionIfNotExists(
                            slcObjek,
                            "107",
                            "107 | Gudang produksi - Barang Jadi"
                        );
                    }
                } else refetchObjek = true;
            },
            errorOption
        );
    }
});

slcObjek.addEventListener("change", function () {
    if (slcObjek.value == "162" || slcObjek.value == "192") {
        divTujuan.classList.remove("hidden");
        rdoBrebek.classList.remove("hidden");
        rdoNganjuk.classList.remove("hidden");
        if (slcObjek.value == "192") {
            rdoMjs.classList.remove("hidden");
        } else rdoMjs.classList.add("hidden");
    } else divTujuan.classList.add("hidden");

    txtNoBarcode.value = "";
    txtNoBarcode.focus();

    if (slcObjek.value == "078") {
        fetchSelect(
            "/warehouseTerima/SP_1273_INV_ambil_counter_sj_krr2/6",
            (data) => {
                if (data.length > 0) {
                    noUrut = data[0].IdJumboKRR1;
                } else noUrut = 0;
            }
        );
    } else if (slcObjek.value == "162") {
        fetchSelect(
            "/warehouseTerima/SP_1273_INV_ambil_counter_sj_krr2/3",
            (data) => {
                if (data.length > 0) {
                    noUrut = parseFloat(data[0].IdWovenKRR1) + 1;
                } else noUrut = 1;

                txtNoBarcode.focus();
            }
        );
    } else if (slcObjek.value == "022") {
        fetchSelect(
            "/warehouseTerima/SP_1273_INV_ambil_counter_sj_krr2/18",
            (data) => {
                if (data.length > 0) {
                    noUrut = parseFloat(data[0].IdGWovenKRR1) + 1;
                } else noUrut = 1;

                txtNoBarcode.focus();
            }
        );
    } else if (slcObjek.value == "192") {
        fetchSelect(
            "/warehouseTerima/SP_1273_INV_ambil_counter_sj_krr2/12",
            (data) => {
                if (data.length > 0) {
                    noUrut = parseFloat(data[0].IdADSKRR1) + 1;
                } else noUrut = 1;

                txtNoBarcode.focus();
            }
        );
    } else if (slcObjek.value == "173") {
        fetchSelect(
            "/warehouseTerima/SP_1273_INV_ambil_counter_sj_krr2/24",
            (data) => {
                if (data.length > 0) {
                    noUrut = parseFloat(data[0].IdGADStarKRR1) + 1;
                } else noUrut = 1;

                txtNoBarcode.focus();
            }
        );
    } else if (slcDivisi.value == "INV") {
        fetchSelect(
            "/warehouseTerima/SP_1273_INV_ambil_counter_sj_krr2/15",
            (data) => {
                addOptionIfNotExists(slcObjek, 107);
                if (data.length > 0) {
                    noUrut = parseFloat(data[0].IdADSKRR1) + 1;
                } else noUrut = 1;

                txtNoBarcode.focus();
            }
        );
    }
});

txtNoBarcode.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (slcObjek.selectedIndex == 0) {
            alert("Pilih Dulu Objeknya");
            txtNoBarcode.value = "";
            slcObjek.focus();
            return;
        }

        if (slcObjek.value == "162") {
            if (!rdoBrebek.checked && !rdoNganjuk.checked) {
                alert("Pilih Tujuan Pengiriman Terlebih Dahulu !");
                txtNoBarcode.value = "";
                return;
            }
        } else if (slcObjek.value == "192") {
            if (!rdoBrebek.checked && !rdoNganjuk.checked && !rdoMjs.checked) {
                alert("Pilih Tujuan Pengiriman Terlebih Dahulu !");
                txtNoBarcode.value = "";
                return;
            }
        }

        if (this.value.trim() != "") {
            let kode_barang = this.value.substring(this.value.length - 9);
            cekDataBarcodeFetch(kode_barang, () => {
                let sudahTembak = false;
                for (let i = 0; i < listKirim.length; i++) {
                    if (listKirim[i].NoBarcode == this.value.trim()) {
                        sudahTembak = true;
                        break;
                    }
                }

                if (!sudahTembak) {
                    ambilDataBarangFetch(kode_barang, no_indeks);
                } else alert("Barcode Sudah Pernah Ditembak!");
            });
        } else alert("Scan Barcode Terlebih Dahulu!");
    }
});

btnProses.addEventListener("click", function () {
    if (listKirim.length <= 0) {
        alert("Scan Barcode Terlebih Dahulu !!!");
        txtNoBarcode.value = "";
        txtNoBarcode.focus();
        return;
    }

    if (slcObjek.value == "162") {
        if (!rdoBrebek.checked && !rdoNganjuk.checked) {
            alert("Pilih Tujuan Pengiriman Terlebih Dahulu !");
            txtNoBarcode.value = "";
            return;
        }
    } else if (slcObjek.value == "192") {
        if (!rdoBrebek.checked && !rdoNganjuk.checked && !rdoMjs.checked) {
            alert("Pilih Tujuan Pengiriman Terlebih Dahulu !");
            txtNoBarcode.value = "";
            return;
        }
    }

    for (let i = 0; i < listKirim.length; i++) {
        let no_barcode = listKirim[i].NoBarcode;
        let no_indeks = no_barcode.substring(0, 9).replace(/^0+/, "");
        let kode_barang = no_barcode.substring(no_barcode.length - 9);
        let divisi = listKirim[i].IdDivisi.trim();

        if (divisi === "ABM") {
            if (slcObjek.value === "162") {
                if (rdoBrebek.checked) {
                    noUrut = ("0000000" + noUrut).slice(-7);
                } else if (rdoNganjuk.checked) {
                    noUrut = "WN" + ("0000000" + noUrut).slice(-5);
                }
            } else if (slcObjek.value === "022") {
                noUrut = "GW" + ("0000000" + noUrut).slice(-5);
            }
        } else if (divisi === "JBB") {
            if (txtIdObjek.value === "078") {
                noUrut = "J" + ("0000000" + noUrut).slice(-6);
            } else if (txtIdObjek.value === "042")
                noUrut = "GJ" + ("0000000" + noUrut).slice(-5);
        } else if (divisi === "ADS") {
            if (txtIdObjek.value === "192") {
                if (rdoMojo.checked) {
                    noUrut = "A" + ("0000000" + noUrut).slice(-6);
                } else if (rdoKerto.checked) {
                    noUrut = "AN" + ("0000000" + noUrut).slice(-5);
                } else if (rdoMojosari.checked)
                    noUrut = "AM" + ("0000000" + noUrut).slice(-5);
            } else if (txtIdObjek.value === "173")
                noUrut = "GA" + ("0000000" + noUrut).slice(-5);
        } else if (divisi === "INV")
            noUrut = "R" + ("0000000" + noUrut).slice(-6);

        kirimGudangFetch(kode_barang, no_indeks, divisi, () => {
            alert("Data Sudah Selesai Diproses");
            listKirim.length = 0;
            clearTable_DataTable("table_kirim", colKirim.length);
            listRekap.length = 0;
            clearTable_DataTable("table_rekap", colRekap.length);

            txtNoBarcode.focus();
            txtNoBarcode.select();
        });
    }
});

btnLihat.addEventListener("click", function () {
    if (slcObjek.selectedIndex == 0 || slcDivisi.selectedIndex == 0) {
        alert("Pilih Dulu Divisi dan Objeknya");

        if (slcDivisi.selectedIndex == 0) {
            slcDivisi.focus();
        } else slcObjek.focus();
        return;
    }

    hidDivisi.value = slcObjek.value;
    LD_formData.kode = [11, 15];
    LD_formData.title = "Lihat Data Kerta 2";
    $("#form_lihat_data").modal("show");
});

rdoBrebek.addEventListener("change", function () {
    if (this.checked) {
        fetchSelect(
            "/warehouseTerima/SP_1273_INV_ambil_counter_sj_krr2/3",
            (data) => {
                if (data.length > 0) {
                    noUrut = parseFloat(data[0].IdWovenKRR1) + 1;
                } else noUrut = 1;

                txtNoBarcode.value = "";
                txtNoBarcode.focus();
            }
        );
    }
});

rdoNganjuk.addEventListener("change", function () {
    if (this.checked) {
        fetchSelect(
            "/warehouseTerima/SP_1273_INV_ambil_counter_sj_krr2/30",
            (data) => {
                if (data.length > 0) {
                    noUrut = parseFloat(data[0].IdSJWovenNganjuk) + 1;
                } else noUrut = 1;

                txtNoBarcode.value = "";
                txtNoBarcode.focus();
            }
        );
    }
});
//#endregion

//#region Functions
function ambilDataBarangFetch(kode_barang, no_indeks, post_action = null) {
    let [type, id_type, y_idtrans] = ["", "", ""];
    let [primer, sekunder, tritier] = [0, 0, 0];
    let [tanggal, divisi] = ["", ""];
    let sp_str = "";

    if (
        slcObjek.value != "022" &&
        slcObjek.value != "042" &&
        slcObjek.value != "173"
    ) {
        sp_str = "SP_1273_INV_Cek_KirimKeKRR2";
    } else sp_str = "SP_1273_INV_CekGelondongan_KirimKeKRR2";

    fetchSelect(
        "/warehouseTerima/" +
            sp_str +
            "/" +
            kode_barang +
            "~" +
            no_indeks +
            "~" +
            slcDivisi.value,
        (data) => {
            for (let i = 0; i < data.length; i++) {
                listKirim.push({
                    TglMutasi: dateTimeToDate(data[0].Tgl_mutasi),
                    NamaType: data[0].NamaType,
                    NoBarcode: txtNoBarcode.value,
                    NamaSubKelompok: data[0].NamaSubKelompok,
                    NamaKelompok: data[0].NamaKelompok,
                    KodeBarang: kode_barang,
                    NoIndeks: no_indeks,
                    QtyPrimer: data[0].JumlahPemasukanPrimer,
                    QtySekunder: data[0].JumlahPemasukanSekunder,
                    QtyTritier: data[0].JumlahPemasukanTritier,
                    IdDivisi: data[0].iddivisi_objek,
                });

                y_idtrans = data[0].y_idtrans.trim();
                type = data[0].NamaType;
                id_type = data[0].Id_Type_Tujuan;
                primer = data[0].JumlahPemasukanPrimer;
                sekunder = data[0].JumlahPemasukanSekunder;
                tritier = data[0].JumlahPemasukanTritier;
                tanggal = dateTimeToDate(data[0].Tgl_mutasi);
                divisi = data[0].iddivisi_objek;

                if (y_idtrans == "") {
                    alert("Data Tidak Ditemukan, Cek dulu Barcode Anda");
                    txtNoBarcode.value = "";
                    txtNoBarcode.focus();
                    return;
                }

                if (parseFloat(sekunder) == 0 || parseFloat(tritier) == 0) {
                    alert("Scan Barcode Kembali");
                    txtNoBarcode.value = "";
                    txtNoBarcode.focus();
                    return;
                }

                buatRekapFetch(
                    id_type,
                    type,
                    tanggal,
                    [primer, sekunder, tritier],
                    divisi
                );
            }

            addTable_DataTable("table_kirim", listKirim, colKirim);
            if (post_action != null) post_action();
        }
    );
}

function buatRekapFetch(id_type, type, tanggal, jumlah, divisi) {
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
            Divisi: divisi,
        });

        addTable_DataTable("table_rekap", listRekap);
    } else {
        primer2 = parseFloat(primer2) + parseFloat(primer);
        sekunder2 = parseFloat(sekunder2) + parseFloat(sekunder);
        tritier2 = parseFloat(tritier2) + parseFloat(tritier);
        listRekap[indeks].Primer = primer2;
        listRekap[indeks].Sekunder = sekunder2;
        listRekap[indeks].Tritier = tritier2;
    }
}

function cekDataBarcodeFetch(kode_barang, post_action = null) {
    fetchSelect(
        "/warehouseTerima/SP_1273_INV_CekBarangSetJadi_TidakKirim/" +
            kode_barang,
        (data) => {
            id_type = data[0].IdType;
            nama_type = data[0].NamaType;

            if (id_type != "") {
                alert("Barang " + nama_type + " Tidak Boleh Dikirim");
                txtNoBarcode.value = "";
                txtNoBarcode.focus();
            } else if (post_action != null) post_action();
        }
    );
}

function kirimGudangFetch(kode_barang, no_indeks, divisi, post_action = null) {
    // Ambil jam server
    fetchSelect("/warehouseTerima/SP_JAM_SERVER/_", (data) => {
        let fetchEmpty = true;
        if (data.length > 0) fetchEmpty = false;

        let jam_server = "_";
        if (!fetchEmpty) {
            jam_server = new Date(data[0].jam_server);
            const batas_awal = new Date().setHours(0, 0, 0, 0);
            const batas_akhir = new Date().setHours(7, 0, 0, 0);
            let status = -1;
            if (jam_server >= batas_awal && jam_server <= batas_akhir) {
                status = 1;
            } else status = 0;

            fetchSelect(
                "/warehouseTerima/SP_1273_INV_SimpanPermohonanKirimKerta2/" +
                    kode_barang +
                    "~" +
                    no_indeks +
                    "~" +
                    status +
                    "~" +
                    divisi,
                (data) => {
                    if (data != 1) {
                        let barcode =
                            no_indeks.toString().padStart(9, "0") +
                            "-" +
                            kode_barang;
                        alert(
                            "Barcode no. " +
                                barcode +
                                " tidak dapat dikirimkan, karena " +
                                data.pesan
                        );
                    } else if (post_action != null) post_action();
                }
            );
        }
    });
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
}

$(document).ready(() => init());

btnKeluar.addEventListener("click", function () {
    window.location.href = "/Extruder/WarehouseTerima";
});
