let namaCustomerSelect = document.getElementById('namaCustomerSelect');
let idCustomer = document.getElementById('idCustomer');
let btnOK = document.getElementById('btnOK');
let btnPilihBKM = document.getElementById('btnPilihBKM');
let dataTable;
let lastCheckedCheckbox = null;
let btnProses = document.getElementById('btnProses');
let btnTampilBKM = document.getElementById('btnTampilBKM');
let btnBatal = document.getElementById('btnBatal');
let tanggalTampilBKM2 = document.getElementById('tanggalTampilBKM2');
let tanggalTampilBKM = document.getElementById('tanggalTampilBKM');
let tanggalTampilBKK = document.getElementById('tanggalTampilBKK');
let tanggalTampilBKK2 = document.getElementById('tanggalTampilBKK2');
let id_bkk = document.getElementById('id_bkk');
let id_bkm = document.getElementById('id_bkm');

let idPembayaran = document.getElementById('idPembayaran');
let idPelunasan = document.getElementById('idPelunasan');

//CARD BKK
let tanggal = document.getElementById('tanggal');
let idBKK = document.getElementById('idBKK');
let mataUangSelect = document.getElementById('mataUangSelect');
let kursRupiah = document.getElementById('kursRupiah');
let jumlahUang = document.getElementById('jumlahUang');
let namaBankSelect = document.getElementById('namaBankSelect');
let idBankBKK = document.getElementById('idBankBKK');
let jenisBankBKK = document.getElementById('jenisBankBKK');
let idKodePerkiraanBKK = document.getElementById('idKodePerkiraanBKK');
let kodePerkiraanSelectBKK = document.getElementById('kodePerkiraanSelectBKK');
let uraian = document.getElementById('uraian');
let idMataUang = document.getElementById('idMataUang');

//CARD BKM
let idBKM = document.getElementById('idBKM');
let jumlahUangBKM = document.getElementById('jumlahUangBKM');
let namaBankBKMSelect = document.getElementById('namaBankBKMSelect');
let idBankBKM = document.getElementById('idBankBKM');
let jenisBankBKM = document.getElementById('jenisBankBKM');
let idKodePerkiraanBKM = document.getElementById('idKodePerkiraanBKM');
let kodePerkiraanBKMSelect = document.getElementById('kodePerkiraanBKMSelect');
let uraianBKM = document.getElementById('uraianBKM');

let idbkm;
let saldo;
let IdPelunasan;
let jenisBank;
let IdCust;
let total1;
let total2;
let nilai = document.getElementById('nilai');
let nilai1 = document.getElementById('nilai1');
let konversi = document.getElementById('konversi');
let konversi1 = document.getElementById('konversi1');
let saldoRp;

let idBKMTampil = document.getElementById('idBKMTampil');
let btnCetakBKM = document.getElementById('btnCetakBKM');
let idBKKTampil = document.getElementById('idBKKTampil');
let btnCetakBKK = document.getElementById('btnCetakBKK');
let btnKoreksi = document.getElementById('btnKoreksi');
let formkoreksi = document.getElementById('formkoreksi');
let methodkoreksi = document.getElementById('methodkoreksi');
let methodTampilBKM = document.getElementById('methodTampilBKM');
let formTampilBKM = document.getElementById('formTampilBKM');
let methodTampilBKK = document.getElementById('methodTampilBKK');
let formTampilBKK = document.getElementById('formTampilBKK');

const tanggalPenagihan = new Date();
const formattedDate2 = tanggalPenagihan.toISOString().substring(0, 10);
tanggal.value = formattedDate2;

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

//#region untuk ambil nama customer
fetch("/getcust/")
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

//#region ambil list kode perkiraan
fetch("/getkodeperkiraan/")
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        kodePerkiraanSelectBKK.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.innerText = "Kode Perkiraan";
        kodePerkiraanSelectBKK.appendChild(defaultOption);

        options.forEach((entry) => {
            const option = document.createElement("option");
            option.value = entry.NoKodePerkiraan;
            option.innerText = entry.NoKodePerkiraan + "|" + entry.Keterangan;
            kodePerkiraanSelectBKK.appendChild(option);
        });
});

kodePerkiraanSelectBKK.addEventListener("change", function (event) {
    event.preventDefault();
    const selectedOption = kodePerkiraanSelectBKK.options[kodePerkiraanSelectBKK.selectedIndex];
    if (selectedOption) {
        const selectedValue = selectedOption.value; // Nilai dari opsi yang dipilih (format: "id | nama")
        const idkp = selectedValue.split(" | ")[0];
        idKodePerkiraanBKK.value = idkp;
    }
});
//#endregion

//#region ambil list bank
fetch("/getbank/")
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        namaBankSelect.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.innerText = "Bank";
        namaBankSelect.appendChild(defaultOption);

        options.forEach((entry) => {
            const option = document.createElement("option");
            option.value = entry.Id_Bank;
            option.innerText = entry.Id_Bank + "|" + entry.Nama_Bank;
            namaBankSelect.appendChild(option);
        });

});

namaBankSelect.addEventListener("change", function (event) {
    event.preventDefault();
    // console.log(idBank.value);
    const selectedOption = namaBankSelect.options[namaBankSelect.selectedIndex];
    if (selectedOption) {
        //const idJenisInput = document.getElementById('idBank');
        const selectedValue = selectedOption.value; // Nilai dari opsi yang dipilih (format: "id | nama")
        const idJenis = selectedValue.split("|")[0];
        idBankBKK.value = idJenis;
        //console.log(idBank.value);
        fetch("/detailjenisbank/" + idBankBKK.value)
            .then((response) => response.json())
            .then((options) => {
                jenisBankBKK.value = options[0].jenis;
                console.log(options);
            });
    }
});
//#endregion

//#region untuk ambil mata uang BKK
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
        const idKodeInput = document.getElementById('idMataUang');
        const selectedValue = selectedOption.textContent;
        const idMU = selectedValue.split("|")[0];
        idKodeInput.value = idMU;
    }
});
//#endregion

tanggal.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();

        var tanggalInput = new Date(tanggal.valueAsNumber);
        var currentDate = new Date();
        if (tanggalInput > currentDate) {
            alert("Tanggal SALAH!");
        } else {
            mataUangSelect.focus();
        }
    }
});

btnOK.addEventListener('click', function (event) {
    event.preventDefault();
    // clickOK();
        fetch("/getTabelPelunasanBKMDP/" + idCustomer.value)
            .then((response) => response.json())
            .then((options) => {
                console.log(options);

                dataTable = $("#tabelDataPelunasan").DataTable({
                    data: options,
                    columns: [
                        {
                            title: "Tgl Input", data: "Tgl_Input",
                            render: function (data) {
                                var date = new Date(data);
                                var formattedDate = date.toLocaleDateString();

                                return `<div>
                                            <input type="checkbox" name="divisiCheckbox" value="${formattedDate}" />
                                            <span>${formattedDate}</span>
                                        </div>`;
                            }
                        },
                        { title: "Id. BKM", data: "Id_BKM" },
                        { title: "Id. Bank", data: "Id_bank" },
                        { title: "Nama Bank", data: "Bank" },
                        { title: "Mata Uang ", data: "MataUang" },
                        { title: "Customer", data: "NamaCust" },
                        { title: "Total Pelunasan", data: "Nilai_Pelunasan",
                            render: function (data) {
                                // Mengubah format angka ke format dengan koma
                                return parseFloat(data).toLocaleString();
                            },
                        },
                        { title: "Saldo Pelunasan", data: "SaldoPelunasan",
                            render: function (data) {
                                // Mengubah format angka ke format dengan koma
                                return parseFloat(data).toLocaleString();
                            },
                        },
                        { title: "Id. Pelunasan", data: "Id_Pelunasan"},
                        { title: "Jenis Bank", data: "Jenis_Bank"},
                        { title: "Id. Uang", data: "Id_MataUang"},
                        { title: "Id. Cust", data: "ID_Cust"},
                    ],
                });
            });
});

$('#tabelDataPelunasan').on('change', 'input[name="divisiCheckbox"]', function() {
    if ($(this).prop('checked')) {
        if (lastCheckedCheckbox && lastCheckedCheckbox !== this) {
            $(lastCheckedCheckbox).prop('checked', false);
        }
        lastCheckedCheckbox = this;
        const checkboxValue = $(this).val();
        const rowData = dataTable.row($(this).closest('tr')).data();
        console.log('Checkbox checked:', checkboxValue, rowData);
    }
});

btnPilihBKM.addEventListener('click', function(event) {
    event.preventDefault();
    if (lastCheckedCheckbox) {
        const rowData = dataTable.row($(lastCheckedCheckbox).closest('tr')).data();

        // Assuming the order of columns is the same as you provided
        idbkm = rowData['Id_BKM'];
        saldo = rowData['SaldoPelunasan'];
        IdPelunasan = rowData['Id_Pelunasan'];
        jenisBank = rowData['Jenis_Bank'];
        idMtUang = rowData['Id_MataUang'];
        IdCust = rowData['ID_Cust'];
        tglDP = rowData['Tgl_Input'];

        const dateObject = new Date(tglDP);

        const tglInput = new Date(rowData['Tgl_Input']);
        const formattedDate = tglInput.toISOString().substr(0, 10);
        tanggal.value = formattedDate;

        // Get month and year separately
        bulan.value = dateObject.getMonth() + 1; // +1 karena bulan dimulai dari 0 (Januari) - 11 (Desember)
        tahun.value = dateObject.getFullYear();

        rowData['bulan'] = bulan.value;
        rowData['tahun'] = tahun.value;

        tanggal.removeAttribute("readonly");
        mataUangSelect.removeAttribute("readonly");
        kursRupiah.removeAttribute("readonly");
        jumlahUang.removeAttribute("readonly");
        namaBankSelect.removeAttribute("readonly");
        idKodePerkiraanBKK.removeAttribute("readonly");
        kodePerkiraanSelectBKK.removeAttribute("readonly");
        uraian.removeAttribute("readonly");
    }
});

kursRupiah.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        if (parseFloat(kursRupiah.value) > 0) {
            // Nilai kurs Rupiah lebih besar dari 0, tidak perlu alert
        } else {
            alert('Nilai kurs Rupiah harus lebih besar dari 0!');
        }
    }
});

jumlahUang.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        let jumlah = parseFloat(jumlahUang.value).toFixed(2);
        let kurs = parseFloat(kursRupiah.value);

        if (jumlah === '0.00') {
            alert('Jumlah Uang TIDAK BOLEH = 0 !');
            jumlahUang.focus();
        } else {
            let total = 0;
            console.log(idMtUang);
            if (idMataUang.value == 1 && idMtUang == 2) {
                console.log('masuk');
                let nilaipelunasan = parseFloat(kursRupiah.value) * parseFloat(jumlahUang.value);
                let saldorp = parseFloat(kursRupiah.value) * saldo;

                jumlahUang.value = nilaipelunasan.toFixed(2);

                console.log(nilaipelunasan, saldorp);

                if (nilaipelunasan > saldorp) {
                    alert('Jumlah Uang TIDAK BOLEH lebih besar dari Saldo Pelunasan!');
                    jumlahUang.focus();
                }
            } else if (idMataUang.value == 2 && idMtUang == 1) {
                console.log('masuk');
                let nilaipelunasan = parseFloat(kursRupiah.value) * parseFloat(jumlahUang.value);
                let saldodollar = saldo / parseFloat(kursRupiah.value);

                jumlahUang.value = nilaipelunasan.toFixed(2);

                console.log(nilaipelunasan, saldodollar);

                if (nilaipelunasan > saldodollar) {
                    alert('Jumlah Uang TIDAK BOLEH lebih besar dari Saldo Pelunasan!');
                    jumlahUang.focus();
                }
            }
        }
    }
});

uraian.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        jenis = 'P';

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

        fetch("/getidbkmBKKDP/" + idBankBKK.value + "/" + tanggal.value)
            .then((response) => response.json())
            .then((options) => {
                console.log(options);
                idBKK.value = options;

                id_bkk.value = (idBKK.value).substring(4);
                console.log(id_bkk.value);
            });

        jumlahUangBKM.removeAttribute("readonly");
        namaBankBKMSelect.removeAttribute("readonly");
        idBankBKM.removeAttribute("readonly");
        jenisBankBKM.removeAttribute("readonly");
        idKodePerkiraanBKM.removeAttribute("readonly");
        kodePerkiraanBKMSelect.removeAttribute("readonly");
        uraianBKM.removeAttribute("readonly");

        tanggal.setAttribute("readonly", true);
        mataUangSelect.setAttribute("readonly", true);
        kursRupiah.setAttribute("readonly", true);
        jumlahUang.setAttribute("readonly", true);
        namaBankSelect.setAttribute("readonly", true);
        kodePerkiraanSelectBKK.setAttribute("readonly", true);
        idKodePerkiraanBKK.setAttribute("readonly", true);
        uraian.setAttribute("readonly", true);
    }
});

//#region CARD BKM
fetch("/getkodeperkiraan/")
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
    const selectedOption = kodePerkiraanBKMSelect.options[kodePerkiraanBKMSelect.selectedIndex];
    if (selectedOption) {
        const selectedValue = selectedOption.value; // Nilai dari opsi yang dipilih (format: "id | nama")
        const idkp = selectedValue.split(" | ")[0];
        idKodePerkiraanBKM.value = idkp;
    }
});
//#endregion

//#region ambil list bank untuk BKM
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
        const selectedValue = selectedOption.value; // Nilai dari opsi yang dipilih (format: "id | nama")
        const idJenis = selectedValue.split("|")[0];
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

        fetch("/getidbkmBKMDP/" + idBankBKM.value + "/" + tanggal.value)
            .then((response) => response.json())
            .then((options) => {
                console.log(options);
                idBKM.value = options;

                id_bkm.value = (idBKM.value).substring(4);
                console.log(id_bkm.value);
            });

            idBKM.setAttribute("readonly", true);
            jumlahUangBKM.setAttribute("readonly", true);
            namaBankBKMSelect.setAttribute("readonly", true);
            idBankBKM.setAttribute("readonly", true);
            jenisBankBKM.setAttribute("readonly", true);
            idKodePerkiraanBKM.setAttribute("readonly", true);
            kodePerkiraanBKMSelect.setAttribute("readonly", true);
            uraianBKM.setAttribute("readonly", true);
    }
});

btnProses.addEventListener('click', function(event) {
    event.preventDefault();
    if (idBKM.value != "" || idBKM.value != "") {
        nilai.value = parseFloat(jumlahUang.value);
        total1 = nilai.toString();
        // console.log("masuk");
        if (parseInt(idMataUang.value) == 1) {
            konversi.value = F_Rupiah(total1); // Menggunakan fungsi F_Rupiah jika kondisi terpenuhi
        } else {
            konversi.value = F_Dollar(total1); // Menggunakan fungsi F_DOLLAR jika kondisi tidak terpenuhi
        }

        nilai1.value = parseFloat(jumlahUangBKM.value);
        total2 = nilai1.toString();
        if (parseInt(idMataUang.value) == 1) {
            konversi1.value = F_Rupiah(total2); // Menggunakan fungsi F_Rupiah jika kondisi terpenuhi
        } else {
            konversi1.value = F_Dollar(total2); // Menggunakan fungsi F_DOLLAR jika kondisi tidak terpenuhi
        }
    }
    else {
        console.log("Tidak Ada Yg diPROSES!");
    }
    fetch("/getIdPembayaran/")
        .then((response) => response.json())
        .then((options) => {
            console.log(options);
            idPembayaran.value = options.id_pembayaran;

            formkoreksi.submit();
    });

    fetch("/getIdPelunasan/")
        .then((response) => response.json())
        .then((options) => {
            console.log(options);
            idPelunasan.value = options.Id_Pelunasan;
            console.log(idPelunasan.value);

            //formkoreksi.submit();
    });
    //formkoreksi.submit();
})

//#region untuk koversi jumlah uang
function F_Rupiah() {
    var formatted = parseFloat(nilai.value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    return formatted;
}
function F_Dollar() {
    var formatted = parseFloat(nilai.value).toFixed(2);
    return formatted;
}
//#endregion

//#region untuk MODAL TAMPIL BKM
btnTampilBKM.addEventListener('click', function(event) {
    event.preventDefault();
    modalTampilBKM = $("#modalTampilBKM");
    modalTampilBKM.modal('show');
});

btnOkTampilBKM.addEventListener('click', function(event) {
    event.preventDefault();
    fetch("/getTabelTampilBKMDP/" + tanggalTampilBKM.value + "/" + tanggalTampilBKM2.value)
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
                    { title: "Nilai Pelunasan", data: "Nilai_Pelunasan",
                        render: function (data) {
                            // Mengubah format angka ke format dengan koma
                            return parseFloat(data).toLocaleString();
                        },
                    },
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

btnCetakBKM.addEventListener('click', function(event) {
    event.preventDefault();

    if ($('input[name="dataCheckbox"]:checked').length === 0) {
        alert("Pilih 1 Id.BKM Untuk DiCetak!");
        return;
    }
    methodTampilBKM.value="PUT";
    formTampilBKM.action = "/BKMDPPelunasan/" + idBKMTampil.value;
    console.log(idBKM.value);
    formTampilBKM.submit();
});
//#endregion

//#region untuk MODAL TAMPIL BKK
btnTampilBKK.addEventListener('click', function(event) {
    event.preventDefault();
    modalTampilBKK = $("#modalTampilBKK");
    modalTampilBKK.modal('show');
});

btnOkTampilBKK.addEventListener('click', function(event) {
    event.preventDefault();
    fetch("/getTabelTampilBKKDP/" + tanggalTampilBKK.value + "/" + tanggalTampilBKK2.value)
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
                    { title: "Nilai Pelunasan", data: "Nilai_Pembulatan",
                        render: function (data) {
                            // Mengubah format angka ke format dengan koma
                            return parseFloat(data).toLocaleString();
                        },
                    },
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
    methodTampilBKK.value="PUT";
    formTampilBKK.action = "/BKMDPPelunasan/" + idBKKTampil.value;
    console.log(idBKKTampil.value);
    formTampilBKK.submit();
});
//#endregion

btnBatal.addEventListener('click', function(event) {
    event.preventDefault();
    tanggal.value = "";
    idBKK.value = "";
    jumlahUang.value = "";
    mataUangSelect.selectedIndex = 0;
    idMataUang.value = "";
    kursRupiah.value = "";
    idKodePerkiraanBKK.value = "";
    idKodePerkiraanBKM.value = "";
    kodePerkiraanBKMSelect.selectedIndex = 0;
    kodePerkiraanSelectBKK.selectedIndex = 0;
    idBKM.value = "";
    jumlahUangBKM.value = "";
    uraian.value = "";
    uraianBKM.value = "";
    namaCustomerSelect.selectedIndex = 0;
    idCustomer.value = "";
    idBankBKK.value = "";
    idBankBKM.value = "";
    jenisBankBKK.value = "";
    jenisBankBKM.value = "";
    namaBankSelect.selectedIndex = 0;
    namaBankBKMSelect.selectedIndex = 0;
    dataTable.clear().draw();

    tanggal.setAttribute("readonly", true);
    idBKK.setAttribute("readonly", true);
    mataUangSelect.setAttribute("readonly", true);
    kursRupiah.setAttribute("readonly", true);
    jumlahUang.setAttribute("readonly", true);
    namaBankSelect.setAttribute("readonly", true);
    idBankBKK.setAttribute("readonly", true);
    jenisBankBKK.setAttribute("readonly", true);
    idKodePerkiraanBKK.setAttribute("readonly", true);
    kodePerkiraanSelectBKK.setAttribute("readonly", true);
    uraian.setAttribute("readonly", true);
    idMataUang.setAttribute("readonly", true);
});

btnKoreksi.addEventListener('click', function(event) {
    event.preventDefault();
    if (idBKK.value != "") {
        tanggal.removeAttribute("readonly");
        mataUangSelect.removeAttribute("readonly");
        namaBankSelect.removeAttribute("readonly");
        idKodePerkiraanBKK.removeAttribute("readonly");
        kodePerkiraanSelectBKK.removeAttribute("readonly");
        uraian.removeAttribute("readonly");
    }
});

