let divisi = document.getElementById("divisi");
let mesin = document.getElementById("mesin");
let iddivisi = document.getElementById("iddivisi");

//button
let btnisi = document.getElementById("isi");
let btnkoreksi = document.getElementById("koreksi");
let btnhapus = document.getElementById("hapus");
let btnproses = document.getElementById("proses");
let btnbatal = document.getElementById("batal");

let ganti = document.getElementById("ganti");

//simpan select awal
let divisiAwal = divisi.value;
let mesinAwal = mesin.value;

//input mesin
let isimesin = document.getElementById("isiMesin");
let select = true;
let input = false;

//
let maintenanceMesin = document.getElementById("maintenanceMesin");
let methodForm = document.getElementById("methodForm");
let isi = false;
let koreksi = false;
let hapus = false;

divisi.addEventListener("change", function () {
    if (this.selectedIndex !== 0) {
        this.classList.add("input-error");
        this.setCustomValidity("Tekan Enter!");
        this.reportValidity();
    }
});
divisi.addEventListener("keypress", function (event) {
    event.preventDefault();
    if (this.selectedIndex !== 0) {
        iddivisi.value = this.value;
        // this.disabled = true;
        this.setCustomValidity(""); // Clear the custom validity message
        this.reportValidity();
        const enterEvent = new KeyboardEvent("keypress", { key: "Enter" });
        iddivisi.dispatchEvent(enterEvent);
    }
});


iddivisi.addEventListener("keypress", function (event) {
    event.preventDefault();
    if (event.key == "Enter") {
        // this.disabled = true;
        //console.log(divisi.value);

        fetch("/getmesin/" + iddivisi.value)
            .then((response) => response.json())
            .then((options) => {
                //console.log(options);
                mesin.innerHTML = "";
                //
                const defaultOption = document.createElement("option");
                defaultOption.disabled = true;
                defaultOption.selected = true;
                defaultOption.innerText = "Pilih Mesin";
                mesin.appendChild(defaultOption);
                //
                options.forEach((entry) => {
                    const option = document.createElement("option");
                    option.value = entry.Nomer;
                    option.innerText = entry.Mesin + "--" + entry.Nomer;
                    mesin.appendChild(option);
                });
            });
    }
});


mesin.addEventListener("change", function () {
    var selectedValue =
        mesin.options[mesin.selectedIndex].text.split("--");
        isimesin.value = selectedValue[0];
});


//tukar
function tukar(event) {
    event.preventDefault();
    if (select == true){
        //console.log("select = true");
        mesin.style.display = "none";
        isimesin.style.display = "block";
        input = true;
        select = false;
    }
    else if (input == true){
        //console.log("select false");
        mesin.style.display = "block";
        isimesin.style.display = "none";
        select = true;
        input = false;
    }

}
//ketika isi diklik
function Isidiklik() {

    btnhapus.style.display = "none";
    btnbatal.style.display = "";
    btnproses.disabled = false;
    btnisi.disabled = true;
    btnkoreksi.disabled = true;
    divisi.disabled = false;
    mesin.disabled = false;
    ganti.disabled = false;
    isi = true;

}
function bataldiklik() {

    btnhapus.style.display = "";
    btnbatal.style.display = "none";
    btnproses.disabled = true;
    btnisi.disabled = false;
    btnkoreksi.disabled = false;
    divisi.disabled = true;
    mesin.disabled = true;
    ganti.disabled = true;
    divisi.value = divisiAwal;
    mesin.value = mesinAwal;
    mesin.style.display = "block";
    isimesin.style.display = "none";
    mesin.value = "Pilih Mesin";
    select = true;
    input = false;
    isimesin.value = "";
    divisi.value = "Pilih Divisi";
    isi = false;
    koreksi = false;
    hapus = false;

}

function koreksidiklik() {

    btnhapus.style.display = "none";
    btnbatal.style.display = "";
    btnproses.disabled = false;
    btnisi.disabled = true;
    btnkoreksi.disabled = true;
    divisi.disabled = false;
    mesin.disabled = false;
    ganti.disabled = false;
    koreksi = true;

}

function hapusdiklik() {
    btnhapus.style.display = "none";
    btnbatal.style.display = "";
    btnisi.disabled = true;
    btnkoreksi.disabled = true;
    btnproses.disabled = false;
    divisi.disabled = false;
    mesin.disabled = false;
    ganti.disabled = true;
    hapus = true;
}

function prosesdiklik() {
    if ((isi === true)) {
        if(divisi.value=="Pilih Divisi"){
            alert("memilih divisi! Silakan pilih terlebih dahulu.");
        }
        else {
            //console.log(divisi.value);
           maintenanceMesin.submit();
        }
    } else if ((koreksi === true)) {
        // maintenanceDivisi.setAttribute('method', "PUT");
        methodForm.value = "PUT";
        // maintenanceDivisi.method = "POST";
        maintenanceMesin.action = "/MaintenanceMesin/" + divisi.value;
        // console.log(maintenanceDivisi.method, maintenanceDivisi.action);
        maintenanceMesin.submit();
    } else if ((hapus === true)) {
        methodForm.value = "DELETE";
        maintenanceMesin.action = "/MaintenanceMesin/" + mesin.value;
        maintenanceMesin.submit();
    }
}
