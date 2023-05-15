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

//#region Load Form

tanggal_sj.valueAsDate = new Date();
surat_jalanPPN.checked = true;
contoh_print.style.display = "none";
contoh_printDiv.style.display = "none";
// console.log(tanggal_sj.value);
//#endregion

//#region Event Listener

print_button.addEventListener("click", function () {
    if (surat_jalanPPN.checked == true) {
        const form = new FormData();
        const csrfToken = document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content");
        form.append("_token", csrfToken);
        form.append("NomorSJ", no_sjText.value);
        form.append("TanggalSJ", tanggal_sj.value);

        fetch("/suratjalanppn/action", {
            method: "POST",
            body: form,
        })
            .then((response) => response.json())
            .then((data) => {
                contoh_print.style.display = "block";
                contoh_printDiv.style.display = "block";
                console.log(data);
                no_spKolom.innerHTML = no_sp.value;
            });
    } else if (surat_jalanNonPPN.checked == true) {
        //coming soon
        alert("Hanya SJ PPN yang dapat dipilih");
        surat_jalanPPN.checked = true;
        contoh_print.style.display = "none";
        contoh_printDiv.style.display = "none";
    } else if (surat_jalanAfalan.checked == true) {
        //coming soon
        alert("Hanya SJ PPN yang dapat dipilih");
        surat_jalanPPN.checked = true;
        contoh_print.style.display = "none";
        contoh_printDiv.style.display = "none";
    } else if (surat_jalanExport.checked == true) {
        //coming soon
        alert("Hanya SJ PPN yang dapat dipilih");
        surat_jalanPPN.checked = true;
        contoh_print.style.display = "none";
        contoh_printDiv.style.display = "none";
    }
});

no_sjButton.addEventListener("click",function(){
    if (no_sjText.style.display == "inline") {
        no_sjText.style.display = "none";
        no_sjSelect.style.display = "inline";
        no_sjSelect.focus();
    }
    else if(no_sjText.style.display == "none"){
        no_sjText.style.display = "inline";
        no_sjSelect.style.display = "none";
        no_sjText.focus();
    }

});

no_sjSelect.addEventListener("change", function(){
    // console.log(no_sjSelect.options[no_sjSelect.selectedIndex].text);
    no_sjText.value = no_sjSelect.options[no_sjSelect.selectedIndex].text;;
});
//#endregion
