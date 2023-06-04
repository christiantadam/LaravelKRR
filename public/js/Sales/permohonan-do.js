//#region get element by id

// let nomor_spData = document.getElementById("nomor_spData");
let alamat_kirim = document.getElementById("alamat_kirim");
let listBarang_button = document.getElementById("listBarang_button");
let id_pesananText = document.getElementById("id_pesananText");
// let cc = document.getElementById("cc");
let customer = document.getElementById("customer");
let div_deliveryOrder = document.getElementById("div_deliveryOrder");
let divisi = document.getElementById("divisi");
// let etd = document.getElementById("etd");
let form_deliveryOrder = document.getElementById("form_deliveryOrder");
let id_pesananSelect = document.getElementById("id_pesananSelect");
// let id_pesanan_hidden = document.getElementById("id_pesanan_hidden");
let id_typeBarang = document.getElementById("id_typeBarang");
let kelompok = document.getElementById("kelompok");
let kelompok_utama = document.getElementById("kelompok_utama");
let kode_barang = document.getElementById("kode_barang");
let kota_kirim = document.getElementById("kota_kirim");
let listDO_button = document.getElementById("listDO_button");
let listSP_button = document.getElementById("listSP_button");
let max_kirim = document.getElementById("max_kirim");
let min_kirim = document.getElementById("min_kirim");
let nomor_doSelect = document.getElementById("nomor_doSelect");
let nomor_doSpan = document.getElementById("nomor_doSpan");
let nomor_doText = document.getElementById("nomor_doText");
let nomor_spText = document.getElementById("nomor_spText");
let nomor_spSelect = document.getElementById("nomor_spSelect");
let proses = 0;
let qty_kirim = document.getElementById("qty_kirim");
let qty_order = document.getElementById("qty_order");
let qty_primer = document.getElementById("qty_primer");
let qty_primerGudang = document.getElementById("qty_primerGudang");
let qty_sekunder = document.getElementById("qty_sekunder");
let qty_sekunderGudang = document.getElementById("qty_sekunderGudang");
let qty_tritier = document.getElementById("qty_tritier");
let qty_tritierGudang = document.getElementById("qty_tritierGudang");
let satuan_primer = document.getElementById("satuan_primer");
let satuan_sekunder = document.getElementById("satuan_sekunder");
let satuan_tritier = document.getElementById("satuan_tritier");
let sub_kelompok = document.getElementById("sub_kelompok");
let text_idTypeBarang = document.getElementById("text_idTypeBarang");
let tgl_do = document.getElementById("tgl_do");
let uraian = document.getElementById("uraian");
let id_pesananDiv = document.getElementById("id_pesananDiv");
let surat_pesananDiv = document.getElementById("surat_pesananDiv");

//#endregion

//#region input filter

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
    document.getElementById("qty_primer"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
setInputFilter(
    document.getElementById("qty_sekunder"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
setInputFilter(
    document.getElementById("qty_tritier"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
setInputFilter(
    document.getElementById("qty_order"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
setInputFilter(
    document.getElementById("qty_kirim"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
setInputFilter(
    document.getElementById("max_kirim"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
setInputFilter(
    document.getElementById("min_kirim"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Harus diisi dengan angka!"
);
//#endregion

//#region enter-enter

tgl_do.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        // console.log(proses);
        event.preventDefault();
        if (proses == 1) {
            customer.focus();
        } else {
            listDO_button.focus();
        }
    }
});
// nomor_spText.addEventListener("keypress", function(event){
//     if (event.key == "Enter") {
//         event.preventDefault();
//         listBarang_button.focus();
//     }
// });
max_kirim.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        min_kirim.focus();
    }
});

min_kirim.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        if (proses == 1) {
            qty_order.focus();
        } else if (proses == 2) {
            isi_button.focus();
        }
    }
});

alamat_kirim.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        isi_button.focus();
    }
});

nomor_doSelect.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        min_kirim.focus();
    }
});

qty_order.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        qty_kirim.focus();
    }
});

qty_kirim.addEventListener("keypress", function(event){
    if (event.key == "Enter") {
        event.preventDefault();
        alamat_kirim.focus();
    }
});

//#endregion

//#region load form

isi_button.focus();
// etd.valueAsDate = new Date();
// cc.valueAsDate = new Date();
tgl_do.valueAsDate = new Date();
nomor_spSelect.style.display = "none";
id_pesananSelect.style.display = "none";
div_deliveryOrder.classList.toggle("disabled");

//#endregion

//#region get value option using ajax

customer.addEventListener("change", function () {
    let customer = this.value;
    nomor_spText.focus();
    fetch("/options/nomorsp/" + customer)
        .then((response) => response.json())
        .then((options) => {
            nomor_spSelect.innerHTML =
                "<option disabled selected value>-- Pilih Nomor Surat Pesanan --</option>";
            options.forEach((option) => {
                let optionTag = document.createElement("option");
                optionTag.value = option.IDSuratPesanan;
                optionTag.text =
                    option.IDSuratPesanan + " | " + option.JnsSuratPesanan;
                nomor_spSelect.appendChild(optionTag);
            });
        });
});

nomor_spText.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        // nomor_spSelect.style.display = "block";
        let nomor_spText = this.value;
        let selectedOption = Array.from(nomor_spSelect.options).find(
            (option) => option.value === nomor_spText
        );
        // console.log(selectedOption == undefined);
        if (selectedOption == undefined) {
            alert(
                "Nomor SP yang dimasukkan salah, silahkan cek daftar nomor surat pesanan!"
            );
            nomor_spSelect.style.display = "block";
            nomor_spText.style.display = "none";
            nomor_spSelect.focus();
        } else {
            nomor_spSelect.value = selectedOption.value;
            fetch("/options/id_pesanan/" + selectedOption.value)
                .then((response) => response.json())
                .then((options) => {
                    id_pesananSelect.innerHTML =
                        "<option disabled selected value>-- Pilih ID Pesanan --</option>";
                    options.forEach((option) => {
                        let optionTag = document.createElement("option");
                        optionTag.value = option.IDPesanan;
                        optionTag.text =
                            option.IDPesanan + " | " + option.Uraian;
                        id_pesananSelect.appendChild(optionTag);
                    });
                });
            listBarang_button.focus();
        }
    }
});

nomor_spSelect.addEventListener("change", function () {
    let nomor_spSelect = this.value;
    nomor_spText.value = nomor_spSelect;
    id_pesananText.value = "";
    id_pesananSelect.focus();
    fetch("/options/id_pesanan/" + nomor_spSelect)
        .then((response) => response.json())
        .then((options) => {
            id_pesananSelect.innerHTML =
                "<option disabled selected value>-- Pilih ID Pesanan --</option>";
            options.forEach((option) => {
                let optionTag = document.createElement("option");
                optionTag.value = option.IDPesanan;
                optionTag.text = option.IDPesanan + " | " + option.Uraian;
                id_pesananSelect.appendChild(optionTag);
            });
        });
});

nomor_doText.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        let nomor_do = this.value;
        let selectedOption = Array.from(nomor_doSelect.options).find(
            (option) => option.value === nomor_do
        );
        if (selectedOption == undefined) {
            edit_button.dispatchEvent(new Event("click"));
            alert(
                "Nomor SP yang dimasukkan salah, silahkan cek daftar nomor surat pesanan!"
            );
            edit_button.focus();
        } else {
            for (let i = 0; i < nomor_doSelect.length; i++) {
                if (nomor_doSelect.options[i].value == nomor_do) {
                    nomor_doSelect.options[i].selected = true;
                    nomor_doSelect.dispatchEvent(new Event("change"));
                    break;
                }
            }
        }
    }
});

nomor_doSelect.addEventListener("change", function () {
    nomor_doText.value = this.value;
    nomor_spSelect.style.display = "none";
    nomor_spText.style.display = "block";
    fetch("/DeliveryOrder/" + this.value + "/edit")
        .then((response) => response.json())
        .then((data) => {
            tgl_do.value = data[0].tanggal.substr(0, 10);
            for (let i = 0; i < customer.options.length; i++) {
                if (customer.options[i].value == data[0].IDCust) {
                    customer.options[i].selected = true;
                    break;
                }
            }
            nomor_spText.value = data[0].IDSuratPesanan;
            id_pesananText.value = data[0].IDPesanan;
            fetch("/options/nomorsp/" + customer.value)
                .then((response) => response.json())
                .then((options) => {
                    // console.log(options);
                    nomor_spSelect.innerHTML =
                        "<option disabled selected value>-- Pilih Nomor Delivery Order --</option>";
                    options.forEach((option) => {
                        let optionTag = document.createElement("option");
                        optionTag.value = option.IDSuratPesanan;
                        optionTag.text =
                            option.IDSuratPesanan +
                            " - " +
                            option.JnsSuratPesanan;
                        nomor_spSelect.appendChild(optionTag);
                        // console.log(nomor_spSelect.options.length);
                        for (
                            let i = 0;
                            i < nomor_spSelect.options.length;
                            i++
                        ) {
                            if (
                                nomor_spSelect.options[i].value ==
                                nomor_spText.value
                            ) {
                                nomor_spSelect.options[i].selected = true;
                                // console.log(nomor_spSelect.options[i].value);
                                break;
                            }
                        }
                    });
                });
            // console.log(data);
            fetch("/options/id_pesanan/" + nomor_spText.value)
                .then((response) => response.json())
                .then((options) => {
                    id_pesananSelect.innerHTML =
                        "<option disabled selected value>-- Pilih ID Pesanan --</option>";
                    options.forEach((option) => {
                        let optionTag = document.createElement("option");
                        optionTag.value = option.IDPesanan;
                        optionTag.text =
                            option.IDPesanan + " | " + option.Uraian;
                        id_pesananSelect.appendChild(optionTag);
                        for (
                            let i = 0;
                            i < id_pesananSelect.options.length;
                            i++
                        ) {
                            if (
                                id_pesananSelect.options[i].value ==
                                data[0].IDPesanan
                            ) {
                                id_pesananSelect.options[i].selected = true;
                                // console.log(nomor_spSelect.options[i].value);
                                break;
                            }
                        }
                        kode_barang.value = option.Uraian.slice(-9);
                        uraian.value = option.Uraian.split("-")
                            .slice(0, -1)
                            .join("-");
                    });
                    fetch("/options/kelompokutama/" + kode_barang.value)
                        .then((response) => response.json())
                        .then((options) => {
                            kelompok_utama.innerHTML =
                                "<option disabled selected value>-- Pilih Kelompok Utama --</option>";
                            options.forEach((option) => {
                                let optionTag =
                                    document.createElement("option");
                                optionTag.value = option.IDTYPEBARANG;
                                optionTag.text =
                                    option.NAMATYPEBARANG +
                                    " | " +
                                    option.IDTYPEBARANG +
                                    " | " +
                                    option.ObjekDivisi;
                                kelompok_utama.appendChild(optionTag);
                                for (
                                    let i = 0;
                                    i < kelompok_utama.options.length;
                                    i++
                                ) {
                                    if (
                                        kelompok_utama.options[i].value ==
                                        data[0].IdKelompokUtama
                                    ) {
                                        kelompok_utama.options[
                                            i
                                        ].selected = true;
                                        break;
                                    }
                                }
                            });
                            fetch(
                                "/options/kelompok/" +
                                    kelompok_utama.value +
                                    "/" +
                                    kode_barang.value
                            )
                                .then((response) => response.json())
                                .then((options) => {
                                    kelompok.innerHTML =
                                        "<option disabled selected value>-- Pilih Kelompok --</option>";
                                    options.forEach((option) => {
                                        let optionTag =
                                            document.createElement("option");
                                        optionTag.value = option.IdKelompok;
                                        optionTag.text = option.NamaKelompok;
                                        kelompok.appendChild(optionTag);
                                        for (
                                            let i = 0;
                                            i < kelompok.options.length;
                                            i++
                                        ) {
                                            if (
                                                kelompok.options[i].value ==
                                                data[0].IdKelompok
                                            ) {
                                                kelompok.options[
                                                    i
                                                ].selected = true;
                                                break;
                                            }
                                        }
                                    });
                                    fetch(
                                        "/options/subkelompok/" +
                                            kelompok.value +
                                            "/" +
                                            kode_barang.value
                                    )
                                        .then((response) => response.json())
                                        .then((options) => {
                                            sub_kelompok.innerHTML =
                                                "<option disabled selected value>-- Pilih Sub Kelompok --</option>";
                                            options.forEach((option) => {
                                                let optionTag =
                                                    document.createElement(
                                                        "option"
                                                    );
                                                optionTag.value =
                                                    option.IDCorak;
                                                optionTag.text = option.Corak;
                                                sub_kelompok.appendChild(
                                                    optionTag
                                                );
                                                for (
                                                    let i = 0;
                                                    i <
                                                    sub_kelompok.options.length;
                                                    i++
                                                ) {
                                                    if (
                                                        sub_kelompok.options[i]
                                                            .value ==
                                                        data[0].IdSubkelompok
                                                    ) {
                                                        sub_kelompok.options[
                                                            i
                                                        ].selected = true;
                                                        break;
                                                    }
                                                }
                                            });
                                        });
                                });
                        });
                });
            qty_primer.value = data[0].QtyPrimer;
            qty_sekunder.value = data[0].QtySekunder;
            qty_tritier.value = data[0].QtyTritier;
            qty_kirim.value = data[0].TerKirim;
            qty_order.value = data[0].Qty;
            max_kirim.value = data[0].MaxKirimDO;
            min_kirim.value = data[0].MinKirimDO;
            qty_primerGudang.value = data[0].SaldoPrimer;
            qty_sekunderGudang.value = data[0].SaldoSekunder;
            qty_tritierGudang.value = data[0].SaldoTritier;
            satuan_primer.value = data[0].SatPrimer;
            satuan_sekunder.value = data[0].SatSekunder;
            satuan_tritier.value = data[0].SatTritier;
            alamat_kirim.value = data[0].AlamatKirim;
            kota_kirim.value = data[0].KotaKirim;
        });
});

id_pesananSelect.addEventListener("change", function () {
    id_pesananText.value = this.value;
    id_pesananSelect.style.display = "none";
    id_pesananText.style.display = "block";
    let selectedOption = this.options[this.selectedIndex];
    let text = selectedOption.text;
    let parts = text.split(" | ");
    // console.log(parts);
    // selectedOption.text = parts[0];
    kode_barang.value = text.slice(-9);
    // console.log(text);
    uraian.value = text.split(" | ")[1].split("-").slice(0, -1).join("-");
    id_pesanan_hidden.value = parts[0];
    // console.log(parts[0]);
    kelompok_utama.focus();
    fetch("/options/barang/" + id_pesananText.value)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            document.getElementById("id_pesanan").disabled = true;
            kode_barang.readOnly = true;
            uraian.readOnly = true;
            qty_kirim.readOnly = true;
            qty_kirim.value = data[0].TerKirim;
            qty_order.readOnly = true;
            qty_order.value = data[0].Qty;
            satuan_primer.readOnly = true;
            satuan_primer.value = data[0].SatuanPrimer;
            satuan_sekunder.readOnly = true;
            satuan_sekunder.value = data[0].SatuanSekunder;
            satuan_tritier.readOnly = true;
            satuan_tritier.value = data[0].SatuanTritier;
        });
    // console.log(kode_barang.value);
    fetch("/options/kelompokutama/" + kode_barang.value)
        .then((response) => response.json())
        .then((options) => {
            kelompok_utama.innerHTML =
                "<option disabled selected value>-- Pilih Kelompok Utama --</option>";
            options.forEach((option) => {
                let optionTag = document.createElement("option");
                optionTag.value = option.IDTYPEBARANG;
                optionTag.text =
                    option.NAMATYPEBARANG +
                    " | " +
                    option.IDTYPEBARANG +
                    " | " +
                    option.ObjekDivisi;
                kelompok_utama.appendChild(optionTag);
            });
        });
});

id_pesananText.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
    }
});

kelompok_utama.addEventListener("change", function () {
    let kelompok_utama = this.value;
    let selectedOption = this.options[this.selectedIndex];
    let text = selectedOption.text;
    let parts = text.split(" | ");
    // console.log(parts);
    divisi.value = parts[2];
    kelompok.focus();
    fetch("/options/kelompok/" + kelompok_utama + "/" + kode_barang.value)
        .then((response) => response.json())
        .then((options) => {
            kelompok.innerHTML =
                "<option disabled selected value>-- Pilih Kelompok --</option>";
            options.forEach((option) => {
                let optionTag = document.createElement("option");
                optionTag.value = option.IdKelompok;
                optionTag.text = option.NamaKelompok;
                kelompok.appendChild(optionTag);
            });
        });
});

kelompok.addEventListener("change", function () {
    let kelompok = this.value;
    sub_kelompok.focus();
    fetch("/options/subkelompok/" + kelompok + "/" + kode_barang.value)
        .then((response) => response.json())
        .then((options) => {
            sub_kelompok.innerHTML =
                "<option disabled selected value>-- Pilih Sub Kelompok --</option>";
            options.forEach((option) => {
                let optionTag = document.createElement("option");
                optionTag.value = option.IDCorak;
                optionTag.text = option.Corak;
                sub_kelompok.appendChild(optionTag);
            });
        });
});

sub_kelompok.addEventListener("change", function () {
    let sub_kelompok = this.value;
    max_kirim.focus();
    fetch("/options/saldo/" + sub_kelompok + "/" + kode_barang.value)
        .then((response) => response.json())
        .then((data) => {
            text_idTypeBarang.style.display = "block";
            id_typeBarang.style.display = "block";
            id_typeBarang.readOnly = true;
            id_typeBarang.value = data[0].IdType;
            qty_primerGudang.value = data[0].SaldoPrimer;
            qty_sekunderGudang.value = data[0].SaldoSekunder;
            qty_tritierGudang.value = data[0].SaldoTritier;
            max_kirim.focus();
            qty_primer.value = 0;
            qty_sekunder.value = 0;
            qty_tritier.value = 0;
        });
});

//#endregion

//#region Button-button

isi_button.addEventListener("click", function (event) {
    event.preventDefault();
    if (proses == 0) {
        proses = 1;
        nomor_doText.style.display = "none";
        listDO_button.style.display = "none";
        nomor_doSpan.style.display = "none";
        listSP_button.disabled = false;
        listBarang_button.disabled = false;
        this.innerHTML = "Proses";
        edit_button.innerHTML = "Batal";
        hapus_button.style.display = "none";
        tgl_do.focus();
    } else if (proses == 1) {
        //BUTTON PROSES
        //isi
        form_deliveryOrder.submit();
        proses = 0;
        this.innerHTML = "Isi";
        edit_button.innerHTML = "Koreksi";
        hapus_button.style.display = "none";
    } else if (proses == 2) {
        //edit
        form_deliveryOrder.action =
            "/DeliveryOrder/" + nomor_doText.value + "/up";
        form_deliveryOrder.submit();

        proses = 0;
        edit_button.innerHTML = "Koreksi";
        this.innerHTML = "Isi";
        hapus_button.style.display = "block";
        listDO_button.disabled = true;
    } else if (proses == 3) {
        //delete
        form_deliveryOrder.action = "/DeliveryOrder/" + nomor_doText.value;
        form_deliveryOrder.submit();
        proses = 0;
        edit_button.innerHTML = "Koreksi";
        this.innerHTML = "Isi";
        hapus_button.style.display = "block";
    }
    div_deliveryOrder.classList.toggle("disabled");
});

edit_button.addEventListener("click", function (event) {
    event.preventDefault();
    if (proses == 0) {
        proses = 2;
        this.innerHTML = "Batal";
        isi_button.innerHTML = "Proses";
        hapus_button.style.display = "none";
        listSP_button.disabled = false;
        listDO_button.disabled = false;
        listBarang_button.disabled = false;
        tgl_do.focus();
        fetch("/options/nomorDO/")
            .then((response) => response.json())
            .then((options) => {
                // console.log(options);
                nomor_doSelect.innerHTML =
                    "<option disabled selected value>-- Pilih Nomor Delivery Order --</option>";
                options.forEach((option) => {
                    let optionTag = document.createElement("option");
                    optionTag.value = option.IDDO;
                    optionTag.text = option.IDDO + " - " + option.Uraian;
                    nomor_doSelect.appendChild(optionTag);
                });
            });
    } else {
        // button BATAL
        proses = 0;
        funcResetForm();
        this.innerHTML = "Koreksi";
        isi_button.innerHTML = "Isi";
        hapus_button.style.display = "block";
    }
    div_deliveryOrder.classList.toggle("disabled");
});

hapus_button.addEventListener("click", function (event) {
    event.preventDefault();
    if (proses == 0) {
        proses = 3;
        edit_button.innerHTML = "Batal";
        isi_button.innerHTML = "Proses";
        this.style.display = "none";
        listDO_button.disabled = false;
        tgl_do.focus();
        fetch("/options/nomorDO/")
            .then((response) => response.json())
            .then((options) => {
                // console.log(options);
                nomor_doSelect.innerHTML =
                    "<option disabled selected value>-- Pilih Nomor Delivery Order --</option>";
                options.forEach((option) => {
                    let optionTag = document.createElement("option");
                    optionTag.value = option.IDDO;
                    optionTag.text = option.IDDO + " - " + option.Uraian;
                    nomor_doSelect.appendChild(optionTag);
                });
            });
    }
    div_deliveryOrder.classList.toggle("disabled");
});

listDO_button.addEventListener("click", function (event) {
    event.preventDefault();
    if (nomor_doSelect.style.display == "block") {
        nomor_doSelect.style.display = "none";
        nomor_doText.style.display = "block";
        nomor_doText.focus();
    } else if (nomor_doSelect.style.display == "none") {
        nomor_doSelect.style.display = "block";
        nomor_doText.style.display = "none";
        nomor_doSelect.focus();
    }
});

listBarang_button.addEventListener("click", function (event) {
    event.preventDefault();
    if (id_pesananSelect.style.display == "block") {
        id_pesananSelect.style.display = "none";
        id_pesananText.style.display = "block";
        id_pesananDiv.style.display = "none";
        id_pesananText.focus();
    } else if (id_pesananSelect.style.display == "none") {
        id_pesananSelect.style.display = "block";
        id_pesananText.style.display = "none";
        id_pesananDiv.style.display = "flex";
        id_pesananSelect.focus();
    }
});

listSP_button.addEventListener("click", function (event) {
    event.preventDefault();
    if (nomor_spSelect.style.display == "block") {
        nomor_spSelect.style.display = "none";
        surat_pesananDiv.style.display = "none";
        nomor_spText.style.display = "block";
    } else if (nomor_spSelect.style.display == "none") {
        nomor_spSelect.style.display = "block";
        surat_pesananDiv.style.display = "flex";
        nomor_spText.style.display = "none";
    }
    // console.log(customer.value);
});
//#endregion

function funcResetForm() {
    surat_pesananDiv.style.display = "none";
    id_pesananDiv.style.display = "none";
    // etd.valueAsDate = new Date();
    // cc.valueAsDate = new Date();
    tgl_do.valueAsDate = new Date();
    nomor_doSelect.selectedIndex = 0;
    nomor_doText.value = "";
    customer.selectedIndex = 0;
    nomor_spSelect.selectedIndex = 0;
    nomor_spText.value = "";
    id_pesananSelect.selectedIndex = 0;
    kode_barang.value = "";
    uraian.value = "";
    kelompok_utama.selectedIndex = 0;
    kelompok.selectedIndex = 0;
    sub_kelompok.selectedIndex = 0;
    qty_primer.value = "";
    qty_sekunder.value = "";
    qty_tritier.value = "";
    qty_kirim.value = "";
    qty_order.value = "";
    max_kirim.value = "";
    min_kirim.value = "";
    qty_primerGudang.value = "";
    qty_sekunderGudang.value = "";
    qty_tritierGudang.value = "";
    divisi = "";
    satuan_primer.value = "";
    satuan_sekunder.value = "";
    satuan_tritier.value = "";
    alamat_kirim.value = "";
    kota_kirim.value = "";
    nomor_doSelect.innerHTML =
        "<option disabled selected value>-- Pilih Nomor Delivery Order --</option>";
    id_pesananSelect.innerHTML =
        "<option disabled selected value>-- Pilih ID Pesanan --</option>";
    id_pesananText.value = "";
    id_pesananText.style.display = "block";
    id_pesananSelect.style.display = "none";
    nomor_spSelect.innerHTML =
        "<option disabled selected value>-- Pilih Nomor Surat Pesanan --</option>";
    nomor_spText.value = "";
    nomor_spSelect.style.display = "none";
    nomor_spText.style.display = "block";
    nomor_doText.style.display = "block";
    listDO_button.style.display = "block";
    listDO_button.disabled = true;
    listSP_button.disabled = true;
    listBarang_button.disabled = true;
    nomor_doSpan.style.display = "block";
    nomor_doSelect.style.display = "none";
}
