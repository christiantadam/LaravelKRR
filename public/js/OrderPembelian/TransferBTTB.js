let nomor_purchaseOrder = document.getElementById("nomor_purchaseOrder");
let no_bttb = document.getElementById("no_bttb");
let tanggal = document.getElementById("tanggal");
let table_transferBTTB = document.getElementById("table_transferBTTB");
let no_terima = document.getElementById("no_terima");
let kode_barang = document.getElementById("kode_barang");
let nama_barang = document.getElementById("nama_barang");
let no_pib = document.getElementById("no_pib");
let keterangan = document.getElementById("keterangan");
let qty_terima = document.getElementById("qty_terima");
let ket_qtyTerima = document.getElementById("ket_qtyTerima");
let qty_premier = document.getElementById("qty_premier");
let ket_qtyPremier = document.getElementById("ket_qtyPremier");
let qty_sekunder = document.getElementById("qty_sekunder");
let ket_qtySekunder = document.getElementById("ket_qtySekunder");
let qty_tertier = document.getElementById("qty_tertier");
let ket_qtyTertier = document.getElementById("ket_qtyTertier");
let divisi_select = document.getElementById("divisi_select");
let ket_divisi = document.getElementById("ket_divisi");
let objek_select = document.getElementById("objek_select");
let ket_objek = document.getElementById("ket_objek");
let kelompok_utama = document.getElementById("kelompok_utama");
let ket_kelompokUtama = document.getElementById("ket_kelompokUtama");
let kelompok = document.getElementById("kelompok");
let ket_kelompok = document.getElementById("ket_kelompok");
let sub_kelompok = document.getElementById("sub_kelompok");
let ket_subKelompok = document.getElementById("ket_subKelompok");
let idType = document.getElementById("idType");
let saldo_premier = document.getElementById("saldo_premier");
let ket_saldoPremier = document.getElementById("ket_saldoPremier");
let saldo_sekunder = document.getElementById("saldo_sekunder");
let ket_saldoSekunder = document.getElementById("ket_saldoSekunder");
let saldo_tertier = document.getElementById("saldo_tertier");
let ket_saldoTertier = document.getElementById("ket_saldoTertier");
let btn_transfer = document.getElementById("btn_transfer");
let btn_koreksi = document.getElementById("btn_koreksi");
const container = document.getElementById("formContainer");
const elements = Array.from(
    container.querySelectorAll("input, select, button")
);

let csrfToken = $('meta[name="csrf-token"]').attr("content");
let NoTransTmp;

tanggal.valueAsDate = new Date();
btn_koreksi.disabled = true;

function clearOptions(selectElement) {
    let length = selectElement.options.length;

    for (let i = length - 1; i > 0; i--) {
        selectElement.remove(i);
    }
}
function optionClr() {
    divisi_select.selectedIndex = 0;
    clearOptions(divisi_select);
    objek_select.selectedIndex = 0;
    clearOptions(objek_select);
}
objek_select.addEventListener("change", function (event) {
    ket_objek.value = objek_select.value;
    if (objek_select.selectedIndex != 0) {
        let noPIBs = "";
        if (no_pib.value !== "") {
            noPIBs = no_pib.value.trim();
        }
        $.ajax({
            url: "/TransferBarang/TransferBTTB/LoadKelomDLL",
            type: "GET",
            data: {
                KodeBarang: kode_barang.value.trim(),
                idObjek: ket_objek.value.trim(),
                noPIB: noPIBs ?? null,
            },
            success: function (response) {
                console.log(response);
                kelompok_utama.value = response[0].NamaKelompokUtama;
                ket_kelompokUtama.value = response[0].IdKelompokUtama;
                kelompok.value = response[0].NamaKelompok;
                ket_kelompok.value = response[0].IdKelompok;
                sub_kelompok.value = response[0].NamaSubKelompok;
                ket_subKelompok.value = response[0].IdSubkelompok;
                idType.value = response[0].IdType;
                saldo_premier.value = parseFloat(response[0].SaldoPrimer);
                saldo_sekunder.value = parseFloat(response[0].SaldoSekunder);
                saldo_tertier.value = parseFloat(response[0].SaldoTritier);
                ket_saldoPremier.value = response[0].SatPrimer;
                ket_saldoSekunder.value = response[0].SatSekunder;
                ket_saldoTertier.value = response[0].SatTritier;
                if (idType.value == "") {
                    alert(
                        "Kode barang" +
                            kode_barang.value +
                            " belum ada di Subkelompok: Item Pembelian divisi: " +
                            ket_divisi.value +
                            ". Hubungi admin divisi terkait untuk maintenance type terlebih dahulu di program Inventory."
                    );
                }
                btn_koreksi.disabled = false;
                btn_transfer.disabled = false;
            },
            error: function (error) {
                console.error("Error Fetch Data:", error);
            },
        });
    }
});

divisi_select.addEventListener("change", function (event) {
    ket_divisi.value = divisi_select.value;
    objek_select.selectedIndex = 0;
    clearOptions(objek_select);

    if (divisi_select.selectedIndex != 0) {
        $.ajax({
            url: "/TransferBarang/TransferBTTB/DataObjek",
            type: "GET",
            data: {
                KodeBarang: kode_barang.value.trim(),
                XIdDivisi: ket_divisi.value.trim(),
            },
            success: function (response) {
                if (response.length != 0) {
                    response.forEach(function (data) {
                        let option = document.createElement("option");
                        option.value = data.IdObjek;
                        option.text = data.NamaObjek;
                        objek_select.add(option);
                    });
                } else {
                    alert(
                        "Kode Barang Belum di Maintenance Type Pada Divisi Tersebut !"
                    );
                }
            },
            error: function (error) {
                console.error("Error Fetch Data:", error);
            },
        });
    }
});

btn_koreksi.addEventListener("click", function (event) {
    $.ajax({
        url: "/TransferBarang/TransferBTTB/Koreksi",
        type: "PUT",
        headers: {
            "X-CSRF-TOKEN": csrfToken,
        },
        data: {
            IdType: idType.value.trim(),
            MasukPrimer: qty_premier.value,
            MasukSekunder: qty_sekunder.value,
            MasukTritier: qty_tertier.value,
            SubKel: ket_subKelompok.value,
            NoTransTmp: NoTransTmp,
            ket: keterangan.value,
        },
        success: function (response) {
            Swal.fire({
                icon: "success",
                title: "Data Berhasil DiKoreksi!",
                showConfirmButton: false,
                timer: "2000",
            });
            console.log(response);
        },
        error: function (error) {
            Swal.fire({
                icon: "error",
                title: "Data Tidak Berhasil DiKoreksi!",
                showConfirmButton: false,
                timer: "2000",
            });
            console.error("Error Send Data:", error);
        },
    });
});

btn_transfer.addEventListener("click", function (event) {
    $.ajax({
        url: "/TransferBarang/TransferBTTB/Transfer",
        type: "POST",
        headers: {
            "X-CSRF-TOKEN": csrfToken,
        },
        data: {
            IdType: idType.value.trim(),
            MasukPrimer: qty_premier.value,
            MasukSekunder: qty_sekunder.value,
            MasukTritier: qty_tertier.value,
            SubKel: ket_subKelompok.value,
            NoTerima: no_terima.value,
            ket: keterangan.value,
            YTanggal: tanggal.value,
            NoPib: no_pib.value,
        },
        success: function (response) {
            Swal.fire({
                icon: "success",
                title: "Data Berhasil DiTransfer!",
                showConfirmButton: false,
                timer: "2000",
            }).then(() => {
                // Redirect after the timer expires
                window.close();
            });
        },
        error: function (error) {
            Swal.fire({
                icon: "error",
                title: "Data Tidak Berhasil DiTransfer!",
                showConfirmButton: false,
                timer: "2000",
            });
            console.error("Error Send Data:", error);
        },
    });
});

container.addEventListener("keydown", function (event) {
    if (event.key === "Tab") {
        event.preventDefault();
        const currentIndex = elements.indexOf(document.activeElement);
        let nextIndex = currentIndex;

        do {
            nextIndex = (nextIndex + 1) % elements.length;
        } while (
            elements[nextIndex].hasAttribute("readonly") ||
            elements[nextIndex].disabled
        );

        elements[nextIndex].focus();
    }
});

function clearData() {
    tanggal.valueAsDate = new Date();
    no_terima.value = "";
    kode_barang.value = "";
    nama_barang.value = "";
    keterangan.value = "";
    qty_terima.value = "0";
    ket_qtyTerima.value = "null";
    qty_premier.value = "0";
    ket_qtyPremier.value = "null";
    qty_sekunder.value = "0";
    ket_qtySekunder.value = "null";
    qty_tertier.value = "0";
    ket_qtyTertier.value = "null";
    optionClr();
    kelompok_utama.value = "";
    kelompok.value = "";
    sub_kelompok.value = "";
    idType.value = "";
    saldo_premier.value = "";
    ket_saldoPremier.value = "";
    saldo_sekunder.value = "";
    ket_saldoSekunder.value = "";
    saldo_tertier.value = "";
    ket_saldoTertier.value = "";
}

function divisi(KodeBarang) {
    $.ajax({
        url: "/TransferBarang/TransferBTTB/DataDivisi",
        type: "GET",
        data: {
            KodeBarang: KodeBarang,
        },
        success: function (response) {
            if (response.length != 0) {
                optionClr();
                response.forEach(function (data) {
                    let option = document.createElement("option");
                    option.value = data.IdDivisi;
                    option.text = data.NamaDivisi;
                    divisi_select.add(option);
                });
            } else {
                alert("Kode Barang Belum di Maintenance Type Oleh User Order");
            }
        },
        error: function (error) {
            console.error("Error Fetch Data:", error);
        },
    });
}

function loadSatuan(KodeBarang) {
    $.ajax({
        url: "/TransferBarang/TransferBTTB/LoadSatuan",
        type: "GET",
        data: {
            kdbrg: KodeBarang,
        },
        success: function (response) {
            console.log(response);
            qty_premier.value = parseFloat(response[0].ST_PRIM);
            qty_sekunder.value = parseFloat(response[0].ST_SEK);
            ket_qtyPremier.value = response[0].Primer.replace(/\s/g, "");
            ket_qtySekunder.value = response[0].Sekunder.replace(/\s/g, "");
            ket_qtyTertier.value = response[0].Tertier.replace(/\s/g, "");

            if (response[0].Primer.replace(/\s/g, "") != "NULL") {
                qty_premier.readOnly = false;
            }
            if (response[0].Sekunder.replace(/\s/g, "") != "NULL") {
                qty_sekunder.readOnly = false;
            }
            if (response[0].Tertier.replace(/\s/g, "") != "NULL") {
                qty_tertier.readOnly = false;
            }
        },
        error: function (error) {
            console.error("Error Fetch Data:", error);
        },
    });
}
$(document).ready(function () {
    if (koreksi == 0) {
        btn_koreksi.style.display = "none";
    } else {
        btn_transfer.style.display = "none";
    }
    let table = $("#table_transferBTTB").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        searching: false,
        scrollY: "200px",
        paging: false,
        scrollX: true,
        ajax: {
            url: "/TransferBarang/TransferBTTB/LoadData",
            type: "GET",
            data: function (data) {
                (data.noBTTB = no_bttb.value), (data.koreksi = koreksi);
            },
        },
        columns: [
            { data: "No_terima" },
            { data: "nama_kategori" },
            { data: "nama_sub_kategori" },
            { data: "Kd_brg" },
            { data: "NAMA_BRG" },
            { data: "Qty_Terima" },
            { data: "Nama_satuan" },
            { data: "NoPIBExt" },
        ],
        rowCallback: function (row, data) {
            console.log(data);

            $(row).on("dblclick", function (event) {
                clearData();
                no_terima.value = data.No_terima;
                kode_barang.value = data.Kd_brg;
                nama_barang.value = data.NAMA_BRG.replace(/&lt;/g, "<").replace(
                    /&gt;/g,
                    ">"
                );
                qty_terima.value = parseFloat(data.Qty_Terima);
                ket_qtyTerima.value = data.Nama_satuan;
                no_pib.value = data.NoPIBExt;
                divisi(data.Kd_brg.trim());
                loadSatuan(data.Kd_brg.trim());
                if (koreksi == 1) {
                    NoTransTmp = data.NoTransaksiTmp;
                }
            });
        },
    });

    table.on("dblclick", "tbody tr", (e) => {
        const classList = e.currentTarget.classList;

        if (classList.contains("selected")) {
            classList.remove("selected");
        } else {
            table
                .rows(".selected")
                .nodes()
                .each((row) => row.classList.remove("selected"));
            classList.add("selected");
        }
    });
});
