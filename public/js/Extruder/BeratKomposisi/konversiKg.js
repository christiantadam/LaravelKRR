//#region Variables
const rdoKg = document.getElementById("rdo_kg");
const rdoYard = document.getElementById("rdo_yard");
const txtKode = document.getElementById("kode_barang");
const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");

const listKonversi = [];
/* ISI LIST KONVERSI
    0 No.
    1 KodeBarang
    2 Ket.
*/
//#endregion

//#region Events
btnProses.addEventListener("click", function () {
    if (txtKode.value == "") {
        alert("Inputkan Kode Barang Yang Akan diSimpan Terlebih Dahulu");
        txtKode.select();
        return;
    }

    if (rdoKg.checked) {
        fetchStmt(
            "/komposisiKonversi/SP_1273_PRG_UPDATE_KONVERSI_1/1~" +
                txtKode.value,
            () => {
                alert("Konversi dalam Kg Sukses diSimpan");
                showData();
                txtKode.select();
            }
        );
    } else {
        fetchStmt(
            "/komposisiKonversi/SP_1273_PRG_UPDATE_KONVERSI_1/2~" +
                txtKode.value,
            () => {
                alert("Konversi dalam Yard Sukses diSimpan");
                showData();
                txtKode.select();
            }
        );
    }
});

txtKode.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (this.value.trim() != "") {
            let kode = "000000000";
            kode += this.value.toUpperCase();
            kode = kode.slice(-9);
            this.value = kode;
            cekKode(kode);
        } else {
            alert("Inputkan Kode Barang Terlebih Dahulu");
            this.select();
        }
    }
});
//#endregion

//#region Functions
function showData() {
    listKonversi.length = 0;
    let ket = "";
    fetchSelect("/komposisiKonversi/SP_1273_PRG_ListKonversi_1~1/_", (data) => {
        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                ket = data[i].JualKg == "Y" ? "Kg" : "Yard";
                listKonversi.push({
                    No: i + 1,
                    KodeBarang: data[i].KodeBarang,
                    Ket: ket,
                });

                addTable_DataTable(
                    "table_konversi",
                    listKonversi,
                    null,
                    "350px"
                );
            }
        }
    });
}

function cekKode(kode) {
    fetchSelect(
        "/komposisiKonversi/SP_1273_PRG_ListKonversi_1/2~" + kode,
        (data) => {
            if (data.length > 0) {
                if (data[0].Ada == 0) {
                    alert(
                        "Maaf Kode Barang Yang Anda Inputkan Bukan Kode Barang Cloth atau Assesoris!"
                    );

                    txtKode.value = "";
                    txtKode.focus();
                } else btnProses.focus();
            }
        }
    );
}
//#endregion

function init() {
    $("#table_konversi").DataTable({
        responsive: true,
        paging: false,
        scrollY: "350px",
        scrollX: "",
        dom: '<"row"<"col-sm-6"i><"col-sm-6"f>>' + '<"row"<"col-sm-12"tr>>',
        language: {
            searchPlaceholder: " Tabel konversi...",
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

    clearTable_DataTable("table_konversi", 3);
    showData();
    txtKode.select();
}

$(document).ready(() => init());
