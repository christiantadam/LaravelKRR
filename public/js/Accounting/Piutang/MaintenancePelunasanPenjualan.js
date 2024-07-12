let tanggalInput = document.getElementById('tanggalInput');
let namaCustomerSelect = document.getElementById('namaCustomerSelect');
let noPelunasanSelect = document.getElementById('noPelunasanSelect');
let jenisPembayaranSelect = document.getElementById('jenisPembayaranSelect');
let mataUangSelect = document.getElementById('mataUangSelect');
let informasiBankSelect = document.getElementById('informasiBankSelect');
let nilaiMasukKas = document.getElementById('nilaiMasukKas');
let buktiPelunasan = document.getElementById('buktiPelunasan');
// let tabelPelunasanPenjualan = document.getElementById('tabelPelunasanPenjualan');
let totalPelunasan = document.getElementById('totalPelunasan');
let nilaiPiutang = document.getElementById('nilaiPiutang');
let totalBiaya = document.getElementById('totalBiaya');
let kurangLebih = document.getElementById('kurangLebih');
let tabelPelunasanPenjualan = $('#tabelPelunasanPenjualan').DataTable();
let IdPelunasan = document.getElementById('IdPelunasan');;
let Id_Pelunasan = document.getElementById('Id_Pelunasan');
let formkoreksi = document.getElementById('formkoreksi');
let methodkoreksi = document.getElementById('methodkoreksi');

let btnAddItem = document.getElementById('btnAddItem');
let btnEditItem = document.getElementById('btnEditItem');
let btnDeleteItem = document.getElementById('btnDeleteItem');
let modalLihatPenagihan = document.getElementById('modalLihatPenagihan');
let methodLihatPenagihan = document.getElementById('methodLihatPenagihan');
let formLihatPenagihan = document.getElementById('formLihatPenagihan');
let btnSimpanModal = document.getElementById('btnSimpanModal');
let statusBayar = document.getElementById('statusBayar');

let btnSimpan = document.getElementById('btnSimpan');
let btnKoreksi = document.getElementById('btnKoreksi');
let btnHapus = document.getElementById('btnHapus');
let btnIsi = document.getElementById('btnIsi');
let btnBatal = document.getElementById('btnBatal');

//HIDDEN
let idCustomer = document.getElementById('idCustomer');
let idJenisCustomer = document.getElementById('idJenisCustomer');
let idJenisPembayaran = document.getElementById('idJenisPembayaran');
let idMataUang = document.getElementById('idMataUang');
let idReferensi = document.getElementById('idReferensi');
let cust;
let proses;
let prosesmodal;
let noPen = document.getElementById('noPen');
let no_Pen = document.getElementById('no_Pen');
let noPen1 = document.getElementById('noPen1');
let no_Pen1 = document.getElementById('no_Pen1');
let arrayDetail = document.getElementById('arrayDetail');
let arrayPenagihan = document.getElementById('arrayPenagihan');
let hAtauB = document.getElementById('hAtauB');

//HIDDEN (TABEL)
let tabelIdDetailPelunasan = document.getElementById('tabelIdDetailPelunasan');
let tabelIdPenagihan = document.getElementById('tabelIdPenagihan');
let tabelNilaiPelunasan = document.getElementById('tabelNilaiPelunasan');
let tabelPelunasanRupiah = document.getElementById('tabelPelunasanRupiah');
let tabelBiaya = document.getElementById('tabelBiaya');
let tabelLunas = document.getElementById('tabelLunas');
let tabelPelunasanCurrency = document.getElementById('tabelPelunasanCurrency');
let tabelKurangLebih = document.getElementById('tabelKurangLebih');
let tabelKodePerkiraan = document.getElementById('tabelKodePerkiraan');
let tabelIdDetail = document.getElementById('tabelIdDetail');

//MODAL
let totalKembalian = 0;
let noPenagihan = document.getElementById('noPenagihan');
let nilaiPenagihan = document.getElementById('nilaiPenagihan');
let mataUangPenagihan = document.getElementById('mataUangPenagihan');
let nilaiKurs = document.getElementById('nilaiKurs');
let terbayar = document.getElementById('terbayar');
let terbayarRupiah = document.getElementById('terbayarRupiah');
let pelunasanCurrency = document.getElementById('pelunasanCurrency');
let pelunasanRupiah = document.getElementById('pelunasanRupiah');
let jumlahYangDibayar = document.getElementById('jumlahYangDibayar');
let sisa = document.getElementById('sisa');
let sisaRupiah = document.getElementById('sisaRupiah');
let kodePerkiraanSelect = document.getElementById('kodePerkiraanSelect');
let idKodePerkiraan = document.getElementById('idKodePerkiraan');
let nilaiBiaya = document.getElementById('nilaiBiaya');
let nilaiKurangLebih = document.getElementById('nilaiKurangLebih');
let noPenagihan1 = document.getElementById('noPenagihan1');
let lunas = document.getElementById('lunas');

let matauang;
let Z = 0;
let sNilai_Pelunasan = 0;
let sBiaya = 0;
let sKurangLebih = 0;
let sPelunasan_Rupiah = 0;
let sPelunasan_curency = 0;
let listHapus = [];
let listHapusPenagihan = [];
let sUser;
let sMasukKas;

const tanggalPenagihan = new Date();
const formattedDate2 = tanggalPenagihan.toISOString().substring(0, 10);
tanggalInput.value = formattedDate2;

btnIsi.addEventListener('click', function(event) {
    event.preventDefault();

    btnIsi.style.display = "none";
    btnSimpan.style.display = "block";
    btnKoreksi.style.display = "none";
    btnBatal.style.display = "block";

    tanggalInput.removeAttribute("readonly");
    namaCustomerSelect.removeAttribute("readonly");
    jenisPembayaranSelect.removeAttribute("readonly");
    buktiPelunasan.removeAttribute("readonly");
    totalPelunasan.removeAttribute("readonly");
    totalBiaya.removeAttribute("readonly");
    nilaiPiutang.removeAttribute("readonly");
    kurangLebih.removeAttribute("readonly");
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

    proses = 1;
    cust = 1;
    namaCustomerSelect.focus();
    TampilCust();
});

btnBatal.addEventListener('click', function(event) {
    event.preventDefault();

    tanggalInput.value = "";
    namaCustomerSelect.selectedIndex = 0;
    idCustomer.value = "";
    idJenisCustomer.value = "";
    noPelunasanSelect.selectedIndex = 0;
    jenisPembayaranSelect.selectedIndex = 0;
    idJenisPembayaran.value = "";
    informasiBankSelect.selectedIndex = 0;
    idReferensi.value = "";
    mataUangSelect.selectedIndex = 0;
    idMataUang.value = "";
    nilaiMasukKas.value = "";
    buktiPelunasan.value = "";
    tabelPelunasanPenjualan.clear().draw();
    totalPelunasan.value = "";
    totalBiaya.value = "";
    nilaiPiutang.value = "";
    kurangLebih.value = "";
})

function TampilCust() {
    if (cust == 1) {
        fetch("/getCustIsi/")
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

                jenisPembayaranSelect.focus();
            }
            fetch("/getReferensiBank/" + idCustomer.value)
            .then((response) => response.json())
            .then((options) => {
                console.log(options);
                informasiBankSelect.innerHTML="";

                const defaultOption = document.createElement("option");
                defaultOption.disabled = true;
                defaultOption.selected = true;
                defaultOption.innerText = "Ref Bank";
                informasiBankSelect.appendChild(defaultOption);

                options.forEach((entry) => {
                    const option = document.createElement("option");
                    option.value = entry.IdReferensi;
                    option.innerText = entry.IdReferensi + "|" + entry.Ket;
                    informasiBankSelect.appendChild(option);
                });
            });
        });
    } else if (cust == 2 || cust == 3) {
        fetch("/getCustKoreksi/")
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

                jenisPembayaranSelect.focus();
            }
            fetch("/getReferensiBank/" + idCustomer.value)
            .then((response) => response.json())
            .then((options) => {
                console.log(options);
                informasiBankSelect.innerHTML="";

                const defaultOption = document.createElement("option");
                defaultOption.disabled = true;
                defaultOption.selected = true;
                defaultOption.innerText = "Ref Bank";
                informasiBankSelect.appendChild(defaultOption);

                options.forEach((entry) => {
                    const option = document.createElement("option");
                    option.value = entry.IdReferensi;
                    option.innerText = entry.IdReferensi + "|" + entry.Ket;
                    informasiBankSelect.appendChild(option);
                });
            });
        });
    }
};

fetch("/getJenisPembayaran/")
.then((response) => response.json())
.then((options) => {
    console.log(options);
    jenisPembayaranSelect.innerHTML = "";

    const defaultOption = document.createElement("option");
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.innerText = "Pilih Jenis Bayar";
    jenisPembayaranSelect.appendChild(defaultOption);

    options.forEach((entry) => {
        const option = document.createElement("option");
        option.value = entry.Id_Jenis_Bayar; // Gunakan entry.IdCust sebagai nilai opsi
        option.innerText = entry.Id_Jenis_Bayar + "|" + entry.Jenis_Pembayaran; // Gunakan entry.IdCust dan entry.NamaCust untuk teks opsi
        jenisPembayaranSelect.appendChild(option);
    });
});

jenisPembayaranSelect.addEventListener("change", function (event) {
    event.preventDefault();
    const selectedOption = jenisPembayaranSelect.options[jenisPembayaranSelect.selectedIndex];
    if (selectedOption) {
        const selectedValue = selectedOption.textContent; // Atau selectedOption.innerText
        const bagiansatu = selectedValue.split(/[-|]/);
        const jenis = bagiansatu[0];
        idJenisPembayaran.value = jenis;
    }

    if (idJenisPembayaran.value == 1 || idJenisPembayaran.value == 2 || idJenisPembayaran.value == 3) {
        if (idJenisPembayaran.value == 2 || idJenisPembayaran.value == 3) {
            statusBayar.value = "B";
        } else {
            statusBayar.value = "";
        }
        informasiBankSelect.setAttribute("readonly", true);
        mataUangSelect.removeAttribute("readonly");
        nilaiMasukKas.removeAttribute("readonly");
        mataUangSelect.focus();
    } else {
        informasiBankSelect.removeAttribute("readonly");
        mataUangSelect.setAttribute("readonly", true);
        nilaiMasukKas.setAttribute("readonly", true);
        informasiBankSelect.focus();
    }
});

fetch("/getmatauang/")
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        mataUangSelect.innerHTML="";

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
        const selectedValue = selectedOption.textContent;
        const idMU = selectedValue.split("|")[0];
        idMataUang.value = idMU;
    }

    nilaiMasukKas.focus();
});

informasiBankSelect.addEventListener("change", function (event) {
    event.preventDefault();
    const selectedOption = informasiBankSelect.options[informasiBankSelect.selectedIndex];
    if (selectedOption) {
        const selectedValue = selectedOption.textContent;
        const idMU = selectedValue.split("|")[0];
        idReferensi.value = idMU;
    }

    if (informasiBankSelect.selectedIndex != 0) {
        LihatReferensi();
    }
});

function LihatReferensi() {
    fetch("/getDataRefBank/" + idReferensi.value)
    .then((response) => response.json())
    .then((options) => {
        console.log(options);

        options.forEach((option) => {
            //Ambil nilai Tgl_Order dari setiap objek data
            const tglInput = option.Tanggal;
            const [tanggal, waktu] = tglInput.split(" ");
            option.Tanggal = tanggal;
            tanggalInput.value = tanggal;
        });

        idMataUang.value = options[0].Id_MataUang;
        nilaiMasukKas.value = options[0].Nilai;
        buktiPelunasan.value = options[0].No_Bukti;
        tanggalInput.value = options[0].Tanggal;

        let MU = idMataUang.value;
        let opt = mataUangSelect.options;
        for (let i = 0; i < opt.length; i++) {
            if (opt[i].value == MU) {
                mataUangSelect.selectedIndex = i;
                break;
            }
        };
    })
}

nilaiMasukKas.addEventListener("keypress", function(event) {
    if (event.key == "Enter") {
        event.preventDefault();
        buktiPelunasan.focus();
    }
});

buktiPelunasan.addEventListener("keypress", function(event) {
    if (event.key == "Enter") {
        event.preventDefault();
        btnAddItem.focus();
    }
})

btnAddItem.addEventListener('click', function (event) {
    event.preventDefault();
    modalLihatPenagihan = $("#modalLihatPenagihan");
    modalLihatPenagihan.modal('show');
    prosesmodal = 1;
});

// function LihatDetailPelunasan() {
//     fetch("/getListPenagihanSJ/" + idCustomer.value)
//         .then((response) => response.json())
//         .then((options) => {
//             console.log(options);
//     })
// }


// Fungsi untuk menangani perubahan pada tombol radio
function handleRadioChange() {
    var selectedValue = document.querySelector('input[name="radiogrup1"]:checked').value;
    kodePerkiraanSelect.removeAttribute("readonly", true);

    // Cek nilai yang terpilih dan lakukan sesuatu berdasarkan nilai tersebut
    if (selectedValue === "1") {
        noPenagihan.removeAttribute("readonly", true);
        nilaiPenagihan.removeAttribute("readonly", true);
        nilaiKurs.removeAttribute("readonly", true);
        jumlahYangDibayar.removeAttribute("readonly", true);
        pelunasanCurrency.removeAttribute("readonly", true);
        pelunasanRupiah.removeAttribute("readonly", true);
        nilaiPenagihan.removeAttribute("readonly", true);
        terbayar.removeAttribute("readonly", true);
        terbayarRupiah.removeAttribute("readonly", true);
        lunas.removeAttribute("readonly", true);
        console.log("Anda memilih Pelunasan");
        fetch("/getListPenagihanSJ/" + idCustomer.value)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);
            noPenagihan.innerHTML="";

            const defaultOption = document.createElement("option");
            defaultOption.disabled = true;
            defaultOption.selected = true;
            defaultOption.innerText = "Pilih No. Penagihan";
            noPenagihan.appendChild(defaultOption);

            options.forEach((entry) => {
                const option = document.createElement("option");
                option.value = entry.Id_Penagihan;
                option.innerText = entry.Id_Penagihan + "|" + entry.Tgl_Penagihan;
                noPenagihan.appendChild(option);
            });

        })

        // totalKembalian = options[0].

        noPenagihan.addEventListener("change", function (event) {
            event.preventDefault();
            const selectedOption = noPenagihan.options[noPenagihan.selectedIndex];
            if (selectedOption) {
                const selectedValue = selectedOption.textContent;
                const penagihan = selectedValue.split("|")[0];
                noPen.value = penagihan;

                no_Pen.value = noPen.value.replace(/\//g, '.');

                fetch("/getListPelunasanTagihan/" + no_Pen.value)
                .then((response) => response.json())
                .then((options) => {
                    console.log(options);

                    nilaiPenagihan.value = options[0].Nilai_Penagihan;
                    nilaiPenagihan.value = nilaiPenagihan.value - totalKembalian
                    mataUangPenagihan.value = options[0].Nama_MataUang;
                    nilaiKurs.value = options[0].NilaiKurs;

                    if (options[0].Tot_Pelunasan_Rupiah == null) {
                        terbayarRupiah.value = 0;
                        terbayar.value = 0;
                    } else {
                        var rows = tabelPelunasanPenjualan.getElementsByTagName('tr');
                        if (rows.length > 0) {
                            var rowCount = rows.length;
                            if (condition) {

                            }else {
                                terbayarRupiah.value = options[0].Tot_Pelunasan_Rupiah - pelunasanRupiah.value;
                                terbayar.value = options[0].Tot_Nilai_Pelunasan - pelunasanCurrency.value;
                            }
                        } else {
                            terbayarRupiah.value = options[0].Tot_Pelunasan_Rupiah;
                            terbayar.value = options[0].Tot_Nilai_Pelunasan;
                        }

                        if (jumlahYangDibayar.value == 0) {
                            jumlahYangDibayar.value = nilaiPenagihan.value - terbayar.value;
                        }
                        sisa.value = nilaiPenagihan.value - terbayar.value;
                        sisaRupiah.value = (nilaiPenagihan.value * nilaiKurs.value) - (terbayar.value - nilaiKurs.value)
                        sisa.value = parseFloat(sisa.value).toFixed(2).replace(/\d(?=(\d{10})+\.)/g, '$&,');
                        sisaRupiah.value = parseFloat(sisaRupiah.value).toFixed(2).replace(/\d(?=(\d{10})+\.)/g, '$&,');

                        jumlahYangDibayar.focus();
                    }

                    jumlahYangDibayar.addEventListener("keypress", function(event) {
                        if (event.key == "Enter") {
                            event.preventDefault();
                            matauang = mataUangPenagihan.value.trim().toUpperCase();
                            if (matauang !== "RUPIAH" && idMataUang.value == 1) {
                                pelunasanCurrency.value = jumlahYangDibayar.value / nilaiKurs.value;
                                pelunasanRupiah.value = jumlahYangDibayar.value;
                            } else {
                                pelunasanCurrency.value = jumlahYangDibayar.value * nilaiKurs.value;
                                pelunasanRupiah.value = pelunasanCurrency.value;
                            }
                        } else {
                            if (idMataUang != 1) {
                                pelunasanRupiah.value = jumlahYangDibayar.value * nilaiKurs.value;
                            } else {
                                pelunasanRupiah.value = jumlahYangDibayar.value;
                            }
                            pelunasanCurrency.value = jumlahYangDibayar.value;
                        }
                        pelunasanCurrency.focus();
                    });
                })
            }
            pelunasanCurrency.addEventListener("keypress", function(event) {
                if (event.key == "Enter") {
                    event.preventDefault();
                    kodePerkiraanSelect.focus();
                }
            });
        });

    } else if (selectedValue === "2") {
        console.log("Anda memilih Biaya Ditanggung");
        if (idJenisPembayaran.value != 2 && idJenisPembayaran != 3) {
            noPenagihan.setAttribute("readonly", true);
            noPen.setAttribute("readonly", true);
            no_Pen.setAttribute("readonly", true);
            nilaiPenagihan.setAttribute("readonly", true);
            nilaiKurs.setAttribute("readonly", true);
            terbayar.setAttribute("readonly", true);
            terbayarRupiah.setAttribute("readonly", true);
            mataUangPenagihan.setAttribute("readonly", true);
            jumlahYangDibayar.setAttribute("readonly", true);
            pelunasanCurrency.setAttribute("readonly", true);
            pelunasanRupiah.setAttribute("readonly", true);
            lunas.setAttribute("readonly", true);

            nilaiBiaya.removeAttribute("readonly", true);
            nilaiKurangLebih.value = 0;
            nilaiBiaya.focus();
        } else {

        }
    } else if (selectedValue === "3") {
        fetch("/getListPenagihanSJ/" + idCustomer.value)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);
            noPenagihan1.innerHTML="";

            const defaultOption = document.createElement("option");
            defaultOption.disabled = true;
            defaultOption.selected = true;
            defaultOption.innerText = "Pilih No. Penagihan";
            noPenagihan1.appendChild(defaultOption);

            options.forEach((entry) => {
                const option = document.createElement("option");
                option.value = entry.Id_Penagihan;
                option.innerText = entry.Id_Penagihan + "|" + entry.Tgl_Penagihan;
                noPenagihan1.appendChild(option);
            });
        });

        noPenagihan1.addEventListener("change", function (event) {
            event.preventDefault();
            const selectedOption = noPenagihan1.options[noPenagihan1.selectedIndex];
            if (selectedOption) {
                const selectedValue = selectedOption.textContent;
                const penagihan = selectedValue.split("|")[0];
                noPen1.value = penagihan;

                no_Pen1.value = noPen1.value.replace(/\//g, '.');
            }
        });

        console.log("Anda memilih Kurang/Lebih");
        nilaiKurangLebih.removeAttribute("readonly", true);
        noPenagihan1.removeAttribute("readonly", true);
        nilaiKurangLebih.focus();
        nilaiBiaya.value = 0;
    }
};

// Tambahkan event listener untuk setiap tombol radio
var radioButtons = document.querySelectorAll('input[name="radiogrup1"]');
radioButtons.forEach(function (radioButton) {
    radioButton.addEventListener('change', handleRadioChange);
});

nilaiBiaya.addEventListener("keypress", function(event) {
    if (event.key == "Enter") {
        event.preventDefault();
        kodePerkiraanSelect.focus();
    }
});

nilaiKurangLebih.addEventListener("keypress", function(event) {
    if (event.key == "Enter") {
        event.preventDefault();
        noPenagihan1.focus();
    }
});

noPenagihan1.addEventListener('click', function(event) {
    event.preventDefault();
})

fetch("/getKdPerkiraan/")
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        kodePerkiraanSelect.innerHTML="";

        const defaultOption = document.createElement("option");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.innerText = "Pilih Kode Perkiraan";
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
        const selectedValue = selectedOption.textContent;
        const penagihan = selectedValue.split("|")[0];
        idKodePerkiraan.value = penagihan;
    }
    btnSimpanModal.focus();
});


btnSimpanModal.addEventListener('click', function(event) {
    event.preventDefault();
    var selectedValue = document.querySelector('input[name="radiogrup1"]:checked').value;
    // console.log("Harusnya jalan memilih Pelunasan", selectedValue);
    if (selectedValue != "1" && selectedValue != "2" && selectedValue != "3") {
        alert("Tidak Ada Yang DiSimpan !!");
    }

    if (selectedValue == "1" && jumlahYangDibayar.value <= 0) {
        alert("Nilai Pelunasan Harus Diisi");
        jumlahYangDibayar.focus();
    } else if (selectedValue == "2" && nilaiBiaya.value <= 0) {
        alert("Nilai Biaya Harus Diisi");
    } else if (selectedValue == "3" && nilaiKurangLebih.value == 0) {
        alert("Nilai Kurang/Lebih Harus Diisi");
    } else if (selectedValue == "3" && nilaiKurangLebih.value < 0 && noPenagihan1.selectedIndex == 0) {
        alert("Nilai Kurang, Nomor Tagihan Harus Diisi");
    };

    if ((lunas.value === "" || lunas.value === " " || (lunas.value.toUpperCase() != "Y" && lunas.value.toUpperCase() != "N"))
    && selectedValue === 1 || (idJenisPembayaran.value == 2 || idJenisPembayaran.value == 3) || lunas.value.toUpperCase() == "Y") {
        alert("Salah Input Kolom Lunas");
        lunas.focus();
    };

    const rowCount = tabelPelunasanPenjualan.rows().count();
    // console.log("Length of tabelPelunasanPenjualan:", rowCount);
    // tabelPelunasanPenjualan.rows().every(function (index, element) {
    //     // Mendapatkan data pada kolom yang sesuai (misalnya, kolom dengan indeks 0)
    //     var rowData = this.data();
    //     console.log("masuk");
    //     // Lakukan pengecekan
    //     if (rowData[0] !== "" && rowData[0] === noPen.value && Z === 0) {
    //         alert("Data sudah diinputkan");
    //         // Fokus ke elemen yang diinginkan (misalnya, tombol CmdPenagihan)
    //         noPenagihan.focus();
    //         return false; // Keluar dari iterasi
    //     }
    // });

    if (prosesmodal == 1) {
        if (rowCount == 0) {
            totalPelunasan.value = totalPelunasan.value + nilaiPiutang.value;
            totalBiaya.value = totalBiaya.value + nilaiBiaya.value;
            kurangLebih.value = kurangLebih.value + nilaiKurangLebih.value;

            tabelPelunasanPenjualan.row.add([
                noPen.value,
                jumlahYangDibayar.value,
                nilaiBiaya.value,
                lunas.value.toUpperCase(),
                "",
                pelunasanRupiah.value,
                idMataUang.value,
                pelunasanCurrency.value,
                nilaiKurangLebih.value,
                idKodePerkiraan.value,
                noPen1.value
            ]).draw().node();
        } else {
            totalPelunasan.value = totalPelunasan.value - sNilai_Pelunasan + nilaiPiutang.value;
            totalBiaya.value = totalBiaya.value - sBiaya + nilaiBiaya.value;
            kurangLebih.value = kurangLebih.value - sKurangLebih + nilaiKurangLebih.value;

            tabelPelunasanPenjualan.row.add([
                noPen.value,
                jumlahYangDibayar.value,
                nilaiBiaya.value,
                lunas.value.toUpperCase(),
                "",
                pelunasanRupiah.value,
                pelunasanRupiah.value,
                idMataUang.value,
                nilaiKurangLebih.value,
                idKodePerkiraan.value,
                noPen1.value
            ]).draw().node();
        }
    } else if (prosesmodal == 2) {
        updatedData.ID_Penagihan = noPenagihan.value;
        updatedData.Lunas = lunas.value;
        updatedData.Nilai_Pelunasan = jumlahYangDibayar.value;
        updatedData.Pelunasan_Rupiah = pelunasanRupiah.value;
        updatedData.Pelunasan_Curency = pelunasanCurrency.value;

        console.log(updatedData);
        if (selectedIndex >= 0) { // Pastikan ada baris yang dicentang
            if (selectedRows[selectedIndex].Nilai_Pelunasan == 0) {
                if (selectedRows[selectedIndex].Biaya != 0) {
                    selectedRows[selectedIndex].Biaya = updatedData.Biaya;
                    sBiaya = updatedData.Biaya;
                } else {
                    selectedRows[selectedIndex].KurangLebih = updatedData.KurangLebih;
                    sKurangLebih = updatedData.KurangLebih;
                }
            } else {
                // Perbarui data pada indeks baris yang dicentang
                selectedRows[selectedIndex].ID_Penagihan = updatedData.ID_Penagihan;
                selectedRows[selectedIndex].Lunas = updatedData.Lunas;
                selectedRows[selectedIndex].Nilai_Pelunasan = updatedData.Nilai_Pelunasan;
                selectedRows[selectedIndex].Pelunasan_Rupiah = updatedData.Pelunasan_Rupiah;
                selectedRows[selectedIndex].Pelunasan_Curency = updatedData.Pelunasan_Curency;

                sNilai_Pelunasan = selectedRows[selectedIndex].Nilai_Pelunasan;
                sPelunasan_Rupiah = selectedRows[selectedIndex].Pelunasan_Rupiah;
                sPelunasan_curency = selectedRows[selectedIndex].Pelunasan_Curency;
            }
        }
    }
    $('#modalLihatPenagihan').modal('hide');
});
var selectedRows = [];

$("#tabelPelunasanPenjualan tbody").off("click", "tr");
$("#tabelPelunasanPenjualan tbody").on("click", "tr", function () {
    let checkSelectedRows = $("#tabelPelunasanPenjualan tbody tr.selected");

    if (checkSelectedRows.length > 0) {
        // Remove "selected" class from previously selected rows
        checkSelectedRows.removeClass("selected");
    }
    $(this).toggleClass("selected");
    const table = $("#tabelPelunasanPenjualan").DataTable();
    selectedRows = table.rows(".selected").data().toArray();
    console.log(selectedRows[0]);
    // suratPesanan.value = selectedRows[0].Keterangan;

    if (proses == 1) {
        tabelIdDetailPelunasan.value = selectedRows[0][4];
        tabelIdPenagihan.value = selectedRows[0][0];
        tabelNilaiPelunasan.value = selectedRows[0][1];
        tabelPelunasanRupiah.value = selectedRows[0][5];
        tabelBiaya.value = selectedRows[0][2];
        tabelLunas.value = selectedRows[0][3];
        tabelPelunasanCurrency.value = selectedRows[0][7];
        tabelKurangLebih.value = selectedRows[0][8];
        tabelKodePerkiraan.value = selectedRows[0][9];
        tabelIdDetail.value = selectedRows[0][10];
    } else if (proses == 2 || proses == 3) {
        tabelIdDetailPelunasan.value = selectedRows[0].ID_Detail_Pelunasan;
        tabelIdPenagihan.value = selectedRows[0].ID_Penagihan;
        tabelNilaiPelunasan.value = selectedRows[0].Nilai_Pelunasan;
        tabelPelunasanRupiah.value = selectedRows[0].Pelunasan_Rupiah;
        tabelBiaya.value = selectedRows[0].Biaya;
        tabelLunas.value = selectedRows[0].Lunas;
        tabelPelunasanCurrency.value = selectedRows[0].Pelunasan_Curency;
        tabelKurangLebih.value = selectedRows[0].KurangLebih;
        tabelKodePerkiraan.value = selectedRows[0].Kode_Perkiraan;
        tabelIdDetail.value = selectedRows[0].ID_Penagihan_Pembulatan;
    }
});

var selectedIndex = -1;
var updatedData = {};

btnEditItem.addEventListener('click', function (event) {
    event.preventDefault();
    modalLihatPenagihan = $("#modalLihatPenagihan");
    selectedIndex = 0;
    modalLihatPenagihan.modal('show');
    console.log(selectedRows[0]);
    prosesmodal = 2;

    if(proses == 1) {
        if(selectedRows[0][1] == 0) {
            if (selectedRows[0][2] != 0) {
                nilaiBiaya.value = selectedRows[0][2];
                sBiaya = nilaiBiaya.value;
                var radiobutton = document.querySelector('input[type="radio"][value="2"]');

                // Memeriksa apakah elemen radiobutton ada dan bukan null
                if (radiobutton) {
                    radiobutton.checked = true; // Mencentang radiobutton dengan value 1
                }
                nilaiBiaya.focus();
            } else {
                nilaiKurangLebih.value = selectedRows[0][8];
                sKurangLebih = nilaiKurangLebih.value;
                console.log("masuk value 3");
                var radiobutton = document.querySelector('input[type="radio"][value="3"]');

                // Memeriksa apakah elemen radiobutton ada dan bukan null
                if (radiobutton) {
                    radiobutton.checked = true; // Mencentang radiobutton dengan value 1
                }
                nilaiKurangLebih.focus();
            }
        } else {
            noPenagihan.setAttribute("readonly", true);
            noPen.value = selectedRows[0][0];
            lunas.value = selectedRows[0][3];
            jumlahYangDibayar.value = selectedRows[0][1];
            pelunasanRupiah.value = selectedRows[0][5];
            pelunasanCurrency.value = selectedRows[0][7];

            var radiobutton = document.querySelector('input[type="radio"][value="1"]');
            if (radiobutton) {
                radiobutton.checked = true;
            }

            sNilai_Pelunasan = jumlahYangDibayar.value;
            sPelunasan_Rupiah = pelunasanRupiah.value;
            sPelunasan_curency = pelunasanCurrency.value;
            jumlahYangDibayar.focus();
        }
    } else if (proses == 2) {
        if(selectedRows[0].Nilai_Pelunasan == 0) {
            if (selectedRows[0].Biaya != 0) {
                nilaiBiaya.value = selectedRows[0].Biaya;
                sBiaya = nilaiBiaya.value;
                var radiobutton = document.querySelector('input[type="radio"][value="2"]');

                // Memeriksa apakah elemen radiobutton ada dan bukan null
                if (radiobutton) {
                    radiobutton.checked = true; // Mencentang radiobutton dengan value 1
                }
                nilaiBiaya.focus();
            } else {
                nilaiKurangLebih.value = selectedRows[0].KurangLebih;
                sKurangLebih = nilaiKurangLebih.value;
                console.log("masuk value 3");
                var radiobutton = document.querySelector('input[type="radio"][value="3"]');

                // Memeriksa apakah elemen radiobutton ada dan bukan null
                if (radiobutton) {
                    radiobutton.checked = true; // Mencentang radiobutton dengan value 1
                }
                nilaiKurangLebih.focus();
            }
        } else {
            noPen.value = selectedRows[0].ID_Penagihan;
            lunas.value = selectedRows[0].Lunas;
            jumlahYangDibayar.value = selectedRows[0].Nilai_Pelunasan;
            pelunasanRupiah.value = selectedRows[0].Pelunasan_Rupiah;
            pelunasanCurrency.value = selectedRows[0].Pelunasan_Curency;

            var radiobutton = document.querySelector('input[type="radio"][value="1"]');
            if (radiobutton) {
                radiobutton.checked = true;
            }

            sNilai_Pelunasan = jumlahYangDibayar.value;
            sPelunasan_Rupiah = pelunasanRupiah.value;
            sPelunasan_curency = pelunasanCurrency.value;
            jumlahYangDibayar.focus();
        }
    }
});

btnDeleteItem.addEventListener('click', function(event) {
    event.preventDefault();
    const rowCount = tabelPelunasanPenjualan.rows().count();
    if (rowCount > 1) {
        totalPelunasan.value = totalPelunasan.value - selectedRows[0][1];
        totalBiaya.value = totalBiaya.value = selectedRows[0][2];
        nilaiMasukKas.value = totalPelunasan.value = totalBiaya.value;

        if (selectedRows[0][4] != "") {
            listHapus.push(selectedRows[0][4]);
            listHapusPenagihan.push(selectedRows[0][0]);
            // console.log("List hapus: ",listHapus);
        }
        const selectedRows = $("#tabelPelunasanPenjualan tbody tr.selected");
        selectedRows.remove();
    }
});

btnSimpan.addEventListener('click', function(event) {
    event.preventDefault();

    var tanggalHariIni = new Date();
    if (tanggalInput.value > tanggalHariIni) {
        alert("Tanggal input melebihi tanggal sekarang");
    }

    if (sUser != 1 && proses == 2) {
        alert("Anda Tidak Berhak Mengoreksi Data milik User")
    }

    if (nilaiMasukKas.value < (totalPelunasan.value - totalBiaya.value + kurangLebih.value)) {
        alert("Uang Yang Masuk Tidak Balance dg Pelunasan dan biaya");
    }

    if (tabelPelunasanPenjualan.rows().count() == 0) {
        alert("Data Yang Anda Masukan Belum Lengkap. Harap di cek lagi");
    }

    if (idMataUang.value != (selectedRows[0].Id_MataUang || selectedRows[0][6])) {
        alert("Mata Uang Tidak Boleh DiGanti");
        // console.log("MASUK IF ELSE TIDAK JELAS");
    }

    if (idJenisPembayaran == 2 || idJenisPembayaran == 3) {
        statusBayar.value = "B";
    } else {
        statusBayar.value = "";
    }

    nilaiPiutang.value = totalPelunasan.value;
    sisa.value = totalPelunasan.value - totalBiaya.value + kurangLebih.value;
    sisa.value = nilaiMasukKas.value - sisa.value;
    sMasukKas = 0;
    sMasukKas = totalPelunasan.value - totalBiaya.value + kurangLebih.value;
    if (sMasukKas != parseFloat(nilaiMasukKas.value)) {
        nilaiPiutang.value = nilaiMasukKas.value;
    }
    var HapusDet = listHapus.join(", ");
    arrayDetail.value = HapusDet;

    var HapusPen = listHapusPenagihan.join(", ");
    arrayPenagihan.value = HapusPen;

    if (proses == 1) {
        formkoreksi.submit();
    } else if (proses == 2) {
        methodkoreksi.value="PUT";
        formkoreksi.action = "/MaintenancePelunasanPenjualan/" + Id_Pelunasan.value;
        formkoreksi.submit();
    } else if (proses == 3) {
        var userInput = prompt("Menghapus Pelunasan [H] Atau Batal Giro [B]");
        //userInput = hAtauB.value;
        console.log(hAtauB.value);
        if (userInput === 'H' || userInput === 'B') {
            console.log("masuk hAtauB");
            methodkoreksi.value="DELETE";
            formkoreksi.action = "/MaintenancePelunasanPenjualan/" + Id_Pelunasan.value;
            formkoreksi.submit();
        }
    }
});

btnKoreksi.addEventListener('click', function(event) {
    event.preventDefault();

    btnIsi.style.display = "none";
    btnSimpan.style.display = "block";
    btnKoreksi.style.display = "none";
    btnBatal.style.display = "block";

    namaCustomerSelect.removeAttribute("readonly", true);
    mataUangSelect.removeAttribute("readonly", true);
    informasiBankSelect.removeAttribute("readonly", true);
    nilaiPiutang.removeAttribute("readonly", true);
    jenisPembayaranSelect.removeAttribute("readonly", true);

    noPelunasanSelect.removeAttribute("readonly", true);
    namaCustomerSelect.focus();

    cust = 2;
    proses = 2;
    koreksi();
});

function koreksi() {
    fetch("/getCustIsi/")
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

            fetch("/getListPelunasan/" + idCustomer.value)
            .then((response) => response.json())
            .then((options) => {
                console.log(options);
                noPelunasanSelect.innerHTML = "";

                const defaultOption = document.createElement("option");
                defaultOption.disabled = true;
                defaultOption.selected = true;
                defaultOption.innerText = "Pilih Cust";
                noPelunasanSelect.appendChild(defaultOption);

                options.forEach((entry) => {
                    const option = document.createElement("option");
                    option.value = entry.Id_Pelunasan; // Gunakan entry.IdCust sebagai nilai opsi
                    option.innerText = entry.Id_Pelunasan + "|" + entry.Nilai_Pelunasan; // Gunakan entry.IdCust dan entry.NamaCust untuk teks opsi
                    noPelunasanSelect.appendChild(option);
                });
            });
            noPelunasanSelect.addEventListener("change", function (event) {
                event.preventDefault();
                const selectedOption = noPelunasanSelect.options[noPelunasanSelect.selectedIndex];
                if (selectedOption) {
                    const selectedValue = selectedOption.textContent; // Atau selectedOption.innerText
                    const bagiansatu = selectedValue.split(/[-|]/);
                    const jenis = bagiansatu[0];
                    IdPelunasan.value = jenis;

                    Id_Pelunasan.value = IdPelunasan.value.replace(/\//g, '.');
                };

                fetch("/getDataPelunasanTagihan/" + Id_Pelunasan.value)
                .then((response) => response.json())
                .then((options) => {
                    console.log(options);

                    options.forEach((option) => {
                        //Ambil nilai Tgl_Order dari setiap objek data
                        const tglInput = option.Tgl_Pelunasan;
                        const [tanggal, waktu] = tglInput.split(" ");
                        option.Tgl_Pelunasan = tanggal;
                        tanggalInput.value = tanggal;
                    });

                    idJenisPembayaran.value = options[0].Id_Jenis_Bayar;

                    let UM = idJenisPembayaran.value;
                    let opt = jenisPembayaranSelect.options;
                    for (let i = 0; i < opt.length; i++) {
                        if (opt[i].value == UM) {
                            jenisPembayaranSelect.selectedIndex = i;
                            break;
                        }
                    };

                    idMataUang.value = options[0].Id_MataUang;

                    let MU = idMataUang.value;
                    let opt2 = mataUangSelect.options;
                    for (let i = 0; i < opt2.length; i++) {
                        if (opt2[i].value == MU) {
                            mataUangSelect.selectedIndex = i;
                            break;
                        }
                    };
                    nilaiPiutang.value = options[0].Nilai_Pelunasan;
                    buktiPelunasan.value = options[0].No_Bukti;
                    sUser = options[0].UserInput;

                });

                fetch("/LihatDetailPelunasan/" + Id_Pelunasan.value)
                .then((response) => response.json())
                .then((options) => {
                    console.log(options);
                    if ($.fn.DataTable.isDataTable("#tabelPelunasanPenjualan")) {
                        tabelPelunasanPenjualan.destroy();
                    }
                    tabelPelunasanPenjualan = $("#tabelPelunasanPenjualan").DataTable({
                        data: options,
                        columns: [
                            { title: "Id. Penagihan", data: "ID_Penagihan" },
                            { title: "Nilai Pelunasan", data: "Nilai_Pelunasan" },
                            { title: "Biaya", data: "Biaya" },
                            { title: "Lunas", data: "Lunas" },
                            { title: "Id. Detail Pelunasan", data: "ID_Detail_Pelunasan" },
                            { title: "Pelunasan Rupiah", data: "Pelunasan_Rupiah" },
                            { title: "Mata Uang", data: "Id_MataUang" },
                            { title: "Pelunasan Currency", data: "Pelunasan_Curency" },
                            { title: "Kurang Lebih", data: "KurangLebih" },
                            { title: "Perkiraan", data: "Kode_Perkiraan" },
                            { title: "ID_Tagihan_Pembulatan", data: "ID_Penagihan_Pembulatan" }
                        ]
                    });

                    totalPelunasan.value = totalPelunasan.value + parseFloat(options[0].Nilai_Pelunasan);
                    totalBiaya.value = totalBiaya.value + parseFloat(options[0].Biaya);
                    kurangLebih.value = kurangLebih.value + parseFloat(options[0].KurangLebih);
                    nilaiMasukKas.value = nilaiPiutang.value - nilaiBiaya.value + parseFloat(kurangLebih.value);
                });

                // fetch("/getCekReferensiPelunasan/" + Id_Pelunasan.value)
                // .then((response) => response.json())
                // .then((options) => {
                //     console.log(options);

                //     idReferensi.value = options[0].IdReferensi;
                // })
            });
        }
    })
};

btnHapus.addEventListener('click', function(event) {
    event.preventDefault();

    btnIsi.style.display = "none";
    btnSimpan.style.display = "block";
    btnKoreksi.style.display = "none";
    btnBatal.style.display = "block";

    namaCustomerSelect.removeAttribute("readonly", true);
    mataUangSelect.removeAttribute("readonly", true);
    informasiBankSelect.removeAttribute("readonly", true);
    nilaiPiutang.removeAttribute("readonly", true);
    jenisPembayaranSelect.removeAttribute("readonly", true);

    noPelunasanSelect.removeAttribute("readonly", true);
    namaCustomerSelect.focus();

    koreksi();
    proses = 3;
    cust = 3;
})




