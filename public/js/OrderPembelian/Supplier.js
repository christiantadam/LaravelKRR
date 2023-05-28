let alamat1 = document.getElementById("alamat1");
let alamat2 = document.getElementById("alamat2");
let clear_button = document.getElementById("clear_button");
let contact_person1 = document.getElementById("contact_person1");
let contact_person2 = document.getElementById("contact_person2");
let email1 = document.getElementById("email1");
let email2 = document.getElementById("email2");
let fax1 = document.getElementById("fax1");
let fax2 = document.getElementById("fax2");
let form_supplier = document.getElementById("form_supplier");
let kode = document.getElementById("kode");
let hapus_button = document.getElementById("hapus_button");
let kota1 = document.getElementById("kota1");
let kota2 = document.getElementById("kota2");
let mata_uang = document.getElementById("mata_uang");
let mobile_phone1 = document.getElementById("mobile_phone1");
let mobile_phone2 = document.getElementById("mobile_phone2");
let negara1 = document.getElementById("negara1");
let negara2 = document.getElementById("negara2");
let phone1 = document.getElementById("phone1");
let phone2 = document.getElementById("phone2");
let save_button = document.getElementById("save_button");
let supplier_id = document.getElementById("supplier_id");
let supplier_select = document.getElementById("supplier_select");
let supplier_text = document.getElementById("supplier_text");
let swtich_supplier = document.getElementById("swtich_supplier");

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

    fetch("/options/supplierselect/" + supplier_id.value)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);

            alamat1.value = data[0].ALAMAT1;
            alamat2.value = data[0].ALAMAT2;
            contact_person1.value = data[0].PERSON1;
            contact_person2.value = data[0].PERSON2;
            email1.value = data[0].KOMPLEK1;
            email2.value = data[0].KOMPLEK2;
            fax1.value = data[0].TELEX1;
            fax2.value = data[0].TELEX2;
            kota1.value = data[0].KOTA1;
            kota2.value = data[0].KOTA2;
            mobile_phone1.value = data[0].HPHONE1;
            mobile_phone2.value = data[0].HPHONE2;
            negara1.value = data[0].NEGARA1;
            negara2.value = data[0].NEGARA2;
            phone1.value = data[0].TLP1;
            phone2.value = data[0].TLP2;

            const optionMataUang = mata_uang.options;

            for (let i = 0; i < optionMataUang.length; i++) {
                const option = optionMataUang[i];
                if (option.value === data[0].Id_MataUang) {
                    option.selected = true;
                    break;
                }
            }
        });
});

save_button.addEventListener("click", function (event) {
    event.preventDefault();
    if (supplier_id.value !== "") {
        kode.value = "3";
        form_supplier.submit();
    } else {
        if (supplier_text.value == "") {
            alert("Nama Supplier Tidak boleh kosong!");
            return;
        } else {
            kode.value = "2";
            form_supplier.submit();
        }
    }
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
    if (supplier_id.value == "") {
        alert("Pilih Supplier dulu!");
        return;
    } else {
        kode.value = "4";
        form_supplier.submit();
    }
});
