let button_proses = document.getElementById("button_proses");
let button_tampilkanPilihan = document.getElementById("button_tampilkanPilihan");
let kode_barang = document.getElementById("kode_barang");
let jumlah_dataKolom = document.getElementById("jumlah_dataKolom");
let tempat_dispresiasi = document.getElementById("tempat_dispresiasi");
let tanggal_cariBarcode = document.getElementById("tanggal_cariBarcode");
let table_Barcode = document.getElementById("table_Barcode");
let div_tableBarcode = document.getElementById("div_tableBarcode");

//#region Load Form

tempat_dispresiasi.checked = true;
tanggal_cariBarcode.valueAsDate = new Date();
kode_barang.focus();
//#endregion

//#region Input Filter

//#endregion

//#region button-button

button_proses.addEventListener("click", function(){
    if(kode_barang.value == ""){
        alert("Isi kode barang lebih dulu!")
    }
    else{
        div_tableBarcode.style.display = "block";
        jumlah_dataKolom.style.display = "flex";
    }
});
//#endregion
