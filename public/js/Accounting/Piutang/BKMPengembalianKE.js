let tanggal = document.getElementById('tanggal');
let namaCustomerSelect = document.getElementById('namaCustomerSelect');
let idCustomer = document.getElementById('idCustomer');
let mataUangBKMSelect = document.getElementById('mataUangBKMSelect');
let idMataUangBKM = document.getElementById('idMataUangBKM');
let namaBankBKMSelect = document.getElementById('namaBankBKMSelect');
let idBankBKM = document.getElementById('idBankBKM');
let jenisBankBKM = document.getElementById('jenisBankBKM');
let jenisPembayaranBKMSelect = document.getElementById('jenisPembayaranBKMSelect');
let idJenisPembayaranBKM = document.getElementById('idJenisPembayaranBKM');
let kodePerkiraanBKMSelect = document.getElementById('kodePerkiraanBKMSelect');
let idKodePerkiraanBKM = document.getElementById('idKodePerkiraanBKM');
let jumlahUangBKM = document.getElementById('jumlahUangBKM');
let kurs = document.getElementById('kurs');
let uraianBKM = document.getElementById('uraianBKM');
let idBKM = document.getElementById('idBKM');

let btnProses = document.getElementById('btnProses');
let btnBatal = document.getElementById('btnBatal');
let btnTampilBKM = document.getElementById('btnTampilBKM');
let btnTampilBKK = document.getElementById('btnTampilBKK');

let namaMU;
let namaBank;
let namaJenisPemb;
let total2;
let total1;

let btnCetakBKM = document.getElementById('btnCetakBKM');
let btnCetakBKK = document.getElementById('btnCetakBKK');

//CARD BKK
let idBKK = document.getElementById('idBKK');
let mataUangBKK = document.getElementById('mataUangBKK');
let jumlahUangBKK = document.getElementById('jumlahUangBKK');
let namaBankBKK = document.getElementById('namaBankBKK');
let jenisPembayaranBKK = document.getElementById('jenisPembayaranBKK');
let kodePerkiraanBKKSelect = document.getElementById('kodePerkiraanBKKSelect');
let idKodePerkiraanBKK = document.getElementById('idKodePerkiraanBKK');
let uraianBKK = document.getElementById('uraianBKK');

//MODAL TAMPIL BKM
let idBKMTampil = document.getElementById('idBKMTampil');
let btnOkTampilBKM = document.getElementById('btnOkTampilBKM');
let tanggalTampilBKM = document.getElementById('tanggalTampilBKM');
let tanggalTampilBKM2 = document.getElementById('tanggalTampilBKM2');
let tabelTampilBKM = document.getElementById('tabelTampilBKM');

//MODAL TAMPIL BKK
let idBKKTampil = document.getElementById('idBKKTampil');
let btnOkTampilBKK = document.getElementById('btnOkTampilBKK');
let tanggalTampilBKK = document.getElementById('tanggalTampilBKK');
let tanggalTampilBKK2 = document.getElementById('tanggalTampilBKK2');
let tabelTampilBKK = document.getElementById('tabelTampilBKK');

//HIDDEN INPUT
let nilai1 = document.getElementById('nilai1');
let nilai = document.getElementById('nilai');
let konversi = document.getElementById('konversi');
let konversi1 = document.getElementById('konversi1');
let id_bkm = document.getElementById('id_bkm');
let id_bkk = document.getElementById('id_bkk');
let idPembayaran = document.getElementById('idPembayaran');
let bulan = document.getElementById('bulan');
let tahun = document.getElementById('tahun');

let methodTampilBKKKE = document.getElementById('methodTampilBKKKE');
let formTampilBKKKE = document.getElementById('formTampilBKKKE');
let methodTampilBKMKE = document.getElementById('methodTampilBKMKE');
let formTampilBKMKE = document.getElementById('formTampilBKMKE');


let nomer = document.getElementById('nomer');
let tglCetak = document.getElementById('tglCetak');
let symbol = document.getElementById('symbol');
let terbilangCetak = document.getElementById('terbilangCetak');
let jumlahDiterima = document.getElementById('jumlahDiterima');
let kodePerkiraanCetak = document.getElementById('kodePerkiraanCetak');
let jumlah = document.getElementById('jumlah');
let rincianPenerimaan = document.getElementById('rincianPenerimaan');
let tglCetakForm = document.getElementById('tglCetakForm');
let grandTotal = document.getElementById('grandTotal');
let symbol2 = document.getElementById('symbol2');

const tgl = new Date();
const formattedDate = tgl.toISOString().substring(0, 10);
tanggal.value = formattedDate;

const tglTampilBKM = new Date();
const formattedDate3 = tglTampilBKM.toISOString().substring(0, 10);
tanggalTampilBKM.value = formattedDate3;

const tglTampilBKM2 = new Date();
const formattedDate4 = tglTampilBKM2.toISOString().substring(0, 10);
tanggalTampilBKM2.value = formattedDate4;

const tglTampilBKK = new Date();
const formattedDate5 = tglTampilBKK.toISOString().substring(0, 10);
tanggalTampilBKK.value = formattedDate5;

const tglTampilBKK2 = new Date();
const formattedDate6 = tglTampilBKK2.toISOString().substring(0, 10);
tanggalTampilBKK2.value = formattedDate6;

tanggal.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();

        var tanggalInput = new Date(tanggal.valueAsNumber);
        var currentDate = new Date();
        if (tanggalInput > currentDate) {
            alert("Tanggal SALAH!");
        } else {
            namaCustomerSelect.focus();
        }

        const dateObject = new Date(tanggal.value);

        // Get month and year separately
        bulan.value = dateObject.getMonth() + 1; // +1 karena bulan dimulai dari 0 (Januari) - 11 (Desember)
        tahun.value = dateObject.getFullYear();

        console.log('Bulan:', bulan.value);
        console.log('Tahun:', tahun.value);

        // rowData['bulan'] = bulan.value;
        // rowData['tahun'] = tahun.value;
    }
});

//#region ambil list customer
fetch("/getcustomer/")
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
        const idcust = bagiansatu[1];
        namacust = bagiansatu[2];
        idCustomer.value = idcust;
    }
});
//#endregion

//#region untuk ambil list mata uang untuk BKM
fetch("/getmatauang/")
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        mataUangBKMSelect.innerHTML="";

        const defaultOption = document.createElement("option");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.innerText = "Mata Uang";
        mataUangBKMSelect.appendChild(defaultOption);

        options.forEach((entry) => {
            const option = document.createElement("option");
            option.value = entry.Id_MataUang;
            option.innerText = entry.Id_MataUang + "|" + entry.Nama_MataUang;
            mataUangBKMSelect.appendChild(option);
        });
});

mataUangBKMSelect.addEventListener("change", function (event) {
    event.preventDefault();
    const selectedOption = mataUangBKMSelect.options[mataUangBKMSelect.selectedIndex];
    if (selectedOption) {
        const idKodeInput = document.getElementById('idMataUangBKM');
        const selectedValue = selectedOption.textContent;
        const idMU = selectedValue.split("|")[0];
        namaMU = selectedValue.split("|")[1];
        idKodeInput.value = idMU;
        //console.log(namaMU);
    }
});
//#endregion

mataUangBKMSelect.addEventListener('click', function(event) {
    event.preventDefault();
    if (idMataUangBKM.value == '1') {
        kurs.setAttribute("readonly", true);
    } else {
        kurs.removeAttribute("readonly");
    }
})

//#region ambil list bank untuk bkm
fetch("/getbank/")
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        namaBankBKMSelect.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.innerText = "Bank";
        namaBankBKMSelect.appendChild(defaultOption);

        options.forEach((entry) => {
            const option = document.createElement("option");
            option.value = entry.Id_Bank;
            option.innerText = entry.Id_Bank + "|" + entry.Nama_Bank;
            namaBankBKMSelect.appendChild(option);
        });

});

namaBankBKMSelect.addEventListener("change", function (event) {
    event.preventDefault();
    // console.log(idBank.value);
    const selectedOption = namaBankBKMSelect.options[namaBankBKMSelect.selectedIndex];
    if (selectedOption) {
        //const idJenisInput = document.getElementById('idBank');
        const selectedValue = selectedOption.textContent; // Nilai dari opsi yang dipilih (format: "id | nama")
        const idJenis = selectedValue.split("|")[0];
        namaBank = selectedValue.split("|")[1];
        idBankBKM.value = idJenis;
        //console.log(idBank.value);
        fetch("/detailjenisbank/" + idBankBKM.value)
            .then((response) => response.json())
            .then((options) => {
                jenisBankBKM.value = options[0].jenis;
                console.log(options);
            });
    }
});
//#endregion

//#region ambil list jenis pembayaran
fetch("/jenispembayaran/")
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        jenisPembayaranBKMSelect.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.innerText = "Pilih Jenis Pembayaran";
        jenisPembayaranBKMSelect.appendChild(defaultOption);

        options.forEach((entry) => {
            const option = document.createElement("option");
            option.value = entry.Id_Jenis_Bayar;
            option.innerText = entry.Id_Jenis_Bayar + "|" + entry.Jenis_Pembayaran;
            jenisPembayaranBKMSelect.appendChild(option);
        });
    });

jenisPembayaranBKMSelect.addEventListener("change", function (event) {
    event.preventDefault();
    // console.log(idBank.value);
    const selectedOption = jenisPembayaranBKMSelect.options[jenisPembayaranBKMSelect.selectedIndex];
    if (selectedOption) {
        const idJenisInput = document.getElementById('idJenisPembayaranBKM');
        const selectedValue = selectedOption.textContent; // Nilai dari opsi yang dipilih (format: "id | nama")
        const idJenis = selectedValue.split("|")[0];
        namaJenisPemb = selectedValue.split("|")[1];
        idJenisInput.value = idJenis;
    }
});
//#endregion

//#region untuk ambil list kode perkiraan
fetch("/detailkodeperkiraan/" + 1)
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        kodePerkiraanBKMSelect.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.innerText = "Kode Perkiraan";
        kodePerkiraanBKMSelect.appendChild(defaultOption);

        options.forEach((entry) => {
            const option = document.createElement("option");
            option.value = entry.NoKodePerkiraan;
            option.innerText = entry.NoKodePerkiraan + "|" + entry.Keterangan;
            kodePerkiraanBKMSelect.appendChild(option);
        });
    });

kodePerkiraanBKMSelect.addEventListener("change", function (event) {
    event.preventDefault();
    // console.log(idBank.value);
    const selectedOption = kodePerkiraanBKMSelect.options[kodePerkiraanBKMSelect.selectedIndex];
    if (selectedOption) {

        const selectedValue = selectedOption.textContent; // Nilai dari opsi yang dipilih (format: "id | nama")
        const idJenis = selectedValue.split("|")[0];
        idKodePerkiraanBKM.value = idJenis;
    }
});
//#endregion

jumlahUangBKM.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        if (parseFloat(jumlahUangBKM.value) > 0) {
            kurs.focus();
        } else {
            alert('Jumlah Uang TIDAK BOLEH = 0 !');
        }
    }
});

kurs.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        if (parseFloat(kurs.value) > 0) {
            namaBankBKMSelect.focus();
        } else {
            alert('Kurs TIDAK BOLEH = 0 !');
        }
    }
});

uraianBKM.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        jenis = 'P';

        if (idBKM.value === "") {
            if (idBankBKM.value == "KRR1") {
                idBankBKM.value = "KI";
            }
            else if (idBankBKM.value == "KRR2") {
                idBankBKM.value = "KKM";
            }
        } else {
            idBankBKM = idBankBKM.value;
        }

        fetch("/getidbkmke/" + idBankBKM.value + "/" + tanggal.value)
            .then((response) => response.json())
            .then((options) => {
                console.log(options);
                idBKM.value = options;

                id_bkm.value = (idBKM.value).substring(4);
                console.log(id_bkm.value);
            });

        mataUangBKK.value = namaMU;
        jumlahUangBKK.value = jumlahUangBKM.value;
        namaBankBKK.value = namaBank;
        idBankBKK.value = idBankBKM.value;
        jenisBankBKK.value = jenisBankBKM.value;
        jenisPembayaranBKK.value = namaJenisPemb;
        kodePerkiraanBKKSelect.focus();

            // tanggal.setAttribute("readonly", true);
            // idBKM.setAttribute("readonly", true);
            // mataUangBKMSelect.setAttribute("readonly", true);
            // kursRupiah.setAttribute("readonly", true);
            // mataUangBKMSelect.setAttribute("readonly", true);
            // jumlahUangBKM.setAttribute("readonly", true);
            // idBankBKM.setAttribute("readonly", true);
            // namaBankBKMSelect.setAttribute("readonly", true);
            // idKodePerkiraanBKM.setAttribute("readonly", true);
            // kodePerkiraanSelectBKM.setAttribute("readonly", true);
            // uraianBKM.setAttribute("readonly", true);

        //Untuk card bkk
        mataUangBKK.removeAttribute("readonly");
        jumlahUangBKK.removeAttribute("readonly");
        namaBankBKK.removeAttribute("readonly");
        jenisPembayaranBKK.removeAttribute("readonly");
        idKodePerkiraanBKK.removeAttribute("readonly");
        kodePerkiraanBKKSelect.removeAttribute("readonly");
        uraianBKK.removeAttribute("readonly");
    }
});

fetch("/detailkodeperkiraan/" + 1)
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        kodePerkiraanBKKSelect.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.innerText = "Kode Perkiraan";
        kodePerkiraanBKKSelect.appendChild(defaultOption);

        options.forEach((entry) => {
            const option = document.createElement("option");
            option.value = entry.NoKodePerkiraan;
            option.innerText = entry.NoKodePerkiraan + "|" + entry.Keterangan;
            kodePerkiraanBKKSelect.appendChild(option);
        });
});

kodePerkiraanBKKSelect.addEventListener("change", function (event) {
    event.preventDefault();
    // console.log(idBank.value);
    const selectedOption = kodePerkiraanBKKSelect.options[kodePerkiraanBKKSelect.selectedIndex];
    if (selectedOption) {

        const selectedValue = selectedOption.textContent; // Nilai dari opsi yang dipilih (format: "id | nama")
        const idJenis = selectedValue.split("|")[0];
        idKodePerkiraanBKK.value = idJenis;
    }
    uraianBKK.focus();
});

uraianBKK.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        jenis = 'R';

        if (idBKK.value === "") {
            if (idBankBKK.value == "KRR1") {
                idBankBKK.value = "KI";
            }
            else if (idBankBKK.value == "KRR2") {
                idBankBKK.value = "KKM";
            }
        } else {
            idBankBKK = idBankBKK.value;
        }

        fetch("/getidbkkke/" + idBankBKK.value + "/" + tanggal.value)
            .then((response) => response.json())
            .then((options) => {
                console.log(options);
                idBKK.value = options;

                id_bkk.value = (idBKK.value).substring(4);
                console.log(id_bkk.value);
        });

        btnProses.focus();

            // tanggal.setAttribute("readonly", true);
            // idBKM.setAttribute("readonly", true);
            // mataUangBKMSelect.setAttribute("readonly", true);
            // kursRupiah.setAttribute("readonly", true);
            // mataUangBKMSelect.setAttribute("readonly", true);
            // jumlahUangBKM.setAttribute("readonly", true);
            // idBankBKM.setAttribute("readonly", true);
            // namaBankBKMSelect.setAttribute("readonly", true);
            // idKodePerkiraanBKM.setAttribute("readonly", true);
            // kodePerkiraanSelectBKM.setAttribute("readonly", true);
            // uraianBKM.setAttribute("readonly", true);

            // //Untuk card bkk
            // jumlahUangBKK.removeAttribute("readonly");
            // namaBankBKKSelect.removeAttribute("readonly");
            // idBankBKK.removeAttribute("readonly");
            // jenisBankBKK.removeAttribute("readonly");
            // idKodePerkiraanBKK.removeAttribute("readonly");
            // kodePerkiraanBKKSelect.removeAttribute("readonly");
            // uraianBKK.removeAttribute("readonly");
    }
});

btnBatal.addEventListener('click', function(event) {
    event.preventDefault();

    tanggal.value = "";
    bulan.value = "";
    tahun.value = "";
    id_bkk.value = "";
    id_bkm.value = "";
    idBKM.value = "";
    namaCustomerSelect.selectedIndex = 0;
    idCustomer.value = "";
    mataUangBKMSelect.selectedIndex = 0;
    idMataUangBKM.value = "";
    jumlahUangBKM.value = "";
    kurs.value = "";
    namaBankBKMSelect.selectedIndex = 0;
    idBankBKM.value = "";
    jenisBankBKM.value = "";
    jenisPembayaranBKMSelect.selectedIndex = 0;
    idJenisPembayaranBKM.value = "";
    kodePerkiraanBKMSelect.selectedIndex = 0;
    idKodePerkiraanBKM.value = "";
    uraianBKM.value = "";

    idBKK.value = "";
    mataUangBKK.value = "";
    jumlahUangBKK.value = "";
    namaBankBKK.value = "";
    idBankBKK.value = "";
    jenisBankBKK.value = "";
    jenisPembayaranBKK.value = "";
    kodePerkiraanBKKSelect.selectedIndex = 0;
    idKodePerkiraanBKK.value = "";
    uraianBKK.value = "";
});

//#region MODAL TAMPIL BKM
btnTampilBKM.addEventListener('click', function (event) {
    event.preventDefault();
    modalTampilBKMKE = $("#modalTampilBKMKE");
    modalTampilBKMKE.modal('show');
});

btnOkTampilBKM.addEventListener('click', function(event) {
    event.preventDefault();
    fetch("/getTabelTampilBKMKE/" + tanggalTampilBKM.value + "/" + tanggalTampilBKM2.value)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);
            tabelTampilBKM = $("#tabelTampilBKM").DataTable({
                data: options,
                columns: [
                    {
                        title: "Tgl. Input", data: "Tgl_Input",
                        render: function (data) {
                            var date = new Date(data);
                            var formattedDate = date.toLocaleDateString();

                            return `<div>
                                        <input type="checkbox" name="dataCheckbox" value="${formattedDate}" />
                                        <span>${formattedDate}</span>
                                    </div>`;
                        }
                    },
                    { title: "Id. BKM", data: "Id_BKM" },
                    { title: "Nilai Pelunasan", data: "Nilai_Pelunasan" },
                    { title: "Terjemahan", data: "Terjemahan" },
                ]
            });

            tabelTampilBKM.on('change', 'input[name="dataCheckbox"]', function() {
                $('input[name="dataCheckbox"]').not(this).prop('checked', false);

                if ($(this).prop("checked")) {
                    const checkedCheckbox = tabelTampilBKM.row($(this).closest('tr')).data();
                    idBKMTampil.value = checkedCheckbox.Id_BKM;
                } else {
                    idBKMTampil.value = "";
                }
            });
        });
});

btnCetakBKM.addEventListener('click', function (event) {
    event.preventDefault();

    console.log(idBKMTampil.value);

    fetch("/getCetakPengembalianKE/" + idBKMTampil.value)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);
            // nomer.textContent = options[0].Id_BKM;

            // const tglInput = options[0].Tgl_Input;
            // const [tanggal1, waktu] = tglInput.split(" ");
            // options[0].TglInput = tanggal1;
            // let tgl = ubahFormatTanggal(tanggal1);
            // tglCetak.textContent = tgl;
            // symbol.textContent = options[0].Symbol;
            // jumlahDiterima.textContent = options[0].Nilai_Pelunasan;
            // terbilangCetak.textContent = options[0].Terjemahan;
            // kodePerkiraanCetak.textContent = options[0].KodePerkiraan;
            // jumlah.textContent = options[0].Nilai_Rincian;
            // rincianPenerimaan.textContent = options[0].NamaCust + " - " + options[0].Uraian;
            // symbol2.textContent = options[0].Symbol;
            // grandTotal.textContent = options[0].Nilai_Pelunasan;

            // window.print();
        });

    // methodTampilBKM.value = "PUT";
    // formTampilBKM.action = "/CreateBKM/" + idBKM.value;
    // console.log(idBKM.value);
    // formTampilBKM.submit();
});
//#endregion

//#region MODAL TAMPIL BKK
btnTampilBKK.addEventListener('click', function (event) {
    event.preventDefault();
    modalTampilBKKKE = $("#modalTampilBKKKE");
    modalTampilBKKKE.modal('show');
});

btnOkTampilBKK.addEventListener('click', function(event) {
    event.preventDefault();
    fetch("/getTabelTampilBKKKE/" + tanggalTampilBKK.value + "/" + tanggalTampilBKK2.value)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);
            tabelTampilBKK = $("#tabelTampilBKK").DataTable({
                data: options,
                columns: [
                    {
                        title: "Tgl. Input", data: "Tgl_Input",
                        render: function (data) {
                            var date = new Date(data);
                            var formattedDate = date.toLocaleDateString();

                            return `<div>
                                        <input type="checkbox" name="dataCheckbox" value="${formattedDate}" />
                                        <span>${formattedDate}</span>
                                    </div>`;
                        }
                    },
                    { title: "Id. BKM", data: "Id_BKK" },
                    { title: "Nilai Pelunasan", data: "Nilai_Pembulatan" },
                    { title: "Terjemahan", data: "Terjemahan" },
                ]
            });

            tabelTampilBKK.on('change', 'input[name="dataCheckbox"]', function() {
                $('input[name="dataCheckbox"]').not(this).prop('checked', false);

                if ($(this).prop("checked")) {
                    const checkedCheckbox = tabelTampilBKK.row($(this).closest('tr')).data();
                    idBKKTampil.value = checkedCheckbox.Id_BKK;
                } else {
                    idBKKTampil.value = "";
                }
            });
        });
});

btnCetakBKK.addEventListener('click', function(event) {
    event.preventDefault();

    if ($('input[name="dataCheckbox"]:checked').length === 0) {
        alert("Pilih 1 Id.BKK Untuk DiCetak!");
        return;
    }
    methodTampilBKKKE.value="PUT";
    formTampilBKKKE.action = "/BKMBKKNotaKredit/" + idBKKTampil.value;
    console.log(idBKKTampil.value);
    formTampilBKKKE.submit();
});
//#endregion

btnProses.addEventListener('click', function(event) {
    event.preventDefault();
    if (idBKM.value != "" || idBKK.value != "") {
        nilai1.value = parseFloat(jumlahUangBKM.value);
        total2 = nilai1.toString();
        // console.log("masuk");
        if (parseInt(idMataUangBKM.value) == 1) {
            konversi.value = F_Rupiah(total2); // Menggunakan fungsi F_Rupiah jika kondisi terpenuhi
        } else {
            konversi.value = F_Dollar(total2); // Menggunakan fungsi F_DOLLAR jika kondisi tidak terpenuhi
        }

        nilai.value = parseFloat(jumlahUangBKK.value);
        total1 = nilai.toString();
        if (parseInt(idMataUangBKM.value) == 1) {
            konversi1.value = F_Rupiah(total1); // Menggunakan fungsi F_Rupiah jika kondisi terpenuhi
        } else {
            konversi1.value = F_Dollar(total1); // Menggunakan fungsi F_DOLLAR jika kondisi tidak terpenuhi
        }
    }
    else {
        console.log("Tidak Ada Yg diPROSES!");
    }

    fetch("/getIdPembayaranKE/")
        .then((response) => response.json())
        .then((options) => {
            console.log(options);
            idPembayaran.value = options.Id_Pembayaran;
            console.log(idPembayaran.value);

            formkoreksi.submit();
    });
    // console.log(idBKK.value);

});

//#region untuk koversi jumlah uang
function F_Rupiah() {
    var formatted = parseFloat(nilai1.value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    return formatted;
}
function F_Dollar() {
    var formatted = parseFloat(nilai1.value).toFixed(2);
    return formatted;
}
//#endregion
