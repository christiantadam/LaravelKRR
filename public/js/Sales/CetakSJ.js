let contoh_printDiv = document.getElementById("contoh_printDiv");
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
let nama_barangKolom = document.getElementById("nama_barangKolom");
let satuan_barangPrimerKolom = document.getElementById("satuan_barangPrimerKolom");
let jumlah_barangPrimerKolom = document.getElementById("jumlah_barangPrimerKolom");
let satuan_barangSekunderKolom = document.getElementById("satuan_barangSekunderKolom");
let jumlah_barangSekunderKolom = document.getElementById("jumlah_barangSekunderKolom");
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
        fetch("/cetakSuratJalanPPN/" + tanggal_sj.value + "/" + no_sjText.value)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                no_poKolom.innerHTML = "";
                no_spKolom.innerHTML = no_sp.value;
                nomor_sjKolom.innerHTML = "sj: " + no_sjText.value;
                nama_typeBarangKolom.innerHTML = data[0].NAMATYPEBARANG;
                nama_barangKolom.innerHTML =data[0].NamaType;
                tanggal_kirimKolom.innerHTML = tanggal_sj.value; // masih salah format
                truk_nopolKolom.innerHTML = data[0].TrukNopol;
                no_spKolom.innerHTML = data[0].SuratPesanan;
                alamat_kolom.innerHTML = data[0].Alamat;
                satuan_barangPrimerKolom.innerHTML = data[0].satPrimer.trim();
                jumlah_barangPrimerKolom.innerHTML = data[0].QtyPrimer;
                satuan_barangSekunderKolom.innerHTML = data[0].satSekunder.trim();
                jumlah_barangSekunderKolom.innerHTML = data[0].QtySekunder;
                if (data[0].NO_PO !== null) {
                    no_poKolom.innerHTML = "PO: " + data[0].NO_PO;
                }
                nama_customerKolom.innerHTML = data[0].NamaCust
                alamat_kirimKolom.innerHTML = "Dikirim ke: <br>"+data[0].AlamatKirim;
                contoh_print.style.display = "block";
                contoh_printDiv.style.display = "block";
                export_pdf.style.display = "inline-block";
                print_pdf.style.display = "inline-block";
            });
    } else if (surat_jalanNonPPN.checked == true) {
        //coming soon
        alert("Hanya SJ PPN yang dapat dipilih");
        surat_jalanPPN.checked = true;
        return;
    } else if (surat_jalanAfalan.checked == true) {
        //coming soon
        alert("Hanya SJ PPN yang dapat dipilih");
        surat_jalanPPN.checked = true;
        return;
    } else if (surat_jalanExport.checked == true) {
        //coming soon
        alert("Hanya SJ PPN yang dapat dipilih");
        surat_jalanPPN.checked = true;
        return;
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
