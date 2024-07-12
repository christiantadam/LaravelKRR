let tanggalInput = document.getElementById('tanggalInput');
let namaCustomerSelect = document.getElementById('namaCustomerSelect');

let noNotaKreditSelect = document.getElementById('noNotaKreditSelect');
let suratJalanSelect = document.getElementById('suratJalanSelect');
let namaBarang = document.getElementById('namaBarang');
let noPenagihan = document.getElementById('noPenagihan');
let mataUang = document.getElementById('mataUang');
let idMataUang = document.getElementById('idMataUang');
let nilaiKurs = document.getElementById('nilaiKurs');
let jumlahRetur = document.getElementById('jumlahRetur');
let satuan = document.getElementById('satuan');
let harga = document.getElementById('harga');
let total = document.getElementById('total');
let statusPelunasan = document.getElementById('statusPelunasan');
let discount = document.getElementById('discount');
let grandTotalRetur = document.getElementById('grandTotalRetur');
let terbilang = document.getElementById('terbilang');
let tabelNotaKreditRetur = $('#tabelNotaKreditRetur').DataTable();

//HIDDEN
let suratjalan = document.getElementById('suratjalan');
let idbarang = document.getElementById('idbarang');
let jenisPPN = document.getElementById('jenisPPN');
let statusPPN = document.getElementById('statusPPN');

let proses = 1;
let MIdRetur = document.getElementById('MIdRetur');

let btnSimpan = document.getElementById('btnSimpan');
let btnIsi = document.getElementById('btnIsi');
let btnBatal = document.getElementById('btnBatal');
let btnKoreksi = document.getElementById('btnKoreksi');
let btnTambahItem = document.getElementById('btnTambahItem');

const tanggal = new Date();
const formattedDate = tanggal.toISOString().substring(0, 10);
tanggalInput.value = formattedDate;

btnIsi.addEventListener('click', function(event) {
    event.preventDefault();

    btnIsi.style.display = "none";
    btnSimpan.style.display = "block";
    btnKoreksi.style.display = "none";
    btnBatal.style.display = "block";

    tanggalInput.removeAttribute("readonly");
    namaCustomerSelect.removeAttribute("readonly");
    noNotaKreditSelect.removeAttribute("readonly");
    suratJalanSelect.removeAttribute("readonly");
    namaBarang.removeAttribute("readonly");
    noPenagihan.removeAttribute("readonly");
    mataUang.removeAttribute("readonly");
    nilaiKurs.removeAttribute("readonly");
    jumlahRetur.removeAttribute("readonly");
    satuan.removeAttribute("readonly");
    harga.removeAttribute("readonly");
    total.removeAttribute("readonly");
    statusPelunasan.removeAttribute("readonly");
    discount.removeAttribute("readonly");
    grandTotalRetur.removeAttribute("readonly");
    terbilang.removeAttribute("readonly");

    namaCustomerSelect.focus();

    proses = 1;
});

fetch("/getCustNotaKredit/")
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
            option.value = entry.IDCust; // Gunakan entry.Id_Pelunasan sebagai nilai opsi
            option.innerText = entry.IDCust + "|" + entry.NamaCust; // Gunakan entry.IdCust dan entry.NamaCust untuk teks opsi
            namaCustomerSelect.appendChild(option);
        });

        namaCustomerSelect.addEventListener("change", function (event) {
            event.preventDefault();
            const selectedOption = namaCustomerSelect.options[namaCustomerSelect.selectedIndex];
            if (selectedOption) {
                const selectedValue = selectedOption.textContent; // Atau selectedOption.innerText
                const bagiansatu = selectedValue.split(/[-|]/);
                const jeniscust = bagiansatu[0];
                const idcust = bagiansatu[1];
                idCustomer.value = idcust;
                jenisCustomer.value  = jeniscust;
            }
            if (proses == 1) {
                suratJalanSelect.focus();
                fetch("/getListSJNotaKredit/" + idCustomer.value)
                .then((response) => response.json())
                .then((options) => {
                    console.log(options);
                    suratJalanSelect.innerHTML = "";

                    const defaultOption = document.createElement("option");
                    defaultOption.disabled = true;
                    defaultOption.selected = true;
                    defaultOption.innerText = "Pilih SJ";
                    suratJalanSelect.appendChild(defaultOption);

                    options.forEach((entry) => {
                        const option = document.createElement("option");
                        option.value = entry.IDPengiriman; // Gunakan entry.Id_Pelunasan sebagai nilai opsi
                        option.innerText = entry.IDPengiriman + "|" + entry.NamaBarang; // Gunakan entry.IdCust dan entry.NamaCust untuk teks opsi
                        suratJalanSelect.appendChild(option);
                    });

                });

                suratJalanSelect.addEventListener("change", function (event) {
                    event.preventDefault();
                    const selectedOption = suratJalanSelect.options[suratJalanSelect.selectedIndex];
                    if (selectedOption) {
                        const selectedValue = selectedOption.textContent; // Atau selectedOption.innerText
                        const bagiansatu = selectedValue.split("|");
                        const idpengiriman = bagiansatu[0];
                        const namabarang = bagiansatu[1];

                        idbarang.value = namabarang.slice(-20);
                        suratjalan.value = idpengiriman.slice(-10);
                        namaBarang.value = namabarang.substring(0, namabarang.length - 22);

                        MIdRetur.value = idpengiriman.substring(0, idpengiriman.length - 11).trim();
                        console.log(MIdRetur.value);
                    }

                    if (suratJalanSelect.selectedIndex != 0) {
                        Lihat_Penagihan();
                    }
                });
            } else {
                noNotaKreditSelect.focus();
            }
        });
});

function Lihat_Penagihan() {
    fetch("/getLihat_PenagihanNotaKredit/" + idCustomer.value + "/" + MIdRetur.value)
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        // console.log("masuk");

        harga.value = options[0].HargaSatuan;
        mataUang.value = options[0].MataUang;
        if (mataUang.value.toUpperCase() == "RUPIAH") {
            idMataUang.value = 1;
        } else if (mataUang.value.toUpperCase() == "US DOLLAR") {
            idMataUang.value == 2;
        } else if (mataUang.value.toUpperCase() == "YEN") {
            idMataUang.value == 3;
        }
        nilaiKurs.value = options[0].NilaiKurs;
        noPenagihan.value = options[0].IdPenagihan;
        jenisPPN.value = options[0].Jns_PPN;
        satuan.value = options[0].SatuanJual;
        statusPPN.value = options[0].Status_PPN;
        discount.value = options[0].Discount;
        statusPelunasan.value = options[0].Lunas;
        if (options[0].Lunas == 'Y') {
            statusPelunasan.value = "Lunas";
        } else {
            statusPelunasan.value = "Belum";
            alert("Harap Dibuatkan BKK");
        };

        if (options[0].SatuanJual == options[0].SatuanPrimer) {
            total.value = (options[0].QtyPrimer * options[0].HargaSatuan) - (options[0].QtyPrimer * options[0].HargaSatuan * options[0].Discount);
            jumlahRetur.value = options[0].QtyPrimer;
        } else if (options[0].SatuanJual == options[0].SatuanSekunder) {
            total.value = (options[0].QtySekunder * options[0].HargaSatuan) - (options[0].QtySekunder * options[0].HargaSatuan * options[0].Discount);
            jumlahRetur.value = options[0].QtySekunder;
        } else if (options[0].SatuanJual == options[0].SatuanTritier) {
            total.value = (options[0].QtyTritier * options[0].HargaSatuan) - (options[0].QtyTritier * options[0].HargaSatuan * options[0].Discount);
            jumlahRetur.value = options[0].QtyTritier;
        } else {
            total.value == (options[0].QTyKonversi * options[0].HargaSatuan) - (options[0].QTyKonversi * options[0].HargaSatuan * options[0].Discount);
            jumlahRetur.value = options[0].QTyKonversi;
        }

        btnTambahItem.focus();
    });
};

btnTambahItem.addEventListener('click', function(event) {
    event.preventDefault();
})


