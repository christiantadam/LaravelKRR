//#region Variables
const slcKomposisi = document.getElementById("select_id_komposisi");
const slcMesin = document.getElementById("select_mesin");
const slcObjek = document.getElementById("select_objek");
const slcKelut = document.getElementById("select_kelompok_utama");
const slcKelompok = document.getElementById("select_kelompok");
const slcSubkel = document.getElementById("select_sub_kelompok");
const slcType = document.getElementById("select_type");
const slcHP = document.getElementById("select_hp");
const slcNG = document.getElementById("select_hp_ng");
const slcAF = document.getElementById("select_afalan");

const numPrimer = document.getElementById("primer");
const numSekunder = document.getElementById("sekunder");
const numTritier = document.getElementById("tritier");
const numPersentase = document.getElementById("persentase");
const numCadangan = document.getElementById("cadangan");
const numPersentase2 = document.getElementById("persentase2");
const numCadangan2 = document.getElementById("cadangan2");

const txtSatPrimer = document.getElementById("sat_primer");
const txtSatSekunder = document.getElementById("sat_sekunder");
const txtSatTritier = document.getElementById("sat_tritier");
const txtKodeBarang = document.getElementById("kode_barang");
const txtNamaKomposisi = document.getElementById("nama_komposisi");

const btnTambahDetail = document.getElementById("btn_tambah_detail");
const btnKoreksiDetail = document.getElementById("btn_koreksi_detail");
const btnHapusDetail = document.getElementById("btn_hapus_detail");
const btnCadanganDetail = document.getElementById("btn_cadangan_detail");
const btnBaruMaster = document.getElementById("btn_baru_master");
const btnKoreksiMaster = document.getElementById("btn_koreksi_master");
const btnHapusMaster = document.getElementById("btn_hapus_master");
const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");
const btnTambahAfalan = document.getElementById("btn_tambah_afalan");

const listOfMaster = document.querySelectorAll("#master .form-select");
const listOfDetail = document.querySelectorAll(
    ".card .form-control, .card .form-select, .card .btn"
);

const listKomposisi = [];
/** ISI LIST KOMPOSISI
 * 0 StatusType
 * 1 IdType
 * 2 NamaType
 * 3 JumlahPrimer
 * 4 SatuanPrimer
 * 5 JumlahSekunder
 * 6 SatuanSekunder
 * 7 JumlahTritier
 * 8 SatuanTritier
 * 9 Persentase
 * 10 IdObjek
 * 11 NamaObjek
 * 12 IdKelompokUtama
 * 13 NamaKelompokUtama
 * 14 IdKelompok
 * 15 NamaKelompok
 * 16 IdSubKelompok
 * 17 NamaSubKelompok
 * 18 KodeBarang
 * 19 Cadangan
 */

const listAfalan = [];
/** ISI LIST AFALAN
 * 0 KodeBarang
 * 1 NamaType
 */

var tableKomposisi = "";
const colKomposisi = [
    { width: "1px" }, // Jenis
    { width: "100px" }, // Id Type
    { width: "250px" }, // Nama Type
    { width: "100px" }, // Qty. Primer
    { width: "100px" }, // Sat. Primer
    { width: "110px" }, // Qty. Sekunder
    { width: "110px" }, // Sat. Sekunder
    { width: "100px" }, // Qty. Tritier
    { width: "100px" }, // Sat. Tritier
    { width: "1px" }, // Persentase
    { width: "80px" }, // Id Objek
    { width: "100px" }, // Nama Objek
    { width: "80px" }, // Id KelUt.
    { width: "100px" }, // Nama KelUt.
    { width: "100px" }, // Id Kelompok
    { width: "100px" }, // Kelompok
    { width: "80px" }, // Id SubKel.
    { width: "100px" }, // SubKel.
    { width: "100px" }, // Kode Barang
    { width: "1px" }, // Cadangan
];

const namaGedung = document.getElementById("nama_gedung").value;
const idDivisi = namaGedung == "D" ? "DEX" : "MEX";
const idKelompok = namaGedung == "D" ? "8569" : "7227";
const idBahanBaku = namaGedung == "D" ? "2248" : "1977";
const idBahanPembantu = namaGedung == "D" ? "2249" : "1978";
const idHasilProduksi = namaGedung == "D" ? "2250" : "1994";
const idAfalan = namaGedung == "D" ? "2251" : "1976";
const idObjek = namaGedung == "D" ? "279" : "213";

var jumlah = 0;
var modeProses = "";
var refetchKelut = false;
var refetchKelompok = false;
var refetchSubkel = false;
var refetchType = false;
var refetchKomposisi = false;
var refetchHP = false;
var refetchNG = false;
var refetchAF = false;
var pilKomposisi = -1;

var counterKomposisi = 0;
var counterMesin = 0;
var counterObjek = 0;
var counterKelut = 0;
var counterKelompok = 0;
var counterSubkel = 0;
var counterType = 0;
var counterHP = 0;
var counterNG = 0;
var counterAF = 0;
//#endregion

//#region Events
slcKomposisi.addEventListener("mousedown", function () {
    if (refetchKomposisi) {
        refetchKomposisi = false;
        clearOptions(this);
        const errorOption = addLoadingOption(this);
        const optionKeys = {
            valueKey: "IdKomposisi",
            textKey: "NamaKomposisi",
        };

        // SP_5298_EXT_LIST_KOMPOSISI_1
        fetchSelect(
            "/Master/getListKomposisi/" + idDivisi,
            (data) => {
                if (data.length > 0) {
                    addOptions(this, data, optionKeys);
                    this.removeChild(errorOption);
                } else refetchKomposisi = true;
            },
            errorOption
        );

        refetchHP = true;
        refetchNG = true;
        refetchAF = true;
    }
});

slcKomposisi.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        counterKomposisi += 1;

        if (refetchKomposisi) {
            refetchKomposisi = false;
            clearOptions(this);
            const errorOption = addLoadingOption(this);
            const optionKeys = {
                valueKey: "IdKomposisi",
                textKey: "NamaKomposisi",
            };

            // SP_5298_EXT_LIST_KOMPOSISI_1
            fetchSelect(
                "/Master/getListKomposisi/" + idDivisi,
                (data) => {
                    if (data.length > 0) {
                        addOptions(this, data, optionKeys);
                        this.removeChild(errorOption);
                    } else refetchKomposisi = true;
                },
                errorOption
            );

            refetchHP = true;
            refetchNG = true;
            refetchAF = true;
        }
    }
});

slcKomposisi.addEventListener("click", function () {
    counterKomposisi += 1;
    if ((counterKomposisi %= 2) == 0) {
        counterKomposisi = 0;
        clearDataDetail();
        jumlah = 0;

        listKomposisi.length = 0;
        clearTable_DataTable(
            "table_komposisi",
            colKomposisi.length,
            "padding=250px"
        );

        // SP_5298_EXT_LIST_KOMPOSISI_1
        fetchSelect(
            "/Master/getListKomposisi/" + idDivisi + "/" + slcKomposisi.value,
            (data) => {
                if (data.length > 0) {
                    addOptionIfNotExists(
                        slcMesin,
                        data[0].IdMesin,
                        data[0].IdMesin + " | " + data[0].TypeMesin
                    );
                } else
                    addOptionIfNotExists(
                        slcMesin,
                        "Data mesin tidak ditemukan."
                    );

                /**
                 * Mengambil data Hasil Produksi & Afalan
                 * Terhadap Komposisi yang dipilih.
                 */

                // SP_1273_PRG_BOM_Barang Kode 5
                fetchSelect(
                    "/Master/getPrgBomBarang/5/null/" +
                        slcKomposisi.value +
                        "/null/" +
                        idDivisi,
                    (data2) => {
                        if (data2.length > 0) {
                            addOptionIfNotExists(
                                slcHP,
                                data2[0].KodeBarang,
                                data2[0].KodeBarang + " | " + data2[0].NamaType
                            );
                        } else
                            addOptionIfNotExists(
                                slcHP,
                                "Data barang tidak ditemukan."
                            );

                        // SP_1273_PRG_BOM_Barang Kode 6
                        fetchSelect(
                            "/Master/getPrgBomBarang/6/null/" +
                                slcKomposisi.value +
                                "/null/" +
                                idDivisi,
                            (data3) => {
                                if (data3.length > 0) {
                                    addOptionIfNotExists(
                                        slcNG,
                                        data3[0].KodeBarang,
                                        data3[0].KodeBarang +
                                            " | " +
                                            data3[0].NamaType
                                    );
                                } else
                                    addOptionIfNotExists(
                                        slcNG,
                                        "Data barang tidak ditemukan."
                                    );

                                listAfalan.length = 0;
                                clearTable_DataTable("table_afalan", 2);

                                // SP_1273_PRG_BOM_Barang Kode 7
                                fetchSelect(
                                    "/Master/getPrgBomBarang/7/null/" +
                                        slcKomposisi.value +
                                        "/" +
                                        idKelompok +
                                        "/" +
                                        idDivisi,
                                    (data3) => {
                                        for (let i = 0; i < data3.length; i++) {
                                            listAfalan.push({
                                                KodeBarang: data3[i].KodeBarang,
                                                NamaType: data3[i].NamaType,
                                            });
                                        }

                                        getDataKomposisiFetch(
                                            slcKomposisi.value,
                                            () => {
                                                if (modeProses == "koreksi") {
                                                    addOptionIfNotExists(
                                                        slcObjek,
                                                        idObjek,
                                                        "Bahan dan Hasil Produksi"
                                                    );

                                                    slcKelut.selectedIndex = 0;
                                                    slcKelompok.selectedIndex = 0;
                                                    slcType.selectedIndex = 0;
                                                    slcSubkel.selectedIndex = 0;
                                                    refetchKelut = true;

                                                    btnKoreksiDetail.disabled = false;
                                                    numPersentase.disabled = false;
                                                    numCadangan.disabled = false;
                                                    numCadangan.placeholder =
                                                        "0";
                                                    slcKelut.disabled = false;
                                                    slcKelut.focus();
                                                } else if (
                                                    modeProses == "hapus"
                                                ) {
                                                    btnProses.focus();
                                                } else if (
                                                    modeProses == "hapus_detail"
                                                ) {
                                                    btnHapusDetail.disabled = false;
                                                }
                                            }
                                        );
                                    }
                                );
                            }
                        );
                    }
                );
            }
        );
    }
});

slcMesin.addEventListener("keydown", function (event) {
    if (event.key === "Enter") counterMesin += 1;
});

slcMesin.addEventListener("click", function () {
    counterMesin += 1;

    if ((counterMesin %= 2) == 0) {
        counterMesin = 0;

        jumlah = 0;
        clearDataDetail("select_objek");
        slcHP.disabled = false;
        numCadangan.value = 0;
        slcHP.focus();

        listKomposisi.length = 0;
        clearTable_DataTable(
            "table_komposisi",
            colKomposisi.length,
            "padding=250px"
        );
    }
});

slcKelut.addEventListener("mousedown", function () {
    if (refetchKelut) {
        refetchKelut = false;
        clearOptions(this);
        const errorOption = addLoadingOption(this);
        const optionKeys = {
            valueKey: "IdKelompokUtama",
            textKey: "NamaKelompokUtama",
        };

        // SP_5298_EXT_IDOBJEK_KELOMPOKUTAMA
        fetchSelect(
            "/Master/getIdObjekKelompokUtama/" + slcObjek.value,
            (data) => {
                if (data.length > 0) {
                    addOptions(this, data, optionKeys, false);
                    this.removeChild(errorOption);
                } else refetchKelut = true;
            },
            errorOption
        );
    }
});

slcKelut.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        counterKelut += 1;

        if (refetchKelut) {
            refetchKelut = false;
            clearOptions(this);
            const errorOption = addLoadingOption(this);
            const optionKeys = {
                valueKey: "IdKelompokUtama",
                textKey: "NamaKelompokUtama",
            };

            // SP_5298_EXT_IDOBJEK_KELOMPOKUTAMA
            fetchSelect(
                "/Master/getIdObjekKelompokUtama/" + slcObjek.value,
                (data) => {
                    if (data.length > 0) {
                        addOptions(this, data, optionKeys, false);
                        this.removeChild(errorOption);
                    } else refetchKelut = true;
                },
                errorOption
            );
        }
    }
});

slcKelut.addEventListener("click", function () {
    counterKelut += 1;

    if ((counterKelut %= 2) == 0) {
        counterKelut = 0;

        if (this.value == "0117") {
            showModal(
                "Konfirmasi",
                "Anda akan memasukkan data Bahan Pembantu, apakah anda telah memasukkan semua <b>Bahan Baku</b>?",
                () => {
                    slcKelompok.disabled = false;
                    slcKelompok.focus();
                },
                () => {
                    this.focus();
                }
            );
        } else {
            slcKelompok.disabled = false;
            slcKelompok.focus();
        }

        slcKelompok.selectedIndex = 0;
        slcType.selectedIndex = 0;
        slcSubkel.selectedIndex = 0;
        refetchKelompok = true;
    }
});

slcKelompok.addEventListener("mousedown", function () {
    if (refetchKelompok) {
        refetchKelompok = false;
        clearOptions(this);
        const errorOption = addLoadingOption(this);
        const optionKeys = {
            valueKey: "idkelompok",
            textKey: "namakelompok",
        };

        // SP_5298_EXT_IDKELOMPOKUTAMA_KELOMPOK
        fetchSelect(
            "/Master/getIdKelompokUtamaKelompok/" + slcKelut.value,
            (data) => {
                if (data.length > 0) {
                    addOptions(this, data, optionKeys, true);
                    this.removeChild(errorOption);
                } else refetchKelompok = true;
            },
            errorOption
        );
    }
});

slcKelompok.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        counterKelompok += 1;

        if (refetchKelompok) {
            refetchKelompok = false;
            clearOptions(this);
            const errorOption = addLoadingOption(this);
            const optionKeys = {
                valueKey: "idkelompok",
                textKey: "namakelompok",
            };

            // SP_5298_EXT_IDKELOMPOKUTAMA_KELOMPOK
            fetchSelect(
                "/Master/getIdKelompokUtamaKelompok/" + slcKelut.value,
                (data) => {
                    if (data.length > 0) {
                        addOptions(this, data, optionKeys, true);
                        this.removeChild(errorOption);
                    } else refetchKelompok = true;
                },
                errorOption
            );
        }
    }
});

slcKelompok.addEventListener("click", function () {
    counterKelompok += 1;

    if ((counterKelompok %= 2) == 0) {
        counterKelompok = 0;

        refetchSubkel = true;
        slcSubkel.disabled = false;
        slcSubkel.focus();
        slcType.selectedIndex = 0;
        slcSubkel.selectedIndex = 0;

        if (
            slcKelut.value == idBahanBaku ||
            slcKelut.value == idHasilProduksi
        ) {
            // Pengecekkan mesin pada DB Inventory dan Extruder
            // SP_5298_EXT_CEK_KELOMPOK_MESIN
            fetchSelect(
                "/Master/getCekKelompokMesin/" + this.value.slice(2),
                (data) => {
                    let found = false;
                    for (let i = 0; i < data.length; i++) {
                        if (slcMesin.value != data[i].IdMesin) {
                            found = true;
                        } else {
                            found = false;
                            break;
                        }
                    }

                    if (data.length < 1 || found) {
                        if (found) {
                            alert("Mesin tidak sama.");
                        } else alert("Mesin tidak ditemukan");

                        slcSubkel.disabled = true;
                        refetchSubkel = false;
                        this.selectedIndex = 0;
                        this.focus();
                    }
                }
            );
        }
    }
});

slcSubkel.addEventListener("mousedown", function () {
    if (refetchSubkel) {
        refetchSubkel = false;
        clearOptions(this);
        const errorOption = addLoadingOption(this);
        const optionKeys = {
            valueKey: "idsubkelompok",
            textKey: "namasubkelompok",
        };

        // SP_5298_EXT_IDKELOMPOK_SUBKELOMPOK
        fetchSelect(
            "/Master/getIdKelompokSubKelompok/" + slcKelompok.value,
            (data) => {
                if (data.length > 0) {
                    addOptions(this, data, optionKeys, false);
                    this.removeChild(errorOption);
                } else refetchSubkel = true;
            },
            errorOption
        );
    }
});

slcSubkel.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        counterSubkel += 1;

        if (refetchSubkel) {
            refetchSubkel = false;
            clearOptions(this);
            const errorOption = addLoadingOption(this);
            const optionKeys = {
                valueKey: "idsubkelompok",
                textKey: "namasubkelompok",
            };

            // SP_5298_EXT_IDKELOMPOK_SUBKELOMPOK
            fetchSelect(
                "/Master/getIdKelompokSubKelompok/" + slcKelompok.value,
                (data) => {
                    if (data.length > 0) {
                        addOptions(this, data, optionKeys, false);
                        this.removeChild(errorOption);
                    } else refetchSubkel = true;
                },
                errorOption
            );
        }
    }
});

slcSubkel.addEventListener("click", function () {
    counterSubkel += 1;

    if ((counterSubkel %= 2) == 0) {
        counterSubkel = 0;

        refetchType = true;
        slcType.disabled = false;
        slcType.focus();
    }
});

slcType.addEventListener("mousedown", function () {
    if (refetchType) {
        refetchType = false;
        clearOptions(this);
        const errorOption = addLoadingOption(this);
        const optionKeys = {
            valueKey: "IdType",
            textKey: "NamaType",
        };

        // SP_5298_EXT_IDSUBKELOMPOK_TYPE
        fetchSelect(
            "/Master/getIdSubKelompokType/" + slcSubkel.value,
            (data) => {
                if (data.length > 0) {
                    addOptions(this, data, optionKeys, "trim");
                    this.removeChild(errorOption);
                } else refetchType = true;
            },
            errorOption
        );
    }
});

slcType.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        counterType += 1;

        if (refetchType) {
            refetchType = false;
            clearOptions(this);
            const errorOption = addLoadingOption(this);
            const optionKeys = {
                valueKey: "IdType",
                textKey: "NamaType",
            };

            // SP_5298_EXT_IDSUBKELOMPOK_TYPE
            fetchSelect(
                "/Master/getIdSubKelompokType/" + slcSubkel.value,
                (data) => {
                    if (data.length > 0) {
                        addOptions(this, data, optionKeys, "trim");
                        this.removeChild(errorOption);
                    } else refetchType = true;
                },
                errorOption
            );
        }
    }
});

slcType.addEventListener("click", function () {
    counterType += 1;

    if ((counterType %= 2) == 0) {
        counterType = 0;

        getSatuanFetch(this.value);
        numCadangan.value = 0;
        if (txtSatPrimer.value.trim() != "Null") {
            numPrimer.value = 1;
            numSekunder.disabled = false;
            numSekunder.value = "";
            numSekunder.focus();
        } else if (txtSatSekunder.value.trim() != "Null") {
            numPrimer.value = 0;
            numSekunder.value = 1;
            numTritier.disabled = false;
            numTritier.value = "";
            numTritier.focus();
        } else if (txtSatTritier.value.trim() != "Null") {
            numPrimer.value = 0;
            numSekunder.value = 0;
            numTritier.disabled = false;
            numTritier.value = "";
            numTritier.focus();
        }
    }
});

btnKoreksiMaster.addEventListener("click", function () {
    if (slcKomposisi.classList.contains("hidden")) {
        txtNamaKomposisi.classList.add("hidden");
        slcKomposisi.classList.remove("hidden");
    }

    clearDataMaster();
    clearDataDetail();
    jumlah = 0;

    listKomposisi.length = 0;
    clearTable_DataTable(
        "table_komposisi",
        colKomposisi.length,
        "padding=250px"
    );

    modeProses = "koreksi";
    slcKomposisi.disabled = false;
    slcKomposisi.focus();
    toggleButtons(2);
});

btnBaruMaster.addEventListener("click", function () {
    if (txtNamaKomposisi.classList.contains("hidden")) {
        txtNamaKomposisi.classList.remove("hidden");
        txtNamaKomposisi.value = "";
        slcKomposisi.classList.add("hidden");
    }

    clearDataMaster();
    clearDataDetail();
    jumlah = 0;

    listKomposisi.length = 0;
    clearTable_DataTable(
        "table_komposisi",
        colKomposisi.length,
        "padding=250px"
    );

    listAfalan.length = 0;
    clearTable_DataTable("table_afalan", 2);

    window.scrollTo(0, 0);
    modeProses = "baru";
    numCadangan.value = 0;
    txtNamaKomposisi.disabled = false;
    txtNamaKomposisi.focus();
    toggleButtons(2);
});

btnHapusMaster.addEventListener("click", function () {
    const postModal = (strMode) => {
        if (slcKomposisi.classList.contains("hidden")) {
            txtNamaKomposisi.classList.add("hidden");
            slcKomposisi.classList.remove("hidden");
        }

        jumlah = 0;
        clearDataMaster();
        clearDataDetail();

        listKomposisi.length = 0;
        clearTable_DataTable(
            "table_komposisi",
            colKomposisi.length,
            "padding=250px"
        );

        modeProses = strMode;
        slcKomposisi.disabled = false;
        slcKomposisi.focus();
        toggleButtons(2);
    };

    showModal(
        "Hapus Semua",
        "Apakah anda ingin menghapus semua data komposisi bahan atau hanya sebagian?",
        () => {
            postModal("hapus");
        },
        () => {
            postModal("hapus_detail");
        },
        "Hapus Sebagian",
        () => {}
    );
});

btnTambahDetail.addEventListener("click", function () {
    /**
     * Hanya boleh menambahkan komposisi dengan jenis:
     * - Bahan Baku (BB)
     * - Bahan Pembantu (BP)
     *
     * Untuk Afalan & Hasil Produksi dipilih pada:
     * slcAF, slcHP, dan slcNG
     */

    let jenis = "";

    console.log("Halo Dunia");
    console.log(slcKelut.value);
    console.log(idHasilProduksi);

    switch (slcKelut.value) {
        case idBahanBaku: // Bahan Baku
            jenis = "BB";
            break;
        case idBahanPembantu: // Bahan Pembantu
            jenis = "BP";
            break;
        case idHasilProduksi: // Hasil Produksi
            alert(
                'Hasil Produksi dapat dipilih pada bagian "Hasil Produksi" & "Hasil Produksi NG" di kolom atas.'
            );
            slcKelut.focus();
            return;
        case "1976": // Afalan
            alert('Afalan dapat dipilih pada bagian "Afalan" di kolom atas.');
            slcKelut.focus();
            return;
        default:
            jenis = "__";
            break;
    }

    for (let i = 0; i < listOfDetail.length; i++) {
        const ele = listOfDetail[i];
        if (ele.tagName == "INPUT") {
            if (ele.value.trim() == "") {
                alert("Ada data yang belum terisi, mohon periksa kembali.");
                ele.focus();
                return;
            }
        } else if (ele.tagName == "SELECT") {
            if (ele.selectedIndex == 0) {
                alert("Ada data yang belum terisi, mohon periksa kembali.");
                ele.focus();
                return;
            }
        }
    }

    let [type_found, bb_found, bp_found] = [false, false, false];
    if (findClickedRowInList(listKomposisi, "IdType", slcType.value) != -1) {
        type_found = true;
    }

    if (
        jenis == "BB" &&
        findClickedRowInList(listKomposisi, "StatusType", jenis) != -1
    ) {
        bb_found = true;
    }

    if (
        findClickedRowInList(
            listKomposisi,
            "NamaSubKelompok",
            slcSubkel.options[slcSubkel.selectedIndex].text
        ) != -1
    ) {
        bp_found = true;
    }

    jumlah += parseFloat(numPersentase.value);
    console.log("jumlah = " + parseFloat(jumlah).toFixed(2));
    if (
        parseFloat(jumlah).toFixed(2) > 100 ||
        parseFloat(numPersentase.value) <= 0
    ) {
        if (jumlah > 100) {
            alert("Persentase yang dimasukkan tidak boleh lebih dari 100%!");
        } else alert("Persentase harus diisi terlebih dahulu.");

        jumlah += parseFloat(numPersentase.value);
        numPersentase.select();
        return;
    }

    if (type_found) {
        alert("Sudah ada Type yang sama dalam Komposisi.");
        slcType.focus();
        return;
    } else if (bb_found) {
        alert("Hanya boleh terdapat 1 Bahan Baku dalam Komposisi.");
        slcKelut.focus();
        return;
    } else if (bp_found) {
        alert(
            "Sudah ada Bahan Pembantu dengan Sub-kelompok yang sama dalam Komposisi."
        );
        slcSubkel.focus();
        return;
    } else {
        let nama_kelompok = slcKelompok.options[slcKelompok.selectedIndex].text;
        let nama_type = slcType.options[slcType.selectedIndex].text;

        listKomposisi.push({
            StatusType: jenis,
            IdType: slcType.value,
            NamaType: nama_type.split(" | ")[1].trim(),
            JumlahPrimer: numPrimer.value,
            SatuanPrimer: txtSatPrimer.value,
            JumlahSekunder: numSekunder.value,
            SatuanSekunder: txtSatSekunder.value,
            JumlahTritier: numTritier.value,
            SatuanTritier: txtSatTritier.value,
            Persentase: numPersentase.value,
            IdObjek: slcObjek.value,
            NamaObjek: slcObjek.options[slcObjek.selectedIndex].text,
            IdKelompokUtama: slcKelut.value,
            NamaKelompokUtama: slcKelut.options[slcKelut.selectedIndex].text,
            IdKelompok: slcKelompok.value,
            NamaKelompok: nama_kelompok.split("|")[1].trim(),
            IdSubKelompok: slcSubkel.value,
            NamaSubKelompok: slcSubkel.options[slcSubkel.selectedIndex].text,
            KodeBarang: txtKodeBarang.value,
            Cadangan: 0,
        });

        addTable_DataTable(
            "table_komposisi",
            listKomposisi,
            colKomposisi,
            rowClickedFetch,
            "350px"
        );

        showModal(
            "Tambah Lagi",
            "Ingin input data bahan / hasil produksi lagi?",
            () => {
                clearDataDetail("select_objek");
                disableDetail("select_kelompok_utama");
                slcKelut.focus();
            },
            () => {
                btnProses.focus();
            }
        );
    }
});

btnCadanganDetail.addEventListener("click", function () {
    /**
     * Memiliki fungsi mirip seperti button "Tambah Bahan",
     * Namun button ini juga membaca bagian "Cadangan", dan
     * Hanya dapat dilakukan saat mode proses "Koreksi",
     * Tidak bisa dilakukan saat mode proses "Baru".
     *
     * Data cadangan hanya akan dimasukkan ke database bila berupa 0 atau 1
     */

    let jenis = "";
    switch (slcKelut.value) {
        case idBahanBaku: // Bahan Baku
            jenis = "BB";
            break;
        case idBahanPembantu: // Bahan Pembantu
            jenis = "BP";
            break;
        case idHasilProduksi: // Hasil Produksi
            alert(
                'Hasil Produksi dapat dipilih pada bagian "Hasil Produksi" & "Hasil Produksi NG" di kolom atas.'
            );
            slcKelut.focus();
            return;
        case "1976": // Afalan
            alert('Afalan dapat dipilih pada bagian "Afalan" di kolom atas.');
            slcKelut.focus();
            return;
        default:
            jenis = "__";
            break;
    }

    for (let i = 0; i < listOfDetail.length; i++) {
        const ele = listOfDetail[i];
        if (ele.tagName == "INPUT") {
            if (ele.value.trim() == "") {
                alert("Ada data yang belum terisi, mohon periksa kembali.");
                ele.focus();
                return;
            }
        } else if (ele.tagName == "SELECT") {
            if (ele.selectedIndex == 0) {
                alert("Ada data yang belum terisi, mohon periksa kembali.");
                ele.focus();
                return;
            }
        }
    }

    let [type_found, bb_found, bp_found] = [false, false, false];
    if (findClickedRowInList(listKomposisi, "IdType", slcType.value) != -1) {
        type_found = true;
    }

    if (
        jenis == "BB" &&
        findClickedRowInList(listKomposisi, "StatusType", jenis) != -1
    ) {
        bb_found = true;
    }

    if (
        findClickedRowInList(
            listKomposisi,
            "NamaSubKelompok",
            slcSubkel.options[slcSubkel.selectedIndex].text
        ) != -1
    ) {
        bp_found = true;
    }

    if (numCadangan.value == "0" || numCadangan.value == "") {
        alert("Cadangan harus diisi terlebih dahulu!");
        numCadangan.select();
        return;
    }

    if (type_found) {
        alert("Sudah ada Type yang sama dalam Komposisi.");
        slcType.focus();
        return;
    } else if (bb_found) {
        alert("Hanya boleh terdapat 1 Bahan Baku dalam Komposisi.");
        slcKelut.focus();
        return;
    } else if (bp_found) {
        alert(
            "Sudah ada Bahan Pembantu dengan Sub-kelompok yang sama dalam Komposisi."
        );
        slcSubkel.focus();
        return;
    } else {
        let nama_kelompok = slcKelompok.options[slcKelompok.selectedIndex].text;
        let nama_type = slcType.options[slcType.selectedIndex].text;

        listKomposisi.push({
            StatusType: jenis,
            IdType: slcType.value,
            NamaType: nama_type.split(" | ")[1].trim(),
            JumlahPrimer: numPrimer.value,
            SatuanPrimer: txtSatPrimer.value,
            JumlahSekunder: numSekunder.value,
            SatuanSekunder: txtSatSekunder.value,
            JumlahTritier: numTritier.value,
            SatuanTritier: txtSatTritier.value,
            Persentase: numPersentase.value,
            IdObjek: slcObjek.value,
            NamaObjek: slcObjek.options[slcObjek.selectedIndex].text,
            IdKelompokUtama: slcKelut.value,
            NamaKelompokUtama: slcKelut.options[slcKelut.selectedIndex].text,
            IdKelompok: slcKelompok.value,
            NamaKelompok: nama_kelompok.split("|")[1].trim(),
            IdSubKelompok: slcSubkel.value,
            NamaSubKelompok: slcSubkel.options[slcSubkel.selectedIndex].text,
            KodeBarang: txtKodeBarang.value,
            Cadangan: numCadangan.value,
        });

        addTable_DataTable(
            "table_komposisi",
            listKomposisi,
            colKomposisi,
            rowClickedFetch,
            "350px"
        );

        showModal(
            "Tambah Lagi",
            "Ingin input data bahan / hasil produksi lagi?",
            () => {
                clearDataDetail("select_objek");
                disableDetail("select_kelompok_utama");
                slcKelut.focus();
            },
            () => {
                btnProses.focus();
            }
        );
    }
});

btnKoreksiDetail.addEventListener("click", function () {
    if (pilKomposisi != -1) {
        showModal(
            "Koreksi",
            "Anda yakin akan mengoreksi Type <b>" +
                listKomposisi[pilKomposisi].NamaType +
                "</b>?",
            () => {
                let jenis = "";
                switch (slcKelut.value) {
                    case idBahanBaku:
                        jenis = "BB";
                        break;
                    case idBahanPembantu:
                        jenis = "BP";
                        break;
                    case idHasilProduksi:
                        jenis = "HP";
                        break;
                    case "1976":
                        jenis = "AF";
                        break;
                    default:
                        jenis = "__";
                        break;
                }

                let isEmpty = false;
                for (let i = 0; i < listOfDetail.length; i++) {
                    const ele = listOfDetail[i];
                    if (ele.tagName == "INPUT") {
                        if (ele.value.trim() == "") isEmpty = true;
                    } else if (ele.tagName == "SELECT") {
                        if (ele.selectedIndex == 0) isEmpty = true;
                    }

                    if (isEmpty) {
                        alert(
                            "Ada data yang belum terisi, mohon periksa kembali."
                        );
                        ele.focus();
                        return;
                    }
                }

                if (numCadangan.value == 0) {
                    jumlah -=
                        parseFloat(numPersentase2.value) -
                        parseFloat(numPersentase.value);
                    console.log("jumlah = " + parseFloat(jumlah).toFixed(2));
                    if (parseFloat(jumlah).toFixed(2) > 100) {
                        alert(
                            "Persentase yang dimasukkan tidak boleh lebih dari 100%!"
                        );
                        jumlah -= parseFloat(numPersentase.value);
                        numPersentase.focus();
                        return;
                    }
                }

                let found2 = false;
                // SP_1273_MEX_CEK_JumlahKomposisi
                fetchSelect(
                    "/Master/getCekJumlahKomposisi/3/" +
                        slcKomposisi.value +
                        "/" +
                        numPersentase.value +
                        "/" +
                        jenis,
                    (data) => {
                        if (data.length > 0) {
                            found2 = data[0].Ada1;
                        }

                        if (numCadangan.value == 1 && numCadangan2.value != 1) {
                            if (found2 > 0) {
                                alert(
                                    "Sudah ada Cadangan yang sama dalam Komposisi."
                                );
                                numCadangan.value = 0;
                                numCadangan.select();
                                return;
                            }
                        }

                        if (numPersentase.value <= 0) {
                            alert("Persentase tidak boleh kosong!");
                            numPersentase.focus();
                            return;
                        }

                        listKomposisi[pilKomposisi].Persentase =
                            numPersentase.value;

                        addTable_DataTable(
                            "table_komposisi",
                            listKomposisi,
                            colKomposisi,
                            rowClickedFetch,
                            "350px"
                        );
                    }
                );
            }
        );
    } else alert("Pilih dulu data yang akan dikoreksi.");
});

function preventEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault();
    }
}

btnHapusDetail.addEventListener("keypress", preventEnter);

btnHapusDetail.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        btnHapusDetail.removeEventListener("keypress", preventEnter);
    }
});

btnHapusDetail.addEventListener("click", function () {
    if (listKomposisi.length > 1) {
        if (pilKomposisi != -1) {
            showModal(
                "Hapus",
                "Anda yakin akan menghapus type <b>" +
                    listKomposisi[pilKomposisi].NamaType +
                    "</b>?",
                () => {
                    let id_komposisi = slcKomposisi.classList.contains("hidden")
                        ? "-"
                        : slcKomposisi.value;

                    // SP_5409_EXT_CEK_KONVERSI
                    fetchSelect(
                        "/Master/getCekKonversi/" +
                            id_komposisi +
                            "/" +
                            listKomposisi[pilKomposisi].IdType,
                        (data) => {
                            if (data[0].ada <= 0) {
                                // SP_5298_EXT_DELETE_KOMPOSISI_BAHAN_1
                                fetchStmt(
                                    "/Master/delKomposisiBahan1/" +
                                        id_komposisi +
                                        "/" +
                                        listKomposisi[pilKomposisi].IdType,
                                    () => {
                                        listKomposisi.splice(pilKomposisi, 1);
                                        clearDataDetail();

                                        addTable_DataTable(
                                            "table_komposisi",
                                            listKomposisi,
                                            colKomposisi,
                                            rowClickedFetch,
                                            "350px"
                                        );

                                        pilKomposisi = -1;
                                        clearSelection_DataTable(
                                            "table_komposisi"
                                        );
                                    }
                                );
                            } else {
                                pilKomposisi = -1;
                                clearSelection_DataTable("table_komposisi");

                                alert(
                                    "Type tidak dapat dihapus karena pernah digunakan untuk konversi."
                                );
                            }
                        }
                    );
                },
                () => {
                    pilKomposisi = -1;
                    clearSelection_DataTable("table_komposisi");
                }
            );
        } else alert("Pilih dulu data yang akan dihapus.");
    } else {
        pilKomposisi = -1;
        clearSelection_DataTable("table_komposisi");

        alert(
            "Data komposisi hanya tersisa satu, sehingga tidak boleh dihapus."
        );
    }
});

txtNamaKomposisi.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (this.value == "") {
            alert("Masukan nama komposisi terlebih dahulu.");
            this.focus();
        } else {
            slcMesin.disabled = false;
            slcMesin.focus();
        }
    }
});

btnKeluar.addEventListener("click", function () {
    if (this.textContent != "Keluar") {
        clearDataMaster();
        clearDataDetail();
        disableAll();
        modeProses = "";
        jumlah = 0;

        listAfalan.length = 0;
        clearTable_DataTable("table_afalan", 2);

        listKomposisi.length = 0;
        clearTable_DataTable(
            "table_komposisi",
            colKomposisi.length,
            "padding=250px"
        );

        pilKomposisi = -1;
        clearSelection_DataTable();
    } else window.location.href = "/Extruder/ExtruderNet";
});

numPrimer.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (this.value == "") this.value = 0;
        numSekunder.disabled = false;
        if (numSekunder.value != "") {
            numSekunder.select();
        } else numSekunder.focus();
    }
});

numSekunder.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (this.value <= 0 && numPrimer.value == 1) {
            alert(
                "Isikan jumlah " +
                    txtSatSekunder.value.trim() +
                    " untuk 1 " +
                    txtSatPrimer.value.trim() +
                    " bahan ini."
            );
            this.focus();
        } else {
            numTritier.disabled = false;
            if (numTritier.value != "") {
                numTritier.select();
            } else numTritier.focus();
        }
    }
});

numTritier.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (this.value == "") this.value = 0;
        numPersentase.disabled = false;
        if (numPersentase.value != "") {
            numPersentase.select();
        } else numPersentase.focus();
    }
});

numPersentase.addEventListener("keypress", function (event) {
    /**
     * Bila mode proses koreksi tidak bisa lagi mengubah data yang sudah ada,
     * hanya bisa menambahkan data baru ke komposisi yang sudah ada.
     *
     * Penghapusan data yang sudah ada dilakukan pada proses "Hapus",
     * lalu pada pop-up pilih "Hapus Sebagian".
     */

    if (event.key == "Enter") {
        if (this.value == "") this.value = 0;
        if (modeProses == "baru") {
            btnTambahDetail.disabled = false;
            btnKoreksiDetail.disabled = false;
            btnHapusDetail.disabled = false;

            if (pilKomposisi != -1) {
                btnKoreksiDetail.focus();
            } else btnTambahDetail.focus();
        } else if (modeProses == "koreksi") {
            btnTambahDetail.disabled = false;
            btnCadanganDetail.disabled = false;
            btnTambahDetail.focus();
        }
    }
});

btnProses.addEventListener("click", function () {
    let [jmlh_bb, jmlh_bom] = [-1, -1];
    if (modeProses == "baru") {
        if (listKomposisi.length < 1) {
            alert(
                "Data tidak dapat diproses karena tidak ditemukan data pada Tabel Komposisi."
            );
            return;
        } else if (listAfalan.length < 1) {
            alert(
                "Data tidak dapat diproses karena tidak ditemukan data pada Tabel Afalan."
            );
            return;
        } else {
            jmlh_bb = 0;
            for (let i = 0; i < listKomposisi.length; i++) {
                if (listKomposisi[i].StatusType.trim() == "BB")
                    jmlh_bb += parseFloat(listKomposisi[i].JumlahTritier);
            }

            // SP_1273_PRG_BOM_Barang
            fetchSelect("/Master/getPrgBomBarang/1/" + slcHP.value, (data) => {
                if (data.length > 0) {
                    jmlh_bom = data[0].JumlahBOM;
                } else console.log("Jumlah BOM tidak ditemukan.");

                if (jmlh_bom > 0) {
                    alert(
                        'Kode barang ini sudah mempunyai Komposisi, Jika ingin melakukan perubahan pilih "Koreksi".'
                    );

                    disableAll();
                    btnKoreksiMaster.focus();
                    return;
                } else {
                    // SP_5298_EXT_INSERT_MASTER_KOMPOSISI
                    fetchStmt(
                        "/Master/insMasterKomposisi/" +
                            txtNamaKomposisi.value +
                            "/" +
                            slcMesin.value +
                            "/" +
                            idDivisi,
                        () => {
                            fetchSelect(
                                "/Master/getMasterKomposisi/" + idDivisi,
                                (dataKomposisi) => {
                                    txtNamaKomposisi.classList.add("hidden");
                                    slcKomposisi.classList.remove("hidden");
                                    addOptionIfNotExists(
                                        slcKomposisi,
                                        dataKomposisi.NoKomposisi,
                                        dataKomposisi.NoKomposisi +
                                            " | " +
                                            txtNamaKomposisi.value
                                    );

                                    insertDetailFetch(() => {
                                        // SP_5298_EXT_UPDATE_IDKOMPOSISI_COUNTER
                                        fetchStmt(
                                            "/Master/updIdKomposisiCounter/" +
                                                idDivisi,
                                            () => {
                                                alert(
                                                    "Data berhasil tersimpan."
                                                );
                                                disableAll();
                                                btnBaruMaster.focus();
                                                modeProses = "";
                                                refetchKomposisi = true;
                                            }
                                        );
                                    });
                                }
                            );
                        }
                    );
                }
            });
        }
    } else if (modeProses == "koreksi") {
        deleteDetailFetch(slcKomposisi.value, () => {
            insertDetailFetch(() => {
                alert("Data berhasil tersimpan.");
                disableAll();
                btnBaruMaster.focus();
                modeProses = "";
            });
        });
    } else if (modeProses == "hapus") {
        let allowed = true;
        // SP_5298_EXT_CEK_KOMPOSISI
        fetchSelect("/Master/getCekKomposisi/" + slcKomposisi.value, (data) => {
            if (data.length > 0) {
                if (data[0].ada > 0) allowed = false;
            }

            if (allowed) {
                deleteDetailFetch(slcKomposisi.value, () => {
                    // SP_5298_EXT_DELETE_MASTER_KOMPOSISI
                    fetchStmt(
                        "/Master/delMasterKomposisi/" + slcKomposisi.value,
                        () => {
                            alert("Komposisi berhasil dihapus.");
                            disableAll();
                            btnBaruMaster.focus();
                            modeProses = "";
                            refetchKomposisi = true;
                        }
                    );
                });
            } else
                alert(
                    "Komposisi Tidak Boleh Dihapus Karena Sudah Dipakai Untuk Konversi!"
                );
        });
    } else if (modeProses == "hapus_detail") {
        let allowed = true;
        // SP_5298_EXT_CEK_KOMPOSISI
        fetchSelect("/Master/getCekKomposisi/" + slcKomposisi.value, (data) => {
            if (data.length > 0) {
                if (data[0].ada > 0) allowed = false;
            }

            if (allowed) {
                deleteDetailFetch(slcKomposisi.value, () => {
                    insertDetailFetch(() => {
                        alert("Data berhasil tersimpan.");
                        disableAll();
                        btnBaruMaster.focus();
                        modeProses = "";
                    });
                });
            } else
                alert(
                    "Type tidak dapat dihapus karena pernah digunakan untuk konversi."
                );
        });
    }
});

slcHP.addEventListener("mousedown", function () {
    if (refetchHP) {
        refetchHP = false;
        clearOptions(this, "Pilih Hasil Produksi");
        const errorOption = addLoadingOption(this);
        const optionKeys = {
            valueKey: "KodeBarang",
            textKey: "NamaType",
        };

        // SP_1273_PRG_TypeProduksi
        fetchSelect(
            "/Master/getPrgTypeProduksi/2/" + idHasilProduksi,
            (data) => {
                if (data.length > 0) {
                    addOptions(this, data, optionKeys);
                    this.removeChild(errorOption);
                } else refetchHP = true;
            },
            errorOption
        );
    }
});

slcHP.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        if (refetchHP) {
            refetchHP = false;
            clearOptions(this, "Pilih Hasil Produksi");
            const errorOption = addLoadingOption(this);
            const optionKeys = {
                valueKey: "KodeBarang",
                textKey: "NamaType",
            };

            // SP_1273_PRG_TypeProduksi
            fetchSelect(
                "/Master/getPrgTypeProduksi/2/" + idHasilProduksi,
                (data) => {
                    if (data.length > 0) {
                        addOptions(this, data, optionKeys);
                        this.removeChild(errorOption);
                    } else refetchHP = true;
                },
                errorOption
            );
        }
    }
});

slcHP.addEventListener("change", function () {
    slcNG.disabled = false;
    slcNG.focus();
});

slcNG.addEventListener("mousedown", function () {
    if (refetchNG) {
        refetchNG = false;
        clearOptions(this, "Pilih Hasil Produksi NG");
        const errorOption = addLoadingOption(this);
        const optionKeys = {
            valueKey: "KodeBarang",
            textKey: "NamaType",
        };

        // SP_1273_PRG_TypeProduksi
        fetchSelect(
            "/Master/getPrgTypeProduksi/3/" + idHasilProduksi,
            (data) => {
                if (data.length > 0) {
                    addOptions(this, data, optionKeys);
                    this.removeChild(errorOption);
                } else refetchNG = true;
            },
            errorOption
        );
    }
});

slcNG.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        if (refetchNG) {
            refetchNG = false;
            clearOptions(this, "Pilih Hasil Produksi NG");
            const errorOption = addLoadingOption(this);
            const optionKeys = {
                valueKey: "KodeBarang",
                textKey: "NamaType",
            };

            // SP_1273_PRG_TypeProduksi
            fetchSelect(
                "/Master/getPrgTypeProduksi/3/" + idHasilProduksi,
                (data) => {
                    if (data.length > 0) {
                        addOptions(this, data, optionKeys);
                        this.removeChild(errorOption);
                    } else refetchNG = true;
                },
                errorOption
            );
        }
    }
});

slcNG.addEventListener("change", function () {
    slcAF.disabled = false;
    slcAF.focus();
});

slcAF.addEventListener("mousedown", function () {
    if (refetchAF) {
        refetchAF = false;
        clearOptions(this, "Pilih Afalan");
        const errorOption = addLoadingOption(this);
        const optionKeys = {
            valueKey: "KodeBarang",
            textKey: "NamaType",
        };

        // SP_1273_PRG_TypeProduksi
        fetchSelect(
            "/Master/getPrgTypeProduksi/1/" + idAfalan,
            (data) => {
                if (data.length > 0) {
                    addOptions(this, data, optionKeys);
                    this.removeChild(errorOption);
                } else refetchAF = true;
            },
            errorOption
        );
    }
});

slcAF.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        if (refetchAF) {
            refetchAF = false;
            clearOptions(this, "Pilih Afalan");
            const errorOption = addLoadingOption(this);
            const optionKeys = {
                valueKey: "KodeBarang",
                textKey: "NamaType",
            };

            // SP_1273_PRG_TypeProduksi
            fetchSelect(
                "/Master/getPrgTypeProduksi/1/" + idAfalan,
                (data) => {
                    if (data.length > 0) {
                        addOptions(this, data, optionKeys);
                        this.removeChild(errorOption);
                    } else refetchAF = true;
                },
                errorOption
            );
        }
    }
});

slcAF.addEventListener("change", function () {
    jumlah = 0;
    listKomposisi.length = 0;
    clearTable_DataTable(
        "table_komposisi",
        colKomposisi.length,
        "padding=250px"
    );
    clearDataDetail("cadangan");
    numCadangan.value = 0;
    addOptionIfNotExists(slcObjek, idObjek, "Bahan dan Hasil Produksi");
    slcKelut.selectedIndex = 0;
    slcKelompok.selectedIndex = 0;
    slcType.selectedIndex = 0;
    slcSubkel.selectedIndex = 0;
    refetchKelut = true;
    btnTambahAfalan.disabled = false;
    btnTambahAfalan.focus();
});

btnTambahAfalan.addEventListener("click", function () {
    if (slcAF.selectedIndex == 0) {
        alert("Pilih Afalan terlebih dahulu.");
        btnTambahAfalan.focus();
    } else {
        let found = false;
        for (let i = 0; i < listAfalan.length; i++) {
            if (slcAF.value == listAfalan[i].KodeBarang) {
                found = true;
            }
        }

        if (found) {
            alert("Sudah ada Type yang sama dalam Komposisi.");
            slcAF.focus();
        } else {
            listAfalan.push({
                KodeBarang: slcAF.value,
                NamaType: slcAF.options[slcAF.selectedIndex].text
                    .split("|")[1]
                    .trim(),
            });

            addTable_DataTable(
                "table_afalan",
                listAfalan,
                null,
                null,
                null,
                "table_only"
            );

            slcKelut.disabled = false;
            slcKelut.focus();
        }
    }
});
//#endregion

//#region Functions
function getDataKomposisiFetch(no_komposisi, post_action = null) {
    jumlah = 0;
    listKomposisi.length = 0;
    clearTable_DataTable("table_komposisi", colKomposisi.length, [
        "padding=250px",
        "Memuat data...",
    ]);

    // SP_1273_EXT_LIST_KOMPOSISI_BAHAN
    fetchSelect("/Master/getListKomposisiBahanMjs/" + no_komposisi, (data) => {
        if (data.length <= 0) {
            clearTable_DataTable("table_komposisi", colKomposisi.length, [
                "padding=250px",
                "Data untuk <b>Komposisi " +
                    no_komposisi +
                    "</b> tidak ditemukan.",
            ]);
        } else {
            for (let i = 0; i < data.length; i++) {
                listKomposisi.push({
                    StatusType: data[i].StatusType,
                    IdType: data[i].IdType,
                    NamaType: data[i].NamaType,
                    JumlahPrimer: data[i].JumlahPrimer,
                    SatuanPrimer:
                        data[i].SatuanPrimer !== null
                            ? data[i].SatuanPrimer
                            : "Null",
                    JumlahSekunder: data[i].JumlahSekunder,
                    SatuanSekunder:
                        data[i].SatuanSekunder !== null
                            ? data[i].SatuanSekunder
                            : "Null",
                    JumlahTritier: data[i].JumlahTritier,
                    SatuanTritier:
                        data[i].SatuanTritier !== null
                            ? data[i].SatuanTritier
                            : "Null",
                    Persentase: data[i].Persentase,
                    IdObjek: data[i].IdObjek,
                    NamaObjek: data[i].NamaObjek,
                    IdKelompokUtama: data[i].IdKelompokUtama,
                    NamaKelompokUtama: data[i].NamaKelompokUtama,
                    IdKelompok: data[i].IdKelompok,
                    NamaKelompok: data[i].NamaKelompok,
                    IdSubKelompok: data[i].IdSubKelompok,
                    NamaSubKelompok: data[i].NamaSubKelompok,
                    KodeBarang: data[i].KodeBarang,
                    Cadangan: data[i].Cadangan,
                });

                addTable_DataTable(
                    "table_komposisi",
                    listKomposisi,
                    colKomposisi,
                    rowClickedFetch,
                    "350px"
                );
            }

            // SP_1273_MEX_CEK_JumlahKomposisi
            fetchSelect(
                "/Master/getCekJumlahKomposisi/2/" + slcKomposisi.value,
                (data) => {
                    if (data.length > 0) jumlah = data[0].Jumlah;
                    if (post_action != null) post_action();
                }
            );
        }
    });
}

function getSatuanFetch(id_type) {
    // SP_5298_EXT_DETAIL_BAHAN
    fetchSelect("/Master/getDetailBahan/" + id_type, (data) => {
        txtKodeBarang.value = data[0].KodeBarang;
        txtSatPrimer.value = data[0].satPrimer;
        txtSatSekunder.value = data[0].satSekunder;
        txtSatTritier.value = data[0].nama_satuan;
    });
}

function clearDataDetail(exception_ele = "") {
    listOfDetail.forEach((ele) => {
        if (ele.id != exception_ele) {
            if (ele.tagName == "INPUT") {
                ele.value = "";
            } else ele.selectedIndex = 0;
        }
    });
}

function clearDataMaster() {
    listOfMaster.forEach((slc) => (slc.selectedIndex = 0));
}

function disableDetail(exclusion_id = "") {
    listOfDetail.forEach((ele) => (ele.disabled = true));

    if (exclusion_id != "")
        document.getElementById(exclusion_id).disabled = false;
}

function disableAll() {
    txtNamaKomposisi.disabled = true;
    disableDetail();
    document.querySelectorAll("select").forEach((slc) => (slc.disabled = true));
    toggleButtons(1);
}

function toggleButtons(tmb) {
    switch (tmb) {
        case 1:
            slcKomposisi.disabled = true;
            btnBaruMaster.disabled = false;
            btnKoreksiMaster.disabled = false;
            btnHapusMaster.disabled = false;
            btnProses.disabled = true;
            btnKeluar.textContent = "Keluar";
            break;
        case 2:
            btnBaruMaster.disabled = true;
            btnKoreksiMaster.disabled = true;
            btnHapusMaster.disabled = true;
            btnProses.disabled = false;
            btnKeluar.textContent = "Batal";
            break;

        default:
            break;
    }
}

function insertDetailFetch(post_action = null) {
    for (let i = 0; i < listKomposisi.length; i++) {
        // SP_5298_EXT_INSERT_KOMPOSISI_BAHAN
        fetchStmt(
            "/Master/insKomposisiBahan/" +
                slcKomposisi.value.trim() +
                "/" +
                listKomposisi[i].IdObjek.trim() +
                "/" +
                listKomposisi[i].NamaObjek.replace(/ /g, "_") +
                "/" +
                listKomposisi[i].IdKelompokUtama.trim() +
                "/" +
                listKomposisi[i].NamaKelompokUtama.trim().replace(/ /g, "_") +
                "/" +
                listKomposisi[i].IdKelompok.trim() +
                "/" +
                listKomposisi[i].NamaKelompok.trim().replace(/ /g, "_") +
                "/" +
                listKomposisi[i].IdSubKelompok.trim() +
                "/" +
                listKomposisi[i].NamaSubKelompok.trim().replace(/ /g, "_") +
                "/" +
                listKomposisi[i].IdType.trim() +
                "/" +
                listKomposisi[i].NamaType.trim().replace(/ /g, "_") +
                "/" +
                listKomposisi[i].KodeBarang +
                "/" +
                listKomposisi[i].JumlahPrimer +
                "/" +
                listKomposisi[i].SatuanPrimer.trim() +
                "/" +
                listKomposisi[i].JumlahSekunder +
                "/" +
                listKomposisi[i].SatuanSekunder.trim() +
                "/" +
                listKomposisi[i].JumlahTritier +
                "/" +
                listKomposisi[i].SatuanTritier.trim() +
                "/" +
                listKomposisi[i].Persentase +
                "/" +
                listKomposisi[i].StatusType.trim() +
                "/" +
                listKomposisi[i].Cadangan,
            () => {
                if (listKomposisi[i].Cadangan == 0) {
                    // SP_1273_MEX_INSERT_KOMPOSISI_BAHAN Kode 1
                    fetchStmt(
                        "/Master/insKomposisiBahanMjs/1/" +
                            slcKomposisi.value.trim() +
                            "/" +
                            listKomposisi[i].IdType.trim() +
                            "/" +
                            slcHP.value.trim() +
                            "/" +
                            idDivisi +
                            "/" +
                            listKomposisi[i].Persentase +
                            "/" +
                            listKomposisi[i].JumlahPrimer +
                            "/" +
                            listKomposisi[i].JumlahSekunder +
                            "/" +
                            listKomposisi[i].JumlahTritier +
                            "/0"
                    );
                }

                if (listKomposisi[i].Cadangan >= 1) {
                    // SP_1273_MEX_INSERT_KOMPOSISI_BAHAN Kode 1
                    fetchStmt(
                        "/Master/insKomposisiBahanMjs/1/" +
                            slcKomposisi.value.trim() +
                            "/" +
                            listKomposisi[i].IdType.trim() +
                            "/" +
                            slcHP.value.trim() +
                            "/" +
                            idDivisi +
                            "/" +
                            listKomposisi[i].Persentase +
                            "/" +
                            listKomposisi[i].JumlahPrimer +
                            "/" +
                            listKomposisi[i].JumlahSekunder +
                            "/" +
                            listKomposisi[i].JumlahTritier +
                            "/" +
                            listKomposisi[i].Cadangan
                    );
                }

                if (i == listKomposisi.length - 1) {
                    if (listAfalan.length > 0) {
                        for (let j = 0; j < listAfalan.length; j++) {
                            // SP_1273_MEX_INSERT_KOMPOSISI_BAHAN Kode 2
                            fetchStmt(
                                "/Master/insKomposisiBahanMjs/2/" +
                                    slcKomposisi.value.trim() +
                                    "/null/" +
                                    listAfalan[j].KodeBarang.trim() +
                                    "/" +
                                    idDivisi
                            );

                            if (j == listAfalan.length - 1) {
                                if (post_action != null) post_action();
                            }
                        }
                    } else {
                        if (post_action != null) post_action();
                    }
                }
            }
        );
    }
}

function deleteDetailFetch(id_komposisi, post_action = null) {
    // SP_1273_MEX_DELETE_KOMPOSISI_BAHAN
    fetchStmt("/Master/delKomposisiBahanMjs/" + id_komposisi.trim(), () => {
        if (post_action != null) post_action();
    });
}

function rowClickedFetch(row, data, _) {
    if (
        pilKomposisi ==
        findClickedRowInList(listKomposisi, "IdType", data.IdType)
    ) {
        row.style.background = "white";
        pilKomposisi = -1;

        if (modeProses != "") {
            clearDataDetail("select_objek");
            disableDetail();

            if (modeProses == "koreksi") {
                slcKelut.disabled = false;
                slcKelut.focus();
                numPersentase.disabled = false;
                numCadangan.disabled = false;
            }
        }
    } else {
        pilKomposisi = findClickedRowInList(
            listKomposisi,
            "IdType",
            data.IdType
        );

        clearSelection_DataTable("table_komposisi");
        row.style.background = "aliceblue";

        if (modeProses != "") {
            numPrimer.value = data.JumlahPrimer;
            txtSatPrimer.value = data.SatuanPrimer;
            numSekunder.value = data.JumlahSekunder;
            txtSatSekunder.value = data.SatuanSekunder;
            numTritier.value = data.JumlahTritier;
            txtSatTritier.value = data.SatuanTritier;
            numPersentase.value = data.Persentase;
            numPersentase2.value = data.Persentase;
            txtKodeBarang.value = data.KodeBarang;
            numCadangan.value = data.Cadangan;
            numCadangan2.value = data.Cadangan;

            addOptionIfNotExists(
                slcType,
                data.IdType,
                data.IdType + " | " + data.NamaType
            );

            addOptionIfNotExists(
                slcObjek,
                data.IdObjek,
                data.IdObjek + " | " + data.NamaObjek
            );

            addOptionIfNotExists(
                slcKelut,
                data.IdKelompokUtama,
                data.IdKelompokUtama + " | " + data.NamaKelompokUtama
            );

            addOptionIfNotExists(
                slcKelompok,
                data.IdKelompok,
                data.IdKelompok + " | " + data.NamaKelompok
            );

            addOptionIfNotExists(
                slcSubkel,
                data.IdSubKelompok,
                data.IdSubKelompok + " | " + data.NamaSubKelompok
            );

            if (modeProses == "baru") {
                numPrimer.disabled = false;
                numPrimer.select();
            } else btnHapusDetail.focus();
        }
    }
}
//#endregion

function init() {
    console.log("idDivisi = " + idDivisi);
    console.log("idKelompok = " + idKelompok);
    console.log("idBahanBaku = " + idBahanBaku);
    console.log("idBahanPembantu = " + idBahanPembantu);
    console.log("idHasilProduksi = " + idHasilProduksi);
    console.log("idAfalan = " + idAfalan);

    $("#table_afalan").DataTable({
        responsive: true,
        paging: false,
        scrollY: "250px",
        scrollX: "",
        searching: false,
        info: false,
    });

    tableKomposisi = $("#table_komposisi").DataTable({
        responsive: true,
        paging: false,
        scrollY: "350px",
        scrollX: "1000000px",
        columns: colKomposisi,
        searching: false,
        info: false,
    });

    tableKomposisi.on("blur", function () {
        removeNavigation_DataTable([tableKomposisi]);
    });

    clearTable_DataTable("table_afalan", 2);
    clearTable_DataTable(
        "table_komposisi",
        colKomposisi.length,
        "padding=25vw"
    );

    btnBaruMaster.focus();
}

document.addEventListener("keydown", function (e) {
    if (
        e.key === "ArrowDown" ||
        e.key === "ArrowUp" ||
        e.key === "Home" ||
        e.key === "End"
    ) {
        e.preventDefault();
    }
});

$(document).ready(() => init());

// function rowEventHandler(index, data, focus = false) {
//     pilKomposisi = index;
//     if (modeProses != "") {
//         numPrimer.value = data.JumlahPrimer;
//         txtSatPrimer.value = data.SatuanPrimer;
//         numSekunder.value = data.JumlahSekunder;
//         txtSatSekunder.value = data.SatuanSekunder;
//         numTritier.value = data.JumlahTritier;
//         txtSatTritier.value = data.SatuanTritier;
//         numPersentase.value = data.Persentase;
//         numPersentase2.value = data.Persentase;
//         txtKodeBarang.value = data.KodeBarang;
//         numCadangan.value = data.Cadangan;
//         numCadangan2.value = data.Cadangan;

//         addOptionIfNotExists(
//             slcType,
//             data.IdType,
//             data.IdType + " | " + data.NamaType
//         );

//         addOptionIfNotExists(
//             slcObjek,
//             data.IdObjek,
//             data.IdObjek + " | " + data.NamaObjek
//         );

//         addOptionIfNotExists(
//             slcKelut,
//             data.IdKelompokUtama,
//             data.IdKelompokUtama + " | " + data.NamaKelompokUtama
//         );

//         addOptionIfNotExists(
//             slcKelompok,
//             data.IdKelompok,
//             data.IdKelompok + " | " + data.NamaKelompok
//         );

//         addOptionIfNotExists(
//             slcSubkel,
//             data.IdSubKelompok,
//             data.IdSubKelompok + " | " + data.NamaSubKelompok
//         );

//         if (modeProses == "baru") {
//             numPrimer.disabled = false;
//             if (focus) numPrimer.select();
//         } else if (focus) btnHapusDetail.focus();
//     }
// }
