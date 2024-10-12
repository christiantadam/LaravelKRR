var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

let dataTable;
let btnPilihNotaKredit = document.getElementById('btnPilihNotaKredit');
let formkoreksi = document.getElementById('formkoreksi');
let methodkoreksi = document.getElementById('methodkoreksi');
let idCustomer = document.getElementById('idCustomer');
let noNotaKredit = document.getElementById('noNotaKredit');
let idPenagihan = document.getElementById('idPenagihan');
let methodTampilBKK = document.getElementById('methodTampilBKK');
let formTampilBKK = document.getElementById('formTampilBKK');
let idPelunasan = document.getElementById('idPelunasan');
let idPembayaran = document.getElementById('idPembayaran');
let btnKoreksi = document.getElementById('btnKoreksi');
let btnBatal = document.getElementById('btnBatal');
let btnProses = document.getElementById('btnProses');
let btnTampilBKM = document.getElementById('btnTampilBKM');
let btn_mtUang = document.getElementById('btn_mtUang');
let btn_bank = document.getElementById('btn_bank');

let jumlah = document.getElementById('jumlah');

let idMataUangBKM = document.getElementById('idMataUangBKM');
let mataUangBKMSelect = document.getElementById('mataUangBKMSelect');
let namaBankBKMSelect = document.getElementById('namaBankBKMSelect');
let idBankBKM = document.getElementById('idBankBKM');
let kodePerkiraanSelectBKM = document.getElementById('kodePerkiraanSelectBKM');
let idKodePerkiraanBKM = document.getElementById('idKodePerkiraanBKM');
let uraianBKM = document.getElementById('uraianBKM');
let jumlahUangBKM = document.getElementById('jumlahUangBKM');
let kursRupiah = document.getElementById('kursRupiah');

//CARD BKK
let idBKK = document.getElementById('idBKK');
let jumlahUangBKK = document.getElementById('jumlahUangBKK');
let namaBankBKKSelect = document.getElementById('namaBankBKKSelect');
let idBankBKK = document.getElementById('idBankBKK');
let jenisBankBKK = document.getElementById('jenisBankBKK');
let kodePerkiraanBKKSelect = document.getElementById('kodePerkiraanBKKSelect');
let idKodePerkiraanBKK = document.getElementById('idKodePerkiraanBKK');
let uraianBKK = document.getElementById('uraianBKK');

let NoNotaKredit;
let NoPenagihan;
let idMtUang;
let IdCust;
let tglNota;
let bulan = document.getElementById('bulan');
let tahun = document.getElementById('tahun');
let jmlUang;
let id_bkm = document.getElementById('id_bkm');
let id_bkk = document.getElementById('id_bkk');
let idUang;

let total1;
let total2;
let nilai = document.getElementById('nilai');
let nilai1 = document.getElementById('nilai1');
let konversi = document.getElementById('konversi');
let konversi1 = document.getElementById('konversi1');
let nilaiUang = document.getElementById('nilaiUang');
let lastCheckedCheckbox = null;
let rowData;

//MODAL TAMPIL BKK
let idBKKTampil = document.getElementById('idBKKTampil');
let btnCetakBKK = document.getElementById('btnCetakBKK');
let btnOkTampilBKK = document.getElementById('btnOkTampilBKK');
let tanggalTampilBKK = document.getElementById('tanggalTampilBKK');
let tanggalTampilBKK2 = document.getElementById('tanggalTampilBKK2');
let tabelTampilBKK = document.getElementById('tabelTampilBKK');

//MODAL TAMPIL BKM
let idBKMTampil = document.getElementById('idBKMTampil');
let btnCetakBKM = document.getElementById('btnCetakBKM');
let btnOkTampilBKM = document.getElementById('btnOkTampilBKM');
let tanggalTampilBKM = document.getElementById('tanggalTampilBKM');
let tanggalTampilBKM2 = document.getElementById('tanggalTampilBKM2');
let tabelTampilBKM = document.getElementById('tabelTampilBKM');

const tanggalPenagihan = new Date();
const formattedDate2 = tanggalPenagihan.toISOString().substring(0, 10);
tanggal.value = formattedDate2;

const tglTampilBKM = new Date();
const formattedDate3 = tglTampilBKM.toISOString().substring(0, 10);
tanggalTampilBKM.value = formattedDate3;

const tglTampilBKM2 = new Date();
const formattedDate4 = tglTampilBKM2.toISOString().substring(0, 10);
tanggalTampilBKM2.value = formattedDate4;

const tglTampilBKK = new Date();
const formattedDate5 = tglTampilBKK.toISOString().substring(0, 10);
tanggalTampilBKK.value = formattedDate5;

const tglTampilBKK2 = new Date();
const formattedDate6 = tglTampilBKK2.toISOString().substring(0, 10);
tanggalTampilBKK2.value = formattedDate6;

tanggal.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();

        var tanggalInput = new Date(tanggal.valueAsNumber);
        var currentDate = new Date();
        if (tanggalInput > currentDate) {
            alert("Tanggal SALAH!");
        } else {
            mataUangBKMSelect.focus();
        }
    }
});

var tableData = [];

function initializeDataTable(data) {
    if ($.fn.DataTable.isDataTable('#tabelNotaKredit')) {
        $('#tabelNotaKredit').DataTable().clear().destroy();
    }

    // Create and append the checkbox container if it doesn't exist
    if ($('#checkboxContainer').length === 0) {
        $('.table-responsive').before('<div id="checkboxContainer"></div>');
    }

    table = $('#tabelNotaKredit').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        data: data,
        scrollY: data.length > 0 ? '300px' : '',
        autoWidth: false,
        columns: [
            { title: 'Customer' },
            { title: 'Tgl. Nota Kredit' },
            { title: 'No. Nota Kredit' },
            { title: 'No. Penagihan' },
            { title: 'Jenis Nota Kredit' },
            { title: 'Jumlah Uang' },
            { title: 'Mata Uang' }
        ],
        columnDefs: [
            { targets: 0, width: '20%' },
            { targets: 1, width: '20%' },
            { targets: 2, width: '20%' },
            { targets: 3, width: '20%' },
            { targets: 4, width: '20%' },
            { targets: 5, width: '20%' },
            { targets: 6, width: '20%' }
        ]
    });
}

function tampilDataNota() {
    fetch("/getDataNotaKredit/")
        .then((response) => response.json())
        .then((options) => handleResponse(options));

    const handleResponse = (options) => {
        if (options.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Tidak Ada Nota Kredit',
                returnFocus: false
            });
        } else {
            tableData = [];
            const checkboxContainer = $('#checkboxContainer');
            checkboxContainer.empty();

            options.forEach(function (item) {
                var date = new Date(item.Tanggal);
                var formattedDate = date.toLocaleDateString();

                const checkboxHtml = `<input type="checkbox" name="divisiCheckbox" value="${escapeHtml(item.NamaCust.trim())}" /> ${escapeHtml(item.NamaCust.trim())}`;

                tableData.push([
                    checkboxHtml,
                    escapeHtml(formattedDate),
                    escapeHtml(item.Id_NotaKredit),
                    escapeHtml(item.Id_Penagihan),
                    escapeHtml(item.NamaNotaKredit),
                    parseFloat(item.Nilai).toLocaleString(),
                    escapeHtml(item.Nama_MataUang),
                    escapeHtml(item.Id_MataUang),
                    escapeHtml(item.Id_Customer)
                ]);
            });

            initializeDataTable(tableData);
        }
    }
}

tampilDataNota();

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


document.getElementById('tabelNotaKredit').addEventListener('change', function (event) {
    if (event.target.getAttribute('name') === 'divisiCheckbox') {
        const checkbox = event.target;

        if (checkbox.checked) {
            if (lastCheckedCheckbox && lastCheckedCheckbox !== checkbox) {
                lastCheckedCheckbox.checked = false;
            }
            lastCheckedCheckbox = checkbox;

            const tableRow = checkbox.closest('tr');
            const rowIndex = tableRow.rowIndex - 1;

            let selectedData = tableData[rowIndex];
            selectedData[0] = selectedData[0].match(/value="([^"]+)"/)[1];
            // console.log('Selected Data after :', selectedData);

            if (idCustomer) {
                idCustomer.value = selectedData[8];
            }
            if (idPenagihan) {
                idPenagihan.value = selectedData[3];
            }
            if (noNotaKredit) {
                noNotaKredit.value = selectedData[2];
            }
        } else {
            if (idCustomer) {
                idCustomer.value = '';
            }
            if (idPenagihan) {
                idPenagihan.value = '';
            }
            if (noNotaKredit) {
                noNotaKredit.value = '';
            }
        }
    }
});


btnPilihNotaKredit.addEventListener('click', function (event) {
    event.preventDefault();

    if (lastCheckedCheckbox) {
        const tableRow = lastCheckedCheckbox.closest('tr');
        const rowIndex = tableRow.rowIndex - 1;
        let selectedData = tableData[rowIndex];

        console.log('Selected Data:', selectedData);

        NoNotaKredit = selectedData[2];
        NoPenagihan = selectedData[3];
        idMtUang = selectedData[7];
        IdCust = selectedData[8];
        tglNota = selectedData[1];
        jmlUang = selectedData[5];

        nilaiUang.value = numeral(jmlUang).value();

        for (var i = 0; i < selectedData.length; i++) {
            if (selectedData[i] && selectedData[i][5]) {
                nilaiUang.value += numeral(selectedData[i][5]).value();
            }
        }

        nilaiUang.value = numeral(nilaiUang.value).format("0,0.00");
        jumlahUangBKM.value = numeral(numeral(selectedData[5]).value()).format("0,0.00");

        const dateObject = new Date();
        const tglInput = new Date(dateObject);
        tglInput.setDate(tglInput.getDate() + 1);
        const formattedDate = tglInput.toISOString().substr(0, 10);
        tanggal.value = formattedDate2;

        bulan.value = dateObject.getMonth() + 1;
        tahun.value = dateObject.getFullYear();

        console.log('Bulan:', bulan.value);
        console.log('Tahun:', tahun.value);
        console.log('Nilai Uang:', nilaiUang.value);

        tanggal.removeAttribute("readonly");
        mataUangBKMSelect.removeAttribute("readonly");
        kursRupiah.removeAttribute("readonly");
        jumlahUangBKM.removeAttribute("readonly");
        namaBankBKMSelect.removeAttribute("readonly");
        idBankBKM.removeAttribute("readonly");
        // jenisBankBKM.removeAttribute("readonly");
        idKodePerkiraanBKM.removeAttribute("readonly");
        kodePerkiraanSelectBKM.removeAttribute("readonly");
        uraianBKM.removeAttribute("readonly");
        btn_mtUang.removeAttribute("disabled");
        btn_bank.removeAttribute("disabled");
    } else {
        // Handle case where no checkbox is selected (optional)
        console.log('No row selected.');
    }
});


kursRupiah.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        kursRupiah.value = parseFloat(kursRupiahInput.value.replace(/[^0-9.]/g, '')).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

        if (kursRupiah.value = 0) {
            alert('Nilai kurs Rupiah harus lebih besar dari 0!');
        } else {
            if (idMataUangBKM.value == 1 && idMtUang == 2) {
                console.log('masuk');
                let nilaipelunasan = parseFloat(kursRupiah.value) * parseFloat(jumlahUang.value);
                let saldorp = parseFloat(kursRupiah.value) * saldo;

                jumlahUang.value = nilaipelunasan.toFixed(2);

                console.log(nilaipelunasan, saldorp);

                if (nilaipelunasan > saldorp) {
                    alert('Jumlah Uang TIDAK BOLEH lebih besar dari Saldo Pelunasan!');
                    jumlahUang.focus();
                }
            }
        }
    }
});


//#region ambil list mata uang
function handleTableKeydown(e, tableId) {
    const table = $(`#${tableId}`).DataTable();
    const rows = $(`#${tableId} tbody tr`);
    const rowCount = rows.length;

    if (e.key === "Enter") {
        e.preventDefault();
        const selectedRow = table.row(".selected").data();
        if (selectedRow) {
            Swal.getConfirmButton().click();
        } else {
            const firstRow = $(`#${tableId} tbody tr:first-child`);
            if (firstRow.length) {
                firstRow.click();
                Swal.getConfirmButton().click();
            }
        }
    }
    else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (currentIndex === null || currentIndex >= rowCount - 1) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        rows.removeClass("selected");
        const selectedRow = $(rows[currentIndex]).addClass("selected");
        scrollRowIntoView(selectedRow[0]);
    }
    else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (currentIndex === null || currentIndex <= 0) {
            currentIndex = rowCount - 1;
        } else {
            currentIndex--;
        }
        rows.removeClass("selected");
        const selectedRow = $(rows[currentIndex]).addClass("selected");
        scrollRowIntoView(selectedRow[0]);
    }
    else if (e.key === "ArrowRight") {
        e.preventDefault();
        const pageInfo = table.page.info();
        if (pageInfo.page < pageInfo.pages - 1) {
            table.page('next').draw('page').on('draw', function () {
                currentIndex = 0;
                const newRows = $(`#${tableId} tbody tr`);
                const selectedRow = $(newRows[currentIndex]).addClass("selected");
                scrollRowIntoView(selectedRow[0]);
            });
        }
    }
    else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const pageInfo = table.page.info();
        if (pageInfo.page > 0) {
            table.page('previous').draw('page').on('draw', function () {
                currentIndex = 0;
                const newRows = $(`#${tableId} tbody tr`);
                const selectedRow = $(newRows[currentIndex]).addClass("selected");
                scrollRowIntoView(selectedRow[0]);
            });
        }
    }
}

function scrollRowIntoView(rowElement) {
    rowElement.scrollIntoView({ block: 'nearest' });
}

btn_mtUang.addEventListener("click", function (e) {
    e.preventDefault();
    try {
        Swal.fire({
            title: 'Mata Uang',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID Mata Uang</th>
                            <th scope="col">Nama Mata Uang</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: '40%',
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Select',
            didOpen: () => {
                const table = $("#table_list").DataTable({
                    responsive: true,
                    processing: true,
                    serverSide: true,
                    paging: false,
                    scrollY: '400px',
                    scrollCollapse: true,
                    order: [0, "asc"],
                    ajax: {
                        url: "getmatauang",
                        type: "GET",
                        data: {
                            _token: csrfToken
                        }
                    },
                    columns: [
                        { data: "Id_MataUang" },
                        { data: "Nama_MataUang" }
                    ],
                    columnDefs: [
                        {
                            targets: 0,
                            width: '100px',
                        }
                    ]
                });

                $("#table_list tbody").on("click", "tr", function () {
                    table.$("tr.selected").removeClass("selected");
                    $(this).addClass("selected");
                    scrollRowIntoView(this);
                });

                const searchInput = $('#table_list_filter input');
                if (searchInput.length > 0) {
                    searchInput.focus();
                }

                currentIndex = null;
                Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
            }
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(result);

                idUang = result.value.Id_MataUang.trim();
                mataUangBKMSelect.value = result.value.Nama_MataUang.trim();

                if (result.value.Id_Mata_Uang !== idMtUang) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Karena mata uang yg dipilih tdk sama dgn mata uang BKM DP-nya, isikan nilai kurs-nya.',
                        returnFocus: false
                    }).then(() => {
                        kursRupiah.focus();
                    });
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});
//#endregion

//#region untuk ambil LIST BANK BKM
btn_bank.addEventListener("click", function (e) {
    e.preventDefault();
    try {
        Swal.fire({
            title: 'Bank',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID Bank</th>
                            <th scope="col">Nama Bank</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: '40%',
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Select',
            didOpen: () => {
                const table = $("#table_list").DataTable({
                    responsive: true,
                    processing: true,
                    serverSide: true,
                    paging: false,
                    scrollY: '400px',
                    scrollCollapse: true,
                    order: [0, "asc"],
                    ajax: {
                        url: "getbank",
                        type: "GET",
                        data: {
                            _token: csrfToken
                        }
                    },
                    columns: [
                        { data: "Id_Bank" },
                        { data: "Nama_Bank" }
                    ],
                    columnDefs: [
                        {
                            targets: 0,
                            width: '100px',
                        }
                    ]
                });

                $("#table_list tbody").on("click", "tr", function () {
                    table.$("tr.selected").removeClass("selected");
                    $(this).addClass("selected");
                    scrollRowIntoView(this);
                });

                const searchInput = $('#table_list_filter input');
                if (searchInput.length > 0) {
                    searchInput.focus();
                }

                currentIndex = null;
                Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
            }
        }).then((result) => {
            if (result.isConfirmed) {
                idBankBKM.value = result.value.Id_Bank.trim();
                namaBankBKMSelect.value = result.value.Nama_Bank.trim();

                if (idBankBKM.value !== '') {
                    $.ajax({
                        type: 'GET',
                        url: "detailjenisbank",
                        data: {
                            _token: csrfToken,
                            idBankBKM: idBankBKM.value
                        },
                        success: function (result) {
                            jenisBankBKM.value = result.jenis.trim();
                        },
                        error: function (xhr, status, error) {
                            console.error('Error:', error);
                        }
                    });
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

fetch("/getbank/")
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        namaBankBKMSelect.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.innerText = "Bank";
        namaBankBKMSelect.appendChild(defaultOption);

        options.forEach((entry) => {
            const option = document.createElement("option");
            option.value = entry.Id_Bank;
            option.innerText = entry.Id_Bank + "|" + entry.Nama_Bank;
            namaBankBKMSelect.appendChild(option);
        });

    });

namaBankBKMSelect.addEventListener("change", function (event) {
    event.preventDefault();
    // console.log(idBank.value);
    const selectedOption = namaBankBKMSelect.options[namaBankBKMSelect.selectedIndex];
    if (selectedOption) {
        //const idJenisInput = document.getElementById('idBank');
        const selectedValue = selectedOption.value; // Nilai dari opsi yang dipilih (format: "id | nama")
        const idJenis = selectedValue.split("|")[0];
        idBankBKM.value = idJenis;
        //console.log(idBank.value);
        fetch("/detailjenisbank/" + idBankBKM.value)
            .then((response) => response.json())
            .then((options) => {
                jenisBankBKM.value = options[0].jenis;
                console.log(options);
            });
    }
});
//#endregion

//#region ambil list kode perkiraan
fetch("/getkodeperkiraan/")
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        kodePerkiraanSelectBKM.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.innerText = "Kode Perkiraan";
        kodePerkiraanSelectBKM.appendChild(defaultOption);

        options.forEach((entry) => {
            const option = document.createElement("option");
            option.value = entry.NoKodePerkiraan;
            option.innerText = entry.NoKodePerkiraan + "|" + entry.Keterangan;
            kodePerkiraanSelectBKM.appendChild(option);
        });
    });

kodePerkiraanSelectBKM.addEventListener("change", function (event) {
    event.preventDefault();
    const selectedOption = kodePerkiraanSelectBKM.options[kodePerkiraanSelectBKM.selectedIndex];
    if (selectedOption) {
        const selectedValue = selectedOption.value; // Nilai dari opsi yang dipilih (format: "id | nama")
        const idkp = selectedValue.split(" | ")[0];
        idKodePerkiraanBKM.value = idkp;
    }
});
//#endregion

uraianBKM.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        jenis = 'P';

        if (idBKM.value === "") {
            if (idBankBKM.value == "KRR1") {
                idBankBKM.value = "KI";
            }
            else if (idBankBKM.value == "KRR2") {
                idBankBKM.value = "KKM";
            }
        } else {
            idBankBKM = idBankBKM.value;
        }

        fetch("/getidBKMNota/" + idBankBKM.value + "/" + tanggal.value)
            .then((response) => response.json())
            .then((options) => {
                console.log(options);
                idBKM.value = options;

                id_bkm.value = (idBKM.value).substring(4);
                console.log(id_bkm.value);
            });

        tanggal.setAttribute("readonly", true);
        idBKM.setAttribute("readonly", true);
        mataUangBKMSelect.setAttribute("readonly", true);
        kursRupiah.setAttribute("readonly", true);
        mataUangBKMSelect.setAttribute("readonly", true);
        jumlahUangBKM.setAttribute("readonly", true);
        idBankBKM.setAttribute("readonly", true);
        namaBankBKMSelect.setAttribute("readonly", true);
        idKodePerkiraanBKM.setAttribute("readonly", true);
        kodePerkiraanSelectBKM.setAttribute("readonly", true);
        uraianBKM.setAttribute("readonly", true);

        //Untuk card bkk
        jumlahUangBKK.removeAttribute("readonly");
        namaBankBKKSelect.removeAttribute("readonly");
        idBankBKK.removeAttribute("readonly");
        jenisBankBKK.removeAttribute("readonly");
        idKodePerkiraanBKK.removeAttribute("readonly");
        kodePerkiraanBKKSelect.removeAttribute("readonly");
        uraianBKK.removeAttribute("readonly");
    }
});

//UNTUK CARD BKK
jumlahUangBKK.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        jumlah.value = parseFloat(jumlahUangBKK.value).toFixed(2);
        console.log(nilaiUang.value);
        let nilai = parseFloat(nilaiUang.value);
        // let kurs = parseFloat(kursRupiah.value);

        if (jumlah === '0.00') {
            alert('Jumlah Uang TIDAK BOLEH = 0 !');
            jumlahUangBKK.focus();
        } else if (jumlah.value != nilai) {
            alert('Jumlah Uang TIDAK BOLEH berbeda !');
            var formattedValue = nilai.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            jumlahUangBKK.value = formattedValue;
            // console.log(jumlahUangBKK.value);
        } else {
            namaBankBKKSelect.focus();
        }
    }
});

//#region untuk ambil LIST BANK BKM
fetch("/getbank/")
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        namaBankBKKSelect.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.innerText = "Bank";
        namaBankBKKSelect.appendChild(defaultOption);

        options.forEach((entry) => {
            const option = document.createElement("option");
            option.value = entry.Id_Bank;
            option.innerText = entry.Id_Bank + "|" + entry.Nama_Bank;
            namaBankBKKSelect.appendChild(option);
        });

    });

namaBankBKKSelect.addEventListener("change", function (event) {
    event.preventDefault();
    // console.log(idBank.value);
    const selectedOption = namaBankBKKSelect.options[namaBankBKKSelect.selectedIndex];
    if (selectedOption) {
        //const idJenisInput = document.getElementById('idBank');
        const selectedValue = selectedOption.value; // Nilai dari opsi yang dipilih (format: "id | nama")
        const idJenis = selectedValue.split("|")[0];
        idBankBKK.value = idJenis;
        //console.log(idBank.value);
        fetch("/detailjenisbank/" + idBankBKK.value)
            .then((response) => response.json())
            .then((options) => {
                jenisBankBKK.value = options[0].jenis;
                console.log(options);
            });
    }
});
//#endregion

//#region ambil list kode perkiraan
fetch("/getkodeperkiraan/")
    .then((response) => response.json())
    .then((options) => {
        console.log(options);
        kodePerkiraanBKKSelect.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.innerText = "Kode Perkiraan";
        kodePerkiraanBKKSelect.appendChild(defaultOption);

        options.forEach((entry) => {
            const option = document.createElement("option");
            option.value = entry.NoKodePerkiraan;
            option.innerText = entry.NoKodePerkiraan + "|" + entry.Keterangan;
            kodePerkiraanBKKSelect.appendChild(option);
        });
    });

kodePerkiraanBKKSelect.addEventListener("change", function (event) {
    event.preventDefault();
    const selectedOption = kodePerkiraanBKKSelect.options[kodePerkiraanBKKSelect.selectedIndex];
    if (selectedOption) {
        const selectedValue = selectedOption.value; // Nilai dari opsi yang dipilih (format: "id | nama")
        const idkp = selectedValue.split(" | ")[0];
        idKodePerkiraanBKK.value = idkp;
    }
});
//#endregion

uraianBKK.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        jenis = 'P';
        console.log("masuk");

        if (idBKK.value === "") {
            if (idBankBKK.value == "KRR1") {
                idBankBKK.value = "KI";
            }
            else if (idBankBKK.value == "KRR2") {
                idBankBKK.value = "KKM";
            }
        } else {
            idBankBKK = idBankBKK.value;
        }

        fetch("/getidBKKNota/" + idBankBKK.value + "/" + tanggal.value)
            .then((response) => response.json())
            .then((options) => {
                console.log(options);
                idBKK.value = options;

                id_bkk.value = (idBKK.value).substring(4);
                console.log(id_bkk.value);
            });

        jumlahUangBKK.setAttribute("readonly", true);
        namaBankBKKSelect.setAttribute("readonly", true);
        idBankBKK.setAttribute("readonly", true);
        jenisBankBKK.setAttribute("readonly", true);
        idKodePerkiraanBKK.setAttribute("readonly", true);
        kodePerkiraanBKKSelect.setAttribute("readonly", true);
        uraianBKK.setAttribute("readonly", true);
        btnProses.focus();
    }
});

btnProses.addEventListener('click', function (event) {
    event.preventDefault();
    if (idBKM.value != "" || idBKK.value != "") {
        nilai1.value = parseFloat(jumlahUangBKM.value);
        total2 = nilai1.toString();
        // console.log("masuk");
        if (parseInt(idMataUangBKM.value) == 1) {
            konversi.value = F_Rupiah(total2); // Menggunakan fungsi F_Rupiah jika kondisi terpenuhi
        } else {
            konversi.value = F_Dollar(total2); // Menggunakan fungsi F_DOLLAR jika kondisi tidak terpenuhi
        }

        nilai.value = parseFloat(jumlahUangBKK.value);
        total1 = nilai.toString();
        if (parseInt(idMataUangBKM.value) == 1) {
            konversi1.value = F_Rupiah(total2); // Menggunakan fungsi F_Rupiah jika kondisi terpenuhi
        } else {
            konversi1.value = F_Dollar(total2); // Menggunakan fungsi F_DOLLAR jika kondisi tidak terpenuhi
        }
    }
    else {
        console.log("Tidak Ada Yg diPROSES!");
    }

    fetch("/getIdPelunasanNota/")
        .then((response) => response.json())
        .then((options) => {
            console.log(options);
            idPelunasan.value = options.Id_Pelunasan;
            console.log(idPelunasan.value);

            //formkoreksi.submit();
        });

    fetch("/getIdPembayaranNota/")
        .then((response) => response.json())
        .then((options) => {
            console.log(options);
            idPembayaran.value = options.Id_Pembayaran;
            console.log(idPembayaran.value);

            //formkoreksi.submit();
        });
    // console.log(idBKK.value);
    formkoreksi.submit();
})

//#region untuk koversi jumlah uang
function F_Rupiah() {
    var formatted = parseFloat(nilai1.value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    return formatted;
}
function F_Dollar() {
    var formatted = parseFloat(nilai1.value).toFixed(2);
    return formatted;
}
//#endregion

btnTampilBKM.addEventListener('click', function (event) {
    event.preventDefault();
    modalTampilBKM = $("#modalTampilBKM");
    modalTampilBKM.modal('show');
});

btnOkTampilBKM.addEventListener('click', function (event) {
    event.preventDefault();
    fetch("/getTabelTampilBKMNota/" + tanggalTampilBKM.value + "/" + tanggalTampilBKM2.value)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);
            tabelTampilBKM = $("#tabelTampilBKM").DataTable({
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
                    { title: "Id. BKM", data: "Id_BKM" },
                    {
                        title: "Nilai Pelunasan", data: "Nilai_Pelunasan",
                        render: function (data) {
                            // Mengubah format angka ke format dengan koma
                            return parseFloat(data).toLocaleString();
                        },
                    },
                    { title: "Terjemahan", data: "Terjemahan" },
                ]
            });

            tabelTampilBKM.on('change', 'input[name="dataCheckbox"]', function () {
                $('input[name="dataCheckbox"]').not(this).prop('checked', false);

                if ($(this).prop("checked")) {
                    const checkedCheckbox = tabelTampilBKM.row($(this).closest('tr')).data();
                    idBKMTampil.value = checkedCheckbox.Id_BKM;
                } else {
                    idBKMTampil.value = "";
                }
            });
        });
});

btnCetakBKM.addEventListener('click', function (event) {
    event.preventDefault();

    fetch("/getCetakBKMBKKNotaKredit/" + idBKMTampil.value)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);
        })


    // methodTampilBKM.value="PUT";
    // formTampilBKM.action = "/BKMBKKNotaKredit/" + idBKMTampil.value;
    // console.log(idBKM.value);
    // formTampilBKM.submit();
});

//#region MODAL TAMPIL BKM
btnTampilBKK.addEventListener('click', function (event) {
    event.preventDefault();
    modalTampilBKK = $("#modalTampilBKK");
    modalTampilBKK.modal('show');
});

btnOkTampilBKK.addEventListener('click', function (event) {
    event.preventDefault();
    fetch("/getTabelTampilBKKNota/" + tanggalTampilBKK.value + "/" + tanggalTampilBKK2.value)
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
                    {
                        title: "Nilai Pelunasan", data: "Nilai_Pembulatan",
                        render: function (data) {
                            // Mengubah format angka ke format dengan koma
                            return parseFloat(data).toLocaleString();
                        },
                    },
                    { title: "Terjemahan", data: "Terjemahan" },
                ]
            });

            tabelTampilBKK.on('change', 'input[name="dataCheckbox"]', function () {
                $('input[name="dataCheckbox"]').not(this).prop('checked', false);

                if ($(this).prop("checked")) {
                    const checkedCheckbox = tabelTampilBKK.row($(this).closest('tr')).data();
                    idBKKTampil.value = checkedCheckbox.Id_BKK;
                } else {
                    idBKKTampil.value = "";
                }
            });
        });
});

btnCetakBKK.addEventListener('click', function (event) {
    event.preventDefault();

    if ($('input[name="dataCheckbox"]:checked').length === 0) {
        alert("Pilih 1 Id.BKK Untuk DiCetak!");
        return;
    }
    methodTampilBKK.value = "PUT";
    formTampilBKK.action = "/BKMBKKNotaKredit/" + idBKKTampil.value;
    console.log(idBKKTampil.value);
    formTampilBKK.submit();
});
//#endregion

btnKoreksi.addEventListener('click', function (event) {
    event.preventDefault();
    if (idBKM.value != "") {
        tanggal.removeAttribute("readonly");
        mataUangBKMSelect.removeAttribute("readonly");
        namaBankBKMSelect.removeAttribute("readonly");
        idBankBKM.removeAttribute("readonly");
        jenisBankBKM.removeAttribute("readonly");
        idKodePerkiraanBKM.removeAttribute("readonly");
        kodePerkiraanSelectBKM.removeAttribute("readonly");
        uraianBKM.removeAttribute("readonly");
    }
});

btnBatal.addEventListener('click', function (event) {
    tanggal.value = "";
    bulan.value = "";
    tahun.value = "";
    idBKM.value = "";
    id_bkm.value = "";
    idMataUangBKM.value = "";
    mataUangBKMSelect.selectedIndex = 0;
    kursRupiah.value = "";
    jumlahUangBKM.value = "";
    namaBankBKMSelect.selectedIndex = 0;
    idBankBKM.value = "";
    jenisBankBKM.value = "";
    kodePerkiraanSelectBKM.selectedIndex = 0;
    idKodePerkiraanBKM.value = "";
    uraianBKM.value = "";

    idBKK.value = "";
    id_bkk.value = "";
    jumlahUangBKK.value = "";
    namaBankBKKSelect.selectedIndex = 0;
    idBankBKK.value = "";
    jenisBankBKK.value = "";
    kodePerkiraanBKKSelect.selectedIndex = 0;
    idKodePerkiraanBKK.value = "";
    uraianBKK.value = "";
})
