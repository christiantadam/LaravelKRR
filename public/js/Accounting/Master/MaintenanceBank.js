let idBank = document.getElementById("idBank");
let namaBankselect = document.getElementById("namaBankselect");
let jenisBankSelect = document.getElementById("jenisBankSelect");
let statusAktif = document.getElementById("statusAktif");
let kodePerkiraanSelect = document.getElementById("kodePerkiraanSelect");
let noRekening = document.getElementById("noRekening");
let saldoBank = document.getElementById("saldoBank");
let alamat = document.getElementById("alamat");
let kota = document.getElementById("kota");
let telp = document.getElementById("telp");
let person = document.getElementById("person");
let hp = document.getElementById("hp");
let isiNamaBank = document.getElementById("isiNamaBank");
let kodePerkiraan = document.getElementById("kodePerkiraan");
let ketKodePerkiraan = document.getElementById("ketKodePerkiraan");
let proses;
var hiddenInput;

let btnIsi = document.getElementById("btnIsi");
let btnKoreksi = document.getElementById("btnKoreksi");
let btnHapus = document.getElementById("btnHapus");
let btnProses = document.getElementById("btnProses");
let btnKeluar = document.getElementById("btnKeluar");
let btnBatal = document.getElementById("btnBatal");

let formkoreksi = document.getElementById("formkoreksi");
let methodform = document.getElementById("methodkoreksi");

btnIsi.addEventListener('click', function (event) {
    event.preventDefault();
})

btnBatal.addEventListener('click', function (event) {
    event.preventDefault();
    // clickBatal();
    idBank.value = "";
    jenisBankSelect.checked = false;
    namaBankselect.selectedIndex = 0;
    statusAktif.checked = false;
    kodePerkiraanSelect.value = "";
    noRekening.value = "";
    saldoBank.value = "";
    alamat.value = "";
    kota.value = "";
    telp.value = "";
    person.value = "";
    hp.value = "";
    isiNamaBank.value = "";
    ketKodePerkiraan.value = "";
    kodePerkiraan.value ="";
});

btnProses.addEventListener('click', function (event) {
    event.preventDefault();
})

btnKoreksi.addEventListener('click', function (event) {
    event.preventDefault();
});

btnHapus.addEventListener('click', function(event) {
    event.preventDefault();
})

function clickIsi() {
    idBank.disabled = false;
    namaBankselect.disabled = false;
    jenisBankSelect.disabled = false;
    statusAktif.disabled = false;
    ketKodePerkiraan.disabled = false;
    kodePerkiraanSelect.disabled = false;
    noRekening.disabled = false;
    saldoBank.disabled = false;
    alamat.disabled = false;
    kota.disabled = false;
    kota.disabled = false;
    telp.disabled = false;
    person.disabled = false;
    hp.disabled = false;


    namaBankselect.style.display = "none";
    isiNamaBank.style.display = "block";
    btnIsi.disabled = true;
    btnKoreksi.disabled = true;
    btnHapus.disabled = true;
    btnProses.disabled = false;
    //btnKeluar.style.display = "none";
    btnBatal.style.display = "block";
    proses = 1;
}

function clickBatal() {
    namaBankselect.style.display = "block";
    isiNamaBank.style.display = "none";
    btnIsi.disabled = false;
    btnKoreksi.disabled = false;
    btnHapus.disabled = false;
    btnProses.disabled = true;
    btnBatal.style.display = "none";

    idBank.disabled = true;
    namaBankselect.disabled = true;
    kodePerkiraanSelect.disabled = true;
    ketKodePerkiraan.disabled = true;
    noRekening.disabled = true;
    saldoBank.disabled = true;
    alamat.disabled = true;
    kota.disabled = true;
    telp.disabled = true;
    person.disabled = true;
    hp.disabled = true;
}

function clickKoreksi() {
    idBank.disabled = false;
    namaBankselect.disabled = false;
    jenisBankSelect.disabled = false;
    statusAktif.disabled = false;
    ketKodePerkiraan.disabled = false;
    kodePerkiraanSelect.disabled = false;
    noRekening.disabled = false;
    saldoBank.disabled = false;
    alamat.disabled = false;
    kota.disabled = false;
    kota.disabled = false;
    telp.disabled = false;
    person.disabled = false;
    hp.disabled = false;

    btnIsi.disabled = true
    btnKoreksi.disabled = true;
    btnHapus.disabled = true;
    btnProses.disabled = false;
    btnBatal.style.display = "block";
    proses = 2;
}

function clickHapus() {
    idBank.disabled = false;
    namaBankselect.disabled = false;
    jenisBankSelect.disabled = false;
    statusAktif.disabled = false;
    ketKodePerkiraan.disabled = false;
    kodePerkiraanSelect.disabled = false;
    noRekening.disabled = false;
    saldoBank.disabled = false;
    alamat.disabled = false;
    kota.disabled = false;
    kota.disabled = false;
    telp.disabled = false;
    person.disabled = false;
    hp.disabled = false;

    btnIsi.disabled = true
    btnKoreksi.disabled = true;
    btnHapus.disabled = true;
    btnProses.disabled = false;
    btnBatal.style.display = "block";
    proses = 3;
}

fetch("/getkodeperkiraan/")
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        kodePerkiraanSelect.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.innerText = "Kode Perkiraan";
        kodePerkiraanSelect.appendChild(defaultOption);

        options.forEach((entry) => {
            const option = document.createElement("option");
            option.value = entry.NoKodePerkiraan;
            option.innerText = entry.NoKodePerkiraan + "|" + entry.Keterangan;
            kodePerkiraanSelect.appendChild(option);
        });
});

kodePerkiraanSelect.addEventListener("change", function (event) {
    event.preventDefault();
    const selectedOption = kodePerkiraanSelect.options[kodePerkiraanSelect.selectedIndex];
    if (selectedOption) {
        const selectedValue = selectedOption.value; // Nilai dari opsi yang dipilih (format: "id | nama")
        const idkp = selectedValue.split(" | ")[0];
        ketKodePerkiraan.value = idkp;
    }
});

namaBankselect.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        fetch("/detailbank/" + namaBankselect.value)
            .then((response) => response.json())
            .then((options) => {
                hiddenInput = document.createElement("input");
                // Set the type attribute to "hidden"
                hiddenInput.setAttribute("type", "hidden");

                // Set other attributes if needed
                hiddenInput.setAttribute("name", "namaBankselect");
                hiddenInput.setAttribute("value", namaBankselect.options[namaBankselect.selectedIndex].text);
                //console.log(hiddenInput.value);

                idBank.value = namaBankselect.value;
                console.log(options);
                saldoBank.value = options[0].SaldoBank;
                noRekening.value = options[0].No_Rekening;
                alamat.value = options[0].Alamat;
                kota.value = options[0].Kota;
                person.value = options[0].Nama_Person;
                telp.value = options[0].No_Telp;
                hp.value = options[0].No_HP;
                ketKodePerkiraan.value = options[0].KodePerkiraan;

                const USERPENAGIH = options[0].KodePerkiraan;
                const options2 = kodePerkiraanSelect.options;
                for (let i = 0; i < options2.length; i++) {
                    if (options2[i].value === USERPENAGIH) {
                        // Setel select option jenisPembayaranSelect sesuai dengan opsi yang cocok
                        kodePerkiraanSelect.selectedIndex = i;
                        break;
                    }
                };

                var statusAktifCheckbox = document.getElementById("statusAktif");
                if (options[0].Aktif === "Y") {
                    statusAktifCheckbox.checked = true;
                } else {
                    statusAktifCheckbox.checked = false;
                }

                var jenisBankSelect = document.getElementsByName("jenisBankSelect");
                for (var i = 0; i < jenisBankSelect.length; i++) {
                    if (jenisBankSelect[i].value === options[0].Jenis_Bank) {
                        jenisBankSelect[i].checked = true;
                        break;
                    }
                }

                fetch("/detailkodeperkiraan/" + kodePerkiraanSelect.value)
                    .then((response) => response.json())
                    .then((kodePerkiraanOptions) => {
                        // Cari data yang sesuai dengan kodePerkiraanSelect.value
                        var selectedKodePerkiraan = kodePerkiraanOptions.find(option => option.NoKodePerkiraan === kodePerkiraanSelect.value);
                        if (selectedKodePerkiraan) {
                            ketKodePerkiraan.value = selectedKodePerkiraan.Keterangan;
                        } else {
                            // Jika tidak ada data yang sesuai, kosongkan nilai kodePerkiraan dan ketKodePerkiraan
                            ketKodePerkiraan.value = "";
                        }
                    });
            });
    }
});

btnProses.addEventListener ("click", function (event) {
    event.preventDefault();
    if (proses == 1) {
        // console.log("masuk isi");
        formkoreksi.submit();
    } else if (proses == 2) {
        //console.log("masuk korek");
        methodform.value="PUT";
        formkoreksi.action = "/MaintenanceBank/" + idBank.value;
        formkoreksi.append(hiddenInput);
        formkoreksi.submit();
    } else if (proses == 3) {
        methodform.value="DELETE";
        formkoreksi.action = "/MaintenanceBank/" + idBank.value;
        formkoreksi.submit();
    }
});

