let bulanTahun = document.getElementById('bulanTahun');
let idBKMSelect = document.getElementById('idBKMSelect');
let kasKecil = document.getElementById('kasKecil');
let kasBesar = document.getElementById('kasBesar');
let statusPenagihan = document.getElementById('statusPenagihan');
let mataUang = document.getElementById('mataUang');
let nilaiBKM = document.getElementById('nilaiBKM');
let alasan = document.getElementById('alasan');
let btnProses = document.getElementById('btnProses');
let tanggalBatal = document.getElementById('tanggalBatal');

let methodkoreksi = document.getElementById("methodkoreksi");
let formkoreksi = document.getElementById("formkoreksi");

const tgl = new Date();
const formattedDate = tgl.toISOString().substring(0, 10);
tanggalBatal.value = formattedDate;

bulanTahun.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        if (kasBesar.checked) {
            fetchData("/getIdBKMBatal4/" + bulanTahun.value);
        } else if (kasKecil.checked) {
            fetchData("/getIdBKMBatal3/" + bulanTahun.value);
        }
    }
});

function populateOptions(options) {
    idBKMSelect.innerHTML = "";

    const defaultOption = document.createElement("option");
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.innerText = "Id BKM";
    idBKMSelect.appendChild(defaultOption);

    options.forEach((entry) => {
        const option = document.createElement("option");
        option.value = entry.Id_BKM;
        option.innerText = entry.Id_BKM;
        idBKMSelect.appendChild(option);
    });
}

function fetchData(endpoint) {
    fetch(endpoint)
        .then((response) => response.json())
        .then((options) => {
            populateOptions(options);
        });
};

idBKMSelect.addEventListener('change', function(event) {
    event.preventDefault();
    if (idBKMSelect.value) { // Check if a valid idBKM is selected
        fetch("/getDataBatalBKM/" + idBKMSelect.value)
            .then((response) => response.json())
            .then((options) => {
                console.log(options);
                statusPenagihan.value = options[0].Status_Penagihan;
                mataUang.value = options[0].Nama_MataUang;

                var nilaiNumber = parseFloat(options[0].Nilai_Pelunasan);
                var nilaiDalamFormatKoma = nilaiNumber.toLocaleString();
                nilaiBKM.value = nilaiDalamFormatKoma;
                alasan.value = options[0].Uraian;
            });

            fetch("/cekBatalBKK/" + idBKMSelect.value) // Ganti URL sesuai dengan rute Anda
            .then((response) => response.json())
            .then((result) => {
                console.log(result[0].Ada);
                const adaData = result[0].Ada > 0; // Memeriksa apakah ada data (nilai 1)

                // Lakukan sesuatu berdasarkan keberadaan data
                if (adaData) {
                    // Ada data, aktifkan elemen UI yang sesuai
                    alert("SUDAH Melunasi Kartu Hutang");
                } else {
                    // Tidak ada data, nonaktifkan elemen UI yang sesuai
                    alert("BELUM Melunasi Kartu Hutang");
                    btnProses.disabled = false;
                }
            });
    }
});

btnProses.addEventListener('click', function(event) {
    event.preventDefault();
    methodkoreksi.value="DELETE";
    formkoreksi.action = "/deletedata/" + idBKMSelect.value + "/" +alasan.value;
    formkoreksi.submit();
})





