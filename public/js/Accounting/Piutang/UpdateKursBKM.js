let tahun = document.getElementById('tahun');
let bulan = document.getElementById('bulan');
let kursRupiah = document.getElementById('kursRupiah');
let idbkm = document.getElementById('idbkm');
let IdPelunasan = document.getElementById('IdPelunasan');

let btnOK = document.getElementById("btnOK");
let btnPilihBKM = document.getElementById('btnPilihBKM');
let btnProses = document.getElementById("btnProses");

let formkoreksi = document.getElementById("formkoreksi");
let methodkoreksi = document.getElementById("methodkoreksi");


btnOK.addEventListener('click', function (event) {
    event.preventDefault();
    clickOK();
        fetch("/tabelpelunasankurs/" + bulan.value +"/"+ tahun.value)
            .then((response) => response.json())
            .then((options) => {
                console.log(options);
                dataTable = $("#tabelDataPelunasan").DataTable({
                    destroy: true,
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
                        { title: "Total Pelunasan", data: "Nilai_Pelunasan" },
                        { title: "Rincian Pelunasan", data: "RincianPelunasan" },
                        { title: "Kode Perkiraan", data: "KodePerkiraan" },
                        { title: "Keterangan", data: "Uraian" },
                        { title: "Id. Pelunasan", data: "Id_Pelunasan" },
                    ],
                });
        });
});

document.getElementById('tabelDataPelunasan').addEventListener('change', function(event) {
    if (event.target.getAttribute('name') === 'divisiCheckbox') {
        const checkbox = event.target;

        if (checkbox.checked) {
            if (lastCheckedCheckbox && lastCheckedCheckbox !== checkbox) {
                lastCheckedCheckbox.checked = false;
            }
            lastCheckedCheckbox = checkbox;
            // Dapatkan elemen tr yang mengandung checkbox yang diperiksa
            const tableRow = checkbox.closest('tr');
            // Dapatkan semua elemen <td> dalam baris tersebut
            const tableCells = Array.from(tableRow.getElementsByTagName('td'));
            idbkm.value = tableCells[1].textContent;
            IdPelunasan.value = tableCells[7].textContent;
        }
    }
});

btnPilihBKM.addEventListener('click', function(event) {
    event.preventDefault();
    if (lastCheckedCheckbox) {
        console.log("masuk");
        rowData = dataTable.row($(lastCheckedCheckbox).closest('tr')).data();

        IdPelunasan.value = rowData['Id_Pelunasan'];
        idbkm.value = rowData['Id_BKM'];
        kursRupiah.focus();

        console.log(idbkm.value);
        console.log(IdPelunasan.value);
    }
});

kursRupiah.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        kursRupiah.value = parseFloat(kursRupiah.value.replace(/[^0-9.]/g, '')).toFixed(2).replace(/\d(?=(\d{10})+\.)/g, '$&,');

        if (kursRupiah.value == 0) {
            alert('Nilai kurs Rupiah harus lebih besar dari 0!');
        } else {
            btnProses.focus();
        }
    }
});

btnProses.addEventListener('click', function(event) {
    event.preventDefault();
    methodkoreksi.value="PUT";
    formkoreksi.action = "/UpdateKursBKM/" + idbkm.value;
    console.log(idbkm.value);
    formkoreksi.submit();
})

function clickOK() {
    let bulanValue = bulan.value;
    let tahunValue = tahun.value;
    if (bulanValue.trim() === '' || tahunValue.trim() === '') {
        alert('Harap isi bulan dan tahun terlebih dahulu!');
        return;
    }
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const selectedMonth = parseInt(bulanValue, 10);
    const selectedYear = parseInt(tahunValue, 10);

    if (selectedYear > currentYear || (selectedYear === currentYear && selectedMonth >= currentMonth)) {
        alert('TIDAK BOLEH CREATE BKM U/ BLN INI!!!');
        bulan.value = "";
        tahun.value = "";
        return;
    }
}
