//#region Document get element by id

let add_button = document.getElementById("add_button");
let cargo_ready = document.getElementById("cargo_ready");
let customer = document.getElementById("customer");
let delete_button = document.getElementById("delete_button");
let div_detailSuratPesanan = document.getElementById("div_detailSuratPesanan");
let div_tabelSuratPesanan = document.getElementById("div_tabelSuratPesanan");
let edit_button = document.getElementById("edit_button");
let general_specification = document.getElementById("general_specification");
let hapus_button = document.getElementById("hapus_button");
let isi_button = document.getElementById("isi_button");
let jenis_barang = document.getElementById("jenis_barang");
let kelompok = document.getElementById("kelompok");
let kelompok_utama = document.getElementById("kelompok_utama");
let keterangan_barang = document.getElementById("keterangan_barang");
let kode_barang = document.getElementById("kode_barang");
let lihat_spButton = document.getElementById("lihat_spButton");
let list_view = $("#list_view").DataTable();
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

isi_button.addEventListener("click", function (event) {
    event.preventDefault();
    if (proses == 0) {
        enableInputs();
        hapus_button.innerHTML = "Batal";
        edit_button.style.display = "none";
        this.innerHTML = "Proses";
        proses = 1; //proses isi
    } else if (proses == 1) {
        form_suratPesanan.submit();
    } else if (proses == 2) {
        disableInputs();
        hapus_button.innerHTML = "Hapus";
    } else if (proses == 3) {
        disableInputs();
        hapus_button.innerHTML = "Hapus";
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

//#endregion
