let tanggal_sp = document.getElementById("tanggal_sp");
let lihat_sp = document.getElementById("lihat_sp");
let no_spSelect = document.getElementById("no_spSelect");
let no_spText = document.getElementById("no_spText");
let jenis_sp = document.getElementById("jenis_sp");
let print_button = document.getElementById("print_button");
let export_pdf = document.getElementById("export_pdf");
let print_pdf = document.getElementById("print_pdf");
let contoh_print = document.getElementById("contoh_print");
let contoh_printDiv = document.getElementById("contoh_printDiv");
let table_sp = $("#table_sp").DataTable({
    searching: false,
    paging: false,
    info: false,
    ordering: false,
});

//#region Load Form

tanggal_sp.focus();
tanggal_sp.valueAsDate = new Date();
contoh_print.style.display = "none";
export_pdf.style.display = "none";
no_spSelect.style.display = "none";
print_pdf.style.display = "none";

//#endregion

tanggal_sp.addEventListener("change", function () {
    fetch("/nospeksport/" + this.value)
        .then((response) => response.json())
        .then((options) => {
            no_spSelect.innerHTML =
                "<option disabled selected value>-- Pilih Nomor SP --</option>";
            options.forEach((option) => {
                let optionTag = document.createElement("option");
                optionTag.value = option.IDSuratPesanan;
                optionTag.text =
                    option.IDSuratPesanan + " | " + option.NamaCust;
                no_spSelect.appendChild(optionTag);
            });
        });
});

lihat_sp.addEventListener("click", function (event) {
    event.preventDefault();
    if (no_spSelect.style.display == "block") {
        no_spSelect.style.display = "none";
        no_spText.style.display = "block";
    } else if (no_spSelect.style.display == "none") {
        no_spSelect.style.display = "block";
        no_spText.style.display = "none";
    }
});

no_spSelect.addEventListener("change", function () {
    if (this.selectedIndex !== 0) {
        this.setCustomValidity("Tekan Enter!");
        this.reportValidity();
    }
    no_spText.value = no_spSelect.value;
});

no_spSelect.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        if (this.selectedIndex !== 0) {
            no_spText.value = this.value;
            this.disabled = true;
            const enterEvent = new KeyboardEvent("keypress", { key: "Enter" });
            no_spText.dispatchEvent(enterEvent);
        } else {
            this.setCustomValidity("Pilih Surat Pesanan dulu!");
            this.reportValidity();
        }
    }
});

no_spText.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        let no_spValue = no_spText.value.replace(/\//g, "!");
        // console.log(no_spValue);
        fetch("/jenisspekspor/" + no_spValue)
            .then((response) => response.json())
            .then((options) => {
                // console.log(options);
                jenis_sp.value =
                    options[0].IDJnsSuratPesanan +
                    " | " +
                    options[0].JnsSuratPesanan;
                jenis_sp.readOnly = true;
            });
        print_button.focus();
    }
});

print_button.addEventListener("click", function (event) {
    event.preventDefault();

    if (no_spText.value == "") {
        alert("Pilih Surat Pesanan dulu!");
        no_sp.focus();
    } else {
        contoh_print.style.display = "inline-block";
        print_pdf.style.display = "inline-block";
        contoh_printDiv.style.display = "block";
        let no_spValue = no_spText.value.replace(/\//g, "!");

        fetch("/viewprinteksport/" + no_spValue)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
    }
});
