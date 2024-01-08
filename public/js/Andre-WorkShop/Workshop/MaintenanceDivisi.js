//variabel
var selectdiv = document.getElementById("kddivisi");

//button
var btnisi = document.getElementById("isi");
var btnkoreksi = document.getElementById("koreksi");
var btnhapus = document.getElementById("hapus");
var btnproses = document.getElementById("proses");
var btnbatal = document.getElementById("batal");

//input intuk id divisi dan name
var inputIdDivisi = document.getElementById("IdDivisi");
var inputnameDiv = document.getElementById("NamaDivisi");
//
var isi = false;
var koreksi = false;
var hapus = false;
var selectedValue = [];
//form
let maintenanceDivisi = document.getElementById("maintenanceDivisi");
let methodForm = document.getElementById("methodForm");

// Menambahkan event listener untuk perubahan nilai pada dropdown list
selectdiv.addEventListener("change", function () {
    // Mendapatkan nilai dari opsi yang dipilih
    var selectedValue =
        selectdiv.options[selectdiv.selectedIndex].text.split("--");
    //console.log(selectedValue);
    // Mengatur nilai input dengan nilai opsi yang dipilih
    inputnameDiv.value = selectedValue[1];
});

//ketika isi diklik
function Isidiklik() {
    selectdiv.style.display = "none";
    inputIdDivisi.style.display = "block";
    btnhapus.style.display = "none";
    btnbatal.style.display = "";
    btnproses.disabled = false;
    btnisi.disabled = true;
    btnkoreksi.disabled = true;
    inputnameDiv.readOnly = false;
    isi = true;
}
function bataldiklik() {
    selectdiv.style.display = "block";
    inputIdDivisi.style.display = "none";
    btnhapus.style.display = "";
    btnbatal.style.display = "none";
    btnproses.disabled = true;
    btnisi.disabled = false;
    btnkoreksi.disabled = false;
    inputnameDiv.readOnly = true;
    inputIdDivisi.value = "";
    inputnameDiv.value = "";
    // selectdiv.disabled = true;
    selectdiv.value = "Pilih Divisi";
    isi = false;
    koreksi = false;
    hapus = false;
}

function koreksidiklik() {
    selectdiv.style.display = "block";
    //inputIdDivisi.style.display = "block";
    btnhapus.style.display = "none";
    btnbatal.style.display = "";
    btnproses.disabled = false;
    btnisi.disabled = true;
    btnkoreksi.disabled = true;
    inputnameDiv.readOnly = false;
    selectdiv.disabled = false;
    koreksi = true;
}

function hapusdiklik() {
    selectdiv.disabled = false;
    inputnameDiv.readOnly = true;
    btnhapus.style.display = "none";
    btnbatal.style.display = "";
    btnisi.disabled = true;
    selectdiv.style.display = "block";
    inputIdDivisi.style.display = "none";
    btnkoreksi.disabled = true;
    btnproses.disabled = false;
    hapus = true;
}

function prosesdiklik() {
    if ((isi === true)) {
        maintenanceDivisi.submit();
    } else if ((koreksi === true)) {
        // maintenanceDivisi.setAttribute('method', "PUT");
        methodForm.value = "PUT";
        // maintenanceDivisi.method = "POST";
        maintenanceDivisi.action = "/MaintenanceDivisi/" + selectdiv.value;
        // console.log(maintenanceDivisi.method, maintenanceDivisi.action);
        maintenanceDivisi.submit();
    } else if ((hapus === true)) {
        methodForm.value = "DELETE";
        maintenanceDivisi.action = "/MaintenanceDivisi/" + selectdiv.value;
        maintenanceDivisi.submit();
    }
}
