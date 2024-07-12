let tabelDataNotaK = $("#tabelDataNotaK").DataTable();
let idNotaK = document.getElementById('idNotaK');
let noTagih = document.getElementById('noTagih');
let namaCustomer = document.getElementById('namaCustomer');
let jumlahUang = document.getElementById('jumlahUang');
let mataUangSelect = document.getElementById('mataUangSelect');
let idMataUang = document.getElementById('idMataUang');
let jenisBayarSelect = document.getElementById('jenisBayarSelect');
let namaBankSelect = document.getElementById('namaBankSelect');
let idBank = document.getElementById('idBank');
let namaBank = document.getElementById('namaBank');
let rincianBKK = document.getElementById('rincianBKK');

//HIDDEN
let id_Bank = document.getElementById('id_Bank');
let jenis_Bayar = document.getElementById('jenis_Bayar');
let idJenisBayar = document.getElementById('idJenisBayar');

let btnIsi = document.getElementById('btnIsi');
let btnKoreksi = document.getElementById('btnKoreksi');
let btnHapus = document.getElementById('btnHapus');
let btnProses = document.getElementById('btnProses');
let btnBatal = document.getElementById('btnBatal');
let btnKeluar = document.getElementById('btnKeluar');
let cekadaisi;
let mode;

let formkoreksi = document.getElementById('formkoreksi');

fetch("/loadDataNotaK/")
    .then((response) => response.json())
    .then((options) => {
        console.log(options);

        tabelDataNotaK = $("#tabelDataNotaK").DataTable({
            destroy: true,
            data: options,
            columns: [
                { title: "Tanggal", data: "Tanggal" },
                { title: "Id. Nota Kredit", data: "Id_NotaKredit" },
                { title: "Id. Penagihan", data: "Id_Penagihan" },
                { title: "Customer", data: "NamaCust" },
                { title: "Mata Uang", data: "Nama_MataUang" },
                { title: "Jml Uang", data: "Nilai" },
                { title: "Id Bank", data: "Id_Bank" },
                { title: "Jenis Bayar", data: "Jenis_Pembayaran" },
                { title: "Rincian Bayar", data: "Rincian_Bayar" },
            ],
        });
        options[0].Id_Bank = id_Bank.value;
    });

let selectedRows;

$("#tabelDataNotaK tbody").off("click", "tr");
$("#tabelDataNotaK tbody").on("click", "tr", function () {
    let checkSelectedRows = $("#tabelDataNotaK tbody tr.selected");
    cekadaisi = checkSelectedRows;
    if (checkSelectedRows.length > 0) {
        // Remove "selected" class from previously selected rows
        checkSelectedRows.removeClass("selected");
    }
    $(this).toggleClass("selected");
    const table = $("#tabelDataNotaK").DataTable();
    selectedRows = table.rows(".selected").data().toArray();
    console.log(selectedRows[0]);
});

btnBatal.addEventListener('click', function(event) {
    event.preventDefault();

    tabelDataNotaK.clear().draw();
    idNotaK.value = "";
    noTagih.value = "";
    mataUangSelect.selectedIndex = 0;
    idMataUang.value = "";
    namaCustomer.value = "";
    jumlahUang.value = "";
    jenisBayarSelect.selectedIndex = 0;
    idJenisBayar.value = "";
    namaBankSelect.selectedIndex = 0;
    idBank.value = "";
    namaBank.value = "";
    rincianBKK.value = "";
})

btnIsi.addEventListener('click', function (event) {
    event.preventDefault();
    btnKoreksi.disabled = true;
    btnHapus.disabled = true;
    btnProses.disabled = false;
    btnIsi.disabled = true;
    btnKeluar.style.display = "none";
    btnBatal.style.display = "block";
    mode = 1;

    console.log(selectedRows[0]);
    selectedRows[0].Id_Bank = id_Bank.value;
    selectedRows[0].Jenis_Pembayaran = jenis_Bayar.value;
    console.log(id_Bank.value);
    // if (cekadaisi.length == 0 ) {
    //     alert('Pilih 1 Data Saja')
    // } else {
        if (id_Bank.value == "" && jenis_Bayar.value == "") {
            idNotaK.value = selectedRows[0].Id_NotaKredit;
            noTagih.value = selectedRows[0].Id_Penagihan;
            namaCustomer.value = selectedRows[0].NamaCust;
            jumlahUang.value = selectedRows[0].Nilai;
            idMataUang.value = selectedRows[0].Id_MataUang;
            // mataUang.value = selectedRows[0].Nama_MataUang;

            const idmtuang = selectedRows[0].Id_MataUang;
            const options2 = mataUangSelect.options;
            for (let i = 0; i < options2.length; i++) {
                if (options2[i].value === idmtuang) {
                    // Setel select option jenisPembayaranSelect sesuai dengan opsi yang cocok
                    mataUangSelect.selectedIndex = i;
                    break;
                }
            };
            jenisBayarSelect.focus();
        } else {
            alert('Data sudah diIsi');
        }
    // }
});

rincianBKK.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        btnProses.focus();
    }
});

btnKoreksi.addEventListener('click', function(event) {
    event.preventDefault();

    btnKoreksi.disabled = true;
    btnHapus.disabled = true;
    btnProses.disabled = false;
    btnIsi.disabled = true;
    btnKeluar.style.display = "none";
    btnBatal.style.display = "block";
    mode = 2;

    console.log(selectedRows[0]);
    console.log(id_Bank.value);

    selectedRows[0].Jenis_Pembayaran = jenis_Bayar.value;
    //electedRows[0].Id_Bank = id_Bank.value;


    // if (cekadaisi.length == 0 ) {
    //     alert('Pilih 1 Nota Kredit')
    // } else {
        console.log(id_Bank.value);
        if (selectedRows[0].Id_Bank != null && selectedRows[0].Jenis_Pembayaran != null) {
            idNotaK.value = selectedRows[0].Id_NotaKredit;
            noTagih.value = selectedRows[0].Id_Penagihan;
            namaCustomer.value = selectedRows[0].NamaCust;
            jumlahUang.value = selectedRows[0].Nilai;
            // mataUang.value = selectedRows[0].Nama_MataUang;
            rincianBKK.value = selectedRows[0].Rincian_Bayar;
            idBank.value = selectedRows[0].Id_Bank;
            idJenisBayar.value = selectedRows[0].Id_Jenis_Bayar;
            idMataUang.value = selectedRows[0].Id_MataUang;

            const idmtuang = selectedRows[0].Id_MataUang;
            const options2 = mataUangSelect.options;
            for (let i = 0; i < options2.length; i++) {
                if (options2[i].value === idmtuang) {
                    mataUangSelect.selectedIndex = i;
                    break;
                }
            };

            const jenisbayar = selectedRows[0].Id_Jenis_Bayar;
            const options3 = jenisBayarSelect.options;
            for (let i = 0; i < options3.length; i++) {
                if (options3[i].value === jenisbayar) {
                    // Setel select option jenisPembayaranSelect sesuai dengan opsi yang cocok
                    jenisBayarSelect.selectedIndex = i;
                    break;
                }
            };

            const nmbank = selectedRows[0].Id_Bank;
            const options4 = namaBankSelect.options;
            for (let i = 0; i < options4.length; i++) {
                if (options4[i].value === nmbank) {
                    // Setel select option jenisPembayaranSelect sesuai dengan opsi yang cocok
                    namaBankSelect.selectedIndex = i;
                    break;
                }
            };

            jenisBayarSelect.focus();
            return;
        } else {
            alert('Data belum diIsi');
        }
    // }
});

btnHapus.addEventListener('click', function(event) {
    event.preventDefault();

    btnKoreksi.disabled = true;
    btnHapus.disabled = true;
    btnProses.disabled = false;
    btnIsi.disabled = true;
    btnKeluar.style.display = "none";
    btnBatal.style.display = "block";

    if (selectedRows[0].Id_Bank != null && selectedRows[0].Jenis_Pembayaran != null) {
        idNotaK.value = selectedRows[0].Id_NotaKredit;
        noTagih.value = selectedRows[0].Id_Penagihan;
        namaCustomer.value = selectedRows[0].NamaCust;
        jumlahUang.value = selectedRows[0].Nilai;
        mataUang.value = selectedRows[0].Nama_MataUang;
        rincianBKK.value = selectedRows[0].Rincian_Bayar;
        idBank.value = selectedRows[0].Id_Bank;
        idJenisBayar.value = selectedRows[0].Id_Jenis_Bayar;

        const jenisbayar = selectedRows[0].Id_Jenis_Bayar;
        const options3 = jenisBayarSelect.options;
        for (let i = 0; i < options3.length; i++) {
            if (options3[i].value === jenisbayar) {
                // Setel select option jenisPembayaranSelect sesuai dengan opsi yang cocok
                jenisBayarSelect.selectedIndex = i;
                break;
            }
        };

        const nmbank = selectedRows[0].Id_Bank;
        const options4 = namaBankSelect.options;
        for (let i = 0; i < options4.length; i++) {
            if (options4[i].value === nmbank) {
                // Setel select option jenisPembayaranSelect sesuai dengan opsi yang cocok
                namaBankSelect.selectedIndex = i;
                break;
            }
        };

        jenisBayarSelect.focus();
        return;
    } else {
        alert('Data belum diIsi');
    }
})

btnProses.addEventListener('click', function(event) {
    event.preventDefault();
    if (mode == 1) {
        formkoreksi.submit();
    } else if (mode == 2) {

    }

    fetch("/loadDataNotaK/")
    .then((response) => response.json())
    .then((options) => {
        console.log(options);

        tabelDataNotaK = $("#tabelDataNotaK").DataTable({
            destroy: true,
            data: options,
            columns: [
                { title: "Tanggal", data: "Tanggal" },
                { title: "Id. Nota Kredit", data: "Id_NotaKredit" },
                { title: "Id. Penagihan", data: "Id_Penagihan" },
                { title: "Customer", data: "NamaCust" },
                { title: "Mata Uang", data: "Nama_MataUang" },
                { title: "Jml Uang", data: "Nilai" },
                { title: "Id Bank", data: "Id_Bank" },
                { title: "Jenis Bayar", data: "Jenis_Pembayaran" },
                { title: "Rincian Bayar", data: "Rincian_Bayar" },
            ],
        });
        options[0].Id_Bank = id_Bank.value;
    });
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

fetch("/getJenisBayarPenagajuan/")
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        jenisBayarSelect.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.innerText = "Pilih Jenis Bayar";
        jenisBayarSelect.appendChild(defaultOption);

        options.forEach((entry) => {
            const option = document.createElement("option");
            option.value = entry.Id_Jenis_Bayar; // Gunakan entry.IdCust sebagai nilai opsi
            option.innerText = entry.Id_Jenis_Bayar + "|" + entry.Jenis_Pembayaran; // Gunakan entry.IdCust dan entry.NamaCust untuk teks opsi
            jenisBayarSelect.appendChild(option);
        });
    });


jenisBayarSelect.addEventListener("change", function (event) {
    event.preventDefault();
    const selectedOption = jenisBayarSelect.options[jenisBayarSelect.selectedIndex];
    if (selectedOption) {
        const selectedValue = selectedOption.value;
        const idKode = selectedValue.split(" | ")[0];
        idJenisBayar.value = idKode;
    }
});

fetch("/getBankPengajuan/")
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        namaBankSelect.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.innerText = "Pilih Bank";
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
        const selectedValue = selectedOption.textContent; // Nilai dari opsi yang dipilih (format: "id | nama")
        const idJenis = selectedValue.split("|")[0];
        const nama = selectedValue.split("|")[1];
        idBank.value = idJenis;
        namaBank.value = nama;
        //console.log(idBank.value);
        // fetch("/detailjenisbank/" + idBank.value)
        //     .then((response) => response.json())
        //     .then((options) => {
        //         jenisBank.value = options[0].jenis;
        //         console.log(options);
        //     });
    }
});


