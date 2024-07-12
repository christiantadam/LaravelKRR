let checkbox = document.getElementById("potongUM");
let penagihanPajak = document.getElementById('penagihanPajak');
let tanggalInput = document.getElementById('tanggalInput');
let namaCustomerSelect = document.getElementById('namaCustomerSelect');
let idCustomer = document.getElementById('idCustomer');
let idJenisCustomer = document.getElementById('idJenisCustomer');
let noPenagihanSelect = document.getElementById('noPenagihanSelect');
let jenisCustomer = document.getElementById('jenisCustomer');
let alamat = document.getElementById('alamat');
let nomorSPSelect = document.getElementById('nomorSPSelect');
let noSP = document.getElementById('noSP');
let nomorPO = document.getElementById('nomorPO');
let mataUangSelect = document.getElementById('mataUangSelect');
let nilaiKurs = document.getElementById('nilaiKurs');
let syaratPembayaran = document.getElementById('syaratPembayaran');
let userPenagihSelect = document.getElementById('userPenagihSelect');
let dokumenSelect = document.getElementById('dokumenSelect');
let jenisPajakSelect = document.getElementById('jenisPajakSelect');
let Ppn = document.getElementById('Ppn');
let noPenagihanUM = document.getElementById('noPenagihanUM');

// let tabelSuratPesanan = document.getElementById('tabelSuratPesanan');
let tabelSuratPesanan = $('#tabelSuratPesanan').DataTable();
//BAWAH TABEL
let nilaiSP = document.getElementById('nilaiSP');
let nilaiUM = document.getElementById('nilaiUM');
let discount = document.getElementById('discount');
let nilaiSdhBayar = document.getElementById('nilaiSdhBayar');
let totalPenagihan = document.getElementById('totalPenagihan');
let terbilang = document.getElementById('terbilang');

//HIDDEN:
let idMataUang = document.getElementById('idMataUang');
let idUserPenagih = document.getElementById('idUserPenagih');
let idJenisDokumen = document.getElementById('idJenisDokumen');
let jenisdok = document.getElementById('jenisdok');
let idJenisPajak = document.getElementById('idJenisPajak');
let idPenagihanUM = document.getElementById('idPenagihanUM');
let id_PenagihanUM = document.getElementById('id_PenagihanUM');
let idNoPenagihan = document.getElementById('idNoPenagihan');
let id_Penagihan = document.getElementById('id_Penagihan');
let proses;
let hapusitem;

let btnIsi = document.getElementById('btnIsi');
let btnKoreksi = document.getElementById('btnKoreksi');
let btnHapus = document.getElementById('btnHapus');
let btnHapusItem = document.getElementById('btnHapusItem');

let formkoreksi = document.getElementById('formkoreksi');
let methodkoreksi = document.getElementById('methodkoreksi');

const tanggalPenagihan = new Date();
const formattedDate2 = tanggalPenagihan.toISOString().substring(0, 10);
tanggalInput.value = formattedDate2;

const PJ = new Date();
const formattedDate = PJ.toISOString().substring(0, 10);
penagihanPajak.value = formattedDate;


checkbox.addEventListener("change", function(event) {
    event.preventDefault();
    // Jika checkbox dicentang, atur nilai value menjadi 1
    if (this.checked) {
      this.value = "1";
      noPenagihanUM.removeAttribute("readonly");
      console.log(noSP.value);
    } else {
      // Jika checkbox tidak dicentang, atur nilai value menjadi 0
      this.value = "0";
      noPenagihanUM.setAttribute("readonly", true)
    }
  });

btnIsi.addEventListener('click', function(event) {
    event.preventDefault();

    btnIsi.style.display = "none";
    btnSimpan.style.display = "block";
    btnKoreksi.style.display = "none";
    btnBatal.style.display = "block";

    tanggalInput.removeAttribute("readonly");
    penagihanPajak.removeAttribute("readonly");
    namaCustomerSelect.removeAttribute("readonly");
    jenisCustomer.removeAttribute("readonly");
    alamat.removeAttribute("readonly");
    nomorSPSelect.removeAttribute("readonly");
    nomorPO.removeAttribute("readonly");
    mataUangSelect.removeAttribute("readonly");
    nilaiKurs.removeAttribute("readonly");
    syaratPembayaran.removeAttribute("readonly");
    userPenagihSelect.removeAttribute("readonly");
    dokumenSelect.removeAttribute("readonly");
    jenisPajakSelect.removeAttribute("readonly");
    Ppn.removeAttribute("readonly");

    nilaiSP.removeAttribute("readonly");
    nilaiUM.removeAttribute("readonly");
    discount.removeAttribute("readonly");
    nilaiSdhBayar.removeAttribute("readonly");
    totalPenagihan.removeAttribute("readonly");
    //terbilang.removeAttribute("readonly");

    proses = 1;
    hapusitem = 1;
});

btnKoreksi.addEventListener('click', function(event) {
    event.preventDefault();

    btnIsi.style.display = "none";
    btnSimpan.style.display = "block";
    btnKoreksi.style.display = "none";
    btnBatal.style.display = "block";

    tanggalInput.removeAttribute("readonly");
    noPenagihanSelect.disabled = false;
    penagihanPajak.removeAttribute("readonly");
    jenisCustomer.removeAttribute("readonly");
    alamat.removeAttribute("readonly");
    nomorSPSelect.removeAttribute("readonly");
    nomorPO.removeAttribute("readonly");
    mataUangSelect.removeAttribute("readonly");
    nilaiKurs.removeAttribute("readonly");
    syaratPembayaran.removeAttribute("readonly");
    userPenagihSelect.removeAttribute("readonly");
    dokumenSelect.removeAttribute("readonly");
    jenisPajakSelect.removeAttribute("readonly");
    Ppn.removeAttribute("readonly");
    noPenagihanUM.removeAttribute("readonly");

    nilaiSP.removeAttribute("readonly");
    nilaiUM.removeAttribute("readonly");
    discount.removeAttribute("readonly");
    nilaiSdhBayar.removeAttribute("readonly");
    totalPenagihan.removeAttribute("readonly");
    //terbilang.removeAttribute("readonly");

    noPenagihanSelect.focus();

    proses = 2;
    hapusitem = 2;
});

btnBatal.addEventListener('click', function (event) {
    event.preventDefault();
    namaCustomerSelect.selectedIndex = 0;
    tanggalInput.value = "";
    idCustomer.value = "";
    idJenisCustomer.value = "";
    noPenagihanSelect.selected = 0;
    idNoPenagihan.value = "";
    id_Penagihan.value = "";
    jenisCustomer.value = "";
    alamat.value = "";
    noSP.value = "";
    nomorSPSelect.selectedIndex = 0;
    nomorPO.value = "";
    mataUangSelect.value = "";
    idMataUang.value = "";
    nilaiKurs.value = "";
    penagihanPajak.value = "";
    syaratPembayaran.value = "";
    userPenagihSelect.selectedIndex = 0;
    idUserPenagih.value = "";
    dokumenSelect.selectedIndex = 0;
    idJenisDokumen.value = "";
    jenisPajakSelect.selectedIndex = 0;
    Ppn.value = "";
    noPenagihanUM.selectedIndex = 0;
    idPenagihanUM.value = "";
    id_PenagihanUM.value = "";
    idJenisPajak.value = "";
    nilaiSP.value = "";
    nilaiUM.value = "";
    discount.value = "";
    nilaiSdhBayar.value = "";
    totalPenagihan.value = "";
    terbilang.value = "";
    tabelSuratPesanan.clear().draw();
});

btnHapus.addEventListener("click", function(event) {
    event.preventDefault();
    alert('Penagihan Tidak Boleh Dihapus. Jika Ada Salah Pengisian Mohon Dikoreksi');
    //proses = 3;
});

fetch("/getmatauang/")
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        mataUangSelect.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.innerText = "Mata Uang";
        mataUangSelect.appendChild(defaultOption);

        options.forEach((entry) => {
            const option = document.createElement("option");
            option.value = entry.Id_MataUang;
            option.innerText = entry.Id_MataUang + "|" + entry.Nama_MataUang;
            mataUangSelect.appendChild(option);
        });
    });

mataUangSelect.addEventListener("change", function (event) {
    event.preventDefault();
    const selectedOption = mataUangSelect.options[mataUangSelect.selectedIndex];
    if (selectedOption) {
        const idKodeInput = idMataUang;
        const selectedValue = selectedOption.textContent;
        const idMU = selectedValue.split("|")[0];
        idKodeInput.value = idMU;
    }
});

fetch("/getCustomerr/")
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
            option.value = entry.IDCust; // Gunakan entry.IdCust sebagai nilai opsi
            option.innerText = entry.IDCust + "|" + entry.NAMACUST; // Gunakan entry.IdCust dan entry.NamaCust untuk teks opsi
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

        lihatCustomer();
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

        }

        fetch("/getLihatPesanan/" + noSP.value)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);

            if (options[0].IDMataUang == "IDR") {
                idMataUang.value = 1;
            } else if (options[0].IDMataUang == "USD") {
                idMataUang.value = 2;
            };

            syaratPembayaran.value = options[0].SyaratBayar;
            nomorPO.value = options[0].NO_PO;

            if (idMataUang.value == 1) {
                nilaiKurs.setAttribute("readonly", true);
            } else {
                nilaiKurs.focus();
                nilaiKurs.removeAttribute("readonly");
            };
        });
        HitungPesanan();

        console.log(noSP.value);
        fetch("/getNoPenagihanUMNota/" + noSP.value)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);
            noPenagihanUM.innerHTML = "";

            const defaultOption = document.createElement("option");
            defaultOption.disabled = true;
            defaultOption.selected = true;
            defaultOption.innerText = "Pilih No Penagihan UM";
            noPenagihanUM.appendChild(defaultOption);

            options.forEach((entry) => {
                const option = document.createElement("option");
                option.value = entry.Id_Penagihan; // Gunakan entry.IdCust sebagai nilai opsi
                option.innerText = entry.Id_Penagihan + "|" + entry.nilai_BLM_PAJAK; // Gunakan entry.IdCust dan entry.NamaCust untuk teks opsi
                noPenagihanUM.appendChild(option);
            });
        });

        noPenagihanUM.addEventListener("change", function (event) {
            event.preventDefault();
            const selectedOption = noPenagihanUM.options[noPenagihanUM.selectedIndex];
            if (selectedOption) {
                const selectedValue = selectedOption.textContent; // Atau selectedOption.innerText
                const bagiansatu = selectedValue.split(/[-|]/);
                const jenis = bagiansatu[0];
                idPenagihanUM.value  = jenis;

                id_PenagihanUM.value = idPenagihanUM.value.replace(/\//g, '.');
            }
        });
    })
});

function lihatCustomer() {
    fetch("/getJenisCustomer/" + idJenisCustomer.value)
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        jenisCustomer.value = options[0].IDJnsCust;

        if (jenisCustomer.value === "NPX") {
            fetch("/getAlamatCust/" + idCustomer.value)
            .then((response) => response.json())
            .then((options) => {
                console.log(options);
                alamat.value = options[0].Alamat + " " + options[0].Kota;
            });
            jenisPajakSelect.setAttribute("readonly", true);
        } else {
            fetch("/getAlamatCust/" + idCustomer.value)
            .then((response) => response.json())
            .then((options) => {
                console.log(options);
                alamat.value = options[0].AlamatNPWP;
            });
            jenisPajakSelect.removeAttribute("readonly");
        }
    });
    nomorSPSelect.focus();
}

function HitungPesanan() {
    var checkboxValue = document.getElementById("potongUM").value;
  // Melakukan pengecekan apakah nilai checkbox adalah
    if (checkboxValue === "1") {
    let j = 0;
    console.log("Nilai checkbox adalah 1");
    fetch("/getNotaJualTunai/" + noSP.value)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);

            j = j + options[0].Total;
            nilaiSP.value = nilaiSP.value + j;
            nilaiSP.value = parseFloat(nilaiSP.value).toFixed(2).replace(/\d(?=(\d{10})+\.)/g, '$&,');
            console.log(nilaiSP.value);

            totalPenagihan.value = nilaiSP.value - nilaiUM.value;
            totalPenagihan.value = parseFloat(totalPenagihan.value).toFixed(2).replace(/\d(?=(\d{10})+\.)/g, '$&,');
            console.log(totalPenagihan.value);

            tabelSuratPesanan.row.add([
                noSP.value, // Isi kolom pertama dengan noSP
                j // Isi kolom kedua dengan j
            ]).draw().node();
        });
  } else {
    let j = 0
    fetch("/getNotaJualTunai2/" + noSP.value)
    .then((response) => response.json())
    .then((options) => {
        console.log(options);

        j = j + options[0].Total;
        nilaiSP.value = parseFloat(nilaiSP.value + j);

        tabelSuratPesanan.row.add([
            noSP.value, // Isi kolom pertama dengan noSP
            j // Isi kolom kedua dengan j
        ]).draw().node();


    });
    console.log("Nilai checkbox bukan 1");
    // Tambahkan perintah lain di sini
  }
};

fetch("/getUserPenagihNota/")
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        userPenagihSelect.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.innerText = "Pilih User Penagih";
        userPenagihSelect.appendChild(defaultOption);

        options.forEach((entry) => {
            const option = document.createElement("option");
            option.value = entry.IdUser; // Gunakan entry.IdCust sebagai nilai opsi
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
    dokumenSelect.focus();
});

let kode;
if (idJenisCustomer.value === 'NPX') {
    kode = 3;
} else {
    kode = 2;
}
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
});

dokumenSelect.addEventListener("change", function (event) {
    event.preventDefault();
    const selectedOption = dokumenSelect.options[dokumenSelect.selectedIndex];
    if (selectedOption) {
        const selectedValue = selectedOption.textContent; // Atau selectedOption.innerText
        const bagiansatu = selectedValue.split(/[-|]/);
        const jenis = bagiansatu[0];
        const nama = bagiansatu[1];
        idJenisDokumen.value  = jenis;
        jenisdok.value = nama;
    }
    jenisPajakSelect.focus();
});

fetch("/getJenisPajakNota/")
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        jenisPajakSelect.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.innerText = "Pilih Jenis Pajak";
        jenisPajakSelect.appendChild(defaultOption);

        options.forEach((entry) => {
            const option = document.createElement("option");
            option.value = entry.Jns_PPN; // Gunakan entry.IdCust sebagai nilai opsi
            option.innerText = entry.Jns_PPN + "|" + entry.Nama_Jns_PPN; // Gunakan entry.IdCust dan entry.NamaCust untuk teks opsi
            jenisPajakSelect.appendChild(option);
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
     if (jenisPajakSelect.selectedIndex != 0) {
        btnSimpan.focus();
     }
});

//KOREKSI
fetch("/getNoPenagihanNota/")
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        noPenagihanSelect.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.innerText = "Pilih Jenis Pajak";
        noPenagihanSelect.appendChild(defaultOption);

        options.forEach((entry) => {
            const option = document.createElement("option");
            option.value = entry.Id_Penagihan; // Gunakan entry.IdCust sebagai nilai opsi
            option.innerText = entry.Id_Penagihan + "|" + entry.NamaCust; // Gunakan entry.IdCust dan entry.NamaCust untuk teks opsi
            noPenagihanSelect.appendChild(option);
    });
});

noPenagihanSelect.addEventListener("change", function (event) {
    event.preventDefault();
    const selectedOption = noPenagihanSelect.options[noPenagihanSelect.selectedIndex];
    if (selectedOption) {
        const selectedValue = selectedOption.textContent; // Atau selectedOption.innerText
        const bagiansatu = selectedValue.split(/[-|]/);
        const penagihan = bagiansatu[0];
        const jenis = bagiansatu[2];
        idCustomer.value  = jenis;
        idNoPenagihan.value = penagihan;

        id_Penagihan.value = idNoPenagihan.value.replace(/\//g, '.');


        fetch("/getJenisCust/" + idCustomer.value)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);

            idJenisCustomer.value = options[0].JnsCust;

            if (jenisCustomer.value == "NPX") {
                alamat.value = options[0].Alamat + " " + options[0].Kota;
            }else {
                alamat.value = options[0].AlamatNPWP;
            }

            fetch("/getJnsCust/" + idJenisCustomer.value)
            .then((response) => response.json())
            .then((options) => {
                console.log(options);

                jenisCustomer.value = options[0].NamaJnsCust;
            });

            fetch("/getLihatSP/" + id_Penagihan.value)
            .then((response) => response.json())
            .then((options) => {
                console.log(options);

                noSP.value = options[0].SuratPesanan;

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
                    let SP = noSP.value;
                    let opt6 = nomorSPSelect.options;
                    console.log("nomor sp" , SP);
                    console.log(nomorSPSelect.options);
                    for (let i = 0; i < opt6.length; i++) {
                        if (opt6[i].value == SP) {
                            nomorSPSelect.selectedIndex = i;
                            break;
                        };
                    }
                });

                let j = 0;
                tabelSuratPesanan.row.add([
                    options[0].SuratPesanan, // Isi kolom pertama dengan noSP
                    options[0].Total // Isi kolom kedua dengan j
                ]).draw().node();
                j = j + options[0].Total;
                nilaiSP.value = parseFloat(j).toFixed(2).replace(/\d(?=(\d{10})+\.)/g, '$&,');

                totalPenagihan.value = nilaiSP.value - nilaiUM.value;
                totalPenagihan.value = parseFloat(totalPenagihan.value).toFixed(2).replace(/\d(?=(\d{10})+\.)/g, '$&,');


                fetch("/getDataSP/" + noSP.value)
                .then((response) => response.json())
                .then((options) => {
                    console.log(options);

                    if (options[0].IDMataUang == "IDR") {
                        idMataUang.value = 1;
                    } else if (options[0].IDMataUang == "USD") {
                        idMataUang.value = 2;
                    };

                    let UP = idMataUang.value;
                    let opt = mataUangSelect.options;
                    console.log(opt);
                    for (let i = 0; i < opt.length; i++) {
                        if (opt[i].value == UP) {
                            // Setel select option jenisPembayaranSelect sesuai dengan opsi yang cocok
                            mataUangSelect.selectedIndex = i;
                            break;
                        }
                    };

                    if (idMataUang.value == 1) {
                        nilaiKurs.setAttribute("readonly", true);
                    } else {
                        nilaiKurs.focus();
                        nilaiKurs.removeAttribute("readonly");
                    };
                    syaratPembayaran.value = options[0].SyaratBayar;
                    nomorPO.value = options[0].NO_PO;
                });

                fetch("/getLihatPenagihan/" + id_Penagihan.value)
                .then((response) => response.json())
                .then((options) => {
                    console.log("getLihatPenagihan: ", options);

                    idJenisDokumen.value = options[0].Id_Jenis_Dokumen;
                    idUserPenagih.value = options[0].IdPenagih;
                    terbilang.value = options[0].Terbilang;
                    discount.value = options[0].Discount;
                    idJenisPajak.value = options[0].Jns_PPN;
                    Ppn.value = options[0].PersenPPN;
                    if (options[0].PersenPPN == 0) {
                        Ppn.value = 10;
                    }
                    idPenagihanUM.value = options[0].Id_Penagihan_Acuan;
                    nilaiUM.value = options[0].Nilai_UM;
                    nilaiUM.value = parseFloat(nilaiUM.value).toFixed(2).replace(/\d(?=(\d{10})+\.)/g, '$&,');

                    let JD = idJenisDokumen.value;
                    let opt4 = dokumenSelect.options;
                    for (let i = 0; i < opt4.length; i++) {
                        if (opt4[i].value == JD) {
                            dokumenSelect.selectedIndex = i;
                            break;
                        }
                    };

                    let user = idUserPenagih.value;
                    let opt5 = userPenagihSelect.options;
                    for (let i = 0; i < opt5.length; i++) {
                        if (opt5[i].value == user) {
                            userPenagihSelect.selectedIndex = i;
                            break;
                        }
                    };

                    fetch("/getNoPenagihanUMNota/" + noSP.value)
                    .then((response) => response.json())
                    .then((options) => {
                        console.log(options);
                        noPenagihanUM.innerHTML = "";

                        const defaultOption = document.createElement("option");
                        defaultOption.disabled = true;
                        defaultOption.selected = true;
                        defaultOption.innerText = "Pilih No Penagihan UM";
                        noPenagihanUM.appendChild(defaultOption);

                        options.forEach((entry) => {
                            const option = document.createElement("option");
                            option.value = entry.Id_Penagihan; // Gunakan entry.IdCust sebagai nilai opsi
                            option.innerText = entry.Id_Penagihan + "|" + entry.nilai_BLM_PAJAK; // Gunakan entry.IdCust dan entry.NamaCust untuk teks opsi
                            noPenagihanUM.appendChild(option);
                        });

                        let UM = idPenagihanUM.value;
                        let opt2 = noPenagihanUM.options;
                        for (let i = 0; i < opt2.length; i++) {
                            if (opt2[i].value == UM) {
                                noPenagihanUM.selectedIndex = i;
                                break;
                            }
                        };

                        if (noPenagihanUM.selectedIndex != 0) {
                            checkbox.checked = true;
                            totalPenagihan.value = nilaiSP.value - nilaiUM.value;

                        };
                    })
                    let JP = idJenisPajak.value;
                    let opt3 = jenisPajakSelect.options;
                    for (let i = 0; i < opt3.length; i++) {
                        if (opt3[i].value == JP) {
                            jenisPajakSelect.selectedIndex = i;
                            break;
                    }};
                });
            });
        });
    }
});

btnSimpan.addEventListener("click", function(event) {
    event.preventDefault();
    if (proses == 1) {
        formkoreksi.submit();
    } else if (proses == 2) {
        methodkoreksi.value="PUT";
        formkoreksi.action = "/NotaPenjualanTunai/" + id_Penagihan.value;
        formkoreksi.submit();
    }
});

$("#tabelSuratPesanan tbody").off("click", "tr");
$("#tabelSuratPesanan tbody").on("click", "tr", function () {
    let checkSelectedRows = $("#tabelSuratPesanan tbody tr.selected");

    if (checkSelectedRows.length > 0) {
        // Remove "selected" class from previously selected rows
        checkSelectedRows.removeClass("selected");
    }
    $(this).toggleClass("selected");
    const table = $("#tabelSuratPesanan").DataTable();
    let selectedRows = table.rows(".selected").data().toArray();
    console.log(selectedRows[0]);
    // suratPesanan.value = selectedRows[0].Keterangan;

    btnHapusItem.disabled = false;
});

$("#btnHapusItem").on("click", function () {
    const table = $("#tabelSuratPesanan").DataTable();
    let selectedRowsData = table.rows(".selected").data().toArray();

    if (selectedRowsData.length > 0) {
        if (hapusitem = 1) {
            let selectedRow = table.row(".selected");

            totalPenagihan.value = totalPenagihan.value - selectedRow[1];
            selectedRow.remove().draw();
        }
        // Ambil data yang dipilih
    } else if (hapusitem = 2) {
        let selectedRow = table.row(".selected");
        selectedRow.remove().draw();
        totalPenagihan.value = "";
    }
});





