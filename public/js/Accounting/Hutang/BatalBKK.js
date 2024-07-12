let bulanTahun = document.getElementById('bulanTahun');
let idBKKSelect = document.getElementById('idBKKSelect');
let kasKecil = document.getElementById('kasKecil');
let kasBesar = document.getElementById('kasBesar');
let mataUang = document.getElementById('mataUang');
let nilaiBKK = document.getElementById('nilaiBKK');
let alasan = document.getElementById('alasan');
let statusBatal = document.getElementById('statusBatal');
let statusPelunasan = document.getElementById('statusPelunasan');

let methodkoreksi = document.getElementById("methodkoreksi");
let formkoreksi = document.getElementById("formkoreksi");

bulanTahun.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        if (kasBesar.checked) {
            fetchData("/getIdBKKBesar/" + bulanTahun.value);
        } else if (kasKecil.checked) {
            fetchData("/getIdBKKKecil/" + bulanTahun.value);
        }
    }
});

function populateOptions(options) {
    idBKKSelect.innerHTML = "";

    const defaultOption = document.createElement("option");
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.innerText = "Id BKK";
    idBKKSelect.appendChild(defaultOption);

    options.forEach((entry) => {
        const option = document.createElement("option");
        option.value = entry.Id_BKK;
        option.innerText = entry.Id_BKK;
        idBKKSelect.appendChild(option);
    });
}

function fetchData(endpoint) {
    fetch(endpoint)
        .then((response) => response.json())
        .then((options) => {
            populateOptions(options);
        });
};

idBKKSelect.addEventListener('change', function(event) {
    event.preventDefault();
    if (idBKKSelect.value) { // Check if a valid idBKM is selected
        fetch("/getListBKKBtlBKK/" + idBKKSelect.value)
            .then((response) => response.json())
            .then((options) => {
                console.log(options);

                if (options[0].Status_Penagihan == 'N') {
                    statusPenagihan.value = options[0].Status_Penagihan + "o Penagihan"
                } else {
                    statusPenagihan.value = options[0].Status_Penagihan + "es Penagihan"
                }
                mataUang.value = options[0].Nama_MataUang;
                nilaiBKK.value = options[0].Nilai_Pembulatan;
                alasan.value = options[0].Alasan;

                const tglInput = options[0].Batal;
                const [tanggal1, waktu] = tglInput.split(" ");
                options[0].Batal = tanggal1;
                statusBatal.value = tanggal1;

                // statusBatal.value =options[0].Batal;

                fetch("/getCheckBtlBKK/" + idBKKSelect.value) // Ganti URL sesuai dengan rute Anda
                .then((response) => response.json())
                .then((result) => {
                    const adaData = result[0].Ada > 0; // Memeriksa apakah ada data (nilai 1)

                    // Lakukan sesuatu berdasarkan keberadaan data
                    if (adaData) {
                        statusPelunasan.value = "SUDAH Melunasi Kartu Hutang";
                    } else {
                        statusPelunasan.value = "BELUM Melunasi Kartu Hutang";
                        btnProses.disabled = false;
                    }
                });

                if (alasan.value == "") {
                    btnProses.disabled = false;
                    alasan.focus();
                    return;
                } else {
                    idBKKSelect.focus();
                }
            });
    }
});

alasan.addEventListener('keypress', function(event){
    if (event.key == "Enter") {
        event.preventDefault();
        btnProses.focus();
    }
});

btnProses.addEventListener('click', function(event) {
    event.preventDefault();

    $.ajax({
        url: "UraianBKK",
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

    // methodkoreksi.value = "PUT";
    // formkoreksi.action = "/BatalBKK/" + idBKKSelect.value;
    // formkoreksi.submit();
});


