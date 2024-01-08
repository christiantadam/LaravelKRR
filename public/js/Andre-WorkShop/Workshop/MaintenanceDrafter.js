//variabel
var UserDrafter = document.getElementById("UserDrafter");

//button
var btnisi = document.getElementById("isi");
var btnkoreksi = document.getElementById("koreksi");
var btnhapus = document.getElementById("hapus");
var btnproses = document.getElementById("proses");
var btnbatal = document.getElementById("batal");

//input intuk id divisi dan name
var InputidUser = document.getElementById("UsrDraf");
var InputNamaDrafter = document.getElementById("NamaDrafter");
//
var isi = false;
var koreksi = false;
var hapus = false;
var selectedValue = [];
//form
let maintenanceDrafter = document.getElementById("maintenanceDrafter");
let methodForm = document.getElementById("methodForm");

// Menambahkan event listener untuk perubahan nilai pada dropdown list
UserDrafter.addEventListener("change", function () {
    // Mendapatkan nilai dari opsi yang dipilih
    var selectedValue =
    UserDrafter.options[UserDrafter.selectedIndex].text.split("--");
    //console.log(selectedValue);
    // Mengatur nilai input dengan nilai opsi yang dipilih
    InputNamaDrafter.value = selectedValue[1];
});

//ketika isi diklik
function Isidiklik() {
    UserDrafter.style.display = "none";
    InputNamaDrafter.style.display = "block";
    InputidUser.style.display = "block";
    btnhapus.style.display = "none";
    btnbatal.style.display = "";
    btnproses.disabled = false;
    btnisi.disabled = true;
    btnkoreksi.disabled = true;
    InputNamaDrafter.readOnly = false;
    isi = true;
}
function bataldiklik() {
    UserDrafter.style.display = "block";
    InputidUser.style.display = "none";
    btnhapus.style.display = "";
    btnbatal.style.display = "none";
    btnproses.disabled = true;
    btnisi.disabled = false;
    btnkoreksi.disabled = false;
    InputNamaDrafter.readOnly = true;
    InputidUser.value = "";
    InputNamaDrafter.value = "";
    UserDrafter.value = "Pilih Drafter";
    // UserDrafter.disabled = true;
    isi = false;
    koreksi = false;
    hapus = false;
}

function koreksidiklik() {
    UserDrafter.style.display = "block";
    //inputIdDivisi.style.display = "block";
    btnhapus.style.display = "none";
    btnbatal.style.display = "";
    btnproses.disabled = false;
    btnisi.disabled = true;
    btnkoreksi.disabled = true;
    InputNamaDrafter.readOnly = false;
    UserDrafter.disabled = false;
    koreksi = true;
}

function hapusdiklik() {
    UserDrafter.disabled = false;
    InputNamaDrafter.readOnly = true;
    btnhapus.style.display = "none";
    btnbatal.style.display = "";
    btnisi.disabled = true;
    UserDrafter.style.display = "block";
    InputidUser.style.display = "none";
    btnkoreksi.disabled = true;
    btnproses.disabled = false;
    hapus = true;
}

function prosesdiklik() {
    if ((isi === true)) {
        maintenanceDrafter.submit();
    } else if ((koreksi === true)) {
        // maintenanceDivisi.setAttribute('method', "PUT");
        methodForm.value = "PUT";
        // maintenanceDivisi.method = "POST";
        maintenanceDrafter.action = "/MaintenanceDrafter/" + UserDrafter.value;
        // console.log(maintenanceDivisi.method, maintenanceDivisi.action);
        maintenanceDrafter.submit();
    } else if ((hapus === true)) {
        methodForm.value = "DELETE";
        maintenanceDrafter.action = "/MaintenanceDrafter/" + UserDrafter    .value;
        maintenanceDrafter.submit();
    }
}
