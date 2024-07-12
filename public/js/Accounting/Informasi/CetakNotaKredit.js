let tanggal = document.getElementById('tanggal');
let namaCustomerSelect = document.getElementById('namaCustomerSelect');
let notaKredit = document.getElementById('notaKredit');
let btnCetak = document.getElementById('btnCetak');

let methodkoreksi = document.getElementById('methodkoreksi');
let formkoreksi = document.getElementById('formkoreksi');

let xnomor;
let statusPPN = document.getElementById('statusPPN');
let jnsNotaKredit = document.getElementById('jnsNotaKredit');

const tanggalPenagihan = new Date();
const formattedDate2 = tanggalPenagihan.toISOString().substring(0, 10);
tanggal.value = formattedDate2;

tanggal.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();

        fetch("/getListCetakNotaKredit/" + tanggal.value)
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
                option.value = entry.Id_NotaKredit; // Gunakan entry.IdCust sebagai nilai opsi
                option.innerText = entry.NamaCust + "|" + entry.Id_NotaKredit; // Gunakan entry.IdCust dan entry.NamaCust untuk teks opsi
                namaCustomerSelect.appendChild(option);
            });
        })
    }
})

namaCustomerSelect.addEventListener("change", function (event) {
    event.preventDefault();
    const selectedOption = namaCustomerSelect.options[namaCustomerSelect.selectedIndex];
    if (selectedOption) {
        const selectedValue = selectedOption.textContent; // Atau selectedOption.innerText
        const bagiansatu = selectedValue.split(/[-|]/);
        const namacust = bagiansatu[0];
        const idnota = bagiansatu[1];
        notaKredit.value = idnota;

        btnCetak.focus();
    }
});

btnCetak.addEventListener('click', function(event) {
    event.preventDefault();

    // DisplaySuratJalan();
    fetch("/getIdSuratJalanNotaKredit/" + notaKredit.value)
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        xnomor = "";
        if (xnomor !== "") {
            xnomor = xnomor + ", ";
        }
        xnomor = xnomor + options[0].SuratJalan;

        console.log(xnomor);
    })


    fetch("/getDisplayDetailNotaKredit/" + notaKredit.value)
    .then((response) => response.json())
    .then((options) => {
        console.log(options);

        statusPPN.value = options[0].Status_PPN;
        jnsNotaKredit.value = options[0].JnsNotaKredit;

        console.log(jnsNotaKredit.value);

        if (jnsNotaKredit.value == 1) {
            fetch("/getSFilter1/" + notaKredit.value)
            .then((response) => response.json())
            .then((options) => {
                console.log(options);
            })
        } else if (jnsNotaKredit.value == 2) {
            fetch("/getSFilter2/" + notaKredit.value)
            .then((response) => response.json())
            .then((options) => {
                console.log(options);
            })
        } else if (jnsNotaKredit.value == 3) {
            fetch("/getSFilter3/" + notaKredit.value)
            .then((response) => response.json())
            .then((options) => {
                console.log(options);
            })
        } else if (jnsNotaKredit.value == 5) {
            fetch("/getSFilter4/" + notaKredit.value)
            .then((response) => response.json())
            .then((options) => {
                console.log(options);
            })
        }
    })

    // DisplayDetail();

    // if (jnsNotaKredit.value == 1) {
    //     fetch("/getSFilter1/" + notaKredit.value)
    //     .then((response) => response.json())
    //     .then((options) => {
    //         console.log(options);
    //     })
    // } else if (jnsNotaKredit.value == 2) {
    //     fetch("/getSFilter2/" + notaKredit.value)
    //     .then((response) => response.json())
    //     .then((options) => {
    //         console.log(options);
    //     })
    // } else if (jnsNotaKredit.value == 3) {
    //     fetch("/getSFilter3/" + notaKredit.value)
    //     .then((response) => response.json())
    //     .then((options) => {
    //         console.log(options);
    //     })
    // } else if (jnsNotaKredit.value == 5) {
    //     fetch("/getSFilter4/" + notaKredit.value)
    //     .then((response) => response.json())
    //     .then((options) => {
    //         console.log(options);
    //     })
    // }
})

let suratJalanArray = [];
function DisplaySuratJalan() {
    fetch("/getIdSuratJalanNotaKredit/" + notaKredit.value)
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        xnomor = "";
        if (xnomor !== "") {
            xnomor = xnomor + ", ";
        }
        xnomor = xnomor + options[0].SuratJalan;

        console.log(xnomor);
    })
};

function DisplayDetail() {
    fetch("/getDisplayDetailNotaKredit/" + notaKredit.value)
    .then((response) => response.json())
    .then((options) => {
        console.log(options);

        statusPPN.value = options[0].Status_PPN;
        jnsNotaKredit.value = options[0].JnsNotaKredit;
    })
}
