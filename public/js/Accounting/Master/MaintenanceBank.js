// let idBank = document.getElementById("idBank");
// let namaBankselect = document.getElementById("namaBankselect");
// let jenisBankSelect = document.getElementById("jenisBankSelect");
// let statusAktif = document.getElementById("statusAktif");
// let kodePerkiraanSelect = document.getElementById("kodePerkiraanSelect");
// let noRekening = document.getElementById("noRekening");
// let saldoBank = document.getElementById("saldoBank");
// let alamat = document.getElementById("alamat");
// let kota = document.getElementById("kota");
// let telp = document.getElementById("telp");
// let person = document.getElementById("person");
// let hp = document.getElementById("hp");
// let isiNamaBank = document.getElementById("isiNamaBank");
// let kodePerkiraan = document.getElementById("kodePerkiraan");
// let ketKodePerkiraan = document.getElementById("ketKodePerkiraan");
// let proses;
// var hiddenInput;

// let btnIsi = document.getElementById("btnIsi");
// let btnKoreksi = document.getElementById("btnKoreksi");
// let btnHapus = document.getElementById("btnHapus");
// let btnProses = document.getElementById("btnProses");
// let btnKeluar = document.getElementById("btnKeluar");
// let btnBatal = document.getElementById("btnBatal");

// let formkoreksi = document.getElementById("formkoreksi");
// let methodform = document.getElementById("methodkoreksi");

// btnIsi.addEventListener('click', function (event) {
//     event.preventDefault();
// })

// btnBatal.addEventListener('click', function (event) {
//     event.preventDefault();
//     // clickBatal();
//     idBank.value = "";
//     jenisBankSelect.checked = false;
//     namaBankselect.selectedIndex = 0;
//     statusAktif.checked = false;
//     kodePerkiraanSelect.value = "";
//     noRekening.value = "";
//     saldoBank.value = "";
//     alamat.value = "";
//     kota.value = "";
//     telp.value = "";
//     person.value = "";
//     hp.value = "";
//     isiNamaBank.value = "";
//     ketKodePerkiraan.value = "";
//     kodePerkiraan.value ="";
// });

// btnProses.addEventListener('click', function (event) {
//     event.preventDefault();
// })

// btnKoreksi.addEventListener('click', function (event) {
//     event.preventDefault();
// });

// btnHapus.addEventListener('click', function(event) {
//     event.preventDefault();
// })

// function clickIsi() {
//     idBank.disabled = false;
//     namaBankselect.disabled = false;
//     jenisBankSelect.disabled = false;
//     statusAktif.disabled = false;
//     ketKodePerkiraan.disabled = false;
//     kodePerkiraanSelect.disabled = false;
//     noRekening.disabled = false;
//     saldoBank.disabled = false;
//     alamat.disabled = false;
//     kota.disabled = false;
//     kota.disabled = false;
//     telp.disabled = false;
//     person.disabled = false;
//     hp.disabled = false;

//     namaBankselect.style.display = "none";
//     isiNamaBank.style.display = "block";
//     btnIsi.disabled = true;
//     btnKoreksi.disabled = true;
//     btnHapus.disabled = true;
//     btnProses.disabled = false;
//     //btnKeluar.style.display = "none";
//     btnBatal.style.display = "block";
//     proses = 1;
// }

// function clickBatal() {
//     namaBankselect.style.display = "block";
//     isiNamaBank.style.display = "none";
//     btnIsi.disabled = false;
//     btnKoreksi.disabled = false;
//     btnHapus.disabled = false;
//     btnProses.disabled = true;
//     btnBatal.style.display = "none";

//     idBank.disabled = true;
//     namaBankselect.disabled = true;
//     kodePerkiraanSelect.disabled = true;
//     ketKodePerkiraan.disabled = true;
//     noRekening.disabled = true;
//     saldoBank.disabled = true;
//     alamat.disabled = true;
//     kota.disabled = true;
//     telp.disabled = true;
//     person.disabled = true;
//     hp.disabled = true;
// }

// function clickKoreksi() {
//     idBank.disabled = false;
//     namaBankselect.disabled = false;
//     jenisBankSelect.disabled = false;
//     statusAktif.disabled = false;
//     ketKodePerkiraan.disabled = false;
//     kodePerkiraanSelect.disabled = false;
//     noRekening.disabled = false;
//     saldoBank.disabled = false;
//     alamat.disabled = false;
//     kota.disabled = false;
//     kota.disabled = false;
//     telp.disabled = false;
//     person.disabled = false;
//     hp.disabled = false;

//     btnIsi.disabled = true
//     btnKoreksi.disabled = true;
//     btnHapus.disabled = true;
//     btnProses.disabled = false;
//     btnBatal.style.display = "block";
//     proses = 2;
// }

// function clickHapus() {
//     idBank.disabled = false;
//     namaBankselect.disabled = false;
//     jenisBankSelect.disabled = false;
//     statusAktif.disabled = false;
//     ketKodePerkiraan.disabled = false;
//     kodePerkiraanSelect.disabled = false;
//     noRekening.disabled = false;
//     saldoBank.disabled = false;
//     alamat.disabled = false;
//     kota.disabled = false;
//     kota.disabled = false;
//     telp.disabled = false;
//     person.disabled = false;
//     hp.disabled = false;

//     btnIsi.disabled = true
//     btnKoreksi.disabled = true;
//     btnHapus.disabled = true;
//     btnProses.disabled = false;
//     btnBatal.style.display = "block";
//     proses = 3;
// }

// fetch("/getkodeperkiraan/")
//     .then((response) => response.json())
//     .then((options) => {
//         console.log(options);
//         kodePerkiraanSelect.innerHTML = "";

//         const defaultOption = document.createElement("option");
//         defaultOption.disabled = true;
//         defaultOption.selected = true;
//         defaultOption.innerText = "Kode Perkiraan";
//         kodePerkiraanSelect.appendChild(defaultOption);

//         options.forEach((entry) => {
//             const option = document.createElement("option");
//             option.value = entry.NoKodePerkiraan;
//             option.innerText = entry.NoKodePerkiraan + "|" + entry.Keterangan;
//             kodePerkiraanSelect.appendChild(option);
//         });
// });

// btnProses.addEventListener ("click", function (event) {
//     event.preventDefault();
//     if (proses == 1) {
//         // console.log("masuk isi");
//         formkoreksi.submit();
//     } else if (proses == 2) {
//         //console.log("masuk korek");
//         methodform.value="PUT";
//         formkoreksi.action = "/MaintenanceBank/" + idBank.value;
//         formkoreksi.append(hiddenInput);
//         formkoreksi.submit();
//     } else if (proses == 3) {
//         methodform.value="DELETE";
//         formkoreksi.action = "/MaintenanceBank/" + idBank.value;
//         formkoreksi.submit();
//     }
// });
$(document).ready(function () {
    var dataTableBank = $("#table_Bank").DataTable({
        serverSide: true,
        responsive: true,
        ordering: false,
        ajax: {
            url: "MaintenanceBank/getAllBank",
            type: "GET",
        },
        columns: [
            { data: "Id_Bank" },
            { data: "Nama_Bank" },
            // { data: "IdUserMaster" },
            {
                data: "Id_Bank",
                render: function (data, type, full, meta) {
                    var rowID = data;
                    return (
                        '<button id="editButtonBank' +
                        rowID +
                        '" class="btn btn-primary" data-Bank-id="' +
                        rowID +
                        '" data-bs-toggle="modal" data-typeForm="koreksi" data-bs-target="#modalBank" type="button">Edit</button>' +
                        '<button class="btn btn-danger" data-id="' +
                        rowID +
                        '">Hapus</button>'
                    );
                },
            },
        ],
    });
    // variabel element halaman maintenance bank
    var csrfToken = $('meta[name="csrf-token"]').attr("content");
    let tambahButtonBank = document.getElementById("tambahButtonBank");

    // variabel element modal maintenance bank
    let modalBank = document.getElementById("modalBank");
    let modalLabelBank = document.getElementById("modalLabelBank");
    let formMaintenanceBank = document.getElementById("formMaintenanceBank");
    let typeKegiatanForm = document.getElementById("typeKegiatanForm");
    let idBank = document.getElementById("idBank");
    let isiNamaBank = document.getElementById("isiNamaBank");
    let jenisBankSelect_E = document.getElementById("jenisBankSelect_E");
    let jenisBankSelect_I = document.getElementById("jenisBankSelect_I");
    let statusAktif = document.getElementById("statusAktif");
    let ketKodePerkiraan = document.getElementById("ketKodePerkiraan");
    let kodePerkiraanSelect = document.getElementById("kodePerkiraanSelect");
    let noRekening = document.getElementById("noRekening");
    let saldoBank = document.getElementById("saldoBank");
    let alamat = document.getElementById("alamat");
    let kota = document.getElementById("kota");
    let telp = document.getElementById("telp");
    let person = document.getElementById("person");
    let hp = document.getElementById("hp");
    let prosesButtonModal = document.getElementById("prosesButtonModal");

    modalBank.addEventListener("shown.bs.modal", function (event) {
        let button = $(event.relatedTarget); // Button that triggered the modal
        let bankData = button.data();
        let typeform = button.data("typeform");
        typeKegiatanForm.value = typeform;
        console.log(bankData);
        let form = $("#formMaintenanceBank");

        if (typeform == "koreksi") {
            //setting up modal supaya bisa koreksi barang
            modalLabelBank.innerHTML = "Koreksi Bank";
            form.attr("action", "/MaintenanceBank/" + idBank.value);
            form.attr("method", "PUT");
            idBank.readOnly = true;
            isiNamaBank.style.display = "block";
            isiNamaBank.focus();
            prosesButtonModal.disabled = true;

            $.ajax({
                //Get data bank menurut ID
                url: "/MaintenanceBank/getCertainBank",
                method: "GET",
                data: {
                    idBank: idBank.value,
                },
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                },
                success: function (response) {
                    console.log(response);
                    idBank.value = button.data("bankId");
                    isiNamaBank.value = response[0].Nama_Bank;
                    kodePerkiraanSelect.value = response[0].KodePerkiraan;
                    noRekening.value = response[0].No_Rekening;
                    saldoBank.value = parseFloat(response[0].SaldoBank);
                    alamat.value = response[0].Alamat;
                    kota.value = response[0].Kota;
                    telp.value = response[0].No_Telp;
                    person.value = response[0].Nama_Person;
                    hp.value = response[0].No_HP;
                    if (response[0].Jenis_Bank == "E") {
                        jenisBankSelect_E.checked = true;
                    } else {
                        jenisBankSelect_I.checked = true;
                    }
                    if (response[0].Aktif == "Y") {
                        statusAktif.checked = true;
                    } else {
                        statusAktif.checked = false;
                    }
                    prosesButtonModal.disabled = false;
                },
                error: function (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Data Tidak Berhasil Disimpan!",
                    });
                    console.error("Error saving data:", error);
                },
            });
        } else if (typeform == "tambah") {
            modalLabelBank.innerHTML = "Tambah Bank";
            form.attr("action", "/MaintenanceBank/");
            form.attr("method", "POST");
            isiNamaBank.style.display = "block";
            idBank.focus();
        }
    });

    modalBank.addEventListener("hidden.bs.modal", function (event) {
        // Clear all input fields
        jenisBankSelect_E.checked = true;
        statusAktif.checked = true;
        formMaintenanceBank.querySelectorAll("input").forEach(function (input) {
            input.value = "";
            input.readOnly = false;
        });

        // Reset all select elements to their first option
        formMaintenanceBank
            .querySelectorAll("select")
            .forEach(function (select) {
                select.selectedIndex = 0;
            });

        // Optionally, reset textareas if you have any
        formMaintenanceBank
            .querySelectorAll("textarea")
            .forEach(function (textarea) {
                textarea.value = "";
            });
    });

    kodePerkiraanSelect.addEventListener("change", function (event) {
        event.preventDefault();
        const selectedOption =
            kodePerkiraanSelect.options[kodePerkiraanSelect.selectedIndex];
        if (selectedOption) {
            ketKodePerkiraan.value = selectedOption.value.split(" | ")[1]; // Nilai dari opsi yang dipilih (format: "id | nama")
        }
    });
});
