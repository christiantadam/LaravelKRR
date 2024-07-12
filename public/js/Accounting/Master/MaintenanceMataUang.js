let idMataUang = document.getElementById("idMataUang");
let namaMataUang = document.getElementById("namaMataUang");
let symbol = document.getElementById("symbol");
let proses;

let btnIsi = document.getElementById("btnIsi");
let btnKoreksi = document.getElementById("btnKoreksi");
let btnHapus = document.getElementById("btnHapus");
let btnProses = document.getElementById("btnProses");
let btnKeluar = document.getElementById("btnKeluar");
let btnBatal = document.getElementById("btnBatal");

let formkoreksi = document.getElementById("formkoreksi");
let methodform = document.getElementById("methodkoreksi");

//#region Load Form

idMataUang.focus();

//#endregion


btnIsi.addEventListener('click', function (event) {
    event.preventDefault();
})

btnProses.addEventListener('click', function (event) {
    event.preventDefault();
})

btnKoreksi.addEventListener('click', function (event) {
    event.preventDefault();
});

btnBatal.addEventListener('click', function (event) {
    event.preventDefault();
    idMataUang.selectedIndex = 0;
    namaMataUang.value = "";
    symbol.value ="";
});

btnHapus.addEventListener('click', function(event) {
    event.preventDefault();
})

function clickIsi() {
    btnIsi.disabled = true;
    btnKoreksi.disabled = true;
    btnHapus.disabled = true;
    btnProses.disabled = false;
    btnBatal.style.display = "block";
    idMataUang.disabled = true;
    proses = 1;
}

function clickKoreksi() {
    btnIsi.disabled = true
    btnKoreksi.disabled = true;
    btnHapus.disabled = true;
    btnProses.disabled = false;
    btnBatal.style.display = "block";
    idMataUang.disabled = false;
    idMataUang.focus();
    proses = 2;
}

function clickBatal() {
    btnIsi.disabled = false;
    btnKoreksi.disabled = false;
    btnHapus.disabled = false;
    btnProses.disabled = true;
    btnBatal.style.display = "none";
}

function clickHapus() {
    btnIsi.disabled = true
    btnKoreksi.disabled = true;
    btnHapus.disabled = true;
    btnProses.disabled = false;
    btnBatal.style.display = "block";
    proses = 3;
}

idMataUang.addEventListener("change", function () {
    if (this.selectedIndex !== 0) {
        this.classList.add("input-error");
        this.setCustomValidity("Tekan Enter!");
        this.reportValidity();
        // let text = idMataUang.options[idMataUang.selectedIndex].text.split("|");
        // idMataUang.value = text[0];
        // console.log(text);
    }
});

idMataUang.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        fetch("/detailmatauang/" + idMataUang.value)
            .then((response) => response.json())
            .then((options) => {
                console.log(options);
                namaMataUang.value = options[0].Nama_MataUang;
                symbol.value = options[0].Symbol;
            });
    }
    namaMataUang.focus();
});

btnProses.addEventListener ("click", function (event) {
    event.preventDefault();
    if (proses == 1) {
        // console.log("masuk isi");
        formkoreksi.submit();
    } else if (proses == 2) {
        //console.log("masuk korek");
        methodform.value="PUT";
        formkoreksi.action = "/MaintenanceMataUang/" + idMataUang.value;
        //formkoreksi.append(hiddenInput);
        formkoreksi.submit();
    } else if (proses == 3) {
        methodform.value="DELETE";
        formkoreksi.action = "/MaintenanceMataUang/" + idMataUang.value;
        formkoreksi.submit();

    }
});


