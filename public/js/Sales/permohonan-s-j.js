//#region get element by id

// let submit = document.getElementById("submit");
let add_item = document.getElementById("add_item");
let biaya = document.getElementById("biaya");
let customer = document.getElementById("customer");
let div_suratJalan = document.getElementById("div_suratJalan");
let edit_button = document.getElementById("edit_button");
let expeditor = document.getElementById("expeditor");
let hapus_button = document.getElementById("hapus_button");
let isi_button = document.getElementById("isi_button");
let jenis_pengiriman = document.getElementById("jenis_pengiriman");
let keterangan = document.getElementById("keterangan");
let list_view = document.getElementById("list_view");
let nomor_container = document.getElementById("nomor_container");
let nomor_do = document.getElementById("nomor_do");
let nomor_seal = document.getElementById("nomor_seal");
let proses = 0;
let id_kirimSelect = document.getElementById("id_kirimSelect");
let id_kirimText = document.getElementById("id_kirimText");
let list_sjButton = document.getElementById("list_sjButton");
let remove_item = document.getElementById("remove_item");
let surat_jalan = document.getElementById("surat_jalan");
let surat_pesanan = document.getElementById("surat_pesanan");
let tanggal = document.getElementById("tanggal");
let tanggal_actual = document.getElementById("tanggal_actual");
let truk_nopol = document.getElementById("truk_nopol");
let uraian = document.getElementById("uraian");
let form_suratJalan = document.getElementById("form_suratJalan");

//#endregion

//#region input filter
//Penjelasan setinputfilter function: https://jsfiddle.net/KarmaProd/tgn9d1uL/4/
function setInputFilter(textbox, inputFilter, errMsg) {
    [
        "input",
        "keydown",
        "keyup",
        "mousedown",
        "mouseup",
        "select",
        "contextmenu",
        "drop",
        "focusout",
    ].forEach(function (event) {
        textbox.addEventListener(event, function (e) {
            if (inputFilter(this.value)) {
                // Accepted value
                if (["keydown", "mousedown", "focusout"].indexOf(e.type) >= 0) {
                    this.classList.remove("input-error");
                    this.setCustomValidity("");
                }
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                // Rejected value - restore the previous one
                this.classList.add("input-error");
                this.setCustomValidity(errMsg);
                this.reportValidity();
                this.value = this.oldValue;
                this.setSelectionRange(
                    this.oldSelectionStart,
                    this.oldSelectionEnd
                );
            } else {
                // Rejected value - nothing to restore
                this.value = "";
            }
        });
    });
}

setInputFilter(
    document.getElementById("biaya"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);

//#endregion

//#region load form

isi_button.focus();
tanggal.valueAsDate = new Date();
tanggal.setAttribute("readonly", true);
tanggal_actual.valueAsDate = new Date();
div_suratJalan.classList.toggle("disabled");

//#endregion

//#region Add event listener

customer.addEventListener("change", function () {
    let customer = this.value;
    fetch("/options/suratpesanan/" + customer)
        .then((response) => response.json())
        .then((options) => {
            surat_pesanan.innerHTML =
                "<option disabled selected>-- Pilih Surat Pesanan --</option>";
            options.forEach((option) => {
                let optionTag = document.createElement("option");
                optionTag.value = option.IDSuratPesanan;
                optionTag.text = option.IDSuratPesanan;
                surat_pesanan.appendChild(optionTag);
            });
        });
});
surat_pesanan.addEventListener("change", function () {
    let surat_pesanan = this.value;
    // console.log(surat_pesanan);
    fetch("/options/deliveryorder/" + surat_pesanan)
        .then((response) => response.json())
        .then((options) => {
            nomor_do.innerHTML =
                "<option disabled selected>-- Pilih Delivery Order --</option>";
            options.forEach((option) => {
                let optionTag = document.createElement("option");
                optionTag.value = option.IDDO;
                // let string = option.Uraian;
                // let NamaBarang = string.substring(0, string.indexOf(" Qty Primer"));
                // optionTag.text = NamaBarang;
                optionTag.text = option.Uraian;
                nomor_do.appendChild(optionTag);
            });
        });
});

nomor_do.addEventListener("change", function () {
    // Get the selected option element
    var selectedOption = this.options[this.selectedIndex];

    // Get the text content of the selected option
    var selectedText = selectedOption.textContent;

    // Set the value of the textarea to the selected text
    uraian.value = selectedText;
});

id_kirimSelect.addEventListener("change", function (event) {
    if (this.selectedIndex !== 0) {
        this.classList.add("input-error");
        this.setCustomValidity("Tekan Enter!");
        this.reportValidity();
    }
    // console.log(id_kirimText.value)
});

id_kirimSelect.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        if (this.selectedIndex !== 0) {
            id_kirimText.value = this.value;
            this.disabled = true;
            const enterEvent = new KeyboardEvent("keypress", { key: "Enter" });
            id_kirimText.dispatchEvent(enterEvent);
        }
    }
});

id_kirimText.addEventListener("Keypress", function(event){
    if (event.key == "Enter") {
        event.preventDefault();
        fetch("/editSJ/" + id_kirimText.value)
        .then((response) => response.json())
        .then((data) => {

        })
    }
});

truk_nopol.addEventListener("change", function () {
    truk_nopol.value = this.value.toUpperCase();
});
//#endregion

//#region enter-enter

surat_pesanan.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        // nomor_do.focus();
    }
});

nomor_do.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        // add_item.focus();
    }
});

jenis_pengiriman.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        // surat_jalan.focus();
    }
});

tanggal.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        // customer.focus();
    }
});

tanggal_actual.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        // customer.focus();
    }
});

customer.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        // keterangan.focus();
    }
});

expeditor.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        // surat_pesanan.focus();
    }
});

surat_jalan.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        // tanggal.focus();
    }
});

tanggal_actual.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        // expeditor.focus();
    }
});

keterangan.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        // truk_nopol.focus();
    }
});

truk_nopol.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        // biaya.focus();
    }
});

biaya.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        // tanggal_actual.focus();
    }
});

// nomor_container.addEventListener("keypress", function (event) {
//     if (event.key === "Enter") {
//         event.preventDefault();
//         nomor_seal.focus();
//     }
// });

// nomor_seal.addEventListener("keypress", function (event) {
//     if (event.key === "Enter") {
//         event.preventDefault();
//         surat_pesanan.focus();
//     }
// });
//#endregion

//#region Table-table

add_item.addEventListener("click", function () {
    if (uraian.value === "" || nomor_do.selectedIndex === 0) {
        alert("Isi DO dulu!");
    } else {
        const arraydata = [
            nomor_do.options[nomor_do.selectedIndex].value,
            uraian.value,
            "",
            surat_pesanan.options[surat_pesanan.selectedIndex].text,
        ];
        funcInsertRow(arraydata);
        funcClearDataInput();
    }
    const confirmation = confirm("Apakah mau menambah DO lagi?");
    if (confirmation === true) {
        surat_pesanan.focus();
    } else {
        isi_button.focus();
    }
});

function funcInsertRow(array) {
    const table = document.getElementById("list_view");
    const dataToCheck = array[1];
    let isDataInTable = false;

    if (table.rows.length > 0) {
        const cellValue = table.querySelectorAll("input");

        for (let i = 1; i < cellValue.length; i++) {
            if (cellValue[i].value === dataToCheck) {
                isDataInTable = true;
            }
        }
    }
    if (isDataInTable) {
        alert("Data sudah ada di table");
    } else {
        const newRow = table.insertRow(-1);
        newRow.setAttribute("class", "acs-tr-hover");

        for (let i = 0; i < array.length; i++) {
            const cell = newRow.insertCell(i);
            cell.innerHTML = array[i];
            cell.setAttribute("class", "acs-tr-hover");
            const input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("readonly", "true");
            input.setAttribute("value", array[i]);
            input.setAttribute("class", "acs-input-table");
            input.setAttribute("name", "barang" + i + "[]");
            input.style.backgroundColor = table.style.backgroundColor;
            cell.innerHTML = "";
            cell.appendChild(input);
        }
        newRow.addEventListener("click", () => {
            // remove highlight from previously selected row
            const highlightedRow = table.querySelector("tr.highlighted");
            const inputs = newRow.querySelectorAll("input");
            if (highlightedRow) {
                highlightedRow.classList.remove("highlighted");
            }
            // highlight current row
            newRow.classList.add("highlighted");
            // add the "highlighted" class to all input elements in the row
        });
    }
}

function funcClearDataInput() {
    surat_pesanan.selectedIndex = 0;
    nomor_do.selectedIndex = 0;
    uraian.value = "";
}

remove_item.addEventListener("click", function (event) {
    event.preventDefault();
    const table = document.getElementById("list_view");
    const highlightedRow = table.querySelector("tr.highlighted");
    if (highlightedRow) {
        table.deleteRow(highlightedRow.rowIndex);
        alert("Data sudah terhapus!");
    } else {
        alert("Tidak ada data yang dihapus");
    }
});
//#endregion

//#region Button-button

isi_button.addEventListener("click", function (event) {
    event.preventDefault();
    if (proses == 0) {
        proses = 1;
        this.innerHTML = "Proses";
        edit_button.innerHTML = "Batal";
        hapus_button.style.display = "none";
        jenis_pengiriman.focus();
    } else if (proses == 1) {
        form_suratJalan.submit();
        proses = 0;
        this.innerHTML = "Isi";
        edit_button.innerHTML = "Edit";
        hapus_button.style.display = "block";
    } else if (proses == 2) {
        proses = 0;
        this.innerHTML = "Isi";
        edit_button.innerHTML = "Edit";
        hapus_button.style.display = "block";
        form_suratJalan.action = "/SuratJalan/" + id_kirimText.value + "/up";
        form_suratJalan.submit();
    } else if (proses == 3) {
        proses = 0;
        this.innerHTML = "Isi";
        edit_button.innerHTML = "Edit";
        hapus_button.style.display = "block";
        form_suratJalan.action = "/SuratJalan/" + id_kirimText.value;
        form_suratJalan.submit();
    }
    div_suratJalan.classList.toggle("disabled");
});

edit_button.addEventListener("click", function (event) {
    event.preventDefault();
    if (proses == 0) {
        proses = 2;
        isi_button.innerHTML = "Proses";
        this.innerHTML = "Batal";
        hapus_button.style.display = "none";
        list_sjButton.disabled = false;
    } else {
        proses = 0;
        isi_button.innerHTML = "Isi";
        this.innerHTML = "Edit";
        hapus_button.style.display = "block";
        id_kirimSelect.style.display = "none";
        id_kirimText.style.display = "block";
        list_sjButton.disabled = true;
    }
    div_suratJalan.classList.toggle("disabled");
});

hapus_button.addEventListener("click", function (event) {
    event.preventDefault();
    proses = 3;
    isi_button.innerHTML = "Proses";
    edit_button.innerHTML = "Batal";
    this.style.display = "none";
    list_sjButton.disabled = false;
    div_suratJalan.classList.toggle("disabled");
});

list_sjButton.addEventListener("click", function (event) {
    event.preventDefault();
    id_kirimSelect.style.display = "block";
    id_kirimText.style.display = "none";

    fetch("/options/nomorSJ/")
        .then((response) => response.json())
        .then((options) => {
            // console.log(options);
            id_kirimSelect.innerHTML =
                "<option disabled selected value>-- Pilih Nomor Surat Jalan --</option>";
            options.forEach((option) => {
                let optionTag = document.createElement("option");
                optionTag.value = option.IDPengiriman;
                optionTag.text = option.IDPengiriman + " - " + option.NamaCust;
                id_kirimSelect.appendChild(optionTag);
            });
        });
});

//#endregion
