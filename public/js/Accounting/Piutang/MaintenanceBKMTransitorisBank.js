var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

// BKK Card Variables
var bln = document.getElementById('bln');
var thn = document.getElementById('thn');
var tanggalInput = document.getElementById('tanggalInput');
var idBKK = document.getElementById('idBKK');
var listBiaya = document.getElementById('listBiaya');
listBiaya.value = 0;
var idUang1 = document.getElementById('idUang1');
var symbol1 = document.getElementById('symbol1');
var mataUang1 = document.getElementById('mataUang1');
var btnMataUang1 = document.getElementById('btnMataUang1');
var jenisBank1 = document.getElementById('jenisBank1');
var jenisBank = document.getElementById('jenisBank');
var uang1 = document.getElementById('uang1');
var idBank1 = document.getElementById('idBank1');
var bank1 = document.getElementById('bank1');
var btnBank1 = document.getElementById('btnBank1');
var btnBank = document.getElementById('btnBank');
var btnBiaya = document.getElementById('btnBiaya');
var idJenisBayar1 = document.getElementById('idJenisBayar1');
var jenisBayar1 = document.getElementById('jenisBayar1');
var btnJenisBayar1 = document.getElementById('btnJenisBayar1');
var btnBG = document.getElementById('btnBG');
var idPerkiraan1 = document.getElementById('idPerkiraan1');
var idPerkiraan = document.getElementById('idPerkiraan');
var perkiraan1 = document.getElementById('perkiraan1');
var btnPerkiraan1 = document.getElementById('btnPerkiraan1');
var uraian1 = document.getElementById('uraian1');

// BKM Card Variables
var tgl = document.getElementById('tgl');
var idBKM = document.getElementById('idBKM');
var listBiaya1 = document.getElementById('listBiaya1');
listBiaya1.value = 0;
var idUang = document.getElementById('idUang');
var symbol = document.getElementById('symbol');
var mataUang = document.getElementById('mataUang');
var btnMataUang = document.getElementById('btnMataUang');
var kurs = document.getElementById('kurs');
var uang = document.getElementById('uang');
var idBank = document.getElementById('idBank');
var bank = document.getElementById('bank');
var btnBank = document.getElementById('btnBank');
var idJenisBayar = document.getElementById('idJenisBayar');
var jenisBayar = document.getElementById('jenisBayar');
var btnJenisBayar = document.getElementById('btnJenisBayar');
var btnBiaya1 = document.getElementById('btnBiaya1');
var perkiraan = document.getElementById('perkiraan');
var btnPerkiraan = document.getElementById('btnPerkiraan');
var uraian = document.getElementById('uraian');

var dateNow = document.getElementById('tanggal');
var today = new Date().toISOString().slice(0, 10);
tgl.value = today;
tanggalInput.value = today;

document.addEventListener('DOMContentLoaded', function () {
    tanggalInput.focus(); // Set focus on the tanggalInput element
});

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

// Helper function to scroll selected row into view
function scrollRowIntoView(rowElement) {
    rowElement.scrollIntoView({ block: 'nearest' });
}

function formatDateToMMDDYYYY(date) {
    let dateObj = new Date(date);
    if (isNaN(dateObj)) {
        return '';
    }

    let month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    let day = dateObj.getDate().toString().padStart(2, '0');
    let year = dateObj.getFullYear();

    return `${month}/${day}/${year}`;
}

function decodeHtmlEntities(text) {
    var txt = document.createElement("textarea");
    txt.innerHTML = text;
    return txt.value;
}

function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function (m) { return map[m]; });
}

btnMataUang1.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Mata Uang',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
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
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "MaintenanceBKMTransistorisBank/getMataUang",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "Nama_MataUang" },
                            { data: "Id_MataUang" },
                        ],
                        // columnDefs: [
                        //     {
                        //         targets: 0,
                        //         width: '100px',
                        //     }
                        // ]
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
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                idUang1.value = decodeHtmlEntities(result.value.Id_MataUang.trim());
                mataUang1.value = decodeHtmlEntities(result.value.Nama_MataUang.trim());

                $.ajax({
                    type: 'GET',
                    url: 'MaintenanceBKMTransistorisBank/getSymbol',
                    data: {
                        _token: csrfToken,
                        nama: mataUang1.value.trim()
                    },
                    success: function (result) {
                        if (result.length !== 0) {
                            symbol1.value = result[0].Symbol ? decodeHtmlEntities(result[0].Symbol) : '';
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error('Error:', error);
                    }
                });
                uang1.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

btnMataUang.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Mata Uang',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
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
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "MaintenanceBKMTransistorisBank/getMataUang",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "Nama_MataUang" },
                            { data: "Id_MataUang" },
                        ],
                        // columnDefs: [
                        //     {
                        //         targets: 0,
                        //         width: '100px',
                        //     }
                        // ]
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
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                idUang.value = decodeHtmlEntities(result.value.Id_MataUang.trim());
                mataUang.value = decodeHtmlEntities(result.value.Nama_MataUang.trim());

                $.ajax({
                    type: 'GET',
                    url: 'MaintenanceBKMTransistorisBank/getSymbol',
                    data: {
                        _token: csrfToken,
                        nama: mataUang.value.trim()
                    },
                    success: function (result) {
                        if (result.length !== 0) {
                            symbol.value = result[0].Symbol ? decodeHtmlEntities(result[0].Symbol) : '';

                            if (mataUang.value.trim() !== mataUang1.value.trim() && mataUang.value !== '') {
                                kurs.readOnly = false;
                                kurs.focus();
                            }
                            else if (mataUang.value.trim() === mataUang1.value.trim() && mataUang.value !== '') {
                                kurs.readOnly = true;
                                kurs.value = '0';
                                uang.value = formatNumber(0);
                                btnBank.focus();

                            }
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error('Error:', error);
                    }
                });
            }
        });
    } catch (error) {
        console.error(error);
    }
});

var total;
$('#kurs').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        kurs.value = numeral(parseFloat(kurs.value)).format("0,0.00")

        if (parseFloat((kurs.value)) === 0 || (kurs.value) === '') {
            Swal.fire({
                icon: 'error',
                text: 'Kurs TIDAK BOLEH = 0 !',
                returnFocus: false
            }).then(() => {
                kurs.focus();
            });
            return;
        }
        else {
            if (parseInt(idUang1.value) === 1 && parseInt(idUang.value) !== 1) {
                let uang1Value = numeral(uang1.value).value(); // Parses "100,000.00" correctly to 100000
                let kursValue = numeral(kurs.value).value();   // Parses "1.00" correctly to 1

                total = uang1Value / kursValue;
                uang.value = (total);
                uang.value = numeral(parseFloat(uang.value)).format("0,0.00");
            }
            else {
                total = uang1Value * kursValue;
                uang.value = (total);
                uang.value = numeral(parseFloat(uang.value)).format("0,0.00")
            }
            btnBank.focus();
        }
    }
});

$('#uang1').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();

        const uang1Value = parseFloat((uang1.value)) || 0;

        if (uang1Value === 0) {
            Swal.fire({
                icon: 'error',
                text: 'Jumlah Uang TIDAK BOLEH = 0!',
            }).then(() => {
                uang1.focus();
            });
            return;
        } else {
            uang1.value = numeral(parseFloat(uang1.value)).format("0,0.00");
            btnBank1.focus();
        }
    }
});

function formatNumber(value) {
    if (!isNaN(parseFloat(value)) && isFinite(value)) {
        return parseFloat(value).toFixed(2);
    }
    return value;
}

// function formatUang(value) {
//     let number = parseFloat(value.replace(/,/g, ''));
//     if (isNaN(number)) {
//         return ''; // Return empty if not a valid number
//     }
//     return number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
// }

// function (formattedValue) {
//     let numericValue = parseFloat(formattedValue.replace(/,/g, ''));
//     return numericValue;
// }

btnBank1.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Bank',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
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
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [0, "asc"],
                        ajax: {
                            url: "MaintenanceBKMTransistorisBank/getBank",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "Id_Bank" },
                            { data: "Nama_Bank" },
                        ],
                        // columnDefs: [
                        //     {
                        //         targets: 0,
                        //         width: '100px',
                        //     }
                        // ]
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
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                idBank1.value = decodeHtmlEntities(result.value.Id_Bank.trim());
                bank1.value = decodeHtmlEntities(result.value.Nama_Bank.trim());
                // uang1.focus();

                if (idBank1.value !== '') {
                    $.ajax({
                        type: 'GET',
                        url: 'MaintenanceBKMTransistorisBank/getAccBank',
                        data: {
                            _token: csrfToken,
                            idBank: idBank1.value
                        },
                        success: function (result) {
                            if (result.length !== 0) {
                                jenisBank1.value = result[0].jenis ? decodeHtmlEntities(result[0].jenis) : '';
                                btnJenisBayar1.focus();
                            }
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

btnBank.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Bank',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
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
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [0, "asc"],
                        ajax: {
                            url: "MaintenanceBKMTransistorisBank/getBank",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "Id_Bank" },
                            { data: "Nama_Bank" },
                        ],
                        // columnDefs: [
                        //     {
                        //         targets: 0,
                        //         width: '100px',
                        //     }
                        // ]
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
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                idBank.value = decodeHtmlEntities(result.value.Id_Bank.trim());
                bank.value = decodeHtmlEntities(result.value.Nama_Bank.trim());
                // uang1.focus();

                if (idBank.value !== '') {
                    $.ajax({
                        type: 'GET',
                        url: 'MaintenanceBKMTransistorisBank/getAccBank',
                        data: {
                            _token: csrfToken,
                            idBank: idBank.value
                        },
                        success: function (result) {
                            if (result.length !== 0) {
                                jenisBank.value = result[0].jenis ? decodeHtmlEntities(result[0].jenis.trim()) : '';
                                btnJenisBayar.focus();
                            }
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

$('#tanggalInput').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();

        if (tanggalInput.value > today) {
            Swal.fire({
                icon: 'error',
                text: 'Tanggal SALAH!',
            }).then(() => {
                tanggalInput.focus();
            });
            return;
        } else {
            btnMataUang1.focus();
        }
    }
});

$('#tgl').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();

        if (tanggalInput.value > today) {
            Swal.fire({
                icon: 'error',
                text: 'Tanggal SALAH!',
            }).then(() => {
                tanggalInput.focus();
            });
            return;
        } else {
            var dateValue = new Date(tgl.value);

            var month = String(dateValue.getMonth() + 1).padStart(2, '0');
            var year = String(dateValue.getFullYear()).slice(-2);

            bln.value = month;
            thn.value = year;
            btnMataUang.focus();
        }
    }
});

btnJenisBayar1.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Jenis Bayar',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
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
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [0, "asc"],
                        ajax: {
                            url: "MaintenanceBKMTransistorisBank/getJenisBayar",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "Id_Jenis_Bayar" },
                            { data: "Jenis_Pembayaran" },
                        ],
                        // columnDefs: [
                        //     {
                        //         targets: 0,
                        //         width: '100px',
                        //     }
                        // ]
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
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                idJenisBayar1.value = decodeHtmlEntities(result.value.Id_Jenis_Bayar.trim());
                jenisBayar1.value = decodeHtmlEntities(result.value.Jenis_Pembayaran.trim());

                if (parseInt(idJenisBayar1.value) === 2 || parseInt(idJenisBayar1.value) === 3
                    || parseInt(idJenisBayar1.value) === 5 || parseInt(idJenisBayar1.value) === 4) {
                    btnBG.disabled = false;
                    btnBG.focus();
                }
                else {
                    btnBG.disabled = true;
                    btnPerkiraan1.focus();
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

btnJenisBayar.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Jenis Bayar',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
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
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [0, "asc"],
                        ajax: {
                            url: "MaintenanceBKMTransistorisBank/getJenisBayar",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "Id_Jenis_Bayar" },
                            { data: "Jenis_Pembayaran" },
                        ],
                        // columnDefs: [
                        //     {
                        //         targets: 0,
                        //         width: '100px',
                        //     }
                        // ]
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
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                idJenisBayar.value = decodeHtmlEntities(result.value.Id_Jenis_Bayar.trim());
                jenisBayar.value = decodeHtmlEntities(result.value.Jenis_Pembayaran.trim());

                btnPerkiraan.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

btnPerkiraan1.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Perkiraan',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
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
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [0, "asc"],
                        ajax: {
                            url: "MaintenanceBKMTransistorisBank/getPerkiraan",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "NoKodePerkiraan" },
                            { data: "Keterangan" },
                        ],
                        // columnDefs: [
                        //     {
                        //         targets: 0,
                        //         width: '100px',
                        //     }
                        // ]
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
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                idPerkiraan1.value = decodeHtmlEntities(result.value.NoKodePerkiraan.trim());
                perkiraan1.value = decodeHtmlEntities(result.value.Keterangan.trim());

                uraian1.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

btnPerkiraan.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Perkiraan',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
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
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [0, "asc"],
                        ajax: {
                            url: "MaintenanceBKMTransistorisBank/getPerkiraan",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "NoKodePerkiraan" },
                            { data: "Keterangan" },
                        ],
                        // columnDefs: [
                        //     {
                        //         targets: 0,
                        //         width: '100px',
                        //     }
                        // ]
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
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                idPerkiraan.value = decodeHtmlEntities(result.value.NoKodePerkiraan.trim());
                perkiraan.value = decodeHtmlEntities(result.value.Keterangan.trim());

                uraian.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

var bankBg = document.getElementById('bankBg');
var jenisBg = document.getElementById('jenisBg');
var noBg = document.getElementById('noBg');
var jatuhTempo = document.getElementById('jatuhTempo');
var cetak = document.getElementById('cetak');
var btnProsesBg = document.getElementById('btnProsesBg');

var btnProses = document.getElementById("btnProses");
var btnKoreksi = document.getElementById("btnKoreksi");
var btnKoreksiForm = document.getElementById("btnKoreksiForm");
var btnBatal = document.getElementById("btnBatal");
var btnTampilBKM = document.getElementById("btnTampilBKM");
var btnTampilBKK = document.getElementById("btnTampilBKK");
var btnHapus = document.getElementById("btnHapus");
var tableDetailBiayaBKK = document.getElementById("tableDetailBiayaBKK");

// Detail BG/CEK/TRANSFER BKK Section
var btnKoreksiBg = document.getElementById("btnKoreksiBg");
var btnHapusBg = document.getElementById("btnHapusBg");
var tableBg = document.getElementById("tableBg");

// Detail Biaya BKM Section
var btnKoreksi2 = document.getElementById("btnKoreksi2");
var btnHapus2 = document.getElementById("btnHapus2");
var tableDetailBiayaBKM = document.getElementById("tableDetailBiayaBKM");

var proses;

btnBG.addEventListener("click", function (e) {
    proses = 1;
    $('#modalBg').modal('show');
    $('#modalBg').on('shown.bs.modal', function () {
        bankBg.value = bank1.value;
        jenisBg.value = jenisBayar1.value;
        jatuhTempo.value = today;
        noBg.value = '';
        cetak.value = '';
        noBg.readOnly = false;
        jatuhTempo.readOnly = false;
        cetak.readOnly = false;
        noBg.focus();
    });

});

$('#jatuhTempo').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        cetak.focus();
    }
});

$('#noBg').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        jatuhTempo.focus();
    }
});

$('#cetak').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        cetak.value = cetak.value.toUpperCase();
        if (cetak.value.toUpperCase() === 'T' || cetak.value.toUpperCase() === 'S' || cetak.value.toUpperCase() === 'O') {
            btnProsesBg.focus();
        }
        else {
            Swal.fire({
                icon: 'error',
                text: 'Hanya bisa diisi dengan status T,O,S !!..',
                returnFocus: false
            }).then(() => {
                cetak.focus();
            });
        }
    }
});

var IdBank1, ModeKoreksi = false;

$('#uraian1').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        // jatuhTempo.focus();
        if (idBKK.value === '') {
            if (idBank1.value === 'KRR1' || idBank1.value === 'KRR2') {
                if (idBank1.value === 'KRR1') {
                    IdBank1 = 'KI';
                }
                if (idBank1.value = 'KRR2') {
                    IdBank1 = 'KKK';
                }
            }
            else {
                IdBank1 = idBank1.value;
            }
        }

        $.ajax({
            type: 'GET',
            url: 'MaintenanceBKMTransistorisBank/getIdBKK',
            data: {
                _token: csrfToken,
                bank: IdBank1.trim(),
                tahun: new Date(tanggalInput.value).getFullYear(),
            },
            success: function (result) {
                if (result) {
                    idBKK.value = decodeHtmlEntities(result.IdBKK);

                    if (ModeKoreksi === false) {
                        if (btnBiaya.disabled === true) {
                            Swal.fire({
                                title: 'Ada BIAYA?',
                                icon: 'question',
                                showCancelButton: true,
                                confirmButtonText: 'Ya',
                                cancelButtonText: 'Tidak',
                                returnFocus: false
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    btnBiaya.disabled = false;
                                    btnBiaya.focus();
                                }
                                else {
                                    btnBiaya.disabled = true;
                                    enableBKM();
                                    tgl.focus();
                                    disableBKK();
                                }
                            });
                        }
                        else {
                            enableBKM();
                            tgl.focus();
                            disableBKK();
                        }
                    }
                    else {
                        if (btnBiaya.disabled === true) {
                            Swal.fire({
                                title: 'Ada BIAYA?',
                                icon: 'question',
                                showCancelButton: true,
                                confirmButtonText: 'Ya',
                                cancelButtonText: 'Tidak',
                                returnFocus: false
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    btnBiaya.disabled = false;
                                    btnBiaya.focus();
                                }
                                else {
                                    btnBiaya.disabled = true;
                                    enableBKM();
                                    tgl.focus();
                                    disableBKK();
                                }
                            });
                        }
                        else {
                            Swal.fire({
                                title: 'Mata Uang BKM DiKoreksi??',
                                icon: 'question',
                                showCancelButton: true,
                                confirmButtonText: 'Ya',
                                cancelButtonText: 'Tidak',
                                returnFocus: false
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    enableBKM();
                                    tgl.focus();
                                    disableBKK();
                                    uang.value = '0';
                                }
                                else {
                                    enableBKM();
                                    disableBKK();
                                    if (parseFloat((kurs.value)) !== 0) {
                                        let total;
                                        const uang1Value = parseFloat((uang1.value));
                                        const kursValue = parseFloat((kurs.value));

                                        if (idUang1.value === "1" && idUang.value === "2") {
                                            total = uang1Value / kursValue;
                                            uang.value = total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                                        } else if (idUang1.value === "2" && idUang.value === "1") {
                                            total = uang1Value * kursValue;
                                            uang.value = total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                                        } else if (idUang1.value === idUang.value) {
                                            uang.value = parseFloat((uang1.value)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                                        }
                                    }

                                    btnBank.focus();
                                }
                            });
                        }
                    }
                }
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });
    }
});

var IdBank;
$('#uraian').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        // jatuhTempo.focus();
        if (idBKM.value === '') {
            if (idBank.value === 'KRR1' || idBank.value === 'KRR2') {
                if (idBank.value === 'KRR1') {
                    IdBank = 'KI';
                }
                if (idBank.value = 'KRR2') {
                    IdBank = 'KKK';
                }
            }
            else {
                IdBank = idBank.value;
            }
        }

        $.ajax({
            type: 'GET',
            url: 'MaintenanceBKMTransistorisBank/getIdBKM',
            data: {
                _token: csrfToken,
                bank: IdBank.trim(),
                tahun: new Date(tanggalInput.value).getFullYear(),
            },
            success: function (result) {
                if (result) {
                    idBKM.value = decodeHtmlEntities(result.IdBKM);

                    if (ModeKoreksi === false) {
                        if (btnBiaya1.disabled === true) {
                            Swal.fire({
                                title: 'Ada BIAYA?',
                                icon: 'question',
                                showCancelButton: true,
                                confirmButtonText: 'Ya',
                                cancelButtonText: 'Tidak',
                                returnFocus: false
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    btnBiaya1.disabled = false;
                                    btnBiaya1.focus();
                                }
                                else {
                                    btnBiaya1.disabled = true;
                                    disableBKM();
                                    btnProses.focus();
                                }
                            });
                        }
                        else {
                            btnBiaya1.disabled = true;
                            disableBKM();
                            btnProses.focus();
                        }
                    }
                    else {

                    }
                }
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });
    }
});

function enableBKK() {
    tanggalInput.readOnly = false;
    uang1.readOnly = false;
    uraian1.readOnly = false;
    btnMataUang1.disabled = false;
    btnBank1.disabled = false;
    btnPerkiraan1.disabled = false;
    btnJenisBayar1.disabled = false;
    // btnBiaya.disabled = false;
}

function disableBKK() {
    tanggalInput.readOnly = true;
    uang1.readOnly = true;
    uraian1.readOnly = true;
    btnMataUang1.disabled = true;
    btnBank1.disabled = true;
    btnPerkiraan1.disabled = true;
    btnJenisBayar1.disabled = true;
    btnBiaya.disabled = true;
}

function enableBKM() {
    tgl.readOnly = false;
    uraian.readOnly = false;
    btnMataUang.disabled = false;
    btnBank.disabled = false;
    btnJenisBayar.disabled = false;
    btnPerkiraan.disabled = false;
    // kurs.readOnly = true;
}

function disableBKM() {
    tgl.readOnly = true;
    uraian.readOnly = true;
    btnMataUang.disabled = true;
    btnBank.disabled = true;
    btnJenisBayar.disabled = true;
    btnPerkiraan.disabled = true;
    kurs.readOnly = true;
    btnBiaya1.disabled = true;
    btnPerkiraan.disabled = true;
}

function updateDataTable(data, angka) {
    var table = $('#tableDetailBiayaBKK').DataTable();
    var tableAsal = $('#tableBg').DataTable();
    var tableTujuan = $('#tableDetailBiayaBKM').DataTable();

    if (angka === 1) {
        tableAsal.row.add([
            escapeHtml(data[0]),
            (data[1]),
            escapeHtml(data[2]),
        ]);
        tableAsal.draw();
    }
    else if (angka === 2) {

        table.row.add([
            escapeHtml(data[0]),
            (data[1]),
            escapeHtml(data[2]),
        ]);
        table.draw();
    }
    else if (angka === 3) {
        tableTujuan.row.add([
            escapeHtml(data[0]),
            (data[1]),
            escapeHtml(data[2]),
        ]);
        tableTujuan.draw();
    }

}

var i;

// modal bkm bawah case 1

var nilaiPelunasanBiaya1 = document.getElementById('nilaiPelunasanBiaya1');
var idPerkiraanBiaya1 = document.getElementById('idPerkiraanBiaya1');
var perkiraanBiaya1 = document.getElementById('perkiraanBiaya1');
var btnPerkiraanBiaya1 = document.getElementById('btnPerkiraanBiaya1');
var keteranganBiaya1 = document.getElementById('keteranganBiaya1');
var btnProsesBiaya1 = document.getElementById('btnProsesBiaya1');
var KeA1 = document.getElementById('KeA1');
var formListBiaya1 = document.getElementById('formListBiaya1');

btnBiaya1.addEventListener("click", function (e) {
    proses = 1;
    $('#modalBiaya1').modal('show');
    $('#modalBiaya1').on('shown.bs.modal', function () {
        clearBiaya1();
        formListBiaya1.value = listBiaya.value;
        nilaiPelunasanBiaya1.readOnly = false;
        nilaiPelunasanBiaya1.value = (0);
        nilaiPelunasanBiaya1.focus();
        btnPerkiraan1.disabled = false;
        i = parseInt(formListBiaya1.value);
    });
});

$('#nilaiPelunasanBiaya1').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        nilaiPelunasanBiaya1.value = numeral(parseFloat(nilaiPelunasanBiaya1.value)).format("0,0.00");
        btnPerkiraanBiaya1.focus();
    }
});

$('#keteranganBiaya1').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        btnProsesBiaya1.focus();
    }
});

btnPerkiraanBiaya1.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Perkiraan',
            html: `
            <table id="table_list" class="table">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col"></th>
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
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [0, "asc"],
                        ajax: {
                            url: "MaintenanceBKMTransistorisBank/getPerkiraan",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "NoKodePerkiraan" },
                            { data: "Keterangan" },
                        ],
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
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                idPerkiraanBiaya1.value = decodeHtmlEntities(result.value.NoKodePerkiraan.trim());
                perkiraanBiaya1.value = decodeHtmlEntities(result.value.Keterangan.trim());

                $.ajax({
                    type: 'GET',
                    url: 'MaintenanceBKMTransistorisBank/getPerkiraanChange',
                    data: {
                        _token: csrfToken,
                    },
                    success: function (result) {
                        if (result.length !== 0) {
                            perkiraanBiaya1.value = result[0].Keterangan ? decodeHtmlEntities(result[0].Keterangan) : '';
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error('Error:', error);
                    }
                });

                keteranganBiaya1.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

btnProsesBiaya1.addEventListener("click", function (e) {

    if (proses === 1) {
        if (nilaiPelunasanBiaya1.value !== '' && idPerkiraanBiaya1.value !== '' && keteranganBiaya1.value !== '') {
            i += 1;
            tmpArr = [keteranganBiaya1.value, (nilaiPelunasanBiaya1.value), idPerkiraanBiaya1.value];
            updateDataTable(tmpArr, 3);
            $('#modalBiaya1').modal('hide');
            Swal.fire({
                title: 'Tambah BIAYA?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Ya',
                cancelButtonText: 'Tidak',
                returnFocus: false
            }).then((result) => {
                if (result.isConfirmed) {
                    $('#modalBiaya1').modal('show');
                    $('#modalBiaya1').on('shown.bs.modal', function () {
                        formListBiaya1.value = listBiaya.value;
                        nilaiPelunasanBiaya1.readOnly = false;
                        nilaiPelunasanBiaya1.value = (0);
                        nilaiPelunasanBiaya1.focus();
                        btnPerkiraan1.disabled = false;
                    });
                    clearBiaya1();
                }
                else {
                    uraian.focus();
                }
            });
        }
        else {
            Swal.fire({
                icon: 'error',
                text: 'Isi Datanya Yg Lengkap!',
                returnFocus: false
            }).then(() => {
                noBg.focus();
            });
        }
    }
    else if (proses === 2) {
        if (nilaiPelunasanBiaya1.value !== '' && idPerkiraanBiaya1.value !== '' && keteranganBiaya1.value !== '') {
            arrBKM[0] = decodeHtmlEntities(keteranganBiaya1.value);
            arrBKM[1] = numeral(nilaiPelunasanBiaya1.value).value();
            arrBKM[2] = idPerkiraanBiaya1.value;

            var table = $('#tableDetailBiayaBKM').DataTable();
            table.row(arrBKM[3]).data(arrBKM).draw();

            Swal.fire({
                icon: 'success',
                text: 'Data Sudah TerKoreksi',
                returnFocus: false
            }).then(() => {
                $('#modalBiaya1').modal('hide');
            });
        }
        else {
            Swal.fire({
                icon: 'error',
                text: 'Isi Datanya Yg Lengkap!',
                returnFocus: false
            }).then(() => {
                nilaiPelunasanBiaya1.focus();
            });
        }
    }

    else if (proses === 3) {
        var table = $('#tableDetailBiayaBKM').DataTable();
        table.row(arrBKM[3]).remove().draw();

        Swal.fire({
            icon: 'success',
            text: 'Data Sudah TerHapus',
            returnFocus: false
        }).then(() => {
            $('#modalBiaya1').modal('hide');
        });
    }
});

function clearBiaya1() {
    keteranganBiaya1.value = '';
    nilaiPelunasanBiaya1.value = '';
    nilaiPelunasanBiaya1.focus();
}


// selesai modal bkm bawah

// Modal Biaya bkk atas case 1
var nilaiPelunasanBiaya = document.getElementById('nilaiPelunasanBiaya');
var idPerkiraanBiaya = document.getElementById('idPerkiraanBiaya');
var perkiraanBiaya = document.getElementById('perkiraanBiaya');
var btnPerkiraanBiaya = document.getElementById('btnPerkiraanBiaya');
var keteranganBiaya = document.getElementById('keteranganBiaya');
var btnProsesBiaya = document.getElementById('btnProsesBiaya');
var KeA = document.getElementById('KeA');
var formListBiaya = document.getElementById('formListBiaya');

btnBiaya.addEventListener("click", function (e) {
    proses = 1;
    $('#modalBiaya').modal('show');
    $('#modalBiaya').on('shown.bs.modal', function () {
        clearBiaya();
        formListBiaya.value = listBiaya.value;
        nilaiPelunasanBiaya.readOnly = false;
        nilaiPelunasanBiaya.value = (0);
        nilaiPelunasanBiaya.focus();
        btnPerkiraan.disabled = false;
        keteranganBiaya.readOnly = false;
        i = parseInt(formListBiaya.value);
    });
});

btnKoreksi.addEventListener("click", function (e) {
    var table = $('#tableDetailBiayaBKK').DataTable();
    if (table.rows('.selected').any()) {
        proses = 2;
        $('#modalBiaya').modal('show');
        $('#modalBiaya').on('shown.bs.modal', function () {
            clearBiaya();
            formListBiaya.value = listBiaya.value;
            nilaiPelunasanBiaya.readOnly = false;
            nilaiPelunasanBiaya.value = numeral(arrBKK[1]).value();
            idPerkiraanBiaya.value = arrBKK[2];
            keteranganBiaya.value = arrBKK[0];
            KeA.value = arrBKK[3];
            nilaiPelunasanBiaya.focus();
            btnPerkiraan.disabled = false;
            keteranganBiaya.readOnly = false;
        });
    }
    else {
        Swal.fire({
            icon: 'error',
            text: 'Pilih 1 Detail Biaya U/ DiKoreksi!',
            returnFocus: false
        });
    }
});

btnHapus.addEventListener("click", function (e) {
    var table = $('#tableDetailBiayaBKK').DataTable();
    if (table.rows('.selected').any()) {
        proses = 3;
        $('#modalBiaya').modal('show');
        $('#modalBiaya').on('shown.bs.modal', function () {
            clearBiaya();
            formListBiaya.value = listBiaya.value;
            nilaiPelunasanBiaya.readOnly = true;
            nilaiPelunasanBiaya.value = numeral(arrBKK[1]).value();
            idPerkiraanBiaya.value = arrBKK[2];
            keteranganBiaya.value = arrBKK[0];
            KeA.value = arrBKK[3];
            btnProsesBiaya.focus();
            btnPerkiraan.disabled = true;
            keteranganBiaya.readOnly = true;
        });
    }
    else {
        Swal.fire({
            icon: 'error',
            text: 'Pilih 1 Detail Biaya U/ DiHapus!',
            returnFocus: false
        });
    }
});

btnKoreksi2.addEventListener("click", function (e) {
    var table = $('#tableDetailBiayaBKM').DataTable();
    if (table.rows('.selected').any()) {
        proses = 2;
        $('#modalBiaya1').modal('show');
        $('#modalBiaya1').on('shown.bs.modal', function () {
            clearBiaya();
            formListBiaya1.value = listBiaya1.value;
            nilaiPelunasanBiaya1.readOnly = false;
            nilaiPelunasanBiaya1.value = numeral(arrBKM[1]).value();
            idPerkiraanBiaya1.value = arrBKM[2];
            keteranganBiaya1.value = arrBKM[0];
            KeA1.value = arrBKM[3];
            nilaiPelunasanBiaya1.focus();
            btnPerkiraan1.disabled = false;
            keteranganBiaya1.readOnly = false;
        });
    }
    else {
        Swal.fire({
            icon: 'error',
            text: 'Pilih 1 Detail Biaya U/ DiKoreksi!',
            returnFocus: false
        });
    }
});

btnHapus2.addEventListener("click", function (e) {
    var table = $('#tableDetailBiayaBKM').DataTable();
    if (table.rows('.selected').any()) {
        proses = 3;
        $('#modalBiaya1').modal('show');
        $('#modalBiaya1').on('shown.bs.modal', function () {
            clearBiaya();
            formListBiaya1.value = listBiaya.value;
            nilaiPelunasanBiaya1.readOnly = true;
            nilaiPelunasanBiaya1.value = numeral(arrBKM[1]).value();
            idPerkiraanBiaya1.value = arrBKM[2];
            keteranganBiaya1.value = arrBKM[0];
            KeA1.value = arrBKM[3];
            btnProsesBiaya1.focus();
            btnPerkiraan1.disabled = true;
            keteranganBiaya1.readOnly = true;
        });
    }
    else {
        Swal.fire({
            icon: 'error',
            text: 'Pilih 1 Detail Biaya U/ DiHapus!',
            returnFocus: false
        });
    }
});

$('#nilaiPelunasanBiaya').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        nilaiPelunasanBiaya.value = numeral(parseFloat(nilaiPelunasanBiaya.value)).format("0,0.00");
        btnPerkiraanBiaya.focus();
    }
});

$('#keteranganBiaya').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        btnProsesBiaya.focus();
    }
});

btnPerkiraanBiaya.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Perkiraan',
            html: `
            <table id="table_list" class="table">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col"></th>
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
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [0, "asc"],
                        ajax: {
                            url: "MaintenanceBKMTransistorisBank/getPerkiraan",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "NoKodePerkiraan" },
                            { data: "Keterangan" },
                        ],
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
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                idPerkiraanBiaya.value = decodeHtmlEntities(result.value.NoKodePerkiraan.trim());
                perkiraanBiaya.value = decodeHtmlEntities(result.value.Keterangan.trim());

                $.ajax({
                    type: 'GET',
                    url: 'MaintenanceBKMTransistorisBank/getPerkiraanChange',
                    data: {
                        _token: csrfToken,
                    },
                    success: function (result) {
                        if (result.length !== 0) {
                            perkiraanBiaya.value = result[0].Keterangan ? decodeHtmlEntities(result[0].Keterangan) : '';
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error('Error:', error);
                    }
                });

                keteranganBiaya.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

btnProsesBiaya.addEventListener("click", function (e) {

    if (proses === 1) {
        if (nilaiPelunasanBiaya.value !== '' && idPerkiraanBiaya !== '' && keteranganBiaya.value !== '') {
            i += 1;
            tmpArr = [keteranganBiaya.value, (nilaiPelunasanBiaya.value), idPerkiraanBiaya.value];

            updateDataTable(tmpArr, 2);
            $('#modalBiaya').modal('hide');
            Swal.fire({
                title: 'Tambah BIAYA?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Ya',
                cancelButtonText: 'Tidak',
                returnFocus: false
            }).then((result) => {
                if (result.isConfirmed) {
                    $('#modalBiaya').modal('show');
                    $('#modalBiaya').on('shown.bs.modal', function () {
                        formListBiaya.value = listBiaya.value;
                        nilaiPelunasanBiaya.readOnly = false;
                        nilaiPelunasanBiaya.value = (0);
                        nilaiPelunasanBiaya.focus();
                        btnPerkiraan.disabled = false;
                        // i = parseInt(formListBiaya.value);
                    });
                    clearBiaya();
                }
                else {
                    uraian1.focus();
                }
            });
        }
        else {
            Swal.fire({
                icon: 'error',
                text: 'Isi Datanya Yg Lengkap!',
                returnFocus: false
            }).then(() => {
                noBg.focus();
            });
        }
    }

    else if (proses === 2) {
        if (nilaiPelunasanBiaya.value !== '' && idPerkiraanBiaya.value !== '' && keteranganBiaya.value !== '') {
            arrBKK[0] = decodeHtmlEntities(keteranganBiaya.value);
            arrBKK[1] = numeral(nilaiPelunasanBiaya.value).value();
            arrBKK[2] = (idPerkiraanBiaya.value);

            var table = $('#tableDetailBiayaBKK').DataTable();
            table.row(arrBKK[3]).data(arrBKK).draw();

            Swal.fire({
                icon: 'success',
                text: 'Data Sudah TerKoreksi',
                returnFocus: false
            }).then(() => {
                $('#modalBiaya').modal('hide');
            });
        }
        else {
            Swal.fire({
                icon: 'error',
                text: 'Isi Datanya Yg Lengkap!',
                returnFocus: false
            }).then(() => {
                nilaiPelunasanBiaya.focus();
            });
        }
    }

    else if (proses === 3) {
        var table = $('#tableDetailBiayaBKK').DataTable();
        table.row(arrBKK[3]).remove().draw();

        Swal.fire({
            icon: 'success',
            text: 'Data Sudah TerHapus',
            returnFocus: false
        }).then(() => {
            $('#modalBiaya').modal('hide');
        });
    }
});

function clearBiaya() {
    keteranganBiaya.value = '';
    nilaiPelunasanBiaya.value = '';
    nilaiPelunasanBiaya.focus();
}

// selesai model biaya case 1

btnKoreksiForm.addEventListener("click", function (e) {
    if (idBKK.value !== '' && idBank.value !== '') {
        ModeKoreksi = true;
        enableBKK();
        tanggalInput.focus();
    }
    else {
        Swal.fire({
            icon: 'error',
            text: 'Tidak Ada Data Yg DiKoreksi',
            returnFocus: false
        }).then(() => {
            enableBKK();
            tanggalInput.focus();
        });
    }
});

btnProsesBg.addEventListener("click", function (e) {

    if (proses === 1) {
        if (jatuhTempo.value !== '' && cetak.value !== '') {
            tmpArr = [noBg.value, jatuhTempo.value, cetak.value];
            updateDataTable(tmpArr, 1);
            $('#modalBg').modal('hide');
            btnBG.disabled = true;
            btnPerkiraan1.focus();
        }
        else {
            Swal.fire({
                icon: 'error',
                text: 'Isi Datanya Yg Lengkap!',
                returnFocus: false
            }).then(() => {
                noBg.focus();
            });
        }
    }
    else if (proses === 2) {
        if (jatuhTempo.value !== '' && cetak.value !== '') {
            arrBg[0] = ((noBg.value));
            arrBg[1] = jatuhTempo.value;
            arrBg[2] = cetak.value;

            var table = $('#tableBg').DataTable();
            table.row(arrBg[3]).data(arrBg).draw();

            Swal.fire({
                icon: 'success',
                text: 'Data Sudah TerKoreksi',
                returnFocus: false
            }).then(() => {
                $('#modalBg').modal('hide');
            });
        }
        else {
            Swal.fire({
                icon: 'error',
                text: 'Isi Datanya Yg Lengkap!',
                returnFocus: false
            }).then(() => {
                noBg.focus();
            });
        }

    }
    else if (proses === 3) {
        var table = $('#tableBg').DataTable();
        table.row(arrBg[3]).remove().draw();

        Swal.fire({
            icon: 'success',
            text: 'Data Sudah TerHapus',
            returnFocus: false
        }).then(() => {
            $('#modalBg').modal('hide');
            btnBG.disabled = false;
        });
    }
});

var arrBKK, arrBg, arrBKM;

$('#tableDetailBiayaBKK tbody').on('click', 'tr', function () {
    var table = $('#tableDetailBiayaBKK').DataTable();
    table.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');

    var data = table.row(this).data();
    var rowIndex = table.row(this).index();

    arrBKK = [decodeHtmlEntities(data[0]), decodeHtmlEntities(data[1]), decodeHtmlEntities(data[2]), rowIndex];
});

$('#tableBg tbody').on('click', 'tr', function () {
    var table = $('#tableBg').DataTable();
    table.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');

    var data = table.row(this).data();
    var rowIndex = table.row(this).index();


    arrBg = [decodeHtmlEntities(data[0]), decodeHtmlEntities(data[1]), decodeHtmlEntities(data[2]), rowIndex];
});

$('#tableDetailBiayaBKM tbody').on('click', 'tr', function () {
    var table = $('#tableDetailBiayaBKM').DataTable();
    table.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');

    var data = table.row(this).data();
    var rowIndex = table.row(this).index();

    arrBKM = [decodeHtmlEntities(data[0]), decodeHtmlEntities(data[1]), decodeHtmlEntities(data[2]), rowIndex];
});

btnKoreksiBg.addEventListener("click", function (e) {
    var table = $('#tableBg').DataTable();
    if (table.rows('.selected').any()) {
        $('#modalBg').modal('show');
        $('#modalBg').on('shown.bs.modal', function () {
            proses = 2;
            noBg.value = arrBg[0];
            jatuhTempo.value = arrBg[1];
            cetak.value = arrBg[2];
            bankBg.value = idBank1.value;
            jenisBg.value = jenisBayar1.value;
            noBg.readOnly = false;
            jatuhTempo.readOnly = false;
            cetak.readOnly = false;
            noBg.focus();
        });
    }
    else {
        Swal.fire({
            icon: 'error',
            text: 'Pilih 1 Detail Biaya U/ DiKoreksi!',
            returnFocus: false
        });
    }
});

btnHapusBg.addEventListener("click", function (e) {
    var table = $('#tableBg').DataTable();
    if (table.rows('.selected').any()) {
        $('#modalBg').modal('show');
        $('#modalBg').on('shown.bs.modal', function () {
            proses = 3;
            noBg.value = arrBg[0];
            jatuhTempo.value = arrBg[1];
            cetak.value = arrBg[2];
            bankBg.value = idBank1.value;
            jenisBg.value = jenisBayar1.value;
            noBg.readOnly = true;
            jatuhTempo.readOnly = true;
            cetak.readOnly = true;
            btnProsesBg.focus();
        });
    }
    else {
        Swal.fire({
            icon: 'error',
            text: 'Pilih 1 Detail Biaya U/ DiHapus!',
            returnFocus: false
        });
    }
});

btnBatal.addEventListener("click", function (e) {
    tanggalInput.value = today;
    tgl.value = today;
    idBKK.value = '';
    mataUang1.value = '';
    idUang1.value = '';
    symbol1.value = '';
    uang1.value = '0';
    bank1.value = '';
    idBank1.value = '';
    jenisBank1.value = '';
    jenisBayar1.value = '';
    idPerkiraan1.value = '';
    perkiraan1.value = '';
    uraian1.value = '';
    idBKM.value = '';
    mataUang.value = '';
    idUang.value = '';
    symbol.value = '';
    kurs.value = '0';
    uang.value = '0';
    bank.value = '';
    idBank.value = '';
    jenisBank.value = '';
    jenisBayar.value = '';
    idPerkiraan.value = '';
    perkiraan.value = '';
    uraian.value = '';
    listBiaya.value = 0;
    listBiaya1.value = 0;
    var table = $('#tableDetailBiayaBKK').DataTable();
    var tableAsal = $('#tableBg').DataTable();
    var tableTujuan = $('#tableDetailBiayaBKM').DataTable();
    table.clear().draw();
    tableAsal.clear().draw();
    tableTujuan.clear().draw();
    enableBKK();
    disableBKM();
    btnBiaya.disabled = true;
    btnBiaya1.disabled = true;
    ModeKoreksi = false;
    tanggalInput.focus();
});

btnProses.addEventListener("click", function (e) {
    let idbkm = idBKM.value.substring(0, 3);
    let idbkk = idBKK.value.substring(0, 3);
    let nilai = 0, nilai1 = 0, ada1 = false, ada2 = false, ada3 = false, biaya = 0, biaya1 = 0;
    let konversi;

    if (idBKK.value !== '' && idBKM.value !== '') {

        var tableBg = $('#tableBg').DataTable();
        var tableBgLength = tableBg.data().length;
        if (tableBgLength > 0) {
            ada2 = true;
        }

        var tableBKK = $('#tableDetailBiayaBKK').DataTable();
        var tableBKKLength = tableBKK.data().length;
        if (tableBKKLength > 0) {
            tableBKK.rows().every(function (rowIdx, tableLoop, rowLoop) {
                var data = this.data();
                biaya += numeral(data[1]).value();
            });
            ada1 = true;
        }
        nilai = biaya + numeral(uang1.value).value();
        total = (nilai);

        if (parseInt(idUang1.value) === 1) {
            konversi = convertNumberToWordsRupiah(nilai);
        }
        else {
            konversi = convertNumberToWordsDollar(nilai);
        }

        console.log(total, ' + ', konversi);

        $.ajax({
            type: 'PUT',
            url: 'MaintenanceBKMTransistorisBank/insertBKK',
            data: {
                _token: csrfToken,
                idBKK: idBKK.value.trim(),
                tgl: tanggalInput.value,
                terjemahan: konversi,
                nilai: numeral(parseFloat(nilai)).value(),
                IdBank: idBank1.value.trim(),
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });

        $.ajax({
            type: 'PUT',
            url: 'MaintenanceBKMTransistorisBank/insertTransBKK',
            data: {
                _token: csrfToken,
                idBKK: idBKK.value.trim(),
                idUang: idUang1.value,
                idJenis: jenisBayar1,
                idBank: idBank1.value.trim(),
                nilai: numeral(parseFloat(nilai)).value(),
                kurs: numeral(parseFloat(kurs.value)).value()
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });
    }
});

$(document).ready(function () {
    $('#tableDetailBiayaBKK').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: 'Keterangan' },
            { title: 'Biaya' },
            { title: 'Kode Perkiraan' },
        ],
        scrollY: '125px',
        autoWidth: false,
        scrollX: '100%',
        columnDefs: [{ targets: [0, 1, 2], width: '33%', className: 'fixed-width' },
        ]
    });

    $('#tableBg').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: 'Nomer' },
            { title: 'Jatuh Tempo' },
            { title: 'Status Cetak' },
        ],
        scrollY: '75px',
        autoWidth: false,
        scrollX: '100%',
        columnDefs: [{ targets: [0, 1, 2], width: '33%', className: 'fixed-width' },
        ]
    });

    $('#tableDetailBiayaBKM').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: 'Keterangan' },
            { title: 'Biaya' },
            { title: 'Kode Perkiraan' },
        ],
        scrollY: '125px',
        autoWidth: false,
        scrollX: '100%',
        columnDefs: [{ targets: [0, 1, 2], width: '33%', className: 'fixed-width' },
        ]
    });
});
