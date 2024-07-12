let idSupplier = document.getElementById("idSupplier");
let namaSupplier = document.getElementById("namaSupplier");
let supplierSelect = document.getElementById("supplierSelect");
let detailPO = document.getElementById("detailPO");
let detailFakturPajak = document.getElementById("detailFakturPajak");
let proses;

let btnIsi = document.getElementById("btnIsi");
let btnKoreksi = document.getElementById("btnKoreksi");
let btnProses = document.getElementById("btnProses");
let btnPrint = document.getElementById("btnPrint");
let btnBatal = document.getElementById("btnBatal");

let btnIsiDetail = document.getElementById("btnIsiDetail");
let btnIsiDetail2 = document.getElementById("btnIsiDetail2");
let btnKoreksiDetail = document.getElementById("btnKoreksiDetail");
let btnHapusDetail = document.getElementById("btnHapusDetail");

let formkoreksi = document.getElementById("formkoreksi");
let methodform = document.getElementById("methodkoreksi");

btnKoreksi.addEventListener('click', function (event) {
    event.preventDefault();
});

btnIsiDetail.addEventListener('click', function (event) {
    event.preventDefault();
    validateIsiDetail();
})

// btnIsiDetail2.addEventListener('click', function (event) {
//     event.preventDefault();
//     validateIsiDetail();
// })

btnIsi.addEventListener('click', function (event) {
    event.preventDefault();
})

function clickIsi() {
    btnIsi.disabled = true;
    btnKoreksi.disabled = true;
    btnPrint.disabled = true;
    btnBatal.style.display = "block";
    btnIsiDetail.disabled = false;
    btnKoreksiDetail.disabled = false;
    btnHapusDetail.disabled = false;
    supplierSelect.disabled = false;
    //proses = 1;
}

function clickKoreksi() {
    btnIsi.disabled = true;
    btnKoreksi.disabled = true;
    btnPrint.disabled = true;
    btnBatal.style.display = "block";
    btnIsiDetail.disabled = false;
    btnKoreksiDetail.disabled = false;
    btnHapusDetail.disabled = false;
    supplierSelect.disabled = false;
    proses = 2;
}

// supplierSelect.addEventListener("change", function () {
//     if (this.selectedIndex !== 0) {
//         this.classList.add("input-error");
//         this.setCustomValidity("Tekan Enter!");
//         this.reportValidity();
//     }
// });

supplierSelect.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        let text = supplierSelect.options[supplierSelect.selectedIndex].text.split("|");
        idSupplier.value = text[0];
        namaSupplier.value = text[1];
        // fetch("/detailSupplier/" + idSupplier.value)
        //     .then((response) => response.json())
        //     .then((options) => {
        //         console.log(options);
        //         idSupplier.value = options[0].NO_SUP;
        //         namaSupplier.value = options[0].NM_SUP;
        //     });
    }
});

function validateIsiDetail() {
    let detailSelect = document.getElementsByName("radiogrup");
    let isSelected = false;
    for (let radio of detailSelect) {
        if (radio.checked) {
            isSelected = true;
            break;
        }
    }
    if (isSelected) {
        let selectedValue = document.querySelector('input[name="radiogrup"]:checked').value;
        if (selectedValue === "po") {
            window.location.href="MPIsiDetail";
        } else if (selectedValue === "faktur") {
            $('#isiDetailModal').modal('show');
        } else if(selectedValue === 'pib') {

        }
    } else {
        alert("Pilih dulu Isi Detail SPPB atau FAKTUR atau PIB !!.");
    }
};

btnProses.addEventListener ("click", function (event) {
    event.preventDefault();
    if (proses == 1) {
        // console.log("masuk isi");
        // formkoreksi.submit();
    } else if (proses == 2) {
        //console.log("masuk korek");
        // methodform.value="PUT";
        // formkoreksi.action = "/MaintenanceMataUang/" + idMataUang.value;
        //formkoreksi.append(hiddenInput);
        formkoreksi.submit();
    } else if (proses == 3) {
        // methodform.value="DELETE";
        // formkoreksi.action = "/MaintenanceMataUang/" + idMataUang.value;
        // formkoreksi.submit();
    }
});
