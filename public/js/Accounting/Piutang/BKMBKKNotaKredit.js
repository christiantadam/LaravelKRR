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
let btnTampilBKK = document.getElementById('btnTampilBKK');
let jumlah = document.getElementById('jumlah');

//CARD BKM
let idBKM = document.getElementById('idBKM');
let idMataUangBKM = document.getElementById('idMataUangBKM');
let mataUangBKMSelect = document.getElementById('mataUangBKMSelect');
let namaBankBKMSelect = document.getElementById('namaBankBKMSelect');
let idBankBKM = document.getElementById('idBankBKM');
let jenisBankBKM = document.getElementById('jenisBankBKM');
let kodePerkiraanBKMSelect = document.getElementById('kodePerkiraanBKMSelect');
let idKodePerkiraanBKM = document.getElementById('idKodePerkiraanBKM');
let jumlahUangBKM = document.getElementById('jumlahUangBKM');
let kursRupiah = document.getElementById('kursRupiah');
let btn_kodeBKM = document.getElementById('btn_kodeBKM');
let btn_mtUang = document.getElementById('btn_mtUang');
let btn_bankBKM = document.getElementById('btn_bankBKM');

//CARD BKK
let idBKK = document.getElementById('idBKK');
let jumlahUangBKK = document.getElementById('jumlahUangBKK');
let namaBankBKKSelect = document.getElementById('namaBankBKKSelect');
let idBankBKK = document.getElementById('idBankBKK');
let btn_bankBKK = document.getElementById('btn_bankBKK');
let jenisBankBKK = document.getElementById('jenisBankBKK');
let kodePerkiraanBKKSelect = document.getElementById('kodePerkiraanBKKSelect');
let idKodePerkiraanBKK = document.getElementById('idKodePerkiraanBKK');
let btn_kodeBKK = document.getElementById('btn_kodeBKK');


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

let bankbkk, bankbkm;

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
let btn_okbkk = document.getElementById('btn_okbkk');
let tgl_awalbkk = document.getElementById("tgl_awalbkk");
let tgl_akhirbkk = document.getElementById("tgl_akhirbkk");
// let tabelTampilBKK = document.getElementById('tabelTampilBKK');

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

kursRupiah.value = 0;
jumlahUangBKM.value = 0;

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

        tanggal.valueAsDate = new Date();

        bulan.value = (new Date()).getMonth() + 1;
        tahun.value = (new Date()).getFullYear();

        console.log('Bulan:', bulan.value);
        console.log('Tahun:', tahun.value);
        console.log('Nilai Uang:', nilaiUang.value);

        tanggal.removeAttribute("readonly");
        mataUangBKMSelect.removeAttribute("readonly");
        kursRupiah.removeAttribute("readonly");
        jumlahUangBKM.removeAttribute("readonly");
        namaBankBKMSelect.removeAttribute("readonly");
        idBankBKM.removeAttribute("readonly");
        jenisBankBKM.removeAttribute("readonly");
        idKodePerkiraanBKM.removeAttribute("readonly");
        kodePerkiraanBKMSelect.removeAttribute("readonly");
        btn_mtUang.removeAttribute("disabled");
        btn_bankBKM.removeAttribute("disabled");
        btn_kodeBKM.removeAttribute("disabled");

        tanggal.focus();
    }
});

tanggal.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        btn_mtUang.focus();
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
                        dataType: "json",
                        type: "GET",
                        data: {
                            _token: csrfToken
                        }
                    },
                    columns: [
                        { data: "Id_MataUang" },
                        { data: "Nama_MataUang" }
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

                idMataUangBKM.value = result.value.Id_MataUang.trim();
                mataUangBKMSelect.value = result.value.Nama_MataUang.trim();

                console.log(idMataUangBKM.value, idMtUang);
                btn_bankBKM.focus();

                if (idMataUangBKM.value !== idMtUang) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Karena mata uang yg dipilih tdk sama dgn mata uang BKM DP-nya, isikan nilai kurs-nya.',
                        returnFocus: false
                    }).then(() => {
                        kursRupiah.select();
                    });
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

kursRupiah.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        kursRupiah.value = parseFloat(kursRupiah.value.replace(/[^0-9.]/g, '')).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

        if (kursRupiah.value === 0 || kursRupiah.value === '0') {
            alert('Kurs TIDAK BOLEH = 0 !');
            kursRupiah.focus();
        } else {
            console.log('else ', idMataUangBKM.value, idMtUang);

            if (idMataUangBKM.value === '1' && idMtUang === '2') {
                let nilaipelunasan = numeral(kursRupiah.value).value() * numeral(jumlahUangBKM.value).value();
                jumlahUangBKM.value = nilaipelunasan.toFixed(2);
            } else if (idMataUangBKM.value === '2' && idMtUang === '1') {
                let nilaipelunasan = numeral(jumlahUangBKM.value).value() / numeral(kursRupiah.value).value();
                jumlahUangBKM.value = nilaipelunasan.toFixed(2);
            }
            btn_bankBKM.focus();
        }
    }
});
//#endregion

//#region untuk ambil LIST BANK BKM & BKK
function openBankSelection(idBankField) {
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
                    url: 'MaintenanceBKMxBKKNotaKredit/getbank',
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
            console.log(result);

            if (idBankField === 'btn_bankBKM') {
                idBankBKM.value = result.value.Id_Bank.trim();
                namaBankBKMSelect.value = result.value.Nama_Bank.trim();
                if (idBankBKM.value !== '') {
                    detilBKM();
                }
            }
            if (idBankField === 'btn_bankBKK') {
                // console.log(idBankBKK.value, idBankBKK);

                idBankBKK.value = result.value.Id_Bank.trim();
                namaBankBKKSelect.value = result.value.Nama_Bank.trim();
                if (idBankBKK.value !== '') {
                    detilBKK();
                }
            }
        }
    });
}

function detilBKM() {
    $.ajax({
        type: 'GET',
        url: 'MaintenanceBKMxBKKNotaKredit/detailjenisbank',
        data: {
            _token: csrfToken,
            idBank: idBankBKM.value
        },
        success: function (result) {
            jenisBankBKM.value = result[0].jenis.trim();
            btn_kodeBKM.focus();
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

function detilBKK() {
    $.ajax({
        type: 'GET',
        url: 'MaintenanceBKMxBKKNotaKredit/detailjenisbank',
        data: {
            _token: csrfToken,
            idBank: idBankBKK.value
        },
        success: function (result) {
            console.log(result);

            jenisBankBKK.value = result[0].jenis.trim();
            btn_kodeBKK.focus();
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

btn_bankBKM.addEventListener("click", function (e) {
    e.preventDefault();
    openBankSelection('btn_bankBKM');
});

btn_bankBKK.addEventListener("click", function (e) {
    e.preventDefault();
    openBankSelection('btn_bankBKK');
});


//#endregion

//#region ambil list kode perkiraan BKM
btn_kodeBKM.addEventListener("click", function (e) {
    e.preventDefault();
    try {
        Swal.fire({
            title: 'Kode BKM',
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
                        url: 'MaintenanceBKMxBKKNotaKredit/getkodeperkiraan',
                        dataType: "json",
                        type: "GET",
                        data: {
                            _token: csrfToken
                        }
                    },
                    columns: [
                        { data: "NoKodePerkiraan" },
                        { data: "Keterangan" }
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

                idKodePerkiraanBKM.value = result.value.NoKodePerkiraan.trim();
                kodePerkiraanBKMSelect.value = result.value.Keterangan.trim().replace(/&amp;/g, '&');

                if (idKodePerkiraanBKM.value !== '') {
                    getIdNota('R', 'bkm');
                    btn_bankBKK.removeAttribute("disabled");
                    btn_bankBKK.focus();
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

function getIdNota(jenis, tipe) {
    // event.preventDefault();
    if (tipe === 'bkm') {
        if (idBankBKM.value === "KRR1" || idBankBKM.value === "KRR2") {
            if (idBankBKM.value == "KRR1") {
                bankbkm = "KKM";
            }
            else if (idBankBKM.value == "KRR2") {
                bankbkm = "KI";
            }
        } else {
            bankbkm = idBankBKM.value;
        }
    } else if (tipe === 'bkk') {
        if (idBankBKK.value === "KRR1" || idBankBKK.value === "KRR2") {
            if (idBankBKK.value == "KRR1") {
                bankbkk = "KKM";
            }
            else if (idBankBKK.value == "KRR2") {
                bankbkk = "KI";
            }
        } else {
            bankbkk = idBankBKK.value;
        }
    }

    $.ajax({
        type: 'GET',
        url: 'MaintenanceBKMxBKKNotaKredit/getidNota',
        data: {
            _token: csrfToken,
            idBankBKM: bankbkm,
            idBankBKK: bankbkk,
            idBKM: idBKM.value,
            idBKK: idBKK.value,
            jenis: jenis,
            tanggal: tanggal.value,
        },
        success: function (result) {
            console.log(result);

            if (result.IdBKM) {
                idBKM.value = result.IdBKM.trim();

                jumlahUangBKK.value = numeral(numeral(jumlahUangBKM.value).value()).format("0,0.00");

                // tanggal.setAttribute("readonly", true);
                idBKM.setAttribute("readonly", true);
                mataUangBKMSelect.setAttribute("readonly", true);
                kursRupiah.setAttribute("readonly", true);
                jumlahUangBKM.setAttribute("readonly", true);
                // idBankBKM.setAttribute("readonly", true);
                namaBankBKMSelect.setAttribute("readonly", true);
                idKodePerkiraanBKM.setAttribute("readonly", true);
                kodePerkiraanBKMSelect.setAttribute("readonly", true);
                btn_bankBKM.setAttribute("disabled", true);
                btn_kodeBKM.setAttribute("disabled", true);

                //Untuk card bkk
                idBKK.setAttribute("readonly", true);
                // idBankBKK.removeAttribute("readonly");
                namaBankBKKSelect.removeAttribute("readonly");
                // jumlahUangBKK.removeAttribute("readonly");
                jenisBankBKK.removeAttribute("readonly");
                idKodePerkiraanBKK.removeAttribute("readonly");
                kodePerkiraanBKKSelect.removeAttribute("readonly");
                // uraianBKK.removeAttribute("readonly");
                btn_kodeBKK.removeAttribute("disabled");

            } else if (result.IdBKK) {
                idBKK.value = result.IdBKK.trim();
            }




        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}
//#endregion

//#region ambil list kode perkiraan BKK
btn_kodeBKK.addEventListener("click", function (e) {
    e.preventDefault();
    try {
        Swal.fire({
            title: 'Kode BKK',
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
                        url: 'MaintenanceBKMxBKKNotaKredit/getkodeperkiraan',
                        dataType: "json",
                        type: "GET",
                        data: {
                            _token: csrfToken
                        }
                    },
                    columns: [
                        { data: "NoKodePerkiraan" },
                        { data: "Keterangan" }
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

                idKodePerkiraanBKK.value = result.value.NoKodePerkiraan.trim();
                kodePerkiraanBKKSelect.value = result.value.Keterangan.trim().replace(/&amp;/g, '&');

                if (idKodePerkiraanBKK.value !== '') {
                    getIdNota('P', 'bkk');
                }

                btnProses.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});
//#endregion


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

//#region tampil BKK
//#region Modal Tampil BKK
btn_cetakbkm.addEventListener("click", async function (event) {
    event.preventDefault();

    if (rowDataArray.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Pilih 1 Id.BKK Untuk DiCetak!',
            returnFocus: false
        });
    } else {
        $.ajax({
            url: "MaintenanceBKMxBKKPembulatan/cetakBKM",
            type: "GET",
            data: {
                _token: csrfToken,
                bkk: bkk.value,
            },
            success: function (data) {
                console.log(data);

                document.getElementById("nomer").innerHTML = data.data[0].Id_BKK.trim();
                document.getElementById("tglCetak").innerHTML = formatDate(data.data[0].Tgl_Input);
                document.getElementById("symbol").innerHTML = data.data[0].Symbol.trim();
                document.getElementById("symbol2").innerHTML = data.data[0].Symbol.trim();
                document.getElementById("nilaiPembulatan").innerHTML =
                    parseFloat(data.data[0].Nilai_Pembulatan.trim()).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    });
                document.getElementById("terbilangCetak").innerHTML = data.data[0].Terjemahan.trim();
                document.getElementById("jenisPembayaran").innerHTML = data.data[0].Jenis_Pembayaran.trim();
                document.getElementById("idBKMAcuan").innerHTML = data.data[0].Id_BKM_Acuan.trim();
                document.getElementById("tanggalBKM").innerHTML = formatDate(data.data[0].Tgl_BKM);
                document.getElementById("tglCetakForm").innerHTML = formatDateString(tanggal.valueAsDate);

                document.getElementById("kodeperkiraan").innerHTML = "";
                document.getElementById("jenispemb").innerHTML = "";
                document.getElementById("jatuhtempo").innerHTML = "";
                document.getElementById("rincianBayar").innerHTML = "";
                document.getElementById("nilairincian").innerHTML = "";

                let totalNilaiRincian = 0;

                data.data.forEach(function (item, index) {
                    // Jenis Pembayaran and Jatuh Tempo
                    let pemb = document.createElement("div");
                    let temp = document.createElement("div");
                    pemb.innerHTML =  '&nbsp';
                    temp.innerHTML =  '&nbsp';
                    document.getElementById("jenispemb").appendChild(pemb);
                    document.getElementById("jatuhtempo").appendChild(temp);

                    // Kode Perkiraan
                    let kodeDiv = document.createElement("div");
                    kodeDiv.innerHTML = item.Kode_Perkiraan;
                    kodeDiv.classList.add("text-center");
                    // kodeDiv.style.textAlign= 'center';
                    document.getElementById("kodeperkiraan").appendChild(kodeDiv);

                    // Rincian
                    let rincianDiv = document.createElement("div");
                    rincianDiv.innerHTML = item.Rincian_Bayar ? item.Rincian_Bayar : '&nbsp';
                    document.getElementById("rincianBayar").appendChild(rincianDiv);

                    // Nilai Rincian
                    let nilaiRincian = parseFloat(item.Nilai_Rincian);
                    let formattedValue = nilaiRincian.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    });

                    let nilaiDiv = document.createElement("div");
                    nilaiDiv.innerHTML = formattedValue;
                    document.getElementById("nilairincian").appendChild(nilaiDiv);

                    // Update total
                    totalNilaiRincian += nilaiRincian;
                });


                // Format total dan tampilkan di element dengan id "grandTotal"
                document.getElementById("grandTotal").innerHTML =
                    totalNilaiRincian.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    });

                // document.getElementById("alasan_p").innerHTML =
                //     data.data[0].Alasan;

                // document.getElementById("batal_p").innerHTML =
                //     data.data[0].Batal;

                window.print();
                // }
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
    }


});

btnTampilBKK.addEventListener("click", async function (event) {
    event.preventDefault();
    var myModal = new bootstrap.Modal(
        document.getElementById("dataBKKModal"),
        {
            keyboard: false,
        }
    );

    let = tabletampilBKM = $("#tabletampilBKM").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        destroy: true,
        ajax: {
            url: "MaintenanceBKMxBKKNotaKredit/getPembulatan",
            dataType: "json",
            type: "GET",
            data: function (d) {
                return $.extend({}, d, {
                    _token: csrfToken,
                });
            },
        },
        columns: [
            {
                data: "Tgl_Input",
                render: function (data) {
                    return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                },
            },
            { data: "Id_BKK" },
            { data: "Nilai_Pembulatan" },
            { data: "Terjemahan" },
        ],
        paging: false,
        scrollY: "400px",
        scrollCollapse: true,
        // columnDefs: [{ targets: [5], visible: false }],
    });

    myModal.show();
});

$('#dataBKKModal').on('hidden.bs.modal', function () {
    tgl_awalbkk.valueAsDate = new Date();
    tgl_akhirbkk.valueAsDate = new Date();
    bkk.value = '';
});

btn_okbkk.addEventListener("click", async function (event) {
    event.preventDefault();
    tabletampilBKM = $("#tabletampilBKM").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        destroy: true,
        ajax: {
            url: "MaintenanceBKMxBKKNotaKredit/getOkBKM",
            dataType: "json",
            type: "GET",
            data: function (d) {
                return $.extend({}, d, {
                    _token: csrfToken,
                    tgl_awalbkk: tgl_awalbkk.value,
                    tgl_akhirbkk: tgl_akhirbkk.value,
                });
            },
        },
        columns: [
            {
                data: "Tgl_Input",
                render: function (data) {
                    return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                },
            },
            { data: "Id_BKK" },
            { data: "Nilai_Pembulatan" },
            { data: "Terjemahan" },
        ],
        paging: false,
        scrollY: "400px",
        scrollCollapse: true,
        // columnDefs: [{ targets: [3, 4], visible: false }],
    });
});

let rowDataArrayKetiga = [];

$("#tabletampilBKM tbody").off("change", 'input[name="penerimaCheckbox"]');
$("#tabletampilBKM tbody").on(
    "change",
    'input[name="penerimaCheckbox"]',
    function () {
        if (this.checked) {
            $('input[name="penerimaCheckbox"]')
                .not(this)
                .prop("checked", false);
            rowDataKetiga = tabletampilBKM
                .row($(this).closest("tr"))
                .data();
            rowDataArray.push(rowDataKetiga);
            bkk.value = rowDataKetiga.Id_BKK;
            console.log(rowDataArrayKetiga);
            console.log(rowDataKetiga, this, tabletampilBKM);
        } else {
            // Kosongkan array saat checkbox tidak dicentang
            rowDataArray = [];
            rowDataKetiga = null;
            bkk.value = "";
            console.log(rowDataArrayKetiga);
            console.log(rowDataKetiga, this, tabletampilBKM);
        }
    }
);
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
