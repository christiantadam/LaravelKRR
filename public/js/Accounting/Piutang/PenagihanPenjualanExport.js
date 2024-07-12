let tanggal = document.getElementById('tanggal');
let namaCustomerSelect = document.getElementById('namaCustomerSelect');
let noPenagihanSelect = document.getElementById('noPenagihanSelect');
let suratJalanSelect = document.getElementById('suratJalanSelect');
let mataUang = document.getElementById('mataUang');
let nilaiKurs = document.getElementById('nilaiKurs');
let dokumen = document.getElementById('dokumen');
let userPenagihSelect = document.getElementById('userPenagihSelect');
let tabelPenagihanPenjualanEx = document.getElementById('tabelPenagihanPenjualanEx');
let noPEB = document.getElementById('noPEB');
let tanggalPEB = document.getElementById('tanggalPEB');
let noBL = document.getElementById('noBL');
let tanggalBL = document.getElementById('tanggalBL');
let nilaiDitagihkan = document.getElementById('nilaiDitagihkan');
let terbilang = document.getElementById('terbilang');

let btnLihatItem = document.getElementById('btnLihatItem');
let btnHapusItem = document.getElementById('btnHapusItem');
let modalLihatItem = document.getElementById('modalLihatItem');

let idCustomer = document.getElementById('idCustomer');
let idJenisCustomer = document.getElementById('idJenisCustomer');

let btnIsi = document.getElementById('btnIsi');
let btnSimpan = document.getElementById('btnSimpan');
let btnKoreksi = document.getElementById('btnKoreksi');
let btnBatal = document.getElementById('btnBatal');

const tanggalPenagihan = new Date();
const formattedDate2 = tanggalPenagihan.toISOString().substring(0, 10);
tanggal.value = formattedDate2;

btnIsi.addEventListener('click', function(event) {
    event.preventDefault();

    btnIsi.style.display = "none";
    btnSimpan.style.display = "block";
    btnKoreksi.style.display = "none";
    btnBatal.style.display = "block";

    tanggal.removeAttribute("readonly");
    namaCustomerSelect.removeAttribute("readonly");
    suratJalanSelect.removeAttribute("readonly");
    // jenisCustomer.removeAttribute("readonly");
    // alamat.removeAttribute("readonly");
    // nomorSPSelect.removeAttribute("readonly");
    // nomorPO.removeAttribute("readonly");
    // mataUangSelect.removeAttribute("readonly");
    // nilaiKurs.removeAttribute("readonly");
    // syaratPembayaran.removeAttribute("readonly");
    // userPenagihSelect.removeAttribute("readonly");
    // dokumenSelect.removeAttribute("readonly");
    // jenisPajakSelect.removeAttribute("readonly");
    // Ppn.removeAttribute("readonly");

    namaCustomerSelect.focus();
});

fetch("/getCustomerEx/")
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        namaCustomerSelect.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.innerText = "Pilih Cust";
        namaCustomerSelect.appendChild(defaultOption);

        options.forEach((entry) => {
            const option = document.createElement("option");
            option.value = entry.Kode; // Gunakan entry.IdCust sebagai nilai opsi
            option.innerText = entry.Kode + "|" + entry.NamaCust; // Gunakan entry.IdCust dan entry.NamaCust untuk teks opsi
            namaCustomerSelect.appendChild(option);
        });
});

namaCustomerSelect.addEventListener("change", function (event) {
    event.preventDefault();
    const selectedOption = namaCustomerSelect.options[namaCustomerSelect.selectedIndex];
    if (selectedOption) {
        const selectedValue = selectedOption.textContent; // Atau selectedOption.innerText
        const bagiansatu = selectedValue.split(/[-|]/);
        const jenis = bagiansatu[0];
        const idcust = bagiansatu[1];
        namacust = bagiansatu[2];
        idCustomer.value = idcust;
        idJenisCustomer.value  = jenis;

        suratJalanSelect.focus();
    }

    fetch("/getSuratJalanEx/" + idCustomer.value)
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        suratJalanSelect.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.innerText = "Pilih Cust";
        suratJalanSelect.appendChild(defaultOption);

        options.forEach((entry) => {
            const option = document.createElement("option");
            option.value = entry.IDPengiriman; // Gunakan entry.IdCust sebagai nilai opsi
            option.innerText = entry.IDPengiriman + "|" + entry.Tanggal; // Gunakan entry.IdCust dan entry.NamaCust untuk teks opsi
            suratJalanSelect.appendChild(option);
        });

    })
});

btnLihatItem.addEventListener('click', function (event) {
    event.preventDefault();
    modalLihatItem = $("#modalLihatItem");
    modalLihatItem.modal('show');
});
