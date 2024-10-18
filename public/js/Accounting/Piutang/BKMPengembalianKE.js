var listBiaya1 = document.getElementById('listBiaya1');
var idUang = document.getElementById('idUang');
var symbol = document.getElementById('symbol');

var idCust = document.getElementById('idCust');
var jnsCust = document.getElementById('jnsCust');

var idBank = document.getElementById('idBank');
var jenisBank = document.getElementById('jenisBank');

var idJenisBayar = document.getElementById('idJenisBayar');

var listBiaya = document.getElementById('listBiaya');
var idUang1 = document.getElementById('idUang1');
var symbol1 = document.getElementById('symbol1');

var idBank1 = document.getElementById('idBank1');
var jenisBank1 = document.getElementById('jenisBank1');

var idJenisBayar1 = document.getElementById('idJenisBayar1');

var bln = document.getElementById('bln');
var thn = document.getElementById('thn');

var tgl = document.getElementById('tgl');
var idBKM = document.getElementById('idBKM');
var cust = document.getElementById('cust');
var btnCust = document.getElementById('btnCust');

var mataUang = document.getElementById('mataUang');
var btnMataUang = document.getElementById('btnMataUang');
var uang = document.getElementById('uang');
var kurs = document.getElementById('kurs');

var bank = document.getElementById('bank');
var btnBank = document.getElementById('btnBank');
var jenisBayar = document.getElementById('jenisBayar');
var btnJenisBayar = document.getElementById('btnJenisBayar');

var idPerkiraan = document.getElementById('idPerkiraan');
var perkiraan = document.getElementById('perkiraan');
var btnPerkiraan = document.getElementById('btnPerkiraan');
var uraian = document.getElementById('uraian');

var idBKK = document.getElementById('idBKK');
var mataUang1 = document.getElementById('mataUang1');
var uang1 = document.getElementById('uang1');
var bank1 = document.getElementById('bank1');
var jenisBayar1 = document.getElementById('jenisBayar1');
var btnJenisBayar1 = document.getElementById('btnJenisBayar1');

var idPerkiraan1 = document.getElementById('idPerkiraan1');
var perkiraan1 = document.getElementById('perkiraan1');
var btnPerkiraan1 = document.getElementById('btnPerkiraan1');
var uraian1 = document.getElementById('uraian1');

var btnProses = document.getElementById('btnProses');
var btnBatal = document.getElementById('btnBatal');
var btnTampilBKM = document.getElementById('btnTampilBKM');
var btnTampilBKK = document.getElementById('btnTampilBKK');

var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var today = new Date().toISOString().slice(0, 10);
tgl.value = today;

document.addEventListener('DOMContentLoaded', function () {
    tgl.focus();
});

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

$('#tgl').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();

        if (tgl.value > today) {
            Swal.fire({
                icon: 'error',
                text: 'Tanggal SALAH!',
            }).then(() => {
                tgl.focus();
            });
            return;
        } else {
            var dateValue = new Date(tgl.value);

            var month = String(dateValue.getMonth() + 1).padStart(2, '0');
            var year = String(dateValue.getFullYear()).slice(-2);

            bln.value = month;
            thn.value = year;
            btnCust.focus();
        }
    }
});

btnCust.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Customer',
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
                            url: "BKMPengembalianKE/getCust",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "NamaCust" },
                            { data: "IdCust" },
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
                cust.value = decodeHtmlEntities(result.value.NamaCust.trim());
                idCust.value = decodeHtmlEntities(result.value.IdCust.trim().slice(-5));

                btnMataUang.focus();
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
                            url: "BKMPengembalianKE/getMataUang",
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
                    url: 'BKMPengembalianKE/getSymbol',
                    data: {
                        _token: csrfToken,
                        nama: mataUang.value.trim()
                    },
                    success: function (result) {
                        if (result.length !== 0) {
                            symbol.value = result[0].Symbol ? decodeHtmlEntities(result[0].Symbol) : '';
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error('Error:', error);
                    }
                });

                if (idUang.value.trim() !== 1) {
                    kurs.readOnly = false;
                }
                else if (idUang.value.trim() === 1) {
                    kurs.readOnly = true;
                }

                uang.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

$('#uang').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();

        uang.value = numeral(uang.value).format("0,0.00");
        if (numeral(uang.value).value() === 0) {
            Swal.fire({
                icon: 'error',
                text: 'Jumlah Uang TIDAK BOLEH = 0 !',
                returnFocus: false,
            }).then(() => {
                uang.focus();
            });
            return;
        }
        else {
            if (kurs.disabled === false) {
                kurs.focus();
            }
            else {
                btnBank.focus();
            }
        }
    }
});

$('#kurs').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();

        kurs.value = numeral(kurs.value).format("0,0.00");
        if (numeral(kurs.value).value() === 0) {
            Swal.fire({
                icon: 'error',
                text: 'Kurs TIDAK BOLEH = 0 !',
                returnFocus: false,
            }).then(() => {
                kurs.focus();
            });
            return;
        }
        else {
            btnBank.focus();
        }
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
                            url: "BKMPengembalianKE/getBank",
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

                if (idBank.value !== '') {
                    $.ajax({
                        type: 'GET',
                        url: 'BKMPengembalianKE/getAccBank',
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
                            url: "BKMPengembalianKE/getJenisBayar",
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

                btnPerkiraan.focus()
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
                            url: "BKMPengembalianKE/getPerkiraan",
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

var IdBank;
$('#uraian').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (idBKM.value === '') {
            if (idBank.value === 'KRR1' || idBank.value === 'KRR2') {
                if (idBank.value === 'KRR2') {
                    IdBank = 'KI';
                    pencetUraian(IdBank);
                }
                if (idBank.value = 'KRR1') {
                    IdBank = 'KKM';
                    pencetUraian(IdBank);
                }
            }
            else {
                IdBank = idBank.value;
                pencetUraian(IdBank);
            }

            function pencetUraian(IdBank) {
                $.ajax({
                    type: 'GET',
                    url: 'BKMPengembalianKE/getIdBKM',
                    data: {
                        _token: csrfToken,
                        bank: IdBank.trim(),
                        jenis: 'R',
                        tahun: new Date(tgl.value).getFullYear(),
                    },
                    success: function (result) {
                        if (result) {
                            idBKM.value = decodeHtmlEntities(result.IdBKM);

                            enableBKK();

                            mataUang1.value = mataUang.value;
                            uang1.value = mataUang.value;
                            bank1.value = bank.value;
                            idBank1.value = idBank.value;
                            jenisBank1.value = jenisBank.value;
                            jenisBayar1.value = jenisBayar.value;

                            btnPerkiraan1.focus();
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error('Error:', error);
                    }
                });
            }
        }
    }
});

function enableBKK() {
    btnPerkiraan1.disabled = false;
    uraian1.readOnly = false;
}

function disableBKK() {
    btnPerkiraan1.disabled = true;
    uraian1.readOnly = true;
}

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
                            url: "BKMPengembalianKE/getPerkiraan",
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

var IdBank1;
$('#uraian1').on('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (idBKK.value === '') {
            if (idBank1.value === 'KRR1' || idBank1.value === 'KRR2') {
                if (idBank1.value === 'KRR2') {
                    IdBank1 = 'KI';
                    pencetUraian1(IdBank1);
                }
                if (idBank1.value = 'KRR1') {
                    IdBank1 = 'KKK';
                    pencetUraian1(IdBank1);
                }
            }
            else {
                IdBank1 = idBank1.value;
                pencetUraian1(IdBank1);
            }

            function pencetUraian1(IdBank1) {
                $.ajax({
                    type: 'GET',
                    url: 'BKMPengembalianKE/getIdBKK',
                    data: {
                        _token: csrfToken,
                        bank: IdBank1.trim(),
                        tahun: new Date(tgl.value).getFullYear(),
                    },
                    success: function (result) {
                        if (result) {
                            idBKK.value = decodeHtmlEntities(result.IdBKK);

                            btnProses.focus();
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error('Error:', error);
                    }
                });
            }
        }
    }
});