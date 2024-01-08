let btnproses = document.getElementById("btnproses");
let Pemberi = document.getElementById("Pemberi");
let OrderKerja = document.getElementById("OrderKerja");
let FormACCPPIC = document.getElementById('FormACCPPIC');
let methodForm  = document.getElementById('methodForm');



btnproses.addEventListener('click', function(){
    if (Pemberi.value == "Pilih Pemberi Order") {
        alert("Belum mengisi Nama Pemberi");
        return;
    }
    if (OrderKerja.value == "Pilih Order Kerja") {
        alert("Belum mengisi Nomor Order");
        return;
    }
    methodForm.value = "PUT";
    FormACCPPIC.action =
        "/ACCPPIC/" + OrderKerja.value;
    FormACCPPIC.submit();
});
