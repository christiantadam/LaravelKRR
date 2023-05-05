let button_proses = document.getElementById("button_proses");
let button_tampilkanPilihan = document.getElementById(
    "button_tampilkanPilihan"
);
let checkbox_idType = document.getElementById("checkbox_idType");
let checkbox_Kg = document.getElementById("checkbox_Kg");
let checkbox_lembar = document.getElementById("checkbox_lembar");
let checkbox_Tanggal = document.getElementById("checkbox_Tanggal");
let div_tableBarcode = document.getElementById("div_tableBarcode");
// let id_typeText = document.getElementById("id_typeText");
let id_typeSelect = document.getElementById("id_typeSelect");
let jumlah_data = document.getElementById("jumlah_data");
let jumlah_dataKolom = document.getElementById("jumlah_dataKolom");
let kg = document.getElementById("Kg");
let kode_barang = document.getElementById("kode_barang");
let lembar = document.getElementById("lembar");
// let switch_idType = document.getElementById("switch_idType");
let table_Barcode = document.getElementById("table_Barcode");
let tanggal_cariBarcode = document.getElementById("tanggal_cariBarcode");
let tempat_dispresiasi = document.getElementById("tempat_dispresiasi");

//#region Load Form

tempat_dispresiasi.checked = true;
tanggal_cariBarcode.valueAsDate = new Date();
kode_barang.focus();

//#endregion

//#region Input Filter

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
    document.getElementById("kode_barang"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
setInputFilter(
    document.getElementById("lembar"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
// setInputFilter(
//     document.getElementById("id_typeText"),
//     function (value) {
//         return /^-?\d*$/.test(value);
//     },
//     "Harus diisi dengan angka!"
// );
setInputFilter(
    document.getElementById("Kg"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);

//#endregion

//#region button-button

button_proses.addEventListener("click", function () {
    if (kode_barang.value == "") {
        alert("Isi kode barang lebih dulu!");
        kode_barang.focus();
    } else {
        div_tableBarcode.style.display = "block";
        jumlah_dataKolom.style.visibility = "visible";
    }
});

// switch_idType.addEventListener("click", function(){
//     if (id_typeSelect.style.display == "none") {
//         id_typeText.style.display = "none"
//         id_typeSelect.style.display = "inline-block"
//         id_typeSelect.focus();
//     }
//     else if(id_typeSelect.style.display == "inline-block"){
//         id_typeText.style.display = "inline-block"
//         id_typeSelect.style.display = "none"
//         id_typeText.focus();
//     }
// });

kode_barang.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        let kodeBarang9digit;
        kodeBarang9digit = document.getElementById("kode_barang");
        if (kodeBarang9digit.value.length < 9) {
            kodeBarang9digit.value = kode_barang.value.padStart(9, "0");
        }
        kode_barang.value = kodeBarang9digit.value;
        if (tempat_dispresiasi.checked == true) {
            fetch("/cariBarcodeIdTypeDispresiasi/" + kode_barang.value)
                .then((response) => response.json())
                .then((options) => {
                    console.log(options);
                    id_typeSelect.innerHTML =
                        "<option disabled selected value>-- Pilih Id Type --</option>";
                    options.forEach((option) => {
                        let optionTag = document.createElement("option");
                        optionTag.value = option.no_kategori;
                        optionTag.text = option.nama_kategori;
                        id_typeSelect.appendChild(optionTag);
                    });
                });
        } else {
            fetch("/cariBarcodeIdTypeTmpGudang/" + kode_barang.value)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                });
        }
        // switch_idType.focus();
    }
});

//#endregion
