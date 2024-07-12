let kasKecil = document.getElementById('kasKecil');
let kasBesar = document.getElementById('kasBesar');
let btnOK = document.getElementById('btnOK');
let bulan = document.getElementById('bulan');
let tahun = document.getElementById('tahun');
let BlnThn = document.getElementById('BlnThn');
let tabelKiri = document.getElementById('tabelKiri');
let dataTable = $("#tabelKiri").DataTable();
let dataTable2 = $("#tabelListRincian").DataTable();
let btnProses = document.getElementById('btnProses');
let methodkoreksi = document.getElementById('methodkoreksi');
let formkoreksi = document.getElementById('formkoreksi');

//Card kanan
let rincianPembayaran = document.getElementById('rincianPembayaran');
let nilaiRincian = document.getElementById('nilaiRincian');
let kodePerkiraanSelect = document.getElementById('kodePerkiraanSelect');
let idKodePerkiraan = document.getElementById('idKodePerkiraan');
let idDetail = document.getElementById('idDetail');
let idBayar = document.getElementById('idBayar');

let idBKM = document.getElementById('idBKM');

let selectedRow = null;
let rincianPelunasan;

let IdPelunasan = document.getElementById('IdPelunasan');

btnOK.addEventListener('click', function(event) {
    event.preventDefault();
    BlnThn.value = (bulan.value).toString() + (tahun.value).substring(2).toString();

    // Hapus data yang ada dalam tabel sebelum menambahkan data baru
    if (dataTable) {
        dataTable.clear().draw();
    }

    // Memanggil fungsi untuk menampilkan data sesuai dengan radiobutton yang dicentang
    if (kasKecil.checked) {
        fetchData("/getIdBKMBatal5/" + BlnThn.value);
    } else if (kasBesar.checked) {
        fetchData("/getIdBKMBatal6/" + BlnThn.value);
    }
});

function fetchData(url) {
console.log(url);
    fetch(url)
    .then((response) => response.json())
    .then((options) => {
        // Filter data berdasarkan ID_BKM yang dipilih
        // const filteredOptions = options.filter(option => selectedIdBKMs.includes(option.Id_BKM));
        console.log(options);
        // Menambahkan data ke dalam tabel
        dataTable = $("#tabelKiri").DataTable({
            destroy:true,
            data: options,
            columns: [
                { title: "Id. BKM", data: "Id_BKM" },
                { title: "Bank", data: "Id_bank" },
                { title: "Jns. Lunas", data: "Jenis_Pembayaran" },
                { title: "Mata Uang", data: "Symbol" },
                { title: "Nilai Pelunasan", data: "Nilai_Pelunasan" }
            ]
        });
    });
}

$("#tabelKiri tbody").off("click", "tr");
$("#tabelKiri tbody").on("click", "tr", function () {
    let checkSelectedRows = $("#tabelKiri tbody tr.selected");

    if (checkSelectedRows.length > 0) {
        // Remove "selected" class from previously selected rows
        checkSelectedRows.removeClass("selected");
    }
    $(this).toggleClass("selected");
    const table = $("#tabelKiri").DataTable();
    let selectedRows = table.rows(".selected").data().toArray();
    console.log(selectedRows[0]);
    idBKM.value = selectedRows[0].Id_BKM;
    console.log(idBKM.value);
    fetch("/getlistrincian/" + idBKM.value)
    .then((response) => response.json())
    .then((options) => {
        console.log(options);

        // Cek kondisi berdasarkan data yang diterima dari server
        if (options && options.length > 0) {
            const firstItem = options[0]; // Ambil data pertama dari array
             // Inisialisasi variabel untuk menampung nilai Rincian Pelunasan

            if (firstItem.Status_Penagihan === "Y") {
                // Jika Status_Penagihan adalah "Y", cek Id_Penagihan
                if (firstItem.ID_Penagihan !== null) {
                    rincianPelunasan = firstItem.ID_Penagihan;
                } else {
                    // Jika Id_Penagihan null, gunakan Ket
                    rincianPelunasan = firstItem.Keterangan;
                }
            } else {
                // Jika Status_Penagihan bukan "Y", gunakan Uraian
                rincianPelunasan = firstItem.Uraian;
            }
            // Selanjutnya, inisialisasikan DataTable dengan data yang diterima
            dataTable2 = $("#tabelListRincian").DataTable({
                destroy: true,
                data: options,
                columns: [
                    {
                        title: "Rincian Pelunasan",
                        data: function (row) {
                            return String(rincianPelunasan);
                        },
                    },// Gunakan nilai yang sudah ditentukan
                    { title: "Nilai Rincian", data: "Nilai_Lunas" },
                    { title: "Kd. Perkiraan", data: "Kode_Perkiraan" },
                    { title: "IdDetail", data: "ID_Detail_Pelunasan" },
                    { title: "IdLunas", data: "Id_Pelunasan" }
                ]
            });

            // Jika Anda perlu melakukan sesuatu setelah DataTable diperbarui,
            // Anda dapat menambahkannya di sini.
        } else {
            // Jika data kosong atau terjadi kesalahan
            // Tampilkan pesan atau lakukan tindakan yang sesuai di sini.
            console.log("Tidak ada data yang ditemukan atau terjadi kesalahan.");
        }
    })
});

$("#tabelListRincian tbody").off("click", "tr");
$("#tabelListRincian tbody").on("click", "tr", function () {
    let checkSelectedRows = $("#tabelListRincian tbody tr.selected");

    if (checkSelectedRows.length > 0) {
        // Remove "selected" class from previously selected rows
        checkSelectedRows.removeClass("selected");
    }
    $(this).toggleClass("selected");
    const table = $("#tabelListRincian").DataTable();
    let selectedRows = table.rows(".selected").data().toArray();
    console.log(selectedRows[0]);
    console.log(rincianPelunasan);
    rincianPembayaran.value = selectedRows[0].Expr1;
    nilaiRincian.value = selectedRows[0].Nilai_Lunas;
    idDetail.value = selectedRows[0].ID_Detail_Pelunasan;
    idBayar.value = selectedRows[0].Id_Pelunasan;

    const kodePerkiraan = selectedRows[0].Kode_Perkiraan;
    const options2 = kodePerkiraanSelect.options;
        for (let i = 0; i < options2.length; i++) {
            if (options2[i].value === kodePerkiraan) {
                // Setel select option jenisPembayaranSelect sesuai dengan opsi yang cocok
                kodePerkiraanSelect.selectedIndex = i;
                const selectedOption = kodePerkiraanSelect.options[kodePerkiraanSelect.selectedIndex];
                if (selectedOption) {
                    const selectedValue = selectedOption.value; // Nilai dari opsi yang dipilih (format: "id | nama")
                    const idkp = selectedValue.split(" | ")[0];
                    idKodePerkiraan.value = idkp;
                }
                break;
            }
        };
    kodePerkiraanSelect.focus();
    console.log(rincianPembayaran.value);
});

//#region ambil list kode perkiraan
fetch("/getkodeperkiraan/")
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        kodePerkiraanSelect.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.innerText = "Kode Perkiraan";
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
        const selectedValue = selectedOption.value; // Nilai dari opsi yang dipilih (format: "id | nama")
        const idkp = selectedValue.split(" | ")[0];
        idKodePerkiraan.value = idkp;
    }
});
//#endregion

btnProses.addEventListener('click', function(event) {
    event.preventDefault();

    methodkoreksi.value="PUT";
    //console.log(methodkoreksi.value);
    formkoreksi.action = "/KodePerkiraanBKM/" + idKodePerkiraan.value;
    // console.log(idBayar.value);
    formkoreksi.submit();
});
