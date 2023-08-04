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
    columnDefs: [
        { targets: 0, width: "3%" }, // Set the width of the first column to 10%
        { targets: 1, width: "40%" }, // Set the width of the second column to 60%
        { targets: 2, width: "15%" }, // Set the width of the third column to 15%
        { targets: 3, width: "10%" }, // Set the width of the fourth column to 15%
        { targets: 4, width: "10%" }, // Set the width of the fourth column to 15%
        { targets: 5, width: "10%" }, // Set the width of the fourth column to 15%
        { targets: 6, width: "12%" }, // Set the width of the fourth column to 15%
    ],
});
let no_spKolom = document.getElementById("no_spKolom");
let no_piKolom = document.getElementById("no_piKolom");
let no_poKolom = document.getElementById("no_poKolom");
let tgl_pesanKolom = document.getElementById("tgl_pesanKolom");
let nama_customerKolom = document.getElementById("nama_customerKolom");
let alamat_kantorKolom = document.getElementById("alamat_kantorKolom");
let destination_kolom = document.getElementById("destination_kolom");
// let remarks_quantityKolom = document.getElementById("remarks_quantityKolom");
// let remarks_packingKolom = document.getElementById("remarks_packingKolom");
// let remarks_priceKolom = document.getElementById("remarks_priceKolom");
let payment_byKolom = document.getElementById("payment_byKolom");
let destination_portKolom = document.getElementById("destination_portKolom");
let cargo_readyKolom = document.getElementById("cargo_readyKolom");
let nama_perusahaanKolom = document.getElementById("nama_perusahaanKolom");
let nama_salesKolom = document.getElementById("nama_salesKolom");
let price_forKolom = document.getElementById("price_forKolom");
let price_amountKolom = document.getElementById("price_amountKolom");

//#region Load Form

tanggal_sp.focus();
tanggal_sp.valueAsDate = new Date();
contoh_print.style.display = "none";
export_pdf.style.display = "none";
no_spSelect.style.display = "none";
print_pdf.style.display = "none";
contoh_printDiv.style.display = "none";

//#endregion

tanggal_sp.addEventListener("change", function () {
    fetch("/nopieksport/" + this.value)
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
        no_spText.focus();
    } else if (no_spSelect.style.display == "none") {
        no_spSelect.style.display = "block";
        no_spText.style.display = "none";
        no_spSelect.focus();
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
        let no_spValue = no_spText.value.replace(/\//g, ".");
        // console.log(no_spValue);
        fetch("/jenispiekspor/" + no_spValue)
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
    contoh_printDiv.style.display = "block";
    contoh_print.style.display = "block";
    if (no_spText.value == "") {
        alert("Pilih Surat Pesanan dulu!");
        no_sp.focus();
    } else {
        contoh_print.style.display = "inline-block";
        print_pdf.style.display = "inline-block";
        contoh_printDiv.style.display = "block";
        let no_spValue = no_spText.value.replace(/\//g, ".");

        fetch("/viewprintpi/" + no_spValue)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // no_spKolom.innerHTML = "No. " + data[0].NO_SP;
                no_piKolom.innerHTML = data[0].NO_PI;
                no_poKolom.innerHTML =
                    "Buyer Reference contract number: " + data[0].NO_PO;
                tgl_pesanKolom.innerHTML = "Sidoarjo, " + convertDateFormat(data[0].TGL_SP);
                nama_customerKolom.innerHTML = data[0].NamaCust;
                fax_customerKolom.innerHTML = data[0].NoFax1 ?? data[0].NoFax2;
                // alamat_kantorKolom.innerHTML = data[0].Alamat;
                // destination_kolom.innerHTML = data[0].AlamatKirim;
                price_forKolom.innerHTML =
                    "PRICE " +
                    data[0].JenisHargaBarang +
                    "<br>(" +
                    data[0].IDMataUang +
                    ")";
                price_amountKolom.innerHTML =
                    "AMOUNT <br>" + "(" + data[0].IDMataUang + ")";
                table_sp.clear();
                data.forEach((item, index) => {
                    // console.log(item);
                    var amount =
                        parseFloat(item.JmlOrder) *
                        parseFloat(item.HargaSatuan);
                    if (item.UraianPesanan.includes(" | ")) {
                        let UraianPesananArray = item.UraianPesanan.replace(
                            /\r\n/g,
                            " <br> "
                        ).split(" | ");
                        // console.log(item.UraianPesanan);
                        // console.log(UraianPesananArray);
                        table_sp.row
                            .add([
                                index + 1,
                                UraianPesananArray[0],
                                UraianPesananArray[2],
                                formatangka(item.JmlOrder),
                                formatangka(item.HargaSatuan),
                                formatangka(amount.toFixed(2)),
                                UraianPesananArray[1],
                            ])
                            .draw();
                    } else {
                        table_sp.row
                            .add([
                                index + 1,
                                "No Data",
                                "No Data",
                                formatangka(item.JmlOrder),
                                formatangka(item.HargaSatuan),
                                formatangka(amount.toFixed(2)),
                                "No Data",
                            ])
                            .draw();
                    }
                });
                if (data[0].Ket == null) {
                    data[0].Ket = "";
                }
                if (data[0].Ket.includes(" | ")) {
                    let KeteranganArray = data[0].Ket.split(" | ");
                    remarks_quantityKolom.innerHTML = KeteranganArray[2];
                    remarks_packingKolom.innerHTML = KeteranganArray[3];
                    remarks_priceKolom.innerHTML = KeteranganArray[4];
                    payment_byKolom.innerHTML = KeteranganArray[1];
                    cargo_readyKolom.innerHTML = KeteranganArray[0];
                    // console.log(KeteranganArray);
                } else {
                    remarks_quantityKolom.innerHTML = "No Data";
                    remarks_packingKolom.innerHTML = "No Data";
                    remarks_priceKolom.innerHTML = "No Data";
                    payment_byKolom.innerHTML = "No Data";
                    cargo_readyKolom.innerHTML = "No Data";
                }
                destination_portKolom.innerHTML = data[0].AlamatKirim;
                nama_perusahaanKolom.innerHTML = data[0].NamaCust;
                nama_salesKolom.value = "Mr. " + data[0].NamaSales;
            });
    }
});

print_pdf.addEventListener("click", function (event) {
    event.preventDefault();
    table_sp.draw();
    window.print();
});

function convertDateFormat(inputDate) {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const [datePart, timePart] = inputDate.split(" ");
    const [year, month, day] = datePart.split("-");
    const formattedDate = `${months[Number(month) - 1]} ${day}, ${year}`;

    return formattedDate;
}

function formatDateToMMDDYYYY(dateString) {
    var date = new Date(dateString);
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    var formatted_date = month + "-" + day + "-" + year;
    return formatted_date;
}

function formatangka(objek) {
    // Convert the input to a numerical value and then to a string
    // to handle cases where the input is a number or a string.
    let a = Number(objek).toFixed(2).toString(); // Convert to a string with 2 decimal places
    // console.log(a);
    let parts = a.split("."); // Split the string into parts before and after the decimal point
    let wholePart = parts[0];
    let decimalPart = parts[1];
    // console.log(parts);
    // Add thousands separators to the wholePart
    let formattedWholePart = "";
    let panjang = wholePart.length;
    for (let i = panjang; i > 0; i--) {
        // console.log(panjang, i);
        if ((panjang - i) % 3 === 0 && i !== panjang) {
            formattedWholePart = formattedWholePart + ".";
        }
        formattedWholePart += wholePart.charAt(i - 1);
        // console.log(formattedWholePart);
    }
    // console.log(formattedWholePart);
    // Combine the formatted wholePart and the decimalPart
    let result = formattedWholePart.split("").reverse().join("");
    if (decimalPart) {
        result += "," + decimalPart;
    }

    return result;
}
