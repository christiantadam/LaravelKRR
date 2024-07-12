let tanggal = document.getElementById('tanggal');
let tahun = document.getElementById('tahun');
let bulan = document.getElementById('bulan');
let tabelDataBKM = document.getElementById('tabelDataBKM');
let tabelRincianData = document.getElementById('tabelRincianData');
let idKodePerkiraan = document.getElementById('idKodePerkiraan');
let kodePerkiraanSelect = document.getElementById('kodePerkiraanSelect');
let uraian = document.getElementById('uraian');
let btnOK = document.getElementById("btnOK");
let dataTable;
let dataTable2;
let namaBankSelect = document.getElementById('namaBankSelect');
let jumlahUang = document.getElementById('jumlahUang');

//HIDDEN
let idBank = document.getElementById('idBank');
let jenisBank = document.getElementById('jenisBank');
let konversi = document.getElementById('konversi');
let idBKM = document.getElementById('idBKM');
let id_bkk = document.getElementById('id_bkk');

let btnPilihBKM = document.getElementById('btnPilihBKM');
let btnProses = document.getElementById('btnProses');
let btnBatal = document.getElementById('btnBatal');
let btnTampilBKK = document.getElementById('btnTampilBKK');
let btnOkTampilBKK = document.getElementById('btnOkTampilBKK');
let btnCetakBKK = document.getElementById('btnCetakBKK');

let tanggalTampilBKK = document.getElementById('tanggalTampilBKK');
let tanggalTampilBKK2 = document.getElementById('tanggalTampilBKK2');
let idBKKTampil = document.getElementById('idBKKTampil');
let formkoreksi = document.getElementById('formkoreksi');
let methodkoreksi = document.getElementById('methodkoreksi');

//UNTUK CETAK
let nomer = document.getElementById('nomer');
let tglCetak = document.getElementById('tglCetak');
let symbol = document.getElementById('symbol');
let nilaiPembulatan = document.getElementById('nilaiPembulatan');
let terbilangCetak = document.getElementById('terbilangCetak');
let jenispemb = document.getElementById('jenispemb');
let jatuhtempo = document.getElementById('jatuhtempo');
let rincianbayar = document.getElementById('rincianbayar');
let kodeperkiraan = document.getElementById('kodeperkiraan');
let nilairincian = document.getElementById('nilairincian');
let idBKMAcuan = document.getElementById('idBKMAcuan');
let tanggalBKM = document.getElementById('tanggalBKM');

const tgl = new Date();
const formattedDate2 = tgl.toISOString().substring(0, 10);
tanggal.value = formattedDate2;

const tglTampilBKK = new Date();
const formattedDate5 = tglTampilBKK.toISOString().substring(0, 10);
tanggalTampilBKK.value = formattedDate5;

const tglTampilBKK2 = new Date();
const formattedDate6 = tglTampilBKK2.toISOString().substring(0, 10);
tanggalTampilBKK2.value = formattedDate6;

const tglCtk = new Date();
const formattedDate3 = tglCtk.toISOString().substring(0, 10);
console.log(formattedDate3);
let tgl2 = ubahFormatTanggal(formattedDate3);
tglCetakForm.textContent = tgl2;

btnBatal.addEventListener('click', function(event) {
    event.preventDefault();
    bulan.value = "";
    tahun.value = "";
    dataTable.clear().draw();
    dataTable2.clear().draw();
    idBKM.value = "";
    id_bkk.value = "";
    idMataUang.value = "";
    idPembayaran.value = "";
    namaBankSelect.selectedIndex = 0;
    idBank.value = "";
    jenisBank.value = "";
    tanggal.value = "";
    idBKK.value = "";
    jumlahUang.value = "";
    kodePerkiraanSelect.value = "";
    idKodePerkiraan.value = "";
    uraian.value = "";
    konversi.value = "";
});

btnOK.addEventListener('click', function (event) {
    event.preventDefault();
    clickOK();
        fetch("/tabeldetailbkmbkk/" + bulan.value +"/"+ tahun.value)
            .then((response) => response.json())
            .then((options) => {
                console.log(options);
                dataTable = $("#tabelDataBKM").DataTable({
                    data: options,
                    columns: [
                        {
                            title: "No. BKM", data: "Id_BKM",
                            render: function (data) {
                                return `<input type="checkbox" name="divisiCheckbox" value="${data}" /> ${data}`;
                            },
                        },
                        { title: "Tgl. BKM", data: "Tgl_Input",
                            render: function (data) {
                                var date = new Date(data);
                                return date.toLocaleDateString();
                            }
                        },
                        { title: "Nilai Pelunasan", data: "Total",
                            render: function (data) {
                                // Mengubah format angka ke format dengan koma
                                return parseFloat(data).toLocaleString();
                            },
                        },
                    ],
                });
            });
});

$("#tabelDataBKM tbody").off("click", "input[type='checkbox'");
$("#tabelDataBKM tbody").off("change", "input[type='checkbox']");
// $("#tabelDataBKM tbody").on("change", "input[type='checkbox']", function () {
// });
$("#tabelDataBKM tbody").on("change", "input[type='checkbox']", function (event) {
    event.preventDefault();

    let rows = tabelDataBKM.getElementsByTagName("tr");
    selectedRows = [];
    for (let i = 1; i < rows.length; i++) {
        let cells = rows[i].cells;
        let checkbox = cells[0].getElementsByTagName("input")[0];
        if (checkbox.checked) {
            let rowData = {
                Id_BKM: cells[0].innerText,
            };
            selectedRows.push(rowData);
            idBKM.value = rowData['Id_BKM'];
            fetch("/tabeldetbiayabkmbkk/" + cells[0].innerText.trim())
                .then((response) => response.json())
                .then((options) => {
                    console.log(options);
                    dataTable2 = $("#tabelRincianData").DataTable({
                        data: options,
                        columns: [
                            {
                                title: "Customer", data: "NamaCust",
                                render: function (data) {
                                    return `<input type="checkbox" name="dataCheckbox" value="${data}" /> ${data}`;
                                },
                            },
                            { title: "No. Bukti", data: "No_Bukti" },
                            { title: "Invoice", data: "ID_Penagihan" },
                            { title: "Mata Uang", data: "Id_MataUang" },
                            { title: "Nilai Rincian", data: "Rincian",
                                render: function (data) {
                                    // Mengubah format angka ke format dengan koma
                                    return parseFloat(data).toLocaleString();
                                },
                            },
                            { title: "Id. Bank", data: "Id_bank" },
                            { title: "Id. Jenis", data: "Jenis_Bank" },
                            { title: "Id. Uang", data: "Id_MataUang" }
                        ],
                    });
                    // Setelah fetch selesai, masukkan data detail pelunasan ke dalam tabelDetailPelunasan
                    dataTable2.clear().rows.add(options).draw();
                });
        }
    }
});

$("#tabelRincianData tbody").off("click", "input[type='checkbox'");
$("#tabelRincianData tbody").off("change", "input[type='checkbox']");
// $("#tabelDataBKM tbody").on("change", "input[type='checkbox']", function () {
// });
$("#tabelRincianData tbody").on("change", "input[type='checkbox']", function (event) {
    event.preventDefault();

    let rowsRincianData = $("#tabelRincianData tbody tr");
    let rowsDataBKM = $("#tabelDataBKM tbody tr");
    selectedRows = [];

    // Iterate over the rows in tabelRincianData
    for (let i = 0; i < rowsRincianData.length; i++) {
        let cellsRincianData = rowsRincianData[i].cells;
        let checkbox = cellsRincianData[0].getElementsByTagName("input")[0];
        if (checkbox.checked) {
            // Assuming the row index in 'tabelDataBKM' corresponds to the row in 'tabelRincianData'
            let dataBKMRow = rowsDataBKM[i];
            if (dataBKMRow) {
                let dataBKMCells = dataBKMRow.cells;

                let rowData = {
                    Id_BKM: dataBKMCells[0].innerText,  // Assuming Id_BKM is in the first cell
                    NilaiPelunasan: dataBKMCells[1].innerText,  // Assuming NilaiPelunasan is in the second cell
                    Id_bank: cellsRincianData[5].innerText,
                    Jenis_Bank: cellsRincianData[6].innerText,
                    Jumlah_Uang: dataBKMCells[2].innerText,
                    Id_MataUang: cellsRincianData[7].innerText
                };
                selectedRows.push(rowData);
            }
        }
    }
    console.log(selectedRows);
});

btnPilihBKM.addEventListener('click', function(event) {
    event.preventDefault();
    jumlahUang.value = selectedRows[0].Jumlah_Uang;
    idMataUang.value = selectedRows[0].Id_MataUang;
    tanggal.focus();
});

tanggal.addEventListener('keypress', function(event) {
    if (event.key == "Enter") {
        event.preventDefault();
        const tanggalHariIni = new Date();
        const formattedDate2 = tanggalHariIni.toISOString().substring(0, 10);
        console.log(tanggalHariIni, tanggal.value);
        if (tanggal.value > formattedDate2) {
            alert('Tanggal SALAH!');
            tanggal.focus();
        } else {
            kodePerkiraanSelect.focus();
        }
    }
});

fetch("/getBankPembulatan/")
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
            option.value = entry.Id_Bank; // Gunakan entry.IdCust sebagai nilai opsi
            option.innerText = entry.Id_Bank + "|" + entry.Nama_Bank; // Gunakan entry.IdCust dan entry.NamaCust untuk teks opsi
            namaBankSelect.appendChild(option);
        });
});

namaBankSelect.addEventListener("change", function (event) {
    event.preventDefault();
    const selectedOption = namaBankSelect.options[namaBankSelect.selectedIndex];
    if (selectedOption) {
        const selectedValue = selectedOption.textContent; // Atau selectedOption.innerText
        const bagiansatu = selectedValue.split(/[-|]/);
        const jenis = bagiansatu[0];
        const idcust = bagiansatu[1];
        idBank.value = jenis;
    }

    fetch("/getJenisBankPembulatan/" + idBank.value)
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        jenisBank.value = options[0].jenis;
    });

})

fetch("/detailkodeperkiraan/" + 1)
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        kodePerkiraanSelect.innerHTML="";

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
        const idKodeInput = document.getElementById('idKodePerkiraan');
        const selectedValue = selectedOption.value;
        const idKode = selectedValue.split(" | ")[0];
        idKodeInput.value = idKode;
    }
    uraian.focus();
});

uraian.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        jenis = 'P';

        if (idBKK.value === "") {
            if (idBank.value == "KRR1") {
                idBank.value = "KI";
            }
            else if (idBank.value == "KRR2") {
                idBank.value = "KKM";
            }
        } else {
            idBank = idBank.value;
        }

        fetch("/getIDBKK/" + idBank.value + "/" + tanggal.value)
            .then((response) => response.json())
            .then((options) => {
                console.log(options);
                idBKK.value = options;

                id_bkk.value = (idBKK.value).substring(4);
            });

            konversi.value = numberToWords(jumlahUang.value);
            btnProses.focus();
    }
});

btnProses.addEventListener('click', function(event) {
    event.preventDefault();
    //formkoreksi.submit();
    // methodkoreksi.value="PUT";
    formkoreksi.action = "/insertUpdate/";
    formkoreksi.submit();
});

btnTampilBKK.addEventListener('click', function (event) {
    event.preventDefault();
    modalTampilBKK = $("#modalTampilBKK");
    modalTampilBKK.modal('show');
});

btnOkTampilBKK.addEventListener('click', function(event) {
    event.preventDefault();
    fetch("/getTabelTampilBKKPembulatan/" + tanggalTampilBKK.value + "/" + tanggalTampilBKK2.value)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);

            tabelTampilBKK = $("#tabelTampilBKK").DataTable({
                data: options,
                columns: [
                    {
                        title: "Tgl. Input", data: "Tgl_Input",
                        render: function (data) {
                            var date = new Date(data);
                            var formattedDate = date.toLocaleDateString();

                            return `<div>
                                        <input type="checkbox" name="dataCheckbox" value="${formattedDate}" />
                                        <span>${formattedDate}</span>
                                    </div>`;
                        }
                    },
                    { title: "Id. BKK", data: "Id_BKK" },
                    { title: "Nilai Pembulatan", data: "Nilai_Pembulatan",
                        render: function (data) {
                            // Mengubah format angka ke format dengan koma
                            return parseFloat(data).toLocaleString();
                        },
                    },
                    { title: "Terjemahan", data: "Terjemahan" },
                ]
            });

            tabelTampilBKK.on('change', 'input[name="dataCheckbox"]', function() {
                $('input[name="dataCheckbox"]').not(this).prop('checked', false);

                if ($(this).prop("checked")) {
                    const checkedCheckbox = tabelTampilBKK.row($(this).closest('tr')).data();
                    idBKKTampil.value = checkedCheckbox.Id_BKK;
                } else {
                    idBKKTampil.value = "";
                }
            });
        })
});;

btnCetakBKK.addEventListener('click', function (event) {
    event.preventDefault();
    console.log(idBKKTampil.value);

    fetch("/getCetakBKMBKKPembulatan/" + idBKKTampil.value)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);

            const tglInput = options[0].Tgl_Input;
            const [tanggal1, waktu] = tglInput.split(" ");
            options[0].TglInput = tanggal1;
            let tgl = ubahFormatTanggal(tanggal1);
            tglCetak.textContent = tgl;

            nomer.textContent = options[0].Id_BKK;
            symbol.textContent = options[0].Symbol;
            nilaiPembulatan.textContent = options[0].Nilai_Pembulatan;
            terbilangCetak.textContent = options[0].Terjemahan;
            jenispemb.textContent = options[0].No_BGCek;
            jatuhtempo.textContent = options[0].Jatuh_Tempo;
            rincianbayar.textContent = options[0].Rincian_Bayar;
            kodeperkiraan.textContent = options[0].Kode_Perkiraan;
            nilairincian.textContent = options[0].Nilai_Rincian;
            idBKMAcuan.textContent = options[0].Id_BKM_Acuan;
            symbol2.textContent = options[0].Symbol;

            const tglBKM = options[0].Tgl_Input;
            const [tanggal2, waktu2] = tglBKM.split(" ");
            options[0].TglInput = tanggal2;
            let tglbkm = ubahFormatTanggal(tanggal2);
            tanggalBKM.textContent = tglbkm;

            window.print();
        })
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
};

function ubahFormatTanggal(tanggal) {
    var bulanIndonesia = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    var tanggalTerpisah = tanggal.split("-");
    var bulan = bulanIndonesia[parseInt(tanggalTerpisah[1]) - 1];
    return tanggalTerpisah[2] + "/" + bulan + "/" + tanggalTerpisah[0];
};

const ones = ['', 'Satu ', 'Dua ', 'Tiga ', 'Empat ', 'Lima ', 'Enam ', 'Tujuh ', 'Delapan ', 'Sembilan ' ];
const teens = ['Sepuluh', 'Sebelas', 'Dua Belas', 'Tiga Belas', 'Empat Belas', 'Lima Belas', 'Enam Belas', 'Tujuh Belas', 'Delapan Belas', 'Sembilan Belas'];
const tens = ['', 'Sepuluh', 'Dua Puluh', 'Tiga Puluh', 'Empat Puluh', 'Lima Puluh', 'Enam Puluh', 'Tujuh Puluh', 'Delapan Puluh', 'Sembilan Puluh'];
const thousands = ['', 'Ribu', 'Juta', 'Miliar', 'Triliun'];

function numberToWords(number) {

  if (number === 0) {
    return 'Nol';
  }

  let result = '';

  // Convert each group of three digits
  for (let i = 0; number > 0; i++) {
    const currentGroup = number % 1000;
    if (currentGroup !== 0) {
      result = convertThreeDigitsToWords(currentGroup) + thousands[i] + ' ' + result;
    }
    number = Math.floor(number / 1000);
  }

  // Trim trailing whitespace and return the result
  return result.trim();
}

function convertThreeDigitsToWords(num) {
  let result = '';

  // Convert hundreds place
  const hundredsPlace = Math.floor(num / 100);
  if (hundredsPlace > 0) {
    result += ones[hundredsPlace] + ' Ratus ';
  }

  // Convert tens and ones place
  const remainder = num % 100;
  if (remainder < 10) {
    result += ones[remainder];
  } else if (remainder < 20) {
    result += teens[remainder - 10];
  } else {
    const tensPlace = Math.floor(remainder / 10);
    const onesPlace = remainder % 10;
    result += tens[tensPlace] + ' ' + ones[onesPlace];
  }

  return result;
}
