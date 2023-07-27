//#region Document get element by id

let add_button = document.getElementById("add_button");
let cargo_ready = document.getElementById("cargo_ready");
var cekSP;
let customer = document.getElementById("customer");
let delete_button = document.getElementById("delete_button");
let div_detailSuratPesanan = document.getElementById("div_detailSuratPesanan");
let div_tabelSuratPesanan = document.getElementById("div_tabelSuratPesanan");
let edit_button = document.getElementById("edit_button");
let general_specification = document.getElementById("general_specification");
let hapus_button = document.getElementById("hapus_button");
let harga_satuan = document.getElementById("harga_satuan");
let isi_button = document.getElementById("isi_button");
let jenis_barang = document.getElementById("jenis_barang");
let jenis_harga = document.getElementById("jenis_harga");
let kelompok = document.getElementById("kelompok");
let kelompok_utama = document.getElementById("kelompok_utama");
let keterangan_barang = document.getElementById("keterangan_barang");
let kode_barang = document.getElementById("kode_barang");
let lihat_spButton = document.getElementById("lihat_spButton");
let list_view = $("#list_view").DataTable();
let table_listView = document.getElementById("list_view");
let mata_uang = document.getElementById("mata_uang");
let methodForm = document.getElementById("methodForm");
let nama_barang = document.getElementById("nama_barang");
let no_pi = document.getElementById("no_pi");
let no_po = document.getElementById("no_po");
let no_spText = document.getElementById("no_spText");
let payment_terms = document.getElementById("payment_terms");
let ppn = document.getElementById("ppn");
let proses = 0;
let qty_pesan = document.getElementById("qty_pesan");
let remarks_packing = document.getElementById("remarks_packing");
let remarks_price = document.getElementById("remarks_price");
let remarks_quantity = document.getElementById("remarks_quantity");
let rencana_kirim = document.getElementById("rencana_kirim");
let saldo_awal = document.getElementById("saldo_awal");
let sales = document.getElementById("sales");
let satuan_gudangPrimer = document.getElementById("satuan_gudangPrimer");
let satuan_gudangSekunder = document.getElementById("satuan_gudangSekunder");
let satuan_gudangTritier = document.getElementById("satuan_gudangTritier");
let satuan_jual = document.getElementById("satuan_jual");
let size_code = document.getElementById("size_code");
let sub_kelompok = document.getElementById("sub_kelompok");
let tgl_pesan = document.getElementById("tgl_pesan");
let update_button = document.getElementById("update_button");
let no_spSelect = document.getElementById("no_spSelect");
//#endregion

//#region Load Form

rencana_kirim.valueAsDate = new Date();
tgl_pesan.valueAsDate = new Date();
isi_button.focus();
disableInputs();

//#endregion

//#region Set Input Filter

setInputFilter(
    document.getElementById("qty_pesan"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);

setInputFilter(
    document.getElementById("harga_satuan"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);

//#endregion

//#region Add Event Listener

isi_button.addEventListener("click", async function (event) {
    event.preventDefault();
    if (no_spText.value.trim() !== "") {
        let no_spData = no_spText.value.replace(/\//g, ".");
        var cekSP = await cek_No_SP(no_spData); // Wait for the result of the async function
    }
    // console.log(checkInputs());
    if (checkInputs()) {
        return; //Pengecekan karakter "|" pada beberapa kolom isian untuk proses data
    }
    // console.log(checkInputs(inputIds));
    if (proses == 0) {
        enableInputs();
        hapus_button.innerHTML = "Batal";
        edit_button.style.display = "none";
        this.innerHTML = "Proses";
        tgl_pesan.focus();
        mata_uang.selectedIndex = 3;
        ppn.selectedIndex = 1;
        proses = 1; //proses isi
    } else if (proses == 1) {
        // console.log(cekSP);
        if (cekSP >= 1) {
            // console.log("nomor sp sudah ada!");
            alert(
                "NOMER SP SUDAH PERNAH ADA.. , KLIK JENIS SURAT PESANANNYA LAGI"
            );
            no_spText.focus();
            return;
        } else {
            form_suratPesanan.submit(); //Untuk Store// Perform the action for cekSP === 0
        }
    } else if (proses == 2) {
        if (cekSP >= 1) {
            methodForm.value = "PUT";
            form_suratPesanan.action = "/SuratPesananEkspor/" + no_spData;
            form_suratPesanan.submit(); //Untuk Update
        } else {
            alert("NOMER SP TIDAK DITEMUKAN");
            no_spText.focus();
            return;
        }
    } else if (proses == 3) {
        if (cekSP >= 1) {
            methodForm.value = "DELETE";
            form_suratPesanan.action = "/SuratPesananEkspor/" + no_spData;
            form_suratPesanan.submit(); //Untuk Destroy
        } else {
            alert("NOMER SP TIDAK DITEMUKAN");
            no_spText.focus();
            return;
        }
    }
});

edit_button.addEventListener("click", function (event) {
    event.preventDefault();
    enableInputs();
    hapus_button.innerHTML = "Batal";
    isi_button.innerHTML = "Proses";
    edit_button.style.display = "none";
    lihat_spButton.focus();
    proses = 2; //proses edit
});

hapus_button.addEventListener("click", function (event) {
    event.preventDefault();
    if (proses == 0) {
        enableInputs();
        hapus_button.innerHTML = "Batal";
        isi_button.innerHTML = "Proses";
        edit_button.style.display = "none";
        lihat_spButton.focus();
        proses = 3; //proses hapus
    } else {
        disableInputs();
        this.innerHTML = "Hapus";
        isi_button.innerHTML = "Isi";
        edit_button.style.display = "block";
        isi_button.focus();
        no_spSelect.style.display = "none";
        no_spText.style.display = "inline-block";
        proses = 0; //proses belum ada
    }
});

no_spSelect.addEventListener("change", function () {
    if (this.selectedIndex !== 0) {
        this.setCustomValidity("Tekan Enter!");
        this.reportValidity();
    }
});

no_spSelect.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        if (this.selectedIndex !== 0) {
            no_spText.value = this.value;
            this.disabled = true;
            const enterEvent = new KeyboardEvent("keypress", { key: "Enter" });
            no_spText.dispatchEvent(enterEvent);
        }
    }
});

no_spText.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        fetch("/editSPEkspor/" + no_spText.value)
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
            });
        tgl_pesan.focus();
        if (proses == 3) {
            isi_button.focus();
        }
    }
});

add_button.addEventListener("click", function (event) {
    event.preventDefault();
    if (kode_barang.value == "") {
        alert("Tidak Ada Barang yang Ditambahkan!");
        kelompok_utama.focus();
        return;
    }
    if (parseFloat(qty_pesan.value) < 0 || qty_pesan.value == "") {
        alert("Koreksi jumlah barang!");
        qty_pesan.focus();
        return;
    }
    if (jenis_barang.selectedIndex === -1 || jenis_barang.selectedIndex === 0) {
        alert("Pilih jenis barang!");
        jenis_barang.focus();
        return;
    }
    if (harga_satuan.value < 0 || harga_satuan.value == "") {
        alert("Harga satuan harap diisi");
        harga_satuan.focus();
        return;
    }
    const arraydata = [
        nama_barang.options[nama_barang.selectedIndex].text,
        jenis_barang.options[jenis_barang.selectedIndex].text,
        formatangka(parseFloat(harga_satuan.value)),
        formatangka(parseInt(qty_pesan.value)),
        satuan_jual.options[satuan_jual.selectedIndex].text,
        general_specification.value,
        keterangan_barang.value,
        size_code.value,
        rencana_kirim.value,
        ppn.value,
        jenis_barang.value,
        kode_barang.value,
        nama_barang.value,
    ];
    funcInsertRow(arraydata);
    clearDetailBarang();
    let confirmation = confirm("Apakah ingin menambah barang?");

    if (confirmation) {
        jenis_barang.focus();
    } else {
        isi_button.focus();
    }
});

update_button.addEventListener("click", function (event) {
    event.preventDefault();
});

delete_button.addEventListener("click", function (event) {
    event.preventDefault();
});

lihat_spButton.addEventListener("click", function (event) {
    event.preventDefault();
    // console.log(proses);
    if (proses <= 1) {
        return;
    } else if (proses > 1) {
        if (no_spSelect.style.display == "inline-block") {
            no_spSelect.style.display = "none";
            no_spText.style.display = "inline-block";
        } else if (no_spSelect.style.display == "none") {
            no_spSelect.style.display = "inline-block";
            no_spText.style.display = "none";
        }
    }
});

kelompok_utama.addEventListener("change", function () {
    if (this.selectedIndex !== 0) {
        this.setCustomValidity("Tekan Enter!");
        this.reportValidity();
    }
});

kelompok_utama.addEventListener("keypress", function (event) {
    // console.log(event.key);
    if (event.key == "Enter") {
        event.preventDefault();
        if (this.selectedIndex !== 0) {
            fetch("/options/spekspor/kelompok/" + this.value)
                .then((response) => response.json())
                .then((data) => {
                    // console.log(data);
                    kelompok.innerHTML =
                        "<option disabled selected value>-- Pilih Kelompok --</option>";
                    data.forEach((option) => {
                        let optionTag = document.createElement("option");
                        optionTag.value = option.IdKelompok;
                        optionTag.text = option.NamaKelompok.trim();
                        kelompok.appendChild(optionTag);
                    });
                    kelompok.focus();
                });
        }
    }
    // console.log(this.value);
});

kelompok.addEventListener("change", function () {
    if (this.selectedIndex !== 0) {
        this.setCustomValidity("Tekan Enter!");
        this.reportValidity();
    }
});

kelompok.addEventListener("keypress", function (event) {
    // console.log(event.key);
    if (event.key == "Enter") {
        event.preventDefault();
        if (this.selectedIndex !== 0) {
            fetch("/options/spekspor/subKelompok/" + this.value)
                .then((response) => response.json())
                .then((data) => {
                    // console.log(data);
                    sub_kelompok.innerHTML =
                        "<option disabled selected value>-- Pilih Sub Kelompok --</option>";
                    data.forEach((option) => {
                        let optionTag = document.createElement("option");
                        optionTag.value = option.IDCorak;
                        optionTag.text = option.Corak;
                        sub_kelompok.appendChild(optionTag);
                    });
                    sub_kelompok.focus();
                });
        }
    }
});

sub_kelompok.addEventListener("change", function () {
    if (this.selectedIndex !== 0) {
        this.setCustomValidity("Tekan Enter!");
        this.reportValidity();
    }
});

sub_kelompok.addEventListener("keypress", function (event) {
    // console.log(event.key);
    if (event.key == "Enter") {
        event.preventDefault();
        if (this.selectedIndex !== 0) {
            fetch("/options/spekspor/namaBarang/" + this.value)
                .then((response) => response.json())
                .then((data) => {
                    // console.log(data);
                    nama_barang.innerHTML =
                        "<option disabled selected value>-- Pilih Nama Barang --</option>";
                    data.forEach((option) => {
                        let optionTag = document.createElement("option");
                        optionTag.value = option.IDBarang;
                        optionTag.text = option.NamaBarang;
                        nama_barang.appendChild(optionTag);
                    });
                    nama_barang.focus();
                });
        }
    }
});

nama_barang.addEventListener("change", function () {
    if (this.selectedIndex !== 0) {
        this.setCustomValidity("Tekan Enter!");
        this.reportValidity();
    }
});

nama_barang.addEventListener("keypress", function (event) {
    // console.log(event.key);
    if (event.key == "Enter") {
        event.preventDefault();
        if (this.selectedIndex !== 0) {
            IsiSatuanInv(this.value);
        }
        jenis_barang.focus();
    }
});

jenis_barang.addEventListener("change", function () {
    if (this.selectedIndex !== 0) {
        this.setCustomValidity("Tekan Enter!");
        this.reportValidity();
    }
});

//#endregion

//#region function-function

function enterToTab(event) {
    const target = event.target;
    const keyCode = event.keyCode || event.which;

    if (keyCode === 13) {
        event.preventDefault();
        const inputs = Array.from(
            document.querySelectorAll("input, select, textarea")
        );
        const currentIndex = inputs.indexOf(target);

        if (currentIndex !== -1) {
            const nextIndex = currentIndex + 1;
            if (nextIndex < inputs.length) {
                inputs[nextIndex].focus();
            } else {
                // If we reached the last input field, you can also choose to focus on the first one instead
                inputs[0].focus();
            }
        }
    }
}

function disableInputs() {
    const disabledDivs = document.querySelectorAll(".toggle-group");

    disabledDivs.forEach((disabledDiv) => {
        const inputs = disabledDiv.querySelectorAll("input, select, textarea");

        inputs.forEach((input) => {
            input.disabled = true;
        });

        disabledDiv.classList.add("disabled");
    });
}

function enableInputs() {
    const disabledDivs = document.querySelectorAll(".toggle-group");

    disabledDivs.forEach((disabledDiv) => {
        const inputs = disabledDiv.querySelectorAll("input, select, textarea");

        inputs.forEach((input) => {
            input.disabled = false;
        });

        disabledDiv.classList.remove("disabled");
    });
}

async function cek_No_SP(no_sp) {
    try {
        const response = await fetch("/cekNoSPEkspor/" + no_sp);
        const data = await response.json();
        // console.log(data[0].Jumlah);
        if (data[0].Jumlah >= 1) {
            return 1;
        } else {
            return 0;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return -1; // Handle any error case appropriately
    }
}

function containsPipe(inputString) {
    return inputString.includes("|");
}

function checkInputs() {
    let hasInvalidInput = false;
    let inputIds = [
        "payment_terms",
        "cargo_ready",
        "remarks_packing",
        "remarks_price",
        "remarks_quantity",
    ];
    inputIds.forEach((inputId) => {
        const inputValue = document.getElementById(inputId).value;
        if (containsPipe(inputValue)) {
            hasInvalidInput = true;
            alert(`Invalid input: "${inputValue}" contains the "|" character.`);
            document.getElementById(inputId).focus();
        }
    });
    if (hasInvalidInput) {
        return true;
    } else {
        return false;
    }
}

function IsiSatuanInv(idtype) {
    fetch("/options/spekspor/isiSatuan/" + idtype)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            kode_barang.value = data[0].KodeBarang;
            satuan_gudangPrimer.value = data[0].satPrimer.trim();
            satuan_gudangSekunder.value = data[0].satSekunder.trim();
            satuan_gudangTritier.value = data[0].nama_satuan.trim();
            satuan_jual.selectedIndex = 0;
            if (
                kelompok_utama.value == "0406" ||
                kelompok_utama.value == "0405" ||
                kelompok_utama.value == "0700"
            ) {
                for (let i = 0; i < satuan_jual.length - 1; i++) {
                    satuan_jual.selectedIndex += 1;
                    if (
                        satuan_jual.options[satuan_jual.selectedIndex].text ===
                        satuan_gudangSekunder.value
                    ) {
                        break;
                    }
                }
            } else {
                for (let i = 0; i < satuan_jual.length - 1; i++) {
                    satuan_jual.selectedIndex += 1;
                    if (
                        satuan_jual.options[satuan_jual.selectedIndex].text ===
                        satuan_gudangPrimer.value
                    ) {
                        break;
                    }
                }
            }
        });
}

function funcInsertRow(array) {
    let isDataInTable = false;
    const table = $("#list_view").DataTable();
    // console.log(table.rows.length);
    if (table.data().length > 0) {
        table.rows().every(function () {
            const rowData = this.data();
            const columnValue = rowData[11]; // Assuming you want to compare the second column
            // Compare the column value with your desired value
            if (columnValue === kode_barang.value) {
                // Perform your desired action here
                isDataInTable = true;
            }
        });
    }
    // table.clear();
    if (isDataInTable) {
        alert("Data barang sudah ada");
        table_listView.focus();
    } else {
        table.row.add(array);
        table.draw();
        $("#list_view tbody").off("click", "tr");
        $("#list_view tbody").on("click", "tr", function () {
            let checkSelectedRows = $("#list_view tbody tr.selected");

            if (checkSelectedRows.length > 0) {
                // Remove "selected" class from previously selected rows
                checkSelectedRows.removeClass("selected");
            }
            $(this).toggleClass("selected");
            let selectedRows = table.rows(".selected").data().toArray();
            console.log(selectedRows);
            // qty_pesan.value = parseInt(selectedRows[0][3].replace(/,/g, ""));
            // harga_satuan.value = parseFloat(
            //     selectedRows[0][2].replace(/,/g, "")
            // );
            // ppn.value = selectedRows[0][6];
            // satuan_jual.selectedIndex = 0;
            // for (let i = 0; i < satuan_jual.length; i++) {
            //     // console.log(satuanJual.selectedIndex);
            //     satuan_jual.selectedIndex += 1;
            //     if (
            //         satuan_jual.options[satuan_jual.selectedIndex].text ===
            //         selectedRows[0][4].trim()
            //     ) {
            //         break;
            //     }
            // }
            // jenis_brg.value = selectedRows[0][27];
            // rencana_kirim.value = selectedRows[0][5];
            // let optionNamaBarang = document.createElement("option");
            // optionNamaBarang.value = selectedRows[0][1];
            // optionNamaBarang.text = selectedRows[0][0];
            // nama_barang.appendChild(optionNamaBarang);
            // kode_barang.value = selectedRows[0][1];
            // funcDisplayDataBrg(selectedRows[0][1]);
            // funcTampilInv(selectedRows[0][1]);
        });
    }
}

function funcDisplayDataBrg(kodeBarangParameter) {
    // console.log(kodeBarangParameter);
    fetch("/displaybarang/" + kodeBarangParameter)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            let optionTagKategori = document.createElement("option");
            let optionTagSubKategori = document.createElement("option");
            const optionKategoriUtama = kategori_utama.options;

            for (let i = 0; i < optionKategoriUtama.length; i++) {
                const option = optionKategoriUtama[i];
                if (option.value === data[0].IdKelompokUtama) {
                    option.selected = true;
                    break;
                }
            }
            //disable dulu karena ndak ada isi optionnya hehe
            // kategori.disabled = true;
            // sub_kategori.disabled = true;
            // nama_barang.disabled = true;
            //ngisi optionnya hehe
            optionTagKategori.value = data[0].IdKelompok;
            optionTagKategori.text = data[0].NamaKelompok;
            optionTagSubKategori.value = data[0].IdCorak;
            optionTagSubKategori.text = data[0].Corak;
            kategori.appendChild(optionTagKategori);
            sub_kategori.appendChild(optionTagSubKategori);
            //ngisi sisanya hehe
            satuan_primer.value = data[0].SatuanPrimer;
            satuan_sekunder.value = data[0].SatuanSekunder;
            satuan_tritier.value = data[0].SatuanTritier;
        });
}

function formatangka(objek) {
    // console.log(objek); // Output the provided number for debugging purposes

    // Check if the number has decimal places
    if (Number.isInteger(objek)) {
        return objek.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        let parts = objek.toFixed(3).split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".").replace(/\.?0+$/, "");
    }
}

function clearDetailBarang() {
    kelompok_utama.selectedIndex = 0;
    kelompok.innerHTML = "<option disabled selected value>-- Pilih Kelompok --</option>";
    sub_kelompok.innerHTML = "<option disabled selected value>-- Pilih Sub Kelompok --</option>";
    nama_barang.innerHTML = "<option disabled selected value>-- Pilih Nama Barang --</option>";
    kode_barang.value = "";
    jenis_barang.selectedIndex = 0;
    qty_pesan.value = "";
    harga_satuan.value = "";
    general_specification.value = "";
    keterangan_barang.value = "";
    size_code.value = "";
    ppn.selectedIndex = 1;
    satuan_jual.selectedIndex = 0;
    satuan_gudangPrimer.value = "";
    satuan_gudangSekunder.value = "";
    satuan_gudangTritier.value = "";
    rencana_kirim.valueAsDate = new Date();
}

//#endregion
