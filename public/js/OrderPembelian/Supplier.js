let swtich_supplier = document.getElementById("swtich_supplier");
let supplier_select = document.getElementById("supplier_select");
let supplier_text = document.getElementById("supplier_text");
let supplier_id = document.getElementById("supplier_id");
let save_button = document.getElementById("save_button");
let clear_button = document.getElementById("clear_button");
let hapus_button = document.getElementById("hapus_button");
let contact_person2 = document.getElementById("contact_person2");
let phone2 = document.getElementById("phone2");
let mobile_phone2 = document.getElementById("mobile_phone2");
let email2 = document.getElementById("email2");
let fax2 = document.getElementById("fax2");
let alamat2 = document.getElementById("alamat2");
let kota2 = document.getElementById("kota2");
let negara2 = document.getElementById("negara2");
let contact_person1 = document.getElementById("contact_person1");
let phone1 = document.getElementById("phone1");
let mobile_phone1 = document.getElementById("mobile_phone1");
let email1 = document.getElementById("email1");
let fax1 = document.getElementById("fax1");
let alamat1 = document.getElementById("alamat1");
let kota1 = document.getElementById("kota1");
let negara1 = document.getElementById("negara1");
let mata_uang = document.getElementById("mata_uang");

swtich_supplier.addEventListener("click", function (event) {
    event.preventDefault();
    if (supplier_select.style.display == "none") {
        supplier_text.style.display = "none";
        supplier_select.style.display = "flex";
    } else if (supplier_select.style.display == "flex") {
        supplier_text.style.display = "flex";
        supplier_select.style.display = "none";
    }
});

supplier_select.addEventListener("change", function () {
    supplier_text.value =
        supplier_select.options[supplier_select.selectedIndex].text;
    supplier_id.value =
        supplier_select.options[supplier_select.selectedIndex].value;
});

save_button.addEventListener("click", function (event) {

});

clear_button.addEventListener("click", function (event) {
    event.preventDefault();
    contact_person2.value = "";
    phone2.value = "";
    mobile_phone2.value = "";
    email2.value = "";
    fax2.value = "";
    alamat2.value = "";
    kota2.value = "";
    negara2.value = "";
    contact_person1.value = "";
    phone1.value = "";
    mobile_phone1.value = "";
    email1.value = "";
    fax1.value = "";
    alamat1.value = "";
    kota1.value = "";
    negara1.value = "";
    supplier_text.value = "";
    supplier_id.value = "";
    supplier_select.selectedIndex = 0;
    mata_uang.selectedIndex = 0;
});

hapus_button.addEventListener("click", function (event) {
    event.preventDefault();
});
