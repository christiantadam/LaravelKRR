let idBKK = document.getElementById('idBKK');
let nilai = document.getElementById('nilai');
let tabelListBKK = $("#tabelListBKK").DataTable();
let idBayar = document.getElementById('idBayar');
let rincian = document.getElementById('rincian');
let nilaiRincian = document.getElementById('nilaiRincian');
let kodePerkiraanSelect = document.getElementById('kodePerkiraanSelect');
let idKodePerkiraan = document.getElementById('idKodePerkiraan');

let btnIsi = document.getElementById('btnIsi');
let btnProses = document.getElementById('btnProses');

let proses;

idBKK.addEventListener('keypress', function(event) {
    if (event.key == "Enter") {
        event.preventDefault();

        fetch("/getCheckBKKIdBKK/" + idBKK.value)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);

            if (options[0].Ada == 0) {
                alert("Tidak ada data BKK : " + idBKK.value)
            } else {
                fetch("/getListBKK/" + idBKK.value)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);

                    nilai.value = data[0].Nilai_Pembulatan;

                    tabelListBKK = $("#tabelListBKK").DataTable({
                        destroy: true,
                        data: data,
                        columns: [
                            { title: "Id. Detail", data: "Id_Detail_Bayar" },
                            { title: "Rincian", data: "Rincian_Bayar" },
                            { title: "Nilai Rincian", data: "Nilai_Rincian" },
                            { title: "Kd. Perkiraan", data: "Kode_Perkiraan" },
                            { title: "Id. Bayar", data: "Id_Pembayaran" }
                        ]
                    });
                })

                fetch("/getListBKKTotalIdBKK/" + idBKK.value)
                .then((response) => response.json())
                .then((list) => {
                    console.log(list);

                    total.value = list[0].Nilai;
                });
            }
        })
    }
});

let selectedRows = [];

$("#tabelListBKK tbody").off("click", "tr");
    $("#tabelListBKK tbody").on("click", "tr", function () {
        let checkSelectedRows = $("#tabelListBKK tbody tr.selected");

        if (checkSelectedRows.length > 0) {
            // Remove "selected" class from previously selected rows
            checkSelectedRows.removeClass("selected");
        }
        $(this).toggleClass("selected");
        const table = $("#tabelListBKK").DataTable();
        selectedRows = table.rows(".selected").data().toArray();
        console.log(selectedRows[0]);
});

btnIsi.addEventListener('click', function(event) {
    event.preventDefault();
    console.log(selectedRows[0]);

    idBayar.value = selectedRows[0].Id_Pembayaran;
    rincian.focus();
    proses = 1;
});

rincian.addEventListener('keypress', function(event) {
    if (event.key == "Enter") {
        event.preventDefault();
        nilaiRincian.focus();
    }
});

nilaiRincian.addEventListener('keypress', function(event) {
    if (event.key == "Enter") {
        event.preventDefault();
        kodePerkiraanSelect.focus();
    }
});

fetch("/detailkodeperkiraan/" + 1)
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
        const selectedValue = selectedOption.textContent;
        const idMU = selectedValue.split("|")[0];
        idKodePerkiraan.value = idMU;

        btnProses.focus();
    }
});

btnKoreksi.addEventListener('click', function(event) {
    event.preventDefault();
    proses = 2;
    console.log(selectedRows[0]);

    idDetail.value = selectedRows[0].Id_Detail_Bayar;
    rincian.value = selectedRows[0].Rincian_Bayar;
    nilaiRincian.value = selectedRows[0].Nilai_Rincian;
    idBayar.value = selectedRows[0].Id_Pembayaran;
    idKodePerkiraan.value = selectedRows[0].Kode_Perkiraan;

    let KP = idKodePerkiraan.value;
    let opt3 = kodePerkiraanSelect.options;
    for (let i = 0; i < opt3.length; i++) {
        if (opt3[i].value == KP) {
            kodePerkiraanSelect.selectedIndex = i;
            break;
    }};
    rincian.focus();
})

btnProses.addEventListener('click', function(event) {
    event.preventDefault();

    if (proses == 1) {

    } else if (proses == 2) {

    }
})
