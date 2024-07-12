let tanggalInput = document.getElementById('tanggalInput');
let namaCustomerSelect = document.getElementById('namaCustomerSelect');
let noNotaKreditSelect = document.getElementById('noNotaKreditSelect');
let noPenagihanSelect = document.getElementById('noPenagihanSelect');
let mataUang = document.getElementById('mataUang');
let statusPelunasan = document.getElementById('statusPelunasan');
let tabelKelebihanBayar;
let grandTotal = document.getElementById('grandTotal');
let terbilang = document.getElementById('terbilang');

let btnIsi = document.getElementById('btnIsi');
let btnKoreksi = document.getElementById('btnKoreksi');
let btnHapus = document.getElementById('btnHapus');
let btnSimpan = document.getElementById('btnSimpan');
let btnBatal = document.getElementById('btnBatal');
let btnKeluar = document.getElementById('btnKeluar');

let proses;

//HIDDEN
let idCustomer = document.getElementById('idCustomer');

const tgl = new Date();
const formattedDate = tgl.toISOString().substring(0, 10);
tanggalInput.value = formattedDate;

btnIsi.addEventListener('click', function(event) {
    event.preventDefault();

    btnHapus.disabled = true;
    btnKeluar.disabled = true;
    btnSimpan.style.display = "block";
    btnIsi.style.display = "none";
    btnKoreksi.style.display = "none";
    btnBatal.style.display = "block";
    namaCustomerSelect.focus();
    proses = 1;

    fetch("/getCustKelebihanBayar/")
    .then((response) => response.json())
    .then((options) => {
        console.log(options);

        namaCustomerSelect.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.innerText = "Pilih Customer";
        namaCustomerSelect.appendChild(defaultOption);

        options.forEach((entry) => {
            const option = document.createElement("option");
            option.value = entry.IdCust;
            option.innerText = entry.IdCust + "|" + entry.NamaCust;
            namaCustomerSelect.appendChild(option);
        });
    });

    namaCustomerSelect.addEventListener("change", function (event) {
        event.preventDefault();
        const selectedOption = namaCustomerSelect.options[namaCustomerSelect.selectedIndex];
        if (selectedOption) {
            const selectedValue = selectedOption.textContent; // Atau selectedOption.innerText
            const bagiansatu = selectedValue.split(/[-|]/);
            const idcust = bagiansatu[0];
            const jnscust = bagiansatu[1];
            namacust = bagiansatu[2];
            idCustomer.value = idcust;
            jenisCustomer.value = jnscust;
        }
    });
});

btnKoreksi.addEventListener('click', function (event) {
    event.preventDefault();
    btnHapus.disabled = true;
    btnKeluar.disabled = true;
    btnSimpan.style.display = "block";
    btnIsi.style.display = "none";
    btnKoreksi.style.display = "none";
    btnBatal.style.display = "block";
});

fetch("/getListNotaKreditKelebihanBayar/" + idCustomer.value)
.then((response) => response.json())
.then((options) => {
    console.log(options);
});

