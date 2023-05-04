let contoh_printDiv = document.getElementById("contoh_printDiv");
let print_button = document.getElementById("print_button");
let export_pdf = document.getElementById("export_pdf");
let tanggal_sj = document.getElementById("tanggal_sj");
let no_sp = document.getElementById("no_sp");
let no_sj = document.getElementById("no_sj");
let contoh_print = document.getElementById("contoh_print");
let surat_jalanPPN = document.getElementById("surat_jalanPPN");
let surat_jalanNonPPN = document.getElementById("surat_jalanNonPPN");
let surat_jalanAfalan = document.getElementById("surat_jalanAfalan");
let surat_jalanExport = document.getElementById("surat_jalanExport");

//#region Load Form

tanggal_sj.valueAsDate = new Date();
surat_jalanPPN.checked = true;
// contoh_print.style.display = "none";
// contoh_printDiv.style.display = "none";

//#endregion

//#region Event Listener

print_button.addEventListener("click", function () {
    contoh_print.style.display = "block";
    contoh_printDiv.style.display = "block";
    if (surat_jalanPPN.checked == true) {

    } else if (surat_jalanNonPPN.checked == true) {

    } else if (surat_jalanAfalan.checked == true) {

    } else if (surat_jalanExport.checked == true) {

    }
});

//#endregion
