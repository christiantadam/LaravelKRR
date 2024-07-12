let tanggal = document.getElementById('tanggal');
let namaCustomerSelect = document.getElementById('namaCustomerSelect');
let noPenagihanSelect = document.getElementById('noPenagihanSelect');
let idCustomer = document.getElementById('idCustomer');
let idJenisCustomer = document.getElementById('idJenisCustomer');
let alamat = document.getElementById('alamat');
let jenisCustomer = document.getElementById('jenisCustomer');
let nomorSPSelect = document.getElementById('nomorSPSelect');
let noSP = document.getElementById('noSP');
let namaMataUang = document.getElementById('namaMataUang');
let idMataUang = document.getElementById('idMataUang');
let nomorPO  = document.getElementById('nomorPO');
let syaratPembayaran = document.getElementById('syaratPembayaran');
let nilaiKurs = document.getElementById('nilaiKurs');
let userPenagihSelect = document.getElementById('userPenagihSelect');
let idUserPenagih = document.getElementById('idUserPenagih');
let jenisPajakSelect = document.getElementById('jenisPajakSelect');
let idJenisPajak = document.getElementById('idJenisPajak');
let dokumenSelect = document.getElementById('dokumenSelect');
let idJenisDokumen = document.getElementById('idJenisDokumen');
let penagihanPajak = document.getElementById('penagihanPajak');
let IdPenagihan = document.getElementById('IdPenagihan');
let noPenagihanUMSelect = document.getElementById('noPenagihanUMSelect');

let uangMasuk = document.getElementById('uangMasuk');
let nilaiSblmPPN = document.getElementById('nilaiSblmPPN');
let Ppn = document.getElementById('Ppn');
let nilaiPpn = document.getElementById('nilaiPpn');
let total = document.getElementById('total');
let terbilang = document.getElementById('terbilang');

let btnIsi = document.getElementById('btnIsi');
let btnSimpan = document.getElementById('btnSimpan');
let btnKoreksi = document.getElementById('btnKoreksi');
let btnBatal = document.getElementById('btnBatal');
let btnHapus = document.getElementById('btnHapus');
let formkoreksi = document.getElementById('formkoreksi');
let methodkoreksi = document.getElementById('methodkoreksi');

let namacust;
let id_Penagihan = document.getElementById('id_Penagihan');
let proses;

const tanggalPenagihan = new Date();
const formattedDate2 = tanggalPenagihan.toISOString().substring(0, 10);
tanggal.value = formattedDate2;

const tanggalInput = new Date();
const formattedDate = tanggalInput.toISOString().substring(0, 10);
penagihanPajak.value = formattedDate;

btnIsi.addEventListener("click", function (event) {
    event.preventDefault();
    btnIsi.style.display = "none";
    btnSimpan.style.display = "block";
    btnKoreksi.style.display = "none";
    btnBatal.style.display = "block";

    tanggal.removeAttribute("readonly");
    namaCustomerSelect.removeAttribute("readonly");
    idCustomer.removeAttribute("readonly");
    jenisCustomer.removeAttribute("readonly");
    alamat.removeAttribute("readonly");
    nomorSPSelect.removeAttribute("readonly");
    nomorPO.removeAttribute("readonly");
    namaMataUang.removeAttribute("readonly");
    idMataUang.removeAttribute("readonly");
    nilaiKurs.removeAttribute("readonly");
    syaratPembayaran.removeAttribute("readonly");
    penagihanPajak.removeAttribute("readonly");
    userPenagihSelect.removeAttribute("readonly");
    jenisPajakSelect.removeAttribute("readonly");
    Ppn.removeAttribute("readonly");
    dokumenSelect.removeAttribute("readonly");

    uangMasuk.removeAttribute("readonly");
    total.removeAttribute("readonly");
    // nilaiSblmPPN.removeAttribute("readonly");
    // nilaiPpn.removeAttribute("readonly");
    // terbilang.removeAttribute("readonly");

    proses = 1;
});

btnSimpan.addEventListener('click', function(event) {
    event.preventDefault();
    if (proses == 1) {
        formkoreksi.submit();
    } else if (proses == 2) {
        methodkoreksi.value = "PUT";
        formkoreksi.action = "/FakturUangMuka/" + id_Penagihan.value;
        formkoreksi.submit();
    }
    // else if (proses == 3) {
    //     methodform.value="DELETE";
    //     formkoreksi.action = "/FakturUangMuka/" + id_Penagihan.value;
    //     formkoreksi.submit();
    // }
})

btnKoreksi.addEventListener("click", function (event) {
    event.preventDefault();
    btnIsi.style.display = "none";
    btnSimpan.style.display = "block";
    btnKoreksi.style.display = "none";
    btnBatal.style.display = "block";

    tanggal.removeAttribute("readonly");
    namaCustomerSelect.removeAttribute("readonly");
    noPenagihanSelect.removeAttribute("readonly");
    idCustomer.removeAttribute("readonly");
    jenisCustomer.removeAttribute("readonly");
    alamat.removeAttribute("readonly");
    nomorSPSelect.removeAttribute("readonly");
    nomorPO.removeAttribute("readonly");
    namaMataUang.removeAttribute("readonly");
    idMataUang.removeAttribute("readonly");
    nilaiKurs.removeAttribute("readonly");
    syaratPembayaran.removeAttribute("readonly");
    penagihanPajak.removeAttribute("readonly");
    userPenagihSelect.removeAttribute("readonly");
    jenisPajakSelect.removeAttribute("readonly");
    Ppn.removeAttribute("readonly");
    dokumenSelect.removeAttribute("readonly");

    uangMasuk.removeAttribute("readonly");
    total.removeAttribute("readonly");
    // nilaiSblmPPN.removeAttribute("readonly");
    // nilaiPpn.removeAttribute("readonly");
    // terbilang.removeAttribute("readonly");

    proses = 2;

    namaCustomerSelect.focus();
});

btnBatal.addEventListener('click', function(event) {
    tanggal.value = "";
    namaCustomerSelect.selectedIndex = 0;
    idCustomer.value = "";
    jenisCustomer.value = "";
    noPenagihanSelect.selectedIndex = 0;
    jenisCustomer.value = "";
    alamat.value = "";
    nomorSPSelect.selectedIndex = 0;
    nomorPO.value = "";
    noSP.value = "";
    namaMataUang.value = "";
    idMataUang.value = "";
    nilaiKurs.value = "";
    penagihanPajak.value = "";
    userPenagihSelect.selectedIndex = 0;
    idUserPenagih.value = "";
    jenisPajakSelect.selectedIndex = 0;
    idJenisPajak.value = "";
    Ppn.value = "";
    dokumenSelect.selectedIndex = 0;
    idJenisDokumen.value = "";

    uangMasuk.value = "";
    total.value = "";
    nilaiSblmPPN.value = "";
    nilaiPpn.value = "";
    terbilang.value = "";
})

btnHapus.addEventListener("click", function(event) {
    event.preventDefault();
    alert('Penagihan Tidak Boleh Dihapus. Jika Ada Salah Pengisian Mohon Dikoreksi');
    //proses = 3;
})

fetch("/detailcustomer/")
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
            option.value = entry.IdCust; // Gunakan entry.IdCust sebagai nilai opsi
            option.innerText = entry.IdCust + "|" + entry.NamaCust; // Gunakan entry.IdCust dan entry.NamaCust untuk teks opsi
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

        noPenagihanSelect.focus();
    }

    fetch("/getNoPenagihan/" + idCustomer.value)
    .then((response) => response.json())
    .then((options) => {
        console.log(options);

        noPenagihanSelect.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.innerText = "Pilih No Penagihan";
        noPenagihanSelect.appendChild(defaultOption);

        options.forEach((entry) => {
            const option = document.createElement("option");
            option.value = entry.IdCust; // Gunakan entry.IdCust sebagai nilai opsi
            option.innerText = entry.Id_Penagihan + "|" + entry.Tgl_Penagihan; // Gunakan entry.IdCust dan entry.NamaCust untuk teks opsi
            noPenagihanSelect.appendChild(option);
        });
    });
    noPenagihanSelect.addEventListener("change", function (event) {
        event.preventDefault();
        const selectedOption = noPenagihanSelect.options[noPenagihanSelect.selectedIndex];
        if (selectedOption) {
            const selectedValue = selectedOption.textContent; // Atau selectedOption.innerText
            const bagiansatu = selectedValue.split(/[-|]/);
            const jenis = bagiansatu[0];
            IdPenagihan.value = jenis;

            id_Penagihan.value = IdPenagihan.value.replace(/\//g, '.');
            console.log(id_Penagihan);

            fetch("/DataPenagihanF/" + id_Penagihan.value)
            .then((response) => response.json())
            .then((options) => {
                console.log(options);
                namaMataUang.value = options[0].Nama_MataUang;
                idMataUang.value = options[0].Id_MataUang;
                // tanggal.value = options[0].Tgl_Penagihan;
                // penagihanPajak.value = options[0].TglFakturPajak;
                noSP.value = options[0].NoSP;
                nomorPO.value = options[0].PO;
                Ppn.value = options[0].PersenPPN;
                if (options[0].Jns_PPN == 3 || options[0].Jns_PPN == 4) {
                    if (Ppn.value == 1) {
                        nilaiSblmPPN.value = options[0].Nilai_Penagihan / 1.11;
                    } else {
                        nilaiSblmPPN.value = options[0].Nilai_Penagihan / 1.1;
                    }
                    nilaiPpn.value = nilaiSblmPPN.value - options[0].Nilai_blm_Pajak;
                }

                total.value = options[0].Nilai_Penagihan;
                terbilang.value = options[0].Terbilang;
                nilaiKurs.value = options[0].NilaiKurs;
                idJenisDokumen.value = options[0].Id_Jenis_Dokumen;
                idUserPenagih.value = options[0].IdPenagih;
                idJenisPajak.value = options[0].Jns_PPN;

                const NOSP = options[0].NoSP;
                const opt = nomorSPSelect.options;
                for (let i = 0; i < options.length; i++) {
                    if (opt[i].value == NOSP) {
                        // Setel select option jenisPembayaranSelect sesuai dengan opsi yang cocok
                        nomorSPSelect.selectedIndex = i;
                        break;
                    }
                };

                // const USERPENAGIH = selectedRows[0].IdPenagih;
                // const options2 = userPenagihSelect.options;
                // for (let i = 0; i < options2.length; i++) {
                //     if (options2[i].value === USERPENAGIH) {
                //         // Setel select option jenisPembayaranSelect sesuai dengan opsi yang cocok
                //         userPenagihSelect.selectedIndex = i;
                //         break;
                //     }
                // };

                // const JNSPAJAK = selectedRows[0].Jns_PPN;
                // const options3 = userPenagihSelect.options;
                // for (let i = 0; i < options3.length; i++) {
                //     if (options3[i].value === JNSPAJAK) {
                //         // Setel select option jenisPembayaranSelect sesuai dengan opsi yang cocok
                //         userPenagihSelect.selectedIndex = i;
                //         break;
                //     }
                // };

                // const JNSDOK = selectedRows[0].Id_Jenis_Dokumen;
                // const options4 = dokumenSelect.options;
                // for (let i = 0; i < options4.length; i++) {
                //     if (options4[i].value === JNSDOK) {
                //         // Setel select option jenisPembayaranSelect sesuai dengan opsi yang cocok
                //         dokumenSelect.selectedIndex = i;
                //         break;
                //     }
                // }
            })
        }
    });


    fetch("/getJenisCustomer/" + idJenisCustomer.value)
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        jenisCustomer.value = options[0].NamaJnsCust;
    });

    if (jenisCustomer.value == "PNX") {
        fetch("/getAlamatCust/" + idCustomer.value)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);
            alamat.value = options[0].Alamat + " " + options[0].Kota;

        });
    } else {
        fetch("/getAlamatCust/" + idCustomer.value)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);
            alamat.value = options[0].AlamatNPWP;

        });
    }

    fetch("/getNoSP/" + idCustomer.value)
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        nomorSPSelect.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.innerText = "Pilih No. SP";
        nomorSPSelect.appendChild(defaultOption);

        options.forEach((entry) => {
            const option = document.createElement("option");
            option.value = entry.IDSuratPesanan; // Gunakan entry.IdCust sebagai nilai opsi
            option.innerText = entry.IDSuratPesanan; // Gunakan entry.IdCust dan entry.NamaCust untuk teks opsi
            nomorSPSelect.appendChild(option);
        });
    });

    nomorSPSelect.addEventListener("change", function (event) {
    event.preventDefault();
    const selectedOption = nomorSPSelect.options[nomorSPSelect.selectedIndex];
    if (selectedOption) {
        const selectedValue = selectedOption.textContent; // Atau selectedOption.innerText
        noSP.value  = selectedValue.toString();

        fetch("/getNomorPO/" + noSP.value)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);

            if (options[0].IDMataUang == "IDR") {
                idMataUang.value = 1;
            } else if (options[0].IDMataUang == "USD") {
                idMataUang.value = 2;
            }
            nomorPO.value = options[0].NO_PO;
            syaratPembayaran.value = options[0].SyaratBayar;
            namaMataUang.value = options[0].MataUang;

            if (idMataUang.value == 1) {
                nilaiKurs.setAttribute("readonly", true);
            } else {
                nilaiKurs.focus();
                nilaiKurs.removeAttribute("readonly");
            }
        });

        }
    });

    let kode;
    if (idJenisCustomer.value === 'NPX') {
        kode = 3;
    } else {
        kode = 2;
    }
    // console.log(idJenisCustomer.value);
    fetch("/getDokumen/" + kode)
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        dokumenSelect.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.innerText = "Pilih Dokumen";
        dokumenSelect.appendChild(defaultOption);

        options.forEach((entry) => {
            const option = document.createElement("option");
            option.value = entry.Id_Jenis_Dokumen; // Gunakan entry.IdCust sebagai nilai opsi
            option.innerText = entry.Id_Jenis_Dokumen + "|" + entry.Nama_Dokumen; // Gunakan entry.IdCust dan entry.NamaCust untuk teks opsi
            dokumenSelect.appendChild(option);
    });

    dokumenSelect.addEventListener("change", function (event) {
        event.preventDefault();
        const selectedOption = dokumenSelect.options[dokumenSelect.selectedIndex];
        if (selectedOption) {
            const selectedValue = selectedOption.textContent; // Atau selectedOption.innerText
            const bagiansatu = selectedValue.split(/[-|]/);
            const jenis = bagiansatu[0];
            idJenisDokumen.value  = jenis;
        }
        uangMasuk.focus();
    });
});
});

fetch("/getUserPenagih/")
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        userPenagihSelect.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.innerText = "Pilih Cust";
        userPenagihSelect.appendChild(defaultOption);

        options.forEach((entry) => {
            const option = document.createElement("option");
            option.value = entry.IdCust; // Gunakan entry.IdCust sebagai nilai opsi
            option.innerText = entry.IdUser + "|" + entry.Nama; // Gunakan entry.IdCust dan entry.NamaCust untuk teks opsi
            userPenagihSelect.appendChild(option);
        });
});
userPenagihSelect.addEventListener("change", function (event) {
    event.preventDefault();
    const selectedOption = userPenagihSelect.options[userPenagihSelect.selectedIndex];
    if (selectedOption) {
        const selectedValue = selectedOption.textContent; // Atau selectedOption.innerText
        const bagiansatu = selectedValue.split(/[-|]/);
        const jenis = bagiansatu[0];
        idUserPenagih.value  = jenis;
    }
    jenisPajakSelect.focus();
});

fetch("/getJenisPajak/")
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        jenisPajakSelect.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.innerText = "Pilih Jns Pajak";
        jenisPajakSelect.appendChild(defaultOption);

        options.forEach((entry) => {
            const option = document.createElement("option");
            option.value = entry.Jns_PPN; // Gunakan entry.IdCust sebagai nilai opsi
            option.innerText = entry.Nama_Jns_PPN + "|" + entry.Jns_PPN; // Gunakan entry.IdCust dan entry.NamaCust untuk teks opsi
            jenisPajakSelect.appendChild(option);

            // dokumenSelect.focus();
        });
});
jenisPajakSelect.addEventListener("change", function (event) {
    event.preventDefault();
    const selectedOption = jenisPajakSelect.options[jenisPajakSelect.selectedIndex];
    if (selectedOption) {
        const selectedValue = selectedOption.textContent; // Atau selectedOption.innerText
        const bagiansatu = selectedValue.split(/[-|]/);
        const jenis = bagiansatu[1];
        idJenisPajak.value  = jenis;
    }
});

uangMasuk.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();

        if (idJenisCustomer.value == "PNX") {
            nilaiSblmPPN.value = uangMasuk.value;
            if (Ppn.value == 11) {
                nilaiPpn.value = uangMasuk.value * 0.11;
            } else {
                nilaiPpn.value = uangMasuk.value * 0.1;
            }
            total.value = uangMasuk.value;
        }
    } else {
        if(Ppn.value == 11) {
            nilaiSblmPPN.value = Math.round(uangMasuk.value / 1.11 * 100) / 100;
            nilaiPpn.value =    nilaiSblmPPN.value * 0.11;
        } else {
            nilaiSblmPPN.value = Math.round(uangMasuk.value / 1.11 * 100) / 100;
            nilaiPpn.value =    nilaiSblmPPN.value * 0.1;
        }
        console.log(nilaiSblmPPN.value);
        console.log(nilaiPpn.value);
        total.value = parseFloat(nilaiSblmPPN.value + nilaiPpn.value);
    }

    if (idMataUang.value == 1) {
        terbilang.value = F_Rupiah(total.value);
    } else {
        if (nilaiKurs.value <= 0) {
            alert("ISI DULU NILAI KURSNYA");
            nilaiKurs.focus();
        }
        terbilang.value = F_Dollar(total.value);
    }
});

function F_Rupiah() {
    var formatted = parseFloat(total.value).toFixed(0).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    return formatted;
}
function F_Dollar() {
    var formatted = parseFloat(total.value).toFixed(0);
    return formatted;
}
