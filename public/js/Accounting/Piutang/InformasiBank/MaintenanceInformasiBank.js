let tanggal = document.getElementById('tanggal');
let btnOk = document.getElementById('btnOk');
let tabelInfoBank = $("#tabelInfoBank").DataTable();
let formkoreksi = document.getElementById('formkoreksi');
let methodkoreksi = document.getElementById('methodkoreksi');

let btnIsi = document.getElementById('btnIsi');
let btnSimpan = document.getElementById('btnSimpan');
let btnKoreksi = document.getElementById('btnKoreksi');
let btnBatal = document.getElementById('btnBatal');
let btnSimpanKoreksi = document.getElementById('btnSimpanKoreksi');
let btnHapus = document.getElementById('btnHapus');

let namaBankSelect = document.getElementById('namaBankSelect');
let idBank = document.getElementById('idBank');
let idReferensi = document.getElementById('idReferensi');
let mataUangSelect = document.getElementById('mataUangSelect');
let idMataUang = document.getElementById('idMataUang');
let totalNilai = document.getElementById('totalNilai');
let keterangan = document.getElementById('keterangan');
let jenisPembayaranSelect = document.getElementById('jenisPembayaranSelect');
let idJenisPembayaran = document.getElementById('idJenisPembayaran');
let noBukti = document.getElementById('noBukti');
var radiogrup2 = document.getElementsByName('radiogrup1');
let radiogrup1 = document.getElementById('radiogrup1');

let dataTable;

const tgl = new Date();
const formattedDate = tgl.toISOString().substring(0, 10);
tanggal.value = formattedDate;

//#region untuk ambil LIST BANK BKM
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
        idBank.value = idJenis;
    }
});
//#endregion

//#region
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
//#endregion

//#region jenis pembayaran
fetch("/jenispembayaran/")
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        jenisPembayaranSelect.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.innerText = "Pilih Jenis Pembayaran";
        jenisPembayaranSelect.appendChild(defaultOption);

        options.forEach((entry) => {
            const option = document.createElement("option");
            option.value = entry.Id_Jenis_Bayar;
            option.innerText = entry.Id_Jenis_Bayar + "|" + entry.Jenis_Pembayaran;
            jenisPembayaranSelect.appendChild(option);
        });
    });

jenisPembayaranSelect.addEventListener("change", function (event) {
    event.preventDefault();
    // console.log(idBank.value);
    const selectedOption = jenisPembayaranSelect.options[jenisPembayaranSelect.selectedIndex];
    if (selectedOption) {
        const idJenisInput = idJenisPembayaran;
        const selectedValue = selectedOption.textContent; // Nilai dari opsi yang dipilih (format: "id | nama")
        const idJenis = selectedValue.split("|")[0];
        idJenisInput.value = idJenis;
    }
});
//#endregion

btnOk.addEventListener('click', function (event) {
    event.preventDefault();
    // clickOK();
    fetch("/getTabelInformasiBank/" + tanggal.value)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);
            console.log(tanggal.value);

            tabelInfoBank = $("#tabelInfoBank").DataTable({
                destroy : true,
                data: options,
                columns: [
                    { title: "Id. Referensi", data: "IdReferensi" },
                    { title: "Nama Bank", data: "Nama_Bank" },
                    { title: "Mata Uang", data: "Nama_MataUang" },
                    { title: "Nilai", data: "Nilai" },
                    { title: "Keterangan", data: "Keterangan" },
                    { title: "Nama Customer", data: "NamaCust" },
                    { title: "Id. Bank", data: "Id_Bank" },
                    { title: "Id. Mata Uang", data: "Id_MataUang" },
                    { title: "Tipe Transaksi", data: "TypeTransaksi" },
                    { title: "Id. Jenis Bayar", data: "Id_Jenis_Bayar" },
                    { title: "Jenis Pembayaran", data: "Jenis_Pembayaran" },
                    { title: "No Bukti", data: "No_Bukti" }
                ],
            });
        });
});

$("#tabelInfoBank tbody").off("click", "tr");
$("#tabelInfoBank tbody").on("click", "tr", function () {
    let checkSelectedRows = $("#tabelInfoBank tbody tr.selected");

    if (checkSelectedRows.length > 0) {
        // Remove "selected" class from previously selected rows
        checkSelectedRows.removeClass("selected");
    }
    $(this).toggleClass("selected");
    const table = $("#tabelInfoBank").DataTable();
    let selectedRows = table.rows(".selected").data().toArray();
    console.log(selectedRows[0]);
    idBank.value = selectedRows[0].Id_Bank;
    idReferensi.value = selectedRows[0].IdReferensi;
    idMataUang.value = selectedRows[0].Id_MataUang;
    totalNilai.value = selectedRows[0].Nilai;
    keterangan.value = selectedRows[0].Keterangan;
    idJenisPembayaran.value = selectedRows[0].Id_Jenis_Bayar;
    noBukti.value = selectedRows[0].No_Bukti;

    const namaBank = selectedRows[0].Id_Bank;
    const options = namaBankSelect.options;
    for (let i = 0; i < options.length; i++) {
        if (options[i].value === namaBank) {
            // Setel select option jenisPembayaranSelect sesuai dengan opsi yang cocok
            namaBankSelect.selectedIndex = i;
            break;
        }
    };

    const matauang = selectedRows[0].Id_MataUang;
    const options2 = mataUangSelect.options;
    for (let i = 0; i < options2.length; i++) {
        if (options2[i].value === matauang) {
            // Setel select option jenisPembayaranSelect sesuai dengan opsi yang cocok
            mataUangSelect.selectedIndex = i;
            break;
        }
    };

    const jenisbayar = selectedRows[0].Id_Jenis_Bayar;
    const options3 = jenisPembayaranSelect.options;
    for (let i = 0; i < options2.length; i++) {
        if (options3[i].value === jenisbayar) {
            // Setel select option jenisPembayaranSelect sesuai dengan opsi yang cocok
            jenisPembayaranSelect.selectedIndex = i;
            break;
        }
    };

    for (var i = 0; i < radiogrup2.length; i++) {
        if (radiogrup2[i].value == selectedRows[0].TypeTransaksi) {
            radiogrup2[i].checked = true;
            break;
        }
    }

});

btnIsi.addEventListener("click", function (event) {
    event.preventDefault();
    btnSimpan.style.display = "block";
    btnIsi.style.display = "none";
    btnKoreksi.style.display = "none";
    btnBatal.style.display = "block";

    namaBankSelect.removeAttribute("readonly");
    idBank.removeAttribute("readonly");
    mataUangSelect.removeAttribute("readonly");
    idMataUang.removeAttribute("readonly");
    totalNilai.removeAttribute("readonly");
    keterangan.removeAttribute("readonly");
    jenisPembayaranSelect.removeAttribute("readonly");
    idJenisPembayaran.removeAttribute("readonly");
    noBukti.removeAttribute("readonly");

});

btnKoreksi.addEventListener("click", function (event) {
    event.preventDefault();
    btnBatal.style.display = "block";
    btnKoreksi.style.display = "none";
    btnIsi.style.display = "none";
    btnSimpanKoreksi.style.display = "block";

    namaBankSelect.removeAttribute("readonly");
    idBank.removeAttribute("readonly");
    mataUangSelect.removeAttribute("readonly");
    idMataUang.removeAttribute("readonly");
    totalNilai.removeAttribute("readonly");
    keterangan.removeAttribute("readonly");
    jenisPembayaranSelect.removeAttribute("readonly");
    idJenisPembayaran.removeAttribute("readonly");
    noBukti.removeAttribute("readonly");
});

$('#btnSimpan').on("click", function (event) {
    event.preventDefault();
})
function clickSimpan() {
    $.ajax({
        url: "MaintenanceInformasiBank",
        method: "POST",
        data: new FormData(formkoreksi),
        dataType: "JSON",
        contentType: false,
        cache: false,
        processData: false,
        success: function (response) {
            alert(response);
        },
    });

    fetch("/getTabelInformasiBank/" + tanggal.value)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);
            console.log(tanggal.value);

            tabelInfoBank = $("#tabelInfoBank").DataTable({
                destroy : true,
                data: options,
                columns: [
                    { title: "Id. Referensi", data: "IdReferensi" },
                    { title: "Nama Bank", data: "Nama_Bank" },
                    { title: "Mata Uang", data: "Nama_MataUang" },
                    { title: "Nilai", data: "Nilai" },
                    { title: "Keterangan", data: "Keterangan" },
                    { title: "Nama Customer", data: "NamaCust" },
                    { title: "Id. Bank", data: "Id_Bank" },
                    { title: "Id. Mata Uang", data: "Id_MataUang" },
                    { title: "Tipe Transaksi", data: "TypeTransaksi" },
                    { title: "Id. Jenis Bayar", data: "Id_Jenis_Bayar" },
                    { title: "Jenis Pembayaran", data: "Jenis_Pembayaran" },
                    { title: "No Bukti", data: "No_Bukti" }
                ],
            });
        });
};

btnSimpanKoreksi.addEventListener('click', function (event) {
    event.preventDefault();
})

function clickSimpanKoreksi() {
    methodkoreksi.value = "PUT";
    console.log(formkoreksi);
    $.ajax({
        url: "MaintenanceInformasiBank/" + idReferensi.value,
        method: "post",
        data: new FormData(formkoreksi),
        dataType: "JSON",
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        contentType: false,
        cache: false,
        processData: false,
        success: function (response) {
            alert(response);
        },
    });

    fetch("/getTabelInformasiBank/" + tanggal.value)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);
            console.log(tanggal.value);

            tabelInfoBank = $("#tabelInfoBank").DataTable({
                destroy : true,
                data: options,
                columns: [
                    { title: "Id. Referensi", data: "IdReferensi" },
                    { title: "Nama Bank", data: "Nama_Bank" },
                    { title: "Mata Uang", data: "Nama_MataUang" },
                    { title: "Nilai", data: "Nilai" },
                    { title: "Keterangan", data: "Keterangan" },
                    { title: "Nama Customer", data: "NamaCust" },
                    { title: "Id. Bank", data: "Id_Bank" },
                    { title: "Id. Mata Uang", data: "Id_MataUang" },
                    { title: "Tipe Transaksi", data: "TypeTransaksi" },
                    { title: "Id. Jenis Bayar", data: "Id_Jenis_Bayar" },
                    { title: "Jenis Pembayaran", data: "Jenis_Pembayaran" },
                    { title: "No Bukti", data: "No_Bukti" }
                ],
            });
        });
}

btnHapus.addEventListener('click', function (event) {
    event.preventDefault();
    methodkoreksi.value = "DELETE";
    formkoreksi.action = "/MaintenanceInformasiBank/" + idReferensi.value;
    formkoreksi.submit();
});

btnBatal.addEventListener('click', function (event) {
    event.preventDefault();

    namaBankSelect.selectedIndex = 0;
    idBank.value = "";
    mataUangSelect.selectedIndex = 0;
    idMataUang.value = "";
    totalNilai.value = "";
    keterangan.value = "";
    jenisPembayaranSelect.selectedIndex = 0;
    idJenisPembayaran.value = "";
    noBukti.value = "";
    idReferensi.value = "";
    var radioButtons = document.querySelectorAll('input[name="radiogrup1"]');
    // Mengulangi semua radio button dan menghapus centang
    radioButtons.forEach(function(radioButton) {
        radioButton.checked = false;
    });
    tabelInfoBank.clear().draw();

    namaBankSelect.setAttribute("readonly", true);
    idBank.setAttribute("readonly", true);
    mataUangSelect.setAttribute("readonly", true);
    idMataUang.setAttribute("readonly", true);
    totalNilai.setAttribute("readonly", true);
    keterangan.setAttribute("readonly", true);
    jenisPembayaranSelect.setAttribute("readonly", true);
    idJenisPembayaran.setAttribute("readonly", true);
    noBukti.setAttribute("readonly", true);
    idReferensi.setAttribute("readonly", true);

    btnBatal.style.display = "none";
    btnKoreksi.style.display = "block";
    btnIsi.style.display = "block";
    btnSimpanKoreksi.style.display = "none";
    btnSimpan.style.display = "none";
})
