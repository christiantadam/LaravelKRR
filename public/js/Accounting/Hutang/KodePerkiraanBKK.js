let kasKecil = document.getElementById('kasKecil');
let kasBesar = document.getElementById('kasBesar');
let btnOK = document.getElementById('btnOK');
let bulan = document.getElementById('bulan');
let tahun = document.getElementById('tahun');
let BlnThn = document.getElementById('BlnThn');
let tabelatas = $("#tabelatas").DataTable();
let tabelbawah = $("#tabelbawah").DataTable();
let rincianPembayaran = document.getElementById('rincianPembayaran');
let nilaiRincian = document.getElementById('nilaiRincian');
let kodePerkiraanSelect = document.getElementById('kodePerkiraanSelect');
let idKodePerkiraan = document.getElementById('idKodePerkiraan');
let idDetail = document.getElementById('idDetail');
let idBayar = document.getElementById('idBayar');
let idBKK = document.getElementById('idBKK');

let btnProses = document.getElementById('btnProses');

let methodkoreksi = document.getElementById('methodkoreksi');
let formkoreksi = document.getElementById('formkoreksi');

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

btnOK.addEventListener('click', function(event) {
    event.preventDefault();
    BlnThn.value = (bulan.value).toString() + (tahun.value).substring(2).toString();

    // Hapus data yang ada dalam tabel sebelum menambahkan data baru
    if (tabelatas) {
        tabelatas.clear().draw();
    }

    // Memanggil fungsi untuk menampilkan data sesuai dengan radiobutton yang dicentang
    if (kasKecil.checked) {
        fetchData("/getIdBKKKdPrk/" + BlnThn.value);
    } else if (kasBesar.checked) {
        fetchData("/getIdBKKKdPrk2/" + BlnThn.value);
    }
});

function fetchData(url) {
console.log(url);
    fetch(url)
    .then((response) => response.json())
    .then((options) => {
        // // Filter data berdasarkan ID_BKM yang dipilih
        // // const filteredOptions = options.filter(option => selectedIdBKKs.includes(option.Id_BKK));
        console.log(options);
        // Menambahkan data ke dalam tabel
        tabelatas = $("#tabelatas").DataTable({
            destroy:true,
            data: options,
            columns: [
                { title: "Id. BKK", data: "Id_BKK" },
                { title: "Bank", data: "Id_Bank" },
                { title: "Jns.Bayar", data: "Jenis_Pembayaran" },
                { title: "Mata Uang", data: "Symbol" },
                { title: "Nilai Pembayaran", data: "Nilai_Pembulatan" }
            ]
        });
    });
};

$("#tabelatas tbody").off("click", "tr");
$("#tabelatas tbody").on("click", "tr", function () {
    let checkSelectedRows = $("#tabelatas tbody tr.selected");

    if (checkSelectedRows.length > 0) {
        // Remove "selected" class from previously selected rows
        checkSelectedRows.removeClass("selected");
    }
    $(this).toggleClass("selected");
    const table = $("#tabelatas").DataTable();
    let selectedRows = table.rows(".selected").data().toArray();
    console.log(selectedRows[0]);
    idBKK.value = selectedRows[0].Id_BKK;
    fetch("/getTabelRincianBKK/" + idBKK.value)
    .then((response) => response.json())
    .then((options) => {
        console.log(options);

        tabelbawah = $("#tabelbawah").DataTable({
            destroy: true,
            data: options,
            columns: [
                { title: "Rincian Bayar", data: "Rincian_Bayar" },
                { title: "Nilai Rincian", data: "Nilai_Rincian" },
                { title: "Kd. Perkiraan", data: "Kode_Perkiraan" },
                { title: "Id. Detail", data: "Id_Detail_Bayar" },
                { title: "Id. Bayar", data: "Id_Pembayaran" }
            ]
        });
    })
})

$("#tabelbawah tbody").off("click", "tr");
$("#tabelbawah tbody").on("click", "tr", function () {
    let checkSelectedRows = $("#tabelbawah tbody tr.selected");

    if (checkSelectedRows.length > 0) {
        // Remove "selected" class from previously selected rows
        checkSelectedRows.removeClass("selected");
    }
    $(this).toggleClass("selected");
    const table = $("#tabelbawah").DataTable();
    let selectedRows = table.rows(".selected").data().toArray();
    console.log(selectedRows[0]);

    rincianPembayaran.value = selectedRows[0].Rincian_Bayar;
    nilaiRincian.value = selectedRows[0].Nilai_Rincian;
    idDetail.value = selectedRows[0].Id_Detail_Bayar;
    idBayar.value = selectedRows[0].Id_Pembayaran;

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
    btnProses.disabled = false;
});

btnProses.addEventListener('click', function(event) {
    event.preventDefault();

    methodkoreksi.value="PUT";
    //console.log(methodkoreksi.value);
    formkoreksi.action = "/KodePerkiraanBKK/" + idDetail.value;
    // console.log(idBayar.value);
    formkoreksi.submit();
});
