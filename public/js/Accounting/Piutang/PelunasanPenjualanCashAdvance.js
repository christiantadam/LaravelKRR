let tanggalInput = document.getElementById('tanggalInput');
let noPelunasanSelect = document.getElementById('noPelunasanSelect');
let informasiBankSelect = document.getElementById('informasiBankSelect');
let namaCustomerSelect = document.getElementById('namaCustomerSelect');
let mataUangSelect = document.getElementById('mataUangSelect');
let nilaiMasukKas = document.getElementById('nilaiMasukKas');
let nilaiPelunasan = document.getElementById('nilaiPelunasan');
let jenisPembayaranSelect = document.getElementById('jenisPembayaranSelect');
let idBKM = document.getElementById('idBKM');
let sisaPelunasan = document.getElementById('sisaPelunasan');
let tabelPelunasanPenjualan = $('#tabelPelunasanPenjualan').DataTable();
let sUser;
let totalPemakaian = document.getElementById('totalPemakaian');
let kurangLebih = document.getElementById('kurangLebih');
let totalBiaya = document.getElementById('totalBiaya');
let sTotalKembalian;

//HIDDEN
let idCustomer = document.getElementById('idCustomer');
let namaCustomer = document.getElementById('namaCustomer');
let noPelunasan = document.getElementById('noPelunasan');
let idJenisPembayaran = document.getElementById('idJenisPembayaran');
let arrayData = document.getElementById('arrayData');

let tabelIdDetailPelunasan = document.getElementById('tabelIdDetailPelunasan');
let tabelIdPenagihan = document.getElementById('tabelIdPenagihan');
let tabelNilaiPelunasan = document.getElementById('tabelNilaiPelunasan');
let tabelPelunasanRupiah = document.getElementById('tabelPelunasanRupiah');
let tabelMataUang = document.getElementById('tabelMataUang');
let tabelBiaya = document.getElementById('tabelBiaya');
let tabelLunas = document.getElementById('tabelLunas');
let tabelPelunasanCurrency = document.getElementById('tabelPelunasanCurrency');
let tabelKurangLebih = document.getElementById('tabelKurangLebih');
let tabelKodePerkiraan = document.getElementById('tabelKodePerkiraan');
let tabelKurs = document.getElementById('tabelKodePerkiraan');
let tabelIdDetail = document.getElementById('tabelIdDetail');

//MODAL
let totalKembalian = 0;
let noPenagihan = document.getElementById('noPenagihan');
let noPen = document.getElementById('noPen');
let no_Pen = document.getElementById('no_Pen');
let nilaiPenagihan = document.getElementById('nilaiPenagihan');
let mataUangPenagihan = document.getElementById('mataUangPenagihan');
let nilaiKurs = document.getElementById('nilaiKurs');
let terbayar = document.getElementById('terbayar');
let terbayarRupiah = document.getElementById('terbayarRupiah');
let pelunasanCurrency = document.getElementById('pelunasanCurrency');
let pelunasanRupiah = document.getElementById('pelunasanRupiah');
let nilai_Pelunasan = document.getElementById('nilai_Pelunasan');
let sisa = document.getElementById('sisa');
let sisaRupiah = document.getElementById('sisaRupiah');
let kodePerkiraanSelect = document.getElementById('kodePerkiraanSelect');
let idKodePerkiraan = document.getElementById('idKodePerkiraan');
let nilaiBiaya = document.getElementById('nilaiBiaya');
let nilaiKurangLebih = document.getElementById('nilaiKurangLebih');
let noPenagihan1 = document.getElementById('noPenagihan1');
let lunas = document.getElementById('lunas');
let namaMU = document.getElementById('namaMU');

let btnSimpanModal = document.getElementById('btnSimpanModal');

let matauang;
let matauang2;
let sNilai_Pelunasan = 0;
let sBiaya = 0;
let sKurangLebih = 0;
let sPelunasan_Rupiah = 0;
let sPelunasan_curency = 0;
let listHapus = [];
let listHapusPenagihan = [];
let proses;
var selectedRows = [];
let listData = [];

let btnAddItem = document.getElementById('btnAddItem');
let btnEditItem = document.getElementById('btnEditItem');
let btnDeleteItem = document.getElementById('btnDeleteItem');
let btnSimpan = document.getElementById('btnSimpan');
let btnIsi = document.getElementById('btnIsi');
let btnBatal = document.getElementById('btnBatal');
let btnKeluar = document.getElementById('btnKeluar');

const tanggalPenagihan = new Date();
const formattedDate2 = tanggalPenagihan.toISOString().substring(0, 10);
tanggalInput.value = formattedDate2;

btnIsi.addEventListener('click', function(event) {
    event.preventDefault();

    btnIsi.style.display = "none";
    btnSimpan.style.display = "block";
    btnKeluar.style.display = "none";
    btnBatal.style.display = "block";

    tanggalInput.removeAttribute("readonly");
    namaCustomerSelect.removeAttribute("readonly");
    noPelunasanSelect.removeAttribute("readonly");
    jenisPembayaranSelect.removeAttribute("readonly");
    informasiBankSelect.removeAttribute("readonly");
    nilaiMasukKas.removeAttribute("readonly");
    nilaiPelunasan.removeAttribute("readonly");
    jenisPembayaranSelect.removeAttribute("readonly");
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
    // TampilCust();
});

btnBatal.addEventListener('click', function (event) {
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
    idBKM.value = "";
    tabelPelunasanPenjualan.clear().draw();
    totalPemakaian.value = "";
    totalBiaya.value = "";
    kurangLebih.value = "";
})

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
        const namaMtUang = selectedValue.split("|")[1];
        idMataUang.value = idMU;
        namaMU.value = namaMtUang;
    };
});

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
});


let idsebelum;
fetch("/getCustIsiCashAdvance/")
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
            option.value = entry.ID_Cust; // Gunakan entry.Id_Pelunasan sebagai nilai opsi
            option.innerText = entry.ID_Cust + "|" + entry.NamaCust; // Gunakan entry.IdCust dan entry.NamaCust untuk teks opsi
            namaCustomerSelect.appendChild(option);
        });


        // options.forEach((entry) => {
        //     const option = document.createElement("option");

        //     // if (idsebelum != entry.ID_Cust) {
        //         option.value  = entry.ID_Cust;
        //         idsebelum = option.value;
        //         option.innerText = entry.ID_Cust + "|" + entry.NamaCust; // Gunakan entry.IdCust dan entry.NamaCust untuk teks opsi
        //         namaCustomerSelect.appendChild(option);
        //     // }
        //     // Gunakan entry.IdCust sebagai nilai opsi
        // });
    });
    namaCustomerSelect.addEventListener("change", function (event) {
        event.preventDefault();
        const selectedOption = namaCustomerSelect.options[namaCustomerSelect.selectedIndex];
        if (selectedOption) {
            const selectedValue = selectedOption.textContent; // Atau selectedOption.innerText
            const bagiansatu = selectedValue.split(/[-|]/);
            const idcust = bagiansatu[0];
            const nama = bagiansatu[1];
            idCustomer.value = idcust;
            namaCustomer.value  = nama;
        }

        fetch("/getNoPelunasanCashAdvance/" + idCustomer.value)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);
            noPelunasanSelect.innerHTML = "";

            const defaultOption = document.createElement("option");
            defaultOption.disabled = true;
            defaultOption.selected = true;
            defaultOption.innerText = "Pilih No. Pelunasan";
            noPelunasanSelect.appendChild(defaultOption);

            options.forEach((entry) => {
                const option = document.createElement("option");
                option.value = entry.Id_Pelunasan; // Gunakan entry.Id_Pelunasan sebagai nilai opsi
                option.innerText = entry.Id_Pelunasan + "|" + entry.Nilai_Pelunasan; // Gunakan entry.IdCust dan entry.NamaCust untuk teks opsi
                noPelunasanSelect.appendChild(option);
            });

            noPelunasanSelect.addEventListener("change", function (event) {
                event.preventDefault();
                const selectedOption = noPelunasanSelect.options[noPelunasanSelect.selectedIndex];
                if (selectedOption) {
                    const selectedValue = selectedOption.textContent; // Atau selectedOption.innerText
                    const bagiansatu = selectedValue.split(/[-|]/);
                    const idpen = bagiansatu[0];
                    noPelunasan.value = idpen;
                }
                fetch("/LihatHeaderPelunasanCashAdvance/" + noPelunasan.value)
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

                    tanggalInput.value = options[0].Tgl_Pelunasan;
                    idJenisPembayaran.value = options[0].Id_Jenis_Bayar;
                    let JP = idJenisPembayaran.value;
                    let opt2 = jenisPembayaranSelect.options;
                    for (let i = 0; i < opt2.length; i++) {
                        if (opt2[i].value == JP) {
                            jenisPembayaranSelect.selectedIndex = i;
                            break;
                        }
                    };

                    idMataUang.value = options[0].Id_MataUang;
                    let MU = idMataUang.value;
                    let opt = mataUangSelect.options;
                    for (let i = 0; i < opt.length; i++) {
                        if (opt[i].value == MU) {
                            mataUangSelect.selectedIndex = i;
                            break;
                        }
                    };
                    nilaiPelunasan.value = options[0].Nilai_Pelunasan;
                    idBKM.value = options[0].ID_BKM;
                    sisaPelunasan.value = options[0].SaldoPelunasan;
                });
                fetch("/LihatDetailPelunasanCashAdvance/" + noPelunasan.value)
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
                            { title: "Kurs", data: "Kurs" },
                            { title: "ID_Tagihan_Pembulatan", data: "ID_Penagihan_Pembulatan" }
                        ]
                    });
                    totalPemakaian.value = totalPemakaian.value + parseFloat(options[0].Nilai_Pelunasan);
                    totalBiaya.value = totalBiaya.value + parseFloat(options[0].Biaya);
                    kurangLebih.value = kurangLebih.value + parseFloat(options[0].KurangLebih);

                    const rowCount = tabelPelunasanPenjualan.rows().count();
                    if (rowCount == 0) {
                        nilaiMasukKas.value = nilaiPelunasan.value;
                    } else {
                        nilaiMasukKas.value = nilaiPelunasan.value - totalBiaya.value + kurangLebih.value;
                    }
                })
            });
            btnAddItem.focus();
        })
});

$("#tabelPelunasanPenjualan tbody").off("click", "tr");
$("#tabelPelunasanPenjualan tbody").on("click", "tr", function () {
    let checkSelectedRows = $("#tabelPelunasanPenjualan tbody tr.selected");

    if (checkSelectedRows.length > 0) {
        // Remove "selected" class from previously selected rows
        checkSelectedRows.removeClass("selected");
    }
    $(this).toggleClass("selected");
    selectedRows = tabelPelunasanPenjualan.rows(".selected").data().toArray();
    console.log(selectedRows[0]);

    tabelIdDetailPelunasan.value = selectedRows[0].ID_Detail_Pelunasan;
    tabelIdPenagihan.value = selectedRows[0].ID_Penagihan;
    tabelNilaiPelunasan.value = selectedRows[0].Nilai_Pelunasan;
    tabelPelunasanRupiah.value = selectedRows[0].Pelunasan_Rupiah;
    tabelMataUang.value = selectedRows[0].Id_MataUang;
    tabelBiaya.value = selectedRows[0].Biaya;
    tabelLunas.value = selectedRows[0].Lunas;
    tabelPelunasanCurrency.value = selectedRows[0].Pelunasan_Curency;
    tabelKurangLebih.value = selectedRows[0].KurangLebih;
    tabelKodePerkiraan.value = selectedRows[0].Kode_Perkiraan;
    tabelKurs.value = selectedRows[0].Kurs;
    tabelIdDetail.value = selectedRows[0].ID_Penagihan_Pembulatan;
});

btnAddItem.addEventListener('click', function (event) {
    event.preventDefault();
    modalLihatPenagihan = $("#modalLihatPenagihan");
    modalLihatPenagihan.modal('show');
    proses = 1;
});

function handleRadioChange() {
    var selectedValue = document.querySelector('input[name="radiogrup1"]:checked').value;
    kodePerkiraanSelect.removeAttribute("readonly", true);

    // Cek nilai yang terpilih dan lakukan sesuatu berdasarkan nilai tersebut
    if (selectedValue === "1") {
        noPenagihan.removeAttribute("readonly", true);
        nilaiPenagihan.removeAttribute("readonly", true);
        nilaiKurs.removeAttribute("readonly", true);
        nilai_Pelunasan.removeAttribute("readonly", true);
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

            }

            fetch("/getLihat_PenagihanCashAdvance/" + no_Pen.value)
            .then((response) => response.json())
            .then((options) => {
                console.log(options);

                sTotalKembalian = options[0].TotalKembalian;
            });

            fetch("/getLihat_PenagihanCashAdvance2/" + no_Pen.value)
            .then((response) => response.json())
            .then((options) => {
                console.log(options);

                nilaiPenagihan.value = options[0].Nilai_Penagihan;
                nilaiPenagihan.value = nilaiPenagihan.value - sTotalKembalian;
                mataUangPenagihan.value = options[0].Nama_MataUang;
                nilaiKurs.value = options[0].NilaiKurs;

                if (options[0].Tot_Pelunasan_Rupiah == null) {
                    terbayar.value = 0;
                    terbayarRupiah.value = 0;
                } else {
                    const rowCount = tabelPelunasanPenjualan.rows().count();
                    if (rowCount >= 1) {
                        // if (condition) {

                        // }else {
                        //     terbayarRupiah.value = options[0].Tot_Pelunasan_Rupiah - pelunasanRupiah.value;
                        //     terbayar.value = options[0].Tot_Nilai_Pelunasan - pelunasanCurrency.value;
                        // }
                    } else {
                        terbayarRupiah.value = options[0].Tot_Pelunasan_Rupiah;
                        terbayar.value = options[0].Tot_Nilai_Pelunasan;
                    }

                    if (nilai_Pelunasan.value == 0) {
                        nilai_Pelunasan.value = nilai_Pelunasan.value - totalPemakaian.value;
                    }
                    sisa.value = nilaiPenagihan.value - terbayar.value;
                    sisaRupiah.value = (nilaiPenagihan.value * nilaiKurs.value) - (terbayar.value - nilaiKurs.value)
                    sisa.value = parseFloat(sisa.value).toFixed(2).replace(/\d(?=(\d{10})+\.)/g, '$&,');
                    sisaRupiah.value = parseFloat(sisaRupiah.value).toFixed(2).replace(/\d(?=(\d{10})+\.)/g, '$&,');
                }
            });
            nilai_Pelunasan.focus();

            nilai_Pelunasan.addEventListener("keypress", function(event) {
                if (event.key == "Enter") {
                    event.preventDefault();
                    matauang = mataUangPenagihan.value.trim().toUpperCase();
                    matauang2 = namaMU.value.trim().toUpperCase();
                    if (matauang !== matauang2) {
                        if (matauang !== "RUPIAH" && idMataUang.value == 1) {
                            pelunasanCurrency.value = jumlahYangDibayar.value / nilaiKurs.value;
                            pelunasanRupiah.value = jumlahYangDibayar.value;
                        } else {
                            pelunasanCurrency.value = nilai_Pelunasan.value * nilaiKurs.value;
                            pelunasanRupiah.value = pelunasanCurrency.value;
                        }
                    } else {
                        if (idMataUang != 1) {
                            pelunasanRupiah.value = nilai_Pelunasan.value * nilaiKurs.value;
                        } else {
                            pelunasanRupiah.value = nilai_Pelunasan.value;
                        }
                        pelunasanCurrency.value = nilai_Pelunasan.value;
                    }
                }
                pelunasanCurrency.focus();
            });
            pelunasanCurrency.addEventListener("keypress", function(event) {
                if (event.key == "Enter") {
                    event.preventDefault();
                    kodePerkiraanSelect.focus();
                }
            });
        })
    }
};

var radioButtons = document.querySelectorAll('input[name="radiogrup1"]');
radioButtons.forEach(function (radioButton) {
    radioButton.addEventListener('change', handleRadioChange);
});

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

btnEditItem.addEventListener('click', function (event) {
    event.preventDefault();
    proses = 2;
    const rowCount = tabelPelunasanPenjualan.rows().count();
    console.log(selectedRows[0]);
    if (rowCount > 1) {
        modalLihatPenagihan = $("#modalLihatPenagihan");
        modalLihatPenagihan.modal('show');
        idKodePerkiraan.value = selectedRows[0].Kode_Perkiraan;

        let KD = idKodePerkiraan.value;
        let opt3 = kodePerkiraanSelect.options;
        for (let i = 0; i < opt3.length; i++) {
            if (opt3[i].value == KD) {
                kodePerkiraanSelect.selectedIndex = i;
                break;
            }
        };

        if(selectedRows[0].Nilai_Pelunasan == 0) {
            if (selectedRows[0].Biaya != 0) {
                var radiobutton = document.querySelector('input[type="radio"][value="2"]');
                // Memeriksa apakah elemen radiobutton ada dan bukan null
                if (radiobutton) {
                    radiobutton.checked = true; // Mencentang radiobutton dengan value 2
                }

                nilaiBiaya.value = selectedRows[0].Biaya;
                sBiaya = nilaiBiaya.value;
                nilaiBiaya.focus();
            } else {
                nilaiKurangLebih.value = selectedRows[0][8];
                sKurangLebih = nilaiKurangLebih.value;
                console.log("masuk value 3");
                var radiobutton = document.querySelector('input[type="radio"][value="3"]');

                // Memeriksa apakah elemen radiobutton ada dan bukan null
                if (radiobutton) {
                    radiobutton.checked = true; // Mencentang radiobutton dengan value 3
                }
                nilaiKurangLebih.focus();
            }
        } else {
            noPenagihan.setAttribute("readonly", true);
            noPen.value = selectedRows[0].ID_Penagihan;
            let NP = noPen.value;
            let opt4 = noPenagihan.options;
            for (let i = 0; i < opt4.length; i++) {
                if (opt4[i].value == NP) {
                    noPenagihan.selectedIndex = i;
                    break;
                }
            };
            lunas.value = selectedRows[0].Lunas;
            nilai_Pelunasan.value = selectedRows[0].Nilai_Pelunasan;
            pelunasanRupiah.value = selectedRows[0].Pelunasan_Rupiah;
            pelunasanCurrency.value = selectedRows[0].Pelunasan_Curency;
            var radiobutton = document.querySelector('input[type="radio"][value="1"]');

            // Memeriksa apakah elemen radiobutton ada dan bukan null
            if (radiobutton) {
                radiobutton.checked = true; // Mencentang radiobutton dengan value 1
            }

            sNilai_Pelunasan = nilai_Pelunasan.value;
            sPelunasan_Rupiah = pelunasanRupiah.value;
            sPelunasan_curency = pelunasanCurrency.value;
            nilai_Pelunasan.focus();
        }
    }
});

btnDeleteItem.addEventListener('click', function(event) {
    event.preventDefault();
    console.log(selectedRows[0]);
    const rowCount = tabelPelunasanPenjualan.rows().count();
    if (rowCount > 1) {
        console.log(selectedRows[0].Biaya);
        totalPemakaian.value = totalPemakaian.value - selectedRows[0].Biaya;

        if (selectedRows[0].ID_Detail_Pelunasan != "") {
            listHapus.push(selectedRows[0].ID_Detail_Pelunasan);
            listHapusPenagihan.push(selectedRows[0].ID_Penagihan);
            // console.log("List hapus: ",listHapus);
        }
        const selectedRow = $("#tabelPelunasanPenjualan tbody tr.selected");
        selectedRow.remove();
    }
});

btnSimpanModal.addEventListener('click', function(event) {
    event.preventDefault();
    console.log(selectedRows[0]);
    if (proses == 1) {
        var selectedValue = document.querySelector('input[name="radiogrup1"]:checked').value;
        // console.log("Harusnya jalan memilih Pelunasan", selectedValue);
        if (selectedValue != "1" && selectedValue != "2" && selectedValue != "3") {
            alert("Tidak Ada Yang DiSimpan !!");
        }

        if (selectedValue == "1" && nilai_Pelunasan.value <= 0) {
            alert("Nilai Pelunasan Harus Diisi");
            nilai_Pelunasan.focus();
        } else if (selectedValue == "2" && nilaiBiaya.value <= 0) {
            alert("Nilai Biaya Harus Diisi");
        } else if (selectedValue == "3" && nilaiKurangLebih.value == 0) {
            alert("Nilai Kurang/Lebih Harus Diisi");
        };

        if ((lunas.value === "" || lunas.value === " " || (lunas.value.toUpperCase() != "Y" && lunas.value.toUpperCase() != "N"))
        && selectedValue === 1) {
            alert("Salah Input Kolom Lunas");
            lunas.focus();
        };

        const rowCount = tabelPelunasanPenjualan.rows().count();
        if (rowCount == 0) {
            totalPelunasan.value = totalPelunasan.value + nilaiPiutang.value;
            totalBiaya.value = totalBiaya.value + nilaiBiaya.value;
            kurangLebih.value = kurangLebih.value + nilaiKurangLebih.value;

            var inputData = {
                ID_Penagihan: noPen.value,
                Nilai_Pelunasan: nilai_Pelunasan.value,
                Biaya: nilaiBiaya.value,
                Lunas: lunas.value.toUpperCase(),
                ID_Detail_Pelunasan: "",
                Pelunasan_Rupiah: pelunasanRupiah.value,
                Id_MataUang: mataUangPenagihan.value,
                Pelunasan_Curency: pelunasanCurrency.value,
                KurangLebih: nilaiKurangLebih.value,
                Kode_Perkiraan: idKodePerkiraan.value,
                Kurs: nilaiKurs.value,
                ID_Penagihan_Pembulatan: noPen1.value
            };
            tabelPelunasanPenjualan.row.add(inputData).draw();
        } else {
            totalPemakaian.value = totalPemakaian.value - sNilai_Pelunasan + nilai_Pelunasan.value;
            totalBiaya.value = totalBiaya.value - sBiaya + nilaiBiaya.value;
            kurangLebih.value = kurangLebih.value - sKurangLebih + nilaiKurangLebih.value;

            console.log(selectedRows[0]);
            var inputData = {
                ID_Penagihan: noPen.value,
                Nilai_Pelunasan: nilai_Pelunasan.value,
                Biaya: nilaiBiaya.value,
                Lunas: lunas.value.toUpperCase(),
                ID_Detail_Pelunasan: "",
                Pelunasan_Rupiah: pelunasanRupiah.value,
                Id_MataUang: mataUangPenagihan.value,
                Pelunasan_Curency: pelunasanCurrency.value,
                KurangLebih: nilaiKurangLebih.value,
                Kode_Perkiraan: idKodePerkiraan.value,
                Kurs: nilaiKurs.value,
                ID_Penagihan_Pembulatan: noPen1.value
            };
            tabelPelunasanPenjualan.row.add(inputData).draw();
        }
        /////let noPenagihan = document.getElementById('noPenagihan');
        noPenagihan.selectedIndex = 0;
        noPen.value = "";
        no_Pen.value = "";
        nilaiPenagihan.value = "";
        mataUangPenagihan.value = "";
        nilaiKurs.value = "";
        terbayar.value = "";
        terbayarRupiah.value = "";
        pelunasanCurrency.value = "";
        pelunasanRupiah.value = "";
        nilai_Pelunasan.value = "";
        sisa.value = "";
        kodePerkiraanSelect.selectedIndex = 0;
        idKodePerkiraan.value = "";
        nilaiBiaya.value = "";
        nilaiKurangLebih.value = "";
        noPenagihan1.selectedIndex = 0;
        lunas.value = "";
        sisaRupiah.value = "";

    } else if (proses == 2) {
        const noPenEdit = noPen.value;
        const nilai_PelunasanEdit = nilai_Pelunasan.value;
        const lunasEdit = lunas.value;
        const biayaEdit = nilaiBiaya.value;
        const pelunasanRupiahEdit = pelunasanRupiah.value;
        const mataUangEdit = mataUangPenagihan.value;
        const pelunasanCurrencyEdit = pelunasanCurrency.value;
        const kurangLebihEdit = nilaiKurangLebih.value;
        const kodePerkiraanEdit = idKodePerkiraan.value;
        const kursEdit = nilaiKurs.value;
        const idPenagihanPembulatanEdit = noPen1.value;

        const selectedRow = tabelPelunasanPenjualan.row(selectedRows[0]);
        selectedRow.data({
            'Id. Penagihan': noPenEdit,
            'Nilai Pelunasan': nilai_PelunasanEdit,
            'Biaya': biayaEdit,
            'Lunas': lunasEdit,
            'Id.Detail Pelunasan': "",
            'Pelunasan Rupiah': pelunasanRupiahEdit,
            'Mata Uang': mataUangEdit,
            'Pelunasan Currency': pelunasanCurrencyEdit,
            'Kurang Lebih': kurangLebihEdit,
            'Perkiraan': kodePerkiraanEdit,
            'Kurs': kursEdit,
            'ID_Tagihan_Pembulatan': idPenagihanPembulatanEdit
        }).draw();
    }
    $('#modalLihatPenagihan').modal('hide');
});

btnSimpan.addEventListener('click', function(event) {
    event.preventDefault();

    var data = tabelPelunasanPenjualan.rows().data();
    var listData = [];

    data.each(function(value, index) {
        console.log(value);
        listData.push({
            tabelIdDetailPelunasan: value.ID_Detail_Pelunasan,
            noPelunasan: noPelunasan.value,
            tabelIdPenagihan: value.ID_Penagihan,
            tabelNilaiPelunasan: value.Nilai_Pelunasan,
            tabelPelunasanRupiah: value.Pelunasan_Rupiah,
            tabelMataUang: idMataUang.value,
            tabelBiaya: value.Biaya,
            tabelLunas: value.Lunas,
            tabelPelunasanCurrency: value.Pelunasan_Curency,
            tabelKurangLebih: value.KurangLebih,
            tabelKodePerkiraan: value.Kode_Perkiraan,
            tabelKurs: value.Kurs,
            tabelIdDetail: value.ID_Penagihan_Pembulatan
        });
    });

    document.getElementById('listDataInput').value = JSON.stringify(listData);
    document.getElementById('arrayData').value = JSON.stringify(listData);

    console.log(listData);
    const rowCount = tabelPelunasanPenjualan.rows().count();
    if (rowCount > 0) {
        formkoreksi.submit();
    }
});

