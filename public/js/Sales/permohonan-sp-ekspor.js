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
let isi_button = document.getElementById("isi_button");
let jenis_barang = document.getElementById("jenis_barang");
let jenis_harga = document.getElementById("jenis_harga");
let kelompok = document.getElementById("kelompok");
let kelompok_utama = document.getElementById("kelompok_utama");
let keterangan_barang = document.getElementById("keterangan_barang");
let kode_barang = document.getElementById("kode_barang");
let lihat_spButton = document.getElementById("lihat_spButton");
let list_view = $("#list_view").DataTable();
let mata_uang = document.getElementById("mata_uang");
let nama_barang = document.getElementById("nama_barang");
let no_pi = document.getElementById("no_pi");
let no_po = document.getElementById("no_po");
let no_spText = document.getElementById("no_spText");
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

//#endregion

//#region Add Event Listener

isi_button.addEventListener("click", async function (event) {
    event.preventDefault();
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
        let no_spData = no_spText.value.replace(/\//g, ".");
        let cekSP = await cek_No_SP(no_spData); // Wait for the result of the async function
        console.log(cekSP);
        if (cekSP === 1) {
            console.log('cek sp === 1');
            // Perform the action for cekSP === 1
        } else {
            console.log('cek sp === 0');
            // Perform the action for cekSP === 0
        }
        // form_suratPesanan.submit(); //Untuk Store
    } else if (proses == 2) {
        form_suratPesanan.submit(); //Untuk Update
    } else if (proses == 3) {
        form_suratPesanan.submit(); //Untuk Destroy
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
        proses = 0; //proses belum ada
    }
});

add_button.addEventListener("click", function (event) {
    event.preventDefault();
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
        console.log(data[0].Jumlah);
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
//#endregion
