let contoh_printDiv = document.getElementById("contoh_printDiv");
let contoh_printSjEksportDiv = document.getElementById(
    "contoh_printSjEksportDiv"
);
let print_button = document.getElementById("print_button");
let export_pdf = document.getElementById("export_pdf");
let tanggal_sj = document.getElementById("tanggal_sj");
let no_sp = document.getElementById("no_sp");
let no_sjButton = document.getElementById("no_sjButton");
let no_sjSelect = document.getElementById("no_sjSelect");
let no_sjText = document.getElementById("no_sjText");
let contoh_print = document.getElementById("contoh_print");
let surat_jalanPPN = document.getElementById("surat_jalanPPN");
let surat_jalanNonPPN = document.getElementById("surat_jalanNonPPN");
let surat_jalanAfalan = document.getElementById("surat_jalanAfalan");
let surat_jalanExport = document.getElementById("surat_jalanExport");
let no_spKolom = document.getElementById("no_spKolom");
let alamat_kolom = document.getElementById("alamat_kolom");
let tanggal_kirimKolom = document.getElementById("tanggal_kirimKolom");
let truk_nopolKolom = document.getElementById("truk_nopolKolom");
let table_barangEksport = $("#table_barangEksport").DataTable({
    searching: false,
    paging: false,
    info: false,
    ordering: false,
});
let nama_customerExportKolom = document.getElementById(
    "nama_customerExportKolom"
);
let kota_exportKolom = document.getElementById("kota_exportKolom");
let nama_expeditorExportKolom = document.getElementById(
    "nama_expeditorExportKolom"
);
let truk_nopolExportKolom = document.getElementById("truk_nopolExportKolom");
let tanggal_sjExportKolom = document.getElementById("tanggal_sjExportKolom");
let nomor_spExportKolom = document.getElementById("nomor_spExportKolom");
let nama_barangKolom = document.getElementById("nama_barangKolom");
let satuan_barangPrimerKolom = document.getElementById(
    "satuan_barangPrimerKolom"
);
let jumlah_barangPrimerKolom = document.getElementById(
    "jumlah_barangPrimerKolom"
);
let satuan_barangSekunderKolom = document.getElementById(
    "satuan_barangSekunderKolom"
);
let jumlah_barangSekunderKolom = document.getElementById(
    "jumlah_barangSekunderKolom"
);
let no_poKolom = document.getElementById("no_poKolom");
let alamat_kirimKolom = document.getElementById("alamat_kirimKolom");
let nama_customerKolom = document.getElementById("nama_customerKolom");
let nama_typeBarangKolom = document.getElementById("nama_typeBarangKolom");
let nomor_sjKolom = document.getElementById("nomor_sjKolom");
let print_pdf = document.getElementById("print_pdf");

//#region Load Form

tanggal_sj.valueAsDate = new Date();
surat_jalanPPN.checked = true;
contoh_print.style.display = "none";
contoh_printDiv.style.display = "none";
export_pdf.style.display = "none";
print_pdf.style.display = "none";

//#endregion

//#region Event Listener

print_button.addEventListener("click", function () {
    if (no_sjText.value == "" && no_sp.value == "") {
        alert("Kolom Nomor SJ dan Nomor SP tidak boleh kosong!");
        return;
    }
    if (surat_jalanPPN.checked == true) {
        fetch(
            "/cetakSuratJalanPPN/" +
                tanggal_sj.value +
                "/" +
                no_sjText.value +
                "/suratjalanppn"
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                contoh_printSjEksportDiv.style.width = "21cm";
                no_poKolom.innerHTML = "";
                no_spKolom.innerHTML = no_sp.value;
                nomor_sjKolom.innerHTML = "sj: " + no_sjText.value;
                nama_typeBarangKolom.innerHTML = data[0].NAMATYPEBARANG;
                nama_barangKolom.innerHTML = data[0].NamaType;
                tanggal_kirimKolom.innerHTML = formatDate(tanggal_sj.value); // masih salah format
                truk_nopolKolom.innerHTML = data[0].TrukNopol;
                no_spKolom.innerHTML = data[0].SuratPesanan;
                if (data[0].Ket !== null) {
                    var ketWithLineBreaks = data[0].Ket.replace(
                        /\r\n/g,
                        " <br> "
                    ); // Replace '\r\n' with '<br>'
                }
                keterangan_tambahanKolom.innerHTML = ketWithLineBreaks;
                alamat_kolom.innerHTML = data[0].Alamat;
                satuan_barangPrimerKolom.innerHTML = data[0].satPrimer.trim();
                jumlah_barangPrimerKolom.innerHTML = data[0].QtyPrimer;
                satuan_barangSekunderKolom.innerHTML =
                    data[0].satSekunder.trim();
                jumlah_barangSekunderKolom.innerHTML = data[0].QtySekunder;
                if (data[0].NO_PO !== null) {
                    no_poKolom.innerHTML = "PO: " + data[0].NO_PO;
                }
                nama_customerKolom.innerHTML = data[0].NamaCust;
                alamat_kirimKolom.innerHTML =
                    "Dikirim ke: <br>" + data[0].AlamatKirim;
                contoh_print.style.display = "block";
                contoh_printDiv.style.display = "block";
                export_pdf.style.display = "inline-block";
                print_pdf.style.display = "inline-block";
            });
    } else if (surat_jalanNonPPN.checked == true) {
        //coming soon
        alert("Hanya SJ PPN dan SJ Export yang dapat dipilih");
        surat_jalanPPN.checked = true;
        return;
    } else if (surat_jalanAfalan.checked == true) {
        //coming soon
        alert("Hanya SJ PPN dan SJ Export yang dapat dipilih");
        surat_jalanPPN.checked = true;
        return;
    } else if (surat_jalanExport.checked == true) {
        if (
            no_sjSelect.options[no_sjSelect.selectedIndex].text
                .split(" | ")[0]
                .includes("Export")
        ) {
            fetch(
                "/cetakSuratJalanPPN/" +
                    tanggal_sj.value +
                    "/" +
                    no_sjText.value +
                    "/suratjalanexport"
            )
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    contoh_printSjEksportDiv.style.width = "100%";
                    table_barangEksport.clear();
                    contoh_printDiv.style.display = "none";

                    nomor_sjExport.innerHTML = "SJ No. : " + no_sjText.value;
                    tanggal_sjExportKolom.innerHTML = formatDateToCustomString(
                        tanggal_sj.value
                    );

                    truk_nopolExportKolom.innerHTML = data[0].TrukNopol;
                    nomor_spExportKolom.innerHTML = no_sp.value;
                    nama_customerExportKolom.innerHTML = data[0].NamaCust;
                    kota_exportKolom.innerHTML = data[0].Kota;
                    nama_expeditorExportKolom.innerHTML = data[0].NamaExpeditor;

                    data.forEach((item, index) => {
                        const combinedData = `${index + 1} - ${
                            item.NamaType
                        } - ${item.QtyPrimer} - ${item.satPrimer}`;

                        table_barangEksport.row
                            .add([
                                combinedData, // Combined Column
                                item.Satuan, // Satuan
                                item.QtySekunder, // QtySekunder
                            ])
                            .draw();
                    });
                    $("#table_barangEksport tbody tr td:first-child").addClass("first-column-width-90");
                    contoh_print.style.display = "block";
                    contoh_printSjEksportDiv.style.display = "block";
                    export_pdf.style.display = "inline-block";
                    print_pdf.style.display = "inline-block";
                });
        } else {
            alert("SJ yang dipilih bukan SJ Export!");
            no_sjSelect.focus();
            contoh_print.style.display = "none";
            contoh_printDiv.style.display = "none";
            export_pdf.style.display = "none";
            print_pdf.style.display = "none";
            return;
        }
    }
});

no_sjButton.addEventListener("click", function () {
    if (no_sjText.style.display == "inline") {
        fetch("/optionsCetakSuratJalan/" + tanggal_sj.value)
            .then((response) => response.json())
            .then((datas) => {
                no_sjSelect.innerHTML =
                    "<option disabled selected value>-- Pilih Nomor Surat Jalan --</option>";

                datas.forEach((data) => {
                    let optionTag = document.createElement("option");
                    optionTag.value = data.IDSuratPesanan;
                    optionTag.text =
                        data.NamaJnsSuratJalan + " | " + data.IDPengiriman;
                    no_sjSelect.appendChild(optionTag);
                });

                no_sjText.style.display = "none";
                no_sjSelect.style.display = "inline";
                no_sjSelect.focus();
            });
    } else if (no_sjText.style.display == "none") {
        no_sjText.style.display = "inline";
        no_sjSelect.style.display = "none";
        no_sjText.focus();
    }
});

no_sjSelect.addEventListener("change", function () {
    no_sjText.value =
        no_sjSelect.options[no_sjSelect.selectedIndex].text.split(" | ")[1];
    no_sp.value = no_sjSelect.value;
});

tanggal_sj.addEventListener("change", function () {
    if (no_sjText.style.display == "none") {
        no_sjText.style.display = "inline";
        no_sjSelect.style.display = "none";
    }
});

print_pdf.addEventListener("click", function (event) {
    event.preventDefault();
    window.print();
});
//#endregion

function formatDate(inputDate) {
    const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "October",
        "November",
        "December",
    ];

    const dateParts = inputDate.split("-");
    const year = dateParts[0];
    const month = parseInt(dateParts[1]);
    const day = parseInt(dateParts[2]);

    const formattedDate =
        `${day}` + "-" + `${months[month - 1]}` + "-" + `${year}`;
    return formattedDate;
}

function formatDateToCustomString(dateString) {
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

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return "Invalid date";
    }

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} / ${month} / ${year}`;
}
