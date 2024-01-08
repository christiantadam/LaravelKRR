//#region Variables
const slcDivisi = document.getElementById("select_divisi");
const txtNoBarcode = document.getElementById("no_barcode");
const spnBarcode = document.getElementById("btn_barcode");
const hidData = document.getElementById("hidden_ku");

const rdoNganjuk = document.getElementById("radio_nganjuk");
const rdoMjs = document.getElementById("radio_mojosari");
const divTujuan = document.getElementById("bagian_tujuan");

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
        if (this.value.trim() == "JBB") {
            divTujuan.classList.remove("hidden");
        } else divTujuan.classList.add("hidden");

        txtNoBarcode.value = "";
        txtNoBarcode.focus();
    } else {
        alert("Pilih Dulu Divisinya !!...");

        this.focus();
        divTujuan.classList.add("hidden");
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
            cekBarcodeDispatch(kode_barang, no_indeks);
        } else alert("Scan Barcode Terlebih Dahulu!");
    }
});

btnLihat.addEventListener("click", function () {
    if (slcDivisi.selectedIndex == 0) {
        alert("Pilih Dulu Divisinya");
        slcDivisi.focus();
    } else {
        hidDivisi.value = slcDivisi.value;
        LD_formData.kode = [3, 5];
        LD_formData.title = "Lihat Data Assesoris";
        $("#form_lihat_data").modal("show");
    }
});

btnProses.addEventListener("click", function () {
    if (listKirim.length == 0) {
        alert("Scan Barcode Terlebih Dahulu !!!");
        txtNoBarcode.value = "";
        txtNoBarcode.focus();
        return;
    }

    if (slcDivisi.value.trim() == "JBB") {
        if (!rdoMjs.checked || !rdoNganjuk.checked) {
            alert("Pilih Tujuan Pengiriman Terlebih Dahulu !");
            return;
        }
    }

    for (let i = 0; i < data.length; i++) {
        let no_barcode = listKirim[i].NoBarcode;
        let no_indeks = no_barcode.substring(0, 9).replace(/^0+/, "");
        let kode_barang = no_barcode.substring(no_barcode.length - 9);
        let divisi = listKirim[i].IdDivisi;

        if (slcDivisi.value.trim() == "JBB") {
            if (rdoMjs.checked) {
                divisi = "JBB";
            } else if (rdoNganjuk.checked) {
                divisi = "JBK";
            }
        }

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

hidData.addEventListener("change", function () {
    let [sts, kode_barang, no_indeks] = this.value.split(",");
    if (sts == 3 || sts == 1) {
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
    } else if (sts == 2) {
        alert("Barcode Sudah Dikirim Ke Gudang!");
    } else alert("Data Barcode Tidak Ditemukan!");
});
//#endregion

//#region Functions
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
    let [type, id_type] = ["", ""];
    let [primer, sekunder, tritier] = [0, 0, 0];
    let [tanggal, divisi] = ["", ""];

    fetchSelect(
        "/warehouseTerima/SP_1273_INV_TampilDataBarang_Mojo/" +
            kode_barang +
            "~" +
            no_indeks,
        (data) => {
            for (let i = 0; i < data.length; i++) {
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
                    IdDivisi: data[i].iddivisi_objek,
                });

                type = data[i].namatype;
                id_type = data[i].idtype;
                primer = data[i].qty_primer;
                sekunder = data[i].qty_sekunder;
                tritier = data[i].qty;
                tanggal = dateTimeToDate(data[i].tgl_mutasi);
                divisi = data[i].iddivisi_objek;

                buatRekapFetch(
                    id_type,
                    type,
                    tanggal,
                    [primer, sekunder, tritier],
                    divisi
                );
            }

            addTable_DataTable("table_kirim", listKirim, colKirim);
            spnBarcode.textContent = listKirim.length;
            txtNoBarcode.value = "";
            txtNoBarcode.focus();
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
                "/warehouseTerima/SP_1273_INV_SimpanPermohonanKirimKeMojosari/" +
                    kode_barang +
                    "~" +
                    no_indeks +
                    "~" +
                    divisi +
                    "~" +
                    status,
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
    addOptionIfNotExists(slcDivisi, "JBB", "JBB | Jumbo Bag");
}

$(document).ready(() => init());

btnKeluar.addEventListener("click", function () {
    window.location.href = "/Extruder/WarehouseTerima";
});
